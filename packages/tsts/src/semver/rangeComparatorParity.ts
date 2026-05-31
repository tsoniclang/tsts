/**
 * SemVer comparator normalization parity.
 *
 * TS-Go's semver range parser treats comparator normalization as its own
 * policy: wildcard ranges become half-open bounds, prerelease lower bounds get
 * a `-0`, and wildcard major `<`/`>` maps to `<0.0.0-0`.
 */

import { Version, versionZero } from "./version.js";

export type NormalizedComparatorOperator = "<" | "<=" | "=" | ">=" | ">";

export interface NormalizedComparator {
  readonly operator: NormalizedComparatorOperator;
  readonly operand: Version;
}

export interface PartialComparatorInput {
  readonly operator: "" | "~" | "^" | NormalizedComparatorOperator;
  readonly version: Version;
  readonly major: string;
  readonly minor: string;
  readonly patch: string;
}

export function normalizeComparator(input: PartialComparatorInput): readonly NormalizedComparator[] {
  if (isWildcard(input.major)) {
    return input.operator === "<" || input.operator === ">" ? [{ operator: "<", operand: versionZero }] : [];
  }
  switch (input.operator) {
    case "~":
      return [
        { operator: ">=", operand: input.version },
        { operator: "<", operand: isWildcard(input.minor) ? input.version.incrementMajor() : input.version.incrementMinor() },
      ];
    case "^":
      return [
        { operator: ">=", operand: input.version },
        { operator: "<", operand: caretUpperBound(input) },
      ];
    case "<":
    case ">=":
      return [{ operator: input.operator, operand: wildcardLowerOperand(input) }];
    case "<=":
    case ">":
      return [{ operator: normalizeWildcardUpperOperator(input.operator, input), operand: wildcardUpperOperand(input) }];
    case "=":
    case "":
      return equalityComparators(input);
  }
}

function equalityComparators(input: PartialComparatorInput): readonly NormalizedComparator[] {
  if (!isWildcard(input.minor) && !isWildcard(input.patch)) return [{ operator: "=", operand: input.version }];
  return [
    { operator: ">=", operand: withPrerelease(input.version, ["0"]) },
    { operator: "<", operand: withPrerelease(isWildcard(input.minor) ? input.version.incrementMajor() : input.version.incrementMinor(), ["0"]) },
  ];
}

function caretUpperBound(input: PartialComparatorInput): Version {
  if (input.version.major > 0 || isWildcard(input.minor)) return input.version.incrementMajor();
  if (input.version.minor > 0 || isWildcard(input.patch)) return input.version.incrementMinor();
  return input.version.incrementPatch();
}

function wildcardLowerOperand(input: PartialComparatorInput): Version {
  return isWildcard(input.minor) || isWildcard(input.patch) ? withPrerelease(input.version, ["0"]) : input.version;
}

function wildcardUpperOperand(input: PartialComparatorInput): Version {
  if (isWildcard(input.minor)) return withPrerelease(input.version.incrementMajor(), ["0"]);
  if (isWildcard(input.patch)) return withPrerelease(input.version.incrementMinor(), ["0"]);
  return input.version;
}

function normalizeWildcardUpperOperator(operator: "<=" | ">", input: PartialComparatorInput): NormalizedComparatorOperator {
  return isWildcard(input.minor) || isWildcard(input.patch) ? (operator === "<=" ? "<" : ">=") : operator;
}

function withPrerelease(version: Version, prerelease: readonly string[]): Version {
  return new Version(version.major, version.minor, version.patch, prerelease, version.build);
}

function isWildcard(text: string): boolean {
  return text === "*" || text === "x" || text === "X";
}
