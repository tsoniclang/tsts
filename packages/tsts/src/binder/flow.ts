import type { FlowLabel, FlowList, FlowNode, Node } from "../ast/index.js";
import {
  FlowFlags,
  Kind,
  binaryLeft,
  binaryOperatorKind,
  binaryRight,
  callExpressionArguments,
  callExpressionExpression,
  elementAccessExpressionOf,
  elementArgumentExpression,
  nodeExpression,
  nodeInitializer,
  nodeName,
  parenthesizedExpressionRO,
  prefixUnaryOperandRO,
  propertyAccessExpressionOf,
} from "../ast/index.js";

export interface ActiveLabel {
  readonly name: string;
  readonly breakTarget: FlowLabel;
  readonly continueTarget: FlowLabel | undefined;
}

export interface FlowBinderState {
  currentFlow: FlowNode | undefined;
  currentReturnTarget: FlowLabel | undefined;
  currentExceptionTarget: FlowLabel | undefined;
  activeLabels: readonly ActiveLabel[];
}

export function createFlowStart(): FlowNode {
  return { flags: FlowFlags.Start };
}

export function newFlowNode(flags: number): FlowNode {
  return { flags };
}

export function newFlowNodeEx(flags: number, node: Node | undefined, antecedent: FlowNode | undefined): FlowNode {
  const result: FlowNode = { flags };
  const mutable = result as FlowNode & { node?: Node; antecedent?: FlowNode };
  if (node !== undefined) mutable.node = node;
  if (antecedent !== undefined) mutable.antecedent = antecedent;
  return result;
}

export function createLoopLabel(): FlowLabel {
  return { flags: FlowFlags.LoopLabel, antecedents: undefined };
}

export function createBranchLabel(): FlowLabel {
  return { flags: FlowFlags.BranchLabel, antecedents: undefined };
}

export function createReduceLabel(
  target: FlowLabel,
  antecedents: FlowList | undefined,
  antecedent: FlowNode | undefined,
): FlowNode {
  const reduced = newFlowNodeEx(FlowFlags.ReduceLabel, undefined, antecedent);
  return { ...reduced, antecedents: antecedents ?? target.antecedents };
}

export function createFlowCondition(flags: number, antecedent: FlowNode | undefined, expression: Node | undefined): FlowNode | undefined {
  if (antecedent === undefined || isUnreachableFlow(antecedent)) return antecedent;
  if (expression === undefined) return antecedent;
  if ((flags & FlowFlags.TrueCondition) !== 0 && expression.kind === Kind.TrueKeyword) return antecedent;
  if ((flags & FlowFlags.FalseCondition) !== 0 && expression.kind === Kind.FalseKeyword) return antecedent;
  if ((flags & FlowFlags.TrueCondition) !== 0 && expression.kind === Kind.FalseKeyword) return unreachableFlow();
  if ((flags & FlowFlags.FalseCondition) !== 0 && expression.kind === Kind.TrueKeyword) return unreachableFlow();
  if (!isNarrowingExpression(expression)) return antecedent;
  setFlowNodeReferenced(antecedent);
  return newFlowNodeEx(flags, expression, antecedent);
}

export function createFlowMutation(flags: number, antecedent: FlowNode | undefined, node: Node | undefined): FlowNode | undefined {
  if (antecedent === undefined || isUnreachableFlow(antecedent)) return antecedent;
  if (node === undefined) return antecedent;
  setFlowNodeReferenced(antecedent);
  return newFlowNodeEx(flags, node, antecedent);
}

export function createFlowSwitchClause(
  antecedent: FlowNode | undefined,
  switchStatement: Node,
  clauseStart: number,
  clauseEnd: number,
): FlowNode | undefined {
  if (antecedent === undefined || isUnreachableFlow(antecedent)) return antecedent;
  setFlowNodeReferenced(antecedent);
  const node = withFlowRange(switchStatement, clauseStart, clauseEnd);
  return newFlowNodeEx(FlowFlags.SwitchClause, node, antecedent);
}

export function createFlowCall(antecedent: FlowNode | undefined, node: Node | undefined): FlowNode | undefined {
  if (antecedent === undefined || isUnreachableFlow(antecedent)) return antecedent;
  if (node === undefined) return antecedent;
  setFlowNodeReferenced(antecedent);
  return newFlowNodeEx(FlowFlags.Call, node, antecedent);
}

export function newFlowList(head: FlowNode, tail: FlowList | undefined): FlowList {
  return { head, tail };
}

export function combineFlowLists(head: FlowList | undefined, tail: FlowList | undefined): FlowList | undefined {
  if (head === undefined) return tail;
  if (tail === undefined) return head;
  const nodes: FlowNode[] = [];
  for (let current: FlowList | undefined = head; current !== undefined; current = current.tail) {
    nodes.push(current.head);
  }
  let result = tail;
  for (let index = nodes.length - 1; index >= 0; index -= 1) {
    result = newFlowList(nodes[index]!, result);
  }
  return result;
}

export function addAntecedent(label: FlowLabel, antecedent: FlowNode | undefined): void {
  if (antecedent === undefined || isUnreachableFlow(antecedent)) return;
  setFlowNodeReferenced(antecedent);
  label.antecedents = newFlowList(antecedent, label.antecedents);
}

export function finishFlowLabel(label: FlowLabel): FlowNode {
  const antecedents = label.antecedents;
  if (antecedents === undefined) return unreachableFlow();
  if (antecedents.tail === undefined) return antecedents.head;
  return { flags: label.flags, antecedents };
}

export function setFlowNodeReferenced(flow: FlowNode): void {
  const mutable = flow as FlowNode & { flags: number };
  if ((mutable.flags & FlowFlags.Referenced) === 0) {
    mutable.flags |= FlowFlags.Referenced;
  } else {
    mutable.flags |= FlowFlags.Shared;
  }
}

export function unreachableFlow(): FlowNode {
  return { flags: FlowFlags.Unreachable };
}

export function isUnreachableFlow(flow: FlowNode): boolean {
  return (flow.flags & FlowFlags.Unreachable) !== 0;
}

export function bindAssignmentTargetFlow(currentFlow: FlowNode | undefined, target: Node): FlowNode | undefined {
  if (isDestructuringTarget(target)) {
    return bindDestructuringTargetFlow(currentFlow, target);
  }
  if (isNarrowableReference(target)) {
    return createFlowMutation(FlowFlags.Assignment, currentFlow, target);
  }
  return currentFlow;
}

export function bindDestructuringTargetFlow(currentFlow: FlowNode | undefined, target: Node): FlowNode | undefined {
  let flow = currentFlow;
  forEachBindingTarget(target, (bindingTarget) => {
    flow = bindAssignmentTargetFlow(flow, bindingTarget);
  });
  return flow;
}

export function bindInitializedVariableFlow(currentFlow: FlowNode | undefined, declaration: Node): FlowNode | undefined {
  const initializer = nodeInitializer(declaration);
  const name = nodeName(declaration);
  if (initializer === undefined || name === undefined) return currentFlow;
  return bindAssignmentTargetFlow(currentFlow, name);
}

export function bindAccessExpressionFlow(currentFlow: FlowNode | undefined, expression: Node): FlowNode | undefined {
  if (!isNarrowableReference(expression)) return currentFlow;
  return createFlowMutation(FlowFlags.Assignment, currentFlow, expression);
}

export function bindCallExpressionFlow(currentFlow: FlowNode | undefined, expression: Node): FlowNode | undefined {
  const callee = callExpressionExpression(expression);
  if (!hasNarrowableArgument(expression) && !isNarrowableReference(callee)) return currentFlow;
  return createFlowCall(currentFlow, expression);
}

export function bindLogicalLikeExpression(
  currentFlow: FlowNode | undefined,
  expression: Node,
  trueTarget: FlowLabel,
  falseTarget: FlowLabel,
): FlowNode | undefined {
  if (expression.kind === Kind.BinaryExpression) {
    const operator = binaryOperatorKind(expression);
    if (operator === Kind.AmpersandAmpersandToken || operator === Kind.BarBarToken || operator === Kind.QuestionQuestionToken) {
      const left = binaryLeft(expression);
      const right = binaryRight(expression);
      const leftTrue = createBranchLabel();
      const leftFalse = createBranchLabel();
      bindCondition(left, leftTrue, leftFalse, currentFlow);
      if (operator === Kind.AmpersandAmpersandToken) {
        addAntecedent(falseTarget, finishFlowLabel(leftFalse));
        bindCondition(right, trueTarget, falseTarget, finishFlowLabel(leftTrue));
      } else if (operator === Kind.BarBarToken) {
        addAntecedent(trueTarget, finishFlowLabel(leftTrue));
        bindCondition(right, trueTarget, falseTarget, finishFlowLabel(leftFalse));
      } else {
        addAntecedent(trueTarget, finishFlowLabel(leftTrue));
        addAntecedent(falseTarget, finishFlowLabel(leftFalse));
        bindCondition(right, trueTarget, falseTarget, currentFlow);
      }
      return unreachableFlow();
    }
  }
  bindCondition(expression, trueTarget, falseTarget, currentFlow);
  return unreachableFlow();
}

export function bindCondition(
  expression: Node,
  trueTarget: FlowLabel,
  falseTarget: FlowLabel,
  currentFlow: FlowNode | undefined,
): void {
  if (expression.kind === Kind.ParenthesizedExpression || expression.kind === Kind.NonNullExpression) {
    bindCondition(nodeExpression(expression), trueTarget, falseTarget, currentFlow);
    return;
  }
  addAntecedent(trueTarget, createFlowCondition(FlowFlags.TrueCondition, currentFlow, expression));
  addAntecedent(falseTarget, createFlowCondition(FlowFlags.FalseCondition, currentFlow, expression));
}

export function isNarrowingExpression(expression: Node | undefined): boolean {
  if (expression === undefined) return false;
  switch (expression.kind) {
    case Kind.Identifier:
    case Kind.ThisKeyword:
      return true;
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
      return containsNarrowableReference(expression);
    case Kind.CallExpression:
      return hasNarrowableArgument(expression);
    case Kind.ParenthesizedExpression:
    case Kind.NonNullExpression:
      return isNarrowingExpression(nodeExpression(expression));
    case Kind.BinaryExpression:
      return isNarrowingBinaryExpression(expression);
    case Kind.PrefixUnaryExpression:
      return isNarrowingExpression(prefixUnaryOperandRO(expression));
  }
  return false;
}

export function containsNarrowableReference(expression: Node | undefined): boolean {
  if (expression === undefined) return false;
  if (isNarrowableReference(expression)) return true;
  if (expression.kind === Kind.CallExpression) return hasNarrowableArgument(expression);
  if (expression.kind === Kind.ParenthesizedExpression || expression.kind === Kind.NonNullExpression) {
    return containsNarrowableReference(nodeExpression(expression));
  }
  return false;
}

export function isNarrowableReference(node: Node | undefined): boolean {
  if (node === undefined) return false;
  switch (node.kind) {
    case Kind.Identifier:
    case Kind.ThisKeyword:
    case Kind.SuperKeyword:
    case Kind.MetaProperty:
      return true;
    case Kind.PropertyAccessExpression:
      return isNarrowableReference(propertyAccessExpressionOf(node));
    case Kind.ElementAccessExpression: {
      const argument = elementArgumentExpression(node);
      return isStringOrNumericLiteralLike(argument) && isNarrowableReference(elementAccessExpressionOf(node));
    }
    case Kind.ParenthesizedExpression:
    case Kind.NonNullExpression:
      return isNarrowableReference(nodeExpression(node));
  }
  return false;
}

export function hasNarrowableArgument(expression: Node): boolean {
  if (expression.kind !== Kind.CallExpression) return false;
  const callee = callExpressionExpression(expression);
  if (callee.kind === Kind.PropertyAccessExpression && isNarrowableReference(propertyAccessExpressionOf(callee))) {
    return true;
  }
  return callExpressionArguments(expression).some((argument) => containsNarrowableReference(argument));
}

export function isNarrowingBinaryExpression(expression: Node): boolean {
  const operator = binaryOperatorKind(expression);
  const left = binaryLeft(expression);
  const right = binaryRight(expression);
  switch (operator) {
    case Kind.EqualsEqualsToken:
    case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken:
    case Kind.ExclamationEqualsEqualsToken:
      return isNarrowableOperand(left) || isNarrowableOperand(right) || isNarrowingTypeOfOperands(left, right) || isNarrowingTypeOfOperands(right, left);
    case Kind.InstanceOfKeyword:
      return isNarrowableOperand(left);
    case Kind.InKeyword:
      return isNarrowingExpression(right);
    case Kind.AmpersandAmpersandToken:
    case Kind.BarBarToken:
    case Kind.QuestionQuestionToken:
      return isNarrowingExpression(left) || isNarrowingExpression(right);
  }
  return false;
}

export function isNarrowableOperand(expression: Node | undefined): boolean {
  if (expression === undefined) return false;
  switch (expression.kind) {
    case Kind.ParenthesizedExpression:
    case Kind.NonNullExpression:
      return isNarrowableOperand(nodeExpression(expression));
    case Kind.BinaryExpression:
      return isNarrowingBinaryExpression(expression);
    default:
      return containsNarrowableReference(expression);
  }
}

export function isNarrowingTypeOfOperands(left: Node, right: Node): boolean {
  return left.kind === Kind.TypeOfExpression && isStringLiteralLike(right) && isNarrowableOperand(nodeExpression(left));
}

export function isLogicalAssignmentExpression(node: Node): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const operator = binaryOperatorKind(node);
  return operator === Kind.AmpersandAmpersandEqualsToken ||
    operator === Kind.BarBarEqualsToken ||
    operator === Kind.QuestionQuestionEqualsToken;
}

export function isStatementCondition(node: Node | undefined): boolean {
  const parent = field<Node>(node, "parent");
  if (parent === undefined) return false;
  switch (parent.kind) {
    case Kind.IfStatement:
    case Kind.WhileStatement:
    case Kind.DoStatement:
      return field<Node>(parent, "expression") === node;
    case Kind.ForStatement:
      return field<Node>(parent, "condition") === node;
  }
  return false;
}

export function isTopLevelLogicalExpression(node: Node): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const operator = binaryOperatorKind(node);
  if (operator !== Kind.AmpersandAmpersandToken && operator !== Kind.BarBarToken && operator !== Kind.QuestionQuestionToken) return false;
  const parent = field<Node>(node, "parent");
  return parent === undefined || parent.kind !== Kind.BinaryExpression || !isLogicalOperator(binaryOperatorKind(parent));
}

export function isLogicalOperator(operator: Kind): boolean {
  return operator === Kind.AmpersandAmpersandToken ||
    operator === Kind.BarBarToken ||
    operator === Kind.QuestionQuestionToken;
}

export function forEachBindingTarget(node: Node, cb: (target: Node) => void): void {
  if (node.kind === Kind.ArrayBindingPattern || node.kind === Kind.ObjectBindingPattern) {
    for (const element of field<readonly Node[]>(node, "elements") ?? []) {
      forEachBindingTarget(element, cb);
    }
    return;
  }
  if (node.kind === Kind.BindingElement) {
    const name = nodeName(node);
    if (name !== undefined) forEachBindingTarget(name, cb);
    return;
  }
  cb(node);
}

export function isDestructuringTarget(node: Node): boolean {
  return node.kind === Kind.ArrayBindingPattern || node.kind === Kind.ObjectBindingPattern;
}

export function unwrapFlowExpression(node: Node): Node {
  let current = node;
  while (current.kind === Kind.ParenthesizedExpression || current.kind === Kind.NonNullExpression) {
    current = parenthesizedExpressionRO(current);
  }
  return current;
}

function isStringOrNumericLiteralLike(node: Node | undefined): boolean {
  return node !== undefined && (isStringLiteralLike(node) || node.kind === Kind.NumericLiteral || node.kind === Kind.BigIntLiteral);
}

function isStringLiteralLike(node: Node | undefined): boolean {
  return node !== undefined && (
    node.kind === Kind.StringLiteral ||
    node.kind === Kind.NoSubstitutionTemplateLiteral
  );
}

function withFlowRange(node: Node, clauseStart: number, clauseEnd: number): Node {
  return { ...node, clauseStart, clauseEnd } as Node;
}

function field<T>(node: Node | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[key];
}
