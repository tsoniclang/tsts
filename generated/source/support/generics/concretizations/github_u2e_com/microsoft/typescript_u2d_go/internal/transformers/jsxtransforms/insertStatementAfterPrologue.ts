import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { JSXTransformer as JSXTransformer__from_jsxtransforms } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/jsxtransforms/jsx.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { insertStatementAfterPrologue$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/jsxtransforms/jsx.js";
export function insertStatementAfterPrologue$PointerTo_Named_jsxtransforms$JSXTransformer($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: (($0: JSXTransformer__from_jsxtransforms | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, $argument3: JSXTransformer__from_jsxtransforms | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return insertStatementAfterPrologue$kernel<JSXTransformer__from_jsxtransforms | undefined>($argument0, $argument1, $argument2, $argument3);
}
