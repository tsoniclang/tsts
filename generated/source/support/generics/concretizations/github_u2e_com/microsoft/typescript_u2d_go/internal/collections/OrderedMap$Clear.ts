import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { goSliceClear } from "@gotots/runtime/slice.js";
export function OrderedMap$Clear$string$MapOf_string_To_PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>> | undefined): void {
    return OrderedMap__from_collections.Clear$kernel<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>($argument0, ($argument0: GoMapValue<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>): void => {
        $argument0.clear();
    }, ($argument0: RuntimeSlice<gostring>): void => {
        goSliceClear($argument0, "");
    });
}
