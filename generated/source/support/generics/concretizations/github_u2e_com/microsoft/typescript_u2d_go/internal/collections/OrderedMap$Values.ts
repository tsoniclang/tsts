import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
export function OrderedMap$Values$Interface_void$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<GoInterface | undefined, RuntimeSlice<gostring>>> | undefined): iter.Seq<RuntimeSlice<gostring>> {
    return OrderedMap__from_collections.Values$kernel<GoInterface | undefined, RuntimeSlice<gostring>>($argument0, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<GoInterface | undefined>, $argument1: int): GoInterface | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<GoInterface | undefined>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Values$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): iter.Seq<GoInterface | undefined> {
    return OrderedMap__from_collections.Values$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Values$string$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined): iter.Seq<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return OrderedMap__from_collections.Values$kernel<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Values$string$string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, gostring>> | undefined): iter.Seq<gostring> {
    return OrderedMap__from_collections.Values$kernel<gostring, gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
