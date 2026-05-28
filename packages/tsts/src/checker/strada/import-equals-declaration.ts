/**
 * ImportEqualsDeclaration handling (`import X = require("...")`).
 *
 * Tsonic forbids `import =`. These helpers detect and classify it
 * so diagnostics can flag it.
 *
 * Ported from Strada `checker.go` — checkImportEqualsDeclaration.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an ImportEqualsDeclaration.
 */
export function isImportEqualsDeclaration(node: AstNode): boolean {
  return node.kind === Kind.ImportEqualsDeclaration;
}

/**
 * Returns the name being bound by an ImportEquals.
 */
export function getImportEqualsName(node: AstNode): string | undefined {
  if (!isImportEqualsDeclaration(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns the module-reference of an ImportEquals.
 */
export function getImportEqualsReference(node: AstNode): AstNode | undefined {
  if (!isImportEqualsDeclaration(node)) return undefined;
  return (node as unknown as { moduleReference?: AstNode }).moduleReference;
}

/**
 * Returns true when the import is `import X = require("...")` form.
 */
export function isExternalModuleReference(node: AstNode): boolean {
  const ref = getImportEqualsReference(node);
  return ref !== undefined && ref.kind === Kind.ExternalModuleReference;
}

/**
 * Returns the require() target string of an external module
 * reference.
 */
export function getRequireTarget(node: AstNode): string | undefined {
  const ref = getImportEqualsReference(node);
  if (ref === undefined || ref.kind !== Kind.ExternalModuleReference) return undefined;
  const expr = (ref as unknown as { expression?: AstNode }).expression;
  if (expr === undefined || expr.kind !== Kind.StringLiteral) return undefined;
  return (expr as unknown as { text?: string }).text;
}

/**
 * Returns true when the import is an alias to an entity name
 * (`import X = A.B.C`).
 */
export function isEntityNameAlias(node: AstNode): boolean {
  const ref = getImportEqualsReference(node);
  if (ref === undefined) return false;
  return ref.kind === Kind.Identifier || ref.kind === Kind.QualifiedName;
}

/**
 * Returns true when the import-equals is type-only
 * (`import type X = ...`).
 */
export function isTypeOnlyImportEquals(node: AstNode): boolean {
  if (!isImportEqualsDeclaration(node)) return false;
  return (node as unknown as { isTypeOnly?: boolean }).isTypeOnly === true;
}
