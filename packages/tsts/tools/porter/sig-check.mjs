// Signature/type equivalence check.
//
// For every ported @tsgo-unit, compare the ACTUAL TS signature (parsed from the
// .ts file with TSTS's own parser) against the EXPECTED signature derived
// DIRECTLY from the Go extractor's structured type model (resolving each named
// type to the TS module where its @tsgo-unit actually lives). Both sides become
// canonical structured descriptors and are compared structurally. Closes the gap
// where a hand-edited TS signature can drift while the Go hash, tsc build, and
// conformance baselines all stay green.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { loadParser, canonicalKey, typesEqual, parseSource, resolveModuleId, isSoftId } from "./ts-extractor/ast-signatures.mjs";
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

// The TS top type: a `<T extends unknown>` constraint is equivalent to none.
const isTopConstraint = (c) => !!c && c.t === "kw" && (c.kw === "unknown" || c.kw === "any");

// Returns an array of mismatch objects: { kind, detail, expected?, actual? }.
// `canon` resolves ref ids through TS re-exports to their definition module.
export function compareSignatures(expected, actual, override, canon = (x) => x, conv = { equivalences: [], structural: {} }) {
  if (override?.all) return [];
  const ignore = override?.ignore ?? new Set();
  const out = [];
  const push = (kind, detail, exp, act) => {
    if (!ignore.has(kind)) out.push({ kind, detail, expected: exp, actual: act });
  };
  // Ordinary positions use the "type" context; type-param bounds use "constraint".
  const eq = (x, y) => typesEqual(normalizeDescriptor(x, conv, "type"), normalizeDescriptor(y, conv, "type"), canon);
  const eqConstraint = (x, y) => typesEqual(normalizeDescriptor(x, conv, "constraint"), normalizeDescriptor(y, conv, "constraint"), canon);

  if (!actual) {
    push("actual-missing", "no TS declaration found for this @tsgo-unit");
    return out;
  }
  if (!expected || expected.kind === "other") {
    push("value-type-unresolved", "expected signature could not be derived from Go");
    return out;
  }

  if (actual.kind === "func" || actual.kind === "interface" || actual.kind === "alias") {
    compareTypeParams(expected, actual, push, eqConstraint, conv);
  }
  if (actual.kind === "func") compareFunc(expected, actual, push, eq);
  else if (actual.kind === "interface") compareInterface(expected, actual, push, eq);
  else if (actual.kind === "alias") {
    if (!eq(expected.type, actual.type)) push("alias-type", "alias type differs", keyOf(expected.type), keyOf(actual.type));
  } else if (actual.kind === "value") compareValue(expected, actual, push, eq);

  // Gate unresolved refs: surface (don't silently name-match) any type whose
  // identity could not be resolved to a real module on either side — after
  // convention normalization, so convention-handled constraints aren't flagged.
  const soft = [...new Set([...unitSoftIds(expected, conv), ...unitSoftIds(actual, conv)])];
  if (soft.length > 0) {
    push("unresolved-ref", `unresolved type identity: ${soft.slice(0, 6).join(", ")}`, undefined, undefined);
  }
  return out;
}

// All type descriptors referenced in a unit descriptor, tagged with the context
// they appear in ("constraint" for type-param bounds, else "type").
function unitTypeNodes(desc) {
  if (!desc) return [];
  const out = [];
  for (const p of desc.params ?? []) out.push(["type", p.type]);
  if (desc.ret) out.push(["type", desc.ret]);
  for (const tp of desc.typeParams ?? []) if (tp.constraint) out.push(["constraint", tp.constraint]);
  for (const m of desc.members ?? []) if (m.type) out.push(["type", m.type]);
  for (const d of desc.decls ?? []) if (d.type) out.push(["type", d.type]);
  if (desc.type) out.push(["type", desc.type]);
  return out;
}

function softIdsIn(d, acc) {
  if (!d || typeof d !== "object") return acc;
  if (d.t === "ref") {
    if (isSoftId(d.id)) acc.add(d.id);
    for (const a of d.args) softIdsIn(a, acc);
  } else if (d.t === "array") softIdsIn(d.element, acc);
  else if (d.t === "tuple") for (const e of d.elements) softIdsIn(e, acc);
  else if (d.t === "union" || d.t === "intersect") for (const m of d.members) softIdsIn(m, acc);
  else if (d.t === "fn") { for (const p of d.params) softIdsIn(p.type, acc); softIdsIn(d.ret, acc); }
  return acc;
}

function unitSoftIds(desc, conv) {
  const acc = new Set();
  for (const [context, t] of unitTypeNodes(desc)) softIdsIn(normalizeDescriptor(t, conv, context), acc);
  return [...acc];
}

function compareTypeParams(expected, actual, push, eq, conv) {
  const e = expected.typeParams ?? [];
  const a = actual.typeParams ?? [];
  if (e.length !== a.length) {
    push("type-param-count", `expected ${e.length} type params, found ${a.length}`, e.length, a.length);
    return;
  }
  for (let i = 0; i < e.length; i++) {
    // `unknown`/`any` is TS's top type: `<T extends unknown>` ≡ `<T>`. So a
    // trivial constraint (Go `[T any]`) is universally equivalent to none.
    const ec = isTopConstraint(e[i].constraint) ? undefined : e[i].constraint;
    const ac = isTopConstraint(a[i].constraint) ? undefined : a[i].constraint;
    if (ec && ac) {
      if (!eq(ec, ac)) push("type-param-constraint", `type param #${i} constraint differs`, keyOf(ec), keyOf(ac));
    } else if (ec || ac) {
      // One side erased a non-trivial constraint. Accept when the present one is
      // a recognized convention (normalizes to a conv token) and the toggle is on.
      const present = normalizeDescriptor(ec ?? ac, conv, "constraint");
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
    const got = am.get(name);
    if (got.unsupported) { push("unsupported-member", `member '${name}' is an unsupported shape (${got.unsupported})`, name); continue; }
    if (!eq(mem.type, got.type)) push("member-type", `member '${name}' type differs`, keyOf(mem.type), keyOf(got.type));
  }
  for (const [name, mem] of am) {
    if (em.has(name)) continue;
    if (mem.unsupported) push("unsupported-member", `member '${name}' is an unsupported shape (${mem.unsupported})`, name);
    else push("extra-member", `member '${name}' present in TS but not in Go`, name);
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
function makeCanon(namedReexport, starReexport, definedAt, canonicalTypes = {}) {
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
  return (id) => {
    if (isSoftId(id) || !id.includes("::")) return id;
    // A globally-unique duplicated type collapses to its one canonical module.
    const name = id.slice(id.lastIndexOf("::") + 2);
    if (canonicalTypes[name]) return `${canonicalTypes[name]}::${name}`;
    return resolve(id, new Set());
  };
}

// One fast regex scan over EVERY .ts under tsRoot (incl. generated/untracked
// barrels that `deps.tsFiles` excludes) building both the type-declaration index
// and the re-export graph. Avoids parsing thousands of files. Returns
// { tsDecls: Map<name,Set<module>>, namedReexport: Map<"mod::local","src::name">,
//   starReexport: Map<mod,[srcMod]> }.
const TYPE_DECL_RE = /^export\s+(?:declare\s+)?(?:abstract\s+)?(?:interface|type|class|enum|const enum)\s+([A-Za-z_$][\w$]*)/gm;
const NAMED_REEXPORT_RE = /^export\s+(?:type\s+)?\{([\s\S]*?)\}\s+from\s+["']([^"']+)["']/gm;
const STAR_REEXPORT_RE = /^export\s+\*\s+from\s+["']([^"']+)["']/gm;

function scanTsModules(repoRoot, tsRootRel) {
  const tsDecls = new Map();
  const namedReexport = new Map();
  const starReexport = new Map();
  const rootAbs = join(repoRoot, tsRootRel);
  const stack = [rootAbs];
  while (stack.length > 0) {
    const dir = stack.pop();
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) { stack.push(p); continue; }
      if (!e.name.endsWith(".ts")) continue;
      let text;
      try { text = readFileSync(p, "utf8"); } catch { continue; }
      const moduleId = `${tsRootRel}/${p.slice(rootAbs.length + 1)}`;
      for (const re of [TYPE_DECL_RE]) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(text)) !== null) {
          if (!tsDecls.has(m[1])) tsDecls.set(m[1], new Set());
          tsDecls.get(m[1]).add(moduleId);
        }
      }
      NAMED_REEXPORT_RE.lastIndex = 0;
      let nm;
      while ((nm = NAMED_REEXPORT_RE.exec(text)) !== null) {
        const src = resolveModuleId(nm[2], moduleId);
        for (const spec of nm[1].split(",")) {
          const t = spec.trim();
          if (!t) continue;
          const as = t.split(/\s+as\s+/);
          const srcName = as[0].trim();
          const local = (as[1] ?? as[0]).trim();
          if (local) namedReexport.set(`${moduleId}::${local}`, `${src}::${srcName}`);
        }
      }
      STAR_REEXPORT_RE.lastIndex = 0;
      let sm;
      while ((sm = STAR_REEXPORT_RE.exec(text)) !== null) {
        const src = resolveModuleId(sm[1], moduleId);
        if (!starReexport.has(moduleId)) starReexport.set(moduleId, []);
        starReexport.get(moduleId).push(src);
      }
    }
  }
  return { tsDecls, namedReexport, starReexport };
}

// deps: { config, snapshot, repoRoot, tsFiles:[{path}], tsById:Map<id,{path,metadata}> }
// options: { idFilter?: glob }
export async function computeSignatureReport(deps, options = {}) {
  const profile = loadProfile(deps.config);
  const api = await loadParser({
    distRoot: join(deps.repoRoot, profile.parser.distRoot),
    freshnessSrcDirs: profile.parser.freshnessSrcDirs.map((d) => join(deps.repoRoot, d)),
  });
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

  // One regex scan over ALL .ts (incl. generated/untracked barrels) for the type
  // declaration index + the re-export graph.
  const { tsDecls, namedReexport, starReexport } = scanTsModules(deps.repoRoot, deps.config.tsRoot);
  // A type's actual declaring module is its canonical definition, so re-exports
  // (e.g. the generated barrel) resolve to the same module the expected side picks.
  for (const [name, mods] of tsDecls) for (const m of mods) definedAt.add(`${m}::${name}`);
  const canon = makeCanon(namedReexport, starReexport, definedAt, profile.canonicalTypes ?? {});
  const index = buildExpectedIndex(deps.config, deps.snapshot, deps.tsById, profile, tsDecls);

  const idRe = options.idFilter ? globToRegExp(options.idFilter) : undefined;
  const mismatches = [];
  let checked = 0;
  let overriddenUnits = 0;

  for (const file of deps.tsFiles) {
    let text;
    try { text = readFileSync(`${deps.repoRoot}/${file.path}`, "utf8"); } catch { continue; }
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
