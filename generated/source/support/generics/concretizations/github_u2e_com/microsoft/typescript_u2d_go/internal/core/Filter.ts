import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { InferenceInfo as InferenceInfo__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { IndexInfo as IndexInfo__from_checker, Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { Export as Export__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { literalValue as literalValue__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
import type { ReferenceEntry as ReferenceEntry__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/findallreferences.js";
import type { CompletionItem as CompletionItem__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { ModuleSpecifierEnding as ModuleSpecifierEnding__from_modulespecifiers } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/types.js";
import type { CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/commandlineoption.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Filter$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function Filter$Interface_void($argument0: RuntimeSlice<GoInterface | undefined>, $argument1: (($0: GoInterface | undefined) => bool) | undefined): RuntimeSlice<GoInterface | undefined> {
    return Filter$kernel<GoInterface | undefined>(($argument0: RuntimeSlice<GoInterface | undefined>): RuntimeSlice<GoInterface | undefined> => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<GoInterface | undefined>, $argument1: int): GoInterface | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<GoInterface | undefined>): int => {
        return $argument0.length;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$Named_ls$literalValue($argument0: RuntimeSlice<literalValue__from_ls | undefined>, $argument1: (($0: literalValue__from_ls | undefined) => bool) | undefined): RuntimeSlice<literalValue__from_ls | undefined> {
    return Filter$kernel<literalValue__from_ls | undefined>(($argument0: RuntimeSlice<literalValue__from_ls | undefined>): RuntimeSlice<literalValue__from_ls | undefined> => {
        return $argument0;
    }, ($argument0: literalValue__from_ls | undefined): literalValue__from_ls | undefined => {
        return $argument0;
    }, ($argument0: literalValue__from_ls | undefined): literalValue__from_ls | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<literalValue__from_ls | undefined>, $argument1: int): literalValue__from_ls | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<literalValue__from_ls | undefined>): int => {
        return $argument0.length;
    }, ($argument0: literalValue__from_ls | undefined): literalValue__from_ls | undefined => {
        return $argument0;
    }, (): literalValue__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$Named_modulespecifiers$ModuleSpecifierEnding($argument0: RuntimeSlice<ModuleSpecifierEnding__from_modulespecifiers>, $argument1: (($0: ModuleSpecifierEnding__from_modulespecifiers) => bool) | undefined): RuntimeSlice<ModuleSpecifierEnding__from_modulespecifiers> {
    return Filter$kernel<ModuleSpecifierEnding__from_modulespecifiers>(($argument0: RuntimeSlice<ModuleSpecifierEnding__from_modulespecifiers>): RuntimeSlice<ModuleSpecifierEnding__from_modulespecifiers> => {
        return $argument0;
    }, ($argument0: ModuleSpecifierEnding__from_modulespecifiers): ModuleSpecifierEnding__from_modulespecifiers => {
        return $argument0;
    }, ($argument0: ModuleSpecifierEnding__from_modulespecifiers): ModuleSpecifierEnding__from_modulespecifiers => {
        return $argument0;
    }, ($argument0: RuntimeSlice<ModuleSpecifierEnding__from_modulespecifiers>, $argument1: int): ModuleSpecifierEnding__from_modulespecifiers => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<ModuleSpecifierEnding__from_modulespecifiers>): int => {
        return $argument0.length;
    }, ($argument0: ModuleSpecifierEnding__from_modulespecifiers): ModuleSpecifierEnding__from_modulespecifiers => {
        return $argument0;
    }, (): ModuleSpecifierEnding__from_modulespecifiers => {
        return 0;
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
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
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_autoimport$Export($argument0: RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined>, $argument1: (($0: {
    value: Export__from_autoimport;
} | undefined) => bool) | undefined): RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined> {
    return Filter$kernel<{
        value: Export__from_autoimport;
    } | undefined>(($argument0: RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>): RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>, $argument1: int): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, (): {
        value: Export__from_autoimport;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_checker$IndexInfo($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return $argument0;
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
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_checker$InferenceInfo($argument0: RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined>, $argument1: (($0: {
    value: InferenceInfo__from_checker;
} | undefined) => bool) | undefined): RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined> {
    return Filter$kernel<{
        value: InferenceInfo__from_checker;
    } | undefined>(($argument0: RuntimeSlice<{
        value: InferenceInfo__from_checker;
    } | undefined>): RuntimeSlice<{
        value: InferenceInfo__from_checker;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: InferenceInfo__from_checker;
    } | undefined>, $argument1: int): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<{
        value: InferenceInfo__from_checker;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
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
export function Filter$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
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
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
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
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_ls$ReferenceEntry($argument0: RuntimeSlice<ReferenceEntry__from_ls | undefined>, $argument1: (($0: ReferenceEntry__from_ls | undefined) => bool) | undefined): RuntimeSlice<ReferenceEntry__from_ls | undefined> {
    return Filter$kernel<ReferenceEntry__from_ls | undefined>(($argument0: RuntimeSlice<ReferenceEntry__from_ls | undefined>): RuntimeSlice<ReferenceEntry__from_ls | undefined> => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<ReferenceEntry__from_ls | undefined>, $argument1: int): ReferenceEntry__from_ls | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<ReferenceEntry__from_ls | undefined>): int => {
        return $argument0.length;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, (): ReferenceEntry__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_lsproto$CompletionItem($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$PointerTo_Named_tsoptions$CommandLineOption($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> {
    return Filter$kernel<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Filter$string($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => bool) | undefined): RuntimeSlice<gostring> {
    return Filter$kernel<gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
