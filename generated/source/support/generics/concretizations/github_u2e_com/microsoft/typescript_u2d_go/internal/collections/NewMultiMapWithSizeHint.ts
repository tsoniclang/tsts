import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { MultiMap as MultiMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/multimap.js";
import type { ModuleID as ModuleID__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { existingImport as existingImport__from_autoimport, existingImport$Storage as existingImport__from_autoimport$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { NewMultiMapWithSizeHint$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/multimap.js";
import { $goMap$MapOf_Named_autoimport$ModuleID_To_SliceOf_Named_autoimport$existingImport as GoMap } from "../../../../../../../maps.js";
export function NewMultiMapWithSizeHint$Named_autoimport$ModuleID$Named_autoimport$existingImport($argument0: int): tsonicTypeScriptRuntime.Location<MultiMap__from_collections<ModuleID__from_autoimport, existingImport__from_autoimport>> | undefined {
    return NewMultiMapWithSizeHint$kernel<ModuleID__from_autoimport, existingImport__from_autoimport>(($argument0: RuntimeSlice<existingImport__from_autoimport$Storage>, $argument1: int): GoMapValue<ModuleID__from_autoimport, RuntimeSlice<existingImport__from_autoimport$Storage>> => {
        return GoMap.make($argument1, []);
    }, $argument0);
}
