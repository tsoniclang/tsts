import type { SemanticError as SemanticError__from_json } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/errors.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../interface-contracts.js";
import type * as reflect from "@gotots/gostdlib/reflect.js";
import type { bool, gostring, int, int64 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_cmp_kernel from "@gotots/gostdlib/internal/facets/generic-cmp-kernel.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
export function Or$Named_error($argument0: RuntimeSlice<GoInterface | undefined>): GoInterface | undefined {
    return generic_cmp_kernel.CmpOrKernel<GoInterface | undefined, GoInterface | undefined>(($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined, $argument1: GoInterface | undefined): bool => {
        return goInterfaceEqual($argument0, $argument1);
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0);
}
export function Or$Named_reflect$Type($argument0: RuntimeSlice<reflect.Type | undefined>): reflect.Type | undefined {
    return generic_cmp_kernel.CmpOrKernel<reflect.Type | undefined, reflect.Type | undefined>(($argument0: reflect.Type | undefined): reflect.Type | undefined => {
        return $argument0;
    }, ($argument0: reflect.Type | undefined, $argument1: reflect.Type | undefined): bool => {
        return goInterfaceEqual($argument0, $argument1);
    }, ($argument0: reflect.Type | undefined): reflect.Type | undefined => {
        return $argument0;
    }, (): reflect.Type | undefined => {
        return void 0;
    }, $argument0);
}
export function Or$PointerTo_Named_json$SemanticError($argument0: RuntimeSlice<{
    value: SemanticError__from_json;
} | undefined>): {
    value: SemanticError__from_json;
} | undefined {
    return generic_cmp_kernel.CmpOrKernel<{
        value: SemanticError__from_json;
    } | undefined, {
        value: SemanticError__from_json;
    } | undefined>(($argument0: {
        value: SemanticError__from_json;
    } | undefined): {
        value: SemanticError__from_json;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: SemanticError__from_json;
    } | undefined, $argument1: {
        value: SemanticError__from_json;
    } | undefined): bool => {
        return $argument0
            ===
                $argument1;
    }, ($argument0: {
        value: SemanticError__from_json;
    } | undefined): {
        value: SemanticError__from_json;
    } | undefined => {
        return $argument0;
    }, (): {
        value: SemanticError__from_json;
    } | undefined => {
        return void 0;
    }, $argument0);
}
export function Or$int($argument0: RuntimeSlice<int>): int {
    return generic_cmp_kernel.CmpOrKernel<int, int>(($argument0: int): int => {
        return $argument0;
    }, ($argument0: int, $argument1: int): bool => {
        return $argument0 === $argument1;
    }, ($argument0: int): int => {
        return $argument0;
    }, (): int => {
        return 0;
    }, $argument0);
}
export function Or$int64($argument0: RuntimeSlice<int64>): int64 {
    return generic_cmp_kernel.CmpOrKernel<int64, int64>(($argument0: int64): int64 => {
        return $argument0;
    }, ($argument0: int64, $argument1: int64): bool => {
        return $argument0 === $argument1;
    }, ($argument0: int64): int64 => {
        return $argument0;
    }, (): int64 => {
        return 0n;
    }, $argument0);
}
export function Or$string($argument0: RuntimeSlice<gostring>): gostring {
    return generic_cmp_kernel.CmpOrKernel<gostring, gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0);
}
