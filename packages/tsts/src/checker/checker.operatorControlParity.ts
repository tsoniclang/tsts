/**
 * Operator and control-flow statement checks.
 *
 * TS-Go checker.go contains substantial operator validation and statement
 * checking around truthiness, nullish coalescing, arithmetic, `in`,
 * `instanceof`, loop RHS validation, return/throw/break/continue handling, and
 * switch exhaustiveness. This module ports those decisions as reusable
 * table-driven checker operations.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import { TypeFlags, type Type } from "./types.js";

export type PredicateSemantics = "always" | "never" | "sometimes" | "unknown";
export type AssignmentKind = "none" | "definite" | "compound" | "prefix" | "postfix";
export type OperatorFamily = "arithmetic" | "bitwise" | "comparison" | "equality" | "logical" | "assignment" | "relational" | "nullish";

export interface OperatorRule {
  readonly operator: Kind;
  readonly family: OperatorFamily;
  readonly left: TypeFlags;
  readonly right: TypeFlags;
  readonly result: TypeFlags;
  readonly allowAny: boolean;
}

export interface ControlCheckEnvironment {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly booleanType: Type;
  readonly numberType: Type;
  readonly stringType: Type;
  readonly undefinedType: Type;
  readonly getExpressionType?: (node: AstNode) => Type | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly getReturnTypeOfFunction?: (node: AstNode) => Type | undefined;
  readonly getIterationElementType?: (node: AstNode, type: Type) => Type | undefined;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface OperatorCheckResult {
  readonly operator: Kind;
  readonly resultType: Type;
  readonly valid: boolean;
  readonly family: OperatorFamily;
  readonly message?: string;
}

export interface StatementCheckResult {
  readonly node: AstNode;
  readonly reachable: boolean;
  readonly exits: boolean;
  readonly diagnostics: readonly string[];
}

export const operatorRules: readonly OperatorRule[] = [
  { operator: Kind.PlusToken, family: "arithmetic", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.PlusToken, family: "arithmetic", left: TypeFlags.StringLike, right: TypeFlags.StringLike, result: TypeFlags.String, allowAny: true },
  { operator: Kind.MinusToken, family: "arithmetic", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.AsteriskToken, family: "arithmetic", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.SlashToken, family: "arithmetic", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.PercentToken, family: "arithmetic", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.AsteriskAsteriskToken, family: "arithmetic", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.AmpersandToken, family: "bitwise", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.BarToken, family: "bitwise", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.CaretToken, family: "bitwise", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.LessThanLessThanToken, family: "bitwise", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.GreaterThanGreaterThanToken, family: "bitwise", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.GreaterThanGreaterThanGreaterThanToken, family: "bitwise", left: TypeFlags.NumberLike, right: TypeFlags.NumberLike, result: TypeFlags.Number, allowAny: true },
  { operator: Kind.LessThanToken, family: "comparison", left: TypeFlags.NumberLike | TypeFlags.StringLike, right: TypeFlags.NumberLike | TypeFlags.StringLike, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.LessThanEqualsToken, family: "comparison", left: TypeFlags.NumberLike | TypeFlags.StringLike, right: TypeFlags.NumberLike | TypeFlags.StringLike, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.GreaterThanToken, family: "comparison", left: TypeFlags.NumberLike | TypeFlags.StringLike, right: TypeFlags.NumberLike | TypeFlags.StringLike, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.GreaterThanEqualsToken, family: "comparison", left: TypeFlags.NumberLike | TypeFlags.StringLike, right: TypeFlags.NumberLike | TypeFlags.StringLike, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.EqualsEqualsToken, family: "equality", left: TypeFlags.AnyOrUnknown, right: TypeFlags.AnyOrUnknown, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.EqualsEqualsEqualsToken, family: "equality", left: TypeFlags.AnyOrUnknown, right: TypeFlags.AnyOrUnknown, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.ExclamationEqualsToken, family: "equality", left: TypeFlags.AnyOrUnknown, right: TypeFlags.AnyOrUnknown, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.ExclamationEqualsEqualsToken, family: "equality", left: TypeFlags.AnyOrUnknown, right: TypeFlags.AnyOrUnknown, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.AmpersandAmpersandToken, family: "logical", left: TypeFlags.AnyOrUnknown, right: TypeFlags.AnyOrUnknown, result: TypeFlags.Unknown, allowAny: true },
  { operator: Kind.BarBarToken, family: "logical", left: TypeFlags.AnyOrUnknown, right: TypeFlags.AnyOrUnknown, result: TypeFlags.Unknown, allowAny: true },
  { operator: Kind.QuestionQuestionToken, family: "nullish", left: TypeFlags.AnyOrUnknown, right: TypeFlags.AnyOrUnknown, result: TypeFlags.Unknown, allowAny: true },
  { operator: Kind.InKeyword, family: "relational", left: TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.ESSymbolLike, right: TypeFlags.NonPrimitive, result: TypeFlags.Boolean, allowAny: true },
  { operator: Kind.InstanceOfKeyword, family: "relational", left: TypeFlags.AnyOrUnknown, right: TypeFlags.Object, result: TypeFlags.Boolean, allowAny: true },
];

export function checkBinaryLikeExpression(
  left: AstNode,
  operatorToken: AstNode,
  right: AstNode,
  errorNode: AstNode,
  environment: ControlCheckEnvironment,
): OperatorCheckResult {
  const leftType = environment.getExpressionType?.(left) ?? environment.unknownType;
  const rightType = environment.getExpressionType?.(right) ?? environment.unknownType;
  const operator = operatorToken.kind;
  if (isAssignmentOperator(operator)) return checkAssignmentOperator(left, operator, right, leftType, rightType, environment);
  if (operator === Kind.InKeyword) return checkInExpression(left, right, leftType, rightType, environment);
  if (operator === Kind.InstanceOfKeyword) return checkInstanceOfExpression(left, right, leftType, rightType, environment);
  const rule = findOperatorRule(operator, leftType, rightType);
  if (rule === undefined) {
    const message = `Operator '${operatorText(operator)}' cannot be applied to the operand types.`;
    environment.report?.(errorNode, message);
    return { operator, resultType: environment.unknownType, valid: false, family: "arithmetic", message };
  }
  return { operator, resultType: typeForRuleResult(rule, environment), valid: true, family: rule.family };
}

export function checkAssignmentOperator(
  left: AstNode,
  operator: Kind,
  right: AstNode,
  leftType: Type,
  rightType: Type,
  environment: ControlCheckEnvironment,
): OperatorCheckResult {
  const kind = getAssignmentKind(operator);
  const assignable = environment.isTypeAssignableTo?.(rightType, leftType) ?? true;
  if (!assignable) {
    const message = "Type of right-hand side is not assignable to left-hand side.";
    environment.report?.(right, message);
    return { operator, resultType: leftType, valid: false, family: "assignment", message };
  }
  if (isAssignmentToReadonlyEntity(left)) {
    const message = "Cannot assign to a readonly entity.";
    environment.report?.(left, message);
    return { operator, resultType: leftType, valid: false, family: "assignment", message };
  }
  void kind;
  return { operator, resultType: leftType, valid: true, family: "assignment" };
}

export function checkInstanceOfExpression(
  left: AstNode,
  right: AstNode,
  leftType: Type,
  rightType: Type,
  environment: ControlCheckEnvironment,
): OperatorCheckResult {
  if ((rightType.flags & (TypeFlags.Object | TypeFlags.Any | TypeFlags.Unknown)) === 0) {
    const message = "The right-hand side of an 'instanceof' expression must be callable.";
    environment.report?.(right, message);
    return { operator: Kind.InstanceOfKeyword, resultType: environment.booleanType, valid: false, family: "relational", message };
  }
  void left;
  void leftType;
  return { operator: Kind.InstanceOfKeyword, resultType: environment.booleanType, valid: true, family: "relational" };
}

export function checkInExpression(
  left: AstNode,
  right: AstNode,
  leftType: Type,
  rightType: Type,
  environment: ControlCheckEnvironment,
): OperatorCheckResult {
  const leftOk = (leftType.flags & (TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.ESSymbolLike | TypeFlags.AnyOrUnknown)) !== 0;
  const rightOk = (rightType.flags & (TypeFlags.Object | TypeFlags.NonPrimitive | TypeFlags.AnyOrUnknown)) !== 0;
  if (!leftOk || !rightOk) {
    const message = "The left side of an 'in' expression must be a property key and the right side must be an object.";
    environment.report?.(!leftOk ? left : right, message);
    return { operator: Kind.InKeyword, resultType: environment.booleanType, valid: false, family: "relational", message };
  }
  return { operator: Kind.InKeyword, resultType: environment.booleanType, valid: true, family: "relational" };
}

export function checkTruthinessOfType(type: Type, node: AstNode, environment: ControlCheckEnvironment): Type {
  const semantics = getSyntacticTruthySemantics(node);
  if (semantics === "never") environment.report?.(node, "This kind of expression is always falsy.");
  if (semantics === "always") environment.report?.(node, "This kind of expression is always truthy.");
  void type;
  return environment.booleanType;
}

export function getSyntacticTruthySemantics(node: AstNode): PredicateSemantics {
  switch (node.kind) {
    case Kind.NullKeyword:
    case Kind.FalseKeyword:
      return "never";
    case Kind.TrueKeyword:
    case Kind.ObjectLiteralExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
      return "always";
    case Kind.NumericLiteral:
      return numericLiteralValue(node) === 0 ? "never" : "sometimes";
    case Kind.StringLiteral:
      return nodeText(node).length === 0 ? "never" : "sometimes";
    default:
      return "unknown";
  }
}

export function getSyntacticNullishnessSemantics(node: AstNode): PredicateSemantics {
  if (node.kind === Kind.NullKeyword) return "always";
  if (node.kind === Kind.Identifier && nodeText(node) === "undefined") return "always";
  if (node.kind === Kind.VoidExpression) return "always";
  if (node.kind === Kind.NonNullExpression) return "never";
  return "unknown";
}

export function checkNullishCoalesceOperands(left: AstNode, right: AstNode, environment: ControlCheckEnvironment): void {
  const semantics = getSyntacticNullishnessSemantics(left);
  if (semantics === "never") environment.report?.(left, "Right operand of ?? is unreachable because the left operand is never nullish.");
  if (semantics === "always") environment.report?.(right, "Left operand of ?? is always nullish.");
}

export function checkStatement(node: AstNode, environment: ControlCheckEnvironment, reachable = true): StatementCheckResult {
  const diagnostics: string[] = [];
  const scoped = withDiagnosticCapture(environment, diagnostics);
  let exits = false;
  switch (node.kind) {
    case Kind.ReturnStatement:
      checkReturnStatement(node, scoped);
      exits = true;
      break;
    case Kind.ThrowStatement:
      checkThrowStatement(node, scoped);
      exits = true;
      break;
    case Kind.IfStatement:
      exits = checkIfStatement(node, scoped).exits;
      break;
    case Kind.SwitchStatement:
      exits = checkSwitchStatement(node, scoped).exits;
      break;
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.WhileStatement:
    case Kind.DoStatement:
      checkLoopStatement(node, scoped);
      break;
    case Kind.BreakStatement:
    case Kind.ContinueStatement:
      checkBreakOrContinueStatement(node, scoped);
      exits = true;
      break;
    case Kind.Block:
      exits = checkBlock(node, scoped).exits;
      break;
    default:
      checkExpressionStatement(node, scoped);
      break;
  }
  return { node, reachable, exits, diagnostics };
}

export function checkBlock(node: AstNode, environment: ControlCheckEnvironment): StatementCheckResult {
  let reachable = true;
  const diagnostics: string[] = [];
  for (const statement of nodeArray(node, "statements")) {
    const result = checkStatement(statement, withDiagnosticCapture(environment, diagnostics), reachable);
    reachable = reachable && !result.exits;
  }
  return { node, reachable: true, exits: !reachable, diagnostics };
}

export function checkIfStatement(node: AstNode, environment: ControlCheckEnvironment): StatementCheckResult {
  const expression = expressionOf(node);
  if (expression !== undefined) checkTruthinessExpression(expression, environment);
  const thenStatement = (node as { readonly thenStatement?: AstNode }).thenStatement;
  const elseStatement = (node as { readonly elseStatement?: AstNode }).elseStatement;
  const thenResult = thenStatement === undefined ? undefined : checkStatement(thenStatement, environment);
  const elseResult = elseStatement === undefined ? undefined : checkStatement(elseStatement, environment);
  return { node, reachable: true, exits: thenResult?.exits === true && elseResult?.exits === true, diagnostics: [] };
}

export function checkSwitchStatement(node: AstNode, environment: ControlCheckEnvironment): StatementCheckResult {
  const expression = expressionOf(node);
  if (expression !== undefined) environment.getExpressionType?.(expression);
  let allClausesExit = true;
  let hasDefault = false;
  for (const clause of nodeArray(node, "caseBlock")) {
    if (clause.kind === Kind.DefaultClause) hasDefault = true;
    const result = checkBlockLikeClause(clause, environment);
    allClausesExit &&= result.exits;
  }
  return { node, reachable: true, exits: hasDefault && allClausesExit, diagnostics: [] };
}

export function checkLoopStatement(node: AstNode, environment: ControlCheckEnvironment): void {
  if (node.kind === Kind.ForOfStatement) {
    const expression = (node as { readonly expression?: AstNode }).expression;
    const type = expression === undefined ? undefined : environment.getExpressionType?.(expression);
    if (expression !== undefined && type !== undefined && environment.getIterationElementType?.(expression, type) === undefined) {
      environment.report?.(expression, "Type must have a '[Symbol.iterator]()' method that returns an iterator.");
    }
  }
  if (node.kind === Kind.ForInStatement) {
    const expression = (node as { readonly expression?: AstNode }).expression;
    const type = expression === undefined ? undefined : environment.getExpressionType?.(expression);
    if (type !== undefined && (type.flags & (TypeFlags.Object | TypeFlags.AnyOrUnknown)) === 0) {
      environment.report?.(expression ?? node, "The right-hand side of a 'for...in' statement must be an object.");
    }
  }
}

export function checkReturnStatement(node: AstNode, environment: ControlCheckEnvironment): void {
  const expression = expressionOf(node);
  const returnType = nearestFunction(node) === undefined ? undefined : environment.getReturnTypeOfFunction?.(nearestFunction(node)!);
  if (returnType === undefined || expression === undefined) return;
  const expressionType = environment.getExpressionType?.(expression);
  if (expressionType !== undefined && environment.isTypeAssignableTo?.(expressionType, returnType) === false) {
    environment.report?.(expression, "Type of return expression is not assignable to function return type.");
  }
}

export function checkThrowStatement(node: AstNode, environment: ControlCheckEnvironment): void {
  const expression = expressionOf(node);
  if (expression === undefined) environment.report?.(node, "A throw statement must throw an expression.");
}

export function checkBreakOrContinueStatement(node: AstNode, environment: ControlCheckEnvironment): void {
  const label = (node as { readonly label?: AstNode }).label;
  if (label !== undefined && !hasEnclosingLabel(node, nodeText(label))) {
    environment.report?.(label, `Cannot find label '${nodeText(label)}'.`);
  }
}

export function checkExpressionStatement(node: AstNode, environment: ControlCheckEnvironment): void {
  const expression = expressionOf(node) ?? node;
  environment.getExpressionType?.(expression);
}

export function checkTruthinessExpression(node: AstNode, environment: ControlCheckEnvironment): Type {
  const type = environment.getExpressionType?.(node) ?? environment.unknownType;
  return checkTruthinessOfType(type, node, environment);
}

export function checkArithmeticOperandType(node: AstNode, type: Type, environment: ControlCheckEnvironment): boolean {
  if ((type.flags & (TypeFlags.NumberLike | TypeFlags.BigIntLike | TypeFlags.AnyOrUnknown)) !== 0) return true;
  environment.report?.(node, "An arithmetic operand must be of type 'any', 'number', 'bigint', or an enum type.");
  return false;
}

export function checkForDisallowedESSymbolOperand(left: AstNode, right: AstNode, leftType: Type, rightType: Type, operator: Kind, environment: ControlCheckEnvironment): boolean {
  const bad = (leftType.flags & TypeFlags.ESSymbolLike) !== 0 || (rightType.flags & TypeFlags.ESSymbolLike) !== 0;
  if (bad) environment.report?.((leftType.flags & TypeFlags.ESSymbolLike) !== 0 ? left : right, `Operator '${operatorText(operator)}' cannot be applied to type 'symbol'.`);
  return !bad;
}

export function checkNaNEquality(errorNode: AstNode, operator: Kind, left: AstNode, right: AstNode, environment: ControlCheckEnvironment): void {
  if (!isEqualityOperator(operator)) return;
  if (isGlobalNaN(left) || isGlobalNaN(right)) environment.report?.(errorNode, "This condition will always return false because JavaScript compares NaN as unequal.");
}

export function isGlobalNaN(node: AstNode): boolean {
  return nodeText(node) === "NaN";
}

export function isTypeEqualityComparableTo(source: Type, target: Type): boolean {
  if ((source.flags & TypeFlags.AnyOrUnknown) !== 0 || (target.flags & TypeFlags.AnyOrUnknown) !== 0) return true;
  if ((source.flags & target.flags) !== 0) return true;
  if ((source.flags & TypeFlags.Nullable) !== 0 || (target.flags & TypeFlags.Nullable) !== 0) return true;
  return false;
}

function findOperatorRule(operator: Kind, left: Type, right: Type): OperatorRule | undefined {
  return operatorRules.find(rule => rule.operator === operator && typeMatches(left, rule.left, rule.allowAny) && typeMatches(right, rule.right, rule.allowAny));
}

function typeMatches(type: Type, flags: TypeFlags, allowAny: boolean): boolean {
  if (allowAny && (type.flags & TypeFlags.AnyOrUnknown) !== 0) return true;
  return (type.flags & flags) !== 0;
}

function typeForRuleResult(rule: OperatorRule, environment: ControlCheckEnvironment): Type {
  if ((rule.result & TypeFlags.Boolean) !== 0) return environment.booleanType;
  if ((rule.result & TypeFlags.Number) !== 0) return environment.numberType;
  if ((rule.result & TypeFlags.String) !== 0) return environment.stringType;
  return environment.unknownType;
}

function isAssignmentOperator(kind: Kind): boolean {
  return kind === Kind.EqualsToken
    || kind === Kind.PlusEqualsToken
    || kind === Kind.MinusEqualsToken
    || kind === Kind.AsteriskEqualsToken
    || kind === Kind.SlashEqualsToken
    || kind === Kind.PercentEqualsToken
    || kind === Kind.AmpersandEqualsToken
    || kind === Kind.BarEqualsToken
    || kind === Kind.CaretEqualsToken;
}

function isEqualityOperator(kind: Kind): boolean {
  return kind === Kind.EqualsEqualsToken
    || kind === Kind.EqualsEqualsEqualsToken
    || kind === Kind.ExclamationEqualsToken
    || kind === Kind.ExclamationEqualsEqualsToken;
}

function getAssignmentKind(operator: Kind): AssignmentKind {
  if (operator === Kind.EqualsToken) return "definite";
  if (operator === Kind.PlusPlusToken || operator === Kind.MinusMinusToken) return "postfix";
  return isAssignmentOperator(operator) ? "compound" : "none";
}

function isAssignmentToReadonlyEntity(node: AstNode): boolean {
  const symbol = (node as { readonly symbol?: AstSymbol; readonly resolvedSymbol?: AstSymbol }).symbol
    ?? (node as { readonly resolvedSymbol?: AstSymbol }).resolvedSymbol;
  return symbol !== undefined && (Boolean((symbol as { readonly readonly?: boolean }).readonly) || ((symbol.flags ?? 0) & SymbolFlags.Property) !== 0 && symbolName(symbol).startsWith("readonly "));
}

function checkBlockLikeClause(node: AstNode, environment: ControlCheckEnvironment): StatementCheckResult {
  const statements = nodeArray(node, "statements");
  let exits = false;
  for (const statement of statements) exits = checkStatement(statement, environment, !exits).exits;
  return { node, reachable: true, exits, diagnostics: [] };
}

function withDiagnosticCapture(environment: ControlCheckEnvironment, diagnostics: string[]): ControlCheckEnvironment {
  return {
    ...environment,
    report: (node, message) => {
      diagnostics.push(message);
      environment.report?.(node, message);
    },
  };
}

function expressionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly expression?: AstNode }).expression;
}

function nodeArray(node: AstNode, field: "statements" | "caseBlock"): readonly AstNode[] {
  if (field === "statements") return (node as { readonly statements?: readonly AstNode[] }).statements ?? [];
  return (node as { readonly caseBlock?: { readonly clauses?: readonly AstNode[] } }).caseBlock?.clauses ?? [];
}

function nearestFunction(node: AstNode): AstNode | undefined {
  let current = node.parent;
  while (current !== undefined) {
    if (current.kind === Kind.FunctionDeclaration || current.kind === Kind.FunctionExpression || current.kind === Kind.ArrowFunction || current.kind === Kind.MethodDeclaration) return current;
    current = current.parent;
  }
  return undefined;
}

function hasEnclosingLabel(node: AstNode, label: string): boolean {
  let current = node.parent;
  while (current !== undefined) {
    if (current.kind === Kind.LabeledStatement && nodeText((current as { readonly label?: AstNode }).label) === label) return true;
    current = current.parent;
  }
  return false;
}

function numericLiteralValue(node: AstNode): number | undefined {
  const text = nodeText(node);
  const value = Number(text);
  return Number.isFinite(value) ? value : undefined;
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function operatorText(kind: Kind): string {
  return Kind[kind] ?? String(kind);
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}
