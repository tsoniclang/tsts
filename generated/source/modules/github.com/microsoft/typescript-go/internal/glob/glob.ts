import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/glob/state.js";
import { RuneError$int32 as RuneError$int32__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { $goInterfaceAdapter$Named_glob$anyChar, $goInterfaceAdapter$Named_glob$charRange, $goInterfaceAdapter$Named_glob$group, $goInterfaceAdapter$Named_glob$literal, $goInterfaceAdapter$Named_glob$star, $goInterfaceAdapter$Named_glob$starStar, $goInterfaceAdapter$PointerTo_Named_strings$Builder, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_glob$slash as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$String$void_to_string } from "../../../../../../support/interface-methods.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringEncodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class Glob {
    declare private readonly $goType: void;
    public constructor(public elems: RuntimeSlice<element | undefined>) {
    }
    static $zero(): Glob {
        return new Glob(RuntimeSlice.nil<element | undefined>());
    }
    static $copy($source: Glob): Glob {
        return new Glob($source.elems);
    }
    declare private readonly then?: never;
    static Match(g: {
        value: Glob;
    } | undefined, input: gostring): bool {
        return match((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems, input);
    }
    static String(g: {
        value: Glob;
    } | undefined): gostring {
        let b = named_strings.StringsBuilderOperations.$zero();
        const b$location = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next => b = b$next);
        const __gotots_range_4 = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
            let e: element | undefined = __gotots_range_value_5;
            const __gotots_argument_1 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(b$location);
            const __gotots_argument_2 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([e]);
            provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_1), __gotots_argument_2);
        }
        return strings__from_gostdlib.Builder.String(b);
    }
    static $go$private$glob$parseLiteral(g: {
        value: Glob;
    } | undefined, pattern: gostring, nested: bool): gostring {
        let specialChars = "";
        if (nested) {
            specialChars = "*?{[/},";
        }
        else {
            specialChars = "*?{[/";
        }
        let end = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexAny(pattern, specialChars)));
        if (end === -1) {
            end = pattern.length;
        }
        (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.append(void 0, [new $goInterfaceAdapter$Named_glob$literal(new literal(goStringSlice(pattern, 0, end)))]);
        return goStringSlice(pattern, end);
    }
}
export function Parse(pattern: gostring): [
    {
        value: Glob;
    } | undefined,
    GoInterface | undefined
] {
    const __gotots_results_0 = parse(pattern, false);
    let g: {
        value: Glob;
    } | undefined = __gotots_results_0[0];
    let err: GoInterface | undefined = __gotots_results_0[2];
    return [g, err];
}
export function parse(pattern: gostring, nested: bool): [
    {
        value: Glob;
    } | undefined,
    gostring,
    GoInterface | undefined
] {
    let g: {
        value: Glob;
    } | undefined = { value: Glob.$zero() };
    for (; pattern.length > 0;) {
        switch (goStringIndex(pattern, 0)) {
            case 47: {
                pattern = goStringSlice(pattern, 1);
                (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.append(void 0, [new GoInterfaceAdapter(new slash)]);
                break;
            }
            case 42: {
                if (pattern.length > 1 && goStringIndex(pattern, 1) === 42) {
                    if (((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.length > 0 && !goInterfaceEqual((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.get((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.length - 1), new GoInterfaceAdapter(new slash))) || (pattern.length > 2 && goStringIndex(pattern, 2) !== 47)) {
                        return [void 0, "", GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("** may only be adjacent to '/'"))];
                    }
                    pattern = goStringSlice(pattern, 2);
                    (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.append(void 0, [new $goInterfaceAdapter$Named_glob$starStar(new starStar)]);
                    break;
                }
                pattern = goStringSlice(pattern, 1);
                (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.append(void 0, [new $goInterfaceAdapter$Named_glob$star(new star)]);
                break;
            }
            case 63: {
                pattern = goStringSlice(pattern, 1);
                (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.append(void 0, [new $goInterfaceAdapter$Named_glob$anyChar(new anyChar)]);
                break;
            }
            case 123: {
                let gs: group = new group(RuntimeSlice.nil<{
                    value: Glob;
                } | undefined>());
                for (; goStringIndex(pattern, 0) !== 125;) {
                    pattern = goStringSlice(pattern, 1);
                    const __gotots_results_5 = parse(pattern, true);
                    let groupG: {
                        value: Glob;
                    } | undefined = __gotots_results_5[0];
                    let pat = __gotots_results_5[1];
                    let err: GoInterface | undefined = __gotots_results_5[2];
                    if (!(err === undefined)) {
                        return [void 0, "", err];
                    }
                    if (pat.length === 0) {
                        return [void 0, "", GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("unmatched '{'"))];
                    }
                    pattern = pat;
                    gs = new group(gs.$value.append(void 0, [groupG]));
                }
                pattern = goStringSlice(pattern, 1);
                (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.append(void 0, [new $goInterfaceAdapter$Named_glob$group(gs)]);
                break;
            }
            case 125:
            case 44: {
                if (nested) {
                    return [g, pattern, void 0];
                }
                pattern = Glob.$go$private$glob$parseLiteral(g, pattern, false);
                break;
            }
            case 91: {
                pattern = goStringSlice(pattern, 1);
                if (pattern.length === 0) {
                    return [void 0, "", $state.errBadRange];
                }
                let negate = false;
                if (goStringIndex(pattern, 0) === 33) {
                    pattern = goStringSlice(pattern, 1);
                    negate = true;
                }
                const __gotots_results_6 = readRangeRune(pattern);
                let low = __gotots_results_6[0];
                let sz = __gotots_results_6[1];
                let err: GoInterface | undefined = __gotots_results_6[2];
                if (!(err === undefined)) {
                    return [void 0, "", err];
                }
                pattern = goStringSlice(pattern, sz);
                if (pattern.length === 0 || goStringIndex(pattern, 0) !== 45) {
                    return [void 0, "", $state.errBadRange];
                }
                pattern = goStringSlice(pattern, 1);
                const __gotots_results_7 = readRangeRune(pattern);
                let high = __gotots_results_7[0];
                sz = __gotots_results_7[1];
                err = __gotots_results_7[2];
                if (!(err === undefined)) {
                    return [void 0, "", err];
                }
                pattern = goStringSlice(pattern, sz);
                if (pattern.length === 0 || goStringIndex(pattern, 0) !== 93) {
                    return [void 0, "", $state.errBadRange];
                }
                pattern = goStringSlice(pattern, 1);
                (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems.append(void 0, [new $goInterfaceAdapter$Named_glob$charRange(new charRange(negate, low, high))]);
                break;
            }
            default: {
                pattern = Glob.$go$private$glob$parseLiteral(g, pattern, nested);
                break;
            }
        }
    }
    return [g, "", void 0];
}
export function readRangeRune(input: gostring): [
    int32,
    int,
    GoInterface | undefined
] {
    const __gotots_results_8 = utf8__from_gostdlib.DecodeRuneInString(input);
    const __gotots_results_9 = [__gotots_results_8[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_8[1]))] satisfies [
        int32,
        int
    ];
    let r = __gotots_results_9[0];
    let sz = __gotots_results_9[1];
    let err: GoInterface | undefined = void 0;
    if (r === RuneError$int32__from_utf8) {
        switch (sz) {
            case 0: {
                err = $state.errBadRange;
                break;
            }
            case 1: {
                err = $state.errInvalidUTF8;
                break;
            }
        }
    }
    return [r, sz, err];
}
export interface element extends GoInterfaceValue {
    String(): gostring;
}
export const element$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$String$void_to_string]);
export function element$is(value: GoInterfaceValue | undefined): value is element {
    return value !== undefined && value.$go$implements(element$contract);
}
export class slash {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $copy($source: slash): slash {
        return new slash();
    }
    static $equal($left: slash, $right: slash): bool {
        return true;
    }
    static $hash($source: slash): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    String(): gostring {
        return "/";
    }
}
export class literal {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
    String(): gostring {
        return this.$value;
    }
}
export class star {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $copy($source: star): star {
        return new star();
    }
    static $equal($left: star, $right: star): bool {
        return true;
    }
    static $hash($source: star): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    String(): gostring {
        return "*";
    }
}
export class anyChar {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $copy($source: anyChar): anyChar {
        return new anyChar();
    }
    static $equal($left: anyChar, $right: anyChar): bool {
        return true;
    }
    static $hash($source: anyChar): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    String(): gostring {
        return "?";
    }
}
export class starStar {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $copy($source: starStar): starStar {
        return new starStar();
    }
    static $equal($left: starStar, $right: starStar): bool {
        return true;
    }
    static $hash($source: starStar): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    String(): gostring {
        return "**";
    }
}
export class group {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<{
        value: Glob;
    } | undefined>) {
    }
    declare private readonly then?: never;
    String(): gostring {
        let parts = RuntimeSlice.nil<gostring>();
        const __gotots_range_3 = this.$value;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let g__shadow_1: {
                value: Glob;
            } | undefined = __gotots_range_value_4;
            parts = parts.append("", [Glob.String(g__shadow_1)]);
        }
        return "{" + strings__from_gostdlib.Join(parts, ",") + "}";
    }
}
export class charRange {
    declare private readonly $goType: void;
    public constructor(public negate: bool, public low: int32, public high: int32) {
    }
    static $copy($source: charRange): charRange {
        return new charRange($source.negate, $source.low, $source.high);
    }
    static $equal($left: charRange, $right: charRange): bool {
        return $left.negate === $right.negate && $left.low === $right.low && $left.high === $right.high;
    }
    static $hash($source: charRange): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.negate));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.low));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.high));
        return $hash;
    }
    declare private readonly then?: never;
    String(): gostring {
        return "[" + goStringEncodeRune(this.low) + "-" + goStringEncodeRune(this.high) + "]";
    }
}
export function match(elems: RuntimeSlice<element | undefined>, input: gostring): bool {
    let ok: bool = false;
    let elem: $goInterface$Interface_void | undefined = void 0;
    for (; elems.length > 0;) {
        const __gotots_assign_0 = elems.get(0);
        const __gotots_assign_1 = elems.slice(1, null, null);
        elem = __gotots_assign_0;
        elems = __gotots_assign_1;
        const __gotots_type_switch_0: $goInterface$Interface_void | undefined = elem;
        switch (true) {
            case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
                let elem__shadow_1: slash = slash.$copy(__gotots_type_switch_0.$go$value);
                if (input.length === 0 || goStringIndex(input, 0) !== 47) {
                    return false;
                }
                for (; goStringIndex(input, 0) === 47;) {
                    input = goStringSlice(input, 1);
                }
                break;
            }
            case $goInterfaceAdapter$Named_glob$starStar.$is(__gotots_type_switch_0): {
                let elem__shadow_1: starStar = starStar.$copy(__gotots_type_switch_0.$go$value);
                if (elems.length > 0) {
                    elems = elems.slice(1, null, null);
                }
                if (elems.length === 0) {
                    return true;
                }
                for (; input.length !== 0;) {
                    if (match(elems, input)) {
                        return true;
                    }
                    const __gotots_results_1 = split(input);
                    input = __gotots_results_1[1];
                }
                return false;
                break;
            }
            case $goInterfaceAdapter$Named_glob$literal.$is(__gotots_type_switch_0): {
                let elem__shadow_1: literal = __gotots_type_switch_0.$go$value;
                if (!strings__from_gostdlib.HasPrefix(input, elem__shadow_1.$value)) {
                    return false;
                }
                input = goStringSlice(input, elem__shadow_1.$value.length);
                break;
            }
            case $goInterfaceAdapter$Named_glob$star.$is(__gotots_type_switch_0): {
                let elem__shadow_1: star = star.$copy(__gotots_type_switch_0.$go$value);
                let segInput = "";
                const __gotots_results_2 = split(input);
                segInput = __gotots_results_2[0];
                input = __gotots_results_2[1];
                let elemEnd = elems.length;
                const __gotots_range_0 = elems;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_index_0;
                    const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
                    let i = __gotots_range_value_0;
                    let e: element | undefined = __gotots_range_value_1;
                    if (goInterfaceEqual(e, new GoInterfaceAdapter((new slash)))) {
                        elemEnd = i;
                        break;
                    }
                }
                let segElems = elems.slice(0, elemEnd, null);
                elems = elems.slice(elemEnd, null, null);
                if (segElems.length === 0) {
                    break;
                }
                let matched = false;
                const __gotots_range_1 = segInput.length;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1; __gotots_range_index_1++) {
                    const __gotots_range_value_2 = __gotots_range_index_1;
                    let i = __gotots_range_value_2;
                    if (match(segElems, goStringSlice(segInput, i))) {
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    return false;
                }
                break;
            }
            case $goInterfaceAdapter$Named_glob$anyChar.$is(__gotots_type_switch_0): {
                let elem__shadow_1: anyChar = anyChar.$copy(__gotots_type_switch_0.$go$value);
                if (input.length === 0 || goStringIndex(input, 0) === 47) {
                    return false;
                }
                input = goStringSlice(input, 1);
                break;
            }
            case $goInterfaceAdapter$Named_glob$group.$is(__gotots_type_switch_0): {
                let elem__shadow_1: group = __gotots_type_switch_0.$go$value;
                let branch = RuntimeSlice.nil<element | undefined>();
                const __gotots_range_2 = elem__shadow_1.$value;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
                    let m: {
                        value: Glob;
                    } | undefined = __gotots_range_value_3;
                    branch = branch.slice(0, 0, null);
                    branch = goSliceAppendSlice<element | undefined>(branch, (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elems, void 0);
                    branch = goSliceAppendSlice<element | undefined>(branch, elems, void 0);
                    if (match(branch, input)) {
                        return true;
                    }
                }
                return false;
                break;
            }
            case $goInterfaceAdapter$Named_glob$charRange.$is(__gotots_type_switch_0): {
                let elem__shadow_1: charRange = charRange.$copy(__gotots_type_switch_0.$go$value);
                if (input.length === 0 || goStringIndex(input, 0) === 47) {
                    return false;
                }
                const __gotots_results_3 = utf8__from_gostdlib.DecodeRuneInString(input);
                const __gotots_results_4 = [__gotots_results_3[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_3[1]))] satisfies [
                    int32,
                    int
                ];
                let c = __gotots_results_4[0];
                let sz = __gotots_results_4[1];
                if (c < elem__shadow_1.low || c > elem__shadow_1.high) {
                    return false;
                }
                input = goStringSlice(input, sz);
                break;
            }
            default: {
                let elem__shadow_1: $goInterface$Interface_void | undefined = __gotots_type_switch_0;
                const __gotots_argument_0 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("segment type %T not implemented", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([elem__shadow_1])));
                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                break;
            }
        }
    }
    return input.length === 0;
}
export function split(input: gostring): [
    gostring,
    gostring
] {
    let first: gostring = "";
    let rest: gostring = "";
    let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(input, 47)));
    if (i < 0) {
        return [input, ""];
    }
    first = goStringSlice(input, 0, i);
    for (let j = i; j < input.length; j++) {
        if (goStringIndex(input, j) !== 47) {
            return [first, goStringSlice(input, j)];
        }
    }
    return [first, ""];
}
