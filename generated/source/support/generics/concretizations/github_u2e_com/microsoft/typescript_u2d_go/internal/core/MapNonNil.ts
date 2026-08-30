import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { ModuleDeclaration as ModuleDeclaration__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { IterationTypes$Storage as IterationTypes__from_checker$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { trackerEdit as trackerEdit__from_change } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/change/tracker.js";
import type { CompletionItem as CompletionItem__from_ls, literalValue as literalValue__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
import type { ReferenceEntry as ReferenceEntry__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/findallreferences.js";
import type { ModuleReference$Storage as ModuleReference__from_ls$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/importTracker.js";
import type { TextEdit as TextEdit__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { IterationTypes as IterationTypes__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import { MapNonNil$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { ModuleReference as ModuleReference__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/importTracker.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
export function MapNonNil$Named_checker$IterationTypes$PointerTo_Named_checker$Type($argument0: RuntimeSlice<IterationTypes__from_checker$Storage>, $argument1: (($0: IterationTypes__from_checker) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return MapNonNil$kernel<IterationTypes__from_checker, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: IterationTypes__from_checker): IterationTypes__from_checker => {
        return IterationTypes__from_checker.$copy($argument0);
    }, ($argument0: IterationTypes__from_checker$Storage): IterationTypes__from_checker => {
        return IterationTypes__from_checker.$fromStorage($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$Named_ls$ModuleReference$PointerTo_Named_ls$ReferenceEntry($argument0: RuntimeSlice<ModuleReference__from_ls$Storage>, $argument1: (($0: ModuleReference__from_ls) => ReferenceEntry__from_ls | undefined) | undefined): RuntimeSlice<ReferenceEntry__from_ls | undefined> {
    return MapNonNil$kernel<ModuleReference__from_ls, ReferenceEntry__from_ls | undefined>(($argument0: ReferenceEntry__from_ls | undefined, $argument1: ReferenceEntry__from_ls | undefined): bool => {
        return !($argument0
            ===
                $argument1);
    }, ($argument0: ModuleReference__from_ls): ModuleReference__from_ls => {
        return ModuleReference__from_ls.$copy($argument0);
    }, ($argument0: ModuleReference__from_ls$Storage): ModuleReference__from_ls => {
        return ModuleReference__from_ls.$fromStorage($argument0);
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, (): ReferenceEntry__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$ModuleDeclaration($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => {
    value: ModuleDeclaration__from_ast;
} | undefined) | undefined): RuntimeSlice<{
    value: ModuleDeclaration__from_ast;
} | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, {
        value: ModuleDeclaration__from_ast;
    } | undefined>(($argument0: {
        value: ModuleDeclaration__from_ast;
    } | undefined, $argument1: {
        value: ModuleDeclaration__from_ast;
    } | undefined): bool => {
        return !($argument0
            ===
                $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ModuleDeclaration__from_ast;
    } | undefined): {
        value: ModuleDeclaration__from_ast;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ModuleDeclaration__from_ast;
    } | undefined): {
        value: ModuleDeclaration__from_ast;
    } | undefined => {
        return $argument0;
    }, (): {
        value: ModuleDeclaration__from_ast;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$CompletionItem($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => {
    value: CompletionItem__from_ls;
} | undefined) | undefined): RuntimeSlice<{
    value: CompletionItem__from_ls;
} | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, {
        value: CompletionItem__from_ls;
    } | undefined>(($argument0: {
        value: CompletionItem__from_ls;
    } | undefined, $argument1: {
        value: CompletionItem__from_ls;
    } | undefined): bool => {
        return !($argument0
            ===
                $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: {
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
    }, (): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => ReferenceEntry__from_ls | undefined) | undefined): RuntimeSlice<ReferenceEntry__from_ls | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ReferenceEntry__from_ls | undefined>(($argument0: ReferenceEntry__from_ls | undefined, $argument1: ReferenceEntry__from_ls | undefined): bool => {
        return !($argument0
            ===
                $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, (): ReferenceEntry__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_change$trackerEdit$PointerTo_Named_lsproto$TextEdit($argument0: RuntimeSlice<trackerEdit__from_change | undefined>, $argument1: (($0: trackerEdit__from_change | undefined) => {
    value: TextEdit__from_lsproto;
} | undefined) | undefined): RuntimeSlice<{
    value: TextEdit__from_lsproto;
} | undefined> {
    return MapNonNil$kernel<trackerEdit__from_change | undefined, {
        value: TextEdit__from_lsproto;
    } | undefined>(($argument0: {
        value: TextEdit__from_lsproto;
    } | undefined, $argument1: {
        value: TextEdit__from_lsproto;
    } | undefined): bool => {
        return !($argument0
            ===
                $argument1);
    }, ($argument0: trackerEdit__from_change | undefined): trackerEdit__from_change | undefined => {
        return $argument0;
    }, ($argument0: trackerEdit__from_change | undefined): trackerEdit__from_change | undefined => {
        return $argument0;
    }, ($argument0: {
        value: TextEdit__from_lsproto;
    } | undefined): {
        value: TextEdit__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: TextEdit__from_lsproto;
    } | undefined): {
        value: TextEdit__from_lsproto;
    } | undefined => {
        return $argument0;
    }, (): {
        value: TextEdit__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_checker$Signature$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_checker$Signature$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_checker$Type$Named_ls$literalValue($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => literalValue__from_ls | undefined) | undefined): RuntimeSlice<literalValue__from_ls | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, literalValue__from_ls | undefined>(($argument0: literalValue__from_ls | undefined, $argument1: literalValue__from_ls | undefined): bool => {
        return !goInterfaceEqual($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: literalValue__from_ls | undefined): literalValue__from_ls | undefined => {
        return $argument0;
    }, ($argument0: literalValue__from_ls | undefined): literalValue__from_ls | undefined => {
        return $argument0;
    }, (): literalValue__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$PointerTo_Named_checker$Type$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return MapNonNil$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$int$PointerTo_Named_ast$Node($argument0: RuntimeSlice<int>, $argument1: (($0: int) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return MapNonNil$kernel<int, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function MapNonNil$string$PointerTo_Named_project$Project($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => tsonicTypeScriptRuntime.Location<Project__from_project> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined> {
    return MapNonNil$kernel<gostring, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
