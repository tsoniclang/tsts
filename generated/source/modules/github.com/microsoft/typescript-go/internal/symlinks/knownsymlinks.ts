import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { ContainsIgnoredPath as ContainsIgnoredPath__from_tspath, EnsureTrailingDirectorySeparator as EnsureTrailingDirectorySeparator__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetPathComponents as GetPathComponents__from_tspath, GetPathFromPathComponents as GetPathFromPathComponents__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink, SyncMap$Load$Named_tspath$Path$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { SyncMap$Store$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink, SyncMap$Store$Named_tspath$Path$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { SyncSet$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class KnownDirectoryLink {
    declare private readonly $goType: void;
    public constructor(public Real: gostring, public RealPath: Path__from_tspath) {
    }
    static $copy($source: KnownDirectoryLink): KnownDirectoryLink {
        return new KnownDirectoryLink($source.Real, $source.RealPath);
    }
    static $equal($left: KnownDirectoryLink, $right: KnownDirectoryLink): bool {
        return $left.Real === $right.Real && $left.RealPath.$value === $right.RealPath.$value;
    }
    static $hash($source: KnownDirectoryLink): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Real));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.RealPath.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class KnownSymlinks {
    declare private readonly $goType: void;
    public constructor(public directories: SyncMap__from_collections<Path__from_tspath, {
        value: KnownDirectoryLink;
    } | undefined>, public directoriesByRealpath: SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>, public files: SyncMap__from_collections<Path__from_tspath, gostring>, public filesByRealpath: SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>, public cwd: gostring, public useCaseSensitiveFileNames: bool) {
    }
    static $zero(): KnownSymlinks {
        return new KnownSymlinks(SyncMap__from_collections.$zero<Path__from_tspath, {
            value: KnownDirectoryLink;
        } | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, gostring>(), SyncMap__from_collections.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>(), "", false);
    }
    static $copy($source: KnownSymlinks): KnownSymlinks {
        return new KnownSymlinks(SyncMap__from_collections.$copy<Path__from_tspath, {
            value: KnownDirectoryLink;
        } | undefined>($source.directories), SyncMap__from_collections.$copy<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>($source.directoriesByRealpath), SyncMap__from_collections.$copy<Path__from_tspath, gostring>($source.files), SyncMap__from_collections.$copy<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>($source.filesByRealpath), $source.cwd, $source.useCaseSensitiveFileNames);
    }
    declare private readonly then?: never;
    static Directories(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: KnownDirectoryLink;
    } | undefined>> | undefined {
        const __gotots_store_10 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "directories");
    }
    static DirectoriesByRealpath(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>> | undefined {
        const __gotots_store_0 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "directoriesByRealpath");
    }
    static Files(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined {
        const __gotots_store_9 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "files");
    }
    static FilesByRealpath(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>> | undefined {
        const __gotots_store_8 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "filesByRealpath");
    }
    static HasDirectory(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined, symlinkPath: Path__from_tspath): bool {
        const __gotots_store_1 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
        const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "directories"), symlinkPath.EnsureTrailingDirectorySeparator());
        let ok = __gotots_results_0[1];
        return ok;
    }
    static ProcessResolution(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined, originalPath: gostring, resolvedFileName: gostring): void {
        if (originalPath === "" || resolvedFileName === "") {
            return;
        }
        KnownSymlinks.SetFile(cache, originalPath, ToPath__from_tspath(originalPath, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.cwd, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.useCaseSensitiveFileNames), resolvedFileName);
        const __gotots_results_1 = KnownSymlinks.$go$private$symlinks$guessDirectorySymlink(cache, resolvedFileName, originalPath, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.cwd);
        let commonResolved = __gotots_results_1[0];
        let commonOriginal = __gotots_results_1[1];
        if (commonResolved !== "" && commonOriginal !== "") {
            let symlinkPath = ToPath__from_tspath(commonOriginal, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.cwd, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.useCaseSensitiveFileNames);
            if (!ContainsIgnoredPath__from_tspath(symlinkPath.$value)) {
                KnownSymlinks.SetDirectory(cache, commonOriginal, symlinkPath.EnsureTrailingDirectorySeparator(), { value: new KnownDirectoryLink(EnsureTrailingDirectorySeparator__from_tspath(commonResolved), ToPath__from_tspath(commonResolved, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.cwd, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.useCaseSensitiveFileNames).EnsureTrailingDirectorySeparator()) });
            }
        }
    }
    static SetDirectory(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined, symlink: gostring, symlinkPath: Path__from_tspath, realDirectory: {
        value: KnownDirectoryLink;
    } | undefined): void {
        if (!(realDirectory === undefined)) {
            {
                const __gotots_store_5 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
                const __gotots_results_4 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "directories"), symlinkPath);
                let ok = __gotots_results_4[1];
                if (!ok) {
                    const __gotots_store_6 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
                    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "directoriesByRealpath");
                    const __gotots_argument_6: KnownDirectoryLink["RealPath"] = (realDirectory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RealPath;
                    const __gotots_struct_1 = SyncSet__from_collections.$zero<gostring>();
                    const __gotots_argument_7 = tsonicTypeScriptRuntime.location<SyncSet__from_collections<gostring>>(__gotots_struct_1);
                    const __gotots_results_5 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string(__gotots_receiver_1, __gotots_argument_6, __gotots_argument_7);
                    let __go_set: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined = __gotots_results_5[0];
                    SyncSet$Add$string(__go_set, symlink);
                }
            }
        }
        const __gotots_store_7 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
        SyncMap$Store$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "directories"), symlinkPath, realDirectory);
    }
    static SetFile(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined, symlink: gostring, symlinkPath: Path__from_tspath, realpath: gostring): void {
        {
            const __gotots_store_2 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
            const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "files"), symlinkPath);
            let ok = __gotots_results_2[1];
            if (!ok) {
                let realpathPath = ToPath__from_tspath(realpath, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.cwd, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.useCaseSensitiveFileNames);
                const __gotots_store_3 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
                const __gotots_receiver_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "filesByRealpath");
                const __gotots_argument_4 = realpathPath;
                const __gotots_struct_0 = SyncSet__from_collections.$zero<gostring>();
                const __gotots_argument_5 = tsonicTypeScriptRuntime.location<SyncSet__from_collections<gostring>>(__gotots_struct_0);
                const __gotots_results_3 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string(__gotots_receiver_0, __gotots_argument_4, __gotots_argument_5);
                let __go_set: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined = __gotots_results_3[0];
                SyncSet$Add$string(__go_set, symlink);
            }
        }
        const __gotots_store_4 = ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value;
        SyncMap$Store$Named_tspath$Path$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "files"), symlinkPath, realpath);
    }
    static SetSymlinksFromResolutions(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined, forEachResolvedModule: (($0: (($0: ResolvedModule__from___go_module | undefined, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => void) | undefined, forEachResolvedTypeReferenceDirective: (($0: (($0: ResolvedTypeReferenceDirective__from___go_module | undefined, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => void) | undefined): void {
        const __gotots_callee_0 = forEachResolvedModule;
        const __gotots_argument_0 = (resolution: ResolvedModule__from___go_module | undefined, moduleName: gostring, mode: ModuleKind__from_core, filePath: Path__from_tspath): void => {
            KnownSymlinks.ProcessResolution(cache, (resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).OriginalPath, (resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName);
        };
        const __gotots_argument_1 = void 0;
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
        const __gotots_callee_1 = forEachResolvedTypeReferenceDirective;
        const __gotots_argument_2 = (resolution: ResolvedTypeReferenceDirective__from___go_module | undefined, moduleName: gostring, mode: ModuleKind__from_core, filePath: Path__from_tspath): void => {
            KnownSymlinks.ProcessResolution(cache, (resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).OriginalPath, (resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName);
        };
        const __gotots_argument_3 = void 0;
        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3);
    }
    static $go$private$symlinks$guessDirectorySymlink(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined, a: gostring, b: gostring, cwd: gostring): [
        gostring,
        gostring
    ] {
        let aParts = GetPathComponents__from_tspath(GetNormalizedAbsolutePath__from_tspath(a, cwd), "");
        let bParts = GetPathComponents__from_tspath(GetNormalizedAbsolutePath__from_tspath(b, cwd), "");
        let isDirectory = false;
        for (; aParts.length >= 2 && bParts.length >= 2 && !KnownSymlinks.$go$private$symlinks$isNodeModulesOrScopedPackageDirectory(cache, aParts.get(aParts.length - 2)) && !KnownSymlinks.$go$private$symlinks$isNodeModulesOrScopedPackageDirectory(cache, bParts.get(bParts.length - 2)) && GetCanonicalFileName__from_tspath(aParts.get(aParts.length - 1), ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.useCaseSensitiveFileNames) === GetCanonicalFileName__from_tspath(bParts.get(bParts.length - 1), ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.useCaseSensitiveFileNames);) {
            aParts = aParts.slice(0, aParts.length - 1, null);
            bParts = bParts.slice(0, bParts.length - 1, null);
            isDirectory = true;
        }
        if (isDirectory) {
            return [GetPathFromPathComponents__from_tspath(aParts), GetPathFromPathComponents__from_tspath(bParts)];
        }
        return ["", ""];
    }
    static $go$private$symlinks$isNodeModulesOrScopedPackageDirectory(cache: tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined, s: gostring): bool {
        return s !== "" && (GetCanonicalFileName__from_tspath(s, ((cache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KnownSymlinks>).value.useCaseSensitiveFileNames) === "node_modules" || strings__from_gostdlib.HasPrefix(s, "@"));
    }
}
export function NewKnownSymlink(currentDirectory: gostring, useCaseSensitiveFileNames: bool): tsonicTypeScriptRuntime.Location<KnownSymlinks> | undefined {
    return tsonicTypeScriptRuntime.location<KnownSymlinks>(new KnownSymlinks(SyncMap__from_collections.$zero<Path__from_tspath, {
        value: KnownDirectoryLink;
    } | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, gostring>(), SyncMap__from_collections.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>(), currentDirectory, useCaseSensitiveFileNames));
}
