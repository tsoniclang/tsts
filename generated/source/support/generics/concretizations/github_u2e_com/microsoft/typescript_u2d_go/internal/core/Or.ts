import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Or$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function Or$PointerTo_Named_ast$Node($argument0: RuntimeSlice<(($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined>): (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined {
    return Or$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0);
}
