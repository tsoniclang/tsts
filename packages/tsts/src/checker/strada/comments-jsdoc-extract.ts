/**
 * Comment + JSDoc extraction from AST nodes.
 *
 * Ported from Strada `utilities.go` — getJSDocComments, getLeadingComments,
 * getTrailingComments, getDocstringFromNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns the leading-comment ranges of a node (from the source text).
 */
export function getLeadingComments(node: AstNode): readonly { pos: number; end: number }[] {
  return (node as unknown as { leadingComments?: readonly { pos: number; end: number }[] }).leadingComments ?? [];
}

/**
 * Returns the trailing-comment ranges of a node.
 */
export function getTrailingComments(node: AstNode): readonly { pos: number; end: number }[] {
  return (node as unknown as { trailingComments?: readonly { pos: number; end: number }[] }).trailingComments ?? [];
}

/**
 * Returns the JSDoc nodes attached to a declaration.
 */
export function getJSDocNodes(node: AstNode): readonly AstNode[] {
  const jsDoc = (node as unknown as { jsDoc?: readonly AstNode[] }).jsDoc;
  return jsDoc ?? [];
}

/**
 * Returns the text of a JSDoc comment from its comment range.
 */
export function getJSDocCommentText(comment: AstNode): string {
  if (comment.kind !== Kind.JSDoc) return "";
  const text = (comment as unknown as { comment?: string | readonly AstNode[] }).comment;
  if (typeof text === "string") return text;
  if (Array.isArray(text)) {
    return text.map((part) => {
      if (part.kind === Kind.JSDocText) {
        return (part as unknown as { text?: string }).text ?? "";
      }
      return "";
    }).join("");
  }
  return "";
}

/**
 * Returns the JSDoc tags attached to a node.
 */
export function getJSDocTags(node: AstNode): readonly AstNode[] {
  const tags: AstNode[] = [];
  for (const doc of getJSDocNodes(node)) {
    const docTags = (doc as unknown as { tags?: { nodes?: readonly AstNode[] } }).tags?.nodes;
    if (docTags !== undefined) tags.push(...docTags);
  }
  return tags;
}

/**
 * Returns the first JSDoc tag with the given name.
 */
export function getFirstJSDocTagByName(node: AstNode, tagName: string): AstNode | undefined {
  for (const tag of getJSDocTags(node)) {
    const name = (tag as unknown as { tagName?: AstNode }).tagName;
    if (name === undefined) continue;
    const text = (name as unknown as { escapedText?: string }).escapedText;
    if (text === tagName) return tag;
  }
  return undefined;
}

/**
 * Returns true when the node has a `@deprecated` JSDoc tag.
 */
export function hasDeprecatedTag(node: AstNode): boolean {
  return getFirstJSDocTagByName(node, "deprecated") !== undefined;
}

/**
 * Returns true when the node has a `@internal` JSDoc tag.
 */
export function hasInternalTag(node: AstNode): boolean {
  return getFirstJSDocTagByName(node, "internal") !== undefined;
}

/**
 * Returns the docstring (concatenated comment text) of a node.
 */
export function getDocstring(node: AstNode): string {
  return getJSDocNodes(node).map(getJSDocCommentText).join("\n\n");
}
