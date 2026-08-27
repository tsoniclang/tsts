import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags as Flags__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { bool, float64, gostring, uint64, uint8 } from "@gotots/runtime/scalars.js";
import { AppendFloat as AppendFloat__from_jsonwire, AppendQuote as AppendQuote__from_jsonwire, ConsumeSimpleString as ConsumeSimpleString__from_jsonwire, QuoteRune as QuoteRune__from_jsonwire, ReformatNumber as ReformatNumber__from_jsonwire, ReformatString as ReformatString__from_jsonwire, UnquoteMayCopy as UnquoteMayCopy__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/state.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { decodeBuffer } from "./decode.js";
import { nonComparable } from "./doc.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export const invalidTokenPanic$string: gostring = "invalid jsontext.Token; it has been voided by a subsequent json.Decoder call";
export type Token$Storage = {
    nonComparable: GoArray<(() => void) | undefined, 0>;
    raw: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined;
    str: gostring;
    num: uint64;
};
export class Token {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Token$Storage) {
    }
    public static $storageOf($source: Token): Token$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Token$Storage): Token {
        return new Token($source);
    }
    public get nonComparable(): nonComparable {
        return new nonComparable(this.$storage.nonComparable);
    }
    public set nonComparable($value: nonComparable) {
        this.$storage.nonComparable = $value.$value;
    }
    public get raw(): tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined {
        return this.$storage.raw;
    }
    public set raw($value: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined) {
        this.$storage.raw = $value;
    }
    public get str(): gostring {
        return this.$storage.str;
    }
    public set str($value: gostring) {
        this.$storage.str = $value;
    }
    public get num(): uint64 {
        return this.$storage.num;
    }
    public set num($value: uint64) {
        this.$storage.num = $value;
    }
    static $zero(): Token {
        return new Token({
            nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
            raw: void 0,
            str: "",
            num: 0n
        });
    }
    static $copy($source: Token): Token {
        return new Token({
            nonComparable: new nonComparable(new nonComparable($source.$storage.nonComparable).$value.copy()).$value,
            raw: $source.$storage.raw,
            str: $source.$storage.str,
            num: $source.$storage.num
        });
    }
    declare private readonly then?: never;
    Bool(): bool {
        {
            const __gotots_switch_tag_0 = Token.$storageOf(this).raw;
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    __gotots_switch_match_0 =
                        tsonicTypeScriptRuntime.sameLocation(__gotots_switch_tag_0, Token.$storageOf(Token.$fromStorage($state.True)).raw);
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 =
                        tsonicTypeScriptRuntime.sameLocation(__gotots_switch_tag_0, Token.$storageOf(Token.$fromStorage($state.False)).raw);
                }
                if (__gotots_switch_match_1) {
                    __gotots_switch_selection_0 = 1;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                __gotots_switch_selection_0 = 2;
            }
            switch (__gotots_switch_selection_0) {
                case 0: {
                    return true;
                    break;
                }
                case 1: {
                    return false;
                    break;
                }
                case 2: {
                    const __gotots_argument_6 = new GoInterfaceAdapter("invalid JSON token kind: " + Kind_String(this.Kind()));
                    GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
                    break;
                }
            }
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    Kind(): Kind {
        __gotots_control_target_0: {
            if (!(Token.$storageOf(this).raw === undefined)) {
                let raw: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined = Token.$storageOf(this).raw;
                if (BigInt.asUintN(64, decodeBuffer.$go$private$jsontext$previousOffsetStart(raw)) !== Token.$storageOf(this).num) {
                    const __gotots_argument_0 = new GoInterfaceAdapter(invalidTokenPanic$string);
                    GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                }
                return Kind_normalize(((Token.$storageOf(this).raw ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.buf.get(((raw ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<decodeBuffer>).value.prevStart));
            }
            else if (Token.$storageOf(this).num !== 0n) {
                return 48;
            }
            else if (Token.$storageOf(this).str.length !== 0) {
                return 34;
            }
            else {
                return invalidKind$constant();
            }
        }
    }
    String(): gostring {
        const __gotots_results_2 = this.$go$private$jsontext$string();
        let s = __gotots_results_2[0];
        let b = __gotots_results_2[1];
        if (b.length > 0) {
            const __gotots_conversion_3 = b;
            let __gotots_conversion_4 = "";
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
            }
            return __gotots_conversion_4;
        }
        return s;
    }
    $go$private$jsontext$appendNumber(dst: RuntimeSlice<uint8>, flags: tsonicTypeScriptRuntime.Location<Flags__from_jsonflags> | undefined): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ] {
        {
            let raw: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined = Token.$storageOf(this).raw;
            if (!(raw === undefined)) {
                let buf = decodeBuffer.$go$private$jsontext$previousBuffer(raw);
                if (Kind_normalize(buf.get(0)) === 48) {
                    const __gotots_results_1 = ReformatNumber__from_jsonwire(dst, buf, flags);
                    let dst__shadow_1 = __gotots_results_1[0];
                    let err: GoInterface | undefined = __gotots_results_1[2];
                    return [dst__shadow_1, err];
                }
            }
            else if (Token.$storageOf(this).num !== 0n) {
                switch (goStringIndex(Token.$storageOf(this).str, 0)) {
                    case 70: {
                        return [AppendFloat__from_jsonwire(dst, math__from_gostdlib.Float32frombits(globalThis.Number(BigInt.asUintN(32, Token.$storageOf(this).num))), 32), void 0];
                        break;
                    }
                    case 102: {
                        return [AppendFloat__from_jsonwire(dst, math__from_gostdlib.Float64frombits(Token.$storageOf(this).num), 64), void 0];
                        break;
                    }
                    case 105: {
                        return [strconv__from_gostdlib.AppendInt(dst, BigInt.asIntN(64, Token.$storageOf(this).num), BigInt.asIntN(64, goNumberToBigInt(10))), void 0];
                        break;
                    }
                    case 117: {
                        return [strconv__from_gostdlib.AppendUint(dst, Token.$storageOf(this).num, BigInt.asIntN(64, goNumberToBigInt(10))), void 0];
                        break;
                    }
                }
            }
        }
        const __gotots_argument_5 = new GoInterfaceAdapter("invalid JSON token kind: " + Kind_String(this.Kind()));
        GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    $go$private$jsontext$appendString(dst: RuntimeSlice<uint8>, flags: tsonicTypeScriptRuntime.Location<Flags__from_jsonflags> | undefined): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ] {
        {
            let raw: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined = Token.$storageOf(this).raw;
            if (!(raw === undefined)) {
                let buf = decodeBuffer.$go$private$jsontext$previousBuffer(raw);
                if (buf.get(0) === 34) {
                    if (ConsumeSimpleString__from_jsonwire(buf) === buf.length) {
                        return [goSliceAppendSlice<uint8>(dst, buf, 0), void 0];
                    }
                    const __gotots_results_0 = ReformatString__from_jsonwire(dst, buf, flags);
                    let dst__shadow_1 = __gotots_results_0[0];
                    let err: GoInterface | undefined = __gotots_results_0[2];
                    return [dst__shadow_1, err];
                }
            }
            else if (Token.$storageOf(this).str.length !== 0 && Token.$storageOf(this).num === 0n) {
                const __gotots_argument_1 = dst;
                const __gotots_conversion_0 = Token.$storageOf(this).str;
                const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
                for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                    __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
                }
                const __gotots_argument_2 = __gotots_conversion_1;
                const __gotots_argument_3 = flags;
                return AppendQuote__from_jsonwire(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
            }
        }
        const __gotots_argument_4 = new GoInterfaceAdapter("invalid JSON token kind: " + Kind_String(this.Kind()));
        GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    $go$private$jsontext$string(): [
        gostring,
        RuntimeSlice<uint8>
    ] {
        {
            let raw: tsonicTypeScriptRuntime.Location<decodeBuffer> | undefined = Token.$storageOf(this).raw;
            if (!(raw === undefined)) {
                if (BigInt.asUintN(64, decodeBuffer.$go$private$jsontext$previousOffsetStart(raw)) !== Token.$storageOf(this).num) {
                    const __gotots_argument_7 = new GoInterfaceAdapter(invalidTokenPanic$string);
                    GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
                }
                let buf = decodeBuffer.$go$private$jsontext$previousBuffer(raw);
                if (buf.get(0) === 34) {
                    let isVerbatim = ConsumeSimpleString__from_jsonwire(buf) === buf.length;
                    return ["", UnquoteMayCopy__from_jsonwire(buf, isVerbatim)];
                }
                return ["", buf];
            }
        }
        if (Token.$storageOf(this).str.length !== 0 && Token.$storageOf(this).num === 0n) {
            return [Token.$storageOf(this).str, RuntimeSlice.nil<uint8>()];
        }
        if (Token.$storageOf(this).num > 0n) {
            switch (goStringIndex(Token.$storageOf(this).str, 0)) {
                case 70: {
                    const __gotots_conversion_6 = AppendFloat__from_jsonwire(RuntimeSlice.nil<uint8>(), math__from_gostdlib.Float32frombits(globalThis.Number(BigInt.asUintN(32, Token.$storageOf(this).num))), 32);
                    let __gotots_conversion_7 = "";
                    for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                        __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                    }
                    const __gotots_results_3 = __gotots_conversion_7;
                    const __gotots_results_4 = RuntimeSlice.nil<uint8>();
                    return [__gotots_results_3, __gotots_results_4];
                    break;
                }
                case 102: {
                    const __gotots_conversion_9 = AppendFloat__from_jsonwire(RuntimeSlice.nil<uint8>(), math__from_gostdlib.Float64frombits(Token.$storageOf(this).num), 64);
                    let __gotots_conversion_10 = "";
                    for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
                        __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
                    }
                    const __gotots_results_5 = __gotots_conversion_10;
                    const __gotots_results_6 = RuntimeSlice.nil<uint8>();
                    return [__gotots_results_5, __gotots_results_6];
                    break;
                }
                case 105: {
                    return [strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, Token.$storageOf(this).num), BigInt.asIntN(64, goNumberToBigInt(10))), RuntimeSlice.nil<uint8>()];
                    break;
                }
                case 117: {
                    return [strconv__from_gostdlib.FormatUint(Token.$storageOf(this).num, BigInt.asIntN(64, goNumberToBigInt(10))), RuntimeSlice.nil<uint8>()];
                    break;
                }
            }
        }
        return ["<invalid jsontext.Token>", RuntimeSlice.nil<uint8>()];
    }
}
export function rawToken(s: gostring): Token {
    const __gotots_conversion_12 = s;
    const __gotots_conversion_13 = RuntimeSlice.make<uint8>(__gotots_conversion_12.length, null, 0);
    for (let __gotots_conversion_14 = 0; __gotots_conversion_14 < __gotots_conversion_12.length; __gotots_conversion_14++) {
        __gotots_conversion_13.set(__gotots_conversion_14, __gotots_conversion_12.charCodeAt(__gotots_conversion_14));
    }
    const __gotots_field_0 = __gotots_conversion_13;
    const __gotots_field_1 = tsonicTypeScriptRuntime.location<decodeBuffer>(new decodeBuffer(0, void 0, __gotots_field_0, 0, s.length, 0n, void 0));
    return Token.$fromStorage({
        raw: __gotots_field_1,
        nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
        str: "",
        num: 0n
    });
}
export function Bool(b: bool): Token {
    if (b) {
        return Token.$copy(Token.$fromStorage($state.True));
    }
    return Token.$copy(Token.$fromStorage($state.False));
}
export function String(s: gostring): Token {
    if (s.length === 0) {
        return Token.$copy(Token.$fromStorage($state.zeroString));
    }
    return Token.$fromStorage({
        str: s,
        nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
        raw: void 0,
        num: 0n
    });
}
export function Float(n: float64): Token {
    __gotots_control_target_1: {
        if (math__from_gostdlib.Float64bits(n) === 0n) {
            return Token.$copy(Token.$fromStorage($state.zeroNumber));
        }
        else if (math__from_gostdlib.IsNaN(n)) {
            return Token.$copy(Token.$fromStorage($state.nanString));
        }
        else if (math__from_gostdlib.IsInf(n, BigInt.asIntN(64, goNumberToBigInt(1)))) {
            return Token.$copy(Token.$fromStorage($state.pinfString));
        }
        else if (math__from_gostdlib.IsInf(n, BigInt.asIntN(64, goNumberToBigInt(-1)))) {
            return Token.$copy(Token.$fromStorage($state.ninfString));
        }
    }
    return Token.$fromStorage({
        str: "f",
        num: math__from_gostdlib.Float64bits(n),
        nonComparable: new nonComparable(GoArray.zero<(() => void) | undefined, 0>(0, void 0)).$value,
        raw: void 0
    });
}
export type Kind = uint8;
export function invalidKind$constant(): Kind {
    return 0;
}
export function Kind_String(k: Kind): gostring {
    switch (k) {
        case 0: {
            return "invalid";
            break;
        }
        case 110: {
            return "null";
            break;
        }
        case 102: {
            return "false";
            break;
        }
        case 116: {
            return "true";
            break;
        }
        case 34: {
            return "string";
            break;
        }
        case 48: {
            return "number";
            break;
        }
        case 123: {
            return "{";
            break;
        }
        case 125: {
            return "}";
            break;
        }
        case 91: {
            return "[";
            break;
        }
        case 93: {
            return "]";
            break;
        }
        default: {
            return "<invalid jsontext.Kind: " + QuoteRune__from_jsonwire(RuntimeSlice.literal<uint8>([k])) + ">";
            break;
        }
    }
}
export function Kind_normalize(k: Kind): Kind {
    return $state.normKind.get(k);
}
