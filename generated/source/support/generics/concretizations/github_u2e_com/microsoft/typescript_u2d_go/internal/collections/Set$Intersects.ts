import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
export function Set$Intersects$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): bool {
    return Set__from_collections.Intersects$kernel<gostring>($argument0, $argument1);
}
