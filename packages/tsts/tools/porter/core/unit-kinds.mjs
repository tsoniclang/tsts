export const PORTER_UNIT_KINDS = Object.freeze([
  "constGroup",
  "func",
  "importGroup",
  "method",
  "type",
  "typeGroup",
  "varGroup",
]);

export const SEMANTIC_PRIMARY_UNIT_KINDS = Object.freeze([
  "constGroup",
  "func",
  "method",
  "type",
  "varGroup",
]);

const porterUnitKindSet = new Set(PORTER_UNIT_KINDS);
const semanticPrimaryUnitKindSet = new Set(SEMANTIC_PRIMARY_UNIT_KINDS);

export function isPorterUnitKind(kind) {
  return porterUnitKindSet.has(kind);
}

export function isSemanticPrimaryUnitKind(kind) {
  return semanticPrimaryUnitKindSet.has(kind);
}
