import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncSet$ToSlice$string($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined): RuntimeSlice<gostring> {
    return SyncSet__from_collections.ToSlice$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): gostring => {
        return (($value: GoInterfaceValue | undefined): gostring => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    });
}
