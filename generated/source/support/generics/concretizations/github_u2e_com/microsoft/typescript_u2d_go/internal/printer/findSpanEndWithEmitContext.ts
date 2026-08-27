import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { EmitContext as EmitContext__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { findSpanEndWithEmitContext$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/utilities.js";
export function findSpanEndWithEmitContext$PointerTo_Named_ast$Node($argument0: {
    value: EmitContext__from_printer;
} | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument2: (($0: {
    value: EmitContext__from_printer;
} | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, $argument3: int): int {
    return findSpanEndWithEmitContext$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, $argument0, $argument1, $argument2, $argument3);
}
