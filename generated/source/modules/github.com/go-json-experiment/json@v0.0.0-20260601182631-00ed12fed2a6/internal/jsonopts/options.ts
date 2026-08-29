import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { NotForPublicUse as NotForPublicUse__from_internal } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int, int64 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Bools as Bools__from_jsonflags, ByteLimit$constant as ByteLimit$constant__from_jsonflags, DepthLimit$constant as DepthLimit$constant__from_jsonflags, Flags as Flags__from_jsonflags, FormatTag$constant as FormatTag$constant__from_jsonflags, Indent$constant as Indent$constant__from_jsonflags, IndentPrefix$constant as IndentPrefix$constant__from_jsonflags, Marshalers$constant as Marshalers$constant__from_jsonflags, Multiline$constant as Multiline$constant__from_jsonflags, NonBooleanFlags$constant as NonBooleanFlags$constant__from_jsonflags, SpaceAfterColon$constant as SpaceAfterColon$constant__from_jsonflags, SpaceAfterComma$constant as SpaceAfterComma$constant__from_jsonflags, Unmarshalers$constant as Unmarshalers$constant__from_jsonflags } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { $state } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/state.js";
import { $goInterfaceAdapter$Named_jsonopts$ByteLimit, $goInterfaceAdapter$Named_jsonopts$DepthLimit, $goInterfaceAdapter$Named_jsonopts$Indent, $goInterfaceAdapter$Named_jsonopts$IndentPrefix, $goInterfaceAdapter$PointerTo_Named_jsonopts$Struct, $goInterfaceAdapter$Named_jsonflags$Bools as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$JSONOptions$Named_internal$NotForPublicUse_to_void } from "../../../../../../support/interface-methods.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export interface Options extends GoInterfaceValue {
    JSONOptions($argument0: NotForPublicUse__from_internal): void;
}
export const Options$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$JSONOptions$Named_internal$NotForPublicUse_to_void]);
export function Options$is(value: GoInterfaceValue | undefined): value is Options {
    return value !== undefined && value.$go$implements(Options$contract);
}
export type Struct$Storage = {
    Flags: Flags__from_jsonflags$Storage;
    CoderValues: CoderValues$Storage;
    ArshalValues: ArshalValues$Storage;
};
export class Struct {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Struct$Storage) {
    }
    public static $storageOf($source: Struct): Struct$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Struct$Storage): Struct {
        return new Struct($source);
    }
    public get Flags(): Flags__from_jsonflags {
        return Flags__from_jsonflags.$fromStorage(this.$storage.Flags);
    }
    public set Flags($value: Flags__from_jsonflags) {
        this.$storage.Flags = Flags__from_jsonflags.$storageOf($value);
    }
    public get CoderValues(): CoderValues {
        return CoderValues.$fromStorage(this.$storage.CoderValues);
    }
    public set CoderValues($value: CoderValues) {
        this.$storage.CoderValues = CoderValues.$storageOf($value);
    }
    public get ArshalValues(): ArshalValues {
        return ArshalValues.$fromStorage(this.$storage.ArshalValues);
    }
    public set ArshalValues($value: ArshalValues) {
        this.$storage.ArshalValues = ArshalValues.$storageOf($value);
    }
    static $zero(): Struct {
        return new Struct({
            Flags: Flags__from_jsonflags.$zeroStorage(),
            CoderValues: CoderValues.$zeroStorage(),
            ArshalValues: ArshalValues.$zeroStorage()
        });
    }
    static $copy($source: Struct): Struct {
        return new Struct({
            Flags: Flags__from_jsonflags.$storageOf(Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage($source.$storage.Flags))),
            CoderValues: CoderValues.$storageOf(CoderValues.$copy(CoderValues.$fromStorage($source.$storage.CoderValues))),
            ArshalValues: ArshalValues.$storageOf(ArshalValues.$copy(ArshalValues.$fromStorage($source.$storage.ArshalValues)))
        });
    }
    static $equal($left: Struct, $right: Struct): bool {
        return Flags__from_jsonflags.$equal(Flags__from_jsonflags.$fromStorage($left.$storage.Flags), Flags__from_jsonflags.$fromStorage($right.$storage.Flags)) && CoderValues.$equal(CoderValues.$fromStorage($left.$storage.CoderValues), CoderValues.$fromStorage($right.$storage.CoderValues)) && ArshalValues.$equal(ArshalValues.$fromStorage($left.$storage.ArshalValues), ArshalValues.$fromStorage($right.$storage.ArshalValues));
    }
    static $hash($source: Struct): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, Flags__from_jsonflags.$hash(Flags__from_jsonflags.$fromStorage($source.$storage.Flags)));
        $hash = GoMapHash.mix($hash, CoderValues.$hash(CoderValues.$fromStorage($source.$storage.CoderValues)));
        $hash = GoMapHash.mix($hash, ArshalValues.$hash(ArshalValues.$fromStorage($source.$storage.ArshalValues)));
        return $hash;
    }
    static $zeroStorage(): Struct$Storage {
        return {
            Flags: Flags__from_jsonflags.$zeroStorage(),
            CoderValues: CoderValues.$zeroStorage(),
            ArshalValues: ArshalValues.$zeroStorage()
        };
    }
    declare private readonly then?: never;
    static InitializeMultiline(s: tsonicTypeScriptRuntime.Location<Struct> | undefined): void {
        if (!Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(SpaceAfterColon$constant__from_jsonflags())) {
            const __gotots_store_7 = Struct.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
            Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(4097n));
        }
        if (!Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(SpaceAfterComma$constant__from_jsonflags())) {
            const __gotots_store_8 = Struct.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
            Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(8192n));
        }
        if (!Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(Indent$constant__from_jsonflags())) {
            const __gotots_store_9 = Struct.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
            Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(16385n));
            (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                Struct.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).Indent = "\t";
        }
    }
    static JSONOptions($1: tsonicTypeScriptRuntime.Location<Struct> | undefined, $0: NotForPublicUse__from_internal): void {
    }
    static Join(dst: tsonicTypeScriptRuntime.Location<Struct> | undefined, srcs: RuntimeSlice<Options | undefined>): void {
        const __gotots_range_0 = srcs;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let src: Options | undefined = __gotots_range_value_0;
            const __gotots_type_switch_0: Options | undefined = src;
            switch (true) {
                case __gotots_type_switch_0 === void 0: {
                    let src__shadow_1: Options | undefined = __gotots_type_switch_0;
                    continue;
                    break;
                }
                case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
                    let src__shadow_1: Bools__from_jsonflags = __gotots_type_switch_0.$go$value;
                    const __gotots_store_0 = Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
                    Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), src__shadow_1);
                    break;
                }
                case $goInterfaceAdapter$Named_jsonopts$Indent.$is(__gotots_type_switch_0): {
                    let src__shadow_1: Indent = __gotots_type_switch_0.$go$value;
                    const __gotots_store_1 = Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
                    Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(18433n));
                    (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                        Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).Indent = src__shadow_1.$value;
                    break;
                }
                case $goInterfaceAdapter$Named_jsonopts$IndentPrefix.$is(__gotots_type_switch_0): {
                    let src__shadow_1: IndentPrefix = __gotots_type_switch_0.$go$value;
                    const __gotots_store_2 = Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
                    Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(34817n));
                    (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                        Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).IndentPrefix = src__shadow_1.$value;
                    break;
                }
                case $goInterfaceAdapter$Named_jsonopts$ByteLimit.$is(__gotots_type_switch_0): {
                    let src__shadow_1: ByteLimit = __gotots_type_switch_0.$go$value;
                    const __gotots_store_3 = Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
                    Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(65537n));
                    (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                        Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).ByteLimit = src__shadow_1.$value;
                    break;
                }
                case $goInterfaceAdapter$Named_jsonopts$DepthLimit.$is(__gotots_type_switch_0): {
                    let src__shadow_1: DepthLimit = __gotots_type_switch_0.$go$value;
                    const __gotots_store_4 = Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
                    Flags__from_jsonflags.Set(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), new Bools__from_jsonflags(131073n));
                    (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                        Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).DepthLimit = src__shadow_1.$value;
                    break;
                }
                case $goInterfaceAdapter$PointerTo_Named_jsonopts$Struct.$is(__gotots_type_switch_0): {
                    let src__shadow_1: tsonicTypeScriptRuntime.Location<Struct> | undefined = __gotots_type_switch_0.$go$value;
                    const __gotots_store_5 = Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value);
                    Flags__from_jsonflags.Join(tsonicTypeScriptRuntime.projectLocation<Flags__from_jsonflags$Storage, Flags__from_jsonflags>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Flags"), Flags__from_jsonflags.$fromStorage, Flags__from_jsonflags.$storageOf), Flags__from_jsonflags.$copy(Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags)));
                    if (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(NonBooleanFlags$constant__from_jsonflags())) {
                        if (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(Indent$constant__from_jsonflags())) {
                            (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                                Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).Indent = (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                                Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).Indent;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(IndentPrefix$constant__from_jsonflags())) {
                            (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                                Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).IndentPrefix = (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                                Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).IndentPrefix;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(ByteLimit$constant__from_jsonflags())) {
                            (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                                Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).ByteLimit = (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                                Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).ByteLimit;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(DepthLimit$constant__from_jsonflags())) {
                            (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                                Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).DepthLimit = (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
                                Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).CoderValues)).DepthLimit;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(Marshalers$constant__from_jsonflags())) {
                            (void ArshalValues.$storageOf, (void ArshalValues.$fromStorage,
                                Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).ArshalValues)).Marshalers = (void ArshalValues.$storageOf, (void ArshalValues.$fromStorage,
                                Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).ArshalValues)).Marshalers;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(Unmarshalers$constant__from_jsonflags())) {
                            (void ArshalValues.$storageOf, (void ArshalValues.$fromStorage,
                                Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).ArshalValues)).Unmarshalers = (void ArshalValues.$storageOf, (void ArshalValues.$fromStorage,
                                Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).ArshalValues)).Unmarshalers;
                        }
                        if (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).Flags).Has(FormatTag$constant__from_jsonflags())) {
                            (void ArshalValues.$storageOf, (void ArshalValues.$fromStorage,
                                Struct.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).ArshalValues)).Format = (void ArshalValues.$storageOf, (void ArshalValues.$fromStorage,
                                Struct.$storageOf(((src__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value).ArshalValues)).Format;
                        }
                    }
                    break;
                }
                default: {
                    let src__shadow_1: Options | undefined = __gotots_type_switch_0;
                    const __gotots_store_6 = (dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_callee_0 = $state.JoinUnknownOption;
                    const __gotots_argument_0 = Struct.$copy(Struct.$copy(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Struct>).value));
                    const __gotots_argument_1 = src__shadow_1;
                    void (__gotots_store_6.value =
                        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1));
                    break;
                }
            }
        }
    }
}
export type CoderValues$Storage = {
    Indent: gostring;
    IndentPrefix: gostring;
    ByteLimit: int64;
    DepthLimit: int;
};
export class CoderValues {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: CoderValues$Storage) {
    }
    public static $storageOf($source: CoderValues): CoderValues$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: CoderValues$Storage): CoderValues {
        return new CoderValues($source);
    }
    public get Indent(): gostring {
        return this.$storage.Indent;
    }
    public set Indent($value: gostring) {
        this.$storage.Indent = $value;
    }
    public get IndentPrefix(): gostring {
        return this.$storage.IndentPrefix;
    }
    public set IndentPrefix($value: gostring) {
        this.$storage.IndentPrefix = $value;
    }
    public get ByteLimit(): int64 {
        return this.$storage.ByteLimit;
    }
    public set ByteLimit($value: int64) {
        this.$storage.ByteLimit = $value;
    }
    public get DepthLimit(): int {
        return this.$storage.DepthLimit;
    }
    public set DepthLimit($value: int) {
        this.$storage.DepthLimit = $value;
    }
    static $copy($source: CoderValues): CoderValues {
        return new CoderValues({
            Indent: $source.$storage.Indent,
            IndentPrefix: $source.$storage.IndentPrefix,
            ByteLimit: $source.$storage.ByteLimit,
            DepthLimit: $source.$storage.DepthLimit
        });
    }
    static $equal($left: CoderValues, $right: CoderValues): bool {
        return $left.$storage.Indent === $right.$storage.Indent && $left.$storage.IndentPrefix === $right.$storage.IndentPrefix && $left.$storage.ByteLimit === $right.$storage.ByteLimit && $left.$storage.DepthLimit === $right.$storage.DepthLimit;
    }
    static $hash($source: CoderValues): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.Indent));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.IndentPrefix));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.$storage.ByteLimit));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.DepthLimit));
        return $hash;
    }
    static $zeroStorage(): CoderValues$Storage {
        return {
            Indent: "",
            IndentPrefix: "",
            ByteLimit: 0n,
            DepthLimit: 0
        };
    }
    declare private readonly then?: never;
}
export type ArshalValues$Storage = {
    Marshalers: GoInterface | undefined;
    Unmarshalers: GoInterface | undefined;
    Format: gostring;
};
export class ArshalValues {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ArshalValues$Storage) {
    }
    public static $storageOf($source: ArshalValues): ArshalValues$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ArshalValues$Storage): ArshalValues {
        return new ArshalValues($source);
    }
    public get Marshalers(): GoInterface | undefined {
        return this.$storage.Marshalers;
    }
    public set Marshalers($value: GoInterface | undefined) {
        this.$storage.Marshalers = $value;
    }
    public get Unmarshalers(): GoInterface | undefined {
        return this.$storage.Unmarshalers;
    }
    public set Unmarshalers($value: GoInterface | undefined) {
        this.$storage.Unmarshalers = $value;
    }
    public get Format(): gostring {
        return this.$storage.Format;
    }
    public set Format($value: gostring) {
        this.$storage.Format = $value;
    }
    static $copy($source: ArshalValues): ArshalValues {
        return new ArshalValues({
            Marshalers: $source.$storage.Marshalers,
            Unmarshalers: $source.$storage.Unmarshalers,
            Format: $source.$storage.Format
        });
    }
    static $equal($left: ArshalValues, $right: ArshalValues): bool {
        return goInterfaceEqual($left.$storage.Marshalers, $right.$storage.Marshalers) && goInterfaceEqual($left.$storage.Unmarshalers, $right.$storage.Unmarshalers) && $left.$storage.Format === $right.$storage.Format;
    }
    static $hash($source: ArshalValues): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.$storage.Marshalers === undefined ? 0 : $source.$storage.Marshalers.$go$hash());
        $hash = GoMapHash.mix($hash, $source.$storage.Unmarshalers === undefined ? 0 : $source.$storage.Unmarshalers.$go$hash());
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.Format));
        return $hash;
    }
    static $zeroStorage(): ArshalValues$Storage {
        return {
            Marshalers: void 0,
            Unmarshalers: void 0,
            Format: ""
        };
    }
    declare private readonly then?: never;
}
export function ChangedWhitespace(s1: Struct, s2: Struct): bool {
    return Flags__from_jsonflags.$fromStorage(Struct.$storageOf(s1).Flags).Get(Multiline$constant__from_jsonflags()) !== Flags__from_jsonflags.$fromStorage(Struct.$storageOf(s2).Flags).Get(Multiline$constant__from_jsonflags()) || Flags__from_jsonflags.$fromStorage(Struct.$storageOf(s1).Flags).Get(SpaceAfterColon$constant__from_jsonflags()) !== Flags__from_jsonflags.$fromStorage(Struct.$storageOf(s2).Flags).Get(SpaceAfterColon$constant__from_jsonflags()) || Flags__from_jsonflags.$fromStorage(Struct.$storageOf(s1).Flags).Get(SpaceAfterComma$constant__from_jsonflags()) !== Flags__from_jsonflags.$fromStorage(Struct.$storageOf(s2).Flags).Get(SpaceAfterComma$constant__from_jsonflags()) || (Flags__from_jsonflags.$fromStorage(Struct.$storageOf(s2).Flags).Get(Multiline$constant__from_jsonflags()) && ((void CoderValues.$storageOf, (void CoderValues.$fromStorage,
        Struct.$storageOf(s1).CoderValues)).Indent !== (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
        Struct.$storageOf(s2).CoderValues)).Indent || (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
        Struct.$storageOf(s1).CoderValues)).IndentPrefix !== (void CoderValues.$storageOf, (void CoderValues.$fromStorage,
        Struct.$storageOf(s2).CoderValues)).IndentPrefix));
}
export class Indent {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
    JSONOptions($0: NotForPublicUse__from_internal): void {
    }
}
export class IndentPrefix {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
    JSONOptions($0: NotForPublicUse__from_internal): void {
    }
}
export class ByteLimit {
    declare private readonly $goType: void;
    constructor(public readonly $value: int64) {
    }
    declare private readonly then?: never;
}
export class DepthLimit {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
