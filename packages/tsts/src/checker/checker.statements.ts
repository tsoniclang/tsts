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
  isDoStatement,
  isExpressionStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isIfStatement,
  isMissingDeclaration,
  isReturnStatement,
  isVariableStatement,
  isVariableDeclarationList,
  isWhileStatement,
  type Block,
  type Expression,
  type Statement,
  type TypeNode,
} from "../ast/index.js";
import {
  type Type,
  type CheckState,
  voidType,
  checkAssignable,
  getWidenedLiteralLikeTypeForContextualType,
  typeFromTypeNode,
  enterLocalAliasScope,
  exitLocalAliasScope,
} from "./checker.checkedtype.js";
import { inferExpression } from "./checker.expressions.js";
import { checkClassDeclaration, checkFunctionDeclaration } from "./checker.declarations.js";

export function checkStatements(statements: readonly Statement[], state: CheckState, expectedReturnType: Type | undefined): void {
  for (const statement of statements) {
    checkStatement(statement, state, expectedReturnType);
  }
}

export function checkStatement(statement: Statement, state: CheckState, expectedReturnType: Type | undefined): void {
  if (isVariableStatement(statement)) {
    // The binder already declared each name into its lexical scope; the var's
    // stored type is computed lazily (getTypeOfVariableOrParameterOrProperty).
    // The checker only validates an annotated initializer here.
    for (const declaration of statement.declarationList.declarations) {
      checkVariableDeclaration(declaration.type, declaration.initializer, state);
    }
    return;
  }
  if (isFunctionDeclaration(statement)) {
    checkFunctionDeclaration(statement, state);
    return;
  }
  if (isClassDeclaration(statement)) {
    checkClassDeclaration(statement, state);
    return;
  }
  if (isIfStatement(statement)) {
    inferExpression(statement.expression, state);
    checkStatement(statement.thenStatement, state, expectedReturnType);
    if (statement.elseStatement !== undefined) {
      checkStatement(statement.elseStatement, state, expectedReturnType);
    }
    return;
  }
  if (isWhileStatement(statement)) {
    inferExpression(statement.expression, state);
    checkStatement(statement.statement, state, expectedReturnType);
    return;
  }
  if (isDoStatement(statement)) {
    checkStatement(statement.statement, state, expectedReturnType);
    inferExpression(statement.expression, state);
    return;
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
    return;
  }
  if (isForInStatement(statement) || isForOfStatement(statement)) {
    checkForInitializer(statement.initializer, state);
    inferExpression(statement.expression, state);
    checkStatement(statement.statement, state, expectedReturnType);
    return;
  }
  if (isBreakStatement(statement) || isContinueStatement(statement)) {
    return;
  }
  if (isReturnStatement(statement)) {
    const actual = statement.expression === undefined ? voidType : inferExpression(statement.expression, state, expectedReturnType);
    if (expectedReturnType !== undefined) {
      checkAssignable(getWidenedLiteralLikeTypeForContextualType(actual, expectedReturnType, state), expectedReturnType, state);
    }
    return;
  }
  if (isExpressionStatement(statement)) {
    inferExpression(statement.expression, state);
    return;
  }
  if (isBlock(statement)) {
    checkBlock(statement, state, expectedReturnType);
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

export function checkForInitializer(initializer: Extract<Statement, { readonly kind: Kind.ForStatement }>["initializer"] | Extract<Statement, { readonly kind: Kind.ForInStatement }>["initializer"], state: CheckState): void {
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

export function checkBlock(block: Block, state: CheckState, expectedReturnType: Type | undefined): void {
  // Block-local `type` aliases shadow outer aliases within this block (their
  // full lexical scoping is deferred); register before checking so forward
  // references inside the block are shadowed too.
  const shadowed = enterLocalAliasScope(block.statements, state);
  checkStatements(block.statements, state, expectedReturnType);
  exitLocalAliasScope(shadowed, state);
}
