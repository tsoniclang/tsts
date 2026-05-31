/**
 * Incremental watch invalidation parity helpers.
 *
 * TS-Go incremental execution distinguishes shape changes, content-only
 * changes, output invalidations, and project-reference invalidations.
 */

export type WatchChangeKind = "create" | "update" | "delete";
export type InvalidationKind = "none" | "content" | "shape" | "outputs" | "project-reference";

export interface WatchChange {
  readonly path: string;
  readonly kind: WatchChangeKind;
  readonly oldVersion?: string;
  readonly newVersion?: string;
}

export interface InvalidationResult {
  readonly path: string;
  readonly kind: InvalidationKind;
  readonly affectedProjects: readonly string[];
}

export interface IncrementalGraph {
  readonly fileToProjects: ReadonlyMap<string, readonly string[]>;
  readonly projectReferences: ReadonlyMap<string, readonly string[]>;
  readonly outputToInput: ReadonlyMap<string, string>;
}

export function classifyWatchChange(change: WatchChange): InvalidationKind {
  if (change.kind === "delete" || change.kind === "create") return "shape";
  if (change.path.endsWith(".d.ts")) return "shape";
  if (change.path.endsWith(".tsbuildinfo")) return "project-reference";
  if (change.oldVersion !== undefined && change.oldVersion === change.newVersion) return "none";
  return "content";
}

export function invalidateChangedFile(change: WatchChange, graph: IncrementalGraph): InvalidationResult {
  const kind = classifyWatchChange(change);
  const projects = new Set(graph.fileToProjects.get(change.path) ?? []);
  const input = graph.outputToInput.get(change.path);
  if (input !== undefined) {
    for (const project of graph.fileToProjects.get(input) ?? []) projects.add(project);
    return { path: change.path, kind: "outputs", affectedProjects: [...projects].sort() };
  }
  if (kind === "project-reference") {
    for (const project of graph.projectReferences.keys()) projects.add(project);
  }
  return { path: change.path, kind, affectedProjects: [...projects].sort() };
}

export function propagateProjectReferenceInvalidation(project: string, graph: IncrementalGraph): readonly string[] {
  const affected = new Set<string>([project]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const [candidate, references] of graph.projectReferences) {
      if (references.some(reference => affected.has(reference)) && !affected.has(candidate)) {
        affected.add(candidate);
        changed = true;
      }
    }
  }
  return [...affected].sort();
}

export function mergeInvalidations(results: readonly InvalidationResult[]): readonly InvalidationResult[] {
  const byPath = new Map<string, InvalidationResult>();
  for (const result of results) {
    const existing = byPath.get(result.path);
    if (existing === undefined) {
      byPath.set(result.path, result);
      continue;
    }
    byPath.set(result.path, {
      path: result.path,
      kind: strongerInvalidation(existing.kind, result.kind),
      affectedProjects: [...new Set([...existing.affectedProjects, ...result.affectedProjects])].sort(),
    });
  }
  return [...byPath.values()].sort((left, right) => left.path.localeCompare(right.path));
}

function strongerInvalidation(left: InvalidationKind, right: InvalidationKind): InvalidationKind {
  const rank: readonly InvalidationKind[] = ["none", "content", "outputs", "shape", "project-reference"];
  return rank.indexOf(left) >= rank.indexOf(right) ? left : right;
}
