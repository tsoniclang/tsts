import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Elem } from "./collelem.js";
import type { gostring, int, uint16, uint32, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export class Trie {
    declare private readonly $goType: void;
    public constructor(public Index0: RuntimeSlice<uint16>, public Values0: RuntimeSlice<uint32>, public Index: RuntimeSlice<uint16>, public Values: RuntimeSlice<uint32>) {
    }
    declare private readonly then?: never;
    static $go$private$colltab$lookup(t: tsonicTypeScriptRuntime.Location<Trie> | undefined, s: RuntimeSlice<uint8>): [
        Elem,
        int
    ] {
        let v: Elem = 0;
        let sz: int = 0;
        let c0 = s.get(0);
        __gotots_control_target_0: {
            if (c0 < tx$uint8) {
                return [((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Values0.get(c0), 1];
            }
            else if (c0 < t2$uint8) {
                return [0, 1];
            }
            else if (c0 < t3$uint8) {
                if (s.length < 2) {
                    return [0, 0];
                }
                let i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index0.get(c0);
                let c1 = s.get(1);
                if (c1 < tx$uint8 || t2$uint8 <= c1) {
                    return [0, 1];
                }
                return [Trie.$go$private$colltab$lookupValue(t, i, c1), 2];
            }
            else if (c0 < t4$uint8) {
                if (s.length < 3) {
                    return [0, 0];
                }
                let i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index0.get(c0);
                let c1 = s.get(1);
                if (c1 < tx$uint8 || t2$uint8 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6) + c1;
                i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index.get(o);
                let c2 = s.get(2);
                if (c2 < tx$uint8 || t2$uint8 <= c2) {
                    return [0, 2];
                }
                return [Trie.$go$private$colltab$lookupValue(t, i, c2), 3];
            }
            else if (c0 < t5$uint8) {
                if (s.length < 4) {
                    return [0, 0];
                }
                let i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index0.get(c0);
                let c1 = s.get(1);
                if (c1 < tx$uint8 || t2$uint8 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6) + c1;
                i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index.get(o);
                let c2 = s.get(2);
                if (c2 < tx$uint8 || t2$uint8 <= c2) {
                    return [0, 2];
                }
                o = (i << 6) + c2;
                i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index.get(o);
                let c3 = s.get(3);
                if (c3 < tx$uint8 || t2$uint8 <= c3) {
                    return [0, 3];
                }
                return [Trie.$go$private$colltab$lookupValue(t, i, c3), 4];
            }
        }
        return [0, 1];
    }
    static $go$private$colltab$lookupString(t: tsonicTypeScriptRuntime.Location<Trie> | undefined, s: gostring): [
        Elem,
        int
    ] {
        let v: Elem = 0;
        let sz: int = 0;
        let c0 = goStringIndex(s, 0);
        __gotots_control_target_1: {
            if (c0 < tx$uint8) {
                return [((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Values0.get(c0), 1];
            }
            else if (c0 < t2$uint8) {
                return [0, 1];
            }
            else if (c0 < t3$uint8) {
                if (s.length < 2) {
                    return [0, 0];
                }
                let i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index0.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < tx$uint8 || t2$uint8 <= c1) {
                    return [0, 1];
                }
                return [Trie.$go$private$colltab$lookupValue(t, i, c1), 2];
            }
            else if (c0 < t4$uint8) {
                if (s.length < 3) {
                    return [0, 0];
                }
                let i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index0.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < tx$uint8 || t2$uint8 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6) + c1;
                i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index.get(o);
                let c2 = goStringIndex(s, 2);
                if (c2 < tx$uint8 || t2$uint8 <= c2) {
                    return [0, 2];
                }
                return [Trie.$go$private$colltab$lookupValue(t, i, c2), 3];
            }
            else if (c0 < t5$uint8) {
                if (s.length < 4) {
                    return [0, 0];
                }
                let i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index0.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < tx$uint8 || t2$uint8 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6) + c1;
                i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index.get(o);
                let c2 = goStringIndex(s, 2);
                if (c2 < tx$uint8 || t2$uint8 <= c2) {
                    return [0, 2];
                }
                o = (i << 6) + c2;
                i = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Index.get(o);
                let c3 = goStringIndex(s, 3);
                if (c3 < tx$uint8 || t2$uint8 <= c3) {
                    return [0, 3];
                }
                return [Trie.$go$private$colltab$lookupValue(t, i, c3), 4];
            }
        }
        return [0, 1];
    }
    static $go$private$colltab$lookupValue(t: tsonicTypeScriptRuntime.Location<Trie> | undefined, n: uint16, b: uint8): Elem {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Trie>).value.Values.get((n << 6) + b);
    }
}
export const tx$uint8: uint8 = 128;
export const t2$uint8: uint8 = 192;
export const t3$uint8: uint8 = 224;
export const t4$uint8: uint8 = 240;
export const t5$uint8: uint8 = 248;
