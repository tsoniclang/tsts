import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Elem } from "./collelem.js";
import type { Weighter } from "./weighter.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$PointerTo_Named_colltab$numericWeighter as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Elem_Primary, Elem_Secondary, Elem_Tertiary, MakeElem, defaultSecondary$int, defaultTertiary$int } from "./collelem.js";
import * as named_unicode from "@gotots/gostdlib/internal/facets/named-unicode.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, RuntimeSliceProjection } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function NewNumericWeighter(w: Weighter | undefined): Weighter | undefined {
    let getElem: (($0: gostring) => Elem) | undefined = (s: gostring): Elem => {
        const __gotots_receiver_0 = w;
        const __gotots_argument_0 = RuntimeSlice.nil<Elem>();
        const __gotots_argument_1 = s;
        const __gotots_results_0 = goInterfaceNonNil<Weighter>(__gotots_receiver_0).AppendNextString(__gotots_argument_0, __gotots_argument_1);
        let elems = __gotots_results_0[0];
        return elems.get(0);
    };
    const __gotots_callee_0 = getElem;
    const __gotots_argument_2 = "9";
    let nine = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
    const __gotots_results_1 = MakeElem(Elem_Primary(nine) + 1, Elem_Secondary(nine), Elem_Tertiary(nine), 0);
    let ns = __gotots_results_1[0];
    const __gotots_field_0 = w;
    const __gotots_callee_1 = getElem;
    const __gotots_argument_3 = "0";
    const __gotots_field_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
    const __gotots_callee_2 = getElem;
    const __gotots_argument_4 = "\u00EF\u00BC\u0090";
    const __gotots_field_2 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
    const __gotots_callee_3 = getElem;
    const __gotots_argument_5 = "\u00E2\u0082\u0080";
    const __gotots_field_3 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
    const __gotots_field_4 = nine;
    const __gotots_callee_4 = getElem;
    const __gotots_argument_6 = "\u00E2\u0082\u0089";
    const __gotots_field_5 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
    return new GoInterfaceAdapter(new numericWeighter(__gotots_field_0, __gotots_field_1, __gotots_field_2, __gotots_field_3, __gotots_field_4, __gotots_field_5, ns));
}
export class numericWeighter {
    declare private readonly $goType: void;
    public constructor(public Weighter: Weighter | undefined, public zero: Elem, public zeroSpecialLo: Elem, public zeroSpecialHi: Elem, public nine: Elem, public nineSpecialHi: Elem, public numberStart: Elem) {
    }
    declare private readonly then?: never;
    static AppendNext(nw: numericWeighter | undefined, buf: RuntimeSlice<Elem>, s: RuntimeSlice<uint8>): [
        RuntimeSlice<Elem>,
        int
    ] {
        let ce: RuntimeSlice<Elem> = RuntimeSlice.nil<Elem>();
        let n: int = 0;
        const __gotots_receiver_1 = (nw ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Weighter;
        const __gotots_argument_7 = buf;
        const __gotots_argument_8 = s;
        const __gotots_results_2 = goInterfaceNonNil<Weighter>(__gotots_receiver_1).AppendNext(__gotots_argument_7, __gotots_argument_8);
        ce = __gotots_results_2[0];
        n = __gotots_results_2[1];
        let nc = new numberConverter(nw, buf, 0, 0, "", s);
        const __gotots_results_3 = numberConverter.$go$private$colltab$checkNextDigit(nc, ce);
        let isZero = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (!ok) {
            return [ce, n];
        }
        numberConverter.$go$private$colltab$init(nc, ce, buf.length, isZero);
        for (; n < s.length;) {
            const __gotots_receiver_2 = (nw ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Weighter;
            const __gotots_argument_9 = nc.elems;
            const __gotots_argument_10 = s.slice(n, null, null);
            const __gotots_results_4 = goInterfaceNonNil<Weighter>(__gotots_receiver_2).AppendNext(__gotots_argument_9, __gotots_argument_10);
            let ce__shadow_1 = __gotots_results_4[0];
            let sz = __gotots_results_4[1];
            nc.b = s;
            n += sz;
            if (!numberConverter.$go$private$colltab$update(nc, ce__shadow_1)) {
                break;
            }
        }
        return [numberConverter.$go$private$colltab$result(nc), n];
    }
    static AppendNextString(nw: numericWeighter | undefined, buf: RuntimeSlice<Elem>, s: gostring): [
        RuntimeSlice<Elem>,
        int
    ] {
        let ce: RuntimeSlice<Elem> = RuntimeSlice.nil<Elem>();
        let n: int = 0;
        const __gotots_receiver_3 = (nw ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Weighter;
        const __gotots_argument_11 = buf;
        const __gotots_argument_12 = s;
        const __gotots_results_5 = goInterfaceNonNil<Weighter>(__gotots_receiver_3).AppendNextString(__gotots_argument_11, __gotots_argument_12);
        ce = __gotots_results_5[0];
        n = __gotots_results_5[1];
        let nc = new numberConverter(nw, buf, 0, 0, s, RuntimeSlice.nil<uint8>());
        const __gotots_results_6 = numberConverter.$go$private$colltab$checkNextDigit(nc, ce);
        let isZero = __gotots_results_6[0];
        let ok = __gotots_results_6[1];
        if (!ok) {
            return [ce, n];
        }
        numberConverter.$go$private$colltab$init(nc, ce, buf.length, isZero);
        for (; n < s.length;) {
            const __gotots_receiver_4 = (nw ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Weighter;
            const __gotots_argument_13 = nc.elems;
            const __gotots_argument_14 = goStringSlice(s, n);
            const __gotots_results_7 = goInterfaceNonNil<Weighter>(__gotots_receiver_4).AppendNextString(__gotots_argument_13, __gotots_argument_14);
            let ce__shadow_1 = __gotots_results_7[0];
            let sz = __gotots_results_7[1];
            nc.s = s;
            n += sz;
            if (!numberConverter.$go$private$colltab$update(nc, ce__shadow_1)) {
                break;
            }
        }
        return [numberConverter.$go$private$colltab$result(nc), n];
    }
}
export class numberConverter {
    declare private readonly $goType: void;
    public constructor(public w: numericWeighter | undefined, public elems: RuntimeSlice<Elem>, public nDigits: int, public lenIndex: int, public s: gostring, public b: RuntimeSlice<uint8>) {
    }
    declare private readonly then?: never;
    static $go$private$colltab$checkNextDigit(nc: numberConverter | undefined, bufNew: RuntimeSlice<Elem>): [
        bool,
        bool
    ] {
        let isZero: bool = false;
        let ok: bool = false;
        if ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).elems.length >= bufNew.length) {
            return [false, false];
        }
        let e = bufNew.get((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).elems.length);
        if (e < ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).zeroSpecialLo || ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nine < e) {
            return [false, false];
        }
        if (e < ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).zero) {
            if (e > ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nineSpecialHi) {
                return [false, false];
            }
            if (!numberConverter.$go$private$colltab$isDigit(nc)) {
                return [false, false];
            }
            isZero = e <= ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).zeroSpecialHi;
        }
        else {
            isZero = e === ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).zero;
        }
        {
            let n = bufNew.length - (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).elems.length;
            if (n > 1) {
                for (let i = (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).elems.length + 1; i < bufNew.length; i++) {
                    if (Elem_Primary(bufNew.get(i)) !== 0) {
                        return [false, false];
                    }
                }
                if (!numberConverter.$go$private$colltab$isDigit(nc)) {
                    return [false, false];
                }
            }
        }
        return [isZero, true];
    }
    static $go$private$colltab$init(nc: numberConverter | undefined, elems: RuntimeSlice<Elem>, oldLen: int, isZero: bool): void {
        if (isZero) {
            elems = elems.slice(0, oldLen, null).append(0, [((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).numberStart, 0]);
        }
        else {
            elems = elems.append(0, [0, 0]);
            RuntimeSlice.copy<Elem>(elems.slice(oldLen + 2, null, null), elems.slice(oldLen, null, null));
            elems.set(oldLen, ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).numberStart);
            elems.set(oldLen + 1, 0);
            (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nDigits = 1;
        }
        (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).elems = elems;
        (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lenIndex = oldLen + 1;
    }
    static $go$private$colltab$isDigit(nc: numberConverter | undefined): bool {
        if (!(nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b.isNil()) {
            const __gotots_results_10 = utf8__from_gostdlib.DecodeRune((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).b);
            const __gotots_results_11 = [__gotots_results_10[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_10[1]))] satisfies [
                int32,
                int
            ];
            let r__shadow_1 = __gotots_results_11[0];
            const __gotots_argument_16 = r__shadow_1;
            const __gotots_conversion_0 = unicode__from_gostdlib.state.Nd;
            const __gotots_argument_15 = __gotots_conversion_0 === undefined ? undefined :
                tsonicTypeScriptRuntime.boundLocation<unicode__from_gostdlib.RangeTable>(__gotots_conversion_0, (): unicode__from_gostdlib.RangeTable => {
                    return __gotots_conversion_0;
                }, ($go$providerPointerValue: unicode__from_gostdlib.RangeTable): void => {
                    named_unicode.UnicodeRangeTableOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                });
            const __gotots_argument_17 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined>([__gotots_argument_15]);
            return unicode__from_gostdlib.In(__gotots_argument_16, new RuntimeSliceProjection<tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined, unicode__from_gostdlib.RangeTable | undefined>(__gotots_argument_17, ($productElement: tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined): unicode__from_gostdlib.RangeTable | undefined => {
                const __gotots_conversion_2 = $productElement;
                return __gotots_conversion_2 === undefined ? undefined :
                    (__gotots_conversion_2 as tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable>).value;
            }, ($providerElement: unicode__from_gostdlib.RangeTable | undefined): tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined => {
                const __gotots_conversion_1 = $providerElement;
                return __gotots_conversion_1 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<unicode__from_gostdlib.RangeTable>(__gotots_conversion_1, (): unicode__from_gostdlib.RangeTable => {
                        return __gotots_conversion_1;
                    }, ($go$providerPointerValue: unicode__from_gostdlib.RangeTable): void => {
                        named_unicode.UnicodeRangeTableOperations.$assign(__gotots_conversion_1, $go$providerPointerValue);
                    });
            }, void 0, void 0));
        }
        const __gotots_results_12 = utf8__from_gostdlib.DecodeRuneInString((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        const __gotots_results_13 = [__gotots_results_12[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_12[1]))] satisfies [
            int32,
            int
        ];
        let r = __gotots_results_13[0];
        const __gotots_argument_19 = r;
        const __gotots_conversion_3 = unicode__from_gostdlib.state.Nd;
        const __gotots_argument_18 = __gotots_conversion_3 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<unicode__from_gostdlib.RangeTable>(__gotots_conversion_3, (): unicode__from_gostdlib.RangeTable => {
                return __gotots_conversion_3;
            }, ($go$providerPointerValue: unicode__from_gostdlib.RangeTable): void => {
                named_unicode.UnicodeRangeTableOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
            });
        const __gotots_argument_20 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined>([__gotots_argument_18]);
        return unicode__from_gostdlib.In(__gotots_argument_19, new RuntimeSliceProjection<tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined, unicode__from_gostdlib.RangeTable | undefined>(__gotots_argument_20, ($productElement: tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined): unicode__from_gostdlib.RangeTable | undefined => {
            const __gotots_conversion_5 = $productElement;
            return __gotots_conversion_5 === undefined ? undefined :
                (__gotots_conversion_5 as tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable>).value;
        }, ($providerElement: unicode__from_gostdlib.RangeTable | undefined): tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable> | undefined => {
            const __gotots_conversion_4 = $providerElement;
            return __gotots_conversion_4 === undefined ? undefined :
                tsonicTypeScriptRuntime.boundLocation<unicode__from_gostdlib.RangeTable>(__gotots_conversion_4, (): unicode__from_gostdlib.RangeTable => {
                    return __gotots_conversion_4;
                }, ($go$providerPointerValue: unicode__from_gostdlib.RangeTable): void => {
                    named_unicode.UnicodeRangeTableOperations.$assign(__gotots_conversion_4, $go$providerPointerValue);
                });
        }, void 0, void 0));
    }
    static $go$private$colltab$result(nc: numberConverter | undefined): RuntimeSlice<Elem> {
        const __gotots_results_9 = MakeElem((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nDigits, defaultSecondary$int, defaultTertiary$int, 0);
        let e = __gotots_results_9[0];
        (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).elems.set((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lenIndex, e);
        return (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).elems;
    }
    static $go$private$colltab$update(nc: numberConverter | undefined, elems: RuntimeSlice<Elem>): bool {
        const __gotots_results_8 = numberConverter.$go$private$colltab$checkNextDigit(nc, elems);
        let isZero = __gotots_results_8[0];
        let ok = __gotots_results_8[1];
        if ((nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nDigits === 0 && isZero) {
            return true;
        }
        (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).elems = elems;
        if (!ok) {
            return false;
        }
        const __gotots_store_0 = (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_0.nDigits = __gotots_store_0.nDigits + 1;
        return (nc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nDigits < maxDigits$int;
    }
}
export const maxDigits$int: int = 2097151;
