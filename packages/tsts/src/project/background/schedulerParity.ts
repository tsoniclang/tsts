/**
 * Background scheduler parity helpers.
 *
 * TS-Go's project background queue coalesces project refreshes, file
 * invalidations, and config reload work by priority. This module keeps the
 * ordering and coalescing policy explicit.
 */

export type BackgroundTaskKind = "refresh-project" | "invalidate-file" | "reload-config" | "close-project";

export interface BackgroundTask {
  readonly kind: BackgroundTaskKind;
  readonly key: string;
  readonly priority: number;
  readonly payload?: unknown;
}

export interface BackgroundScheduler {
  enqueue(task: BackgroundTask): void;
  cancel(kind: BackgroundTaskKind, key: string): void;
  drain(maxCount?: number): readonly BackgroundTask[];
  size(): number;
}

export function createBackgroundScheduler(): BackgroundScheduler {
  const tasks = new Map<string, BackgroundTask>();
  return {
    enqueue(task) {
      const key = taskKey(task.kind, task.key);
      const existing = tasks.get(key);
      if (existing === undefined || task.priority >= existing.priority) tasks.set(key, task);
    },
    cancel(kind, key) {
      tasks.delete(taskKey(kind, key));
    },
    drain(maxCount = Number.MAX_SAFE_INTEGER) {
      const ordered = [...tasks.values()].sort(compareTaskPriority).slice(0, maxCount);
      for (const task of ordered) tasks.delete(taskKey(task.kind, task.key));
      return ordered;
    },
    size() {
      return tasks.size;
    },
  };
}

export function backgroundPriority(kind: BackgroundTaskKind): number {
  switch (kind) {
    case "reload-config":
      return 40;
    case "invalidate-file":
      return 30;
    case "refresh-project":
      return 20;
    case "close-project":
      return 10;
  }
}

export function makeBackgroundTask(kind: BackgroundTaskKind, key: string, payload?: unknown): BackgroundTask {
  return { kind, key, priority: backgroundPriority(kind), ...(payload === undefined ? {} : { payload }) };
}

function taskKey(kind: BackgroundTaskKind, key: string): string {
  return `${kind}\0${key}`;
}

function compareTaskPriority(left: BackgroundTask, right: BackgroundTask): number {
  const priority = right.priority - left.priority;
  return priority !== 0 ? priority : left.key.localeCompare(right.key);
}
