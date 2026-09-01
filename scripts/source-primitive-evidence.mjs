export function verifySourcePrimitiveEvidence(value) {
  if (!isRecord(value)) {
    throw new Error("TypeScript source-primitive evidence must be an object");
  }
  const allowed = new Set([
    "typeReferenceCount",
    "removableImportBindingCount",
  ]);
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    throw new Error(
      `TypeScript source-primitive evidence has unsupported field '${unexpected}'`,
    );
  }
  for (const name of allowed) {
    const count = value[name];
    if (!Number.isSafeInteger(count) || count < 0) {
      throw new Error(
        `TypeScript source-primitive evidence '${name}' must be a nonnegative safe integer`,
      );
    }
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
