// Expected-side descriptors derived DIRECTLY from the Go extractor's structured
// type model (TypeExprReport), NOT from rendering TS in isolation (which can't
// resolve same-package / split-relocated types and produced ~93% false mismatches).
//
// Each Go named type resolves to the TS module where its @tsgo-unit ACTUALLY
// lives (authoritative, split-aware), so identities match the actual file's
// imports: e.g. Go `ast.Node` -> wherever `Node`'s @tsgo-unit is (spine.ts),
// which is exactly what the actual file imports. This preserves strict
// import-identity (core.Node != ast.Node) while eliminating the isolation noise.

// All Go->TS mapping knowledge comes from the project `profile` (see profile.mjs);
// nothing tsts-specific is hardcoded here.

function isInternal(importPath, goModule) {
  return importPath === goModule || importPath.startsWith(goModule + "/");
}

// tsDecls: Map<typeName, Set<moduleId>> of every exported type declaration in TS
// (incl. generated, non-@tsgo-unit types), so a Go type that exists in TS but
// isn't unit-tracked still resolves to its real defining module.
export function buildExpectedIndex(config, snapshot, tsById, profile, tsDecls = new Map()) {
  const goModule = config.goModulePath;
  // (packageImportPath::TypeName) -> actual TS module path (where its @tsgo-unit lives)
  const pkgType = new Map();
  // (packageImportPath::TypeName) -> the type's own type-parameter details (so a
  // method on a generic type inherits the receiver's type params, as the TS port does).
  const typeParams = new Map();
  for (const file of snapshot.files) {
    for (const u of file.units ?? []) {
      if (u.kind !== "type") continue;
      const ts = tsById.get(u.id);
      if (ts) pkgType.set(`${file.importPath}::${u.name}`, ts.path);
      if (u.typeParameterDetails?.length) typeParams.set(`${file.importPath}::${u.name}`, u.typeParameterDetails);
    }
  }
  return {
    goModule,
    tsRoot: config.tsRoot,
    core: profile.modules.core,
    compat: profile.modules.compat,
    bridge: profile.bridge,
    primKeyword: profile.primitives.keyword,
    primCore: profile.primitives.core,
    primCompat: profile.primitives.compat,
    stdlibTypes: profile.stdlibTypes,
    facadeTemplate: profile.facadeTemplate,
    pkgType,
    typeParams,
    tsDecls,
  };
}

const ref = (id, args = []) => ({ t: "ref", id, args });

// The TS source directory for a Go import path (strip the module prefix, map
// under tsRoot): github.com/…/internal/ast -> packages/tsts/src/internal/ast.
function tsDirForPackage(index, importPath) {
  if (importPath === index.goModule) return index.tsRoot;
  if (!importPath.startsWith(index.goModule + "/")) return undefined;
  return `${index.tsRoot}/${importPath.slice(index.goModule.length + 1)}`;
}

// Resolve a Go type to a TS module by its actual declaration location, preferring
// a declaration under the package's TS directory (handles generated/aliased types).
function resolveTsDecl(index, importPath, name) {
  const mods = index.tsDecls.get(name);
  if (!mods) return undefined;
  const tsDir = tsDirForPackage(index, importPath);
  if (!tsDir) return undefined;
  const candidates = [...mods].filter((m) => m === tsDir || m.startsWith(`${tsDir}/`)).sort();
  return candidates[0];
}

// Resolve a bare named type used inside package `importPath`.
function resolveNamed(name, ctx) {
  if (ctx.typeParamIndex.has(name)) return { t: "tp", i: ctx.typeParamIndex.get(name) };
  const i = ctx.index;
  if (name in i.primKeyword) return { t: "kw", kw: i.primKeyword[name] };
  if (name in i.primCore) return ref(`${i.core}::${i.primCore[name]}`);
  if (name in i.primCompat) return ref(`${i.compat}::${i.primCompat[name]}`);
  const tsPath = i.pkgType.get(`${ctx.importPath}::${name}`);
  if (tsPath) return ref(`${tsPath}::${name}`);
  const decl = resolveTsDecl(i, ctx.importPath, name); // generated/untracked TS type
  if (decl) return ref(`${decl}::${name}`);
  return ref(`name::${name}`); // genuinely unresolved -> surfaced as unresolved-ref
}

// Resolve a qualified `pkg.Name`.
function resolveSelector(pkg, name, ctx) {
  const i = ctx.index;
  if (name in i.primCompat) return ref(`${i.compat}::${i.primCompat[name]}`);
  const compatName = i.stdlibTypes[`${pkg}.${name}`];
  if (compatName) return ref(`${i.compat}::${compatName}`);
  // Find the Go import whose package name (last path segment) matches `pkg`.
  const imp = (ctx.fileImports ?? []).find((x) => x.path === pkg || x.path.split("/").pop() === pkg);
  const importPath = imp?.path ?? pkg;
  if (isInternal(importPath, i.goModule)) {
    const tsPath = i.pkgType.get(`${importPath}::${name}`);
    if (tsPath) return ref(`${tsPath}::${name}`);
    const decl = resolveTsDecl(i, importPath, name);
    if (decl) return ref(`${decl}::${name}`);
    return ref(`name::${name}`);
  }
  // Stdlib / runtime package -> facade module (template, e.g. sync/atomic ->
  // go/sync/atomic.ts) matching the actual import.
  return ref(`${i.facadeTemplate.replace("{importPath}", importPath)}::${name}`);
}

// Map a Go TypeExprReport to a canonical descriptor.
export function goTypeToDescriptor(expr, ctx) {
  if (!expr) return { t: "kw", kw: "unknown" };
  switch (expr.kind) {
    case "ident":
      return resolveNamed(expr.name, ctx);
    case "selector":
      return resolveSelector(expr.package, expr.name, ctx);
    case "paren":
      return goTypeToDescriptor(expr.element, ctx);
    case "pointer":
      return ref(`${ctx.index.compat}::${ctx.index.bridge.pointer}`, [goTypeToDescriptor(expr.element, ctx)]);
    case "slice":
      return ref(`${ctx.index.compat}::${ctx.index.bridge.slice}`, [goTypeToDescriptor(expr.element, ctx)]);
    case "ellipsis":
      return ref(`${ctx.index.compat}::${ctx.index.bridge.slice}`, [goTypeToDescriptor(expr.element, ctx)]);
    case "array":
      return ref(`${ctx.index.compat}::${ctx.index.bridge.array}`, [
        goTypeToDescriptor(expr.element, ctx),
        { t: "lit", text: JSON.stringify(expr.length ?? "") },
      ]);
    case "map":
      return ref(`${ctx.index.compat}::${ctx.index.bridge.map}`, [
        goTypeToDescriptor(expr.key, ctx),
        goTypeToDescriptor(expr.value, ctx),
      ]);
    case "channel":
      return ref(`${ctx.index.compat}::${ctx.index.bridge.chan}`, [
        goTypeToDescriptor(expr.element, ctx),
        { t: "lit", text: JSON.stringify(expr.direction ?? "bidirectional") },
      ]);
    case "func":
      return goFuncType(expr, ctx);
    case "instantiation": {
      const base = goTypeToDescriptor(expr.element, ctx);
      const args = (expr.typeArgs ?? []).map((a) => goTypeToDescriptor(a, ctx));
      return base.t === "ref" ? ref(base.id, args) : base;
    }
    case "interface":
    case "struct": {
      // Empty inline struct/interface (e.g. `chan struct{}`) is rendered as the
      // empty-object marker; non-empty inline object types are rare in signatures.
      const members = expr.members ?? [];
      if (members.length === 0) return { t: "raw", text: "{ readonly __tsgoEmpty?: never }" };
      return { t: "raw", text: expr.kind === "interface" ? "<inline-interface>" : "<inline-struct>" };
    }
    case "unary":
    case "binary":
      return { t: "raw", text: (expr.text ?? "").replace(/\s+/g, " ") };
    default:
      return { t: "raw", text: (expr.text ?? expr.kind ?? "").replace(/\s+/g, " ") };
  }
}

// Go params -> descriptor params (flattening Go's grouped names: one entry per name).
function goParams(list, ctx) {
  const out = [];
  for (const p of list ?? []) {
    const rest = !!p.variadic;
    const elem = rest && p.type?.kind === "ellipsis" ? p.type.element : p.type;
    const type = rest
      ? { t: "array", element: goTypeToDescriptor(elem, ctx) } // ...x: T[]
      : goTypeToDescriptor(p.type, ctx);
    const names = p.names && p.names.length > 0 ? p.names : [undefined];
    for (const _ of names) out.push({ type, rest });
  }
  return out;
}

function goResults(list, ctx) {
  const flat = [];
  for (const r of list ?? []) {
    const names = r.names && r.names.length > 0 ? r.names : [undefined];
    for (const _ of names) flat.push(goTypeToDescriptor(r.type, ctx));
  }
  if (flat.length === 0) return { t: "kw", kw: "void" };
  if (flat.length === 1) return flat[0];
  return { t: "tuple", elements: flat }; // Go multiple returns -> TS tuple
}

function goFuncType(expr, ctx) {
  return {
    t: "fn",
    params: goParams(expr.parameters, ctx).map((p) => ({ type: p.type, rest: p.rest })),
    ret: goResults(expr.results, ctx),
  };
}

function baseTypeName(expr) {
  if (!expr) return undefined;
  if (expr.kind === "pointer" || expr.kind === "paren") return baseTypeName(expr.element);
  if (expr.kind === "instantiation") return baseTypeName(expr.element);
  if (expr.kind === "ident") return expr.name;
  return undefined;
}

function receiverTypeParams(unit, index, importPath) {
  const name = baseTypeName(unit.receiverType);
  if (!name) return [];
  return index.typeParams.get(`${importPath}::${name}`) ?? [];
}

function typeParamIndexOf(details) {
  const m = new Map();
  (details ?? []).forEach((d, i) => m.set(d.name, i));
  return m;
}

function typeParamDescriptors(details, ctx) {
  return (details ?? []).map((d) => ({
    constraint: d.constraint ? goTypeToDescriptor(d.constraint, ctx) : null,
  }));
}

// Build the expected descriptor for a Go unit (same shape as the actual side).
export function goUnitDescriptor(unit, index) {
  const importPath = unit.file?.importPath ?? unit.metadata?.importPath ?? "";
  const fileImports = unit.file?.imports ?? unit.imports ?? [];
  const baseCtx = { index, importPath, fileImports, typeParamIndex: new Map() };

  if (unit.kind === "func" || unit.kind === "method") {
    // A Go method on a generic type carries no method-level type params, but the
    // TS port puts the receiver type's params on the function. Prepend them.
    const receiverParams = unit.kind === "method" ? receiverTypeParams(unit, index, importPath) : [];
    const allTypeParamDetails = [...receiverParams, ...(unit.typeParameterDetails ?? [])];
    const tpIndex = typeParamIndexOf(allTypeParamDetails);
    const ctx = { ...baseCtx, typeParamIndex: tpIndex };
    const params = [];
    if (unit.kind === "method" && unit.receiverType) {
      params.push({ type: goTypeToDescriptor(unit.receiverType, ctx), rest: false });
    }
    params.push(...goParams(unit.parameters, ctx).map((p) => ({ type: p.type, rest: p.rest })));
    return {
      kind: "func",
      params,
      ret: goResults(unit.results, ctx),
      typeParams: typeParamDescriptors(allTypeParamDetails, ctx),
    };
  }

  if (unit.kind === "type") {
    const tpIndex = typeParamIndexOf(unit.typeParameterDetails);
    const ctx = { ...baseCtx, typeParamIndex: tpIndex };
    if (unit.typeKind === "struct" || unit.typeKind === "interface") {
      const members = (unit.members ?? [])
        .filter((m) => m.name && (m.kind === "field" || m.kind === "method"))
        .map((m) => ({ name: m.name, type: goTypeToDescriptor(m.typeExpr, ctx) }));
      return { kind: "interface", typeParams: typeParamDescriptors(unit.typeParameterDetails, ctx), members };
    }
    // alias / named type
    return {
      kind: "alias",
      typeParams: typeParamDescriptors(unit.typeParameterDetails, ctx),
      type: unit.typeExpression ? goTypeToDescriptor(unit.typeExpression, ctx) : { t: "kw", kw: "unknown" },
    };
  }

  if (unit.kind === "constGroup" || unit.kind === "varGroup") {
    const ctx = baseCtx;
    const decls = [];
    for (const spec of unit.valueSpecs ?? []) {
      const declType = spec.type
        ? goTypeToDescriptor(spec.type, ctx)
        : (spec.inferredValueTypes ?? [])[0]
          ? goTypeToDescriptor((spec.inferredValueTypes ?? [])[0], ctx)
          : null;
      for (const name of spec.names ?? []) decls.push({ name, type: declType });
    }
    return { kind: "value", decls };
  }

  return { kind: "other" };
}
