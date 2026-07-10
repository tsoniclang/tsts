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

export function isInternal(importPath, goModule) {
  return importPath === goModule || importPath.startsWith(goModule + "/");
}

// tsDecls: Map<typeName, Set<moduleId>> of every exported type declaration in TS
// (incl. generated, non-@tsgo-unit types), so a Go type that exists in TS but
// isn't unit-tracked still resolves to its real defining module.
export function buildExpectedIndex(config, snapshot, tsById, profile, tsDecls = new Map()) {
  const goModule = config.goModulePath;
  // (packageImportPath::TypeName) -> actual TS module path (where its @tsgo-unit lives)
  const pkgType = new Map();
  const typeUnits = new Map();
  const functionUnits = new Map();
  const valueSpecs = new Map();
  const receiverMethods = new Map();
  // (packageImportPath::TypeName) -> the type's own type-parameter details (so a
  // method on a generic type inherits the receiver's type params, as the TS port does).
  const typeParams = new Map();
  for (const file of snapshot.files) {
    for (const u of file.units ?? []) {
      if (u.kind !== "type") continue;
      const ts = tsById.get(u.id);
      if (ts) pkgType.set(`${file.importPath}::${u.name}`, ts.path);
      typeUnits.set(`${file.importPath}::${u.name}`, { unit: u, importPath: file.importPath, fileImports: file.imports });
      if (u.typeParameterDetails?.length) typeParams.set(`${file.importPath}::${u.name}`, u.typeParameterDetails);
    }
    for (const u of file.units ?? []) {
      if (u.kind === "func") functionUnits.set(`${file.importPath}::${u.name}`, { unit: u, importPath: file.importPath, fileImports: file.imports });
      if (u.kind === "method") {
        const receiver = baseTypeName(u.receiverType);
        if (receiver) {
          const key = `${file.importPath}::${receiver}`;
          if (!receiverMethods.has(key)) receiverMethods.set(key, []);
          receiverMethods.get(key).push({ unit: u, importPath: file.importPath, fileImports: file.imports });
        }
      }
      if (u.kind === "constGroup" || u.kind === "varGroup") {
        for (const spec of u.valueSpecs ?? []) {
          (spec.names ?? []).forEach((name, ordinal) => valueSpecs.set(`${file.importPath}::${name}`, {
            spec,
            ordinal,
            importPath: file.importPath,
            fileImports: file.imports,
          }));
        }
      }
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
    externalFunctionReturns: profile.externalFunctionReturns ?? {},
    externalValueTypes: profile.externalValueTypes ?? {},
    externalInterfaceMembers: profile.externalInterfaceMembers ?? {},
    facadeTemplate: profile.facadeTemplate,
    pkgType,
    typeUnits,
    functionUnits,
    valueSpecs,
    receiverMethods,
    typeParams,
    tsDecls,
  };
}

export const ref = (id, args = []) => ({ t: "ref", id, args });

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
export function resolveNamed(name, ctx) {
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
  // Resolve through the package name reported by Go. Import-path basenames are
  // not source identifiers (for example math/rand/v2 is package rand).
  const imp = (ctx.fileImports ?? []).find((x) => x.path === pkg || importSourceName(x) === pkg);
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
      // empty-object marker. Non-empty inline objects are compared structurally:
      // Go `struct { flag TypeFlags; name string }` must match TS
      // `{ flag: TypeFlags; name: string }` without collapsing to a raw marker.
      const members = expr.members ?? [];
      if (members.length === 0) {
        return { t: "object", members: [{ name: "__tsgoEmpty", optional: true, type: { t: "kw", kw: "never" } }] };
      }
      return {
        t: "object",
        members: members
          .filter((m) => m.name && (m.kind === "field" || m.kind === "method"))
          .map((m) => ({
            name: m.name,
            type: m.kind === "method" ? goFuncType(m.typeExpr, ctx) : goTypeToDescriptor(m.typeExpr, ctx),
          })),
      };
    }
    case "unary":
    case "binary":
      return goTypeTextToDescriptor(expr.text ?? "", ctx);
    default:
      return { t: "raw", text: (expr.text ?? expr.kind ?? "").replace(/\s+/g, " ") };
  }
}

// Go params -> descriptor params (flattening Go's grouped names: one entry per name).
export function goParams(list, ctx) {
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

export function goResults(list, ctx) {
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

export function receiverTypeParams(unit, index, importPath) {
  const name = baseTypeName(unit.receiverType);
  if (!name) return [];
  return index.typeParams.get(`${importPath}::${name}`) ?? [];
}

export function typeParamIndexOf(details) {
  const m = new Map();
  (details ?? []).forEach((d, i) => m.set(d.name, i));
  return m;
}

export function typeParamDescriptors(details, ctx) {
  return (details ?? []).map((d) => ({
    constraint: d.constraint ? goTypeToDescriptor(d.constraint, ctx) : null,
  }));
}

export function resolveKnownTypeName(name, ctx) {
  const resolved = resolveNamed(name, ctx);
  if (resolved.t !== "ref") return resolved;
  return resolved.id.startsWith("name::") ? null : resolved;
}

export function resolveKnownSelectorType(pkg, name, ctx) {
  const i = ctx.index;
  const imp = (ctx.fileImports ?? []).find((x) => x.path === pkg || importSourceName(x) === pkg);
  const importPath = imp?.path ?? pkg;
  if (isInternal(importPath, i.goModule)) {
    const tsPath = i.pkgType.get(`${importPath}::${name}`);
    if (tsPath) return ref(`${tsPath}::${name}`);
    const decl = resolveTsDecl(i, importPath, name);
    if (decl) return ref(`${decl}::${name}`);
  }
  const compatName = i.stdlibTypes[`${pkg}.${name}`];
  return compatName ? ref(`${i.compat}::${compatName}`) : null;
}

export function descriptorFromProfileType(entry) {
  if (!entry) return null;
  if (entry.descriptor) return entry.descriptor;
  if (entry.keyword) return { t: "kw", kw: entry.keyword };
  if (entry.module && entry.name) return ref(`${entry.module}::${entry.name}`);
  return null;
}

export function resolveImportPath(pkg, ctx) {
  const imp = (ctx.fileImports ?? []).find((x) => x.path === pkg || importSourceName(x) === pkg);
  return imp?.path ?? pkg;
}

function importSourceName(imported) {
  if (imported?.name === "_" || imported?.name === ".") return undefined;
  return imported?.name ?? imported?.packageName;
}

function splitTopLevel(text, separator) {
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "[" || ch === "(" || ch === "{") depth++;
    else if (ch === "]" || ch === ")" || ch === "}") depth--;
    else if (ch === separator && depth === 0) return [text.slice(0, i), text.slice(i + 1)];
  }
  return undefined;
}

export function splitTopLevelOperator(text, operator) {
  let depth = 0;
  for (let i = 0; i <= text.length - operator.length; i++) {
    const ch = text[i];
    if (ch === "[" || ch === "(" || ch === "{") depth++;
    else if (ch === "]" || ch === ")" || ch === "}") depth--;
    if (depth === 0 && text.slice(i, i + operator.length) === operator) {
      if ((operator === "<" || operator === ">") && text[i + 1] === operator) continue;
      return [text.slice(0, i).trim(), text.slice(i + operator.length).trim()];
    }
  }
  return undefined;
}

export function splitTopLevelList(text) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "[" || ch === "(" || ch === "{") depth++;
    else if (ch === "]" || ch === ")" || ch === "}") depth--;
    else if (ch === "," && depth === 0) {
      out.push(text.slice(start, i).trim());
      start = i + 1;
    }
  }
  const tail = text.slice(start).trim();
  if (tail) out.push(tail);
  return out;
}

export function goTypeTextToDescriptor(text, ctx) {
  const source = text.trim();
  const union = splitTopLevel(source, "|");
  if (union && !union.some((part) => part.trim().startsWith("~"))) {
    return { t: "union", members: union.map((part) => goTypeTextToDescriptor(part, ctx)) };
  }
  if (union) return { t: "raw", text: source.replace(/\s+/g, " ") };
  if (source.startsWith("*")) {
    return ref(`${ctx.index.compat}::${ctx.index.bridge.pointer}`, [goTypeTextToDescriptor(source.slice(1), ctx)]);
  }
  if (source.startsWith("[]")) {
    return ref(`${ctx.index.compat}::${ctx.index.bridge.slice}`, [goTypeTextToDescriptor(source.slice(2), ctx)]);
  }
  if (source.startsWith("map[")) {
    const close = source.indexOf("]");
    if (close > 4) {
      return ref(`${ctx.index.compat}::${ctx.index.bridge.map}`, [
        goTypeTextToDescriptor(source.slice(4, close), ctx),
        goTypeTextToDescriptor(source.slice(close + 1), ctx),
      ]);
    }
  }
  const array = source.match(/^\[([^\]]+)\]([\s\S]+)$/);
  if (array) {
    return ref(`${ctx.index.compat}::${ctx.index.bridge.array}`, [
      goTypeTextToDescriptor(array[2], ctx),
      { t: "lit", text: JSON.stringify(array[1]) },
    ]);
  }
  const instantiation = source.match(/^([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)?)\[([\s\S]*)\]$/);
  if (instantiation && !source.startsWith("map[")) {
    const base = goTypeTextToDescriptor(instantiation[1], ctx);
    const args = splitTopLevelList(instantiation[2]).map((a) => goTypeTextToDescriptor(a, ctx));
    return base.t === "ref" ? ref(base.id, args) : base;
  }
  const selector = source.match(/^([A-Za-z_]\w*)\.([A-Za-z_]\w*)$/);
  if (selector) return resolveSelector(selector[1], selector[2], ctx);
  const ident = source.match(/^[A-Za-z_]\w*$/);
  if (ident) return resolveNamed(source, ctx);
  return { t: "raw", text: source.replace(/\s+/g, " ") };
}
