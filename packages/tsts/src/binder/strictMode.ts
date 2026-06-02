import type { Node, SourceFile } from "../ast/index.js";
import {
  Kind,
  binaryLeft,
  binaryOperatorKind,
  blockStatements,
  functionAsteriskToken,
  getCombinedModifierFlags,
  isFunctionLike,
  isIdentifier,
  isNumericLiteral,
  nodeExpression,
  nodeName,
  nodeParameters,
  nodeParent,
  prefixUnaryOperandRO,
  sourceFileStatementsRO,
  stringLiteralText,
} from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import type { DiagnosticMessage } from "../diagnostics/types.js";

export interface StrictModeDiagnostic {
  readonly node: Node;
  readonly message: DiagnosticMessage;
  readonly args: readonly string[];
  readonly isError: boolean;
}

export function findUseStrictPrologue(sourceFile: SourceFile): Node | undefined {
  return findUseStrictPrologueInStatements(sourceFile, sourceFileStatementsRO(sourceFile));
}

export function findUseStrictPrologueInStatements(sourceFile: SourceFile, statements: readonly Node[]): Node | undefined {
  for (const statement of statements) {
    if (!isUseStrictPrologueDirective(sourceFile, statement)) return undefined;
    return statement;
  }
  return undefined;
}

export function isUseStrictPrologueDirective(_sourceFile: SourceFile, node: Node): boolean {
  if (node.kind !== Kind.ExpressionStatement) return false;
  const expression = nodeExpression(node);
  if (expression.kind !== Kind.StringLiteral && expression.kind !== Kind.NoSubstitutionTemplateLiteral) return false;
  return stringLiteralText(expression) === "use strict";
}

export function checkStrictModeFunctionName(node: Node): StrictModeDiagnostic | undefined {
  const name = nodeName(node);
  if (name === undefined) return undefined;
  return checkStrictModeEvalOrArguments(node, name);
}

export function getStrictModeBlockScopeFunctionDeclarationMessage(node: Node): DiagnosticMessage | undefined {
  if (node.kind !== Kind.FunctionDeclaration) return undefined;
  const parent = nodeParent(node);
  if (parent === undefined || parent.kind === Kind.SourceFile || parent.kind === Kind.ModuleBlock) return undefined;
  return Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5;
}

export function checkStrictModeBinaryExpression(node: Node): StrictModeDiagnostic | undefined {
  if (node.kind !== Kind.BinaryExpression) return undefined;
  const operator = binaryOperatorKind(node);
  if (operator !== Kind.EqualsToken) return undefined;
  const left = binaryLeft(node);
  if (left.kind === Kind.Identifier) {
    return checkStrictModeEvalOrArguments(node, left);
  }
  return undefined;
}

export function checkStrictModeCatchClause(node: Node): StrictModeDiagnostic | undefined {
  if (node.kind !== Kind.CatchClause) return undefined;
  const variableDeclaration = field<Node>(node, "variableDeclaration");
  const name = nodeName(variableDeclaration);
  if (name === undefined) return undefined;
  return checkStrictModeEvalOrArguments(node, name);
}

export function checkStrictModeDeleteExpression(node: Node): StrictModeDiagnostic | undefined {
  if (node.kind !== Kind.DeleteExpression) return undefined;
  const expression = nodeExpression(node);
  if (expression.kind !== Kind.Identifier) return undefined;
  return {
    node,
    message: Diagnostics.Invalid_use_of_0_in_strict_mode,
    args: [identifierText(expression)],
    isError: true,
  };
}

export function checkStrictModePostfixUnaryExpression(node: Node): StrictModeDiagnostic | undefined {
  if (node.kind !== Kind.PostfixUnaryExpression) return undefined;
  const operand = field<Node>(node, "operand");
  if (operand === undefined) return undefined;
  return checkStrictModeEvalOrArguments(node, operand);
}

export function checkStrictModePrefixUnaryExpression(node: Node): StrictModeDiagnostic | undefined {
  if (node.kind !== Kind.PrefixUnaryExpression) return undefined;
  const operand = prefixUnaryOperandRO(node);
  return checkStrictModeEvalOrArguments(node, operand);
}

export function checkStrictModeWithStatement(node: Node): StrictModeDiagnostic | undefined {
  if (node.kind !== Kind.WithStatement) return undefined;
  return {
    node,
    message: Diagnostics.X_with_statements_are_not_allowed_in_strict_mode,
    args: [],
    isError: true,
  };
}

export function checkStrictModeLabeledStatement(node: Node): StrictModeDiagnostic | undefined {
  if (node.kind !== Kind.LabeledStatement) return undefined;
  const label = field<Node>(node, "label");
  if (label === undefined || !isEvalOrArgumentsIdentifier(label)) return undefined;
  return {
    node: label,
    message: Diagnostics.Invalid_use_of_0_in_strict_mode,
    args: [identifierText(label)],
    isError: true,
  };
}

export function checkStrictModeEvalOrArguments(contextNode: Node, name: Node): StrictModeDiagnostic | undefined {
  if (!isEvalOrArgumentsIdentifier(name)) return undefined;
  const message = getStrictModeEvalOrArgumentsMessage(contextNode);
  if (message === undefined) return undefined;
  return {
    node: name,
    message,
    args: [identifierText(name)],
    isError: true,
  };
}

export function getStrictModeEvalOrArgumentsMessage(node: Node): DiagnosticMessage | undefined {
  switch (node.kind) {
    case Kind.Parameter:
    case Kind.BindingElement:
    case Kind.VariableDeclaration:
      return Diagnostics.Invalid_use_of_0_in_strict_mode;
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
      return Diagnostics.Invalid_use_of_0_in_strict_mode;
    case Kind.BinaryExpression:
    case Kind.PrefixUnaryExpression:
    case Kind.PostfixUnaryExpression:
    case Kind.CatchClause:
    case Kind.LabeledStatement:
      return Diagnostics.Invalid_use_of_0_in_strict_mode;
  }
  return undefined;
}

export function getStrictModeIdentifierMessage(node: Node): DiagnosticMessage | undefined {
  if (!isIdentifier(node)) return undefined;
  if (isEvalOrArgumentsIdentifier(node)) return Diagnostics.Invalid_use_of_0_in_strict_mode;
  if (identifierText(node) === "yield") return Diagnostics.Invalid_use_of_0_in_strict_mode;
  return undefined;
}

export function isEvalOrArgumentsIdentifier(node: Node | undefined): boolean {
  if (node === undefined || !isIdentifier(node)) return false;
  const text = identifierText(node);
  return text === "eval" || text === "arguments";
}

export function isStrictModeSignedNumericLiteral(node: Node | undefined): boolean {
  if (node === undefined) return false;
  if (isNumericLiteral(node)) return true;
  if (node.kind !== Kind.PrefixUnaryExpression) return false;
  const operator = field<Kind>(node, "operator");
  if (operator !== Kind.PlusToken && operator !== Kind.MinusToken) return false;
  return isNumericLiteral(prefixUnaryOperandRO(node));
}

export function isFunctionSymbolLikeDeclaration(node: Node): boolean {
  return node.kind === Kind.FunctionDeclaration ||
    node.kind === Kind.FunctionExpression ||
    node.kind === Kind.MethodDeclaration ||
    node.kind === Kind.Constructor ||
    node.kind === Kind.GetAccessor ||
    node.kind === Kind.SetAccessor ||
    node.kind === Kind.ArrowFunction;
}

export function functionIsGenerator(node: Node): boolean {
  if (!isFunctionLike(node)) return false;
  return functionAsteriskToken(node) !== undefined;
}

export function declarationHasExportModifier(node: Node): boolean {
  return (getCombinedModifierFlags(node) & ModifierFlags.Export) !== 0;
}

export function declarationHasDefaultModifier(node: Node): boolean {
  return (getCombinedModifierFlags(node) & ModifierFlags.Default) !== 0;
}

export function collectStrictModeDiagnostics(sourceFile: SourceFile): readonly StrictModeDiagnostic[] {
  const diagnostics: StrictModeDiagnostic[] = [];
  const visit = (node: Node): void => {
    const checks = [
      checkStrictModeFunctionName(node),
      checkStrictModeBinaryExpression(node),
      checkStrictModeCatchClause(node),
      checkStrictModeDeleteExpression(node),
      checkStrictModePostfixUnaryExpression(node),
      checkStrictModePrefixUnaryExpression(node),
      checkStrictModeWithStatement(node),
      checkStrictModeLabeledStatement(node),
    ];
    for (const diagnostic of checks) {
      if (diagnostic !== undefined) diagnostics.push(diagnostic);
    }
    for (const child of childrenOf(node)) visit(child);
  };
  for (const statement of sourceFileStatementsRO(sourceFile)) visit(statement);
  return diagnostics;
}

export function functionParameterNames(node: Node): readonly string[] {
  if (!isFunctionLike(node)) return [];
  const names: string[] = [];
  for (const parameter of nodeParameters(node)) {
    const name = nodeName(parameter);
    if (name !== undefined && isIdentifier(name)) names.push(identifierText(name));
  }
  return names;
}

export function blockContainsUseStrict(node: Node): boolean {
  if (node.kind !== Kind.Block && node.kind !== Kind.ModuleBlock) return false;
  const statements = blockStatements(node);
  return statements.some((statement) => {
    if (statement.kind !== Kind.ExpressionStatement) return false;
    const expression = nodeExpression(statement);
    return (expression.kind === Kind.StringLiteral || expression.kind === Kind.NoSubstitutionTemplateLiteral)
      && stringLiteralText(expression) === "use strict";
  });
}

function childrenOf(node: Node): readonly Node[] {
  const result: Node[] = [];
  const push = (value: unknown): void => {
    if (isNode(value)) result.push(value);
    else if (Array.isArray(value)) {
      for (const item of value) push(item);
    }
  };
  for (const value of Object.values(node as unknown as Record<string, unknown>)) {
    push(value);
  }
  return result;
}

function isNode(value: unknown): value is Node {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}

function identifierText(node: Node): string {
  return field<string>(node, "text") ?? "";
}

function field<T>(node: Node | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[key];
}
