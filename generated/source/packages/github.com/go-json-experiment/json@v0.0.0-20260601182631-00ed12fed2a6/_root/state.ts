import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { __go_export$Storage as __go_export__from_jsontext$Storage } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/export.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare ErrUnknownName: GoInterface | undefined;
    declare allMarshalerTypes: RuntimeSlice<reflect__from_gostdlib.Type | undefined>;
    declare allMethodTypes: RuntimeSlice<reflect__from_gostdlib.Type | undefined>;
    declare allUnmarshalerTypes: RuntimeSlice<reflect__from_gostdlib.Type | undefined>;
    declare anyType: reflect__from_gostdlib.Type | undefined;
    declare appendDecodeBase16: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ]) | undefined;
    declare appendDecodeBase32: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ]) | undefined;
    declare appendDecodeBase32Hex: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ]) | undefined;
    declare appendDecodeBase64: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ]) | undefined;
    declare appendDecodeBase64URL: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ]) | undefined;
    declare appendEncodeBase16: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => RuntimeSlice<uint8>) | undefined;
    declare appendEncodeBase32: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => RuntimeSlice<uint8>) | undefined;
    declare appendEncodeBase32Hex: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => RuntimeSlice<uint8>) | undefined;
    declare appendEncodeBase64: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => RuntimeSlice<uint8>) | undefined;
    declare appendEncodeBase64URL: (($0: RuntimeSlice<uint8>, $1: RuntimeSlice<uint8>) => RuntimeSlice<uint8>) | undefined;
    declare boolType: reflect__from_gostdlib.Type | undefined;
    declare bytesType: reflect__from_gostdlib.Type | undefined;
    declare emptyStructType: reflect__from_gostdlib.Type | undefined;
    declare encodedLenBase16: (($0: int) => int) | undefined;
    declare encodedLenBase32: (($0: int) => int) | undefined;
    declare encodedLenBase32Hex: (($0: int) => int) | undefined;
    declare encodedLenBase64: (($0: int) => int) | undefined;
    declare encodedLenBase64URL: (($0: int) => int) | undefined;
    declare errArrayOverflow: GoInterface | undefined;
    declare errArrayUnderflow: GoInterface | undefined;
    declare errChangingDuplicateNames: GoInterface | undefined;
    declare errChangingInvalidUTF8: GoInterface | undefined;
    declare errChangingWhitespace: GoInterface | undefined;
    declare errInaccurateDateUnits: GoInterface | undefined;
    declare errInvalidStringTag: GoInterface | undefined;
    declare errNilField: GoInterface | undefined;
    declare errNoExportedFields: GoInterface | undefined;
    declare errNonSingularValue: GoInterface | undefined;
    declare errNonStringValue: GoInterface | undefined;
    declare errRawInlinedNotObject: GoInterface | undefined;
    declare errUnsupportedMutation: GoInterface | undefined;
    declare errorModalVerb: (() => gostring) | undefined;
    declare __go_export: __go_export__from_jsontext$Storage;
    declare float64Type: reflect__from_gostdlib.Type | undefined;
    declare isZeroerType: reflect__from_gostdlib.Type | undefined;
    declare jsonMarshalerToType: reflect__from_gostdlib.Type | undefined;
    declare jsonMarshalerType: reflect__from_gostdlib.Type | undefined;
    declare jsonUnmarshalerFromType: reflect__from_gostdlib.Type | undefined;
    declare jsonUnmarshalerType: reflect__from_gostdlib.Type | undefined;
    declare jsontextValueType: reflect__from_gostdlib.Type | undefined;
    declare lookupArshalerCache: sync__from_gostdlib.Map;
    declare mapStringAnyType: reflect__from_gostdlib.Type | undefined;
    declare sliceAnyType: reflect__from_gostdlib.Type | undefined;
    declare stringType: reflect__from_gostdlib.Type | undefined;
    declare stringsPools: tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool> | undefined;
    declare textAppenderType: reflect__from_gostdlib.Type | undefined;
    declare textMarshalerType: reflect__from_gostdlib.Type | undefined;
    declare textUnmarshalerType: reflect__from_gostdlib.Type | undefined;
    declare timeDurationType: reflect__from_gostdlib.Type | undefined;
    declare timeTimeType: reflect__from_gostdlib.Type | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
