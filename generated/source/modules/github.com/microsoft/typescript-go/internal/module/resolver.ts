import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ModuleKind as ModuleKind__from_core, Pattern$Storage as Pattern__from_core$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { JSONValue$Storage as JSONValue__from_packagejson$Storage, TypeValidatedField as TypeValidatedField__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { NodeResolutionFeatures, ResolutionHost, ResolvedProjectReference, extensions } from "./types.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { NewDiagnostic as NewDiagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, ModuleKindNone$constant as ModuleKindNone$constant__from_core, ModuleResolutionKindBundler$constant as ModuleResolutionKindBundler$constant__from_core, ModuleResolutionKindNode16$constant as ModuleResolutionKindNode16$constant__from_core, ModuleResolutionKindNodeNext$constant as ModuleResolutionKindNodeNext$constant__from_core, ModuleResolutionKind_String as ModuleResolutionKind_String__from_core, Pattern as Pattern__from_core, ResolutionModeCommonJS$constant as ResolutionModeCommonJS$constant__from_core, ResolutionModeESM$constant as ResolutionModeESM$constant__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TextRange as TextRange__from_core, TryParsePattern as TryParsePattern__from_core, Version as Version__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Expected as Expected__from_packagejson, ExportsOrImports as ExportsOrImports__from_packagejson, Fields as Fields__from_packagejson, InfoCacheEntry as InfoCacheEntry__from_packagejson, InfoCache as InfoCache__from_packagejson, JSONValueTypeArray$constant as JSONValueTypeArray$constant__from_packagejson, JSONValueTypeNotPresent$constant as JSONValueTypeNotPresent$constant__from_packagejson, JSONValueTypeNull$constant as JSONValueTypeNull$constant__from_packagejson, JSONValueTypeObject$constant as JSONValueTypeObject$constant__from_packagejson, JSONValueTypeString$constant as JSONValueTypeString$constant__from_packagejson, JSONValue as JSONValue__from_packagejson, PackageJson as PackageJson__from_packagejson, Parse as Parse__from_packagejson, VersionPaths as VersionPaths__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { HasPrefixAndSuffixWithoutOverlap as HasPrefixAndSuffixWithoutOverlap__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { $state as $state__tspath, ChangeExtension as ChangeExtension__from_tspath, ChangeFullExtension as ChangeFullExtension__from_tspath, CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ComparePaths as ComparePaths__from_tspath, ContainsPath as ContainsPath__from_tspath, EnsureTrailingDirectorySeparator as EnsureTrailingDirectorySeparator__from_tspath, ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionDcts$string as ExtensionDcts$string__from_tspath, ExtensionDmts$string as ExtensionDmts$string__from_tspath, ExtensionDts$string as ExtensionDts$string__from_tspath, ExtensionIsOneOf as ExtensionIsOneOf__from_tspath, ExtensionIsTs as ExtensionIsTs__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, ExtensionTsx$string as ExtensionTsx$string__from_tspath, FileExtensionIs as FileExtensionIs__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetPathComponents as GetPathComponents__from_tspath, GetPossibleOriginalInputExtensionForExtension as GetPossibleOriginalInputExtensionForExtension__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, HasImplementationTSFileExtension as HasImplementationTSFileExtension__from_tspath, HasTrailingDirectorySeparator as HasTrailingDirectorySeparator__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath, IsRootedDiskPath as IsRootedDiskPath__from_tspath, NormalizePath as NormalizePath__from_tspath, PathIsRelative as PathIsRelative__from_tspath, RemoveExtension as RemoveExtension__from_tspath, RemoveFileExtension as RemoveFileExtension__from_tspath, RemoveTrailingDirectorySeparator as RemoveTrailingDirectorySeparator__from_tspath, ResolvePath as ResolvePath__from_tspath, TryExtractTSExtension as TryExtractTSExtension__from_tspath, TryGetExtensionFromPath as TryGetExtensionFromPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Entries as Entries__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { ReadDirectory as ReadDirectory__from_vfsmatch, UnlimitedDepth$int as UnlimitedDepth$int__from_vfsmatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import { NewSetWithSizeHint$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetWithSizeHint.js";
import { OrderedMap$Entries$string$Named_packagejson$ExportsOrImports } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Get$string$Named_packagejson$ExportsOrImports } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$GetOrZero$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$GetOrZero.js";
import { OrderedMap$Keys$string$Named_packagejson$ExportsOrImports, OrderedMap$Keys$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Keys.js";
import { OrderedMap$Size$string$Named_packagejson$ExportsOrImports, OrderedMap$Size$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Clone$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Clone.js";
import { Concatenate$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Concatenate.js";
import { Deduplicate$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Deduplicate.js";
import { FindBestPatternMatch$Named_core$Pattern } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FindBestPatternMatch.js";
import { Identity$Named_core$Pattern } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { IfElse$Named___go_module$Ending, IfElse$PointerTo_Named_diagnostics$Message, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Expected$GetValue$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/packagejson/Expected$GetValue.js";
import { ForEachAncestorDirectory$PointerTo_Named___go_module$resolved } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tspath/ForEachAncestorDirectory.js";
import { ForEachAncestorDirectoryStoppingAtGlobalCache$PointerTo_Named_packagejson$InfoCacheEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tspath/ForEachAncestorDirectoryStoppingAtGlobalCache.js";
import { Keys$MapOf_string_To_string$string$string } from "../../../../../../support/generics/concretizations/maps/Keys.js";
import { AppendSeq$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/AppendSeq.js";
import { Contains$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { Equal$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Equal.js";
import { Sort$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Sort.js";
import { SortFunc$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$Named_core$ModuleResolutionKind, $goInterfaceAdapter$PointerTo_Named_packagejson$ExpectedOf_MapOf_string_To_string, $goInterfaceAdapter$PointerTo_Named_packagejson$ExpectedOf_string, $goInterfaceAdapter$bool, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { caches, getRedirectConfigName, moduleResolutionCache, moduleResolutionCacheKey, newCaches, typeRefDirectiveResolutionCache, typeRefDirectiveResolutionCacheKey } from "./cache.js";
import { NodeResolutionFeaturesAll$constant, NodeResolutionFeaturesBundlerDefault$constant, NodeResolutionFeaturesExports$constant, NodeResolutionFeaturesExportsPatternTrailers$constant, NodeResolutionFeaturesImports$constant, NodeResolutionFeaturesImportsPatternRoot$constant, NodeResolutionFeaturesNode16Default$constant, NodeResolutionFeaturesNodeNextDefault$constant, NodeResolutionFeaturesNone$constant, NodeResolutionFeaturesSelfName$constant, PackageId, ResolvedModule, ResolvedTypeReferenceDirective, extensionsDeclaration$constant, extensionsImplementationFiles$constant, extensionsJavaScript$constant, extensionsJson$constant, extensionsTypeScript$constant, extensions_Array, extensions_String } from "./types.js";
import { ComparePatternKeys, InferredTypesContainingFile$string, IsApplicableVersionedTypesKey, MangleScopedPackageName, ParseNodeModuleFromPath, ParsePackageName, TryGetJSExtensionForFile } from "./util.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class resolved {
    declare private readonly $goType: void;
    public constructor(public path: gostring, public extension: gostring, public packageId: PackageId, public originalPath: gostring, public resolvedUsingTsExtension: bool) {
    }
    declare private readonly then?: never;
    static $go$private$__go_module$isResolved(r: resolved | undefined): bool {
        return !(r === undefined) && (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path !== "";
    }
    static $go$private$__go_module$shouldContinueSearching(r: resolved | undefined): bool {
        return r === undefined;
    }
}
export function continueSearching(): resolved | undefined {
    return void 0;
}
export function unresolved(): resolved | undefined {
    return new resolved("", "", PackageId.$zero(), "", false);
}
export class tracer {
    declare private readonly $goType: void;
    public constructor(public traces: RuntimeSlice<DiagAndArgs$Storage>) {
    }
    declare private readonly then?: never;
    static $go$private$__go_module$getTraces(t: tracer | undefined): RuntimeSlice<DiagAndArgs$Storage> {
        if (!(t === undefined)) {
            return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).traces;
        }
        return RuntimeSlice.nil<DiagAndArgs$Storage>();
    }
    static $go$private$__go_module$traceResolutionUsingProjectReference(r: tracer | undefined, redirectedReference: ResolvedProjectReference | undefined): void {
        let __gotots_logical_result_0 = !(redirectedReference === undefined);
        if (__gotots_logical_result_0) {
            const __gotots_receiver_5 = redirectedReference;
            __gotots_logical_result_0 = !(goInterfaceNonNil<ResolvedProjectReference>(__gotots_receiver_5).CompilerOptions() === undefined);
        }
        if (__gotots_logical_result_0) {
            const __gotots_receiver_7 = r;
            const __gotots_argument_10 = $state__diagnostics.Using_compiler_options_of_project_reference_redirect_0;
            const __gotots_receiver_6 = redirectedReference;
            const __gotots_argument_9 = new GoInterfaceAdapter(goInterfaceNonNil<ResolvedProjectReference>(__gotots_receiver_6).ConfigName());
            const __gotots_argument_11 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_9]);
            tracer.$go$private$__go_module$write(__gotots_receiver_7, __gotots_argument_10, __gotots_argument_11);
        }
    }
    static $go$private$__go_module$traceTypeReferenceDirectiveResult(r: tracer | undefined, typeReferenceDirectiveName: gostring, result: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective> | undefined): void {
        if (!ResolvedTypeReferenceDirective.IsResolved(result)) {
            tracer.$go$private$__go_module$write(r, $state__diagnostics.Type_reference_directive_0_was_not_resolved, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typeReferenceDirectiveName)]));
        }
        else if (PackageId.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective>).value.PackageId).Name !== "") {
            const __gotots_receiver_36 = r;
            const __gotots_argument_40 = $state__diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_with_Package_ID_2_primary_Colon_3;
            const __gotots_argument_36 = new GoInterfaceAdapter(typeReferenceDirectiveName);
            const __gotots_argument_37 = new GoInterfaceAdapter(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective>).value.ResolvedFileName);
            const __gotots_store_9 = ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective>).value;
            const __gotots_argument_38 = new GoInterfaceAdapter(PackageId.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "PackageId")));
            const __gotots_argument_39 = new $goInterfaceAdapter$bool(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective>).value.Primary);
            const __gotots_argument_41 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_36, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39]);
            tracer.$go$private$__go_module$write(__gotots_receiver_36, __gotots_argument_40, __gotots_argument_41);
        }
        else {
            tracer.$go$private$__go_module$write(r, $state__diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typeReferenceDirectiveName), new GoInterfaceAdapter(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective>).value.ResolvedFileName), new $goInterfaceAdapter$bool(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective>).value.Primary)]));
        }
    }
    static $go$private$__go_module$write(t: tracer | undefined, diag: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        if (!(t === undefined)) {
            const __gotots_slice_build_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).traces;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void DiagAndArgs.$storageOf, (void DiagAndArgs.$fromStorage,
                    {
                        Message: diag,
                        Args: args
                    })));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<DiagAndArgs$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, DiagAndArgs.$storageOf(DiagAndArgs.$copy(DiagAndArgs.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void DiagAndArgs.$storageOf, (void DiagAndArgs.$fromStorage,
                    {
                        Message: diag,
                        Args: args
                    })));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, DiagAndArgs.$zeroStorage());
                }
            }
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).traces = __gotots_slice_build_1;
        }
    }
}
export type DiagAndArgs$Storage = {
    Message: {
        value: Message__from_diagnostics;
    } | undefined;
    Args: RuntimeSlice<GoInterface | undefined>;
};
export class DiagAndArgs {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: DiagAndArgs$Storage) {
    }
    public static $storageOf($source: DiagAndArgs): DiagAndArgs$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: DiagAndArgs$Storage): DiagAndArgs {
        return new DiagAndArgs($source);
    }
    public get Message(): {
        value: Message__from_diagnostics;
    } | undefined {
        return this.$storage.Message;
    }
    public set Message($value: {
        value: Message__from_diagnostics;
    } | undefined) {
        this.$storage.Message = $value;
    }
    public get Args(): RuntimeSlice<GoInterface | undefined> {
        return this.$storage.Args;
    }
    public set Args($value: RuntimeSlice<GoInterface | undefined>) {
        this.$storage.Args = $value;
    }
    static $copy($source: DiagAndArgs): DiagAndArgs {
        return new DiagAndArgs({
            Message: $source.$storage.Message,
            Args: $source.$storage.Args
        });
    }
    static $zeroStorage(): DiagAndArgs$Storage {
        return {
            Message: void 0,
            Args: RuntimeSlice.nil<GoInterface | undefined>()
        };
    }
    declare private readonly then?: never;
}
export class resolutionState {
    declare private readonly $goType: void;
    public constructor(public resolver: {
        value: Resolver;
    } | undefined, public tracer: tracer | undefined, public name: gostring, public containingDirectory: gostring, public isConfigLookup: bool, public features: NodeResolutionFeatures, public esmMode: bool, public conditions: RuntimeSlice<gostring>, public extensions: extensions, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public resolvePackageDirectoryOnly: bool, public candidateEndingIsFromConfig: bool, public resolvedPackageDirectory: bool, public diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public parsedPatternsForPathsOnce: sync__from_gostdlib.Once, public parsedPatternsForPaths: {
        value: ParsedPatterns;
    } | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$__go_module$conditionMatches(r: resolutionState | undefined, condition: gostring): bool {
        if (condition === "default" || Contains$SliceOf_string$string((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions, condition)) {
            return true;
        }
        if (!Contains$SliceOf_string$string((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions, "types")) {
            return false;
        }
        return IsApplicableVersionedTypesKey(condition);
    }
    static $go$private$__go_module$createResolvedModule(r: resolutionState | undefined, resolved__shadow_1: resolved | undefined, isExternalLibraryImport: bool): tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined {
        let resolvedModule = ResolvedModule.$zero();
        const resolvedModule$location = tsonicTypeScriptRuntime.boundLocation({}, () => resolvedModule, resolvedModule$next => resolvedModule = resolvedModule$next);
        resolvedModule.ResolutionDiagnostics = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).diagnostics;
        if (!(resolved__shadow_1 === undefined)) {
            resolvedModule.ResolvedFileName = (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path;
            resolvedModule.OriginalPath = (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalPath;
            resolvedModule.IsExternalLibraryImport = isExternalLibraryImport;
            resolvedModule.ResolvedUsingTsExtension = (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolvedUsingTsExtension;
            resolvedModule.Extension = (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extension;
            resolvedModule.PackageId = PackageId.$copy((resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId);
        }
        return resolvedModule$location;
    }
    static $go$private$__go_module$createResolvedModuleHandlingSymlink(r: resolutionState | undefined, resolved__shadow_1: resolved | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined {
        let isExternalLibraryImport = !(resolved__shadow_1 === undefined) && strings__from_gostdlib.Contains((resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, "/node_modules/");
        if (!(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveSymlinks === TSTrue$constant__from_core()) && isExternalLibraryImport && (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalPath === "" && !IsExternalModuleNameRelative__from_tspath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name)) {
            const __gotots_results_3 = resolutionState.$go$private$__go_module$getOriginalAndResolvedFileName(r, (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path);
            let originalPath = __gotots_results_3[0];
            let resolvedFileName = __gotots_results_3[1];
            if (originalPath !== "") {
                (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path = resolvedFileName;
                (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalPath = originalPath;
            }
        }
        return resolutionState.$go$private$__go_module$createResolvedModule(r, resolved__shadow_1, isExternalLibraryImport);
    }
    static $go$private$__go_module$createResolvedTypeReferenceDirective(r: resolutionState | undefined, resolved__shadow_1: resolved | undefined, primary: bool): tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective> | undefined {
        let resolvedTypeReferenceDirective = ResolvedTypeReferenceDirective.$zero();
        const resolvedTypeReferenceDirective$location = tsonicTypeScriptRuntime.boundLocation({}, () => resolvedTypeReferenceDirective, resolvedTypeReferenceDirective$next => resolvedTypeReferenceDirective = resolvedTypeReferenceDirective$next);
        resolvedTypeReferenceDirective.ResolutionDiagnostics = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).diagnostics;
        if (resolved.$go$private$__go_module$isResolved(resolved__shadow_1)) {
            if (!ExtensionIsTs__from_tspath((resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extension)) {
                const __gotots_argument_61 = new GoInterfaceAdapter("expected a TypeScript file extension");
                GoPanic.raise(__gotots_argument_61 === undefined ? GoPanicNilValue.create() : __gotots_argument_61);
            }
            resolvedTypeReferenceDirective.ResolvedFileName = (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path;
            resolvedTypeReferenceDirective.Primary = primary;
            resolvedTypeReferenceDirective.PackageId = PackageId.$copy((resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId);
            resolvedTypeReferenceDirective.IsExternalLibraryImport = strings__from_gostdlib.Contains((resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, "/node_modules/");
            if (!(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveSymlinks === TSTrue$constant__from_core())) {
                const __gotots_results_21 = resolutionState.$go$private$__go_module$getOriginalAndResolvedFileName(r, (resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path);
                let originalPath = __gotots_results_21[0];
                let resolvedFileName = __gotots_results_21[1];
                if (originalPath !== "") {
                    resolvedTypeReferenceDirective.ResolvedFileName = resolvedFileName;
                    resolvedTypeReferenceDirective.OriginalPath = originalPath;
                }
            }
        }
        return resolvedTypeReferenceDirective$location;
    }
    static $go$private$__go_module$getCandidateFromTypeRoot(r: resolutionState | undefined, typeRoot: gostring): gostring {
        let nameForLookup = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name;
        if (strings__from_gostdlib.HasSuffix(typeRoot, "/node_modules/@types") || strings__from_gostdlib.HasSuffix(typeRoot, "/node_modules/@types/")) {
            nameForLookup = resolutionState.$go$private$__go_module$mangleScopedPackageName(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name);
        }
        return CombinePaths__from_tspath(typeRoot, RuntimeSlice.literal<gostring>([nameForLookup]));
    }
    static $go$private$__go_module$getMatchedStarForPatternEntrypoint(r: resolutionState | undefined, file: gostring, leadingSlice: gostring, trailingSlice: gostring, caseSensitive: bool): [
        gostring,
        bool
    ] {
        if (HasPrefixAndSuffixWithoutOverlap__from_stringutil(file, leadingSlice, trailingSlice, caseSensitive)) {
            return [goStringSlice(file, leadingSlice.length, file.length - trailingSlice.length), true];
        }
        {
            let jsExtension = TryGetJSExtensionForFile(file, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions);
            if (jsExtension.length > 0) {
                let swapped = ChangeFullExtension__from_tspath(file, jsExtension);
                if (HasPrefixAndSuffixWithoutOverlap__from_stringutil(swapped, leadingSlice, trailingSlice, caseSensitive)) {
                    return [goStringSlice(swapped, leadingSlice.length, swapped.length - trailingSlice.length), true];
                }
            }
        }
        return ["", false];
    }
    static $go$private$__go_module$getOriginalAndResolvedFileName(r: resolutionState | undefined, fileName: gostring): [
        gostring,
        gostring
    ] {
        let resolvedFileName = resolutionState.$go$private$__go_module$realPath(r, fileName);
        const __gotots_receiver_39: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_receiver_40 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_39).FS();
        const __gotots_field_3 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_40).UseCaseSensitiveFileNames();
        const __gotots_receiver_41: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_field_4 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_41).GetCurrentDirectory();
        let comparePathsOptions = new ComparePathsOptions__from_tspath(__gotots_field_3, __gotots_field_4);
        if (ComparePaths__from_tspath(fileName, resolvedFileName, ComparePathsOptions__from_tspath.$copy(comparePathsOptions)) === 0) {
            return ["", fileName];
        }
        return [fileName, resolvedFileName];
    }
    static $go$private$__go_module$getOutputDirectoriesForBaseDirectory(r: resolutionState | undefined, commonSourceDirGuess: gostring): RuntimeSlice<gostring> {
        const __gotots_argument_98 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "";
        const __gotots_receiver_78: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_argument_99 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_78).GetCurrentDirectory();
        const __gotots_argument_100 = commonSourceDirGuess;
        let currentDir = IfElse$string(__gotots_argument_98, __gotots_argument_99, __gotots_argument_100);
        let candidateDirectories = RuntimeSlice.nil<gostring>();
        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir !== "") {
            const __gotots_argument_103 = candidateDirectories;
            const __gotots_argument_101 = CombinePaths__from_tspath(currentDir, RuntimeSlice.literal<gostring>([((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir]));
            const __gotots_receiver_79: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_argument_102 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_79).GetCurrentDirectory();
            const __gotots_argument_104 = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_101, __gotots_argument_102);
            candidateDirectories = __gotots_argument_103.append("", [__gotots_argument_104]);
        }
        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== "" && ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir) {
            const __gotots_argument_107 = candidateDirectories;
            const __gotots_argument_105 = CombinePaths__from_tspath(currentDir, RuntimeSlice.literal<gostring>([((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir]));
            const __gotots_receiver_80: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_argument_106 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_80).GetCurrentDirectory();
            const __gotots_argument_108 = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_105, __gotots_argument_106);
            candidateDirectories = __gotots_argument_107.append("", [__gotots_argument_108]);
        }
        return candidateDirectories;
    }
    static $go$private$__go_module$getPackageFile(r: resolutionState | undefined, extensions__shadow_1: extensions, packageInfo: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined): [
        gostring,
        bool
    ] {
        if (!InfoCacheEntry__from_packagejson.Exists(packageInfo)) {
            return ["", false];
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isConfigLookup) {
            const __gotots_receiver_59 = r;
            const __gotots_argument_69 = "tsconfig";
            const __gotots_store_15 = ((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields;
            const __gotots_argument_70 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "TSConfig");
            const __gotots_argument_71: InfoCacheEntry__from_packagejson["PackageDirectory"] = (packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
            return resolutionState.$go$private$__go_module$getPackageJSONPathField(__gotots_receiver_59, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71);
        }
        if (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0)) {
            {
                const __gotots_receiver_60 = r;
                const __gotots_argument_72 = "typings";
                const __gotots_store_16 = ((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields;
                const __gotots_argument_73 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Typings");
                const __gotots_argument_74: InfoCacheEntry__from_packagejson["PackageDirectory"] = (packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
                const __gotots_results_26 = resolutionState.$go$private$__go_module$getPackageJSONPathField(__gotots_receiver_60, __gotots_argument_72, __gotots_argument_73, __gotots_argument_74);
                let packageFile = __gotots_results_26[0];
                let ok = __gotots_results_26[1];
                if (ok) {
                    return [packageFile, ok];
                }
            }
            {
                const __gotots_receiver_61 = r;
                const __gotots_argument_75 = "types";
                const __gotots_store_17 = ((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields;
                const __gotots_argument_76 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "Types");
                const __gotots_argument_77: InfoCacheEntry__from_packagejson["PackageDirectory"] = (packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
                const __gotots_results_27 = resolutionState.$go$private$__go_module$getPackageJSONPathField(__gotots_receiver_61, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77);
                let packageFile = __gotots_results_27[0];
                let ok = __gotots_results_27[1];
                if (ok) {
                    return [packageFile, ok];
                }
            }
        }
        if (!((extensions__shadow_1 & (7)) === 0)) {
            const __gotots_receiver_62 = r;
            const __gotots_argument_78 = "main";
            const __gotots_store_18 = ((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields;
            const __gotots_argument_79 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "Main");
            const __gotots_argument_80: InfoCacheEntry__from_packagejson["PackageDirectory"] = (packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
            return resolutionState.$go$private$__go_module$getPackageJSONPathField(__gotots_receiver_62, __gotots_argument_78, __gotots_argument_79, __gotots_argument_80);
        }
        return ["", false];
    }
    static $go$private$__go_module$getPackageId(r: resolutionState | undefined, resolvedFileName: gostring, packageInfo: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined): PackageId {
        if (InfoCacheEntry__from_packagejson.Exists(packageInfo)) {
            let packageJsonContent: {
                value: PackageJson__from_packagejson;
            } | undefined = (packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents;
            {
                const __gotots_store_11 = (packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields;
                const __gotots_results_17 = Expected$GetValue$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Name"));
                let name = __gotots_results_17[0];
                let ok = __gotots_results_17[1];
                if (ok) {
                    {
                        const __gotots_store_12 = (packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields;
                        const __gotots_results_18 = Expected$GetValue$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Version"));
                        let version = __gotots_results_18[0];
                        let ok__shadow_1 = __gotots_results_18[1];
                        if (ok__shadow_1) {
                            let subModuleName = "";
                            if (resolvedFileName.length > (packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory.length) {
                                subModuleName = goStringSlice(resolvedFileName, (packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory.length + 1);
                            }
                            return PackageId.$fromStorage({
                                Name: name,
                                Version: version,
                                SubModuleName: subModuleName,
                                PeerDependencies: resolutionState.$go$private$__go_module$readPackageJsonPeerDependencies(r, packageInfo)
                            });
                        }
                    }
                }
            }
        }
        return PackageId.$fromStorage({
            Name: "",
            SubModuleName: "",
            Version: "",
            PeerDependencies: ""
        });
    }
    static $go$private$__go_module$getPackageJSONPathField(r: resolutionState | undefined, fieldName: gostring, field: tsonicTypeScriptRuntime.Location<Expected__from_packagejson<gostring>> | undefined, directory: gostring): [
        gostring,
        bool
    ] {
        if (!resolutionState.$go$private$__go_module$validatePackageJSONField(r, fieldName, new $goInterfaceAdapter$PointerTo_Named_packagejson$ExpectedOf_string(field))) {
            return ["", false];
        }
        if (Expected__from_packagejson.$storageOf(((field ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected__from_packagejson<gostring>>).value).Value === "") {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_had_a_falsy_0_field, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fieldName)]));
            }
            return ["", false];
        }
        let path = NormalizePath__from_tspath(CombinePaths__from_tspath(directory, RuntimeSlice.literal<gostring>([Expected__from_packagejson.$storageOf(((field ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected__from_packagejson<gostring>>).value).Value])));
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_has_0_field_1_that_references_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fieldName), new GoInterfaceAdapter(Expected__from_packagejson.$storageOf(((field ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected__from_packagejson<gostring>>).value).Value), new GoInterfaceAdapter(path)]));
        }
        return [path, true];
    }
    static $go$private$__go_module$getPackageJsonInfo(r: resolutionState | undefined, packageDirectory: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined {
        let packageJsonPath = CombinePaths__from_tspath(packageDirectory, RuntimeSlice.literal<gostring>(["package.json"]));
        {
            let existing: {
                value: InfoCacheEntry__from_packagejson;
            } | undefined = InfoCache__from_packagejson.Get(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches.packageJsonInfoCache, packageJsonPath);
            if (!(existing === undefined)) {
                if (!((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents === undefined)) {
                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.File_0_exists_according_to_earlier_cached_lookups, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(packageJsonPath)]));
                    }
                    return InfoCacheEntry__from_packagejson.WithPackageDirectory(existing, packageDirectory);
                }
                else {
                    if ((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DirectoryExists && !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.File_0_does_not_exist_according_to_earlier_cached_lookups, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(packageJsonPath)]));
                    }
                    return void 0;
                }
            }
        }
        const __gotots_receiver_42: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_receiver_43 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_42).FS();
        const __gotots_argument_47 = packageDirectory;
        let directoryExists = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_43).DirectoryExists(__gotots_argument_47);
        let __gotots_logical_result_4 = directoryExists;
        if (__gotots_logical_result_4) {
            const __gotots_receiver_44: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_45 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_44).FS();
            const __gotots_argument_48 = packageJsonPath;
            __gotots_logical_result_4 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_45).FileExists(__gotots_argument_48);
        }
        if (__gotots_logical_result_4) {
            const __gotots_receiver_46: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_47 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_46).FS();
            const __gotots_argument_49 = packageJsonPath;
            const __gotots_results_15 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_47).ReadFile(__gotots_argument_49);
            let contents = __gotots_results_15[0];
            const __gotots_conversion_3 = contents;
            const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
            }
            const __gotots_argument_50 = __gotots_conversion_4;
            const __gotots_results_16 = Parse__from_packagejson(__gotots_argument_50);
            let packageJsonContent = __gotots_results_16[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_16[1];
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Found_package_json_at_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(packageJsonPath)]));
            }
            const __gotots_field_7 = packageDirectory;
            const __gotots_field_8 = true;
            const __gotots_field_5 = Fields__from_packagejson.$copy(packageJsonContent);
            const __gotots_field_6 = err === undefined;
            const __gotots_struct_1 = PackageJson__from_packagejson.$zero();
            __gotots_struct_1.Fields = __gotots_field_5;
            __gotots_struct_1.Parseable = __gotots_field_6;
            const __gotots_field_9 = { value: __gotots_struct_1 };
            let result: {
                value: InfoCacheEntry__from_packagejson;
            } | undefined = { value: new InfoCacheEntry__from_packagejson(__gotots_field_7, __gotots_field_8, __gotots_field_9) };
            result = InfoCache__from_packagejson.Set(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches.packageJsonInfoCache, packageJsonPath, result);
            return InfoCacheEntry__from_packagejson.WithPackageDirectory(result, packageDirectory);
        }
        else {
            if (directoryExists && !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.File_0_does_not_exist, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(packageJsonPath)]));
            }
            InfoCache__from_packagejson.Set(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches.packageJsonInfoCache, packageJsonPath, { value: new InfoCacheEntry__from_packagejson(packageDirectory, directoryExists, void 0) });
        }
        return void 0;
    }
    static $go$private$__go_module$getPackageScopeForPath(r: resolutionState | undefined, directory: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined {
        let result: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = ForEachAncestorDirectoryStoppingAtGlobalCache$PointerTo_Named_packagejson$InfoCacheEntry(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation, directory, (directory__shadow_1: gostring): [
            {
                value: InfoCacheEntry__from_packagejson;
            } | undefined,
            bool
        ] => {
            {
                let result__shadow_1: {
                    value: InfoCacheEntry__from_packagejson;
                } | undefined = resolutionState.$go$private$__go_module$getPackageJsonInfo(r, directory__shadow_1);
                if (!(result__shadow_1 === undefined)) {
                    return [result__shadow_1, true];
                }
            }
            return [void 0, false];
        });
        return result;
    }
    static $go$private$__go_module$getParsedPatternsForPaths(r: resolutionState | undefined): {
        value: ParsedPatterns;
    } | undefined {
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions) {
            return Resolver.$go$private$__go_module$getParsedPatternsForPaths((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver);
        }
        sync__from_gostdlib.Once.Do((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parsedPatternsForPathsOnce, (): void => {
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parsedPatternsForPaths = TryParsePatterns(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths);
        });
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parsedPatternsForPaths;
    }
    static $go$private$__go_module$getTraceFunc(r: resolutionState | undefined): (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<GoInterface | undefined>) => void) | undefined {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            const __gotots_receiver_52 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer;
            return ($argument0: {
                value: Message__from_diagnostics;
            } | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): void => {
                tracer.$go$private$__go_module$write(__gotots_receiver_52, $argument0, $argument1);
            };
        }
        return void 0;
    }
    static $go$private$__go_module$loadEntrypointsFromExportMap(r: resolutionState | undefined, packageJson: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, packageName: gostring, exports: ExportsOrImports__from_packagejson): RuntimeSlice<ResolvedEntrypoint | undefined> {
        let loadEntrypointsFromTargetExports: (($0: gostring, $1: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $2: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $3: ExportsOrImports__from_packagejson) => void) | undefined;
        let entrypoints = RuntimeSlice.nil<ResolvedEntrypoint | undefined>();
        loadEntrypointsFromTargetExports = (subpath: gostring, includeConditions: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, excludeConditions: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, exports__shadow_1: ExportsOrImports__from_packagejson): void => {
            if ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue)).Type === JSONValueTypeString$constant__from_packagejson() && strings__from_gostdlib.HasPrefix(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString(), "./")) {
                if (strings__from_gostdlib.ContainsRune(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString(), 42)) {
                    if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString(), 42))) !== globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString(), 42)))) {
                        return;
                    }
                    let patternPath = ResolvePath__from_tspath((packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory, RuntimeSlice.literal<gostring>([JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString()]));
                    const __gotots_results_32 = strings__from_gostdlib.Cut(patternPath, "*");
                    let leadingSlice = __gotots_results_32[0];
                    let trailingSlice = __gotots_results_32[1];
                    const __gotots_receiver_88: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                    const __gotots_receiver_89 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_88).FS();
                    let caseSensitive = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_89).UseCaseSensitiveFileNames();
                    const __gotots_receiver_90: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                    const __gotots_argument_119 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_90).FS();
                    const __gotots_receiver_91: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                    const __gotots_argument_120 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_91).GetCurrentDirectory();
                    const __gotots_argument_121: InfoCacheEntry__from_packagejson["PackageDirectory"] = (packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
                    const __gotots_argument_122 = extensions_Array((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions);
                    const __gotots_argument_123 = RuntimeSlice.nil<gostring>();
                    const __gotots_argument_124 = RuntimeSlice.literal<gostring>([ChangeFullExtension__from_tspath(strings__from_gostdlib.Replace(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString(), "*", "**/*", BigInt.asIntN(64, goNumberToBigInt(1))), ".*")]);
                    const __gotots_argument_125 = UnlimitedDepth$int__from_vfsmatch;
                    let files = ReadDirectory__from_vfsmatch(__gotots_argument_119, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123, __gotots_argument_124, __gotots_argument_125);
                    const __gotots_range_20 = files;
                    for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_20.length; __gotots_range_index_16++) {
                        const __gotots_range_value_20 = __gotots_range_20.get(__gotots_range_index_16);
                        let file = __gotots_range_value_20;
                        const __gotots_results_33 = resolutionState.$go$private$__go_module$getMatchedStarForPatternEntrypoint(r, file, leadingSlice, trailingSlice, caseSensitive);
                        let matchedStar = __gotots_results_33[0];
                        let ok = __gotots_results_33[1];
                        if (!ok) {
                            continue;
                        }
                        let moduleSpecifier = ResolvePath__from_tspath(packageName, RuntimeSlice.literal<gostring>([strings__from_gostdlib.Replace(subpath, "*", matchedStar, BigInt.asIntN(64, goNumberToBigInt(1)))]));
                        entrypoints = entrypoints.append(void 0, [Resolver.$go$private$__go_module$createResolvedEntrypointHandlingSymlink((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver, file, moduleSpecifier, includeConditions, excludeConditions, IfElse$Named___go_module$Ending(strings__from_gostdlib.HasSuffix(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString(), "*"), EndingExtensionChangeable$constant(), EndingFixed$constant()))]);
                    }
                }
                else {
                    let partsAfterFirst = GetPathComponents__from_tspath(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString(), "").slice(2, null, null);
                    if (Contains$SliceOf_string$string(partsAfterFirst, "..") || Contains$SliceOf_string$string(partsAfterFirst, ".") || Contains$SliceOf_string$string(partsAfterFirst, "node_modules")) {
                        return;
                    }
                    let resolvedTarget = ResolvePath__from_tspath((packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory, RuntimeSlice.literal<gostring>([JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString()]));
                    {
                        let result: resolved | undefined = resolutionState.$go$private$__go_module$loadFileNameFromPackageJSONField(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions, resolvedTarget, JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString());
                        if (resolved.$go$private$__go_module$isResolved(result)) {
                            entrypoints = entrypoints.append(void 0, [Resolver.$go$private$__go_module$createResolvedEntrypointHandlingSymlink((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, ResolvePath__from_tspath(packageName, RuntimeSlice.literal<gostring>([subpath])), includeConditions, excludeConditions, IfElse$Named___go_module$Ending(strings__from_gostdlib.HasSuffix(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue).AsString(), "*"), EndingExtensionChangeable$constant(), EndingFixed$constant()))]);
                        }
                    }
                }
            }
            else if ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue)).Type === JSONValueTypeArray$constant__from_packagejson()) {
                const __gotots_range_21 = exports__shadow_1.AsArray();
                for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_21.length; __gotots_range_index_17++) {
                    const __gotots_range_value_21 = ExportsOrImports__from_packagejson.$copy(ExportsOrImports__from_packagejson.$fromStorage(__gotots_range_21.get(__gotots_range_index_17)));
                    let element = __gotots_range_value_21;
                    const __gotots_callee_7 = loadEntrypointsFromTargetExports;
                    const __gotots_argument_126 = subpath;
                    const __gotots_argument_127 = includeConditions;
                    const __gotots_argument_128 = excludeConditions;
                    const __gotots_argument_129 = ExportsOrImports__from_packagejson.$copy(element);
                    (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_126, __gotots_argument_127, __gotots_argument_128, __gotots_argument_129);
                }
            }
            else if ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(exports__shadow_1).JSONValue)).Type === JSONValueTypeObject$constant__from_packagejson()) {
                let prevConditions = RuntimeSlice.nil<gostring>();
                const __gotots_range_22 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Named_packagejson$ExportsOrImports(exports__shadow_1.AsObject()));
                if (__gotots_range_22 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_4 = 1;
                __gotots_range_22(($argument0: gostring, $argument1: ExportsOrImports__from_packagejson): bool => {
                    if (__gotots_range_state_4 === 0) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    if (__gotots_range_state_4 === -1) {
                        GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                    }
                    if (__gotots_range_state_4 === -2) {
                        GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                    }
                    if (__gotots_range_state_4 === 2) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    __gotots_range_state_4 = -1;
                    const __gotots_range_value_22 = $argument0;
                    const __gotots_range_value_23 = ExportsOrImports__from_packagejson.$copy($argument1);
                    let condition = __gotots_range_value_22;
                    let __go_export = __gotots_range_value_23;
                    if (!(excludeConditions === undefined) && Set__from_collections.Has<gostring>(excludeConditions, condition)) {
                        __gotots_range_state_4 = 1;
                        return true;
                    }
                    let conditionAlwaysMatches = condition === "default" || condition === "types" || IsApplicableVersionedTypesKey(condition);
                    let newIncludeConditions: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = includeConditions;
                    if (!conditionAlwaysMatches) {
                        newIncludeConditions = Set$Clone$string(includeConditions);
                        excludeConditions = Set$Clone$string(excludeConditions);
                        if (newIncludeConditions === undefined) {
                            newIncludeConditions =
                                tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                                    M: GoMap.nil()
                                }));
                        }
                        Set$Add$string(newIncludeConditions, condition);
                        const __gotots_range_23 = prevConditions;
                        for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_23.length; __gotots_range_index_18++) {
                            const __gotots_range_value_24 = __gotots_range_23.get(__gotots_range_index_18);
                            let prevCondition = __gotots_range_value_24;
                            if (excludeConditions === undefined) {
                                excludeConditions =
                                    tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                                        M: GoMap.nil()
                                    }));
                            }
                            Set$Add$string(excludeConditions, prevCondition);
                        }
                    }
                    prevConditions = prevConditions.append("", [condition]);
                    const __gotots_callee_8 = loadEntrypointsFromTargetExports;
                    const __gotots_argument_130 = subpath;
                    const __gotots_argument_131 = newIncludeConditions;
                    const __gotots_argument_132 = excludeConditions;
                    const __gotots_argument_133 = ExportsOrImports__from_packagejson.$copy(__go_export);
                    (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_130, __gotots_argument_131, __gotots_argument_132, __gotots_argument_133);
                    if (conditionAlwaysMatches) {
                        __gotots_range_state_4 = 0;
                        return false;
                    }
                    __gotots_range_state_4 = 1;
                    return true;
                });
                if (__gotots_range_state_4 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_4 = -2;
            }
        };
        switch ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
            ExportsOrImports__from_packagejson.$storageOf(exports).JSONValue)).Type) {
            case JSONValueTypeArray$constant__from_packagejson(): {
                const __gotots_range_24 = exports.AsArray();
                for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_24.length; __gotots_range_index_19++) {
                    const __gotots_range_value_25 = ExportsOrImports__from_packagejson.$copy(ExportsOrImports__from_packagejson.$fromStorage(__gotots_range_24.get(__gotots_range_index_19)));
                    let element = __gotots_range_value_25;
                    const __gotots_callee_9 = loadEntrypointsFromTargetExports;
                    const __gotots_argument_134 = ".";
                    const __gotots_argument_135 = void 0;
                    const __gotots_argument_136 = void 0;
                    const __gotots_argument_137 = ExportsOrImports__from_packagejson.$copy(element);
                    (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_134, __gotots_argument_135, __gotots_argument_136, __gotots_argument_137);
                }
                break;
            }
            case JSONValueTypeObject$constant__from_packagejson(): {
                if (exports.IsSubpaths()) {
                    const __gotots_range_25 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Named_packagejson$ExportsOrImports(exports.AsObject()));
                    if (__gotots_range_25 === void 0) {
                        GoPanic.raiseRuntime("call of nil function");
                    }
                    let __gotots_range_state_5 = 1;
                    __gotots_range_25(($argument0: gostring, $argument1: ExportsOrImports__from_packagejson): bool => {
                        if (__gotots_range_state_5 === 0) {
                            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                        }
                        if (__gotots_range_state_5 === -1) {
                            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                        }
                        if (__gotots_range_state_5 === -2) {
                            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                        }
                        if (__gotots_range_state_5 === 2) {
                            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                        }
                        __gotots_range_state_5 = -1;
                        const __gotots_range_value_26 = $argument0;
                        const __gotots_range_value_27 = ExportsOrImports__from_packagejson.$copy($argument1);
                        let subpath = __gotots_range_value_26;
                        let __go_export = __gotots_range_value_27;
                        const __gotots_callee_10 = loadEntrypointsFromTargetExports;
                        const __gotots_argument_138 = subpath;
                        const __gotots_argument_139 = void 0;
                        const __gotots_argument_140 = void 0;
                        const __gotots_argument_141 = ExportsOrImports__from_packagejson.$copy(__go_export);
                        (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_138, __gotots_argument_139, __gotots_argument_140, __gotots_argument_141);
                        __gotots_range_state_5 = 1;
                        return true;
                    });
                    if (__gotots_range_state_5 === -1) {
                        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                    }
                    __gotots_range_state_5 = -2;
                }
                else {
                    const __gotots_callee_11 = loadEntrypointsFromTargetExports;
                    const __gotots_argument_142 = ".";
                    const __gotots_argument_143 = void 0;
                    const __gotots_argument_144 = void 0;
                    const __gotots_argument_145 = ExportsOrImports__from_packagejson.$copy(exports);
                    (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_142, __gotots_argument_143, __gotots_argument_144, __gotots_argument_145);
                }
                break;
            }
            default: {
                const __gotots_callee_12 = loadEntrypointsFromTargetExports;
                const __gotots_argument_146 = ".";
                const __gotots_argument_147 = void 0;
                const __gotots_argument_148 = void 0;
                const __gotots_argument_149 = ExportsOrImports__from_packagejson.$copy(exports);
                (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_146, __gotots_argument_147, __gotots_argument_148, __gotots_argument_149);
                break;
            }
        }
        return entrypoints;
    }
    static $go$private$__go_module$loadFileNameFromPackageJSONField(r: resolutionState | undefined, extensions__shadow_1: extensions, candidate: gostring, packageJSONValue: gostring): resolved | undefined {
        if (!((extensions__shadow_1 & extensionsTypeScript$constant()) === 0) && HasImplementationTSFileExtension__from_tspath(candidate) || !((extensions__shadow_1 & extensionsDeclaration$constant()) === 0) && IsDeclarationFileName__from_tspath(candidate)) {
            {
                const __gotots_results_28 = resolutionState.$go$private$__go_module$tryFile(r, candidate);
                let path = __gotots_results_28[0];
                let ok = __gotots_results_28[1];
                if (ok) {
                    let extension = TryExtractTSExtension__from_tspath(path);
                    let resolvedUsingTsExtension = strings__from_gostdlib.HasSuffix(packageJSONValue, "*") && extension !== "";
                    return new resolved(path, extension, PackageId.$zero(), "", resolvedUsingTsExtension);
                }
            }
            return continueSearching();
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isConfigLookup && !((extensions__shadow_1 & extensionsJson$constant()) === 0) && FileExtensionIs__from_tspath(candidate, ExtensionJson$string__from_tspath)) {
            {
                const __gotots_results_29 = resolutionState.$go$private$__go_module$tryFile(r, candidate);
                let path = __gotots_results_29[0];
                let ok = __gotots_results_29[1];
                if (ok) {
                    return new resolved(path, ExtensionJson$string__from_tspath, PackageId.$zero(), "", false);
                }
            }
        }
        return resolutionState.$go$private$__go_module$loadModuleFromFileNoImplicitExtensions(r, extensions__shadow_1, candidate);
    }
    static $go$private$__go_module$loadModuleFromExports(r: resolutionState | undefined, packageInfo: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, ext: extensions, subpath: gostring): resolved | undefined {
        let __gotots_logical_result_3 = !InfoCacheEntry__from_packagejson.Exists(packageInfo);
        if (!__gotots_logical_result_3) {
            const __gotots_store_10 = ExportsOrImports__from_packagejson.$storageOf(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports);
            __gotots_logical_result_3 = JSONValue__from_packagejson.IsFalsy(tsonicTypeScriptRuntime.projectLocation<JSONValue__from_packagejson$Storage, JSONValue__from_packagejson>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "JSONValue"), JSONValue__from_packagejson.$fromStorage, JSONValue__from_packagejson.$storageOf));
        }
        if (__gotots_logical_result_3) {
            return continueSearching();
        }
        if (subpath === ".") {
            let mainExport = ExportsOrImports__from_packagejson.$zero();
            switch ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports).JSONValue)).Type) {
                case JSONValueTypeString$constant__from_packagejson():
                case JSONValueTypeArray$constant__from_packagejson(): {
                    mainExport = ExportsOrImports__from_packagejson.$copy(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports);
                    break;
                }
                case JSONValueTypeObject$constant__from_packagejson(): {
                    if (((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports.IsConditions()) {
                        mainExport = ExportsOrImports__from_packagejson.$copy(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports);
                    }
                    else {
                        const __gotots_results_13 = OrderedMap$Get$string$Named_packagejson$ExportsOrImports(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports.AsObject(), ".");
                        let dot = __gotots_results_13[0];
                        let ok = __gotots_results_13[1];
                        if (ok) {
                            mainExport = ExportsOrImports__from_packagejson.$copy(dot);
                        }
                    }
                    break;
                }
            }
            if (!((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(mainExport).JSONValue)).Type === JSONValueTypeNotPresent$constant__from_packagejson())) {
                return resolutionState.$go$private$__go_module$loadModuleFromTargetExportOrImport(r, ext, subpath, packageInfo, false, ExportsOrImports__from_packagejson.$copy(mainExport), "", false, ".");
            }
        }
        else if ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
            ExportsOrImports__from_packagejson.$storageOf(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports).JSONValue)).Type === JSONValueTypeObject$constant__from_packagejson() && ((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports.IsSubpaths()) {
            {
                let result: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromExportsOrImports(r, ext, subpath, ((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports.AsObject(), packageInfo, false);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(result)) {
                    return result;
                }
            }
        }
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Export_specifier_0_does_not_exist_in_package_json_scope_at_path_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(subpath), new GoInterfaceAdapter((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory)]));
        }
        return continueSearching();
    }
    static $go$private$__go_module$loadModuleFromExportsOrImports(r: resolutionState | undefined, extensions__shadow_1: extensions, moduleName: gostring, lookupTable: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined, scope: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, isImports: bool): resolved | undefined {
        if (!strings__from_gostdlib.HasSuffix(moduleName, "/") && !strings__from_gostdlib.Contains(moduleName, "*")) {
            {
                const __gotots_results_9 = OrderedMap$Get$string$Named_packagejson$ExportsOrImports(lookupTable, moduleName);
                let target = __gotots_results_9[0];
                let ok = __gotots_results_9[1];
                if (ok) {
                    return resolutionState.$go$private$__go_module$loadModuleFromTargetExportOrImport(r, extensions__shadow_1, moduleName, scope, isImports, ExportsOrImports__from_packagejson.$copy(target), "", false, moduleName);
                }
            }
        }
        let expandingKeys = RuntimeSlice.make<gostring>(0, OrderedMap$Size$string$Named_packagejson$ExportsOrImports(lookupTable), "");
        const __gotots_range_7 = named_iter.IterSeqValueOperations.$project(OrderedMap$Keys$string$Named_packagejson$ExportsOrImports(lookupTable));
        if (__gotots_range_7 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_7(($argument0: gostring): bool => {
            if (__gotots_range_state_0 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_0 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_0 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_0 = -1;
            const __gotots_range_value_7 = $argument0;
            let key = __gotots_range_value_7;
            if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(key, "*"))) === 1 || strings__from_gostdlib.HasSuffix(key, "/")) {
                expandingKeys = expandingKeys.append("", [key]);
            }
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        SortFunc$SliceOf_string$string(expandingKeys, ComparePatternKeys);
        const __gotots_range_8 = expandingKeys;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
            const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_7);
            let potentialTarget = __gotots_range_value_8;
            if (!(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features & NodeResolutionFeaturesExportsPatternTrailers$constant()) === 0) && matchesPatternWithTrailer(potentialTarget, moduleName)) {
                const __gotots_results_10 = OrderedMap$Get$string$Named_packagejson$ExportsOrImports(lookupTable, potentialTarget);
                let target = __gotots_results_10[0];
                let starPos = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(potentialTarget, "*")));
                let subpath = goStringSlice(moduleName, goStringSlice(potentialTarget, 0, starPos).length, moduleName.length - (potentialTarget.length - 1 - starPos));
                return resolutionState.$go$private$__go_module$loadModuleFromTargetExportOrImport(r, extensions__shadow_1, moduleName, scope, isImports, ExportsOrImports__from_packagejson.$copy(target), subpath, true, potentialTarget);
            }
            else if (strings__from_gostdlib.HasSuffix(potentialTarget, "*") && strings__from_gostdlib.HasPrefix(moduleName, goStringSlice(potentialTarget, 0, potentialTarget.length - 1))) {
                const __gotots_results_11 = OrderedMap$Get$string$Named_packagejson$ExportsOrImports(lookupTable, potentialTarget);
                let target = __gotots_results_11[0];
                let subpath = goStringSlice(moduleName, potentialTarget.length - 1);
                return resolutionState.$go$private$__go_module$loadModuleFromTargetExportOrImport(r, extensions__shadow_1, moduleName, scope, isImports, ExportsOrImports__from_packagejson.$copy(target), subpath, true, potentialTarget);
            }
            else if (strings__from_gostdlib.HasPrefix(moduleName, potentialTarget)) {
                const __gotots_results_12 = OrderedMap$Get$string$Named_packagejson$ExportsOrImports(lookupTable, potentialTarget);
                let target = __gotots_results_12[0];
                let subpath = goStringSlice(moduleName, potentialTarget.length);
                return resolutionState.$go$private$__go_module$loadModuleFromTargetExportOrImport(r, extensions__shadow_1, moduleName, scope, isImports, ExportsOrImports__from_packagejson.$copy(target), subpath, false, potentialTarget);
            }
        }
        return continueSearching();
    }
    static $go$private$__go_module$loadModuleFromFile(r: resolutionState | undefined, extensions__shadow_1: extensions, candidate: gostring): resolved | undefined {
        let resolvedByReplacingExtension: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromFileNoImplicitExtensions(r, extensions__shadow_1, candidate);
        if (!(resolvedByReplacingExtension === undefined)) {
            return resolvedByReplacingExtension;
        }
        if (!(r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode) {
            return resolutionState.$go$private$__go_module$tryAddingExtensions(r, candidate, extensions__shadow_1, "");
        }
        return continueSearching();
    }
    static $go$private$__go_module$loadModuleFromFileNoImplicitExtensions(r: resolutionState | undefined, extensions__shadow_1: extensions, candidate: gostring): resolved | undefined {
        let base = GetBaseFileName__from_tspath(candidate);
        if (!strings__from_gostdlib.Contains(base, ".")) {
            return continueSearching();
        }
        let extensionless = RemoveFileExtension__from_tspath(candidate);
        if (extensionless === candidate) {
            extensionless = goStringSlice(candidate, 0, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(candidate, "."))));
        }
        let extension = goStringSlice(candidate, extensionless.length);
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.File_name_0_has_a_1_extension_stripping_it, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(candidate), new GoInterfaceAdapter(extension)]));
        }
        return resolutionState.$go$private$__go_module$tryAddingExtensions(r, extensionless, extensions__shadow_1, extension);
    }
    static $go$private$__go_module$loadModuleFromImmediateNodeModulesDirectory(r: resolutionState | undefined, extensions__shadow_1: extensions, directory: gostring, typesScopeOnly: bool): resolved | undefined {
        let nodeModulesFolder = CombinePaths__from_tspath(directory, RuntimeSlice.literal<gostring>(["node_modules"]));
        const __gotots_receiver_8: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_receiver_9 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_8).FS();
        const __gotots_argument_16 = nodeModulesFolder;
        if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_9).DirectoryExists(__gotots_argument_16)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(nodeModulesFolder)]));
            }
            return continueSearching();
        }
        if (!typesScopeOnly) {
            {
                let packageResult: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromSpecificNodeModulesDirectory(r, extensions__shadow_1, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, nodeModulesFolder);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(packageResult)) {
                    return packageResult;
                }
            }
        }
        if (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0)) {
            let nodeModulesAtTypes = CombinePaths__from_tspath(nodeModulesFolder, RuntimeSlice.literal<gostring>(["@types"]));
            const __gotots_receiver_10: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_11 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_10).FS();
            const __gotots_argument_17 = nodeModulesAtTypes;
            if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_11).DirectoryExists(__gotots_argument_17)) {
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(nodeModulesAtTypes)]));
                }
                return continueSearching();
            }
            return resolutionState.$go$private$__go_module$loadModuleFromSpecificNodeModulesDirectory(r, extensionsDeclaration$constant(), resolutionState.$go$private$__go_module$mangleScopedPackageName(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name), nodeModulesAtTypes);
        }
        return continueSearching();
    }
    static $go$private$__go_module$loadModuleFromImports(r: resolutionState | undefined): resolved | undefined {
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name === "#" || (strings__from_gostdlib.HasPrefix((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, "#/") && ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features & NodeResolutionFeaturesImportsPatternRoot$constant()) === 0)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Invalid_import_specifier_0_has_no_possible_resolutions, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name)]));
            }
            return continueSearching();
        }
        const __gotots_argument_19 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory;
        const __gotots_receiver_14: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_argument_20 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_14).GetCurrentDirectory();
        let directoryPath = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_19, __gotots_argument_20);
        let scope: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = resolutionState.$go$private$__go_module$getPackageScopeForPath(r, directoryPath);
        if (!InfoCacheEntry__from_packagejson.Exists(scope)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Directory_0_has_no_containing_package_json_scope_Imports_will_not_resolve, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(directoryPath)]));
            }
            return continueSearching();
        }
        if (!((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
            ExportsOrImports__from_packagejson.$storageOf(((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Imports).JSONValue)).Type === JSONValueTypeObject$constant__from_packagejson())) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_scope_0_has_no_imports_defined, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory)]));
            }
            return continueSearching();
        }
        {
            let result: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromExportsOrImports(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, ((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Imports.AsObject(), scope, true);
            if (!resolved.$go$private$__go_module$shouldContinueSearching(result)) {
                return result;
            }
        }
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Import_specifier_0_does_not_exist_in_package_json_scope_at_path_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name), new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory)]));
        }
        return continueSearching();
    }
    static $go$private$__go_module$loadModuleFromNearestNodeModulesDirectory(r: resolutionState | undefined, typesScopeOnly: bool): resolved | undefined {
        let mode = ResolutionModeCommonJS$constant__from_core();
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode || resolutionState.$go$private$__go_module$conditionMatches(r, "import")) {
            mode = ResolutionModeESM$constant__from_core();
        }
        let priorityExtensions = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions & (5);
        let secondaryExtensions = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions & -6;
        if (!(priorityExtensions === 0)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Searching_all_ancestor_node_modules_directories_for_preferred_extensions_Colon_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(extensions_String(priorityExtensions))]));
            }
            {
                let result: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromNearestNodeModulesDirectoryWorker(r, priorityExtensions, mode, typesScopeOnly);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(result)) {
                    return result;
                }
            }
        }
        if (!(secondaryExtensions === 0) && !typesScopeOnly) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Searching_all_ancestor_node_modules_directories_for_fallback_extensions_Colon_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(extensions_String(secondaryExtensions))]));
            }
            return resolutionState.$go$private$__go_module$loadModuleFromNearestNodeModulesDirectoryWorker(r, secondaryExtensions, mode, typesScopeOnly);
        }
        return continueSearching();
    }
    static $go$private$__go_module$loadModuleFromNearestNodeModulesDirectoryWorker(r: resolutionState | undefined, ext: extensions, mode: ModuleKind__from_core, typesScopeOnly: bool): resolved | undefined {
        const __gotots_results_14 = ForEachAncestorDirectory$PointerTo_Named___go_module$resolved((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory, (directory: gostring): [
            resolved | undefined,
            bool
        ] => {
            let result__shadow_1: resolved | undefined = void 0;
            let stop: bool = false;
            if (GetBaseFileName__from_tspath(directory) !== "node_modules") {
                let result__shadow_2: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromImmediateNodeModulesDirectory(r, ext, directory, typesScopeOnly);
                return [result__shadow_2, !resolved.$go$private$__go_module$shouldContinueSearching(result__shadow_2)];
            }
            return [continueSearching(), false];
        });
        let result: resolved | undefined = __gotots_results_14[0];
        return result;
    }
    static $go$private$__go_module$loadModuleFromSelfNameReference(r: resolutionState | undefined): resolved | undefined {
        const __gotots_argument_21 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory;
        const __gotots_receiver_15: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_argument_22 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_15).GetCurrentDirectory();
        let directoryPath = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_21, __gotots_argument_22);
        let scope: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = resolutionState.$go$private$__go_module$getPackageScopeForPath(r, directoryPath);
        let __gotots_logical_result_1 = !InfoCacheEntry__from_packagejson.Exists(scope);
        if (!__gotots_logical_result_1) {
            const __gotots_store_6 = ExportsOrImports__from_packagejson.$storageOf(((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports);
            __gotots_logical_result_1 = JSONValue__from_packagejson.IsFalsy(tsonicTypeScriptRuntime.projectLocation<JSONValue__from_packagejson$Storage, JSONValue__from_packagejson>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "JSONValue"), JSONValue__from_packagejson.$fromStorage, JSONValue__from_packagejson.$storageOf));
        }
        if (__gotots_logical_result_1) {
            return continueSearching();
        }
        const __gotots_store_7 = ((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields;
        const __gotots_results_4 = Expected$GetValue$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Name"));
        let name = __gotots_results_4[0];
        let ok = __gotots_results_4[1];
        if (!ok) {
            return continueSearching();
        }
        let parts = GetPathComponents__from_tspath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, "");
        let nameParts = GetPathComponents__from_tspath(name, "");
        if (parts.length < nameParts.length || !Equal$SliceOf_string$string(nameParts, parts.slice(0, nameParts.length, null))) {
            return continueSearching();
        }
        let trailingParts = parts.slice(nameParts.length, null, null);
        let subpath = "";
        if (trailingParts.length > 0) {
            subpath = CombinePaths__from_tspath(".", trailingParts);
        }
        else {
            subpath = ".";
        }
        if (CompilerOptions__from_core.GetAllowJS((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions) && !strings__from_gostdlib.Contains((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory, "/node_modules/")) {
            return resolutionState.$go$private$__go_module$loadModuleFromExports(r, scope, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions, subpath);
        }
        let priorityExtensions = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions & (5);
        let secondaryExtensions = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions & -6;
        {
            let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromExports(r, scope, priorityExtensions, subpath);
            if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                return resolved__shadow_1;
            }
        }
        return resolutionState.$go$private$__go_module$loadModuleFromExports(r, scope, secondaryExtensions, subpath);
    }
    static $go$private$__go_module$loadModuleFromSpecificNodeModulesDirectory(r: resolutionState | undefined, ext: extensions, moduleName: gostring, nodeModulesDirectory: gostring): resolved | undefined {
        let candidate = RemoveTrailingDirectorySeparator__from_tspath(NormalizePath__from_tspath(CombinePaths__from_tspath(nodeModulesDirectory, RuntimeSlice.literal<gostring>([moduleName]))));
        const __gotots_results_5 = ParsePackageName(moduleName);
        let packageName = __gotots_results_5[0];
        let rest = __gotots_results_5[1];
        let packageDirectory = CombinePaths__from_tspath(nodeModulesDirectory, RuntimeSlice.literal<gostring>([packageName]));
        if (packageName === "") {
            packageDirectory = candidate;
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolvePackageDirectoryOnly) {
            const __gotots_receiver_22: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_23 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_22).FS();
            const __gotots_argument_26 = packageDirectory;
            if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_23).DirectoryExists(__gotots_argument_26)) {
                return new resolved(packageDirectory, "", PackageId.$zero(), "", false);
            }
            return continueSearching();
        }
        let rootPackageInfo: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = void 0;
        let packageInfo: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = resolutionState.$go$private$__go_module$getPackageJsonInfo(r, candidate);
        if (rest !== "" && InfoCacheEntry__from_packagejson.Exists(packageInfo)) {
            if (!(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features & NodeResolutionFeaturesExports$constant()) === 0)) {
                rootPackageInfo = resolutionState.$go$private$__go_module$getPackageJsonInfo(r, packageDirectory);
            }
            if (!InfoCacheEntry__from_packagejson.Exists(rootPackageInfo) || (void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(((rootPackageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports).JSONValue)).Type === JSONValueTypeNotPresent$constant__from_packagejson()) {
                {
                    let fromFile: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromFile(r, ext, candidate);
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(fromFile)) {
                        return fromFile;
                    }
                }
                {
                    let fromDirectory: resolved | undefined = resolutionState.$go$private$__go_module$loadNodeModuleFromDirectoryWorker(r, ext, candidate, packageInfo);
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(fromDirectory)) {
                        (fromDirectory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (fromDirectory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, packageInfo);
                        return fromDirectory;
                    }
                }
            }
        }
        let loader: (($0: extensions, $1: gostring) => resolved | undefined) | undefined = (extensions__shadow_1: extensions, candidate__shadow_1: gostring): resolved | undefined => {
            if (rest !== "" || !(r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode) {
                {
                    let fromFile: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromFile(r, extensions__shadow_1, candidate__shadow_1);
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(fromFile)) {
                        (fromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (fromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, packageInfo);
                        return fromFile;
                    }
                }
            }
            {
                let fromDirectory: resolved | undefined = resolutionState.$go$private$__go_module$loadNodeModuleFromDirectoryWorker(r, extensions__shadow_1, candidate__shadow_1, packageInfo);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(fromDirectory)) {
                    (fromDirectory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (fromDirectory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, packageInfo);
                    return fromDirectory;
                }
            }
            if (rest === "" && InfoCacheEntry__from_packagejson.Exists(packageInfo) && ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports).JSONValue)).Type === JSONValueTypeNotPresent$constant__from_packagejson() || (void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports).JSONValue)).Type === JSONValueTypeNull$constant__from_packagejson()) && (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode) {
                {
                    let indexResult: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromFile(r, extensions__shadow_1, CombinePaths__from_tspath(candidate__shadow_1, RuntimeSlice.literal<gostring>(["index.js"])));
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(indexResult)) {
                        (indexResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (indexResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, packageInfo);
                        return indexResult;
                    }
                }
            }
            return continueSearching();
        };
        if (rest !== "") {
            packageInfo = rootPackageInfo;
            if (packageInfo === undefined) {
                packageInfo = resolutionState.$go$private$__go_module$getPackageJsonInfo(r, packageDirectory);
            }
        }
        if (!(packageInfo === undefined)) {
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolvedPackageDirectory = true;
            let __gotots_logical_result_2 = !(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features & NodeResolutionFeaturesExports$constant()) === 0) && InfoCacheEntry__from_packagejson.Exists(packageInfo);
            if (__gotots_logical_result_2) {
                const __gotots_store_8 = ExportsOrImports__from_packagejson.$storageOf(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports);
                __gotots_logical_result_2 = !JSONValue__from_packagejson.IsFalsy(tsonicTypeScriptRuntime.projectLocation<JSONValue__from_packagejson$Storage, JSONValue__from_packagejson>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "JSONValue"), JSONValue__from_packagejson.$fromStorage, JSONValue__from_packagejson.$storageOf));
            }
            if (__gotots_logical_result_2) {
                return resolutionState.$go$private$__go_module$loadModuleFromExports(r, packageInfo, ext, CombinePaths__from_tspath(".", RuntimeSlice.literal<gostring>([rest])));
            }
            if (rest !== "" && InfoCacheEntry__from_packagejson.Exists(packageInfo)) {
                let versionPaths = PackageJson__from_packagejson.GetVersionPaths((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents, resolutionState.$go$private$__go_module$getTraceFunc(r));
                const versionPaths$location = tsonicTypeScriptRuntime.boundLocation({}, () => versionPaths, versionPaths$next => versionPaths = versionPaths$next);
                if (VersionPaths__from_packagejson.Exists(versionPaths$location)) {
                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(versionPaths.Version), new GoInterfaceAdapter(Version__from_core()), new GoInterfaceAdapter(rest)]));
                    }
                    let pathPatterns: {
                        value: ParsedPatterns;
                    } | undefined = TryParsePatterns(VersionPaths__from_packagejson.GetPaths(versionPaths$location));
                    {
                        let fromPaths: resolved | undefined = resolutionState.$go$private$__go_module$tryLoadModuleUsingPaths(r, ext, rest, packageDirectory, VersionPaths__from_packagejson.GetPaths(versionPaths$location), pathPatterns, loader);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(fromPaths)) {
                            return fromPaths;
                        }
                    }
                }
            }
        }
        const __gotots_callee_0 = loader;
        const __gotots_argument_27 = ext;
        const __gotots_argument_28 = candidate;
        return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27, __gotots_argument_28);
    }
    static $go$private$__go_module$loadModuleFromTargetExportOrImport(r: resolutionState | undefined, extensions__shadow_1: extensions, moduleName: gostring, scope: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, isImports: bool, target: ExportsOrImports__from_packagejson, subpath: gostring, isPattern: bool, key: gostring): resolved | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: resolved | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    switch ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                        ExportsOrImports__from_packagejson.$storageOf(target).JSONValue)).Type) {
                        case JSONValueTypeString$constant__from_packagejson(): {
                            const __gotots_results_24 = (($value: GoInterface | undefined): [
                                gostring,
                                boolean
                            ] => {
                                if (!GoInterfaceAdapter.$is($value)) {
                                    return ["", false];
                                }
                                return [$value.$go$value, true];
                            })((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                                ExportsOrImports__from_packagejson.$storageOf(target).JSONValue)).Value);
                            let targetString = __gotots_results_24[0];
                            if (!isPattern && subpath.length > 0 && !strings__from_gostdlib.HasSuffix(targetString, "/")) {
                                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory), new GoInterfaceAdapter(moduleName)]));
                                }
                                __gotots_return_0 = continueSearching();
                                break __gotots_return_block_0;
                            }
                            if (!strings__from_gostdlib.HasPrefix(targetString, "./")) {
                                if (isImports && !strings__from_gostdlib.HasPrefix(targetString, "../") && !strings__from_gostdlib.HasPrefix(targetString, "/") && !IsRootedDiskPath__from_tspath(targetString)) {
                                    let combinedLookup = targetString + subpath;
                                    if (isPattern) {
                                        combinedLookup = strings__from_gostdlib.ReplaceAll(targetString, "*", subpath);
                                    }
                                    let scopeContainingDirectory = EnsureTrailingDirectorySeparator__from_tspath((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory);
                                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Using_0_subpath_1_with_target_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("imports"), new GoInterfaceAdapter(key), new GoInterfaceAdapter(combinedLookup)]));
                                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Resolving_module_0_from_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(combinedLookup), new GoInterfaceAdapter(scopeContainingDirectory)]));
                                    }
                                    const __gotots_assign_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name;
                                    const __gotots_assign_1 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory;
                                    let name = __gotots_assign_0;
                                    let containingDirectory = __gotots_assign_1;
                                    const __gotots_store_13 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_14 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_assign_2 = combinedLookup;
                                    const __gotots_assign_3 = scopeContainingDirectory;
                                    __gotots_store_13.name = __gotots_assign_2;
                                    __gotots_store_14.containingDirectory = __gotots_assign_3;
                                    const __gotots_callee_6 = (): void => {
                                        const __gotots_store_15 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                        const __gotots_store_16 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                        const __gotots_assign_4 = name;
                                        const __gotots_assign_5 = containingDirectory;
                                        __gotots_store_15.name = __gotots_assign_4;
                                        __gotots_store_16.containingDirectory = __gotots_assign_5;
                                    };
                                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                        __gotots_callee_6();
                                    });
                                    {
                                        let result: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined = resolutionState.$go$private$__go_module$resolveNodeLike(r);
                                        if (ResolvedModule.IsResolved(result)) {
                                            __gotots_return_0 = new resolved(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolvedFileName, ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.Extension, PackageId.$copy(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.PackageId), ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.OriginalPath, ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolvedUsingTsExtension);
                                            break __gotots_return_block_0;
                                        }
                                    }
                                    __gotots_return_0 = continueSearching();
                                    break __gotots_return_block_0;
                                }
                                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory), new GoInterfaceAdapter(moduleName)]));
                                }
                                __gotots_return_0 = continueSearching();
                                break __gotots_return_block_0;
                            }
                            let parts = RuntimeSlice.nil<gostring>();
                            if (PathIsRelative__from_tspath(targetString)) {
                                parts = GetPathComponents__from_tspath(targetString, "").slice(1, null, null);
                            }
                            else {
                                parts = GetPathComponents__from_tspath(targetString, "");
                            }
                            let partsAfterFirst = parts.slice(1, null, null);
                            if (Contains$SliceOf_string$string(partsAfterFirst, "..") || Contains$SliceOf_string$string(partsAfterFirst, ".") || Contains$SliceOf_string$string(partsAfterFirst, "node_modules")) {
                                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory), new GoInterfaceAdapter(moduleName)]));
                                }
                                __gotots_return_0 = continueSearching();
                                break __gotots_return_block_0;
                            }
                            let resolvedTarget = CombinePaths__from_tspath((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory, RuntimeSlice.literal<gostring>([targetString]));
                            let subpathParts = GetPathComponents__from_tspath(subpath, "");
                            if (Contains$SliceOf_string$string(subpathParts, "..") || Contains$SliceOf_string$string(subpathParts, ".") || Contains$SliceOf_string$string(subpathParts, "node_modules")) {
                                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory), new GoInterfaceAdapter(moduleName)]));
                                }
                                __gotots_return_0 = continueSearching();
                                break __gotots_return_block_0;
                            }
                            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                let messageTarget = "";
                                if (isPattern) {
                                    messageTarget = strings__from_gostdlib.ReplaceAll(targetString, "*", subpath);
                                }
                                else {
                                    messageTarget = targetString + subpath;
                                }
                                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Using_0_subpath_1_with_target_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(IfElse$string(isImports, "imports", "exports")), new GoInterfaceAdapter(key), new GoInterfaceAdapter(messageTarget)]));
                            }
                            let finalPath = "";
                            if (isPattern) {
                                const __gotots_argument_64 = strings__from_gostdlib.ReplaceAll(resolvedTarget, "*", subpath);
                                const __gotots_receiver_55: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                                const __gotots_argument_65 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_55).GetCurrentDirectory();
                                finalPath = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_64, __gotots_argument_65);
                            }
                            else {
                                const __gotots_argument_66 = resolvedTarget + subpath;
                                const __gotots_receiver_56: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                                const __gotots_argument_67 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_56).GetCurrentDirectory();
                                finalPath = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_66, __gotots_argument_67);
                            }
                            {
                                let inputLink: resolved | undefined = resolutionState.$go$private$__go_module$tryLoadInputFileForPath(r, finalPath, subpath, CombinePaths__from_tspath((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory, RuntimeSlice.literal<gostring>(["package.json"])), isImports);
                                if (!resolved.$go$private$__go_module$shouldContinueSearching(inputLink)) {
                                    (inputLink ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (inputLink ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, scope);
                                    __gotots_return_0 = inputLink;
                                    break __gotots_return_block_0;
                                }
                            }
                            {
                                let result: resolved | undefined = resolutionState.$go$private$__go_module$loadFileNameFromPackageJSONField(r, extensions__shadow_1, finalPath, targetString);
                                if (!resolved.$go$private$__go_module$shouldContinueSearching(result)) {
                                    (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, scope);
                                    __gotots_return_0 = result;
                                    break __gotots_return_block_0;
                                }
                            }
                            __gotots_return_0 = continueSearching();
                            break __gotots_return_block_0;
                            break;
                        }
                        case JSONValueTypeObject$constant__from_packagejson(): {
                            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Entering_conditional_exports, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                            const __gotots_range_12 = named_iter.IterSeqValueOperations.$project(OrderedMap$Keys$string$Named_packagejson$ExportsOrImports(target.AsObject()));
                            if (__gotots_range_12 === void 0) {
                                GoPanic.raiseRuntime("call of nil function");
                            }
                            let __gotots_range_state_3 = 1;
                            let __gotots_range_return_0: resolved | undefined = void 0;
                            __gotots_range_12(($argument0: gostring): bool => {
                                if (__gotots_range_state_3 === 0) {
                                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                                }
                                if (__gotots_range_state_3 === -1) {
                                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                                }
                                if (__gotots_range_state_3 === -2) {
                                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                                }
                                if (__gotots_range_state_3 === 2) {
                                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                                }
                                __gotots_range_state_3 = -1;
                                const __gotots_range_value_12 = $argument0;
                                let condition = __gotots_range_value_12;
                                if (resolutionState.$go$private$__go_module$conditionMatches(r, condition)) {
                                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Matched_0_condition_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(IfElse$string(isImports, "imports", "exports")), new GoInterfaceAdapter(condition)]));
                                    }
                                    const __gotots_results_25 = OrderedMap$Get$string$Named_packagejson$ExportsOrImports(target.AsObject(), condition);
                                    let subTarget = __gotots_results_25[0];
                                    {
                                        let result: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromTargetExportOrImport(r, extensions__shadow_1, moduleName, scope, isImports, ExportsOrImports__from_packagejson.$copy(subTarget), subpath, isPattern, key);
                                        if (!resolved.$go$private$__go_module$shouldContinueSearching(result)) {
                                            if (resolved.$go$private$__go_module$isResolved(result) && !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Resolved_under_condition_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(condition)]));
                                            }
                                            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Exiting_conditional_exports, RuntimeSlice.nil<GoInterface | undefined>());
                                            }
                                            __gotots_range_return_0 = result;
                                            __gotots_range_state_3 = 2;
                                            return false;
                                        }
                                        else if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Failed_to_resolve_under_condition_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(condition)]));
                                        }
                                    }
                                }
                                else {
                                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Saw_non_matching_condition_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(condition)]));
                                    }
                                }
                                __gotots_range_state_3 = 1;
                                return true;
                            });
                            if (__gotots_range_state_3 === -1) {
                                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                            }
                            if (__gotots_range_state_3 === 2) {
                                __gotots_return_0 = __gotots_range_return_0;
                                break __gotots_return_block_0;
                            }
                            __gotots_range_state_3 = -2;
                            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Exiting_conditional_exports, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                            __gotots_return_0 = continueSearching();
                            break __gotots_return_block_0;
                            break;
                        }
                        case JSONValueTypeArray$constant__from_packagejson(): {
                            if (target.AsArray().length === 0) {
                                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory), new GoInterfaceAdapter(moduleName)]));
                                }
                                __gotots_return_0 = continueSearching();
                                break __gotots_return_block_0;
                            }
                            const __gotots_range_13 = target.AsArray();
                            for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_13.length; __gotots_range_index_9++) {
                                const __gotots_range_value_13 = ExportsOrImports__from_packagejson.$copy(ExportsOrImports__from_packagejson.$fromStorage(__gotots_range_13.get(__gotots_range_index_9)));
                                let elem = __gotots_range_value_13;
                                {
                                    let result: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromTargetExportOrImport(r, extensions__shadow_1, moduleName, scope, isImports, ExportsOrImports__from_packagejson.$copy(elem), subpath, isPattern, key);
                                    if (!resolved.$go$private$__go_module$shouldContinueSearching(result)) {
                                        __gotots_return_0 = result;
                                        break __gotots_return_block_0;
                                    }
                                }
                            }
                            break;
                        }
                        case JSONValueTypeNull$constant__from_packagejson(): {
                            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_scope_0_explicitly_maps_specifier_1_to_null, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory), new GoInterfaceAdapter(moduleName)]));
                            }
                            __gotots_return_0 = unresolved();
                            break __gotots_return_block_0;
                            break;
                        }
                    }
                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory), new GoInterfaceAdapter(moduleName)]));
                    }
                    __gotots_return_0 = continueSearching();
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$__go_module$loadNodeModuleFromDirectory(r: resolutionState | undefined, extensions__shadow_1: extensions, candidate: gostring, considerPackageJson: bool): resolved | undefined {
        let packageInfo: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = void 0;
        if (considerPackageJson) {
            packageInfo = resolutionState.$go$private$__go_module$getPackageJsonInfo(r, candidate);
        }
        return resolutionState.$go$private$__go_module$loadNodeModuleFromDirectoryWorker(r, extensions__shadow_1, candidate, packageInfo);
    }
    static $go$private$__go_module$loadNodeModuleFromDirectoryWorker(r: resolutionState | undefined, ext: extensions, candidate: gostring, packageInfo: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined): resolved | undefined {
        let packageFile = "";
        let versionPaths = VersionPaths__from_packagejson.$zero();
        const versionPaths$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => versionPaths, versionPaths$next2 => versionPaths = versionPaths$next2);
        if (InfoCacheEntry__from_packagejson.Exists(packageInfo)) {
            versionPaths = PackageJson__from_packagejson.GetVersionPaths((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents, resolutionState.$go$private$__go_module$getTraceFunc(r));
            const __gotots_argument_51 = candidate;
            const __gotots_argument_52: InfoCacheEntry__from_packagejson["PackageDirectory"] = (packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
            const __gotots_receiver_48: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_49 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_48).FS();
            const __gotots_field_10 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_49).UseCaseSensitiveFileNames();
            const __gotots_argument_53 = new ComparePathsOptions__from_tspath(__gotots_field_10, "");
            const __gotots_binary_operand_0 = ComparePaths__from_tspath(__gotots_argument_51, __gotots_argument_52, __gotots_argument_53);
            const __gotots_binary_operand_1 = 0;
            if (__gotots_binary_operand_0 === __gotots_binary_operand_1) {
                {
                    const __gotots_results_19 = resolutionState.$go$private$__go_module$getPackageFile(r, ext, packageInfo);
                    let file = __gotots_results_19[0];
                    let ok = __gotots_results_19[1];
                    if (ok) {
                        packageFile = file;
                    }
                }
            }
        }
        let loader: (($0: extensions, $1: gostring) => resolved | undefined) | undefined = (extensions__shadow_1: extensions, candidate__shadow_1: gostring): resolved | undefined => {
            {
                let fromFile: resolved | undefined = resolutionState.$go$private$__go_module$loadFileNameFromPackageJSONField(r, extensions__shadow_1, candidate__shadow_1, packageFile);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(fromFile)) {
                    return fromFile;
                }
            }
            let expandedExtensions = extensions__shadow_1;
            if (extensions__shadow_1 === extensionsDeclaration$constant()) {
                expandedExtensions = 5;
            }
            let saveESMMode = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode;
            let saveCandidateEndingIsFromConfig = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).candidateEndingIsFromConfig;
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).candidateEndingIsFromConfig = true;
            if (InfoCacheEntry__from_packagejson.Exists(packageInfo) && Expected__from_packagejson.$storageOf(((packageInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields.Type).Value !== "module") {
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode = false;
            }
            let result: resolved | undefined = resolutionState.$go$private$__go_module$nodeLoadModuleByRelativeName(r, expandedExtensions, candidate__shadow_1, false);
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode = saveESMMode;
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).candidateEndingIsFromConfig = saveCandidateEndingIsFromConfig;
            return result;
        };
        let indexPath = "";
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isConfigLookup) {
            indexPath = CombinePaths__from_tspath(candidate, RuntimeSlice.literal<gostring>(["tsconfig"]));
        }
        else {
            indexPath = CombinePaths__from_tspath(candidate, RuntimeSlice.literal<gostring>(["index"]));
        }
        if (VersionPaths__from_packagejson.Exists(versionPaths$location2) && (packageFile === "" || ContainsPath__from_tspath(candidate, packageFile, new ComparePathsOptions__from_tspath(false, "")))) {
            let moduleName = "";
            if (packageFile !== "") {
                moduleName = GetRelativePathFromDirectory__from_tspath(candidate, packageFile, new ComparePathsOptions__from_tspath(false, ""));
            }
            else {
                moduleName = GetRelativePathFromDirectory__from_tspath(candidate, indexPath, new ComparePathsOptions__from_tspath(false, ""));
            }
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(versionPaths.Version), new GoInterfaceAdapter(Version__from_core()), new GoInterfaceAdapter(moduleName)]));
            }
            let pathPatterns: {
                value: ParsedPatterns;
            } | undefined = TryParsePatterns(VersionPaths__from_packagejson.GetPaths(versionPaths$location2));
            {
                let result: resolved | undefined = resolutionState.$go$private$__go_module$tryLoadModuleUsingPaths(r, ext, moduleName, candidate, VersionPaths__from_packagejson.GetPaths(versionPaths$location2), pathPatterns, loader);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(result)) {
                    if (PackageId.$storageOf((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId).Name !== "") {
                        const __gotots_argument_54 = new GoInterfaceAdapter("expected packageId to be empty");
                        GoPanic.raise(__gotots_argument_54 === undefined ? GoPanicNilValue.create() : __gotots_argument_54);
                    }
                    return result;
                }
            }
        }
        if (packageFile !== "") {
            {
                const __gotots_callee_3 = loader;
                const __gotots_argument_55 = ext;
                const __gotots_argument_56 = packageFile;
                let packageFileResult: resolved | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55, __gotots_argument_56);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(packageFileResult)) {
                    if (PackageId.$storageOf((packageFileResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId).Name !== "") {
                        const __gotots_argument_57 = new GoInterfaceAdapter("expected packageId to be empty");
                        GoPanic.raise(__gotots_argument_57 === undefined ? GoPanicNilValue.create() : __gotots_argument_57);
                    }
                    return packageFileResult;
                }
            }
        }
        if (!(r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode) {
            const __gotots_receiver_50: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_51 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_50).FS();
            const __gotots_argument_58 = candidate;
            if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_51).DirectoryExists(__gotots_argument_58)) {
                return continueSearching();
            }
            return resolutionState.$go$private$__go_module$loadModuleFromFile(r, ext, indexPath);
        }
        return continueSearching();
    }
    static $go$private$__go_module$mangleScopedPackageName(r: resolutionState | undefined, name: gostring): gostring {
        let mangled = MangleScopedPackageName(name);
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined) && mangled !== name) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Scoped_package_detected_looking_in_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(mangled)]));
        }
        return mangled;
    }
    static $go$private$__go_module$nodeLoadModuleByRelativeName(r: resolutionState | undefined, extensions__shadow_1: extensions, candidate: gostring, considerPackageJson: bool): resolved | undefined {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_types_Colon_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(candidate), new GoInterfaceAdapter(extensions_String(extensions__shadow_1))]));
        }
        if (!HasTrailingDirectorySeparator__from_tspath(candidate)) {
            let parentOfCandidate = GetDirectoryPath__from_tspath(candidate);
            const __gotots_receiver_18: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_19 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_18).FS();
            const __gotots_argument_24 = parentOfCandidate;
            if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_19).DirectoryExists(__gotots_argument_24)) {
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(parentOfCandidate)]));
                }
                return continueSearching();
            }
            let resolvedFromFile: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromFile(r, extensions__shadow_1, candidate);
            if (!(resolvedFromFile === undefined)) {
                if (considerPackageJson) {
                    {
                        let packageDirectory = ParseNodeModuleFromPath((resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, false);
                        if (packageDirectory !== "") {
                            (resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, resolutionState.$go$private$__go_module$getPackageJsonInfo(r, packageDirectory));
                        }
                    }
                }
                return resolvedFromFile;
            }
        }
        const __gotots_receiver_20: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_receiver_21 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_20).FS();
        const __gotots_argument_25 = candidate;
        if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_21).DirectoryExists(__gotots_argument_25)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(candidate)]));
            }
            return continueSearching();
        }
        if (!(r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode) {
            return resolutionState.$go$private$__go_module$loadNodeModuleFromDirectory(r, extensions__shadow_1, candidate, considerPackageJson);
        }
        return continueSearching();
    }
    static $go$private$__go_module$readPackageJsonPeerDependencies(r: resolutionState | undefined, packageJsonInfo: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined): gostring {
        let peerDependencies = Expected__from_packagejson.$copy<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ((packageJsonInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.DependencyFields.PeerDependencies);
        const peerDependencies$location = tsonicTypeScriptRuntime.boundLocation({}, () => peerDependencies, peerDependencies$next => peerDependencies = peerDependencies$next);
        let ok = resolutionState.$go$private$__go_module$validatePackageJSONField(r, "peerDependencies", new $goInterfaceAdapter$PointerTo_Named_packagejson$ExpectedOf_MapOf_string_To_string(peerDependencies$location));
        if (!ok || Expected__from_packagejson.$storageOf(peerDependencies).Value.length() === 0) {
            return "";
        }
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_has_a_peerDependencies_field, RuntimeSlice.nil<GoInterface | undefined>());
        }
        let packageDirectory = resolutionState.$go$private$__go_module$realPath(r, (packageJsonInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory);
        let nodeModulesIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(packageDirectory, "/node_modules")));
        if (nodeModulesIndex === -1) {
            return "";
        }
        let nodeModules = goStringSlice(packageDirectory, 0, nodeModulesIndex + 13) + "/";
        let names = AppendSeq$SliceOf_string$string(RuntimeSlice.make<gostring>(0, Expected__from_packagejson.$storageOf(peerDependencies).Value.length(), ""), Keys$MapOf_string_To_string$string$string(Expected__from_packagejson.$storageOf(peerDependencies).Value));
        Sort$SliceOf_string$string(names);
        const __gotots_struct_2 = named_strings.StringsBuilderOperations.$zero();
        let builder = __gotots_struct_2;
        const __gotots_range_14 = names;
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_14.length; __gotots_range_index_10++) {
            const __gotots_range_value_14 = __gotots_range_14.get(__gotots_range_index_10);
            let name = __gotots_range_value_14;
            let peerPackageJson: {
                value: InfoCacheEntry__from_packagejson;
            } | undefined = resolutionState.$go$private$__go_module$getPackageJsonInfo(r, nodeModules + name);
            if (!(peerPackageJson === undefined)) {
                let version = Expected__from_packagejson.$storageOf(((peerPackageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields.Version).Value;
                strings__from_gostdlib.Builder.WriteString(builder, "+");
                strings__from_gostdlib.Builder.WriteString(builder, name);
                strings__from_gostdlib.Builder.WriteString(builder, "@");
                strings__from_gostdlib.Builder.WriteString(builder, version);
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Found_peerDependency_0_with_1_version, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(name), new GoInterfaceAdapter(version)]));
                }
            }
            else if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Failed_to_find_peerDependency_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(name)]));
            }
        }
        return strings__from_gostdlib.Builder.String(builder);
    }
    static $go$private$__go_module$realPath(r: resolutionState | undefined, path: gostring): gostring {
        const __gotots_receiver_53: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_receiver_54 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_53).FS();
        const __gotots_argument_62 = path;
        const __gotots_argument_63 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_54).Realpath(__gotots_argument_62);
        let rp = NormalizePath__from_tspath(__gotots_argument_63);
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Resolving_real_path_for_0_result_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(path), new GoInterfaceAdapter(rp)]));
        }
        return rp;
    }
    static $go$private$__go_module$resolveFromTypeRoot(r: resolutionState | undefined): resolved | undefined {
        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeRoots.isNil()) {
            return void 0;
        }
        const __gotots_range_0: CompilerOptions__from_core["TypeRoots"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeRoots;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let typeRoot = __gotots_range_value_0;
            let candidate = resolutionState.$go$private$__go_module$getCandidateFromTypeRoot(r, typeRoot);
            const __gotots_receiver_16: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_17 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_16).FS();
            const __gotots_argument_23 = typeRoot;
            let directoryExists = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_17).DirectoryExists(__gotots_argument_23);
            if (!directoryExists) {
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typeRoot)]));
                }
                continue;
            }
            {
                let resolvedFromFile: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromFile(r, extensionsDeclaration$constant(), candidate);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(resolvedFromFile)) {
                    let packageDirectory = ParseNodeModuleFromPath((resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, false);
                    if (packageDirectory !== "") {
                        (resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, resolutionState.$go$private$__go_module$getPackageJsonInfo(r, packageDirectory));
                    }
                    return resolvedFromFile;
                }
            }
            {
                let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$loadNodeModuleFromDirectory(r, extensionsDeclaration$constant(), candidate, true);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                    return resolved__shadow_1;
                }
            }
        }
        return void 0;
    }
    static $go$private$__go_module$resolveNodeLike(r: resolutionState | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            let conditions = strings__from_gostdlib.Join(Map$string$string((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions, (c: gostring): gostring => {
                return "'" + c + "'";
            }), ", ");
            if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Resolving_in_0_mode_with_conditions_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("ESM"), new GoInterfaceAdapter(conditions)]));
            }
            else {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Resolving_in_0_mode_with_conditions_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("CJS"), new GoInterfaceAdapter(conditions)]));
            }
        }
        let result: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined = resolutionState.$go$private$__go_module$resolveNodeLikeWorker(r);
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolvedPackageDirectory && !(r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isConfigLookup && !(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features & NodeResolutionFeaturesExports$constant()) === 0) && !(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions & (5)) === 0) && !IsExternalModuleNameRelative__from_tspath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name) && ResolvedModule.IsResolved(result) && ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.IsExternalLibraryImport && !extensionIsOk(5, ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.Extension) && Contains$SliceOf_string$string((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions, "import")) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Resolution_of_non_relative_name_failed_trying_with_modern_Node_resolution_features_disabled_to_see_if_npm_library_needs_configuration_update, RuntimeSlice.nil<GoInterface | undefined>());
            }
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features & -5;
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions & (5);
            let diagnosticsCount = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).diagnostics.length;
            {
                let diagnosticResult: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined = resolutionState.$go$private$__go_module$resolveNodeLikeWorker(r);
                if (ResolvedModule.IsResolved(diagnosticResult) && ((diagnosticResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.IsExternalLibraryImport) {
                    ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.AlternateResult = ((diagnosticResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolvedFileName;
                }
            }
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).diagnostics = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).diagnostics.slice(0, diagnosticsCount, null);
        }
        return result;
    }
    static $go$private$__go_module$resolveNodeLikeWorker(r: resolutionState | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined {
        {
            let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryLoadModuleUsingOptionalResolutionSettings(r);
            if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                return resolutionState.$go$private$__go_module$createResolvedModuleHandlingSymlink(r, resolved__shadow_1);
            }
        }
        if (!IsExternalModuleNameRelative__from_tspath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name)) {
            if (!(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features & NodeResolutionFeaturesImports$constant()) === 0) && strings__from_gostdlib.HasPrefix((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, "#")) {
                {
                    let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromImports(r);
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                        return resolutionState.$go$private$__go_module$createResolvedModuleHandlingSymlink(r, resolved__shadow_1);
                    }
                }
            }
            if (!(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features & NodeResolutionFeaturesSelfName$constant()) === 0)) {
                {
                    let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromSelfNameReference(r);
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                        return resolutionState.$go$private$__go_module$createResolvedModuleHandlingSymlink(r, resolved__shadow_1);
                    }
                }
            }
            if (strings__from_gostdlib.Contains((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, ":")) {
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Skipping_module_0_that_looks_like_an_absolute_URI_target_file_types_Colon_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name), new GoInterfaceAdapter(extensions_String((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions))]));
                }
                return resolutionState.$go$private$__go_module$createResolvedModule(r, void 0, false);
            }
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Loading_module_0_from_node_modules_folder_target_file_types_Colon_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name), new GoInterfaceAdapter(extensions_String((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions))]));
            }
            {
                let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromNearestNodeModulesDirectory(r, false);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                    return resolutionState.$go$private$__go_module$createResolvedModuleHandlingSymlink(r, resolved__shadow_1);
                }
            }
            if (!(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions & extensionsDeclaration$constant()) === 0)) {
                {
                    let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$resolveFromTypeRoot(r);
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                        return resolutionState.$go$private$__go_module$createResolvedModuleHandlingSymlink(r, resolved__shadow_1);
                    }
                }
            }
        }
        else {
            let candidate = normalizePathForCJSResolution((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name);
            let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$nodeLoadModuleByRelativeName(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions, candidate, true);
            return resolutionState.$go$private$__go_module$createResolvedModule(r, resolved__shadow_1, !(resolved__shadow_1 === undefined) && strings__from_gostdlib.Contains((resolved__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, "/node_modules/"));
        }
        return resolutionState.$go$private$__go_module$createResolvedModule(r, void 0, false);
    }
    static $go$private$__go_module$resolveTypeReferenceDirective(r: resolutionState | undefined, typeRoots: RuntimeSlice<gostring>, fromConfig: bool, fromInferredTypesContainingFile: bool): tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective> | undefined {
        if (typeRoots.length > 0) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Resolving_with_primary_search_path_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(strings__from_gostdlib.Join(typeRoots, ", "))]));
            }
            const __gotots_range_4 = typeRoots;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                let typeRoot = __gotots_range_value_4;
                let candidate = resolutionState.$go$private$__go_module$getCandidateFromTypeRoot(r, typeRoot);
                const __gotots_receiver_34: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_receiver_35 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_34).FS();
                const __gotots_argument_35 = typeRoot;
                let directoryExists = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_35).DirectoryExists(__gotots_argument_35);
                if (!directoryExists) {
                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typeRoot)]));
                    }
                    continue;
                }
                if (fromConfig) {
                    {
                        let resolvedFromFile: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromFile(r, extensionsDeclaration$constant(), candidate);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolvedFromFile)) {
                            let packageDirectory = ParseNodeModuleFromPath((resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, false);
                            if (packageDirectory !== "") {
                                (resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageId = resolutionState.$go$private$__go_module$getPackageId(r, (resolvedFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, resolutionState.$go$private$__go_module$getPackageJsonInfo(r, packageDirectory));
                            }
                            return resolutionState.$go$private$__go_module$createResolvedTypeReferenceDirective(r, resolvedFromFile, true);
                        }
                    }
                }
                {
                    let resolvedFromDirectory: resolved | undefined = resolutionState.$go$private$__go_module$loadNodeModuleFromDirectory(r, extensionsDeclaration$constant(), candidate, true);
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(resolvedFromDirectory)) {
                        return resolutionState.$go$private$__go_module$createResolvedTypeReferenceDirective(r, resolvedFromDirectory, true);
                    }
                }
            }
        }
        else if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths, RuntimeSlice.nil<GoInterface | undefined>());
        }
        let resolved__shadow_1: resolved | undefined = void 0;
        if (!fromConfig || !fromInferredTypesContainingFile) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Looking_up_in_node_modules_folder_initial_location_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory)]));
            }
            if (!IsExternalModuleNameRelative__from_tspath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name)) {
                resolved__shadow_1 = resolutionState.$go$private$__go_module$loadModuleFromNearestNodeModulesDirectory(r, false);
            }
            else {
                let candidate = normalizePathForCJSResolution((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name);
                resolved__shadow_1 = resolutionState.$go$private$__go_module$nodeLoadModuleByRelativeName(r, extensionsDeclaration$constant(), candidate, true);
            }
        }
        else if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Resolving_type_reference_directive_for_program_that_specifies_custom_typeRoots_skipping_lookup_in_node_modules_folder, RuntimeSlice.nil<GoInterface | undefined>());
        }
        return resolutionState.$go$private$__go_module$createResolvedTypeReferenceDirective(r, resolved__shadow_1, false);
    }
    static $go$private$__go_module$tryAddingExtensions(r: resolutionState | undefined, extensionless: gostring, extensions__shadow_1: extensions, originalExtension: gostring): resolved | undefined {
        let directory = GetDirectoryPath__from_tspath(extensionless);
        let __gotots_logical_result_5 = directory !== "";
        if (__gotots_logical_result_5) {
            const __gotots_receiver_57: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_58 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_57).FS();
            const __gotots_argument_68 = directory;
            __gotots_logical_result_5 = !goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_58).DirectoryExists(__gotots_argument_68);
        }
        if (__gotots_logical_result_5) {
            return continueSearching();
        }
        switch (originalExtension) {
            case ExtensionMjs$string__from_tspath:
            case ExtensionMts$string__from_tspath:
            case ExtensionDmts$string__from_tspath: {
                if (!((extensions__shadow_1 & extensionsTypeScript$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionMts$string__from_tspath, extensionless, originalExtension === ExtensionMts$string__from_tspath || originalExtension === ExtensionDmts$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionDmts$string__from_tspath, extensionless, originalExtension === ExtensionMts$string__from_tspath || originalExtension === ExtensionDmts$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsJavaScript$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionMjs$string__from_tspath, extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                return continueSearching();
                break;
            }
            case ExtensionCjs$string__from_tspath:
            case ExtensionCts$string__from_tspath:
            case ExtensionDcts$string__from_tspath: {
                if (!((extensions__shadow_1 & extensionsTypeScript$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionCts$string__from_tspath, extensionless, originalExtension === ExtensionCts$string__from_tspath || originalExtension === ExtensionDcts$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionDcts$string__from_tspath, extensionless, originalExtension === ExtensionCts$string__from_tspath || originalExtension === ExtensionDcts$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsJavaScript$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionCjs$string__from_tspath, extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                return continueSearching();
                break;
            }
            case ExtensionJson$string__from_tspath: {
                if (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ".d.json.ts", extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsJson$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionJson$string__from_tspath, extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                return continueSearching();
                break;
            }
            case ExtensionTsx$string__from_tspath:
            case ExtensionJsx$string__from_tspath: {
                if (!((extensions__shadow_1 & extensionsTypeScript$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionTsx$string__from_tspath, extensionless, originalExtension === ExtensionTsx$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionTs$string__from_tspath, extensionless, originalExtension === ExtensionTsx$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionDts$string__from_tspath, extensionless, originalExtension === ExtensionTsx$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsJavaScript$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionJsx$string__from_tspath, extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionJs$string__from_tspath, extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                return continueSearching();
                break;
            }
            case ExtensionTs$string__from_tspath:
            case ExtensionDts$string__from_tspath:
            case ExtensionJs$string__from_tspath:
            case "": {
                if (!((extensions__shadow_1 & extensionsTypeScript$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionTs$string__from_tspath, extensionless, originalExtension === ExtensionTs$string__from_tspath || originalExtension === ExtensionDts$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionTsx$string__from_tspath, extensionless, originalExtension === ExtensionTs$string__from_tspath || originalExtension === ExtensionDts$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionDts$string__from_tspath, extensionless, originalExtension === ExtensionTs$string__from_tspath || originalExtension === ExtensionDts$string__from_tspath);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if (!((extensions__shadow_1 & extensionsJavaScript$constant()) === 0)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionJs$string__from_tspath, extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionJsx$string__from_tspath, extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isConfigLookup) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ExtensionJson$string__from_tspath, extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                return continueSearching();
                break;
            }
            default: {
                if (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0) && !IsDeclarationFileName__from_tspath(extensionless + originalExtension)) {
                    {
                        let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryExtension(r, ".d" + originalExtension + ".ts", extensionless, false);
                        if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                            return resolved__shadow_1;
                        }
                    }
                }
                return continueSearching();
                break;
            }
        }
    }
    static $go$private$__go_module$tryExtension(r: resolutionState | undefined, extension: gostring, extensionless: gostring, resolvedUsingTsExtension: bool): resolved | undefined {
        let fileName = extensionless + extension;
        {
            const __gotots_results_30 = resolutionState.$go$private$__go_module$tryFile(r, fileName);
            let path = __gotots_results_30[0];
            let ok = __gotots_results_30[1];
            if (ok) {
                return new resolved(path, extension, PackageId.$zero(), "", !(r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).candidateEndingIsFromConfig && resolvedUsingTsExtension);
            }
        }
        return continueSearching();
    }
    static $go$private$__go_module$tryFile(r: resolutionState | undefined, fileName: gostring): [
        gostring,
        bool
    ] {
        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSuffixes.length === 0) {
            return [fileName, resolutionState.$go$private$__go_module$tryFileLookup(r, fileName)];
        }
        let ext = TryGetExtensionFromPath__from_tspath(fileName);
        let fileNameNoExtension = RemoveExtension__from_tspath(fileName, ext);
        const __gotots_range_15: CompilerOptions__from_core["ModuleSuffixes"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSuffixes;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_15.length; __gotots_range_index_11++) {
            const __gotots_range_value_15 = __gotots_range_15.get(__gotots_range_index_11);
            let suffix = __gotots_range_value_15;
            let path = fileNameNoExtension + suffix + ext;
            if (resolutionState.$go$private$__go_module$tryFileLookup(r, path)) {
                return [path, true];
            }
        }
        return [fileName, false];
    }
    static $go$private$__go_module$tryFileLookup(r: resolutionState | undefined, fileName: gostring): bool {
        const __gotots_receiver_76: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_receiver_77 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_76).FS();
        const __gotots_argument_97 = fileName;
        if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_77).FileExists(__gotots_argument_97)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.File_0_exists_use_it_as_a_name_resolution_result, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fileName)]));
            }
            return true;
        }
        else if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.File_0_does_not_exist, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fileName)]));
        }
        return false;
    }
    static $go$private$__go_module$tryLoadInputFileForPath(r: resolutionState | undefined, finalPath: gostring, entry: gostring, packagePath: gostring, isImports: bool): resolved | undefined {
        let __gotots_logical_result_7 = !(r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isConfigLookup && (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir !== "" || ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== "") && !strings__from_gostdlib.Contains(finalPath, "/node_modules/");
        if (__gotots_logical_result_7) {
            let __gotots_logical_result_6 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath === "";
            if (!__gotots_logical_result_6) {
                const __gotots_argument_81 = GetDirectoryPath__from_tspath(packagePath);
                const __gotots_argument_82: CompilerOptions__from_core["ConfigFilePath"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath;
                const __gotots_receiver_63: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_receiver_64 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_63).FS();
                const __gotots_field_11 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_64).UseCaseSensitiveFileNames();
                const __gotots_receiver_65: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_field_12 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_65).GetCurrentDirectory();
                const __gotots_argument_83 = new ComparePathsOptions__from_tspath(__gotots_field_11, __gotots_field_12);
                __gotots_logical_result_6 = ContainsPath__from_tspath(__gotots_argument_81, __gotots_argument_82, __gotots_argument_83);
            }
            __gotots_logical_result_7 = (__gotots_logical_result_6);
        }
        if (__gotots_logical_result_7) {
            let rootDir = "";
            if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir !== "") {
                rootDir = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir;
            }
            else if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "") {
                rootDir = GetDirectoryPath__from_tspath(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath);
            }
            else {
                const __gotots_argument_84 = void 0;
                const __gotots_struct_3 = TextRange__from_core.$zero();
                const __gotots_argument_85 = __gotots_struct_3;
                const __gotots_argument_86 = IfElse$PointerTo_Named_diagnostics$Message(isImports, $state__diagnostics.The_project_root_is_ambiguous_but_is_required_to_resolve_import_map_entry_0_in_file_1_Supply_the_rootDir_compiler_option_to_disambiguate, $state__diagnostics.The_project_root_is_ambiguous_but_is_required_to_resolve_export_map_entry_0_in_file_1_Supply_the_rootDir_compiler_option_to_disambiguate);
                const __gotots_argument_87 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(IfElse$string(entry === "", ".", entry)), new GoInterfaceAdapter(packagePath)]);
                let diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = NewDiagnostic__from_ast(__gotots_argument_84, __gotots_argument_85, __gotots_argument_86, __gotots_argument_87);
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).diagnostics = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).diagnostics.append(void 0, [diagnostic]);
                return unresolved();
            }
            let candidateDirectories = resolutionState.$go$private$__go_module$getOutputDirectoriesForBaseDirectory(r, rootDir);
            const __gotots_range_16 = candidateDirectories;
            for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_16.length; __gotots_range_index_12++) {
                const __gotots_range_value_16 = __gotots_range_16.get(__gotots_range_index_12);
                let candidateDir = __gotots_range_value_16;
                const __gotots_argument_88 = candidateDir;
                const __gotots_argument_89 = finalPath;
                const __gotots_receiver_66: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_receiver_67 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_66).FS();
                const __gotots_field_13 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_67).UseCaseSensitiveFileNames();
                const __gotots_receiver_68: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_field_14 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_68).GetCurrentDirectory();
                const __gotots_argument_90 = new ComparePathsOptions__from_tspath(__gotots_field_13, __gotots_field_14);
                if (ContainsPath__from_tspath(__gotots_argument_88, __gotots_argument_89, __gotots_argument_90)) {
                    let pathFragment = "";
                    if (finalPath.length > candidateDir.length) {
                        pathFragment = goStringSlice(finalPath, candidateDir.length + 1);
                    }
                    let possibleInputBase = CombinePaths__from_tspath(rootDir, RuntimeSlice.literal<gostring>([pathFragment]));
                    let jsAndDtsExtensions = RuntimeSlice.literal<gostring>([ExtensionMjs$string__from_tspath, ExtensionCjs$string__from_tspath, ExtensionJs$string__from_tspath, ExtensionJson$string__from_tspath, ExtensionDmts$string__from_tspath, ExtensionDcts$string__from_tspath, ExtensionDts$string__from_tspath]);
                    const __gotots_range_17 = jsAndDtsExtensions;
                    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_17.length; __gotots_range_index_13++) {
                        const __gotots_range_value_17 = __gotots_range_17.get(__gotots_range_index_13);
                        let ext = __gotots_range_value_17;
                        if (FileExtensionIs__from_tspath(possibleInputBase, ext)) {
                            let inputExts = GetPossibleOriginalInputExtensionForExtension__from_tspath(possibleInputBase);
                            const __gotots_range_18 = inputExts;
                            for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_18.length; __gotots_range_index_14++) {
                                const __gotots_range_value_18 = __gotots_range_18.get(__gotots_range_index_14);
                                let possibleExt = __gotots_range_value_18;
                                if (!extensionIsOk((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions, possibleExt)) {
                                    continue;
                                }
                                let possibleInputWithInputExtension = ChangeExtension__from_tspath(possibleInputBase, possibleExt);
                                const __gotots_receiver_69: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                                const __gotots_receiver_70 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_69).FS();
                                const __gotots_argument_91 = possibleInputWithInputExtension;
                                if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_70).FileExists(__gotots_argument_91)) {
                                    let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$loadFileNameFromPackageJSONField(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions, possibleInputWithInputExtension, "");
                                    if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                                        return resolved__shadow_1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return continueSearching();
    }
    static $go$private$__go_module$tryLoadModuleUsingOptionalResolutionSettings(r: resolutionState | undefined): resolved | undefined {
        {
            let resolved__shadow_1: resolved | undefined = resolutionState.$go$private$__go_module$tryLoadModuleUsingPathsIfEligible(r);
            if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                return resolved__shadow_1;
            }
        }
        if (!IsExternalModuleNameRelative__from_tspath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name)) {
            return continueSearching();
        }
        else {
            return resolutionState.$go$private$__go_module$tryLoadModuleUsingRootDirs(r);
        }
    }
    static $go$private$__go_module$tryLoadModuleUsingPaths(r: resolutionState | undefined, extensions__shadow_1: extensions, moduleName: gostring, containingDirectory: gostring, paths: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined, pathPatterns: {
        value: ParsedPatterns;
    } | undefined, loader: (($0: extensions, $1: gostring) => resolved | undefined) | undefined): resolved | undefined {
        {
            let matchedPattern = MatchPatternOrExact(pathPatterns, moduleName);
            if (Pattern__from_core.IsValid(matchedPattern)) {
                let matchedStar = Pattern__from_core.MatchedText(matchedPattern, moduleName);
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Module_name_0_matched_pattern_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(moduleName), new GoInterfaceAdapter(Pattern__from_core.$storageOf(matchedPattern).Text)]));
                }
                const __gotots_range_11 = OrderedMap$GetOrZero$string$SliceOf_string(paths, Pattern__from_core.$storageOf(matchedPattern).Text);
                for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_11.length; __gotots_range_index_8++) {
                    const __gotots_range_value_11 = __gotots_range_11.get(__gotots_range_index_8);
                    let subst = __gotots_range_value_11;
                    let path = strings__from_gostdlib.Replace(subst, "*", matchedStar, BigInt.asIntN(64, goNumberToBigInt(1)));
                    let candidate = NormalizePath__from_tspath(CombinePaths__from_tspath(containingDirectory, RuntimeSlice.literal<gostring>([path])));
                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                        tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(subst), new GoInterfaceAdapter(path)]));
                    }
                    let extensionFromSubst = TryGetExtensionFromPath__from_tspath(subst);
                    if (extensionFromSubst !== "") {
                        {
                            const __gotots_results_20 = resolutionState.$go$private$__go_module$tryFile(r, candidate);
                            let path__shadow_1 = __gotots_results_20[0];
                            let ok = __gotots_results_20[1];
                            if (ok) {
                                return new resolved(path__shadow_1, extensionFromSubst, PackageId.$zero(), "", false);
                            }
                        }
                    }
                    let saveCandidateEndingIsFromConfig = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).candidateEndingIsFromConfig;
                    if (extensionFromSubst !== "") {
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).candidateEndingIsFromConfig = true;
                    }
                    const __gotots_callee_4 = loader;
                    const __gotots_argument_59 = extensions__shadow_1;
                    const __gotots_argument_60 = candidate;
                    let resolved__shadow_1: resolved | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59, __gotots_argument_60);
                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).candidateEndingIsFromConfig = saveCandidateEndingIsFromConfig;
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(resolved__shadow_1)) {
                        return resolved__shadow_1;
                    }
                }
            }
        }
        return continueSearching();
    }
    static $go$private$__go_module$tryLoadModuleUsingPathsIfEligible(r: resolutionState | undefined): resolved | undefined {
        if (OrderedMap$Size$string$SliceOf_string(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths) > 0 && !PathIsRelative__from_tspath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name)) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name)]));
            }
        }
        else {
            return continueSearching();
        }
        const __gotots_receiver_38 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        const __gotots_receiver_37: Resolver["host"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_argument_42 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_37).GetCurrentDirectory();
        let baseDirectory = CompilerOptions__from_core.GetPathsBasePath(__gotots_receiver_38, __gotots_argument_42);
        let pathPatterns: {
            value: ParsedPatterns;
        } | undefined = resolutionState.$go$private$__go_module$getParsedPatternsForPaths(r);
        return resolutionState.$go$private$__go_module$tryLoadModuleUsingPaths(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, baseDirectory, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths, pathPatterns, (extensions__shadow_1: extensions, candidate: gostring): resolved | undefined => {
            return resolutionState.$go$private$__go_module$nodeLoadModuleByRelativeName(r, extensions__shadow_1, candidate, true);
        });
    }
    static $go$private$__go_module$tryLoadModuleUsingRootDirs(r: resolutionState | undefined): resolved | undefined {
        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDirs.length === 0) {
            return continueSearching();
        }
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name)]));
        }
        let candidate = NormalizePath__from_tspath(CombinePaths__from_tspath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).containingDirectory, RuntimeSlice.literal<gostring>([(r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name])));
        let matchedRootDir = "";
        let matchedNormalizedPrefix = "";
        const __gotots_range_5: CompilerOptions__from_core["RootDirs"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDirs;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
            let rootDir = __gotots_range_value_5;
            let normalizedRoot = NormalizePath__from_tspath(rootDir);
            if (!strings__from_gostdlib.HasSuffix(normalizedRoot, "/")) {
                normalizedRoot = normalizedRoot + "/";
            }
            let isLongestMatchingPrefix = strings__from_gostdlib.HasPrefix(candidate, normalizedRoot) && (matchedNormalizedPrefix === "" || matchedNormalizedPrefix.length < normalizedRoot.length);
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Checking_if_0_is_the_longest_matching_prefix_for_1_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(normalizedRoot), new GoInterfaceAdapter(candidate), new $goInterfaceAdapter$bool(isLongestMatchingPrefix)]));
            }
            if (isLongestMatchingPrefix) {
                matchedNormalizedPrefix = normalizedRoot;
                matchedRootDir = rootDir;
            }
        }
        if (matchedNormalizedPrefix !== "") {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Longest_matching_prefix_for_0_is_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(candidate), new GoInterfaceAdapter(matchedNormalizedPrefix)]));
            }
            let suffix = goStringSlice(candidate, matchedNormalizedPrefix.length);
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(suffix), new GoInterfaceAdapter(matchedNormalizedPrefix), new GoInterfaceAdapter(candidate)]));
            }
            let loader: (($0: extensions, $1: gostring) => resolved | undefined) | undefined = (extensions__shadow_1: extensions, candidate__shadow_1: gostring): resolved | undefined => {
                return resolutionState.$go$private$__go_module$nodeLoadModuleByRelativeName(r, extensions__shadow_1, candidate__shadow_1, true);
            };
            {
                const __gotots_callee_1 = loader;
                const __gotots_argument_43 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions;
                const __gotots_argument_44 = candidate;
                let resolvedFileName: resolved | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43, __gotots_argument_44);
                if (!resolved.$go$private$__go_module$shouldContinueSearching(resolvedFileName)) {
                    return resolvedFileName;
                }
            }
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Trying_other_entries_in_rootDirs, RuntimeSlice.nil<GoInterface | undefined>());
            }
            const __gotots_range_6: CompilerOptions__from_core["RootDirs"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDirs;
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                let rootDir = __gotots_range_value_6;
                if (rootDir === matchedRootDir) {
                    continue;
                }
                let candidate__shadow_1 = CombinePaths__from_tspath(NormalizePath__from_tspath(rootDir), RuntimeSlice.literal<gostring>([suffix]));
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                    tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(suffix), new GoInterfaceAdapter(rootDir), new GoInterfaceAdapter(candidate__shadow_1)]));
                }
                {
                    const __gotots_callee_2 = loader;
                    const __gotots_argument_45 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions;
                    const __gotots_argument_46 = candidate__shadow_1;
                    let resolvedFileName: resolved | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_45, __gotots_argument_46);
                    if (!resolved.$go$private$__go_module$shouldContinueSearching(resolvedFileName)) {
                        return resolvedFileName;
                    }
                }
            }
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.Module_resolution_using_rootDirs_has_failed, RuntimeSlice.nil<GoInterface | undefined>());
            }
        }
        return continueSearching();
    }
    static $go$private$__go_module$validatePackageJSONField(r: resolutionState | undefined, fieldName: gostring, field: TypeValidatedField__from_packagejson | undefined): bool {
        const __gotots_receiver_71 = field;
        if (goInterfaceNonNil<TypeValidatedField__from_packagejson>(__gotots_receiver_71).IsPresent()) {
            const __gotots_receiver_72 = field;
            if (goInterfaceNonNil<TypeValidatedField__from_packagejson>(__gotots_receiver_72).IsValid()) {
                return true;
            }
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
                const __gotots_receiver_75 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer;
                const __gotots_argument_95 = $state__diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2;
                const __gotots_argument_92 = new GoInterfaceAdapter(fieldName);
                const __gotots_receiver_73 = field;
                const __gotots_argument_93 = new GoInterfaceAdapter(goInterfaceNonNil<TypeValidatedField__from_packagejson>(__gotots_receiver_73).ExpectedJSONType());
                const __gotots_receiver_74 = field;
                const __gotots_argument_94 = new GoInterfaceAdapter(goInterfaceNonNil<TypeValidatedField__from_packagejson>(__gotots_receiver_74).ActualJSONType());
                const __gotots_argument_96 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_92, __gotots_argument_93, __gotots_argument_94]);
                tracer.$go$private$__go_module$write(__gotots_receiver_75, __gotots_argument_95, __gotots_argument_96);
            }
        }
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer === undefined)) {
            tracer.$go$private$__go_module$write((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracer, $state__diagnostics.X_package_json_does_not_have_a_0_field, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fieldName)]));
        }
        return false;
    }
}
export function newResolutionState(name: gostring, containingDirectory: gostring, isTypeReferenceDirective: bool, resolutionMode: ModuleKind__from_core, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, redirectedReference: ResolvedProjectReference | undefined, resolver: {
    value: Resolver;
} | undefined, traceBuilder: tracer | undefined): resolutionState | undefined {
    let state: resolutionState | undefined = new resolutionState(resolver, traceBuilder, name, containingDirectory, false, 0, false, RuntimeSlice.nil<gostring>(), 0, GetCompilerOptionsWithRedirect(compilerOptions, redirectedReference), false, false, false, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), named_sync.SyncOnceOperations.$zero(), void 0);
    if (isTypeReferenceDirective) {
        (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = extensionsDeclaration$constant();
    }
    else if ((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoDtsResolution === TSTrue$constant__from_core()) {
        (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = extensionsImplementationFiles$constant();
    }
    else {
        (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = 7;
    }
    if (!isTypeReferenceDirective && CompilerOptions__from_core.GetResolveJsonModule(compilerOptions)) {
        const __gotots_store_3 = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_3.extensions = __gotots_store_3.extensions | 8;
    }
    switch (CompilerOptions__from_core.GetModuleResolutionKind(compilerOptions)) {
        case ModuleResolutionKindNode16$constant__from_core(): {
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features = NodeResolutionFeaturesNode16Default$constant();
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode = resolutionMode === ModuleKindESNext$constant__from_core();
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions = GetConditions(compilerOptions, resolutionMode);
            break;
        }
        case ModuleResolutionKindNodeNext$constant__from_core(): {
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features = NodeResolutionFeaturesNodeNextDefault$constant();
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmMode = resolutionMode === ModuleKindESNext$constant__from_core();
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions = GetConditions(compilerOptions, resolutionMode);
            break;
        }
        case ModuleResolutionKindBundler$constant__from_core(): {
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).features = getNodeResolutionFeatures(compilerOptions);
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions = GetConditions(compilerOptions, resolutionMode);
            break;
        }
    }
    return state;
}
export function GetCompilerOptionsWithRedirect(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, redirectedReference: ResolvedProjectReference | undefined): {
    value: CompilerOptions__from_core;
} | undefined {
    if (redirectedReference === undefined) {
        return compilerOptions;
    }
    {
        const __gotots_receiver_4 = redirectedReference;
        let optionsFromRedirect: {
            value: CompilerOptions__from_core;
        } | undefined = goInterfaceNonNil<ResolvedProjectReference>(__gotots_receiver_4).CompilerOptions();
        if (!(optionsFromRedirect === undefined)) {
            return optionsFromRedirect;
        }
    }
    return compilerOptions;
}
export class Resolver {
    declare private readonly $goType: void;
    public constructor(public caches: caches, public host: ResolutionHost | undefined, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public typingsLocation: gostring, public projectName: gostring) {
    }
    static $copy($source: Resolver): Resolver {
        return new Resolver(caches.$copy($source.caches), $source.host, $source.compilerOptions, $source.typingsLocation, $source.projectName);
    }
    declare private readonly then?: never;
    static GetEntrypointsFromPackageJsonInfo(r: {
        value: Resolver;
    } | undefined, packageJson: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, packageName: gostring, enableDirectorySearch: bool): RuntimeSlice<ResolvedEntrypoint | undefined> {
        let extensions__shadow_1 = 5;
        let features = NodeResolutionFeaturesAll$constant();
        let state: resolutionState | undefined = new resolutionState(r, void 0, "", "", false, features, false, RuntimeSlice.nil<gostring>(), extensions__shadow_1, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions, false, false, false, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), named_sync.SyncOnceOperations.$zero(), void 0);
        let __gotots_logical_result_8 = InfoCacheEntry__from_packagejson.Exists(packageJson);
        if (__gotots_logical_result_8) {
            const __gotots_store_20 = ExportsOrImports__from_packagejson.$storageOf(((packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports);
            __gotots_logical_result_8 = JSONValue__from_packagejson.IsPresent(tsonicTypeScriptRuntime.projectLocation<JSONValue__from_packagejson$Storage, JSONValue__from_packagejson>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "JSONValue"), JSONValue__from_packagejson.$fromStorage, JSONValue__from_packagejson.$storageOf));
        }
        if (__gotots_logical_result_8) {
            let entrypoints = resolutionState.$go$private$__go_module$loadEntrypointsFromExportMap(state, packageJson, packageName, ExportsOrImports__from_packagejson.$copy(((packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports));
            return entrypoints;
        }
        let result = RuntimeSlice.nil<ResolvedEntrypoint | undefined>();
        let mainResolution: resolved | undefined = resolutionState.$go$private$__go_module$loadNodeModuleFromDirectoryWorker(state, extensions__shadow_1, (packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory, packageJson);
        if (resolved.$go$private$__go_module$isResolved(mainResolution)) {
            result = result.append(void 0, [Resolver.$go$private$__go_module$createResolvedEntrypointHandlingSymlink(r, (mainResolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, packageName, void 0, void 0, EndingFixed$constant())]);
        }
        if (enableDirectorySearch) {
            const __gotots_receiver_84: Resolver["host"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_argument_112 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_84).FS();
            const __gotots_receiver_85: Resolver["host"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_argument_113 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_85).GetCurrentDirectory();
            const __gotots_argument_114: InfoCacheEntry__from_packagejson["PackageDirectory"] = (packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
            const __gotots_argument_115 = extensions_Array(extensions__shadow_1);
            const __gotots_argument_116 = RuntimeSlice.literal<gostring>(["node_modules"]);
            const __gotots_argument_117 = RuntimeSlice.literal<gostring>(["**/*"]);
            const __gotots_argument_118 = UnlimitedDepth$int__from_vfsmatch;
            let otherFiles = ReadDirectory__from_vfsmatch(__gotots_argument_112, __gotots_argument_113, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116, __gotots_argument_117, __gotots_argument_118);
            const __gotots_receiver_86: Resolver["host"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_87 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_86).FS();
            const __gotots_field_15 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_87).UseCaseSensitiveFileNames();
            let comparePathsOptions = new ComparePathsOptions__from_tspath(__gotots_field_15, "");
            const __gotots_range_19 = otherFiles;
            for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_19.length; __gotots_range_index_15++) {
                const __gotots_range_value_19 = __gotots_range_19.get(__gotots_range_index_15);
                let file = __gotots_range_value_19;
                if (resolved.$go$private$__go_module$isResolved(mainResolution) && ComparePaths__from_tspath(file, (mainResolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path, ComparePathsOptions__from_tspath.$copy(comparePathsOptions)) === 0) {
                    continue;
                }
                result = result.append(void 0, [Resolver.$go$private$__go_module$createResolvedEntrypointHandlingSymlink(r, file, ResolvePath__from_tspath(packageName, RuntimeSlice.literal<gostring>([GetRelativePathFromDirectory__from_tspath((packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory, file, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))])), void 0, void 0, EndingChangeable$constant())]);
            }
        }
        if (result.length > 0) {
            return result;
        }
        return RuntimeSlice.nil<ResolvedEntrypoint | undefined>();
    }
    static GetPackageScopeForPath(r: {
        value: Resolver;
    } | undefined, directory: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined {
        return resolutionState.$go$private$__go_module$getPackageScopeForPath((new resolutionState(r, void 0, "", "", false, 0, false, RuntimeSlice.nil<gostring>(), 0, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions, false, false, false, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), named_sync.SyncOnceOperations.$zero(), void 0)), directory);
    }
    static ResolveModuleName(r: {
        value: Resolver;
    } | undefined, moduleName: gostring, containingFile: gostring, resolutionMode: ModuleKind__from_core, redirectedReference: ResolvedProjectReference | undefined): [
        tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined,
        RuntimeSlice<DiagAndArgs$Storage>
    ] {
        let containingDirectory = GetDirectoryPath__from_tspath(containingFile);
        let traceBuilder: tracer | undefined = Resolver.$go$private$__go_module$newTraceBuilder(r);
        let cacheKey = moduleResolutionCacheKey.$fromStorage({
            containingDirectory: containingDirectory,
            moduleName: moduleName,
            resolutionMode: resolutionMode,
            redirectConfigName: getRedirectConfigName(redirectedReference)
        });
        if (traceBuilder === undefined) {
            {
                const __gotots_store_0: Resolver["caches"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches;
                const __gotots_results_0 = moduleResolutionCache.Get(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "moduleResolutionCache"), moduleResolutionCacheKey.$copy(cacheKey));
                let cached: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (ok) {
                    return [cached, RuntimeSlice.nil<DiagAndArgs$Storage>()];
                }
            }
        }
        let compilerOptions: {
            value: CompilerOptions__from_core;
        } | undefined = GetCompilerOptionsWithRedirect((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions, redirectedReference);
        if (!(traceBuilder === undefined)) {
            tracer.$go$private$__go_module$write(traceBuilder, $state__diagnostics.Resolving_module_0_from_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(moduleName), new GoInterfaceAdapter(containingFile)]));
            tracer.$go$private$__go_module$traceResolutionUsingProjectReference(traceBuilder, redirectedReference);
        }
        let moduleResolution = CompilerOptions__from_core.GetModuleResolutionKind(compilerOptions);
        if (!((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleResolution === moduleResolution)) {
            if (!(traceBuilder === undefined)) {
                tracer.$go$private$__go_module$write(traceBuilder, $state__diagnostics.Module_resolution_kind_is_not_specified_using_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(ModuleResolutionKind_String__from_core(moduleResolution))]));
            }
        }
        else {
            if (!(traceBuilder === undefined)) {
                tracer.$go$private$__go_module$write(traceBuilder, $state__diagnostics.Explicitly_specified_module_resolution_kind_Colon_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(ModuleResolutionKind_String__from_core(moduleResolution))]));
            }
        }
        let result: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined = void 0;
        switch (moduleResolution) {
            case ModuleResolutionKindNode16$constant__from_core():
            case ModuleResolutionKindNodeNext$constant__from_core():
            case ModuleResolutionKindBundler$constant__from_core(): {
                let state: resolutionState | undefined = newResolutionState(moduleName, containingDirectory, false, resolutionMode, compilerOptions, redirectedReference, r, traceBuilder);
                result = resolutionState.$go$private$__go_module$resolveNodeLike(state);
                break;
            }
            default: {
                const __gotots_argument_3 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Unexpected moduleResolution: %d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_core$ModuleResolutionKind(moduleResolution)])));
                GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
                break;
            }
        }
        if (!(traceBuilder === undefined)) {
            if (ResolvedModule.IsResolved(result)) {
                if (PackageId.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.PackageId).Name !== "") {
                    const __gotots_receiver_3 = traceBuilder;
                    const __gotots_argument_7 = $state__diagnostics.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2;
                    const __gotots_argument_4 = new GoInterfaceAdapter(moduleName);
                    const __gotots_argument_5 = new GoInterfaceAdapter(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolvedFileName);
                    const __gotots_store_1 = ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value;
                    const __gotots_argument_6 = new GoInterfaceAdapter(PackageId.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "PackageId")));
                    const __gotots_argument_8 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_4, __gotots_argument_5, __gotots_argument_6]);
                    tracer.$go$private$__go_module$write(__gotots_receiver_3, __gotots_argument_7, __gotots_argument_8);
                }
                else {
                    tracer.$go$private$__go_module$write(traceBuilder, $state__diagnostics.Module_name_0_was_successfully_resolved_to_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(moduleName), new GoInterfaceAdapter(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolvedFileName)]));
                }
            }
            else {
                tracer.$go$private$__go_module$write(traceBuilder, $state__diagnostics.Module_name_0_was_not_resolved, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(moduleName)]));
            }
        }
        let finalResult: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined = Resolver.$go$private$__go_module$tryResolveFromTypingsLocation(r, moduleName, containingDirectory, result, traceBuilder);
        const __gotots_store_2: Resolver["caches"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches;
        moduleResolutionCache.Set(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "moduleResolutionCache"), moduleResolutionCacheKey.$copy(cacheKey), finalResult);
        return [finalResult, tracer.$go$private$__go_module$getTraces(traceBuilder)];
    }
    static ResolvePackageDirectory(r: {
        value: Resolver;
    } | undefined, moduleName: gostring, containingFile: gostring, resolutionMode: ModuleKind__from_core, redirectedReference: ResolvedProjectReference | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined {
        let compilerOptions: {
            value: CompilerOptions__from_core;
        } | undefined = GetCompilerOptionsWithRedirect((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions, redirectedReference);
        let containingDirectory = GetDirectoryPath__from_tspath(containingFile);
        let state: resolutionState | undefined = newResolutionState(moduleName, containingDirectory, false, resolutionMode, compilerOptions, redirectedReference, r, void 0);
        (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolvePackageDirectoryOnly = true;
        {
            let result: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromNearestNodeModulesDirectory(state, false);
            if (!(result === undefined) && (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path !== "") {
                return resolutionState.$go$private$__go_module$createResolvedModuleHandlingSymlink(state, result);
            }
        }
        return void 0;
    }
    static ResolveTypeReferenceDirective(r: {
        value: Resolver;
    } | undefined, typeReferenceDirectiveName: gostring, containingFile: gostring, resolutionMode: ModuleKind__from_core, redirectedReference: ResolvedProjectReference | undefined): [
        tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective> | undefined,
        RuntimeSlice<DiagAndArgs$Storage>
    ] {
        let containingDirectory = GetDirectoryPath__from_tspath(containingFile);
        let traceBuilder: tracer | undefined = Resolver.$go$private$__go_module$newTraceBuilder(r);
        let fromInferredTypesContainingFile = strings__from_gostdlib.HasSuffix(containingFile, InferredTypesContainingFile$string);
        let cacheKey = typeRefDirectiveResolutionCacheKey.$fromStorage({
            containingDirectory: containingDirectory,
            typeReferenceName: typeReferenceDirectiveName,
            resolutionMode: resolutionMode,
            redirectConfigName: getRedirectConfigName(redirectedReference),
            fromInferredTypesContainingFile: fromInferredTypesContainingFile
        });
        if (traceBuilder === undefined) {
            {
                const __gotots_store_4: Resolver["caches"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches;
                const __gotots_results_1 = typeRefDirectiveResolutionCache.Get(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "typeRefDirectiveResolutionCache"), typeRefDirectiveResolutionCacheKey.$copy(cacheKey));
                let cached: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective> | undefined = __gotots_results_1[0];
                let ok = __gotots_results_1[1];
                if (ok) {
                    return [cached, RuntimeSlice.nil<DiagAndArgs$Storage>()];
                }
            }
        }
        let compilerOptions: {
            value: CompilerOptions__from_core;
        } | undefined = GetCompilerOptionsWithRedirect((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions, redirectedReference);
        const __gotots_receiver_13 = compilerOptions;
        const __gotots_receiver_12: Resolver["host"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_argument_18 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_12).GetCurrentDirectory();
        const __gotots_results_2 = CompilerOptions__from_core.GetEffectiveTypeRoots(__gotots_receiver_13, __gotots_argument_18);
        let typeRoots = __gotots_results_2[0];
        let fromConfig = __gotots_results_2[1];
        if (!(traceBuilder === undefined)) {
            tracer.$go$private$__go_module$write(traceBuilder, $state__diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typeReferenceDirectiveName), new GoInterfaceAdapter(containingFile), new GoInterfaceAdapter(strings__from_gostdlib.Join(typeRoots, ","))]));
            tracer.$go$private$__go_module$traceResolutionUsingProjectReference(traceBuilder, redirectedReference);
        }
        let state: resolutionState | undefined = newResolutionState(typeReferenceDirectiveName, containingDirectory, true, resolutionMode, compilerOptions, redirectedReference, r, traceBuilder);
        let result: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective> | undefined = resolutionState.$go$private$__go_module$resolveTypeReferenceDirective(state, typeRoots, fromConfig, fromInferredTypesContainingFile);
        if (!(traceBuilder === undefined)) {
            tracer.$go$private$__go_module$traceTypeReferenceDirectiveResult(traceBuilder, typeReferenceDirectiveName, result);
        }
        const __gotots_store_5: Resolver["caches"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches;
        typeRefDirectiveResolutionCache.Set(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "typeRefDirectiveResolutionCache"), typeRefDirectiveResolutionCacheKey.$copy(cacheKey), result);
        return [result, tracer.$go$private$__go_module$getTraces(traceBuilder)];
    }
    static $go$private$__go_module$createResolvedEntrypointHandlingSymlink(r: {
        value: Resolver;
    } | undefined, fileName: gostring, moduleSpecifier: gostring, includeConditions: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, excludeConditions: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, ending: Ending): ResolvedEntrypoint | undefined {
        let originalFileName = "";
        let resolvedFileName = fileName;
        {
            const __gotots_receiver_92: Resolver["host"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
            const __gotots_receiver_93 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_92).FS();
            const __gotots_argument_150 = fileName;
            let realPath = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_93).Realpath(__gotots_argument_150);
            if (realPath !== fileName) {
                originalFileName = fileName;
                resolvedFileName = realPath;
            }
        }
        return new ResolvedEntrypoint(originalFileName, resolvedFileName, moduleSpecifier, ending, includeConditions, excludeConditions);
    }
    static $go$private$__go_module$getParsedPatternsForPaths(r: {
        value: Resolver;
    } | undefined): {
        value: ParsedPatterns;
    } | undefined {
        sync__from_gostdlib.Once.Do((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches.parsedPatternsForPathsOnce, (): void => {
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches.parsedPatternsForPaths = TryParsePatterns(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths);
        });
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches.parsedPatternsForPaths;
    }
    static $go$private$__go_module$newTraceBuilder(r: {
        value: Resolver;
    } | undefined): tracer | undefined {
        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TraceResolution === TSTrue$constant__from_core()) {
            return new tracer(RuntimeSlice.nil<DiagAndArgs$Storage>());
        }
        return void 0;
    }
    static $go$private$__go_module$resolveConfig(r: {
        value: Resolver;
    } | undefined, moduleName: gostring, containingFile: gostring): tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined {
        let containingDirectory = GetDirectoryPath__from_tspath(containingFile);
        let state: resolutionState | undefined = newResolutionState(moduleName, containingDirectory, false, ModuleKindCommonJS$constant__from_core(), (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions, void 0, r, void 0);
        (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isConfigLookup = true;
        (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions = extensionsJson$constant();
        return resolutionState.$go$private$__go_module$resolveNodeLike(state);
    }
    static $go$private$__go_module$tryResolveFromTypingsLocation(r: {
        value: Resolver;
    } | undefined, moduleName: gostring, containingDirectory: gostring, originalResult: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined, traceBuilder: tracer | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined {
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation === "" || IsExternalModuleNameRelative__from_tspath(moduleName) || (((originalResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolvedFileName !== "" && ExtensionIsOneOf__from_tspath(((originalResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.Extension, $state__tspath.SupportedTSExtensionsWithJsonFlat))) {
            return originalResult;
        }
        let state: resolutionState | undefined = newResolutionState(moduleName, containingDirectory, false, ModuleKindNone$constant__from_core(), (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions, void 0, r, traceBuilder);
        if (!(traceBuilder === undefined)) {
            tracer.$go$private$__go_module$write(traceBuilder, $state__diagnostics.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectName), new GoInterfaceAdapter(moduleName), new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation)]));
        }
        let globalResolved: resolved | undefined = resolutionState.$go$private$__go_module$loadModuleFromImmediateNodeModulesDirectory(state, extensionsDeclaration$constant(), (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation, false);
        if (globalResolved === undefined) {
            return originalResult;
        }
        let result: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined = resolutionState.$go$private$__go_module$createResolvedModule(state, globalResolved, true);
        ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolutionDiagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(((originalResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolutionDiagnostics, ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolutionDiagnostics, void 0);
        return result;
    }
}
export class ResolverOptions {
    declare private readonly $goType: void;
    public constructor(public PackageJsonCache: {
        value: InfoCache__from_packagejson;
    } | undefined) {
    }
    static $zero(): ResolverOptions {
        return new ResolverOptions(void 0);
    }
    static $copy($source: ResolverOptions): ResolverOptions {
        return new ResolverOptions($source.PackageJsonCache);
    }
    declare private readonly then?: never;
}
export function NewResolver(host: ResolutionHost | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, typingsLocation: gostring, projectName: gostring): {
    value: Resolver;
} | undefined {
    const __gotots_field_0 = host;
    const __gotots_receiver_0 = host;
    const __gotots_argument_0 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_0).GetCurrentDirectory();
    const __gotots_receiver_1 = host;
    const __gotots_receiver_2 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_1).FS();
    const __gotots_argument_1 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).UseCaseSensitiveFileNames();
    const __gotots_argument_2 = options;
    const __gotots_field_1 = newCaches(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
    return { value: new Resolver(__gotots_field_1, __gotots_field_0, options, typingsLocation, projectName) };
}
export function NewResolverWithOptions(host: ResolutionHost | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, typingsLocation: gostring, projectName: gostring, opts: ResolverOptions): {
    value: Resolver;
} | undefined {
    let r: {
        value: Resolver;
    } | undefined = { value: new Resolver(caches.$zero(), host, compilerOptions, typingsLocation, projectName) };
    if (!(opts.PackageJsonCache === undefined)) {
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches.packageJsonInfoCache = opts.PackageJsonCache;
    }
    else {
        const __gotots_receiver_81 = host;
        const __gotots_argument_109 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_81).GetCurrentDirectory();
        const __gotots_receiver_82 = host;
        const __gotots_receiver_83 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_82).FS();
        const __gotots_argument_110 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_83).UseCaseSensitiveFileNames();
        const __gotots_argument_111 = compilerOptions;
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.caches = newCaches(__gotots_argument_109, __gotots_argument_110, __gotots_argument_111);
    }
    return r;
}
export function GetConditions(options: {
    value: CompilerOptions__from_core;
} | undefined, resolutionMode: ModuleKind__from_core): RuntimeSlice<gostring> {
    let moduleResolution = CompilerOptions__from_core.GetModuleResolutionKind(options);
    if (resolutionMode === ModuleKindNone$constant__from_core() && moduleResolution === ModuleResolutionKindBundler$constant__from_core()) {
        resolutionMode = ModuleKindESNext$constant__from_core();
    }
    let conditions = RuntimeSlice.make<gostring>(0, 3 + (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CustomConditions.length, "");
    if (resolutionMode === ModuleKindESNext$constant__from_core()) {
        conditions = conditions.append("", ["import"]);
    }
    else {
        conditions = conditions.append("", ["require"]);
    }
    if (!((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoDtsResolution === TSTrue$constant__from_core())) {
        conditions = conditions.append("", ["types"]);
    }
    if (!(moduleResolution === ModuleResolutionKindBundler$constant__from_core())) {
        conditions = conditions.append("", ["node"]);
    }
    conditions = Concatenate$string(conditions, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CustomConditions);
    return conditions;
}
export function getNodeResolutionFeatures(options: {
    value: CompilerOptions__from_core;
} | undefined): NodeResolutionFeatures {
    let features = NodeResolutionFeaturesNone$constant();
    switch (CompilerOptions__from_core.GetModuleResolutionKind(options)) {
        case ModuleResolutionKindNode16$constant__from_core(): {
            features = NodeResolutionFeaturesNode16Default$constant();
            break;
        }
        case ModuleResolutionKindNodeNext$constant__from_core(): {
            features = NodeResolutionFeaturesNodeNextDefault$constant();
            break;
        }
        case ModuleResolutionKindBundler$constant__from_core(): {
            features = NodeResolutionFeaturesBundlerDefault$constant();
            break;
        }
    }
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonExports === TSTrue$constant__from_core()) {
        features = features | 4;
    }
    else if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonExports === TSFalse$constant__from_core()) {
        features = features & ~4;
    }
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonImports === TSTrue$constant__from_core()) {
        features = features | 1;
    }
    else if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonImports === TSFalse$constant__from_core()) {
        features = features & ~1;
    }
    return features;
}
export function moveToNextDirectorySeparatorIfAvailable(path: gostring, prevSeparatorIndex: int, isFolder: bool): int {
    let offset = prevSeparatorIndex + 1;
    let nextSeparatorIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(path, offset), "/")));
    if (nextSeparatorIndex === -1) {
        if (isFolder) {
            return path.length;
        }
        return prevSeparatorIndex;
    }
    return nextSeparatorIndex + offset;
}
export class ParsedPatterns {
    declare private readonly $goType: void;
    public constructor(public matchableStringSet: Set__from_collections<gostring>, public patterns: RuntimeSlice<Pattern__from_core$Storage>) {
    }
    static $copy($source: ParsedPatterns): ParsedPatterns {
        return new ParsedPatterns(Set__from_collections.$copy<gostring>($source.matchableStringSet), $source.patterns);
    }
    declare private readonly then?: never;
}
export function TryParsePatterns(pathMappings: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined): {
    value: ParsedPatterns;
} | undefined {
    let paths: iter.Seq<gostring> = OrderedMap$Keys$string$SliceOf_string(pathMappings);
    let numPatterns = 0;
    const __gotots_range_9 = named_iter.IterSeqValueOperations.$project(paths);
    if (__gotots_range_9 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_1 = 1;
    __gotots_range_9(($argument0: gostring): bool => {
        if (__gotots_range_state_1 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_1 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_1 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_1 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_1 = -1;
        const __gotots_range_value_9 = $argument0;
        let path = __gotots_range_value_9;
        {
            let pattern = TryParsePattern__from_core(path);
            if (Pattern__from_core.IsValid(pattern) && Pattern__from_core.$storageOf(pattern).StarIndex === -1) {
                numPatterns++;
            }
        }
        __gotots_range_state_1 = 1;
        return true;
    });
    if (__gotots_range_state_1 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_1 = -2;
    let numMatchables = OrderedMap$Size$string$SliceOf_string(pathMappings) - numPatterns;
    let patterns = RuntimeSlice.nil<Pattern__from_core$Storage>();
    let matchableStringSet = Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.nil();
    });
    const matchableStringSet$location = tsonicTypeScriptRuntime.boundLocation({}, () => matchableStringSet, matchableStringSet$next => matchableStringSet = matchableStringSet$next);
    if (numPatterns !== 0) {
        const __gotots_slice_build_4 = goSliceAllocate<Pattern__from_core$Storage>(0, numPatterns);
        for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.capacity; __gotots_slice_build_5++) {
            __gotots_slice_build_4.$initialize(__gotots_slice_build_5, Pattern__from_core.$zeroStorage());
        }
        patterns = __gotots_slice_build_4;
    }
    if (numMatchables !== 0) {
        matchableStringSet = Set__from_collections.$copy<gostring>(Set__from_collections.$copy<gostring>(((NewSetWithSizeHint$string(numMatchables) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>>).value));
    }
    const __gotots_range_10 = named_iter.IterSeqValueOperations.$project(paths);
    if (__gotots_range_10 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_2 = 1;
    __gotots_range_10(($argument0: gostring): bool => {
        if (__gotots_range_state_2 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_2 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_2 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_2 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_2 = -1;
        const __gotots_range_value_10 = $argument0;
        let path = __gotots_range_value_10;
        {
            let pattern = TryParsePattern__from_core(path);
            if (Pattern__from_core.IsValid(pattern)) {
                if (Pattern__from_core.$storageOf(pattern).StarIndex === -1) {
                    Set$Add$string(matchableStringSet$location, path);
                }
                else {
                    const __gotots_slice_build_6 = patterns;
                    const __gotots_slice_build_8 = __gotots_slice_build_6.length + 1;
                    let __gotots_slice_build_7 = __gotots_slice_build_6;
                    if (__gotots_slice_build_8 <= __gotots_slice_build_6.capacity) {
                        __gotots_slice_build_7 = __gotots_slice_build_6.$withLength(__gotots_slice_build_8);
                        __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, Pattern__from_core.$storageOf(Pattern__from_core.$copy(pattern)));
                    }
                    else {
                        __gotots_slice_build_7 = goSliceAllocate<Pattern__from_core$Storage>(__gotots_slice_build_8, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_8));
                        for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_6.length; __gotots_slice_build_9++) {
                            __gotots_slice_build_7.set(__gotots_slice_build_9, Pattern__from_core.$storageOf(Pattern__from_core.$copy(Pattern__from_core.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_9)))));
                        }
                        __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, Pattern__from_core.$storageOf(Pattern__from_core.$copy(pattern)));
                        for (let __gotots_slice_build_9 = __gotots_slice_build_8; __gotots_slice_build_9 < __gotots_slice_build_7.capacity; __gotots_slice_build_9++) {
                            __gotots_slice_build_7.$initialize(__gotots_slice_build_9, Pattern__from_core.$zeroStorage());
                        }
                    }
                    patterns = __gotots_slice_build_7;
                }
            }
        }
        __gotots_range_state_2 = 1;
        return true;
    });
    if (__gotots_range_state_2 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_2 = -2;
    return { value: new ParsedPatterns(Set__from_collections.$copy<gostring>(matchableStringSet), patterns) };
}
export function MatchPatternOrExact(patterns: {
    value: ParsedPatterns;
} | undefined, candidate: gostring): Pattern__from_core {
    const __gotots_store_19 = (patterns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    if (Set__from_collections.Has<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "matchableStringSet"), candidate)) {
        return Pattern__from_core.$fromStorage({
            Text: candidate,
            StarIndex: -1
        });
    }
    if ((patterns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.patterns.length === 0) {
        return Pattern__from_core.$fromStorage({
            Text: "",
            StarIndex: 0
        });
    }
    return FindBestPatternMatch$Named_core$Pattern((patterns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.patterns, ($argument0: Pattern__from_core): Pattern__from_core => {
        return Identity$Named_core$Pattern($argument0);
    }, candidate);
}
export function normalizePathForCJSResolution(containingDirectory: gostring, moduleName: gostring): gostring {
    let combined = CombinePaths__from_tspath(containingDirectory, RuntimeSlice.literal<gostring>([moduleName]));
    let parts = GetPathComponents__from_tspath(combined, "");
    let lastPart = parts.get(parts.length - 1);
    if (lastPart === "." || lastPart === "..") {
        return EnsureTrailingDirectorySeparator__from_tspath(NormalizePath__from_tspath(combined));
    }
    return NormalizePath__from_tspath(combined);
}
export function matchesPatternWithTrailer(target: gostring, name: gostring): bool {
    if (strings__from_gostdlib.HasSuffix(target, "*")) {
        return false;
    }
    const __gotots_results_23 = strings__from_gostdlib.Cut(target, "*");
    let before = __gotots_results_23[0];
    let after = __gotots_results_23[1];
    let ok = __gotots_results_23[2];
    if (!ok) {
        return false;
    }
    return strings__from_gostdlib.HasPrefix(name, before) && strings__from_gostdlib.HasSuffix(name, after);
}
export function extensionIsOk(extensions__shadow_1: extensions, extension: gostring): bool {
    return (!((extensions__shadow_1 & extensionsJavaScript$constant()) === 0) && (extension === ExtensionJs$string__from_tspath || extension === ExtensionJsx$string__from_tspath || extension === ExtensionMjs$string__from_tspath || extension === ExtensionCjs$string__from_tspath) || (!((extensions__shadow_1 & extensionsTypeScript$constant()) === 0) && (extension === ExtensionTs$string__from_tspath || extension === ExtensionTsx$string__from_tspath || extension === ExtensionMts$string__from_tspath || extension === ExtensionCts$string__from_tspath)) || (!((extensions__shadow_1 & extensionsDeclaration$constant()) === 0) && (extension === ExtensionDts$string__from_tspath || extension === ExtensionDmts$string__from_tspath || extension === ExtensionDcts$string__from_tspath)) || (!((extensions__shadow_1 & extensionsJson$constant()) === 0) && extension === ExtensionJson$string__from_tspath));
}
export function ResolveConfig(moduleName: gostring, containingFile: gostring, host: ResolutionHost | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined {
    const __gotots_argument_12 = host;
    const __gotots_field_2 = ModuleResolutionKindNodeNext$constant__from_core();
    const __gotots_struct_0 = CompilerOptions__from_core.$zero();
    __gotots_struct_0.ModuleResolution = __gotots_field_2;
    const __gotots_argument_13 = { value: __gotots_struct_0 };
    const __gotots_argument_14 = "";
    const __gotots_argument_15 = "";
    let resolver: {
        value: Resolver;
    } | undefined = NewResolver(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
    return Resolver.$go$private$__go_module$resolveConfig(resolver, moduleName, containingFile);
}
export function GetAutomaticTypeDirectiveNames(options: {
    value: CompilerOptions__from_core;
} | undefined, host: ResolutionHost | undefined): RuntimeSlice<gostring> {
    if (!CompilerOptions__from_core.UsesWildcardTypes(options)) {
        if (!(options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Types.isNil()) {
            return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Types;
        }
        return RuntimeSlice.literal<gostring>([]);
    }
    let wildcardMatches = RuntimeSlice.nil<gostring>();
    const __gotots_receiver_25 = options;
    const __gotots_receiver_24 = host;
    const __gotots_argument_29 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_24).GetCurrentDirectory();
    const __gotots_results_6 = CompilerOptions__from_core.GetEffectiveTypeRoots(__gotots_receiver_25, __gotots_argument_29);
    let typeRoots = __gotots_results_6[0];
    const __gotots_range_1 = typeRoots;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let root = __gotots_range_value_1;
        const __gotots_receiver_26 = host;
        const __gotots_receiver_27 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_26).FS();
        const __gotots_argument_30 = root;
        if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_27).DirectoryExists(__gotots_argument_30)) {
            const __gotots_receiver_28 = host;
            const __gotots_receiver_29 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_28).FS();
            const __gotots_argument_31 = root;
            const __gotots_range_2 = Entries__from_vfs.$storageOf(goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_29).GetAccessibleEntries(__gotots_argument_31)).Directories;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let typeDirectivePath = __gotots_range_value_2;
                let normalized = NormalizePath__from_tspath(typeDirectivePath);
                let packageJsonPath = CombinePaths__from_tspath(root, RuntimeSlice.literal<gostring>([normalized, "package.json"]));
                let isNotNeededPackage = false;
                const __gotots_receiver_30 = host;
                const __gotots_receiver_31 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_30).FS();
                const __gotots_argument_32 = packageJsonPath;
                if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_31).FileExists(__gotots_argument_32)) {
                    const __gotots_receiver_32 = host;
                    const __gotots_receiver_33 = goInterfaceNonNil<ResolutionHost>(__gotots_receiver_32).FS();
                    const __gotots_argument_33 = packageJsonPath;
                    const __gotots_results_7 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_33).ReadFile(__gotots_argument_33);
                    let contents = __gotots_results_7[0];
                    const __gotots_conversion_0 = contents;
                    const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
                    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                        __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
                    }
                    const __gotots_argument_34 = __gotots_conversion_1;
                    const __gotots_results_8 = Parse__from_packagejson(__gotots_argument_34);
                    let packageJsonContent = __gotots_results_8[0];
                    isNotNeededPackage = Expected__from_packagejson.$storageOf(packageJsonContent.PathFields.Typings).Null;
                }
                if (!isNotNeededPackage) {
                    let baseFileName = GetBaseFileName__from_tspath(normalized);
                    if (!strings__from_gostdlib.HasPrefix(baseFileName, ".")) {
                        wildcardMatches = wildcardMatches.append("", [baseFileName]);
                    }
                }
            }
        }
    }
    let result = RuntimeSlice.nil<gostring>();
    const __gotots_range_3: CompilerOptions__from_core["Types"] = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Types;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let t = __gotots_range_value_3;
        if (t === "*") {
            result = goSliceAppendSlice<gostring>(result, wildcardMatches, "");
        }
        else {
            result = result.append("", [t]);
        }
    }
    return Deduplicate$string(result);
}
export class Ending {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function EndingFixed$constant(): Ending {
    return new Ending(0);
}
export function EndingExtensionChangeable$constant(): Ending {
    return new Ending(1);
}
export function EndingChangeable$constant(): Ending {
    return new Ending(2);
}
export class ResolvedEntrypoint {
    declare private readonly $goType: void;
    public constructor(public OriginalFileName: gostring, public ResolvedFileName: gostring, public ModuleSpecifier: gostring, public Ending: Ending, public IncludeConditions: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public ExcludeConditions: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined) {
    }
    declare private readonly then?: never;
    static SymlinkOrRealpath(e: ResolvedEntrypoint | undefined): gostring {
        if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).OriginalFileName !== "") {
            return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).OriginalFileName;
        }
        return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName;
    }
}
