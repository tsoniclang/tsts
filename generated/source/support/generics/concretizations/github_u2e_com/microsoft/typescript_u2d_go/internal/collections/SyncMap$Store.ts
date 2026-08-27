import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { emitUpdate as emitUpdate__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/emitfileshandler.js";
import type { DiagnosticsOrBuildInfoDiagnosticsWithFileName as DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental, FileEmitKind as FileEmitKind__from_incremental, FileInfo as FileInfo__from_incremental, emitSignature as emitSignature__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/snapshot.js";
import type { cachedSourceFile as cachedSourceFile__from_execute } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/watcher.js";
import type { KeywordCompletionFilters as KeywordCompletionFilters__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
import type { CompletionItem as CompletionItem__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { typeRefDirectiveResolutionCacheKey$Storage as typeRefDirectiveResolutionCacheKey__from___go_module$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/cache.js";
import type { ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/types.js";
import type { CachedTyping as CachedTyping__from_ata } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ata/ata.js";
import type { KnownDirectoryLink as KnownDirectoryLink__from_symlinks } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/symlinks/knownsymlinks.js";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions, SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsedcommandline.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { Entries$Storage as Entries__from_vfs$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfs.js";
import type { $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as scalars from "@gotots/gostdlib/internal/scalars.js";
import type * as time from "@gotots/gostdlib/time.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import { typeRefDirectiveResolutionCacheKey as typeRefDirectiveResolutionCacheKey__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/cache.js";
import { Entries as Entries__from_vfs } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfs.js";
import { $goInterfaceAdapter$Named___go_module$typeRefDirectiveResolutionCacheKey, $goInterfaceAdapter$Named_incremental$FileEmitKind, $goInterfaceAdapter$Named_ls$KeywordCompletionFilters, $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$Named_time$Time, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$Named_vfs$Entries, $goInterfaceAdapter$PointerTo_Named___go_module$ResolvedTypeReferenceDirective, $goInterfaceAdapter$PointerTo_Named_ata$CachedTyping, $goInterfaceAdapter$PointerTo_Named_collections$SetOf_Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_execute$cachedSourceFile, $goInterfaceAdapter$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, $goInterfaceAdapter$PointerTo_Named_incremental$FileInfo, $goInterfaceAdapter$PointerTo_Named_incremental$emitSignature, $goInterfaceAdapter$PointerTo_Named_incremental$emitUpdate, $goInterfaceAdapter$PointerTo_Named_symlinks$KnownDirectoryLink, $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine, $goInterfaceAdapter$PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceAdapter$SliceOf_PointerTo_Named_lsproto$CompletionItem, $goInterfaceAdapter$string, $goInterfaceAdapter$bool as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
export function SyncMap$Store$Named___go_module$typeRefDirectiveResolutionCacheKey$PointerTo_Named___go_module$ResolvedTypeReferenceDirective($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<typeRefDirectiveResolutionCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>> | undefined, $argument1: typeRefDirectiveResolutionCacheKey__from___go_module, $argument2: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined): void {
    return SyncMap__from_collections.Store$kernel<typeRefDirectiveResolutionCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named___go_module$ResolvedTypeReferenceDirective($argument0);
    }, ($argument0: typeRefDirectiveResolutionCacheKey__from___go_module): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named___go_module$typeRefDirectiveResolutionCacheKey(typeRefDirectiveResolutionCacheKey__from___go_module.$copy($argument0));
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_ls$KeywordCompletionFilters$SliceOf_PointerTo_Named_lsproto$CompletionItem($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<KeywordCompletionFilters__from_ls, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>> | undefined, $argument1: KeywordCompletionFilters__from_ls, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>): void {
    return SyncMap__from_collections.Store$kernel<KeywordCompletionFilters__from_ls, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>): GoInterface | undefined => {
        return new $goInterfaceAdapter$SliceOf_PointerTo_Named_lsproto$CompletionItem($argument0);
    }, ($argument0: KeywordCompletionFilters__from_ls): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_ls$KeywordCompletionFilters($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, FileEmitKind__from_incremental>> | undefined, $argument1: Path__from_tspath, $argument2: FileEmitKind__from_incremental): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, FileEmitKind__from_incremental>($argument0, ($argument0: FileEmitKind__from_incremental): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_incremental$FileEmitKind($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$Named_time$Duration($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time.Duration>> | undefined, $argument1: Path__from_tspath, $argument2: time.Duration): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, time.Duration>($argument0, ($argument0: time.Duration): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_time$Duration($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$Named_time$Time($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time.Time>> | undefined, $argument1: Path__from_tspath, $argument2: time.Time): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, time.Time>($argument0, ($argument0: time.Time): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_time$Time(named_time.TimeOperations.$copy($argument0));
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_collections$SetOf_Named_tspath$Path($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: cachedSourceFile__from_execute;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: cachedSourceFile__from_execute;
} | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, {
        value: cachedSourceFile__from_execute;
    } | undefined>($argument0, ($argument0: {
        value: cachedSourceFile__from_execute;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_execute$cachedSourceFile($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
} | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$FileInfo($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: FileInfo__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: FileInfo__from_incremental;
} | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, {
        value: FileInfo__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: FileInfo__from_incremental;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_incremental$FileInfo($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: emitSignature__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: emitSignature__from_incremental;
} | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, {
        value: emitSignature__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: emitSignature__from_incremental;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_incremental$emitSignature($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitUpdate($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: emitUpdate__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: emitUpdate__from_incremental;
} | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, {
        value: emitUpdate__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: emitUpdate__from_incremental;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_incremental$emitUpdate($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: KnownDirectoryLink__from_symlinks;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: KnownDirectoryLink__from_symlinks;
} | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined>($argument0, ($argument0: {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_symlinks$KnownDirectoryLink($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: SourceOutputAndProjectReference__from_tsoptions;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: SourceOutputAndProjectReference__from_tsoptions;
} | undefined): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined>($argument0, ($argument0: {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_tsoptions$SourceOutputAndProjectReference($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$bool($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, bool>> | undefined, $argument1: Path__from_tspath, $argument2: bool): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, bool>($argument0, ($argument0: bool): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$Named_tspath$Path$string($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, $argument1: Path__from_tspath, $argument2: gostring): void {
    return SyncMap__from_collections.Store$kernel<Path__from_tspath, gostring>($argument0, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$string$Named_fs$FileInfo($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined>> | undefined, $argument1: gostring, $argument2: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined): void {
    return SyncMap__from_collections.Store$kernel<gostring, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined>($argument0, ($argument0: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$string$Named_vfs$Entries($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, Entries__from_vfs>> | undefined, $argument1: gostring, $argument2: Entries__from_vfs): void {
    return SyncMap__from_collections.Store$kernel<gostring, Entries__from_vfs>($argument0, ($argument0: Entries__from_vfs): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_vfs$Entries(Entries__from_vfs.$copy($argument0));
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$string$PointerTo_Named_ata$CachedTyping($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, {
    value: CachedTyping__from_ata;
} | undefined>> | undefined, $argument1: gostring, $argument2: {
    value: CachedTyping__from_ata;
} | undefined): void {
    return SyncMap__from_collections.Store$kernel<gostring, {
        value: CachedTyping__from_ata;
    } | undefined>($argument0, ($argument0: {
        value: CachedTyping__from_ata;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ata$CachedTyping($argument0);
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$string$bool($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, bool>> | undefined, $argument1: gostring, $argument2: bool): void {
    return SyncMap__from_collections.Store$kernel<gostring, bool>($argument0, ($argument0: bool): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, $argument1, $argument2);
}
export function SyncMap$Store$string$string($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, gostring>> | undefined, $argument1: gostring, $argument2: gostring): void {
    return SyncMap__from_collections.Store$kernel<gostring, gostring>($argument0, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, $argument1, $argument2);
}
