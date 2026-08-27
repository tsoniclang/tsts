import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FileReference as FileReference__from_ast, Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { InferenceInfo as InferenceInfo__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/commandlineoption.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Find$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function Find$PointerTo_Named_ast$FileReference($argument0: RuntimeSlice<{
    value: FileReference__from_ast;
} | undefined>, $argument1: (($0: {
    value: FileReference__from_ast;
} | undefined) => bool) | undefined): {
    value: FileReference__from_ast;
} | undefined {
    return Find$kernel<{
        value: FileReference__from_ast;
    } | undefined>(($argument0: {
        value: FileReference__from_ast;
    } | undefined): {
        value: FileReference__from_ast;
    } | undefined => {
        return $argument0;
    }, (): {
        value: FileReference__from_ast;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Find$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return Find$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Find$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return Find$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Find$PointerTo_Named_checker$InferenceInfo($argument0: RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined>, $argument1: (($0: {
    value: InferenceInfo__from_checker;
} | undefined) => bool) | undefined): {
    value: InferenceInfo__from_checker;
} | undefined {
    return Find$kernel<{
        value: InferenceInfo__from_checker;
    } | undefined>(($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, (): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Find$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    return Find$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Find$PointerTo_Named_tsoptions$CommandLineOption($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined) => bool) | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined {
    return Find$kernel<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
