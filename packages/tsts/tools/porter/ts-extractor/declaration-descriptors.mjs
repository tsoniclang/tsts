import {
  canonicalTypeScriptConstantValue,
  constantEvaluationIssue,
  evaluateTypeScriptConstant,
  knownTypeScriptConstant,
} from "./constant-evaluation.mjs";
import { parameterInitializerDescriptor } from "./parameter-initializer.mjs";
import { resolveModuleId } from "./source-structure.mjs";
import {
  canonicalizeType,
  canonicalizeHeritageType,
  typeParamDescriptors,
  typeParamIndexOf,
} from "./type-descriptors.mjs";
import { computedPropertyIdentity } from "./type-descriptors/computed-property-identity.mjs";

export function declarationDescriptor(api, node, baseCtx) {
  const K = api.Kinds;
  if (node.Kind === K.KindFunctionDeclaration) {
    const declaration = api.Casts.AsFunctionDeclaration(node);
    return {
      kind: "func",
      name: declaration.name?.Text,
      modifiers: declarationModifiers(api, declaration, new Set(["export", "default", "declare"])),
      ...callableDescriptor(api, declaration, baseCtx, "required", false),
    };
  }
  if (node.Kind === K.KindInterfaceDeclaration) return interfaceDescriptor(api, node, baseCtx);
  if (node.Kind === K.KindTypeAliasDeclaration) return aliasDescriptor(api, node, baseCtx);
  if (node.Kind === K.KindClassDeclaration) return classDescriptor(api, node, baseCtx);
  if (node.Kind === K.KindEnumDeclaration) return enumDescriptor(api, node, baseCtx);
  if (node.Kind === K.KindVariableStatement) return variableDescriptor(api, node, baseCtx);
  if (node.Kind === K.KindModuleDeclaration) return moduleDescriptor(api, node, baseCtx);
  return { kind: "unsupported-declaration", nodeKind: api.kindName.get(node.Kind) ?? `kind${node.Kind}` };
}

function interfaceDescriptor(api, node, baseCtx) {
  const declaration = api.Casts.AsInterfaceDeclaration(node);
  const ctx = declarationContext(api, declaration.TypeParameters, baseCtx);
  return {
    kind: "interface",
    name: declaration.name?.Text,
    modifiers: declarationModifiers(api, declaration, new Set(["export", "default", "declare"])),
    typeParams: typeParamDescriptors(api, declaration.TypeParameters, ctx),
    heritage: heritageDescriptors(api, declaration.HeritageClauses, ctx, "interface"),
    members: (declaration.Members?.Nodes ?? []).map((member) => declarationMemberDescriptor(api, member, ctx)).filter(Boolean),
  };
}

function aliasDescriptor(api, node, baseCtx) {
  const declaration = api.Casts.AsTypeAliasDeclaration(node);
  const ctx = declarationContext(api, declaration.TypeParameters, baseCtx);
  return {
    kind: "alias",
    name: declaration.name?.Text,
    modifiers: declarationModifiers(api, declaration, new Set(["export", "default", "declare"])),
    typeParams: typeParamDescriptors(api, declaration.TypeParameters, ctx),
    type: declaration.Type ? canonicalizeType(declaration.Type, ctx) : { t: "unsupported", kind: "MissingAliasType", text: "" },
  };
}

function classDescriptor(api, node, baseCtx) {
  const declaration = api.Casts.AsClassDeclaration(node);
  const ctx = declarationContext(api, declaration.TypeParameters, baseCtx);
  return {
    kind: "class",
    name: declaration.name?.Text,
    modifiers: declarationModifiers(api, declaration, new Set(["export", "default", "declare", "abstract"])),
    typeParams: typeParamDescriptors(api, declaration.TypeParameters, ctx),
    heritage: heritageDescriptors(api, declaration.HeritageClauses, ctx, "class"),
    members: (declaration.Members?.Nodes ?? []).map((member) => declarationMemberDescriptor(api, member, ctx)).filter(Boolean),
  };
}

function enumDescriptor(api, node, baseCtx) {
  const declaration = api.Casts.AsEnumDeclaration(node);
  const ctx = { ...baseCtx, typeParamIndex: new Map() };
  const localValues = new Map();
  const environment = layeredEnvironment(ctx.valueEnvironment, localValues, declaration.name?.Text);
  let nextNumericValue = 0;
  const members = [];
  for (const nodeMember of declaration.Members?.Nodes ?? []) {
    const member = api.Casts.AsEnumMember(nodeMember);
    const name = enumMemberName(api, member.name, ctx);
    let evaluation;
    if (member.Initializer === undefined) {
      evaluation = nextNumericValue === undefined
        ? unsupportedEvaluation(api, member, "implicit enum value follows a non-numeric or unresolved member")
        : knownTypeScriptConstant("number", nextNumericValue);
    } else {
      evaluation = evaluateTypeScriptConstant(api, member.Initializer, environment);
    }
    const value = canonicalTypeScriptConstantValue(evaluation);
    const valueIssue = evaluation.status === "known" ? undefined : constantEvaluationIssue(evaluation);
    if (evaluation.status === "known") {
      localValues.set(name, evaluation);
      localValues.set(`${declaration.name?.Text}.${name}`, evaluation);
      nextNumericValue = evaluation.value.kind === "number" ? evaluation.value.value + 1 : undefined;
    } else {
      nextNumericValue = undefined;
    }
    members.push({ name, value, valueIssue });
  }
  return {
    kind: "enum",
    name: declaration.name?.Text,
    modifiers: declarationModifiers(api, declaration, new Set(["export", "default", "declare", "const"])),
    members,
  };
}

function variableDescriptor(api, node, baseCtx) {
  const statement = api.Casts.AsVariableStatement(node);
  const declarationKind = variableDeclarationKind(api, statement.DeclarationList.Flags);
  const modifiers = declarationModifiers(api, statement, new Set(["export", "default", "declare"]));
  const ctx = { ...baseCtx, typeParamIndex: new Map() };
  const declarations = [];
  for (const nodeDeclaration of statement.DeclarationList?.Declarations?.Nodes ?? []) {
    const declaration = api.Casts.AsVariableDeclaration(nodeDeclaration);
    const identifier = declaration.name?.Kind === api.Kinds.KindIdentifier;
    const callableInitializer = declaration.Initializer?.Kind === api.Kinds.KindArrowFunction ||
      declaration.Initializer?.Kind === api.Kinds.KindFunctionExpression;
    const inferredCallable = declaration.Type === undefined && callableInitializer
      ? callableInitializerDescriptor(api, declaration.Initializer, ctx)
      : undefined;
    const evaluation = declarationKind === "const" && !callableInitializer
      ? evaluateTypeScriptConstant(api, declaration.Initializer, ctx.valueEnvironment)
      : undefined;
    declarations.push({
      name: identifier ? declaration.name.Text : "<binding-pattern>",
      ...(identifier ? {} : { binding: bindingNameDescriptor(api, declaration.name, ctx) }),
      missing: declaration.Type === undefined && inferredCallable === undefined,
      type: declaration.Type ? canonicalizeType(declaration.Type, ctx) : inferredCallable ?? null,
      ...(evaluation === undefined ? {} : {
        value: canonicalTypeScriptConstantValue(evaluation),
        valueIssue: evaluation.status === "known" ? undefined : constantEvaluationIssue(evaluation),
        initializerStatus: evaluation.status,
      }),
      declarationKind,
      definite: declaration.ExclamationToken !== undefined,
      modifiers,
    });
  }
  return { kind: "value", modifiers, decls: declarations };
}

function callableInitializerDescriptor(api, initializer, ctx) {
  if (initializer?.Kind !== api.Kinds.KindArrowFunction && initializer?.Kind !== api.Kinds.KindFunctionExpression) return undefined;
  const callable = callableDescriptor(api, initializer, ctx, "required", false);
  return {
    t: "fn",
    params: callable.params,
    ret: callable.ret,
    missingReturnType: callable.missingReturnType,
    returnTypePolicy: callable.returnTypePolicy,
    typeParams: callable.typeParams,
    signatureModifiers: callable.signatureModifiers,
  };
}

function moduleDescriptor(api, node, baseCtx) {
  const declaration = api.Casts.AsModuleDeclaration(node);
  const body = declaration.Body;
  const statements = body?.Kind === api.Kinds.KindModuleBlock ? body.Statements?.Nodes ?? []
    : body?.Kind === api.Kinds.KindModuleDeclaration ? [body] : [];
  return {
    kind: "namespace",
    name: declaration.name?.Text,
    modifiers: declarationModifiers(api, declaration, new Set(["export", "default", "declare", "global"])),
    bodyKind: body === undefined ? "empty" : api.kindName.get(body.Kind) ?? `kind${body.Kind}`,
    declarations: statements.map((statement) => declarationDescriptor(api, statement, baseCtx)),
  };
}

function bindingNameDescriptor(api, node, ctx) {
  if (node?.Kind === api.Kinds.KindIdentifier) return { kind: "identifier", name: node.Text };
  if (node?.Kind === api.Kinds.KindObjectBindingPattern) {
    return {
      kind: "object",
      elements: (node.Elements?.Nodes ?? []).map((element) => bindingElementDescriptor(api, element, ctx)),
    };
  }
  if (node?.Kind === api.Kinds.KindArrayBindingPattern) {
    return {
      kind: "array",
      elements: (node.Elements?.Nodes ?? []).map((element) =>
        element.Kind === api.Kinds.KindOmittedExpression ? { kind: "omitted" } : bindingElementDescriptor(api, element, ctx)),
    };
  }
  throw new Error(`unsupported TypeScript binding name ${api.kindName.get(node?.Kind) ?? "<missing>"} in '${ctx.moduleId}'`);
}

function bindingElementDescriptor(api, node, ctx) {
  const element = api.Casts.AsBindingElement(node);
  return {
    kind: "binding-element",
    rest: element.DotDotDotToken !== undefined,
    property: bindingPropertyDescriptor(api, element.PropertyName, ctx),
    name: bindingNameDescriptor(api, element.name, ctx),
    initializer: element.Initializer === undefined ? "missing" : "present",
  };
}

function bindingPropertyDescriptor(api, node, ctx) {
  if (node === undefined) return null;
  if (node.Kind === api.Kinds.KindIdentifier || node.Kind === api.Kinds.KindStringLiteral || node.Kind === api.Kinds.KindNumericLiteral) {
    return { kind: api.kindName.get(node.Kind) ?? `kind${node.Kind}`, name: String(node.Text) };
  }
  throw new Error(`unsupported TypeScript binding property ${api.kindName.get(node.Kind) ?? node.Kind} in '${ctx.moduleId}'`);
}

function variableDeclarationKind(api, flags) {
  const mask = api.Flags.NodeFlagsLet | api.Flags.NodeFlagsConst | api.Flags.NodeFlagsUsing;
  switch (flags & mask) {
    case 0: return "var";
    case api.Flags.NodeFlagsLet: return "let";
    case api.Flags.NodeFlagsConst: return "const";
    case api.Flags.NodeFlagsUsing: return "using";
    case api.Flags.NodeFlagsAwaitUsing: return "awaitUsing";
    default: throw new Error(`invalid variable declaration flag combination ${flags & mask}`);
  }
}

function declarationMemberDescriptor(api, node, ctx) {
  const K = api.Kinds;
  if (node.Kind === K.KindSemicolonClassElement || node.Kind === K.KindClassStaticBlockDeclaration) return null;
  if (node.Kind === K.KindPropertySignature || node.Kind === K.KindPropertyDeclaration) {
    const property = node.Kind === K.KindPropertySignature
      ? api.Casts.AsPropertySignatureDeclaration(node)
      : api.Casts.AsPropertyDeclaration(node);
    const allowedModifiers = node.Kind === K.KindPropertySignature
      ? new Set(["readonly"])
      : new Set(["public", "protected", "private", "static", "abstract", "readonly", "override", "declare", "accessor"]);
    return {
      kind: "property",
      name: propertyIdentity(api, property.name, ctx),
      modifiers: memberModifiers(api, property, allowedModifiers),
      type: property.Type ? canonicalizeType(property.Type, ctx) : { t: "kw", kw: "any" },
      optional: property.PostfixToken?.Kind === K.KindQuestionToken || undefined,
      definite: property.PostfixToken?.Kind === K.KindExclamationToken || undefined,
      missingType: !property.Type || undefined,
    };
  }
  if (node.Kind === K.KindMethodSignature || node.Kind === K.KindMethodDeclaration) {
    const method = node.Kind === K.KindMethodSignature
      ? api.Casts.AsMethodSignatureDeclaration(node)
      : api.Casts.AsMethodDeclaration(node);
    const allowedModifiers = node.Kind === K.KindMethodSignature
      ? new Set()
      : new Set(["public", "protected", "private", "static", "abstract", "override", "async"]);
    return callableMember(api, method, ctx, "method", "required", undefined, allowedModifiers);
  }
  if (node.Kind === K.KindCallSignature) return callableMember(api, api.Casts.AsCallSignatureDeclaration(node), ctx, "call", "required", "<call>", new Set());
  if (node.Kind === K.KindConstructSignature) return callableMember(api, api.Casts.AsConstructSignatureDeclaration(node), ctx, "construct", "required", "<construct>", new Set());
  if (node.Kind === K.KindIndexSignature) return callableMember(api, api.Casts.AsIndexSignatureDeclaration(node), ctx, "index", "required", "<index>", new Set(["readonly"]));
  if (node.Kind === K.KindConstructor) {
    return callableMember(api, api.Casts.AsConstructorDeclaration(node), ctx, "constructor", "forbidden", "<constructor>", new Set(["public", "protected", "private"]), true);
  }
  const accessorModifiers = new Set(["public", "protected", "private", "static", "abstract", "override"]);
  if (node.Kind === K.KindGetAccessor) return callableMember(api, api.Casts.AsGetAccessorDeclaration(node), ctx, "get", "required", undefined, accessorModifiers);
  if (node.Kind === K.KindSetAccessor) return callableMember(api, api.Casts.AsSetAccessorDeclaration(node), ctx, "set", "forbidden", undefined, accessorModifiers);
  return unsupportedMember(api, node, ctx, api.kindName.get(node.Kind) ?? `kind${node.Kind}`);
}

function callableMember(api, declaration, ctx, kind, returnPolicy, fixedName = undefined, allowedModifiers = new Set(), allowParameterProperties = false) {
  const signature = callableDescriptor(api, declaration, ctx, returnPolicy, allowParameterProperties);
  return {
    kind,
    name: fixedName ?? propertyIdentity(api, declaration.name, ctx),
    role: callableMemberRole(api, declaration),
    modifiers: memberModifiers(api, declaration, allowedModifiers).filter((modifier) => modifier !== "async"),
    optional: declaration.PostfixToken?.Kind === api.Kinds.KindQuestionToken || undefined,
    type: {
      t: "fn",
      params: signature.params,
      ret: signature.ret,
      missingReturnType: signature.missingReturnType,
      returnTypePolicy: signature.returnTypePolicy,
      typeParams: signature.typeParams,
      signatureModifiers: signature.signatureModifiers,
    },
  };
}

function callableMemberRole(api, declaration) {
  const signatureKinds = new Set([
    api.Kinds.KindMethodSignature,
    api.Kinds.KindCallSignature,
    api.Kinds.KindConstructSignature,
    api.Kinds.KindIndexSignature,
  ]);
  if (signatureKinds.has(declaration.Kind)) return "signature";
  return declaration.Body === undefined ? "declaration" : "implementation";
}

function callableDescriptor(api, declaration, baseCtx, returnPolicy, allowParameterProperties) {
  const typeParamIndex = typeParamIndexOf(api, declaration.TypeParameters, baseCtx.typeParamIndex);
  const ctx = { ...baseCtx, typeParamIndex };
  const params = (declaration.Parameters?.Nodes ?? []).map((node) => parameterDescriptor(api, node, ctx, allowParameterProperties));
  const returnForbidden = returnPolicy === "forbidden";
  return {
    params,
    ret: declaration.Type ? canonicalizeType(declaration.Type, ctx) : { t: "kw", kw: "void" },
    missingReturnType: returnForbidden ? false : !declaration.Type,
    returnTypePolicy: returnForbidden ? "forbidden" : "required",
    typeParams: typeParamDescriptors(api, declaration.TypeParameters, ctx),
    signatureModifiers: [
      ...((declaration.modifiers?.Nodes ?? []).some((modifier) => modifier.Kind === api.Kinds.KindAsyncKeyword) ? ["async"] : []),
      ...(declaration.AsteriskToken ? ["generator"] : []),
    ],
  };
}

function parameterDescriptor(api, node, ctx, allowParameterProperties) {
  const parameter = api.Casts.AsParameterDeclaration(node);
  if (parameter.name?.Kind !== api.Kinds.KindIdentifier) {
    const kind = api.kindName.get(parameter.name?.Kind) ?? "<missing>";
    throw new Error(`Porter requires a structural parameter binding descriptor before accepting ${kind} in '${ctx.moduleId}'`);
  }
  const modifiers = parameterModifiers(api, parameter);
  if (!allowParameterProperties && modifiers.length > 0) {
    throw new Error(`parameter modifiers are valid only on constructor parameter properties in '${ctx.moduleId}'`);
  }
  const initializerDescriptor = parameterInitializerDescriptor(api, parameter.Initializer, ctx.valueEnvironment);
  const isThis = parameter.name.Text === "this";
  const isParameterProperty = !isThis && modifiers.some((modifier) =>
    modifier === "public" || modifier === "protected" || modifier === "private" || modifier === "readonly" || modifier === "override");
  return {
    name: parameter.name.Text,
    role: isThis ? "this" : isParameterProperty ? "parameter-property" : "parameter",
    modifiers,
    type: parameter.Type ? canonicalizeType(parameter.Type, ctx) : { t: "kw", kw: "any" },
    rest: !!parameter.DotDotDotToken,
    optional: !!parameter.QuestionToken || parameter.Initializer !== undefined,
    question: !!parameter.QuestionToken,
    optionalSyntax: parameter.QuestionToken && parameter.Initializer !== undefined
      ? "question+initializer"
      : parameter.QuestionToken ? "question" : parameter.Initializer !== undefined ? "initializer" : "required",
    missingType: !parameter.Type,
    ...initializerDescriptor,
  };
}

function declarationContext(api, typeParameters, baseCtx) {
  return { ...baseCtx, typeParamIndex: typeParamIndexOf(api, typeParameters, baseCtx.typeParamIndex) };
}

function heritageDescriptors(api, clauses, ctx, ownerKind) {
  return (clauses?.Nodes ?? []).map((node) => {
    const clause = api.Casts.AsHeritageClause(node);
    const token = clause.Token === api.Kinds.KindExtendsKeyword ? "extends" :
      clause.Token === api.Kinds.KindImplementsKeyword ? "implements" : `kind${clause.Token}`;
    const space = ownerKind === "class" && token === "extends" ? "value" : "type";
    return {
      token,
      space,
      types: (clause.Types?.Nodes ?? []).map((type) => canonicalizeHeritageType(type, ctx, space)),
    };
  });
}

function enumMemberName(api, node, ctx) {
  const identity = propertyIdentity(api, node, ctx);
  if (identity.startsWith("private:") || identity.startsWith("computed:") || identity.startsWith("symbol:")) {
    throw new Error(`enum member in '${ctx.moduleId}' has unsupported key identity '${identity}'`);
  }
  return identity;
}

function propertyIdentity(api, node, ctx) {
  if (node?.Kind === api.Kinds.KindIdentifier || node?.Kind === api.Kinds.KindStringLiteral || node?.Kind === api.Kinds.KindNumericLiteral) {
    return String(node.Text);
  }
  if (node?.Kind === api.Kinds.KindPrivateIdentifier) return `private:${node.Text}`;
  if (node?.Kind !== api.Kinds.KindComputedPropertyName) {
    throw new Error(`missing or unsupported declaration property name in '${ctx.moduleId}'`);
  }
  const expression = api.Casts.AsComputedPropertyName(node).Expression;
  const evaluation = evaluateTypeScriptConstant(api, expression, ctx.valueEnvironment);
  if (evaluation.status === "known" && new Set(["string", "number", "bigint"]).has(evaluation.value.kind)) {
    return String(evaluation.value.value);
  }
  const identity = computedPropertyIdentity(api, node, ctx);
  if (identity === undefined) {
    throw new Error(`Porter requires a structural computed-property identity for ${sourceText(api, ctx, expression)} in '${ctx.moduleId}'`);
  }
  return identity;
}

function declarationModifiers(api, node, allowed) {
  return semanticModifiers(api, node, allowed);
}

function memberModifiers(api, node, allowed) {
  return semanticModifiers(api, node, allowed);
}

function parameterModifiers(api, node) {
  return semanticModifiers(api, node, new Set(["public", "protected", "private", "readonly", "override"]));
}

function semanticModifiers(api, node, allowed) {
  const modifiers = [];
  for (const modifier of node.modifiers?.Nodes ?? []) {
    const semantic = modifierName(api, modifier);
    if (!allowed.has(semantic)) {
      throw new Error(`modifier '${semantic}' is not valid in the tracked declaration role ${api.kindName.get(node.Kind) ?? node.Kind}`);
    }
    if (!modifiers.includes(semantic)) modifiers.push(semantic);
  }
  return modifiers.sort((left, right) => modifierOrder(left) - modifierOrder(right));
}

function modifierName(api, modifier) {
  const pairs = [
    [api.Kinds.KindExportKeyword, "export"], [api.Kinds.KindDefaultKeyword, "default"], [api.Kinds.KindDeclareKeyword, "declare"],
    [api.Kinds.KindAbstractKeyword, "abstract"], [api.Kinds.KindPublicKeyword, "public"], [api.Kinds.KindProtectedKeyword, "protected"],
    [api.Kinds.KindPrivateKeyword, "private"], [api.Kinds.KindStaticKeyword, "static"], [api.Kinds.KindReadonlyKeyword, "readonly"],
    [api.Kinds.KindOverrideKeyword, "override"], [api.Kinds.KindAccessorKeyword, "accessor"], [api.Kinds.KindAsyncKeyword, "async"],
    [api.Kinds.KindConstKeyword, "const"],
  ];
  for (const [kind, name] of pairs) if (modifier.Kind === kind) return name;
  throw new Error(`unsupported declaration modifier ${api.kindName.get(modifier.Kind) ?? modifier.Kind}`);
}

function modifierOrder(modifier) {
  return ["export", "default", "declare", "abstract", "public", "protected", "private", "static", "readonly", "override", "accessor", "async", "const"].indexOf(modifier);
}

function unsupportedMember(api, member, ctx, reason) {
  const kindName = api.kindName.get(member.Kind) ?? `kind${member.Kind}`;
  return { kind: "unsupported", name: `<${kindName}>`, unsupported: reason, text: sourceText(api, ctx, member) };
}

function sourceText(api, ctx, node) {
  return api.GetTextOfNodeFromSourceText(ctx.text, node, false).trim().replace(/\s+/g, " ");
}

function layeredEnvironment(base, local, scope) {
  return Object.freeze({
    get(name) {
      if (local.has(name)) return local.get(name);
      if (!name.includes(".") && typeof scope === "string") {
        const scoped = base?.get(`${scope}.${name}`);
        if (scoped !== undefined) return scoped;
      }
      return base?.get(name);
    },
    has(name) {
      return local.has(name) || base?.has(name) === true ||
        (!name.includes(".") && typeof scope === "string" && base?.has(`${scope}.${name}`) === true);
    },
  });
}

function unsupportedEvaluation(api, node, reason) {
  return Object.freeze({ status: "unsupported", astKind: api.kindName.get(node.Kind) ?? `kind${node.Kind}`, reason });
}
