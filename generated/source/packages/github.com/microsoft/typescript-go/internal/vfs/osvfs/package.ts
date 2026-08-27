import type { $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { limitedWalkDirFunc, osFS, swapCase } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/osvfs/os.js";
import { _procSelfFD$string } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/osvfs/realpath_linux.js";
import { $goInterfaceAdapter$PointerTo_Named_osvfs$limitedWalkDirFunc, $goInterfaceAdapter$PointerTo_Named_osvfs$osFS, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../../../support/interface-contracts.js";
import { $goProviderInterfaceBridge$Named_fs$FS, $goProviderInterfaceBridge$Named_fs$FileInfo, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { Stat as Stat__from_unix, Stat_t as Stat_t__from_unix } from "../../../../../../golang.org/x/sys@v0.46.0/unix/package.js";
import { NewLimitedSemaphore as NewLimitedSemaphore__from_core } from "../../core/package.js";
import { Common as Common__from_internal__package_1 } from "../internal/package.js";
import { $state } from "./state.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_os_error from "@gotots/gostdlib/internal/facets/provider-os-error.js";
import * as fs__from_gostdlib from "@gotots/gostdlib/io/fs.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.blockingOpSema = void 0;
    $state.hasProcSelfFD = void 0;
    $state.isFileSystemCaseSensitive = false;
    $state.isReparsePoint = void 0;
    $state.limitedWalkDirFuncPool = named_sync.SyncPoolOperations.$zero();
    $state.osVFS = void 0;
    $state.readSema = void 0;
    $state.writeSema = void 0;
    {
        $state.blockingOpSema = NewLimitedSemaphore__from_core(128);
    }
    {
        $state.readSema = NewLimitedSemaphore__from_core(128);
    }
    {
        $state.writeSema = NewLimitedSemaphore__from_core(32);
    }
    {
        $state.isFileSystemCaseSensitive = ((): bool => {
            if (false) {
                return false;
            }
            if (false) {
                return true;
            }
            const __gotots_results_0 = os__from_gostdlib.Executable();
            const __gotots_results_1 = [__gotots_results_0[0], GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
                gostring,
                GoInterface | undefined
            ];
            let exe = __gotots_results_1[0];
            let err: GoInterface | undefined = __gotots_results_1[1];
            if (!(err === undefined)) {
                const __gotots_argument_0 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("vfs: failed to get executable path: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            }
            let swapped = swapCase(exe);
            {
                const __gotots_results_2 = os__from_gostdlib.Stat(swapped);
                const __gotots_results_3 = [$goProviderInterfaceBridge$Named_fs$FileInfo.$from(__gotots_results_2[0]), GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                    $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
                    GoInterface | undefined
                ];
                let err__shadow_1: GoInterface | undefined = __gotots_results_3[1];
                if (!(err__shadow_1 === undefined)) {
                    const __gotots_argument_1 = err__shadow_1;
                    if (provider_os_error.OsIsNotExistDirect(__gotots_argument_1, GoProviderInterfaceBridge.$to(GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.ErrNotExist)), GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                        return true;
                    }
                    const __gotots_argument_2 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("vfs: failed to stat %q: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(swapped), err__shadow_1])));
                    GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
                }
            }
            return false;
        })();
    }
    {
        const __gotots_field_0 = (): $goInterface$Interface_void | undefined => {
            let w: {
                value: limitedWalkDirFunc;
            } | undefined = { value: new limitedWalkDirFunc(void 0, void 0) };
            const __gotots_receiver_0 = w;
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.walk = ($argument0: gostring, $argument1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $argument2: GoInterface | undefined): GoInterface | undefined => {
                return limitedWalkDirFunc.$go$private$osvfs$walker(__gotots_receiver_0, $argument0, $argument1, $argument2);
            };
            return new $goInterfaceAdapter$PointerTo_Named_osvfs$limitedWalkDirFunc(w);
        };
        const __gotots_struct_0 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_0.New = __gotots_field_0;
        $state.limitedWalkDirFuncPool = __gotots_struct_0;
    }
    {
        $state.hasProcSelfFD = sync__from_gostdlib.OnceValue<bool>((): bool => {
            let stat = Stat_t__from_unix.$zero();
            return Stat__from_unix(_procSelfFD$string, stat) === undefined;
        });
    }
    {
        const __gotots_callee_3 = os__from_gostdlib.DirFS;
        const __gotots_field_1 = __gotots_callee_3 === undefined ? undefined : ($argument0: gostring): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error | undefined => {
            return $goProviderInterfaceBridge$Named_fs$FS.$from(__gotots_callee_3($argument0));
        };
        const __gotots_field_2 = new Common__from_internal__package_1(__gotots_field_1, $state.isReparsePoint);
        $state.osVFS = new $goInterfaceAdapter$PointerTo_Named_osvfs$osFS({ value: new osFS(__gotots_field_2) });
    }
}
export { FS, GetGlobalTypingsCacheLocation } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/osvfs/os.js";
