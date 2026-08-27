import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { detachedCommentsInfo as detachedCommentsInfo__from_printer, detachedCommentsInfo$Storage as detachedCommentsInfo__from_printer$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Stack as Stack__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/stack.js";
export function Stack$Len$Named_printer$detachedCommentsInfo($argument0: tsonicTypeScriptRuntime.Location<Stack__from_core<detachedCommentsInfo__from_printer>> | undefined): int {
    return Stack__from_core.Len$kernel<detachedCommentsInfo__from_printer>($argument0, ($argument0: RuntimeSlice<detachedCommentsInfo__from_printer$Storage>): int => {
        return $argument0.length;
    });
}
