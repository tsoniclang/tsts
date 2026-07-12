import { activeSemanticTypeProfileKeys } from "./semantic-snapshot-validation-dependencies.mjs";

export function validateExternalPackageDependencyClosure(snapshot, issues) {
  const surface = snapshot?.semantic?.externalPackageSurface;
  if (surface === null || typeof surface !== "object" || Array.isArray(surface)) return;
  const selectedDeclarations = exactArray(surface.declarations);
  const surfaceDependencies = exactArray(surface.dependencyTypeDeclarations);
  const ordinaryDependencies = exactArray(snapshot.semantic?.dependencyTypeDeclarations);
  const available = activeSemanticTypeProfileKeys(snapshot.files);
  const arities = new Map();
  registerTypeDeclarations(ordinaryDependencies, "ordinary dependency");
  registerTypeDeclarations(selectedDeclarations, "selected external type");
  registerTypeDeclarations(surfaceDependencies, "external surface dependency");
  const surfaceByProfile = new Map();
  for (const declaration of surfaceDependencies) {
    const objectId = declaration?.object?.id;
    if (declaration?.kind !== "type" || typeof objectId !== "string") continue;
    for (const profile of exactProfiles(declaration.profiles)) {
      const key = profileKey(profile, objectId);
      if (surfaceByProfile.has(key)) continue;
      surfaceByProfile.set(key, declaration);
    }
  }
  const signatures = new Map(exactArray(snapshot.semantic?.methodSetSignatures)
    .filter((entry) => typeof entry?.id === "string")
    .map((entry) => [entry.id, entry.signature]));
  const reached = new Set();
  const expanded = new Set();
  const reported = new Set();
  for (const declaration of selectedDeclarations) {
    for (const profile of exactProfiles(declaration?.profiles)) visitDeclaration(declaration, profile, "selected external declaration");
  }
  for (const key of surfaceByProfile.keys()) {
    if (!reached.has(key)) reportOnce(`snapshot.semantic.externalPackageSurface.dependencyTypeDeclarations contains unreachable profile row '${printableKey(key)}'`);
  }

  function registerTypeDeclarations(declarations, label) {
    for (const declaration of declarations) {
      if (declaration?.kind !== "type" || typeof declaration.object?.id !== "string") continue;
      const arity = Array.isArray(declaration.type?.typeParameters) ? declaration.type.typeParameters.length : undefined;
      if (arity === undefined) continue;
      const previous = arities.get(declaration.object.id);
      if (previous !== undefined && previous !== arity) {
        reportOnce(`${label} '${declaration.object.id}' changes type-parameter arity from ${previous} to ${arity}`);
      } else {
        arities.set(declaration.object.id, arity);
      }
      for (const profile of exactProfiles(declaration.profiles)) available.add(profileKey(profile, declaration.object.id));
    }
  }

  function visitDeclaration(declaration, profile, source) {
    visitType(declaration?.object?.type, profile, source);
    visitSignature(declaration?.signature, profile, source);
    const type = declaration?.type;
    if (type !== undefined) {
      visitType(type.rhs, profile, source);
      for (const parameter of exactArray(type.typeParameters)) visitType(parameter?.constraint, profile, source);
      for (const method of exactArray(type.methods)) visitSignature(method?.signature, profile, source);
      for (const setName of ["valueMethodSet", "pointerMethodSet"]) {
        for (const selection of exactArray(type[setName])) {
          const signature = signatures.get(selection?.signatureId);
          if (signature !== undefined) visitSignature(signature, profile, source);
        }
      }
    }
    for (const specification of exactArray(declaration?.valueSpecs)) {
      for (const binding of exactArray(specification?.names)) visitType(binding?.type ?? binding?.object?.type, profile, source);
    }
  }

  function visitSignature(signature, profile, source) {
    if (signature === undefined) return;
    visitType(signature.receiver?.type, profile, source);
    for (const parameter of [...exactArray(signature.receiverTypeParameters), ...exactArray(signature.typeParameters)]) {
      visitType(parameter?.constraint, profile, source);
    }
    for (const variable of exactArray(signature.parameters?.variables)) visitType(variable?.type, profile, source);
    for (const variable of exactArray(signature.results?.variables)) visitType(variable?.type, profile, source);
  }

  function visitType(type, profile, source) {
    if (type === undefined || type === null || typeof type !== "object" || Array.isArray(type)) return;
    if (type.kind === "basic" && type.basic?.name === "Pointer" && type.basic?.untyped === false && type.nilable === true) {
      visitReference({ objectId: "unsafe::type::Pointer", packagePath: "unsafe", name: "Pointer", typeArgs: [] }, profile, source);
      return;
    }
    if (type.kind === "named" || type.kind === "alias") {
      visitReference(type.reference, profile, source);
      return;
    }
    visitType(type.element, profile, source);
    visitType(type.key, profile, source);
    visitSignature(type.signature, profile, source);
    for (const variable of exactArray(type.tuple?.variables)) visitType(variable?.type, profile, source);
    for (const field of exactArray(type.struct?.fields)) visitType(field?.variable?.type, profile, source);
    for (const method of [...exactArray(type.interface?.explicitMethods), ...exactArray(type.interface?.completeMethods)]) {
      visitSignature(method?.signature, profile, source);
    }
    for (const embedded of exactArray(type.interface?.embeddedTypes)) visitType(embedded, profile, source);
    for (const term of exactArray(type.union?.terms)) visitType(term?.type, profile, source);
  }

  function visitReference(reference, profile, source) {
    for (const argument of exactArray(reference?.typeArgs)) visitType(argument, profile, source);
    if (typeof reference?.objectId !== "string" || typeof reference.packagePath !== "string" || reference.packagePath === "") return;
    const expectedArity = arities.get(reference.objectId);
    if (expectedArity !== undefined && expectedArity !== exactArray(reference.typeArgs).length) {
      reportOnce(`${source} references '${reference.objectId}' with ${exactArray(reference.typeArgs).length} type argument(s), expected ${expectedArity}`);
    }
    const key = profileKey(profile, reference.objectId);
    const dependency = surfaceByProfile.get(key);
    if (dependency !== undefined) {
      reached.add(key);
      if (!expanded.has(key)) {
        expanded.add(key);
        visitDeclaration(dependency, profile, `external surface dependency '${reference.objectId}'`);
      }
      return;
    }
    if (!available.has(key)) reportOnce(`${source} references '${reference.objectId}' in semantic profile ${profile} without exact type declaration evidence`);
  }

  function reportOnce(message) {
    if (reported.has(message)) return;
    reported.add(message);
    issues.push(message);
  }
}

function exactArray(value) {
  return Array.isArray(value) ? value : [];
}

function exactProfiles(value) {
  return Array.isArray(value) ? value.filter((profile) => Number.isSafeInteger(profile) && profile >= 0) : [];
}

function profileKey(profile, objectId) {
  return `${profile}\0${objectId}`;
}

function printableKey(value) {
  return value.replaceAll("\0", " @ ");
}
