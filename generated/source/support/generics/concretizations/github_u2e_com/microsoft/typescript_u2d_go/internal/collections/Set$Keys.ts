import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import { $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function Set$Keys$Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<DocumentUri__from_lsproto>> | undefined): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> {
    return Set__from_collections.Keys$kernel<DocumentUri__from_lsproto>($argument0, (): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
        return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
    });
}
export function Set$Keys$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): GoMapValue<Path__from_tspath, GoEmptyStruct> {
    return Set__from_collections.Keys$kernel<Path__from_tspath>($argument0, (): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.nil();
    });
}
export function Set$Keys$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> {
    return Set__from_collections.Keys$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, (): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil();
    });
}
export function Set$Keys$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): GoMapValue<gostring, GoEmptyStruct> {
    return Set__from_collections.Keys$kernel<gostring>($argument0, (): GoMapValue<gostring, GoEmptyStruct> => {
        return $goMap$MapOf_string_To_Struct_void.nil();
    });
}
