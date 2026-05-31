import {
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
  if (isTypeReferenceNode(node) || isImportTypeNode(node)) checkTypeReferenceOrImport(node, state);
  else if (isTypeLiteralNode(node)) checkTypeLiteral(node, state);
  else if (isArrayTypeNode(node)) checkTypeNode(node.elementType, state);
  else if (isTupleTypeNode(node)) for (const element of node.elements) checkTypeNode(element as TypeNode, state);
  else if (isUnionTypeNode(node) || isIntersectionTypeNode(node)) for (const type of node.types) checkTypeNode(type, state);
  else if (isParenthesizedTypeNode(node)) checkTypeNode(node.type, state);
  else if (isFunctionTypeNode(node) || isConstructorTypeNode(node)) checkSignatureDeclaration(node, state);
  else if (isConditionalTypeNode(node)) {
    checkTypeNode(node.checkType, state);
    checkTypeNode(node.extendsType, state);
    checkTypeNode(node.trueType, state);
    checkTypeNode(node.falseType, state);
  } else if (isInferTypeNode(node)) {
    checkTypeParameter(node.typeParameter, state);
  } else if (isTypeOperatorNode(node)) {
    checkTypeNode(node.type, state);
  } else if (isIndexedAccessTypeNode(node)) {
    checkTypeNode(node.objectType, state);
    checkTypeNode(node.indexType, state);
  } else if (isMappedTypeNode(node)) {
    checkTypeParameter(node.typeParameter, state);
    if (node.type !== undefined) checkTypeNode(node.type, state);
  } else if (isTemplateLiteralTypeNode(node)) {
    for (const span of node.templateSpans) checkTypeNode(span.type, state);
  } else if (isNamedTupleMember(node)) {
    checkTypeNode(node.type, state);
  } else if (isTypePredicateNode(node) || isTypeQueryNode(node) || isThisTypeNode(node)) {
    typeFromTypeNode(node, state);
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
