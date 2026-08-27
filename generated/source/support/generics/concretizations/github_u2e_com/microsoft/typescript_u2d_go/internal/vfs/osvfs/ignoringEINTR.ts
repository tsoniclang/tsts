import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { int } from "@gotots/runtime/scalars.js";
import { ignoringEINTR$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/osvfs/eintr_unix.js";
export function ignoringEINTR$int($argument0: (() => [
    int,
    GoInterface | undefined
]) | undefined): [
    int,
    GoInterface | undefined
] {
    return ignoringEINTR$kernel<int>($argument0);
}
