import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, int64, int as int__from_gotots_support, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/state.js";
import { $goInterfaceAdapter$PointerTo_Named_bufio$Reader, $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$int, $goInterfaceAdapter$int64, $goInterfaceAdapter$PointerTo_Named_bufio$Writer as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $goProviderState$Named_bufio$Writer, $goProviderState$Named_bufio$Reader as GoProviderState } from "../../../../../../support/provider-stateful-representations.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as provider_bufio_reader from "@gotots/gostdlib/internal/facets/provider-bufio-reader.js";
import * as provider_bufio_writer from "@gotots/gostdlib/internal/facets/provider-bufio-writer.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as provider_io_read from "@gotots/gostdlib/internal/facets/provider-io-read.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class Reader {
    declare private readonly $goType: void;
    public constructor(public r: tsonicTypeScriptRuntime.Location<GoProviderState> | undefined) {
    }
    static $copy($source: Reader): Reader {
        return new Reader($source.r);
    }
    static $equal($left: Reader, $right: Reader): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.r, $right.r);
    }
    static $hash($source: Reader): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.r));
        return $hash;
    }
    declare private readonly then?: never;
    static Read(r: {
        value: Reader;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let contentLength = 0n;
        for (;;) {
            const __gotots_receiver_2: Reader["r"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r;
            const __gotots_results_4 = GoProviderState.ReadBytes(__gotots_receiver_2 === void 0 ? void 0 :
                (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<GoProviderState>).value, 10);
            const __gotots_results_5 = [__gotots_results_4[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_4[1])] satisfies [
                RuntimeSlice<uint8>,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let line = __gotots_results_5[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_5[1];
            if (!(err === undefined)) {
                const __gotots_argument_5 = err;
                const __gotots_argument_6 = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
                if (provider_error.ErrorsIsDirect(__gotots_argument_5, __gotots_argument_6, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                    return [RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF)];
                }
                return [RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("jsonrpc: read header: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
            }
            const __gotots_argument_7 = line;
            const __gotots_conversion_2 = "\r\n";
            const __gotots_conversion_3 = RuntimeSlice.make<uint8>(__gotots_conversion_2.length, null, 0);
            for (let __gotots_conversion_4 = 0; __gotots_conversion_4 < __gotots_conversion_2.length; __gotots_conversion_4++) {
                __gotots_conversion_3.set(__gotots_conversion_4, __gotots_conversion_2.charCodeAt(__gotots_conversion_4));
            }
            const __gotots_argument_8 = __gotots_conversion_3;
            if (bytes__from_gostdlib.Equal(__gotots_argument_7, __gotots_argument_8)) {
                break;
            }
            const __gotots_argument_9 = line;
            const __gotots_conversion_5 = ":";
            const __gotots_conversion_6 = RuntimeSlice.make<uint8>(__gotots_conversion_5.length, null, 0);
            for (let __gotots_conversion_7 = 0; __gotots_conversion_7 < __gotots_conversion_5.length; __gotots_conversion_7++) {
                __gotots_conversion_6.set(__gotots_conversion_7, __gotots_conversion_5.charCodeAt(__gotots_conversion_7));
            }
            const __gotots_argument_10 = __gotots_conversion_6;
            const __gotots_results_7 = bytes__from_gostdlib.Cut(__gotots_argument_9, __gotots_argument_10);
            let key = __gotots_results_7[0];
            let value = __gotots_results_7[1];
            let ok = __gotots_results_7[2];
            if (!ok) {
                return [RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: %q", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$state.ErrInvalidHeader, new $goInterfaceAdapter$SliceOf_byte(line)])))];
            }
            const __gotots_argument_11 = key;
            const __gotots_conversion_8 = "Content-Length";
            const __gotots_conversion_9 = RuntimeSlice.make<uint8>(__gotots_conversion_8.length, null, 0);
            for (let __gotots_conversion_10 = 0; __gotots_conversion_10 < __gotots_conversion_8.length; __gotots_conversion_10++) {
                __gotots_conversion_9.set(__gotots_conversion_10, __gotots_conversion_8.charCodeAt(__gotots_conversion_10));
            }
            const __gotots_argument_12 = __gotots_conversion_9;
            if (bytes__from_gostdlib.Equal(__gotots_argument_11, __gotots_argument_12)) {
                const __gotots_conversion_11 = bytes__from_gostdlib.TrimSpace(value);
                let __gotots_conversion_12 = "";
                for (let __gotots_conversion_13 = 0; __gotots_conversion_13 < __gotots_conversion_11.length; __gotots_conversion_13++) {
                    __gotots_conversion_12 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_11.get(__gotots_conversion_13)));
                }
                const __gotots_argument_13 = __gotots_conversion_12;
                const __gotots_argument_14 = 10;
                const __gotots_argument_15 = 64;
                const __gotots_results_8 = strconv__from_gostdlib.ParseInt(__gotots_argument_13, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_14)), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_15)));
                const __gotots_results_9 = [__gotots_results_8[0], GoProviderInterfaceBridge.$from(__gotots_results_8[1])] satisfies [
                    int64,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ];
                contentLength = __gotots_results_9[0];
                err = __gotots_results_9[1];
                if (!(err === undefined)) {
                    return [RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: parse error: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$state.ErrInvalidContentLength, err])))];
                }
                if (contentLength < 0n) {
                    return [RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: negative value %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$state.ErrInvalidContentLength, new $goInterfaceAdapter$int64(contentLength)])))];
                }
            }
        }
        if (contentLength <= 0n) {
            return [RuntimeSlice.nil<uint8>(), $state.ErrNoContentLength];
        }
        let data = RuntimeSlice.make<uint8>(contentLength, null, 0);
        {
            const __gotots_argument_16 = new $goInterfaceAdapter$PointerTo_Named_bufio$Reader((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r);
            const __gotots_argument_17 = data;
            const __gotots_results_10 = provider_io_read.IoReadFullDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_16), __gotots_argument_17, $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF)), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)));
            const __gotots_results_11 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_10[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_10[1])] satisfies [
                int__from_gotots_support,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_11[1];
            if (!(err === undefined)) {
                return [RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("jsonrpc: read content: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
            }
        }
        return [data, void 0];
    }
}
export function NewReader(r: GoInterface | undefined): {
    value: Reader;
} | undefined {
    const __gotots_argument_0 = r;
    const __gotots_conversion_0 = provider_bufio_reader.NewReaderDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrNoProgress)));
    const __gotots_field_0 = __gotots_conversion_0 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<GoProviderState>(__gotots_conversion_0, (): GoProviderState => {
            return __gotots_conversion_0;
        }, ($go$providerPointerValue: GoProviderState): void => {
            GoProviderState.$assign(__gotots_conversion_0, $go$providerPointerValue);
        });
    return { value: new Reader(__gotots_field_0) };
}
export class Writer {
    declare private readonly $goType: void;
    public constructor(public w: tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer> | undefined) {
    }
    static $copy($source: Writer): Writer {
        return new Writer($source.w);
    }
    static $equal($left: Writer, $right: Writer): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.w, $right.w);
    }
    static $hash($source: Writer): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.w));
        return $hash;
    }
    declare private readonly then?: never;
    static Write(w: {
        value: Writer;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        {
            const __gotots_argument_2 = new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w);
            const __gotots_argument_3 = "Content-Length: %d\r\n\r\n";
            const __gotots_argument_4 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(data.length)]);
            const __gotots_results_0 = provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract>($goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct.$to(__gotots_argument_2), __gotots_argument_3, __gotots_argument_4);
            const __gotots_results_1 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_0[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_0[1])] satisfies [
                int__from_gotots_support,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
            if (!(err === undefined)) {
                return err;
            }
        }
        {
            const __gotots_receiver_0: Writer["w"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
            const __gotots_results_2 = $goProviderState$Named_bufio$Writer.Write(__gotots_receiver_0 === void 0 ? void 0 :
                (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value, data);
            const __gotots_results_3 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_2[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_2[1])] satisfies [
                int__from_gotots_support,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
            if (!(err === undefined)) {
                return err;
            }
        }
        const __gotots_receiver_1: Writer["w"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($goProviderState$Named_bufio$Writer.Flush(__gotots_receiver_1 === void 0 ? void 0 :
            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value));
    }
}
export function NewWriter(w: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): {
    value: Writer;
} | undefined {
    const __gotots_argument_1 = w;
    const __gotots_conversion_1 = provider_bufio_writer.NewWriterDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract>($goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct.$to(__gotots_argument_1), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrShortWrite)));
    const __gotots_field_1 = __gotots_conversion_1 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<$goProviderState$Named_bufio$Writer>(__gotots_conversion_1, (): $goProviderState$Named_bufio$Writer => {
            return __gotots_conversion_1;
        }, ($go$providerPointerValue: $goProviderState$Named_bufio$Writer): void => {
            $goProviderState$Named_bufio$Writer.$assign(__gotots_conversion_1, $go$providerPointerValue);
        });
    return { value: new Writer(__gotots_field_1) };
}
