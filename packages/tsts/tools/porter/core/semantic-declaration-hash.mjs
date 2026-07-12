import { compareText } from "./deterministic-order.mjs";
import { hashText } from "./runtime.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";

export function semanticDeclarationVariantsHash(semantic, label = "semantic declaration") {
  const variants = semantic?.variants ?? [];
  if (variants.length === 0) throw new Error(`${label} has no exact Go declaration variants to snapshot`);
  const rows = variants.map(({ declaration, profiles }) => ({
    declaration,
    profiles: exactProfiles(profiles, label),
  })).sort((left, right) => compareText(canonicalSchemaValue(left), canonicalSchemaValue(right)));
  return hashText(canonicalSchemaValue(rows));
}

function exactProfiles(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
    throw new Error(`${label} has no exact semantic profile set`);
  }
  const profiles = [...new Set(value)].sort((left, right) => left - right);
  if (profiles.length !== value.length) throw new Error(`${label} contains duplicate semantic profiles`);
  return profiles;
}
