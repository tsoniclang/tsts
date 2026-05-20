/**
 * SemVer 2.0 version-range parsing and matching.
 *
 * Port of TS-Go internal/semver/version_range.go.
 *
 * Implements npm's range grammar:
 *   https://github.com/npm/node-semver#range-grammar
 *
 *   range-set ::= range ( logical-or range ) *
 *   range     ::= hyphen | simple ( ' ' simple ) * | ''
 *   simple    ::= primitive | partial | tilde | caret
 *   primitive ::= ( '<' | '>' | '>=' | '<=' | '=' ) partial
 *   tilde     ::= '~' partial
 *   caret     ::= '^' partial
 *   hyphen    ::= partial ' - ' partial
 *   partial   ::= xr ( '.' xr ( '.' xr qualifier ? )? )?
 *   xr        ::= 'x' | 'X' | '*' | nr
 */

import { Version } from "./version.js";

const versionZero = new Version(0, 0, 0, ["0"]);

const LOGICAL_OR_REGEX = /\|\|/;
const WHITESPACE_REGEX = /\s+/;

const PARTIAL_REGEX =
  /^([x*0]|[1-9]\d*)(?:\.([x*0]|[1-9]\d*)(?:\.([x*0]|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$/i;

const HYPHEN_REGEX = /^\s*([a-z0-9-+.*]+)\s+-\s+([a-z0-9-+.*]+)\s*$/i;

const RANGE_REGEX = /^([~^<>=]|<=|>=)?\s*([a-z0-9-+.*]+)$/i;

type ComparatorOperator = "<" | "<=" | "=" | ">=" | ">";

interface VersionComparator {
  readonly operator: ComparatorOperator;
  readonly operand: Version;
}

export class VersionRange {
  private readonly alternatives: readonly (readonly VersionComparator[])[];

  constructor(alternatives: readonly (readonly VersionComparator[])[]) {
    this.alternatives = alternatives;
  }

  toString(): string {
    if (this.alternatives.length === 0) return "*";
    return this.alternatives.map(formatAlternative).join(" || ");
  }

  test(version: Version): boolean {
    // empty disjunction matches all
    if (this.alternatives.length === 0) return true;
    return this.alternatives.some((alt) => testAlternative(alt, version));
  }
}

function formatAlternative(comparators: readonly VersionComparator[]): string {
  return comparators.map(formatComparator).join(" ");
}

function formatComparator(c: VersionComparator): string {
  return c.operator + c.operand.toString();
}

function testAlternative(
  comparators: readonly VersionComparator[],
  version: Version
): boolean {
  return comparators.every((c) => testComparator(c, version));
}

function testComparator(c: VersionComparator, version: Version): boolean {
  const cmp = version.compare(c.operand);
  switch (c.operator) {
    case "<":
      return cmp < 0;
    case "<=":
      return cmp <= 0;
    case "=":
      return cmp === 0;
    case ">=":
      return cmp >= 0;
    case ">":
      return cmp > 0;
  }
}

/**
 * Parse a range expression. Returns `undefined` if the input is not a
 * well-formed range.
 */
export function tryParseVersionRange(text: string): VersionRange | undefined {
  const alternatives = parseAlternatives(text);
  if (alternatives === undefined) return undefined;
  return new VersionRange(alternatives);
}

function parseAlternatives(text: string): (readonly VersionComparator[])[] | undefined {
  const alternatives: (readonly VersionComparator[])[] = [];

  const ranges = text.trim().split(LOGICAL_OR_REGEX);
  for (const rawRange of ranges) {
    const r = rawRange.trim();
    if (r === "") continue;

    let comparators: VersionComparator[] = [];

    const hyphenMatch = HYPHEN_REGEX.exec(r);
    if (hyphenMatch !== null) {
      const parsed = parseHyphen(hyphenMatch[1]!, hyphenMatch[2]!);
      if (parsed === undefined) return undefined;
      comparators = parsed;
    } else {
      for (const simple of r.split(WHITESPACE_REGEX)) {
        const match = RANGE_REGEX.exec(simple.trim());
        if (match === null) return undefined;

        const op = match[1] ?? "";
        const partial = match[2]!;
        const parsed = parseComparator(op, partial);
        if (parsed === undefined) return undefined;
        comparators.push(...parsed);
      }
    }

    alternatives.push(comparators);
  }

  return alternatives;
}

interface PartialVersion {
  readonly version: Version;
  readonly majorStr: string;
  readonly minorStr: string;
  readonly patchStr: string;
}

function parsePartial(text: string): PartialVersion | undefined {
  const match = PARTIAL_REGEX.exec(text);
  if (match === null) return undefined;

  const majorStr = match[1]!;
  let minorStr = match[2] ?? "";
  let patchStr = match[3] ?? "";
  const prereleaseStr = match[4] ?? "";
  const buildStr = match[5] ?? "";

  if (minorStr === "") minorStr = "*";
  if (patchStr === "") patchStr = "*";

  let majorNum = 0;
  let minorNum = 0;
  let patchNum = 0;

  if (isWildcard(majorStr)) {
    // all stay 0
  } else {
    const m = parseUint(majorStr);
    if (m === undefined) return undefined;
    majorNum = m;

    if (!isWildcard(minorStr)) {
      const mn = parseUint(minorStr);
      if (mn === undefined) return undefined;
      minorNum = mn;

      if (!isWildcard(patchStr)) {
        const p = parseUint(patchStr);
        if (p === undefined) return undefined;
        patchNum = p;
      }
    }
  }

  const prerelease = prereleaseStr === "" ? [] : prereleaseStr.split(".");
  const build = buildStr === "" ? [] : buildStr.split(".");

  return {
    version: new Version(majorNum, minorNum, patchNum, prerelease, build),
    majorStr,
    minorStr,
    patchStr,
  };
}

function parseHyphen(left: string, right: string): VersionComparator[] | undefined {
  const l = parsePartial(left);
  if (l === undefined) return undefined;
  const r = parsePartial(right);
  if (r === undefined) return undefined;

  const result: VersionComparator[] = [];

  if (!isWildcard(l.majorStr)) {
    result.push({ operator: ">=", operand: l.version });
  }

  if (!isWildcard(r.majorStr)) {
    let operator: ComparatorOperator;
    let operand: Version;
    if (isWildcard(r.minorStr)) {
      operand = r.version.incrementMajor();
      operator = "<";
    } else if (isWildcard(r.patchStr)) {
      operand = r.version.incrementMinor();
      operator = "<";
    } else {
      operand = r.version;
      operator = "<=";
    }
    result.push({ operator, operand });
  }

  return result;
}

function parseComparator(op: string, text: string): VersionComparator[] | undefined {
  const r = parsePartial(text);
  if (r === undefined) return undefined;

  // For "" we treat as "="
  let operator = op as ComparatorOperator | "" | "~" | "^";

  if (!isWildcard(r.majorStr)) {
    switch (operator) {
      case "~": {
        const first: VersionComparator = { operator: ">=", operand: r.version };
        const secondVersion = isWildcard(r.minorStr)
          ? r.version.incrementMajor()
          : r.version.incrementMinor();
        const second: VersionComparator = { operator: "<", operand: secondVersion };
        return [first, second];
      }
      case "^": {
        const first: VersionComparator = { operator: ">=", operand: r.version };
        let secondVersion: Version;
        if (r.version.major > 0 || isWildcard(r.minorStr)) {
          secondVersion = r.version.incrementMajor();
        } else if (r.version.minor > 0 || isWildcard(r.patchStr)) {
          secondVersion = r.version.incrementMinor();
        } else {
          secondVersion = r.version.incrementPatch();
        }
        const second: VersionComparator = { operator: "<", operand: secondVersion };
        return [first, second];
      }
      case "<":
      case ">=": {
        let version = r.version;
        if (isWildcard(r.minorStr) || isWildcard(r.patchStr)) {
          version = withPrerelease(version, ["0"]);
        }
        return [{ operator, operand: version }];
      }
      case "<=":
      case ">": {
        let op2: ComparatorOperator = operator;
        let version = r.version;
        if (isWildcard(r.minorStr)) {
          op2 = op2 === "<=" ? "<" : ">=";
          version = withPrerelease(version.incrementMajor(), ["0"]);
        } else if (isWildcard(r.patchStr)) {
          op2 = op2 === "<=" ? "<" : ">=";
          version = withPrerelease(version.incrementMinor(), ["0"]);
        }
        return [{ operator: op2, operand: version }];
      }
      case "=":
      case "": {
        // normalize empty to =
        operator = "=";
        if (isWildcard(r.minorStr) || isWildcard(r.patchStr)) {
          const original = r.version;
          const firstVersion = withPrerelease(original, ["0"]);
          const secondVersion = withPrerelease(
            isWildcard(r.minorStr) ? original.incrementMajor() : original.incrementMinor(),
            ["0"]
          );
          return [
            { operator: ">=", operand: firstVersion },
            { operator: "<", operand: secondVersion },
          ];
        }
        return [{ operator, operand: r.version }];
      }
      default:
        throw new Error(`Unexpected operator: ${operator}`);
    }
  }

  // Wildcard major
  if (operator === "<" || operator === ">") {
    return [{ operator: "<", operand: versionZero }];
  }
  return [];
}

function withPrerelease(v: Version, prerelease: readonly string[]): Version {
  return new Version(v.major, v.minor, v.patch, prerelease, v.build);
}

function isWildcard(text: string): boolean {
  return text === "*" || text === "x" || text === "X";
}

function parseUint(text: string): number | undefined {
  if (!/^\d+$/.test(text)) return undefined;
  const n = Number(text);
  if (!Number.isInteger(n) || n < 0 || n > 0xffff_ffff) return undefined;
  return n;
}
