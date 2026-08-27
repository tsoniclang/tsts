import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Kind as Kind__from_jsontext } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { ID as ID__from_jsonrpc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type { Position } from "./lsp_generated.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStorage, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext, Token as Token__from_jsontext, Value as Value__from_jsontext } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { IsBundled as IsBundled__from_bundled } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/bundled/package.js";
import { $state as $state__json__package_1, NewDecoder as NewDecoder__from_json__package_1, Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { JSONRPCVersion as JSONRPCVersion__from_jsonrpc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import { SplitVolumePath as SplitVolumePath__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goInterfaceAdapter$Named_jsontext$Kind, $goInterfaceAdapter$Named_jsontext$Value, $goInterfaceAdapter$Named_lsproto$DocumentUri, $goInterfaceAdapter$PointerTo_Interface_void, $goInterfaceAdapter$PointerTo_Named_bytes$Buffer, $goInterfaceAdapter$PointerTo_Named_lsproto$ResolvedClientCapabilities, $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_lsproto$clientCapabilitiesKey as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$TextDocumentPosition$void_to_Named_lsproto$Position, $goInterfaceMethod$TextDocumentURI$void_to_Named_lsproto$DocumentUri } from "../../../../../../../support/interface-methods.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { RequestMessage } from "./jsonrpc.js";
import { CodeActionKind, MarkupKind, MarkupKindPlainText$constant, ResolvedClientCapabilities, ResolvedExperimentalClientCapabilities, ResolvedGeneralClientCapabilities, ResolvedTextDocumentClientCapabilities, ResolvedWindowClientCapabilities, ResolvedWorkspaceClientCapabilities, unmarshalResult } from "./lsp_generated.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_bytes from "@gotots/gostdlib/internal/facets/named-bytes.js";
import * as named_net_url from "@gotots/gostdlib/internal/facets/named-net-url.js";
import * as provider_context from "@gotots/gostdlib/internal/facets/provider-context.js";
import * as url__from_gostdlib from "@gotots/gostdlib/net/url.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goArrayAllocate } from "@gotots/runtime/array.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class DocumentUri implements GoContainerStoredValue<gostring> {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare readonly [$goContainerStorageType]: gostring;
    declare private readonly then?: never;
    FileName(): gostring {
        if (IsBundled__from_bundled(this.$value)) {
            return this.$value;
        }
        if (strings__from_gostdlib.HasPrefix(this.$value, "file://")) {
            const __gotots_results_8 = url__from_gostdlib.Parse(this.$value);
            const __gotots_conversion_8 = __gotots_results_8[0];
            const __gotots_results_9 = [__gotots_conversion_8 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<url__from_gostdlib.URL>(__gotots_conversion_8, (): url__from_gostdlib.URL => {
                        return __gotots_conversion_8;
                    }, ($go$providerPointerValue: url__from_gostdlib.URL): void => {
                        named_net_url.NetUrlURLOperations.$assign(__gotots_conversion_8, $go$providerPointerValue);
                    }), GoProviderInterfaceBridge.$from(__gotots_results_8[1])] satisfies [
                tsonicTypeScriptRuntime.Location<url__from_gostdlib.URL> | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let parsed: tsonicTypeScriptRuntime.Location<url__from_gostdlib.URL> | undefined = __gotots_results_9[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_9[1];
            if (!(err === undefined)) {
                const __gotots_argument_11 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("invalid file URI: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$DocumentUri(this)])));
                GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
            }
            if (((parsed ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<url__from_gostdlib.URL>).value.Host !== "") {
                return "//" + ((parsed ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<url__from_gostdlib.URL>).value.Host + ((parsed ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<url__from_gostdlib.URL>).value.Path;
            }
            return fixWindowsURIPath(((parsed ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<url__from_gostdlib.URL>).value.Path);
        }
        const __gotots_results_11 = strings__from_gostdlib.Cut(this.$value, ":");
        let scheme = __gotots_results_11[0];
        let path = __gotots_results_11[1];
        let ok = __gotots_results_11[2];
        if (!ok) {
            const __gotots_argument_12 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("invalid URI: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$DocumentUri(this)])));
            GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
        }
        let authority = "ts-nul-authority";
        {
            const __gotots_results_13 = strings__from_gostdlib.CutPrefix(path, "//");
            let rest = __gotots_results_13[0];
            let ok__shadow_1 = __gotots_results_13[1];
            if (ok__shadow_1) {
                const __gotots_results_15 = strings__from_gostdlib.Cut(rest, "/");
                authority = __gotots_results_15[0];
                path = __gotots_results_15[1];
                ok__shadow_1 = __gotots_results_15[2];
                if (!ok__shadow_1) {
                    const __gotots_argument_13 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("invalid URI: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$DocumentUri(this)])));
                    GoPanic.raise(__gotots_argument_13 === undefined ? GoPanicNilValue.create() : __gotots_argument_13);
                }
            }
        }
        return "^/" + scheme + "/" + authority + "/" + path;
    }
    Path(useCaseSensitiveFileNames: bool): Path__from_tspath {
        let fileName = this.FileName();
        return ToPath__from_tspath(fileName, "", useCaseSensitiveFileNames);
    }
}
export function fixWindowsURIPath(path: gostring): gostring {
    {
        const __gotots_results_17 = strings__from_gostdlib.CutPrefix(path, "/");
        let rest = __gotots_results_17[0];
        let ok = __gotots_results_17[1];
        if (ok) {
            {
                const __gotots_results_18 = SplitVolumePath__from_tspath(rest);
                let volume = __gotots_results_18[0];
                let rest__shadow_1 = __gotots_results_18[1];
                let ok__shadow_1 = __gotots_results_18[2];
                if (ok__shadow_1) {
                    return volume + rest__shadow_1;
                }
            }
        }
    }
    return path;
}
export interface HasTextDocumentPosition extends GoInterfaceValue {
    TextDocumentPosition(): Position;
    TextDocumentURI(): DocumentUri;
}
export const HasTextDocumentPosition$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$TextDocumentPosition$void_to_Named_lsproto$Position, $goInterfaceMethod$TextDocumentURI$void_to_Named_lsproto$DocumentUri]);
export function HasTextDocumentPosition$is(value: GoInterfaceValue | undefined): value is HasTextDocumentPosition {
    return value !== undefined && value.$go$implements(HasTextDocumentPosition$contract);
}
export class URI {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export class Method {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function unmarshalPtrTo$kernel<T>($go$interface_adapt$PointerTo_T0_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<T> | undefined) => $goInterface$Interface_void | undefined, $go$zero$void_to_T0: () => T, data: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<T> | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let v: T = $go$zero$void_to_T0();
    const v$location = tsonicTypeScriptRuntime.boundLocation({}, () => v, v$next => v = v$next);
    {
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, $go$interface_adapt$PointerTo_T0_to_Interface_void(v$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to unmarshal %T: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$go$interface_adapt$PointerTo_T0_to_Interface_void(void 0), err])))];
        }
    }
    return [
        v$location, void 0];
}
export function unmarshalValue$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$interface_adapt$PointerTo_T0_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<T> | undefined) => $goInterface$Interface_void | undefined, $go$zero$void_to_T0: () => T, data: RuntimeSlice<uint8>): [
    T,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let v: T = $go$zero$void_to_T0();
    const v$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => v, v$next2 => v = v$next2);
    {
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, $go$interface_adapt$PointerTo_T0_to_Interface_void(v$location2), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        if (!(err === undefined)) {
            return [$go$copy$T0_to_T0($go$zero$void_to_T0()), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to unmarshal %T: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$go$interface_adapt$PointerTo_T0_to_Interface_void(void 0), err])))];
        }
    }
    return [$go$copy$T0_to_T0(v), void 0];
}
export function unmarshalAny(data: RuntimeSlice<uint8>): [
    $goInterface$Interface_void | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let v: $goInterface$Interface_void | undefined = void 0;
    const v$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => v, v$next3 => v = v$next3);
    {
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Interface_void(v$location3), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to unmarshal any: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
        }
    }
    return [v, void 0];
}
export function unmarshalEmpty(data: RuntimeSlice<uint8>): [
    $goInterface$Interface_void | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    if (data.length !== 0) {
        const __gotots_results_1 = void 0;
        const __gotots_argument_5 = "expected empty, got: %s";
        const __gotots_conversion_0 = data;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        const __gotots_argument_4 = new $goInterfaceAdapter$string(__gotots_conversion_1);
        const __gotots_argument_6 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_4]);
        const __gotots_results_2 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf(__gotots_argument_5, __gotots_argument_6));
        return [__gotots_results_1, __gotots_results_2];
    }
    return [void 0, void 0];
}
export function boolToInt(b: bool): int {
    if (b) {
        return 1;
    }
    return 0;
}
export function errNotObject(k: Kind__from_jsontext): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("expected object start, but encountered %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_jsontext$Kind(k)])));
}
export function errNull(field: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("null value is not allowed for field %q", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(field)])));
}
export function errMissing(props: RuntimeSlice<gostring>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("missing required properties: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.Join(props, ", "))])));
}
export function errInvalidKind(typeName: gostring, got: Kind__from_jsontext): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid %s: got %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(typeName), new $goInterfaceAdapter$Named_jsontext$Kind(got)])));
}
export function errInvalidValue(typeName: gostring, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid %s: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(typeName), new $goInterfaceAdapter$SliceOf_byte(data)])));
}
export function errLiteralMismatch(typeName: gostring, expected: gostring, got: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("expected %s value %s, got %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(typeName), new $goInterfaceAdapter$string(expected), new $goInterfaceAdapter$SliceOf_byte(got)])));
}
export function assertOnlyOne(message: gostring, count: int): void {
    if (count !== 1) {
        const __gotots_argument_7 = new $goInterfaceAdapter$string(message);
        GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
    }
}
export function assertAtMostOne(message: gostring, count: int): void {
    if (count > 1) {
        const __gotots_argument_9 = new $goInterfaceAdapter$string(message);
        GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
    }
}
export function jsonKeyCheck(name: RuntimeSlice<uint8>, key: gostring): bool {
    let __gotots_logical_result_0 = name.length === key.length + 2 && name.get(0) === 34;
    if (__gotots_logical_result_0) {
        const __gotots_conversion_4 = name.slice(1, name.length - 1, null);
        let __gotots_conversion_5 = "";
        for (let __gotots_conversion_6 = 0; __gotots_conversion_6 < __gotots_conversion_4.length; __gotots_conversion_6++) {
            __gotots_conversion_5 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_4.get(__gotots_conversion_6)));
        }
        const __gotots_binary_operand_0 = __gotots_conversion_5;
        const __gotots_binary_operand_1 = key;
        __gotots_logical_result_0 = __gotots_binary_operand_0 === __gotots_binary_operand_1;
    }
    return __gotots_logical_result_0;
}
export function jsonObjectRawField(data: RuntimeSlice<uint8>, field: gostring): Value__from_jsontext {
    const __gotots_conversion_7 = bytes__from_gostdlib.NewBuffer(data);
    const __gotots_argument_10 = new $goInterfaceAdapter$PointerTo_Named_bytes$Buffer(__gotots_conversion_7 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<bytes__from_gostdlib.Buffer>(__gotots_conversion_7, (): bytes__from_gostdlib.Buffer => {
            return __gotots_conversion_7;
        }, ($go$providerPointerValue: bytes__from_gostdlib.Buffer): void => {
            named_bytes.BytesBufferOperations.$assign(__gotots_conversion_7, $go$providerPointerValue);
        }));
    let dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined = NewDecoder__from_json__package_1(__gotots_argument_10);
    if (!(Decoder__from_jsontext.PeekKind(dec) === 123)) {
        return new Value__from_jsontext(RuntimeSlice.nil<uint8>());
    }
    {
        const __gotots_results_5 = Decoder__from_jsontext.ReadToken(dec);
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_5[1];
        if (!(err === undefined)) {
            return new Value__from_jsontext(RuntimeSlice.nil<uint8>());
        }
    }
    for (; !(Decoder__from_jsontext.PeekKind(dec) === 125);) {
        const __gotots_results_6 = Decoder__from_jsontext.ReadValue(dec);
        let name: Value__from_jsontext = __gotots_results_6[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_6[1];
        if (!(err === undefined)) {
            return new Value__from_jsontext(RuntimeSlice.nil<uint8>());
        }
        if (jsonKeyCheck(name.$value, field)) {
            const __gotots_results_7 = Decoder__from_jsontext.ReadValue(dec);
            let val: Value__from_jsontext = __gotots_results_7[0];
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_7[1];
            if (!(err__shadow_1 === undefined)) {
                return new Value__from_jsontext(RuntimeSlice.nil<uint8>());
            }
            return val;
        }
        {
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Decoder__from_jsontext.SkipValue(dec);
            if (!(err__shadow_1 === undefined)) {
                return new Value__from_jsontext(RuntimeSlice.nil<uint8>());
            }
        }
    }
    return new Value__from_jsontext(RuntimeSlice.nil<uint8>());
}
export function jsonObjectHasKey(data: RuntimeSlice<uint8>, keys: RuntimeSlice<gostring>): int {
    const __gotots_conversion_3 = bytes__from_gostdlib.NewBuffer(data);
    const __gotots_argument_8 = new $goInterfaceAdapter$PointerTo_Named_bytes$Buffer(__gotots_conversion_3 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<bytes__from_gostdlib.Buffer>(__gotots_conversion_3, (): bytes__from_gostdlib.Buffer => {
            return __gotots_conversion_3;
        }, ($go$providerPointerValue: bytes__from_gostdlib.Buffer): void => {
            named_bytes.BytesBufferOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
        }));
    let dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined = NewDecoder__from_json__package_1(__gotots_argument_8);
    if (!(Decoder__from_jsontext.PeekKind(dec) === 123)) {
        return -1;
    }
    {
        const __gotots_results_3 = Decoder__from_jsontext.ReadToken(dec);
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
        if (!(err === undefined)) {
            return -1;
        }
    }
    for (; !(Decoder__from_jsontext.PeekKind(dec) === 125);) {
        const __gotots_results_4 = Decoder__from_jsontext.ReadValue(dec);
        let name: Value__from_jsontext = __gotots_results_4[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
        if (!(err === undefined)) {
            return -1;
        }
        const __gotots_range_0 = keys;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            let key = __gotots_range_value_1;
            if (jsonKeyCheck(name.$value, key)) {
                return i;
            }
        }
        {
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Decoder__from_jsontext.SkipValue(dec);
            if (!(err__shadow_1 === undefined)) {
                return -1;
            }
        }
    }
    return -1;
}
export type RequestInfo$Storage<Params, Resp> = {
    $blank0: GoArray<GoContainerStorage<Params>, 0>;
    $blank1: GoArray<GoContainerStorage<Resp>, 0>;
    Method: gostring;
};
export class RequestInfo<Params, Resp> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: RequestInfo$Storage<Params, Resp>) {
    }
    public static $storageOf<Params, Resp>($source: RequestInfo<Params, Resp>): RequestInfo$Storage<Params, Resp> {
        return $source.$storage;
    }
    public static $fromStorage<Params, Resp>($source: RequestInfo$Storage<Params, Resp>): RequestInfo<Params, Resp> {
        return new RequestInfo<Params, Resp>($source);
    }
    static $zero<Params, Resp>(): RequestInfo<Params, Resp> {
        return new RequestInfo<Params, Resp>({
            $blank0: goArrayAllocate<GoContainerStorage<Params>, 0>(0),
            $blank1: goArrayAllocate<GoContainerStorage<Resp>, 0>(0),
            Method: ((void Method,
                "") as gostring)
        });
    }
    static $copy<Params, Resp>($source: RequestInfo<Params, Resp>): RequestInfo<Params, Resp> {
        return new RequestInfo<Params, Resp>({
            $blank0: goArrayAllocate<GoContainerStorage<Params>, 0>(0),
            $blank1: goArrayAllocate<GoContainerStorage<Resp>, 0>(0),
            Method: ((void Method,
                $source.$storage.Method) as gostring)
        });
    }
    declare private readonly then?: never;
    NewRequestMessage$kernel($go$interface_adapt$T0_to_Interface_void: ($0: Params) => $goInterface$Interface_void | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, params: Params): {
        value: RequestMessage;
    } | undefined {
        return { value: new RequestMessage(JSONRPCVersion__from_jsonrpc.$zero(), id, new Method(RequestInfo.$storageOf(this).Method), $go$interface_adapt$T0_to_Interface_void(params)) };
    }
    UnmarshalResult$kernel($go$copy$T1_to_T1: ($0: Resp) => Resp, $go$interface_assert_ok$Interface_void_to_T1_bool: ($0: $goInterface$Interface_void | undefined) => [
        Resp,
        bool
    ], $go$interface_assert$Interface_void_to_T1: ($0: $goInterface$Interface_void | undefined) => Resp, $go$zero$void_to_T1: () => Resp, result: $goInterface$Interface_void | undefined): [
        Resp,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        {
            const __gotots_results_19 = $go$interface_assert_ok$Interface_void_to_T1_bool(result);
            let r__shadow_1: Resp = $go$copy$T1_to_T1(__gotots_results_19[0]);
            let ok__shadow_1 = __gotots_results_19[1];
            if (ok__shadow_1) {
                return [$go$copy$T1_to_T1(r__shadow_1), void 0];
            }
        }
        const __gotots_results_20 = (($value: $goInterface$Interface_void | undefined): [
            Value__from_jsontext,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_jsontext$Value.$is($value)) {
                return [new Value__from_jsontext(RuntimeSlice.nil<uint8>()), false];
            }
            return [$value.$go$value, true];
        })(result);
        let raw: Value__from_jsontext = __gotots_results_20[0];
        let ok = __gotots_results_20[1];
        if (!ok) {
            return [$go$copy$T1_to_T1($go$zero$void_to_T1()), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("expected json.Value, got %T", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([result])))];
        }
        const __gotots_results_21 = unmarshalResult(new Method(RequestInfo.$storageOf(this).Method), raw.$value);
        let r: $goInterface$Interface_void | undefined = __gotots_results_21[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_21[1];
        if (!(err === undefined)) {
            return [$go$copy$T1_to_T1($go$zero$void_to_T1()), err];
        }
        return [$go$copy$T1_to_T1($go$interface_assert$Interface_void_to_T1(r)), void 0];
    }
}
export type NotificationInfo$Storage<Params> = {
    $blank0: GoArray<GoContainerStorage<Params>, 0>;
    Method: gostring;
};
export class NotificationInfo<Params> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NotificationInfo$Storage<Params>) {
    }
    public static $storageOf<Params>($source: NotificationInfo<Params>): NotificationInfo$Storage<Params> {
        return $source.$storage;
    }
    public static $fromStorage<Params>($source: NotificationInfo$Storage<Params>): NotificationInfo<Params> {
        return new NotificationInfo<Params>($source);
    }
    static $zero<Params>(): NotificationInfo<Params> {
        return new NotificationInfo<Params>({
            $blank0: goArrayAllocate<GoContainerStorage<Params>, 0>(0),
            Method: ((void Method,
                "") as gostring)
        });
    }
    static $copy<Params>($source: NotificationInfo<Params>): NotificationInfo<Params> {
        return new NotificationInfo<Params>({
            $blank0: goArrayAllocate<GoContainerStorage<Params>, 0>(0),
            Method: ((void Method,
                $source.$storage.Method) as gostring)
        });
    }
    declare private readonly then?: never;
    NewNotificationMessage$kernel($go$interface_adapt$T0_to_Interface_void: ($0: Params) => $goInterface$Interface_void | undefined, params: Params): {
        value: RequestMessage;
    } | undefined {
        return { value: new RequestMessage(JSONRPCVersion__from_jsonrpc.$zero(), void 0, new Method(NotificationInfo.$storageOf(this).Method), $go$interface_adapt$T0_to_Interface_void(params)) };
    }
}
export type Null$Storage = {};
export class Null implements GoContainerStoredValue<Null$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Null$Storage) {
    }
    public static $storageOf($source: Null): Null$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Null$Storage): Null {
        return new Null($source);
    }
    declare readonly [$goContainerStorageType]: Null$Storage;
    static $zero(): Null {
        return new Null({});
    }
    static $copy($source: Null): Null {
        return new Null({});
    }
    static $equal($left: Null, $right: Null): bool {
        return true;
    }
    static $hash($source: Null): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    MarshalJSONTo(enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__json__package_1.Null)));
    }
    UnmarshalJSONFrom(dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_results_22 = Decoder__from_jsontext.ReadValue(dec);
        let data: Value__from_jsontext = __gotots_results_22[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_22[1];
        if (!(err === undefined)) {
            return err;
        }
        const __gotots_conversion_9 = data.$value;
        let __gotots_conversion_10 = "";
        for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
            __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
        }
        const __gotots_binary_operand_2 = __gotots_conversion_10;
        const __gotots_binary_operand_3 = "null";
        if (__gotots_binary_operand_2 !== __gotots_binary_operand_3) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("expected null, got %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_jsontext$Value(data)])));
        }
        return void 0;
    }
}
export type NoParams$Storage = {};
export class NoParams implements GoContainerStoredValue<NoParams$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NoParams$Storage) {
    }
    public static $storageOf($source: NoParams): NoParams$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: NoParams$Storage): NoParams {
        return new NoParams($source);
    }
    declare readonly [$goContainerStorageType]: NoParams$Storage;
    static $zero(): NoParams {
        return new NoParams({});
    }
    static $copy($source: NoParams): NoParams {
        return new NoParams({});
    }
    static $equal($left: NoParams, $right: NoParams): bool {
        return true;
    }
    static $hash($source: NoParams): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    IsZero(): bool {
        return true;
    }
}
export class clientCapabilitiesKey {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $copy($source: clientCapabilitiesKey): clientCapabilitiesKey {
        return new clientCapabilitiesKey();
    }
    static $equal($left: clientCapabilitiesKey, $right: clientCapabilitiesKey): bool {
        return true;
    }
    static $hash($source: clientCapabilitiesKey): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
}
export function WithClientCapabilities(ctx: GoInterface | undefined, caps: tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities> | undefined): GoInterface | undefined {
    const __gotots_argument_1 = ctx;
    const __gotots_argument_2 = new GoInterfaceAdapter(new clientCapabilitiesKey);
    const __gotots_argument_3 = new $goInterfaceAdapter$PointerTo_Named_lsproto$ResolvedClientCapabilities(caps);
    return GoProviderProfileBridge.$from(provider_context.ContextWithValueDirect(GoProviderProfileBridge.$to(__gotots_argument_1), __gotots_argument_2, __gotots_argument_3));
}
export function GetClientCapabilities(ctx: GoInterface | undefined): tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities> | undefined {
    {
        const __gotots_receiver_0 = ctx;
        const __gotots_argument_0 = new GoInterfaceAdapter(new clientCapabilitiesKey);
        const __gotots_results_0 = (($value: $goInterface$Interface_void | undefined): [
            tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities> | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$ResolvedClientCapabilities.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Value(__gotots_argument_0));
        let caps: tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities> | undefined = __gotots_results_0[0];
        if (!(caps === undefined)) {
            return caps;
        }
    }
    return tsonicTypeScriptRuntime.location<ResolvedClientCapabilities>(new ResolvedClientCapabilities(ResolvedWorkspaceClientCapabilities.$zero(), ResolvedTextDocumentClientCapabilities.$zero(), ResolvedWindowClientCapabilities.$zero(), ResolvedGeneralClientCapabilities.$zero(), ResolvedExperimentalClientCapabilities.$zero(), false, 0, false, false, false));
}
export function PreferredMarkupKind(formats: RuntimeSlice<gostring>): MarkupKind {
    if (formats.length > 0) {
        return new MarkupKind(formats.get(0));
    }
    return MarkupKindPlainText$constant();
}
export function CodeActionKindSourceRemoveUnusedImports$constant(): CodeActionKind {
    return new CodeActionKind("source.removeUnusedImports");
}
export function CodeActionKindSourceSortImports$constant(): CodeActionKind {
    return new CodeActionKind("source.sortImports");
}
