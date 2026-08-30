import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { PendingReload } from "./project.js";
import type { PatternsAndIgnored, PatternsAndIgnored$Storage as PatternsAndIgnored__from_project$Storage, WatchedFiles } from "./watch.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Identity$Named_project$PatternsAndIgnored } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { NewWatchedFiles$Named_project$PatternsAndIgnored } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/NewWatchedFiles.js";
import { Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry$Named_tspath$Path$PointerTo_Named_project$configFileEntry, Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames$Named_tspath$Path$PointerTo_Named_project$configFileNames, Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void, Clone$MapOf_string_To_string$string$string } from "../../../../../../support/generics/concretizations/maps/Clone.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { PendingReloadFull$constant } from "./project.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class ConfigFileRegistry {
    declare private readonly $goType: void;
    public constructor(public configs: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry> | undefined>, public configFileNames: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames> | undefined>, public customConfigFileName: gostring) {
    }
    static $copy($source: ConfigFileRegistry): ConfigFileRegistry {
        return new ConfigFileRegistry($source.configs, $source.configFileNames, $source.customConfigFileName);
    }
    declare private readonly then?: never;
    static GetAncestorConfigFileName(c: {
        value: ConfigFileRegistry;
    } | undefined, path: Path__from_tspath, higherThanConfig: gostring): gostring {
        {
            const __gotots_results_2 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames.lookupOk(path);
            let entry: tsonicTypeScriptRuntime.Location<configFileNames> | undefined = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok) {
                return ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileNames>).value.ancestors.lookup(higherThanConfig);
            }
        }
        return "";
    }
    static GetConfig(c: {
        value: ConfigFileRegistry;
    } | undefined, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        {
            const __gotots_results_1 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs.lookupOk(path);
            let entry: tsonicTypeScriptRuntime.Location<configFileEntry> | undefined = __gotots_results_1[0];
            let ok = __gotots_results_1[1];
            if (ok) {
                return ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileEntry>).value.commandLine;
            }
        }
        return void 0;
    }
    static GetConfigFileName(c: {
        value: ConfigFileRegistry;
    } | undefined, path: Path__from_tspath): gostring {
        {
            const __gotots_results_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames.lookupOk(path);
            let entry: tsonicTypeScriptRuntime.Location<configFileNames> | undefined = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                return ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileNames>).value.nearestConfigFileName;
            }
        }
        return "";
    }
    static $go$private$project$clone(c: {
        value: ConfigFileRegistry;
    } | undefined): {
        value: ConfigFileRegistry;
    } | undefined {
        return { value: new ConfigFileRegistry(Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs), Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames), (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName) };
    }
}
export class configFileEntry {
    declare private readonly $goType: void;
    public constructor(public fileName: gostring, public pendingReload: PendingReload, public commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, public retainingProjects: GoMapValue<Path__from_tspath, GoEmptyStruct>, public retainingOpenFiles: GoMapValue<Path__from_tspath, GoEmptyStruct>, public retainingConfigs: GoMapValue<Path__from_tspath, GoEmptyStruct>, public rootFilesWatch: {
        value: WatchedFiles<PatternsAndIgnored>;
    } | undefined) {
    }
    static $copy($source: configFileEntry): configFileEntry {
        return new configFileEntry($source.fileName, $source.pendingReload, $source.commandLine, $source.retainingProjects, $source.retainingOpenFiles, $source.retainingConfigs, $source.rootFilesWatch);
    }
    declare private readonly then?: never;
    static Clone(e: tsonicTypeScriptRuntime.Location<configFileEntry> | undefined): tsonicTypeScriptRuntime.Location<configFileEntry> | undefined {
        return tsonicTypeScriptRuntime.location<configFileEntry>(new configFileEntry(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileEntry>).value.fileName, ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileEntry>).value.pendingReload, ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileEntry>).value.commandLine, Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileEntry>).value.retainingProjects), Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileEntry>).value.retainingOpenFiles), Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileEntry>).value.retainingConfigs), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileEntry>).value.rootFilesWatch));
    }
}
export function newConfigFileEntry(hasRelativePatternCapability: bool, fileName: gostring): tsonicTypeScriptRuntime.Location<configFileEntry> | undefined {
    return tsonicTypeScriptRuntime.location<configFileEntry>(new configFileEntry(fileName, PendingReloadFull$constant(), void 0, GoMap.nil(), GoMap.nil(), GoMap.nil(), NewWatchedFiles$Named_project$PatternsAndIgnored("root files for " + fileName, 7, hasRelativePatternCapability, ($argument0: PatternsAndIgnored): PatternsAndIgnored => {
        return Identity$Named_project$PatternsAndIgnored($argument0);
    })));
}
export function newExtendedConfigFileEntry(fileName: gostring, extendingConfigPath: Path__from_tspath): tsonicTypeScriptRuntime.Location<configFileEntry> | undefined {
    return tsonicTypeScriptRuntime.location<configFileEntry>(new configFileEntry(fileName, PendingReloadFull$constant(), void 0, GoMap.nil(), GoMap.nil(), GoMap.make(1, [[extendingConfigPath, new GoEmptyStruct]]), void 0));
}
export class configFileNames {
    declare private readonly $goType: void;
    public constructor(public nearestConfigFileName: gostring, public ancestors: GoMapValue<gostring, gostring>) {
    }
    declare private readonly then?: never;
    static Clone(c: tsonicTypeScriptRuntime.Location<configFileNames> | undefined): tsonicTypeScriptRuntime.Location<configFileNames> | undefined {
        return tsonicTypeScriptRuntime.location<configFileNames>(new configFileNames(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileNames>).value.nearestConfigFileName, Clone$MapOf_string_To_string$string$string(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileNames>).value.ancestors)));
    }
}
