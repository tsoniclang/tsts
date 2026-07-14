const relationKinds = new Set(["ambient-reference", "go-type-storage", "go-value-ops", "typescript-type-equivalence"]);

export function semanticRelationsOfKind(config, kind) {
  if (!relationKinds.has(kind)) throw new Error(`unsupported reviewed semantic relation kind '${kind}'`);
  const relations = config.semanticRelations ?? [];
  if (!Array.isArray(relations)) throw new Error("config.semanticRelations must be an array");
  for (const [index, relation] of relations.entries()) {
    if (relation === null || typeof relation !== "object" || Array.isArray(relation)) {
      throw new Error(`semanticRelations[${index}] must be an object`);
    }
    if (!relationKinds.has(relation.kind)) {
      throw new Error(`semanticRelations[${index}].kind '${relation.kind ?? "<missing>"}' is not a current reviewed relation kind`);
    }
  }
  return relations.filter((relation) => relation.kind === kind);
}
