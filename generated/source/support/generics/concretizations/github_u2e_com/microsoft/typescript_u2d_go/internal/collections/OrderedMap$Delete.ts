import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
export function OrderedMap$Delete$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: gostring): [
    GoInterface | undefined,
    bool
] {
    return OrderedMap__from_collections.Delete$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument1);
}
export function OrderedMap$Delete$string$int($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, int>> | undefined, $argument1: gostring): [
    int,
    bool
] {
    return OrderedMap__from_collections.Delete$kernel<gostring, int>($argument0, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): int => {
        return 0;
    }, $argument1);
}
export function OrderedMap$Delete$string$string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, gostring>> | undefined, $argument1: gostring): [
    gostring,
    bool
] {
    return OrderedMap__from_collections.Delete$kernel<gostring, gostring>($argument0, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): gostring => {
        return "";
    }, $argument1);
}
