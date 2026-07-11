import { compareText } from "./deterministic-order.mjs";
import { safeIdentifier } from "./names.mjs";
import { isActivePortPolicy, policyForUnit } from "./policies.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";

const policyKeys = new Set([
  "objectId", "runtimeAdaptation", "storageStrategy", "tsModule", "tsName",
]);
const storageStrategies = new Set(["authored", "generated"]);

export function buildExternalFacadeMap(config, snapshot) {
  const semanticIndex = buildExternalSemanticTypeIndex(snapshot);
  const profile = loadProfile(config);
  const profileStorage = externalProfileStorage(profile);
  const policies = normalizedExternalFacadePolicies(config, semanticIndex, profileStorage, profile);
  for (const objectId of policies.keys()) {
    if (profileStorage.has(objectId)) {
      throw new Error(`external Go type '${objectId}' has both facade policy storage and profile named-type storage`);
    }
  }
  const directUsages = collectExternalTypeUsages(config, snapshot);
  const selectedObjectIds = selectExternalFacadeObjectIds(
    config,
    semanticIndex,
    policies,
    profileStorage,
    directUsages,
  );
  const facades = new Map();
  const storageOwners = new Map();
  for (const objectId of [...selectedObjectIds].sort(compareText)) {
    const semantic = semanticIndex.get(objectId);
    const policy = policies.get(objectId);
    if (semantic === undefined || policy === undefined) throw new Error(`external facade '${objectId}' has no exact semantic/policy join`);
    const { tsModule, tsName, storageStrategy } = policy;
    const runtimeRepresentation = policy.runtimeAdaptation?.representation;
    const authored = authoredFacadeModuleSet(config).has(tsModule);
    if (storageStrategy === "authored" && !authored) {
      throw new Error(`external facade '${semantic.objectId}' declares authored storage outside config.authoredFacadeModules`);
    }
    if (storageStrategy === "generated" && authored) {
      throw new Error(`external facade '${semantic.objectId}' declares generated storage for authored module '${tsModule}'`);
    }
    if (storageStrategy === "generated" && runtimeRepresentation !== undefined && runtimeRepresentation !== "class") {
      throw new Error(`generated external facade '${semantic.objectId}' supports only class runtime adaptation; '${runtimeRepresentation}' storage must be authored`);
    }
    if (storageStrategy === "authored" && semantic.variants.length !== 1) {
      throw new Error(`authored external facade '${semantic.objectId}' has profile-dependent go/types declarations but only one TypeScript storage policy`);
    }
    const facade = {
      ...semantic,
      tsModule,
      tsName,
      storageStrategy,
      runtimeAdaptation: policy.runtimeAdaptation,
      storageIdentity: `${config.tsRoot.replace(/\/+$/, "")}/${tsModule}::${tsName}`,
    };
    const storageOwner = storageOwners.get(facade.storageIdentity);
    if (storageOwner !== undefined && storageOwner !== facade.objectId) {
      throw new Error(`external Go types '${storageOwner}' and '${facade.objectId}' map to the same TypeScript storage '${facade.storageIdentity}'`);
    }
    storageOwners.set(facade.storageIdentity, facade.objectId);
    const previous = facades.get(facade.objectId);
    if (previous !== undefined) throw new Error(`duplicate external facade Go object identity '${facade.objectId}'`);
    facades.set(facade.objectId, facade);
  }
  return facades;
}

export function buildExternalSemanticTypeIndex(snapshot) {
  if (!Array.isArray(snapshot?.semantic?.externalDeclarations)) {
    throw new Error("Porter snapshot has no exact external go/types declaration index");
  }
  const index = new Map();
  for (const [declarationIndex, report] of snapshot.semantic.externalDeclarations.entries()) {
    const label = `snapshot.semantic.externalDeclarations[${declarationIndex}]`;
    const declaration = requireExternalTypeDeclaration(report, label);
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
      if (entry.byProfile.has(profile)) throw new Error(`${label} duplicates external Go type '${objectId}' in semantic profile '${profile}'`);
      entry.byProfile.set(profile, declaration);
    }
    entry.variants.push({ declaration, profiles: [...report.profiles] });
    index.set(objectId, entry);
  }
  for (const entry of index.values()) {
    entry.variants.sort((left, right) => compareText(canonicalSchemaValue(left.declaration), canonicalSchemaValue(right.declaration)));
    entry.arity = invariantExternalProperty(entry, "type-parameter arity", (declaration) => declaration.typeParameters.length);
    entry.intrinsicNilable = invariantExternalProperty(entry, "intrinsic nilability", (declaration) => declaration.object.type.nilable);
    entry.declarationKind = invariantExternalProperty(entry, "declaration kind", externalDeclarationKind);
  }
  return new Map([...index.entries()].sort(([left], [right]) => compareText(left, right)));
}

export function collectExternalTypeUsages(config, snapshot) {
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
      if (isExternalPackage(reference.packagePath, config.goModulePath)) record(reference, profiles);
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
    requireExternalReference(reference, "active Go semantic declaration");
    const arity = reference.typeArgs.length;
    const existing = usages.get(reference.objectId);
    if (existing !== undefined) {
      if (existing.arity !== arity) throw new Error(`external Go type '${reference.objectId}' is instantiated with conflicting arities`);
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

function selectExternalFacadeObjectIds(config, semanticIndex, policies, profileStorage, directUsages) {
  const selected = new Set();
  const pending = [];
  const queued = new Set();
  const expanded = new Set();

  for (const usage of directUsages) {
    requireExternalSemanticUsage(semanticIndex, usage.objectId, usage.arity, usage.profiles, "active Go declaration");
    for (const profile of usage.profiles) enqueue(usage.objectId, profile, "active Go declaration");
  }
  while (pending.length > 0) {
    pending.sort((left, right) => compareText(left.key, right.key));
    const current = pending.shift();
    const semantic = semanticIndex.get(current.objectId);
    const declaration = semantic?.byProfile.get(current.profile);
    if (declaration === undefined) {
      throw new Error(`external Go type '${current.objectId}' has no declaration in semantic profile '${current.profile}' required by ${current.reason}`);
    }
    if (profileStorage.has(current.objectId)) continue;
    const policy = policies.get(current.objectId);
    if (policy === undefined) {
      throw new Error(`external Go dependency '${current.objectId}' in semantic profile '${current.profile}' requires an exact TS module/name/storage policy; reached from ${current.reason}`);
    }
    selected.add(current.objectId);
    if (policy.storageStrategy === "authored" || expanded.has(current.key)) continue;
    expanded.add(current.key);
    for (const dependency of externalDeclarationDependencies(declaration, config.goModulePath)) {
      requireExternalSemanticUsage(
        semanticIndex,
        dependency.objectId,
        dependency.arity,
        new Set([current.profile]),
        `generated external facade '${current.objectId}'`,
      );
      enqueue(dependency.objectId, current.profile, `generated external facade '${current.objectId}'`);
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

function externalDeclarationDependencies(declaration, modulePath) {
  const dependencies = new Map();
  visitType(declaration.object?.type);
  visitType(declaration.rhs);
  for (const parameter of declaration.typeParameters ?? []) visitType(parameter.constraint);
  for (const method of declaration.methods ?? []) visitSignature(method.signature);
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
        throw new Error("external declaration dependency has an incomplete named/alias reference");
      }
      if (isExternalPackage(type.reference.packagePath, modulePath)) {
        requireExternalReference(type.reference, "external declaration dependency");
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
      throw new Error(`external declaration dependency '${reference.objectId}' has conflicting exact arities`);
    }
    dependencies.set(reference.objectId, { objectId: reference.objectId, arity });
  }
}

function requireExternalSemanticUsage(semanticIndex, objectId, arity, profiles, source) {
  const semantic = semanticIndex.get(objectId);
  if (semantic === undefined) throw new Error(`${source} references external type '${objectId}' without extracted go/types declaration evidence`);
  if (semantic.arity !== arity) throw new Error(`${source} references external type '${objectId}' with ${arity} type argument(s), expected ${semantic.arity}`);
  for (const profile of profiles) {
    if (!semantic.byProfile.has(profile)) throw new Error(`${source} references external type '${objectId}' outside semantic profile '${profile}'`);
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
  const repoPath = profile.facadeTemplate.replaceAll("{importPath}", importPath);
  const prefix = `${sourceRoot}/`;
  if (!repoPath.startsWith(prefix)) {
    throw new Error(`signatureCheck.facadeTemplate must place external facades below tsRoot '${sourceRoot}'`);
  }
  const relative = repoPath.slice(prefix.length);
  requireExactTsModule(relative, "signatureCheck.facadeTemplate result");
  return relative;
}

function normalizedExternalFacadePolicies(config, semanticIndex, profileStorage, profile) {
  const policies = new Map();
  for (const [index, policy] of (config.externalFacadePolicies ?? []).entries()) {
    const label = `externalFacadePolicies[${index}]`;
    requirePlainObject(policy, label);
    const unknown = Object.keys(policy).filter((key) => !policyKeys.has(key));
    if (unknown.length > 0) {
      throw new Error(`${label} contains forbidden hand-authored Go semantic field(s): ${unknown.sort().join(", ")}`);
    }
    const objectId = policy.objectId;
    requireExternalTypeObjectId(objectId, `${label}.objectId`);
    if (!semanticIndex.has(objectId)) throw new Error(`${label}.objectId '${objectId}' has no extracted go/types declaration`);
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
    const runtimeAdaptation = normalizeRuntimeAdaptation(policy.runtimeAdaptation, objectId);
    policies.set(objectId, {
      ...policy,
      runtimeAdaptation,
    });
  }
  const authoredModules = authoredFacadeModuleSet(config);
  for (const semantic of semanticIndex.values()) {
    if (policies.has(semantic.objectId) || profileStorage.has(semantic.objectId)) continue;
    const tsModule = externalFacadeModulePath(config, profile, semantic.packagePath);
    if (authoredModules.has(tsModule)) continue;
    if (safeIdentifier(semantic.name) !== semantic.name) {
      throw new Error(`external Go type '${semantic.objectId}' needs an explicit storage policy because its name is not an exact TypeScript declaration identifier`);
    }
    policies.set(semantic.objectId, {
      objectId: semantic.objectId,
      tsModule,
      tsName: semantic.name,
      storageStrategy: "generated",
      runtimeAdaptation: undefined,
    });
  }
  return policies;
}

function requireExternalTypeDeclaration(report, label) {
  if (!isPlainObject(report) || report.kind !== "type" || !isPlainObject(report.type) || !isPlainObject(report.object)) {
    throw new Error(`${label} must be one canonical external Go type declaration`);
  }
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

function invariantExternalProperty(entry, label, select) {
  let value;
  for (const declaration of entry.byProfile.values()) {
    const next = select(declaration);
    if (value === undefined) value = next;
    else if (canonicalSchemaValue(value) !== canonicalSchemaValue(next)) {
      throw new Error(`external Go type '${entry.objectId}' changes ${label} across active semantic profiles`);
    }
  }
  if (value === undefined) throw new Error(`external Go type '${entry.objectId}' has no active semantic profile`);
  return value;
}

function externalDeclarationKind(declaration) {
  if (declaration.rhs.kind === "interface") return "interface";
  if (declaration.rhs.kind === "struct") return "struct";
  return "type";
}

function normalizeRuntimeAdaptation(value, objectId) {
  if (value === undefined) return undefined;
  requirePlainObject(value, `external facade '${objectId}' runtimeAdaptation`);
  const allowed = new Set(["pointer", "representation"]);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`external facade '${objectId}' runtimeAdaptation contains unknown key(s): ${unknown.sort().join(", ")}`);
  if (value.representation !== undefined && !new Set(["class", "scalar", "structural"]).has(value.representation)) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation.representation must be 'class', 'scalar', or 'structural'`);
  }
  if (value.pointer !== undefined && value.pointer !== "aggregate" && value.pointer !== "slot") {
    throw new Error(`external facade '${objectId}' runtimeAdaptation.pointer must be 'aggregate' or 'slot'`);
  }
  if (value.representation === "scalar" && value.pointer === "aggregate") {
    throw new Error(`external facade '${objectId}' scalar runtime storage cannot use aggregate pointer storage`);
  }
  if (value.representation === "class" && value.pointer === "slot") {
    throw new Error(`external facade '${objectId}' class runtime storage cannot use replaceable-slot pointer storage`);
  }
  if (value.representation === undefined && value.pointer === undefined) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation must define representation or pointer storage`);
  }
  return { ...(value.representation === undefined ? {} : { representation: value.representation }), ...(value.pointer === undefined ? {} : { pointer: value.pointer }) };
}

function authoredFacadeModuleSet(config) {
  return new Set((config.authoredFacadeModules ?? []).map((path) => String(path).replace(/^\/+/, "")));
}

function externalProfileStorage(profile) {
  const storage = new Map();
  for (const [label, mappings] of [
    ["signatureCheck.stdlibTypes", profile.stdlibTypes],
    ["signatureCheck.namedTypeMappings", profile.namedTypeMappings],
  ]) {
    for (const [objectId, identity] of Object.entries(mappings ?? {})) {
      const previous = storage.get(objectId);
      if (previous !== undefined && previous !== identity) {
        throw new Error(`${label}.${objectId} conflicts with external profile storage '${previous}'`);
      }
      storage.set(objectId, identity);
    }
  }
  return storage;
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

function requireExternalReference(reference, label) {
  if (!isPlainObject(reference) || typeof reference.objectId !== "string" || typeof reference.packagePath !== "string"
    || typeof reference.name !== "string" || !Array.isArray(reference.typeArgs)) {
    throw new Error(`${label} has an incomplete external go/types reference`);
  }
  if (reference.objectId !== `${reference.packagePath}::type::${reference.name}`) throw new Error(`${label} has an inconsistent external go/types object identity`);
}

function isExternalPackage(packagePath, modulePath) {
  return packagePath !== "" && packagePath !== modulePath && !packagePath.startsWith(`${modulePath}/`);
}

function requirePlainObject(value, label) {
  if (!isPlainObject(value)) throw new Error(`${label} must be a plain object`);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
