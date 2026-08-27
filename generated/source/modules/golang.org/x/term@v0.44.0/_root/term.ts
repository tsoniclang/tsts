import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { getSize, isTerminal } from "./term_unix.js";
export function IsTerminal(fd: int): bool {
    return isTerminal(fd);
}
export function GetSize(fd: int): [
    int,
    int,
    GoInterface | undefined
] {
    let width: int = 0;
    let height: int = 0;
    let err: GoInterface | undefined = void 0;
    return getSize(fd);
}
