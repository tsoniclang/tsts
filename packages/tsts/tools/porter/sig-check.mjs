// Signature/type equivalence check.
//
// For every ported @tsgo-unit, compare the ACTUAL TS signature (parsed from the
// .ts file with TSTS's own parser) against the EXPECTED signature derived
// DIRECTLY from the Go extractor's structured type model (resolving each named
// type to the TS module where its @tsgo-unit actually lives). Both sides become
// canonical structured descriptors and are compared structurally. Closes the gap
// where a hand-edited TS signature can drift while the Go hash, tsc build, and
// conformance baselines all stay green.

import { join } from "node:path";
import { compareText } from "./core/deterministic-order.mjs";
import { loadParser, canonicalKey, typesEqual, isSoftId } from "./ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments, extractParsedFileDescriptors } from "./ts-extractor/extract-signatures.mjs";
import { buildExpectedIndex, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { loadConventions, normalizeDescriptor } from "./ts-extractor/conventions.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";
import { collectJsonTagMismatches } from "./ts-extractor/json-tags.mjs";
import { loadTypeScriptModuleIndex, requireIndexedModule } from "./ts-extractor/module-index.mjs";
import { createCanonicalTypeResolver } from "./ts-extractor/module-resolution.mjs";

const RENDERABLE = new Set(["func", "method", "type", "constGroup", "varGroup"]);
const SIGNATURE_MISMATCH_KINDS = new Set([
  "declaration-kind",
  "value-type-unresolved",
  "type-param-count",
  "type-param-constraint",
  "arity",
  "param-order",
  "param-type",
  "param-annotation-missing",
  "param-optionality",
  "variadic-position",
  "return-type",
  "return-annotation-missing",
  "function-modifier",
  "interface-heritage",
  "missing-member",
  "unsupported-member",
  "member-type",
  "member-optionality",
  "member-readonly",
  "member-annotation-missing",
  "extra-member",
  "duplicate-member",
  "alias-type",
  "value-annotation-missing",
  "missing-value",
  "extra-value",
  "value-type",
  "unresolved-ref",
  "unsupported-type",
  "profile-variant",
]);
const INITIALIZER_MISMATCH_KINDS = new Set(["value-initializer", "value-initializer-unresolved"]);
const VALUE_ORDER_MISMATCH_KINDS = new Set(["value-order"]);

// --- override resolution ------------------------------------------------------

function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`);
}

function resolveOverride(localOverride, id, expected, actual, canon, overrideIssues) {
  const ignore = new Set();
  const issues = [];
  if (localOverride?.allow?.includes?.("signature")) {
    const expectedSnapshot = unitSignatureSnapshot(expected, canon);
    const actualSnapshot = unitSignatureSnapshot(actual, canon);
    if (localOverride.goSignature !== expectedSnapshot) {
      issues.push(`goSignature snapshot drifted: metadata=${localOverride.goSignature ?? "<missing>"} current=${expectedSnapshot}`);
    }
    if (localOverride.tsSignature !== actualSnapshot) {
      issues.push(`tsSignature snapshot drifted: metadata=${localOverride.tsSignature ?? "<missing>"} current=${actualSnapshot}`);
    }
  }
  if (localOverride?.allow?.includes?.("initializer")) {
    const expectedSnapshot = unitInitializerSnapshot(expected);
    const actualSnapshot = unitInitializerSnapshot(actual);
    if (localOverride.goInitializer !== expectedSnapshot) {
      issues.push(`goInitializer snapshot drifted: metadata=${localOverride.goInitializer ?? "<missing>"} current=${expectedSnapshot}`);
    }
    if (localOverride.tsInitializer !== actualSnapshot) {
      issues.push(`tsInitializer snapshot drifted: metadata=${localOverride.tsInitializer ?? "<missing>"} current=${actualSnapshot}`);
    }
  }
  if (localOverride?.allow?.includes?.("value-order")) {
    const expectedSnapshot = unitValueOrderSnapshot(expected);
    const actualSnapshot = unitValueOrderSnapshot(actual);
    if (localOverride.goValueOrder !== expectedSnapshot) {
      issues.push(`goValueOrder snapshot drifted: metadata=${localOverride.goValueOrder ?? "<missing>"} current=${expectedSnapshot}`);
    }
    if (localOverride.tsValueOrder !== actualSnapshot) {
      issues.push(`tsValueOrder snapshot drifted: metadata=${localOverride.tsValueOrder ?? "<missing>"} current=${actualSnapshot}`);
    }
  }
  if (issues.length > 0) {
    overrideIssues.push({ id, reason: issues.join("; ") });
    return { ignore, reason: localOverride.reason ?? "" };
  }
  if (localOverride?.allow?.includes?.("signature")) {
    for (const kind of SIGNATURE_MISMATCH_KINDS) ignore.add(kind);
  }
  if (localOverride?.allow?.includes?.("initializer")) {
    ignore.add("value-initializer");
    ignore.add("value-initializer-unresolved");
  }
  if (localOverride?.allow?.includes?.("value-order")) {
    ignore.add("value-order");
  }
  return { ignore, reason: localOverride?.reason ?? "" };
}

function unitInitializerSnapshot(descriptor) {
  if (descriptor?.kind !== "value") return "<not-value>";
  return (descriptor.decls ?? []).map((declaration) =>
    `${declaration.name}=${declaration.valueIssue !== undefined ? `unresolved:${declaration.valueIssue}` : JSON.stringify(declaration.value)}`,
  ).join(";");
}

function unitValueOrderSnapshot(descriptor) {
  if (descriptor?.kind !== "value") return "<not-value>";
  return (descriptor.decls ?? []).map((declaration) => declaration.name).join(",");
}

function typeSnapshot(d, canon = (x) => x) {
  if (!d) return "<none>";
  switch (d.t) {
    case "ref": {
      const id = canon(d.id);
      return d.args.length ? `${id}<${d.args.map((a) => typeSnapshot(a, canon)).join(",")}>` : id;
    }
    case "array":
      return `${typeSnapshot(d.element, canon)}[]`;
    case "tuple":
      return `[${d.elements.map((e) => typeSnapshot(e, canon)).join(",")}]`;
    case "union":
      return d.members.map((m) => typeSnapshot(m, canon)).sort(compareText).join("|");
    case "intersect":
      return d.members.map((m) => typeSnapshot(m, canon)).sort(compareText).join("&");
    case "fn":
      return `<${(d.typeParams ?? []).map((p) => p.constraint ? typeSnapshot(p.constraint, canon) : "-").join(",")}>(${d.params.map((p) => `${p.rest ? "..." : ""}${p.optional ? "?" : ""}${p.missingType ? "!" : ""}${typeSnapshot(p.type, canon)}`).join(",")})=>${d.missingReturnType ? "!" : ""}${typeSnapshot(d.ret, canon)}`;
    case "object":
      return `{${d.members.map((m) => `${m.readonly ? "readonly " : ""}${m.name}${m.optional ? "?" : ""}:${m.missingType ? "!" : ""}${m.unsupported ? `unsupported(${m.unsupported})` : typeSnapshot(m.type, canon)}`).sort(compareText).join(";")}}`;
    case "kw":
      return d.kw;
    case "tp":
      return `T${d.i}`;
    case "lit":
      return d.text;
    case "raw":
      return `raw(${d.text})`;
    case "conv":
      return `conv(${d.token})`;
    case "goApprox":
      return `~${typeSnapshot(d.type, canon)}`;
    case "unsupported":
      return `unsupported(${d.kind}:${d.text})`;
    default:
      return canonicalKey(d);
  }
}

export function unitSignatureSnapshot(desc, canon = (x) => x) {
  if (!desc) return "<missing>";
  if (desc.kind === "profileVariants") {
    return desc.variants
      .map((variant) => `[${variant.profiles.join(",")}]${unitSignatureSnapshot(variant.descriptor, canon)}`)
      .join("||");
  }
  const typeParams = (desc.typeParams ?? [])
    .map((tp, index) => `T${index}${tp.constraint ? ` extends ${typeSnapshot(tp.constraint, canon)}` : ""}`)
    .join(",");
  const generic = typeParams ? `<${typeParams}>` : "";
  if (desc.kind === "func") {
    const params = (desc.params ?? [])
      .map((p) => `${p.rest ? "..." : ""}${p.optional ? "?" : ""}${p.missingType ? "!" : ""}${typeSnapshot(p.type, canon)}`)
      .join(",");
    return `func${generic}(${params})=>${desc.missingReturnType ? "!" : ""}${typeSnapshot(desc.ret, canon)}`;
  }
  if (desc.kind === "interface") {
    const members = (desc.members ?? [])
      .map((m) => `${m.readonly ? "readonly " : ""}${m.name}${m.optional ? "?" : ""}:${m.missingType ? "!" : ""}${m.unsupported ? `unsupported(${m.unsupported})` : typeSnapshot(m.type, canon)}`)
      .sort(compareText)
      .join(";");
    return `interface${generic}${(desc.heritage ?? []).map((item) => ` extends!(${item})`).join("")}{${members}}`;
  }
  if (desc.kind === "alias") {
    return `type${generic}=${typeSnapshot(desc.type, canon)}`;
  }
  if (desc.kind === "value") {
    return `value{${(desc.decls ?? []).map((d) => `${d.name}:${d.missing ? "<missing>" : typeSnapshot(d.type, canon)}`).join(";")}}`;
  }
  return `${desc.kind ?? "unknown"}:${JSON.stringify(desc)}`;
}

export function withSignatureOverrideSnapshots(mismatches, expected, actual, canon = (x) => x) {
  const goSignature = unitSignatureSnapshot(expected, canon);
  const tsSignature = unitSignatureSnapshot(actual, canon);
  return mismatches.map((mismatch) => ({ ...mismatch, goSignature, tsSignature }));
}

export function validateOverrideUse(localOverride, mismatches, id, overrideIssues) {
  if (!Array.isArray(localOverride?.allow)) return;
  for (const [aspect, kinds] of [
    ["signature", SIGNATURE_MISMATCH_KINDS],
    ["initializer", INITIALIZER_MISMATCH_KINDS],
    ["value-order", VALUE_ORDER_MISMATCH_KINDS],
  ]) {
    if (localOverride.allow.includes(aspect) && !mismatches.some((mismatch) => kinds.has(mismatch.kind))) {
      overrideIssues.push({ id, reason: `unused '${aspect}' override allowance: the current Go and TypeScript contracts have no ${aspect} mismatch` });
    }
  }
}

// --- comparison ---------------------------------------------------------------

const keyOf = (d) => (d ? canonicalKey(d) : "<none>");

// The TS top type: a `<T extends unknown>` constraint is equivalent to none.
const isTopConstraint = (c) => !!c && c.t === "kw" && (c.kw === "unknown" || c.kw === "any");

// Returns an array of mismatch objects: { kind, detail, expected?, actual? }.
// `canon` resolves ref ids through TS re-exports to their definition module.
export function compareSignatures(expected, actual, override, canon = (x) => x, conv = { equivalences: [] }, allowedGlobalNames = []) {
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

  if (expected.kind === "profileVariants") {
    const differences = [];
    for (const variant of expected.variants) {
      const variantMismatches = compareSignatures(variant.descriptor, actual, { ignore: new Set() }, canon, conv, allowedGlobalNames);
      if (variantMismatches.length > 0) {
        differences.push(`${variant.profiles.join(",")}: ${[...new Set(variantMismatches.map((mismatch) => mismatch.kind))].join(",")}`);
      }
    }
    if (differences.length > 0) {
      push("profile-variant", `TypeScript declaration does not satisfy every selected Go profile variant (${differences.join("; ")})`);
    }
    return out;
  }

  if (expected.kind !== actual.kind) {
    push("declaration-kind", `expected ${expected.kind} declaration, found ${actual.kind}`, expected.kind, actual.kind);
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
  const allowedGlobals = allowedGlobalNames instanceof Set ? allowedGlobalNames : new Set(allowedGlobalNames ?? []);
  const soft = [...new Set([...unitSoftIds(expected, conv, allowedGlobals), ...unitSoftIds(actual, conv, allowedGlobals)])];
  if (soft.length > 0) {
    push("unresolved-ref", `unresolved type identity: ${soft.slice(0, 6).join(", ")}`, undefined, undefined);
  }
  const unsupported = [...new Set([...unitUnsupportedTypes(expected), ...unitUnsupportedTypes(actual)])];
  if (unsupported.length > 0) {
    push("unsupported-type", `unsupported TypeScript signature shape: ${unsupported.slice(0, 6).join(", ")}`);
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
  else if (d.t === "object") for (const m of d.members) if (m.type) softIdsIn(m.type, acc);
  else if (d.t === "goApprox") softIdsIn(d.type, acc);
  return acc;
}

function unsupportedTypesIn(d, acc) {
  if (!d || typeof d !== "object") return acc;
  if (d.t === "unsupported") acc.add(`${d.kind}:${d.text}`);
  else if (d.t === "ref") for (const argument of d.args) unsupportedTypesIn(argument, acc);
  else if (d.t === "array") unsupportedTypesIn(d.element, acc);
  else if (d.t === "tuple") for (const element of d.elements) unsupportedTypesIn(element, acc);
  else if (d.t === "union" || d.t === "intersect") for (const member of d.members) unsupportedTypesIn(member, acc);
  else if (d.t === "fn") {
    for (const parameter of d.params) unsupportedTypesIn(parameter.type, acc);
    unsupportedTypesIn(d.ret, acc);
  } else if (d.t === "object") {
    for (const member of d.members) if (member.type) unsupportedTypesIn(member.type, acc);
  } else if (d.t === "goApprox") unsupportedTypesIn(d.type, acc);
  return acc;
}

function unitUnsupportedTypes(desc) {
  const unsupported = new Set();
  for (const [, type] of unitTypeNodes(desc)) unsupportedTypesIn(type, unsupported);
  return [...unsupported];
}

function unitSoftIds(desc, conv, allowedGlobals = new Set()) {
  const acc = new Set();
  for (const [context, t] of unitTypeNodes(desc)) softIdsIn(normalizeDescriptor(t, conv, context), acc);
  return [...acc].filter((id) => !(id.startsWith("global::") && allowedGlobals.has(id.slice("global::".length))));
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
      push("type-param-constraint", `type param #${i} constraint differs`, ec ? keyOf(ec) : "-", ac ? keyOf(ac) : "-");
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
  if (positionalDiff && [...eKeys].sort(compareText).join(" ") === [...aKeys].sort(compareText).join(" ")) {
    push("param-order", `parameters reordered: expected [${eKeys.join(", ")}], found [${aKeys.join(", ")}]`);
  } else {
    for (let i = 0; i < n; i++) {
      if (ap[i].missingType) push("param-annotation-missing", `param #${i} has no explicit type annotation`);
      if (!eq(ep[i].type, ap[i].type)) push("param-type", `param #${i} type differs`, eKeys[i], aKeys[i]);
      if (!!ep[i].rest !== !!ap[i].rest) push("variadic-position", `param #${i} rest/variadic differs`, !!ep[i].rest, !!ap[i].rest);
      if (!!ep[i].optional !== !!ap[i].optional) push("param-optionality", `param #${i} optionality differs`, !!ep[i].optional, !!ap[i].optional);
    }
  }
  if (actual.missingReturnType) push("return-annotation-missing", "function has no explicit return type annotation");
  if (JSON.stringify(expected.signatureModifiers ?? []) !== JSON.stringify(actual.signatureModifiers ?? [])) {
    push("function-modifier", "function signature modifiers differ", expected.signatureModifiers ?? [], actual.signatureModifiers ?? []);
  }
  if (!eq(expected.ret, actual.ret)) push("return-type", "return type differs", keyOf(expected.ret), keyOf(actual.ret));
}

function memberMap(desc) {
  const m = new Map();
  for (const mem of desc.members ?? []) m.set(mem.name, mem);
  return m;
}

function compareInterface(expected, actual, push, eq) {
  if (JSON.stringify(expected.heritage ?? []) !== JSON.stringify(actual.heritage ?? [])) {
    push("interface-heritage", "interface heritage is unsupported unless it exactly matches", expected.heritage ?? [], actual.heritage ?? []);
  }
  const actualCounts = new Map();
  for (const member of actual.members ?? []) actualCounts.set(member.name, (actualCounts.get(member.name) ?? 0) + 1);
  for (const [name, count] of actualCounts) {
    if (count > 1) push("duplicate-member", `TypeScript interface member '${name}' occurs ${count} times`, 1, count);
  }
  const em = memberMap(expected);
  const am = memberMap(actual);
  for (const [name, mem] of em) {
    if (!am.has(name)) {
      if (mem.optional) continue;
      push("missing-member", `member '${name}' present in Go but missing in TS`, name);
      continue;
    }
    const got = am.get(name);
    if (got.unsupported) { push("unsupported-member", `member '${name}' is an unsupported shape (${got.unsupported})`, name); continue; }
    if (!!mem.optional !== !!got.optional) push("member-optionality", `member '${name}' optionality differs`, !!mem.optional, !!got.optional);
    if (!!mem.readonly !== !!got.readonly) push("member-readonly", `member '${name}' readonly modifier differs`, !!mem.readonly, !!got.readonly);
    if (got.missingType || got.type?.t === "fn" && got.type.missingReturnType) push("member-annotation-missing", `member '${name}' has a missing type annotation`);
    if (!eq(mem.type, got.type)) push("member-type", `member '${name}' type differs`, keyOf(mem.type), keyOf(got.type));
  }
  for (const [name, mem] of am) {
    if (em.has(name)) continue;
    if (mem.unsupported) push("unsupported-member", `member '${name}' is an unsupported shape (${mem.unsupported})`, name);
    else push("extra-member", `member '${name}' present in TS but not in Go`, name);
  }
}

function compareValue(expected, actual, push, eq) {
  const ed = expected?.decls ?? [];
  const ad = actual.decls ?? [];
  const unmatchedActual = new Set(ad.map((_declaration, index) => index));
  let lastActualIndex = -1;
  for (let expectedIndex = 0; expectedIndex < ed.length; expectedIndex++) {
    const e = ed[expectedIndex];
    const actualIndex = e.name === "_"
      ? [...unmatchedActual][0]
      : ad.findIndex((declaration, index) => unmatchedActual.has(index) && declaration.name === e.name);
    if (actualIndex === undefined || actualIndex < 0) {
      push("missing-value", `value '${e.name}' present in Go but missing in TS`, e.name);
      continue;
    }
    unmatchedActual.delete(actualIndex);
    if (actualIndex < lastActualIndex) {
      push("value-order", `value '${e.name}' is out of declaration order`, expectedIndex, actualIndex);
    }
    lastActualIndex = actualIndex;
    const d = ad[actualIndex];
    if (e.valueIssue !== undefined) {
      push("value-initializer-unresolved", `value '${e.name}' initializer could not be resolved from Go: ${e.valueIssue}`, e.valueIssue);
    }
    if (d.missing) { push("value-annotation-missing", `value '${d.name}' has no explicit type annotation`, undefined, d.name); continue; }
    if (!e.type) { push("value-type-unresolved", `value '${d.name}': expected Go type could not be determined`, undefined, keyOf(d.type)); continue; }
    if (!eq(e.type, d.type)) push("value-type", `value '${d.name}' type differs`, keyOf(e.type), keyOf(d.type));
    if (e.value !== undefined && JSON.stringify(e.value) !== JSON.stringify(d.value)) {
      push("value-initializer", `value '${d.name}' initializer differs`, JSON.stringify(e.value), JSON.stringify(d.value));
    }
  }
  for (const actualIndex of unmatchedActual) {
    push("extra-value", `value '${ad[actualIndex].name}' present in TS but not in Go`, undefined, ad[actualIndex].name);
  }
}

// --- orchestration ------------------------------------------------------------

// deps: { config, snapshot, repoRoot, tsFiles:[{path}], tsById:Map<id,{path,metadata}> }
// options: { idFilter?: glob }
export async function computeSignatureReport(deps, options = {}) {
  const profile = loadProfile(deps.config);
  const api = await loadParser({
    distRoot: join(deps.repoRoot, profile.parser.distRoot),
    freshnessSrcDirs: profile.parser.freshnessSrcDirs.map((d) => join(deps.repoRoot, d)),
  });
  const conv = loadConventions(profile.conventions ?? {});
  const centralOverrides = profile.overrides ?? [];
  const overrideIssues = [];
  if (centralOverrides.length > 0) {
    overrideIssues.push({
      id: "",
      reason: "signatureCheck.overrides is banned; use local @tsgo-override metadata with goSignature and tsSignature snapshots",
    });
  }

  // Go units keyed by id, carrying minimal file info for descriptor resolution.
  const goById = new Map();
  for (const file of deps.snapshot.files) {
    for (const u of file.units ?? []) {
      goById.set(u.id, { ...u, file: { importPath: file.importPath, imports: file.imports } });
    }
  }

  // Parse every module once. The cached SourceFiles drive declaration indexing,
  // re-export resolution, constant environments, and tracked-unit extraction.
  const moduleIndex = loadTypeScriptModuleIndex(api, deps.repoRoot, deps.config.tsRoot);
  const {
    tsDecls, namedReexport, starReexport, sources, definedTypes, exportedTypes, typeNamespaceReexport, externalModules,
  } = moduleIndex;
  const valueEnvironments = buildIndexedModuleValueEnvironments(api, moduleIndex);
  const canon = createCanonicalTypeResolver({
    namedReexport,
    starReexport,
    definedTypes,
    exportedTypes,
    knownModules: new Set(moduleIndex.modules.keys()),
    externalModules,
    typeNamespaceReexport,
    canonicalTypeAliases: profile.canonicalTypeAliases ?? {},
    nodeFormAliases: profile.nodeFormAliases,
  });
  const index = buildExpectedIndex(deps.config, deps.snapshot, deps.tsById, profile, tsDecls);
  const idRe = options.idFilter ? globToRegExp(options.idFilter) : undefined;
  const mismatches = [];
  let overriddenUnits = 0;
  const expectedIds = new Set();
  for (const id of deps.tsById.keys()) {
    if (idRe && !idRe.test(id)) continue;
    if (deps.activeIds !== undefined && !deps.activeIds.has(id)) continue;
    const go = goById.get(id);
    if (go && RENDERABLE.has(go.kind)) expectedIds.add(id);
  }
  const descriptorsById = new Map();

  for (const file of deps.tsFiles) {
    const module = requireIndexedModule(moduleIndex, file.path);
    for (const u of extractParsedFileDescriptors(api, module, profile.annotation, valueEnvironments.get(file.path))) {
      if (idRe && !idRe.test(u.id)) continue;
      if (deps.activeIds !== undefined && !deps.activeIds.has(u.id)) continue;
      const descriptors = descriptorsById.get(u.id) ?? [];
      descriptors.push({ ...u, file: file.path });
      descriptorsById.set(u.id, descriptors);
    }
  }

  mismatches.push(...descriptorInventoryMismatches(expectedIds, descriptorsById));
  const jsonTags = collectJsonTagMismatches(deps.snapshot, sources, deps.tsById, deps.activeIds, {
    ...profile.jsonTags,
    api,
    moduleIndex,
  });

  for (const id of [...expectedIds].sort(compareText)) {
    const go = goById.get(id);
    const descriptors = descriptorsById.get(id) ?? [];
    const actual = descriptors.length === 1 ? descriptors[0].descriptor : undefined;
    const expected = goUnitDescriptor(go, index);
    const localOverride = deps.tsById.get(id)?.override;
    const override = resolveOverride(localOverride, id, expected, actual, canon, overrideIssues);
    const allMismatches = compareSignatures(expected, actual, { ignore: new Set() }, canon, conv, profile.allowedGlobals);
    validateOverrideUse(localOverride, allMismatches, id, overrideIssues);
    const ignoredMismatch = allMismatches.some((mismatch) => override.ignore.has(mismatch.kind));
    if (ignoredMismatch) overriddenUnits++;
    const ms = allMismatches.filter((mismatch) => !override.ignore.has(mismatch.kind));
    for (const m of withSignatureOverrideSnapshots(ms, expected, actual, canon)) {
      mismatches.push({ id, file: deps.tsById.get(id)?.path ?? "", ...m });
    }
  }
  return { mismatches, checked: expectedIds.size, descriptors: [...descriptorsById.values()].reduce((count, rows) => count + rows.length, 0), overriddenUnits, overrideIssues, jsonTags: { ...jsonTags, mismatchCount: jsonTags.mismatches.length } };
}

export function descriptorInventoryMismatches(expectedIds, descriptorsById) {
  const mismatches = [];
  for (const [id, descriptors] of descriptorsById) {
    if (!expectedIds.has(id)) {
      mismatches.push({ id, file: descriptors[0]?.file ?? "", kind: "descriptor-unexpected", detail: "TS descriptor has no active renderable @tsgo-unit contract" });
    } else if (descriptors.length > 1) {
      mismatches.push({ id, file: descriptors[0]?.file ?? "", kind: "descriptor-duplicate", detail: `${descriptors.length} TS descriptors were extracted for one @tsgo-unit` });
    }
  }
  return mismatches.sort((left, right) => compareText(left.id, right.id) || compareText(left.kind, right.kind));
}

export { resolveOverride };
