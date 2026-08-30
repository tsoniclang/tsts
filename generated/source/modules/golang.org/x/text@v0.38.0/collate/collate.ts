import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Elem as Elem__from_colltab, Iter$Storage as Iter__from_colltab$Storage } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/colltab/package.js";
import type { Tag$Storage as Tag__from_language__package_1$Storage } from "../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import type { Option$Storage as Option__from_collate$Storage } from "./option.js";
import type { sorter } from "./sort.js";
import type { gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $state } from "../../../../../packages/golang.org/x/text@v0.38.0/collate/state.js";
import { Elem_Primary as Elem_Primary__from_colltab, Elem_Quaternary as Elem_Quaternary__from_colltab, Elem_Secondary as Elem_Secondary__from_colltab, Elem_Tertiary as Elem_Tertiary__from_colltab, Identity$constant as Identity$constant__from_colltab, Iter as Iter__from_colltab, MatchLang as MatchLang__from_colltab, NewNumericWeighter as NewNumericWeighter__from_colltab, Quaternary$constant as Quaternary$constant__from_colltab, Secondary$constant as Secondary$constant__from_colltab, Tertiary$constant as Tertiary$constant__from_colltab } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/colltab/package.js";
import { Raw$constant as Raw$constant__from_language__package_1, Tag as Tag__from_language__package_1 } from "../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import { $goInterfaceAdapter$PointerTo_Named_colltab$Table as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { getTable, tableIndex } from "./index.js";
import { altShifted$constant, newCollator, options } from "./option.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoArray, goArrayLocation } from "@gotots/runtime/array.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goArraySlice, goSliceAllocate } from "@gotots/runtime/slice.js";
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
export class Collator {
    declare private readonly $goType: void;
    public constructor(public options: options, public sorter: sorter, public _iter: GoArray<iter$Storage, 2>) {
    }
    declare private readonly then?: never;
    static CompareString(c: Collator | undefined, a: gostring, b: gostring): int {
        const __gotots_store_2 = iter.$storageOf(((Collator.$go$private$collate$iter(c, 0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
        Iter__from_colltab.SetInputString(new $ProjectedPropertyLocation(__gotots_store_2, "Iter", Iter__from_colltab.$fromStorage, Iter__from_colltab.$storageOf), a);
        const __gotots_store_3 = iter.$storageOf(((Collator.$go$private$collate$iter(c, 1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
        Iter__from_colltab.SetInputString(new $ProjectedPropertyLocation(__gotots_store_3, "Iter", Iter__from_colltab.$fromStorage, Iter__from_colltab.$storageOf), b);
        {
            let res = Collator.$go$private$collate$compare(c);
            if (res !== 0) {
                return res;
            }
        }
        if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.ignore.get(Identity$constant__from_colltab().$value)) {
            if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
        }
        return 0;
    }
    static $go$private$collate$compare(c: Collator | undefined): int {
        const __gotots_assign_0 = Collator.$go$private$collate$iter(c, 0);
        const __gotots_assign_1 = Collator.$go$private$collate$iter(c, 1);
        let ia: tsonicTypeScriptRuntime.Location<iter> | undefined = __gotots_assign_0;
        let ib: tsonicTypeScriptRuntime.Location<iter> | undefined = __gotots_assign_1;
        if (!((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.alternate.$value === altShifted$constant().$value)) {
            {
                let res = compareLevel(($argument0: tsonicTypeScriptRuntime.Location<iter> | undefined): int => {
                    return iter.$go$private$collate$nextPrimary($argument0);
                }, ia, ib);
                if (res !== 0) {
                    return res;
                }
            }
        }
        else {
        }
        if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.ignore.get(Secondary$constant__from_colltab().$value)) {
            let f: (($0: tsonicTypeScriptRuntime.Location<iter> | undefined) => int) | undefined = ($argument0: tsonicTypeScriptRuntime.Location<iter> | undefined): int => {
                return iter.$go$private$collate$nextSecondary($argument0);
            };
            if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.backwards) {
                f = ($argument0: tsonicTypeScriptRuntime.Location<iter> | undefined): int => {
                    return iter.$go$private$collate$prevSecondary($argument0);
                };
            }
            {
                let res = compareLevel(f, ia, ib);
                if (res !== 0) {
                    return res;
                }
            }
        }
        if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.ignore.get(Tertiary$constant__from_colltab().$value) || (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.caseLevel) {
            {
                let res = compareLevel(($argument0: tsonicTypeScriptRuntime.Location<iter> | undefined): int => {
                    return iter.$go$private$collate$nextTertiary($argument0);
                }, ia, ib);
                if (res !== 0) {
                    return res;
                }
            }
            if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.ignore.get(Quaternary$constant__from_colltab().$value)) {
                {
                    let res = compareLevel(($argument0: tsonicTypeScriptRuntime.Location<iter> | undefined): int => {
                        return iter.$go$private$collate$nextQuaternary($argument0);
                    }, ia, ib);
                    if (res !== 0) {
                        return res;
                    }
                }
            }
        }
        return 0;
    }
    static $go$private$collate$init(c: Collator | undefined): void {
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.numeric) {
            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.t = NewNumericWeighter__from_colltab((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.t);
        }
        const __gotots_store_4 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_address_0 = __gotots_store_4._iter;
        const __gotots_address_1 = 0;
        const __gotots_address_2 = __gotots_address_0;
        const __gotots_address_3 = __gotots_address_2;
        __gotots_address_3.get(__gotots_address_1);
        const __gotots_address_4 = goArrayLocation(__gotots_address_3);
        iter.$go$private$collate$init(tsonicTypeScriptRuntime.projectLocation<iter$Storage, iter>(tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_4, 0), __gotots_address_4[1] + globalThis.Number(__gotots_address_1)), iter.$fromStorage, iter.$storageOf), c);
        const __gotots_store_5 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_address_5 = __gotots_store_5._iter;
        const __gotots_address_6 = 1;
        const __gotots_address_7 = __gotots_address_5;
        const __gotots_address_8 = __gotots_address_7;
        __gotots_address_8.get(__gotots_address_6);
        const __gotots_address_9 = goArrayLocation(__gotots_address_8);
        iter.$go$private$collate$init(tsonicTypeScriptRuntime.projectLocation<iter$Storage, iter>(tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_9, 0), __gotots_address_9[1] + globalThis.Number(__gotots_address_6)), iter.$fromStorage, iter.$storageOf), c);
    }
    static $go$private$collate$iter(c: Collator | undefined, i: int): tsonicTypeScriptRuntime.Location<iter> | undefined {
        const __gotots_store_6 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_address_10 = __gotots_store_6._iter;
        const __gotots_address_11 = i;
        const __gotots_address_12 = __gotots_address_10;
        const __gotots_address_13 = __gotots_address_12;
        __gotots_address_13.get(__gotots_address_11);
        const __gotots_address_14 = goArrayLocation(__gotots_address_13);
        return tsonicTypeScriptRuntime.projectLocation<iter$Storage, iter>(tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_14, 0), __gotots_address_14[1] + globalThis.Number(__gotots_address_11)), iter.$fromStorage, iter.$storageOf);
    }
}
export function init(): void {
    let ids = strings__from_gostdlib.Split($state.availableLocales, ",");
    const __gotots_slice_build_0 = goSliceAllocate<Tag__from_language__package_1$Storage>(ids.length, null);
    for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
        __gotots_slice_build_0.$initialize(__gotots_slice_build_1, Tag__from_language__package_1.$zeroStorage());
    }
    $state.tags = __gotots_slice_build_0;
    const __gotots_range_0 = ids;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
        let i = __gotots_range_value_0;
        let s = __gotots_range_value_1;
        $state.tags.set(i, Tag__from_language__package_1.$storageOf(Raw$constant__from_language__package_1().MustParse(s)));
    }
}
export function New(t: Tag__from_language__package_1, o: RuntimeSlice<Option__from_collate$Storage>): Collator | undefined {
    let index = MatchLang__from_colltab(Tag__from_language__package_1.$copy(t), $state.tags);
    let c: Collator | undefined = newCollator(new GoInterfaceAdapter(getTable(tableIndex.$copy(tableIndex.$fromStorage($state.locales.get(index))))));
    const __gotots_store_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    options.$go$private$collate$setFromTag(__gotots_store_0.options, Tag__from_language__package_1.$copy(t));
    const __gotots_store_1 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    options.$go$private$collate$setOptions(__gotots_store_1.options, o);
    Collator.$go$private$collate$init(c);
    return c;
}
export class Buffer {
    declare private readonly $goType: void;
    public constructor(public buf: GoArray<uint8, 4096>, public key: RuntimeSlice<uint8>) {
    }
    declare private readonly then?: never;
}
export function compareLevel(f: (($0: tsonicTypeScriptRuntime.Location<iter> | undefined) => int) | undefined, a: tsonicTypeScriptRuntime.Location<iter> | undefined, b: tsonicTypeScriptRuntime.Location<iter> | undefined): int {
    iter.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce = 0;
    iter.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce = 0;
    for (;;) {
        const __gotots_callee_0 = f;
        const __gotots_argument_0 = a;
        let va = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        const __gotots_callee_1 = f;
        const __gotots_argument_1 = b;
        let vb = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
        if (va !== vb) {
            if (va < vb) {
                return -1;
            }
            return 1;
        }
        else if (va === 0) {
            break;
        }
    }
    return 0;
}
export type iter$Storage = {
    wa: GoArray<Elem__from_colltab, 512>;
    Iter: Iter__from_colltab$Storage;
    pce: int;
};
export class iter {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: iter$Storage) {
    }
    public static $storageOf($source: iter): iter$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: iter$Storage): iter {
        return new iter($source);
    }
    public get wa(): GoArray<Elem__from_colltab, 512> {
        return this.$storage.wa;
    }
    public set wa($value: GoArray<Elem__from_colltab, 512>) {
        this.$storage.wa = $value;
    }
    public get Iter(): Iter__from_colltab {
        return Iter__from_colltab.$fromStorage(this.$storage.Iter);
    }
    public set Iter($value: Iter__from_colltab) {
        this.$storage.Iter = Iter__from_colltab.$storageOf($value);
    }
    public get pce(): int {
        return this.$storage.pce;
    }
    public set pce($value: int) {
        this.$storage.pce = $value;
    }
    static $zeroStorage(): iter$Storage {
        return {
            wa: GoArray.zero<Elem__from_colltab, 512>(512, 0),
            Iter: Iter__from_colltab.$zeroStorage(),
            pce: 0
        };
    }
    declare private readonly then?: never;
    static $go$private$collate$init(i: tsonicTypeScriptRuntime.Location<iter> | undefined, c: Collator | undefined): void {
        (void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
            iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Weighter = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.t;
        (void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
            iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems = goArraySlice(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).wa, 0, 0, null);
    }
    static $go$private$collate$nextPrimary(i: tsonicTypeScriptRuntime.Location<iter> | undefined): int {
        for (;;) {
            {
                let __gotots_for_first_0 = true;
                for (;;) {
                    if (__gotots_for_first_0) {
                        __gotots_for_first_0 = false;
                    }
                    else {
                        const __gotots_store_7 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                        __gotots_store_7.pce = __gotots_store_7.pce + 1;
                    }
                    if (!(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce < (void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                        iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).N)) {
                        break;
                    }
                    {
                        {
                            let v = Elem_Primary__from_colltab((void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                                iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.get(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce));
                            if (v !== 0) {
                                const __gotots_store_8 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                                __gotots_store_8.pce = __gotots_store_8.pce + 1;
                                return v;
                            }
                        }
                    }
                }
            }
            const __gotots_store_9 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
            if (!Iter__from_colltab.Next(new $ProjectedPropertyLocation(__gotots_store_9, "Iter", Iter__from_colltab.$fromStorage, Iter__from_colltab.$storageOf))) {
                return 0;
            }
        }
    }
    static $go$private$collate$nextQuaternary(i: tsonicTypeScriptRuntime.Location<iter> | undefined): int {
        {
            let __gotots_for_first_4 = true;
            for (;;) {
                if (__gotots_for_first_4) {
                    __gotots_for_first_4 = false;
                }
                else {
                    const __gotots_store_16 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                    __gotots_store_16.pce = __gotots_store_16.pce + 1;
                }
                if (!(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce < (void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                    iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.length)) {
                    break;
                }
                {
                    {
                        let v = Elem_Quaternary__from_colltab((void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                            iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.get(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce));
                        if (v !== 0) {
                            const __gotots_store_17 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                            __gotots_store_17.pce = __gotots_store_17.pce + 1;
                            return v;
                        }
                    }
                }
            }
        }
        return 0;
    }
    static $go$private$collate$nextSecondary(i: tsonicTypeScriptRuntime.Location<iter> | undefined): int {
        {
            let __gotots_for_first_1 = true;
            for (;;) {
                if (__gotots_for_first_1) {
                    __gotots_for_first_1 = false;
                }
                else {
                    const __gotots_store_10 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                    __gotots_store_10.pce = __gotots_store_10.pce + 1;
                }
                if (!(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce < (void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                    iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.length)) {
                    break;
                }
                {
                    {
                        let v = Elem_Secondary__from_colltab((void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                            iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.get(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce));
                        if (v !== 0) {
                            const __gotots_store_11 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                            __gotots_store_11.pce = __gotots_store_11.pce + 1;
                            return v;
                        }
                    }
                }
            }
        }
        return 0;
    }
    static $go$private$collate$nextTertiary(i: tsonicTypeScriptRuntime.Location<iter> | undefined): int {
        {
            let __gotots_for_first_3 = true;
            for (;;) {
                if (__gotots_for_first_3) {
                    __gotots_for_first_3 = false;
                }
                else {
                    const __gotots_store_14 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                    __gotots_store_14.pce = __gotots_store_14.pce + 1;
                }
                if (!(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce < (void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                    iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.length)) {
                    break;
                }
                {
                    {
                        let v = Elem_Tertiary__from_colltab((void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                            iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.get(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce));
                        if (v !== 0) {
                            const __gotots_store_15 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                            __gotots_store_15.pce = __gotots_store_15.pce + 1;
                            return v;
                        }
                    }
                }
            }
        }
        return 0;
    }
    static $go$private$collate$prevSecondary(i: tsonicTypeScriptRuntime.Location<iter> | undefined): int {
        {
            let __gotots_for_first_2 = true;
            for (;;) {
                if (__gotots_for_first_2) {
                    __gotots_for_first_2 = false;
                }
                else {
                    const __gotots_store_12 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                    __gotots_store_12.pce = __gotots_store_12.pce + 1;
                }
                if (!(iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce < (void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                    iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.length)) {
                    break;
                }
                {
                    {
                        let v = Elem_Secondary__from_colltab((void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                            iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.get((void Iter__from_colltab.$storageOf, (void Iter__from_colltab.$fromStorage,
                            iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).Iter)).Elems.length - iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value).pce - 1));
                        if (v !== 0) {
                            const __gotots_store_13 = iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<iter>).value);
                            __gotots_store_13.pce = __gotots_store_13.pce + 1;
                            return v;
                        }
                    }
                }
            }
        }
        return 0;
    }
}
