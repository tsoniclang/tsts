import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { NodeFlags as NodeFlags__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/nodeflags.js";
import type { Parser as Parser__from_parser } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/parser.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { doInContext$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/parser.js";
export function doInContext$PointerTo_Named_ast$Node($argument0: {
    value: Parser__from_parser;
} | undefined, $argument1: NodeFlags__from_ast, $argument2: bool, $argument3: (($0: {
    value: Parser__from_parser;
} | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return doInContext$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, $argument1, $argument2, $argument3);
}
