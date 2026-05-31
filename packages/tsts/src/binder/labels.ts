import type { FlowLabel, FlowNode, Node } from "../ast/index.js";
import { Kind, nodeName, nodeParent } from "../ast/index.js";
import { createBranchLabel } from "./flow.js";

export interface BinderActiveLabel {
  readonly name: string;
  readonly statement: Node;
  readonly breakTarget: FlowLabel;
  readonly continueTarget: FlowLabel | undefined;
}

export interface BinderLabelEnvironment {
  readonly labels: readonly BinderActiveLabel[];
  readonly currentBreakTarget: FlowLabel | undefined;
  readonly currentContinueTarget: FlowLabel | undefined;
}

export function createLabelEnvironment(): BinderLabelEnvironment {
  return { labels: [], currentBreakTarget: undefined, currentContinueTarget: undefined };
}

export function pushLabeledStatement(
  environment: BinderLabelEnvironment,
  statement: Node,
): BinderLabelEnvironment {
  const labelName = labelText(statement);
  const breakTarget = createBranchLabel();
  const active: BinderActiveLabel = {
    name: labelName,
    statement,
    breakTarget,
    continueTarget: isContinueTargetStatement(statement) ? createBranchLabel() : undefined,
  };
  return {
    labels: [...environment.labels, active],
    currentBreakTarget: environment.currentBreakTarget,
    currentContinueTarget: environment.currentContinueTarget,
  };
}

export function pushLoopStatement(
  environment: BinderLabelEnvironment,
  statement: Node,
  breakTarget: FlowLabel,
  continueTarget: FlowLabel,
): BinderLabelEnvironment {
  const labelName = labelText(parentLabel(statement));
  const active: BinderActiveLabel = { name: labelName, statement, breakTarget, continueTarget };
  return {
    labels: labelName === "" ? environment.labels : [...environment.labels, active],
    currentBreakTarget: breakTarget,
    currentContinueTarget: continueTarget,
  };
}

export function pushSwitchStatement(
  environment: BinderLabelEnvironment,
  statement: Node,
  breakTarget: FlowLabel,
): BinderLabelEnvironment {
  const labelName = labelText(parentLabel(statement));
  const active: BinderActiveLabel = { name: labelName, statement, breakTarget, continueTarget: undefined };
  return {
    labels: labelName === "" ? environment.labels : [...environment.labels, active],
    currentBreakTarget: breakTarget,
    currentContinueTarget: environment.currentContinueTarget,
  };
}

export function findActiveLabel(
  environment: BinderLabelEnvironment,
  labelName: string,
): BinderActiveLabel | undefined {
  for (let index = environment.labels.length - 1; index >= 0; index -= 1) {
    const label = environment.labels[index]!;
    if (label.name === labelName) return label;
  }
  return undefined;
}

export function getBreakTarget(
  environment: BinderLabelEnvironment,
  label: Node | undefined,
): FlowNode | undefined {
  if (label === undefined) return environment.currentBreakTarget;
  return findActiveLabel(environment, labelText(label))?.breakTarget;
}

export function getContinueTarget(
  environment: BinderLabelEnvironment,
  label: Node | undefined,
): FlowNode | undefined {
  if (label === undefined) return environment.currentContinueTarget;
  return findActiveLabel(environment, labelText(label))?.continueTarget;
}

export function statementCanHaveContinueTarget(statement: Node): boolean {
  return statement.kind === Kind.ForStatement ||
    statement.kind === Kind.ForInStatement ||
    statement.kind === Kind.ForOfStatement ||
    statement.kind === Kind.WhileStatement ||
    statement.kind === Kind.DoStatement;
}

export function isContinueTargetStatement(statement: Node): boolean {
  if (statementCanHaveContinueTarget(statement)) return true;
  if (statement.kind !== Kind.LabeledStatement) return false;
  const inner = field<Node>(statement, "statement");
  return inner !== undefined && isContinueTargetStatement(inner);
}

export function labelText(node: Node | undefined): string {
  if (node === undefined) return "";
  if (node.kind === Kind.LabeledStatement) {
    const label = field<Node>(node, "label");
    return labelText(label);
  }
  const name = nodeName(node) ?? node;
  return field<string>(name, "text") ?? "";
}

export function parentLabel(statement: Node): Node | undefined {
  let current = nodeParent(statement);
  while (current !== undefined && current.kind === Kind.LabeledStatement) {
    const inner = field<Node>(current, "statement");
    if (inner === statement) return current;
    current = nodeParent(current);
  }
  return undefined;
}

export function breakOrContinueLabel(node: Node): Node | undefined {
  if (node.kind !== Kind.BreakStatement && node.kind !== Kind.ContinueStatement) return undefined;
  return field<Node>(node, "label");
}

export function resolveBreakOrContinueTarget(
  environment: BinderLabelEnvironment,
  node: Node,
): FlowNode | undefined {
  const label = breakOrContinueLabel(node);
  if (node.kind === Kind.BreakStatement) return getBreakTarget(environment, label);
  if (node.kind === Kind.ContinueStatement) return getContinueTarget(environment, label);
  return undefined;
}

export function activeLabelNames(environment: BinderLabelEnvironment): readonly string[] {
  const names: string[] = [];
  for (const label of environment.labels) {
    if (label.name !== "") names.push(label.name);
  }
  return names;
}

export function hasActiveLabel(environment: BinderLabelEnvironment, labelName: string): boolean {
  return findActiveLabel(environment, labelName) !== undefined;
}

export function labelEnvironmentDepth(environment: BinderLabelEnvironment): number {
  return environment.labels.length;
}

export function popLabelEnvironment(environment: BinderLabelEnvironment): BinderLabelEnvironment {
  if (environment.labels.length === 0) return environment;
  return {
    labels: environment.labels.slice(0, environment.labels.length - 1),
    currentBreakTarget: environment.currentBreakTarget,
    currentContinueTarget: environment.currentContinueTarget,
  };
}

export function labelTargetsStatement(label: BinderActiveLabel, statement: Node): boolean {
  if (label.statement === statement) return true;
  let current = nodeParent(statement);
  while (current !== undefined) {
    if (current === label.statement) return true;
    current = nodeParent(current);
  }
  return false;
}

export function nearestLabelForStatement(
  environment: BinderLabelEnvironment,
  statement: Node,
): BinderActiveLabel | undefined {
  for (let index = environment.labels.length - 1; index >= 0; index -= 1) {
    const label = environment.labels[index]!;
    if (labelTargetsStatement(label, statement)) return label;
  }
  return undefined;
}

function field<T>(node: Node | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[key];
}
