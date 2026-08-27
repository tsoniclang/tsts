import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/state.js";
import { Compare as Compare__from_tag } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/tag/package.js";
import { $goInterfaceAdapter$Named_language$ValueError, $goInterfaceAdapter$Named_language$variantsSort, $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$Named_language$bytesSort as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { Tag } from "./language.js";
import { Language_String, Region_String, getLangID, getRegionID, getScriptID, grandfathered, maxAltTaglen } from "./lookup.js";
import { script$constant } from "./tables.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as provider_sort from "@gotots/gostdlib/internal/facets/provider-sort.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function isAlpha(b: uint8): bool {
    return b > 57;
}
export function isAlphaNum(s: RuntimeSlice<uint8>): bool {
    const __gotots_range_3 = s;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_6 = __gotots_range_3.get(__gotots_range_index_3);
        let c = __gotots_range_value_6;
        if (!(97 <= c && c <= 122 || 65 <= c && c <= 90 || 48 <= c && c <= 57)) {
            return false;
        }
    }
    return true;
}
export class ValueError {
    declare private readonly $goType: void;
    public constructor(public v: GoArray<uint8, 8>) {
    }
    static $zero(): ValueError {
        return new ValueError(GoArray.zero<uint8, 8>(8, 0));
    }
    static $copy($source: ValueError): ValueError {
        return new ValueError($source.v.copy());
    }
    static $equal($left: ValueError, $right: ValueError): bool {
        const __gotots_array_equal_0 = $left.v;
        const __gotots_array_equal_1 = $right.v;
        let __gotots_array_equal_3 = true;
        for (let __gotots_array_equal_2 = 0; __gotots_array_equal_2 < 8; __gotots_array_equal_2++) {
            if (!(__gotots_array_equal_0.get(__gotots_array_equal_2) === __gotots_array_equal_1.get(__gotots_array_equal_2))) {
                __gotots_array_equal_3 = false;
                break;
            }
        }
        if (!__gotots_array_equal_3) {
            return false;
        }
        return true;
    }
    static $hash($source: ValueError): number {
        let $hash = 2166136261;
        const __gotots_array_hash_0 = $source.v;
        let __gotots_array_hash_2 = 2166136261;
        for (let __gotots_array_hash_1 = 0; __gotots_array_hash_1 < 8; __gotots_array_hash_1++) {
            __gotots_array_hash_2 = GoMapHash.mix(__gotots_array_hash_2, GoMapHash.number(__gotots_array_hash_0.get(__gotots_array_hash_1)));
        }
        $hash = GoMapHash.mix($hash, __gotots_array_hash_2);
        return $hash;
    }
    declare private readonly then?: never;
    Error(): gostring {
        return fmt__from_gostdlib.Sprintf("language: subtag %q is well-formed but unknown", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(this.$go$private$language$tag())]));
    }
    $go$private$language$tag(): RuntimeSlice<uint8> {
        let n = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.IndexByte(goArraySlice(this.v, 0, null, null), 0)));
        if (n === -1) {
            n = 8;
        }
        return goArraySlice(this.v, 0, n, null);
    }
}
export function NewValueError(tag__shadow_1: RuntimeSlice<uint8>): ValueError {
    let e = ValueError.$zero();
    RuntimeSlice.copy<uint8>(goArraySlice(e.v, 0, null, null), tag__shadow_1);
    return ValueError.$copy(e);
}
export class scanner {
    declare private readonly $goType: void;
    public constructor(public b: RuntimeSlice<uint8>, public bytes: GoArray<uint8, 32>, public token: RuntimeSlice<uint8>, public start: int, public end: int, public next: int, public err: GoInterface | undefined, public done: bool) {
    }
    static $copy($source: scanner): scanner {
        return new scanner($source.b, $source.bytes.copy(), $source.token, $source.start, $source.end, $source.next, $source.err, $source.done);
    }
    declare private readonly then?: never;
    static $go$private$language$acceptMinSize(s: scanner | undefined, min: int): int {
        let end: int = 0;
        end = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
        scanner.$go$private$language$scan(s);
        for (; (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length >= min; scanner.$go$private$language$scan(s)) {
            end = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
        }
        return end;
    }
    static $go$private$language$deleteRange(s: scanner | undefined, start: int, end: int): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, start + RuntimeSlice.copy<uint8>((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(start, null, null), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(end, null, null)), null);
        let diff = end - start;
        const __gotots_store_7 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_7.next = __gotots_store_7.next - diff;
        const __gotots_store_8 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_8.start = __gotots_store_8.start - diff;
        const __gotots_store_9 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_9.end = __gotots_store_9.end - diff;
    }
    static $go$private$language$gobble(s: scanner | undefined, e: GoInterface | undefined): void {
        scanner.$go$private$language$setError(s, e);
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start === 0) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, +RuntimeSlice.copy<uint8>((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next, null, null)), null);
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end = 0;
        }
        else {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start - 1 + RuntimeSlice.copy<uint8>((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start - 1, null, null), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end, null, null)), null);
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start - 1;
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start;
    }
    static $go$private$language$init(s: scanner | undefined): void {
        const __gotots_range_1 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_2 = __gotots_range_index_1;
            const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_1);
            let i = __gotots_range_value_2;
            let c = __gotots_range_value_3;
            if (c === 95) {
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.set(i, 45);
            }
        }
        scanner.$go$private$language$scan(s);
    }
    static $go$private$language$replace(s: scanner | undefined, repl: gostring): void {
        scanner.$go$private$language$resizeRange(s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end, repl.length);
        const __gotots_slice_build_8 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start, null, null);
        const __gotots_slice_build_9 = repl;
        const __gotots_slice_build_10 = globalThis.Math.min(__gotots_slice_build_8.length, __gotots_slice_build_9.length);
        for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_10; __gotots_slice_build_11++) {
            __gotots_slice_build_8.set(__gotots_slice_build_11, __gotots_slice_build_9.charCodeAt(__gotots_slice_build_11));
        }
        __gotots_slice_build_10;
    }
    static $go$private$language$resizeRange(s: scanner | undefined, oldStart: int, oldEnd: int, newSize: int): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start = oldStart;
        {
            let end = oldStart + newSize;
            if (end !== oldEnd) {
                let diff = end - oldEnd;
                let b = RuntimeSlice.nil<uint8>();
                {
                    let n = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length + diff;
                    if (n > (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.capacity) {
                        b = RuntimeSlice.make<uint8>(n, null, 0);
                        RuntimeSlice.copy<uint8>(b, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, oldStart, null));
                    }
                    else {
                        b = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, n, null);
                    }
                }
                RuntimeSlice.copy<uint8>(b.slice(end, null, null), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(oldEnd, null, null));
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = b;
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next = end + ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next - (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end);
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end = end;
            }
        }
    }
    static $go$private$language$scan(s: scanner | undefined): int {
        let end: int = 0;
        end = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token = RuntimeSlice.nil<uint8>();
        for ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next; (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next < (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length;) {
            let i = globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.IndexByte((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next, null, null), 45)));
            if (i === -1) {
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length;
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length;
                i = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end - (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start;
            }
            else {
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next + i;
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end + 1;
            }
            let token = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end, null);
            if (i < 1 || i > 8 || !isAlphaNum(token)) {
                scanner.$go$private$language$gobble(s, $state.ErrSyntax);
                continue;
            }
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token = token;
            return end;
        }
        {
            let n = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length;
            if (n > 0 && (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.get(n - 1) === 45) {
                scanner.$go$private$language$setError(s, $state.ErrSyntax);
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length - 1, null);
            }
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).done = true;
        return end;
    }
    static $go$private$language$setError(s: scanner | undefined, e: GoInterface | undefined): void {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err === undefined || (goInterfaceEqual(e, $state.ErrSyntax) && !goInterfaceEqual((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err, $state.ErrSyntax))) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err = e;
        }
    }
    static $go$private$language$toLower(s: scanner | undefined, start: int, end: int): void {
        for (let i = start; i < end; i++) {
            let c = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.get(i);
            if (65 <= c && c <= 90) {
                const __gotots_store_5 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b;
                const __gotots_store_6 = i;
                __gotots_store_5.set(__gotots_store_6, __gotots_store_5.get(__gotots_store_6) + 32);
            }
        }
    }
}
export function makeScannerString(s: gostring): scanner {
    let scan = new scanner(RuntimeSlice.nil<uint8>(), GoArray.zero<uint8, 32>(32, 0), RuntimeSlice.nil<uint8>(), 0, 0, 0, void 0, false);
    if (s.length <= 32) {
        const __gotots_slice_operand_0 = scan.bytes;
        const __gotots_slice_build_0 = goArraySlice(scan.bytes, 0, null, null);
        const __gotots_slice_build_1 = s;
        const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2; __gotots_slice_build_3++) {
            __gotots_slice_build_0.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
        }
        const __gotots_slice_operand_1 = __gotots_slice_build_2;
        scan.b = goArraySlice(__gotots_slice_operand_0, 0, __gotots_slice_operand_1, null);
    }
    else {
        const __gotots_conversion_0 = s;
        const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
        }
        scan.b = __gotots_conversion_1;
    }
    scanner.$go$private$language$init(scan);
    return scanner.$copy(scan);
}
export function makeScanner(b: RuntimeSlice<uint8>): scanner {
    let scan = new scanner(b, GoArray.zero<uint8, 32>(32, 0), RuntimeSlice.nil<uint8>(), 0, 0, 0, void 0, false);
    scanner.$go$private$language$init(scan);
    return scanner.$copy(scan);
}
export function Parse(s: gostring): [
    Tag,
    GoInterface | undefined
] {
    let t: Tag = Tag.$zero();
    let err: GoInterface | undefined = void 0;
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                if (s === "") {
                    const __gotots_results_0: [
                        Tag,
                        GoInterface | undefined
                    ] = [Tag.$copy(Tag.$fromStorage($state.Und)), $state.ErrSyntax];
                    t = __gotots_results_0[0];
                    err = __gotots_results_0[1];
                    break __gotots_return_block_0;
                }
                const __gotots_callee_0 = ($go$recovery: GoRecovery): void => {
                    if (!(($go$recovery === undefined ? undefined : $go$recovery.take()) === undefined)) {
                        t = Tag.$copy(Tag.$fromStorage($state.Und));
                        err = $state.ErrSyntax;
                        return;
                    }
                };
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_callee_0($go$recovery);
                };
                if (s.length <= maxAltTaglen) {
                    let b = GoArray.literal<uint8, 11>(11, 0, [], []);
                    const __gotots_range_0 = s;
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length;) {
                        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_0, __gotots_range_index_0);
                        const __gotots_range_value_0 = __gotots_range_index_0;
                        const __gotots_range_value_1 = __gotots_range_decode_0[0];
                        let i = __gotots_range_value_0;
                        let c = __gotots_range_value_1;
                        __gotots_range_index_0 += __gotots_range_decode_0[1];
                        if (65 <= c && c <= 90) {
                            c += 32;
                        }
                        else if (c === 95) {
                            c = 45;
                        }
                        b.set(i, c & 255);
                    }
                    {
                        const __gotots_results_1 = grandfathered(b.copy());
                        let t__shadow_1 = __gotots_results_1[0];
                        let ok = __gotots_results_1[1];
                        if (ok) {
                            const __gotots_results_2: [
                                Tag,
                                GoInterface | undefined
                            ] = [Tag.$copy(t__shadow_1), void 0];
                            t = __gotots_results_2[0];
                            err = __gotots_results_2[1];
                            break __gotots_return_block_0;
                        }
                    }
                }
                let scan = makeScannerString(s);
                const __gotots_results_3: [
                    Tag,
                    GoInterface | undefined
                ] = parse(scan, s);
                t = __gotots_results_3[0];
                err = __gotots_results_3[1];
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_1) {
            if (!(__gotots_caught_1 instanceof GoPanic)) {
                throw __gotots_caught_1;
            }
            __gotots_panic_0 = __gotots_caught_1;
        }
    }
    finally {
        if (__gotots_deferred_0 !== undefined) {
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return [Tag.$copy(t), err];
}
export function parse(scan: scanner | undefined, s: gostring): [
    Tag,
    GoInterface | undefined
] {
    let t: Tag = Tag.$zero();
    let err: GoInterface | undefined = void 0;
    t = Tag.$copy(Tag.$fromStorage($state.Und));
    let end = 0;
    {
        let n = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length;
        if (n <= 1) {
            scanner.$go$private$language$toLower(scan, 0, (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length);
            if (n === 0 || (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.get(0) !== 120) {
                return [Tag.$copy(t), $state.ErrSyntax];
            }
            end = parseExtensions(scan);
        }
        else if (n >= 4) {
            return [Tag.$copy(Tag.$fromStorage($state.Und)), $state.ErrSyntax];
        }
        else {
            const __gotots_results_1 = parseTag(scan, true);
            t = __gotots_results_1[0];
            end = __gotots_results_1[1];
            {
                let n__shadow_1 = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length;
                if (n__shadow_1 === 1) {
                    Tag.$storageOf(t).pExt = end & 65535;
                    end = parseExtensions(scan);
                }
                else if (end < (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length) {
                    scanner.$go$private$language$setError(scan, $state.ErrSyntax);
                    (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, end, null);
                }
            }
        }
    }
    if (Tag.$storageOf(t).pVariant < (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length) {
        if (end < s.length) {
            s = goStringSlice(s, 0, end);
        }
        if (s.length > 0 && Compare__from_tag(s, (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b) === 0) {
            Tag.$storageOf(t).str = s;
        }
        else {
            const __gotots_conversion_3 = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b;
            let __gotots_conversion_4 = "";
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
            }
            Tag.$storageOf(t).str = __gotots_conversion_4;
        }
    }
    else {
        const __gotots_store_0 = Tag.$storageOf(t);
        const __gotots_store_1 = Tag.$storageOf(t);
        const __gotots_assign_0 = 0;
        const __gotots_assign_1 = 0;
        __gotots_store_0.pVariant = __gotots_assign_0;
        __gotots_store_1.pExt = __gotots_assign_1;
    }
    return [Tag.$copy(t), (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err];
}
export function parseTag(scan: scanner | undefined, doNorm: bool): [
    Tag,
    int
] {
    let t: Tag = Tag.$zero();
    let end: int = 0;
    let e: GoInterface | undefined = void 0;
    const __gotots_store_2 = Tag.$storageOf(t);
    const __gotots_results_2 = getLangID((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token);
    __gotots_store_2.LangID = __gotots_results_2[0];
    e = __gotots_results_2[1];
    scanner.$go$private$language$setError(scan, e);
    scanner.$go$private$language$replace(scan, Language_String(Tag.$storageOf(t).LangID));
    let langStart = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start;
    end = scanner.$go$private$language$scan(scan);
    for (; (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length === 3 && isAlpha((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.get(0));) {
        if (doNorm) {
            const __gotots_results_3 = getLangID((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token);
            let lang__shadow_1 = __gotots_results_3[0];
            let e__shadow_1: GoInterface | undefined = __gotots_results_3[1];
            if (!(lang__shadow_1 === 0)) {
                Tag.$storageOf(t).LangID = lang__shadow_1;
                let langStr = Language_String(lang__shadow_1);
                const __gotots_slice_build_4 = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(langStart, null, null);
                const __gotots_slice_build_5 = langStr;
                const __gotots_slice_build_6 = globalThis.Math.min(__gotots_slice_build_4.length, __gotots_slice_build_5.length);
                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_6; __gotots_slice_build_7++) {
                    __gotots_slice_build_4.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
                }
                __gotots_slice_build_6;
                (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.set(langStart + langStr.length, 45);
                (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start = langStart + langStr.length + 1;
            }
            scanner.$go$private$language$gobble(scan, e__shadow_1);
        }
        end = scanner.$go$private$language$scan(scan);
    }
    if ((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length === 4 && isAlpha((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.get(0))) {
        const __gotots_store_3 = Tag.$storageOf(t);
        const __gotots_results_4 = getScriptID(script$constant(), (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token);
        __gotots_store_3.ScriptID = __gotots_results_4[0];
        e = __gotots_results_4[1];
        if (Tag.$storageOf(t).ScriptID === 0) {
            scanner.$go$private$language$gobble(scan, e);
        }
        end = scanner.$go$private$language$scan(scan);
    }
    {
        let n = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length;
        if (n >= 2 && n <= 3) {
            const __gotots_store_4 = Tag.$storageOf(t);
            const __gotots_results_5 = getRegionID((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token);
            __gotots_store_4.RegionID = __gotots_results_5[0];
            e = __gotots_results_5[1];
            if (Tag.$storageOf(t).RegionID === 0) {
                scanner.$go$private$language$gobble(scan, e);
            }
            else {
                scanner.$go$private$language$replace(scan, Region_String(Tag.$storageOf(t).RegionID));
            }
            end = scanner.$go$private$language$scan(scan);
        }
    }
    scanner.$go$private$language$toLower(scan, (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start, (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length);
    Tag.$storageOf(t).pVariant = end & 255;
    end = parseVariants(scan, end, Tag.$copy(t));
    Tag.$storageOf(t).pExt = end & 65535;
    return [Tag.$copy(t), end];
}
export function parseVariants(scan: scanner | undefined, end: int, t: Tag): int {
    let start = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start;
    let varIDBuf = GoArray.literal<uint8, 4>(4, 0, [], []);
    let variantBuf = GoArray.literal<RuntimeSlice<uint8>, 4>(4, RuntimeSlice.nil<uint8>(), [], []);
    let varID = goArraySlice(varIDBuf, 0, 0, null);
    let variant = goArraySlice(variantBuf, 0, 0, null);
    let last = -1;
    let needSort = false;
    for (; (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length >= 4; scanner.$go$private$language$scan(scan)) {
        const __gotots_map_0 = $state.variantIndex;
        const __gotots_conversion_6 = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token;
        let __gotots_conversion_7 = "";
        for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
            __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
        }
        const __gotots_map_1 = __gotots_conversion_7;
        const __gotots_results_7 = __gotots_map_0.lookupOk(__gotots_map_1);
        let v = __gotots_results_7[0];
        let ok = __gotots_results_7[1];
        if (!ok) {
            scanner.$go$private$language$gobble(scan, new $goInterfaceAdapter$Named_language$ValueError(NewValueError((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token)));
            continue;
        }
        varID = varID.append(0, [v]);
        variant = variant.append(RuntimeSlice.nil<uint8>(), [(scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token]);
        if (!needSort) {
            if (last < v) {
                last = v;
            }
            else {
                needSort = true;
                const maxVariants$int: int = 8;
                if (varID.length > maxVariants$int) {
                    break;
                }
            }
        }
        end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
    }
    if (needSort) {
        const __gotots_argument_3 = new $goInterfaceAdapter$Named_language$variantsSort(new variantsSort(varID, variant));
        provider_sort.SortDirect(GoProviderProfileBridge.$to(__gotots_argument_3));
        const __gotots_assign_4 = 0;
        const __gotots_assign_5 = -1;
        let k = __gotots_assign_4;
        let l = __gotots_assign_5;
        const __gotots_range_2 = varID;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_4 = __gotots_range_index_2;
            const __gotots_range_value_5 = __gotots_range_2.get(__gotots_range_index_2);
            let i = __gotots_range_value_4;
            let v = __gotots_range_value_5;
            let w = v;
            if (l === w) {
                continue;
            }
            varID.set(k, varID.get(i));
            variant.set(k, variant.get(i));
            k++;
            l = w;
        }
        {
            let str = bytes__from_gostdlib.Join(variant.slice(0, k, null), $state.separator);
            if (str.length === 0) {
                end = start - 1;
            }
            else {
                scanner.$go$private$language$resizeRange(scan, start, end, str.length);
                RuntimeSlice.copy<uint8>((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start, null, null), str);
                end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
            }
        }
    }
    return end;
}
export class variantsSort {
    declare private readonly $goType: void;
    public constructor(public i: RuntimeSlice<uint8>, public v: RuntimeSlice<RuntimeSlice<uint8>>) {
    }
    declare private readonly then?: never;
    Len(): int {
        return this.i.length;
    }
    Less(i: int, j: int): bool {
        return this.i.get(i) < this.i.get(j);
    }
    Swap(i: int, j: int): void {
        const __gotots_store_14 = this.i;
        const __gotots_store_15 = i;
        const __gotots_store_16 = this.i;
        const __gotots_store_17 = j;
        const __gotots_assign_8 = this.i.get(j);
        const __gotots_assign_9 = this.i.get(i);
        __gotots_store_14.set(__gotots_store_15, __gotots_assign_8);
        __gotots_store_16.set(__gotots_store_17, __gotots_assign_9);
        const __gotots_store_18 = this.v;
        const __gotots_store_19 = i;
        const __gotots_store_20 = this.v;
        const __gotots_store_21 = j;
        const __gotots_assign_10 = this.v.get(j);
        const __gotots_assign_11 = this.v.get(i);
        __gotots_store_18.set(__gotots_store_19, __gotots_assign_10);
        __gotots_store_20.set(__gotots_store_21, __gotots_assign_11);
    }
}
export class bytesSort {
    declare private readonly $goType: void;
    public constructor(public b: RuntimeSlice<RuntimeSlice<uint8>>, public n: int) {
    }
    declare private readonly then?: never;
    Len(): int {
        return this.b.length;
    }
    Less(i: int, j: int): bool {
        for (let k = 0; k < this.n; k++) {
            if (this.b.get(i).get(k) === this.b.get(j).get(k)) {
                continue;
            }
            return this.b.get(i).get(k) < this.b.get(j).get(k);
        }
        return false;
    }
    Swap(i: int, j: int): void {
        const __gotots_store_10 = this.b;
        const __gotots_store_11 = i;
        const __gotots_store_12 = this.b;
        const __gotots_store_13 = j;
        const __gotots_assign_6 = this.b.get(j);
        const __gotots_assign_7 = this.b.get(i);
        __gotots_store_10.set(__gotots_store_11, __gotots_assign_6);
        __gotots_store_12.set(__gotots_store_13, __gotots_assign_7);
    }
}
export function parseExtensions(scan: scanner | undefined): int {
    let start = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start;
    let exts = RuntimeSlice.literal<RuntimeSlice<uint8>>([]);
    let __go_private = RuntimeSlice.literal<uint8>([]);
    let end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
    for (; (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length === 1;) {
        let extStart = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start;
        let ext = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.get(0);
        end = parseExtension(scan);
        let extension = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(extStart, end, null);
        if (extension.length < 3 || (ext !== 120 && extension.length < 4)) {
            scanner.$go$private$language$setError(scan, $state.ErrSyntax);
            end = extStart;
            continue;
        }
        else if (start === extStart && (ext === 120 || (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start === (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.length)) {
            (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, end, null);
            return end;
        }
        else if (ext === 120) {
            __go_private = extension;
            break;
        }
        exts = exts.append(RuntimeSlice.nil<uint8>(), [extension]);
    }
    const __gotots_argument_0 = new GoInterfaceAdapter(new bytesSort(exts, 1));
    provider_sort.SortDirect(GoProviderProfileBridge.$to(__gotots_argument_0));
    if (__go_private.length > 0) {
        exts = exts.append(RuntimeSlice.nil<uint8>(), [__go_private]);
    }
    (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, start, null);
    if (exts.length > 0) {
        (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = goSliceAppendSlice<uint8>((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b, bytes__from_gostdlib.Join(exts, $state.separator), 0);
    }
    else if (start > 0) {
        (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(0, start - 1, null);
    }
    return end;
}
export function parseExtension(scan: scanner | undefined): int {
    const __gotots_assign_2 = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start;
    const __gotots_assign_3 = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
    let start = __gotots_assign_2;
    let end = __gotots_assign_3;
    switch ((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.get(0)) {
        case 117: {
            let attrStart = end;
            scanner.$go$private$language$scan(scan);
            for (let last__shadow_1 = RuntimeSlice.literal<uint8>([]); (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length > 2; scanner.$go$private$language$scan(scan)) {
                if (globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.Compare((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token, last__shadow_1))) !== -1) {
                    let p = attrStart + 1;
                    (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next = p;
                    let attrs = RuntimeSlice.literal<RuntimeSlice<uint8>>([]);
                    for (scanner.$go$private$language$scan(scan); (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length > 2; scanner.$go$private$language$scan(scan)) {
                        attrs = attrs.append(RuntimeSlice.nil<uint8>(), [(scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token]);
                        end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
                    }
                    const __gotots_argument_1 = new GoInterfaceAdapter(new bytesSort(attrs, 3));
                    provider_sort.SortDirect(GoProviderProfileBridge.$to(__gotots_argument_1));
                    RuntimeSlice.copy<uint8>((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(p, null, null), bytes__from_gostdlib.Join(attrs, $state.separator));
                    break;
                }
                last__shadow_1 = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token;
                end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
            }
            let last = RuntimeSlice.nil<uint8>(), key = RuntimeSlice.nil<uint8>();
            for (let attrEnd = end; (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length === 2; last = key) {
                key = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token;
                end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
                for (scanner.$go$private$language$scan(scan); end < (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end && (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length > 2; scanner.$go$private$language$scan(scan)) {
                    end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
                }
                if (globalThis.Number(BigInt.asIntN(64, bytes__from_gostdlib.Compare(key, last))) !== 1 || !((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err === undefined)) {
                    let p = attrEnd + 1;
                    (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next = p;
                    let keys = RuntimeSlice.literal<RuntimeSlice<uint8>>([]);
                    for (scanner.$go$private$language$scan(scan); (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length === 2;) {
                        let keyStart = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).start;
                        end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
                        for (scanner.$go$private$language$scan(scan); end < (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end && (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length > 2; scanner.$go$private$language$scan(scan)) {
                            end = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
                        }
                        keys = keys.append(RuntimeSlice.nil<uint8>(), [(scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(keyStart, end, null)]);
                    }
                    const __gotots_argument_2 = new GoInterfaceAdapter(new bytesSort(keys, 2));
                    provider_sort.SortStableDirect(GoProviderProfileBridge.$to(__gotots_argument_2));
                    {
                        let n = keys.length;
                        if (n > 0) {
                            let k = 0;
                            for (let i = 1; i < n; i++) {
                                if (!bytes__from_gostdlib.Equal(keys.get(k).slice(0, 2, null), keys.get(i).slice(0, 2, null))) {
                                    k++;
                                    keys.set(k, keys.get(i));
                                }
                                else if (!bytes__from_gostdlib.Equal(keys.get(k), keys.get(i))) {
                                    scanner.$go$private$language$setError(scan, $state.ErrDuplicateKey);
                                }
                            }
                            keys = keys.slice(0, k + 1, null);
                        }
                    }
                    let reordered = bytes__from_gostdlib.Join(keys, $state.separator);
                    {
                        let e = p + reordered.length;
                        if (e < end) {
                            scanner.$go$private$language$deleteRange(scan, e, end);
                            end = e;
                        }
                    }
                    RuntimeSlice.copy<uint8>((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.slice(p, null, null), reordered);
                    break;
                }
            }
            break;
        }
        case 116: {
            scanner.$go$private$language$scan(scan);
            {
                let n = (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length;
                if (n >= 2 && n <= 3 && isAlpha((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.get(1))) {
                    const __gotots_results_6 = parseTag(scan, false);
                    end = __gotots_results_6[1];
                    scanner.$go$private$language$toLower(scan, start, end);
                }
            }
            for (; (scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.length === 2 && !isAlpha((scan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).token.get(1));) {
                end = scanner.$go$private$language$acceptMinSize(scan, 3);
            }
            break;
        }
        case 120: {
            end = scanner.$go$private$language$acceptMinSize(scan, 1);
            break;
        }
        default: {
            end = scanner.$go$private$language$acceptMinSize(scan, 2);
            break;
        }
    }
    return end;
}
export function getExtension(s: gostring, p: int): [
    int,
    gostring
] {
    let end: int = 0;
    let ext: gostring = "";
    if (goStringIndex(s, p) === 45) {
        p++;
    }
    if (goStringIndex(s, p) === 120) {
        return [s.length, goStringSlice(s, p)];
    }
    end = nextExtension(s, p);
    return [end, goStringSlice(s, p, end)];
}
export function nextExtension(s: gostring, p: int): int {
    for (let n = s.length - 3; p < n;) {
        if (goStringIndex(s, p) === 45) {
            if (goStringIndex(s, p + 2) === 45) {
                return p;
            }
            p += 3;
        }
        else {
            p++;
        }
    }
    return s.length;
}
