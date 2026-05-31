/**
 * Checker — declaration checking (class / function members).
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Ports the declaration side of upstream `checker.go`
 * (`checkClassDeclaration`, `checkFunctionDeclaration`, members).
 */

import {
  Kind,
  SymbolFlags,
  isClassDeclaration,
  isConstructorDeclaration,
  isFunctionDeclaration,
  isGetAccessorDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  isSetAccessorDeclaration,
  isStatic,
  isTypeParameterDeclaration,
  nodeSymbol,
  type Block,
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
  type TypeNode,
  type TypeParameterDeclaration,
} from "../ast/index.js";
import {
  type CheckState,
  anyType,
  checkAssignable,
  getTypeOfSymbol,
  getWidenedLiteralLikeTypeForContextualType,
  makeFunctionType,
  typeFromClassOrInterfaceDeclaration,
  typeFromExpressionWithTypeArguments,
  typeFromTypeNode,
  unresolvedType,
  type FunctionParameter,
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

export function checkAsyncFunctionReturnType(node: AstNode, returnTypeNode: AstNode | undefined, state: CheckState): void {
  const returnType = returnTypeNode === undefined ? undefined : typeFromTypeNode(returnTypeNode as TypeNode, state);
  if (returnType === undefined) return;
  const name = String((returnType.symbol as { readonly name?: string } | undefined)?.name ?? (returnType as { readonly name?: string }).name ?? "");
  if (name !== "" && name !== "Promise" && name !== "PromiseLike") {
    state.diagnostics.push({ message: `Async function return type must be Promise-like; got '${name}'.` });
  }
  checkAllCodePathsInNonVoidFunctionReturnOrThrow(node, returnType, state);
}

export function checkDecorators(node: AstNode, state: CheckState): void {
  for (const modifier of modifierNodes(node)) {
    if (modifier.kind === Kind.Decorator) checkDecorator(modifier, state);
  }
}

export function checkDecorator(node: AstNode, state: CheckState): void {
  const expression = (node as { readonly expression?: AstNode }).expression;
  if (expression !== undefined) inferExpression(expression as never, state);
}

export function checkClassExpression(node: AstNode, state: CheckState): Type {
  checkClassExpressionExternalHelpers(node, state);
  checkClassExpressionDeferred(node, state);
  return typeFromClassOrInterfaceDeclaration(node as ClassDeclaration, state);
}

export function getFirstTransformableStaticClassElement(node: AstNode): AstNode | undefined {
  return membersOf(node).find(member => modifierKinds(member).includes(Kind.StaticKeyword));
}

export function checkClassExpressionExternalHelpers(node: AstNode, state: CheckState): void {
  const staticElement = getFirstTransformableStaticClassElement(node);
  if (staticElement !== undefined) checkClassNameCollisionWithObject((node as { readonly name?: AstNode }).name, state);
}

export function checkClassExpressionDeferred(node: AstNode, state: CheckState): void {
  for (const member of membersOf(node)) checkClassElement(member as ClassElement, state);
}

export function checkFunctionExpressionOrObjectLiteralMethod(node: AstNode, state: CheckState): Type {
  contextuallyCheckFunctionExpressionOrObjectLiteralMethod(node, state);
  return signatureTypeFromDeclaration(node, state);
}

export function contextuallyCheckFunctionExpressionOrObjectLiteralMethod(node: AstNode, state: CheckState): void {
  for (const parameter of parametersOf(node)) checkParameterDeclaration(parameter, state);
  const returnType = returnTypeOfSignatureNode(node, state);
  const body = bodyOf(node);
  if (body !== undefined) checkBlock(body, state, returnType);
}

export function checkFunctionExpressionOrObjectLiteralMethodDeferred(node: AstNode, state: CheckState): void {
  contextuallyCheckFunctionExpressionOrObjectLiteralMethod(node, state);
}

export function inferFromAnnotatedParametersAndReturn(node: AstNode, state: CheckState): readonly Type[] {
  const inferred = parametersOf(node).map(parameter => parameterType(parameter, state)).filter((type): type is Type => type !== undefined);
  const returnType = returnTypeOfSignatureNode(node, state);
  return returnType === undefined ? inferred : [...inferred, returnType];
}

export function assignContextualParameterTypes(node: AstNode, contextualTypes: readonly Type[], state: CheckState): void {
  parametersOf(node).forEach((parameter, index) => assignParameterType(parameter, contextualTypes[index], state));
}

export function assignNonContextualParameterTypes(node: AstNode, state: CheckState): void {
  for (const parameter of parametersOf(node)) assignParameterType(parameter, parameterType(parameter, state) ?? anyType, state);
}

export function assignParameterType(parameter: ParameterDeclaration, contextualType: Type | undefined, state: CheckState): Type {
  const declared = parameterType(parameter, state);
  const initializer = parameter.initializer === undefined ? undefined : inferExpression(parameter.initializer, state, contextualType ?? declared);
  const resolved = declared ?? initializer ?? contextualType ?? unresolvedType;
  if (declared !== undefined && initializer !== undefined) checkAssignable(getWidenedLiteralLikeTypeForContextualType(initializer, declared, state), declared, state);
  return resolved;
}

export function assignBindingElementTypes(pattern: AstNode, parentType: Type, state: CheckState): void {
  void parentType;
  for (const child of childrenOf(pattern)) {
    if (child.kind === Kind.BindingElement || child.kind === Kind.Parameter) {
      const typeNode = (child as { readonly type?: AstNode }).type;
      if (typeNode !== undefined) typeFromTypeNode(typeNode as TypeNode, state);
    }
    assignBindingElementTypes(child, parentType, state);
  }
}

export function checkCollisionsForDeclarationName(node: AstNode, name: AstNode | undefined, state: CheckState): void {
  if (name === undefined) return;
  checkCollisionWithRequireExportsInGeneratedCode(node, name, state);
  checkCollisionWithGlobalObjectInGeneratedCode(node, name, state);
  checkCollisionWithGlobalPromiseInGeneratedCode(node, name, state);
  checkClassNameCollisionWithObject(name, state);
}

export function checkCollisionWithRequireExportsInGeneratedCode(node: AstNode, name: AstNode, state: CheckState): void {
  if (needCollisionCheckForIdentifier(node, name, "exports")) state.diagnostics.push({ message: "Declaration_name_conflicts_with_generated_exports." });
  if (needCollisionCheckForIdentifier(node, name, "require")) state.diagnostics.push({ message: "Declaration_name_conflicts_with_generated_require." });
}

export function checkCollisionWithGlobalObjectInGeneratedCode(node: AstNode, name: AstNode, state: CheckState): void {
  if (needCollisionCheckForIdentifier(node, name, "Object")) state.diagnostics.push({ message: "Declaration_name_conflicts_with_global_Object." });
}

export function needCollisionCheckForIdentifier(_node: AstNode, identifier: AstNode, name: string): boolean {
  return declarationNameFromNode(identifier) === name;
}

export function setNodeLinksForPrivateIdentifierScope(node: AstNode, scope: AstNode): void {
  (node as unknown as { privateIdentifierScope?: AstNode }).privateIdentifierScope = scope;
}

export function recordPotentialCollisionWithWeakMapSetInGeneratedCode(node: AstNode, name: AstNode, state: CheckState): void {
  if (needCollisionCheckForIdentifier(node, name, "WeakMap") || needCollisionCheckForIdentifier(node, name, "WeakSet")) {
    state.diagnostics.push({ message: "Declaration_name_conflicts_with_generated_private_identifier_storage." });
  }
}

export function checkWeakMapSetCollision(node: AstNode, name: AstNode, state: CheckState): void {
  recordPotentialCollisionWithWeakMapSetInGeneratedCode(node, name, state);
}

export function checkCollisionWithGlobalPromiseInGeneratedCode(node: AstNode, name: AstNode, state: CheckState): void {
  if (needCollisionCheckForIdentifier(node, name, "Promise")) state.diagnostics.push({ message: "Declaration_name_conflicts_with_global_Promise." });
}

export function recordPotentialCollisionWithReflectInGeneratedCode(node: AstNode, name: AstNode, state: CheckState): void {
  if (needCollisionCheckForIdentifier(node, name, "Reflect")) state.diagnostics.push({ message: "Declaration_name_conflicts_with_global_Reflect." });
}

export function checkReflectCollision(node: AstNode, name: AstNode, state: CheckState): void {
  recordPotentialCollisionWithReflectInGeneratedCode(node, name, state);
}

export function checkClassNameCollisionWithObject(name: AstNode | undefined, state: CheckState): void {
  if (name !== undefined && declarationNameFromNode(name) === "Object") {
    state.diagnostics.push({ message: "Class_name_conflicts_with_global_Object." });
  }
}

export function checkObjectLiteralMethod(node: AstNode, state: CheckState): Type {
  return checkFunctionExpressionOrObjectLiteralMethod(node, state);
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

export function checkFunctionOrMethodDeclaration(node: AstNode, state: CheckState): void {
  if (isFunctionDeclaration(node)) {
    checkFunctionDeclaration(node, state);
    checkFunctionOrConstructorSymbol(nodeSymbol(node), state);
    return;
  }
  if (isMethodDeclaration(node)) {
    checkMethodDeclaration(node, state);
    checkFunctionOrConstructorSymbol(nodeSymbol(node), state);
  }
}

export function checkFunctionOrConstructorSymbol(symbol: ReturnType<typeof nodeSymbol>, state: CheckState): void {
  if (symbol === undefined) return;
  checkFunctionOrConstructorSymbolWorker(symbol, state);
}

export function checkFunctionOrConstructorSymbolWorker(symbol: NonNullable<ReturnType<typeof nodeSymbol>>, state: CheckState): void {
  const declarations = symbol.declarations ?? [];
  const implementation = declarations.find(hasBody);
  const overloads = declarations.filter(declaration => !hasBody(declaration));
  if (implementation === undefined || overloads.length === 0) return;
  for (const overload of overloads) {
    if (!isImplementationCompatibleWithOverload(implementation, overload, state)) {
      state.diagnostics.push({ message: `This overload signature is not compatible with its implementation signature.` });
    }
  }
}

export function getEffectiveDeclarationFlags(node: AstNode, modifierMask: number): number {
  return modifierFlags(node) & modifierMask;
}

export function isImplementationCompatibleWithOverload(
  implementation: AstNode,
  overload: AstNode,
  state: CheckState,
): boolean {
  const implementationParameters = parametersOf(implementation);
  const overloadParameters = parametersOf(overload);
  const minimumImplementationParameters = implementationParameters.filter(parameter => !isOptionalParameter(parameter)).length;
  const maximumImplementationParameters = hasRestParameter(implementationParameters) ? Number.POSITIVE_INFINITY : implementationParameters.length;
  if (overloadParameters.length < minimumImplementationParameters || overloadParameters.length > maximumImplementationParameters) return false;
  for (let index = 0; index < overloadParameters.length; index++) {
    const overloadType = parameterType(overloadParameters[index]!, state);
    const implementationType = parameterType(implementationParameters[Math.min(index, implementationParameters.length - 1)]!, state);
    if (overloadType !== undefined && implementationType !== undefined) checkAssignable(overloadType, implementationType, state);
  }
  const overloadReturn = returnTypeOfSignatureNode(overload, state);
  const implementationReturn = returnTypeOfSignatureNode(implementation, state);
  if (overloadReturn !== undefined && implementationReturn !== undefined) checkAssignable(implementationReturn, overloadReturn, state);
  return true;
}

export function checkAllCodePathsInNonVoidFunctionReturnOrThrow(
  node: AstNode,
  returnType: Type | undefined,
  state: CheckState,
): void {
  if (returnType === undefined || isUnwrappedReturnTypeUndefinedVoidOrAny(node, returnType)) return;
  const body = bodyOf(node);
  if (body === undefined) return;
  const exits = checkBlock(body, state, returnType);
  if (!exits) state.diagnostics.push({ message: "Not_all_code_paths_return_a_value" });
}

export function isUnwrappedReturnTypeUndefinedVoidOrAny(_container: AstNode, returnType: Type | undefined): boolean {
  const display = String((returnType as { readonly intrinsicName?: string; readonly name?: string } | undefined)?.intrinsicName
    ?? (returnType as { readonly name?: string } | undefined)?.name
    ?? "");
  return display === "undefined" || display === "void" || display === "any";
}

export function checkClassLikeDeclaration(node: AstNode, state: CheckState): void {
  if (!isClassDeclaration(node)) return;
  checkClassDeclaration(node, state);
  checkClassForStaticPropertyNameConflicts(node, state);
  checkMembersForOverrideModifier(node, state);
  checkPropertyInitialization(node, state);
}

export function checkClassForStaticPropertyNameConflicts(node: AstNode, state: CheckState): void {
  for (const member of membersOf(node)) {
    if (isStatic(member) && classMemberName(member as ClassElement) === "prototype") {
      state.diagnostics.push({ message: "Static_property_0_conflicts_with_built_in_property_Function_0_of_constructor_function_1" });
    }
  }
}

export function checkTypeParameterListsIdentical(left: readonly AstNode[] | undefined, right: readonly AstNode[] | undefined, state: CheckState): boolean {
  const leftParams = left ?? [];
  const rightParams = right ?? [];
  if (leftParams.length !== rightParams.length) {
    state.diagnostics.push({ message: "All_declarations_must_have_identical_type_parameters" });
    return false;
  }
  return areTypeParametersIdentical(leftParams, rightParams, state);
}

export function getClassOrInterfaceDeclarationsOfSymbol(symbol: AstSymbolLike | undefined): readonly AstNode[] {
  return (symbol?.declarations ?? []).filter(declaration => declaration.kind === Kind.ClassDeclaration || declaration.kind === Kind.InterfaceDeclaration);
}

export function areTypeParametersIdentical(
  declarations: readonly AstNode[],
  targetTypeParameters: readonly AstNode[],
  state: CheckState,
): boolean {
  if (declarations.length !== targetTypeParameters.length) return false;
  let identical = true;
  for (let index = 0; index < declarations.length; index++) {
    const left = declarations[index]!;
    const right = targetTypeParameters[index]!;
    const leftConstraint = (left as { readonly constraint?: AstNode }).constraint;
    const rightConstraint = (right as { readonly constraint?: AstNode }).constraint;
    const leftDefault = (left as { readonly defaultType?: AstNode }).defaultType;
    const rightDefault = (right as { readonly defaultType?: AstNode }).defaultType;
    if ((leftConstraint === undefined) !== (rightConstraint === undefined) || (leftDefault === undefined) !== (rightDefault === undefined)) identical = false;
    if (leftConstraint !== undefined) typeFromTypeNode(leftConstraint as TypeNode, state);
    if (rightConstraint !== undefined) typeFromTypeNode(rightConstraint as TypeNode, state);
  }
  return identical;
}

export function checkBaseTypeAccessibility(node: AstNode, baseTypes: readonly Type[], state: CheckState): void {
  void node;
  for (const baseType of baseTypes) {
    const symbol = (baseType as { readonly symbol?: AstSymbolLike }).symbol;
    if (symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Type) === 0) {
      state.diagnostics.push({ message: "Base_type_is_not_accessible" });
    }
  }
}

export function issueMemberSpecificError(
  node: AstNode,
  members: readonly AstNode[],
  message: string,
  state: CheckState,
): void {
  void node;
  for (const member of members) state.diagnostics.push({ message: `${message}: ${classMemberName(member as ClassElement) ?? "<computed>"}` });
}

export function getTypeWithoutSignatures(type: Type): Type {
  return {
    ...type,
    data: {
      ...(type.data as Record<string, unknown> | undefined),
      callSignatures: [],
      constructSignatures: [],
    },
  } as Type;
}

export function checkKindsOfPropertyMemberOverrides(
  baseMember: AstNode,
  derivedMember: AstNode,
  state: CheckState,
): void {
  const baseKind = memberKind(baseMember);
  const derivedKind = memberKind(derivedMember);
  if (baseKind !== derivedKind && !arePropertiesAbstractOrInterface(baseMember, derivedMember)) {
    state.diagnostics.push({ message: "Class_member_kind_must_match_base_member_kind" });
  }
}

export function arePropertiesAbstractOrInterface(left: AstNode, right: AstNode): boolean {
  return isPropertyAbstractOrInterface(left) && isPropertyAbstractOrInterface(right);
}

export function isPropertyAbstractOrInterface(node: AstNode): boolean {
  const parent = parentOf(node);
  return parent?.kind === Kind.InterfaceDeclaration || modifierKinds(node).includes(Kind.AbstractKeyword);
}

export function checkMembersForOverrideModifier(node: AstNode, state: CheckState): void {
  for (const member of membersOf(node)) checkMemberForOverrideModifier(member, state);
}

export function checkMemberForOverrideModifier(member: AstNode, state: CheckState): void {
  const hasOverride = modifierKinds(member).includes(Kind.OverrideKeyword);
  const parent = parentOf(member);
  const hasExtends = (parent as { readonly heritageClauses?: readonly HeritageClause[] } | undefined)?.heritageClauses
    ?.some(clause => clause.token === Kind.ExtendsKeyword) ?? false;
  if (hasOverride && !hasExtends) state.diagnostics.push({ message: "This_member_cannot_have_an_override_modifier_because_its_containing_class_does_not_extend_another_class" });
}

export function getSuggestedSymbolForNonexistentClassMember(
  name: string,
  members: Iterable<AstSymbolLike>,
): AstSymbolLike | undefined {
  let best: AstSymbolLike | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const member of members) {
    const candidate = member.name ?? member.escapedName ?? "";
    if (candidate.length === 0) continue;
    const distance = levenshteinDistance(name.toLowerCase(), candidate.toLowerCase());
    if (distance < bestDistance) {
      best = member;
      bestDistance = distance;
    }
  }
  return bestDistance <= Math.max(1, Math.floor(name.length * 0.4)) ? best : undefined;
}

export function checkIndexConstraints(type: Type, symbol: AstSymbolLike | undefined, isStaticIndex: boolean, state: CheckState): void {
  void type;
  const members = symbol?.members?.values() ?? [];
  for (const member of members) checkIndexConstraintForProperty(type, member, isStaticIndex, state);
}

export function checkIndexConstraintForProperty(
  type: Type,
  property: AstSymbolLike,
  isStaticIndex: boolean,
  state: CheckState,
): void {
  void type;
  void isStaticIndex;
  if (((property.flags ?? 0) & SymbolFlags.Property) === 0) return;
  for (const declaration of property.declarations ?? []) {
    const propertyType = (declaration as { readonly type?: AstNode }).type;
    if (propertyType !== undefined) typeFromTypeNode(propertyType as TypeNode, state);
  }
}

export function checkIndexConstraintForIndexSignature(
  type: Type,
  indexSignature: AstNode,
  state: CheckState,
): void {
  void type;
  for (const parameter of parametersOf(indexSignature)) {
    const typeNode = (parameter as { readonly type?: AstNode }).type;
    if (typeNode !== undefined) typeFromTypeNode(typeNode as TypeNode, state);
  }
}

export function checkClassOrInterfaceForDuplicateIndexSignatures(node: AstNode, state: CheckState): void {
  checkTypeForDuplicateIndexSignatures(node, state);
}

export function checkTypeForDuplicateIndexSignatures(node: AstNode, state: CheckState): void {
  const seen = new Set<string>();
  for (const member of membersOf(node)) {
    if (member.kind !== Kind.IndexSignature) continue;
    const parameter = parametersOf(member)[0];
    const key = parameter === undefined ? "unknown" : declarationName(parameter);
    if (seen.has(key)) state.diagnostics.push({ message: "Duplicate_index_signature_for_type_0" });
    seen.add(key);
  }
}

export function checkPropertyInitialization(node: AstNode, state: CheckState): void {
  for (const member of membersOf(node)) {
    if (isPropertyWithoutInitializer(member) && !isPropertyInitializedInConstructor(member, node)) {
      state.diagnostics.push({ message: `Property '${classMemberName(member as ClassElement) ?? "<computed>"}' has no initializer and is not definitely assigned in the constructor.` });
    }
  }
}

export function isPropertyWithoutInitializer(member: AstNode): boolean {
  return member.kind === Kind.PropertyDeclaration
    && (member as { readonly initializer?: AstNode }).initializer === undefined
    && !modifierKinds(member).includes(Kind.AbstractKeyword)
    && !modifierKinds(member).includes(Kind.DeclareKeyword)
    && !modifierKinds(member).includes(Kind.StaticKeyword);
}

export function isPropertyInitializedInStaticBlocks(propName: AstNode, _type: Type | undefined, staticBlocks: readonly AstNode[], classStart: number, propertyStart: number): boolean {
  const name = declarationNameFromNode(propName);
  return staticBlocks.some(block => posOf(block) >= classStart && posOf(block) <= propertyStart && nodeText(block).includes(name));
}

export function isPropertyInitializedInConstructor(property: AstNode, containingClass: AstNode): boolean {
  const name = classMemberName(property as ClassElement);
  if (name === undefined) return false;
  for (const member of membersOf(containingClass)) {
    if (member.kind === Kind.Constructor && nodeText(bodyOf(member)).includes(`this.${name}`)) return true;
  }
  return false;
}

export function checkInheritedPropertiesAreIdentical(
  inherited: readonly AstSymbolLike[],
  state: CheckState,
): boolean {
  let identical = true;
  for (let index = 1; index < inherited.length; index++) {
    if (!isPropertyIdenticalTo(inherited[0]!, inherited[index]!)) {
      state.diagnostics.push({ message: `Named property '${inherited[index]!.name ?? inherited[index]!.escapedName ?? ""}' of types is not identical.` });
      identical = false;
    }
  }
  return identical;
}

export function isPropertyIdenticalTo(left: AstSymbolLike, right: AstSymbolLike): boolean {
  const leftName = left.name ?? left.escapedName ?? "";
  const rightName = right.name ?? right.escapedName ?? "";
  if (leftName !== rightName) return false;
  const leftDeclarations = left.declarations ?? [];
  const rightDeclarations = right.declarations ?? [];
  if (leftDeclarations.length !== rightDeclarations.length) return false;
  return leftDeclarations.every((declaration, index) => memberKind(declaration) === memberKind(rightDeclarations[index]!));
}

interface AstSymbolLike {
  readonly name?: string;
  readonly escapedName?: string;
  readonly flags?: number;
  readonly declarations?: readonly AstNode[];
  readonly members?: Map<string, AstSymbolLike>;
}

function hasBody(node: AstNode): boolean {
  return bodyOf(node) !== undefined;
}

function bodyOf(node: AstNode | undefined): Block | undefined {
  return (node as { readonly body?: Block } | undefined)?.body;
}

function parametersOf(node: AstNode | undefined): readonly ParameterDeclaration[] {
  return (node as { readonly parameters?: readonly ParameterDeclaration[] } | undefined)?.parameters ?? [];
}

function isOptionalParameter(parameter: ParameterDeclaration): boolean {
  return parameter.questionToken !== undefined || parameter.initializer !== undefined || parameter.dotDotDotToken !== undefined;
}

function hasRestParameter(parameters: readonly ParameterDeclaration[]): boolean {
  return parameters.some(parameter => parameter.dotDotDotToken !== undefined);
}

function parameterType(parameter: ParameterDeclaration, state: CheckState): Type | undefined {
  return parameter.type === undefined ? undefined : typeFromTypeNode(parameter.type, state);
}

function returnTypeOfSignatureNode(node: AstNode, state: CheckState): Type | undefined {
  const typeNode = (node as { readonly type?: AstNode }).type;
  return typeNode === undefined ? undefined : typeFromTypeNode(typeNode as TypeNode, state);
}

function parentOf(node: AstNode): AstNode | undefined {
  return (node as { readonly parent?: AstNode }).parent;
}

function membersOf(node: AstNode | undefined): readonly AstNode[] {
  return (node as { readonly members?: readonly AstNode[] } | undefined)?.members ?? [];
}

function modifierKinds(node: AstNode): readonly Kind[] {
  return modifierNodes(node).map(modifier => modifier.kind);
}

function modifierNodes(node: AstNode): readonly AstNode[] {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] | { readonly nodes?: readonly AstNode[] } }).modifiers;
  return Array.isArray(modifiers) ? modifiers : (modifiers as { readonly nodes?: readonly AstNode[] } | undefined)?.nodes ?? [];
}

function modifierFlags(node: AstNode): number {
  let flags = 0;
  for (const kind of modifierKinds(node)) flags |= 1 << kind;
  return flags;
}

function memberKind(member: AstNode): string {
  if (member.kind === Kind.GetAccessor) return "get";
  if (member.kind === Kind.SetAccessor) return "set";
  if (member.kind === Kind.MethodDeclaration || member.kind === Kind.MethodSignature) return "method";
  if (member.kind === Kind.PropertyDeclaration || member.kind === Kind.PropertySignature) return "property";
  return String(member.kind);
}

function declarationName(node: AstNode): string {
  return declarationNameFromNode((node as { readonly name?: AstNode }).name ?? node);
}

function signatureTypeFromDeclaration(node: AstNode, state: CheckState): Type {
  const returnType = returnTypeOfSignatureNode(node, state) ?? anyType;
  const parameters: FunctionParameter[] = parametersOf(node).map(parameter => ({
    name: declarationName(parameter),
    type: parameterType(parameter, state) ?? anyType,
    optional: parameter.questionToken !== undefined || parameter.initializer !== undefined,
    rest: parameter.dotDotDotToken !== undefined,
  }));
  return makeFunctionType(returnType, state, parameters);
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const record = node as unknown as Record<string, unknown>;
  const children: AstNode[] = [];
  for (const value of Object.values(record)) {
    if (isAstNode(value)) children.push(value);
    else if (Array.isArray(value)) children.push(...value.filter(isAstNode));
    else if (isNodeArray(value)) children.push(...value.nodes.filter(isAstNode));
  }
  return children;
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function isNodeArray(value: unknown): value is { readonly nodes: readonly AstNode[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes);
}

function declarationNameFromNode(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? "";
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? "";
}

function posOf(node: AstNode | undefined): number {
  return (node as { readonly pos?: number } | undefined)?.pos ?? 0;
}

function levenshteinDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex++) {
    let lastDiagonal = previous[0]!;
    previous[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex++) {
      const insertion = previous[rightIndex]! + 1;
      const deletion = previous[rightIndex - 1]! + 1;
      const substitution = lastDiagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1);
      lastDiagonal = previous[rightIndex]!;
      previous[rightIndex] = Math.min(insertion, deletion, substitution);
    }
  }
  return previous[right.length]!;
}
