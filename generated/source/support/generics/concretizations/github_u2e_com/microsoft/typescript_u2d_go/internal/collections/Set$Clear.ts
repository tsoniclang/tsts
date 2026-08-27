import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { CacheHashKey as CacheHashKey__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
export function Set$Clear$Named_checker$CacheHashKey($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<CacheHashKey__from_checker>> | undefined): void {
    return Set__from_collections.Clear$kernel<CacheHashKey__from_checker>($argument0, ($argument0: GoMapValue<CacheHashKey__from_checker, GoEmptyStruct>): void => {
        $argument0.clear();
    });
}
export function Set$Clear$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): void {
    return Set__from_collections.Clear$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>): void => {
        $argument0.clear();
    });
}
export function Set$Clear$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): void {
    return Set__from_collections.Clear$kernel<gostring>($argument0, ($argument0: GoMapValue<gostring, GoEmptyStruct>): void => {
        $argument0.clear();
    });
}
