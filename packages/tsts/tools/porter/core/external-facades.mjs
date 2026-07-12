import { compareText } from "./deterministic-order.mjs";
import { safeIdentifier } from "./names.mjs";
import { isActivePortPolicy, policyForUnit } from "./policies.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { normalizeExternalMethodBindings } from "./external-facade-method-bindings.mjs";
import { normalizeRuntimeAdaptation } from "./external-facade-runtime-adaptation.mjs";
import { buildTypeStorageIdentityMap } from "./type-storage-policies.mjs";
import { buildSemanticMethodSetSignatureIndex, materializeSemanticMethodSet } from "./semantic-method-sets.mjs";
import {
  buildActiveLocalTypeProfileKeys,
  isExternalPackage,
  isModulePackage,
  requiresDependencyDeclarationForProfile,
} from "./dependency-type-ownership.mjs";

const policyKeys = new Set([
  "methodBindings", "objectId", "runtimeAdaptation", "storageStrategy", "tsModule", "tsName",
]);
const storageStrategies = new Set(["authored", "generated"]);

export function buildExternalFacadeMap(config, snapshot) {
  const semanticIndex = buildDependencySemanticTypeIndex(snapshot);
  const methodSetSignatures = buildSemanticMethodSetSignatureIndex(snapshot);
  const activeLocalTypeProfileKeys = buildActiveLocalTypeProfileKeys(config, snapshot);
  const profile = loadProfile(config);
  const profileStorage = buildTypeStorageIdentityMap(config, snapshot);
  for (const [objectId, storageIdentity] of profileStorage) {
    const semantic = semanticIndex.get(objectId);
    if (semantic !== undefined && semantic.variants.length !== 1) {
      throw new Error(`dependency Go type '${objectId}' has profile-dependent go/types declarations but one storage contract '${storageIdentity}'`);
    }
  }
  const authoredModules = authoredFacadeModuleSet(config);
  const policies = normalizedExternalFacadePolicies(config, semanticIndex, profileStorage, authoredModules);
  const resolvePolicy = (objectId) => resolveExternalFacadePolicy(
    config,
    profile,
    semanticIndex.get(objectId),
    policies,
    authoredModules,
  );
  const directUsages = collectDependencyTypeUsages(config, snapshot, semanticIndex, activeLocalTypeProfileKeys, methodSetSignatures);
  const { selectedObjectIds, reachedProfileKeys } = selectExternalFacadeObjectIds(
    config,
    semanticIndex,
    resolvePolicy,
    profileStorage,
    directUsages,
    methodSetSignatures,
    activeLocalTypeProfileKeys,
  );
  requireExactDependencyTypeClosure(semanticIndex, reachedProfileKeys);
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

export function buildExternalFacadeStorageCatalog(config, snapshot) {
  return buildExternalFacadeMap(config, snapshot);
}

function materializeExternalFacade(config, semantic, policy) {
  return {
    ...semantic,
    tsModule: policy.tsModule,
    tsName: policy.tsName,
    storageStrategy: policy.storageStrategy,
    runtimeAdaptation: policy.runtimeAdaptation,
    methodBindings: policy.methodBindings,
    storageIdentity: `${config.tsRoot.replace(/\/+$/, "")}/${policy.tsModule}::${policy.tsName}`,
  };
}

export function buildDependencySemanticTypeIndex(snapshot) {
  if (!Array.isArray(snapshot?.semantic?.dependencyTypeDeclarations)) {
    throw new Error("Porter snapshot has no exact dependency go/types declaration index");
  }
  const index = new Map();
  for (const [declarationIndex, report] of snapshot.semantic.dependencyTypeDeclarations.entries()) {
    const label = `snapshot.semantic.dependencyTypeDeclarations[${declarationIndex}]`;
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

export function collectDependencyTypeUsages(
  config,
  snapshot,
  semanticIndex = buildDependencySemanticTypeIndex(snapshot),
  activeLocalTypeProfileKeys = buildActiveLocalTypeProfileKeys(config, snapshot),
  methodSetSignatures = buildSemanticMethodSetSignatureIndex(snapshot),
) {
  const usages = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (!isActivePortPolicy(policyForUnit(config, unit, file))) continue;
      for (const declaration of unit.semantic ?? []) visitDeclaration(declaration);
    }
  }
  return [...usages.values()].sort((left, right) => compareText(left.objectId, right.objectId));

  function visitDeclaration(declaration) {
    const profiles = requireProfileSet(declaration.profiles, "active Go semantic declaration");
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

function selectExternalFacadeObjectIds(
  config,
  semanticIndex,
  resolvePolicy,
  profileStorage,
  directUsages,
  methodSetSignatures,
  activeLocalTypeProfileKeys,
) {
  const selected = new Set();
  const reached = new Set();
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
    reached.add(current.key);
    const moduleLocalDependency = isModulePackage(semantic.packagePath, config.goModulePath);
    if (moduleLocalDependency && !profileStorage.has(current.objectId)) {
      throw new Error(`excluded module-local dependency type '${current.objectId}' in semantic profile '${current.profile}' requires an explicit go-type-storage relation; reached from ${current.reason}`);
    }
    if (!moduleLocalDependency && !profileStorage.has(current.objectId)) {
      const policy = resolvePolicy(current.objectId);
      if (policy === undefined) {
        throw new Error(`external Go dependency '${current.objectId}' in semantic profile '${current.profile}' requires an exact TS module/name/storage policy; reached from ${current.reason}`);
      }
      selected.add(current.objectId);
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
  return { selectedObjectIds: selected, reachedProfileKeys: reached };

  function enqueue(objectId, profile, reason) {
    const key = `${profile}\0${objectId}`;
    if (queued.has(key)) return;
    queued.add(key);
    pending.push({ key, objectId, profile, reason });
  }
}

function dependencyDeclarationDependencies(
  declaration,
  semanticIndex,
  activeLocalTypeProfileKeys,
  modulePath,
  methodSetSignatures,
  profile,
) {
  const dependencies = new Map();
  visitType(declaration.object?.type);
  visitType(declaration.rhs);
  for (const parameter of declaration.typeParameters ?? []) visitType(parameter.constraint);
  for (const method of declaration.methods ?? []) visitSignature(method.signature);
  for (const mode of ["value", "pointer"]) {
    for (const method of materializeSemanticMethodSet(declaration, mode, methodSetSignatures)) visitSignature(method.signature);
  }
  return [...dependencies.values()].sort((left, right) => compareText(left.objectId, right.objectId));

  function visitSignature(signature) {
    if (signature === undefined) return;
    visitType(signature.receiver?.type);
    for (const parameter of [...(signature.receiverTypeParameters ?? []), ...(signature.typeParameters ?? [])]) visitType(parameter.constraint);
    for (const variable of signature.parameters?.variables ?? []) visitType(variable.type);
    for (const variable of signature.results?.variables ?? []) visitType(variable.type);
  }

  function visitType(type) {
    if (type === undefined) return;
    if (type.kind === "named" || type.kind === "alias") {
      if (!isPlainObject(type.reference) || !Array.isArray(type.reference.typeArgs)) {
        throw new Error("dependency declaration has an incomplete named/alias reference");
      }
      if (requiresDependencyDeclarationForProfile(type.reference, profile, semanticIndex, activeLocalTypeProfileKeys, modulePath)) {
        requireDependencyReference(type.reference, "dependency declaration");
        record(type.reference);
      }
      for (const argument of type.reference.typeArgs) visitType(argument);
      return;
    }
    visitType(type.element);
    visitType(type.key);
    visitSignature(type.signature);
    for (const variable of type.tuple?.variables ?? []) visitType(variable.type);
    for (const field of type.struct?.fields ?? []) visitType(field.variable?.type);
    for (const method of [...(type.interface?.explicitMethods ?? []), ...(type.interface?.completeMethods ?? [])]) visitSignature(method.signature);
    for (const embedded of type.interface?.embeddedTypes ?? []) visitType(embedded);
    for (const term of type.union?.terms ?? []) visitType(term.type);
  }

  function record(reference) {
    if (reference.objectId === declaration.object.id) return;
    const arity = reference.typeArgs.length;
    const previous = dependencies.get(reference.objectId);
    if (previous !== undefined && previous.arity !== arity) {
      throw new Error(`dependency declaration '${reference.objectId}' has conflicting exact arities`);
    }
    dependencies.set(reference.objectId, { objectId: reference.objectId, arity });
  }
}

function requireExactDependencyTypeClosure(semanticIndex, reachedProfileKeys) {
  for (const entry of semanticIndex.values()) {
    for (const profile of entry.byProfile.keys()) {
      const key = `${profile}\0${entry.objectId}`;
      if (!reachedProfileKeys.has(key)) {
        throw new Error(`snapshot dependency type '${entry.objectId}' in semantic profile '${profile}' is not recursively reachable from an active Go declaration`);
      }
    }
  }
}

function requireDependencySemanticUsage(semanticIndex, objectId, arity, profiles, source) {
  const semantic = semanticIndex.get(objectId);
  if (semantic === undefined) throw new Error(`${source} references dependency type '${objectId}' without extracted go/types declaration evidence`);
  if (semantic.arity !== arity) throw new Error(`${source} references dependency type '${objectId}' with ${arity} type argument(s), expected ${semantic.arity}`);
  for (const profile of profiles) {
    if (!semantic.byProfile.has(profile)) throw new Error(`${source} references dependency type '${objectId}' outside semantic profile '${profile}'`);
  }
}

function requireProfileSet(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
    throw new Error(`${label} has no exact semantic profile set`);
  }
  return new Set(value);
}

export function externalFacadeModulePath(config, profile, importPath) {
  if (typeof importPath !== "string" || importPath === "") throw new Error("external Go package path must be non-empty");
  const sourceRoot = config.tsRoot.replace(/\/+$/, "");
  const placeholder = "{importPath}";
  const placeholderIndex = profile.facadeTemplate.indexOf(placeholder);
  if (placeholderIndex < 0 || placeholderIndex !== profile.facadeTemplate.lastIndexOf(placeholder)) {
    throw new Error("signatureCheck.facadeTemplate must contain exactly one {importPath} placeholder");
  }
  const repoPath = `${profile.facadeTemplate.slice(0, placeholderIndex)}${importPath}${profile.facadeTemplate.slice(placeholderIndex + placeholder.length)}`;
  const prefix = `${sourceRoot}/`;
  if (!repoPath.startsWith(prefix)) {
    throw new Error(`signatureCheck.facadeTemplate must place external facades below tsRoot '${sourceRoot}'`);
  }
  const relative = repoPath.slice(prefix.length);
  requireExactTsModule(relative, "signatureCheck.facadeTemplate result");
  return relative;
}

function normalizedExternalFacadePolicies(config, semanticIndex, profileStorage, authoredModules) {
  const policies = new Map();
  const configured = config.externalFacadePolicies ?? [];
  if (!Array.isArray(configured)) throw new Error("config.externalFacadePolicies must be an array");
  for (const [index, policy] of configured.entries()) {
    const label = `externalFacadePolicies[${index}]`;
    requirePlainObject(policy, label);
    const unknown = Object.keys(policy).filter((key) => !policyKeys.has(key));
    if (unknown.length > 0) {
      throw new Error(`${label} contains forbidden hand-authored Go semantic field(s): ${unknown.sort().join(", ")}`);
    }
    const objectId = policy.objectId;
    requireExternalTypeObjectId(objectId, `${label}.objectId`);
    const semantic = semanticIndex.get(objectId);
    if (semantic === undefined) throw new Error(`${label}.objectId '${objectId}' has no extracted go/types declaration`);
    if (!isExternalPackage(semantic.packagePath, config.goModulePath)) {
      throw new Error(`${label}.objectId '${objectId}' is module-local; excluded local dependency types require go-type-storage relations`);
    }
    if (profileStorage.has(objectId)) {
      throw new Error(`external Go type '${objectId}' has both facade policy storage and profile named-type storage`);
    }
    for (const key of ["tsModule", "tsName"]) {
      if (typeof policy[key] !== "string" || policy[key] === "") throw new Error(`${label}.${key} must be non-empty`);
    }
    requireExactTsModule(policy.tsModule, `${label}.tsModule`);
    if (safeIdentifier(policy.tsName) !== policy.tsName) {
      throw new Error(`${label}.tsName '${policy.tsName}' is not one exact TypeScript declaration identifier`);
    }
    if (!storageStrategies.has(policy.storageStrategy)) {
      throw new Error(`${label}.storageStrategy must be 'authored' or 'generated'`);
    }
    if (policies.has(objectId)) throw new Error(`${label}.objectId duplicates external facade policy '${objectId}'`);
    const runtimeAdaptation = normalizeRuntimeAdaptation(policy.runtimeAdaptation, semantic, objectId);
    const methodBindings = normalizeExternalMethodBindings(policy.methodBindings, semantic, label);
    const normalized = {
      ...policy,
      runtimeAdaptation,
      methodBindings,
    };
    validateExternalFacadePolicy(normalized, semantic, authoredModules, label);
    policies.set(objectId, normalized);
  }
  return policies;
}

function resolveExternalFacadePolicy(config, profile, semantic, policies, authoredModules) {
  if (semantic === undefined) return undefined;
  const explicit = policies.get(semantic.objectId);
  if (explicit !== undefined) return explicit;
  const tsModule = externalFacadeModulePath(config, profile, semantic.packagePath);
  if (authoredModules.has(tsModule)) {
    const authored = {
      objectId: semantic.objectId,
      tsModule,
      tsName: semantic.name,
      storageStrategy: "authored",
      runtimeAdaptation: undefined,
      methodBindings: [],
    };
    validateExternalFacadePolicy(authored, semantic, authoredModules, `automatic authored external facade '${semantic.objectId}'`);
    policies.set(semantic.objectId, authored);
    return authored;
  }
  if (safeIdentifier(semantic.name) !== semantic.name) {
    throw new Error(`external Go type '${semantic.objectId}' needs an explicit storage policy because its name is not an exact TypeScript declaration identifier`);
  }
  const generated = {
    objectId: semantic.objectId,
    tsModule,
    tsName: semantic.name,
    storageStrategy: "generated",
    runtimeAdaptation: undefined,
    methodBindings: [],
  };
  validateExternalFacadePolicy(generated, semantic, authoredModules, `automatic external facade '${semantic.objectId}'`);
  policies.set(semantic.objectId, generated);
  return generated;
}

function validateExternalFacadePolicy(policy, semantic, authoredModules, label) {
  const authored = authoredModules.has(policy.tsModule);
  if (policy.storageStrategy === "authored" && !authored) {
    throw new Error(`${label} declares authored storage outside config.authoredFacadeModules`);
  }
  if (policy.storageStrategy === "generated" && authored) {
    throw new Error(`${label} declares generated storage for authored module '${policy.tsModule}'`);
  }
  const representation = policy.runtimeAdaptation?.representation;
  if (policy.methodBindings.length > 0 && policy.storageStrategy !== "authored") {
    throw new Error(`${label}.methodBindings require authored storage`);
  }
  if (policy.methodBindings.length > 0 && representation !== "scalar") {
    throw new Error(`${label}.methodBindings are permitted only when reviewed scalar storage cannot carry Go instance methods`);
  }
  if (policy.storageStrategy === "generated" && policy.runtimeAdaptation !== undefined) {
    throw new Error(`${label} generated declaration storage cannot define runtime adaptation; runtime representation belongs to authored storage`);
  }
  if (policy.storageStrategy === "authored" && representation !== undefined && policy.runtimeAdaptation?.tsDeclarationHash === undefined) {
    throw new Error(`${label} authored runtime representation requires one exact tsDeclarationHash`);
  }
  if (policy.storageStrategy === "generated" && policy.runtimeAdaptation?.tsDeclarationHash !== undefined) {
    throw new Error(`${label} generated runtime representation cannot carry an authored tsDeclarationHash`);
  }
}

function externalStorageOwners(config, policies, profileStorage) {
  const owners = new Map();
  for (const [objectId, identity] of profileStorage) setStorageOwner(identity, objectId);
  for (const policy of policies.values()) {
    setStorageOwner(`${config.tsRoot.replace(/\/+$/, "")}/${policy.tsModule}::${policy.tsName}`, policy.objectId);
  }
  return owners;

  function setStorageOwner(identity, objectId) {
    const previous = owners.get(identity);
    if (previous !== undefined && previous !== objectId) {
      throw new Error(`external Go types '${previous}' and '${objectId}' map to the same TypeScript storage '${identity}'`);
    }
    owners.set(identity, objectId);
  }
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
  const expectedObjectKind = report.type.alias ? "alias" : "named";
  const objectReference = report.object.type?.reference;
  if (report.object.type?.kind !== expectedObjectKind || objectReference?.objectId !== expectedId
    || objectReference?.packagePath !== report.packagePath || objectReference?.name !== report.object.name
    || !Array.isArray(objectReference?.typeArgs) || objectReference.typeArgs.length !== 0) {
    throw new Error(`${label}.object.type does not identify its exact uninstantiated Go ${expectedObjectKind} object`);
  }
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

export function authoredFacadeModuleSet(config) {
  const entries = config.authoredFacadeModules ?? [];
  if (!Array.isArray(entries)) throw new Error("config.authoredFacadeModules must be an array");
  const modules = new Set();
  for (const [index, entry] of entries.entries()) {
    if (typeof entry !== "string") throw new Error(`config.authoredFacadeModules[${index}] must be a string`);
    requireExactTsModule(entry, `config.authoredFacadeModules[${index}]`);
    if (modules.has(entry)) throw new Error(`config.authoredFacadeModules duplicates '${entry}'`);
    modules.add(entry);
  }
  return modules;
}

function requireExternalTypeObjectId(value, label) {
  if (typeof value !== "string" || !/^[^:\s]+::type::[^:\s]+$/.test(value)) {
    throw new Error(`${label} must be one exact external Go type object identity`);
  }
}

function requireExactTsModule(value, label) {
  if (value.startsWith("/") || value.includes("\\") || value.split("/").some((segment) => segment === "" || segment === "." || segment === "..") || !value.endsWith(".ts")) {
    throw new Error(`${label} must be one normalized relative TypeScript module path ending in .ts`);
  }
}

function requireDependencyReference(reference, label) {
  if (!isPlainObject(reference) || typeof reference.objectId !== "string" || typeof reference.packagePath !== "string"
    || typeof reference.name !== "string" || !Array.isArray(reference.typeArgs)) {
    throw new Error(`${label} has an incomplete dependency go/types reference`);
  }
  const owner = reference.packagePath === "" ? "builtin" : reference.packagePath;
  if (reference.objectId !== `${owner}::type::${reference.name}`) throw new Error(`${label} has an inconsistent dependency go/types object identity`);
}

function requirePlainObject(value, label) {
  if (!isPlainObject(value) || Reflect.ownKeys(value).some((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor);
  })) throw new Error(`${label} must be a plain enumerable own-data-property object`);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
