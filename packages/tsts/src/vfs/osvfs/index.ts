/**
 * Real-disk filesystem implementation.
 *
 * Port of TS-Go `internal/vfs/osvfs/`. Implements the `FS` interface
 * against Node's `fs` module (eventual NativeAOT path is .NET's
 * System.IO).
 */

export * from "./osvfs.js";
export * from "./os.js";
