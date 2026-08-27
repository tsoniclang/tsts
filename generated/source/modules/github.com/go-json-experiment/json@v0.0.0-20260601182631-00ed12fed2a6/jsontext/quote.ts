import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { uint64, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Flags as Flags__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { AppendQuote as AppendQuote__from_jsonwire, AppendUnquote as AppendUnquote__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $goInterfaceAdapter$PointerTo_Named_jsontext$SyntacticError as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { nonComparable, requireKeyedLiterals } from "./doc.js";
import { SyntacticError } from "./errors.js";
import { Pointer } from "./state.js";
import { GoArray } from "@gotots/runtime/array.js";
export function AppendQuote$kernel<Bytes>($go$convert$T0_to_SliceOf_byte: ($0: Bytes) => RuntimeSlice<uint8>, dst: RuntimeSlice<uint8>, src: Bytes): [
    RuntimeSlice<uint8>,
    GoInterface | undefined
] {
    const __gotots_results_0 = AppendQuote__from_jsonwire(dst, $go$convert$T0_to_SliceOf_byte(src), tsonicTypeScriptRuntime.location<Flags__from_jsonflags>(Flags__from_jsonflags.$fromStorage({
        Presence: 0n,
        Values: 0n
    })));
    dst = __gotots_results_0[0];
    let err: GoInterface | undefined = __gotots_results_0[1];
    if (!(err === undefined)) {
        err = new GoInterfaceAdapter({ value: new SyntacticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), 0n, new Pointer(""), err) });
    }
    return [dst, err];
}
export function AppendUnquote$kernel<Bytes>($go$convert$T0_to_SliceOf_byte: ($0: Bytes) => RuntimeSlice<uint8>, dst: RuntimeSlice<uint8>, src: Bytes): [
    RuntimeSlice<uint8>,
    GoInterface | undefined
] {
    const __gotots_results_1 = AppendUnquote__from_jsonwire(dst, $go$convert$T0_to_SliceOf_byte(src));
    dst = __gotots_results_1[0];
    let err: GoInterface | undefined = __gotots_results_1[1];
    if (!(err === undefined)) {
        err = new GoInterfaceAdapter({ value: new SyntacticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), 0n, new Pointer(""), err) });
    }
    return [dst, err];
}
