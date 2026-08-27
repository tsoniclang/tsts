import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Decoder as Decoder__from_jsontext } from "../../../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/decode.js";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import type { ExportsOrImports$Storage as ExportsOrImports__from_packagejson$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
import type { JSONValue$Storage as JSONValue__from_packagejson$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/jsonvalue.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { ExportsOrImports as ExportsOrImports__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
import { JSONValue as JSONValue__from_packagejson, unmarshalJSONValueV2$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/jsonvalue.js";
import { $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Named_packagejson$ExportsOrImports, $goInterfaceAdapter$PointerTo_Named_packagejson$ExportsOrImports, $goInterfaceAdapter$PointerTo_Named_packagejson$JSONValue, $goInterfaceAdapter$SliceOf_Named_packagejson$ExportsOrImports, $goInterfaceAdapter$SliceOf_Named_packagejson$JSONValue, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Named_packagejson$JSONValue as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $goMap$MapOf_string_To_Named_packagejson$ExportsOrImports, $goMap$MapOf_string_To_Named_packagejson$JSONValue as GoMap } from "../../../../../../../maps.js";
export function unmarshalJSONValueV2$Named_packagejson$ExportsOrImports($argument0: tsonicTypeScriptRuntime.Location<JSONValue__from_packagejson> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): GoInterface | undefined {
    return unmarshalJSONValueV2$kernel<ExportsOrImports__from_packagejson>(($argument0: ExportsOrImports__from_packagejson): ExportsOrImports__from_packagejson => {
        return ExportsOrImports__from_packagejson.$copy($argument0);
    }, ($argument0: ExportsOrImports__from_packagejson$Storage): ExportsOrImports__from_packagejson => {
        return ExportsOrImports__from_packagejson.$fromStorage($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Named_packagejson$ExportsOrImports($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<ExportsOrImports__from_packagejson> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_packagejson$ExportsOrImports($argument0);
    }, ($argument0: RuntimeSlice<ExportsOrImports__from_packagejson$Storage>): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$SliceOf_Named_packagejson$ExportsOrImports($argument0);
    }, ($argument0: ExportsOrImports__from_packagejson): ExportsOrImports__from_packagejson$Storage => {
        return ExportsOrImports__from_packagejson.$storageOf($argument0);
    }, (): ExportsOrImports__from_packagejson => {
        return ExportsOrImports__from_packagejson.$zero();
    }, (): GoMapValue<gostring, ExportsOrImports__from_packagejson> => {
        return $goMap$MapOf_string_To_Named_packagejson$ExportsOrImports.nil();
    }, $argument0, $argument1);
}
export function unmarshalJSONValueV2$Named_packagejson$JSONValue($argument0: tsonicTypeScriptRuntime.Location<JSONValue__from_packagejson> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): GoInterface | undefined {
    return unmarshalJSONValueV2$kernel<JSONValue__from_packagejson>(($argument0: JSONValue__from_packagejson): JSONValue__from_packagejson => {
        return JSONValue__from_packagejson.$copy($argument0);
    }, ($argument0: JSONValue__from_packagejson$Storage): JSONValue__from_packagejson => {
        return JSONValue__from_packagejson.$fromStorage($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, JSONValue__from_packagejson>> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<JSONValue__from_packagejson> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_packagejson$JSONValue($argument0);
    }, ($argument0: RuntimeSlice<JSONValue__from_packagejson$Storage>): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$SliceOf_Named_packagejson$JSONValue($argument0);
    }, ($argument0: JSONValue__from_packagejson): JSONValue__from_packagejson$Storage => {
        return JSONValue__from_packagejson.$storageOf($argument0);
    }, (): JSONValue__from_packagejson => {
        return JSONValue__from_packagejson.$zero();
    }, (): GoMapValue<gostring, JSONValue__from_packagejson> => {
        return GoMap.nil();
    }, $argument0, $argument1);
}
