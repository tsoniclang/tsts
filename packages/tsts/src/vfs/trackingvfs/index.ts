/**
 * Read-tracking VFS wrapper.
 *
 * Port of TS-Go `internal/vfs/trackingvfs/`. Records every path
 * accessed via read-like operations so watch mode knows the
 * compiler's exact dependency surface.
 */

export * from "./trackingVfs.js";
