import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { structField$Storage as structField__from_json$Storage } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/fields.js";
import type { Node as Node__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Symbol as Symbol__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { sortedSymbolNamePair$Storage as sortedSymbolNamePair__from_checker$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilderimpl.js";
import type { trackerEdit as trackerEdit__from_change } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/change/tracker.js";
import type { ReferenceEntry as ReferenceEntry__from_ls } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/findallreferences.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { structField as structField__from_json } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/fields.js";
import { sortedSymbolNamePair as sortedSymbolNamePair__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilderimpl.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function SortStableFunc$SliceOf_Named_checker$sortedSymbolNamePair$Named_checker$sortedSymbolNamePair($argument0: RuntimeSlice<sortedSymbolNamePair__from_checker$Storage>, $argument1: (($0: sortedSymbolNamePair__from_checker, $1: sortedSymbolNamePair__from_checker) => int) | undefined): void {
    const __gotots_callee_7 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<sortedSymbolNamePair__from_checker$Storage>, sortedSymbolNamePair__from_checker, sortedSymbolNamePair__from_checker$Storage>(($argument0: RuntimeSlice<sortedSymbolNamePair__from_checker$Storage>): RuntimeSlice<sortedSymbolNamePair__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: sortedSymbolNamePair__from_checker): sortedSymbolNamePair__from_checker => {
        return sortedSymbolNamePair__from_checker.$copy($argument0);
    }, ($argument0: sortedSymbolNamePair__from_checker$Storage): sortedSymbolNamePair__from_checker => {
        return sortedSymbolNamePair__from_checker.$fromStorage($argument0);
    }, ($argument0: sortedSymbolNamePair__from_checker): sortedSymbolNamePair__from_checker$Storage => {
        return sortedSymbolNamePair__from_checker.$storageOf($argument0);
    }, $argument0, __gotots_callee_7 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_7($providerArgument0, $providerArgument1)));
    });
}
export function SortStableFunc$SliceOf_Named_json$structField$Named_json$structField($argument0: RuntimeSlice<structField__from_json$Storage>, $argument1: (($0: structField__from_json, $1: structField__from_json) => int) | undefined): void {
    const __gotots_callee_3 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<structField__from_json$Storage>, structField__from_json, structField__from_json$Storage>(($argument0: RuntimeSlice<structField__from_json$Storage>): RuntimeSlice<structField__from_json$Storage> => {
        return $argument0;
    }, ($argument0: structField__from_json): structField__from_json => {
        return structField__from_json.$copy($argument0);
    }, ($argument0: structField__from_json$Storage): structField__from_json => {
        return structField__from_json.$fromStorage($argument0);
    }, ($argument0: structField__from_json): structField__from_json$Storage => {
        return structField__from_json.$storageOf($argument0);
    }, $argument0, __gotots_callee_3 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_3($providerArgument0, $providerArgument1)));
    });
}
export function SortStableFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => int) | undefined): void {
    const __gotots_callee_5 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_5 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_5($providerArgument0, $providerArgument1)));
    });
}
export function SortStableFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined): void {
    const __gotots_callee_8 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_8 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_8($providerArgument0, $providerArgument1)));
    });
}
export function SortStableFunc$SliceOf_PointerTo_Named_change$trackerEdit$PointerTo_Named_change$trackerEdit($argument0: RuntimeSlice<trackerEdit__from_change | undefined>, $argument1: (($0: trackerEdit__from_change | undefined, $1: trackerEdit__from_change | undefined) => int) | undefined): void {
    const __gotots_callee_2 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<trackerEdit__from_change | undefined>, trackerEdit__from_change | undefined, trackerEdit__from_change | undefined>(($argument0: RuntimeSlice<trackerEdit__from_change | undefined>): RuntimeSlice<trackerEdit__from_change | undefined> => {
        return $argument0;
    }, ($argument0: trackerEdit__from_change | undefined): trackerEdit__from_change | undefined => {
        return $argument0;
    }, ($argument0: trackerEdit__from_change | undefined): trackerEdit__from_change | undefined => {
        return $argument0;
    }, ($argument0: trackerEdit__from_change | undefined): trackerEdit__from_change | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_2 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_2($providerArgument0, $providerArgument1)));
    });
}
export function SortStableFunc$SliceOf_PointerTo_Named_ls$ReferenceEntry$PointerTo_Named_ls$ReferenceEntry($argument0: RuntimeSlice<ReferenceEntry__from_ls | undefined>, $argument1: (($0: ReferenceEntry__from_ls | undefined, $1: ReferenceEntry__from_ls | undefined) => int) | undefined): void {
    const __gotots_callee_4 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<ReferenceEntry__from_ls | undefined>, ReferenceEntry__from_ls | undefined, ReferenceEntry__from_ls | undefined>(($argument0: RuntimeSlice<ReferenceEntry__from_ls | undefined>): RuntimeSlice<ReferenceEntry__from_ls | undefined> => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_4 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_4($providerArgument0, $providerArgument1)));
    });
}
export function SortStableFunc$SliceOf_PointerTo_Named_printer$EmitHelper$PointerTo_Named_printer$EmitHelper($argument0: RuntimeSlice<{
    value: EmitHelper__from_printer;
} | undefined>, $argument1: (($0: {
    value: EmitHelper__from_printer;
} | undefined, $1: {
    value: EmitHelper__from_printer;
} | undefined) => int) | undefined): void {
    const __gotots_callee_6 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<{
        value: EmitHelper__from_printer;
    } | undefined>, {
        value: EmitHelper__from_printer;
    } | undefined, {
        value: EmitHelper__from_printer;
    } | undefined>(($argument0: RuntimeSlice<{
        value: EmitHelper__from_printer;
    } | undefined>): RuntimeSlice<{
        value: EmitHelper__from_printer;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_6 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_6($providerArgument0, $providerArgument1)));
    });
}
export function SortStableFunc$SliceOf_SliceOf_PointerTo_Named_ast$Symbol$SliceOf_PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>, $argument1: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>) => int) | undefined): void {
    const __gotots_callee_1 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>(($argument0: RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, $argument0, __gotots_callee_1 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_1($providerArgument0, $providerArgument1)));
    });
}
export function SortStableFunc$SliceOf_string$string($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring, $1: gostring) => int) | undefined): void {
    const __gotots_callee_0 = $argument1;
    return generic_slices_kernel.SlicesSortStableFuncKernel<RuntimeSlice<gostring>, gostring, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0, __gotots_callee_0 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_0($providerArgument0, $providerArgument1)));
    });
}
