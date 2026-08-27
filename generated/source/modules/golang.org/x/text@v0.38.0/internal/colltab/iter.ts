import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Elem } from "./collelem.js";
import type { Weighter } from "./weighter.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import { Elem_CCC } from "./collelem.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type Iter$Storage = {
    Weighter: Weighter | undefined;
    Elems: RuntimeSlice<Elem>;
    N: int;
    bytes: RuntimeSlice<uint8>;
    str: gostring;
    pEnd: int;
    pNext: int;
};
export class Iter {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Iter$Storage) {
    }
    public static $storageOf($source: Iter): Iter$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Iter$Storage): Iter {
        return new Iter($source);
    }
    public get Weighter(): Weighter | undefined {
        return this.$storage.Weighter;
    }
    public set Weighter($value: Weighter | undefined) {
        this.$storage.Weighter = $value;
    }
    public get Elems(): RuntimeSlice<Elem> {
        return this.$storage.Elems;
    }
    public set Elems($value: RuntimeSlice<Elem>) {
        this.$storage.Elems = $value;
    }
    public get N(): int {
        return this.$storage.N;
    }
    public set N($value: int) {
        this.$storage.N = $value;
    }
    public get bytes(): RuntimeSlice<uint8> {
        return this.$storage.bytes;
    }
    public set bytes($value: RuntimeSlice<uint8>) {
        this.$storage.bytes = $value;
    }
    public get str(): gostring {
        return this.$storage.str;
    }
    public set str($value: gostring) {
        this.$storage.str = $value;
    }
    public get pEnd(): int {
        return this.$storage.pEnd;
    }
    public set pEnd($value: int) {
        this.$storage.pEnd = $value;
    }
    public get pNext(): int {
        return this.$storage.pNext;
    }
    public set pNext($value: int) {
        this.$storage.pNext = $value;
    }
    static $zero(): Iter {
        return new Iter({
            Weighter: void 0,
            Elems: RuntimeSlice.nil<Elem>(),
            N: 0,
            bytes: RuntimeSlice.nil<uint8>(),
            str: "",
            pEnd: 0,
            pNext: 0
        });
    }
    declare private readonly then?: never;
    static Next(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): bool {
        if (Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N === Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length && !Iter.$go$private$colltab$appendNext(i)) {
            return false;
        }
        let prevCCC = Elem_CCC(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.get(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length - 1));
        if (prevCCC === 0) {
            Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length;
            Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pEnd = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pNext;
            return true;
        }
        else if (Elem_CCC(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.get(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N)) === 0) {
            {
                const __gotots_store_0 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value);
                __gotots_store_0.N = __gotots_store_0.N + 1;
                let __gotots_for_first_0 = true;
                for (;;) {
                    if (__gotots_for_first_0) {
                        __gotots_for_first_0 = false;
                    }
                    else {
                        const __gotots_store_1 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value);
                        __gotots_store_1.N = __gotots_store_1.N + 1;
                    }
                    if (!(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N < Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length && Elem_CCC(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.get(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N)) === 0)) {
                        break;
                    }
                    {
                    }
                }
            }
            Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pEnd = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pNext;
            return true;
        }
        for (;;) {
            let p = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length;
            Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pEnd = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pNext;
            if (!Iter.$go$private$colltab$appendNext(i)) {
                break;
            }
            {
                let ccc = Elem_CCC(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.get(p));
                if (ccc === 0 || Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length - Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N > maxCombiningCharacters$int) {
                    Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N = p;
                    return true;
                }
                else if (ccc < prevCCC) {
                    Iter.$go$private$colltab$doNorm(i, p, ccc);
                }
                else {
                    prevCCC = ccc;
                }
            }
        }
        let done = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length !== Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N;
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length;
        return done;
    }
    static Reset(i: tsonicTypeScriptRuntime.Location<Iter> | undefined, p: int): void {
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.slice(0, 0, null);
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N = 0;
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pEnd = p;
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pNext = p;
    }
    static SetInputString(i: tsonicTypeScriptRuntime.Location<Iter> | undefined, s: gostring): void {
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).str = s;
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).bytes = RuntimeSlice.nil<uint8>();
        Iter.Reset(i, 0);
    }
    static $go$private$colltab$appendNext(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): bool {
        if (Iter.$go$private$colltab$done(i)) {
            return false;
        }
        let sz = 0;
        if (Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).bytes.isNil()) {
            const __gotots_store_2 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value);
            const __gotots_receiver_0 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Weighter;
            const __gotots_argument_0 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems;
            const __gotots_argument_1 = goStringSlice(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).str, Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pNext);
            const __gotots_results_0 = goInterfaceNonNil<Weighter>(__gotots_receiver_0).AppendNextString(__gotots_argument_0, __gotots_argument_1);
            __gotots_store_2.Elems = __gotots_results_0[0];
            sz = __gotots_results_0[1];
        }
        else {
            const __gotots_store_3 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value);
            const __gotots_receiver_1 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Weighter;
            const __gotots_argument_2 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems;
            const __gotots_argument_3 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).bytes.slice(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pNext, null, null);
            const __gotots_results_1 = goInterfaceNonNil<Weighter>(__gotots_receiver_1).AppendNext(__gotots_argument_2, __gotots_argument_3);
            __gotots_store_3.Elems = __gotots_results_1[0];
            sz = __gotots_results_1[1];
        }
        if (sz === 0) {
            sz = 1;
        }
        const __gotots_store_4 = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value);
        __gotots_store_4.pNext = __gotots_store_4.pNext + sz;
        return true;
    }
    static $go$private$colltab$doNorm(i: tsonicTypeScriptRuntime.Location<Iter> | undefined, p: int, ccc: uint8): void {
        let n = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.length;
        let k = p;
        for (p--; p > Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).N && ccc < Elem_CCC(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.get(p - 1)); p--) {
        }
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems = goSliceAppendSlice<Elem>(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems, Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.slice(p, k, null), 0);
        RuntimeSlice.copy<Elem>(Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.slice(p, null, null), Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.slice(k, null, null));
        Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems = Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).Elems.slice(0, n, null);
    }
    static $go$private$colltab$done(i: tsonicTypeScriptRuntime.Location<Iter> | undefined): bool {
        return Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pNext >= Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).str.length && Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).pNext >= Iter.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Iter>).value).bytes.length;
    }
}
export const maxCombiningCharacters$int: int = 30;
