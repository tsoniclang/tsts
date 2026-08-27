import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { NewInvalidCharacterError$kernel } from "../../../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/wire.js";
import { Value as Value__from_jsontext } from "../../../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/value.js";
export function NewInvalidCharacterError$Named_jsontext$Value($argument0: Value__from_jsontext, $argument1: gostring): GoInterface | undefined {
    return NewInvalidCharacterError$kernel<Value__from_jsontext>(($argument0: Value__from_jsontext): gostring => {
        const __gotots_conversion_0 = $argument0.$value;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        return __gotots_conversion_1;
    }, ($argument0: Value__from_jsontext): RuntimeSlice<uint8> => {
        return $argument0.$value;
    }, ($argument0: Value__from_jsontext, $argument1: int, $argument2: int): Value__from_jsontext => {
        return new Value__from_jsontext($argument0.$value.slice($argument1, $argument2, null));
    }, $argument0, $argument1);
}
export function NewInvalidCharacterError$SliceOf_byte($argument0: RuntimeSlice<uint8>, $argument1: gostring): GoInterface | undefined {
    return NewInvalidCharacterError$kernel<RuntimeSlice<uint8>>(($argument0: RuntimeSlice<uint8>): gostring => {
        const __gotots_conversion_3 = $argument0;
        let __gotots_conversion_4 = "";
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
        }
        return __gotots_conversion_4;
    }, ($argument0: RuntimeSlice<uint8>): RuntimeSlice<uint8> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<uint8>, $argument1: int, $argument2: int): RuntimeSlice<uint8> => {
        return $argument0.slice($argument1, $argument2, null);
    }, $argument0, $argument1);
}
