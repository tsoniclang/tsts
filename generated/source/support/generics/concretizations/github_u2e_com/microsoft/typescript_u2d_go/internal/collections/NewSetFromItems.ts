import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/kind_generated.js";
import type { Signature as Signature__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { NewSetFromItems$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goMap$MapOf_Named_ast$Kind_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_PointerTo_Named_checker$Signature_To_Struct_void, $goMap$MapOf_int32_To_Struct_void, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function NewSetFromItems$Named_ast$Kind($argument0: RuntimeSlice<Kind__from_ast>): tsonicTypeScriptRuntime.Location<Set__from_collections<Kind__from_ast>> | undefined {
    return NewSetFromItems$kernel<Kind__from_ast>(($argument0: Kind__from_ast): Kind__from_ast => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<Kind__from_ast, GoEmptyStruct> => {
        return $goMap$MapOf_Named_ast$Kind_To_Struct_void.make(0, []);
    }, (): GoMapValue<Kind__from_ast, GoEmptyStruct> => {
        return $goMap$MapOf_Named_ast$Kind_To_Struct_void.nil();
    }, $argument0);
}
export function NewSetFromItems$Named_tspath$Path($argument0: RuntimeSlice<gostring>): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined {
    return NewSetFromItems$kernel<Path__from_tspath>(($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
    }, (): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
    }, $argument0);
}
export function NewSetFromItems$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>> | undefined {
    return NewSetFromItems$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_checker$Signature_To_Struct_void.make(0, []);
    }, (): GoMapValue<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_checker$Signature_To_Struct_void.nil();
    }, $argument0);
}
export function NewSetFromItems$int32($argument0: RuntimeSlice<int32>): tsonicTypeScriptRuntime.Location<Set__from_collections<int32>> | undefined {
    return NewSetFromItems$kernel<int32>(($argument0: int32): int32 => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<int32, GoEmptyStruct> => {
        return $goMap$MapOf_int32_To_Struct_void.make(0, []);
    }, (): GoMapValue<int32, GoEmptyStruct> => {
        return $goMap$MapOf_int32_To_Struct_void.nil();
    }, $argument0);
}
export function NewSetFromItems$string($argument0: RuntimeSlice<gostring>): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
    return NewSetFromItems$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, (): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.nil();
    }, $argument0);
}
