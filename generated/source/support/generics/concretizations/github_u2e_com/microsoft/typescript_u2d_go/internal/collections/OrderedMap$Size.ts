import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { ExportsOrImports as ExportsOrImports__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
import type { JSONValue as JSONValue__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/jsonvalue.js";
import type { memberInfo as memberInfo__from_estransforms } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/esdecorator.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
export function OrderedMap$Size$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo__from_estransforms | undefined>> | undefined): int {
    return OrderedMap__from_collections.Size$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo__from_estransforms | undefined>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Size$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): int {
    return OrderedMap__from_collections.Size$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Size$string$MapOf_string_To_PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>> | undefined): int {
    return OrderedMap__from_collections.Size$kernel<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Size$string$Named_packagejson$ExportsOrImports($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined): int {
    return OrderedMap__from_collections.Size$kernel<gostring, ExportsOrImports__from_packagejson>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Size$string$Named_packagejson$JSONValue($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, JSONValue__from_packagejson>> | undefined): int {
    return OrderedMap__from_collections.Size$kernel<gostring, JSONValue__from_packagejson>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Size$string$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined): int {
    return OrderedMap__from_collections.Size$kernel<gostring, RuntimeSlice<gostring>>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Size$string$int($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, int>> | undefined): int {
    return OrderedMap__from_collections.Size$kernel<gostring, int>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Size$string$string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, gostring>> | undefined): int {
    return OrderedMap__from_collections.Size$kernel<gostring, gostring>($argument0, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
