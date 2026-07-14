import type { bool, int } from "../../go/scalars.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/isprocessalive_unix.go::constGroup::processAliveSupported","kind":"constGroup","status":"implemented","sigHash":"ddff720b98b47013514f2a54d78dabb81db64ab219e03fc1dd3ee9bba4228c93"}
 *
 * Go source:
 * const processAliveSupported = true
 */
export const processAliveSupported: bool = true as bool;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/isprocessalive_unix.go::func::isProcessAlive","kind":"func","status":"implemented","sigHash":"d83dcd73cfb8598c099bef25fb8d571025714373dcb22b5c28c415df37df9719"}
 *
 * Go source:
 * // isProcessAlive checks if a process with the given PID is still running.
 * // On Unix, FindProcess always succeeds, so we send signal 0 to probe the
 * // process. If the signal returns nil or EPERM, the process exists (EPERM
 * // means it exists but we lack permission to signal it). ESRCH or any
 * // other error indicates the process is gone.
 * func isProcessAlive(pid int) bool {
 * 	proc, err := os.FindProcess(pid)
 * 	if err != nil {
 * 		return false
 * 	}
 * 	err = proc.Signal(syscall.Signal(0))
 * 	return err == nil || errors.Is(err, syscall.EPERM)
 * }
 */
export function isProcessAlive(pid: int): bool {
  try {
    process.kill(pid, 0);
    return true as bool;
  } catch (error) {
    return ((error as NodeJS.ErrnoException).code === "EPERM") as bool;
  }
}
