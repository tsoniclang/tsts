import {
  Kind,
  isArrayTypeNode,
  isBlock,
  isCallSignatureDeclaration,
  isClassDeclaration,
  isClassStaticBlockDeclaration,
  isConditionalTypeNode,
  isConstructSignatureDeclaration,
  isConstructorDeclaration,
  isConstructorTypeNode,
  isExpressionStatement,
  isFunctionDeclaration,
  isFunctionTypeNode,
  isGetAccessorDeclaration,
  isIdentifier,
  isImportTypeNode,
  isIndexSignatureDeclaration,
  isIndexedAccessTypeNode,
  isInferTypeNode,
  isInterfaceDeclaration,
  isIntersectionTypeNode,
  isMappedTypeNode,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isNamedTupleMember,
  isParenthesizedTypeNode,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isReturnStatement,
  isSetAccessorDeclaration,
  isTemplateLiteralTypeNode,
  isThisTypeNode,
  isTupleTypeNode,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isTypeOperatorNode,
  isTypeParameterDeclaration,
  isTypePredicateNode,
  isTypeQueryNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  isVariableStatement,
  type Block,
  type Node as AstNode,
  type ParameterDeclaration,
  type Statement,
  type TypeNode,
  type TypeParameterDeclaration,
} from "../ast/index.js";
import {
  anyType,
  checkAssignable,
  getWidenedLiteralLikeTypeForContextualType,
  type CheckState,
  typeFromTypeNode,
  voidType,
} from "./checker.checkedtype.js";
import { checkClassDeclaration, checkFunctionDeclaration } from "./checker.declarations.js";
import { inferExpression } from "./checker.expressions.js";
import { checkBlock, checkForInitializer, checkStatement, checkStatements } from "./checker.statements.js";
import type { Type } from "./types.js";

export interface SourceElementCheckContext {
  readonly checkUnused?: boolean;
  readonly expectedReturnType?: Type;
}

export function checkSourceElements(
  nodes: readonly Statement[],
  state: CheckState,
  context: SourceElementCheckContext = {},
): boolean {
  let exits = false;
  for (const node of nodes) {
    const nodeExits = checkSourceElement(node, state, context);
    exits = exits || nodeExits;
    if (nodeExits && !context.checkUnused) break;
  }
  return exits;
}

export function checkSourceElement(
  node: Statement,
  state: CheckState,
  context: SourceElementCheckContext = {},
): boolean {
  if (checkSourceElementUnreachable(node, context)) {
    state.diagnostics.push({ message: "Unreachable code detected." });
    if (context.checkUnused !== true) return true;
  }
  return checkSourceElementWorker(node, state, context);
}

export function checkSourceElementWorker(
  node: Statement,
  state: CheckState,
  context: SourceElementCheckContext = {},
): boolean {
  if (isBlock(node)) return checkBlock(node, state, context.expectedReturnType);
  if (isVariableStatement(node)) {
    for (const declaration of node.declarationList.declarations) {
      checkVariableLikeDeclaration(declaration.type, declaration.initializer, state);
    }
    return false;
  }
  if (isFunctionDeclaration(node)) {
    checkFunctionDeclaration(node, state);
    return false;
  }
  if (isClassDeclaration(node)) {
    checkClassDeclaration(node, state);
    return false;
  }
  if (isInterfaceDeclaration(node)) {
    checkInterfaceDeclaration(node, state);
    return false;
  }
  if (isTypeAliasDeclaration(node)) {
    checkTypeAliasDeclaration(node, state);
    return false;
  }
  if (isExpressionStatement(node)) {
    inferExpression(node.expression, state);
    return false;
  }
  if (isReturnStatement(node)) {
    const actual = node.expression === undefined ? voidType : inferExpression(node.expression, state, context.expectedReturnType);
    if (context.expectedReturnType !== undefined) {
      checkAssignable(getWidenedLiteralLikeTypeForContextualType(actual, context.expectedReturnType, state), context.expectedReturnType, state);
    }
    return true;
  }
  return checkStatement(node, state, context.expectedReturnType).exits;
}

export function checkNodeDeferred(node: AstNode, state: CheckState): void {
  if (isFunctionDeclaration(node)) checkFunctionDeclaration(node, state);
  else if (isClassDeclaration(node)) checkClassDeclaration(node, state);
  else if (isBlock(node)) checkBlock(node, state, undefined);
  else checkJSDocComments(node, state);
}

export function checkDeferredNodes(nodes: readonly AstNode[], state: CheckState): void {
  for (const node of nodes) checkDeferredNode(node, state);
}

export function checkDeferredNode(node: AstNode, state: CheckState): void {
  checkNodeDeferred(node, state);
}

export function checkJSDocComments(node: AstNode, state: CheckState): void {
  const jsDoc = (node as { readonly jsDoc?: readonly AstNode[] }).jsDoc ?? [];
  for (const comment of jsDoc) checkJSDocComment(comment, state);
}

export function checkJSDocComment(node: AstNode, state: CheckState): void {
  const tags = (node as { readonly tags?: readonly AstNode[] }).tags ?? [];
  for (const tag of tags) {
    const typeExpression = (tag as { readonly typeExpression?: { readonly type?: TypeNode } }).typeExpression;
    if (typeExpression?.type !== undefined) typeFromTypeNode(typeExpression.type, state);
  }
}

export function checkTypeParameter(node: TypeParameterDeclaration, state: CheckState): void {
  if (node.constraint !== undefined) typeFromTypeNode(node.constraint, state);
  if (node.defaultType !== undefined) typeFromTypeNode(node.defaultType, state);
}

export function checkTypeParameters(nodes: readonly TypeParameterDeclaration[] | undefined, state: CheckState): void {
  if (nodes === undefined) return;
  for (const node of nodes) checkTypeParameter(node, state);
}

export function checkParameter(node: ParameterDeclaration, state: CheckState): void {
  if (node.type !== undefined) typeFromTypeNode(node.type, state);
  if (node.initializer !== undefined) inferExpression(node.initializer, state);
}

export function checkParameters(nodes: readonly ParameterDeclaration[] | undefined, state: CheckState): void {
  if (nodes === undefined) return;
  for (const node of nodes) checkParameter(node, state);
}

export function checkPropertyDeclaration(node: AstNode, state: CheckState): void {
  const property = node as { readonly type?: TypeNode; readonly initializer?: AstNode };
  checkVariableLikeDeclaration(property.type, property.initializer, state);
}

export function checkPropertySignature(node: AstNode, state: CheckState): void {
  const type = (node as { readonly type?: TypeNode }).type;
  if (type !== undefined) typeFromTypeNode(type, state);
}

export function checkSignatureDeclaration(node: AstNode, state: CheckState): void {
  checkTypeParameters((node as { readonly typeParameters?: readonly TypeParameterDeclaration[] }).typeParameters, state);
  checkParameters((node as { readonly parameters?: readonly ParameterDeclaration[] }).parameters, state);
  const type = (node as { readonly type?: TypeNode }).type;
  if (type !== undefined) typeFromTypeNode(type, state);
}

export function checkMethodDeclaration(node: AstNode, state: CheckState): void {
  checkSignatureDeclaration(node, state);
  const body = (node as { readonly body?: Block }).body;
  if (body !== undefined) checkBlock(body, state, getReturnTypeNode(node, state));
}

export function checkConstructorDeclaration(node: AstNode, state: CheckState): void {
  checkParameters((node as { readonly parameters?: readonly ParameterDeclaration[] }).parameters, state);
  const body = (node as { readonly body?: Block }).body;
  if (body !== undefined) checkBlock(body, state, undefined);
}

export function checkAccessorDeclaration(node: AstNode, state: CheckState): void {
  checkSignatureDeclaration(node, state);
  const body = (node as { readonly body?: Block }).body;
  if (body !== undefined) checkBlock(body, state, getReturnTypeNode(node, state));
}

export function checkInterfaceDeclaration(node: AstNode, state: CheckState): void {
  checkTypeParameters((node as { readonly typeParameters?: readonly TypeParameterDeclaration[] }).typeParameters, state);
  const heritageClauses = (node as { readonly heritageClauses?: readonly AstNode[] }).heritageClauses ?? [];
  for (const clause of heritageClauses) {
    for (const typeNode of (clause as { readonly types?: readonly AstNode[] }).types ?? []) checkTypeReferenceOrImport(typeNode, state);
  }
  for (const member of (node as { readonly members?: readonly AstNode[] }).members ?? []) checkTypeElement(member, state);
}

export function checkTypeAliasDeclaration(node: AstNode, state: CheckState): void {
  checkTypeParameters((node as { readonly typeParameters?: readonly TypeParameterDeclaration[] }).typeParameters, state);
  const type = (node as { readonly type?: TypeNode }).type;
  if (type !== undefined) typeFromTypeNode(type, state);
}

export function checkTypeLiteral(node: AstNode, state: CheckState): void {
  for (const member of (node as { readonly members?: readonly AstNode[] }).members ?? []) checkTypeElement(member, state);
}

export function checkTypeElement(node: AstNode, state: CheckState): void {
  if (isPropertySignatureDeclaration(node)) checkPropertySignature(node, state);
  else if (isMethodSignatureDeclaration(node) || isCallSignatureDeclaration(node) || isConstructSignatureDeclaration(node) || isIndexSignatureDeclaration(node)) checkSignatureDeclaration(node, state);
  else if (isGetAccessorDeclaration(node) || isSetAccessorDeclaration(node)) checkAccessorDeclaration(node, state);
}

export function checkClassElement(node: AstNode, state: CheckState): void {
  if (isPropertyDeclaration(node)) checkPropertyDeclaration(node, state);
  else if (isMethodDeclaration(node)) checkMethodDeclaration(node, state);
  else if (isConstructorDeclaration(node)) checkConstructorDeclaration(node, state);
  else if (isGetAccessorDeclaration(node) || isSetAccessorDeclaration(node)) checkAccessorDeclaration(node, state);
  else if (isClassStaticBlockDeclaration(node)) {
    const body = (node as { readonly body?: Block }).body;
    if (body !== undefined) checkBlock(body, state, undefined);
  }
}

export function checkTypeReferenceOrImport(node: AstNode, state: CheckState): void {
  if (isTypeReferenceNode(node) || isImportTypeNode(node)) typeFromTypeNode(node as TypeNode, state);
}

export function checkTypeNode(node: TypeNode, state: CheckState): void {
  if (isTypeReferenceNode(node)) checkTypeReferenceNode(node, state);
  else if (isImportTypeNode(node)) checkImportType(node, state);
  else if (isTypeLiteralNode(node)) checkTypeLiteral(node, state);
  else if (isArrayTypeNode(node)) checkArrayType(node, state);
  else if (isTupleTypeNode(node)) checkTupleType(node, state);
  else if (isUnionTypeNode(node) || isIntersectionTypeNode(node)) checkUnionOrIntersectionType(node, state);
  else if (isParenthesizedTypeNode(node)) checkTypeNode(node.type, state);
  else if (isFunctionTypeNode(node) || isConstructorTypeNode(node)) checkSignatureDeclaration(node, state);
  else if (isConditionalTypeNode(node)) checkConditionalType(node, state);
  else if (isInferTypeNode(node)) checkInferType(node, state);
  else if (isTypeOperatorNode(node)) checkTypeOperator(node, state);
  else if (isIndexedAccessTypeNode(node)) checkIndexedAccessType(node, state);
  else if (isMappedTypeNode(node)) checkMappedType(node, state);
  else if (isTemplateLiteralTypeNode(node)) checkTemplateLiteralType(node, state);
  else if (isNamedTupleMember(node)) checkNamedTupleMember(node, state);
  else if (isTypePredicateNode(node)) checkTypePredicate(node, state);
  else if (isTypeQueryNode(node)) checkTypeQuery(node, state);
  else if (isThisTypeNode(node)) checkThisType(node, state);
}

export function checkTypeReferenceNode(node: AstNode, state: CheckState): void {
  for (const typeArgument of typeArgumentsOf(node)) checkTypeNode(typeArgument as TypeNode, state);
  checkTypeReferenceOrImport(node, state);
}

export function checkTypeArgumentConstraints(node: AstNode, state: CheckState): boolean {
  let valid = true;
  for (const typeArgument of typeArgumentsOf(node)) {
    const type = typeFromTypeNode(typeArgument as TypeNode, state);
    valid = valid && type !== undefined;
  }
  return valid;
}

export function getDeprecatedSuggestionNode(node: AstNode): AstNode {
  let current = skipParentheses(node);
  while (current.kind === Kind.CallExpression
    || current.kind === Kind.Decorator
    || current.kind === Kind.NewExpression
    || current.kind === Kind.TaggedTemplateExpression) {
    current = expressionOf(current) ?? tagOf(current) ?? current;
    if (current === node) break;
  }
  if (current.kind === Kind.ElementAccessExpression) return argumentExpressionOf(current) ?? current;
  if (current.kind === Kind.PropertyAccessExpression) return nameOf(current) ?? current;
  if (current.kind === Kind.TypeReference) {
    const typeName = typeNameOf(current);
    if (typeName?.kind === Kind.QualifiedName) return rightOf(typeName) ?? current;
  }
  return current;
}

export function checkTypePredicate(node: AstNode, state: CheckState): void {
  const parent = getTypePredicateParent(node);
  if (parent === undefined) {
    state.diagnostics.push({ message: "A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods" });
    return;
  }
  const predicateType = (node as { readonly type?: TypeNode }).type;
  if (predicateType !== undefined) checkTypeNode(predicateType, state);
  checkIfTypePredicateVariableIsDeclaredInBindingPattern(node, state);
}

export function getTypePredicateParent(node: AstNode): AstNode | undefined {
  let parent = parentOf(node);
  if (parent?.kind === Kind.ParenthesizedType) parent = parentOf(parent);
  if (parent === undefined) return undefined;
  if (parent.kind === Kind.FunctionDeclaration
    || parent.kind === Kind.MethodDeclaration
    || parent.kind === Kind.GetAccessor
    || parent.kind === Kind.SetAccessor
    || parent.kind === Kind.FunctionType
    || parent.kind === Kind.CallSignature
    || parent.kind === Kind.MethodSignature) return parent;
  return undefined;
}

export function checkIfTypePredicateVariableIsDeclaredInBindingPattern(node: AstNode, state: CheckState): void {
  const parameterName = (node as { readonly parameterName?: AstNode }).parameterName;
  if (parameterName === undefined || !isIdentifier(parameterName)) return;
  const parent = getTypePredicateParent(node);
  for (const parameter of parametersOf(parent)) {
    if (bindingNameContains(parameterName.text, (parameter as { readonly name?: AstNode }).name)) {
      state.diagnostics.push({ message: "A_type_predicate_cannot_reference_element_0_in_a_binding_pattern" });
    }
  }
}

export function checkTypeQuery(node: AstNode, state: CheckState): void {
  const exprName = (node as { readonly exprName?: AstNode }).exprName ?? typeNameOf(node);
  if (exprName !== undefined) checkEntityName(exprName, state);
}

export function checkObjectTypeForDuplicateDeclarations(node: AstNode, state: CheckState): void {
  const seen = new Set<string>();
  for (const member of membersOf(node)) {
    const name = declarationName(member);
    if (name.length === 0) continue;
    if (seen.has(name)) reportDuplicateMemberErrors(member, name, state);
    seen.add(name);
  }
}

export function reportDuplicateMemberErrors(node: AstNode, name: string, state: CheckState): void {
  void node;
  state.diagnostics.push({ message: `Duplicate identifier '${name}'.` });
}

export function checkArrayType(node: AstNode, state: CheckState): void {
  const elementType = (node as { readonly elementType?: TypeNode }).elementType;
  if (elementType !== undefined) checkTypeNode(elementType, state);
}

export function checkTupleType(node: AstNode, state: CheckState): void {
  for (const element of elementsOf(node)) checkTypeNode(element as TypeNode, state);
}

export function checkUnionOrIntersectionType(node: AstNode, state: CheckState): void {
  for (const type of typesOf(node)) checkTypeNode(type as TypeNode, state);
}

export function checkThisType(node: AstNode, state: CheckState): void {
  void node;
  void state;
}

export function checkTypeOperator(node: AstNode, state: CheckState): void {
  const type = (node as { readonly type?: TypeNode }).type;
  if (type !== undefined) checkTypeNode(type, state);
}

export function checkConditionalType(node: AstNode, state: CheckState): void {
  for (const type of [
    (node as { readonly checkType?: TypeNode }).checkType,
    (node as { readonly extendsType?: TypeNode }).extendsType,
    (node as { readonly trueType?: TypeNode }).trueType,
    (node as { readonly falseType?: TypeNode }).falseType,
  ]) {
    if (type !== undefined) checkTypeNode(type, state);
  }
}

export function checkInferType(node: AstNode, state: CheckState): void {
  const typeParameter = (node as { readonly typeParameter?: TypeParameterDeclaration }).typeParameter;
  if (typeParameter !== undefined) checkTypeParameter(typeParameter, state);
}

export function checkTemplateLiteralType(node: AstNode, state: CheckState): void {
  for (const span of templateSpansOf(node)) {
    const type = (span as { readonly type?: TypeNode }).type;
    if (type !== undefined) checkTypeNode(type, state);
  }
}

export function checkImportType(node: AstNode, state: CheckState): void {
  for (const typeArgument of typeArgumentsOf(node)) checkTypeNode(typeArgument as TypeNode, state);
  typeFromTypeNode(node as TypeNode, state);
}

export function getResolutionModeOverride(node: AstNode): string | undefined {
  const attributes = (node as { readonly attributes?: AstNode }).attributes;
  for (const element of elementsOf(attributes)) {
    if (declarationName(element) === "resolution-mode") {
      const value = (element as { readonly value?: { readonly text?: string } }).value?.text;
      if (value === "import" || value === "require") return value;
    }
  }
  return undefined;
}

export function checkNamedTupleMember(node: AstNode, state: CheckState): void {
  const type = (node as { readonly type?: TypeNode }).type;
  if (type !== undefined) checkTypeNode(type, state);
}

export function checkIndexedAccessType(node: AstNode, state: CheckState): void {
  const objectType = (node as { readonly objectType?: TypeNode }).objectType;
  const indexType = (node as { readonly indexType?: TypeNode }).indexType;
  if (objectType !== undefined) checkTypeNode(objectType, state);
  if (indexType !== undefined) checkTypeNode(indexType, state);
}

export function checkMappedType(node: AstNode, state: CheckState): void {
  const typeParameter = (node as { readonly typeParameter?: TypeParameterDeclaration }).typeParameter;
  if (typeParameter !== undefined) checkTypeParameter(typeParameter, state);
  const nameType = (node as { readonly nameType?: TypeNode }).nameType;
  if (nameType !== undefined) checkTypeNode(nameType, state);
  const type = (node as { readonly type?: TypeNode }).type;
  if (type !== undefined) checkTypeNode(type, state);
  checkObjectTypeForDuplicateDeclarations(node, state);
}

export function checkJSDocType(node: AstNode, state: CheckState): void {
  checkJSDocTypeIsInJsFile(node, state);
  for (const child of childNodes(node)) {
    if (isTypeNode(child)) checkTypeNode(child as TypeNode, state);
  }
}

export function checkJSDocTypeIsInJsFile(node: AstNode, state: CheckState): void {
  if (!isInJSFile(node)) {
    state.diagnostics.push({ message: "JSDoc_types_can_only_be_used_inside_documentation_comments" });
  }
}

export function resolveJSDocMemberName(name: AstNode | undefined, state: CheckState): AstNode | undefined {
  void state;
  if (name === undefined) return undefined;
  if (name.kind === Kind.Identifier || name.kind === Kind.ThisKeyword) return name;
  if (name.kind === Kind.QualifiedName) return resolveJSDocMemberName(rightOf(name), state);
  return undefined;
}

export function checkTypeParameterDeferred(node: AstNode, state: CheckState): void {
  const parent = parentOf(node);
  if (parent?.kind !== Kind.InterfaceDeclaration
    && parent?.kind !== Kind.ClassDeclaration
    && parent?.kind !== Kind.ClassExpression
    && parent?.kind !== Kind.TypeAliasDeclaration) return;
  const variance = modifierKinds(node).filter(kind => kind === Kind.InKeyword || kind === Kind.OutKeyword);
  if (variance.length > 1) state.diagnostics.push({ message: "Variance_annotations_are_only_supported_in_type_aliases_for_object_function_constructor_and_mapped_types" });
}

export function shouldCheckErasableSyntax(node: AstNode): boolean {
  return !isInJSFile(node);
}

export function checkClassStaticBlockDeclaration(node: AstNode, state: CheckState): void {
  for (const child of childNodes(node)) {
    if (isStatementNode(child)) checkSourceElement(child as Statement, state);
  }
}

export function findFirstSuperCall(node: AstNode): AstNode | undefined {
  if (isSuperCall(node)) return node;
  if (isFunctionLikeNode(node)) return undefined;
  for (const child of childNodes(node)) {
    const found = findFirstSuperCall(child);
    if (found !== undefined) return found;
  }
  return undefined;
}

export function isInstancePropertyWithInitializerOrPrivateIdentifierProperty(node: AstNode): boolean {
  return node.kind === Kind.PropertyDeclaration && (!isStatic(node) || (node as { readonly name?: AstNode }).name?.kind === Kind.PrivateIdentifier) && (node as { readonly initializer?: AstNode }).initializer !== undefined;
}

export function superCallIsRootLevelInConstructor(superCall: AstNode, body: AstNode): boolean {
  const parent = parentOf(walkUpParenthesizedExpressions(parentOf(superCall) ?? superCall));
  return parent?.kind === Kind.ExpressionStatement && parentOf(parent) === body;
}

export function nodeImmediatelyReferencesSuperOrThis(node: AstNode): boolean {
  if (node.kind === Kind.SuperKeyword || node.kind === Kind.ThisKeyword) return true;
  if (node.kind === Kind.ArrowFunction
    || node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.PropertyDeclaration) return false;
  if (node.kind === Kind.Block) {
    const parent = parentOf(node);
    if (parent?.kind === Kind.Constructor || parent?.kind === Kind.MethodDeclaration || parent?.kind === Kind.GetAccessor || parent?.kind === Kind.SetAccessor) return false;
  }
  return childNodes(node).some(nodeImmediatelyReferencesSuperOrThis);
}

function checkEntityName(node: AstNode, state: CheckState): void {
  if (node.kind === Kind.QualifiedName) {
    const left = (node as { readonly left?: AstNode }).left;
    const right = (node as { readonly right?: AstNode }).right;
    if (left !== undefined) checkEntityName(left, state);
    if (right !== undefined) checkEntityName(right, state);
  } else if (node.kind !== Kind.Identifier && node.kind !== Kind.ThisKeyword) {
    typeFromTypeNode(node as TypeNode, state);
  }
}

export function checkFunctionLikeDeclaration(node: AstNode, state: CheckState): void {
  if (isFunctionDeclaration(node)) checkFunctionDeclaration(node, state);
  else if (isMethodDeclaration(node)) checkMethodDeclaration(node, state);
  else if (isConstructorDeclaration(node)) checkConstructorDeclaration(node, state);
  else if (isGetAccessorDeclaration(node) || isSetAccessorDeclaration(node)) checkAccessorDeclaration(node, state);
}

export function checkSourceElementUnreachable(_node: AstNode, _context: SourceElementCheckContext): boolean {
  return false;
}

function checkVariableLikeDeclaration(typeNode: TypeNode | undefined, initializer: AstNode | undefined, state: CheckState): void {
  const declaredType = typeNode === undefined ? undefined : typeFromTypeNode(typeNode, state);
  const initializerType = initializer === undefined ? undefined : inferExpression(initializer as Parameters<typeof inferExpression>[0], state, declaredType);
  if (declaredType !== undefined && initializerType !== undefined) {
    checkAssignable(getWidenedLiteralLikeTypeForContextualType(initializerType, declaredType, state), declaredType, state);
  }
}

function getReturnTypeNode(node: AstNode, state: CheckState): Type {
  const type = (node as { readonly type?: TypeNode }).type;
  return type === undefined ? anyType : typeFromTypeNode(type, state);
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function expressionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly expression?: AstNode }).expression;
}

function tagOf(node: AstNode): AstNode | undefined {
  return (node as { readonly tag?: AstNode }).tag;
}

function argumentExpressionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly argumentExpression?: AstNode }).argumentExpression;
}

function nameOf(node: AstNode): AstNode | undefined {
  return (node as { readonly name?: AstNode }).name;
}

function typeNameOf(node: AstNode): AstNode | undefined {
  return (node as { readonly typeName?: AstNode }).typeName;
}

function rightOf(node: AstNode): AstNode | undefined {
  return (node as { readonly right?: AstNode }).right;
}

function leftOf(node: AstNode): AstNode | undefined {
  return (node as { readonly left?: AstNode }).left;
}

function skipParentheses(node: AstNode): AstNode {
  let current = node;
  while (current.kind === Kind.ParenthesizedExpression || current.kind === Kind.ParenthesizedType) {
    const next = expressionOf(current) ?? (current as { readonly type?: AstNode }).type;
    if (next === undefined) break;
    current = next;
  }
  return current;
}

function walkUpParenthesizedExpressions(node: AstNode): AstNode {
  let current = node;
  for (let parent = parentOf(current); parent?.kind === Kind.ParenthesizedExpression; parent = parentOf(current)) {
    current = parent;
  }
  return current;
}

function typeArgumentsOf(node: AstNode): readonly AstNode[] {
  return nodeArray((node as { readonly typeArguments?: unknown; readonly typeArgumentList?: unknown }).typeArguments
    ?? (node as { readonly typeArgumentList?: unknown }).typeArgumentList);
}

function parametersOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly parameters?: unknown } | undefined)?.parameters);
}

function membersOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly members?: unknown } | undefined)?.members);
}

function elementsOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly elements?: unknown } | undefined)?.elements);
}

function typesOf(node: AstNode): readonly AstNode[] {
  return nodeArray((node as { readonly types?: unknown }).types);
}

function templateSpansOf(node: AstNode): readonly AstNode[] {
  return nodeArray((node as { readonly templateSpans?: unknown }).templateSpans);
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (Array.isArray(value)) return value.filter(isNode);
  if (isNodeList(value)) return value.nodes.filter(isNode);
  return [];
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

function isTypeNode(node: AstNode): boolean {
  return isTypeReferenceNode(node)
    || isTypeLiteralNode(node)
    || isArrayTypeNode(node)
    || isTupleTypeNode(node)
    || isUnionTypeNode(node)
    || isIntersectionTypeNode(node)
    || isParenthesizedTypeNode(node)
    || isFunctionTypeNode(node)
    || isConstructorTypeNode(node)
    || isConditionalTypeNode(node)
    || isInferTypeNode(node)
    || isTypeOperatorNode(node)
    || isIndexedAccessTypeNode(node)
    || isMappedTypeNode(node)
    || isTemplateLiteralTypeNode(node)
    || isNamedTupleMember(node)
    || isTypePredicateNode(node)
    || isTypeQueryNode(node)
    || isThisTypeNode(node)
    || isImportTypeNode(node);
}

function isStatementNode(node: AstNode): boolean {
  return node.kind === Kind.Block
    || node.kind === Kind.VariableStatement
    || node.kind === Kind.ExpressionStatement
    || node.kind === Kind.IfStatement
    || node.kind === Kind.DoStatement
    || node.kind === Kind.WhileStatement
    || node.kind === Kind.ForStatement
    || node.kind === Kind.ForInStatement
    || node.kind === Kind.ForOfStatement
    || node.kind === Kind.ContinueStatement
    || node.kind === Kind.BreakStatement
    || node.kind === Kind.ReturnStatement
    || node.kind === Kind.WithStatement
    || node.kind === Kind.SwitchStatement
    || node.kind === Kind.LabeledStatement
    || node.kind === Kind.ThrowStatement
    || node.kind === Kind.TryStatement
    || node.kind === Kind.DebuggerStatement
    || node.kind === Kind.EmptyStatement
    || node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.ClassDeclaration
    || node.kind === Kind.InterfaceDeclaration
    || node.kind === Kind.TypeAliasDeclaration;
}

function declarationName(node: AstNode): string {
  const name = nameOf(node);
  if (name === undefined) return "";
  return (name as { readonly text?: string }).text ?? "";
}

function bindingNameContains(text: string, node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if (isIdentifier(node)) return node.text === text;
  return childNodes(node).some(child => bindingNameContains(text, child));
}

function isInJSFile(node: AstNode): boolean {
  const sourceFile = sourceFileOf(node);
  const flags = (sourceFile as { readonly flags?: number } | undefined)?.flags ?? 0;
  const fileName = (sourceFile as { readonly fileName?: string } | undefined)?.fileName ?? "";
  return (flags & (1 << 16)) !== 0 || /\.jsx?$/iu.test(fileName);
}

function sourceFileOf(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile || (current as { readonly fileName?: string }).fileName !== undefined) return current;
    current = parentOf(current);
  }
  return undefined;
}

function modifierKinds(node: AstNode): readonly Kind[] {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] | { readonly nodes?: readonly AstNode[] } }).modifiers;
  const nodes: readonly AstNode[] = Array.isArray(modifiers) ? modifiers : (modifiers as { readonly nodes?: readonly AstNode[] } | undefined)?.nodes ?? [];
  return nodes.map((modifier: AstNode) => modifier.kind);
}

function isStatic(node: AstNode): boolean {
  return modifierKinds(node).includes(Kind.StaticKeyword);
}

function isSuperCall(node: AstNode): boolean {
  return node.kind === Kind.CallExpression && expressionOf(node)?.kind === Kind.SuperKeyword;
}

function isFunctionLikeNode(node: AstNode): boolean {
  return node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.ArrowFunction
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.Constructor;
}
