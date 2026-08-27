import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { libResolution as libResolution__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileloader.js";
import type { DiagnosticsOrBuildInfoDiagnosticsWithFileName as DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental, FileEmitKind as FileEmitKind__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/snapshot.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import { $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncMap$Keys$Named_tspath$Path$Named_incremental$FileEmitKind($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, FileEmitKind__from_incremental>> | undefined): iter.Seq<Path__from_tspath> {
    return SyncMap__from_collections.Keys$kernel<Path__from_tspath, FileEmitKind__from_incremental>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    });
}
export function SyncMap$Keys$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>> | undefined): iter.Seq<Path__from_tspath> {
    return SyncMap__from_collections.Keys$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    });
}
export function SyncMap$Keys$Named_tspath$Path$PointerTo_Named_compiler$libResolution($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: libResolution__from_compiler;
} | undefined>> | undefined): iter.Seq<Path__from_tspath> {
    return SyncMap__from_collections.Keys$kernel<Path__from_tspath, {
        value: libResolution__from_compiler;
    } | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    });
}
export function SyncMap$Keys$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
} | undefined>> | undefined): iter.Seq<Path__from_tspath> {
    return SyncMap__from_collections.Keys$kernel<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName__from_incremental;
    } | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    });
}
