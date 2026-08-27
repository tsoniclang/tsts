import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { TupleElementInfo$Storage as TupleElementInfo__from_checker$Storage, Type as Type__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { TupleElementInfo as TupleElementInfo__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function Delete$SliceOf_Named_checker$TupleElementInfo$Named_checker$TupleElementInfo($argument0: RuntimeSlice<TupleElementInfo__from_checker$Storage>, $argument1: int, $argument2: int): RuntimeSlice<TupleElementInfo__from_checker$Storage> {
    return generic_slices_kernel.SlicesDeleteKernel<RuntimeSlice<TupleElementInfo__from_checker$Storage>, TupleElementInfo__from_checker, TupleElementInfo__from_checker$Storage>(($argument0: RuntimeSlice<TupleElementInfo__from_checker$Storage>): RuntimeSlice<TupleElementInfo__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<TupleElementInfo__from_checker$Storage>): RuntimeSlice<TupleElementInfo__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$copy($argument0);
    }, ($argument0: TupleElementInfo__from_checker$Storage): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$fromStorage($argument0);
    }, ($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker$Storage => {
        return TupleElementInfo__from_checker.$storageOf($argument0);
    }, (): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$zero();
    }, $argument0, BigInt.asIntN(64, goNumberToBigInt($argument1)), BigInt.asIntN(64, goNumberToBigInt($argument2)));
}
export function Delete$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int, $argument2: int): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return generic_slices_kernel.SlicesDeleteKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, BigInt.asIntN(64, goNumberToBigInt($argument1)), BigInt.asIntN(64, goNumberToBigInt($argument2)));
}
export function Delete$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: int, $argument2: int): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return generic_slices_kernel.SlicesDeleteKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, BigInt.asIntN(64, goNumberToBigInt($argument1)), BigInt.asIntN(64, goNumberToBigInt($argument2)));
}
export function Delete$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: int, $argument2: int): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return generic_slices_kernel.SlicesDeleteKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, BigInt.asIntN(64, goNumberToBigInt($argument1)), BigInt.asIntN(64, goNumberToBigInt($argument2)));
}
export function Delete$SliceOf_string$string($argument0: RuntimeSlice<gostring>, $argument1: int, $argument2: int): RuntimeSlice<gostring> {
    return generic_slices_kernel.SlicesDeleteKernel<RuntimeSlice<gostring>, gostring, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, BigInt.asIntN(64, goNumberToBigInt($argument1)), BigInt.asIntN(64, goNumberToBigInt($argument2)));
}
