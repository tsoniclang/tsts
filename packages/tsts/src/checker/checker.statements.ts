/**
 * Checker — statement checking.
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Ports the statement side of upstream `checker.go`
 * (`checkStatement`, `checkBlock`, loop/return handling).
 */

import {
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
