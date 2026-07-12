import { validateSnapshotObject } from "./snapshot-validation.mjs";
import { isObject, typeParameterIdentity } from "./semantic-snapshot-validation-identity.mjs";
import { hashText } from "./runtime.mjs";
import { canonicalSemanticSignature } from "./semantic-variants.mjs";

export function validateSemanticMethodSetSignaturePool(value, label, issues, callbacks, signatureScopes) {
  if (!Array.isArray(value)) {
    issues.push(`${label} must be an array`);
    return new Set();
  }
  const ids = new Set();
  let previousId = "";
  for (const [index, entry] of value.entries()) {
    const itemLabel = `${label}[${index}]`;
    const keys = new Set(["id", "methodId", "signature"]);
    validateSnapshotObject(entry, keys, itemLabel, issues, keys);
    if (!isObject(entry)) continue;
    if (typeof entry.id !== "string" || entry.id === "") issues.push(`${itemLabel}.id must be non-empty`);
    if (typeof entry.methodId !== "string" || entry.methodId === "") issues.push(`${itemLabel}.methodId must be non-empty`);
    const expectedId = typeof entry.methodId === "string"
      ? `${entry.methodId}::methodSetSignature::${hashText(canonicalSemanticSignature(entry.signature))}`
      : "<invalid>";
    if (entry.id !== expectedId) issues.push(`${itemLabel}.id must hash the exact selected signature for '${entry.methodId}'`);
    if (previousId !== "" && previousId >= entry.id) issues.push(`${label} must be sorted by exact signature identity with no duplicates`);
    previousId = typeof entry.id === "string" ? entry.id : previousId;
    if (ids.has(entry.id)) issues.push(`${itemLabel}.id duplicates '${entry.id}'`);
    ids.add(entry.id);
    callbacks.validateSignature(entry.signature, `${itemLabel}.signature`, issues, {
      ownerId: entry.methodId,
      ownerPath: `${entry.methodId}::methodSetSignature`,
      outerScope: signatureScopes.get(entry.id) ?? new Map(),
    });
    if (entry.signature?.receiver !== undefined || entry.signature?.receiverMode !== undefined) {
      issues.push(`${itemLabel}.signature must be receiver-free selected method evidence`);
    }
  }
  return ids;
}

export function buildSemanticTypeParameterScopes(snapshot, issues) {
  const scopes = new Map();
  const register = (declaration, label) => {
    if (declaration?.kind !== "type") return;
    const ownerId = declaration.object?.id;
    if (typeof ownerId !== "string" || ownerId === "") return;
    const next = new Map();
    for (const parameter of declaration.type?.typeParameters ?? []) {
      const identity = typeParameterIdentity(parameter?.reference);
      if (identity !== "") next.set(identity, parameter.reference);
    }
    const previous = scopes.get(ownerId);
    if (previous !== undefined && canonicalScope(previous) !== canonicalScope(next)) {
      issues.push(`${label} changes type-parameter identity scope for '${ownerId}' across semantic variants`);
      return;
    }
    scopes.set(ownerId, next);
  };
  for (const [index, declaration] of (snapshot.semantic?.dependencyTypeDeclarations ?? []).entries()) {
    register(declaration, `snapshot.semantic.dependencyTypeDeclarations[${index}]`);
  }
  for (const [fileIndex, file] of (snapshot.files ?? []).entries()) {
    for (const [unitIndex, unit] of (file.units ?? []).entries()) {
      for (const [variantIndex, declaration] of (unit.semantic ?? []).entries()) {
        register(declaration, `snapshot.files[${fileIndex}].units[${unitIndex}].semantic[${variantIndex}]`);
      }
    }
  }
  return scopes;
}

export function buildSemanticMethodSetSignatureScopes(snapshot, ownerScopes, issues) {
  const signatureScopes = new Map();
  const register = (declaration, label) => {
    if (declaration?.kind !== "type") return;
    const selectedOwnerId = declaration.object?.id;
    for (const setName of ["valueMethodSet", "pointerMethodSet"]) {
      for (const [index, selection] of (declaration.type?.[setName] ?? []).entries()) {
        if (typeof selection?.signatureId !== "string" || selection.signatureId === "") continue;
        const scope = signatureScopes.get(selection.signatureId) ?? new Map();
        mergeScope(scope, ownerScopes.get(selectedOwnerId), `${label}.type.${setName}[${index}] selected owner`, issues);
        mergeScope(scope, ownerScopes.get(selection.methodOwnerId), `${label}.type.${setName}[${index}] declaring owner`, issues);
        signatureScopes.set(selection.signatureId, scope);
      }
    }
  };
  for (const [index, declaration] of (snapshot.semantic?.dependencyTypeDeclarations ?? []).entries()) {
    register(declaration, `snapshot.semantic.dependencyTypeDeclarations[${index}]`);
  }
  for (const [fileIndex, file] of (snapshot.files ?? []).entries()) {
    for (const [unitIndex, unit] of (file.units ?? []).entries()) {
      for (const [variantIndex, declaration] of (unit.semantic ?? []).entries()) {
        register(declaration, `snapshot.files[${fileIndex}].units[${unitIndex}].semantic[${variantIndex}]`);
      }
    }
  }
  return signatureScopes;
}

function canonicalScope(scope) {
  return JSON.stringify([...scope.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function mergeScope(target, source, label, issues) {
  for (const [identity, reference] of source ?? []) {
    const previous = target.get(identity);
    if (previous !== undefined && JSON.stringify(previous) !== JSON.stringify(reference)) {
      issues.push(`${label} changes exact type-parameter evidence for '${identity}'`);
      continue;
    }
    target.set(identity, reference);
  }
}

export function validateSemanticMethodSet(value, label, issues, scope, selectedOwnerId, receiverMode, callbacks) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    issues.push(`${label} must be an array when present`);
    return;
  }
  let previousKey = "";
  for (const [index, selection] of value.entries()) {
    const itemLabel = `${label}[${index}]`;
    const keys = new Set(["exported", "index", "indirect", "key", "methodId", "methodOwnerId", "name", "packagePath", "promoted", "signatureId"]);
    validateSnapshotObject(selection, keys, itemLabel, issues, keys);
    if (!isObject(selection)) continue;
    if (typeof selection.key !== "string" || selection.key === "") issues.push(`${itemLabel}.key must be non-empty`);
    if (typeof selection.name !== "string" || selection.name === "") issues.push(`${itemLabel}.name must be non-empty`);
    if (typeof selection.packagePath !== "string") issues.push(`${itemLabel}.packagePath must be a string`);
    if (typeof selection.exported !== "boolean") issues.push(`${itemLabel}.exported must be boolean`);
    if (selection.methodId !== `${selection.methodOwnerId}::method::${selection.name}`) {
      issues.push(`${itemLabel}.methodId must identify the exact declaring method owner and name`);
    }
    if (typeof selection.methodOwnerId !== "string" || selection.methodOwnerId === "") issues.push(`${itemLabel}.methodOwnerId must be non-empty`);
    if (typeof selection.signatureId !== "string" || selection.signatureId === "") issues.push(`${itemLabel}.signatureId must be non-empty`);
    const expectedKey = selection.exported === true
      ? selection.name
      : `${selection.packagePath}.${selection.name}`;
    if (selection.key !== expectedKey) issues.push(`${itemLabel}.key must equal the exact Go method-set key '${expectedKey}'`);
    if (previousKey !== "" && previousKey >= selection.key) issues.push(`${label} must be sorted by method-set key with no duplicates`);
    previousKey = typeof selection.key === "string" ? selection.key : previousKey;
    if (!Array.isArray(selection.index) || selection.index.length === 0 || selection.index.some((entry) => !Number.isSafeInteger(entry) || entry < 0)) {
      issues.push(`${itemLabel}.index must be one non-empty Go method-selection index path`);
    }
    if (typeof selection.indirect !== "boolean") issues.push(`${itemLabel}.indirect must be boolean`);
    if (typeof selection.promoted !== "boolean" || selection.promoted !== ((selection.index?.length ?? 0) > 1)) {
      issues.push(`${itemLabel}.promoted must equal whether the selection index path is promoted`);
    }
    void callbacks;
    void scope;
    void selectedOwnerId;
    void receiverMode;
  }
}

export function validateSemanticMethodSetSignatureUsage(snapshot, signatureIds, issues) {
  const used = new Set();
  const visitDeclaration = (declaration, label) => {
    for (const setName of ["valueMethodSet", "pointerMethodSet"]) {
      for (const [index, selection] of (Array.isArray(declaration?.type?.[setName]) ? declaration.type[setName] : []).entries()) {
        const signatureId = selection?.signatureId;
        if (!signatureIds.has(signatureId)) issues.push(`${label}.type.${setName}[${index}].signatureId has no exact method-set signature evidence`);
        else used.add(signatureId);
      }
    }
  };
  for (const [index, declaration] of (snapshot.semantic?.dependencyTypeDeclarations ?? []).entries()) {
    visitDeclaration(declaration, `snapshot.semantic.dependencyTypeDeclarations[${index}]`);
  }
  for (const [fileIndex, file] of (snapshot.files ?? []).entries()) {
    for (const [unitIndex, unit] of (file.units ?? []).entries()) {
      for (const [variantIndex, declaration] of (unit.semantic ?? []).entries()) {
        visitDeclaration(declaration, `snapshot.files[${fileIndex}].units[${unitIndex}].semantic[${variantIndex}]`);
      }
    }
  }
  for (const signatureId of signatureIds) {
    if (!used.has(signatureId)) issues.push(`snapshot.semantic.methodSetSignatures contains unused signature '${signatureId}'`);
  }
}
