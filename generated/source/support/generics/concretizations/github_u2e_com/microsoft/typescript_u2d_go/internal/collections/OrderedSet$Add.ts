import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { OrderedSet as OrderedSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_set.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_PointerTo_Named_printer$EmitHelper_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function OrderedSet$Add$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    return OrderedSet__from_collections.Add$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument1);
}
export function OrderedSet$Add$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
    return OrderedSet__from_collections.Add$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument1);
}
export function OrderedSet$Add$PointerTo_Named_printer$EmitHelper($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<{
    value: EmitHelper__from_printer;
} | undefined>> | undefined, $argument1: {
    value: EmitHelper__from_printer;
} | undefined): void {
    return OrderedSet__from_collections.Add$kernel<{
        value: EmitHelper__from_printer;
    } | undefined>($argument0, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<{
        value: EmitHelper__from_printer;
    } | undefined, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, (): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function OrderedSet$Add$string($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<gostring>> | undefined, $argument1: gostring): void {
    return OrderedSet__from_collections.Add$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<gostring, GoEmptyStruct> => {
        return $goMap$MapOf_string_To_Struct_void.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument1);
}
