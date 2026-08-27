import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { gostring, int, int32, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/state.js";
import { RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { hangulUTF8Size$int, isHangul, isHangulString } from "./composition.js";
import { nfcTrie, nfkcTrie } from "./tables15.0.0.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class input {
    declare private readonly $goType: void;
    public constructor(public str: gostring, public bytes: RuntimeSlice<uint8>) {
    }
    static $zero(): input {
        return new input("", RuntimeSlice.nil<uint8>());
    }
    static $copy($source: input): input {
        return new input($source.str, $source.bytes);
    }
    declare private readonly then?: never;
    static $go$private$norm$_u5f_byte(__go_in: tsonicTypeScriptRuntime.Location<input> | undefined, p: int): uint8 {
        if (((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.isNil()) {
            return goStringIndex(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.str, p);
        }
        return ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.get(p);
    }
    static $go$private$norm$appendSlice(__go_in: tsonicTypeScriptRuntime.Location<input> | undefined, buf: RuntimeSlice<uint8>, b: int, e: int): RuntimeSlice<uint8> {
        if (!((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.isNil()) {
            return goSliceAppendSlice<uint8>(buf, ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.slice(b, e, null), 0);
        }
        for (let i = b; i < e; i++) {
            buf = buf.append(0, [goStringIndex(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.str, i)]);
        }
        return buf;
    }
    static $go$private$norm$charinfoNFC(__go_in: input | undefined, p: int): [
        uint16,
        int
    ] {
        if ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.isNil()) {
            return nfcTrie.$go$private$norm$lookupString($state.nfcData, goStringSlice((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str, p));
        }
        return nfcTrie.$go$private$norm$lookup($state.nfcData, (__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.slice(p, null, null));
    }
    static $go$private$norm$charinfoNFKC(__go_in: input | undefined, p: int): [
        uint16,
        int
    ] {
        if ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.isNil()) {
            return nfkcTrie.$go$private$norm$lookupString($state.nfkcData, goStringSlice((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str, p));
        }
        return nfkcTrie.$go$private$norm$lookup($state.nfkcData, (__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.slice(p, null, null));
    }
    static $go$private$norm$copySlice(__go_in: tsonicTypeScriptRuntime.Location<input> | undefined, buf: RuntimeSlice<uint8>, b: int, e: int): int {
        if (((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.isNil()) {
            const __gotots_slice_build_0 = buf;
            const __gotots_slice_build_1 = goStringSlice(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.str, b, e);
            const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2; __gotots_slice_build_3++) {
                __gotots_slice_build_0.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
            }
            return __gotots_slice_build_2;
        }
        return RuntimeSlice.copy<uint8>(buf, ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.slice(b, e, null));
    }
    static $go$private$norm$hangul(__go_in: tsonicTypeScriptRuntime.Location<input> | undefined, p: int): int32 {
        let r: int32 = 0;
        let size = 0;
        if (((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.isNil()) {
            if (!isHangulString(goStringSlice(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.str, p))) {
                return 0;
            }
            const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.str, p));
            const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
                int32,
                int
            ];
            r = __gotots_results_1[0];
            size = __gotots_results_1[1];
        }
        else {
            if (!isHangul(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.slice(p, null, null))) {
                return 0;
            }
            const __gotots_results_2 = utf8__from_gostdlib.DecodeRune(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.slice(p, null, null));
            const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
                int32,
                int
            ];
            r = __gotots_results_3[0];
            size = __gotots_results_3[1];
        }
        if (size !== hangulUTF8Size$int) {
            return 0;
        }
        return r;
    }
    static $go$private$norm$setBytes(__go_in: tsonicTypeScriptRuntime.Location<input> | undefined, str: RuntimeSlice<uint8>): void {
        ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.str = "";
        ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes = str;
    }
    static $go$private$norm$skipASCII(__go_in: input | undefined, p: int, max: int): int {
        if ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.isNil()) {
            for (; p < max && goStringIndex((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str, p) < RuneSelf$uint8__from_utf8; p++) {
            }
        }
        else {
            for (; p < max && (__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.get(p) < RuneSelf$uint8__from_utf8; p++) {
            }
        }
        return p;
    }
    static $go$private$norm$skipContinuationBytes(__go_in: tsonicTypeScriptRuntime.Location<input> | undefined, p: int): int {
        if (((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.isNil()) {
            for (; p < ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.str.length && !utf8__from_gostdlib.RuneStart(goStringIndex(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.str, p)); p++) {
            }
        }
        else {
            for (; p < ((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.length && !utf8__from_gostdlib.RuneStart(((__go_in ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<input>).value.bytes.get(p)); p++) {
            }
        }
        return p;
    }
}
export function inputBytes(str: RuntimeSlice<uint8>): input {
    return new input("", str);
}
export function inputString(str: gostring): input {
    return new input(str, RuntimeSlice.nil<uint8>());
}
