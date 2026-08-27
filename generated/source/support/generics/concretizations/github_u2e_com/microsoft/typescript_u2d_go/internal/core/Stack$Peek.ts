import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { varScope as varScope__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
import type { detachedCommentsInfo$Storage as detachedCommentsInfo__from_printer$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Stack as Stack__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/stack.js";
import { detachedCommentsInfo as detachedCommentsInfo__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
export function Stack$Peek$Named_printer$detachedCommentsInfo($argument0: tsonicTypeScriptRuntime.Location<Stack__from_core<detachedCommentsInfo__from_printer>> | undefined): detachedCommentsInfo__from_printer {
    return Stack__from_core.Peek$kernel<detachedCommentsInfo__from_printer>($argument0, ($argument0: detachedCommentsInfo__from_printer): detachedCommentsInfo__from_printer => {
        return detachedCommentsInfo__from_printer.$copy($argument0);
    }, ($argument0: RuntimeSlice<detachedCommentsInfo__from_printer$Storage>, $argument1: int): detachedCommentsInfo__from_printer => {
        return detachedCommentsInfo__from_printer.$fromStorage($argument0.get($argument1));
    }, ($argument0: RuntimeSlice<detachedCommentsInfo__from_printer$Storage>): int => {
        return $argument0.length;
    });
}
export function Stack$Peek$PointerTo_Named_printer$varScope($argument0: tsonicTypeScriptRuntime.Location<Stack__from_core<{
    value: varScope__from_printer;
} | undefined>> | undefined): {
    value: varScope__from_printer;
} | undefined {
    return Stack__from_core.Peek$kernel<{
        value: varScope__from_printer;
    } | undefined>($argument0, ($argument0: {
        value: varScope__from_printer;
    } | undefined): {
        value: varScope__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: varScope__from_printer;
    } | undefined>, $argument1: int): {
        value: varScope__from_printer;
    } | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<{
        value: varScope__from_printer;
    } | undefined>): int => {
        return $argument0.length;
    });
}
