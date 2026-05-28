/**
 * Checker — statement checking.
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Ports the statement side of upstream `checker.go`
 * (`checkStatement`, `checkBlock`, loop/return handling).
 */

import {
  Kind,
  NodeFlags,
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
  type Statement,
  type VariableDeclarationList,
} from "../ast/index.js";
import {
  type Type,
  type CheckState,
  type TypeEnvironment,
  unresolvedType,
  voidType,
  checkAssignable,
  getWidenedType,
  getWidenedLiteralLikeTypeForContextualType,
  getRegularTypeOfLiteralType,
  getRegularTypeOfObjectLiteral,
  setBindingNameType,
  typeFromTypeNode,
} from "./checker.checkedtype.js";
import { inferExpression } from "./checker.expressions.js";
import { checkClassDeclaration, checkFunctionDeclaration } from "./checker.declarations.js";

// Inferred (no-annotation) binding type: `const` preserves the initializer's
// literal type, `let`/`var` widen it — mirrors TS-Go
// getWidenedTypeForVariableLikeDeclaration, which widens only for non-const
// block-scoped declarations. Explicit annotations bypass this (handled by the
// caller's `declaredType ?? ...`).
function inferredBindingType(initializerType: Type, declarationList: VariableDeclarationList, state: CheckState): Type {
  const literalAdjusted = (declarationList.flags & NodeFlags.Const) !== 0
    ? getRegularTypeOfLiteralType(initializerType, state)
    : getWidenedType(initializerType, state);
  // The stored type drops object-literal freshness (excess only applies to a
  // direct fresh literal at the assignment site, not to a stored variable).
  return getRegularTypeOfObjectLiteral(literalAdjusted, state);
}

export function checkStatements(statements: readonly Statement[], state: CheckState, environment: TypeEnvironment, expectedReturnType: Type | undefined): void {
  for (const statement of statements) {
    checkStatement(statement, state, environment, expectedReturnType);
  }
}

export function checkStatement(statement: Statement, state: CheckState, environment: TypeEnvironment, expectedReturnType: Type | undefined): void {
  if (isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      const declaredType = declaration.type === undefined ? undefined : typeFromTypeNode(declaration.type, state);
      const initializerType = declaration.initializer === undefined ? undefined : inferExpression(declaration.initializer, state, environment, declaredType);
      if (declaredType !== undefined && initializerType !== undefined) {
        checkAssignable(getWidenedLiteralLikeTypeForContextualType(initializerType, declaredType, state), declaredType, state);
      }
      const boundType = declaredType ?? (initializerType !== undefined ? inferredBindingType(initializerType, statement.declarationList, state) : unresolvedType);
      setBindingNameType(declaration.name, boundType, environment);
    }
    return;
  }
  if (isFunctionDeclaration(statement)) {
    checkFunctionDeclaration(statement, state, environment);
    return;
  }
  if (isClassDeclaration(statement)) {
    checkClassDeclaration(statement, state, environment);
    return;
  }
  if (isIfStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    checkStatement(statement.thenStatement, state, new Map(environment), expectedReturnType);
    if (statement.elseStatement !== undefined) {
      checkStatement(statement.elseStatement, state, new Map(environment), expectedReturnType);
    }
    return;
  }
  if (isWhileStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    checkStatement(statement.statement, state, new Map(environment), expectedReturnType);
    return;
  }
  if (isDoStatement(statement)) {
    checkStatement(statement.statement, state, new Map(environment), expectedReturnType);
    inferExpression(statement.expression, state, environment);
    return;
  }
  if (isForStatement(statement)) {
    const loopEnvironment = new Map(environment);
    if (statement.initializer !== undefined) {
      checkForInitializer(statement.initializer, state, loopEnvironment);
    }
    if (statement.condition !== undefined) {
      inferExpression(statement.condition, state, loopEnvironment);
    }
    if (statement.incrementor !== undefined) {
      inferExpression(statement.incrementor, state, loopEnvironment);
    }
    checkStatement(statement.statement, state, loopEnvironment, expectedReturnType);
    return;
  }
  if (isForInStatement(statement) || isForOfStatement(statement)) {
    const loopEnvironment = new Map(environment);
    checkForInitializer(statement.initializer, state, loopEnvironment);
    inferExpression(statement.expression, state, loopEnvironment);
    checkStatement(statement.statement, state, loopEnvironment, expectedReturnType);
    return;
  }
  if (isBreakStatement(statement) || isContinueStatement(statement)) {
    return;
  }
  if (isReturnStatement(statement)) {
    const actual = statement.expression === undefined ? voidType : inferExpression(statement.expression, state, environment, expectedReturnType);
    if (expectedReturnType !== undefined) {
      checkAssignable(getWidenedLiteralLikeTypeForContextualType(actual, expectedReturnType, state), expectedReturnType, state);
    }
    return;
  }
  if (isExpressionStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    return;
  }
  if (isBlock(statement)) {
    checkBlock(statement, state, environment, expectedReturnType);
  }
}

export function checkForInitializer(initializer: Extract<Statement, { readonly kind: Kind.ForStatement }>["initializer"] | Extract<Statement, { readonly kind: Kind.ForInStatement }>["initializer"], state: CheckState, environment: TypeEnvironment): void {
  if (initializer === undefined) {
    return;
  }
  if (isVariableDeclarationList(initializer)) {
    for (const declaration of initializer.declarations) {
      const declaredType = declaration.type === undefined ? undefined : typeFromTypeNode(declaration.type, state);
      const initializerType = declaration.initializer === undefined ? undefined : inferExpression(declaration.initializer, state, environment, declaredType);
      if (declaredType !== undefined && initializerType !== undefined) {
        checkAssignable(getWidenedLiteralLikeTypeForContextualType(initializerType, declaredType, state), declaredType, state);
      }
      const boundType = declaredType ?? (initializerType !== undefined ? inferredBindingType(initializerType, initializer, state) : unresolvedType);
      setBindingNameType(declaration.name, boundType, environment);
    }
    return;
  }
  if (isMissingDeclaration(initializer)) {
    return;
  }
  inferExpression(initializer, state, environment);
}

export function checkBlock(block: Block, state: CheckState, environment: TypeEnvironment, expectedReturnType: Type | undefined): void {
  checkStatements(block.statements, state, new Map(environment), expectedReturnType);
}
