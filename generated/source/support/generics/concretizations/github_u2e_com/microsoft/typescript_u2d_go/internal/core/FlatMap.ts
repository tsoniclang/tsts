import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { Export as Export__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { Fix as Fix__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { ReferenceEntry as ReferenceEntry__from_ls, SymbolAndEntries as SymbolAndEntries__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/findallreferences.js";
import type { moduleCompletionNameAndKind$Storage as moduleCompletionNameAndKind__from_ls$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/string_completions.js";
import type { Location$Storage as Location__from_lsproto$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { FlatMap$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { moduleCompletionNameAndKind as moduleCompletionNameAndKind__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/string_completions.js";
import { Location as Location__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
export function FlatMap$PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return FlatMap$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function FlatMap$PointerTo_Named_ast$SourceFile$PointerTo_Named_ls$ReferenceEntry($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<ReferenceEntry__from_ls | undefined>) | undefined): RuntimeSlice<ReferenceEntry__from_ls | undefined> {
    return FlatMap$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, ReferenceEntry__from_ls | undefined>(($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<ReferenceEntry__from_ls | undefined>): int => {
        return $argument0.length;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, (): ReferenceEntry__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function FlatMap$PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Fix($argument0: RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined>, $argument1: (($0: {
    value: Export__from_autoimport;
} | undefined) => RuntimeSlice<{
    value: Fix__from_autoimport;
} | undefined>) | undefined): RuntimeSlice<{
    value: Fix__from_autoimport;
} | undefined> {
    return FlatMap$kernel<{
        value: Export__from_autoimport;
    } | undefined, {
        value: Fix__from_autoimport;
    } | undefined>(($argument0: {
        value: Fix__from_autoimport;
    } | undefined): {
        value: Fix__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Fix__from_autoimport;
    } | undefined): {
        value: Fix__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: Fix__from_autoimport;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: Fix__from_autoimport;
    } | undefined): {
        value: Fix__from_autoimport;
    } | undefined => {
        return $argument0;
    }, (): {
        value: Fix__from_autoimport;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function FlatMap$PointerTo_Named_checker$Type$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    return FlatMap$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function FlatMap$PointerTo_Named_ls$SymbolAndEntries$Named_lsproto$Location($argument0: RuntimeSlice<SymbolAndEntries__from_ls | undefined>, $argument1: (($0: SymbolAndEntries__from_ls | undefined) => RuntimeSlice<Location__from_lsproto$Storage>) | undefined): RuntimeSlice<Location__from_lsproto$Storage> {
    return FlatMap$kernel<SymbolAndEntries__from_ls | undefined, Location__from_lsproto>(($argument0: Location__from_lsproto): Location__from_lsproto => {
        return Location__from_lsproto.$copy($argument0);
    }, ($argument0: SymbolAndEntries__from_ls | undefined): SymbolAndEntries__from_ls | undefined => {
        return $argument0;
    }, ($argument0: Location__from_lsproto$Storage): Location__from_lsproto => {
        return Location__from_lsproto.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<Location__from_lsproto$Storage>): int => {
        return $argument0.length;
    }, ($argument0: Location__from_lsproto): Location__from_lsproto$Storage => {
        return Location__from_lsproto.$storageOf($argument0);
    }, (): Location__from_lsproto => {
        return Location__from_lsproto.$zero();
    }, $argument0, $argument1);
}
export function FlatMap$PointerTo_Named_ls$SymbolAndEntries$PointerTo_Named_ls$ReferenceEntry($argument0: RuntimeSlice<SymbolAndEntries__from_ls | undefined>, $argument1: (($0: SymbolAndEntries__from_ls | undefined) => RuntimeSlice<ReferenceEntry__from_ls | undefined>) | undefined): RuntimeSlice<ReferenceEntry__from_ls | undefined> {
    return FlatMap$kernel<SymbolAndEntries__from_ls | undefined, ReferenceEntry__from_ls | undefined>(($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: SymbolAndEntries__from_ls | undefined): SymbolAndEntries__from_ls | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<ReferenceEntry__from_ls | undefined>): int => {
        return $argument0.length;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, (): ReferenceEntry__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function FlatMap$string$Named_ls$moduleCompletionNameAndKind($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => RuntimeSlice<moduleCompletionNameAndKind__from_ls$Storage>) | undefined): RuntimeSlice<moduleCompletionNameAndKind__from_ls$Storage> {
    return FlatMap$kernel<gostring, moduleCompletionNameAndKind__from_ls>(($argument0: moduleCompletionNameAndKind__from_ls): moduleCompletionNameAndKind__from_ls => {
        return moduleCompletionNameAndKind__from_ls.$copy($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: moduleCompletionNameAndKind__from_ls$Storage): moduleCompletionNameAndKind__from_ls => {
        return moduleCompletionNameAndKind__from_ls.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<moduleCompletionNameAndKind__from_ls$Storage>): int => {
        return $argument0.length;
    }, ($argument0: moduleCompletionNameAndKind__from_ls): moduleCompletionNameAndKind__from_ls$Storage => {
        return moduleCompletionNameAndKind__from_ls.$storageOf($argument0);
    }, (): moduleCompletionNameAndKind__from_ls => {
        return moduleCompletionNameAndKind__from_ls.$zero();
    }, $argument0, $argument1);
}
