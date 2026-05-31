/**
 * Checker — declaration checking (class / function members).
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Ports the declaration side of upstream `checker.go`
 * (`checkClassDeclaration`, `checkFunctionDeclaration`, members).
 */

import {
  Kind,
  isConstructorDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  type ClassDeclaration,
  type ClassElement,
  type FunctionDeclaration,
  type ParameterDeclaration,
} from "../ast/index.js";
import {
  type CheckState,
  checkAssignable,
  typeFromClassOrInterfaceDeclaration,
  typeFromExpressionWithTypeArguments,
  typeFromTypeNode,
} from "./checker.checkedtype.js";
import { inferExpression } from "./checker.expressions.js";
import { checkBlock } from "./checker.statements.js";

// The class/function name + its parameters/members were declared by the binder
// into the appropriate symbol tables (the class symbol's members/exports, the
// function's locals); references inside the bodies resolve through those tables
// via NameResolver. The checker no longer seeds a value environment — it just
// descends into the bodies with the declared return-type context.

// Eagerly resolve a signature's parameter type annotations (checkSourceElement
// over each parameter's TypeNode, independent of whether the parameter is
// referenced). Resolving the annotation surfaces the TYPE-path diagnostics
// (unresolved type name, generic/construct-signature deferral) that the lazy
// per-reference type derivation would otherwise miss for an unused parameter.
function checkSignatureParameterAnnotations(parameters: readonly ParameterDeclaration[], state: CheckState): void {
  for (const parameter of parameters) {
    if (parameter.type !== undefined) {
      typeFromTypeNode(parameter.type, state);
    }
  }
}

export function checkClassDeclaration(classDeclaration: ClassDeclaration, state: CheckState): void {
  for (const member of classDeclaration.members) {
    checkClassElement(member, state);
  }
  checkClassImplementsClauses(classDeclaration, state);
}

export function checkClassElement(member: ClassElement, state: CheckState): void {
  if (isConstructorDeclaration(member) || isMethodDeclaration(member)) {
    checkSignatureParameterAnnotations(member.parameters, state);
    if (member.body !== undefined) {
      checkBlock(member.body, state, member.type === undefined ? undefined : typeFromTypeNode(member.type, state));
    }
    return;
  }
  if (isPropertyDeclaration(member) && member.initializer !== undefined) {
    inferExpression(member.initializer, state);
  }
}

export function checkFunctionDeclaration(functionDeclaration: FunctionDeclaration, state: CheckState): void {
  checkSignatureParameterAnnotations(functionDeclaration.parameters, state);
  if (functionDeclaration.body !== undefined) {
    checkBlock(functionDeclaration.body, state, functionDeclaration.type === undefined ? undefined : typeFromTypeNode(functionDeclaration.type, state));
  }
}

function checkClassImplementsClauses(classDeclaration: ClassDeclaration, state: CheckState): void {
  const heritageClauses = classDeclaration.heritageClauses;
  if (heritageClauses === undefined) return;
  const classType = typeFromClassOrInterfaceDeclaration(classDeclaration, state);
  for (const clause of heritageClauses) {
    if (clause.token !== Kind.ImplementsKeyword) continue;
    for (const implementedType of clause.types) {
      checkAssignable(classType, typeFromExpressionWithTypeArguments(implementedType, state), state);
    }
  }
}
