// Signature/type equivalence check.
//
// For every ported @tsgo-unit, compare the ACTUAL TS signature (parsed from the
// .ts file with TSTS's own parser) against the EXPECTED signature derived
// DIRECTLY from the Go extractor's structured type model (resolving each named
// type to the TS module where its @tsgo-unit actually lives). Both sides become
// canonical structured descriptors and are compared structurally. Closes the gap
// where a hand-edited TS signature can drift while the Go hash, tsc build, and
// conformance baselines all stay green.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadParser, canonicalKey, typesEqual, parseSource, extractReexports, isSoftId } from "./ts-extractor/ast-signatures.mjs";
import { extractFileDescriptors } from "./ts-extractor/extract-signatures.mjs";
import { buildExpectedIndex, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { loadConventions, normalizeDescriptor } from "./ts-extractor/conventions.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";

const RENDERABLE = new Set(["func", "method", "type", "constGroup", "varGroup"]);

// --- override resolution ------------------------------------------------------

function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`);
}

// Resolve config + inline overrides for a unit. `overrides` is profile.overrides.
// Returns { all, ignore:Set, reason }.
function resolveOverride(overrides, id, metadata) {
  const ignore = new Set();
  let all = false;
  const reasons = [];
  for (const o of overrides ?? []) {
    const matches = (o.id && o.id === id) || (o.match && globToRegExp(o.match).test(id));
    if (!matches) continue;
    if (o.ignore) for (const a of o.ignore) ignore.add(a);
    else all = true; // an override with no `ignore` accepts all divergence
    if (o.reason) reasons.push(o.reason);
  }
  if (metadata?.sigCheck === "manual") all = true;
  if (metadata?.sigOverride) {
    if (Array.isArray(metadata.sigOverride.ignore)) for (const a of metadata.sigOverride.ignore) ignore.add(a);
    else all = true;
    if (metadata.sigOverride.reason) reasons.push(metadata.sigOverride.reason);
  }
  return { all, ignore, reason: reasons.join("; ") };
}

// --- comparison ---------------------------------------------------------------

const keyOf = (d) => (d ? canonicalKey(d) : "<none>");

// Returns an array of mismatch objects: { kind, detail, expected?, actual? }.
// `canon` resolves ref ids through TS re-exports to their definition module.
export function compareSignatures(expected, actual, override, canon = (x) => x, conv = { equivalences: [], structural: {} }) {
  if (override?.all) return [];
  const ignore = override?.ignore ?? new Set();
  const out = [];
  const push = (kind, detail, exp, act) => {
    if (!ignore.has(kind)) out.push({ kind, detail, expected: exp, actual: act });
  };
  const eq = (x, y) => typesEqual(normalizeDescriptor(x, conv), normalizeDescriptor(y, conv), canon);

  if (!actual) {
    push("actual-missing", "no TS declaration found for this @tsgo-unit");
    return out;
  }
  if (!expected || expected.kind === "other") {
    push("value-type-unresolved", "expected signature could not be derived from Go");
    return out;
  }

  if (actual.kind === "func" || actual.kind === "interface" || actual.kind === "alias") {
    compareTypeParams(expected, actual, push, eq, conv);
  }
  if (actual.kind === "func") compareFunc(expected, actual, push, eq);
  else if (actual.kind === "interface") compareInterface(expected, actual, push, eq);
  else if (actual.kind === "alias") {
    if (!eq(expected.type, actual.type)) push("alias-type", "alias type differs", keyOf(expected.type), keyOf(actual.type));
  } else if (actual.kind === "value") compareValue(expected, actual, push, eq);
  return out;
}

function compareTypeParams(expected, actual, push, eq, conv) {
  const e = expected.typeParams ?? [];
  const a = actual.typeParams ?? [];
  if (e.length !== a.length) {
    push("type-param-count", `expected ${e.length} type params, found ${a.length}`, e.length, a.length);
    return;
  }
  for (let i = 0; i < e.length; i++) {
    const ec = e[i].constraint, ac = a[i].constraint;
    if (ec && ac) {
      if (!eq(ec, ac)) push("type-param-constraint", `type param #${i} constraint differs`, keyOf(ec), keyOf(ac));
    } else if (ec || ac) {
      // One side erased the constraint. Accept when the present one is a
      // recognized convention (normalizes to a conv token) and the toggle is on.
      const present = normalizeDescriptor(ec ?? ac, conv);
      const erasable = conv.structural?.acceptErasedConstraints && present.t === "conv";
      if (!erasable) push("type-param-constraint", `type param #${i} constraint differs`, ec ? keyOf(ec) : "-", ac ? keyOf(ac) : "-");
    }
  }
}

function compareFunc(expected, actual, push, eq) {
  const ep = expected.params ?? [];
  const ap = actual.params ?? [];
  if (ep.length !== ap.length) {
    push("arity", `expected ${ep.length} params [${ep.map((p) => keyOf(p.type)).join(", ")}], found ${ap.length} [${ap.map((p) => keyOf(p.type)).join(", ")}]`, ep.length, ap.length);
  }
  const n = Math.min(ep.length, ap.length);
  const eKeys = ep.slice(0, n).map((p) => keyOf(p.type));
  const aKeys = ap.slice(0, n).map((p) => keyOf(p.type));
  const positionalDiff = ep.slice(0, n).some((p, i) => !eq(p.type, ap[i].type));
  if (positionalDiff && [...eKeys].sort().join(" ") === [...aKeys].sort().join(" ")) {
    push("param-order", `parameters reordered: expected [${eKeys.join(", ")}], found [${aKeys.join(", ")}]`);
  } else {
    for (let i = 0; i < n; i++) {
      if (!eq(ep[i].type, ap[i].type)) push("param-type", `param #${i} type differs`, eKeys[i], aKeys[i]);
      if (!!ep[i].rest !== !!ap[i].rest) push("variadic-position", `param #${i} rest/variadic differs`, !!ep[i].rest, !!ap[i].rest);
    }
  }
  if (!eq(expected.ret, actual.ret)) push("return-type", "return type differs", keyOf(expected.ret), keyOf(actual.ret));
}

function memberMap(desc) {
  const m = new Map();
  for (const mem of desc.members ?? []) m.set(mem.name, mem);
  return m;
}

function compareInterface(expected, actual, push, eq) {
  const em = memberMap(expected);
  const am = memberMap(actual);
  for (const [name, mem] of em) {
    if (!am.has(name)) { push("missing-member", `member '${name}' present in Go but missing in TS`, name); continue; }
    if (!eq(mem.type, am.get(name).type)) push("member-type", `member '${name}' type differs`, keyOf(mem.type), keyOf(am.get(name).type));
  }
  for (const name of am.keys()) {
    if (!em.has(name)) push("extra-member", `member '${name}' present in TS but not in Go`, name);
  }
}

function compareValue(expected, actual, push, eq) {
  // Match positionally (Go spec order == TS decl order) so blank-identifier
  // assertions (Go `var _ T = …` -> TS `export let __hash_0: T = …`) align; fall
  // back to name when present.
  const ed = expected?.decls ?? [];
  const byName = new Map(ed.map((d) => [d.name, d]));
  const ad = actual.decls ?? [];
  for (let i = 0; i < ad.length; i++) {
    const d = ad[i];
    if (d.missing) { push("value-annotation-missing", `value '${d.name}' has no explicit type annotation`, undefined, d.name); continue; }
    const e = byName.get(d.name) ?? ed[i];
    if (!e || !e.type) { push("value-type-unresolved", `value '${d.name}': expected Go type could not be determined`, undefined, keyOf(d.type)); continue; }
    if (!eq(e.type, d.type)) push("value-type", `value '${d.name}' type differs`, keyOf(e.type), keyOf(d.type));
  }
}

// --- orchestration ------------------------------------------------------------

// Builds a resolver that maps a ref id to its canonical definition module by
// following TS re-exports (named + star), so a type referenced via a re-export
// module matches the same type at its definition. core.Node != ast.Node holds
// because they resolve to different definitions.
function makeCanon(namedReexport, starReexport, definedAt) {
  const cache = new Map();
  const split = (id) => { const i = id.lastIndexOf("::"); return [id.slice(0, i), id.slice(i + 2)]; };
  const resolve = (id, seen) => {
    if (cache.has(id)) return cache.get(id);
    if (seen.has(id)) return id;
    seen.add(id);
    let result = id;
    if (!definedAt.has(id)) {
      if (namedReexport.has(id)) {
        result = resolve(namedReexport.get(id), seen);
      } else {
        const [mod, name] = split(id);
        for (const s of starReexport.get(mod) ?? []) {
          const r = resolve(`${s}::${name}`, seen);
          if (definedAt.has(r)) { result = r; break; }
        }
      }
    }
    cache.set(id, result);
    return result;
  };
  return (id) => (isSoftId(id) || !id.includes("::") ? id : resolve(id, new Set()));
}

// deps: { config, snapshot, repoRoot, tsFiles:[{path}], tsById:Map<id,{path,metadata}> }
// options: { idFilter?: glob }
export async function computeSignatureReport(deps, options = {}) {
  const profile = loadProfile(deps.config);
  const api = await loadParser({
    distRoot: join(deps.repoRoot, profile.parser.distRoot),
    freshnessSrcDirs: profile.parser.freshnessSrcDirs.map((d) => join(deps.repoRoot, d)),
  });
  const index = buildExpectedIndex(deps.config, deps.snapshot, deps.tsById, profile);
  const conv = loadConventions(profile.conventions ?? {});
  const overrides = profile.overrides ?? [];

  // Go units keyed by id, carrying minimal file info for descriptor resolution.
  const goById = new Map();
  for (const file of deps.snapshot.files) {
    for (const u of file.units ?? []) {
      goById.set(u.id, { ...u, file: { importPath: file.importPath, imports: file.imports } });
    }
  }

  // Where each tracked unit is actually defined (module::name).
  const definedAt = new Set();
  for (const [id, ts] of deps.tsById) {
    const name = id.split("::").pop();
    if (ts?.path && name) definedAt.add(`${ts.path}::${name}`);
  }

  // Pre-pass: build the global re-export graph and cache file texts.
  const namedReexport = new Map();
  const starReexport = new Map();
  const textByFile = new Map();
  for (const file of deps.tsFiles) {
    let text;
    try { text = readFileSync(`${deps.repoRoot}/${file.path}`, "utf8"); } catch { continue; }
    textByFile.set(file.path, text);
    const { named, star } = extractReexports(api, parseSource(api, file.path, text), file.path);
    for (const [local, target] of named) namedReexport.set(`${file.path}::${local}`, target);
    if (star.length) starReexport.set(file.path, star);
  }
  const canon = makeCanon(namedReexport, starReexport, definedAt);

  const idRe = options.idFilter ? globToRegExp(options.idFilter) : undefined;
  const mismatches = [];
  let checked = 0;
  let overriddenUnits = 0;

  for (const file of deps.tsFiles) {
    const text = textByFile.get(file.path);
    if (text === undefined) continue;
    for (const u of extractFileDescriptors(api, file.path, text, profile.annotation)) {
      if (idRe && !idRe.test(u.id)) continue;
      const go = goById.get(u.id);
      if (!go || !RENDERABLE.has(go.kind)) continue;
      checked++;
      const override = resolveOverride(overrides, u.id, u.metadata);
      if (override.all) { overriddenUnits++; continue; }
      const expected = goUnitDescriptor(go, index);
      const ms = compareSignatures(expected, u.descriptor, override, canon, conv);
      for (const m of ms) mismatches.push({ id: u.id, file: file.path, ...m });
    }
  }
  return { mismatches, checked, overriddenUnits };
}

export { resolveOverride };
