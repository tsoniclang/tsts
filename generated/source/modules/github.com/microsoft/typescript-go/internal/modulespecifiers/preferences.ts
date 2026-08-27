import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ImportModuleSpecifierEndingPreference, ModuleSpecifierEnding, ModuleSpecifierGenerationHost, RelativePreferenceKind, SourceFileForSpecifierGeneration } from "./types.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleResolutionKindNode16$constant as ModuleResolutionKindNode16$constant__from_core, ModuleResolutionKindNodeNext$constant as ModuleResolutionKindNodeNext$constant__from_core, ResolutionModeCommonJS$constant as ResolutionModeCommonJS$constant__from_core, ResolutionModeESM$constant as ResolutionModeESM$constant__from_core, ResolutionModeNone$constant as ResolutionModeNone$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, HasJSFileExtension as HasJSFileExtension__from_tspath, HasTSFileExtension as HasTSFileExtension__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath, PathIsRelative as PathIsRelative__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goInterfaceAdapter$Named_modulespecifiers$ModuleSpecifierEnding as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { ImportModuleSpecifierEndingPreferenceIndex$constant, ImportModuleSpecifierEndingPreferenceJs$constant, ImportModuleSpecifierEndingPreferenceMinimal$constant, ModuleSpecifierEndingIndex$constant, ModuleSpecifierEndingJsExtension$constant, ModuleSpecifierEndingMinimal$constant, ModuleSpecifierEndingTsExtension$constant, RelativePreferenceExternalNonRelative$constant, RelativePreferenceNonRelative$constant, RelativePreferenceRelative$constant, RelativePreferenceShortest$constant, UserPreferences } from "./types.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function shouldAllowImportingTsExtension(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, fromFileName: gostring): bool {
    return CompilerOptions__from_core.GetAllowImportingTsExtensions(compilerOptions) || fromFileName.length > 0 && IsDeclarationFileName__from_tspath(fromFileName);
}
export function usesExtensionsOnImports(file: SourceFileForSpecifierGeneration | undefined): bool {
    const __gotots_receiver_6 = file;
    const __gotots_range_1 = goInterfaceNonNil<SourceFileForSpecifierGeneration>(__gotots_receiver_6).Imports();
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let ref: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        let text = Node__from_ast.Text(ref);
        if (PathIsRelative__from_tspath(text) && !FileExtensionIsOneOf__from_tspath(text, $state__tspath.ExtensionsNotSupportingExtensionlessResolution)) {
            return HasTSFileExtension__from_tspath(text) || HasJSFileExtension__from_tspath(text);
        }
    }
    return false;
}
export function inferPreference(resolutionMode: ModuleKind__from_core, sourceFile: SourceFileForSpecifierGeneration | undefined, moduleResolutionIsNodeNext: bool): ModuleSpecifierEnding {
    let usesJsExtensions = false;
    let specifiers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let __gotots_logical_result_0 = !(sourceFile === undefined);
    if (__gotots_logical_result_0) {
        const __gotots_receiver_3 = sourceFile;
        const __gotots_binary_operand_0 = goInterfaceNonNil<SourceFileForSpecifierGeneration>(__gotots_receiver_3).Imports().length;
        const __gotots_binary_operand_1 = 0;
        __gotots_logical_result_0 = __gotots_binary_operand_0 > __gotots_binary_operand_1;
    }
    if (__gotots_logical_result_0) {
        const __gotots_receiver_4 = sourceFile;
        specifiers = goInterfaceNonNil<SourceFileForSpecifierGeneration>(__gotots_receiver_4).Imports();
    }
    else {
        let __gotots_logical_result_1 = !(sourceFile === undefined);
        if (__gotots_logical_result_1) {
            const __gotots_receiver_5 = sourceFile;
            __gotots_logical_result_1 = goInterfaceNonNil<SourceFileForSpecifierGeneration>(__gotots_receiver_5).IsJS();
        }
        if (__gotots_logical_result_1) {
        }
    }
    const __gotots_range_0 = specifiers;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        let path = Node__from_ast.Text(specifier);
        if (PathIsRelative__from_tspath(path)) {
            if (moduleResolutionIsNodeNext && resolutionMode === ResolutionModeCommonJS$constant__from_core()) {
                continue;
            }
            if (FileExtensionIsOneOf__from_tspath(path, $state__tspath.ExtensionsNotSupportingExtensionlessResolution)) {
                continue;
            }
            if (HasTSFileExtension__from_tspath(path)) {
                return ModuleSpecifierEndingTsExtension$constant();
            }
            if (HasJSFileExtension__from_tspath(path)) {
                usesJsExtensions = true;
            }
        }
    }
    if (usesJsExtensions) {
        return ModuleSpecifierEndingJsExtension$constant();
    }
    return ModuleSpecifierEndingMinimal$constant();
}
export function getModuleSpecifierEndingPreference(pref: ImportModuleSpecifierEndingPreference, resolutionMode: ModuleKind__from_core, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, sourceFile: SourceFileForSpecifierGeneration | undefined): ModuleSpecifierEnding {
    let moduleResolution = CompilerOptions__from_core.GetModuleResolutionKind(compilerOptions);
    let moduleResolutionIsNodeNext = ModuleResolutionKindNode16$constant__from_core() <= moduleResolution && moduleResolution <= ModuleResolutionKindNodeNext$constant__from_core();
    if (pref.$value === ImportModuleSpecifierEndingPreferenceJs$constant().$value || resolutionMode === ResolutionModeESM$constant__from_core() && moduleResolutionIsNodeNext) {
        if (!shouldAllowImportingTsExtension(compilerOptions, "")) {
            return ModuleSpecifierEndingJsExtension$constant();
        }
        if (!(inferPreference(resolutionMode, sourceFile, moduleResolutionIsNodeNext) === ModuleSpecifierEndingJsExtension$constant())) {
            return ModuleSpecifierEndingTsExtension$constant();
        }
        return ModuleSpecifierEndingJsExtension$constant();
    }
    if (pref.$value === ImportModuleSpecifierEndingPreferenceMinimal$constant().$value) {
        return ModuleSpecifierEndingMinimal$constant();
    }
    if (pref.$value === ImportModuleSpecifierEndingPreferenceIndex$constant().$value) {
        return ModuleSpecifierEndingIndex$constant();
    }
    if (!shouldAllowImportingTsExtension(compilerOptions, "")) {
        if (!(sourceFile === undefined) && usesExtensionsOnImports(sourceFile)) {
            return ModuleSpecifierEndingJsExtension$constant();
        }
        return ModuleSpecifierEndingMinimal$constant();
    }
    return inferPreference(resolutionMode, sourceFile, moduleResolutionIsNodeNext);
}
export function getPreferredEnding(prefs: UserPreferences, host: ModuleSpecifierGenerationHost | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, importingSourceFile: SourceFileForSpecifierGeneration | undefined, oldImportSpecifier: gostring, resolutionMode: ModuleKind__from_core): ModuleSpecifierEnding {
    if (oldImportSpecifier.length > 0) {
        if (HasJSFileExtension__from_tspath(oldImportSpecifier)) {
            return ModuleSpecifierEndingJsExtension$constant();
        }
        if (strings__from_gostdlib.HasSuffix(oldImportSpecifier, "/index")) {
            return ModuleSpecifierEndingIndex$constant();
        }
    }
    if (resolutionMode === ResolutionModeNone$constant__from_core()) {
        const __gotots_receiver_2 = host;
        const __gotots_argument_3 = importingSourceFile;
        resolutionMode = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_2).GetDefaultResolutionModeForFile(__gotots_argument_3);
    }
    return getModuleSpecifierEndingPreference(prefs.ImportModuleSpecifierEnding, resolutionMode, compilerOptions, importingSourceFile);
}
export class ModuleSpecifierPreferences {
    declare private readonly $goType: void;
    public constructor(public relativePreference: RelativePreferenceKind, public getAllowedEndingsInPreferredOrder: (($0: ModuleKind__from_core) => RuntimeSlice<ModuleSpecifierEnding>) | undefined, public excludeRegexes: RuntimeSlice<gostring>) {
    }
    static $copy($source: ModuleSpecifierPreferences): ModuleSpecifierPreferences {
        return new ModuleSpecifierPreferences($source.relativePreference, $source.getAllowedEndingsInPreferredOrder, $source.excludeRegexes);
    }
    declare private readonly then?: never;
}
export function GetAllowedEndingsInPreferredOrder(prefs: UserPreferences, host: ModuleSpecifierGenerationHost | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, importingSourceFile: SourceFileForSpecifierGeneration | undefined, oldImportSpecifier: gostring, syntaxImpliedNodeFormat: ModuleKind__from_core): RuntimeSlice<ModuleSpecifierEnding> {
    let preferredEnding = getPreferredEnding(UserPreferences.$copy(prefs), host, compilerOptions, importingSourceFile, oldImportSpecifier, ResolutionModeNone$constant__from_core());
    const __gotots_receiver_0 = host;
    const __gotots_argument_0 = importingSourceFile;
    let resolutionMode = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_0).GetDefaultResolutionModeForFile(__gotots_argument_0);
    if (!(resolutionMode === syntaxImpliedNodeFormat)) {
        preferredEnding = getPreferredEnding(UserPreferences.$copy(prefs), host, compilerOptions, importingSourceFile, oldImportSpecifier, syntaxImpliedNodeFormat);
    }
    let moduleResolution = CompilerOptions__from_core.GetModuleResolutionKind(compilerOptions);
    let moduleResolutionIsNodeNext = ModuleResolutionKindNode16$constant__from_core() <= moduleResolution && moduleResolution <= ModuleResolutionKindNodeNext$constant__from_core();
    const __gotots_argument_1 = compilerOptions;
    const __gotots_receiver_1 = importingSourceFile;
    const __gotots_argument_2 = goInterfaceNonNil<SourceFileForSpecifierGeneration>(__gotots_receiver_1).FileName();
    let allowImportingTsExtension = shouldAllowImportingTsExtension(__gotots_argument_1, __gotots_argument_2);
    if (syntaxImpliedNodeFormat === ResolutionModeESM$constant__from_core() && moduleResolutionIsNodeNext) {
        if (allowImportingTsExtension) {
            return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingTsExtension$constant(), ModuleSpecifierEndingJsExtension$constant()]);
        }
        return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingJsExtension$constant()]);
    }
    switch (preferredEnding) {
        case ModuleSpecifierEndingJsExtension$constant(): {
            if (allowImportingTsExtension) {
                return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingJsExtension$constant(), ModuleSpecifierEndingTsExtension$constant(), ModuleSpecifierEndingMinimal$constant(), ModuleSpecifierEndingIndex$constant()]);
            }
            return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingJsExtension$constant(), ModuleSpecifierEndingMinimal$constant(), ModuleSpecifierEndingIndex$constant()]);
            break;
        }
        case ModuleSpecifierEndingTsExtension$constant(): {
            return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingTsExtension$constant(), ModuleSpecifierEndingMinimal$constant(), ModuleSpecifierEndingJsExtension$constant(), ModuleSpecifierEndingIndex$constant()]);
            break;
        }
        case ModuleSpecifierEndingIndex$constant(): {
            if (allowImportingTsExtension) {
                return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingIndex$constant(), ModuleSpecifierEndingMinimal$constant(), ModuleSpecifierEndingTsExtension$constant(), ModuleSpecifierEndingJsExtension$constant()]);
            }
            return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingIndex$constant(), ModuleSpecifierEndingMinimal$constant(), ModuleSpecifierEndingJsExtension$constant()]);
            break;
        }
        case ModuleSpecifierEndingMinimal$constant(): {
            if (allowImportingTsExtension) {
                return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingMinimal$constant(), ModuleSpecifierEndingIndex$constant(), ModuleSpecifierEndingTsExtension$constant(), ModuleSpecifierEndingJsExtension$constant()]);
            }
            return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingMinimal$constant(), ModuleSpecifierEndingIndex$constant(), ModuleSpecifierEndingJsExtension$constant()]);
            break;
        }
        default: {
            AssertNever__from_debug(new GoInterfaceAdapter(preferredEnding), RuntimeSlice.nil<GoInterface | undefined>());
            break;
        }
    }
    return RuntimeSlice.literal<ModuleSpecifierEnding>([ModuleSpecifierEndingMinimal$constant()]);
}
export function getModuleSpecifierPreferences(prefs: UserPreferences, host: ModuleSpecifierGenerationHost | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, importingSourceFile: SourceFileForSpecifierGeneration | undefined, oldImportSpecifier: gostring): ModuleSpecifierPreferences {
    let excludes = prefs.AutoImportSpecifierExcludeRegexes;
    let relativePreference = RelativePreferenceShortest$constant();
    if (oldImportSpecifier.length > 0) {
        if (IsExternalModuleNameRelative__from_tspath(oldImportSpecifier)) {
            relativePreference = RelativePreferenceRelative$constant();
        }
        else {
            relativePreference = RelativePreferenceNonRelative$constant();
        }
    }
    else {
        switch (prefs.ImportModuleSpecifierPreference.$value) {
            case "relative": {
                relativePreference = RelativePreferenceRelative$constant();
                break;
            }
            case "non-relative": {
                relativePreference = RelativePreferenceNonRelative$constant();
                break;
            }
            case "project-relative": {
                relativePreference = RelativePreferenceExternalNonRelative$constant();
                break;
            }
        }
    }
    let getAllowedEndingsInPreferredOrder: (($0: ModuleKind__from_core) => RuntimeSlice<ModuleSpecifierEnding>) | undefined = (syntaxImpliedNodeFormat: ModuleKind__from_core): RuntimeSlice<ModuleSpecifierEnding> => {
        return GetAllowedEndingsInPreferredOrder(UserPreferences.$copy(prefs), host, compilerOptions, importingSourceFile, oldImportSpecifier, syntaxImpliedNodeFormat);
    };
    return new ModuleSpecifierPreferences(relativePreference, getAllowedEndingsInPreferredOrder, excludes);
}
