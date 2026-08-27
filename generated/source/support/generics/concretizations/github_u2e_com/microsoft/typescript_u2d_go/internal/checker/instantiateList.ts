import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { Checker as Checker__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { TypeMapper as TypeMapper__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/mapper.js";
import type { IndexInfo as IndexInfo__from_checker, Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { instantiateList$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
export function instantiateList$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined, $argument3: (($0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return instantiateList$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3);
}
export function instantiateList$PointerTo_Named_checker$IndexInfo($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>, $argument2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined, $argument3: (($0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined, $2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined> {
    return instantiateList$kernel<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3);
}
export function instantiateList$PointerTo_Named_checker$Signature($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined, $argument3: (($0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, $2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    return instantiateList$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3);
}
export function instantiateList$PointerTo_Named_checker$Type($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined, $argument3: (($0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return instantiateList$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3);
}
