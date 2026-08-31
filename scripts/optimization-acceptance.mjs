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
  const dominatingNilChecks = requireRecord(
    pointer["dominatingNilChecks"],
    "TypeScript dominating nil-check evidence",
  );
  const eliminatedGuardCount = dominatingNilChecks["eliminatedGuardCount"];
  if (
    eliminatedGuardCount !== acceptance.dominatingNilCheckEliminationCount
  ) {
    throw new Error(
      `TypeScript dominating nil-check elimination denominator ${String(eliminatedGuardCount)} differs from accepted ${acceptance.dominatingNilCheckEliminationCount}`,
    );
  }
}

function requireRecord(value, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}
