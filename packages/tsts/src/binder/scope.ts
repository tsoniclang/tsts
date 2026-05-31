import type { Node, Symbol, SymbolTable } from "../ast/index.js";
import {
  Kind,
  SymbolFlags,
  exportAssignmentIsExportEquals,
  getCombinedModifierFlags,
  getSymbolExports,
  getSymbolMembers,
  isBigIntLiteral,
  isExportAssignment,
  isExportSpecifier,
  isIdentifier,
  isNoSubstitutionTemplateLiteral,
  isNumericLiteral,
  isPrivateIdentifier,
  isSourceFile,
  isStringLiteral,
  moduleExportNameIsDefault,
  nodeName,
  nodeSymbol,
  setNodeLocalSymbol,
  setNodeSymbol,
  setSymbolExportSymbol,
  setSymbolParent,
} from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { Diagnostics } from "../diagnostics/diagnostics_generated.js";
import { format } from "../diagnostics/index.js";

export interface DeclarationConflict {
  readonly node: Node;
  readonly message: string;
}

export interface DeclareSymbolOptions {
  readonly symbolTable: SymbolTable;
  readonly parent: Symbol | undefined;
  readonly node: Node;
  readonly includes: number;
  readonly excludes: number;
  readonly classifiableNames: Set<string>;
  readonly createSymbol: (flags: number, name: string) => Symbol;
}

export function declareSymbolWithDiagnostics(options: DeclareSymbolOptions): { symbol: Symbol; diagnostics: readonly DeclarationConflict[] } {
  const name = getDeclarationName(options.node, options.parent);
  const diagnostics: DeclarationConflict[] = [];
  let symbol: Symbol;
  if (name === internalSymbolNameMissing) {
    symbol = options.createSymbol(SymbolFlags.None, internalSymbolNameMissing);
  } else {
    if ((options.includes & SymbolFlags.Classifiable) !== 0) options.classifiableNames.add(name);
    const existing = options.symbolTable.get(name);
    if (existing === undefined) {
      symbol = options.createSymbol(SymbolFlags.None, name);
      options.symbolTable.set(name, symbol);
    } else if (((existing.flags ?? SymbolFlags.None) & options.excludes) !== 0) {
      diagnostics.push(...createDuplicateDeclarationDiagnostics(existing, options.node, options.includes));
      symbol = options.createSymbol(SymbolFlags.None, name);
    } else {
      symbol = existing;
    }
  }
  addDeclarationToSymbol(symbol, options.node, options.includes);
  if (symbol.parent === undefined && options.parent !== undefined) setSymbolParent(symbol, options.parent);
  return { symbol, diagnostics };
}

export function addDeclarationToSymbol(symbol: Symbol, node: Node, symbolFlags: number): void {
  symbol.flags = (symbol.flags ?? SymbolFlags.None) | symbolFlags;
  setNodeSymbol(node, symbol);
  if (!symbol.declarations.includes(node)) symbol.declarations.push(node);
  if ((symbolFlags & SymbolFlags.Value) !== 0) setValueDeclaration(symbol, node);
}

export function setValueDeclaration(symbol: Symbol, node: Node): void {
  if (symbol.valueDeclaration === undefined) symbol.valueDeclaration = node;
}

export function createDuplicateDeclarationDiagnostics(existing: Symbol, node: Node, includes: number): readonly DeclarationConflict[] {
  const existingFlags = existing.flags ?? SymbolFlags.None;
  let message = (existingFlags & SymbolFlags.BlockScopedVariable) !== 0
    ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
    : Diagnostics.Duplicate_identifier_0;
  let needsName = true;
  if ((existingFlags & SymbolFlags.Enum) !== 0 || (includes & SymbolFlags.Enum) !== 0) {
    message = Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations;
    needsName = false;
  }
  if (existing.declarations.length !== 0 && isDefaultExportLike(node)) {
    message = Diagnostics.A_module_cannot_have_multiple_default_exports;
    needsName = false;
  }
  const diagnostics: DeclarationConflict[] = [];
  for (const declaration of existing.declarations) {
    diagnostics.push({
      node: declaration,
      message: format(message.message, needsName ? [getDisplayName(declaration)] : []),
    });
  }
  diagnostics.push({
    node,
    message: format(message.message, needsName ? [getDisplayName(node)] : []),
  });
  return diagnostics;
}

export function declareModuleMember(
  container: Node,
  node: Node,
  symbolFlags: number,
  symbolExcludes: number,
  classifiableNames: Set<string>,
  createSymbol: (flags: number, name: string) => Symbol,
): { symbol: Symbol; diagnostics: readonly DeclarationConflict[] } {
  const containerSymbol = nodeSymbol(container);
  if (containerSymbol === undefined) throw new Error("module member container has no symbol");
  const hasExport = (getCombinedModifierFlags(node) & ModifierFlags.Export) !== 0;
  if ((symbolFlags & SymbolFlags.Alias) !== 0) {
    const table = node.kind === Kind.ExportSpecifier || hasExport
      ? getSymbolExports(containerSymbol)
      : getOrCreateLocals(container);
    return declareSymbolWithDiagnostics({
      symbolTable: table,
      parent: table === getSymbolExports(containerSymbol) ? containerSymbol : undefined,
      node,
      includes: symbolFlags,
      excludes: symbolExcludes,
      classifiableNames,
      createSymbol,
    });
  }
  if (hasExport || (container.flags & NodeFlagsExportContext) !== 0) {
    const local = declareSymbolWithDiagnostics({
      symbolTable: getOrCreateLocals(container),
      parent: undefined,
      node,
      includes: (symbolFlags & SymbolFlags.Value) !== 0 ? SymbolFlags.ExportValue : SymbolFlags.None,
      excludes: symbolExcludes,
      classifiableNames,
      createSymbol,
    });
    const exported = declareSymbolWithDiagnostics({
      symbolTable: getSymbolExports(containerSymbol),
      parent: containerSymbol,
      node,
      includes: symbolFlags,
      excludes: symbolExcludes,
      classifiableNames,
      createSymbol,
    });
    setSymbolExportSymbol(local.symbol, exported.symbol);
    setNodeLocalSymbol(node, local.symbol);
    return { symbol: local.symbol, diagnostics: [...local.diagnostics, ...exported.diagnostics] };
  }
  return declareSymbolWithDiagnostics({
    symbolTable: getOrCreateLocals(container),
    parent: undefined,
    node,
    includes: symbolFlags,
    excludes: symbolExcludes,
    classifiableNames,
    createSymbol,
  });
}

export function declareClassMember(
  container: Node,
  node: Node,
  symbolFlags: number,
  symbolExcludes: number,
  classifiableNames: Set<string>,
  createSymbol: (flags: number, name: string) => Symbol,
): { symbol: Symbol; diagnostics: readonly DeclarationConflict[] } {
  const containerSymbol = nodeSymbol(container);
  if (containerSymbol === undefined) throw new Error("class member container has no symbol");
  const table = isStaticMember(node) ? getSymbolExports(containerSymbol) : getSymbolMembers(containerSymbol);
  return declareSymbolWithDiagnostics({
    symbolTable: table,
    parent: containerSymbol,
    node,
    includes: symbolFlags,
    excludes: symbolExcludes,
    classifiableNames,
    createSymbol,
  });
}

export function declareSourceFileMember(
  sourceFile: Node,
  node: Node,
  symbolFlags: number,
  symbolExcludes: number,
  classifiableNames: Set<string>,
  createSymbol: (flags: number, name: string) => Symbol,
): { symbol: Symbol; diagnostics: readonly DeclarationConflict[] } {
  const fileSymbol = nodeSymbol(sourceFile);
  if (fileSymbol !== undefined && isSourceFile(sourceFile)) {
    return declareModuleMember(sourceFile, node, symbolFlags, symbolExcludes, classifiableNames, createSymbol);
  }
  return declareSymbolWithDiagnostics({
    symbolTable: getOrCreateLocals(sourceFile),
    parent: undefined,
    node,
    includes: symbolFlags,
    excludes: symbolExcludes,
    classifiableNames,
    createSymbol,
  });
}

export function getDeclarationName(node: Node, parent: Symbol | undefined = undefined): string {
  if (isExportAssignment(node)) return exportAssignmentIsExportEquals(node) ? internalSymbolNameExportEquals : internalSymbolNameDefault;
  const name = nodeName(node);
  if (name !== undefined) {
    if (isDefaultExportLike(node) && parent !== undefined) return internalSymbolNameDefault;
    if (isPropertyNameLiteralLike(name)) return field<string>(name, "text") ?? internalSymbolNameMissing;
    return internalSymbolNameMissing;
  }
  switch (node.kind) {
    case Kind.Constructor:
      return "__constructor";
    case Kind.CallSignature:
    case Kind.FunctionType:
      return "__call";
    case Kind.ConstructSignature:
    case Kind.ConstructorType:
      return "__new";
    case Kind.IndexSignature:
      return "__index";
    case Kind.ExportDeclaration:
      return internalSymbolNameExportStar;
    case Kind.SourceFile:
      return internalSymbolNameExportEquals;
  }
  return internalSymbolNameMissing;
}

export function getDisplayName(node: Node): string {
  const name = nodeName(node);
  if (name !== undefined && isPropertyNameLiteralLike(name)) return field<string>(name, "text") ?? "(Missing)";
  const declarationName = getDeclarationName(node);
  return declarationName === internalSymbolNameMissing ? "(Missing)" : declarationName;
}

export function getOrCreateLocals(node: Node): SymbolTable {
  if (node.locals !== undefined) return node.locals;
  const locals: SymbolTable = new Map<string, Symbol>();
  node.locals = locals;
  return locals;
}

export function isPropertyNameLiteralLike(name: Node): boolean {
  return isIdentifier(name) ||
    isStringLiteral(name) ||
    isNumericLiteral(name) ||
    isPrivateIdentifier(name) ||
    isNoSubstitutionTemplateLiteral(name) ||
    isBigIntLiteral(name);
}

export function isDefaultExportLike(node: Node): boolean {
  return (getCombinedModifierFlags(node) & ModifierFlags.Default) !== 0 ||
    (isExportSpecifier(node) && moduleExportNameIsDefault(nodeName(node))) ||
    (isExportAssignment(node) && !exportAssignmentIsExportEquals(node));
}

export function isStaticMember(node: Node): boolean {
  return (getCombinedModifierFlags(node) & ModifierFlags.Static) !== 0;
}

export const internalSymbolNameMissing = "__missing";
export const internalSymbolNameDefault = "default";
export const internalSymbolNameExportEquals = "export=";
export const internalSymbolNameExportStar = "__export";
const NodeFlagsExportContext = 1 << 7;

function field<T>(node: Node | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[key];
}
