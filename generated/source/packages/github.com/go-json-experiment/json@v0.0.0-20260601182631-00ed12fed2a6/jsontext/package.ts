import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/token.js";
import type { objectMember$Storage as objectMember__from_jsontext$Storage } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/value.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../support/interface-contracts.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { Decoder } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/decode.js";
import { Encoder } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/encode.js";
import { exporter } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/export.js";
import { String, Token, rawToken } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/token.js";
import { $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_SliceOf_Named_jsontext$objectMember, $goInterfaceAdapter$PointerTo_Named_jsontext$Encoder as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import { GoArray } from "@gotots/runtime/array.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.BeginArray = Token.$storageOf(Token.$zero());
    $state.BeginObject = Token.$storageOf(Token.$zero());
    $state.EndArray = Token.$storageOf(Token.$zero());
    $state.EndObject = Token.$storageOf(Token.$zero());
    $state.ErrDuplicateName = void 0;
    $state.ErrNonStringName = void 0;
    $state.False = Token.$storageOf(Token.$zero());
    $state.Internal = exporter.$storageOf(exporter.$zero());
    $state.Null = Token.$storageOf(Token.$zero());
    $state.True = Token.$storageOf(Token.$zero());
    $state.bufferedDecoderPool = void 0;
    $state.bufferedEncoderPool = void 0;
    $state.bytesBufferDecoderPool = void 0;
    $state.bytesBufferEncoderPool = void 0;
    $state.errBufferWriteAfterNext = void 0;
    $state.errInvalidNamespace = void 0;
    $state.errInvalidToken = void 0;
    $state.errMaxDepth = void 0;
    $state.errMismatchDelim = void 0;
    $state.errMissingValue = void 0;
    $state.nanString = Token.$storageOf(Token.$zero());
    $state.ninfString = Token.$storageOf(Token.$zero());
    $state.normKind = GoArray.zero<Kind, 256>(256, 0);
    $state.objectMemberPool = named_sync.SyncPoolOperations.$zero();
    $state.pinfString = Token.$storageOf(Token.$zero());
    $state.streamingDecoderPool = void 0;
    $state.streamingEncoderPool = void 0;
    $state.zeroNumber = Token.$storageOf(Token.$zero());
    $state.zeroString = Token.$storageOf(Token.$zero());
    {
        $state.errBufferWriteAfterNext = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("invalid bytes.Buffer.Write call after calling bytes.Buffer.Next"));
    }
    {
        const __gotots_field_0 = (): GoInterface | undefined => {
            return new GoInterfaceAdapter(tsonicTypeScriptRuntime.location<Encoder>(Encoder.$zero()));
        };
        const __gotots_struct_0 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_0.New = __gotots_field_0;
        $state.bufferedEncoderPool =
            tsonicTypeScriptRuntime.location<sync__from_gostdlib.Pool>(__gotots_struct_0);
    }
    {
        const __gotots_field_1 = (): GoInterface | undefined => {
            return new GoInterfaceAdapter(tsonicTypeScriptRuntime.location<Encoder>(Encoder.$zero()));
        };
        const __gotots_struct_1 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_1.New = __gotots_field_1;
        $state.streamingEncoderPool =
            tsonicTypeScriptRuntime.location<sync__from_gostdlib.Pool>(__gotots_struct_1);
    }
    {
        const __gotots_field_2 = (): GoInterface | undefined => {
            return new GoInterfaceAdapter(tsonicTypeScriptRuntime.location<Encoder>(Encoder.$zero()));
        };
        const __gotots_struct_2 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_2.New = __gotots_field_2;
        $state.bytesBufferEncoderPool =
            tsonicTypeScriptRuntime.location<sync__from_gostdlib.Pool>(__gotots_struct_2);
    }
    {
        const __gotots_field_3 = (): GoInterface | undefined => {
            return new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(tsonicTypeScriptRuntime.location<Decoder>(Decoder.$zero()));
        };
        const __gotots_struct_3 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_3.New = __gotots_field_3;
        $state.bufferedDecoderPool =
            tsonicTypeScriptRuntime.location<sync__from_gostdlib.Pool>(__gotots_struct_3);
    }
    {
        const __gotots_field_4 = (): GoInterface | undefined => {
            return new $goInterfaceAdapter$PointerTo_Named_jsontext$Decoder(tsonicTypeScriptRuntime.location<Decoder>(Decoder.$zero()));
        };
        const __gotots_struct_4 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_4.New = __gotots_field_4;
        $state.streamingDecoderPool =
            tsonicTypeScriptRuntime.location<sync__from_gostdlib.Pool>(__gotots_struct_4);
    }
    {
        $state.bytesBufferDecoderPool = $state.bufferedDecoderPool;
    }
    {
        $state.ErrDuplicateName = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("duplicate object member name"));
    }
    {
        $state.ErrNonStringName = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("object member name must be a string"));
    }
    {
        $state.errMissingValue = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("missing value after object name"));
    }
    {
        $state.errMismatchDelim = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("mismatching structural token for object or array"));
    }
    {
        $state.errMaxDepth = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("exceeded max depth"));
    }
    {
        $state.errInvalidNamespace = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("object namespace is in an invalid state"));
    }
    {
        $state.errInvalidToken = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("invalid jsontext.Token"));
    }
    {
        $state.Null = Token.$storageOf(rawToken("null"));
    }
    {
        $state.False = Token.$storageOf(rawToken("false"));
    }
    {
        $state.True = Token.$storageOf(rawToken("true"));
    }
    {
        $state.BeginObject = Token.$storageOf(rawToken("{"));
    }
    {
        $state.EndObject = Token.$storageOf(rawToken("}"));
    }
    {
        $state.BeginArray = Token.$storageOf(rawToken("["));
    }
    {
        $state.EndArray = Token.$storageOf(rawToken("]"));
    }
    {
        $state.zeroString = Token.$storageOf(rawToken("\"\""));
    }
    {
        $state.zeroNumber = Token.$storageOf(rawToken("0"));
    }
    {
        $state.nanString = Token.$storageOf(String("NaN"));
    }
    {
        $state.pinfString = Token.$storageOf(String("Infinity"));
    }
    {
        $state.ninfString = Token.$storageOf(String("-Infinity"));
    }
    {
        $state.normKind = GoArray.literal<Kind, 256>(256, 0, [110, 102, 116, 34, 123, 125, 91, 93, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57], [110, 102, 116, 34, 123, 125, 91, 93, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
    }
    {
        const __gotots_field_5 = (): GoInterface | undefined => {
            return new $goInterfaceAdapter$PointerTo_SliceOf_Named_jsontext$objectMember(tsonicTypeScriptRuntime.location<RuntimeSlice<objectMember__from_jsontext$Storage>>(RuntimeSlice.nil<objectMember__from_jsontext$Storage>()));
        };
        const __gotots_struct_5 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_5.New = __gotots_field_5;
        $state.objectMemberPool = __gotots_struct_5;
    }
}
export { Decoder, NewDecoder } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/decode.js";
export { Encoder } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/encode.js";
export { SyntacticError } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/errors.js";
export { AllowDuplicateNames, AllowInvalidUTF8, WithIndent, WithIndentPrefix } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/options.js";
export { Pointer } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/state.js";
export { Bool, Float, Kind, Kind_String, String, Token, Token$Storage } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/token.js";
export { Value } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/value.js";
export { $state };
