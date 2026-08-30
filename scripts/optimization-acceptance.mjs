export function verifyOptimizationAcceptance(evidence, acceptance) {
  const pointer = requireRecord(
    evidence["pointer"],
    "TypeScript optimization pointer evidence",
  );
  const actual = pointer["optimizedPointerKeyMapCount"];
  if (actual !== acceptance.pointerKeyMapCount) {
    throw new Error(
      `TypeScript pointer-key map denominator ${String(actual)} differs from accepted ${acceptance.pointerKeyMapCount}`,
    );
  }
}

function requireRecord(value, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}
