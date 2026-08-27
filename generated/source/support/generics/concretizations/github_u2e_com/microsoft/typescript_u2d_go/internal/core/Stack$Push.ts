import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { varScope as varScope__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
import type { detachedCommentsInfo$Storage as detachedCommentsInfo__from_printer$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
import { Stack as Stack__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/stack.js";
import { detachedCommentsInfo as detachedCommentsInfo__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
export function Stack$Push$Named_printer$detachedCommentsInfo($argument0: tsonicTypeScriptRuntime.Location<Stack__from_core<detachedCommentsInfo__from_printer>> | undefined, $argument1: detachedCommentsInfo__from_printer): void {
    return Stack__from_core.Push$kernel<detachedCommentsInfo__from_printer>($argument0, ($argument0: detachedCommentsInfo__from_printer): detachedCommentsInfo__from_printer => {
        return detachedCommentsInfo__from_printer.$copy($argument0);
    }, ($argument0: detachedCommentsInfo__from_printer$Storage): detachedCommentsInfo__from_printer => {
        return detachedCommentsInfo__from_printer.$fromStorage($argument0);
    }, ($argument0: detachedCommentsInfo__from_printer): detachedCommentsInfo__from_printer$Storage => {
        return detachedCommentsInfo__from_printer.$storageOf($argument0);
    }, (): detachedCommentsInfo__from_printer => {
        return detachedCommentsInfo__from_printer.$zero();
    }, $argument1);
}
export function Stack$Push$PointerTo_Named_printer$varScope($argument0: tsonicTypeScriptRuntime.Location<Stack__from_core<{
    value: varScope__from_printer;
} | undefined>> | undefined, $argument1: {
    value: varScope__from_printer;
} | undefined): void {
    return Stack__from_core.Push$kernel<{
        value: varScope__from_printer;
    } | undefined>($argument0, ($argument0: {
        value: varScope__from_printer;
    } | undefined): {
        value: varScope__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: varScope__from_printer;
    } | undefined): {
        value: varScope__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: varScope__from_printer;
    } | undefined): {
        value: varScope__from_printer;
    } | undefined => {
        return $argument0;
    }, (): {
        value: varScope__from_printer;
    } | undefined => {
        return void 0;
    }, $argument1);
}
