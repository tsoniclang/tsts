/**
 * `import("x").T` type-import expression handling.
 *
 * Ported from Strada `checker.go` — checkImportTypeNode,
 * resolveImportType, getImportTypeOfTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an ImportTypeNode (`import("x").T`).
 */
export function isImportTypeNode(node: AstNode): boolean {
  return node.kind === Kind.ImportType;
}

/**
 * Returns the module-specifier argument of an ImportTypeNode.
 */
export function getImportTypeModuleSpecifier(node: AstNode): string | undefined {
  if (!isImportTypeNode(node)) return undefined;
  const argument = (node as unknown as { argument?: AstNode }).argument;
  if (argument === undefined) return undefined;
  if (argument.kind === Kind.LiteralType) {
    const literal = (argument as unknown as { literal?: AstNode }).literal;
    if (literal === undefined || literal.kind !== Kind.StringLiteral) return undefined;
    return (literal as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns the qualifier (named member after the import) of an
 * ImportTypeNode.
 */
export function getImportTypeQualifier(node: AstNode): AstNode | undefined {
  if (!isImportTypeNode(node)) return undefined;
  return (node as unknown as { qualifier?: AstNode }).qualifier;
}

/**
 * Returns the type arguments of an ImportTypeNode.
 */
export function getImportTypeTypeArguments(node: AstNode): readonly AstNode[] {
  if (!isImportTypeNode(node)) return [];
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}

/**
 * Returns true when the import-type is type-only (no value emit).
 */
export function isTypeOnlyImportType(node: AstNode): boolean {
  if (!isImportTypeNode(node)) return false;
  return (node as unknown as { isTypeOf?: boolean }).isTypeOf === false;
}

/**
 * Returns true when the import-type uses the `typeof` operator
 * (`typeof import("x")`).
 */
export function isTypeofImportType(node: AstNode): boolean {
  if (!isImportTypeNode(node)) return false;
  return (node as unknown as { isTypeOf?: boolean }).isTypeOf === true;
}
