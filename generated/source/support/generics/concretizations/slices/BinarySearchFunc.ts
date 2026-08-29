import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Type as Type__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { CodeAction as CodeAction__from_ls } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/codeactions.js";
import type { MappedPosition as MappedPosition__from_sourcemap } from "../../../../modules/github.com/microsoft/typescript-go/internal/sourcemap/source_mapper.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function BinarySearchFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, $argument2: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => int) | undefined): [
    int,
    bool
] {
    const __gotots_callee_0 = $argument2;
    const __gotots_results_0 = generic_slices_kernel.SlicesBinarySearchFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, __gotots_callee_0 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_0($providerArgument0, $providerArgument1)));
    });
    return [globalThis.Number(BigInt.asIntN(64, __gotots_results_0[0])), __gotots_results_0[1]] satisfies [
        int,
        bool
    ];
}
export function BinarySearchFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined): [
    int,
    bool
] {
    const __gotots_callee_3 = $argument2;
    const __gotots_results_3 = generic_slices_kernel.SlicesBinarySearchFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, __gotots_callee_3 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_3($providerArgument0, $providerArgument1)));
    });
    return [globalThis.Number(BigInt.asIntN(64, __gotots_results_3[0])), __gotots_results_3[1]] satisfies [
        int,
        bool
    ];
}
export function BinarySearchFunc$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument2: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => int) | undefined): [
    int,
    bool
] {
    const __gotots_callee_1 = $argument2;
    const __gotots_results_1 = generic_slices_kernel.SlicesBinarySearchFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1, __gotots_callee_1 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_1($providerArgument0, $providerArgument1)));
    });
    return [globalThis.Number(BigInt.asIntN(64, __gotots_results_1[0])), __gotots_results_1[1]] satisfies [
        int,
        bool
    ];
}
export function BinarySearchFunc$SliceOf_PointerTo_Named_ls$CodeAction$PointerTo_Named_ls$CodeAction$PointerTo_Named_ls$CodeAction($argument0: RuntimeSlice<CodeAction__from_ls | undefined>, $argument1: CodeAction__from_ls | undefined, $argument2: (($0: CodeAction__from_ls | undefined, $1: CodeAction__from_ls | undefined) => int) | undefined): [
    int,
    bool
] {
    const __gotots_callee_4 = $argument2;
    const __gotots_results_4 = generic_slices_kernel.SlicesBinarySearchFuncKernel<RuntimeSlice<CodeAction__from_ls | undefined>, CodeAction__from_ls | undefined, CodeAction__from_ls | undefined, CodeAction__from_ls | undefined>(($argument0: RuntimeSlice<CodeAction__from_ls | undefined>): RuntimeSlice<CodeAction__from_ls | undefined> => {
        return $argument0;
    }, ($argument0: CodeAction__from_ls | undefined): CodeAction__from_ls | undefined => {
        return $argument0;
    }, ($argument0: CodeAction__from_ls | undefined): CodeAction__from_ls | undefined => {
        return $argument0;
    }, $argument0, $argument1, __gotots_callee_4 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_4($providerArgument0, $providerArgument1)));
    });
    return [globalThis.Number(BigInt.asIntN(64, __gotots_results_4[0])), __gotots_results_4[1]] satisfies [
        int,
        bool
    ];
}
export function BinarySearchFunc$SliceOf_PointerTo_Named_sourcemap$MappedPosition$PointerTo_Named_sourcemap$MappedPosition$int($argument0: RuntimeSlice<MappedPosition__from_sourcemap | undefined>, $argument1: int, $argument2: (($0: MappedPosition__from_sourcemap | undefined, $1: int) => int) | undefined): [
    int,
    bool
] {
    const __gotots_callee_2 = $argument2;
    const __gotots_results_2 = generic_slices_kernel.SlicesBinarySearchFuncKernel<RuntimeSlice<MappedPosition__from_sourcemap | undefined>, MappedPosition__from_sourcemap | undefined, MappedPosition__from_sourcemap | undefined, int>(($argument0: RuntimeSlice<MappedPosition__from_sourcemap | undefined>): RuntimeSlice<MappedPosition__from_sourcemap | undefined> => {
        return $argument0;
    }, ($argument0: MappedPosition__from_sourcemap | undefined): MappedPosition__from_sourcemap | undefined => {
        return $argument0;
    }, ($argument0: MappedPosition__from_sourcemap | undefined): MappedPosition__from_sourcemap | undefined => {
        return $argument0;
    }, $argument0, $argument1, __gotots_callee_2 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_2($providerArgument0, $providerArgument1)));
    });
    return [globalThis.Number(BigInt.asIntN(64, __gotots_results_2[0])), __gotots_results_2[1]] satisfies [
        int,
        bool
    ];
}
