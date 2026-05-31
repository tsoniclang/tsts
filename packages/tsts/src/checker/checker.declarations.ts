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
  isGetAccessorDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  isSetAccessorDeclaration,
  isStatic,
  isTypeParameterDeclaration,
  nodeSymbol,
  type Node as AstNode,
  type ClassDeclaration,
  type ClassElement,
  type ConstructorDeclaration,
  type FunctionDeclaration,
  type GetAccessorDeclaration,
  type HeritageClause,
  type InterfaceDeclaration,
  type MethodDeclaration,
  type ParameterDeclaration,
  type PropertyDeclaration,
  type SetAccessorDeclaration,
  type TypeParameterDeclaration,
} from "../ast/index.js";
import {
  type CheckState,
  checkAssignable,
  getTypeOfSymbol,
  getWidenedLiteralLikeTypeForContextualType,
  typeFromClassOrInterfaceDeclaration,
  typeFromExpressionWithTypeArguments,
  typeFromTypeNode,
} from "./checker.checkedtype.js";
import { inferExpression } from "./checker.expressions.js";
import { checkBlock } from "./checker.statements.js";
import type { Type } from "./types.js";

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
    checkParameterDeclaration(parameter, state);
  }
}

export function checkClassDeclaration(classDeclaration: ClassDeclaration, state: CheckState): void {
  checkTypeParameterDeclarations(classDeclaration.typeParameters, state);
  checkClassHeritageClauses(classDeclaration, state);
  checkDuplicateClassMembers(classDeclaration, state);
  for (const member of classDeclaration.members) {
    checkClassElement(member, state);
  }
}

export function checkClassElement(member: ClassElement, state: CheckState): void {
  if (isConstructorDeclaration(member)) {
    checkConstructorDeclaration(member, state);
    return;
  }
  if (isMethodDeclaration(member)) {
    checkMethodDeclaration(member, state);
    return;
  }
  if (isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
    checkAccessorDeclaration(member, state);
    return;
  }
  if (isPropertyDeclaration(member)) {
    checkPropertyDeclaration(member, state);
    return;
  }
}

export function checkFunctionDeclaration(functionDeclaration: FunctionDeclaration, state: CheckState): void {
  checkTypeParameterDeclarations(functionDeclaration.typeParameters, state);
  checkSignatureParameterAnnotations(functionDeclaration.parameters, state);
  if (functionDeclaration.body !== undefined) {
    checkBlock(functionDeclaration.body, state, functionDeclaration.type === undefined ? undefined : typeFromTypeNode(functionDeclaration.type, state));
  }
}

export function checkInterfaceDeclaration(interfaceDeclaration: InterfaceDeclaration, state: CheckState): void {
  checkTypeParameterDeclarations(interfaceDeclaration.typeParameters, state);
  for (const clause of interfaceDeclaration.heritageClauses ?? []) {
    for (const inheritedType of clause.types) {
      typeFromExpressionWithTypeArguments(inheritedType, state);
    }
  }
  for (const member of interfaceDeclaration.members) {
    checkInterfaceMember(member, state);
  }
}

function checkClassHeritageClauses(classDeclaration: ClassDeclaration, state: CheckState): void {
  const heritageClauses = classDeclaration.heritageClauses;
  if (heritageClauses === undefined) return;
  const classType = typeFromClassOrInterfaceDeclaration(classDeclaration, state);
  for (const clause of heritageClauses) {
    checkClassHeritageClause(classDeclaration, clause, classType, state);
  }
}

function checkClassHeritageClause(
  classDeclaration: ClassDeclaration,
  clause: HeritageClause,
  classType: Type,
  state: CheckState,
): void {
  if (clause.token === Kind.ImplementsKeyword) {
    for (const implementedType of clause.types) {
      checkAssignable(classType, typeFromExpressionWithTypeArguments(implementedType, state), state);
    }
    return;
  }
  if (clause.token === Kind.ExtendsKeyword) {
    for (const baseTypeNode of clause.types.slice(0, 1)) {
      const baseType = typeFromExpressionWithTypeArguments(baseTypeNode, state);
      checkAssignable(classType, baseType, state);
      checkDerivedClassConstructorRules(classDeclaration, state);
    }
  }
}

function checkConstructorDeclaration(constructorDeclaration: ConstructorDeclaration, state: CheckState): void {
  checkSignatureParameterAnnotations(constructorDeclaration.parameters, state);
  for (const parameter of constructorDeclaration.parameters) {
    if (parameter.initializer !== undefined) {
      inferExpression(parameter.initializer, state, parameter.type === undefined ? undefined : typeFromTypeNode(parameter.type, state));
    }
  }
  if (constructorDeclaration.body !== undefined) {
    checkBlock(constructorDeclaration.body, state, undefined);
  }
}

function checkMethodDeclaration(methodDeclaration: MethodDeclaration, state: CheckState): void {
  checkTypeParameterDeclarations(methodDeclaration.typeParameters, state);
  checkSignatureParameterAnnotations(methodDeclaration.parameters, state);
  const returnType = methodDeclaration.type === undefined ? undefined : typeFromTypeNode(methodDeclaration.type, state);
  if (methodDeclaration.body !== undefined) checkBlock(methodDeclaration.body, state, returnType);
}

function checkAccessorDeclaration(accessor: GetAccessorDeclaration | SetAccessorDeclaration, state: CheckState): void {
  checkSignatureParameterAnnotations(accessor.parameters, state);
  const returnType = accessor.type === undefined ? undefined : typeFromTypeNode(accessor.type, state);
  if (isSetAccessorDeclaration(accessor) && accessor.parameters.length !== 1) {
    state.diagnostics.push({ message: "A set accessor must have exactly one parameter." });
  }
  if (isGetAccessorDeclaration(accessor) && accessor.parameters.length !== 0) {
    state.diagnostics.push({ message: "A get accessor cannot have parameters." });
  }
  if (accessor.body !== undefined) checkBlock(accessor.body, state, returnType);
}

function checkPropertyDeclaration(propertyDeclaration: PropertyDeclaration, state: CheckState): void {
  const declaredType = propertyDeclaration.type === undefined ? undefined : typeFromTypeNode(propertyDeclaration.type, state);
  const initializerType = propertyDeclaration.initializer === undefined
    ? undefined
    : inferExpression(propertyDeclaration.initializer, state, declaredType);
  if (declaredType !== undefined && initializerType !== undefined) {
    checkAssignable(getWidenedLiteralLikeTypeForContextualType(initializerType, declaredType, state), declaredType, state);
  }
}

function checkParameterDeclaration(parameter: ParameterDeclaration, state: CheckState): void {
  const declaredType = parameter.type === undefined ? undefined : typeFromTypeNode(parameter.type, state);
  const initializerType = parameter.initializer === undefined ? undefined : inferExpression(parameter.initializer, state, declaredType);
  if (declaredType !== undefined && initializerType !== undefined) {
    checkAssignable(getWidenedLiteralLikeTypeForContextualType(initializerType, declaredType, state), declaredType, state);
  }
}

function checkTypeParameterDeclarations(typeParameters: readonly TypeParameterDeclaration[] | undefined, state: CheckState): void {
  if (typeParameters === undefined) return;
  for (const typeParameter of typeParameters) {
    if (!isTypeParameterDeclaration(typeParameter)) continue;
    if (typeParameter.constraint !== undefined) typeFromTypeNode(typeParameter.constraint, state);
    if (typeParameter.defaultType !== undefined) typeFromTypeNode(typeParameter.defaultType, state);
  }
}

function checkInterfaceMember(member: AstNode, state: CheckState): void {
  if (isPropertyDeclaration(member)) {
    if (member.type !== undefined) typeFromTypeNode(member.type, state);
    return;
  }
  if (isMethodDeclaration(member) || isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
    checkSignatureParameterAnnotations(member.parameters, state);
    if (member.type !== undefined) typeFromTypeNode(member.type, state);
  }
}

function checkDuplicateClassMembers(classDeclaration: ClassDeclaration, state: CheckState): void {
  const instanceMembers = new Set<string>();
  const staticMembers = new Set<string>();
  for (const member of classDeclaration.members) {
    const name = classMemberName(member);
    if (name === undefined) continue;
    const table = isStatic(member) ? staticMembers : instanceMembers;
    if (table.has(name) && !isAccessorPairCompatible(member, classDeclaration.members)) {
      state.diagnostics.push({ message: `Duplicate class member '${name}'.` });
    }
    table.add(name);
  }
}

function checkDerivedClassConstructorRules(classDeclaration: ClassDeclaration, state: CheckState): void {
  for (const member of classDeclaration.members) {
    if (!isConstructorDeclaration(member) || member.body === undefined) continue;
    const text = String((member.body as unknown as { text?: string }).text ?? "");
    if (text.length > 0 && !text.includes("super")) {
      state.diagnostics.push({ message: "Constructors for derived classes must contain a super call." });
    }
  }
}

function classMemberName(member: ClassElement): string | undefined {
  const symbol = nodeSymbol(member);
  if (symbol?.name !== undefined) return symbol.name;
  const name = (member as { readonly name?: { readonly text?: string } }).name;
  return name?.text;
}

function isAccessorPairCompatible(member: ClassElement, members: readonly ClassElement[]): boolean {
  if (!isGetAccessorDeclaration(member) && !isSetAccessorDeclaration(member)) return false;
  const name = classMemberName(member);
  if (name === undefined) return false;
  return members.some(other =>
    other !== member
    && classMemberName(other) === name
    && isStatic(other) === isStatic(member)
    && ((isGetAccessorDeclaration(member) && isSetAccessorDeclaration(other))
      || (isSetAccessorDeclaration(member) && isGetAccessorDeclaration(other))));
}

export function getDeclaredTypeOfClassMember(member: ClassElement): Type | undefined {
  const symbol = nodeSymbol(member);
  return symbol === undefined ? undefined : getTypeOfSymbol(symbol);
}
