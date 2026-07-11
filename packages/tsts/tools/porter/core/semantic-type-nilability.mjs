const alwaysNilableKinds = new Set(["channel", "interface", "map", "pointer", "signature", "slice"]);
const neverNilableKinds = new Set(["array", "struct", "tuple", "union"]);

export const semanticTypeContexts = Object.freeze({
  value: "value",
  declarationShape: "declarationShape",
  heritage: "heritage",
  constraint: "constraint",
});

export function expectedDirectSemanticNilability(type) {
  if (alwaysNilableKinds.has(type?.kind)) return true;
  if (neverNilableKinds.has(type?.kind)) return false;
  if (type?.kind === "basic" && typeof type.basic?.name === "string") {
    return type.basic.name === "Pointer" || type.basic.name === "untyped nil";
  }
  return undefined;
}

export function semanticNilabilityIssue(type) {
  if (typeof type?.nilable !== "boolean") return "must be boolean";
  const expected = expectedDirectSemanticNilability(type);
  if (expected === undefined || type.nilable === expected) return undefined;
  return `must be ${expected} for direct Go ${type.kind} types`;
}

export function assertSemanticNilability(type, label = "canonical go/types descriptor") {
  const issue = semanticNilabilityIssue(type);
  if (issue !== undefined) throw new Error(`${label}.nilable ${issue}`);
}

export function assertSemanticTypeContext(value) {
  if (!Object.values(semanticTypeContexts).includes(value)) {
    throw new Error(`unknown canonical semantic type context '${value}'`);
  }
}
