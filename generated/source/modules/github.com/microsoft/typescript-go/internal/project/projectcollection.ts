import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { BreadthFirstSearchLevel as BreadthFirstSearchLevel__from_core, CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Project as Project__from_ls } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/package.js";
import type { Overlay } from "./overlayfs.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { Set as Set__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { BreadthFirstSearchOptions as BreadthFirstSearchOptions__from_core, BreadthFirstSearchResult as BreadthFirstSearchResult__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Compare$string } from "../../../../../../support/generics/concretizations/cmp/Compare.js";
import { NewOrderedMapWithSizeHint$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewOrderedMapWithSizeHint.js";
import { NewSetWithSizeHint$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetWithSizeHint.js";
import { OrderedMap$Set$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { BreadthFirstSearchParallelEx$PointerTo_Named_project$Project$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/BreadthFirstSearchParallelEx.js";
import { Identity$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { IfElse$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { MapNonNil$string$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapNonNil.js";
import { SortFunc$SliceOf_PointerTo_Named_project$Project$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_project$Project as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { ConfigFileRegistry } from "./configfileregistry.js";
import { Project, inferredProjectName$string } from "./project.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class ProjectCollection {
    declare private readonly $goType: void;
    public constructor(public toPath: (($0: gostring) => Path__from_tspath) | undefined, public configFileRegistry: {
        value: ConfigFileRegistry;
    } | undefined, public fileDefaultProjects: GoMapValue<Path__from_tspath, Path__from_tspath>, public configuredProjects: GoMapValue<Path__from_tspath, {
        value: Project;
    } | undefined>, public openFiles: Set__from_collections<Path__from_tspath>, public inferredProject: {
        value: Project;
    } | undefined, public apiOpenedProjects: GoMapValue<Path__from_tspath, GoEmptyStruct>, public openConfiguredProjectsOnce: sync__from_gostdlib.Once, public openConfiguredProjects: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined) {
    }
    static $copy($source: ProjectCollection): ProjectCollection {
        return new ProjectCollection($source.toPath, $source.configFileRegistry, $source.fileDefaultProjects, $source.configuredProjects, Set__from_collections.$copy<Path__from_tspath>($source.openFiles), $source.inferredProject, $source.apiOpenedProjects, named_sync.SyncOnceOperations.$copy($source.openConfiguredProjectsOnce), $source.openConfiguredProjects);
    }
    declare private readonly then?: never;
    static ConfiguredProject(c: {
        value: ProjectCollection;
    } | undefined, path: Path__from_tspath): {
        value: Project;
    } | undefined {
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.lookup(path);
    }
    static ConfiguredProjects(c: {
        value: ProjectCollection;
    } | undefined): RuntimeSlice<{
        value: Project;
    } | undefined> {
        let projects = RuntimeSlice.make<{
            value: Project;
        } | undefined>(0, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.length(), void 0);
        const projects$location = tsonicTypeScriptRuntime.boundLocation({}, () => projects, projects$next => projects = projects$next);
        ProjectCollection.$go$private$project$fillConfiguredProjects(c, projects$location);
        return projects;
    }
    static GetDefaultProject(c: {
        value: ProjectCollection;
    } | undefined, path: Path__from_tspath): {
        value: Project;
    } | undefined {
        {
            const __gotots_results_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.lookupOk(path);
            let result = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                if (result.$value ===
                    ((void Path__from_tspath,
                        inferredProjectName$string) as string)) {
                    return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject;
                }
                return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.lookup(result);
            }
        }
        let containingProjects = RuntimeSlice.nil<{
            value: Project;
        } | undefined>();
        let firstConfiguredProject: {
            value: Project;
        } | undefined = void 0;
        let firstNonSourceOfProjectReferenceRedirect: {
            value: Project;
        } | undefined = void 0;
        let multipleDirectInclusions = false;
        const __gotots_range_3 = ProjectCollection.ConfiguredProjects(c);
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
            const __gotots_range_value_7 = __gotots_range_3.get(__gotots_range_index_1);
            let p: {
                value: Project;
            } | undefined = __gotots_range_value_7;
            if (Project.$go$private$project$containsFile(p, path)) {
                containingProjects = containingProjects.append(void 0, [p]);
                if (!multipleDirectInclusions && !Project.IsSourceFromProjectReference(p, path)) {
                    if (firstNonSourceOfProjectReferenceRedirect === undefined) {
                        firstNonSourceOfProjectReferenceRedirect = p;
                    }
                    else {
                        multipleDirectInclusions = true;
                    }
                }
                if (firstConfiguredProject === undefined) {
                    firstConfiguredProject = p;
                }
            }
        }
        if (containingProjects.length === 1) {
            return containingProjects.get(0);
        }
        if (containingProjects.length === 0) {
            if (!((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject === undefined) && Project.$go$private$project$containsFile((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject, path)) {
                return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject;
            }
            return void 0;
        }
        if (!multipleDirectInclusions) {
            if (!(firstNonSourceOfProjectReferenceRedirect === undefined)) {
                return firstNonSourceOfProjectReferenceRedirect;
            }
            return firstConfiguredProject;
        }
        {
            let defaultProject: {
                value: Project;
            } | undefined = ProjectCollection.$go$private$project$findDefaultConfiguredProject(c, path);
            if (!(defaultProject === undefined)) {
                return defaultProject;
            }
        }
        return firstConfiguredProject;
    }
    static GetOpenConfiguredProjects(c: {
        value: ProjectCollection;
    } | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined {
        sync__from_gostdlib.Once.Do((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.openConfiguredProjectsOnce, (): void => {
            let openProjects: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = NewSetWithSizeHint$Named_tspath$Path((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.length());
            const __gotots_store_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_range_4 = Set$Keys$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "openFiles"));
            const __gotots_range_keys_2 = __gotots_range_4.keys();
            for (const __gotots_range_value_8 of __gotots_range_keys_2) {
                const __gotots_range_value_9 = __gotots_range_4.lookupOk(__gotots_range_value_8);
                if (!__gotots_range_value_9[1]) {
                    continue;
                }
                const __gotots_range_value_10 = __gotots_range_value_8;
                let path = __gotots_range_value_10;
                {
                    const __gotots_results_3 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.lookupOk(path);
                    let projectPath = __gotots_results_3[0];
                    let ok = __gotots_results_3[1];
                    if (ok && !(projectPath.$value ===
                        ((void Path__from_tspath,
                            inferredProjectName$string) as string))) {
                        {
                            const __gotots_results_4 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.lookupOk(projectPath);
                            let ok__shadow_1 = __gotots_results_4[1];
                            if (ok__shadow_1) {
                                Set$Add$Named_tspath$Path(openProjects, projectPath);
                                continue;
                            }
                        }
                    }
                }
                const __gotots_range_5 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects;
                const __gotots_range_keys_3 = __gotots_range_5.keys();
                for (const __gotots_range_value_11 of __gotots_range_keys_3) {
                    const __gotots_range_value_12 = __gotots_range_5.lookupOk(__gotots_range_value_11);
                    if (!__gotots_range_value_12[1]) {
                        continue;
                    }
                    const __gotots_range_value_13 = __gotots_range_value_12[0];
                    let project: {
                        value: Project;
                    } | undefined = __gotots_range_value_13;
                    if (Project.$go$private$project$containsFile(project, path)) {
                        Set$Add$Named_tspath$Path(openProjects, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath);
                    }
                }
            }
            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.openConfiguredProjects = openProjects;
        });
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.openConfiguredProjects;
    }
    static GetProjectByPath(c: {
        value: ProjectCollection;
    } | undefined, projectPath: Path__from_tspath): {
        value: Project;
    } | undefined {
        {
            const __gotots_results_1 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.lookupOk(projectPath);
            let project: {
                value: Project;
            } | undefined = __gotots_results_1[0];
            let ok = __gotots_results_1[1];
            if (ok) {
                return project;
            }
        }
        if (projectPath.$value ===
            ((void Path__from_tspath,
                inferredProjectName$string) as string)) {
            return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject;
        }
        return void 0;
    }
    static GetProjectsContainingFile(c: {
        value: ProjectCollection;
    } | undefined, path: Path__from_tspath): RuntimeSlice<Project__from_ls | undefined> {
        let projects = RuntimeSlice.nil<Project__from_ls | undefined>();
        const __gotots_range_7 = ProjectCollection.ConfiguredProjects(c);
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_7.length; __gotots_range_index_3++) {
            const __gotots_range_value_15 = __gotots_range_7.get(__gotots_range_index_3);
            let project: {
                value: Project;
            } | undefined = __gotots_range_value_15;
            if (Project.$go$private$project$containsFile(project, path)) {
                projects = projects.append(void 0, [new GoInterfaceAdapter(project)]);
            }
        }
        if (!((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject === undefined) && Project.$go$private$project$containsFile((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject, path)) {
            projects = projects.append(void 0, [new GoInterfaceAdapter((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject)]);
        }
        return projects;
    }
    static Projects(c: {
        value: ProjectCollection;
    } | undefined): RuntimeSlice<{
        value: Project;
    } | undefined> {
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject === undefined) {
            return ProjectCollection.ConfiguredProjects(c);
        }
        let projects = RuntimeSlice.make<{
            value: Project;
        } | undefined>(0, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.length() + 1, void 0);
        const projects$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => projects, projects$next2 => projects = projects$next2);
        ProjectCollection.$go$private$project$fillConfiguredProjects(c, projects$location2);
        projects = projects.append(void 0, [(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject]);
        return projects;
    }
    static ProjectsByPath(c: {
        value: ProjectCollection;
    } | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
        value: Project;
    } | undefined>> | undefined {
        let projects: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
            value: Project;
        } | undefined>> | undefined = NewOrderedMapWithSizeHint$Named_tspath$Path$PointerTo_Named_project$Project((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.length() + IfElse$int(!((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject === undefined), 1, 0));
        const __gotots_range_1 = ProjectCollection.ConfiguredProjects(c);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
            const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_0);
            let project: {
                value: Project;
            } | undefined = __gotots_range_value_3;
            OrderedMap$Set$Named_tspath$Path$PointerTo_Named_project$Project(projects, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, project);
        }
        if (!((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject === undefined)) {
            OrderedMap$Set$Named_tspath$Path$PointerTo_Named_project$Project(projects, new Path__from_tspath(inferredProjectName$string), (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject);
        }
        return projects;
    }
    static $go$private$project$clone(c: {
        value: ProjectCollection;
    } | undefined): {
        value: ProjectCollection;
    } | undefined {
        return { value: new ProjectCollection((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistry, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, Set__from_collections.$copy<Path__from_tspath>((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.openFiles), (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects, named_sync.SyncOnceOperations.$zero(), void 0) };
    }
    static $go$private$project$fillConfiguredProjects(c: {
        value: ProjectCollection;
    } | undefined, projects: tsonicTypeScriptRuntime.Location<RuntimeSlice<{
        value: Project;
    } | undefined>> | undefined): void {
        const __gotots_range_2 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects;
        const __gotots_range_keys_1 = __gotots_range_2.keys();
        for (const __gotots_range_value_4 of __gotots_range_keys_1) {
            const __gotots_range_value_5 = __gotots_range_2.lookupOk(__gotots_range_value_4);
            if (!__gotots_range_value_5[1]) {
                continue;
            }
            const __gotots_range_value_6 = __gotots_range_value_5[0];
            let p: {
                value: Project;
            } | undefined = __gotots_range_value_6;
            void ((projects ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                ((projects ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                    value: Project;
                } | undefined>>).value.append(void 0, [p]));
        }
        SortFunc$SliceOf_PointerTo_Named_project$Project$PointerTo_Named_project$Project(((projects ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
            value: Project;
        } | undefined>>).value, (a: {
            value: Project;
        } | undefined, b: {
            value: Project;
        } | undefined): int => {
            return Compare$string(Project.Name(a), Project.Name(b));
        });
    }
    static $go$private$project$findDefaultConfiguredProject(c: {
        value: ProjectCollection;
    } | undefined, path: Path__from_tspath): {
        value: Project;
    } | undefined {
        {
            let configFileName = ConfigFileRegistry.GetConfigFileName((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistry, path);
            if (configFileName !== "") {
                return ProjectCollection.$go$private$project$findDefaultConfiguredProjectWorker(c, path, configFileName, void 0, void 0);
            }
        }
        return void 0;
    }
    static $go$private$project$findDefaultConfiguredProjectWorker(c: {
        value: ProjectCollection;
    } | undefined, path: Path__from_tspath, configFileName: gostring, visited: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<{
        value: Project;
    } | undefined>> | undefined, fallback: {
        value: Project;
    } | undefined): {
        value: Project;
    } | undefined {
        const __gotots_callee_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_0 = configFileName;
        let configFilePath = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        const __gotots_results_2 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects.lookupOk(configFilePath);
        let project: {
            value: Project;
        } | undefined = __gotots_results_2[0];
        let ok = __gotots_results_2[1];
        if (!ok) {
            return void 0;
        }
        if (visited === undefined) {
            const __gotots_struct_0 = SyncSet__from_collections.$zero<{
                value: Project;
            } | undefined>();
            visited =
                tsonicTypeScriptRuntime.location<SyncSet__from_collections<{
                    value: Project;
                } | undefined>>(__gotots_struct_0);
        }
        let search = BreadthFirstSearchParallelEx$PointerTo_Named_project$Project$PointerTo_Named_project$Project(project, (project__shadow_1: {
            value: Project;
        } | undefined): RuntimeSlice<{
            value: Project;
        } | undefined> => {
            if ((project__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine === undefined) {
                return RuntimeSlice.nil<{
                    value: Project;
                } | undefined>();
            }
            return MapNonNil$string$PointerTo_Named_project$Project(ParsedCommandLine__from_tsoptions.ResolvedProjectReferencePaths((project__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine), (configFileName__shadow_1: gostring): {
                value: Project;
            } | undefined => {
                const __gotots_map_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects;
                const __gotots_callee_1 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_1 = configFileName__shadow_1;
                const __gotots_map_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                return __gotots_map_0.lookup(__gotots_map_1);
            });
        }, (project__shadow_1: {
            value: Project;
        } | undefined): [
            bool,
            bool
        ] => {
            let isResult: bool = false;
            let stop: bool = false;
            if (Project.$go$private$project$containsFile(project__shadow_1, path)) {
                return [true, !Project.IsSourceFromProjectReference(project__shadow_1, path)];
            }
            return [false, false];
        }, BreadthFirstSearchOptions__from_core.$fromStorage<{
            value: Project;
        } | undefined, {
            value: Project;
        } | undefined>({
            Visited: visited,
            PreprocessLevel: void 0
        }), ($argument0: {
            value: Project;
        } | undefined): {
            value: Project;
        } | undefined => {
            return Identity$PointerTo_Named_project$Project($argument0);
        });
        if (BreadthFirstSearchResult__from_core.$storageOf(search).Stopped) {
            return BreadthFirstSearchResult__from_core.$storageOf(search).Path.get(0);
        }
        if (BreadthFirstSearchResult__from_core.$storageOf(search).Path.length > 0 && fallback === undefined) {
            fallback = BreadthFirstSearchResult__from_core.$storageOf(search).Path.get(0);
        }
        {
            let config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = ConfigFileRegistry.GetConfig((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistry, path);
            if (!(config === undefined) && Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableSolutionSearching)) {
                return fallback;
            }
        }
        {
            let ancestorConfigName = ConfigFileRegistry.GetAncestorConfigFileName((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistry, path, configFileName);
            if (ancestorConfigName !== "") {
                return ProjectCollection.$go$private$project$findDefaultConfiguredProjectWorker(c, path, ancestorConfigName, visited, fallback);
            }
        }
        return fallback;
    }
}
export function openFilePaths(overlays: GoMapValue<Path__from_tspath, {
    value: Overlay;
} | undefined>): Set__from_collections<Path__from_tspath> {
    let openFiles = Set__from_collections.$fromStorage<Path__from_tspath>({
        M: GoMap.make(overlays.length(), [])
    });
    const openFiles$location = tsonicTypeScriptRuntime.boundLocation({}, () => openFiles, openFiles$next => openFiles = openFiles$next);
    const __gotots_range_0 = overlays;
    const __gotots_range_keys_0 = __gotots_range_0.keys();
    for (const __gotots_range_value_0 of __gotots_range_keys_0) {
        const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
        if (!__gotots_range_value_1[1]) {
            continue;
        }
        const __gotots_range_value_2 = __gotots_range_value_0;
        let path = __gotots_range_value_2;
        Set$Add$Named_tspath$Path(openFiles$location, path);
    }
    return Set__from_collections.$copy<Path__from_tspath>(openFiles);
}
export function findDefaultConfiguredProjectFromProgramInclusion(fileName: gostring, path: Path__from_tspath, projectPaths: RuntimeSlice<gostring>, getProject: (($0: Path__from_tspath) => {
    value: Project;
} | undefined) | undefined): [
    Path__from_tspath,
    bool
] {
    let result: Path__from_tspath = new Path__from_tspath("");
    let multipleCandidates: bool = false;
    let containingProjects = RuntimeSlice.nil<gostring>();
    let firstConfiguredProject = new Path__from_tspath("");
    let firstNonSourceOfProjectReferenceRedirect = new Path__from_tspath("");
    let multipleDirectInclusions = false;
    const __gotots_range_6 = projectPaths;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_6.length; __gotots_range_index_2++) {
        const __gotots_range_value_14 = new Path__from_tspath(__gotots_range_6.get(__gotots_range_index_2));
        let projectPath = __gotots_range_value_14;
        const __gotots_callee_3 = getProject;
        const __gotots_argument_2 = projectPath;
        let p: {
            value: Project;
        } | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        if (Project.$go$private$project$containsFile(p, path)) {
            containingProjects = containingProjects.append(((void Path__from_tspath,
                "") as string), [projectPath.$value]);
            if (!multipleDirectInclusions && !Project.IsSourceFromProjectReference(p, path)) {
                if (firstNonSourceOfProjectReferenceRedirect.$value ===
                    ((void Path__from_tspath,
                        "") as string)) {
                    firstNonSourceOfProjectReferenceRedirect = projectPath;
                }
                else {
                    multipleDirectInclusions = true;
                }
            }
            if (firstConfiguredProject.$value ===
                ((void Path__from_tspath,
                    "") as string)) {
                firstConfiguredProject = projectPath;
            }
        }
    }
    if (containingProjects.length === 1) {
        return [new Path__from_tspath(containingProjects.get(0)), false];
    }
    if (!multipleDirectInclusions) {
        if (!(firstNonSourceOfProjectReferenceRedirect.$value ===
            ((void Path__from_tspath,
                "") as string))) {
            return [firstNonSourceOfProjectReferenceRedirect, false];
        }
        return [firstConfiguredProject, false];
    }
    return [firstConfiguredProject, true];
}
