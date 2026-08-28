import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { NotForPublicUse$Storage as NotForPublicUse__from_internal$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../support/interface-contracts.js";
import type { Decoder, decoderState } from "./decode.js";
import type { Encoder, encoderState } from "./encode.js";
import type { ioError } from "./errors.js";
import type { bool, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $state as $state__internal, NotForPublicUse as NotForPublicUse__from_internal } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_jsontext$ioError as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { getBufferedDecoder, getBufferedEncoder, getStreamingDecoder, getStreamingEncoder, putBufferedDecoder, putBufferedEncoder, putStreamingDecoder, putStreamingEncoder } from "./pools.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type exporter$Storage = {};
export class exporter {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: exporter$Storage) {
    }
    public static $storageOf($source: exporter): exporter$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: exporter$Storage): exporter {
        return new exporter($source);
    }
    static $zero(): exporter {
        return new exporter({});
    }
    declare private readonly then?: never;
    Export(p: tsonicTypeScriptRuntime.Location<NotForPublicUse__from_internal> | undefined): __go_export {
        if (!tsonicTypeScriptRuntime.sameLocation(p, tsonicTypeScriptRuntime.projectLocation<NotForPublicUse__from_internal$Storage, NotForPublicUse__from_internal>(tsonicTypeScriptRuntime.propertyLocation($state__internal, "AllowInternalUse"), NotForPublicUse__from_internal.$fromStorage, NotForPublicUse__from_internal.$storageOf))) {
            const __gotots_argument_0 = new $goInterfaceAdapter$string("unauthorized call to Export");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        return __go_export.$fromStorage({});
    }
}
export type __go_export$Storage = {};
export class __go_export {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: __go_export$Storage) {
    }
    public static $storageOf($source: __go_export): __go_export$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: __go_export$Storage): __go_export {
        return new __go_export($source);
    }
    static $zero(): __go_export {
        return new __go_export({});
    }
    static $copy($source: __go_export): __go_export {
        return new __go_export({});
    }
    declare private readonly then?: never;
    Decoder(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): tsonicTypeScriptRuntime.Location<decoderState> | undefined {
        const __gotots_store_1 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Decoder>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "s");
    }
    Encoder(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): tsonicTypeScriptRuntime.Location<encoderState> | undefined {
        const __gotots_store_0 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Encoder>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "s");
    }
    GetBufferedDecoder(b: RuntimeSlice<uint8>, o: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Decoder> | undefined {
        return getBufferedDecoder(b, o);
    }
    GetBufferedEncoder(o: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Encoder> | undefined {
        return getBufferedEncoder(o);
    }
    GetStreamingDecoder(r: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, o: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Decoder> | undefined {
        return getStreamingDecoder(r, o);
    }
    GetStreamingEncoder(w: GoInterface | undefined, o: RuntimeSlice<Options__from_jsonopts | undefined>): tsonicTypeScriptRuntime.Location<Encoder> | undefined {
        return getStreamingEncoder(w, o);
    }
    IsIOError(err: $goInterface$Interface_Method_Error_void_to_string | undefined): bool {
        const __gotots_results_0 = (($value: $goInterface$Interface_Method_Error_void_to_string | undefined): [
            {
                value: ioError;
            } | undefined,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(err);
        let ok = __gotots_results_0[1];
        return ok;
    }
    PutBufferedDecoder(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): void {
        putBufferedDecoder(d);
    }
    PutBufferedEncoder(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): void {
        putBufferedEncoder(e);
    }
    PutStreamingDecoder(d: tsonicTypeScriptRuntime.Location<Decoder> | undefined): void {
        putStreamingDecoder(d);
    }
    PutStreamingEncoder(e: tsonicTypeScriptRuntime.Location<Encoder> | undefined): void {
        putStreamingEncoder(e);
    }
}
