/**
 * Checker — declaration checking (class / function members).
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Ports the declaration side of upstream `checker.go`
 * (`checkClassDeclaration`, `checkFunctionDeclaration`, members).
 */

import {
  isConstructorDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  type ClassDeclaration,
  type ClassElement,
  type FunctionDeclaration,
} from "../ast/index.js";
import {
  type CheckState,
  type TypeEnvironment,
  anyType,
  unresolvedType,
  setBindingNameType,
  typeFromTypeNode,
} from "./checker.checkedtype.js";
import { inferExpression } from "./checker.expressions.js";
import { checkBlock } from "./checker.statements.js";

export function checkClassDeclaration(classDeclaration: ClassDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (classDeclaration.name !== undefined) {
    environment.set(classDeclaration.name.text, anyType);
  }
  const classEnvironment = new Map(environment);
  for (const member of classDeclaration.members) {
    checkClassElement(member, state, classEnvironment);
  }
}

export function checkClassElement(member: ClassElement, state: CheckState, environment: TypeEnvironment): void {
  if (isConstructorDeclaration(member) || isMethodDeclaration(member)) {
    const memberEnvironment = new Map(environment);
    for (const parameter of member.parameters) {
      setBindingNameType(parameter.name, parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, state), memberEnvironment);
    }
    if (member.body !== undefined) {
      checkBlock(member.body, state, memberEnvironment, member.type === undefined ? undefined : typeFromTypeNode(member.type, state));
    }
    return;
  }
  if (isPropertyDeclaration(member) && member.initializer !== undefined) {
    inferExpression(member.initializer, state, environment);
  }
}

export function checkFunctionDeclaration(functionDeclaration: FunctionDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (functionDeclaration.name !== undefined) {
    environment.set(functionDeclaration.name.text, anyType);
  }
  const functionEnvironment = new Map(environment);
  for (const parameter of functionDeclaration.parameters) {
    setBindingNameType(parameter.name, parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, state), functionEnvironment);
  }
  if (functionDeclaration.body !== undefined) {
    checkBlock(functionDeclaration.body, state, functionEnvironment, functionDeclaration.type === undefined ? undefined : typeFromTypeNode(functionDeclaration.type, state));
  }
}
