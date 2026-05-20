/**
 * Virtual filesystem abstraction.
 *
 * Port of TS-Go internal/vfs/. Currently includes the FS interface and
 * an in-memory implementation for tests. Real Node-fs adapter and
 * watching/caching implementations come later.
 */

export * from "./vfs.js";
export * from "./memory.js";
