import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { DiagnosticsOrBuildInfoDiagnosticsWithFileName as DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental, FileEmitKind as FileEmitKind__from_incremental, emitSignature as emitSignature__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/snapshot.js";
import type { cachedSourceFile as cachedSourceFile__from_execute } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/watcher.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import { $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function SyncMap$Delete$Named_tspath$Path$Named_incremental$FileEmitKind($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, FileEmitKind__from_incremental>> | undefined, $argument1: Path__from_tspath): void {
    return SyncMap__from_collections.Delete$kernel<Path__from_tspath, FileEmitKind__from_incremental>($argument0, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
export function SyncMap$Delete$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: cachedSourceFile__from_execute;
} | undefined>> | undefined, $argument1: Path__from_tspath): void {
    return SyncMap__from_collections.Delete$kernel<Path__from_tspath, {
        value: cachedSourceFile__from_execute;
    } | undefined>($argument0, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
export function SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath): void {
    return SyncMap__from_collections.Delete$kernel<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined>($argument0, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
export function SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$emitSignature($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: emitSignature__from_incremental;
} | undefined>> | undefined, $argument1: Path__from_tspath): void {
    return SyncMap__from_collections.Delete$kernel<Path__from_tspath, {
        value: emitSignature__from_incremental;
    } | undefined>($argument0, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
