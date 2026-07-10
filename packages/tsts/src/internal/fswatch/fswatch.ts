import type { bool, int } from "../../go/scalars.js";
import type { GoError, GoSlice } from "../../go/compat.js";
import type { Closer } from "../../go/io.js";
import * as errors from "../../go/errors.js";
import * as nodeFs from "node:fs";
import * as nodePath from "node:path";

// Host-native facade for the upstream internal/fswatch package. The OS-specific
// Go backends terminate at this boundary; Node's fs.watch supplies the same
// validated, batched subscription contract to the ported watch manager.

// --- event.go ---

// EventKind classifies a filesystem change.
export type EventKind = int;
export const EventUpdate: EventKind = 1;
export const EventDelete: EventKind = 2;

// EventKind.String renders the kind for diagnostics.
export function EventKind_String(k: EventKind): string {
  switch (k) {
    case EventUpdate:
      return "update";
    case EventDelete:
      return "delete";
    default:
      return "unknown";
  }
}

// Event describes a single filesystem change.
export interface Event {
  Kind: EventKind;
  Path: string;
}

// --- watcher.go ---

// Sentinel errors. Callers test these with errors.Is; ErrOverflow is
// recoverable (forces a full rescan) and ErrWatchTerminated is terminal.
export const ErrOverflow: GoError = errors.New("fswatch: event overflow; some changes were missed");
export const ErrWatchTerminated: GoError = errors.New("fswatch: watch terminated");
export const ErrUnavailable: GoError = errors.New("fswatch: watcher not available on this platform");

// WatchCallback receives batched filesystem events. When err is non-nil,
// callers use errors.Is to check for ErrOverflow / ErrWatchTerminated.
export type WatchCallback = (events: GoSlice<Event>, err: GoError) => void;

// WatchOption configures a watch. WithRecursive enables whole-tree watching;
// WithIgnore filters events before delivery. The host stub never applies them.
export interface WatchOption {
  readonly recursive?: bool;
  readonly ignore?: (path: string) => bool;
}

export interface WatchDirectoryRequest {
  Dir: string;
  Callback: WatchCallback;
  Options: GoSlice<WatchOption>;
}

// WithIgnore returns a WatchOption that drops events for paths where fn returns
// true.
export function WithIgnore(fn: (path: string) => bool): WatchOption {
  return { ignore: fn };
}

// WithRecursive returns a WatchOption that watches the entire directory tree
// rather than only direct children.
export function WithRecursive(): WatchOption {
  return { recursive: true as bool };
}

// Watch represents a live watch; Close stops watching and is idempotent. It is
// an io.Closer.
export interface Watch extends Closer {
  readonly __tsgoEmpty?: never;
}

// Watcher is a platform file-watcher backend. The execute watcher only consumes
// Name and WatchDirectory; the remaining methods complete the upstream surface.
export interface Watcher {
  Name(): string;
  Available(): bool;
  HasFastRecursiveBackend(): bool;
  WatchDirectory(dir: string, fn: WatchCallback, ...opts: GoSlice<WatchOption>): [Watch, GoError];
  WatchDirectories(requests: GoSlice<WatchDirectoryRequest>): [GoSlice<Watch>, GoError];
  WatchFile(path: string, fn: WatchCallback): [Watch, GoError];
}

interface ParsedWatchOptions {
  recursive: bool;
  ignore: ((path: string) => bool) | undefined;
}

class nodeWatch implements Watch {
  private closed = false;

  constructor(private readonly watcher: nodeFs.FSWatcher) {}

  Close(): GoError {
    if (!this.closed) {
      this.closed = true;
      this.watcher.close();
    }
    return undefined;
  }
}

class hostWatcher implements Watcher {
  Name(): string {
    return "node-fs";
  }
  Available(): bool {
    return true as bool;
  }
  HasFastRecursiveBackend(): bool {
    return (process.platform === "darwin" || process.platform === "win32") as bool;
  }
  WatchDirectory(dir: string, fn: WatchCallback, ...opts: GoSlice<WatchOption>): [Watch, GoError] {
    const [watches, err] = this.WatchDirectories([{ Dir: dir, Callback: fn, Options: opts }]);
    return err === undefined ? [watches[0]!, undefined] : [undefined as unknown as Watch, err];
  }
  WatchDirectories(requests: GoSlice<WatchDirectoryRequest>): [GoSlice<Watch>, GoError] {
    const validated: Array<{ request: WatchDirectoryRequest; options: ParsedWatchOptions }> = [];
    for (const request of requests) {
      const err = validateDirectoryRequest(request);
      if (err !== undefined) return [[], err];
      validated.push({ request, options: parseWatchOptions(request.Options) });
    }

    const watches: GoSlice<Watch> = [];
    for (const entry of validated) {
      const [watch, err] = createDirectoryWatch(entry.request.Dir, entry.request.Callback, entry.options);
      if (err !== undefined) {
        for (const opened of watches) opened.Close();
        return [[], err];
      }
      watches.push(watch);
    }
    return [watches, undefined];
  }
  WatchFile(path: string, fn: WatchCallback): [Watch, GoError] {
    if (!nodePath.isAbsolute(path)) return [undefined as unknown as Watch, new globalThis.Error("fswatch: path must be absolute")];
    if (typeof fn !== "function") return [undefined as unknown as Watch, new globalThis.Error("fswatch: callback must not be nil")];
    const parent = nodePath.dirname(path);
    if (parent === path) return [undefined as unknown as Watch, new globalThis.Error("fswatch: cannot watch a root path")];
    const expected = nodePath.resolve(path);
    return createDirectoryWatch(parent, (events, err) => {
      if (err !== undefined) {
        fn([], err);
        return;
      }
      const matching = events.filter((event) => nodePath.resolve(event.Path) === expected);
      if (matching.length > 0) fn(matching, undefined);
    }, { recursive: false as bool, ignore: undefined });
  }
}

function validateDirectoryRequest(request: WatchDirectoryRequest): GoError {
  if (!nodePath.isAbsolute(request.Dir)) return new globalThis.Error("fswatch: path must be absolute");
  if (typeof request.Callback !== "function") return new globalThis.Error("fswatch: callback must not be nil");
  try {
    if (!nodeFs.statSync(request.Dir).isDirectory()) return new globalThis.Error(`fswatch: not a directory: ${request.Dir}`);
  } catch (error) {
    return error instanceof globalThis.Error ? error : new globalThis.Error(String(error));
  }
  return undefined;
}

function parseWatchOptions(options: GoSlice<WatchOption>): ParsedWatchOptions {
  let recursive = false as bool;
  let ignore: ((path: string) => bool) | undefined;
  for (const option of options) {
    if (option.recursive) recursive = true as bool;
    if (option.ignore !== undefined) ignore = option.ignore;
  }
  return { recursive, ignore };
}

function createDirectoryWatch(dir: string, callback: WatchCallback, options: ParsedWatchOptions): [Watch, GoError] {
  const pending = new globalThis.Map<string, EventKind>();
  let scheduled = false;
  let terminated = false;
  const flush = (): void => {
    scheduled = false;
    if (terminated || pending.size === 0) return;
    const events = [...pending].sort(([left], [right]) => compareBytes(left, right)).map(([Path, Kind]) => ({ Path, Kind }));
    pending.clear();
    callback(events, undefined);
  };
  try {
    const watcher = nodeFs.watch(dir, { recursive: options.recursive }, (_eventType, fileName) => {
      if (fileName === null) {
        callback([], ErrOverflow);
        return;
      }
      const eventPath = nodePath.resolve(dir, fileName.toString());
      if (options.ignore?.(eventPath)) return;
      pending.set(eventPath, nodeFs.existsSync(eventPath) ? EventUpdate : EventDelete);
      if (!scheduled) {
        scheduled = true;
        queueMicrotask(flush);
      }
    });
    watcher.on("error", () => {
      if (terminated) return;
      terminated = true;
      pending.clear();
      callback([], ErrWatchTerminated);
    });
    return [new nodeWatch(watcher), undefined];
  } catch (error) {
    return [undefined as unknown as Watch, error instanceof globalThis.Error ? error : new globalThis.Error(String(error))];
  }
}

function compareBytes(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left), Buffer.from(right));
}

// Default returns the recommended watcher for the current OS. In the TSTS host
// this is the Node host implementation.
export function Default(): Watcher {
  return new hostWatcher();
}
