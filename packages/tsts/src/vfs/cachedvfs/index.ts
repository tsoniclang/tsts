/**
 * Read-through cache layered over a VFS.
 *
 * Port of TS-Go `internal/vfs/cachedvfs/`. Caches read-like operations
 * (exists, stat, realpath, getAccessibleEntries).
 */

export * from "./cachedVfs.js";
