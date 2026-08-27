import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { NewInvalidEscapeSequenceError$kernel } from "../../../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/wire.js";
export function NewInvalidEscapeSequenceError$SliceOf_byte($argument0: RuntimeSlice<uint8>): GoInterface | undefined {
    return NewInvalidEscapeSequenceError$kernel<RuntimeSlice<uint8>>(($argument0: RuntimeSlice<uint8>): gostring => {
        const __gotots_conversion_0 = $argument0;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        return __gotots_conversion_1;
    }, ($argument0: RuntimeSlice<uint8>): int => {
        return $argument0.length;
    }, $argument0);
}
