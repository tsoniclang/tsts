import type { Watcher } from "./tsc/index.js";

export interface WatchHost {
  readonly now: () => Date;
  readonly setTimeout: (callback: () => void, ms: number) => unknown;
  readonly clearTimeout: (handle: unknown) => void;
}

export interface WatchChange {
  readonly fileName: string;
  readonly kind: WatchChangeKind;
  readonly time: Date;
}

export enum WatchChangeKind {
  Created = 0,
  Updated = 1,
  Deleted = 2,
}

export class BuildWatcher implements Watcher {
  private readonly host: WatchHost;
  private readonly cycle: () => void;
  private readonly delayMs: number;
  private pendingChanges: WatchChange[] = [];
  private timer: unknown;
  private closed = false;

  constructor(host: WatchHost, cycle: () => void, delayMs = 250) {
    this.host = host;
    this.cycle = cycle;
    this.delayMs = delayMs;
  }

  enqueue(fileName: string, kind: WatchChangeKind): void {
    if (this.closed) return;
    this.pendingChanges.push({ fileName, kind, time: this.host.now() });
    this.schedule();
  }

  changes(): readonly WatchChange[] {
    return this.pendingChanges;
  }

  doCycle(): void {
    if (this.closed) return;
    const changes = this.pendingChanges;
    this.pendingChanges = [];
    if (changes.length === 0) return;
    this.cycle();
  }

  close(): void {
    this.closed = true;
    if (this.timer !== undefined) this.host.clearTimeout(this.timer);
    this.timer = undefined;
    this.pendingChanges = [];
  }

  private schedule(): void {
    if (this.timer !== undefined) return;
    this.timer = this.host.setTimeout(() => {
      this.timer = undefined;
      this.doCycle();
    }, this.delayMs);
  }
}
