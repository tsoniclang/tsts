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
  const representations = requireRecord(
    evidence["representationProjections"],
    "TypeScript optimization representation evidence",
  );
  const fields = requireRecord(
    representations["directLogicalFields"],
    "TypeScript optimization direct logical-field evidence",
  );
  const actualFields = fields["optimizedCount"];
  if (actualFields !== acceptance.directLogicalFieldCount) {
    throw new Error(
      `TypeScript direct logical-field denominator ${String(actualFields)} differs from accepted ${acceptance.directLogicalFieldCount}`,
    );
  }
}

function requireRecord(value, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}
