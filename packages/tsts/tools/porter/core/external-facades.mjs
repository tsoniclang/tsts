import { compareText } from "./deterministic-order.mjs";
import { isActivePortPolicy, policyForUnit } from "./policies.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";
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
import { exactSemanticTypeDeclarationIdentity } from "./semantic-type-declaration-identity.mjs";
import {
  collectReachableDependencyTypeProfiles,
  dependencyDeclarationDependencies,
  isPlainObject,
  requireDependencyReference,
  requireDependencySemanticUsage,
  requireExactDependencyTypeClosure,
  unsafePointerReference,
} from "./external-facades/dependency-closure.mjs";
import { buildAuthoredContractSurface } from "./authored-contract-surface.mjs";
import {
  createFinalizedExternalFacadeStorageCatalog,
  immutableFacadeEvidenceCopy,
} from "./external-facades/catalog.mjs";

export { authoredFacadeModuleSet, externalFacadeModulePath } from "./external-facade-policies.mjs";

const externalFacadeStoragePlanState = Symbol("externalFacadeStoragePlanState");

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
  return Object.freeze({ [externalFacadeStoragePlanState]: { artifactContext, auditContext, authoredRoots } });
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
  return createFinalizedExternalFacadeStorageCatalog(
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
    ? buildDependencySemanticTypeIndex(snapshot, { includeExternalPackageSurface: true })
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

export function buildDependencySemanticTypeIndex(snapshot, options = {}) {
  requireExactOptionKeys(options, new Set(["includeExternalPackageSurface"]), "dependency semantic type index");
  if (!Array.isArray(snapshot?.semantic?.dependencyTypeDeclarations)) {
    throw new Error("Porter snapshot has no exact dependency go/types declaration index");
  }
  const rows = snapshot.semantic.dependencyTypeDeclarations.map((report, index) => ({
    label: `snapshot.semantic.dependencyTypeDeclarations[${index}]`, report,
  }));
  if (options.includeExternalPackageSurface === true) {
    for (const [index, report] of externalPackageTypeEvidence(snapshot).entries()) {
      rows.push({ label: `snapshot.semantic.externalPackageSurface type declaration[${index}]`, report });
    }
  } else if (options.includeExternalPackageSurface !== undefined && options.includeExternalPackageSurface !== false) {
    throw new Error("dependency semantic type index includeExternalPackageSurface must be boolean when provided");
  }
  const index = new Map();
  for (const { label, report } of rows) {
    const declaration = requireDependencyTypeDeclaration(report, label);
    const objectId = declaration.object.id;
    const entry = index.get(objectId) ?? {
      objectId,
      packagePath: declaration.object.packagePath,
      name: declaration.object.name,
      goDisplayName: `${declaration.object.packagePath}.${declaration.object.name}`,
      byProfile: new Map(),
      variants: [],
    };
    if (entry.packagePath !== declaration.object.packagePath || entry.name !== declaration.object.name) {
      throw new Error(`${label} changes exact external Go object identity '${objectId}'`);
    }
    for (const profile of report.profiles) {
      if (entry.byProfile.has(profile)) throw new Error(`${label} duplicates dependency Go type '${objectId}' in semantic profile '${profile}'`);
      entry.byProfile.set(profile, declaration);
    }
    entry.variants.push({ declaration, profiles: [...report.profiles] });
    index.set(objectId, entry);
  }
  for (const entry of index.values()) {
    entry.variants.sort((left, right) => compareText(canonicalSchemaValue(left.declaration), canonicalSchemaValue(right.declaration)));
    entry.arity = invariantDependencyProperty(entry, "type-parameter arity", (declaration) => declaration.typeParameters.length);
  }
  return new Map([...index.entries()].sort(([left], [right]) => compareText(left, right)));
}

function externalPackageTypeEvidence(snapshot) {
  const surface = snapshot.semantic?.externalPackageSurface;
  return [
    ...(Array.isArray(surface?.declarations) ? surface.declarations : []),
    ...(Array.isArray(surface?.dependencyTypeDeclarations) ? surface.dependencyTypeDeclarations : []),
  ].filter((declaration) => declaration?.kind === "type");
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

function requireDependencyTypeDeclaration(report, label) {
  if (!isPlainObject(report) || report.kind !== "type" || !isPlainObject(report.type) || !isPlainObject(report.object)) {
    throw new Error(`${label} must be one canonical dependency Go type declaration`);
  }
  if (Object.hasOwn(report, "externalRole")) throw new Error(`${label}.externalRole is obsolete; dependency declarations are exact reachable types only`);
  if (!Array.isArray(report.profiles) || report.profiles.length === 0 || report.profiles.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
    throw new Error(`${label}.profiles must identify one or more exact semantic profiles`);
  }
  if (!isPlainObject(report.object.type) || typeof report.object.type.nilable !== "boolean") throw new Error(`${label}.object.type has no intrinsic nilability evidence`);
  if (typeof report.object.id !== "string" || typeof report.object.packagePath !== "string" || typeof report.object.name !== "string") {
    throw new Error(`${label}.object has incomplete exact Go identity`);
  }
  const expectedId = `${report.object.packagePath}::type::${report.object.name}`;
  if (report.object.id !== expectedId || report.packagePath !== report.object.packagePath) throw new Error(`${label} has inconsistent exact Go object identity`);
  if (report.type.alias !== true && report.type.alias !== false) throw new Error(`${label}.type has no exact alias flag`);
  if (canonicalSchemaValue(report.type.object) !== canonicalSchemaValue(report.object)) throw new Error(`${label}.type.object does not equal its exact declaration object`);
  exactSemanticTypeDeclarationIdentity(report.type, `${label}.type`);
  if (!Array.isArray(report.type.typeParameters) || !isPlainObject(report.type.rhs) || typeof report.type.rhs.nilable !== "boolean") {
    throw new Error(`${label}.type lacks exact type parameters, RHS, or intrinsic nilability`);
  }
  if (report.type.rhs.nilable !== report.object.type.nilable) throw new Error(`${label}.type RHS and object disagree on intrinsic nilability`);
  if (report.type.methods !== undefined && !Array.isArray(report.type.methods)) throw new Error(`${label}.type.methods must be an exact array when present`);
  return { ...report.type, methods: report.type.methods ?? [] };
}

function invariantDependencyProperty(entry, label, select) {
  let value;
  for (const declaration of entry.byProfile.values()) {
    const next = select(declaration);
    if (value === undefined) value = next;
    else if (canonicalSchemaValue(value) !== canonicalSchemaValue(next)) {
      throw new Error(`dependency Go type '${entry.objectId}' changes ${label} across active semantic profiles`);
    }
  }
  if (value === undefined) throw new Error(`dependency Go type '${entry.objectId}' has no active semantic profile`);
  return value;
}


function requireExternalFacadeStoragePlan(value) {
  const state = value?.[externalFacadeStoragePlanState];
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
