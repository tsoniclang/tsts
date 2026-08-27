import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/options.js";
import type { Node as Node__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Symbol as Symbol__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { IndexInfo as IndexInfo__from_checker, Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function Clip$SliceOf_Named_jsonopts$Options$Named_jsonopts$Options($argument0: RuntimeSlice<Options__from_jsonopts | undefined>): RuntimeSlice<Options__from_jsonopts | undefined> {
    return generic_slices_kernel.SlicesClipKernel<Options__from_jsonopts | undefined>($argument0);
}
export function Clip$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    return generic_slices_kernel.SlicesClipKernel<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>($argument0);
}
export function Clip$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return generic_slices_kernel.SlicesClipKernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0);
}
export function Clip$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return generic_slices_kernel.SlicesClipKernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0);
}
export function Clip$SliceOf_PointerTo_Named_checker$IndexInfo$PointerTo_Named_checker$IndexInfo($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined> {
    return generic_slices_kernel.SlicesClipKernel<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>($argument0);
}
export function Clip$SliceOf_PointerTo_Named_checker$Signature$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    return generic_slices_kernel.SlicesClipKernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>($argument0);
}
export function Clip$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return generic_slices_kernel.SlicesClipKernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>($argument0);
}
