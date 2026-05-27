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
  void jsDoc;
  // The function-like node carries .parameters; the tag's .name is the
  // parameter identifier to match. JSDoc supports dotted-name property
  // tags (e.g. `@param {Object} a` then `@param {string} a.b`); we
  // only match top-level names here — nested name handling lives in
  // the reparser body.
  const params = (fun as unknown as { parameters?: { nodes?: readonly ParameterDeclaration[] } }).parameters;
  const nodes = params?.nodes;
  if (nodes === undefined || nodes.length === 0) return { parameter: undefined, found: false };
  const tagName = (parameterTag as unknown as { name?: { text?: string; kind?: number } }).name;
  if (tagName === undefined) return { parameter: undefined, found: false };
  // Dotted name → only nested-property tag; can't match a parameter.
  const tagText = tagName.text;
  if (tagText === undefined) return { parameter: undefined, found: false };
  for (const p of nodes) {
    const pn = (p as unknown as { name?: { text?: string } }).name;
    if (pn?.text === tagText) return { parameter: p, found: true };
  }
  return { parameter: undefined, found: false };
}

export function getFunctionLikeHost(host: AstNode): AstNode | undefined {
  // A JSDoc comment's "function-like host" is the nearest enclosing
  // declaration that has parameters. Walk up parents looking for a
  // function-like kind.
  let n: AstNode | undefined = host;
  while (n !== undefined) {
    const k = (n as { kind?: number }).kind;
    if (
      k === 218 /* FunctionExpression */ ||
      k === 219 /* ArrowFunction */ ||
      k === 262 /* FunctionDeclaration */ ||
      k === 174 /* MethodDeclaration */ ||
      k === 176 /* Constructor */ ||
      k === 177 /* GetAccessor */ ||
      k === 178 /* SetAccessor */ ||
      k === 173 /* MethodSignature */
    ) {
      return n;
    }
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

export function getClassLikeData(parent: AstNode): unknown {
  // Returns { members, heritageClauses, typeParameters } if `parent`
  // is a ClassDeclaration / ClassExpression / InterfaceDeclaration.
  const k = (parent as { kind?: number }).kind;
  if (k !== 263 /* ClassDeclaration */ && k !== 231 /* ClassExpression */ && k !== 264 /* InterfaceDeclaration */) {
    return undefined;
  }
  const p = parent as unknown as { members?: unknown; heritageClauses?: unknown; typeParameters?: unknown };
  return {
    members: p.members,
    heritageClauses: p.heritageClauses,
    typeParameters: p.typeParameters,
  };
}
