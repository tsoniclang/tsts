import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportsOrImports as ExportsOrImports__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function OrderedMap$Keys$Named_tspath$Path$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, Path__from_tspath>> | undefined): iter.Seq<Path__from_tspath> {
    return OrderedMap__from_collections.Keys$kernel<Path__from_tspath, Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): Path__from_tspath => {
        return new Path__from_tspath($argument0.get($argument1));
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Keys$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): iter.Seq<gostring> {
    return OrderedMap__from_collections.Keys$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Keys$string$Named_packagejson$ExportsOrImports($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined): iter.Seq<gostring> {
    return OrderedMap__from_collections.Keys$kernel<gostring, ExportsOrImports__from_packagejson>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Keys$string$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined): iter.Seq<gostring> {
    return OrderedMap__from_collections.Keys$kernel<gostring, RuntimeSlice<gostring>>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Keys$string$int($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, int>> | undefined): iter.Seq<gostring> {
    return OrderedMap__from_collections.Keys$kernel<gostring, int>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
