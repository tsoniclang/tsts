export function verifyOptimizationAcceptance(evidence, acceptance) {
  const pointer = requireRecord(
    evidence["pointer"],
    "TypeScript optimization pointer evidence",
  );
  verifyDenominator(
    pointer["optimizedPointerKeyMapCount"],
    acceptance.pointerKeyMapCount,
    "pointer-key map",
  );
  verifyDenominator(
    pointer["optimizedStaticPropertyLocationCount"],
    acceptance.staticPropertyLocationCount,
    "static property-location",
  );
  verifyDenominator(
    pointer["staticPropertyLocationClassCount"],
    acceptance.staticPropertyLocationClassCount,
    "static property-location class",
  );
}

function verifyDenominator(actual, accepted, subject) {
  if (actual !== accepted) {
    throw new Error(
      `TypeScript ${subject} denominator ${String(actual)} differs from accepted ${String(accepted)}`,
    );
  }
}

function requireRecord(value, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}
