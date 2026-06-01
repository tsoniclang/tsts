import {
  Kind,
  KindNames,
  SymbolFlags,
  findAncestor,
  isAsExpression,
  isBinaryExpression,
  isBreakOrContinueStatement,
  isBindingElement,
  isClassElement,
  isClassLikeDeclaration,
  isClassStaticBlockDeclaration,
  isConstructorDeclaration,
  isExpression,
  isFunctionLike,
  isFunctionLikeDeclaration,
  isGetAccessorDeclaration,
  isJSDoc,
  isJSDocImportTag,
  isJSDocParameterTag,
  isJSDocTag,
  isJsxClosingElement,
  isJsxSpreadAttribute,
  isMethodDeclaration,
  isObjectBindingPattern,
  isObjectLiteralExpression,
  isObjectTypeDeclaration,
  isParameterDeclaration,
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertyNameLiteral,
  isPropertySignatureDeclaration,
  isSetAccessorDeclaration,
  isSatisfiesExpression,
  isShorthandPropertyAssignment,
  isSpreadAssignment,
  isTemplateExpression,
  isTypeParameterDeclaration,
  isTypeQueryNode,
  isTypeReferenceNode,
  isTypeNode,
  isTypeAssertion,
  isVariableDeclaration,
  hasSyntacticModifier,
  walkUpParenthesizedExpressions,
  nodeText,
  type Node,
  type SourceFile,
  type Symbol,
} from "../ast/index.js";
import { TypeFlags } from "../checker/types.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { tristateIsTrue, type CompilerOptions, type Tristate } from "../core/index.js";
import { LanguageVariant } from "../core/languageVariant.js";
import { isIdentifierPartCodePoint, isIdentifierStartCodePoint } from "../scanner/index.js";
import { compareStringsCaseInsensitiveThenSensitive, ComparisonEqual } from "../stringutil/index.js";
import {
  CompletionItemKindClass,
  CompletionItemKindConstant,
  CompletionItemKindEnum,
  CompletionItemKindEnumMember,
  CompletionItemKindField,
  CompletionItemKindFile,
  CompletionItemKindFolder,
  CompletionItemKindFunction,
  CompletionItemKindInterface,
  CompletionItemKindKeyword,
  CompletionItemKindMethod,
  CompletionItemKindModule,
  CompletionItemKindProperty,
  CompletionItemKindText,
  CompletionItemKindVariable,
  CompletionItemTagDeprecated,
  InsertTextFormatSnippet,
} from "../lsp/lsproto/index.js";
import type { AutoImportFix, ClientCapabilities, CompletionContext, CompletionItem, CompletionItemData, CompletionItemDefaults, CompletionItemKind, CompletionItemLabelDetails, CompletionItemsOrListOrNull, CompletionList, DocumentUri, Position, Range } from "../lsp/lsproto/index.js";
import { findPrecedingToken, getStartOfNode, getTokenAtPositionPublic, getTouchingPropertyName } from "../astnav/index.js";
import { isInComment } from "./format.js";
import { getStringLiteralCompletions, type StringCompletionChecker, type StringCompletionProgram, type StringLiteralCompletionService } from "./stringCompletions.js";
import {
  ScriptElementKindAlias,
  ScriptElementKindCallSignatureElement,
  ScriptElementKindClassElement,
  ScriptElementKindConstElement,
  ScriptElementKindConstructSignatureElement,
  ScriptElementKindDirectory,
  ScriptElementKindEnumElement,
  ScriptElementKindEnumMemberElement,
  ScriptElementKindExternalModuleName,
  ScriptElementKindFunctionElement,
  ScriptElementKindIndexSignatureElement,
  ScriptElementKindInterfaceElement,
  ScriptElementKindKeyword,
  ScriptElementKindLetElement,
  ScriptElementKindLocalFunctionElement,
  ScriptElementKindLocalVariableElement,
  ScriptElementKindMemberFunctionElement,
  ScriptElementKindMemberGetAccessorElement,
  ScriptElementKindMemberSetAccessorElement,
  ScriptElementKindMemberVariableElement,
  ScriptElementKindModifierDeprecated,
  ScriptElementKindModifierOptional,
  ScriptElementKindModuleElement,
  ScriptElementKindParameterElement,
  ScriptElementKindPrimitiveType,
  ScriptElementKindScriptElement,
  ScriptElementKindString,
  ScriptElementKindTypeElement,
  ScriptElementKindVariableElement,
  ScriptElementKindWarning,
  type ScriptElementKind,
  type UserPreferences,
  isNonContextualKeyword,
  getLastToken,
} from "./lsutil/index.js";
import {
  createLspRangeFromBounds,
  createLspPosition,
  getPossibleGenericSignatures,
  getPossibleTypeArgumentsInfo,
  positionBelongsToNode,
  isInString,
  quote,
  type LspRangeService,
} from "./utilities.js";

/**
 * Completion constants and ordering helpers.
 *
 * Porting surface for TS-Go `internal/ls/completions.go`.
 */

export const ErrNeedsAutoImports = new Error("completion list needs auto imports");

export type CompletionData =
  | CompletionDataData
  | CompletionDataKeyword
  | CompletionDataJSDocTagName
  | CompletionDataJSDocTag
  | CompletionDataJSDocParameterName;

export interface CompletionDataData {
  readonly symbols: readonly unknown[];
  readonly autoImports: readonly unknown[];
  readonly completionKind: CompletionKind;
  readonly isInSnippetScope: boolean;
  readonly propertyAccessToConvert?: Node;
  readonly isNewIdentifierLocation: boolean;
  readonly location?: Node;
  readonly keywordFilters: KeywordCompletionFilters;
  readonly literals: readonly LiteralValue[];
  readonly symbolToOriginInfoMap: ReadonlyMap<number, SymbolOriginInfo>;
  readonly symbolToSortTextMap: ReadonlyMap<number, SortText>;
  readonly recommendedCompletion?: unknown;
  readonly previousToken?: Node;
  readonly contextToken?: Node;
  readonly jsxInitializer: JsxInitializer;
  readonly insideJSDocTagTypeExpression: boolean;
  readonly isTypeOnlyLocation: boolean;
  readonly isJsxIdentifierExpected: boolean;
  readonly isRightOfOpenTag: boolean;
  readonly isRightOfDotOrQuestionDot: boolean;
  readonly importStatementCompletion?: ImportStatementCompletionInfo;
  readonly hasUnresolvedAutoImports: boolean;
  readonly defaultCommitCharacters: readonly string[];
}

export interface CompletionDataKeyword {
  readonly keywordCompletions: readonly CompletionItem[];
  readonly isNewIdentifierLocation: boolean;
}

export interface CompletionDataJSDocTagName {
  readonly jsDocCompletionKind: "tagName";
}

export interface CompletionDataJSDocTag {
  readonly jsDocCompletionKind: "tag";
}

export interface CompletionDataJSDocParameterName {
  readonly tag: unknown;
}

export interface ImportStatementCompletionInfo {
  readonly isKeywordOnlyCompletion: boolean;
  readonly keywordCompletion: Kind;
  readonly isNewIdentifierLocation: boolean;
  readonly isTopLevelTypeOnly: boolean;
  readonly couldBeTypeOnlyImportSpecifier: boolean;
  readonly replacementSpan?: Range;
}

export interface JsxInitializer {
  readonly isInitializer: boolean;
  readonly initializer?: unknown;
}

export enum KeywordCompletionFilters {
  None = 0,
  All = 1,
  ClassElementKeywords = 2,
  InterfaceElementKeywords = 3,
  ConstructorParameterKeywords = 4,
  FunctionLikeBodyKeywords = 5,
  TypeAssertionKeywords = 6,
  TypeKeywords = 7,
  TypeKeyword = 8,
}

export const KeywordCompletionFiltersLast = KeywordCompletionFilters.TypeKeyword;

export function keywordFiltersFromSyntaxKind(keywordCompletion: Kind): KeywordCompletionFilters {
  switch (keywordCompletion) {
    case Kind.TypeKeyword:
      return KeywordCompletionFilters.TypeKeyword;
    default:
      throw new Error(`Unknown mapping from ast.Kind '${Kind[keywordCompletion] ?? keywordCompletion}' to KeywordCompletionFilters`);
  }
}

export function ensureItemData(fileName: string, position: number, list: CompletionList | undefined): CompletionList | undefined {
  if (list === undefined) return undefined;
  return {
    ...list,
    items: list.items.map((item): CompletionItem => item.data === undefined
      ? { ...item, data: completionItemData(fileName, position, item.label) }
      : item),
  };
}

function completionItemData(fileName: string, position: number, name: string): CompletionItemData {
  return { fileName, position, name };
}

export enum CompletionKind {
  None = 0,
  ObjectPropertyDeclaration = 1,
  Global = 2,
  PropertyAccess = 3,
  MemberLike = 4,
  String = 5,
}

export const TriggerCharacters: readonly string[] = [".", "\"", "'", "`", "/", "@", "<", "#", " "];

export const allCommitCharacters: readonly string[] = [".", ",", ";"];
export const noCommaCommitCharacters: readonly string[] = [".", ";"];
export const emptyCommitCharacters: readonly string[] = [];

export type SortText = string;

export const SortTextLocalDeclarationPriority: SortText = "10";
export const SortTextLocationPriority: SortText = "11";
export const SortTextOptionalMember: SortText = "12";
export const SortTextMemberDeclaredBySpreadAssignment: SortText = "13";
export const SortTextSuggestedClassMembers: SortText = "14";
export const SortTextGlobalsOrKeywords: SortText = "15";
export const SortTextAutoImportSuggestions: SortText = "16";
export const SortTextClassMemberSnippets: SortText = "17";
export const SortTextJavascriptIdentifiers: SortText = "18";

export function DeprecateSortText(original: SortText): SortText {
  return `z${original}`;
}

export function sortBelow(original: SortText): SortText {
  return `${original}1`;
}

export enum SymbolOriginInfoKind {
  ThisType = 1 << 0,
  SymbolMember = 1 << 1,
  Promise = 1 << 2,
  Nullable = 1 << 3,
  TypeOnlyAlias = 1 << 4,
  ObjectLiteralMethod = 1 << 5,
  Ignore = 1 << 6,
  ComputedPropertyName = 1 << 7,
}

export interface SymbolOriginInfo {
  readonly kind: SymbolOriginInfoKind;
  readonly isDefaultExport: boolean;
  readonly isFromPackageJson: boolean;
  readonly fileName: string;
  readonly data?: SymbolOriginInfoData;
}

export type SymbolOriginInfoData =
  | SymbolOriginInfoObjectLiteralMethod
  | SymbolOriginInfoTypeOnlyAlias
  | SymbolOriginInfoComputedPropertyName;

export interface SymbolOriginInfoObjectLiteralMethod {
  readonly insertText: string;
  readonly labelDetails?: CompletionItemLabelDetails;
  readonly isSnippet: boolean;
}

export interface SymbolOriginInfoTypeOnlyAlias {
  readonly declaration: unknown;
}

export interface SymbolOriginInfoComputedPropertyName {
  readonly symbolName: string;
}

export function symbolOriginInfoSymbolName(origin: SymbolOriginInfo): string {
  if (origin.data !== undefined && "symbolName" in origin.data) {
    return origin.data.symbolName;
  }
  throw new Error(`symbolOriginInfo: unknown data type for symbolName(): ${typeof origin.data}`);
}

export function symbolOriginInfoAsObjectLiteralMethod(origin: SymbolOriginInfo): SymbolOriginInfoObjectLiteralMethod {
  if (origin.data !== undefined && "insertText" in origin.data) {
    return origin.data;
  }
  throw new Error(`symbolOriginInfo: data is not an object literal method`);
}

export type CompletionSource = string;

export const completionSourceThisProperty: CompletionSource = "ThisProperty/";
export const completionSourceClassMemberSnippet: CompletionSource = "ClassMemberSnippet/";
export const completionSourceTypeOnlyAlias: CompletionSource = "TypeOnlyAlias/";
export const completionSourceObjectLiteralMethodSnippet: CompletionSource = "ObjectLiteralMethodSnippet/";
export const completionSourceSwitchCases: CompletionSource = "SwitchCases/";
export const completionSourceObjectLiteralMemberWithComma: CompletionSource = "ObjectLiteralMemberWithComma/";

export type UniqueNamesMap = Map<string, boolean>;
export type LiteralValue = string | number | bigint;

export enum GlobalsSearch {
  Continue = 0,
  Success = 1,
  Fail = 2,
}

export const wordSeparators: ReadonlySet<string> = new Set([
  "`", "~", "!", "@", "%", "^", "&", "*", "(", ")", "-", "=", "+", "[", "{", "]", "}", "\\", "|",
  ";", ":", "'", "\"", ",", ".", "<", ">", "/", "?",
]);

export interface WordLengthAndStart {
  readonly wordLength: number;
  readonly wordStart: string;
}

export function getWordLengthAndStart(sourceFile: SourceFile, position: number): WordLengthAndStart {
  const text = sourceFile.text.slice(0, position);
  let totalSize = 0;
  let firstRune = "";
  const runes = Array.from(text);
  for (let index = runes.length - 1; index >= 0; index -= 1) {
    const rune = runes[index]!;
    if (wordSeparators.has(rune) || /\s/u.test(rune)) break;
    totalSize += rune.length;
    firstRune = rune;
  }
  if (firstRune === "@") {
    totalSize -= 1;
    firstRune = Array.from(text.slice(text.length - totalSize))[0] ?? "";
  }
  return { wordLength: totalSize, wordStart: firstRune };
}

export function trimElementAccess(text: string): string {
  let result = text.startsWith("[") ? text.slice(1) : text;
  result = result.endsWith("]") ? result.slice(0, -1) : result;
  if (result.startsWith("'") && result.endsWith("'")) {
    result = result.slice(1, -1);
  }
  if (result.startsWith("\"") && result.endsWith("\"")) {
    result = result.slice(1, -1);
  }
  return result;
}

export function getFilterText(
  insertText: string,
  label: string,
  wordStart: string,
  dotAccessor: string,
): string {
  if (label.startsWith("#")) {
    const after = label.slice(1);
    if (insertText !== "") {
      if (insertText.startsWith("this.#")) {
        return wordStart === "#" ? "" : insertText.slice("this.#".length);
      }
    } else {
      return wordStart === "#" ? "" : after;
    }
  }

  if (insertText.startsWith("this.")) {
    return "";
  }
  if (insertText.startsWith("[")) {
    return dotAccessor + trimElementAccess(insertText);
  }
  if (insertText.startsWith("?.")) {
    return insertText.startsWith("?.[")
      ? dotAccessor + trimElementAccess(insertText.slice(2))
      : dotAccessor + insertText.slice(2);
  }
  return insertText;
}

export function getDotAccessor(file: SourceFile, position: number): string {
  const text = file.text.slice(0, position);
  if (text.endsWith("?.")) return file.text.slice(position - 2, position);
  if (text.endsWith(".")) return file.text.slice(position - 1, position);
  return "";
}

export function strPtrIsEmpty(value: string | undefined): boolean {
  return value === undefined || value === "";
}

export function strPtrTo(value: string): string | undefined {
  return value === "" ? undefined : value;
}

export function boolToPtr(value: boolean): true | undefined {
  return value ? true : undefined;
}

export function startsWithQuote(text: string): boolean {
  const first = Array.from(text)[0];
  return first === "\"" || first === "'";
}

export function escapeSnippetText(text: string): string {
  return text.replaceAll("$", "\\$");
}

export function generateIdentifierForArbitraryString(text: string): string {
  let needsUnderscore = false;
  let identifier = "";
  for (let position = 0; position < text.length;) {
    const codePoint = text.codePointAt(position);
    if (codePoint === undefined) break;
    const character = String.fromCodePoint(codePoint);
    const validChar = position === 0
      ? isIdentifierStartCodePoint(codePoint)
      : isIdentifierPartCodePoint(codePoint, LanguageVariant.Standard);
    if (validChar) {
      if (needsUnderscore) {
        identifier += "_";
        needsUnderscore = false;
      }
      identifier += character;
    } else {
      needsUnderscore = identifier.length > 0;
    }
    position += character.length;
  }
  if (needsUnderscore) identifier += "_";
  return identifier === "" ? "_" : identifier;
}

export function CompareCompletionEntries(left: CompletionItem, right: CompletionItem): number {
  const leftSortText = left.sortText ?? "";
  const rightSortText = right.sortText ?? "";
  let result = compareStringsCaseInsensitiveThenSensitive(leftSortText, rightSortText);
  if (result === ComparisonEqual) {
    result = compareStringsCaseInsensitiveThenSensitive(left.label, right.label);
  }
  return result;
}

const keywordCompletionsCache = new Map<string, readonly CompletionItem[]>();

let allKeywordCompletionsValue: readonly CompletionItem[] | undefined;

export function cloneItems(items: readonly CompletionItem[]): readonly CompletionItem[] {
  return items.map((item) => ({ ...item }));
}

export function getKeywordCompletions(
  keywordFilter: KeywordCompletionFilters,
  filterOutTsOnlyKeywords: boolean,
): readonly CompletionItem[] {
  if (!filterOutTsOnlyKeywords) {
    return cloneItems(getTypescriptKeywordCompletions(keywordFilter));
  }

  const cacheKey = `not-ts-only:${keywordFilter}`;
  const cached = keywordCompletionsCache.get(cacheKey);
  if (cached !== undefined) return cloneItems(cached);

  const result = getTypescriptKeywordCompletions(keywordFilter)
    .filter((entry) => !isTypeScriptOnlyKeyword(stringToKeywordKind(entry.label)));
  keywordCompletionsCache.set(cacheKey, result);
  return cloneItems(result);
}

export function getTypescriptKeywordCompletions(keywordFilter: KeywordCompletionFilters): readonly CompletionItem[] {
  const cacheKey = `typescript:${keywordFilter}`;
  const cached = keywordCompletionsCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const result = allKeywordCompletions().filter((entry) => {
    const kind = stringToKeywordKind(entry.label);
    switch (keywordFilter) {
      case KeywordCompletionFilters.None:
        return false;
      case KeywordCompletionFilters.All:
        return isFunctionLikeBodyKeyword(kind)
          || kind === Kind.DeclareKeyword
          || kind === Kind.ModuleKeyword
          || kind === Kind.TypeKeyword
          || kind === Kind.NamespaceKeyword
          || kind === Kind.AbstractKeyword
          || (isTypeKeyword(kind) && kind !== Kind.UndefinedKeyword);
      case KeywordCompletionFilters.FunctionLikeBodyKeywords:
        return isFunctionLikeBodyKeyword(kind);
      case KeywordCompletionFilters.ClassElementKeywords:
        return isClassMemberCompletionKeyword(kind);
      case KeywordCompletionFilters.InterfaceElementKeywords:
        return isInterfaceOrTypeLiteralCompletionKeyword(kind);
      case KeywordCompletionFilters.ConstructorParameterKeywords:
        return isParameterPropertyModifier(kind);
      case KeywordCompletionFilters.TypeAssertionKeywords:
        return isTypeKeyword(kind) || kind === Kind.ConstKeyword;
      case KeywordCompletionFilters.TypeKeywords:
        return isTypeKeyword(kind);
      case KeywordCompletionFilters.TypeKeyword:
        return kind === Kind.TypeKeyword;
      default:
        throw new Error(`Unknown keyword filter: ${keywordFilter}`);
    }
  });

  keywordCompletionsCache.set(cacheKey, result);
  return result;
}

export function isTypeScriptOnlyKeyword(kind: Kind): boolean {
  switch (kind) {
    case Kind.AbstractKeyword:
    case Kind.AnyKeyword:
    case Kind.BigIntKeyword:
    case Kind.BooleanKeyword:
    case Kind.DeclareKeyword:
    case Kind.EnumKeyword:
    case Kind.GlobalKeyword:
    case Kind.ImplementsKeyword:
    case Kind.InferKeyword:
    case Kind.InterfaceKeyword:
    case Kind.IsKeyword:
    case Kind.KeyOfKeyword:
    case Kind.ModuleKeyword:
    case Kind.NamespaceKeyword:
    case Kind.NeverKeyword:
    case Kind.NumberKeyword:
    case Kind.ObjectKeyword:
    case Kind.OverrideKeyword:
    case Kind.PrivateKeyword:
    case Kind.ProtectedKeyword:
    case Kind.PublicKeyword:
    case Kind.ReadonlyKeyword:
    case Kind.StringKeyword:
    case Kind.SymbolKeyword:
    case Kind.TypeKeyword:
    case Kind.UniqueKeyword:
    case Kind.UnknownKeyword:
      return true;
    default:
      return false;
  }
}

export function isFunctionLikeBodyKeyword(kind: Kind): boolean {
  return kind === Kind.AsyncKeyword
    || kind === Kind.AwaitKeyword
    || kind === Kind.UsingKeyword
    || kind === Kind.AsKeyword
    || kind === Kind.SatisfiesKeyword
    || kind === Kind.TypeKeyword
    || (!isContextualKeyword(kind) && !isClassMemberCompletionKeyword(kind));
}

export function isClassMemberCompletionKeyword(kind: Kind): boolean {
  switch (kind) {
    case Kind.AbstractKeyword:
    case Kind.AccessorKeyword:
    case Kind.ConstructorKeyword:
    case Kind.GetKeyword:
    case Kind.SetKeyword:
    case Kind.AsyncKeyword:
    case Kind.DeclareKeyword:
    case Kind.OverrideKeyword:
      return true;
    default:
      return isClassMemberModifier(kind);
  }
}

export function isInterfaceOrTypeLiteralCompletionKeyword(kind: Kind): boolean {
  return kind === Kind.ReadonlyKeyword;
}

export function isContextualKeywordInAutoImportableExpressionSpace(keyword: string): boolean {
  return keyword === "abstract"
    || keyword === "async"
    || keyword === "await"
    || keyword === "declare"
    || keyword === "module"
    || keyword === "namespace"
    || keyword === "type"
    || keyword === "satisfies"
    || keyword === "as";
}

export function isMemberCompletionKind(kind: CompletionKind): boolean {
  return kind === CompletionKind.ObjectPropertyDeclaration
    || kind === CompletionKind.MemberLike
    || kind === CompletionKind.PropertyAccess;
}

function allKeywordCompletions(): readonly CompletionItem[] {
  if (allKeywordCompletionsValue !== undefined) return allKeywordCompletionsValue;
  const result: CompletionItem[] = [];
  for (let kind = Kind.FirstKeyword; kind <= Kind.LastKeyword; kind += 1) {
    const label = tokenToString(kind);
    if (label !== "") {
      result.push({
        label,
        kind: CompletionItemKindKeyword,
        sortText: SortTextGlobalsOrKeywords,
      });
    }
  }
  allKeywordCompletionsValue = result;
  return result;
}

function tokenToString(kind: Kind): string {
  const name = KindNames[kind];
  if (name === undefined || !name.endsWith("Keyword")) return "";
  return name.slice(0, -"Keyword".length).toLowerCase();
}

function stringToKeywordKind(text: string): Kind {
  for (let kind = Kind.FirstKeyword; kind <= Kind.LastKeyword; kind += 1) {
    if (tokenToString(kind) === text) return kind;
  }
  return Kind.Unknown;
}

const typeKeywords: ReadonlySet<Kind> = new Set([
  Kind.AnyKeyword,
  Kind.AssertsKeyword,
  Kind.BigIntKeyword,
  Kind.BooleanKeyword,
  Kind.FalseKeyword,
  Kind.InferKeyword,
  Kind.KeyOfKeyword,
  Kind.NeverKeyword,
  Kind.NullKeyword,
  Kind.NumberKeyword,
  Kind.ObjectKeyword,
  Kind.ReadonlyKeyword,
  Kind.StringKeyword,
  Kind.SymbolKeyword,
  Kind.TypeOfKeyword,
  Kind.TrueKeyword,
  Kind.VoidKeyword,
  Kind.UndefinedKeyword,
  Kind.UniqueKeyword,
  Kind.UnknownKeyword,
]);

function isTypeKeyword(kind: Kind): boolean {
  return typeKeywords.has(kind);
}

function isContextualKeyword(kind: Kind): boolean {
  return Kind.FirstContextualKeyword <= kind && kind <= Kind.LastContextualKeyword;
}

function isClassMemberModifier(kind: Kind): boolean {
  return isParameterPropertyModifier(kind)
    || kind === Kind.StaticKeyword
    || kind === Kind.OverrideKeyword
    || kind === Kind.AccessorKeyword;
}

function isParameterPropertyModifier(kind: Kind): boolean {
  return kind === Kind.PublicKeyword
    || kind === Kind.ProtectedKeyword
    || kind === Kind.PrivateKeyword
    || kind === Kind.ReadonlyKeyword
    || kind === Kind.OverrideKeyword;
}

export function keywordCompletionData(
  keywordFilters: KeywordCompletionFilters,
  filterOutTSOnlyKeywords: boolean,
  isNewIdentifierLocation: boolean,
): CompletionDataKeyword {
  return {
    keywordCompletions: getKeywordCompletions(keywordFilters, filterOutTSOnlyKeywords),
    isNewIdentifierLocation,
  };
}

export function getDefaultCommitCharacters(isNewIdentifierLocation: boolean): readonly string[] {
  return isNewIdentifierLocation ? emptyCommitCharacters : [...allCommitCharacters];
}

export interface CompletionClientCapabilityProvider {
  readonly clientCapabilities?: ClientCapabilities;
}

export function setItemDefaults(
  service: LspRangeService,
  capabilities: ClientCapabilities | undefined,
  position: number,
  file: SourceFile,
  items: readonly CompletionItem[],
  defaultCommitCharacters: readonly string[] | undefined,
  optionalReplacementSpan: Range | undefined,
): CompletionItemDefaults | undefined {
  let itemDefaults: CompletionItemDefaults | undefined;
  if (defaultCommitCharacters !== undefined) {
    const supportsItemCommitCharacters = clientSupportsItemCommitCharacters(capabilities);
    if (clientSupportsDefaultCommitCharacters(capabilities) && supportsItemCommitCharacters) {
      itemDefaults = { commitCharacters: defaultCommitCharacters };
    } else if (supportsItemCommitCharacters) {
      for (const item of items) {
        if (item.commitCharacters === undefined) mutableCompletionItem(item).commitCharacters = defaultCommitCharacters;
      }
    }
  }

  if (optionalReplacementSpan !== undefined) {
    const insertRange = {
      start: optionalReplacementSpan.start,
      end: createLspPosition(service, position, file),
    };
    if (clientSupportsDefaultEditRange(capabilities)) {
      itemDefaults = {
        ...(itemDefaults ?? {}),
        editRange: {
          editRangeWithInsertReplace: {
            insert: insertRange,
            replace: optionalReplacementSpan,
          },
        },
      };
      for (const item of items) {
        if (item.insertText !== undefined && item.textEdit === undefined) {
          mutableCompletionItem(item).textEdit = {
            insertReplaceEdit: {
              newText: item.insertText,
              insert: insertRange,
              replace: optionalReplacementSpan,
            },
          };
          delete mutableCompletionItem(item).insertText;
        }
      }
    } else if (clientSupportsItemInsertReplace(capabilities)) {
      for (const item of items) {
        if (item.textEdit === undefined) {
          mutableCompletionItem(item).textEdit = {
            insertReplaceEdit: {
              newText: item.insertText ?? item.label,
              insert: insertRange,
              replace: optionalReplacementSpan,
            },
          };
        }
      }
    }
  }

  return itemDefaults;
}

export function clientSupportsItemLabelDetails(capabilities: ClientCapabilities | undefined): boolean {
  return capabilities?.textDocument?.completion?.completionItem?.labelDetailsSupport === true;
}

export function clientSupportsItemSnippet(capabilities: ClientCapabilities | undefined): boolean {
  return capabilities?.textDocument?.completion?.completionItem?.snippetSupport === true;
}

export function clientSupportsItemCommitCharacters(capabilities: ClientCapabilities | undefined): boolean {
  return capabilities?.textDocument?.completion?.completionItem?.commitCharactersSupport === true;
}

export function clientSupportsItemInsertReplace(capabilities: ClientCapabilities | undefined): boolean {
  return capabilities?.textDocument?.completion?.completionItem?.insertReplaceSupport === true;
}

export function clientSupportsDefaultCommitCharacters(capabilities: ClientCapabilities | undefined): boolean {
  return capabilities?.textDocument?.completion?.completionList?.itemDefaults?.includes("commitCharacters") === true;
}

export function clientSupportsDefaultEditRange(capabilities: ClientCapabilities | undefined): boolean {
  return capabilities?.textDocument?.completion?.completionList?.itemDefaults?.includes("editRange") === true;
}

function mutableCompletionItem(item: CompletionItem): MutableCompletionItem {
  return item as MutableCompletionItem;
}

type MutableCompletionItem = {
  -readonly [K in keyof CompletionItem]: CompletionItem[K];
};

export interface CompletionInfoHost {
  readonly userPreferences?: UserPreferences;
  readonly compilerOptions?: CompilerOptions;
  readonly rangeService?: LspRangeService;
  readonly clientCapabilities?: ClientCapabilities;
  readonly createCompletionItem?: (input: CompletionItemCreateInput) => CompletionItem | undefined;
}

export interface CompletionProgram extends StringCompletionProgram {
  options?(): CompilerOptions;
  getTypeCheckerForFile?(context: unknown, sourceFile: SourceFile): CompletionCheckerLease | undefined;
}

export interface CompletionChecker extends StringCompletionChecker {}

export type CompletionCheckerLease =
  | readonly [CompletionChecker, () => void]
  | { readonly checker: CompletionChecker; readonly release: () => void };

export interface CompletionService extends LspRangeService {
  readonly converters: LspRangeService["converters"] & {
    lineAndCharacterToPosition(file: SourceFile, position: Position): number;
  };
  getProgramAndFile(documentURI: DocumentUri): readonly [CompletionProgram, SourceFile];
  getProgram?(): CompletionProgram | undefined;
  userPreferences(): UserPreferences;
  clientCapabilities?(): ClientCapabilities | undefined;
  readonly createCompletionItem?: CompletionInfoHost["createCompletionItem"];
  readonly getTripleSlashReferenceCompletions?: StringLiteralCompletionService["getTripleSlashReferenceCompletions"];
  readonly getStringLiteralCompletionsFromModuleNamesWorker?: StringLiteralCompletionService["getStringLiteralCompletionsFromModuleNamesWorker"];
  readonly getArgumentInfoForCompletions?: StringLiteralCompletionService["getArgumentInfoForCompletions"];
  readonly createRangeFromStringLiteralLikeContent?: StringLiteralCompletionService["createRangeFromStringLiteralLikeContent"];
  getLabelCompletionsAtPosition?(
    statement: Node,
    file: SourceFile,
    position: number,
    replacementSpan: Range | undefined,
  ): CompletionList | undefined;
  getCompletionDataAtPosition?(request: CompletionDataRequest): CompletionData | undefined;
}

export interface CompletionDataRequest {
  readonly checker: CompletionChecker;
  readonly file: SourceFile;
  readonly position: number;
  readonly preferences: UserPreferences;
  readonly forItemResolve: boolean;
  readonly currentToken: Node | undefined;
  readonly contextToken: Node | undefined;
  readonly previousToken: Node | undefined;
  readonly location: Node | undefined;
  readonly keywordFilters: KeywordCompletionFilters;
  readonly insideJSDocTagTypeExpression: boolean;
  readonly insideJSDocImportTag: boolean;
  readonly isTypeOnlyLocation: boolean;
  readonly isNewIdentifierLocation: boolean;
  readonly defaultCommitCharacters: readonly string[];
}

export function provideCompletion(
  service: CompletionService,
  documentURI: DocumentUri,
  position: Position,
  context: CompletionContext | undefined,
): CompletionItemsOrListOrNull {
  const [, file] = service.getProgramAndFile(documentURI);
  const triggerCharacter = asCompletionsTriggerCharacter(context?.triggerCharacter);
  const offset = service.converters.lineAndCharacterToPosition(file, position);
  const completionList = getCompletionsAtPosition(service, file, offset, triggerCharacter);
  const list = ensureItemData(file.fileName, offset, completionList);
  return list === undefined ? {} : { list };
}

export function getCompletionsAtPosition(
  service: CompletionService,
  file: SourceFile,
  position: number,
  triggerCharacter: CompletionsTriggerCharacter | undefined,
): CompletionList | undefined {
  const { previousToken } = getRelevantTokens(position, file);
  if (triggerCharacter !== undefined && !isInString(file, position, previousToken) && !isValidTrigger(file, triggerCharacter, previousToken, position)) {
    return undefined;
  }

  const preferences = service.userPreferences();
  if (triggerCharacter === " ") {
    return tristateIsTrue(preferences.includeCompletionsForImportStatements)
      ? { isIncomplete: true, items: [] }
      : undefined;
  }

  const program = service.getProgram?.();
  const compilerOptions = program?.options?.() ?? {};
  const checkerLease = program?.getTypeCheckerForFile?.(undefined, file);
  const normalizedLease = checkerLease === undefined ? undefined : normalizeCompletionCheckerLease(checkerLease);
  const checker = normalizedLease?.checker ?? {};
  try {
    const stringCompletions = getStringLiteralCompletions(
      completionStringService(service),
      file,
      position,
      previousToken,
      checker,
      compilerOptions,
    );
    if (stringCompletions !== undefined) return stringCompletions;

    if (previousToken !== undefined
      && (previousToken.kind === Kind.BreakKeyword || previousToken.kind === Kind.ContinueKeyword || previousToken.kind === Kind.Identifier)
      && previousToken.parent !== undefined
      && isBreakOrContinueStatement(previousToken.parent)) {
      return service.getLabelCompletionsAtPosition?.(
        previousToken.parent,
        file,
        position,
        getOptionalReplacementSpan(service, previousToken, file),
      );
    }

    const data = getCompletionData(service, checker, file, position, preferences, false);
    if (data === undefined) return undefined;
    if (isCompletionDataData(data)) {
      return completionInfoFromData(
        completionInfoHost(service, preferences),
        file,
        data,
        position,
        getOptionalReplacementSpan(service, data.location as Node | undefined, file),
      );
    }
    if (isCompletionDataKeyword(data)) {
      return specificKeywordCompletionInfo(
        service,
        file,
        position,
        data.keywordCompletions,
        data.isNewIdentifierLocation,
        getOptionalReplacementSpan(service, previousToken, file),
      );
    }
    if (isCompletionDataJSDocTagName(data)) {
      return jsDocCompletionInfo(position, file, [
        ...getJSDocTagNameCompletions(),
        ...getJSDocParameterCompletionsForPosition(file, position, checker, compilerOptions, preferences, true),
      ]);
    }
    if (isCompletionDataJSDocTag(data)) {
      return jsDocCompletionInfo(position, file, [
        ...getJSDocTagCompletions(),
        ...getJSDocParameterCompletionsForPosition(file, position, checker, compilerOptions, preferences, false),
      ]);
    }
    if (isCompletionDataJSDocParameterName(data)) {
      return jsDocCompletionInfo(position, file, getJSDocParameterNameCompletions(data.tag as Node));
    }
    throw new Error(`getCompletionData returned unexpected shape`);
  } finally {
    normalizedLease?.release();
  }
}

export function getCompletionData(
  service: CompletionService,
  checker: CompletionChecker,
  file: SourceFile,
  position: number,
  preferences: UserPreferences,
  forItemResolve: boolean,
): CompletionData | undefined {
  const currentToken = getTokenAtPositionPublic(file, position);
  const insideComment = isInComment(file, position, currentToken);
  let insideJSDocTagTypeExpression = false;
  let insideJSDocImportTag = false;

  if (insideComment !== undefined) {
    if (hasDocComment(file, position)) {
      if (position > 0 && file.text[position - 1] === "@") {
        return { jsDocCompletionKind: "tagName" };
      }
      if (commentPrefixPermitsJSDocTagCompletion(file, position)) {
        return { jsDocCompletionKind: "tag" };
      }
    }

    const tag = getJSDocTagAtPosition(currentToken, position);
    if (tag !== undefined) {
      const tagName = nodeName(tag);
      if (tagName !== undefined && tagName.pos <= position && position <= tagName.end) {
        return { jsDocCompletionKind: "tagName" };
      }
      if (isJSDocImportTag(tag)) {
        insideJSDocImportTag = true;
      } else {
        insideJSDocTagTypeExpression = isCurrentlyEditingJSDocTypeExpression(tag, position);
        if (!insideJSDocTagTypeExpression && isJSDocParameterTag(tag)) {
          const name = nodeName(tag);
          if (name === undefined || name.pos <= position && position <= name.end) {
            return { tag };
          }
        }
      }
    }

    if (!insideJSDocTagTypeExpression && !insideJSDocImportTag) return undefined;
  }

  const { contextToken, previousToken } = getRelevantTokens(position, file);
  const location = getTouchingPropertyName(file, position);
  const keywordFilters = keywordFiltersForCompletionContext(contextToken, location, insideJSDocTagTypeExpression, insideJSDocImportTag);
  const isTypeOnlyLocation = insideJSDocTagTypeExpression || insideJSDocImportTag
    || (location !== undefined && (isContextTokenTypeLocation(location) || isTypeLocationNode(location)));
  const commitCharacterDecision = computeCommitCharactersAndIsNewIdentifier(contextToken, file, position);
  const isNewIdentifierLocation = isNewIdentifierCompletionLocation(contextToken, previousToken, location)
    || commitCharacterDecision.isNewIdentifierLocation;

  const serviceData = service.getCompletionDataAtPosition?.({
    checker,
    file,
    position,
    preferences,
    forItemResolve,
    currentToken,
    contextToken,
    previousToken,
    location,
    keywordFilters,
    insideJSDocTagTypeExpression,
    insideJSDocImportTag,
    isTypeOnlyLocation,
    isNewIdentifierLocation,
    defaultCommitCharacters: commitCharacterDecision.defaultCommitCharacters,
  });
  if (serviceData !== undefined) return serviceData;
  if (keywordFilters !== KeywordCompletionFilters.None) {
    return keywordCompletionData(keywordFilters, !insideJSDocTagTypeExpression && isJavaScriptSourceFile(file), isNewIdentifierLocation);
  }
  return undefined;
}

export interface CompletionItemCreateInput {
  readonly symbol: CompletionSymbol;
  readonly sortText: SortText;
  readonly data: CompletionDataData;
  readonly position: number;
  readonly file: SourceFile;
  readonly name: string;
  readonly needsConvertPropertyAccess: boolean;
  readonly origin?: SymbolOriginInfo;
  readonly isMemberCompletion: boolean;
}

export interface CompletionSymbol extends Partial<Symbol> {
  readonly name?: string;
  readonly escapedName?: string;
  readonly declarations: Node[];
  readonly valueDeclaration?: Node;
  readonly parent?: CompletionSymbol;
  readonly flags?: number;
}

export function completionInfoFromData(
  host: CompletionInfoHost,
  file: SourceFile,
  data: CompletionDataData,
  position: number,
  optionalReplacementSpan?: Range,
): CompletionList | undefined {
  const preferences = host.userPreferences ?? {};
  const uniqueNames = new Set<string>();
  let sortedEntries = getCompletionEntriesFromSymbols(host, data, position, file);
  for (const entry of sortedEntries) uniqueNames.add(entry.label);
  const contextToken = data.contextToken;

  const isChecked = isCheckedFile(file, host.compilerOptions ?? {});
  if (isChecked && !data.isNewIdentifierLocation && data.symbols.length === 0 && data.keywordFilters === KeywordCompletionFilters.None) {
    return undefined;
  }

  if (data.keywordFilters !== KeywordCompletionFilters.None) {
    for (const keywordEntry of getKeywordCompletions(data.keywordFilters, false)) {
      const isTypeKeywordEntry = isTypeKeyword(stringToKeywordKind(keywordEntry.label));
      if (data.isTypeOnlyLocation && isTypeKeywordEntry
        || !data.isTypeOnlyLocation && isContextualKeywordInAutoImportableExpressionSpace(keywordEntry.label)
        || !uniqueNames.has(keywordEntry.label)) {
        uniqueNames.add(keywordEntry.label);
        sortedEntries = [...sortedEntries, keywordEntry];
      }
    }
  }

  for (const keywordEntry of getContextualKeywords(file, contextToken, position)) {
    if (!uniqueNames.has(keywordEntry.label)) {
      uniqueNames.add(keywordEntry.label);
      sortedEntries = [...sortedEntries, keywordEntry];
    }
  }

  for (const literal of data.literals) {
    const literalEntry = createCompletionItemForLiteral(file, preferences, literal);
    uniqueNames.add(literalEntry.label);
    sortedEntries = [...sortedEntries, literalEntry];
  }

  if (isJavaScriptSourceFile(file)) {
    sortedEntries = getJSCompletionEntries(file as JavaScriptNameTableSourceFile, position, uniqueNames, sortedEntries);
  }

  const itemDefaults = host.rangeService === undefined
    ? optionalReplacementSpan === undefined ? undefined : { editRange: { range: optionalReplacementSpan } }
    : setItemDefaults(
        host.rangeService,
        host.clientCapabilities,
        position,
        file,
        sortedEntries,
        data.defaultCommitCharacters,
        optionalReplacementSpan,
      );

  return {
    isIncomplete: data.hasUnresolvedAutoImports,
    ...(itemDefaults === undefined ? {} : { itemDefaults }),
    items: sortedEntries,
  };
}

export function getCompletionEntriesFromSymbols(
  host: CompletionInfoHost,
  data: CompletionDataData,
  position: number,
  file: SourceFile,
): readonly CompletionItem[] {
  const uniques = new Map<string, boolean>();
  const sortedEntries: CompletionItem[] = [];
  const isMemberCompletion = isMemberCompletionKind(data.completionKind);

  for (let index = 0; index < data.symbols.length; index += 1) {
    const symbol = data.symbols[index] as CompletionSymbol;
    const origin = data.symbolToOriginInfoMap.get(index);
    const display = getCompletionEntryDisplayNameForSymbol(symbol, origin, data.completionKind, data.isJsxIdentifierExpected);
    if (display.displayName === "") continue;
    if (uniques.get(display.displayName) === true && (origin === undefined || !originIsObjectLiteralMethod(origin))) continue;
    if (data.completionKind === CompletionKind.Global && !shouldIncludeSymbol(symbol, data, file)) continue;

    const originalSortText = data.symbolToSortTextMap.get(symbolId(symbol)) ?? SortTextLocationPriority;
    const entry = host.createCompletionItem?.({
      symbol,
      sortText: originalSortText,
      data,
      position,
      file,
      name: display.displayName,
      needsConvertPropertyAccess: display.needsConvertPropertyAccess,
      ...(origin === undefined ? {} : { origin }),
      isMemberCompletion,
    }) ?? createCompletionItem(
      symbol,
      originalSortText,
      data,
      position,
      file,
      display.displayName,
      display.needsConvertPropertyAccess,
      origin,
      isMemberCompletion,
    );
    if (entry === undefined) continue;

    const shouldShadowLaterSymbols = (origin === undefined || originIsTypeOnlyAlias(origin))
      && !(symbol.parent === undefined && symbol.declarations.some(declaration => declaration.getSourceFile() === file));
    uniques.set(display.displayName, shouldShadowLaterSymbols);
    sortedEntries.push(entry);
  }

  for (const autoImport of data.autoImports) {
    const candidate = asAutoImportCompletion(autoImport);
    const name = candidate.fix?.name ?? candidate.name ?? "";
    if (name === "" || uniques.get(name) === true) continue;

    const token = stringToKeywordKind(name);
    if (token !== Kind.Unknown && isNonContextualKeyword(token)) continue;
    if (!autoImportIsUsableAtLocation(candidate, data.isTypeOnlyLocation)) continue;

    const moduleSpecifier = candidate.fix?.moduleSpecifier ?? candidate.moduleSpecifier ?? "";
    const exportEntry = candidate.exportEntry;
    const elementKind = exportEntry?.scriptElementKind as ScriptElementKind | undefined;
    const kindModifiers = completionKindModifiersFromScriptElement(exportEntry?.scriptElementKindModifiers);
    uniques.set(name, false);
    sortedEntries.push(createLSPCompletionItem(
      name,
      "",
      "",
      SortTextAutoImportSuggestions,
      elementKind ?? ScriptElementKindAlias,
      kindModifiers,
      undefined,
      undefined,
      moduleSpecifier === "" ? undefined : { description: moduleSpecifier },
      file,
      position,
      false,
      false,
      true,
      false,
      moduleSpecifier,
      candidate.fix,
      undefined,
    ));
  }

  return sortedEntries.sort(CompareCompletionEntries);
}

interface AutoImportCompletion {
  readonly fix?: AutoImportFix;
  readonly exportEntry?: AutoImportExportEntry;
  readonly name?: string;
  readonly moduleSpecifier?: string;
}

interface AutoImportExportEntry {
  readonly flags?: number;
  readonly scriptElementKind?: number;
  readonly scriptElementKindModifiers?: number;
}

function asAutoImportCompletion(value: unknown): AutoImportCompletion {
  return value as AutoImportCompletion;
}

function autoImportIsUsableAtLocation(autoImport: AutoImportCompletion, isTypeOnlyLocation: boolean): boolean {
  const flags = autoImport.exportEntry?.flags;
  if (flags === undefined) return true;
  if (isTypeOnlyLocation) return (flags & (SymbolFlags.Type | SymbolFlags.Module)) !== 0;
  return (flags & SymbolFlags.Value) !== 0;
}

function completionKindModifiersFromScriptElement(modifiers: number | undefined): CompletionKindModifiers | undefined {
  if (modifiers === undefined) return undefined;
  const optional = (modifiers & ScriptElementKindModifierOptional) !== 0;
  const deprecated = (modifiers & ScriptElementKindModifierDeprecated) !== 0;
  return optional || deprecated ? { optional, deprecated } : undefined;
}

export function completionNameForLiteral(file: SourceFile, preferences: UserPreferences, literal: LiteralValue): string {
  switch (typeof literal) {
    case "string":
      return quote(file, preferences, literal);
    case "number":
      return JSON.stringify(literal);
    case "bigint":
      return `${literal.toString()}n`;
    default:
      throw new Error(`Unhandled literal value: ${String(literal)}`);
  }
}

export function createCompletionItemForLiteral(file: SourceFile, preferences: UserPreferences, literal: LiteralValue): CompletionItem {
  return {
    label: completionNameForLiteral(file, preferences, literal),
    kind: CompletionItemKindConstant,
    sortText: SortTextLocationPriority,
    commitCharacters: [],
  };
}

export interface CompletionKindModifiers {
  readonly optional?: boolean;
  readonly deprecated?: boolean;
}

export function createLSPCompletionItem(
  name: string,
  insertText: string,
  filterText: string,
  sortText: SortText,
  elementKind: ScriptElementKind,
  kindModifiers: CompletionKindModifiers | undefined,
  replacementSpan: Range | undefined,
  commitCharacters: readonly string[] | undefined,
  labelDetails: CompletionItemLabelDetails | undefined,
  file: SourceFile,
  position: number,
  isMemberCompletion: boolean,
  isSnippet: boolean,
  hasAction: boolean,
  preselect: boolean,
  source: string,
  autoImportFix: CompletionItemData["autoImport"] | undefined,
  detail: string | undefined,
): CompletionItem {
  const kind = getCompletionsSymbolKind(elementKind);
  const data = completionItemData(file.fileName, position, name);
  const textEdit = replacementSpan === undefined
    ? undefined
    : {
        textEdit: {
          newText: insertText === "" ? name : insertText,
          range: replacementSpan,
        },
      };

  const word = getWordLengthAndStart(file, position);
  const computedFilterText = filterText === ""
    ? getFilterText(insertText, name, word.wordStart, getDotAccessor(file, Math.max(0, position - word.wordLength)))
    : filterText;
  const optional = kindModifiers?.optional === true;
  const deprecated = kindModifiers?.deprecated === true;
  const label = optional ? `${name}?` : name;
  const finalInsertText = optional && insertText === "" ? name : insertText;
  const finalFilterText = optional && computedFilterText === "" ? name : computedFilterText;
  const itemData = {
    ...data,
    ...(source === "" ? {} : { source }),
    ...(autoImportFix === undefined ? {} : { autoImport: autoImportFix }),
  };

  return {
    label,
    kind,
    ...(labelDetails === undefined ? {} : { labelDetails }),
    ...(deprecated ? { tags: [CompletionItemTagDeprecated] } : {}),
    ...(detail === undefined || detail === "" ? {} : { detail }),
    ...(preselect ? { preselect } : {}),
    sortText,
    ...(finalFilterText === "" || finalFilterText === finalInsertText ? {} : { filterText: finalFilterText }),
    ...(finalInsertText === "" ? {} : { insertText: finalInsertText }),
    ...(isSnippet ? { insertTextFormat: InsertTextFormatSnippet } : {}),
    ...(textEdit === undefined ? {} : { textEdit }),
    ...(commitCharacters === undefined ? {} : { commitCharacters }),
    ...(!isMemberCompletion && !hasAction && source === "" && autoImportFix === undefined ? {} : { data: itemData }),
  };
}

export function createCompletionItem(
  symbol: CompletionSymbol,
  sortText: SortText,
  data: CompletionDataData,
  position: number,
  file: SourceFile,
  name: string,
  needsConvertPropertyAccess: boolean,
  origin: SymbolOriginInfo | undefined,
  isMemberCompletion: boolean,
): CompletionItem | undefined {
  let insertText = "";
  let filterText = "";
  let source = getSourceFromOrigin(origin);
  let labelDetails: CompletionItemLabelDetails | undefined;
  let isSnippet = false;

  const insertQuestionDot = originIsNullableMember(origin);
  const useBraces = originIsSymbolMember(origin) || needsConvertPropertyAccess;
  if (originIsThisTypeNode(origin)) {
    insertText = needsConvertPropertyAccess
      ? `this${insertQuestionDot ? "?." : ""}[${quotePropertyName(file, data.defaultCommitCharacters.length === 0 ? {} : {}, name)}]`
      : `this${insertQuestionDot ? "?." : "."}${name}`;
  } else if (data.propertyAccessToConvert !== undefined && (useBraces || insertQuestionDot)) {
    insertText = useBraces ? `[${needsConvertPropertyAccess ? quotePropertyName(file, {}, name) : name}]` : name;
    if (insertQuestionDot) insertText = `?.${insertText}`;
  }

  if (data.jsxInitializer.isInitializer) {
    if (insertText === "") insertText = name;
    insertText = `{${insertText}}`;
  }

  if (origin !== undefined && originIsObjectLiteralMethod(origin)) {
    const method = symbolOriginInfoAsObjectLiteralMethod(origin);
    insertText = method.insertText;
    isSnippet = method.isSnippet;
    labelDetails = method.labelDetails;
    source = completionSourceObjectLiteralMethodSnippet;
  }

  const word = getWordLengthAndStart(file, position);
  filterText = getFilterText(insertText, name, word.wordStart, getDotAccessor(file, position));

  return createLSPCompletionItem(
    name,
    insertText,
    filterText,
    sortText,
    completionElementKindForSymbol(symbol, isMemberCompletion),
    completionKindModifiersForSymbol(symbol),
    undefined,
    data.defaultCommitCharacters.length === 0 ? [] : undefined,
    labelDetails,
    file,
    position,
    isMemberCompletion,
    isSnippet,
    false,
    isRecommendedCompletionMatch(symbol, data.recommendedCompletion as CompletionSymbol | undefined),
    source,
    undefined,
    undefined,
  );
}

function completionElementKindForSymbol(symbol: CompletionSymbol, isMemberCompletion: boolean): ScriptElementKind {
  const flags = symbol.flags ?? 0;
  if ((flags & SymbolFlags.Method) !== 0) return ScriptElementKindMemberFunctionElement;
  if ((flags & SymbolFlags.Function) !== 0) return ScriptElementKindFunctionElement;
  if ((flags & SymbolFlags.Class) !== 0) return ScriptElementKindClassElement;
  if ((flags & SymbolFlags.Interface) !== 0) return ScriptElementKindInterfaceElement;
  if ((flags & SymbolFlags.EnumMember) !== 0) return ScriptElementKindEnumMemberElement;
  if ((flags & SymbolFlags.Enum) !== 0) return ScriptElementKindEnumElement;
  if ((flags & SymbolFlags.Module) !== 0) return ScriptElementKindModuleElement;
  if ((flags & SymbolFlags.TypeAlias) !== 0) return ScriptElementKindTypeElement;
  if ((flags & SymbolFlags.GetAccessor) !== 0) return ScriptElementKindMemberGetAccessorElement;
  if ((flags & SymbolFlags.SetAccessor) !== 0) return ScriptElementKindMemberSetAccessorElement;
  if ((flags & SymbolFlags.Property) !== 0) return isMemberCompletion ? ScriptElementKindMemberVariableElement : ScriptElementKindVariableElement;
  return isMemberCompletion ? ScriptElementKindMemberVariableElement : ScriptElementKindVariableElement;
}

function completionKindModifiersForSymbol(symbol: CompletionSymbol): CompletionKindModifiers | undefined {
  const flags = symbol.flags ?? 0;
  const optional = (flags & SymbolFlags.Optional) !== 0;
  const deprecated = symbol.declarations.some(declaration => hasJSDocDeprecatedTag(declaration));
  return optional || deprecated ? { optional, deprecated } : undefined;
}

function hasJSDocDeprecatedTag(node: Node): boolean {
  for (const jsDoc of nodeArray(node, "jsDoc")) {
    for (const tag of nodeArray(jsDoc, "tags")) {
      if (tag.kind === Kind.JSDocDeprecatedTag) return true;
      if (nodeTextOf(nodeName(tag)) === "deprecated") return true;
    }
  }
  return false;
}

export function isRecommendedCompletionMatch(localSymbol: CompletionSymbol, recommendedCompletion: CompletionSymbol | undefined): boolean {
  return localSymbol === recommendedCompletion
    || ((localSymbol.flags ?? 0) & SymbolFlags.ExportValue) !== 0 && localSymbol.exportSymbol === recommendedCompletion;
}

export function getLineOfPosition(file: SourceFile, pos: number): number {
  return computeLineStarts(file.text).findLastIndex(start => start <= pos);
}

export function getLineEndOfPosition(file: SourceFile, pos: number): number {
  const line = getLineOfPosition(file, pos);
  const lineStarts = computeLineStarts(file.text);
  let lastCharPos = line + 1 >= lineStarts.length ? file.end : lineStarts[line + 1]! - 1;
  if (lastCharPos > 0 && lastCharPos < file.text.length && file.text[lastCharPos] === "\n" && file.text[lastCharPos - 1] === "\r") {
    lastCharPos -= 1;
  }
  return lastCharPos;
}

export function isClassLikeMemberCompletion(_symbol: CompletionSymbol, _location: unknown, _file: SourceFile): boolean {
  return false;
}

export function symbolAppearsToBeTypeOnly(symbol: CompletionSymbol): boolean {
  const flags = symbol.flags ?? 0;
  return (flags & SymbolFlags.Value) === 0
    && (symbol.declarations.length === 0 || (flags & SymbolFlags.Type) !== 0);
}

export function shouldIncludeSymbol(symbol: CompletionSymbol, data: CompletionDataData, file: SourceFile): boolean {
  const location = data.location as Node | undefined;
  if (location?.parent?.kind === Kind.ExportAssignment) return true;
  if (!data.isTypeOnlyLocation) return ((symbol.flags ?? 0) & SymbolFlags.Value) !== 0;
  return symbolCanBeReferencedAtTypeLocation(symbol);
}

export interface CompletionDisplayName {
  readonly displayName: string;
  readonly needsConvertPropertyAccess: boolean;
}

export function getCompletionEntryDisplayNameForSymbol(
  symbol: CompletionSymbol,
  origin: SymbolOriginInfo | undefined,
  completionKind: CompletionKind,
  isJsxIdentifierExpected: boolean,
): CompletionDisplayName {
  if (originIsIgnore(origin)) return { displayName: "", needsConvertPropertyAccess: false };
  const name = originIncludesSymbolName(origin) ? symbolOriginInfoSymbolName(origin!) : symbolName(symbol);
  if (name === "" || ((symbol.flags ?? 0) & SymbolFlags.Module) !== 0 && startsWithQuote(name)) {
    return { displayName: "", needsConvertPropertyAccess: false };
  }
  if (isIdentifierText(name, isJsxIdentifierExpected ? LanguageVariant.JSX : LanguageVariant.Standard)
    || symbol.valueDeclaration?.kind === Kind.PrivateIdentifier) {
    return { displayName: name, needsConvertPropertyAccess: false };
  }
  if (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) return { displayName: name, needsConvertPropertyAccess: true };
  switch (completionKind) {
    case CompletionKind.MemberLike:
      return originIsComputedPropertyName(origin) ? { displayName: symbolOriginInfoSymbolName(origin!), needsConvertPropertyAccess: false } : { displayName: "", needsConvertPropertyAccess: false };
    case CompletionKind.ObjectPropertyDeclaration:
      return { displayName: JSON.stringify(name), needsConvertPropertyAccess: false };
    case CompletionKind.PropertyAccess:
    case CompletionKind.Global:
      return name.startsWith(" ") ? { displayName: "", needsConvertPropertyAccess: false } : { displayName: name, needsConvertPropertyAccess: true };
    case CompletionKind.None:
    case CompletionKind.String:
      return { displayName: name, needsConvertPropertyAccess: false };
    default:
      throw new Error(`Unexpected completion kind: ${completionKind}`);
  }
}

export function originIsIgnore(origin: SymbolOriginInfo | undefined): boolean {
  return origin !== undefined && (origin.kind & SymbolOriginInfoKind.Ignore) !== 0;
}

export function originIncludesSymbolName(origin: SymbolOriginInfo | undefined): boolean {
  return originIsComputedPropertyName(origin);
}

export function originIsComputedPropertyName(origin: SymbolOriginInfo | undefined): boolean {
  return origin !== undefined && (origin.kind & SymbolOriginInfoKind.ComputedPropertyName) !== 0;
}

export function originIsObjectLiteralMethod(origin: SymbolOriginInfo | undefined): boolean {
  return origin !== undefined && (origin.kind & SymbolOriginInfoKind.ObjectLiteralMethod) !== 0;
}

export function originIsThisTypeNode(origin: SymbolOriginInfo | undefined): boolean {
  return origin !== undefined && (origin.kind & SymbolOriginInfoKind.ThisType) !== 0;
}

export function originIsTypeOnlyAlias(origin: SymbolOriginInfo | undefined): boolean {
  return origin !== undefined && (origin.kind & SymbolOriginInfoKind.TypeOnlyAlias) !== 0;
}

export function originIsSymbolMember(origin: SymbolOriginInfo | undefined): boolean {
  return origin !== undefined && (origin.kind & SymbolOriginInfoKind.SymbolMember) !== 0;
}

export function originIsNullableMember(origin: SymbolOriginInfo | undefined): boolean {
  return origin !== undefined && (origin.kind & SymbolOriginInfoKind.Nullable) !== 0;
}

export function originIsPromise(origin: SymbolOriginInfo | undefined): boolean {
  return origin !== undefined && (origin.kind & SymbolOriginInfoKind.Promise) !== 0;
}

export function getSourceFromOrigin(origin: SymbolOriginInfo | undefined): string {
  if (originIsThisTypeNode(origin)) return completionSourceThisProperty;
  if (originIsTypeOnlyAlias(origin)) return completionSourceTypeOnlyAlias;
  return "";
}

export interface RelevantTokens {
  readonly contextToken?: Node;
  readonly previousToken?: Node;
}

export function getRelevantTokens(position: number, file: SourceFile): RelevantTokens {
  const previousToken = findPrecedingToken(file, position);
  if (previousToken !== undefined && position <= previousToken.end && (isMemberName(previousToken) || isKeywordKind(previousToken.kind))) {
    const contextToken = findPrecedingToken(file, previousToken.pos);
    return contextToken === undefined ? { previousToken } : { contextToken, previousToken };
  }
  return previousToken === undefined ? {} : { contextToken: previousToken, previousToken };
}

export function isCheckedFile(
  file: SourceFile & { readonly isJavaScriptFile?: boolean },
  compilerOptions: { readonly checkJs?: boolean | Tristate | undefined },
): boolean {
  const checkJs = compilerOptions.checkJs;
  return !file.isDeclarationFile && (!file.isJavaScriptFile || checkJs === true || typeof checkJs === "number" && tristateIsTrue(checkJs));
}

export function isContextTokenValueLocation(contextToken: Node): boolean {
  const parent = contextToken.parent;
  return parent !== undefined
    && (contextToken.kind === Kind.TypeOfKeyword && (isTypeQueryNode(parent) || parent.kind === Kind.TypeOfExpression)
      || contextToken.kind === Kind.AssertsKeyword && parent.kind === Kind.TypePredicate);
}

export interface TypeArgumentPositionChecker {
  readonly getTypeAtLocation?: (node: Node) => unknown;
  readonly getSignaturesOfType?: (type: unknown, kind: number) => readonly { readonly typeParameters?: readonly unknown[] }[];
}

export function isPossiblyTypeArgumentPosition(
  token: Node | undefined,
  sourceFile: SourceFile,
  checker: TypeArgumentPositionChecker,
): boolean {
  const info = getPossibleTypeArgumentsInfo(token, sourceFile);
  if (info === undefined) return false;
  return isPartOfTypeNode(info.called)
    || possibleGenericSignatures(info.called, info.nTypeArguments, checker).length !== 0
    || isPossiblyTypeArgumentPosition(info.called, sourceFile, checker);
}

export function isContextTokenTypeLocation(contextToken: Node): boolean {
  const parent = contextToken.parent;
  if (parent === undefined) return false;
  switch (contextToken.kind) {
    case Kind.ColonToken:
      return isPropertyDeclaration(parent)
        || isPropertySignatureDeclaration(parent)
        || isParameterDeclaration(parent)
        || isVariableDeclaration(parent)
        || isFunctionLike(parent);
    case Kind.EqualsToken:
      return parent.kind === Kind.TypeAliasDeclaration || isTypeParameterDeclaration(parent);
    case Kind.AsKeyword:
      return isAsExpression(parent);
    case Kind.LessThanToken:
      return isTypeReferenceNode(parent) || isTypeAssertion(parent);
    case Kind.ExtendsKeyword:
      return isTypeParameterDeclaration(parent);
    case Kind.SatisfiesKeyword:
      return isSatisfiesExpression(parent);
    default:
      return false;
  }
}

export interface GlobalTypeChecker extends ObjectLikeCompletionChecker {
  readonly getGlobalSymbol?: (name: string, meanings: SymbolFlags, diagnostic?: unknown) => CompletionSymbol | undefined;
}

export function isProbablyGlobalType(type: CompletionTypeLike, file: SourceFile, checker: GlobalTypeChecker): boolean {
  for (const name of ["self", "global", "globalThis"]) {
    const symbol = checker.getGlobalSymbol?.(name, SymbolFlags.Value);
    if (symbol !== undefined && checker.getTypeOfSymbolAtLocation?.(symbol, file) === type) return true;
  }
  return false;
}

export function tryGetTypeLiteralNode(node: Node | undefined): Node | undefined {
  if (node === undefined) return undefined;
  const parent = node.parent;
  switch (node.kind) {
    case Kind.OpenBraceToken:
      return parent?.kind === Kind.TypeLiteral ? parent : undefined;
    case Kind.SemicolonToken:
    case Kind.CommaToken:
    case Kind.Identifier:
      return parent?.kind === Kind.PropertySignature && parent.parent?.kind === Kind.TypeLiteral ? parent.parent : undefined;
    default:
      return undefined;
  }
}

export interface TypeArgumentConstraintChecker {
  readonly getTypeArgumentConstraint?: (node: Node) => CompletionTypeLike | undefined;
  readonly getTypeOfPropertyOfContextualType?: (type: CompletionTypeLike, name: string) => CompletionTypeLike | undefined;
  readonly getElementTypeOfArrayType?: (type: CompletionTypeLike) => CompletionTypeLike | undefined;
}

export function getConstraintOfTypeArgumentProperty(
  node: Node | undefined,
  checker: TypeArgumentConstraintChecker,
): CompletionTypeLike | undefined {
  if (node === undefined) return undefined;
  if (isTypeNode(node)) {
    const constraint = checker.getTypeArgumentConstraint?.(node);
    if (constraint !== undefined) return constraint;
  }

  const parentConstraint = getConstraintOfTypeArgumentProperty(node.parent, checker);
  if (parentConstraint === undefined) return undefined;

  switch (node.kind) {
    case Kind.PropertySignature: {
      const propertyName = getPropertyNameForPropertyNameNode(nodeName(node));
      return propertyName === "" ? undefined : checker.getTypeOfPropertyOfContextualType?.(parentConstraint, propertyName);
    }
    case Kind.ColonToken:
      return node.parent?.kind === Kind.PropertySignature ? parentConstraint : undefined;
    case Kind.IntersectionType:
    case Kind.TypeLiteral:
    case Kind.UnionType:
      return parentConstraint;
    case Kind.OpenBracketToken:
      return checker.getElementTypeOfArrayType?.(parentConstraint);
    default:
      return undefined;
  }
}

export function isEqualityOperatorKind(kind: Kind): boolean {
  return kind === Kind.EqualsEqualsToken
    || kind === Kind.EqualsEqualsEqualsToken
    || kind === Kind.ExclamationEqualsToken
    || kind === Kind.ExclamationEqualsEqualsToken;
}

export function getNullableSymbolOriginInfoKind(
  kind: SymbolOriginInfoKind,
  insertQuestionDot: boolean,
): SymbolOriginInfoKind {
  return insertQuestionDot ? kind | SymbolOriginInfoKind.Nullable : kind;
}

export function getCompletionsSymbolKind(kind: ScriptElementKind): CompletionItemKind {
  switch (kind) {
    case ScriptElementKindPrimitiveType:
    case ScriptElementKindKeyword:
      return CompletionItemKindKeyword;
    case ScriptElementKindConstElement:
    case ScriptElementKindLetElement:
    case ScriptElementKindVariableElement:
    case ScriptElementKindLocalVariableElement:
    case ScriptElementKindAlias:
    case ScriptElementKindParameterElement:
      return CompletionItemKindVariable;
    case ScriptElementKindMemberVariableElement:
    case ScriptElementKindMemberGetAccessorElement:
    case ScriptElementKindMemberSetAccessorElement:
      return CompletionItemKindField;
    case ScriptElementKindFunctionElement:
    case ScriptElementKindLocalFunctionElement:
      return CompletionItemKindFunction;
    case ScriptElementKindMemberFunctionElement:
    case ScriptElementKindConstructSignatureElement:
    case ScriptElementKindCallSignatureElement:
    case ScriptElementKindIndexSignatureElement:
      return CompletionItemKindMethod;
    case ScriptElementKindEnumElement:
      return CompletionItemKindEnum;
    case ScriptElementKindEnumMemberElement:
      return CompletionItemKindEnumMember;
    case ScriptElementKindModuleElement:
    case ScriptElementKindExternalModuleName:
      return CompletionItemKindModule;
    case ScriptElementKindClassElement:
    case ScriptElementKindTypeElement:
      return CompletionItemKindClass;
    case ScriptElementKindInterfaceElement:
      return CompletionItemKindInterface;
    case ScriptElementKindWarning:
      return CompletionItemKindText;
    case ScriptElementKindScriptElement:
      return CompletionItemKindFile;
    case ScriptElementKindDirectory:
      return CompletionItemKindFolder;
    case ScriptElementKindString:
      return CompletionItemKindConstant;
    default:
      return CompletionItemKindProperty;
  }
}

export const jsDocTagNames: readonly string[] = [
  "abstract",
  "access",
  "alias",
  "argument",
  "async",
  "augments",
  "author",
  "borrows",
  "callback",
  "class",
  "classdesc",
  "constant",
  "constructor",
  "constructs",
  "copyright",
  "default",
  "deprecated",
  "description",
  "emits",
  "enum",
  "event",
  "example",
  "exports",
  "extends",
  "external",
  "field",
  "file",
  "fileoverview",
  "fires",
  "function",
  "generator",
  "global",
  "hideconstructor",
  "host",
  "ignore",
  "implements",
  "import",
  "inheritdoc",
  "inner",
  "instance",
  "interface",
  "kind",
  "lends",
  "license",
  "link",
  "linkcode",
  "linkplain",
  "listens",
  "member",
  "memberof",
  "method",
  "mixes",
  "module",
  "name",
  "namespace",
  "overload",
  "override",
  "package",
  "param",
  "private",
  "prop",
  "property",
  "protected",
  "public",
  "readonly",
  "requires",
  "returns",
  "satisfies",
  "see",
  "since",
  "static",
  "summary",
  "template",
  "this",
  "throws",
  "todo",
  "tutorial",
  "type",
  "typedef",
  "var",
  "variation",
  "version",
  "virtual",
  "yields",
];

let jsDocTagNameCompletionItemsValue: readonly CompletionItem[] | undefined;
let jsDocTagCompletionItemsValue: readonly CompletionItem[] | undefined;

export function getContextualKeywords(file: SourceFile, contextToken: Node | undefined, position: number): readonly CompletionItem[] {
  if (contextToken === undefined || contextToken.parent === undefined) return [];
  const parent = contextToken.parent;
  const sameLine = getLineOfPosition(file, contextToken.end) === getLineOfPosition(file, position);
  if (!sameLine || moduleSpecifierOf(parent) !== contextToken) return [];
  if (parent.kind !== Kind.ImportDeclaration && parent.kind !== Kind.ExportDeclaration) return [];
  return [{
    label: "assert",
    kind: CompletionItemKindKeyword,
    sortText: SortTextGlobalsOrKeywords,
  }];
}

export interface JavaScriptNameTableSourceFile extends SourceFile {
  getNameTable?(): ReadonlyMap<string, number> | Readonly<Record<string, number>>;
}

export function getJSCompletionEntries(
  file: JavaScriptNameTableSourceFile,
  position: number,
  uniqueNames: Set<string>,
  sortedEntries: readonly CompletionItem[],
): readonly CompletionItem[] {
  const entries = [...sortedEntries];
  for (const [name, declarationPosition] of nameTableEntries(file)) {
    if (declarationPosition === position || uniqueNames.has(name) || !isIdentifierText(name, LanguageVariant.Standard)) continue;
    uniqueNames.add(name);
    entries.push({
      label: name,
      kind: CompletionItemKindText,
      sortText: SortTextJavascriptIdentifiers,
      commitCharacters: [],
    });
  }
  return entries;
}

export function getJSDocTagNameCompletions(): readonly CompletionItem[] {
  jsDocTagNameCompletionItemsValue ??= jsDocTagNames.map((tagName): CompletionItem => ({
    label: tagName,
    kind: CompletionItemKindKeyword,
    sortText: SortTextLocationPriority,
  }));
  return cloneItems(jsDocTagNameCompletionItemsValue);
}

export function getJSDocTagCompletions(): readonly CompletionItem[] {
  jsDocTagCompletionItemsValue ??= jsDocTagNames.map((tagName): CompletionItem => ({
    label: `@${tagName}`,
    kind: CompletionItemKindKeyword,
    sortText: SortTextLocationPriority,
  }));
  return cloneItems(jsDocTagCompletionItemsValue);
}

export interface JSDocParameterCompletionOptions {
  readonly isJavaScript?: boolean;
  readonly tagNameOnly?: boolean;
  readonly newLine?: string;
}

export function getJSDocParameterCompletions(
  jsDoc: Node,
  functionLike: Node,
  options: JSDocParameterCompletionOptions = {},
): readonly CompletionItem[] {
  const tags = nodeArray(jsDoc, "tags");
  let parameterTagCount = 0;
  for (const tag of tags) {
    if (tag.kind === Kind.JSDocParameterTag && nodeName(tag)?.kind === Kind.Identifier) parameterTagCount += 1;
  }

  const items: CompletionItem[] = [];
  const parameters = nodeArray(functionLike, "parameters");
  for (let parameterIndex = 0; parameterIndex < parameters.length; parameterIndex += 1) {
    const parameter = parameters[parameterIndex]!;
    if (parameterIndex < parameterTagCount) continue;
    const name = nodeName(parameter);
    const initializer = nodeProperty<Node>(parameter, "initializer");
    const dotDotDotToken = nodeProperty<Node>(parameter, "dotDotDotToken");
    if (name?.kind === Kind.Identifier) {
      let label = getJSDocParamAnnotation(
        nodeTextOf(name),
        initializer,
        dotDotDotToken,
        options.isJavaScript === true,
        false,
      );
      if (options.tagNameOnly === true) label = label.replace(/^@/u, "");
      items.push({ label, kind: CompletionItemKindVariable, sortText: SortTextLocationPriority });
    } else if (parameterIndex === parameterTagCount && name !== undefined) {
      const labels = generateJSDocParamTagsForDestructuring(
        `param${parameterIndex}`,
        name,
        initializer,
        dotDotDotToken,
        options.isJavaScript === true,
      );
      const joiner = `${options.newLine ?? "\n"}* `;
      let label = labels.join(joiner);
      if (options.tagNameOnly === true) label = label.replace(/^@/u, "");
      items.push({ label, kind: CompletionItemKindVariable, sortText: SortTextLocationPriority });
    }
  }
  return items;
}

export function getJSDocParameterNameCompletions(tag: Node): readonly CompletionItem[] {
  const name = nodeName(tag);
  if (name?.kind !== Kind.Identifier) return [];
  const nameThusFar = nodeTextOf(name);
  const jsDoc = tag.parent;
  const functionLike = jsDoc?.parent;
  if (jsDoc === undefined || functionLike === undefined) return [];

  const tags = nodeArray(jsDoc, "tags");
  const items: CompletionItem[] = [];
  for (const parameter of nodeArray(functionLike, "parameters")) {
    const parameterName = nodeName(parameter);
    if (parameterName?.kind !== Kind.Identifier) continue;
    const text = nodeTextOf(parameterName);
    const alreadyTagged = tags.some(existing => existing !== tag && existing.kind === Kind.JSDocParameterTag && nodeTextOf(nodeName(existing)) === text);
    if (alreadyTagged || nameThusFar !== "" && !text.startsWith(nameThusFar)) continue;
    items.push({ label: text, kind: CompletionItemKindVariable, sortText: SortTextLocationPriority });
  }
  return items;
}

export function getJSDocParamAnnotation(
  parameterName: string,
  initializer: Node | undefined,
  dotDotDotToken: Node | undefined,
  isJavaScript: boolean,
  isObject: boolean,
): string {
  const actualParameterName = initializer === undefined ? parameterName : getJSDocParamNameWithInitializer(parameterName, initializer);
  if (!isJavaScript) return `@param ${actualParameterName} `;
  const typeText = isObject ? "object" : "*";
  const dotDotDot = !isObject && dotDotDotToken !== undefined ? "..." : "";
  return `@param {${dotDotDot}${typeText}} ${actualParameterName} `;
}

export function getJSDocParamNameWithInitializer(parameterName: string, initializer: Node): string {
  const initializerText = sourceText(initializer).trim();
  if (initializerText.includes("\n") || initializerText.length > 80) return `[${parameterName}]`;
  return `[${parameterName}=${initializerText}]`;
}

export function generateJSDocParamTagsForDestructuring(
  path: string,
  pattern: Node,
  initializer: Node | undefined,
  dotDotDotToken: Node | undefined,
  isJavaScript: boolean,
): readonly string[] {
  if (!isJavaScript) return [getJSDocParamAnnotation(path, initializer, dotDotDotToken, false, false)];
  return jsDocParamPatternWorker(path, pattern, initializer, dotDotDotToken, true);
}

export type CompletionsTriggerCharacter = "." | "\"" | "'" | "`" | "/" | "@" | "<" | "#" | " ";

export function isValidTrigger(file: SourceFile, triggerCharacter: CompletionsTriggerCharacter, contextToken: Node | undefined, position: number): boolean {
  switch (triggerCharacter) {
    case ".":
    case "@":
      return true;
    case "\"":
    case "'":
    case "`":
      return contextToken !== undefined && isStringLiteralOrTemplate(contextToken) && position === contextToken.pos + 1;
    case "#":
      return contextToken?.kind === Kind.PrivateIdentifier && getContainingClass(contextToken) !== undefined;
    case "<":
      return contextToken !== undefined
        && contextToken.kind === Kind.LessThanToken
        && (!isBinaryExpression(contextToken.parent) || binaryExpressionMayBeOpenTag(contextToken.parent));
    case "/":
      return contextToken !== undefined
        && (isStringLiteralOrTemplate(contextToken) || contextToken.kind === Kind.LessThanSlashToken && contextToken.parent !== undefined && isJsxClosingElement(contextToken.parent));
    case " ":
      return contextToken !== undefined && contextToken.kind === Kind.ImportKeyword && contextToken.parent?.kind === Kind.SourceFile;
    default:
      return false;
  }
}

function quotePropertyName(file: SourceFile, preferences: UserPreferences, name: string): string {
  return quote(file, preferences, name);
}

function normalizeCompletionCheckerLease(lease: CompletionCheckerLease): { readonly checker: CompletionChecker; readonly release: () => void } {
  if ("checker" in lease) return { checker: lease.checker, release: lease.release };
  return { checker: lease[0], release: lease[1] };
}

function completionInfoHost(service: CompletionService, preferences: UserPreferences): CompletionInfoHost {
  const compilerOptions = service.getProgram?.()?.options?.();
  const clientCapabilities = service.clientCapabilities?.();
  return {
    userPreferences: preferences,
    rangeService: service,
    ...(clientCapabilities === undefined ? {} : { clientCapabilities }),
    ...(compilerOptions === undefined ? {} : { compilerOptions }),
    ...(service.createCompletionItem === undefined ? {} : { createCompletionItem: service.createCompletionItem }),
  };
}

function completionStringService(service: CompletionService): StringLiteralCompletionService {
  return {
    ...completionInfoHost(service, service.userPreferences()),
    ...(service.getProgram === undefined ? {} : { getProgram: service.getProgram }),
    ...(service.getTripleSlashReferenceCompletions === undefined ? {} : { getTripleSlashReferenceCompletions: service.getTripleSlashReferenceCompletions }),
    ...(service.getStringLiteralCompletionsFromModuleNamesWorker === undefined ? {} : { getStringLiteralCompletionsFromModuleNamesWorker: service.getStringLiteralCompletionsFromModuleNamesWorker }),
    ...(service.getArgumentInfoForCompletions === undefined ? {} : { getArgumentInfoForCompletions: service.getArgumentInfoForCompletions }),
    ...(service.createRangeFromStringLiteralLikeContent === undefined ? {} : { createRangeFromStringLiteralLikeContent: service.createRangeFromStringLiteralLikeContent }),
  };
}

function asCompletionsTriggerCharacter(triggerCharacter: string | undefined): CompletionsTriggerCharacter | undefined {
  return triggerCharacter !== undefined && (TriggerCharacters as readonly string[]).includes(triggerCharacter)
    ? triggerCharacter as CompletionsTriggerCharacter
    : undefined;
}

function isCompletionDataData(data: CompletionData): data is CompletionDataData {
  return "completionKind" in data && "symbols" in data;
}

function isCompletionDataKeyword(data: CompletionData): data is CompletionDataKeyword {
  return "keywordCompletions" in data;
}

function isCompletionDataJSDocTagName(data: CompletionData): data is CompletionDataJSDocTagName {
  return "jsDocCompletionKind" in data && data.jsDocCompletionKind === "tagName";
}

function isCompletionDataJSDocTag(data: CompletionData): data is CompletionDataJSDocTag {
  return "jsDocCompletionKind" in data && data.jsDocCompletionKind === "tag";
}

function isCompletionDataJSDocParameterName(data: CompletionData): data is CompletionDataJSDocParameterName {
  return "tag" in data;
}

function specificKeywordCompletionInfo(
  service: CompletionService,
  file: SourceFile,
  position: number,
  keywordCompletions: readonly CompletionItem[],
  isNewIdentifierLocation: boolean,
  optionalReplacementSpan: Range | undefined,
): CompletionList {
  const commitCharacters = getDefaultCommitCharacters(isNewIdentifierLocation);
  const items = keywordCompletions.map(item => ({ ...item }));
  const itemDefaults = setItemDefaults(service, service.clientCapabilities?.(), position, file, items, commitCharacters, optionalReplacementSpan);
  return {
    isIncomplete: false,
    ...(itemDefaults === undefined ? {} : { itemDefaults }),
    items,
  };
}

function jsDocCompletionInfo(_position: number, _file: SourceFile, items: readonly CompletionItem[]): CompletionList {
  return {
    isIncomplete: false,
    items,
  };
}

export function getReplacementRangeForContextToken(service: CompletionService, file: SourceFile, contextToken: Node | undefined, position: number): Range | undefined {
  if (contextToken === undefined) return undefined;
  return getOptionalReplacementSpan(service, contextToken, file) ?? service.createRangeFromStringLiteralLikeContent?.(file, contextToken, position);
}

function getOptionalReplacementSpan(service: CompletionService, location: Node | undefined, file: SourceFile): Range | undefined {
  if (location === undefined || service.converters.positionToLineAndCharacter === undefined) return undefined;
  const start = getStartOfNode(location, file, false);
  if (start < location.end) {
    return createLspRangeFromBounds(service, start, location.end, file);
  }
  return undefined;
}

function getJSDocParameterCompletionsForPosition(
  file: SourceFile,
  position: number,
  _checker: CompletionChecker,
  _compilerOptions: CompilerOptions,
  _preferences: UserPreferences,
  tagNameOnly: boolean,
): readonly CompletionItem[] {
  const token = getTokenAtPositionPublic(file, position);
  const tag = getJSDocTagAtPosition(token, position);
  const jsDoc = tag === undefined ? findAncestor(token, isJSDoc) : findAncestor(tag, isJSDoc);
  const functionLike = jsDoc?.parent;
  if (jsDoc === undefined || functionLike === undefined) return [];
  return getJSDocParameterCompletions(jsDoc, functionLike, {
    isJavaScript: isJavaScriptSourceFile(file),
    tagNameOnly,
  });
}

function hasDocComment(file: SourceFile, position: number): boolean {
  const token = getTokenAtPositionPublic(file, position);
  return findAncestor(token, isJSDoc) !== undefined;
}

function getJSDocTagAtPosition(node: Node | undefined, position: number): Node | undefined {
  for (let current = node; current !== undefined; current = current.parent) {
    if (isJSDocTag(current) && current.pos <= position && position <= current.end) return current;
    if (isJSDoc(current)) return undefined;
  }
  return undefined;
}

function isCurrentlyEditingJSDocTypeExpression(tag: Node, position: number): boolean {
  const typeExpression = nodeProperty<Node>(tag, "typeExpression")
    ?? nodeProperty<Node>(tag, "type")
    ?? nodeProperty<Node>(tag, "constraint");
  return typeExpression !== undefined && typeExpression.pos <= position && position <= typeExpression.end;
}

function commentPrefixPermitsJSDocTagCompletion(file: SourceFile, position: number): boolean {
  const lineStart = lineStartPosition(file.text, position);
  for (const character of file.text.slice(lineStart, position)) {
    if (character !== " " && character !== "\t" && character !== "*" && character !== "/" && character !== "(" && character !== ")" && character !== "|") {
      return false;
    }
  }
  return true;
}

function lineStartPosition(text: string, position: number): number {
  let index = Math.max(0, Math.min(position, text.length));
  while (index > 0) {
    const previous = text[index - 1];
    if (previous === "\n" || previous === "\r") return index;
    index -= 1;
  }
  return 0;
}

function keywordFiltersForCompletionContext(
  contextToken: Node | undefined,
  location: Node | undefined,
  insideJSDocTagTypeExpression: boolean,
  insideJSDocImportTag: boolean,
): KeywordCompletionFilters {
  if (insideJSDocTagTypeExpression || insideJSDocImportTag) return KeywordCompletionFilters.TypeKeywords;
  if (contextToken === undefined) return KeywordCompletionFilters.All;
  if (isContextTokenTypeLocation(contextToken) || isTypeLocationNode(location)) return KeywordCompletionFilters.TypeKeywords;
  if (contextToken.parent?.kind === Kind.ClassDeclaration || contextToken.parent?.kind === Kind.ClassExpression) {
    return KeywordCompletionFilters.ClassElementKeywords;
  }
  if (contextToken.parent?.kind === Kind.InterfaceDeclaration || contextToken.parent?.kind === Kind.TypeLiteral) {
    return KeywordCompletionFilters.InterfaceElementKeywords;
  }
  return KeywordCompletionFilters.FunctionLikeBodyKeywords;
}

function isNewIdentifierCompletionLocation(contextToken: Node | undefined, previousToken: Node | undefined, location: Node | undefined): boolean {
  if (location === undefined) return true;
  if (contextToken === undefined || previousToken === undefined) return true;
  return contextToken.end < previousToken.pos || previousToken.kind === Kind.OpenBraceToken || previousToken.kind === Kind.CommaToken;
}

export interface CommitCharacterDecision {
  readonly isNewIdentifierLocation: boolean;
  readonly defaultCommitCharacters: readonly string[];
}

export function computeCommitCharactersAndIsNewIdentifier(
  contextToken: Node | undefined,
  file: SourceFile,
  position: number,
): CommitCharacterDecision {
  if (contextToken === undefined) {
    return { isNewIdentifierLocation: true, defaultCommitCharacters: emptyCommitCharacters };
  }
  const keyword = keywordForNode(contextToken);
  if (keyword !== undefined) {
    return {
      isNewIdentifierLocation: keyword !== Kind.ThisKeyword && keyword !== Kind.SuperKeyword,
      defaultCommitCharacters: keyword === Kind.ThisKeyword || keyword === Kind.SuperKeyword ? noCommaCommitCharacters : emptyCommitCharacters,
    };
  }
  if (isSolelyIdentifierDefinitionLocation(contextToken, file, position)) {
    return { isNewIdentifierLocation: true, defaultCommitCharacters: emptyCommitCharacters };
  }
  if (contextToken.kind === Kind.CommaToken || contextToken.kind === Kind.OpenParenToken) {
    return { isNewIdentifierLocation: false, defaultCommitCharacters: noCommaCommitCharacters };
  }
  return { isNewIdentifierLocation: false, defaultCommitCharacters: allCommitCharacters };
}

export function keywordForNode(node: Node | undefined): Kind | undefined {
  if (node === undefined) return undefined;
  return isKeywordKind(node.kind) ? node.kind : undefined;
}

export function getScopeNode(contextToken: Node | undefined, adjustedPosition: number, file: SourceFile): Node {
  let scope = contextToken;
  while (scope !== undefined && !positionBelongsToNode(scope, adjustedPosition)) {
    scope = scope.parent;
  }
  if (scope !== undefined) return scope;
  let best: Node = file;
  visitNodeTree(file, node => {
    if (positionBelongsToNode(node, adjustedPosition)) best = node;
  });
  return best;
}

export function isSnippetScope(node: Node): boolean {
  for (let current: Node | undefined = node; current !== undefined; current = current.parent) {
    switch (current.kind) {
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration:
      case Kind.Constructor:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.ClassStaticBlockDeclaration:
        return true;
      case Kind.SourceFile:
        return false;
      default:
        break;
    }
  }
  return false;
}

function isTypeLocationNode(node: Node | undefined): boolean {
  if (node === undefined) return false;
  return isTypeQueryNode(node)
    || isTypeReferenceNode(node)
    || node.kind === Kind.TypeLiteral
    || node.kind === Kind.TypeAliasDeclaration
    || node.kind === Kind.InterfaceDeclaration;
}

function isJavaScriptSourceFile(file: SourceFile): boolean {
  return Boolean((file as { readonly isJavaScriptFile?: boolean }).isJavaScriptFile);
}

export function isSolelyIdentifierDefinitionLocation(node: Node, _file: SourceFile, position: number): boolean {
  if (node.kind !== Kind.Identifier && node.kind !== Kind.PrivateIdentifier) return false;
  if (position < node.pos || position > node.end) return false;
  const parent = node.parent;
  if (parent === undefined || nodeName(parent) !== node) return false;
  switch (parent.kind) {
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.EnumDeclaration:
    case Kind.EnumMember:
    case Kind.ModuleDeclaration:
      return true;
    default:
      return false;
  }
}

function visitNodeTree(root: Node, visitor: (node: Node) => void): void {
  visitor(root);
  root.forEachChild(child => {
    visitNodeTree(child, visitor);
  });
}

function computeLineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text[index]!;
    if (ch === "\r") {
      if (text[index + 1] === "\n") index += 1;
      starts.push(index + 1);
    } else if (ch === "\n") {
      starts.push(index + 1);
    }
  }
  return starts;
}

function symbolId(symbol: CompletionSymbol): number {
  return Number((symbol as { readonly id?: number }).id ?? 0);
}

function symbolName(symbol: CompletionSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function symbolCanBeReferencedAtTypeLocation(symbol: CompletionSymbol): boolean {
  if ((symbol.flags ?? 0) & SymbolFlags.Alias) return true;
  return nonAliasCanBeReferencedAtTypeLocation(symbol);
}

export function nonAliasCanBeReferencedAtTypeLocation(symbol: CompletionSymbol): boolean {
  const flags = symbol.flags ?? 0;
  return (flags & (SymbolFlags.Type | SymbolFlags.Namespace)) !== 0 || isAbstractConstructorSymbol(symbol);
}

export function isAbstractConstructorSymbol(symbol: CompletionSymbol): boolean {
  const declaration = symbol.valueDeclaration ?? symbol.declarations[0];
  if (declaration === undefined) return false;
  const modifiers = nodeArray(declaration, "modifiers");
  return modifiers.some(modifier => modifier.kind === Kind.AbstractKeyword) && declaration.kind === Kind.ClassDeclaration;
}

export function getPropertiesForCompletion(type: unknown, checker: CompletionChecker): readonly CompletionSymbol[] {
  const typedChecker = checker as {
    readonly getApparentProperties?: (type: unknown) => readonly CompletionSymbol[];
    readonly getPropertiesOfType?: (type: unknown) => readonly CompletionSymbol[];
  };
  return typedChecker.getApparentProperties?.(type) ?? typedChecker.getPropertiesOfType?.(type) ?? [];
}

export function getLeftMostName(expression: Node | undefined): Node | undefined {
  let current = expression;
  while (current !== undefined) {
    switch (current.kind) {
      case Kind.PropertyAccessExpression:
        current = nodeProperty<Node>(current, "expression");
        break;
      case Kind.QualifiedName:
        current = nodeProperty<Node>(current, "left");
        break;
      case Kind.ElementAccessExpression:
        current = nodeProperty<Node>(current, "expression");
        break;
      default:
        return current;
    }
  }
  return undefined;
}

export function getFirstSymbolInChain(symbol: CompletionSymbol | undefined, _contextToken: Node | undefined, _checker: CompletionChecker): CompletionSymbol | undefined {
  let current = symbol;
  let first = symbol;
  while (current?.parent !== undefined) {
    first = current.parent;
    current = current.parent;
  }
  return first;
}

export function isModuleSymbol(symbol: CompletionSymbol | undefined): boolean {
  return symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Module) !== 0;
}

export function isStaticProperty(symbol: CompletionSymbol): boolean {
  const declaration = symbol.valueDeclaration ?? symbol.declarations[0];
  return declaration !== undefined && nodeArray(declaration, "modifiers").some(modifier => modifier.kind === Kind.StaticKeyword);
}

export interface ObjectLikeCompletionChecker {
  readonly getContextualType?: (node: Node, flags?: number) => CompletionTypeLike | undefined;
  readonly getTypeAtLocation?: (node: Node) => CompletionTypeLike | undefined;
  readonly getUnionType?: (types: readonly CompletionTypeLike[]) => CompletionTypeLike;
  readonly getPromisedTypeOfPromise?: (type: CompletionTypeLike) => CompletionTypeLike | undefined;
  readonly getApparentProperties?: (type: CompletionTypeLike) => readonly CompletionSymbol[];
  readonly getAllPossiblePropertiesOfTypes?: (types: readonly CompletionTypeLike[]) => readonly CompletionSymbol[];
  readonly getPropertiesOfType?: (type: CompletionTypeLike) => readonly CompletionSymbol[];
  readonly getStringIndexType?: (type: CompletionTypeLike) => CompletionTypeLike | undefined;
  readonly getNumberIndexType?: (type: CompletionTypeLike) => CompletionTypeLike | undefined;
  readonly getTypeOfSymbolAtLocation?: (symbol: CompletionSymbol, location: Node) => CompletionTypeLike | undefined;
  readonly getSymbolAtLocation?: (node: Node) => CompletionSymbol | undefined;
  readonly isArrayLikeType?: (type: CompletionTypeLike) => boolean;
  readonly isTypeInvalidDueToUnionDiscriminant?: (type: CompletionTypeLike, node: Node) => boolean;
  readonly typeHasCallOrConstructSignatures?: (type: CompletionTypeLike) => boolean;
  readonly isPropertyAccessible?: (
    location: Node,
    isSuper: boolean,
    isWrite: boolean,
    containingType: CompletionTypeLike,
    symbol: CompletionSymbol,
  ) => boolean;
}

export function tryGetObjectLikeCompletionContainer(
  contextToken: Node | undefined,
  position: number,
  file: SourceFile,
): Node | undefined {
  if (contextToken === undefined) return undefined;

  const parent = contextToken.parent;
  switch (contextToken.kind) {
    case Kind.OpenBraceToken:
    case Kind.CommaToken:
      return isObjectLiteralLike(parent) ? parent : undefined;
    case Kind.AsteriskToken:
      return parent !== undefined && isMethodDeclaration(parent) && parent.parent !== undefined && isObjectLiteralExpression(parent.parent)
        ? parent.parent
        : undefined;
    case Kind.AsyncKeyword:
      return parent?.parent !== undefined && isObjectLiteralExpression(parent.parent) ? parent.parent : undefined;
    case Kind.Identifier:
      if (parent !== undefined && nodeText(contextToken) === "async" && isShorthandPropertyAssignment(parent)) return parent.parent;
      if (parent !== undefined
        && parent.parent !== undefined
        && isObjectLiteralExpression(parent.parent)
        && (isSpreadAssignment(parent)
          || isShorthandPropertyAssignment(parent) && getLineOfPosition(file, contextToken.end) !== getLineOfPosition(file, position))) {
        return parent.parent;
      }
      return propertyAssignmentCompletionContainer(parent, contextToken, file);
    default:
      if (parent?.parent !== undefined
        && (isMethodDeclaration(parent.parent) || isGetAccessorDeclaration(parent.parent) || isSetAccessorDeclaration(parent.parent))
        && parent.parent.parent !== undefined
        && isObjectLiteralExpression(parent.parent.parent)) {
        return parent.parent.parent;
      }
      if (parent !== undefined && isSpreadAssignment(parent) && parent.parent !== undefined && isObjectLiteralExpression(parent.parent)) return parent.parent;
      if (contextToken.kind !== Kind.ColonToken) return propertyAssignmentCompletionContainer(parent, contextToken, file);
      return undefined;
  }
}

export function tryGetObjectLiteralContextualType(
  node: Node,
  checker: ObjectLikeCompletionChecker,
): CompletionTypeLike | undefined {
  const contextualType = checker.getContextualType?.(node, 0);
  if (contextualType !== undefined) return contextualType;

  const parent = walkUpParenthesizedExpressions(node.parent);
  if (parent?.kind === Kind.BinaryExpression
    && nodeProperty<Node>(parent, "operatorToken")?.kind === Kind.EqualsToken
    && nodeProperty<Node>(parent, "left") === node) {
    return checker.getTypeAtLocation?.(parent);
  }
  return parent !== undefined && isExpressionLike(parent) ? checker.getContextualType?.(parent, 0) : undefined;
}

export function getPropertiesForObjectExpression(
  contextualType: CompletionTypeLike,
  completionsType: CompletionTypeLike | undefined,
  objectLiteral: Node,
  checker: ObjectLikeCompletionChecker,
): readonly CompletionSymbol[] {
  const hasCompletionsType = completionsType !== undefined && completionsType !== contextualType;
  const contextualTypes = typeIsUnion(contextualType) ? typeConstituents(contextualType) : [contextualType];
  const promiseFilteredTypes = contextualTypes.filter(type => checker.getPromisedTypeOfPromise?.(type) === undefined);
  const promiseFilteredContextualType = getUnionType(checker, promiseFilteredTypes);
  const type = hasCompletionsType && completionsType !== undefined && (typeFlags(completionsType) & TypeFlags.AnyOrUnknown) === 0
    ? getUnionType(checker, [promiseFilteredContextualType, completionsType])
    : promiseFilteredContextualType;

  const properties = getApparentProperties(type, objectLiteral, checker);
  if (typeIsClass(type) && containsNonPublicProperties(properties)) return [];
  if (!hasCompletionsType) return properties;
  return properties.filter(member => hasDeclarationOtherThanSelf(member, objectLiteral));
}

export function getApparentProperties(
  type: CompletionTypeLike,
  node: Node,
  checker: ObjectLikeCompletionChecker,
): readonly CompletionSymbol[] {
  if (!typeIsUnion(type)) return checker.getApparentProperties?.(type) ?? checker.getPropertiesOfType?.(type) ?? [];
  const eligibleTypes = typeConstituents(type).filter(memberType => !(
    (typeFlags(memberType) & TypeFlags.Primitive) !== 0
    || checker.isArrayLikeType?.(memberType) === true
    || checker.isTypeInvalidDueToUnionDiscriminant?.(memberType, node) === true
    || checker.typeHasCallOrConstructSignatures?.(memberType) === true
    || typeIsClass(memberType) && containsNonPublicProperties(checker.getApparentProperties?.(memberType) ?? [])
  ));
  return checker.getAllPossiblePropertiesOfTypes?.(eligibleTypes)
    ?? uniqueCompletionSymbols(eligibleTypes.flatMap(memberType => checker.getApparentProperties?.(memberType) ?? checker.getPropertiesOfType?.(memberType) ?? []));
}

export interface FilterObjectMembersResult {
  readonly filteredMembers: readonly CompletionSymbol[];
  readonly spreadMemberNames: ReadonlySet<string>;
}

export function filterObjectMembersList(
  contextualMemberSymbols: readonly CompletionSymbol[],
  existingMembers: readonly Node[],
  file: SourceFile,
  position: number,
  checker: ObjectLikeCompletionChecker,
): FilterObjectMembersResult {
  if (existingMembers.length === 0) {
    return { filteredMembers: contextualMemberSymbols, spreadMemberNames: new Set<string>() };
  }

  const membersDeclaredBySpreadAssignment = new Set<string>();
  const existingMemberNames = new Set<string>();
  for (const member of existingMembers) {
    if (!isObjectMemberNameCarrier(member)) continue;
    if (isCurrentlyEditingNode(member, file, position)) continue;

    let existingName = "";
    if (isSpreadAssignment(member)) {
      setMemberDeclaredBySpreadAssignment(member, membersDeclaredBySpreadAssignment, checker);
    } else if (isBindingElement(member) && nodeProperty<Node>(member, "propertyName") !== undefined) {
      const propertyName = nodeProperty<Node>(member, "propertyName");
      if (propertyName?.kind === Kind.Identifier) existingName = nodeText(propertyName);
    } else {
      const name = getNameOfDeclaration(member);
      if (name !== undefined && isPropertyNameLiteral(name)) existingName = nodeText(name);
    }

    if (existingName !== "") existingMemberNames.add(existingName);
  }

  return {
    filteredMembers: contextualMemberSymbols.filter(member => !existingMemberNames.has(symbolName(member))),
    spreadMemberNames: membersDeclaredBySpreadAssignment,
  };
}

export function isCurrentlyEditingNode(node: Node, file: SourceFile, position: number): boolean {
  const start = getStartOfNode(node, file, false);
  return start <= position && position <= node.end;
}

export function setMemberDeclaredBySpreadAssignment(
  declaration: Node,
  members: Set<string>,
  checker: ObjectLikeCompletionChecker,
): void {
  const expression = nodeProperty<Node>(declaration, "expression");
  if (expression === undefined) return;
  const symbol = checker.getSymbolAtLocation?.(expression);
  const type = symbol === undefined
    ? checker.getTypeAtLocation?.(expression)
    : checker.getTypeOfSymbolAtLocation?.(symbol, expression) ?? checker.getTypeAtLocation?.(expression);
  for (const property of structuredCompletionProperties(type, checker)) {
    const name = symbolName(property);
    if (name !== "") members.add(name);
  }
}

export function tryGetConstructorLikeCompletionContainer(contextToken: Node | undefined): Node | undefined {
  if (contextToken === undefined) return undefined;
  const parent = contextToken.parent;
  switch (contextToken.kind) {
    case Kind.OpenParenToken:
    case Kind.CommaToken:
      return parent !== undefined && isConstructorDeclaration(parent) ? parent : undefined;
    default:
      return isConstructorParameterCompletion(contextToken) ? parent?.parent : undefined;
  }
}

export function isConstructorParameterCompletion(node: Node): boolean {
  return isParameterDeclaration(node.parent)
    && node.parent.parent !== undefined
    && isConstructorDeclaration(node.parent.parent)
    && (isParameterPropertyModifier(node.kind) || nodeName(node.parent) === node);
}

export function tryGetObjectTypeDeclarationCompletionContainer(
  file: SourceFile,
  contextToken: Node | undefined,
  location: Node | undefined,
  position: number,
): Node | undefined {
  if (location !== undefined) {
    switch (location.kind) {
      case Kind.SyntaxList:
        return isObjectTypeDeclarationNode(location.parent) ? location.parent : undefined;
      case Kind.EndOfFile: {
        const statements = nodeArray(location.parent, "statements");
        const lastStatement = statements[statements.length - 1];
        return lastStatement !== undefined
          && isObjectTypeDeclaration(lastStatement)
          && findChildOfKind(lastStatement, Kind.CloseBraceToken) === undefined
          ? lastStatement
          : undefined;
      }
      case Kind.PrivateIdentifier:
        return isPropertyDeclaration(location.parent) ? findAncestor(location, isClassLikeDeclaration) : undefined;
      case Kind.Identifier:
        if (stringToKeywordKind(nodeText(location)) !== Kind.Unknown) return undefined;
        if (isPropertyDeclaration(location.parent) && nodeProperty<Node>(location.parent, "initializer") === location) return undefined;
        if (isFromObjectTypeDeclaration(location)) return findAncestor(location, isObjectTypeDeclaration);
        break;
      default:
        break;
    }
  }

  if (contextToken === undefined) return undefined;
  if (location?.kind === Kind.ConstructorKeyword
    || contextToken.kind === Kind.Identifier && isPropertyDeclaration(contextToken.parent) && isClassLikeDeclarationNode(location)) {
    return findAncestor(contextToken, isClassLikeDeclaration);
  }

  switch (contextToken.kind) {
    case Kind.EqualsToken:
      return undefined;
    case Kind.SemicolonToken:
    case Kind.CloseBraceToken:
      if (location !== undefined && isFromObjectTypeDeclaration(location) && nodeName(location.parent) === location) return location.parent?.parent;
      return isObjectTypeDeclarationNode(location) ? location : undefined;
    case Kind.OpenBraceToken:
    case Kind.CommaToken:
      return isObjectTypeDeclarationNode(contextToken.parent) ? contextToken.parent : undefined;
    default:
      if (isObjectTypeDeclarationNode(location)) {
        if (getLineOfPosition(file, contextToken.end) !== getLineOfPosition(file, position)) return location;
        const isValidKeyword = isClassLikeDeclarationNode(contextToken.parent?.parent)
          ? isClassMemberCompletionKeyword
          : isInterfaceOrTypeLiteralCompletionKeyword;
        const tokenKind = contextToken.kind === Kind.Identifier ? stringToKeywordKind(nodeText(contextToken)) : contextToken.kind;
        if (isValidKeyword(contextToken.kind) || contextToken.kind === Kind.AsteriskToken || tokenKind !== Kind.Unknown && isValidKeyword(tokenKind)) {
          return contextToken.parent?.parent;
        }
      }
      return undefined;
  }
}

export function isFromObjectTypeDeclaration(node: Node | undefined): boolean {
  return isClassOrTypeElement(node?.parent) && isObjectTypeDeclarationNode(node?.parent?.parent);
}

export function filterClassMembersList(
  baseSymbols: readonly CompletionSymbol[],
  existingMembers: readonly Node[],
  classElementModifierFlags: ModifierFlags,
  file: SourceFile,
  position: number,
): readonly CompletionSymbol[] {
  const existingMemberNames = new Set<string>();
  for (const member of existingMembers) {
    if (!isClassCompletionMemberNameCarrier(member)) continue;
    if (isCurrentlyEditingNode(member, file, position)) continue;
    if (hasSyntacticModifier(member, ModifierFlags.Private)) continue;
    if (hasSyntacticModifier(member, ModifierFlags.Static) !== ((classElementModifierFlags & ModifierFlags.Static) !== 0)) continue;

    const existingName = getPropertyNameForPropertyNameNode(nodeName(member));
    if (existingName !== "") existingMemberNames.add(existingName);
  }

  return baseSymbols.filter(symbol => {
    const declaration = symbol.valueDeclaration ?? symbol.declarations[0];
    return !existingMemberNames.has(symbolName(symbol))
      && symbol.declarations.length > 0
      && !containsNonPublicProperties([symbol])
      && declaration?.kind !== Kind.PrivateIdentifier;
  });
}

export function tryGetContainingJsxElement(contextToken: Node | undefined, file: SourceFile): Node | undefined {
  if (contextToken === undefined) return undefined;
  const parent = contextToken.parent;
  switch (contextToken.kind) {
    case Kind.GreaterThanToken:
    case Kind.LessThanSlashToken:
    case Kind.SlashToken:
    case Kind.Identifier:
    case Kind.PropertyAccessExpression:
    case Kind.JsxAttributes:
    case Kind.JsxAttribute:
    case Kind.JsxSpreadAttribute:
      if (isJsxOpeningLikeElement(parent)) {
        if (contextToken.kind === Kind.GreaterThanToken) {
          const precedingToken = findPrecedingToken(file, contextToken.pos);
          if (nodeArray(parent, "typeArguments").length === 0 || precedingToken?.kind === Kind.SlashToken) return undefined;
        }
        return parent;
      }
      if (nodeKindOf(parent) === Kind.JsxAttribute) return nodeParentOf(nodeParentOf(parent));
      return undefined;
    case Kind.StringLiteral:
      return nodeKindOf(parent) === Kind.JsxAttribute || parent !== undefined && isJsxSpreadAttribute(parent) ? parent?.parent?.parent : undefined;
    case Kind.CloseBraceToken:
      if (nodeKindOf(parent) === Kind.JsxExpression && nodeKindOf(parent?.parent) === Kind.JsxAttribute) return parent?.parent?.parent?.parent;
      return parent !== undefined && isJsxSpreadAttribute(parent) ? parent.parent?.parent : undefined;
    default:
      return undefined;
  }
}

export interface FilterJsxAttributesResult {
  readonly filteredMembers: readonly CompletionSymbol[];
  readonly spreadMemberNames: ReadonlySet<string>;
}

export function filterJsxAttributes(
  symbols: readonly CompletionSymbol[],
  attributes: readonly Node[],
  file: SourceFile,
  position: number,
  checker: ObjectLikeCompletionChecker,
): FilterJsxAttributesResult {
  const existingNames = new Set<string>();
  const membersDeclaredBySpreadAssignment = new Set<string>();
  for (const attribute of attributes) {
    if (isCurrentlyEditingNode(attribute, file, position)) continue;
    if (attribute.kind === Kind.JsxAttribute) {
      const name = nodeName(attribute);
      if (name !== undefined) existingNames.add(nodeText(name));
    } else if (isJsxSpreadAttribute(attribute)) {
      setMemberDeclaredBySpreadAssignment(attribute, membersDeclaredBySpreadAssignment, checker);
    }
  }
  return {
    filteredMembers: symbols.filter(symbol => !existingNames.has(symbolName(symbol))),
    spreadMemberNames: membersDeclaredBySpreadAssignment,
  };
}

export function isTypeKeywordTokenOrIdentifier(node: Node | undefined): boolean {
  return node?.kind === Kind.TypeKeyword || node?.kind === Kind.Identifier && stringToKeywordKind(nodeText(node)) === Kind.TypeKeyword;
}

function propertyAssignmentCompletionContainer(parent: Node | undefined, contextToken: Node, file: SourceFile): Node | undefined {
  const ancestorNode = findAncestor(parent, isPropertyAssignment);
  return ancestorNode !== undefined
    && getLastToken(ancestorNode, file) === contextToken
    && ancestorNode.parent !== undefined
    && isObjectLiteralExpression(ancestorNode.parent)
    ? ancestorNode.parent
    : undefined;
}

function isObjectLiteralLike(node: Node | undefined): node is Node {
  return node !== undefined && (isObjectLiteralExpression(node) || isObjectBindingPattern(node));
}

function isObjectTypeDeclarationNode(node: Node | undefined): node is Node {
  return node !== undefined && isObjectTypeDeclaration(node);
}

function isClassLikeDeclarationNode(node: Node | undefined): node is Node {
  return node !== undefined && isClassLikeDeclaration(node);
}

function isClassOrTypeElement(node: Node | undefined): node is Node {
  if (node === undefined) return false;
  if (isClassElement(node)) return true;
  switch (node.kind) {
    case Kind.CallSignature:
    case Kind.ConstructSignature:
    case Kind.IndexSignature:
    case Kind.MethodSignature:
    case Kind.PropertySignature:
    case Kind.SemicolonClassElement:
      return true;
    default:
      return false;
  }
}

function isClassCompletionMemberNameCarrier(node: Node): boolean {
  return isPropertyDeclaration(node)
    || isMethodDeclaration(node)
    || isGetAccessorDeclaration(node)
    || isSetAccessorDeclaration(node);
}

function getPropertyNameForPropertyNameNode(name: Node | undefined): string {
  if (name === undefined) return "";
  switch (name.kind) {
    case Kind.Identifier:
    case Kind.PrivateIdentifier:
    case Kind.StringLiteral:
    case Kind.NumericLiteral:
      return nodeText(name);
    default:
      return "";
  }
}

function findChildOfKind(node: Node, kind: Kind): Node | undefined {
  let found: Node | undefined;
  node.forEachChild(child => {
    if (found === undefined && child.kind === kind) found = child;
  });
  return found;
}

function isExpressionLike(node: Node | undefined): node is Node {
  return node !== undefined && isExpression(node);
}

function nodeKindOf(node: Node | undefined): Kind | undefined {
  return node?.kind;
}

function nodeParentOf(node: Node | undefined): Node | undefined {
  return node?.parent;
}

function getUnionType(checker: ObjectLikeCompletionChecker, types: readonly CompletionTypeLike[]): CompletionTypeLike {
  if (types.length === 0) return { flags: TypeFlags.Never };
  if (types.length === 1) return types[0]!;
  return checker.getUnionType?.(types) ?? { flags: TypeFlags.Union, data: { types } };
}

function typeFlags(type: CompletionTypeLike | undefined): number {
  if (type === undefined) return 0;
  return typeof type.flags === "function" ? type.flags() : type.flags ?? 0;
}

function typeIsUnion(type: CompletionTypeLike): boolean {
  return type.isUnion?.() === true || (typeFlags(type) & TypeFlags.Union) !== 0;
}

function typeConstituents(type: CompletionTypeLike): readonly CompletionTypeLike[] {
  return type.types?.() ?? type.data?.types ?? [];
}

function typeSymbol(type: CompletionTypeLike): CompletionSymbol | undefined {
  return typeof type.symbol === "function" ? type.symbol() : type.symbol;
}

function typeIsClass(type: CompletionTypeLike): boolean {
  return ((typeSymbol(type)?.flags ?? 0) & SymbolFlags.Class) !== 0
    || (type.data as { readonly class?: boolean } | undefined)?.class === true;
}

function containsNonPublicProperties(properties: readonly CompletionSymbol[]): boolean {
  return properties.some(property => {
    const declarations = property.declarations.length > 0 ? property.declarations : property.valueDeclaration === undefined ? [] : [property.valueDeclaration];
    return declarations.some(declaration => nodeArray(declaration, "modifiers").some(modifier =>
      modifier.kind === Kind.PrivateKeyword || modifier.kind === Kind.ProtectedKeyword));
  });
}

function hasDeclarationOtherThanSelf(member: CompletionSymbol, objectLiteral: Node): boolean {
  return member.declarations.length === 0 || member.declarations.some(declaration => declaration.parent !== objectLiteral);
}

function uniqueCompletionSymbols(symbols: readonly CompletionSymbol[]): readonly CompletionSymbol[] {
  const seen = new Set<string>();
  const result: CompletionSymbol[] = [];
  for (const symbol of symbols) {
    const name = symbolName(symbol);
    const key = name === "" ? `#${String(symbolId(symbol))}` : name;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(symbol);
  }
  return result;
}

function isObjectMemberNameCarrier(node: Node): boolean {
  return isPropertyAssignment(node)
    || isShorthandPropertyAssignment(node)
    || isBindingElement(node)
    || isMethodDeclaration(node)
    || isGetAccessorDeclaration(node)
    || isSetAccessorDeclaration(node)
    || isSpreadAssignment(node);
}

function possibleGenericSignatures(
  called: Node,
  typeArgumentCount: number,
  checker: TypeArgumentPositionChecker,
): readonly unknown[] {
  if (checker.getTypeAtLocation === undefined || checker.getSignaturesOfType === undefined) return [];
  return getPossibleGenericSignatures(called, typeArgumentCount, checker as Parameters<typeof getPossibleGenericSignatures>[2]);
}

function isPartOfTypeNode(node: Node | undefined): boolean {
  if (node === undefined) return false;
  if (isTypeNode(node)) return true;
  const parent = node.parent;
  if (parent === undefined) return false;
  switch (parent.kind) {
    case Kind.TypeReference:
    case Kind.TypePredicate:
    case Kind.TypeQuery:
    case Kind.TypeLiteral:
    case Kind.ArrayType:
    case Kind.TupleType:
    case Kind.OptionalType:
    case Kind.RestType:
    case Kind.UnionType:
    case Kind.IntersectionType:
    case Kind.ConditionalType:
    case Kind.InferType:
    case Kind.ParenthesizedType:
    case Kind.TypeOperator:
    case Kind.IndexedAccessType:
    case Kind.MappedType:
    case Kind.LiteralType:
    case Kind.NamedTupleMember:
    case Kind.TemplateLiteralType:
    case Kind.TemplateLiteralTypeSpan:
    case Kind.ImportType:
      return true;
    default:
      return false;
  }
}

function getNameOfDeclaration(node: Node | undefined): Node | undefined {
  if (node === undefined) return undefined;
  return nodeName(node)
    ?? nodeProperty<Node>(node, "propertyName")
    ?? nodeProperty<Node>(node, "moduleSpecifier");
}

function structuredCompletionProperties(
  type: CompletionTypeLike | undefined,
  checker: ObjectLikeCompletionChecker,
): readonly CompletionSymbol[] {
  if (type === undefined) return [];
  if ((typeFlags(type) & TypeFlags.StructuredType) === 0 && type.data?.declaredProperties === undefined) return [];
  return type.data?.declaredProperties ?? checker.getPropertiesOfType?.(type) ?? checker.getApparentProperties?.(type) ?? [];
}

function isJsxOpeningLikeElement(node: Node | undefined): node is Node {
  return node?.kind === Kind.JsxSelfClosingElement || node?.kind === Kind.JsxOpeningElement;
}

export type CompletionTypeLike = {
  readonly flags?: number | (() => number);
  readonly data?: { readonly types?: readonly CompletionTypeLike[]; readonly declaredProperties?: readonly CompletionSymbol[]; readonly objectFlags?: number };
  readonly isUnion?: () => boolean;
  readonly types?: () => readonly CompletionTypeLike[];
  readonly symbol?: CompletionSymbol | (() => CompletionSymbol | undefined);
  readonly isStringLiteral?: () => boolean;
  readonly isNumberLiteral?: () => boolean;
  readonly isBigIntLiteral?: () => boolean;
};

export interface ContextualCompletionChecker {
  readonly getContextualType?: (node: Node, flags?: number) => CompletionTypeLike | undefined;
  readonly getContextualTypeForArgumentAtIndex?: (node: Node, argumentIndex: number) => CompletionTypeLike | undefined;
  readonly getContextualTypeForJsxAttribute?: (node: Node) => CompletionTypeLike | undefined;
  readonly getTypeAtLocation?: (node: Node) => CompletionTypeLike | undefined;
  readonly isDeprecatedDeclaration?: (node: Node) => boolean;
}

export function getContextualTypeForConditionalExpression(
  conditionalExpression: Node,
  position: number,
  file: SourceFile,
  checker: ContextualCompletionChecker,
): CompletionTypeLike | undefined {
  const argumentInfo = getArgumentInfoForCompletionContext(conditionalExpression, position, file);
  if (argumentInfo !== undefined) {
    return checker.getContextualTypeForArgumentAtIndex?.(argumentInfo.invocation, argumentInfo.argumentIndex);
  }
  return checker.getContextualType?.(conditionalExpression, 1) ?? checker.getContextualType?.(conditionalExpression, 0);
}

export function getContextualType(
  previousToken: Node,
  position: number,
  file: SourceFile,
  checker: ContextualCompletionChecker,
): CompletionTypeLike | undefined {
  const parent = previousToken.parent;
  if (parent === undefined) return undefined;
  switch (previousToken.kind) {
    case Kind.Identifier:
      return checker.getContextualType?.(parent, 0);
    case Kind.EqualsToken:
      if (parent.kind === Kind.VariableDeclaration) return checker.getContextualType?.(nodeProperty<Node>(parent, "initializer") ?? parent, 0);
      if (parent.kind === Kind.BinaryExpression) return checker.getTypeAtLocation?.(nodeProperty<Node>(parent, "left") ?? parent);
      if (parent.kind === Kind.JsxAttribute) return checker.getContextualTypeForJsxAttribute?.(parent);
      return undefined;
    case Kind.NewKeyword:
      return checker.getContextualType?.(parent, 0);
    case Kind.CaseKeyword:
      return parent.kind === Kind.CaseClause ? getSwitchedType(parent, checker) : undefined;
    case Kind.OpenBraceToken:
      return parent.kind === Kind.JsxExpression
        ? checker.getContextualTypeForJsxAttribute?.(parent.parent ?? parent)
        : undefined;
    case Kind.OpenBracketToken:
    case Kind.CommaToken:
      return parent.kind === Kind.ArrayLiteralExpression ? checker.getContextualType?.(parent, 0) : undefined;
    case Kind.CloseBracketToken:
      return undefined;
    case Kind.QuestionToken:
    case Kind.ColonToken:
      return parent.kind === Kind.ConditionalExpression
        ? getContextualTypeForConditionalExpression(parent, position, file, checker)
        : undefined;
    default:
      break;
  }
  const argumentInfo = getArgumentInfoForCompletionContext(previousToken, position, file);
  if (argumentInfo !== undefined) {
    return checker.getContextualTypeForArgumentAtIndex?.(argumentInfo.invocation, argumentInfo.argumentIndex);
  }
  if (isEqualityOperatorKind(previousToken.kind) && parent.kind === Kind.BinaryExpression) {
    return checker.getTypeAtLocation?.(nodeProperty<Node>(parent, "left") ?? parent);
  }
  return checker.getContextualType?.(previousToken, 1) ?? checker.getContextualType?.(previousToken, 0);
}

export function getSwitchedType(caseClause: Node, checker: ContextualCompletionChecker): CompletionTypeLike | undefined {
  const caseBlock = caseClause.parent;
  const switchStatement = caseBlock?.parent;
  const expression = nodeProperty<Node>(switchStatement, "expression");
  return expression === undefined ? undefined : checker.getTypeAtLocation?.(expression);
}

export function isLiteral(type: CompletionTypeLike): boolean {
  return type.isStringLiteral?.() === true || type.isNumberLiteral?.() === true || type.isBigIntLiteral?.() === true;
}

export function getRecommendedCompletion(
  previousToken: Node,
  contextualType: CompletionTypeLike,
  checker: CompletionChecker,
): CompletionSymbol | undefined {
  const types = contextualType.isUnion?.() === true ? contextualType.types?.() ?? [] : [contextualType];
  for (const type of types) {
    const symbol = typeSymbol(type);
    if (symbol === undefined) continue;
    const flags = symbol.flags ?? 0;
    if ((flags & (SymbolFlags.EnumMember | SymbolFlags.Enum | SymbolFlags.Class)) !== 0 && !isAbstractConstructorSymbol(symbol)) {
      return getFirstSymbolInChain(symbol, previousToken, checker);
    }
  }
  return undefined;
}

export function getClosestSymbolDeclaration(contextToken: Node | undefined, location: Node | undefined): Node | undefined {
  return closestDeclarationInInitializer(contextToken) ?? closestDeclarationInInitializer(location);
}

export function isArrowFunctionBody(node: Node): boolean {
  const parent = node.parent;
  return parent?.kind === Kind.ArrowFunction && (nodeProperty<Node>(parent, "body") === node || node.kind === Kind.EqualsGreaterThanToken);
}

export function isInTypeParameterDefault(contextToken: Node | undefined): boolean {
  let node = contextToken;
  for (let parent = contextToken?.parent; parent !== undefined; parent = parent.parent) {
    if (parent.kind === Kind.TypeParameter) {
      return nodeProperty<Node>(parent, "defaultType") === node
        || nodeProperty<Node>(parent, "default") === node
        || node?.kind === Kind.EqualsToken;
    }
    node = parent;
  }
  return false;
}

export function isDeprecated(symbol: CompletionSymbol, checker: ContextualCompletionChecker): boolean {
  return symbol.declarations.length > 0
    && symbol.declarations.every(declaration => checker.isDeprecatedDeclaration?.(declaration) === true);
}

export function isNamedImportsOrExports(node: Node | undefined): boolean {
  return node?.kind === Kind.NamedImports || node?.kind === Kind.NamedExports;
}

function isIdentifierText(text: string, variant: LanguageVariant): boolean {
  if (text.length === 0) return false;
  const first = text.codePointAt(0);
  if (first === undefined || !isIdentifierStartCodePoint(first)) return false;
  for (let index = String.fromCodePoint(first).length; index < text.length;) {
    const codePoint = text.codePointAt(index);
    if (codePoint === undefined || !isIdentifierPartCodePoint(codePoint, variant)) return false;
    index += String.fromCodePoint(codePoint).length;
  }
  return true;
}

function isMemberName(node: Node): boolean {
  return node.kind === Kind.Identifier || node.kind === Kind.PrivateIdentifier || node.kind === Kind.StringLiteral || node.kind === Kind.NumericLiteral;
}

function isKeywordKind(kind: Kind): boolean {
  return Kind.FirstKeyword <= kind && kind <= Kind.LastKeyword;
}

function isStringLiteralOrTemplate(node: Node): boolean {
  return node.kind === Kind.StringLiteral
    || node.kind === Kind.NoSubstitutionTemplateLiteral
    || isTemplateExpression(node)
    || node.kind === Kind.TaggedTemplateExpression;
}

function binaryExpressionMayBeOpenTag(binaryExpression: Node): boolean {
  return (binaryExpression as { readonly left?: Node | undefined }).left?.kind === Kind.MissingDeclaration;
}

function getContainingClass(node: Node): Node | undefined {
  for (let current = node.parent; current !== undefined; current = current.parent) {
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression) return current;
  }
  return undefined;
}

function nameTableEntries(file: JavaScriptNameTableSourceFile): readonly [string, number][] {
  const table = file.getNameTable?.();
  if (table === undefined) return [];
  if (table instanceof Map) return [...table.entries()];
  return Object.entries(table);
}

function moduleSpecifierOf(node: Node): Node | undefined {
  return nodeProperty<Node>(node, "moduleSpecifier");
}

function nodeArray(node: Node, propertyName: string): readonly Node[] {
  return nodeProperty<readonly Node[]>(node, propertyName) ?? [];
}

function nodeName(node: Node | undefined): Node | undefined {
  return nodeProperty<Node>(node, "name");
}

function nodeProperty<T>(node: Node | undefined, propertyName: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[propertyName];
}

interface ArgumentInfoForCompletionContext {
  readonly invocation: Node;
  readonly argumentIndex: number;
}

function getArgumentInfoForCompletionContext(node: Node, position: number, _file: SourceFile): ArgumentInfoForCompletionContext | undefined {
  for (let current: Node | undefined = node; current !== undefined; current = current.parent) {
    const argumentsList = nodeArray(current, "arguments");
    if (argumentsList.length === 0) continue;
    const first = argumentsList[0];
    const last = argumentsList[argumentsList.length - 1];
    if (first === undefined || last === undefined || position < first.pos || position > Math.max(last.end, current.end)) continue;
    const index = argumentsList.findIndex(argument => argument.pos <= position && position <= argument.end);
    if (index >= 0) return { invocation: current, argumentIndex: index };
    return { invocation: current, argumentIndex: argumentsList.length };
  }
  return undefined;
}

function closestDeclarationInInitializer(node: Node | undefined): Node | undefined {
  for (let current = node; current !== undefined; current = current.parent) {
    if (current.kind === Kind.Block || isArrowFunctionBody(current) || current.kind === Kind.ObjectBindingPattern || current.kind === Kind.ArrayBindingPattern) {
      return undefined;
    }
    if (current.kind === Kind.Parameter || current.kind === Kind.TypeParameter || current.kind === Kind.VariableDeclaration) return current;
  }
  return undefined;
}

function nodeTextOf(node: Node | undefined): string {
  return node === undefined ? "" : nodeText(node);
}

function sourceText(node: Node): string {
  const sourceFile = node.getSourceFile();
  return sourceFile.text.slice(Math.max(0, node.pos), Math.max(0, node.end));
}

function jsDocParamPatternWorker(
  path: string,
  pattern: Node,
  initializer: Node | undefined,
  dotDotDotToken: Node | undefined,
  isJavaScript: boolean,
): readonly string[] {
  if (pattern.kind === Kind.ObjectBindingPattern && dotDotDotToken === undefined) {
    const childTags: string[] = [];
    for (const element of nodeArray(pattern, "elements")) {
      const elementTags = jsDocParamElementWorker(path, element, initializer, dotDotDotToken, isJavaScript);
      if (elementTags.length === 0) return [getJSDocParamAnnotation(path, initializer, dotDotDotToken, isJavaScript, false)];
      childTags.push(...elementTags);
    }
    if (childTags.length > 0) {
      return [getJSDocParamAnnotation(path, initializer, dotDotDotToken, isJavaScript, true), ...childTags];
    }
  }
  return [getJSDocParamAnnotation(path, initializer, dotDotDotToken, isJavaScript, false)];
}

function jsDocParamElementWorker(
  path: string,
  element: Node,
  initializer: Node | undefined,
  dotDotDotToken: Node | undefined,
  isJavaScript: boolean,
): readonly string[] {
  const name = nodeName(element);
  const propertyName = nodeProperty<Node>(element, "propertyName");
  const elementInitializer = nodeProperty<Node>(element, "initializer") ?? initializer;
  const elementDotDotDotToken = nodeProperty<Node>(element, "dotDotDotToken") ?? dotDotDotToken;
  if (name?.kind === Kind.Identifier) {
    const segment = propertyName === undefined ? nodeTextOf(name) : nodeTextOf(propertyName);
    if (segment === "") return [];
    return [getJSDocParamAnnotation(`${path}.${segment}`, elementInitializer, elementDotDotDotToken, isJavaScript, false)];
  }
  if (propertyName !== undefined && name !== undefined) {
    const segment = nodeTextOf(propertyName);
    if (segment === "") return [];
    return jsDocParamPatternWorker(`${path}.${segment}`, name, elementInitializer, elementDotDotDotToken, isJavaScript);
  }
  return [];
}

// Language-service parity map: internal/ls/completions.go
/**
 * Language-service parity map for TS-Go `ls/completions.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

export interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

export interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

export const lsCompletionsUpstreamPath = "ls/completions.go";

export const lsCompletionsDeclarations: readonly UpstreamDeclaration[] = [
  {"line":32,"kind":"var","name":"ErrNeedsAutoImports"},
  {"line":34,"kind":"func","name":"ProvideCompletion","receiver":"l *LanguageService"},
  {"line":60,"kind":"func","name":"ensureItemData"},
  {"line":77,"kind":"type","name":"completionData"},
  {"line":79,"kind":"type","name":"completionDataData"},
  {"line":108,"kind":"type","name":"completionDataKeyword"},
  {"line":113,"kind":"type","name":"completionDataJSDocTagName"},
  {"line":115,"kind":"type","name":"completionDataJSDocTag"},
  {"line":117,"kind":"type","name":"completionDataJSDocParameterName"},
  {"line":121,"kind":"type","name":"importStatementCompletionInfo"},
  {"line":132,"kind":"type","name":"jsxInitializer"},
  {"line":137,"kind":"type","name":"KeywordCompletionFilters"},
  {"line":152,"kind":"func","name":"keywordFiltersFromSyntaxKind"},
  {"line":161,"kind":"type","name":"CompletionKind"},
  {"line":172,"kind":"var","name":"TriggerCharacters"},
  {"line":175,"kind":"var","name":"allCommitCharacters"},
  {"line":178,"kind":"var","name":"noCommaCommitCharacters"},
  {"line":180,"kind":"var","name":"emptyCommitCharacters"},
  {"line":182,"kind":"type","name":"SortText"},
  {"line":196,"kind":"func","name":"DeprecateSortText"},
  {"line":200,"kind":"func","name":"sortBelow"},
  {"line":204,"kind":"type","name":"symbolOriginInfoKind"},
  {"line":217,"kind":"type","name":"symbolOriginInfo"},
  {"line":225,"kind":"func","name":"symbolName","receiver":"origin *symbolOriginInfo"},
  {"line":234,"kind":"type","name":"symbolOriginInfoObjectLiteralMethod"},
  {"line":240,"kind":"func","name":"asObjectLiteralMethod","receiver":"s *symbolOriginInfo"},
  {"line":244,"kind":"type","name":"symbolOriginInfoTypeOnlyAlias"},
  {"line":248,"kind":"type","name":"symbolOriginInfoComputedPropertyName"},
  {"line":261,"kind":"type","name":"completionSource"},
  {"line":280,"kind":"type","name":"uniqueNamesMap"},
  {"line":283,"kind":"type","name":"literalValue"},
  {"line":285,"kind":"type","name":"globalsSearch"},
  {"line":293,"kind":"func","name":"getCompletionsAtPosition","receiver":"l *LanguageService"},
  {"line":414,"kind":"func","name":"getCompletionData","receiver":"l *LanguageService"},
  {"line":1663,"kind":"func","name":"keywordCompletionData"},
  {"line":1674,"kind":"func","name":"getDefaultCommitCharacters"},
  {"line":1681,"kind":"func","name":"completionInfoFromData","receiver":"l *LanguageService"},
  {"line":1811,"kind":"func","name":"getCompletionEntriesFromSymbols","receiver":"l *LanguageService"},
  {"line":1950,"kind":"func","name":"completionNameForLiteral"},
  {"line":1967,"kind":"func","name":"createCompletionItemForLiteral"},
  {"line":1980,"kind":"func","name":"createCompletionItem","receiver":"l *LanguageService"},
  {"line":2239,"kind":"func","name":"isRecommendedCompletionMatch"},
  {"line":2245,"kind":"var","name":"wordSeparators"},
  {"line":2252,"kind":"func","name":"getWordLengthAndStart"},
  {"line":2275,"kind":"func","name":"trimElementAccess"},
  {"line":2288,"kind":"func","name":"getFilterText"},
  {"line":2362,"kind":"func","name":"getDotAccessor"},
  {"line":2376,"kind":"func","name":"strPtrIsEmpty"},
  {"line":2383,"kind":"func","name":"strPtrTo"},
  {"line":2390,"kind":"func","name":"boolToPtr"},
  {"line":2397,"kind":"func","name":"getLineOfPosition"},
  {"line":2402,"kind":"func","name":"getLineEndOfPosition"},
  {"line":2418,"kind":"func","name":"isClassLikeMemberCompletion"},
  {"line":2423,"kind":"func","name":"symbolAppearsToBeTypeOnly"},
  {"line":2429,"kind":"func","name":"shouldIncludeSymbol"},
  {"line":2521,"kind":"func","name":"getCompletionEntryDisplayNameForSymbol"},
  {"line":2583,"kind":"func","name":"originIsIgnore"},
  {"line":2587,"kind":"func","name":"originIncludesSymbolName"},
  {"line":2591,"kind":"func","name":"originIsComputedPropertyName"},
  {"line":2595,"kind":"func","name":"originIsObjectLiteralMethod"},
  {"line":2599,"kind":"func","name":"originIsThisTypeNode"},
  {"line":2603,"kind":"func","name":"originIsTypeOnlyAlias"},
  {"line":2607,"kind":"func","name":"originIsSymbolMember"},
  {"line":2611,"kind":"func","name":"originIsNullableMember"},
  {"line":2615,"kind":"func","name":"originIsPromise"},
  {"line":2619,"kind":"func","name":"getSourceFromOrigin"},
  {"line":2634,"kind":"func","name":"getRelevantTokens"},
  {"line":2644,"kind":"type","name":"CompletionsTriggerCharacter"},
  {"line":2646,"kind":"func","name":"isValidTrigger"},
  {"line":2679,"kind":"func","name":"isStringLiteralOrTemplate"},
  {"line":2688,"kind":"func","name":"binaryExpressionMayBeOpenTag"},
  {"line":2692,"kind":"func","name":"isCheckedFile"},
  {"line":2696,"kind":"func","name":"isContextTokenValueLocation"},
  {"line":2702,"kind":"func","name":"isPossiblyTypeArgumentPosition"},
  {"line":2709,"kind":"func","name":"isContextTokenTypeLocation"},
  {"line":2735,"kind":"func","name":"symbolCanBeReferencedAtTypeLocation"},
  {"line":2746,"kind":"func","name":"nonAliasCanBeReferencedAtTypeLocation"},
  {"line":2756,"kind":"func","name":"getPropertiesForCompletion"},
  {"line":2765,"kind":"func","name":"getLeftMostName"},
  {"line":2775,"kind":"func","name":"getFirstSymbolInChain"},
  {"line":2793,"kind":"func","name":"isModuleSymbol"},
  {"line":2797,"kind":"func","name":"getNullableSymbolOriginInfoKind"},
  {"line":2804,"kind":"func","name":"isStaticProperty"},
  {"line":2812,"kind":"func","name":"getContextualTypeForConditionalExpression"},
  {"line":2825,"kind":"func","name":"getContextualType"},
  {"line":2914,"kind":"func","name":"getSwitchedType"},
  {"line":2918,"kind":"func","name":"isEqualityOperatorKind"},
  {"line":2929,"kind":"func","name":"isLiteral"},
  {"line":2933,"kind":"func","name":"getRecommendedCompletion"},
  {"line":2956,"kind":"func","name":"isAbstractConstructorSymbol"},
  {"line":2964,"kind":"func","name":"startsWithQuote"},
  {"line":2969,"kind":"func","name":"getClosestSymbolDeclaration"},
  {"line":3001,"kind":"func","name":"isArrowFunctionBody"},
  {"line":3008,"kind":"func","name":"isInTypeParameterDefault"},
  {"line":3026,"kind":"func","name":"isDeprecated"},
  {"line":3031,"kind":"func","name":"getReplacementRangeForContextToken","receiver":"l *LanguageService"},
  {"line":3045,"kind":"func","name":"createRangeFromStringLiteralLikeContent","receiver":"l *LanguageService"},
  {"line":3058,"kind":"func","name":"quotePropertyName"},
  {"line":3069,"kind":"func","name":"isStringAndEmptyAnonymousObjectIntersection"},
  {"line":3079,"kind":"func","name":"areIntersectedTypesAvoidingStringReduction"},
  {"line":3083,"kind":"func","name":"escapeSnippetText"},
  {"line":3087,"kind":"func","name":"isNamedImportsOrExports"},
  {"line":3091,"kind":"func","name":"generateIdentifierForArbitraryString"},
  {"line":3131,"kind":"func","name":"getCompletionsSymbolKind"},
  {"line":3186,"kind":"func","name":"CompareCompletionEntries"},
  {"line":3210,"kind":"func","name":"cloneItems"},
  {"line":3219,"kind":"func","name":"getKeywordCompletions"},
  {"line":3237,"kind":"func","name":"getTypescriptKeywordCompletions"},
  {"line":3277,"kind":"func","name":"isTypeScriptOnlyKeyword"},
  {"line":3312,"kind":"func","name":"isFunctionLikeBodyKeyword"},
  {"line":3322,"kind":"func","name":"isClassMemberCompletionKeyword"},
  {"line":3332,"kind":"func","name":"isInterfaceOrTypeLiteralCompletionKeyword"},
  {"line":3336,"kind":"func","name":"isContextualKeywordInAutoImportableExpressionSpace"},
  {"line":3348,"kind":"func","name":"getContextualKeywords"},
  {"line":3374,"kind":"func","name":"getJSCompletionEntries","receiver":"l *LanguageService"},
  {"line":3400,"kind":"func","name":"getOptionalReplacementSpan","receiver":"l *LanguageService"},
  {"line":3409,"kind":"func","name":"isMemberCompletionKind"},
  {"line":3415,"kind":"func","name":"tryGetFunctionLikeBodyCompletionContainer"},
  {"line":3434,"kind":"func","name":"computeCommitCharactersAndIsNewIdentifier"},
  {"line":3562,"kind":"func","name":"keywordForNode"},
  {"line":3571,"kind":"func","name":"getScopeNode"},
  {"line":3579,"kind":"func","name":"isSnippetScope"},
  {"line":3592,"kind":"func","name":"isProbablyGlobalType"},
  {"line":3610,"kind":"func","name":"tryGetTypeLiteralNode"},
  {"line":3630,"kind":"func","name":"getConstraintOfTypeArgumentProperty"},
  {"line":3678,"kind":"func","name":"tryGetObjectLikeCompletionContainer"},
  {"line":3736,"kind":"func","name":"tryGetObjectLiteralContextualType"},
  {"line":3757,"kind":"func","name":"getPropertiesForObjectExpression"},
  {"line":3803,"kind":"func","name":"getApparentProperties"},
  {"line":3816,"kind":"func","name":"containsNonPublicProperties"},
  {"line":3824,"kind":"func","name":"filterObjectMembersList"},
  {"line":3885,"kind":"func","name":"isCurrentlyEditingNode"},
  {"line":3890,"kind":"func","name":"setMemberDeclaredBySpreadAssignment"},
  {"line":3908,"kind":"func","name":"tryGetConstructorLikeCompletionContainer"},
  {"line":3928,"kind":"func","name":"isConstructorParameterCompletion"},
  {"line":3935,"kind":"func","name":"tryGetObjectTypeDeclarationCompletionContainer"},
  {"line":4032,"kind":"func","name":"isFromObjectTypeDeclaration"},
  {"line":4037,"kind":"func","name":"filterClassMembersList"},
  {"line":4083,"kind":"func","name":"tryGetContainingJsxElement"},
  {"line":4144,"kind":"func","name":"filterJsxAttributes"},
  {"line":4170,"kind":"func","name":"isTypeKeywordTokenOrIdentifier"},
  {"line":4177,"kind":"func","name":"setItemDefaults","receiver":"l *LanguageService"},
  {"line":4246,"kind":"func","name":"specificKeywordCompletionInfo","receiver":"l *LanguageService"},
  {"line":4270,"kind":"func","name":"getJsxClosingTagCompletion","receiver":"l *LanguageService"},
  {"line":4349,"kind":"func","name":"createLSPCompletionItem","receiver":"l *LanguageService"},
  {"line":4442,"kind":"func","name":"getLabelCompletionsAtPosition","receiver":"l *LanguageService"},
  {"line":4469,"kind":"func","name":"getLabelStatementCompletions","receiver":"l *LanguageService"},
  {"line":4514,"kind":"func","name":"isCompletionListBlocker"},
  {"line":4529,"kind":"func","name":"isInStringOrRegularExpressionOrTemplateLiteral"},
  {"line":4541,"kind":"func","name":"isSolelyIdentifierDefinitionLocation"},
  {"line":4685,"kind":"func","name":"isVariableDeclarationListButNotTypeArgument"},
  {"line":4690,"kind":"func","name":"isFunctionLikeButNotConstructor"},
  {"line":4694,"kind":"func","name":"isPreviousPropertyDeclarationTerminated"},
  {"line":4700,"kind":"func","name":"isDotOfNumericLiteral"},
  {"line":4710,"kind":"func","name":"isInJsxText"},
  {"line":4742,"kind":"func","name":"clientSupportsItemLabelDetails"},
  {"line":4746,"kind":"func","name":"clientSupportsItemSnippet"},
  {"line":4750,"kind":"func","name":"clientSupportsItemCommitCharacters"},
  {"line":4754,"kind":"func","name":"clientSupportsItemInsertReplace"},
  {"line":4758,"kind":"func","name":"clientSupportsDefaultCommitCharacters"},
  {"line":4762,"kind":"func","name":"clientSupportsDefaultEditRange"},
  {"line":4766,"kind":"type","name":"argumentInfoForCompletions"},
  {"line":4772,"kind":"func","name":"getArgumentInfoForCompletions"},
  {"line":4808,"kind":"func","name":"ResolveCompletionItem","receiver":"l *LanguageService"},
  {"line":4827,"kind":"func","name":"getCompletionDocumentationFormat"},
  {"line":4831,"kind":"func","name":"getCompletionItemDetails","receiver":"l *LanguageService"},
  {"line":4918,"kind":"type","name":"detailsData"},
  {"line":4925,"kind":"type","name":"symbolDetails"},
  {"line":4935,"kind":"func","name":"getSymbolCompletionFromItemData","receiver":"l *LanguageService"},
  {"line":5007,"kind":"func","name":"createSimpleDetails"},
  {"line":5015,"kind":"func","name":"createCompletionDetails"},
  {"line":5036,"kind":"type","name":"codeAction"},
  {"line":5043,"kind":"func","name":"createCompletionDetailsForSymbol","receiver":"l *LanguageService"},
  {"line":5055,"kind":"func","name":"getImportStatementCompletionInfo","receiver":"l *LanguageService"},
  {"line":5130,"kind":"func","name":"getSingleLineReplacementSpanForImportCompletionNode","receiver":"l *LanguageService"},
  {"line":5180,"kind":"func","name":"couldBeTypeOnlyImportSpecifier"},
  {"line":5184,"kind":"func","name":"canCompleteFromNamedBindings"},
  {"line":5212,"kind":"func","name":"getPotentiallyInvalidImportSpecifier"},
  {"line":5222,"kind":"func","name":"isModuleSpecifierMissingOrEmpty"},
  {"line":5236,"kind":"func","name":"hasDocComment"},
  {"line":5242,"kind":"func","name":"getJSDocTagAtPosition"},
  {"line":5254,"kind":"func","name":"tryGetTypeExpressionFromTag"},
  {"line":5272,"kind":"func","name":"isTagWithTypeExpression"},
  {"line":5284,"kind":"func","name":"jsDocCompletionInfo","receiver":"l *LanguageService"},
  {"line":5306,"kind":"var","name":"jsDocTagNames"},
  {"line":5393,"kind":"var","name":"jsDocTagNameCompletionItems"},
  {"line":5406,"kind":"var","name":"jsDocTagCompletionItems"},
  {"line":5419,"kind":"func","name":"getJSDocTagNameCompletions"},
  {"line":5423,"kind":"func","name":"getJSDocTagCompletions"},
  {"line":5427,"kind":"func","name":"getJSDocParameterCompletions"},
  {"line":5566,"kind":"func","name":"getJSDocParamAnnotation"},
  {"line":5649,"kind":"func","name":"getJSDocParamNameWithInitializer"},
  {"line":5657,"kind":"func","name":"generateJSDocParamTagsForDestructuring"},
  {"line":5697,"kind":"func","name":"jsDocParamPatternWorker"},
  {"line":5766,"kind":"func","name":"jsDocParamElementWorker"},
  {"line":5824,"kind":"func","name":"getJSDocParameterNameCompletions"},
  {"line":5863,"kind":"func","name":"getExhaustiveCaseSnippets","receiver":"l *LanguageService"},
  {"line":5998,"kind":"func","name":"typeNodeToExpression"},
  {"line":6060,"kind":"func","name":"entityNameToExpression"},
  {"line":6077,"kind":"type","name":"snippetPrinter"},
  {"line":6085,"kind":"func","name":"printNode","receiver":"p *snippetPrinter"},
  {"line":6093,"kind":"func","name":"printUnescapedNode","receiver":"p *snippetPrinter"},
  {"line":6100,"kind":"func","name":"printAndFormatNode","receiver":"p *snippetPrinter"},
  {"line":6125,"kind":"func","name":"createSyntheticFile","receiver":"p *snippetPrinter"},
  {"line":6141,"kind":"func","name":"createSnippetPrinter"},
  {"line":6156,"kind":"type","name":"snippetEmitTextWriter"},
  {"line":6161,"kind":"func","name":"nonEscapingWrite","receiver":"w *snippetEmitTextWriter"},
  {"line":6165,"kind":"func","name":"Write","receiver":"w *snippetEmitTextWriter"},
  {"line":6169,"kind":"func","name":"WriteComment","receiver":"w *snippetEmitTextWriter"},
  {"line":6173,"kind":"func","name":"WriteStringLiteral","receiver":"w *snippetEmitTextWriter"},
  {"line":6177,"kind":"func","name":"WriteParameter","receiver":"w *snippetEmitTextWriter"},
  {"line":6181,"kind":"func","name":"WriteProperty","receiver":"w *snippetEmitTextWriter"},
  {"line":6185,"kind":"func","name":"WriteSymbol","receiver":"w *snippetEmitTextWriter"},
  {"line":6193,"kind":"func","name":"escapingWrite","receiver":"w *snippetEmitTextWriter"},
];

export const lsCompletionsSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":5,"text":"\t\"errors\""},
  {"line":6,"text":"\t\"fmt\""},
  {"line":7,"text":"\t\"slices\""},
  {"line":8,"text":"\t\"strings\""},
  {"line":9,"text":"\t\"sync\""},
  {"line":10,"text":"\t\"unicode\""},
  {"line":11,"text":"\t\"unicode/utf8\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/format\""},
  {"line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/jsnum\""},
  {"line":22,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/autoimport\""},
  {"line":23,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":24,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":25,"text":"\t\"github.com/microsoft/typescript-go/internal/nodebuilder\""},
  {"line":26,"text":"\t\"github.com/microsoft/typescript-go/internal/printer\""},
  {"line":27,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":28,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":29,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":30,"text":")"},
  {"line":32,"text":"var ErrNeedsAutoImports = errors.New(\"completion list needs auto imports\")"},
  {"line":34,"text":"func (l *LanguageService) ProvideCompletion("},
  {"line":35,"text":"\tctx context.Context,"},
  {"line":36,"text":"\tdocumentURI lsproto.DocumentUri,"},
  {"line":37,"text":"\tLSPPosition lsproto.Position,"},
  {"line":38,"text":"\tcontext *lsproto.CompletionContext,"},
  {"line":39,"text":") (lsproto.CompletionResponse, error) {"},
  {"line":40,"text":"\t_, file := l.getProgramAndFile(documentURI)"},
  {"line":41,"text":"\tvar triggerCharacter *string"},
  {"line":42,"text":"\tif context != nil {"},
  {"line":43,"text":"\t\ttriggerCharacter = context.TriggerCharacter"},
  {"line":44,"text":"\t}"},
  {"line":45,"text":"\tctx = format.WithFormatCodeSettings(ctx, l.FormatOptions(), l.FormatOptions().NewLineCharacter)"},
  {"line":46,"text":"\tposition := int(l.converters.LineAndCharacterToPosition(file, LSPPosition))"},
  {"line":47,"text":"\tcompletionList, err := l.getCompletionsAtPosition("},
  {"line":48,"text":"\t\tctx,"},
  {"line":49,"text":"\t\tfile,"},
  {"line":50,"text":"\t\tposition,"},
  {"line":51,"text":"\t\ttriggerCharacter,"},
  {"line":52,"text":"\t)"},
  {"line":53,"text":"\tif err != nil {"},
  {"line":54,"text":"\t\treturn lsproto.CompletionItemsOrListOrNull{}, err"},
  {"line":55,"text":"\t}"},
  {"line":56,"text":"\tcompletionList = ensureItemData(file.FileName(), position, completionList)"},
  {"line":57,"text":"\treturn lsproto.CompletionItemsOrListOrNull{List: completionList}, nil"},
  {"line":58,"text":"}"},
  {"line":60,"text":"func ensureItemData(fileName string, pos int, list *lsproto.CompletionList) *lsproto.CompletionList {"},
  {"line":61,"text":"\tif list == nil {"},
  {"line":62,"text":"\t\treturn nil"},
  {"line":63,"text":"\t}"},
  {"line":64,"text":"\tfor _, item := range list.Items {"},
  {"line":65,"text":"\t\tif item.Data == nil {"},
  {"line":66,"text":"\t\t\titem.Data = &lsproto.CompletionItemData{"},
  {"line":67,"text":"\t\t\t\tFileName: fileName,"},
  {"line":68,"text":"\t\t\t\tPosition: int32(pos),"},
  {"line":69,"text":"\t\t\t\tName:     item.Label,"},
  {"line":70,"text":"\t\t\t}"},
  {"line":71,"text":"\t\t}"},
  {"line":72,"text":"\t}"},
  {"line":73,"text":"\treturn list"},
  {"line":74,"text":"}"},
  {"line":77,"text":"type completionData = any"},
  {"line":79,"text":"type completionDataData struct {"},
  {"line":80,"text":"\tsymbols          []*ast.Symbol"},
  {"line":81,"text":"\tautoImports      []*autoimport.FixAndExport"},
  {"line":82,"text":"\tcompletionKind   CompletionKind"},
  {"line":83,"text":"\tisInSnippetScope bool"},
  {"line":85,"text":"\tpropertyAccessToConvert      *ast.PropertyAccessExpressionNode"},
  {"line":86,"text":"\tisNewIdentifierLocation      bool"},
  {"line":87,"text":"\tlocation                     *ast.Node"},
  {"line":88,"text":"\tkeywordFilters               KeywordCompletionFilters"},
  {"line":89,"text":"\tliterals                     []literalValue"},
  {"line":90,"text":"\tsymbolToOriginInfoMap        map[int]*symbolOriginInfo"},
  {"line":91,"text":"\tsymbolToSortTextMap          map[ast.SymbolId]SortText"},
  {"line":92,"text":"\trecommendedCompletion        *ast.Symbol"},
  {"line":93,"text":"\tpreviousToken                *ast.Node"},
  {"line":94,"text":"\tcontextToken                 *ast.Node"},
  {"line":95,"text":"\tjsxInitializer               jsxInitializer"},
  {"line":96,"text":"\tinsideJSDocTagTypeExpression bool"},
  {"line":97,"text":"\tisTypeOnlyLocation           bool"},
  {"line":99,"text":"\tisJsxIdentifierExpected   bool"},
  {"line":100,"text":"\tisRightOfOpenTag          bool"},
  {"line":101,"text":"\tisRightOfDotOrQuestionDot bool"},
  {"line":102,"text":"\timportStatementCompletion *importStatementCompletionInfo // !!!"},
  {"line":103,"text":"\thasUnresolvedAutoImports  bool                           // !!!"},
  {"line":105,"text":"\tdefaultCommitCharacters []string"},
  {"line":106,"text":"}"},
  {"line":108,"text":"type completionDataKeyword struct {"},
  {"line":109,"text":"\tkeywordCompletions      []*lsproto.CompletionItem"},
  {"line":110,"text":"\tisNewIdentifierLocation bool"},
  {"line":111,"text":"}"},
  {"line":113,"text":"type completionDataJSDocTagName struct{}"},
  {"line":115,"text":"type completionDataJSDocTag struct{}"},
  {"line":117,"text":"type completionDataJSDocParameterName struct {"},
  {"line":118,"text":"\ttag *ast.JSDocParameterOrPropertyTag"},
  {"line":119,"text":"}"},
  {"line":121,"text":"type importStatementCompletionInfo struct {"},
  {"line":122,"text":"\tisKeywordOnlyCompletion        bool"},
  {"line":123,"text":"\tkeywordCompletion              ast.Kind // TokenKind"},
  {"line":124,"text":"\tisNewIdentifierLocation        bool"},
  {"line":125,"text":"\tisTopLevelTypeOnly             bool"},
  {"line":126,"text":"\tcouldBeTypeOnlyImportSpecifier bool"},
  {"line":127,"text":"\treplacementSpan                *lsproto.Range"},
  {"line":128,"text":"}"},
  {"line":132,"text":"type jsxInitializer struct {"},
  {"line":133,"text":"\tisInitializer bool"},
  {"line":134,"text":"\tinitializer   *ast.IdentifierNode"},
  {"line":135,"text":"}"},
  {"line":137,"text":"type KeywordCompletionFilters int"},
  {"line":139,"text":"const ("},
  {"line":140,"text":"\tKeywordCompletionFiltersNone                         KeywordCompletionFilters = iota // No keywords"},
  {"line":141,"text":"\tKeywordCompletionFiltersAll                                                          // Every possible kewyord"},
  {"line":142,"text":"\tKeywordCompletionFiltersClassElementKeywords                                         // Keywords inside class body"},
  {"line":143,"text":"\tKeywordCompletionFiltersInterfaceElementKeywords                                     // Keywords inside interface body"},
  {"line":144,"text":"\tKeywordCompletionFiltersConstructorParameterKeywords                                 // Keywords at constructor parameter"},
  {"line":145,"text":"\tKeywordCompletionFiltersFunctionLikeBodyKeywords                                     // Keywords at function like body"},
  {"line":146,"text":"\tKeywordCompletionFiltersTypeAssertionKeywords"},
  {"line":147,"text":"\tKeywordCompletionFiltersTypeKeywords"},
  {"line":148,"text":"\tKeywordCompletionFiltersTypeKeyword // Literally just `type`"},
  {"line":149,"text":"\tKeywordCompletionFiltersLast        = KeywordCompletionFiltersTypeKeyword"},
  {"line":150,"text":")"},
  {"line":152,"text":"func keywordFiltersFromSyntaxKind(keywordCompletion ast.Kind) KeywordCompletionFilters {"},
  {"line":153,"text":"\tswitch keywordCompletion {"},
  {"line":154,"text":"\tcase ast.KindTypeKeyword:"},
  {"line":155,"text":"\t\treturn KeywordCompletionFiltersTypeKeyword"},
  {"line":156,"text":"\tdefault:"},
  {"line":157,"text":"\t\tpanic(\"Unknown mapping from ast.Kind `\" + keywordCompletion.String() + \"` to KeywordCompletionFilters\")"},
  {"line":158,"text":"\t}"},
  {"line":159,"text":"}"},
  {"line":161,"text":"type CompletionKind int"},
  {"line":163,"text":"const ("},
  {"line":164,"text":"\tCompletionKindNone CompletionKind = iota"},
  {"line":165,"text":"\tCompletionKindObjectPropertyDeclaration"},
  {"line":166,"text":"\tCompletionKindGlobal"},
  {"line":167,"text":"\tCompletionKindPropertyAccess"},
  {"line":168,"text":"\tCompletionKindMemberLike"},
  {"line":169,"text":"\tCompletionKindString"},
  {"line":170,"text":")"},
  {"line":172,"text":"var TriggerCharacters = []string{\".\", `\"`, \"'\", \"`\", \"/\", \"@\", \"<\", \"#\", \" \"}"},
  {"line":175,"text":"var allCommitCharacters = []string{\".\", \",\", \";\"}"},
  {"line":178,"text":"var noCommaCommitCharacters = []string{\".\", \";\"}"},
  {"line":180,"text":"var emptyCommitCharacters = []string{}"},
  {"line":182,"text":"type SortText string"},
  {"line":184,"text":"const ("},
  {"line":185,"text":"\tSortTextLocalDeclarationPriority         SortText = \"10\""},
  {"line":186,"text":"\tSortTextLocationPriority                 SortText = \"11\""},
  {"line":187,"text":"\tSortTextOptionalMember                   SortText = \"12\""},
  {"line":188,"text":"\tSortTextMemberDeclaredBySpreadAssignment SortText = \"13\""},
  {"line":189,"text":"\tSortTextSuggestedClassMembers            SortText = \"14\""},
  {"line":190,"text":"\tSortTextGlobalsOrKeywords                SortText = \"15\""},
  {"line":191,"text":"\tSortTextAutoImportSuggestions            SortText = \"16\""},
  {"line":192,"text":"\tSortTextClassMemberSnippets              SortText = \"17\""},
  {"line":193,"text":"\tSortTextJavascriptIdentifiers            SortText = \"18\""},
  {"line":194,"text":")"},
  {"line":196,"text":"func DeprecateSortText(original SortText) SortText {"},
  {"line":197,"text":"\treturn \"z\" + original"},
  {"line":198,"text":"}"},
  {"line":200,"text":"func sortBelow(original SortText) SortText {"},
  {"line":201,"text":"\treturn original + \"1\""},
  {"line":202,"text":"}"},
  {"line":204,"text":"type symbolOriginInfoKind int"},
  {"line":206,"text":"const ("},
  {"line":207,"text":"\tsymbolOriginInfoKindThisType symbolOriginInfoKind = 1 << iota"},
  {"line":208,"text":"\tsymbolOriginInfoKindSymbolMember"},
  {"line":209,"text":"\tsymbolOriginInfoKindPromise"},
  {"line":210,"text":"\tsymbolOriginInfoKindNullable"},
  {"line":211,"text":"\tsymbolOriginInfoKindTypeOnlyAlias"},
  {"line":212,"text":"\tsymbolOriginInfoKindObjectLiteralMethod"},
  {"line":213,"text":"\tsymbolOriginInfoKindIgnore"},
  {"line":214,"text":"\tsymbolOriginInfoKindComputedPropertyName"},
  {"line":215,"text":")"},
  {"line":217,"text":"type symbolOriginInfo struct {"},
  {"line":218,"text":"\tkind              symbolOriginInfoKind"},
  {"line":219,"text":"\tisDefaultExport   bool"},
  {"line":220,"text":"\tisFromPackageJson bool"},
  {"line":221,"text":"\tfileName          string"},
  {"line":222,"text":"\tdata              any"},
  {"line":223,"text":"}"},
  {"line":225,"text":"func (origin *symbolOriginInfo) symbolName() string {"},
  {"line":226,"text":"\tswitch origin.data.(type) {"},
  {"line":227,"text":"\tcase *symbolOriginInfoComputedPropertyName:"},
  {"line":228,"text":"\t\treturn origin.data.(*symbolOriginInfoComputedPropertyName).symbolName"},
  {"line":229,"text":"\tdefault:"},
  {"line":230,"text":"\t\tpanic(fmt.Sprintf(\"symbolOriginInfo: unknown data type for symbolName(): %T\", origin.data))"},
  {"line":231,"text":"\t}"},
  {"line":232,"text":"}"},
  {"line":234,"text":"type symbolOriginInfoObjectLiteralMethod struct {"},
  {"line":235,"text":"\tinsertText   string"},
  {"line":236,"text":"\tlabelDetails *lsproto.CompletionItemLabelDetails"},
  {"line":237,"text":"\tisSnippet    bool"},
  {"line":238,"text":"}"},
  {"line":240,"text":"func (s *symbolOriginInfo) asObjectLiteralMethod() *symbolOriginInfoObjectLiteralMethod {"},
  {"line":241,"text":"\treturn s.data.(*symbolOriginInfoObjectLiteralMethod)"},
  {"line":242,"text":"}"},
  {"line":244,"text":"type symbolOriginInfoTypeOnlyAlias struct {"},
  {"line":245,"text":"\tdeclaration *ast.TypeOnlyImportDeclaration"},
  {"line":246,"text":"}"},
  {"line":248,"text":"type symbolOriginInfoComputedPropertyName struct {"},
  {"line":249,"text":"\tsymbolName string"},
  {"line":250,"text":"}"},
  {"line":261,"text":"type completionSource string"},
  {"line":263,"text":"const ("},
  {"line":265,"text":"\tcompletionSourceThisProperty completionSource = \"ThisProperty/\""},
  {"line":267,"text":"\tcompletionSourceClassMemberSnippet completionSource = \"ClassMemberSnippet/\""},
  {"line":269,"text":"\tcompletionSourceTypeOnlyAlias completionSource = \"TypeOnlyAlias/\""},
  {"line":271,"text":"\tcompletionSourceObjectLiteralMethodSnippet completionSource = \"ObjectLiteralMethodSnippet/\""},
  {"line":273,"text":"\tcompletionSourceSwitchCases completionSource = \"SwitchCases/\""},
  {"line":275,"text":"\tcompletionSourceObjectLiteralMemberWithComma completionSource = \"ObjectLiteralMemberWithComma/\""},
  {"line":276,"text":")"},
  {"line":280,"text":"type uniqueNamesMap = map[string]bool"},
  {"line":283,"text":"type literalValue any"},
  {"line":285,"text":"type globalsSearch int"},
  {"line":287,"text":"const ("},
  {"line":288,"text":"\tglobalsSearchContinue globalsSearch = iota"},
  {"line":289,"text":"\tglobalsSearchSuccess"},
  {"line":290,"text":"\tglobalsSearchFail"},
  {"line":291,"text":")"},
  {"line":293,"text":"func (l *LanguageService) getCompletionsAtPosition("},
  {"line":294,"text":"\tctx context.Context,"},
  {"line":295,"text":"\tfile *ast.SourceFile,"},
  {"line":296,"text":"\tposition int,"},
  {"line":297,"text":"\ttriggerCharacter *string,"},
  {"line":298,"text":") (*lsproto.CompletionList, error) {"},
  {"line":299,"text":"\t_, previousToken := getRelevantTokens(position, file)"},
  {"line":300,"text":"\tif triggerCharacter != nil && !IsInString(file, position, previousToken) && !isValidTrigger(file, *triggerCharacter, previousToken, position) {"},
  {"line":301,"text":"\t\treturn nil, nil"},
  {"line":302,"text":"\t}"},
  {"line":304,"text":"\tif triggerCharacter != nil && *triggerCharacter == \" \" {"},
  {"line":306,"text":"\t\tif l.UserPreferences().IncludeCompletionsForImportStatements.IsTrue() {"},
  {"line":307,"text":"\t\t\treturn &lsproto.CompletionList{"},
  {"line":308,"text":"\t\t\t\tIsIncomplete: true,"},
  {"line":309,"text":"\t\t\t}, nil"},
  {"line":310,"text":"\t\t}"},
  {"line":311,"text":"\t\treturn nil, nil"},
  {"line":312,"text":"\t}"},
  {"line":314,"text":"\tcompilerOptions := l.GetProgram().Options()"},
  {"line":318,"text":"\tchecker, done := l.GetProgram().GetTypeCheckerForFile(ctx, file)"},
  {"line":319,"text":"\tdefer done()"},
  {"line":321,"text":"\tstringCompletions := l.getStringLiteralCompletions("},
  {"line":322,"text":"\t\tctx,"},
  {"line":323,"text":"\t\tfile,"},
  {"line":324,"text":"\t\tposition,"},
  {"line":325,"text":"\t\tpreviousToken,"},
  {"line":326,"text":"\t\tchecker,"},
  {"line":327,"text":"\t\tcompilerOptions,"},
  {"line":328,"text":"\t)"},
  {"line":329,"text":"\tif stringCompletions != nil {"},
  {"line":330,"text":"\t\treturn stringCompletions, nil"},
  {"line":331,"text":"\t}"},
  {"line":333,"text":"\tif previousToken != nil && (previousToken.Kind == ast.KindBreakKeyword ||"},
  {"line":334,"text":"\t\tpreviousToken.Kind == ast.KindContinueKeyword ||"},
  {"line":335,"text":"\t\tpreviousToken.Kind == ast.KindIdentifier) &&"},
  {"line":336,"text":"\t\tast.IsBreakOrContinueStatement(previousToken.Parent) {"},
  {"line":337,"text":"\t\treturn l.getLabelCompletionsAtPosition("},
  {"line":338,"text":"\t\t\tctx,"},
  {"line":339,"text":"\t\t\tpreviousToken.Parent,"},
  {"line":340,"text":"\t\t\tfile,"},
  {"line":341,"text":"\t\t\tposition,"},
  {"line":342,"text":"\t\t\tl.getOptionalReplacementSpan(previousToken, file),"},
  {"line":343,"text":"\t\t), nil"},
  {"line":344,"text":"\t}"},
  {"line":346,"text":"\tpreferences := l.UserPreferences()"},
  {"line":347,"text":"\tdata, err := l.getCompletionData(ctx, checker, file, position, preferences, false /*forItemResolve*/)"},
  {"line":348,"text":"\tif err != nil {"},
  {"line":349,"text":"\t\treturn nil, err"},
  {"line":350,"text":"\t}"},
  {"line":351,"text":"\tif data == nil {"},
  {"line":352,"text":"\t\treturn nil, nil"},
  {"line":353,"text":"\t}"},
  {"line":355,"text":"\tswitch data := data.(type) {"},
  {"line":356,"text":"\tcase *completionDataData:"},
  {"line":357,"text":"\t\toptionalReplacementSpan := l.getOptionalReplacementSpan(data.location, file)"},
  {"line":358,"text":"\t\tresponse, err := l.completionInfoFromData("},
  {"line":359,"text":"\t\t\tctx,"},
  {"line":360,"text":"\t\t\tchecker,"},
  {"line":361,"text":"\t\t\tfile,"},
  {"line":362,"text":"\t\t\tcompilerOptions,"},
  {"line":363,"text":"\t\t\tdata,"},
  {"line":364,"text":"\t\t\tposition,"},
  {"line":365,"text":"\t\t\toptionalReplacementSpan,"},
  {"line":366,"text":"\t\t)"},
  {"line":367,"text":"\t\tif err != nil {"},
  {"line":368,"text":"\t\t\treturn nil, err"},
  {"line":369,"text":"\t\t}"},
  {"line":370,"text":"\t\treturn response, nil"},
  {"line":371,"text":"\tcase *completionDataKeyword:"},
  {"line":372,"text":"\t\toptionalReplacementSpan := l.getOptionalReplacementSpan(previousToken, file)"},
  {"line":373,"text":"\t\treturn l.specificKeywordCompletionInfo("},
  {"line":374,"text":"\t\t\tctx,"},
  {"line":375,"text":"\t\t\tposition,"},
  {"line":376,"text":"\t\t\tfile,"},
  {"line":377,"text":"\t\t\tdata.keywordCompletions,"},
  {"line":378,"text":"\t\t\tdata.isNewIdentifierLocation,"},
  {"line":379,"text":"\t\t\toptionalReplacementSpan,"},
  {"line":380,"text":"\t\t), nil"},
  {"line":381,"text":"\tcase *completionDataJSDocTagName:"},
  {"line":383,"text":"\t\titems := getJSDocTagNameCompletions()"},
  {"line":384,"text":"\t\titems = append(items, getJSDocParameterCompletions("},
  {"line":385,"text":"\t\t\tctx,"},
  {"line":386,"text":"\t\t\tfile,"},
  {"line":387,"text":"\t\t\tposition,"},
  {"line":388,"text":"\t\t\tchecker,"},
  {"line":389,"text":"\t\t\tcompilerOptions,"},
  {"line":390,"text":"\t\t\tpreferences,"},
  {"line":391,"text":"\t\t\t/*tagNameOnly*/ true,"},
  {"line":392,"text":"\t\t)...)"},
  {"line":393,"text":"\t\treturn l.jsDocCompletionInfo(ctx, position, file, items), nil"},
  {"line":394,"text":"\tcase *completionDataJSDocTag:"},
  {"line":396,"text":"\t\titems := getJSDocTagCompletions()"},
  {"line":397,"text":"\t\titems = append(items, getJSDocParameterCompletions("},
  {"line":398,"text":"\t\t\tctx,"},
  {"line":399,"text":"\t\t\tfile,"},
  {"line":400,"text":"\t\t\tposition,"},
  {"line":401,"text":"\t\t\tchecker,"},
  {"line":402,"text":"\t\t\tcompilerOptions,"},
  {"line":403,"text":"\t\t\tpreferences,"},
  {"line":404,"text":"\t\t\t/*tagNameOnly*/ false,"},
  {"line":405,"text":"\t\t)...)"},
  {"line":406,"text":"\t\treturn l.jsDocCompletionInfo(ctx, position, file, items), nil"},
  {"line":407,"text":"\tcase *completionDataJSDocParameterName:"},
  {"line":408,"text":"\t\treturn l.jsDocCompletionInfo(ctx, position, file, getJSDocParameterNameCompletions(data.tag)), nil"},
  {"line":409,"text":"\tdefault:"},
  {"line":410,"text":"\t\tpanic(\"getCompletionData() returned unexpected type: \" + fmt.Sprintf(\"%T\", data))"},
  {"line":411,"text":"\t}"},
  {"line":412,"text":"}"},
  {"line":414,"text":"func (l *LanguageService) getCompletionData("},
  {"line":415,"text":"\tctx context.Context,"},
  {"line":416,"text":"\ttypeChecker *checker.Checker,"},
  {"line":417,"text":"\tfile *ast.SourceFile,"},
  {"line":418,"text":"\tposition int,"},
  {"line":419,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":420,"text":"\tforItemResolve bool,"},
  {"line":421,"text":") (completionData, error) {"},
  {"line":422,"text":"\tinCheckedFile := isCheckedFile(file, l.GetProgram().Options())"},
  {"line":424,"text":"\tcurrentToken := astnav.GetTokenAtPosition(file, position)"},
  {"line":426,"text":"\tinsideComment := isInComment(file, position, currentToken)"},
  {"line":428,"text":"\tinsideJSDocTagTypeExpression := false"},
  {"line":429,"text":"\tinsideJsDocImportTag := false"},
  {"line":430,"text":"\tisInSnippetScope := false"},
  {"line":431,"text":"\tif insideComment != nil {"},
  {"line":432,"text":"\t\tif hasDocComment(file, position) {"},
  {"line":433,"text":"\t\t\tif position > 0 && file.Text()[position-1] == '@' {"},
  {"line":436,"text":"\t\t\t\treturn &completionDataJSDocTagName{}, nil"},
  {"line":437,"text":"\t\t\t} else {"},
  {"line":454,"text":"\t\t\t\tlineStart := format.GetLineStartPositionForPosition(position, file)"},
  {"line":455,"text":"\t\t\t\tnoCommentPrefix := true"},
  {"line":456,"text":"\t\t\t\tfor _, r := range file.Text()[lineStart:position] {"},
  {"line":457,"text":"\t\t\t\t\tif !(stringutil.IsWhiteSpaceSingleLine(r) || r == '*' || r == '/' || r == '(' || r == ')' || r == '|') {"},
  {"line":458,"text":"\t\t\t\t\t\tnoCommentPrefix = false"},
  {"line":459,"text":"\t\t\t\t\t\tbreak"},
  {"line":460,"text":"\t\t\t\t\t}"},
  {"line":461,"text":"\t\t\t\t}"},
  {"line":462,"text":"\t\t\t\tif noCommentPrefix {"},
  {"line":463,"text":"\t\t\t\t\treturn &completionDataJSDocTag{}, nil"},
  {"line":464,"text":"\t\t\t\t}"},
  {"line":465,"text":"\t\t\t}"},
  {"line":466,"text":"\t\t}"},
  {"line":471,"text":"\t\tif tag := getJSDocTagAtPosition(currentToken, position); tag != nil {"},
  {"line":472,"text":"\t\t\tif tag.TagName().Pos() <= position && position <= tag.TagName().End() {"},
  {"line":473,"text":"\t\t\t\treturn &completionDataJSDocTagName{}, nil"},
  {"line":474,"text":"\t\t\t}"},
  {"line":475,"text":"\t\t\tif ast.IsJSDocImportTag(tag) {"},
  {"line":476,"text":"\t\t\t\tinsideJsDocImportTag = true"},
  {"line":477,"text":"\t\t\t} else {"},
  {"line":478,"text":"\t\t\t\tif typeExpression := tryGetTypeExpressionFromTag(tag); typeExpression != nil {"},
  {"line":479,"text":"\t\t\t\t\tcurrentToken = astnav.GetTokenAtPosition(file, position)"},
  {"line":480,"text":"\t\t\t\t\tif currentToken == nil ||"},
  {"line":481,"text":"\t\t\t\t\t\t(!ast.IsDeclarationName(currentToken) &&"},
  {"line":482,"text":"\t\t\t\t\t\t\t(currentToken.Parent.Kind != ast.KindJSDocPropertyTag ||"},
  {"line":483,"text":"\t\t\t\t\t\t\t\tcurrentToken.Parent.Name() != currentToken)) {"},
  {"line":485,"text":"\t\t\t\t\t\tinsideJSDocTagTypeExpression = isCurrentlyEditingNode(typeExpression, file, position)"},
  {"line":486,"text":"\t\t\t\t\t}"},
  {"line":487,"text":"\t\t\t\t}"},
  {"line":488,"text":"\t\t\t\tif !insideJSDocTagTypeExpression &&"},
  {"line":489,"text":"\t\t\t\t\tast.IsJSDocParameterTag(tag) &&"},
  {"line":490,"text":"\t\t\t\t\t(ast.NodeIsMissing(tag.Name()) || tag.Name().Pos() <= position && position <= tag.Name().End()) {"},
  {"line":491,"text":"\t\t\t\t\treturn &completionDataJSDocParameterName{"},
  {"line":492,"text":"\t\t\t\t\t\ttag: tag.AsJSDocParameterOrPropertyTag(),"},
  {"line":493,"text":"\t\t\t\t\t}, nil"},
  {"line":494,"text":"\t\t\t\t}"},
  {"line":495,"text":"\t\t\t}"},
  {"line":496,"text":"\t\t}"},
  {"line":498,"text":"\t\tif !insideJSDocTagTypeExpression && !insideJsDocImportTag {"},
  {"line":501,"text":"\t\t\treturn nil, nil"},
  {"line":502,"text":"\t\t}"},
  {"line":503,"text":"\t}"},
  {"line":507,"text":"\tisJSOnlyLocation := !insideJSDocTagTypeExpression && !insideJsDocImportTag && ast.IsSourceFileJS(file)"},
  {"line":508,"text":"\tcontextToken, previousToken := getRelevantTokens(position, file)"},
  {"line":513,"text":"\tnode := currentToken"},
  {"line":514,"text":"\tvar propertyAccessToConvert *ast.PropertyAccessExpressionNode"},
  {"line":515,"text":"\tisRightOfDot := false"},
  {"line":516,"text":"\tisRightOfQuestionDot := false"},
  {"line":517,"text":"\tisRightOfOpenTag := false"},
  {"line":518,"text":"\tisStartingCloseTag := false"},
  {"line":519,"text":"\tvar jsxInitializer jsxInitializer"},
  {"line":520,"text":"\tisJsxIdentifierExpected := false"},
  {"line":521,"text":"\tvar importStatementCompletion *importStatementCompletionInfo"},
  {"line":522,"text":"\tlocation := astnav.GetTouchingPropertyName(file, position)"},
  {"line":523,"text":"\tkeywordFilters := KeywordCompletionFiltersNone"},
  {"line":524,"text":"\tisNewIdentifierLocation := false"},
  {"line":526,"text":"\tvar defaultCommitCharacters []string"},
  {"line":528,"text":"\tif contextToken != nil {"},
  {"line":529,"text":"\t\timportStatementCompletionInfo := l.getImportStatementCompletionInfo(contextToken, file)"},
  {"line":530,"text":"\t\tif importStatementCompletionInfo.keywordCompletion != ast.KindUnknown {"},
  {"line":531,"text":"\t\t\tif importStatementCompletionInfo.isKeywordOnlyCompletion {"},
  {"line":532,"text":"\t\t\t\treturn &completionDataKeyword{"},
  {"line":533,"text":"\t\t\t\t\tkeywordCompletions: []*lsproto.CompletionItem{{"},
  {"line":534,"text":"\t\t\t\t\t\tLabel:    scanner.TokenToString(importStatementCompletionInfo.keywordCompletion),"},
  {"line":535,"text":"\t\t\t\t\t\tKind:     new(lsproto.CompletionItemKindKeyword),"},
  {"line":536,"text":"\t\t\t\t\t\tSortText: new(string(SortTextGlobalsOrKeywords)),"},
  {"line":537,"text":"\t\t\t\t\t}},"},
  {"line":538,"text":"\t\t\t\t\tisNewIdentifierLocation: importStatementCompletionInfo.isNewIdentifierLocation,"},
  {"line":539,"text":"\t\t\t\t}, nil"},
  {"line":540,"text":"\t\t\t}"},
  {"line":541,"text":"\t\t\tkeywordFilters = keywordFiltersFromSyntaxKind(importStatementCompletionInfo.keywordCompletion)"},
  {"line":542,"text":"\t\t}"},
  {"line":543,"text":"\t\tif importStatementCompletionInfo.replacementSpan != nil && preferences.IncludeCompletionsForImportStatements.IsTrue() {"},
  {"line":545,"text":"\t\t\timportStatementCompletion = &importStatementCompletionInfo"},
  {"line":546,"text":"\t\t\tisNewIdentifierLocation = importStatementCompletionInfo.isNewIdentifierLocation"},
  {"line":547,"text":"\t\t}"},
  {"line":549,"text":"\t\tif isCompletionListBlocker(contextToken, previousToken, location, file, position, typeChecker) {"},
  {"line":550,"text":"\t\t\tif keywordFilters != KeywordCompletionFiltersNone {"},
  {"line":551,"text":"\t\t\t\tisNewIdentifierLocation, _ := computeCommitCharactersAndIsNewIdentifier(contextToken, file, position)"},
  {"line":552,"text":"\t\t\t\treturn keywordCompletionData(keywordFilters, isJSOnlyLocation, isNewIdentifierLocation), nil"},
  {"line":553,"text":"\t\t\t}"},
  {"line":554,"text":"\t\t\treturn nil, nil"},
  {"line":555,"text":"\t\t}"},
  {"line":557,"text":"\t\tparent := contextToken.Parent"},
  {"line":558,"text":"\t\tif contextToken.Kind == ast.KindDotToken || contextToken.Kind == ast.KindQuestionDotToken {"},
  {"line":559,"text":"\t\t\tisRightOfDot = contextToken.Kind == ast.KindDotToken"},
  {"line":560,"text":"\t\t\tisRightOfQuestionDot = contextToken.Kind == ast.KindQuestionDotToken"},
  {"line":561,"text":"\t\t\tswitch parent.Kind {"},
  {"line":562,"text":"\t\t\tcase ast.KindPropertyAccessExpression:"},
  {"line":563,"text":"\t\t\t\tpropertyAccessToConvert = parent"},
  {"line":564,"text":"\t\t\t\tnode = propertyAccessToConvert.Expression()"},
  {"line":565,"text":"\t\t\t\tleftMostAccessExpression := ast.GetLeftmostAccessExpression(parent)"},
  {"line":566,"text":"\t\t\t\tif ast.NodeIsMissing(leftMostAccessExpression) ||"},
  {"line":567,"text":"\t\t\t\t\t((ast.IsCallExpression(node) || ast.IsFunctionLike(node)) &&"},
  {"line":568,"text":"\t\t\t\t\t\tnode.End() == contextToken.Pos() &&"},
  {"line":569,"text":"\t\t\t\t\t\tlsutil.GetLastChild(node, file).Kind != ast.KindCloseParenToken) {"},
  {"line":574,"text":"\t\t\t\t\treturn nil, nil"},
  {"line":575,"text":"\t\t\t\t}"},
  {"line":576,"text":"\t\t\tcase ast.KindQualifiedName:"},
  {"line":577,"text":"\t\t\t\tnode = parent.AsQualifiedName().Left"},
  {"line":578,"text":"\t\t\tcase ast.KindModuleDeclaration:"},
  {"line":579,"text":"\t\t\t\tnode = parent.Name()"},
  {"line":580,"text":"\t\t\tcase ast.KindImportType:"},
  {"line":581,"text":"\t\t\t\tnode = parent"},
  {"line":582,"text":"\t\t\tcase ast.KindMetaProperty:"},
  {"line":583,"text":"\t\t\t\tnode = lsutil.GetFirstToken(parent, file)"},
  {"line":584,"text":"\t\t\t\tif node.Kind != ast.KindImportKeyword && node.Kind != ast.KindNewKeyword {"},
  {"line":585,"text":"\t\t\t\t\tpanic(\"Unexpected token kind: \" + node.Kind.String())"},
  {"line":586,"text":"\t\t\t\t}"},
  {"line":587,"text":"\t\t\tdefault:"},
  {"line":590,"text":"\t\t\t\treturn nil, nil"},
  {"line":591,"text":"\t\t\t}"},
  {"line":592,"text":"\t\t} else { // !!! else if (!importStatementCompletion)"},
  {"line":596,"text":"\t\t\tif parent != nil && parent.Kind == ast.KindPropertyAccessExpression {"},
  {"line":597,"text":"\t\t\t\tcontextToken = parent"},
  {"line":598,"text":"\t\t\t\tparent = parent.Parent"},
  {"line":599,"text":"\t\t\t}"},
  {"line":602,"text":"\t\t\tif parent == location {"},
  {"line":603,"text":"\t\t\t\tswitch currentToken.Kind {"},
  {"line":604,"text":"\t\t\t\tcase ast.KindGreaterThanToken:"},
  {"line":605,"text":"\t\t\t\t\tif parent.Kind == ast.KindJsxElement || parent.Kind == ast.KindJsxOpeningElement {"},
  {"line":606,"text":"\t\t\t\t\t\tlocation = currentToken"},
  {"line":607,"text":"\t\t\t\t\t}"},
  {"line":608,"text":"\t\t\t\tcase ast.KindLessThanSlashToken:"},
  {"line":609,"text":"\t\t\t\t\tif parent.Kind == ast.KindJsxSelfClosingElement {"},
  {"line":610,"text":"\t\t\t\t\t\tlocation = currentToken"},
  {"line":611,"text":"\t\t\t\t\t}"},
  {"line":612,"text":"\t\t\t\t}"},
  {"line":613,"text":"\t\t\t}"},
  {"line":615,"text":"\t\t\tswitch parent.Kind {"},
  {"line":616,"text":"\t\t\tcase ast.KindJsxClosingElement:"},
  {"line":617,"text":"\t\t\t\tif contextToken.Kind == ast.KindLessThanSlashToken {"},
  {"line":618,"text":"\t\t\t\t\tisStartingCloseTag = true"},
  {"line":619,"text":"\t\t\t\t\tlocation = contextToken"},
  {"line":620,"text":"\t\t\t\t}"},
  {"line":621,"text":"\t\t\tcase ast.KindBinaryExpression:"},
  {"line":622,"text":"\t\t\t\tif !binaryExpressionMayBeOpenTag(parent.AsBinaryExpression()) {"},
  {"line":623,"text":"\t\t\t\t\tbreak"},
  {"line":624,"text":"\t\t\t\t}"},
  {"line":625,"text":"\t\t\t\tfallthrough"},
  {"line":626,"text":"\t\t\tcase ast.KindJsxSelfClosingElement, ast.KindJsxElement, ast.KindJsxOpeningElement:"},
  {"line":627,"text":"\t\t\t\tisJsxIdentifierExpected = true"},
  {"line":628,"text":"\t\t\t\tif contextToken.Kind == ast.KindLessThanToken {"},
  {"line":629,"text":"\t\t\t\t\tisRightOfOpenTag = true"},
  {"line":630,"text":"\t\t\t\t\tlocation = contextToken"},
  {"line":631,"text":"\t\t\t\t}"},
  {"line":632,"text":"\t\t\tcase ast.KindJsxExpression, ast.KindJsxSpreadAttribute:"},
  {"line":637,"text":"\t\t\t\tif previousToken.Kind == ast.KindCloseBraceToken ||"},
  {"line":638,"text":"\t\t\t\t\tpreviousToken.Kind == ast.KindIdentifier && previousToken.Parent.Kind == ast.KindJsxAttribute {"},
  {"line":639,"text":"\t\t\t\t\tisJsxIdentifierExpected = true"},
  {"line":640,"text":"\t\t\t\t}"},
  {"line":641,"text":"\t\t\tcase ast.KindJsxAttribute:"},
  {"line":643,"text":"\t\t\t\tif parent.Initializer() == previousToken && previousToken.End() < position {"},
  {"line":644,"text":"\t\t\t\t\tisJsxIdentifierExpected = true"},
  {"line":645,"text":"\t\t\t\t} else {"},
  {"line":646,"text":"\t\t\t\t\tswitch previousToken.Kind {"},
  {"line":647,"text":"\t\t\t\t\tcase ast.KindEqualsToken:"},
  {"line":648,"text":"\t\t\t\t\t\tjsxInitializer.isInitializer = true"},
  {"line":649,"text":"\t\t\t\t\tcase ast.KindIdentifier:"},
  {"line":650,"text":"\t\t\t\t\t\tisJsxIdentifierExpected = true"},
  {"line":653,"text":"\t\t\t\t\t\tif parent != previousToken.Parent &&"},
  {"line":654,"text":"\t\t\t\t\t\t\tparent.Initializer() == nil &&"},
  {"line":655,"text":"\t\t\t\t\t\t\tastnav.FindChildOfKind(parent, ast.KindEqualsToken, file) != nil {"},
  {"line":656,"text":"\t\t\t\t\t\t\tjsxInitializer.initializer = previousToken"},
  {"line":657,"text":"\t\t\t\t\t\t}"},
  {"line":658,"text":"\t\t\t\t\t}"},
  {"line":659,"text":"\t\t\t\t}"},
  {"line":660,"text":"\t\t\t}"},
  {"line":661,"text":"\t\t}"},
  {"line":662,"text":"\t}"},
  {"line":664,"text":"\tcompletionKind := CompletionKindNone"},
  {"line":665,"text":"\thasUnresolvedAutoImports := false"},
  {"line":667,"text":"\tvar symbols []*ast.Symbol"},
  {"line":668,"text":"\tvar autoImports []*autoimport.FixAndExport"},
  {"line":670,"text":"\tsymbolToOriginInfoMap := map[int]*symbolOriginInfo{}"},
  {"line":671,"text":"\tsymbolToSortTextMap := map[ast.SymbolId]SortText{}"},
  {"line":672,"text":"\tvar seenPropertySymbols collections.Set[ast.SymbolId]"},
  {"line":673,"text":"\tisTypeOnlyLocation := insideJSDocTagTypeExpression || insideJsDocImportTag ||"},
  {"line":674,"text":"\t\timportStatementCompletion != nil && location.Parent != nil && ast.IsTypeOnlyImportOrExportDeclaration(location.Parent) ||"},
  {"line":675,"text":"\t\t!isContextTokenValueLocation(contextToken) &&"},
  {"line":676,"text":"\t\t\t(isPossiblyTypeArgumentPosition(contextToken, file, typeChecker) ||"},
  {"line":677,"text":"\t\t\t\tast.IsPartOfTypeNode(location) ||"},
  {"line":678,"text":"\t\t\t\tisContextTokenTypeLocation(contextToken))"},
  {"line":680,"text":"\taddSymbolOriginInfo := func(symbol *ast.Symbol, insertQuestionDot bool, insertAwait bool) {"},
  {"line":681,"text":"\t\tsymbolId := ast.GetSymbolId(symbol)"},
  {"line":682,"text":"\t\tif insertAwait && seenPropertySymbols.AddIfAbsent(symbolId) {"},
  {"line":683,"text":"\t\t\tsymbolToOriginInfoMap[len(symbols)-1] = &symbolOriginInfo{kind: getNullableSymbolOriginInfoKind(symbolOriginInfoKindPromise, insertQuestionDot)}"},
  {"line":684,"text":"\t\t} else if insertQuestionDot {"},
  {"line":685,"text":"\t\t\tsymbolToOriginInfoMap[len(symbols)-1] = &symbolOriginInfo{kind: symbolOriginInfoKindNullable}"},
  {"line":686,"text":"\t\t}"},
  {"line":687,"text":"\t}"},
  {"line":689,"text":"\taddSymbolSortInfo := func(symbol *ast.Symbol) {"},
  {"line":690,"text":"\t\tsymbolId := ast.GetSymbolId(symbol)"},
  {"line":691,"text":"\t\tif isStaticProperty(symbol) {"},
  {"line":692,"text":"\t\t\tsymbolToSortTextMap[symbolId] = SortTextLocalDeclarationPriority"},
  {"line":693,"text":"\t\t}"},
  {"line":694,"text":"\t}"},
  {"line":696,"text":"\taddPropertySymbol := func(symbol *ast.Symbol, insertAwait bool, insertQuestionDot bool) {"},
  {"line":700,"text":"\t\tcomputedPropertyName := core.FirstNonNil(symbol.Declarations, func(decl *ast.Node) *ast.Node {"},
  {"line":701,"text":"\t\t\tname := ast.GetNameOfDeclaration(decl)"},
  {"line":702,"text":"\t\t\tif name != nil && name.Kind == ast.KindComputedPropertyName {"},
  {"line":703,"text":"\t\t\t\treturn name"},
  {"line":704,"text":"\t\t\t}"},
  {"line":705,"text":"\t\t\treturn nil"},
  {"line":706,"text":"\t\t})"},
  {"line":708,"text":"\t\tif computedPropertyName != nil {"},
  {"line":709,"text":"\t\t\tleftMostName := getLeftMostName(computedPropertyName.Expression()) // The completion is for `Symbol`, not `iterator`."},
  {"line":710,"text":"\t\t\tvar nameSymbol *ast.Symbol"},
  {"line":711,"text":"\t\t\tif leftMostName != nil {"},
  {"line":712,"text":"\t\t\t\tnameSymbol = typeChecker.GetSymbolAtLocation(leftMostName)"},
  {"line":713,"text":"\t\t\t}"},
  {"line":715,"text":"\t\t\tvar firstAccessibleSymbol *ast.Symbol"},
  {"line":716,"text":"\t\t\tif nameSymbol != nil {"},
  {"line":717,"text":"\t\t\t\tfirstAccessibleSymbol = getFirstSymbolInChain(nameSymbol, contextToken, typeChecker)"},
  {"line":718,"text":"\t\t\t}"},
  {"line":719,"text":"\t\t\tvar firstAccessibleSymbolId ast.SymbolId"},
  {"line":720,"text":"\t\t\tif firstAccessibleSymbol != nil {"},
  {"line":721,"text":"\t\t\t\tfirstAccessibleSymbolId = ast.GetSymbolId(firstAccessibleSymbol)"},
  {"line":722,"text":"\t\t\t}"},
  {"line":723,"text":"\t\t\tif firstAccessibleSymbolId != 0 && seenPropertySymbols.AddIfAbsent(firstAccessibleSymbolId) {"},
  {"line":724,"text":"\t\t\t\tsymbols = append(symbols, firstAccessibleSymbol)"},
  {"line":725,"text":"\t\t\t\tsymbolToSortTextMap[firstAccessibleSymbolId] = SortTextGlobalsOrKeywords"},
  {"line":726,"text":"\t\t\t\tmoduleSymbol := firstAccessibleSymbol.Parent"},
  {"line":727,"text":"\t\t\t\tif moduleSymbol == nil ||"},
  {"line":728,"text":"\t\t\t\t\t!checker.IsExternalModuleSymbol(moduleSymbol) ||"},
  {"line":729,"text":"\t\t\t\t\ttypeChecker.TryGetMemberInModuleExportsAndProperties(firstAccessibleSymbol.Name, moduleSymbol) != firstAccessibleSymbol {"},
  {"line":730,"text":"\t\t\t\t\tsymbolToOriginInfoMap[len(symbols)-1] = &symbolOriginInfo{kind: getNullableSymbolOriginInfoKind(symbolOriginInfoKindSymbolMember, insertQuestionDot)}"},
  {"line":731,"text":"\t\t\t\t} else {"},
  {"line":733,"text":"\t\t\t\t}"},
  {"line":734,"text":"\t\t\t} else if firstAccessibleSymbolId == 0 || !seenPropertySymbols.Has(firstAccessibleSymbolId) {"},
  {"line":735,"text":"\t\t\t\tsymbols = append(symbols, symbol)"},
  {"line":736,"text":"\t\t\t\taddSymbolOriginInfo(symbol, insertQuestionDot, insertAwait)"},
  {"line":737,"text":"\t\t\t\taddSymbolSortInfo(symbol)"},
  {"line":738,"text":"\t\t\t}"},
  {"line":739,"text":"\t\t} else {"},
  {"line":740,"text":"\t\t\tsymbols = append(symbols, symbol)"},
  {"line":741,"text":"\t\t\taddSymbolOriginInfo(symbol, insertQuestionDot, insertAwait)"},
  {"line":742,"text":"\t\t\taddSymbolSortInfo(symbol)"},
  {"line":743,"text":"\t\t}"},
  {"line":744,"text":"\t}"},
  {"line":746,"text":"\taddTypeProperties := func(t *checker.Type, insertAwait bool, insertQuestionDot bool) {"},
  {"line":747,"text":"\t\tif typeChecker.GetStringIndexType(t) != nil {"},
  {"line":748,"text":"\t\t\tisNewIdentifierLocation = true"},
  {"line":749,"text":"\t\t\tdefaultCommitCharacters = []string{}"},
  {"line":750,"text":"\t\t}"},
  {"line":751,"text":"\t\tif isRightOfQuestionDot && len(typeChecker.GetCallSignatures(t)) != 0 {"},
  {"line":752,"text":"\t\t\tisNewIdentifierLocation = true"},
  {"line":753,"text":"\t\t\tif defaultCommitCharacters == nil {"},
  {"line":754,"text":"\t\t\t\tdefaultCommitCharacters = slices.Clone(allCommitCharacters) // Only invalid commit character here would be `(`."},
  {"line":755,"text":"\t\t\t}"},
  {"line":756,"text":"\t\t}"},
  {"line":758,"text":"\t\tvar propertyAccess *ast.Node"},
  {"line":759,"text":"\t\tif node.Kind == ast.KindImportType {"},
  {"line":760,"text":"\t\t\tpropertyAccess = node"},
  {"line":761,"text":"\t\t} else {"},
  {"line":762,"text":"\t\t\tpropertyAccess = node.Parent"},
  {"line":763,"text":"\t\t}"},
  {"line":765,"text":"\t\tif inCheckedFile {"},
  {"line":766,"text":"\t\t\tfor _, symbol := range typeChecker.GetApparentProperties(t) {"},
  {"line":767,"text":"\t\t\t\tif typeChecker.IsValidPropertyAccessForCompletions(propertyAccess, t, symbol) {"},
  {"line":768,"text":"\t\t\t\t\taddPropertySymbol(symbol, false /*insertAwait*/, insertQuestionDot)"},
  {"line":769,"text":"\t\t\t\t}"},
  {"line":770,"text":"\t\t\t}"},
  {"line":771,"text":"\t\t} else {"},
  {"line":777,"text":"\t\t\tfor _, symbol := range getPropertiesForCompletion(t, typeChecker) {"},
  {"line":778,"text":"\t\t\t\tif typeChecker.IsValidPropertyAccessForCompletions(propertyAccess, t, symbol) {"},
  {"line":779,"text":"\t\t\t\t\tsymbols = append(symbols, symbol)"},
  {"line":780,"text":"\t\t\t\t}"},
  {"line":781,"text":"\t\t\t}"},
  {"line":782,"text":"\t\t}"},
  {"line":784,"text":"\t\tif insertAwait {"},
  {"line":785,"text":"\t\t\tpromiseType := typeChecker.GetPromisedTypeOfPromise(t)"},
  {"line":786,"text":"\t\t\tif promiseType != nil {"},
  {"line":787,"text":"\t\t\t\tfor _, symbol := range typeChecker.GetApparentProperties(promiseType) {"},
  {"line":788,"text":"\t\t\t\t\tif typeChecker.IsValidPropertyAccessForCompletions(propertyAccess, promiseType, symbol) {"},
  {"line":789,"text":"\t\t\t\t\t\taddPropertySymbol(symbol, true /*insertAwait*/, insertQuestionDot)"},
  {"line":790,"text":"\t\t\t\t\t}"},
  {"line":791,"text":"\t\t\t\t}"},
  {"line":792,"text":"\t\t\t}"},
  {"line":793,"text":"\t\t}"},
  {"line":794,"text":"\t}"},
  {"line":796,"text":"\tgetTypeScriptMemberSymbols := func() {"},
  {"line":798,"text":"\t\tcompletionKind = CompletionKindPropertyAccess"},
  {"line":801,"text":"\t\tisImportType := ast.IsLiteralImportTypeNode(node)"},
  {"line":802,"text":"\t\tisTypeLocation := (isImportType && !node.AsImportTypeNode().IsTypeOf) ||"},
  {"line":803,"text":"\t\t\tast.IsPartOfTypeNode(node.Parent) ||"},
  {"line":804,"text":"\t\t\tisPossiblyTypeArgumentPosition(contextToken, file, typeChecker)"},
  {"line":805,"text":"\t\tisRhsOfImportDeclaration := isInRightSideOfInternalImportEqualsDeclaration(node)"},
  {"line":806,"text":"\t\tif ast.IsEntityName(node) || isImportType || ast.IsPropertyAccessExpression(node) {"},
  {"line":807,"text":"\t\t\tisNamespaceName := ast.IsModuleDeclaration(node.Parent)"},
  {"line":808,"text":"\t\t\tif isNamespaceName {"},
  {"line":809,"text":"\t\t\t\tisNewIdentifierLocation = true"},
  {"line":810,"text":"\t\t\t\tdefaultCommitCharacters = []string{}"},
  {"line":811,"text":"\t\t\t}"},
  {"line":812,"text":"\t\t\tsymbol := typeChecker.GetSymbolAtLocation(node)"},
  {"line":813,"text":"\t\t\tif symbol != nil {"},
  {"line":814,"text":"\t\t\t\tsymbol := checker.SkipAlias(symbol, typeChecker)"},
  {"line":815,"text":"\t\t\t\tif symbol.Flags&(ast.SymbolFlagsModule|ast.SymbolFlagsEnum) != 0 {"},
  {"line":816,"text":"\t\t\t\t\tvar valueAccessNode *ast.Node"},
  {"line":817,"text":"\t\t\t\t\tif isImportType {"},
  {"line":818,"text":"\t\t\t\t\t\tvalueAccessNode = node"},
  {"line":819,"text":"\t\t\t\t\t} else {"},
  {"line":820,"text":"\t\t\t\t\t\tvalueAccessNode = node.Parent"},
  {"line":821,"text":"\t\t\t\t\t}"},
  {"line":823,"text":"\t\t\t\t\texportedSymbols := typeChecker.GetExportsOfModule(symbol)"},
  {"line":824,"text":"\t\t\t\t\tfor _, exportedSymbol := range exportedSymbols {"},
  {"line":825,"text":"\t\t\t\t\t\tif exportedSymbol == nil {"},
  {"line":826,"text":"\t\t\t\t\t\t\tpanic(\"getExporsOfModule() should all be defined\")"},
  {"line":827,"text":"\t\t\t\t\t\t}"},
  {"line":828,"text":"\t\t\t\t\t\tisValidValueAccess := func(s *ast.Symbol) bool {"},
  {"line":829,"text":"\t\t\t\t\t\t\treturn typeChecker.IsValidPropertyAccess(valueAccessNode, s.Name)"},
  {"line":830,"text":"\t\t\t\t\t\t}"},
  {"line":831,"text":"\t\t\t\t\t\tisValidTypeAccess := func(s *ast.Symbol) bool {"},
  {"line":832,"text":"\t\t\t\t\t\t\treturn symbolCanBeReferencedAtTypeLocation(s, typeChecker, collections.Set[ast.SymbolId]{})"},
  {"line":833,"text":"\t\t\t\t\t\t}"},
  {"line":834,"text":"\t\t\t\t\t\tvar isValidAccess bool"},
  {"line":835,"text":"\t\t\t\t\t\tif isNamespaceName {"},
  {"line":837,"text":"\t\t\t\t\t\t\tisValidAccess = exportedSymbol.Flags&ast.SymbolFlagsNamespace != 0 &&"},
  {"line":838,"text":"\t\t\t\t\t\t\t\t!core.Every(exportedSymbol.Declarations, func(declaration *ast.Declaration) bool {"},
  {"line":839,"text":"\t\t\t\t\t\t\t\t\treturn declaration.Parent == node.Parent"},
  {"line":840,"text":"\t\t\t\t\t\t\t\t})"},
  {"line":841,"text":"\t\t\t\t\t\t} else if isRhsOfImportDeclaration {"},
  {"line":843,"text":"\t\t\t\t\t\t\tisValidAccess = isValidTypeAccess(exportedSymbol) || isValidValueAccess(exportedSymbol)"},
  {"line":844,"text":"\t\t\t\t\t\t} else if isTypeLocation || insideJSDocTagTypeExpression {"},
  {"line":845,"text":"\t\t\t\t\t\t\tisValidAccess = isValidTypeAccess(exportedSymbol)"},
  {"line":846,"text":"\t\t\t\t\t\t} else {"},
  {"line":847,"text":"\t\t\t\t\t\t\tisValidAccess = isValidValueAccess(exportedSymbol)"},
  {"line":848,"text":"\t\t\t\t\t\t}"},
  {"line":849,"text":"\t\t\t\t\t\tif isValidAccess {"},
  {"line":850,"text":"\t\t\t\t\t\t\tsymbols = append(symbols, exportedSymbol)"},
  {"line":851,"text":"\t\t\t\t\t\t}"},
  {"line":852,"text":"\t\t\t\t\t}"},
  {"line":855,"text":"\t\t\t\t\tif !isTypeLocation && !insideJSDocTagTypeExpression &&"},
  {"line":856,"text":"\t\t\t\t\t\tcore.Some("},
  {"line":857,"text":"\t\t\t\t\t\t\tsymbol.Declarations,"},
  {"line":858,"text":"\t\t\t\t\t\t\tfunc(decl *ast.Declaration) bool {"},
  {"line":859,"text":"\t\t\t\t\t\t\t\treturn decl.Kind != ast.KindSourceFile && decl.Kind != ast.KindModuleDeclaration && decl.Kind != ast.KindEnumDeclaration"},
  {"line":860,"text":"\t\t\t\t\t\t\t}) {"},
  {"line":861,"text":"\t\t\t\t\t\tt := typeChecker.GetNonOptionalType(typeChecker.GetTypeOfSymbolAtLocation(symbol, node))"},
  {"line":862,"text":"\t\t\t\t\t\tinsertQuestionDot := false"},
  {"line":863,"text":"\t\t\t\t\t\tif typeChecker.IsNullableType(t) {"},
  {"line":864,"text":"\t\t\t\t\t\t\tcanCorrectToQuestionDot := isRightOfDot && !isRightOfQuestionDot &&"},
  {"line":865,"text":"\t\t\t\t\t\t\t\t!preferences.IncludeAutomaticOptionalChainCompletions.IsFalse()"},
  {"line":866,"text":"\t\t\t\t\t\t\tif canCorrectToQuestionDot || isRightOfQuestionDot {"},
  {"line":867,"text":"\t\t\t\t\t\t\t\tt = typeChecker.GetNonNullableType(t)"},
  {"line":868,"text":"\t\t\t\t\t\t\t\tif canCorrectToQuestionDot {"},
  {"line":869,"text":"\t\t\t\t\t\t\t\t\tinsertQuestionDot = true"},
  {"line":870,"text":"\t\t\t\t\t\t\t\t}"},
  {"line":871,"text":"\t\t\t\t\t\t\t}"},
  {"line":872,"text":"\t\t\t\t\t\t}"},
  {"line":873,"text":"\t\t\t\t\t\taddTypeProperties(t, node.Flags&ast.NodeFlagsAwaitContext != 0, insertQuestionDot)"},
  {"line":874,"text":"\t\t\t\t\t}"},
  {"line":876,"text":"\t\t\t\t\treturn"},
  {"line":877,"text":"\t\t\t\t}"},
  {"line":878,"text":"\t\t\t}"},
  {"line":879,"text":"\t\t}"},
  {"line":881,"text":"\t\tif !isTypeLocation || checker.IsInTypeQuery(node) {"},
  {"line":885,"text":"\t\t\ttypeChecker.TryGetThisTypeAtEx(node, false /*includeGlobalThis*/, nil)"},
  {"line":886,"text":"\t\t\tt := typeChecker.GetNonOptionalType(typeChecker.GetTypeAtLocation(node))"},
  {"line":888,"text":"\t\t\tif !isTypeLocation {"},
  {"line":889,"text":"\t\t\t\tinsertQuestionDot := false"},
  {"line":890,"text":"\t\t\t\tif typeChecker.IsNullableType(t) {"},
  {"line":891,"text":"\t\t\t\t\tcanCorrectToQuestionDot := isRightOfDot && !isRightOfQuestionDot &&"},
  {"line":892,"text":"\t\t\t\t\t\t!preferences.IncludeAutomaticOptionalChainCompletions.IsFalse()"},
  {"line":894,"text":"\t\t\t\t\tif canCorrectToQuestionDot || isRightOfQuestionDot {"},
  {"line":895,"text":"\t\t\t\t\t\tt = typeChecker.GetNonNullableType(t)"},
  {"line":896,"text":"\t\t\t\t\t\tif canCorrectToQuestionDot {"},
  {"line":897,"text":"\t\t\t\t\t\t\tinsertQuestionDot = true"},
  {"line":898,"text":"\t\t\t\t\t\t}"},
  {"line":899,"text":"\t\t\t\t\t}"},
  {"line":900,"text":"\t\t\t\t}"},
  {"line":901,"text":"\t\t\t\taddTypeProperties(t, node.Flags&ast.NodeFlagsAwaitContext != 0, insertQuestionDot)"},
  {"line":902,"text":"\t\t\t} else {"},
  {"line":903,"text":"\t\t\t\taddTypeProperties(typeChecker.GetNonNullableType(t), false /*insertAwait*/, false /*insertQuestionDot*/)"},
  {"line":904,"text":"\t\t\t}"},
  {"line":905,"text":"\t\t}"},
  {"line":906,"text":"\t}"},
  {"line":909,"text":"\ttryGetObjectTypeLiteralInTypeArgumentCompletionSymbols := func() (globalsSearch, error) {"},
  {"line":910,"text":"\t\ttypeLiteralNode := tryGetTypeLiteralNode(contextToken)"},
  {"line":911,"text":"\t\tif typeLiteralNode == nil {"},
  {"line":912,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":913,"text":"\t\t}"},
  {"line":915,"text":"\t\tintersectionTypeNode := core.IfElse("},
  {"line":916,"text":"\t\t\tast.IsIntersectionTypeNode(typeLiteralNode.Parent),"},
  {"line":917,"text":"\t\t\ttypeLiteralNode.Parent,"},
  {"line":918,"text":"\t\t\tnil)"},
  {"line":919,"text":"\t\tcontainerTypeNode := core.IfElse("},
  {"line":920,"text":"\t\t\tintersectionTypeNode != nil,"},
  {"line":921,"text":"\t\t\tintersectionTypeNode,"},
  {"line":922,"text":"\t\t\ttypeLiteralNode)"},
  {"line":924,"text":"\t\tcontainerExpectedType := getConstraintOfTypeArgumentProperty(containerTypeNode, typeChecker)"},
  {"line":925,"text":"\t\tif containerExpectedType == nil {"},
  {"line":926,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":927,"text":"\t\t}"},
  {"line":929,"text":"\t\tcontainerActualType := typeChecker.GetTypeFromTypeNode(containerTypeNode)"},
  {"line":931,"text":"\t\tmembers := getPropertiesForCompletion(containerExpectedType, typeChecker)"},
  {"line":932,"text":"\t\texistingMembers := getPropertiesForCompletion(containerActualType, typeChecker)"},
  {"line":934,"text":"\t\texistingMemberNames := collections.Set[string]{}"},
  {"line":935,"text":"\t\tfor _, member := range existingMembers {"},
  {"line":936,"text":"\t\t\texistingMemberNames.Add(member.Name)"},
  {"line":937,"text":"\t\t}"},
  {"line":939,"text":"\t\tsymbols = append("},
  {"line":940,"text":"\t\t\tsymbols,"},
  {"line":941,"text":"\t\t\tcore.Filter(members, func(member *ast.Symbol) bool { return !existingMemberNames.Has(member.Name) })...)"},
  {"line":943,"text":"\t\tcompletionKind = CompletionKindObjectPropertyDeclaration"},
  {"line":944,"text":"\t\tisNewIdentifierLocation = true"},
  {"line":946,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":947,"text":"\t}"},
  {"line":951,"text":"\ttryGetObjectLikeCompletionSymbols := func() (globalsSearch, error) {"},
  {"line":952,"text":"\t\tif contextToken != nil && contextToken.Kind == ast.KindDotDotDotToken {"},
  {"line":953,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":954,"text":"\t\t}"},
  {"line":955,"text":"\t\tobjectLikeContainer := tryGetObjectLikeCompletionContainer(contextToken, position, file)"},
  {"line":956,"text":"\t\tif objectLikeContainer == nil {"},
  {"line":957,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":958,"text":"\t\t}"},
  {"line":961,"text":"\t\tcompletionKind = CompletionKindObjectPropertyDeclaration"},
  {"line":963,"text":"\t\tvar typeMembers []*ast.Symbol"},
  {"line":964,"text":"\t\tvar existingMembers []*ast.Declaration"},
  {"line":966,"text":"\t\tif objectLikeContainer.Kind == ast.KindObjectLiteralExpression {"},
  {"line":967,"text":"\t\t\tinstantiatedType := tryGetObjectLiteralContextualType(objectLikeContainer, typeChecker)"},
  {"line":970,"text":"\t\t\tif instantiatedType == nil {"},
  {"line":971,"text":"\t\t\t\tif objectLikeContainer.Flags&ast.NodeFlagsInWithStatement != 0 {"},
  {"line":972,"text":"\t\t\t\t\treturn globalsSearchFail, nil"},
  {"line":973,"text":"\t\t\t\t}"},
  {"line":974,"text":"\t\t\t\treturn globalsSearchContinue, nil"},
  {"line":975,"text":"\t\t\t}"},
  {"line":976,"text":"\t\t\tcompletionsType := typeChecker.GetContextualType(objectLikeContainer, checker.ContextFlagsIgnoreNodeInferences)"},
  {"line":977,"text":"\t\t\tt := core.IfElse(completionsType != nil, completionsType, instantiatedType)"},
  {"line":978,"text":"\t\t\tstringIndexType := typeChecker.GetStringIndexType(t)"},
  {"line":979,"text":"\t\t\tnumberIndexType := typeChecker.GetNumberIndexType(t)"},
  {"line":980,"text":"\t\t\tisNewIdentifierLocation = stringIndexType != nil || numberIndexType != nil"},
  {"line":981,"text":"\t\t\ttypeMembers = getPropertiesForObjectExpression(instantiatedType, completionsType, objectLikeContainer, typeChecker)"},
  {"line":982,"text":"\t\t\texistingMembers = objectLikeContainer.Properties()"},
  {"line":984,"text":"\t\t\tif len(typeMembers) == 0 {"},
  {"line":986,"text":"\t\t\t\tif numberIndexType == nil {"},
  {"line":987,"text":"\t\t\t\t\treturn globalsSearchContinue, nil"},
  {"line":988,"text":"\t\t\t\t}"},
  {"line":989,"text":"\t\t\t}"},
  {"line":990,"text":"\t\t} else {"},
  {"line":991,"text":"\t\t\tif objectLikeContainer.Kind != ast.KindObjectBindingPattern {"},
  {"line":992,"text":"\t\t\t\tpanic(\"Expected 'objectLikeContainer' to be an object binding pattern.\")"},
  {"line":993,"text":"\t\t\t}"},
  {"line":995,"text":"\t\t\tisNewIdentifierLocation = false"},
  {"line":996,"text":"\t\t\trootDeclaration := ast.GetRootDeclaration(objectLikeContainer.Parent)"},
  {"line":997,"text":"\t\t\tif !ast.IsVariableLike(rootDeclaration) {"},
  {"line":998,"text":"\t\t\t\tpanic(\"Root declaration is not variable-like.\")"},
  {"line":999,"text":"\t\t\t}"},
  {"line":1006,"text":"\t\t\tcanGetType := ast.HasInitializer(rootDeclaration) ||"},
  {"line":1007,"text":"\t\t\t\tast.GetTypeAnnotationNode(rootDeclaration) != nil ||"},
  {"line":1008,"text":"\t\t\t\trootDeclaration.Parent.Parent.Kind == ast.KindForOfStatement"},
  {"line":1009,"text":"\t\t\tif !canGetType && rootDeclaration.Kind == ast.KindParameter {"},
  {"line":1010,"text":"\t\t\t\tif ast.IsExpression(rootDeclaration.Parent) {"},
  {"line":1011,"text":"\t\t\t\t\tcanGetType = typeChecker.GetContextualType(rootDeclaration.Parent, checker.ContextFlagsNone) != nil"},
  {"line":1012,"text":"\t\t\t\t} else if rootDeclaration.Parent.Kind == ast.KindMethodDeclaration ||"},
  {"line":1013,"text":"\t\t\t\t\trootDeclaration.Parent.Kind == ast.KindSetAccessor {"},
  {"line":1014,"text":"\t\t\t\t\tcanGetType = ast.IsExpression(rootDeclaration.Parent.Parent) &&"},
  {"line":1015,"text":"\t\t\t\t\t\ttypeChecker.GetContextualType(rootDeclaration.Parent.Parent, checker.ContextFlagsNone) != nil"},
  {"line":1016,"text":"\t\t\t\t}"},
  {"line":1017,"text":"\t\t\t}"},
  {"line":1018,"text":"\t\t\tif canGetType {"},
  {"line":1019,"text":"\t\t\t\ttypeForObject := typeChecker.GetTypeAtLocation(objectLikeContainer)"},
  {"line":1020,"text":"\t\t\t\tif typeForObject == nil {"},
  {"line":1021,"text":"\t\t\t\t\treturn globalsSearchFail, nil"},
  {"line":1022,"text":"\t\t\t\t}"},
  {"line":1023,"text":"\t\t\t\ttypeMembers = core.Filter("},
  {"line":1024,"text":"\t\t\t\t\ttypeChecker.GetPropertiesOfType(typeForObject),"},
  {"line":1025,"text":"\t\t\t\t\tfunc(propertySymbol *ast.Symbol) bool {"},
  {"line":1026,"text":"\t\t\t\t\t\treturn typeChecker.IsPropertyAccessible("},
  {"line":1027,"text":"\t\t\t\t\t\t\tobjectLikeContainer,"},
  {"line":1028,"text":"\t\t\t\t\t\t\tfalse, /*isSuper*/"},
  {"line":1029,"text":"\t\t\t\t\t\t\tfalse, /*isWrite*/"},
  {"line":1030,"text":"\t\t\t\t\t\t\ttypeForObject,"},
  {"line":1031,"text":"\t\t\t\t\t\t\tpropertySymbol,"},
  {"line":1032,"text":"\t\t\t\t\t\t)"},
  {"line":1033,"text":"\t\t\t\t\t},"},
  {"line":1034,"text":"\t\t\t\t)"},
  {"line":1035,"text":"\t\t\t\texistingMembers = objectLikeContainer.Elements()"},
  {"line":1036,"text":"\t\t\t}"},
  {"line":1037,"text":"\t\t}"},
  {"line":1039,"text":"\t\tif len(typeMembers) > 0 {"},
  {"line":1041,"text":"\t\t\tfilteredMembers, spreadMemberNames := filterObjectMembersList("},
  {"line":1042,"text":"\t\t\t\ttypeMembers,"},
  {"line":1043,"text":"\t\t\t\tcore.CheckEachDefined(existingMembers, \"object like properties or elements should all be defined\"),"},
  {"line":1044,"text":"\t\t\t\tfile,"},
  {"line":1045,"text":"\t\t\t\tposition,"},
  {"line":1046,"text":"\t\t\t\ttypeChecker,"},
  {"line":1047,"text":"\t\t\t)"},
  {"line":1048,"text":"\t\t\tsymbols = append(symbols, filteredMembers...)"},
  {"line":1051,"text":"\t\t\ttransformObjectLiteralMembers := preferences.IncludeCompletionsWithObjectLiteralMethodSnippets.IsTrue() &&"},
  {"line":1052,"text":"\t\t\t\tobjectLikeContainer.Kind == ast.KindObjectLiteralExpression"},
  {"line":1053,"text":"\t\t\tfor _, member := range filteredMembers {"},
  {"line":1054,"text":"\t\t\t\tsymbolId := ast.GetSymbolId(member)"},
  {"line":1055,"text":"\t\t\t\tif spreadMemberNames.Has(member.Name) {"},
  {"line":1056,"text":"\t\t\t\t\tsymbolToSortTextMap[symbolId] = SortTextMemberDeclaredBySpreadAssignment"},
  {"line":1057,"text":"\t\t\t\t}"},
  {"line":1058,"text":"\t\t\t\tif member.Flags&ast.SymbolFlagsOptional != 0 {"},
  {"line":1059,"text":"\t\t\t\t\t_, ok := symbolToSortTextMap[symbolId]"},
  {"line":1060,"text":"\t\t\t\t\tif !ok {"},
  {"line":1061,"text":"\t\t\t\t\t\tsymbolToSortTextMap[symbolId] = SortTextOptionalMember"},
  {"line":1062,"text":"\t\t\t\t\t}"},
  {"line":1063,"text":"\t\t\t\t}"},
  {"line":1064,"text":"\t\t\t\tif transformObjectLiteralMembers {"},
  {"line":1066,"text":"\t\t\t\t}"},
  {"line":1067,"text":"\t\t\t}"},
  {"line":1068,"text":"\t\t}"},
  {"line":1070,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1071,"text":"\t}"},
  {"line":1073,"text":"\tshouldOfferImportCompletions := func() bool {"},
  {"line":1074,"text":"\t\tif tspath.IsDynamicFileName(file.FileName()) {"},
  {"line":1075,"text":"\t\t\treturn false"},
  {"line":1076,"text":"\t\t}"},
  {"line":1078,"text":"\t\tif importStatementCompletion != nil {"},
  {"line":1079,"text":"\t\t\treturn true"},
  {"line":1080,"text":"\t\t}"},
  {"line":1082,"text":"\t\tif preferences.IncludeCompletionsForModuleExports.IsFalse() {"},
  {"line":1083,"text":"\t\t\treturn false"},
  {"line":1084,"text":"\t\t}"},
  {"line":1086,"text":"\t\treturn true"},
  {"line":1087,"text":"\t}"},
  {"line":1090,"text":"\tcollectAutoImports := func() error {"},
  {"line":1093,"text":"\t\tif forItemResolve {"},
  {"line":1094,"text":"\t\t\treturn nil"},
  {"line":1095,"text":"\t\t}"},
  {"line":1096,"text":"\t\tif !shouldOfferImportCompletions() {"},
  {"line":1097,"text":"\t\t\treturn nil"},
  {"line":1098,"text":"\t\t}"},
  {"line":1101,"text":"\t\tvar lowerCaseTokenText string"},
  {"line":1102,"text":"\t\tusagePosition := l.createLspPosition(position, file)"},
  {"line":1103,"text":"\t\tif previousToken != nil && ast.IsIdentifier(previousToken) {"},
  {"line":1104,"text":"\t\t\tusagePosition = l.createLspPosition(scanner.GetTokenPosOfNode(previousToken, file, false /*includeJSDoc*/), file)"},
  {"line":1105,"text":"\t\t\tif !(previousToken == contextToken && importStatementCompletion != nil) {"},
  {"line":1106,"text":"\t\t\t\tlowerCaseTokenText = strings.ToLower(previousToken.Text())"},
  {"line":1107,"text":"\t\t\t}"},
  {"line":1108,"text":"\t\t}"},
  {"line":1110,"text":"\t\tview, err := l.getPreparedAutoImportView(file)"},
  {"line":1111,"text":"\t\tif err != nil {"},
  {"line":1112,"text":"\t\t\treturn err"},
  {"line":1113,"text":"\t\t}"},
  {"line":1114,"text":"\t\tif view == nil {"},
  {"line":1115,"text":"\t\t\treturn nil"},
  {"line":1116,"text":"\t\t}"},
  {"line":1118,"text":"\t\tautoImports = view.GetCompletions(ctx, lowerCaseTokenText, usagePosition, isRightOfOpenTag, isTypeOnlyLocation)"},
  {"line":1119,"text":"\t\treturn nil"},
  {"line":1120,"text":"\t}"},
  {"line":1122,"text":"\ttryGetImportCompletionSymbols := func() (globalsSearch, error) {"},
  {"line":1123,"text":"\t\tif importStatementCompletion == nil {"},
  {"line":1124,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1125,"text":"\t\t}"},
  {"line":1126,"text":"\t\tisNewIdentifierLocation = true"},
  {"line":1127,"text":"\t\tif err := collectAutoImports(); err != nil {"},
  {"line":1128,"text":"\t\t\treturn globalsSearchFail, err"},
  {"line":1129,"text":"\t\t}"},
  {"line":1130,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1131,"text":"\t}"},
  {"line":1144,"text":"\ttryGetImportOrExportClauseCompletionSymbols := func() (globalsSearch, error) {"},
  {"line":1145,"text":"\t\tif contextToken == nil {"},
  {"line":1146,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1147,"text":"\t\t}"},
  {"line":1150,"text":"\t\tvar namedImportsOrExports *ast.NamedImportsOrExports"},
  {"line":1151,"text":"\t\tif contextToken.Kind == ast.KindOpenBraceToken || contextToken.Kind == ast.KindCommaToken {"},
  {"line":1152,"text":"\t\t\tnamedImportsOrExports = core.IfElse(isNamedImportsOrExports(contextToken.Parent), contextToken.Parent, nil)"},
  {"line":1153,"text":"\t\t} else if isTypeKeywordTokenOrIdentifier(contextToken) {"},
  {"line":1154,"text":"\t\t\tnamedImportsOrExports = core.IfElse("},
  {"line":1155,"text":"\t\t\t\tisNamedImportsOrExports(contextToken.Parent.Parent),"},
  {"line":1156,"text":"\t\t\t\tcontextToken.Parent.Parent,"},
  {"line":1157,"text":"\t\t\t\tnil,"},
  {"line":1158,"text":"\t\t\t)"},
  {"line":1159,"text":"\t\t}"},
  {"line":1161,"text":"\t\tif namedImportsOrExports == nil {"},
  {"line":1162,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1163,"text":"\t\t}"},
  {"line":1166,"text":"\t\tif !isTypeKeywordTokenOrIdentifier(contextToken) {"},
  {"line":1167,"text":"\t\t\tkeywordFilters = KeywordCompletionFiltersTypeKeyword"},
  {"line":1168,"text":"\t\t}"},
  {"line":1171,"text":"\t\tmoduleSpecifier := core.IfElse("},
  {"line":1172,"text":"\t\t\tnamedImportsOrExports.Kind == ast.KindNamedImports,"},
  {"line":1173,"text":"\t\t\tnamedImportsOrExports.Parent.Parent,"},
  {"line":1174,"text":"\t\t\tnamedImportsOrExports.Parent).ModuleSpecifier()"},
  {"line":1175,"text":"\t\tif moduleSpecifier == nil {"},
  {"line":1176,"text":"\t\t\tisNewIdentifierLocation = true"},
  {"line":1177,"text":"\t\t\tif namedImportsOrExports.Kind == ast.KindNamedImports {"},
  {"line":1178,"text":"\t\t\t\treturn globalsSearchFail, nil"},
  {"line":1179,"text":"\t\t\t}"},
  {"line":1180,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1181,"text":"\t\t}"},
  {"line":1183,"text":"\t\tmoduleSpecifierSymbol := typeChecker.GetSymbolAtLocation(moduleSpecifier)"},
  {"line":1184,"text":"\t\tif moduleSpecifierSymbol == nil {"},
  {"line":1185,"text":"\t\t\tisNewIdentifierLocation = true"},
  {"line":1186,"text":"\t\t\treturn globalsSearchFail, nil"},
  {"line":1187,"text":"\t\t}"},
  {"line":1189,"text":"\t\tcompletionKind = CompletionKindMemberLike"},
  {"line":1190,"text":"\t\tisNewIdentifierLocation = false"},
  {"line":1191,"text":"\t\texports := typeChecker.GetExportsAndPropertiesOfModule(moduleSpecifierSymbol)"},
  {"line":1193,"text":"\t\texisting := collections.Set[string]{}"},
  {"line":1194,"text":"\t\tfor _, element := range namedImportsOrExports.Elements() {"},
  {"line":1195,"text":"\t\t\tif isCurrentlyEditingNode(element, file, position) {"},
  {"line":1196,"text":"\t\t\t\tcontinue"},
  {"line":1197,"text":"\t\t\t}"},
  {"line":1198,"text":"\t\t\texisting.Add(element.PropertyNameOrName().Text())"},
  {"line":1199,"text":"\t\t}"},
  {"line":1200,"text":"\t\tuniques := core.Filter(exports, func(symbol *ast.Symbol) bool {"},
  {"line":1201,"text":"\t\t\treturn ast.SymbolName(symbol) != ast.InternalSymbolNameDefault && !existing.Has(ast.SymbolName(symbol))"},
  {"line":1202,"text":"\t\t})"},
  {"line":1204,"text":"\t\tsymbols = append(symbols, uniques...)"},
  {"line":1205,"text":"\t\tif len(uniques) == 0 {"},
  {"line":1207,"text":"\t\t\tkeywordFilters = KeywordCompletionFiltersNone"},
  {"line":1208,"text":"\t\t}"},
  {"line":1209,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1210,"text":"\t}"},
  {"line":1213,"text":"\ttryGetImportAttributesCompletionSymbols := func() (globalsSearch, error) {"},
  {"line":1214,"text":"\t\tif contextToken == nil {"},
  {"line":1215,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1216,"text":"\t\t}"},
  {"line":1218,"text":"\t\tvar importAttributes *ast.Node"},
  {"line":1219,"text":"\t\tswitch contextToken.Kind {"},
  {"line":1220,"text":"\t\tcase ast.KindOpenBraceToken, ast.KindCommaToken:"},
  {"line":1221,"text":"\t\t\timportAttributes = contextToken.Parent"},
  {"line":1222,"text":"\t\tcase ast.KindColonToken:"},
  {"line":1223,"text":"\t\t\timportAttributes = contextToken.Parent.Parent"},
  {"line":1224,"text":"\t\t}"},
  {"line":1225,"text":"\t\tif importAttributes == nil || !ast.IsImportAttributes(importAttributes) {"},
  {"line":1226,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1227,"text":"\t\t}"},
  {"line":1229,"text":"\t\tvar elements []*ast.Node"},
  {"line":1230,"text":"\t\tif importAttributes.AsImportAttributes().Attributes != nil {"},
  {"line":1231,"text":"\t\t\telements = importAttributes.AsImportAttributes().Attributes.Nodes"},
  {"line":1232,"text":"\t\t}"},
  {"line":1233,"text":"\t\tattributeNames := core.Map(elements, func(el *ast.Node) string {"},
  {"line":1234,"text":"\t\t\treturn el.AsImportAttribute().Name().Text()"},
  {"line":1235,"text":"\t\t})"},
  {"line":1236,"text":"\t\texisting := collections.NewSetFromItems(attributeNames...)"},
  {"line":1237,"text":"\t\tuniques := core.Filter("},
  {"line":1238,"text":"\t\t\ttypeChecker.GetApparentProperties(typeChecker.GetTypeAtLocation(importAttributes)),"},
  {"line":1239,"text":"\t\t\tfunc(symbol *ast.Symbol) bool {"},
  {"line":1240,"text":"\t\t\t\treturn !existing.Has(ast.SymbolName(symbol))"},
  {"line":1241,"text":"\t\t\t})"},
  {"line":1242,"text":"\t\tsymbols = append(symbols, uniques...)"},
  {"line":1243,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1244,"text":"\t}"},
  {"line":1251,"text":"\ttryGetLocalNamedExportCompletionSymbols := func() (globalsSearch, error) {"},
  {"line":1252,"text":"\t\tif contextToken == nil {"},
  {"line":1253,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1254,"text":"\t\t}"},
  {"line":1255,"text":"\t\tvar namedExports *ast.NamedExportsNode"},
  {"line":1256,"text":"\t\tif contextToken.Kind == ast.KindOpenBraceToken || contextToken.Kind == ast.KindCommaToken {"},
  {"line":1257,"text":"\t\t\tnamedExports = core.IfElse(ast.IsNamedExports(contextToken.Parent), contextToken.Parent, nil)"},
  {"line":1258,"text":"\t\t}"},
  {"line":1260,"text":"\t\tif namedExports == nil {"},
  {"line":1261,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1262,"text":"\t\t}"},
  {"line":1264,"text":"\t\tlocalsContainer := ast.FindAncestor(namedExports, func(node *ast.Node) bool {"},
  {"line":1265,"text":"\t\t\treturn ast.IsSourceFile(node) || ast.IsModuleDeclaration(node)"},
  {"line":1266,"text":"\t\t})"},
  {"line":1267,"text":"\t\tcompletionKind = CompletionKindNone"},
  {"line":1268,"text":"\t\tisNewIdentifierLocation = false"},
  {"line":1269,"text":"\t\tlocalSymbol := localsContainer.Symbol()"},
  {"line":1270,"text":"\t\tvar localExports ast.SymbolTable"},
  {"line":1271,"text":"\t\tif localSymbol != nil {"},
  {"line":1272,"text":"\t\t\tlocalExports = localSymbol.Exports"},
  {"line":1273,"text":"\t\t}"},
  {"line":1274,"text":"\t\tfor name, symbol := range localsContainer.Locals() {"},
  {"line":1275,"text":"\t\t\tsymbols = append(symbols, symbol)"},
  {"line":1276,"text":"\t\t\tif _, ok := localExports[name]; ok {"},
  {"line":1277,"text":"\t\t\t\tsymbolId := ast.GetSymbolId(symbol)"},
  {"line":1278,"text":"\t\t\t\tsymbolToSortTextMap[symbolId] = SortTextOptionalMember"},
  {"line":1279,"text":"\t\t\t}"},
  {"line":1280,"text":"\t\t}"},
  {"line":1282,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1283,"text":"\t}"},
  {"line":1285,"text":"\ttryGetConstructorCompletion := func() (globalsSearch, error) {"},
  {"line":1286,"text":"\t\tif tryGetConstructorLikeCompletionContainer(contextToken) == nil {"},
  {"line":1287,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1288,"text":"\t\t}"},
  {"line":1291,"text":"\t\tcompletionKind = CompletionKindNone"},
  {"line":1293,"text":"\t\tisNewIdentifierLocation = true"},
  {"line":1295,"text":"\t\tkeywordFilters = KeywordCompletionFiltersConstructorParameterKeywords"},
  {"line":1296,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1297,"text":"\t}"},
  {"line":1301,"text":"\ttryGetClassLikeCompletionSymbols := func() (globalsSearch, error) {"},
  {"line":1302,"text":"\t\tdecl := tryGetObjectTypeDeclarationCompletionContainer(file, contextToken, location, position)"},
  {"line":1303,"text":"\t\tif decl == nil {"},
  {"line":1304,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1305,"text":"\t\t}"},
  {"line":1308,"text":"\t\tcompletionKind = CompletionKindMemberLike"},
  {"line":1310,"text":"\t\tisNewIdentifierLocation = true"},
  {"line":1311,"text":"\t\tif contextToken.Kind == ast.KindAsteriskToken {"},
  {"line":1312,"text":"\t\t\tkeywordFilters = KeywordCompletionFiltersNone"},
  {"line":1313,"text":"\t\t} else if ast.IsClassLike(decl) {"},
  {"line":1314,"text":"\t\t\tkeywordFilters = KeywordCompletionFiltersClassElementKeywords"},
  {"line":1315,"text":"\t\t} else {"},
  {"line":1316,"text":"\t\t\tkeywordFilters = KeywordCompletionFiltersInterfaceElementKeywords"},
  {"line":1317,"text":"\t\t}"},
  {"line":1320,"text":"\t\tif !ast.IsClassLike(decl) {"},
  {"line":1321,"text":"\t\t\treturn globalsSearchSuccess, nil"},
  {"line":1322,"text":"\t\t}"},
  {"line":1324,"text":"\t\tvar classElement *ast.Node"},
  {"line":1325,"text":"\t\tif contextToken.Kind == ast.KindSemicolonToken {"},
  {"line":1326,"text":"\t\t\tclassElement = contextToken.Parent.Parent"},
  {"line":1327,"text":"\t\t} else {"},
  {"line":1328,"text":"\t\t\tclassElement = contextToken.Parent"},
  {"line":1329,"text":"\t\t}"},
  {"line":1330,"text":"\t\tvar classElementModifierFlags ast.ModifierFlags"},
  {"line":1331,"text":"\t\tif ast.IsClassElement(classElement) {"},
  {"line":1332,"text":"\t\t\tclassElementModifierFlags = classElement.ModifierFlags()"},
  {"line":1333,"text":"\t\t}"},
  {"line":1335,"text":"\t\tif contextToken.Kind == ast.KindIdentifier && !isCurrentlyEditingNode(contextToken, file, position) {"},
  {"line":1336,"text":"\t\t\tswitch contextToken.Text() {"},
  {"line":1337,"text":"\t\t\tcase \"private\":"},
  {"line":1338,"text":"\t\t\t\tclassElementModifierFlags |= ast.ModifierFlagsPrivate"},
  {"line":1339,"text":"\t\t\tcase \"static\":"},
  {"line":1340,"text":"\t\t\t\tclassElementModifierFlags |= ast.ModifierFlagsStatic"},
  {"line":1341,"text":"\t\t\tcase \"override\":"},
  {"line":1342,"text":"\t\t\t\tclassElementModifierFlags |= ast.ModifierFlagsOverride"},
  {"line":1343,"text":"\t\t\t}"},
  {"line":1344,"text":"\t\t}"},
  {"line":1345,"text":"\t\tif ast.IsClassStaticBlockDeclaration(classElement) {"},
  {"line":1346,"text":"\t\t\tclassElementModifierFlags |= ast.ModifierFlagsStatic"},
  {"line":1347,"text":"\t\t}"},
  {"line":1350,"text":"\t\tif classElementModifierFlags&ast.ModifierFlagsPrivate == 0 {"},
  {"line":1352,"text":"\t\t\tvar baseTypeNodes []*ast.Node"},
  {"line":1353,"text":"\t\t\tif ast.IsClassLike(decl) && classElementModifierFlags&ast.ModifierFlagsOverride != 0 {"},
  {"line":1354,"text":"\t\t\t\tbaseTypeNodes = core.SingleElementSlice(ast.GetClassExtendsHeritageElement(decl))"},
  {"line":1355,"text":"\t\t\t} else {"},
  {"line":1356,"text":"\t\t\t\tbaseTypeNodes = getAllSuperTypeNodes(decl)"},
  {"line":1357,"text":"\t\t\t}"},
  {"line":1358,"text":"\t\t\tvar baseSymbols []*ast.Symbol"},
  {"line":1359,"text":"\t\t\tfor _, baseTypeNode := range baseTypeNodes {"},
  {"line":1360,"text":"\t\t\t\tt := typeChecker.GetTypeAtLocation(baseTypeNode)"},
  {"line":1361,"text":"\t\t\t\tif classElementModifierFlags&ast.ModifierFlagsStatic != 0 {"},
  {"line":1362,"text":"\t\t\t\t\tif t.Symbol() != nil {"},
  {"line":1363,"text":"\t\t\t\t\t\tbaseSymbols = append("},
  {"line":1364,"text":"\t\t\t\t\t\t\tbaseSymbols,"},
  {"line":1365,"text":"\t\t\t\t\t\t\ttypeChecker.GetPropertiesOfType(typeChecker.GetTypeOfSymbolAtLocation(t.Symbol(), decl))...)"},
  {"line":1366,"text":"\t\t\t\t\t}"},
  {"line":1367,"text":"\t\t\t\t} else if t != nil {"},
  {"line":1368,"text":"\t\t\t\t\tbaseSymbols = append(baseSymbols, typeChecker.GetPropertiesOfType(t)...)"},
  {"line":1369,"text":"\t\t\t\t}"},
  {"line":1370,"text":"\t\t\t}"},
  {"line":1372,"text":"\t\t\tsymbols = append(symbols,"},
  {"line":1373,"text":"\t\t\t\tfilterClassMembersList(baseSymbols, decl.Members(), classElementModifierFlags, file, position)...)"},
  {"line":1374,"text":"\t\t\tfor index, symbol := range symbols {"},
  {"line":1375,"text":"\t\t\t\tdeclaration := symbol.ValueDeclaration"},
  {"line":1376,"text":"\t\t\t\tif declaration != nil && ast.IsClassElement(declaration) &&"},
  {"line":1377,"text":"\t\t\t\t\tdeclaration.Name() != nil &&"},
  {"line":1378,"text":"\t\t\t\t\tast.IsComputedPropertyName(declaration.Name()) {"},
  {"line":1379,"text":"\t\t\t\t\torigin := &symbolOriginInfo{"},
  {"line":1380,"text":"\t\t\t\t\t\tkind: symbolOriginInfoKindComputedPropertyName,"},
  {"line":1381,"text":"\t\t\t\t\t\tdata: &symbolOriginInfoComputedPropertyName{symbolName: typeChecker.SymbolToString(symbol)},"},
  {"line":1382,"text":"\t\t\t\t\t}"},
  {"line":1383,"text":"\t\t\t\t\tsymbolToOriginInfoMap[index] = origin"},
  {"line":1384,"text":"\t\t\t\t}"},
  {"line":1385,"text":"\t\t\t}"},
  {"line":1386,"text":"\t\t}"},
  {"line":1388,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1389,"text":"\t}"},
  {"line":1391,"text":"\ttryGetJsxCompletionSymbols := func() (globalsSearch, error) {"},
  {"line":1392,"text":"\t\tjsxContainer := tryGetContainingJsxElement(contextToken, file)"},
  {"line":1393,"text":"\t\tif jsxContainer == nil {"},
  {"line":1394,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1395,"text":"\t\t}"},
  {"line":1397,"text":"\t\tattrsType := typeChecker.GetContextualType(jsxContainer.Attributes(), checker.ContextFlagsNone)"},
  {"line":1398,"text":"\t\tif attrsType == nil {"},
  {"line":1399,"text":"\t\t\treturn globalsSearchContinue, nil"},
  {"line":1400,"text":"\t\t}"},
  {"line":1401,"text":"\t\tcompletionsType := typeChecker.GetContextualType(jsxContainer.Attributes(), checker.ContextFlagsIgnoreNodeInferences)"},
  {"line":1402,"text":"\t\tfilteredSymbols, spreadMemberNames := filterJsxAttributes("},
  {"line":1403,"text":"\t\t\tgetPropertiesForObjectExpression(attrsType, completionsType, jsxContainer.Attributes(), typeChecker),"},
  {"line":1404,"text":"\t\t\tjsxContainer.Attributes().Properties(),"},
  {"line":1405,"text":"\t\t\tfile,"},
  {"line":1406,"text":"\t\t\tposition,"},
  {"line":1407,"text":"\t\t\ttypeChecker,"},
  {"line":1408,"text":"\t\t)"},
  {"line":1410,"text":"\t\tsymbols = append(symbols, filteredSymbols...)"},
  {"line":1412,"text":"\t\tfor _, symbol := range filteredSymbols {"},
  {"line":1413,"text":"\t\t\tsymbolId := ast.GetSymbolId(symbol)"},
  {"line":1414,"text":"\t\t\tif spreadMemberNames.Has(ast.SymbolName(symbol)) {"},
  {"line":1415,"text":"\t\t\t\tsymbolToSortTextMap[symbolId] = SortTextMemberDeclaredBySpreadAssignment"},
  {"line":1416,"text":"\t\t\t}"},
  {"line":1417,"text":"\t\t\tif symbol.Flags&ast.SymbolFlagsOptional != 0 {"},
  {"line":1418,"text":"\t\t\t\t_, ok := symbolToSortTextMap[symbolId]"},
  {"line":1419,"text":"\t\t\t\tif !ok {"},
  {"line":1420,"text":"\t\t\t\t\tsymbolToSortTextMap[symbolId] = SortTextOptionalMember"},
  {"line":1421,"text":"\t\t\t\t}"},
  {"line":1422,"text":"\t\t\t}"},
  {"line":1423,"text":"\t\t}"},
  {"line":1425,"text":"\t\tcompletionKind = CompletionKindMemberLike"},
  {"line":1426,"text":"\t\tisNewIdentifierLocation = false"},
  {"line":1427,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1428,"text":"\t}"},
  {"line":1430,"text":"\tgetGlobalCompletions := func() (globalsSearch, error) {"},
  {"line":1431,"text":"\t\tif tryGetFunctionLikeBodyCompletionContainer(contextToken) != nil {"},
  {"line":1432,"text":"\t\t\tkeywordFilters = KeywordCompletionFiltersFunctionLikeBodyKeywords"},
  {"line":1433,"text":"\t\t} else {"},
  {"line":1434,"text":"\t\t\tkeywordFilters = KeywordCompletionFiltersAll"},
  {"line":1435,"text":"\t\t}"},
  {"line":1437,"text":"\t\tcompletionKind = CompletionKindGlobal"},
  {"line":1438,"text":"\t\tisNewIdentifierLocation, defaultCommitCharacters = computeCommitCharactersAndIsNewIdentifier(contextToken, file, position)"},
  {"line":1440,"text":"\t\tif previousToken != contextToken {"},
  {"line":1441,"text":"\t\t\tif previousToken == nil {"},
  {"line":1442,"text":"\t\t\t\tpanic(\"Expected 'contextToken' to be defined when different from 'previousToken'.\")"},
  {"line":1443,"text":"\t\t\t}"},
  {"line":1444,"text":"\t\t}"},
  {"line":1471,"text":"\t\tvar adjustedPosition int"},
  {"line":1472,"text":"\t\tif previousToken != contextToken {"},
  {"line":1473,"text":"\t\t\tadjustedPosition = astnav.GetStartOfNode(previousToken, file, false /*includeJSDoc*/)"},
  {"line":1474,"text":"\t\t} else {"},
  {"line":1475,"text":"\t\t\tadjustedPosition = position"},
  {"line":1476,"text":"\t\t}"},
  {"line":1478,"text":"\t\tscopeNode := getScopeNode(contextToken, adjustedPosition, file)"},
  {"line":1479,"text":"\t\tif scopeNode == nil {"},
  {"line":1480,"text":"\t\t\tscopeNode = file.AsNode()"},
  {"line":1481,"text":"\t\t}"},
  {"line":1482,"text":"\t\tisInSnippetScope = isSnippetScope(scopeNode)"},
  {"line":1484,"text":"\t\tsymbolMeanings := core.IfElse(isTypeOnlyLocation, ast.SymbolFlagsNone, ast.SymbolFlagsValue) |"},
  {"line":1485,"text":"\t\t\tast.SymbolFlagsType | ast.SymbolFlagsNamespace | ast.SymbolFlagsAlias"},
  {"line":1486,"text":"\t\ttypeOnlyAliasNeedsPromotion := previousToken != nil && !ast.IsValidTypeOnlyAliasUseSite(previousToken)"},
  {"line":1488,"text":"\t\tsymbols = append(symbols, typeChecker.GetSymbolsInScope(scopeNode, symbolMeanings)...)"},
  {"line":1489,"text":"\t\tcore.CheckEachDefined(symbols, \"getSymbolsInScope() should all be defined\")"},
  {"line":1490,"text":"\t\tfor index, symbol := range symbols {"},
  {"line":1491,"text":"\t\t\tsymbolId := ast.GetSymbolId(symbol)"},
  {"line":1492,"text":"\t\t\tif !typeChecker.IsArgumentsSymbol(symbol) &&"},
  {"line":1493,"text":"\t\t\t\t!core.Some(symbol.Declarations, func(decl *ast.Declaration) bool {"},
  {"line":1494,"text":"\t\t\t\t\treturn ast.GetSourceFileOfNode(decl) == file"},
  {"line":1495,"text":"\t\t\t\t}) {"},
  {"line":1496,"text":"\t\t\t\tsymbolToSortTextMap[symbolId] = SortTextGlobalsOrKeywords"},
  {"line":1497,"text":"\t\t\t}"},
  {"line":1498,"text":"\t\t\tif typeOnlyAliasNeedsPromotion && symbol.Flags&ast.SymbolFlagsValue == 0 {"},
  {"line":1499,"text":"\t\t\t\ttypeOnlyAliasDeclaration := core.Find(symbol.Declarations, ast.IsTypeOnlyImportDeclaration)"},
  {"line":1500,"text":"\t\t\t\tif typeOnlyAliasDeclaration != nil {"},
  {"line":1501,"text":"\t\t\t\t\torigin := &symbolOriginInfo{"},
  {"line":1502,"text":"\t\t\t\t\t\tkind: symbolOriginInfoKindTypeOnlyAlias,"},
  {"line":1503,"text":"\t\t\t\t\t\tdata: &symbolOriginInfoTypeOnlyAlias{declaration: typeOnlyAliasDeclaration},"},
  {"line":1504,"text":"\t\t\t\t\t}"},
  {"line":1505,"text":"\t\t\t\t\tsymbolToOriginInfoMap[index] = origin"},
  {"line":1506,"text":"\t\t\t\t}"},
  {"line":1507,"text":"\t\t\t}"},
  {"line":1508,"text":"\t\t}"},
  {"line":1511,"text":"\t\tif scopeNode.Kind != ast.KindSourceFile {"},
  {"line":1512,"text":"\t\t\tthisType := typeChecker.TryGetThisTypeAtEx("},
  {"line":1513,"text":"\t\t\t\tscopeNode,"},
  {"line":1514,"text":"\t\t\t\tfalse, /*includeGlobalThis*/"},
  {"line":1515,"text":"\t\t\t\tcore.IfElse(ast.IsClassLike(scopeNode.Parent), scopeNode, nil))"},
  {"line":1516,"text":"\t\t\tif thisType != nil && !isProbablyGlobalType(thisType, file, typeChecker) {"},
  {"line":1517,"text":"\t\t\t\tfor _, symbol := range getPropertiesForCompletion(thisType, typeChecker) {"},
  {"line":1518,"text":"\t\t\t\t\tsymbolId := ast.GetSymbolId(symbol)"},
  {"line":1519,"text":"\t\t\t\t\tsymbols = append(symbols, symbol)"},
  {"line":1520,"text":"\t\t\t\t\tsymbolToOriginInfoMap[len(symbols)-1] = &symbolOriginInfo{kind: symbolOriginInfoKindThisType}"},
  {"line":1521,"text":"\t\t\t\t\tsymbolToSortTextMap[symbolId] = SortTextSuggestedClassMembers"},
  {"line":1522,"text":"\t\t\t\t}"},
  {"line":1523,"text":"\t\t\t}"},
  {"line":1524,"text":"\t\t}"},
  {"line":1526,"text":"\t\tif err := collectAutoImports(); err != nil {"},
  {"line":1527,"text":"\t\t\treturn globalsSearchFail, err"},
  {"line":1528,"text":"\t\t}"},
  {"line":1529,"text":"\t\tif isTypeOnlyLocation {"},
  {"line":1530,"text":"\t\t\tif contextToken != nil && ast.IsAssertionExpression(contextToken.Parent) {"},
  {"line":1531,"text":"\t\t\t\tkeywordFilters = KeywordCompletionFiltersTypeAssertionKeywords"},
  {"line":1532,"text":"\t\t\t} else {"},
  {"line":1533,"text":"\t\t\t\tkeywordFilters = KeywordCompletionFiltersTypeKeywords"},
  {"line":1534,"text":"\t\t\t}"},
  {"line":1535,"text":"\t\t}"},
  {"line":1537,"text":"\t\treturn globalsSearchSuccess, nil"},
  {"line":1538,"text":"\t}"},
  {"line":1540,"text":"\ttryGetGlobalSymbols := func() (bool, error) {"},
  {"line":1541,"text":"\t\tvar result globalsSearch"},
  {"line":1542,"text":"\t\tvar err error"},
  {"line":1543,"text":"\t\tglobalSearchFuncs := []func() (globalsSearch, error){"},
  {"line":1544,"text":"\t\t\ttryGetObjectTypeLiteralInTypeArgumentCompletionSymbols,"},
  {"line":1545,"text":"\t\t\ttryGetObjectLikeCompletionSymbols,"},
  {"line":1546,"text":"\t\t\ttryGetImportCompletionSymbols,"},
  {"line":1547,"text":"\t\t\ttryGetImportOrExportClauseCompletionSymbols,"},
  {"line":1548,"text":"\t\t\ttryGetImportAttributesCompletionSymbols,"},
  {"line":1549,"text":"\t\t\ttryGetLocalNamedExportCompletionSymbols,"},
  {"line":1550,"text":"\t\t\ttryGetConstructorCompletion,"},
  {"line":1551,"text":"\t\t\ttryGetClassLikeCompletionSymbols,"},
  {"line":1552,"text":"\t\t\ttryGetJsxCompletionSymbols,"},
  {"line":1553,"text":"\t\t\tgetGlobalCompletions,"},
  {"line":1554,"text":"\t\t}"},
  {"line":1555,"text":"\t\tfor _, globalSearchFunc := range globalSearchFuncs {"},
  {"line":1556,"text":"\t\t\tresult, err = globalSearchFunc()"},
  {"line":1557,"text":"\t\t\tif err != nil {"},
  {"line":1558,"text":"\t\t\t\treturn false, err"},
  {"line":1559,"text":"\t\t\t}"},
  {"line":1560,"text":"\t\t\tif result != globalsSearchContinue {"},
  {"line":1561,"text":"\t\t\t\tbreak"},
  {"line":1562,"text":"\t\t\t}"},
  {"line":1563,"text":"\t\t}"},
  {"line":1564,"text":"\t\treturn result == globalsSearchSuccess, nil"},
  {"line":1565,"text":"\t}"},
  {"line":1567,"text":"\tif isRightOfDot || isRightOfQuestionDot {"},
  {"line":1568,"text":"\t\tgetTypeScriptMemberSymbols()"},
  {"line":1569,"text":"\t} else if isRightOfOpenTag {"},
  {"line":1570,"text":"\t\tsymbols = typeChecker.GetJsxIntrinsicTagNamesAt(location)"},
  {"line":1571,"text":"\t\tcore.CheckEachDefined(symbols, \"GetJsxIntrinsicTagNamesAt() should all be defined\")"},
  {"line":1572,"text":"\t\tif _, err := tryGetGlobalSymbols(); err != nil {"},
  {"line":1573,"text":"\t\t\treturn nil, err"},
  {"line":1574,"text":"\t\t}"},
  {"line":1575,"text":"\t\tcompletionKind = CompletionKindGlobal"},
  {"line":1576,"text":"\t\tkeywordFilters = KeywordCompletionFiltersNone"},
  {"line":1577,"text":"\t} else if isStartingCloseTag {"},
  {"line":1578,"text":"\t\ttagName := contextToken.Parent.Parent.AsJsxElement().OpeningElement.TagName()"},
  {"line":1579,"text":"\t\ttagSymbol := typeChecker.GetSymbolAtLocation(tagName)"},
  {"line":1580,"text":"\t\tif tagSymbol != nil {"},
  {"line":1581,"text":"\t\t\tsymbols = []*ast.Symbol{tagSymbol}"},
  {"line":1582,"text":"\t\t}"},
  {"line":1583,"text":"\t\tcompletionKind = CompletionKindGlobal"},
  {"line":1584,"text":"\t\tkeywordFilters = KeywordCompletionFiltersNone"},
  {"line":1585,"text":"\t} else {"},
  {"line":1589,"text":"\t\tif ok, err := tryGetGlobalSymbols(); !ok {"},
  {"line":1590,"text":"\t\t\tif err != nil {"},
  {"line":1591,"text":"\t\t\t\treturn nil, err"},
  {"line":1592,"text":"\t\t\t}"},
  {"line":1593,"text":"\t\t\tif keywordFilters != KeywordCompletionFiltersNone {"},
  {"line":1594,"text":"\t\t\t\treturn keywordCompletionData(keywordFilters, isJSOnlyLocation, isNewIdentifierLocation), nil"},
  {"line":1595,"text":"\t\t\t}"},
  {"line":1596,"text":"\t\t\treturn nil, nil"},
  {"line":1597,"text":"\t\t}"},
  {"line":1598,"text":"\t}"},
  {"line":1600,"text":"\tvar contextualTypeOrConstraint *checker.Type"},
  {"line":1601,"text":"\tif previousToken != nil {"},
  {"line":1602,"text":"\t\tcontextualTypeOrConstraint = getContextualType(previousToken, position, file, typeChecker)"},
  {"line":1603,"text":"\t\tif contextualTypeOrConstraint == nil {"},
  {"line":1604,"text":"\t\t\tcontextualTypeOrConstraint = getConstraintOfTypeArgumentProperty(previousToken, typeChecker)"},
  {"line":1605,"text":"\t\t}"},
  {"line":1606,"text":"\t}"},
  {"line":1610,"text":"\tisLiteralExpected := !(previousToken != nil && ast.IsStringLiteralLike(previousToken)) && !isJsxIdentifierExpected"},
  {"line":1611,"text":"\tvar literals []literalValue"},
  {"line":1612,"text":"\tif isLiteralExpected {"},
  {"line":1613,"text":"\t\tvar types []*checker.Type"},
  {"line":1614,"text":"\t\tif contextualTypeOrConstraint != nil && contextualTypeOrConstraint.IsUnion() {"},
  {"line":1615,"text":"\t\t\ttypes = contextualTypeOrConstraint.Types()"},
  {"line":1616,"text":"\t\t} else if contextualTypeOrConstraint != nil {"},
  {"line":1617,"text":"\t\t\ttypes = []*checker.Type{contextualTypeOrConstraint}"},
  {"line":1618,"text":"\t\t}"},
  {"line":1619,"text":"\t\tliterals = core.MapNonNil(types, func(t *checker.Type) literalValue {"},
  {"line":1620,"text":"\t\t\tif isLiteral(t) && !t.IsEnumLiteral() {"},
  {"line":1621,"text":"\t\t\t\treturn t.AsLiteralType().Value()"},
  {"line":1622,"text":"\t\t\t}"},
  {"line":1623,"text":"\t\t\treturn nil"},
  {"line":1624,"text":"\t\t})"},
  {"line":1625,"text":"\t}"},
  {"line":1627,"text":"\tvar recommendedCompletion *ast.Symbol"},
  {"line":1628,"text":"\tif previousToken != nil && contextualTypeOrConstraint != nil {"},
  {"line":1629,"text":"\t\trecommendedCompletion = getRecommendedCompletion(previousToken, contextualTypeOrConstraint, typeChecker)"},
  {"line":1630,"text":"\t}"},
  {"line":1632,"text":"\tif defaultCommitCharacters == nil {"},
  {"line":1633,"text":"\t\tdefaultCommitCharacters = getDefaultCommitCharacters(isNewIdentifierLocation)"},
  {"line":1634,"text":"\t}"},
  {"line":1636,"text":"\treturn &completionDataData{"},
  {"line":1637,"text":"\t\tsymbols:                      symbols,"},
  {"line":1638,"text":"\t\tautoImports:                  autoImports,"},
  {"line":1639,"text":"\t\tcompletionKind:               completionKind,"},
  {"line":1640,"text":"\t\tisInSnippetScope:             isInSnippetScope,"},
  {"line":1641,"text":"\t\tpropertyAccessToConvert:      propertyAccessToConvert,"},
  {"line":1642,"text":"\t\tisNewIdentifierLocation:      isNewIdentifierLocation,"},
  {"line":1643,"text":"\t\tlocation:                     location,"},
  {"line":1644,"text":"\t\tkeywordFilters:               keywordFilters,"},
  {"line":1645,"text":"\t\tliterals:                     literals,"},
  {"line":1646,"text":"\t\tsymbolToOriginInfoMap:        symbolToOriginInfoMap,"},
  {"line":1647,"text":"\t\tsymbolToSortTextMap:          symbolToSortTextMap,"},
  {"line":1648,"text":"\t\trecommendedCompletion:        recommendedCompletion,"},
  {"line":1649,"text":"\t\tpreviousToken:                previousToken,"},
  {"line":1650,"text":"\t\tcontextToken:                 contextToken,"},
  {"line":1651,"text":"\t\tjsxInitializer:               jsxInitializer,"},
  {"line":1652,"text":"\t\tinsideJSDocTagTypeExpression: insideJSDocTagTypeExpression,"},
  {"line":1653,"text":"\t\tisTypeOnlyLocation:           isTypeOnlyLocation,"},
  {"line":1654,"text":"\t\tisJsxIdentifierExpected:      isJsxIdentifierExpected,"},
  {"line":1655,"text":"\t\tisRightOfOpenTag:             isRightOfOpenTag,"},
  {"line":1656,"text":"\t\tisRightOfDotOrQuestionDot:    isRightOfDot || isRightOfQuestionDot,"},
  {"line":1657,"text":"\t\timportStatementCompletion:    importStatementCompletion,"},
  {"line":1658,"text":"\t\thasUnresolvedAutoImports:     hasUnresolvedAutoImports,"},
  {"line":1659,"text":"\t\tdefaultCommitCharacters:      defaultCommitCharacters,"},
  {"line":1660,"text":"\t}, nil"},
  {"line":1661,"text":"}"},
  {"line":1663,"text":"func keywordCompletionData("},
  {"line":1664,"text":"\tkeywordFilters KeywordCompletionFilters,"},
  {"line":1665,"text":"\tfilterOutTSOnlyKeywords bool,"},
  {"line":1666,"text":"\tisNewIdentifierLocation bool,"},
  {"line":1667,"text":") *completionDataKeyword {"},
  {"line":1668,"text":"\treturn &completionDataKeyword{"},
  {"line":1669,"text":"\t\tkeywordCompletions:      getKeywordCompletions(keywordFilters, filterOutTSOnlyKeywords),"},
  {"line":1670,"text":"\t\tisNewIdentifierLocation: isNewIdentifierLocation,"},
  {"line":1671,"text":"\t}"},
  {"line":1672,"text":"}"},
  {"line":1674,"text":"func getDefaultCommitCharacters(isNewIdentifierLocation bool) []string {"},
  {"line":1675,"text":"\tif isNewIdentifierLocation {"},
  {"line":1676,"text":"\t\treturn []string{}"},
  {"line":1677,"text":"\t}"},
  {"line":1678,"text":"\treturn slices.Clone(allCommitCharacters)"},
  {"line":1679,"text":"}"},
  {"line":1681,"text":"func (l *LanguageService) completionInfoFromData("},
  {"line":1682,"text":"\tctx context.Context,"},
  {"line":1683,"text":"\ttypeChecker *checker.Checker,"},
  {"line":1684,"text":"\tfile *ast.SourceFile,"},
  {"line":1685,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":1686,"text":"\tdata *completionDataData,"},
  {"line":1687,"text":"\tposition int,"},
  {"line":1688,"text":"\toptionalReplacementSpan *lsproto.Range,"},
  {"line":1689,"text":") (*lsproto.CompletionList, error) {"},
  {"line":1690,"text":"\tkeywordFilters := data.keywordFilters"},
  {"line":1691,"text":"\tisNewIdentifierLocation := data.isNewIdentifierLocation"},
  {"line":1692,"text":"\tcontextToken := data.contextToken"},
  {"line":1693,"text":"\tliterals := data.literals"},
  {"line":1694,"text":"\tpreferences := l.UserPreferences()"},
  {"line":1697,"text":"\tif file.LanguageVariant == core.LanguageVariantJSX {"},
  {"line":1698,"text":"\t\tlist := l.getJsxClosingTagCompletion(ctx, data.location, file, position)"},
  {"line":1699,"text":"\t\tif list != nil {"},
  {"line":1700,"text":"\t\t\treturn list, nil"},
  {"line":1701,"text":"\t\t}"},
  {"line":1702,"text":"\t}"},
  {"line":1706,"text":"\tcaseClause := ast.FindAncestor(contextToken, ast.IsCaseClause)"},
  {"line":1707,"text":"\tif caseClause != nil &&"},
  {"line":1708,"text":"\t\t(contextToken.Kind == ast.KindCaseKeyword ||"},
  {"line":1709,"text":"\t\t\tast.IsNodeDescendantOf(contextToken, caseClause.Expression())) {"},
  {"line":1710,"text":"\t\ttracker := newCaseClauseTracker(typeChecker, caseClause.Parent.AsCaseBlock().Clauses.Nodes)"},
  {"line":1711,"text":"\t\tliterals = core.Filter(literals, func(literal literalValue) bool {"},
  {"line":1712,"text":"\t\t\treturn !tracker.hasValue(literal)"},
  {"line":1713,"text":"\t\t})"},
  {"line":1714,"text":"\t\tdata.symbols = core.Filter(data.symbols, func(symbol *ast.Symbol) bool {"},
  {"line":1715,"text":"\t\t\tif symbol.ValueDeclaration != nil && ast.IsEnumMember(symbol.ValueDeclaration) {"},
  {"line":1716,"text":"\t\t\t\tvalue := typeChecker.GetConstantValue(symbol.ValueDeclaration)"},
  {"line":1717,"text":"\t\t\t\tif value != nil && tracker.hasValue(value) {"},
  {"line":1718,"text":"\t\t\t\t\treturn false"},
  {"line":1719,"text":"\t\t\t\t}"},
  {"line":1720,"text":"\t\t\t}"},
  {"line":1721,"text":"\t\t\treturn true"},
  {"line":1722,"text":"\t\t})"},
  {"line":1723,"text":"\t}"},
  {"line":1725,"text":"\tisChecked := isCheckedFile(file, compilerOptions)"},
  {"line":1726,"text":"\tif isChecked && !isNewIdentifierLocation && len(data.symbols) == 0 && keywordFilters == KeywordCompletionFiltersNone {"},
  {"line":1727,"text":"\t\treturn nil, nil"},
  {"line":1728,"text":"\t}"},
  {"line":1730,"text":"\tuniqueNames, sortedEntries := l.getCompletionEntriesFromSymbols("},
  {"line":1731,"text":"\t\tctx,"},
  {"line":1732,"text":"\t\ttypeChecker,"},
  {"line":1733,"text":"\t\tdata,"},
  {"line":1734,"text":"\t\tnil, /*replacementToken*/"},
  {"line":1735,"text":"\t\tposition,"},
  {"line":1736,"text":"\t\tfile,"},
  {"line":1737,"text":"\t\tcompilerOptions,"},
  {"line":1738,"text":"\t)"},
  {"line":1740,"text":"\tif data.keywordFilters != KeywordCompletionFiltersNone {"},
  {"line":1741,"text":"\t\tkeywordCompletions := getKeywordCompletions(data.keywordFilters, !data.insideJSDocTagTypeExpression && ast.IsSourceFileJS(file))"},
  {"line":1742,"text":"\t\tfor _, keywordEntry := range keywordCompletions {"},
  {"line":1743,"text":"\t\t\tif data.isTypeOnlyLocation && isTypeKeyword(scanner.StringToToken(keywordEntry.Label)) ||"},
  {"line":1744,"text":"\t\t\t\t!data.isTypeOnlyLocation && isContextualKeywordInAutoImportableExpressionSpace(keywordEntry.Label) ||"},
  {"line":1745,"text":"\t\t\t\t!uniqueNames.Has(keywordEntry.Label) {"},
  {"line":1746,"text":"\t\t\t\tuniqueNames.Add(keywordEntry.Label)"},
  {"line":1747,"text":"\t\t\t\tsortedEntries = append(sortedEntries, keywordEntry)"},
  {"line":1748,"text":"\t\t\t}"},
  {"line":1749,"text":"\t\t}"},
  {"line":1750,"text":"\t}"},
  {"line":1752,"text":"\tfor _, keywordEntry := range getContextualKeywords(file, contextToken, position) {"},
  {"line":1753,"text":"\t\tif !uniqueNames.Has(keywordEntry.Label) {"},
  {"line":1754,"text":"\t\t\tuniqueNames.Add(keywordEntry.Label)"},
  {"line":1755,"text":"\t\t\tsortedEntries = append(sortedEntries, keywordEntry)"},
  {"line":1756,"text":"\t\t}"},
  {"line":1757,"text":"\t}"},
  {"line":1759,"text":"\tfor _, literal := range literals {"},
  {"line":1760,"text":"\t\tliteralEntry := createCompletionItemForLiteral(file, preferences, literal)"},
  {"line":1761,"text":"\t\tuniqueNames.Add(literalEntry.Label)"},
  {"line":1762,"text":"\t\tsortedEntries = append(sortedEntries, literalEntry)"},
  {"line":1763,"text":"\t}"},
  {"line":1765,"text":"\tif !isChecked {"},
  {"line":1766,"text":"\t\tsortedEntries = l.getJSCompletionEntries("},
  {"line":1767,"text":"\t\t\tctx,"},
  {"line":1768,"text":"\t\t\tfile,"},
  {"line":1769,"text":"\t\t\tposition,"},
  {"line":1770,"text":"\t\t\t&uniqueNames,"},
  {"line":1771,"text":"\t\t\tsortedEntries,"},
  {"line":1772,"text":"\t\t)"},
  {"line":1773,"text":"\t}"},
  {"line":1775,"text":"\tif contextToken != nil && !data.isRightOfOpenTag && !data.isRightOfDotOrQuestionDot {"},
  {"line":1776,"text":"\t\tif caseBlock := ast.FindAncestorKind(contextToken, ast.KindCaseBlock); caseBlock != nil {"},
  {"line":1777,"text":"\t\t\tcasesItem, err := l.getExhaustiveCaseSnippets("},
  {"line":1778,"text":"\t\t\t\tctx,"},
  {"line":1779,"text":"\t\t\t\tcaseBlock.AsCaseBlock(),"},
  {"line":1780,"text":"\t\t\t\tfile,"},
  {"line":1781,"text":"\t\t\t\tposition,"},
  {"line":1782,"text":"\t\t\t\tcompilerOptions,"},
  {"line":1783,"text":"\t\t\t\tl.program,"},
  {"line":1784,"text":"\t\t\t\ttypeChecker,"},
  {"line":1785,"text":"\t\t\t)"},
  {"line":1786,"text":"\t\t\tif err != nil {"},
  {"line":1787,"text":"\t\t\t\treturn nil, err"},
  {"line":1788,"text":"\t\t\t}"},
  {"line":1789,"text":"\t\t\tif casesItem != nil {"},
  {"line":1790,"text":"\t\t\t\tsortedEntries = append(sortedEntries, casesItem)"},
  {"line":1791,"text":"\t\t\t}"},
  {"line":1792,"text":"\t\t}"},
  {"line":1793,"text":"\t}"},
  {"line":1795,"text":"\titemDefaults := l.setItemDefaults("},
  {"line":1796,"text":"\t\tctx,"},
  {"line":1797,"text":"\t\tposition,"},
  {"line":1798,"text":"\t\tfile,"},
  {"line":1799,"text":"\t\tsortedEntries,"},
  {"line":1800,"text":"\t\t&data.defaultCommitCharacters,"},
  {"line":1801,"text":"\t\toptionalReplacementSpan,"},
  {"line":1802,"text":"\t)"},
  {"line":1804,"text":"\treturn &lsproto.CompletionList{"},
  {"line":1805,"text":"\t\tIsIncomplete: data.hasUnresolvedAutoImports,"},
  {"line":1806,"text":"\t\tItemDefaults: itemDefaults,"},
  {"line":1807,"text":"\t\tItems:        sortedEntries,"},
  {"line":1808,"text":"\t}, nil"},
  {"line":1809,"text":"}"},
  {"line":1811,"text":"func (l *LanguageService) getCompletionEntriesFromSymbols("},
  {"line":1812,"text":"\tctx context.Context,"},
  {"line":1813,"text":"\ttypeChecker *checker.Checker,"},
  {"line":1814,"text":"\tdata *completionDataData,"},
  {"line":1815,"text":"\treplacementToken *ast.Node,"},
  {"line":1816,"text":"\tposition int,"},
  {"line":1817,"text":"\tfile *ast.SourceFile,"},
  {"line":1818,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":1819,"text":") (uniqueNames collections.Set[string], sortedEntries []*lsproto.CompletionItem) {"},
  {"line":1820,"text":"\tclosestSymbolDeclaration := getClosestSymbolDeclaration(data.contextToken, data.location)"},
  {"line":1821,"text":"\tuseSemicolons := lsutil.ProbablyUsesSemicolons(file)"},
  {"line":1822,"text":"\tisMemberCompletion := isMemberCompletionKind(data.completionKind)"},
  {"line":1823,"text":"\tsortedEntries = slices.Grow(sortedEntries, len(data.symbols)+len(data.autoImports))"},
  {"line":1828,"text":"\tuniques := make(uniqueNamesMap)"},
  {"line":1829,"text":"\tfor index, symbol := range data.symbols {"},
  {"line":1830,"text":"\t\torigin := data.symbolToOriginInfoMap[index]"},
  {"line":1831,"text":"\t\tname, needsConvertPropertyAccess := getCompletionEntryDisplayNameForSymbol("},
  {"line":1832,"text":"\t\t\tsymbol,"},
  {"line":1833,"text":"\t\t\torigin,"},
  {"line":1834,"text":"\t\t\tdata.completionKind,"},
  {"line":1835,"text":"\t\t\tdata.isJsxIdentifierExpected,"},
  {"line":1836,"text":"\t\t)"},
  {"line":1837,"text":"\t\tif name == \"\" ||"},
  {"line":1838,"text":"\t\t\tuniques[name] && (origin == nil || !originIsObjectLiteralMethod(origin)) ||"},
  {"line":1839,"text":"\t\t\tdata.completionKind == CompletionKindGlobal &&"},
  {"line":1840,"text":"\t\t\t\t!shouldIncludeSymbol(symbol, data, closestSymbolDeclaration, file, typeChecker, compilerOptions) {"},
  {"line":1841,"text":"\t\t\tcontinue"},
  {"line":1842,"text":"\t\t}"},
  {"line":1845,"text":"\t\tif !data.isTypeOnlyLocation && ast.IsSourceFileJS(file) && symbolAppearsToBeTypeOnly(symbol, typeChecker) {"},
  {"line":1846,"text":"\t\t\tcontinue"},
  {"line":1847,"text":"\t\t}"},
  {"line":1849,"text":"\t\toriginalSortText := data.symbolToSortTextMap[ast.GetSymbolId(symbol)]"},
  {"line":1850,"text":"\t\tif originalSortText == \"\" {"},
  {"line":1851,"text":"\t\t\toriginalSortText = SortTextLocationPriority"},
  {"line":1852,"text":"\t\t}"},
  {"line":1854,"text":"\t\tvar sortText SortText"},
  {"line":1855,"text":"\t\tif isDeprecated(symbol, typeChecker) {"},
  {"line":1856,"text":"\t\t\tsortText = DeprecateSortText(originalSortText)"},
  {"line":1857,"text":"\t\t} else {"},
  {"line":1858,"text":"\t\t\tsortText = originalSortText"},
  {"line":1859,"text":"\t\t}"},
  {"line":1860,"text":"\t\tentry := l.createCompletionItem("},
  {"line":1861,"text":"\t\t\tctx,"},
  {"line":1862,"text":"\t\t\ttypeChecker,"},
  {"line":1863,"text":"\t\t\tsymbol,"},
  {"line":1864,"text":"\t\t\tsortText,"},
  {"line":1865,"text":"\t\t\treplacementToken,"},
  {"line":1866,"text":"\t\t\tdata,"},
  {"line":1867,"text":"\t\t\tposition,"},
  {"line":1868,"text":"\t\t\tfile,"},
  {"line":1869,"text":"\t\t\tname,"},
  {"line":1870,"text":"\t\t\tneedsConvertPropertyAccess,"},
  {"line":1871,"text":"\t\t\torigin,"},
  {"line":1872,"text":"\t\t\tuseSemicolons,"},
  {"line":1873,"text":"\t\t\tcompilerOptions,"},
  {"line":1874,"text":"\t\t\tisMemberCompletion,"},
  {"line":1875,"text":"\t\t)"},
  {"line":1876,"text":"\t\tif entry == nil {"},
  {"line":1877,"text":"\t\t\tcontinue"},
  {"line":1878,"text":"\t\t}"},
  {"line":1881,"text":"\t\tshouldShadowLaterSymbols := (origin == nil || originIsTypeOnlyAlias(origin)) &&"},
  {"line":1882,"text":"\t\t\t!(symbol.Parent == nil &&"},
  {"line":1883,"text":"\t\t\t\t!core.Some(symbol.Declarations, func(d *ast.Node) bool { return ast.GetSourceFileOfNode(d) == file }))"},
  {"line":1884,"text":"\t\tuniques[name] = shouldShadowLaterSymbols"},
  {"line":1885,"text":"\t\tsortedEntries = append(sortedEntries, entry)"},
  {"line":1886,"text":"\t}"},
  {"line":1888,"text":"\tfor _, autoImport := range data.autoImports {"},
  {"line":1892,"text":"\t\tif data.importStatementCompletion != nil {"},
  {"line":1894,"text":"\t\t\tcontinue"},
  {"line":1895,"text":"\t\t}"},
  {"line":1899,"text":"\t\tif token := scanner.StringToToken(autoImport.Fix.Name); token != ast.KindUnknown && ast.IsNonContextualKeyword(token) {"},
  {"line":1900,"text":"\t\t\tcontinue"},
  {"line":1901,"text":"\t\t}"},
  {"line":1903,"text":"\t\tif !autoImport.Export.IsUnresolvedAlias() {"},
  {"line":1904,"text":"\t\t\tif data.isTypeOnlyLocation {"},
  {"line":1905,"text":"\t\t\t\tif autoImport.Export.Flags&ast.SymbolFlagsType == 0 && autoImport.Export.Flags&ast.SymbolFlagsModule == 0 {"},
  {"line":1906,"text":"\t\t\t\t\tcontinue"},
  {"line":1907,"text":"\t\t\t\t}"},
  {"line":1908,"text":"\t\t\t} else if autoImport.Export.Flags&ast.SymbolFlagsValue == 0 {"},
  {"line":1909,"text":"\t\t\t\tcontinue"},
  {"line":1910,"text":"\t\t\t}"},
  {"line":1911,"text":"\t\t}"},
  {"line":1913,"text":"\t\tentry := l.createLSPCompletionItem("},
  {"line":1914,"text":"\t\t\tctx,"},
  {"line":1915,"text":"\t\t\tautoImport.Fix.Name,"},
  {"line":1916,"text":"\t\t\t\"\","},
  {"line":1917,"text":"\t\t\t\"\","},
  {"line":1918,"text":"\t\t\tSortTextAutoImportSuggestions,"},
  {"line":1919,"text":"\t\t\tautoImport.Export.ScriptElementKind,"},
  {"line":1920,"text":"\t\t\tautoImport.Export.ScriptElementKindModifiers,"},
  {"line":1921,"text":"\t\t\tnil,"},
  {"line":1922,"text":"\t\t\tnil,"},
  {"line":1923,"text":"\t\t\t&lsproto.CompletionItemLabelDetails{"},
  {"line":1924,"text":"\t\t\t\tDescription: new(autoImport.Fix.ModuleSpecifier),"},
  {"line":1925,"text":"\t\t\t},"},
  {"line":1926,"text":"\t\t\tfile,"},
  {"line":1927,"text":"\t\t\tposition,"},
  {"line":1928,"text":"\t\t\tfalse, /*isMemberCompletion*/"},
  {"line":1929,"text":"\t\t\tfalse, /*isSnippet*/"},
  {"line":1930,"text":"\t\t\ttrue,  /*hasAction*/"},
  {"line":1931,"text":"\t\t\tfalse, /*preselect*/"},
  {"line":1932,"text":"\t\t\tautoImport.Fix.ModuleSpecifier,"},
  {"line":1933,"text":"\t\t\tautoImport.Fix.AutoImportFix,"},
  {"line":1934,"text":"\t\t\tnil, /*detail*/"},
  {"line":1935,"text":"\t\t)"},
  {"line":1937,"text":"\t\tif isShadowed, _ := uniques[autoImport.Fix.Name]; !isShadowed {"},
  {"line":1938,"text":"\t\t\tuniques[autoImport.Fix.Name] = false"},
  {"line":1939,"text":"\t\t\tsortedEntries = append(sortedEntries, entry)"},
  {"line":1940,"text":"\t\t}"},
  {"line":1941,"text":"\t}"},
  {"line":1943,"text":"\tuniqueSet := collections.NewSetWithSizeHint[string](len(uniques))"},
  {"line":1944,"text":"\tfor name := range uniques {"},
  {"line":1945,"text":"\t\tuniqueSet.Add(name)"},
  {"line":1946,"text":"\t}"},
  {"line":1947,"text":"\treturn *uniqueSet, sortedEntries"},
  {"line":1948,"text":"}"},
  {"line":1950,"text":"func completionNameForLiteral("},
  {"line":1951,"text":"\tfile *ast.SourceFile,"},
  {"line":1952,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":1953,"text":"\tliteral literalValue,"},
  {"line":1954,"text":") string {"},
  {"line":1955,"text":"\tswitch literal := literal.(type) {"},
  {"line":1956,"text":"\tcase string:"},
  {"line":1957,"text":"\t\treturn quote(file, preferences, literal)"},
  {"line":1958,"text":"\tcase jsnum.Number:"},
  {"line":1959,"text":"\t\tname, _ := core.StringifyJson(literal, \"\" /*prefix*/, \"\" /*suffix*/)"},
  {"line":1960,"text":"\t\treturn name"},
  {"line":1961,"text":"\tcase jsnum.PseudoBigInt:"},
  {"line":1962,"text":"\t\treturn literal.String() + \"n\""},
  {"line":1963,"text":"\t}"},
  {"line":1964,"text":"\tpanic(fmt.Sprintf(\"Unhandled literal value: %v\", literal))"},
  {"line":1965,"text":"}"},
  {"line":1967,"text":"func createCompletionItemForLiteral("},
  {"line":1968,"text":"\tfile *ast.SourceFile,"},
  {"line":1969,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":1970,"text":"\tliteral literalValue,"},
  {"line":1971,"text":") *lsproto.CompletionItem {"},
  {"line":1972,"text":"\treturn &lsproto.CompletionItem{"},
  {"line":1973,"text":"\t\tLabel:            completionNameForLiteral(file, preferences, literal),"},
  {"line":1974,"text":"\t\tKind:             new(lsproto.CompletionItemKindConstant),"},
  {"line":1975,"text":"\t\tSortText:         new(string(SortTextLocationPriority)),"},
  {"line":1976,"text":"\t\tCommitCharacters: new([]string{}),"},
  {"line":1977,"text":"\t}"},
  {"line":1978,"text":"}"},
  {"line":1980,"text":"func (l *LanguageService) createCompletionItem("},
  {"line":1981,"text":"\tctx context.Context,"},
  {"line":1982,"text":"\ttypeChecker *checker.Checker,"},
  {"line":1983,"text":"\tsymbol *ast.Symbol,"},
  {"line":1984,"text":"\tsortText SortText,"},
  {"line":1985,"text":"\treplacementToken *ast.Node,"},
  {"line":1986,"text":"\tdata *completionDataData,"},
  {"line":1987,"text":"\tposition int,"},
  {"line":1988,"text":"\tfile *ast.SourceFile,"},
  {"line":1989,"text":"\tname string,"},
  {"line":1990,"text":"\tneedsConvertPropertyAccess bool,"},
  {"line":1991,"text":"\torigin *symbolOriginInfo,"},
  {"line":1992,"text":"\tuseSemicolons bool,"},
  {"line":1993,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":1994,"text":"\tisMemberCompletion bool,"},
  {"line":1995,"text":") *lsproto.CompletionItem {"},
  {"line":1996,"text":"\tcontextToken := data.contextToken"},
  {"line":1997,"text":"\tvar insertText string"},
  {"line":1998,"text":"\tvar filterText string"},
  {"line":1999,"text":"\treplacementSpan := l.getReplacementRangeForContextToken(file, replacementToken, position)"},
  {"line":2000,"text":"\tvar isSnippet, hasAction bool"},
  {"line":2001,"text":"\tsource := getSourceFromOrigin(origin)"},
  {"line":2002,"text":"\tvar labelDetails *lsproto.CompletionItemLabelDetails"},
  {"line":2003,"text":"\tpreferences := l.UserPreferences()"},
  {"line":2004,"text":"\tinsertQuestionDot := originIsNullableMember(origin)"},
  {"line":2005,"text":"\tuseBraces := originIsSymbolMember(origin) || needsConvertPropertyAccess"},
  {"line":2006,"text":"\tif originIsThisTypeNode(origin) {"},
  {"line":2007,"text":"\t\tif needsConvertPropertyAccess {"},
  {"line":2008,"text":"\t\t\tinsertText = fmt.Sprintf("},
  {"line":2009,"text":"\t\t\t\t\"this%s[%s]\","},
  {"line":2010,"text":"\t\t\t\tcore.IfElse(insertQuestionDot, \"?.\", \"\"),"},
  {"line":2011,"text":"\t\t\t\tquotePropertyName(file, preferences, name))"},
  {"line":2012,"text":"\t\t} else {"},
  {"line":2013,"text":"\t\t\tinsertText = fmt.Sprintf("},
  {"line":2014,"text":"\t\t\t\t\"this%s%s\","},
  {"line":2015,"text":"\t\t\t\tcore.IfElse(insertQuestionDot, \"?.\", \".\"),"},
  {"line":2016,"text":"\t\t\t\tname)"},
  {"line":2017,"text":"\t\t}"},
  {"line":2018,"text":"\t} else if data.propertyAccessToConvert != nil && (useBraces || insertQuestionDot) {"},
  {"line":2021,"text":"\t\tif useBraces {"},
  {"line":2022,"text":"\t\t\tif needsConvertPropertyAccess {"},
  {"line":2023,"text":"\t\t\t\tinsertText = fmt.Sprintf(\"[%s]\", quotePropertyName(file, preferences, name))"},
  {"line":2024,"text":"\t\t\t} else {"},
  {"line":2025,"text":"\t\t\t\tinsertText = fmt.Sprintf(\"[%s]\", name)"},
  {"line":2026,"text":"\t\t\t}"},
  {"line":2027,"text":"\t\t} else {"},
  {"line":2028,"text":"\t\t\tinsertText = name"},
  {"line":2029,"text":"\t\t}"},
  {"line":2031,"text":"\t\tif insertQuestionDot || data.propertyAccessToConvert.QuestionDotToken() != nil {"},
  {"line":2032,"text":"\t\t\tinsertText = \"?.\" + insertText"},
  {"line":2033,"text":"\t\t}"},
  {"line":2035,"text":"\t\tdot := astnav.FindChildOfKind(data.propertyAccessToConvert, ast.KindDotToken, file)"},
  {"line":2036,"text":"\t\tif dot == nil {"},
  {"line":2037,"text":"\t\t\tdot = astnav.FindChildOfKind(data.propertyAccessToConvert, ast.KindQuestionDotToken, file)"},
  {"line":2038,"text":"\t\t}"},
  {"line":2040,"text":"\t\tif dot == nil {"},
  {"line":2041,"text":"\t\t\treturn nil"},
  {"line":2042,"text":"\t\t}"},
  {"line":2045,"text":"\t\tvar end int"},
  {"line":2046,"text":"\t\tif strings.HasPrefix(name, data.propertyAccessToConvert.Name().Text()) {"},
  {"line":2047,"text":"\t\t\tend = data.propertyAccessToConvert.End()"},
  {"line":2048,"text":"\t\t} else {"},
  {"line":2049,"text":"\t\t\tend = dot.End()"},
  {"line":2050,"text":"\t\t}"},
  {"line":2051,"text":"\t\treplacementSpan = new(l.createLspRangeFromBounds(astnav.GetStartOfNode(dot, file, false /*includeJSDoc*/), end, file))"},
  {"line":2052,"text":"\t}"},
  {"line":2054,"text":"\tif data.jsxInitializer.isInitializer {"},
  {"line":2055,"text":"\t\tif insertText == \"\" {"},
  {"line":2056,"text":"\t\t\tinsertText = name"},
  {"line":2057,"text":"\t\t}"},
  {"line":2058,"text":"\t\tinsertText = fmt.Sprintf(\"{%s}\", insertText)"},
  {"line":2059,"text":"\t\tif data.jsxInitializer.initializer != nil {"},
  {"line":2060,"text":"\t\t\treplacementSpan = new(l.createLspRangeFromNode(data.jsxInitializer.initializer, file))"},
  {"line":2061,"text":"\t\t}"},
  {"line":2062,"text":"\t}"},
  {"line":2064,"text":"\tif originIsPromise(origin) && data.propertyAccessToConvert != nil {"},
  {"line":2065,"text":"\t\tif insertText == \"\" {"},
  {"line":2066,"text":"\t\t\tinsertText = name"},
  {"line":2067,"text":"\t\t}"},
  {"line":2068,"text":"\t\tprecedingToken := astnav.FindPrecedingToken(file, data.propertyAccessToConvert.Pos())"},
  {"line":2069,"text":"\t\tvar awaitText string"},
  {"line":2070,"text":"\t\tif precedingToken != nil && lsutil.PositionIsASICandidate(precedingToken.End(), precedingToken.Parent, file) {"},
  {"line":2071,"text":"\t\t\tawaitText = \";\""},
  {"line":2072,"text":"\t\t}"},
  {"line":2074,"text":"\t\tawaitText += \"(await \" + scanner.GetTextOfNode(data.propertyAccessToConvert.Expression()) + \")\""},
  {"line":2075,"text":"\t\tif needsConvertPropertyAccess {"},
  {"line":2076,"text":"\t\t\tinsertText = awaitText + insertText"},
  {"line":2077,"text":"\t\t} else {"},
  {"line":2078,"text":"\t\t\tdotStr := core.IfElse(insertQuestionDot, \"?.\", \".\")"},
  {"line":2079,"text":"\t\t\tinsertText = awaitText + dotStr + insertText"},
  {"line":2080,"text":"\t\t}"},
  {"line":2081,"text":"\t\tisInAwaitExpression := ast.IsAwaitExpression(data.propertyAccessToConvert.Parent)"},
  {"line":2082,"text":"\t\twrapNode := core.IfElse("},
  {"line":2083,"text":"\t\t\tisInAwaitExpression,"},
  {"line":2084,"text":"\t\t\tdata.propertyAccessToConvert.Parent,"},
  {"line":2085,"text":"\t\t\tdata.propertyAccessToConvert.Expression(),"},
  {"line":2086,"text":"\t\t)"},
  {"line":2087,"text":"\t\treplacementSpan = new(l.createLspRangeFromBounds("},
  {"line":2088,"text":"\t\t\tastnav.GetStartOfNode(wrapNode, file, false /*includeJSDoc*/),"},
  {"line":2089,"text":"\t\t\tdata.propertyAccessToConvert.End(),"},
  {"line":2090,"text":"\t\t\tfile))"},
  {"line":2091,"text":"\t}"},
  {"line":2093,"text":"\tif originIsTypeOnlyAlias(origin) {"},
  {"line":2094,"text":"\t\thasAction = true"},
  {"line":2095,"text":"\t}"},
  {"line":2108,"text":"\tif data.completionKind == CompletionKindObjectPropertyDeclaration &&"},
  {"line":2109,"text":"\t\tcontextToken != nil &&"},
  {"line":2110,"text":"\t\t!ast.NodeHasKind(astnav.FindPrecedingTokenEx(file, contextToken.Pos(), contextToken, false /*excludeJSDoc*/), ast.KindCommaToken) {"},
  {"line":2111,"text":"\t\tif ast.IsMethodDeclaration(contextToken.Parent.Parent) ||"},
  {"line":2112,"text":"\t\t\tast.IsGetAccessorDeclaration(contextToken.Parent.Parent) ||"},
  {"line":2113,"text":"\t\t\tast.IsSetAccessorDeclaration(contextToken.Parent.Parent) ||"},
  {"line":2114,"text":"\t\t\tast.IsSpreadAssignment(contextToken.Parent) ||"},
  {"line":2115,"text":"\t\t\tlsutil.GetLastToken(ast.FindAncestor(contextToken.Parent, ast.IsPropertyAssignment), file) == contextToken ||"},
  {"line":2116,"text":"\t\t\tast.IsShorthandPropertyAssignment(contextToken.Parent) &&"},
  {"line":2117,"text":"\t\t\t\tgetLineOfPosition(file, contextToken.End()) != getLineOfPosition(file, position) {"},
  {"line":2118,"text":"\t\t\tsource = string(completionSourceObjectLiteralMemberWithComma)"},
  {"line":2119,"text":"\t\t\thasAction = true"},
  {"line":2120,"text":"\t\t}"},
  {"line":2121,"text":"\t}"},
  {"line":2123,"text":"\tif preferences.IncludeCompletionsWithClassMemberSnippets.IsTrue() &&"},
  {"line":2124,"text":"\t\tdata.completionKind == CompletionKindMemberLike &&"},
  {"line":2125,"text":"\t\tisClassLikeMemberCompletion(symbol, data.location, file) {"},
  {"line":2127,"text":"\t}"},
  {"line":2129,"text":"\tif originIsObjectLiteralMethod(origin) {"},
  {"line":2130,"text":"\t\tinsertText = origin.asObjectLiteralMethod().insertText"},
  {"line":2131,"text":"\t\tisSnippet = origin.asObjectLiteralMethod().isSnippet"},
  {"line":2132,"text":"\t\tlabelDetails = origin.asObjectLiteralMethod().labelDetails // !!! check if this can conflict with case above where we set label details"},
  {"line":2133,"text":"\t\tif !clientSupportsItemLabelDetails(ctx) {"},
  {"line":2134,"text":"\t\t\tname = name + *origin.asObjectLiteralMethod().labelDetails.Detail"},
  {"line":2135,"text":"\t\t\tlabelDetails = nil"},
  {"line":2136,"text":"\t\t}"},
  {"line":2137,"text":"\t\tsource = string(completionSourceObjectLiteralMethodSnippet)"},
  {"line":2138,"text":"\t\tsortText = sortBelow(sortText)"},
  {"line":2139,"text":"\t}"},
  {"line":2141,"text":"\tif data.isJsxIdentifierExpected &&"},
  {"line":2142,"text":"\t\t!data.isRightOfOpenTag &&"},
  {"line":2143,"text":"\t\tclientSupportsItemSnippet(ctx) &&"},
  {"line":2144,"text":"\t\tpreferences.JsxAttributeCompletionStyle != lsutil.JsxAttributeCompletionStyleNone &&"},
  {"line":2145,"text":"\t\t!(data.location.Parent != nil && ast.IsJsxAttribute(data.location.Parent) && data.location.Parent.Initializer() != nil) {"},
  {"line":2146,"text":"\t\tuseBraces := preferences.JsxAttributeCompletionStyle == lsutil.JsxAttributeCompletionStyleBraces"},
  {"line":2147,"text":"\t\tt := typeChecker.GetTypeOfSymbolAtLocation(symbol, data.location)"},
  {"line":2150,"text":"\t\tif preferences.JsxAttributeCompletionStyle == lsutil.JsxAttributeCompletionStyleAuto &&"},
  {"line":2151,"text":"\t\t\t!t.IsBooleanLike() &&"},
  {"line":2152,"text":"\t\t\t!(t.IsUnion() && core.Some(t.Types(), (*checker.Type).IsBooleanLike)) {"},
  {"line":2153,"text":"\t\t\tif t.IsStringLike() ||"},
  {"line":2154,"text":"\t\t\t\tt.IsUnion() &&"},
  {"line":2155,"text":"\t\t\t\t\tcore.Every("},
  {"line":2156,"text":"\t\t\t\t\t\tt.Types(),"},
  {"line":2157,"text":"\t\t\t\t\t\tfunc(t *checker.Type) bool {"},
  {"line":2158,"text":"\t\t\t\t\t\t\treturn t.Flags()&(checker.TypeFlagsStringLike|checker.TypeFlagsUndefined) != 0 ||"},
  {"line":2159,"text":"\t\t\t\t\t\t\t\tisStringAndEmptyAnonymousObjectIntersection(typeChecker, t)"},
  {"line":2160,"text":"\t\t\t\t\t\t}) {"},
  {"line":2162,"text":"\t\t\t\tinsertText = fmt.Sprintf(\"%s=%s\", escapeSnippetText(name), quote(file, preferences, \"$1\"))"},
  {"line":2163,"text":"\t\t\t\tisSnippet = true"},
  {"line":2164,"text":"\t\t\t} else {"},
  {"line":2166,"text":"\t\t\t\tuseBraces = true"},
  {"line":2167,"text":"\t\t\t}"},
  {"line":2168,"text":"\t\t}"},
  {"line":2170,"text":"\t\tif useBraces {"},
  {"line":2171,"text":"\t\t\tinsertText = escapeSnippetText(name) + \"={$1}\""},
  {"line":2172,"text":"\t\t\tisSnippet = true"},
  {"line":2173,"text":"\t\t}"},
  {"line":2174,"text":"\t}"},
  {"line":2176,"text":"\tparentNamedImportOrExport := ast.FindAncestor(data.location, isNamedImportsOrExports)"},
  {"line":2177,"text":"\tif parentNamedImportOrExport != nil {"},
  {"line":2178,"text":"\t\tif !scanner.IsIdentifierText(name, core.LanguageVariantStandard) {"},
  {"line":2179,"text":"\t\t\tinsertText = quotePropertyName(file, preferences, name)"},
  {"line":2181,"text":"\t\t\tif parentNamedImportOrExport.Kind == ast.KindNamedImports {"},
  {"line":2184,"text":"\t\t\t\tscanner := scanner.NewScanner()"},
  {"line":2185,"text":"\t\t\t\tscanner.SetText(file.Text())"},
  {"line":2186,"text":"\t\t\t\tscanner.ResetPos(position)"},
  {"line":2187,"text":"\t\t\t\tif !(scanner.Scan() == ast.KindAsKeyword && scanner.Scan() == ast.KindIdentifier) {"},
  {"line":2188,"text":"\t\t\t\t\tinsertText += \" as \" + generateIdentifierForArbitraryString(name)"},
  {"line":2189,"text":"\t\t\t\t}"},
  {"line":2190,"text":"\t\t\t}"},
  {"line":2191,"text":"\t\t} else if parentNamedImportOrExport.Kind == ast.KindNamedImports {"},
  {"line":2192,"text":"\t\t\tpossibleToken := scanner.StringToToken(name)"},
  {"line":2193,"text":"\t\t\tif possibleToken != ast.KindUnknown &&"},
  {"line":2194,"text":"\t\t\t\t(possibleToken == ast.KindAwaitKeyword || lsutil.IsNonContextualKeyword(possibleToken)) {"},
  {"line":2195,"text":"\t\t\t\tinsertText = fmt.Sprintf(\"%s as %s_\", name, name)"},
  {"line":2196,"text":"\t\t\t}"},
  {"line":2197,"text":"\t\t}"},
  {"line":2198,"text":"\t}"},
  {"line":2202,"text":"\telementKind := lsutil.GetSymbolKind(typeChecker, symbol, data.location)"},
  {"line":2203,"text":"\tvar commitCharacters *[]string"},
  {"line":2204,"text":"\tif clientSupportsItemCommitCharacters(ctx) {"},
  {"line":2205,"text":"\t\tif elementKind == lsutil.ScriptElementKindWarning || elementKind == lsutil.ScriptElementKindString {"},
  {"line":2206,"text":"\t\t\tcommitCharacters = &[]string{}"},
  {"line":2207,"text":"\t\t} else if !clientSupportsDefaultCommitCharacters(ctx) {"},
  {"line":2208,"text":"\t\t\tcommitCharacters = new(data.defaultCommitCharacters)"},
  {"line":2209,"text":"\t\t}"},
  {"line":2211,"text":"\t}"},
  {"line":2213,"text":"\tpreselect := isRecommendedCompletionMatch(symbol, data.recommendedCompletion, typeChecker)"},
  {"line":2214,"text":"\tkindModifiers := lsutil.GetSymbolModifiers(typeChecker, symbol)"},
  {"line":2216,"text":"\treturn l.createLSPCompletionItem("},
  {"line":2217,"text":"\t\tctx,"},
  {"line":2218,"text":"\t\tname,"},
  {"line":2219,"text":"\t\tinsertText,"},
  {"line":2220,"text":"\t\tfilterText,"},
  {"line":2221,"text":"\t\tsortText,"},
  {"line":2222,"text":"\t\telementKind,"},
  {"line":2223,"text":"\t\tkindModifiers,"},
  {"line":2224,"text":"\t\treplacementSpan,"},
  {"line":2225,"text":"\t\tcommitCharacters,"},
  {"line":2226,"text":"\t\tlabelDetails,"},
  {"line":2227,"text":"\t\tfile,"},
  {"line":2228,"text":"\t\tposition,"},
  {"line":2229,"text":"\t\tisMemberCompletion,"},
  {"line":2230,"text":"\t\tisSnippet,"},
  {"line":2231,"text":"\t\thasAction,"},
  {"line":2232,"text":"\t\tpreselect,"},
  {"line":2233,"text":"\t\tsource,"},
  {"line":2234,"text":"\t\tnil, /*autoImportFix*/"},
  {"line":2235,"text":"\t\tnil, /*detail*/"},
  {"line":2236,"text":"\t)"},
  {"line":2237,"text":"}"},
  {"line":2239,"text":"func isRecommendedCompletionMatch(localSymbol *ast.Symbol, recommendedCompletion *ast.Symbol, typeChecker *checker.Checker) bool {"},
  {"line":2240,"text":"\treturn localSymbol == recommendedCompletion ||"},
  {"line":2241,"text":"\t\tlocalSymbol.Flags&ast.SymbolFlagsExportValue != 0 && typeChecker.GetExportSymbolOfSymbol(localSymbol) == recommendedCompletion"},
  {"line":2242,"text":"}"},
  {"line":2245,"text":"var wordSeparators = collections.NewSetFromItems("},
  {"line":2246,"text":"\t'`', '~', '!', '@', '%', '^', '&', '*', '(', ')', '-', '=', '+', '[', '{', ']', '}', '\\\\', '|',"},
  {"line":2247,"text":"\t';', ':', '\\'', '\"', ',', '.', '<', '>', '/', '?',"},
  {"line":2248,"text":")"},
  {"line":2252,"text":"func getWordLengthAndStart(sourceFile *ast.SourceFile, position int) (wordLength int, wordStart rune) {"},
  {"line":2254,"text":"\ttext := sourceFile.Text()[:position]"},
  {"line":2255,"text":"\ttotalSize := 0"},
  {"line":2256,"text":"\tvar firstRune rune"},
  {"line":2257,"text":"\tfor r, size := utf8.DecodeLastRuneInString(text); size != 0; r, size = utf8.DecodeLastRuneInString(text[:len(text)-totalSize]) {"},
  {"line":2258,"text":"\t\tif wordSeparators.Has(r) || unicode.IsSpace(r) {"},
  {"line":2259,"text":"\t\t\tbreak"},
  {"line":2260,"text":"\t\t}"},
  {"line":2261,"text":"\t\ttotalSize += size"},
  {"line":2262,"text":"\t\tfirstRune = r"},
  {"line":2263,"text":"\t}"},
  {"line":2265,"text":"\tif firstRune == '@' {"},
  {"line":2266,"text":"\t\ttotalSize -= 1"},
  {"line":2267,"text":"\t\tfirstRune, _ = utf8.DecodeRuneInString(text[len(text)-totalSize:])"},
  {"line":2268,"text":"\t}"},
  {"line":2269,"text":"\treturn totalSize, firstRune"},
  {"line":2270,"text":"}"},
  {"line":2275,"text":"func trimElementAccess(text string) string {"},
  {"line":2276,"text":"\ttext = strings.TrimPrefix(text, \"[\")"},
  {"line":2277,"text":"\ttext = strings.TrimSuffix(text, \"]\")"},
  {"line":2278,"text":"\tif strings.HasPrefix(text, `'`) && strings.HasSuffix(text, `'`) {"},
  {"line":2279,"text":"\t\ttext = strings.TrimPrefix(strings.TrimSuffix(text, `'`), `'`)"},
  {"line":2280,"text":"\t}"},
  {"line":2281,"text":"\tif strings.HasPrefix(text, `\"`) && strings.HasSuffix(text, `\"`) {"},
  {"line":2282,"text":"\t\ttext = strings.TrimPrefix(strings.TrimSuffix(text, `\"`), `\"`)"},
  {"line":2283,"text":"\t}"},
  {"line":2284,"text":"\treturn text"},
  {"line":2285,"text":"}"},
  {"line":2288,"text":"func getFilterText("},
  {"line":2289,"text":"\tfile *ast.SourceFile,"},
  {"line":2290,"text":"\tposition int,"},
  {"line":2291,"text":"\tinsertText string,"},
  {"line":2292,"text":"\tlabel string,"},
  {"line":2293,"text":"\twordStart rune,"},
  {"line":2294,"text":"\tdotAccessor string,"},
  {"line":2295,"text":") string {"},
  {"line":2297,"text":"\tif after, ok := strings.CutPrefix(label, \"#\"); ok {"},
  {"line":2298,"text":"\t\tif insertText != \"\" {"},
  {"line":2299,"text":"\t\t\tif after, ok := strings.CutPrefix(insertText, \"this.#\"); ok {"},
  {"line":2300,"text":"\t\t\t\tif wordStart == '#' {"},
  {"line":2303,"text":"\t\t\t\t\treturn \"\""},
  {"line":2304,"text":"\t\t\t\t} else {"},
  {"line":2307,"text":"\t\t\t\t\treturn after"},
  {"line":2308,"text":"\t\t\t\t}"},
  {"line":2309,"text":"\t\t\t}"},
  {"line":2310,"text":"\t\t} else {"},
  {"line":2311,"text":"\t\t\tif wordStart == '#' {"},
  {"line":2313,"text":"\t\t\t\treturn \"\""},
  {"line":2314,"text":"\t\t\t} else {"},
  {"line":2317,"text":"\t\t\t\treturn after"},
  {"line":2318,"text":"\t\t\t}"},
  {"line":2319,"text":"\t\t}"},
  {"line":2320,"text":"\t}"},
  {"line":2323,"text":"\tif strings.HasPrefix(insertText, \"this.\") {"},
  {"line":2324,"text":"\t\treturn \"\""},
  {"line":2325,"text":"\t}"},
  {"line":2334,"text":"\tif strings.HasPrefix(insertText, \"[\") {"},
  {"line":2335,"text":"\t\treturn dotAccessor + trimElementAccess(insertText)"},
  {"line":2336,"text":"\t}"},
  {"line":2338,"text":"\tif strings.HasPrefix(insertText, \"?.\") {"},
  {"line":2345,"text":"\t\tif strings.HasPrefix(insertText, \"?.[\") {"},
  {"line":2346,"text":"\t\t\treturn dotAccessor + trimElementAccess(insertText[2:])"},
  {"line":2347,"text":"\t\t} else {"},
  {"line":2353,"text":"\t\t\treturn dotAccessor + insertText[2:]"},
  {"line":2354,"text":"\t\t}"},
  {"line":2355,"text":"\t}"},
  {"line":2358,"text":"\treturn insertText"},
  {"line":2359,"text":"}"},
  {"line":2362,"text":"func getDotAccessor(file *ast.SourceFile, position int) string {"},
  {"line":2363,"text":"\ttext := file.Text()[:position]"},
  {"line":2364,"text":"\ttotalSize := 0"},
  {"line":2365,"text":"\tif strings.HasSuffix(text, \"?.\") {"},
  {"line":2366,"text":"\t\ttotalSize += 2"},
  {"line":2367,"text":"\t\treturn file.Text()[position-totalSize : position]"},
  {"line":2368,"text":"\t}"},
  {"line":2369,"text":"\tif strings.HasSuffix(text, \".\") {"},
  {"line":2370,"text":"\t\ttotalSize += 1"},
  {"line":2371,"text":"\t\treturn file.Text()[position-totalSize : position]"},
  {"line":2372,"text":"\t}"},
  {"line":2373,"text":"\treturn \"\""},
  {"line":2374,"text":"}"},
  {"line":2376,"text":"func strPtrIsEmpty(ptr *string) bool {"},
  {"line":2377,"text":"\tif ptr == nil {"},
  {"line":2378,"text":"\t\treturn true"},
  {"line":2379,"text":"\t}"},
  {"line":2380,"text":"\treturn *ptr == \"\""},
  {"line":2381,"text":"}"},
  {"line":2383,"text":"func strPtrTo(v string) *string {"},
  {"line":2384,"text":"\tif v == \"\" {"},
  {"line":2385,"text":"\t\treturn nil"},
  {"line":2386,"text":"\t}"},
  {"line":2387,"text":"\treturn &v"},
  {"line":2388,"text":"}"},
  {"line":2390,"text":"func boolToPtr(v bool) *bool {"},
  {"line":2391,"text":"\tif v {"},
  {"line":2392,"text":"\t\treturn new(true)"},
  {"line":2393,"text":"\t}"},
  {"line":2394,"text":"\treturn nil"},
  {"line":2395,"text":"}"},
  {"line":2397,"text":"func getLineOfPosition(file *ast.SourceFile, pos int) int {"},
  {"line":2398,"text":"\tline := scanner.GetECMALineOfPosition(file, pos)"},
  {"line":2399,"text":"\treturn line"},
  {"line":2400,"text":"}"},
  {"line":2402,"text":"func getLineEndOfPosition(file *ast.SourceFile, pos int) int {"},
  {"line":2403,"text":"\tline := getLineOfPosition(file, pos)"},
  {"line":2404,"text":"\tlineStarts := scanner.GetECMALineStarts(file)"},
  {"line":2405,"text":"\tvar lastCharPos int"},
  {"line":2406,"text":"\tif line+1 >= len(lineStarts) {"},
  {"line":2407,"text":"\t\tlastCharPos = file.End()"},
  {"line":2408,"text":"\t} else {"},
  {"line":2409,"text":"\t\tlastCharPos = int(lineStarts[line+1]) - 1"},
  {"line":2410,"text":"\t}"},
  {"line":2411,"text":"\tfullText := file.Text()"},
  {"line":2412,"text":"\tif lastCharPos > 0 && lastCharPos < len(fullText) && fullText[lastCharPos] == '\\n' && fullText[lastCharPos-1] == '\\r' {"},
  {"line":2413,"text":"\t\treturn lastCharPos - 1"},
  {"line":2414,"text":"\t}"},
  {"line":2415,"text":"\treturn lastCharPos"},
  {"line":2416,"text":"}"},
  {"line":2418,"text":"func isClassLikeMemberCompletion(symbol *ast.Symbol, location *ast.Node, file *ast.SourceFile) bool {"},
  {"line":2420,"text":"\treturn false"},
  {"line":2421,"text":"}"},
  {"line":2423,"text":"func symbolAppearsToBeTypeOnly(symbol *ast.Symbol, typeChecker *checker.Checker) bool {"},
  {"line":2424,"text":"\tflags := checker.SkipAlias(symbol, typeChecker).CombinedLocalAndExportSymbolFlags()"},
  {"line":2425,"text":"\treturn flags&ast.SymbolFlagsValue == 0 &&"},
  {"line":2426,"text":"\t\t(len(symbol.Declarations) == 0 || !ast.IsInJSFile(symbol.Declarations[0]) || flags&ast.SymbolFlagsType != 0)"},
  {"line":2427,"text":"}"},
  {"line":2429,"text":"func shouldIncludeSymbol("},
  {"line":2430,"text":"\tsymbol *ast.Symbol,"},
  {"line":2431,"text":"\tdata *completionDataData,"},
  {"line":2432,"text":"\tclosestSymbolDeclaration *ast.Declaration,"},
  {"line":2433,"text":"\tfile *ast.SourceFile,"},
  {"line":2434,"text":"\ttypeChecker *checker.Checker,"},
  {"line":2435,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":2436,"text":") bool {"},
  {"line":2437,"text":"\tallFlags := symbol.Flags"},
  {"line":2438,"text":"\tlocation := data.location"},
  {"line":2440,"text":"\tif location.Parent != nil && ast.IsExportAssignment(location.Parent) {"},
  {"line":2441,"text":"\t\treturn true"},
  {"line":2442,"text":"\t}"},
  {"line":2446,"text":"\tif closestSymbolDeclaration != nil &&"},
  {"line":2447,"text":"\t\tast.IsVariableDeclaration(closestSymbolDeclaration) &&"},
  {"line":2448,"text":"\t\tsymbol.ValueDeclaration == closestSymbolDeclaration {"},
  {"line":2449,"text":"\t\treturn false"},
  {"line":2450,"text":"\t}"},
  {"line":2455,"text":"\tvar symbolDeclaration *ast.Declaration"},
  {"line":2456,"text":"\tif symbol.ValueDeclaration != nil {"},
  {"line":2457,"text":"\t\tsymbolDeclaration = symbol.ValueDeclaration"},
  {"line":2458,"text":"\t} else if len(symbol.Declarations) > 0 {"},
  {"line":2459,"text":"\t\tsymbolDeclaration = symbol.Declarations[0]"},
  {"line":2460,"text":"\t}"},
  {"line":2462,"text":"\tif closestSymbolDeclaration != nil && symbolDeclaration != nil {"},
  {"line":2463,"text":"\t\tif ast.IsParameterDeclaration(closestSymbolDeclaration) && ast.IsParameterDeclaration(symbolDeclaration) {"},
  {"line":2464,"text":"\t\t\tparameters := closestSymbolDeclaration.Parent.ParameterList()"},
  {"line":2465,"text":"\t\t\tif symbolDeclaration.Pos() >= closestSymbolDeclaration.Pos() &&"},
  {"line":2466,"text":"\t\t\t\tsymbolDeclaration.Pos() < parameters.End() {"},
  {"line":2467,"text":"\t\t\t\treturn false"},
  {"line":2468,"text":"\t\t\t}"},
  {"line":2469,"text":"\t\t} else if ast.IsTypeParameterDeclaration(closestSymbolDeclaration) &&"},
  {"line":2470,"text":"\t\t\tast.IsTypeParameterDeclaration(symbolDeclaration) {"},
  {"line":2471,"text":"\t\t\tif closestSymbolDeclaration == symbolDeclaration && data.contextToken != nil && data.contextToken.Kind == ast.KindExtendsKeyword {"},
  {"line":2474,"text":"\t\t\t\treturn false"},
  {"line":2475,"text":"\t\t\t}"},
  {"line":2476,"text":"\t\t\tif isInTypeParameterDefault(data.contextToken) && !ast.IsInferTypeNode(closestSymbolDeclaration.Parent) {"},
  {"line":2477,"text":"\t\t\t\ttypeParameters := closestSymbolDeclaration.Parent.TypeParameterList()"},
  {"line":2478,"text":"\t\t\t\tif typeParameters != nil && symbolDeclaration.Pos() >= closestSymbolDeclaration.Pos() &&"},
  {"line":2479,"text":"\t\t\t\t\tsymbolDeclaration.Pos() < typeParameters.End() {"},
  {"line":2480,"text":"\t\t\t\t\treturn false"},
  {"line":2481,"text":"\t\t\t\t}"},
  {"line":2482,"text":"\t\t\t}"},
  {"line":2483,"text":"\t\t}"},
  {"line":2484,"text":"\t}"},
  {"line":2491,"text":"\tsymbolOrigin := checker.SkipAlias(symbol, typeChecker)"},
  {"line":2494,"text":"\tif file.AsSourceFile().ExternalModuleIndicator != nil &&"},
  {"line":2495,"text":"\t\tcompilerOptions.AllowUmdGlobalAccess != core.TSTrue &&"},
  {"line":2496,"text":"\t\tsymbol != symbolOrigin &&"},
  {"line":2497,"text":"\t\tdata.symbolToSortTextMap[ast.GetSymbolId(symbol)] == SortTextGlobalsOrKeywords &&"},
  {"line":2498,"text":"\t\tsymbol.Parent != nil && checker.IsExternalModuleSymbol(symbol.Parent) {"},
  {"line":2499,"text":"\t\treturn false"},
  {"line":2500,"text":"\t}"},
  {"line":2502,"text":"\tallFlags = allFlags | symbolOrigin.CombinedLocalAndExportSymbolFlags()"},
  {"line":2503,"text":"\tif symbol.Flags&ast.SymbolFlagsAlias != 0 {"},
  {"line":2504,"text":"\t\tallFlags = allFlags | typeChecker.GetSymbolFlags(symbol)"},
  {"line":2505,"text":"\t}"},
  {"line":2508,"text":"\tif isInRightSideOfInternalImportEqualsDeclaration(data.location) {"},
  {"line":2509,"text":"\t\treturn allFlags&ast.SymbolFlagsNamespace != 0"},
  {"line":2510,"text":"\t}"},
  {"line":2512,"text":"\tif data.isTypeOnlyLocation {"},
  {"line":2514,"text":"\t\treturn symbolCanBeReferencedAtTypeLocation(symbol, typeChecker, collections.Set[ast.SymbolId]{})"},
  {"line":2515,"text":"\t}"},
  {"line":2518,"text":"\treturn allFlags&ast.SymbolFlagsValue != 0"},
  {"line":2519,"text":"}"},
  {"line":2521,"text":"func getCompletionEntryDisplayNameForSymbol("},
  {"line":2522,"text":"\tsymbol *ast.Symbol,"},
  {"line":2523,"text":"\torigin *symbolOriginInfo,"},
  {"line":2524,"text":"\tcompletionKind CompletionKind,"},
  {"line":2525,"text":"\tisJsxIdentifierExpected bool,"},
  {"line":2526,"text":") (displayName string, needsConvertPropertyAccess bool) {"},
  {"line":2527,"text":"\tif originIsIgnore(origin) {"},
  {"line":2528,"text":"\t\treturn \"\", false"},
  {"line":2529,"text":"\t}"},
  {"line":2531,"text":"\tvar name string"},
  {"line":2532,"text":"\tif originIncludesSymbolName(origin) {"},
  {"line":2533,"text":"\t\tname = origin.symbolName()"},
  {"line":2534,"text":"\t} else {"},
  {"line":2535,"text":"\t\tname = ast.SymbolName(symbol)"},
  {"line":2536,"text":"\t}"},
  {"line":2537,"text":"\tif name == \"\" ||"},
  {"line":2540,"text":"\t\tsymbol.Flags&ast.SymbolFlagsModule != 0 && startsWithQuote(name) ||"},
  {"line":2542,"text":"\t\tchecker.IsKnownSymbol(symbol) {"},
  {"line":2543,"text":"\t\treturn \"\", false"},
  {"line":2544,"text":"\t}"},
  {"line":2546,"text":"\tvariant := core.IfElse(isJsxIdentifierExpected, core.LanguageVariantJSX, core.LanguageVariantStandard)"},
  {"line":2548,"text":"\tif scanner.IsIdentifierText(name, variant) ||"},
  {"line":2549,"text":"\t\tsymbol.ValueDeclaration != nil && ast.IsPrivateIdentifierClassElementDeclaration(symbol.ValueDeclaration) {"},
  {"line":2550,"text":"\t\treturn name, false"},
  {"line":2551,"text":"\t}"},
  {"line":2552,"text":"\tif symbol.Flags&ast.SymbolFlagsAlias != 0 {"},
  {"line":2554,"text":"\t\treturn name, true"},
  {"line":2555,"text":"\t}"},
  {"line":2557,"text":"\tswitch completionKind {"},
  {"line":2558,"text":"\tcase CompletionKindMemberLike:"},
  {"line":2559,"text":"\t\tif originIsComputedPropertyName(origin) {"},
  {"line":2560,"text":"\t\t\treturn origin.symbolName(), false"},
  {"line":2561,"text":"\t\t}"},
  {"line":2562,"text":"\t\treturn \"\", false"},
  {"line":2563,"text":"\tcase CompletionKindObjectPropertyDeclaration:"},
  {"line":2565,"text":"\t\tescapedName, _ := core.StringifyJson(name, \"\", \"\")"},
  {"line":2566,"text":"\t\treturn escapedName, false"},
  {"line":2567,"text":"\tcase CompletionKindPropertyAccess, CompletionKindGlobal:"},
  {"line":2570,"text":"\t\tch, _ := utf8.DecodeRuneInString(name)"},
  {"line":2571,"text":"\t\tif ch == ' ' {"},
  {"line":2572,"text":"\t\t\treturn \"\", false"},
  {"line":2573,"text":"\t\t}"},
  {"line":2574,"text":"\t\treturn name, true"},
  {"line":2575,"text":"\tcase CompletionKindNone, CompletionKindString:"},
  {"line":2576,"text":"\t\treturn name, false"},
  {"line":2577,"text":"\tdefault:"},
  {"line":2578,"text":"\t\tpanic(fmt.Sprintf(\"Unexpected completion kind: %v\", completionKind))"},
  {"line":2579,"text":"\t}"},
  {"line":2580,"text":"}"},
  {"line":2583,"text":"func originIsIgnore(origin *symbolOriginInfo) bool {"},
  {"line":2584,"text":"\treturn origin != nil && origin.kind&symbolOriginInfoKindIgnore != 0"},
  {"line":2585,"text":"}"},
  {"line":2587,"text":"func originIncludesSymbolName(origin *symbolOriginInfo) bool {"},
  {"line":2588,"text":"\treturn originIsComputedPropertyName(origin)"},
  {"line":2589,"text":"}"},
  {"line":2591,"text":"func originIsComputedPropertyName(origin *symbolOriginInfo) bool {"},
  {"line":2592,"text":"\treturn origin != nil && origin.kind&symbolOriginInfoKindComputedPropertyName != 0"},
  {"line":2593,"text":"}"},
  {"line":2595,"text":"func originIsObjectLiteralMethod(origin *symbolOriginInfo) bool {"},
  {"line":2596,"text":"\treturn origin != nil && origin.kind&symbolOriginInfoKindObjectLiteralMethod != 0"},
  {"line":2597,"text":"}"},
  {"line":2599,"text":"func originIsThisTypeNode(origin *symbolOriginInfo) bool {"},
  {"line":2600,"text":"\treturn origin != nil && origin.kind&symbolOriginInfoKindThisType != 0"},
  {"line":2601,"text":"}"},
  {"line":2603,"text":"func originIsTypeOnlyAlias(origin *symbolOriginInfo) bool {"},
  {"line":2604,"text":"\treturn origin != nil && origin.kind&symbolOriginInfoKindTypeOnlyAlias != 0"},
  {"line":2605,"text":"}"},
  {"line":2607,"text":"func originIsSymbolMember(origin *symbolOriginInfo) bool {"},
  {"line":2608,"text":"\treturn origin != nil && origin.kind&symbolOriginInfoKindSymbolMember != 0"},
  {"line":2609,"text":"}"},
  {"line":2611,"text":"func originIsNullableMember(origin *symbolOriginInfo) bool {"},
  {"line":2612,"text":"\treturn origin != nil && origin.kind&symbolOriginInfoKindNullable != 0"},
  {"line":2613,"text":"}"},
  {"line":2615,"text":"func originIsPromise(origin *symbolOriginInfo) bool {"},
  {"line":2616,"text":"\treturn origin != nil && origin.kind&symbolOriginInfoKindPromise != 0"},
  {"line":2617,"text":"}"},
  {"line":2619,"text":"func getSourceFromOrigin(origin *symbolOriginInfo) string {"},
  {"line":2620,"text":"\tif originIsThisTypeNode(origin) {"},
  {"line":2621,"text":"\t\treturn string(completionSourceThisProperty)"},
  {"line":2622,"text":"\t}"},
  {"line":2624,"text":"\tif originIsTypeOnlyAlias(origin) {"},
  {"line":2625,"text":"\t\treturn string(completionSourceTypeOnlyAlias)"},
  {"line":2626,"text":"\t}"},
  {"line":2628,"text":"\treturn \"\""},
  {"line":2629,"text":"}"},
  {"line":2634,"text":"func getRelevantTokens(position int, file *ast.SourceFile) (contextToken *ast.Node, previousToken *ast.Node) {"},
  {"line":2635,"text":"\tpreviousToken = astnav.FindPrecedingToken(file, position)"},
  {"line":2636,"text":"\tif previousToken != nil && position <= previousToken.End() && (ast.IsMemberName(previousToken) || ast.IsKeywordKind(previousToken.Kind)) {"},
  {"line":2637,"text":"\t\tcontextToken := astnav.FindPrecedingToken(file, previousToken.Pos())"},
  {"line":2638,"text":"\t\treturn contextToken, previousToken"},
  {"line":2639,"text":"\t}"},
  {"line":2640,"text":"\treturn previousToken, previousToken"},
  {"line":2641,"text":"}"},
  {"line":2644,"text":"type CompletionsTriggerCharacter = string"},
  {"line":2646,"text":"func isValidTrigger(file *ast.SourceFile, triggerCharacter CompletionsTriggerCharacter, contextToken *ast.Node, position int) bool {"},
  {"line":2647,"text":"\tswitch triggerCharacter {"},
  {"line":2648,"text":"\tcase \".\", \"@\":"},
  {"line":2649,"text":"\t\treturn true"},
  {"line":2650,"text":"\tcase \"\\\"\", \"'\", \"`\":"},
  {"line":2652,"text":"\t\treturn contextToken != nil &&"},
  {"line":2653,"text":"\t\t\tisStringLiteralOrTemplate(contextToken) &&"},
  {"line":2654,"text":"\t\t\tposition == astnav.GetStartOfNode(contextToken, file, false /*includeJSDoc*/)+1"},
  {"line":2655,"text":"\tcase \"#\":"},
  {"line":2656,"text":"\t\treturn contextToken != nil &&"},
  {"line":2657,"text":"\t\t\tast.IsPrivateIdentifier(contextToken) &&"},
  {"line":2658,"text":"\t\t\tast.GetContainingClass(contextToken) != nil"},
  {"line":2659,"text":"\tcase \"<\":"},
  {"line":2661,"text":"\t\treturn contextToken != nil &&"},
  {"line":2662,"text":"\t\t\tcontextToken.Kind == ast.KindLessThanToken &&"},
  {"line":2663,"text":"\t\t\t(!ast.IsBinaryExpression(contextToken.Parent) || binaryExpressionMayBeOpenTag(contextToken.Parent.AsBinaryExpression()))"},
  {"line":2664,"text":"\tcase \"/\":"},
  {"line":2665,"text":"\t\tif contextToken == nil {"},
  {"line":2666,"text":"\t\t\treturn false"},
  {"line":2667,"text":"\t\t}"},
  {"line":2668,"text":"\t\tif ast.IsStringLiteralLike(contextToken) {"},
  {"line":2669,"text":"\t\t\treturn ast.TryGetImportFromModuleSpecifier(contextToken) != nil"},
  {"line":2670,"text":"\t\t}"},
  {"line":2671,"text":"\t\treturn contextToken.Kind == ast.KindLessThanSlashToken && ast.IsJsxClosingElement(contextToken.Parent)"},
  {"line":2672,"text":"\tcase \" \":"},
  {"line":2673,"text":"\t\treturn contextToken != nil && contextToken.Kind == ast.KindImportKeyword && contextToken.Parent.Kind == ast.KindSourceFile"},
  {"line":2674,"text":"\tdefault:"},
  {"line":2675,"text":"\t\tpanic(\"Unknown trigger character: \" + triggerCharacter)"},
  {"line":2676,"text":"\t}"},
  {"line":2677,"text":"}"},
  {"line":2679,"text":"func isStringLiteralOrTemplate(node *ast.Node) bool {"},
  {"line":2680,"text":"\tswitch node.Kind {"},
  {"line":2681,"text":"\tcase ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateExpression,"},
  {"line":2682,"text":"\t\tast.KindTaggedTemplateExpression:"},
  {"line":2683,"text":"\t\treturn true"},
  {"line":2684,"text":"\t}"},
  {"line":2685,"text":"\treturn false"},
  {"line":2686,"text":"}"},
  {"line":2688,"text":"func binaryExpressionMayBeOpenTag(binaryExpression *ast.BinaryExpression) bool {"},
  {"line":2689,"text":"\treturn ast.NodeIsMissing(binaryExpression.Left)"},
  {"line":2690,"text":"}"},
  {"line":2692,"text":"func isCheckedFile(file *ast.SourceFile, compilerOptions *core.CompilerOptions) bool {"},
  {"line":2693,"text":"\treturn !ast.IsSourceFileJS(file) || ast.IsCheckJSEnabledForFile(file, compilerOptions)"},
  {"line":2694,"text":"}"},
  {"line":2696,"text":"func isContextTokenValueLocation(contextToken *ast.Node) bool {"},
  {"line":2697,"text":"\treturn contextToken != nil && ((contextToken.Kind == ast.KindTypeOfKeyword &&"},
  {"line":2698,"text":"\t\t(contextToken.Parent.Kind == ast.KindTypeQuery || ast.IsTypeOfExpression(contextToken.Parent))) ||"},
  {"line":2699,"text":"\t\t(contextToken.Kind == ast.KindAssertsKeyword && contextToken.Parent.Kind == ast.KindTypePredicate))"},
  {"line":2700,"text":"}"},
  {"line":2702,"text":"func isPossiblyTypeArgumentPosition(token *ast.Node, sourceFile *ast.SourceFile, typeChecker *checker.Checker) bool {"},
  {"line":2703,"text":"\tinfo := getPossibleTypeArgumentsInfo(token, sourceFile)"},
  {"line":2704,"text":"\treturn info != nil && (ast.IsPartOfTypeNode(info.called) ||"},
  {"line":2705,"text":"\t\tlen(getPossibleGenericSignatures(info.called, info.nTypeArguments, typeChecker)) != 0 ||"},
  {"line":2706,"text":"\t\tisPossiblyTypeArgumentPosition(info.called, sourceFile, typeChecker))"},
  {"line":2707,"text":"}"},
  {"line":2709,"text":"func isContextTokenTypeLocation(contextToken *ast.Node) bool {"},
  {"line":2710,"text":"\tif contextToken != nil {"},
  {"line":2711,"text":"\t\tparentKind := contextToken.Parent.Kind"},
  {"line":2712,"text":"\t\tswitch contextToken.Kind {"},
  {"line":2713,"text":"\t\tcase ast.KindColonToken:"},
  {"line":2714,"text":"\t\t\treturn parentKind == ast.KindPropertyDeclaration ||"},
  {"line":2715,"text":"\t\t\t\tparentKind == ast.KindPropertySignature ||"},
  {"line":2716,"text":"\t\t\t\tparentKind == ast.KindParameter ||"},
  {"line":2717,"text":"\t\t\t\tparentKind == ast.KindVariableDeclaration ||"},
  {"line":2718,"text":"\t\t\t\tast.IsFunctionLikeKind(parentKind)"},
  {"line":2719,"text":"\t\tcase ast.KindEqualsToken:"},
  {"line":2720,"text":"\t\t\treturn parentKind == ast.KindTypeAliasDeclaration || parentKind == ast.KindTypeParameter"},
  {"line":2721,"text":"\t\tcase ast.KindAsKeyword:"},
  {"line":2722,"text":"\t\t\treturn parentKind == ast.KindAsExpression"},
  {"line":2723,"text":"\t\tcase ast.KindLessThanToken:"},
  {"line":2724,"text":"\t\t\treturn parentKind == ast.KindTypeReference || parentKind == ast.KindTypeAssertionExpression"},
  {"line":2725,"text":"\t\tcase ast.KindExtendsKeyword:"},
  {"line":2726,"text":"\t\t\treturn parentKind == ast.KindTypeParameter"},
  {"line":2727,"text":"\t\tcase ast.KindSatisfiesKeyword:"},
  {"line":2728,"text":"\t\t\treturn parentKind == ast.KindSatisfiesExpression"},
  {"line":2729,"text":"\t\t}"},
  {"line":2730,"text":"\t}"},
  {"line":2731,"text":"\treturn false"},
  {"line":2732,"text":"}"},
  {"line":2735,"text":"func symbolCanBeReferencedAtTypeLocation(symbol *ast.Symbol, typeChecker *checker.Checker, seenModules collections.Set[ast.SymbolId]) bool {"},
  {"line":2738,"text":"\treturn nonAliasCanBeReferencedAtTypeLocation(symbol, typeChecker, seenModules) ||"},
  {"line":2739,"text":"\t\tnonAliasCanBeReferencedAtTypeLocation("},
  {"line":2740,"text":"\t\t\tchecker.SkipAlias(core.IfElse(symbol.ExportSymbol != nil, symbol.ExportSymbol, symbol), typeChecker),"},
  {"line":2741,"text":"\t\t\ttypeChecker,"},
  {"line":2742,"text":"\t\t\tseenModules,"},
  {"line":2743,"text":"\t\t)"},
  {"line":2744,"text":"}"},
  {"line":2746,"text":"func nonAliasCanBeReferencedAtTypeLocation(symbol *ast.Symbol, typeChecker *checker.Checker, seenModules collections.Set[ast.SymbolId]) bool {"},
  {"line":2747,"text":"\treturn symbol.Flags&ast.SymbolFlagsType != 0 || typeChecker.IsUnknownSymbol(symbol) ||"},
  {"line":2748,"text":"\t\tsymbol.Flags&ast.SymbolFlagsModule != 0 && seenModules.AddIfAbsent(ast.GetSymbolId(symbol)) &&"},
  {"line":2749,"text":"\t\t\tcore.Some("},
  {"line":2750,"text":"\t\t\t\ttypeChecker.GetExportsOfModule(symbol),"},
  {"line":2751,"text":"\t\t\t\tfunc(e *ast.Symbol) bool { return symbolCanBeReferencedAtTypeLocation(e, typeChecker, seenModules) })"},
  {"line":2752,"text":"}"},
  {"line":2756,"text":"func getPropertiesForCompletion(t *checker.Type, typeChecker *checker.Checker) []*ast.Symbol {"},
  {"line":2757,"text":"\tif t.IsUnion() {"},
  {"line":2758,"text":"\t\treturn core.CheckEachDefined(typeChecker.GetAllPossiblePropertiesOfTypes(t.Types()), \"getAllPossiblePropertiesOfTypes() should all be defined.\")"},
  {"line":2759,"text":"\t} else {"},
  {"line":2760,"text":"\t\treturn core.CheckEachDefined(typeChecker.GetApparentProperties(t), \"getApparentProperties() should all be defined.\")"},
  {"line":2761,"text":"\t}"},
  {"line":2762,"text":"}"},
  {"line":2765,"text":"func getLeftMostName(e *ast.Expression) *ast.IdentifierNode {"},
  {"line":2766,"text":"\tif ast.IsIdentifier(e) {"},
  {"line":2767,"text":"\t\treturn e"},
  {"line":2768,"text":"\t} else if ast.IsPropertyAccessExpression(e) {"},
  {"line":2769,"text":"\t\treturn getLeftMostName(e.Expression())"},
  {"line":2770,"text":"\t} else {"},
  {"line":2771,"text":"\t\treturn nil"},
  {"line":2772,"text":"\t}"},
  {"line":2773,"text":"}"},
  {"line":2775,"text":"func getFirstSymbolInChain(symbol *ast.Symbol, enclosingDeclaration *ast.Node, typeChecker *checker.Checker) *ast.Symbol {"},
  {"line":2776,"text":"\tchain := typeChecker.GetAccessibleSymbolChain("},
  {"line":2777,"text":"\t\tsymbol,"},
  {"line":2778,"text":"\t\tenclosingDeclaration,"},
  {"line":2779,"text":"\t\tast.SymbolFlagsAll, /*meaning*/"},
  {"line":2780,"text":"\t\tfalse /*useOnlyExternalAliasing*/)"},
  {"line":2781,"text":"\tif len(chain) > 0 {"},
  {"line":2782,"text":"\t\treturn chain[0]"},
  {"line":2783,"text":"\t}"},
  {"line":2784,"text":"\tif symbol.Parent != nil {"},
  {"line":2785,"text":"\t\tif isModuleSymbol(symbol.Parent) {"},
  {"line":2786,"text":"\t\t\treturn symbol"},
  {"line":2787,"text":"\t\t}"},
  {"line":2788,"text":"\t\treturn getFirstSymbolInChain(symbol.Parent, enclosingDeclaration, typeChecker)"},
  {"line":2789,"text":"\t}"},
  {"line":2790,"text":"\treturn nil"},
  {"line":2791,"text":"}"},
  {"line":2793,"text":"func isModuleSymbol(symbol *ast.Symbol) bool {"},
  {"line":2794,"text":"\treturn core.Some(symbol.Declarations, func(decl *ast.Declaration) bool { return decl.Kind == ast.KindSourceFile })"},
  {"line":2795,"text":"}"},
  {"line":2797,"text":"func getNullableSymbolOriginInfoKind(kind symbolOriginInfoKind, insertQuestionDot bool) symbolOriginInfoKind {"},
  {"line":2798,"text":"\tif insertQuestionDot {"},
  {"line":2799,"text":"\t\tkind |= symbolOriginInfoKindNullable"},
  {"line":2800,"text":"\t}"},
  {"line":2801,"text":"\treturn kind"},
  {"line":2802,"text":"}"},
  {"line":2804,"text":"func isStaticProperty(symbol *ast.Symbol) bool {"},
  {"line":2805,"text":"\treturn symbol.ValueDeclaration != nil &&"},
  {"line":2806,"text":"\t\tsymbol.ValueDeclaration.ModifierFlags()&ast.ModifierFlagsStatic != 0 &&"},
  {"line":2807,"text":"\t\tast.IsClassLike(symbol.ValueDeclaration.Parent)"},
  {"line":2808,"text":"}"},
  {"line":2812,"text":"func getContextualTypeForConditionalExpression(conditionalExpr *ast.Node, position int, file *ast.SourceFile, typeChecker *checker.Checker) *checker.Type {"},
  {"line":2813,"text":"\targInfo := getArgumentInfoForCompletions(conditionalExpr, position, file, typeChecker)"},
  {"line":2814,"text":"\tif argInfo != nil {"},
  {"line":2815,"text":"\t\treturn typeChecker.GetContextualTypeForArgumentAtIndex(argInfo.invocation, argInfo.argumentIndex)"},
  {"line":2816,"text":"\t}"},
  {"line":2818,"text":"\tcontextualType := typeChecker.GetContextualType(conditionalExpr, checker.ContextFlagsIgnoreNodeInferences)"},
  {"line":2819,"text":"\tif contextualType != nil {"},
  {"line":2820,"text":"\t\treturn contextualType"},
  {"line":2821,"text":"\t}"},
  {"line":2822,"text":"\treturn typeChecker.GetContextualType(conditionalExpr, checker.ContextFlagsNone)"},
  {"line":2823,"text":"}"},
  {"line":2825,"text":"func getContextualType(previousToken *ast.Node, position int, file *ast.SourceFile, typeChecker *checker.Checker) *checker.Type {"},
  {"line":2826,"text":"\tparent := previousToken.Parent"},
  {"line":2827,"text":"\tswitch previousToken.Kind {"},
  {"line":2828,"text":"\tcase ast.KindIdentifier:"},
  {"line":2829,"text":"\t\treturn getContextualTypeFromParent(previousToken, typeChecker, checker.ContextFlagsNone)"},
  {"line":2830,"text":"\tcase ast.KindEqualsToken:"},
  {"line":2831,"text":"\t\tswitch parent.Kind {"},
  {"line":2832,"text":"\t\tcase ast.KindVariableDeclaration:"},
  {"line":2833,"text":"\t\t\treturn typeChecker.GetContextualType(parent.Initializer(), checker.ContextFlagsNone)"},
  {"line":2834,"text":"\t\tcase ast.KindBinaryExpression:"},
  {"line":2835,"text":"\t\t\treturn typeChecker.GetTypeAtLocation(parent.AsBinaryExpression().Left)"},
  {"line":2836,"text":"\t\tcase ast.KindJsxAttribute:"},
  {"line":2837,"text":"\t\t\treturn typeChecker.GetContextualTypeForJsxAttribute(parent)"},
  {"line":2838,"text":"\t\tdefault:"},
  {"line":2839,"text":"\t\t\treturn nil"},
  {"line":2840,"text":"\t\t}"},
  {"line":2841,"text":"\tcase ast.KindNewKeyword:"},
  {"line":2842,"text":"\t\treturn typeChecker.GetContextualType(parent, checker.ContextFlagsNone)"},
  {"line":2843,"text":"\tcase ast.KindCaseKeyword:"},
  {"line":2844,"text":"\t\tcaseClause := core.IfElse(ast.IsCaseClause(parent), parent, nil)"},
  {"line":2845,"text":"\t\tif caseClause != nil {"},
  {"line":2846,"text":"\t\t\treturn getSwitchedType(caseClause, typeChecker)"},
  {"line":2847,"text":"\t\t}"},
  {"line":2848,"text":"\t\treturn nil"},
  {"line":2849,"text":"\tcase ast.KindOpenBraceToken:"},
  {"line":2850,"text":"\t\tif ast.IsJsxExpression(parent) && !ast.IsJsxElement(parent.Parent) && !ast.IsJsxFragment(parent.Parent) {"},
  {"line":2851,"text":"\t\t\treturn typeChecker.GetContextualTypeForJsxAttribute(parent.Parent)"},
  {"line":2852,"text":"\t\t}"},
  {"line":2853,"text":"\t\treturn nil"},
  {"line":2854,"text":"\tcase ast.KindOpenBracketToken:"},
  {"line":2857,"text":"\t\tif ast.IsArrayLiteralExpression(parent) {"},
  {"line":2858,"text":"\t\t\tcontextualArrayType := typeChecker.GetContextualType(parent, checker.ContextFlagsNone)"},
  {"line":2859,"text":"\t\t\tif contextualArrayType != nil {"},
  {"line":2861,"text":"\t\t\t\treturn typeChecker.GetContextualTypeForArrayLiteralAtPosition(contextualArrayType, parent, position)"},
  {"line":2862,"text":"\t\t\t}"},
  {"line":2863,"text":"\t\t}"},
  {"line":2864,"text":"\t\treturn nil"},
  {"line":2865,"text":"\tcase ast.KindCloseBracketToken:"},
  {"line":2871,"text":"\t\treturn nil"},
  {"line":2872,"text":"\tcase ast.KindQuestionToken:"},
  {"line":2875,"text":"\t\tif ast.IsConditionalExpression(parent) {"},
  {"line":2876,"text":"\t\t\treturn getContextualTypeForConditionalExpression(parent, position, file, typeChecker)"},
  {"line":2877,"text":"\t\t}"},
  {"line":2878,"text":"\t\treturn nil"},
  {"line":2879,"text":"\tcase ast.KindColonToken:"},
  {"line":2884,"text":"\t\tif ast.IsConditionalExpression(parent) {"},
  {"line":2885,"text":"\t\t\treturn getContextualTypeForConditionalExpression(parent, position, file, typeChecker)"},
  {"line":2886,"text":"\t\t}"},
  {"line":2887,"text":"\tcase ast.KindCommaToken:"},
  {"line":2890,"text":"\t\tif ast.IsArrayLiteralExpression(parent) {"},
  {"line":2891,"text":"\t\t\tcontextualArrayType := typeChecker.GetContextualType(parent, checker.ContextFlagsNone)"},
  {"line":2892,"text":"\t\t\tif contextualArrayType != nil {"},
  {"line":2893,"text":"\t\t\t\treturn typeChecker.GetContextualTypeForArrayLiteralAtPosition(contextualArrayType, parent, position)"},
  {"line":2894,"text":"\t\t\t}"},
  {"line":2895,"text":"\t\t\treturn nil"},
  {"line":2896,"text":"\t\t}"},
  {"line":2897,"text":"\t}"},
  {"line":2899,"text":"\targInfo := getArgumentInfoForCompletions(previousToken, position, file, typeChecker)"},
  {"line":2900,"text":"\tif argInfo != nil {"},
  {"line":2901,"text":"\t\treturn typeChecker.GetContextualTypeForArgumentAtIndex(argInfo.invocation, argInfo.argumentIndex)"},
  {"line":2902,"text":"\t} else if isEqualityOperatorKind(previousToken.Kind) && ast.IsBinaryExpression(parent) && isEqualityOperatorKind(parent.AsBinaryExpression().OperatorToken.Kind) {"},
  {"line":2904,"text":"\t\treturn typeChecker.GetTypeAtLocation(parent.AsBinaryExpression().Left)"},
  {"line":2905,"text":"\t} else {"},
  {"line":2906,"text":"\t\tcontextualType := typeChecker.GetContextualType(previousToken, checker.ContextFlagsIgnoreNodeInferences)"},
  {"line":2907,"text":"\t\tif contextualType != nil {"},
  {"line":2908,"text":"\t\t\treturn contextualType"},
  {"line":2909,"text":"\t\t}"},
  {"line":2910,"text":"\t\treturn typeChecker.GetContextualType(previousToken, checker.ContextFlagsNone)"},
  {"line":2911,"text":"\t}"},
  {"line":2912,"text":"}"},
  {"line":2914,"text":"func getSwitchedType(caseClause *ast.CaseOrDefaultClauseNode, typeChecker *checker.Checker) *checker.Type {"},
  {"line":2915,"text":"\treturn typeChecker.GetTypeAtLocation(caseClause.Parent.Parent.Expression())"},
  {"line":2916,"text":"}"},
  {"line":2918,"text":"func isEqualityOperatorKind(kind ast.Kind) bool {"},
  {"line":2919,"text":"\tswitch kind {"},
  {"line":2920,"text":"\tcase ast.KindEqualsEqualsEqualsToken, ast.KindEqualsEqualsToken,"},
  {"line":2921,"text":"\t\tast.KindExclamationEqualsEqualsToken, ast.KindExclamationEqualsToken:"},
  {"line":2922,"text":"\t\treturn true"},
  {"line":2923,"text":"\tdefault:"},
  {"line":2924,"text":"\t\treturn false"},
  {"line":2925,"text":"\t}"},
  {"line":2926,"text":"}"},
  {"line":2929,"text":"func isLiteral(t *checker.Type) bool {"},
  {"line":2930,"text":"\treturn t.IsStringLiteral() || t.IsNumberLiteral() || t.IsBigIntLiteral()"},
  {"line":2931,"text":"}"},
  {"line":2933,"text":"func getRecommendedCompletion(previousToken *ast.Node, contextualType *checker.Type, typeChecker *checker.Checker) *ast.Symbol {"},
  {"line":2934,"text":"\tvar types []*checker.Type"},
  {"line":2935,"text":"\tif contextualType.IsUnion() {"},
  {"line":2936,"text":"\t\ttypes = contextualType.Types()"},
  {"line":2937,"text":"\t} else {"},
  {"line":2938,"text":"\t\ttypes = []*checker.Type{contextualType}"},
  {"line":2939,"text":"\t}"},
  {"line":2941,"text":"\treturn core.FirstNonNil("},
  {"line":2942,"text":"\t\ttypes,"},
  {"line":2943,"text":"\t\tfunc(t *checker.Type) *ast.Symbol {"},
  {"line":2944,"text":"\t\t\tsymbol := t.Symbol()"},
  {"line":2946,"text":"\t\t\tif symbol != nil &&"},
  {"line":2947,"text":"\t\t\t\tsymbol.Flags&(ast.SymbolFlagsEnumMember|ast.SymbolFlagsEnum|ast.SymbolFlagsClass) != 0 &&"},
  {"line":2948,"text":"\t\t\t\t!isAbstractConstructorSymbol(symbol) {"},
  {"line":2949,"text":"\t\t\t\treturn getFirstSymbolInChain(symbol, previousToken, typeChecker)"},
  {"line":2950,"text":"\t\t\t}"},
  {"line":2951,"text":"\t\t\treturn nil"},
  {"line":2952,"text":"\t\t},"},
  {"line":2953,"text":"\t)"},
  {"line":2954,"text":"}"},
  {"line":2956,"text":"func isAbstractConstructorSymbol(symbol *ast.Symbol) bool {"},
  {"line":2957,"text":"\tif symbol.Flags&ast.SymbolFlagsClass != 0 {"},
  {"line":2958,"text":"\t\tdeclaration := ast.GetClassLikeDeclarationOfSymbol(symbol)"},
  {"line":2959,"text":"\t\treturn declaration != nil && ast.HasSyntacticModifier(declaration, ast.ModifierFlagsAbstract)"},
  {"line":2960,"text":"\t}"},
  {"line":2961,"text":"\treturn false"},
  {"line":2962,"text":"}"},
  {"line":2964,"text":"func startsWithQuote(s string) bool {"},
  {"line":2965,"text":"\tr, _ := utf8.DecodeRuneInString(s)"},
  {"line":2966,"text":"\treturn r == '\"' || r == '\\''"},
  {"line":2967,"text":"}"},
  {"line":2969,"text":"func getClosestSymbolDeclaration(contextToken *ast.Node, location *ast.Node) *ast.Declaration {"},
  {"line":2970,"text":"\tif contextToken == nil {"},
  {"line":2971,"text":"\t\treturn nil"},
  {"line":2972,"text":"\t}"},
  {"line":2974,"text":"\tclosestDeclaration := ast.FindAncestorOrQuit(contextToken, func(node *ast.Node) ast.FindAncestorResult {"},
  {"line":2975,"text":"\t\tif ast.IsFunctionBlock(node) || isArrowFunctionBody(node) || ast.IsBindingPattern(node) {"},
  {"line":2976,"text":"\t\t\treturn ast.FindAncestorQuit"},
  {"line":2977,"text":"\t\t}"},
  {"line":2979,"text":"\t\tif (ast.IsParameterDeclaration(node) || ast.IsTypeParameterDeclaration(node)) &&"},
  {"line":2980,"text":"\t\t\t!ast.IsIndexSignatureDeclaration(node.Parent) {"},
  {"line":2981,"text":"\t\t\treturn ast.FindAncestorTrue"},
  {"line":2982,"text":"\t\t}"},
  {"line":2983,"text":"\t\treturn ast.FindAncestorFalse"},
  {"line":2984,"text":"\t})"},
  {"line":2986,"text":"\tif closestDeclaration == nil {"},
  {"line":2987,"text":"\t\tclosestDeclaration = ast.FindAncestorOrQuit(location, func(node *ast.Node) ast.FindAncestorResult {"},
  {"line":2988,"text":"\t\t\tif ast.IsFunctionBlock(node) || isArrowFunctionBody(node) || ast.IsBindingPattern(node) {"},
  {"line":2989,"text":"\t\t\t\treturn ast.FindAncestorQuit"},
  {"line":2990,"text":"\t\t\t}"},
  {"line":2992,"text":"\t\t\tif ast.IsVariableDeclaration(node) {"},
  {"line":2993,"text":"\t\t\t\treturn ast.FindAncestorTrue"},
  {"line":2994,"text":"\t\t\t}"},
  {"line":2995,"text":"\t\t\treturn ast.FindAncestorFalse"},
  {"line":2996,"text":"\t\t})"},
  {"line":2997,"text":"\t}"},
  {"line":2998,"text":"\treturn closestDeclaration"},
  {"line":2999,"text":"}"},
  {"line":3001,"text":"func isArrowFunctionBody(node *ast.Node) bool {"},
  {"line":3002,"text":"\treturn node.Parent != nil && ast.IsArrowFunction(node.Parent) &&"},
  {"line":3003,"text":"\t\t(node.Parent.Body() == node ||"},
  {"line":3005,"text":"\t\t\tnode.Kind == ast.KindEqualsGreaterThanToken)"},
  {"line":3006,"text":"}"},
  {"line":3008,"text":"func isInTypeParameterDefault(contextToken *ast.Node) bool {"},
  {"line":3009,"text":"\tif contextToken == nil {"},
  {"line":3010,"text":"\t\treturn false"},
  {"line":3011,"text":"\t}"},
  {"line":3013,"text":"\tnode := contextToken"},
  {"line":3014,"text":"\tparent := contextToken.Parent"},
  {"line":3015,"text":"\tfor parent != nil {"},
  {"line":3016,"text":"\t\tif ast.IsTypeParameterDeclaration(parent) {"},
  {"line":3017,"text":"\t\t\treturn parent.AsTypeParameterDeclaration().DefaultType == node || node.Kind == ast.KindEqualsToken"},
  {"line":3018,"text":"\t\t}"},
  {"line":3019,"text":"\t\tnode = parent"},
  {"line":3020,"text":"\t\tparent = parent.Parent"},
  {"line":3021,"text":"\t}"},
  {"line":3023,"text":"\treturn false"},
  {"line":3024,"text":"}"},
  {"line":3026,"text":"func isDeprecated(symbol *ast.Symbol, typeChecker *checker.Checker) bool {"},
  {"line":3027,"text":"\tdeclarations := checker.SkipAlias(symbol, typeChecker).Declarations"},
  {"line":3028,"text":"\treturn len(declarations) > 0 && core.Every(declarations, func(decl *ast.Declaration) bool { return typeChecker.IsDeprecatedDeclaration(decl) })"},
  {"line":3029,"text":"}"},
  {"line":3031,"text":"func (l *LanguageService) getReplacementRangeForContextToken(file *ast.SourceFile, contextToken *ast.Node, position int) *lsproto.Range {"},
  {"line":3032,"text":"\tif contextToken == nil {"},
  {"line":3033,"text":"\t\treturn nil"},
  {"line":3034,"text":"\t}"},
  {"line":3037,"text":"\tswitch contextToken.Kind {"},
  {"line":3038,"text":"\tcase ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:"},
  {"line":3039,"text":"\t\treturn l.createRangeFromStringLiteralLikeContent(file, contextToken, position)"},
  {"line":3040,"text":"\tdefault:"},
  {"line":3041,"text":"\t\treturn new(l.createLspRangeFromNode(contextToken, file))"},
  {"line":3042,"text":"\t}"},
  {"line":3043,"text":"}"},
  {"line":3045,"text":"func (l *LanguageService) createRangeFromStringLiteralLikeContent(file *ast.SourceFile, node *ast.StringLiteralLike, position int) *lsproto.Range {"},
  {"line":3046,"text":"\treplacementEnd := node.End() - 1"},
  {"line":3047,"text":"\tnodeStart := astnav.GetStartOfNode(node, file, false /*includeJSDoc*/)"},
  {"line":3048,"text":"\tif ast.IsUnterminatedLiteral(node) {"},
  {"line":3050,"text":"\t\tif nodeStart == replacementEnd {"},
  {"line":3051,"text":"\t\t\treturn nil"},
  {"line":3052,"text":"\t\t}"},
  {"line":3053,"text":"\t\treplacementEnd = min(position, node.End())"},
  {"line":3054,"text":"\t}"},
  {"line":3055,"text":"\treturn new(l.createLspRangeFromBounds(nodeStart+1, replacementEnd, file))"},
  {"line":3056,"text":"}"},
  {"line":3058,"text":"func quotePropertyName(file *ast.SourceFile, preferences lsutil.UserPreferences, name string) string {"},
  {"line":3059,"text":"\tr, _ := utf8.DecodeRuneInString(name)"},
  {"line":3060,"text":"\tif unicode.IsDigit(r) {"},
  {"line":3061,"text":"\t\treturn name"},
  {"line":3062,"text":"\t}"},
  {"line":3063,"text":"\treturn quote(file, preferences, name)"},
  {"line":3064,"text":"}"},
  {"line":3069,"text":"func isStringAndEmptyAnonymousObjectIntersection(typeChecker *checker.Checker, t *checker.Type) bool {"},
  {"line":3070,"text":"\tif !t.IsIntersection() {"},
  {"line":3071,"text":"\t\treturn false"},
  {"line":3072,"text":"\t}"},
  {"line":3074,"text":"\treturn len(t.Types()) == 2 &&"},
  {"line":3075,"text":"\t\t(areIntersectedTypesAvoidingStringReduction(typeChecker, t.Types()[0], t.Types()[1]) ||"},
  {"line":3076,"text":"\t\t\tareIntersectedTypesAvoidingStringReduction(typeChecker, t.Types()[1], t.Types()[0]))"},
  {"line":3077,"text":"}"},
  {"line":3079,"text":"func areIntersectedTypesAvoidingStringReduction(typeChecker *checker.Checker, t1 *checker.Type, t2 *checker.Type) bool {"},
  {"line":3080,"text":"\treturn t1.IsString() && typeChecker.IsEmptyAnonymousObjectType(t2)"},
  {"line":3081,"text":"}"},
  {"line":3083,"text":"func escapeSnippetText(text string) string {"},
  {"line":3084,"text":"\treturn strings.ReplaceAll(text, `$`, `\\$`)"},
  {"line":3085,"text":"}"},
  {"line":3087,"text":"func isNamedImportsOrExports(node *ast.Node) bool {"},
  {"line":3088,"text":"\treturn ast.IsNamedImports(node) || ast.IsNamedExports(node)"},
  {"line":3089,"text":"}"},
  {"line":3091,"text":"func generateIdentifierForArbitraryString(text string) string {"},
  {"line":3092,"text":"\tneedsUnderscore := false"},
  {"line":3093,"text":"\tvar identifier strings.Builder"},
  {"line":3094,"text":"\tvar ch rune"},
  {"line":3095,"text":"\tvar size int"},
  {"line":3098,"text":"\tfor pos := 0; pos < len(text); pos += size {"},
  {"line":3099,"text":"\t\tch, size = utf8.DecodeRuneInString(text[pos:])"},
  {"line":3100,"text":"\t\tvar validChar bool"},
  {"line":3101,"text":"\t\tif pos == 0 {"},
  {"line":3102,"text":"\t\t\tvalidChar = scanner.IsIdentifierStart(ch)"},
  {"line":3103,"text":"\t\t} else {"},
  {"line":3104,"text":"\t\t\tvalidChar = scanner.IsIdentifierPart(ch)"},
  {"line":3105,"text":"\t\t}"},
  {"line":3106,"text":"\t\tif size > 0 && validChar {"},
  {"line":3107,"text":"\t\t\tif needsUnderscore {"},
  {"line":3108,"text":"\t\t\t\tidentifier.WriteRune('_')"},
  {"line":3109,"text":"\t\t\t}"},
  {"line":3110,"text":"\t\t\tidentifier.WriteRune(ch)"},
  {"line":3111,"text":"\t\t\tneedsUnderscore = false"},
  {"line":3112,"text":"\t\t} else {"},
  {"line":3113,"text":"\t\t\tneedsUnderscore = true"},
  {"line":3114,"text":"\t\t}"},
  {"line":3115,"text":"\t}"},
  {"line":3117,"text":"\tif needsUnderscore {"},
  {"line":3118,"text":"\t\tidentifier.WriteRune('_')"},
  {"line":3119,"text":"\t}"},
  {"line":3122,"text":"\tid := identifier.String()"},
  {"line":3123,"text":"\tif id == \"\" {"},
  {"line":3124,"text":"\t\treturn \"_\""},
  {"line":3125,"text":"\t}"},
  {"line":3127,"text":"\treturn id"},
  {"line":3128,"text":"}"},
  {"line":3131,"text":"func getCompletionsSymbolKind(kind lsutil.ScriptElementKind) lsproto.CompletionItemKind {"},
  {"line":3132,"text":"\tswitch kind {"},
  {"line":3133,"text":"\tcase lsutil.ScriptElementKindPrimitiveType, lsutil.ScriptElementKindKeyword:"},
  {"line":3134,"text":"\t\treturn lsproto.CompletionItemKindKeyword"},
  {"line":3135,"text":"\tcase lsutil.ScriptElementKindConstElement, lsutil.ScriptElementKindLetElement, lsutil.ScriptElementKindVariableElement,"},
  {"line":3136,"text":"\t\tlsutil.ScriptElementKindLocalVariableElement, lsutil.ScriptElementKindAlias, lsutil.ScriptElementKindParameterElement:"},
  {"line":3137,"text":"\t\treturn lsproto.CompletionItemKindVariable"},
  {"line":3139,"text":"\tcase lsutil.ScriptElementKindMemberVariableElement, lsutil.ScriptElementKindMemberGetAccessorElement,"},
  {"line":3140,"text":"\t\tlsutil.ScriptElementKindMemberSetAccessorElement:"},
  {"line":3141,"text":"\t\treturn lsproto.CompletionItemKindField"},
  {"line":3143,"text":"\tcase lsutil.ScriptElementKindFunctionElement, lsutil.ScriptElementKindLocalFunctionElement:"},
  {"line":3144,"text":"\t\treturn lsproto.CompletionItemKindFunction"},
  {"line":3146,"text":"\tcase lsutil.ScriptElementKindMemberFunctionElement, lsutil.ScriptElementKindConstructSignatureElement,"},
  {"line":3147,"text":"\t\tlsutil.ScriptElementKindCallSignatureElement, lsutil.ScriptElementKindIndexSignatureElement:"},
  {"line":3148,"text":"\t\treturn lsproto.CompletionItemKindMethod"},
  {"line":3150,"text":"\tcase lsutil.ScriptElementKindEnumElement:"},
  {"line":3151,"text":"\t\treturn lsproto.CompletionItemKindEnum"},
  {"line":3153,"text":"\tcase lsutil.ScriptElementKindEnumMemberElement:"},
  {"line":3154,"text":"\t\treturn lsproto.CompletionItemKindEnumMember"},
  {"line":3156,"text":"\tcase lsutil.ScriptElementKindModuleElement, lsutil.ScriptElementKindExternalModuleName:"},
  {"line":3157,"text":"\t\treturn lsproto.CompletionItemKindModule"},
  {"line":3159,"text":"\tcase lsutil.ScriptElementKindClassElement, lsutil.ScriptElementKindTypeElement:"},
  {"line":3160,"text":"\t\treturn lsproto.CompletionItemKindClass"},
  {"line":3162,"text":"\tcase lsutil.ScriptElementKindInterfaceElement:"},
  {"line":3163,"text":"\t\treturn lsproto.CompletionItemKindInterface"},
  {"line":3165,"text":"\tcase lsutil.ScriptElementKindWarning:"},
  {"line":3166,"text":"\t\treturn lsproto.CompletionItemKindText"},
  {"line":3168,"text":"\tcase lsutil.ScriptElementKindScriptElement:"},
  {"line":3169,"text":"\t\treturn lsproto.CompletionItemKindFile"},
  {"line":3171,"text":"\tcase lsutil.ScriptElementKindDirectory:"},
  {"line":3172,"text":"\t\treturn lsproto.CompletionItemKindFolder"},
  {"line":3174,"text":"\tcase lsutil.ScriptElementKindString:"},
  {"line":3175,"text":"\t\treturn lsproto.CompletionItemKindConstant"},
  {"line":3177,"text":"\tdefault:"},
  {"line":3178,"text":"\t\treturn lsproto.CompletionItemKindProperty"},
  {"line":3179,"text":"\t}"},
  {"line":3180,"text":"}"},
  {"line":3186,"text":"func CompareCompletionEntries(a, b *lsproto.CompletionItem) int {"},
  {"line":3187,"text":"\tcompareStrings := stringutil.CompareStringsCaseInsensitiveThenSensitive"},
  {"line":3188,"text":"\tresult := compareStrings(*a.SortText, *b.SortText)"},
  {"line":3189,"text":"\tif result == stringutil.ComparisonEqual {"},
  {"line":3190,"text":"\t\tresult = compareStrings(a.Label, b.Label)"},
  {"line":3191,"text":"\t}"},
  {"line":3192,"text":"\treturn result"},
  {"line":3193,"text":"}"},
  {"line":3195,"text":"var ("},
  {"line":3196,"text":"\tkeywordCompletionsCache = collections.SyncMap[KeywordCompletionFilters, []*lsproto.CompletionItem]{}"},
  {"line":3197,"text":"\tallKeywordCompletions   = sync.OnceValue(func() []*lsproto.CompletionItem {"},
  {"line":3198,"text":"\t\tresult := make([]*lsproto.CompletionItem, 0, ast.KindLastKeyword-ast.KindFirstKeyword+1)"},
  {"line":3199,"text":"\t\tfor i := ast.KindFirstKeyword; i <= ast.KindLastKeyword; i++ {"},
  {"line":3200,"text":"\t\t\tresult = append(result, &lsproto.CompletionItem{"},
  {"line":3201,"text":"\t\t\t\tLabel:    scanner.TokenToString(i),"},
  {"line":3202,"text":"\t\t\t\tKind:     new(lsproto.CompletionItemKindKeyword),"},
  {"line":3203,"text":"\t\t\t\tSortText: new(string(SortTextGlobalsOrKeywords)),"},
  {"line":3204,"text":"\t\t\t})"},
  {"line":3205,"text":"\t\t}"},
  {"line":3206,"text":"\t\treturn result"},
  {"line":3207,"text":"\t})"},
  {"line":3208,"text":")"},
  {"line":3210,"text":"func cloneItems(items []*lsproto.CompletionItem) []*lsproto.CompletionItem {"},
  {"line":3211,"text":"\tresult := make([]*lsproto.CompletionItem, len(items))"},
  {"line":3212,"text":"\tfor i, item := range items {"},
  {"line":3213,"text":"\t\titemClone := *item"},
  {"line":3214,"text":"\t\tresult[i] = &itemClone"},
  {"line":3215,"text":"\t}"},
  {"line":3216,"text":"\treturn result"},
  {"line":3217,"text":"}"},
  {"line":3219,"text":"func getKeywordCompletions(keywordFilter KeywordCompletionFilters, filterOutTsOnlyKeywords bool) []*lsproto.CompletionItem {"},
  {"line":3220,"text":"\tif !filterOutTsOnlyKeywords {"},
  {"line":3221,"text":"\t\treturn cloneItems(getTypescriptKeywordCompletions(keywordFilter))"},
  {"line":3222,"text":"\t}"},
  {"line":3224,"text":"\tindex := keywordFilter + KeywordCompletionFiltersLast + 1"},
  {"line":3225,"text":"\tif cached, ok := keywordCompletionsCache.Load(index); ok {"},
  {"line":3226,"text":"\t\treturn cloneItems(cached)"},
  {"line":3227,"text":"\t}"},
  {"line":3228,"text":"\tresult := core.Filter("},
  {"line":3229,"text":"\t\tgetTypescriptKeywordCompletions(keywordFilter),"},
  {"line":3230,"text":"\t\tfunc(ci *lsproto.CompletionItem) bool {"},
  {"line":3231,"text":"\t\t\treturn !isTypeScriptOnlyKeyword(scanner.StringToToken(ci.Label))"},
  {"line":3232,"text":"\t\t})"},
  {"line":3233,"text":"\tkeywordCompletionsCache.Store(index, result)"},
  {"line":3234,"text":"\treturn cloneItems(result)"},
  {"line":3235,"text":"}"},
  {"line":3237,"text":"func getTypescriptKeywordCompletions(keywordFilter KeywordCompletionFilters) []*lsproto.CompletionItem {"},
  {"line":3238,"text":"\tif cached, ok := keywordCompletionsCache.Load(keywordFilter); ok {"},
  {"line":3239,"text":"\t\treturn cached"},
  {"line":3240,"text":"\t}"},
  {"line":3241,"text":"\tresult := core.Filter(allKeywordCompletions(), func(entry *lsproto.CompletionItem) bool {"},
  {"line":3242,"text":"\t\tkind := scanner.StringToToken(entry.Label)"},
  {"line":3243,"text":"\t\tswitch keywordFilter {"},
  {"line":3244,"text":"\t\tcase KeywordCompletionFiltersNone:"},
  {"line":3245,"text":"\t\t\treturn false"},
  {"line":3246,"text":"\t\tcase KeywordCompletionFiltersAll:"},
  {"line":3247,"text":"\t\t\treturn isFunctionLikeBodyKeyword(kind) ||"},
  {"line":3248,"text":"\t\t\t\tkind == ast.KindDeclareKeyword ||"},
  {"line":3249,"text":"\t\t\t\tkind == ast.KindModuleKeyword ||"},
  {"line":3250,"text":"\t\t\t\tkind == ast.KindTypeKeyword ||"},
  {"line":3251,"text":"\t\t\t\tkind == ast.KindNamespaceKeyword ||"},
  {"line":3252,"text":"\t\t\t\tkind == ast.KindAbstractKeyword ||"},
  {"line":3253,"text":"\t\t\t\tisTypeKeyword(kind) && kind != ast.KindUndefinedKeyword"},
  {"line":3254,"text":"\t\tcase KeywordCompletionFiltersFunctionLikeBodyKeywords:"},
  {"line":3255,"text":"\t\t\treturn isFunctionLikeBodyKeyword(kind)"},
  {"line":3256,"text":"\t\tcase KeywordCompletionFiltersClassElementKeywords:"},
  {"line":3257,"text":"\t\t\treturn isClassMemberCompletionKeyword(kind)"},
  {"line":3258,"text":"\t\tcase KeywordCompletionFiltersInterfaceElementKeywords:"},
  {"line":3259,"text":"\t\t\treturn isInterfaceOrTypeLiteralCompletionKeyword(kind)"},
  {"line":3260,"text":"\t\tcase KeywordCompletionFiltersConstructorParameterKeywords:"},
  {"line":3261,"text":"\t\t\treturn ast.IsParameterPropertyModifier(kind)"},
  {"line":3262,"text":"\t\tcase KeywordCompletionFiltersTypeAssertionKeywords:"},
  {"line":3263,"text":"\t\t\treturn isTypeKeyword(kind) || kind == ast.KindConstKeyword"},
  {"line":3264,"text":"\t\tcase KeywordCompletionFiltersTypeKeywords:"},
  {"line":3265,"text":"\t\t\treturn isTypeKeyword(kind)"},
  {"line":3266,"text":"\t\tcase KeywordCompletionFiltersTypeKeyword:"},
  {"line":3267,"text":"\t\t\treturn kind == ast.KindTypeKeyword"},
  {"line":3268,"text":"\t\tdefault:"},
  {"line":3269,"text":"\t\t\tpanic(fmt.Sprintf(\"Unknown keyword filter: %v\", keywordFilter))"},
  {"line":3270,"text":"\t\t}"},
  {"line":3271,"text":"\t})"},
  {"line":3273,"text":"\tkeywordCompletionsCache.Store(keywordFilter, result)"},
  {"line":3274,"text":"\treturn result"},
  {"line":3275,"text":"}"},
  {"line":3277,"text":"func isTypeScriptOnlyKeyword(kind ast.Kind) bool {"},
  {"line":3278,"text":"\tswitch kind {"},
  {"line":3279,"text":"\tcase ast.KindAbstractKeyword,"},
  {"line":3280,"text":"\t\tast.KindAnyKeyword,"},
  {"line":3281,"text":"\t\tast.KindBigIntKeyword,"},
  {"line":3282,"text":"\t\tast.KindBooleanKeyword,"},
  {"line":3283,"text":"\t\tast.KindDeclareKeyword,"},
  {"line":3284,"text":"\t\tast.KindEnumKeyword,"},
  {"line":3285,"text":"\t\tast.KindGlobalKeyword,"},
  {"line":3286,"text":"\t\tast.KindImplementsKeyword,"},
  {"line":3287,"text":"\t\tast.KindInferKeyword,"},
  {"line":3288,"text":"\t\tast.KindInterfaceKeyword,"},
  {"line":3289,"text":"\t\tast.KindIsKeyword,"},
  {"line":3290,"text":"\t\tast.KindKeyOfKeyword,"},
  {"line":3291,"text":"\t\tast.KindModuleKeyword,"},
  {"line":3292,"text":"\t\tast.KindNamespaceKeyword,"},
  {"line":3293,"text":"\t\tast.KindNeverKeyword,"},
  {"line":3294,"text":"\t\tast.KindNumberKeyword,"},
  {"line":3295,"text":"\t\tast.KindObjectKeyword,"},
  {"line":3296,"text":"\t\tast.KindOverrideKeyword,"},
  {"line":3297,"text":"\t\tast.KindPrivateKeyword,"},
  {"line":3298,"text":"\t\tast.KindProtectedKeyword,"},
  {"line":3299,"text":"\t\tast.KindPublicKeyword,"},
  {"line":3300,"text":"\t\tast.KindReadonlyKeyword,"},
  {"line":3301,"text":"\t\tast.KindStringKeyword,"},
  {"line":3302,"text":"\t\tast.KindSymbolKeyword,"},
  {"line":3303,"text":"\t\tast.KindTypeKeyword,"},
  {"line":3304,"text":"\t\tast.KindUniqueKeyword,"},
  {"line":3305,"text":"\t\tast.KindUnknownKeyword:"},
  {"line":3306,"text":"\t\treturn true"},
  {"line":3307,"text":"\tdefault:"},
  {"line":3308,"text":"\t\treturn false"},
  {"line":3309,"text":"\t}"},
  {"line":3310,"text":"}"},
  {"line":3312,"text":"func isFunctionLikeBodyKeyword(kind ast.Kind) bool {"},
  {"line":3313,"text":"\treturn kind == ast.KindAsyncKeyword ||"},
  {"line":3314,"text":"\t\tkind == ast.KindAwaitKeyword ||"},
  {"line":3315,"text":"\t\tkind == ast.KindUsingKeyword ||"},
  {"line":3316,"text":"\t\tkind == ast.KindAsKeyword ||"},
  {"line":3317,"text":"\t\tkind == ast.KindSatisfiesKeyword ||"},
  {"line":3318,"text":"\t\tkind == ast.KindTypeKeyword ||"},
  {"line":3319,"text":"\t\t!ast.IsContextualKeyword(kind) && !isClassMemberCompletionKeyword(kind)"},
  {"line":3320,"text":"}"},
  {"line":3322,"text":"func isClassMemberCompletionKeyword(kind ast.Kind) bool {"},
  {"line":3323,"text":"\tswitch kind {"},
  {"line":3324,"text":"\tcase ast.KindAbstractKeyword, ast.KindAccessorKeyword, ast.KindConstructorKeyword, ast.KindGetKeyword,"},
  {"line":3325,"text":"\t\tast.KindSetKeyword, ast.KindAsyncKeyword, ast.KindDeclareKeyword, ast.KindOverrideKeyword:"},
  {"line":3326,"text":"\t\treturn true"},
  {"line":3327,"text":"\tdefault:"},
  {"line":3328,"text":"\t\treturn ast.IsClassMemberModifier(kind)"},
  {"line":3329,"text":"\t}"},
  {"line":3330,"text":"}"},
  {"line":3332,"text":"func isInterfaceOrTypeLiteralCompletionKeyword(kind ast.Kind) bool {"},
  {"line":3333,"text":"\treturn kind == ast.KindReadonlyKeyword"},
  {"line":3334,"text":"}"},
  {"line":3336,"text":"func isContextualKeywordInAutoImportableExpressionSpace(keyword string) bool {"},
  {"line":3337,"text":"\treturn keyword == \"abstract\" ||"},
  {"line":3338,"text":"\t\tkeyword == \"async\" ||"},
  {"line":3339,"text":"\t\tkeyword == \"await\" ||"},
  {"line":3340,"text":"\t\tkeyword == \"declare\" ||"},
  {"line":3341,"text":"\t\tkeyword == \"module\" ||"},
  {"line":3342,"text":"\t\tkeyword == \"namespace\" ||"},
  {"line":3343,"text":"\t\tkeyword == \"type\" ||"},
  {"line":3344,"text":"\t\tkeyword == \"satisfies\" ||"},
  {"line":3345,"text":"\t\tkeyword == \"as\""},
  {"line":3346,"text":"}"},
  {"line":3348,"text":"func getContextualKeywords(file *ast.SourceFile, contextToken *ast.Node, position int) []*lsproto.CompletionItem {"},
  {"line":3349,"text":"\tvar entries []*lsproto.CompletionItem"},
  {"line":3356,"text":"\tif contextToken != nil {"},
  {"line":3357,"text":"\t\tparent := contextToken.Parent"},
  {"line":3358,"text":"\t\ttokenLine := scanner.GetECMALineOfPosition(file, contextToken.End())"},
  {"line":3359,"text":"\t\tcurrentLine := scanner.GetECMALineOfPosition(file, position)"},
  {"line":3360,"text":"\t\tif (ast.IsImportDeclaration(parent) ||"},
  {"line":3361,"text":"\t\t\tast.IsExportDeclaration(parent) && parent.ModuleSpecifier() != nil) &&"},
  {"line":3362,"text":"\t\t\tcontextToken == parent.ModuleSpecifier() &&"},
  {"line":3363,"text":"\t\t\ttokenLine == currentLine {"},
  {"line":3364,"text":"\t\t\tentries = append(entries, &lsproto.CompletionItem{"},
  {"line":3365,"text":"\t\t\t\tLabel:    scanner.TokenToString(ast.KindAssertKeyword),"},
  {"line":3366,"text":"\t\t\t\tKind:     new(lsproto.CompletionItemKindKeyword),"},
  {"line":3367,"text":"\t\t\t\tSortText: new(string(SortTextGlobalsOrKeywords)),"},
  {"line":3368,"text":"\t\t\t})"},
  {"line":3369,"text":"\t\t}"},
  {"line":3370,"text":"\t}"},
  {"line":3371,"text":"\treturn entries"},
  {"line":3372,"text":"}"},
  {"line":3374,"text":"func (l *LanguageService) getJSCompletionEntries("},
  {"line":3375,"text":"\tctx context.Context,"},
  {"line":3376,"text":"\tfile *ast.SourceFile,"},
  {"line":3377,"text":"\tposition int,"},
  {"line":3378,"text":"\tuniqueNames *collections.Set[string],"},
  {"line":3379,"text":"\tsortedEntries []*lsproto.CompletionItem,"},
  {"line":3380,"text":") []*lsproto.CompletionItem {"},
  {"line":3381,"text":"\tnameTable := file.GetNameTable()"},
  {"line":3382,"text":"\tfor name, pos := range nameTable {"},
  {"line":3384,"text":"\t\tif pos == position {"},
  {"line":3385,"text":"\t\t\tcontinue"},
  {"line":3386,"text":"\t\t}"},
  {"line":3387,"text":"\t\tif !uniqueNames.Has(name) && scanner.IsIdentifierText(name, core.LanguageVariantStandard) {"},
  {"line":3388,"text":"\t\t\tuniqueNames.Add(name)"},
  {"line":3389,"text":"\t\t\tsortedEntries = append(sortedEntries, &lsproto.CompletionItem{"},
  {"line":3390,"text":"\t\t\t\tLabel:            name,"},
  {"line":3391,"text":"\t\t\t\tKind:             new(lsproto.CompletionItemKindText),"},
  {"line":3392,"text":"\t\t\t\tSortText:         new(string(SortTextJavascriptIdentifiers)),"},
  {"line":3393,"text":"\t\t\t\tCommitCharacters: new([]string{}),"},
  {"line":3394,"text":"\t\t\t})"},
  {"line":3395,"text":"\t\t}"},
  {"line":3396,"text":"\t}"},
  {"line":3397,"text":"\treturn sortedEntries"},
  {"line":3398,"text":"}"},
  {"line":3400,"text":"func (l *LanguageService) getOptionalReplacementSpan(location *ast.Node, file *ast.SourceFile) *lsproto.Range {"},
  {"line":3402,"text":"\tif location != nil && (location.Kind == ast.KindIdentifier || location.Kind == ast.KindPrivateIdentifier) {"},
  {"line":3403,"text":"\t\tstart := astnav.GetStartOfNode(location, file, false /*includeJSDoc*/)"},
  {"line":3404,"text":"\t\treturn new(l.createLspRangeFromBounds(start, location.End(), file))"},
  {"line":3405,"text":"\t}"},
  {"line":3406,"text":"\treturn nil"},
  {"line":3407,"text":"}"},
  {"line":3409,"text":"func isMemberCompletionKind(kind CompletionKind) bool {"},
  {"line":3410,"text":"\treturn kind == CompletionKindObjectPropertyDeclaration ||"},
  {"line":3411,"text":"\t\tkind == CompletionKindMemberLike ||"},
  {"line":3412,"text":"\t\tkind == CompletionKindPropertyAccess"},
  {"line":3413,"text":"}"},
  {"line":3415,"text":"func tryGetFunctionLikeBodyCompletionContainer(contextToken *ast.Node) *ast.Node {"},
  {"line":3416,"text":"\tif contextToken == nil {"},
  {"line":3417,"text":"\t\treturn nil"},
  {"line":3418,"text":"\t}"},
  {"line":3420,"text":"\tvar prev *ast.Node"},
  {"line":3421,"text":"\tcontainer := ast.FindAncestorOrQuit(contextToken, func(node *ast.Node) ast.FindAncestorResult {"},
  {"line":3422,"text":"\t\tif ast.IsClassLike(node) {"},
  {"line":3423,"text":"\t\t\treturn ast.FindAncestorQuit"},
  {"line":3424,"text":"\t\t}"},
  {"line":3425,"text":"\t\tif ast.IsFunctionLikeDeclaration(node) && prev == node.Body() {"},
  {"line":3426,"text":"\t\t\treturn ast.FindAncestorTrue"},
  {"line":3427,"text":"\t\t}"},
  {"line":3428,"text":"\t\tprev = node"},
  {"line":3429,"text":"\t\treturn ast.FindAncestorFalse"},
  {"line":3430,"text":"\t})"},
  {"line":3431,"text":"\treturn container"},
  {"line":3432,"text":"}"},
  {"line":3434,"text":"func computeCommitCharactersAndIsNewIdentifier("},
  {"line":3435,"text":"\tcontextToken *ast.Node,"},
  {"line":3436,"text":"\tfile *ast.SourceFile,"},
  {"line":3437,"text":"\tposition int,"},
  {"line":3438,"text":") (isNewIdentifierLocation bool, defaultCommitCharacters []string) {"},
  {"line":3439,"text":"\tif contextToken == nil {"},
  {"line":3440,"text":"\t\treturn false, allCommitCharacters"},
  {"line":3441,"text":"\t}"},
  {"line":3442,"text":"\tcontainingNodeKind := contextToken.Parent.Kind"},
  {"line":3443,"text":"\ttokenKind := keywordForNode(contextToken)"},
  {"line":3445,"text":"\tswitch tokenKind {"},
  {"line":3446,"text":"\tcase ast.KindCommaToken:"},
  {"line":3447,"text":"\t\tswitch containingNodeKind {"},
  {"line":3450,"text":"\t\tcase ast.KindCallExpression, ast.KindNewExpression:"},
  {"line":3451,"text":"\t\t\texpression := contextToken.Parent.Expression()"},
  {"line":3453,"text":"\t\t\tif getLineOfPosition(file, expression.End()) != getLineOfPosition(file, position) {"},
  {"line":3454,"text":"\t\t\t\treturn true, noCommaCommitCharacters"},
  {"line":3455,"text":"\t\t\t}"},
  {"line":3456,"text":"\t\t\treturn true, allCommitCharacters"},
  {"line":3458,"text":"\t\tcase ast.KindBinaryExpression:"},
  {"line":3459,"text":"\t\t\treturn true, noCommaCommitCharacters"},
  {"line":3463,"text":"\t\tcase ast.KindConstructor, ast.KindFunctionType, ast.KindObjectLiteralExpression:"},
  {"line":3464,"text":"\t\t\treturn true, emptyCommitCharacters"},
  {"line":3466,"text":"\t\tcase ast.KindArrayLiteralExpression:"},
  {"line":3467,"text":"\t\t\treturn true, allCommitCharacters"},
  {"line":3468,"text":"\t\tdefault:"},
  {"line":3469,"text":"\t\t\treturn false, allCommitCharacters"},
  {"line":3470,"text":"\t\t}"},
  {"line":3471,"text":"\tcase ast.KindOpenParenToken:"},
  {"line":3472,"text":"\t\tswitch containingNodeKind {"},
  {"line":3475,"text":"\t\tcase ast.KindCallExpression, ast.KindNewExpression:"},
  {"line":3476,"text":"\t\t\texpression := contextToken.Parent.Expression()"},
  {"line":3478,"text":"\t\t\tif getLineOfPosition(file, expression.End()) != getLineOfPosition(file, position) {"},
  {"line":3479,"text":"\t\t\t\treturn true, noCommaCommitCharacters"},
  {"line":3480,"text":"\t\t\t}"},
  {"line":3481,"text":"\t\t\treturn true, allCommitCharacters"},
  {"line":3483,"text":"\t\tcase ast.KindParenthesizedExpression:"},
  {"line":3484,"text":"\t\t\treturn true, noCommaCommitCharacters"},
  {"line":3487,"text":"\t\tcase ast.KindConstructor, ast.KindParenthesizedType:"},
  {"line":3488,"text":"\t\t\treturn true, emptyCommitCharacters"},
  {"line":3489,"text":"\t\tdefault:"},
  {"line":3490,"text":"\t\t\treturn false, allCommitCharacters"},
  {"line":3491,"text":"\t\t}"},
  {"line":3492,"text":"\tcase ast.KindOpenBracketToken:"},
  {"line":3493,"text":"\t\tswitch containingNodeKind {"},
  {"line":3498,"text":"\t\tcase ast.KindArrayLiteralExpression, ast.KindIndexSignature, ast.KindTupleType, ast.KindComputedPropertyName:"},
  {"line":3499,"text":"\t\t\treturn true, allCommitCharacters"},
  {"line":3500,"text":"\t\tdefault:"},
  {"line":3501,"text":"\t\t\treturn false, allCommitCharacters"},
  {"line":3502,"text":"\t\t}"},
  {"line":3506,"text":"\tcase ast.KindModuleKeyword, ast.KindNamespaceKeyword, ast.KindImportKeyword:"},
  {"line":3507,"text":"\t\treturn true, emptyCommitCharacters"},
  {"line":3508,"text":"\tcase ast.KindDotToken:"},
  {"line":3509,"text":"\t\tswitch containingNodeKind {"},
  {"line":3511,"text":"\t\tcase ast.KindModuleDeclaration:"},
  {"line":3512,"text":"\t\t\treturn true, emptyCommitCharacters"},
  {"line":3513,"text":"\t\tdefault:"},
  {"line":3514,"text":"\t\t\treturn false, allCommitCharacters"},
  {"line":3515,"text":"\t\t}"},
  {"line":3516,"text":"\tcase ast.KindOpenBraceToken:"},
  {"line":3517,"text":"\t\tswitch containingNodeKind {"},
  {"line":3520,"text":"\t\tcase ast.KindClassDeclaration, ast.KindObjectLiteralExpression:"},
  {"line":3521,"text":"\t\t\treturn true, emptyCommitCharacters"},
  {"line":3522,"text":"\t\tdefault:"},
  {"line":3523,"text":"\t\t\treturn false, allCommitCharacters"},
  {"line":3524,"text":"\t\t}"},
  {"line":3525,"text":"\tcase ast.KindEqualsToken:"},
  {"line":3526,"text":"\t\tswitch containingNodeKind {"},
  {"line":3529,"text":"\t\tcase ast.KindVariableDeclaration, ast.KindBinaryExpression:"},
  {"line":3530,"text":"\t\t\treturn true, allCommitCharacters"},
  {"line":3531,"text":"\t\tdefault:"},
  {"line":3532,"text":"\t\t\treturn false, allCommitCharacters"},
  {"line":3533,"text":"\t\t}"},
  {"line":3534,"text":"\tcase ast.KindTemplateHead:"},
  {"line":3536,"text":"\t\treturn containingNodeKind == ast.KindTemplateExpression, allCommitCharacters"},
  {"line":3537,"text":"\tcase ast.KindTemplateMiddle:"},
  {"line":3539,"text":"\t\treturn containingNodeKind == ast.KindTemplateSpan, allCommitCharacters"},
  {"line":3540,"text":"\tcase ast.KindAsyncKeyword:"},
  {"line":3543,"text":"\t\tif containingNodeKind == ast.KindMethodDeclaration || containingNodeKind == ast.KindShorthandPropertyAssignment {"},
  {"line":3544,"text":"\t\t\treturn true, emptyCommitCharacters"},
  {"line":3545,"text":"\t\t}"},
  {"line":3546,"text":"\t\treturn false, allCommitCharacters"},
  {"line":3547,"text":"\tcase ast.KindAsteriskToken:"},
  {"line":3549,"text":"\t\tif containingNodeKind == ast.KindMethodDeclaration {"},
  {"line":3550,"text":"\t\t\treturn true, emptyCommitCharacters"},
  {"line":3551,"text":"\t\t}"},
  {"line":3552,"text":"\t\treturn false, allCommitCharacters"},
  {"line":3553,"text":"\t}"},
  {"line":3555,"text":"\tif isClassMemberCompletionKeyword(tokenKind) {"},
  {"line":3556,"text":"\t\treturn true, emptyCommitCharacters"},
  {"line":3557,"text":"\t}"},
  {"line":3559,"text":"\treturn false, allCommitCharacters"},
  {"line":3560,"text":"}"},
  {"line":3562,"text":"func keywordForNode(node *ast.Node) ast.Kind {"},
  {"line":3563,"text":"\tif ast.IsIdentifier(node) {"},
  {"line":3564,"text":"\t\treturn scanner.IdentifierToKeywordKind(node.AsIdentifier())"},
  {"line":3565,"text":"\t}"},
  {"line":3566,"text":"\treturn node.Kind"},
  {"line":3567,"text":"}"},
  {"line":3571,"text":"func getScopeNode(initialToken *ast.Node, position int, file *ast.SourceFile) *ast.Node {"},
  {"line":3572,"text":"\tscope := initialToken"},
  {"line":3573,"text":"\tfor scope != nil && !positionBelongsToNode(scope, position, file) {"},
  {"line":3574,"text":"\t\tscope = scope.Parent"},
  {"line":3575,"text":"\t}"},
  {"line":3576,"text":"\treturn scope"},
  {"line":3577,"text":"}"},
  {"line":3579,"text":"func isSnippetScope(scopeNode *ast.Node) bool {"},
  {"line":3580,"text":"\tswitch scopeNode.Kind {"},
  {"line":3581,"text":"\tcase ast.KindSourceFile,"},
  {"line":3582,"text":"\t\tast.KindTemplateExpression,"},
  {"line":3583,"text":"\t\tast.KindJsxExpression,"},
  {"line":3584,"text":"\t\tast.KindBlock:"},
  {"line":3585,"text":"\t\treturn true"},
  {"line":3586,"text":"\tdefault:"},
  {"line":3587,"text":"\t\treturn ast.IsStatement(scopeNode)"},
  {"line":3588,"text":"\t}"},
  {"line":3589,"text":"}"},
  {"line":3592,"text":"func isProbablyGlobalType(t *checker.Type, file *ast.SourceFile, typeChecker *checker.Checker) bool {"},
  {"line":3595,"text":"\tselfSymbol := typeChecker.GetGlobalSymbol(\"self\", ast.SymbolFlagsValue, nil /*diagnostic*/)"},
  {"line":3596,"text":"\tif selfSymbol != nil && typeChecker.GetTypeOfSymbolAtLocation(selfSymbol, file.AsNode()) == t {"},
  {"line":3597,"text":"\t\treturn true"},
  {"line":3598,"text":"\t}"},
  {"line":3599,"text":"\tglobalSymbol := typeChecker.GetGlobalSymbol(\"global\", ast.SymbolFlagsValue, nil /*diagnostic*/)"},
  {"line":3600,"text":"\tif globalSymbol != nil && typeChecker.GetTypeOfSymbolAtLocation(globalSymbol, file.AsNode()) == t {"},
  {"line":3601,"text":"\t\treturn true"},
  {"line":3602,"text":"\t}"},
  {"line":3603,"text":"\tglobalThisSymbol := typeChecker.GetGlobalSymbol(\"globalThis\", ast.SymbolFlagsValue, nil /*diagnostic*/)"},
  {"line":3604,"text":"\tif globalThisSymbol != nil && typeChecker.GetTypeOfSymbolAtLocation(globalThisSymbol, file.AsNode()) == t {"},
  {"line":3605,"text":"\t\treturn true"},
  {"line":3606,"text":"\t}"},
  {"line":3607,"text":"\treturn false"},
  {"line":3608,"text":"}"},
  {"line":3610,"text":"func tryGetTypeLiteralNode(node *ast.Node) *ast.TypeLiteralNodeNode {"},
  {"line":3611,"text":"\tif node == nil {"},
  {"line":3612,"text":"\t\treturn nil"},
  {"line":3613,"text":"\t}"},
  {"line":3615,"text":"\tparent := node.Parent"},
  {"line":3616,"text":"\tswitch node.Kind {"},
  {"line":3617,"text":"\tcase ast.KindOpenBraceToken:"},
  {"line":3618,"text":"\t\tif ast.IsTypeLiteralNode(parent) {"},
  {"line":3619,"text":"\t\t\treturn parent"},
  {"line":3620,"text":"\t\t}"},
  {"line":3621,"text":"\tcase ast.KindSemicolonToken, ast.KindCommaToken, ast.KindIdentifier:"},
  {"line":3622,"text":"\t\tif parent.Kind == ast.KindPropertySignature && ast.IsTypeLiteralNode(parent.Parent) {"},
  {"line":3623,"text":"\t\t\treturn parent.Parent"},
  {"line":3624,"text":"\t\t}"},
  {"line":3625,"text":"\t}"},
  {"line":3627,"text":"\treturn nil"},
  {"line":3628,"text":"}"},
  {"line":3630,"text":"func getConstraintOfTypeArgumentProperty(node *ast.Node, typeChecker *checker.Checker) *checker.Type {"},
  {"line":3631,"text":"\tif node == nil {"},
  {"line":3632,"text":"\t\treturn nil"},
  {"line":3633,"text":"\t}"},
  {"line":3635,"text":"\tif ast.IsTypeNode(node) {"},
  {"line":3636,"text":"\t\tconstraint := typeChecker.GetTypeArgumentConstraint(node)"},
  {"line":3637,"text":"\t\tif constraint != nil {"},
  {"line":3638,"text":"\t\t\treturn constraint"},
  {"line":3639,"text":"\t\t}"},
  {"line":3640,"text":"\t}"},
  {"line":3642,"text":"\tt := getConstraintOfTypeArgumentProperty(node.Parent, typeChecker)"},
  {"line":3643,"text":"\tif t == nil {"},
  {"line":3644,"text":"\t\treturn nil"},
  {"line":3645,"text":"\t}"},
  {"line":3647,"text":"\tswitch node.Kind {"},
  {"line":3648,"text":"\tcase ast.KindPropertySignature:"},
  {"line":3650,"text":"\t\treparsed := ast.GetReparsedNodeForNode(node)"},
  {"line":3651,"text":"\t\tif symbol := reparsed.Symbol(); symbol != nil {"},
  {"line":3652,"text":"\t\t\treturn typeChecker.GetTypeOfPropertyOfContextualType(t, symbol.Name)"},
  {"line":3653,"text":"\t\t}"},
  {"line":3658,"text":"\t\tif name, ok := ast.TryGetTextOfPropertyName(reparsed.Name()); ok {"},
  {"line":3659,"text":"\t\t\treturn typeChecker.GetTypeOfPropertyOfContextualType(t, name)"},
  {"line":3660,"text":"\t\t}"},
  {"line":3662,"text":"\t\treturn nil"},
  {"line":3663,"text":"\tcase ast.KindColonToken:"},
  {"line":3664,"text":"\t\tif node.Parent.Kind == ast.KindPropertySignature {"},
  {"line":3667,"text":"\t\t\treturn t"},
  {"line":3668,"text":"\t\t}"},
  {"line":3669,"text":"\tcase ast.KindIntersectionType, ast.KindTypeLiteral, ast.KindUnionType:"},
  {"line":3670,"text":"\t\treturn t"},
  {"line":3671,"text":"\tcase ast.KindOpenBracketToken:"},
  {"line":3672,"text":"\t\treturn typeChecker.GetElementTypeOfArrayType(t)"},
  {"line":3673,"text":"\t}"},
  {"line":3675,"text":"\treturn nil"},
  {"line":3676,"text":"}"},
  {"line":3678,"text":"func tryGetObjectLikeCompletionContainer(contextToken *ast.Node, position int, file *ast.SourceFile) *ast.ObjectLiteralLike {"},
  {"line":3679,"text":"\tif contextToken == nil {"},
  {"line":3680,"text":"\t\treturn nil"},
  {"line":3681,"text":"\t}"},
  {"line":3683,"text":"\tparent := contextToken.Parent"},
  {"line":3684,"text":"\tswitch contextToken.Kind {"},
  {"line":3687,"text":"\tcase ast.KindOpenBraceToken, ast.KindCommaToken:"},
  {"line":3688,"text":"\t\tif ast.IsObjectLiteralExpression(parent) || ast.IsObjectBindingPattern(parent) {"},
  {"line":3689,"text":"\t\t\treturn parent"},
  {"line":3690,"text":"\t\t}"},
  {"line":3691,"text":"\tcase ast.KindAsteriskToken:"},
  {"line":3692,"text":"\t\tif ast.IsMethodDeclaration(parent) && ast.IsObjectLiteralExpression(parent.Parent) {"},
  {"line":3693,"text":"\t\t\treturn parent.Parent"},
  {"line":3694,"text":"\t\t}"},
  {"line":3695,"text":"\tcase ast.KindAsyncKeyword:"},
  {"line":3696,"text":"\t\tif ast.IsObjectLiteralExpression(parent.Parent) {"},
  {"line":3697,"text":"\t\t\treturn parent.Parent"},
  {"line":3698,"text":"\t\t}"},
  {"line":3699,"text":"\tcase ast.KindIdentifier:"},
  {"line":3700,"text":"\t\tif contextToken.Text() == \"async\" && ast.IsShorthandPropertyAssignment(parent) {"},
  {"line":3701,"text":"\t\t\treturn parent.Parent"},
  {"line":3702,"text":"\t\t} else {"},
  {"line":3703,"text":"\t\t\tif ast.IsObjectLiteralExpression(parent.Parent) &&"},
  {"line":3704,"text":"\t\t\t\t(ast.IsSpreadAssignment(parent) ||"},
  {"line":3705,"text":"\t\t\t\t\tast.IsShorthandPropertyAssignment(parent) &&"},
  {"line":3706,"text":"\t\t\t\t\t\tgetLineOfPosition(file, contextToken.End()) != getLineOfPosition(file, position)) {"},
  {"line":3707,"text":"\t\t\t\treturn parent.Parent"},
  {"line":3708,"text":"\t\t\t}"},
  {"line":3709,"text":"\t\t\tancestorNode := ast.FindAncestor(parent, ast.IsPropertyAssignment)"},
  {"line":3710,"text":"\t\t\tif ancestorNode != nil && lsutil.GetLastToken(ancestorNode, file) == contextToken && ast.IsObjectLiteralExpression(ancestorNode.Parent) {"},
  {"line":3711,"text":"\t\t\t\treturn ancestorNode.Parent"},
  {"line":3712,"text":"\t\t\t}"},
  {"line":3713,"text":"\t\t}"},
  {"line":3714,"text":"\tdefault:"},
  {"line":3715,"text":"\t\tif parent.Parent != nil && parent.Parent.Parent != nil &&"},
  {"line":3716,"text":"\t\t\t(ast.IsMethodDeclaration(parent.Parent) ||"},
  {"line":3717,"text":"\t\t\t\tast.IsGetAccessorDeclaration(parent.Parent) ||"},
  {"line":3718,"text":"\t\t\t\tast.IsSetAccessorDeclaration(parent.Parent)) &&"},
  {"line":3719,"text":"\t\t\tast.IsObjectLiteralExpression(parent.Parent.Parent) {"},
  {"line":3720,"text":"\t\t\treturn parent.Parent.Parent"},
  {"line":3721,"text":"\t\t}"},
  {"line":3722,"text":"\t\tif ast.IsSpreadAssignment(parent) && ast.IsObjectLiteralExpression(parent.Parent) {"},
  {"line":3723,"text":"\t\t\treturn parent.Parent"},
  {"line":3724,"text":"\t\t}"},
  {"line":3725,"text":"\t\tancestorNode := ast.FindAncestor(parent, ast.IsPropertyAssignment)"},
  {"line":3726,"text":"\t\tif contextToken.Kind != ast.KindColonToken &&"},
  {"line":3727,"text":"\t\t\tancestorNode != nil && lsutil.GetLastToken(ancestorNode, file) == contextToken &&"},
  {"line":3728,"text":"\t\t\tast.IsObjectLiteralExpression(ancestorNode.Parent) {"},
  {"line":3729,"text":"\t\t\treturn ancestorNode.Parent"},
  {"line":3730,"text":"\t\t}"},
  {"line":3731,"text":"\t}"},
  {"line":3733,"text":"\treturn nil"},
  {"line":3734,"text":"}"},
  {"line":3736,"text":"func tryGetObjectLiteralContextualType(node *ast.ObjectLiteralExpressionNode, typeChecker *checker.Checker) *checker.Type {"},
  {"line":3737,"text":"\tt := typeChecker.GetContextualType(node, checker.ContextFlagsNone)"},
  {"line":3738,"text":"\tif t != nil {"},
  {"line":3739,"text":"\t\treturn t"},
  {"line":3740,"text":"\t}"},
  {"line":3742,"text":"\tparent := ast.WalkUpParenthesizedExpressions(node.Parent)"},
  {"line":3743,"text":"\tif ast.IsBinaryExpression(parent) &&"},
  {"line":3744,"text":"\t\tparent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken &&"},
  {"line":3745,"text":"\t\tnode == parent.AsBinaryExpression().Left {"},
  {"line":3747,"text":"\t\treturn typeChecker.GetTypeAtLocation(parent)"},
  {"line":3748,"text":"\t}"},
  {"line":3749,"text":"\tif ast.IsExpression(parent) {"},
  {"line":3751,"text":"\t\treturn typeChecker.GetContextualType(parent, checker.ContextFlagsNone)"},
  {"line":3752,"text":"\t}"},
  {"line":3754,"text":"\treturn nil"},
  {"line":3755,"text":"}"},
  {"line":3757,"text":"func getPropertiesForObjectExpression("},
  {"line":3758,"text":"\tcontextualType *checker.Type,"},
  {"line":3759,"text":"\tcompletionsType *checker.Type,"},
  {"line":3760,"text":"\tobj *ast.Node,"},
  {"line":3761,"text":"\ttypeChecker *checker.Checker,"},
  {"line":3762,"text":") []*ast.Symbol {"},
  {"line":3763,"text":"\thasCompletionsType := completionsType != nil && completionsType != contextualType"},
  {"line":3764,"text":"\tvar types []*checker.Type"},
  {"line":3765,"text":"\tif contextualType.IsUnion() {"},
  {"line":3766,"text":"\t\ttypes = contextualType.Types()"},
  {"line":3767,"text":"\t} else {"},
  {"line":3768,"text":"\t\ttypes = []*checker.Type{contextualType}"},
  {"line":3769,"text":"\t}"},
  {"line":3770,"text":"\tpromiseFilteredContextualType := typeChecker.GetUnionType(core.Filter(types, func(t *checker.Type) bool {"},
  {"line":3771,"text":"\t\treturn typeChecker.GetPromisedTypeOfPromise(t) == nil"},
  {"line":3772,"text":"\t}))"},
  {"line":3774,"text":"\tvar t *checker.Type"},
  {"line":3775,"text":"\tif hasCompletionsType && completionsType.Flags()&checker.TypeFlagsAnyOrUnknown == 0 {"},
  {"line":3776,"text":"\t\tt = typeChecker.GetUnionType([]*checker.Type{promiseFilteredContextualType, completionsType})"},
  {"line":3777,"text":"\t} else {"},
  {"line":3778,"text":"\t\tt = promiseFilteredContextualType"},
  {"line":3779,"text":"\t}"},
  {"line":3786,"text":"\thasDeclarationOtherThanSelf := func(member *ast.Symbol) bool {"},
  {"line":3787,"text":"\t\tif len(member.Declarations) == 0 {"},
  {"line":3788,"text":"\t\t\treturn true"},
  {"line":3789,"text":"\t\t}"},
  {"line":3790,"text":"\t\treturn core.Some(member.Declarations, func(decl *ast.Declaration) bool { return decl.Parent != obj })"},
  {"line":3791,"text":"\t}"},
  {"line":3793,"text":"\tproperties := getApparentProperties(t, obj, typeChecker)"},
  {"line":3794,"text":"\tif t.IsClass() && containsNonPublicProperties(properties) {"},
  {"line":3795,"text":"\t\treturn nil"},
  {"line":3796,"text":"\t} else if hasCompletionsType {"},
  {"line":3797,"text":"\t\treturn core.Filter(properties, hasDeclarationOtherThanSelf)"},
  {"line":3798,"text":"\t} else {"},
  {"line":3799,"text":"\t\treturn properties"},
  {"line":3800,"text":"\t}"},
  {"line":3801,"text":"}"},
  {"line":3803,"text":"func getApparentProperties(t *checker.Type, node *ast.Node, typeChecker *checker.Checker) []*ast.Symbol {"},
  {"line":3804,"text":"\tif !t.IsUnion() {"},
  {"line":3805,"text":"\t\treturn typeChecker.GetApparentProperties(t)"},
  {"line":3806,"text":"\t}"},
  {"line":3807,"text":"\treturn typeChecker.GetAllPossiblePropertiesOfTypes(core.Filter(t.Types(), func(memberType *checker.Type) bool {"},
  {"line":3808,"text":"\t\treturn !(memberType.Flags()&checker.TypeFlagsPrimitive != 0 ||"},
  {"line":3809,"text":"\t\t\ttypeChecker.IsArrayLikeType(memberType) ||"},
  {"line":3810,"text":"\t\t\ttypeChecker.IsTypeInvalidDueToUnionDiscriminant(memberType, node) ||"},
  {"line":3811,"text":"\t\t\ttypeChecker.TypeHasCallOrConstructSignatures(memberType) ||"},
  {"line":3812,"text":"\t\t\tmemberType.IsClass() && containsNonPublicProperties(typeChecker.GetApparentProperties(memberType)))"},
  {"line":3813,"text":"\t}))"},
  {"line":3814,"text":"}"},
  {"line":3816,"text":"func containsNonPublicProperties(props []*ast.Symbol) bool {"},
  {"line":3817,"text":"\treturn core.Some(props, func(p *ast.Symbol) bool {"},
  {"line":3818,"text":"\t\treturn checker.GetDeclarationModifierFlagsFromSymbol(p)&ast.ModifierFlagsNonPublicAccessibilityModifier != 0"},
  {"line":3819,"text":"\t})"},
  {"line":3820,"text":"}"},
  {"line":3824,"text":"func filterObjectMembersList("},
  {"line":3825,"text":"\tcontextualMemberSymbols []*ast.Symbol,"},
  {"line":3826,"text":"\texistingMembers []*ast.Declaration,"},
  {"line":3827,"text":"\tfile *ast.SourceFile,"},
  {"line":3828,"text":"\tposition int,"},
  {"line":3829,"text":"\ttypeChecker *checker.Checker,"},
  {"line":3830,"text":") (filteredMembers []*ast.Symbol, spreadMemberNames collections.Set[string]) {"},
  {"line":3831,"text":"\tif len(existingMembers) == 0 {"},
  {"line":3832,"text":"\t\treturn contextualMemberSymbols, collections.Set[string]{}"},
  {"line":3833,"text":"\t}"},
  {"line":3835,"text":"\tmembersDeclaredBySpreadAssignment := collections.Set[string]{}"},
  {"line":3836,"text":"\texistingMemberNames := collections.Set[string]{}"},
  {"line":3837,"text":"\tfor _, member := range existingMembers {"},
  {"line":3839,"text":"\t\tif member.Kind != ast.KindPropertyAssignment &&"},
  {"line":3840,"text":"\t\t\tmember.Kind != ast.KindShorthandPropertyAssignment &&"},
  {"line":3841,"text":"\t\t\tmember.Kind != ast.KindBindingElement &&"},
  {"line":3842,"text":"\t\t\tmember.Kind != ast.KindMethodDeclaration &&"},
  {"line":3843,"text":"\t\t\tmember.Kind != ast.KindGetAccessor &&"},
  {"line":3844,"text":"\t\t\tmember.Kind != ast.KindSetAccessor &&"},
  {"line":3845,"text":"\t\t\tmember.Kind != ast.KindSpreadAssignment {"},
  {"line":3846,"text":"\t\t\tcontinue"},
  {"line":3847,"text":"\t\t}"},
  {"line":3850,"text":"\t\tif isCurrentlyEditingNode(member, file, position) {"},
  {"line":3851,"text":"\t\t\tcontinue"},
  {"line":3852,"text":"\t\t}"},
  {"line":3854,"text":"\t\tvar existingName string"},
  {"line":3856,"text":"\t\tif ast.IsSpreadAssignment(member) {"},
  {"line":3857,"text":"\t\t\tsetMemberDeclaredBySpreadAssignment(member, &membersDeclaredBySpreadAssignment, typeChecker)"},
  {"line":3858,"text":"\t\t} else if ast.IsBindingElement(member) && member.PropertyName() != nil {"},
  {"line":3860,"text":"\t\t\tif member.PropertyName().Kind == ast.KindIdentifier {"},
  {"line":3861,"text":"\t\t\t\texistingName = member.PropertyName().Text()"},
  {"line":3862,"text":"\t\t\t}"},
  {"line":3863,"text":"\t\t} else {"},
  {"line":3867,"text":"\t\t\tname := ast.GetNameOfDeclaration(member)"},
  {"line":3868,"text":"\t\t\tif name != nil && ast.IsPropertyNameLiteral(name) {"},
  {"line":3869,"text":"\t\t\t\texistingName = name.Text()"},
  {"line":3870,"text":"\t\t\t}"},
  {"line":3871,"text":"\t\t}"},
  {"line":3873,"text":"\t\tif existingName != \"\" {"},
  {"line":3874,"text":"\t\t\texistingMemberNames.Add(existingName)"},
  {"line":3875,"text":"\t\t}"},
  {"line":3876,"text":"\t}"},
  {"line":3878,"text":"\tfilteredSymbols := core.Filter(contextualMemberSymbols, func(m *ast.Symbol) bool {"},
  {"line":3879,"text":"\t\treturn !existingMemberNames.Has(m.Name)"},
  {"line":3880,"text":"\t})"},
  {"line":3882,"text":"\treturn filteredSymbols, membersDeclaredBySpreadAssignment"},
  {"line":3883,"text":"}"},
  {"line":3885,"text":"func isCurrentlyEditingNode(node *ast.Node, file *ast.SourceFile, position int) bool {"},
  {"line":3886,"text":"\tstart := astnav.GetStartOfNode(node, file, false /*includeJSDoc*/)"},
  {"line":3887,"text":"\treturn start <= position && position <= node.End()"},
  {"line":3888,"text":"}"},
  {"line":3890,"text":"func setMemberDeclaredBySpreadAssignment(declaration *ast.Node, members *collections.Set[string], typeChecker *checker.Checker) {"},
  {"line":3891,"text":"\texpression := declaration.Expression()"},
  {"line":3892,"text":"\tsymbol := typeChecker.GetSymbolAtLocation(expression)"},
  {"line":3893,"text":"\tvar t *checker.Type"},
  {"line":3894,"text":"\tif symbol != nil {"},
  {"line":3895,"text":"\t\tt = typeChecker.GetTypeOfSymbolAtLocation(symbol, expression)"},
  {"line":3896,"text":"\t}"},
  {"line":3897,"text":"\tvar properties []*ast.Symbol"},
  {"line":3898,"text":"\tif t != nil && t.Flags()&checker.TypeFlagsStructuredType != 0 {"},
  {"line":3899,"text":"\t\tproperties = t.AsStructuredType().Properties()"},
  {"line":3900,"text":"\t}"},
  {"line":3901,"text":"\tfor _, property := range properties {"},
  {"line":3902,"text":"\t\tmembers.Add(property.Name)"},
  {"line":3903,"text":"\t}"},
  {"line":3904,"text":"}"},
  {"line":3908,"text":"func tryGetConstructorLikeCompletionContainer(contextToken *ast.Node) *ast.ConstructorDeclarationNode {"},
  {"line":3909,"text":"\tif contextToken == nil {"},
  {"line":3910,"text":"\t\treturn nil"},
  {"line":3911,"text":"\t}"},
  {"line":3913,"text":"\tparent := contextToken.Parent"},
  {"line":3914,"text":"\tswitch contextToken.Kind {"},
  {"line":3915,"text":"\tcase ast.KindOpenParenToken, ast.KindCommaToken:"},
  {"line":3916,"text":"\t\tif ast.IsConstructorDeclaration(parent) {"},
  {"line":3917,"text":"\t\t\treturn parent"},
  {"line":3918,"text":"\t\t}"},
  {"line":3919,"text":"\t\treturn nil"},
  {"line":3920,"text":"\tdefault:"},
  {"line":3921,"text":"\t\tif isConstructorParameterCompletion(contextToken) {"},
  {"line":3922,"text":"\t\t\treturn parent.Parent"},
  {"line":3923,"text":"\t\t}"},
  {"line":3924,"text":"\t}"},
  {"line":3925,"text":"\treturn nil"},
  {"line":3926,"text":"}"},
  {"line":3928,"text":"func isConstructorParameterCompletion(node *ast.Node) bool {"},
  {"line":3929,"text":"\treturn node.Parent != nil && ast.IsParameterDeclaration(node.Parent) && ast.IsConstructorDeclaration(node.Parent.Parent) &&"},
  {"line":3930,"text":"\t\t(ast.IsParameterPropertyModifier(node.Kind) || ast.IsDeclarationName(node))"},
  {"line":3931,"text":"}"},
  {"line":3935,"text":"func tryGetObjectTypeDeclarationCompletionContainer("},
  {"line":3936,"text":"\tfile *ast.SourceFile,"},
  {"line":3937,"text":"\tcontextToken *ast.Node,"},
  {"line":3938,"text":"\tlocation *ast.Node,"},
  {"line":3939,"text":"\tposition int,"},
  {"line":3940,"text":") *ast.ObjectTypeDeclaration {"},
  {"line":3942,"text":"\tswitch location.Kind {"},
  {"line":3943,"text":"\tcase ast.KindSyntaxList:"},
  {"line":3944,"text":"\t\tif ast.IsObjectTypeDeclaration(location.Parent) {"},
  {"line":3945,"text":"\t\t\treturn location.Parent"},
  {"line":3946,"text":"\t\t}"},
  {"line":3947,"text":"\t\treturn nil"},
  {"line":3948,"text":"\tcase ast.KindEndOfFile:"},
  {"line":3949,"text":"\t\tstmtList := location.Parent.StatementList()"},
  {"line":3950,"text":"\t\tif stmtList != nil && len(stmtList.Nodes) > 0 && ast.IsObjectTypeDeclaration(stmtList.Nodes[len(stmtList.Nodes)-1]) {"},
  {"line":3951,"text":"\t\t\tcls := stmtList.Nodes[len(stmtList.Nodes)-1]"},
  {"line":3952,"text":"\t\t\tif astnav.FindChildOfKind(cls, ast.KindCloseBraceToken, file) == nil {"},
  {"line":3953,"text":"\t\t\t\treturn cls"},
  {"line":3954,"text":"\t\t\t}"},
  {"line":3955,"text":"\t\t}"},
  {"line":3956,"text":"\tcase ast.KindPrivateIdentifier:"},
  {"line":3957,"text":"\t\tif ast.IsPropertyDeclaration(location.Parent) {"},
  {"line":3958,"text":"\t\t\treturn ast.FindAncestor(location, ast.IsClassLike)"},
  {"line":3959,"text":"\t\t}"},
  {"line":3960,"text":"\tcase ast.KindIdentifier:"},
  {"line":3961,"text":"\t\toriginalKeywordKind := scanner.IdentifierToKeywordKind(location.AsIdentifier())"},
  {"line":3962,"text":"\t\tif originalKeywordKind != ast.KindUnknown {"},
  {"line":3963,"text":"\t\t\treturn nil"},
  {"line":3964,"text":"\t\t}"},
  {"line":3966,"text":"\t\tif ast.IsPropertyDeclaration(location.Parent) && location.Parent.Initializer() == location {"},
  {"line":3967,"text":"\t\t\treturn nil"},
  {"line":3968,"text":"\t\t}"},
  {"line":3970,"text":"\t\tif isFromObjectTypeDeclaration(location) {"},
  {"line":3971,"text":"\t\t\treturn ast.FindAncestor(location, ast.IsObjectTypeDeclaration)"},
  {"line":3972,"text":"\t\t}"},
  {"line":3973,"text":"\t}"},
  {"line":3975,"text":"\tif contextToken == nil {"},
  {"line":3976,"text":"\t\treturn nil"},
  {"line":3977,"text":"\t}"},
  {"line":3982,"text":"\tif location.Kind == ast.KindConstructorKeyword ||"},
  {"line":3983,"text":"\t\t(ast.IsIdentifier(contextToken) && ast.IsPropertyDeclaration(contextToken.Parent) && ast.IsClassLike(location)) {"},
  {"line":3984,"text":"\t\treturn ast.FindAncestor(contextToken, ast.IsClassLike)"},
  {"line":3985,"text":"\t}"},
  {"line":3987,"text":"\tswitch contextToken.Kind {"},
  {"line":3989,"text":"\tcase ast.KindEqualsToken:"},
  {"line":3990,"text":"\t\treturn nil"},
  {"line":3993,"text":"\tcase ast.KindSemicolonToken, ast.KindCloseBraceToken:"},
  {"line":3995,"text":"\t\tif isFromObjectTypeDeclaration(location) && location.Parent.Name() == location {"},
  {"line":3996,"text":"\t\t\treturn location.Parent.Parent"},
  {"line":3997,"text":"\t\t}"},
  {"line":3998,"text":"\t\tif ast.IsObjectTypeDeclaration(location) {"},
  {"line":3999,"text":"\t\t\treturn location"},
  {"line":4000,"text":"\t\t}"},
  {"line":4001,"text":"\t\treturn nil"},
  {"line":4004,"text":"\tcase ast.KindOpenBraceToken, ast.KindCommaToken:"},
  {"line":4005,"text":"\t\tif ast.IsObjectTypeDeclaration(contextToken.Parent) {"},
  {"line":4006,"text":"\t\t\treturn contextToken.Parent"},
  {"line":4007,"text":"\t\t}"},
  {"line":4008,"text":"\t\treturn nil"},
  {"line":4009,"text":"\tdefault:"},
  {"line":4010,"text":"\t\tif ast.IsObjectTypeDeclaration(location) {"},
  {"line":4013,"text":"\t\t\tif getLineOfPosition(file, contextToken.End()) != getLineOfPosition(file, position) {"},
  {"line":4014,"text":"\t\t\t\treturn location"},
  {"line":4015,"text":"\t\t\t}"},
  {"line":4016,"text":"\t\t\tisValidKeyword := core.IfElse("},
  {"line":4017,"text":"\t\t\t\tast.IsClassLike(contextToken.Parent.Parent),"},
  {"line":4018,"text":"\t\t\t\tisClassMemberCompletionKeyword,"},
  {"line":4019,"text":"\t\t\t\tisInterfaceOrTypeLiteralCompletionKeyword,"},
  {"line":4020,"text":"\t\t\t)"},
  {"line":4022,"text":"\t\t\tif isValidKeyword(contextToken.Kind) || contextToken.Kind == ast.KindAsteriskToken ||"},
  {"line":4023,"text":"\t\t\t\tast.IsIdentifier(contextToken) && isValidKeyword(scanner.IdentifierToKeywordKind(contextToken.AsIdentifier())) {"},
  {"line":4024,"text":"\t\t\t\treturn contextToken.Parent.Parent"},
  {"line":4025,"text":"\t\t\t}"},
  {"line":4026,"text":"\t\t}"},
  {"line":4028,"text":"\t\treturn nil"},
  {"line":4029,"text":"\t}"},
  {"line":4030,"text":"}"},
  {"line":4032,"text":"func isFromObjectTypeDeclaration(node *ast.Node) bool {"},
  {"line":4033,"text":"\treturn node.Parent != nil && ast.IsClassOrTypeElement(node.Parent) && ast.IsObjectTypeDeclaration(node.Parent.Parent)"},
  {"line":4034,"text":"}"},
  {"line":4037,"text":"func filterClassMembersList("},
  {"line":4038,"text":"\tbaseSymbols []*ast.Symbol,"},
  {"line":4039,"text":"\texistingMembers []*ast.ClassElement,"},
  {"line":4040,"text":"\tclassElementModifierFlags ast.ModifierFlags,"},
  {"line":4041,"text":"\tfile *ast.SourceFile,"},
  {"line":4042,"text":"\tposition int,"},
  {"line":4043,"text":") []*ast.Symbol {"},
  {"line":4044,"text":"\texistingMemberNames := collections.Set[string]{}"},
  {"line":4045,"text":"\tfor _, member := range existingMembers {"},
  {"line":4047,"text":"\t\tif member.Kind != ast.KindPropertyDeclaration &&"},
  {"line":4048,"text":"\t\t\tmember.Kind != ast.KindMethodDeclaration &&"},
  {"line":4049,"text":"\t\t\tmember.Kind != ast.KindGetAccessor &&"},
  {"line":4050,"text":"\t\t\tmember.Kind != ast.KindSetAccessor {"},
  {"line":4051,"text":"\t\t\tcontinue"},
  {"line":4052,"text":"\t\t}"},
  {"line":4055,"text":"\t\tif isCurrentlyEditingNode(member, file, position) {"},
  {"line":4056,"text":"\t\t\tcontinue"},
  {"line":4057,"text":"\t\t}"},
  {"line":4060,"text":"\t\tif member.ModifierFlags()&ast.ModifierFlagsPrivate != 0 {"},
  {"line":4061,"text":"\t\t\tcontinue"},
  {"line":4062,"text":"\t\t}"},
  {"line":4065,"text":"\t\tif ast.IsStatic(member) != (classElementModifierFlags&ast.ModifierFlagsStatic != 0) {"},
  {"line":4066,"text":"\t\t\tcontinue"},
  {"line":4067,"text":"\t\t}"},
  {"line":4069,"text":"\t\texistingName := ast.GetPropertyNameForPropertyNameNode(member.Name())"},
  {"line":4070,"text":"\t\tif existingName != \"\" {"},
  {"line":4071,"text":"\t\t\texistingMemberNames.Add(existingName)"},
  {"line":4072,"text":"\t\t}"},
  {"line":4073,"text":"\t}"},
  {"line":4075,"text":"\treturn core.Filter(baseSymbols, func(propertySymbol *ast.Symbol) bool {"},
  {"line":4076,"text":"\t\treturn !existingMemberNames.Has(ast.SymbolName(propertySymbol)) &&"},
  {"line":4077,"text":"\t\t\tlen(propertySymbol.Declarations) > 0 &&"},
  {"line":4078,"text":"\t\t\tchecker.GetDeclarationModifierFlagsFromSymbol(propertySymbol)&ast.ModifierFlagsPrivate == 0 &&"},
  {"line":4079,"text":"\t\t\t!(propertySymbol.ValueDeclaration != nil && ast.IsPrivateIdentifierClassElementDeclaration(propertySymbol.ValueDeclaration))"},
  {"line":4080,"text":"\t})"},
  {"line":4081,"text":"}"},
  {"line":4083,"text":"func tryGetContainingJsxElement(contextToken *ast.Node, file *ast.SourceFile) *ast.JsxOpeningLikeElement {"},
  {"line":4084,"text":"\tif contextToken == nil {"},
  {"line":4085,"text":"\t\treturn nil"},
  {"line":4086,"text":"\t}"},
  {"line":4088,"text":"\tparent := contextToken.Parent"},
  {"line":4089,"text":"\tswitch contextToken.Kind {"},
  {"line":4090,"text":"\tcase ast.KindGreaterThanToken, ast.KindLessThanSlashToken, ast.KindSlashToken, ast.KindIdentifier,"},
  {"line":4091,"text":"\t\tast.KindPropertyAccessExpression, ast.KindJsxAttributes, ast.KindJsxAttribute, ast.KindJsxSpreadAttribute:"},
  {"line":4092,"text":"\t\tif parent != nil && (parent.Kind == ast.KindJsxSelfClosingElement || parent.Kind == ast.KindJsxOpeningElement) {"},
  {"line":4093,"text":"\t\t\tif contextToken.Kind == ast.KindGreaterThanToken {"},
  {"line":4094,"text":"\t\t\t\tprecedingToken := astnav.FindPrecedingToken(file, contextToken.Pos())"},
  {"line":4095,"text":"\t\t\t\tif len(parent.TypeArguments()) == 0 ||"},
  {"line":4096,"text":"\t\t\t\t\tprecedingToken != nil && precedingToken.Kind == ast.KindSlashToken {"},
  {"line":4097,"text":"\t\t\t\t\treturn nil"},
  {"line":4098,"text":"\t\t\t\t}"},
  {"line":4099,"text":"\t\t\t}"},
  {"line":4100,"text":"\t\t\treturn parent"},
  {"line":4101,"text":"\t\t} else if parent != nil && parent.Kind == ast.KindJsxAttribute {"},
  {"line":4106,"text":"\t\t\treturn parent.Parent.Parent"},
  {"line":4107,"text":"\t\t}"},
  {"line":4111,"text":"\tcase ast.KindStringLiteral:"},
  {"line":4112,"text":"\t\tif parent != nil && (parent.Kind == ast.KindJsxAttribute || parent.Kind == ast.KindJsxSpreadAttribute) {"},
  {"line":4117,"text":"\t\t\treturn parent.Parent.Parent"},
  {"line":4118,"text":"\t\t}"},
  {"line":4119,"text":"\tcase ast.KindCloseBraceToken:"},
  {"line":4120,"text":"\t\tif parent != nil && parent.Kind == ast.KindJsxExpression &&"},
  {"line":4121,"text":"\t\t\tparent.Parent != nil && parent.Parent.Kind == ast.KindJsxAttribute {"},
  {"line":4127,"text":"\t\t\treturn parent.Parent.Parent.Parent"},
  {"line":4128,"text":"\t\t}"},
  {"line":4129,"text":"\t\tif parent != nil && parent.Kind == ast.KindJsxSpreadAttribute {"},
  {"line":4134,"text":"\t\t\treturn parent.Parent.Parent"},
  {"line":4135,"text":"\t\t}"},
  {"line":4136,"text":"\t}"},
  {"line":4138,"text":"\treturn nil"},
  {"line":4139,"text":"}"},
  {"line":4144,"text":"func filterJsxAttributes("},
  {"line":4145,"text":"\tsymbols []*ast.Symbol,"},
  {"line":4146,"text":"\tattributes []*ast.JsxAttributeLike,"},
  {"line":4147,"text":"\tfile *ast.SourceFile,"},
  {"line":4148,"text":"\tposition int,"},
  {"line":4149,"text":"\ttypeChecker *checker.Checker,"},
  {"line":4150,"text":") (filteredMembers []*ast.Symbol, spreadMemberNames *collections.Set[string]) {"},
  {"line":4151,"text":"\texistingNames := collections.Set[string]{}"},
  {"line":4152,"text":"\tmembersDeclaredBySpreadAssignment := collections.Set[string]{}"},
  {"line":4153,"text":"\tfor _, attr := range attributes {"},
  {"line":4155,"text":"\t\tif isCurrentlyEditingNode(attr, file, position) {"},
  {"line":4156,"text":"\t\t\tcontinue"},
  {"line":4157,"text":"\t\t}"},
  {"line":4159,"text":"\t\tif attr.Kind == ast.KindJsxAttribute {"},
  {"line":4160,"text":"\t\t\texistingNames.Add(attr.Name().Text())"},
  {"line":4161,"text":"\t\t} else if ast.IsJsxSpreadAttribute(attr) {"},
  {"line":4162,"text":"\t\t\tsetMemberDeclaredBySpreadAssignment(attr, &membersDeclaredBySpreadAssignment, typeChecker)"},
  {"line":4163,"text":"\t\t}"},
  {"line":4164,"text":"\t}"},
  {"line":4166,"text":"\treturn core.Filter(symbols, func(a *ast.Symbol) bool { return !existingNames.Has(a.Name) }),"},
  {"line":4167,"text":"\t\t&membersDeclaredBySpreadAssignment"},
  {"line":4168,"text":"}"},
  {"line":4170,"text":"func isTypeKeywordTokenOrIdentifier(node *ast.Node) bool {"},
  {"line":4171,"text":"\treturn ast.IsTypeKeywordToken(node) ||"},
  {"line":4172,"text":"\t\tast.IsIdentifier(node) && scanner.IdentifierToKeywordKind(node.AsIdentifier()) == ast.KindTypeKeyword"},
  {"line":4173,"text":"}"},
  {"line":4177,"text":"func (l *LanguageService) setItemDefaults("},
  {"line":4178,"text":"\tctx context.Context,"},
  {"line":4179,"text":"\tposition int,"},
  {"line":4180,"text":"\tfile *ast.SourceFile,"},
  {"line":4181,"text":"\titems []*lsproto.CompletionItem,"},
  {"line":4182,"text":"\tdefaultCommitCharacters *[]string,"},
  {"line":4183,"text":"\toptionalReplacementSpan *lsproto.Range,"},
  {"line":4184,"text":") *lsproto.CompletionItemDefaults {"},
  {"line":4185,"text":"\tvar itemDefaults *lsproto.CompletionItemDefaults"},
  {"line":4186,"text":"\tif defaultCommitCharacters != nil {"},
  {"line":4187,"text":"\t\tsupportsItemCommitCharacters := clientSupportsItemCommitCharacters(ctx)"},
  {"line":4188,"text":"\t\tif clientSupportsDefaultCommitCharacters(ctx) && supportsItemCommitCharacters {"},
  {"line":4189,"text":"\t\t\titemDefaults = &lsproto.CompletionItemDefaults{"},
  {"line":4190,"text":"\t\t\t\tCommitCharacters: defaultCommitCharacters,"},
  {"line":4191,"text":"\t\t\t}"},
  {"line":4192,"text":"\t\t} else if supportsItemCommitCharacters {"},
  {"line":4193,"text":"\t\t\tfor _, item := range items {"},
  {"line":4194,"text":"\t\t\t\tif item.CommitCharacters == nil {"},
  {"line":4195,"text":"\t\t\t\t\titem.CommitCharacters = defaultCommitCharacters"},
  {"line":4196,"text":"\t\t\t\t}"},
  {"line":4197,"text":"\t\t\t}"},
  {"line":4198,"text":"\t\t}"},
  {"line":4199,"text":"\t}"},
  {"line":4200,"text":"\tif optionalReplacementSpan != nil {"},
  {"line":4202,"text":"\t\tinsertRange := lsproto.Range{"},
  {"line":4203,"text":"\t\t\tStart: optionalReplacementSpan.Start,"},
  {"line":4204,"text":"\t\t\tEnd:   l.createLspPosition(position, file),"},
  {"line":4205,"text":"\t\t}"},
  {"line":4206,"text":"\t\tif clientSupportsDefaultEditRange(ctx) {"},
  {"line":4207,"text":"\t\t\titemDefaults = core.OrElse(itemDefaults, &lsproto.CompletionItemDefaults{})"},
  {"line":4208,"text":"\t\t\titemDefaults.EditRange = &lsproto.RangeOrEditRangeWithInsertReplace{"},
  {"line":4209,"text":"\t\t\t\tEditRangeWithInsertReplace: &lsproto.EditRangeWithInsertReplace{"},
  {"line":4210,"text":"\t\t\t\t\tInsert:  insertRange,"},
  {"line":4211,"text":"\t\t\t\t\tReplace: *optionalReplacementSpan,"},
  {"line":4212,"text":"\t\t\t\t},"},
  {"line":4213,"text":"\t\t\t}"},
  {"line":4214,"text":"\t\t\tfor _, item := range items {"},
  {"line":4217,"text":"\t\t\t\tif item.InsertText != nil && item.TextEdit == nil {"},
  {"line":4218,"text":"\t\t\t\t\titem.TextEdit = &lsproto.TextEditOrInsertReplaceEdit{"},
  {"line":4219,"text":"\t\t\t\t\t\tInsertReplaceEdit: &lsproto.InsertReplaceEdit{"},
  {"line":4220,"text":"\t\t\t\t\t\t\tNewText: *item.InsertText,"},
  {"line":4221,"text":"\t\t\t\t\t\t\tInsert:  insertRange,"},
  {"line":4222,"text":"\t\t\t\t\t\t\tReplace: *optionalReplacementSpan,"},
  {"line":4223,"text":"\t\t\t\t\t\t},"},
  {"line":4224,"text":"\t\t\t\t\t}"},
  {"line":4225,"text":"\t\t\t\t\titem.InsertText = nil"},
  {"line":4226,"text":"\t\t\t\t}"},
  {"line":4227,"text":"\t\t\t}"},
  {"line":4228,"text":"\t\t} else if clientSupportsItemInsertReplace(ctx) {"},
  {"line":4229,"text":"\t\t\tfor _, item := range items {"},
  {"line":4230,"text":"\t\t\t\tif item.TextEdit == nil {"},
  {"line":4231,"text":"\t\t\t\t\titem.TextEdit = &lsproto.TextEditOrInsertReplaceEdit{"},
  {"line":4232,"text":"\t\t\t\t\t\tInsertReplaceEdit: &lsproto.InsertReplaceEdit{"},
  {"line":4233,"text":"\t\t\t\t\t\t\tNewText: *core.OrElse(item.InsertText, &item.Label),"},
  {"line":4234,"text":"\t\t\t\t\t\t\tInsert:  insertRange,"},
  {"line":4235,"text":"\t\t\t\t\t\t\tReplace: *optionalReplacementSpan,"},
  {"line":4236,"text":"\t\t\t\t\t\t},"},
  {"line":4237,"text":"\t\t\t\t\t}"},
  {"line":4238,"text":"\t\t\t\t}"},
  {"line":4239,"text":"\t\t\t}"},
  {"line":4240,"text":"\t\t}"},
  {"line":4241,"text":"\t}"},
  {"line":4243,"text":"\treturn itemDefaults"},
  {"line":4244,"text":"}"},
  {"line":4246,"text":"func (l *LanguageService) specificKeywordCompletionInfo("},
  {"line":4247,"text":"\tctx context.Context,"},
  {"line":4248,"text":"\tposition int,"},
  {"line":4249,"text":"\tfile *ast.SourceFile,"},
  {"line":4250,"text":"\titems []*lsproto.CompletionItem,"},
  {"line":4251,"text":"\tisNewIdentifierLocation bool,"},
  {"line":4252,"text":"\toptionalReplacementSpan *lsproto.Range,"},
  {"line":4253,"text":") *lsproto.CompletionList {"},
  {"line":4254,"text":"\tdefaultCommitCharacters := getDefaultCommitCharacters(isNewIdentifierLocation)"},
  {"line":4255,"text":"\titemDefaults := l.setItemDefaults("},
  {"line":4256,"text":"\t\tctx,"},
  {"line":4257,"text":"\t\tposition,"},
  {"line":4258,"text":"\t\tfile,"},
  {"line":4259,"text":"\t\titems,"},
  {"line":4260,"text":"\t\t&defaultCommitCharacters,"},
  {"line":4261,"text":"\t\toptionalReplacementSpan,"},
  {"line":4262,"text":"\t)"},
  {"line":4263,"text":"\treturn &lsproto.CompletionList{"},
  {"line":4264,"text":"\t\tIsIncomplete: false,"},
  {"line":4265,"text":"\t\tItemDefaults: itemDefaults,"},
  {"line":4266,"text":"\t\tItems:        items,"},
  {"line":4267,"text":"\t}"},
  {"line":4268,"text":"}"},
  {"line":4270,"text":"func (l *LanguageService) getJsxClosingTagCompletion("},
  {"line":4271,"text":"\tctx context.Context,"},
  {"line":4272,"text":"\tlocation *ast.Node,"},
  {"line":4273,"text":"\tfile *ast.SourceFile,"},
  {"line":4274,"text":"\tposition int,"},
  {"line":4275,"text":") *lsproto.CompletionList {"},
  {"line":4277,"text":"\tjsxClosingElement := ast.FindAncestorOrQuit(location, func(node *ast.Node) ast.FindAncestorResult {"},
  {"line":4278,"text":"\t\tswitch node.Kind {"},
  {"line":4279,"text":"\t\tcase ast.KindJsxClosingElement:"},
  {"line":4280,"text":"\t\t\treturn ast.FindAncestorTrue"},
  {"line":4281,"text":"\t\tcase ast.KindLessThanSlashToken, ast.KindGreaterThanToken, ast.KindIdentifier, ast.KindPropertyAccessExpression:"},
  {"line":4282,"text":"\t\t\treturn ast.FindAncestorFalse"},
  {"line":4283,"text":"\t\tdefault:"},
  {"line":4284,"text":"\t\t\treturn ast.FindAncestorQuit"},
  {"line":4285,"text":"\t\t}"},
  {"line":4286,"text":"\t})"},
  {"line":4288,"text":"\tif jsxClosingElement == nil {"},
  {"line":4289,"text":"\t\treturn nil"},
  {"line":4290,"text":"\t}"},
  {"line":4304,"text":"\thasClosingAngleBracket := astnav.FindChildOfKind(jsxClosingElement, ast.KindGreaterThanToken, file) != nil"},
  {"line":4305,"text":"\ttagName := jsxClosingElement.Parent.AsJsxElement().OpeningElement.TagName()"},
  {"line":4306,"text":"\tclosingTag := scanner.GetTextOfNode(tagName)"},
  {"line":4307,"text":"\tfullClosingTag := closingTag + core.IfElse(hasClosingAngleBracket, \"\", \">\")"},
  {"line":4308,"text":"\toptionalReplacementSpan := new(l.createLspRangeFromNode(jsxClosingElement.TagName(), file))"},
  {"line":4309,"text":"\tdefaultCommitCharacters := getDefaultCommitCharacters(false /*isNewIdentifierLocation*/)"},
  {"line":4311,"text":"\titem := l.createLSPCompletionItem("},
  {"line":4312,"text":"\t\tctx,"},
  {"line":4313,"text":"\t\tfullClosingTag, /*name*/"},
  {"line":4314,"text":"\t\t\"\",             /*insertText*/"},
  {"line":4315,"text":"\t\t\"\",             /*filterText*/"},
  {"line":4316,"text":"\t\tSortTextLocationPriority,"},
  {"line":4317,"text":"\t\tlsutil.ScriptElementKindClassElement,"},
  {"line":4318,"text":"\t\tlsutil.ScriptElementKindModifierNone, /*kindModifiers*/"},
  {"line":4319,"text":"\t\tnil,                                  /*replacementSpan*/"},
  {"line":4320,"text":"\t\tnil,                                  /*commitCharacters*/"},
  {"line":4321,"text":"\t\tnil,                                  /*labelDetails*/"},
  {"line":4322,"text":"\t\tfile,"},
  {"line":4323,"text":"\t\tposition,"},
  {"line":4324,"text":"\t\ttrue,  /*isMemberCompletion*/"},
  {"line":4325,"text":"\t\tfalse, /*isSnippet*/"},
  {"line":4326,"text":"\t\tfalse, /*hasAction*/"},
  {"line":4327,"text":"\t\tfalse, /*preselect*/"},
  {"line":4328,"text":"\t\t\"\",    /*source*/"},
  {"line":4329,"text":"\t\tnil,   /*autoImportEntryData*/ // !!! jsx autoimports"},
  {"line":4330,"text":"\t\tnil,   /*detail*/"},
  {"line":4331,"text":"\t)"},
  {"line":4332,"text":"\titems := []*lsproto.CompletionItem{item}"},
  {"line":4333,"text":"\titemDefaults := l.setItemDefaults("},
  {"line":4334,"text":"\t\tctx,"},
  {"line":4335,"text":"\t\tposition,"},
  {"line":4336,"text":"\t\tfile,"},
  {"line":4337,"text":"\t\titems,"},
  {"line":4338,"text":"\t\t&defaultCommitCharacters,"},
  {"line":4339,"text":"\t\toptionalReplacementSpan,"},
  {"line":4340,"text":"\t)"},
  {"line":4342,"text":"\treturn &lsproto.CompletionList{"},
  {"line":4343,"text":"\t\tIsIncomplete: false,"},
  {"line":4344,"text":"\t\tItemDefaults: itemDefaults,"},
  {"line":4345,"text":"\t\tItems:        items,"},
  {"line":4346,"text":"\t}"},
  {"line":4347,"text":"}"},
  {"line":4349,"text":"func (l *LanguageService) createLSPCompletionItem("},
  {"line":4350,"text":"\tctx context.Context,"},
  {"line":4351,"text":"\tname string,"},
  {"line":4352,"text":"\tinsertText string,"},
  {"line":4353,"text":"\tfilterText string,"},
  {"line":4354,"text":"\tsortText SortText,"},
  {"line":4355,"text":"\telementKind lsutil.ScriptElementKind,"},
  {"line":4356,"text":"\tkindModifiers lsutil.ScriptElementKindModifier,"},
  {"line":4357,"text":"\treplacementSpan *lsproto.Range,"},
  {"line":4358,"text":"\tcommitCharacters *[]string,"},
  {"line":4359,"text":"\tlabelDetails *lsproto.CompletionItemLabelDetails,"},
  {"line":4360,"text":"\tfile *ast.SourceFile,"},
  {"line":4361,"text":"\tposition int,"},
  {"line":4362,"text":"\tisMemberCompletion bool,"},
  {"line":4363,"text":"\tisSnippet bool,"},
  {"line":4364,"text":"\thasAction bool,"},
  {"line":4365,"text":"\tpreselect bool,"},
  {"line":4366,"text":"\tsource string,"},
  {"line":4367,"text":"\tautoImportFix *lsproto.AutoImportFix,"},
  {"line":4368,"text":"\tdetail *string,"},
  {"line":4369,"text":") *lsproto.CompletionItem {"},
  {"line":4370,"text":"\tkind := getCompletionsSymbolKind(elementKind)"},
  {"line":4371,"text":"\tdata := &lsproto.CompletionItemData{"},
  {"line":4372,"text":"\t\tFileName:   file.FileName(),"},
  {"line":4373,"text":"\t\tPosition:   int32(position),"},
  {"line":4374,"text":"\t\tSource:     source,"},
  {"line":4375,"text":"\t\tName:       name,"},
  {"line":4376,"text":"\t\tAutoImport: autoImportFix,"},
  {"line":4377,"text":"\t}"},
  {"line":4380,"text":"\tvar textEdit *lsproto.TextEditOrInsertReplaceEdit"},
  {"line":4381,"text":"\tif replacementSpan != nil {"},
  {"line":4382,"text":"\t\ttextEdit = &lsproto.TextEditOrInsertReplaceEdit{"},
  {"line":4383,"text":"\t\t\tTextEdit: &lsproto.TextEdit{"},
  {"line":4384,"text":"\t\t\t\tNewText: core.IfElse(insertText == \"\", name, insertText),"},
  {"line":4385,"text":"\t\t\t\tRange:   *replacementSpan,"},
  {"line":4386,"text":"\t\t\t},"},
  {"line":4387,"text":"\t\t}"},
  {"line":4388,"text":"\t}"},
  {"line":4393,"text":"\twordSize, wordStart := getWordLengthAndStart(file, position)"},
  {"line":4394,"text":"\tdotAccessor := getDotAccessor(file, position-wordSize)"},
  {"line":4395,"text":"\tif filterText == \"\" {"},
  {"line":4396,"text":"\t\tfilterText = getFilterText(file, position, insertText, name, wordStart, dotAccessor)"},
  {"line":4397,"text":"\t}"},
  {"line":4400,"text":"\tvar tags *[]lsproto.CompletionItemTag"},
  {"line":4402,"text":"\tif kindModifiers&lsutil.ScriptElementKindModifierOptional != 0 {"},
  {"line":4403,"text":"\t\tif insertText == \"\" {"},
  {"line":4404,"text":"\t\t\tinsertText = name"},
  {"line":4405,"text":"\t\t}"},
  {"line":4406,"text":"\t\tif filterText == \"\" {"},
  {"line":4407,"text":"\t\t\tfilterText = name"},
  {"line":4408,"text":"\t\t}"},
  {"line":4409,"text":"\t\tname = name + \"?\""},
  {"line":4410,"text":"\t}"},
  {"line":4411,"text":"\tif kindModifiers&lsutil.ScriptElementKindModifierDeprecated != 0 {"},
  {"line":4412,"text":"\t\ttags = &[]lsproto.CompletionItemTag{lsproto.CompletionItemTagDeprecated}"},
  {"line":4413,"text":"\t}"},
  {"line":4415,"text":"\tif hasAction && source != \"\" {"},
  {"line":4417,"text":"\t}"},
  {"line":4420,"text":"\tvar insertTextFormat *lsproto.InsertTextFormat"},
  {"line":4421,"text":"\tif isSnippet {"},
  {"line":4422,"text":"\t\tinsertTextFormat = new(lsproto.InsertTextFormatSnippet)"},
  {"line":4423,"text":"\t}"},
  {"line":4425,"text":"\treturn &lsproto.CompletionItem{"},
  {"line":4426,"text":"\t\tLabel:            name,"},
  {"line":4427,"text":"\t\tLabelDetails:     labelDetails,"},
  {"line":4428,"text":"\t\tKind:             &kind,"},
  {"line":4429,"text":"\t\tTags:             tags,"},
  {"line":4430,"text":"\t\tDetail:           detail,"},
  {"line":4431,"text":"\t\tPreselect:        boolToPtr(preselect),"},
  {"line":4432,"text":"\t\tSortText:         new(string(sortText)),"},
  {"line":4433,"text":"\t\tFilterText:       strPtrTo(filterText),"},
  {"line":4434,"text":"\t\tInsertText:       strPtrTo(insertText),"},
  {"line":4435,"text":"\t\tInsertTextFormat: insertTextFormat,"},
  {"line":4436,"text":"\t\tTextEdit:         textEdit,"},
  {"line":4437,"text":"\t\tCommitCharacters: commitCharacters,"},
  {"line":4438,"text":"\t\tData:             data,"},
  {"line":4439,"text":"\t}"},
  {"line":4440,"text":"}"},
  {"line":4442,"text":"func (l *LanguageService) getLabelCompletionsAtPosition("},
  {"line":4443,"text":"\tctx context.Context,"},
  {"line":4444,"text":"\tnode *ast.BreakOrContinueStatement,"},
  {"line":4445,"text":"\tfile *ast.SourceFile,"},
  {"line":4446,"text":"\tposition int,"},
  {"line":4447,"text":"\toptionalReplacementSpan *lsproto.Range,"},
  {"line":4448,"text":") *lsproto.CompletionList {"},
  {"line":4449,"text":"\titems := l.getLabelStatementCompletions(ctx, node, file, position)"},
  {"line":4450,"text":"\tif len(items) == 0 {"},
  {"line":4451,"text":"\t\treturn nil"},
  {"line":4452,"text":"\t}"},
  {"line":4453,"text":"\tdefaultCommitCharacters := getDefaultCommitCharacters(false /*isNewIdentifierLocation*/)"},
  {"line":4454,"text":"\titemDefaults := l.setItemDefaults("},
  {"line":4455,"text":"\t\tctx,"},
  {"line":4456,"text":"\t\tposition,"},
  {"line":4457,"text":"\t\tfile,"},
  {"line":4458,"text":"\t\titems,"},
  {"line":4459,"text":"\t\t&defaultCommitCharacters,"},
  {"line":4460,"text":"\t\toptionalReplacementSpan,"},
  {"line":4461,"text":"\t)"},
  {"line":4462,"text":"\treturn &lsproto.CompletionList{"},
  {"line":4463,"text":"\t\tIsIncomplete: false,"},
  {"line":4464,"text":"\t\tItemDefaults: itemDefaults,"},
  {"line":4465,"text":"\t\tItems:        items,"},
  {"line":4466,"text":"\t}"},
  {"line":4467,"text":"}"},
  {"line":4469,"text":"func (l *LanguageService) getLabelStatementCompletions("},
  {"line":4470,"text":"\tctx context.Context,"},
  {"line":4471,"text":"\tnode *ast.BreakOrContinueStatement,"},
  {"line":4472,"text":"\tfile *ast.SourceFile,"},
  {"line":4473,"text":"\tposition int,"},
  {"line":4474,"text":") []*lsproto.CompletionItem {"},
  {"line":4475,"text":"\tvar uniques collections.Set[string]"},
  {"line":4476,"text":"\tvar items []*lsproto.CompletionItem"},
  {"line":4477,"text":"\tcurrent := node"},
  {"line":4478,"text":"\tfor current != nil {"},
  {"line":4479,"text":"\t\tif ast.IsFunctionLike(current) {"},
  {"line":4480,"text":"\t\t\tbreak"},
  {"line":4481,"text":"\t\t}"},
  {"line":4482,"text":"\t\tif ast.IsLabeledStatement(current) {"},
  {"line":4483,"text":"\t\t\tname := current.Label().Text()"},
  {"line":4484,"text":"\t\t\tif !uniques.Has(name) {"},
  {"line":4485,"text":"\t\t\t\tuniques.Add(name)"},
  {"line":4486,"text":"\t\t\t\titems = append(items, l.createLSPCompletionItem("},
  {"line":4487,"text":"\t\t\t\t\tctx,"},
  {"line":4488,"text":"\t\t\t\t\tname,"},
  {"line":4489,"text":"\t\t\t\t\t\"\", /*insertText*/"},
  {"line":4490,"text":"\t\t\t\t\t\"\", /*filterText*/"},
  {"line":4491,"text":"\t\t\t\t\tSortTextLocationPriority,"},
  {"line":4492,"text":"\t\t\t\t\tlsutil.ScriptElementKindLabel,"},
  {"line":4493,"text":"\t\t\t\t\tlsutil.ScriptElementKindModifierNone, /*kindModifiers*/"},
  {"line":4494,"text":"\t\t\t\t\tnil,                                  /*replacementSpan*/"},
  {"line":4495,"text":"\t\t\t\t\tnil,                                  /*commitCharacters*/"},
  {"line":4496,"text":"\t\t\t\t\tnil,                                  /*labelDetails*/"},
  {"line":4497,"text":"\t\t\t\t\tfile,"},
  {"line":4498,"text":"\t\t\t\t\tposition,"},
  {"line":4499,"text":"\t\t\t\t\tfalse, /*isMemberCompletion*/"},
  {"line":4500,"text":"\t\t\t\t\tfalse, /*isSnippet*/"},
  {"line":4501,"text":"\t\t\t\t\tfalse, /*hasAction*/"},
  {"line":4502,"text":"\t\t\t\t\tfalse, /*preselect*/"},
  {"line":4503,"text":"\t\t\t\t\t\"\",    /*source*/"},
  {"line":4504,"text":"\t\t\t\t\tnil,   /*autoImportEntryData*/"},
  {"line":4505,"text":"\t\t\t\t\tnil,   /*detail*/"},
  {"line":4506,"text":"\t\t\t\t))"},
  {"line":4507,"text":"\t\t\t}"},
  {"line":4508,"text":"\t\t}"},
  {"line":4509,"text":"\t\tcurrent = current.Parent"},
  {"line":4510,"text":"\t}"},
  {"line":4511,"text":"\treturn items"},
  {"line":4512,"text":"}"},
  {"line":4514,"text":"func isCompletionListBlocker("},
  {"line":4515,"text":"\tcontextToken *ast.Node,"},
  {"line":4516,"text":"\tpreviousToken *ast.Node,"},
  {"line":4517,"text":"\tlocation *ast.Node,"},
  {"line":4518,"text":"\tfile *ast.SourceFile,"},
  {"line":4519,"text":"\tposition int,"},
  {"line":4520,"text":"\ttypeChecker *checker.Checker,"},
  {"line":4521,"text":") bool {"},
  {"line":4522,"text":"\treturn isInStringOrRegularExpressionOrTemplateLiteral(contextToken, position) ||"},
  {"line":4523,"text":"\t\tisSolelyIdentifierDefinitionLocation(contextToken, previousToken, file, position, typeChecker) ||"},
  {"line":4524,"text":"\t\tisDotOfNumericLiteral(contextToken, file) ||"},
  {"line":4525,"text":"\t\tisInJsxText(contextToken, location) ||"},
  {"line":4526,"text":"\t\tast.IsBigIntLiteral(contextToken)"},
  {"line":4527,"text":"}"},
  {"line":4529,"text":"func isInStringOrRegularExpressionOrTemplateLiteral(contextToken *ast.Node, position int) bool {"},
  {"line":4534,"text":"\treturn (ast.IsRegularExpressionLiteral(contextToken) || ast.IsStringTextContainingNode(contextToken)) &&"},
  {"line":4535,"text":"\t\t(contextToken.Loc.ContainsExclusive(position)) ||"},
  {"line":4536,"text":"\t\tposition == contextToken.End() &&"},
  {"line":4537,"text":"\t\t\t(ast.IsUnterminatedLiteral(contextToken) || ast.IsRegularExpressionLiteral(contextToken))"},
  {"line":4538,"text":"}"},
  {"line":4541,"text":"func isSolelyIdentifierDefinitionLocation("},
  {"line":4542,"text":"\tcontextToken *ast.Node,"},
  {"line":4543,"text":"\tpreviousToken *ast.Node,"},
  {"line":4544,"text":"\tfile *ast.SourceFile,"},
  {"line":4545,"text":"\tposition int,"},
  {"line":4546,"text":"\ttypeChecker *checker.Checker,"},
  {"line":4547,"text":") bool {"},
  {"line":4548,"text":"\tparent := contextToken.Parent"},
  {"line":4549,"text":"\tcontainingNodeKind := parent.Kind"},
  {"line":4550,"text":"\tswitch contextToken.Kind {"},
  {"line":4551,"text":"\tcase ast.KindCommaToken:"},
  {"line":4552,"text":"\t\treturn containingNodeKind == ast.KindVariableDeclaration ||"},
  {"line":4553,"text":"\t\t\tisVariableDeclarationListButNotTypeArgument(contextToken, file, typeChecker) ||"},
  {"line":4554,"text":"\t\t\tcontainingNodeKind == ast.KindVariableStatement ||"},
  {"line":4555,"text":"\t\t\tcontainingNodeKind == ast.KindEnumDeclaration || // enum a { foo, |"},
  {"line":4556,"text":"\t\t\tisFunctionLikeButNotConstructor(containingNodeKind) ||"},
  {"line":4557,"text":"\t\t\tcontainingNodeKind == ast.KindInterfaceDeclaration || // interface A<T, |"},
  {"line":4558,"text":"\t\t\tcontainingNodeKind == ast.KindArrayBindingPattern || // var [x, y|"},
  {"line":4559,"text":"\t\t\tcontainingNodeKind == ast.KindTypeAliasDeclaration || // type Map, K, |"},
  {"line":4562,"text":"\t\t\t(ast.IsClassLike(parent) && parent.TypeParameterList() != nil && parent.TypeParameterList().End() >= contextToken.Pos())"},
  {"line":4563,"text":"\tcase ast.KindDotToken:"},
  {"line":4564,"text":"\t\treturn containingNodeKind == ast.KindArrayBindingPattern // var [.|"},
  {"line":4565,"text":"\tcase ast.KindColonToken:"},
  {"line":4566,"text":"\t\treturn containingNodeKind == ast.KindBindingElement // var {x :html|"},
  {"line":4567,"text":"\tcase ast.KindOpenBracketToken:"},
  {"line":4568,"text":"\t\treturn containingNodeKind == ast.KindArrayBindingPattern // var [x|"},
  {"line":4569,"text":"\tcase ast.KindOpenParenToken:"},
  {"line":4570,"text":"\t\treturn containingNodeKind == ast.KindCatchClause || isFunctionLikeButNotConstructor(containingNodeKind)"},
  {"line":4571,"text":"\tcase ast.KindOpenBraceToken:"},
  {"line":4572,"text":"\t\treturn containingNodeKind == ast.KindEnumDeclaration // enum a { |"},
  {"line":4573,"text":"\tcase ast.KindLessThanToken:"},
  {"line":4574,"text":"\t\treturn containingNodeKind == ast.KindClassDeclaration || // class A< |"},
  {"line":4575,"text":"\t\t\tcontainingNodeKind == ast.KindClassExpression || // var C = class D< |"},
  {"line":4576,"text":"\t\t\tcontainingNodeKind == ast.KindInterfaceDeclaration || // interface A< |"},
  {"line":4577,"text":"\t\t\tcontainingNodeKind == ast.KindTypeAliasDeclaration || // type List< |"},
  {"line":4578,"text":"\t\t\tast.IsFunctionLikeKind(containingNodeKind)"},
  {"line":4579,"text":"\tcase ast.KindStaticKeyword:"},
  {"line":4580,"text":"\t\treturn containingNodeKind == ast.KindPropertyDeclaration &&"},
  {"line":4581,"text":"\t\t\t!ast.IsClassLike(parent.Parent)"},
  {"line":4582,"text":"\tcase ast.KindDotDotDotToken:"},
  {"line":4583,"text":"\t\treturn containingNodeKind == ast.KindParameter ||"},
  {"line":4584,"text":"\t\t\t(parent.Parent != nil && parent.Parent.Kind == ast.KindArrayBindingPattern) // var [...z|"},
  {"line":4585,"text":"\tcase ast.KindPublicKeyword, ast.KindPrivateKeyword, ast.KindProtectedKeyword:"},
  {"line":4586,"text":"\t\treturn containingNodeKind == ast.KindParameter && !ast.IsConstructorDeclaration(parent.Parent)"},
  {"line":4587,"text":"\tcase ast.KindAsKeyword:"},
  {"line":4588,"text":"\t\treturn containingNodeKind == ast.KindImportSpecifier ||"},
  {"line":4589,"text":"\t\t\tcontainingNodeKind == ast.KindExportSpecifier ||"},
  {"line":4590,"text":"\t\t\tcontainingNodeKind == ast.KindNamespaceImport"},
  {"line":4591,"text":"\tcase ast.KindGetKeyword, ast.KindSetKeyword:"},
  {"line":4592,"text":"\t\treturn !isFromObjectTypeDeclaration(contextToken)"},
  {"line":4593,"text":"\tcase ast.KindIdentifier:"},
  {"line":4594,"text":"\t\tif (containingNodeKind == ast.KindImportSpecifier || containingNodeKind == ast.KindExportSpecifier) &&"},
  {"line":4595,"text":"\t\t\tcontextToken == parent.Name() &&"},
  {"line":4596,"text":"\t\t\tcontextToken.Text() == \"type\" {"},
  {"line":4598,"text":"\t\t\treturn false"},
  {"line":4599,"text":"\t\t}"},
  {"line":4600,"text":"\t\tancestorVariableDeclaration := ast.FindAncestor(parent, ast.IsVariableDeclaration)"},
  {"line":4601,"text":"\t\tif ancestorVariableDeclaration != nil && getLineEndOfPosition(file, contextToken.End()) < position {"},
  {"line":4604,"text":"\t\t\treturn false"},
  {"line":4605,"text":"\t\t}"},
  {"line":4606,"text":"\tcase ast.KindClassKeyword, ast.KindEnumKeyword, ast.KindInterfaceKeyword, ast.KindFunctionKeyword,"},
  {"line":4607,"text":"\t\tast.KindVarKeyword, ast.KindImportKeyword, ast.KindLetKeyword, ast.KindConstKeyword, ast.KindInferKeyword:"},
  {"line":4608,"text":"\t\treturn true"},
  {"line":4609,"text":"\tcase ast.KindTypeKeyword:"},
  {"line":4611,"text":"\t\treturn containingNodeKind != ast.KindImportSpecifier"},
  {"line":4612,"text":"\tcase ast.KindAsteriskToken:"},
  {"line":4613,"text":"\t\treturn ast.IsFunctionLike(parent) && !ast.IsMethodDeclaration(parent)"},
  {"line":4614,"text":"\t}"},
  {"line":4616,"text":"\ttokenKind := keywordForNode(contextToken)"},
  {"line":4619,"text":"\tif isClassMemberCompletionKeyword(tokenKind) && isFromObjectTypeDeclaration(contextToken) {"},
  {"line":4620,"text":"\t\treturn false"},
  {"line":4621,"text":"\t}"},
  {"line":4623,"text":"\tif isConstructorParameterCompletion(contextToken) {"},
  {"line":4628,"text":"\t\tif !ast.IsIdentifier(contextToken) ||"},
  {"line":4629,"text":"\t\t\tast.IsParameterPropertyModifier(tokenKind) ||"},
  {"line":4630,"text":"\t\t\tisCurrentlyEditingNode(contextToken, file, position) {"},
  {"line":4631,"text":"\t\t\treturn false"},
  {"line":4632,"text":"\t\t}"},
  {"line":4633,"text":"\t}"},
  {"line":4636,"text":"\tswitch keywordForNode(contextToken) {"},
  {"line":4637,"text":"\tcase ast.KindAbstractKeyword, ast.KindClassKeyword, ast.KindDeclareKeyword,"},
  {"line":4638,"text":"\t\tast.KindEnumKeyword, ast.KindFunctionKeyword, ast.KindInterfaceKeyword, ast.KindLetKeyword,"},
  {"line":4639,"text":"\t\tast.KindPrivateKeyword, ast.KindProtectedKeyword, ast.KindPublicKeyword,"},
  {"line":4640,"text":"\t\tast.KindStaticKeyword, ast.KindVarKeyword:"},
  {"line":4641,"text":"\t\treturn true"},
  {"line":4642,"text":"\tcase ast.KindAsyncKeyword:"},
  {"line":4643,"text":"\t\treturn ast.IsPropertyDeclaration(contextToken.Parent)"},
  {"line":4644,"text":"\t}"},
  {"line":4648,"text":"\tancestorClassLike := ast.FindAncestor(parent, ast.IsClassLike)"},
  {"line":4649,"text":"\tif ancestorClassLike != nil && contextToken == previousToken &&"},
  {"line":4650,"text":"\t\tisPreviousPropertyDeclarationTerminated(contextToken, file, position) {"},
  {"line":4652,"text":"\t\treturn false"},
  {"line":4653,"text":"\t}"},
  {"line":4655,"text":"\tancestorPropertyDeclaration := ast.FindAncestor(parent, ast.IsPropertyDeclaration)"},
  {"line":4657,"text":"\tif ancestorPropertyDeclaration != nil && contextToken != previousToken &&"},
  {"line":4658,"text":"\t\tast.IsClassLike(previousToken.Parent.Parent) &&"},
  {"line":4660,"text":"\t\tposition <= previousToken.End() {"},
  {"line":4662,"text":"\t\tif isPreviousPropertyDeclarationTerminated(contextToken, file, previousToken.End()) {"},
  {"line":4664,"text":"\t\t\treturn false"},
  {"line":4665,"text":"\t\t} else if contextToken.Kind != ast.KindEqualsToken &&"},
  {"line":4668,"text":"\t\t\t(ast.IsInitializedProperty(ancestorPropertyDeclaration) || ancestorPropertyDeclaration.Type() != nil) {"},
  {"line":4669,"text":"\t\t\treturn true"},
  {"line":4670,"text":"\t\t}"},
  {"line":4671,"text":"\t}"},
  {"line":4672,"text":"\tif tokenKind == ast.KindConstKeyword {"},
  {"line":4673,"text":"\t\treturn true"},
  {"line":4674,"text":"\t}"},
  {"line":4675,"text":"\treturn ast.IsDeclarationName(contextToken) &&"},
  {"line":4676,"text":"\t\t!ast.IsShorthandPropertyAssignment(parent) &&"},
  {"line":4677,"text":"\t\t!ast.IsJsxAttribute(parent) &&"},
  {"line":4681,"text":"\t\t!((ast.IsClassLike(parent) || ast.IsInterfaceDeclaration(parent) || ast.IsTypeParameterDeclaration(parent)) &&"},
  {"line":4682,"text":"\t\t\t(contextToken != previousToken || position > previousToken.End()))"},
  {"line":4683,"text":"}"},
  {"line":4685,"text":"func isVariableDeclarationListButNotTypeArgument(node *ast.Node, file *ast.SourceFile, typeChecker *checker.Checker) bool {"},
  {"line":4686,"text":"\treturn node.Parent.Kind == ast.KindVariableDeclarationList &&"},
  {"line":4687,"text":"\t\t!isPossiblyTypeArgumentPosition(node, file, typeChecker)"},
  {"line":4688,"text":"}"},
  {"line":4690,"text":"func isFunctionLikeButNotConstructor(kind ast.Kind) bool {"},
  {"line":4691,"text":"\treturn ast.IsFunctionLikeKind(kind) && kind != ast.KindConstructor"},
  {"line":4692,"text":"}"},
  {"line":4694,"text":"func isPreviousPropertyDeclarationTerminated(contextToken *ast.Node, file *ast.SourceFile, position int) bool {"},
  {"line":4695,"text":"\treturn contextToken.Kind != ast.KindEqualsToken &&"},
  {"line":4696,"text":"\t\t(contextToken.Kind == ast.KindSemicolonToken ||"},
  {"line":4697,"text":"\t\t\tgetLineOfPosition(file, contextToken.End()) != getLineOfPosition(file, position))"},
  {"line":4698,"text":"}"},
  {"line":4700,"text":"func isDotOfNumericLiteral(contextToken *ast.Node, file *ast.SourceFile) bool {"},
  {"line":4701,"text":"\tif contextToken.Kind == ast.KindNumericLiteral {"},
  {"line":4702,"text":"\t\ttext := file.Text()[contextToken.Pos():contextToken.End()]"},
  {"line":4703,"text":"\t\tr, _ := utf8.DecodeLastRuneInString(text)"},
  {"line":4704,"text":"\t\treturn r == '.'"},
  {"line":4705,"text":"\t}"},
  {"line":4707,"text":"\treturn false"},
  {"line":4708,"text":"}"},
  {"line":4710,"text":"func isInJsxText(contextToken *ast.Node, location *ast.Node) bool {"},
  {"line":4711,"text":"\tif contextToken.Kind == ast.KindJsxText {"},
  {"line":4712,"text":"\t\treturn true"},
  {"line":4713,"text":"\t}"},
  {"line":4715,"text":"\tif contextToken.Kind == ast.KindGreaterThanToken && contextToken.Parent != nil {"},
  {"line":4721,"text":"\t\tif location == contextToken.Parent && ast.IsJsxOpeningLikeElement(location) {"},
  {"line":4722,"text":"\t\t\treturn false"},
  {"line":4723,"text":"\t\t}"},
  {"line":4725,"text":"\t\tif contextToken.Parent.Kind == ast.KindJsxOpeningElement {"},
  {"line":4730,"text":"\t\t\treturn location.Parent.Kind != ast.KindJsxOpeningElement"},
  {"line":4731,"text":"\t\t}"},
  {"line":4733,"text":"\t\tif contextToken.Parent.Kind == ast.KindJsxClosingElement ||"},
  {"line":4734,"text":"\t\t\tcontextToken.Parent.Kind == ast.KindJsxSelfClosingElement {"},
  {"line":4735,"text":"\t\t\treturn contextToken.Parent.Parent != nil && contextToken.Parent.Parent.Kind == ast.KindJsxElement"},
  {"line":4736,"text":"\t\t}"},
  {"line":4737,"text":"\t}"},
  {"line":4739,"text":"\treturn false"},
  {"line":4740,"text":"}"},
  {"line":4742,"text":"func clientSupportsItemLabelDetails(ctx context.Context) bool {"},
  {"line":4743,"text":"\treturn lsproto.GetClientCapabilities(ctx).TextDocument.Completion.CompletionItem.LabelDetailsSupport"},
  {"line":4744,"text":"}"},
  {"line":4746,"text":"func clientSupportsItemSnippet(ctx context.Context) bool {"},
  {"line":4747,"text":"\treturn lsproto.GetClientCapabilities(ctx).TextDocument.Completion.CompletionItem.SnippetSupport"},
  {"line":4748,"text":"}"},
  {"line":4750,"text":"func clientSupportsItemCommitCharacters(ctx context.Context) bool {"},
  {"line":4751,"text":"\treturn lsproto.GetClientCapabilities(ctx).TextDocument.Completion.CompletionItem.CommitCharactersSupport"},
  {"line":4752,"text":"}"},
  {"line":4754,"text":"func clientSupportsItemInsertReplace(ctx context.Context) bool {"},
  {"line":4755,"text":"\treturn lsproto.GetClientCapabilities(ctx).TextDocument.Completion.CompletionItem.InsertReplaceSupport"},
  {"line":4756,"text":"}"},
  {"line":4758,"text":"func clientSupportsDefaultCommitCharacters(ctx context.Context) bool {"},
  {"line":4759,"text":"\treturn slices.Contains(lsproto.GetClientCapabilities(ctx).TextDocument.Completion.CompletionList.ItemDefaults, \"commitCharacters\")"},
  {"line":4760,"text":"}"},
  {"line":4762,"text":"func clientSupportsDefaultEditRange(ctx context.Context) bool {"},
  {"line":4763,"text":"\treturn slices.Contains(lsproto.GetClientCapabilities(ctx).TextDocument.Completion.CompletionList.ItemDefaults, \"editRange\")"},
  {"line":4764,"text":"}"},
  {"line":4766,"text":"type argumentInfoForCompletions struct {"},
  {"line":4767,"text":"\tinvocation    *ast.CallLikeExpression"},
  {"line":4768,"text":"\targumentIndex int"},
  {"line":4769,"text":"\targumentCount int"},
  {"line":4770,"text":"}"},
  {"line":4772,"text":"func getArgumentInfoForCompletions(node *ast.Node, position int, file *ast.SourceFile, typeChecker *checker.Checker) *argumentInfoForCompletions {"},
  {"line":4773,"text":"\tinfo := getImmediatelyContainingArgumentInfo(node, position, file, typeChecker)"},
  {"line":4774,"text":"\tif info == nil || info.isTypeParameterList || info.invocation.callInvocation == nil {"},
  {"line":4775,"text":"\t\treturn nil"},
  {"line":4776,"text":"\t}"},
  {"line":4777,"text":"\treturn &argumentInfoForCompletions{"},
  {"line":4778,"text":"\t\tinvocation:    info.invocation.callInvocation.node,"},
  {"line":4779,"text":"\t\targumentIndex: info.argumentIndex,"},
  {"line":4780,"text":"\t\targumentCount: info.argumentCount,"},
  {"line":4781,"text":"\t}"},
  {"line":4782,"text":"}"},
  {"line":4793,"text":"const ("},
  {"line":4795,"text":"\tSourceThisProperty = \"ThisProperty/\""},
  {"line":4797,"text":"\tSourceClassMemberSnippet = \"ClassMemberSnippet/\""},
  {"line":4799,"text":"\tSourceTypeOnlyAlias = \"TypeOnlyAlias/\""},
  {"line":4801,"text":"\tSourceObjectLiteralMethodSnippet = \"ObjectLiteralMethodSnippet/\""},
  {"line":4803,"text":"\tSourceSwitchCases = \"SwitchCases/\""},
  {"line":4805,"text":"\tSourceObjectLiteralMemberWithComma = \"ObjectLiteralMemberWithComma/\""},
  {"line":4806,"text":")"},
  {"line":4808,"text":"func (l *LanguageService) ResolveCompletionItem("},
  {"line":4809,"text":"\tctx context.Context,"},
  {"line":4810,"text":"\titem *lsproto.CompletionItem,"},
  {"line":4811,"text":"\tdata *lsproto.CompletionItemData,"},
  {"line":4812,"text":") (*lsproto.CompletionItem, error) {"},
  {"line":4813,"text":"\tif data == nil {"},
  {"line":4814,"text":"\t\treturn nil, errors.New(\"completion item data is nil\")"},
  {"line":4815,"text":"\t}"},
  {"line":4817,"text":"\tprogram, file := l.tryGetProgramAndFile(data.FileName)"},
  {"line":4818,"text":"\tif file == nil {"},
  {"line":4819,"text":"\t\treturn nil, fmt.Errorf(\"file not found: %s\", data.FileName)"},
  {"line":4820,"text":"\t}"},
  {"line":4822,"text":"\tchecker, done := program.GetTypeCheckerForFile(ctx, file)"},
  {"line":4823,"text":"\tdefer done()"},
  {"line":4824,"text":"\treturn l.getCompletionItemDetails(ctx, program, checker, int(data.Position), file, item, data), nil"},
  {"line":4825,"text":"}"},
  {"line":4827,"text":"func getCompletionDocumentationFormat(ctx context.Context) lsproto.MarkupKind {"},
  {"line":4828,"text":"\treturn lsproto.PreferredMarkupKind(lsproto.GetClientCapabilities(ctx).TextDocument.Completion.CompletionItem.DocumentationFormat)"},
  {"line":4829,"text":"}"},
  {"line":4831,"text":"func (l *LanguageService) getCompletionItemDetails("},
  {"line":4832,"text":"\tctx context.Context,"},
  {"line":4833,"text":"\tprogram *compiler.Program,"},
  {"line":4834,"text":"\tchecker *checker.Checker,"},
  {"line":4835,"text":"\tposition int,"},
  {"line":4836,"text":"\tfile *ast.SourceFile,"},
  {"line":4837,"text":"\titem *lsproto.CompletionItem,"},
  {"line":4838,"text":"\tdata *lsproto.CompletionItemData,"},
  {"line":4839,"text":") *lsproto.CompletionItem {"},
  {"line":4840,"text":"\tdocFormat := getCompletionDocumentationFormat(ctx)"},
  {"line":4841,"text":"\tcontextToken, previousToken := getRelevantTokens(position, file)"},
  {"line":4842,"text":"\tif IsInString(file, position, previousToken) {"},
  {"line":4843,"text":"\t\treturn l.getStringLiteralCompletionDetails("},
  {"line":4844,"text":"\t\t\tctx,"},
  {"line":4845,"text":"\t\t\tchecker,"},
  {"line":4846,"text":"\t\t\titem,"},
  {"line":4847,"text":"\t\t\tdata.Name,"},
  {"line":4848,"text":"\t\t\tfile,"},
  {"line":4849,"text":"\t\t\tposition,"},
  {"line":4850,"text":"\t\t\tcontextToken,"},
  {"line":4851,"text":"\t\t\tdocFormat,"},
  {"line":4852,"text":"\t\t)"},
  {"line":4853,"text":"\t}"},
  {"line":4855,"text":"\tif data.AutoImport != nil {"},
  {"line":4856,"text":"\t\tedits, description := (&autoimport.Fix{AutoImportFix: data.AutoImport}).Edits(ctx, file, program.Options(), l.FormatOptions(), l.converters, l.UserPreferences())"},
  {"line":4857,"text":"\t\titem.AdditionalTextEdits = &edits"},
  {"line":4858,"text":"\t\titem.Detail = strPtrTo(description)"},
  {"line":4859,"text":"\t\treturn item"},
  {"line":4860,"text":"\t}"},
  {"line":4863,"text":"\tsymbolCompletion := l.getSymbolCompletionFromItemData("},
  {"line":4864,"text":"\t\tctx,"},
  {"line":4865,"text":"\t\tchecker,"},
  {"line":4866,"text":"\t\tfile,"},
  {"line":4867,"text":"\t\tposition,"},
  {"line":4868,"text":"\t\tdata,"},
  {"line":4869,"text":"\t)"},
  {"line":4870,"text":"\tpreferences := l.UserPreferences()"},
  {"line":4872,"text":"\tswitch {"},
  {"line":4873,"text":"\tcase symbolCompletion.request != nil:"},
  {"line":4874,"text":"\t\trequest := *symbolCompletion.request"},
  {"line":4875,"text":"\t\tswitch request := request.(type) {"},
  {"line":4876,"text":"\t\tcase *completionDataJSDocTagName:"},
  {"line":4877,"text":"\t\t\treturn createSimpleDetails(item, data.Name, docFormat)"},
  {"line":4878,"text":"\t\tcase *completionDataJSDocTag:"},
  {"line":4879,"text":"\t\t\treturn createSimpleDetails(item, data.Name, docFormat)"},
  {"line":4880,"text":"\t\tcase *completionDataJSDocParameterName:"},
  {"line":4881,"text":"\t\t\treturn createSimpleDetails(item, data.Name, docFormat)"},
  {"line":4882,"text":"\t\tcase *completionDataKeyword:"},
  {"line":4883,"text":"\t\t\tif core.Some(request.keywordCompletions, func(c *lsproto.CompletionItem) bool {"},
  {"line":4884,"text":"\t\t\t\treturn c.Label == data.Name"},
  {"line":4885,"text":"\t\t\t}) {"},
  {"line":4886,"text":"\t\t\t\treturn createSimpleDetails(item, data.Name, docFormat)"},
  {"line":4887,"text":"\t\t\t}"},
  {"line":4888,"text":"\t\t\treturn item"},
  {"line":4889,"text":"\t\tdefault:"},
  {"line":4890,"text":"\t\t\tpanic(fmt.Sprintf(\"Unexpected completion data type: %T\", request))"},
  {"line":4891,"text":"\t\t}"},
  {"line":4892,"text":"\tcase symbolCompletion.symbol != nil:"},
  {"line":4893,"text":"\t\tsymbolDetails := symbolCompletion.symbol"},
  {"line":4894,"text":"\t\treturn l.createCompletionDetailsForSymbol("},
  {"line":4895,"text":"\t\t\titem,"},
  {"line":4896,"text":"\t\t\tsymbolDetails.symbol,"},
  {"line":4897,"text":"\t\t\tchecker,"},
  {"line":4898,"text":"\t\t\tsymbolDetails.location,"},
  {"line":4899,"text":"\t\t\tposition,"},
  {"line":4900,"text":"\t\t\tdocFormat,"},
  {"line":4901,"text":"\t\t)"},
  {"line":4902,"text":"\tcase symbolCompletion.literal != nil:"},
  {"line":4903,"text":"\t\tliteral := symbolCompletion.literal"},
  {"line":4904,"text":"\t\treturn createSimpleDetails(item, completionNameForLiteral(file, preferences, *literal), docFormat)"},
  {"line":4905,"text":"\tcase symbolCompletion.cases != nil:"},
  {"line":4906,"text":"\t\treturn item"},
  {"line":4907,"text":"\tdefault:"},
  {"line":4909,"text":"\t\tif core.Some(allKeywordCompletions(), func(c *lsproto.CompletionItem) bool {"},
  {"line":4910,"text":"\t\t\treturn c.Label == data.Name"},
  {"line":4911,"text":"\t\t}) {"},
  {"line":4912,"text":"\t\t\treturn createSimpleDetails(item, data.Name, docFormat)"},
  {"line":4913,"text":"\t\t}"},
  {"line":4914,"text":"\t\treturn item"},
  {"line":4915,"text":"\t}"},
  {"line":4916,"text":"}"},
  {"line":4918,"text":"type detailsData struct {"},
  {"line":4919,"text":"\tsymbol  *symbolDetails"},
  {"line":4920,"text":"\trequest *completionData"},
  {"line":4921,"text":"\tliteral *literalValue"},
  {"line":4922,"text":"\tcases   *struct{}"},
  {"line":4923,"text":"}"},
  {"line":4925,"text":"type symbolDetails struct {"},
  {"line":4926,"text":"\tsymbol             *ast.Symbol"},
  {"line":4927,"text":"\tlocation           *ast.Node"},
  {"line":4928,"text":"\torigin             *symbolOriginInfo"},
  {"line":4929,"text":"\tpreviousToken      *ast.Node"},
  {"line":4930,"text":"\tcontextToken       *ast.Node"},
  {"line":4931,"text":"\tjsxInitializer     jsxInitializer"},
  {"line":4932,"text":"\tisTypeOnlyLocation bool"},
  {"line":4933,"text":"}"},
  {"line":4935,"text":"func (l *LanguageService) getSymbolCompletionFromItemData("},
  {"line":4936,"text":"\tctx context.Context,"},
  {"line":4937,"text":"\tch *checker.Checker,"},
  {"line":4938,"text":"\tfile *ast.SourceFile,"},
  {"line":4939,"text":"\tposition int,"},
  {"line":4940,"text":"\titemData *lsproto.CompletionItemData,"},
  {"line":4941,"text":") detailsData {"},
  {"line":4942,"text":"\tif itemData.Source == SourceSwitchCases {"},
  {"line":4943,"text":"\t\treturn detailsData{"},
  {"line":4944,"text":"\t\t\tcases: &struct{}{},"},
  {"line":4945,"text":"\t\t}"},
  {"line":4946,"text":"\t}"},
  {"line":4948,"text":"\tcompletionData, err := l.getCompletionData(ctx, ch, file, position, l.UserPreferences(), true /*forItemResolve*/)"},
  {"line":4949,"text":"\tif err != nil {"},
  {"line":4950,"text":"\t\tpanic(err)"},
  {"line":4951,"text":"\t}"},
  {"line":4953,"text":"\tif completionData == nil {"},
  {"line":4954,"text":"\t\treturn detailsData{}"},
  {"line":4955,"text":"\t}"},
  {"line":4957,"text":"\tif _, ok := completionData.(*completionDataData); !ok {"},
  {"line":4958,"text":"\t\treturn detailsData{"},
  {"line":4959,"text":"\t\t\trequest: &completionData,"},
  {"line":4960,"text":"\t\t}"},
  {"line":4961,"text":"\t}"},
  {"line":4963,"text":"\tdata := completionData.(*completionDataData)"},
  {"line":4965,"text":"\tpreferences := l.UserPreferences()"},
  {"line":4966,"text":"\tvar literal literalValue"},
  {"line":4967,"text":"\tfor _, l := range data.literals {"},
  {"line":4968,"text":"\t\tif completionNameForLiteral(file, preferences, l) == itemData.Name {"},
  {"line":4969,"text":"\t\t\tliteral = l"},
  {"line":4970,"text":"\t\t\tbreak"},
  {"line":4971,"text":"\t\t}"},
  {"line":4972,"text":"\t}"},
  {"line":4973,"text":"\tif literal != nil {"},
  {"line":4974,"text":"\t\treturn detailsData{"},
  {"line":4975,"text":"\t\t\tliteral: &literal,"},
  {"line":4976,"text":"\t\t}"},
  {"line":4977,"text":"\t}"},
  {"line":4983,"text":"\tfor index, symbol := range data.symbols {"},
  {"line":4984,"text":"\t\torigin := data.symbolToOriginInfoMap[index]"},
  {"line":4985,"text":"\t\tdisplayName, _ := getCompletionEntryDisplayNameForSymbol(symbol, origin, data.completionKind, data.isJsxIdentifierExpected)"},
  {"line":4986,"text":"\t\tif displayName == itemData.Name &&"},
  {"line":4987,"text":"\t\t\t(itemData.Source == string(completionSourceClassMemberSnippet) && symbol.Flags&ast.SymbolFlagsClassMember != 0 ||"},
  {"line":4988,"text":"\t\t\t\titemData.Source == string(completionSourceObjectLiteralMethodSnippet) && symbol.Flags&(ast.SymbolFlagsProperty|ast.SymbolFlagsMethod) != 0 ||"},
  {"line":4989,"text":"\t\t\t\tgetSourceFromOrigin(origin) == itemData.Source ||"},
  {"line":4990,"text":"\t\t\t\titemData.Source == string(completionSourceObjectLiteralMemberWithComma)) {"},
  {"line":4991,"text":"\t\t\treturn detailsData{"},
  {"line":4992,"text":"\t\t\t\tsymbol: &symbolDetails{"},
  {"line":4993,"text":"\t\t\t\t\tsymbol:             symbol,"},
  {"line":4994,"text":"\t\t\t\t\tlocation:           data.location,"},
  {"line":4995,"text":"\t\t\t\t\torigin:             origin,"},
  {"line":4996,"text":"\t\t\t\t\tpreviousToken:      data.previousToken,"},
  {"line":4997,"text":"\t\t\t\t\tcontextToken:       data.contextToken,"},
  {"line":4998,"text":"\t\t\t\t\tjsxInitializer:     data.jsxInitializer,"},
  {"line":4999,"text":"\t\t\t\t\tisTypeOnlyLocation: data.isTypeOnlyLocation,"},
  {"line":5000,"text":"\t\t\t\t},"},
  {"line":5001,"text":"\t\t\t}"},
  {"line":5002,"text":"\t\t}"},
  {"line":5003,"text":"\t}"},
  {"line":5004,"text":"\treturn detailsData{}"},
  {"line":5005,"text":"}"},
  {"line":5007,"text":"func createSimpleDetails("},
  {"line":5008,"text":"\titem *lsproto.CompletionItem,"},
  {"line":5009,"text":"\tname string,"},
  {"line":5010,"text":"\tdocFormat lsproto.MarkupKind,"},
  {"line":5011,"text":") *lsproto.CompletionItem {"},
  {"line":5012,"text":"\treturn createCompletionDetails(item, name, \"\" /*documentation*/, docFormat)"},
  {"line":5013,"text":"}"},
  {"line":5015,"text":"func createCompletionDetails("},
  {"line":5016,"text":"\titem *lsproto.CompletionItem,"},
  {"line":5017,"text":"\tdetail string,"},
  {"line":5018,"text":"\tdocumentation string,"},
  {"line":5019,"text":"\tdocFormat lsproto.MarkupKind,"},
  {"line":5020,"text":") *lsproto.CompletionItem {"},
  {"line":5022,"text":"\tif item.Detail == nil && detail != \"\" {"},
  {"line":5023,"text":"\t\titem.Detail = &detail"},
  {"line":5024,"text":"\t}"},
  {"line":5025,"text":"\tif documentation != \"\" {"},
  {"line":5026,"text":"\t\titem.Documentation = &lsproto.StringOrMarkupContent{"},
  {"line":5027,"text":"\t\t\tMarkupContent: &lsproto.MarkupContent{"},
  {"line":5028,"text":"\t\t\t\tKind:  docFormat,"},
  {"line":5029,"text":"\t\t\t\tValue: documentation,"},
  {"line":5030,"text":"\t\t\t},"},
  {"line":5031,"text":"\t\t}"},
  {"line":5032,"text":"\t}"},
  {"line":5033,"text":"\treturn item"},
  {"line":5034,"text":"}"},
  {"line":5036,"text":"type codeAction struct {"},
  {"line":5038,"text":"\tdescription string"},
  {"line":5040,"text":"\tchanges []*lsproto.TextEdit"},
  {"line":5041,"text":"}"},
  {"line":5043,"text":"func (l *LanguageService) createCompletionDetailsForSymbol("},
  {"line":5044,"text":"\titem *lsproto.CompletionItem,"},
  {"line":5045,"text":"\tsymbol *ast.Symbol,"},
  {"line":5046,"text":"\tchecker *checker.Checker,"},
  {"line":5047,"text":"\tlocation *ast.Node,"},
  {"line":5048,"text":"\tposition int,"},
  {"line":5049,"text":"\tdocFormat lsproto.MarkupKind,"},
  {"line":5050,"text":") *lsproto.CompletionItem {"},
  {"line":5051,"text":"\tquickInfo, documentation := l.getQuickInfoAndDocumentationForSymbol(checker, symbol, location, docFormat, nil)"},
  {"line":5052,"text":"\treturn createCompletionDetails(item, quickInfo, documentation, docFormat)"},
  {"line":5053,"text":"}"},
  {"line":5055,"text":"func (l *LanguageService) getImportStatementCompletionInfo(contextToken *ast.Node, sourceFile *ast.SourceFile) importStatementCompletionInfo {"},
  {"line":5056,"text":"\tresult := importStatementCompletionInfo{}"},
  {"line":5057,"text":"\tvar candidate *ast.Node"},
  {"line":5058,"text":"\tparent := contextToken.Parent"},
  {"line":5059,"text":"\tswitch {"},
  {"line":5060,"text":"\tcase ast.IsImportEqualsDeclaration(parent):"},
  {"line":5063,"text":"\t\tlastToken := lsutil.GetLastToken(parent, sourceFile)"},
  {"line":5064,"text":"\t\tif contextToken.Kind == ast.KindIdentifier && lastToken != contextToken {"},
  {"line":5065,"text":"\t\t\tresult.keywordCompletion = ast.KindFromKeyword"},
  {"line":5066,"text":"\t\t\tresult.isKeywordOnlyCompletion = true"},
  {"line":5067,"text":"\t\t} else {"},
  {"line":5068,"text":"\t\t\tif contextToken.Kind != ast.KindTypeKeyword {"},
  {"line":5069,"text":"\t\t\t\tresult.keywordCompletion = ast.KindTypeKeyword"},
  {"line":5070,"text":"\t\t\t}"},
  {"line":5071,"text":"\t\t\tif isModuleSpecifierMissingOrEmpty(parent.AsImportEqualsDeclaration().ModuleReference) {"},
  {"line":5072,"text":"\t\t\t\tcandidate = parent"},
  {"line":5073,"text":"\t\t\t}"},
  {"line":5074,"text":"\t\t}"},
  {"line":5076,"text":"\tcase couldBeTypeOnlyImportSpecifier(parent, contextToken) && canCompleteFromNamedBindings(parent.Parent):"},
  {"line":5077,"text":"\t\tcandidate = parent"},
  {"line":5078,"text":"\tcase ast.IsNamedImports(parent) || ast.IsNamespaceImport(parent):"},
  {"line":5079,"text":"\t\tif !parent.Parent.IsTypeOnly() && (contextToken.Kind == ast.KindOpenBraceToken ||"},
  {"line":5080,"text":"\t\t\tcontextToken.Kind == ast.KindImportKeyword ||"},
  {"line":5081,"text":"\t\t\tcontextToken.Kind == ast.KindCommaToken) {"},
  {"line":5082,"text":"\t\t\tresult.keywordCompletion = ast.KindTypeKeyword"},
  {"line":5083,"text":"\t\t}"},
  {"line":5084,"text":"\t\tif canCompleteFromNamedBindings(parent) {"},
  {"line":5086,"text":"\t\t\tif contextToken.Kind == ast.KindCloseBraceToken || contextToken.Kind == ast.KindIdentifier {"},
  {"line":5087,"text":"\t\t\t\tresult.isKeywordOnlyCompletion = true"},
  {"line":5088,"text":"\t\t\t\tresult.keywordCompletion = ast.KindFromKeyword"},
  {"line":5089,"text":"\t\t\t} else {"},
  {"line":5090,"text":"\t\t\t\tcandidate = parent.Parent.Parent"},
  {"line":5091,"text":"\t\t\t}"},
  {"line":5092,"text":"\t\t}"},
  {"line":5094,"text":"\tcase ast.IsExportDeclaration(parent) && contextToken.Kind == ast.KindAsteriskToken,"},
  {"line":5095,"text":"\t\tast.IsNamedExports(parent) && contextToken.Kind == ast.KindCloseBraceToken:"},
  {"line":5096,"text":"\t\tresult.isKeywordOnlyCompletion = true"},
  {"line":5097,"text":"\t\tresult.keywordCompletion = ast.KindFromKeyword"},
  {"line":5099,"text":"\tcase contextToken.Kind == ast.KindImportKeyword:"},
  {"line":5100,"text":"\t\tif ast.IsSourceFile(parent) {"},
  {"line":5102,"text":"\t\t\tresult.keywordCompletion = ast.KindTypeKeyword"},
  {"line":5103,"text":"\t\t\tcandidate = contextToken"},
  {"line":5104,"text":"\t\t} else if ast.IsImportDeclaration(parent) {"},
  {"line":5106,"text":"\t\t\tresult.keywordCompletion = ast.KindTypeKeyword"},
  {"line":5107,"text":"\t\t\tif isModuleSpecifierMissingOrEmpty(parent.ModuleSpecifier()) {"},
  {"line":5108,"text":"\t\t\t\tcandidate = parent"},
  {"line":5109,"text":"\t\t\t}"},
  {"line":5110,"text":"\t\t}"},
  {"line":5111,"text":"\t}"},
  {"line":5113,"text":"\tif candidate != nil {"},
  {"line":5114,"text":"\t\tresult.isNewIdentifierLocation = true"},
  {"line":5115,"text":"\t\tresult.replacementSpan = l.getSingleLineReplacementSpanForImportCompletionNode(candidate)"},
  {"line":5116,"text":"\t\tresult.couldBeTypeOnlyImportSpecifier = couldBeTypeOnlyImportSpecifier(candidate, contextToken)"},
  {"line":5117,"text":"\t\tif ast.IsImportDeclaration(candidate) {"},
  {"line":5118,"text":"\t\t\tif importClause := candidate.ImportClause(); importClause != nil {"},
  {"line":5119,"text":"\t\t\t\tresult.isTopLevelTypeOnly = importClause.IsTypeOnly()"},
  {"line":5120,"text":"\t\t\t}"},
  {"line":5121,"text":"\t\t} else if candidate.Kind == ast.KindImportEqualsDeclaration {"},
  {"line":5122,"text":"\t\t\tresult.isTopLevelTypeOnly = candidate.IsTypeOnly()"},
  {"line":5123,"text":"\t\t}"},
  {"line":5124,"text":"\t} else {"},
  {"line":5125,"text":"\t\tresult.isNewIdentifierLocation = result.keywordCompletion == ast.KindTypeKeyword"},
  {"line":5126,"text":"\t}"},
  {"line":5127,"text":"\treturn result"},
  {"line":5128,"text":"}"},
  {"line":5130,"text":"func (l *LanguageService) getSingleLineReplacementSpanForImportCompletionNode(node *ast.Node) *lsproto.Range {"},
  {"line":5132,"text":"\tif ancestor := ast.FindAncestor(node, core.Or(ast.IsImportDeclaration, ast.IsImportEqualsDeclaration, ast.IsJSDocImportTag)); ancestor != nil {"},
  {"line":5133,"text":"\t\tnode = ancestor"},
  {"line":5134,"text":"\t}"},
  {"line":5135,"text":"\tsourceFile := ast.GetSourceFileOfNode(node)"},
  {"line":5137,"text":"\ttokenPos := scanner.GetTokenPosOfNode(node, sourceFile, false /*includeJSDoc*/)"},
  {"line":5138,"text":"\tif printer.GetLinesBetweenPositions(sourceFile, tokenPos, node.End()) == 0 {"},
  {"line":5139,"text":"\t\treturn new(l.createLspRangeFromNode(node, sourceFile))"},
  {"line":5140,"text":"\t}"},
  {"line":5142,"text":"\tif node.Kind == ast.KindImportKeyword || node.Kind == ast.KindImportSpecifier {"},
  {"line":5143,"text":"\t\tpanic(\"ImportKeyword was necessarily on one line; ImportSpecifier was necessarily parented in an ImportDeclaration\")"},
  {"line":5144,"text":"\t}"},
  {"line":5148,"text":"\tvar potentialSplitPoint *ast.Node"},
  {"line":5149,"text":"\tif node.Kind == ast.KindImportDeclaration || node.Kind == ast.KindJSDocImportTag {"},
  {"line":5150,"text":"\t\tvar specifier *ast.Node"},
  {"line":5151,"text":"\t\tif importClause := node.ImportClause(); importClause != nil {"},
  {"line":5152,"text":"\t\t\tspecifier = getPotentiallyInvalidImportSpecifier(importClause.AsImportClause().NamedBindings)"},
  {"line":5153,"text":"\t\t}"},
  {"line":5155,"text":"\t\tif specifier != nil {"},
  {"line":5156,"text":"\t\t\tpotentialSplitPoint = specifier"},
  {"line":5157,"text":"\t\t} else {"},
  {"line":5158,"text":"\t\t\tpotentialSplitPoint = node.ModuleSpecifier()"},
  {"line":5159,"text":"\t\t}"},
  {"line":5160,"text":"\t} else {"},
  {"line":5161,"text":"\t\tpotentialSplitPoint = node.AsImportEqualsDeclaration().ModuleReference"},
  {"line":5162,"text":"\t}"},
  {"line":5164,"text":"\twithoutModuleSpecifier := core.NewTextRange(scanner.GetTokenPosOfNode(lsutil.GetFirstToken(node, sourceFile), sourceFile, false), potentialSplitPoint.Pos())"},
  {"line":5174,"text":"\tif printer.GetLinesBetweenPositions(sourceFile, withoutModuleSpecifier.Pos(), withoutModuleSpecifier.End()) == 0 {"},
  {"line":5175,"text":"\t\treturn new(l.createLspRangeFromBounds(withoutModuleSpecifier.Pos(), withoutModuleSpecifier.End(), sourceFile))"},
  {"line":5176,"text":"\t}"},
  {"line":5177,"text":"\treturn nil"},
  {"line":5178,"text":"}"},
  {"line":5180,"text":"func couldBeTypeOnlyImportSpecifier(importSpecifier *ast.Node, contextToken *ast.Node) bool {"},
  {"line":5181,"text":"\treturn ast.IsImportSpecifier(importSpecifier) && (importSpecifier.IsTypeOnly() || contextToken == importSpecifier.Name() && isTypeKeywordTokenOrIdentifier(contextToken))"},
  {"line":5182,"text":"}"},
  {"line":5184,"text":"func canCompleteFromNamedBindings(namedBindings *ast.NamedImportBindings) bool {"},
  {"line":5185,"text":"\tif !isModuleSpecifierMissingOrEmpty(namedBindings.Parent.Parent.ModuleSpecifier()) || namedBindings.Parent.Name() != nil {"},
  {"line":5186,"text":"\t\treturn false"},
  {"line":5187,"text":"\t}"},
  {"line":5188,"text":"\tif ast.IsNamedImports(namedBindings) {"},
  {"line":5192,"text":"\t\tinvalidNamedImport := getPotentiallyInvalidImportSpecifier(namedBindings)"},
  {"line":5193,"text":"\t\telements := namedBindings.Elements()"},
  {"line":5194,"text":"\t\tvalidImports := len(elements)"},
  {"line":5195,"text":"\t\tif invalidNamedImport != nil {"},
  {"line":5196,"text":"\t\t\tvalidImports = slices.Index(elements, invalidNamedImport)"},
  {"line":5197,"text":"\t\t}"},
  {"line":5199,"text":"\t\treturn validImports < 2 && validImports > -1"},
  {"line":5200,"text":"\t}"},
  {"line":5201,"text":"\treturn true"},
  {"line":5202,"text":"}"},
  {"line":5212,"text":"func getPotentiallyInvalidImportSpecifier(namedBindings *ast.NamedImportBindings) *ast.Node {"},
  {"line":5213,"text":"\tif namedBindings == nil || namedBindings.Kind != ast.KindNamedImports {"},
  {"line":5214,"text":"\t\treturn nil"},
  {"line":5215,"text":"\t}"},
  {"line":5216,"text":"\treturn core.Find(namedBindings.Elements(), func(e *ast.Node) bool {"},
  {"line":5217,"text":"\t\treturn e.PropertyName() == nil && lsutil.IsNonContextualKeyword(scanner.StringToToken(e.Name().Text())) &&"},
  {"line":5218,"text":"\t\t\tastnav.FindPrecedingToken(ast.GetSourceFileOfNode(namedBindings), e.Name().Pos()).Kind != ast.KindCommaToken"},
  {"line":5219,"text":"\t})"},
  {"line":5220,"text":"}"},
  {"line":5222,"text":"func isModuleSpecifierMissingOrEmpty(specifier *ast.Expression) bool {"},
  {"line":5223,"text":"\tif ast.NodeIsMissing(specifier) {"},
  {"line":5224,"text":"\t\treturn true"},
  {"line":5225,"text":"\t}"},
  {"line":5226,"text":"\tnode := specifier"},
  {"line":5227,"text":"\tif ast.IsExternalModuleReference(node) {"},
  {"line":5228,"text":"\t\tnode = node.Expression()"},
  {"line":5229,"text":"\t}"},
  {"line":5230,"text":"\tif !ast.IsStringLiteralLike(node) {"},
  {"line":5231,"text":"\t\treturn true"},
  {"line":5232,"text":"\t}"},
  {"line":5233,"text":"\treturn node.Text() == \"\""},
  {"line":5234,"text":"}"},
  {"line":5236,"text":"func hasDocComment(file *ast.SourceFile, position int) bool {"},
  {"line":5237,"text":"\ttoken := astnav.GetTokenAtPosition(file, position)"},
  {"line":5238,"text":"\treturn ast.FindAncestor(token, (*ast.Node).IsJSDoc) != nil"},
  {"line":5239,"text":"}"},
  {"line":5242,"text":"func getJSDocTagAtPosition(node *ast.Node, position int) *ast.Node {"},
  {"line":5243,"text":"\treturn ast.FindAncestorOrQuit(node, func(n *ast.Node) ast.FindAncestorResult {"},
  {"line":5244,"text":"\t\tif ast.IsJSDocTag(n) && n.Loc.ContainsInclusive(position) {"},
  {"line":5245,"text":"\t\t\treturn ast.FindAncestorTrue"},
  {"line":5246,"text":"\t\t}"},
  {"line":5247,"text":"\t\tif n.IsJSDoc() {"},
  {"line":5248,"text":"\t\t\treturn ast.FindAncestorQuit"},
  {"line":5249,"text":"\t\t}"},
  {"line":5250,"text":"\t\treturn ast.FindAncestorFalse"},
  {"line":5251,"text":"\t})"},
  {"line":5252,"text":"}"},
  {"line":5254,"text":"func tryGetTypeExpressionFromTag(tag *ast.Node) *ast.Node {"},
  {"line":5255,"text":"\tif isTagWithTypeExpression(tag) {"},
  {"line":5256,"text":"\t\tvar typeExpression *ast.Node"},
  {"line":5257,"text":"\t\tif ast.IsJSDocTemplateTag(tag) {"},
  {"line":5258,"text":"\t\t\ttypeExpression = tag.AsJSDocTemplateTag().Constraint"},
  {"line":5259,"text":"\t\t} else {"},
  {"line":5260,"text":"\t\t\ttypeExpression = tag.TypeExpression()"},
  {"line":5261,"text":"\t\t}"},
  {"line":5262,"text":"\t\tif typeExpression != nil && typeExpression.Kind == ast.KindJSDocTypeExpression {"},
  {"line":5263,"text":"\t\t\treturn typeExpression"},
  {"line":5264,"text":"\t\t}"},
  {"line":5265,"text":"\t}"},
  {"line":5266,"text":"\tif ast.IsJSDocAugmentsTag(tag) || ast.IsJSDocImplementsTag(tag) {"},
  {"line":5267,"text":"\t\treturn tag.ClassName()"},
  {"line":5268,"text":"\t}"},
  {"line":5269,"text":"\treturn nil"},
  {"line":5270,"text":"}"},
  {"line":5272,"text":"func isTagWithTypeExpression(tag *ast.Node) bool {"},
  {"line":5273,"text":"\tswitch tag.Kind {"},
  {"line":5274,"text":"\tcase ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag, ast.KindJSDocReturnTag, ast.KindJSDocTypeTag,"},
  {"line":5275,"text":"\t\tast.KindJSDocTypedefTag, ast.KindJSDocThrowsTag, ast.KindJSDocSatisfiesTag:"},
  {"line":5276,"text":"\t\treturn true"},
  {"line":5277,"text":"\tcase ast.KindJSDocTemplateTag:"},
  {"line":5278,"text":"\t\treturn tag.AsJSDocTemplateTag().Constraint != nil"},
  {"line":5279,"text":"\tdefault:"},
  {"line":5280,"text":"\t\treturn false"},
  {"line":5281,"text":"\t}"},
  {"line":5282,"text":"}"},
  {"line":5284,"text":"func (l *LanguageService) jsDocCompletionInfo("},
  {"line":5285,"text":"\tctx context.Context,"},
  {"line":5286,"text":"\tposition int,"},
  {"line":5287,"text":"\tfile *ast.SourceFile,"},
  {"line":5288,"text":"\titems []*lsproto.CompletionItem,"},
  {"line":5289,"text":") *lsproto.CompletionList {"},
  {"line":5290,"text":"\tdefaultCommitCharacters := getDefaultCommitCharacters(false /*isNewIdentifierLocation*/)"},
  {"line":5291,"text":"\titemDefaults := l.setItemDefaults("},
  {"line":5292,"text":"\t\tctx,"},
  {"line":5293,"text":"\t\tposition,"},
  {"line":5294,"text":"\t\tfile,"},
  {"line":5295,"text":"\t\titems,"},
  {"line":5296,"text":"\t\t&defaultCommitCharacters,"},
  {"line":5297,"text":"\t\tnil, /*optionalReplacementSpan*/"},
  {"line":5298,"text":"\t)"},
  {"line":5299,"text":"\treturn &lsproto.CompletionList{"},
  {"line":5300,"text":"\t\tIsIncomplete: false,"},
  {"line":5301,"text":"\t\tItemDefaults: itemDefaults,"},
  {"line":5302,"text":"\t\tItems:        items,"},
  {"line":5303,"text":"\t}"},
  {"line":5304,"text":"}"},
  {"line":5306,"text":"var jsDocTagNames = []string{"},
  {"line":5307,"text":"\t\"abstract\","},
  {"line":5308,"text":"\t\"access\","},
  {"line":5309,"text":"\t\"alias\","},
  {"line":5310,"text":"\t\"argument\","},
  {"line":5311,"text":"\t\"async\","},
  {"line":5312,"text":"\t\"augments\","},
  {"line":5313,"text":"\t\"author\","},
  {"line":5314,"text":"\t\"borrows\","},
  {"line":5315,"text":"\t\"callback\","},
  {"line":5316,"text":"\t\"class\","},
  {"line":5317,"text":"\t\"classdesc\","},
  {"line":5318,"text":"\t\"constant\","},
  {"line":5319,"text":"\t\"constructor\","},
  {"line":5320,"text":"\t\"constructs\","},
  {"line":5321,"text":"\t\"copyright\","},
  {"line":5322,"text":"\t\"default\","},
  {"line":5323,"text":"\t\"deprecated\","},
  {"line":5324,"text":"\t\"description\","},
  {"line":5325,"text":"\t\"emits\","},
  {"line":5326,"text":"\t\"enum\","},
  {"line":5327,"text":"\t\"event\","},
  {"line":5328,"text":"\t\"example\","},
  {"line":5329,"text":"\t\"exports\","},
  {"line":5330,"text":"\t\"extends\","},
  {"line":5331,"text":"\t\"external\","},
  {"line":5332,"text":"\t\"field\","},
  {"line":5333,"text":"\t\"file\","},
  {"line":5334,"text":"\t\"fileoverview\","},
  {"line":5335,"text":"\t\"fires\","},
  {"line":5336,"text":"\t\"function\","},
  {"line":5337,"text":"\t\"generator\","},
  {"line":5338,"text":"\t\"global\","},
  {"line":5339,"text":"\t\"hideconstructor\","},
  {"line":5340,"text":"\t\"host\","},
  {"line":5341,"text":"\t\"ignore\","},
  {"line":5342,"text":"\t\"implements\","},
  {"line":5343,"text":"\t\"import\","},
  {"line":5344,"text":"\t\"inheritdoc\","},
  {"line":5345,"text":"\t\"inner\","},
  {"line":5346,"text":"\t\"instance\","},
  {"line":5347,"text":"\t\"interface\","},
  {"line":5348,"text":"\t\"kind\","},
  {"line":5349,"text":"\t\"lends\","},
  {"line":5350,"text":"\t\"license\","},
  {"line":5351,"text":"\t\"link\","},
  {"line":5352,"text":"\t\"linkcode\","},
  {"line":5353,"text":"\t\"linkplain\","},
  {"line":5354,"text":"\t\"listens\","},
  {"line":5355,"text":"\t\"member\","},
  {"line":5356,"text":"\t\"memberof\","},
  {"line":5357,"text":"\t\"method\","},
  {"line":5358,"text":"\t\"mixes\","},
  {"line":5359,"text":"\t\"module\","},
  {"line":5360,"text":"\t\"name\","},
  {"line":5361,"text":"\t\"namespace\","},
  {"line":5362,"text":"\t\"overload\","},
  {"line":5363,"text":"\t\"override\","},
  {"line":5364,"text":"\t\"package\","},
  {"line":5365,"text":"\t\"param\","},
  {"line":5366,"text":"\t\"private\","},
  {"line":5367,"text":"\t\"prop\","},
  {"line":5368,"text":"\t\"property\","},
  {"line":5369,"text":"\t\"protected\","},
  {"line":5370,"text":"\t\"public\","},
  {"line":5371,"text":"\t\"readonly\","},
  {"line":5372,"text":"\t\"requires\","},
  {"line":5373,"text":"\t\"returns\","},
  {"line":5374,"text":"\t\"satisfies\","},
  {"line":5375,"text":"\t\"see\","},
  {"line":5376,"text":"\t\"since\","},
  {"line":5377,"text":"\t\"static\","},
  {"line":5378,"text":"\t\"summary\","},
  {"line":5379,"text":"\t\"template\","},
  {"line":5380,"text":"\t\"this\","},
  {"line":5381,"text":"\t\"throws\","},
  {"line":5382,"text":"\t\"todo\","},
  {"line":5383,"text":"\t\"tutorial\","},
  {"line":5384,"text":"\t\"type\","},
  {"line":5385,"text":"\t\"typedef\","},
  {"line":5386,"text":"\t\"var\","},
  {"line":5387,"text":"\t\"variation\","},
  {"line":5388,"text":"\t\"version\","},
  {"line":5389,"text":"\t\"virtual\","},
  {"line":5390,"text":"\t\"yields\","},
  {"line":5391,"text":"}"},
  {"line":5393,"text":"var jsDocTagNameCompletionItems = sync.OnceValue(func() []*lsproto.CompletionItem {"},
  {"line":5394,"text":"\titems := make([]*lsproto.CompletionItem, 0, len(jsDocTagNames))"},
  {"line":5395,"text":"\tfor _, tagName := range jsDocTagNames {"},
  {"line":5396,"text":"\t\titem := &lsproto.CompletionItem{"},
  {"line":5397,"text":"\t\t\tLabel:    tagName,"},
  {"line":5398,"text":"\t\t\tKind:     new(lsproto.CompletionItemKindKeyword),"},
  {"line":5399,"text":"\t\t\tSortText: new(string(SortTextLocationPriority)),"},
  {"line":5400,"text":"\t\t}"},
  {"line":5401,"text":"\t\titems = append(items, item)"},
  {"line":5402,"text":"\t}"},
  {"line":5403,"text":"\treturn items"},
  {"line":5404,"text":"})"},
  {"line":5406,"text":"var jsDocTagCompletionItems = sync.OnceValue(func() []*lsproto.CompletionItem {"},
  {"line":5407,"text":"\titems := make([]*lsproto.CompletionItem, 0, len(jsDocTagNames))"},
  {"line":5408,"text":"\tfor _, tagName := range jsDocTagNames {"},
  {"line":5409,"text":"\t\titem := &lsproto.CompletionItem{"},
  {"line":5410,"text":"\t\t\tLabel:    \"@\" + tagName,"},
  {"line":5411,"text":"\t\t\tKind:     new(lsproto.CompletionItemKindKeyword),"},
  {"line":5412,"text":"\t\t\tSortText: new(string(SortTextLocationPriority)),"},
  {"line":5413,"text":"\t\t}"},
  {"line":5414,"text":"\t\titems = append(items, item)"},
  {"line":5415,"text":"\t}"},
  {"line":5416,"text":"\treturn items"},
  {"line":5417,"text":"})"},
  {"line":5419,"text":"func getJSDocTagNameCompletions() []*lsproto.CompletionItem {"},
  {"line":5420,"text":"\treturn cloneItems(jsDocTagNameCompletionItems())"},
  {"line":5421,"text":"}"},
  {"line":5423,"text":"func getJSDocTagCompletions() []*lsproto.CompletionItem {"},
  {"line":5424,"text":"\treturn cloneItems(jsDocTagCompletionItems())"},
  {"line":5425,"text":"}"},
  {"line":5427,"text":"func getJSDocParameterCompletions("},
  {"line":5428,"text":"\tctx context.Context,"},
  {"line":5429,"text":"\tfile *ast.SourceFile,"},
  {"line":5430,"text":"\tposition int,"},
  {"line":5431,"text":"\ttypeChecker *checker.Checker,"},
  {"line":5432,"text":"\toptions *core.CompilerOptions,"},
  {"line":5433,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":5434,"text":"\ttagNameOnly bool,"},
  {"line":5435,"text":") []*lsproto.CompletionItem {"},
  {"line":5436,"text":"\tcurrentToken := astnav.GetTokenAtPosition(file, position)"},
  {"line":5437,"text":"\tif !ast.IsJSDocTag(currentToken) && !currentToken.IsJSDoc() {"},
  {"line":5438,"text":"\t\treturn nil"},
  {"line":5439,"text":"\t}"},
  {"line":5440,"text":"\tvar jsDoc *ast.JSDocNode"},
  {"line":5441,"text":"\tif currentToken.IsJSDoc() {"},
  {"line":5442,"text":"\t\tjsDoc = currentToken"},
  {"line":5443,"text":"\t} else {"},
  {"line":5444,"text":"\t\tjsDoc = currentToken.Parent"},
  {"line":5445,"text":"\t}"},
  {"line":5446,"text":"\tif !jsDoc.IsJSDoc() {"},
  {"line":5447,"text":"\t\treturn nil"},
  {"line":5448,"text":"\t}"},
  {"line":5449,"text":"\tfun := jsDoc.Parent"},
  {"line":5450,"text":"\tif !ast.IsFunctionLike(fun) {"},
  {"line":5451,"text":"\t\treturn nil"},
  {"line":5452,"text":"\t}"},
  {"line":5454,"text":"\tisJS := ast.IsSourceFileJS(file)"},
  {"line":5456,"text":"\tisSnippet := false // !!! need snippet printer"},
  {"line":5457,"text":"\tparamTagCount := 0"},
  {"line":5458,"text":"\tvar tags []*ast.Node"},
  {"line":5459,"text":"\tif jsDoc.AsJSDoc().Tags != nil {"},
  {"line":5460,"text":"\t\ttags = jsDoc.AsJSDoc().Tags.Nodes"},
  {"line":5461,"text":"\t}"},
  {"line":5462,"text":"\tfor _, tag := range tags {"},
  {"line":5463,"text":"\t\tif ast.IsJSDocParameterTag(tag) &&"},
  {"line":5464,"text":"\t\t\tastnav.GetStartOfNode(tag, file, false /*includeJSDoc*/) < position &&"},
  {"line":5465,"text":"\t\t\tast.IsIdentifier(tag.Name()) {"},
  {"line":5466,"text":"\t\t\tparamTagCount++"},
  {"line":5467,"text":"\t\t}"},
  {"line":5468,"text":"\t}"},
  {"line":5469,"text":"\tparamIndex := -1"},
  {"line":5470,"text":"\treturn core.MapNonNil(fun.Parameters(), func(param *ast.ParameterDeclarationNode) *lsproto.CompletionItem {"},
  {"line":5471,"text":"\t\tparamIndex++"},
  {"line":5472,"text":"\t\tif paramIndex < paramTagCount {"},
  {"line":5474,"text":"\t\t\treturn nil"},
  {"line":5475,"text":"\t\t}"},
  {"line":5476,"text":"\t\tif ast.IsIdentifier(param.Name()) { // Named parameter"},
  {"line":5477,"text":"\t\t\ttabstopCounter := 1"},
  {"line":5478,"text":"\t\t\tparamName := param.Name().Text()"},
  {"line":5479,"text":"\t\t\tdisplayText := getJSDocParamAnnotation("},
  {"line":5480,"text":"\t\t\t\tparamName,"},
  {"line":5481,"text":"\t\t\t\tparam.Initializer(),"},
  {"line":5482,"text":"\t\t\t\tparam.AsParameterDeclaration().DotDotDotToken,"},
  {"line":5483,"text":"\t\t\t\tisJS,"},
  {"line":5484,"text":"\t\t\t\t/*isObject*/ false,"},
  {"line":5485,"text":"\t\t\t\t/*isSnippet*/ false,"},
  {"line":5486,"text":"\t\t\t\ttypeChecker,"},
  {"line":5487,"text":"\t\t\t\toptions,"},
  {"line":5488,"text":"\t\t\t\tpreferences,"},
  {"line":5489,"text":"\t\t\t\t&tabstopCounter,"},
  {"line":5490,"text":"\t\t\t)"},
  {"line":5491,"text":"\t\t\tvar snippetText string"},
  {"line":5492,"text":"\t\t\tif isSnippet {"},
  {"line":5493,"text":"\t\t\t\tsnippetText = getJSDocParamAnnotation("},
  {"line":5494,"text":"\t\t\t\t\tparamName,"},
  {"line":5495,"text":"\t\t\t\t\tparam.Initializer(),"},
  {"line":5496,"text":"\t\t\t\t\tparam.AsParameterDeclaration().DotDotDotToken,"},
  {"line":5497,"text":"\t\t\t\t\tisJS,"},
  {"line":5498,"text":"\t\t\t\t\t/*isObject*/ false,"},
  {"line":5499,"text":"\t\t\t\t\t/*isSnippet*/ true,"},
  {"line":5500,"text":"\t\t\t\t\ttypeChecker,"},
  {"line":5501,"text":"\t\t\t\t\toptions,"},
  {"line":5502,"text":"\t\t\t\t\tpreferences,"},
  {"line":5503,"text":"\t\t\t\t\t&tabstopCounter,"},
  {"line":5504,"text":"\t\t\t\t)"},
  {"line":5505,"text":"\t\t\t}"},
  {"line":5506,"text":"\t\t\tif tagNameOnly { // Remove `@`"},
  {"line":5507,"text":"\t\t\t\tdisplayText = displayText[1:]"},
  {"line":5508,"text":"\t\t\t\tif snippetText != \"\" {"},
  {"line":5509,"text":"\t\t\t\t\tsnippetText = snippetText[1:]"},
  {"line":5510,"text":"\t\t\t\t}"},
  {"line":5511,"text":"\t\t\t}"},
  {"line":5513,"text":"\t\t\treturn &lsproto.CompletionItem{"},
  {"line":5514,"text":"\t\t\t\tLabel:            displayText,"},
  {"line":5515,"text":"\t\t\t\tKind:             new(lsproto.CompletionItemKindVariable),"},
  {"line":5516,"text":"\t\t\t\tSortText:         new(string(SortTextLocationPriority)),"},
  {"line":5517,"text":"\t\t\t\tInsertText:       strPtrTo(snippetText),"},
  {"line":5518,"text":"\t\t\t\tInsertTextFormat: core.IfElse(isSnippet, new(lsproto.InsertTextFormatSnippet), nil),"},
  {"line":5519,"text":"\t\t\t}"},
  {"line":5520,"text":"\t\t} else if paramIndex == paramTagCount {"},
  {"line":5522,"text":"\t\t\tparamPath := fmt.Sprintf(\"param%d\", paramIndex)"},
  {"line":5523,"text":"\t\t\tdisplayTextResult := generateJSDocParamTagsForDestructuring("},
  {"line":5524,"text":"\t\t\t\tparamPath,"},
  {"line":5525,"text":"\t\t\t\tparam.Name(),"},
  {"line":5526,"text":"\t\t\t\tparam.Initializer(),"},
  {"line":5527,"text":"\t\t\t\tparam.AsParameterDeclaration().DotDotDotToken,"},
  {"line":5528,"text":"\t\t\t\tisJS,"},
  {"line":5529,"text":"\t\t\t\t/*isSnippet*/ false,"},
  {"line":5530,"text":"\t\t\t\ttypeChecker,"},
  {"line":5531,"text":"\t\t\t\toptions,"},
  {"line":5532,"text":"\t\t\t\tpreferences,"},
  {"line":5533,"text":"\t\t\t)"},
  {"line":5534,"text":"\t\t\tvar snippetText string"},
  {"line":5535,"text":"\t\t\tif isSnippet {"},
  {"line":5536,"text":"\t\t\t\tsnippetTextResult := generateJSDocParamTagsForDestructuring("},
  {"line":5537,"text":"\t\t\t\t\tparamPath,"},
  {"line":5538,"text":"\t\t\t\t\tparam.Name(),"},
  {"line":5539,"text":"\t\t\t\t\tparam.Initializer(),"},
  {"line":5540,"text":"\t\t\t\t\tparam.AsParameterDeclaration().DotDotDotToken,"},
  {"line":5541,"text":"\t\t\t\t\tisJS,"},
  {"line":5542,"text":"\t\t\t\t\t/*isSnippet*/ true,"},
  {"line":5543,"text":"\t\t\t\t\ttypeChecker,"},
  {"line":5544,"text":"\t\t\t\t\toptions,"},
  {"line":5545,"text":"\t\t\t\t\tpreferences,"},
  {"line":5546,"text":"\t\t\t\t)"},
  {"line":5547,"text":"\t\t\t\tsnippetText = strings.Join(snippetTextResult, options.NewLine.GetNewLineCharacter()+\"* \")"},
  {"line":5548,"text":"\t\t\t}"},
  {"line":5549,"text":"\t\t\tdisplayText := strings.Join(displayTextResult, options.NewLine.GetNewLineCharacter()+\"* \")"},
  {"line":5550,"text":"\t\t\tif tagNameOnly { // Remove `@`"},
  {"line":5551,"text":"\t\t\t\tdisplayText = strings.TrimPrefix(displayText, \"@\")"},
  {"line":5552,"text":"\t\t\t\tsnippetText = strings.TrimPrefix(snippetText, \"@\")"},
  {"line":5553,"text":"\t\t\t}"},
  {"line":5554,"text":"\t\t\treturn &lsproto.CompletionItem{"},
  {"line":5555,"text":"\t\t\t\tLabel:            displayText,"},
  {"line":5556,"text":"\t\t\t\tKind:             new(lsproto.CompletionItemKindVariable),"},
  {"line":5557,"text":"\t\t\t\tSortText:         new(string(SortTextLocationPriority)),"},
  {"line":5558,"text":"\t\t\t\tInsertText:       strPtrTo(snippetText),"},
  {"line":5559,"text":"\t\t\t\tInsertTextFormat: core.IfElse(isSnippet, new(lsproto.InsertTextFormatSnippet), nil),"},
  {"line":5560,"text":"\t\t\t}"},
  {"line":5561,"text":"\t\t}"},
  {"line":5562,"text":"\t\treturn nil"},
  {"line":5563,"text":"\t})"},
  {"line":5564,"text":"}"},
  {"line":5566,"text":"func getJSDocParamAnnotation("},
  {"line":5567,"text":"\tparamName string,"},
  {"line":5568,"text":"\tinitializer *ast.Expression,"},
  {"line":5569,"text":"\tdotDotDotToken *ast.TokenNode,"},
  {"line":5570,"text":"\tisJS bool,"},
  {"line":5571,"text":"\tisObject bool,"},
  {"line":5572,"text":"\tisSnippet bool,"},
  {"line":5573,"text":"\ttypeChecker *checker.Checker,"},
  {"line":5574,"text":"\toptions *core.CompilerOptions,"},
  {"line":5575,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":5576,"text":"\ttabstopCounter *int,"},
  {"line":5577,"text":") string {"},
  {"line":5578,"text":"\tif isSnippet {"},
  {"line":5579,"text":"\t\tdebug.Assert(tabstopCounter != nil)"},
  {"line":5580,"text":"\t}"},
  {"line":5581,"text":"\tif initializer != nil {"},
  {"line":5582,"text":"\t\tparamName = getJSDocParamNameWithInitializer(paramName, initializer)"},
  {"line":5583,"text":"\t}"},
  {"line":5584,"text":"\tif isSnippet {"},
  {"line":5585,"text":"\t\tparamName = escapeSnippetText(paramName)"},
  {"line":5586,"text":"\t}"},
  {"line":5587,"text":"\tif isJS {"},
  {"line":5588,"text":"\t\tt := \"*\""},
  {"line":5589,"text":"\t\tif isObject {"},
  {"line":5590,"text":"\t\t\tdebug.Assert(dotDotDotToken == nil, `Cannot annotate a rest parameter with type 'object'.`)"},
  {"line":5591,"text":"\t\t\tt = \"object\""},
  {"line":5592,"text":"\t\t} else {"},
  {"line":5593,"text":"\t\t\tif initializer != nil {"},
  {"line":5594,"text":"\t\t\t\tinferredType := typeChecker.GetTypeAtLocation(initializer.Parent)"},
  {"line":5595,"text":"\t\t\t\tif inferredType.Flags()&(checker.TypeFlagsAny|checker.TypeFlagsVoid) == 0 {"},
  {"line":5596,"text":"\t\t\t\t\tfile := ast.GetSourceFileOfNode(initializer)"},
  {"line":5597,"text":"\t\t\t\t\tquotePreference := lsutil.GetQuotePreference(file, preferences)"},
  {"line":5598,"text":"\t\t\t\t\tbuilderFlags := core.IfElse("},
  {"line":5599,"text":"\t\t\t\t\t\tquotePreference == lsutil.QuotePreferenceSingle,"},
  {"line":5600,"text":"\t\t\t\t\t\tnodebuilder.FlagsUseSingleQuotesForStringLiteralType,"},
  {"line":5601,"text":"\t\t\t\t\t\tnodebuilder.FlagsNone,"},
  {"line":5602,"text":"\t\t\t\t\t)"},
  {"line":5603,"text":"\t\t\t\t\ttypeNode := typeChecker.TypeToTypeNode("},
  {"line":5604,"text":"\t\t\t\t\t\tinferredType,"},
  {"line":5605,"text":"\t\t\t\t\t\tast.FindAncestor(initializer, ast.IsFunctionLike),"},
  {"line":5606,"text":"\t\t\t\t\t\tbuilderFlags,"},
  {"line":5607,"text":"\t\t\t\t\t\tnil, /*idToSymbol*/"},
  {"line":5608,"text":"\t\t\t\t\t)"},
  {"line":5609,"text":"\t\t\t\t\tif typeNode != nil {"},
  {"line":5610,"text":"\t\t\t\t\t\temitContext := printer.NewEmitContext()"},
  {"line":5612,"text":"\t\t\t\t\t\tp := printer.NewPrinter(printer.PrinterOptions{"},
  {"line":5613,"text":"\t\t\t\t\t\t\tRemoveComments: true,"},
  {"line":5618,"text":"\t\t\t\t\t\t}, printer.PrintHandlers{}, emitContext)"},
  {"line":5619,"text":"\t\t\t\t\t\temitContext.SetEmitFlags(typeNode, printer.EFSingleLine)"},
  {"line":5620,"text":"\t\t\t\t\t\tt = p.Emit(typeNode, file)"},
  {"line":5621,"text":"\t\t\t\t\t}"},
  {"line":5622,"text":"\t\t\t\t}"},
  {"line":5623,"text":"\t\t\t}"},
  {"line":5624,"text":"\t\t\tif isSnippet && t == \"*\" {"},
  {"line":5625,"text":"\t\t\t\ttabstop := *tabstopCounter"},
  {"line":5626,"text":"\t\t\t\t*tabstopCounter++"},
  {"line":5627,"text":"\t\t\t\tt = fmt.Sprintf(\"${%d:%s}\", tabstop, t)"},
  {"line":5628,"text":"\t\t\t}"},
  {"line":5629,"text":"\t\t}"},
  {"line":5630,"text":"\t\tdotDotDot := core.IfElse(!isObject && dotDotDotToken != nil, \"...\", \"\")"},
  {"line":5631,"text":"\t\tvar description string"},
  {"line":5632,"text":"\t\tif isSnippet {"},
  {"line":5633,"text":"\t\t\ttabstop := *tabstopCounter"},
  {"line":5634,"text":"\t\t\t*tabstopCounter++"},
  {"line":5635,"text":"\t\t\tdescription = fmt.Sprintf(\"${%d}\", tabstop)"},
  {"line":5636,"text":"\t\t}"},
  {"line":5637,"text":"\t\treturn fmt.Sprintf(\"@param {%s%s} %s %s\", dotDotDot, t, paramName, description)"},
  {"line":5638,"text":"\t} else {"},
  {"line":5639,"text":"\t\tvar description string"},
  {"line":5640,"text":"\t\tif isSnippet {"},
  {"line":5641,"text":"\t\t\ttabstop := *tabstopCounter"},
  {"line":5642,"text":"\t\t\t*tabstopCounter++"},
  {"line":5643,"text":"\t\t\tdescription = fmt.Sprintf(\"${%d}\", tabstop)"},
  {"line":5644,"text":"\t\t}"},
  {"line":5645,"text":"\t\treturn fmt.Sprintf(\"@param %s %s\", paramName, description)"},
  {"line":5646,"text":"\t}"},
  {"line":5647,"text":"}"},
  {"line":5649,"text":"func getJSDocParamNameWithInitializer(paramName string, initializer *ast.Expression) string {"},
  {"line":5650,"text":"\tinitializerText := strings.TrimSpace(scanner.GetTextOfNode(initializer))"},
  {"line":5651,"text":"\tif strings.Contains(initializerText, \"\\n\") || len(initializerText) > 80 {"},
  {"line":5652,"text":"\t\treturn fmt.Sprintf(\"[%s]\", paramName)"},
  {"line":5653,"text":"\t}"},
  {"line":5654,"text":"\treturn fmt.Sprintf(\"[%s=%s]\", paramName, initializerText)"},
  {"line":5655,"text":"}"},
  {"line":5657,"text":"func generateJSDocParamTagsForDestructuring("},
  {"line":5658,"text":"\tpath string,"},
  {"line":5659,"text":"\tpattern *ast.BindingPatternNode,"},
  {"line":5660,"text":"\tinitializer *ast.Expression,"},
  {"line":5661,"text":"\tdotDotDotToken *ast.TokenNode,"},
  {"line":5662,"text":"\tisJS bool,"},
  {"line":5663,"text":"\tisSnippet bool,"},
  {"line":5664,"text":"\ttypeChecker *checker.Checker,"},
  {"line":5665,"text":"\toptions *core.CompilerOptions,"},
  {"line":5666,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":5667,"text":") []string {"},
  {"line":5668,"text":"\ttabstopCounter := 1"},
  {"line":5669,"text":"\tif !isJS {"},
  {"line":5670,"text":"\t\treturn []string{getJSDocParamAnnotation("},
  {"line":5671,"text":"\t\t\tpath,"},
  {"line":5672,"text":"\t\t\tinitializer,"},
  {"line":5673,"text":"\t\t\tdotDotDotToken,"},
  {"line":5674,"text":"\t\t\tisJS,"},
  {"line":5675,"text":"\t\t\t/*isObject*/ false,"},
  {"line":5676,"text":"\t\t\tisSnippet,"},
  {"line":5677,"text":"\t\t\ttypeChecker,"},
  {"line":5678,"text":"\t\t\toptions,"},
  {"line":5679,"text":"\t\t\tpreferences,"},
  {"line":5680,"text":"\t\t\t&tabstopCounter,"},
  {"line":5681,"text":"\t\t)}"},
  {"line":5682,"text":"\t}"},
  {"line":5683,"text":"\treturn jsDocParamPatternWorker("},
  {"line":5684,"text":"\t\tpath,"},
  {"line":5685,"text":"\t\tpattern,"},
  {"line":5686,"text":"\t\tinitializer,"},
  {"line":5687,"text":"\t\tdotDotDotToken,"},
  {"line":5688,"text":"\t\tisJS,"},
  {"line":5689,"text":"\t\tisSnippet,"},
  {"line":5690,"text":"\t\ttypeChecker,"},
  {"line":5691,"text":"\t\toptions,"},
  {"line":5692,"text":"\t\tpreferences,"},
  {"line":5693,"text":"\t\t&tabstopCounter,"},
  {"line":5694,"text":"\t)"},
  {"line":5695,"text":"}"},
  {"line":5697,"text":"func jsDocParamPatternWorker("},
  {"line":5698,"text":"\tpath string,"},
  {"line":5699,"text":"\tpattern *ast.BindingPatternNode,"},
  {"line":5700,"text":"\tinitializer *ast.Expression,"},
  {"line":5701,"text":"\tdotDotDotToken *ast.TokenNode,"},
  {"line":5702,"text":"\tisJS bool,"},
  {"line":5703,"text":"\tisSnippet bool,"},
  {"line":5704,"text":"\ttypeChecker *checker.Checker,"},
  {"line":5705,"text":"\toptions *core.CompilerOptions,"},
  {"line":5706,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":5707,"text":"\tcounter *int,"},
  {"line":5708,"text":") []string {"},
  {"line":5709,"text":"\tif ast.IsObjectBindingPattern(pattern) && dotDotDotToken == nil {"},
  {"line":5710,"text":"\t\tchildCounter := *counter"},
  {"line":5711,"text":"\t\trootParam := getJSDocParamAnnotation("},
  {"line":5712,"text":"\t\t\tpath,"},
  {"line":5713,"text":"\t\t\tinitializer,"},
  {"line":5714,"text":"\t\t\tdotDotDotToken,"},
  {"line":5715,"text":"\t\t\tisJS,"},
  {"line":5716,"text":"\t\t\t/*isObject*/ true,"},
  {"line":5717,"text":"\t\t\tisSnippet,"},
  {"line":5718,"text":"\t\t\ttypeChecker,"},
  {"line":5719,"text":"\t\t\toptions,"},
  {"line":5720,"text":"\t\t\tpreferences,"},
  {"line":5721,"text":"\t\t\t&childCounter,"},
  {"line":5722,"text":"\t\t)"},
  {"line":5723,"text":"\t\tvar childTags []string"},
  {"line":5724,"text":"\t\tfor _, element := range pattern.Elements() {"},
  {"line":5725,"text":"\t\t\telementTags := jsDocParamElementWorker("},
  {"line":5726,"text":"\t\t\t\tpath,"},
  {"line":5727,"text":"\t\t\t\telement,"},
  {"line":5728,"text":"\t\t\t\tinitializer,"},
  {"line":5729,"text":"\t\t\t\tdotDotDotToken,"},
  {"line":5730,"text":"\t\t\t\tisJS,"},
  {"line":5731,"text":"\t\t\t\tisSnippet,"},
  {"line":5732,"text":"\t\t\t\ttypeChecker,"},
  {"line":5733,"text":"\t\t\t\toptions,"},
  {"line":5734,"text":"\t\t\t\tpreferences,"},
  {"line":5735,"text":"\t\t\t\t&childCounter,"},
  {"line":5736,"text":"\t\t\t)"},
  {"line":5737,"text":"\t\t\tif len(elementTags) == 0 {"},
  {"line":5738,"text":"\t\t\t\tchildTags = nil"},
  {"line":5739,"text":"\t\t\t\tbreak"},
  {"line":5740,"text":"\t\t\t}"},
  {"line":5741,"text":"\t\t\tchildTags = append(childTags, elementTags...)"},
  {"line":5742,"text":"\t\t}"},
  {"line":5743,"text":"\t\tif len(childTags) > 0 {"},
  {"line":5744,"text":"\t\t\t*counter = childCounter"},
  {"line":5745,"text":"\t\t\treturn append([]string{rootParam}, childTags...)"},
  {"line":5746,"text":"\t\t}"},
  {"line":5747,"text":"\t}"},
  {"line":5748,"text":"\treturn []string{"},
  {"line":5749,"text":"\t\tgetJSDocParamAnnotation("},
  {"line":5750,"text":"\t\t\tpath,"},
  {"line":5751,"text":"\t\t\tinitializer,"},
  {"line":5752,"text":"\t\t\tdotDotDotToken,"},
  {"line":5753,"text":"\t\t\tisJS,"},
  {"line":5754,"text":"\t\t\t/*isObject*/ false,"},
  {"line":5755,"text":"\t\t\tisSnippet,"},
  {"line":5756,"text":"\t\t\ttypeChecker,"},
  {"line":5757,"text":"\t\t\toptions,"},
  {"line":5758,"text":"\t\t\tpreferences,"},
  {"line":5759,"text":"\t\t\tcounter,"},
  {"line":5760,"text":"\t\t),"},
  {"line":5761,"text":"\t}"},
  {"line":5762,"text":"}"},
  {"line":5766,"text":"func jsDocParamElementWorker("},
  {"line":5767,"text":"\tpath string,"},
  {"line":5768,"text":"\telement *ast.BindingElementNode,"},
  {"line":5769,"text":"\tinitializer *ast.Expression,"},
  {"line":5770,"text":"\tdotDotDotToken *ast.TokenNode,"},
  {"line":5771,"text":"\tisJS bool,"},
  {"line":5772,"text":"\tisSnippet bool,"},
  {"line":5773,"text":"\ttypeChecker *checker.Checker,"},
  {"line":5774,"text":"\toptions *core.CompilerOptions,"},
  {"line":5775,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":5776,"text":"\tcounter *int,"},
  {"line":5777,"text":") []string {"},
  {"line":5778,"text":"\tif ast.IsIdentifier(element.Name()) { // `{ b }` or `{ b: newB }`"},
  {"line":5779,"text":"\t\tvar propertyName string"},
  {"line":5780,"text":"\t\tif element.PropertyName() != nil {"},
  {"line":5781,"text":"\t\t\tpropertyName, _ = ast.TryGetTextOfPropertyName(element.PropertyName())"},
  {"line":5782,"text":"\t\t} else {"},
  {"line":5783,"text":"\t\t\tpropertyName = element.Name().Text()"},
  {"line":5784,"text":"\t\t}"},
  {"line":5785,"text":"\t\tif propertyName == \"\" {"},
  {"line":5786,"text":"\t\t\treturn nil"},
  {"line":5787,"text":"\t\t}"},
  {"line":5788,"text":"\t\tparamName := fmt.Sprintf(\"%s.%s\", path, propertyName)"},
  {"line":5789,"text":"\t\treturn []string{"},
  {"line":5790,"text":"\t\t\tgetJSDocParamAnnotation("},
  {"line":5791,"text":"\t\t\t\tparamName,"},
  {"line":5792,"text":"\t\t\t\telement.Initializer(),"},
  {"line":5793,"text":"\t\t\t\telement.AsBindingElement().DotDotDotToken,"},
  {"line":5794,"text":"\t\t\t\tisJS,"},
  {"line":5795,"text":"\t\t\t\t/*isObject*/ false,"},
  {"line":5796,"text":"\t\t\t\tisSnippet,"},
  {"line":5797,"text":"\t\t\t\ttypeChecker,"},
  {"line":5798,"text":"\t\t\t\toptions,"},
  {"line":5799,"text":"\t\t\t\tpreferences,"},
  {"line":5800,"text":"\t\t\t\tcounter,"},
  {"line":5801,"text":"\t\t\t),"},
  {"line":5802,"text":"\t\t}"},
  {"line":5803,"text":"\t} else if element.PropertyName() != nil { // `{ b: {...} }` or `{ b: [...] }`"},
  {"line":5804,"text":"\t\tpropertyName, _ := ast.TryGetTextOfPropertyName(element.PropertyName())"},
  {"line":5805,"text":"\t\tif propertyName == \"\" {"},
  {"line":5806,"text":"\t\t\treturn nil"},
  {"line":5807,"text":"\t\t}"},
  {"line":5808,"text":"\t\treturn jsDocParamPatternWorker("},
  {"line":5809,"text":"\t\t\tfmt.Sprintf(\"%s.%s\", path, propertyName),"},
  {"line":5810,"text":"\t\t\telement.Name(),"},
  {"line":5811,"text":"\t\t\telement.Initializer(),"},
  {"line":5812,"text":"\t\t\telement.AsBindingElement().DotDotDotToken,"},
  {"line":5813,"text":"\t\t\tisJS,"},
  {"line":5814,"text":"\t\t\tisSnippet,"},
  {"line":5815,"text":"\t\t\ttypeChecker,"},
  {"line":5816,"text":"\t\t\toptions,"},
  {"line":5817,"text":"\t\t\tpreferences,"},
  {"line":5818,"text":"\t\t\tcounter,"},
  {"line":5819,"text":"\t\t)"},
  {"line":5820,"text":"\t}"},
  {"line":5821,"text":"\treturn nil"},
  {"line":5822,"text":"}"},
  {"line":5824,"text":"func getJSDocParameterNameCompletions(tag *ast.JSDocParameterOrPropertyTag) []*lsproto.CompletionItem {"},
  {"line":5825,"text":"\tif !ast.IsIdentifier(tag.Name()) {"},
  {"line":5826,"text":"\t\treturn nil"},
  {"line":5827,"text":"\t}"},
  {"line":5828,"text":"\tnameThusFar := tag.Name().Text()"},
  {"line":5829,"text":"\tjsDoc := tag.Parent"},
  {"line":5830,"text":"\tfn := jsDoc.Parent"},
  {"line":5831,"text":"\tif !ast.IsFunctionLike(fn) {"},
  {"line":5832,"text":"\t\treturn nil"},
  {"line":5833,"text":"\t}"},
  {"line":5835,"text":"\tvar tags []*ast.Node"},
  {"line":5836,"text":"\tif jsDoc.AsJSDoc().Tags != nil {"},
  {"line":5837,"text":"\t\ttags = jsDoc.AsJSDoc().Tags.Nodes"},
  {"line":5838,"text":"\t}"},
  {"line":5840,"text":"\treturn core.MapNonNil(fn.Parameters(), func(param *ast.ParameterDeclarationNode) *lsproto.CompletionItem {"},
  {"line":5841,"text":"\t\tif !ast.IsIdentifier(param.Name()) {"},
  {"line":5842,"text":"\t\t\treturn nil"},
  {"line":5843,"text":"\t\t}"},
  {"line":5845,"text":"\t\tname := param.Name().Text()"},
  {"line":5846,"text":"\t\tif core.Some(tags, func(t *ast.Node) bool {"},
  {"line":5847,"text":"\t\t\treturn t != tag.AsNode() &&"},
  {"line":5848,"text":"\t\t\t\tast.IsJSDocParameterTag(t) &&"},
  {"line":5849,"text":"\t\t\t\tast.IsIdentifier(t.Name()) &&"},
  {"line":5850,"text":"\t\t\t\tt.Name().Text() == name"},
  {"line":5851,"text":"\t\t}) || nameThusFar != \"\" && !strings.HasPrefix(name, nameThusFar) {"},
  {"line":5852,"text":"\t\t\treturn nil"},
  {"line":5853,"text":"\t\t}"},
  {"line":5855,"text":"\t\treturn &lsproto.CompletionItem{"},
  {"line":5856,"text":"\t\t\tLabel:    name,"},
  {"line":5857,"text":"\t\t\tKind:     new(lsproto.CompletionItemKindVariable),"},
  {"line":5858,"text":"\t\t\tSortText: new(string(SortTextLocationPriority)),"},
  {"line":5859,"text":"\t\t}"},
  {"line":5860,"text":"\t})"},
  {"line":5861,"text":"}"},
  {"line":5863,"text":"func (l *LanguageService) getExhaustiveCaseSnippets("},
  {"line":5864,"text":"\tctx context.Context,"},
  {"line":5865,"text":"\tcaseBlock *ast.CaseBlock,"},
  {"line":5866,"text":"\tfile *ast.SourceFile,"},
  {"line":5867,"text":"\tposition int,"},
  {"line":5868,"text":"\toptions *core.CompilerOptions,"},
  {"line":5869,"text":"\tprogram *compiler.Program,"},
  {"line":5870,"text":"\tc *checker.Checker,"},
  {"line":5871,"text":") (*lsproto.CompletionItem, error) {"},
  {"line":5872,"text":"\tclauses := caseBlock.Clauses.Nodes"},
  {"line":5873,"text":"\tswitchType := c.GetTypeAtLocation(caseBlock.AsNode().Parent.Expression())"},
  {"line":5874,"text":"\tif switchType != nil && switchType.IsUnion() && core.Every(switchType.Types(), isLiteral) {"},
  {"line":5876,"text":"\t\ttracker := newCaseClauseTracker(c, clauses)"},
  {"line":5877,"text":"\t\ttarget := options.GetEmitScriptTarget()"},
  {"line":5878,"text":"\t\tquotePreference := lsutil.GetQuotePreference(file, l.UserPreferences())"},
  {"line":5880,"text":"\t\tvar importAdder autoimport.ImportAdder"},
  {"line":5881,"text":"\t\tif !tspath.IsDynamicFileName(file.FileName()) {"},
  {"line":5882,"text":"\t\t\tview, err := l.getPreparedAutoImportView(file)"},
  {"line":5883,"text":"\t\t\tif err != nil {"},
  {"line":5884,"text":"\t\t\t\treturn nil, err"},
  {"line":5885,"text":"\t\t\t}"},
  {"line":5886,"text":"\t\t\tif view != nil {"},
  {"line":5887,"text":"\t\t\t\timportAdder = autoimport.NewImportAdder("},
  {"line":5888,"text":"\t\t\t\t\tctx,"},
  {"line":5889,"text":"\t\t\t\t\tprogram,"},
  {"line":5890,"text":"\t\t\t\t\tc,"},
  {"line":5891,"text":"\t\t\t\t\tfile,"},
  {"line":5892,"text":"\t\t\t\t\tview,"},
  {"line":5893,"text":"\t\t\t\t\tl.FormatOptions(),"},
  {"line":5894,"text":"\t\t\t\t\tl.converters,"},
  {"line":5895,"text":"\t\t\t\t\tl.UserPreferences(),"},
  {"line":5896,"text":"\t\t\t\t)"},
  {"line":5897,"text":"\t\t\t}"},
  {"line":5898,"text":"\t\t}"},
  {"line":5900,"text":"\t\tvar elements []*ast.Expression"},
  {"line":5901,"text":"\t\tfactory := ast.NewNodeFactory(ast.NodeFactoryHooks{})"},
  {"line":5902,"text":"\t\tfor _, t := range switchType.Types() {"},
  {"line":5904,"text":"\t\t\tif t.IsEnumLiteral() {"},
  {"line":5905,"text":"\t\t\t\tdebug.Assert(t.Symbol() != nil, \"An enum member type should have a symbol\")"},
  {"line":5906,"text":"\t\t\t\tdebug.Assert(t.Symbol().Parent != nil, \"An enum member type should have a parent symbol (the enum symbol)\")"},
  {"line":5908,"text":"\t\t\t\tvar enumValue any"},
  {"line":5909,"text":"\t\t\t\tif t.Symbol().ValueDeclaration != nil {"},
  {"line":5910,"text":"\t\t\t\t\tenumValue = c.GetConstantValue(t.Symbol().ValueDeclaration)"},
  {"line":5911,"text":"\t\t\t\t}"},
  {"line":5912,"text":"\t\t\t\tif enumValue != nil {"},
  {"line":5913,"text":"\t\t\t\t\tif tracker.hasValue(enumValue) {"},
  {"line":5914,"text":"\t\t\t\t\t\tcontinue"},
  {"line":5915,"text":"\t\t\t\t\t}"},
  {"line":5916,"text":"\t\t\t\t\ttracker.addValue(enumValue)"},
  {"line":5917,"text":"\t\t\t\t}"},
  {"line":5918,"text":"\t\t\t\ttypeNode := autoimport.TypeToAutoImportableTypeNode(c, importAdder, t, caseBlock.AsNode())"},
  {"line":5919,"text":"\t\t\t\tif typeNode == nil {"},
  {"line":5920,"text":"\t\t\t\t\treturn nil, nil"},
  {"line":5921,"text":"\t\t\t\t}"},
  {"line":5922,"text":"\t\t\t\texpr := typeNodeToExpression(typeNode, target, quotePreference, factory)"},
  {"line":5923,"text":"\t\t\t\tif expr == nil {"},
  {"line":5924,"text":"\t\t\t\t\treturn nil, nil"},
  {"line":5925,"text":"\t\t\t\t}"},
  {"line":5926,"text":"\t\t\t\telements = append(elements, expr)"},
  {"line":5927,"text":"\t\t\t} else if value := t.AsLiteralType().Value(); !tracker.hasValue(value) { // Literals"},
  {"line":5928,"text":"\t\t\t\tswitch v := value.(type) {"},
  {"line":5929,"text":"\t\t\t\tcase jsnum.PseudoBigInt:"},
  {"line":5930,"text":"\t\t\t\t\tvar bigInt *ast.Node"},
  {"line":5931,"text":"\t\t\t\t\tif v.Negative {"},
  {"line":5932,"text":"\t\t\t\t\t\tv.Negative = false"},
  {"line":5933,"text":"\t\t\t\t\t\tbigInt = factory.NewPrefixUnaryExpression(ast.KindMinusToken, factory.NewBigIntLiteral(v.String()+\"n\", ast.TokenFlagsNone))"},
  {"line":5934,"text":"\t\t\t\t\t} else {"},
  {"line":5935,"text":"\t\t\t\t\t\tbigInt = factory.NewBigIntLiteral(v.String()+\"n\", ast.TokenFlagsNone)"},
  {"line":5936,"text":"\t\t\t\t\t}"},
  {"line":5937,"text":"\t\t\t\t\telements = append(elements, bigInt)"},
  {"line":5938,"text":"\t\t\t\tcase jsnum.Number:"},
  {"line":5939,"text":"\t\t\t\t\tvar number *ast.Node"},
  {"line":5940,"text":"\t\t\t\t\tif v < 0 {"},
  {"line":5941,"text":"\t\t\t\t\t\tnumber = factory.NewPrefixUnaryExpression(ast.KindMinusToken, factory.NewNumericLiteral(v.Abs().String(), ast.TokenFlagsNone))"},
  {"line":5942,"text":"\t\t\t\t\t} else {"},
  {"line":5943,"text":"\t\t\t\t\t\tnumber = factory.NewNumericLiteral(v.String(), ast.TokenFlagsNone)"},
  {"line":5944,"text":"\t\t\t\t\t}"},
  {"line":5945,"text":"\t\t\t\t\telements = append(elements, number)"},
  {"line":5946,"text":"\t\t\t\tcase string:"},
  {"line":5947,"text":"\t\t\t\t\tliteral := factory.NewStringLiteral(v, core.IfElse(quotePreference == lsutil.QuotePreferenceSingle, ast.TokenFlagsSingleQuote, ast.TokenFlagsNone))"},
  {"line":5948,"text":"\t\t\t\t\telements = append(elements, literal)"},
  {"line":5949,"text":"\t\t\t\t}"},
  {"line":5950,"text":"\t\t\t}"},
  {"line":5951,"text":"\t\t}"},
  {"line":5952,"text":"\t\tif len(elements) == 0 {"},
  {"line":5953,"text":"\t\t\treturn nil, nil"},
  {"line":5954,"text":"\t\t}"},
  {"line":5956,"text":"\t\tnewClauses := core.Map(elements, func(element *ast.Node) *ast.CaseOrDefaultClauseNode {"},
  {"line":5957,"text":"\t\t\treturn factory.NewCaseOrDefaultClause(ast.KindCaseClause, element, factory.NewNodeList(nil))"},
  {"line":5958,"text":"\t\t})"},
  {"line":5959,"text":"\t\tnewLineChar := l.FormatOptions().NewLineCharacter"},
  {"line":5960,"text":"\t\tprinter := createSnippetPrinter(printer.PrinterOptions{"},
  {"line":5961,"text":"\t\t\tRemoveComments: true,"},
  {"line":5962,"text":"\t\t\tNewLine:        core.GetNewLineKind(newLineChar),"},
  {"line":5963,"text":"\t\t})"},
  {"line":5964,"text":"\t\tprintNode := func(node *ast.Node) string { return printer.printAndFormatNode(ctx, node, file) }"},
  {"line":5965,"text":"\t\tinsertText := strings.Join(core.MapIndex(newClauses, func(clause *ast.Node, i int) string {"},
  {"line":5966,"text":"\t\t\tif clientSupportsItemSnippet(ctx) {"},
  {"line":5967,"text":"\t\t\t\treturn fmt.Sprintf(\"%s$%d\", printNode(clause), i+1)"},
  {"line":5968,"text":"\t\t\t}"},
  {"line":5969,"text":"\t\t\treturn printer.printUnescapedNode(clause)"},
  {"line":5970,"text":"\t\t}), newLineChar)"},
  {"line":5972,"text":"\t\tfirstClause := printer.printUnescapedNode(newClauses[0])"},
  {"line":5973,"text":"\t\tname := firstClause + \" ...\""},
  {"line":5975,"text":"\t\tvar additionalTextEdits *[]*lsproto.TextEdit"},
  {"line":5976,"text":"\t\tif importAdder != nil {"},
  {"line":5977,"text":"\t\t\tadditionalTextEdits = new(importAdder.Edits())"},
  {"line":5978,"text":"\t\t}"},
  {"line":5980,"text":"\t\treturn &lsproto.CompletionItem{"},
  {"line":5981,"text":"\t\t\tLabel:               name,"},
  {"line":5982,"text":"\t\t\tKind:                new(lsproto.CompletionItemKindSnippet),"},
  {"line":5983,"text":"\t\t\tSortText:            new(string(SortTextGlobalsOrKeywords)),"},
  {"line":5984,"text":"\t\t\tInsertText:          strPtrTo(insertText),"},
  {"line":5985,"text":"\t\t\tAdditionalTextEdits: additionalTextEdits,"},
  {"line":5986,"text":"\t\t\tInsertTextFormat:    core.IfElse(clientSupportsItemSnippet(ctx), new(lsproto.InsertTextFormatSnippet), nil),"},
  {"line":5987,"text":"\t\t\tData: &lsproto.CompletionItemData{"},
  {"line":5988,"text":"\t\t\t\tFileName: file.FileName(),"},
  {"line":5989,"text":"\t\t\t\tPosition: int32(position),"},
  {"line":5990,"text":"\t\t\t\tName:     name,"},
  {"line":5991,"text":"\t\t\t\tSource:   string(completionSourceSwitchCases),"},
  {"line":5992,"text":"\t\t\t},"},
  {"line":5993,"text":"\t\t}, nil"},
  {"line":5994,"text":"\t}"},
  {"line":5995,"text":"\treturn nil, nil"},
  {"line":5996,"text":"}"},
  {"line":5998,"text":"func typeNodeToExpression("},
  {"line":5999,"text":"\ttypeNode *ast.TypeNode,"},
  {"line":6000,"text":"\ttarget core.ScriptTarget,"},
  {"line":6001,"text":"\tquotePreference lsutil.QuotePreference,"},
  {"line":6002,"text":"\tfactory *ast.NodeFactory,"},
  {"line":6003,"text":") *ast.Expression {"},
  {"line":6004,"text":"\tswitch typeNode.Kind {"},
  {"line":6005,"text":"\tcase ast.KindTypeReference:"},
  {"line":6006,"text":"\t\ttypeName := typeNode.AsTypeReferenceNode().TypeName"},
  {"line":6007,"text":"\t\treturn entityNameToExpression(typeName, target, quotePreference, factory)"},
  {"line":6008,"text":"\tcase ast.KindIndexedAccessType:"},
  {"line":6009,"text":"\t\tobjectExpression := typeNodeToExpression("},
  {"line":6010,"text":"\t\t\ttypeNode.AsIndexedAccessTypeNode().ObjectType,"},
  {"line":6011,"text":"\t\t\ttarget,"},
  {"line":6012,"text":"\t\t\tquotePreference,"},
  {"line":6013,"text":"\t\t\tfactory,"},
  {"line":6014,"text":"\t\t)"},
  {"line":6015,"text":"\t\tindexExpression := typeNodeToExpression("},
  {"line":6016,"text":"\t\t\ttypeNode.AsIndexedAccessTypeNode().IndexType,"},
  {"line":6017,"text":"\t\t\ttarget,"},
  {"line":6018,"text":"\t\t\tquotePreference,"},
  {"line":6019,"text":"\t\t\tfactory,"},
  {"line":6020,"text":"\t\t)"},
  {"line":6021,"text":"\t\tif objectExpression != nil && indexExpression != nil {"},
  {"line":6022,"text":"\t\t\treturn factory.NewElementAccessExpression(objectExpression, nil /*questionDotToken*/, indexExpression, ast.NodeFlagsNone)"},
  {"line":6023,"text":"\t\t}"},
  {"line":6024,"text":"\t\treturn nil"},
  {"line":6025,"text":"\tcase ast.KindLiteralType:"},
  {"line":6026,"text":"\t\tliteral := typeNode.AsLiteralTypeNode().Literal"},
  {"line":6027,"text":"\t\tswitch literal.Kind {"},
  {"line":6028,"text":"\t\tcase ast.KindStringLiteral:"},
  {"line":6029,"text":"\t\t\texpr := factory.NewStringLiteral(literal.Text(), core.IfElse(quotePreference == lsutil.QuotePreferenceSingle, ast.TokenFlagsSingleQuote, ast.TokenFlagsNone))"},
  {"line":6030,"text":"\t\t\treturn expr"},
  {"line":6031,"text":"\t\tcase ast.KindNumericLiteral:"},
  {"line":6032,"text":"\t\t\texpr := factory.NewNumericLiteral(literal.Text(), literal.AsNumericLiteral().TokenFlags)"},
  {"line":6033,"text":"\t\t\treturn expr"},
  {"line":6034,"text":"\t\tdefault:"},
  {"line":6035,"text":"\t\t\treturn nil"},
  {"line":6036,"text":"\t\t}"},
  {"line":6037,"text":"\tcase ast.KindParenthesizedType:"},
  {"line":6038,"text":"\t\texpr := typeNodeToExpression("},
  {"line":6039,"text":"\t\t\ttypeNode.AsParenthesizedTypeNode().Type,"},
  {"line":6040,"text":"\t\t\ttarget,"},
  {"line":6041,"text":"\t\t\tquotePreference,"},
  {"line":6042,"text":"\t\t\tfactory,"},
  {"line":6043,"text":"\t\t)"},
  {"line":6044,"text":"\t\tif expr == nil {"},
  {"line":6045,"text":"\t\t\treturn nil"},
  {"line":6046,"text":"\t\t}"},
  {"line":6047,"text":"\t\tif ast.IsIdentifier(expr) {"},
  {"line":6048,"text":"\t\t\treturn expr"},
  {"line":6049,"text":"\t\t}"},
  {"line":6050,"text":"\t\treturn factory.NewParenthesizedExpression(expr)"},
  {"line":6051,"text":"\tcase ast.KindTypeQuery:"},
  {"line":6052,"text":"\t\treturn entityNameToExpression(typeNode.AsTypeQueryNode().ExprName, target, quotePreference, factory)"},
  {"line":6053,"text":"\tcase ast.KindImportType:"},
  {"line":6054,"text":"\t\tdebug.Fail(`We should not get an import type after calling 'typeToAutoImportableTypeNode'.`)"},
  {"line":6055,"text":"\t\treturn nil"},
  {"line":6056,"text":"\t}"},
  {"line":6057,"text":"\treturn nil"},
  {"line":6058,"text":"}"},
  {"line":6060,"text":"func entityNameToExpression("},
  {"line":6061,"text":"\tentityName *ast.EntityName,"},
  {"line":6062,"text":"\ttarget core.ScriptTarget,"},
  {"line":6063,"text":"\tquotePreference lsutil.QuotePreference,"},
  {"line":6064,"text":"\tfactory *ast.NodeFactory,"},
  {"line":6065,"text":") *ast.Expression {"},
  {"line":6066,"text":"\tif ast.IsIdentifier(entityName) {"},
  {"line":6067,"text":"\t\treturn entityName"},
  {"line":6068,"text":"\t}"},
  {"line":6069,"text":"\treturn factory.NewPropertyAccessExpression("},
  {"line":6070,"text":"\t\tentityNameToExpression(entityName.AsQualifiedName().Left, target, quotePreference, factory),"},
  {"line":6071,"text":"\t\tnil, /*questionDotToken*/"},
  {"line":6072,"text":"\t\tentityName.AsQualifiedName().Right,"},
  {"line":6073,"text":"\t\tast.NodeFlagsNone,"},
  {"line":6074,"text":"\t)"},
  {"line":6075,"text":"}"},
  {"line":6077,"text":"type snippetPrinter struct {"},
  {"line":6078,"text":"\tbaseWriter *printer.ChangeTrackerWriter"},
  {"line":6079,"text":"\tprinter    *printer.Printer"},
  {"line":6080,"text":"\twriter     *snippetEmitTextWriter"},
  {"line":6081,"text":"\tfactory    *ast.NodeFactory"},
  {"line":6082,"text":"}"},
  {"line":6084,"text":"/** Snippet-escaping version of `printer.printNode`. */"},
  {"line":6085,"text":"func (p *snippetPrinter) printNode(node *ast.Node) string {"},
  {"line":6086,"text":"\tunescaped := p.printUnescapedNode(node)"},
  {"line":6087,"text":"\tif len(p.writer.escapes) > 0 {"},
  {"line":6088,"text":"\t\treturn core.ApplyBulkEdits(unescaped, p.writer.escapes)"},
  {"line":6089,"text":"\t}"},
  {"line":6090,"text":"\treturn unescaped"},
  {"line":6091,"text":"}"},
  {"line":6093,"text":"func (p *snippetPrinter) printUnescapedNode(node *ast.Node) string {"},
  {"line":6094,"text":"\tp.writer.escapes = nil"},
  {"line":6095,"text":"\tp.writer.Clear()"},
  {"line":6096,"text":"\tp.printer.Write(node, nil /*sourceFile*/, p.writer, nil /*sourceMapGenerator*/)"},
  {"line":6097,"text":"\treturn p.writer.String()"},
  {"line":6098,"text":"}"},
  {"line":6100,"text":"func (p *snippetPrinter) printAndFormatNode(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile) string {"},
  {"line":6101,"text":"\ttext := p.printUnescapedNode(node)"},
  {"line":6102,"text":"\tnodeWithPos := p.baseWriter.AssignPositionsToNode(node, p.factory)"},
  {"line":6103,"text":"\tsyntheticFile := p.createSyntheticFile(nodeWithPos, text, sourceFile)"},
  {"line":6104,"text":"\tchanges := format.FormatNodeGivenIndentation("},
  {"line":6105,"text":"\t\tctx,"},
  {"line":6106,"text":"\t\tnodeWithPos,"},
  {"line":6107,"text":"\t\tsyntheticFile,"},
  {"line":6108,"text":"\t\tsourceFile.LanguageVariant,"},
  {"line":6109,"text":"\t\t0, /*initialIndentation*/"},
  {"line":6110,"text":"\t\t0, /*delta*/"},
  {"line":6111,"text":"\t)"},
  {"line":6113,"text":"\tallChanges := changes"},
  {"line":6114,"text":"\tif len(p.writer.escapes) > 0 {"},
  {"line":6115,"text":"\t\tallChanges = append(changes, p.writer.escapes...)"},
  {"line":6116,"text":"\t\tslices.SortFunc(allChanges, func(a, b core.TextChange) int { return core.CompareTextRanges(a.TextRange, b.TextRange) })"},
  {"line":6117,"text":"\t}"},
  {"line":6119,"text":"\treturn core.ApplyBulkEdits(syntheticFile.Text(), allChanges)"},
  {"line":6120,"text":"}"},
  {"line":6125,"text":"func (p *snippetPrinter) createSyntheticFile(node *ast.Node, text string, targetFile *ast.SourceFile) *ast.SourceFile {"},
  {"line":6126,"text":"\teof := p.factory.NewToken(ast.KindEndOfFile)"},
  {"line":6127,"text":"\teof.Loc = core.NewTextRange(len(text), len(text))"},
  {"line":6128,"text":"\tstatements := p.factory.NewNodeList([]*ast.Node{node})"},
  {"line":6129,"text":"\tstatements.Loc = core.NewTextRange(node.Pos(), node.End())"},
  {"line":6130,"text":"\tsyntheticFile := p.factory.NewSourceFile("},
  {"line":6131,"text":"\t\ttargetFile.ParseOptions(),"},
  {"line":6132,"text":"\t\ttext,"},
  {"line":6133,"text":"\t\tstatements,"},
  {"line":6134,"text":"\t\teof,"},
  {"line":6135,"text":"\t)"},
  {"line":6136,"text":"\tsyntheticFile.Loc = core.NewTextRange(0, len(text))"},
  {"line":6137,"text":"\tast.SetParentInChildren(syntheticFile)"},
  {"line":6138,"text":"\treturn syntheticFile.AsSourceFile()"},
  {"line":6139,"text":"}"},
  {"line":6141,"text":"func createSnippetPrinter(options printer.PrinterOptions) *snippetPrinter {"},
  {"line":6142,"text":"\tbaseWriter := printer.NewChangeTrackerWriter(options.NewLine.GetNewLineCharacter(), -1)"},
  {"line":6143,"text":"\tprinter := printer.NewPrinter(options, baseWriter.GetPrintHandlers(), nil /*emitContext*/)"},
  {"line":6144,"text":"\twriter := &snippetEmitTextWriter{"},
  {"line":6145,"text":"\t\tChangeTrackerWriter: baseWriter,"},
  {"line":6146,"text":"\t}"},
  {"line":6147,"text":"\treturn &snippetPrinter{"},
  {"line":6148,"text":"\t\tbaseWriter: baseWriter,"},
  {"line":6149,"text":"\t\tprinter:    printer,"},
  {"line":6150,"text":"\t\twriter:     writer,"},
  {"line":6151,"text":"\t\tfactory:    ast.NewNodeFactory(ast.NodeFactoryHooks{}),"},
  {"line":6152,"text":"\t}"},
  {"line":6153,"text":"}"},
  {"line":6156,"text":"type snippetEmitTextWriter struct {"},
  {"line":6157,"text":"\t*printer.ChangeTrackerWriter"},
  {"line":6158,"text":"\tescapes []core.TextChange"},
  {"line":6159,"text":"}"},
  {"line":6161,"text":"func (w *snippetEmitTextWriter) nonEscapingWrite(s string) {"},
  {"line":6162,"text":"\tw.ChangeTrackerWriter.Write(s)"},
  {"line":6163,"text":"}"},
  {"line":6165,"text":"func (w *snippetEmitTextWriter) Write(s string) {"},
  {"line":6166,"text":"\tw.escapingWrite(s, func() { w.ChangeTrackerWriter.Write(s) })"},
  {"line":6167,"text":"}"},
  {"line":6169,"text":"func (w *snippetEmitTextWriter) WriteComment(text string) {"},
  {"line":6170,"text":"\tw.escapingWrite(text, func() { w.ChangeTrackerWriter.WriteComment(text) })"},
  {"line":6171,"text":"}"},
  {"line":6173,"text":"func (w *snippetEmitTextWriter) WriteStringLiteral(text string) {"},
  {"line":6174,"text":"\tw.escapingWrite(text, func() { w.ChangeTrackerWriter.WriteStringLiteral(text) })"},
  {"line":6175,"text":"}"},
  {"line":6177,"text":"func (w *snippetEmitTextWriter) WriteParameter(text string) {"},
  {"line":6178,"text":"\tw.escapingWrite(text, func() { w.ChangeTrackerWriter.WriteParameter(text) })"},
  {"line":6179,"text":"}"},
  {"line":6181,"text":"func (w *snippetEmitTextWriter) WriteProperty(text string) {"},
  {"line":6182,"text":"\tw.escapingWrite(text, func() { w.ChangeTrackerWriter.WriteProperty(text) })"},
  {"line":6183,"text":"}"},
  {"line":6185,"text":"func (w *snippetEmitTextWriter) WriteSymbol(text string, symbol *ast.Symbol) {"},
  {"line":6186,"text":"\tw.escapingWrite(text, func() { w.ChangeTrackerWriter.WriteSymbol(text, symbol) })"},
  {"line":6187,"text":"}"},
  {"line":6193,"text":"func (w *snippetEmitTextWriter) escapingWrite(s string, write func()) {"},
  {"line":6194,"text":"\tescaped := escapeSnippetText(s)"},
  {"line":6195,"text":"\tif escaped != s {"},
  {"line":6196,"text":"\t\tstart := w.GetTextPos()"},
  {"line":6197,"text":"\t\twrite()"},
  {"line":6198,"text":"\t\tend := w.GetTextPos()"},
  {"line":6199,"text":"\t\tw.escapes = append("},
  {"line":6200,"text":"\t\t\tw.escapes,"},
  {"line":6201,"text":"\t\t\tcore.TextChange{"},
  {"line":6202,"text":"\t\t\t\tNewText:   escaped,"},
  {"line":6203,"text":"\t\t\t\tTextRange: core.NewTextRange(start, end),"},
  {"line":6204,"text":"\t\t\t},"},
  {"line":6205,"text":"\t\t)"},
  {"line":6206,"text":"\t} else {"},
  {"line":6207,"text":"\t\twrite()"},
  {"line":6208,"text":"\t}"},
  {"line":6209,"text":"}"},
];

export function findLsCompletionsDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsCompletionsDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsCompletionsDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsCompletionsDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsCompletionsLineText(line: number): string | undefined {
  return lsCompletionsSourceLines.find((entry) => entry.line === line)?.text;
}
