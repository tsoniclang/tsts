import type { bool, int } from "../../go/scalars.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/isprocessalive_other.go::constGroup::processAliveSupported","kind":"constGroup","status":"implemented","sigHash":"ddff720b98b47013514f2a54d78dabb81db64ab219e03fc1dd3ee9bba4228c93"}
 *
 * Go source:
 * const processAliveSupported = false
 */
export const processAliveSupported: bool = false as bool;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/isprocessalive_other.go::func::isProcessAlive","kind":"func","status":"implemented","sigHash":"d83dcd73cfb8598c099bef25fb8d571025714373dcb22b5c28c415df37df9719"}
 *
 * Go source:
 * func isProcessAlive(pid int) bool {
 * 	panic("isProcessAlive is not supported on this platform")
 * }
 */
export function isProcessAlive(pid: int): bool {
  throw new globalThis.Error("isProcessAlive is not supported on this platform");
}
