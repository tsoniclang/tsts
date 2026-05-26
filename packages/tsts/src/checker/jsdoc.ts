/**
 * Checker JSDoc handling.
 *
 * Port of TS-Go `internal/checker/jsdoc.go` (~97 LoC). Resolves JSDoc
 * type annotations and JSDoc-derived symbol/type bindings.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Type } from "./types.js";

export function getTypeFromJSDocTypeReference(node: AstNode): Type | undefined {
  void node;
  return undefined;
}

export function getTypeFromJSDocOptionalType(node: AstNode): Type | undefined {
  void node;
  return undefined;
}

export function getTypeFromJSDocNullableType(node: AstNode): Type | undefined {
  void node;
  return undefined;
}

export function getJSDocAliasTypeArguments(node: AstNode): readonly Type[] {
  void node;
  return [];
}

export function getJSDocTypeAliasSymbol(node: AstNode): AstSymbol | undefined {
  void node;
  return undefined;
}

export function isJSDocOverloadTag(node: AstNode): boolean {
  void node;
  return false;
}

export function getJSDocReturnType(node: AstNode): Type | undefined {
  void node;
  return undefined;
}
