import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedSet as OrderedSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_set.js";
export function OrderedSet$Values$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): iter.Seq<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return OrderedSet__from_collections.Values$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    });
}
export function OrderedSet$Values$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined): iter.Seq<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return OrderedSet__from_collections.Values$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): int => {
        return $argument0.length;
    });
}
export function OrderedSet$Values$PointerTo_Named_printer$EmitHelper($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<{
    value: EmitHelper__from_printer;
} | undefined>> | undefined): iter.Seq<{
    value: EmitHelper__from_printer;
} | undefined> {
    return OrderedSet__from_collections.Values$kernel<{
        value: EmitHelper__from_printer;
    } | undefined>($argument0, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: EmitHelper__from_printer;
    } | undefined>, $argument1: int): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<{
        value: EmitHelper__from_printer;
    } | undefined>): int => {
        return $argument0.length;
    });
}
export function OrderedSet$Values$string($argument0: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<gostring>> | undefined): iter.Seq<gostring> {
    return OrderedSet__from_collections.Values$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
