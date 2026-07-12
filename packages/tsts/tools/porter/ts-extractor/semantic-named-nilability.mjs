import { canonicalSchemaValue } from "../core/semantic-variants.mjs";
import { assertSemanticNilability } from "../core/semantic-type-nilability.mjs";
import { exactSemanticTypeDeclarationIdentity } from "../core/semantic-type-declaration-identity.mjs";

const intrinsicallyNilableStorageCarriers = new Set([
  "chan",
  "error",
  "func",
  "interface",
  "map",
  "nilable",
  "pointer",
  "ref",
  "slice",
  "unsafePointer",
]);

export function buildDeclaredTypeContractIndex(snapshot) {
  const contractsByProfile = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type") continue;
      for (const semantic of unit.semantic ?? []) {
        const declaration = semantic?.type;
        if (declaration === undefined) continue;
        addTypeDeclaration(declaration, semantic.profiles, `Go type unit '${unit.id}'`);
      }
    }
  }
  const surface = snapshot.semantic?.externalPackageSurface;
  for (const semantic of [
    ...(Array.isArray(surface?.declarations) ? surface.declarations : []),
    ...(Array.isArray(surface?.dependencyTypeDeclarations) ? surface.dependencyTypeDeclarations : []),
  ]) {
    if (semantic?.kind !== "type" || semantic.type === undefined) continue;
    addTypeDeclaration(semantic.type, semantic.profiles, "external package Go type");
  }
  return contractsByProfile;

  function addTypeDeclaration(declaration, profiles, label) {
    const contract = semanticTypeDeclarationContract(declaration, label);
    for (const profile of profiles ?? []) {
      const contracts = contractsByProfile.get(profile) ?? new Map();
      const previous = contracts.get(contract.objectId);
      if (previous !== undefined && canonicalSchemaValue(previous) !== canonicalSchemaValue(contract)) {
        throw new Error(`Go type '${contract.objectId}' has conflicting semantic declaration contracts in profile '${profile}'`);
      }
      contracts.set(contract.objectId, contract);
      contractsByProfile.set(profile, contracts);
    }
  }
}

export function semanticTypeDeclarationContract(declaration, label = "Go type declaration") {
  const { objectId, objectType } = exactSemanticTypeDeclarationIdentity(declaration, label);
  assertSemanticNilability(objectType, `${label} object type`);
  assertSemanticNilability(declaration.rhs, `${label} RHS`);
  if (objectType.nilable !== declaration.rhs.nilable) {
    throw new Error(`${label} object '${objectId}' and declaration RHS disagree on intrinsic nilability`);
  }
  const rawInterface = declaration.rhs.kind === "interface";
  if (!Array.isArray(declaration.typeParameters)) throw new Error(`${label} has no exact type-parameter list`);
  return {
    objectId,
    alias: declaration.alias,
    rawInterface,
    nilable: objectType.nilable,
    typeParameterCount: declaration.typeParameters.length,
    rhs: declaration.rhs,
  };
}

export function semanticNamedNilabilityDisposition(type, context) {
  if (type?.kind !== "named" && type?.kind !== "alias") {
    throw new Error("named semantic contract selection requires a canonical named/alias Go type");
  }
  assertSemanticNilability(type);
  const reference = requireReference(type.reference);
  if (reference.objectId === "builtin::type::any") {
    requireNilabilityMatch(type, true, reference.objectId, "go/types builtin interface");
    return { kind: "rawInterface" };
  }
  if (reference.objectId === "builtin::type::error") {
    requireNilabilityMatch(type, true, reference.objectId, "go/types builtin error interface");
    return { kind: "plain" };
  }
  const declaration = context.index.declaredTypeContractsByProfile?.get(context.profile)?.get(reference.objectId);
  if (declaration !== undefined) {
    if (reference.typeArgs.length !== declaration.typeParameterCount) {
      throw new Error(`Go type '${reference.objectId}' expected ${declaration.typeParameterCount} canonical type argument(s), got ${reference.typeArgs.length}`);
    }
    requireNilabilityMatch(type, declaration.nilable, reference.objectId, "declaration");
  }

  const storageIdentity = context.index.namedTypeStorage?.get(reference.objectId);
  if (storageIdentity !== undefined) return storageDisposition(type, reference, storageIdentity, context);

  if (declaration !== undefined) {
    if (usesRawInterfaceStorage(declaration.rhs, context, new Set([reference.objectId]))) return { kind: "rawInterface" };
    return { kind: "plain" };
  }

  if (context.index.rawInterfaceObjects?.has(reference.objectId) === true) {
    requireNilabilityMatch(type, true, reference.objectId, "external interface member");
    return { kind: "rawInterface" };
  }

  const dependency = context.index.dependencyTypeContractsByProfile?.get(context.profile)?.get(reference.objectId);
  if (dependency !== undefined) return dependencyDisposition(type, reference, dependency);
  return { kind: "unresolved" };
}

function storageDisposition(type, reference, storageIdentity, context) {
  const index = context.index;
  const builtinStorage = builtinStorageIdentity(reference, index);
  if (builtinStorage !== undefined && builtinStorage !== storageIdentity) {
    throw new Error(`builtin Go type '${reference.objectId}' storage '${storageIdentity}' does not equal profile primitive storage '${builtinStorage}'`);
  }
  const dependency = index.dependencyTypeContractsByProfile?.get(context.profile)?.get(reference.objectId)
    ?? index.externalTypeContracts?.get(reference.objectId);
  if (dependency !== undefined) {
    if (dependency.storageIdentity !== storageIdentity) {
      throw new Error(`dependency Go type '${reference.objectId}' storage '${storageIdentity}' does not equal reviewed storage '${dependency.storageIdentity}'`);
    }
    return dependencyDisposition(type, reference, dependency);
  }
  const carrier = index.storageCarrierByIdentity?.get(storageIdentity);
  if (carrier !== undefined) {
    if (carrier === "array") {
      requireNilabilityMatch(type, false, reference.objectId, "profile array storage");
      return { kind: "plain" };
    }
    if (!intrinsicallyNilableStorageCarriers.has(carrier)) {
      throw new Error(`Go type '${reference.objectId}' storage '${storageIdentity}' has unknown intrinsic carrier contract '${carrier}'`);
    }
    requireNilabilityMatch(type, true, reference.objectId, `profile ${carrier} storage`);
    if (carrier === "interface") return { kind: "rawInterface" };
    if (carrier === "nilable") return { kind: "carrier", carrier };
    return { kind: "plain" };
  }
  if (index.knownStorageIdentities?.has(storageIdentity) === true) {
    if (builtinStorage !== undefined) {
      const expected = reference.objectId === "builtin::type::error";
      requireNilabilityMatch(type, expected, reference.objectId, "profile primitive storage");
    }
    return { kind: "plain" };
  }
  throw new Error(`Go type '${reference.objectId}' storage evidence '${storageIdentity}' does not equal its exact configured TypeScript storage identity`);
}

function builtinStorageIdentity(reference, index) {
  if (reference.packagePath !== "") return undefined;
  if (Object.hasOwn(index.primCore ?? {}, reference.name)) return `${index.core}::${index.primCore[reference.name]}`;
  if (Object.hasOwn(index.primCompat ?? {}, reference.name)) return `${index.compat}::${index.primCompat[reference.name]}`;
  return undefined;
}

function dependencyDisposition(type, reference, dependency) {
  if (reference.typeArgs.length !== dependency.arity) {
    throw new Error(`Go type '${reference.objectId}' expected ${dependency.arity} canonical type argument(s), got ${reference.typeArgs.length}`);
  }
  requireNilabilityMatch(type, dependency.intrinsicNilable, reference.objectId, "dependency go/types declaration");
  if (dependency.rawInterface) return { kind: "rawInterface" };
  return { kind: "plain" };
}

function usesRawInterfaceStorage(type, context, resolving) {
  if (type?.kind === "interface") return true;
  if (type?.kind !== "named" && type?.kind !== "alias") return false;
  const reference = requireReference(type.reference);
  if (context.index.rawInterfaceObjects?.has(reference.objectId) === true) return true;
  const dependency = context.index.dependencyTypeContractsByProfile?.get(context.profile)?.get(reference.objectId);
  if (dependency?.rawInterface === true) return true;
  const storageIdentity = context.index.namedTypeStorage?.get(reference.objectId);
  if (storageIdentity !== undefined && context.index.storageCarrierByIdentity?.get(storageIdentity) === "interface") return true;
  const declaration = context.index.declaredTypeContractsByProfile?.get(context.profile)?.get(reference.objectId);
  if (declaration === undefined) return false;
  if (resolving.has(reference.objectId)) throw new Error(`Go raw-interface declaration cycle at '${reference.objectId}'`);
  resolving.add(reference.objectId);
  try {
    return usesRawInterfaceStorage(declaration.rhs, context, resolving);
  } finally {
    resolving.delete(reference.objectId);
  }
}

function requireNilabilityMatch(type, expected, objectId, source) {
  if (type.nilable !== expected) {
    throw new Error(`Go type '${objectId}' has nilable=${type.nilable}, conflicting with exact ${source} evidence nilable=${expected}`);
  }
}

function requireReference(reference) {
  if (typeof reference?.objectId !== "string" || reference.objectId === "") throw new Error("canonical named/alias Go type has no exact object identity");
  if (typeof reference.packagePath !== "string" || typeof reference.name !== "string" || reference.name === "") {
    throw new Error(`canonical named/alias Go type '${reference.objectId}' has an incomplete reference identity`);
  }
  if (!Array.isArray(reference.typeArgs)) throw new Error(`canonical named/alias Go type '${reference.objectId}' has no exact type-argument list`);
  return reference;
}
