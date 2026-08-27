import type { Value as Value__from_jsontext } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/value.js";
import type { int, int64, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { len64$kernel } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/arshal_default.js";
export function len64$Named_jsontext$Value($argument0: Value__from_jsontext): int64 {
    return len64$kernel<Value__from_jsontext>(($argument0: Value__from_jsontext): int => {
        return $argument0.$value.length;
    }, $argument0);
}
export function len64$SliceOf_byte($argument0: RuntimeSlice<uint8>): int64 {
    return len64$kernel<RuntimeSlice<uint8>>(($argument0: RuntimeSlice<uint8>): int => {
        return $argument0.length;
    }, $argument0);
}
