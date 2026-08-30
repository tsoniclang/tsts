import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../support/interface-contracts.js";
import type { typedArshaler$Storage as typedArshaler__from_json$Storage } from "./arshal_funcs.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { Bools as Bools__from_jsonflags, Flags as Flags__from_jsonflags, Marshalers$constant as Marshalers$constant__from_jsonflags, Unmarshalers$constant as Unmarshalers$constant__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { $state as $state__jsonopts, ArshalValues as ArshalValues__from_jsonopts, Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { $goInterfaceAdapter$PointerTo_Named_json$marshalersOption, $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder, $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder, $goInterfaceAdapter$PointerTo_Named_json$unmarshalersOption, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_jsonflags$Bools as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { typedArshalers } from "./arshal_funcs.js";
import { nonComparable } from "./doc.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export function Deterministic(v: bool): Options__from_jsonopts | undefined {
    if (v) {
        return new GoInterfaceAdapter(new Bools__from_jsonflags(524289n));
    }
    else {
        return new GoInterfaceAdapter(new Bools__from_jsonflags(524288n));
    }
}
export type marshalersOption$Storage = {
    nonComparable: GoArray<(() => void) | undefined, 0>;
    fncVals: RuntimeSlice<typedArshaler__from_json$Storage<Encoder__from_jsontext>>;
    fncCache: sync__from_gostdlib.Map;
    fromAny: bool;
};
export class marshalersOption {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: marshalersOption$Storage) {
    }
    public static $storageOf($source: marshalersOption): marshalersOption$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: marshalersOption$Storage): marshalersOption {
        return new marshalersOption($source);
    }
    public get nonComparable(): nonComparable {
        return new nonComparable(this.$storage.nonComparable);
    }
    public set nonComparable($value: nonComparable) {
        this.$storage.nonComparable = $value.$value;
    }
    public get fncVals(): RuntimeSlice<typedArshaler__from_json$Storage<Encoder__from_jsontext>> {
        return this.$storage.fncVals;
    }
    public set fncVals($value: RuntimeSlice<typedArshaler__from_json$Storage<Encoder__from_jsontext>>) {
        this.$storage.fncVals = $value;
    }
    public get fncCache(): sync__from_gostdlib.Map {
        return this.$storage.fncCache;
    }
    public set fncCache($value: sync__from_gostdlib.Map) {
        this.$storage.fncCache = $value;
    }
    public get fromAny(): bool {
        return this.$storage.fromAny;
    }
    public set fromAny($value: bool) {
        this.$storage.fromAny = $value;
    }
    declare private readonly then?: never;
}
export type unmarshalersOption$Storage = {
    nonComparable: GoArray<(() => void) | undefined, 0>;
    fncVals: RuntimeSlice<typedArshaler__from_json$Storage<Decoder__from_jsontext>>;
    fncCache: sync__from_gostdlib.Map;
    fromAny: bool;
};
export class unmarshalersOption {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: unmarshalersOption$Storage) {
    }
    public static $storageOf($source: unmarshalersOption): unmarshalersOption$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: unmarshalersOption$Storage): unmarshalersOption {
        return new unmarshalersOption($source);
    }
    public get nonComparable(): nonComparable {
        return new nonComparable(this.$storage.nonComparable);
    }
    public set nonComparable($value: nonComparable) {
        this.$storage.nonComparable = $value.$value;
    }
    public get fncVals(): RuntimeSlice<typedArshaler__from_json$Storage<Decoder__from_jsontext>> {
        return this.$storage.fncVals;
    }
    public set fncVals($value: RuntimeSlice<typedArshaler__from_json$Storage<Decoder__from_jsontext>>) {
        this.$storage.fncVals = $value;
    }
    public get fncCache(): sync__from_gostdlib.Map {
        return this.$storage.fncCache;
    }
    public set fncCache($value: sync__from_gostdlib.Map) {
        this.$storage.fncCache = $value;
    }
    public get fromAny(): bool {
        return this.$storage.fromAny;
    }
    public set fromAny($value: bool) {
        this.$storage.fromAny = $value;
    }
    declare private readonly then?: never;
}
export function init(): void {
    $state__jsonopts.GetUnknownOption = (src: Struct__from_jsonopts, zero: Options__from_jsonopts | undefined): [
        GoInterface | undefined,
        bool
    ] => {
        const __gotots_type_switch_0: Options__from_jsonopts | undefined = zero;
        switch (true) {
            case $goInterfaceAdapter$PointerTo_Named_json$marshalersOption.$is(__gotots_type_switch_0): {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(src).Flags).Has(Marshalers$constant__from_jsonflags())) {
                    return [new $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder(void 0), false];
                }
                return [new $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder((($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Encoder__from_jsontext>> | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(src).ArshalValues)).Marshalers)), true];
                break;
            }
            case $goInterfaceAdapter$PointerTo_Named_json$unmarshalersOption.$is(__gotots_type_switch_0): {
                if (!Flags__from_jsonflags.$fromStorage(Struct__from_jsonopts.$storageOf(src).Flags).Has(Unmarshalers$constant__from_jsonflags())) {
                    return [new $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder(void 0), false];
                }
                return [new $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder((($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<typedArshalers<Decoder__from_jsontext>> | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                        Struct__from_jsonopts.$storageOf(src).ArshalValues)).Unmarshalers)), true];
                break;
            }
            default: {
                const __gotots_argument_0 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("unknown option %T", RuntimeSlice.literal<GoInterface | undefined>([zero])));
                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                break;
            }
        }
    };
    $state__jsonopts.JoinUnknownOption = (dst: Struct__from_jsonopts, src: Options__from_jsonopts | undefined): Struct__from_jsonopts => {
        const __gotots_type_switch_1: Options__from_jsonopts | undefined = src;
        switch (true) {
            case $goInterfaceAdapter$PointerTo_Named_json$marshalersOption.$is(__gotots_type_switch_1): {
                let src__shadow_1: tsonicTypeScriptRuntime.Location<marshalersOption> | undefined = __gotots_type_switch_1.$go$value;
                const __gotots_store_0 = Struct__from_jsonopts.$storageOf(dst);
                Flags__from_jsonflags.Set(new $ProjectedPropertyLocation(__gotots_store_0, "Flags", Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(33554433n));
                (void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(dst).ArshalValues)).Marshalers = new $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Encoder(tsonicTypeScriptRuntime.projectLocation<marshalersOption, typedArshalers<Encoder__from_jsontext>>(src__shadow_1, ($go$source: marshalersOption): typedArshalers<Encoder__from_jsontext> => {
                    return typedArshalers.$fromStorage<Encoder__from_jsontext>(marshalersOption.$storageOf($go$source));
                }, ($go$target: typedArshalers<Encoder__from_jsontext>): marshalersOption => {
                    return marshalersOption.$fromStorage(typedArshalers.$storageOf<Encoder__from_jsontext>($go$target));
                }));
                break;
            }
            case $goInterfaceAdapter$PointerTo_Named_json$unmarshalersOption.$is(__gotots_type_switch_1): {
                let src__shadow_1: tsonicTypeScriptRuntime.Location<unmarshalersOption> | undefined = __gotots_type_switch_1.$go$value;
                const __gotots_store_1 = Struct__from_jsonopts.$storageOf(dst);
                Flags__from_jsonflags.Set(new $ProjectedPropertyLocation(__gotots_store_1, "Flags", Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(67108865n));
                (void ArshalValues__from_jsonopts.$storageOf, (void ArshalValues__from_jsonopts.$fromStorage,
                    Struct__from_jsonopts.$storageOf(dst).ArshalValues)).Unmarshalers = new $goInterfaceAdapter$PointerTo_Named_json$typedArshalersOf_Named_jsontext$Decoder(tsonicTypeScriptRuntime.projectLocation<unmarshalersOption, typedArshalers<Decoder__from_jsontext>>(src__shadow_1, ($go$source: unmarshalersOption): typedArshalers<Decoder__from_jsontext> => {
                    return typedArshalers.$fromStorage<Decoder__from_jsontext>(unmarshalersOption.$storageOf($go$source));
                }, ($go$target: typedArshalers<Decoder__from_jsontext>): unmarshalersOption => {
                    return unmarshalersOption.$fromStorage(typedArshalers.$storageOf<Decoder__from_jsontext>($go$target));
                }));
                break;
            }
            default: {
                let src__shadow_1: Options__from_jsonopts | undefined = __gotots_type_switch_1;
                const __gotots_argument_1 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("unknown option %T", RuntimeSlice.literal<GoInterface | undefined>([src__shadow_1])));
                GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                break;
            }
        }
        return Struct__from_jsonopts.$copy(dst);
    };
}
