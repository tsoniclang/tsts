import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { CompilerOptions as CompilerOptions__from_core, TypeAcquisition as TypeAcquisition__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Logger as Logger__from_logging } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { CachedTyping, TypingsInfo } from "./ata.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import { NonRelativeModuleNameForTypingCache as NonRelativeModuleNameForTypingCache__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, VersionMajorMinor as VersionMajorMinor__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { DependencyFields as DependencyFields__from_packagejson, Expected as Expected__from_packagejson, Parse as Parse__from_packagejson } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/project/ata/state.js";
import { MustParse as MustParse__from_semver, Version as Version__from_semver } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/package.js";
import { CombinePaths as CombinePaths__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, FileExtensionIs as FileExtensionIs__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetPathComponents as GetPathComponents__from_tspath, HasJSFileExtension as HasJSFileExtension__from_tspath, RemoveFileExtension as RemoveFileExtension__from_tspath, ToFileNameLowerCase as ToFileNameLowerCase__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { ReadDirectory as ReadDirectory__from_vfsmatch } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import { Set$Keys$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { SyncMap$Range$string$PointerTo_Named_ata$CachedTyping } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { Filter$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Keys$MapOf_string_To_string$string$string } from "../../../../../../../support/generics/concretizations/maps/Keys.js";
import { AppendSeq$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/AppendSeq.js";
import { Compact$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/Compact.js";
import { Sort$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$PointerTo_Named_packagejson$DependencyFields, $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function isTypingUpToDate(cachedTyping: {
    value: CachedTyping;
} | undefined, availableTypingVersions: GoMapValue<gostring, gostring>): bool {
    const __gotots_results_6 = availableTypingVersions.lookupOk("ts" + VersionMajorMinor__from_core());
    let useVersion = __gotots_results_6[0];
    let ok = __gotots_results_6[1];
    if (!ok) {
        useVersion = availableTypingVersions.lookup("latest");
    }
    let availableVersion = MustParse__from_semver(useVersion);
    const availableVersion$location = tsonicTypeScriptRuntime.boundLocation({}, () => availableVersion, availableVersion$next => availableVersion = availableVersion$next);
    return Version__from_semver.Compare(availableVersion$location, (cachedTyping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Version) <= 0;
}
export function DiscoverTypings(fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined, typingsInfo: tsonicTypeScriptRuntime.Location<TypingsInfo> | undefined, fileNames: RuntimeSlice<gostring>, projectRootPath: gostring, packageNameToTypingLocation: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, {
    value: CachedTyping;
} | undefined>> | undefined, typesRegistry: GoMapValue<gostring, GoMapValue<gostring, gostring>>): [
    RuntimeSlice<gostring>,
    RuntimeSlice<gostring>,
    RuntimeSlice<gostring>
] {
    let cachedTypingPaths: RuntimeSlice<gostring> = RuntimeSlice.nil<gostring>();
    let newTypingNames: RuntimeSlice<gostring> = RuntimeSlice.nil<gostring>();
    let filesToWatch: RuntimeSlice<gostring> = RuntimeSlice.nil<gostring>();
    let inferredTypings: GoMapValue<gostring, gostring> = GoMap.make<gostring, gostring>("", 0, []);
    fileNames = Filter$string(fileNames, (fileName: gostring): bool => {
        return HasJSFileExtension__from_tspath(fileName);
    });
    if (!(((typingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo>).value.TypeAcquisition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Include.isNil()) {
        addInferredTypings(fs, logger, inferredTypings, (((typingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo>).value.TypeAcquisition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Include, "Explicitly included types");
    }
    let exclude: TypeAcquisition__from_core["Exclude"] = (((typingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo>).value.TypeAcquisition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Exclude;
    if ((((typingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo>).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Types.isNil()) {
        let possibleSearchDirs: GoMapValue<gostring, bool> = GoMap.make<gostring, bool>(false, 0, []);
        const __gotots_range_0 = fileNames;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let fileName = __gotots_range_value_0;
            possibleSearchDirs.store(GetDirectoryPath__from_tspath(fileName), true);
        }
        possibleSearchDirs.store(projectRootPath, true);
        const __gotots_range_1 = possibleSearchDirs;
        const __gotots_range_keys_0 = __gotots_range_1.keys();
        for (const __gotots_range_value_1 of __gotots_range_keys_0) {
            const __gotots_range_value_2 = __gotots_range_1.lookupOk(__gotots_range_value_1);
            if (!__gotots_range_value_2[1]) {
                continue;
            }
            const __gotots_range_value_3 = __gotots_range_value_1;
            let searchDir = __gotots_range_value_3;
            filesToWatch = addTypingNamesAndGetFilesToWatch(fs, logger, inferredTypings, filesToWatch, searchDir, "bower.json", "bower_components");
            filesToWatch = addTypingNamesAndGetFilesToWatch(fs, logger, inferredTypings, filesToWatch, searchDir, "package.json", "node_modules");
        }
    }
    if (!Tristate_IsTrue__from_core((((typingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo>).value.TypeAcquisition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableFilenameBasedTypeAcquisition)) {
        getTypingNamesFromSourceFileNames(fs, logger, inferredTypings, fileNames);
    }
    let modules = RuntimeSlice.nil<gostring>();
    if (!(((typingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo>).value.UnresolvedImports === undefined)) {
        modules = RuntimeSlice.make<gostring>(0, Set$Len$string(((typingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo>).value.UnresolvedImports), "");
        const __gotots_range_2 = Set$Keys$string(((typingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo>).value.UnresolvedImports);
        const __gotots_range_keys_1 = __gotots_range_2.keys();
        for (const __gotots_range_value_4 of __gotots_range_keys_1) {
            const __gotots_range_value_5 = __gotots_range_2.lookupOk(__gotots_range_value_4);
            if (!__gotots_range_value_5[1]) {
                continue;
            }
            const __gotots_range_value_6 = __gotots_range_value_4;
            let __go_module = __gotots_range_value_6;
            modules = modules.append("", [NonRelativeModuleNameForTypingCache__from_core(__go_module)]);
        }
        Sort$SliceOf_string$string(modules);
        modules = Compact$SliceOf_string$string(modules);
    }
    addInferredTypings(fs, logger, inferredTypings, modules, "Inferred typings from unresolved imports");
    const __gotots_range_3 = exclude;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
        const __gotots_range_value_7 = __gotots_range_3.get(__gotots_range_index_1);
        let excludeTypingName = __gotots_range_value_7;
        inferredTypings.delete(excludeTypingName);
        const __gotots_receiver_0 = logger;
        const __gotots_argument_0 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Typing for %s is in exclude list, will be ignored.", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(excludeTypingName)])))]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_0).Log(__gotots_argument_0);
    }
    SyncMap$Range$string$PointerTo_Named_ata$CachedTyping(packageNameToTypingLocation, (name: gostring, typing: {
        value: CachedTyping;
    } | undefined): bool => {
        let registryEntry: GoMapValue<gostring, gostring> = typesRegistry.lookup(name);
        if (inferredTypings.lookup(name) === "" && !registryEntry.isNil() && isTypingUpToDate(typing, registryEntry)) {
            inferredTypings.store(name, (typing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypingsLocation);
        }
        return true;
    });
    const __gotots_range_4 = inferredTypings;
    const __gotots_range_keys_2 = __gotots_range_4.keys();
    for (const __gotots_range_value_8 of __gotots_range_keys_2) {
        const __gotots_range_value_9 = __gotots_range_4.lookupOk(__gotots_range_value_8);
        if (!__gotots_range_value_9[1]) {
            continue;
        }
        const __gotots_range_value_10 = __gotots_range_value_8;
        const __gotots_range_value_11 = __gotots_range_value_9[0];
        let typing = __gotots_range_value_10;
        let inferred = __gotots_range_value_11;
        if (inferred !== "") {
            cachedTypingPaths = cachedTypingPaths.append("", [inferred]);
        }
        else {
            newTypingNames = newTypingNames.append("", [typing]);
        }
    }
    const __gotots_receiver_1 = logger;
    const __gotots_argument_1 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Finished typings discovery: cachedTypingsPaths: %v newTypingNames: %v, filesToWatch %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_string(cachedTypingPaths), new $goInterfaceAdapter$SliceOf_string(newTypingNames), new $goInterfaceAdapter$SliceOf_string(filesToWatch)])))]);
    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_1).Log(__gotots_argument_1);
    return [cachedTypingPaths, newTypingNames, filesToWatch];
}
export function addInferredTyping(inferredTypings: GoMapValue<gostring, gostring>, typingName: gostring): void {
    {
        const __gotots_results_7 = inferredTypings.lookupOk(typingName);
        let ok = __gotots_results_7[1];
        if (!ok) {
            inferredTypings.store(typingName, "");
        }
    }
}
export function addInferredTypings(fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined, inferredTypings: GoMapValue<gostring, gostring>, typingNames: RuntimeSlice<gostring>, message: gostring): void {
    const __gotots_receiver_2 = logger;
    const __gotots_argument_2 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: %s: %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(message), new $goInterfaceAdapter$SliceOf_string(typingNames)])))]);
    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_2).Log(__gotots_argument_2);
    const __gotots_range_5 = typingNames;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_5.length; __gotots_range_index_2++) {
        const __gotots_range_value_12 = __gotots_range_5.get(__gotots_range_index_2);
        let typingName = __gotots_range_value_12;
        addInferredTyping(inferredTypings, typingName);
    }
}
export function getTypingNamesFromSourceFileNames(fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined, inferredTypings: GoMapValue<gostring, gostring>, fileNames: RuntimeSlice<gostring>): void {
    let hasJsxFile = false;
    let fromFileNames = RuntimeSlice.nil<gostring>();
    const __gotots_range_9 = fileNames;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_9.length; __gotots_range_index_6++) {
        const __gotots_range_value_16 = __gotots_range_9.get(__gotots_range_index_6);
        let fileName = __gotots_range_value_16;
        hasJsxFile = hasJsxFile || FileExtensionIs__from_tspath(fileName, ExtensionJsx$string__from_tspath);
        let inferredTypingName = RemoveFileExtension__from_tspath(ToFileNameLowerCase__from_tspath(GetBaseFileName__from_tspath(fileName)));
        let cleanedTypingName = removeMinAndVersionNumbers(inferredTypingName);
        {
            const __gotots_results_5 = $state.safeFileNameToTypeName.lookupOk(cleanedTypingName);
            let typeName = __gotots_results_5[0];
            let ok = __gotots_results_5[1];
            if (ok) {
                fromFileNames = fromFileNames.append("", [typeName]);
            }
        }
    }
    if (fromFileNames.length > 0) {
        addInferredTypings(fs, logger, inferredTypings, fromFileNames, "Inferred typings from file names");
    }
    if (hasJsxFile) {
        const __gotots_receiver_10 = logger;
        const __gotots_argument_14 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("ATA:: Inferred 'react' typings due to presence of '.jsx' extension")]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_10).Log(__gotots_argument_14);
        addInferredTyping(inferredTypings, "react");
    }
}
export function addTypingNamesAndGetFilesToWatch(fs: FS__from_vfs | undefined, logger: Logger__from_logging | undefined, inferredTypings: GoMapValue<gostring, gostring>, filesToWatch: RuntimeSlice<gostring>, projectRootPath: gostring, manifestName: gostring, modulesDirName: gostring): RuntimeSlice<gostring> {
    let manifestPath = CombinePaths__from_tspath(projectRootPath, RuntimeSlice.literal<gostring>([manifestName]));
    let manifestTypingNames = RuntimeSlice.nil<gostring>();
    const __gotots_receiver_3 = fs;
    const __gotots_argument_3 = manifestPath;
    const __gotots_results_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).ReadFile(__gotots_argument_3);
    let manifestContents = __gotots_results_0[0];
    let ok = __gotots_results_0[1];
    if (ok) {
        let manifest = DependencyFields__from_packagejson.$zero();
        const manifest$location = tsonicTypeScriptRuntime.boundLocation({}, () => manifest, manifest$next => manifest = manifest$next);
        filesToWatch = filesToWatch.append("", [manifestPath]);
        const __gotots_conversion_0 = manifestContents;
        const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
        }
        const __gotots_argument_4 = __gotots_conversion_1;
        const __gotots_argument_5 = new $goInterfaceAdapter$PointerTo_Named_packagejson$DependencyFields(manifest$location);
        const __gotots_argument_6 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
        if (err === undefined) {
            manifestTypingNames = AppendSeq$SliceOf_string$string(manifestTypingNames, Keys$MapOf_string_To_string$string$string(Expected__from_packagejson.$storageOf(manifest.Dependencies).Value));
            manifestTypingNames = AppendSeq$SliceOf_string$string(manifestTypingNames, Keys$MapOf_string_To_string$string$string(Expected__from_packagejson.$storageOf(manifest.DevDependencies).Value));
            manifestTypingNames = AppendSeq$SliceOf_string$string(manifestTypingNames, Keys$MapOf_string_To_string$string$string(Expected__from_packagejson.$storageOf(manifest.OptionalDependencies).Value));
            manifestTypingNames = AppendSeq$SliceOf_string$string(manifestTypingNames, Keys$MapOf_string_To_string$string$string(Expected__from_packagejson.$storageOf(manifest.PeerDependencies).Value));
            addInferredTypings(fs, logger, inferredTypings, manifestTypingNames, "Typing names in '" + manifestPath + "' dependencies");
        }
    }
    let packagesFolderPath = CombinePaths__from_tspath(projectRootPath, RuntimeSlice.literal<gostring>([modulesDirName]));
    filesToWatch = filesToWatch.append("", [packagesFolderPath]);
    const __gotots_receiver_4 = fs;
    const __gotots_argument_7 = packagesFolderPath;
    if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).DirectoryExists(__gotots_argument_7)) {
        return filesToWatch;
    }
    let packageNames = RuntimeSlice.nil<gostring>();
    let dependencyManifestNames = RuntimeSlice.nil<gostring>();
    if (manifestTypingNames.length > 0) {
        const __gotots_range_6 = manifestTypingNames;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_6.length; __gotots_range_index_3++) {
            const __gotots_range_value_13 = __gotots_range_6.get(__gotots_range_index_3);
            let typingName = __gotots_range_value_13;
            dependencyManifestNames = dependencyManifestNames.append("", [CombinePaths__from_tspath(packagesFolderPath, RuntimeSlice.literal<gostring>([typingName, manifestName]))]);
        }
    }
    else {
        let depth = 3;
        const __gotots_range_7 = ReadDirectory__from_vfsmatch(fs, projectRootPath, packagesFolderPath, RuntimeSlice.literal<gostring>([ExtensionJson$string__from_tspath]), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), depth);
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_7.length; __gotots_range_index_4++) {
            const __gotots_range_value_14 = __gotots_range_7.get(__gotots_range_index_4);
            let manifestPath__shadow_1 = __gotots_range_value_14;
            if (GetBaseFileName__from_tspath(manifestPath__shadow_1) !== manifestName) {
                continue;
            }
            let pathComponents = GetPathComponents__from_tspath(manifestPath__shadow_1, "");
            let lenPathComponents = pathComponents.length;
            const __gotots_results_1 = utf8__from_gostdlib.DecodeRuneInString(pathComponents.get(lenPathComponents - 3));
            const __gotots_results_2 = [__gotots_results_1[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_1[1]))] satisfies [
                int32,
                int
            ];
            let ch = __gotots_results_2[0];
            let isScoped = ch === 64;
            if (isScoped && ToFileNameLowerCase__from_tspath(pathComponents.get(lenPathComponents - 4)) === modulesDirName || !isScoped && ToFileNameLowerCase__from_tspath(pathComponents.get(lenPathComponents - 3)) === modulesDirName) {
                dependencyManifestNames = dependencyManifestNames.append("", [manifestPath__shadow_1]);
            }
        }
    }
    const __gotots_receiver_5 = logger;
    const __gotots_argument_8 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA:: Searching for typing names in %s; all files: %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(packagesFolderPath), new $goInterfaceAdapter$SliceOf_string(dependencyManifestNames)])))]);
    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_5).Log(__gotots_argument_8);
    const __gotots_range_8 = dependencyManifestNames;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_8.length; __gotots_range_index_5++) {
        const __gotots_range_value_15 = __gotots_range_8.get(__gotots_range_index_5);
        let manifestPath__shadow_1 = __gotots_range_value_15;
        const __gotots_receiver_6 = fs;
        const __gotots_argument_9 = manifestPath__shadow_1;
        const __gotots_results_3 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).ReadFile(__gotots_argument_9);
        let manifestContents__shadow_1 = __gotots_results_3[0];
        let ok__shadow_1 = __gotots_results_3[1];
        if (!ok__shadow_1) {
            continue;
        }
        const __gotots_conversion_3 = manifestContents__shadow_1;
        const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
        }
        const __gotots_argument_10 = __gotots_conversion_4;
        const __gotots_results_4 = Parse__from_packagejson(__gotots_argument_10);
        let manifest = __gotots_results_4[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
        if (!(err === undefined) || Expected__from_packagejson.$storageOf(manifest.HeaderFields.Name).Value.length === 0) {
            continue;
        }
        let ownTypes = Expected__from_packagejson.$storageOf(manifest.PathFields.Types).Value;
        if (ownTypes.length === 0) {
            ownTypes = Expected__from_packagejson.$storageOf(manifest.PathFields.Typings).Value;
        }
        if (ownTypes.length !== 0) {
            let absolutePath = GetNormalizedAbsolutePath__from_tspath(ownTypes, GetDirectoryPath__from_tspath(manifestPath__shadow_1));
            const __gotots_receiver_7 = fs;
            const __gotots_argument_11 = absolutePath;
            if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).FileExists(__gotots_argument_11)) {
                const __gotots_receiver_8 = logger;
                const __gotots_argument_12 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA::     Package '%s' provides its own types.", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Expected__from_packagejson.$storageOf(manifest.HeaderFields.Name).Value)])))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_8).Log(__gotots_argument_12);
                inferredTypings.store(Expected__from_packagejson.$storageOf(manifest.HeaderFields.Name).Value, absolutePath);
            }
            else {
                const __gotots_receiver_9 = logger;
                const __gotots_argument_13 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("ATA::     Package '%s' provides its own types but they are missing.", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Expected__from_packagejson.$storageOf(manifest.HeaderFields.Name).Value)])))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_9).Log(__gotots_argument_13);
            }
        }
        else {
            packageNames = packageNames.append("", [Expected__from_packagejson.$storageOf(manifest.HeaderFields.Name).Value]);
        }
    }
    addInferredTypings(fs, logger, inferredTypings, packageNames, "    Found package names");
    return filesToWatch;
}
export function removeMinAndVersionNumbers(fileName: gostring): gostring {
    let end = fileName.length;
    for (let pos = end; pos > 0;) {
        const __gotots_results_8 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(fileName, 0, pos));
        const __gotots_results_9 = [__gotots_results_8[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_8[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_9[0];
        let size = __gotots_results_9[1];
        if (ch >= 48 && ch <= 57) {
            for (;;) {
                pos = pos - size;
                const __gotots_results_10 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(fileName, 0, pos));
                const __gotots_results_11 = [__gotots_results_10[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_10[1]))] satisfies [
                    int32,
                    int
                ];
                ch = __gotots_results_11[0];
                size = __gotots_results_11[1];
                if (pos <= 0 || ch < 48 || ch > 57) {
                    break;
                }
            }
        }
        else if (pos > 4 && (ch === 110 || ch === 78)) {
            pos = pos - size;
            const __gotots_results_12 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(fileName, 0, pos));
            const __gotots_results_13 = [__gotots_results_12[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_12[1]))] satisfies [
                int32,
                int
            ];
            ch = __gotots_results_13[0];
            size = __gotots_results_13[1];
            if (ch !== 105 && ch !== 73) {
                break;
            }
            pos = pos - size;
            const __gotots_results_14 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(fileName, 0, pos));
            const __gotots_results_15 = [__gotots_results_14[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_14[1]))] satisfies [
                int32,
                int
            ];
            ch = __gotots_results_15[0];
            size = __gotots_results_15[1];
            if (ch !== 109 && ch !== 77) {
                break;
            }
            pos = pos - size;
            const __gotots_results_16 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(fileName, 0, pos));
            const __gotots_results_17 = [__gotots_results_16[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_16[1]))] satisfies [
                int32,
                int
            ];
            ch = __gotots_results_17[0];
            size = __gotots_results_17[1];
        }
        else {
            break;
        }
        if (ch !== 45 && ch !== 46) {
            break;
        }
        pos = pos - size;
        end = pos;
    }
    return goStringSlice(fileName, 0, end);
}
