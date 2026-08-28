import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { sparseBlocks$Storage as sparseBlocks__from_norm$Storage } from "./trie.js";
import type { gostring, int, uint16, uint32, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/state.js";
import { sparseBlocks } from "./trie.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export const firstMulti$uint16: uint16 = 6554;
export const firstCCC$uint16: uint16 = 11733;
export const endMulti$uint16: uint16 = 11967;
export const firstLeadingCCC$uint16: uint16 = 19183;
export const firstStarterWithNLead$uint16: uint16 = 19424;
export class nfcTrie {
    declare private readonly $goType: void;
    public constructor() {
    }
    declare private readonly then?: never;
    static $go$private$norm$lookup(t: nfcTrie | undefined, s: RuntimeSlice<uint8>): [
        uint16,
        int
    ] {
        let v: uint16 = 0;
        let sz: int = 0;
        let c0 = s.get(0);
        __gotots_control_target_2: {
            if (c0 < 128) {
                return [$state.nfcValues.get(c0), 1];
            }
            else if (c0 < 194) {
                return [0, 1];
            }
            else if (c0 < 224) {
                if (s.length < 2) {
                    return [0, 0];
                }
                let i = $state.nfcIndex.get(c0);
                let c1 = s.get(1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                return [nfcTrie.$go$private$norm$lookupValue(t, i, c1), 2];
            }
            else if (c0 < 240) {
                if (s.length < 3) {
                    return [0, 0];
                }
                let i = $state.nfcIndex.get(c0);
                let c1 = s.get(1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6 >>> 0) + c1;
                i = $state.nfcIndex.get(o);
                let c2 = s.get(2);
                if (c2 < 128 || 192 <= c2) {
                    return [0, 2];
                }
                return [nfcTrie.$go$private$norm$lookupValue(t, i, c2), 3];
            }
            else if (c0 < 248) {
                if (s.length < 4) {
                    return [0, 0];
                }
                let i = $state.nfcIndex.get(c0);
                let c1 = s.get(1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6 >>> 0) + c1;
                i = $state.nfcIndex.get(o);
                let c2 = s.get(2);
                if (c2 < 128 || 192 <= c2) {
                    return [0, 2];
                }
                o = (i << 6 >>> 0) + c2;
                i = $state.nfcIndex.get(o);
                let c3 = s.get(3);
                if (c3 < 128 || 192 <= c3) {
                    return [0, 3];
                }
                return [nfcTrie.$go$private$norm$lookupValue(t, i, c3), 4];
            }
        }
        return [0, 1];
    }
    static $go$private$norm$lookupString(t: nfcTrie | undefined, s: gostring): [
        uint16,
        int
    ] {
        let v: uint16 = 0;
        let sz: int = 0;
        let c0 = goStringIndex(s, 0);
        __gotots_control_target_0: {
            if (c0 < 128) {
                return [$state.nfcValues.get(c0), 1];
            }
            else if (c0 < 194) {
                return [0, 1];
            }
            else if (c0 < 224) {
                if (s.length < 2) {
                    return [0, 0];
                }
                let i = $state.nfcIndex.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                return [nfcTrie.$go$private$norm$lookupValue(t, i, c1), 2];
            }
            else if (c0 < 240) {
                if (s.length < 3) {
                    return [0, 0];
                }
                let i = $state.nfcIndex.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6 >>> 0) + c1;
                i = $state.nfcIndex.get(o);
                let c2 = goStringIndex(s, 2);
                if (c2 < 128 || 192 <= c2) {
                    return [0, 2];
                }
                return [nfcTrie.$go$private$norm$lookupValue(t, i, c2), 3];
            }
            else if (c0 < 248) {
                if (s.length < 4) {
                    return [0, 0];
                }
                let i = $state.nfcIndex.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6 >>> 0) + c1;
                i = $state.nfcIndex.get(o);
                let c2 = goStringIndex(s, 2);
                if (c2 < 128 || 192 <= c2) {
                    return [0, 2];
                }
                o = (i << 6 >>> 0) + c2;
                i = $state.nfcIndex.get(o);
                let c3 = goStringIndex(s, 3);
                if (c3 < 128 || 192 <= c3) {
                    return [0, 3];
                }
                return [nfcTrie.$go$private$norm$lookupValue(t, i, c3), 4];
            }
        }
        return [0, 1];
    }
    static $go$private$norm$lookupValue(t: nfcTrie | undefined, n: uint32, b: uint8): uint16 {
        __gotots_control_target_4: {
            if (n < 46) {
                return $state.nfcValues.get((n << 6 >>> 0) + b);
            }
            else {
                n = n - 46;
                return sparseBlocks.$go$private$norm$lookup(tsonicTypeScriptRuntime.projectLocation<sparseBlocks__from_norm$Storage, sparseBlocks>(tsonicTypeScriptRuntime.propertyLocation($state, "nfcSparse"), sparseBlocks.$fromStorage, sparseBlocks.$storageOf), n, b);
            }
        }
    }
}
export function newNfcTrie(i: int): nfcTrie | undefined {
    return new nfcTrie;
}
export class nfkcTrie {
    declare private readonly $goType: void;
    public constructor() {
    }
    declare private readonly then?: never;
    static $go$private$norm$lookup(t: nfkcTrie | undefined, s: RuntimeSlice<uint8>): [
        uint16,
        int
    ] {
        let v: uint16 = 0;
        let sz: int = 0;
        let c0 = s.get(0);
        __gotots_control_target_3: {
            if (c0 < 128) {
                return [$state.nfkcValues.get(c0), 1];
            }
            else if (c0 < 194) {
                return [0, 1];
            }
            else if (c0 < 224) {
                if (s.length < 2) {
                    return [0, 0];
                }
                let i = $state.nfkcIndex.get(c0);
                let c1 = s.get(1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                return [nfkcTrie.$go$private$norm$lookupValue(t, i, c1), 2];
            }
            else if (c0 < 240) {
                if (s.length < 3) {
                    return [0, 0];
                }
                let i = $state.nfkcIndex.get(c0);
                let c1 = s.get(1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6 >>> 0) + c1;
                i = $state.nfkcIndex.get(o);
                let c2 = s.get(2);
                if (c2 < 128 || 192 <= c2) {
                    return [0, 2];
                }
                return [nfkcTrie.$go$private$norm$lookupValue(t, i, c2), 3];
            }
            else if (c0 < 248) {
                if (s.length < 4) {
                    return [0, 0];
                }
                let i = $state.nfkcIndex.get(c0);
                let c1 = s.get(1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6 >>> 0) + c1;
                i = $state.nfkcIndex.get(o);
                let c2 = s.get(2);
                if (c2 < 128 || 192 <= c2) {
                    return [0, 2];
                }
                o = (i << 6 >>> 0) + c2;
                i = $state.nfkcIndex.get(o);
                let c3 = s.get(3);
                if (c3 < 128 || 192 <= c3) {
                    return [0, 3];
                }
                return [nfkcTrie.$go$private$norm$lookupValue(t, i, c3), 4];
            }
        }
        return [0, 1];
    }
    static $go$private$norm$lookupString(t: nfkcTrie | undefined, s: gostring): [
        uint16,
        int
    ] {
        let v: uint16 = 0;
        let sz: int = 0;
        let c0 = goStringIndex(s, 0);
        __gotots_control_target_1: {
            if (c0 < 128) {
                return [$state.nfkcValues.get(c0), 1];
            }
            else if (c0 < 194) {
                return [0, 1];
            }
            else if (c0 < 224) {
                if (s.length < 2) {
                    return [0, 0];
                }
                let i = $state.nfkcIndex.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                return [nfkcTrie.$go$private$norm$lookupValue(t, i, c1), 2];
            }
            else if (c0 < 240) {
                if (s.length < 3) {
                    return [0, 0];
                }
                let i = $state.nfkcIndex.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6 >>> 0) + c1;
                i = $state.nfkcIndex.get(o);
                let c2 = goStringIndex(s, 2);
                if (c2 < 128 || 192 <= c2) {
                    return [0, 2];
                }
                return [nfkcTrie.$go$private$norm$lookupValue(t, i, c2), 3];
            }
            else if (c0 < 248) {
                if (s.length < 4) {
                    return [0, 0];
                }
                let i = $state.nfkcIndex.get(c0);
                let c1 = goStringIndex(s, 1);
                if (c1 < 128 || 192 <= c1) {
                    return [0, 1];
                }
                let o = (i << 6 >>> 0) + c1;
                i = $state.nfkcIndex.get(o);
                let c2 = goStringIndex(s, 2);
                if (c2 < 128 || 192 <= c2) {
                    return [0, 2];
                }
                o = (i << 6 >>> 0) + c2;
                i = $state.nfkcIndex.get(o);
                let c3 = goStringIndex(s, 3);
                if (c3 < 128 || 192 <= c3) {
                    return [0, 3];
                }
                return [nfkcTrie.$go$private$norm$lookupValue(t, i, c3), 4];
            }
        }
        return [0, 1];
    }
    static $go$private$norm$lookupValue(t: nfkcTrie | undefined, n: uint32, b: uint8): uint16 {
        __gotots_control_target_5: {
            if (n < 95) {
                return $state.nfkcValues.get((n << 6 >>> 0) + b);
            }
            else {
                n = n - 95;
                return sparseBlocks.$go$private$norm$lookup(tsonicTypeScriptRuntime.projectLocation<sparseBlocks__from_norm$Storage, sparseBlocks>(tsonicTypeScriptRuntime.propertyLocation($state, "nfkcSparse"), sparseBlocks.$fromStorage, sparseBlocks.$storageOf), n, b);
            }
        }
    }
}
export function newNfkcTrie(i: int): nfkcTrie | undefined {
    return new nfkcTrie;
}
export const recompMapPacked$string: gostring = "\0A\u0003\0\0\0\0\u00C0\0A\u0003\u0001\0\0\0\u00C1\0A\u0003\u0002\0\0\0\u00C2\0A\u0003\u0003\0\0\0\u00C3\0A\u0003\b\0\0\0\u00C4\0A\u0003\n\0\0\0\u00C5\0C\u0003'\0\0\0\u00C7\0E\u0003\0\0\0\0\u00C8\0E\u0003\u0001\0\0\0\u00C9\0E\u0003\u0002\0\0\0\u00CA\0E\u0003\b\0\0\0\u00CB\0I\u0003\0\0\0\0\u00CC\0I\u0003\u0001\0\0\0\u00CD\0I\u0003\u0002\0\0\0\u00CE\0I\u0003\b\0\0\0\u00CF\0N\u0003\u0003\0\0\0\u00D1\0O\u0003\0\0\0\0\u00D2\0O\u0003\u0001\0\0\0\u00D3\0O\u0003\u0002\0\0\0\u00D4\0O\u0003\u0003\0\0\0\u00D5\0O\u0003\b\0\0\0\u00D6\0U\u0003\0\0\0\0\u00D9\0U\u0003\u0001\0\0\0\u00DA\0U\u0003\u0002\0\0\0\u00DB\0U\u0003\b\0\0\0\u00DC\0Y\u0003\u0001\0\0\0\u00DD\0a\u0003\0\0\0\0\u00E0\0a\u0003\u0001\0\0\0\u00E1\0a\u0003\u0002\0\0\0\u00E2\0a\u0003\u0003\0\0\0\u00E3\0a\u0003\b\0\0\0\u00E4\0a\u0003\n\0\0\0\u00E5\0c\u0003'\0\0\0\u00E7\0e\u0003\0\0\0\0\u00E8\0e\u0003\u0001\0\0\0\u00E9\0e\u0003\u0002\0\0\0\u00EA\0e\u0003\b\0\0\0\u00EB\0i\u0003\0\0\0\0\u00EC\0i\u0003\u0001\0\0\0\u00ED\0i\u0003\u0002\0\0\0\u00EE\0i\u0003\b\0\0\0\u00EF\0n\u0003\u0003\0\0\0\u00F1\0o\u0003\0\0\0\0\u00F2\0o\u0003\u0001\0\0\0\u00F3\0o\u0003\u0002\0\0\0\u00F4\0o\u0003\u0003\0\0\0\u00F5\0o\u0003\b\0\0\0\u00F6\0u\u0003\0\0\0\0\u00F9\0u\u0003\u0001\0\0\0\u00FA\0u\u0003\u0002\0\0\0\u00FB\0u\u0003\b\0\0\0\u00FC\0y\u0003\u0001\0\0\0\u00FD\0y\u0003\b\0\0\0\u00FF\0A\u0003\u0004\0\0\u0001\0\0a\u0003\u0004\0\0\u0001\u0001\0A\u0003\u0006\0\0\u0001\u0002\0a\u0003\u0006\0\0\u0001\u0003\0A\u0003(\0\0\u0001\u0004\0a\u0003(\0\0\u0001\u0005\0C\u0003\u0001\0\0\u0001\u0006\0c\u0003\u0001\0\0\u0001\u0007\0C\u0003\u0002\0\0\u0001\b\0c\u0003\u0002\0\0\u0001\t\0C\u0003\u0007\0\0\u0001\n\0c\u0003\u0007\0\0\u0001\v\0C\u0003\f\0\0\u0001\f\0c\u0003\f\0\0\u0001\r\0D\u0003\f\0\0\u0001\u000E\0d\u0003\f\0\0\u0001\u000F\0E\u0003\u0004\0\0\u0001\u0012\0e\u0003\u0004\0\0\u0001\u0013\0E\u0003\u0006\0\0\u0001\u0014\0e\u0003\u0006\0\0\u0001\u0015\0E\u0003\u0007\0\0\u0001\u0016\0e\u0003\u0007\0\0\u0001\u0017\0E\u0003(\0\0\u0001\u0018\0e\u0003(\0\0\u0001\u0019\0E\u0003\f\0\0\u0001\u001A\0e\u0003\f\0\0\u0001\u001B\0G\u0003\u0002\0\0\u0001\u001C\0g\u0003\u0002\0\0\u0001\u001D\0G\u0003\u0006\0\0\u0001\u001E\0g\u0003\u0006\0\0\u0001\u001F\0G\u0003\u0007\0\0\u0001 \0g\u0003\u0007\0\0\u0001!\0G\u0003'\0\0\u0001\"\0g\u0003'\0\0\u0001#\0H\u0003\u0002\0\0\u0001$\0h\u0003\u0002\0\0\u0001%\0I\u0003\u0003\0\0\u0001(\0i\u0003\u0003\0\0\u0001)\0I\u0003\u0004\0\0\u0001*\0i\u0003\u0004\0\0\u0001+\0I\u0003\u0006\0\0\u0001,\0i\u0003\u0006\0\0\u0001-\0I\u0003(\0\0\u0001.\0i\u0003(\0\0\u0001/\0I\u0003\u0007\0\0\u00010\0J\u0003\u0002\0\0\u00014\0j\u0003\u0002\0\0\u00015\0K\u0003'\0\0\u00016\0k\u0003'\0\0\u00017\0L\u0003\u0001\0\0\u00019\0l\u0003\u0001\0\0\u0001:\0L\u0003'\0\0\u0001;\0l\u0003'\0\0\u0001<\0L\u0003\f\0\0\u0001=\0l\u0003\f\0\0\u0001>\0N\u0003\u0001\0\0\u0001C\0n\u0003\u0001\0\0\u0001D\0N\u0003'\0\0\u0001E\0n\u0003'\0\0\u0001F\0N\u0003\f\0\0\u0001G\0n\u0003\f\0\0\u0001H\0O\u0003\u0004\0\0\u0001L\0o\u0003\u0004\0\0\u0001M\0O\u0003\u0006\0\0\u0001N\0o\u0003\u0006\0\0\u0001O\0O\u0003\v\0\0\u0001P\0o\u0003\v\0\0\u0001Q\0R\u0003\u0001\0\0\u0001T\0r\u0003\u0001\0\0\u0001U\0R\u0003'\0\0\u0001V\0r\u0003'\0\0\u0001W\0R\u0003\f\0\0\u0001X\0r\u0003\f\0\0\u0001Y\0S\u0003\u0001\0\0\u0001Z\0s\u0003\u0001\0\0\u0001[\0S\u0003\u0002\0\0\u0001\\\0s\u0003\u0002\0\0\u0001]\0S\u0003'\0\0\u0001^\0s\u0003'\0\0\u0001_\0S\u0003\f\0\0\u0001`\0s\u0003\f\0\0\u0001a\0T\u0003'\0\0\u0001b\0t\u0003'\0\0\u0001c\0T\u0003\f\0\0\u0001d\0t\u0003\f\0\0\u0001e\0U\u0003\u0003\0\0\u0001h\0u\u0003\u0003\0\0\u0001i\0U\u0003\u0004\0\0\u0001j\0u\u0003\u0004\0\0\u0001k\0U\u0003\u0006\0\0\u0001l\0u\u0003\u0006\0\0\u0001m\0U\u0003\n\0\0\u0001n\0u\u0003\n\0\0\u0001o\0U\u0003\v\0\0\u0001p\0u\u0003\v\0\0\u0001q\0U\u0003(\0\0\u0001r\0u\u0003(\0\0\u0001s\0W\u0003\u0002\0\0\u0001t\0w\u0003\u0002\0\0\u0001u\0Y\u0003\u0002\0\0\u0001v\0y\u0003\u0002\0\0\u0001w\0Y\u0003\b\0\0\u0001x\0Z\u0003\u0001\0\0\u0001y\0z\u0003\u0001\0\0\u0001z\0Z\u0003\u0007\0\0\u0001{\0z\u0003\u0007\0\0\u0001|\0Z\u0003\f\0\0\u0001}\0z\u0003\f\0\0\u0001~\0O\u0003\u001B\0\0\u0001\u00A0\0o\u0003\u001B\0\0\u0001\u00A1\0U\u0003\u001B\0\0\u0001\u00AF\0u\u0003\u001B\0\0\u0001\u00B0\0A\u0003\f\0\0\u0001\u00CD\0a\u0003\f\0\0\u0001\u00CE\0I\u0003\f\0\0\u0001\u00CF\0i\u0003\f\0\0\u0001\u00D0\0O\u0003\f\0\0\u0001\u00D1\0o\u0003\f\0\0\u0001\u00D2\0U\u0003\f\0\0\u0001\u00D3\0u\u0003\f\0\0\u0001\u00D4\0\u00DC\u0003\u0004\0\0\u0001\u00D5\0\u00FC\u0003\u0004\0\0\u0001\u00D6\0\u00DC\u0003\u0001\0\0\u0001\u00D7\0\u00FC\u0003\u0001\0\0\u0001\u00D8\0\u00DC\u0003\f\0\0\u0001\u00D9\0\u00FC\u0003\f\0\0\u0001\u00DA\0\u00DC\u0003\0\0\0\u0001\u00DB\0\u00FC\u0003\0\0\0\u0001\u00DC\0\u00C4\u0003\u0004\0\0\u0001\u00DE\0\u00E4\u0003\u0004\0\0\u0001\u00DF\u0002&\u0003\u0004\0\0\u0001\u00E0\u0002'\u0003\u0004\0\0\u0001\u00E1\0\u00C6\u0003\u0004\0\0\u0001\u00E2\0\u00E6\u0003\u0004\0\0\u0001\u00E3\0G\u0003\f\0\0\u0001\u00E6\0g\u0003\f\0\0\u0001\u00E7\0K\u0003\f\0\0\u0001\u00E8\0k\u0003\f\0\0\u0001\u00E9\0O\u0003(\0\0\u0001\u00EA\0o\u0003(\0\0\u0001\u00EB\u0001\u00EA\u0003\u0004\0\0\u0001\u00EC\u0001\u00EB\u0003\u0004\0\0\u0001\u00ED\u0001\u00B7\u0003\f\0\0\u0001\u00EE\u0002\u0092\u0003\f\0\0\u0001\u00EF\0j\u0003\f\0\0\u0001\u00F0\0G\u0003\u0001\0\0\u0001\u00F4\0g\u0003\u0001\0\0\u0001\u00F5\0N\u0003\0\0\0\u0001\u00F8\0n\u0003\0\0\0\u0001\u00F9\0\u00C5\u0003\u0001\0\0\u0001\u00FA\0\u00E5\u0003\u0001\0\0\u0001\u00FB\0\u00C6\u0003\u0001\0\0\u0001\u00FC\0\u00E6\u0003\u0001\0\0\u0001\u00FD\0\u00D8\u0003\u0001\0\0\u0001\u00FE\0\u00F8\u0003\u0001\0\0\u0001\u00FF\0A\u0003\u000F\0\0\u0002\0\0a\u0003\u000F\0\0\u0002\u0001\0A\u0003\u0011\0\0\u0002\u0002\0a\u0003\u0011\0\0\u0002\u0003\0E\u0003\u000F\0\0\u0002\u0004\0e\u0003\u000F\0\0\u0002\u0005\0E\u0003\u0011\0\0\u0002\u0006\0e\u0003\u0011\0\0\u0002\u0007\0I\u0003\u000F\0\0\u0002\b\0i\u0003\u000F\0\0\u0002\t\0I\u0003\u0011\0\0\u0002\n\0i\u0003\u0011\0\0\u0002\v\0O\u0003\u000F\0\0\u0002\f\0o\u0003\u000F\0\0\u0002\r\0O\u0003\u0011\0\0\u0002\u000E\0o\u0003\u0011\0\0\u0002\u000F\0R\u0003\u000F\0\0\u0002\u0010\0r\u0003\u000F\0\0\u0002\u0011\0R\u0003\u0011\0\0\u0002\u0012\0r\u0003\u0011\0\0\u0002\u0013\0U\u0003\u000F\0\0\u0002\u0014\0u\u0003\u000F\0\0\u0002\u0015\0U\u0003\u0011\0\0\u0002\u0016\0u\u0003\u0011\0\0\u0002\u0017\0S\u0003&\0\0\u0002\u0018\0s\u0003&\0\0\u0002\u0019\0T\u0003&\0\0\u0002\u001A\0t\u0003&\0\0\u0002\u001B\0H\u0003\f\0\0\u0002\u001E\0h\u0003\f\0\0\u0002\u001F\0A\u0003\u0007\0\0\u0002&\0a\u0003\u0007\0\0\u0002'\0E\u0003'\0\0\u0002(\0e\u0003'\0\0\u0002)\0\u00D6\u0003\u0004\0\0\u0002*\0\u00F6\u0003\u0004\0\0\u0002+\0\u00D5\u0003\u0004\0\0\u0002,\0\u00F5\u0003\u0004\0\0\u0002-\0O\u0003\u0007\0\0\u0002.\0o\u0003\u0007\0\0\u0002/\u0002.\u0003\u0004\0\0\u00020\u0002/\u0003\u0004\0\0\u00021\0Y\u0003\u0004\0\0\u00022\0y\u0003\u0004\0\0\u00023\0\u00A8\u0003\u0001\0\0\u0003\u0085\u0003\u0091\u0003\u0001\0\0\u0003\u0086\u0003\u0095\u0003\u0001\0\0\u0003\u0088\u0003\u0097\u0003\u0001\0\0\u0003\u0089\u0003\u0099\u0003\u0001\0\0\u0003\u008A\u0003\u009F\u0003\u0001\0\0\u0003\u008C\u0003\u00A5\u0003\u0001\0\0\u0003\u008E\u0003\u00A9\u0003\u0001\0\0\u0003\u008F\u0003\u00CA\u0003\u0001\0\0\u0003\u0090\u0003\u0099\u0003\b\0\0\u0003\u00AA\u0003\u00A5\u0003\b\0\0\u0003\u00AB\u0003\u00B1\u0003\u0001\0\0\u0003\u00AC\u0003\u00B5\u0003\u0001\0\0\u0003\u00AD\u0003\u00B7\u0003\u0001\0\0\u0003\u00AE\u0003\u00B9\u0003\u0001\0\0\u0003\u00AF\u0003\u00CB\u0003\u0001\0\0\u0003\u00B0\u0003\u00B9\u0003\b\0\0\u0003\u00CA\u0003\u00C5\u0003\b\0\0\u0003\u00CB\u0003\u00BF\u0003\u0001\0\0\u0003\u00CC\u0003\u00C5\u0003\u0001\0\0\u0003\u00CD\u0003\u00C9\u0003\u0001\0\0\u0003\u00CE\u0003\u00D2\u0003\u0001\0\0\u0003\u00D3\u0003\u00D2\u0003\b\0\0\u0003\u00D4\u0004\u0015\u0003\0\0\0\u0004\0\u0004\u0015\u0003\b\0\0\u0004\u0001\u0004\u0013\u0003\u0001\0\0\u0004\u0003\u0004\u0006\u0003\b\0\0\u0004\u0007\u0004\u001A\u0003\u0001\0\0\u0004\f\u0004\u0018\u0003\0\0\0\u0004\r\u0004#\u0003\u0006\0\0\u0004\u000E\u0004\u0018\u0003\u0006\0\0\u0004\u0019\u00048\u0003\u0006\0\0\u00049\u00045\u0003\0\0\0\u0004P\u00045\u0003\b\0\0\u0004Q\u00043\u0003\u0001\0\0\u0004S\u0004V\u0003\b\0\0\u0004W\u0004:\u0003\u0001\0\0\u0004\\\u00048\u0003\0\0\0\u0004]\u0004C\u0003\u0006\0\0\u0004^\u0004t\u0003\u000F\0\0\u0004v\u0004u\u0003\u000F\0\0\u0004w\u0004\u0016\u0003\u0006\0\0\u0004\u00C1\u00046\u0003\u0006\0\0\u0004\u00C2\u0004\u0010\u0003\u0006\0\0\u0004\u00D0\u00040\u0003\u0006\0\0\u0004\u00D1\u0004\u0010\u0003\b\0\0\u0004\u00D2\u00040\u0003\b\0\0\u0004\u00D3\u0004\u0015\u0003\u0006\0\0\u0004\u00D6\u00045\u0003\u0006\0\0\u0004\u00D7\u0004\u00D8\u0003\b\0\0\u0004\u00DA\u0004\u00D9\u0003\b\0\0\u0004\u00DB\u0004\u0016\u0003\b\0\0\u0004\u00DC\u00046\u0003\b\0\0\u0004\u00DD\u0004\u0017\u0003\b\0\0\u0004\u00DE\u00047\u0003\b\0\0\u0004\u00DF\u0004\u0018\u0003\u0004\0\0\u0004\u00E2\u00048\u0003\u0004\0\0\u0004\u00E3\u0004\u0018\u0003\b\0\0\u0004\u00E4\u00048\u0003\b\0\0\u0004\u00E5\u0004\u001E\u0003\b\0\0\u0004\u00E6\u0004>\u0003\b\0\0\u0004\u00E7\u0004\u00E8\u0003\b\0\0\u0004\u00EA\u0004\u00E9\u0003\b\0\0\u0004\u00EB\u0004-\u0003\b\0\0\u0004\u00EC\u0004M\u0003\b\0\0\u0004\u00ED\u0004#\u0003\u0004\0\0\u0004\u00EE\u0004C\u0003\u0004\0\0\u0004\u00EF\u0004#\u0003\b\0\0\u0004\u00F0\u0004C\u0003\b\0\0\u0004\u00F1\u0004#\u0003\v\0\0\u0004\u00F2\u0004C\u0003\v\0\0\u0004\u00F3\u0004'\u0003\b\0\0\u0004\u00F4\u0004G\u0003\b\0\0\u0004\u00F5\u0004+\u0003\b\0\0\u0004\u00F8\u0004K\u0003\b\0\0\u0004\u00F9\u0006'\u0006S\0\0\u0006\"\u0006'\u0006T\0\0\u0006#\u0006H\u0006T\0\0\u0006$\u0006'\u0006U\0\0\u0006%\u0006J\u0006T\0\0\u0006&\u0006\u00D5\u0006T\0\0\u0006\u00C0\u0006\u00C1\u0006T\0\0\u0006\u00C2\u0006\u00D2\u0006T\0\0\u0006\u00D3\t(\t<\0\0\t)\t0\t<\0\0\t1\t3\t<\0\0\t4\t\u00C7\t\u00BE\0\0\t\u00CB\t\u00C7\t\u00D7\0\0\t\u00CC\vG\vV\0\0\vH\vG\v>\0\0\vK\vG\vW\0\0\vL\v\u0092\v\u00D7\0\0\v\u0094\v\u00C6\v\u00BE\0\0\v\u00CA\v\u00C7\v\u00BE\0\0\v\u00CB\v\u00C6\v\u00D7\0\0\v\u00CC\fF\fV\0\0\fH\f\u00BF\f\u00D5\0\0\f\u00C0\f\u00C6\f\u00D5\0\0\f\u00C7\f\u00C6\f\u00D6\0\0\f\u00C8\f\u00C6\f\u00C2\0\0\f\u00CA\f\u00CA\f\u00D5\0\0\f\u00CB\rF\r>\0\0\rJ\rG\r>\0\0\rK\rF\rW\0\0\rL\r\u00D9\r\u00CA\0\0\r\u00DA\r\u00D9\r\u00CF\0\0\r\u00DC\r\u00DC\r\u00CA\0\0\r\u00DD\r\u00D9\r\u00DF\0\0\r\u00DE\u0010%\u0010.\0\0\u0010&\u001B\u0005\u001B5\0\0\u001B\u0006\u001B\u0007\u001B5\0\0\u001B\b\u001B\t\u001B5\0\0\u001B\n\u001B\v\u001B5\0\0\u001B\f\u001B\r\u001B5\0\0\u001B\u000E\u001B\u0011\u001B5\0\0\u001B\u0012\u001B:\u001B5\0\0\u001B;\u001B<\u001B5\0\0\u001B=\u001B>\u001B5\0\0\u001B@\u001B?\u001B5\0\0\u001BA\u001BB\u001B5\0\0\u001BC\0A\u0003%\0\0\u001E\0\0a\u0003%\0\0\u001E\u0001\0B\u0003\u0007\0\0\u001E\u0002\0b\u0003\u0007\0\0\u001E\u0003\0B\u0003#\0\0\u001E\u0004\0b\u0003#\0\0\u001E\u0005\0B\u00031\0\0\u001E\u0006\0b\u00031\0\0\u001E\u0007\0\u00C7\u0003\u0001\0\0\u001E\b\0\u00E7\u0003\u0001\0\0\u001E\t\0D\u0003\u0007\0\0\u001E\n\0d\u0003\u0007\0\0\u001E\v\0D\u0003#\0\0\u001E\f\0d\u0003#\0\0\u001E\r\0D\u00031\0\0\u001E\u000E\0d\u00031\0\0\u001E\u000F\0D\u0003'\0\0\u001E\u0010\0d\u0003'\0\0\u001E\u0011\0D\u0003-\0\0\u001E\u0012\0d\u0003-\0\0\u001E\u0013\u0001\u0012\u0003\0\0\0\u001E\u0014\u0001\u0013\u0003\0\0\0\u001E\u0015\u0001\u0012\u0003\u0001\0\0\u001E\u0016\u0001\u0013\u0003\u0001\0\0\u001E\u0017\0E\u0003-\0\0\u001E\u0018\0e\u0003-\0\0\u001E\u0019\0E\u00030\0\0\u001E\u001A\0e\u00030\0\0\u001E\u001B\u0002(\u0003\u0006\0\0\u001E\u001C\u0002)\u0003\u0006\0\0\u001E\u001D\0F\u0003\u0007\0\0\u001E\u001E\0f\u0003\u0007\0\0\u001E\u001F\0G\u0003\u0004\0\0\u001E \0g\u0003\u0004\0\0\u001E!\0H\u0003\u0007\0\0\u001E\"\0h\u0003\u0007\0\0\u001E#\0H\u0003#\0\0\u001E$\0h\u0003#\0\0\u001E%\0H\u0003\b\0\0\u001E&\0h\u0003\b\0\0\u001E'\0H\u0003'\0\0\u001E(\0h\u0003'\0\0\u001E)\0H\u0003.\0\0\u001E*\0h\u0003.\0\0\u001E+\0I\u00030\0\0\u001E,\0i\u00030\0\0\u001E-\0\u00CF\u0003\u0001\0\0\u001E.\0\u00EF\u0003\u0001\0\0\u001E/\0K\u0003\u0001\0\0\u001E0\0k\u0003\u0001\0\0\u001E1\0K\u0003#\0\0\u001E2\0k\u0003#\0\0\u001E3\0K\u00031\0\0\u001E4\0k\u00031\0\0\u001E5\0L\u0003#\0\0\u001E6\0l\u0003#\0\0\u001E7\u001E6\u0003\u0004\0\0\u001E8\u001E7\u0003\u0004\0\0\u001E9\0L\u00031\0\0\u001E:\0l\u00031\0\0\u001E;\0L\u0003-\0\0\u001E<\0l\u0003-\0\0\u001E=\0M\u0003\u0001\0\0\u001E>\0m\u0003\u0001\0\0\u001E?\0M\u0003\u0007\0\0\u001E@\0m\u0003\u0007\0\0\u001EA\0M\u0003#\0\0\u001EB\0m\u0003#\0\0\u001EC\0N\u0003\u0007\0\0\u001ED\0n\u0003\u0007\0\0\u001EE\0N\u0003#\0\0\u001EF\0n\u0003#\0\0\u001EG\0N\u00031\0\0\u001EH\0n\u00031\0\0\u001EI\0N\u0003-\0\0\u001EJ\0n\u0003-\0\0\u001EK\0\u00D5\u0003\u0001\0\0\u001EL\0\u00F5\u0003\u0001\0\0\u001EM\0\u00D5\u0003\b\0\0\u001EN\0\u00F5\u0003\b\0\0\u001EO\u0001L\u0003\0\0\0\u001EP\u0001M\u0003\0\0\0\u001EQ\u0001L\u0003\u0001\0\0\u001ER\u0001M\u0003\u0001\0\0\u001ES\0P\u0003\u0001\0\0\u001ET\0p\u0003\u0001\0\0\u001EU\0P\u0003\u0007\0\0\u001EV\0p\u0003\u0007\0\0\u001EW\0R\u0003\u0007\0\0\u001EX\0r\u0003\u0007\0\0\u001EY\0R\u0003#\0\0\u001EZ\0r\u0003#\0\0\u001E[\u001EZ\u0003\u0004\0\0\u001E\\\u001E[\u0003\u0004\0\0\u001E]\0R\u00031\0\0\u001E^\0r\u00031\0\0\u001E_\0S\u0003\u0007\0\0\u001E`\0s\u0003\u0007\0\0\u001Ea\0S\u0003#\0\0\u001Eb\0s\u0003#\0\0\u001Ec\u0001Z\u0003\u0007\0\0\u001Ed\u0001[\u0003\u0007\0\0\u001Ee\u0001`\u0003\u0007\0\0\u001Ef\u0001a\u0003\u0007\0\0\u001Eg\u001Eb\u0003\u0007\0\0\u001Eh\u001Ec\u0003\u0007\0\0\u001Ei\0T\u0003\u0007\0\0\u001Ej\0t\u0003\u0007\0\0\u001Ek\0T\u0003#\0\0\u001El\0t\u0003#\0\0\u001Em\0T\u00031\0\0\u001En\0t\u00031\0\0\u001Eo\0T\u0003-\0\0\u001Ep\0t\u0003-\0\0\u001Eq\0U\u0003$\0\0\u001Er\0u\u0003$\0\0\u001Es\0U\u00030\0\0\u001Et\0u\u00030\0\0\u001Eu\0U\u0003-\0\0\u001Ev\0u\u0003-\0\0\u001Ew\u0001h\u0003\u0001\0\0\u001Ex\u0001i\u0003\u0001\0\0\u001Ey\u0001j\u0003\b\0\0\u001Ez\u0001k\u0003\b\0\0\u001E{\0V\u0003\u0003\0\0\u001E|\0v\u0003\u0003\0\0\u001E}\0V\u0003#\0\0\u001E~\0v\u0003#\0\0\u001E\0W\u0003\0\0\0\u001E\u0080\0w\u0003\0\0\0\u001E\u0081\0W\u0003\u0001\0\0\u001E\u0082\0w\u0003\u0001\0\0\u001E\u0083\0W\u0003\b\0\0\u001E\u0084\0w\u0003\b\0\0\u001E\u0085\0W\u0003\u0007\0\0\u001E\u0086\0w\u0003\u0007\0\0\u001E\u0087\0W\u0003#\0\0\u001E\u0088\0w\u0003#\0\0\u001E\u0089\0X\u0003\u0007\0\0\u001E\u008A\0x\u0003\u0007\0\0\u001E\u008B\0X\u0003\b\0\0\u001E\u008C\0x\u0003\b\0\0\u001E\u008D\0Y\u0003\u0007\0\0\u001E\u008E\0y\u0003\u0007\0\0\u001E\u008F\0Z\u0003\u0002\0\0\u001E\u0090\0z\u0003\u0002\0\0\u001E\u0091\0Z\u0003#\0\0\u001E\u0092\0z\u0003#\0\0\u001E\u0093\0Z\u00031\0\0\u001E\u0094\0z\u00031\0\0\u001E\u0095\0h\u00031\0\0\u001E\u0096\0t\u0003\b\0\0\u001E\u0097\0w\u0003\n\0\0\u001E\u0098\0y\u0003\n\0\0\u001E\u0099\u0001\u0003\u0007\0\0\u001E\u009B\0A\u0003#\0\0\u001E\u00A0\0a\u0003#\0\0\u001E\u00A1\0A\u0003\t\0\0\u001E\u00A2\0a\u0003\t\0\0\u001E\u00A3\0\u00C2\u0003\u0001\0\0\u001E\u00A4\0\u00E2\u0003\u0001\0\0\u001E\u00A5\0\u00C2\u0003\0\0\0\u001E\u00A6\0\u00E2\u0003\0\0\0\u001E\u00A7\0\u00C2\u0003\t\0\0\u001E\u00A8\0\u00E2\u0003\t\0\0\u001E\u00A9\0\u00C2\u0003\u0003\0\0\u001E\u00AA\0\u00E2\u0003\u0003\0\0\u001E\u00AB\u001E\u00A0\u0003\u0002\0\0\u001E\u00AC\u001E\u00A1\u0003\u0002\0\0\u001E\u00AD\u0001\u0002\u0003\u0001\0\0\u001E\u00AE\u0001\u0003\u0003\u0001\0\0\u001E\u00AF\u0001\u0002\u0003\0\0\0\u001E\u00B0\u0001\u0003\u0003\0\0\0\u001E\u00B1\u0001\u0002\u0003\t\0\0\u001E\u00B2\u0001\u0003\u0003\t\0\0\u001E\u00B3\u0001\u0002\u0003\u0003\0\0\u001E\u00B4\u0001\u0003\u0003\u0003\0\0\u001E\u00B5\u001E\u00A0\u0003\u0006\0\0\u001E\u00B6\u001E\u00A1\u0003\u0006\0\0\u001E\u00B7\0E\u0003#\0\0\u001E\u00B8\0e\u0003#\0\0\u001E\u00B9\0E\u0003\t\0\0\u001E\u00BA\0e\u0003\t\0\0\u001E\u00BB\0E\u0003\u0003\0\0\u001E\u00BC\0e\u0003\u0003\0\0\u001E\u00BD\0\u00CA\u0003\u0001\0\0\u001E\u00BE\0\u00EA\u0003\u0001\0\0\u001E\u00BF\0\u00CA\u0003\0\0\0\u001E\u00C0\0\u00EA\u0003\0\0\0\u001E\u00C1\0\u00CA\u0003\t\0\0\u001E\u00C2\0\u00EA\u0003\t\0\0\u001E\u00C3\0\u00CA\u0003\u0003\0\0\u001E\u00C4\0\u00EA\u0003\u0003\0\0\u001E\u00C5\u001E\u00B8\u0003\u0002\0\0\u001E\u00C6\u001E\u00B9\u0003\u0002\0\0\u001E\u00C7\0I\u0003\t\0\0\u001E\u00C8\0i\u0003\t\0\0\u001E\u00C9\0I\u0003#\0\0\u001E\u00CA\0i\u0003#\0\0\u001E\u00CB\0O\u0003#\0\0\u001E\u00CC\0o\u0003#\0\0\u001E\u00CD\0O\u0003\t\0\0\u001E\u00CE\0o\u0003\t\0\0\u001E\u00CF\0\u00D4\u0003\u0001\0\0\u001E\u00D0\0\u00F4\u0003\u0001\0\0\u001E\u00D1\0\u00D4\u0003\0\0\0\u001E\u00D2\0\u00F4\u0003\0\0\0\u001E\u00D3\0\u00D4\u0003\t\0\0\u001E\u00D4\0\u00F4\u0003\t\0\0\u001E\u00D5\0\u00D4\u0003\u0003\0\0\u001E\u00D6\0\u00F4\u0003\u0003\0\0\u001E\u00D7\u001E\u00CC\u0003\u0002\0\0\u001E\u00D8\u001E\u00CD\u0003\u0002\0\0\u001E\u00D9\u0001\u00A0\u0003\u0001\0\0\u001E\u00DA\u0001\u00A1\u0003\u0001\0\0\u001E\u00DB\u0001\u00A0\u0003\0\0\0\u001E\u00DC\u0001\u00A1\u0003\0\0\0\u001E\u00DD\u0001\u00A0\u0003\t\0\0\u001E\u00DE\u0001\u00A1\u0003\t\0\0\u001E\u00DF\u0001\u00A0\u0003\u0003\0\0\u001E\u00E0\u0001\u00A1\u0003\u0003\0\0\u001E\u00E1\u0001\u00A0\u0003#\0\0\u001E\u00E2\u0001\u00A1\u0003#\0\0\u001E\u00E3\0U\u0003#\0\0\u001E\u00E4\0u\u0003#\0\0\u001E\u00E5\0U\u0003\t\0\0\u001E\u00E6\0u\u0003\t\0\0\u001E\u00E7\u0001\u00AF\u0003\u0001\0\0\u001E\u00E8\u0001\u00B0\u0003\u0001\0\0\u001E\u00E9\u0001\u00AF\u0003\0\0\0\u001E\u00EA\u0001\u00B0\u0003\0\0\0\u001E\u00EB\u0001\u00AF\u0003\t\0\0\u001E\u00EC\u0001\u00B0\u0003\t\0\0\u001E\u00ED\u0001\u00AF\u0003\u0003\0\0\u001E\u00EE\u0001\u00B0\u0003\u0003\0\0\u001E\u00EF\u0001\u00AF\u0003#\0\0\u001E\u00F0\u0001\u00B0\u0003#\0\0\u001E\u00F1\0Y\u0003\0\0\0\u001E\u00F2\0y\u0003\0\0\0\u001E\u00F3\0Y\u0003#\0\0\u001E\u00F4\0y\u0003#\0\0\u001E\u00F5\0Y\u0003\t\0\0\u001E\u00F6\0y\u0003\t\0\0\u001E\u00F7\0Y\u0003\u0003\0\0\u001E\u00F8\0y\u0003\u0003\0\0\u001E\u00F9\u0003\u00B1\u0003\u0013\0\0\u001F\0\u0003\u00B1\u0003\u0014\0\0\u001F\u0001\u001F\0\u0003\0\0\0\u001F\u0002\u001F\u0001\u0003\0\0\0\u001F\u0003\u001F\0\u0003\u0001\0\0\u001F\u0004\u001F\u0001\u0003\u0001\0\0\u001F\u0005\u001F\0\u0003B\0\0\u001F\u0006\u001F\u0001\u0003B\0\0\u001F\u0007\u0003\u0091\u0003\u0013\0\0\u001F\b\u0003\u0091\u0003\u0014\0\0\u001F\t\u001F\b\u0003\0\0\0\u001F\n\u001F\t\u0003\0\0\0\u001F\v\u001F\b\u0003\u0001\0\0\u001F\f\u001F\t\u0003\u0001\0\0\u001F\r\u001F\b\u0003B\0\0\u001F\u000E\u001F\t\u0003B\0\0\u001F\u000F\u0003\u00B5\u0003\u0013\0\0\u001F\u0010\u0003\u00B5\u0003\u0014\0\0\u001F\u0011\u001F\u0010\u0003\0\0\0\u001F\u0012\u001F\u0011\u0003\0\0\0\u001F\u0013\u001F\u0010\u0003\u0001\0\0\u001F\u0014\u001F\u0011\u0003\u0001\0\0\u001F\u0015\u0003\u0095\u0003\u0013\0\0\u001F\u0018\u0003\u0095\u0003\u0014\0\0\u001F\u0019\u001F\u0018\u0003\0\0\0\u001F\u001A\u001F\u0019\u0003\0\0\0\u001F\u001B\u001F\u0018\u0003\u0001\0\0\u001F\u001C\u001F\u0019\u0003\u0001\0\0\u001F\u001D\u0003\u00B7\u0003\u0013\0\0\u001F \u0003\u00B7\u0003\u0014\0\0\u001F!\u001F \u0003\0\0\0\u001F\"\u001F!\u0003\0\0\0\u001F#\u001F \u0003\u0001\0\0\u001F$\u001F!\u0003\u0001\0\0\u001F%\u001F \u0003B\0\0\u001F&\u001F!\u0003B\0\0\u001F'\u0003\u0097\u0003\u0013\0\0\u001F(\u0003\u0097\u0003\u0014\0\0\u001F)\u001F(\u0003\0\0\0\u001F*\u001F)\u0003\0\0\0\u001F+\u001F(\u0003\u0001\0\0\u001F,\u001F)\u0003\u0001\0\0\u001F-\u001F(\u0003B\0\0\u001F.\u001F)\u0003B\0\0\u001F/\u0003\u00B9\u0003\u0013\0\0\u001F0\u0003\u00B9\u0003\u0014\0\0\u001F1\u001F0\u0003\0\0\0\u001F2\u001F1\u0003\0\0\0\u001F3\u001F0\u0003\u0001\0\0\u001F4\u001F1\u0003\u0001\0\0\u001F5\u001F0\u0003B\0\0\u001F6\u001F1\u0003B\0\0\u001F7\u0003\u0099\u0003\u0013\0\0\u001F8\u0003\u0099\u0003\u0014\0\0\u001F9\u001F8\u0003\0\0\0\u001F:\u001F9\u0003\0\0\0\u001F;\u001F8\u0003\u0001\0\0\u001F<\u001F9\u0003\u0001\0\0\u001F=\u001F8\u0003B\0\0\u001F>\u001F9\u0003B\0\0\u001F?\u0003\u00BF\u0003\u0013\0\0\u001F@\u0003\u00BF\u0003\u0014\0\0\u001FA\u001F@\u0003\0\0\0\u001FB\u001FA\u0003\0\0\0\u001FC\u001F@\u0003\u0001\0\0\u001FD\u001FA\u0003\u0001\0\0\u001FE\u0003\u009F\u0003\u0013\0\0\u001FH\u0003\u009F\u0003\u0014\0\0\u001FI\u001FH\u0003\0\0\0\u001FJ\u001FI\u0003\0\0\0\u001FK\u001FH\u0003\u0001\0\0\u001FL\u001FI\u0003\u0001\0\0\u001FM\u0003\u00C5\u0003\u0013\0\0\u001FP\u0003\u00C5\u0003\u0014\0\0\u001FQ\u001FP\u0003\0\0\0\u001FR\u001FQ\u0003\0\0\0\u001FS\u001FP\u0003\u0001\0\0\u001FT\u001FQ\u0003\u0001\0\0\u001FU\u001FP\u0003B\0\0\u001FV\u001FQ\u0003B\0\0\u001FW\u0003\u00A5\u0003\u0014\0\0\u001FY\u001FY\u0003\0\0\0\u001F[\u001FY\u0003\u0001\0\0\u001F]\u001FY\u0003B\0\0\u001F_\u0003\u00C9\u0003\u0013\0\0\u001F`\u0003\u00C9\u0003\u0014\0\0\u001Fa\u001F`\u0003\0\0\0\u001Fb\u001Fa\u0003\0\0\0\u001Fc\u001F`\u0003\u0001\0\0\u001Fd\u001Fa\u0003\u0001\0\0\u001Fe\u001F`\u0003B\0\0\u001Ff\u001Fa\u0003B\0\0\u001Fg\u0003\u00A9\u0003\u0013\0\0\u001Fh\u0003\u00A9\u0003\u0014\0\0\u001Fi\u001Fh\u0003\0\0\0\u001Fj\u001Fi\u0003\0\0\0\u001Fk\u001Fh\u0003\u0001\0\0\u001Fl\u001Fi\u0003\u0001\0\0\u001Fm\u001Fh\u0003B\0\0\u001Fn\u001Fi\u0003B\0\0\u001Fo\u0003\u00B1\u0003\0\0\0\u001Fp\u0003\u00B5\u0003\0\0\0\u001Fr\u0003\u00B7\u0003\0\0\0\u001Ft\u0003\u00B9\u0003\0\0\0\u001Fv\u0003\u00BF\u0003\0\0\0\u001Fx\u0003\u00C5\u0003\0\0\0\u001Fz\u0003\u00C9\u0003\0\0\0\u001F|\u001F\0\u0003E\0\0\u001F\u0080\u001F\u0001\u0003E\0\0\u001F\u0081\u001F\u0002\u0003E\0\0\u001F\u0082\u001F\u0003\u0003E\0\0\u001F\u0083\u001F\u0004\u0003E\0\0\u001F\u0084\u001F\u0005\u0003E\0\0\u001F\u0085\u001F\u0006\u0003E\0\0\u001F\u0086\u001F\u0007\u0003E\0\0\u001F\u0087\u001F\b\u0003E\0\0\u001F\u0088\u001F\t\u0003E\0\0\u001F\u0089\u001F\n\u0003E\0\0\u001F\u008A\u001F\v\u0003E\0\0\u001F\u008B\u001F\f\u0003E\0\0\u001F\u008C\u001F\r\u0003E\0\0\u001F\u008D\u001F\u000E\u0003E\0\0\u001F\u008E\u001F\u000F\u0003E\0\0\u001F\u008F\u001F \u0003E\0\0\u001F\u0090\u001F!\u0003E\0\0\u001F\u0091\u001F\"\u0003E\0\0\u001F\u0092\u001F#\u0003E\0\0\u001F\u0093\u001F$\u0003E\0\0\u001F\u0094\u001F%\u0003E\0\0\u001F\u0095\u001F&\u0003E\0\0\u001F\u0096\u001F'\u0003E\0\0\u001F\u0097\u001F(\u0003E\0\0\u001F\u0098\u001F)\u0003E\0\0\u001F\u0099\u001F*\u0003E\0\0\u001F\u009A\u001F+\u0003E\0\0\u001F\u009B\u001F,\u0003E\0\0\u001F\u009C\u001F-\u0003E\0\0\u001F\u009D\u001F.\u0003E\0\0\u001F\u009E\u001F/\u0003E\0\0\u001F\u009F\u001F`\u0003E\0\0\u001F\u00A0\u001Fa\u0003E\0\0\u001F\u00A1\u001Fb\u0003E\0\0\u001F\u00A2\u001Fc\u0003E\0\0\u001F\u00A3\u001Fd\u0003E\0\0\u001F\u00A4\u001Fe\u0003E\0\0\u001F\u00A5\u001Ff\u0003E\0\0\u001F\u00A6\u001Fg\u0003E\0\0\u001F\u00A7\u001Fh\u0003E\0\0\u001F\u00A8\u001Fi\u0003E\0\0\u001F\u00A9\u001Fj\u0003E\0\0\u001F\u00AA\u001Fk\u0003E\0\0\u001F\u00AB\u001Fl\u0003E\0\0\u001F\u00AC\u001Fm\u0003E\0\0\u001F\u00AD\u001Fn\u0003E\0\0\u001F\u00AE\u001Fo\u0003E\0\0\u001F\u00AF\u0003\u00B1\u0003\u0006\0\0\u001F\u00B0\u0003\u00B1\u0003\u0004\0\0\u001F\u00B1\u001Fp\u0003E\0\0\u001F\u00B2\u0003\u00B1\u0003E\0\0\u001F\u00B3\u0003\u00AC\u0003E\0\0\u001F\u00B4\u0003\u00B1\u0003B\0\0\u001F\u00B6\u001F\u00B6\u0003E\0\0\u001F\u00B7\u0003\u0091\u0003\u0006\0\0\u001F\u00B8\u0003\u0091\u0003\u0004\0\0\u001F\u00B9\u0003\u0091\u0003\0\0\0\u001F\u00BA\u0003\u0091\u0003E\0\0\u001F\u00BC\0\u00A8\u0003B\0\0\u001F\u00C1\u001Ft\u0003E\0\0\u001F\u00C2\u0003\u00B7\u0003E\0\0\u001F\u00C3\u0003\u00AE\u0003E\0\0\u001F\u00C4\u0003\u00B7\u0003B\0\0\u001F\u00C6\u001F\u00C6\u0003E\0\0\u001F\u00C7\u0003\u0095\u0003\0\0\0\u001F\u00C8\u0003\u0097\u0003\0\0\0\u001F\u00CA\u0003\u0097\u0003E\0\0\u001F\u00CC\u001F\u00BF\u0003\0\0\0\u001F\u00CD\u001F\u00BF\u0003\u0001\0\0\u001F\u00CE\u001F\u00BF\u0003B\0\0\u001F\u00CF\u0003\u00B9\u0003\u0006\0\0\u001F\u00D0\u0003\u00B9\u0003\u0004\0\0\u001F\u00D1\u0003\u00CA\u0003\0\0\0\u001F\u00D2\u0003\u00B9\u0003B\0\0\u001F\u00D6\u0003\u00CA\u0003B\0\0\u001F\u00D7\u0003\u0099\u0003\u0006\0\0\u001F\u00D8\u0003\u0099\u0003\u0004\0\0\u001F\u00D9\u0003\u0099\u0003\0\0\0\u001F\u00DA\u001F\u00FE\u0003\0\0\0\u001F\u00DD\u001F\u00FE\u0003\u0001\0\0\u001F\u00DE\u001F\u00FE\u0003B\0\0\u001F\u00DF\u0003\u00C5\u0003\u0006\0\0\u001F\u00E0\u0003\u00C5\u0003\u0004\0\0\u001F\u00E1\u0003\u00CB\u0003\0\0\0\u001F\u00E2\u0003\u00C1\u0003\u0013\0\0\u001F\u00E4\u0003\u00C1\u0003\u0014\0\0\u001F\u00E5\u0003\u00C5\u0003B\0\0\u001F\u00E6\u0003\u00CB\u0003B\0\0\u001F\u00E7\u0003\u00A5\u0003\u0006\0\0\u001F\u00E8\u0003\u00A5\u0003\u0004\0\0\u001F\u00E9\u0003\u00A5\u0003\0\0\0\u001F\u00EA\u0003\u00A1\u0003\u0014\0\0\u001F\u00EC\0\u00A8\u0003\0\0\0\u001F\u00ED\u001F|\u0003E\0\0\u001F\u00F2\u0003\u00C9\u0003E\0\0\u001F\u00F3\u0003\u00CE\u0003E\0\0\u001F\u00F4\u0003\u00C9\u0003B\0\0\u001F\u00F6\u001F\u00F6\u0003E\0\0\u001F\u00F7\u0003\u009F\u0003\0\0\0\u001F\u00F8\u0003\u00A9\u0003\0\0\0\u001F\u00FA\u0003\u00A9\u0003E\0\0\u001F\u00FC!\u0090\u00038\0\0!\u009A!\u0092\u00038\0\0!\u009B!\u0094\u00038\0\0!\u00AE!\u00D0\u00038\0\0!\u00CD!\u00D4\u00038\0\0!\u00CE!\u00D2\u00038\0\0!\u00CF\"\u0003\u00038\0\0\"\u0004\"\b\u00038\0\0\"\t\"\v\u00038\0\0\"\f\"#\u00038\0\0\"$\"%\u00038\0\0\"&\"<\u00038\0\0\"A\"C\u00038\0\0\"D\"E\u00038\0\0\"G\"H\u00038\0\0\"I\0=\u00038\0\0\"`\"a\u00038\0\0\"b\"M\u00038\0\0\"m\0<\u00038\0\0\"n\0>\u00038\0\0\"o\"d\u00038\0\0\"p\"e\u00038\0\0\"q\"r\u00038\0\0\"t\"s\u00038\0\0\"u\"v\u00038\0\0\"x\"w\u00038\0\0\"y\"z\u00038\0\0\"\u0080\"{\u00038\0\0\"\u0081\"\u0082\u00038\0\0\"\u0084\"\u0083\u00038\0\0\"\u0085\"\u0086\u00038\0\0\"\u0088\"\u0087\u00038\0\0\"\u0089\"\u00A2\u00038\0\0\"\u00AC\"\u00A8\u00038\0\0\"\u00AD\"\u00A9\u00038\0\0\"\u00AE\"\u00AB\u00038\0\0\"\u00AF\"|\u00038\0\0\"\u00E0\"}\u00038\0\0\"\u00E1\"\u0091\u00038\0\0\"\u00E2\"\u0092\u00038\0\0\"\u00E3\"\u00B2\u00038\0\0\"\u00EA\"\u00B3\u00038\0\0\"\u00EB\"\u00B4\u00038\0\0\"\u00EC\"\u00B5\u00038\0\0\"\u00ED0K0\u0099\0\x000L0M0\u0099\0\x000N0O0\u0099\0\x000P0Q0\u0099\0\x000R0S0\u0099\0\x000T0U0\u0099\0\x000V0W0\u0099\0\x000X0Y0\u0099\0\x000Z0[0\u0099\0\x000\\0]0\u0099\0\x000^0_0\u0099\0\x000`0a0\u0099\0\x000b0d0\u0099\0\x000e0f0\u0099\0\x000g0h0\u0099\0\x000i0o0\u0099\0\x000p0o0\u009A\0\x000q0r0\u0099\0\x000s0r0\u009A\0\x000t0u0\u0099\0\x000v0u0\u009A\0\x000w0x0\u0099\0\x000y0x0\u009A\0\x000z0{0\u0099\0\x000|0{0\u009A\0\x000}0F0\u0099\0\x000\u00940\u009D0\u0099\0\x000\u009E0\u00AB0\u0099\0\x000\u00AC0\u00AD0\u0099\0\x000\u00AE0\u00AF0\u0099\0\x000\u00B00\u00B10\u0099\0\x000\u00B20\u00B30\u0099\0\x000\u00B40\u00B50\u0099\0\x000\u00B60\u00B70\u0099\0\x000\u00B80\u00B90\u0099\0\x000\u00BA0\u00BB0\u0099\0\x000\u00BC0\u00BD0\u0099\0\x000\u00BE0\u00BF0\u0099\0\x000\u00C00\u00C10\u0099\0\x000\u00C20\u00C40\u0099\0\x000\u00C50\u00C60\u0099\0\x000\u00C70\u00C80\u0099\0\x000\u00C90\u00CF0\u0099\0\x000\u00D00\u00CF0\u009A\0\x000\u00D10\u00D20\u0099\0\x000\u00D30\u00D20\u009A\0\x000\u00D40\u00D50\u0099\0\x000\u00D60\u00D50\u009A\0\x000\u00D70\u00D80\u0099\0\x000\u00D90\u00D80\u009A\0\x000\u00DA0\u00DB0\u0099\0\x000\u00DC0\u00DB0\u009A\0\x000\u00DD0\u00A60\u0099\0\x000\u00F40\u00EF0\u0099\0\x000\u00F70\u00F00\u0099\0\x000\u00F80\u00F10\u0099\0\x000\u00F90\u00F20\u0099\0\x000\u00FA0\u00FD0\u0099\0\x000\u00FE\u0010\u0099\u0010\u00BA\0\u0001\u0010\u009A\u0010\u009B\u0010\u00BA\0\u0001\u0010\u009C\u0010\u00A5\u0010\u00BA\0\u0001\u0010\u00AB\u00111\u0011'\0\u0001\u0011.\u00112\u0011'\0\u0001\u0011/\u0013G\u0013>\0\u0001\u0013K\u0013G\u0013W\0\u0001\u0013L\u0014\u00B9\u0014\u00BA\0\u0001\u0014\u00BB\u0014\u00B9\u0014\u00B0\0\u0001\u0014\u00BC\u0014\u00B9\u0014\u00BD\0\u0001\u0014\u00BE\u0015\u00B8\u0015\u00AF\0\u0001\u0015\u00BA\u0015\u00B9\u0015\u00AF\0\u0001\u0015\u00BB\u00195\u00190\0\u0001\u00198";
