import type { Winsize as Winsize__from_unix } from "../../../../../packages/golang.org/x/sys@v0.46.0/unix/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { IoctlGetTermios as IoctlGetTermios__from_unix, IoctlGetWinsize as IoctlGetWinsize__from_unix, TIOCGWINSZ$uint as TIOCGWINSZ$uint__from_unix } from "../../../../../packages/golang.org/x/sys@v0.46.0/unix/package.js";
import { ioctlReadTermios$uint } from "./term_unix_other.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function isTerminal(fd: int): bool {
    const __gotots_results_1 = IoctlGetTermios__from_unix(fd, ioctlReadTermios$uint);
    let err: GoInterface | undefined = __gotots_results_1[1];
    return err === undefined;
}
export function getSize(fd: int): [
    int,
    int,
    GoInterface | undefined
] {
    let width: int = 0;
    let height: int = 0;
    let err: GoInterface | undefined = void 0;
    const __gotots_results_0 = IoctlGetWinsize__from_unix(fd, TIOCGWINSZ$uint__from_unix);
    let ws: Winsize__from_unix | undefined = __gotots_results_0[0];
    err = __gotots_results_0[1];
    if (!(err === undefined)) {
        return [0, 0, err];
    }
    return [(ws ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Col, (ws ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Row, void 0];
}
