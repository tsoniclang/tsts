import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { Key } from "./diagnostics.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { UnmarshalRead as UnmarshalRead__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { $goInterfaceAdapter$PointerTo_MapOf_Named_diagnostics$Key_To_string, $goInterfaceAdapter$PointerTo_Named_gzip$Reader, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_strings$Reader as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Error_void_to_string$contract as GoInterface$contract, $goInterface$Interface_Method_Error_void_to_string$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goMap$MapOf_Named_diagnostics$Key_To_string as GoMap } from "../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct, $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $goProviderState$Named_gzip$Reader as GoProviderState } from "../../../../../../support/provider-stateful-representations.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as provider_compress_gzip_direct from "@gotots/gostdlib/internal/facets/provider-compress-gzip-direct.js";
import * as io from "@gotots/gostdlib/io.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function loadLocaleData(data: gostring): GoMapValue<Key, gostring> {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: GoMapValue<Key, gostring> = GoMap.nil();
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_conversion_0 = strings__from_gostdlib.NewReader(data);
                const __gotots_argument_0 = new GoInterfaceAdapter(__gotots_conversion_0 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<strings__from_gostdlib.Reader>(__gotots_conversion_0, (): strings__from_gostdlib.Reader => {
                        return __gotots_conversion_0;
                    }, ($go$providerPointerValue: strings__from_gostdlib.Reader): void => {
                        named_strings.StringsReaderOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                    }));
                const __gotots_results_0 = provider_compress_gzip_direct.GzipNewReaderDirect<$goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io.state.EOF)), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io.state.ErrUnexpectedEOF)), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io.state.ErrNoProgress)), GoInterface$contract);
                const __gotots_conversion_1 = __gotots_results_0[0];
                const __gotots_results_1 = [__gotots_conversion_1 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<GoProviderState>(__gotots_conversion_1, (): GoProviderState => {
                            return __gotots_conversion_1;
                        }, ($go$providerPointerValue: GoProviderState): void => {
                            GoProviderState.$assign(__gotots_conversion_1, $go$providerPointerValue);
                        }), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_0[1])] satisfies [
                    tsonicTypeScriptRuntime.Location<GoProviderState> | undefined,
                    GoInterface | undefined
                ];
                let gr: tsonicTypeScriptRuntime.Location<GoProviderState> | undefined = __gotots_results_1[0];
                let err: GoInterface | undefined = __gotots_results_1[1];
                if (!(err === undefined)) {
                    const __gotots_binary_operand_0 = "failed to create gzip reader: ";
                    const __gotots_receiver_0 = err;
                    const __gotots_binary_operand_1 = goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Error();
                    const __gotots_argument_1 = new $goInterfaceAdapter$string(__gotots_binary_operand_0 + __gotots_binary_operand_1);
                    GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                }
                const __gotots_receiver_1 = gr;
                const __gotots_receiver_2 = __gotots_receiver_1 === void 0 ? void 0 :
                    (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<GoProviderState>).value;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    GoProviderState.Close(__gotots_receiver_2, $go$recovery);
                };
                let result: GoMapValue<Key, gostring> = GoMap.nil();
                const result$location = tsonicTypeScriptRuntime.boundLocation({}, () => result, result$next => result = result$next);
                {
                    let err__shadow_1: GoInterface | undefined = UnmarshalRead__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_gzip$Reader(gr), new $goInterfaceAdapter$PointerTo_MapOf_Named_diagnostics$Key_To_string(result$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined)) {
                        const __gotots_binary_operand_2 = "failed to unmarshal locale data: ";
                        const __gotots_receiver_3 = err__shadow_1;
                        const __gotots_binary_operand_3 = goInterfaceNonNil<GoInterface>(__gotots_receiver_3).Error();
                        const __gotots_argument_2 = new $goInterfaceAdapter$string(__gotots_binary_operand_2 + __gotots_binary_operand_3);
                        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
                    }
                }
                __gotots_return_0 = result;
                break __gotots_return_block_0;
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
