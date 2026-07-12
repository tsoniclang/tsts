import { hashText } from "../core/runtime.mjs";
import { canonicalSemanticSignature } from "../core/semantic-variants.mjs";
import {
  buildExternalFacadeStoragePlan,
  externalFacadeStoragePlanAuthoredRoots,
  finalizeExternalFacadeStorageCatalog,
} from "../core/external-facades.mjs";
import { buildAuthoredFacadeSurfaceIndex } from "../core/authored-facade-selections.mjs";

export function finalizeExternalFacadeFixtureCatalog(config, snapshot, parserContext) {
  if (parserContext === undefined) throw new Error("authored facade fixture finalization requires one exact parser/source context");
  const plan = buildExternalFacadeStoragePlan(config, snapshot);
  const authoredSurfaces = buildAuthoredFacadeSurfaceIndex({
    api: parserContext.api,
    config,
    moduleIndex: parserContext.moduleIndex,
    plan,
    valueEnvironments: parserContext.valueEnvironments,
  });
  return finalizeExternalFacadeStorageCatalog(plan, authoredSurfaces);
}

export function finalizeGeneratedFacadeFixtureCatalog(config, snapshot) {
  const plan = buildExternalFacadeStoragePlan(config, snapshot);
  if (externalFacadeStoragePlanAuthoredRoots(plan).size !== 0) {
    throw new Error("generated-only facade fixture cannot contain authored storage policies");
  }
  return finalizeExternalFacadeStorageCatalog(plan, new Map());
}

export function externalSnapshot(dependencyTypeDeclarations, usedObjectIds = dependencyTypeDeclarations.map((declaration) => declaration.object.id)) {
  const used = new Set(usedObjectIds);
  const methodSetSignatures = new Map();
  for (const declaration of dependencyTypeDeclarations) attachDirectMethodSets(declaration, methodSetSignatures);
  const profileIndexes = [...new Set(dependencyTypeDeclarations.flatMap((declaration) => declaration.profiles))]
    .sort((left, right) => left - right);
  return {
    gitRevision: "a".repeat(40),
    files: [{
      path: "fixture/use.go",
      generated: false,
      units: [{
        id: "fixture::fixture/use.go::func::Use",
        kind: "func",
        generated: false,
        metadata: { goPath: "fixture/use.go" },
        semantic: profileIndexes.map((profileIndex) => ({
          profiles: [profileIndex],
          signature: signature(dependencyTypeDeclarations
            .filter((declaration) => used.has(declaration.object.id) && declaration.profiles.includes(profileIndex))
            .map((declaration, index) => variable(
              `fixture::func::Use::profile::${profileIndex}::signature::parameters::${index}`,
              `value${index}`,
              declaration.object.type,
            )), []),
        })),
      }],
    }],
    semantic: {
      dependencyTypeDeclarations,
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [], selections: [], unresolvedSelections: [] },
      methodSetSignatures: [...methodSetSignatures.values()].sort((left, right) => left.id.localeCompare(right.id)),
      profiles: profileIndexes.map(() => ({})),
    },
  };
}

export function setMethodSetParameterNameProvenance(snapshot, provenance) {
  const signatureIds = new Map();
  for (const entry of snapshot.semantic.methodSetSignatures) {
    const previous = entry.id;
    entry.signature.parameterNameProvenance = provenance;
    entry.id = `${entry.methodId}::methodSetSignature::${hashText(canonicalSemanticSignature(entry.signature))}`;
    signatureIds.set(previous, entry.id);
  }
  for (const report of snapshot.semantic.dependencyTypeDeclarations) {
    for (const method of report.type.methods ?? []) method.signature.parameterNameProvenance = provenance;
    for (const mode of ["valueMethodSet", "pointerMethodSet"]) {
      for (const selection of report.type[mode] ?? []) selection.signatureId = signatureIds.get(selection.signatureId) ?? selection.signatureId;
    }
  }
}

function attachDirectMethodSets(declaration, methodSetSignatures) {
  if (declaration.kind !== "type") return;
  const value = [];
  const pointer = [];
  const declaredMethods = declaration.type.methods.length > 0
    ? declaration.type.methods
    : declaration.type.rhs.interface?.completeMethods ?? [];
  for (const [index, method] of declaredMethods.entries()) {
    const { receiver: _receiver, receiverMode: _receiverMode, ...signature } = method.signature;
    const methodOwnerId = declaration.object.id;
    const methodId = `${methodOwnerId}::method::${method.name}`;
    const signatureId = `${methodId}::methodSetSignature::${hashText(canonicalSemanticSignature(signature))}`;
    const selection = {
      key: method.exported ? method.name : `${method.packagePath}.${method.name}`,
      methodId,
      methodOwnerId,
      name: method.name,
      packagePath: method.packagePath,
      exported: method.exported,
      index: [index],
      indirect: false,
      promoted: false,
      signatureId,
    };
    if (method.signature.receiverMode !== "pointer") value.push(selection);
    if (declaration.type.rhs.kind !== "interface") pointer.push(structuredClone(selection));
    methodSetSignatures.set(signatureId, { id: signatureId, methodId, signature });
  }
  declaration.type.valueMethodSet = value;
  declaration.type.pointerMethodSet = pointer;
}

export function externalType({
  packagePath,
  name,
  rhs,
  nilable = rhs.nilable,
  alias = false,
  methods = [],
  profiles = [0],
  typeParameters = [],
}) {
  const objectId = `${packagePath}::type::${name}`;
  const object = {
    id: objectId,
    name,
    packagePath,
    exported: true,
    type: { kind: alias ? "alias" : "named", nilable, reference: { objectId, packagePath, name, typeArgs: [] } },
  };
  return {
    kind: "type",
    packagePath,
    object,
    type: { alias, object, typeParameters, rhs, methodSurface: "complete", methods, valueMethodSet: [], pointerMethodSet: [] },
    profiles,
  };
}

export function externalFunction({ packagePath, name, functionSignature, profiles = [0] }) {
  const objectId = `${packagePath}::func::${name}`;
  const object = {
    id: objectId,
    name,
    packagePath,
    exported: true,
    type: { kind: "signature", nilable: true, signature: functionSignature },
  };
  return {
    kind: "func",
    packagePath,
    object,
    signature: functionSignature,
    profiles,
  };
}

export function externalValue({ packagePath, name, type, constant, profiles = [0] }) {
  const declarationKind = constant === undefined ? "var" : "const";
  const objectId = `${packagePath}::${declarationKind}::${name}`;
  const object = { id: objectId, name, packagePath, exported: true, type };
  return {
    kind: declarationKind,
    packagePath,
    valueSpecs: [{
      specIndex: 0,
      names: [{ name, nameIndex: 0, blank: false, type, object, ...(constant === undefined ? {} : { constant }) }],
    }],
    profiles,
  };
}

export function basic(name, nilable = false) {
  return { kind: "basic", nilable, basic: { name, untyped: false } };
}

export function builtinType(name, nilable) {
  return { kind: "named", nilable, reference: { objectId: `builtin::type::${name}`, packagePath: "", name, typeArgs: [] } };
}

export function namedType(objectId, packagePath, name, typeArgs = [], nilable = false) {
  return { kind: "named", nilable, reference: { objectId, packagePath, name, typeArgs } };
}

export function sliceType(element) {
  return { kind: "slice", nilable: true, element };
}

export function structType(fields) {
  return {
    kind: "struct",
    nilable: false,
    struct: { fields: fields.map((entry) => ({ variable: entry, tag: "", tagValues: [], tagRemainder: "" })) },
  };
}

export function interfaceType(explicitMethods = []) {
  return {
    kind: "interface",
    nilable: true,
    interface: {
      explicitMethods,
      embeddedTypes: [],
      embeddedKinds: [],
      completeMethods: explicitMethods,
      comparable: false,
      implicit: false,
      methodSetOnly: true,
      explicitMethodOrderProvenance: "source",
    },
  };
}

export function method(id, ownerId, name, methodSignature) {
  return { id, ownerId, name, packagePath: "io", exported: true, signature: methodSignature };
}

export function signature(parameters, results = []) {
  return {
    receiverTypeParameters: [],
    typeParameters: [],
    parameters: { variables: parameters },
    results: { variables: results },
    variadic: false,
    parameterNameProvenance: "source",
  };
}

export function variable(id, name, type, exported = false) {
  return { id, name, nameKind: name === "" ? "unnamed" : name === "_" ? "blank" : "named", packagePath: "", exported, type };
}
