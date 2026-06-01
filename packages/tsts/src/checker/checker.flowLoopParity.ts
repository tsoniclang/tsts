/**
 * Flow-loop parity helpers.
 *
 * TS-Go's checker keeps loop reachability, antecedent ordering, assignment
 * invalidation, and deferred narrowing facts together in the flow graph. This
 * split keeps the same decisions explicit for the TypeScript port.
 */

export type FlowLoopEdgeKind =
  | "entry"
  | "condition"
  | "body"
  | "continue"
  | "break"
  | "exit"
  | "exception";

export type FlowLoopReachability =
  | "unknown"
  | "reachable"
  | "unreachable"
  | "conditionallyReachable";

export interface FlowLoopEdge {
  readonly from: number;
  readonly to: number;
  readonly kind: FlowLoopEdgeKind;
  readonly label?: string;
  readonly negated?: boolean;
}

export interface FlowLoopNode {
  readonly id: number;
  readonly antecedents: readonly number[];
  readonly assignments: readonly string[];
  readonly facts: ReadonlyMap<string, string>;
  readonly reachability: FlowLoopReachability;
}

export interface FlowLoopGraph {
  readonly entry: number;
  readonly exit: number;
  readonly nodes: ReadonlyMap<number, FlowLoopNode>;
  readonly edges: readonly FlowLoopEdge[];
}

export interface FlowLoopWorkItem {
  readonly node: number;
  readonly reason: FlowLoopEdgeKind;
  readonly generation: number;
}

export interface FlowLoopSummary {
  readonly reachableNodes: readonly number[];
  readonly unreachableNodes: readonly number[];
  readonly invalidatedFacts: readonly string[];
  readonly loopAssignments: readonly string[];
  readonly pending: readonly FlowLoopWorkItem[];
}

export function createFlowLoopNode(id: number): FlowLoopNode {
  return {
    id,
    antecedents: [],
    assignments: [],
    facts: new Map(),
    reachability: "unknown",
  };
}

export function withLoopAntecedent(node: FlowLoopNode, antecedent: number): FlowLoopNode {
  if (node.antecedents.includes(antecedent)) return node;
  return {
    ...node,
    antecedents: [...node.antecedents, antecedent],
  };
}

export function withLoopAssignment(node: FlowLoopNode, name: string): FlowLoopNode {
  if (node.assignments.includes(name)) return node;
  return {
    ...node,
    assignments: [...node.assignments, name],
  };
}

export function withLoopFact(node: FlowLoopNode, name: string, fact: string): FlowLoopNode {
  const facts = new Map(node.facts);
  facts.set(name, fact);
  return {
    ...node,
    facts,
  };
}

export function withLoopReachability(node: FlowLoopNode, reachability: FlowLoopReachability): FlowLoopNode {
  if (node.reachability === reachability) return node;
  return {
    ...node,
    reachability,
  };
}

export function createFlowLoopGraph(entry: number, exit: number, nodes: readonly FlowLoopNode[], edges: readonly FlowLoopEdge[]): FlowLoopGraph {
  return {
    entry,
    exit,
    nodes: new Map(nodes.map(node => [node.id, node])),
    edges,
  };
}

export function addFlowLoopEdge(graph: FlowLoopGraph, edge: FlowLoopEdge): FlowLoopGraph {
  const target = graph.nodes.get(edge.to) ?? createFlowLoopNode(edge.to);
  const source = graph.nodes.get(edge.from) ?? createFlowLoopNode(edge.from);
  const nodes = new Map(graph.nodes);
  nodes.set(source.id, source);
  nodes.set(target.id, withLoopAntecedent(target, edge.from));
  return {
    ...graph,
    nodes,
    edges: [...graph.edges, edge],
  };
}

export function outgoingFlowLoopEdges(graph: FlowLoopGraph, node: number): readonly FlowLoopEdge[] {
  return graph.edges.filter(edge => edge.from === node);
}

export function incomingFlowLoopEdges(graph: FlowLoopGraph, node: number): readonly FlowLoopEdge[] {
  return graph.edges.filter(edge => edge.to === node);
}

export function initialFlowLoopWork(graph: FlowLoopGraph): readonly FlowLoopWorkItem[] {
  return [{ node: graph.entry, reason: "entry", generation: 0 }];
}

export function processFlowLoopWork(graph: FlowLoopGraph, work: readonly FlowLoopWorkItem[]): FlowLoopSummary {
  let nodes = new Map(graph.nodes);
  const pending: FlowLoopWorkItem[] = [...work];
  const invalidatedFacts = new Set<string>();
  const loopAssignments = new Set<string>();
  const seen = new Set<string>();
  while (pending.length > 0) {
    const item = pending.shift()!;
    const key = `${item.node}:${item.generation}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const current = nodes.get(item.node) ?? createFlowLoopNode(item.node);
    const reachable = mergeReachability(current.reachability, item.reason === "condition" ? "conditionallyReachable" : "reachable");
    const updated = withLoopReachability(current, reachable);
    nodes = new Map(nodes);
    nodes.set(updated.id, updated);
    for (const assignment of updated.assignments) {
      loopAssignments.add(assignment);
      for (const factName of updated.facts.keys()) {
        if (factName === assignment) invalidatedFacts.add(factName);
      }
    }
    for (const edge of outgoingFlowLoopEdges(graph, item.node)) {
      if (edge.kind === "break" && edge.to !== graph.exit) continue;
      pending.push({
        node: edge.to,
        reason: edge.kind,
        generation: item.generation + 1,
      });
    }
  }
  return summarizeFlowLoop({ ...graph, nodes }, invalidatedFacts, loopAssignments, pending);
}

export function summarizeFlowLoop(graph: FlowLoopGraph, invalidatedFacts: ReadonlySet<string>, loopAssignments: ReadonlySet<string>, pending: readonly FlowLoopWorkItem[]): FlowLoopSummary {
  const reachableNodes: number[] = [];
  const unreachableNodes: number[] = [];
  for (const node of graph.nodes.values()) {
    if (node.reachability === "reachable" || node.reachability === "conditionallyReachable") {
      reachableNodes.push(node.id);
    } else {
      unreachableNodes.push(node.id);
    }
  }
  return {
    reachableNodes: reachableNodes.sort(compareNumber),
    unreachableNodes: unreachableNodes.sort(compareNumber),
    invalidatedFacts: [...invalidatedFacts].sort(),
    loopAssignments: [...loopAssignments].sort(),
    pending,
  };
}

export function mergeReachability(left: FlowLoopReachability, right: FlowLoopReachability): FlowLoopReachability {
  if (left === "reachable" || right === "reachable") return "reachable";
  if (left === "conditionallyReachable" || right === "conditionallyReachable") return "conditionallyReachable";
  if (left === "unreachable" && right === "unreachable") return "unreachable";
  if (left === "unknown") return right;
  if (right === "unknown") return left;
  return "unknown";
}

export function joinFlowLoopFacts(left: ReadonlyMap<string, string>, right: ReadonlyMap<string, string>): ReadonlyMap<string, string> {
  const result = new Map<string, string>();
  for (const [name, fact] of left) {
    if (right.get(name) === fact) result.set(name, fact);
  }
  return result;
}

export function invalidateAssignedFlowLoopFacts(facts: ReadonlyMap<string, string>, assignments: readonly string[]): ReadonlyMap<string, string> {
  const result = new Map(facts);
  for (const assignment of assignments) result.delete(assignment);
  return result;
}

export function flowLoopDominates(graph: FlowLoopGraph, dominator: number, node: number): boolean {
  if (dominator === node) return true;
  const visited = new Set<number>();
  const stack = [node];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === graph.entry) return dominator === graph.entry;
    if (visited.has(current)) continue;
    visited.add(current);
    const antecedents = incomingFlowLoopEdges(graph, current).map(edge => edge.from);
    if (antecedents.length === 0) return false;
    if (!antecedents.includes(dominator) && antecedents.some(antecedent => !flowLoopDominates(graph, dominator, antecedent))) return false;
    stack.push(...antecedents);
  }
  return true;
}

export function flowLoopCanReach(graph: FlowLoopGraph, from: number, to: number): boolean {
  const visited = new Set<number>();
  const stack = [from];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === to) return true;
    if (visited.has(current)) continue;
    visited.add(current);
    stack.push(...outgoingFlowLoopEdges(graph, current).map(edge => edge.to));
  }
  return false;
}

export function classifyFlowLoopExit(graph: FlowLoopGraph): "normal" | "breakOnly" | "unreachable" {
  const incoming = incomingFlowLoopEdges(graph, graph.exit);
  if (incoming.length === 0) return "unreachable";
  if (incoming.every(edge => edge.kind === "break")) return "breakOnly";
  return "normal";
}

function compareNumber(left: number, right: number): number {
  return left - right;
}
