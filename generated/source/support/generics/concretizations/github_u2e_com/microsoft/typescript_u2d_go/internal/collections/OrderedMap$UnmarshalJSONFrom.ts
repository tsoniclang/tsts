import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Decoder as Decoder__from_jsontext } from "../../../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/decode.js";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { ExportsOrImports as ExportsOrImports__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
import { JSONValue as JSONValue__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/jsonvalue.js";
import { $goInterfaceAdapter$PointerTo_Named_packagejson$ExportsOrImports, $goInterfaceAdapter$PointerTo_Named_packagejson$JSONValue, $goInterfaceAdapter$PointerTo_PointerTo_Named_ast$Node, $goInterfaceAdapter$PointerTo_PointerTo_Named_printer$EmitHelper, $goInterfaceAdapter$PointerTo_SliceOf_string, $goInterfaceAdapter$PointerTo_Struct_void, $goInterfaceAdapter$PointerTo_string, $goInterfaceAdapter$PointerTo_Interface_void as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_PointerTo_Named_printer$EmitHelper_To_Struct_void, $goMap$MapOf_string_To_Named_packagejson$ExportsOrImports, $goMap$MapOf_string_To_Named_packagejson$JSONValue, $goMap$MapOf_string_To_SliceOf_string, $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../../maps.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function OrderedMap$UnmarshalJSONFrom$PointerTo_Named_ast$Node$Struct_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.UnmarshalJSONFrom$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>($argument0, ($argument0: GoEmptyStruct): GoEmptyStruct => {
        return GoEmptyStruct.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<GoEmptyStruct> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Struct_void($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_ast$Node($argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, (): GoEmptyStruct => {
        return GoEmptyStruct.$zero();
    }, $argument1);
}
export function OrderedMap$UnmarshalJSONFrom$PointerTo_Named_printer$EmitHelper$Struct_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<{
    value: EmitHelper__from_printer;
} | undefined, GoEmptyStruct>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.UnmarshalJSONFrom$kernel<{
        value: EmitHelper__from_printer;
    } | undefined, GoEmptyStruct>($argument0, ($argument0: GoEmptyStruct): GoEmptyStruct => {
        return GoEmptyStruct.$copy($argument0);
    }, ($argument0: {
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
    }, ($argument0: tsonicTypeScriptRuntime.Location<GoEmptyStruct> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Struct_void($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<{
        value: EmitHelper__from_printer;
    } | undefined> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_printer$EmitHelper($argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<{
        value: EmitHelper__from_printer;
    } | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_printer$EmitHelper_To_Struct_void.make(0, []);
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
    }, (): GoEmptyStruct => {
        return GoEmptyStruct.$zero();
    }, $argument1);
}
export function OrderedMap$UnmarshalJSONFrom$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.UnmarshalJSONFrom$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<GoInterface | undefined> | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_string($argument0);
    }, ($argument0: GoInterface | undefined): GoMapValue<gostring, GoInterface | undefined> => {
        return GoMap.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument1);
}
export function OrderedMap$UnmarshalJSONFrom$string$Named_packagejson$ExportsOrImports($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.UnmarshalJSONFrom$kernel<gostring, ExportsOrImports__from_packagejson>($argument0, ($argument0: ExportsOrImports__from_packagejson): ExportsOrImports__from_packagejson => {
        return ExportsOrImports__from_packagejson.$copy($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ExportsOrImports__from_packagejson> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_packagejson$ExportsOrImports($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_string($argument0);
    }, ($argument0: ExportsOrImports__from_packagejson): GoMapValue<gostring, ExportsOrImports__from_packagejson> => {
        return $goMap$MapOf_string_To_Named_packagejson$ExportsOrImports.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): ExportsOrImports__from_packagejson => {
        return ExportsOrImports__from_packagejson.$zero();
    }, $argument1);
}
export function OrderedMap$UnmarshalJSONFrom$string$Named_packagejson$JSONValue($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, JSONValue__from_packagejson>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.UnmarshalJSONFrom$kernel<gostring, JSONValue__from_packagejson>($argument0, ($argument0: JSONValue__from_packagejson): JSONValue__from_packagejson => {
        return JSONValue__from_packagejson.$copy($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<JSONValue__from_packagejson> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_packagejson$JSONValue($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_string($argument0);
    }, ($argument0: JSONValue__from_packagejson): GoMapValue<gostring, JSONValue__from_packagejson> => {
        return $goMap$MapOf_string_To_Named_packagejson$JSONValue.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): JSONValue__from_packagejson => {
        return JSONValue__from_packagejson.$zero();
    }, $argument1);
}
export function OrderedMap$UnmarshalJSONFrom$string$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return OrderedMap__from_collections.UnmarshalJSONFrom$kernel<gostring, RuntimeSlice<gostring>>($argument0, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_SliceOf_string($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_string($argument0);
    }, ($argument0: RuntimeSlice<gostring>): GoMapValue<gostring, RuntimeSlice<gostring>> => {
        return $goMap$MapOf_string_To_SliceOf_string.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument1);
}
