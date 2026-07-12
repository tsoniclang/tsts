import { compareText } from "../deterministic-order.mjs";
import { materializeSemanticMethodSet } from "../semantic-method-sets.mjs";
import { requiresDependencyDeclarationForProfile } from "../dependency-type-ownership.mjs";

export function collectReachableDependencyTypeProfiles(
  config,
  semanticIndex,
  directUsages,
  methodSetSignatures,
  localStorageTypeProfileKeys,
) {
  const reached = new Set();
  const pending = [];
  const queued = new Set();
  for (const usage of directUsages) {
    requireDependencySemanticUsage(semanticIndex, usage.objectId, usage.arity, usage.profiles, "declaration root");
    for (const profile of usage.profiles) enqueue(usage.objectId, profile, "declaration root");
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
    for (const dependency of dependencyDeclarationDependencies(
      declaration,
      semanticIndex,
      localStorageTypeProfileKeys,
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
  return reached;

  function enqueue(objectId, profile, reason) {
    const key = `${profile}\0${objectId}`;
    if (queued.has(key)) return;
    queued.add(key);
    pending.push({ key, objectId, profile, reason });
  }
}

export function dependencyDeclarationDependencies(
  declaration,
  semanticIndex,
  activeLocalTypeProfileKeys,
  modulePath,
  methodSetSignatures,
  profile,
  surface = "complete",
  options = {},
) {
  if (!new Set(["authored-surface", "complete", "generated-surface"]).has(surface)) {
    throw new Error(`unknown dependency declaration surface '${surface}'`);
  }
  const dependencies = new Map();
  if (surface === "complete") visitCompleteDeclaration();
  else if (surface === "generated-surface") visitGeneratedSurface();
  else visitAuthoredSurface();
  return [...dependencies.values()].sort((left, right) => compareText(left.objectId, right.objectId));

  function visitCompleteDeclaration() {
    visitType(declaration.object?.type);
    visitType(declaration.rhs);
    for (const parameter of declaration.typeParameters ?? []) visitType(parameter.constraint);
    for (const method of declaration.methods ?? []) visitSignature(method.signature);
    for (const mode of ["value", "pointer"]) {
      for (const method of materializeSemanticMethodSet(declaration, mode, methodSetSignatures)) visitSignature(method.signature);
    }
  }

  function visitGeneratedSurface() {
    for (const parameter of declaration.typeParameters ?? []) visitType(parameter.constraint);
    if (declaration.rhs.kind === "struct") {
      for (const field of declaration.rhs.struct?.fields ?? []) if (field.variable?.exported) visitType(field.variable.type);
    } else if (declaration.rhs.kind === "interface") {
      for (const method of declaration.rhs.interface?.explicitMethods ?? []) if (method.exported) visitSignature(method.signature);
      for (const embedded of declaration.rhs.interface?.embeddedTypes ?? []) visitType(embedded);
    } else {
      visitType(declaration.rhs);
    }
    for (const mode of ["value", "pointer"]) {
      for (const method of materializeSemanticMethodSet(declaration, mode, methodSetSignatures)) {
        if (method.exported) visitSignature(method.signature);
      }
    }
  }

  function visitAuthoredSurface() {
    const contract = options.contractSurface;
    if (contract === null || typeof contract !== "object" || contract.authoredSurface?.objectId !== declaration.object.id) {
      throw new Error(`dependency type '${declaration.object.id}' has no exact authored declaration surface`);
    }
    for (const parameter of contract.typeParameters) visitType(parameter.constraint);
    if (contract.fullRhs) visitType(declaration.rhs);
    for (const field of contract.fields) visitType(field.variable.type);
    for (const embedded of contract.heritage) visitType(embedded);
    for (const method of contract.methods) visitSignature(method.signature);
    for (const method of contract.pointerMethods) if (method.exported) visitSignature(method.signature);
    for (const { method } of contract.methodBindings) visitSignature(method.signature);
  }

  function visitSignature(signature) {
    if (signature === undefined) return;
    visitType(signature.receiver?.type);
    for (const parameter of [...(signature.receiverTypeParameters ?? []), ...(signature.typeParameters ?? [])]) visitType(parameter.constraint);
    for (const variable of signature.parameters?.variables ?? []) visitType(variable.type);
    for (const variable of signature.results?.variables ?? []) visitType(variable.type);
  }

  function visitType(type) {
    if (type === undefined) return;
    const unsafePointer = unsafePointerReference(type);
    if (unsafePointer !== undefined && semanticIndex.has(unsafePointer.objectId)) {
      record(unsafePointer);
      return;
    }
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

export function unsafePointerReference(type) {
  if (type?.kind !== "basic" || type.basic?.name !== "Pointer" || type.basic?.untyped !== false || type.nilable !== true) return undefined;
  return { objectId: "unsafe::type::Pointer", packagePath: "unsafe", name: "Pointer", typeArgs: [] };
}

export function requireExactDependencyTypeClosure(semanticIndex, reachedProfileKeys) {
  for (const entry of semanticIndex.values()) {
    for (const profile of entry.byProfile.keys()) {
      const key = `${profile}\0${entry.objectId}`;
      if (!reachedProfileKeys.has(key)) {
        throw new Error(`snapshot dependency type '${entry.objectId}' in semantic profile '${profile}' is not recursively reachable from an active Go declaration`);
      }
    }
  }
}

export function requireDependencySemanticUsage(semanticIndex, objectId, arity, profiles, source) {
  const semantic = semanticIndex.get(objectId);
  if (semantic === undefined) throw new Error(`${source} references dependency type '${objectId}' without extracted go/types declaration evidence`);
  if (semantic.arity !== arity) throw new Error(`${source} references dependency type '${objectId}' with ${arity} type argument(s), expected ${semantic.arity}`);
  for (const profile of profiles) {
    if (!semantic.byProfile.has(profile)) throw new Error(`${source} references dependency type '${objectId}' outside semantic profile '${profile}'`);
  }
}

export function requireDependencyReference(reference, label) {
  if (!isPlainObject(reference) || typeof reference.objectId !== "string" || typeof reference.packagePath !== "string"
    || typeof reference.name !== "string" || !Array.isArray(reference.typeArgs)) {
    throw new Error(`${label} has an incomplete dependency go/types reference`);
  }
  const owner = reference.packagePath === "" ? "builtin" : reference.packagePath;
  if (reference.objectId !== `${owner}::type::${reference.name}`) throw new Error(`${label} has an inconsistent dependency go/types object identity`);
}

export function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
