import {
  Kind,
  SymbolFlags,
  nodeSymbol,
  type Node as AstNode,
  type SourceFile,
  type Symbol as AstSymbol,
  type SymbolTable,
} from "../ast/index.js";
import { getDirectoryPath, normalizeSlashes } from "../tspath/index.js";
import {
  getMergedSymbol,
  getSymbol,
  resolveAlias,
  type SymbolResolutionHost,
} from "./symbolResolution.js";

export interface ModuleResolutionHost extends SymbolResolutionHost {
  readonly files?: readonly SourceFile[];
  readonly currentDirectory?: string;
  readonly moduleResolutionCache?: Map<string, AstSymbol | undefined>;
  readonly ambientModules?: readonly AstSymbol[];
}

export interface ModuleSpecifierInfo {
  readonly text: string;
  readonly isStringLiteral: boolean;
  readonly resolutionMode: "import" | "require" | "none";
}

export interface ExternalModuleResolution {
  readonly moduleSpecifier: ModuleSpecifierInfo;
  readonly moduleSymbol: AstSymbol | undefined;
  readonly resolvedFile: SourceFile | undefined;
}

export function getTargetOfImportEqualsDeclaration(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const moduleReference = nodeField<AstNode>(node, "moduleReference");
  if (moduleReference === undefined) return undefined;
  if (moduleReference.kind === Kind.ExternalModuleReference) {
    const expression = nodeField<AstNode>(moduleReference, "expression");
    return resolveExternalModuleTypeByLiteral(host, expression);
  }
  return getSymbolOfPartOfRightHandSideOfImportEquals(host, moduleReference);
}

export function resolveExternalModuleTypeByLiteral(host: ModuleResolutionHost, literal: AstNode | undefined): AstSymbol | undefined {
  const specifier = getModuleSpecifierInfo(literal);
  if (specifier.text.length === 0) return undefined;
  const resolution = resolveExternalModuleName(host, literal, specifier.text);
  return resolution.moduleSymbol;
}

export function getSymbolOfPartOfRightHandSideOfImportEquals(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  if (node.kind === Kind.Identifier) return getSymbol(host, lookupLocalsFromAncestors(node), nodeText(node), SymbolFlags.Value | SymbolFlags.Namespace);
  if (node.kind === Kind.QualifiedName || node.kind === Kind.PropertyAccessExpression) {
    const left = nodeField<AstNode>(node, "left") ?? nodeField<AstNode>(node, "expression");
    const right = nodeField<AstNode>(node, "right") ?? nodeField<AstNode>(node, "name");
    const container = getSymbolOfPartOfRightHandSideOfImportEquals(host, left ?? node);
    return getExternalModuleMember(host, container, nodeText(right), SymbolFlags.Value | SymbolFlags.Namespace);
  }
  return nodeSymbol(node);
}

export function checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(
  host: ModuleResolutionHost,
  node: AstNode,
  symbol: AstSymbol | undefined,
): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  const target = resolveAlias(host, symbol) ?? symbol;
  if (((target.flags ?? 0) & SymbolFlags.Value) === 0 && isValueImportUse(node)) {
    host.diagnostics.push({ message: "Import_alias_0_resolves_to_a_type_only_symbol", node, args: [symbolName(symbol)] });
  }
  return target;
}

export function getTypeOnlyDeclarationOfEntityName(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if ((current as unknown as { isTypeOnly?: boolean }).isTypeOnly === true) return current;
    current = nodeParent(current);
  }
  return undefined;
}

export function getTargetOfImportClause(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const parent = nodeParent(node);
  const moduleSpecifier = nodeField<AstNode>(parent, "moduleSpecifier");
  const moduleSymbol = resolveExternalModuleTypeByLiteral(host, moduleSpecifier);
  const name = nodeField<AstNode>(node, "name");
  if (name === undefined) return moduleSymbol;
  return getTargetOfModuleDefault(host, moduleSymbol, name);
}

export function getTargetOfModuleDefault(host: ModuleResolutionHost, moduleSymbol: AstSymbol | undefined, errorNode: AstNode | undefined): AstSymbol | undefined {
  const exported = getExternalModuleMember(host, moduleSymbol, "default", SymbolFlags.All);
  if (exported !== undefined) return exported;
  if (moduleSymbol !== undefined && canHaveSyntheticDefault(moduleSymbol)) {
    return createDefaultPropertyWrapperForModule(moduleSymbol);
  }
  reportNonDefaultExport(host, moduleSymbol, errorNode);
  return undefined;
}

export function reportNonDefaultExport(host: ModuleResolutionHost, moduleSymbol: AstSymbol | undefined, errorNode: AstNode | undefined): void {
  pushCheckerDiagnostic(host, "Module_0_has_no_default_export", errorNode, [symbolName(moduleSymbol)]);
}

export function getTargetOfNamespaceImport(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const importDeclaration = nodeParent(nodeParent(node));
  const moduleSpecifier = nodeField<AstNode>(importDeclaration, "moduleSpecifier");
  return resolveExternalModuleTypeByLiteral(host, moduleSpecifier);
}

export function getTargetOfNamespaceExport(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const exportDeclaration = nodeParent(node);
  const moduleSpecifier = nodeField<AstNode>(exportDeclaration, "moduleSpecifier");
  return resolveExternalModuleTypeByLiteral(host, moduleSpecifier);
}

export function getTargetOfImportSpecifier(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const importDeclaration = enclosingImportOrExportDeclaration(node);
  const moduleSpecifier = nodeField<AstNode>(importDeclaration, "moduleSpecifier");
  const moduleSymbol = resolveExternalModuleTypeByLiteral(host, moduleSpecifier);
  const propertyName = nodeField<AstNode>(node, "propertyName") ?? nodeField<AstNode>(node, "name");
  return getExternalModuleMember(host, moduleSymbol, nodeText(propertyName), SymbolFlags.All);
}

export function getExternalModuleMember(
  host: ModuleResolutionHost | undefined,
  moduleSymbol: AstSymbol | undefined,
  name: string,
  meaning: number,
): AstSymbol | undefined {
  if (moduleSymbol === undefined || name.length === 0) return undefined;
  const exports = moduleSymbol.exports ?? moduleSymbol.globalExports;
  const symbol = getSymbol(host, exports, name, meaning);
  if (symbol !== undefined) return symbol;
  if (name === "default" && canHaveSyntheticDefault(moduleSymbol)) {
    return createDefaultPropertyWrapperForModule(moduleSymbol);
  }
  return undefined;
}

export function getPropertyOfVariable(symbol: AstSymbol | undefined, name: string): AstSymbol | undefined {
  return symbol?.members?.get(name) ?? symbol?.exports?.get(name);
}

export function combineValueAndTypeSymbols(valueSymbol: AstSymbol | undefined, typeSymbol: AstSymbol | undefined): AstSymbol | undefined {
  if (valueSymbol === undefined) return typeSymbol;
  if (typeSymbol === undefined || valueSymbol === typeSymbol) return valueSymbol;
  valueSymbol.flags = (valueSymbol.flags ?? 0) | (typeSymbol.flags ?? 0);
  for (const declaration of typeSymbol.declarations) {
    if (!valueSymbol.declarations.includes(declaration)) valueSymbol.declarations.push(declaration);
  }
  if (valueSymbol.members === undefined && typeSymbol.members !== undefined) valueSymbol.members = new Map(typeSymbol.members);
  if (valueSymbol.exports === undefined && typeSymbol.exports !== undefined) valueSymbol.exports = new Map(typeSymbol.exports);
  return valueSymbol;
}

export function getExportOfModule(host: ModuleResolutionHost | undefined, moduleSymbol: AstSymbol | undefined, name: string, meaning: number): AstSymbol | undefined {
  return getExternalModuleMember(host, moduleSymbol, name, meaning);
}

export function isOnlyImportableAsDefault(symbol: AstSymbol | undefined): boolean {
  if (symbol === undefined) return false;
  if (symbol.exports?.has("default") === true) return true;
  return ((symbol.flags ?? 0) & SymbolFlags.ValueModule) !== 0 && symbol.exports?.size === 0;
}

export function canHaveSyntheticDefault(symbol: AstSymbol | undefined): boolean {
  if (symbol === undefined) return false;
  if (symbol.exports?.has("default") === true) return false;
  return ((symbol.flags ?? 0) & (SymbolFlags.ValueModule | SymbolFlags.Alias)) !== 0;
}

export function getEmitSyntaxForModuleSpecifierExpression(node: AstNode | undefined): "import" | "require" | "unknown" {
  const info = getModuleSpecifierInfo(node);
  if (info.resolutionMode !== "none") return info.resolutionMode;
  const parent = nodeParent(node);
  if (parent?.kind === Kind.ImportEqualsDeclaration || parent?.kind === Kind.ExternalModuleReference) return "require";
  if (parent?.kind === Kind.ImportDeclaration || parent?.kind === Kind.ExportDeclaration || parent?.kind === Kind.ImportType) return "import";
  return "unknown";
}

export function errorNoModuleMemberSymbol(host: ModuleResolutionHost, moduleSymbol: AstSymbol | undefined, name: string, node: AstNode | undefined): void {
  pushCheckerDiagnostic(host, "Module_0_has_no_exported_member_1", node, [symbolName(moduleSymbol), name]);
}

export function reportNonExportedMember(host: ModuleResolutionHost, moduleSymbol: AstSymbol | undefined, name: string, node: AstNode | undefined): void {
  errorNoModuleMemberSymbol(host, moduleSymbol, name, node);
}

export function reportInvalidImportEqualsExportMember(host: ModuleResolutionHost, node: AstNode): void {
  host.diagnostics.push({ message: "Export_assignment_cannot_be_used_when_targeting_ECMAScript_modules", node });
}

export function getTargetOfExportSpecifier(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const exportDeclaration = enclosingImportOrExportDeclaration(node);
  const propertyName = nodeField<AstNode>(node, "propertyName") ?? nodeField<AstNode>(node, "name");
  const moduleSpecifier = nodeField<AstNode>(exportDeclaration, "moduleSpecifier");
  if (moduleSpecifier !== undefined) {
    const moduleSymbol = resolveExternalModuleTypeByLiteral(host, moduleSpecifier);
    return getExternalModuleMember(host, moduleSymbol, nodeText(propertyName), SymbolFlags.All);
  }
  return getSymbol(host, lookupLocalsFromAncestors(node), nodeText(propertyName), SymbolFlags.All);
}

export function getTargetOfExportAssignment(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const expression = nodeField<AstNode>(node, "expression");
  if (expression === undefined) return undefined;
  return getTargetOfAliasLikeExpression(host, expression);
}

export function getTargetOfBinaryExpression(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const right = nodeField<AstNode>(node, "right");
  return getTargetOfAliasLikeExpression(host, right);
}

export function getTargetOfAliasLikeExpression(host: ModuleResolutionHost, node: AstNode | undefined): AstSymbol | undefined {
  if (node === undefined) return undefined;
  if (node.kind === Kind.Identifier) return getSymbol(host, lookupLocalsFromAncestors(node), nodeText(node), SymbolFlags.All);
  if (node.kind === Kind.PropertyAccessExpression || node.kind === Kind.ElementAccessExpression) return getTargetOfAccessExpression(host, node);
  if (node.kind === Kind.CallExpression) return getTargetOfAliasLikeExpression(host, nodeField(node, "expression"));
  return nodeSymbol(node);
}

export function getTargetOfNamespaceExportDeclaration(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const name = nodeField<AstNode>(node, "name");
  return getSymbol(host, lookupLocalsFromAncestors(node), nodeText(name), SymbolFlags.Namespace);
}

export function getTargetOfAccessExpression(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  const expression = nodeField<AstNode>(node, "expression");
  const name = nodeField<AstNode>(node, "name") ?? nodeField<AstNode>(node, "argumentExpression");
  const container = getTargetOfAliasLikeExpression(host, expression);
  return getExternalModuleMember(host, container, nodeText(name), SymbolFlags.All)
    ?? getPropertyOfVariable(container, nodeText(name));
}

export function getModuleSpecifierForImportOrExport(node: AstNode | undefined): AstNode | undefined {
  if (node === undefined) return undefined;
  if (node.kind === Kind.ImportDeclaration || node.kind === Kind.ExportDeclaration) return nodeField(node, "moduleSpecifier");
  if (node.kind === Kind.ImportEqualsDeclaration) return nodeField(nodeField(node, "moduleReference"), "expression");
  return getModuleSpecifierForImportOrExport(nodeParent(node));
}

export function getModuleSpecifierFromNode(node: AstNode | undefined): string {
  return getModuleSpecifierInfo(getModuleSpecifierForImportOrExport(node)).text;
}

export function resolveExternalModuleName(host: ModuleResolutionHost, location: AstNode | undefined, moduleReference: string): ExternalModuleResolution {
  const cacheKey = `${getContainingFileName(location)}::${moduleReference}`;
  if (host.moduleResolutionCache?.has(cacheKey) === true) {
    return {
      moduleSpecifier: { text: moduleReference, isStringLiteral: true, resolutionMode: "none" },
      moduleSymbol: host.moduleResolutionCache.get(cacheKey),
      resolvedFile: undefined,
    };
  }
  const resolved = resolveExternalModuleNameWorker(host, location, moduleReference);
  host.moduleResolutionCache?.set(cacheKey, resolved.moduleSymbol);
  return resolved;
}

export function resolveExternalModuleNameWorker(host: ModuleResolutionHost, location: AstNode | undefined, moduleReference: string): ExternalModuleResolution {
  const moduleSymbol = resolveExternalModule(host, moduleReference)
    ?? tryFindAmbientModule(host, moduleReference)
    ?? resolveRelativeExternalModule(host, location, moduleReference);
  return {
    moduleSpecifier: { text: moduleReference, isStringLiteral: true, resolutionMode: "none" },
    moduleSymbol,
    resolvedFile: sourceFileOfSymbol(moduleSymbol),
  };
}

export function resolveExternalModule(host: ModuleResolutionHost, moduleReference: string): AstSymbol | undefined {
  return host.globals.get(`"${moduleReference}"`)
    ?? host.globals.get(moduleReference)
    ?? host.ambientModules?.find((symbol) => symbolName(symbol) === moduleReference);
}

export function resolutionExtensionIsTsOrJson(fileName: string): boolean {
  return /\.(ts|tsx|mts|cts|d\.ts|json)$/i.test(fileName);
}

export function getSuggestedImportSource(host: ModuleResolutionHost, name: string): string | undefined {
  for (const symbol of host.globals.values()) {
    if (symbol.exports?.has(name) === true) return stripQuotes(symbolName(symbol));
  }
  return undefined;
}

export function getSuggestedImportExtension(specifier: string, containingFile: string): string {
  if (specifier.startsWith(".") && !/\.[cm]?[jt]sx?$/.test(specifier)) {
    const containingDir = getDirectoryPath(containingFile);
    if (containingDir.length > 0) return normalizeSlashes(`${specifier}.js`);
  }
  return specifier;
}

export function errorOnImplicitAnyModule(host: ModuleResolutionHost, node: AstNode | undefined, moduleReference: string): void {
  pushCheckerDiagnostic(host, "Could_not_find_a_declaration_file_for_module_0", node, [moduleReference]);
}

export function createModuleNotFoundChain(moduleReference: string): readonly string[] {
  return [
    "Cannot_find_module_0_or_its_corresponding_type_declarations",
    moduleReference,
  ];
}

export function createModeMismatchDetails(requested: string, resolved: string): readonly string[] {
  if (requested === resolved) return [];
  return ["The_current_file_is_a_0_module_whose_imports_will_produce_1_calls", requested, resolved];
}

export function tryFindAmbientModule(host: ModuleResolutionHost, moduleReference: string): AstSymbol | undefined {
  return host.ambientModules?.find((symbol) => stripQuotes(symbolName(symbol)) === moduleReference)
    ?? host.globals.get(`"${moduleReference}"`);
}

export function getAmbientModules(host: ModuleResolutionHost): readonly AstSymbol[] {
  const modules: AstSymbol[] = [];
  for (const [name, symbol] of host.globals) {
    if (name.startsWith("\"") && name.endsWith("\"")) modules.push(symbol);
  }
  if (host.ambientModules !== undefined) modules.push(...host.ambientModules);
  return uniqueSymbols(modules);
}

export function resolveExternalModuleSymbol(host: ModuleResolutionHost, symbol: AstSymbol | undefined): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  const resolved = resolveAlias(host, symbol);
  return resolved ?? symbol;
}

export function resolveESModuleSymbol(host: ModuleResolutionHost, symbol: AstSymbol | undefined): AstSymbol | undefined {
  const resolved = resolveExternalModuleSymbol(host, symbol);
  if (resolved?.exports?.has("__esModule") === true) return resolved;
  return resolved;
}

export function hasSignatures(symbol: AstSymbol | undefined): boolean {
  return symbol?.declarations.some((declaration) =>
    declaration.kind === Kind.FunctionDeclaration
    || declaration.kind === Kind.MethodDeclaration
    || declaration.kind === Kind.CallSignature
    || declaration.kind === Kind.ConstructSignature) === true;
}

export function isESMFormatImportImportingCommonjsFormatFile(importNode: AstNode | undefined, resolvedFile: SourceFile | undefined): boolean {
  const syntax = getEmitSyntaxForModuleSpecifierExpression(getModuleSpecifierForImportOrExport(importNode));
  const fileKind = (resolvedFile as unknown as { impliedNodeFormat?: string } | undefined)?.impliedNodeFormat;
  return syntax === "import" && fileKind === "commonjs";
}

export function getTypeWithSyntheticDefaultOnly(symbol: AstSymbol | undefined): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  return createDefaultPropertyWrapperForModule(symbol);
}

export function getTypeWithSyntheticDefaultImportType(symbol: AstSymbol | undefined): AstSymbol | undefined {
  return getTypeWithSyntheticDefaultOnly(symbol);
}

export function isCommonJSRequire(node: AstNode | undefined): boolean {
  if (node?.kind !== Kind.CallExpression) return false;
  const expression = nodeField<AstNode>(node, "expression");
  return expression?.kind === Kind.Identifier && nodeText(expression) === "require";
}

export function createDefaultPropertyWrapperForModule(moduleSymbol: AstSymbol): AstSymbol {
  const existing = moduleSymbol.exports?.get("default");
  if (existing !== undefined) return existing;
  const wrapper: AstSymbol = {
    name: "default",
    escapedName: "default",
    flags: SymbolFlags.Alias | SymbolFlags.Value,
    declarations: [...moduleSymbol.declarations],
  };
  wrapper.parent = moduleSymbol;
  moduleSymbol.exports ??= new Map();
  moduleSymbol.exports.set("default", wrapper);
  return wrapper;
}

export function cloneTypeAsModuleType(symbol: AstSymbol): AstSymbol {
  const clone: AstSymbol = {
    name: symbolName(symbol),
    escapedName: symbol.escapedName ?? symbol.name ?? "",
    flags: (symbol.flags ?? 0) | SymbolFlags.ValueModule,
    declarations: [...symbol.declarations],
  };
  if (symbol.exports !== undefined) clone.exports = new Map(symbol.exports);
  if (symbol.members !== undefined) clone.members = new Map(symbol.members);
  return clone;
}

export function getTargetOfAliasDeclaration(host: ModuleResolutionHost, declaration: AstNode): AstSymbol | undefined {
  switch (declaration.kind) {
    case Kind.ImportEqualsDeclaration:
      return getTargetOfImportEqualsDeclaration(host, declaration);
    case Kind.ImportClause:
      return getTargetOfImportClause(host, declaration);
    case Kind.NamespaceImport:
      return getTargetOfNamespaceImport(host, declaration);
    case Kind.ImportSpecifier:
      return getTargetOfImportSpecifier(host, declaration);
    case Kind.ExportSpecifier:
      return getTargetOfExportSpecifier(host, declaration);
    case Kind.ExportAssignment:
      return getTargetOfExportAssignment(host, declaration);
    case Kind.NamespaceExportDeclaration:
      return getTargetOfNamespaceExportDeclaration(host, declaration);
    default:
      return nodeSymbol(declaration);
  }
}

export function resolveEntityName(host: ModuleResolutionHost, node: AstNode | undefined, meaning: number): AstSymbol | undefined {
  if (node === undefined) return undefined;
  if (node.kind === Kind.Identifier) return getSymbol(host, lookupLocalsFromAncestors(node), nodeText(node), meaning);
  if (node.kind === Kind.QualifiedName || node.kind === Kind.PropertyAccessExpression) {
    const left = nodeField<AstNode>(node, "left") ?? nodeField<AstNode>(node, "expression");
    const right = nodeField<AstNode>(node, "right") ?? nodeField<AstNode>(node, "name");
    const container = resolveEntityName(host, left, SymbolFlags.Namespace | SymbolFlags.Value);
    return getExternalModuleMember(host, container, nodeText(right), meaning);
  }
  return nodeSymbol(node);
}

export function resolveQualifiedName(host: ModuleResolutionHost, node: AstNode, meaning: number): AstSymbol | undefined {
  return resolveEntityName(host, node, meaning);
}

export function tryGetQualifiedNameAsValue(host: ModuleResolutionHost, node: AstNode): AstSymbol | undefined {
  return resolveEntityName(host, node, SymbolFlags.Value);
}

export function getSuggestedSymbolForNonexistentModule(host: ModuleResolutionHost, name: string): AstSymbol | undefined {
  let best: AstSymbol | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const symbol of getAmbientModules(host)) {
    const distance = levenshtein(stripQuotes(symbolName(symbol)), name);
    if (distance < bestDistance) {
      best = symbol;
      bestDistance = distance;
    }
  }
  return bestDistance <= 3 ? best : undefined;
}

export function getFullyQualifiedName(symbol: AstSymbol | undefined): string {
  const parts: string[] = [];
  for (let current = symbol; current !== undefined; current = current.parent) parts.unshift(symbolName(current));
  return parts.filter(Boolean).join(".");
}

export function getResolvedMembersOrExportsOfSymbol(
  host: ModuleResolutionHost | undefined,
  symbol: AstSymbol | undefined,
  kind: "members" | "exports",
): SymbolTable | undefined {
  const resolved = getMergedSymbol(host, symbol);
  return kind === "members" ? resolved?.members : resolved?.exports;
}

function getModuleSpecifierInfo(node: AstNode | undefined): ModuleSpecifierInfo {
  return {
    text: nodeText(node),
    isStringLiteral: node?.kind === Kind.StringLiteral || node?.kind === Kind.NoSubstitutionTemplateLiteral,
    resolutionMode: getResolutionModeFromAttributes(nodeParent(node)),
  };
}

function getResolutionModeFromAttributes(node: AstNode | undefined): "import" | "require" | "none" {
  const attributes = nodeField<AstNode>(node, "attributes");
  for (const element of nodeArray(nodeField(attributes, "elements"))) {
    if (nodeText(nodeField(element, "name")) !== "resolution-mode") continue;
    const value = nodeText(nodeField(element, "value"));
    if (value === "import" || value === "require") return value;
  }
  return "none";
}

function resolveRelativeExternalModule(host: ModuleResolutionHost, location: AstNode | undefined, moduleReference: string): AstSymbol | undefined {
  if (!moduleReference.startsWith(".")) return undefined;
  const containing = getContainingFileName(location);
  const containingDir = getDirectoryPath(containing);
  const normalized = normalizeSlashes(`${containingDir}/${moduleReference}`);
  return host.files?.map(nodeSymbol).find((symbol) => symbolName(symbol).startsWith(normalized));
}

function enclosingImportOrExportDeclaration(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.ImportDeclaration || current.kind === Kind.ExportDeclaration) return current;
    current = nodeParent(current);
  }
  return undefined;
}

function lookupLocalsFromAncestors(node: AstNode): SymbolTable | undefined {
  for (let current: AstNode | undefined = node; current !== undefined; current = nodeParent(current)) {
    const locals = (current as unknown as { locals?: SymbolTable }).locals;
    if (locals !== undefined) return locals;
    const symbol = nodeSymbol(current);
    if (symbol?.exports !== undefined) return symbol.exports;
  }
  return undefined;
}

function sourceFileOfSymbol(symbol: AstSymbol | undefined): SourceFile | undefined {
  return symbol?.declarations.find((declaration) => declaration.kind === Kind.SourceFile) as SourceFile | undefined;
}

function isValueImportUse(node: AstNode): boolean {
  const parent = nodeParent(node);
  return parent?.kind !== Kind.ImportType && parent?.kind !== Kind.TypeReference;
}

function getContainingFileName(node: AstNode | undefined): string {
  for (let current = node; current !== undefined; current = nodeParent(current)) {
    if (current.kind === Kind.SourceFile) {
      return (current as unknown as { fileName?: string }).fileName ?? "";
    }
  }
  return "";
}

function nodeParent(node: AstNode | undefined): AstNode | undefined {
  return (node as unknown as { parent?: AstNode } | undefined)?.parent;
}

function nodeField<T = AstNode>(node: unknown, field: string): T | undefined {
  return (node as Record<string, T | undefined> | undefined)?.[field];
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { nodes?: readonly AstNode[] }).nodes ?? [];
}

function nodeText(node: AstNode | undefined): string {
  return (node as unknown as { text?: string; escapedText?: string } | undefined)?.text
    ?? (node as unknown as { escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function stripQuotes(text: string): string {
  return text.startsWith("\"") && text.endsWith("\"") ? text.slice(1, -1) : text;
}

function uniqueSymbols(symbols: readonly AstSymbol[]): readonly AstSymbol[] {
  return [...new Set(symbols)];
}

function pushCheckerDiagnostic(host: ModuleResolutionHost, message: string, node: AstNode | undefined, args?: readonly unknown[]): void {
  host.diagnostics.push({
    message,
    ...(node === undefined ? {} : { node }),
    ...(args === undefined ? {} : { args }),
  });
}

function levenshtein(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  const current = new Array<number>(right.length + 1);
  for (let i = 0; i < left.length; i++) {
    current[0] = i + 1;
    for (let j = 0; j < right.length; j++) {
      const cost = left[i] === right[j] ? 0 : 1;
      const insertionCost = (current[j] ?? 0) + 1;
      const deletionCost = previous[j + 1]! + 1;
      const substitutionCost = previous[j]! + cost;
      current[j + 1] = Math.min(insertionCost, deletionCost, substitutionCost);
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length] ?? 0;
}
