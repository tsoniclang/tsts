import type { Export as Export__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Index as Index__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/index.js";
export function Index$Clone$PointerTo_Named_autoimport$Export($argument0: Index__from_autoimport<{
    value: Export__from_autoimport;
} | undefined> | undefined, $argument1: (($0: {
    value: Export__from_autoimport;
} | undefined) => bool) | undefined): Index__from_autoimport<{
    value: Export__from_autoimport;
} | undefined> | undefined {
    return Index__from_autoimport.Clone$kernel<{
        value: Export__from_autoimport;
    } | undefined>($argument0, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, (): {
        value: Export__from_autoimport;
    } | undefined => {
        return void 0;
    }, $argument1);
}
