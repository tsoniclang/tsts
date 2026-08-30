export function verifyOptimizationAcceptance(evidence, acceptance) {
  const pointer = requireRecord(
    evidence["pointer"],
    "TypeScript optimization pointer evidence",
  );
  const fields = [
    ["optimizedPointerKeyMapCount", "pointerKeyMapCount", "total"],
    ["optimizedLocationPointerKeyMapCount", "locationPointerKeyMapCount", "location"],
    [
      "optimizedDirectObjectPointerKeyMapCount",
      "directObjectPointerKeyMapCount",
      "direct-object",
    ],
  ];
  for (const [evidenceName, acceptanceName, label] of fields) {
    const actual = pointer[evidenceName];
    const expected = acceptance[acceptanceName];
    if (actual !== expected) {
      throw new Error(
        `TypeScript ${label} pointer-key map denominator ${String(actual)} differs from accepted ${String(expected)}`,
      );
    }
  }
  if (
    pointer["optimizedLocationPointerKeyMapCount"] +
        pointer["optimizedDirectObjectPointerKeyMapCount"] !==
      pointer["optimizedPointerKeyMapCount"]
  ) {
    throw new Error(
      "TypeScript pointer-key map evidence partitions do not equal the total denominator",
    );
  }
}

function requireRecord(value, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}
