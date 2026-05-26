/**
 * Compiler version constants.
 *
 * Port of TS-Go internal/core/version.go.
 */

const VERSION = "7.0.0-dev";

export function version(): string {
  return VERSION;
}

let versionMajorMinorCache: string | undefined;

export function versionMajorMinor(): string {
  if (versionMajorMinorCache !== undefined) return versionMajorMinorCache;
  const dotIdx = VERSION.indexOf(".", VERSION.indexOf(".") + 1);
  if (dotIdx === -1) {
    throw new Error("invalid version string: " + VERSION);
  }
  versionMajorMinorCache = VERSION.slice(0, dotIdx);
  return versionMajorMinorCache;
}
