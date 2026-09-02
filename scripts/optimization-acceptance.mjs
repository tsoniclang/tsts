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
  const sourcePrimitives = requireRecord(
    evidence["sourcePrimitives"],
    "TypeScript source-primitive evidence",
  );
  exactJoin(
    sourcePrimitives["typeReferenceCount"],
    acceptance.sourcePrimitiveTypeReferenceCount,
    "source-primitive type-reference",
  );
  exactJoin(
    sourcePrimitives["removableImportBindingCount"],
    acceptance.sourcePrimitiveImportBindingCount,
    "source-primitive import-binding",
  );
}

function exactJoin(actual, accepted, subject) {
  if (actual !== accepted) {
    throw new Error(
      `TypeScript ${subject} denominator ${String(actual)} differs from accepted ${accepted}`,
    );
  }
}

function requireRecord(value, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}
