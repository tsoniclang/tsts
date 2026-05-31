import { Kind, SymbolFlags, nodeSymbol, type Node as AstNode, type Symbol as AstSymbol } from "../ast/index.js";
import { inferExpression } from "./checker.expressions.js";
import { type CheckState, anyType, typeFromTypeNode } from "./checker.checkedtype.js";
import type { Type } from "./types.js";

export function checkEnumDeclaration(node: AstNode, state: CheckState): void {
  const seen = new Set<string>();
  for (const member of membersOf(node)) {
    const name = declarationName(member);
    if (name.length > 0 && seen.has(name)) state.diagnostics.push({ message: `Duplicate_identifier_0: ${name}` });
    seen.add(name);
    checkEnumMember(member, state);
  }
}

export function checkEnumMember(node: AstNode, state: CheckState): void {
  const initializer = (node as { readonly initializer?: AstNode }).initializer;
  if (initializer !== undefined) inferExpression(initializer as never, state);
}

export function checkModuleDeclaration(node: AstNode, state: CheckState): void {
  if (!isInstantiatedModule(node) && !isAmbient(node)) return;
  const body = (node as { readonly body?: AstNode }).body;
  if (body?.kind === Kind.ModuleBlock) {
    for (const statement of statementsOf(body)) checkModuleAugmentationElement(statement, state);
  }
}

export function isInstantiatedModule(node: AstNode): boolean {
  const symbol = nodeSymbol(node);
  if (symbol === undefined) return false;
  if (((symbol.flags ?? 0) & SymbolFlags.ValueModule) !== 0) return true;
  return statementsOf((node as { readonly body?: AstNode }).body).some(statement => isValueModuleElement(statement));
}

export function getFirstNonAmbientClassOrFunctionDeclaration(symbol: AstSymbol | undefined): AstNode | undefined {
  return (symbol?.declarations ?? []).find(declaration =>
    (declaration.kind === Kind.ClassDeclaration || declaration.kind === Kind.FunctionDeclaration) && !isAmbient(declaration));
}

export function getIsolatedModulesLikeFlagName(options: unknown): string {
  const opts = options as { readonly isolatedModules?: boolean; readonly verbatimModuleSyntax?: boolean };
  return opts.verbatimModuleSyntax === true ? "verbatimModuleSyntax" : "isolatedModules";
}

export function checkModuleAugmentationElement(node: AstNode, state: CheckState): void {
  if (node.kind === Kind.ImportDeclaration || node.kind === Kind.ImportEqualsDeclaration) {
    state.diagnostics.push({ message: "Imports_are_not_permitted_in_module_augmentations" });
  }
  if (node.kind === Kind.ExportAssignment) {
    state.diagnostics.push({ message: "Exports_and_export_assignments_are_not_permitted_in_module_augmentations" });
  }
}

export function checkImportDeclaration(node: AstNode, state: CheckState): void {
  checkExternalImportOrExportDeclaration(node, state);
  const importClause = (node as { readonly importClause?: AstNode }).importClause;
  if (importClause !== undefined) checkImportBinding(importClause, state);
  const attributes = (node as { readonly attributes?: AstNode }).attributes;
  if (attributes !== undefined) checkImportAttributes(attributes, state);
}

export function checkExternalImportOrExportDeclaration(node: AstNode, state: CheckState): void {
  const moduleSpecifier = (node as { readonly moduleSpecifier?: AstNode }).moduleSpecifier;
  if (moduleSpecifier === undefined) {
    state.diagnostics.push({ message: "External_module_declaration_requires_a_module_specifier" });
    return;
  }
  inferExpression(moduleSpecifier as never, state);
}

export function checkImportBinding(node: AstNode, state: CheckState): void {
  const name = (node as { readonly name?: AstNode }).name;
  if (name !== undefined) checkImportBindingName(name, state);
  const namedBindings = (node as { readonly namedBindings?: AstNode }).namedBindings;
  if (namedBindings !== undefined) {
    for (const element of elementsOf(namedBindings)) checkImportBindingName(element, state);
  }
}

export function checkModuleExportName(node: AstNode, state: CheckState): void {
  const text = literalText(node);
  if (text.length === 0) state.diagnostics.push({ message: "String_literal_export_name_cannot_be_empty" });
}

export function hasTypeJsonImportAttribute(node: AstNode): boolean {
  const attributes = (node as { readonly attributes?: AstNode }).attributes ?? node;
  return elementsOf(attributes).some(element =>
    declarationName(element) === "type"
    && literalText((element as { readonly value?: AstNode }).value) === "json");
}

export function checkImportAttributes(node: AstNode, state: CheckState): void {
  const seen = new Set<string>();
  for (const element of elementsOf(node)) {
    const name = declarationName(element);
    if (seen.has(name)) state.diagnostics.push({ message: `Import attribute '${name}' specified more than once.` });
    seen.add(name);
    const value = (element as { readonly value?: AstNode }).value;
    if (value !== undefined && value.kind !== Kind.StringLiteral) state.diagnostics.push({ message: "Import_attribute_values_must_be_string_literals" });
  }
}

export function getTypeFromImportAttributes(node: AstNode): "json" | "javascript" | undefined {
  if (hasTypeJsonImportAttribute(node)) return "json";
  const attributes = (node as { readonly attributes?: AstNode }).attributes ?? node;
  for (const element of elementsOf(attributes)) {
    if (declarationName(element) === "type") return "javascript";
  }
  return undefined;
}

export function checkImportEqualsDeclaration(node: AstNode, state: CheckState): void {
  const moduleReference = (node as { readonly moduleReference?: AstNode }).moduleReference;
  if (moduleReference === undefined) state.diagnostics.push({ message: "Import_equals_declaration_requires_a_module_reference" });
  else checkModuleExportName(moduleReference, state);
}

export function checkExportDeclaration(node: AstNode, state: CheckState): void {
  checkExternalImportOrExportDeclaration(node, state);
  const exportClause = (node as { readonly exportClause?: AstNode }).exportClause;
  for (const element of elementsOf(exportClause)) checkExportSpecifier(element, state);
}

export function checkExportSpecifier(node: AstNode, state: CheckState): void {
  const name = (node as { readonly name?: AstNode }).name;
  if (name !== undefined) checkModuleExportName(name, state);
  const propertyName = (node as { readonly propertyName?: AstNode }).propertyName;
  if (propertyName !== undefined) checkModuleExportName(propertyName, state);
}

export function checkExportAssignment(node: AstNode, state: CheckState): void {
  const expression = (node as { readonly expression?: AstNode }).expression;
  if (expression === undefined) state.diagnostics.push({ message: "Export_assignment_requires_an_expression" });
  else inferExpression(expression as never, state);
}

export function getVerbatimModuleSyntaxErrorMessage(node: AstNode): string {
  if (node.kind === Kind.ImportEqualsDeclaration) return "ESM_syntax_is_not_allowed_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled";
  if (node.kind === Kind.ExportAssignment) return "An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements";
  return "This_syntax_is_not_allowed_when_verbatimModuleSyntax_is_enabled";
}

export function checkExternalModuleExports(sourceFile: AstNode, state: CheckState): void {
  const symbol = nodeSymbol(sourceFile);
  if (symbol === undefined) return;
  if (!hasExportedMembersOfKind(symbol, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace)) {
    state.diagnostics.push({ message: "External_module_has_no_exports" });
  }
}

export function hasExportedMembersOfKind(symbol: AstSymbol, kind: number): boolean {
  for (const exported of symbol.exports?.values() ?? []) {
    if (((exported.flags ?? 0) & kind) !== 0) return true;
  }
  return false;
}

export function hasShadowedNamespace(symbol: AstSymbol): boolean {
  const exports = symbol.exports;
  if (exports === undefined) return false;
  for (const [name, exported] of exports) {
    const member = symbol.members?.get(name);
    if (member !== undefined && ((member.flags ?? 0) & SymbolFlags.Namespace) !== 0 && ((exported.flags ?? 0) & SymbolFlags.Namespace) === 0) return true;
  }
  return false;
}

export function isNotOverload(node: AstNode): boolean {
  return (node as { readonly body?: AstNode }).body !== undefined
    || (node.kind !== Kind.FunctionDeclaration && node.kind !== Kind.MethodDeclaration && node.kind !== Kind.Constructor);
}

export function checkMissingDeclaration(node: AstNode, state: CheckState): void {
  void node;
  state.diagnostics.push({ message: "Declaration_expected" });
}

export function checkAliasSymbol(symbol: AstSymbol, state: CheckState): void {
  const declaration = symbol.declarations?.[0];
  if (declaration === undefined) state.diagnostics.push({ message: `Alias symbol '${symbol.name ?? symbol.escapedName ?? ""}' has no declaration.` });
}

export function areDeclarationFlagsIdentical(left: AstNode, right: AstNode): boolean {
  return modifierFlags(left) === modifierFlags(right);
}

export function checkTypeNameIsReserved(name: AstNode | undefined, state: CheckState): void {
  const text = literalText(name);
  if (text === "string" || text === "number" || text === "boolean" || text === "symbol" || text === "object") {
    state.diagnostics.push({ message: `Type_parameter_name_cannot_be_0: ${text}` });
  }
}

export function checkExportsOnMergedDeclarations(symbol: AstSymbol, state: CheckState): void {
  const declarations = symbol.declarations ?? [];
  const exportedCount = declarations.filter(hasExportModifier).length;
  if (exportedCount > 0 && exportedCount !== declarations.length) {
    state.diagnostics.push({ message: `Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local: ${symbol.name ?? ""}` });
  }
}

export function getDeclarationSpaces(node: AstNode): number {
  if (node.kind === Kind.InterfaceDeclaration || node.kind === Kind.TypeAliasDeclaration) return SymbolFlags.Type;
  if (node.kind === Kind.ModuleDeclaration) return SymbolFlags.Namespace | SymbolFlags.Value;
  if (node.kind === Kind.ClassDeclaration || node.kind === Kind.EnumDeclaration) return SymbolFlags.Value | SymbolFlags.Type;
  if (node.kind === Kind.FunctionDeclaration || node.kind === Kind.VariableDeclaration) return SymbolFlags.Value;
  return SymbolFlags.None;
}

export function checkTypeParametersNotReferenced(nodes: readonly AstNode[], state: CheckState): void {
  const names = new Set(nodes.map(declarationName).filter(name => name.length > 0));
  for (const node of nodes) {
    for (const child of childNodes(node)) {
      if (child !== node && names.has(literalText(child))) {
        state.diagnostics.push({ message: `Type_parameter_0_has_a_circular_constraint: ${literalText(child)}` });
      }
    }
  }
}

function checkImportBindingName(node: AstNode, state: CheckState): void {
  if (node.kind === Kind.StringLiteral) checkModuleExportName(node, state);
  if (node.kind === Kind.Identifier && literalText(node) === "arguments") {
    state.diagnostics.push({ message: "Identifier_expected_arguments_is_reserved" });
  }
}

function isValueModuleElement(node: AstNode): boolean {
  return node.kind === Kind.VariableStatement
    || node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.ClassDeclaration
    || node.kind === Kind.EnumDeclaration
    || node.kind === Kind.ExportAssignment;
}

function statementsOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly statements?: unknown } | undefined)?.statements);
}

function membersOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly members?: unknown } | undefined)?.members);
}

function elementsOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly elements?: unknown; readonly properties?: unknown } | undefined)?.elements
    ?? (node as { readonly properties?: unknown } | undefined)?.properties);
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (Array.isArray(value)) return value.filter(isNode);
  if (isNodeList(value)) return value.nodes.filter(isNode);
  return [];
}

function childNodes(node: AstNode): readonly AstNode[] {
  const result: AstNode[] = [];
  for (const value of Object.values(node as object)) {
    if (isNode(value)) result.push(value);
    else if (Array.isArray(value)) result.push(...value.filter(isNode));
    else if (isNodeList(value)) result.push(...value.nodes.filter(isNode));
  }
  return result;
}

function declarationName(node: AstNode | undefined): string {
  const name = (node as { readonly name?: AstNode } | undefined)?.name ?? node;
  return literalText(name);
}

function literalText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? "";
}

function isAmbient(node: AstNode): boolean {
  return (((node as { readonly flags?: number }).flags ?? 0) & (1 << 23)) !== 0 || modifierKinds(node).includes(Kind.DeclareKeyword);
}

function hasExportModifier(node: AstNode): boolean {
  return modifierKinds(node).includes(Kind.ExportKeyword);
}

function modifierFlags(node: AstNode): number {
  let flags = 0;
  for (const kind of modifierKinds(node)) flags |= 1 << kind;
  return flags;
}

function modifierKinds(node: AstNode): readonly Kind[] {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] | { readonly nodes?: readonly AstNode[] } }).modifiers;
  const nodes: readonly AstNode[] = Array.isArray(modifiers) ? modifiers : (modifiers as { readonly nodes?: readonly AstNode[] } | undefined)?.nodes ?? [];
  return nodes.map(modifier => modifier.kind);
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function isNodeList(value: unknown): value is { readonly nodes: readonly unknown[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes);
}

export function getTypeFromJsonImport(_node: AstNode): Type {
  return anyType;
}
