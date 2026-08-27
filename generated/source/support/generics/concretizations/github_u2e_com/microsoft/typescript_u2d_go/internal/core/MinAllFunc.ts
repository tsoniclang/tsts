import type { FixAndExport as FixAndExport__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/view.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { MinAllFunc$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function MinAllFunc$PointerTo_Named_autoimport$FixAndExport($argument0: RuntimeSlice<{
    value: FixAndExport__from_autoimport;
} | undefined>, $argument1: (($0: {
    value: FixAndExport__from_autoimport;
} | undefined, $1: {
    value: FixAndExport__from_autoimport;
} | undefined) => int) | undefined): RuntimeSlice<{
    value: FixAndExport__from_autoimport;
} | undefined> {
    return MinAllFunc$kernel<{
        value: FixAndExport__from_autoimport;
    } | undefined>(($argument0: {
        value: FixAndExport__from_autoimport;
    } | undefined): {
        value: FixAndExport__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: FixAndExport__from_autoimport;
    } | undefined>, $argument1: int): {
        value: FixAndExport__from_autoimport;
    } | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<{
        value: FixAndExport__from_autoimport;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: FixAndExport__from_autoimport;
    } | undefined): {
        value: FixAndExport__from_autoimport;
    } | undefined => {
        return $argument0;
    }, (): {
        value: FixAndExport__from_autoimport;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
