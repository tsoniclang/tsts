import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../support/interface-contracts.js";
import type { NotForPublicUse$Storage as NotForPublicUse__from_internal$Storage } from "../internal/package.js";
import type * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import type { gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import { stringSlice } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/arshal.js";
import { init } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/options.js";
import { __go_export as __go_export__from_jsontext, exporter as exporter__from_jsontext } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/export.js";
import { $goInterfaceAdapter$PointerTo_Named_json$stringSlice as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { $goReflectType$Interface_void, $goReflectType$MapOf_string_To_Interface_void, $goReflectType$Named_encoding$TextAppender, $goReflectType$Named_encoding$TextMarshaler, $goReflectType$Named_encoding$TextUnmarshaler, $goReflectType$Named_json$Marshaler, $goReflectType$Named_json$MarshalerTo, $goReflectType$Named_json$Unmarshaler, $goReflectType$Named_json$UnmarshalerFrom, $goReflectType$Named_json$isZeroer, $goReflectType$Named_jsontext$Value, $goReflectType$Named_time$Duration, $goReflectType$Named_time$Time, $goReflectType$SliceOf_Interface_void, $goReflectType$SliceOf_byte, $goReflectType$Struct_void, $goReflectType$bool, $goReflectType$float64, $goReflectType$string } from "../../../../../support/reflection-types.js";
import { $state as $state__internal, NotForPublicUse as NotForPublicUse__from_internal } from "../internal/package.js";
import { $state as $state__jsontext } from "../jsontext/package.js";
import { $state } from "./state.js";
import * as base32__from_gostdlib from "@gotots/gostdlib/encoding/base32.js";
import * as base64__from_gostdlib from "@gotots/gostdlib/encoding/base64.js";
import * as hex__from_gostdlib from "@gotots/gostdlib/encoding/hex.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_encoding_base32 from "@gotots/gostdlib/internal/facets/provider-encoding-base32.js";
import * as provider_encoding_base64 from "@gotots/gostdlib/internal/facets/provider-encoding-base64.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function $initialize(): void {
    $state.ErrUnknownName = void 0;
    $state.allMarshalerTypes = RuntimeSlice.nil<reflect__from_gostdlib.Type | undefined>();
    $state.allMethodTypes = RuntimeSlice.nil<reflect__from_gostdlib.Type | undefined>();
    $state.allUnmarshalerTypes = RuntimeSlice.nil<reflect__from_gostdlib.Type | undefined>();
    $state.anyType = void 0;
    $state.appendDecodeBase16 = void 0;
    $state.appendDecodeBase32 = void 0;
    $state.appendDecodeBase32Hex = void 0;
    $state.appendDecodeBase64 = void 0;
    $state.appendDecodeBase64URL = void 0;
    $state.appendEncodeBase16 = void 0;
    $state.appendEncodeBase32 = void 0;
    $state.appendEncodeBase32Hex = void 0;
    $state.appendEncodeBase64 = void 0;
    $state.appendEncodeBase64URL = void 0;
    $state.boolType = void 0;
    $state.bytesType = void 0;
    $state.emptyStructType = void 0;
    $state.encodedLenBase16 = void 0;
    $state.encodedLenBase32 = void 0;
    $state.encodedLenBase32Hex = void 0;
    $state.encodedLenBase64 = void 0;
    $state.encodedLenBase64URL = void 0;
    $state.errArrayOverflow = void 0;
    $state.errArrayUnderflow = void 0;
    $state.errChangingDuplicateNames = void 0;
    $state.errChangingInvalidUTF8 = void 0;
    $state.errChangingWhitespace = void 0;
    $state.errInaccurateDateUnits = void 0;
    $state.errInvalidStringTag = void 0;
    $state.errNilField = void 0;
    $state.errNoExportedFields = void 0;
    $state.errNonSingularValue = void 0;
    $state.errNonStringValue = void 0;
    $state.errRawInlinedNotObject = void 0;
    $state.errUnsupportedMutation = void 0;
    $state.errorModalVerb = void 0;
    $state.__go_export = __go_export__from_jsontext.$zeroStorage();
    $state.float64Type = void 0;
    $state.isZeroerType = void 0;
    $state.jsonMarshalerToType = void 0;
    $state.jsonMarshalerType = void 0;
    $state.jsonUnmarshalerFromType = void 0;
    $state.jsonUnmarshalerType = void 0;
    $state.jsontextValueType = void 0;
    $state.lookupArshalerCache = named_sync.SyncMapOperations.$zero();
    $state.mapStringAnyType = void 0;
    $state.sliceAnyType = void 0;
    $state.stringType = void 0;
    $state.stringsPools = void 0;
    $state.textAppenderType = void 0;
    $state.textMarshalerType = void 0;
    $state.textUnmarshalerType = void 0;
    $state.timeDurationType = void 0;
    $state.timeTimeType = void 0;
    {
        $state.errChangingDuplicateNames = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("cannot change duplicate name checks after a JSON object has already begun processing"));
    }
    {
        $state.errChangingInvalidUTF8 = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("cannot change UTF-8 checks after a JSON object has already begun processing"));
    }
    {
        $state.errChangingWhitespace = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("cannot change whitespace formatting within a MarshalEncode call"));
    }
    {
        $state.__go_export = __go_export__from_jsontext.$storageOf(exporter__from_jsontext.$fromStorage($state__jsontext.Internal).Export(tsonicTypeScriptRuntime.projectLocation<NotForPublicUse__from_internal$Storage, NotForPublicUse__from_internal>(tsonicTypeScriptRuntime.propertyLocation($state__internal, "AllowInternalUse"), NotForPublicUse__from_internal.$fromStorage, NotForPublicUse__from_internal.$storageOf)));
    }
    {
        const __gotots_field_0 = (): GoInterface | undefined => {
            return new GoInterfaceAdapter({ value: new stringSlice(RuntimeSlice.nil<gostring>()) });
        };
        const __gotots_struct_0 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_0.New = __gotots_field_0;
        $state.stringsPools =
            tsonicTypeScriptRuntime.location<sync__from_gostdlib.Pool>(__gotots_struct_0);
    }
    {
        $state.anyType = $goReflectType$Interface_void;
    }
    {
        $state.boolType = $goReflectType$bool;
    }
    {
        $state.stringType = $goReflectType$string;
    }
    {
        $state.float64Type = $goReflectType$float64;
    }
    {
        $state.mapStringAnyType = $goReflectType$MapOf_string_To_Interface_void;
    }
    {
        $state.sliceAnyType = $goReflectType$SliceOf_Interface_void;
    }
    {
        $state.bytesType = $goReflectType$SliceOf_byte;
    }
    {
        $state.emptyStructType = $goReflectType$Struct_void;
    }
    {
        $state.appendEncodeBase16 = hex__from_gostdlib.AppendEncode;
    }
    {
        const __gotots_conversion_0 = base32__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_0 = __gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base32__from_gostdlib.Encoding>(__gotots_conversion_0, (): base32__from_gostdlib.Encoding => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: base32__from_gostdlib.Encoding): void => {
                provider_encoding_base32.Base32EncodingOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            });
        const __gotots_receiver_1 = __gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<base32__from_gostdlib.Encoding>).value;
        $state.appendEncodeBase32 = ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): RuntimeSlice<uint8> => {
            return base32__from_gostdlib.Encoding.AppendEncode(__gotots_receiver_1, $argument0, $argument1);
        };
    }
    {
        const __gotots_conversion_1 = base32__from_gostdlib.state.HexEncoding;
        const __gotots_receiver_2 = __gotots_conversion_1 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base32__from_gostdlib.Encoding>(__gotots_conversion_1, (): base32__from_gostdlib.Encoding => {
                return __gotots_conversion_1;
            }, ($go$providerPointerValue: base32__from_gostdlib.Encoding): void => {
                provider_encoding_base32.Base32EncodingOperations.$assign(__gotots_conversion_1, $go$providerPointerValue);
            });
        const __gotots_receiver_3 = __gotots_receiver_2 === void 0 ? void 0 :
            (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<base32__from_gostdlib.Encoding>).value;
        $state.appendEncodeBase32Hex = ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): RuntimeSlice<uint8> => {
            return base32__from_gostdlib.Encoding.AppendEncode(__gotots_receiver_3, $argument0, $argument1);
        };
    }
    {
        const __gotots_conversion_2 = base64__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_4 = __gotots_conversion_2 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_2, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_2;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_2, $go$providerPointerValue);
            });
        const __gotots_receiver_5 = __gotots_receiver_4 === void 0 ? void 0 :
            (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value;
        $state.appendEncodeBase64 = ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): RuntimeSlice<uint8> => {
            return base64__from_gostdlib.Encoding.AppendEncode(__gotots_receiver_5, $argument0, $argument1);
        };
    }
    {
        const __gotots_conversion_3 = base64__from_gostdlib.state.URLEncoding;
        const __gotots_receiver_6 = __gotots_conversion_3 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_3, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_3;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
            });
        const __gotots_receiver_7 = __gotots_receiver_6 === void 0 ? void 0 :
            (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value;
        $state.appendEncodeBase64URL = ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): RuntimeSlice<uint8> => {
            return base64__from_gostdlib.Encoding.AppendEncode(__gotots_receiver_7, $argument0, $argument1);
        };
    }
    {
        const __gotots_callee_2 = hex__from_gostdlib.EncodedLen;
        $state.encodedLenBase16 = __gotots_callee_2 === undefined ? undefined : ($argument0: int): int => {
            return globalThis.Number(BigInt.asIntN(64, __gotots_callee_2(BigInt.asIntN(64, goNumberToBigInt($argument0)))));
        };
    }
    {
        const __gotots_conversion_4 = base32__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_8 = __gotots_conversion_4 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base32__from_gostdlib.Encoding>(__gotots_conversion_4, (): base32__from_gostdlib.Encoding => {
                return __gotots_conversion_4;
            }, ($go$providerPointerValue: base32__from_gostdlib.Encoding): void => {
                provider_encoding_base32.Base32EncodingOperations.$assign(__gotots_conversion_4, $go$providerPointerValue);
            });
        const __gotots_receiver_9 = __gotots_receiver_8 === void 0 ? void 0 :
            (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<base32__from_gostdlib.Encoding>).value;
        $state.encodedLenBase32 = ($argument0: int): int => {
            return globalThis.Number(BigInt.asIntN(64, base32__from_gostdlib.Encoding.EncodedLen(__gotots_receiver_9, BigInt.asIntN(64, goNumberToBigInt($argument0)))));
        };
    }
    {
        const __gotots_conversion_5 = base32__from_gostdlib.state.HexEncoding;
        const __gotots_receiver_10 = __gotots_conversion_5 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base32__from_gostdlib.Encoding>(__gotots_conversion_5, (): base32__from_gostdlib.Encoding => {
                return __gotots_conversion_5;
            }, ($go$providerPointerValue: base32__from_gostdlib.Encoding): void => {
                provider_encoding_base32.Base32EncodingOperations.$assign(__gotots_conversion_5, $go$providerPointerValue);
            });
        const __gotots_receiver_11 = __gotots_receiver_10 === void 0 ? void 0 :
            (__gotots_receiver_10 as tsonicTypeScriptRuntime.Location<base32__from_gostdlib.Encoding>).value;
        $state.encodedLenBase32Hex = ($argument0: int): int => {
            return globalThis.Number(BigInt.asIntN(64, base32__from_gostdlib.Encoding.EncodedLen(__gotots_receiver_11, BigInt.asIntN(64, goNumberToBigInt($argument0)))));
        };
    }
    {
        const __gotots_conversion_6 = base64__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_12 = __gotots_conversion_6 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_6, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_6;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_6, $go$providerPointerValue);
            });
        const __gotots_receiver_13 = __gotots_receiver_12 === void 0 ? void 0 :
            (__gotots_receiver_12 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value;
        $state.encodedLenBase64 = ($argument0: int): int => {
            return globalThis.Number(BigInt.asIntN(64, base64__from_gostdlib.Encoding.EncodedLen(__gotots_receiver_13, BigInt.asIntN(64, goNumberToBigInt($argument0)))));
        };
    }
    {
        const __gotots_conversion_7 = base64__from_gostdlib.state.URLEncoding;
        const __gotots_receiver_14 = __gotots_conversion_7 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_7, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_7;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_7, $go$providerPointerValue);
            });
        const __gotots_receiver_15 = __gotots_receiver_14 === void 0 ? void 0 :
            (__gotots_receiver_14 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value;
        $state.encodedLenBase64URL = ($argument0: int): int => {
            return globalThis.Number(BigInt.asIntN(64, base64__from_gostdlib.Encoding.EncodedLen(__gotots_receiver_15, BigInt.asIntN(64, goNumberToBigInt($argument0)))));
        };
    }
    {
        const __gotots_callee_3 = hex__from_gostdlib.AppendDecode;
        $state.appendDecodeBase16 = __gotots_callee_3 === undefined ? undefined : ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] => {
            const __gotots_results_0 = __gotots_callee_3($argument0, $argument1);
            return [__gotots_results_0[0], GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
                RuntimeSlice<uint8>,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
        };
    }
    {
        const __gotots_conversion_8 = base32__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_16 = __gotots_conversion_8 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base32__from_gostdlib.Encoding>(__gotots_conversion_8, (): base32__from_gostdlib.Encoding => {
                return __gotots_conversion_8;
            }, ($go$providerPointerValue: base32__from_gostdlib.Encoding): void => {
                provider_encoding_base32.Base32EncodingOperations.$assign(__gotots_conversion_8, $go$providerPointerValue);
            });
        const __gotots_receiver_17 = __gotots_receiver_16 === void 0 ? void 0 :
            (__gotots_receiver_16 as tsonicTypeScriptRuntime.Location<base32__from_gostdlib.Encoding>).value;
        $state.appendDecodeBase32 = ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] => {
            const __gotots_results_1 = base32__from_gostdlib.Encoding.AppendDecode(__gotots_receiver_17, $argument0, $argument1);
            return [__gotots_results_1[0], GoProviderInterfaceBridge.$from(__gotots_results_1[1])] satisfies [
                RuntimeSlice<uint8>,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
        };
    }
    {
        const __gotots_conversion_9 = base32__from_gostdlib.state.HexEncoding;
        const __gotots_receiver_18 = __gotots_conversion_9 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base32__from_gostdlib.Encoding>(__gotots_conversion_9, (): base32__from_gostdlib.Encoding => {
                return __gotots_conversion_9;
            }, ($go$providerPointerValue: base32__from_gostdlib.Encoding): void => {
                provider_encoding_base32.Base32EncodingOperations.$assign(__gotots_conversion_9, $go$providerPointerValue);
            });
        const __gotots_receiver_19 = __gotots_receiver_18 === void 0 ? void 0 :
            (__gotots_receiver_18 as tsonicTypeScriptRuntime.Location<base32__from_gostdlib.Encoding>).value;
        $state.appendDecodeBase32Hex = ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] => {
            const __gotots_results_2 = base32__from_gostdlib.Encoding.AppendDecode(__gotots_receiver_19, $argument0, $argument1);
            return [__gotots_results_2[0], GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                RuntimeSlice<uint8>,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
        };
    }
    {
        const __gotots_conversion_10 = base64__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_20 = __gotots_conversion_10 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_10, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_10;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_10, $go$providerPointerValue);
            });
        const __gotots_receiver_21 = __gotots_receiver_20 === void 0 ? void 0 :
            (__gotots_receiver_20 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value;
        $state.appendDecodeBase64 = ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] => {
            const __gotots_results_3 = base64__from_gostdlib.Encoding.AppendDecode(__gotots_receiver_21, $argument0, $argument1);
            return [__gotots_results_3[0], GoProviderInterfaceBridge.$from(__gotots_results_3[1])] satisfies [
                RuntimeSlice<uint8>,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
        };
    }
    {
        const __gotots_conversion_11 = base64__from_gostdlib.state.URLEncoding;
        const __gotots_receiver_22 = __gotots_conversion_11 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_11, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_11;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_11, $go$providerPointerValue);
            });
        const __gotots_receiver_23 = __gotots_receiver_22 === void 0 ? void 0 :
            (__gotots_receiver_22 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value;
        $state.appendDecodeBase64URL = ($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>): [
            RuntimeSlice<uint8>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] => {
            const __gotots_results_4 = base64__from_gostdlib.Encoding.AppendDecode(__gotots_receiver_23, $argument0, $argument1);
            return [__gotots_results_4[0], GoProviderInterfaceBridge.$from(__gotots_results_4[1])] satisfies [
                RuntimeSlice<uint8>,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
        };
    }
    {
        $state.errNilField = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("cannot set embedded pointer to unexported struct type"));
    }
    {
        $state.errInvalidStringTag = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("invalid use of `string` tag option"));
    }
    {
        $state.errArrayUnderflow = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("too few array elements"));
    }
    {
        $state.errArrayOverflow = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("too many array elements"));
    }
    {
        $state.errUnsupportedMutation = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("unsupported calls must not read or write any tokens"));
    }
    {
        $state.errNonSingularValue = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("must read or write exactly one value"));
    }
    {
        $state.errRawInlinedNotObject = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("inlined raw value must be a JSON object"));
    }
    {
        $state.jsontextValueType = $goReflectType$Named_jsontext$Value;
    }
    {
        $state.errNonStringValue = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("JSON value must be string type"));
    }
    {
        $state.jsonMarshalerType = $goReflectType$Named_json$Marshaler;
    }
    {
        $state.jsonMarshalerToType = $goReflectType$Named_json$MarshalerTo;
    }
    {
        $state.jsonUnmarshalerType = $goReflectType$Named_json$Unmarshaler;
    }
    {
        $state.jsonUnmarshalerFromType = $goReflectType$Named_json$UnmarshalerFrom;
    }
    {
        $state.textAppenderType = $goReflectType$Named_encoding$TextAppender;
    }
    {
        $state.textMarshalerType = $goReflectType$Named_encoding$TextMarshaler;
    }
    {
        $state.textUnmarshalerType = $goReflectType$Named_encoding$TextUnmarshaler;
    }
    {
        $state.allMarshalerTypes = RuntimeSlice.literal<reflect__from_gostdlib.Type | undefined>([$state.jsonMarshalerToType, $state.jsonMarshalerType, $state.textAppenderType, $state.textMarshalerType]);
    }
    {
        $state.allUnmarshalerTypes = RuntimeSlice.literal<reflect__from_gostdlib.Type | undefined>([$state.jsonUnmarshalerFromType, $state.jsonUnmarshalerType, $state.textUnmarshalerType]);
    }
    {
        $state.allMethodTypes = goSliceAppendSlice<reflect__from_gostdlib.Type | undefined>($state.allMarshalerTypes, $state.allUnmarshalerTypes, void 0);
    }
    {
        $state.timeDurationType = $goReflectType$Named_time$Duration;
    }
    {
        $state.timeTimeType = $goReflectType$Named_time$Time;
    }
    {
        $state.errInaccurateDateUnits = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("inaccurate year, month, week, or day units"));
    }
    {
        $state.ErrUnknownName = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("unknown object member name"));
    }
    {
        $state.errorModalVerb = sync__from_gostdlib.OnceValue<gostring>((): gostring => {
            const __gotots_range_0 = GoMap.make(2, [["cannot", new GoEmptyStruct], ["unable to", new GoEmptyStruct]]);
            const __gotots_range_keys_0 = __gotots_range_0.keys();
            for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                if (!__gotots_range_value_1[1]) {
                    continue;
                }
                const __gotots_range_value_2 = __gotots_range_value_0;
                let phrase = __gotots_range_value_2;
                return phrase;
            }
            return "";
        });
    }
    {
        $state.isZeroerType = $goReflectType$Named_json$isZeroer;
    }
    {
        $state.errNoExportedFields = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("Go struct has no exported fields"));
    }
    init();
}
export { Marshal, MarshalEncode, MarshalWrite, Unmarshal, UnmarshalDecode, UnmarshalRead } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/arshal.js";
export { Marshaler, Marshaler$contract, Marshaler$is, MarshalerTo, MarshalerTo$contract, MarshalerTo$is, Unmarshaler, Unmarshaler$contract, Unmarshaler$is, UnmarshalerFrom, UnmarshalerFrom$contract, UnmarshalerFrom$is } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/arshal_methods.js";
export { SemanticError } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/errors.js";
export { Deterministic } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/options.js";
export { $state };
