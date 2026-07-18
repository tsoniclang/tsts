import type { Node } from "../internal/ast/spine.js";
import { NodeFlagsAmbient, NodeFlagsJSDoc } from "../internal/ast/generated/flags.js";
import { GetSourceFileOfNode, IsPartOfTypeNode } from "../internal/ast/utilities.js";
import { IsInTypeQuery, isInAmbientOrTypeNode } from "../internal/checker/utilities.js";

export type CheckedSourceExecutionRole =
  | "runtime-execution"
  | "declaration-file-semantic"
  | "type-only-or-ambient-semantic";

export function checkedSourceExecutionRole(node: Node): CheckedSourceExecutionRole {
  const sourceFile = GetSourceFileOfNode(node);
  if (sourceFile === undefined) {
    throw new Error("Checked source execution evidence requires a source-file-owned AST node.");
  }
  if (sourceFile.IsDeclarationFile) {
    return "declaration-file-semantic";
  }
  if ((node.Flags & (NodeFlagsAmbient | NodeFlagsJSDoc)) !== 0
    || IsPartOfTypeNode(node)
    || IsInTypeQuery(node)
    || isInAmbientOrTypeNode(node)) {
    return "type-only-or-ambient-semantic";
  }
  return "runtime-execution";
}

export function isRuntimeCheckedSourceExecution(node: Node): boolean {
  return checkedSourceExecutionRole(node) === "runtime-execution";
}
