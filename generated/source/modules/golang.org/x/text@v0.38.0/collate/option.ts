import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Weighter as Weighter__from_colltab } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/colltab/package.js";
import type { Form as Form__from_norm } from "../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/package.js";
import type { $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../support/provider-interface-bridges.js";
import type { iter$Storage as iter__from_collate$Storage } from "./collate.js";
import type { bool, gostring, int, uint32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Identity$constant as Identity$constant__from_colltab, Quaternary$constant as Quaternary$constant__from_colltab, Secondary$constant as Secondary$constant__from_colltab, Tertiary$constant as Tertiary$constant__from_colltab } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/colltab/package.js";
import { Tag as Tag__from_language__package_1 } from "../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import { NFD$constant as NFD$constant__from_norm } from "../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/package.js";
import { $goInterfaceAdapter$Named_collate$prioritizedOptions as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct as GoProviderProfileBridge } from "../../../../../support/provider-interface-bridges.js";
import { Collator, iter } from "./collate.js";
import { sorter } from "./sort.js";
import * as provider_sort from "@gotots/gostdlib/internal/facets/provider-sort.js";
import { GoArray, goArrayAllocate } from "@gotots/runtime/array.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function newCollator(t: Weighter__from_colltab | undefined): Collator | undefined {
    const __gotots_field_0 = new options(GoArray.literal<bool, 5>(5, false, [3, 4], [true, true]), false, false, false, new alternateHandling(0), 0, t, NFD$constant__from_norm());
    const __gotots_array_build_0 = goArrayAllocate<iter__from_collate$Storage, 2>(2);
    for (let __gotots_array_build_1 = 0; __gotots_array_build_1 < 2; __gotots_array_build_1++) {
        __gotots_array_build_0.set(__gotots_array_build_1, iter.$storageOf(iter.$zero()));
    }
    let c: Collator | undefined = new Collator(__gotots_field_0, sorter.$zero(), __gotots_array_build_0);
    const __gotots_receiver_0 = t;
    (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.variableTop = goInterfaceNonNil<Weighter__from_colltab>(__gotots_receiver_0).Top();
    return c;
}
export type Option$Storage = {
    priority: int;
    f: (($0: tsonicTypeScriptRuntime.Location<options> | undefined) => void) | undefined;
};
export class Option {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Option$Storage) {
    }
    public static $storageOf($source: Option): Option$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Option$Storage): Option {
        return new Option($source);
    }
    public get priority(): int {
        return this.$storage.priority;
    }
    public set priority($value: int) {
        this.$storage.priority = $value;
    }
    public get f(): (($0: tsonicTypeScriptRuntime.Location<options> | undefined) => void) | undefined {
        return this.$storage.f;
    }
    public set f($value: (($0: tsonicTypeScriptRuntime.Location<options> | undefined) => void) | undefined) {
        this.$storage.f = $value;
    }
    static $zero(): Option {
        return new Option({
            priority: 0,
            f: void 0
        });
    }
    static $copy($source: Option): Option {
        return new Option({
            priority: $source.$storage.priority,
            f: $source.$storage.f
        });
    }
    declare private readonly then?: never;
}
export class prioritizedOptions {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<Option$Storage>) {
    }
    declare private readonly then?: never;
    Len(): int {
        return this.$value.length;
    }
    Less(i: int, j: int): bool {
        return (void Option.$storageOf, (void Option.$fromStorage,
            this.$value.get(i))).priority < (void Option.$storageOf, (void Option.$fromStorage,
            this.$value.get(j))).priority;
    }
    Swap(i: int, j: int): void {
        const __gotots_store_0 = this.$value;
        const __gotots_store_1 = i;
        const __gotots_store_2 = this.$value;
        const __gotots_store_3 = j;
        const __gotots_assign_0 = Option.$copy(Option.$fromStorage(this.$value.get(j)));
        const __gotots_assign_1 = Option.$copy(Option.$fromStorage(this.$value.get(i)));
        __gotots_store_0.set(__gotots_store_1, Option.$storageOf(__gotots_assign_0));
        __gotots_store_2.set(__gotots_store_3, Option.$storageOf(__gotots_assign_1));
    }
}
export class options {
    declare private readonly $goType: void;
    public constructor(public ignore: GoArray<bool, 5>, public caseLevel: bool, public backwards: bool, public numeric: bool, public alternate: alternateHandling, public variableTop: uint32, public t: Weighter__from_colltab | undefined, public f: Form__from_norm) {
    }
    declare private readonly then?: never;
    static $go$private$collate$setFromTag(o: tsonicTypeScriptRuntime.Location<options> | undefined, t: Tag__from_language__package_1): void {
        ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.caseLevel = ldmlBool(Tag__from_language__package_1.$copy(t), ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.caseLevel, "kc");
        ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.backwards = ldmlBool(Tag__from_language__package_1.$copy(t), ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.backwards, "kb");
        ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.numeric = ldmlBool(Tag__from_language__package_1.$copy(t), ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.numeric, "kn");
        switch (t.TypeForKey("ks")) {
            case "level1": {
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Secondary$constant__from_colltab().$value, true);
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Tertiary$constant__from_colltab().$value, true);
                break;
            }
            case "level2": {
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Tertiary$constant__from_colltab().$value, true);
                break;
            }
            case "level3":
            case "": {
                break;
            }
            case "level4": {
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Quaternary$constant__from_colltab().$value, false);
                break;
            }
            case "identic": {
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Quaternary$constant__from_colltab().$value, false);
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Identity$constant__from_colltab().$value, false);
                break;
            }
        }
        switch (t.TypeForKey("ka")) {
            case "shifted": {
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.alternate = altShifted$constant();
                break;
            }
            case "blanked": {
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.alternate = altBlanked$constant();
                break;
            }
            case "posix": {
                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.alternate = altShiftTrimmed$constant();
                break;
            }
        }
    }
    static $go$private$collate$setOptions(o: tsonicTypeScriptRuntime.Location<options> | undefined, opts: RuntimeSlice<Option$Storage>): void {
        const __gotots_argument_0 = new GoInterfaceAdapter(new prioritizedOptions(opts));
        provider_sort.SortDirect(GoProviderProfileBridge.$to(__gotots_argument_0));
        const __gotots_range_0 = opts;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = Option.$copy(Option.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
            let x = __gotots_range_value_0;
            const __gotots_callee_0 = Option.$storageOf(x).f;
            const __gotots_argument_1 = o;
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
        }
    }
}
export function ldmlBool(t: Tag__from_language__package_1, old: bool, key: gostring): bool {
    switch (t.TypeForKey(key)) {
        case "true": {
            return true;
            break;
        }
        case "false": {
            return false;
            break;
        }
        default: {
            return old;
            break;
        }
    }
}
export function ignoreWidthF(o: tsonicTypeScriptRuntime.Location<options> | undefined): void {
    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Tertiary$constant__from_colltab().$value, true);
    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.caseLevel = true;
}
export function ignoreDiacriticsF(o: tsonicTypeScriptRuntime.Location<options> | undefined): void {
    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Secondary$constant__from_colltab().$value, true);
}
export function ignoreCaseF(o: tsonicTypeScriptRuntime.Location<options> | undefined): void {
    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Tertiary$constant__from_colltab().$value, true);
    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.caseLevel = false;
}
export function looseF(o: tsonicTypeScriptRuntime.Location<options> | undefined): void {
    ignoreWidthF(o);
    ignoreDiacriticsF(o);
    ignoreCaseF(o);
}
export function forceF(o: tsonicTypeScriptRuntime.Location<options> | undefined): void {
    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.ignore.set(Identity$constant__from_colltab().$value, false);
}
export function numericF(o: tsonicTypeScriptRuntime.Location<options> | undefined): void {
    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<options>).value.numeric = true;
}
export class alternateHandling {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function altBlanked$constant(): alternateHandling {
    return new alternateHandling(1);
}
export function altShifted$constant(): alternateHandling {
    return new alternateHandling(2);
}
export function altShiftTrimmed$constant(): alternateHandling {
    return new alternateHandling(3);
}
