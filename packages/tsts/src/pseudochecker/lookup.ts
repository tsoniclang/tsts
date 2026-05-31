import {
  findAncestor,
  getFunctionFlags,
  hasModifier,
  isAssertionExpression,
  isCallExpression,
  isFunctionLike,
  isJsxElement,
  isJsxExpression,
  isSatisfiesExpression,
  Kind,
  NodeFlags,
  type Node,
  type NodeArray,
  type ParameterDeclaration,
  type TypeParameterDeclaration,
} from "../ast/index.js";
import { some } from "../core/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";

import type { PseudoCheckerState } from "./checker.js";
import {
  asPseudoTypeDirect,
  asPseudoTypeInferred,
  asPseudoTypeMaybeConstLocation,
  asPseudoTypeUnion,
  newPseudoGetAccessor,
  newPseudoObjectMethod,
  newPseudoParameter,
  newPseudoPropertyAssignment,
  newPseudoSetAccessor,
  newPseudoTypeBigIntLiteral,
  newPseudoTypeDirect,
  newPseudoTypeInferred,
  newPseudoTypeInferredWithErrors,
  newPseudoTypeMaybeConstLocation,
  newPseudoTypeNoResult,
  newPseudoTypeNumericLiteral,
  newPseudoTypeObjectLiteral,
  newPseudoTypeSingleCallSignature,
  newPseudoTypeStringLiteral,
  newPseudoTypeTuple,
  newPseudoTypeUnion,
  PseudoTypeAny,
  PseudoTypeBigInt,
  PseudoTypeBoolean,
  PseudoTypeFalse,
  PseudoTypeKind,
  PseudoTypeNull,
  PseudoTypeNumber,
  PseudoTypeString,
  PseudoTypeTrue,
  PseudoTypeUndefined,
  type PseudoObjectElement,
  type PseudoParameter,
  type PseudoType,
} from "./type.js";

type NodeCarrier = Node & {
  readonly body?: Node;
  readonly declaration?: Node;
  readonly declarations?: readonly Node[];
  readonly dotDotDotToken?: Node;
  readonly elements?: NodeArray<Node>;
  readonly expression?: Node;
  readonly fullSignature?: Node;
  readonly initializer?: Node;
  readonly left?: Node;
  readonly name?: Node;
  readonly operand?: Node;
  readonly operator?: Kind;
  readonly parent?: Node;
  readonly parameters?: NodeArray<Node>;
  readonly postfixToken?: Node;
  readonly properties?: NodeArray<Node>;
  readonly questionToken?: Node;
  readonly returnType?: Node;
  readonly right?: Node;
  readonly symbol?: { readonly declarations?: readonly Node[] };
  readonly text?: string;
  readonly type?: Node;
  readonly typeName?: Node;
  readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
  readonly types?: NodeArray<Node>;
};

export function getReturnTypeOfSignature(ch: PseudoCheckerState, signatureNode: Node): PseudoType {
  switch (signatureNode.kind) {
    case Kind.GetAccessor:
      return getTypeOfAccessor(ch, signatureNode);
    case Kind.MethodDeclaration:
    case Kind.FunctionDeclaration:
    case Kind.Constructor:
    case Kind.MethodSignature:
    case Kind.CallSignature:
    case Kind.ConstructSignature:
    case Kind.SetAccessor:
    case Kind.IndexSignature:
    case Kind.FunctionType:
    case Kind.ConstructorType:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.JSDocSignature:
      return createReturnFromSignature(ch, signatureNode);
    default:
      return newPseudoTypeNoResult(signatureNode);
  }
}

export function getTypeOfAccessor(ch: PseudoCheckerState, accessor: Node): PseudoType {
  const annotated = typeFromAccessor(ch, accessor);
  if (annotated.kind === PseudoTypeKind.NoResult) return inferAccessorType(ch, accessor);
  return annotated;
}

export function getTypeOfExpression(ch: PseudoCheckerState, node: Node): PseudoType {
  return typeFromExpression(ch, node);
}

export function getTypeOfDeclaration(ch: PseudoCheckerState, node: Node): PseudoType {
  switch (node.kind) {
    case Kind.Parameter:
      return typeFromParameter(ch, node as ParameterDeclaration);
    case Kind.VariableDeclaration:
      return typeFromVariable(ch, node);
    case Kind.PropertySignature:
    case Kind.PropertyDeclaration:
    case Kind.JSDocPropertyTag:
      return typeFromProperty(ch, node);
    case Kind.BindingElement:
      return newPseudoTypeNoResult(node);
    case Kind.ExportAssignment:
      return typeFromExpression(ch, requireNode(nodeField(node, "expression"), node));
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
    case Kind.BinaryExpression:
      return typeFromExpandoProperty(node);
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
      return typeFromPropertyAssignment(ch, node);
    case Kind.CallExpression:
      return newPseudoTypeNoResult(node);
    default:
      return newPseudoTypeNoResult(node);
  }
}

function typeFromPropertyAssignment(ch: PseudoCheckerState, node: Node): PseudoType {
  const annotation = nodeType(node);
  if (annotation !== undefined) return newPseudoTypeDirect(annotation);
  if (node.kind === Kind.PropertyAssignment) {
    const initializer = nodeField(node, "initializer");
    if (initializer !== undefined) {
      const expr = typeFromExpression(ch, initializer);
      if (expr.kind !== PseudoTypeKind.Inferred || asPseudoTypeInferred(expr).errorNodes.length > 0) return expr;
    }
  }
  return newPseudoTypeNoResult(node);
}

function typeFromExpandoProperty(node: Node): PseudoType {
  const declaredType = nodeType(node);
  if (declaredType !== undefined) return newPseudoTypeDirect(declaredType);
  return newPseudoTypeNoResult(node);
}

function typeFromProperty(ch: PseudoCheckerState, node: Node): PseudoType {
  const declaredType = nodeType(node);
  if (declaredType !== undefined) return newPseudoTypeDirect(declaredType);
  if (node.kind === Kind.PropertyDeclaration) {
    const initializer = nodeField(node, "initializer");
    if (initializer !== undefined && !isContextuallyTyped(node)) {
      if (hasModifier(node, ModifierFlags.Readonly) && initializer.kind === Kind.TemplateExpression) {
        return newPseudoTypeNoResult(node);
      }
      const expr = typeFromExpression(ch, initializer);
      if (expr.kind !== PseudoTypeKind.Inferred || asPseudoTypeInferred(expr).errorNodes.length > 0) {
        const postfixToken = nodeField(node, "postfixToken");
        if (expr.kind !== PseudoTypeKind.Direct && postfixToken?.kind === Kind.QuestionToken) {
          return addUndefinedIfDefinitelyRequired(expr);
        }
        return expr;
      }
    }
  }
  return newPseudoTypeNoResult(node);
}

function typeFromVariable(ch: PseudoCheckerState, declaration: Node): PseudoType {
  const declaredType = nodeType(declaration);
  if (declaredType !== undefined) return newPseudoTypeDirect(declaredType);
  const initializer = nodeField(declaration, "initializer");
  if (initializer !== undefined && !isContextuallyTyped(declaration)) {
    if (isVarConst(declaration) && initializer.kind === Kind.TemplateExpression) return newPseudoTypeNoResult(declaration);
    const expr = typeFromExpression(ch, initializer);
    if (expr.kind !== PseudoTypeKind.Inferred || asPseudoTypeInferred(expr).errorNodes.length > 0) return expr;
  }
  return newPseudoTypeNoResult(declaration);
}

function typeFromAccessor(ch: PseudoCheckerState, accessor: Node): PseudoType {
  const accessors = getAllAccessorDeclarationsForDeclaration(accessor);
  const accessorType = getTypeAnnotationFromAllAccessorDeclarations(accessor, accessors);
  if (accessorType !== undefined && accessorType.kind !== Kind.TypePredicate) return newPseudoTypeDirect(accessorType);
  if (accessors.getAccessor !== undefined) return createReturnFromSignature(ch, accessors.getAccessor);
  return newPseudoTypeNoResult(accessor);
}

function inferAccessorType(ch: PseudoCheckerState, node: Node): PseudoType {
  if (node.kind === Kind.GetAccessor) return createReturnFromSignature(ch, node);
  return newPseudoTypeNoResult(node);
}

interface AccessorDeclarations {
  readonly firstAccessor: Node;
  readonly secondAccessor: Node | undefined;
  readonly getAccessor: Node | undefined;
  readonly setAccessor: Node | undefined;
}

function getAllAccessorDeclarationsForDeclaration(accessor: Node): AccessorDeclarations {
  const declarations = (accessor as NodeCarrier).symbol?.declarations ?? [accessor];
  const accessors = declarations.filter((node) => node.kind === Kind.GetAccessor || node.kind === Kind.SetAccessor);
  const firstAccessor = accessors[0] ?? accessor;
  return {
    firstAccessor,
    secondAccessor: accessors[1],
    getAccessor: accessors.find((node) => node.kind === Kind.GetAccessor),
    setAccessor: accessors.find((node) => node.kind === Kind.SetAccessor),
  };
}

function getTypeAnnotationFromAllAccessorDeclarations(node: Node, accessors: AccessorDeclarations): Node | undefined {
  let accessorType = getTypeAnnotationFromAccessor(node);
  if (accessorType === undefined && node !== accessors.firstAccessor) accessorType = getTypeAnnotationFromAccessor(accessors.firstAccessor);
  if (accessorType === undefined && accessors.secondAccessor !== undefined && node !== accessors.secondAccessor) {
    accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
  }
  return accessorType;
}

function getTypeAnnotationFromAccessor(node: Node | undefined): Node | undefined {
  if (node === undefined) return undefined;
  if (node.kind === Kind.GetAccessor) return nodeType(node);
  const parameter = nodeParameters(node)[0];
  return parameter === undefined ? undefined : nodeType(parameter);
}

function isValueSignatureDeclaration(node: Node): boolean {
  switch (node.kind) {
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.MethodDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.FunctionDeclaration:
    case Kind.Constructor:
      return true;
  }
  return false;
}

function createReturnFromSignature(ch: PseudoCheckerState, fn: Node): PseudoType {
  if (isFunctionLike(fn)) {
    const returnType = nodeType(fn);
    if (returnType !== undefined) return newPseudoTypeDirect(returnType);
  }
  if (isValueSignatureDeclaration(fn)) return typeFromSingleReturnExpression(ch, fn);
  return newPseudoTypeNoResult(fn);
}

function typeFromSingleReturnExpression(ch: PseudoCheckerState, fn: Node): PseudoType {
  let candidateExpression: Node | undefined;
  const body = nodeBody(fn);
  if (body !== undefined && !nodeIsMissing(body)) {
    if ((getFunctionFlags(fn) & FunctionFlags.AsyncGenerator) !== 0) return newPseudoTypeNoResult(fn);
    if (body.kind === Kind.Block) {
      forEachReturnStatement(body, (stmt) => {
        if (stmt.parent !== body) {
          candidateExpression = undefined;
          return true;
        }
        const expr = nodeField(stmt, "expression");
        if (candidateExpression === undefined) {
          candidateExpression = expr;
          return false;
        }
        candidateExpression = undefined;
        return true;
      });
    } else {
      candidateExpression = body;
    }
  }
  if (candidateExpression !== undefined) {
    if (isContextuallyTyped(candidateExpression)) {
      const assertedType = assertionType(candidateExpression);
      if (assertedType !== undefined && !isConstTypeReference(assertedType)) return newPseudoTypeDirect(assertedType);
    } else {
      return typeFromExpression(ch, candidateExpression);
    }
  }
  return newPseudoTypeNoResult(fn);
}

function typeFromExpression(ch: PseudoCheckerState, node: Node): PseudoType {
  switch (node.kind) {
    case Kind.OmittedExpression:
      return PseudoTypeUndefined;
    case Kind.ParenthesizedExpression:
      return typeFromExpression(ch, requireNode(nodeField(node, "expression"), node));
    case Kind.Identifier:
      if (nodeText(node) === "undefined") return PseudoTypeUndefined;
      break;
    case Kind.NullKeyword:
      return PseudoTypeNull;
    case Kind.ArrowFunction:
    case Kind.FunctionExpression:
      return typeFromFunctionLikeExpression(ch, node);
    case Kind.TypeAssertionExpression:
    case Kind.AsExpression:
      return typeFromTypeAssertion(ch, requireNode(nodeField(node, "expression"), node), requireNode(nodeType(node), node));
    case Kind.PrefixUnaryExpression:
      if (isPrimitiveLiteralValue(node, true)) return typeFromPrimitiveLiteralPrefix(node);
      break;
    case Kind.ArrayLiteralExpression:
      return typeFromArrayLiteral(ch, node);
    case Kind.ObjectLiteralExpression:
      return typeFromObjectLiteral(ch, node);
    case Kind.ClassExpression:
      return newPseudoTypeInferred(node);
    case Kind.TemplateExpression:
      if (isInConstContext(node)) return newPseudoTypeInferred(node);
      return newPseudoTypeMaybeConstLocation(node, newPseudoTypeInferred(node), PseudoTypeString);
    case Kind.NumericLiteral:
      return newPseudoTypeMaybeConstLocation(node, newPseudoTypeNumericLiteral(node), PseudoTypeNumber);
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.StringLiteral:
      return newPseudoTypeMaybeConstLocation(node, newPseudoTypeStringLiteral(node), PseudoTypeString);
    case Kind.BigIntLiteral:
      return newPseudoTypeMaybeConstLocation(node, newPseudoTypeBigIntLiteral(node), PseudoTypeBigInt);
    case Kind.TrueKeyword:
      return newPseudoTypeMaybeConstLocation(node, PseudoTypeTrue, PseudoTypeBoolean);
    case Kind.FalseKeyword:
      return newPseudoTypeMaybeConstLocation(node, PseudoTypeFalse, PseudoTypeBoolean);
  }
  return newPseudoTypeInferred(node);
}

function typeFromObjectLiteral(ch: PseudoCheckerState, node: Node): PseudoType {
  const errorNodes = canGetTypeFromObjectLiteral(node);
  if (errorNodes !== undefined) return newPseudoTypeInferredWithErrors(node, errorNodes);
  const properties = nodeProperties(node);
  if (properties.length === 0) return newPseudoTypeObjectLiteral([]);
  const results: PseudoObjectElement[] = [];
  for (const element of properties) {
    switch (element.kind) {
      case Kind.MethodDeclaration: {
        const optional = nodeField(element, "postfixToken")?.kind === Kind.QuestionToken;
        const fullSignature = nodeField(element, "fullSignature");
        if (fullSignature !== undefined) {
          results.push(newPseudoPropertyAssignment(false, requireNode(nodeName(element), element), optional, newPseudoTypeDirect(fullSignature)));
        } else {
          results.push(newPseudoObjectMethod(
            element,
            requireNode(nodeName(element), element),
            optional,
            cloneTypeParameters(nodeTypeParameters(element)),
            cloneParameters(ch, nodeParameters(element)),
            createReturnFromSignature(ch, element),
          ));
        }
        break;
      }
      case Kind.PropertyAssignment:
        results.push(newPseudoPropertyAssignment(
          false,
          requireNode(nodeName(element), element),
          nodeField(element, "postfixToken")?.kind === Kind.QuestionToken,
          typeFromExpression(ch, requireNode(nodeField(element, "initializer"), element)),
        ));
        break;
      case Kind.SetAccessor:
      case Kind.GetAccessor: {
        const member = getAccessorMember(ch, element, requireNode(nodeName(element), element));
        if (member !== undefined) results.push(member);
        break;
      }
    }
  }
  return newPseudoTypeObjectLiteral(results);
}

function getAccessorMember(ch: PseudoCheckerState, accessor: Node, name: Node): PseudoObjectElement | undefined {
  const allAccessors = getAllAccessorDeclarationsForDeclaration(accessor);
  const getType = allAccessors.getAccessor === undefined ? undefined : nodeType(allAccessors.getAccessor);
  const setParameter = allAccessors.setAccessor === undefined ? undefined : nodeParameters(allAccessors.setAccessor)[0];
  const setType = setParameter === undefined ? undefined : nodeType(setParameter);
  if (getType !== undefined && setType !== undefined) {
    if (accessor.kind === Kind.GetAccessor) return newPseudoGetAccessor(accessor, name, false, typeFromAccessor(ch, accessor));
    const parameter = cloneParameters(ch, nodeParameters(accessor))[0];
    return parameter === undefined ? undefined : newPseudoSetAccessor(accessor, name, false, parameter);
  }
  if (accessor === allAccessors.firstAccessor) {
    const readonly = accessor.kind === Kind.GetAccessor && allAccessors.secondAccessor === undefined;
    return newPseudoPropertyAssignment(readonly, name, false, typeFromAccessor(ch, accessor));
  }
  return undefined;
}

function canGetTypeFromObjectLiteral(node: Node): readonly Node[] | undefined {
  const properties = nodeProperties(node);
  if (properties.length === 0) return undefined;
  const errorNodes: Node[] = [];
  for (const element of properties) {
    if ((element.flags & NodeFlags.ThisNodeHasError) !== 0) {
      errorNodes.push(element);
      continue;
    }
    if (element.kind === Kind.ShorthandPropertyAssignment || element.kind === Kind.SpreadAssignment) {
      errorNodes.push(element);
      continue;
    }
    const name = nodeName(element);
    if (name === undefined) continue;
    if ((name.flags & NodeFlags.ThisNodeHasError) !== 0 || name.kind === Kind.PrivateIdentifier) {
      errorNodes.push(name);
      continue;
    }
    if (name.kind === Kind.ComputedPropertyName) {
      const expression = nodeField(name, "expression");
      if (expression === undefined || !isPrimitiveLiteralValue(expression, false)) errorNodes.push(name);
    }
  }
  return errorNodes.length === 0 ? undefined : errorNodes;
}

function typeFromArrayLiteral(ch: PseudoCheckerState, node: Node): PseudoType {
  const errorNodes = canGetTypeFromArrayLiteral(node);
  if (errorNodes !== undefined) return newPseudoTypeInferredWithErrors(node, errorNodes);
  if (isInConstContext(node) && isContextuallyTyped(node)) return newPseudoTypeInferred(node);
  return newPseudoTypeTuple(nodeElements(node).map((element) => typeFromExpression(ch, element)));
}

function canGetTypeFromArrayLiteral(node: Node): readonly Node[] | undefined {
  if (!isInConstContext(node)) return [node];
  for (const element of nodeElements(node)) {
    if (element.kind === Kind.SpreadElement) return [element];
  }
  return undefined;
}

function isConstContextPropagatingKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
    case Kind.ParenthesizedExpression:
    case Kind.SpreadElement:
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.TemplateSpan:
    case Kind.PrefixUnaryExpression:
      return true;
  }
  return false;
}

export function isInConstContext(node: Node): boolean {
  const maybeAssertion = findAncestor(node.parent, (current) => isAssertionExpression(current) || !isConstContextPropagatingKind(current.kind));
  return maybeAssertion !== undefined && isConstAssertion(maybeAssertion);
}

function typeFromPrimitiveLiteralPrefix(node: Node): PseudoType {
  const operand = requireNode(nodeField(node, "operand"), node);
  const expr = (node as NodeCarrier).operator === Kind.PlusToken ? operand : node;
  if (operand.kind === Kind.BigIntLiteral) return newPseudoTypeMaybeConstLocation(node, newPseudoTypeBigIntLiteral(expr), PseudoTypeBigInt);
  if (operand.kind === Kind.NumericLiteral) return newPseudoTypeMaybeConstLocation(node, newPseudoTypeNumericLiteral(expr), PseudoTypeNumber);
  return newPseudoTypeInferred(node);
}

function typeFromTypeAssertion(ch: PseudoCheckerState, expression: Node, typeNode: Node): PseudoType {
  if (isConstTypeReference(typeNode)) return typeFromExpression(ch, expression);
  return newPseudoTypeDirect(typeNode);
}

function typeFromFunctionLikeExpression(ch: PseudoCheckerState, node: Node): PseudoType {
  const fullSignature = nodeField(node, "fullSignature");
  if (fullSignature !== undefined) return newPseudoTypeDirect(fullSignature);
  const returnType = createReturnFromSignature(ch, node);
  if (returnType.kind === PseudoTypeKind.NoResult) return newPseudoTypeInferred(node);
  return newPseudoTypeSingleCallSignature(
    node,
    cloneParameters(ch, nodeParameters(node)),
    cloneTypeParameters(nodeTypeParameters(node)),
    returnType,
  );
}

function cloneTypeParameters(nodes: readonly TypeParameterDeclaration[] | undefined): readonly TypeParameterDeclaration[] {
  return nodes === undefined || nodes.length === 0 ? [] : [...nodes];
}

function isUndefinedPseudoType(type: PseudoType): boolean {
  return type.kind === PseudoTypeKind.Undefined
    || (type.kind === PseudoTypeKind.MaybeConstLocation && isUndefinedPseudoType(asPseudoTypeMaybeConstLocation(type).constType));
}

function typeNodeCouldReferToUndefined(node: Node): boolean {
  let current = node;
  while (current.kind === Kind.ParenthesizedType) current = requireNode(nodeType(current), current);
  switch (current.kind) {
    case Kind.TypeReference:
    case Kind.IndexedAccessType:
    case Kind.TypeQuery:
    case Kind.OptionalType:
    case Kind.RestType:
    case Kind.ImportType:
    case Kind.ConditionalType:
    case Kind.TypeOperator:
    case Kind.TypePredicate:
    case Kind.UndefinedKeyword:
      return true;
    case Kind.IntersectionType:
    case Kind.UnionType:
      return some(nodeTypes(current), typeNodeCouldReferToUndefined);
    default:
      return false;
  }
}

function couldAlreadyReferToUndefinedType(type: PseudoType): boolean {
  if (type.kind === PseudoTypeKind.NoResult || type.kind === PseudoTypeKind.Inferred || isUndefinedPseudoType(type)) return true;
  if (type.kind === PseudoTypeKind.MaybeConstLocation) return couldAlreadyReferToUndefinedType(asPseudoTypeMaybeConstLocation(type).regularType);
  if (type.kind === PseudoTypeKind.Direct) return typeNodeCouldReferToUndefined(asPseudoTypeDirect(type).typeNode);
  if (type.kind === PseudoTypeKind.Union) return some(asPseudoTypeUnion(type).types, couldAlreadyReferToUndefinedType);
  return false;
}

function isOptionalInitializedOrRestParameter(node: Node): boolean {
  const carrier = node as NodeCarrier;
  return carrier.dotDotDotToken !== undefined || carrier.initializer !== undefined || carrier.questionToken !== undefined;
}

function lastRequiredParamIndex(parameters: readonly Node[]): number {
  for (let index = parameters.length - 1; index >= 0; index -= 1) {
    if (!isOptionalInitializedOrRestParameter(parameters[index]!)) return index + 1;
  }
  return 0;
}

function addUndefinedIfDefinitelyRequired(expr: PseudoType): PseudoType {
  if (couldAlreadyReferToUndefinedType(expr)) return expr;
  return newPseudoTypeUnion([expr, PseudoTypeUndefined]);
}

function typeFromParameter(ch: PseudoCheckerState, node: ParameterDeclaration): PseudoType {
  const parent = node.parent;
  if (parent.kind === Kind.SetAccessor) return getTypeOfAccessor(ch, parent);
  if (node.initializer === undefined) {
    if (node.type !== undefined) return newPseudoTypeDirect(node.type);
    return newPseudoTypeNoResult(node);
  }
  const parameters = nodeParameters(parent);
  const selfIndex = parameters.indexOf(node);
  const lastRequired = lastRequiredParamIndex(parameters);
  return typeFromParameterWorker(ch, node, selfIndex, lastRequired);
}

function typeFromParameterWorker(ch: PseudoCheckerState, node: ParameterDeclaration, selfIndex: number, lastRequired: number): PseudoType {
  const parent = node.parent;
  if (parent.kind === Kind.SetAccessor) return getTypeOfAccessor(ch, parent);
  const hasRequiredAfter = selfIndex < lastRequired - 1;
  if (node.type !== undefined) {
    const result = newPseudoTypeDirect(node.type);
    if (ch.strictNullChecks && node.initializer !== undefined && hasRequiredAfter) return addUndefinedIfDefinitelyRequired(result);
    return result;
  }
  if (node.initializer !== undefined && node.name.kind === Kind.Identifier && !isContextuallyTyped(node)) {
    const expr = typeFromExpression(ch, node.initializer);
    if (!ch.strictNullChecks || !hasRequiredAfter) return expr;
    return addUndefinedIfDefinitelyRequired(expr);
  }
  return newPseudoTypeNoResult(node);
}

function cloneParameters(ch: PseudoCheckerState, nodes: readonly Node[]): readonly PseudoParameter[] {
  if (nodes.length === 0) return [];
  const lastRequired = lastRequiredParamIndex(nodes);
  return nodes.map((node, index) => {
    const parameter = node as ParameterDeclaration;
    let optional = parameter.questionToken !== undefined;
    if (!optional && parameter.initializer !== undefined) optional = index >= lastRequired - 1;
    return newPseudoParameter(
      parameter.dotDotDotToken !== undefined,
      parameter.name,
      optional,
      typeFromParameterWorker(ch, parameter, index, lastRequired),
    );
  });
}

function isContextuallyTyped(node: Node): boolean {
  return findAncestor(node.parent, (current) => {
    if (isCallExpression(current) || isSatisfiesExpression(current)) return true;
    if ((isVariableParameterOrProperty(current) || isAssertionExpression(current)) && nodeType(current) !== undefined && !isConstAssertion(current)) return true;
    return isJsxElement(current) || isJsxExpression(current);
  }) !== undefined;
}

const FunctionFlags = {
  AsyncGenerator: 1 << 3,
} as const;

function isVariableParameterOrProperty(node: Node): boolean {
  return node.kind === Kind.VariableDeclaration || node.kind === Kind.Parameter || node.kind === Kind.PropertyDeclaration || node.kind === Kind.PropertySignature;
}

function isPrimitiveLiteralValue(node: Node, includePrefixUnary: boolean): boolean {
  if (node.kind === Kind.StringLiteral || node.kind === Kind.NoSubstitutionTemplateLiteral || node.kind === Kind.NumericLiteral || node.kind === Kind.BigIntLiteral) return true;
  if (node.kind === Kind.TrueKeyword || node.kind === Kind.FalseKeyword || node.kind === Kind.NullKeyword) return true;
  if (!includePrefixUnary || node.kind !== Kind.PrefixUnaryExpression) return false;
  const operand = nodeField(node, "operand");
  return operand?.kind === Kind.NumericLiteral || operand?.kind === Kind.BigIntLiteral;
}

function isConstAssertion(node: Node | undefined): boolean {
  return node !== undefined && isAssertionExpression(node) && isConstTypeReference(nodeType(node));
}

function isConstTypeReference(node: Node | undefined): boolean {
  const expressionName = nodeField(node, "typeName") ?? node;
  return expressionName?.kind === Kind.Identifier && nodeText(expressionName) === "const";
}

function isVarConst(node: Node): boolean {
  return hasModifier(node, ModifierFlags.Const);
}

function assertionType(node: Node): Node | undefined {
  if (node.kind !== Kind.TypeAssertionExpression && node.kind !== Kind.AsExpression) return undefined;
  return nodeType(node);
}

function forEachReturnStatement(node: Node, cb: (node: Node) => boolean): void {
  visit(node);
  function visit(current: Node): boolean {
    if (current.kind === Kind.ReturnStatement && cb(current)) return true;
    let stop = false;
    current.forEachChild((child) => {
      if (stop) return true;
      stop = visit(child);
      return stop;
    });
    return stop;
  }
}

function nodeIsMissing(node: Node | undefined): boolean {
  return node === undefined || node.pos < 0 || node.end < 0;
}

function nodeField(node: Node | undefined, key: keyof NodeCarrier): Node | undefined {
  return node === undefined ? undefined : (node as NodeCarrier)[key] as Node | undefined;
}

function nodeBody(node: Node): Node | undefined {
  return nodeField(node, "body");
}

function nodeName(node: Node): Node | undefined {
  return nodeField(node, "name");
}

function nodeType(node: Node | undefined): Node | undefined {
  return nodeField(node, "type");
}

function nodeText(node: Node): string {
  return (node as NodeCarrier).text ?? "";
}

function nodeElements(node: Node): readonly Node[] {
  return (node as NodeCarrier).elements ?? [];
}

function nodeParameters(node: Node): readonly Node[] {
  return (node as NodeCarrier).parameters ?? [];
}

function nodeProperties(node: Node): readonly Node[] {
  return (node as NodeCarrier).properties ?? [];
}

function nodeTypeParameters(node: Node): readonly TypeParameterDeclaration[] | undefined {
  return (node as NodeCarrier).typeParameters;
}

function nodeTypes(node: Node): readonly Node[] {
  return (node as NodeCarrier).types ?? [];
}

function requireNode(node: Node | undefined, owner: Node): Node {
  if (node === undefined) throw new Error("pseudochecker: required child missing on " + Kind[owner.kind]);
  return node;
}
