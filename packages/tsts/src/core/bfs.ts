/**
 * Breadth-first search over a node graph.
 *
 * Port of TS-Go `internal/core/bfs.go` (206 LoC). The Go version uses
 * a goroutine-per-job parallel processor with atomic.Int64
 * tie-breaking for the lowest-index result. TS runs single-threaded,
 * so this port walks each level sequentially while preserving
 * upstream's observable behavior:
 *
 * - Visit order within a level matches insertion order (TS's `Map`
 *   iteration is insertion-ordered, matching `collections.OrderedMap`)
 * - If two siblings within a level produce results, the earlier one
 *   wins (insertion-index tie-break)
 * - `stop: true` halts the search at the current level; otherwise the
 *   match becomes the fallback path returned if no later stop is found
 * - Each node key is visited at most once across the whole search
 *
 * Cross-module deps (OrderedMap, Identity) sourced from this package.
 */

export interface BreadthFirstSearchResult<N> {
  stopped: boolean;
  path: readonly N[];
}

interface BreadthFirstSearchJob<N> {
  node: N;
  parent: BreadthFirstSearchJob<N> | undefined;
}

type BreadthFirstSearchLevelResult<K, N> =
  | { readonly stop: true; readonly job: BreadthFirstSearchJob<N> }
  | { readonly stop: false; readonly next: Map<K, BreadthFirstSearchJob<N>> };

export interface BreadthFirstSearchLevel<K, N> {
  has(key: K): boolean;
  delete(key: K): void;
  range(callback: (node: N) => boolean): void;
}

export interface BreadthFirstSearchOptions<K, N> {
  /** Set of nodes already visited. If undefined, a new set is created. */
  visited?: Set<K>;
  /** Called before each level so the caller may remove nodes. */
  preprocessLevel?: (level: BreadthFirstSearchLevel<K, N>) => void;
}

class LevelView<K, N> implements BreadthFirstSearchLevel<K, N> {
  readonly jobs: Map<K, BreadthFirstSearchJob<N>>;
  constructor(jobs: Map<K, BreadthFirstSearchJob<N>>) {
    this.jobs = jobs;
  }
  has(key: K): boolean {
    return this.jobs.has(key);
  }
  delete(key: K): void {
    this.jobs.delete(key);
  }
  range(callback: (node: N) => boolean): void {
    for (const job of this.jobs.values()) {
      if (!callback(job.node)) return;
    }
  }
}

/**
 * Performs a breadth-first search starting from `start`. Calls `visit`
 * on each node. Returns the path from the first node where
 * `visit(...).isResult` is true back to `start`.
 *
 * If `visit` returns `stop: true`, the search halts immediately on the
 * lowest-index match in the current level. Otherwise the lowest-index
 * match becomes a fallback returned if no later `stop` match is found.
 */
export function breadthFirstSearchParallel<N>(
  start: N,
  neighbors: (node: N) => readonly N[],
  visit: (node: N) => { isResult: boolean; stop: boolean },
): BreadthFirstSearchResult<N> {
  return breadthFirstSearchParallelEx<N, N>(start, neighbors, visit, undefined, identity);
}

export function breadthFirstSearchParallelEx<K, N>(
  start: N,
  neighbors: (node: N) => readonly N[],
  visit: (node: N) => { isResult: boolean; stop: boolean },
  options: BreadthFirstSearchOptions<K, N> | undefined,
  getKey: (node: N) => K,
): BreadthFirstSearchResult<N> {
  const visited = options?.visited ?? new Set<K>();

  let fallback: BreadthFirstSearchJob<N> | undefined;

  const processLevel = (
    jobs: Map<K, BreadthFirstSearchJob<N>>
  ): BreadthFirstSearchLevelResult<K, N> => {
    if (options?.preprocessLevel !== undefined) {
      options.preprocessLevel(new LevelView(jobs));
    }

    let lowestGoal = Number.MAX_SAFE_INTEGER;
    let lowestGoalJob: BreadthFirstSearchJob<N> | undefined;
    let lowestFallback = Number.MAX_SAFE_INTEGER;
    let lowestFallbackJob: BreadthFirstSearchJob<N> | undefined;

    // Index-keyed buckets to collect neighbors per source index, then
    // flatten in order to preserve deterministic next-level ordering.
    const next: (BreadthFirstSearchJob<N>[] | undefined)[] = new Array(jobs.size);

    let i = 0;
    for (const j of jobs.values()) {
      const myIndex = i;
      i++;
      if (myIndex >= lowestGoal) continue;

      const key = getKey(j.node);
      if (visited.has(key)) continue;
      visited.add(key);

      const { isResult, stop } = visit(j.node);
      if (isResult) {
        if (stop) {
          if (myIndex < lowestGoal) {
            lowestGoal = myIndex;
            lowestGoalJob = j;
          }
          continue;
        }
        if (fallback === undefined && myIndex < lowestFallback) {
          lowestFallback = myIndex;
          lowestFallbackJob = j;
        }
      }

      if (myIndex >= lowestGoal) continue;

      const neighborNodes = neighbors(j.node);
      if (neighborNodes.length > 0) {
        next[myIndex] = neighborNodes.map((child) => ({ node: child, parent: j }));
      }
    }

    if (lowestGoalJob !== undefined) {
      return { stop: true, job: lowestGoalJob };
    }

    if (fallback === undefined && lowestFallbackJob !== undefined) {
      fallback = lowestFallbackJob;
    }

    const nextJobs = new Map<K, BreadthFirstSearchJob<N>>();
    for (const bucket of next) {
      if (bucket === undefined) continue;
      for (const j of bucket) {
        const key = getKey(j.node);
        if (!nextJobs.has(key)) nextJobs.set(key, j);
      }
    }
    return { stop: false, next: nextJobs };
  };

  const createPath = (job: BreadthFirstSearchJob<N> | undefined): readonly N[] => {
    const path: N[] = [];
    let cur = job;
    while (cur !== undefined) {
      path.push(cur.node);
      cur = cur.parent;
    }
    return path;
  };

  let level = new Map<K, BreadthFirstSearchJob<N>>([[getKey(start), { node: start, parent: undefined }]]);

  while (level.size > 0) {
    const result = processLevel(level);
    if (result.stop) {
      return { stopped: true, path: createPath(result.job) };
    }
    level = result.next;
  }

  return { stopped: false, path: createPath(fallback) };
}

function identity<T>(t: T): T {
  return t;
}
