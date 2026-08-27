import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import { Deterministic as Deterministic__from_json, MarshalEncode as MarshalEncode__from_json, MarshalWrite as MarshalWrite__from_json, Marshal as Marshal__from_json, UnmarshalDecode as UnmarshalDecode__from_json, UnmarshalRead as UnmarshalRead__from_json, Unmarshal as Unmarshal__from_json } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/package.js";
import { AllowDuplicateNames as AllowDuplicateNames__from_jsontext, NewDecoder as NewDecoder__from_jsontext, WithIndentPrefix as WithIndentPrefix__from_jsontext, WithIndent as WithIndent__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/state.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function Marshal(__go_in: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): [
    RuntimeSlice<uint8>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __go_out: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    if (opts.length === 0) {
        opts = $state.allowInvalid;
    }
    else {
        opts = goSliceAppendSlice<Options__from_jsonopts | undefined>($state.allowInvalid, opts, void 0);
    }
    return Marshal__from_json(__go_in, opts);
}
export function MarshalEncode(__go_out: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined, __go_in: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    if (opts.length === 0) {
        opts = $state.allowInvalid;
    }
    else {
        opts = goSliceAppendSlice<Options__from_jsonopts | undefined>($state.allowInvalid, opts, void 0);
    }
    return MarshalEncode__from_json(__go_out, __go_in, opts);
}
export function MarshalWrite(__go_out: GoInterface | undefined, __go_in: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    if (opts.length === 0) {
        opts = $state.allowInvalid;
    }
    else {
        opts = goSliceAppendSlice<Options__from_jsonopts | undefined>($state.allowInvalid, opts, void 0);
    }
    return MarshalWrite__from_json(__go_out, __go_in, opts);
}
export function MarshalIndent(__go_in: $goInterface$Interface_void | undefined, prefix: gostring, indent: gostring): [
    RuntimeSlice<uint8>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __go_out: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    if (prefix === "" && indent === "") {
        return Marshal(__go_in, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    return Marshal(__go_in, RuntimeSlice.literal<Options__from_jsonopts | undefined>([WithIndentPrefix__from_jsontext(prefix), WithIndent__from_jsontext(indent)]));
}
export function MarshalIndentWrite(__go_out: GoInterface | undefined, __go_in: $goInterface$Interface_void | undefined, prefix: gostring, indent: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    if (prefix === "" && indent === "") {
        return MarshalWrite(__go_out, __go_in, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    return MarshalWrite(__go_out, __go_in, RuntimeSlice.literal<Options__from_jsonopts | undefined>([WithIndentPrefix__from_jsontext(prefix), WithIndent__from_jsontext(indent)]));
}
export function Unmarshal(__go_in: RuntimeSlice<uint8>, __go_out: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    return Unmarshal__from_json(__go_in, __go_out, opts);
}
export function UnmarshalDecode(__go_in: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined, __go_out: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    return UnmarshalDecode__from_json(__go_in, __go_out, opts);
}
export function UnmarshalRead(__go_in: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, __go_out: $goInterface$Interface_void | undefined, opts: RuntimeSlice<Options__from_jsonopts | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    return UnmarshalRead__from_json(__go_in, __go_out, opts);
}
export function AllowDuplicateNames(allow: bool): Options__from_jsonopts | undefined {
    return AllowDuplicateNames__from_jsontext(allow);
}
export function Deterministic(v: bool): Options__from_jsonopts | undefined {
    return Deterministic__from_json(v);
}
export function NewDecoder(r: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined {
    return NewDecoder__from_jsontext(r, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
}
