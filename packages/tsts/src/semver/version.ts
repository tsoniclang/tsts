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

import type { int } from "@tsonic/core/types.js";

const VERSION_REGEX = /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$/i;

const PRERELEASE_REGEX = /^(?:0|[1-9]\d*|[a-z-][a-z0-9-]*)(?:\.(?:0|[1-9]\d*|[a-zA-Z-][a-zA-Z0-9-]*))*$/i;
const BUILD_REGEX = /^[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
const NUMERIC_IDENTIFIER_REGEX = /^(?:0|[1-9]\d*)$/;

export class Version {
  readonly major: int;
  readonly minor: int;
  readonly patch: int;
  readonly prerelease: readonly string[];
  readonly build: readonly string[];

  constructor(
    major: int,
    minor: int = 0,
    patch: int = 0,
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
  compare(other: Version): int {
    if (this === other) return 0;

    if (this.major !== other.major) {
      return this.major < other.major ? -1 : 1;
    }
    if (this.minor !== other.minor) {
      return this.minor < other.minor ? -1 : 1;
    }
    if (this.patch !== other.patch) {
      return this.patch < other.patch ? -1 : 1;
    }
    return comparePrereleaseIdentifiers(this.prerelease, other.prerelease);
  }

  equals(other: Version): boolean {
    return this.compare(other) === 0;
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
  readonly origInput: string;
  constructor(origInput: string) {
    super(`Could not parse version string from "${origInput}"`);
    this.origInput = origInput;
    this.name = "SemverParseError";
  }
}

export interface VersionParseResult {
  readonly version: Version;
  readonly ok: boolean;
  readonly error?: SemverParseError;
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

export function tryParseVersionResult(text: string): VersionParseResult {
  try {
    return { version: tryParseVersion(text), ok: true };
  } catch (error) {
    if (error instanceof SemverParseError) {
      return { version: new Version(0), ok: false, error };
    }
    throw error;
  }
}

export function compareVersions(left: Version | undefined, right: Version | undefined): int {
  if (left === right) return 0;
  if (left === undefined) return -1;
  if (right === undefined) return 1;
  return left.compare(right);
}

export function comparePrereleaseParts(left: readonly string[], right: readonly string[]): int {
  return comparePrereleaseIdentifiers(left, right);
}

export function comparePrereleasePart(left: string, right: string): int {
  return comparePrereleaseIdentifier(left, right);
}

export const TryParseVersion = tryParseVersionResult;
export const MustParse = mustParse;

function isUint32Range(value: number): value is int {
  return Number.isInteger(value) && value >= 0 && value <= 0x7FFF_FFFF;
}

function parseUint(text: string): int | undefined {
  const n = Number(text);
  if (!isUint32Range(n)) return undefined;
  return n;
}

function getUintComponent(text: string, original: string): int {
  const parsed = parseUint(text);
  if (parsed === undefined) {
    throw new SemverParseError(original);
  }
  return parsed;
}

function comparePrereleaseIdentifiers(
  left: readonly string[],
  right: readonly string[]
): int {
  if (left.length === 0) return right.length === 0 ? 0 : 1;
  if (right.length === 0) return -1;

  const len = Math.min(left.length, right.length);
  for (let i = 0; i < len; i += 1) {
    const cmp = comparePrereleaseIdentifier(left[i]!, right[i]!);
    if (cmp !== 0) return cmp;
  }
  if (left.length < right.length) return -1;
  if (left.length > right.length) return 1;
  return 0;
}

function comparePrereleaseIdentifier(left: string, right: string): int {
  if (left === right) return 0;

  const leftIsNumeric = NUMERIC_IDENTIFIER_REGEX.test(left);
  const rightIsNumeric = NUMERIC_IDENTIFIER_REGEX.test(right);

  if (leftIsNumeric || rightIsNumeric) {
    if (!rightIsNumeric) return -1;
    if (!leftIsNumeric) return 1;

    const leftN = Number(left);
    const rightN = Number(right);
    if (!Number.isFinite(leftN) || !Number.isFinite(rightN)) {
      // Overflow: fall back to length, then string compare
      if (left.length < right.length) return -1;
      if (left.length > right.length) return 1;
      return left < right ? -1 : left > right ? 1 : 0;
    }
    if (leftN < rightN) return -1;
    if (leftN > rightN) return 1;
    return 0;
  }

  return left < right ? -1 : 1;
}
