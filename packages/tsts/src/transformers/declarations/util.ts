/**
 * Declaration-emit utility predicates.
 *
 * Port of TS-Go `internal/transformers/declarations/util.go`.
 */

import type { Node as AstNode, StatementList, TypeParameterDeclaration, FunctionDeclaration } from "../../ast/index.js";
import {
  nodeName, nodeExpression, nodeParent, bindingPatternElements,
  hasSyntacticModifier,
} from "../../ast/index.js";
import {
  isExportAssignment, isExportDeclaration, isVariableDeclaration,
  isPropertyDeclaration, isBindingElement, isSetAccessorDeclaration,
  isGetAccessorDeclaration, isConstructSignatureDeclaration,
  isCallSignatureDeclaration, isMethodDeclaration, isFunctionDeclaration,
  isParameterDeclaration, isTypeParameterDeclaration,
  isExpressionWithTypeArguments, isImportEqualsDeclaration,
  isTypeAliasDeclaration, isConstructorDeclaration,
  isIndexSignatureDeclaration, isPropertyAccessExpression,
  isElementAccessExpression, isBinaryExpression, isOmittedExpression,
  isBindingPattern, isSourceFile, isModuleDeclaration, isClassDeclaration,
  isInterfaceDeclaration, isMappedTypeNode,
} from "../../ast/index.js";
import { Kind, functionDeclarationBody, nodeBody } from "../../ast/index.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";

// TS-Go helpers backed by Kind dispatch and small field reads:
function isAnyImportOrReExport(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind;
  return k === Kind.ImportDeclaration || k === Kind.ImportEqualsDeclaration
    || k === Kind.ExportDeclaration || k === Kind.ExportAssignment;
}
function isAmbientModule(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if ((node as { kind?: number }).kind !== Kind.ModuleDeclaration) return false;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined) return false;
  return (name as { kind?: number }).kind === Kind.StringLiteral;
}
function isPropertySignatureDeclaration(node: AstNode | undefined): boolean {
  return node !== undefined && (node as { kind?: number }).kind === Kind.PropertySignature;
}
function isMethodSignatureDeclaration(node: AstNode | undefined): boolean {
  return node !== undefined && (node as { kind?: number }).kind === Kind.MethodSignature;
}
function isJSTypeAliasDeclaration(_node: AstNode): boolean {
  // JSDoc type alias support is not yet ported.
  return false;
}
function isFunctionLike(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind ?? 0;
  return k === Kind.FunctionDeclaration || k === Kind.FunctionExpression
    || k === Kind.ArrowFunction || k === Kind.MethodDeclaration
    || k === Kind.Constructor || k === Kind.GetAccessor || k === Kind.SetAccessor;
}
function functionDeclarationSymbolDeclarations(_node: AstNode): readonly AstNode[] {
  // Multi-decl symbol grouping; binder pass populates this. Empty until binder lands.
  return [];
}
function getClassExtendsHeritageElement(node: AstNode | undefined): AstNode | undefined {
  if (node === undefined) return undefined;
  const clauses = (node as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
  if (clauses === undefined) return undefined;
  for (const clause of clauses) {
    if ((clause as { token?: number }).token === Kind.ExtendsKeyword) {
      const types = (clause as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
      return types?.[0];
    }
  }
  return undefined;
}
function statementListNodes(list: StatementList): readonly AstNode[] {
  return (list as unknown as { nodes?: readonly AstNode[] }).nodes ?? [];
}
void functionDeclarationBody; void nodeBody;

export function needsScopeMarker(result: AstNode): boolean {
  return (
    !isAnyImportOrReExport(result) &&
    !isExportAssignment(result) &&
    !hasSyntacticModifier(result, ModifierFlags.Export) &&
    !isAmbientModule(result)
  );
}

export function canHaveLiteralInitializer(host: DeclarationEmitHost, node: AstNode): boolean {
  switch (node.kind) {
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
      return host.getEffectiveDeclarationFlags(node, ModifierFlags.Private) === 0;
    case Kind.Parameter:
    case Kind.VariableDeclaration:
      return true;
  }
  return false;
}

export function canProduceDiagnostics(node: AstNode): boolean {
  return (
    isVariableDeclaration(node) ||
    isPropertyDeclaration(node) ||
    isPropertySignatureDeclaration(node) ||
    isBindingElement(node) ||
    isSetAccessorDeclaration(node) ||
    isGetAccessorDeclaration(node) ||
    isConstructSignatureDeclaration(node) ||
    isCallSignatureDeclaration(node) ||
    isMethodDeclaration(node) ||
    isMethodSignatureDeclaration(node) ||
    isFunctionDeclaration(node) ||
    isParameterDeclaration(node) ||
    isTypeParameterDeclaration(node) ||
    isExpressionWithTypeArguments(node) ||
    isImportEqualsDeclaration(node) ||
    isTypeAliasDeclaration(node) ||
    isJSTypeAliasDeclaration(node) ||
    isConstructorDeclaration(node) ||
    isIndexSignatureDeclaration(node) ||
    isPropertyAccessExpression(node) ||
    isElementAccessExpression(node) ||
    isBinaryExpression(node)
  );
}

export function isDeclarationAndNotVisible(emitContext: EmitContext, resolver: EmitResolver, node: AstNode): boolean {
  const parsed = emitContext.parseNode(node);
  if (parsed === undefined) return false;
  switch (parsed.kind) {
    case Kind.FunctionDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.ClassDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.JSTypeAliasDeclaration:
    case Kind.EnumDeclaration:
      return !resolver.isDeclarationVisible(parsed);
    case Kind.VariableDeclaration:
      return !getBindingNameVisible(resolver, parsed);
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ExportDeclaration:
    case Kind.ExportAssignment:
      return false;
    case Kind.ClassStaticBlockDeclaration:
      return true;
  }
  return false;
}

export function getBindingNameVisible(resolver: EmitResolver, elem: AstNode): boolean {
  if (isOmittedExpression(elem)) return false;
  if (nodeName(elem) === undefined) return false;
  if (isBindingPattern(nodeName(elem)!)) {
    for (const child of bindingPatternElements(nodeName(elem)!)) {
      if (getBindingNameVisible(resolver, child)) return true;
    }
    return false;
  }
  return resolver.isDeclarationVisible(elem);
}

export function isEnclosingDeclaration(node: AstNode): boolean {
  return (
    isSourceFile(node) ||
    isTypeAliasDeclaration(node) ||
    isJSTypeAliasDeclaration(node) ||
    isModuleDeclaration(node) ||
    isClassDeclaration(node) ||
    isInterfaceDeclaration(node) ||
    isFunctionLike(node) ||
    isIndexSignatureDeclaration(node) ||
    isMappedTypeNode(node)
  );
}

export function isAlwaysType(node: AstNode): boolean {
  return node.kind === Kind.InterfaceDeclaration;
}

export function maskModifierFlags(host: DeclarationEmitHost, node: AstNode, modifierMask: number, modifierAdditions: number): number {
  let flags = host.getEffectiveDeclarationFlags(node, modifierMask) | modifierAdditions;
  if ((flags & ModifierFlags.Default) !== 0 && (flags & ModifierFlags.Export) === 0) {
    flags ^= ModifierFlags.Export;
  }
  if ((flags & ModifierFlags.Default) !== 0 && (flags & ModifierFlags.Ambient) !== 0) {
    flags ^= ModifierFlags.Ambient;
  }
  return flags;
}

export function unwrapParenthesizedExpression(o: AstNode): AstNode {
  let n = o;
  while (n.kind === Kind.ParenthesizedExpression) n = nodeExpression(n);
  return n;
}

export function isPrivateMethodTypeParameter(host: DeclarationEmitHost, node: TypeParameterDeclaration): boolean {
  const parent = nodeParent(node as unknown as AstNode);
  return parent !== undefined && parent.kind === Kind.MethodDeclaration && host.getEffectiveDeclarationFlags(parent, ModifierFlags.Private) !== 0;
}

export function shouldEmitFunctionProperties(input: FunctionDeclaration): boolean {
  if (functionDeclarationBody(input) !== undefined) return true;
  const decls = functionDeclarationSymbolDeclarations(input);
  return !decls.every((decl) => !isFunctionDeclaration(decl) || functionDeclarationBody(decl as unknown as FunctionDeclaration) === undefined);
}

export function getEffectiveBaseTypeNode(node: AstNode): AstNode | undefined {
  return getClassExtendsHeritageElement(node);
}

export function isScopeMarker(node: AstNode): boolean {
  return isExportAssignment(node) || isExportDeclaration(node);
}

export function hasScopeMarker(statements: StatementList | undefined): boolean {
  if (statements === undefined) return false;
  return statementListNodes(statements).some(isScopeMarker);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface DeclarationEmitHost {
  getEffectiveDeclarationFlags(node: AstNode, flags: number): number;
}

interface EmitContext { parseNode(node: AstNode): AstNode | undefined }
interface EmitResolver { isDeclarationVisible(node: AstNode): boolean }

