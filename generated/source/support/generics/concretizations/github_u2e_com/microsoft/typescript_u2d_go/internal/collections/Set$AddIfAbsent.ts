import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { SymbolId as SymbolId__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ids.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { FileIncludeReason as FileIncludeReason__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileInclude.js";
import type { projectReferenceParseTask as projectReferenceParseTask__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/projectreferenceparser.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import { fileRange as fileRange__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/definition.js";
import { Location as Location__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { $goMap$MapOf_Array2Of_Named_lsproto$DocumentUri_To_Struct_void, $goMap$MapOf_Named_ast$SymbolId_To_Struct_void, $goMap$MapOf_Named_ls$fileRange_To_Struct_void, $goMap$MapOf_Named_lsproto$Location_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_PointerTo_Named_compiler$FileIncludeReason_To_Struct_void, $goMap$MapOf_PointerTo_Named_compiler$projectReferenceParseTask_To_Struct_void, $goMap$MapOf_PointerTo_Named_project$Project_To_Struct_void, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function Set$AddIfAbsent$Array2Of_Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<GoArray<gostring, 2>>> | undefined, $argument1: GoArray<gostring, 2>): bool {
    return Set__from_collections.AddIfAbsent$kernel<GoArray<gostring, 2>>($argument0, ($argument0: GoArray<gostring, 2>): GoArray<gostring, 2> => {
        return $argument0.copy();
    }, ($argument0: GoEmptyStruct): GoMapValue<GoArray<gostring, 2>, GoEmptyStruct> => {
        return $goMap$MapOf_Array2Of_Named_lsproto$DocumentUri_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$Named_ast$SymbolId($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<SymbolId__from_ast>> | undefined, $argument1: SymbolId__from_ast): bool {
    return Set__from_collections.AddIfAbsent$kernel<SymbolId__from_ast>($argument0, ($argument0: SymbolId__from_ast): SymbolId__from_ast => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<SymbolId__from_ast, GoEmptyStruct> => {
        return $goMap$MapOf_Named_ast$SymbolId_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$Named_ls$fileRange($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<fileRange__from_ls>> | undefined, $argument1: fileRange__from_ls): bool {
    return Set__from_collections.AddIfAbsent$kernel<fileRange__from_ls>($argument0, ($argument0: fileRange__from_ls): fileRange__from_ls => {
        return fileRange__from_ls.$copy($argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<fileRange__from_ls, GoEmptyStruct> => {
        return $goMap$MapOf_Named_ls$fileRange_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$Named_lsproto$Location($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Location__from_lsproto>> | undefined, $argument1: Location__from_lsproto): bool {
    return Set__from_collections.AddIfAbsent$kernel<Location__from_lsproto>($argument0, ($argument0: Location__from_lsproto): Location__from_lsproto => {
        return Location__from_lsproto.$copy($argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<Location__from_lsproto, GoEmptyStruct> => {
        return $goMap$MapOf_Named_lsproto$Location_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, $argument1: Path__from_tspath): bool {
    return Set__from_collections.AddIfAbsent$kernel<Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Set__from_collections.AddIfAbsent$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return Set__from_collections.AddIfAbsent$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$PointerTo_Named_compiler$FileIncludeReason($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<{
    value: FileIncludeReason__from_compiler;
} | undefined>> | undefined, $argument1: {
    value: FileIncludeReason__from_compiler;
} | undefined): bool {
    return Set__from_collections.AddIfAbsent$kernel<{
        value: FileIncludeReason__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: FileIncludeReason__from_compiler;
    } | undefined): {
        value: FileIncludeReason__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<{
        value: FileIncludeReason__from_compiler;
    } | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_compiler$FileIncludeReason_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$PointerTo_Named_compiler$projectReferenceParseTask($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<{
    value: projectReferenceParseTask__from_compiler;
} | undefined>> | undefined, $argument1: {
    value: projectReferenceParseTask__from_compiler;
} | undefined): bool {
    return Set__from_collections.AddIfAbsent$kernel<{
        value: projectReferenceParseTask__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: projectReferenceParseTask__from_compiler;
    } | undefined): {
        value: projectReferenceParseTask__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<{
        value: projectReferenceParseTask__from_compiler;
    } | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_compiler$projectReferenceParseTask_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): bool {
    return Set__from_collections.AddIfAbsent$kernel<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_project$Project_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$AddIfAbsent$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $argument1: gostring): bool {
    return Set__from_collections.AddIfAbsent$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, $argument1);
}
