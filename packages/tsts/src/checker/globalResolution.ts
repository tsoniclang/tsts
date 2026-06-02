import { SymbolFlags, type Node as AstNode, type SourceFile, type Symbol as AstSymbol, type SymbolTable } from "../ast/index.js";
import { getSpellingSuggestion } from "../core/index.js";
import { anyType, getTypeOfSymbol, type CheckState } from "./checker.checkedtype.js";
import type { Type } from "./types.js";

export interface GlobalResolutionHost {
  readonly files: readonly SourceFile[];
  readonly globals: SymbolTable;
  readonly diagnostics: CheckState["diagnostics"];
}

export interface GlobalTypeLookup {
  readonly name: string;
  readonly arity: number;
  readonly reportErrors: boolean;
}

export function createFileIndexMap(files: readonly SourceFile[]): Map<SourceFile, number> {
  const result = new Map<SourceFile, number>();
  for (let index = 0; index < files.length; index++) result.set(files[index]!, index);
  return result;
}

export function countGlobalSymbols(files: readonly SourceFile[]): number {
  const names = new Set<string>();
  for (const file of files) {
    const locals = (file as unknown as { readonly locals?: SymbolTable }).locals;
    if (locals === undefined) continue;
    for (const name of locals.keys()) names.add(name);
  }
  return names.size;
}

export function getGlobalSymbol(
  host: GlobalResolutionHost,
  name: string,
  meaning: SymbolFlags,
  diagnosticMessage: string | undefined,
): AstSymbol | undefined {
  const symbol = host.globals.get(name);
  if (symbol !== undefined && symbolMatchesMeaning(symbol, meaning)) return symbol;
  if (diagnosticMessage !== undefined) {
    const suggestion = getSuggestedSymbolForNonexistentSymbol(name, host.globals.values(), meaning);
    host.diagnostics.push({ message: suggestion === undefined ? diagnosticMessage : `${diagnosticMessage} Did you mean '${symbolName(suggestion)}'?` });
  }
  return undefined;
}

export function getGlobalTypeSymbol(
  host: GlobalResolutionHost,
  name: string,
  reportErrors: boolean,
): AstSymbol | undefined {
  return getGlobalSymbol(
    host,
    name,
    SymbolFlags.Type,
    reportErrors ? `Cannot find global type '${name}'.` : undefined,
  );
}

export function getGlobalValueSymbol(
  host: GlobalResolutionHost,
  name: string,
  reportErrors: boolean,
): AstSymbol | undefined {
  return getGlobalSymbol(
    host,
    name,
    SymbolFlags.Value,
    reportErrors ? `Cannot find global value '${name}'.` : undefined,
  );
}

export function getGlobalType(
  host: GlobalResolutionHost,
  lookup: GlobalTypeLookup,
): Type {
  const symbol = getGlobalTypeAliasSymbol(host, lookup.name, lookup.arity, lookup.reportErrors)
    ?? getGlobalTypeSymbol(host, lookup.name, lookup.reportErrors);
  const type = symbol === undefined ? undefined : getTypeOfSymbol(symbol);
  return type ?? anyType;
}

export function getGlobalTypeAliasSymbol(
  host: GlobalResolutionHost,
  name: string,
  arity: number,
  reportErrors: boolean,
): AstSymbol | undefined {
  const symbol = getGlobalSymbol(
    host,
    name,
    SymbolFlags.TypeAlias,
    reportErrors ? `Cannot find global type alias '${name}'.` : undefined,
  );
  if (symbol === undefined) return undefined;
  const typeParameterCount = getTypeAliasTypeParameterCount(symbol);
  if (typeParameterCount !== arity) {
    if (reportErrors) host.diagnostics.push({ message: `Global type alias '${name}' has ${typeParameterCount} type parameter(s), expected ${arity}.` });
    return undefined;
  }
  return symbol;
}

export function getGlobalTypes(
  host: GlobalResolutionHost,
  names: readonly string[],
  arity: number,
  reportErrors: boolean,
): readonly Type[] {
  const result: Type[] = [];
  for (const name of names) result.push(getGlobalType(host, { name, arity, reportErrors }));
  return result;
}

export function getGlobalTypeResolver(
  host: GlobalResolutionHost,
  name: string,
  arity: number,
  reportErrors: boolean,
): () => Type {
  let cached: Type | undefined;
  return () => {
    cached ??= getGlobalType(host, { name, arity, reportErrors });
    return cached;
  };
}

export function getGlobalTypeAliasResolver(
  host: GlobalResolutionHost,
  name: string,
  arity: number,
  reportErrors: boolean,
): () => AstSymbol | undefined {
  let cached: AstSymbol | undefined;
  let resolved = false;
  return () => {
    if (!resolved) {
      cached = getGlobalTypeAliasSymbol(host, name, arity, reportErrors);
      resolved = true;
    }
    return cached;
  };
}

export function getGlobalValueSymbolResolver(
  host: GlobalResolutionHost,
  name: string,
  reportErrors: boolean,
): () => AstSymbol | undefined {
  let cached: AstSymbol | undefined;
  let resolved = false;
  return () => {
    if (!resolved) {
      cached = getGlobalValueSymbol(host, name, reportErrors);
      resolved = true;
    }
    return cached;
  };
}

export function getGlobalTypesResolver(
  host: GlobalResolutionHost,
  names: readonly string[],
  arity: number,
  reportErrors: boolean,
): () => readonly Type[] {
  let cached: readonly Type[] | undefined;
  return () => {
    cached ??= getGlobalTypes(host, names, arity, reportErrors);
    return cached;
  };
}

export function mergeGlobalSymbol(globals: SymbolTable, symbol: AstSymbol): AstSymbol {
  const name = symbolName(symbol);
  const existing = globals.get(name);
  if (existing === undefined) {
    globals.set(name, symbol);
    return symbol;
  }
  existing.flags = ((existing.flags ?? 0) | (symbol.flags ?? 0)) as SymbolFlags;
  existing.declarations = [...(existing.declarations ?? []), ...(symbol.declarations ?? [])];
  if (symbol.exports !== undefined) existing.exports = mergeSymbolTables(existing.exports, symbol.exports);
  if (symbol.members !== undefined) existing.members = mergeSymbolTables(existing.members, symbol.members);
  return existing;
}

export function mergeModuleAugmentation(globals: SymbolTable, moduleName: string, augmentation: SymbolTable): AstSymbol {
  let moduleSymbol = globals.get(moduleName);
  if (moduleSymbol === undefined) {
    moduleSymbol = { name: moduleName, escapedName: moduleName, flags: SymbolFlags.Module, declarations: [], exports: new Map<string, AstSymbol>() };
    globals.set(moduleName, moduleSymbol);
  }
  moduleSymbol.exports = mergeSymbolTables(moduleSymbol.exports, augmentation);
  return moduleSymbol;
}

export function addUndefinedToGlobalsOrErrorOnRedeclaration(host: GlobalResolutionHost): void {
  const existing = host.globals.get("undefined");
  if (existing !== undefined && ((existing.flags ?? 0) & SymbolFlags.Value) !== 0) {
    host.diagnostics.push({ message: "Cannot redeclare global value 'undefined'." });
    return;
  }
  host.globals.set("undefined", {
    name: "undefined",
    escapedName: "undefined",
    flags: SymbolFlags.Value,
    declarations: [],
  });
}

export function checkAndReportErrorForMissingPrefix(
  host: GlobalResolutionHost,
  _errorLocation: AstNode | undefined,
  name: string,
): boolean {
  if (name.startsWith("globalThis.")) return false;
  if (host.globals.has(`globalThis.${name}`)) {
    host.diagnostics.push({ message: `'${name}' must be accessed through 'globalThis.${name}'.` });
    return true;
  }
  return false;
}

export function checkAndReportErrorForUsingTypeAsNamespace(
  host: GlobalResolutionHost,
  _errorLocation: AstNode | undefined,
  name: string,
  meaning: SymbolFlags,
): boolean {
  if ((meaning & SymbolFlags.Namespace) === 0) return false;
  const symbol = host.globals.get(name);
  if (symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Type) !== 0 && ((symbol.flags ?? 0) & SymbolFlags.Namespace) === 0) {
    host.diagnostics.push({ message: `'${name}' only refers to a type, but is being used as a namespace here.` });
    return true;
  }
  return false;
}

export function checkAndReportErrorForUsingTypeAsValue(
  host: GlobalResolutionHost,
  _errorLocation: AstNode | undefined,
  name: string,
  meaning: SymbolFlags,
): boolean {
  if ((meaning & SymbolFlags.Value) === 0) return false;
  const symbol = host.globals.get(name);
  if (symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Type) !== 0 && ((symbol.flags ?? 0) & SymbolFlags.Value) === 0) {
    host.diagnostics.push({ message: `'${name}' only refers to a type, but is being used as a value here.` });
    return true;
  }
  return false;
}

export function checkAndReportErrorForUsingValueAsType(
  host: GlobalResolutionHost,
  _errorLocation: AstNode | undefined,
  name: string,
  meaning: SymbolFlags,
): boolean {
  if ((meaning & SymbolFlags.Type) === 0) return false;
  const symbol = host.globals.get(name);
  if (symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Value) !== 0 && ((symbol.flags ?? 0) & SymbolFlags.Type) === 0) {
    host.diagnostics.push({ message: `'${name}' refers to a value, but is being used as a type here.` });
    return true;
  }
  return false;
}

export function isPrimitiveTypeName(name: string): boolean {
  return name === "any"
    || name === "bigint"
    || name === "boolean"
    || name === "never"
    || name === "number"
    || name === "object"
    || name === "string"
    || name === "symbol"
    || name === "undefined"
    || name === "unknown"
    || name === "void";
}

export function isES2015OrLaterConstructorName(name: string): boolean {
  return name === "ArrayBuffer"
    || name === "DataView"
    || name === "Map"
    || name === "Promise"
    || name === "Proxy"
    || name === "Reflect"
    || name === "Set"
    || name === "Symbol"
    || name === "WeakMap"
    || name === "WeakSet";
}

export function getSuggestedLibForNonExistentName(name: string): string {
  if (isES2015OrLaterConstructorName(name)) return "es2015";
  if (name === "AsyncIterable" || name === "AsyncIterator") return "es2018";
  if (name === "BigInt" || name === "BigInt64Array" || name === "BigUint64Array") return "es2020";
  return "";
}

export function primitiveTypeAliasSuggestions(symbols: ReadonlyMap<string, AstSymbol>): readonly AstSymbol[] {
  const suggestions: AstSymbol[] = [];
  for (const [objectName, primitiveName] of [
    ["String", "string"],
    ["Number", "number"],
    ["Boolean", "boolean"],
    ["BigInt", "bigint"],
    ["Symbol", "symbol"],
    ["Object", "object"],
  ] as const) {
    if (symbols.has(objectName)) {
      suggestions.push({ name: primitiveName, escapedName: primitiveName, flags: SymbolFlags.TypeAlias | SymbolFlags.Transient, declarations: [] });
    }
  }
  return suggestions;
}

export function getSuggestedSymbolForNonexistentSymbol(
  name: string,
  symbols: Iterable<AstSymbol>,
  meaning: SymbolFlags,
): AstSymbol | undefined {
  return getSpellingSuggestion(name, symbols, symbol => candidateNameForMeaning(symbol, meaning), compareSymbols);
}

function candidateNameForMeaning(symbol: AstSymbol, meaning: SymbolFlags): string {
  const name = symbolName(symbol);
  if (name.length === 0 || name.startsWith("\"") || name.charCodeAt(0) === 0xfe) return "";
  if (symbolMatchesMeaning(symbol, meaning)) return name;
  const exportSymbol = symbol.exportSymbol;
  if (exportSymbol !== undefined && symbolMatchesMeaning(exportSymbol, meaning)) return name;
  return "";
}

function symbolMatchesMeaning(symbol: AstSymbol, meaning: SymbolFlags): boolean {
  return (((symbol.flags ?? 0) & meaning) !== 0)
    || (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0 && symbol.exportSymbol !== undefined && ((symbol.exportSymbol.flags ?? 0) & meaning) !== 0);
}

function compareSymbols(left: AstSymbol, right: AstSymbol): number {
  return symbolName(left).localeCompare(symbolName(right));
}

function symbolName(symbol: AstSymbol): string {
  return symbol.escapedName ?? symbol.name ?? "";
}

function getTypeAliasTypeParameterCount(symbol: AstSymbol): number {
  const declarations = symbol.declarations ?? [];
  for (const declaration of declarations) {
    const typeParameters = (declaration as { readonly typeParameters?: readonly AstNode[] }).typeParameters;
    if (typeParameters !== undefined) return typeParameters.length;
  }
  return 0;
}

function mergeSymbolTables(left: SymbolTable | undefined, right: SymbolTable): SymbolTable {
  const result = left ?? new Map<string, AstSymbol>();
  for (const symbol of right.values()) mergeGlobalSymbol(result, symbol);
  return result;
}
