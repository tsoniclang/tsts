import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ResolutionHost as ResolutionHost__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_cachedvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/cachedvfs/package.js";
import type { Entries as Entries__from_vfs, FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { fileLoader } from "./fileloader.js";
import type { CompilerHost } from "./host.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { KnownDirectoryLink as KnownDirectoryLink__from_symlinks, KnownSymlinks as KnownSymlinks__from_symlinks } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/symlinks/package.js";
import { ContainsIgnoredPath as ContainsIgnoredPath__from_tspath, EnsureTrailingDirectorySeparator as EnsureTrailingDirectorySeparator__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { From as From__from_cachedvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/cachedvfs/package.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink, SyncMap$Load$Named_tspath$Path$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { IfElse$Named_core$Tristate, IfElse$string_to_Named_core$Tristate } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$PointerTo_Named_cachedvfs$FS, $goInterfaceAdapter$PointerTo_Named_compiler$projectReferenceDtsFakingHost, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_compiler$projectReferenceDtsFakingVfs as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { projectReferenceFileMapper } from "./projectreferencefilemapper.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class projectReferenceDtsFakingHost {
    declare private readonly $goType: void;
    public constructor(public host: CompilerHost | undefined, public fs: {
        value: FS__from_cachedvfs;
    } | undefined) {
    }
    static $copy($source: projectReferenceDtsFakingHost): projectReferenceDtsFakingHost {
        return new projectReferenceDtsFakingHost($source.host, $source.fs);
    }
    static $equal($left: projectReferenceDtsFakingHost, $right: projectReferenceDtsFakingHost): bool {
        return goInterfaceEqual($left.host, $right.host) &&
            $left.fs
                ===
                    $right.fs;
    }
    static $hash($source: projectReferenceDtsFakingHost): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.host === undefined ? 0 : $source.host.$go$hash());
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.fs));
        return $hash;
    }
    declare private readonly then?: never;
    static FS(h: {
        value: projectReferenceDtsFakingHost;
    } | undefined): FS__from_vfs | undefined {
        return new $goInterfaceAdapter$PointerTo_Named_cachedvfs$FS((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs);
    }
    static GetCurrentDirectory(h: {
        value: projectReferenceDtsFakingHost;
    } | undefined): gostring {
        const __gotots_receiver_0: projectReferenceDtsFakingHost["host"] = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        return goInterfaceNonNil<CompilerHost>(__gotots_receiver_0).GetCurrentDirectory();
    }
}
export function newProjectReferenceDtsFakingHost(loader: fileLoader | undefined): ResolutionHost__from___go_module | undefined {
    const __gotots_field_3 = (loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).opts.Host;
    const __gotots_field_0 = (loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectReferenceFileMapper;
    const __gotots_field_1 = Set__from_collections.$copy<Path__from_tspath>((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dtsDirectories);
    const __gotots_struct_0 = KnownSymlinks__from_symlinks.$zero();
    const __gotots_field_2 = __gotots_struct_0;
    const __gotots_argument_0 = new GoInterfaceAdapter({ value: new projectReferenceDtsFakingVfs(__gotots_field_0, __gotots_field_1, __gotots_field_2) });
    const __gotots_field_4 = From__from_cachedvfs(__gotots_argument_0);
    let host: {
        value: projectReferenceDtsFakingHost;
    } | undefined = { value: new projectReferenceDtsFakingHost(__gotots_field_3, __gotots_field_4) };
    return new $goInterfaceAdapter$PointerTo_Named_compiler$projectReferenceDtsFakingHost(host);
}
export class projectReferenceDtsFakingVfs {
    declare private readonly $goType: void;
    public constructor(public projectReferenceFileMapper: {
        value: projectReferenceFileMapper;
    } | undefined, public dtsDirectories: Set__from_collections<Path__from_tspath>, public knownSymlinks: KnownSymlinks__from_symlinks) {
    }
    static $copy($source: projectReferenceDtsFakingVfs): projectReferenceDtsFakingVfs {
        return new projectReferenceDtsFakingVfs($source.projectReferenceFileMapper, Set__from_collections.$copy<Path__from_tspath>($source.dtsDirectories), KnownSymlinks__from_symlinks.$copy($source.knownSymlinks));
    }
    declare private readonly then?: never;
    static AppendFile(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring, data: gostring): GoInterface | undefined {
        const __gotots_argument_1 = new $goInterfaceAdapter$string("should not be called by resolver");
        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Chtimes(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring, aTime: time__from_gostdlib.Time, mTime: time__from_gostdlib.Time): GoInterface | undefined {
        const __gotots_argument_2 = new $goInterfaceAdapter$string("should not be called by resolver");
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static DirectoryExists(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring): bool {
        const __gotots_receiver_1 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
        const __gotots_receiver_2 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_1).FS();
        const __gotots_argument_3 = path;
        if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).DirectoryExists(__gotots_argument_3)) {
            projectReferenceDtsFakingVfs.$go$private$compiler$handleDirectoryCouldBeSymlink(fs, path);
            return true;
        }
        return projectReferenceDtsFakingVfs.$go$private$compiler$fileOrDirectoryExistsUsingSource(fs, path, false);
    }
    static FileExists(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring): bool {
        const __gotots_receiver_3 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
        const __gotots_receiver_4 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_3).FS();
        const __gotots_argument_4 = path;
        if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).FileExists(__gotots_argument_4)) {
            return true;
        }
        if (!IsDeclarationFileName__from_tspath(path)) {
            return false;
        }
        return projectReferenceDtsFakingVfs.$go$private$compiler$fileOrDirectoryExistsUsingSource(fs, path, true);
    }
    static GetAccessibleEntries(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring): Entries__from_vfs {
        const __gotots_argument_5 = new $goInterfaceAdapter$string("should not be called by resolver");
        GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static ReadFile(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring): [
        gostring,
        bool
    ] {
        let contents: gostring = "";
        let ok: bool = false;
        const __gotots_receiver_5 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
        const __gotots_receiver_6 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_5).FS();
        const __gotots_argument_6 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).ReadFile(__gotots_argument_6);
    }
    static Realpath(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring): gostring {
        const __gotots_store_0 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$string(KnownSymlinks__from_symlinks.Files(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "knownSymlinks")), projectReferenceDtsFakingVfs.$go$private$compiler$toPath(fs, path));
        let result = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            return result;
        }
        const __gotots_receiver_7 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
        const __gotots_receiver_8 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_7).FS();
        const __gotots_argument_7 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).Realpath(__gotots_argument_7);
    }
    static Remove(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring): GoInterface | undefined {
        const __gotots_argument_8 = new $goInterfaceAdapter$string("should not be called by resolver");
        GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Stat(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        const __gotots_argument_9 = new $goInterfaceAdapter$string("should not be called by resolver");
        GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static UseCaseSensitiveFileNames(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined): bool {
        const __gotots_receiver_9 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
        const __gotots_receiver_10 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_9).FS();
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).UseCaseSensitiveFileNames();
    }
    static WalkDir(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined): GoInterface | undefined {
        const __gotots_argument_10 = new $goInterfaceAdapter$string("should not be called by resolver");
        GoPanic.raise(__gotots_argument_10 === undefined ? GoPanicNilValue.create() : __gotots_argument_10);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static WriteFile(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring, data: gostring): GoInterface | undefined {
        const __gotots_argument_11 = new $goInterfaceAdapter$string("should not be called by resolver");
        GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$compiler$directoryExistsIfProjectReferenceDeclDir(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, dir: gostring): Tristate__from_core {
        let dirPath = projectReferenceDtsFakingVfs.$go$private$compiler$toPath(fs, dir);
        let dirPathWithTrailingDirectorySeparator = new Path__from_tspath(dirPath.$value + "/");
        const __gotots_store_6 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_range_0 = Set$Keys$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "dtsDirectories"));
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            let declDirPath = __gotots_range_value_2;
            if (dirPath.$value === declDirPath.$value || strings__from_gostdlib.HasPrefix(declDirPath.$value, dirPathWithTrailingDirectorySeparator.$value) || strings__from_gostdlib.HasPrefix(dirPath.$value, declDirPath.$value + "/")) {
                return TSTrue$constant__from_core();
            }
        }
        return TSUnknown$constant__from_core();
    }
    static $go$private$compiler$fileExistsIfProjectReferenceDts(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, file: gostring): Tristate__from_core {
        let source: {
            value: SourceOutputAndProjectReference__from_tsoptions;
        } | undefined = projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromOutputDts((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper, projectReferenceDtsFakingVfs.$go$private$compiler$toPath(fs, file));
        if (!(source === undefined)) {
            const __gotots_receiver_15 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
            const __gotots_receiver_16 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_15).FS();
            const __gotots_argument_22: SourceOutputAndProjectReference__from_tsoptions["Source"] = (source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Source;
            const __gotots_argument_23 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_16).FileExists(__gotots_argument_22);
            const __gotots_argument_24 = TSTrue$constant__from_core();
            const __gotots_argument_25 = TSFalse$constant__from_core();
            return IfElse$Named_core$Tristate(__gotots_argument_23, __gotots_argument_24, __gotots_argument_25);
        }
        return TSUnknown$constant__from_core();
    }
    static $go$private$compiler$fileOrDirectoryExistsUsingSource(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, fileOrDirectory: gostring, isFile: bool): bool {
        const __gotots_argument_12 = isFile;
        const __gotots_receiver_11 = fs;
        const __gotots_argument_13 = ($argument0: gostring): Tristate__from_core => {
            return projectReferenceDtsFakingVfs.$go$private$compiler$fileExistsIfProjectReferenceDts(__gotots_receiver_11, $argument0);
        };
        const __gotots_receiver_12 = fs;
        const __gotots_argument_14 = ($argument0: gostring): Tristate__from_core => {
            return projectReferenceDtsFakingVfs.$go$private$compiler$directoryExistsIfProjectReferenceDeclDir(__gotots_receiver_12, $argument0);
        };
        let fileOrDirectoryExistsUsingSource: (($0: gostring) => Tristate__from_core) | undefined = IfElse$string_to_Named_core$Tristate(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
        const __gotots_callee_0 = fileOrDirectoryExistsUsingSource;
        const __gotots_argument_15 = fileOrDirectory;
        let result = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
        if (!(result === TSUnknown$constant__from_core())) {
            return result === TSTrue$constant__from_core();
        }
        const __gotots_store_3 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let knownDirectoryLinks: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
            value: KnownDirectoryLink__from_symlinks;
        } | undefined>> | undefined = KnownSymlinks__from_symlinks.Directories(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "knownSymlinks"));
        if (SyncMap__from_collections.Size<Path__from_tspath, {
            value: KnownDirectoryLink__from_symlinks;
        } | undefined>(knownDirectoryLinks) === 0) {
            return false;
        }
        let fileOrDirectoryPath = projectReferenceDtsFakingVfs.$go$private$compiler$toPath(fs, fileOrDirectory);
        if (!strings__from_gostdlib.Contains(fileOrDirectoryPath.$value, "/node_modules/")) {
            return false;
        }
        if (isFile) {
            const __gotots_store_4 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$string(KnownSymlinks__from_symlinks.Files(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "knownSymlinks")), fileOrDirectoryPath);
            let ok = __gotots_results_2[1];
            if (ok) {
                return true;
            }
        }
        let exists = false;
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink(knownDirectoryLinks, (directoryPath: Path__from_tspath, knownDirectoryLink: {
            value: KnownDirectoryLink__from_symlinks;
        } | undefined): bool => {
            const __gotots_results_4 = strings__from_gostdlib.CutPrefix(fileOrDirectoryPath.$value, directoryPath.$value);
            let relative = __gotots_results_4[0];
            let hasPrefix = __gotots_results_4[1];
            if (!hasPrefix) {
                return true;
            }
            {
                const __gotots_callee_1 = fileOrDirectoryExistsUsingSource;
                const __gotots_argument_16 = (knownDirectoryLink ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RealPath.$value + relative;
                exists = Tristate_IsTrue__from_core((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16));
                if (exists) {
                    if (isFile) {
                        const __gotots_argument_17 = fileOrDirectory;
                        const __gotots_receiver_13 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
                        const __gotots_argument_18 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_13).GetCurrentDirectory();
                        let absolutePath = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_17, __gotots_argument_18);
                        const __gotots_store_5 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        KnownSymlinks__from_symlinks.SetFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "knownSymlinks"), absolutePath, fileOrDirectoryPath, (knownDirectoryLink ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Real + goStringSlice(absolutePath, directoryPath.$value.length));
                    }
                    return false;
                }
            }
            return true;
        });
        return exists;
    }
    static $go$private$compiler$handleDirectoryCouldBeSymlink(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, directory: gostring): void {
        if (ContainsIgnoredPath__from_tspath(directory)) {
            return;
        }
        if (!strings__from_gostdlib.Contains(directory, "/node_modules/")) {
            return;
        }
        let directoryPath = new Path__from_tspath(EnsureTrailingDirectorySeparator__from_tspath(projectReferenceDtsFakingVfs.$go$private$compiler$toPath(fs, directory).$value));
        {
            const __gotots_store_1 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_1 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink(KnownSymlinks__from_symlinks.Directories(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "knownSymlinks")), directoryPath);
            let ok = __gotots_results_1[1];
            if (ok) {
                return;
            }
        }
        let realDirectory = projectReferenceDtsFakingVfs.Realpath(fs, directory);
        let realPath = new Path__from_tspath("");
        if (realDirectory === directory) {
            return;
        }
        {
            realPath = new Path__from_tspath(EnsureTrailingDirectorySeparator__from_tspath(projectReferenceDtsFakingVfs.$go$private$compiler$toPath(fs, realDirectory).$value));
            if (realPath.$value === directoryPath.$value) {
                return;
            }
        }
        const __gotots_store_2 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        KnownSymlinks__from_symlinks.SetDirectory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "knownSymlinks"), directory, directoryPath, { value: new KnownDirectoryLink__from_symlinks(EnsureTrailingDirectorySeparator__from_tspath(realDirectory), realPath) });
    }
    static $go$private$compiler$toPath(fs: {
        value: projectReferenceDtsFakingVfs;
    } | undefined, path: gostring): Path__from_tspath {
        const __gotots_argument_19 = path;
        const __gotots_receiver_14 = ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
        const __gotots_argument_20 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_14).GetCurrentDirectory();
        const __gotots_argument_21 = projectReferenceDtsFakingVfs.UseCaseSensitiveFileNames(fs);
        return ToPath__from_tspath(__gotots_argument_19, __gotots_argument_20, __gotots_argument_21);
    }
}
