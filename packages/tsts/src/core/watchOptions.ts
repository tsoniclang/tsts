/**
 * Watch-mode options.
 *
 * Port of TS-Go `internal/core/watchoptions.go` (53 LoC).
 */

import type { Tristate } from "./tristate.js";

export type WatchFileKind = number;
export const WatchFileKind = {
  None: 0,
  FixedPollingInterval: 1,
  PriorityPollingInterval: 2,
  DynamicPriorityPolling: 3,
  FixedChunkSizePolling: 4,
  UseFsEvents: 5,
  UseFsEventsOnParentDirectory: 6,
} as const;

export type WatchDirectoryKind = number;
export const WatchDirectoryKind = {
  None: 0,
  UseFsEvents: 1,
  FixedPollingInterval: 2,
  DynamicPriorityPolling: 3,
  FixedChunkSizePolling: 4,
} as const;

export type PollingKind = number;
export const PollingKind = {
  None: 0,
  FixedInterval: 1,
  PriorityInterval: 2,
  DynamicPriority: 3,
  FixedChunkSize: 4,
} as const;

export interface WatchOptions {
  interval?: number;
  fileKind?: WatchFileKind;
  directoryKind?: WatchDirectoryKind;
  fallbackPolling?: PollingKind;
  syncWatchDir?: Tristate;
  excludeDir?: readonly string[];
  excludeFiles?: readonly string[];
}

const DEFAULT_INTERVAL_MS = 1000;

export function watchInterval(w: WatchOptions | undefined): number {
  if (w !== undefined && w.interval !== undefined) return w.interval;
  return DEFAULT_INTERVAL_MS;
}
