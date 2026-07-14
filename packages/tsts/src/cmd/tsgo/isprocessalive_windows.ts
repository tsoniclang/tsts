import type { bool, int } from "../../go/scalars.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/isprocessalive_windows.go::constGroup::processAliveSupported","kind":"constGroup","status":"implemented","sigHash":"ddff720b98b47013514f2a54d78dabb81db64ab219e03fc1dd3ee9bba4228c93"}
 *
 * Go source:
 * const processAliveSupported = true
 */
export const processAliveSupported: bool = true as bool;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/isprocessalive_windows.go::func::isProcessAlive","kind":"func","status":"implemented","sigHash":"d83dcd73cfb8598c099bef25fb8d571025714373dcb22b5c28c415df37df9719"}
 *
 * Go source:
 * // isProcessAlive checks if a process with the given PID is still running.
 * // On Windows, we open the process with SYNCHRONIZE access and use
 * // WaitForSingleObject with a zero timeout. If the wait times out, the
 * // process is still running. If the object is signaled, it has exited.
 * func isProcessAlive(pid int) bool {
 * 	const SYNCHRONIZE = 0x00100000
 * 	handle, err := syscall.OpenProcess(SYNCHRONIZE, false, uint32(pid))
 * 	if err != nil {
 * 		return false
 * 	}
 * 	defer func() { _ = syscall.CloseHandle(handle) }()
 * 	ret, err := syscall.WaitForSingleObject(handle, 0)
 * 	if err != nil {
 * 		return false
 * 	}
 * 	const WAIT_TIMEOUT = 258
 * 	return ret == WAIT_TIMEOUT
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
