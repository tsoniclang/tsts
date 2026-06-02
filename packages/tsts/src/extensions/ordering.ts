/**
 * Extension ordering — deterministic topological sort.
 *
 * Extensions run in a single deterministic phase order (spec "Extension
 * Ordering"). Two kinds of constraint drive the order:
 *
 *   - dependsOn (HARD): a missing dependency is a fatal registration error;
 *     a dependency must run before the dependent.
 *   - runsAfter (SOFT): an ordering preference honored when the named
 *     extension is present, ignored when it is absent.
 *
 * Extensions with no constraint between them keep their REGISTRATION order
 * (stable sort), so the result is fully deterministic. Cycles over the
 * combined edge set are fatal.
 *
 * The sort is pure: it returns either the ordered ids or a structured error.
 * The host turns errors into fatal diagnostics; this module knows nothing
 * about diagnostics.
 */

/** Minimal ordering view of an extension. */
export interface OrderableExtension {
  readonly id: string;
  readonly dependsOn?: readonly string[];
  readonly runsAfter?: readonly string[];
}

/** A duplicate id appeared in the registration list. */
export interface DuplicateIdError {
  readonly kind: "duplicate-id";
  readonly id: string;
}

/** A `dependsOn` referenced an id that was not registered. */
export interface MissingDependencyError {
  readonly kind: "missing-dependency";
  readonly id: string;
  readonly missing: string;
}

/** The dependency/ordering graph contains a cycle. */
export interface CycleError {
  readonly kind: "cycle";
  readonly cycle: readonly string[];
}

export type OrderingError = DuplicateIdError | MissingDependencyError | CycleError;

export type OrderingResult =
  | { readonly ok: true; readonly order: readonly string[] }
  | { readonly ok: false; readonly error: OrderingError };

/**
 * Topologically sort `extensions` honoring dependsOn (hard) and runsAfter
 * (soft, only when target present), preserving registration order among
 * otherwise-independent extensions.
 */
export function orderExtensions(extensions: readonly OrderableExtension[]): OrderingResult {
  // Duplicate ids are fatal: two extensions cannot share one id in a run.
  const seen = new Set<string>();
  const duplicate = extensions.find(extension => {
    if (seen.has(extension.id)) return true;
    seen.add(extension.id);
    return false;
  });
  if (duplicate !== undefined) {
    return { ok: false, error: { kind: "duplicate-id", id: duplicate.id } };
  }

  const present = new Set(extensions.map(extension => extension.id));

  // Hard dependency check: every dependsOn target must be registered.
  for (const extension of extensions) {
    const missing = (extension.dependsOn ?? []).find(dependency => !present.has(dependency));
    if (missing !== undefined) {
      return { ok: false, error: { kind: "missing-dependency", id: extension.id, missing } };
    }
  }

  // Registration index gives the stable tie-break ("independent => registration
  // order"). Earlier registration sorts first.
  const registrationIndex = new Map<string, number>(
    extensions.map((extension, index) => [extension.id, index]),
  );

  // Build the predecessor set per id: dependsOn always, runsAfter only when the
  // referenced id is present (soft constraint).
  const predecessors = new Map<string, readonly string[]>(
    extensions.map(extension => {
      const hard = extension.dependsOn ?? [];
      const soft = (extension.runsAfter ?? []).filter(target => present.has(target));
      // De-dup while preserving determinism.
      const combined = [...new Set([...hard, ...soft])];
      return [extension.id, combined];
    }),
  );

  // Deterministic depth-first topological sort with cycle detection. We iterate
  // candidates in registration order so independent nodes keep that order.
  const orderedIds: string[] = [];
  const placed = new Set<string>();
  const onStack = new Set<string>();
  const stack: string[] = [];

  const sortedIds = [...registrationIndex.keys()].sort(
    (a, b) => registrationIndex.get(a)! - registrationIndex.get(b)!,
  );

  const visit = (id: string): CycleError | undefined => {
    if (placed.has(id)) return undefined;
    if (onStack.has(id)) {
      const start = stack.indexOf(id);
      return { kind: "cycle", cycle: [...stack.slice(start), id] };
    }
    onStack.add(id);
    stack.push(id);
    const preds = [...(predecessors.get(id) ?? [])].sort(
      (a, b) => registrationIndex.get(a)! - registrationIndex.get(b)!,
    );
    for (const predecessor of preds) {
      const cycle = visit(predecessor);
      if (cycle !== undefined) return cycle;
    }
    stack.pop();
    onStack.delete(id);
    placed.add(id);
    orderedIds.push(id);
    return undefined;
  };

  for (const id of sortedIds) {
    const cycle = visit(id);
    if (cycle !== undefined) {
      return { ok: false, error: cycle };
    }
  }

  return { ok: true, order: orderedIds };
}
