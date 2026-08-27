import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { updatedSignature as updatedSignature__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/affectedfileshandler.js";
import type { DiagnosticsOrBuildInfoDiagnosticsWithFileName as DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental, FileEmitKind as FileEmitKind__from_incremental, FileInfo as FileInfo__from_incremental, emitSignature as emitSignature__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/snapshot.js";
import type { cachedSourceFile as cachedSourceFile__from_execute } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/watcher.js";
import type { failedAmbientModuleLookupSource as failedAmbientModuleLookupSource__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { CachedTyping as CachedTyping__from_ata } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ata/ata.js";
import type { ExtendedConfigCacheEntry as ExtendedConfigCacheEntry__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/extendedconfigcache.js";
import type { ownerCacheEntry as ownerCacheEntry__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ownercache.js";
import type { ParseCacheKey$Storage as ParseCacheKey__from_project$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/parsecache.js";
import type { refCountCacheEntry as refCountCacheEntry__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/refcountcache.js";
import type { KnownDirectoryLink as KnownDirectoryLink__from_symlinks } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/symlinks/knownsymlinks.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import { ParseCacheKey as ParseCacheKey__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/parsecache.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goInterfaceAdapter$Named_incremental$FileEmitKind, $goInterfaceAdapter$Named_project$ParseCacheKey, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_ata$CachedTyping, $goInterfaceAdapter$PointerTo_Named_autoimport$failedAmbientModuleLookupSource, $goInterfaceAdapter$PointerTo_Named_collections$SetOf_Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_execute$cachedSourceFile, $goInterfaceAdapter$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, $goInterfaceAdapter$PointerTo_Named_incremental$FileInfo, $goInterfaceAdapter$PointerTo_Named_incremental$emitSignature, $goInterfaceAdapter$PointerTo_Named_incremental$updatedSignature, $goInterfaceAdapter$PointerTo_Named_project$ownerCacheEntryOf_PointerTo_Named_project$ExtendedConfigCacheEntry, $goInterfaceAdapter$PointerTo_Named_symlinks$KnownDirectoryLink, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_project$refCountCacheEntryOf_PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncMap$Range$Named_project$ParseCacheKey$PointerTo_Named_project$refCountCacheEntryOf_PointerTo_Named_ast$SourceFile($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ParseCacheKey__from_project, {
    value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
} | undefined>> | undefined, $argument1: (($0: ParseCacheKey__from_project, $1: {
    value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<ParseCacheKey__from_project, {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined>($argument0, ($argument0: {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined): {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: ParseCacheKey__from_project): ParseCacheKey__from_project => {
        return ParseCacheKey__from_project.$copy($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
        } | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): ParseCacheKey__from_project => {
        return (($value: GoInterfaceValue | undefined): ParseCacheKey__from_project => {
            if (!$goInterfaceAdapter$Named_project$ParseCacheKey.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return ParseCacheKey__from_project.$copy($value.$go$value);
        })($argument0);
    }, (): ParseCacheKey__from_project => {
        return ParseCacheKey__from_project.$zero();
    }, (): {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$Named_incremental$FileEmitKind($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, FileEmitKind__from_incremental>> | undefined, $argument1: (($0: Path__from_tspath, $1: FileEmitKind__from_incremental) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, FileEmitKind__from_incremental>($argument0, ($argument0: FileEmitKind__from_incremental): FileEmitKind__from_incremental => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): FileEmitKind__from_incremental => {
        return (($value: GoInterfaceValue | undefined): FileEmitKind__from_incremental => {
            if (!$goInterfaceAdapter$Named_incremental$FileEmitKind.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): FileEmitKind__from_incremental => {
        return 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_autoimport$failedAmbientModuleLookupSource($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: failedAmbientModuleLookupSource__from_autoimport;
} | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: {
    value: failedAmbientModuleLookupSource__from_autoimport;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined>($argument0, ($argument0: {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined): {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: failedAmbientModuleLookupSource__from_autoimport;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_autoimport$failedAmbientModuleLookupSource.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$SetOf_Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: cachedSourceFile__from_execute;
} | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: {
    value: cachedSourceFile__from_execute;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, {
        value: cachedSourceFile__from_execute;
    } | undefined>($argument0, ($argument0: {
        value: cachedSourceFile__from_execute;
    } | undefined): {
        value: cachedSourceFile__from_execute;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
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
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: cachedSourceFile__from_execute;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
} | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined): {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
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
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$FileInfo($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: FileInfo__from_incremental;
} | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: {
    value: FileInfo__from_incremental;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, {
        value: FileInfo__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: FileInfo__from_incremental;
    } | undefined): {
        value: FileInfo__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
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
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: FileInfo__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$emitSignature($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: emitSignature__from_incremental;
} | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: {
    value: emitSignature__from_incremental;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, {
        value: emitSignature__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: emitSignature__from_incremental;
    } | undefined): {
        value: emitSignature__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
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
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: emitSignature__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: updatedSignature__from_incremental;
} | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: {
    value: updatedSignature__from_incremental;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, {
        value: updatedSignature__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: updatedSignature__from_incremental;
    } | undefined): {
        value: updatedSignature__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
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
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: updatedSignature__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$ownerCacheEntryOf_PointerTo_Named_project$ExtendedConfigCacheEntry($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: ownerCacheEntry__from_project<{
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined>;
} | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: {
    value: ownerCacheEntry__from_project<{
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined>;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined>($argument0, ($argument0: {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined): {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: ownerCacheEntry__from_project<{
                value: ExtendedConfigCacheEntry__from_project;
            } | undefined>;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_project$ownerCacheEntryOf_PointerTo_Named_project$ExtendedConfigCacheEntry.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_symlinks$KnownDirectoryLink($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: KnownDirectoryLink__from_symlinks;
} | undefined>> | undefined, $argument1: (($0: Path__from_tspath, $1: {
    value: KnownDirectoryLink__from_symlinks;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined>($argument0, ($argument0: {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined): {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
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
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: KnownDirectoryLink__from_symlinks;
    } | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$string($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, $argument1: (($0: Path__from_tspath, $1: gostring) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<Path__from_tspath, gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): gostring => {
        return (($value: GoInterfaceValue | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): gostring => {
        return "";
    }, $argument1);
}
export function SyncMap$Range$string$PointerTo_Named_ata$CachedTyping($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, {
    value: CachedTyping__from_ata;
} | undefined>> | undefined, $argument1: (($0: gostring, $1: {
    value: CachedTyping__from_ata;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_collections.Range$kernel<gostring, {
        value: CachedTyping__from_ata;
    } | undefined>($argument0, ($argument0: {
        value: CachedTyping__from_ata;
    } | undefined): {
        value: CachedTyping__from_ata;
    } | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
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
    }, ($argument0: GoInterfaceValue | undefined): gostring => {
        return (($value: GoInterfaceValue | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): gostring => {
        return "";
    }, (): {
        value: CachedTyping__from_ata;
    } | undefined => {
        return void 0;
    }, $argument1);
}
