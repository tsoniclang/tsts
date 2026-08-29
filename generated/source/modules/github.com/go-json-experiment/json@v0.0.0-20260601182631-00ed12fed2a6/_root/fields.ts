import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../support/interface-contracts.js";
import type { arshaler } from "./arshal.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, int8, uint64, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/state.js";
import { Flags as Flags__from_jsonflags, MatchCaseInsensitiveNames$constant as MatchCaseInsensitiveNames$constant__from_jsonflags, MatchCaseSensitiveDelimiter$constant as MatchCaseSensitiveDelimiter$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { AppendQuote as AppendQuote__from_jsonwire, NeedEscape as NeedEscape__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { Pointer as Pointer__from_jsontext, Value as Value__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { Compare$int } from "../../../../../support/generics/concretizations/cmp/Compare.js";
import { Or$Named_error, Or$PointerTo_Named_json$SemanticError, Or$int } from "../../../../../support/generics/concretizations/cmp/Or.js";
import { Compare$SliceOf_int$int } from "../../../../../support/generics/concretizations/slices/Compare.js";
import { SortFunc$SliceOf_Named_json$structField$Named_json$structField, SortFunc$SliceOf_PointerTo_Named_json$structField$PointerTo_Named_json$structField } from "../../../../../support/generics/concretizations/slices/SortFunc.js";
import { SortStableFunc$SliceOf_Named_json$structField$Named_json$structField } from "../../../../../support/generics/concretizations/slices/SortStableFunc.js";
import { $goInterfaceAdapter$byte, $goInterfaceAdapter$int32, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$IsZero$void_to_bool } from "../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_PointerTo_Named_json$structField, $goMap$MapOf_string_To_SliceOf_PointerTo_Named_json$structField, $goMap$MapOf_Named_reflect$Type_To_bool as GoMap } from "../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { addressableValue, lookupArshaler } from "./arshal.js";
import { implementsAny } from "./arshal_methods.js";
import { nonComparable, requireKeyedLiterals } from "./doc.js";
import { SemanticError } from "./errors.js";
import { foldName } from "./fold.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringEncodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export interface isZeroer extends GoInterfaceValue {
    IsZero(): bool;
}
export const isZeroer$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$IsZero$void_to_bool]);
export function isZeroer$is(value: GoInterfaceValue | undefined): value is isZeroer {
    return value !== undefined && value.$go$implements(isZeroer$contract);
}
export class structFields {
    declare private readonly $goType: void;
    public constructor(public flattened: RuntimeSlice<structField$Storage>, public byActualName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<structField> | undefined>, public byFoldedName: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<structField> | undefined>>, public inlinedFallback: tsonicTypeScriptRuntime.Location<structField> | undefined) {
    }
    static $zero(): structFields {
        return new structFields(RuntimeSlice.nil<structField$Storage>(), $goMap$MapOf_string_To_PointerTo_Named_json$structField.nil(), $goMap$MapOf_string_To_SliceOf_PointerTo_Named_json$structField.nil(), void 0);
    }
    static $copy($source: structFields): structFields {
        return new structFields($source.flattened, $source.byActualName, $source.byFoldedName, $source.inlinedFallback);
    }
    declare private readonly then?: never;
    static $go$private$json$lookupByFoldedName(fs: tsonicTypeScriptRuntime.Location<structFields> | undefined, name: RuntimeSlice<uint8>): RuntimeSlice<tsonicTypeScriptRuntime.Location<structField> | undefined> {
        const __gotots_map_0 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structFields>).value.byFoldedName;
        const __gotots_conversion_6 = foldName(name);
        let __gotots_conversion_7 = "";
        for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
            __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
        }
        const __gotots_map_1 = __gotots_conversion_7;
        return __gotots_map_0.lookup(__gotots_map_1);
    }
    static $go$private$json$reindex(sf: tsonicTypeScriptRuntime.Location<structFields> | undefined): void {
        let reindex: (($0: tsonicTypeScriptRuntime.Location<structField> | undefined) => void) | undefined = (f: tsonicTypeScriptRuntime.Location<structField> | undefined): void => {
            structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index0 = structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index.get(0);
            structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index = structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index.slice(1, null, null);
            if (structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index.length === 0) {
                structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).index = RuntimeSlice.nil<int>();
            }
        };
        const __gotots_range_4 = ((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structFields>).value.flattened;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
            const __gotots_range_value_8 = __gotots_range_index_3;
            let i = __gotots_range_value_8;
            const __gotots_callee_12 = reindex;
            const __gotots_argument_62 = tsonicTypeScriptRuntime.projectLocation<structField$Storage, structField>(goSliceAddress<structField$Storage>(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structFields>).value.flattened, i), structField.$fromStorage, structField.$storageOf);
            (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62);
        }
        if (!(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structFields>).value.inlinedFallback === undefined)) {
            const __gotots_callee_13 = reindex;
            const __gotots_argument_63 = ((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structFields>).value.inlinedFallback;
            (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63);
        }
    }
}
export type structField$Storage = {
    id: int;
    index0: int;
    index: RuntimeSlice<int>;
    typ: reflect__from_gostdlib.Type | undefined;
    fncs: arshaler | undefined;
    isZero: (($0: addressableValue) => bool) | undefined;
    isEmpty: (($0: addressableValue) => bool) | undefined;
    fieldOptions: fieldOptions$Storage;
};
export class structField implements GoContainerStoredValue<structField$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: structField$Storage) {
    }
    public static $storageOf($source: structField): structField$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: structField$Storage): structField {
        return new structField($source);
    }
    public get id(): int {
        return this.$storage.id;
    }
    public set id($value: int) {
        this.$storage.id = $value;
    }
    public get index0(): int {
        return this.$storage.index0;
    }
    public set index0($value: int) {
        this.$storage.index0 = $value;
    }
    public get index(): RuntimeSlice<int> {
        return this.$storage.index;
    }
    public set index($value: RuntimeSlice<int>) {
        this.$storage.index = $value;
    }
    public get typ(): reflect__from_gostdlib.Type | undefined {
        return this.$storage.typ;
    }
    public set typ($value: reflect__from_gostdlib.Type | undefined) {
        this.$storage.typ = $value;
    }
    public get fncs(): arshaler | undefined {
        return this.$storage.fncs;
    }
    public set fncs($value: arshaler | undefined) {
        this.$storage.fncs = $value;
    }
    public get isZero(): (($0: addressableValue) => bool) | undefined {
        return this.$storage.isZero;
    }
    public set isZero($value: (($0: addressableValue) => bool) | undefined) {
        this.$storage.isZero = $value;
    }
    public get isEmpty(): (($0: addressableValue) => bool) | undefined {
        return this.$storage.isEmpty;
    }
    public set isEmpty($value: (($0: addressableValue) => bool) | undefined) {
        this.$storage.isEmpty = $value;
    }
    public get fieldOptions(): fieldOptions {
        return fieldOptions.$fromStorage(this.$storage.fieldOptions);
    }
    public set fieldOptions($value: fieldOptions) {
        this.$storage.fieldOptions = fieldOptions.$storageOf($value);
    }
    declare readonly [$goContainerStorageType]: structField$Storage;
    static $copy($source: structField): structField {
        return new structField({
            id: $source.$storage.id,
            index0: $source.$storage.index0,
            index: $source.$storage.index,
            typ: $source.$storage.typ,
            fncs: $source.$storage.fncs,
            isZero: $source.$storage.isZero,
            isEmpty: $source.$storage.isEmpty,
            fieldOptions: fieldOptions.$storageOf(fieldOptions.$copy(fieldOptions.$fromStorage($source.$storage.fieldOptions)))
        });
    }
    static $zeroStorage(): structField$Storage {
        return {
            id: 0,
            index0: 0,
            index: RuntimeSlice.nil<int>(),
            typ: void 0,
            fncs: void 0,
            isZero: void 0,
            isEmpty: void 0,
            fieldOptions: fieldOptions.$zeroStorage()
        };
    }
    declare private readonly then?: never;
    static $go$private$json$matchFoldedName(f: tsonicTypeScriptRuntime.Location<structField> | undefined, name: RuntimeSlice<uint8>, flags: tsonicTypeScriptRuntime.Location<Flags__from_jsonflags> | undefined): bool {
        if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
            structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).casing === caseIgnore$int8 || (((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(MatchCaseInsensitiveNames$constant__from_jsonflags()) && (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
            structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).casing !== caseStrict$int8)) {
            let __gotots_logical_result_6 = !((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(MatchCaseSensitiveDelimiter$constant__from_jsonflags());
            if (!__gotots_logical_result_6) {
                const __gotots_conversion_9 = name;
                let __gotots_conversion_10 = "";
                for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
                    __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
                }
                const __gotots_argument_56 = __gotots_conversion_10;
                const __gotots_argument_57 = (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                    structField.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).fieldOptions)).name;
                __gotots_logical_result_6 = strings__from_gostdlib.EqualFold(__gotots_argument_56, __gotots_argument_57);
            }
            if (__gotots_logical_result_6) {
                return true;
            }
        }
        return false;
    }
}
export function makeStructFields(root: reflect__from_gostdlib.Type | undefined): [
    structFields,
    {
        value: SemanticError;
    } | undefined
] {
    let fs: structFields = structFields.$zero();
    const fs$location = tsonicTypeScriptRuntime.boundLocation({}, () => fs, fs$next => fs = fs$next);
    let serr: {
        value: SemanticError;
    } | undefined = void 0;
    let orErrorf: (($0: {
        value: SemanticError;
    } | undefined, $1: reflect__from_gostdlib.Type | undefined, $2: gostring, $3: RuntimeSlice<GoInterface | undefined>) => {
        value: SemanticError;
    } | undefined) | undefined = (serr__shadow_1: {
        value: SemanticError;
    } | undefined, t: reflect__from_gostdlib.Type | undefined, f: gostring, a: RuntimeSlice<GoInterface | undefined>): {
        value: SemanticError;
    } | undefined => {
        return Or$PointerTo_Named_json$SemanticError(RuntimeSlice.literal<{
            value: SemanticError;
        } | undefined>([serr__shadow_1, { value: new SemanticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), "", 0n, new Pointer__from_jsontext(""), 0, new Value__from_jsontext(RuntimeSlice.nil<uint8>()), t, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf(f, a))) },
        ]));
    };
    let queueIndex = 0;
    type queueEntry$Storage = {
        typ: reflect__from_gostdlib.Type | undefined;
        index: RuntimeSlice<int>;
        visitChildren: bool;
    };
    class queueEntry {
        declare private readonly $goType: void;
        public constructor(private readonly $storage: queueEntry$Storage) {
        }
        public static $storageOf($source: queueEntry): queueEntry$Storage {
            return $source.$storage;
        }
        public static $fromStorage($source: queueEntry$Storage): queueEntry {
            return new queueEntry($source);
        }
        public get typ(): reflect__from_gostdlib.Type | undefined {
            return this.$storage.typ;
        }
        public set typ($value: reflect__from_gostdlib.Type | undefined) {
            this.$storage.typ = $value;
        }
        public get index(): RuntimeSlice<int> {
            return this.$storage.index;
        }
        public set index($value: RuntimeSlice<int>) {
            this.$storage.index = $value;
        }
        public get visitChildren(): bool {
            return this.$storage.visitChildren;
        }
        public set visitChildren($value: bool) {
            this.$storage.visitChildren = $value;
        }
        static $copy($source: queueEntry): queueEntry {
            return new queueEntry({
                typ: $source.$storage.typ,
                index: $source.$storage.index,
                visitChildren: $source.$storage.visitChildren
            });
        }
        static $zeroStorage(): queueEntry$Storage {
            return {
                typ: void 0,
                index: RuntimeSlice.nil<int>(),
                visitChildren: false
            };
        }
        declare private readonly then?: never;
    }
    let queue = RuntimeSlice.literal<queueEntry$Storage>([
        (void queueEntry.$storageOf, (void queueEntry.$fromStorage,
            {
                typ: root,
                index: RuntimeSlice.nil<int>(),
                visitChildren: true
            })),
    ]);
    let seen: GoMapValue<reflect__from_gostdlib.Type | undefined, bool> = GoMap.make(1, [[root, true]]);
    let allFields = RuntimeSlice.nil<structField$Storage>(), inlinedFallbacks = RuntimeSlice.nil<structField$Storage>();
    for (; queueIndex < queue.length;) {
        let qe = queueEntry.$copy(queueEntry.$fromStorage(queue.get(queueIndex)));
        queueIndex++;
        let t: reflect__from_gostdlib.Type | undefined = queueEntry.$storageOf(qe).typ;
        let inlinedFallbackIndex = -1;
        let namesIndex: GoMapValue<gostring, int> = GoMap__from_gotots_runtime.make<gostring, int>(0, 0, []);
        let hasAnyJSONTag = false;
        let hasAnyJSONField = false;
        const __gotots_receiver_0 = t;
        const __gotots_range_0 = globalThis.Number(BigInt.asIntN(64, goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).NumField()));
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            let i = __gotots_range_value_0;
            const __gotots_receiver_1 = t;
            const __gotots_argument_0 = i;
            let sf = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_1).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_0)));
            const __gotots_results_1 = sf.Tag.Lookup("json");
            let hasTag = __gotots_results_1[1];
            hasAnyJSONTag = hasAnyJSONTag || hasTag;
            const __gotots_results_2 = parseFieldOptions(named_reflect.ReflectStructFieldOperations.$copy(sf));
            let options = __gotots_results_2[0];
            let ignored = __gotots_results_2[1];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[2];
            if (!(err === undefined)) {
                serr = Or$PointerTo_Named_json$SemanticError(RuntimeSlice.literal<{
                    value: SemanticError;
                } | undefined>([serr, { value: new SemanticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), "", 0n, new Pointer__from_jsontext(""), 0, new Value__from_jsontext(RuntimeSlice.nil<uint8>()), t, err) },
                ]));
            }
            if (ignored) {
                continue;
            }
            hasAnyJSONField = true;
            let f = structField.$fromStorage({
                index: goSliceAppendSlice<int>(RuntimeSlice.make<int>(0, queueEntry.$storageOf(qe).index.length + 1, 0), queueEntry.$storageOf(qe).index, 0).append(0, [i]),
                typ: sf.Type,
                fieldOptions: fieldOptions.$storageOf(fieldOptions.$copy(options)),
                id: 0,
                index0: 0,
                fncs: void 0,
                isZero: void 0,
                isEmpty: void 0
            });
            if (sf.Anonymous && !(void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(f).fieldOptions)).hasName) {
                const __gotots_receiver_2 = indirectType(structField.$storageOf(f).typ);
                if (!(named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_2).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Struct))) {
                    const __gotots_callee_0 = orErrorf;
                    const __gotots_argument_1 = serr;
                    const __gotots_argument_2 = t;
                    const __gotots_argument_3 = "embedded Go struct field %s of non-struct type must be explicitly given a JSON name";
                    const __gotots_argument_4 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)]);
                    serr = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
                }
                else {
                    (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(f).fieldOptions)).inline = true;
                }
            }
            if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(f).fieldOptions)).inline) {
                if (!fieldOptions.$equal(fieldOptions.$fromStorage(structField.$storageOf(f).fieldOptions), (fieldOptions.$fromStorage({
                    name: (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(f).fieldOptions)).name,
                    quotedName: (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(f).fieldOptions)).quotedName,
                    inline: true,
                    hasName: false,
                    nameNeedEscape: false,
                    casing: 0,
                    omitzero: false,
                    omitempty: false,
                    __go_string: false,
                    format: ""
                })))) {
                    const __gotots_callee_1 = orErrorf;
                    const __gotots_argument_5 = serr;
                    const __gotots_argument_6 = t;
                    const __gotots_argument_7 = "Go struct field %s cannot have any options other than `inline` specified";
                    const __gotots_argument_8 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)]);
                    serr = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
                    if ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(f).fieldOptions)).hasName) {
                        continue;
                    }
                    structField.$storageOf(f).fieldOptions =
                        (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                            {
                                name: (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                                    structField.$storageOf(f).fieldOptions)).name,
                                quotedName: (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                                    structField.$storageOf(f).fieldOptions)).quotedName,
                                inline: (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                                    structField.$storageOf(f).fieldOptions)).inline,
                                hasName: false,
                                nameNeedEscape: false,
                                casing: 0,
                                omitzero: false,
                                omitempty: false,
                                __go_string: false,
                                format: ""
                            }));
                }
                let tf: reflect__from_gostdlib.Type | undefined = indirectType(structField.$storageOf(f).typ);
                if (implementsAny(tf, $state.allMethodTypes) && !goInterfaceEqual(tf, $state.jsontextValueType)) {
                    const __gotots_callee_2 = orErrorf;
                    const __gotots_argument_9 = serr;
                    const __gotots_argument_10 = t;
                    const __gotots_argument_11 = "inlined Go struct field %s of type %s must not implement marshal or unmarshal methods";
                    const __gotots_argument_12 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), tf]);
                    serr = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
                }
                const __gotots_receiver_3 = tf;
                if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_3).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Struct)) {
                    if (queueEntry.$storageOf(qe).visitChildren) {
                        const __gotots_slice_build_0 = queue;
                        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                        let __gotots_slice_build_1 = __gotots_slice_build_0;
                        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void queueEntry.$storageOf, (void queueEntry.$fromStorage,
                                {
                                    typ: tf,
                                    index: structField.$storageOf(f).index,
                                    visitChildren: !seen.lookup(tf)
                                })));
                        }
                        else {
                            __gotots_slice_build_1 = goSliceAllocate<queueEntry$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                                __gotots_slice_build_1.set(__gotots_slice_build_3, queueEntry.$storageOf(queueEntry.$copy(queueEntry.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                            }
                            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void queueEntry.$storageOf, (void queueEntry.$fromStorage,
                                {
                                    typ: tf,
                                    index: structField.$storageOf(f).index,
                                    visitChildren: !seen.lookup(tf)
                                })));
                            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, queueEntry.$zeroStorage());
                            }
                        }
                        queue = __gotots_slice_build_1;
                    }
                    seen.store(tf, true);
                    continue;
                }
                else if (!sf.IsExported()) {
                    const __gotots_callee_3 = orErrorf;
                    const __gotots_argument_13 = serr;
                    const __gotots_argument_14 = t;
                    const __gotots_argument_15 = "inlined Go struct field %s is not exported";
                    const __gotots_argument_16 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)]);
                    serr = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
                    continue;
                }
                {
                    let __gotots_switch_selection_0 = -1;
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_0 = false;
                        if (!__gotots_switch_match_0) {
                            __gotots_switch_match_0 = goInterfaceEqual(tf, $state.jsontextValueType);
                        }
                        if (__gotots_switch_match_0) {
                            __gotots_switch_selection_0 = 0;
                        }
                    }
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_1 = false;
                        if (!__gotots_switch_match_1) {
                            const __gotots_receiver_4 = tf;
                            let __gotots_logical_result_0 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_4).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Map);
                            if (__gotots_logical_result_0) {
                                const __gotots_receiver_5 = tf;
                                const __gotots_receiver_6 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_5).Key();
                                __gotots_logical_result_0 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_6).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String);
                            }
                            __gotots_switch_match_1 = __gotots_logical_result_0;
                        }
                        if (__gotots_switch_match_1) {
                            __gotots_switch_selection_0 = 1;
                        }
                    }
                    if (__gotots_switch_selection_0 === -1) {
                        __gotots_switch_selection_0 = 2;
                    }
                    __gotots_control_target_0: switch (__gotots_switch_selection_0) {
                        case 0: {
                            structField.$storageOf(f).fncs = void 0;
                            break;
                        }
                        case 1: {
                            const __gotots_receiver_7 = tf;
                            const __gotots_argument_17 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_7).Key();
                            const __gotots_argument_18 = $state.allMethodTypes;
                            if (implementsAny(__gotots_argument_17, __gotots_argument_18)) {
                                const __gotots_callee_4 = orErrorf;
                                const __gotots_argument_19 = serr;
                                const __gotots_argument_20 = t;
                                const __gotots_argument_21 = "inlined map field %s of type %s must have a string key that does not implement marshal or unmarshal methods";
                                const __gotots_argument_22 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), tf]);
                                serr = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22);
                                continue;
                            }
                            const __gotots_receiver_8 = tf;
                            const __gotots_argument_23 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_8).Elem();
                            structField.$storageOf(f).fncs = lookupArshaler(__gotots_argument_23);
                            break;
                        }
                        case 2: {
                            const __gotots_callee_5 = orErrorf;
                            const __gotots_argument_24 = serr;
                            const __gotots_argument_25 = t;
                            const __gotots_argument_26 = "inlined Go struct field %s of type %s must be a Go struct, Go map of string key, or jsontext.Value";
                            const __gotots_argument_27 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), tf]);
                            serr = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27);
                            continue;
                            break;
                        }
                    }
                }
                if (inlinedFallbackIndex >= 0) {
                    const __gotots_callee_6 = orErrorf;
                    const __gotots_argument_31 = serr;
                    const __gotots_argument_32 = t;
                    const __gotots_argument_33 = "inlined Go struct fields %s and %s cannot both be a Go map or jsontext.Value";
                    const __gotots_receiver_9 = t;
                    const __gotots_argument_28 = inlinedFallbackIndex;
                    const __gotots_argument_29 = new GoInterfaceAdapter(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_9).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_28))).Name);
                    const __gotots_argument_30 = new GoInterfaceAdapter(sf.Name);
                    const __gotots_argument_34 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_29, __gotots_argument_30]);
                    serr = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34);
                }
                inlinedFallbackIndex = i;
                const __gotots_slice_build_4 = inlinedFallbacks;
                const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
                let __gotots_slice_build_5 = __gotots_slice_build_4;
                if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                    __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                    __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, structField.$storageOf(structField.$copy(f)));
                }
                else {
                    __gotots_slice_build_5 = goSliceAllocate<structField$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                    for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                        __gotots_slice_build_5.set(__gotots_slice_build_7, structField.$storageOf(structField.$copy(structField.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                    }
                    __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, structField.$storageOf(structField.$copy(f)));
                    for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                        __gotots_slice_build_5.$initialize(__gotots_slice_build_7, structField.$zeroStorage());
                    }
                }
                inlinedFallbacks = __gotots_slice_build_5;
            }
            else {
                if (!sf.IsExported()) {
                    let tf: reflect__from_gostdlib.Type | undefined = indirectType(structField.$storageOf(f).typ);
                    let __gotots_logical_result_1 = sf.Anonymous;
                    if (__gotots_logical_result_1) {
                        const __gotots_receiver_10 = tf;
                        __gotots_logical_result_1 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_10).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Struct);
                    }
                    if (!(__gotots_logical_result_1)) {
                        const __gotots_callee_7 = orErrorf;
                        const __gotots_argument_35 = serr;
                        const __gotots_argument_36 = t;
                        const __gotots_argument_37 = "Go struct field %s is not exported";
                        const __gotots_argument_38 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)]);
                        serr = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38);
                        continue;
                    }
                    if (implementsAny(tf, $state.allMethodTypes) || ((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(f).fieldOptions)).omitzero && implementsAny(tf, RuntimeSlice.literal<reflect__from_gostdlib.Type | undefined>([$state.isZeroerType])))) {
                        const __gotots_callee_8 = orErrorf;
                        const __gotots_argument_39 = serr;
                        const __gotots_argument_40 = t;
                        const __gotots_argument_41 = "Go struct field %s is not exported for method calls";
                        const __gotots_argument_42 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)]);
                        serr = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_39, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42);
                        continue;
                    }
                }
                {
                    let __gotots_switch_selection_1 = -1;
                    if (__gotots_switch_selection_1 === -1) {
                        let __gotots_switch_match_2 = false;
                        if (!__gotots_switch_match_2) {
                            const __gotots_receiver_11 = sf.Type;
                            let __gotots_logical_result_2 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_11).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Interface);
                            if (__gotots_logical_result_2) {
                                const __gotots_receiver_12 = sf.Type;
                                const __gotots_argument_43 = $state.isZeroerType;
                                __gotots_logical_result_2 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_12).Implements(__gotots_argument_43);
                            }
                            __gotots_switch_match_2 = __gotots_logical_result_2;
                        }
                        if (__gotots_switch_match_2) {
                            __gotots_switch_selection_1 = 0;
                        }
                    }
                    if (__gotots_switch_selection_1 === -1) {
                        let __gotots_switch_match_3 = false;
                        if (!__gotots_switch_match_3) {
                            const __gotots_receiver_14 = sf.Type;
                            let __gotots_logical_result_4 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_14).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer);
                            if (__gotots_logical_result_4) {
                                const __gotots_receiver_15 = sf.Type;
                                const __gotots_argument_44 = $state.isZeroerType;
                                __gotots_logical_result_4 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_15).Implements(__gotots_argument_44);
                            }
                            __gotots_switch_match_3 = __gotots_logical_result_4;
                        }
                        if (__gotots_switch_match_3) {
                            __gotots_switch_selection_1 = 1;
                        }
                    }
                    if (__gotots_switch_selection_1 === -1) {
                        let __gotots_switch_match_4 = false;
                        if (!__gotots_switch_match_4) {
                            const __gotots_receiver_17 = sf.Type;
                            const __gotots_argument_45 = $state.isZeroerType;
                            __gotots_switch_match_4 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_17).Implements(__gotots_argument_45);
                        }
                        if (__gotots_switch_match_4) {
                            __gotots_switch_selection_1 = 2;
                        }
                    }
                    if (__gotots_switch_selection_1 === -1) {
                        let __gotots_switch_match_5 = false;
                        if (!__gotots_switch_match_5) {
                            const __gotots_receiver_19 = reflect__from_gostdlib.PointerTo(sf.Type);
                            const __gotots_argument_46 = $state.isZeroerType;
                            __gotots_switch_match_5 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_19).Implements(__gotots_argument_46);
                        }
                        if (__gotots_switch_match_5) {
                            __gotots_switch_selection_1 = 3;
                        }
                    }
                    __gotots_control_target_1: switch (__gotots_switch_selection_1) {
                        case 0: {
                            structField.$storageOf(f).isZero = (va: addressableValue): bool => {
                                let __gotots_logical_result_3 = addressableValue.$storageOf(va).Value.IsNil() || (named_reflect.ReflectKindValueOperations.$project(addressableValue.$storageOf(va).Value.Elem().Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer) && addressableValue.$storageOf(va).Value.Elem().IsNil());
                                if (!__gotots_logical_result_3) {
                                    const __gotots_receiver_13 = (($value: GoInterface | undefined): isZeroer | undefined => {
                                        if (!isZeroer$is($value)) {
                                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                        }
                                        return $value;
                                    })(addressableValue.$storageOf(va).Value.Interface());
                                    __gotots_logical_result_3 = goInterfaceNonNil<isZeroer>(__gotots_receiver_13).IsZero();
                                }
                                return __gotots_logical_result_3;
                            };
                            break;
                        }
                        case 1: {
                            structField.$storageOf(f).isZero = (va: addressableValue): bool => {
                                let __gotots_logical_result_5 = addressableValue.$storageOf(va).Value.IsNil();
                                if (!__gotots_logical_result_5) {
                                    const __gotots_receiver_16 = (($value: GoInterface | undefined): isZeroer | undefined => {
                                        if (!isZeroer$is($value)) {
                                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                        }
                                        return $value;
                                    })(addressableValue.$storageOf(va).Value.Interface());
                                    __gotots_logical_result_5 = goInterfaceNonNil<isZeroer>(__gotots_receiver_16).IsZero();
                                }
                                return __gotots_logical_result_5;
                            };
                            break;
                        }
                        case 2: {
                            structField.$storageOf(f).isZero = (va: addressableValue): bool => {
                                const __gotots_receiver_18 = (($value: GoInterface | undefined): isZeroer | undefined => {
                                    if (!isZeroer$is($value)) {
                                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                    }
                                    return $value;
                                })(addressableValue.$storageOf(va).Value.Interface());
                                return goInterfaceNonNil<isZeroer>(__gotots_receiver_18).IsZero();
                            };
                            break;
                        }
                        case 3: {
                            structField.$storageOf(f).isZero = (va: addressableValue): bool => {
                                const __gotots_receiver_20 = (($value: GoInterface | undefined): isZeroer | undefined => {
                                    if (!isZeroer$is($value)) {
                                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                    }
                                    return $value;
                                })(addressableValue.$storageOf(va).Value.Addr().Interface());
                                return goInterfaceNonNil<isZeroer>(__gotots_receiver_20).IsZero();
                            };
                            break;
                        }
                    }
                }
                const __gotots_receiver_21 = sf.Type;
                switch (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_21).Kind())) {
                    case 24n:
                    case 21n:
                    case 17n:
                    case 23n: {
                        structField.$storageOf(f).isEmpty = (va: addressableValue): bool => {
                            return globalThis.Number(BigInt.asIntN(64, addressableValue.$storageOf(va).Value.Len())) === 0;
                        };
                        break;
                    }
                    case 22n:
                    case 20n: {
                        structField.$storageOf(f).isEmpty = (va: addressableValue): bool => {
                            return addressableValue.$storageOf(va).Value.IsNil();
                        };
                        break;
                    }
                }
                {
                    const __gotots_results_3 = namesIndex.lookupOk((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                        structField.$storageOf(f).fieldOptions)).name);
                    let j = __gotots_results_3[0];
                    let ok = __gotots_results_3[1];
                    if (ok) {
                        const __gotots_callee_9 = orErrorf;
                        const __gotots_argument_51 = serr;
                        const __gotots_argument_52 = t;
                        const __gotots_argument_53 = "Go struct fields %s and %s conflict over JSON object name %q";
                        const __gotots_receiver_22 = t;
                        const __gotots_argument_47 = j;
                        const __gotots_argument_48 = new GoInterfaceAdapter(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_22).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_47))).Name);
                        const __gotots_argument_49 = new GoInterfaceAdapter(sf.Name);
                        const __gotots_argument_50 = new GoInterfaceAdapter((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                            structField.$storageOf(f).fieldOptions)).name);
                        const __gotots_argument_54 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_48, __gotots_argument_49, __gotots_argument_50]);
                        serr = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_51, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54);
                    }
                }
                namesIndex.store((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                    structField.$storageOf(f).fieldOptions)).name, i);
                structField.$storageOf(f).id = allFields.length;
                structField.$storageOf(f).fncs = lookupArshaler(sf.Type);
                const __gotots_slice_build_8 = allFields;
                const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
                let __gotots_slice_build_9 = __gotots_slice_build_8;
                if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                    __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                    __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, structField.$storageOf(structField.$copy(f)));
                }
                else {
                    __gotots_slice_build_9 = goSliceAllocate<structField$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                    for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                        __gotots_slice_build_9.set(__gotots_slice_build_11, structField.$storageOf(structField.$copy(structField.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                    }
                    __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, structField.$storageOf(structField.$copy(f)));
                    for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                        __gotots_slice_build_9.$initialize(__gotots_slice_build_11, structField.$zeroStorage());
                    }
                }
                allFields = __gotots_slice_build_9;
            }
        }
        const __gotots_receiver_23 = t;
        const __gotots_binary_operand_0 = globalThis.Number(BigInt.asIntN(64, goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_23).NumField()));
        const __gotots_binary_operand_1 = 0;
        let isEmptyStruct = __gotots_binary_operand_0 === __gotots_binary_operand_1;
        if (!isEmptyStruct && !hasAnyJSONTag && !hasAnyJSONField) {
            serr = Or$PointerTo_Named_json$SemanticError(RuntimeSlice.literal<{
                value: SemanticError;
            } | undefined>([serr, { value: new SemanticError(requireKeyedLiterals.$zero(), new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)), "", 0n, new Pointer__from_jsontext(""), 0, new Value__from_jsontext(RuntimeSlice.nil<uint8>()), t, $state.errNoExportedFields) },
            ]));
        }
    }
    let flattened = allFields.slice(0, 0, null);
    SortStableFunc$SliceOf_Named_json$structField$Named_json$structField(allFields, (x: structField, y: structField): int => {
        return Or$int(RuntimeSlice.literal<int>([globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(x).fieldOptions)).name, (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(y).fieldOptions)).name))), Compare$int(structField.$storageOf(x).index.length, structField.$storageOf(y).index.length), boolsCompare(!(void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(x).fieldOptions)).hasName, !(void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
                structField.$storageOf(y).fieldOptions)).hasName)]));
    });
    for (; allFields.length > 0;) {
        let n = 1;
        for (; n < allFields.length && (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
            (void structField.$storageOf, (void structField.$fromStorage,
                allFields.get(n - 1))).fieldOptions)).name === (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
            (void structField.$storageOf, (void structField.$fromStorage,
                allFields.get(n))).fieldOptions)).name;) {
            n++;
        }
        if (n === 1 || (void structField.$storageOf, (void structField.$fromStorage,
            allFields.get(0))).index.length !== (void structField.$storageOf, (void structField.$fromStorage,
            allFields.get(1))).index.length || (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
            (void structField.$storageOf, (void structField.$fromStorage,
                allFields.get(0))).fieldOptions)).hasName !== (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
            (void structField.$storageOf, (void structField.$fromStorage,
                allFields.get(1))).fieldOptions)).hasName) {
            const __gotots_slice_build_12 = flattened;
            const __gotots_slice_build_14 = __gotots_slice_build_12.length + 1;
            let __gotots_slice_build_13 = __gotots_slice_build_12;
            if (__gotots_slice_build_14 <= __gotots_slice_build_12.capacity) {
                __gotots_slice_build_13 = __gotots_slice_build_12.$withLength(__gotots_slice_build_14);
                __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, structField.$storageOf(structField.$copy(structField.$fromStorage(allFields.get(0)))));
            }
            else {
                __gotots_slice_build_13 = goSliceAllocate<structField$Storage>(__gotots_slice_build_14, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_14));
                for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_12.length; __gotots_slice_build_15++) {
                    __gotots_slice_build_13.set(__gotots_slice_build_15, structField.$storageOf(structField.$copy(structField.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_15)))));
                }
                __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, structField.$storageOf(structField.$copy(structField.$fromStorage(allFields.get(0)))));
                for (let __gotots_slice_build_15 = __gotots_slice_build_14; __gotots_slice_build_15 < __gotots_slice_build_13.capacity; __gotots_slice_build_15++) {
                    __gotots_slice_build_13.$initialize(__gotots_slice_build_15, structField.$zeroStorage());
                }
            }
            flattened = __gotots_slice_build_13;
        }
        allFields = allFields.slice(n, null, null);
    }
    SortFunc$SliceOf_Named_json$structField$Named_json$structField(flattened, (x: structField, y: structField): int => {
        return Compare$int(structField.$storageOf(x).id, structField.$storageOf(y).id);
    });
    const __gotots_range_1 = flattened;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        let i = __gotots_range_value_1;
        (void structField.$storageOf, (void structField.$fromStorage,
            flattened.get(i))).id = i;
    }
    SortFunc$SliceOf_Named_json$structField$Named_json$structField(flattened, (x: structField, y: structField): int => {
        return Compare$SliceOf_int$int(structField.$storageOf(x).index, structField.$storageOf(y).index);
    });
    fs = new structFields(flattened, $goMap$MapOf_string_To_PointerTo_Named_json$structField.make(flattened.length, []), $goMap$MapOf_string_To_SliceOf_PointerTo_Named_json$structField.make(flattened.length, []), void 0);
    const __gotots_range_2 = fs.flattened;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_index_2;
        const __gotots_range_value_3 = structField.$copy(structField.$fromStorage(__gotots_range_2.get(__gotots_range_index_2)));
        let i = __gotots_range_value_2;
        let f = __gotots_range_value_3;
        const __gotots_conversion_0 = (void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
            structField.$storageOf(f).fieldOptions)).name;
        const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
        }
        const __gotots_argument_55 = __gotots_conversion_1;
        const __gotots_conversion_3 = foldName(__gotots_argument_55);
        let __gotots_conversion_4 = "";
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
        }
        let foldedName = __gotots_conversion_4;
        fs.byActualName.store((void fieldOptions.$storageOf, (void fieldOptions.$fromStorage,
            structField.$storageOf(f).fieldOptions)).name, tsonicTypeScriptRuntime.projectLocation<structField$Storage, structField>(goSliceAddress<structField$Storage>(fs.flattened, i), structField.$fromStorage, structField.$storageOf));
        fs.byFoldedName.store(foldedName, fs.byFoldedName.lookup(foldedName).append(void 0, [
            tsonicTypeScriptRuntime.projectLocation<structField$Storage, structField>(goSliceAddress<structField$Storage>(fs.flattened, i), structField.$fromStorage, structField.$storageOf),
        ]));
    }
    const __gotots_range_3 = fs.byFoldedName;
    const __gotots_range_keys_0 = __gotots_range_3.keys();
    for (const __gotots_range_value_4 of __gotots_range_keys_0) {
        const __gotots_range_value_5 = __gotots_range_3.lookupOk(__gotots_range_value_4);
        if (!__gotots_range_value_5[1]) {
            continue;
        }
        const __gotots_range_value_6 = __gotots_range_value_4;
        const __gotots_range_value_7 = __gotots_range_value_5[0];
        let foldedName = __gotots_range_value_6;
        let fields = __gotots_range_value_7;
        if (fields.length > 1) {
            SortFunc$SliceOf_PointerTo_Named_json$structField$PointerTo_Named_json$structField(fields, (x: tsonicTypeScriptRuntime.Location<structField> | undefined, y: tsonicTypeScriptRuntime.Location<structField> | undefined): int => {
                return Compare$int(structField.$storageOf(((x ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).id, structField.$storageOf(((y ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<structField>).value).id);
            });
            fs.byFoldedName.store(foldedName, fields);
        }
    }
    {
        let n = inlinedFallbacks.length;
        if (n === 1 || (n > 1 && (void structField.$storageOf, (void structField.$fromStorage,
            inlinedFallbacks.get(0))).index.length !== (void structField.$storageOf, (void structField.$fromStorage,
            inlinedFallbacks.get(1))).index.length)) {
            fs.inlinedFallback =
                tsonicTypeScriptRuntime.projectLocation<structField$Storage, structField>(goSliceAddress<structField$Storage>(inlinedFallbacks, 0), structField.$fromStorage, structField.$storageOf);
        }
    }
    structFields.$go$private$json$reindex(fs$location);
    return [structFields.$copy(fs), serr];
}
export function indirectType(t: reflect__from_gostdlib.Type | undefined): reflect__from_gostdlib.Type | undefined {
    const __gotots_receiver_24 = t;
    let __gotots_logical_result_7 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_24).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer);
    if (__gotots_logical_result_7) {
        const __gotots_receiver_25 = t;
        const __gotots_binary_operand_2 = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_25).Name();
        const __gotots_binary_operand_3 = "";
        __gotots_logical_result_7 = __gotots_binary_operand_2 === __gotots_binary_operand_3;
    }
    if (__gotots_logical_result_7) {
        const __gotots_receiver_26 = t;
        t = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_26).Elem();
    }
    return t;
}
export const caseIgnore$int8: int8 = 1;
export const caseStrict$int8: int8 = 2;
export type fieldOptions$Storage = {
    name: gostring;
    quotedName: gostring;
    hasName: bool;
    nameNeedEscape: bool;
    casing: int8;
    inline: bool;
    omitzero: bool;
    omitempty: bool;
    __go_string: bool;
    format: gostring;
};
export class fieldOptions {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: fieldOptions$Storage) {
    }
    public static $storageOf($source: fieldOptions): fieldOptions$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: fieldOptions$Storage): fieldOptions {
        return new fieldOptions($source);
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    public get quotedName(): gostring {
        return this.$storage.quotedName;
    }
    public set quotedName($value: gostring) {
        this.$storage.quotedName = $value;
    }
    public get hasName(): bool {
        return this.$storage.hasName;
    }
    public set hasName($value: bool) {
        this.$storage.hasName = $value;
    }
    public get nameNeedEscape(): bool {
        return this.$storage.nameNeedEscape;
    }
    public set nameNeedEscape($value: bool) {
        this.$storage.nameNeedEscape = $value;
    }
    public get casing(): int8 {
        return this.$storage.casing;
    }
    public set casing($value: int8) {
        this.$storage.casing = $value;
    }
    public get inline(): bool {
        return this.$storage.inline;
    }
    public set inline($value: bool) {
        this.$storage.inline = $value;
    }
    public get omitzero(): bool {
        return this.$storage.omitzero;
    }
    public set omitzero($value: bool) {
        this.$storage.omitzero = $value;
    }
    public get omitempty(): bool {
        return this.$storage.omitempty;
    }
    public set omitempty($value: bool) {
        this.$storage.omitempty = $value;
    }
    public get __go_string(): bool {
        return this.$storage.__go_string;
    }
    public set __go_string($value: bool) {
        this.$storage.__go_string = $value;
    }
    public get format(): gostring {
        return this.$storage.format;
    }
    public set format($value: gostring) {
        this.$storage.format = $value;
    }
    static $zero(): fieldOptions {
        return new fieldOptions({
            name: "",
            quotedName: "",
            hasName: false,
            nameNeedEscape: false,
            casing: 0,
            inline: false,
            omitzero: false,
            omitempty: false,
            __go_string: false,
            format: ""
        });
    }
    static $copy($source: fieldOptions): fieldOptions {
        return new fieldOptions({
            name: $source.$storage.name,
            quotedName: $source.$storage.quotedName,
            hasName: $source.$storage.hasName,
            nameNeedEscape: $source.$storage.nameNeedEscape,
            casing: $source.$storage.casing,
            inline: $source.$storage.inline,
            omitzero: $source.$storage.omitzero,
            omitempty: $source.$storage.omitempty,
            __go_string: $source.$storage.__go_string,
            format: $source.$storage.format
        });
    }
    static $equal($left: fieldOptions, $right: fieldOptions): bool {
        return $left.$storage.name === $right.$storage.name && $left.$storage.quotedName === $right.$storage.quotedName && $left.$storage.hasName === $right.$storage.hasName && $left.$storage.nameNeedEscape === $right.$storage.nameNeedEscape && $left.$storage.casing === $right.$storage.casing && $left.$storage.inline === $right.$storage.inline && $left.$storage.omitzero === $right.$storage.omitzero && $left.$storage.omitempty === $right.$storage.omitempty && $left.$storage.__go_string === $right.$storage.__go_string && $left.$storage.format === $right.$storage.format;
    }
    static $zeroStorage(): fieldOptions$Storage {
        return {
            name: "",
            quotedName: "",
            hasName: false,
            nameNeedEscape: false,
            casing: 0,
            inline: false,
            omitzero: false,
            omitempty: false,
            __go_string: false,
            format: ""
        };
    }
    declare private readonly then?: never;
}
export function parseFieldOptions(sf: reflect__from_gostdlib.StructField): [
    fieldOptions,
    bool,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __go_out: fieldOptions = fieldOptions.$zero();
    let ignored: bool = false;
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_5 = sf.Tag.Lookup("json");
                let tag = __gotots_results_5[0];
                let hasTag = __gotots_results_5[1];
                let tagOrig = tag;
                if (tag === "-") {
                    const __gotots_results_6: [
                        fieldOptions,
                        bool,
                        $goInterface$Interface_Method_Error_void_to_string | undefined
                    ] = [fieldOptions.$fromStorage({
                            name: "",
                            quotedName: "",
                            hasName: false,
                            nameNeedEscape: false,
                            casing: 0,
                            inline: false,
                            omitzero: false,
                            omitempty: false,
                            __go_string: false,
                            format: ""
                        }), true, void 0];
                    __go_out = __gotots_results_6[0];
                    ignored = __gotots_results_6[1];
                    err = __gotots_results_6[2];
                    break __gotots_return_block_0;
                }
                if (!sf.IsExported() && !sf.Anonymous) {
                    if (hasTag) {
                        err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unexported Go struct field %s cannot have non-ignored `json:%q` tag", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new GoInterfaceAdapter(tag)])))]));
                    }
                    const __gotots_results_7: [
                        fieldOptions,
                        bool,
                        $goInterface$Interface_Method_Error_void_to_string | undefined
                    ] = [fieldOptions.$fromStorage({
                            name: "",
                            quotedName: "",
                            hasName: false,
                            nameNeedEscape: false,
                            casing: 0,
                            inline: false,
                            omitzero: false,
                            omitempty: false,
                            __go_string: false,
                            format: ""
                        }), true, err];
                    __go_out = __gotots_results_7[0];
                    ignored = __gotots_results_7[1];
                    err = __gotots_results_7[2];
                    break __gotots_return_block_0;
                }
                fieldOptions.$storageOf(__go_out).name = sf.Name;
                if (tag.length > 0 && !strings__from_gostdlib.HasPrefix(tag, ",")) {
                    let n = tag.length - strings__from_gostdlib.TrimLeftFunc(tag, (r: int32): bool => {
                        return !strings__from_gostdlib.ContainsRune(",\\'\"`", r);
                    }).length;
                    let name = goStringSlice(tag, 0, n);
                    let err2: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                    if (!strings__from_gostdlib.HasPrefix(goStringSlice(tag, n), ",") && name.length !== tag.length) {
                        const __gotots_results_8 = consumeTagOption(tag);
                        name = __gotots_results_8[0];
                        n = __gotots_results_8[1];
                        err2 = __gotots_results_8[2];
                        if (!(err2 === undefined)) {
                            err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has malformed `json` tag: %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), err2])))]));
                        }
                    }
                    if (!utf8__from_gostdlib.ValidString(name)) {
                        err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has JSON object name %q with invalid UTF-8", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new GoInterfaceAdapter(name)])))]));
                        const __gotots_conversion_12 = name;
                        let __gotots_conversion_13 = RuntimeSlice.make<int32>(0, __gotots_conversion_12.length, 0);
                        let __gotots_conversion_14 = 0;
                        while (__gotots_conversion_14 < __gotots_conversion_12.length) {
                            const __gotots_conversion_15 = goStringDecodeRune(__gotots_conversion_12, __gotots_conversion_14);
                            __gotots_conversion_13 = __gotots_conversion_13.append(0, [__gotots_conversion_15[0]]);
                            __gotots_conversion_14 += __gotots_conversion_15[1];
                        }
                        const __gotots_conversion_16 = __gotots_conversion_13;
                        let __gotots_conversion_17 = "";
                        for (let __gotots_conversion_18 = 0; __gotots_conversion_18 < __gotots_conversion_16.length; __gotots_conversion_18++) {
                            __gotots_conversion_17 += goStringEncodeRune(__gotots_conversion_16.get(__gotots_conversion_18));
                        }
                        name = __gotots_conversion_17;
                    }
                    if (name === "-" && goStringIndex(tag, 0) === 45) {
                        const __gotots_callee_11 = (): void => {
                            err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has JSON object name %q; either use `json:\"-\"` to ignore the field or use `json:\"'-'%s` to specify %q as the name", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new GoInterfaceAdapter(fieldOptions.$storageOf(__go_out).name), new GoInterfaceAdapter(strings__from_gostdlib.TrimPrefix(strconv__from_gostdlib.Quote(tagOrig), "\"-")), new GoInterfaceAdapter(name)])))]));
                        };
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_callee_11();
                        });
                    }
                    if (err2 === undefined) {
                        fieldOptions.$storageOf(__go_out).hasName = true;
                        fieldOptions.$storageOf(__go_out).name = name;
                    }
                    tag = goStringSlice(tag, n);
                }
                const __gotots_argument_58 = RuntimeSlice.nil<uint8>();
                const __gotots_conversion_19 = fieldOptions.$storageOf(__go_out).name;
                const __gotots_conversion_20 = RuntimeSlice.make<uint8>(__gotots_conversion_19.length, null, 0);
                for (let __gotots_conversion_21 = 0; __gotots_conversion_21 < __gotots_conversion_19.length; __gotots_conversion_21++) {
                    __gotots_conversion_20.set(__gotots_conversion_21, __gotots_conversion_19.charCodeAt(__gotots_conversion_21));
                }
                const __gotots_argument_59 = __gotots_conversion_20;
                const __gotots_argument_60 = tsonicTypeScriptRuntime.location<Flags__from_jsonflags>(Flags__from_jsonflags.$fromStorage({
                    Presence: 0n,
                    Values: 0n
                }));
                const __gotots_results_9 = AppendQuote__from_jsonwire(__gotots_argument_58, __gotots_argument_59, __gotots_argument_60);
                let b = __gotots_results_9[0];
                const __gotots_conversion_22 = b;
                let __gotots_conversion_23 = "";
                for (let __gotots_conversion_24 = 0; __gotots_conversion_24 < __gotots_conversion_22.length; __gotots_conversion_24++) {
                    __gotots_conversion_23 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_22.get(__gotots_conversion_24)));
                }
                fieldOptions.$storageOf(__go_out).quotedName = __gotots_conversion_23;
                const __gotots_conversion_25 = fieldOptions.$storageOf(__go_out).name;
                const __gotots_conversion_26 = RuntimeSlice.make<uint8>(__gotots_conversion_25.length, null, 0);
                for (let __gotots_conversion_27 = 0; __gotots_conversion_27 < __gotots_conversion_25.length; __gotots_conversion_27++) {
                    __gotots_conversion_26.set(__gotots_conversion_27, __gotots_conversion_25.charCodeAt(__gotots_conversion_27));
                }
                const __gotots_argument_61 = __gotots_conversion_26;
                fieldOptions.$storageOf(__go_out).nameNeedEscape = NeedEscape__from_jsonwire(__gotots_argument_61);
                let wasFormat = false;
                let seenOpts: GoMapValue<gostring, bool> = GoMap__from_gotots_runtime.make<gostring, bool>(false, 0, []);
                for (; tag.length > 0;) {
                    if (goStringIndex(tag, 0) !== 44) {
                        err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has malformed `json` tag: invalid character %q before next option (expecting ',')", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new $goInterfaceAdapter$byte(goStringIndex(tag, 0))])))]));
                    }
                    else {
                        tag = goStringSlice(tag, 1);
                        if (tag.length === 0) {
                            err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has malformed `json` tag: invalid trailing ',' character", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)])))]));
                            break;
                        }
                    }
                    const __gotots_results_10 = consumeTagOption(tag);
                    let opt = __gotots_results_10[0];
                    let n = __gotots_results_10[1];
                    let err2: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_10[2];
                    if (!(err2 === undefined)) {
                        err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has malformed `json` tag: %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), err2])))]));
                    }
                    let rawOpt = goStringSlice(tag, 0, n);
                    tag = goStringSlice(tag, n);
                    __gotots_control_target_2: {
                        if (wasFormat) {
                            err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has `format` tag option that was not specified last", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)])))]));
                        }
                        else if (strings__from_gostdlib.HasPrefix(rawOpt, "'") && strings__from_gostdlib.TrimFunc(opt, isLetterOrDigit) === "") {
                            err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has unnecessarily quoted appearance of `%s` tag option; specify `%s` instead", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new GoInterfaceAdapter(rawOpt), new GoInterfaceAdapter(opt)])))]));
                        }
                    }
                    switch (opt) {
                        case "case": {
                            if (!strings__from_gostdlib.HasPrefix(tag, ":")) {
                                err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s is missing value for `case` tag option; specify `case:ignore` or `case:strict` instead", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)])))]));
                                break;
                            }
                            tag = goStringSlice(tag, 1);
                            const __gotots_results_11 = consumeTagOption(tag);
                            let opt__shadow_1 = __gotots_results_11[0];
                            let n__shadow_1 = __gotots_results_11[1];
                            let err2__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_11[2];
                            if (!(err2__shadow_1 === undefined)) {
                                err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has malformed value for `case` tag option: %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), err2__shadow_1])))]));
                                break;
                            }
                            let rawOpt__shadow_1 = goStringSlice(tag, 0, n__shadow_1);
                            tag = goStringSlice(tag, n__shadow_1);
                            if (strings__from_gostdlib.HasPrefix(rawOpt__shadow_1, "'")) {
                                err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has unnecessarily quoted appearance of `case:%s` tag option; specify `case:%s` instead", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new GoInterfaceAdapter(rawOpt__shadow_1), new GoInterfaceAdapter(opt__shadow_1)])))]));
                            }
                            switch (opt__shadow_1) {
                                case "ignore": {
                                    const __gotots_store_0 = fieldOptions.$storageOf(__go_out);
                                    __gotots_store_0.casing = __gotots_store_0.casing | caseIgnore$int8;
                                    break;
                                }
                                case "strict": {
                                    const __gotots_store_1 = fieldOptions.$storageOf(__go_out);
                                    __gotots_store_1.casing = __gotots_store_1.casing | caseStrict$int8;
                                    break;
                                }
                                default: {
                                    err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has unknown `case:%s` tag value", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new GoInterfaceAdapter(rawOpt__shadow_1)])))]));
                                    break;
                                }
                            }
                            break;
                        }
                        case "inline": {
                            fieldOptions.$storageOf(__go_out).inline = true;
                            break;
                        }
                        case "omitzero": {
                            fieldOptions.$storageOf(__go_out).omitzero = true;
                            break;
                        }
                        case "omitempty": {
                            fieldOptions.$storageOf(__go_out).omitempty = true;
                            break;
                        }
                        case "string": {
                            fieldOptions.$storageOf(__go_out).__go_string = true;
                            break;
                        }
                        case "format": {
                            if (true) {
                                err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has invalid `format` tag option without GOEXPERIMENT=jsonformat", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)])))]));
                                break;
                            }
                            if (!strings__from_gostdlib.HasPrefix(tag, ":")) {
                                err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s is missing value for `format` tag option", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)])))]));
                                break;
                            }
                            tag = goStringSlice(tag, 1);
                            const __gotots_results_12 = consumeTagOption(tag);
                            let opt__shadow_1 = __gotots_results_12[0];
                            let n__shadow_1 = __gotots_results_12[1];
                            let err2__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_12[2];
                            if (!(err2__shadow_1 === undefined)) {
                                err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has malformed value for `format` tag option: %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), err2__shadow_1])))]));
                                break;
                            }
                            tag = goStringSlice(tag, n__shadow_1);
                            fieldOptions.$storageOf(__go_out).format = opt__shadow_1;
                            wasFormat = true;
                            break;
                        }
                        default: {
                            let normOpt = strings__from_gostdlib.ReplaceAll(strings__from_gostdlib.ToLower(opt), "_", "");
                            switch (normOpt) {
                                case "case":
                                case "inline":
                                case "omitzero":
                                case "omitempty":
                                case "string":
                                case "format": {
                                    err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has invalid appearance of `%s` tag option; specify `%s` instead", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new GoInterfaceAdapter(opt), new GoInterfaceAdapter(normOpt)])))]));
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    __gotots_control_target_3: {
                        if (fieldOptions.$storageOf(__go_out).casing === 3) {
                            err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s cannot have both `case:ignore` and `case:strict` tag options", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name)])))]));
                        }
                        else if (seenOpts.lookup(opt)) {
                            err = Or$Named_error(RuntimeSlice.literal<$goInterface$Interface_Method_Error_void_to_string | undefined>([err, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("Go struct field %s has duplicate appearance of `%s` tag option", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sf.Name), new GoInterfaceAdapter(rawOpt)])))]));
                        }
                    }
                    seenOpts.store(opt, true);
                }
                const __gotots_results_13: [
                    fieldOptions,
                    bool,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] = [fieldOptions.$copy(__go_out), false, err];
                __go_out = __gotots_results_13[0];
                ignored = __gotots_results_13[1];
                err = __gotots_results_13[2];
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_0) {
            if (!(__gotots_caught_0 instanceof GoPanic)) {
                throw __gotots_caught_0;
            }
            __gotots_panic_0 = __gotots_caught_0;
        }
    }
    finally {
        while (__gotots_defers_0.length !== 0) {
            const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return [fieldOptions.$copy(__go_out), ignored, err];
}
export function consumeTagOption(__go_in: gostring): [
    gostring,
    int,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(__go_in, 44)));
    if (i < 0) {
        i = __go_in.length;
    }
    {
        const __gotots_results_11 = utf8__from_gostdlib.DecodeRuneInString(__go_in);
        const __gotots_results_12 = [__gotots_results_11[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_11[1]))] satisfies [
            int32,
            int
        ];
        let r = __gotots_results_12[0];
        __gotots_control_target_5: {
            if (r === 95 || unicode__from_gostdlib.IsLetter(r)) {
                let n = __go_in.length - strings__from_gostdlib.TrimLeftFunc(__go_in, isLetterOrDigit).length;
                return [goStringSlice(__go_in, 0, n), n, void 0];
            }
            else if (r === 39) {
                if (true) {
                    return [goStringSlice(__go_in, 0, i), i, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid use of single-quoted tag option without GOEXPERIMENT=jsonformat", RuntimeSlice.nil<GoInterface | undefined>()))];
                }
                let inEscape = false;
                let b = RuntimeSlice.literal<uint8>([34]);
                let n = 1;
                for (; __go_in.length > n;) {
                    const __gotots_results_13 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(__go_in, n));
                    const __gotots_results_14 = [__gotots_results_13[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_13[1]))] satisfies [
                        int32,
                        int
                    ];
                    let r__shadow_1 = __gotots_results_14[0];
                    let rn = __gotots_results_14[1];
                    __gotots_control_target_6: {
                        if (inEscape) {
                            if (r__shadow_1 === 39) {
                                b = b.slice(0, b.length - 1, null);
                            }
                            inEscape = false;
                        }
                        else if (r__shadow_1 === 92) {
                            inEscape = true;
                        }
                        else if (r__shadow_1 === 34) {
                            b = b.append(0, [92]);
                        }
                        else if (r__shadow_1 === 39) {
                            b = b.append(0, [34]);
                            n += 1;
                            const __gotots_conversion_28 = b;
                            let __gotots_conversion_29 = "";
                            for (let __gotots_conversion_30 = 0; __gotots_conversion_30 < __gotots_conversion_28.length; __gotots_conversion_30++) {
                                __gotots_conversion_29 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_28.get(__gotots_conversion_30)));
                            }
                            const __gotots_argument_64 = __gotots_conversion_29;
                            const __gotots_results_15 = strconv__from_gostdlib.Unquote(__gotots_argument_64);
                            const __gotots_results_16 = [__gotots_results_15[0], GoProviderInterfaceBridge.$from(__gotots_results_15[1])] satisfies [
                                gostring,
                                $goInterface$Interface_Method_Error_void_to_string | undefined
                            ];
                            let __go_out = __gotots_results_16[0];
                            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_16[1];
                            if (!(err === undefined)) {
                                return [goStringSlice(__go_in, 0, i), i, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid single-quoted string: %s", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringSlice(__go_in, 0, n))])))];
                            }
                            return [__go_out, n, void 0];
                        }
                    }
                    const __gotots_slice_build_16 = b;
                    const __gotots_slice_build_17 = goStringSlice(goStringSlice(__go_in, n), 0, rn);
                    const __gotots_slice_build_18 = goSliceAllocate<uint8>(__gotots_slice_build_17.length, null);
                    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_17.length; __gotots_slice_build_19++) {
                        __gotots_slice_build_18.set(__gotots_slice_build_19, __gotots_slice_build_17.charCodeAt(__gotots_slice_build_19));
                    }
                    b = goSliceAppendSlice<uint8>(__gotots_slice_build_16, __gotots_slice_build_18, 0);
                    n += rn;
                }
                if (n > 10) {
                    n = 10;
                }
                return [goStringSlice(__go_in, 0, i), i, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("single-quoted string not terminated: %s...", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringSlice(__go_in, 0, n))])))];
            }
            else if (__go_in.length === 0) {
                return [goStringSlice(__go_in, 0, i), i, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
            }
            else {
                return [goStringSlice(__go_in, 0, i), i, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid character %q at start of option (expecting Unicode letter or single quote)", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int32(r)])))];
            }
        }
    }
}
export function isLetterOrDigit(r: int32): bool {
    return r === 95 || unicode__from_gostdlib.IsLetter(r) || unicode__from_gostdlib.IsNumber(r);
}
export function boolsCompare(x: bool, y: bool): int {
    __gotots_control_target_4: {
        if (!x && y) {
            return -1;
        }
        else if (x && !y) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
