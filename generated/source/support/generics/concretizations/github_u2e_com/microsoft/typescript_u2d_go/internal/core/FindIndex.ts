import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { ElementFlags as ElementFlags__from_checker, TupleElementInfo$Storage as TupleElementInfo__from_checker$Storage, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { SymbolAndEntries as SymbolAndEntries__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/findallreferences.js";
import type { signatureHelpParameter$Storage as signatureHelpParameter__from_ls$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/signaturehelp.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { TupleElementInfo as TupleElementInfo__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import { FindIndex$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { signatureHelpParameter as signatureHelpParameter__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/signaturehelp.js";
export function FindIndex$Named_checker$ElementFlags($argument0: RuntimeSlice<ElementFlags__from_checker>, $argument1: (($0: ElementFlags__from_checker) => bool) | undefined): int {
    return FindIndex$kernel<ElementFlags__from_checker>(($argument0: ElementFlags__from_checker): ElementFlags__from_checker => {
        return $argument0;
    }, ($argument0: ElementFlags__from_checker): ElementFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1);
}
export function FindIndex$Named_checker$TupleElementInfo($argument0: RuntimeSlice<TupleElementInfo__from_checker$Storage>, $argument1: (($0: TupleElementInfo__from_checker) => bool) | undefined): int {
    return FindIndex$kernel<TupleElementInfo__from_checker>(($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$copy($argument0);
    }, ($argument0: TupleElementInfo__from_checker$Storage): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$fromStorage($argument0);
    }, $argument0, $argument1);
}
export function FindIndex$Named_ls$signatureHelpParameter($argument0: RuntimeSlice<signatureHelpParameter__from_ls$Storage>, $argument1: (($0: signatureHelpParameter__from_ls) => bool) | undefined): int {
    return FindIndex$kernel<signatureHelpParameter__from_ls>(($argument0: signatureHelpParameter__from_ls): signatureHelpParameter__from_ls => {
        return signatureHelpParameter__from_ls.$copy($argument0);
    }, ($argument0: signatureHelpParameter__from_ls$Storage): signatureHelpParameter__from_ls => {
        return signatureHelpParameter__from_ls.$fromStorage($argument0);
    }, $argument0, $argument1);
}
export function FindIndex$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => bool) | undefined): int {
    return FindIndex$kernel<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function FindIndex$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): int {
    return FindIndex$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function FindIndex$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => bool) | undefined): int {
    return FindIndex$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function FindIndex$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined): int {
    return FindIndex$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function FindIndex$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined): int {
    return FindIndex$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function FindIndex$PointerTo_Named_ls$SymbolAndEntries($argument0: RuntimeSlice<SymbolAndEntries__from_ls | undefined>, $argument1: (($0: SymbolAndEntries__from_ls | undefined) => bool) | undefined): int {
    return FindIndex$kernel<SymbolAndEntries__from_ls | undefined>(($argument0: SymbolAndEntries__from_ls | undefined): SymbolAndEntries__from_ls | undefined => {
        return $argument0;
    }, ($argument0: SymbolAndEntries__from_ls | undefined): SymbolAndEntries__from_ls | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
