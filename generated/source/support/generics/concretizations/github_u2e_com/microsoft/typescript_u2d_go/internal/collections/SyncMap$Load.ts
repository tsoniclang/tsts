import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import type { FileIncludeReason as FileIncludeReason__from_compiler, referenceFileLocation as referenceFileLocation__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileInclude.js";
import type { LibFile as LibFile__from_compiler, libResolution as libResolution__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileloader.js";
import type { parseTaskData as parseTaskData__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/filesparser.js";
import type { BuildTask as BuildTask__from_build } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/build/buildtask.js";
import type { updatedSignature as updatedSignature__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/affectedfileshandler.js";
import type { emitUpdate as emitUpdate__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/emitfileshandler.js";
import type { DiagnosticsOrBuildInfoDiagnosticsWithFileName as DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental, FileEmitKind as FileEmitKind__from_incremental, FileInfo as FileInfo__from_incremental, emitSignature as emitSignature__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/snapshot.js";
import type { cachedSourceFile as cachedSourceFile__from_execute } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/watcher.js";
import type { KeywordCompletionFilters as KeywordCompletionFilters__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
import type { CompletionItem as CompletionItem__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { moduleResolutionCacheKey$Storage as moduleResolutionCacheKey__from___go_module$Storage, typeRefDirectiveResolutionCacheKey$Storage as typeRefDirectiveResolutionCacheKey__from___go_module$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/cache.js";
import type { ModeAwareCacheKey$Storage as ModeAwareCacheKey__from___go_module$Storage, ResolvedModule as ResolvedModule__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/types.js";
import type { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/cache.js";
import type { CachedTyping as CachedTyping__from_ata } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ata/ata.js";
import type { FileHandle as FileHandle__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { KnownDirectoryLink as KnownDirectoryLink__from_symlinks } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/symlinks/knownsymlinks.js";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions, SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsedcommandline.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { Entries$Storage as Entries__from_vfs$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfs.js";
import type { $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as scalars from "@gotots/gostdlib/internal/scalars.js";
import type * as time from "@gotots/gostdlib/time.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import { moduleResolutionCacheKey as moduleResolutionCacheKey__from___go_module, typeRefDirectiveResolutionCacheKey as typeRefDirectiveResolutionCacheKey__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/cache.js";
import { ModeAwareCacheKey as ModeAwareCacheKey__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/types.js";
import { FileHandle$contract as FileHandle$contract__from_project, FileHandle$is as FileHandle$is__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import { Entries as Entries__from_vfs } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfs.js";
import { $goInterfaceAdapter$Named___go_module$moduleResolutionCacheKey, $goInterfaceAdapter$Named___go_module$typeRefDirectiveResolutionCacheKey, $goInterfaceAdapter$Named_incremental$FileEmitKind, $goInterfaceAdapter$Named_ls$KeywordCompletionFilters, $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$Named_time$Time, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$Named_vfs$Entries, $goInterfaceAdapter$PointerTo_Named___go_module$ResolvedModule, $goInterfaceAdapter$PointerTo_Named___go_module$ResolvedTypeReferenceDirective, $goInterfaceAdapter$PointerTo_Named_ast$Diagnostic, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_ata$CachedTyping, $goInterfaceAdapter$PointerTo_Named_build$BuildTask, $goInterfaceAdapter$PointerTo_Named_collections$SetOf_Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_collections$SyncSetOf_string, $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason, $goInterfaceAdapter$PointerTo_Named_compiler$LibFile, $goInterfaceAdapter$PointerTo_Named_compiler$libResolution, $goInterfaceAdapter$PointerTo_Named_compiler$parseTaskData, $goInterfaceAdapter$PointerTo_Named_compiler$referenceFileLocation, $goInterfaceAdapter$PointerTo_Named_execute$cachedSourceFile, $goInterfaceAdapter$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, $goInterfaceAdapter$PointerTo_Named_incremental$FileInfo, $goInterfaceAdapter$PointerTo_Named_incremental$emitSignature, $goInterfaceAdapter$PointerTo_Named_incremental$emitUpdate, $goInterfaceAdapter$PointerTo_Named_incremental$updatedSignature, $goInterfaceAdapter$PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceAdapter$PointerTo_Named_symlinks$KnownDirectoryLink, $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine, $goInterfaceAdapter$PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceAdapter$SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceAdapter$SliceOf_PointerTo_Named_lsproto$CompletionItem, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$Named___go_module$ModeAwareCacheKey as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$contract as GoInterface$contract, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$is as GoInterface$is } from "../../../../../../../interface-contracts.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function SyncMap$Load$Named___go_module$ModeAwareCacheKey$PointerTo_Named___go_module$ResolvedModule($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined, $argument1: ModeAwareCacheKey__from___go_module): [
    tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return $argument0;
    }, ($argument0: ModeAwareCacheKey__from___go_module): GoInterface | undefined => {
        return new GoInterfaceAdapter(ModeAwareCacheKey__from___go_module.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named___go_module$ResolvedModule.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named___go_module$moduleResolutionCacheKey$PointerTo_Named___go_module$ResolvedModule($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<moduleResolutionCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined, $argument1: moduleResolutionCacheKey__from___go_module): [
    tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<moduleResolutionCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return $argument0;
    }, ($argument0: moduleResolutionCacheKey__from___go_module): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named___go_module$moduleResolutionCacheKey(moduleResolutionCacheKey__from___go_module.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named___go_module$ResolvedModule.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named___go_module$typeRefDirectiveResolutionCacheKey$PointerTo_Named___go_module$ResolvedTypeReferenceDirective($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<typeRefDirectiveResolutionCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>> | undefined, $argument1: typeRefDirectiveResolutionCacheKey__from___go_module): [
    tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<typeRefDirectiveResolutionCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined): tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined => {
        return $argument0;
    }, ($argument0: typeRefDirectiveResolutionCacheKey__from___go_module): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named___go_module$typeRefDirectiveResolutionCacheKey(typeRefDirectiveResolutionCacheKey__from___go_module.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named___go_module$ResolvedTypeReferenceDirective.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_ls$KeywordCompletionFilters$SliceOf_PointerTo_Named_lsproto$CompletionItem($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<KeywordCompletionFilters__from_ls, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>> | undefined, $argument1: KeywordCompletionFilters__from_ls): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>,
    bool
] {
    return SyncMap__from_collections.Load$kernel<KeywordCompletionFilters__from_ls, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> => {
        return $argument0;
    }, ($argument0: KeywordCompletionFilters__from_ls): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_ls$KeywordCompletionFilters($argument0);
    }, ($argument0: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> => {
        return (($value: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> => {
            if (!$goInterfaceAdapter$SliceOf_PointerTo_Named_lsproto$CompletionItem.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>();
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$Named_incremental$FileEmitKind($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, FileEmitKind__from_incremental>> | undefined, $argument1: Path__from_tspath): [
    FileEmitKind__from_incremental,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, FileEmitKind__from_incremental>($argument0, ($argument0: FileEmitKind__from_incremental): FileEmitKind__from_incremental => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): FileEmitKind__from_incremental => {
        return (($value: GoInterfaceValue | undefined): FileEmitKind__from_incremental => {
            if (!$goInterfaceAdapter$Named_incremental$FileEmitKind.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): FileEmitKind__from_incremental => {
        return 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$Named_project$FileHandle($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, FileHandle__from_project | undefined>> | undefined, $argument1: Path__from_tspath): [
    FileHandle__from_project | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, FileHandle__from_project | undefined>($argument0, ($argument0: FileHandle__from_project | undefined): FileHandle__from_project | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): FileHandle__from_project | undefined => {
        return (($value: GoInterfaceValue | undefined): FileHandle__from_project | undefined => {
            if (!FileHandle$is__from_project($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value;
        })($argument0);
    }, (): FileHandle__from_project | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$Named_time$Duration($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time.Duration>> | undefined, $argument1: Path__from_tspath): [
    time.Duration,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, time.Duration>($argument0, ($argument0: time.Duration): time.Duration => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): time.Duration => {
        return (($value: GoInterfaceValue | undefined): time.Duration => {
            if (!$goInterfaceAdapter$Named_time$Duration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): time.Duration => {
        return named_time.TimeDurationValueOperations.$wrap(0n);
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$Named_time$Time($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time.Time>> | undefined, $argument1: Path__from_tspath): [
    time.Time,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, time.Time>($argument0, ($argument0: time.Time): time.Time => {
        return named_time.TimeOperations.$copy($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): time.Time => {
        return (($value: GoInterfaceValue | undefined): time.Time => {
            if (!$goInterfaceAdapter$Named_time$Time.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return named_time.TimeOperations.$copy($value.$go$value);
        })($argument0);
    }, (): time.Time => {
        return named_time.TimeOperations.$zero();
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_build$BuildTask($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: BuildTask__from_build;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: BuildTask__from_build;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: BuildTask__from_build;
    } | undefined>($argument0, ($argument0: {
        value: BuildTask__from_build;
    } | undefined): {
        value: BuildTask__from_build;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: BuildTask__from_build;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: BuildTask__from_build;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_build$BuildTask.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: BuildTask__from_build;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>> | undefined, $argument1: Path__from_tspath): [
    tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$SetOf_Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>> | undefined, $argument1: Path__from_tspath): [
    tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$SyncSetOf_string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_compiler$libResolution($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: libResolution__from_compiler;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: libResolution__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: libResolution__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: libResolution__from_compiler;
    } | undefined): {
        value: libResolution__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: libResolution__from_compiler;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: libResolution__from_compiler;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$libResolution.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: libResolution__from_compiler;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_compiler$parseTaskData($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: parseTaskData__from_compiler;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: parseTaskData__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: parseTaskData__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: parseTaskData__from_compiler;
    } | undefined): {
        value: parseTaskData__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: parseTaskData__from_compiler;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: parseTaskData__from_compiler;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$parseTaskData.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: parseTaskData__from_compiler;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: cachedSourceFile__from_execute;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: cachedSourceFile__from_execute;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: cachedSourceFile__from_execute;
    } | undefined>($argument0, ($argument0: {
        value: cachedSourceFile__from_execute;
    } | undefined): {
        value: cachedSourceFile__from_execute;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: cachedSourceFile__from_execute;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: cachedSourceFile__from_execute;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_execute$cachedSourceFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: cachedSourceFile__from_execute;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined): {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: FileInfo__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: FileInfo__from_incremental;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: FileInfo__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: FileInfo__from_incremental;
    } | undefined): {
        value: FileInfo__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: FileInfo__from_incremental;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: FileInfo__from_incremental;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_incremental$FileInfo.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: FileInfo__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: emitSignature__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: emitSignature__from_incremental;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: emitSignature__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: emitSignature__from_incremental;
    } | undefined): {
        value: emitSignature__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: emitSignature__from_incremental;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: emitSignature__from_incremental;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_incremental$emitSignature.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: emitSignature__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitUpdate($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: emitUpdate__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: emitUpdate__from_incremental;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: emitUpdate__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: emitUpdate__from_incremental;
    } | undefined): {
        value: emitUpdate__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: emitUpdate__from_incremental;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: emitUpdate__from_incremental;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_incremental$emitUpdate.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: emitUpdate__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: updatedSignature__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: updatedSignature__from_incremental;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: updatedSignature__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: updatedSignature__from_incremental;
    } | undefined): {
        value: updatedSignature__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: updatedSignature__from_incremental;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: updatedSignature__from_incremental;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_incremental$updatedSignature.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: updatedSignature__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_packagejson$InfoCacheEntry($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: InfoCacheEntry__from_packagejson;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: InfoCacheEntry__from_packagejson;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: InfoCacheEntry__from_packagejson;
    } | undefined>($argument0, ($argument0: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: InfoCacheEntry__from_packagejson;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_packagejson$InfoCacheEntry.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: KnownDirectoryLink__from_symlinks;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined>($argument0, ($argument0: {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined): {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: KnownDirectoryLink__from_symlinks;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_symlinks$KnownDirectoryLink.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>> | undefined, $argument1: Path__from_tspath): [
    tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: SourceOutputAndProjectReference__from_tsoptions;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined>($argument0, ($argument0: {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: SourceOutputAndProjectReference__from_tsoptions;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_tsoptions$SourceOutputAndProjectReference.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$SliceOf_PointerTo_Named_ast$Diagnostic($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>> | undefined, $argument1: Path__from_tspath): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return (($value: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            if (!$goInterfaceAdapter$SliceOf_PointerTo_Named_ast$Diagnostic.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }, $argument1);
}
export function SyncMap$Load$Named_tspath$Path$string($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, $argument1: Path__from_tspath): [
    gostring,
    bool
] {
    return SyncMap__from_collections.Load$kernel<Path__from_tspath, gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): gostring => {
        return (($value: GoInterfaceValue | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): gostring => {
        return "";
    }, $argument1);
}
export function SyncMap$Load$PointerTo_Named_ast$SourceFile$SliceOf_PointerTo_Named_ast$Diagnostic($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>,
    bool
] {
    return SyncMap__from_collections.Load$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile($argument0);
    }, ($argument0: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return (($value: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            if (!$goInterfaceAdapter$SliceOf_PointerTo_Named_ast$Diagnostic.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }, $argument1);
}
export function SyncMap$Load$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_ast$Diagnostic($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<{
    value: FileIncludeReason__from_compiler;
} | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>> | undefined, $argument1: {
    value: FileIncludeReason__from_compiler;
} | undefined): [
    tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<{
        value: FileIncludeReason__from_compiler;
    } | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: FileIncludeReason__from_compiler;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$Diagnostic.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$referenceFileLocation($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<{
    value: FileIncludeReason__from_compiler;
} | undefined, {
    value: referenceFileLocation__from_compiler;
} | undefined>> | undefined, $argument1: {
    value: FileIncludeReason__from_compiler;
} | undefined): [
    {
        value: referenceFileLocation__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<{
        value: FileIncludeReason__from_compiler;
    } | undefined, {
        value: referenceFileLocation__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: referenceFileLocation__from_compiler;
    } | undefined): {
        value: referenceFileLocation__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: FileIncludeReason__from_compiler;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: referenceFileLocation__from_compiler;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: referenceFileLocation__from_compiler;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$referenceFileLocation.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: referenceFileLocation__from_compiler;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$string$Named_fs$FileInfo($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined>> | undefined, $argument1: gostring): [
    $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<gostring, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined>($argument0, ($argument0: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined => {
        return $argument0;
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, ($argument0: GoInterfaceValue | undefined): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined => {
        return (($value: GoInterfaceValue | undefined): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined => {
            if (!GoInterface$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value;
        })($argument0);
    }, (): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$string$Named_vfs$Entries($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, Entries__from_vfs>> | undefined, $argument1: gostring): [
    Entries__from_vfs,
    bool
] {
    return SyncMap__from_collections.Load$kernel<gostring, Entries__from_vfs>($argument0, ($argument0: Entries__from_vfs): Entries__from_vfs => {
        return Entries__from_vfs.$copy($argument0);
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, ($argument0: GoInterfaceValue | undefined): Entries__from_vfs => {
        return (($value: GoInterfaceValue | undefined): Entries__from_vfs => {
            if (!$goInterfaceAdapter$Named_vfs$Entries.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return Entries__from_vfs.$copy($value.$go$value);
        })($argument0);
    }, (): Entries__from_vfs => {
        return Entries__from_vfs.$zero();
    }, $argument1);
}
export function SyncMap$Load$string$PointerTo_Named_ata$CachedTyping($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, {
    value: CachedTyping__from_ata;
} | undefined>> | undefined, $argument1: gostring): [
    {
        value: CachedTyping__from_ata;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<gostring, {
        value: CachedTyping__from_ata;
    } | undefined>($argument0, ($argument0: {
        value: CachedTyping__from_ata;
    } | undefined): {
        value: CachedTyping__from_ata;
    } | undefined => {
        return $argument0;
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: CachedTyping__from_ata;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: CachedTyping__from_ata;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ata$CachedTyping.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: CachedTyping__from_ata;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$string$PointerTo_Named_compiler$LibFile($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, {
    value: LibFile__from_compiler;
} | undefined>> | undefined, $argument1: gostring): [
    {
        value: LibFile__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.Load$kernel<gostring, {
        value: LibFile__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: LibFile__from_compiler;
    } | undefined): {
        value: LibFile__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: LibFile__from_compiler;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: LibFile__from_compiler;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$LibFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: LibFile__from_compiler;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Load$string$bool($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, bool>> | undefined, $argument1: gostring): [
    bool,
    bool
] {
    return SyncMap__from_collections.Load$kernel<gostring, bool>($argument0, ($argument0: bool): bool => {
        return $argument0;
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, ($argument0: GoInterfaceValue | undefined): bool => {
        return (($value: GoInterfaceValue | undefined): bool => {
            if (!$goInterfaceAdapter$bool.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): bool => {
        return false;
    }, $argument1);
}
export function SyncMap$Load$string$string($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, gostring>> | undefined, $argument1: gostring): [
    gostring,
    bool
] {
    return SyncMap__from_collections.Load$kernel<gostring, gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, ($argument0: GoInterfaceValue | undefined): gostring => {
        return (($value: GoInterfaceValue | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): gostring => {
        return "";
    }, $argument1);
}
