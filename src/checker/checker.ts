import {
  Kind,
  isArrowFunction,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isClassDeclaration,
  isConstructorDeclaration,
  isExpressionStatement,
  isFunctionDeclaration,
  isIdentifier,
  isIfStatement,
  isKeywordTypeNode,
  isMethodDeclaration,
  isNumericLiteral,
  isParenthesizedExpression,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isReturnStatement,
  isStringLiteral,
  isVariableStatement,
  type Block,
  type ArrowFunction,
  type ClassDeclaration,
  type ClassElement,
  type ConciseBody,
  type Expression,
  type FunctionDeclaration,
  type SourceFile,
  type Statement,
  type TypeNode,
} from "../ast/index.js";
import type { Program, ProgramDiagnostic } from "../program/index.js";

type PrimitiveTypeName = "any" | "boolean" | "number" | "string" | "unknown" | "void";

type CheckedType =
  | { readonly kind: PrimitiveTypeName }
  | { readonly kind: "function"; readonly returnType: CheckedType };

export interface CheckDiagnostic {
  readonly message: string;
}

export interface CheckResult {
  readonly diagnostics: readonly CheckDiagnostic[];
}

interface CheckState {
  readonly diagnostics: CheckDiagnostic[];
}

type TypeEnvironment = Map<string, CheckedType>;

const anyType: CheckedType = { kind: "any" };
const unknownType: CheckedType = { kind: "unknown" };
const numberType: CheckedType = { kind: "number" };
const stringType: CheckedType = { kind: "string" };
const voidType: CheckedType = { kind: "void" };

export function checkSourceFile(sourceFile: SourceFile): CheckResult {
  const state: CheckState = { diagnostics: [] };
  checkStatements(sourceFile.statements, state, new Map(), undefined);
  return { diagnostics: state.diagnostics };
}

export function checkProgram(program: Program): readonly ProgramDiagnostic[] {
  const diagnostics: ProgramDiagnostic[] = [...program.diagnostics];
  if (diagnostics.length > 0) {
    return diagnostics;
  }
  for (const sourceFile of program.sourceFiles) {
    const result = checkSourceFile(sourceFile.sourceFile);
    diagnostics.push(...result.diagnostics.map(diagnostic => ({
      fileName: sourceFile.fileName,
      message: diagnostic.message,
    })));
  }
  return diagnostics;
}

function checkStatements(statements: readonly Statement[], state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined): void {
  for (const statement of statements) {
    checkStatement(statement, state, environment, expectedReturnType);
  }
}

function checkStatement(statement: Statement, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined): void {
  if (isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      const declaredType = declaration.type === undefined ? undefined : typeFromTypeNode(declaration.type);
      const initializerType = declaration.initializer === undefined ? undefined : inferExpression(declaration.initializer, state, environment);
      if (declaredType !== undefined && initializerType !== undefined) {
        checkAssignable(initializerType, declaredType, state);
      }
      if (isIdentifier(declaration.name)) {
        environment.set(declaration.name.text, declaredType ?? initializerType ?? unknownType);
      }
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
  if (isReturnStatement(statement)) {
    const actual = statement.expression === undefined ? voidType : inferExpression(statement.expression, state, environment);
    if (expectedReturnType !== undefined) {
      checkAssignable(actual, expectedReturnType, state);
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

function checkClassDeclaration(classDeclaration: ClassDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (classDeclaration.name !== undefined) {
    environment.set(classDeclaration.name.text, anyType);
  }
  const classEnvironment = new Map(environment);
  for (const member of classDeclaration.members) {
    checkClassElement(member, state, classEnvironment);
  }
}

function checkClassElement(member: ClassElement, state: CheckState, environment: TypeEnvironment): void {
  if (isConstructorDeclaration(member) || isMethodDeclaration(member)) {
    const memberEnvironment = new Map(environment);
    for (const parameter of member.parameters) {
      if (isIdentifier(parameter.name)) {
        memberEnvironment.set(parameter.name.text, parameter.type === undefined ? unknownType : typeFromTypeNode(parameter.type));
      }
    }
    if (member.body !== undefined) {
      checkBlock(member.body, state, memberEnvironment, member.type === undefined ? undefined : typeFromTypeNode(member.type));
    }
    return;
  }
  if (isPropertyDeclaration(member) && member.initializer !== undefined) {
    inferExpression(member.initializer, state, environment);
  }
}

function checkFunctionDeclaration(functionDeclaration: FunctionDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (functionDeclaration.name !== undefined) {
    environment.set(functionDeclaration.name.text, anyType);
  }
  const functionEnvironment = new Map(environment);
  for (const parameter of functionDeclaration.parameters) {
    if (isIdentifier(parameter.name)) {
      functionEnvironment.set(parameter.name.text, parameter.type === undefined ? unknownType : typeFromTypeNode(parameter.type));
    }
  }
  if (functionDeclaration.body !== undefined) {
    checkBlock(functionDeclaration.body, state, functionEnvironment, functionDeclaration.type === undefined ? undefined : typeFromTypeNode(functionDeclaration.type));
  }
}

function checkBlock(block: Block, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined): void {
  checkStatements(block.statements, state, new Map(environment), expectedReturnType);
}

function inferExpression(expression: Expression, state: CheckState, environment: TypeEnvironment): CheckedType {
  if (isNumericLiteral(expression)) {
    return numberType;
  }
  if (isStringLiteral(expression)) {
    return stringType;
  }
  if (isIdentifier(expression)) {
    return environment.get(expression.text) ?? unknownType;
  }
  if (isParenthesizedExpression(expression)) {
    return inferExpression(expression.expression, state, environment);
  }
  if (isArrowFunction(expression)) {
    return inferArrowFunction(expression, state, environment);
  }
  if (isBinaryExpression(expression)) {
    const left = inferExpression(expression.left, state, environment);
    const right = inferExpression(expression.right, state, environment);
    if (expression.operatorToken.kind === Kind.PlusToken && (left.kind === "string" || right.kind === "string")) {
      return stringType;
    }
    if (left.kind === "number" && right.kind === "number") {
      return numberType;
    }
    return unknownType;
  }
  if (isPropertyAccessExpression(expression)) {
    return inferPropertyAccess(expression.expression, expression.name.text, state, environment);
  }
  if (isCallExpression(expression)) {
    const calleeType = inferExpression(expression.expression, state, environment);
    for (const argument of expression.arguments) {
      inferExpression(argument, state, environment);
    }
    if (calleeType.kind === "any") {
      return anyType;
    }
    return calleeType.kind === "function" ? calleeType.returnType : unknownType;
  }
  return unknownType;
}

function inferArrowFunction(arrowFunction: ArrowFunction, state: CheckState, environment: TypeEnvironment): CheckedType {
  const arrowEnvironment = new Map(environment);
  for (const parameter of arrowFunction.parameters) {
    if (isIdentifier(parameter.name)) {
      arrowEnvironment.set(parameter.name.text, parameter.type === undefined ? unknownType : typeFromTypeNode(parameter.type));
    }
  }
  const declaredReturnType = arrowFunction.type === undefined ? undefined : typeFromTypeNode(arrowFunction.type);
  const inferredReturnType = inferConciseBody(arrowFunction.body, state, arrowEnvironment, declaredReturnType);
  return { kind: "function", returnType: declaredReturnType ?? inferredReturnType };
}

function inferConciseBody(body: ConciseBody, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined): CheckedType {
  if (isBlock(body)) {
    checkBlock(body, state, environment, expectedReturnType);
    return expectedReturnType ?? unknownType;
  }
  const bodyType = inferExpression(body, state, environment);
  if (expectedReturnType !== undefined) {
    checkAssignable(bodyType, expectedReturnType, state);
  }
  return bodyType;
}

function inferPropertyAccess(expression: Expression, propertyName: string, state: CheckState, environment: TypeEnvironment): CheckedType {
  const receiverType = inferExpression(expression, state, environment);
  if (receiverType.kind === "number" && propertyName === "toFixed") {
    return { kind: "function", returnType: stringType };
  }
  if (receiverType.kind === "string" && propertyName === "length") {
    return numberType;
  }
  if (receiverType.kind !== "any" && receiverType.kind !== "unknown" && receiverType.kind !== "function") {
    state.diagnostics.push({
      message: `Property '${propertyName}' does not exist on type '${displayType(receiverType)}'.`,
    });
    return anyType;
  }
  return unknownType;
}

function typeFromTypeNode(type: TypeNode): CheckedType {
  if (isKeywordTypeNode(type)) {
    switch (type.kind) {
      case Kind.AnyKeyword:
        return anyType;
      case Kind.BooleanKeyword:
        return { kind: "boolean" };
      case Kind.NumberKeyword:
        return numberType;
      case Kind.StringKeyword:
        return stringType;
      case Kind.VoidKeyword:
        return voidType;
      case Kind.UnknownKeyword:
        return unknownType;
      default:
        return unknownType;
    }
  }
  return unknownType;
}

function checkAssignable(actual: CheckedType, expected: CheckedType, state: CheckState): void {
  if (expected.kind === "any" || actual.kind === "any" || expected.kind === "unknown") {
    return;
  }
  if (actual.kind !== expected.kind) {
    state.diagnostics.push({
      message: `Type '${displayType(actual)}' is not assignable to type '${displayType(expected)}'.`,
    });
  }
}

function displayType(type: CheckedType): string {
  return type.kind === "function" ? "function" : type.kind;
}
