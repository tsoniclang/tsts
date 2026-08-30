import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { HasFileName as HasFileName__from_ast, Node as Node__from_ast, SourceFileMetaData as SourceFileMetaData__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ModeAwareCacheKey$Storage as ModeAwareCacheKey__from___go_module$Storage, ModeAwareCache as ModeAwareCache__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { KnownSymlinks as KnownSymlinks__from_symlinks } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/symlinks/package.js";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions, SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { RegistryCloneHost } from "./registry.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { BindSourceFile as BindSourceFile__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, TSTrue$constant as TSTrue$constant__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ModeAwareCacheKey as ModeAwareCacheKey__from___go_module, ResolvedModule as ResolvedModule__from___go_module, Resolver as Resolver__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { PathIsRelative as PathIsRelative__from_tspath, Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { SyncMap$Load$Named___go_module$ModeAwareCacheKey$PointerTo_Named___go_module$ResolvedModule } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named___go_module$ModeAwareCacheKey$PointerTo_Named___go_module$ResolvedModule, SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named___go_module$ModeAwareCacheKey_And_PointerTo_Named___go_module$ResolvedModule } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedModule } from "../../../../../../../support/maps.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap, GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class pathAndFileName {
    declare private readonly $goType: void;
    public constructor(public path: Path__from_tspath, public fileName: gostring) {
    }
    static $zero(): pathAndFileName {
        return new pathAndFileName(new Path__from_tspath(""), "");
    }
    static $copy($source: pathAndFileName): pathAndFileName {
        return new pathAndFileName($source.path, $source.fileName);
    }
    static $equal($left: pathAndFileName, $right: pathAndFileName): bool {
        return $left.path.$value === $right.path.$value && $left.fileName === $right.fileName;
    }
    static $hash($source: pathAndFileName): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.path.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.fileName));
        return $hash;
    }
    declare private readonly then?: never;
}
export class aliasResolver {
    declare private readonly $goType: void;
    public constructor(public toPath: (($0: gostring) => Path__from_tspath) | undefined, public host: RegistryCloneHost | undefined, public moduleResolver: {
        value: Resolver__from___go_module;
    } | undefined, public rootFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, public symlinks: GoMapValue<Path__from_tspath, pathAndFileName>, public onFailedAmbientModuleLookup: (($0: HasFileName__from_ast | undefined, $1: gostring) => void) | undefined, public resolvedModules: SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, ResolvedModule__from___go_module | undefined>> | undefined>) {
    }
    static $copy($source: aliasResolver): aliasResolver {
        return new aliasResolver($source.toPath, $source.host, $source.moduleResolver, $source.rootFiles, $source.symlinks, $source.onFailedAmbientModuleLookup, SyncMap__from_collections.$copy<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, ResolvedModule__from___go_module | undefined>> | undefined>($source.resolvedModules));
    }
    declare private readonly then?: never;
    static BindSourceFiles(r: {
        value: aliasResolver;
    } | undefined): void {
    }
    static CommonSourceDirectory(r: {
        value: aliasResolver;
    } | undefined): gostring {
        const __gotots_argument_3 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static FileExists(r: {
        value: aliasResolver;
    } | undefined, fileName: gostring): bool {
        const __gotots_argument_4 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetCurrentDirectory(r: {
        value: aliasResolver;
    } | undefined): gostring {
        const __gotots_receiver_1: aliasResolver["host"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        return goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_1).GetCurrentDirectory();
    }
    static GetDefaultResolutionModeForFile(r: {
        value: aliasResolver;
    } | undefined, file: HasFileName__from_ast | undefined): ModuleKind__from_core {
        return ModuleKindESNext$constant__from_core();
    }
    static GetEmitModuleFormatOfFile(r: {
        value: aliasResolver;
    } | undefined, sourceFile: HasFileName__from_ast | undefined): ModuleKind__from_core {
        return ModuleKindESNext$constant__from_core();
    }
    static GetEmitSyntaxForUsageLocation(r: {
        value: aliasResolver;
    } | undefined, sourceFile: HasFileName__from_ast | undefined, usageLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core {
        return ModuleKindESNext$constant__from_core();
    }
    static GetGlobalTypingsCacheLocation(r: {
        value: aliasResolver;
    } | undefined): gostring {
        const __gotots_argument_5 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetImpliedNodeFormatForEmit(r: {
        value: aliasResolver;
    } | undefined, sourceFile: HasFileName__from_ast | undefined): ModuleKind__from_core {
        return ModuleKindESNext$constant__from_core();
    }
    static GetImportHelpersImportSpecifier(r: {
        value: aliasResolver;
    } | undefined, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_argument_6 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetJSXRuntimeImportSpecifier(r: {
        value: aliasResolver;
    } | undefined, path: Path__from_tspath): [
        gostring,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
    ] {
        let moduleReference: gostring = "";
        let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_argument_7 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetModeForUsageLocation(r: {
        value: aliasResolver;
    } | undefined, file: HasFileName__from_ast | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core {
        return ModuleKindESNext$constant__from_core();
    }
    static GetNearestAncestorDirectoryWithPackageJson(r: {
        value: aliasResolver;
    } | undefined, dirname: gostring): gostring {
        const __gotots_argument_8 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetPackageJsonInfo(r: {
        value: aliasResolver;
    } | undefined, pkgJsonPath: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined {
        const __gotots_argument_9 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetPackagesMap(r: {
        value: aliasResolver;
    } | undefined): GoMapValue<gostring, bool> {
        return GoMap.nil<gostring, bool>(false);
    }
    static GetProjectReferenceFromOutputDts(r: {
        value: aliasResolver;
    } | undefined, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined {
        const __gotots_argument_10 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_10 === undefined ? GoPanicNilValue.create() : __gotots_argument_10);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetProjectReferenceFromSource(r: {
        value: aliasResolver;
    } | undefined, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined {
        const __gotots_argument_11 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetRedirectForResolution(r: {
        value: aliasResolver;
    } | undefined, file: HasFileName__from_ast | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        const __gotots_argument_12 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetRedirectTargets(r: {
        value: aliasResolver;
    } | undefined, path: Path__from_tspath): RuntimeSlice<gostring> {
        const __gotots_argument_13 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_13 === undefined ? GoPanicNilValue.create() : __gotots_argument_13);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetResolvedModule(r: {
        value: aliasResolver;
    } | undefined, currentSourceFile: HasFileName__from_ast | undefined, moduleReference: gostring, mode: ModuleKind__from_core): ResolvedModule__from___go_module | undefined {
        const __gotots_store_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "resolvedModules");
        const __gotots_receiver_2 = currentSourceFile;
        const __gotots_argument_14 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_2).Path();
        const __gotots_struct_0 = SyncMap__from_collections.$zero<ModeAwareCacheKey__from___go_module, ResolvedModule__from___go_module | undefined>();
        const __gotots_argument_15 = tsonicTypeScriptRuntime.location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, ResolvedModule__from___go_module | undefined>>(__gotots_struct_0);
        const __gotots_results_0 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named___go_module$ModeAwareCacheKey_And_PointerTo_Named___go_module$ResolvedModule(__gotots_receiver_3, __gotots_argument_14, __gotots_argument_15);
        let cache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, ResolvedModule__from___go_module | undefined>> | undefined = __gotots_results_0[0];
        {
            const __gotots_results_1 = SyncMap$Load$Named___go_module$ModeAwareCacheKey$PointerTo_Named___go_module$ResolvedModule(cache, ModeAwareCacheKey__from___go_module.$fromStorage({
                Name: moduleReference,
                Mode: mode
            }));
            let resolved__shadow_1: ResolvedModule__from___go_module | undefined = __gotots_results_1[0];
            let ok = __gotots_results_1[1];
            if (ok) {
                return resolved__shadow_1;
            }
        }
        const __gotots_receiver_5: aliasResolver["moduleResolver"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.moduleResolver;
        const __gotots_argument_16 = moduleReference;
        const __gotots_receiver_4 = currentSourceFile;
        const __gotots_argument_17 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_4).FileName();
        const __gotots_argument_18 = mode;
        const __gotots_argument_19 = void 0;
        const __gotots_results_2 = Resolver__from___go_module.ResolveModuleName(__gotots_receiver_5, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
        let resolved: ResolvedModule__from___go_module | undefined = __gotots_results_2[0];
        const __gotots_results_3 = SyncMap$LoadOrStore$Named___go_module$ModeAwareCacheKey$PointerTo_Named___go_module$ResolvedModule(cache, ModeAwareCacheKey__from___go_module.$fromStorage({
            Name: moduleReference,
            Mode: mode
        }), resolved);
        resolved = __gotots_results_3[0];
        if (!ResolvedModule__from___go_module.IsResolved(resolved) && !PathIsRelative__from_tspath(moduleReference)) {
            const __gotots_callee_1: aliasResolver["onFailedAmbientModuleLookup"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.onFailedAmbientModuleLookup;
            const __gotots_argument_20 = currentSourceFile;
            const __gotots_argument_21 = moduleReference;
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21);
        }
        return resolved;
    }
    static GetResolvedModuleFromModuleSpecifier(r: {
        value: aliasResolver;
    } | undefined, file: HasFileName__from_ast | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ResolvedModule__from___go_module | undefined {
        const __gotots_argument_22 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_22 === undefined ? GoPanicNilValue.create() : __gotots_argument_22);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetResolvedModules(r: {
        value: aliasResolver;
    } | undefined): GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<ResolvedModule__from___go_module | undefined>> {
        return $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedModule.nil();
    }
    static GetSourceFile(r: {
        value: aliasResolver;
    } | undefined, fileName: gostring): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        const __gotots_receiver_0: aliasResolver["host"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_argument_1 = fileName;
        const __gotots_callee_0: aliasResolver["toPath"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_0 = fileName;
        const __gotots_argument_2 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_0).GetSourceFile(__gotots_argument_1, __gotots_argument_2);
        if (file === undefined) {
            return void 0;
        }
        BindSourceFile__from_binder(file);
        return file;
    }
    static GetSourceFileForResolvedModule(r: {
        value: aliasResolver;
    } | undefined, fileName: gostring): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        return aliasResolver.GetSourceFile(r, fileName);
    }
    static GetSourceFileMetaData(r: {
        value: aliasResolver;
    } | undefined, path: Path__from_tspath): SourceFileMetaData__from_ast {
        const __gotots_argument_23 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_23 === undefined ? GoPanicNilValue.create() : __gotots_argument_23);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetSourceOfProjectReferenceIfOutputIncluded(r: {
        value: aliasResolver;
    } | undefined, file: HasFileName__from_ast | undefined): gostring {
        const __gotots_argument_24 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_24 === undefined ? GoPanicNilValue.create() : __gotots_argument_24);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static GetSymlinkCache(r: {
        value: aliasResolver;
    } | undefined): tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined {
        const __gotots_argument_25 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_25 === undefined ? GoPanicNilValue.create() : __gotots_argument_25);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static IsSourceFileDefaultLibrary(r: {
        value: aliasResolver;
    } | undefined, path: Path__from_tspath): bool {
        const __gotots_argument_26 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_26 === undefined ? GoPanicNilValue.create() : __gotots_argument_26);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Options(r: {
        value: aliasResolver;
    } | undefined): {
        value: CompilerOptions__from_core;
    } | undefined {
        const __gotots_field_0 = TSTrue$constant__from_core();
        const __gotots_struct_1 = CompilerOptions__from_core.$zero();
        __gotots_struct_1.NoCheck = __gotots_field_0;
        return { value: __gotots_struct_1 };
    }
    static SourceFileMayBeEmitted(r: {
        value: aliasResolver;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, forceDtsEmit: bool): bool {
        const __gotots_argument_27 = new GoInterfaceAdapter("unimplemented");
        GoPanic.raise(__gotots_argument_27 === undefined ? GoPanicNilValue.create() : __gotots_argument_27);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static SourceFiles(r: {
        value: aliasResolver;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFiles;
    }
    static UseCaseSensitiveFileNames(r: {
        value: aliasResolver;
    } | undefined): bool {
        const __gotots_receiver_6: aliasResolver["host"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_receiver_7 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_6).FS();
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).UseCaseSensitiveFileNames();
    }
}
export function newAliasResolver(rootFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, symlinks__shadow_1: GoMapValue<Path__from_tspath, pathAndFileName>, host: RegistryCloneHost | undefined, moduleResolver: {
    value: Resolver__from___go_module;
} | undefined, toPath: (($0: gostring) => Path__from_tspath) | undefined, onFailedAmbientModuleLookup: (($0: HasFileName__from_ast | undefined, $1: gostring) => void) | undefined): {
    value: aliasResolver;
} | undefined {
    let r: {
        value: aliasResolver;
    } | undefined = { value: new aliasResolver(toPath, host, moduleResolver, rootFiles, symlinks__shadow_1, onFailedAmbientModuleLookup, SyncMap__from_collections.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, ResolvedModule__from___go_module | undefined>> | undefined>()) };
    return r;
}
