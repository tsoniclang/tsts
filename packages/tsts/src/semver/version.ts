/**
 * SemVer 2.0 version parsing and comparison.
 *
 * Port of TS-Go internal/semver/version.go.
 *
 * Spec: https://semver.org/
 *
 * Differs from strict semver only in allowing partial X and X.Y inputs
 * (missing parts default to 0), matching TS-Go's behavior.
 */

const VERSION_REGEX = /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$/i;

const PRERELEASE_REGEX = /^(?:0|[1-9]\d*|[a-z-][a-z0-9-]*)(?:\.(?:0|[1-9]\d*|[a-zA-Z-][a-zA-Z0-9-]*))*$/i;
const BUILD_REGEX = /^[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
const NUMERIC_IDENTIFIER_REGEX = /^(?:0|[1-9]\d*)$/;

const COMPARISON_LESS = -1;
const COMPARISON_EQUAL = 0;
const COMPARISON_GREATER = 1;

export class Version {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
  readonly prerelease: readonly string[];
  readonly build: readonly string[];

  constructor(
    major: number,
    minor = 0,
    patch = 0,
    prerelease: readonly string[] = [],
    build: readonly string[] = []
  ) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.prerelease = prerelease;
    this.build = build;
  }

  /**
   * Compare two versions per semver precedence.
   * https://semver.org/#spec-item-11
   *
   * Returns -1 if `this < other`, 0 if equal, 1 if `this > other`.
   * Build metadata does not figure into precedence.
   */
  compare(other: Version): -1 | 0 | 1 {
    const a = this;
    const b = other;
    if (a === b) return COMPARISON_EQUAL;
    if (a === null) return COMPARISON_LESS;
    if (b === null) return COMPARISON_GREATER;

    if (a.major !== b.major) return a.major < b.major ? COMPARISON_LESS : COMPARISON_GREATER;
    if (a.minor !== b.minor) return a.minor < b.minor ? COMPARISON_LESS : COMPARISON_GREATER;
    if (a.patch !== b.patch) return a.patch < b.patch ? COMPARISON_LESS : COMPARISON_GREATER;
    return comparePrereleaseIdentifiers(a.prerelease, b.prerelease);
  }

  equals(other: Version): boolean {
    return this.compare(other) === COMPARISON_EQUAL;
  }

  incrementMajor(): Version {
    return new Version(this.major + 1);
  }

  incrementMinor(): Version {
    return new Version(this.major, this.minor + 1);
  }

  incrementPatch(): Version {
    return new Version(this.major, this.minor, this.patch + 1);
  }

  toString(): string {
    let out = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length > 0) out += "-" + this.prerelease.join(".");
    if (this.build.length > 0) out += "+" + this.build.join(".");
    return out;
  }
}

export class SemverParseError extends Error {
  constructor(public readonly origInput: string) {
    super(`Could not parse version string from "${origInput}"`);
    this.name = "SemverParseError";
  }
}

/**
 * Parse a version string into a Version, throwing SemverParseError on
 * invalid input. Allows partial X or X.Y forms (missing fields default
 * to 0).
 */
export function tryParseVersion(text: string): Version {
  const match = VERSION_REGEX.exec(text);
  if (match === null) {
    throw new SemverParseError(text);
  }

  const major = getUintComponent(match[1]!, text);
  const minor = match[2] !== undefined ? getUintComponent(match[2], text) : 0;
  const patch = match[3] !== undefined ? getUintComponent(match[3], text) : 0;

  let prerelease: readonly string[] = [];
  if (match[4] !== undefined && match[4].length > 0) {
    if (!PRERELEASE_REGEX.test(match[4])) {
      throw new SemverParseError(text);
    }
    prerelease = match[4].split(".");
  }

  let build: readonly string[] = [];
  if (match[5] !== undefined && match[5].length > 0) {
    if (!BUILD_REGEX.test(match[5])) {
      throw new SemverParseError(text);
    }
    build = match[5].split(".");
  }

  return new Version(major, minor, patch, prerelease, build);
}

/**
 * Parse, throwing on failure. Equivalent to TS-Go's MustParse.
 */
export function mustParse(text: string): Version {
  return tryParseVersion(text);
}

function getUintComponent(text: string, original: string): number {
  const n = Number(text);
  if (!Number.isInteger(n) || n < 0 || n > 0xFFFF_FFFF) {
    throw new SemverParseError(original);
  }
  return n;
}

function comparePrereleaseIdentifiers(
  left: readonly string[],
  right: readonly string[]
): -1 | 0 | 1 {
  if (left.length === 0) return right.length === 0 ? COMPARISON_EQUAL : COMPARISON_GREATER;
  if (right.length === 0) return COMPARISON_LESS;

  const len = Math.min(left.length, right.length);
  for (let i = 0; i < len; i += 1) {
    const cmp = comparePrereleaseIdentifier(left[i]!, right[i]!);
    if (cmp !== COMPARISON_EQUAL) return cmp;
  }
  if (left.length < right.length) return COMPARISON_LESS;
  if (left.length > right.length) return COMPARISON_GREATER;
  return COMPARISON_EQUAL;
}

function comparePrereleaseIdentifier(left: string, right: string): -1 | 0 | 1 {
  if (left === right) return COMPARISON_EQUAL;

  const leftIsNumeric = NUMERIC_IDENTIFIER_REGEX.test(left);
  const rightIsNumeric = NUMERIC_IDENTIFIER_REGEX.test(right);

  if (leftIsNumeric || rightIsNumeric) {
    if (!rightIsNumeric) return COMPARISON_LESS;
    if (!leftIsNumeric) return COMPARISON_GREATER;

    const leftN = Number(left);
    const rightN = Number(right);
    if (!Number.isFinite(leftN) || !Number.isFinite(rightN)) {
      // Overflow: fall back to length, then string compare
      if (left.length < right.length) return COMPARISON_LESS;
      if (left.length > right.length) return COMPARISON_GREATER;
      return left < right ? COMPARISON_LESS : left > right ? COMPARISON_GREATER : COMPARISON_EQUAL;
    }
    if (leftN < rightN) return COMPARISON_LESS;
    if (leftN > rightN) return COMPARISON_GREATER;
    return COMPARISON_EQUAL;
  }

  return left < right ? COMPARISON_LESS : COMPARISON_GREATER;
}
