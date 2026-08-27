import type { Value as Value__from_jsontext } from "../../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/value.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../interface-contracts.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { AppendUnquote$kernel as AppendUnquote$kernel__from_jsontext } from "../../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/quote.js";
export function AppendUnquote$Named_jsontext$Value($argument0: RuntimeSlice<uint8>, $argument1: Value__from_jsontext): [
    RuntimeSlice<uint8>,
    GoInterface | undefined
] {
    return AppendUnquote$kernel__from_jsontext<Value__from_jsontext>(($argument0: Value__from_jsontext): RuntimeSlice<uint8> => {
        return $argument0.$value;
    }, $argument0, $argument1);
}
