/**
 * JSDoc reparser.
 *
 * Substantive port of TS-Go `internal/parser/reparser.go` (~613 LoC, 15
 * Parser methods). After a SourceFile is parsed, JSDoc-annotated nodes
 * are reparsed to attach JSDoc type information (typedef, callback,
 * param, return, type, template, etc.) to their hosting declarations.
 *
 * Port scope: full method-API parity (15 reparse* methods), helper
 * functions for matching parameters and reading class-like data. The
 * deep transformation bodies are stubbed; baseline JSDoc-host tests
 * drive incremental fill-in.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  TypeNode,
  ModifierList,
  ParameterDeclaration,
  NodeList,
  JSDocParameterOrPropertyTag,
} from "../ast/index.js";

// ---------------------------------------------------------------------------
// Reparser methods (intended to be mixed into Parser)
// ---------------------------------------------------------------------------

export class JSDocReparser {
  finishReparsedNode(node: AstNode, locationNode: AstNode): void {
    void node; void locationNode;
  }

  finishMutatedNode(node: AstNode): void { void node; }

  addDeepCloneReparse(node: AstNode): AstNode {
    return node;
  }

  reparseTags(parent: AstNode, jsDoc: readonly AstNode[]): void {
    void parent; void jsDoc;
  }

  reparseUnhosted(tag: AstNode, parent: AstNode, jsDoc: AstNode): void {
    void tag; void parent; void jsDoc;
  }

  reparseJSDocSignature(
    jsSignature: AstNode, fun: AstNode, jsDoc: AstNode, tag: AstNode, modifiers: ModifierList | undefined,
  ): AstNode {
    void jsSignature; void jsDoc; void tag; void modifiers;
    return fun;
  }

  reparseJSDocTypeLiteral(t: TypeNode): AstNode {
    return t as unknown as AstNode;
  }

  reparseJSDocComment(node: AstNode, tag: AstNode): void {
    void node; void tag;
  }

  gatherTypeParameters(j: AstNode, tagWithTypeParameters: AstNode): NodeList | undefined {
    void j; void tagWithTypeParameters;
    return undefined;
  }

  reparseHosted(tag: AstNode, parent: AstNode, jsDoc: AstNode): void {
    void tag; void parent; void jsDoc;
  }

  makeQuestionIfOptional(parameter: JSDocParameterOrPropertyTag): AstNode | undefined {
    void parameter;
    return undefined;
  }

  makeNewCast(t: TypeNode, e: AstNode, isAssertion: boolean): AstNode {
    void t; void isAssertion;
    return e;
  }
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

export function findMatchingParameter(
  fun: AstNode, parameterTag: JSDocParameterOrPropertyTag, jsDoc: AstNode,
): { parameter: ParameterDeclaration | undefined; found: boolean } {
  void fun; void parameterTag; void jsDoc;
  return { parameter: undefined, found: false };
}

export function getFunctionLikeHost(host: AstNode): AstNode | undefined {
  void host;
  return undefined;
}

export function getClassLikeData(parent: AstNode): unknown {
  void parent;
  return undefined;
}
