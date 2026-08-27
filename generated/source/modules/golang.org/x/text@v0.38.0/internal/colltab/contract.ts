import type { $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_$Storage } from "../../../../../../support/anonymous-structs.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_ } from "../../../../../../support/anonymous-structs.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export class ContractTrieSet {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<$goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_$Storage>) {
    }
    declare private readonly then?: never;
    $go$private$colltab$scanner(index: int, n: int, b: RuntimeSlice<uint8>): ctScanner {
        return new ctScanner(new ContractTrieSet(this.$value.slice(index, null, null)), b, n, 0, 0, false);
    }
    $go$private$colltab$scannerString(index: int, n: int, str: gostring): ctScannerString {
        return new ctScannerString(new ContractTrieSet(this.$value.slice(index, null, null)), str, n, 0, 0, false);
    }
}
export class ctScanner {
    declare private readonly $goType: void;
    public constructor(public states: ContractTrieSet, public s: RuntimeSlice<uint8>, public n: int, public index: int, public pindex: int, public done: bool) {
    }
    declare private readonly then?: never;
    static $go$private$colltab$result(s: ctScanner | undefined): [
        int,
        int
    ] {
        let i: int = 0;
        let p: int = 0;
        return [(s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pindex];
    }
    static $go$private$colltab$scan(s: ctScanner | undefined, p: int): int {
        let pr = p;
        let str = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s;
        const __gotots_assign_8 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).states;
        const __gotots_assign_9 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).n;
        let states: ContractTrieSet = __gotots_assign_8;
        let n = __gotots_assign_9;
        for (let i = 0; i < n && p < str.length;) {
            let e = $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_.$copy($goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_.$fromStorage(states.$value.get(i)));
            let c = str.get(p);
            if (c >= e.L) {
                if (e.L === c) {
                    p++;
                    if (e.I !== noIndex$uint8) {
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index = e.I;
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pindex = p;
                    }
                    if (e.N !== final$uint8) {
                        const __gotots_assign_10 = 0;
                        const __gotots_assign_11 = new ContractTrieSet(states.$value.slice(e.H + n, null, null));
                        const __gotots_assign_12 = e.N;
                        i = __gotots_assign_10;
                        states = __gotots_assign_11;
                        n = __gotots_assign_12;
                        if (p >= str.length || utf8__from_gostdlib.RuneStart(str.get(p))) {
                            const __gotots_store_2 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_3 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_assign_13 = states;
                            const __gotots_assign_14 = n;
                            const __gotots_assign_15 = p;
                            __gotots_store_2.states = __gotots_assign_13;
                            __gotots_store_3.n = __gotots_assign_14;
                            pr = __gotots_assign_15;
                        }
                    }
                    else {
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).done = true;
                        return p;
                    }
                    continue;
                }
                else if (e.N === final$uint8 && c <= e.H) {
                    p++;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).done = true;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index = c - e.L + e.I;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pindex = p;
                    return p;
                }
            }
            i++;
        }
        return pr;
    }
}
export class ctScannerString {
    declare private readonly $goType: void;
    public constructor(public states: ContractTrieSet, public s: gostring, public n: int, public index: int, public pindex: int, public done: bool) {
    }
    declare private readonly then?: never;
    static $go$private$colltab$result(s: ctScannerString | undefined): [
        int,
        int
    ] {
        let i: int = 0;
        let p: int = 0;
        return [(s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pindex];
    }
    static $go$private$colltab$scan(s: ctScannerString | undefined, p: int): int {
        let pr = p;
        let str = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s;
        const __gotots_assign_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).states;
        const __gotots_assign_1 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).n;
        let states: ContractTrieSet = __gotots_assign_0;
        let n = __gotots_assign_1;
        for (let i = 0; i < n && p < str.length;) {
            let e = $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_.$copy($goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_.$fromStorage(states.$value.get(i)));
            let c = goStringIndex(str, p);
            if (c >= e.L) {
                if (e.L === c) {
                    p++;
                    if (e.I !== noIndex$uint8) {
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index = e.I;
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pindex = p;
                    }
                    if (e.N !== final$uint8) {
                        const __gotots_assign_2 = 0;
                        const __gotots_assign_3 = new ContractTrieSet(states.$value.slice(e.H + n, null, null));
                        const __gotots_assign_4 = e.N;
                        i = __gotots_assign_2;
                        states = __gotots_assign_3;
                        n = __gotots_assign_4;
                        if (p >= str.length || utf8__from_gostdlib.RuneStart(goStringIndex(str, p))) {
                            const __gotots_store_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_1 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_assign_5 = states;
                            const __gotots_assign_6 = n;
                            const __gotots_assign_7 = p;
                            __gotots_store_0.states = __gotots_assign_5;
                            __gotots_store_1.n = __gotots_assign_6;
                            pr = __gotots_assign_7;
                        }
                    }
                    else {
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).done = true;
                        return p;
                    }
                    continue;
                }
                else if (e.N === final$uint8 && c <= e.H) {
                    p++;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).done = true;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index = c - e.L + e.I;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pindex = p;
                    return p;
                }
            }
            i++;
        }
        return pr;
    }
}
export const final$uint8: uint8 = 0;
export const noIndex$uint8: uint8 = 255;
