import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedSet as OrderedSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_set.js";
export function OrderedSet$Size$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined): int {
    return OrderedSet__from_collections.Size$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): int => {
        return $argument0.length;
    });
}
export function OrderedSet$Size$string($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<gostring>> | undefined): int {
    return OrderedSet__from_collections.Size$kernel<gostring>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
