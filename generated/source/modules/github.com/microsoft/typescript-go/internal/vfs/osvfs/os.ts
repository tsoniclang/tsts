import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { LimitedSemaphore as LimitedSemaphore__from_core, VersionMajorMinor as VersionMajorMinor__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { CombinePaths as CombinePaths__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, NormalizePath as NormalizePath__from_tspath, NormalizeSlashes as NormalizeSlashes__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Common as Common__from_internal__package_1, RootLength as RootLength__from_internal__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/internal/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/osvfs/state.js";
import { Entries as Entries__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { $goInterfaceAdapter$PointerTo_Named_osvfs$limitedWalkDirFunc as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { realpath } from "./realpath_linux.js";
import * as named_io_fs from "@gotots/gostdlib/internal/facets/named-io-fs.js";
import * as named_os from "@gotots/gostdlib/internal/facets/named-os.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as recovery_io from "@gotots/gostdlib/internal/facets/recovery-io.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as filepath__from_gostdlib from "@gotots/gostdlib/path/filepath.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function FS(): FS__from_vfs | undefined {
    return $state.osVFS;
}
export class osFS {
    declare private readonly $goType: void;
    public constructor(public common: Common__from_internal__package_1) {
    }
    static $copy($source: osFS): osFS {
        return new osFS(Common__from_internal__package_1.$copy($source.common));
    }
    declare private readonly then?: never;
    static AppendFile(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring, content: gostring): GoInterface | undefined {
        return osFS.$go$private$osvfs$writeFileEnsuringDir(vfs__shadow_1, path, content, 1089);
    }
    static Chtimes(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring, aTime: time__from_gostdlib.Time, mTime: time__from_gostdlib.Time): GoInterface | undefined {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    __gotots_return_1 = GoProviderInterfaceBridge.$from(os__from_gostdlib.Chtimes(path, named_time.TimeOperations.$copy(aTime), named_time.TimeOperations.$copy(mTime)));
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static DirectoryExists(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring): bool {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: bool = false;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    const __gotots_store_0 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_return_1 = Common__from_internal__package_1.DirectoryExists(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "common"), path);
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static FileExists(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring): bool {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: bool = false;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    const __gotots_store_1 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_return_1 = Common__from_internal__package_1.FileExists(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "common"), path);
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static GetAccessibleEntries(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring): Entries__from_vfs {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: Entries__from_vfs = Entries__from_vfs.$zero();
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    const __gotots_store_2 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_return_1 = Common__from_internal__package_1.GetAccessibleEntries(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "common"), path);
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static ReadFile(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring): [
        gostring,
        bool
    ] {
        let contents: gostring = "";
        let ok: bool = false;
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.readSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    const __gotots_store_3 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_results_2: [
                        gostring,
                        bool
                    ] = Common__from_internal__package_1.ReadFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "common"), path);
                    contents = __gotots_results_2[0];
                    ok = __gotots_results_2[1];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return [contents, ok];
    }
    static Realpath(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring): gostring {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: gostring = "";
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    __gotots_return_1 = osFSRealpath(path);
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static Remove(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring): GoInterface | undefined {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    __gotots_return_1 = GoProviderInterfaceBridge.$from(os__from_gostdlib.RemoveAll(path));
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static Stat(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    const __gotots_store_4 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_return_1 = Common__from_internal__package_1.Stat(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "common"), path);
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static UseCaseSensitiveFileNames(vfs__shadow_1: {
        value: osFS;
    } | undefined): bool {
        return $state.isFileSystemCaseSensitive;
    }
    static WalkDir(vfs__shadow_1: {
        value: osFS;
    } | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined): GoInterface | undefined {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    let walker: {
                        value: limitedWalkDirFunc;
                    } | undefined = getLimitedWalkDirFunc(walkFn);
                    const __gotots_argument_3 = walker;
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        putLimitedWalkDirFunc(__gotots_argument_3);
                    };
                    const __gotots_store_5 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_return_1 = Common__from_internal__package_1.WalkDir(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "common"), root, (walker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.walk);
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static WriteFile(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring, content: gostring): GoInterface | undefined {
        return osFS.$go$private$osvfs$writeFileEnsuringDir(vfs__shadow_1, path, content, 577);
    }
    static $go$private$osvfs$ensureDirectoryExists(vfs__shadow_1: {
        value: osFS;
    } | undefined, directoryPath: gostring): GoInterface | undefined {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_3 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                    };
                    __gotots_return_1 = GoProviderInterfaceBridge.$from(os__from_gostdlib.MkdirAll(directoryPath, named_io_fs.IoFsFileModeValueOperations.$wrap(511)));
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static $go$private$osvfs$writeFileEnsuringDir(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring, content: gostring, flag: int): GoInterface | undefined {
        RootLength__from_internal__package_1(path);
        {
            let err: GoInterface | undefined = osFS.$go$private$osvfs$writeFileWithFlag(vfs__shadow_1, path, content, flag);
            if (err === undefined) {
                return void 0;
            }
        }
        {
            let err: GoInterface | undefined = osFS.$go$private$osvfs$ensureDirectoryExists(vfs__shadow_1, GetDirectoryPath__from_tspath(NormalizePath__from_tspath(path)));
            if (!(err === undefined)) {
                return err;
            }
        }
        return osFS.$go$private$osvfs$writeFileWithFlag(vfs__shadow_1, path, content, flag);
    }
    static $go$private$osvfs$writeFileWithFlag(vfs__shadow_1: {
        value: osFS;
    } | undefined, path: gostring, content: gostring, flag: int): GoInterface | undefined {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_3: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.writeSema);
                    const __gotots_deferred_4 = DeferredCallableRegistry.resolve(__gotots_callee_3);
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_4 === undefined ? (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_4($go$recovery);
                    };
                    const __gotots_results_5 = os__from_gostdlib.OpenFile(path, BigInt.asIntN(64, goNumberToBigInt(flag)), named_io_fs.IoFsFileModeValueOperations.$wrap(438));
                    const __gotots_conversion_0 = __gotots_results_5[0];
                    const __gotots_results_6 = [__gotots_conversion_0 === undefined ? undefined :
                            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_0, (): os__from_gostdlib.File => {
                                return __gotots_conversion_0;
                            }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                                named_os.OsFileOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                            }), GoProviderInterfaceBridge.$from(__gotots_results_5[1])] satisfies [
                        tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined,
                        GoInterface | undefined
                    ];
                    let file: tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined = __gotots_results_6[0];
                    let err: GoInterface | undefined = __gotots_results_6[1];
                    if (!(err === undefined)) {
                        __gotots_return_1 = err;
                        break __gotots_return_block_1;
                    }
                    const __gotots_receiver_0 = file;
                    const __gotots_receiver_1 = __gotots_receiver_0 === void 0 ? void 0 :
                        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_io.OsFileClose(__gotots_receiver_1, $go$recovery);
                    };
                    {
                        const __gotots_receiver_2 = file;
                        const __gotots_results_7 = os__from_gostdlib.File.WriteString(__gotots_receiver_2 === void 0 ? void 0 :
                            (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value, content);
                        const __gotots_results_8 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_7[0])), GoProviderInterfaceBridge.$from(__gotots_results_7[1])] satisfies [
                            int,
                            GoInterface | undefined
                        ];
                        let err__shadow_1: GoInterface | undefined = __gotots_results_8[1];
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_1 = err__shadow_1;
                            break __gotots_return_block_1;
                        }
                    }
                    __gotots_return_1 = void 0;
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_4) {
                if (!(__gotots_caught_4 instanceof GoPanic)) {
                    throw __gotots_caught_4;
                }
                __gotots_panic_1 = __gotots_caught_4;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_2 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_3(__gotots_recovery_2);
                    if (__gotots_recovery_2.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_3) {
                    if (!(__gotots_caught_3 instanceof GoPanic)) {
                        throw __gotots_caught_3;
                    }
                    __gotots_panic_1 = __gotots_caught_3;
                }
            }
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
}
export function swapCase(str: gostring): gostring {
    return strings__from_gostdlib.Map((r: int32): int32 => {
        let upper = unicode__from_gostdlib.ToUpper(r);
        if (upper === r) {
            return unicode__from_gostdlib.ToLower(r);
        }
        else {
            return upper;
        }
    }, str);
}
export function getLimitedWalkDirFunc(walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined): {
    value: limitedWalkDirFunc;
} | undefined {
    let w: {
        value: limitedWalkDirFunc;
    } | undefined = (($value: $goInterface$Interface_void | undefined): {
        value: limitedWalkDirFunc;
    } | undefined => {
        if (!GoInterfaceAdapter.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get($state.limitedWalkDirFuncPool));
    (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner = walkFn;
    return w;
}
export function putLimitedWalkDirFunc(w: {
    value: limitedWalkDirFunc;
} | undefined): void {
    (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner = void 0;
    sync__from_gostdlib.Pool.Put($state.limitedWalkDirFuncPool, new GoInterfaceAdapter(w));
}
export class limitedWalkDirFunc {
    declare private readonly $goType: void;
    public constructor(public inner: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined, public walk: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined) {
    }
    static $copy($source: limitedWalkDirFunc): limitedWalkDirFunc {
        return new limitedWalkDirFunc($source.inner, $source.walk);
    }
    declare private readonly then?: never;
    static $go$private$osvfs$walker(w: {
        value: limitedWalkDirFunc;
    } | undefined, path: gostring, d: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, err: GoInterface | undefined): GoInterface | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_callee_1: (() => void) | undefined = LimitedSemaphore__from_core.Acquire($state.blockingOpSema);
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    };
                    const __gotots_callee_2: limitedWalkDirFunc["inner"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
                    const __gotots_argument_0 = path;
                    const __gotots_argument_1 = d;
                    const __gotots_argument_2 = err;
                    __gotots_return_0 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
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
}
export function osFSRealpath(path: gostring): gostring {
    RootLength__from_internal__package_1(path);
    let orig = path;
    path = filepath__from_gostdlib.FromSlash(path);
    const __gotots_results_2 = realpath(path);
    path = __gotots_results_2[0];
    let err: GoInterface | undefined = __gotots_results_2[1];
    if (!(err === undefined)) {
        return orig;
    }
    const __gotots_results_3 = filepath__from_gostdlib.Abs(path);
    const __gotots_results_4 = [__gotots_results_3[0], GoProviderInterfaceBridge.$from(__gotots_results_3[1])] satisfies [
        gostring,
        GoInterface | undefined
    ];
    path = __gotots_results_4[0];
    err = __gotots_results_4[1];
    if (!(err === undefined)) {
        return orig;
    }
    return NormalizeSlashes__from_tspath(path);
}
export function GetGlobalTypingsCacheLocation(): gostring {
    const __gotots_results_0 = os__from_gostdlib.UserCacheDir();
    const __gotots_results_1 = [__gotots_results_0[0], GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
        gostring,
        GoInterface | undefined
    ];
    let cacheDir = __gotots_results_1[0];
    let err: GoInterface | undefined = __gotots_results_1[1];
    if (!(err === undefined)) {
        cacheDir = os__from_gostdlib.TempDir();
    }
    let subdir = "";
    if (false) {
        subdir = "Microsoft/TypeScript";
    }
    else {
        subdir = "typescript";
    }
    return CombinePaths__from_tspath(cacheDir, RuntimeSlice.literal<gostring>([subdir, VersionMajorMinor__from_core()]));
}
