export function validateProfileIndexes(value, label, issues, profileCount) {
  if (!Array.isArray(value) || value.length === 0) {
    issues.push(`${label} must be a non-empty array of profile indexes`);
    return;
  }
  for (const [index, profileIndex] of value.entries()) {
    if (!Number.isSafeInteger(profileIndex) || profileIndex < 0) issues.push(`${label}[${index}] must be a non-negative safe integer`);
    else if (profileIndex >= profileCount) issues.push(`${label}[${index}] profile index ${profileIndex} is out of bounds for ${profileCount} profiles`);
    if (index > 0 && value[index - 1] >= profileIndex) issues.push(`${label} must be numerically sorted with no duplicates`);
  }
}

export function typeParameterIdentity(reference) {
  return `${reference?.ownerId ?? ""}\u0000${reference?.role ?? ""}\u0000${reference?.index ?? ""}\u0000${reference?.name ?? ""}`;
}

export function profileDescription(index, labels) {
  const key = Array.isArray(labels) && Number.isSafeInteger(index) ? labels[index] : undefined;
  return key === undefined ? `profile index ${index}` : `profile index ${index} ('${key}')`;
}

export function declarationObjectId(semantic, kind, unit) {
  if (kind === "func") {
    return unit?.name === "init" ? `${unit.id}::object` : objectId(semantic?.packagePath, "func", unit?.name);
  }
  const receiverId = receiverTypeReference(semantic?.signature?.receiver?.type)?.objectId;
  return receiverId === undefined
    ? objectId(semantic?.packagePath, "method", unit?.name)
    : `${receiverId}::method::${unit?.name}`;
}

export function receiverTypeReference(type) {
  let current = type;
  while (current?.kind === "pointer") current = current.element;
  return current?.kind === "named" || current?.kind === "alias" ? current.reference : undefined;
}

export function objectId(packagePath, kind, name) {
  return `${packagePath === "" ? "builtin" : packagePath}::${kind}::${name}`;
}

export function isGoExported(name) {
  return /^\p{Lu}/u.test(name);
}

export function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
