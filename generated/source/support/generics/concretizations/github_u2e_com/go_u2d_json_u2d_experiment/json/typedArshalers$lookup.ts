import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { addressableValue as addressableValue__from_json } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/arshal.js";
import type { Struct as Struct__from_jsonopts } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/options.js";
import type { Decoder as Decoder__from_jsontext } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/decode.js";
import type { Encoder as Encoder__from_jsontext } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/encode.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../interface-contracts.js";
import type * as reflect from "@gotots/gostdlib/reflect.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { typedArshalers as typedArshalers__from_json } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/arshal_funcs.js";
import { $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error, $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error as GoInterfaceAdapter } from "../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function typedArshalers$lookup$Named_jsontext$Decoder($argument0: tsonicTypeScriptRuntime.Location<typedArshalers__from_json<Decoder__from_jsontext>> | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined, $argument2: reflect.Type | undefined): [
    (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined,
    bool
] {
    return typedArshalers__from_json.$go$private$json$lookup$kernel<Decoder__from_jsontext>($argument0, ($argument0: (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error($argument0);
    }, ($argument0: GoInterfaceValue | undefined): (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined => {
        return (($value: GoInterfaceValue | undefined): (($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_jsontext$Decoder_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: RuntimeSlice<(($0: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined>): int => {
        return $argument0.length;
    }, $argument1, $argument2);
}
export function typedArshalers$lookup$Named_jsontext$Encoder($argument0: tsonicTypeScriptRuntime.Location<typedArshalers__from_json<Encoder__from_jsontext>> | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined, $argument2: reflect.Type | undefined): [
    (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined,
    bool
] {
    return typedArshalers__from_json.$go$private$json$lookup$kernel<Encoder__from_jsontext>($argument0, ($argument0: (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: GoInterfaceValue | undefined): (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined => {
        return (($value: GoInterfaceValue | undefined): (($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: RuntimeSlice<(($0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, $1: addressableValue__from_json, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined>): int => {
        return $argument0.length;
    }, $argument1, $argument2);
}
