import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncSet$Keys$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): iter.Seq<Path__from_tspath> {
    return SyncSet__from_collections.Keys$kernel<Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    });
}
export function SyncSet$Keys$string($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined): iter.Seq<gostring> {
    return SyncSet__from_collections.Keys$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): gostring => {
        return (($value: GoInterfaceValue | undefined): gostring => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): gostring => {
        return "";
    });
}
