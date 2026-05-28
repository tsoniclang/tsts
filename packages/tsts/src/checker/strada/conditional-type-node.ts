/**
 * ConditionalType node handling (`C extends E ? T : F`).
 *
 * Ported from Strada `checker.go` — getTypeFromConditionalTypeNode,
 * getInferTypeParameters.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a ConditionalType.
 */
export function isConditionalTypeNode(node: AstNode): boolean {
  return node.kind === Kind.ConditionalType;
}

/**
 * Returns the check type-node of a ConditionalType.
 */
export function getConditionalCheckType(node: AstNode): AstNode | undefined {
  if (!isConditionalTypeNode(node)) return undefined;
  return (node as unknown as { checkType?: AstNode }).checkType;
}

/**
 * Returns the extends type-node of a ConditionalType.
 */
export function getConditionalExtendsType(node: AstNode): AstNode | undefined {
  if (!isConditionalTypeNode(node)) return undefined;
  return (node as unknown as { extendsType?: AstNode }).extendsType;
}

/**
 * Returns the true-branch type-node of a ConditionalType.
 */
export function getConditionalTrueType(node: AstNode): AstNode | undefined {
  if (!isConditionalTypeNode(node)) return undefined;
  return (node as unknown as { trueType?: AstNode }).trueType;
}

/**
 * Returns the false-branch type-node of a ConditionalType.
 */
export function getConditionalFalseType(node: AstNode): AstNode | undefined {
  if (!isConditionalTypeNode(node)) return undefined;
  return (node as unknown as { falseType?: AstNode }).falseType;
}

/**
 * Returns true when the node is an InferType (`infer T`).
 */
export function isInferTypeNode(node: AstNode): boolean {
  return node.kind === Kind.InferType;
}

/**
 * Returns the type-parameter declaration of an InferType.
 */
export function getInferTypeParameter(node: AstNode): AstNode | undefined {
  if (!isInferTypeNode(node)) return undefined;
  return (node as unknown as { typeParameter?: AstNode }).typeParameter;
}

/**
 * Collects all `infer` type-parameter names within the extends-clause
 * of a conditional type.
 */
export function collectInferTypeParameterNames(node: AstNode): readonly string[] {
  const out: string[] = [];
  const extendsType = getConditionalExtendsType(node);
  if (extendsType === undefined) return out;
  const walker = (n: AstNode): void => {
    if (isInferTypeNode(n)) {
      const tp = getInferTypeParameter(n);
      if (tp !== undefined) {
        const name = (tp as unknown as { name?: AstNode }).name;
        if (name !== undefined && name.kind === Kind.Identifier) {
          const text = (name as unknown as { escapedText?: string }).escapedText;
          if (text !== undefined) out.push(text);
        }
      }
      return;
    }
    const children = (n as unknown as { children?: () => readonly AstNode[] }).children;
    if (typeof children === "function") {
      for (const c of children.call(n)) walker(c);
    }
  };
  walker(extendsType);
  return out;
}

/**
 * Returns true when the conditional type has at least one `infer`
 * clause.
 */
export function hasInferClause(node: AstNode): boolean {
  return collectInferTypeParameterNames(node).length > 0;
}

/**
 * Returns true when the check-type is a naked type-parameter
 * (making the conditional distributive).
 */
export function isDistributiveConditionalNode(node: AstNode): boolean {
  const check = getConditionalCheckType(node);
  if (check === undefined) return false;
  return check.kind === Kind.TypeReference;
}
