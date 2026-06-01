/**
 * Dirty-propagation parity helpers.
 */

export interface DirtyGraph {
  readonly dependencies: ReadonlyMap<string, readonly string[]>;
}

export function propagateDirtyProject(start: string, graph: DirtyGraph): readonly string[] {
  const dirty = new Set<string>([start]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const [project, dependencies] of graph.dependencies) {
      if (dependencies.some(dependency => dirty.has(dependency)) && !dirty.has(project)) {
        dirty.add(project);
        changed = true;
      }
    }
  }
  return [...dirty].sort();
}

export function dirtyGraphRoots(graph: DirtyGraph): readonly string[] {
  const referenced = new Set([...graph.dependencies.values()].flat());
  return [...graph.dependencies.keys()].filter(project => !referenced.has(project)).sort();
}
