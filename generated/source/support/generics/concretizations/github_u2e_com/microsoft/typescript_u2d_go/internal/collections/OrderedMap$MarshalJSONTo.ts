import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Encoder as Encoder__from_jsontext } from "../../../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/encode.js";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as reflect from "@gotots/gostdlib/reflect.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { ExportsOrImports as ExportsOrImports__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
import { JSONValue as JSONValue__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/jsonvalue.js";
import { $goInterfaceAdapter$Named_packagejson$ExportsOrImports, $goInterfaceAdapter$Named_packagejson$JSONValue, $goInterfaceAdapter$PointerTo_Named_ast$Node, $goInterfaceAdapter$PointerTo_Named_printer$EmitHelper, $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$Struct_void, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $goReflectType$PointerTo_Named_ast$Node, $goReflectType$PointerTo_Named_printer$EmitHelper, $goReflectType$string } from "../../../../../../../reflection-types.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function OrderedMap$MarshalJSONTo$PointerTo_Named_ast$Node$Struct_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.MarshalJSONTo$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoInterface | undefined => {
        return new $goInterfaceAdapter$Struct_void((void GoEmptyStruct.$copy,
            $argument0));
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ast$Node($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> | undefined): reflect.Type | undefined => {
        return $goReflectType$PointerTo_Named_ast$Node;
    }, $argument1);
}
export function OrderedMap$MarshalJSONTo$PointerTo_Named_printer$EmitHelper$Struct_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<{
    value: EmitHelper__from_printer;
} | undefined, GoEmptyStruct>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.MarshalJSONTo$kernel<{
        value: EmitHelper__from_printer;
    } | undefined, GoEmptyStruct>($argument0, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoInterface | undefined => {
        return new $goInterfaceAdapter$Struct_void((void GoEmptyStruct.$copy,
            $argument0));
    }, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_printer$EmitHelper($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<{
        value: EmitHelper__from_printer;
    } | undefined> | undefined): reflect.Type | undefined => {
        return $goReflectType$PointerTo_Named_printer$EmitHelper;
    }, $argument1);
}
export function OrderedMap$MarshalJSONTo$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.MarshalJSONTo$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: gostring): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): reflect.Type | undefined => {
        return $goReflectType$string;
    }, $argument1);
}
export function OrderedMap$MarshalJSONTo$string$Named_packagejson$ExportsOrImports($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.MarshalJSONTo$kernel<gostring, ExportsOrImports__from_packagejson>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: ExportsOrImports__from_packagejson): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_packagejson$ExportsOrImports(ExportsOrImports__from_packagejson.$copy($argument0));
    }, ($argument0: gostring): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): reflect.Type | undefined => {
        return $goReflectType$string;
    }, $argument1);
}
export function OrderedMap$MarshalJSONTo$string$Named_packagejson$JSONValue($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, JSONValue__from_packagejson>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.MarshalJSONTo$kernel<gostring, JSONValue__from_packagejson>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: JSONValue__from_packagejson): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_packagejson$JSONValue(JSONValue__from_packagejson.$copy($argument0));
    }, ($argument0: gostring): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): reflect.Type | undefined => {
        return $goReflectType$string;
    }, $argument1);
}
export function OrderedMap$MarshalJSONTo$string$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.MarshalJSONTo$kernel<gostring, RuntimeSlice<gostring>>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): GoInterface | undefined => {
        return new $goInterfaceAdapter$SliceOf_string($argument0);
    }, ($argument0: gostring): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): reflect.Type | undefined => {
        return $goReflectType$string;
    }, $argument1);
}
