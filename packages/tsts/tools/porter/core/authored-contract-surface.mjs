import { externalMethodById } from "./external-facade-method-bindings.mjs";
import { materializeSemanticMethodSet } from "./semantic-method-sets.mjs";

export function buildAuthoredContractSurface(facade, declaration, methodSetSignatures, authoredSurface) {
  requireAuthoredSurface(facade, authoredSurface);
  const representation = facade.runtimeAdaptation?.representation;
  requireCompatibleDeclarationKind(facade, authoredSurface.declarationKind, representation);
  const memberSelection = new Set(authoredSurface.memberKeys);
  const scalar = representation === "scalar";
  const fields = scalar || declaration.rhs.kind !== "struct"
    ? []
    : (declaration.rhs.struct?.fields ?? []).filter((field) =>
      field.variable?.exported && memberSelection.has(memberKey("property", field.variable.name)));
  const directMode = facade.runtimeAdaptation?.pointer === "aggregate" ? "pointer" : "value";
  const methods = scalar
    ? []
    : materializeSemanticMethodSet(declaration, directMode, methodSetSignatures)
      .filter((method) => method.exported && memberSelection.has(memberKey("method", method.name)));
  const heritage = scalar || declaration.rhs.kind !== "interface"
    ? []
    : [...(declaration.rhs.interface?.embeddedTypes ?? [])];
  const pointerMethods = !scalar && facade.runtimeAdaptation?.pointer === "slot"
    ? materializeSemanticMethodSet(declaration, "pointer", methodSetSignatures)
    : [];
  const methodBindings = (facade.methodBindings ?? []).map((binding) => {
    const method = externalMethodById(declaration, binding.methodId);
    if (method === undefined) {
      throw new Error(`external Go method binding '${binding.methodId}' is missing from '${facade.objectId}'`);
    }
    return { binding, method };
  });
  return Object.freeze({
    authoredSurface,
    declarationKind: authoredSurface.declarationKind,
    fields,
    fullRhs: !scalar && !new Set(["struct", "interface"]).has(declaration.rhs.kind),
    heritage,
    memberSelection,
    methodBindings,
    methods,
    pointerMethods,
    typeParameters: [...(declaration.typeParameters ?? [])],
  });
}

export function memberKey(kind, name) {
  return `${kind}\0${name}`;
}

function requireAuthoredSurface(facade, surface) {
  if (surface === null || typeof surface !== "object" || Array.isArray(surface) || surface.objectId !== facade.objectId ||
      typeof surface.declarationId !== "string" || typeof surface.declarationHash !== "string" ||
      !Array.isArray(surface.memberKeys) || new Set(surface.memberKeys).size !== surface.memberKeys.length ||
      surface.memberKeys.some((entry) => typeof entry !== "string" || !/^(method|property)\0[^\0]+$/.test(entry))) {
    throw new Error(`authored facade '${facade.objectId}' has no exact source declaration surface`);
  }
}

function requireCompatibleDeclarationKind(facade, declarationKind, representation) {
  if (!new Set(["class", "interface", "object-alias", "type-alias"]).has(declarationKind)) {
    throw new Error(`authored facade '${facade.objectId}' has unsupported declaration kind '${declarationKind}'`);
  }
  const expected = representation === "class"
    ? new Set(["class"])
    : representation === "scalar"
      ? new Set(["type-alias"])
      : representation === "structural"
        ? new Set(["interface", "object-alias"])
        : new Set(["interface", "object-alias", "type-alias"]);
  if (!expected.has(declarationKind)) {
    throw new Error(`authored facade '${facade.objectId}' ${representation ?? "direct"} representation cannot use TypeScript ${declarationKind} storage`);
  }
}
