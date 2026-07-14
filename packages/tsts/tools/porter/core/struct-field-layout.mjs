export function canonicalStructFieldLayout(fields, label = "canonical Go struct fields") {
  if (!Array.isArray(fields)) throw new Error(`${label} must be an array`);
  const allocatedNames = new Set();
  for (const [index, field] of fields.entries()) {
    requireField(field, index, label);
    if (field.embedded || field.name === "_") continue;
    if (allocatedNames.has(field.name)) throw new Error(`${label} contains duplicate named field '${field.name}'`);
    allocatedNames.add(field.name);
  }
  let embeddedIndex = 0;
  let blankIndex = 0;
  return fields.map((field, index) => {
    const blank = field.name === "_";
    const name = field.embedded
      ? allocateSyntheticName("__tsgoEmbedded", allocatedNames, () => embeddedIndex++)
      : blank ? allocateSyntheticName("__tsgoBlank", allocatedNames, () => blankIndex++) : field.name;
    return Object.freeze({ blank, field, index, name });
  });
}

function requireField(field, index, label) {
  if (field === null || typeof field !== "object" || Array.isArray(field)) throw new Error(`${label}[${index}] must be an object`);
  if (typeof field.name !== "string" || field.name === "") throw new Error(`${label}[${index}] has no exact name`);
  if (field.embedded !== true && field.embedded !== false) throw new Error(`${label}[${index}] has no exact embedded flag`);
}

function allocateSyntheticName(prefix, allocatedNames, nextIndex) {
  while (true) {
    const candidate = `${prefix}${nextIndex()}`;
    if (allocatedNames.has(candidate)) continue;
    allocatedNames.add(candidate);
    return candidate;
  }
}
