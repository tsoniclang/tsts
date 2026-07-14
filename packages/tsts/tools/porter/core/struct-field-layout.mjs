export function canonicalStructFieldLayout(fields, label = "canonical Go struct fields") {
  if (!Array.isArray(fields)) throw new Error(`${label} must be an array`);
  let embeddedIndex = 0;
  let blankIndex = 0;
  return fields.map((field, index) => {
    if (field === null || typeof field !== "object" || Array.isArray(field)) throw new Error(`${label}[${index}] must be an object`);
    if (typeof field.name !== "string" || field.name === "") throw new Error(`${label}[${index}] has no exact name`);
    if (field.embedded !== true && field.embedded !== false) throw new Error(`${label}[${index}] has no exact embedded flag`);
    const blank = field.name === "_";
    const name = field.embedded ? `__tsgoEmbedded${embeddedIndex++}` : blank ? `__tsgoBlank${blankIndex++}` : field.name;
    return Object.freeze({ blank, field, index, name });
  });
}
