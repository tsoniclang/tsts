import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, PatternAmbientModule as PatternAmbientModule__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { InferenceInfo as InferenceInfo__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { IndexInfo as IndexInfo__from_checker, Signature as Signature__from_checker, Type as Type__from_checker, VarianceFlags as VarianceFlags__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { newImportBinding as newImportBinding__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { CompletionItem as CompletionItem__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
import type { CompletionItem as CompletionItem__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { specPair$Storage as specPair__from_modulespecifiers$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/specifiers.js";
import type { ModulePath$Storage as ModulePath__from_modulespecifiers$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/types.js";
import type { PseudoType as PseudoType__from_pseudochecker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/pseudochecker/type.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Some$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { specPair as specPair__from_modulespecifiers } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/specifiers.js";
import { ModulePath as ModulePath__from_modulespecifiers } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/types.js";
export function Some$Named_checker$VarianceFlags($argument0: RuntimeSlice<VarianceFlags__from_checker>, $argument1: (($0: VarianceFlags__from_checker) => bool) | undefined): bool {
    return Some$kernel<VarianceFlags__from_checker>(($argument0: VarianceFlags__from_checker): VarianceFlags__from_checker => {
        return $argument0;
    }, ($argument0: VarianceFlags__from_checker): VarianceFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$Named_modulespecifiers$ModulePath($argument0: RuntimeSlice<ModulePath__from_modulespecifiers$Storage>, $argument1: (($0: ModulePath__from_modulespecifiers) => bool) | undefined): bool {
    return Some$kernel<ModulePath__from_modulespecifiers>(($argument0: ModulePath__from_modulespecifiers): ModulePath__from_modulespecifiers => {
        return ModulePath__from_modulespecifiers.$copy($argument0);
    }, ($argument0: ModulePath__from_modulespecifiers$Storage): ModulePath__from_modulespecifiers => {
        return ModulePath__from_modulespecifiers.$fromStorage($argument0);
    }, $argument0, $argument1);
}
export function Some$Named_modulespecifiers$specPair($argument0: RuntimeSlice<specPair__from_modulespecifiers$Storage>, $argument1: (($0: specPair__from_modulespecifiers) => bool) | undefined): bool {
    return Some$kernel<specPair__from_modulespecifiers>(($argument0: specPair__from_modulespecifiers): specPair__from_modulespecifiers => {
        return specPair__from_modulespecifiers.$copy($argument0);
    }, ($argument0: specPair__from_modulespecifiers$Storage): specPair__from_modulespecifiers => {
        return specPair__from_modulespecifiers.$fromStorage($argument0);
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_ast$PatternAmbientModule($argument0: RuntimeSlice<{
    value: PatternAmbientModule__from_ast;
} | undefined>, $argument1: (($0: {
    value: PatternAmbientModule__from_ast;
} | undefined) => bool) | undefined): bool {
    return Some$kernel<{
        value: PatternAmbientModule__from_ast;
    } | undefined>(($argument0: {
        value: PatternAmbientModule__from_ast;
    } | undefined): {
        value: PatternAmbientModule__from_ast;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: PatternAmbientModule__from_ast;
    } | undefined): {
        value: PatternAmbientModule__from_ast;
    } | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_autoimport$newImportBinding($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_checker$IndexInfo($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_checker$InferenceInfo($argument0: RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined>, $argument1: (($0: {
    value: InferenceInfo__from_checker;
} | undefined) => bool) | undefined): bool {
    return Some$kernel<{
        value: InferenceInfo__from_checker;
    } | undefined>(($argument0: {
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
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_ls$CompletionItem($argument0: RuntimeSlice<{
    value: CompletionItem__from_ls;
} | undefined>, $argument1: (($0: {
    value: CompletionItem__from_ls;
} | undefined) => bool) | undefined): bool {
    return Some$kernel<{
        value: CompletionItem__from_ls;
    } | undefined>(($argument0: {
        value: CompletionItem__from_ls;
    } | undefined): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: CompletionItem__from_ls;
    } | undefined): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_lsproto$CompletionItem($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_Named_pseudochecker$PseudoType($argument0: RuntimeSlice<PseudoType__from_pseudochecker | undefined>, $argument1: (($0: PseudoType__from_pseudochecker | undefined) => bool) | undefined): bool {
    return Some$kernel<PseudoType__from_pseudochecker | undefined>(($argument0: PseudoType__from_pseudochecker | undefined): PseudoType__from_pseudochecker | undefined => {
        return $argument0;
    }, ($argument0: PseudoType__from_pseudochecker | undefined): PseudoType__from_pseudochecker | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$PointerTo_string($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<gostring> | undefined) => bool) | undefined): bool {
    return Some$kernel<tsonicTypeScriptRuntime.Location<gostring> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): tsonicTypeScriptRuntime.Location<gostring> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): tsonicTypeScriptRuntime.Location<gostring> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Some$SliceOf_PointerTo_Named_ast$Node($argument0: RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>, $argument1: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) => bool) | undefined): bool {
    return Some$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, $argument0, $argument1);
}
