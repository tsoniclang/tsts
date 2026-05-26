/**
 * Declaration-emit utility predicates.
 *
 * Port of TS-Go `internal/transformers/declarations/util.go`.
 */

import type { Node as AstNode, StatementList, TypeParameterDeclaration, FunctionDeclaration } from "../../ast/index.js";

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

declare const Kind: {
  PropertyDeclaration: number; PropertySignature: number; Parameter: number;
  VariableDeclaration: number; FunctionDeclaration: number; ModuleDeclaration: number;
  InterfaceDeclaration: number; ClassDeclaration: number; TypeAliasDeclaration: number;
  JSTypeAliasDeclaration: number; EnumDeclaration: number;
  ImportEqualsDeclaration: number; ImportDeclaration: number; JSImportDeclaration: number;
  ExportDeclaration: number; ExportAssignment: number; ClassStaticBlockDeclaration: number;
  ParenthesizedExpression: number; MethodDeclaration: number;
};
declare const ModifierFlags: { Private: number; Default: number; Export: number; Ambient: number };

declare function isAnyImportOrReExport(node: AstNode): boolean;
declare function isExportAssignment(node: AstNode): boolean;
declare function isExportDeclaration(node: AstNode): boolean;
declare function hasSyntacticModifier(node: AstNode, flags: number): boolean;
declare function isAmbientModule(node: AstNode): boolean;
declare function isVariableDeclaration(node: AstNode): boolean;
declare function isPropertyDeclaration(node: AstNode): boolean;
declare function isPropertySignatureDeclaration(node: AstNode): boolean;
declare function isBindingElement(node: AstNode): boolean;
declare function isSetAccessorDeclaration(node: AstNode): boolean;
declare function isGetAccessorDeclaration(node: AstNode): boolean;
declare function isConstructSignatureDeclaration(node: AstNode): boolean;
declare function isCallSignatureDeclaration(node: AstNode): boolean;
declare function isMethodDeclaration(node: AstNode): boolean;
declare function isMethodSignatureDeclaration(node: AstNode): boolean;
declare function isFunctionDeclaration(node: AstNode): boolean;
declare function isParameterDeclaration(node: AstNode): boolean;
declare function isTypeParameterDeclaration(node: AstNode): boolean;
declare function isExpressionWithTypeArguments(node: AstNode): boolean;
declare function isImportEqualsDeclaration(node: AstNode): boolean;
declare function isTypeAliasDeclaration(node: AstNode): boolean;
declare function isJSTypeAliasDeclaration(node: AstNode): boolean;
declare function isConstructorDeclaration(node: AstNode): boolean;
declare function isIndexSignatureDeclaration(node: AstNode): boolean;
declare function isPropertyAccessExpression(node: AstNode): boolean;
declare function isElementAccessExpression(node: AstNode): boolean;
declare function isBinaryExpression(node: AstNode): boolean;
declare function isOmittedExpression(node: AstNode): boolean;
declare function isBindingPattern(node: AstNode): boolean;
declare function isSourceFile(node: AstNode): boolean;
declare function isModuleDeclaration(node: AstNode): boolean;
declare function isClassDeclaration(node: AstNode): boolean;
declare function isInterfaceDeclaration(node: AstNode): boolean;
declare function isFunctionLike(node: AstNode): boolean;
declare function isMappedTypeNode(node: AstNode): boolean;
declare function bindingPatternElements(pattern: AstNode): readonly AstNode[];
declare function nodeName(node: AstNode): AstNode | undefined;
declare function nodeExpression(node: AstNode): AstNode;
declare function nodeParent(node: AstNode): AstNode | undefined;
declare function functionDeclarationBody(node: FunctionDeclaration): AstNode | undefined;
declare function functionDeclarationSymbolDeclarations(node: FunctionDeclaration): readonly AstNode[];
declare function getClassExtendsHeritageElement(node: AstNode): AstNode | undefined;
declare function statementListNodes(list: StatementList): readonly AstNode[];
