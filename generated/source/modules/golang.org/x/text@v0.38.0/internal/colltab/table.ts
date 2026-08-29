import type { Form as Form__from_norm, Properties as Properties__from_norm } from "../../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/package.js";
import type { Elem } from "./collelem.js";
import type { ContractTrieSet } from "./contract.js";
import type { gostring, int, int32, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { NFD$constant as NFD$constant__from_norm, NFKD$constant as NFKD$constant__from_norm } from "../../../../../../packages/golang.org/x/text@v0.38.0/unicode/norm/package.js";
import { RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Elem_ctype, Elem_updateTertiary, ceContractionIndex$constant, ceDecompose$constant, ceExpansionIndex$constant, ceNormal$constant, implicitPrimary, makeImplicitCE, maxTertiary$uint8, splitContractIndex, splitDecompose, splitExpandIndex } from "./collelem.js";
import { ctScanner, ctScannerString } from "./contract.js";
import { Trie } from "./trie.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoArray } from "@gotots/runtime/array.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class Table {
    declare private readonly $goType: void;
    public constructor(public Index: Trie, public ExpandElem: RuntimeSlice<uint32>, public ContractTries: ContractTrieSet, public ContractElem: RuntimeSlice<uint32>, public MaxContractLen: int, public VariableTop: uint32) {
    }
    declare private readonly then?: never;
    static AppendNext(t: Table | undefined, w: RuntimeSlice<Elem>, b: RuntimeSlice<uint8>): [
        RuntimeSlice<Elem>,
        int
    ] {
        let res: RuntimeSlice<Elem> = RuntimeSlice.nil<Elem>();
        let n: int = 0;
        return Table.$go$private$colltab$appendNext(t, w, new source("", b));
    }
    static AppendNextString(t: Table | undefined, w: RuntimeSlice<Elem>, s: gostring): [
        RuntimeSlice<Elem>,
        int
    ] {
        let res: RuntimeSlice<Elem> = RuntimeSlice.nil<Elem>();
        let n: int = 0;
        return Table.$go$private$colltab$appendNext(t, w, new source(s, RuntimeSlice.nil<uint8>()));
    }
    static Domain(t: Table | undefined): RuntimeSlice<gostring> {
        const __gotots_argument_0 = new GoInterfaceAdapter("not implemented");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Start(t: Table | undefined, p: int, b: RuntimeSlice<uint8>): int {
        const __gotots_argument_1 = new GoInterfaceAdapter("not implemented");
        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static StartString(t: Table | undefined, p: int, s: gostring): int {
        const __gotots_argument_2 = new GoInterfaceAdapter("not implemented");
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Top(t: Table | undefined): uint32 {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).VariableTop;
    }
    static $go$private$colltab$appendExpansion(t: Table | undefined, w: RuntimeSlice<Elem>, ce: Elem): RuntimeSlice<Elem> {
        let i = splitExpandIndex(ce);
        let n = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ExpandElem.get(i);
        i++;
        const __gotots_range_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ExpandElem.slice(i, i + n, null);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let ce__shadow_1 = __gotots_range_value_0;
            w = w.append(0, [ce__shadow_1]);
        }
        return w;
    }
    static $go$private$colltab$appendNext(t: Table | undefined, w: RuntimeSlice<Elem>, src: source): [
        RuntimeSlice<Elem>,
        int
    ] {
        let res: RuntimeSlice<Elem> = RuntimeSlice.nil<Elem>();
        let n: int = 0;
        const __gotots_results_0 = source.$go$private$colltab$lookup(src, t);
        let ce = __gotots_results_0[0];
        let sz = __gotots_results_0[1];
        let tp = Elem_ctype(ce);
        if (tp.$value === ceNormal$constant().$value) {
            if (ce === 0) {
                const __gotots_results_1 = source.$go$private$colltab$rune(src);
                let r = __gotots_results_1[0];
                const hangulSize$int: int = 3;
                const firstHangul$int32: int32 = 44032;
                const lastHangul$int32: int32 = 55203;
                if (r >= firstHangul$int32 && r <= lastHangul$int32) {
                    n = sz;
                    let buf = GoArray.zero<uint8, 16>(16, 0);
                    for (let b = source.$go$private$colltab$nfd(src, goArraySlice(buf, 0, 0, null), hangulSize$int); b.length > 0; b = b.slice(sz, null, null)) {
                        const __gotots_store_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_results_2 = Trie.$go$private$colltab$lookup(__gotots_store_0.Index, b);
                        ce = __gotots_results_2[0];
                        sz = __gotots_results_2[1];
                        w = w.append(0, [ce]);
                    }
                    return [w, n];
                }
                ce = makeImplicitCE(implicitPrimary(r));
            }
            w = w.append(0, [ce]);
        }
        else if (tp.$value === ceExpansionIndex$constant().$value) {
            w = Table.$go$private$colltab$appendExpansion(t, w, ce);
        }
        else if (tp.$value === ceContractionIndex$constant().$value) {
            let n__shadow_1 = 0;
            source.$go$private$colltab$tail(src, sz);
            if (src.bytes.isNil()) {
                const __gotots_results_3 = Table.$go$private$colltab$matchContractionString(t, w, ce, src.str);
                w = __gotots_results_3[0];
                n__shadow_1 = __gotots_results_3[1];
            }
            else {
                const __gotots_results_4 = Table.$go$private$colltab$matchContraction(t, w, ce, src.bytes);
                w = __gotots_results_4[0];
                n__shadow_1 = __gotots_results_4[1];
            }
            sz += n__shadow_1;
        }
        else if (tp.$value === ceDecompose$constant().$value) {
            const __gotots_results_5 = splitDecompose(ce);
            let t1__shadow_1 = __gotots_results_5[0];
            let t2__shadow_1 = __gotots_results_5[1];
            let i = w.length;
            let nfkd = source.$go$private$colltab$properties(src, NFKD$constant__from_norm()).Decomposition();
            for (let p = 0; nfkd.length > 0; nfkd = nfkd.slice(p, null, null)) {
                const __gotots_results_6 = Table.$go$private$colltab$appendNext(t, w, new source("", nfkd));
                w = __gotots_results_6[0];
                p = __gotots_results_6[1];
            }
            w.set(i, Elem_updateTertiary(w.get(i), t1__shadow_1));
            {
                i++;
                if (i < w.length) {
                    w.set(i, Elem_updateTertiary(w.get(i), t2__shadow_1));
                    for (i++; i < w.length; i++) {
                        w.set(i, Elem_updateTertiary(w.get(i), maxTertiary$uint8));
                    }
                }
            }
        }
        return [w, sz];
    }
    static $go$private$colltab$matchContraction(t: Table | undefined, w: RuntimeSlice<Elem>, ce: Elem, suffix: RuntimeSlice<uint8>): [
        RuntimeSlice<Elem>,
        int
    ] {
        const __gotots_results_12 = splitContractIndex(ce);
        let index = __gotots_results_12[0];
        let n = __gotots_results_12[1];
        let offset = __gotots_results_12[2];
        let scan = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ContractTries.$go$private$colltab$scanner(index, n, suffix);
        let buf = GoArray.literal<uint8, 128>(128, 0, [], []);
        let bufp = 0;
        let p = ctScanner.$go$private$colltab$scan(scan, 0);
        if (!scan.done && p < suffix.length && suffix.get(p) >= RuneSelf$uint8__from_utf8) {
            let p0 = p;
            let bufn = 0;
            let rune = NFD$constant__from_norm().Properties(suffix.slice(p, null, null));
            p += rune.Size();
            if (rune.LeadCCC() !== 0) {
                let prevCC = rune.TrailCCC();
                {
                    let end = NFD$constant__from_norm().FirstBoundary(suffix.slice(p, null, null));
                    if (end !== -1) {
                        scan.s = suffix.slice(0, p + end, null);
                    }
                }
                for (; p < suffix.length && !scan.done && suffix.get(p) >= RuneSelf$uint8__from_utf8;) {
                    rune = NFD$constant__from_norm().Properties(suffix.slice(p, null, null));
                    {
                        let ccc = rune.LeadCCC();
                        if (ccc === 0 || prevCC >= ccc) {
                            break;
                        }
                    }
                    prevCC = rune.TrailCCC();
                    {
                        let pp = ctScanner.$go$private$colltab$scan(scan, p);
                        if (pp !== p) {
                            bufn += RuntimeSlice.copy<uint8>(goArraySlice(buf, bufn, null, null), suffix.slice(p0, p, null));
                            if (scan.pindex === pp) {
                                bufp = bufn;
                            }
                            const __gotots_assign_4 = pp;
                            const __gotots_assign_5 = pp;
                            p = __gotots_assign_4;
                            p0 = __gotots_assign_5;
                        }
                        else {
                            p += rune.Size();
                        }
                    }
                }
            }
        }
        const __gotots_results_13 = ctScanner.$go$private$colltab$result(scan);
        let i = __gotots_results_13[0];
        n = __gotots_results_13[1];
        ce = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ContractElem.get(i + offset);
        if (Elem_ctype(ce).$value === ceNormal$constant().$value) {
            w = w.append(0, [ce]);
        }
        else {
            w = Table.$go$private$colltab$appendExpansion(t, w, ce);
        }
        {
            const __gotots_assign_6 = goArraySlice(buf, 0, bufp, null);
            const __gotots_assign_7 = 0;
            let b = __gotots_assign_6;
            let p__shadow_1 = __gotots_assign_7;
            for (; b.length > 0; b = b.slice(p__shadow_1, null, null)) {
                const __gotots_results_14 = Table.$go$private$colltab$appendNext(t, w, new source("", b));
                w = __gotots_results_14[0];
                p__shadow_1 = __gotots_results_14[1];
            }
        }
        return [w, n];
    }
    static $go$private$colltab$matchContractionString(t: Table | undefined, w: RuntimeSlice<Elem>, ce: Elem, suffix: gostring): [
        RuntimeSlice<Elem>,
        int
    ] {
        const __gotots_results_9 = splitContractIndex(ce);
        let index = __gotots_results_9[0];
        let n = __gotots_results_9[1];
        let offset = __gotots_results_9[2];
        let scan = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ContractTries.$go$private$colltab$scannerString(index, n, suffix);
        let buf = GoArray.literal<uint8, 128>(128, 0, [], []);
        let bufp = 0;
        let p = ctScannerString.$go$private$colltab$scan(scan, 0);
        if (!scan.done && p < suffix.length && goStringIndex(suffix, p) >= RuneSelf$uint8__from_utf8) {
            let p0 = p;
            let bufn = 0;
            let rune = NFD$constant__from_norm().PropertiesString(goStringSlice(suffix, p));
            p += rune.Size();
            if (rune.LeadCCC() !== 0) {
                let prevCC = rune.TrailCCC();
                {
                    let end = NFD$constant__from_norm().FirstBoundaryInString(goStringSlice(suffix, p));
                    if (end !== -1) {
                        scan.s = goStringSlice(suffix, 0, p + end);
                    }
                }
                for (; p < suffix.length && !scan.done && goStringIndex(suffix, p) >= RuneSelf$uint8__from_utf8;) {
                    rune = NFD$constant__from_norm().PropertiesString(goStringSlice(suffix, p));
                    {
                        let ccc = rune.LeadCCC();
                        if (ccc === 0 || prevCC >= ccc) {
                            break;
                        }
                    }
                    prevCC = rune.TrailCCC();
                    {
                        let pp = ctScannerString.$go$private$colltab$scan(scan, p);
                        if (pp !== p) {
                            const __gotots_slice_build_0 = goArraySlice(buf, bufn, null, null);
                            const __gotots_slice_build_1 = goStringSlice(suffix, p0, p);
                            const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
                            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2; __gotots_slice_build_3++) {
                                __gotots_slice_build_0.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
                            }
                            bufn = bufn + __gotots_slice_build_2;
                            if (scan.pindex === pp) {
                                bufp = bufn;
                            }
                            const __gotots_assign_0 = pp;
                            const __gotots_assign_1 = pp;
                            p = __gotots_assign_0;
                            p0 = __gotots_assign_1;
                        }
                        else {
                            p += rune.Size();
                        }
                    }
                }
            }
        }
        const __gotots_results_10 = ctScannerString.$go$private$colltab$result(scan);
        let i = __gotots_results_10[0];
        n = __gotots_results_10[1];
        ce = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ContractElem.get(i + offset);
        if (Elem_ctype(ce).$value === ceNormal$constant().$value) {
            w = w.append(0, [ce]);
        }
        else {
            w = Table.$go$private$colltab$appendExpansion(t, w, ce);
        }
        {
            const __gotots_assign_2 = goArraySlice(buf, 0, bufp, null);
            const __gotots_assign_3 = 0;
            let b = __gotots_assign_2;
            let p__shadow_1 = __gotots_assign_3;
            for (; b.length > 0; b = b.slice(p__shadow_1, null, null)) {
                const __gotots_results_11 = Table.$go$private$colltab$appendNext(t, w, new source("", b));
                w = __gotots_results_11[0];
                p__shadow_1 = __gotots_results_11[1];
            }
        }
        return [w, n];
    }
}
export class source {
    declare private readonly $goType: void;
    public constructor(public str: gostring, public bytes: RuntimeSlice<uint8>) {
    }
    declare private readonly then?: never;
    static $go$private$colltab$lookup(src: source | undefined, t: Table | undefined): [
        Elem,
        int
    ] {
        let ce: Elem = 0;
        let sz: int = 0;
        if ((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.isNil()) {
            const __gotots_store_1 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            return Trie.$go$private$colltab$lookupString(__gotots_store_1.Index, (src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str);
        }
        const __gotots_store_2 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return Trie.$go$private$colltab$lookup(__gotots_store_2.Index, (src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes);
    }
    static $go$private$colltab$nfd(src: source | undefined, buf: RuntimeSlice<uint8>, end: int): RuntimeSlice<uint8> {
        if ((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.isNil()) {
            return NFD$constant__from_norm().AppendString(buf.slice(0, 0, null), goStringSlice((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str, 0, end));
        }
        return NFD$constant__from_norm().Append(buf.slice(0, 0, null), (src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.slice(0, end, null));
    }
    static $go$private$colltab$properties(src: source | undefined, f: Form__from_norm): Properties__from_norm {
        if ((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.isNil()) {
            return f.PropertiesString((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str);
        }
        return f.Properties((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes);
    }
    static $go$private$colltab$rune(src: source | undefined): [
        int32,
        int
    ] {
        let r: int32 = 0;
        let sz: int = 0;
        if ((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.isNil()) {
            const __gotots_results_7 = utf8__from_gostdlib.DecodeRuneInString((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str);
            return [__gotots_results_7[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_7[1]))] satisfies [
                int32,
                int
            ];
        }
        const __gotots_results_8 = utf8__from_gostdlib.DecodeRune((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes);
        return [__gotots_results_8[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_8[1]))] satisfies [
            int32,
            int
        ];
    }
    static $go$private$colltab$tail(src: source | undefined, sz: int): void {
        if ((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.isNil()) {
            (src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str = goStringSlice((src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).str, sz);
        }
        else {
            (src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes = (src ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bytes.slice(sz, null, null);
        }
    }
}
