/**
 * ExportAssignment handling (`export = X` and `export default X`).
 *
 * Tsonic forbids `export =`. These helpers distinguish the two forms
 * so diagnostics can flag the CommonJS-style `export =`.
 *
 * Ported from Strada `checker.go` — checkExportAssignment.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an ExportAssignment.
 */
export function isExportAssignment(node: AstNode): boolean {
  return node.kind === Kind.ExportAssignment;
}

/**
 * Returns true when the export-assignment is the `export =` form
 * (CommonJS-style — forbidden in Tsonic).
 */
export function isExportEquals(node: AstNode): boolean {
  if (!isExportAssignment(node)) return false;
  return (node as unknown as { isExportEquals?: boolean }).isExportEquals === true;
}

/**
 * Returns true when the export-assignment is the `export default`
 * expression form.
 */
export function isExportDefaultExpression(node: AstNode): boolean {
  if (!isExportAssignment(node)) return false;
  return (node as unknown as { isExportEquals?: boolean }).isExportEquals !== true;
}

/**
 * Returns the exported expression of an ExportAssignment.
 */
export function getExportAssignmentExpression(node: AstNode): AstNode | undefined {
  if (!isExportAssignment(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the exported identifier name, if the expression is a
 * simple identifier.
 */
export function getExportAssignmentName(node: AstNode): string | undefined {
  const expr = getExportAssignmentExpression(node);
  if (expr === undefined || expr.kind !== Kind.Identifier) return undefined;
  return (expr as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns true when the default export is an anonymous expression
 * (class/function expression with no name, or arbitrary expression).
 */
export function isAnonymousDefaultExport(node: AstNode): boolean {
  const expr = getExportAssignmentExpression(node);
  if (expr === undefined) return false;
  if (expr.kind === Kind.Identifier) return false;
  if (expr.kind === Kind.ClassExpression || expr.kind === Kind.FunctionExpression) {
    return (expr as unknown as { name?: AstNode }).name === undefined;
  }
  return true;
}
