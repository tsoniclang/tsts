import type { Export as Export__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Index as Index__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/index.js";
import { $go$constraint_method$autoimport$Name$PointerTo_Named_autoimport$Export_to_string } from "../../../../../../../capabilities/constraint_method.js";
export function Index$SearchWordPrefix$PointerTo_Named_autoimport$Export($argument0: Index__from_autoimport<{
    value: Export__from_autoimport;
} | undefined> | undefined, $argument1: gostring): RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined> {
    return Index__from_autoimport.SearchWordPrefix$kernel<{
        value: Export__from_autoimport;
    } | undefined>($argument0, $go$constraint_method$autoimport$Name$PointerTo_Named_autoimport$Export_to_string, ($argument0: {
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
    } | undefined>, $argument1: int): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0.get($argument1);
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
