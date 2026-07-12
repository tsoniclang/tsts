import { buildDependencySemanticTypeIndex, buildExternalFacadeMap } from "../core/external-facades.mjs";
import { assertSemanticNilability } from "../core/semantic-type-nilability.mjs";
import { buildDeclaredTypeContractIndex } from "./semantic-named-nilability.mjs";

const directReferenceTerminals = new Set(["basic", "channel", "interface", "map", "pointer", "signature", "slice"]);

export function buildTypeRepresentationEvidence(config, snapshot, facades = buildExternalFacadeMap(config, snapshot)) {
  const externalTypeContracts = new Map();
  const dependencyTypeContractsByProfile = new Map();
  const dependencyPointerTerminalsByProfile = new Map();
  const externalFacadeArities = new Map();
  const knownStorageIdentities = new Set();
  const facadeByObjectId = new Map();
  for (const [objectId, facade] of facades) {
    if (facade?.objectId !== objectId) throw new Error(`external facade map key '${objectId}' is not its exact Go object identity`);
    facadeByObjectId.set(objectId, facade);
  }
  for (const semantic of buildDependencySemanticTypeIndex(snapshot).values()) {
    const facade = facadeByObjectId.get(semantic.objectId);
    const contract = {
      objectId: semantic.objectId,
      goDisplayName: semantic.goDisplayName,
      arity: semantic.arity,
      storageIdentity: facade?.storageIdentity,
      storageStrategy: facade?.storageStrategy,
      byProfile: semantic.byProfile,
    };
    if (facade !== undefined) {
      setExact(externalTypeContracts, semantic.objectId, contract, "external Go type contract");
      setExact(externalFacadeArities, semantic.objectId, semantic.arity, "external Go facade arity");
      knownStorageIdentities.add(facade.storageIdentity);
    }
    for (const [profile, declaration] of semantic.byProfile) {
      const contracts = dependencyTypeContractsByProfile.get(profile) ?? new Map();
      setExact(contracts, semantic.objectId, {
        ...contract,
        declaration,
        semanticType: declaration.rhs,
        intrinsicNilable: declaration.object.type.nilable,
        rawInterface: declaration.rhs.kind === "interface",
        pointerStorage: facade?.runtimeAdaptation?.pointer,
      }, `dependency Go type contract in profile '${profile}'`);
      dependencyTypeContractsByProfile.set(profile, contracts);
    }
  }
  for (const [profile, contracts] of dependencyTypeContractsByProfile) {
    for (const [objectId, contract] of contracts) {
      contract.rawInterface = dependencyRawInterface(contract.semanticType, contracts, new Set([objectId]));
    }
    const terminals = new Map();
    for (const objectId of contracts.keys()) {
      const terminal = dependencyPointerTerminalForProfile(objectId, contracts, new Set());
      if (terminal !== undefined) setExact(terminals, objectId, terminal, `dependency Go pointer terminal in profile '${profile}'`);
    }
    dependencyPointerTerminalsByProfile.set(profile, terminals);
  }
  return {
    declaredTypeContractsByProfile: buildDeclaredTypeContractIndex(snapshot),
    externalTypeContracts,
    dependencyTypeContractsByProfile,
    dependencyPointerTerminalsByProfile,
    externalFacadeArities,
    namedTypeStorage: new Map(),
    rawInterfaceObjects: new Set(),
    storageCarrierByIdentity: new Map(),
    knownStorageIdentities,
  };
}

export function addProfileSemanticStorageEvidence(evidence, profile, typeStorage = new Map()) {
  for (const [key, name] of Object.entries(profile.bridge ?? {})) {
    const identity = `${profile.modules.compat}::${name}`;
    setExact(evidence.storageCarrierByIdentity, identity, key, "semantic carrier storage");
    evidence.knownStorageIdentities.add(identity);
  }
  for (const name of Object.values(profile.primitives?.core ?? {})) evidence.knownStorageIdentities.add(`${profile.modules.core}::${name}`);
  for (const name of Object.values(profile.primitives?.compat ?? {})) evidence.knownStorageIdentities.add(`${profile.modules.compat}::${name}`);
  if (!(typeStorage instanceof Map)) throw new Error("semantic named-type storage evidence must be one exact policy map");
  for (const [objectId, storageIdentity] of typeStorage) {
    if (typeof storageIdentity !== "string" || !storageIdentity.includes("::")) {
      throw new Error(`semantic profile storage evidence for '${objectId}' is not one exact TypeScript storage identity`);
    }
    evidence.knownStorageIdentities.add(storageIdentity);
    setExact(evidence.namedTypeStorage, objectId, storageIdentity, "semantic named-type storage evidence");
    for (const contracts of evidence.dependencyTypeContractsByProfile.values()) {
      const contract = contracts.get(objectId);
      if (contract === undefined) continue;
      if (contract.storageIdentity !== undefined && contract.storageIdentity !== storageIdentity) {
        throw new Error(`dependency Go type '${objectId}' has conflicting facade/relation storage identities`);
      }
      contract.storageIdentity = storageIdentity;
    }
  }
  for (const contracts of evidence.dependencyTypeContractsByProfile.values()) {
    for (const [objectId, contract] of contracts) if (contract.rawInterface) evidence.rawInterfaceObjects.add(objectId);
  }
  return evidence;
}

export function semanticPointerPointeeRepresentation(type, context) {
  if (type?.kind !== "pointer") throw new Error("canonical Go pointer carrier selection requires a pointer type");
  assertSemanticNilability(type);
  return pointeeRepresentation(type.element, context, new Set());
}

function pointeeRepresentation(type, context, resolving) {
  if (!type || typeof type.kind !== "string") throw new Error("Go pointer has no canonical pointee type");
  assertSemanticNilability(type, "canonical Go pointer pointee");
  if (type.kind === "array" || type.kind === "struct") return "aggregate";
  if (directReferenceTerminals.has(type.kind)) return "reference";
  if (type.kind === "typeParameter") return typeParameterRepresentation(type, context, resolving);
  if (type.kind !== "named" && type.kind !== "alias") throw new Error(`cannot choose GoRef versus GoPtr for canonical Go ${type.kind} pointee`);
  const objectId = type.reference?.objectId;
  if (typeof objectId !== "string" || objectId === "") throw new Error("canonical named/alias Go pointee has no exact object identity");
  if (objectId === "builtin::type::any" || objectId === "builtin::type::error") return "reference";
  if (resolving.has(objectId)) throw new Error(`Go pointer pointee declaration RHS cycle at '${objectId}'`);
  const declaration = context.index.declaredTypeContractsByProfile?.get(context.profile)?.get(objectId);
  if (declaration !== undefined) {
    resolving.add(objectId);
    try {
      return pointeeRepresentation(declaration.rhs, context, resolving);
    } finally {
      resolving.delete(objectId);
    }
  }
  const dependency = context.index.dependencyPointerTerminalsByProfile?.get(context.profile)?.get(objectId);
  if (dependency !== undefined) return dependency;
  if (context.index.dependencyTypeContractsByProfile?.get(context.profile)?.has(objectId)) {
    throw new Error(`cannot choose GoRef versus GoPtr for dependency aggregate '${objectId}' in semantic profile '${context.profile}': no reviewed pointer storage strategy`);
  }
  if (context.index.namedTypeStorage?.has(objectId)) {
    throw new Error(`cannot choose GoRef versus GoPtr for mapped storage '${objectId}' in semantic profile '${context.profile}': pointee storage strategy is not proven`);
  }
  throw new Error(`cannot choose GoRef versus GoPtr for pointer to '${objectId}' in semantic profile '${context.profile}'`);
}

function typeParameterRepresentation(type, context, resolving) {
  const key = typeParameterKey(type.typeParameter);
  const constraint = context.typeParameterConstraints?.get(key);
  if (constraint === undefined) return "polymorphic";
  const representations = constraintRepresentations(constraint, context, resolving, new Set());
  if (representations === undefined || representations.size !== 1) return "polymorphic";
  return representations.values().next().value;
}

function constraintRepresentations(type, context, resolvingTypes, resolvingConstraints) {
  if (type?.kind === "union") {
    const terms = type.union?.terms;
    if (!Array.isArray(terms) || terms.length === 0) throw new Error("canonical Go type-parameter union constraint has no terms");
    return new Set(terms.map((term) => pointeeRepresentation(term.type, context, resolvingTypes)));
  }
  if (type?.kind !== "interface") return new Set([pointeeRepresentation(type, context, resolvingTypes)]);
  const embedded = type.interface?.embeddedTypes;
  if (!Array.isArray(embedded)) throw new Error("canonical Go interface constraint has no exact embedded-type list");
  if (embedded.length === 0) return undefined;
  const result = new Set();
  let closed = false;
  for (const item of embedded) {
    const key = constraintIdentity(item);
    if (key !== undefined && resolvingConstraints.has(key)) throw new Error(`Go type-parameter constraint cycle at '${key}'`);
    if (key !== undefined) resolvingConstraints.add(key);
    let nested;
    try {
      nested = namedConstraintRepresentations(item, context, resolvingTypes, resolvingConstraints)
        ?? constraintRepresentations(item, context, resolvingTypes, resolvingConstraints);
    } finally {
      if (key !== undefined) resolvingConstraints.delete(key);
    }
    if (nested === undefined) continue;
    closed = true;
    for (const representation of nested) result.add(representation);
  }
  return closed ? result : undefined;
}

function namedConstraintRepresentations(type, context, resolvingTypes, resolvingConstraints) {
  if (type?.kind !== "named" && type?.kind !== "alias") return undefined;
  const objectId = type.reference?.objectId;
  const declaration = context.index.declaredTypeContractsByProfile?.get(context.profile)?.get(objectId)
    ?? context.index.dependencyTypeContractsByProfile?.get(context.profile)?.get(objectId)?.declaration;
  if (declaration === undefined || declaration.rhs.kind !== "interface") return undefined;
  return constraintRepresentations(declaration.rhs, context, resolvingTypes, resolvingConstraints);
}

function dependencyPointerTerminalForProfile(objectId, contracts, resolving) {
  if (resolving.has(objectId)) return undefined;
  const contract = contracts.get(objectId);
  if (contract === undefined) return undefined;
  resolving.add(objectId);
  try {
    const terminal = dependencyTypeTerminal(contract.semanticType, contracts, resolving);
    if (terminal !== "aggregate") return terminal;
    if (contract.pointerStorage === "aggregate") return "aggregate";
    if (contract.pointerStorage === "slot") return "reference";
    return undefined;
  } finally {
    resolving.delete(objectId);
  }
}

function dependencyTypeTerminal(type, contracts, resolving) {
  if (type?.kind === "array" || type?.kind === "struct") return "aggregate";
  if (directReferenceTerminals.has(type?.kind)) return "reference";
  if (type?.kind === "typeParameter") return "polymorphic";
  if (type?.kind !== "named" && type?.kind !== "alias") return undefined;
  const objectId = type.reference?.objectId;
  return typeof objectId === "string" ? dependencyPointerTerminalForProfile(objectId, contracts, resolving) : undefined;
}

function dependencyRawInterface(type, contracts, resolving) {
  if (type?.kind === "interface") return true;
  if (type?.kind !== "named" && type?.kind !== "alias") return false;
  const objectId = type.reference?.objectId;
  if (typeof objectId !== "string" || objectId === "") return false;
  if (resolving.has(objectId)) throw new Error(`dependency Go interface storage cycle at '${objectId}'`);
  const contract = contracts.get(objectId);
  if (contract === undefined) return false;
  resolving.add(objectId);
  try {
    return dependencyRawInterface(contract.semanticType, contracts, resolving);
  } finally {
    resolving.delete(objectId);
  }
}

function constraintIdentity(type) {
  return type?.kind === "named" || type?.kind === "alias" ? type.reference?.objectId : undefined;
}

function typeParameterKey(reference) {
  if (typeof reference?.ownerId !== "string" || !Number.isSafeInteger(reference?.index) || typeof reference?.role !== "string") {
    throw new Error("canonical Go type parameter has no exact owner identity");
  }
  return `${reference.ownerId}::${reference.role}::${reference.index}`;
}

function setExact(index, key, value, label) {
  const previous = index.get(key);
  if (previous !== undefined && previous !== value) throw new Error(`${label} identity '${key}' is ambiguous`);
  index.set(key, value);
}
