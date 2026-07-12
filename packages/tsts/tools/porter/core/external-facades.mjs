import { compareText } from "./deterministic-order.mjs";
import { isActivePortPolicy, policyForUnit } from "./policies.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { buildTypeStorageIdentityMap } from "./type-storage-policies.mjs";
import { buildSemanticMethodSetSignatureIndex, materializeSemanticMethodSet } from "./semantic-method-sets.mjs";
import {
  buildActiveLocalTypeProfileKeys,
  buildAllSemanticLocalTypeProfileKeys,
  buildMechanicallyStoredLocalTypeProfileKeys,
  isModulePackage,
  requiresDependencyDeclarationForProfile,
} from "./dependency-type-ownership.mjs";
import {
  addSelectedExternalTypePolicies,
  authoredFacadeModuleSet,
  externalFacadeModulePath,
  externalStorageOwners,
  normalizedExternalFacadePolicies,
  resolveExternalFacadePolicy,
} from "./external-facade-policies.mjs";
import { normalizeExternalPackageSurfaceSelections } from "./external-package-declarations.mjs";
import {
  collectReachableDependencyTypeProfiles,
  dependencyDeclarationDependencies,
  requireDependencyReference,
  requireDependencySemanticUsage,
  requireExactDependencyTypeClosure,
  unsafePointerReference,
} from "./external-facades/dependency-closure.mjs";
import { buildAuthoredContractSurface } from "./authored-contract-surface.mjs";
import { buildDependencySemanticTypeIndex, externalPackageTypeEvidence } from "./external-facades/semantic-index.mjs";

export { authoredFacadeModuleSet, externalFacadeModulePath } from "./external-facade-policies.mjs";
export { buildDependencySemanticTypeIndex } from "./external-facades/semantic-index.mjs";

const externalFacadeStoragePlans = new WeakMap();

class FinalizedExternalFacadeStorageCatalog {
  #artifactView;
  #authoredSurfaces;
  #auditView;
  #config;
  #snapshot;

  constructor(config, snapshot, artifactFacades, auditFacades, authoredSurfaces) {
    deepFreezeContractInput(config, "Porter config");
    deepFreezeContractInput(snapshot, "Porter snapshot");
    this.#config = config;
    this.#snapshot = snapshot;
    this.#artifactView = new ImmutableFacadeView(config, snapshot, "artifact", artifactFacades);
    this.#auditView = new ImmutableFacadeView(config, snapshot, "audit", auditFacades);
    this.#authoredSurfaces = new Map([...authoredSurfaces].map(([objectId, surface]) => [
      objectId,
      immutableFacadeEvidenceCopy(surface),
    ]));
    Object.freeze(this);
  }

  artifactFacades(config, snapshot) { this.#requireInputs(config, snapshot); return this.#artifactView; }
  auditFacades(config, snapshot) { this.#requireInputs(config, snapshot); return this.#auditView; }
  authoredSurface(config, snapshot, objectId) { this.#requireInputs(config, snapshot); return this.#authoredSurfaces.get(objectId); }

  #requireInputs(config, snapshot) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("external facade catalog was built from different config or snapshot objects");
    }
  }
}

class ImmutableFacadeView {
  #config;
  #facades;
  #scope;
  #snapshot;

  constructor(config, snapshot, scope, facades) {
    this.#config = config;
    this.#facades = new Map(facades);
    this.#scope = scope;
    this.#snapshot = snapshot;
    Object.freeze(this);
  }

  get size() { return this.#facades.size; }
  get(objectId) { return this.#facades.get(objectId); }
  has(objectId) { return this.#facades.has(objectId); }
  entries() { return this.#facades.entries(); }
  keys() { return this.#facades.keys(); }
  values() { return this.#facades.values(); }
  [Symbol.iterator]() { return this.#facades[Symbol.iterator](); }

  require(config, snapshot, expectedScope) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("external facade storage view was built from different config or snapshot objects");
    }
    if (expectedScope !== undefined && expectedScope !== this.#scope) {
      throw new Error(`external facade storage view has '${this.#scope}' scope, not required '${expectedScope}' scope`);
    }
    return this.#scope;
  }
}

export function buildExternalFacadeStoragePlan(config, snapshot) {
  const artifactContext = buildExternalFacadeContext(config, snapshot, false);
  const auditContext = buildExternalFacadeContext(config, snapshot, true);
  const authoredRoots = new Map();
  for (const [objectId, policy] of auditContext.policies) {
    if (policy.storageStrategy !== "authored") continue;
    const semantic = auditContext.semanticIndex.get(objectId);
    if (semantic === undefined) throw new Error(`authored external facade '${objectId}' has no exact semantic declaration`);
    authoredRoots.set(objectId, Object.freeze(materializeExternalFacade(config, semantic, policy)));
  }
  const plan = Object.freeze({});
  externalFacadeStoragePlans.set(plan, { artifactContext, auditContext, authoredRoots });
  return plan;
}

export function externalFacadeStoragePlanAuthoredRoots(plan) {
  return new Map(requireExternalFacadeStoragePlan(plan).authoredRoots);
}

export function finalizeExternalFacadeStorageCatalog(plan, authoredSurfaces) {
  const { artifactContext, auditContext, authoredRoots } = requireExternalFacadeStoragePlan(plan);
  const surfaces = requireExactAuthoredSurfaces(authoredRoots, authoredSurfaces, auditContext.methodSetSignatures);
  const artifactObjectIds = selectExternalFacadeObjectIds(artifactContext, surfaces);
  const auditObjectIds = selectExternalFacadeObjectIds(auditContext, surfaces);
  const auditFacades = materializeExternalFacadeMap(auditContext, auditObjectIds);
  const artifactFacades = new Map();
  for (const objectId of [...artifactObjectIds].sort(compareText)) {
    const facade = auditFacades.get(objectId);
    if (facade === undefined) throw new Error(`artifact facade '${objectId}' is absent from the complete audit closure`);
    artifactFacades.set(objectId, facade);
  }
  return new FinalizedExternalFacadeStorageCatalog(
    artifactContext.config,
    artifactContext.snapshot,
    artifactFacades,
    auditFacades,
    surfaces,
  );
}

function buildExternalFacadeContext(config, snapshot, includeExternalPackageSurface) {
  const ordinarySemanticIndex = buildDependencySemanticTypeIndex(snapshot);
  const semanticIndex = includeExternalPackageSurface
    ? buildDependencySemanticTypeIndex(snapshot, "audit")
    : ordinarySemanticIndex;
  const methodSetSignatures = buildSemanticMethodSetSignatureIndex(snapshot);
  const localStorageTypeProfileKeys = buildMechanicallyStoredLocalTypeProfileKeys(config, snapshot);
  const allLocalTypeProfileKeys = buildAllSemanticLocalTypeProfileKeys(snapshot);
  const profile = loadProfile(config);
  const profileStorage = buildTypeStorageIdentityMap(config, snapshot);
  for (const [objectId, storageIdentity] of profileStorage) {
    const semantic = semanticIndex.get(objectId);
    if (semantic !== undefined && semantic.variants.length !== 1) {
      throw new Error(`dependency Go type '${objectId}' has profile-dependent go/types declarations but one storage contract '${storageIdentity}'`);
    }
  }
  const authoredModules = authoredFacadeModuleSet(config);
  const selections = normalizeExternalPackageSurfaceSelections(config);
  const surfaceObjectIds = new Set(externalPackageTypeEvidence(snapshot).map((declaration) => declaration.object.id));
  const policies = normalizedExternalFacadePolicies(
    config,
    semanticIndex,
    profileStorage,
    authoredModules,
    includeExternalPackageSurface ? new Set() : surfaceObjectIds,
  );
  addSelectedExternalTypePolicies(
    includeExternalPackageSurface
      ? selections
      : selections.filter((selection) => selection.goKind !== "type" || semanticIndex.has(selection.objectId)),
    semanticIndex,
    policies,
    authoredModules,
  );
  const resolvePolicy = (objectId) => resolveExternalFacadePolicy(
    config,
    profile,
    semanticIndex.get(objectId),
    policies,
    authoredModules,
  );
  const directUsages = collectDependencyTypeUsages(
    config,
    snapshot,
    ordinarySemanticIndex,
    localStorageTypeProfileKeys,
    methodSetSignatures,
  );
  if (includeExternalPackageSurface) {
    directUsages.push(...collectDependencyTypeUsages(
      config,
      snapshot,
      semanticIndex,
      localStorageTypeProfileKeys,
      methodSetSignatures,
      snapshot.semantic.externalPackageSurface.declarations,
      { typeDeclarationSurface: "identity" },
    ));
  }
  const closureUsages = collectDependencyTypeUsages(
    config,
    snapshot,
    semanticIndex,
    allLocalTypeProfileKeys,
    methodSetSignatures,
    allSemanticDeclarations(snapshot, includeExternalPackageSurface),
  );
  const reachableProfileKeys = collectReachableDependencyTypeProfiles(
    config,
    semanticIndex,
    closureUsages,
    methodSetSignatures,
    allLocalTypeProfileKeys,
  );
  requireExactDependencyTypeClosure(semanticIndex, reachableProfileKeys);
  return {
    config,
    directUsages,
    localStorageTypeProfileKeys,
    methodSetSignatures,
    policies,
    profileStorage,
    resolvePolicy,
    semanticIndex,
    snapshot,
  };
}

function materializeExternalFacadeMap(context, selectedObjectIds) {
  const { config, policies, profileStorage, semanticIndex } = context;
  const storageOwners = externalStorageOwners(config, policies, profileStorage);
  const facades = new Map();
  for (const objectId of [...selectedObjectIds].sort(compareText)) {
    const semantic = semanticIndex.get(objectId);
    const policy = policies.get(objectId);
    if (semantic === undefined || policy === undefined) throw new Error(`external facade '${objectId}' has no exact semantic/policy join`);
    const facade = materializeExternalFacade(config, semantic, policy);
    if (storageOwners.get(facade.storageIdentity) !== facade.objectId) throw new Error(`external facade '${facade.objectId}' lost its exact TypeScript storage ownership`);
    const previous = facades.get(facade.objectId);
    if (previous !== undefined) throw new Error(`duplicate external facade Go object identity '${facade.objectId}'`);
    facades.set(facade.objectId, facade);
  }
  return facades;
}

function materializeExternalFacade(config, semantic, policy) {
  return immutableFacadeEvidenceCopy({
    arity: semantic.arity,
    goDisplayName: semantic.goDisplayName,
    name: semantic.name,
    objectId: semantic.objectId,
    packagePath: semantic.packagePath,
    variants: semantic.variants,
    tsModule: policy.tsModule,
    tsName: policy.tsName,
    storageStrategy: policy.storageStrategy,
    runtimeAdaptation: policy.runtimeAdaptation,
    methodBindings: policy.methodBindings,
    storageIdentity: `${config.tsRoot.replace(/\/+$/, "")}/${policy.tsModule}::${policy.tsName}`,
  });
}

function allSemanticDeclarations(snapshot, includeExternalPackageSurface) {
  const declarations = [];
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) declarations.push(...(unit.semantic ?? []));
  }
  if (includeExternalPackageSurface) declarations.push(...(snapshot.semantic?.externalPackageSurface?.declarations ?? []));
  return declarations;
}

export function collectDependencyTypeUsages(
  config,
  snapshot,
  semanticIndex = buildDependencySemanticTypeIndex(snapshot),
  activeLocalTypeProfileKeys = buildActiveLocalTypeProfileKeys(config, snapshot),
  methodSetSignatures = buildSemanticMethodSetSignatureIndex(snapshot),
  declarations = undefined,
  options = {},
) {
  requireExactOptionKeys(options, new Set(["typeDeclarationSurface"]), "dependency type usage collection");
  if (options.typeDeclarationSurface !== undefined && options.typeDeclarationSurface !== "identity") {
    throw new Error(`unknown dependency type declaration root surface '${options.typeDeclarationSurface}'`);
  }
  const usages = new Map();
  if (declarations === undefined) {
    for (const file of snapshot.files ?? []) {
      for (const unit of file.units ?? []) {
        if (!isActivePortPolicy(policyForUnit(config, unit, file))) continue;
        for (const declaration of unit.semantic ?? []) visitDeclaration(declaration);
      }
    }
  } else {
    if (!Array.isArray(declarations)) throw new Error("semantic type usage declaration roots must be an exact array");
    for (const declaration of declarations) visitDeclaration(declaration);
  }
  return [...usages.values()].sort((left, right) => compareText(left.objectId, right.objectId));

  function visitDeclaration(declaration) {
    const profiles = requireProfileSet(declaration.profiles, "active Go semantic declaration");
    if (options.typeDeclarationSurface === "identity" && declaration.kind === "type") {
      visitType(declaration.object?.type, profiles);
      return;
    }
    visitType(declaration.object?.type, profiles);
    visitType(declaration.type?.rhs, profiles);
    for (const parameter of declaration.type?.typeParameters ?? []) visitType(parameter.constraint, profiles);
    for (const method of declaration.type?.methods ?? []) visitSignature(method.signature, profiles);
    if (declaration.type !== undefined) {
      for (const mode of ["value", "pointer"]) {
        for (const method of materializeSemanticMethodSet(declaration.type, mode, methodSetSignatures)) visitSignature(method.signature, profiles);
      }
    }
    visitSignature(declaration.signature, profiles);
    for (const specification of declaration.valueSpecs ?? []) {
      for (const binding of specification.names ?? []) visitType(binding.type, profiles);
    }
  }

  function visitSignature(signature, profiles) {
    if (signature === undefined) return;
    visitType(signature.receiver?.type, profiles);
    for (const parameter of [...(signature.receiverTypeParameters ?? []), ...(signature.typeParameters ?? [])]) visitType(parameter.constraint, profiles);
    for (const variable of signature.parameters?.variables ?? []) visitType(variable.type, profiles);
    for (const variable of signature.results?.variables ?? []) visitType(variable.type, profiles);
  }

  function visitType(type, profiles) {
    if (type === undefined) return;
    const unsafePointer = unsafePointerReference(type);
    if (unsafePointer !== undefined && semanticIndex.has(unsafePointer.objectId)) {
      record(unsafePointer, profiles);
      return;
    }
    if (type.kind === "named" || type.kind === "alias") {
      const reference = type.reference;
      requireDependencyReference(reference, "active Go semantic declaration");
      const dependencyProfiles = new Set([...profiles].filter((profile) => requiresDependencyDeclarationForProfile(
        reference,
        profile,
        semanticIndex,
        activeLocalTypeProfileKeys,
        config.goModulePath,
      )));
      if (dependencyProfiles.size > 0) record(reference, dependencyProfiles);
      for (const argument of reference.typeArgs ?? []) visitType(argument, profiles);
      return;
    }
    visitType(type.element, profiles);
    visitType(type.key, profiles);
    visitSignature(type.signature, profiles);
    for (const variable of type.tuple?.variables ?? []) visitType(variable.type, profiles);
    for (const field of type.struct?.fields ?? []) visitType(field.variable?.type, profiles);
    for (const method of [...(type.interface?.explicitMethods ?? []), ...(type.interface?.completeMethods ?? [])]) visitSignature(method.signature, profiles);
    for (const embedded of type.interface?.embeddedTypes ?? []) visitType(embedded, profiles);
    for (const term of type.union?.terms ?? []) visitType(term.type, profiles);
  }

  function record(reference, profiles) {
    requireDependencyReference(reference, "active Go semantic declaration");
    const arity = reference.typeArgs.length;
    const existing = usages.get(reference.objectId);
    if (existing !== undefined) {
      if (existing.arity !== arity) throw new Error(`dependency Go type '${reference.objectId}' is instantiated with conflicting arities`);
      existing.count++;
      for (const profile of profiles) existing.profiles.add(profile);
      return;
    }
    usages.set(reference.objectId, {
      objectId: reference.objectId,
      goDisplayName: `${reference.packagePath}.${reference.name}`,
      arity,
      count: 1,
      profiles: new Set(profiles),
    });
  }
}

function requireExactOptionKeys(options, allowed, label) {
  if (options === null || typeof options !== "object" || Array.isArray(options)) {
    throw new Error(`${label} options must be one exact object`);
  }
  const unknown = Reflect.ownKeys(options).filter((key) => typeof key !== "string" || !allowed.has(key)).map(String).sort();
  if (unknown.length > 0) throw new Error(`${label} options contain unknown current-contract key(s): ${unknown.join(", ")}`);
}

function selectExternalFacadeObjectIds(context, authoredSurfaces) {
  const {
    config,
    directUsages,
    localStorageTypeProfileKeys: activeLocalTypeProfileKeys,
    methodSetSignatures,
    profileStorage,
    resolvePolicy,
    semanticIndex,
  } = context;
  const finalized = authoredSurfaces !== undefined;
  const selected = new Set();
  const pending = [];
  const queued = new Set();
  const expanded = new Set();

  for (const usage of directUsages) {
    requireDependencySemanticUsage(semanticIndex, usage.objectId, usage.arity, usage.profiles, "active Go declaration");
    for (const profile of usage.profiles) enqueue(usage.objectId, profile, "active Go declaration");
  }
  while (pending.length > 0) {
    pending.sort((left, right) => compareText(left.key, right.key));
    const current = pending.shift();
    const semantic = semanticIndex.get(current.objectId);
    const declaration = semantic?.byProfile.get(current.profile);
    if (declaration === undefined) {
      throw new Error(`dependency Go type '${current.objectId}' has no declaration in semantic profile '${current.profile}' required by ${current.reason}`);
    }
    const moduleLocalDependency = isModulePackage(semantic.packagePath, config.goModulePath);
    if (profileStorage.has(current.objectId)) continue;
    if (moduleLocalDependency && !activeLocalTypeProfileKeys.has(current.key)) {
      throw new Error(`excluded module-local dependency type '${current.objectId}' in semantic profile '${current.profile}' requires an explicit go-type-storage relation; reached from ${current.reason}`);
    }
    if (moduleLocalDependency) continue;
    const policy = resolvePolicy(current.objectId);
    if (policy === undefined) {
      throw new Error(`external Go dependency '${current.objectId}' in semantic profile '${current.profile}' requires an exact TS module/name/storage policy; reached from ${current.reason}`);
    }
    selected.add(current.objectId);
    if (policy.storageStrategy === "authored") {
      if (!finalized || expanded.has(current.key)) continue;
      expanded.add(current.key);
      const facade = materializeExternalFacade(config, semantic, policy);
      const authoredSurface = authoredSurfaces.get(current.objectId);
      if (facade === undefined || authoredSurface === undefined) {
        throw new Error(`authored external facade '${current.objectId}' has no finalized declaration surface`);
      }
      const contractSurface = buildAuthoredContractSurface(
        facade,
        declaration,
        methodSetSignatures,
        authoredSurface,
      );
      for (const dependency of dependencyDeclarationDependencies(
        declaration,
        semanticIndex,
        activeLocalTypeProfileKeys,
        config.goModulePath,
        methodSetSignatures,
        current.profile,
        "authored-surface",
        { contractSurface },
      )) {
        requireDependencySemanticUsage(
          semanticIndex,
          dependency.objectId,
          dependency.arity,
          new Set([current.profile]),
          `selected authored dependency type '${current.objectId}'`,
        );
        enqueue(dependency.objectId, current.profile, `selected authored dependency type '${current.objectId}'`);
      }
      continue;
    }
    if (expanded.has(current.key)) continue;
    expanded.add(current.key);
    for (const dependency of dependencyDeclarationDependencies(
      declaration,
      semanticIndex,
      activeLocalTypeProfileKeys,
      config.goModulePath,
      methodSetSignatures,
      current.profile,
      "generated-surface",
    )) {
      requireDependencySemanticUsage(
        semanticIndex,
        dependency.objectId,
        dependency.arity,
        new Set([current.profile]),
        `dependency type '${current.objectId}'`,
      );
      enqueue(dependency.objectId, current.profile, `dependency type '${current.objectId}'`);
    }
  }
  return selected;

  function enqueue(objectId, profile, reason) {
    const key = `${profile}\0${objectId}`;
    if (queued.has(key)) return;
    queued.add(key);
    pending.push({ key, objectId, profile, reason });
  }
}

function requireProfileSet(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
    throw new Error(`${label} has no exact semantic profile set`);
  }
  return new Set(value);
}

function requireExternalFacadeStoragePlan(value) {
  const state = value !== null && typeof value === "object" ? externalFacadeStoragePlans.get(value) : undefined;
  if (state === undefined || !(state.authoredRoots instanceof Map)) {
    throw new Error("operation requires one exact external facade storage plan");
  }
  return state;
}

function requireExactAuthoredSurfaces(authoredRoots, value, methodSetSignatures) {
  if (!(value instanceof Map)) throw new Error("finalized external facade catalog requires one exact authored-surface map");
  const surfaces = new Map();
  for (const [objectId, surface] of value) {
    const root = authoredRoots.get(objectId);
    if (root === undefined) throw new Error(`authored facade surface '${objectId}' has no storage-plan root`);
    if (surface?.objectId !== objectId || surface.declarationId !== root.storageIdentity) {
      throw new Error(`authored facade surface '${objectId}' does not identify its exact storage declaration`);
    }
    const configuredHash = root.runtimeAdaptation?.tsDeclarationHash;
    if (configuredHash !== undefined && surface.declarationHash !== configuredHash) {
      throw new Error(`authored facade surface '${objectId}' drifted from its reviewed TypeScript declaration hash`);
    }
    for (const variant of root.variants) {
      buildAuthoredContractSurface(root, variant.declaration, methodSetSignatures, surface);
    }
    surfaces.set(objectId, immutableFacadeEvidenceCopy(surface));
  }
  for (const objectId of authoredRoots.keys()) {
    if (!surfaces.has(objectId)) throw new Error(`authored facade root '${objectId}' has no source declaration surface`);
  }
  return surfaces;
}

export function requireFinalizedExternalFacadeStorageCatalog(value, config, snapshot) {
  if (!(value instanceof FinalizedExternalFacadeStorageCatalog)) {
    throw new Error("operation requires one finalized external facade storage catalog");
  }
  value.artifactFacades(config, snapshot);
  return value;
}

export function requireExternalFacadeStorageView(value, config, snapshot, expectedScope = undefined) {
  if (!(value instanceof ImmutableFacadeView)) {
    throw new Error("operation requires one finalized external facade storage view");
  }
  return value.require(config, snapshot, expectedScope);
}

function immutableFacadeEvidenceCopy(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return Object.freeze(value.map(immutableFacadeEvidenceCopy));
  if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
    throw new Error("finalized external facade evidence contains a non-canonical mutable object");
  }
  return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, entry]) => [
    key,
    immutableFacadeEvidenceCopy(entry),
  ])));
}

function deepFreezeContractInput(value, label, seen = new WeakSet()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  if (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
    throw new Error(`${label} contains non-canonical mutable state`);
  }
  seen.add(value);
  for (const entry of Array.isArray(value) ? value : Object.values(value)) deepFreezeContractInput(entry, label, seen);
  return Object.freeze(value);
}
