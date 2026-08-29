import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { ExportSpecifier as ExportSpecifier__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import type { ModuleID as ModuleID__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { existingImport$Storage as existingImport__from_autoimport$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { trackerEdit as trackerEdit__from_change } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/change/tracker.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { MultiMap as MultiMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/multimap.js";
import { existingImport as existingImport__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_SliceOf_PointerTo_Named_ast$Node, $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_SliceOf_PointerTo_Named_change$trackerEdit, $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$ExportSpecifier, $goMap$MapOf_string_To_SliceOf_int, $goMap$MapOf_Named_autoimport$ModuleID_To_SliceOf_Named_autoimport$existingImport as GoMap } from "../../../../../../../maps.js";
export function MultiMap$Add$Named_autoimport$ModuleID$Named_autoimport$existingImport($argument0: MultiMap__from_collections<ModuleID__from_autoimport, existingImport__from_autoimport> | undefined, $argument1: ModuleID__from_autoimport, $argument2: existingImport__from_autoimport): void {
    return MultiMap__from_collections.Add$kernel<ModuleID__from_autoimport, existingImport__from_autoimport>($argument0, ($argument0: existingImport__from_autoimport): existingImport__from_autoimport => {
        return existingImport__from_autoimport.$copy($argument0);
    }, ($argument0: existingImport__from_autoimport$Storage): existingImport__from_autoimport => {
        return existingImport__from_autoimport.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<existingImport__from_autoimport$Storage>): GoMapValue<ModuleID__from_autoimport, RuntimeSlice<existingImport__from_autoimport$Storage>> => {
        return GoMap.make(0, []);
    }, ($argument0: existingImport__from_autoimport): existingImport__from_autoimport$Storage => {
        return existingImport__from_autoimport.$storageOf($argument0);
    }, (): existingImport__from_autoimport => {
        return existingImport__from_autoimport.$zero();
    }, $argument1, $argument2);
}
export function MultiMap$Add$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: MultiMap__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    return MultiMap__from_collections.Add$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_SliceOf_PointerTo_Named_ast$Node.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function MultiMap$Add$PointerTo_Named_ast$SourceFile$PointerTo_Named_change$trackerEdit($argument0: MultiMap__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, trackerEdit__from_change | undefined> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument2: trackerEdit__from_change | undefined): void {
    return MultiMap__from_collections.Add$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, trackerEdit__from_change | undefined>($argument0, ($argument0: trackerEdit__from_change | undefined): trackerEdit__from_change | undefined => {
        return $argument0;
    }, ($argument0: trackerEdit__from_change | undefined): trackerEdit__from_change | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<trackerEdit__from_change | undefined>): GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<trackerEdit__from_change | undefined>> => {
        return $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_SliceOf_PointerTo_Named_change$trackerEdit.make(0, []);
    }, ($argument0: trackerEdit__from_change | undefined): trackerEdit__from_change | undefined => {
        return $argument0;
    }, (): trackerEdit__from_change | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function MultiMap$Add$string$PointerTo_Named_ast$ExportSpecifier($argument0: MultiMap__from_collections<gostring, {
    value: ExportSpecifier__from_ast;
} | undefined> | undefined, $argument1: gostring, $argument2: {
    value: ExportSpecifier__from_ast;
} | undefined): void {
    return MultiMap__from_collections.Add$kernel<gostring, {
        value: ExportSpecifier__from_ast;
    } | undefined>($argument0, ($argument0: {
        value: ExportSpecifier__from_ast;
    } | undefined): {
        value: ExportSpecifier__from_ast;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ExportSpecifier__from_ast;
    } | undefined): {
        value: ExportSpecifier__from_ast;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: ExportSpecifier__from_ast;
    } | undefined>): GoMapValue<gostring, RuntimeSlice<{
        value: ExportSpecifier__from_ast;
    } | undefined>> => {
        return $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$ExportSpecifier.make(0, []);
    }, ($argument0: {
        value: ExportSpecifier__from_ast;
    } | undefined): {
        value: ExportSpecifier__from_ast;
    } | undefined => {
        return $argument0;
    }, (): {
        value: ExportSpecifier__from_ast;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function MultiMap$Add$string$int($argument0: MultiMap__from_collections<gostring, int> | undefined, $argument1: gostring, $argument2: int): void {
    return MultiMap__from_collections.Add$kernel<gostring, int>($argument0, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: RuntimeSlice<int>): GoMapValue<gostring, RuntimeSlice<int>> => {
        return $goMap$MapOf_string_To_SliceOf_int.make(0, []);
    }, ($argument0: int): int => {
        return $argument0;
    }, (): int => {
        return 0;
    }, $argument1, $argument2);
}
