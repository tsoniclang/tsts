/**
 * Symbol merge, alias, and export resolution helpers.
 *
 * TS-Go checker.go centralizes symbol-table merging, excluded-flag checks,
 * alias resolution, merged-symbol tracking, export-symbol linking, duplicate
 * declaration diagnostics, and module export lookup. This file ports that
 * behavior into one reusable TSTS slice.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { Type } from "./types.js";

export interface SymbolMergeHost {
  readonly unknownSymbol?: AstSymbol;
  readonly getExportsOfSymbol?: (symbol: AstSymbol) => SymbolTable;
  readonly getMembersOfSymbol?: (symbol: AstSymbol) => SymbolTable;
  readonly getTypeOnlyAliasDeclaration?: (symbol: AstSymbol, meaning: number) => AstNode | undefined;
  readonly getSymbolOfDeclaration?: (node: AstNode) => AstSymbol | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly resolveExternalModuleName?: (location: AstNode, moduleReference: string, ignoreErrors: boolean) => AstSymbol | undefined;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface SymbolMergeState {
  readonly mergedSymbols: Map<AstSymbol, AstSymbol>;
  readonly duplicateReports: DuplicateDeclarationReport[];
  readonly resolvingAliases: Set<AstSymbol>;
  readonly referencedAliases: Set<AstSymbol>;
}

export interface DuplicateDeclarationReport {
  readonly target: AstSymbol;
  readonly source: AstSymbol;
  readonly message: string;
  readonly declarations: readonly AstNode[];
}

export interface AliasResolutionResult {
  readonly input: AstSymbol;
  readonly resolved: AstSymbol;
  readonly circular: boolean;
  readonly typeOnly: boolean;
}

export interface ExportLookupResult {
  readonly moduleSymbol: AstSymbol;
  readonly name: string;
  readonly symbol?: AstSymbol;
  readonly defaultOnly: boolean;
  readonly syntheticDefault: boolean;
}

export function createSymbolMergeState(): SymbolMergeState {
  return { mergedSymbols: new Map(), duplicateReports: [], resolvingAliases: new Set(), referencedAliases: new Set() };
}

export function combineSymbolTables(first: SymbolTable | undefined, second: SymbolTable | undefined, host: SymbolMergeHost, state: SymbolMergeState): SymbolTable {
  const result: SymbolTable = new Map(first ?? []);
  if (second !== undefined) mergeSymbolTable(result, second, false, undefined, host, state);
  return result;
}

export function mergeSymbolTable(target: SymbolTable, source: SymbolTable, unidirectional: boolean, mergedParent: AstSymbol | undefined, host: SymbolMergeHost, state: SymbolMergeState): void {
  for (const [name, sourceSymbol] of source) {
    const targetSymbol = target.get(name);
    const merged = targetSymbol === undefined ? cloneSymbol(sourceSymbol) : mergeSymbol(targetSymbol, sourceSymbol, unidirectional, host, state);
    if (mergedParent !== undefined) merged.parent = mergedParent;
    target.set(name, merged);
  }
}

export function mergeSymbol(target: AstSymbol, source: AstSymbol, unidirectional: boolean, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol {
  if (target === source) return target;
  const excluded = getExcludedSymbolFlags(target.flags ?? 0);
  if (((source.flags ?? 0) & excluded) !== 0) {
    reportMergeSymbolError(target, source, host, state);
    return target;
  }
  target.flags = (target.flags ?? 0) | (source.flags ?? 0);
  target.declarations.push(...newDeclarations(target, source));
  if (target.valueDeclaration === undefined && source.valueDeclaration !== undefined) target.valueDeclaration = source.valueDeclaration;
  if (source.members !== undefined) {
    if (target.members === undefined) target.members = new Map();
    mergeSymbolTable(target.members, source.members, unidirectional, target, host, state);
  }
  if (source.exports !== undefined) {
    if (target.exports === undefined) target.exports = new Map();
    mergeSymbolTable(target.exports, source.exports, unidirectional, target, host, state);
  }
  if (!unidirectional) state.mergedSymbols.set(source, target);
  return target;
}

export function reportMergeSymbolError(target: AstSymbol, source: AstSymbol, host: SymbolMergeHost, state: SymbolMergeState): void {
  const message = `Duplicate identifier '${symbolName(target) || symbolName(source)}'.`;
  const declarations = [...(target.declarations ?? []), ...(source.declarations ?? [])];
  state.duplicateReports.push({ target, source, message, declarations });
  for (const declaration of declarations) host.report?.(declaration, message);
}

export function addDuplicateDeclarationErrorsForSymbols(target: AstSymbol, source: AstSymbol, message: string, symbolNameText: string, host: SymbolMergeHost, state: SymbolMergeState): void {
  const declarations = [...(target.declarations ?? []), ...(source.declarations ?? [])];
  state.duplicateReports.push({ target, source, message: `${message}: ${symbolNameText}`, declarations });
  for (const declaration of declarations) host.report?.(declaration, `${message}: ${symbolNameText}`);
}

export function addDuplicateDeclarationError(node: AstNode, message: string, symbolNameText: string, relatedNodes: readonly AstNode[], host: SymbolMergeHost): void {
  host.report?.(node, `${message}: ${symbolNameText}`);
  for (const related of relatedNodes) host.report?.(related, `Related declaration for '${symbolNameText}'.`);
}

export function getExcludedSymbolFlags(flags: number): number {
  let result = 0;
  if ((flags & SymbolFlags.FunctionScopedVariable) !== 0) result |= SymbolFlags.FunctionScopedVariable | SymbolFlags.BlockScopedVariable | SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule;
  if ((flags & SymbolFlags.BlockScopedVariable) !== 0) result |= SymbolFlags.Value;
  if ((flags & SymbolFlags.Property) !== 0) result |= SymbolFlags.Property | SymbolFlags.Accessor;
  if ((flags & SymbolFlags.EnumMember) !== 0) result |= SymbolFlags.EnumMember | SymbolFlags.Property;
  if ((flags & SymbolFlags.Function) !== 0) result |= SymbolFlags.Value & ~SymbolFlags.Function;
  if ((flags & SymbolFlags.Class) !== 0) result |= SymbolFlags.ValueModule | SymbolFlags.Class;
  if ((flags & SymbolFlags.Interface) !== 0) result |= SymbolFlags.Type & ~SymbolFlags.Interface;
  if ((flags & SymbolFlags.RegularEnum) !== 0) result |= SymbolFlags.RegularEnum | SymbolFlags.ConstEnum;
  if ((flags & SymbolFlags.ConstEnum) !== 0) result |= SymbolFlags.RegularEnum | SymbolFlags.ConstEnum;
  if ((flags & SymbolFlags.ValueModule) !== 0) result |= SymbolFlags.Class | SymbolFlags.Function;
  if ((flags & SymbolFlags.Method) !== 0) result |= SymbolFlags.Method | SymbolFlags.Property | SymbolFlags.Accessor;
  if ((flags & SymbolFlags.GetAccessor) !== 0) result |= SymbolFlags.Property | SymbolFlags.Method | SymbolFlags.GetAccessor;
  if ((flags & SymbolFlags.SetAccessor) !== 0) result |= SymbolFlags.Property | SymbolFlags.Method | SymbolFlags.SetAccessor;
  if ((flags & SymbolFlags.TypeAlias) !== 0) result |= SymbolFlags.Type;
  if ((flags & SymbolFlags.Alias) !== 0) result |= SymbolFlags.Alias;
  return result;
}

export function cloneSymbol(symbol: AstSymbol): AstSymbol {
  const clone = cloneSymbolShell(symbol);
  if (symbol.flags !== undefined) clone.flags = symbol.flags;
  clone.declarations = [...(symbol.declarations ?? [])];
  if (symbol.valueDeclaration !== undefined) clone.valueDeclaration = symbol.valueDeclaration;
  if (symbol.members !== undefined) clone.members = new Map(symbol.members);
  if (symbol.exports !== undefined) clone.exports = new Map(symbol.exports);
  if (symbol.parent !== undefined) clone.parent = symbol.parent;
  if (symbol.exportSymbol !== undefined) clone.exportSymbol = symbol.exportSymbol;
  return clone;
}

export function getMergedSymbol(symbol: AstSymbol, state: SymbolMergeState): AstSymbol {
  return state.mergedSymbols.get(symbol) ?? symbol;
}

export function getParentOfSymbol(symbol: AstSymbol): AstSymbol | undefined {
  return symbol.parent ?? symbol.valueDeclaration?.parent?.symbol;
}

export function recordMergedSymbol(target: AstSymbol, source: AstSymbol, state: SymbolMergeState): void {
  state.mergedSymbols.set(source, target);
}

export function getSymbolIfSameReference(left: AstSymbol | undefined, right: AstSymbol | undefined, state: SymbolMergeState): AstSymbol | undefined {
  if (left === undefined || right === undefined) return undefined;
  return getMergedSymbol(left, state) === getMergedSymbol(right, state) ? getMergedSymbol(left, state) : undefined;
}

export function getExportSymbolOfValueSymbolIfExported(symbol: AstSymbol): AstSymbol {
  return symbol.exportSymbol ?? symbol;
}

export function getSymbolOfDeclaration(node: AstNode, host: SymbolMergeHost): AstSymbol | undefined {
  return host.getSymbolOfDeclaration?.(node) ?? node.symbol;
}

export function getSymbolOfNode(node: AstNode, host: SymbolMergeHost): AstSymbol | undefined {
  return node.symbol ?? getSymbolOfDeclaration(node, host);
}

export function getLateBoundSymbol(symbol: AstSymbol): AstSymbol {
  return (symbol as { readonly lateBoundSymbol?: AstSymbol }).lateBoundSymbol ?? symbol;
}

export function resolveSymbol(symbol: AstSymbol, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol {
  return resolveSymbolEx(symbol, false, host, state);
}

export function resolveSymbolEx(symbol: AstSymbol, dontResolveAlias: boolean, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol {
  const merged = getMergedSymbol(symbol, state);
  if (dontResolveAlias || ((merged.flags ?? 0) & SymbolFlags.Alias) === 0) return merged;
  return resolveAlias(merged, host, state).resolved;
}

export function resolveAlias(symbol: AstSymbol, host: SymbolMergeHost, state: SymbolMergeState): AliasResolutionResult {
  if (state.resolvingAliases.has(symbol)) return { input: symbol, resolved: host.unknownSymbol ?? symbol, circular: true, typeOnly: false };
  const cached = (symbol as { readonly resolvedAlias?: AstSymbol }).resolvedAlias;
  if (cached !== undefined) return { input: symbol, resolved: cached, circular: false, typeOnly: isTypeOnlyAlias(symbol, host) };
  state.resolvingAliases.add(symbol);
  const target = tryResolveAlias(symbol, host, state) ?? host.unknownSymbol ?? symbol;
  state.resolvingAliases.delete(symbol);
  (symbol as { resolvedAlias?: AstSymbol }).resolvedAlias = target;
  return { input: symbol, resolved: target, circular: false, typeOnly: isTypeOnlyAlias(symbol, host) };
}

export function tryResolveAlias(symbol: AstSymbol, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol | undefined {
  const declaration = getDeclarationOfAliasSymbol(symbol);
  if (declaration === undefined) return (symbol as { readonly target?: AstSymbol }).target;
  switch (declaration.kind) {
    case Kind.ImportSpecifier:
    case Kind.ExportSpecifier:
      return getTargetOfSpecifierAlias(declaration, host, state);
    case Kind.ImportClause:
    case Kind.NamespaceImport:
    case Kind.NamespaceExport:
      return getTargetOfNamespaceAlias(declaration, host);
    case Kind.ImportEqualsDeclaration:
      return getTargetOfImportEqualsDeclaration(declaration, host);
    case Kind.ExportAssignment:
      return getTargetOfExportAssignment(declaration, host, state);
    default:
      return (symbol as { readonly target?: AstSymbol }).target;
  }
}

export function resolveAliasWithDeprecationCheck(symbol: AstSymbol, location: AstNode, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol {
  const result = resolveAlias(symbol, host, state).resolved;
  if (isDeprecatedSymbol(result)) host.report?.(location, `'${symbolName(result)}' is deprecated.`);
  return result;
}

export function getSymbolFlags(symbol: AstSymbol, host: SymbolMergeHost, state: SymbolMergeState): number {
  return getSymbolFlagsEx(symbol, false, false, host, state);
}

export function getSymbolFlagsEx(symbol: AstSymbol, excludeTypeOnlyMeanings: boolean, excludeLocalMeanings: boolean, host: SymbolMergeHost, state: SymbolMergeState): number {
  const merged = getMergedSymbol(symbol, state);
  let flags = merged.flags ?? 0;
  if ((flags & SymbolFlags.Alias) !== 0) {
    const resolved = resolveAlias(merged, host, state).resolved;
    flags |= resolved.flags ?? 0;
  }
  if (excludeTypeOnlyMeanings) flags &= ~SymbolFlags.Type;
  if (excludeLocalMeanings) flags &= ~SymbolFlags.Value;
  return flags;
}

export function getDeclarationOfAliasSymbol(symbol: AstSymbol): AstNode | undefined {
  return (symbol.declarations ?? []).find(isAliasDeclaration);
}

export function getTypeOnlyDeclarationOfEntityName(name: AstNode, host: SymbolMergeHost): AstNode | undefined {
  const symbol = name.symbol;
  return symbol === undefined ? undefined : host.getTypeOnlyAliasDeclaration?.(symbol, SymbolFlags.Type);
}

export function markSymbolOfAliasDeclarationIfTypeOnly(aliasDeclaration: AstNode, exportStarDeclaration: AstNode | undefined, host: SymbolMergeHost): boolean {
  const symbol = aliasDeclaration.symbol;
  if (symbol === undefined) return false;
  const typeOnly = isTypeOnlyDeclaration(aliasDeclaration) || (exportStarDeclaration !== undefined && isTypeOnlyDeclaration(exportStarDeclaration));
  if (typeOnly) (symbol as { typeOnlyDeclaration?: AstNode }).typeOnlyDeclaration = aliasDeclaration;
  void host;
  return typeOnly;
}

export function markAliasSymbolAsReferenced(symbol: AstSymbol, state: SymbolMergeState): void {
  state.referencedAliases.add(symbol);
  (symbol as { referenced?: boolean }).referenced = true;
}

export function markAliasReferenced(symbol: AstSymbol | undefined, location: AstNode, state: SymbolMergeState): void {
  if (symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) markAliasSymbolAsReferenced(symbol, state);
  void location;
}

export function markExportAsReferenced(node: AstNode, state: SymbolMergeState): void {
  const symbol = node.symbol;
  if (symbol !== undefined) markAliasSymbolAsReferenced(symbol, state);
}

export function getExportsOfSymbol(symbol: AstSymbol, host: SymbolMergeHost): SymbolTable {
  if (symbol.exports !== undefined) return symbol.exports;
  return host.getExportsOfSymbol?.(symbol) ?? new Map();
}

export function getMembersOfSymbol(symbol: AstSymbol, host: SymbolMergeHost): SymbolTable {
  if (symbol.members !== undefined) return symbol.members;
  return host.getMembersOfSymbol?.(symbol) ?? new Map();
}

export function getExportOfModule(moduleSymbol: AstSymbol, nameText: string, specifier: AstNode | undefined, dontResolveAlias: boolean, host: SymbolMergeHost, state: SymbolMergeState): ExportLookupResult {
  const exports = getExportsOfSymbol(moduleSymbol, host);
  const direct = exports.get(nameText);
  if (direct !== undefined) {
    const symbol = dontResolveAlias ? direct : resolveSymbolEx(direct, false, host, state);
    return { moduleSymbol, name: nameText, symbol, defaultOnly: false, syntheticDefault: false };
  }
  if (nameText === "default" && canHaveSyntheticDefault(moduleSymbol, dontResolveAlias, specifier)) {
    return { moduleSymbol, name: nameText, symbol: createDefaultPropertyWrapperForModule(moduleSymbol), defaultOnly: true, syntheticDefault: true };
  }
  return { moduleSymbol, name: nameText, defaultOnly: false, syntheticDefault: false };
}

export function resolveExportByName(moduleSymbol: AstSymbol, name: string, sourceNode: AstNode | undefined, dontResolveAlias: boolean, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol | undefined {
  const result = getExportOfModule(moduleSymbol, name, sourceNode, dontResolveAlias, host, state);
  if (result.symbol === undefined && sourceNode !== undefined) host.report?.(sourceNode, `Module has no exported member '${name}'.`);
  return result.symbol;
}

export function extendExportSymbols(target: SymbolTable, source: SymbolTable, lookupTable: Map<string, AstNode>, exportNode: AstNode, host: SymbolMergeHost, state: SymbolMergeState): void {
  for (const [name, symbol] of source) {
    const existing = target.get(name);
    if (existing !== undefined && existing !== symbol) {
      lookupTable.set(name, exportNode);
      reportMergeSymbolError(existing, symbol, host, state);
      continue;
    }
    target.set(name, symbol);
  }
}

export function hasExportedMembersOfKind(moduleSymbol: AstSymbol, kind: number, host: SymbolMergeHost): boolean {
  for (const symbol of getExportsOfSymbol(moduleSymbol, host).values()) {
    if (((symbol.flags ?? 0) & kind) !== 0) return true;
  }
  return false;
}

export function hasShadowedNamespace(symbol: AstSymbol): boolean {
  if (((symbol.flags ?? 0) & SymbolFlags.NamespaceModule) === 0) return false;
  const parentExports = symbol.parent?.exports;
  return parentExports?.get(symbolName(symbol)) !== symbol;
}

export function cloneTypeAsModuleType(symbol: AstSymbol, moduleType: Type, referenceParent: AstNode | undefined): AstSymbol {
  const clone = cloneSymbol(symbol);
  (clone as { type?: Type }).type = moduleType;
  if (referenceParent !== undefined) (clone as { referenceParent?: AstNode }).referenceParent = referenceParent;
  return clone;
}

export function createDefaultPropertyWrapperForModule(symbol: AstSymbol): AstSymbol {
  const wrapper = cloneSymbolShell(symbol);
  wrapper.flags = SymbolFlags.Property | SymbolFlags.Transient;
  wrapper.declarations = [...(symbol.declarations ?? [])];
  (wrapper as { target?: AstSymbol }).target = symbol;
  return wrapper;
}

export function combineValueAndTypeSymbols(valueSymbol: AstSymbol, typeSymbol: AstSymbol, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol {
  const clone = cloneSymbol(valueSymbol);
  mergeSymbol(clone, typeSymbol, true, host, state);
  return clone;
}

export function getPropertyOfVariable(symbol: AstSymbol, name: string): AstSymbol | undefined {
  return symbol.members?.get(name) ?? symbol.exports?.get(name);
}

export function isOnlyImportableAsDefault(usage: AstNode | undefined, resolvedModule: AstSymbol): boolean {
  return usage?.kind === Kind.ImportClause && !getExportsOfSymbolFromSymbol(resolvedModule).has("default") && canHaveSyntheticDefault(resolvedModule, false, usage);
}

export function canHaveSyntheticDefault(moduleSymbol: AstSymbol, dontResolveAlias: boolean, usage: AstNode | undefined): boolean {
  if (dontResolveAlias) return false;
  if (getExportsOfSymbolFromSymbol(moduleSymbol).has("default")) return false;
  return Boolean((moduleSymbol as { readonly commonJs?: boolean }).commonJs) || usage?.kind === Kind.ImportClause;
}

export function getTargetOfImportEqualsDeclaration(node: AstNode, host: SymbolMergeHost): AstSymbol | undefined {
  const moduleRef = (node as { readonly moduleReference?: AstNode }).moduleReference;
  if (moduleRef === undefined) return undefined;
  if (moduleRef.kind === Kind.ExternalModuleReference) {
    const expression = (moduleRef as { readonly expression?: AstNode }).expression;
    return host.resolveExternalModuleName?.(node, nodeText(expression), false);
  }
  return moduleRef.symbol;
}

export function getTargetOfExportAssignment(node: AstNode, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol | undefined {
  const expression = (node as { readonly expression?: AstNode }).expression;
  const symbol = expression?.symbol;
  return symbol === undefined ? undefined : resolveSymbol(symbol, host, state);
}

function getTargetOfSpecifierAlias(node: AstNode, host: SymbolMergeHost, state: SymbolMergeState): AstSymbol | undefined {
  const propertyName = (node as { readonly propertyName?: AstNode }).propertyName;
  const name = propertyName ?? (node as { readonly name?: AstNode }).name;
  const parentSymbol = node.parent?.symbol;
  if (parentSymbol === undefined || name === undefined) return node.symbol;
  return resolveExportByName(parentSymbol, nodeText(name), node, false, host, state) ?? node.symbol;
}

function getTargetOfNamespaceAlias(node: AstNode, host: SymbolMergeHost): AstSymbol | undefined {
  const parent = node.parent;
  const moduleSpecifier = findModuleSpecifier(parent);
  if (moduleSpecifier === undefined) return node.symbol;
  return host.resolveExternalModuleName?.(node, nodeText(moduleSpecifier), false) ?? node.symbol;
}

function getExportsOfSymbolFromSymbol(symbol: AstSymbol): SymbolTable {
  return symbol.exports ?? new Map();
}

function isAliasDeclaration(node: AstNode): boolean {
  return node.kind === Kind.ImportClause
    || node.kind === Kind.ImportSpecifier
    || node.kind === Kind.ExportSpecifier
    || node.kind === Kind.NamespaceImport
    || node.kind === Kind.NamespaceExport
    || node.kind === Kind.ImportEqualsDeclaration
    || node.kind === Kind.ExportAssignment;
}

function isTypeOnlyAlias(symbol: AstSymbol, host: SymbolMergeHost): boolean {
  return host.getTypeOnlyAliasDeclaration?.(symbol, SymbolFlags.Type | SymbolFlags.Value) !== undefined
    || (symbol as { readonly typeOnlyDeclaration?: AstNode }).typeOnlyDeclaration !== undefined;
}

function isTypeOnlyDeclaration(node: AstNode): boolean {
  return Boolean((node as { readonly isTypeOnly?: boolean }).isTypeOnly) || hasModifier(node, "type");
}

function isDeprecatedSymbol(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly deprecated?: boolean }).deprecated)
    || (symbol.declarations ?? []).some(declaration => Boolean((declaration as { readonly deprecated?: boolean }).deprecated));
}

function newDeclarations(target: AstSymbol, source: AstSymbol): readonly AstNode[] {
  const existing = new Set(target.declarations ?? []);
  return (source.declarations ?? []).filter(declaration => !existing.has(declaration));
}

function findModuleSpecifier(node: AstNode | undefined): AstNode | undefined {
  if (node === undefined) return undefined;
  return (node as { readonly moduleSpecifier?: AstNode }).moduleSpecifier
    ?? (node as { readonly expression?: AstNode }).expression
    ?? findModuleSpecifier(node.parent);
}

function hasModifier(node: AstNode | undefined, modifier: string): boolean {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] } | undefined)?.modifiers ?? [];
  return modifiers.some(item => nodeText(item) === modifier || Kind[item.kind]?.toLowerCase() === `${modifier}keyword`);
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function cloneSymbolShell(symbol: AstSymbol): AstSymbol {
  return {
    ...(symbol.name !== undefined ? { name: symbol.name } : {}),
    ...(symbol.escapedName !== undefined ? { escapedName: symbol.escapedName } : {}),
    declarations: [...(symbol.declarations ?? [])],
  };
}
