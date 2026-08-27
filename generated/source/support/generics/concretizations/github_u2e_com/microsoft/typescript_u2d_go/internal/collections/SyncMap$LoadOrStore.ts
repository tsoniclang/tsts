import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import type { FileIncludeReason as FileIncludeReason__from_compiler, referenceFileLocation as referenceFileLocation__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileInclude.js";
import type { LibFile as LibFile__from_compiler, libResolution as libResolution__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileloader.js";
import type { parseTaskData as parseTaskData__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/filesparser.js";
import type { projectReferenceParseTask as projectReferenceParseTask__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/projectreferenceparser.js";
import type { BuildTask as BuildTask__from_build } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/build/buildtask.js";
import type { updatedSignature as updatedSignature__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/affectedfileshandler.js";
import type { extendedConfigCacheEntry as extendedConfigCacheEntry__from_tsc } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/tsc/extendedconfigcache.js";
import type { failedAmbientModuleLookupSource as failedAmbientModuleLookupSource__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { moduleResolutionCacheKey$Storage as moduleResolutionCacheKey__from___go_module$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/cache.js";
import type { ModeAwareCacheKey$Storage as ModeAwareCacheKey__from___go_module$Storage, ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/types.js";
import type { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/cache.js";
import type { FileHandle as FileHandle__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as time from "@gotots/gostdlib/time.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import { moduleResolutionCacheKey as moduleResolutionCacheKey__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/cache.js";
import { ModeAwareCacheKey as ModeAwareCacheKey__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/types.js";
import { FileHandle$contract as FileHandle$contract__from_project, FileHandle$is as FileHandle$is__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import { memoizedDiskFile as memoizedDiskFile__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
import { $goInterfaceAdapter$Named___go_module$ModeAwareCacheKey, $goInterfaceAdapter$Named___go_module$moduleResolutionCacheKey, $goInterfaceAdapter$Named_project$memoizedDiskFile, $goInterfaceAdapter$Named_time$Time, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named___go_module$ResolvedModule, $goInterfaceAdapter$PointerTo_Named_ast$Diagnostic, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_autoimport$failedAmbientModuleLookupSource, $goInterfaceAdapter$PointerTo_Named_build$BuildTask, $goInterfaceAdapter$PointerTo_Named_collections$SyncMapOf_Named___go_module$ModeAwareCacheKey_And_PointerTo_Named___go_module$ResolvedModule, $goInterfaceAdapter$PointerTo_Named_collections$SyncSetOf_string, $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason, $goInterfaceAdapter$PointerTo_Named_compiler$LibFile, $goInterfaceAdapter$PointerTo_Named_compiler$libResolution, $goInterfaceAdapter$PointerTo_Named_compiler$parseTaskData, $goInterfaceAdapter$PointerTo_Named_compiler$projectReferenceParseTask, $goInterfaceAdapter$PointerTo_Named_compiler$referenceFileLocation, $goInterfaceAdapter$PointerTo_Named_incremental$updatedSignature, $goInterfaceAdapter$PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceAdapter$PointerTo_Named_tsc$extendedConfigCacheEntry, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$SliceOf_PointerTo_Named_ast$Diagnostic as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function SyncMap$LoadOrStore$Named___go_module$ModeAwareCacheKey$PointerTo_Named___go_module$ResolvedModule($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined, $argument1: ModeAwareCacheKey__from___go_module, $argument2: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined): [
    tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named___go_module$ResolvedModule($argument0);
    }, ($argument0: ModeAwareCacheKey__from___go_module): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named___go_module$ModeAwareCacheKey(ModeAwareCacheKey__from___go_module.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named___go_module$ResolvedModule.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named___go_module$moduleResolutionCacheKey$PointerTo_Named___go_module$ResolvedModule($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<moduleResolutionCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined, $argument1: moduleResolutionCacheKey__from___go_module, $argument2: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined): [
    tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<moduleResolutionCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named___go_module$ResolvedModule($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$Named_project$FileHandle($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, FileHandle__from_project | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: FileHandle__from_project | undefined): [
    FileHandle__from_project | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, FileHandle__from_project | undefined>($argument0, ($argument0: FileHandle__from_project | undefined): FileHandle__from_project | undefined => {
        return $argument0;
    }, ($argument0: FileHandle__from_project | undefined): GoInterface | undefined => {
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$Named_project$memoizedDiskFile($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, memoizedDiskFile__from_project>> | undefined, $argument1: Path__from_tspath, $argument2: memoizedDiskFile__from_project): [
    memoizedDiskFile__from_project,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, memoizedDiskFile__from_project>($argument0, ($argument0: memoizedDiskFile__from_project): memoizedDiskFile__from_project => {
        return $argument0;
    }, ($argument0: memoizedDiskFile__from_project): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_project$memoizedDiskFile($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): memoizedDiskFile__from_project => {
        return (($value: GoInterfaceValue | undefined): memoizedDiskFile__from_project => {
            if (!$goInterfaceAdapter$Named_project$memoizedDiskFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): memoizedDiskFile__from_project => {
        return new memoizedDiskFile__from_project(void 0);
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$Named_time$Time($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time.Time>> | undefined, $argument1: Path__from_tspath, $argument2: time.Time): [
    time.Time,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, time.Time>($argument0, ($argument0: time.Time): time.Time => {
        return named_time.TimeOperations.$copy($argument0);
    }, ($argument0: time.Time): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_time$Time(named_time.TimeOperations.$copy($argument0));
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_autoimport$failedAmbientModuleLookupSource($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: failedAmbientModuleLookupSource__from_autoimport;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: failedAmbientModuleLookupSource__from_autoimport;
} | undefined): [
    {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined>($argument0, ($argument0: {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined): {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_autoimport$failedAmbientModuleLookupSource($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
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
    }, (): {
        value: failedAmbientModuleLookupSource__from_autoimport;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_build$BuildTask($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: BuildTask__from_build;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: BuildTask__from_build;
} | undefined): [
    {
        value: BuildTask__from_build;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, {
        value: BuildTask__from_build;
    } | undefined>($argument0, ($argument0: {
        value: BuildTask__from_build;
    } | undefined): {
        value: BuildTask__from_build;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: BuildTask__from_build;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_build$BuildTask($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named___go_module$ModeAwareCacheKey_And_PointerTo_Named___go_module$ResolvedModule($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined): [
    tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_collections$SyncMapOf_Named___go_module$ModeAwareCacheKey_And_PointerTo_Named___go_module$ResolvedModule($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$SyncMapOf_Named___go_module$ModeAwareCacheKey_And_PointerTo_Named___go_module$ResolvedModule.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<ModeAwareCacheKey__from___go_module, tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined): [
    tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_collections$SyncSetOf_string($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$libResolution($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: libResolution__from_compiler;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: libResolution__from_compiler;
} | undefined): [
    {
        value: libResolution__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, {
        value: libResolution__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: libResolution__from_compiler;
    } | undefined): {
        value: libResolution__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: libResolution__from_compiler;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_compiler$libResolution($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$parseTaskData($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: parseTaskData__from_compiler;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: parseTaskData__from_compiler;
} | undefined): [
    {
        value: parseTaskData__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, {
        value: parseTaskData__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: parseTaskData__from_compiler;
    } | undefined): {
        value: parseTaskData__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: parseTaskData__from_compiler;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_compiler$parseTaskData($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$projectReferenceParseTask($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: projectReferenceParseTask__from_compiler;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: projectReferenceParseTask__from_compiler;
} | undefined): [
    {
        value: projectReferenceParseTask__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, {
        value: projectReferenceParseTask__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: projectReferenceParseTask__from_compiler;
    } | undefined): {
        value: projectReferenceParseTask__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: projectReferenceParseTask__from_compiler;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_compiler$projectReferenceParseTask($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: projectReferenceParseTask__from_compiler;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: projectReferenceParseTask__from_compiler;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$projectReferenceParseTask.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: projectReferenceParseTask__from_compiler;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: updatedSignature__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: updatedSignature__from_incremental;
} | undefined): [
    {
        value: updatedSignature__from_incremental;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, {
        value: updatedSignature__from_incremental;
    } | undefined>($argument0, ($argument0: {
        value: updatedSignature__from_incremental;
    } | undefined): {
        value: updatedSignature__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: updatedSignature__from_incremental;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_incremental$updatedSignature($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_packagejson$InfoCacheEntry($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: InfoCacheEntry__from_packagejson;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: InfoCacheEntry__from_packagejson;
} | undefined): [
    {
        value: InfoCacheEntry__from_packagejson;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, {
        value: InfoCacheEntry__from_packagejson;
    } | undefined>($argument0, ($argument0: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_packagejson$InfoCacheEntry($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_tsc$extendedConfigCacheEntry($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: extendedConfigCacheEntry__from_tsc;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: extendedConfigCacheEntry__from_tsc;
} | undefined): [
    {
        value: extendedConfigCacheEntry__from_tsc;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, {
        value: extendedConfigCacheEntry__from_tsc;
    } | undefined>($argument0, ($argument0: {
        value: extendedConfigCacheEntry__from_tsc;
    } | undefined): {
        value: extendedConfigCacheEntry__from_tsc;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: extendedConfigCacheEntry__from_tsc;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_tsc$extendedConfigCacheEntry($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: extendedConfigCacheEntry__from_tsc;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: extendedConfigCacheEntry__from_tsc;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_tsc$extendedConfigCacheEntry.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: extendedConfigCacheEntry__from_tsc;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$SliceOf_PointerTo_Named_ast$Diagnostic($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>> | undefined, $argument1: Path__from_tspath, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return (($value: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$Named_tspath$Path$bool($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, bool>> | undefined, $argument1: Path__from_tspath, $argument2: bool): [
    bool,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<Path__from_tspath, bool>($argument0, ($argument0: bool): bool => {
        return $argument0;
    }, ($argument0: bool): GoInterface | undefined => {
        return new $goInterfaceAdapter$bool($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): bool => {
        return (($value: GoInterfaceValue | undefined): bool => {
            if (!$goInterfaceAdapter$bool.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): bool => {
        return false;
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$PointerTo_Named_ast$SourceFile$SliceOf_PointerTo_Named_ast$Diagnostic($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile($argument0);
    }, ($argument0: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return (($value: GoInterfaceValue | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_ast$Diagnostic($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<{
    value: FileIncludeReason__from_compiler;
} | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>> | undefined, $argument1: {
    value: FileIncludeReason__from_compiler;
} | undefined, $argument2: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): [
    tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<{
        value: FileIncludeReason__from_compiler;
    } | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ast$Diagnostic($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$referenceFileLocation($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<{
    value: FileIncludeReason__from_compiler;
} | undefined, {
    value: referenceFileLocation__from_compiler;
} | undefined>> | undefined, $argument1: {
    value: FileIncludeReason__from_compiler;
} | undefined, $argument2: {
    value: referenceFileLocation__from_compiler;
} | undefined): [
    {
        value: referenceFileLocation__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<{
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
        value: referenceFileLocation__from_compiler;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_compiler$referenceFileLocation($argument0);
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
    }, $argument1, $argument2);
}
export function SyncMap$LoadOrStore$string$PointerTo_Named_compiler$LibFile($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<gostring, {
    value: LibFile__from_compiler;
} | undefined>> | undefined, $argument1: gostring, $argument2: {
    value: LibFile__from_compiler;
} | undefined): [
    {
        value: LibFile__from_compiler;
    } | undefined,
    bool
] {
    return SyncMap__from_collections.LoadOrStore$kernel<gostring, {
        value: LibFile__from_compiler;
    } | undefined>($argument0, ($argument0: {
        value: LibFile__from_compiler;
    } | undefined): {
        value: LibFile__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: LibFile__from_compiler;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_compiler$LibFile($argument0);
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
    }, $argument1, $argument2);
}
