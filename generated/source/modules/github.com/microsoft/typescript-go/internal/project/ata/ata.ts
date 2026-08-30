import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ScriptKind as ScriptKind__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { Logger as Logger__from_logging } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import type { Version as Version__from_semver } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleKindNone$constant as ModuleKindNone$constant__from_core, ModuleResolutionKindNodeNext$constant as ModuleResolutionKindNodeNext$constant__from_core, NewThrottleGroup as NewThrottleGroup__from_core, ThrottleGroup as ThrottleGroup__from_core, TypeAcquisition as TypeAcquisition__from_core, VersionMajorMinor as VersionMajorMinor__from_core, Version as Version__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { MangleScopedPackageName as MangleScopedPackageName__from___go_module, NewResolver as NewResolver__from___go_module, Resolver as Resolver__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { MustParse as MustParse__from_semver } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/package.js";
import { CombinePaths as CombinePaths__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$Equals$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Equals.js";
import { SyncMap$Load$string$PointerTo_Named_ata$CachedTyping, SyncMap$Load$string$bool } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$string$PointerTo_Named_ata$CachedTyping, SyncMap$Store$string$bool } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { parseNpmConfigOrLock$Named_ata$npmConfig, parseNpmConfigOrLock$Named_ata$npmLock } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/ata/parseNpmConfigOrLock.js";
import { Sort$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$PointerTo_MapOf_string_To_MapOf_string_To_MapOf_string_To_string, $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$int32, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$NpmInstall$string_SliceOf_string_to_SliceOf_byte_Named_error } from "../../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_MapOf_string_To_MapOf_string_To_string, $goMap$MapOf_string_To_Named_ata$npmDependecyEntry, $goMap$MapOf_string_To_MapOf_string_To_string as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_context$Context, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { DiscoverTypings, isTypingUpToDate } from "./discovertypings.js";
import { NameOk$constant, ValidatePackageName, renderPackageNameValidationFailure } from "./validatepackagename.js";
import * as context__from_gostdlib from "@gotots/gostdlib/context.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { GoChannel } from "@gotots/runtime/channel.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class TypingsInfo {
    declare private readonly $goType: void;
    public constructor(public TypeAcquisition: {
        value: TypeAcquisition__from_core;
    } | undefined, public CompilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public UnresolvedImports: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined) {
    }
    static $copy($source: TypingsInfo): TypingsInfo {
        return new TypingsInfo($source.TypeAcquisition, $source.CompilerOptions, $source.UnresolvedImports);
    }
    static $equal($left: TypingsInfo, $right: TypingsInfo): bool {
        return $left.TypeAcquisition
            ===
                $right.TypeAcquisition
            &&
                $left.CompilerOptions
                    ===
                        $right.CompilerOptions &&
            tsonicTypeScriptRuntime.sameLocation($left.UnresolvedImports, $right.UnresolvedImports);
    }
    static $hash($source: TypingsInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.TypeAcquisition));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.CompilerOptions));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.UnresolvedImports));
        return $hash;
    }
    declare private readonly then?: never;
    Equals(other: TypingsInfo): bool {
        return TypeAcquisition__from_core.Equals(this.TypeAcquisition, other.TypeAcquisition) && CompilerOptions__from_core.GetAllowJS(this.CompilerOptions) === CompilerOptions__from_core.GetAllowJS(other.CompilerOptions) && Set$Equals$string(this.UnresolvedImports, other.UnresolvedImports);
    }
}
export class CachedTyping {
    declare private readonly $goType: void;
    public constructor(public TypingsLocation: gostring, public Version: tsonicTypeScriptRuntime.Location<Version__from_semver> | undefined) {
    }
    static $copy($source: CachedTyping): CachedTyping {
        return new CachedTyping($source.TypingsLocation, $source.Version);
    }
    static $equal($left: CachedTyping, $right: CachedTyping): bool {
        return $left.TypingsLocation === $right.TypingsLocation &&
            tsonicTypeScriptRuntime.sameLocation($left.Version, $right.Version);
    }
    static $hash($source: CachedTyping): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.TypingsLocation));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Version));
        return $hash;
    }
    declare private readonly then?: never;
}
export class TypingsInstallerOptions {
    declare private readonly $goType: void;
    public constructor(public TypingsLocation: gostring, public ThrottleLimit: int) {
    }
    declare private readonly then?: never;
}
export interface NpmExecutor extends GoInterfaceValue {
    NpmInstall($argument0: gostring, $argument1: RuntimeSlice<gostring>): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ];
}
export const NpmExecutor$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$NpmInstall$string_SliceOf_string_to_SliceOf_byte_Named_error]);
export function NpmExecutor$is(value: GoInterfaceValue | undefined): value is NpmExecutor {
    return value !== undefined && value.$go$implements(NpmExecutor$contract);
}
export interface TypingsInstallerHost extends GoInterfaceValue {
    FS(): FS__from_vfs | undefined;
    GetCurrentDirectory(): gostring;
    NpmInstall($argument0: gostring, $argument1: RuntimeSlice<gostring>): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ];
}
export const TypingsInstallerHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$NpmInstall$string_SliceOf_string_to_SliceOf_byte_Named_error]);
export function TypingsInstallerHost$is(value: GoInterfaceValue | undefined): value is TypingsInstallerHost {
    return value !== undefined && value.$go$implements(TypingsInstallerHost$contract);
}
export class TypingsInstaller {
    declare private readonly $goType: void;
    public constructor(public typingsLocation: gostring, public host: TypingsInstallerHost | undefined, public initOnce: sync__from_gostdlib.Once, public packageNameToTypingLocation: SyncMap__from_collections<gostring, {
        value: CachedTyping;
    } | undefined>, public missingTypingsSet: SyncMap__from_collections<gostring, bool>, public typesRegistry: GoMapValue<gostring, GoMapValue<gostring, gostring>>, public installRunCount: atomic__from_gostdlib.Int32, public concurrencySemaphore: GoChannel<GoEmptyStruct> | undefined) {
    }
    static $copy($source: TypingsInstaller): TypingsInstaller {
        return new TypingsInstaller($source.typingsLocation, $source.host, named_sync.SyncOnceOperations.$copy($source.initOnce), SyncMap__from_collections.$copy<gostring, {
            value: CachedTyping;
        } | undefined>($source.packageNameToTypingLocation), SyncMap__from_collections.$copy<gostring, bool>($source.missingTypingsSet), $source.typesRegistry, named_sync_atomic.SyncAtomicInt32Operations.$copy($source.installRunCount), $source.concurrencySemaphore);
    }
    declare private readonly then?: never;
    static InstallTypings(ti: {
        value: TypingsInstaller;
    } | undefined, request: TypingsInstallRequest | undefined): [
        TypingsInstallResult | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_0 = TypingsInstaller.$go$private$ata$discoverAndInstallTypings(ti, request);
        let result: TypingsInstallResult | undefined = __gotots_results_0[0];
        let err: GoInterface | undefined = __gotots_results_0[1];
        if (err === undefined) {
            Sort$SliceOf_string$string((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsFiles);
            Sort$SliceOf_string$string((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FilesToWatch);
            const __gotots_receiver_0 = (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logger;
            const __gotots_argument_0 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Got install request for: " + (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectID.$value)]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_0).Log(__gotots_argument_0);
        }
        return [result, err];
    }
    static $go$private$ata$discoverAndInstallTypings(ti: {
        value: TypingsInstaller;
    } | undefined, request: TypingsInstallRequest | undefined): [
        TypingsInstallResult | undefined,
        GoInterface | undefined
    ] {
        TypingsInstaller.$go$private$ata$init(ti, (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectID.$value, (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FS, (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logger);
        const __gotots_argument_1 = (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FS;
        const __gotots_argument_2 = (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logger;
        const __gotots_argument_3 = (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsInfo;
        const __gotots_argument_4 = (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames;
        const __gotots_argument_5 = (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectRootPath;
        const __gotots_store_0 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_6 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "packageNameToTypingLocation");
        const __gotots_argument_7: TypingsInstaller["typesRegistry"] = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typesRegistry;
        const __gotots_results_1 = DiscoverTypings(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
        let cachedTypingPaths = __gotots_results_1[0];
        let newTypingNames = __gotots_results_1[1];
        let filesToWatch = __gotots_results_1[2];
        let requestId = atomic__from_gostdlib.Int32.Add((ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.installRunCount, 1);
        if (newTypingNames.length > 0) {
            let filteredTypings = TypingsInstaller.$go$private$ata$filterTypings(ti, (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectID, (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logger, newTypingNames);
            if (filteredTypings.length !== 0) {
                const __gotots_results_2 = TypingsInstaller.$go$private$ata$installTypings(ti, (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectID, (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsInfo, requestId, cachedTypingPaths, filteredTypings, (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logger);
                let typingsFiles = __gotots_results_2[0];
                let err: GoInterface | undefined = __gotots_results_2[1];
                if (!(err === undefined)) {
                    return [void 0, err];
                }
                return [new TypingsInstallResult(typingsFiles, filesToWatch), void 0];
            }
            const __gotots_receiver_2 = (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logger;
            const __gotots_argument_8 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: All typings are known to be missing or invalid - no need to install more typings")]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_2).Log(__gotots_argument_8);
        }
        else {
            const __gotots_receiver_3 = (request ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logger;
            const __gotots_argument_9 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: No new typings were requested as a result of typings discovery")]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_3).Log(__gotots_argument_9);
        }
        return [new TypingsInstallResult(cachedTypingPaths, filesToWatch), void 0];
    }
    static $go$private$ata$ensureTypingsLocationExists(ti: {
        value: TypingsInstaller;
    } | undefined, fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined): void {
        let npmConfigPath = CombinePaths__from_tspath((ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation, RuntimeSlice.literal<gostring>(["package.json"]));
        const __gotots_receiver_26 = logger;
        const __gotots_argument_41 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Npm config file: " + npmConfigPath)]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_26).Log(__gotots_argument_41);
        const __gotots_receiver_27 = fs;
        const __gotots_argument_42 = npmConfigPath;
        if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_27).FileExists(__gotots_argument_42)) {
            const __gotots_receiver_28 = logger;
            const __gotots_argument_43 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Npm config file: '%s' is missing, creating new one...", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(npmConfigPath)])))]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_28).Log(__gotots_argument_43);
            const __gotots_receiver_29 = fs;
            const __gotots_argument_44 = npmConfigPath;
            const __gotots_argument_45 = "{ \"private\": true }";
            let err: GoInterface | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_29).WriteFile(__gotots_argument_44, __gotots_argument_45);
            if (!(err === undefined)) {
                const __gotots_receiver_30 = logger;
                const __gotots_argument_46 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Npm config file write failed: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_30).Log(__gotots_argument_46);
            }
        }
    }
    static $go$private$ata$filterTypings(ti: {
        value: TypingsInstaller;
    } | undefined, projectID: Path__from_tspath, logger: Logger__from_logging | undefined, typingsToInstall: RuntimeSlice<gostring>): RuntimeSlice<gostring> {
        let result = RuntimeSlice.nil<gostring>();
        const __gotots_range_0 = typingsToInstall;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let typing = __gotots_range_value_0;
            let typingKey = MangleScopedPackageName__from___go_module(typing);
            {
                const __gotots_store_1 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_4 = SyncMap$Load$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "missingTypingsSet"), typingKey);
                let ok__shadow_1 = __gotots_results_4[1];
                if (ok__shadow_1) {
                    const __gotots_receiver_9 = logger;
                    const __gotots_argument_16 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: '%s':: '%s' is in missingTypingsSet - skipping...", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(typing), new GoInterfaceAdapter(typingKey)])))]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_9).Log(__gotots_argument_16);
                    continue;
                }
            }
            const __gotots_results_5 = ValidatePackageName(typing);
            let validationResult = __gotots_results_5[0];
            let name = __gotots_results_5[1];
            let isScopeName = __gotots_results_5[2];
            if (!(validationResult.$value === NameOk$constant().$value)) {
                const __gotots_store_2 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                SyncMap$Store$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "missingTypingsSet"), typingKey, true);
                const __gotots_receiver_10 = logger;
                const __gotots_argument_17 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: " + renderPackageNameValidationFailure(typing, validationResult, name, isScopeName))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_10).Log(__gotots_argument_17);
                continue;
            }
            const __gotots_results_6 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typesRegistry.lookupOk(typingKey);
            let typesRegistryEntry: GoMapValue<gostring, gostring> = __gotots_results_6[0];
            let ok = __gotots_results_6[1];
            if (!ok) {
                const __gotots_receiver_11 = logger;
                const __gotots_argument_18 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: '%s':: Entry for package '%s' does not exist in local types registry - skipping...", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(typing), new GoInterfaceAdapter(typingKey)])))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_11).Log(__gotots_argument_18);
                continue;
            }
            {
                const __gotots_store_3 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_7 = SyncMap$Load$string$PointerTo_Named_ata$CachedTyping(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "packageNameToTypingLocation"), typingKey);
                let typingLocation: {
                    value: CachedTyping;
                } | undefined = __gotots_results_7[0];
                let ok__shadow_1 = __gotots_results_7[1];
                if (ok__shadow_1 && isTypingUpToDate(typingLocation, typesRegistryEntry)) {
                    const __gotots_receiver_12 = logger;
                    const __gotots_argument_19 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: '%s':: '%s' already has an up-to-date typing - skipping...", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(typing), new GoInterfaceAdapter(typingKey)])))]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_12).Log(__gotots_argument_19);
                    continue;
                }
            }
            result = result.append("", [typingKey]);
        }
        return result;
    }
    static $go$private$ata$init(ti: {
        value: TypingsInstaller;
    } | undefined, projectID: gostring, fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined): void {
        sync__from_gostdlib.Once.Do((ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initOnce, (): void => {
            const __gotots_receiver_4 = logger;
            const __gotots_argument_10 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Global cache location '" + (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation + "'")]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_4).Log(__gotots_argument_10);
            TypingsInstaller.$go$private$ata$processCacheLocation(ti, projectID, fs, logger);
            TypingsInstaller.$go$private$ata$ensureTypingsLocationExists(ti, fs, logger);
            const __gotots_receiver_5 = logger;
            const __gotots_argument_11 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Updating types-registry@latest npm package...")]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_5).Log(__gotots_argument_11);
            {
                const __gotots_receiver_6: TypingsInstaller["host"] = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_argument_12: TypingsInstaller["typingsLocation"] = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation;
                const __gotots_argument_13 = RuntimeSlice.literal<gostring>(["install", "--ignore-scripts", "types-registry@latest"]);
                const __gotots_results_3 = goInterfaceNonNil<TypingsInstallerHost>(__gotots_receiver_6).NpmInstall(__gotots_argument_12, __gotots_argument_13);
                let err: GoInterface | undefined = __gotots_results_3[1];
                if (err === undefined) {
                    const __gotots_receiver_7 = logger;
                    const __gotots_argument_14 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Updated types-registry npm package")]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_7).Log(__gotots_argument_14);
                }
                else {
                    const __gotots_receiver_8 = logger;
                    const __gotots_argument_15 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Error updating types-registry package: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_8).Log(__gotots_argument_15);
                }
            }
            (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typesRegistry = TypingsInstaller.$go$private$ata$loadTypesRegistryFile(ti, fs, logger);
        });
    }
    static $go$private$ata$installTypings(ti: {
        value: TypingsInstaller;
    } | undefined, projectID: Path__from_tspath, typingsInfo: tsonicTypeScriptRuntime.Location<TypingsInfo> | undefined, requestID: int32, currentlyCachedTypings: RuntimeSlice<gostring>, filteredTypings: RuntimeSlice<gostring>, logger: Logger__from_logging | undefined): [
        RuntimeSlice<gostring>,
        GoInterface | undefined
    ] {
        let scopedTypings = RuntimeSlice.make<gostring>(filteredTypings.length, null, "");
        const __gotots_range_1 = filteredTypings;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let i = __gotots_range_value_1;
            let packageName = __gotots_range_value_2;
            scopedTypings.set(i, fmt__from_gostdlib.Sprintf("@types/%s@%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(packageName), new GoInterfaceAdapter(tsVersionToUse$string)])));
        }
        {
            const __gotots_results_8 = TypingsInstaller.$go$private$ata$installWorker(ti, projectID, requestID, scopedTypings, logger);
            let packageNames = __gotots_results_8[0];
            let ok = __gotots_results_8[1];
            if (ok) {
                const __gotots_receiver_13 = logger;
                const __gotots_argument_20 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Installed typings %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_string(packageNames)])))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_13).Log(__gotots_argument_20);
                let installedTypingFiles = RuntimeSlice.nil<gostring>();
                const __gotots_argument_21: TypingsInstaller["host"] = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_field_0 = ModuleResolutionKindNodeNext$constant__from_core();
                const __gotots_struct_0 = CompilerOptions__from_core.$zero();
                __gotots_struct_0.ModuleResolution = __gotots_field_0;
                const __gotots_argument_22 = { value: __gotots_struct_0 };
                const __gotots_argument_23 = "";
                const __gotots_argument_24 = "";
                let resolver: {
                    value: Resolver__from___go_module;
                } | undefined = NewResolver__from___go_module(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24);
                const __gotots_range_2 = filteredTypings;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
                    let packageName = __gotots_range_value_3;
                    let typingFile = TypingsInstaller.$go$private$ata$typingToFileName(ti, resolver, packageName);
                    if (typingFile === "") {
                        const __gotots_receiver_14 = logger;
                        const __gotots_argument_25 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Failed to find typing file for package '%s'", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(packageName)])))]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_14).Log(__gotots_argument_25);
                        const __gotots_store_4 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        SyncMap$Store$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "missingTypingsSet"), packageName, true);
                        continue;
                    }
                    let distTags: GoMapValue<gostring, gostring> = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typesRegistry.lookup(packageName);
                    const __gotots_results_9 = distTags.lookupOk("ts" + VersionMajorMinor__from_core());
                    let useVersion = __gotots_results_9[0];
                    let ok__shadow_1 = __gotots_results_9[1];
                    if (!ok__shadow_1) {
                        useVersion = distTags.lookup("latest");
                    }
                    let newVersion = MustParse__from_semver(useVersion);
                    const newVersion$location = tsonicTypeScriptRuntime.boundLocation({}, () => newVersion, newVersion$next => newVersion = newVersion$next);
                    let newTyping: {
                        value: CachedTyping;
                    } | undefined = { value: new CachedTyping(typingFile, newVersion$location) };
                    const __gotots_store_5 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    SyncMap$Store$string$PointerTo_Named_ata$CachedTyping(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "packageNameToTypingLocation"), packageName, newTyping);
                    installedTypingFiles = installedTypingFiles.append("", [typingFile]);
                }
                const __gotots_receiver_15 = logger;
                const __gotots_argument_26 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Installed typing files %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_string(installedTypingFiles)])))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_15).Log(__gotots_argument_26);
                return [goSliceAppendSlice<gostring>(currentlyCachedTypings, installedTypingFiles, ""), void 0];
            }
        }
        const __gotots_receiver_16 = logger;
        const __gotots_argument_27 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: install request failed, marking packages as missing to prevent repeated requests: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_string(filteredTypings)])))]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_16).Log(__gotots_argument_27);
        const __gotots_range_3 = filteredTypings;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let typing = __gotots_range_value_4;
            const __gotots_store_6 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncMap$Store$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "missingTypingsSet"), typing, true);
        }
        return [RuntimeSlice.nil<gostring>(), GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("npm install failed"))];
    }
    static $go$private$ata$installWorker(ti: {
        value: TypingsInstaller;
    } | undefined, projectID: Path__from_tspath, requestId: int32, packageNames: RuntimeSlice<gostring>, logger: Logger__from_logging | undefined): [
        RuntimeSlice<gostring>,
        bool
    ] {
        const __gotots_receiver_34 = logger;
        const __gotots_argument_53 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: #%d with cwd: %s arguments: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int32(requestId), new GoInterfaceAdapter((ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation), new $goInterfaceAdapter$SliceOf_string(packageNames)])))]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_34).Log(__gotots_argument_53);
        let ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined = $goProviderInterfaceBridge$Named_context$Context.$from(context__from_gostdlib.Background());
        let err: GoInterface | undefined = installNpmPackages(ctx, packageNames, (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.concurrencySemaphore, (packageNames__shadow_1: RuntimeSlice<gostring>): GoInterface | undefined => {
            let npmArgs = RuntimeSlice.nil<gostring>();
            npmArgs = npmArgs.append("", ["install", "--ignore-scripts"]);
            npmArgs = goSliceAppendSlice<gostring>(npmArgs, packageNames__shadow_1, "");
            npmArgs = npmArgs.append("", ["--save-dev", "--user-agent=\"typesInstaller/" + Version__from_core() + "\""]);
            const __gotots_receiver_35: TypingsInstaller["host"] = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_argument_54: TypingsInstaller["typingsLocation"] = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation;
            const __gotots_argument_55 = npmArgs;
            const __gotots_results_15 = goInterfaceNonNil<TypingsInstallerHost>(__gotots_receiver_35).NpmInstall(__gotots_argument_54, __gotots_argument_55);
            let output = __gotots_results_15[0];
            let err__shadow_1: GoInterface | undefined = __gotots_results_15[1];
            if (!(err__shadow_1 === undefined)) {
                const __gotots_receiver_36 = logger;
                const __gotots_argument_56 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Output is: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_byte(output)])))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_36).Log(__gotots_argument_56);
                return err__shadow_1;
            }
            return void 0;
        });
        const __gotots_receiver_37 = logger;
        const __gotots_argument_57 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("TI:: npm install #%d completed", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int32(requestId)])))]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_37).Log(__gotots_argument_57);
        return [packageNames, err === undefined];
    }
    static $go$private$ata$loadTypesRegistryFile(ti: {
        value: TypingsInstaller;
    } | undefined, fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined): GoMapValue<gostring, GoMapValue<gostring, gostring>> {
        let typesRegistryFile = CombinePaths__from_tspath((ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation, RuntimeSlice.literal<gostring>(["node_modules/types-registry/index.json"]));
        const __gotots_receiver_31 = fs;
        const __gotots_argument_47 = typesRegistryFile;
        const __gotots_results_13 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_31).ReadFile(__gotots_argument_47);
        let typesRegistryFileContents = __gotots_results_13[0];
        let ok = __gotots_results_13[1];
        if (ok) {
            let entries: GoMapValue<gostring, GoMapValue<gostring, GoMapValue<gostring, gostring>>> = $goMap$MapOf_string_To_MapOf_string_To_MapOf_string_To_string.nil();
            const entries$location = tsonicTypeScriptRuntime.boundLocation({}, () => entries, entries$next => entries = entries$next);
            const __gotots_conversion_0 = typesRegistryFileContents;
            const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
            for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
            }
            const __gotots_argument_48 = __gotots_conversion_1;
            const __gotots_argument_49 = new $goInterfaceAdapter$PointerTo_MapOf_string_To_MapOf_string_To_MapOf_string_To_string(entries$location);
            const __gotots_argument_50 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
            let err: GoInterface | undefined = Unmarshal__from_json__package_1(__gotots_argument_48, __gotots_argument_49, __gotots_argument_50);
            if (err === undefined) {
                {
                    const __gotots_results_14 = entries.lookupOk("entries");
                    let typesRegistry: GoMapValue<gostring, GoMapValue<gostring, gostring>> = __gotots_results_14[0];
                    let ok__shadow_1 = __gotots_results_14[1];
                    if (ok__shadow_1) {
                        return typesRegistry;
                    }
                }
            }
            const __gotots_receiver_32 = logger;
            const __gotots_argument_51 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Error when loading types registry file '%s': %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(typesRegistryFile), err])))]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_32).Log(__gotots_argument_51);
        }
        else {
            const __gotots_receiver_33 = logger;
            const __gotots_argument_52 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Error reading types registry file '%s'", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(typesRegistryFile)])))]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_33).Log(__gotots_argument_52);
        }
        return GoMap.make(0, []);
    }
    static $go$private$ata$processCacheLocation(ti: {
        value: TypingsInstaller;
    } | undefined, projectID: gostring, fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined): void {
        const __gotots_receiver_17 = logger;
        const __gotots_argument_28 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Processing cache location " + (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation)]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_17).Log(__gotots_argument_28);
        let packageJson = CombinePaths__from_tspath((ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation, RuntimeSlice.literal<gostring>(["package.json"]));
        let packageLockJson = CombinePaths__from_tspath((ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation, RuntimeSlice.literal<gostring>(["package-lock.json"]));
        const __gotots_receiver_18 = logger;
        const __gotots_argument_29 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Trying to find '" + packageJson + "'...")]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_18).Log(__gotots_argument_29);
        const __gotots_receiver_19 = fs;
        const __gotots_argument_30 = packageJson;
        let __gotots_logical_result_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_19).FileExists(__gotots_argument_30);
        if (__gotots_logical_result_0) {
            const __gotots_receiver_20 = fs;
            const __gotots_argument_31 = packageLockJson;
            __gotots_logical_result_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_20).FileExists(__gotots_argument_31);
        }
        if (__gotots_logical_result_0) {
            let npmConfig__shadow_1 = npmConfig.$zero();
            const npmConfig__shadow_1$location = tsonicTypeScriptRuntime.boundLocation({}, () => npmConfig__shadow_1, npmConfig__shadow_1$next => npmConfig__shadow_1 = npmConfig__shadow_1$next);
            let npmConfigContents = parseNpmConfigOrLock$Named_ata$npmConfig(fs, logger, packageJson, npmConfig__shadow_1$location);
            let npmLock__shadow_1 = npmLock.$zero();
            const npmLock__shadow_1$location = tsonicTypeScriptRuntime.boundLocation({}, () => npmLock__shadow_1, npmLock__shadow_1$next => npmLock__shadow_1 = npmLock__shadow_1$next);
            let npmLockContents = parseNpmConfigOrLock$Named_ata$npmLock(fs, logger, packageLockJson, npmLock__shadow_1$location);
            const __gotots_receiver_21 = logger;
            const __gotots_argument_32 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Loaded content of " + packageJson + ": " + npmConfigContents)]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_21).Log(__gotots_argument_32);
            const __gotots_receiver_22 = logger;
            const __gotots_argument_33 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Loaded content of " + packageLockJson + ": " + npmLockContents)]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_22).Log(__gotots_argument_33);
            const __gotots_argument_34: TypingsInstaller["host"] = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_field_1 = ModuleResolutionKindNodeNext$constant__from_core();
            const __gotots_struct_1 = CompilerOptions__from_core.$zero();
            __gotots_struct_1.ModuleResolution = __gotots_field_1;
            const __gotots_argument_35 = { value: __gotots_struct_1 };
            const __gotots_argument_36 = "";
            const __gotots_argument_37 = "";
            let resolver: {
                value: Resolver__from___go_module;
            } | undefined = NewResolver__from___go_module(__gotots_argument_34, __gotots_argument_35, __gotots_argument_36, __gotots_argument_37);
            if (!npmConfig__shadow_1.DevDependencies.isNil() && (!npmLock__shadow_1.Packages.isNil() || !npmLock__shadow_1.Dependencies.isNil())) {
                const __gotots_range_4 = npmConfig__shadow_1.DevDependencies;
                const __gotots_range_keys_0 = __gotots_range_4.keys();
                for (const __gotots_range_value_5 of __gotots_range_keys_0) {
                    const __gotots_range_value_6 = __gotots_range_4.lookupOk(__gotots_range_value_5);
                    if (!__gotots_range_value_6[1]) {
                        continue;
                    }
                    const __gotots_range_value_7 = __gotots_range_value_5;
                    let key = __gotots_range_value_7;
                    const __gotots_results_10 = npmLock__shadow_1.Packages.lookupOk("node_modules/" + key);
                    let npmLockValue = __gotots_results_10[0];
                    let npmLockValueExists = __gotots_results_10[1];
                    if (!npmLockValueExists) {
                        const __gotots_results_11 = npmLock__shadow_1.Dependencies.lookupOk(key);
                        npmLockValue = __gotots_results_11[0];
                        npmLockValueExists = __gotots_results_11[1];
                    }
                    if (!npmLockValueExists) {
                        continue;
                    }
                    let packageName = GetBaseFileName__from_tspath(key);
                    if (packageName === "") {
                        continue;
                    }
                    let typingFile = TypingsInstaller.$go$private$ata$typingToFileName(ti, resolver, packageName);
                    if (typingFile === "") {
                        const __gotots_store_7 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        SyncMap$Store$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "missingTypingsSet"), packageName, true);
                        continue;
                    }
                    {
                        const __gotots_store_8 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_results_12 = SyncMap$Load$string$PointerTo_Named_ata$CachedTyping(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "packageNameToTypingLocation"), packageName);
                        let existingTypingFile: {
                            value: CachedTyping;
                        } | undefined = __gotots_results_12[0];
                        let existingTypingsFilePresent = __gotots_results_12[1];
                        if (existingTypingsFilePresent) {
                            if ((existingTypingFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypingsLocation === typingFile) {
                                continue;
                            }
                            const __gotots_receiver_23 = logger;
                            const __gotots_argument_38 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: New typing for package " + packageName + " from " + typingFile + " conflicts with existing typing file " + (existingTypingFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypingsLocation)]);
                            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_23).Log(__gotots_argument_38);
                        }
                    }
                    const __gotots_receiver_24 = logger;
                    const __gotots_argument_39 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Adding entry into typings cache: " + packageName + " => " + typingFile)]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_24).Log(__gotots_argument_39);
                    let version = npmLockValue.Version;
                    if (version === "") {
                        continue;
                    }
                    let newVersion = MustParse__from_semver(version);
                    const newVersion$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => newVersion, newVersion$next2 => newVersion = newVersion$next2);
                    let newTyping: {
                        value: CachedTyping;
                    } | undefined = { value: new CachedTyping(typingFile, newVersion$location2) };
                    const __gotots_store_9 = (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    SyncMap$Store$string$PointerTo_Named_ata$CachedTyping(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "packageNameToTypingLocation"), packageName, newTyping);
                }
            }
        }
        const __gotots_receiver_25 = logger;
        const __gotots_argument_40 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("ATA:: Finished processing cache location " + (ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation)]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_25).Log(__gotots_argument_40);
    }
    static $go$private$ata$typingToFileName(ti: {
        value: TypingsInstaller;
    } | undefined, resolver: {
        value: Resolver__from___go_module;
    } | undefined, packageName: gostring): gostring {
        const __gotots_results_16 = Resolver__from___go_module.ResolveModuleName(resolver, packageName, CombinePaths__from_tspath((ti ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation, RuntimeSlice.literal<gostring>(["index.d.ts"])), ModuleKindNone$constant__from_core(), void 0);
        let result: ResolvedModule__from___go_module | undefined = __gotots_results_16[0];
        return (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName;
    }
}
export function NewTypingsInstaller(options: TypingsInstallerOptions | undefined, host: TypingsInstallerHost | undefined): {
    value: TypingsInstaller;
} | undefined {
    return { value: new TypingsInstaller((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsLocation, host, named_sync.SyncOnceOperations.$zero(), SyncMap__from_collections.$zero<gostring, {
            value: CachedTyping;
        } | undefined>(), SyncMap__from_collections.$zero<gostring, bool>(), GoMap.nil(), named_sync_atomic.SyncAtomicInt32Operations.$zero(), GoChannel.make<GoEmptyStruct>((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ThrottleLimit, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, (value: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                value);
        })) };
}
export const tsVersionToUse$string: gostring = "latest";
export class TypingsInstallRequest {
    declare private readonly $goType: void;
    public constructor(public ProjectID: Path__from_tspath, public TypingsInfo: tsonicTypeScriptRuntime.Location<TypingsInfo> | undefined, public FileNames: RuntimeSlice<gostring>, public ProjectRootPath: gostring, public CompilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public CurrentDirectory: gostring, public GetScriptKind: (($0: gostring) => ScriptKind__from_core) | undefined, public FS: FS__from_vfs | undefined, public Logger: Logger__from_logging | undefined) {
    }
    declare private readonly then?: never;
}
export class TypingsInstallResult {
    declare private readonly $goType: void;
    public constructor(public TypingsFiles: RuntimeSlice<gostring>, public FilesToWatch: RuntimeSlice<gostring>) {
    }
    declare private readonly then?: never;
}
export function installNpmPackages(ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, packageNames: RuntimeSlice<gostring>, concurrencySemaphore: GoChannel<GoEmptyStruct> | undefined, installPackages: (($0: RuntimeSlice<gostring>) => GoInterface | undefined) | undefined): GoInterface | undefined {
    let tg: ThrottleGroup__from_core | undefined = NewThrottleGroup__from_core(ctx, concurrencySemaphore);
    let currentCommandStart = 0;
    let currentCommandEnd = 0;
    let currentCommandSize = 100;
    const __gotots_range_5 = packageNames;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
        const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_4);
        let packageName = __gotots_range_value_8;
        currentCommandSize = currentCommandSize + packageName.length + 1;
        if (currentCommandSize < 8000) {
            currentCommandEnd++;
        }
        else {
            let packages = packageNames.slice(currentCommandStart, currentCommandEnd, null);
            ThrottleGroup__from_core.Go(tg, (): GoInterface | undefined => {
                const __gotots_callee_1 = installPackages;
                const __gotots_argument_62 = packages;
                return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62);
            });
            currentCommandStart = currentCommandEnd;
            currentCommandSize = 100 + packageName.length + 1;
            currentCommandEnd++;
        }
    }
    if (currentCommandStart < packageNames.length) {
        let packages = packageNames.slice(currentCommandStart, currentCommandEnd, null);
        ThrottleGroup__from_core.Go(tg, (): GoInterface | undefined => {
            const __gotots_callee_2 = installPackages;
            const __gotots_argument_63 = packages;
            return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63);
        });
    }
    return ThrottleGroup__from_core.Wait(tg);
}
export class npmConfig {
    declare private readonly $goType: void;
    public constructor(public DevDependencies: GoMapValue<gostring, $goInterface$Interface_void | undefined>) {
    }
    static $zero(): npmConfig {
        return new npmConfig($goMap$MapOf_string_To_Interface_void.nil());
    }
    static $copy($source: npmConfig): npmConfig {
        return new npmConfig($source.DevDependencies);
    }
    declare private readonly then?: never;
}
export class npmDependecyEntry {
    declare private readonly $goType: void;
    public constructor(public Version: gostring) {
    }
    static $zero(): npmDependecyEntry {
        return new npmDependecyEntry("");
    }
    static $copy($source: npmDependecyEntry): npmDependecyEntry {
        return new npmDependecyEntry($source.Version);
    }
    static $equal($left: npmDependecyEntry, $right: npmDependecyEntry): bool {
        return $left.Version === $right.Version;
    }
    static $hash($source: npmDependecyEntry): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Version));
        return $hash;
    }
    declare private readonly then?: never;
}
export class npmLock {
    declare private readonly $goType: void;
    public constructor(public Dependencies: GoMapValue<gostring, npmDependecyEntry>, public Packages: GoMapValue<gostring, npmDependecyEntry>) {
    }
    static $zero(): npmLock {
        return new npmLock($goMap$MapOf_string_To_Named_ata$npmDependecyEntry.nil(), $goMap$MapOf_string_To_Named_ata$npmDependecyEntry.nil());
    }
    static $copy($source: npmLock): npmLock {
        return new npmLock($source.Dependencies, $source.Packages);
    }
    declare private readonly then?: never;
}
export function parseNpmConfigOrLock$kernel<T>($go$interface_adapt$PointerTo_T0_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<T> | undefined) => $goInterface$Interface_void | undefined, fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined, location: gostring, config: tsonicTypeScriptRuntime.Location<T> | undefined): gostring {
    const __gotots_receiver_38 = fs;
    const __gotots_argument_58 = location;
    const __gotots_results_17 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_38).ReadFile(__gotots_argument_58);
    let contents = __gotots_results_17[0];
    const __gotots_conversion_3 = contents;
    const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
    for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
        __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
    }
    const __gotots_argument_59 = __gotots_conversion_4;
    const __gotots_argument_60 = $go$interface_adapt$PointerTo_T0_to_Interface_void(config);
    const __gotots_argument_61 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
    Unmarshal__from_json__package_1(__gotots_argument_59, __gotots_argument_60, __gotots_argument_61);
    return contents;
}
