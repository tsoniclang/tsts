/**
 * Reading and validating package.json for module resolution.
 *
 * Port of TS-Go internal/packagejson/. Reads core fields used by module
 * resolution and dependency tracking; tracks present-but-wrong-type cases
 * via the Expected<T> discriminator for diagnostic emission.
 */

export * from "./types.js";
export * from "./parser.js";
