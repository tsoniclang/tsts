// Canonical structured TypeScript signature descriptors. Implementation bodies
// are opaque; every supported value below comes from declaration syntax only.

import { compareText } from "../../core/deterministic-order.mjs";
import { parameterInitializerDescriptor } from "../parameter-initializer.mjs";
import { keywordOf, resolveModuleId, sliceText } from "../source-structure.mjs";
import { computedPropertyIdentity } from "./computed-property-identity.mjs";

export function canonicalizeType(node, ctx) {
  if (!node) return { t: "kw", kw: "any" };
  const K = ctx.api.Kinds;
  switch (node.Kind) {
    case K.KindParenthesizedType: return canonicalizeType(node.Type, ctx);
    case K.KindArrayType: return { t: "array", element: canonicalizeType(node.ElementType, ctx) };
    case K.KindTupleType: return { t: "tuple", elements: nodes(node.Elements).map((element) => canonicalizeType(element, ctx)) };
    case K.KindNamedTupleMember: return canonicalizeNamedTuple(node, ctx);
    case K.KindOptionalType: return { t: "optional", type: canonicalizeType(node.Type, ctx) };
    case K.KindRestType: return { t: "rest", type: canonicalizeType(node.Type, ctx) };
    case K.KindUnionType: return { t: "union", members: nodes(node.Types).map((member) => canonicalizeType(member, ctx)) };
    case K.KindIntersectionType: return { t: "intersect", members: nodes(node.Types).map((member) => canonicalizeType(member, ctx)) };
    case K.KindFunctionType: return callableDescriptor(node, ctx, "fn");
    case K.KindConstructorType: return callableDescriptor(node, ctx, "constructor");
    case K.KindTypeReference: return canonicalizeRef(node, ctx);
    case K.KindTypeLiteral: return canonicalizeObjectType(nodes(node.Members), ctx);
    case K.KindLiteralType: return literalDescriptor(node.Literal, ctx);
    case K.KindTypePredicate: return canonicalizePredicate(node, ctx);
    case K.KindTypeQuery: return canonicalizeQuery(node, ctx);
    case K.KindConditionalType: return canonicalizeConditional(node, ctx);
    case K.KindInferType: return canonicalizeInfer(node, ctx);
    case K.KindThisType: return { t: "this" };
    case K.KindTypeOperator: return canonicalizeOperator(node, ctx);
    case K.KindIndexedAccessType:
      return { t: "indexed", object: canonicalizeType(node.ObjectType, ctx), index: canonicalizeType(node.IndexType, ctx) };
    case K.KindMappedType: return canonicalizeMapped(node, ctx);
    case K.KindTemplateLiteralType: return canonicalizeTemplate(node, ctx);
    case K.KindImportType: return canonicalizeImportType(node, ctx);
    default: {
      const keyword = keywordOf(ctx.api, node.Kind);
      return keyword ? { t: "kw", kw: keyword } : unsupportedNode(node, ctx);
    }
  }
}

function callableDescriptor(node, ctx, kind) {
  const typeParamIndex = typeParamIndexOf(ctx.api, node.TypeParameters, ctx.typeParamIndex);
  const parameters = nodes(node.Parameters).map((parameter) => ctx.api.Casts.AsParameterDeclaration(parameter));
  const valueParamIndex = new Map();
  parameters.forEach((parameter, index) => {
    if (parameter.name?.Kind === ctx.api.Kinds.KindIdentifier && parameter.name.Text !== "this") {
      valueParamIndex.set(parameter.name.Text, index);
    }
  });
  const signatureCtx = { ...ctx, typeParamIndex, valueParamIndex };
  return {
    t: kind,
    params: parameters.map((parameter) => parameterDescriptor(parameter, signatureCtx)),
    ret: node.Type ? canonicalizeType(node.Type, signatureCtx) : { t: "kw", kw: "void" },
    missingReturnType: !node.Type,
    returnTypePolicy: "required",
    typeParams: typeParamDescriptors(ctx.api, node.TypeParameters, signatureCtx),
    signatureModifiers: callableModifiers(ctx.api, node),
  };
}

function parameterDescriptor(parameter, ctx) {
  if (parameter.name?.Kind !== ctx.api.Kinds.KindIdentifier) {
    const kind = ctx.api.kindName.get(parameter.name?.Kind) ?? "<missing>";
    throw new Error(`Porter requires a structural parameter binding descriptor before accepting ${kind} in '${ctx.moduleId}'`);
  }
  const question = !!parameter.QuestionToken;
  const initializer = !!parameter.Initializer;
  const initializerDescriptor = parameterInitializerDescriptor(ctx.api, parameter.Initializer, ctx.valueEnvironment);
  return {
    name: parameter.name.Text,
    type: parameter.Type ? canonicalizeType(parameter.Type, ctx) : { t: "kw", kw: "any" },
    rest: !!parameter.DotDotDotToken,
    optional: question || initializer,
    optionalSyntax: question && initializer ? "question+initializer" : question ? "question" : initializer ? "initializer" : "required",
    question,
    role: parameter.name.Text === "this" ? "this" : "parameter",
    modifiers: modifierKinds(ctx.api, parameter),
    missingType: !parameter.Type,
    ...initializerDescriptor,
  };
}

function canonicalizeNamedTuple(node, ctx) {
  const tuple = ctx.api.Casts.AsNamedTupleMember(node);
  return {
    t: "namedTuple",
    name: tuple.name?.Text,
    rest: !!tuple.DotDotDotToken,
    optional: !!tuple.QuestionToken,
    type: canonicalizeType(tuple.Type, ctx),
  };
}

function canonicalizePredicate(node, ctx) {
  const predicate = ctx.api.Casts.AsTypePredicateNode(node);
  const parameter = predicate.ParameterName;
  let subject;
  if (parameter?.Kind === ctx.api.Kinds.KindThisType) subject = { kind: "this" };
  else if (parameter?.Kind === ctx.api.Kinds.KindIdentifier) {
    const index = ctx.valueParamIndex?.get(parameter.Text);
    subject = index === undefined ? { kind: "unresolved", name: parameter.Text } : { kind: "parameter", index };
  } else subject = { kind: "unsupported", nodeKind: ctx.api.kindName.get(parameter?.Kind) ?? "missing" };
  return { t: "predicate", asserts: !!predicate.AssertsModifier, subject, type: predicate.Type ? canonicalizeType(predicate.Type, ctx) : null };
}

function canonicalizeConditional(node, ctx) {
  const conditional = ctx.api.Casts.AsConditionalTypeNode(node);
  const inferred = collectConditionalInfers(conditional.ExtendsType, ctx.api);
  const typeParamIndex = bindNamedTypeParameters(ctx.api, inferred, ctx.typeParamIndex, true);
  const inferCtx = { ...ctx, typeParamIndex };
  return {
    t: "conditional",
    check: canonicalizeType(conditional.CheckType, ctx),
    extends: canonicalizeType(conditional.ExtendsType, inferCtx),
    trueType: canonicalizeType(conditional.TrueType, inferCtx),
    falseType: canonicalizeType(conditional.FalseType, ctx),
  };
}

function collectConditionalInfers(root, api) {
  const declarations = [];
  const visit = (node, nested) => {
    if (!node || nested && node.Kind === api.Kinds.KindConditionalType) return;
    if (node.Kind === api.Kinds.KindInferType) {
      declarations.push(api.Casts.AsInferTypeNode(node).TypeParameter);
      return;
    }
    api.Node_ForEachChild(node, (child) => {
      visit(child, true);
      return false;
    });
  };
  visit(root, false);
  return declarations;
}

function canonicalizeInfer(node, ctx) {
  const parameter = ctx.api.Casts.AsInferTypeNode(node).TypeParameter;
  return { t: "infer", parameter: typeParameterDescriptor(ctx.api, parameter, ctx) };
}

function canonicalizeOperator(node, ctx) {
  const operator = ctx.api.Casts.AsTypeOperatorNode(node);
  const names = new Map([
    [ctx.api.Kinds.KindKeyOfKeyword, "keyof"],
    [ctx.api.Kinds.KindReadonlyKeyword, "readonly"],
    [ctx.api.Kinds.KindUniqueKeyword, "unique"],
  ]);
  const name = names.get(operator.Operator);
  return name === undefined ? unsupportedNode(node, ctx, `TypeOperator:${ctx.api.kindName.get(operator.Operator) ?? operator.Operator}`) :
    { t: "operator", operator: name, type: canonicalizeType(operator.Type, ctx) };
}

function canonicalizeMapped(node, ctx) {
  const mapped = ctx.api.Casts.AsMappedTypeNode(node);
  const typeParamIndex = bindNamedTypeParameters(ctx.api, [mapped.TypeParameter], ctx.typeParamIndex, false);
  const mappedCtx = { ...ctx, typeParamIndex };
  return {
    t: "mapped",
    readonly: mappedModifier(ctx.api, mapped.ReadonlyToken),
    optional: mappedModifier(ctx.api, mapped.QuestionToken),
    typeParam: typeParameterDescriptor(ctx.api, mapped.TypeParameter, mappedCtx),
    nameType: mapped.NameType ? canonicalizeType(mapped.NameType, mappedCtx) : null,
    valueType: mapped.Type ? canonicalizeType(mapped.Type, mappedCtx) : null,
    missingValueType: !mapped.Type,
    members: nodes(mapped.Members).map((member) => memberDescriptor(ctx.api, member, mappedCtx)).filter(Boolean),
  };
}

function mappedModifier(api, token) {
  if (!token) return "preserve";
  if (token.Kind === api.Kinds.KindMinusToken) return "remove";
  if (token.Kind === api.Kinds.KindPlusToken || token.Kind === api.Kinds.KindReadonlyKeyword || token.Kind === api.Kinds.KindQuestionToken) return "add";
  return `unsupported:${api.kindName.get(token.Kind) ?? token.Kind}`;
}

function canonicalizeTemplate(node, ctx) {
  const template = ctx.api.Casts.AsTemplateLiteralTypeNode(node);
  return {
    t: "template",
    head: template.Head?.Text ?? "",
    spans: nodes(template.TemplateSpans).map((item) => {
      const span = ctx.api.Casts.AsTemplateLiteralTypeSpan(item);
      return { type: canonicalizeType(span.Type, ctx), literal: span.Literal?.Text ?? "" };
    }),
  };
}

function canonicalizeImportType(node, ctx) {
  const imported = ctx.api.Casts.AsImportTypeNode(node);
  const argument = canonicalizeType(imported.Argument, ctx);
  const module = argument.t === "literal" && argument.kind === "string" ? resolveModuleId(argument.value, ctx.moduleId) : null;
  return {
    t: "import",
    typeOf: !!imported.IsTypeOf,
    module,
    argument,
    qualifier: entityNameParts(ctx.api, imported.Qualifier),
    args: nodes(imported.TypeArguments).map((item) => canonicalizeType(item, ctx)),
    attributes: importAttributes(imported.Attributes, ctx),
  };
}

function importAttributes(node, ctx) {
  if (!node) return null;
  const attributes = ctx.api.Casts.AsImportAttributes(node);
  return {
    token: attributes.Token === ctx.api.Kinds.KindWithKeyword ? "with" : attributes.Token === ctx.api.Kinds.KindAssertKeyword ? "assert" : `unsupported:${attributes.Token}`,
    entries: nodes(attributes.Attributes).map((item) => {
      const attribute = ctx.api.Casts.AsImportAttribute(item);
      const name = propertyNameText(ctx.api, attribute.name);
      return { name, value: literalDescriptor(attribute.Value, ctx) };
    }),
  };
}

function canonicalizeQuery(node, ctx) {
  const query = ctx.api.Casts.AsTypeQueryNode(node);
  const { qualifier, name } = entityName(ctx.api, query.ExprName);
  return {
    t: "query",
    id: resolveIdentity(ctx, qualifier, name, "value"),
    args: nodes(query.TypeArguments).map((argument) => canonicalizeType(argument, ctx)),
  };
}

function literalDescriptor(literal, ctx) {
  const K = ctx.api.Kinds;
  if (literal?.Kind === K.KindStringLiteral || literal?.Kind === K.KindNoSubstitutionTemplateLiteral) {
    return { t: "literal", kind: "string", value: literal.Text };
  }
  if (literal?.Kind === K.KindNumericLiteral) return numericLiteral(literal.Text, false, ctx, literal);
  if (literal?.Kind === K.KindBigIntLiteral) return bigintLiteral(literal.Text, false, ctx, literal);
  if (literal?.Kind === K.KindTrueKeyword || literal?.Kind === K.KindFalseKeyword) {
    return { t: "literal", kind: "boolean", value: literal.Kind === K.KindTrueKeyword };
  }
  if (literal?.Kind === K.KindNullKeyword) return { t: "literal", kind: "null", value: null };
  if (literal?.Kind === K.KindPrefixUnaryExpression) {
    const unary = ctx.api.Casts.AsPrefixUnaryExpression(literal);
    const negative = unary.Operator === K.KindMinusToken;
    if (!negative && unary.Operator !== K.KindPlusToken) return unsupportedNode(literal, ctx, "LiteralUnaryOperator");
    if (unary.Operand?.Kind === K.KindNumericLiteral) return numericLiteral(unary.Operand.Text, negative, ctx, literal);
    if (unary.Operand?.Kind === K.KindBigIntLiteral) return bigintLiteral(unary.Operand.Text, negative, ctx, literal);
  }
  return unsupportedNode(literal, ctx, "LiteralTypeValue");
}

function numericLiteral(text, negative, ctx, node) {
  const value = Number(String(text).replaceAll("_", ""));
  if (Number.isNaN(value)) return unsupportedNode(node, ctx, "NumericLiteralValue");
  const signed = negative ? -value : value;
  return { t: "literal", kind: "number", value: Object.is(signed, -0) ? "-0" : String(signed) };
}

function bigintLiteral(text, negative, ctx, node) {
  try {
    const value = BigInt(String(text).replaceAll("_", "").replace(/n$/, ""));
    return { t: "literal", kind: "bigint", value: String(negative ? -value : value) };
  } catch {
    return unsupportedNode(node, ctx, "BigIntLiteralValue");
  }
}

function canonicalizeObjectType(members, ctx) {
  return { t: "object", members: members.map((member) => memberDescriptor(ctx.api, member, ctx)).filter(Boolean) };
}

function canonicalizeRef(node, ctx) {
  const { qualifier, name } = entityName(ctx.api, node.TypeName);
  const args = nodes(node.TypeArguments).map((argument) => canonicalizeType(argument, ctx));
  if (!qualifier && name === "Array" && args.length === 1 && !ctx.imports?.named?.has("Array") && !ctx.localTypes?.has("Array")) {
    return { t: "array", element: args[0] };
  }
  const binding = !qualifier ? ctx.typeParamIndex?.get(name) : undefined;
  return binding ? { t: "tp", depth: binding.depth, index: binding.index } :
    { t: "ref", id: resolveIdentity(ctx, qualifier, name, "type"), args };
}

function entityName(api, node) {
  const parts = entityNameParts(api, node);
  return { qualifier: parts.length > 1 ? parts.slice(0, -1).join(".") : undefined, name: parts.at(-1) };
}

function entityNameParts(api, node) {
  if (!node) return [];
  if (node.Kind === api.Kinds.KindIdentifier) return [node.Text];
  if (node.Kind === api.Kinds.KindQualifiedName) {
    const qualified = api.Casts.AsQualifiedName(node);
    return [...entityNameParts(api, qualified.Left), qualified.Right?.Text].filter((part) => typeof part === "string");
  }
  return [];
}

function resolveIdentity(ctx, qualifier, name, space) {
  if (!new Set(["type", "value"]).has(space)) {
    throw new Error(`identity in '${ctx.moduleId}' requires an exact type/value namespace`);
  }
  if (qualifier) {
    const [head, ...tail] = qualifier.split(".");
    const reference = `${qualifier}.${name}`;
    const namespace = ctx.imports?.namespaces?.get(head);
    if (namespace) {
      const targetParts = [namespace.local, ...tail, name].filter(Boolean);
      if (space === "value" && namespace.typeOnly) return unresolvedTypeOnlyValueIdentity(ctx, reference, namespace, targetParts);
      return `${resolveModuleId(namespace.module, ctx.moduleId)}::${targetParts.join(".")}`;
    }
    if (ctx.localNamespaces?.has(head)) {
      const locals = space === "type" ? ctx.localTypes : ctx.localValues;
      return locals?.has(reference) ? `${ctx.moduleId}::${reference}` : unresolvedIdentity(reference, space);
    }
    return unresolvedIdentity(reference, space);
  }
  const imported = ctx.imports?.named?.get(name);
  if (imported) {
    if (space === "value" && imported.typeOnly) return unresolvedTypeOnlyValueIdentity(ctx, name, imported, [imported.imported]);
    return `${resolveModuleId(imported.module, ctx.moduleId)}::${imported.imported}`;
  }
  if (space === "type" && ctx.localTypes?.has(name) || space === "value" && ctx.localValues?.has(name)) return `${ctx.moduleId}::${name}`;
  return space === "type" ? `global::${name}` : unresolvedIdentity(name, space);
}

function unresolvedIdentity(reference, space) {
  return space === "type" ? `unresolved::${reference}` : `unresolved-value::${reference}`;
}

function unresolvedTypeOnlyValueIdentity(ctx, reference, binding, targetParts) {
  const target = resolveModuleId(binding.module, ctx.moduleId);
  return `unresolved-value::type-only-import:${ctx.moduleId}::${reference}->${target}::${targetParts.join(".")}`;
}

export function canonicalizeHeritageType(node, ctx, space) {
  if (!new Set(["type", "value"]).has(space)) throw new Error(`heritage identity in '${ctx.moduleId}' requires an exact type/value namespace`);
  const expression = ctx.api.Casts.AsExpressionWithTypeArguments(node);
  const parts = expressionEntityParts(ctx.api, expression.Expression);
  if (parts.length === 0) return unsupportedNode(expression.Expression, ctx, "HeritageExpression");
  return {
    t: "ref",
    id: resolveIdentity(ctx, parts.length > 1 ? parts.slice(0, -1).join(".") : undefined, parts.at(-1), space),
    args: nodes(expression.TypeArguments).map((argument) => canonicalizeType(argument, ctx)),
  };
}

function expressionEntityParts(api, node) {
  if (node?.Kind === api.Kinds.KindIdentifier) return [node.Text];
  if (node?.Kind === api.Kinds.KindPropertyAccessExpression) {
    const access = api.Casts.AsPropertyAccessExpression(node);
    return [...expressionEntityParts(api, access.Expression), access.name?.Text].filter((part) => typeof part === "string");
  }
  if (node?.Kind === api.Kinds.KindParenthesizedExpression) return expressionEntityParts(api, api.Casts.AsParenthesizedExpression(node).Expression);
  return [];
}

export function typeParamIndexOf(api, typeParameters, inherited = new Map()) {
  return bindNamedTypeParameters(api, nodes(typeParameters), inherited, false);
}

function bindNamedTypeParameters(api, declarations, inherited = new Map(), mergeDuplicates) {
  const scope = new Map(inherited);
  if (declarations.length === 0) return scope;
  const depth = scope.size === 0 ? 0 : Math.max(...[...scope.values()].map((binding) => binding.depth)) + 1;
  const own = new Map();
  for (const declarationNode of declarations) {
    const declaration = api.Casts.AsTypeParameterDeclaration(declarationNode);
    const name = declaration.name?.Text;
    if (!name) throw new Error("TypeScript type parameter has no identifier");
    if (own.has(name)) {
      if (!mergeDuplicates) throw new Error(`duplicate TypeScript type parameter '${name}'`);
      continue;
    }
    const binding = { depth, index: own.size };
    own.set(name, binding);
    scope.set(name, binding);
  }
  return scope;
}

export function typeParamDescriptors(api, typeParameters, ctx) {
  return nodes(typeParameters).map((node) => typeParameterDescriptor(api, node, ctx));
}

function typeParameterDescriptor(api, node, ctx) {
  const parameter = api.Casts.AsTypeParameterDeclaration(node);
  const binding = ctx.typeParamIndex?.get(parameter.name?.Text);
  if (!binding) throw new Error(`unbound TypeScript type parameter '${parameter.name?.Text ?? "<missing>"}'`);
  const modifiers = modifierKinds(api, parameter);
  const unsupportedModifiers = modifiers.filter((modifier) => !new Set(["const", "in", "out"]).has(modifier));
  const variance = modifiers.includes("in") && modifiers.includes("out") ? "inout" :
    modifiers.includes("in") ? "in" : modifiers.includes("out") ? "out" : null;
  return {
    name: parameter.name.Text,
    binding,
    modifiers: { const: modifiers.includes("const"), variance, unsupported: unsupportedModifiers },
    constraint: parameter.Constraint ? canonicalizeType(parameter.Constraint, ctx) : null,
    default: parameter.DefaultType ? canonicalizeType(parameter.DefaultType, ctx) : null,
    invalidConstraint: parameter.Expression ? unsupportedNode(parameter.Expression, ctx, "TypeParameterConstraintExpression") : null,
  };
}

export function functionDescriptor(api, functionLike, baseCtx) {
  const descriptor = callableDescriptor(functionLike, { ...baseCtx, api }, "fn");
  const noReturnAnnotation = functionLike.Kind === api.Kinds.KindConstructor || functionLike.Kind === api.Kinds.KindSetAccessor;
  return {
    params: descriptor.params,
    ret: noReturnAnnotation ? { t: "kw", kw: "void" } : descriptor.ret,
    missingReturnType: noReturnAnnotation ? false : descriptor.missingReturnType,
    returnTypePolicy: noReturnAnnotation ? "forbidden" : descriptor.returnTypePolicy,
    typeParams: descriptor.typeParams,
    signatureModifiers: descriptor.signatureModifiers,
  };
}

export function memberDescriptor(api, member, ctx) {
  const K = api.Kinds;
  if (member.Kind === K.KindMethodSignature || member.Kind === K.KindMethodDeclaration) {
    return functionMember(api, member.Kind === K.KindMethodSignature ? api.Casts.AsMethodSignatureDeclaration(member) : api.Casts.AsMethodDeclaration(member), ctx, "method");
  }
  if (member.Kind === K.KindPropertySignature || member.Kind === K.KindPropertyDeclaration) {
    const property = member.Kind === K.KindPropertySignature ? api.Casts.AsPropertySignatureDeclaration(member) : api.Casts.AsPropertyDeclaration(member);
    const name = propertyNameText(api, property.name, ctx);
    if (name === undefined) return unsupportedMember(api, property, ctx, "ComputedPropertyName");
    return {
      kind: "property", name, type: property.Type ? canonicalizeType(property.Type, ctx) : { t: "kw", kw: "any" },
      optional: property.PostfixToken?.Kind === K.KindQuestionToken || undefined,
      definite: property.PostfixToken?.Kind === K.KindExclamationToken || undefined,
      readonly: hasModifier(property, K.KindReadonlyKeyword) || undefined,
      missingType: !property.Type || undefined,
      modifiers: memberModifiers(api, property),
    };
  }
  const functions = new Map([
    [K.KindCallSignature, ["call", api.Casts.AsCallSignatureDeclaration]],
    [K.KindConstructSignature, ["construct", api.Casts.AsConstructSignatureDeclaration]],
    [K.KindIndexSignature, ["index", api.Casts.AsIndexSignatureDeclaration]],
    [K.KindConstructor, ["constructor", api.Casts.AsConstructorDeclaration]],
    [K.KindGetAccessor, ["get", api.Casts.AsGetAccessorDeclaration]],
    [K.KindSetAccessor, ["set", api.Casts.AsSetAccessorDeclaration]],
  ]);
  const selected = functions.get(member.Kind);
  if (selected) return functionMember(api, selected[1](member), ctx, selected[0]);
  if (member.Kind === K.KindSemicolonClassElement || member.Kind === K.KindClassStaticBlockDeclaration) return null;
  return unsupportedMember(api, member, ctx, api.kindName.get(member.Kind) ?? `kind${member.Kind}`);
}

function functionMember(api, declaration, ctx, kind) {
  const name = kind === "call" ? "<call>" : kind === "construct" ? "<construct>" : kind === "index" ? "<index>" :
    kind === "constructor" ? "<constructor>" : propertyNameText(api, declaration.name, ctx);
  if (name === undefined) return unsupportedMember(api, declaration, ctx, "ComputedPropertyName");
  const signature = functionDescriptor(api, declaration, ctx);
  return {
    kind, name, role: callableMemberRole(api, declaration),
    optional: declaration.PostfixToken?.Kind === api.Kinds.KindQuestionToken || undefined,
    modifiers: memberModifiers(api, declaration),
    type: { t: "fn", params: signature.params, ret: signature.ret, missingReturnType: signature.missingReturnType,
      returnTypePolicy: signature.returnTypePolicy, typeParams: signature.typeParams, signatureModifiers: signature.signatureModifiers },
  };
}

function callableMemberRole(api, declaration) {
  const signatures = new Set([
    api.Kinds.KindMethodSignature,
    api.Kinds.KindCallSignature,
    api.Kinds.KindConstructSignature,
    api.Kinds.KindIndexSignature,
  ]);
  if (signatures.has(declaration.Kind)) return "signature";
  return declaration.Body === undefined ? "declaration" : "implementation";
}

function propertyNameText(api, name, context) {
  if (name?.Kind === api.Kinds.KindIdentifier || name?.Kind === api.Kinds.KindPrivateIdentifier ||
      name?.Kind === api.Kinds.KindStringLiteral || name?.Kind === api.Kinds.KindNumericLiteral) return name.Text;
  return computedPropertyIdentity(api, name, context);
}

function callableModifiers(api, node) {
  const modifiers = [];
  if (node.AsteriskToken) modifiers.push("generator");
  if (hasModifier(node, api.Kinds.KindAsyncKeyword)) modifiers.push("async");
  if (hasModifier(node, api.Kinds.KindAbstractKeyword)) modifiers.push("abstract");
  return modifiers.sort(compareText);
}

function memberModifiers(api, node) {
  return modifierKinds(api, node).filter((modifier) => modifier !== "readonly").sort(compareText);
}

function modifierKinds(api, node) {
  return [...new Set(nodes(node.modifiers).map((modifier) => modifierSemanticName(api, modifier.Kind)))].sort(compareText);
}

function modifierSemanticName(api, kind) {
  const names = new Map([
    [api.Kinds.KindExportKeyword, "export"], [api.Kinds.KindDefaultKeyword, "default"], [api.Kinds.KindDeclareKeyword, "declare"],
    [api.Kinds.KindAbstractKeyword, "abstract"], [api.Kinds.KindPublicKeyword, "public"], [api.Kinds.KindProtectedKeyword, "protected"],
    [api.Kinds.KindPrivateKeyword, "private"], [api.Kinds.KindStaticKeyword, "static"], [api.Kinds.KindReadonlyKeyword, "readonly"],
    [api.Kinds.KindOverrideKeyword, "override"], [api.Kinds.KindAccessorKeyword, "accessor"], [api.Kinds.KindAsyncKeyword, "async"],
    [api.Kinds.KindConstKeyword, "const"], [api.Kinds.KindInKeyword, "in"], [api.Kinds.KindOutKeyword, "out"],
  ]);
  return names.get(kind) ?? `unsupported:${api.kindName.get(kind) ?? kind}`;
}

const hasModifier = (node, kind) => nodes(node.modifiers).some((modifier) => modifier.Kind === kind);

function unsupportedMember(api, member, ctx, reason) {
  return { kind: "unsupported", name: `<${api.kindName.get(member.Kind) ?? `kind${member.Kind}`}>`, unsupported: reason,
    text: evidenceText(api, ctx.text, member) };
}

function unsupportedNode(node, ctx, kind = ctx.api.kindName.get(node?.Kind) ?? `kind${node?.Kind}`) {
  return { t: "unsupported", kind, text: evidenceText(ctx.api, ctx.text, node) };
}

const evidenceText = (api, text, node) => sliceText(api, text, node).replace(/\s+/g, " ");
const nodes = (list) => list?.Nodes ?? [];
