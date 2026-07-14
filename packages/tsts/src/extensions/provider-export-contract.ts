import type {
  ProviderExportDeclaration,
  ProviderMemberDeclaration,
  ProviderParameterDeclaration,
  ProviderPropertyName,
  ProviderSignatureDeclaration,
  ProviderTypeExpression,
  ProviderTypeParameterDeclaration,
  TargetIdentity,
} from "./host.js";

export function getProviderExportContractKeyMap(exports: readonly ProviderExportDeclaration[]): ReadonlyMap<string, string> {
  const declarationsByExport = new Map<string, ProviderExportDeclaration[]>();
  for (const declaration of exports) {
    const exportName = getProviderSourceExportName(declaration);
    const declarations = declarationsByExport.get(exportName) ?? [];
    declarations.push(declaration);
    declarationsByExport.set(exportName, declarations);
  }
  return new Map([...declarationsByExport].map(([exportName, declarations]) => {
    const orderedDeclarations = declarations.length > 1 && declarations.every((declaration) => declaration.sourceTypeFamily !== undefined)
      ? [...declarations].sort((left, right) => left.sourceTypeFamily!.typeArgumentCount - right.sourceTypeFamily!.typeArgumentCount)
      : declarations;
    return [exportName, JSON.stringify(orderedDeclarations.map(getProviderExportContractTuple))];
  }));
}

function getProviderExportContractTuple(declaration: ProviderExportDeclaration): readonly unknown[] {
  const exportName = getProviderExportName(declaration);
  return [
    declaration.id,
    exportName,
    exportName === "default" || declaration.exportKind === "default" ? "default" : "named",
    declaration.sourceTypeFamily === undefined
      ? null
      : [declaration.sourceTypeFamily.exportName, declaration.sourceTypeFamily.typeArgumentCount],
    declaration.kind,
    getProviderTargetIdentityContractTuple(declaration.targetIdentity),
    declaration.type === undefined ? null : getProviderTypeExpressionContractTuple(declaration.type),
    (declaration.typeParameters ?? []).map(getProviderTypeParameterContractTuple),
    (declaration.heritage ?? []).map((heritage) => [heritage.kind, getProviderTypeExpressionContractTuple(heritage.type)]),
    (declaration.members ?? []).map(getProviderMemberContractTuple),
    (declaration.signatures ?? []).map(getProviderSignatureContractTuple),
  ];
}

function getProviderTargetIdentityContractTuple(identity: TargetIdentity | undefined): readonly unknown[] | null {
  return identity === undefined
    ? null
    : [identity.target, identity.id, identity.displayName ?? null, identity.packageName ?? null, identity.packageVersion ?? null];
}

function getProviderTypeParameterContractTuple(parameter: ProviderTypeParameterDeclaration): readonly unknown[] {
  return [
    parameter.name,
    parameter.variance ?? null,
    (parameter.constraints ?? []).map(getProviderTypeExpressionContractTuple),
    parameter.defaultType === undefined ? null : getProviderTypeExpressionContractTuple(parameter.defaultType),
  ];
}

function getProviderParameterContractTuple(parameter: ProviderParameterDeclaration): readonly unknown[] {
  return [
    parameter.name,
    getProviderTypeExpressionContractTuple(parameter.type),
    parameter.passingMode ?? "by-value",
    parameter.optional === true,
    parameter.rest === true,
    parameter.defaultType === undefined ? null : getProviderTypeExpressionContractTuple(parameter.defaultType),
  ];
}

function getProviderSignatureContractTuple(signature: ProviderSignatureDeclaration): readonly unknown[] {
  return [
    signature.id,
    signature.name ?? null,
    signature.parameters.map(getProviderParameterContractTuple),
    signature.returnType === undefined ? null : getProviderTypeExpressionContractTuple(signature.returnType),
    (signature.typeParameters ?? []).map(getProviderTypeParameterContractTuple),
  ];
}

function getProviderMemberContractTuple(member: ProviderMemberDeclaration): readonly unknown[] {
  return [
    member.id,
    getProviderPropertyNameContractTuple(member.name),
    member.kind,
    member.static ?? null,
    member.readonly === true,
    member.optional === true,
    member.type === undefined ? null : getProviderTypeExpressionContractTuple(member.type),
    (member.signatures ?? []).map(getProviderSignatureContractTuple),
  ];
}

function getProviderPropertyNameContractTuple(name: ProviderPropertyName): readonly unknown[] {
  if (typeof name === "string") {
    return ["property-key", name];
  }
  switch (name.kind) {
    case "identifier":
    case "string-literal":
      return ["property-key", name.text];
    case "number-literal":
      return ["property-key", String(name.value)];
    case "well-known-symbol":
      return ["well-known-symbol", name.name];
  }
}

function getProviderTypeExpressionContractTuple(type: ProviderTypeExpression): readonly unknown[] {
  switch (type.kind) {
    case "any":
    case "unknown":
    case "void":
    case "never":
    case "undefined":
    case "boolean":
    case "string":
    case "number":
    case "bigint":
    case "object":
      return [type.kind];
    case "source-primitive":
    case "type-parameter":
      return [type.kind, type.name];
    case "target-named":
      return [
        type.kind,
        type.target,
        type.id,
        type.displayName ?? null,
        (type.typeArguments ?? []).map(getProviderTypeExpressionContractTuple),
        type.sourceShape === undefined ? null : getProviderTypeExpressionContractTuple(type.sourceShape),
      ];
    case "array":
      return [type.kind, getProviderTypeExpressionContractTuple(type.elementType)];
    case "tuple":
      return [type.kind, type.elementTypes.map(getProviderTypeExpressionContractTuple)];
    case "union":
    case "intersection":
      return [type.kind, type.types.map(getProviderTypeExpressionContractTuple)];
    case "function":
      return [
        type.kind,
        type.parameters.map(getProviderParameterContractTuple),
        getProviderTypeExpressionContractTuple(type.returnType),
        (type.typeParameters ?? []).map(getProviderTypeParameterContractTuple),
      ];
    case "literal":
      return [type.kind, getProviderLiteralContractValue(type.value)];
    case "provider-ref":
      return [
        type.kind,
        type.moduleSpecifier,
        type.exportName,
        (type.typeArguments ?? []).map(getProviderTypeExpressionContractTuple),
      ];
    case "opaque":
      return [
        type.kind,
        type.id,
        type.displayName ?? null,
        type.sourceShape === undefined ? null : getProviderTypeExpressionContractTuple(type.sourceShape),
      ];
  }
}

function getProviderLiteralContractValue(value: string | number | boolean | null): readonly unknown[] {
  if (value === null) {
    return ["null"];
  }
  return typeof value === "number"
    ? ["number", getProviderNumberContractValue(value)]
    : [typeof value, value];
}

function getProviderNumberContractValue(value: number): string {
  if (Number.isNaN(value)) {
    return "NaN";
  }
  if (Object.is(value, -0)) {
    return "0";
  }
  if (value === Number.POSITIVE_INFINITY) {
    return "+Infinity";
  }
  if (value === Number.NEGATIVE_INFINITY) {
    return "-Infinity";
  }
  return String(value);
}

function getProviderExportName(declaration: ProviderExportDeclaration): string {
  return declaration.exportKind === "default" ? "default" : declaration.exportName ?? declaration.name;
}

function getProviderSourceExportName(declaration: ProviderExportDeclaration): string {
  return declaration.sourceTypeFamily?.exportName ?? getProviderExportName(declaration);
}
