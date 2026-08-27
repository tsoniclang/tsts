import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Type as Type__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { FileIncludeReason as FileIncludeReason__from_compiler } from "../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileInclude.js";
import type { SynthesizedComment$Storage as SynthesizedComment__from_printer$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SynthesizedComment as SynthesizedComment__from_printer } from "../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function ContainsFunc$SliceOf_Named_printer$SynthesizedComment$Named_printer$SynthesizedComment($argument0: RuntimeSlice<SynthesizedComment__from_printer$Storage>, $argument1: (($0: SynthesizedComment__from_printer) => bool) | undefined): bool {
    return generic_slices_kernel.SlicesContainsFuncKernel<RuntimeSlice<SynthesizedComment__from_printer$Storage>, SynthesizedComment__from_printer, SynthesizedComment__from_printer$Storage>(($argument0: RuntimeSlice<SynthesizedComment__from_printer$Storage>): RuntimeSlice<SynthesizedComment__from_printer$Storage> => {
        return $argument0;
    }, ($argument0: SynthesizedComment__from_printer): SynthesizedComment__from_printer => {
        return SynthesizedComment__from_printer.$copy($argument0);
    }, ($argument0: SynthesizedComment__from_printer$Storage): SynthesizedComment__from_printer => {
        return SynthesizedComment__from_printer.$fromStorage($argument0);
    }, $argument0, $argument1);
}
export function ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    return generic_slices_kernel.SlicesContainsFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function ContainsFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => bool) | undefined): bool {
    return generic_slices_kernel.SlicesContainsFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function ContainsFunc$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined): bool {
    return generic_slices_kernel.SlicesContainsFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function ContainsFunc$SliceOf_PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$FileIncludeReason($argument0: RuntimeSlice<{
    value: FileIncludeReason__from_compiler;
} | undefined>, $argument1: (($0: {
    value: FileIncludeReason__from_compiler;
} | undefined) => bool) | undefined): bool {
    return generic_slices_kernel.SlicesContainsFuncKernel<RuntimeSlice<{
        value: FileIncludeReason__from_compiler;
    } | undefined>, {
        value: FileIncludeReason__from_compiler;
    } | undefined, {
        value: FileIncludeReason__from_compiler;
    } | undefined>(($argument0: RuntimeSlice<{
        value: FileIncludeReason__from_compiler;
    } | undefined>): RuntimeSlice<{
        value: FileIncludeReason__from_compiler;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: FileIncludeReason__from_compiler;
    } | undefined): {
        value: FileIncludeReason__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: FileIncludeReason__from_compiler;
    } | undefined): {
        value: FileIncludeReason__from_compiler;
    } | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
