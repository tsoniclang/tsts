import type { bool, int, long } from "../../go/scalars.js";
import { GoAppend, GoZeroPointer, type GoComparable, type GoEquality, type GoMapKeyDescriptor, type GoPtr, type GoSlice, type GoZeroFactory } from "../../go/compat.js";
import { Map as SyncMapBacking } from "../../go/sync.js";
import type { Int64 } from "../../go/sync/atomic.js";
import type { OrderedMap } from "../collections/ordered_map.js";
import { OrderedMap_Delete, OrderedMap_EntryAt, OrderedMap_Has, OrderedMap_Set, OrderedMap_Size, OrderedMap_Values } from "../collections/ordered_map.js";
import { NewOrderedMapFromList, NewOrderedMapWithSizeHint } from "../collections/ordered_map.js";
import { SyncSet_AddIfAbsent } from "../collections/syncset.js";
import type { SyncSet } from "../collections/syncset.js";
import { Map } from "./core.js";

import type { GoFunc } from "../../go/compat.js";
import { GoEmptySlice } from "../../go/compat.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::type::BreadthFirstSearchResult","kind":"type","status":"implemented","sigHash":"309ebf85a8e1d1c8b853258caf629d5709d4c50933b4039bb5709ae637129405"}
 *
 * Go source:
 * BreadthFirstSearchResult[N any] struct {
 * 	Stopped bool
 * 	Path    []N
 * }
 */
export interface BreadthFirstSearchResult<N> {
  Stopped: bool;
  Path: GoSlice<N>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::type::breadthFirstSearchJob","kind":"type","status":"implemented","sigHash":"f0da07afc98877f6240059d69dfe598fa60915bb6c289148b826d3889520963b"}
 *
 * Go source:
 * breadthFirstSearchJob[N any] struct {
 * 	node   N
 * 	parent *breadthFirstSearchJob[N]
 * }
 */
export interface breadthFirstSearchJob<N> {
  node: N;
  parent: GoPtr<breadthFirstSearchJob<N>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::type::BreadthFirstSearchLevel","kind":"type","status":"implemented","sigHash":"4d6020eade6f6fb22ab1a48bd8be2fa8aa4697e64652c58bafb9dbe58c8e468a"}
 *
 * Go source:
 * BreadthFirstSearchLevel[K comparable, N any] struct {
 * 	jobs *collections.OrderedMap[K, *breadthFirstSearchJob[N]]
 * }
 */
export interface BreadthFirstSearchLevel<K extends GoComparable, N> {
  jobs: GoPtr<OrderedMap<K, GoPtr<breadthFirstSearchJob<N>>>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::method::BreadthFirstSearchLevel.Has","kind":"method","status":"implemented","sigHash":"5857ea09874f91052733e5b927486b7507b8da64e5921cd0c25e881b52ed3eae"}
 *
 * Go source:
 * func (l *BreadthFirstSearchLevel[K, N]) Has(key K) bool {
 * 	return l.jobs.Has(key)
 * }
 */
export function BreadthFirstSearchLevel_Has<K extends GoComparable, N>(receiver: GoPtr<BreadthFirstSearchLevel<K, N>>, key: K): bool {
  return OrderedMap_Has(receiver!.jobs, key);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::method::BreadthFirstSearchLevel.Delete","kind":"method","status":"implemented","sigHash":"dea852faac43ca3117e2ec79c62db799b6c9fcd3ecfb7de84a73dfb7b233c3d3"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The generic breadth-first level forwards the exact static equality operation for its erased key type.","runtimeDictionaries":[{"kind":"equality","parameter":"equalKey","typeParameter":"K"}]}
 *
 * Go source:
 * func (l *BreadthFirstSearchLevel[K, N]) Delete(key K) {
 * 	l.jobs.Delete(key)
 * }
 */
export function BreadthFirstSearchLevel_Delete<K extends GoComparable, N>(receiver: GoPtr<BreadthFirstSearchLevel<K, N>>, key: K, equalKey: GoEquality<K>): void {
  OrderedMap_Delete(receiver!.jobs, key, GoZeroPointer, equalKey);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::method::BreadthFirstSearchLevel.Range","kind":"method","status":"implemented","sigHash":"0fe2247b8aceb5334ec20275f40e404a98fa9b96151482d918555c617b5364a3"}
 *
 * Go source:
 * func (l *BreadthFirstSearchLevel[K, N]) Range(f func(node N) bool) {
 * 	for job := range l.jobs.Values() {
 * 		if !f(job.node) {
 * 			return
 * 		}
 * 	}
 * }
 */
export function BreadthFirstSearchLevel_Range<K extends GoComparable, N>(receiver: GoPtr<BreadthFirstSearchLevel<K, N>>, f: GoFunc<(node: N) => bool>): void {
  (OrderedMap_Values(receiver!.jobs) as (yield_: (value: GoPtr<breadthFirstSearchJob<N>>) => bool) => void)((job: GoPtr<breadthFirstSearchJob<N>>): bool => {
    if (!f!(job!.node)) {
      return false;
    }
    return true;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::type::BreadthFirstSearchOptions","kind":"type","status":"implemented","sigHash":"3ff8bbd58687bfc87a52e65f120fefb3e4c9c85a856fc596b43b66fa0f4bd072"}
 *
 * Go source:
 * BreadthFirstSearchOptions[K comparable, N any] struct {
 * 	// Visited is a set of nodes that have already been visited.
 * 	// If nil, a new set will be created.
 * 	Visited *collections.SyncSet[K]
 * 	// PreprocessLevel is a function that, if provided, will be called
 * 	// before each level, giving the caller an opportunity to remove nodes.
 * 	PreprocessLevel func(*BreadthFirstSearchLevel[K, N])
 * }
 */
export interface BreadthFirstSearchOptions<K extends GoComparable, N> {
  Visited: GoPtr<SyncSet<K>>;
  PreprocessLevel: GoFunc<(arg0: GoPtr<BreadthFirstSearchLevel<K, N>>) => void>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::func::BreadthFirstSearchParallel","kind":"func","status":"implemented","sigHash":"423005f075542d4d5f93435aa85f1c47fb1c56f7366277d98d07f6742e290e43"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The generic search forwards exact static key zero and map-key operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroKey","typeParameter":"N"},{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"N"}]}
 *
 * Go source:
 * func BreadthFirstSearchParallel[N comparable](
 * 	start N,
 * 	neighbors func(N) []N,
 * 	visit func(node N) (isResult bool, stop bool),
 * ) BreadthFirstSearchResult[N] {
 * 	return BreadthFirstSearchParallelEx(start, neighbors, visit, BreadthFirstSearchOptions[N, N]{}, Identity)
 * }
 */
export function BreadthFirstSearchParallel<N extends GoComparable>(start: N, neighbors: GoFunc<(arg0: N) => GoSlice<N>>, visit: GoFunc<(node: N) => [isResult: bool, stop: bool]>, zeroKey: GoZeroFactory<N>, keyDescriptor: GoMapKeyDescriptor<N>): BreadthFirstSearchResult<N> {
  return BreadthFirstSearchParallelEx<N, N>(start, neighbors, visit, { Visited: undefined, PreprocessLevel: undefined }, (n: N): N => n, zeroKey, keyDescriptor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::func::BreadthFirstSearchParallelEx","kind":"func","status":"implemented","sigHash":"646e60b8f85eaa003b6f510e6ce8bc7d07c73155141bcea23060fb6b6a9b8c9f"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The generic search supplies exact erased key zero and map-key operations.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroKey","typeParameter":"K"},{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func BreadthFirstSearchParallelEx[K comparable, N any](
 * 	start N,
 * 	neighbors func(N) []N,
 * 	visit func(node N) (isResult bool, stop bool),
 * 	options BreadthFirstSearchOptions[K, N],
 * 	getKey func(N) K,
 * ) BreadthFirstSearchResult[N] { ... }
 */
export function BreadthFirstSearchParallelEx<K extends GoComparable, N>(start: N, neighbors: GoFunc<(arg0: N) => GoSlice<N>>, visit: GoFunc<(node: N) => [isResult: bool, stop: bool]>, options: BreadthFirstSearchOptions<K, N>, getKey: GoFunc<(arg0: N) => K>, zeroKey: GoZeroFactory<K>, keyDescriptor: GoMapKeyDescriptor<K>): BreadthFirstSearchResult<N> {
  let visited = options.Visited;
  if (visited === undefined) {
    visited = {
      m: {
        __tsgoBlank0: [],
        __tsgoBlank1: [],
        m: new SyncMapBacking(),
      },
    };
  }

  interface result {
    stop: bool;
    job: GoPtr<breadthFirstSearchJob<N>>;
    next: GoPtr<OrderedMap<K, GoPtr<breadthFirstSearchJob<N>>>>;
  }

  let fallback: GoPtr<breadthFirstSearchJob<N>> = undefined;

  // processLevel processes each node at the current level sequentially.
  const processLevel = (index: number, jobs: GoPtr<OrderedMap<K, GoPtr<breadthFirstSearchJob<N>>>>): result => {
    let lowestFallback = Number.MAX_SAFE_INTEGER;
    let lowestGoal = Number.MAX_SAFE_INTEGER;
    let nextJobCount = 0;
    if (options.PreprocessLevel !== undefined) {
      options.PreprocessLevel({ jobs });
    }
    const next: GoSlice<GoSlice<GoPtr<breadthFirstSearchJob<N>>>> = new globalThis.Array(OrderedMap_Size(jobs)).fill([]);
    let i = 0;
    (OrderedMap_Values(jobs) as (yield_: (value: GoPtr<breadthFirstSearchJob<N>>) => bool) => void)((j: GoPtr<breadthFirstSearchJob<N>>): bool => {
      const curI = i;
      i++;
      if (curI >= lowestGoal) {
        return true; // continue iteration
      }
      // If we have already visited this node, skip it.
      if (!SyncSet_AddIfAbsent(visited, getKey!(j!.node), keyDescriptor)) {
        return true;
      }
      const [isResult, stop] = visit!(j!.node);
      if (isResult) {
        if (stop) {
          if (curI < lowestGoal) {
            lowestGoal = curI;
          }
          return true;
        }
        if (fallback === undefined) {
          if (curI < lowestFallback) {
            lowestFallback = curI;
          }
        }
      }
      if (curI >= lowestGoal) {
        return true;
      }
      // Add the next level jobs
      const neighborNodes = neighbors!(j!.node);
      if (neighborNodes.length > 0) {
        nextJobCount += neighborNodes.length;
        next[curI] = Map(neighborNodes, (child: N): GoPtr<breadthFirstSearchJob<N>> => {
          return { node: child, parent: j };
        });
      }
      return true;
    });
    if (lowestGoal !== Number.MAX_SAFE_INTEGER) {
      const [, job] = OrderedMap_EntryAt(jobs, lowestGoal as int, zeroKey, GoZeroPointer<breadthFirstSearchJob<N>>);
      return { stop: true, job: job, next: undefined };
    }
    if (fallback === undefined) {
      if (lowestFallback !== Number.MAX_SAFE_INTEGER) {
        const [, fb] = OrderedMap_EntryAt(jobs, lowestFallback as int, zeroKey, GoZeroPointer<breadthFirstSearchJob<N>>);
        fallback = fb;
      }
    }
    const nextJobs = NewOrderedMapWithSizeHint<K, GoPtr<breadthFirstSearchJob<N>>>(nextJobCount as int, keyDescriptor);
    for (const jobList of next) {
      for (const j of jobList) {
        if (!OrderedMap_Has(nextJobs, getKey!(j!.node))) {
          OrderedMap_Set(nextJobs, getKey!(j!.node), j, keyDescriptor);
        }
      }
    }
    return { stop: false, job: undefined, next: nextJobs };
  };

  const createPath = (job: GoPtr<breadthFirstSearchJob<N>>): GoSlice<N> => {
    let path: GoSlice<N> = GoEmptySlice<N>();
    let cur = job;
    while (cur !== undefined) {
      path = GoAppend(path, cur.node);
      cur = cur.parent;
    }
    return path;
  };

  let levelIndex = 0;
  let level = NewOrderedMapFromList<K, GoPtr<breadthFirstSearchJob<N>>>([
    { Key: getKey!(start), Value: { node: start, parent: undefined } },
  ], keyDescriptor);
  while (OrderedMap_Size(level) > 0) {
    const r = processLevel(levelIndex, level);
    if (r.stop) {
      return { Stopped: true, Path: createPath(r.job) };
    } else if (r.job !== undefined && fallback === undefined) {
      fallback = r.job;
    }
    level = r.next!;
    levelIndex++;
  }
  return { Stopped: false, Path: createPath(fallback) };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/bfs.go::func::updateMin","kind":"func","status":"implemented","sigHash":"fa5e90ec4ed673c0ffe64a6da6598d6c32e70dd274ef036636e3e48938ccc983"}
 *
 * Go source:
 * func updateMin(a *atomic.Int64, candidate int64) bool {
 * 	for {
 * 		current := a.Load()
 * 		if current < candidate {
 * 			return false
 * 		}
 * 		if a.CompareAndSwap(current, candidate) {
 * 			return true
 * 		}
 * 	}
 * }
 */
export function updateMin(a: GoPtr<Int64>, candidate: long): bool {
  // Single-threaded: no real CAS spin needed. Load current, update if candidate
  // is strictly smaller, and return whether the update happened.
  const current = a!.Load();
  if ((current as number) < (candidate as number)) {
    return false;
  }
  a!.Store(candidate);
  return true;
}
