/**
 * Rename validation and workspace-edit generation.
 *
 * Concrete port of TS-Go `internal/ls/rename.go`.
 */

import {
  Kind,
  SymbolFlags,
  getSourceFileOfNode,
  isAccessExpression,
  isBinaryExpression,
  isExportSpecifier,
  isIdentifier,
  isImportSpecifier,
  isNoSubstitutionTemplateLiteral,
  isNumericLiteral,
  isObjectLiteralExpression,
  isShorthandPropertyAssignment,
  isStringLiteral,
  isStringLiteralLike,
  nodeName,
  nodeText,
  sourceFileFileName,
  type Node as AstNode,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import { getStartOfNode, getTouchingPropertyName } from "../astnav/index.js";
import { asUnionType, isStringLiteral as isStringLiteralType, type Type } from "../checker/types.js";
import { Tristate, newTextRange, tristateIsTrue, type Tristate as TristateValue } from "../core/index.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import { formatDiagnosticMessage } from "../diagnostics/loc.generated.js";
import {
  ResourceOperationKindRename,
  getClientCapabilities,
  type ClientCapabilitiesContext,
  type DocumentUri,
  type HasTextDocumentPosition,
  type Position,
  type Range,
  type RenameParams,
  type RenameResponse,
  type TextEdit,
} from "../lsp/lsproto/index.js";
import { fileNameToDocumentURI, type LineMapCarrier } from "./lsconv/converters.js";
import { getQuotePreference, QuotePreferenceSingle, type QuotePreference, type UserPreferences } from "./lsutil/index.js";
import { parseNodeModuleFromPath } from "../module/index.js";
import {
  changeAnyExtension,
  combinePaths,
  getAnyExtensionFromPath,
  getDeclarationFileExtension,
  getDirectoryPath,
  hasExtension,
  isDeclarationFileName,
  isExternalModuleNameRelative,
  removeFileExtension,
} from "../tspath/index.js";
import {
  combineRenameResponse,
  handleCrossProject,
  type CrossProjectLanguageService,
  type CrossProjectOrchestrator,
  type SymbolAndEntriesData,
  type SymbolEntryTransformOptions,
} from "./crossProject.js";

export interface RenameInfo {
  readonly canRename: boolean;
  readonly localizedErrorMessage?: string;
  readonly displayName?: string;
  readonly triggerSpan?: Range;
  readonly fileToRename?: string;
  readonly newFileName?: string;
}

export const entryKindNone = 0;
export const entryKindRange = 1;
export const entryKindNode = 2;
export const entryKindStringLiteral = 3;
export const entryKindSearchedLocalFoundProperty = 4;
export const entryKindSearchedPropertyFoundLocal = 5;

export type EntryKind =
  | typeof entryKindNone
  | typeof entryKindRange
  | typeof entryKindNode
  | typeof entryKindStringLiteral
  | typeof entryKindSearchedLocalFoundProperty
  | typeof entryKindSearchedPropertyFoundLocal;

export interface ReferenceEntry {
  readonly kind: EntryKind;
  readonly node?: AstNode;
  readonly context?: AstNode;
  readonly fileName?: string;
  readonly textRange?: { readonly pos: number; readonly end: number };
  readonly lspRange?: { readonly uri: DocumentUri; readonly range: Range };
}

export interface SymbolAndEntries {
  readonly references: readonly ReferenceEntry[];
}

export interface RenameSourceFile extends SourceFile, LineMapCarrier {}

export interface RenameChecker {
  getSymbolAtLocation(node: AstNode): AstSymbol | undefined;
  getAliasedSymbol(symbol: AstSymbol): AstSymbol;
  getExportSpecifierLocalTargetSymbol(node: AstNode): AstSymbol | undefined;
  getContextualTypeFromParentOrAncestorTypeNode(node: AstNode): Type | undefined;
  symbolToString(symbol: AstSymbol): string;
}

export interface RenameProgram {
  getTypeChecker(context: unknown): { readonly checker: RenameChecker; readonly release: () => void };
  isSourceFileDefaultLibrary(path: string): boolean;
}

export interface RenameHost {
  useCaseSensitiveFileNames(): boolean;
}

export interface RenameConverters {
  lineAndCharacterToPosition(file: LineMapCarrier, position: Position): number;
  toLSPRange(file: LineMapCarrier, range: { readonly pos: number; readonly end: number }): Range;
}

export interface RenameUserPreferences extends UserPreferences {
  readonly allowRenameOfImportPath?: TristateValue;
  readonly useAliasesForRename?: TristateValue;
}

export interface RenameLanguageService extends CrossProjectLanguageService<SymbolAndEntries> {
  readonly host: RenameHost;
  readonly converters: RenameConverters;
  getProgram(): RenameProgram;
  getProgramAndFile(documentURI: DocumentUri): readonly [RenameProgram, RenameSourceFile];
  userPreferences(): RenameUserPreferences;
  getFileNameOfEntry?(entry: ReferenceEntry): DocumentUri;
  getRangeOfEntry?(entry: ReferenceEntry): Range;
}

interface RenameRequest extends RenameParams, HasTextDocumentPosition {}

export function provideRename<LanguageService extends RenameLanguageService>(
  service: LanguageService,
  context: ClientCapabilitiesContext | undefined,
  params: RenameParams,
  orchestrator?: CrossProjectOrchestrator<LanguageService, SymbolAndEntries>,
): RenameResponse {
  return handleCrossProject(
    service,
    context,
    renameRequest(params),
    orchestrator,
    symbolAndEntriesToRename,
    combineRenameResponse,
    true,
    false,
    {},
  );
}

export function getRenameInfo(
  service: RenameLanguageService,
  context: ClientCapabilitiesContext | undefined,
  newName: string,
  documentURI: DocumentUri,
  position: Position,
): RenameInfo {
  const [program, sourceFile] = service.getProgramAndFile(documentURI);
  const pos = service.converters.lineAndCharacterToPosition(sourceFile, position);
  const touching = getTouchingPropertyName(sourceFile, pos);
  const node = touching === undefined ? undefined : getAdjustedLocation(touching, true);

  if (node !== undefined && nodeIsEligibleForRename(node)) {
    const renameInfo = getRenameInfoForNode(service, context, newName, node, sourceFile, program);
    if (renameInfo !== undefined) return renameInfo;
  }
  return getRenameInfoError(Diagnostics.You_cannot_rename_this_element);
}

export function symbolAndEntriesToRename<LanguageService extends RenameLanguageService>(
  service: LanguageService,
  context: unknown,
  params: RenameRequest,
  data: SymbolAndEntriesData<SymbolAndEntries>,
  _options: SymbolEntryTransformOptions,
): RenameResponse {
  const clientContext = asClientCapabilitiesContext(context);
  const originalNode = asNode(data.originalNode);
  if (originalNode === undefined || !nodeIsEligibleForRename(originalNode)) return {};

  const program = service.getProgram();
  const sourceFile = asRenameSourceFile(getSourceFileOfNode(originalNode));
  if (sourceFile === undefined) return {};

  const info = getRenameInfoForNode(service, clientContext, params.newName, originalNode, sourceFile, program);
  if (info === undefined || !info.canRename) return {};

  const checkerLease = program.getTypeChecker(clientContext);
  try {
    const quotePreference = getQuotePreference(sourceFile, service.userPreferences());
    const changes: Record<string, TextEdit[]> = {};

    for (const entryGroup of data.symbolsAndEntries ?? []) {
      for (const entry of entryGroup.references) {
        if (shouldSkipImportPathRename(service, entry)) continue;
        const uri = getFileNameOfEntry(service, entry);
        const textEdit: TextEdit = {
          range: getRangeOfEntry(service, entry),
          newText: getTextForRename(originalNode, entry, params.newName, checkerLease.checker, quotePreference),
        };
        (changes[uri] ??= []).push(textEdit);
      }
    }

    return { workspaceEdit: { changes } };
  } finally {
    checkerLease.release();
  }
}

export function nodeIsEligibleForRename(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.Identifier:
    case Kind.PrivateIdentifier:
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.ThisKeyword:
      return true;
    case Kind.NumericLiteral:
      return isLiteralNameOfPropertyDeclarationOrIndexAccess(node);
    default:
      return false;
  }
}

export function renameBlockedReason(
  sourceFile: SourceFile,
  node: AstNode,
  symbol: AstSymbol,
  checker: RenameChecker,
  program: RenameProgram,
  preferences: RenameUserPreferences,
): typeof Diagnostics.You_cannot_rename_this_element | undefined {
  for (const declaration of symbol.declarations) {
    if (isDefinedInLibraryFile(program, declaration)) {
      return Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library;
    }
  }

  if (
    isIdentifier(node)
    && node.text === "default"
    && symbol.parent !== undefined
    && ((symbol.parent.flags ?? SymbolFlags.None) & SymbolFlags.Module) !== 0
  ) {
    return Diagnostics.You_cannot_rename_this_element;
  }

  return wouldRenameInOtherNodeModules(sourceFile, symbol, checker, preferences);
}

export function isDefinedInLibraryFile(program: RenameProgram, declaration: AstNode): boolean {
  const sourceFile = asSourceFile(getSourceFileOfNode(declaration));
  return sourceFile !== undefined
    && program.isSourceFileDefaultLibrary(sourceFile.path)
    && isDeclarationFileName(sourceFile.fileName);
}

export function wouldRenameInOtherNodeModules(
  originalFile: SourceFile,
  symbol: AstSymbol,
  checker: RenameChecker,
  preferences: RenameUserPreferences,
): typeof Diagnostics.You_cannot_rename_this_element | undefined {
  let sym = symbol;
  if (!tristateIsTrue(preferences.useAliasesForRename) && ((sym.flags ?? SymbolFlags.None) & SymbolFlags.Alias) !== 0) {
    const importSpecifier = sym.declarations.find(isImportSpecifier);
    if (importSpecifier !== undefined && importSpecifier.propertyName === undefined) {
      sym = checker.getAliasedSymbol(sym);
    }
  }

  if (sym.declarations.length === 0) return undefined;

  const originalPackage = parseNodeModuleFromPath(originalFile.fileName, false);
  if (originalPackage === "") {
    for (const declaration of sym.declarations) {
      const declarationSourceFile = asSourceFile(getSourceFileOfNode(declaration));
      if (declarationSourceFile !== undefined && isInsideNodeModules(declarationSourceFile.fileName)) {
        return Diagnostics.You_cannot_rename_elements_that_are_defined_in_a_node_modules_folder;
      }
    }
    return undefined;
  }

  for (const declaration of sym.declarations) {
    const declarationSourceFile = asSourceFile(getSourceFileOfNode(declaration));
    if (declarationSourceFile === undefined) continue;
    const declarationPackage = parseNodeModuleFromPath(declarationSourceFile.fileName, false);
    if (declarationPackage !== "" && declarationPackage !== originalPackage) {
      return Diagnostics.You_cannot_rename_elements_that_are_defined_in_another_node_modules_folder;
    }
  }
  return undefined;
}

export function clientSupportsWillRenameFiles(context: ClientCapabilitiesContext | undefined): boolean {
  return getClientCapabilities(context).workspace?.fileOperations?.willRename === true;
}

export function clientSupportsDocumentChanges(context: ClientCapabilitiesContext | undefined): boolean {
  return getClientCapabilities(context).workspace?.workspaceEdit?.documentChanges === true;
}

export function clientSupportsRenameResourceOperations(context: ClientCapabilitiesContext | undefined): boolean {
  return getClientCapabilities(context).workspace?.workspaceEdit?.resourceOperations?.includes(ResourceOperationKindRename) === true;
}

export function getRenameInfoForModule(
  service: RenameLanguageService,
  context: ClientCapabilitiesContext | undefined,
  newName: string,
  specifier: AstNode,
  sourceFile: RenameSourceFile,
  moduleSymbol: AstSymbol,
): RenameInfo | undefined {
  const specifierText = nodeText(specifier);
  if (!isExternalModuleNameRelative(specifierText)) {
    return getRenameInfoError(Diagnostics.You_cannot_rename_a_module_via_a_global_import);
  }
  if (!clientSupportsDocumentChanges(context) || !clientSupportsRenameResourceOperations(context)) {
    return getRenameInfoError(Diagnostics.File_rename_is_not_supported_by_the_editor);
  }

  const moduleSourceFile = moduleSymbol.declarations.find(isSourceFileNode);
  if (moduleSourceFile === undefined) return undefined;

  const fileName = sourceFileFileName(moduleSourceFile);
  let withoutIndex = "";
  if (!specifierText.endsWith("/index") && !specifierText.endsWith("/index.js")) {
    const candidate = removeFileExtension(fileName);
    if (candidate.endsWith("/index")) {
      withoutIndex = candidate.slice(0, -"/index".length);
    }
  }

  const displayName = withoutIndex !== "" ? withoutIndex : fileName;
  const newFileName = getNewFileNameForModuleRename(service, displayName, specifierText, newName);

  const indexAfterLastSlash = specifierText.lastIndexOf("/") + 1;
  const start = specifier.pos + 1 + indexAfterLastSlash;
  const length = specifierText.length - indexAfterLastSlash;
  return {
    canRename: true,
    displayName: specifierText.slice(indexAfterLastSlash),
    triggerSpan: service.converters.toLSPRange(sourceFile, newTextRange(start, start + length)),
    fileToRename: displayName,
    newFileName,
  };
}

export function getNewFileNameForModuleRename(
  service: RenameLanguageService,
  oldPath: string,
  specifierText: string,
  newName: string,
): string {
  let newPath = combinePaths(getDirectoryPath(oldPath), newName);
  const ignoreCase = !service.host.useCaseSensitiveFileNames();
  const oldExt = isDeclarationFileName(oldPath)
    ? getDeclarationFileExtension(oldPath)
    : getAnyExtensionFromPath(oldPath, undefined, ignoreCase);
  if (!hasExtension(newPath)) {
    newPath += oldExt;
  } else if (
    getAnyExtensionFromPath(newPath, undefined, ignoreCase) === getAnyExtensionFromPath(specifierText, undefined, ignoreCase)
  ) {
    newPath = changeAnyExtension(newPath, oldExt, undefined, ignoreCase);
  }
  return newPath;
}

export function getTextForRename(
  originalNode: AstNode,
  entry: ReferenceEntry,
  newText: string,
  checker: RenameChecker,
  quotePreference: QuotePreference,
): string {
  if (entry.kind !== entryKindRange && (isIdentifier(originalNode) || isStringLiteralLike(originalNode))) {
    const node = getReparsedNodeForNode(entry.node);
    if (node !== undefined) {
      const kind = entry.kind;
      const parent = node.parent;
      const name = nodeText(originalNode);
      const isShorthandAssignment = isShorthandPropertyAssignment(parent);
      if (
        isShorthandAssignment
        || (isObjectBindingElementWithoutPropertyName(parent) && nodeName(parent) === node && property(parent, "dotDotDotToken") === undefined)
      ) {
        if (kind === entryKindSearchedLocalFoundProperty) return `${name}: ${newText}`;
        if (kind === entryKindSearchedPropertyFoundLocal) return `${newText}: ${name}`;
        if (isShorthandAssignment) {
          const grandParent = parent.parent;
          if (
            isObjectLiteralExpression(grandParent)
            && isBinaryExpression(grandParent.parent)
            && isModuleExportsAccessExpression(grandParent.parent.left)
          ) {
            return `${name}: ${newText}`;
          }
          return `${newText}: ${name}`;
        }
        return `${name}: ${newText}`;
      }
      if (isImportSpecifier(parent) && parent.propertyName === undefined) {
        const originalSymbol = isExportSpecifier(originalNode.parent)
          ? checker.getExportSpecifierLocalTargetSymbol(originalNode.parent)
          : checker.getSymbolAtLocation(originalNode);
        if (originalSymbol !== undefined && originalSymbol.declarations.includes(parent)) {
          return `${name} as ${newText}`;
        }
        return newText;
      }
      if (isExportSpecifier(parent) && parent.propertyName === undefined) {
        if (originalNode === entry.node || checker.getSymbolAtLocation(originalNode) === checker.getSymbolAtLocation(entry.node ?? originalNode)) {
          return `${name} as ${newText}`;
        }
        return `${newText} as ${name}`;
      }
    }
  }

  if (entry.kind !== entryKindRange && entry.node !== undefined && isNumericLiteral(entry.node) && isAccessExpression(entry.node.parent)) {
    const quote = getQuoteFromPreference(quotePreference);
    return `${quote}${newText}${quote}`;
  }

  return newText;
}

export function getQuoteFromPreference(quotePreference: QuotePreference): string {
  return quotePreference === QuotePreferenceSingle ? "'" : "\"";
}

export function getRenameInfoError(message: typeof Diagnostics.You_cannot_rename_this_element): RenameInfo {
  return {
    canRename: false,
    localizedErrorMessage: formatDiagnosticMessage(message),
  };
}

export function getRenameInfoSuccess(
  service: Pick<RenameLanguageService, "converters">,
  node: AstNode,
  sourceFile: RenameSourceFile,
  displayName: string,
): RenameInfo {
  let start = getStartOfNode(node, sourceFile, false);
  let end = node.end;
  if (isStringLiteralLike(node)) {
    start += 1;
    end -= 1;
  }
  return {
    canRename: true,
    displayName,
    triggerSpan: service.converters.toLSPRange(sourceFile, newTextRange(start, end)),
  };
}

function getRenameInfoForNode(
  service: RenameLanguageService,
  context: ClientCapabilitiesContext | undefined,
  newName: string,
  node: AstNode,
  sourceFile: RenameSourceFile,
  program: RenameProgram,
): RenameInfo | undefined {
  const checkerLease = program.getTypeChecker(context);
  try {
    const checker = checkerLease.checker;
    const symbol = checker.getSymbolAtLocation(node);
    if (symbol === undefined) {
      if (isStringLiteralLike(node)) {
        const typ = checker.getContextualTypeFromParentOrAncestorTypeNode(node);
        if (typ !== undefined && isStringLiteralOrUnionOfStringLiterals(typ)) {
          return getRenameInfoSuccess(service, node, sourceFile, nodeText(node));
        }
      } else if (isLabelName(node)) {
        return getRenameInfoSuccess(service, node, sourceFile, nodeText(node));
      }
      return undefined;
    }

    if (symbol.declarations.length === 0) return undefined;

    const blockedReason = renameBlockedReason(sourceFile, node, symbol, checker, program, service.userPreferences());
    if (blockedReason !== undefined) return getRenameInfoError(blockedReason);

    if (isStringLiteralLike(node) && tryGetImportFromModuleSpecifier(node) !== undefined) {
      if (tristateIsTrue(service.userPreferences().allowRenameOfImportPath)) {
        return getRenameInfoForModule(service, context, newName, node, sourceFile, symbol);
      }
      return undefined;
    }

    return getRenameInfoSuccess(service, node, sourceFile, checker.symbolToString(symbol));
  } finally {
    checkerLease.release();
  }
}

function renameRequest(params: RenameParams): RenameRequest {
  return {
    ...params,
    textDocumentURI(): DocumentUri {
      return params.textDocument.uri;
    },
    textDocumentPosition(): Position {
      return params.position;
    },
  };
}

function shouldSkipImportPathRename(service: RenameLanguageService, entry: ReferenceEntry): boolean {
  return !tristateIsTrue(service.userPreferences().allowRenameOfImportPath)
    && entry.node !== undefined
    && isStringLiteralLike(entry.node)
    && tryGetImportFromModuleSpecifier(entry.node) !== undefined;
}

function getFileNameOfEntry(service: RenameLanguageService, entry: ReferenceEntry): DocumentUri {
  if (service.getFileNameOfEntry !== undefined) return service.getFileNameOfEntry(entry);
  if (entry.lspRange !== undefined) return entry.lspRange.uri;
  if (entry.fileName !== undefined) return fileNameToDocumentURI(entry.fileName);
  const sourceFile = asSourceFile(getSourceFileOfNode(entry.node));
  if (sourceFile !== undefined) return fileNameToDocumentURI(sourceFile.fileName);
  throw new Error("rename entry has no source file");
}

function getRangeOfEntry(service: RenameLanguageService, entry: ReferenceEntry): Range {
  if (service.getRangeOfEntry !== undefined) return service.getRangeOfEntry(entry);
  if (entry.lspRange !== undefined) return entry.lspRange.range;
  const sourceFile = asRenameSourceFile(getSourceFileOfNode(entry.node));
  const range = entry.textRange ?? entry.node;
  if (sourceFile !== undefined && range !== undefined) {
    return service.converters.toLSPRange(sourceFile, range);
  }
  throw new Error("rename entry has no range");
}

function isStringLiteralOrUnionOfStringLiterals(type: Type): boolean {
  if (isStringLiteralType(type)) return true;
  const union = asUnionType(type);
  return union !== undefined && union.types.every(isStringLiteralType);
}

function isLiteralNameOfPropertyDeclarationOrIndexAccess(node: AstNode): boolean {
  const parent = node.parent;
  return (
    parent.kind === Kind.PropertyDeclaration
    || parent.kind === Kind.PropertySignature
    || parent.kind === Kind.MethodDeclaration
    || parent.kind === Kind.MethodSignature
    || parent.kind === Kind.GetAccessor
    || parent.kind === Kind.SetAccessor
    || parent.kind === Kind.PropertyAssignment
    || parent.kind === Kind.EnumMember
  ) && nodeName(parent) === node
    || parent.kind === Kind.ElementAccessExpression && property(parent, "argumentExpression") === node;
}

function isObjectBindingElementWithoutPropertyName(node: AstNode): boolean {
  return node.kind === Kind.BindingElement && property(node, "propertyName") === undefined && node.parent.kind === Kind.ObjectBindingPattern;
}

function isModuleExportsAccessExpression(node: AstNode): boolean {
  if (node.kind !== Kind.PropertyAccessExpression) return false;
  const expression = property<AstNode>(node, "expression");
  const name = property<AstNode>(node, "name");
  if (nodeText(name) !== "exports" || expression === undefined) return false;
  return expression.kind === Kind.Identifier && nodeText(expression) === "module";
}

function tryGetImportFromModuleSpecifier(node: AstNode): AstNode | undefined {
  const parent = node.parent;
  if ((parent.kind === Kind.ImportDeclaration || parent.kind === Kind.JSImportDeclaration) && property(parent, "moduleSpecifier") === node) {
    return parent;
  }
  if (parent.kind === Kind.ExportDeclaration && property(parent, "moduleSpecifier") === node) {
    return parent;
  }
  if (parent.kind === Kind.ExternalModuleReference && property(parent, "expression") === node) {
    return parent;
  }
  return undefined;
}

function getAdjustedLocation(node: AstNode, _forRename: boolean): AstNode {
  if (node.kind === Kind.FromKeyword) {
    const moduleSpecifier = property<AstNode>(node.parent, "moduleSpecifier");
    if (moduleSpecifier !== undefined) return moduleSpecifier;
  }
  if (node.kind === Kind.ImportKeyword && node.parent.kind === Kind.ImportDeclaration) {
    const importClause = property<AstNode>(node.parent, "importClause");
    const name = nodeName(importClause);
    if (name !== undefined) return name;
    const moduleSpecifier = property<AstNode>(node.parent, "moduleSpecifier");
    if (moduleSpecifier !== undefined) return moduleSpecifier;
  }
  if (node.kind === Kind.ExportKeyword) {
    const moduleSpecifier = property<AstNode>(node.parent, "moduleSpecifier");
    if (moduleSpecifier !== undefined) return moduleSpecifier;
  }
  return node;
}

function getReparsedNodeForNode(node: AstNode | undefined): AstNode | undefined {
  return node;
}

function isLabelName(node: AstNode): boolean {
  return node.kind === Kind.Identifier && node.parent.kind === Kind.LabeledStatement && property(node.parent, "label") === node;
}

function isInsideNodeModules(fileName: string): boolean {
  return fileName.includes("/node_modules/");
}

function isSourceFileNode(node: AstNode): boolean {
  return node.kind === Kind.SourceFile;
}

function asNode(value: unknown): AstNode | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const candidate = value as { readonly kind?: unknown; readonly pos?: unknown; readonly end?: unknown };
  return typeof candidate.kind === "number" && typeof candidate.pos === "number" && typeof candidate.end === "number"
    ? value as AstNode
    : undefined;
}

function asClientCapabilitiesContext(context: unknown): ClientCapabilitiesContext | undefined {
  return typeof context === "object" && context !== null ? context as ClientCapabilitiesContext : undefined;
}

function asSourceFile(node: AstNode | undefined): SourceFile | undefined {
  return node !== undefined && node.kind === Kind.SourceFile ? node as SourceFile : undefined;
}

function asRenameSourceFile(node: AstNode | undefined): RenameSourceFile | undefined {
  const sourceFile = asSourceFile(node);
  return sourceFile !== undefined && Array.isArray((sourceFile as { readonly lineStarts?: unknown }).lineStarts)
    ? sourceFile as RenameSourceFile
    : undefined;
}

function property<T = unknown>(node: AstNode | undefined, name: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Readonly<Record<string, T | undefined>>)[name];
}
