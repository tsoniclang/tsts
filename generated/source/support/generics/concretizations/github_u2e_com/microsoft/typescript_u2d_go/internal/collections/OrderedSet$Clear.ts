import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { OrderedSet as OrderedSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_set.js";
import { goSliceClear } from "@gotots/runtime/slice.js";
export function OrderedSet$Clear$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): void {
    return OrderedSet__from_collections.Clear$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>): void => {
        $argument0.clear();
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): void => {
        goSliceClear($argument0, void 0);
    });
}
export function OrderedSet$Clear$PointerTo_Named_printer$EmitHelper($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<{
    value: EmitHelper__from_printer;
} | undefined>> | undefined): void {
    return OrderedSet__from_collections.Clear$kernel<{
        value: EmitHelper__from_printer;
    } | undefined>($argument0, ($argument0: GoMapValue<{
        value: EmitHelper__from_printer;
    } | undefined, GoEmptyStruct>): void => {
        $argument0.clear();
    }, ($argument0: RuntimeSlice<{
        value: EmitHelper__from_printer;
    } | undefined>): void => {
        goSliceClear($argument0, void 0);
    });
}
