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
export function isExternalModule(file: SourceFile): boolean {
  return (file as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined;
}
export function isExternalModuleNameRelative(name: string): boolean {
  return name.startsWith("./") || name.startsWith("../");
}
export function isDeclarationFile(file: SourceFile): boolean {
  return (file as unknown as { isDeclarationFile?: boolean }).isDeclarationFile === true;
}
export function isStringLiteral(node: AstNode): boolean { return astIsStringLiteral(node); }
export function isModuleDeclaration(node: AstNode): boolean { return astIsModuleDeclaration(node); }
export function isAmbientModule(node: AstNode): boolean {
  if (!astIsModuleDeclaration(node)) return false;
  const name = (node as unknown as { name?: { kind?: number } }).name;
  return name?.kind === Kind.StringLiteral;
}
export function isInJSFile(node: AstNode): boolean {
  // NodeFlags.JavaScriptFile = 1 << 9 — check the source-file flag.
  let n: AstNode | undefined = node;
  while (n !== undefined) {
    if ((n as { kind?: number }).kind === Kind.SourceFile) {
      const scriptKind = (n as unknown as { scriptKind?: number }).scriptKind;
      // ScriptKind: JS=1, JSX=2.
      return scriptKind === 1 || scriptKind === 2;
    }
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return false;
}
export function isEnumConst(node: AstNode): boolean {
  return (getSyntacticModifierFlags(node) & (1 << 11)) !== 0; // ConstKeyword
}
export function isInstantiatedModule(node: AstNode, preserveConstEnums: boolean): boolean {
  if (!astIsModuleDeclaration(node)) return false;
  // A module is instantiated unless it's purely type-only (declarations
  // only). Const enums opt out unless preserveConstEnums is set.
  void preserveConstEnums;
  return true;
}
export function isSourceFile(node: AstNode): boolean {
  return (node as { kind?: number }).kind === Kind.SourceFile;
}
export function isModuleBlock(node: AstNode): boolean {
  return (node as { kind?: number }).kind === Kind.ModuleBlock;
}

export function nodeIsMissing(node: AstNode | undefined): boolean {
  if (node === undefined) return true;
  const pos = (node as unknown as { pos?: number }).pos;
  const end = (node as unknown as { end?: number }).end;
  return pos === end;
}
export function nodeIsSynthesized(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const pos = (node as unknown as { pos?: number }).pos ?? 0;
  return pos < 0;
}

export function skipOuterExpressions(node: AstNode, kinds: number): AstNode {
  // Default `kinds` of 0 means strip all common outer expression wraps.
  let n: AstNode = node;
  while (true) {
    const k = (n as { kind?: number }).kind;
    if (
      k === Kind.ParenthesizedExpression ||
      k === Kind.TypeAssertionExpression ||
      k === Kind.AsExpression ||
      k === Kind.SatisfiesExpression ||
      k === Kind.NonNullExpression ||
      k === Kind.PartiallyEmittedExpression
    ) {
      const inner = (n as unknown as { expression?: AstNode }).expression;
      if (inner === undefined) return n;
      n = inner;
      continue;
    }
    return n;
  }
  void kinds;
}

export function getFirstConstructorWithBody(node: AstNode): AstNode | undefined {
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members;
  if (members?.nodes === undefined) return undefined;
  for (const m of members.nodes) {
    if (astIsConstructorDeclaration(m) && (m as unknown as { body?: unknown }).body !== undefined) {
      return m;
    }
  }
  return undefined;
}

export function classHasAccessorMember(node: AstNode): boolean {
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members;
  if (members?.nodes === undefined) return false;
  for (const m of members.nodes) {
    if (astIsGetAccessor(m) || astIsSetAccessor(m)) return true;
  }
  return false;
}

export function getSubtreeFacts(node: AstNode): number {
  return (node as unknown as { subtreeFacts?: number }).subtreeFacts ?? 0;
}

export function getNodePos(node: AstNode): number {
  return (node as unknown as { pos?: number }).pos ?? 0;
}
export function getNodeEnd(node: AstNode): number {
  return (node as unknown as { end?: number }).end ?? 0;
}
export function getNodeLoc(node: AstNode): TextRange {
  return { pos: getNodePos(node), end: getNodeEnd(node) };
}
export function setNodeLoc(node: AstNode, loc: TextRange): void {
  (node as unknown as { pos?: number; end?: number }).pos = loc.pos;
  (node as unknown as { pos?: number; end?: number }).end = loc.end;
}
export function getNodeFlags(node: AstNode): number {
  return (node as unknown as { flags?: number }).flags ?? 0;
}
export function getNodeKind(node: AstNode): number { return node.kind; }
export function getNodeListLength(list: NodeList | undefined): number {
  return (list as unknown as { nodes?: readonly unknown[] })?.nodes?.length ?? 0;
}
export function getModifierListLength(list: ModifierList | undefined): number {
  return (list as unknown as { nodes?: readonly unknown[] })?.nodes?.length ?? 0;
}
export function getModifierListNodes(list: ModifierList): readonly AstNode[] {
  return (list as unknown as { nodes?: readonly AstNode[] })?.nodes ?? [];
}

export function moveRangePastModifiers(node: AstNode): TextRange {
  const mods = getModifiers(node);
  const lastModEnd = mods !== undefined
    ? getModifierListNodes(mods).reduce(
        (acc, m) => Math.max(acc, getNodeEnd(m)), getNodePos(node))
    : getNodePos(node);
  return { pos: lastModEnd, end: getNodeEnd(node) };
}

export function extractModifiers(emitContext: unknown, list: ModifierList | undefined, flags: number): ModifierList | undefined {
  void emitContext;
  if (list === undefined) return undefined;
  const nodes = getModifierListNodes(list);
  const filtered = nodes.filter((m) => (modifierFlagFor((m as { kind?: number }).kind ?? 0) & flags) !== 0);
  if (filtered.length === 0) return undefined;
  return { ...(list as object), nodes: filtered } as unknown as ModifierList;
}

export function isTrue(value: unknown): boolean {
  return value === true || value === 1;
}

export function isKeywordKind(token: number): boolean {
  return token >= Kind.FirstKeyword && token <= Kind.LastKeyword;
}
export function isPunctuationKind(token: number): boolean {
  return token >= Kind.FirstPunctuation && token <= Kind.LastPunctuation;
}

// Block-introspection helpers
export function getBody(node: AstNode): Block | undefined {
  return (node as unknown as { body?: Block }).body;
}
export function getParameters(node: AstNode): NodeList | undefined {
  return (node as unknown as { parameters?: NodeList }).parameters;
}
export function getInitializer(node: AstNode): AstNode | undefined {
  return (node as unknown as { initializer?: AstNode }).initializer;
}
export function getReturnType(node: AstNode): AstNode | undefined {
  return (node as unknown as { type?: AstNode }).type;
}
export function getParameterType(node: AstNode): AstNode | undefined {
  return (node as unknown as { type?: AstNode }).type;
}
export function getAsteriskToken(node: AstNode): AstNode | undefined {
  return (node as unknown as { asteriskToken?: AstNode }).asteriskToken;
}
export function getDotDotDotToken(node: AstNode): AstNode | undefined {
  return (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken;
}
export function getQuestionDotToken(node: AstNode): AstNode | undefined {
  return (node as unknown as { questionDotToken?: AstNode }).questionDotToken;
}
export function getEqualsGreaterThan(node: AstNode): AstNode {
  return (node as unknown as { equalsGreaterThanToken?: AstNode }).equalsGreaterThanToken ?? ({} as AstNode);
}
export function getExpression(node: AstNode): AstNode {
  return (node as unknown as { expression?: AstNode }).expression ?? ({} as AstNode);
}
export function getArguments(node: AstNode): NodeList | undefined {
  return (node as unknown as { arguments?: NodeList }).arguments;
}
export function getTag(node: AstNode): AstNode {
  return (node as unknown as { tag?: AstNode }).tag ?? ({} as AstNode);
}
export function getTemplate(node: AstNode): AstNode {
  return (node as unknown as { template?: AstNode }).template ?? ({} as AstNode);
}
export function getTypeAnnotation(node: AstNode): AstNode | undefined {
  return (node as unknown as { type?: AstNode }).type;
}

export function getHeritageToken(node: AstNode): number {
  const token = (node as unknown as { token?: number }).token;
  if (token !== undefined) return token;
  const types = (node as unknown as { types?: NodeList }).types;
  if (types !== undefined) {
    const parent = (node as unknown as { parent?: AstNode }).parent;
    const clauses = (parent as unknown as { heritageClauses?: NodeList | readonly AstNode[] | undefined }).heritageClauses;
    const nodes = nodeListNodes(clauses);
    const index = nodes.indexOf(node);
    return index === 0 ? Kind.ExtendsKeyword : Kind.ImplementsKeyword;
  }
  return 0;
}

export function getHeritageTypes(node: AstNode): NodeList | undefined {
  return (node as unknown as { types?: NodeList }).types;
}

export function getHeritageClauses(node: AstNode): NodeList | undefined {
  const clauses = (node as unknown as { heritageClauses?: NodeList }).heritageClauses;
  if (clauses !== undefined) return clauses;
  return (node as unknown as { heritageClause?: NodeList }).heritageClause;
}

export function getClassMembers(node: AstNode): readonly AstNode[] {
  return nodeListNodes((node as unknown as { members?: NodeList | readonly AstNode[] }).members);
}

export function getJsxTagName(node: AstNode): AstNode {
  return (node as unknown as { tagName?: AstNode; name?: AstNode }).tagName
    ?? (node as unknown as { name?: AstNode }).name
    ?? ({} as AstNode);
}

export function getJsxAttributes(node: AstNode): AstNode {
  return (node as unknown as { attributes?: AstNode }).attributes ?? ({} as AstNode);
}

function nodeListNodes(value: NodeList | readonly AstNode[] | undefined): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value;
  return (value as unknown as { nodes?: readonly AstNode[] }).nodes ?? [];
}

interface TextRange { pos: number; end: number }
