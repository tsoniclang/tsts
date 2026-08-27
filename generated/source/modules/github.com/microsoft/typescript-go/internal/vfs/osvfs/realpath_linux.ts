import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/osvfs/state.js";
import { Close as Close__from_unix, Open as Open__from_unix, Readlink as Readlink__from_unix } from "../../../../../../../packages/golang.org/x/sys@v0.46.0/unix/package.js";
import { ignoringEINTR$int } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/vfs/osvfs/ignoringEINTR.js";
import { $goInterfaceAdapter$PointerTo_Named_fs$PathError as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { $goProviderState$Named_fs$PathError as GoProviderState } from "../../../../../../../support/provider-stateful-representations.js";
import * as filepath__from_gostdlib from "@gotots/gostdlib/path/filepath.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice } from "@gotots/runtime/slice.js";
export const _procSelfFD$string: gostring = "/proc/self/fd/";
export function realpath(path: gostring): [
    gostring,
    GoInterface | undefined
] {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: [
        gostring,
        GoInterface | undefined
    ] = ["", void 0];
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_callee_0 = $state.hasProcSelfFD;
                if (!(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))()) {
                    const __gotots_results_0 = filepath__from_gostdlib.EvalSymlinks(path);
                    __gotots_return_0 = [__gotots_results_0[0], GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
                        gostring,
                        GoInterface | undefined
                    ];
                    break __gotots_return_block_0;
                }
                const __gotots_results_1 = ignoringEINTR$int((): [
                    int,
                    GoInterface | undefined
                ] => {
                    return Open__from_unix(path, 2621440, 0);
                });
                let fd = __gotots_results_1[0];
                let err: GoInterface | undefined = __gotots_results_1[1];
                if (!(err === undefined)) {
                    __gotots_return_0 = ["", new GoInterfaceAdapter(tsonicTypeScriptRuntime.location<GoProviderState>(new GoProviderState("open", path, GoProviderInterfaceBridge.$to(err))))];
                    break __gotots_return_block_0;
                }
                const __gotots_argument_0 = fd;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    Close__from_unix(__gotots_argument_0);
                };
                let procBuf = GoArray.zero<uint8, 34>(34, 0);
                const __gotots_slice_build_0 = goArraySlice(procBuf, 0, null, null);
                const __gotots_slice_build_1 = _procSelfFD$string;
                const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2; __gotots_slice_build_3++) {
                    __gotots_slice_build_0.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
                }
                let n = __gotots_slice_build_2;
                const __gotots_slice_build_4 = goArraySlice(procBuf, n, null, null);
                const __gotots_slice_build_5 = strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(fd)));
                const __gotots_slice_build_6 = globalThis.Math.min(__gotots_slice_build_4.length, __gotots_slice_build_5.length);
                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_6; __gotots_slice_build_7++) {
                    __gotots_slice_build_4.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
                }
                n = n + __gotots_slice_build_6;
                const __gotots_conversion_0 = goArraySlice(procBuf, 0, n, null);
                let __gotots_conversion_1 = "";
                for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                    __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                }
                let procPath = __gotots_conversion_1;
                let buf = RuntimeSlice.make<uint8>(256, null, 0);
                for (;;) {
                    const __gotots_results_2 = ignoringEINTR$int((): [
                        int,
                        GoInterface | undefined
                    ] => {
                        return Readlink__from_unix(procPath, buf);
                    });
                    let nn = __gotots_results_2[0];
                    let err__shadow_1: GoInterface | undefined = __gotots_results_2[1];
                    if (!(err__shadow_1 === undefined)) {
                        __gotots_return_0 = ["", new GoInterfaceAdapter(tsonicTypeScriptRuntime.location<GoProviderState>(new GoProviderState("readlink", path, GoProviderInterfaceBridge.$to(err__shadow_1))))];
                        break __gotots_return_block_0;
                    }
                    if (nn < buf.length) {
                        const __gotots_conversion_3 = buf.slice(0, nn, null);
                        let __gotots_conversion_4 = "";
                        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
                        }
                        const __gotots_results_3 = __gotots_conversion_4;
                        const __gotots_results_4 = void 0;
                        __gotots_return_0 = [__gotots_results_3, __gotots_results_4];
                        break __gotots_return_block_0;
                    }
                    buf = RuntimeSlice.make<uint8>(buf.length * 2, null, 0);
                }
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
    return __gotots_return_0;
}
