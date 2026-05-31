/**
 * Module, alias, and symbol-resolution support.
 *
 * TS-Go keeps import/export target resolution, alias chasing, export-star
 * merging, synthetic default handling, and module-member lookup in
 * `checker.go`. This split module ports that machinery into explicit,
 * reusable operations over TSTS symbols and module records.
 */

import type { Node as AstNode, SourceFile, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { Type } from "./types.js";

export type ModuleResolutionMode = "import" | "export" | "augmentation" | "type-query";
export type AliasResolutionState = "resolved" | "unresolved" | "circular" | "type-only";
export type ExportCollisionKind = "none" | "duplicate" | "ambiguous-star" | "type-only-conflict";

export interface ModuleSymbolEnvironment {
  readonly globals: ReadonlyMap<string, AstSymbol>;
  readonly ambientModules: ReadonlyMap<string, AstSymbol>;
  readonly sourceFiles: readonly SourceFile[];
  readonly resolveExternalModuleName?: (location: AstNode, moduleReference: string, mode: ModuleResolutionMode) => AstSymbol | undefined;
  readonly getExportsOfSymbol?: (symbol: AstSymbol) => ReadonlyMap<string, AstSymbol>;
  readonly getMembersOfSymbol?: (symbol: AstSymbol) => ReadonlyMap<string, AstSymbol>;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface AliasResolutionResult {
  readonly state: AliasResolutionState;
  readonly symbol?: AstSymbol;
  readonly typeOnlyDeclaration?: AstNode;
  readonly chain: readonly AstSymbol[];
}

export interface ExportMergeResult {
  readonly exports: ReadonlyMap<string, AstSymbol>;
  readonly collisions: readonly ExportCollision[];
  readonly typeOnlyExportStarMap: ReadonlyMap<string, AstNode>;
}

export interface ExportCollision {
  readonly kind: ExportCollisionKind;
  readonly name: string;
  readonly first: AstSymbol;
  readonly second: AstSymbol;
  readonly node?: AstNode;
}

export interface ImportOrExportTarget {
  readonly node: AstNode;
  readonly name: string;
  readonly moduleSymbol?: AstSymbol;
  readonly target?: AstSymbol;
  readonly typeOnly: boolean;
}

export function resolveAlias(symbol: AstSymbol, environment: ModuleSymbolEnvironment): AliasResolutionResult {
  const chain: AstSymbol[] = [];
  let current: AstSymbol | undefined = symbol;
  const seen = new Set<AstSymbol>();
  while (current !== undefined) {
    chain.push(current);
    if (seen.has(current)) return { state: "circular", chain };
    seen.add(current);
    const typeOnlyDeclaration = getTypeOnlyAliasDeclaration(current);
    if (typeOnlyDeclaration !== undefined) {
      return { state: "type-only", symbol: current, typeOnlyDeclaration, chain };
    }
    const target: AstSymbol | undefined = getImmediateAliasedSymbol(current) ?? current.exportSymbol;
    if (target === undefined || target === current || ((current.flags ?? 0) & SymbolFlags.Alias) === 0) {
      return { state: "resolved", symbol: current, chain };
    }
    current = target;
  }
  void environment;
  return { state: "unresolved", chain };
}

export function resolveAliasWithDeprecationCheck(
  symbol: AstSymbol,
  location: AstNode,
  environment: ModuleSymbolEnvironment,
): AliasResolutionResult {
  const result = resolveAlias(symbol, environment);
  if (result.symbol !== undefined && isDeprecatedSymbol(result.symbol)) {
    environment.report?.(location, `'${symbolName(result.symbol)}' is deprecated.`);
  }
  return result;
}

export function tryResolveAlias(symbol: AstSymbol, environment: ModuleSymbolEnvironment): AstSymbol | undefined {
  const result = resolveAlias(symbol, environment);
  return result.state === "resolved" ? result.symbol : undefined;
}

export function resolveExternalModuleName(
  location: AstNode,
  moduleReference: AstNode,
  environment: ModuleSymbolEnvironment,
  mode: ModuleResolutionMode,
): AstSymbol | undefined {
  const moduleName = moduleSpecifierText(moduleReference);
  if (moduleName.length === 0) return undefined;
  const direct = environment.resolveExternalModuleName?.(location, moduleName, mode);
  if (direct !== undefined) return direct;
  const ambient = tryFindAmbientModule(moduleName, true, environment);
  if (ambient !== undefined) return ambient;
  environment.report?.(moduleReference, `Cannot find module '${moduleName}' or its corresponding type declarations.`);
  return undefined;
}

export function tryFindAmbientModule(
  moduleName: string,
  withAugmentations: boolean,
  environment: ModuleSymbolEnvironment,
): AstSymbol | undefined {
  const direct = environment.ambientModules.get(moduleName);
  if (direct !== undefined) return direct;
  if (!withAugmentations) return undefined;
  for (const [ambientName, symbol] of environment.ambientModules) {
    if (ambientName.endsWith("*") && moduleName.startsWith(ambientName.slice(0, -1))) return symbol;
  }
  return undefined;
}

export function getAmbientModules(environment: ModuleSymbolEnvironment): readonly AstSymbol[] {
  return [...environment.ambientModules.values()].sort((left, right) => symbolName(left).localeCompare(symbolName(right)));
}

export function getExportsOfModule(moduleSymbol: AstSymbol, environment: ModuleSymbolEnvironment): ReadonlyMap<string, AstSymbol> {
  const direct = environment.getExportsOfSymbol?.(moduleSymbol);
  if (direct !== undefined) return direct;
  return moduleSymbol.exports ?? new Map();
}

export function getMembersOfSymbol(symbol: AstSymbol, environment: ModuleSymbolEnvironment): ReadonlyMap<string, AstSymbol> {
  const direct = environment.getMembersOfSymbol?.(symbol);
  if (direct !== undefined) return direct;
  return symbol.members ?? new Map();
}

export function resolveExportByName(
  moduleSymbol: AstSymbol,
  name: string,
  sourceNode: AstNode,
  dontResolveAlias: boolean,
  environment: ModuleSymbolEnvironment,
): AstSymbol | undefined {
  const exportSymbol = getExportsOfModule(moduleSymbol, environment).get(name);
  if (exportSymbol === undefined) {
    environment.report?.(sourceNode, `Module '${symbolName(moduleSymbol)}' has no exported member '${name}'.`);
    return undefined;
  }
  return dontResolveAlias ? exportSymbol : resolveAlias(exportSymbol, environment).symbol ?? exportSymbol;
}

export function getTargetOfImportSpecifier(
  node: AstNode,
  environment: ModuleSymbolEnvironment,
): ImportOrExportTarget {
  const moduleSymbol = moduleSymbolFromImportOrExport(node, environment);
  const name = importOrExportName(node);
  const target = moduleSymbol === undefined ? undefined : resolveExportByName(moduleSymbol, name, node, false, environment);
  return { node, name, ...(moduleSymbol === undefined ? {} : { moduleSymbol }), ...(target === undefined ? {} : { target }), typeOnly: isTypeOnlyImportOrExport(node) };
}

export function getTargetOfExportSpecifier(
  node: AstNode,
  meaning: SymbolFlags,
  dontResolveAlias: boolean,
  environment: ModuleSymbolEnvironment,
): ImportOrExportTarget {
  const moduleSymbol = moduleSymbolFromImportOrExport(node, environment);
  const name = importOrExportName(node);
  const target = moduleSymbol === undefined
    ? localSymbolForExport(node, name, meaning, environment)
    : resolveExportByName(moduleSymbol, name, node, dontResolveAlias, environment);
  return { node, name, ...(moduleSymbol === undefined ? {} : { moduleSymbol }), ...(target === undefined ? {} : { target }), typeOnly: isTypeOnlyImportOrExport(node) };
}

export function getTargetOfNamespaceImport(node: AstNode, environment: ModuleSymbolEnvironment): AstSymbol | undefined {
  const moduleSymbol = moduleSymbolFromImportOrExport(node, environment);
  return moduleSymbol === undefined ? undefined : resolveExternalModuleSymbol(moduleSymbol, false, environment);
}

export function getTargetOfNamespaceExport(node: AstNode, environment: ModuleSymbolEnvironment): AstSymbol | undefined {
  const moduleSymbol = moduleSymbolFromImportOrExport(node, environment);
  return moduleSymbol === undefined ? undefined : resolveExternalModuleSymbol(moduleSymbol, false, environment);
}

export function getTargetOfExportAssignment(node: AstNode, environment: ModuleSymbolEnvironment): AstSymbol | undefined {
  const expression = (node as { readonly expression?: AstNode }).expression;
  if (expression === undefined) return undefined;
  const name = expressionText(expression);
  const symbol = environment.globals.get(name);
  return symbol === undefined ? undefined : resolveAlias(symbol, environment).symbol;
}

export function resolveExternalModuleSymbol(
  moduleSymbol: AstSymbol,
  dontResolveAlias: boolean,
  environment: ModuleSymbolEnvironment,
): AstSymbol | undefined {
  if (dontResolveAlias) return moduleSymbol;
  const resolved = resolveAlias(moduleSymbol, environment);
  return resolved.symbol ?? moduleSymbol;
}

export function getExportOfModule(
  moduleSymbol: AstSymbol,
  nameText: string,
  specifier: AstNode | undefined,
  dontResolveAlias: boolean,
  environment: ModuleSymbolEnvironment,
): AstSymbol | undefined {
  const symbol = getExportsOfModule(moduleSymbol, environment).get(nameText);
  if (symbol === undefined) {
    if (specifier !== undefined) environment.report?.(specifier, `Module has no exported member '${nameText}'.`);
    return undefined;
  }
  return dontResolveAlias ? symbol : resolveAlias(symbol, environment).symbol ?? symbol;
}

export function extendExportSymbols(
  target: Map<string, AstSymbol>,
  source: ReadonlyMap<string, AstSymbol>,
  exportNode: AstNode | undefined,
): ExportMergeResult {
  const collisions: ExportCollision[] = [];
  const typeOnlyExportStarMap = new Map<string, AstNode>();
  for (const [name, sourceSymbol] of source) {
    if (name === "default") continue;
    const targetSymbol = target.get(name);
    if (targetSymbol === undefined) {
      target.set(name, sourceSymbol);
      if (isTypeOnlySymbol(sourceSymbol) && exportNode !== undefined) typeOnlyExportStarMap.set(name, exportNode);
      continue;
    }
    const collision = classifyExportCollision(name, targetSymbol, sourceSymbol, exportNode);
    if (collision.kind === "none") continue;
    collisions.push(collision);
  }
  return { exports: target, collisions, typeOnlyExportStarMap };
}

export function classifyExportCollision(
  name: string,
  first: AstSymbol,
  second: AstSymbol,
  node: AstNode | undefined,
): ExportCollision {
  if (first === second) return { kind: "none", name, first, second, ...(node === undefined ? {} : { node }) };
  if (isTypeOnlySymbol(first) !== isTypeOnlySymbol(second)) {
    return { kind: "type-only-conflict", name, first, second, ...(node === undefined ? {} : { node }) };
  }
  if ((first.flags ?? 0) === (second.flags ?? 0)) {
    return { kind: "ambiguous-star", name, first, second, ...(node === undefined ? {} : { node }) };
  }
  return { kind: "duplicate", name, first, second, ...(node === undefined ? {} : { node }) };
}

export function getResolvedMembersOrExportsOfSymbol(
  symbol: AstSymbol,
  resolutionKind: "members" | "exports",
  environment: ModuleSymbolEnvironment,
): ReadonlyMap<string, AstSymbol> {
  return resolutionKind === "members" ? getMembersOfSymbol(symbol, environment) : getExportsOfModule(symbol, environment);
}

export function lateBindMember(
  parent: AstSymbol,
  earlySymbols: Map<string, AstSymbol>,
  lateSymbols: Map<string, AstSymbol>,
  declaration: AstNode,
): AstSymbol {
  const name = computedDeclarationName(declaration);
  const existing = earlySymbols.get(name) ?? lateSymbols.get(name);
  if (existing !== undefined) return existing;
  const symbol: AstSymbol = {
    name,
    escapedName: name,
    flags: declarationSymbolFlags(declaration),
    declarations: [declaration],
    parent,
  };
  lateSymbols.set(name, symbol);
  return symbol;
}

export function lateBindIndexSignature(
  parent: AstSymbol,
  earlySymbols: Map<string, AstSymbol>,
  lateSymbols: Map<string, AstSymbol>,
  declaration: AstNode,
): AstSymbol {
  const name = `__index_${lateSymbols.size}`;
  const symbol: AstSymbol = {
    name,
    escapedName: name,
    flags: SymbolFlags.Signature,
    declarations: [declaration],
    parent,
  };
  if (!earlySymbols.has(name)) lateSymbols.set(name, symbol);
  return symbol;
}

export function addDeclarationToLateBoundSymbol(symbol: AstSymbol, member: AstNode, symbolFlags: SymbolFlags): AstSymbol {
  symbol.flags = (symbol.flags ?? SymbolFlags.None) | symbolFlags;
  symbol.declarations = [...symbol.declarations ?? [], member];
  return symbol;
}

export function combineValueAndTypeSymbols(valueSymbol: AstSymbol, typeSymbol: AstSymbol): AstSymbol {
  const members = mergeSymbolTables(valueSymbol.members, typeSymbol.members);
  const exports = mergeSymbolTables(valueSymbol.exports, typeSymbol.exports);
  return {
    ...valueSymbol,
    flags: (valueSymbol.flags ?? 0) | (typeSymbol.flags ?? 0),
    declarations: [...valueSymbol.declarations ?? [], ...typeSymbol.declarations ?? []],
    ...(members === undefined ? {} : { members }),
    ...(exports === undefined ? {} : { exports }),
  };
}

export function getPropertyOfVariable(symbol: AstSymbol, name: string, environment: ModuleSymbolEnvironment): AstSymbol | undefined {
  const type = environment.getTypeOfSymbol?.(symbol);
  if (type === undefined) return undefined;
  return (type.symbol?.members ?? new Map()).get(name);
}

export function hasExportedMembersOfKind(moduleSymbol: AstSymbol, kind: SymbolFlags, environment: ModuleSymbolEnvironment): boolean {
  for (const symbol of getExportsOfModule(moduleSymbol, environment).values()) {
    if (((symbol.flags ?? 0) & kind) !== 0) return true;
  }
  return false;
}

export function hasShadowedNamespace(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Namespace) !== 0
    && ((symbol.flags ?? 0) & (SymbolFlags.Value | SymbolFlags.Type)) !== 0;
}

export function canHaveSyntheticDefault(moduleSymbol: AstSymbol, usage: AstNode, environment: ModuleSymbolEnvironment): boolean {
  const exports = getExportsOfModule(moduleSymbol, environment);
  if (exports.has("default")) return false;
  const sourceFile = sourceFileOf(usage);
  return Boolean((sourceFile as { readonly esModuleInterop?: boolean } | undefined)?.esModuleInterop)
    || Boolean((sourceFile as { readonly allowSyntheticDefaultImports?: boolean } | undefined)?.allowSyntheticDefaultImports);
}

export function getTypeWithSyntheticDefaultOnly(moduleType: Type, symbol: AstSymbol, originalSymbol: AstSymbol): Type {
  return {
    ...moduleType,
    symbol: {
      ...symbol,
      exports: new Map([["default", originalSymbol]]),
    },
  };
}

export function markSymbolOfAliasDeclarationIfTypeOnly(aliasDeclaration: AstNode, exportStarDeclaration: AstNode | undefined): boolean {
  const symbol = (aliasDeclaration as { readonly symbol?: AstSymbol }).symbol;
  if (symbol === undefined || !isTypeOnlyImportOrExport(aliasDeclaration)) return false;
  (symbol as { typeOnlyDeclaration?: AstNode }).typeOnlyDeclaration = aliasDeclaration;
  if (exportStarDeclaration !== undefined) {
    (symbol as { typeOnlyExportStarName?: string }).typeOnlyExportStarName = moduleSpecifierText(exportStarDeclaration);
  }
  return true;
}

function moduleSymbolFromImportOrExport(node: AstNode, environment: ModuleSymbolEnvironment): AstSymbol | undefined {
  const specifier = (node as { readonly moduleSpecifier?: AstNode }).moduleSpecifier;
  if (specifier === undefined) return undefined;
  return resolveExternalModuleName(node, specifier, environment, node.kind === Kind.ExportDeclaration ? "export" : "import");
}

function localSymbolForExport(
  node: AstNode,
  name: string,
  meaning: SymbolFlags,
  environment: ModuleSymbolEnvironment,
): AstSymbol | undefined {
  const sourceFile = sourceFileOf(node);
  const locals = (sourceFile as { readonly locals?: ReadonlyMap<string, AstSymbol> } | undefined)?.locals;
  const symbol = locals?.get(name) ?? environment.globals.get(name);
  return symbol !== undefined && ((symbol.flags ?? 0) & meaning) !== 0 ? symbol : undefined;
}

function moduleSpecifierText(node: AstNode): string {
  const candidate = node as { readonly text?: string; readonly moduleSpecifier?: AstNode | string; readonly expression?: AstNode };
  if (candidate.text !== undefined) return candidate.text;
  if (typeof candidate.moduleSpecifier === "string") return candidate.moduleSpecifier;
  if (candidate.moduleSpecifier !== undefined) return moduleSpecifierText(candidate.moduleSpecifier);
  if (candidate.expression !== undefined) return moduleSpecifierText(candidate.expression);
  return "";
}

function importOrExportName(node: AstNode): string {
  const propertyName = (node as { readonly propertyName?: AstNode | string }).propertyName;
  if (typeof propertyName === "string") return propertyName;
  if (propertyName !== undefined) return expressionText(propertyName);
  const name = (node as { readonly name?: AstNode | string }).name;
  if (typeof name === "string") return name;
  return name === undefined ? "default" : expressionText(name);
}

function expressionText(node: AstNode): string {
  const candidate = node as { readonly text?: string; readonly escapedText?: string; readonly name?: AstNode | string };
  if (candidate.text !== undefined) return candidate.text;
  if (candidate.escapedText !== undefined) return candidate.escapedText;
  if (typeof candidate.name === "string") return candidate.name;
  return candidate.name === undefined ? "" : expressionText(candidate.name);
}

function computedDeclarationName(node: AstNode): string {
  const text = expressionText(node);
  if (text.length !== 0) return text;
  return `__computed_${node.kind}`;
}

function declarationSymbolFlags(node: AstNode): SymbolFlags {
  switch (node.kind) {
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
      return SymbolFlags.Method;
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
      return SymbolFlags.Property;
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return SymbolFlags.Accessor;
    default:
      return SymbolFlags.Property;
  }
}

function isTypeOnlyImportOrExport(node: AstNode): boolean {
  return Boolean((node as { readonly isTypeOnly?: boolean; readonly typeOnly?: boolean }).isTypeOnly)
    || Boolean((node as { readonly typeOnly?: boolean }).typeOnly);
}

function isTypeOnlySymbol(symbol: AstSymbol): boolean {
  return getTypeOnlyAliasDeclaration(symbol) !== undefined
    || (((symbol.flags ?? 0) & SymbolFlags.Value) === 0 && ((symbol.flags ?? 0) & SymbolFlags.Type) !== 0);
}

function getTypeOnlyAliasDeclaration(symbol: AstSymbol): AstNode | undefined {
  return (symbol as { readonly typeOnlyDeclaration?: AstNode }).typeOnlyDeclaration;
}

function getImmediateAliasedSymbol(symbol: AstSymbol): AstSymbol | undefined {
  return (symbol as { readonly immediateTarget?: AstSymbol; readonly aliasTarget?: AstSymbol }).immediateTarget
    ?? (symbol as { readonly aliasTarget?: AstSymbol }).aliasTarget;
}

function isDeprecatedSymbol(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly deprecated?: boolean }).deprecated)
    || (symbol.declarations ?? []).some(declaration => Boolean((declaration as { readonly deprecated?: boolean }).deprecated));
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function mergeSymbolTables(
  left: Map<string, AstSymbol> | undefined,
  right: Map<string, AstSymbol> | undefined,
): Map<string, AstSymbol> | undefined {
  if (left === undefined && right === undefined) return undefined;
  const merged = new Map(left ?? []);
  for (const [name, symbol] of right ?? []) merged.set(name, symbol);
  return merged;
}

function sourceFileOf(node: AstNode): SourceFile | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) return current as SourceFile;
    current = current.parent;
  }
  return undefined;
}
