import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExtendedConfigCacheEntry as ExtendedConfigCacheEntry__from_tsoptions, ParseConfigHost as ParseConfigHost__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { ParseExtendedConfig as ParseExtendedConfig__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_tsc$extendedConfigCacheEntry } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { $goInterfaceAdapter$PointerTo_Named_tsc$ExtendedConfigCache as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
export class ExtendedConfigCache {
    declare private readonly $goType: void;
    public constructor(public m: SyncMap__from_collections<Path__from_tspath, {
        value: extendedConfigCacheEntry;
    } | undefined>) {
    }
    static $zero(): ExtendedConfigCache {
        return new ExtendedConfigCache(SyncMap__from_collections.$zero<Path__from_tspath, {
            value: extendedConfigCacheEntry;
        } | undefined>());
    }
    static $copy($source: ExtendedConfigCache): ExtendedConfigCache {
        return new ExtendedConfigCache(SyncMap__from_collections.$copy<Path__from_tspath, {
            value: extendedConfigCacheEntry;
        } | undefined>($source.m));
    }
    declare private readonly then?: never;
    static GetExtendedConfig(e: tsonicTypeScriptRuntime.Location<ExtendedConfigCache> | undefined, fileName: gostring, path: Path__from_tspath, resolutionStack: RuntimeSlice<gostring>, host: ParseConfigHost__from_tsoptions | undefined): {
        value: ExtendedConfigCacheEntry__from_tsoptions;
    } | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: {
            value: ExtendedConfigCacheEntry__from_tsoptions;
        } | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_results_0 = ExtendedConfigCache.$go$private$tsc$loadOrStoreNewLockedEntry(e, path);
                    let entry: {
                        value: extendedConfigCacheEntry;
                    } | undefined = __gotots_results_0[0];
                    let loaded = __gotots_results_0[1];
                    const __gotots_receiver_0 = (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if (!loaded) {
                        (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedConfigCacheEntry = ParseExtendedConfig__from_tsoptions(fileName, path, resolutionStack, host, new GoInterfaceAdapter(e));
                    }
                    __gotots_return_0 = (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedConfigCacheEntry;
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
    static $go$private$tsc$loadOrStoreNewLockedEntry(c: tsonicTypeScriptRuntime.Location<ExtendedConfigCache> | undefined, path: Path__from_tspath): [
        {
            value: extendedConfigCacheEntry;
        } | undefined,
        bool
    ] {
        let entry: {
            value: extendedConfigCacheEntry;
        } | undefined = { value: new extendedConfigCacheEntry(void 0, named_sync.SyncMutexOperations.$zero()) };
        sync__from_gostdlib.Mutex.Lock((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        {
            const __gotots_store_0 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExtendedConfigCache>).value;
            const __gotots_results_1 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_tsc$extendedConfigCacheEntry(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "m"), path, entry);
            let existing: {
                value: extendedConfigCacheEntry;
            } | undefined = __gotots_results_1[0];
            let loaded = __gotots_results_1[1];
            if (loaded) {
                sync__from_gostdlib.Mutex.Lock((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                return [existing, true];
            }
        }
        return [entry, false];
    }
}
export class extendedConfigCacheEntry {
    declare private readonly $goType: void;
    public constructor(public ExtendedConfigCacheEntry: {
        value: ExtendedConfigCacheEntry__from_tsoptions;
    } | undefined, public mu: sync__from_gostdlib.Mutex) {
    }
    static $copy($source: extendedConfigCacheEntry): extendedConfigCacheEntry {
        return new extendedConfigCacheEntry($source.ExtendedConfigCacheEntry, named_sync.SyncMutexOperations.$copy($source.mu));
    }
    static $equal($left: extendedConfigCacheEntry, $right: extendedConfigCacheEntry): bool {
        return $left.ExtendedConfigCacheEntry
            ===
                $right.ExtendedConfigCacheEntry
            && named_sync.SyncMutexOperations.$equal($left.mu, $right.mu);
    }
    static $hash($source: extendedConfigCacheEntry): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.ExtendedConfigCacheEntry));
        $hash = GoMapHash.mix($hash, named_sync.SyncMutexOperations.$hash($source.mu));
        return $hash;
    }
    declare private readonly then?: never;
}
