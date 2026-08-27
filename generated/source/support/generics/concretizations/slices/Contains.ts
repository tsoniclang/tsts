import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Kind as Kind__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/kind_generated.js";
import type { Symbol as Symbol__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { RecursionId$Storage as RecursionId__from_checker$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/relater.js";
import type { Ternary as Ternary__from_checker, Type as Type__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { DiagnosticTag as DiagnosticTag__from_lsproto } from "../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { bool, gostring, int32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { RecursionId as RecursionId__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/relater.js";
import { CodeActionKind as CodeActionKind__from_lsproto, PositionEncodingKind as PositionEncodingKind__from_lsproto, ResourceOperationKind as ResourceOperationKind__from_lsproto } from "../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function Contains$SliceOf_Named_ast$Kind$Named_ast$Kind($argument0: RuntimeSlice<Kind__from_ast>, $argument1: Kind__from_ast): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<Kind__from_ast>, Kind__from_ast, Kind__from_ast>(($argument0: RuntimeSlice<Kind__from_ast>): RuntimeSlice<Kind__from_ast> => {
        return $argument0;
    }, ($argument0: Kind__from_ast): Kind__from_ast => {
        return $argument0;
    }, ($argument0: Kind__from_ast, $argument1: Kind__from_ast): bool => {
        return $argument0 === $argument1;
    }, ($argument0: Kind__from_ast): Kind__from_ast => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Contains$SliceOf_Named_checker$RecursionId$Named_checker$RecursionId($argument0: RuntimeSlice<RecursionId__from_checker$Storage>, $argument1: RecursionId__from_checker): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<RecursionId__from_checker$Storage>, RecursionId__from_checker, RecursionId__from_checker$Storage>(($argument0: RuntimeSlice<RecursionId__from_checker$Storage>): RuntimeSlice<RecursionId__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: RecursionId__from_checker): RecursionId__from_checker => {
        return RecursionId__from_checker.$copy($argument0);
    }, ($argument0: RecursionId__from_checker, $argument1: RecursionId__from_checker): bool => {
        return RecursionId__from_checker.$equal($argument0, $argument1);
    }, ($argument0: RecursionId__from_checker$Storage): RecursionId__from_checker => {
        return RecursionId__from_checker.$fromStorage($argument0);
    }, $argument0, $argument1);
}
export function Contains$SliceOf_Named_checker$Ternary$Named_checker$Ternary($argument0: RuntimeSlice<Ternary__from_checker>, $argument1: Ternary__from_checker): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<Ternary__from_checker>, Ternary__from_checker, Ternary__from_checker>(($argument0: RuntimeSlice<Ternary__from_checker>): RuntimeSlice<Ternary__from_checker> => {
        return $argument0;
    }, ($argument0: Ternary__from_checker): Ternary__from_checker => {
        return $argument0;
    }, ($argument0: Ternary__from_checker, $argument1: Ternary__from_checker): bool => {
        return $argument0 === $argument1;
    }, ($argument0: Ternary__from_checker): Ternary__from_checker => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Contains$SliceOf_Named_lsproto$CodeActionKind$Named_lsproto$CodeActionKind($argument0: RuntimeSlice<gostring>, $argument1: CodeActionKind__from_lsproto): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<gostring>, CodeActionKind__from_lsproto, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: CodeActionKind__from_lsproto): CodeActionKind__from_lsproto => {
        return $argument0;
    }, ($argument0: CodeActionKind__from_lsproto, $argument1: CodeActionKind__from_lsproto): bool => {
        return $argument0.$value === $argument1.$value;
    }, ($argument0: gostring): CodeActionKind__from_lsproto => {
        return new CodeActionKind__from_lsproto($argument0);
    }, $argument0, $argument1);
}
export function Contains$SliceOf_Named_lsproto$DiagnosticTag$Named_lsproto$DiagnosticTag($argument0: RuntimeSlice<DiagnosticTag__from_lsproto>, $argument1: DiagnosticTag__from_lsproto): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<DiagnosticTag__from_lsproto>, DiagnosticTag__from_lsproto, DiagnosticTag__from_lsproto>(($argument0: RuntimeSlice<DiagnosticTag__from_lsproto>): RuntimeSlice<DiagnosticTag__from_lsproto> => {
        return $argument0;
    }, ($argument0: DiagnosticTag__from_lsproto): DiagnosticTag__from_lsproto => {
        return $argument0;
    }, ($argument0: DiagnosticTag__from_lsproto, $argument1: DiagnosticTag__from_lsproto): bool => {
        return $argument0 === $argument1;
    }, ($argument0: DiagnosticTag__from_lsproto): DiagnosticTag__from_lsproto => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Contains$SliceOf_Named_lsproto$PositionEncodingKind$Named_lsproto$PositionEncodingKind($argument0: RuntimeSlice<gostring>, $argument1: PositionEncodingKind__from_lsproto): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<gostring>, PositionEncodingKind__from_lsproto, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: PositionEncodingKind__from_lsproto): PositionEncodingKind__from_lsproto => {
        return $argument0;
    }, ($argument0: PositionEncodingKind__from_lsproto, $argument1: PositionEncodingKind__from_lsproto): bool => {
        return $argument0.$value === $argument1.$value;
    }, ($argument0: gostring): PositionEncodingKind__from_lsproto => {
        return new PositionEncodingKind__from_lsproto($argument0);
    }, $argument0, $argument1);
}
export function Contains$SliceOf_Named_lsproto$ResourceOperationKind$Named_lsproto$ResourceOperationKind($argument0: RuntimeSlice<gostring>, $argument1: ResourceOperationKind__from_lsproto): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<gostring>, ResourceOperationKind__from_lsproto, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: ResourceOperationKind__from_lsproto): ResourceOperationKind__from_lsproto => {
        return $argument0;
    }, ($argument0: ResourceOperationKind__from_lsproto, $argument1: ResourceOperationKind__from_lsproto): bool => {
        return $argument0.$value === $argument1.$value;
    }, ($argument0: gostring): ResourceOperationKind__from_lsproto => {
        return new ResourceOperationKind__from_lsproto($argument0);
    }, $argument0, $argument1);
}
export function Contains$SliceOf_Named_tspath$Path$Named_tspath$Path($argument0: RuntimeSlice<gostring>, $argument1: Path__from_tspath): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<gostring>, Path__from_tspath, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: Path__from_tspath, $argument1: Path__from_tspath): bool => {
        return $argument0.$value === $argument1.$value;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, $argument0, $argument1);
}
export function Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Contains$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Contains$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Contains$SliceOf_int32$int32($argument0: RuntimeSlice<int32>, $argument1: int32): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<int32>, int32, int32>(($argument0: RuntimeSlice<int32>): RuntimeSlice<int32> => {
        return $argument0;
    }, ($argument0: int32): int32 => {
        return $argument0;
    }, ($argument0: int32, $argument1: int32): bool => {
        return $argument0 === $argument1;
    }, ($argument0: int32): int32 => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Contains$SliceOf_string$string($argument0: RuntimeSlice<gostring>, $argument1: gostring): bool {
    return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<gostring>, gostring, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0, $argument1);
}
