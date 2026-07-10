// Canonical structured type and declaration descriptors for TS signatures.

import { canonicalTypeScriptConstantValue, evaluateTypeScriptConstant } from "./constant-evaluation.mjs";
import { keywordOf, resolveModuleId, sliceText } from "./source-structure.mjs";

// --- canonicalization ---------------------------------------------------------

// ctx: { api, text, imports:{named,namespaces}, localTypes:Set, typeParamIndex:Map<name,int> }
export function canonicalizeType(node, ctx) {
  const { api, text } = ctx;
  if (!node) return { t: "kw", kw: "any" }; // missing annotation handled by caller; default
  const K = api.Kinds;
  switch (node.Kind) {
    case K.KindParenthesizedType:
      return canonicalizeType(node.Type, ctx);
    case K.KindArrayType:
      return { t: "array", element: canonicalizeType(node.ElementType, ctx) };
    case K.KindTupleType:
      return { t: "tuple", elements: (node.Elements?.Nodes ?? []).map((e) => canonicalizeType(e, ctx)) };
    case K.KindUnionType:
      return { t: "union", members: (node.Types?.Nodes ?? []).map((e) => canonicalizeType(e, ctx)) };
    case K.KindIntersectionType:
      return { t: "intersect", members: (node.Types?.Nodes ?? []).map((e) => canonicalizeType(e, ctx)) };
    case K.KindFunctionType:
      return canonicalizeFn(node, ctx);
    case K.KindTypeReference:
      return canonicalizeRef(node, ctx);
    case K.KindTypeLiteral:
      return canonicalizeObjectType(node.Members?.Nodes ?? [], ctx);
    case K.KindLiteralType:
      if (typeof node.Literal?.Text === "string") return { t: "lit", text: JSON.stringify(node.Literal.Text) };
      return { t: "lit", text: sliceText(api, text, node) };
    default: {
      const kw = keywordOf(api, node.Kind);
      if (kw) return { t: "kw", kw };
      // Unhandled (mapped/conditional/indexed/typeof/etc.): compare by normalized text.
      return { t: "raw", text: sliceText(api, text, node).replace(/\s+/g, " ") };
    }
  }
}

function canonicalizeFn(node, ctx) {
  const params = (node.Parameters?.Nodes ?? []).map((p) => {
    const pd = ctx.api.Casts.AsParameterDeclaration(p);
    return {
      type: pd.Type ? canonicalizeType(pd.Type, ctx) : { t: "kw", kw: "any" },
      rest: !!pd.DotDotDotToken,
      optional: !!pd.QuestionToken,
    };
  });
  return { t: "fn", params, ret: node.Type ? canonicalizeType(node.Type, ctx) : { t: "kw", kw: "void" } };
}

function canonicalizeObjectType(members, ctx) {
  return {
    t: "object",
    members: members.map((m) => memberDescriptor(ctx.api, m, ctx)).filter(Boolean),
  };
}

function entityName(api, tn) {
  // Returns { qualifier?, name } for an EntityName (Identifier or QualifiedName).
  if (!tn) return { name: undefined };
  if (tn.Kind === api.Kinds.KindIdentifier) return { name: tn.Text };
  if (tn.Kind === api.Kinds.KindQualifiedName) {
    const q = api.Casts.AsQualifiedName(tn);
    const left = q.Left;
    const qualifier = left?.Kind === api.Kinds.KindIdentifier ? left.Text : undefined;
    return { qualifier, name: q.Right?.Text };
  }
  return { name: undefined };
}

function canonicalizeRef(node, ctx) {
  const { api } = ctx;
  const { qualifier, name } = entityName(api, node.TypeName);
  const args = (node.TypeArguments?.Nodes ?? []).map((a) => canonicalizeType(a, ctx));
  // Array<T> (the global, unimported, unqualified Array) ≡ T[].
  if (!qualifier && name === "Array" && args.length === 1 &&
      !ctx.imports.named.has("Array") && !ctx.localTypes.has("Array")) {
    return { t: "array", element: args[0] };
  }
  // Positional type-parameter identity (so <T> vs <U> renames don't mismatch).
  if (!qualifier && ctx.typeParamIndex.has(name)) {
    return { t: "tp", i: ctx.typeParamIndex.get(name) };
  }
  return { t: "ref", id: resolveIdentity(ctx, qualifier, name), args };
}

function resolveIdentity(ctx, qualifier, name) {
  const { imports, localTypes, moduleId } = ctx;
  if (qualifier) {
    const ns = imports.namespaces.get(qualifier);
    if (ns) return `${resolveModuleId(ns.module, moduleId)}::${name}`;
    // qualifier is not a known namespace import — unresolved, keep both parts.
    return `unresolved::${qualifier}.${name}`;
  }
  const n = imports.named.get(name);
  if (n) return `${resolveModuleId(n.module, moduleId)}::${n.imported}`;
  if (localTypes.has(name)) return `${moduleId}::${name}`;
  // Ambient/global (builtins, lib types) — compared by name but marked unresolved
  // so it is never silently treated as equal to a same-named imported type.
  return `global::${name}`;
}

// --- canonical key (stable equality string) -----------------------------------

export function canonicalKey(d) {
  switch (d.t) {
    case "ref":
      return d.args.length ? `R:${d.id}<${d.args.map(canonicalKey).join(",")}>` : `R:${d.id}`;
    case "array":
      return `A:[${canonicalKey(d.element)}]`;
    case "tuple":
      return `T:[${d.elements.map(canonicalKey).join(",")}]`;
    case "union":
      return `U:{${flattenCompositeMembers(d, "union").map(canonicalKey).sort().join("|")}}`;
    case "intersect":
      return `I:{${flattenCompositeMembers(d, "intersect").map(canonicalKey).sort().join("&")}}`;
    case "fn":
      return `F:(${d.params
        .map((p) => `${p.rest ? "..." : ""}${p.optional ? "?" : ""}${canonicalKey(p.type)}`)
        .join(",")})=>${canonicalKey(d.ret)}`;
    case "object":
      return `O:{${d.members
        .map((m) => `${m.name}${m.optional ? "?" : ""}:${m.unsupported ? `unsupported(${m.unsupported})` : canonicalKey(m.type)}`)
        .sort()
        .join(";")}}`;
    case "kw":
      return `K:${d.kw}`;
    case "tp":
      return `P:${d.i}`;
    case "lit":
      return `L:${d.text}`;
    case "raw":
      return `X:${d.text}`;
    case "conv":
      return `C:${d.token}`;
    default:
      return `?:${JSON.stringify(d)}`;
  }
}

function canonicalKeyWithResolver(d, canon) {
  switch (d.t) {
    case "ref": {
      const id = canon(d.id);
      return d.args.length ? `R:${id}<${d.args.map((a) => canonicalKeyWithResolver(a, canon)).join(",")}>` : `R:${id}`;
    }
    case "array":
      return `A:[${canonicalKeyWithResolver(d.element, canon)}]`;
    case "tuple":
      return `T:[${d.elements.map((e) => canonicalKeyWithResolver(e, canon)).join(",")}]`;
    case "union":
      return `U:{${flattenCompositeMembers(d, "union").map((m) => canonicalKeyWithResolver(m, canon)).sort().join("|")}}`;
    case "intersect":
      return `I:{${flattenCompositeMembers(d, "intersect").map((m) => canonicalKeyWithResolver(m, canon)).sort().join("&")}}`;
    case "fn":
      return `F:(${d.params
        .map((p) => `${p.rest ? "..." : ""}${p.optional ? "?" : ""}${canonicalKeyWithResolver(p.type, canon)}`)
        .join(",")})=>${canonicalKeyWithResolver(d.ret, canon)}`;
    case "object":
      return `O:{${d.members
        .map((m) => `${m.name}${m.optional ? "?" : ""}:${m.unsupported ? `unsupported(${m.unsupported})` : canonicalKeyWithResolver(m.type, canon)}`)
        .sort()
        .join(";")}}`;
    default:
      return canonicalKey(d);
  }
}

// An id is "soft" when its module could not be resolved on one side (an ambient
// global, or a Go type with no tracked @tsgo-unit). Soft ids compare by terminal
// name; two HARD ids must match in full (so core.Node != ast.Node still holds).
function isSoftId(id) {
  return id.startsWith("global::") || id.startsWith("name::") || id.startsWith("unresolved::");
}
const terminalName = (id) => id.split("::").pop();

// Structural type equality with the soft-id rule. `canon` resolves a ref id to
// its canonical definition (following TS re-exports), so a type imported via a
// re-export module matches the same type at its definition module. Soft ids
// compare by terminal name; two HARD ids must match in full (core.Node != ast.Node).
export function typesEqual(a, b, canon = (x) => x) {
  if (!a || !b) return a === b;
  if (a.t !== b.t) return false;
  switch (a.t) {
    case "ref": {
      if (a.args.length !== b.args.length) return false;
      if (!a.args.every((x, i) => typesEqual(x, b.args[i], canon))) return false;
      const ia = canon(a.id), ib = canon(b.id);
      return isSoftId(ia) || isSoftId(ib) ? terminalName(ia) === terminalName(ib) : ia === ib;
    }
    case "array":
      return typesEqual(a.element, b.element, canon);
    case "tuple":
      return a.elements.length === b.elements.length && a.elements.every((x, i) => typesEqual(x, b.elements[i], canon));
    case "union":
    case "intersect": {
      const aMembers = flattenCompositeMembers(a, a.t);
      const bMembers = flattenCompositeMembers(b, b.t);
      if (aMembers.length !== bMembers.length) return false;
      const ak = aMembers.map((m) => canonicalKeyWithResolver(m, canon)).sort();
      const bk = bMembers.map((m) => canonicalKeyWithResolver(m, canon)).sort();
      return ak.every((k, i) => k === bk[i]);
    }
    case "fn":
      return a.params.length === b.params.length
        && a.params.every((p, i) => !!p.rest === !!b.params[i].rest && typesEqual(p.type, b.params[i].type, canon))
        && typesEqual(a.ret, b.ret, canon);
    case "object": {
      if (a.members.length !== b.members.length) return false;
      const am = new Map(a.members.map((m) => [m.name, m]));
      for (const bm of b.members) {
        const m = am.get(bm.name);
        if (!m || !!m.optional !== !!bm.optional || !!m.unsupported !== !!bm.unsupported) return false;
        if (m.unsupported || bm.unsupported) {
          if (m.unsupported !== bm.unsupported) return false;
        } else if (!typesEqual(m.type, bm.type, canon)) {
          return false;
        }
      }
      return true;
    }
    case "kw":
      return a.kw === b.kw;
    case "tp":
      return a.i === b.i;
    case "conv":
      return a.token === b.token;
    case "lit":
    case "raw":
      return a.text === b.text;
    default:
      return canonicalKey(a) === canonicalKey(b);
  }
}

function flattenCompositeMembers(d, kind) {
  const out = [];
  for (const member of d.members) {
    if (member.t === kind) out.push(...flattenCompositeMembers(member, kind));
    else out.push(member);
  }
  return out;
}

// Whether a descriptor references any unresolved (global::/name::/unresolved::) id.
export function hasUnresolved(d) {
  switch (d.t) {
    case "ref":
      return isSoftId(d.id) || d.args.some(hasUnresolved);
    case "array":
      return hasUnresolved(d.element);
    case "tuple":
    case "union":
    case "intersect":
      return (d.members ?? d.elements).some(hasUnresolved);
    case "fn":
      return d.params.some((p) => hasUnresolved(p.type)) || hasUnresolved(d.ret);
    case "object":
      return d.members.some((m) => m.type && hasUnresolved(m.type));
    default:
      return false;
  }
}

// --- declaration descriptors --------------------------------------------------

function typeParamIndexOf(api, typeParameters) {
  const idx = new Map();
  const nodes = typeParameters?.Nodes ?? [];
  for (let i = 0; i < nodes.length; i++) {
    const tp = api.Casts.AsTypeParameterDeclaration(nodes[i]);
    const nm = tp.name?.Text;
    if (nm) idx.set(nm, i);
  }
  return idx;
}

function typeParamDescriptors(api, typeParameters, ctx) {
  return (typeParameters?.Nodes ?? []).map((n) => {
    const tp = api.Casts.AsTypeParameterDeclaration(n);
    return { constraint: tp.Constraint ? canonicalizeType(tp.Constraint, ctx) : null };
  });
}

// Function-like (FunctionDeclaration / MethodSignature) -> {params, ret, typeParams}.
function functionDescriptor(api, fnLike, baseCtx) {
  const typeParamIndex = typeParamIndexOf(api, fnLike.TypeParameters);
  const ctx = { ...baseCtx, typeParamIndex };
  const params = (fnLike.Parameters?.Nodes ?? []).map((p) => {
    const pd = api.Casts.AsParameterDeclaration(p);
    return {
      type: pd.Type ? canonicalizeType(pd.Type, ctx) : { t: "kw", kw: "any" },
      rest: !!pd.DotDotDotToken,
      optional: !!pd.QuestionToken,
      missingType: !pd.Type,
    };
  });
  return {
    params,
    ret: fnLike.Type ? canonicalizeType(fnLike.Type, ctx) : { t: "kw", kw: "void" },
    typeParams: typeParamDescriptors(api, fnLike.TypeParameters, ctx),
  };
}

// Builds a descriptor for a single top-level declaration node.
// baseCtx: { api, text, imports, localTypes }
export function declarationDescriptor(api, node, baseCtx) {
  const K = api.Kinds;
  if (node.Kind === K.KindFunctionDeclaration) {
    const f = api.Casts.AsFunctionDeclaration(node);
    return { kind: "func", name: f.name?.Text, ...functionDescriptor(api, f, baseCtx) };
  }
  if (node.Kind === K.KindInterfaceDeclaration) {
    const i = api.Casts.AsInterfaceDeclaration(node);
    const typeParamIndex = typeParamIndexOf(api, i.TypeParameters);
    const ctx = { ...baseCtx, typeParamIndex };
    const members = (i.Members?.Nodes ?? []).map((m) => memberDescriptor(api, m, ctx)).filter(Boolean);
    return {
      kind: "interface",
      name: i.name?.Text,
      typeParams: typeParamDescriptors(api, i.TypeParameters, ctx),
      members,
    };
  }
  if (node.Kind === K.KindTypeAliasDeclaration) {
    const a = api.Casts.AsTypeAliasDeclaration(node);
    const typeParamIndex = typeParamIndexOf(api, a.TypeParameters);
    const ctx = { ...baseCtx, typeParamIndex };
    return {
      kind: "alias",
      name: a.name?.Text,
      typeParams: typeParamDescriptors(api, a.TypeParameters, ctx),
      type: a.Type ? canonicalizeType(a.Type, ctx) : { t: "kw", kw: "any" },
    };
  }
  if (node.Kind === K.KindVariableStatement) {
    const v = api.Casts.AsVariableStatement(node);
    const ctx = { ...baseCtx, typeParamIndex: new Map() };
    const decls = [];
    for (const d of v.DeclarationList?.Declarations?.Nodes ?? []) {
      const vd = api.Casts.AsVariableDeclaration(d);
      const evaluatedValue = evaluateTypeScriptConstant(api, vd.Initializer, ctx.valueEnvironment);
      const declaration = {
        name: vd.name?.Text,
        missing: !vd.Type, // unannotated ported value decl -> hard mismatch
        type: vd.Type ? canonicalizeType(vd.Type, ctx) : null,
        value: canonicalTypeScriptConstantValue(evaluatedValue),
      };
      decls.push(declaration);
      if (declaration.name !== undefined && evaluatedValue !== undefined) {
        ctx.valueEnvironment?.set(declaration.name, evaluatedValue);
      }
    }
    return { kind: "value", decls };
  }
  return { kind: "other", nodeKind: api.kindName.get(node.Kind) };
}

// Interface member -> { name, type } where a method becomes an {t:'fn'} type so
// `m(p): R` ≡ a property `m: (p) => R`.
function memberDescriptor(api, m, ctx) {
  if (m.Kind === api.Kinds.KindMethodSignature) {
    const sig = api.Casts.AsMethodSignatureDeclaration(m);
    const fn = functionDescriptor(api, sig, ctx);
    return { name: sig.name?.Text, type: { t: "fn", params: fn.params, ret: fn.ret } };
  }
  if (m.Kind === api.Kinds.KindPropertySignature) {
    const sig = api.Casts.AsPropertySignatureDeclaration(m);
    if (sliceText(api, ctx.text, sig.name) === "[JsonFieldNames]") {
      return null;
    }
    return {
      name: sig.name?.Text,
      type: sig.Type ? canonicalizeType(sig.Type, ctx) : { t: "kw", kw: "any" },
      optional: !!sig.PostfixToken || undefined,
    };
  }
  // Call / index / construct signatures and other member shapes are not modeled;
  // surface them (keyed by kind) rather than silently dropping them.
  const kindName = ctx.api.kindName.get(m.Kind) ?? `kind${m.Kind}`;
  return { name: `<${kindName}>`, unsupported: kindName };
}

export { isSoftId, terminalName };
