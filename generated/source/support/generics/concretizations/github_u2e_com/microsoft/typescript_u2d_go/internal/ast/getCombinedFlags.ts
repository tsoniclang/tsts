import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { ModifierFlags as ModifierFlags__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/modifierflags.js";
import type { NodeFlags as NodeFlags__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/nodeflags.js";
import { getCombinedFlags$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/utilities.js";
export function getCombinedFlags$Named_ast$ModifierFlags($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => ModifierFlags__from_ast) | undefined): ModifierFlags__from_ast {
    return getCombinedFlags$kernel<ModifierFlags__from_ast>(($argument0: ModifierFlags__from_ast, $argument1: ModifierFlags__from_ast): ModifierFlags__from_ast => {
        return ($argument0 | $argument1) >>> 0;
    }, $argument0, $argument1);
}
export function getCombinedFlags$Named_ast$NodeFlags($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => NodeFlags__from_ast) | undefined): NodeFlags__from_ast {
    return getCombinedFlags$kernel<NodeFlags__from_ast>(($argument0: NodeFlags__from_ast, $argument1: NodeFlags__from_ast): NodeFlags__from_ast => {
        return ($argument0 | $argument1) >>> 0;
    }, $argument0, $argument1);
}
