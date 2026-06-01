import {
  Kind,
  SymbolFlags,
  getNodeLocalSymbol,
  nodeParent,
  nodeSymbol,
  setNodeSymbol,
  type Node as AstNode,
  type Symbol as AstSymbol,
  type SymbolTable,
} from "../ast/index.js";

export interface CheckerDiagnosticSink {
  readonly diagnostics: { message: string; node?: AstNode; args?: readonly unknown[] }[];
}

export interface SymbolMergeResult {
  readonly symbol: AstSymbol;
  readonly addedDeclarations: readonly AstNode[];
  readonly duplicateDeclarations: readonly AstNode[];
}

export interface SymbolResolutionHost extends CheckerDiagnosticSink {
  readonly globals: SymbolTable;
  readonly symbolLinks?: WeakMap<AstSymbol, SymbolLinks>;
  readonly mergedSymbols?: WeakMap<AstSymbol, AstSymbol>;
}

export interface SymbolLinks {
  target?: AstSymbol;
  immediateTarget?: AstSymbol;
  typeOnlyDeclaration?: AstNode;
  deprecated?: boolean;
  referencedKinds?: number;
}

let nextSyntheticSymbolId = 1;

export function newSymbol(flags: number, name: string): AstSymbol {
  return newSymbolEx(flags, name, undefined);
}

export function newSymbolEx(flags: number, name: string, declaration: AstNode | undefined): AstSymbol {
  const symbol: AstSymbol = {
    name,
    escapedName: name,
    flags,
    declarations: [],
  };
  setSyntheticSymbolId(symbol);
  if (declaration !== undefined) addDeclarationToSymbol(symbol, declaration, flags);
  return symbol;
}

export function newParameter(name: string, declaration: AstNode | undefined): AstSymbol {
  return newSymbolEx(SymbolFlags.FunctionScopedVariable, name, declaration);
}

export function newProperty(name: string, declaration: AstNode | undefined): AstSymbol {
  return newSymbolEx(SymbolFlags.Property, name, declaration);
}

export function setSyntheticSymbolId(symbol: AstSymbol): void {
  const carrier = symbol as AstSymbol & { id?: number };
  if (carrier.id === undefined) {
    carrier.id = nextSyntheticSymbolId;
    nextSyntheticSymbolId += 1;
  }
}

export function addDeclarationToSymbol(symbol: AstSymbol, declaration: AstNode, symbolFlags: number): void {
  symbol.flags = (symbol.flags ?? 0) | symbolFlags;
  if (!symbol.declarations.includes(declaration)) symbol.declarations.push(declaration);
  if (symbol.valueDeclaration === undefined && isValueDeclarationKind(declaration.kind)) {
    symbol.valueDeclaration = declaration;
  }
  if (nodeSymbol(declaration) === undefined) {
    setNodeSymbol(declaration, symbol);
  }
}

export function combineSymbolTables(left: SymbolTable | undefined, right: SymbolTable | undefined): SymbolTable | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  const result: SymbolTable = new Map(left);
  mergeSymbolTable(result, right, undefined);
  return result;
}

export function mergeSymbolTable(target: SymbolTable, source: SymbolTable, host: CheckerDiagnosticSink | undefined): SymbolTable {
  for (const [name, sourceSymbol] of source) {
    const targetSymbol = target.get(name);
    if (targetSymbol === undefined) {
      target.set(name, sourceSymbol);
      continue;
    }
    target.set(name, mergeSymbol(targetSymbol, sourceSymbol, host).symbol);
  }
  return target;
}

export function mergeSymbol(target: AstSymbol, source: AstSymbol, host: CheckerDiagnosticSink | undefined): SymbolMergeResult {
  const duplicateDeclarations: AstNode[] = [];
  const addedDeclarations: AstNode[] = [];
  const excluded = getExcludedSymbolFlags(target.flags ?? 0);
  if (((source.flags ?? 0) & excluded) !== 0) {
    duplicateDeclarations.push(...source.declarations);
    if (host !== undefined) reportMergeSymbolError(host, target, source);
    return { symbol: target, addedDeclarations, duplicateDeclarations };
  }
  target.flags = (target.flags ?? 0) | (source.flags ?? 0);
  for (const declaration of source.declarations) {
    if (!target.declarations.includes(declaration)) {
      target.declarations.push(declaration);
      addedDeclarations.push(declaration);
    }
  }
  if (target.valueDeclaration === undefined && source.valueDeclaration !== undefined) {
    target.valueDeclaration = source.valueDeclaration;
  }
  const mergedMembers = combineSymbolTables(target.members, source.members);
  if (mergedMembers !== undefined) target.members = mergedMembers;
  const mergedExports = combineSymbolTables(target.exports, source.exports);
  if (mergedExports !== undefined) target.exports = mergedExports;
  if (source.exportSymbol !== undefined && target.exportSymbol === undefined) {
    target.exportSymbol = source.exportSymbol;
  }
  return { symbol: target, addedDeclarations, duplicateDeclarations };
}

export function reportMergeSymbolError(host: CheckerDiagnosticSink, target: AstSymbol, source: AstSymbol): void {
  addDuplicateDeclarationErrorsForSymbols(host, target, source);
}

export function addDuplicateDeclarationErrorsForSymbols(host: CheckerDiagnosticSink, target: AstSymbol, source: AstSymbol): void {
  for (const declaration of source.declarations) {
    addDuplicateDeclarationError(host, declaration, target);
  }
}

export function addDuplicateDeclarationError(host: CheckerDiagnosticSink, declaration: AstNode, symbol: AstSymbol): void {
  host.diagnostics.push({
    message: "Duplicate_identifier_0",
    node: declaration,
    args: [symbolDisplayName(symbol)],
  });
}

export function createDiagnosticForNode(node: AstNode, message: string, ...args: readonly unknown[]): { message: string; node: AstNode; args: readonly unknown[] } {
  return { message, node, args };
}

export function getAdjustedNodeForError(node: AstNode): AstNode {
  if (node.kind === Kind.ExportAssignment) {
    return nodeField(node, "expression") ?? node;
  }
  if (node.kind === Kind.VariableStatement) {
    return nodeField(node, "declarationList") ?? node;
  }
  return nodeField(node, "name") ?? node;
}

export function lookupOrIssueError(
  host: CheckerDiagnosticSink,
  symbols: SymbolTable | undefined,
  name: string,
  location: AstNode,
  message: string,
): AstSymbol | undefined {
  const symbol = symbols?.get(name);
  if (symbol !== undefined) return symbol;
  host.diagnostics.push({ message, node: location, args: [name] });
  return undefined;
}

export function getFirstDeclaration(symbol: AstSymbol | undefined): AstNode | undefined {
  return symbol?.declarations[0];
}

export function getExcludedSymbolFlags(flags: number): number {
  let result = 0;
  if ((flags & SymbolFlags.BlockScopedVariable) !== 0) result |= SymbolFlags.BlockScopedVariable | SymbolFlags.FunctionScopedVariable | SymbolFlags.Class | SymbolFlags.Enum;
  if ((flags & SymbolFlags.FunctionScopedVariable) !== 0) result |= SymbolFlags.BlockScopedVariable | SymbolFlags.Class | SymbolFlags.Enum;
  if ((flags & SymbolFlags.Property) !== 0) result |= SymbolFlags.Property | SymbolFlags.Accessor;
  if ((flags & SymbolFlags.Accessor) !== 0) result |= SymbolFlags.Property | SymbolFlags.Accessor;
  if ((flags & SymbolFlags.Class) !== 0) result |= SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.Enum;
  if ((flags & SymbolFlags.Interface) !== 0) result |= SymbolFlags.Class | SymbolFlags.TypeAlias;
  if ((flags & SymbolFlags.TypeAlias) !== 0) result |= SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.TypeAlias | SymbolFlags.Enum;
  if ((flags & SymbolFlags.Enum) !== 0) result |= SymbolFlags.Class | SymbolFlags.TypeAlias | SymbolFlags.Enum;
  if ((flags & SymbolFlags.Alias) !== 0) result |= SymbolFlags.Alias;
  return result & ~flags;
}

export function cloneSymbol(symbol: AstSymbol): AstSymbol {
  const cloneData: {
    name?: string;
    escapedName?: string;
    flags?: number;
    declarations: AstNode[];
  } = {
    declarations: [...symbol.declarations],
  };
  if (symbol.name !== undefined) cloneData.name = symbol.name;
  if (symbol.escapedName !== undefined) cloneData.escapedName = symbol.escapedName;
  if (symbol.flags !== undefined) cloneData.flags = symbol.flags;
  const clone = cloneData as AstSymbol;
  if (symbol.valueDeclaration !== undefined) clone.valueDeclaration = symbol.valueDeclaration;
  if (symbol.members !== undefined) clone.members = new Map(symbol.members);
  if (symbol.exports !== undefined) clone.exports = new Map(symbol.exports);
  if (symbol.parent !== undefined) clone.parent = symbol.parent;
  if (symbol.exportSymbol !== undefined) clone.exportSymbol = symbol.exportSymbol;
  setSyntheticSymbolId(clone);
  return clone;
}

export function getMergedSymbol(host: Pick<SymbolResolutionHost, "mergedSymbols"> | undefined, symbol: AstSymbol | undefined): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  return host?.mergedSymbols?.get(symbol) ?? symbol;
}

export function getParentOfSymbol(symbol: AstSymbol | undefined): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  if (symbol.parent !== undefined) return symbol.parent;
  const declaration = getFirstDeclaration(symbol);
  const parent = declaration === undefined ? undefined : nodeParent(declaration);
  return parent === undefined ? undefined : nodeSymbol(parent);
}

export function recordMergedSymbol(host: SymbolResolutionHost, source: AstSymbol, target: AstSymbol): void {
  host.mergedSymbols?.set(source, target);
}

export function getSymbolIfSameReference(left: AstSymbol | undefined, right: AstSymbol | undefined): AstSymbol | undefined {
  if (left === undefined || right === undefined) return undefined;
  return getSymbolIdentity(left) === getSymbolIdentity(right) ? left : undefined;
}

export function getExportSymbolOfValueSymbolIfExported(symbol: AstSymbol): AstSymbol {
  return symbol.exportSymbol ?? symbol;
}

export function getSymbolOfDeclaration(node: AstNode): AstSymbol | undefined {
  return getNodeLocalSymbol(node) ?? nodeSymbol(node);
}

export function getSymbolOfNode(node: AstNode | undefined): AstSymbol | undefined {
  if (node === undefined) return undefined;
  return getSymbolOfDeclaration(node);
}

export function getLateBoundSymbol(node: AstNode | undefined): AstSymbol | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as { lateSymbol?: AstSymbol; symbol?: AstSymbol }).lateSymbol
    ?? nodeSymbol(node);
}

export function resolveSymbolEx(host: SymbolResolutionHost | undefined, symbol: AstSymbol | undefined, meaning: number): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  if (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) {
    const resolved = resolveAlias(host, symbol);
    if (resolved !== undefined && ((resolved.flags ?? 0) & meaning) !== 0) return resolved;
  }
  return ((symbol.flags ?? 0) & meaning) !== 0 || meaning === SymbolFlags.All ? symbol : undefined;
}

export function ResolveAlias(host: SymbolResolutionHost | undefined, symbol: AstSymbol): AstSymbol | undefined {
  return resolveAlias(host, symbol);
}

export function resolveAlias(host: SymbolResolutionHost | undefined, symbol: AstSymbol): AstSymbol | undefined {
  const links = getSymbolLinks(host, symbol);
  if (links.target !== undefined) return links.target;
  const immediate = resolveIndirectionAlias(host, symbol);
  if (immediate !== undefined) links.immediateTarget = immediate;
  const target = immediate === undefined || immediate === symbol ? symbol : resolveAlias(host, immediate);
  links.target = target ?? symbol;
  return links.target;
}

export function resolveIndirectionAlias(host: SymbolResolutionHost | undefined, symbol: AstSymbol): AstSymbol | undefined {
  const declaration = getFirstDeclaration(symbol);
  if (declaration === undefined) return symbol;
  if (declaration.kind === Kind.ImportSpecifier || declaration.kind === Kind.ExportSpecifier) {
    const propertyName = nodeField<AstNode>(declaration, "propertyName");
    const name = propertyName ?? nodeField<AstNode>(declaration, "name");
    const parent = nodeParent(nodeParent(declaration));
    const table = parent === undefined ? undefined : nodeSymbol(parent)?.exports;
    return name === undefined ? symbol : table?.get(nodeText(name)) ?? symbol;
  }
  if (declaration.kind === Kind.ImportClause || declaration.kind === Kind.NamespaceImport) {
    return getSymbolOfNode(nodeParent(declaration)) ?? symbol;
  }
  return symbol;
}

export function resolveAliasWithDeprecationCheck(host: SymbolResolutionHost | undefined, symbol: AstSymbol, location: AstNode | undefined): AstSymbol | undefined {
  const resolved = resolveAlias(host, symbol);
  if (location !== undefined && resolved !== undefined && isDeprecatedSymbol(host, resolved)) {
    host?.diagnostics.push({ message: "Deprecated_symbol_0", node: location, args: [symbolDisplayName(resolved)] });
  }
  return resolved;
}

export function getSymbolFlags(host: SymbolResolutionHost | undefined, symbol: AstSymbol | undefined): number {
  if (symbol === undefined) return 0;
  if (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) {
    const target = resolveAlias(host, symbol);
    return target?.flags ?? symbol.flags ?? 0;
  }
  return symbol.flags ?? 0;
}

export function getSymbolFlagsEx(host: SymbolResolutionHost | undefined, symbol: AstSymbol | undefined, meaning: number): number {
  const flags = getSymbolFlags(host, symbol);
  return flags & meaning;
}

export function getDeclarationOfAliasSymbol(symbol: AstSymbol): AstNode | undefined {
  return symbol.declarations.find(isAliasDeclarationKind);
}

export function getTypeOnlyAliasDeclarationEx(host: SymbolResolutionHost | undefined, symbol: AstSymbol, meaning: number): AstNode | undefined {
  const links = getSymbolLinks(host, symbol);
  if (links.typeOnlyDeclaration !== undefined) return links.typeOnlyDeclaration;
  const declaration = getDeclarationOfAliasSymbol(symbol);
  if (declaration !== undefined && isTypeOnlyDeclaration(declaration, meaning)) {
    links.typeOnlyDeclaration = declaration;
    return declaration;
  }
  return undefined;
}

export function getTypeOnlyAliasDeclaration(host: SymbolResolutionHost | undefined, symbol: AstSymbol): AstNode | undefined {
  return getTypeOnlyAliasDeclarationEx(host, symbol, SymbolFlags.Value);
}

export function getImmediateAliasedSymbol(host: SymbolResolutionHost | undefined, symbol: AstSymbol): AstSymbol | undefined {
  const links = getSymbolLinks(host, symbol);
  if (links.immediateTarget !== undefined) return links.immediateTarget;
  const target = resolveIndirectionAlias(host, symbol);
  if (target !== undefined) links.immediateTarget = target;
  return links.immediateTarget;
}

export function addTypeOnlyDeclarationRelatedInfo(host: CheckerDiagnosticSink, symbol: AstSymbol, diagnosticNode: AstNode): void {
  const declaration = getDeclarationOfAliasSymbol(symbol);
  if (declaration !== undefined) {
    host.diagnostics.push({
      message: "This_import_is_never_used_as_a_value_and_must_use_import_type",
      node: diagnosticNode,
      args: [symbolDisplayName(symbol)],
    });
  }
}

export function getSymbol(
  host: SymbolResolutionHost | undefined,
  symbols: SymbolTable | undefined,
  name: string,
  meaning: number,
): AstSymbol | undefined {
  const symbol = symbols?.get(name);
  if (symbol === undefined) return undefined;
  const merged = getMergedSymbol(host, symbol);
  return resolveSymbolEx(host, merged, meaning);
}

export function getResolvedSymbolOrNil(host: SymbolResolutionHost | undefined, symbol: AstSymbol | undefined): AstSymbol | undefined {
  return resolveSymbolEx(host, symbol, SymbolFlags.All);
}

export function getReferencedValueOrAliasSymbol(host: SymbolResolutionHost | undefined, symbol: AstSymbol | undefined): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  if (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) return symbol;
  return resolveSymbolEx(host, symbol, SymbolFlags.Value);
}

export function isDeprecatedSymbol(host: SymbolResolutionHost | undefined, symbol: AstSymbol): boolean {
  const links = getSymbolLinks(host, symbol);
  if (links.deprecated !== undefined) return links.deprecated;
  links.deprecated = symbol.declarations.some(hasDeprecatedJSDoc);
  return links.deprecated;
}

export function symbolReferenced(host: SymbolResolutionHost | undefined, symbol: AstSymbol, meaning: number): void {
  const links = getSymbolLinks(host, symbol);
  links.referencedKinds = (links.referencedKinds ?? 0) | meaning;
}

function getSymbolLinks(host: SymbolResolutionHost | undefined, symbol: AstSymbol): SymbolLinks {
  let links = host?.symbolLinks?.get(symbol);
  if (links !== undefined) return links;
  const carrier = symbol as AstSymbol & { checkerLinks?: SymbolLinks };
  if (carrier.checkerLinks === undefined) carrier.checkerLinks = {};
  links = carrier.checkerLinks;
  host?.symbolLinks?.set(symbol, links);
  return links;
}

function isValueDeclarationKind(kind: number): boolean {
  switch (kind) {
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.BindingElement:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.ImportEqualsDeclaration:
      return true;
    default:
      return false;
  }
}

function isAliasDeclarationKind(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportClause:
    case Kind.NamespaceImport:
    case Kind.ImportSpecifier:
    case Kind.ExportSpecifier:
    case Kind.ExportAssignment:
      return true;
    default:
      return false;
  }
}

function isTypeOnlyDeclaration(node: AstNode, meaning: number): boolean {
  if ((meaning & SymbolFlags.Value) === 0) return false;
  return (node as unknown as { isTypeOnly?: boolean }).isTypeOnly === true;
}

function hasDeprecatedJSDoc(node: AstNode): boolean {
  const jsDoc = (node as unknown as { jsDoc?: readonly AstNode[] }).jsDoc;
  if (jsDoc === undefined) return false;
  return jsDoc.some((doc) => {
    const tags = (doc as unknown as { tags?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).tags;
    const list = tags === undefined ? [] : ((tags as { nodes?: readonly AstNode[] }).nodes ?? tags as readonly AstNode[]);
    return list.some((tag) => nodeText(nodeField(tag, "tagName")) === "deprecated");
  });
}

function getSymbolIdentity(symbol: AstSymbol): AstSymbol {
  return symbol.exportSymbol ?? symbol;
}

function symbolDisplayName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as unknown as { text?: string; escapedText?: string }).text
    ?? (node as unknown as { escapedText?: string }).escapedText
    ?? "";
}

function nodeField<T = AstNode>(node: unknown, field: string): T | undefined {
  return (node as Record<string, T | undefined> | undefined)?.[field];
}
