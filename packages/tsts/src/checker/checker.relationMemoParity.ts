/**
 * Relation memo parity helpers.
 *
 * TS-Go relation checks use tri-state memoization, overflow guards, relation
 * kind partitioning, and diagnostic replay. This module keeps that machinery
 * explicit for structural relation ports.
 */

export type RelationKind =
  | "identity"
  | "subtype"
  | "assignable"
  | "comparable"
  | "strictSubtype";

export type RelationTernary =
  | "unknown"
  | "true"
  | "false"
  | "maybe";

export interface RelationMemoKey {
  readonly source: number;
  readonly target: number;
  readonly kind: RelationKind;
  readonly variance?: "covariant" | "contravariant" | "invariant" | "bivariant";
  readonly ignoreErrors?: boolean;
}

export interface RelationDiagnosticFrame {
  readonly source: number;
  readonly target: number;
  readonly message: string;
  readonly related?: readonly string[];
}

export interface RelationMemoEntry {
  readonly key: RelationMemoKey;
  readonly result: RelationTernary;
  readonly depth: number;
  readonly diagnostics: readonly RelationDiagnosticFrame[];
}

export interface RelationMemoState {
  readonly entries: ReadonlyMap<string, RelationMemoEntry>;
  readonly active: ReadonlySet<string>;
  readonly maxDepth: number;
}

export function createRelationMemoState(maxDepth = 100): RelationMemoState {
  return {
    entries: new Map(),
    active: new Set(),
    maxDepth,
  };
}

export function relationMemoKey(key: RelationMemoKey): string {
  return [
    key.kind,
    key.source,
    key.target,
    key.variance ?? "covariant",
    key.ignoreErrors === true ? "quiet" : "report",
  ].join(":");
}

export function getRelationMemo(state: RelationMemoState, key: RelationMemoKey): RelationMemoEntry | undefined {
  return state.entries.get(relationMemoKey(key));
}

export function setRelationMemo(state: RelationMemoState, entry: RelationMemoEntry): RelationMemoState {
  const entries = new Map(state.entries);
  entries.set(relationMemoKey(entry.key), entry);
  return {
    ...state,
    entries,
  };
}

export function enterRelationMemo(state: RelationMemoState, key: RelationMemoKey): RelationMemoState {
  const active = new Set(state.active);
  active.add(relationMemoKey(key));
  return {
    ...state,
    active,
  };
}

export function exitRelationMemo(state: RelationMemoState, key: RelationMemoKey): RelationMemoState {
  const active = new Set(state.active);
  active.delete(relationMemoKey(key));
  return {
    ...state,
    active,
  };
}

export function isRelationMemoActive(state: RelationMemoState, key: RelationMemoKey): boolean {
  return state.active.has(relationMemoKey(key));
}

export function relationDepthExceeded(state: RelationMemoState, depth: number): boolean {
  return depth >= state.maxDepth;
}

export function combineRelationResults(left: RelationTernary, right: RelationTernary): RelationTernary {
  if (left === "false" || right === "false") return "false";
  if (left === "maybe" || right === "maybe") return "maybe";
  if (left === "unknown") return right;
  if (right === "unknown") return left;
  return "true";
}

export function invertRelationResult(result: RelationTernary): RelationTernary {
  if (result === "true") return "false";
  if (result === "false") return "true";
  return result;
}

export function relationResultFromBoolean(value: boolean): RelationTernary {
  return value ? "true" : "false";
}

export function relationResultToBoolean(result: RelationTernary): boolean | undefined {
  if (result === "true") return true;
  if (result === "false") return false;
  return undefined;
}

export function createRelationEntry(key: RelationMemoKey, result: RelationTernary, depth: number, diagnostics: readonly RelationDiagnosticFrame[] = []): RelationMemoEntry {
  return {
    key,
    result,
    depth,
    diagnostics,
  };
}

export function replayRelationDiagnostics(entry: RelationMemoEntry, sink: (frame: RelationDiagnosticFrame) => void): void {
  if (entry.key.ignoreErrors === true) return;
  for (const diagnostic of entry.diagnostics) sink(diagnostic);
}

export function appendRelationDiagnostic(entry: RelationMemoEntry, diagnostic: RelationDiagnosticFrame): RelationMemoEntry {
  return {
    ...entry,
    diagnostics: [...entry.diagnostics, diagnostic],
  };
}

export function relationPairKey(source: number, target: number): string {
  return `${source}->${target}`;
}

export function relationPairIsSelfComparable(source: number, target: number): boolean {
  return source === target;
}

export function normalizeRelationKey(key: RelationMemoKey): RelationMemoKey {
  if (key.kind === "identity" || key.kind === "comparable") {
    const source = Math.min(key.source, key.target);
    const target = Math.max(key.source, key.target);
    return {
      ...key,
      source,
      target,
    };
  }
  return key;
}

export function relationImplies(left: RelationKind, right: RelationKind): boolean {
  if (left === right) return true;
  if (left === "identity") return true;
  if (left === "strictSubtype" && (right === "subtype" || right === "assignable")) return true;
  if (left === "subtype" && right === "assignable") return true;
  if (left === "assignable" && right === "comparable") return true;
  return false;
}

export function candidateRelationKinds(kind: RelationKind): readonly RelationKind[] {
  if (kind === "identity") return ["identity"];
  if (kind === "strictSubtype") return ["identity", "strictSubtype", "subtype", "assignable"];
  if (kind === "subtype") return ["identity", "subtype", "assignable"];
  if (kind === "assignable") return ["identity", "assignable"];
  return ["identity", "comparable"];
}

export function findImpliedRelationMemo(state: RelationMemoState, key: RelationMemoKey): RelationMemoEntry | undefined {
  for (const kind of candidateRelationKinds(key.kind)) {
    const entry = getRelationMemo(state, normalizeRelationKey({ ...key, kind }));
    if (entry !== undefined && relationImplies(kind, key.kind)) return entry;
  }
  return undefined;
}

export function relationMemoStats(state: RelationMemoState): ReadonlyMap<RelationKind, number> {
  const counts = new Map<RelationKind, number>();
  for (const entry of state.entries.values()) {
    counts.set(entry.key.kind, (counts.get(entry.key.kind) ?? 0) + 1);
  }
  return counts;
}

export function pruneRelationMemo(state: RelationMemoState, keep: (entry: RelationMemoEntry) => boolean): RelationMemoState {
  const entries = new Map<string, RelationMemoEntry>();
  for (const [key, entry] of state.entries) {
    if (keep(entry)) entries.set(key, entry);
  }
  return {
    ...state,
    entries,
  };
}

export function cloneRelationMemoForQuietCheck(state: RelationMemoState): RelationMemoState {
  const entries = new Map<string, RelationMemoEntry>();
  for (const [key, entry] of state.entries) {
    entries.set(key, {
      ...entry,
      key: {
        ...entry.key,
        ignoreErrors: true,
      },
      diagnostics: [],
    });
  }
  return {
    ...state,
    entries,
  };
}

export function formatRelationDiagnostic(frame: RelationDiagnosticFrame): string {
  const related = frame.related === undefined || frame.related.length === 0 ? "" : ` (${frame.related.join("; ")})`;
  return `${frame.source} -> ${frame.target}: ${frame.message}${related}`;
}
