/**
 * Compiler source-file graph parity helpers.
 *
 * TS-Go compiler builds a graph of parsed files, library files, project
 * references, and emitted outputs. This module ports the graph bookkeeping used
 * by the split compiler files.
 */

export interface SourceFileGraph {
  readonly files: Map<string, SourceFileGraphNode>;
  readonly roots: Set<string>;
  readonly defaultLibraries: Set<string>;
}

export interface SourceFileGraphNode {
  readonly path: string;
  readonly imports: Set<string>;
  readonly referencedFiles: Set<string>;
  readonly projectReferences: Set<string>;
  readonly emits: Set<string>;
}

export function createSourceFileGraph(): SourceFileGraph {
  return {
    files: new Map(),
    roots: new Set(),
    defaultLibraries: new Set(),
  };
}

export function addSourceFileNode(graph: SourceFileGraph, path: string, root: boolean): SourceFileGraphNode {
  const existing = graph.files.get(path);
  if (existing !== undefined) {
    if (root) graph.roots.add(path);
    return existing;
  }
  const node: SourceFileGraphNode = {
    path,
    imports: new Set(),
    referencedFiles: new Set(),
    projectReferences: new Set(),
    emits: new Set(),
  };
  graph.files.set(path, node);
  if (root) graph.roots.add(path);
  return node;
}

export function addSourceFileImport(graph: SourceFileGraph, from: string, to: string): void {
  addSourceFileNode(graph, from, false).imports.add(to);
  addSourceFileNode(graph, to, false);
}

export function addSourceFileReference(graph: SourceFileGraph, from: string, to: string): void {
  addSourceFileNode(graph, from, false).referencedFiles.add(to);
  addSourceFileNode(graph, to, false);
}

export function addProjectReference(graph: SourceFileGraph, from: string, project: string): void {
  addSourceFileNode(graph, from, false).projectReferences.add(project);
}

export function addEmitOutput(graph: SourceFileGraph, from: string, output: string): void {
  addSourceFileNode(graph, from, false).emits.add(output);
}

export function collectTransitiveSourceFiles(graph: SourceFileGraph, roots: readonly string[] = [...graph.roots]): readonly string[] {
  const visited = new Set<string>();
  const pending = [...roots];
  while (pending.length > 0) {
    const current = pending.pop()!;
    if (visited.has(current)) continue;
    visited.add(current);
    const node = graph.files.get(current);
    if (node === undefined) continue;
    pending.push(...node.imports, ...node.referencedFiles);
  }
  return [...visited].sort();
}

export function collectEmitOutputs(graph: SourceFileGraph, roots: readonly string[] = [...graph.roots]): readonly string[] {
  const files = collectTransitiveSourceFiles(graph, roots);
  const outputs = new Set<string>();
  for (const file of files) {
    for (const output of graph.files.get(file)?.emits ?? []) outputs.add(output);
  }
  return [...outputs].sort();
}

export function graphHasCycle(graph: SourceFileGraph): boolean {
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (path: string): boolean => {
    if (visiting.has(path)) return true;
    if (visited.has(path)) return false;
    visiting.add(path);
    const node = graph.files.get(path);
    for (const next of node?.imports ?? []) if (visit(next)) return true;
    visiting.delete(path);
    visited.add(path);
    return false;
  };
  return [...graph.files.keys()].some(visit);
}
