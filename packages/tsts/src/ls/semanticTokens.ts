/**
 * Semantic-token classification and LSP relative encoding.
 *
 * Port of TS-Go `internal/ls/semantictokens.go`.
 */

import {
  Kind,
  NodeFlags,
  SymbolFlags,
  type Node as AstNode,
  type SourceFile,
} from "../ast/index.js";
import { SignatureKind, TypeFlags, type Type } from "../checker/types.js";
import { ModifierFlags } from "../enums/index.js";
import {
  SemanticTokenModifierAbstract,
  SemanticTokenModifierAsync,
  SemanticTokenModifierDeclaration,
  SemanticTokenModifierDefaultLibrary,
  SemanticTokenModifierDefinition,
  SemanticTokenModifierDeprecated,
  SemanticTokenModifierDocumentation,
  SemanticTokenModifierModification,
  SemanticTokenModifierReadonly,
  SemanticTokenModifierStatic,
  SemanticTokenTypeClass,
  SemanticTokenTypeComment,
  SemanticTokenTypeDecorator,
  SemanticTokenTypeEnum,
  SemanticTokenTypeEnumMember,
  SemanticTokenTypeEvent,
  SemanticTokenTypeFunction,
  SemanticTokenTypeInterface,
  SemanticTokenTypeKeyword,
  SemanticTokenTypeLabel,
  SemanticTokenTypeMacro,
  SemanticTokenTypeMethod,
  SemanticTokenTypeNamespace,
  SemanticTokenTypeNumber,
  SemanticTokenTypeOperator,
  SemanticTokenTypeParameter,
  SemanticTokenTypeProperty,
  SemanticTokenTypeRegexp,
  SemanticTokenTypeString,
  SemanticTokenTypeStruct,
  SemanticTokenTypeType,
  SemanticTokenTypeTypeParameter,
  SemanticTokenTypeVariable,
  type Position,
  type Range,
  type ResolvedSemanticTokensClientCapabilities,
  type SemanticTokenModifier,
  type SemanticTokenType,
  type SemanticTokensLegend,
  type SemanticTokensRangeResponse,
  type SemanticTokensResponse,
} from "../lsp/lsproto/index.js";
import { SemanticMeaning } from "./semanticMeaning.js";
export { SemanticMeaning } from "./semanticMeaning.js";

export const semanticTokenTypes: readonly SemanticTokenType[] = [
  SemanticTokenTypeNamespace,
  SemanticTokenTypeClass,
  SemanticTokenTypeEnum,
  SemanticTokenTypeInterface,
  SemanticTokenTypeStruct,
  SemanticTokenTypeTypeParameter,
  SemanticTokenTypeType,
  SemanticTokenTypeParameter,
  SemanticTokenTypeVariable,
  SemanticTokenTypeProperty,
  SemanticTokenTypeEnumMember,
  SemanticTokenTypeDecorator,
  SemanticTokenTypeEvent,
  SemanticTokenTypeFunction,
  SemanticTokenTypeMethod,
  SemanticTokenTypeMacro,
  SemanticTokenTypeLabel,
  SemanticTokenTypeComment,
  SemanticTokenTypeString,
  SemanticTokenTypeKeyword,
  SemanticTokenTypeNumber,
  SemanticTokenTypeRegexp,
  SemanticTokenTypeOperator,
];

export const semanticTokenModifiers: readonly SemanticTokenModifier[] = [
  SemanticTokenModifierDeclaration,
  SemanticTokenModifierDefinition,
  SemanticTokenModifierReadonly,
  SemanticTokenModifierStatic,
  SemanticTokenModifierDeprecated,
  SemanticTokenModifierAbstract,
  SemanticTokenModifierAsync,
  SemanticTokenModifierModification,
  SemanticTokenModifierDocumentation,
  SemanticTokenModifierDefaultLibrary,
  "local",
];

export enum SemanticTokenKind {
  Namespace = 0,
  Class = 1,
  Enum = 2,
  Interface = 3,
  Struct = 4,
  TypeParameter = 5,
  Type = 6,
  Parameter = 7,
  Variable = 8,
  Property = 9,
  EnumMember = 10,
  Decorator = 11,
  Event = 12,
  Function = 13,
  Method = 14,
  Macro = 15,
  Label = 16,
  Comment = 17,
  String = 18,
  Keyword = 19,
  Number = 20,
  Regexp = 21,
  Operator = 22,
}

export enum SemanticTokenModifierFlag {
  Declaration = 1 << 0,
  Definition = 1 << 1,
  Readonly = 1 << 2,
  Static = 1 << 3,
  Deprecated = 1 << 4,
  Abstract = 1 << 5,
  Async = 1 << 6,
  Modification = 1 << 7,
  Documentation = 1 << 8,
  DefaultLibrary = 1 << 9,
  Local = 1 << 10,
}

export interface SemanticTokenSymbol {
  readonly flags?: SymbolFlags;
  readonly valueDeclaration?: SemanticTokenDeclaration;
  readonly declarations?: readonly SemanticTokenDeclaration[];
}

export interface SemanticTokenDeclaration {
  readonly kind: Kind;
  readonly parent?: SemanticTokenDeclaration;
  readonly flags?: number;
  readonly modifierFlags?: ModifierFlags;
  readonly nodeFlags?: NodeFlags;
  readonly sourceFile?: unknown;
  getSourceFile?(): unknown;
}

export interface SemanticTokenTreeNode extends SemanticTokenDeclaration {
  readonly pos: number;
  readonly end: number;
  readonly parent: SemanticTokenTreeNode;
  readonly flags: number;
  readonly text?: string;
  forEachChild(
    visitor: (node: SemanticTokenTreeNode) => boolean | undefined,
    visitArray?: (nodes: readonly SemanticTokenTreeNode[]) => boolean | undefined,
  ): boolean | undefined;
}

export interface SemanticTokenSourceFile<Node extends SemanticTokenTreeNode = SemanticTokenTreeNode> extends SemanticTokenTreeNode {
  readonly kind: Kind.SourceFile;
  readonly fileName?: string;
  readonly path?: string;
  readonly statements?: readonly Node[];
}

export interface SemanticTokenTypeChecker<
  Node extends SemanticTokenTreeNode = SemanticTokenTreeNode,
  Symbol extends SemanticTokenSymbol = SemanticTokenSymbol,
  TokenType = Type,
> {
  getSymbolAtLocation(node: Node): Symbol | undefined;
  getAliasedSymbol?(symbol: Symbol): Symbol | undefined;
  getTypeAtLocation?(node: Node): TokenType | undefined;
  getSignaturesOfType?(type: TokenType, kind: SignatureKind): readonly unknown[];
}

export interface SemanticTokenProgram<SourceFileNode extends SemanticTokenSourceFile = SemanticTokenSourceFile> {
  isSourceFileDefaultLibrary?(path: string): boolean;
  sourceFilePath?(sourceFile: SourceFileNode): string;
}

export interface SemanticTokenCollectionOptions {
  readonly isCancellationRequested?: () => boolean;
}

export interface SemanticTokenLike<Node = unknown> {
  readonly node: Node;
  readonly tokenType: SemanticTokenKind;
  readonly tokenModifier: number;
}

export interface SemanticTokenNodeLocation {
  readonly range: Range;
  readonly offset: number;
}

export interface SemanticTokenPositionProvider<Node> {
  tokenLocation(node: Node): SemanticTokenNodeLocation;
}

export interface SemanticTokenCollector<Node = unknown> {
  collectSemanticTokens(): readonly SemanticTokenLike<Node>[];
  collectSemanticTokensInRange(range: Range): readonly SemanticTokenLike<Node>[];
}

export function semanticTokensLegend(
  clientCapabilities: ResolvedSemanticTokensClientCapabilities,
): SemanticTokensLegend {
  const supportedTypes = new Set<string>(clientCapabilities.tokenTypes ?? []);
  const supportedModifiers = new Set<string>(clientCapabilities.tokenModifiers ?? []);
  const tokenTypes: string[] = [];
  const tokenModifiers: string[] = [];

  for (const tokenType of semanticTokenTypes) {
    if (supportedTypes.has(tokenType)) {
      tokenTypes.push(tokenType);
    }
  }
  for (const tokenModifier of semanticTokenModifiers) {
    if (supportedModifiers.has(tokenModifier)) {
      tokenModifiers.push(tokenModifier);
    }
  }

  return { tokenTypes, tokenModifiers };
}

export function classifySymbol(
  symbol: SemanticTokenSymbol,
  meaning: SemanticMeaning,
): readonly [SemanticTokenKind, boolean] {
  const flags = symbol.flags ?? 0;
  if ((flags & SymbolFlags.Class) !== 0) return [SemanticTokenKind.Class, true];
  if ((flags & SymbolFlags.Enum) !== 0) return [SemanticTokenKind.Enum, true];
  if ((flags & SymbolFlags.TypeAlias) !== 0) return [SemanticTokenKind.Type, true];
  if ((flags & SymbolFlags.Interface) !== 0 && (meaning & SemanticMeaning.Type) !== 0) {
    return [SemanticTokenKind.Interface, true];
  }
  if ((flags & SymbolFlags.TypeParameter) !== 0) return [SemanticTokenKind.TypeParameter, true];

  let declaration = symbol.valueDeclaration;
  if (declaration === undefined) {
    declaration = symbol.declarations?.[0];
  }
  if (declaration !== undefined) {
    const kind = tokenFromDeclarationMapping(declaration.kind);
    if (kind !== undefined) {
      return [kind, true];
    }
  }

  return [SemanticTokenKind.Namespace, false];
}

export function tokenFromDeclarationMapping(kind: Kind): SemanticTokenKind | undefined {
  switch (kind) {
    case Kind.VariableDeclaration:
      return SemanticTokenKind.Variable;
    case Kind.Parameter:
      return SemanticTokenKind.Parameter;
    case Kind.PropertyDeclaration:
      return SemanticTokenKind.Property;
    case Kind.ModuleDeclaration:
      return SemanticTokenKind.Namespace;
    case Kind.EnumDeclaration:
      return SemanticTokenKind.Enum;
    case Kind.EnumMember:
      return SemanticTokenKind.EnumMember;
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
      return SemanticTokenKind.Class;
    case Kind.MethodDeclaration:
      return SemanticTokenKind.Method;
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
      return SemanticTokenKind.Function;
    case Kind.MethodSignature:
      return SemanticTokenKind.Method;
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return SemanticTokenKind.Property;
    case Kind.PropertySignature:
      return SemanticTokenKind.Property;
    case Kind.InterfaceDeclaration:
      return SemanticTokenKind.Interface;
    case Kind.TypeAliasDeclaration:
      return SemanticTokenKind.Type;
    case Kind.TypeParameter:
      return SemanticTokenKind.TypeParameter;
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
      return SemanticTokenKind.Property;
    default:
      return undefined;
  }
}

export function declarationModifiers(declaration: SemanticTokenDeclaration): number {
  let modifiers = 0;
  const modifierFlags = combinedModifierFlags(declaration);
  const nodeFlags = combinedNodeFlags(declaration);
  if ((modifierFlags & ModifierFlags.Static) !== 0) modifiers |= SemanticTokenModifierFlag.Static;
  if ((modifierFlags & ModifierFlags.Async) !== 0) modifiers |= SemanticTokenModifierFlag.Async;
  if ((modifierFlags & ModifierFlags.Readonly) !== 0 || (nodeFlags & NodeFlags.Const) !== 0) {
    modifiers |= SemanticTokenModifierFlag.Readonly;
  }
  if ((modifierFlags & ModifierFlags.Deprecated) !== 0) modifiers |= SemanticTokenModifierFlag.Deprecated;
  if ((modifierFlags & ModifierFlags.Abstract) !== 0) modifiers |= SemanticTokenModifierFlag.Abstract;
  return modifiers;
}

export function isLocalDeclaration(declaration: SemanticTokenDeclaration, sourceFile: unknown): boolean {
  const localDeclaration = declaration.kind === Kind.BindingElement
    ? getDeclarationForBindingElement(declaration)
    : declaration;
  const localSourceFile = sourceFileOfDeclaration(localDeclaration);
  if (localDeclaration.kind === Kind.VariableDeclaration) {
    const parent = localDeclaration.parent;
    if (parent !== undefined && parent.kind === Kind.CatchClause) {
      return localSourceFile === sourceFile;
    }
    if (parent !== undefined && parent.kind === Kind.VariableDeclarationList) {
      const grandParent = parent.parent;
      const greatGrandParent = grandParent?.parent;
      return (
        (greatGrandParent?.kind !== Kind.SourceFile || grandParent?.kind === Kind.CatchClause)
        && localSourceFile === sourceFile
      );
    }
  }
  if (localDeclaration.kind === Kind.FunctionDeclaration) {
    const parent = localDeclaration.parent;
    return parent !== undefined && parent.kind !== Kind.SourceFile && localSourceFile === sourceFile;
  }
  return false;
}

export function getDeclarationForBindingElement(element: SemanticTokenDeclaration): SemanticTokenDeclaration {
  let current = element;
  while (true) {
    const parent = current.parent;
    if (parent !== undefined && isBindingPatternKind(parent.kind)) {
      const grandParent = parent.parent;
      if (grandParent !== undefined && grandParent.kind === Kind.BindingElement) {
        current = grandParent;
        continue;
      }
      return parent.parent ?? current;
    }
    return current;
  }
}

export function isInImportClause(node: SemanticTokenDeclaration): boolean {
  const parent = node.parent;
  return parent !== undefined && (
    parent.kind === Kind.ImportClause
    || parent.kind === Kind.ImportSpecifier
    || parent.kind === Kind.NamespaceImport
  );
}

export function isInfinityOrNaNString(text: string): boolean {
  return text === "Infinity" || text === "NaN";
}

export function collectSemanticTokens<
  Node extends SemanticTokenTreeNode = AstNode,
  SourceFileNode extends SemanticTokenSourceFile<Node> = SourceFile & SemanticTokenSourceFile<Node>,
  Symbol extends SemanticTokenSymbol = SemanticTokenSymbol,
  TokenType = Type,
>(
  checker: SemanticTokenTypeChecker<Node, Symbol, TokenType>,
  sourceFile: SourceFileNode,
  program?: SemanticTokenProgram<SourceFileNode>,
  options: SemanticTokenCollectionOptions = {},
): readonly SemanticTokenLike<Node>[] {
  return collectSemanticTokensInRange(checker, sourceFile, program, sourceFile.pos, sourceFile.end, options);
}

export function collectSemanticTokensInRange<
  Node extends SemanticTokenTreeNode = AstNode,
  SourceFileNode extends SemanticTokenSourceFile<Node> = SourceFile & SemanticTokenSourceFile<Node>,
  Symbol extends SemanticTokenSymbol = SemanticTokenSymbol,
  TokenType = Type,
>(
  checker: SemanticTokenTypeChecker<Node, Symbol, TokenType>,
  sourceFile: SourceFileNode,
  program: SemanticTokenProgram<SourceFileNode> | undefined,
  spanStart: number,
  spanEnd: number,
  options: SemanticTokenCollectionOptions = {},
): readonly SemanticTokenLike<Node>[] {
  const tokens: SemanticTokenLike<Node>[] = [];
  let inJsxElement = false;
  const visit = (node: Node): boolean | undefined => {
    if (options.isCancellationRequested?.() === true) return false;
    if ((node.flags & NodeFlags.Reparsed) !== 0) return false;
    if (node.pos >= spanEnd || node.end <= spanStart) return false;

    const previousInJsxElement = inJsxElement;
    if (isJsxElementKind(node.kind) || node.kind === Kind.JsxSelfClosingElement) {
      inJsxElement = true;
    } else if (node.kind === Kind.JsxExpression) {
      inJsxElement = false;
    }

    if (node.kind === Kind.Identifier && hasIdentifierText(node) && !inJsxElement && !isInImportClause(node) && !isInfinityOrNaNString(node.text ?? "")) {
      collectIdentifierSemanticToken(checker, sourceFile, program, node, tokens);
    }

    node.forEachChild(child => visit(child as Node));
    inJsxElement = previousInJsxElement;
    return false;
  };

  visit(sourceFile as unknown as Node);
  if (options.isCancellationRequested?.() === true) return [];
  return tokens;
}

export function getMeaningFromLocation(node: SemanticTokenDeclaration): SemanticMeaning {
  const parent = node.parent;
  if (node.kind === Kind.SourceFile) return SemanticMeaning.Value;
  if (parent === undefined) return SemanticMeaning.Value;
  if (
    nodeKindIs(parent, Kind.ExportAssignment, Kind.ExportSpecifier, Kind.ExternalModuleReference, Kind.ImportSpecifier, Kind.ImportClause)
    || (parent.kind === Kind.ImportEqualsDeclaration && nodeName(parent) === node)
  ) {
    return SemanticMeaning.All;
  }
  if (isInRightSideOfInternalImportEqualsDeclaration(node)) {
    const name = node.kind === Kind.QualifiedName
      ? node
      : parent.kind === Kind.QualifiedName && qualifiedNameRight(parent) === node
        ? parent
        : undefined;
    if (name !== undefined && name.parent?.kind === Kind.ImportEqualsDeclaration) {
      return SemanticMeaning.All;
    }
    return SemanticMeaning.Namespace;
  }
  if (isDeclarationName(node)) return getMeaningFromDeclaration(parent);
  if (isTypeReference(node)) return SemanticMeaning.Type;
  if (isNamespaceReference(node)) return SemanticMeaning.Namespace;
  if (parent.kind === Kind.TypeParameter) return SemanticMeaning.Type;
  if (parent.kind === Kind.LiteralType) return SemanticMeaning.Type | SemanticMeaning.Value;
  return SemanticMeaning.Value;
}

export function getMeaningFromDeclaration(node: SemanticTokenDeclaration): SemanticMeaning {
  switch (node.kind) {
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.BindingElement:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.CatchClause:
    case Kind.JsxAttribute:
      return SemanticMeaning.Value;
    case Kind.TypeParameter:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.JSTypeAliasDeclaration:
    case Kind.TypeLiteral:
      return SemanticMeaning.Type;
    case Kind.EnumMember:
    case Kind.ClassDeclaration:
      return SemanticMeaning.Value | SemanticMeaning.Type;
    case Kind.ModuleDeclaration:
      return SemanticMeaning.Namespace | SemanticMeaning.Value;
    case Kind.EnumDeclaration:
    case Kind.NamedImports:
    case Kind.ImportSpecifier:
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ExportAssignment:
    case Kind.ExportDeclaration:
      return SemanticMeaning.All;
    case Kind.SourceFile:
      return SemanticMeaning.Namespace | SemanticMeaning.Value;
  }
  return SemanticMeaning.All;
}

export function reclassifyByType<Node extends SemanticTokenTreeNode, TokenType = Type>(
  checker: Pick<SemanticTokenTypeChecker<Node, SemanticTokenSymbol, TokenType>, "getTypeAtLocation" | "getSignaturesOfType">,
  node: Node,
  tokenType: SemanticTokenKind,
): SemanticTokenKind {
  if (
    tokenType !== SemanticTokenKind.Variable
    && tokenType !== SemanticTokenKind.Property
    && tokenType !== SemanticTokenKind.Parameter
  ) {
    return tokenType;
  }
  const type = checker.getTypeAtLocation?.(node);
  if (type === undefined) return tokenType;

  const test = (condition: (type: TokenType) => boolean): boolean => {
    if (condition(type)) return true;
    const parts = unionParts(type);
    return parts.some(part => condition(part as TokenType));
  };

  if (
    tokenType !== SemanticTokenKind.Parameter
    && test(part => (checker.getSignaturesOfType?.(part, SignatureKind.Construct).length ?? 0) > 0)
  ) {
    return SemanticTokenKind.Class;
  }

  const hasCallSignatures = test(part => (checker.getSignaturesOfType?.(part, SignatureKind.Call).length ?? 0) > 0);
  if (hasCallSignatures) {
    const hasNoProperties = !test(typeHasProperties);
    if (hasNoProperties || isExpressionInCallExpression(node)) {
      if (tokenType === SemanticTokenKind.Property) return SemanticTokenKind.Method;
      return SemanticTokenKind.Function;
    }
  }

  return tokenType;
}

export function encodeSemanticTokens<Node>(
  clientCapabilities: ResolvedSemanticTokensClientCapabilities,
  tokens: readonly SemanticTokenLike<Node>[],
  positionProvider: SemanticTokenPositionProvider<Node>,
): readonly number[] {
  const typeMapping = tokenTypeMapping(clientCapabilities);
  const modifierMapping = tokenModifierMapping(clientCapabilities);
  const encoded: number[] = [];
  let previousLine = 0;
  let previousCharacter = 0;

  for (const token of tokens) {
    const clientTypeIndex = typeMapping.get(token.tokenType);
    if (clientTypeIndex === undefined) continue;

    const location = positionProvider.tokenLocation(token.node);
    if (location.range.start.line !== location.range.end.line) {
      throw new Error(
        `semantic tokens: token spans multiple lines: start=(${location.range.start.line},${location.range.start.character}) end=(${location.range.end.line},${location.range.end.character}) for token at offset ${location.offset}`,
      );
    }
    if (
      encoded.length > 0
      && (
        location.range.start.line < previousLine
        || (location.range.start.line === previousLine && location.range.start.character <= previousCharacter)
      )
    ) {
      throw new Error(
        `semantic tokens: positions must be strictly increasing: prev=(${previousLine},${previousCharacter}) current=(${location.range.start.line},${location.range.start.character}) for token at offset ${location.offset}`,
      );
    }

    const deltaLine = location.range.start.line - previousLine;
    const deltaCharacter = deltaLine === 0 ? location.range.start.character - previousCharacter : location.range.start.character;
    encoded.push(
      deltaLine,
      deltaCharacter,
      location.range.end.character - location.range.start.character,
      clientTypeIndex,
      clientModifierMask(token.tokenModifier, modifierMapping),
    );

    previousLine = location.range.start.line;
    previousCharacter = location.range.start.character;
  }

  return encoded;
}

export function provideSemanticTokens<Node>(
  collector: SemanticTokenCollector<Node>,
  clientCapabilities: ResolvedSemanticTokensClientCapabilities,
  positionProvider: SemanticTokenPositionProvider<Node>,
): SemanticTokensResponse {
  const tokens = collector.collectSemanticTokens();
  if (tokens.length === 0) {
    return {};
  }
  return {
    semanticTokens: {
      data: encodeSemanticTokens(clientCapabilities, tokens, positionProvider),
    },
  };
}

export function provideSemanticTokensRange<Node>(
  collector: SemanticTokenCollector<Node>,
  range: Range,
  clientCapabilities: ResolvedSemanticTokensClientCapabilities,
  positionProvider: SemanticTokenPositionProvider<Node>,
): SemanticTokensRangeResponse {
  const tokens = collector.collectSemanticTokensInRange(range);
  if (tokens.length === 0) {
    return {};
  }
  return {
    semanticTokens: {
      data: encodeSemanticTokens(clientCapabilities, tokens, positionProvider),
    },
  };
}

function tokenTypeMapping(clientCapabilities: ResolvedSemanticTokensClientCapabilities): ReadonlyMap<SemanticTokenKind, number> {
  const mapping = new Map<SemanticTokenKind, number>();
  const supportedTypes = clientCapabilities.tokenTypes ?? [];
  let clientIndex = 0;
  for (let serverIndex = 0; serverIndex < semanticTokenTypes.length; serverIndex += 1) {
    const tokenType = semanticTokenTypes[serverIndex];
    if (tokenType !== undefined && supportedTypes.includes(tokenType)) {
      mapping.set(serverIndex as SemanticTokenKind, clientIndex);
      clientIndex += 1;
    }
  }
  return mapping;
}

function tokenModifierMapping(clientCapabilities: ResolvedSemanticTokensClientCapabilities): ReadonlyMap<SemanticTokenModifier, number> {
  const mapping = new Map<SemanticTokenModifier, number>();
  const supportedModifiers = clientCapabilities.tokenModifiers ?? [];
  let clientBit = 0;
  for (const serverModifier of semanticTokenModifiers) {
    if (supportedModifiers.includes(serverModifier)) {
      mapping.set(serverModifier, clientBit);
      clientBit += 1;
    }
  }
  return mapping;
}

function clientModifierMask(
  tokenModifier: number,
  modifierMapping: ReadonlyMap<SemanticTokenModifier, number>,
): number {
  let mask = 0;
  for (let serverBit = 0; serverBit < semanticTokenModifiers.length; serverBit += 1) {
    const serverModifier = semanticTokenModifiers[serverBit];
    if (serverModifier !== undefined && (tokenModifier & (1 << serverBit)) !== 0) {
      const clientBit = modifierMapping.get(serverModifier);
      if (clientBit !== undefined) {
        mask |= 1 << clientBit;
      }
    }
  }
  return mask;
}

function isBindingPatternKind(kind: Kind): boolean {
  return kind === Kind.ArrayBindingPattern || kind === Kind.ObjectBindingPattern;
}

function collectIdentifierSemanticToken<
  Node extends SemanticTokenTreeNode,
  SourceFileNode extends SemanticTokenSourceFile<Node>,
  Symbol extends SemanticTokenSymbol,
  TokenType,
>(
  checker: SemanticTokenTypeChecker<Node, Symbol, TokenType>,
  sourceFile: SourceFileNode,
  program: SemanticTokenProgram<SourceFileNode> | undefined,
  node: Node,
  tokens: SemanticTokenLike<Node>[],
): void {
  let symbol = checker.getSymbolAtLocation(node);
  if (symbol === undefined) return;
  if (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) {
    symbol = checker.getAliasedSymbol?.(symbol) ?? symbol;
  }
  const classified = classifySymbol(symbol, getMeaningFromLocation(node));
  let tokenType = classified[0];
  if (!classified[1]) return;

  let tokenModifier = 0;
  const parent = node.parent;
  if (parent !== undefined) {
    const parentIsDeclaration = parent.kind === Kind.BindingElement || tokenFromDeclarationMapping(parent.kind) === tokenType;
    if (parentIsDeclaration && nodeName(parent) === node) tokenModifier |= SemanticTokenModifierFlag.Declaration;
  }

  if (tokenType === SemanticTokenKind.Parameter && isRightSideOfQualifiedNameOrPropertyAccess(node)) {
    tokenType = SemanticTokenKind.Property;
  }
  tokenType = reclassifyByType(checker, node, tokenType);

  const valueDeclaration = symbol.valueDeclaration;
  if (valueDeclaration !== undefined) {
    tokenModifier |= declarationModifiers(valueDeclaration);
    if (
      tokenType !== SemanticTokenKind.Class
      && tokenType !== SemanticTokenKind.Interface
      && (((symbol.flags ?? 0) & SymbolFlags.EnumMember) !== 0)
    ) {
      tokenModifier |= SemanticTokenModifierFlag.Readonly;
    }
    if (
      (tokenType === SemanticTokenKind.Variable || tokenType === SemanticTokenKind.Function)
      && isLocalDeclaration(valueDeclaration, sourceFile)
    ) {
      tokenModifier |= SemanticTokenModifierFlag.Local;
    }
    if (isDefaultLibraryDeclaration(valueDeclaration, program)) {
      tokenModifier |= SemanticTokenModifierFlag.DefaultLibrary;
    }
  } else {
    for (const declaration of symbol.declarations ?? []) {
      if (isDefaultLibraryDeclaration(declaration, program)) {
        tokenModifier |= SemanticTokenModifierFlag.DefaultLibrary;
        break;
      }
    }
  }

  tokens.push({ node, tokenType, tokenModifier });
}

function combinedModifierFlags(declaration: SemanticTokenDeclaration): ModifierFlags {
  if (declaration.modifierFlags !== undefined) return declaration.modifierFlags;
  const modifiers = nodeModifiers(declaration);
  let flags = ModifierFlags.None;
  for (const modifier of modifiers) {
    switch (modifier.kind) {
      case Kind.StaticKeyword:
        flags |= ModifierFlags.Static;
        break;
      case Kind.AsyncKeyword:
        flags |= ModifierFlags.Async;
        break;
      case Kind.ReadonlyKeyword:
        flags |= ModifierFlags.Readonly;
        break;
      case Kind.AbstractKeyword:
        flags |= ModifierFlags.Abstract;
        break;
    }
  }
  return flags;
}

function combinedNodeFlags(declaration: SemanticTokenDeclaration): NodeFlags {
  return declaration.nodeFlags ?? declaration.flags ?? NodeFlags.None;
}

function nodeModifiers(declaration: SemanticTokenDeclaration): readonly SemanticTokenDeclaration[] {
  return (declaration as { readonly modifiers?: readonly SemanticTokenDeclaration[] }).modifiers ?? [];
}

function sourceFileOfDeclaration(declaration: SemanticTokenDeclaration): unknown {
  return declaration.sourceFile ?? declaration.getSourceFile?.();
}

function isDefaultLibraryDeclaration<SourceFileNode extends SemanticTokenSourceFile>(
  declaration: SemanticTokenDeclaration,
  program: SemanticTokenProgram<SourceFileNode> | undefined,
): boolean {
  const sourceFile = sourceFileOfDeclaration(declaration) as SourceFileNode | undefined;
  if (sourceFile === undefined) return false;
  const path = program?.sourceFilePath?.(sourceFile)
    ?? sourceFile.path
    ?? sourceFile.fileName;
  return path !== undefined && program?.isSourceFileDefaultLibrary?.(path) === true;
}

function hasIdentifierText(node: SemanticTokenTreeNode): boolean {
  return (node.text ?? "").length !== 0;
}

function isJsxElementKind(kind: Kind): boolean {
  return kind === Kind.JsxElement;
}

function nodeKindIs(node: SemanticTokenDeclaration, ...kinds: readonly Kind[]): boolean {
  return kinds.includes(node.kind);
}

function nodeName(node: SemanticTokenDeclaration): SemanticTokenDeclaration | undefined {
  return (node as { readonly name?: SemanticTokenDeclaration }).name;
}

function qualifiedNameRight(node: SemanticTokenDeclaration): SemanticTokenDeclaration | undefined {
  return (node as { readonly right?: SemanticTokenDeclaration }).right;
}

function nodeExpression(node: SemanticTokenDeclaration): SemanticTokenDeclaration | undefined {
  return (node as { readonly expression?: SemanticTokenDeclaration }).expression;
}

function isDeclarationName(node: SemanticTokenDeclaration): boolean {
  const parent = node.parent;
  return parent !== undefined && nodeName(parent) === node;
}

function isInRightSideOfInternalImportEqualsDeclaration(node: SemanticTokenDeclaration): boolean {
  let current: SemanticTokenDeclaration | undefined = node;
  while (current?.parent?.kind === Kind.QualifiedName && qualifiedNameRight(current.parent) === current) {
    current = current.parent;
  }
  return current?.parent?.kind === Kind.ImportEqualsDeclaration;
}

function isTypeReference(node: SemanticTokenDeclaration): boolean {
  let current: SemanticTokenDeclaration | undefined = node;
  while (current?.parent?.kind === Kind.QualifiedName) current = current.parent;
  const parent = current?.parent;
  return parent?.kind === Kind.TypeReference || parent?.kind === Kind.ExpressionWithTypeArguments;
}

function isNamespaceReference(node: SemanticTokenDeclaration): boolean {
  return node.parent?.kind === Kind.ModuleDeclaration || isInRightSideOfInternalImportEqualsDeclaration(node);
}

function isRightSideOfQualifiedNameOrPropertyAccess(node: SemanticTokenDeclaration): boolean {
  const parent = node.parent;
  return (
    parent?.kind === Kind.QualifiedName && qualifiedNameRight(parent) === node
  ) || (
    parent?.kind === Kind.PropertyAccessExpression && nodeName(parent) === node
  );
}

function isExpressionInCallExpression(node: SemanticTokenDeclaration): boolean {
  let current: SemanticTokenDeclaration = node;
  while (isRightSideOfQualifiedNameOrPropertyAccess(current)) {
    current = current.parent!;
  }
  const parent = current.parent;
  return parent?.kind === Kind.CallExpression && nodeExpression(parent) === current;
}

function unionParts<TokenType>(type: TokenType): readonly TokenType[] {
  const typed = type as Type;
  if ((typed.flags & TypeFlags.Union) === 0) return [];
  return ((typed.data as { readonly types?: readonly TokenType[] } | undefined)?.types) ?? [];
}

function typeHasProperties<TokenType>(type: TokenType): boolean {
  const data = (type as Type).data as {
    readonly declaredProperties?: readonly unknown[];
    readonly resolvedProperties?: readonly unknown[];
    readonly propertyCache?: ReadonlyMap<string, unknown>;
  } | undefined;
  return (
    (data?.declaredProperties?.length ?? 0) > 0
    || (data?.resolvedProperties?.length ?? 0) > 0
    || (data?.propertyCache?.size ?? 0) > 0
  );
}
