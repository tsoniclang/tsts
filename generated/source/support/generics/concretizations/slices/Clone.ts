import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Signature as Signature__from_checker, TupleElementInfo$Storage as TupleElementInfo__from_checker$Storage, Type as Type__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { TextRangeWithKind$Storage as TextRangeWithKind__from_format$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/format/scanner.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type { TracedType as TracedType__from_tracing } from "../../../../modules/github.com/microsoft/typescript-go/internal/tracing/tracing.js";
import type { CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/commandlineoption.js";
import type * as metrics from "@gotots/gostdlib/runtime/metrics.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { TupleElementInfo as TupleElementInfo__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import { TextRangeWithKind as TextRangeWithKind__from_format } from "../../../../modules/github.com/microsoft/typescript-go/internal/format/scanner.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import * as named_runtime_metrics from "@gotots/gostdlib/internal/facets/named-runtime-metrics.js";
export function Clone$SliceOf_Named_checker$TupleElementInfo$Named_checker$TupleElementInfo($argument0: RuntimeSlice<TupleElementInfo__from_checker$Storage>): RuntimeSlice<TupleElementInfo__from_checker$Storage> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<TupleElementInfo__from_checker$Storage>, TupleElementInfo__from_checker, TupleElementInfo__from_checker$Storage>(($argument0: RuntimeSlice<TupleElementInfo__from_checker$Storage>): RuntimeSlice<TupleElementInfo__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<TupleElementInfo__from_checker$Storage>): RuntimeSlice<TupleElementInfo__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$copy($argument0);
    }, ($argument0: TupleElementInfo__from_checker$Storage): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$fromStorage($argument0);
    }, ($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker$Storage => {
        return TupleElementInfo__from_checker.$storageOf($argument0);
    }, $argument0);
}
export function Clone$SliceOf_Named_format$TextRangeWithKind$Named_format$TextRangeWithKind($argument0: RuntimeSlice<TextRangeWithKind__from_format$Storage>): RuntimeSlice<TextRangeWithKind__from_format$Storage> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<TextRangeWithKind__from_format$Storage>, TextRangeWithKind__from_format, TextRangeWithKind__from_format$Storage>(($argument0: RuntimeSlice<TextRangeWithKind__from_format$Storage>): RuntimeSlice<TextRangeWithKind__from_format$Storage> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<TextRangeWithKind__from_format$Storage>): RuntimeSlice<TextRangeWithKind__from_format$Storage> => {
        return $argument0;
    }, ($argument0: TextRangeWithKind__from_format): TextRangeWithKind__from_format => {
        return TextRangeWithKind__from_format.$copy($argument0);
    }, ($argument0: TextRangeWithKind__from_format$Storage): TextRangeWithKind__from_format => {
        return TextRangeWithKind__from_format.$fromStorage($argument0);
    }, ($argument0: TextRangeWithKind__from_format): TextRangeWithKind__from_format$Storage => {
        return TextRangeWithKind__from_format.$storageOf($argument0);
    }, $argument0);
}
export function Clone$SliceOf_Named_metrics$Sample$Named_metrics$Sample($argument0: RuntimeSlice<metrics.Sample>): RuntimeSlice<metrics.Sample> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<metrics.Sample>, metrics.Sample, metrics.Sample>(($argument0: RuntimeSlice<metrics.Sample>): RuntimeSlice<metrics.Sample> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<metrics.Sample>): RuntimeSlice<metrics.Sample> => {
        return $argument0;
    }, ($argument0: metrics.Sample): metrics.Sample => {
        return named_runtime_metrics.RuntimeMetricsSampleOperations.$copy($argument0);
    }, ($argument0: metrics.Sample): metrics.Sample => {
        return $argument0;
    }, ($argument0: metrics.Sample): metrics.Sample => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_Named_tracing$TracedType$Named_tracing$TracedType($argument0: RuntimeSlice<TracedType__from_tracing | undefined>): RuntimeSlice<TracedType__from_tracing | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<TracedType__from_tracing | undefined>, TracedType__from_tracing | undefined, TracedType__from_tracing | undefined>(($argument0: RuntimeSlice<TracedType__from_tracing | undefined>): RuntimeSlice<TracedType__from_tracing | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<TracedType__from_tracing | undefined>): RuntimeSlice<TracedType__from_tracing | undefined> => {
        return $argument0;
    }, ($argument0: TracedType__from_tracing | undefined): TracedType__from_tracing | undefined => {
        return $argument0;
    }, ($argument0: TracedType__from_tracing | undefined): TracedType__from_tracing | undefined => {
        return $argument0;
    }, ($argument0: TracedType__from_tracing | undefined): TracedType__from_tracing | undefined => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_PointerTo_Named_checker$Signature$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_PointerTo_Named_printer$EmitHelper$PointerTo_Named_printer$EmitHelper($argument0: RuntimeSlice<{
    value: EmitHelper__from_printer;
} | undefined>): RuntimeSlice<{
    value: EmitHelper__from_printer;
} | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<{
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
    }, ($argument0: RuntimeSlice<{
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
    }, $argument0);
}
export function Clone$SliceOf_PointerTo_Named_tsoptions$CommandLineOption$PointerTo_Named_tsoptions$CommandLineOption($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_PointerTo_string$PointerTo_string($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined>, tsonicTypeScriptRuntime.Location<gostring> | undefined, tsonicTypeScriptRuntime.Location<gostring> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): tsonicTypeScriptRuntime.Location<gostring> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): tsonicTypeScriptRuntime.Location<gostring> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): tsonicTypeScriptRuntime.Location<gostring> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_int$int($argument0: RuntimeSlice<int>): RuntimeSlice<int> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<int>, int, int>(($argument0: RuntimeSlice<int>): RuntimeSlice<int> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<int>): RuntimeSlice<int> => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, $argument0);
}
export function Clone$SliceOf_string$string($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> {
    return generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<gostring>, gostring, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
