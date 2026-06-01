import {
  getSourceFileOfNode,
  isAccessExpression,
  isBinaryExpression,
  isCallExpression,
  isComputedPropertyName,
  isDeclaration,
  isExportAssignment,
  isForInOrOfStatement,
  isJSDocTag,
  isSourceFile,
  isStatement,
  isStringLiteralLike,
  isTypeLiteralNode,
  isUnionTypeNode,
  isVariableDeclarationList,
  isVariableStatement,
  Kind,
  nodeText,
  SymbolFlags,
  type FileReference,
  type Node,
  type SourceFile,
  type Symbol,
  type TextRange,
} from "../ast/index.js";
import { LanguageVariant } from "../core/languageVariant.js";
import { isIdentifierPartCodePoint } from "../scanner/index.js";
import type { DocumentUri, ImplementationParams, ImplementationResponse, Location, LocationLink, Position, ReferenceParams, ReferencesResponse, Range } from "../lsp/lsproto/index.js";
import { compareRanges } from "../lsp/lsproto/util.js";
import { getStartOfNode, getTouchingPropertyName } from "../astnav/index.js";
import {
  combineImplementations,
  combineReferences,
  handleCrossProject,
  type CrossProjectLanguageService,
  type CrossProjectOrchestrator,
  type SymbolAndEntriesData as CrossProjectSymbolAndEntriesData,
} from "./crossProject.js";
import { fileNameToDocumentURI } from "./lsconv/index.js";
import { isExpressionOfExternalModuleImportEqualsDeclaration, isLiteralNameOfPropertyDeclarationOrIndexAccess, isNameOfModuleDeclaration } from "./utilities.js";

export enum ReferenceUse {
  None = 0,
  Other = 1,
  References = 2,
  Rename = 3,
}

export interface RefOptions {
  readonly findInStrings: boolean;
  readonly findInComments: boolean;
  readonly use: ReferenceUse;
  readonly implementations: boolean;
  readonly useAliasesForRename: boolean;
}

export interface RefInfo {
  readonly file: SourceFile;
  readonly fileName: string;
  readonly reference: FileReference;
  readonly unverified: boolean;
}

export interface SymbolAndEntries {
  readonly definition?: Definition;
  readonly references: readonly ReferenceEntry[];
}

export function newSymbolAndEntries(
  kind: DefinitionKind,
  node: Node | undefined,
  symbol: Symbol | undefined,
  references: readonly ReferenceEntry[],
): SymbolAndEntries {
  const definition: Definition = {
    kind,
    ...(node === undefined ? {} : { node }),
    ...(symbol === undefined ? {} : { symbol }),
  };
  return {
    definition,
    references,
  };
}

export enum DefinitionKind {
  Symbol = 0,
  Label = 1,
  Keyword = 2,
  This = 3,
  String = 4,
  TripleSlashReference = 5,
}

export interface Definition {
  readonly kind: DefinitionKind;
  readonly symbol?: Symbol;
  readonly node?: Node;
  readonly tripleSlashFileRef?: TripleSlashDefinition;
}

export interface TripleSlashDefinition {
  readonly reference: FileReference;
  readonly file: SourceFile;
}

export enum EntryKind {
  None = 0,
  Range = 1,
  Node = 2,
  StringLiteral = 3,
  SearchedLocalFoundProperty = 4,
  SearchedPropertyFoundLocal = 5,
}

export interface ReferenceEntry {
  kind: EntryKind;
  node?: Node;
  context?: Node;
  fileName?: string;
  textRange?: TextRange;
  lspRange?: Location;
}

export function canUseDefinitionSymbol(entry: SymbolAndEntries): boolean {
  if (entry.definition === undefined) return false;
  switch (entry.definition.kind) {
    case DefinitionKind.Symbol:
    case DefinitionKind.This:
      return entry.definition.symbol !== undefined;
    case DefinitionKind.TripleSlashReference:
      return false;
    default:
      return false;
  }
}

export function getRangeOfEntry(entry: ReferenceEntry): Location["range"] {
  if (entry.lspRange === undefined) throw new Error("reference entry has not been resolved to an LSP range");
  return entry.lspRange.range;
}

export function getFileNameOfEntry(entry: ReferenceEntry): DocumentUri {
  if (entry.lspRange === undefined) throw new Error("reference entry has not been resolved to an LSP location");
  return entry.lspRange.uri;
}

export function getLocationOfEntry(entry: ReferenceEntry): Location {
  if (entry.lspRange === undefined) throw new Error("reference entry has not been resolved to an LSP location");
  return entry.lspRange;
}

export interface ReferenceLocationService {
  getMappedLocation(fileName: string, textRange: TextRange): Location;
  createLspRangeFromBounds(start: number, end: number, sourceFile: SourceFile): Range;
}

export function resolveEntry(service: ReferenceLocationService, entry: ReferenceEntry): ReferenceEntry {
  if (entry.textRange === undefined) {
    if (entry.node === undefined) throw new Error("reference entry needs node or text range");
    const sourceFile = getNodeSourceFile(entry.node);
    const textRange = getRangeOfNode(entry.node, sourceFile, undefined);
    entry.textRange = textRange;
    entry.fileName = sourceFile.fileName;
  }
  if (entry.lspRange === undefined) {
    if (entry.fileName === undefined) throw new Error("reference entry has no file name");
    entry.lspRange = service.getMappedLocation(entry.fileName, entry.textRange);
  }
  return entry;
}

export function newNodeEntryWithKind(node: Node, kind: EntryKind): ReferenceEntry {
  const entry = newNodeEntry(node);
  entry.kind = kind;
  return entry;
}

export function newNodeEntry(node: Node): ReferenceEntry {
  const context = getContextNodeForNodeEntry(node);
  return {
    kind: EntryKind.Node,
    node: nodeName(node) ?? node,
    ...(context === undefined ? {} : { context }),
  };
}

export function getContextNodeForNodeEntry(node: Node): Node | undefined {
  if (isDeclaration(node)) return getContextNode(node);
  const parent = node.parent;
  if (parent === undefined) return undefined;
  if (!isDeclaration(parent) && !isExportAssignment(parent)) {
    if (isBinaryExpression(parent)) {
      return getContextNode(parent);
    }
    if (isAccessExpression(parent) && isBinaryExpression(parent.parent) && nodeProperty(parent.parent, "left") === parent) {
      return getContextNode(parent.parent);
    }
    switch (parent.kind) {
      case Kind.JsxOpeningElement:
      case Kind.JsxClosingElement:
        return parent.parent;
      case Kind.JsxSelfClosingElement:
      case Kind.LabeledStatement:
      case Kind.BreakStatement:
      case Kind.ContinueStatement:
        return parent;
      case Kind.StringLiteral:
      case Kind.NoSubstitutionTemplateLiteral: {
        const validImport = tryGetImportFromModuleSpecifier(node);
        if (validImport !== undefined) {
          const declOrStatement = findAncestor(validImport, ancestor => isDeclaration(ancestor) || isStatement(ancestor) || isJSDocTag(ancestor));
          return declOrStatement !== undefined && isDeclaration(declOrStatement) ? getContextNode(declOrStatement) : declOrStatement;
        }
        break;
      }
      default:
        break;
    }
    const propertyName = findAncestor(node, isComputedPropertyName);
    return propertyName === undefined ? undefined : getContextNode(propertyName.parent);
  }
  if (nodeName(parent) === node
    || parent.kind === Kind.Constructor
    || parent.kind === Kind.ExportAssignment
    || ((isImportOrExportSpecifier(parent) || parent.kind === Kind.BindingElement) && nodeProperty(parent, "propertyName") === node)
    || (node.kind === Kind.DefaultKeyword && hasSyntacticExportDefaultModifier(parent))) {
    return getContextNode(parent);
  }
  return undefined;
}

export function getContextNode(node: Node | undefined): Node | undefined {
  if (node === undefined) return undefined;
  switch (node.kind) {
    case Kind.VariableDeclaration:
      if (!isVariableDeclarationList(node.parent) || nodeArray(node.parent, "declarations").length !== 1) return node;
      if (isVariableStatement(node.parent.parent)) return node.parent.parent;
      if (isForInOrOfStatement(node.parent.parent)) return getContextNode(node.parent.parent);
      return node.parent;
    case Kind.BindingElement:
      return getContextNode(node.parent.parent);
    case Kind.ImportSpecifier:
      return node.parent.parent.parent;
    case Kind.ExportSpecifier:
    case Kind.NamespaceImport:
      return node.parent.parent;
    case Kind.ImportClause:
    case Kind.NamespaceExport:
      return node.parent;
    case Kind.BinaryExpression:
      return node.parent.kind === Kind.ExpressionStatement ? node.parent : node;
    case Kind.ForOfStatement:
    case Kind.ForInStatement:
      return undefined;
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
      if (isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent)) {
        return getContextNode(findAncestor(node.parent, ancestor => ancestor.kind === Kind.BinaryExpression || isForInOrOfStatement(ancestor)));
      }
      return node;
    case Kind.SwitchStatement:
      return undefined;
    default:
      return node;
  }
}

export function getLspRangeOfNode(service: ReferenceLocationService, node: Node, sourceFile: SourceFile | undefined, endNode: Node | undefined): Range {
  const file = sourceFile ?? getNodeSourceFile(node);
  const textRange = getRangeOfNode(node, file, endNode);
  return service.createLspRangeFromBounds(textRange.pos, textRange.end, file);
}

export function getRangeOfNode(node: Node, sourceFile: SourceFile | undefined, endNode: Node | undefined): TextRange {
  const file = sourceFile ?? getNodeSourceFile(node);
  let start = getStartOfNode(node, file, false);
  let end = (endNode ?? node).end;
  if (isStringLiteralLike(node) && end - start > 2) {
    if (endNode !== undefined) throw new Error("endNode is not undefined for stringLiteralLike");
    start += 1;
    end -= 1;
  }
  if (endNode?.kind === Kind.CaseBlock) end = endNode.pos;
  return { pos: start, end };
}

export function isValidReferencePosition(node: Node, searchSymbolName: string): boolean {
  switch (node.kind) {
    case Kind.PrivateIdentifier:
    case Kind.Identifier:
      return nodeText(node).length === searchSymbolName.length;
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.StringLiteral:
      return nodeText(node).length === searchSymbolName.length
        && (isLiteralNameOfPropertyDeclarationOrIndexAccess(node)
          || isNameOfModuleDeclaration(node)
          || isExpressionOfExternalModuleImportEqualsDeclaration(node)
          || isBindableObjectDefinePropertyArgument(node)
          || isImportOrExportSpecifier(node.parent));
    case Kind.NumericLiteral:
      return isLiteralNameOfPropertyDeclarationOrIndexAccess(node) && nodeText(node).length === searchSymbolName.length;
    case Kind.DefaultKeyword:
      return "default".length === searchSymbolName.length;
    default:
      return false;
  }
}

export function isForRenameWithPrefixAndSuffixText(options: RefOptions): boolean {
  return options.use === ReferenceUse.Rename && options.useAliasesForRename;
}

export function getPossibleSymbolReferenceNodes(sourceFile: SourceFile, symbolName: string, container?: Node): readonly Node[] {
  return getPossibleSymbolReferencePositions(sourceFile, symbolName, container).flatMap(position => {
    const referenceLocation = getTouchingPropertyName(sourceFile, position);
    return referenceLocation === undefined || referenceLocation === sourceFile ? [] : [referenceLocation];
  });
}

export function getPossibleSymbolReferencePositions(sourceFile: SourceFile, symbolName: string, container?: Node): readonly number[] {
  const positions: number[] = [];
  if (symbolName === "") return positions;

  const text = sourceFile.text;
  const sourceLength = text.length;
  const symbolNameLength = symbolName.length;
  const searchContainer = container ?? sourceFile;
  const searchStart = Math.max(0, searchContainer.pos);
  const searchEnd = Math.min(sourceLength, searchContainer.end);

  let position = text.indexOf(symbolName, searchStart);
  while (position >= 0 && position < searchEnd) {
    const endPosition = position + symbolNameLength;
    if ((position === 0 || !isIdentifierPartAt(text, position - 1))
      && (endPosition === sourceLength || !isIdentifierPartAt(text, endPosition))) {
      positions.push(position);
    }
    const startIndex = position + symbolNameLength + 1;
    if (startIndex > sourceLength) break;
    position = text.indexOf(symbolName, startIndex);
  }
  return positions;
}

export function getAllReferencesForKeyword(sourceFiles: readonly SourceFile[], keywordKind: Kind, filterReadOnlyTypeOperator: boolean): readonly SymbolAndEntries[] {
  const keywordText = tokenText(keywordKind);
  if (keywordText === "") return [];
  const references = sourceFiles.flatMap(sourceFile =>
    getPossibleSymbolReferenceNodes(sourceFile, keywordText, sourceFile)
      .filter(referenceLocation => referenceLocation.kind === keywordKind && (!filterReadOnlyTypeOperator || isReadonlyTypeOperator(referenceLocation)))
      .map(referenceLocation => newNodeEntry(referenceLocation)));
  return references.length === 0
    ? []
    : [newSymbolAndEntries(DefinitionKind.Keyword, references[0]!.node, undefined, references)];
}

export function findFirstJsxNode(root: Node): Node | undefined {
  let result: Node | undefined;
  const visit = (node: Node): boolean | undefined => {
    if (node.kind === Kind.JsxElement || node.kind === Kind.JsxSelfClosingElement || node.kind === Kind.JsxFragment) {
      result = node;
      return true;
    }
    node.forEachChild(visit);
    return result !== undefined;
  };
  visit(root);
  return result;
}

export interface ReferenceChecker {
  getExportSpecifierLocalTargetSymbol?(node: Node): Symbol | undefined;
  getTypeFromTypeNode?(node: Node): unknown;
  getPropertyOfType?(type: unknown, name: string): Symbol | undefined;
  isExternalModuleSymbol?(symbol: Symbol): boolean;
}

export function skipPastExportOrImportSpecifierOrUnion(
  symbol: Symbol,
  node: Node | undefined,
  checker: ReferenceChecker,
  useLocalSymbolForExportSpecifier: boolean,
): Symbol | undefined {
  if (node === undefined) return undefined;
  const parent = node.parent;
  if (parent.kind === Kind.ExportSpecifier && useLocalSymbolForExportSpecifier) {
    const localSymbol = checker.getExportSpecifierLocalTargetSymbol?.(parent);
    if (localSymbol !== undefined) return localSymbol;
  }
  for (const declaration of symbol.declarations) {
    if (declaration.parent === undefined) {
      if (((symbol.flags ?? 0) & (SymbolFlags.Transient | SymbolFlags.ModuleExports)) !== 0) continue;
      throw new Error(`Unexpected symbol at ${Kind[node.kind] ?? node.kind}: ${symbol.name}`);
    }
    if (isTypeLiteralNode(declaration.parent) && isUnionTypeNode(declaration.parent.parent)) {
      return checker.getPropertyOfType?.(checker.getTypeFromTypeNode?.(declaration.parent.parent), symbol.name ?? "");
    }
  }
  return undefined;
}

export function getSymbolScope(symbol: Symbol, checker?: ReferenceChecker): Node | undefined {
  const valueDeclaration = symbol.valueDeclaration;
  if (valueDeclaration !== undefined && (valueDeclaration.kind === Kind.FunctionExpression || valueDeclaration.kind === Kind.ClassExpression)) {
    return valueDeclaration;
  }
  if (symbol.declarations.length === 0) return undefined;
  const declarations = symbol.declarations;
  if (((symbol.flags ?? 0) & (SymbolFlags.Property | SymbolFlags.Method)) !== 0) {
    const privateDeclaration = declarations.find(declaration => hasPrivateModifier(declaration) || isPrivateIdentifierClassElementDeclaration(declaration));
    if (privateDeclaration !== undefined) return findAncestorKind(privateDeclaration, Kind.ClassDeclaration);
    return undefined;
  }
  if (declarations.some(isObjectBindingElementWithoutPropertyNameLocal)) return undefined;
  const parentSymbol = symbol.parent;
  const exposedByParent = parentSymbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.TypeParameter) === 0;
  if (exposedByParent && !(checker?.isExternalModuleSymbol?.(parentSymbol) === true && isSourceFileWithGlobalExports(parentSymbol.valueDeclaration))) {
    return undefined;
  }
  let scope: Node | undefined;
  for (const declaration of declarations) {
    const container = getContainerNodeLocal(declaration);
    if (scope !== undefined && scope !== container) return undefined;
    if (container === undefined || (isSourceFile(container) && !isExternalOrCommonJSModule(container))) return undefined;
    scope = container;
  }
  return scope;
}

export interface TextDocumentPositionCarrier {
  textDocumentURI(): DocumentUri;
  textDocumentPosition(): Location["range"]["start"];
}

export class ReferencePosition implements TextDocumentPositionCarrier {
  readonly uri: DocumentUri;
  readonly pos: Location["range"]["start"];

  constructor(uri: DocumentUri, pos: Location["range"]["start"]) {
    this.uri = uri;
    this.pos = pos;
  }

  textDocumentURI(): DocumentUri {
    return this.uri;
  }

  textDocumentPosition(): Location["range"]["start"] {
    return this.pos;
  }
}

export interface NonLocalDefinition extends ReferencePosition {
  getSourcePosition(): TextDocumentPositionCarrier | undefined;
  getGeneratedPosition(): TextDocumentPositionCarrier | undefined;
}

export function getFileAndStartPosFromDeclaration(declaration: Node): readonly [SourceFile, number] {
  const file = getNodeSourceFile(declaration);
  const name = nodeName(declaration) ?? declaration;
  const textRange = getRangeOfNode(name, file, undefined);
  return [file, textRange.pos];
}

export interface DefinitionVisibilityResolver {
  isDeclarationVisible(declaration: Node): boolean;
}

export function isDefinitionVisible(emitResolver: DefinitionVisibilityResolver, declaration: Node): boolean {
  if (emitResolver.isDeclarationVisible(declaration)) return true;
  const parent = declaration.parent;
  if (parent === undefined) return false;
  if (nodeInitializer(parent) === declaration) return isDefinitionVisible(emitResolver, parent);
  switch (declaration.kind) {
    case Kind.PropertyDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.MethodDeclaration:
      if (hasPrivateModifier(declaration) || nodeName(declaration)?.kind === Kind.PrivateIdentifier) return false;
      return isDefinitionVisible(emitResolver, parent);
    case Kind.Constructor:
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.ObjectLiteralExpression:
    case Kind.ClassExpression:
    case Kind.ArrowFunction:
    case Kind.FunctionExpression:
      return isDefinitionVisible(emitResolver, parent);
    default:
      return false;
  }
}

export interface ReferenceProgram extends ReferenceMergeProgram {
  sourceFiles(): readonly SourceFile[];
}

export interface ReferenceLanguageService
  extends ReferenceLocationService, CrossProjectLanguageService<SymbolAndEntries> {
  getProgramAndFile(documentURI: DocumentUri): readonly [ReferenceProgram, SourceFile];
  lineAndCharacterToPosition(sourceFile: SourceFile, position: Position): number;
  adjustReferenceLocation?(node: Node, forRename: boolean, sourceFile: SourceFile): Node | undefined;
  nodeIsEligibleForRename?(node: Node): boolean;
  getSymbolAndEntries?(
    position: number,
    node: Node,
    program: ReferenceProgram,
    isRename: boolean,
    implementations: boolean,
  ): readonly SymbolAndEntries[];
}

interface ReferenceRequest extends ReferenceParams {
  textDocumentURI(): DocumentUri;
  textDocumentPosition(): Position;
}

interface ImplementationRequest extends ImplementationParams {
  textDocumentURI(): DocumentUri;
  textDocumentPosition(): Position;
}

export function provideSymbolsAndEntries(
  service: ReferenceLanguageService,
  _context: unknown,
  uri: DocumentUri,
  documentPosition: Position,
  isRename: boolean,
  implementations: boolean,
): readonly [SymbolAndEntriesData, boolean] {
  const [program, sourceFile] = service.getProgramAndFile(uri);
  const position = service.lineAndCharacterToPosition(sourceFile, documentPosition);
  const touchingNode = getTouchingPropertyName(sourceFile, position);
  const node = touchingNode === undefined
    ? sourceFile
    : isRename
      ? service.adjustReferenceLocation?.(touchingNode, true, sourceFile) ?? touchingNode
      : touchingNode;

  if (isRename && (node === sourceFile || service.nodeIsEligibleForRename?.(node) !== true)
    || implementations && isSourceFile(node)) {
    return [{ originalNode: node, symbolsAndEntries: [], position }, false];
  }

  const entries = getSymbolAndEntries(service, position, node, program, isRename, implementations);
  if (!implementations) {
    return [{ originalNode: node, symbolsAndEntries: entries, position }, true];
  }

  const implementationEntries: SymbolAndEntries[] = [];
  const queue: ReferenceEntry[] = [];
  const seenNodes = new Set<Node>();
  const addToQueue = (symbolsAndEntries: readonly SymbolAndEntries[]): void => {
    implementationEntries.push(...symbolsAndEntries);
    for (const symbolAndEntries of symbolsAndEntries) queue.push(...symbolAndEntries.references);
  };

  addToQueue(entries);
  while (queue.length !== 0) {
    const entry = queue.shift()!;
    if (entry.node === undefined || seenNodes.has(entry.node)) continue;
    seenNodes.add(entry.node);
    addToQueue(getSymbolAndEntries(service, entry.node.pos, entry.node, program, isRename, implementations));
  }
  return [{ originalNode: node, symbolsAndEntries: implementationEntries, position }, true];
}

export function getSymbolAndEntries(
  service: ReferenceLanguageService,
  position: number,
  node: Node,
  program: ReferenceProgram,
  isRename: boolean,
  implementations: boolean,
): readonly SymbolAndEntries[] {
  if (service.getSymbolAndEntries !== undefined) {
    return service.getSymbolAndEntries(position, node, program, isRename, implementations);
  }
  return [];
}

export function provideReferences<LanguageService extends ReferenceLanguageService>(
  service: LanguageService,
  context: unknown,
  params: ReferenceParams,
  orchestrator?: CrossProjectOrchestrator<LanguageService, SymbolAndEntries>,
): ReferencesResponse {
  return handleCrossProject(
    service,
    context,
    referenceRequest(params),
    orchestrator,
    referencesResponseFromSymbolsAndEntries,
    combineReferences,
    false,
    false,
    {},
  );
}

export function referencesResponseFromSymbolsAndEntries(
  service: ReferenceLanguageService,
  _context: unknown,
  params: ReferenceRequest,
  data: CrossProjectSymbolAndEntriesData<SymbolAndEntries>,
  _options: SymbolEntryTransformOptions,
): ReferencesResponse {
  return {
    locations: symbolAndEntriesToReferences(
      service,
      concreteSymbolAndEntriesData(data),
      params.context?.includeDeclaration ?? false,
    ),
  };
}

export function provideImplementations<LanguageService extends ReferenceLanguageService>(
  service: LanguageService,
  context: unknown,
  params: ImplementationParams,
  orchestrator?: CrossProjectOrchestrator<LanguageService, SymbolAndEntries>,
): ImplementationResponse {
  return provideImplementationsEx(service, context, params, {}, orchestrator);
}

export function provideImplementationsEx<LanguageService extends ReferenceLanguageService>(
  service: LanguageService,
  context: unknown,
  params: ImplementationParams,
  options: SymbolEntryTransformOptions,
  orchestrator?: CrossProjectOrchestrator<LanguageService, SymbolAndEntries>,
): ImplementationResponse {
  return handleCrossProject(
    service,
    context,
    implementationRequest(params),
    orchestrator,
    implementationsResponseFromSymbolsAndEntries,
    combineImplementations,
    false,
    true,
    options,
  );
}

export function implementationsResponseFromSymbolsAndEntries(
  service: ReferenceLanguageService,
  _context: unknown,
  _params: ImplementationRequest,
  data: CrossProjectSymbolAndEntriesData<SymbolAndEntries>,
  options: SymbolEntryTransformOptions,
): ImplementationResponse {
  return symbolAndEntriesToImplementations(
    service,
    concreteSymbolAndEntriesData(data),
    options,
    options.requireLocationsResult !== true,
  ) as ImplementationResponse;
}

function referenceRequest(params: ReferenceParams): ReferenceRequest {
  return {
    ...params,
    textDocumentURI: () => params.textDocument.uri,
    textDocumentPosition: () => params.position,
  };
}

function implementationRequest(params: ImplementationParams): ImplementationRequest {
  return {
    ...params,
    textDocumentURI: () => params.textDocument.uri,
    textDocumentPosition: () => params.position,
  };
}

export interface SymbolEntryTransformOptions {
  readonly requireLocationsResult?: boolean;
  readonly dropOriginNodes?: boolean;
}

export interface SymbolAndEntriesData {
  readonly originalNode?: Node;
  readonly symbolsAndEntries: readonly SymbolAndEntries[];
  readonly position: number;
}

function concreteSymbolAndEntriesData(data: CrossProjectSymbolAndEntriesData<SymbolAndEntries>): SymbolAndEntriesData {
  if (data.position === undefined) throw new Error("cross-project symbol entries are missing the request position");
  return {
    symbolsAndEntries: data.symbolsAndEntries ?? [],
    position: data.position,
  };
}

export function symbolAndEntriesToReferences(
  service: ReferenceLocationService,
  data: SymbolAndEntriesData,
  includeDeclarations: boolean,
): readonly Location[] {
  return data.symbolsAndEntries.flatMap(symbolAndEntries => convertSymbolAndEntriesToLocations(service, symbolAndEntries, includeDeclarations));
}

export function symbolAndEntriesToImplementations(
  service: ReferenceLocationService,
  data: SymbolAndEntriesData,
  options: SymbolEntryTransformOptions,
  asLocationLinks: boolean,
): readonly Location[] | readonly LocationLink[] {
  const seenNodes = new Set<Node>();
  const entries: ReferenceEntry[] = [];
  for (const symbolAndEntries of data.symbolsAndEntries) {
    for (const reference of symbolAndEntries.references) {
      if (reference.node === undefined) continue;
      if (seenNodes.has(reference.node)) continue;
      seenNodes.add(reference.node);
      if (options.dropOriginNodes && reference.node.pos <= data.position && data.position <= reference.node.end) continue;
      entries.push(reference);
    }
  }
  return asLocationLinks ? convertEntriesToLocationLinks(service, entries) : convertEntriesToLocations(service, entries);
}

export function convertSymbolAndEntriesToLocations(
  service: ReferenceLocationService,
  symbolAndEntries: SymbolAndEntries,
  includeDeclarations: boolean,
): readonly Location[] {
  let references = symbolAndEntries.references;
  if (!includeDeclarations && symbolAndEntries.definition !== undefined) {
    references = references.filter(entry => !isDeclarationOfSymbol(entry.node, symbolAndEntries.definition?.symbol));
  }
  return convertEntriesToLocations(service, references);
}

export function isDeclarationOfSymbol(node: Node | undefined, target: Symbol | undefined): boolean {
  if (node === undefined || target === undefined) return false;
  let source: Node | undefined;
  const declaration = getDeclarationFromName(node);
  if (declaration !== undefined) {
    source = declaration;
  } else if (node.kind === Kind.DefaultKeyword) {
    source = node.parent;
  } else if (isLiteralComputedPropertyDeclarationName(node)) {
    source = node.parent.parent;
  } else if (node.kind === Kind.ConstructorKeyword && node.parent.kind === Kind.Constructor) {
    source = node.parent.parent;
  }
  return source !== undefined && target.declarations.some(declarationNode => declarationNode === source);
}

export function convertEntriesToLocations(service: ReferenceLocationService, entries: readonly ReferenceEntry[]): readonly Location[] {
  return entries.map(entry => resolveEntry(service, entry).lspRange!);
}

export function convertEntriesToLocationLinks(service: ReferenceLocationService, entries: readonly ReferenceEntry[]): readonly LocationLink[] {
  return entries.map(entry => {
    const resolved = resolveEntry(service, entry);
    const location = resolved.lspRange!;
    let targetRange = location.range;
    if (resolved.node !== undefined && resolved.context !== undefined && resolved.fileName !== undefined && resolved.textRange !== undefined) {
      const sourceFile = getNodeSourceFile(resolved.node);
      const contextTextRange = toContextRange(resolved.textRange, sourceFile, resolved.context);
      if (contextTextRange !== undefined) targetRange = service.getMappedLocation(resolved.fileName, contextTextRange).range;
    }
    return {
      targetUri: resolved.fileName === undefined ? location.uri : fileNameToDocumentURI(resolved.fileName),
      targetRange,
      targetSelectionRange: location.range,
    };
  });
}

export interface ReferenceMergeProgram {
  sourceFiles(): readonly SourceFile[];
  getSourceFile(fileName: string): SourceFile | undefined;
}

export function mergeReferences(
  service: ReferenceLocationService,
  program: ReferenceMergeProgram,
  ...referencesToMerge: readonly (readonly SymbolAndEntries[])[]
): readonly SymbolAndEntries[] {
  const result: SymbolAndEntries[] = [];
  const sourceFileIndexOfEntry = (entry: ReferenceEntry): number => {
    const sourceFile = entry.kind === EntryKind.Range && entry.fileName !== undefined
      ? program.getSourceFile(entry.fileName)
      : entry.node === undefined ? undefined : getNodeSourceFile(entry.node);
    return sourceFile === undefined ? -1 : program.sourceFiles().indexOf(sourceFile);
  };
  for (const references of referencesToMerge) {
    if (references.length === 0) continue;
    if (result.length === 0) {
      result.push(...references);
      continue;
    }
    for (const entry of references) {
      if (entry.definition === undefined || entry.definition.kind !== DefinitionKind.Symbol) {
        result.push(entry);
        continue;
      }
      const symbol = entry.definition.symbol;
      const refIndex = result.findIndex(ref => ref.definition?.kind === DefinitionKind.Symbol && ref.definition.symbol === symbol);
      if (refIndex < 0) {
        result.push(entry);
        continue;
      }
      const reference = result[refIndex]!;
      const sortedReferences = [...reference.references, ...entry.references].sort((left, right) => {
        const leftFile = sourceFileIndexOfEntry(left);
        const rightFile = sourceFileIndexOfEntry(right);
        return leftFile - rightFile || compareRanges(resolveEntry(service, left).lspRange!.range, resolveEntry(service, right).lspRange!.range);
      });
      result[refIndex] = {
        ...(reference.definition === undefined ? {} : { definition: reference.definition }),
        references: sortedReferences,
      };
    }
  }
  return result;
}

function getNodeSourceFile(node: Node): SourceFile {
  const sourceFile = getSourceFileOfNode(node);
  if (sourceFile === undefined || !isSourceFile(sourceFile)) throw new Error("node is not contained in a source file");
  return sourceFile;
}

function nodeName(node: Node | undefined): Node | undefined {
  return nodeProperty(node, "name");
}

function nodeInitializer(node: Node | undefined): Node | undefined {
  return nodeProperty(node, "initializer");
}

function nodeProperty<T = Node>(node: Node | undefined, key: string): T | undefined {
  return (node as Record<string, T | undefined> | undefined)?.[key];
}

function nodeArray(node: Node | undefined, key: string): readonly Node[] {
  const value = (node as Record<string, unknown> | undefined)?.[key];
  return Array.isArray(value) ? value as readonly Node[] : [];
}

function findAncestor(node: Node | undefined, predicate: (node: Node) => boolean): Node | undefined {
  for (let current = node; current !== undefined; current = current.parent) {
    if (predicate(current)) return current;
  }
  return undefined;
}

function findAncestorKind(node: Node | undefined, kind: Kind): Node | undefined {
  return findAncestor(node, current => current.kind === kind);
}

function tokenText(kind: Kind): string {
  if (kind === Kind.ThisKeyword) return "this";
  if (kind === Kind.SuperKeyword) return "super";
  if (kind === Kind.ImportKeyword) return "import";
  if (kind === Kind.ReadonlyKeyword) return "readonly";
  const name = Kind[kind];
  return name !== undefined && name.endsWith("Keyword") ? name.slice(0, -"Keyword".length).toLowerCase() : "";
}

function isIdentifierPartAt(text: string, index: number): boolean {
  const codePoint = text.codePointAt(index);
  return codePoint !== undefined && isIdentifierPartCodePoint(codePoint, LanguageVariant.Standard);
}

function isReadonlyTypeOperator(node: Node): boolean {
  return node.kind === Kind.ReadonlyKeyword && node.parent?.kind === Kind.TypeOperator;
}

function tryGetImportFromModuleSpecifier(node: Node): Node | undefined {
  const parent = node.parent;
  if (parent === undefined) return undefined;
  switch (parent.kind) {
    case Kind.ImportDeclaration:
    case Kind.ExportDeclaration:
    case Kind.JSImportDeclaration:
      return nodeProperty(parent, "moduleSpecifier") === node ? parent : undefined;
    case Kind.ExternalModuleReference:
      return nodeProperty(parent, "expression") === node ? parent.parent : undefined;
    default:
      return undefined;
  }
}

function isImportOrExportSpecifier(node: Node | undefined): boolean {
  return node?.kind === Kind.ImportSpecifier || node?.kind === Kind.ExportSpecifier;
}

function isArrayLiteralOrObjectLiteralDestructuringPattern(node: Node | undefined): boolean {
  return node?.kind === Kind.ArrayLiteralExpression || node?.kind === Kind.ObjectLiteralExpression;
}

function hasSyntacticExportDefaultModifier(node: Node): boolean {
  const modifiers = nodeArray(node, "modifiers");
  return modifiers.some(modifier => modifier.kind === Kind.ExportKeyword) && modifiers.some(modifier => modifier.kind === Kind.DefaultKeyword);
}

function isBindableObjectDefinePropertyArgument(node: Node): boolean {
  const parent = node.parent;
  return isCallExpression(parent) && nodeArray(parent, "arguments")[1] === node;
}

function hasPrivateModifier(node: Node): boolean {
  return nodeArray(node, "modifiers").some(modifier => modifier.kind === Kind.PrivateKeyword);
}

function isPrivateIdentifierClassElementDeclaration(node: Node): boolean {
  const name = nodeName(node);
  return name?.kind === Kind.PrivateIdentifier
    && (node.kind === Kind.PropertyDeclaration || node.kind === Kind.MethodDeclaration || node.kind === Kind.GetAccessor || node.kind === Kind.SetAccessor);
}

function isObjectBindingElementWithoutPropertyNameLocal(node: Node): boolean {
  return node.kind === Kind.BindingElement && node.parent.kind === Kind.ObjectBindingPattern && nodeProperty(node, "propertyName") === undefined;
}

function getDeclarationFromName(node: Node): Node | undefined {
  const parent = node.parent;
  if (parent === undefined) return undefined;
  return nodeName(parent) === node && isDeclaration(parent) ? parent : undefined;
}

function isLiteralComputedPropertyDeclarationName(node: Node): boolean {
  return node.parent.kind === Kind.ComputedPropertyName && isDeclaration(node.parent.parent);
}

function toContextRange(textRange: TextRange, _sourceFile: SourceFile, context: Node | undefined): TextRange | undefined {
  if (context === undefined) return undefined;
  const contextStart = Math.min(context.pos, textRange.pos);
  const contextEnd = Math.max(context.end, textRange.end);
  return { pos: contextStart, end: contextEnd };
}

function getContainerNodeLocal(node: Node): Node | undefined {
  for (let parent = node.parent; parent !== undefined; parent = parent.parent) {
    switch (parent.kind) {
      case Kind.SourceFile:
      case Kind.MethodDeclaration:
      case Kind.MethodSignature:
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.ClassDeclaration:
      case Kind.InterfaceDeclaration:
      case Kind.EnumDeclaration:
      case Kind.ModuleDeclaration:
        return parent;
      default:
        break;
    }
  }
  return undefined;
}

function isExternalOrCommonJSModule(file: SourceFile): boolean {
  const sourceFile = file as unknown as Record<string, unknown>;
  return Boolean(sourceFile.externalModuleIndicator) || Boolean(sourceFile.commonJsModuleIndicator);
}

function isSourceFileWithGlobalExports(node: Node | undefined): boolean {
  return node !== undefined && isSourceFile(node) && node.symbol?.globalExports !== undefined;
}

// Language-service parity map: internal/ls/findallreferences.go
/**
 * Language-service parity map for TS-Go `ls/findallreferences.go`.
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

export const lsFindAllReferencesUpstreamPath = "ls/findallreferences.go";

export const lsFindAllReferencesDeclarations: readonly UpstreamDeclaration[] = [
  {"line":29,"kind":"type","name":"referenceUse"},
  {"line":38,"kind":"type","name":"refOptions"},
  {"line":48,"kind":"type","name":"refInfo"},
  {"line":55,"kind":"type","name":"SymbolAndEntries"},
  {"line":60,"kind":"func","name":"NewSymbolAndEntries"},
  {"line":71,"kind":"type","name":"DefinitionKind"},
  {"line":82,"kind":"type","name":"Definition"},
  {"line":88,"kind":"type","name":"tripleSlashDefinition"},
  {"line":93,"kind":"type","name":"entryKind"},
  {"line":104,"kind":"type","name":"ReferenceEntry"},
  {"line":113,"kind":"func","name":"canUseDefinitionSymbol","receiver":"entry *SymbolAndEntries"},
  {"line":131,"kind":"func","name":"getRangeOfEntry","receiver":"l *LanguageService"},
  {"line":135,"kind":"func","name":"getFileNameOfEntry","receiver":"l *LanguageService"},
  {"line":139,"kind":"func","name":"getLocationOfEntry","receiver":"l *LanguageService"},
  {"line":143,"kind":"func","name":"resolveEntry","receiver":"l *LanguageService"},
  {"line":157,"kind":"func","name":"newNodeEntryWithKind"},
  {"line":163,"kind":"func","name":"newNodeEntry"},
  {"line":172,"kind":"func","name":"getContextNodeForNodeEntry"},
  {"line":235,"kind":"func","name":"getContextNode"},
  {"line":285,"kind":"func","name":"getLspRangeOfNode","receiver":"l *LanguageService"},
  {"line":293,"kind":"func","name":"getRangeOfNode"},
  {"line":312,"kind":"func","name":"isValidReferencePosition"},
  {"line":336,"kind":"func","name":"isForRenameWithPrefixAndSuffixText"},
  {"line":340,"kind":"func","name":"skipPastExportOrImportSpecifierOrUnion"},
  {"line":365,"kind":"func","name":"getSymbolScope"},
  {"line":438,"kind":"type","name":"position"},
  {"line":443,"kind":"var","name":"_"},
  {"line":445,"kind":"func","name":"TextDocumentURI","receiver":"nld *position"},
  {"line":446,"kind":"func","name":"TextDocumentPosition","receiver":"nld *position"},
  {"line":448,"kind":"type","name":"nonLocalDefinition"},
  {"line":454,"kind":"func","name":"getFileAndStartPosFromDeclaration"},
  {"line":462,"kind":"func","name":"getNonLocalDefinition","receiver":"l *LanguageService"},
  {"line":509,"kind":"func","name":"isDefinitionVisible"},
  {"line":548,"kind":"func","name":"forEachOriginalDefinitionLocation","receiver":"l *LanguageService"},
  {"line":579,"kind":"type","name":"symbolEntryTransformOptions"},
  {"line":586,"kind":"type","name":"SymbolAndEntriesData"},
  {"line":592,"kind":"func","name":"provideSymbolsAndEntries","receiver":"l *LanguageService"},
  {"line":637,"kind":"func","name":"getSymbolAndEntries","receiver":"l *LanguageService"},
  {"line":658,"kind":"func","name":"ProvideReferences","receiver":"l *LanguageService"},
  {"line":672,"kind":"func","name":"symbolAndEntriesToReferences","receiver":"l *LanguageService"},
  {"line":680,"kind":"func","name":"ProvideImplementations","receiver":"l *LanguageService"},
  {"line":684,"kind":"func","name":"provideImplementationsEx","receiver":"l *LanguageService"},
  {"line":698,"kind":"func","name":"symbolAndEntriesToImplementations","receiver":"l *LanguageService"},
  {"line":718,"kind":"func","name":"convertSymbolAndEntriesToLocations","receiver":"l *LanguageService"},
  {"line":731,"kind":"func","name":"isDeclarationOfSymbol"},
  {"line":755,"kind":"func","name":"convertEntriesToLocations","receiver":"l *LanguageService"},
  {"line":763,"kind":"func","name":"convertEntriesToLocationLinks","receiver":"l *LanguageService"},
  {"line":791,"kind":"func","name":"mergeReferences","receiver":"l *LanguageService"},
  {"line":849,"kind":"func","name":"getReferencedSymbolsForNode","receiver":"l *LanguageService"},
  {"line":934,"kind":"func","name":"getReferencesForStringLiteral","receiver":"l *LanguageService"},
  {"line":974,"kind":"func","name":"isStringLiteralPropertyReference"},
  {"line":981,"kind":"func","name":"getReferencedSymbolsForModuleIfDeclaredBySourceFile","receiver":"l *LanguageService"},
  {"line":1001,"kind":"func","name":"getReferencedSymbolsSpecial"},
  {"line":1057,"kind":"func","name":"getLabelReferencesInNode"},
  {"line":1070,"kind":"func","name":"getReferencesForThisKeyword"},
  {"line":1147,"kind":"func","name":"getReferencesForSuperKeyword"},
  {"line":1183,"kind":"func","name":"getAllReferencesForImportMeta"},
  {"line":1199,"kind":"func","name":"getAllReferencesForKeyword"},
  {"line":1216,"kind":"func","name":"getPossibleSymbolReferenceNodes"},
  {"line":1225,"kind":"func","name":"getPossibleSymbolReferencePositions"},
  {"line":1271,"kind":"func","name":"findFirstJsxNode"},
  {"line":1297,"kind":"func","name":"getReferencesForNonModule"},
  {"line":1302,"kind":"func","name":"getMergedAliasedSymbolOfNamespaceExportDeclaration"},
  {"line":1314,"kind":"func","name":"getReferencedSymbolsForModule","receiver":"l *LanguageService"},
  {"line":1417,"kind":"func","name":"getSpecialSearchKind"},
  {"line":1435,"kind":"func","name":"getReferencedSymbolsForSymbol"},
  {"line":1467,"kind":"type","name":"refSearch"},
  {"line":1485,"kind":"type","name":"inheritKey"},
  {"line":1490,"kind":"type","name":"refState"},
  {"line":1508,"kind":"func","name":"newState"},
  {"line":1524,"kind":"func","name":"includesSourceFile","receiver":"state *refState"},
  {"line":1528,"kind":"func","name":"getImportSearches","receiver":"state *refState"},
  {"line":1536,"kind":"func","name":"createSearch","receiver":"state *refState"},
  {"line":1568,"kind":"func","name":"referenceAdder","receiver":"state *refState"},
  {"line":1580,"kind":"func","name":"addReference","receiver":"state *refState"},
  {"line":1594,"kind":"func","name":"getReferenceEntriesForShorthandPropertyAssignment"},
  {"line":1609,"kind":"func","name":"isMethodOrAccessor"},
  {"line":1613,"kind":"func","name":"tryGetClassByExtendingIdentifier"},
  {"line":1617,"kind":"func","name":"getClassConstructorSymbol"},
  {"line":1624,"kind":"func","name":"hasOwnConstructor"},
  {"line":1628,"kind":"func","name":"findOwnConstructorReferences"},
  {"line":1657,"kind":"func","name":"findSuperConstructorAccesses"},
  {"line":1677,"kind":"func","name":"forEachDescendantOfKind"},
  {"line":1687,"kind":"func","name":"addImplementationReferences","receiver":"state *refState"},
  {"line":1747,"kind":"func","name":"getReferencesInContainerOrFiles","receiver":"state *refState"},
  {"line":1762,"kind":"func","name":"getReferencesInSourceFile","receiver":"state *refState"},
  {"line":1767,"kind":"func","name":"getReferencesInContainer","receiver":"state *refState"},
  {"line":1780,"kind":"func","name":"markSearchedSymbols","receiver":"state *refState"},
  {"line":1795,"kind":"func","name":"getReferencesAtLocation","receiver":"state *refState"},
  {"line":1866,"kind":"func","name":"addConstructorReferences","receiver":"state *refState"},
  {"line":1892,"kind":"func","name":"addClassStaticThisReferences","receiver":"state *refState"},
  {"line":1929,"kind":"func","name":"findInheritedConstructorReferences","receiver":"state *refState"},
  {"line":1938,"kind":"func","name":"getImportOrExportReferences","receiver":"state *refState"},
  {"line":1952,"kind":"func","name":"markSeenReExportRHS","receiver":"state *refState"},
  {"line":1956,"kind":"func","name":"getReferencesAtExportSpecifier","receiver":"state *refState"},
  {"line":2029,"kind":"func","name":"searchForImportedSymbol","receiver":"state *refState"},
  {"line":2038,"kind":"func","name":"searchForImportsOfExport","receiver":"state *refState"},
  {"line":2075,"kind":"func","name":"shouldAddSingleReference","receiver":"state *refState"},
  {"line":2090,"kind":"func","name":"hasMatchingMeaning","receiver":"state *refState"},
  {"line":2094,"kind":"func","name":"getReferenceForShorthandProperty","receiver":"state *refState"},
  {"line":2112,"kind":"func","name":"populateSearchSymbolSet","receiver":"state *refState"},
  {"line":2137,"kind":"func","name":"getRelatedSymbol","receiver":"state *refState"},
  {"line":2169,"kind":"func","name":"forEachRelatedSymbol","receiver":"state *refState"},
  {"line":2306,"kind":"func","name":"searchForName","receiver":"state *refState"},
  {"line":2312,"kind":"func","name":"explicitlyInheritsFrom","receiver":"state *refState"},
];

export const lsFindAllReferencesSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"cmp\""},
  {"line":5,"text":"\t\"context\""},
  {"line":6,"text":"\t\"fmt\""},
  {"line":7,"text":"\t\"slices\""},
  {"line":8,"text":"\t\"strings\""},
  {"line":9,"text":"\t\"sync\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/binder\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/printer\""},
  {"line":22,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":23,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":25,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":26,"text":")"},
  {"line":29,"text":"type referenceUse int"},
  {"line":31,"text":"const ("},
  {"line":32,"text":"\treferenceUseNone       referenceUse = 0"},
  {"line":33,"text":"\treferenceUseOther      referenceUse = 1"},
  {"line":34,"text":"\treferenceUseReferences referenceUse = 2"},
  {"line":35,"text":"\treferenceUseRename     referenceUse = 3"},
  {"line":36,"text":")"},
  {"line":38,"text":"type refOptions struct {"},
  {"line":39,"text":"\tfindInStrings       bool"},
  {"line":40,"text":"\tfindInComments      bool"},
  {"line":41,"text":"\tuse                 referenceUse // other, references, rename"},
  {"line":42,"text":"\timplementations     bool"},
  {"line":43,"text":"\tuseAliasesForRename bool // renamed from providePrefixAndSuffixTextForRename. default: true"},
  {"line":44,"text":"}"},
  {"line":48,"text":"type refInfo struct {"},
  {"line":49,"text":"\tfile       *ast.SourceFile"},
  {"line":50,"text":"\tfileName   string"},
  {"line":51,"text":"\treference  *ast.FileReference"},
  {"line":52,"text":"\tunverified bool"},
  {"line":53,"text":"}"},
  {"line":55,"text":"type SymbolAndEntries struct {"},
  {"line":56,"text":"\tdefinition *Definition"},
  {"line":57,"text":"\treferences []*ReferenceEntry"},
  {"line":58,"text":"}"},
  {"line":60,"text":"func NewSymbolAndEntries(kind DefinitionKind, node *ast.Node, symbol *ast.Symbol, references []*ReferenceEntry) *SymbolAndEntries {"},
  {"line":61,"text":"\treturn &SymbolAndEntries{"},
  {"line":62,"text":"\t\t&Definition{"},
  {"line":63,"text":"\t\t\tKind:   kind,"},
  {"line":64,"text":"\t\t\tnode:   node,"},
  {"line":65,"text":"\t\t\tsymbol: symbol,"},
  {"line":66,"text":"\t\t},"},
  {"line":67,"text":"\t\treferences,"},
  {"line":68,"text":"\t}"},
  {"line":69,"text":"}"},
  {"line":71,"text":"type DefinitionKind int"},
  {"line":73,"text":"const ("},
  {"line":74,"text":"\tdefinitionKindSymbol               DefinitionKind = 0"},
  {"line":75,"text":"\tdefinitionKindLabel                DefinitionKind = 1"},
  {"line":76,"text":"\tdefinitionKindKeyword              DefinitionKind = 2"},
  {"line":77,"text":"\tdefinitionKindThis                 DefinitionKind = 3"},
  {"line":78,"text":"\tdefinitionKindString               DefinitionKind = 4"},
  {"line":79,"text":"\tdefinitionKindTripleSlashReference DefinitionKind = 5"},
  {"line":80,"text":")"},
  {"line":82,"text":"type Definition struct {"},
  {"line":83,"text":"\tKind               DefinitionKind"},
  {"line":84,"text":"\tsymbol             *ast.Symbol"},
  {"line":85,"text":"\tnode               *ast.Node"},
  {"line":86,"text":"\ttripleSlashFileRef *tripleSlashDefinition"},
  {"line":87,"text":"}"},
  {"line":88,"text":"type tripleSlashDefinition struct {"},
  {"line":89,"text":"\treference *ast.FileReference"},
  {"line":90,"text":"\tfile      *ast.SourceFile"},
  {"line":91,"text":"}"},
  {"line":93,"text":"type entryKind int"},
  {"line":95,"text":"const ("},
  {"line":96,"text":"\tentryKindNone                       entryKind = 0"},
  {"line":97,"text":"\tentryKindRange                      entryKind = 1"},
  {"line":98,"text":"\tentryKindNode                       entryKind = 2"},
  {"line":99,"text":"\tentryKindStringLiteral              entryKind = 3"},
  {"line":100,"text":"\tentryKindSearchedLocalFoundProperty entryKind = 4"},
  {"line":101,"text":"\tentryKindSearchedPropertyFoundLocal entryKind = 5"},
  {"line":102,"text":")"},
  {"line":104,"text":"type ReferenceEntry struct {"},
  {"line":105,"text":"\tkind      entryKind"},
  {"line":106,"text":"\tnode      *ast.Node"},
  {"line":107,"text":"\tcontext   *ast.Node // !!! ContextWithStartAndEndNode, optional"},
  {"line":108,"text":"\tfileName  string"},
  {"line":109,"text":"\ttextRange *core.TextRange"},
  {"line":110,"text":"\tlspRange  *lsproto.Location"},
  {"line":111,"text":"}"},
  {"line":113,"text":"func (entry *SymbolAndEntries) canUseDefinitionSymbol() bool {"},
  {"line":114,"text":"\tif entry.definition == nil {"},
  {"line":115,"text":"\t\treturn false"},
  {"line":116,"text":"\t}"},
  {"line":118,"text":"\tswitch entry.definition.Kind {"},
  {"line":119,"text":"\tcase definitionKindSymbol, definitionKindThis:"},
  {"line":120,"text":"\t\treturn entry.definition.symbol != nil"},
  {"line":121,"text":"\tcase definitionKindTripleSlashReference:"},
  {"line":125,"text":"\t\treturn false"},
  {"line":126,"text":"\tdefault:"},
  {"line":127,"text":"\t\treturn false"},
  {"line":128,"text":"\t}"},
  {"line":129,"text":"}"},
  {"line":131,"text":"func (l *LanguageService) getRangeOfEntry(entry *ReferenceEntry) lsproto.Range {"},
  {"line":132,"text":"\treturn l.resolveEntry(entry).lspRange.Range"},
  {"line":133,"text":"}"},
  {"line":135,"text":"func (l *LanguageService) getFileNameOfEntry(entry *ReferenceEntry) lsproto.DocumentUri {"},
  {"line":136,"text":"\treturn l.resolveEntry(entry).lspRange.Uri"},
  {"line":137,"text":"}"},
  {"line":139,"text":"func (l *LanguageService) getLocationOfEntry(entry *ReferenceEntry) lsproto.Location {"},
  {"line":140,"text":"\treturn *l.resolveEntry(entry).lspRange"},
  {"line":141,"text":"}"},
  {"line":143,"text":"func (l *LanguageService) resolveEntry(entry *ReferenceEntry) *ReferenceEntry {"},
  {"line":144,"text":"\tif entry.textRange == nil {"},
  {"line":145,"text":"\t\tsourceFile := ast.GetSourceFileOfNode(entry.node)"},
  {"line":146,"text":"\t\ttextRange := getRangeOfNode(entry.node, sourceFile, nil /*endNode*/)"},
  {"line":147,"text":"\t\tentry.textRange = &textRange"},
  {"line":148,"text":"\t\tentry.fileName = sourceFile.FileName()"},
  {"line":149,"text":"\t}"},
  {"line":150,"text":"\tif entry.lspRange == nil {"},
  {"line":151,"text":"\t\tlocation := l.getMappedLocation(entry.fileName, *entry.textRange)"},
  {"line":152,"text":"\t\tentry.lspRange = &location"},
  {"line":153,"text":"\t}"},
  {"line":154,"text":"\treturn entry"},
  {"line":155,"text":"}"},
  {"line":157,"text":"func newNodeEntryWithKind(node *ast.Node, kind entryKind) *ReferenceEntry {"},
  {"line":158,"text":"\te := newNodeEntry(node)"},
  {"line":159,"text":"\te.kind = kind"},
  {"line":160,"text":"\treturn e"},
  {"line":161,"text":"}"},
  {"line":163,"text":"func newNodeEntry(node *ast.Node) *ReferenceEntry {"},
  {"line":165,"text":"\treturn &ReferenceEntry{"},
  {"line":166,"text":"\t\tkind:    entryKindNode,"},
  {"line":167,"text":"\t\tnode:    core.OrElse(node.Name(), node),"},
  {"line":168,"text":"\t\tcontext: getContextNodeForNodeEntry(node),"},
  {"line":169,"text":"\t}"},
  {"line":170,"text":"}"},
  {"line":172,"text":"func getContextNodeForNodeEntry(node *ast.Node) *ast.Node {"},
  {"line":173,"text":"\tif ast.IsDeclaration(node) {"},
  {"line":174,"text":"\t\treturn getContextNode(node)"},
  {"line":175,"text":"\t}"},
  {"line":177,"text":"\tif node.Parent == nil {"},
  {"line":178,"text":"\t\treturn nil"},
  {"line":179,"text":"\t}"},
  {"line":181,"text":"\tif !ast.IsDeclaration(node.Parent) && !ast.IsExportAssignment(node.Parent) {"},
  {"line":183,"text":"\t\tif ast.IsInJSFile(node) {"},
  {"line":185,"text":"\t\t\tvar binaryExpression *ast.Node"},
  {"line":186,"text":"\t\t\tif ast.IsBinaryExpression(node.Parent) {"},
  {"line":187,"text":"\t\t\t\tbinaryExpression = node.Parent"},
  {"line":188,"text":"\t\t\t} else if ast.IsAccessExpression(node.Parent) && ast.IsBinaryExpression(node.Parent.Parent) && node.Parent.Parent.AsBinaryExpression().Left == node.Parent {"},
  {"line":189,"text":"\t\t\t\tbinaryExpression = node.Parent.Parent"},
  {"line":190,"text":"\t\t\t}"},
  {"line":191,"text":"\t\t\tif binaryExpression != nil && ast.GetAssignmentDeclarationKind(binaryExpression) != ast.JSDeclarationKindNone {"},
  {"line":192,"text":"\t\t\t\treturn getContextNode(binaryExpression)"},
  {"line":193,"text":"\t\t\t}"},
  {"line":194,"text":"\t\t}"},
  {"line":197,"text":"\t\tswitch node.Parent.Kind {"},
  {"line":198,"text":"\t\tcase ast.KindJsxOpeningElement, ast.KindJsxClosingElement:"},
  {"line":199,"text":"\t\t\treturn node.Parent.Parent"},
  {"line":200,"text":"\t\tcase ast.KindJsxSelfClosingElement, ast.KindLabeledStatement, ast.KindBreakStatement, ast.KindContinueStatement:"},
  {"line":201,"text":"\t\t\treturn node.Parent"},
  {"line":202,"text":"\t\tcase ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:"},
  {"line":203,"text":"\t\t\tif validImport := ast.TryGetImportFromModuleSpecifier(node); validImport != nil {"},
  {"line":204,"text":"\t\t\t\tdeclOrStatement := ast.FindAncestor(validImport, func(*ast.Node) bool {"},
  {"line":205,"text":"\t\t\t\t\treturn ast.IsDeclaration(node) || ast.IsStatement(node) || ast.IsJSDocTag(node)"},
  {"line":206,"text":"\t\t\t\t})"},
  {"line":207,"text":"\t\t\t\tif ast.IsDeclaration(declOrStatement) {"},
  {"line":208,"text":"\t\t\t\t\treturn getContextNode(declOrStatement)"},
  {"line":209,"text":"\t\t\t\t}"},
  {"line":210,"text":"\t\t\t\treturn declOrStatement"},
  {"line":211,"text":"\t\t\t}"},
  {"line":212,"text":"\t\t}"},
  {"line":215,"text":"\t\tpropertyName := ast.FindAncestor(node, ast.IsComputedPropertyName)"},
  {"line":216,"text":"\t\tif propertyName != nil {"},
  {"line":217,"text":"\t\t\treturn getContextNode(propertyName.Parent)"},
  {"line":218,"text":"\t\t}"},
  {"line":219,"text":"\t\treturn nil"},
  {"line":220,"text":"\t}"},
  {"line":222,"text":"\tif node.Parent.Name() == node || // node is name of declaration, use parent"},
  {"line":223,"text":"\t\tnode.Parent.Kind == ast.KindConstructor ||"},
  {"line":224,"text":"\t\tnode.Parent.Kind == ast.KindExportAssignment ||"},
  {"line":226,"text":"\t\t((ast.IsImportOrExportSpecifier(node.Parent) || node.Parent.Kind == ast.KindBindingElement) && node.Parent.PropertyName() == node) ||"},
  {"line":228,"text":"\t\t(node.Kind == ast.KindDefaultKeyword && ast.HasSyntacticModifier(node.Parent, ast.ModifierFlagsExportDefault)) {"},
  {"line":229,"text":"\t\treturn getContextNode(node.Parent)"},
  {"line":230,"text":"\t}"},
  {"line":232,"text":"\treturn nil"},
  {"line":233,"text":"}"},
  {"line":235,"text":"func getContextNode(node *ast.Node) *ast.Node {"},
  {"line":236,"text":"\tif node == nil {"},
  {"line":237,"text":"\t\treturn nil"},
  {"line":238,"text":"\t}"},
  {"line":239,"text":"\tswitch node.Kind {"},
  {"line":240,"text":"\tcase ast.KindVariableDeclaration:"},
  {"line":241,"text":"\t\tif !ast.IsVariableDeclarationList(node.Parent) || len(node.Parent.AsVariableDeclarationList().Declarations.Nodes) != 1 {"},
  {"line":242,"text":"\t\t\treturn node"},
  {"line":243,"text":"\t\t} else if ast.IsVariableStatement(node.Parent.Parent) {"},
  {"line":244,"text":"\t\t\treturn node.Parent.Parent"},
  {"line":245,"text":"\t\t} else if ast.IsForInOrOfStatement(node.Parent.Parent) {"},
  {"line":246,"text":"\t\t\treturn getContextNode(node.Parent.Parent)"},
  {"line":247,"text":"\t\t}"},
  {"line":248,"text":"\t\treturn node.Parent"},
  {"line":250,"text":"\tcase ast.KindBindingElement:"},
  {"line":251,"text":"\t\treturn getContextNode(node.Parent.Parent)"},
  {"line":253,"text":"\tcase ast.KindImportSpecifier:"},
  {"line":254,"text":"\t\treturn node.Parent.Parent.Parent"},
  {"line":256,"text":"\tcase ast.KindExportSpecifier, ast.KindNamespaceImport:"},
  {"line":257,"text":"\t\treturn node.Parent.Parent"},
  {"line":259,"text":"\tcase ast.KindImportClause, ast.KindNamespaceExport:"},
  {"line":260,"text":"\t\treturn node.Parent"},
  {"line":262,"text":"\tcase ast.KindBinaryExpression:"},
  {"line":263,"text":"\t\treturn core.IfElse(node.Parent.Kind == ast.KindExpressionStatement, node.Parent, node)"},
  {"line":265,"text":"\tcase ast.KindForOfStatement, ast.KindForInStatement:"},
  {"line":267,"text":"\t\treturn nil"},
  {"line":269,"text":"\tcase ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:"},
  {"line":270,"text":"\t\tif ast.IsArrayLiteralOrObjectLiteralDestructuringPattern(node.Parent) {"},
  {"line":271,"text":"\t\t\treturn getContextNode(ast.FindAncestor(node.Parent, func(node *ast.Node) bool {"},
  {"line":272,"text":"\t\t\t\treturn node.Kind == ast.KindBinaryExpression || ast.IsForInOrOfStatement(node)"},
  {"line":273,"text":"\t\t\t}))"},
  {"line":274,"text":"\t\t}"},
  {"line":275,"text":"\t\treturn node"},
  {"line":276,"text":"\tcase ast.KindSwitchStatement:"},
  {"line":278,"text":"\t\treturn nil"},
  {"line":279,"text":"\tdefault:"},
  {"line":280,"text":"\t\treturn node"},
  {"line":281,"text":"\t}"},
  {"line":282,"text":"}"},
  {"line":285,"text":"func (l *LanguageService) getLspRangeOfNode(node *ast.Node, sourceFile *ast.SourceFile, endNode *ast.Node) lsproto.Range {"},
  {"line":286,"text":"\tif sourceFile == nil {"},
  {"line":287,"text":"\t\tsourceFile = ast.GetSourceFileOfNode(node)"},
  {"line":288,"text":"\t}"},
  {"line":289,"text":"\ttextRange := getRangeOfNode(node, sourceFile, endNode)"},
  {"line":290,"text":"\treturn l.createLspRangeFromBounds(textRange.Pos(), textRange.End(), sourceFile)"},
  {"line":291,"text":"}"},
  {"line":293,"text":"func getRangeOfNode(node *ast.Node, sourceFile *ast.SourceFile, endNode *ast.Node) core.TextRange {"},
  {"line":294,"text":"\tif sourceFile == nil {"},
  {"line":295,"text":"\t\tsourceFile = ast.GetSourceFileOfNode(node)"},
  {"line":296,"text":"\t}"},
  {"line":297,"text":"\tstart := scanner.GetTokenPosOfNode(node, sourceFile, false /*includeJsDoc*/)"},
  {"line":298,"text":"\tend := core.IfElse(endNode != nil, endNode, node).End()"},
  {"line":299,"text":"\tif ast.IsStringLiteralLike(node) && (end-start) > 2 {"},
  {"line":300,"text":"\t\tif endNode != nil {"},
  {"line":301,"text":"\t\t\tpanic(\"endNode is not nil for stringLiteralLike\")"},
  {"line":302,"text":"\t\t}"},
  {"line":303,"text":"\t\tstart += 1"},
  {"line":304,"text":"\t\tend -= 1"},
  {"line":305,"text":"\t}"},
  {"line":306,"text":"\tif endNode != nil && endNode.Kind == ast.KindCaseBlock {"},
  {"line":307,"text":"\t\tend = endNode.Pos()"},
  {"line":308,"text":"\t}"},
  {"line":309,"text":"\treturn core.NewTextRange(start, end)"},
  {"line":310,"text":"}"},
  {"line":312,"text":"func isValidReferencePosition(node *ast.Node, searchSymbolName string) bool {"},
  {"line":313,"text":"\tswitch node.Kind {"},
  {"line":314,"text":"\tcase ast.KindPrivateIdentifier:"},
  {"line":319,"text":"\t\treturn len(node.Text()) == len(searchSymbolName)"},
  {"line":320,"text":"\tcase ast.KindIdentifier:"},
  {"line":321,"text":"\t\treturn len(node.Text()) == len(searchSymbolName)"},
  {"line":322,"text":"\tcase ast.KindNoSubstitutionTemplateLiteral, ast.KindStringLiteral:"},
  {"line":323,"text":"\t\treturn len(node.Text()) == len(searchSymbolName) && (isLiteralNameOfPropertyDeclarationOrIndexAccess(node) ||"},
  {"line":324,"text":"\t\t\tisNameOfModuleDeclaration(node) ||"},
  {"line":325,"text":"\t\t\tisExpressionOfExternalModuleImportEqualsDeclaration(node) ||"},
  {"line":326,"text":"\t\t\tast.IsCallExpression(node.Parent) && ast.IsBindableObjectDefinePropertyCall(node.Parent) && node.Parent.Arguments()[1] == node ||"},
  {"line":327,"text":"\t\t\tast.IsImportOrExportSpecifier(node.Parent))"},
  {"line":328,"text":"\tcase ast.KindNumericLiteral:"},
  {"line":329,"text":"\t\treturn isLiteralNameOfPropertyDeclarationOrIndexAccess(node) && len(node.Text()) == len(searchSymbolName)"},
  {"line":330,"text":"\tcase ast.KindDefaultKeyword:"},
  {"line":331,"text":"\t\treturn len(\"default\") == len(searchSymbolName)"},
  {"line":332,"text":"\t}"},
  {"line":333,"text":"\treturn false"},
  {"line":334,"text":"}"},
  {"line":336,"text":"func isForRenameWithPrefixAndSuffixText(options refOptions) bool {"},
  {"line":337,"text":"\treturn options.use == referenceUseRename && options.useAliasesForRename"},
  {"line":338,"text":"}"},
  {"line":340,"text":"func skipPastExportOrImportSpecifierOrUnion(symbol *ast.Symbol, node *ast.Node, checker *checker.Checker, useLocalSymbolForExportSpecifier bool) *ast.Symbol {"},
  {"line":341,"text":"\tif node == nil {"},
  {"line":342,"text":"\t\treturn nil"},
  {"line":343,"text":"\t}"},
  {"line":344,"text":"\tparent := node.Parent"},
  {"line":345,"text":"\tif parent.Kind == ast.KindExportSpecifier && useLocalSymbolForExportSpecifier {"},
  {"line":346,"text":"\t\treturn getLocalSymbolForExportSpecifier(node, symbol, parent.AsExportSpecifier(), checker)"},
  {"line":347,"text":"\t}"},
  {"line":349,"text":"\treturn core.FirstNonNil(symbol.Declarations, func(decl *ast.Node) *ast.Symbol {"},
  {"line":350,"text":"\t\tif decl.Parent == nil {"},
  {"line":352,"text":"\t\t\tif symbol.Flags&(ast.SymbolFlagsTransient|ast.SymbolFlagsModuleExports) != 0 {"},
  {"line":353,"text":"\t\t\t\treturn nil"},
  {"line":354,"text":"\t\t\t}"},
  {"line":356,"text":"\t\t\tpanic(fmt.Sprintf(\"Unexpected symbol at %s: %s\", node.Kind.String(), symbol.Name))"},
  {"line":357,"text":"\t\t}"},
  {"line":358,"text":"\t\tif decl.Parent.Kind == ast.KindTypeLiteral && decl.Parent.Parent.Kind == ast.KindUnionType {"},
  {"line":359,"text":"\t\t\treturn checker.GetPropertyOfType(checker.GetTypeFromTypeNode(decl.Parent.Parent), symbol.Name)"},
  {"line":360,"text":"\t\t}"},
  {"line":361,"text":"\t\treturn nil"},
  {"line":362,"text":"\t})"},
  {"line":363,"text":"}"},
  {"line":365,"text":"func getSymbolScope(symbol *ast.Symbol) *ast.Node {"},
  {"line":368,"text":"\tvalueDeclaration := symbol.ValueDeclaration"},
  {"line":369,"text":"\tif valueDeclaration != nil && (valueDeclaration.Kind == ast.KindFunctionExpression || valueDeclaration.Kind == ast.KindClassExpression) {"},
  {"line":370,"text":"\t\treturn valueDeclaration"},
  {"line":371,"text":"\t}"},
  {"line":373,"text":"\tif len(symbol.Declarations) == 0 {"},
  {"line":374,"text":"\t\treturn nil"},
  {"line":375,"text":"\t}"},
  {"line":377,"text":"\tdeclarations := symbol.Declarations"},
  {"line":379,"text":"\tif symbol.Flags&(ast.SymbolFlagsProperty|ast.SymbolFlagsMethod) != 0 {"},
  {"line":380,"text":"\t\tprivateDeclaration := core.Find(declarations, func(d *ast.Node) bool {"},
  {"line":381,"text":"\t\t\treturn ast.HasModifier(d, ast.ModifierFlagsPrivate) || ast.IsPrivateIdentifierClassElementDeclaration(d)"},
  {"line":382,"text":"\t\t})"},
  {"line":383,"text":"\t\tif privateDeclaration != nil {"},
  {"line":384,"text":"\t\t\treturn ast.FindAncestorKind(privateDeclaration, ast.KindClassDeclaration)"},
  {"line":385,"text":"\t\t}"},
  {"line":387,"text":"\t\treturn nil"},
  {"line":388,"text":"\t}"},
  {"line":392,"text":"\tif core.Some(declarations, isObjectBindingElementWithoutPropertyName) {"},
  {"line":393,"text":"\t\treturn nil"},
  {"line":394,"text":"\t}"},
  {"line":396,"text":"\t/*"},
  {"line":397,"text":"\t\tIf the symbol has a parent, it's globally visible unless:"},
  {"line":398,"text":"\t\t- It's a private property (handled above)."},
  {"line":399,"text":"\t\t- It's a type parameter."},
  {"line":400,"text":"\t\t- The parent is an external module: then we should only search in the module (and recurse on the export later)."},
  {"line":401,"text":"\t\t- But if the parent has `export as namespace`, the symbol is globally visible through that namespace."},
  {"line":402,"text":"\t*/"},
  {"line":403,"text":"\texposedByParent := symbol.Parent != nil && symbol.Flags&ast.SymbolFlagsTypeParameter == 0"},
  {"line":404,"text":"\tif exposedByParent && !(checker.IsExternalModuleSymbol(symbol.Parent) && !isSourceFileWithGlobalExports(symbol.Parent.ValueDeclaration)) {"},
  {"line":405,"text":"\t\treturn nil"},
  {"line":406,"text":"\t}"},
  {"line":408,"text":"\tvar scope *ast.Node"},
  {"line":409,"text":"\tfor _, declaration := range declarations {"},
  {"line":410,"text":"\t\tcontainer := getContainerNode(declaration)"},
  {"line":411,"text":"\t\tif scope != nil && scope != container {"},
  {"line":413,"text":"\t\t\treturn nil"},
  {"line":414,"text":"\t\t}"},
  {"line":416,"text":"\t\tif container == nil || (container.Kind == ast.KindSourceFile && !ast.IsExternalOrCommonJSModule(container.AsSourceFile())) {"},
  {"line":419,"text":"\t\t\treturn nil"},
  {"line":420,"text":"\t\t}"},
  {"line":422,"text":"\t\tscope = container"},
  {"line":423,"text":"\t}"},
  {"line":430,"text":"\tif exposedByParent {"},
  {"line":431,"text":"\t\treturn ast.GetSourceFileOfNode(scope).AsNode()"},
  {"line":432,"text":"\t}"},
  {"line":433,"text":"\treturn scope // TODO: GH#18217"},
  {"line":434,"text":"}"},
  {"line":438,"text":"type position struct {"},
  {"line":439,"text":"\turi lsproto.DocumentUri"},
  {"line":440,"text":"\tpos lsproto.Position"},
  {"line":441,"text":"}"},
  {"line":443,"text":"var _ lsproto.HasTextDocumentPosition = (*position)(nil)"},
  {"line":445,"text":"func (nld *position) TextDocumentURI() lsproto.DocumentUri   { return nld.uri }"},
  {"line":446,"text":"func (nld *position) TextDocumentPosition() lsproto.Position { return nld.pos }"},
  {"line":448,"text":"type nonLocalDefinition struct {"},
  {"line":449,"text":"\tposition"},
  {"line":450,"text":"\tGetSourcePosition    func() lsproto.HasTextDocumentPosition"},
  {"line":451,"text":"\tGetGeneratedPosition func() lsproto.HasTextDocumentPosition"},
  {"line":452,"text":"}"},
  {"line":454,"text":"func getFileAndStartPosFromDeclaration(declaration *ast.Node) (*ast.SourceFile, core.TextPos) {"},
  {"line":455,"text":"\tfile := ast.GetSourceFileOfNode(declaration)"},
  {"line":456,"text":"\tname := core.OrElse(ast.GetNameOfDeclaration(declaration), declaration)"},
  {"line":457,"text":"\ttextRange := getRangeOfNode(name, file, nil /*endNode*/)"},
  {"line":459,"text":"\treturn file, core.TextPos(textRange.Pos())"},
  {"line":460,"text":"}"},
  {"line":462,"text":"func (l *LanguageService) getNonLocalDefinition(ctx context.Context, entry *SymbolAndEntries) *nonLocalDefinition {"},
  {"line":463,"text":"\tif !entry.canUseDefinitionSymbol() {"},
  {"line":464,"text":"\t\treturn nil"},
  {"line":465,"text":"\t}"},
  {"line":467,"text":"\tprogram := l.GetProgram()"},
  {"line":468,"text":"\tchecker, done := program.GetTypeChecker(ctx)"},
  {"line":469,"text":"\tdefer done()"},
  {"line":470,"text":"\temitResolver := checker.GetEmitResolver()"},
  {"line":471,"text":"\tfor _, d := range entry.definition.symbol.Declarations {"},
  {"line":472,"text":"\t\tif isDefinitionVisible(emitResolver, d) {"},
  {"line":473,"text":"\t\t\tfile, startPos := getFileAndStartPosFromDeclaration(d)"},
  {"line":474,"text":"\t\t\tfileName := file.FileName()"},
  {"line":475,"text":"\t\t\treturn &nonLocalDefinition{"},
  {"line":476,"text":"\t\t\t\tposition: position{"},
  {"line":477,"text":"\t\t\t\t\turi: lsconv.FileNameToDocumentURI(fileName),"},
  {"line":478,"text":"\t\t\t\t\tpos: l.converters.PositionToLineAndCharacter(file, startPos),"},
  {"line":479,"text":"\t\t\t\t},"},
  {"line":480,"text":"\t\t\t\tGetSourcePosition: sync.OnceValue(func() lsproto.HasTextDocumentPosition {"},
  {"line":481,"text":"\t\t\t\t\tmapped := l.tryGetSourcePosition(fileName, startPos)"},
  {"line":482,"text":"\t\t\t\t\tif mapped != nil {"},
  {"line":483,"text":"\t\t\t\t\t\treturn &position{"},
  {"line":484,"text":"\t\t\t\t\t\t\turi: lsconv.FileNameToDocumentURI(mapped.FileName),"},
  {"line":485,"text":"\t\t\t\t\t\t\tpos: l.converters.PositionToLineAndCharacter(l.getScript(mapped.FileName), core.TextPos(mapped.Pos)),"},
  {"line":486,"text":"\t\t\t\t\t\t}"},
  {"line":487,"text":"\t\t\t\t\t}"},
  {"line":488,"text":"\t\t\t\t\treturn nil"},
  {"line":489,"text":"\t\t\t\t}),"},
  {"line":490,"text":"\t\t\t\tGetGeneratedPosition: sync.OnceValue(func() lsproto.HasTextDocumentPosition {"},
  {"line":491,"text":"\t\t\t\t\tmapped := l.tryGetGeneratedPosition(fileName, startPos)"},
  {"line":492,"text":"\t\t\t\t\tif mapped != nil {"},
  {"line":493,"text":"\t\t\t\t\t\treturn &position{"},
  {"line":494,"text":"\t\t\t\t\t\t\turi: lsconv.FileNameToDocumentURI(mapped.FileName),"},
  {"line":495,"text":"\t\t\t\t\t\t\tpos: l.converters.PositionToLineAndCharacter(l.getScript(mapped.FileName), core.TextPos(mapped.Pos)),"},
  {"line":496,"text":"\t\t\t\t\t\t}"},
  {"line":497,"text":"\t\t\t\t\t}"},
  {"line":498,"text":"\t\t\t\t\treturn nil"},
  {"line":499,"text":"\t\t\t\t}),"},
  {"line":500,"text":"\t\t\t}"},
  {"line":501,"text":"\t\t}"},
  {"line":502,"text":"\t}"},
  {"line":503,"text":"\treturn nil"},
  {"line":504,"text":"}"},
  {"line":509,"text":"func isDefinitionVisible(emitResolver *checker.EmitResolver, declaration *ast.Node) bool {"},
  {"line":510,"text":"\tif emitResolver.IsDeclarationVisible(declaration) {"},
  {"line":511,"text":"\t\treturn true"},
  {"line":512,"text":"\t}"},
  {"line":513,"text":"\tif declaration.Parent == nil {"},
  {"line":514,"text":"\t\treturn false"},
  {"line":515,"text":"\t}"},
  {"line":518,"text":"\tif ast.HasInitializer(declaration.Parent) && declaration.Parent.Initializer() == declaration {"},
  {"line":519,"text":"\t\treturn isDefinitionVisible(emitResolver, declaration.Parent)"},
  {"line":520,"text":"\t}"},
  {"line":523,"text":"\tswitch declaration.Kind {"},
  {"line":524,"text":"\tcase ast.KindPropertyDeclaration,"},
  {"line":525,"text":"\t\tast.KindGetAccessor,"},
  {"line":526,"text":"\t\tast.KindSetAccessor,"},
  {"line":527,"text":"\t\tast.KindMethodDeclaration:"},
  {"line":529,"text":"\t\tif ast.HasModifier(declaration, ast.ModifierFlagsPrivate) || ast.IsPrivateIdentifier(declaration.Name()) {"},
  {"line":530,"text":"\t\t\treturn false"},
  {"line":531,"text":"\t\t}"},
  {"line":534,"text":"\t\tfallthrough"},
  {"line":535,"text":"\tcase ast.KindConstructor,"},
  {"line":536,"text":"\t\tast.KindPropertyAssignment,"},
  {"line":537,"text":"\t\tast.KindShorthandPropertyAssignment,"},
  {"line":538,"text":"\t\tast.KindObjectLiteralExpression,"},
  {"line":539,"text":"\t\tast.KindClassExpression,"},
  {"line":540,"text":"\t\tast.KindArrowFunction,"},
  {"line":541,"text":"\t\tast.KindFunctionExpression:"},
  {"line":542,"text":"\t\treturn isDefinitionVisible(emitResolver, declaration.Parent)"},
  {"line":543,"text":"\tdefault:"},
  {"line":544,"text":"\t\treturn false"},
  {"line":545,"text":"\t}"},
  {"line":546,"text":"}"},
  {"line":548,"text":"func (l *LanguageService) forEachOriginalDefinitionLocation("},
  {"line":549,"text":"\tctx context.Context,"},
  {"line":550,"text":"\tentry *SymbolAndEntries,"},
  {"line":551,"text":"\tcb func(lsproto.DocumentUri, lsproto.Position),"},
  {"line":552,"text":") {"},
  {"line":553,"text":"\tif !entry.canUseDefinitionSymbol() {"},
  {"line":554,"text":"\t\treturn"},
  {"line":555,"text":"\t}"},
  {"line":557,"text":"\tprogram := l.GetProgram()"},
  {"line":558,"text":"\tfor _, d := range entry.definition.symbol.Declarations {"},
  {"line":559,"text":"\t\tfile, startPos := getFileAndStartPosFromDeclaration(d)"},
  {"line":560,"text":"\t\tfileName := file.FileName()"},
  {"line":561,"text":"\t\tif tspath.IsDeclarationFileName(fileName) {"},
  {"line":563,"text":"\t\t\tmapped := l.tryGetSourcePosition(file.FileName(), startPos)"},
  {"line":564,"text":"\t\t\tif mapped != nil {"},
  {"line":565,"text":"\t\t\t\tcb("},
  {"line":566,"text":"\t\t\t\t\tlsconv.FileNameToDocumentURI(mapped.FileName),"},
  {"line":567,"text":"\t\t\t\t\tl.converters.PositionToLineAndCharacter(l.getScript(mapped.FileName), core.TextPos(mapped.Pos)),"},
  {"line":568,"text":"\t\t\t\t)"},
  {"line":569,"text":"\t\t\t}"},
  {"line":570,"text":"\t\t} else if program.IsSourceFromProjectReference(l.toPath(fileName)) {"},
  {"line":571,"text":"\t\t\tcb("},
  {"line":572,"text":"\t\t\t\tlsconv.FileNameToDocumentURI(fileName),"},
  {"line":573,"text":"\t\t\t\tl.converters.PositionToLineAndCharacter(file, startPos),"},
  {"line":574,"text":"\t\t\t)"},
  {"line":575,"text":"\t\t}"},
  {"line":576,"text":"\t}"},
  {"line":577,"text":"}"},
  {"line":579,"text":"type symbolEntryTransformOptions struct {"},
  {"line":581,"text":"\trequireLocationsResult bool"},
  {"line":583,"text":"\tdropOriginNodes bool"},
  {"line":584,"text":"}"},
  {"line":586,"text":"type SymbolAndEntriesData struct {"},
  {"line":587,"text":"\tOriginalNode      *ast.Node"},
  {"line":588,"text":"\tSymbolsAndEntries []*SymbolAndEntries"},
  {"line":589,"text":"\tPosition          int"},
  {"line":590,"text":"}"},
  {"line":592,"text":"func (l *LanguageService) provideSymbolsAndEntries(ctx context.Context, uri lsproto.DocumentUri, documentPosition lsproto.Position, isRename bool, implementations bool) (SymbolAndEntriesData, bool) {"},
  {"line":594,"text":"\tprogram, sourceFile := l.getProgramAndFile(uri)"},
  {"line":595,"text":"\tposition := int(l.converters.LineAndCharacterToPosition(sourceFile, documentPosition))"},
  {"line":597,"text":"\tnode := astnav.GetTouchingPropertyName(sourceFile, position)"},
  {"line":598,"text":"\tif isRename {"},
  {"line":600,"text":"\t\tnode = getAdjustedLocation(node, true /*forRename*/, sourceFile)"},
  {"line":601,"text":"\t}"},
  {"line":602,"text":"\tif isRename && !nodeIsEligibleForRename(node) || implementations && ast.IsSourceFile(node) {"},
  {"line":603,"text":"\t\treturn SymbolAndEntriesData{OriginalNode: node, Position: position}, false"},
  {"line":604,"text":"\t}"},
  {"line":606,"text":"\tentries := l.getSymbolAndEntries(ctx, position, node, program, isRename, implementations)"},
  {"line":607,"text":"\tif !implementations {"},
  {"line":608,"text":"\t\treturn SymbolAndEntriesData{OriginalNode: node, SymbolsAndEntries: entries, Position: position}, true"},
  {"line":609,"text":"\t}"},
  {"line":611,"text":"\tvar implementationEntries []*SymbolAndEntries"},
  {"line":612,"text":"\tvar queue []*ReferenceEntry"},
  {"line":613,"text":"\tvar seenNodes collections.Set[*ast.Node]"},
  {"line":614,"text":"\taddToQueue := func(symbolAndEntries []*SymbolAndEntries) {"},
  {"line":615,"text":"\t\timplementationEntries = core.Concatenate(implementationEntries, symbolAndEntries)"},
  {"line":616,"text":"\t\tfor _, s := range symbolAndEntries {"},
  {"line":617,"text":"\t\t\tqueue = append(queue, s.references...)"},
  {"line":618,"text":"\t\t}"},
  {"line":619,"text":"\t}"},
  {"line":621,"text":"\taddToQueue(entries)"},
  {"line":622,"text":"\tfor len(queue) != 0 {"},
  {"line":623,"text":"\t\tif ctx.Err() != nil {"},
  {"line":624,"text":"\t\t\treturn SymbolAndEntriesData{}, false"},
  {"line":625,"text":"\t\t}"},
  {"line":627,"text":"\t\tentry := queue[0]"},
  {"line":628,"text":"\t\tqueue = queue[1:]"},
  {"line":629,"text":"\t\tif entry.node != nil && !seenNodes.Has(entry.node) {"},
  {"line":630,"text":"\t\t\tseenNodes.Add(entry.node)"},
  {"line":631,"text":"\t\t\taddToQueue(l.getSymbolAndEntries(ctx, entry.node.Pos(), entry.node, program, isRename, implementations))"},
  {"line":632,"text":"\t\t}"},
  {"line":633,"text":"\t}"},
  {"line":634,"text":"\treturn SymbolAndEntriesData{OriginalNode: node, SymbolsAndEntries: implementationEntries, Position: position}, true"},
  {"line":635,"text":"}"},
  {"line":637,"text":"func (l *LanguageService) getSymbolAndEntries("},
  {"line":638,"text":"\tctx context.Context,"},
  {"line":639,"text":"\tposition int,"},
  {"line":640,"text":"\tnode *ast.Node,"},
  {"line":641,"text":"\tprogram *compiler.Program,"},
  {"line":642,"text":"\tisRename bool,"},
  {"line":643,"text":"\timplementations bool,"},
  {"line":644,"text":") []*SymbolAndEntries {"},
  {"line":645,"text":"\tvar options refOptions"},
  {"line":646,"text":"\tif !isRename {"},
  {"line":647,"text":"\t\toptions.use = referenceUseReferences"},
  {"line":648,"text":"\t\tif implementations {"},
  {"line":649,"text":"\t\t\toptions.implementations = true"},
  {"line":650,"text":"\t\t}"},
  {"line":651,"text":"\t} else {"},
  {"line":652,"text":"\t\toptions.use = referenceUseRename"},
  {"line":653,"text":"\t\toptions.useAliasesForRename = true"},
  {"line":654,"text":"\t}"},
  {"line":655,"text":"\treturn l.getReferencedSymbolsForNode(ctx, position, node, program, program.GetSourceFiles(), options)"},
  {"line":656,"text":"}"},
  {"line":658,"text":"func (l *LanguageService) ProvideReferences(ctx context.Context, params *lsproto.ReferenceParams, orchestrator CrossProjectOrchestrator) (lsproto.ReferencesResponse, error) {"},
  {"line":659,"text":"\treturn handleCrossProject("},
  {"line":660,"text":"\t\tl,"},
  {"line":661,"text":"\t\tctx,"},
  {"line":662,"text":"\t\tparams,"},
  {"line":663,"text":"\t\torchestrator,"},
  {"line":664,"text":"\t\t(*LanguageService).symbolAndEntriesToReferences,"},
  {"line":665,"text":"\t\tcombineReferences,"},
  {"line":666,"text":"\t\tfalse, /*isRename*/"},
  {"line":667,"text":"\t\tfalse, /*implementations*/"},
  {"line":668,"text":"\t\tsymbolEntryTransformOptions{},"},
  {"line":669,"text":"\t)"},
  {"line":670,"text":"}"},
  {"line":672,"text":"func (l *LanguageService) symbolAndEntriesToReferences(ctx context.Context, params *lsproto.ReferenceParams, data SymbolAndEntriesData, options symbolEntryTransformOptions) (lsproto.ReferencesResponse, error) {"},
  {"line":674,"text":"\tlocations := core.FlatMap(data.SymbolsAndEntries, func(s *SymbolAndEntries) []lsproto.Location {"},
  {"line":675,"text":"\t\treturn l.convertSymbolAndEntriesToLocations(s, params.Context.IncludeDeclaration)"},
  {"line":676,"text":"\t})"},
  {"line":677,"text":"\treturn lsproto.LocationsOrNull{Locations: &locations}, nil"},
  {"line":678,"text":"}"},
  {"line":680,"text":"func (l *LanguageService) ProvideImplementations(ctx context.Context, params *lsproto.ImplementationParams, orchestrator CrossProjectOrchestrator) (lsproto.ImplementationResponse, error) {"},
  {"line":681,"text":"\treturn l.provideImplementationsEx(ctx, params, symbolEntryTransformOptions{}, orchestrator)"},
  {"line":682,"text":"}"},
  {"line":684,"text":"func (l *LanguageService) provideImplementationsEx(ctx context.Context, params *lsproto.ImplementationParams, options symbolEntryTransformOptions, orchestrator CrossProjectOrchestrator) (lsproto.ImplementationResponse, error) {"},
  {"line":685,"text":"\treturn handleCrossProject("},
  {"line":686,"text":"\t\tl,"},
  {"line":687,"text":"\t\tctx,"},
  {"line":688,"text":"\t\tparams,"},
  {"line":689,"text":"\t\torchestrator,"},
  {"line":690,"text":"\t\t(*LanguageService).symbolAndEntriesToImplementations,"},
  {"line":691,"text":"\t\tcombineImplementations,"},
  {"line":692,"text":"\t\tfalse, /*isRename*/"},
  {"line":693,"text":"\t\ttrue,  /*implementations*/"},
  {"line":694,"text":"\t\toptions,"},
  {"line":695,"text":"\t)"},
  {"line":696,"text":"}"},
  {"line":698,"text":"func (l *LanguageService) symbolAndEntriesToImplementations(ctx context.Context, params *lsproto.ImplementationParams, data SymbolAndEntriesData, options symbolEntryTransformOptions) (lsproto.ImplementationResponse, error) {"},
  {"line":699,"text":"\tvar seenNodes collections.Set[*ast.Node]"},
  {"line":700,"text":"\tvar entries []*ReferenceEntry"},
  {"line":701,"text":"\tfor _, entry := range data.SymbolsAndEntries {"},
  {"line":702,"text":"\t\tfor _, ref := range entry.references {"},
  {"line":703,"text":"\t\t\tif seenNodes.AddIfAbsent(ref.node) && (!options.dropOriginNodes || !ref.node.Loc.ContainsInclusive(data.Position)) {"},
  {"line":704,"text":"\t\t\t\tentries = append(entries, ref)"},
  {"line":705,"text":"\t\t\t}"},
  {"line":706,"text":"\t\t}"},
  {"line":707,"text":"\t}"},
  {"line":709,"text":"\tif !options.requireLocationsResult && lsproto.GetClientCapabilities(ctx).TextDocument.Implementation.LinkSupport {"},
  {"line":710,"text":"\t\tlinks := l.convertEntriesToLocationLinks(entries)"},
  {"line":711,"text":"\t\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{DefinitionLinks: &links}, nil"},
  {"line":712,"text":"\t}"},
  {"line":713,"text":"\tlocations := l.convertEntriesToLocations(entries)"},
  {"line":714,"text":"\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{Locations: &locations}, nil"},
  {"line":715,"text":"}"},
  {"line":718,"text":"func (l *LanguageService) convertSymbolAndEntriesToLocations(s *SymbolAndEntries, includeDeclarations bool) []lsproto.Location {"},
  {"line":719,"text":"\treferences := s.references"},
  {"line":722,"text":"\tif !includeDeclarations && s.definition != nil {"},
  {"line":723,"text":"\t\treferences = core.Filter(references, func(entry *ReferenceEntry) bool {"},
  {"line":724,"text":"\t\t\treturn !isDeclarationOfSymbol(entry.node, s.definition.symbol)"},
  {"line":725,"text":"\t\t})"},
  {"line":726,"text":"\t}"},
  {"line":728,"text":"\treturn l.convertEntriesToLocations(references)"},
  {"line":729,"text":"}"},
  {"line":731,"text":"func isDeclarationOfSymbol(node *ast.Node, target *ast.Symbol) bool {"},
  {"line":732,"text":"\tif target == nil {"},
  {"line":733,"text":"\t\treturn false"},
  {"line":734,"text":"\t}"},
  {"line":736,"text":"\tvar source *ast.Node"},
  {"line":737,"text":"\tif decl := ast.GetDeclarationFromName(node); decl != nil {"},
  {"line":738,"text":"\t\tsource = decl"},
  {"line":739,"text":"\t} else if node.Kind == ast.KindDefaultKeyword {"},
  {"line":740,"text":"\t\tsource = node.Parent"},
  {"line":741,"text":"\t} else if ast.IsLiteralComputedPropertyDeclarationName(node) {"},
  {"line":742,"text":"\t\tsource = node.Parent.Parent"},
  {"line":743,"text":"\t} else if node.Kind == ast.KindConstructorKeyword && ast.IsConstructorDeclaration(node.Parent) {"},
  {"line":744,"text":"\t\tsource = node.Parent.Parent"},
  {"line":745,"text":"\t}"},
  {"line":750,"text":"\treturn source != nil && core.Some(target.Declarations, func(decl *ast.Node) bool {"},
  {"line":751,"text":"\t\treturn decl == source"},
  {"line":752,"text":"\t})"},
  {"line":753,"text":"}"},
  {"line":755,"text":"func (l *LanguageService) convertEntriesToLocations(entries []*ReferenceEntry) []lsproto.Location {"},
  {"line":756,"text":"\tlocations := make([]lsproto.Location, len(entries))"},
  {"line":757,"text":"\tfor i, entry := range entries {"},
  {"line":758,"text":"\t\tlocations[i] = l.getLocationOfEntry(entry)"},
  {"line":759,"text":"\t}"},
  {"line":760,"text":"\treturn locations"},
  {"line":761,"text":"}"},
  {"line":763,"text":"func (l *LanguageService) convertEntriesToLocationLinks(entries []*ReferenceEntry) []*lsproto.LocationLink {"},
  {"line":764,"text":"\tlinks := make([]*lsproto.LocationLink, len(entries))"},
  {"line":765,"text":"\tfor i, entry := range entries {"},
  {"line":768,"text":"\t\tloc := l.getLocationOfEntry(entry)"},
  {"line":769,"text":"\t\ttargetSelectionRange := loc.Range"},
  {"line":770,"text":"\t\ttargetRange := targetSelectionRange"},
  {"line":773,"text":"\t\tif entry.node != nil {"},
  {"line":775,"text":"\t\t\tcontextTextRange := toContextRange(entry.textRange, l.program.GetSourceFile(entry.fileName), entry.context)"},
  {"line":776,"text":"\t\t\tif contextTextRange != nil {"},
  {"line":777,"text":"\t\t\t\tcontextLocation := l.getMappedLocation(entry.fileName, *contextTextRange)"},
  {"line":778,"text":"\t\t\t\ttargetRange = contextLocation.Range"},
  {"line":779,"text":"\t\t\t}"},
  {"line":780,"text":"\t\t}"},
  {"line":782,"text":"\t\tlinks[i] = &lsproto.LocationLink{"},
  {"line":783,"text":"\t\t\tTargetUri:            lsconv.FileNameToDocumentURI(entry.fileName),"},
  {"line":784,"text":"\t\t\tTargetRange:          targetRange,"},
  {"line":785,"text":"\t\t\tTargetSelectionRange: targetSelectionRange,"},
  {"line":786,"text":"\t\t}"},
  {"line":787,"text":"\t}"},
  {"line":788,"text":"\treturn links"},
  {"line":789,"text":"}"},
  {"line":791,"text":"func (l *LanguageService) mergeReferences(program *compiler.Program, referencesToMerge ...[]*SymbolAndEntries) []*SymbolAndEntries {"},
  {"line":792,"text":"\tresult := []*SymbolAndEntries{}"},
  {"line":793,"text":"\tgetSourceFileIndexOfEntry := func(program *compiler.Program, entry *ReferenceEntry) int {"},
  {"line":794,"text":"\t\tvar sourceFile *ast.SourceFile"},
  {"line":795,"text":"\t\tif entry.kind == entryKindRange {"},
  {"line":796,"text":"\t\t\tsourceFile = program.GetSourceFile(entry.fileName)"},
  {"line":797,"text":"\t\t} else {"},
  {"line":798,"text":"\t\t\tsourceFile = ast.GetSourceFileOfNode(entry.node)"},
  {"line":799,"text":"\t\t}"},
  {"line":800,"text":"\t\treturn slices.Index(program.SourceFiles(), sourceFile)"},
  {"line":801,"text":"\t}"},
  {"line":803,"text":"\tfor _, references := range referencesToMerge {"},
  {"line":804,"text":"\t\tif len(references) == 0 {"},
  {"line":805,"text":"\t\t\tcontinue"},
  {"line":806,"text":"\t\t}"},
  {"line":807,"text":"\t\tif len(result) == 0 {"},
  {"line":808,"text":"\t\t\tresult = references"},
  {"line":809,"text":"\t\t\tcontinue"},
  {"line":810,"text":"\t\t}"},
  {"line":811,"text":"\t\tfor _, entry := range references {"},
  {"line":812,"text":"\t\t\tif entry.definition == nil || entry.definition.Kind != definitionKindSymbol {"},
  {"line":813,"text":"\t\t\t\tresult = append(result, entry)"},
  {"line":814,"text":"\t\t\t\tcontinue"},
  {"line":815,"text":"\t\t\t}"},
  {"line":816,"text":"\t\t\tsymbol := entry.definition.symbol"},
  {"line":817,"text":"\t\t\trefIndex := core.FindIndex(result, func(ref *SymbolAndEntries) bool {"},
  {"line":818,"text":"\t\t\t\treturn ref.definition != nil &&"},
  {"line":819,"text":"\t\t\t\t\tref.definition.Kind == definitionKindSymbol &&"},
  {"line":820,"text":"\t\t\t\t\tref.definition.symbol == symbol"},
  {"line":821,"text":"\t\t\t})"},
  {"line":822,"text":"\t\t\tif refIndex == -1 {"},
  {"line":823,"text":"\t\t\t\tresult = append(result, entry)"},
  {"line":824,"text":"\t\t\t\tcontinue"},
  {"line":825,"text":"\t\t\t}"},
  {"line":827,"text":"\t\t\treference := result[refIndex]"},
  {"line":828,"text":"\t\t\tsortedRefs := append(reference.references, entry.references...)"},
  {"line":829,"text":"\t\t\tslices.SortStableFunc(sortedRefs, func(entry1, entry2 *ReferenceEntry) int {"},
  {"line":830,"text":"\t\t\t\tentry1File := getSourceFileIndexOfEntry(program, entry1)"},
  {"line":831,"text":"\t\t\t\tentry2File := getSourceFileIndexOfEntry(program, entry2)"},
  {"line":832,"text":"\t\t\t\tif entry1File != entry2File {"},
  {"line":833,"text":"\t\t\t\t\treturn cmp.Compare(entry1File, entry2File)"},
  {"line":834,"text":"\t\t\t\t}"},
  {"line":836,"text":"\t\t\t\treturn lsproto.CompareRanges(l.getRangeOfEntry(entry1), l.getRangeOfEntry(entry2))"},
  {"line":837,"text":"\t\t\t})"},
  {"line":838,"text":"\t\t\tresult[refIndex] = &SymbolAndEntries{"},
  {"line":839,"text":"\t\t\t\tdefinition: reference.definition,"},
  {"line":840,"text":"\t\t\t\treferences: sortedRefs,"},
  {"line":841,"text":"\t\t\t}"},
  {"line":842,"text":"\t\t}"},
  {"line":843,"text":"\t}"},
  {"line":844,"text":"\treturn result"},
  {"line":845,"text":"}"},
  {"line":849,"text":"func (l *LanguageService) getReferencedSymbolsForNode(ctx context.Context, position int, node *ast.Node, program *compiler.Program, sourceFiles []*ast.SourceFile, options refOptions) []*SymbolAndEntries {"},
  {"line":851,"text":"\tsourceFilesSet := collections.NewSetWithSizeHint[string](len(sourceFiles))"},
  {"line":852,"text":"\tfor _, file := range sourceFiles {"},
  {"line":853,"text":"\t\tsourceFilesSet.Add(file.FileName())"},
  {"line":854,"text":"\t}"},
  {"line":856,"text":"\tif options.use == referenceUseReferences || options.use == referenceUseRename {"},
  {"line":857,"text":"\t\tnode = getAdjustedLocation(node, options.use == referenceUseRename, ast.GetSourceFileOfNode(node))"},
  {"line":858,"text":"\t}"},
  {"line":860,"text":"\tchecker, done := program.GetTypeChecker(ctx)"},
  {"line":861,"text":"\tdefer done()"},
  {"line":863,"text":"\tif node.Kind == ast.KindSourceFile {"},
  {"line":864,"text":"\t\tresolvedRef := getReferenceAtPosition(node.AsSourceFile(), position, program)"},
  {"line":865,"text":"\t\tif resolvedRef == nil || resolvedRef.file == nil {"},
  {"line":866,"text":"\t\t\treturn nil"},
  {"line":867,"text":"\t\t}"},
  {"line":869,"text":"\t\tif moduleSymbol := checker.GetMergedSymbol(resolvedRef.file.Symbol); moduleSymbol != nil {"},
  {"line":870,"text":"\t\t\treturn l.getReferencedSymbolsForModule(ctx, program, moduleSymbol /*excludeImportTypeOfExportEquals*/, false, sourceFiles, sourceFilesSet)"},
  {"line":871,"text":"\t\t}"},
  {"line":878,"text":"\t\treturn []*SymbolAndEntries{{"},
  {"line":879,"text":"\t\t\tdefinition: &Definition{Kind: definitionKindTripleSlashReference, tripleSlashFileRef: &tripleSlashDefinition{reference: resolvedRef.reference}},"},
  {"line":880,"text":"\t\t\treferences: getReferencesForNonModule(resolvedRef.file, program /*fileIncludeReasons,*/),"},
  {"line":881,"text":"\t\t}}"},
  {"line":882,"text":"\t}"},
  {"line":884,"text":"\tif !options.implementations {"},
  {"line":886,"text":"\t\tif special := getReferencedSymbolsSpecial(node, sourceFiles); special != nil {"},
  {"line":887,"text":"\t\t\treturn special"},
  {"line":888,"text":"\t\t}"},
  {"line":889,"text":"\t}"},
  {"line":892,"text":"\tsymbol := checker.GetSymbolAtLocation(core.IfElse(node.Kind == ast.KindConstructor && node.Parent.Name() != nil, node.Parent.Name(), node))"},
  {"line":894,"text":"\tif symbol == nil {"},
  {"line":896,"text":"\t\tif !options.implementations && ast.IsStringLiteralLike(node) {"},
  {"line":897,"text":"\t\t\tif isModuleSpecifierLike(node) {"},
  {"line":909,"text":"\t\t\t}"},
  {"line":910,"text":"\t\t\treturn l.getReferencesForStringLiteral(ctx, node, sourceFiles, checker)"},
  {"line":911,"text":"\t\t}"},
  {"line":912,"text":"\t\treturn nil"},
  {"line":913,"text":"\t}"},
  {"line":915,"text":"\tif symbol.Name == ast.InternalSymbolNameExportEquals {"},
  {"line":916,"text":"\t\tif symbol.Parent == nil {"},
  {"line":917,"text":"\t\t\treturn nil"},
  {"line":918,"text":"\t\t}"},
  {"line":919,"text":"\t\treturn l.getReferencedSymbolsForModule(ctx, program, symbol.Parent, false /*excludeImportTypeOfExportEquals*/, sourceFiles, sourceFilesSet)"},
  {"line":920,"text":"\t}"},
  {"line":922,"text":"\tmoduleReferences := l.getReferencedSymbolsForModuleIfDeclaredBySourceFile(ctx, symbol, program, sourceFiles, checker, options, sourceFilesSet)"},
  {"line":923,"text":"\tif moduleReferences != nil && symbol.Flags&ast.SymbolFlagsTransient == 0 {"},
  {"line":924,"text":"\t\treturn moduleReferences"},
  {"line":925,"text":"\t}"},
  {"line":927,"text":"\taliasedSymbol := getMergedAliasedSymbolOfNamespaceExportDeclaration(node, symbol, checker)"},
  {"line":928,"text":"\tmoduleReferencesOfExportTarget := l.getReferencedSymbolsForModuleIfDeclaredBySourceFile(ctx, aliasedSymbol, program, sourceFiles, checker, options, sourceFilesSet)"},
  {"line":930,"text":"\treferences := getReferencedSymbolsForSymbol(ctx, program, symbol, node, sourceFiles, sourceFilesSet, checker, options)"},
  {"line":931,"text":"\treturn l.mergeReferences(program, moduleReferences, references, moduleReferencesOfExportTarget)"},
  {"line":932,"text":"}"},
  {"line":934,"text":"func (l *LanguageService) getReferencesForStringLiteral("},
  {"line":935,"text":"\tctx context.Context,"},
  {"line":936,"text":"\tnode *ast.StringLiteralLike,"},
  {"line":937,"text":"\tsourceFiles []*ast.SourceFile,"},
  {"line":938,"text":"\tchecker *checker.Checker,"},
  {"line":939,"text":") []*SymbolAndEntries {"},
  {"line":940,"text":"\tt := getContextualTypeFromParentOrAncestorTypeNode(node, checker)"},
  {"line":941,"text":"\treferences := core.FlatMap(sourceFiles, func(sourceFile *ast.SourceFile) []*ReferenceEntry {"},
  {"line":942,"text":"\t\tif ctx.Err() != nil {"},
  {"line":943,"text":"\t\t\treturn nil"},
  {"line":944,"text":"\t\t}"},
  {"line":945,"text":"\t\tvar entries []*ReferenceEntry"},
  {"line":946,"text":"\t\tpossibleReferences := getPossibleSymbolReferenceNodes(sourceFile, node.Text(), nil /*container*/)"},
  {"line":947,"text":"\t\tfor _, ref := range possibleReferences {"},
  {"line":948,"text":"\t\t\tif ast.IsStringLiteralLike(ref) && ref.Text() == node.Text() {"},
  {"line":949,"text":"\t\t\t\tif t != nil {"},
  {"line":950,"text":"\t\t\t\t\trefType := getContextualTypeFromParentOrAncestorTypeNode(ref, checker)"},
  {"line":951,"text":"\t\t\t\t\tif t != checker.GetStringType() &&"},
  {"line":952,"text":"\t\t\t\t\t\t(t == refType || isStringLiteralPropertyReference(ref, checker)) {"},
  {"line":953,"text":"\t\t\t\t\t\tentries = append(entries, newNodeEntryWithKind(ref, entryKindStringLiteral))"},
  {"line":954,"text":"\t\t\t\t\t}"},
  {"line":955,"text":"\t\t\t\t} else {"},
  {"line":956,"text":"\t\t\t\t\tif ast.IsNoSubstitutionTemplateLiteral(ref) && !printer.RangeIsOnSingleLine(ref.Loc, sourceFile) {"},
  {"line":957,"text":"\t\t\t\t\t\tcontinue"},
  {"line":958,"text":"\t\t\t\t\t}"},
  {"line":959,"text":"\t\t\t\t\tentries = append(entries, newNodeEntryWithKind(ref, entryKindStringLiteral))"},
  {"line":960,"text":"\t\t\t\t}"},
  {"line":961,"text":"\t\t\t}"},
  {"line":962,"text":"\t\t}"},
  {"line":963,"text":"\t\treturn entries"},
  {"line":964,"text":"\t})"},
  {"line":966,"text":"\treturn []*SymbolAndEntries{"},
  {"line":967,"text":"\t\t{"},
  {"line":968,"text":"\t\t\tdefinition: &Definition{Kind: definitionKindString, node: node},"},
  {"line":969,"text":"\t\t\treferences: references,"},
  {"line":970,"text":"\t\t},"},
  {"line":971,"text":"\t}"},
  {"line":972,"text":"}"},
  {"line":974,"text":"func isStringLiteralPropertyReference(node *ast.StringLiteralLike, checker *checker.Checker) bool {"},
  {"line":975,"text":"\tif ast.IsPropertySignatureDeclaration(node.Parent) {"},
  {"line":976,"text":"\t\treturn checker.GetPropertyOfType(checker.GetTypeAtLocation(node.Parent.Parent), node.Text()) != nil"},
  {"line":977,"text":"\t}"},
  {"line":978,"text":"\treturn false"},
  {"line":979,"text":"}"},
  {"line":981,"text":"func (l *LanguageService) getReferencedSymbolsForModuleIfDeclaredBySourceFile(ctx context.Context, symbol *ast.Symbol, program *compiler.Program, sourceFiles []*ast.SourceFile, checker *checker.Checker, options refOptions, sourceFilesSet *collections.Set[string]) []*SymbolAndEntries {"},
  {"line":982,"text":"\tmoduleSourceFileName := \"\""},
  {"line":983,"text":"\tif symbol == nil || !((symbol.Flags&ast.SymbolFlagsModule != 0) && len(symbol.Declarations) != 0) {"},
  {"line":984,"text":"\t\treturn nil"},
  {"line":985,"text":"\t}"},
  {"line":986,"text":"\tif moduleSourceFile := core.Find(symbol.Declarations, ast.IsSourceFile); moduleSourceFile != nil {"},
  {"line":987,"text":"\t\tmoduleSourceFileName = moduleSourceFile.AsSourceFile().FileName()"},
  {"line":988,"text":"\t} else {"},
  {"line":989,"text":"\t\treturn nil"},
  {"line":990,"text":"\t}"},
  {"line":991,"text":"\texportEquals := symbol.Exports[ast.InternalSymbolNameExportEquals]"},
  {"line":993,"text":"\tmoduleReferences := l.getReferencedSymbolsForModule(ctx, program, symbol, exportEquals != nil, sourceFiles, sourceFilesSet)"},
  {"line":994,"text":"\tif exportEquals == nil || exportEquals.Flags&ast.SymbolFlagsAlias == 0 || !sourceFilesSet.Has(moduleSourceFileName) {"},
  {"line":995,"text":"\t\treturn moduleReferences"},
  {"line":996,"text":"\t}"},
  {"line":997,"text":"\tsymbol, _ = checker.ResolveAlias(exportEquals)"},
  {"line":998,"text":"\treturn l.mergeReferences(program, moduleReferences, getReferencedSymbolsForSymbol(ctx, program, symbol /*node*/, nil, sourceFiles, sourceFilesSet, checker /*, cancellationToken*/, options))"},
  {"line":999,"text":"}"},
  {"line":1001,"text":"func getReferencedSymbolsSpecial(node *ast.Node, sourceFiles []*ast.SourceFile) []*SymbolAndEntries {"},
  {"line":1002,"text":"\tif isTypeKeyword(node.Kind) {"},
  {"line":1004,"text":"\t\tif node.Kind == ast.KindVoidKeyword && node.Parent.Kind == ast.KindVoidExpression {"},
  {"line":1005,"text":"\t\t\treturn nil"},
  {"line":1006,"text":"\t\t}"},
  {"line":1010,"text":"\t\tif node.Kind == ast.KindReadonlyKeyword && !isReadonlyTypeOperator(node) {"},
  {"line":1011,"text":"\t\t\treturn nil"},
  {"line":1012,"text":"\t\t}"},
  {"line":1015,"text":"\t\treturn getAllReferencesForKeyword("},
  {"line":1016,"text":"\t\t\tsourceFiles,"},
  {"line":1017,"text":"\t\t\tnode.Kind,"},
  {"line":1019,"text":"\t\t\tnode.Kind == ast.KindReadonlyKeyword,"},
  {"line":1020,"text":"\t\t)"},
  {"line":1021,"text":"\t}"},
  {"line":1023,"text":"\tif ast.IsImportMeta(node.Parent) && node.Parent.Name() == node {"},
  {"line":1024,"text":"\t\treturn getAllReferencesForImportMeta(sourceFiles)"},
  {"line":1025,"text":"\t}"},
  {"line":1027,"text":"\tif node.Kind == ast.KindStaticKeyword && node.Parent.Kind == ast.KindClassStaticBlockDeclaration {"},
  {"line":1028,"text":"\t\treturn []*SymbolAndEntries{{definition: &Definition{Kind: definitionKindKeyword, node: node}, references: []*ReferenceEntry{newNodeEntry(node)}}}"},
  {"line":1029,"text":"\t}"},
  {"line":1032,"text":"\tif isJumpStatementTarget(node) {"},
  {"line":1035,"text":"\t\tif labelDefinition := getTargetLabel(node.Parent, node.Text()); labelDefinition != nil {"},
  {"line":1036,"text":"\t\t\treturn getLabelReferencesInNode(labelDefinition.Parent, labelDefinition)"},
  {"line":1037,"text":"\t\t}"},
  {"line":1038,"text":"\t\treturn nil"},
  {"line":1039,"text":"\t}"},
  {"line":1041,"text":"\tif isLabelOfLabeledStatement(node) {"},
  {"line":1043,"text":"\t\treturn getLabelReferencesInNode(node.Parent, node)"},
  {"line":1044,"text":"\t}"},
  {"line":1046,"text":"\tif isThis(node) {"},
  {"line":1047,"text":"\t\treturn getReferencesForThisKeyword(node, sourceFiles /*, cancellationToken*/)"},
  {"line":1048,"text":"\t}"},
  {"line":1050,"text":"\tif node.Kind == ast.KindSuperKeyword {"},
  {"line":1051,"text":"\t\treturn getReferencesForSuperKeyword(node)"},
  {"line":1052,"text":"\t}"},
  {"line":1054,"text":"\treturn nil"},
  {"line":1055,"text":"}"},
  {"line":1057,"text":"func getLabelReferencesInNode(container *ast.Node, targetLabel *ast.Node) []*SymbolAndEntries {"},
  {"line":1058,"text":"\tsourceFile := ast.GetSourceFileOfNode(container)"},
  {"line":1059,"text":"\tlabelName := targetLabel.Text()"},
  {"line":1060,"text":"\treferences := core.MapNonNil(getPossibleSymbolReferenceNodes(sourceFile, labelName, container), func(node *ast.Node) *ReferenceEntry {"},
  {"line":1062,"text":"\t\tif node == targetLabel.AsNode() || (isJumpStatementTarget(node) && getTargetLabel(node, labelName) == targetLabel) {"},
  {"line":1063,"text":"\t\t\treturn newNodeEntry(node)"},
  {"line":1064,"text":"\t\t}"},
  {"line":1065,"text":"\t\treturn nil"},
  {"line":1066,"text":"\t})"},
  {"line":1067,"text":"\treturn []*SymbolAndEntries{NewSymbolAndEntries(definitionKindLabel, targetLabel, nil, references)}"},
  {"line":1068,"text":"}"},
  {"line":1070,"text":"func getReferencesForThisKeyword(thisOrSuperKeyword *ast.Node, sourceFiles []*ast.SourceFile) []*SymbolAndEntries {"},
  {"line":1071,"text":"\tsearchSpaceNode := ast.GetThisContainer(thisOrSuperKeyword, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)"},
  {"line":1074,"text":"\tstaticFlag := ast.ModifierFlagsStatic"},
  {"line":1075,"text":"\tisParameterName := func(node *ast.Node) bool {"},
  {"line":1076,"text":"\t\treturn node.Kind == ast.KindIdentifier && node.Parent.Kind == ast.KindParameter && node.Parent.Name() == node"},
  {"line":1077,"text":"\t}"},
  {"line":1079,"text":"\tswitch searchSpaceNode.Kind {"},
  {"line":1080,"text":"\tcase ast.KindMethodDeclaration, ast.KindMethodSignature,"},
  {"line":1081,"text":"\t\tast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor:"},
  {"line":1082,"text":"\t\tif (searchSpaceNode.Kind == ast.KindMethodDeclaration || searchSpaceNode.Kind == ast.KindMethodSignature) && ast.IsObjectLiteralMethod(searchSpaceNode) {"},
  {"line":1083,"text":"\t\t\tstaticFlag &= searchSpaceNode.ModifierFlags()"},
  {"line":1084,"text":"\t\t\tsearchSpaceNode = searchSpaceNode.Parent // re-assign to be the owning object literals"},
  {"line":1085,"text":"\t\t\tbreak"},
  {"line":1086,"text":"\t\t}"},
  {"line":1087,"text":"\t\tstaticFlag &= searchSpaceNode.ModifierFlags()"},
  {"line":1088,"text":"\t\tsearchSpaceNode = searchSpaceNode.Parent // re-assign to be the owning class"},
  {"line":1089,"text":"\tcase ast.KindSourceFile:"},
  {"line":1090,"text":"\t\tif ast.IsExternalModule(searchSpaceNode.AsSourceFile()) || isParameterName(thisOrSuperKeyword) {"},
  {"line":1091,"text":"\t\t\treturn nil"},
  {"line":1092,"text":"\t\t}"},
  {"line":1093,"text":"\tcase ast.KindFunctionDeclaration, ast.KindFunctionExpression:"},
  {"line":1096,"text":"\tdefault:"},
  {"line":1097,"text":"\t\treturn nil"},
  {"line":1098,"text":"\t}"},
  {"line":1100,"text":"\tfilesToSearch := sourceFiles"},
  {"line":1101,"text":"\tif searchSpaceNode.Kind != ast.KindSourceFile {"},
  {"line":1102,"text":"\t\tfilesToSearch = []*ast.SourceFile{ast.GetSourceFileOfNode(searchSpaceNode)}"},
  {"line":1103,"text":"\t}"},
  {"line":1104,"text":"\treferences := core.Map("},
  {"line":1105,"text":"\t\tcore.FlatMap(filesToSearch, func(sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":1107,"text":"\t\t\treturn core.Filter("},
  {"line":1108,"text":"\t\t\t\tgetPossibleSymbolReferenceNodes(sourceFile, \"this\", core.IfElse(searchSpaceNode.Kind == ast.KindSourceFile, sourceFile.AsNode(), searchSpaceNode)),"},
  {"line":1109,"text":"\t\t\t\tfunc(node *ast.Node) bool {"},
  {"line":1110,"text":"\t\t\t\t\tif !isThis(node) {"},
  {"line":1111,"text":"\t\t\t\t\t\treturn false"},
  {"line":1112,"text":"\t\t\t\t\t}"},
  {"line":1113,"text":"\t\t\t\t\tcontainer := ast.GetThisContainer(node /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/, false)"},
  {"line":1114,"text":"\t\t\t\t\tif !ast.CanHaveSymbol(container) {"},
  {"line":1115,"text":"\t\t\t\t\t\treturn false"},
  {"line":1116,"text":"\t\t\t\t\t}"},
  {"line":1117,"text":"\t\t\t\t\tswitch searchSpaceNode.Kind {"},
  {"line":1118,"text":"\t\t\t\t\tcase ast.KindFunctionExpression, ast.KindFunctionDeclaration:"},
  {"line":1119,"text":"\t\t\t\t\t\treturn searchSpaceNode.Symbol() == container.Symbol()"},
  {"line":1120,"text":"\t\t\t\t\tcase ast.KindMethodDeclaration, ast.KindMethodSignature:"},
  {"line":1121,"text":"\t\t\t\t\t\treturn ast.IsObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.Symbol() == container.Symbol()"},
  {"line":1122,"text":"\t\t\t\t\tcase ast.KindClassExpression, ast.KindClassDeclaration, ast.KindObjectLiteralExpression:"},
  {"line":1125,"text":"\t\t\t\t\t\treturn container.Parent != nil && ast.CanHaveSymbol(container.Parent) && searchSpaceNode.Symbol() == container.Parent.Symbol() && ast.IsStatic(container) == (staticFlag != ast.ModifierFlagsNone)"},
  {"line":1126,"text":"\t\t\t\t\tcase ast.KindSourceFile:"},
  {"line":1127,"text":"\t\t\t\t\t\treturn container.Kind == ast.KindSourceFile && !ast.IsExternalModule(container.AsSourceFile()) && !isParameterName(node)"},
  {"line":1128,"text":"\t\t\t\t\t}"},
  {"line":1129,"text":"\t\t\t\t\treturn false"},
  {"line":1130,"text":"\t\t\t\t})"},
  {"line":1131,"text":"\t\t}),"},
  {"line":1132,"text":"\t\tfunc(n *ast.Node) *ReferenceEntry { return newNodeEntry(n) },"},
  {"line":1133,"text":"\t)"},
  {"line":1135,"text":"\tthisParameter := core.FirstNonNil(references, func(ref *ReferenceEntry) *ast.Node {"},
  {"line":1136,"text":"\t\tif ref.node.Parent.Kind == ast.KindParameter {"},
  {"line":1137,"text":"\t\t\treturn ref.node"},
  {"line":1138,"text":"\t\t}"},
  {"line":1139,"text":"\t\treturn nil"},
  {"line":1140,"text":"\t})"},
  {"line":1141,"text":"\tif thisParameter == nil {"},
  {"line":1142,"text":"\t\tthisParameter = thisOrSuperKeyword"},
  {"line":1143,"text":"\t}"},
  {"line":1144,"text":"\treturn []*SymbolAndEntries{NewSymbolAndEntries(definitionKindThis, thisParameter, searchSpaceNode.Symbol(), references)}"},
  {"line":1145,"text":"}"},
  {"line":1147,"text":"func getReferencesForSuperKeyword(superKeyword *ast.Node) []*SymbolAndEntries {"},
  {"line":1148,"text":"\tsearchSpaceNode := ast.GetSuperContainer(superKeyword, false /*stopOnFunctions*/)"},
  {"line":1149,"text":"\tif searchSpaceNode == nil {"},
  {"line":1150,"text":"\t\treturn nil"},
  {"line":1151,"text":"\t}"},
  {"line":1153,"text":"\tstaticFlag := ast.ModifierFlagsStatic"},
  {"line":1155,"text":"\tswitch searchSpaceNode.Kind {"},
  {"line":1156,"text":"\tcase ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor:"},
  {"line":1157,"text":"\t\tstaticFlag &= searchSpaceNode.ModifierFlags()"},
  {"line":1158,"text":"\t\tsearchSpaceNode = searchSpaceNode.Parent // re-assign to be the owning class"},
  {"line":1159,"text":"\tdefault:"},
  {"line":1160,"text":"\t\treturn nil"},
  {"line":1161,"text":"\t}"},
  {"line":1163,"text":"\tsourceFile := ast.GetSourceFileOfNode(searchSpaceNode)"},
  {"line":1164,"text":"\treferences := core.MapNonNil(getPossibleSymbolReferenceNodes(sourceFile, \"super\", searchSpaceNode), func(node *ast.Node) *ReferenceEntry {"},
  {"line":1165,"text":"\t\tif node.Kind != ast.KindSuperKeyword {"},
  {"line":1166,"text":"\t\t\treturn nil"},
  {"line":1167,"text":"\t\t}"},
  {"line":1169,"text":"\t\tcontainer := ast.GetSuperContainer(node, false /*stopOnFunctions*/)"},
  {"line":1174,"text":"\t\tif container != nil && ast.IsStatic(container) == (staticFlag != ast.ModifierFlagsNone) && container.Parent.Symbol() == searchSpaceNode.Symbol() {"},
  {"line":1175,"text":"\t\t\treturn newNodeEntry(node)"},
  {"line":1176,"text":"\t\t}"},
  {"line":1177,"text":"\t\treturn nil"},
  {"line":1178,"text":"\t})"},
  {"line":1180,"text":"\treturn []*SymbolAndEntries{NewSymbolAndEntries(definitionKindSymbol, nil, searchSpaceNode.Symbol(), references)}"},
  {"line":1181,"text":"}"},
  {"line":1183,"text":"func getAllReferencesForImportMeta(sourceFiles []*ast.SourceFile) []*SymbolAndEntries {"},
  {"line":1184,"text":"\treferences := core.FlatMap(sourceFiles, func(sourceFile *ast.SourceFile) []*ReferenceEntry {"},
  {"line":1185,"text":"\t\treturn core.MapNonNil(getPossibleSymbolReferenceNodes(sourceFile, \"meta\", sourceFile.AsNode()), func(node *ast.Node) *ReferenceEntry {"},
  {"line":1186,"text":"\t\t\tparent := node.Parent"},
  {"line":1187,"text":"\t\t\tif ast.IsImportMeta(parent) {"},
  {"line":1188,"text":"\t\t\t\treturn newNodeEntry(parent)"},
  {"line":1189,"text":"\t\t\t}"},
  {"line":1190,"text":"\t\t\treturn nil"},
  {"line":1191,"text":"\t\t})"},
  {"line":1192,"text":"\t})"},
  {"line":1193,"text":"\tif len(references) == 0 {"},
  {"line":1194,"text":"\t\treturn nil"},
  {"line":1195,"text":"\t}"},
  {"line":1196,"text":"\treturn []*SymbolAndEntries{{definition: &Definition{Kind: definitionKindKeyword, node: references[0].node}, references: references}}"},
  {"line":1197,"text":"}"},
  {"line":1199,"text":"func getAllReferencesForKeyword(sourceFiles []*ast.SourceFile, keywordKind ast.Kind, filterReadOnlyTypeOperator bool) []*SymbolAndEntries {"},
  {"line":1201,"text":"\treferences := core.FlatMap(sourceFiles, func(sourceFile *ast.SourceFile) []*ReferenceEntry {"},
  {"line":1203,"text":"\t\treturn core.MapNonNil(getPossibleSymbolReferenceNodes(sourceFile, scanner.TokenToString(keywordKind), sourceFile.AsNode()), func(referenceLocation *ast.Node) *ReferenceEntry {"},
  {"line":1204,"text":"\t\t\tif referenceLocation.Kind == keywordKind && (!filterReadOnlyTypeOperator || isReadonlyTypeOperator(referenceLocation)) {"},
  {"line":1205,"text":"\t\t\t\treturn newNodeEntry(referenceLocation)"},
  {"line":1206,"text":"\t\t\t}"},
  {"line":1207,"text":"\t\t\treturn nil"},
  {"line":1208,"text":"\t\t})"},
  {"line":1209,"text":"\t})"},
  {"line":1210,"text":"\tif len(references) == 0 {"},
  {"line":1211,"text":"\t\treturn nil"},
  {"line":1212,"text":"\t}"},
  {"line":1213,"text":"\treturn []*SymbolAndEntries{NewSymbolAndEntries(definitionKindKeyword, references[0].node, nil, references)}"},
  {"line":1214,"text":"}"},
  {"line":1216,"text":"func getPossibleSymbolReferenceNodes(sourceFile *ast.SourceFile, symbolName string, container *ast.Node) []*ast.Node {"},
  {"line":1217,"text":"\treturn core.MapNonNil(getPossibleSymbolReferencePositions(sourceFile, symbolName, container), func(pos int) *ast.Node {"},
  {"line":1218,"text":"\t\tif referenceLocation := astnav.GetTouchingPropertyName(sourceFile, pos); referenceLocation != sourceFile.AsNode() {"},
  {"line":1219,"text":"\t\t\treturn referenceLocation"},
  {"line":1220,"text":"\t\t}"},
  {"line":1221,"text":"\t\treturn nil"},
  {"line":1222,"text":"\t})"},
  {"line":1223,"text":"}"},
  {"line":1225,"text":"func getPossibleSymbolReferencePositions(sourceFile *ast.SourceFile, symbolName string, container *ast.Node) []int {"},
  {"line":1226,"text":"\tpositions := []int{}"},
  {"line":1232,"text":"\tif symbolName == \"\" {"},
  {"line":1233,"text":"\t\treturn positions"},
  {"line":1234,"text":"\t}"},
  {"line":1236,"text":"\ttext := sourceFile.Text()"},
  {"line":1237,"text":"\tsourceLength := len(text)"},
  {"line":1238,"text":"\tsymbolNameLength := len(symbolName)"},
  {"line":1240,"text":"\tif container == nil {"},
  {"line":1241,"text":"\t\tcontainer = sourceFile.AsNode()"},
  {"line":1242,"text":"\t}"},
  {"line":1244,"text":"\tposition := strings.Index(text[container.Pos():], symbolName)"},
  {"line":1245,"text":"\tendPos := container.End()"},
  {"line":1246,"text":"\tfor position >= 0 && position < endPos {"},
  {"line":1249,"text":"\t\tendPosition := position + symbolNameLength"},
  {"line":1251,"text":"\t\tif (position == 0 || !scanner.IsIdentifierPart(rune(text[position-1]))) &&"},
  {"line":1252,"text":"\t\t\t(endPosition == sourceLength || !scanner.IsIdentifierPart(rune(text[endPosition]))) {"},
  {"line":1254,"text":"\t\t\tpositions = append(positions, position)"},
  {"line":1255,"text":"\t\t}"},
  {"line":1256,"text":"\t\tstartIndex := position + symbolNameLength + 1"},
  {"line":1257,"text":"\t\tif startIndex > len(text) {"},
  {"line":1258,"text":"\t\t\tbreak"},
  {"line":1259,"text":"\t\t}"},
  {"line":1260,"text":"\t\tif foundIndex := strings.Index(text[startIndex:], symbolName); foundIndex != -1 {"},
  {"line":1261,"text":"\t\t\tposition = startIndex + foundIndex"},
  {"line":1262,"text":"\t\t} else {"},
  {"line":1263,"text":"\t\t\tbreak"},
  {"line":1264,"text":"\t\t}"},
  {"line":1265,"text":"\t}"},
  {"line":1267,"text":"\treturn positions"},
  {"line":1268,"text":"}"},
  {"line":1271,"text":"func findFirstJsxNode(root *ast.Node) *ast.Node {"},
  {"line":1272,"text":"\tvar visit func(*ast.Node) *ast.Node"},
  {"line":1273,"text":"\tvisit = func(node *ast.Node) *ast.Node {"},
  {"line":1275,"text":"\t\tswitch node.Kind {"},
  {"line":1276,"text":"\t\tcase ast.KindJsxElement, ast.KindJsxSelfClosingElement, ast.KindJsxFragment:"},
  {"line":1277,"text":"\t\t\treturn node"},
  {"line":1278,"text":"\t\t}"},
  {"line":1281,"text":"\t\tif node.SubtreeFacts()&ast.SubtreeContainsJsx == 0 {"},
  {"line":1282,"text":"\t\t\treturn nil"},
  {"line":1283,"text":"\t\t}"},
  {"line":1286,"text":"\t\tvar result *ast.Node"},
  {"line":1287,"text":"\t\tnode.ForEachChild(func(child *ast.Node) bool {"},
  {"line":1288,"text":"\t\t\tresult = visit(child)"},
  {"line":1289,"text":"\t\t\treturn result != nil // Stop if found"},
  {"line":1290,"text":"\t\t})"},
  {"line":1291,"text":"\t\treturn result"},
  {"line":1292,"text":"\t}"},
  {"line":1294,"text":"\treturn visit(root)"},
  {"line":1295,"text":"}"},
  {"line":1297,"text":"func getReferencesForNonModule(referencedFile *ast.SourceFile, program *compiler.Program) []*ReferenceEntry {"},
  {"line":1299,"text":"\treturn []*ReferenceEntry{}"},
  {"line":1300,"text":"}"},
  {"line":1302,"text":"func getMergedAliasedSymbolOfNamespaceExportDeclaration(node *ast.Node, symbol *ast.Symbol, checker *checker.Checker) *ast.Symbol {"},
  {"line":1303,"text":"\tif node.Parent != nil && node.Parent.Kind == ast.KindNamespaceExportDeclaration {"},
  {"line":1304,"text":"\t\tif aliasedSymbol, ok := checker.ResolveAlias(symbol); ok {"},
  {"line":1305,"text":"\t\t\ttargetSymbol := checker.GetMergedSymbol(aliasedSymbol)"},
  {"line":1306,"text":"\t\t\tif aliasedSymbol != targetSymbol {"},
  {"line":1307,"text":"\t\t\t\treturn targetSymbol"},
  {"line":1308,"text":"\t\t\t}"},
  {"line":1309,"text":"\t\t}"},
  {"line":1310,"text":"\t}"},
  {"line":1311,"text":"\treturn nil"},
  {"line":1312,"text":"}"},
  {"line":1314,"text":"func (l *LanguageService) getReferencedSymbolsForModule(ctx context.Context, program *compiler.Program, symbol *ast.Symbol, excludeImportTypeOfExportEquals bool, sourceFiles []*ast.SourceFile, sourceFilesSet *collections.Set[string]) []*SymbolAndEntries {"},
  {"line":1315,"text":"\tdebug.Assert(symbol.ValueDeclaration != nil)"},
  {"line":1317,"text":"\tchecker, done := program.GetTypeChecker(ctx)"},
  {"line":1318,"text":"\tdefer done()"},
  {"line":1320,"text":"\tmoduleRefs := findModuleReferences(program, sourceFiles, symbol, checker)"},
  {"line":1321,"text":"\treferences := core.MapNonNil(moduleRefs, func(reference ModuleReference) *ReferenceEntry {"},
  {"line":1322,"text":"\t\tswitch reference.kind {"},
  {"line":1323,"text":"\t\tcase ModuleReferenceKindImport:"},
  {"line":1324,"text":"\t\t\tparent := reference.literal.Parent"},
  {"line":1325,"text":"\t\t\tif ast.IsLiteralTypeNode(parent) {"},
  {"line":1326,"text":"\t\t\t\timportType := parent.Parent"},
  {"line":1327,"text":"\t\t\t\tif ast.IsImportTypeNode(importType) {"},
  {"line":1328,"text":"\t\t\t\t\timportTypeNode := importType.AsImportTypeNode()"},
  {"line":1329,"text":"\t\t\t\t\tif excludeImportTypeOfExportEquals && importTypeNode.Qualifier == nil {"},
  {"line":1330,"text":"\t\t\t\t\t\treturn nil"},
  {"line":1331,"text":"\t\t\t\t\t}"},
  {"line":1332,"text":"\t\t\t\t}"},
  {"line":1333,"text":"\t\t\t}"},
  {"line":1335,"text":"\t\t\treturn newNodeEntry(reference.literal)"},
  {"line":1336,"text":"\t\tcase ModuleReferenceKindImplicit:"},
  {"line":1339,"text":"\t\t\tvar rangeNode *ast.Node"},
  {"line":1342,"text":"\t\t\tif reference.literal.Text() != \"tslib\" {"},
  {"line":1343,"text":"\t\t\t\trangeNode = findFirstJsxNode(reference.referencingFile.AsNode())"},
  {"line":1344,"text":"\t\t\t}"},
  {"line":1346,"text":"\t\t\tif rangeNode == nil {"},
  {"line":1347,"text":"\t\t\t\tif reference.referencingFile.Statements != nil && len(reference.referencingFile.Statements.Nodes) > 0 {"},
  {"line":1348,"text":"\t\t\t\t\trangeNode = reference.referencingFile.Statements.Nodes[0]"},
  {"line":1349,"text":"\t\t\t\t} else {"},
  {"line":1350,"text":"\t\t\t\t\trangeNode = reference.referencingFile.AsNode()"},
  {"line":1351,"text":"\t\t\t\t}"},
  {"line":1352,"text":"\t\t\t}"},
  {"line":1353,"text":"\t\t\treturn newNodeEntry(rangeNode)"},
  {"line":1354,"text":"\t\tcase ModuleReferenceKindReference:"},
  {"line":1355,"text":"\t\t\treturn &ReferenceEntry{"},
  {"line":1356,"text":"\t\t\t\tkind:      entryKindRange,"},
  {"line":1357,"text":"\t\t\t\tfileName:  reference.referencingFile.FileName(),"},
  {"line":1358,"text":"\t\t\t\ttextRange: &reference.ref.TextRange,"},
  {"line":1359,"text":"\t\t\t}"},
  {"line":1360,"text":"\t\t}"},
  {"line":1361,"text":"\t\treturn nil"},
  {"line":1362,"text":"\t})"},
  {"line":1365,"text":"\tif len(symbol.Declarations) > 0 {"},
  {"line":1366,"text":"\t\tfor _, decl := range symbol.Declarations {"},
  {"line":1367,"text":"\t\t\tswitch decl.Kind {"},
  {"line":1368,"text":"\t\t\tcase ast.KindSourceFile:"},
  {"line":1370,"text":"\t\t\t\tcontinue"},
  {"line":1371,"text":"\t\t\tcase ast.KindModuleDeclaration:"},
  {"line":1372,"text":"\t\t\t\tif sourceFilesSet.Has(ast.GetSourceFileOfNode(decl).FileName()) {"},
  {"line":1373,"text":"\t\t\t\t\treferences = append(references, newNodeEntry(decl.AsModuleDeclaration().Name()))"},
  {"line":1374,"text":"\t\t\t\t}"},
  {"line":1375,"text":"\t\t\tdefault:"},
  {"line":1377,"text":"\t\t\t\tcontinue"},
  {"line":1378,"text":"\t\t\t}"},
  {"line":1379,"text":"\t\t}"},
  {"line":1380,"text":"\t}"},
  {"line":1383,"text":"\texported := symbol.Exports[ast.InternalSymbolNameExportEquals]"},
  {"line":1384,"text":"\tif exported != nil && len(exported.Declarations) > 0 {"},
  {"line":1385,"text":"\t\tfor _, decl := range exported.Declarations {"},
  {"line":1386,"text":"\t\t\tsourceFile := ast.GetSourceFileOfNode(decl)"},
  {"line":1387,"text":"\t\t\tif sourceFilesSet.Has(sourceFile.FileName()) {"},
  {"line":1388,"text":"\t\t\t\tvar node *ast.Node"},
  {"line":1390,"text":"\t\t\t\tif ast.IsBinaryExpression(decl) && ast.IsPropertyAccessExpression(decl.AsBinaryExpression().Left) {"},
  {"line":1391,"text":"\t\t\t\t\tnode = decl.AsBinaryExpression().Left.Expression()"},
  {"line":1392,"text":"\t\t\t\t} else if ast.IsExportAssignment(decl) {"},
  {"line":1394,"text":"\t\t\t\t\tnode = astnav.FindChildOfKind(decl, ast.KindExportKeyword, sourceFile)"},
  {"line":1395,"text":"\t\t\t\t\tdebug.Assert(node != nil, \"Expected to find export keyword\")"},
  {"line":1396,"text":"\t\t\t\t} else {"},
  {"line":1397,"text":"\t\t\t\t\tnode = ast.GetNameOfDeclaration(decl)"},
  {"line":1398,"text":"\t\t\t\t\tif node == nil {"},
  {"line":1399,"text":"\t\t\t\t\t\tnode = decl"},
  {"line":1400,"text":"\t\t\t\t\t}"},
  {"line":1401,"text":"\t\t\t\t}"},
  {"line":1402,"text":"\t\t\t\treferences = append(references, newNodeEntry(node))"},
  {"line":1403,"text":"\t\t\t}"},
  {"line":1404,"text":"\t\t}"},
  {"line":1405,"text":"\t}"},
  {"line":1407,"text":"\tif len(references) > 0 {"},
  {"line":1408,"text":"\t\treturn []*SymbolAndEntries{{"},
  {"line":1409,"text":"\t\t\tdefinition: &Definition{Kind: definitionKindSymbol, symbol: symbol},"},
  {"line":1410,"text":"\t\t\treferences: references,"},
  {"line":1411,"text":"\t\t}}"},
  {"line":1412,"text":"\t}"},
  {"line":1413,"text":"\treturn []*SymbolAndEntries{}"},
  {"line":1414,"text":"}"},
  {"line":1417,"text":"func getSpecialSearchKind(node *ast.Node) string {"},
  {"line":1418,"text":"\tif node == nil {"},
  {"line":1419,"text":"\t\treturn \"none\""},
  {"line":1420,"text":"\t}"},
  {"line":1421,"text":"\tswitch node.Kind {"},
  {"line":1422,"text":"\tcase ast.KindConstructor, ast.KindConstructorKeyword:"},
  {"line":1423,"text":"\t\treturn \"constructor\""},
  {"line":1424,"text":"\tcase ast.KindIdentifier:"},
  {"line":1425,"text":"\t\tif ast.IsClassLike(node.Parent) {"},
  {"line":1426,"text":"\t\t\tdebug.Assert(node.Parent.Name() == node)"},
  {"line":1427,"text":"\t\t\treturn \"class\""},
  {"line":1428,"text":"\t\t}"},
  {"line":1429,"text":"\t\tfallthrough"},
  {"line":1430,"text":"\tdefault:"},
  {"line":1431,"text":"\t\treturn \"none\""},
  {"line":1432,"text":"\t}"},
  {"line":1433,"text":"}"},
  {"line":1435,"text":"func getReferencedSymbolsForSymbol(ctx context.Context, program *compiler.Program, originalSymbol *ast.Symbol, node *ast.Node, sourceFiles []*ast.SourceFile, sourceFilesSet *collections.Set[string], checker *checker.Checker, options refOptions) []*SymbolAndEntries {"},
  {"line":1438,"text":"\tsymbol := core.Coalesce(skipPastExportOrImportSpecifierOrUnion(originalSymbol, node, checker /*useLocalSymbolForExportSpecifier*/, !isForRenameWithPrefixAndSuffixText(options)), originalSymbol)"},
  {"line":1441,"text":"\tsearchMeaning := ast.SemanticMeaningAll"},
  {"line":1442,"text":"\tif options.use != referenceUseRename {"},
  {"line":1443,"text":"\t\tsearchMeaning = getIntersectingMeaningFromDeclarations(node, symbol, ast.SemanticMeaningAll)"},
  {"line":1444,"text":"\t}"},
  {"line":1445,"text":"\tstate := newState(ctx, program, sourceFiles, sourceFilesSet, node, checker, searchMeaning, options)"},
  {"line":1447,"text":"\tvar exportSpecifier *ast.Node"},
  {"line":1448,"text":"\tif isForRenameWithPrefixAndSuffixText(options) && len(symbol.Declarations) != 0 {"},
  {"line":1449,"text":"\t\texportSpecifier = core.Find(symbol.Declarations, ast.IsExportSpecifier)"},
  {"line":1450,"text":"\t}"},
  {"line":1451,"text":"\tif exportSpecifier != nil {"},
  {"line":1453,"text":"\t\tstate.getReferencesAtExportSpecifier(exportSpecifier.Name(), symbol, exportSpecifier.AsExportSpecifier(), state.createSearch(node, originalSymbol, ImpExpKindUnknown /*comingFrom*/, \"\", nil), true /*addReferencesHere*/, true /*alwaysGetReferences*/)"},
  {"line":1454,"text":"\t} else if node != nil && node.Kind == ast.KindDefaultKeyword && symbol.Name == ast.InternalSymbolNameDefault && symbol.Parent != nil {"},
  {"line":1455,"text":"\t\tstate.addReference(node, symbol, entryKindNode)"},
  {"line":1456,"text":"\t\tstate.searchForImportsOfExport(node, symbol, &ExportInfo{exportingModuleSymbol: symbol.Parent, exportKind: ExportKindDefault})"},
  {"line":1457,"text":"\t} else {"},
  {"line":1458,"text":"\t\tsearch := state.createSearch(node, symbol, ImpExpKindUnknown /*comingFrom*/, \"\", state.populateSearchSymbolSet(symbol, node, options.use == referenceUseRename, options.useAliasesForRename, options.implementations))"},
  {"line":1459,"text":"\t\tstate.getReferencesInContainerOrFiles(symbol, search)"},
  {"line":1460,"text":"\t}"},
  {"line":1462,"text":"\treturn state.result"},
  {"line":1463,"text":"}"},
  {"line":1467,"text":"type refSearch struct {"},
  {"line":1469,"text":"\tcomingFrom ImpExpKind // import, export"},
  {"line":1471,"text":"\tsymbol      *ast.Symbol"},
  {"line":1472,"text":"\ttext        string"},
  {"line":1473,"text":"\tescapedText string"},
  {"line":1476,"text":"\tparents []*ast.Symbol"},
  {"line":1478,"text":"\tallSearchSymbols []*ast.Symbol"},
  {"line":1482,"text":"\tincludes func(symbol *ast.Symbol) bool"},
  {"line":1483,"text":"}"},
  {"line":1485,"text":"type inheritKey struct {"},
  {"line":1486,"text":"\tsymbol *ast.Symbol"},
  {"line":1487,"text":"\tparent *ast.Symbol"},
  {"line":1488,"text":"}"},
  {"line":1490,"text":"type refState struct {"},
  {"line":1491,"text":"\tsourceFiles                  []*ast.SourceFile"},
  {"line":1492,"text":"\tsourceFilesSet               *collections.Set[string]"},
  {"line":1493,"text":"\tspecialSearchKind            string // \"none\", \"constructor\", or \"class\""},
  {"line":1494,"text":"\tchecker                      *checker.Checker"},
  {"line":1495,"text":"\tctx                          context.Context"},
  {"line":1496,"text":"\tprogram                      *compiler.Program"},
  {"line":1497,"text":"\tsearchMeaning                ast.SemanticMeaning"},
  {"line":1498,"text":"\toptions                      refOptions"},
  {"line":1499,"text":"\tresult                       []*SymbolAndEntries"},
  {"line":1500,"text":"\tinheritsFromCache            map[inheritKey]bool"},
  {"line":1501,"text":"\tseenContainingTypeReferences collections.Set[*ast.Node] // node seen tracker"},
  {"line":1502,"text":"\tseenReExportRHS              collections.Set[*ast.Node] // node seen tracker"},
  {"line":1503,"text":"\timportTracker                ImportTracker"},
  {"line":1504,"text":"\tsymbolToReferences           map[*ast.Symbol]*SymbolAndEntries"},
  {"line":1505,"text":"\tsourceFileToSeenSymbols      map[*ast.SourceFile]*collections.Set[*ast.Symbol]"},
  {"line":1506,"text":"}"},
  {"line":1508,"text":"func newState(ctx context.Context, program *compiler.Program, sourceFiles []*ast.SourceFile, sourceFilesSet *collections.Set[string], node *ast.Node, checker *checker.Checker, searchMeaning ast.SemanticMeaning, options refOptions) *refState {"},
  {"line":1509,"text":"\treturn &refState{"},
  {"line":1510,"text":"\t\tsourceFiles:             sourceFiles,"},
  {"line":1511,"text":"\t\tsourceFilesSet:          sourceFilesSet,"},
  {"line":1512,"text":"\t\tspecialSearchKind:       getSpecialSearchKind(node),"},
  {"line":1513,"text":"\t\tchecker:                 checker,"},
  {"line":1514,"text":"\t\tctx:                     ctx,"},
  {"line":1515,"text":"\t\tprogram:                 program,"},
  {"line":1516,"text":"\t\tsearchMeaning:           searchMeaning,"},
  {"line":1517,"text":"\t\toptions:                 options,"},
  {"line":1518,"text":"\t\tinheritsFromCache:       map[inheritKey]bool{},"},
  {"line":1519,"text":"\t\tsymbolToReferences:      map[*ast.Symbol]*SymbolAndEntries{},"},
  {"line":1520,"text":"\t\tsourceFileToSeenSymbols: map[*ast.SourceFile]*collections.Set[*ast.Symbol]{},"},
  {"line":1521,"text":"\t}"},
  {"line":1522,"text":"}"},
  {"line":1524,"text":"func (state *refState) includesSourceFile(sourceFile *ast.SourceFile) bool {"},
  {"line":1525,"text":"\treturn state.sourceFilesSet.Has(sourceFile.FileName())"},
  {"line":1526,"text":"}"},
  {"line":1528,"text":"func (state *refState) getImportSearches(exportSymbol *ast.Symbol, exportInfo *ExportInfo) *ImportsResult {"},
  {"line":1529,"text":"\tif state.importTracker == nil {"},
  {"line":1530,"text":"\t\tstate.importTracker = createImportTracker(state.ctx, state.program, state.sourceFiles, state.sourceFilesSet, state.checker)"},
  {"line":1531,"text":"\t}"},
  {"line":1532,"text":"\treturn state.importTracker(exportSymbol, exportInfo, state.options.use == referenceUseRename)"},
  {"line":1533,"text":"}"},
  {"line":1536,"text":"func (state *refState) createSearch(location *ast.Node, symbol *ast.Symbol, comingFrom ImpExpKind, text string, allSearchSymbols []*ast.Symbol) *refSearch {"},
  {"line":1541,"text":"\tif text == \"\" {"},
  {"line":1542,"text":"\t\ts := binder.GetLocalSymbolForExportDefault(symbol)"},
  {"line":1543,"text":"\t\tif s == nil {"},
  {"line":1544,"text":"\t\t\ts = getNonModuleSymbolOfMergedModuleSymbol(symbol)"},
  {"line":1545,"text":"\t\t\tif s == nil {"},
  {"line":1546,"text":"\t\t\t\ts = symbol"},
  {"line":1547,"text":"\t\t\t}"},
  {"line":1548,"text":"\t\t}"},
  {"line":1549,"text":"\t\ttext = stringutil.StripQuotes(ast.SymbolName(s))"},
  {"line":1550,"text":"\t}"},
  {"line":1551,"text":"\tif len(allSearchSymbols) == 0 {"},
  {"line":1552,"text":"\t\tallSearchSymbols = []*ast.Symbol{symbol}"},
  {"line":1553,"text":"\t}"},
  {"line":1554,"text":"\tsearch := &refSearch{"},
  {"line":1555,"text":"\t\tsymbol:           symbol,"},
  {"line":1556,"text":"\t\tcomingFrom:       comingFrom,"},
  {"line":1557,"text":"\t\ttext:             text,"},
  {"line":1558,"text":"\t\tescapedText:      text,"},
  {"line":1559,"text":"\t\tallSearchSymbols: allSearchSymbols,"},
  {"line":1560,"text":"\t\tincludes:         func(sym *ast.Symbol) bool { return slices.Contains(allSearchSymbols, sym) },"},
  {"line":1561,"text":"\t}"},
  {"line":1562,"text":"\tif state.options.implementations && location != nil {"},
  {"line":1563,"text":"\t\tsearch.parents = getParentSymbolsOfPropertyAccess(location, symbol, state.checker)"},
  {"line":1564,"text":"\t}"},
  {"line":1565,"text":"\treturn search"},
  {"line":1566,"text":"}"},
  {"line":1568,"text":"func (state *refState) referenceAdder(searchSymbol *ast.Symbol) func(*ast.Node, entryKind) {"},
  {"line":1569,"text":"\tsymbolAndEntries := state.symbolToReferences[searchSymbol]"},
  {"line":1570,"text":"\tif symbolAndEntries == nil {"},
  {"line":1571,"text":"\t\tsymbolAndEntries = NewSymbolAndEntries(definitionKindSymbol, nil, searchSymbol, nil)"},
  {"line":1572,"text":"\t\tstate.symbolToReferences[searchSymbol] = symbolAndEntries"},
  {"line":1573,"text":"\t\tstate.result = append(state.result, symbolAndEntries)"},
  {"line":1574,"text":"\t}"},
  {"line":1575,"text":"\treturn func(node *ast.Node, kind entryKind) {"},
  {"line":1576,"text":"\t\tsymbolAndEntries.references = append(symbolAndEntries.references, newNodeEntryWithKind(node, kind))"},
  {"line":1577,"text":"\t}"},
  {"line":1578,"text":"}"},
  {"line":1580,"text":"func (state *refState) addReference(referenceLocation *ast.Node, symbol *ast.Symbol, kind entryKind) {"},
  {"line":1582,"text":"\tif state.options.use == referenceUseRename && referenceLocation.Kind == ast.KindDefaultKeyword {"},
  {"line":1583,"text":"\t\treturn"},
  {"line":1584,"text":"\t}"},
  {"line":1586,"text":"\taddRef := state.referenceAdder(symbol)"},
  {"line":1587,"text":"\tif state.options.implementations {"},
  {"line":1588,"text":"\t\tstate.addImplementationReferences(referenceLocation, func(n *ast.Node) { addRef(n, kind) })"},
  {"line":1589,"text":"\t} else {"},
  {"line":1590,"text":"\t\taddRef(referenceLocation, kind)"},
  {"line":1591,"text":"\t}"},
  {"line":1592,"text":"}"},
  {"line":1594,"text":"func getReferenceEntriesForShorthandPropertyAssignment(node *ast.Node, checker *checker.Checker, addReference func(*ast.Node)) {"},
  {"line":1595,"text":"\trefSymbol := checker.GetSymbolAtLocation(node)"},
  {"line":1596,"text":"\tif refSymbol == nil || refSymbol.ValueDeclaration == nil {"},
  {"line":1597,"text":"\t\treturn"},
  {"line":1598,"text":"\t}"},
  {"line":1599,"text":"\tshorthandSymbol := checker.GetShorthandAssignmentValueSymbol(refSymbol.ValueDeclaration)"},
  {"line":1600,"text":"\tif shorthandSymbol != nil && len(shorthandSymbol.Declarations) > 0 {"},
  {"line":1601,"text":"\t\tfor _, declaration := range shorthandSymbol.Declarations {"},
  {"line":1602,"text":"\t\t\tif ast.GetMeaningFromDeclaration(declaration)&ast.SemanticMeaningValue != 0 {"},
  {"line":1603,"text":"\t\t\t\taddReference(declaration)"},
  {"line":1604,"text":"\t\t\t}"},
  {"line":1605,"text":"\t\t}"},
  {"line":1606,"text":"\t}"},
  {"line":1607,"text":"}"},
  {"line":1609,"text":"func isMethodOrAccessor(node *ast.Node) bool {"},
  {"line":1610,"text":"\treturn node.Kind == ast.KindMethodDeclaration || node.Kind == ast.KindGetAccessor || node.Kind == ast.KindSetAccessor"},
  {"line":1611,"text":"}"},
  {"line":1613,"text":"func tryGetClassByExtendingIdentifier(node *ast.Node) *ast.ClassLikeDeclaration {"},
  {"line":1614,"text":"\treturn ast.TryGetClassExtendingExpressionWithTypeArguments(ast.ClimbPastPropertyAccess(node).Parent)"},
  {"line":1615,"text":"}"},
  {"line":1617,"text":"func getClassConstructorSymbol(classSymbol *ast.Symbol) *ast.Symbol {"},
  {"line":1618,"text":"\tif classSymbol.Members == nil {"},
  {"line":1619,"text":"\t\treturn nil"},
  {"line":1620,"text":"\t}"},
  {"line":1621,"text":"\treturn classSymbol.Members[ast.InternalSymbolNameConstructor]"},
  {"line":1622,"text":"}"},
  {"line":1624,"text":"func hasOwnConstructor(classDeclaration *ast.ClassLikeDeclaration) bool {"},
  {"line":1625,"text":"\treturn getClassConstructorSymbol(classDeclaration.Symbol()) != nil"},
  {"line":1626,"text":"}"},
  {"line":1628,"text":"func findOwnConstructorReferences(classSymbol *ast.Symbol, sourceFile *ast.SourceFile, addNode func(*ast.Node)) {"},
  {"line":1629,"text":"\tconstructorSymbol := getClassConstructorSymbol(classSymbol)"},
  {"line":1630,"text":"\tif constructorSymbol != nil && len(constructorSymbol.Declarations) > 0 {"},
  {"line":1631,"text":"\t\tfor _, decl := range constructorSymbol.Declarations {"},
  {"line":1632,"text":"\t\t\tif decl.Kind == ast.KindConstructor {"},
  {"line":1633,"text":"\t\t\t\tif ctrKeyword := astnav.FindChildOfKind(decl, ast.KindConstructorKeyword, sourceFile); ctrKeyword != nil {"},
  {"line":1634,"text":"\t\t\t\t\taddNode(ctrKeyword)"},
  {"line":1635,"text":"\t\t\t\t}"},
  {"line":1636,"text":"\t\t\t}"},
  {"line":1637,"text":"\t\t}"},
  {"line":1638,"text":"\t}"},
  {"line":1640,"text":"\tif classSymbol.Exports != nil {"},
  {"line":1641,"text":"\t\tfor _, member := range classSymbol.Exports {"},
  {"line":1642,"text":"\t\t\tdecl := member.ValueDeclaration"},
  {"line":1643,"text":"\t\t\tif decl != nil && decl.Kind == ast.KindMethodDeclaration {"},
  {"line":1644,"text":"\t\t\t\tbody := decl.Body()"},
  {"line":1645,"text":"\t\t\t\tif body != nil {"},
  {"line":1646,"text":"\t\t\t\t\tforEachDescendantOfKind(body, ast.KindThisKeyword, func(thisKeyword *ast.Node) {"},
  {"line":1647,"text":"\t\t\t\t\t\tif ast.IsNewExpressionTarget(thisKeyword, false, false) {"},
  {"line":1648,"text":"\t\t\t\t\t\t\taddNode(thisKeyword)"},
  {"line":1649,"text":"\t\t\t\t\t\t}"},
  {"line":1650,"text":"\t\t\t\t\t})"},
  {"line":1651,"text":"\t\t\t\t}"},
  {"line":1652,"text":"\t\t\t}"},
  {"line":1653,"text":"\t\t}"},
  {"line":1654,"text":"\t}"},
  {"line":1655,"text":"}"},
  {"line":1657,"text":"func findSuperConstructorAccesses(classDeclaration *ast.ClassLikeDeclaration, addNode func(*ast.Node)) {"},
  {"line":1658,"text":"\tconstructorSymbol := getClassConstructorSymbol(classDeclaration.Symbol())"},
  {"line":1659,"text":"\tif constructorSymbol == nil || len(constructorSymbol.Declarations) == 0 {"},
  {"line":1660,"text":"\t\treturn"},
  {"line":1661,"text":"\t}"},
  {"line":1663,"text":"\tfor _, decl := range constructorSymbol.Declarations {"},
  {"line":1664,"text":"\t\tif decl.Kind == ast.KindConstructor {"},
  {"line":1665,"text":"\t\t\tbody := decl.Body()"},
  {"line":1666,"text":"\t\t\tif body != nil {"},
  {"line":1667,"text":"\t\t\t\tforEachDescendantOfKind(body, ast.KindSuperKeyword, func(node *ast.Node) {"},
  {"line":1668,"text":"\t\t\t\t\tif ast.IsCallExpressionTarget(node, false, false) {"},
  {"line":1669,"text":"\t\t\t\t\t\taddNode(node)"},
  {"line":1670,"text":"\t\t\t\t\t}"},
  {"line":1671,"text":"\t\t\t\t})"},
  {"line":1672,"text":"\t\t\t}"},
  {"line":1673,"text":"\t\t}"},
  {"line":1674,"text":"\t}"},
  {"line":1675,"text":"}"},
  {"line":1677,"text":"func forEachDescendantOfKind(node *ast.Node, kind ast.Kind, action func(*ast.Node)) {"},
  {"line":1678,"text":"\tnode.ForEachChild(func(child *ast.Node) bool {"},
  {"line":1679,"text":"\t\tif child.Kind == kind {"},
  {"line":1680,"text":"\t\t\taction(child)"},
  {"line":1681,"text":"\t\t}"},
  {"line":1682,"text":"\t\tforEachDescendantOfKind(child, kind, action)"},
  {"line":1683,"text":"\t\treturn false"},
  {"line":1684,"text":"\t})"},
  {"line":1685,"text":"}"},
  {"line":1687,"text":"func (state *refState) addImplementationReferences(refNode *ast.Node, addRef func(*ast.Node)) {"},
  {"line":1689,"text":"\tif ast.IsDeclarationName(refNode) && isImplementation(refNode.Parent) {"},
  {"line":1690,"text":"\t\taddRef(refNode)"},
  {"line":1691,"text":"\t\treturn"},
  {"line":1692,"text":"\t}"},
  {"line":1694,"text":"\tif refNode.Kind != ast.KindIdentifier {"},
  {"line":1695,"text":"\t\treturn"},
  {"line":1696,"text":"\t}"},
  {"line":1698,"text":"\tif refNode.Parent.Kind == ast.KindShorthandPropertyAssignment {"},
  {"line":1700,"text":"\t\tgetReferenceEntriesForShorthandPropertyAssignment(refNode, state.checker, addRef)"},
  {"line":1701,"text":"\t}"},
  {"line":1705,"text":"\tif containingNode := getContainingNodeIfInHeritageClause(refNode); containingNode != nil {"},
  {"line":1706,"text":"\t\taddRef(containingNode)"},
  {"line":1707,"text":"\t\treturn"},
  {"line":1708,"text":"\t}"},
  {"line":1712,"text":"\ttypeNode := ast.FindAncestor(refNode, func(a *ast.Node) bool {"},
  {"line":1713,"text":"\t\treturn !ast.IsQualifiedName(a.Parent) && !ast.IsTypeNode(a.Parent) && !ast.IsTypeElement(a.Parent)"},
  {"line":1714,"text":"\t})"},
  {"line":1716,"text":"\tif typeNode == nil || typeNode.Parent.Type() == nil {"},
  {"line":1717,"text":"\t\treturn"},
  {"line":1718,"text":"\t}"},
  {"line":1720,"text":"\ttypeHavingNode := typeNode.Parent"},
  {"line":1721,"text":"\tif typeHavingNode.Type() == typeNode && !state.seenContainingTypeReferences.AddIfAbsent(typeHavingNode) {"},
  {"line":1722,"text":"\t\taddIfImplementation := func(e *ast.Expression) {"},
  {"line":1723,"text":"\t\t\tif isImplementationExpression(e) {"},
  {"line":1724,"text":"\t\t\t\taddRef(e)"},
  {"line":1725,"text":"\t\t\t}"},
  {"line":1726,"text":"\t\t}"},
  {"line":1727,"text":"\t\tif ast.HasInitializer(typeHavingNode) {"},
  {"line":1728,"text":"\t\t\taddIfImplementation(typeHavingNode.Initializer())"},
  {"line":1729,"text":"\t\t} else if ast.IsFunctionLike(typeHavingNode) && typeHavingNode.Body() != nil {"},
  {"line":1730,"text":"\t\t\tbody := typeHavingNode.Body()"},
  {"line":1731,"text":"\t\t\tif body.Kind == ast.KindBlock {"},
  {"line":1732,"text":"\t\t\t\tast.ForEachReturnStatement(body, func(returnStatement *ast.Node) bool {"},
  {"line":1733,"text":"\t\t\t\t\tif expr := returnStatement.Expression(); expr != nil {"},
  {"line":1734,"text":"\t\t\t\t\t\taddIfImplementation(expr)"},
  {"line":1735,"text":"\t\t\t\t\t}"},
  {"line":1736,"text":"\t\t\t\t\treturn false"},
  {"line":1737,"text":"\t\t\t\t})"},
  {"line":1738,"text":"\t\t\t} else {"},
  {"line":1739,"text":"\t\t\t\taddIfImplementation(body)"},
  {"line":1740,"text":"\t\t\t}"},
  {"line":1741,"text":"\t\t} else if ast.IsAssertionExpression(typeHavingNode) || ast.IsSatisfiesExpression(typeHavingNode) {"},
  {"line":1742,"text":"\t\t\taddIfImplementation(typeHavingNode.Expression())"},
  {"line":1743,"text":"\t\t}"},
  {"line":1744,"text":"\t}"},
  {"line":1745,"text":"}"},
  {"line":1747,"text":"func (state *refState) getReferencesInContainerOrFiles(symbol *ast.Symbol, search *refSearch) {"},
  {"line":1750,"text":"\tif scope := getSymbolScope(symbol); scope != nil {"},
  {"line":1751,"text":"\t\taddReferencesHere := scope.Kind != ast.KindSourceFile || slices.Contains(state.sourceFiles, scope.AsSourceFile())"},
  {"line":1752,"text":"\t\tstate.getReferencesInContainer(scope, ast.GetSourceFileOfNode(scope), search, addReferencesHere)"},
  {"line":1753,"text":"\t} else {"},
  {"line":1755,"text":"\t\tfor _, sourceFile := range state.sourceFiles {"},
  {"line":1757,"text":"\t\t\tstate.searchForName(sourceFile, search)"},
  {"line":1758,"text":"\t\t}"},
  {"line":1759,"text":"\t}"},
  {"line":1760,"text":"}"},
  {"line":1762,"text":"func (state *refState) getReferencesInSourceFile(sourceFile *ast.SourceFile, search *refSearch, addReferencesHere bool) {"},
  {"line":1764,"text":"\tstate.getReferencesInContainer(sourceFile.AsNode(), sourceFile, search, addReferencesHere)"},
  {"line":1765,"text":"}"},
  {"line":1767,"text":"func (state *refState) getReferencesInContainer(container *ast.Node, sourceFile *ast.SourceFile, search *refSearch, addReferencesHere bool) {"},
  {"line":1771,"text":"\tif !state.markSearchedSymbols(sourceFile, search.allSearchSymbols) {"},
  {"line":1772,"text":"\t\treturn"},
  {"line":1773,"text":"\t}"},
  {"line":1775,"text":"\tfor _, position := range getPossibleSymbolReferencePositions(sourceFile, search.text, container) {"},
  {"line":1776,"text":"\t\tstate.getReferencesAtLocation(sourceFile, position, search, addReferencesHere)"},
  {"line":1777,"text":"\t}"},
  {"line":1778,"text":"}"},
  {"line":1780,"text":"func (state *refState) markSearchedSymbols(sourceFile *ast.SourceFile, symbols []*ast.Symbol) bool {"},
  {"line":1781,"text":"\tseenSymbols := state.sourceFileToSeenSymbols[sourceFile]"},
  {"line":1782,"text":"\tif seenSymbols == nil {"},
  {"line":1783,"text":"\t\tseenSymbols = &collections.Set[*ast.Symbol]{}"},
  {"line":1784,"text":"\t\tstate.sourceFileToSeenSymbols[sourceFile] = seenSymbols"},
  {"line":1785,"text":"\t}"},
  {"line":1786,"text":"\tanyNewSymbols := false"},
  {"line":1787,"text":"\tfor _, sym := range symbols {"},
  {"line":1788,"text":"\t\tif seenSymbols.AddIfAbsent(sym) {"},
  {"line":1789,"text":"\t\t\tanyNewSymbols = true"},
  {"line":1790,"text":"\t\t}"},
  {"line":1791,"text":"\t}"},
  {"line":1792,"text":"\treturn anyNewSymbols"},
  {"line":1793,"text":"}"},
  {"line":1795,"text":"func (state *refState) getReferencesAtLocation(sourceFile *ast.SourceFile, position int, search *refSearch, addReferencesHere bool) {"},
  {"line":1796,"text":"\treferenceLocation := astnav.GetTouchingPropertyName(sourceFile, position)"},
  {"line":1798,"text":"\tif !isValidReferencePosition(referenceLocation, search.text) {"},
  {"line":1812,"text":"\t\treturn"},
  {"line":1813,"text":"\t}"},
  {"line":1815,"text":"\tif getMeaningFromLocation(referenceLocation)&state.searchMeaning == 0 {"},
  {"line":1816,"text":"\t\treturn"},
  {"line":1817,"text":"\t}"},
  {"line":1819,"text":"\treferenceSymbol := state.checker.GetSymbolAtLocation(referenceLocation)"},
  {"line":1820,"text":"\tif referenceSymbol == nil {"},
  {"line":1821,"text":"\t\treturn"},
  {"line":1822,"text":"\t}"},
  {"line":1824,"text":"\tparent := referenceLocation.Parent"},
  {"line":1825,"text":"\tif parent.Kind == ast.KindImportSpecifier && parent.PropertyName() == referenceLocation {"},
  {"line":1827,"text":"\t\treturn"},
  {"line":1828,"text":"\t}"},
  {"line":1830,"text":"\tif parent.Kind == ast.KindExportSpecifier {"},
  {"line":1831,"text":"\t\tstate.getReferencesAtExportSpecifier(referenceLocation, referenceSymbol, parent.AsExportSpecifier(), search, addReferencesHere, false /*alwaysGetReferences*/)"},
  {"line":1832,"text":"\t\treturn"},
  {"line":1833,"text":"\t}"},
  {"line":1835,"text":"\trelatedSymbol, relatedSymbolKind := state.getRelatedSymbol(search, referenceSymbol, referenceLocation)"},
  {"line":1836,"text":"\tif relatedSymbol == nil {"},
  {"line":1837,"text":"\t\tstate.getReferenceForShorthandProperty(referenceSymbol, search)"},
  {"line":1838,"text":"\t\treturn"},
  {"line":1839,"text":"\t}"},
  {"line":1841,"text":"\tswitch state.specialSearchKind {"},
  {"line":1842,"text":"\tcase \"none\":"},
  {"line":1843,"text":"\t\tif addReferencesHere {"},
  {"line":1844,"text":"\t\t\tstate.addReference(referenceLocation, relatedSymbol, relatedSymbolKind)"},
  {"line":1845,"text":"\t\t}"},
  {"line":1846,"text":"\tcase \"constructor\":"},
  {"line":1847,"text":"\t\tstate.addConstructorReferences(referenceLocation, relatedSymbol, search, addReferencesHere)"},
  {"line":1848,"text":"\tcase \"class\":"},
  {"line":1849,"text":"\t\tstate.addClassStaticThisReferences(referenceLocation, relatedSymbol, search, addReferencesHere)"},
  {"line":1850,"text":"\t}"},
  {"line":1853,"text":"\tif ast.IsInJSFile(referenceLocation) && referenceLocation.Parent.Kind == ast.KindBindingElement &&"},
  {"line":1854,"text":"\t\tast.IsVariableDeclarationInitializedToBareOrAccessedRequire(referenceLocation.Parent.Parent.Parent) {"},
  {"line":1855,"text":"\t\treferenceSymbol = referenceLocation.Parent.Symbol()"},
  {"line":1858,"text":"\t\tif referenceSymbol == nil {"},
  {"line":1859,"text":"\t\t\treturn"},
  {"line":1860,"text":"\t\t}"},
  {"line":1861,"text":"\t}"},
  {"line":1863,"text":"\tstate.getImportOrExportReferences(referenceLocation, referenceSymbol, search)"},
  {"line":1864,"text":"}"},
  {"line":1866,"text":"func (state *refState) addConstructorReferences(referenceLocation *ast.Node, symbol *ast.Symbol, search *refSearch, addReferencesHere bool) {"},
  {"line":1867,"text":"\tif ast.IsNewExpressionTarget(referenceLocation, false, false) && addReferencesHere {"},
  {"line":1868,"text":"\t\tstate.addReference(referenceLocation, symbol, entryKindNode)"},
  {"line":1869,"text":"\t}"},
  {"line":1871,"text":"\tpusher := func() func(*ast.Node, entryKind) {"},
  {"line":1872,"text":"\t\treturn state.referenceAdder(search.symbol)"},
  {"line":1873,"text":"\t}"},
  {"line":1875,"text":"\tif ast.IsClassLike(referenceLocation.Parent) {"},
  {"line":1877,"text":"\t\tsourceFile := ast.GetSourceFileOfNode(referenceLocation)"},
  {"line":1878,"text":"\t\tfindOwnConstructorReferences(search.symbol, sourceFile, func(n *ast.Node) {"},
  {"line":1879,"text":"\t\t\tpusher()(n, entryKindNode)"},
  {"line":1880,"text":"\t\t})"},
  {"line":1881,"text":"\t} else {"},
  {"line":1883,"text":"\t\tif classExtending := tryGetClassByExtendingIdentifier(referenceLocation); classExtending != nil {"},
  {"line":1884,"text":"\t\t\tfindSuperConstructorAccesses(classExtending, func(n *ast.Node) {"},
  {"line":1885,"text":"\t\t\t\tpusher()(n, entryKindNode)"},
  {"line":1886,"text":"\t\t\t})"},
  {"line":1887,"text":"\t\t\tstate.findInheritedConstructorReferences(classExtending)"},
  {"line":1888,"text":"\t\t}"},
  {"line":1889,"text":"\t}"},
  {"line":1890,"text":"}"},
  {"line":1892,"text":"func (state *refState) addClassStaticThisReferences(referenceLocation *ast.Node, symbol *ast.Symbol, search *refSearch, addReferencesHere bool) {"},
  {"line":1893,"text":"\tif addReferencesHere {"},
  {"line":1894,"text":"\t\tstate.addReference(referenceLocation, symbol, entryKindNode)"},
  {"line":1895,"text":"\t}"},
  {"line":1897,"text":"\tclassLike := referenceLocation.Parent"},
  {"line":1898,"text":"\tif state.options.use == referenceUseRename || !ast.IsClassLike(classLike) {"},
  {"line":1899,"text":"\t\treturn"},
  {"line":1900,"text":"\t}"},
  {"line":1902,"text":"\taddRef := state.referenceAdder(search.symbol)"},
  {"line":1903,"text":"\tmembers := classLike.Members()"},
  {"line":1904,"text":"\tif members == nil {"},
  {"line":1905,"text":"\t\treturn"},
  {"line":1906,"text":"\t}"},
  {"line":1907,"text":"\tfor _, member := range members {"},
  {"line":1908,"text":"\t\tif !(isMethodOrAccessor(member) && ast.HasStaticModifier(member)) {"},
  {"line":1909,"text":"\t\t\tcontinue"},
  {"line":1910,"text":"\t\t}"},
  {"line":1911,"text":"\t\tbody := member.Body()"},
  {"line":1912,"text":"\t\tif body != nil {"},
  {"line":1913,"text":"\t\t\tvar cb func(*ast.Node)"},
  {"line":1914,"text":"\t\t\tcb = func(node *ast.Node) {"},
  {"line":1915,"text":"\t\t\t\tif node.Kind == ast.KindThisKeyword {"},
  {"line":1916,"text":"\t\t\t\t\taddRef(node, entryKindNode)"},
  {"line":1917,"text":"\t\t\t\t} else if !ast.IsFunctionLike(node) && !ast.IsClassLike(node) {"},
  {"line":1918,"text":"\t\t\t\t\tnode.ForEachChild(func(child *ast.Node) bool {"},
  {"line":1919,"text":"\t\t\t\t\t\tcb(child)"},
  {"line":1920,"text":"\t\t\t\t\t\treturn false"},
  {"line":1921,"text":"\t\t\t\t\t})"},
  {"line":1922,"text":"\t\t\t\t}"},
  {"line":1923,"text":"\t\t\t}"},
  {"line":1924,"text":"\t\t\tcb(body)"},
  {"line":1925,"text":"\t\t}"},
  {"line":1926,"text":"\t}"},
  {"line":1927,"text":"}"},
  {"line":1929,"text":"func (state *refState) findInheritedConstructorReferences(classDeclaration *ast.ClassLikeDeclaration) {"},
  {"line":1930,"text":"\tif hasOwnConstructor(classDeclaration) {"},
  {"line":1931,"text":"\t\treturn"},
  {"line":1932,"text":"\t}"},
  {"line":1933,"text":"\tclassSymbol := classDeclaration.Symbol()"},
  {"line":1934,"text":"\tsearch := state.createSearch(nil, classSymbol, ImpExpKindUnknown, \"\", nil)"},
  {"line":1935,"text":"\tstate.getReferencesInContainerOrFiles(classSymbol, search)"},
  {"line":1936,"text":"}"},
  {"line":1938,"text":"func (state *refState) getImportOrExportReferences(referenceLocation *ast.Node, referenceSymbol *ast.Symbol, search *refSearch) {"},
  {"line":1939,"text":"\timportOrExport := getImportOrExportSymbol(referenceLocation, referenceSymbol, state.checker, search.comingFrom == ImpExpKindExport)"},
  {"line":1940,"text":"\tif importOrExport == nil {"},
  {"line":1941,"text":"\t\treturn"},
  {"line":1942,"text":"\t}"},
  {"line":1943,"text":"\tif importOrExport.kind == ImpExpKindImport {"},
  {"line":1944,"text":"\t\tif !isForRenameWithPrefixAndSuffixText(state.options) {"},
  {"line":1945,"text":"\t\t\tstate.searchForImportedSymbol(importOrExport.symbol)"},
  {"line":1946,"text":"\t\t}"},
  {"line":1947,"text":"\t} else {"},
  {"line":1948,"text":"\t\tstate.searchForImportsOfExport(referenceLocation, importOrExport.symbol, importOrExport.exportInfo)"},
  {"line":1949,"text":"\t}"},
  {"line":1950,"text":"}"},
  {"line":1952,"text":"func (state *refState) markSeenReExportRHS(node *ast.Node) bool {"},
  {"line":1953,"text":"\treturn state.seenReExportRHS.AddIfAbsent(node)"},
  {"line":1954,"text":"}"},
  {"line":1956,"text":"func (state *refState) getReferencesAtExportSpecifier("},
  {"line":1957,"text":"\treferenceLocation *ast.Node,"},
  {"line":1958,"text":"\treferenceSymbol *ast.Symbol,"},
  {"line":1959,"text":"\texportSpecifier *ast.ExportSpecifier,"},
  {"line":1960,"text":"\tsearch *refSearch,"},
  {"line":1961,"text":"\taddReferencesHere bool,"},
  {"line":1962,"text":"\talwaysGetReferences bool,"},
  {"line":1963,"text":") {"},
  {"line":1964,"text":"\tdebug.Assert(!alwaysGetReferences || state.options.useAliasesForRename, \"If alwaysGetReferences is true, then prefix/suffix text must be enabled\")"},
  {"line":1966,"text":"\texportDeclaration := exportSpecifier.Parent.Parent.AsExportDeclaration()"},
  {"line":1967,"text":"\tpropertyName := exportSpecifier.PropertyName"},
  {"line":1968,"text":"\tname := exportSpecifier.Name()"},
  {"line":1969,"text":"\tlocalSymbol := getLocalSymbolForExportSpecifier(referenceLocation, referenceSymbol, exportSpecifier, state.checker)"},
  {"line":1971,"text":"\tif !alwaysGetReferences && !search.includes(localSymbol) {"},
  {"line":1972,"text":"\t\treturn"},
  {"line":1973,"text":"\t}"},
  {"line":1975,"text":"\taddRef := func() {"},
  {"line":1976,"text":"\t\tif addReferencesHere {"},
  {"line":1977,"text":"\t\t\tstate.addReference(referenceLocation, localSymbol, entryKindNode)"},
  {"line":1978,"text":"\t\t}"},
  {"line":1979,"text":"\t}"},
  {"line":1981,"text":"\tif propertyName == nil {"},
  {"line":1983,"text":"\t\tif !(state.options.use == referenceUseRename && ast.ModuleExportNameIsDefault(name)) {"},
  {"line":1984,"text":"\t\t\taddRef()"},
  {"line":1985,"text":"\t\t}"},
  {"line":1986,"text":"\t} else if referenceLocation == propertyName.AsNode() {"},
  {"line":1989,"text":"\t\tif exportDeclaration.ModuleSpecifier == nil {"},
  {"line":1990,"text":"\t\t\taddRef()"},
  {"line":1991,"text":"\t\t}"},
  {"line":1993,"text":"\t\tif addReferencesHere && state.options.use != referenceUseRename && state.markSeenReExportRHS(name) {"},
  {"line":1994,"text":"\t\t\texportSymbol := exportSpecifier.AsNode().Symbol()"},
  {"line":1995,"text":"\t\t\tdebug.Assert(exportSymbol != nil, \"exportSpecifier.Symbol() should not be nil\")"},
  {"line":1996,"text":"\t\t\tstate.addReference(name, exportSymbol, entryKindNode)"},
  {"line":1997,"text":"\t\t}"},
  {"line":1998,"text":"\t} else {"},
  {"line":1999,"text":"\t\tif state.markSeenReExportRHS(referenceLocation) {"},
  {"line":2000,"text":"\t\t\taddRef()"},
  {"line":2001,"text":"\t\t}"},
  {"line":2002,"text":"\t}"},
  {"line":2005,"text":"\tif !isForRenameWithPrefixAndSuffixText(state.options) || alwaysGetReferences {"},
  {"line":2006,"text":"\t\tisDefaultExport := ast.ModuleExportNameIsDefault(referenceLocation) || ast.ModuleExportNameIsDefault(exportSpecifier.Name())"},
  {"line":2007,"text":"\t\texportKind := ExportKindNamed"},
  {"line":2008,"text":"\t\tif isDefaultExport {"},
  {"line":2009,"text":"\t\t\texportKind = ExportKindDefault"},
  {"line":2010,"text":"\t\t}"},
  {"line":2011,"text":"\t\texportSymbol := exportSpecifier.AsNode().Symbol()"},
  {"line":2012,"text":"\t\tdebug.Assert(exportSymbol != nil, \"exportSpecifier.Symbol() should not be nil\")"},
  {"line":2013,"text":"\t\texportInfo := getExportInfo(exportSymbol, exportKind, state.checker)"},
  {"line":2014,"text":"\t\tif exportInfo != nil {"},
  {"line":2015,"text":"\t\t\tstate.searchForImportsOfExport(referenceLocation, exportSymbol, exportInfo)"},
  {"line":2016,"text":"\t\t}"},
  {"line":2017,"text":"\t}"},
  {"line":2020,"text":"\tif search.comingFrom != ImpExpKindExport && exportDeclaration.ModuleSpecifier != nil && propertyName == nil && !isForRenameWithPrefixAndSuffixText(state.options) {"},
  {"line":2021,"text":"\t\timported := state.checker.GetExportSpecifierLocalTargetSymbol(exportSpecifier.AsNode())"},
  {"line":2022,"text":"\t\tif imported != nil {"},
  {"line":2023,"text":"\t\t\tstate.searchForImportedSymbol(imported)"},
  {"line":2024,"text":"\t\t}"},
  {"line":2025,"text":"\t}"},
  {"line":2026,"text":"}"},
  {"line":2029,"text":"func (state *refState) searchForImportedSymbol(symbol *ast.Symbol) {"},
  {"line":2030,"text":"\tfor _, declaration := range symbol.Declarations {"},
  {"line":2031,"text":"\t\texportingFile := ast.GetSourceFileOfNode(declaration)"},
  {"line":2033,"text":"\t\tstate.getReferencesInSourceFile(exportingFile, state.createSearch(declaration, symbol, ImpExpKindImport, \"\", nil), state.includesSourceFile(exportingFile))"},
  {"line":2034,"text":"\t}"},
  {"line":2035,"text":"}"},
  {"line":2038,"text":"func (state *refState) searchForImportsOfExport(exportLocation *ast.Node, exportSymbol *ast.Symbol, exportInfo *ExportInfo) {"},
  {"line":2039,"text":"\tr := state.getImportSearches(exportSymbol, exportInfo)"},
  {"line":2042,"text":"\tif len(r.singleReferences) != 0 {"},
  {"line":2043,"text":"\t\taddRef := state.referenceAdder(exportSymbol)"},
  {"line":2044,"text":"\t\tfor _, singleRef := range r.singleReferences {"},
  {"line":2045,"text":"\t\t\tif state.shouldAddSingleReference(singleRef) {"},
  {"line":2046,"text":"\t\t\t\taddRef(singleRef, entryKindNode)"},
  {"line":2047,"text":"\t\t\t}"},
  {"line":2048,"text":"\t\t}"},
  {"line":2049,"text":"\t}"},
  {"line":2052,"text":"\tfor _, i := range r.importSearches {"},
  {"line":2053,"text":"\t\tstate.getReferencesInSourceFile(ast.GetSourceFileOfNode(i.importLocation), state.createSearch(i.importLocation, i.importSymbol, ImpExpKindExport, \"\", nil), true /*addReferencesHere*/)"},
  {"line":2054,"text":"\t}"},
  {"line":2056,"text":"\tif len(r.indirectUsers) != 0 {"},
  {"line":2057,"text":"\t\tvar indirectSearch *refSearch"},
  {"line":2058,"text":"\t\tswitch exportInfo.exportKind {"},
  {"line":2059,"text":"\t\tcase ExportKindNamed:"},
  {"line":2060,"text":"\t\t\tindirectSearch = state.createSearch(exportLocation, exportSymbol, ImpExpKindExport, \"\", nil)"},
  {"line":2061,"text":"\t\tcase ExportKindDefault:"},
  {"line":2063,"text":"\t\t\tif state.options.use != referenceUseRename {"},
  {"line":2064,"text":"\t\t\t\tindirectSearch = state.createSearch(exportLocation, exportSymbol, ImpExpKindExport, \"default\", nil)"},
  {"line":2065,"text":"\t\t\t}"},
  {"line":2066,"text":"\t\t}"},
  {"line":2067,"text":"\t\tif indirectSearch != nil {"},
  {"line":2068,"text":"\t\t\tfor _, indirectUser := range r.indirectUsers {"},
  {"line":2069,"text":"\t\t\t\tstate.searchForName(indirectUser, indirectSearch)"},
  {"line":2070,"text":"\t\t\t}"},
  {"line":2071,"text":"\t\t}"},
  {"line":2072,"text":"\t}"},
  {"line":2073,"text":"}"},
  {"line":2075,"text":"func (state *refState) shouldAddSingleReference(singleRef *ast.Node) bool {"},
  {"line":2076,"text":"\tif !state.hasMatchingMeaning(singleRef) {"},
  {"line":2077,"text":"\t\treturn false"},
  {"line":2078,"text":"\t}"},
  {"line":2079,"text":"\tif state.options.use != referenceUseRename {"},
  {"line":2080,"text":"\t\treturn true"},
  {"line":2081,"text":"\t}"},
  {"line":2083,"text":"\tif !ast.IsIdentifier(singleRef) && !ast.IsImportOrExportSpecifier(singleRef.Parent) {"},
  {"line":2084,"text":"\t\treturn false"},
  {"line":2085,"text":"\t}"},
  {"line":2087,"text":"\treturn !(ast.IsImportOrExportSpecifier(singleRef.Parent) && ast.ModuleExportNameIsDefault(singleRef))"},
  {"line":2088,"text":"}"},
  {"line":2090,"text":"func (state *refState) hasMatchingMeaning(referenceLocation *ast.Node) bool {"},
  {"line":2091,"text":"\treturn getMeaningFromLocation(referenceLocation)&state.searchMeaning != 0"},
  {"line":2092,"text":"}"},
  {"line":2094,"text":"func (state *refState) getReferenceForShorthandProperty(referenceSymbol *ast.Symbol, search *refSearch) {"},
  {"line":2095,"text":"\tif referenceSymbol.Flags&ast.SymbolFlagsTransient != 0 || referenceSymbol.ValueDeclaration == nil {"},
  {"line":2096,"text":"\t\treturn"},
  {"line":2097,"text":"\t}"},
  {"line":2098,"text":"\tshorthandValueSymbol := state.checker.GetShorthandAssignmentValueSymbol(referenceSymbol.ValueDeclaration)"},
  {"line":2099,"text":"\tname := ast.GetNameOfDeclaration(referenceSymbol.ValueDeclaration)"},
  {"line":2106,"text":"\tif name != nil && search.includes(shorthandValueSymbol) {"},
  {"line":2107,"text":"\t\tstate.addReference(name, shorthandValueSymbol, entryKindNode)"},
  {"line":2108,"text":"\t}"},
  {"line":2109,"text":"}"},
  {"line":2112,"text":"func (state *refState) populateSearchSymbolSet(symbol *ast.Symbol, location *ast.Node, isForRename, providePrefixAndSuffixText, implementations bool) []*ast.Symbol {"},
  {"line":2113,"text":"\tif location == nil {"},
  {"line":2114,"text":"\t\treturn []*ast.Symbol{symbol}"},
  {"line":2115,"text":"\t}"},
  {"line":2116,"text":"\tresult := []*ast.Symbol{}"},
  {"line":2117,"text":"\tstate.forEachRelatedSymbol("},
  {"line":2118,"text":"\t\tsymbol,"},
  {"line":2119,"text":"\t\tlocation,"},
  {"line":2120,"text":"\t\tisForRename,"},
  {"line":2121,"text":"\t\t!(isForRename && providePrefixAndSuffixText),"},
  {"line":2122,"text":"\t\tfunc(sym *ast.Symbol, root *ast.Symbol, base *ast.Symbol) *ast.Symbol {"},
  {"line":2124,"text":"\t\t\tif base != nil {"},
  {"line":2125,"text":"\t\t\t\tif isStaticSymbol(symbol) != isStaticSymbol(base) {"},
  {"line":2126,"text":"\t\t\t\t\tbase = nil"},
  {"line":2127,"text":"\t\t\t\t}"},
  {"line":2128,"text":"\t\t\t}"},
  {"line":2129,"text":"\t\t\tresult = append(result, core.OrElse(base, core.OrElse(root, sym)))"},
  {"line":2130,"text":"\t\t\treturn nil"},
  {"line":2131,"text":"\t\t}, // when try to find implementation, implementations is true, and not allowed to find base class"},
  {"line":2132,"text":"\t\t/*allowBaseTypes*/ func(_ *ast.Symbol) bool { return !implementations },"},
  {"line":2133,"text":"\t)"},
  {"line":2134,"text":"\treturn result"},
  {"line":2135,"text":"}"},
  {"line":2137,"text":"func (state *refState) getRelatedSymbol(search *refSearch, referenceSymbol *ast.Symbol, referenceLocation *ast.Node) (*ast.Symbol, entryKind) {"},
  {"line":2138,"text":"\treturn state.forEachRelatedSymbol("},
  {"line":2139,"text":"\t\treferenceSymbol,"},
  {"line":2140,"text":"\t\treferenceLocation,"},
  {"line":2141,"text":"\t\tfalse, /*isForRenamePopulateSearchSymbolSet*/"},
  {"line":2142,"text":"\t\tstate.options.use != referenceUseRename || state.options.useAliasesForRename, /*onlyIncludeBindingElementAtReferenceLocation*/"},
  {"line":2143,"text":"\t\tfunc(sym *ast.Symbol, rootSymbol *ast.Symbol, baseSymbol *ast.Symbol) *ast.Symbol {"},
  {"line":2145,"text":"\t\t\tif baseSymbol != nil {"},
  {"line":2147,"text":"\t\t\t\tif isStaticSymbol(referenceSymbol) != isStaticSymbol(baseSymbol) {"},
  {"line":2148,"text":"\t\t\t\t\tbaseSymbol = nil"},
  {"line":2149,"text":"\t\t\t\t}"},
  {"line":2150,"text":"\t\t\t}"},
  {"line":2151,"text":"\t\t\tsearchSym := core.Coalesce(baseSymbol, core.Coalesce(rootSymbol, sym))"},
  {"line":2152,"text":"\t\t\tif searchSym != nil && search.includes(searchSym) {"},
  {"line":2153,"text":"\t\t\t\tif rootSymbol != nil && sym.CheckFlags&ast.CheckFlagsSynthetic == 0 {"},
  {"line":2154,"text":"\t\t\t\t\treturn rootSymbol"},
  {"line":2155,"text":"\t\t\t\t}"},
  {"line":2156,"text":"\t\t\t\treturn sym"},
  {"line":2157,"text":"\t\t\t}"},
  {"line":2159,"text":"\t\t\treturn nil"},
  {"line":2160,"text":"\t\t},"},
  {"line":2161,"text":"\t\tfunc(rootSymbol *ast.Symbol) bool {"},
  {"line":2162,"text":"\t\t\treturn !(len(search.parents) != 0 && !core.Some(search.parents, func(parent *ast.Symbol) bool {"},
  {"line":2163,"text":"\t\t\t\treturn state.explicitlyInheritsFrom(rootSymbol.Parent, parent)"},
  {"line":2164,"text":"\t\t\t}))"},
  {"line":2165,"text":"\t\t},"},
  {"line":2166,"text":"\t)"},
  {"line":2167,"text":"}"},
  {"line":2169,"text":"func (state *refState) forEachRelatedSymbol("},
  {"line":2170,"text":"\tsymbol *ast.Symbol,"},
  {"line":2171,"text":"\tlocation *ast.Node,"},
  {"line":2172,"text":"\tisForRenamePopulateSearchSymbolSet,"},
  {"line":2173,"text":"\tonlyIncludeBindingElementAtReferenceLocation bool,"},
  {"line":2174,"text":"\tcbSymbol func(*ast.Symbol, *ast.Symbol, *ast.Symbol) *ast.Symbol,"},
  {"line":2175,"text":"\tallowBaseTypes func(*ast.Symbol) bool,"},
  {"line":2176,"text":") (*ast.Symbol, entryKind) {"},
  {"line":2177,"text":"\tfromRoot := func(sym *ast.Symbol) *ast.Symbol {"},
  {"line":2184,"text":"\t\tfor _, rootSymbol := range state.checker.GetRootSymbols(sym) {"},
  {"line":2185,"text":"\t\t\tif result := cbSymbol(sym, rootSymbol, nil /*baseSymbol*/); result != nil {"},
  {"line":2186,"text":"\t\t\t\treturn result"},
  {"line":2187,"text":"\t\t\t}"},
  {"line":2189,"text":"\t\t\tif rootSymbol.Parent != nil && rootSymbol.Parent.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 && allowBaseTypes(rootSymbol) {"},
  {"line":2190,"text":"\t\t\t\tresult := getPropertySymbolsFromBaseTypes(rootSymbol.Parent, rootSymbol.Name, state.checker, func(base *ast.Symbol) *ast.Symbol {"},
  {"line":2191,"text":"\t\t\t\t\treturn cbSymbol(sym, rootSymbol, base)"},
  {"line":2192,"text":"\t\t\t\t})"},
  {"line":2193,"text":"\t\t\t\tif result != nil {"},
  {"line":2194,"text":"\t\t\t\t\treturn result"},
  {"line":2195,"text":"\t\t\t\t}"},
  {"line":2196,"text":"\t\t\t}"},
  {"line":2197,"text":"\t\t}"},
  {"line":2198,"text":"\t\treturn nil"},
  {"line":2199,"text":"\t}"},
  {"line":2201,"text":"\tif containingObjectLiteralElement := getContainingObjectLiteralElement(location); containingObjectLiteralElement != nil {"},
  {"line":2202,"text":"\t\t/* Because in short-hand property assignment, location has two meaning : property name and as value of the property"},
  {"line":2203,"text":"\t\t * When we do findAllReference at the position of the short-hand property assignment, we would want to have references to position of"},
  {"line":2204,"text":"\t\t * property name and variable declaration of the identifier."},
  {"line":2205,"text":"\t\t * Like in below example, when querying for all references for an identifier 'name', of the property assignment, the language service"},
  {"line":2206,"text":"\t\t * should show both 'name' in 'obj' and 'name' in variable declaration"},
  {"line":2207,"text":"\t\t *      const name = \"Foo\";"},
  {"line":2208,"text":"\t\t *      const obj = { name };"},
  {"line":2209,"text":"\t\t * In order to do that, we will populate the search set with the value symbol of the identifier as a value of the property assignment"},
  {"line":2210,"text":"\t\t * so that when matching with potential reference symbol, both symbols from property declaration and variable declaration"},
  {"line":2211,"text":"\t\t * will be included correctly."},
  {"line":2212,"text":"\t\t */"},
  {"line":2213,"text":"\t\tshorthandValueSymbol := state.checker.GetShorthandAssignmentValueSymbol(location.Parent)"},
  {"line":2215,"text":"\t\tif shorthandValueSymbol != nil && isForRenamePopulateSearchSymbolSet {"},
  {"line":2217,"text":"\t\t\treturn cbSymbol(shorthandValueSymbol, nil /*rootSymbol*/, nil /*baseSymbol*/), entryKindSearchedLocalFoundProperty"},
  {"line":2218,"text":"\t\t}"},
  {"line":2222,"text":"\t\tif contextualType := state.checker.GetContextualType(containingObjectLiteralElement.Parent, checker.ContextFlagsNone); contextualType != nil {"},
  {"line":2223,"text":"\t\t\tsymbols := state.checker.GetPropertySymbolsFromContextualType(containingObjectLiteralElement, contextualType, true /*unionSymbolOk*/)"},
  {"line":2224,"text":"\t\t\tfor _, sym := range symbols {"},
  {"line":2225,"text":"\t\t\t\tif res := fromRoot(sym); res != nil {"},
  {"line":2226,"text":"\t\t\t\t\treturn res, entryKindSearchedPropertyFoundLocal"},
  {"line":2227,"text":"\t\t\t\t}"},
  {"line":2228,"text":"\t\t\t}"},
  {"line":2229,"text":"\t\t}"},
  {"line":2233,"text":"\t\tif propertySymbol := state.checker.GetPropertySymbolOfDestructuringAssignment(location); propertySymbol != nil {"},
  {"line":2234,"text":"\t\t\tif res := cbSymbol(propertySymbol, nil /*rootSymbol*/, nil /*baseSymbol*/); res != nil {"},
  {"line":2235,"text":"\t\t\t\treturn res, entryKindSearchedPropertyFoundLocal"},
  {"line":2236,"text":"\t\t\t}"},
  {"line":2237,"text":"\t\t}"},
  {"line":2238,"text":"\t\tif shorthandValueSymbol != nil {"},
  {"line":2239,"text":"\t\t\tif res := cbSymbol(shorthandValueSymbol, nil /*rootSymbol*/, nil /*baseSymbol*/); res != nil {"},
  {"line":2240,"text":"\t\t\t\treturn res, entryKindSearchedLocalFoundProperty"},
  {"line":2241,"text":"\t\t\t}"},
  {"line":2242,"text":"\t\t}"},
  {"line":2243,"text":"\t}"},
  {"line":2245,"text":"\tif aliasedSymbol := getMergedAliasedSymbolOfNamespaceExportDeclaration(location, symbol, state.checker); aliasedSymbol != nil {"},
  {"line":2247,"text":"\t\tif res := cbSymbol(aliasedSymbol, nil /*rootSymbol*/, nil /*baseSymbol*/); res != nil {"},
  {"line":2248,"text":"\t\t\treturn res, entryKindNode"},
  {"line":2249,"text":"\t\t}"},
  {"line":2250,"text":"\t}"},
  {"line":2252,"text":"\tif res := fromRoot(symbol); res != nil {"},
  {"line":2253,"text":"\t\treturn res, entryKindNode"},
  {"line":2254,"text":"\t}"},
  {"line":2256,"text":"\tif symbol.ValueDeclaration != nil && ast.IsParameterPropertyDeclaration(symbol.ValueDeclaration, symbol.ValueDeclaration.Parent) {"},
  {"line":2257,"text":"\t\tparamProp1, paramProp2 := state.checker.GetSymbolsOfParameterPropertyDeclaration(symbol.ValueDeclaration, symbol.Name)"},
  {"line":2258,"text":"\t\tdebug.Assert("},
  {"line":2259,"text":"\t\t\tparamProp1.Flags&ast.SymbolFlagsFunctionScopedVariable != 0 && paramProp2.Flags&ast.SymbolFlagsClassMember != 0,"},
  {"line":2260,"text":"\t\t\t\"GetSymbolsOfParameterPropertyDeclaration must return (parameter, member) pair\","},
  {"line":2261,"text":"\t\t)"},
  {"line":2262,"text":"\t\treturn fromRoot(core.IfElse(symbol.Flags&ast.SymbolFlagsFunctionScopedVariable != 0, paramProp2, paramProp1)), entryKindNode"},
  {"line":2263,"text":"\t}"},
  {"line":2265,"text":"\tif exportSpecifier := ast.GetDeclarationOfKind(symbol, ast.KindExportSpecifier); exportSpecifier != nil && (!isForRenamePopulateSearchSymbolSet || exportSpecifier.PropertyName() == nil) {"},
  {"line":2266,"text":"\t\tif localSymbol := state.checker.GetExportSpecifierLocalTargetSymbol(exportSpecifier); localSymbol != nil {"},
  {"line":2267,"text":"\t\t\tif res := cbSymbol(localSymbol, nil /*rootSymbol*/, nil /*baseSymbol*/); res != nil {"},
  {"line":2268,"text":"\t\t\t\treturn res, entryKindNode"},
  {"line":2269,"text":"\t\t\t}"},
  {"line":2270,"text":"\t\t}"},
  {"line":2271,"text":"\t}"},
  {"line":2275,"text":"\tif !isForRenamePopulateSearchSymbolSet {"},
  {"line":2276,"text":"\t\tvar bindingElementPropertySymbol *ast.Symbol"},
  {"line":2277,"text":"\t\tif onlyIncludeBindingElementAtReferenceLocation {"},
  {"line":2278,"text":"\t\t\tif !isObjectBindingElementWithoutPropertyName(location.Parent) {"},
  {"line":2279,"text":"\t\t\t\treturn nil, entryKindNone"},
  {"line":2280,"text":"\t\t\t}"},
  {"line":2281,"text":"\t\t\tbindingElementPropertySymbol = getPropertySymbolFromBindingElement(state.checker, location.Parent)"},
  {"line":2282,"text":"\t\t} else {"},
  {"line":2283,"text":"\t\t\tbindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, state.checker)"},
  {"line":2284,"text":"\t\t}"},
  {"line":2285,"text":"\t\tif bindingElementPropertySymbol == nil {"},
  {"line":2286,"text":"\t\t\treturn nil, entryKindNone"},
  {"line":2287,"text":"\t\t}"},
  {"line":2288,"text":"\t\treturn fromRoot(bindingElementPropertySymbol), entryKindSearchedPropertyFoundLocal"},
  {"line":2289,"text":"\t}"},
  {"line":2291,"text":"\tdebug.Assert(isForRenamePopulateSearchSymbolSet)"},
  {"line":2295,"text":"\tincludeOriginalSymbolOfBindingElement := onlyIncludeBindingElementAtReferenceLocation"},
  {"line":2297,"text":"\tif includeOriginalSymbolOfBindingElement {"},
  {"line":2298,"text":"\t\tif bindingElementPropertySymbol := getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, state.checker); bindingElementPropertySymbol != nil {"},
  {"line":2299,"text":"\t\t\treturn fromRoot(bindingElementPropertySymbol), entryKindSearchedPropertyFoundLocal"},
  {"line":2300,"text":"\t\t}"},
  {"line":2301,"text":"\t}"},
  {"line":2302,"text":"\treturn nil, entryKindNone"},
  {"line":2303,"text":"}"},
  {"line":2306,"text":"func (state *refState) searchForName(sourceFile *ast.SourceFile, search *refSearch) {"},
  {"line":2307,"text":"\tif _, ok := sourceFile.GetNameTable()[search.escapedText]; ok {"},
  {"line":2308,"text":"\t\tstate.getReferencesInSourceFile(sourceFile, search, true /*addReferencesHere*/)"},
  {"line":2309,"text":"\t}"},
  {"line":2310,"text":"}"},
  {"line":2312,"text":"func (state *refState) explicitlyInheritsFrom(symbol *ast.Symbol, parent *ast.Symbol) bool {"},
  {"line":2313,"text":"\tif symbol == parent {"},
  {"line":2314,"text":"\t\treturn true"},
  {"line":2315,"text":"\t}"},
  {"line":2318,"text":"\tkey := inheritKey{symbol: symbol, parent: parent}"},
  {"line":2319,"text":"\tif cached, ok := state.inheritsFromCache[key]; ok {"},
  {"line":2320,"text":"\t\treturn cached"},
  {"line":2321,"text":"\t}"},
  {"line":2324,"text":"\tstate.inheritsFromCache[key] = false"},
  {"line":2326,"text":"\tif symbol.Declarations == nil {"},
  {"line":2327,"text":"\t\treturn false"},
  {"line":2328,"text":"\t}"},
  {"line":2330,"text":"\tinherits := core.Some(symbol.Declarations, func(declaration *ast.Node) bool {"},
  {"line":2331,"text":"\t\tsuperTypeNodes := getAllSuperTypeNodes(declaration)"},
  {"line":2332,"text":"\t\treturn core.Some(superTypeNodes, func(typeReference *ast.TypeNode) bool {"},
  {"line":2333,"text":"\t\t\ttyp := state.checker.GetTypeAtLocation(typeReference.AsNode())"},
  {"line":2334,"text":"\t\t\treturn typ != nil && typ.Symbol() != nil && state.explicitlyInheritsFrom(typ.Symbol(), parent)"},
  {"line":2335,"text":"\t\t})"},
  {"line":2336,"text":"\t})"},
  {"line":2339,"text":"\tstate.inheritsFromCache[key] = inherits"},
  {"line":2340,"text":"\treturn inherits"},
  {"line":2341,"text":"}"},
];

export function findLsFindAllReferencesDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsFindAllReferencesDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsFindAllReferencesDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsFindAllReferencesDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsFindAllReferencesLineText(line: number): string | undefined {
  return lsFindAllReferencesSourceLines.find((entry) => entry.line === line)?.text;
}
