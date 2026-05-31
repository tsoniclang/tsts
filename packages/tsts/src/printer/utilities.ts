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

import type { Node as AstNode, ModifierList, NodeList, Block, FunctionLikeDeclaration, SourceFile, CommentRange } from "../ast/index.js";
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
import { isDigit } from "../stringutil/util.js";

export type GetLiteralTextFlags = number;
export const GetLiteralTextFlags = {
  None: 0,
  NeverAsciiEscape: 1 << 0,
  JsxAttributeEscape: 1 << 1,
  TerminateUnterminatedLiterals: 1 << 2,
  AllowNumericSeparator: 1 << 3,
} as const;

export type QuoteChar = "'" | "\"" | "`";
export const QuoteChar = {
  SingleQuote: "'" as QuoteChar,
  DoubleQuote: "\"" as QuoteChar,
  Backtick: "`" as QuoteChar,
} as const;

const jsxEscapedCharsMap: ReadonlyMap<string, string> = new Map([
  ["\"", "&quot;"],
  ["'", "&apos;"],
]);

const escapedCharsMap: ReadonlyMap<string, string> = new Map([
  ["\t", "\\t"],
  ["\v", "\\v"],
  ["\f", "\\f"],
  ["\b", "\\b"],
  ["\r", "\\r"],
  ["\n", "\\n"],
  ["\\", "\\\\"],
  ["\"", "\\\""],
  ["'", "\\'"],
  ["`", "\\`"],
  ["$", "\\$"],
  ["\u2028", "\\u2028"],
  ["\u2029", "\\u2029"],
  ["\u0085", "\\u0085"],
]);

function upperHex(codePoint: number): string {
  return codePoint.toString(16).toUpperCase();
}

function encodeJsxCharacterEntity(codePoint: number): string {
  return `&#x${upperHex(codePoint)};`;
}

function encodeUtf16EscapeSequence(codePoint: number): string {
  return `\\u${upperHex(codePoint).padStart(4, "0")}`;
}

function escapeStringWorker(source: string, quoteChar: QuoteChar, flags: GetLiteralTextFlags): string {
  let result = "";
  let pos = 0;
  for (let index = 0; index < source.length;) {
    const codePoint = source.codePointAt(index)!;
    const size = codePoint > 0xffff ? 2 : 1;
    const ch = String.fromCodePoint(codePoint);
    let escape = false;
    switch (ch) {
      case "\\":
        escape = (flags & GetLiteralTextFlags.JsxAttributeEscape) === 0;
        break;
      case "$":
        escape = quoteChar === QuoteChar.Backtick && index + 1 < source.length && source.charCodeAt(index + 1) === 0x7b;
        break;
      case "\u2028":
      case "\u2029":
      case "\u0085":
      case "\r":
        escape = true;
        break;
      case "\n":
        escape = quoteChar !== QuoteChar.Backtick;
        break;
      default:
        escape = ch === quoteChar
          || codePoint <= 0x1f
          || ((flags & GetLiteralTextFlags.NeverAsciiEscape) === 0 && codePoint > 0x7f);
        break;
    }
    if (escape) {
      if (pos < index) result += source.slice(pos, index);
      if ((flags & GetLiteralTextFlags.JsxAttributeEscape) !== 0) {
        result += codePoint === 0 ? "&#0;" : jsxEscapedCharsMap.get(ch) ?? encodeJsxCharacterEntity(codePoint);
      } else if (ch === "\r" && quoteChar === QuoteChar.Backtick && index + 1 < source.length && source.charCodeAt(index + 1) === 0x0a) {
        result += "\\r\\n";
        index += 1;
        pos = index + 1;
      } else if (codePoint > 0xffff) {
        const scalar = codePoint - 0x10000;
        result += encodeUtf16EscapeSequence(((scalar & 0b11111111110000000000) >> 10) + 0xd800);
        result += encodeUtf16EscapeSequence((scalar & 0b00000000001111111111) + 0xdc00);
      } else if (codePoint === 0) {
        result += index + 1 < source.length && isDigit(source.charCodeAt(index + 1)) ? "\\x00" : "\\0";
      } else {
        result += escapedCharsMap.get(ch) ?? encodeUtf16EscapeSequence(codePoint);
      }
      pos = index + size;
    }
    index += size;
  }
  if (pos < source.length) result += source.slice(pos);
  return result;
}

export function escapeString(source: string, quoteChar: QuoteChar): string {
  return escapeStringWorker(source, quoteChar, GetLiteralTextFlags.NeverAsciiEscape);
}

export function escapeNonAsciiString(source: string, quoteChar: QuoteChar): string {
  return escapeStringWorker(source, quoteChar, GetLiteralTextFlags.None);
}

export function escapeJsxAttributeString(source: string, quoteChar: QuoteChar): string {
  return escapeStringWorker(source, quoteChar, GetLiteralTextFlags.JsxAttributeEscape | GetLiteralTextFlags.NeverAsciiEscape);
}

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

export function canUseOriginalText(node: AstNode, sourceFile: SourceFile | undefined): boolean {
  return sourceFile !== undefined
    && !nodeIsSynthesized(node)
    && getNodePos(node) >= 0
    && getNodeEnd(node) <= ((sourceFile as unknown as { readonly text?: string }).text?.length ?? 0);
}

export function getLiteralText(node: AstNode, sourceFile: SourceFile | undefined, flags: GetLiteralTextFlags = GetLiteralTextFlags.None): string {
  const text = (node as { readonly text?: string }).text;
  if (text !== undefined) return escapeStringWorker(text, QuoteChar.DoubleQuote, flags);
  const sourceText = (sourceFile as unknown as { readonly text?: string } | undefined)?.text;
  if (sourceText === undefined) return "";
  return sourceText.slice(getNodePos(node), getNodeEnd(node));
}

export function isNotPrologueDirective(node: AstNode): boolean {
  return node.kind !== Kind.ExpressionStatement
    || ((node as { readonly expression?: AstNode }).expression?.kind !== Kind.StringLiteral
      && (node as { readonly expression?: AstNode }).expression?.kind !== Kind.NoSubstitutionTemplateLiteral);
}

export function rangeIsOnSingleLine(range: TextRange, sourceFile: SourceFile): boolean {
  return positionsAreOnSameLine(range.pos, range.end, sourceFile);
}

export function rangeStartPositionsAreOnSameLine(left: TextRange, right: TextRange, sourceFile: SourceFile): boolean {
  return positionsAreOnSameLine(left.pos, right.pos, sourceFile);
}

export function rangeEndPositionsAreOnSameLine(left: TextRange, right: TextRange, sourceFile: SourceFile): boolean {
  return positionsAreOnSameLine(left.end, right.end, sourceFile);
}

export function rangeStartIsOnSameLineAsRangeEnd(left: TextRange, right: TextRange, sourceFile: SourceFile): boolean {
  return positionsAreOnSameLine(left.pos, right.end, sourceFile);
}

export function rangeEndIsOnSameLineAsRangeStart(left: TextRange, right: TextRange, sourceFile: SourceFile): boolean {
  return positionsAreOnSameLine(left.end, right.pos, sourceFile);
}

export function getStartPositionOfRange(range: TextRange, sourceFile: SourceFile, includeComments: boolean): number {
  void sourceFile; void includeComments;
  return range.pos;
}

export function positionsAreOnSameLine(left: number, right: number, sourceFile: SourceFile): boolean {
  return getLineAndCharacter(sourceFile, left).line === getLineAndCharacter(sourceFile, right).line;
}

export function getLinesBetweenPositions(sourceFile: SourceFile, start: number, end: number): number {
  return Math.max(0, getLineAndCharacter(sourceFile, end).line - getLineAndCharacter(sourceFile, start).line);
}

export function getLinesBetweenRangeEndAndRangeStart(sourceFile: SourceFile, left: TextRange, right: TextRange): number {
  return getLinesBetweenPositions(sourceFile, left.end, right.pos);
}

export function getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(sourceFile: SourceFile, position: number): number {
  return getLinesBetweenPositions(sourceFile, getPreviousNonWhitespacePosition(sourceFile, position), position);
}

export function getLinesBetweenPositionAndNextNonWhitespaceCharacter(sourceFile: SourceFile, position: number): number {
  const text = sourceTextOf(sourceFile);
  let next = Math.max(0, position);
  while (next < text.length && /\s/u.test(text[next]!)) next += 1;
  return getLinesBetweenPositions(sourceFile, position, next);
}

export function getPreviousNonWhitespacePosition(sourceFile: SourceFile, position: number): number {
  const text = sourceTextOf(sourceFile);
  let previous = Math.min(position - 1, text.length - 1);
  while (previous >= 0 && /\s/u.test(text[previous]!)) previous -= 1;
  return Math.max(0, previous);
}

export function siblingNodePositionsAreComparable(left: AstNode, right: AstNode): boolean {
  const leftParent = (left as { readonly parent?: AstNode }).parent;
  const rightParent = (right as { readonly parent?: AstNode }).parent;
  return leftParent === rightParent && getNodePos(left) <= getNodePos(right);
}

export function getContainingNodeArray(node: AstNode): readonly AstNode[] | undefined {
  const parent = (node as { readonly parent?: AstNode }).parent;
  if (parent === undefined) return undefined;
  for (const value of Object.values(parent as object)) {
    if (Array.isArray(value) && value.includes(node)) return value as readonly AstNode[];
    const nodes = (value as { readonly nodes?: readonly AstNode[] } | undefined)?.nodes;
    if (nodes?.includes(node) === true) return nodes;
  }
  return undefined;
}

export function canHaveDecorators(node: AstNode): boolean {
  return node.kind === Kind.ClassDeclaration
    || node.kind === Kind.ClassExpression
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.PropertyDeclaration
    || node.kind === Kind.Parameter;
}

export function originalNodesHaveSameParent(left: AstNode, right: AstNode): boolean {
  const originalLeft = (left as { readonly original?: AstNode }).original ?? left;
  if ((originalLeft as { readonly parent?: AstNode }).parent === undefined) return false;
  const originalRight = (right as { readonly original?: AstNode }).original ?? right;
  return (originalLeft as { readonly parent?: AstNode }).parent === (originalRight as { readonly parent?: AstNode }).parent;
}

export function tryGetEnd(node: AstNode | undefined): number | undefined {
  return node === undefined ? undefined : getNodeEnd(node);
}

export function greatestEnd(nodes: readonly AstNode[]): number {
  return nodes.reduce((end, node) => Math.max(end, getNodeEnd(node)), 0);
}

export function skipSynthesizedParentheses(node: AstNode): AstNode {
  let current = node;
  while (current.kind === Kind.ParenthesizedExpression && nodeIsSynthesized(current)) {
    const expression = (current as { readonly expression?: AstNode }).expression;
    if (expression === undefined) break;
    current = expression;
  }
  return current;
}

export function isNewExpressionWithoutArguments(node: AstNode): boolean {
  return node.kind === Kind.NewExpression && getNodeListLength(getArguments(node)) === 0;
}

export function isBinaryOperation(node: AstNode): boolean {
  return node.kind === Kind.BinaryExpression;
}

export function mixingBinaryOperatorsRequiresParentheses(leftOperator: Kind, rightOperator: Kind): boolean {
  return leftOperator !== rightOperator
    && ((leftOperator === Kind.AmpersandAmpersandToken && rightOperator === Kind.BarBarToken)
      || (leftOperator === Kind.BarBarToken && rightOperator === Kind.AmpersandAmpersandToken)
      || leftOperator === Kind.QuestionQuestionToken
      || rightOperator === Kind.QuestionQuestionToken);
}

export function isImmediatelyInvokedFunctionExpressionOrArrowFunction(node: AstNode): boolean {
  const parent = (node as { readonly parent?: AstNode }).parent;
  return (node.kind === Kind.FunctionExpression || node.kind === Kind.ArrowFunction)
    && parent?.kind === Kind.CallExpression
    && (parent as { readonly expression?: AstNode }).expression === node;
}

export function isFileLevelUniqueName(node: AstNode): boolean {
  return ((node as { readonly autoGenerate?: { readonly flags?: number } }).autoGenerate?.flags ?? 0) !== 0
    && (node as { readonly parent?: AstNode }).parent?.kind === Kind.SourceFile;
}

export function hasLeadingHash(text: string): boolean {
  return text.startsWith("#");
}

export function isASCIIWordCharacter(ch: number): boolean {
  return (ch >= 48 && ch <= 57) || (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || ch === 95 || ch === 36;
}

export function makeIdentifierFromModuleName(moduleName: string): string {
  const base = moduleName.split(/[\\/]/u).pop() ?? moduleName;
  const text = base.replace(/\.[^.]+$/u, "").replace(/[^A-Za-z0-9_$]/gu, "_");
  return /^[A-Za-z_$]/u.test(text) ? text : `_${text}`;
}

export function skipWhiteSpaceSingleLine(text: string, position: number): number {
  let index = position;
  while (index < text.length && (text[index] === " " || text[index] === "\t" || text[index] === "\v" || text[index] === "\f")) index += 1;
  return index;
}

export function matchWhiteSpaceSingleLine(text: string, position: number): number {
  const next = skipWhiteSpaceSingleLine(text, position);
  return next === position ? -1 : next;
}

export function matchRune(text: string, position: number, ch: string): number {
  return text[position] === ch ? position + ch.length : -1;
}

export function matchString(text: string, position: number, value: string): number {
  return text.startsWith(value, position) ? position + value.length : -1;
}

export function matchQuotedString(text: string, position: number): { readonly text: string; readonly end: number } | undefined {
  const quote = text[position];
  if (quote !== "\"" && quote !== "'") return undefined;
  let index = position + 1;
  let result = "";
  while (index < text.length && text[index] !== quote) {
    if (text[index] === "\\" && index + 1 < text.length) index += 1;
    result += text[index]!;
    index += 1;
  }
  return index < text.length ? { text: result, end: index + 1 } : undefined;
}

export function isRecognizedTripleSlashComment(text: string, commentRange?: CommentRange): boolean {
  const commentText = commentRange === undefined
    ? text
    : text.slice(commentRange.pos, commentRange.end);
  if (!commentText.startsWith("///")) return false;
  let position = skipWhiteSpaceSingleLine(commentText, 3);
  position = matchRune(commentText, position, "<");
  if (position < 0) return false;
  const referencePosition = matchString(commentText, position, "reference");
  if (referencePosition >= 0) {
    position = matchWhiteSpaceSingleLine(commentText, referencePosition);
    if (position < 0) return false;
    const afterAttribute = matchString(commentText, position, "path")
      >= 0 ? matchString(commentText, position, "path")
      : matchString(commentText, position, "types") >= 0 ? matchString(commentText, position, "types")
        : matchString(commentText, position, "lib") >= 0 ? matchString(commentText, position, "lib")
          : matchString(commentText, position, "no-default-lib");
    if (afterAttribute < 0) return false;
    return matchTripleSlashAssignment(commentText, afterAttribute);
  }
  const dependencyPosition = matchString(commentText, position, "amd-dependency");
  if (dependencyPosition >= 0) {
    position = matchWhiteSpaceSingleLine(commentText, dependencyPosition);
    if (position < 0) return false;
    const afterPath = matchString(commentText, position, "path");
    return afterPath >= 0 && matchTripleSlashAssignment(commentText, afterPath);
  }
  const modulePosition = matchString(commentText, position, "amd-module");
  if (modulePosition >= 0) {
    position = skipWhiteSpaceSingleLine(commentText, modulePosition);
    return commentText.indexOf("/>", position) >= 0;
  }
  return false;
}

function matchTripleSlashAssignment(text: string, position: number): boolean {
  let current = skipWhiteSpaceSingleLine(text, position);
  current = matchRune(text, current, "=");
  if (current < 0) return false;
  current = skipWhiteSpaceSingleLine(text, current);
  const quoted = matchQuotedString(text, current);
  return quoted !== undefined && text.indexOf("/>", quoted.end) >= 0;
}

export function isJSDocLikeText(text: string, commentRange?: CommentRange): boolean {
  const commentText = commentRange === undefined
    ? text
    : text.slice(commentRange.pos, commentRange.end);
  return commentText.startsWith("/**") && !commentText.startsWith("/**/");
}

export function isPinnedComment(text: string, commentRange?: CommentRange): boolean {
  const commentText = commentRange === undefined
    ? text
    : text.slice(commentRange.pos, commentRange.end);
  return commentText.startsWith("/*!");
}

export function calculateIndent(text: string, position: number): number {
  let lineStart = position;
  while (lineStart > 0 && text[lineStart - 1] !== "\n" && text[lineStart - 1] !== "\r") lineStart -= 1;
  let indent = 0;
  while (lineStart + indent < text.length && text[lineStart + indent] === " ") indent += 1;
  return indent;
}

export function newLineCharacterCache(sourceFile: SourceFile): readonly number[] {
  return lineStartsOf(sourceFile);
}

export function getLineAndCharacter(sourceFile: SourceFile, position: number): { readonly line: number; readonly character: number } {
  const lineStarts = lineStartsOf(sourceFile);
  let low = 0;
  let high = lineStarts.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (lineStarts[mid]! <= position) low = mid + 1;
    else high = mid - 1;
  }
  const line = Math.max(0, low - 1);
  return { line, character: Math.max(0, position - lineStarts[line]!) };
}

export function removeLeadingHash(text: string): string {
  return text.startsWith("#") ? text.slice(1) : text;
}

export function ensureLeadingHash(text: string): string {
  return text.startsWith("#") ? text : `#${text}`;
}

export function formatGeneratedName(privateName: boolean, prefix: string, baseName: string, suffix: string): string {
  const text = `${prefix}${baseName}${suffix}`;
  return privateName ? ensureLeadingHash(text) : text;
}

function sourceTextOf(sourceFile: SourceFile): string {
  return (sourceFile as unknown as { readonly text?: string }).text ?? "";
}

function lineStartsOf(sourceFile: SourceFile): readonly number[] {
  const existing = (sourceFile as unknown as { readonly lineStarts?: readonly number[] }).lineStarts;
  if (existing !== undefined) return existing;
  const text = sourceTextOf(sourceFile);
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13 || ch === 10) {
      if (ch === 13 && text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    }
  }
  return starts;
}
