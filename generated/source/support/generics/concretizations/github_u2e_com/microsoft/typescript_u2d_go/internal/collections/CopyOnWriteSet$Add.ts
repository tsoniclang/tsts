import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SymbolId as SymbolId__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ids.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { CopyOnWriteSet as CopyOnWriteSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/cow.js";
import { $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_ast$SymbolId_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function CopyOnWriteSet$Add$Named_ast$SymbolId($argument0: tsonicTypeScriptRuntime.Location<CopyOnWriteSet__from_collections<SymbolId__from_ast>> | undefined, $argument1: SymbolId__from_ast): void {
    return CopyOnWriteSet__from_collections.Add$kernel<SymbolId__from_ast>($argument0, ($argument0: GoMapValue<SymbolId__from_ast, GoEmptyStruct>): GoMapValue<SymbolId__from_ast, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: SymbolId__from_ast): SymbolId__from_ast => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<SymbolId__from_ast, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, $argument1);
}
export function CopyOnWriteSet$Add$string($argument0: tsonicTypeScriptRuntime.Location<CopyOnWriteSet__from_collections<gostring>> | undefined, $argument1: gostring): void {
    return CopyOnWriteSet__from_collections.Add$kernel<gostring>($argument0, ($argument0: GoMapValue<gostring, GoEmptyStruct>): GoMapValue<gostring, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<gostring, GoEmptyStruct> => {
        return $goMap$MapOf_string_To_Struct_void.make(0, []);
    }, $argument1);
}
