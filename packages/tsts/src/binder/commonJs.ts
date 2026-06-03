import type { Node, Symbol, SymbolTable } from "../ast/index.js";
import {
  Kind,
  SymbolFlags,
  binaryLeft,
  binaryOperatorKind,
  binaryRight,
  callExpressionArguments,
  callExpressionExpression,
  elementAccessExpressionOf,
  elementArgumentExpression,
  getSymbolExports,
  isIdentifier,
  nodeExpression,
  nodeInitializer,
  nodeName,
  nodeParent,
  nodeSymbol,
  nodeText,
  propertyAccessExpressionOf,
  propertyAccessName,
} from "../ast/index.js";

export type CommonJSExportKind = "none" | "module-exports" | "exports-property" | "object-define-property";

export interface CommonJSExportAssignment {
  readonly kind: CommonJSExportKind;
  readonly assignedName: string;
  readonly target: Node | undefined;
  readonly value: Node | undefined;
}

export interface ExpandoAssignmentInfo {
  readonly targetSymbol: Symbol | undefined;
  readonly namespaceName: string;
  readonly propertyName: string;
  readonly assignment: Node;
}

export function getCommonJSExportAssignment(node: Node): CommonJSExportAssignment {
  if (node.kind !== Kind.BinaryExpression || binaryOperatorKind(node) !== Kind.EqualsToken) {
    return { kind: "none", assignedName: "", target: undefined, value: undefined };
  }
  const left = binaryLeft(node);
  const right = binaryRight(node);
  if (isModuleExportsAccess(left)) {
    return { kind: "module-exports", assignedName: "export=", target: left, value: right };
  }
  const exportsName = getExportsPropertyName(left);
  if (exportsName !== "") {
    return { kind: "exports-property", assignedName: exportsName, target: left, value: right };
  }
  return { kind: "none", assignedName: "", target: undefined, value: undefined };
}

export function getObjectDefinePropertyExport(node: Node): CommonJSExportAssignment {
  if (node.kind !== Kind.CallExpression) return { kind: "none", assignedName: "", target: undefined, value: undefined };
  const expression = callExpressionExpression(node);
  if (!isObjectDefinePropertyCallExpression(expression)) return { kind: "none", assignedName: "", target: undefined, value: undefined };
  const args = callExpressionArguments(node);
  if (args.length < 2) return { kind: "none", assignedName: "", target: undefined, value: undefined };
  const target = args[0];
  const property = args[1];
  if (target === undefined || property === undefined) return { kind: "none", assignedName: "", target: undefined, value: undefined };
  if (!isExportsIdentifier(target) && !isModuleExportsAccess(target)) {
    return { kind: "none", assignedName: "", target: undefined, value: undefined };
  }
  const propertyName = literalPropertyName(property);
  if (propertyName === "") return { kind: "none", assignedName: "", target: undefined, value: undefined };
  return {
    kind: "object-define-property",
    assignedName: propertyName,
    target,
    value: args[2],
  };
}

export function bindCommonJSExport(
  exportTable: SymbolTable,
  assignment: CommonJSExportAssignment,
  createSymbol: (flags: number, name: string) => Symbol,
): Symbol | undefined {
  if (assignment.kind === "none" || assignment.assignedName === "") return undefined;
  const existing = exportTable.get(assignment.assignedName);
  if (existing !== undefined) return existing;
  const symbol = createSymbol(SymbolFlags.Property | SymbolFlags.ExportValue, assignment.assignedName);
  exportTable.set(assignment.assignedName, symbol);
  return symbol;
}

export function bindCommonJSTypeExports(moduleSymbol: Symbol, typeExports: readonly Symbol[]): void {
  const exports = getSymbolExports(moduleSymbol);
  for (const exported of typeExports) {
    const name = exported.name ?? exported.escapedName ?? "";
    if (name === "") continue;
    const existing = exports.get(name);
    if (existing === undefined) {
      exports.set(name, exported);
      continue;
    }
    existing.flags = (existing.flags ?? SymbolFlags.None) | (exported.flags ?? SymbolFlags.None);
    for (const declaration of exported.declarations ?? []) {
      if (!existing.declarations.includes(declaration)) existing.declarations.push(declaration);
    }
  }
}

export function getInitializerSymbol(symbol: Symbol | undefined): Symbol | undefined {
  if (symbol === undefined) return undefined;
  const valueDeclaration = symbol.valueDeclaration;
  if (valueDeclaration === undefined) return symbol;
  const initializer = nodeInitializer(valueDeclaration);
  const initializerSymbol = initializer === undefined ? undefined : nodeSymbol(initializer);
  return initializerSymbol ?? symbol;
}

export function getParentOfPropertyAssignment(node: Node): Node | undefined {
  let current: Node | undefined = node;
  while (current !== undefined) {
    const parent: Node | undefined = nodeParent(current);
    if (parent === undefined) return undefined;
    if (parent.kind === Kind.ExpressionStatement || parent.kind === Kind.SourceFile || parent.kind === Kind.Block) return parent;
    current = parent;
  }
  return undefined;
}

export function isAssignmentDeclaration(node: Node): boolean {
  if (node.kind === Kind.BinaryExpression && binaryOperatorKind(node) === Kind.EqualsToken) {
    const left = binaryLeft(node);
    return isBindableStaticNameExpression(left) || getExportsPropertyName(left) !== "" || isModuleExportsAccess(left);
  }
  if (node.kind === Kind.CallExpression) {
    return getObjectDefinePropertyExport(node).kind !== "none";
  }
  return false;
}

export function getExpandoAssignmentInfo(
  node: Node,
  lookupNamespace: (name: string) => Symbol | undefined,
): ExpandoAssignmentInfo | undefined {
  if (node.kind !== Kind.BinaryExpression || binaryOperatorKind(node) !== Kind.EqualsToken) return undefined;
  const left = binaryLeft(node);
  if (left.kind !== Kind.PropertyAccessExpression) return undefined;
  const expression = propertyAccessExpressionOf(left);
  const propertyName = propertyNameText(propertyAccessName(left));
  if (propertyName === "") return undefined;
  const namespaceName = qualifiedNameText(expression);
  if (namespaceName === "") return undefined;
  return {
    targetSymbol: lookupNamespace(namespaceName),
    namespaceName,
    propertyName,
    assignment: node,
  };
}

export function isBindableStaticNameExpression(node: Node | undefined): boolean {
  if (node === undefined) return false;
  if (isIdentifier(node)) return true;
  if (node.kind === Kind.PropertyAccessExpression) {
    return isBindableStaticNameExpression(propertyAccessExpressionOf(node)) && propertyNameText(propertyAccessName(node)) !== "";
  }
  if (node.kind === Kind.ElementAccessExpression) {
    const expression = elementAccessExpressionOf(node);
    const argument = elementArgumentExpression(node);
    return isBindableStaticNameExpression(expression) && literalPropertyName(argument) !== "";
  }
  return false;
}

export function isModuleExportsAccess(node: Node | undefined): boolean {
  if (node === undefined || node.kind !== Kind.PropertyAccessExpression) return false;
  const expression = propertyAccessExpressionOf(node);
  const name = propertyAccessName(node);
  return isModuleIdentifier(expression) && propertyNameText(name) === "exports";
}

export function isExportsIdentifier(node: Node | undefined): boolean {
  return node !== undefined && isIdentifier(node) && propertyNameText(node) === "exports";
}

export function getExportsPropertyName(node: Node | undefined): string {
  if (node === undefined) return "";
  if (node.kind === Kind.PropertyAccessExpression) {
    const expression = propertyAccessExpressionOf(node);
    if (isExportsIdentifier(expression)) return propertyNameText(propertyAccessName(node));
    if (isModuleExportsAccess(expression)) return propertyNameText(propertyAccessName(node));
  }
  if (node.kind === Kind.ElementAccessExpression) {
    const expression = elementAccessExpressionOf(node);
    const argument = elementArgumentExpression(node);
    if (isExportsIdentifier(expression) || isModuleExportsAccess(expression)) return literalPropertyName(argument);
  }
  return "";
}

export function isObjectDefinePropertyCallExpression(node: Node): boolean {
  if (node.kind !== Kind.PropertyAccessExpression) return false;
  const expression = propertyAccessExpressionOf(node);
  const name = propertyAccessName(node);
  if (propertyNameText(name) !== "defineProperty") return false;
  return expression.kind === Kind.Identifier && propertyNameText(expression) === "Object";
}

export function qualifiedNameText(node: Node | undefined): string {
  if (node === undefined) return "";
  if (isIdentifier(node)) return propertyNameText(node);
  if (node.kind === Kind.PropertyAccessExpression) {
    const left = qualifiedNameText(propertyAccessExpressionOf(node));
    const right = propertyNameText(propertyAccessName(node));
    if (left === "" || right === "") return "";
    return `${left}.${right}`;
  }
  if (node.kind === Kind.ParenthesizedExpression || node.kind === Kind.NonNullExpression) {
    return qualifiedNameText(nodeExpression(node));
  }
  return "";
}

export function literalPropertyName(node: Node | undefined): string {
  if (node === undefined) return "";
  switch (node.kind) {
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
      return propertyNameText(node);
  }
  return "";
}

export function propertyNameText(node: Node | undefined): string {
  if (node === undefined) return "";
  return nodeText(node);
}

function isModuleIdentifier(node: Node): boolean {
  return isIdentifier(node) && propertyNameText(node) === "module";
}
