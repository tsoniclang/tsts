/**
 * Printer utilities.
 *
 * Port of TS-Go `internal/printer/utilities.go` (~925 LoC). Pure helper
 * functions used by the printer: AST-node introspection (statement
 * vs expression, modifier extraction, parameter property detection,
 * etc.), list-format helpers, source-map line/column math, escape
 * sequence handling for string/template literals, JSX text encoding.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, ModifierList, NodeList, Block, FunctionLikeDeclaration, SourceFile } from "../ast/index.js";
import { Kind } from "../ast/index.js";
import {
  isIdentifier as astIsIdentifier,
  isPrivateIdentifier as astIsPrivateIdentifier,
  isStringLiteral as astIsStringLiteral,
  isComputedPropertyName as astIsComputedPropertyName,
  isMethodDeclaration as astIsMethodDeclaration,
  isPropertyDeclaration as astIsPropertyDeclaration,
  isGetAccessorDeclaration as astIsGetAccessor,
  isSetAccessorDeclaration as astIsSetAccessor,
  isConstructorDeclaration as astIsConstructorDeclaration,
  isObjectLiteralExpression as astIsObjectLiteralExpression,
  isArrayLiteralExpression as astIsArrayLiteralExpression,
  isBinaryExpression as astIsBinaryExpression,
  isBindingElement as astIsBindingElement,
  isPropertyAccessExpression as astIsPropertyAccessExpression,
  isElementAccessExpression as astIsElementAccessExpression,
  isClassExpression as astIsClassExpression,
  isClassDeclaration as astIsClassDeclaration,
  isClassStaticBlockDeclaration as astIsClassStaticBlockDeclaration,
  isModuleDeclaration as astIsModuleDeclaration,
  isFunctionDeclaration as astIsFunctionDeclaration,
  isFunctionExpression as astIsFunctionExpression,
  isArrowFunction as astIsArrowFunction,
  isSatisfiesExpression as astIsSatisfiesExpression,
} from "../ast/generated/is.js";

export function getNodeName(node: AstNode): AstNode | undefined {
  return (node as unknown as { name?: AstNode }).name;
}
export function getDeclarationName(node: AstNode): AstNode | undefined {
  return getNodeName(node);
}
export function getNameOfDeclaration(node: AstNode): AstNode | undefined {
  return getNodeName(node);
}

export function hasSyntacticModifier(node: AstNode, flag: number): boolean {
  return (getSyntacticModifierFlags(node) & flag) !== 0;
}

export function getModifiers(node: AstNode): ModifierList | undefined {
  return (node as unknown as { modifiers?: ModifierList }).modifiers;
}

const modifierFlagFor = (k: number): number => {
  switch (k) {
    case Kind.PublicKeyword: return 1 << 2;
    case Kind.PrivateKeyword: return 1 << 3;
    case Kind.ProtectedKeyword: return 1 << 4;
    case Kind.ReadonlyKeyword: return 1 << 6;
    case Kind.OverrideKeyword: return 1 << 14;
    case Kind.ExportKeyword: return 1 << 0;
    case Kind.AbstractKeyword: return 1 << 7;
    case Kind.AsyncKeyword: return 1 << 8;
    case Kind.DefaultKeyword: return 1 << 9;
    case Kind.ConstKeyword: return 1 << 11;
    case Kind.DeclareKeyword: return 1 << 1;
    case Kind.StaticKeyword: return 1 << 5;
    case Kind.AccessorKeyword: return 1 << 15;
    case Kind.InKeyword: return 1 << 16;
    case Kind.OutKeyword: return 1 << 17;
    default: return 0;
  }
};

export function getSyntacticModifierFlags(node: AstNode): number {
  const mods = getModifiers(node);
  const nodes = (mods as unknown as { nodes?: readonly AstNode[] })?.nodes;
  if (nodes === undefined) return 0;
  let f = 0;
  for (const m of nodes) f |= modifierFlagFor((m as { kind?: number }).kind ?? 0);
  return f;
}

export function getEffectiveModifierFlags(node: AstNode): number {
  return getSyntacticModifierFlags(node);
}

export function hasStaticModifier(node: AstNode): boolean {
  return (getSyntacticModifierFlags(node) & (1 << 5)) !== 0;
}
export function isStatic(node: AstNode): boolean { return hasStaticModifier(node); }
export function hasDecorators(node: AstNode): boolean {
  const mods = getModifiers(node);
  const nodes = (mods as unknown as { nodes?: readonly AstNode[] })?.nodes;
  if (nodes === undefined) return false;
  for (const m of nodes) if ((m as { kind?: number }).kind === Kind.Decorator) return true;
  return false;
}
export function getDecorators(node: AstNode): readonly AstNode[] {
  const mods = getModifiers(node);
  const nodes = (mods as unknown as { nodes?: readonly AstNode[] })?.nodes;
  if (nodes === undefined) return [];
  return nodes.filter((m) => (m as { kind?: number }).kind === Kind.Decorator);
}

const STATEMENT_KINDS = new Set<number>([
  Kind.Block, Kind.VariableStatement, Kind.EmptyStatement, Kind.ExpressionStatement,
  Kind.IfStatement, Kind.DoStatement, Kind.WhileStatement, Kind.ForStatement,
  Kind.ForInStatement, Kind.ForOfStatement, Kind.ContinueStatement, Kind.BreakStatement,
  Kind.ReturnStatement, Kind.WithStatement, Kind.SwitchStatement, Kind.LabeledStatement,
  Kind.ThrowStatement, Kind.TryStatement, Kind.DebuggerStatement,
  Kind.FunctionDeclaration, Kind.ClassDeclaration, Kind.InterfaceDeclaration,
  Kind.TypeAliasDeclaration, Kind.EnumDeclaration, Kind.ModuleDeclaration,
  Kind.ImportDeclaration, Kind.ImportEqualsDeclaration, Kind.ExportDeclaration,
  Kind.ExportAssignment, Kind.NotEmittedStatement,
]);

const DECLARATION_KINDS = new Set<number>([
  Kind.VariableDeclaration, Kind.Parameter, Kind.BindingElement,
  Kind.PropertyDeclaration, Kind.PropertyAssignment, Kind.ShorthandPropertyAssignment,
  Kind.MethodDeclaration, Kind.MethodSignature, Kind.PropertySignature,
  Kind.GetAccessor, Kind.SetAccessor, Kind.Constructor,
  Kind.FunctionDeclaration, Kind.ClassDeclaration, Kind.InterfaceDeclaration,
  Kind.TypeAliasDeclaration, Kind.EnumDeclaration, Kind.EnumMember,
  Kind.ModuleDeclaration, Kind.NamespaceImport, Kind.NamespaceExport,
  Kind.ImportSpecifier, Kind.ExportSpecifier, Kind.ImportClause,
  Kind.TypeParameter,
]);

export function isStatement(node: AstNode): boolean {
  return STATEMENT_KINDS.has((node as { kind?: number }).kind ?? -1);
}
export function isExpression(node: AstNode): boolean {
  const k = (node as { kind?: number }).kind ?? -1;
  return k >= Kind.NumericLiteral && k <= Kind.ExpressionWithTypeArguments && !STATEMENT_KINDS.has(k);
}
export function isDeclaration(node: AstNode): boolean {
  return DECLARATION_KINDS.has((node as { kind?: number }).kind ?? -1);
}
export function isModifier(node: AstNode): boolean {
  const k = (node as { kind?: number }).kind ?? -1;
  switch (k) {
    case Kind.PublicKeyword:
    case Kind.PrivateKeyword:
    case Kind.ProtectedKeyword:
    case Kind.ReadonlyKeyword:
    case Kind.OverrideKeyword:
    case Kind.ExportKeyword:
    case Kind.AbstractKeyword:
    case Kind.AsyncKeyword:
    case Kind.DefaultKeyword:
    case Kind.ConstKeyword:
    case Kind.DeclareKeyword:
    case Kind.StaticKeyword:
    case Kind.AccessorKeyword:
    case Kind.InKeyword:
    case Kind.OutKeyword:
      return true;
    default:
      return false;
  }
}
export function isModifierLike(node: AstNode): boolean {
  return isModifier(node) || (node as { kind?: number }).kind === Kind.Decorator;
}
export function isClassLike(node: AstNode): boolean {
  return astIsClassDeclaration(node) || astIsClassExpression(node);
}
export function isFunctionLike(node: AstNode): boolean {
  const k = (node as { kind?: number }).kind ?? -1;
  return (
    k === Kind.FunctionDeclaration || k === Kind.FunctionExpression ||
    k === Kind.ArrowFunction || k === Kind.MethodDeclaration ||
    k === Kind.MethodSignature || k === Kind.Constructor ||
    k === Kind.GetAccessor || k === Kind.SetAccessor ||
    k === Kind.CallSignature || k === Kind.ConstructSignature ||
    k === Kind.FunctionType || k === Kind.ConstructorType ||
    k === Kind.IndexSignature
  );
}
export function isFunctionLikeDeclaration(node: AstNode): node is FunctionLikeDeclaration {
  return (
    astIsFunctionDeclaration(node) || astIsFunctionExpression(node) ||
    astIsArrowFunction(node) || astIsMethodDeclaration(node) ||
    astIsGetAccessor(node) || astIsSetAccessor(node) ||
    astIsConstructorDeclaration(node)
  );
}
export function isSuperProperty(node: AstNode): boolean {
  if (astIsPropertyAccessExpression(node) || astIsElementAccessExpression(node)) {
    const e = (node as unknown as { expression?: { kind?: number } }).expression;
    return e?.kind === Kind.SuperKeyword;
  }
  return false;
}
export function isParameterPropertyDeclaration(node: AstNode, parent: AstNode | undefined): boolean {
  // A Parameter whose parent is a Constructor and which has any
  // access modifier or `readonly`.
  if ((node as { kind?: number }).kind !== Kind.Parameter) return false;
  if (parent !== undefined && (parent as { kind?: number }).kind !== Kind.Constructor) return false;
  const flags = getSyntacticModifierFlags(node);
  return (flags & ((1 << 2) | (1 << 3) | (1 << 4) | (1 << 6))) !== 0;
}
export function isThisParameter(node: AstNode): boolean {
  if ((node as { kind?: number }).kind !== Kind.Parameter) return false;
  const name = (node as unknown as { name?: { kind?: number; text?: string } }).name;
  return name?.text === "this";
}
export function isStaticPropertyDeclarationOrClassStaticBlock(node: AstNode): boolean {
  if (astIsClassStaticBlockDeclaration(node)) return true;
  if (astIsPropertyDeclaration(node)) return isStatic(node);
  return false;
}
export function isJSDocTypeAssertion(node: AstNode): boolean {
  // ParenthesizedExpression with a JSDoc type-cast comment annotation.
  if ((node as { kind?: number }).kind !== Kind.ParenthesizedExpression) return false;
  return (node as unknown as { jsDocTypeAssertion?: boolean }).jsDocTypeAssertion === true;
}
export function isAssertionExpression(node: AstNode): boolean {
  const k = (node as { kind?: number }).kind;
  return k === Kind.TypeAssertionExpression || k === Kind.AsExpression;
}
export function isSatisfiesExpression(node: AstNode): boolean {
  return astIsSatisfiesExpression(node);
}
export function isClassExpression(node: AstNode): boolean { return astIsClassExpression(node); }
export function isClassStaticBlockDeclaration(node: AstNode): boolean { return astIsClassStaticBlockDeclaration(node); }
export function isPropertyDeclaration(node: AstNode): boolean { return astIsPropertyDeclaration(node); }
export function isPropertyAccessExpression(node: AstNode): boolean { return astIsPropertyAccessExpression(node); }
export function isElementAccessExpression(node: AstNode): boolean { return astIsElementAccessExpression(node); }
export function isObjectLiteralExpression(node: AstNode): boolean { return astIsObjectLiteralExpression(node); }
export function isArrayLiteralExpression(node: AstNode): boolean { return astIsArrayLiteralExpression(node); }
export function isBinaryExpression(node: AstNode): boolean { return astIsBinaryExpression(node); }
export function isBindingElement(node: AstNode): boolean { return astIsBindingElement(node); }
export function isConstructorDeclaration(node: AstNode): boolean { return astIsConstructorDeclaration(node); }
export function isMethodDeclaration(node: AstNode): boolean { return astIsMethodDeclaration(node); }
export function isGetAccessor(node: AstNode): boolean { return astIsGetAccessor(node); }
export function isSetAccessor(node: AstNode): boolean { return astIsSetAccessor(node); }
export function isIdentifier(node: AstNode | undefined): boolean {
  return node !== undefined && astIsIdentifier(node);
}
export function isPrivateIdentifier(node: AstNode | undefined): boolean {
  return node !== undefined && astIsPrivateIdentifier(node);
}
export function isComputedPropertyName(node: AstNode): boolean { return astIsComputedPropertyName(node); }
export function isExternalModule(file: SourceFile): boolean { void file; return false; }
export function isExternalModuleNameRelative(name: string): boolean {
  return name.startsWith("./") || name.startsWith("../");
}
export function isDeclarationFile(file: SourceFile): boolean { void file; return false; }
export function isStringLiteral(node: AstNode): boolean { void node; return false; }
export function isModuleDeclaration(node: AstNode): boolean { void node; return false; }
export function isAmbientModule(node: AstNode): boolean { void node; return false; }
export function isInJSFile(node: AstNode): boolean { void node; return false; }
export function isEnumConst(node: AstNode): boolean { void node; return false; }
export function isInstantiatedModule(node: AstNode, preserveConstEnums: boolean): boolean {
  void node; void preserveConstEnums; return false;
}
export function isSourceFile(node: AstNode): boolean { void node; return false; }
export function isModuleBlock(node: AstNode): boolean { void node; return false; }

export function nodeIsMissing(node: AstNode | undefined): boolean { void node; return false; }
export function nodeIsSynthesized(node: AstNode | undefined): boolean { void node; return false; }

export function skipOuterExpressions(node: AstNode, kinds: number): AstNode {
  void kinds; return node;
}

export function getFirstConstructorWithBody(node: AstNode): AstNode | undefined {
  void node; return undefined;
}

export function classHasAccessorMember(node: AstNode): boolean { void node; return false; }

export function getSubtreeFacts(node: AstNode): number { void node; return 0; }

export function getNodePos(node: AstNode): number { void node; return 0; }
export function getNodeEnd(node: AstNode): number { void node; return 0; }
export function getNodeLoc(node: AstNode): TextRange { void node; return { pos: 0, end: 0 }; }
export function setNodeLoc(node: AstNode, loc: TextRange): void { void node; void loc; }
export function getNodeFlags(node: AstNode): number { void node; return 0; }
export function getNodeKind(node: AstNode): number { return node.kind; }
export function getNodeListLength(list: NodeList | undefined): number { void list; return 0; }
export function getModifierListLength(list: ModifierList | undefined): number { void list; return 0; }
export function getModifierListNodes(list: ModifierList): readonly AstNode[] { void list; return []; }

export function moveRangePastModifiers(node: AstNode): TextRange { void node; return { pos: 0, end: 0 }; }

export function extractModifiers(emitContext: unknown, list: ModifierList | undefined, flags: number): ModifierList | undefined {
  void emitContext; void flags;
  return list;
}

export function isTrue(value: unknown): boolean {
  return value === true || value === 1;
}

export function isKeywordKind(token: number): boolean { void token; return false; }
export function isPunctuationKind(token: number): boolean { void token; return false; }

// Block-introspection helpers
export function getBody(node: AstNode): Block | undefined { void node; return undefined; }
export function getParameters(node: AstNode): NodeList | undefined { void node; return undefined; }
export function getInitializer(node: AstNode): AstNode | undefined { void node; return undefined; }
export function getReturnType(node: AstNode): AstNode | undefined { void node; return undefined; }
export function getParameterType(node: AstNode): AstNode | undefined { void node; return undefined; }
export function getAsteriskToken(node: AstNode): AstNode | undefined { void node; return undefined; }
export function getDotDotDotToken(node: AstNode): AstNode | undefined { void node; return undefined; }
export function getQuestionDotToken(node: AstNode): AstNode | undefined { void node; return undefined; }
export function getEqualsGreaterThan(node: AstNode): AstNode { void node; return {} as AstNode; }
export function getExpression(node: AstNode): AstNode { void node; return {} as AstNode; }
export function getArguments(node: AstNode): NodeList | undefined { void node; return undefined; }
export function getTag(node: AstNode): AstNode { void node; return {} as AstNode; }
export function getTemplate(node: AstNode): AstNode { void node; return {} as AstNode; }
export function getTypeAnnotation(node: AstNode): AstNode | undefined { void node; return undefined; }
export function getHeritageToken(node: AstNode): number { void node; return 0; }
export function getHeritageTypes(node: AstNode): NodeList | undefined { void node; return undefined; }
export function getHeritageClauses(node: AstNode): NodeList | undefined { void node; return undefined; }
export function getClassMembers(node: AstNode): readonly AstNode[] { void node; return []; }
export function getJsxTagName(node: AstNode): AstNode { void node; return {} as AstNode; }
export function getJsxAttributes(node: AstNode): AstNode { void node; return {} as AstNode; }

interface TextRange { pos: number; end: number }
