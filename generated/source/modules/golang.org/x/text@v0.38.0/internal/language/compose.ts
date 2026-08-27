import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { scanner } from "./parse.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/state.js";
import { $goInterfaceAdapter$Named_language$sortVariants as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { Tag, maxCoreSize$int } from "./language.js";
import { makeScanner, parse } from "./parse.js";
import * as provider_sort from "@gotots/gostdlib/internal/facets/provider-sort.js";
import * as sort__from_gostdlib from "@gotots/gostdlib/sort.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class Builder {
    declare private readonly $goType: void;
    public constructor(public Tag: Tag, public __go_private: gostring, public variants: RuntimeSlice<gostring>, public extensions: RuntimeSlice<gostring>) {
    }
    static $zero(): Builder {
        return new Builder(Tag.$zero(), "", RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>());
    }
    declare private readonly then?: never;
    static AddExt(b: Builder | undefined, e: gostring): void {
        if (goStringIndex(e, 0) === 120) {
            if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_private === "") {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_private = e;
            }
            return;
        }
        const __gotots_range_3 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_index_3;
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let i = __gotots_range_value_3;
            let s = __gotots_range_value_4;
            if (goStringIndex(s, 0) === goStringIndex(e, 0)) {
                if (goStringIndex(e, 0) === 117) {
                    const __gotots_store_2 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions;
                    const __gotots_store_3 = i;
                    __gotots_store_2.set(__gotots_store_3, __gotots_store_2.get(__gotots_store_3) + goStringSlice(e, 1));
                }
                return;
            }
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.append("", [e]);
    }
    static AddVariant(b: Builder | undefined, v: RuntimeSlice<gostring>): void {
        const __gotots_range_2 = v;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let v__shadow_1 = __gotots_range_value_2;
            if (v__shadow_1 !== "") {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants.append("", [v__shadow_1]);
            }
        }
    }
    static ClearExtensions(b: Builder | undefined): void {
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_private = "";
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.slice(0, 0, null);
    }
    static ClearVariants(b: Builder | undefined): void {
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants.slice(0, 0, null);
    }
    static Make(b: Builder | undefined): Tag {
        let t = Tag.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Tag);
        const t$location = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next => t = t$next);
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.length > 0 || (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants.length > 0) {
            const __gotots_argument_0 = new GoInterfaceAdapter(new sortVariants((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants));
            provider_sort.SortDirect(GoProviderProfileBridge.$to(__gotots_argument_0));
            sort__from_gostdlib.Strings((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions);
            if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_private !== "") {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.append("", [(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_private]);
            }
            let n = maxCoreSize$int + tokenLen((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants) + tokenLen((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions);
            let buf = RuntimeSlice.make<uint8>(n, null, 0);
            let p = Tag.$go$private$language$genCoreBytes(t$location, buf);
            Tag.$storageOf(t).pVariant = p & 255;
            p += appendTokens(buf.slice(p, null, null), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants);
            Tag.$storageOf(t).pExt = p & 65535;
            p += appendTokens(buf.slice(p, null, null), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions);
            const __gotots_conversion_0 = buf.slice(0, p, null);
            let __gotots_conversion_1 = "";
            for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
            }
            Tag.$storageOf(t).str = __gotots_conversion_1;
            let scan = makeScanner(buf.slice(0, p, null));
            const __gotots_results_0 = parse(scan, "");
            t = __gotots_results_0[0];
            return Tag.$copy(t);
        }
        else if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_private !== "") {
            Tag.$storageOf(t).str = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_private;
            Tag.RemakeString(t$location);
        }
        return Tag.$copy(t);
    }
    static SetExt(b: Builder | undefined, e: gostring): void {
        if (goStringIndex(e, 0) === 120) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_private = e;
            return;
        }
        const __gotots_range_6 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_7 = __gotots_range_index_6;
            const __gotots_range_value_8 = __gotots_range_6.get(__gotots_range_index_6);
            let i = __gotots_range_value_7;
            let s = __gotots_range_value_8;
            if (goStringIndex(s, 0) === goStringIndex(e, 0)) {
                if (goStringIndex(e, 0) === 117) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.set(i, e + goStringSlice(s, 1));
                }
                else {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.set(i, e);
                }
                return;
            }
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.append("", [e]);
    }
    static SetTag(b: Builder | undefined, t: Tag): void {
        Tag.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Tag).LangID = Tag.$storageOf(t).LangID;
        Tag.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Tag).RegionID = Tag.$storageOf(t).RegionID;
        Tag.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Tag).ScriptID = Tag.$storageOf(t).ScriptID;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants.slice(0, 0, null);
        {
            let variants = t.Variants();
            if (variants !== "") {
                const __gotots_range_0 = strings__from_gostdlib.Split(goStringSlice(variants, 1), "-");
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let vr = __gotots_range_value_0;
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).variants.append("", [vr]);
                }
            }
        }
        const __gotots_store_0 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_1 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_assign_0 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.slice(0, 0, null);
        const __gotots_assign_1 = "";
        __gotots_store_0.extensions = __gotots_assign_0;
        __gotots_store_1.__go_private = __gotots_assign_1;
        const __gotots_range_1 = t.Extensions();
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let e = __gotots_range_value_1;
            Builder.AddExt(b, e);
        }
    }
}
export function tokenLen(token: RuntimeSlice<gostring>): int {
    let n: int = 0;
    const __gotots_range_4 = token;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
        let t = __gotots_range_value_5;
        n += t.length + 1;
    }
    return n;
}
export function appendTokens(b: RuntimeSlice<uint8>, token: RuntimeSlice<gostring>): int {
    let p = 0;
    const __gotots_range_5 = token;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_6 = __gotots_range_5.get(__gotots_range_index_5);
        let t = __gotots_range_value_6;
        b.set(p, 45);
        const __gotots_slice_build_0 = b.slice(p + 1, null, null);
        const __gotots_slice_build_1 = t;
        const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2; __gotots_slice_build_3++) {
            __gotots_slice_build_0.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
        }
        __gotots_slice_build_2;
        p += 1 + t.length;
    }
    return p;
}
export class sortVariants {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<gostring>) {
    }
    declare private readonly then?: never;
    Len(): int {
        return this.$value.length;
    }
    Less(i: int, j: int): bool {
        return $state.variantIndex.lookup(this.$value.get(i)) < $state.variantIndex.lookup(this.$value.get(j));
    }
    Swap(i: int, j: int): void {
        const __gotots_store_4 = this.$value;
        const __gotots_store_5 = j;
        const __gotots_store_6 = this.$value;
        const __gotots_store_7 = i;
        const __gotots_assign_2 = this.$value.get(i);
        const __gotots_assign_3 = this.$value.get(j);
        __gotots_store_4.set(__gotots_store_5, __gotots_assign_2);
        __gotots_store_6.set(__gotots_store_7, __gotots_assign_3);
    }
}
