/**
 * Checker — statement checking.
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Ports the statement side of upstream `checker.go`
 * (`checkStatement`, `checkBlock`, loop/return handling).
 */

import {
  Kind,
  isBlock,
  isBreakStatement,
  isClassDeclaration,
  isContinueStatement,
  isCaseClause,
  isDebuggerStatement,
  isDoStatement,
  isEmptyStatement,
  isExpressionStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isIfStatement,
  isLabeledStatement,
  isMissingDeclaration,
  isReturnStatement,
  isSwitchStatement,
  isThrowStatement,
  isTryStatement,
  isTypeAliasDeclaration,
  isVariableStatement,
  isVariableDeclarationList,
  isWhileStatement,
  isWithStatement,
  type CaseOrDefaultClause,
  type Block,
  type Expression,
  type ForInitializer,
  type Node as AstNode,
  type Statement,
  type Symbol as AstSymbol,
  type TypeNode,
} from "../ast/index.js";
import {
  type Type,
  type CheckState,
  voidType,
  checkAssignable,
  getWidenedLiteralLikeTypeForContextualType,
  typeFromTypeNode,
  withNarrowedSymbolTypes,
} from "./checker.checkedtype.js";
import { inferExpression } from "./checker.expressions.js";
import { checkClassDeclaration, checkFunctionDeclaration } from "./checker.declarations.js";
import {
  mergeAlternativeNarrowings,
  narrowingsForCondition,
  narrowingsForSwitchCase,
  narrowingsForSwitchDefault,
  type NarrowingMap,
} from "./checker.narrowing.js";

interface StatementFlow {
  readonly exits: boolean;
  readonly fallthroughNarrowings?: NarrowingMap;
}

const continuesFlow: StatementFlow = { exits: false };
const exitsFlow: StatementFlow = { exits: true };

export function checkStatements(statements: readonly Statement[], state: CheckState, expectedReturnType: Type | undefined): boolean {
  let activeNarrowings: NarrowingMap = new Map<AstSymbol, Type>();
  for (const statement of statements) {
    const flow = withNarrowedSymbolTypes(state, activeNarrowings, () => checkStatement(statement, state, expectedReturnType));
    if (flow.exits) return true;
    if (flow.fallthroughNarrowings !== undefined) {
      activeNarrowings = combineNarrowings(activeNarrowings, flow.fallthroughNarrowings);
    }
  }
  return false;
}

export function checkStatement(statement: Statement, state: CheckState, expectedReturnType: Type | undefined): StatementFlow {
  if (isVariableStatement(statement)) {
    // The binder already declared each name into its lexical scope; the var's
    // stored type is computed lazily (getTypeOfVariableOrParameterOrProperty).
    // The checker only validates an annotated initializer here.
    for (const declaration of statement.declarationList.declarations) {
      checkVariableDeclaration(declaration.type, declaration.initializer, state);
    }
    return continuesFlow;
  }
  if (isFunctionDeclaration(statement)) {
    checkFunctionDeclaration(statement, state);
    return continuesFlow;
  }
  if (isClassDeclaration(statement)) {
    checkClassDeclaration(statement, state);
    return continuesFlow;
  }
  if (isTypeAliasDeclaration(statement)) {
    typeFromTypeNode(statement.type, state);
    return continuesFlow;
  }
  if (isIfStatement(statement)) {
    inferExpression(statement.expression, state);
    const whenTrue = narrowingsForCondition(statement.expression, state, true);
    const whenFalse = narrowingsForCondition(statement.expression, state, false);
    const thenFlow = withNarrowedSymbolTypes(state, whenTrue, () => {
      return checkStatement(statement.thenStatement, state, expectedReturnType);
    });
    const elseStatement = statement.elseStatement;
    if (elseStatement !== undefined) {
      const elseFlow = withNarrowedSymbolTypes(state, whenFalse, () => {
        return checkStatement(elseStatement, state, expectedReturnType);
      });
      if (thenFlow.exits && elseFlow.exits) return exitsFlow;
      if (thenFlow.exits && !elseFlow.exits) return { exits: false, fallthroughNarrowings: whenFalse };
      if (!thenFlow.exits && elseFlow.exits) return { exits: false, fallthroughNarrowings: whenTrue };
      return continuesFlow;
    }
    return thenFlow.exits ? { exits: false, fallthroughNarrowings: whenFalse } : continuesFlow;
  }
  if (isWithStatement(statement)) {
    inferExpression(statement.expression, state);
    return checkStatement(statement.statement, state, expectedReturnType);
  }
  if (isWhileStatement(statement)) {
    inferExpression(statement.expression, state);
    checkStatement(statement.statement, state, expectedReturnType);
    return continuesFlow;
  }
  if (isDoStatement(statement)) {
    checkStatement(statement.statement, state, expectedReturnType);
    inferExpression(statement.expression, state);
    return continuesFlow;
  }
  if (isForStatement(statement)) {
    if (statement.initializer !== undefined) {
      checkForInitializer(statement.initializer, state);
    }
    if (statement.condition !== undefined) {
      inferExpression(statement.condition, state);
    }
    if (statement.incrementor !== undefined) {
      inferExpression(statement.incrementor, state);
    }
    checkStatement(statement.statement, state, expectedReturnType);
    return continuesFlow;
  }
  if (isForInStatement(statement) || isForOfStatement(statement)) {
    checkForInitializer(statement.initializer, state);
    inferExpression(statement.expression, state);
    checkStatement(statement.statement, state, expectedReturnType);
    return continuesFlow;
  }
  if (isSwitchStatement(statement)) {
    checkSwitchStatement(statement.expression, statement.caseBlock.clauses, state, expectedReturnType);
    return continuesFlow;
  }
  if (isThrowStatement(statement)) {
    inferExpression(statement.expression, state);
    return exitsFlow;
  }
  if (isTryStatement(statement)) {
    return checkTryStatement(statement.tryBlock, statement.catchClause, statement.finallyBlock, state, expectedReturnType);
  }
  if (isLabeledStatement(statement)) {
    return checkStatement(statement.statement, state, expectedReturnType);
  }
  if (isEmptyStatement(statement) || isDebuggerStatement(statement)) {
    return continuesFlow;
  }
  if (isBreakStatement(statement) || isContinueStatement(statement)) {
    return exitsFlow;
  }
  if (isReturnStatement(statement)) {
    const actual = statement.expression === undefined ? voidType : inferExpression(statement.expression, state, expectedReturnType);
    if (expectedReturnType !== undefined) {
      checkAssignable(getWidenedLiteralLikeTypeForContextualType(actual, expectedReturnType, state), expectedReturnType, state);
    }
    return exitsFlow;
  }
  if (isExpressionStatement(statement)) {
    inferExpression(statement.expression, state);
    return continuesFlow;
  }
  if (isBlock(statement)) {
    return checkBlock(statement, state, expectedReturnType) ? exitsFlow : continuesFlow;
  }
  return continuesFlow;
}

export function checkExpressionStatement(node: Statement, state: CheckState): void {
  const expression = (node as { readonly expression?: Expression }).expression;
  if (expression !== undefined) inferExpression(expression, state);
}

export function checkIfStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isIfStatement(node)) return;
  const conditionType = inferExpression(node.expression, state);
  checkTestingKnownTruthyCallableOrAwaitableOrEnumMemberType(node.expression, conditionType, node.thenStatement, state);
  checkStatement(node.thenStatement, state, expectedReturnType);
  if (isEmptyStatement(node.thenStatement)) state.diagnostics.push({ message: "The_body_of_an_if_statement_cannot_be_the_empty_statement" });
  if (node.elseStatement !== undefined) checkStatement(node.elseStatement, state, expectedReturnType);
}

export function checkTestingKnownTruthyCallableOrAwaitableOrEnumMemberType(
  conditionExpression: Expression,
  conditionType: Type,
  body: Statement | undefined,
  state: CheckState,
): void {
  checkTestingKnownTruthyTypes(conditionExpression, conditionType, body, state);
}

export function checkTestingKnownTruthyTypes(
  conditionExpression: Expression,
  conditionType: Type,
  body: Statement | undefined,
  state: CheckState,
): void {
  let current: Expression = skipParentheses(conditionExpression);
  checkTestingKnownTruthyType(current, conditionType, body, state);
  while (current.kind === Kind.BinaryExpression) {
    const operatorKind = (current as { readonly operatorToken?: { readonly kind?: Kind }; readonly left?: Expression }).operatorToken?.kind;
    if (operatorKind !== Kind.BarBarToken && operatorKind !== Kind.QuestionQuestionToken) break;
    const left = (current as { readonly left?: Expression }).left;
    if (left === undefined) break;
    current = skipParentheses(left);
    checkTestingKnownTruthyType(current, conditionType, body, state);
  }
}

export function checkTestingKnownTruthyType(
  conditionExpression: Expression,
  conditionType: Type,
  body: Statement | undefined,
  state: CheckState,
): void {
  const location = getTruthyCheckLocation(conditionExpression);
  if (isModuleExportsAccessExpression(location)) return;
  if (!typeKnownTruthy(conditionType)) return;
  const testedName = identifierLikeName(location);
  if (testedName.length === 0) return;
  const usedInChain = parentOf(conditionExpression)?.kind === Kind.BinaryExpression
    && isSymbolUsedInBinaryExpressionChain(parentOf(conditionExpression)!, testedName);
  const usedInBody = body !== undefined && isSymbolUsedInConditionBody(conditionExpression, body, location, testedName);
  if (!usedInChain && !usedInBody) state.diagnostics.push({ message: "This_condition_will_always_return_true_since_this_function_is_always_defined_Did_you_mean_to_call_it_instead" });
}

export function isSymbolUsedInBinaryExpressionChain(node: AstNode, testedName: string): boolean {
  let current: AstNode | undefined = node;
  while (current?.kind === Kind.BinaryExpression) {
    const right = (current as { readonly right?: AstNode }).right;
    if (right !== undefined && childNodes(right).some(child => identifierLikeName(child) === testedName)) return true;
    const operatorKind = (current as { readonly operatorToken?: { readonly kind?: Kind } }).operatorToken?.kind;
    if (operatorKind !== Kind.AmpersandAmpersandToken) break;
    current = parentOf(current);
  }
  return false;
}

export function isSymbolUsedInConditionBody(
  _expression: AstNode,
  body: AstNode,
  _testedNode: AstNode,
  testedName: string,
): boolean {
  return childNodes(body).some(child => identifierLikeName(child) === testedName);
}

export function checkDoStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isDoStatement(node)) return;
  checkStatement(node.statement, state, expectedReturnType);
  inferExpression(node.expression, state);
}

export function checkWhileStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isWhileStatement(node)) return;
  inferExpression(node.expression, state);
  checkStatement(node.statement, state, expectedReturnType);
}

export function checkForStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isForStatement(node)) return;
  checkForInitializer(node.initializer, state);
  if (node.condition !== undefined) inferExpression(node.condition, state);
  if (node.incrementor !== undefined) inferExpression(node.incrementor, state);
  checkStatement(node.statement, state, expectedReturnType);
}

export function checkForInStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isForInStatement(node)) return;
  checkForInitializer(node.initializer, state);
  const rightType = inferExpression(node.expression, state);
  getIndexTypeOrString(rightType);
  checkStatement(node.statement, state, expectedReturnType);
}

export function getIndexTypeOrString(type: Type): Type {
  return type;
}

export function checkForOfStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isForOfStatement(node)) return;
  checkForInitializer(node.initializer, state);
  inferExpression(node.expression, state);
  checkStatement(node.statement, state, expectedReturnType);
}

export function checkBreakOrContinueStatement(node: Statement, state: CheckState): void {
  if (!isBreakStatement(node) && !isContinueStatement(node)) return;
  if (!hasBreakOrContinueTarget(node)) state.diagnostics.push({ message: "A_break_or_continue_statement_can_only_jump_to_a_label_of_an_enclosing_statement" });
}

export function checkReturnStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isReturnStatement(node)) return;
  const expressionType = node.expression === undefined ? voidType : inferExpression(node.expression, state, expectedReturnType);
  checkReturnExpression(containingFunctionLike(node), expectedReturnType, node, node.expression, expressionType, false, state);
}

export function checkReturnExpression(
  _container: AstNode | undefined,
  unwrappedReturnType: Type | undefined,
  _node: AstNode,
  expression: AstNode | undefined,
  expressionType: Type,
  inConditionalExpression: boolean,
  state: CheckState,
): void {
  const conditional = expression === undefined ? undefined : skipParentheses(expression);
  if (conditional?.kind === Kind.ConditionalExpression) {
    const whenTrue = (conditional as { readonly whenTrue?: Expression }).whenTrue;
    const whenFalse = (conditional as { readonly whenFalse?: Expression }).whenFalse;
    if (whenTrue !== undefined) checkReturnExpression(undefined, unwrappedReturnType, whenTrue, whenTrue, inferExpression(whenTrue, state), true, state);
    if (whenFalse !== undefined) checkReturnExpression(undefined, unwrappedReturnType, whenFalse, whenFalse, inferExpression(whenFalse, state), true, state);
    return;
  }
  void inConditionalExpression;
  if (unwrappedReturnType !== undefined) {
    checkAssignable(getWidenedLiteralLikeTypeForContextualType(expressionType, unwrappedReturnType, state), unwrappedReturnType, state);
  }
}

export function checkWithStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isWithStatement(node)) return;
  inferExpression(node.expression, state);
  state.diagnostics.push({ message: "The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any" });
  checkStatement(node.statement, state, expectedReturnType);
}

export function checkLabeledStatement(node: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (!isLabeledStatement(node)) return;
  if (hasDuplicateLabel(node)) state.diagnostics.push({ message: "Duplicate_label_0" });
  checkStatement(node.statement, state, expectedReturnType);
}

export function checkThrowStatement(node: Statement, state: CheckState): void {
  if (!isThrowStatement(node)) return;
  inferExpression(node.expression, state);
}

export function checkCatchClause(node: AstNode, state: CheckState, expectedReturnType: Type | undefined): void {
  const variable = (node as { readonly variableDeclaration?: { readonly type?: TypeNode } }).variableDeclaration;
  if (variable?.type !== undefined) typeFromTypeNode(variable.type, state);
  const block = (node as { readonly block?: Block }).block;
  if (block !== undefined) checkBlock(block, state, expectedReturnType);
}

export function checkBindingElement(node: AstNode, state: CheckState): void {
  const typeNode = (node as { readonly type?: TypeNode }).type;
  const initializer = (node as { readonly initializer?: Expression }).initializer;
  checkVariableDeclaration(typeNode, initializer, state);
}

export function checkVariableStatement(node: Statement, state: CheckState): void {
  if (!isVariableStatement(node)) return;
  checkVariableDeclarationList(node.declarationList, state);
}

export function checkVariableDeclarationList(node: AstNode, state: CheckState): void {
  const declarations = (node as { readonly declarations?: readonly AstNode[] }).declarations ?? [];
  const seen = new Map<string, AstNode>();
  for (const declaration of declarations) {
    const name = declarationName(declaration);
    if (name.length > 0 && seen.has(name)) {
      errorNextVariableOrPropertyDeclarationMustHaveSameType(seen.get(name)!, declaration, state);
    }
    if (name.length > 0) seen.set(name, declaration);
    checkBindingElement(declaration, state);
  }
  checkVarDeclaredNamesNotShadowed(declarations, state);
}

export function errorNextVariableOrPropertyDeclarationMustHaveSameType(
  _firstDeclaration: AstNode,
  nextDeclaration: AstNode,
  state: CheckState,
): void {
  state.diagnostics.push({ message: `Subsequent_variable_declarations_must_have_the_same_type: ${declarationName(nextDeclaration)}` });
}

export function checkVarDeclaredNamesNotShadowed(declarations: readonly AstNode[], state: CheckState): void {
  const blockScoped = new Set<string>();
  for (const declaration of declarations) {
    const name = declarationName(declaration);
    if (name.length === 0) continue;
    if (blockScoped.has(name)) state.diagnostics.push({ message: `Cannot_redeclare_block_scoped_variable_0: ${name}` });
    if (isBlockScopedDeclaration(declaration)) blockScoped.add(name);
  }
}

// Validate a variable declaration's annotated initializer
// (checkVariableLikeDeclaration's initializer assignability check). The bound
// name's stored type is no longer set here — it is derived on demand from the
// binder symbol via getTypeOfVariableOrParameterOrProperty.
function checkVariableDeclaration(typeNode: TypeNode | undefined, initializer: Expression | undefined, state: CheckState): void {
  const declaredType = typeNode === undefined ? undefined : typeFromTypeNode(typeNode, state);
  const initializerType = initializer === undefined ? undefined : inferExpression(initializer, state, declaredType);
  if (declaredType !== undefined && initializerType !== undefined) {
    checkAssignable(getWidenedLiteralLikeTypeForContextualType(initializerType, declaredType, state), declaredType, state);
  }
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function skipParentheses<T extends AstNode>(node: T): T {
  let current: AstNode = node;
  while (current.kind === Kind.ParenthesizedExpression) {
    const expression = (current as { readonly expression?: AstNode }).expression;
    if (expression === undefined) break;
    current = expression;
  }
  return current as T;
}

function getTruthyCheckLocation(expression: AstNode): AstNode {
  const skipped = skipParentheses(expression);
  if (skipped.kind === Kind.BinaryExpression) return (skipped as { readonly right?: AstNode }).right ?? skipped;
  return skipped;
}

function typeKnownTruthy(type: Type): boolean {
  const flags = type.flags ?? 0;
  return (flags & (1 << 18)) === 0 && String((type as { readonly intrinsicName?: string }).intrinsicName ?? "") !== "undefined";
}

function identifierLikeName(node: AstNode | undefined): string {
  if (node === undefined) return "";
  if (node.kind === Kind.Identifier) return (node as { readonly text?: string }).text ?? "";
  if (node.kind === Kind.PropertyAccessExpression) return identifierLikeName((node as { readonly name?: AstNode }).name);
  return "";
}

function isModuleExportsAccessExpression(node: AstNode): boolean {
  return node.kind === Kind.PropertyAccessExpression
    && identifierLikeName((node as { readonly expression?: AstNode }).expression) === "module"
    && identifierLikeName((node as { readonly name?: AstNode }).name) === "exports";
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

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function isNodeList(value: unknown): value is { readonly nodes: readonly unknown[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes);
}

function hasBreakOrContinueTarget(node: AstNode): boolean {
  const isBreak = node.kind === Kind.BreakStatement;
  for (let current = parentOf(node); current !== undefined; current = parentOf(current)) {
    if (current.kind === Kind.FunctionDeclaration || current.kind === Kind.FunctionExpression || current.kind === Kind.ArrowFunction) return false;
    if (current.kind === Kind.ForStatement || current.kind === Kind.ForInStatement || current.kind === Kind.ForOfStatement || current.kind === Kind.WhileStatement || current.kind === Kind.DoStatement) return true;
    if (isBreak && current.kind === Kind.SwitchStatement) return true;
  }
  return false;
}

function containingFunctionLike(node: AstNode): AstNode | undefined {
  for (let current = parentOf(node); current !== undefined; current = parentOf(current)) {
    if (current.kind === Kind.FunctionDeclaration
      || current.kind === Kind.FunctionExpression
      || current.kind === Kind.ArrowFunction
      || current.kind === Kind.MethodDeclaration
      || current.kind === Kind.Constructor
      || current.kind === Kind.GetAccessor
      || current.kind === Kind.SetAccessor
      || current.kind === Kind.ClassStaticBlockDeclaration) return current;
  }
  return undefined;
}

function hasDuplicateLabel(node: AstNode): boolean {
  const label = (node as { readonly label?: { readonly text?: string } }).label?.text;
  if (label === undefined) return false;
  for (let current = parentOf(node); current !== undefined; current = parentOf(current)) {
    if (current.kind === Kind.LabeledStatement && (current as { readonly label?: { readonly text?: string } }).label?.text === label) return true;
    if (current.kind === Kind.FunctionDeclaration || current.kind === Kind.FunctionExpression || current.kind === Kind.ArrowFunction) return false;
  }
  return false;
}

function declarationName(node: AstNode): string {
  const name = (node as { readonly name?: { readonly text?: string } }).name;
  return name?.text ?? "";
}

function isBlockScopedDeclaration(node: AstNode): boolean {
  const parent = parentOf(node);
  const flags = (parent as { readonly flags?: number } | undefined)?.flags ?? 0;
  return (flags & ((1 << 0) | (1 << 1) | (1 << 2))) !== 0;
}

export function checkForInitializer(initializer: ForInitializer | undefined, state: CheckState): void {
  if (initializer === undefined) {
    return;
  }
  if (isVariableDeclarationList(initializer)) {
    for (const declaration of initializer.declarations) {
      checkVariableDeclaration(declaration.type, declaration.initializer, state);
    }
    return;
  }
  if (isMissingDeclaration(initializer)) {
    return;
  }
  inferExpression(initializer, state);
}

export function checkBlock(block: Block, state: CheckState, expectedReturnType: Type | undefined): boolean {
  return checkStatements(block.statements, state, expectedReturnType);
}

function checkSwitchStatement(
  expression: Expression,
  clauses: readonly CaseOrDefaultClause[],
  state: CheckState,
  expectedReturnType: Type | undefined,
): void {
  inferExpression(expression, state);
  const caseExpressions = clauses.filter(isCaseClause).map((clause) => clause.expression);
  let fallthroughNarrowings: NarrowingMap = new Map();
  for (const clause of clauses) {
    const ownNarrowings = isCaseClause(clause)
      ? narrowingsForSwitchCase(expression, clause.expression, state)
      : narrowingsForSwitchDefault(expression, caseExpressions, state);
    if (isCaseClause(clause)) {
      inferExpression(clause.expression, state);
    }
    const clauseNarrowings = mergeAlternativeNarrowings(fallthroughNarrowings, ownNarrowings, state);
    const exits = withNarrowedSymbolTypes(state, clauseNarrowings, () => checkStatements(clause.statements, state, expectedReturnType));
    fallthroughNarrowings = exits ? new Map() : clauseNarrowings;
  }
}

function checkTryStatement(
  tryBlock: Block,
  catchClause: { readonly variableDeclaration?: { readonly type?: TypeNode }; readonly block: Block } | undefined,
  finallyBlock: Block | undefined,
  state: CheckState,
  expectedReturnType: Type | undefined,
): StatementFlow {
  const tryExits = checkBlock(tryBlock, state, expectedReturnType);
  let catchExits = false;
  if (catchClause !== undefined) {
    if (catchClause.variableDeclaration?.type !== undefined) {
      typeFromTypeNode(catchClause.variableDeclaration.type, state);
    }
    catchExits = checkBlock(catchClause.block, state, expectedReturnType);
  }
  const finallyExits = finallyBlock === undefined ? false : checkBlock(finallyBlock, state, expectedReturnType);
  if (finallyExits) return exitsFlow;
  if (catchClause !== undefined && tryExits && catchExits) return exitsFlow;
  return continuesFlow;
}

function combineNarrowings(left: ReadonlyMap<unknown, Type>, right: NarrowingMap): Map<AstSymbol, Type> {
  const combined = new Map(left as ReadonlyMap<AstSymbol, Type>);
  for (const [symbol, type] of right) combined.set(symbol, type);
  return combined;
}
