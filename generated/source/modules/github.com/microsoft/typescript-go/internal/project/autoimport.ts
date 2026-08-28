import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExternalModuleIndicatorOptions$Storage as ExternalModuleIndicatorOptions__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import type { Entries as Entries__from_vfs, FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { FileHandle, Overlay, diskFile } from "./overlayfs.js";
import type { ParseCacheKey$Storage as ParseCacheKey__from_project$Storage } from "./parsecache.js";
import type { RefCountCache } from "./refcountcache.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import { ExternalModuleIndicatorOptions as ExternalModuleIndicatorOptions__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Fields as Fields__from_packagejson, InfoCacheEntry as InfoCacheEntry__from_packagejson, PackageJson as PackageJson__from_packagejson, Parse as Parse__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { GetDirectoryPath as GetDirectoryPath__from_tspath, Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { SyncMap$Load$Named_tspath$Path$Named_project$FileHandle } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$Named_project$FileHandle } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { RefCountCache$Acquire$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/RefCountCache$Acquire.js";
import { RefCountCache$Deref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/RefCountCache$Deref.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Load.js";
import { $goInterfaceAdapter$PointerTo_Named_project$Overlay, $goInterfaceAdapter$PointerTo_Named_project$diskFile, $goInterfaceAdapter$PointerTo_Named_project$sourceFS, $goInterfaceAdapter$PointerTo_Named_project$autoImportBuilderFS as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { newDiskFile } from "./overlayfs.js";
import { NewParseCacheKey, ParseCacheKey } from "./parsecache.js";
import { Project } from "./project.js";
import { ProjectCollection } from "./projectcollection.js";
import { newSourceFS, snapshotFSBuilder, sourceFS } from "./snapshotfs.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export class autoImportBuilderFS {
    declare private readonly $goType: void;
    public constructor(public snapshotFSBuilder: {
        value: snapshotFSBuilder;
    } | undefined, public untrackedFiles: SyncMap__from_collections<Path__from_tspath, FileHandle | undefined>) {
    }
    static $copy($source: autoImportBuilderFS): autoImportBuilderFS {
        return new autoImportBuilderFS($source.snapshotFSBuilder, SyncMap__from_collections.$copy<Path__from_tspath, FileHandle | undefined>($source.untrackedFiles));
    }
    declare private readonly then?: never;
    static FS(a: {
        value: autoImportBuilderFS;
    } | undefined): FS__from_vfs | undefined {
        return ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotFSBuilder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    }
    static FileExists(a: {
        value: autoImportBuilderFS;
    } | undefined, fileName: gostring, path: Path__from_tspath): bool {
        return snapshotFSBuilder.FileExists((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotFSBuilder, fileName, path);
    }
    static GetAccessibleEntries(a: {
        value: autoImportBuilderFS;
    } | undefined, path: gostring): Entries__from_vfs {
        return snapshotFSBuilder.GetAccessibleEntries((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotFSBuilder, path);
    }
    static GetFile(a: {
        value: autoImportBuilderFS;
    } | undefined, fileName: gostring): FileHandle | undefined {
        const __gotots_callee_0: snapshotFSBuilder["toPath"] = ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotFSBuilder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_4 = fileName;
        let path = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
        return autoImportBuilderFS.GetFileByPath(a, fileName, path);
    }
    static GetFileByPath(a: {
        value: autoImportBuilderFS;
    } | undefined, fileName: gostring, path: Path__from_tspath): FileHandle | undefined {
        {
            const __gotots_results_1 = ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotFSBuilder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
            let overlay: {
                value: Overlay;
            } | undefined = __gotots_results_1[0];
            let ok__shadow_1 = __gotots_results_1[1];
            if (ok__shadow_1) {
                return new $goInterfaceAdapter$PointerTo_Named_project$Overlay(overlay);
            }
        }
        {
            const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotFSBuilder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, path);
            let diskFile__shadow_1: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: diskFile;
                } | undefined>;
            } | undefined = __gotots_results_2[0];
            let ok__shadow_1 = __gotots_results_2[1];
            if (ok__shadow_1) {
                return snapshotFSBuilder.$go$private$project$reloadEntryIfNeeded((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotFSBuilder, diskFile__shadow_1);
            }
        }
        {
            const __gotots_store_0 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$Named_project$FileHandle(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "untrackedFiles"), path);
            let fh__shadow_1: FileHandle | undefined = __gotots_results_3[0];
            let ok__shadow_1 = __gotots_results_3[1];
            if (ok__shadow_1) {
                return fh__shadow_1;
            }
        }
        let fh: FileHandle | undefined = void 0;
        const __gotots_receiver_4: snapshotFSBuilder["fs"] = ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotFSBuilder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_5 = fileName;
        const __gotots_results_4 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).ReadFile(__gotots_argument_5);
        let content = __gotots_results_4[0];
        let ok = __gotots_results_4[1];
        if (ok) {
            fh = new $goInterfaceAdapter$PointerTo_Named_project$diskFile(newDiskFile(fileName, content));
        }
        const __gotots_store_1 = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_5 = SyncMap$LoadOrStore$Named_tspath$Path$Named_project$FileHandle(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "untrackedFiles"), path, fh);
        fh = __gotots_results_5[0];
        return fh;
    }
}
export class autoImportRegistryCloneHost {
    declare private readonly $goType: void;
    public constructor(public projectCollection: {
        value: ProjectCollection;
    } | undefined, public parseCache: {
        value: RefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>;
    } | undefined, public fs: {
        value: sourceFS;
    } | undefined, public currentDirectory: gostring, public filesMu: sync__from_gostdlib.Mutex, public files: RuntimeSlice<ParseCacheKey__from_project$Storage>) {
    }
    static $copy($source: autoImportRegistryCloneHost): autoImportRegistryCloneHost {
        return new autoImportRegistryCloneHost($source.projectCollection, $source.parseCache, $source.fs, $source.currentDirectory, named_sync.SyncMutexOperations.$copy($source.filesMu), $source.files);
    }
    declare private readonly then?: never;
    static Dispose(a: {
        value: autoImportRegistryCloneHost;
    } | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.filesMu);
                    const __gotots_receiver_0: autoImportRegistryCloneHost["filesMu"] = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.filesMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    const __gotots_range_0: autoImportRegistryCloneHost["files"] = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.files;
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                        const __gotots_range_value_0 = ParseCacheKey.$copy(ParseCacheKey.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
                        let key = __gotots_range_value_0;
                        RefCountCache$Deref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, ParseCacheKey.$copy(key));
                    }
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
    }
    static FS(a: {
        value: autoImportRegistryCloneHost;
    } | undefined): FS__from_vfs | undefined {
        return new $goInterfaceAdapter$PointerTo_Named_project$sourceFS((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs);
    }
    static GetCurrentDirectory(a: {
        value: autoImportRegistryCloneHost;
    } | undefined): gostring {
        return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory;
    }
    static GetDefaultProject(a: {
        value: autoImportRegistryCloneHost;
    } | undefined, path: Path__from_tspath): [
        Path__from_tspath,
        {
            value: Program__from_compiler;
        } | undefined
    ] {
        let project: {
            value: Project;
        } | undefined = ProjectCollection.GetDefaultProject((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectCollection, path);
        if (project === undefined) {
            return [new Path__from_tspath(""), void 0];
        }
        return [(project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, Project.GetProgram(project)];
    }
    static GetPackageJson(a: {
        value: autoImportRegistryCloneHost;
    } | undefined, fileName: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined {
        let fh: FileHandle | undefined = sourceFS.GetFile((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, fileName);
        let packageDirectory = GetDirectoryPath__from_tspath(fileName);
        if (fh === undefined) {
            return { value: new InfoCacheEntry__from_packagejson(packageDirectory, sourceFS.DirectoryExists((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, packageDirectory), void 0) };
        }
        const __gotots_receiver_1 = fh;
        const __gotots_conversion_0 = goInterfaceNonNil<FileHandle>(__gotots_receiver_1).Content();
        const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
        }
        const __gotots_argument_0 = __gotots_conversion_1;
        const __gotots_results_0 = Parse__from_packagejson(__gotots_argument_0);
        let fields = __gotots_results_0[0];
        let err: GoInterface | undefined = __gotots_results_0[1];
        if (!(err === undefined)) {
            const __gotots_field_1 = true;
            const __gotots_field_2 = GetDirectoryPath__from_tspath(fileName);
            const __gotots_field_0 = false;
            const __gotots_struct_0 = PackageJson__from_packagejson.$zero();
            __gotots_struct_0.Parseable = __gotots_field_0;
            const __gotots_field_3 = { value: __gotots_struct_0 };
            return { value: new InfoCacheEntry__from_packagejson(__gotots_field_2, __gotots_field_1, __gotots_field_3) };
        }
        const __gotots_field_6 = true;
        const __gotots_field_7 = GetDirectoryPath__from_tspath(fileName);
        const __gotots_field_4 = Fields__from_packagejson.$copy(fields);
        const __gotots_field_5 = true;
        const __gotots_struct_1 = PackageJson__from_packagejson.$zero();
        __gotots_struct_1.Fields = __gotots_field_4;
        __gotots_struct_1.Parseable = __gotots_field_5;
        const __gotots_field_8 = { value: __gotots_struct_1 };
        return { value: new InfoCacheEntry__from_packagejson(__gotots_field_7, __gotots_field_6, __gotots_field_8) };
    }
    static GetProgramForProject(a: {
        value: autoImportRegistryCloneHost;
    } | undefined, projectPath: Path__from_tspath): {
        value: Program__from_compiler;
    } | undefined {
        let project: {
            value: Project;
        } | undefined = ProjectCollection.GetProjectByPath((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectCollection, projectPath);
        if (project === undefined) {
            return void 0;
        }
        return Project.GetProgram(project);
    }
    static GetSourceFile(a: {
        value: autoImportRegistryCloneHost;
    } | undefined, fileName: gostring, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        let fh: FileHandle | undefined = sourceFS.GetFile((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, fileName);
        if (fh === undefined) {
            return void 0;
        }
        let opts = SourceFileParseOptions__from_ast.$fromStorage({
            FileName: fileName,
            Path: path.$value,
            ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions__from_ast.$storageOf(ExternalModuleIndicatorOptions__from_ast.$zero())
        });
        const __gotots_argument_1 = SourceFileParseOptions__from_ast.$copy(opts);
        const __gotots_receiver_2 = fh;
        const __gotots_argument_2 = goInterfaceNonNil<FileHandle>(__gotots_receiver_2).Hash();
        const __gotots_receiver_3 = fh;
        const __gotots_argument_3 = goInterfaceNonNil<FileHandle>(__gotots_receiver_3).Kind();
        let key = NewParseCacheKey(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
        let result: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = RefCountCache$Acquire$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, ParseCacheKey.$copy(key), fh);
        sync__from_gostdlib.Mutex.Lock((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.filesMu);
        const __gotots_slice_build_0: autoImportRegistryCloneHost["files"] = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.files;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, ParseCacheKey.$storageOf(ParseCacheKey.$copy(key)));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<ParseCacheKey__from_project$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, ParseCacheKey.$storageOf(ParseCacheKey.$copy(ParseCacheKey.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, ParseCacheKey.$storageOf(ParseCacheKey.$copy(key)));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, ParseCacheKey.$storageOf(ParseCacheKey.$zero()));
            }
        }
        (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.files = __gotots_slice_build_1;
        sync__from_gostdlib.Mutex.Unlock((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.filesMu);
        return result;
    }
}
export function newAutoImportRegistryCloneHost(projectCollection: {
    value: ProjectCollection;
} | undefined, parseCache: {
    value: RefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>;
} | undefined, snapshotFSBuilder__shadow_1: {
    value: snapshotFSBuilder;
} | undefined, currentDirectory: gostring, toPath: (($0: gostring) => Path__from_tspath) | undefined): {
    value: autoImportRegistryCloneHost;
} | undefined {
    return { value: new autoImportRegistryCloneHost(projectCollection, parseCache, newSourceFS(false, new GoInterfaceAdapter({ value: new autoImportBuilderFS(snapshotFSBuilder__shadow_1, SyncMap__from_collections.$zero<Path__from_tspath, FileHandle | undefined>()) }), toPath), currentDirectory, named_sync.SyncMutexOperations.$zero(), RuntimeSlice.nil<ParseCacheKey__from_project$Storage>()) };
}
