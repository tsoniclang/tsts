import { New as newError } from "@gotots/gostdlib/errors.js";
import { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { Awaitable, bool, gostring, int } from "@gotots/runtime/scalars.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";

import {
  $goInterfaceMethod$Available$void_to_bool,
  $goInterfaceMethod$Close$void_to_Named_error,
  $goInterfaceMethod$HasFastRecursiveBackend$void_to_bool,
  $goInterfaceMethod$Name$void_to_string,
  $goInterfaceMethod$WatchDirectory$string_Named_fswatch$WatchCallback_Variadic_SliceOf_Named_fswatch$WatchOption_to_Named_fswatch$Watch_Named_error,
  $goInterfaceMethod$WatchFile$string_Named_fswatch$WatchCallback_to_Named_fswatch$Watch_Named_error,
  $goInterfaceMethod$fswatch$applyWatchOption$PointerTo_Named_fswatch$watchOptions_to_void,
  $goInterfaceMethod$fswatch$unexported$void_to_void,
} from "../../../../../../support/interface-methods.js";
import type {
  $goInterface$Interface_Method_Error_void_to_string as GoInterface,
} from "../../../../../../support/interface-contracts.js";

interface NodeStats {
  isDirectory(): boolean;
}

interface NodeFSWatcher {
  close(): void;
  on(event: "error", listener: (failure: Error) => void): NodeFSWatcher;
}

interface NodeFS {
  existsSync(path: string): boolean;
  statSync(path: string): NodeStats;
  watch(
    path: string,
    options: { readonly encoding: "utf8"; readonly recursive: boolean },
    listener: (event: "change" | "rename", fileName: string | null) => void,
  ): NodeFSWatcher;
}

interface NodePath {
  basename(path: string): string;
  dirname(path: string): string;
  isAbsolute(path: string): boolean;
  resolve(...paths: string[]): string;
}

interface NodeTimer {}

interface NodeTimers {
  clearTimeout(timer: NodeTimer): void;
  setTimeout(callback: () => void, delay: number): NodeTimer;
}

interface NodeProcess {
  getBuiltinModule(name: "node:fs"): NodeFS;
  getBuiltinModule(name: "node:path"): NodePath;
  getBuiltinModule(name: "node:timers"): NodeTimers;
}

const nodeProcess = (globalThis as typeof globalThis & { readonly process: NodeProcess }).process;
const nodeFS = nodeProcess.getBuiltinModule("node:fs");
const nodePath = nodeProcess.getBuiltinModule("node:path");
const nodeTimers = nodeProcess.getBuiltinModule("node:timers");

export const Watcher$contract: readonly object[] = Object.freeze([
  $goInterfaceMethod$Available$void_to_bool,
  $goInterfaceMethod$HasFastRecursiveBackend$void_to_bool,
  $goInterfaceMethod$Name$void_to_string,
  $goInterfaceMethod$WatchDirectory$string_Named_fswatch$WatchCallback_Variadic_SliceOf_Named_fswatch$WatchOption_to_Named_fswatch$Watch_Named_error,
  $goInterfaceMethod$WatchFile$string_Named_fswatch$WatchCallback_to_Named_fswatch$Watch_Named_error,
  $goInterfaceMethod$fswatch$unexported$void_to_void,
]);
export const Watch$contract: readonly object[] = Object.freeze([
  $goInterfaceMethod$Close$void_to_Named_error,
  $goInterfaceMethod$fswatch$unexported$void_to_void,
]);
export const WatchOption$contract: readonly object[] = Object.freeze([
  $goInterfaceMethod$fswatch$applyWatchOption$PointerTo_Named_fswatch$watchOptions_to_void,
]);

const objectIdentities = new WeakMap<object, number>();
let nextObjectIdentity = 1;

abstract class ProductInterfaceValue extends GoInterfaceValue {
  static readonly comparable = true;
  readonly $go$type: { readonly comparable: boolean } = ProductInterfaceValue;
  readonly $go$formatString = false;
  abstract override readonly $go$methods: ReadonlySet<object>;
  abstract readonly goTypeName: string;

  $go$implements(contract: readonly object[]): boolean {
    return contract.every((token) => this.$go$methods.has(token));
  }

  $go$equal(other: GoInterfaceValue): boolean {
    return this === other;
  }

  $go$hash(): number {
    const existing = objectIdentities.get(this);
    if (existing !== undefined) {
      return existing;
    }
    const identity = nextObjectIdentity;
    nextObjectIdentity++;
    objectIdentities.set(this, identity);
    return identity;
  }

  $go$format(verb: string): string {
    return verb === "T" ? this.goTypeName : `&{${this.goTypeName}}`;
  }
}

export class EventKind {
  constructor(public readonly $value: int) {}

  String(): gostring {
    if (this.$value === 1) {
      return "update";
    }
    if (this.$value === 2) {
      return "delete";
    }
    return "unknown";
  }
}

export function EventUpdate$constant(): EventKind {
  return new EventKind(1);
}

export function EventDelete$constant(): EventKind {
  return new EventKind(2);
}

export let EventUpdate = EventUpdate$constant();
export let EventDelete = EventDelete$constant();

export type Event$Storage = {
  Kind: int;
  Path: gostring;
};

export class Event {
  declare private readonly $goType: void;

  private constructor(private readonly $storage: Event$Storage) {}

  static $make(kind: EventKind, path: gostring): Event {
    return new Event({ Kind: kind.$value, Path: path });
  }

  static $storageOf(source: Event): Event$Storage {
    return source.$storage;
  }

  static $fromStorage(source: Event$Storage): Event {
    return new Event(source);
  }

  get Kind(): EventKind {
    return new EventKind(this.$storage.Kind);
  }

  set Kind(value: EventKind) {
    this.$storage.Kind = value.$value;
  }

  get Path(): gostring {
    return this.$storage.Path;
  }

  set Path(value: gostring) {
    this.$storage.Path = value;
  }

  static $zero(): Event {
    return Event.$make(new EventKind(0), "");
  }

  static $copy(source: Event): Event {
    return Event.$make(source.Kind, source.Path);
  }
}

interface WatchOptions {
  ignore: ((path: gostring) => Awaitable<bool>) | undefined;
  recursive: bool;
}

export interface WatchOption extends GoInterfaceValue {
  $go$private$fswatch$applyWatchOption(options: WatchOptions): Awaitable<void>;
}

export function WatchOption$is(
  value: GoInterfaceValue | undefined,
): value is WatchOption {
  return value !== undefined && value.$go$implements(WatchOption$contract);
}

class IgnoreOption extends ProductInterfaceValue implements WatchOption {
  readonly $go$methods = new Set<object>(WatchOption$contract);
  readonly goTypeName = "fswatch.ignoreOption";

  constructor(private readonly ignore: (path: gostring) => Awaitable<bool>) {
    super();
  }

  $go$private$fswatch$applyWatchOption(options: WatchOptions): void {
    options.ignore = this.ignore;
  }
}

class RecursiveOption extends ProductInterfaceValue implements WatchOption {
  readonly $go$methods = new Set<object>(WatchOption$contract);
  readonly goTypeName = "fswatch.recursiveOption";

  $go$private$fswatch$applyWatchOption(options: WatchOptions): void {
    options.recursive = true;
  }
}

export function WithIgnore(
  fn: ((path: gostring) => Awaitable<bool>) | undefined,
): WatchOption | undefined {
  return fn === undefined ? undefined : new IgnoreOption(fn);
}

export function WithRecursive(): WatchOption | undefined {
  return new RecursiveOption();
}

export class WatchCallback {
  constructor(
    public readonly $value:
      | ((events: RuntimeSlice<Event$Storage>, failure: GoInterface | undefined) => Awaitable<void>)
      | undefined,
  ) {}
}

export interface Watch extends GoInterfaceValue {
  Close(): Awaitable<GoInterface | undefined>;
  $go$private$fswatch$unexported(): Awaitable<void>;
}

export function Watch$is(value: GoInterfaceValue | undefined): value is Watch {
  return value !== undefined && value.$go$implements(Watch$contract);
}

class WatchHandle extends ProductInterfaceValue implements Watch {
  readonly $go$methods = new Set<object>(Watch$contract);
  readonly goTypeName = "*fswatch.watch";
  private closed = false;

  constructor(
    private readonly watcher: NodeFSWatcher,
    private readonly timer: { current: NodeTimer | undefined },
  ) {
    super();
  }

  Close(): GoInterface | undefined {
    if (!this.closed) {
      this.closed = true;
      if (this.timer.current !== undefined) {
        nodeTimers.clearTimeout(this.timer.current);
        this.timer.current = undefined;
      }
      this.watcher.close();
    }
    return undefined;
  }

  $go$private$fswatch$unexported(): void {}
}

export interface Watcher extends GoInterfaceValue {
  Available(): Awaitable<bool>;
  HasFastRecursiveBackend(): Awaitable<bool>;
  Name(): Awaitable<gostring>;
  WatchDirectory(
    dir: gostring,
    fn: WatchCallback,
    options: RuntimeSlice<WatchOption | undefined>,
  ): Awaitable<[Watch | undefined, GoInterface | undefined]>;
  WatchFile(
    path: gostring,
    fn: WatchCallback,
  ): Awaitable<[Watch | undefined, GoInterface | undefined]>;
  $go$private$fswatch$unexported(): Awaitable<void>;
}

export function Watcher$is(
  value: GoInterfaceValue | undefined,
): value is Watcher {
  return value !== undefined && value.$go$implements(Watcher$contract);
}

class NodeWatcher extends ProductInterfaceValue implements Watcher {
  readonly $go$methods = new Set<object>(Watcher$contract);
  readonly goTypeName = "*fswatch.watcher";

  constructor(
    private readonly name: gostring,
    private readonly available: bool,
    private readonly fastRecursive: bool,
  ) {
    super();
  }

  Available(): bool {
    return this.available;
  }

  HasFastRecursiveBackend(): bool {
    return this.fastRecursive;
  }

  Name(): gostring {
    return this.name;
  }

  async WatchDirectory(
    dir: gostring,
    fn: WatchCallback,
    selected: RuntimeSlice<WatchOption | undefined>,
  ): Promise<[Watch | undefined, GoInterface | undefined]> {
    if (!this.available) {
      return [undefined, $state.ErrUnavailable];
    }
    if (fn.$value === undefined) {
      return [undefined, newError("fswatch: callback must not be nil")];
    }
    if (!nodePath.isAbsolute(dir)) {
      return [undefined, newError("fswatch: path must be absolute")];
    }
    if (!nodeFS.existsSync(dir)) {
      return [undefined, newError(`fswatch: directory does not exist: ${dir}`)];
    }
    try {
      if (!nodeFS.statSync(dir).isDirectory()) {
        return [undefined, newError(`fswatch: path is not a directory: ${dir}`)];
      }
    } catch {
      return [undefined, newError(`fswatch: cannot inspect directory: ${dir}`)];
    }

    const options: WatchOptions = { ignore: undefined, recursive: false };
    for (let index = 0; index < selected.length; index++) {
      await selected.get(index)?.$go$private$fswatch$applyWatchOption(options);
    }
    return this.watchPath(dir, undefined, fn, options);
  }

  async WatchFile(
    path: gostring,
    fn: WatchCallback,
  ): Promise<[Watch | undefined, GoInterface | undefined]> {
    if (!this.available) {
      return [undefined, $state.ErrUnavailable];
    }
    if (fn.$value === undefined) {
      return [undefined, newError("fswatch: callback must not be nil")];
    }
    if (!nodePath.isAbsolute(path)) {
      return [undefined, newError("fswatch: path must be absolute")];
    }
    const parent = nodePath.dirname(path);
    if (parent === path) {
      return [undefined, newError("fswatch: cannot watch a root path")];
    }
    if (!nodeFS.existsSync(parent)) {
      return [undefined, newError(`fswatch: directory does not exist: ${parent}`)];
    }
    return this.watchPath(parent, nodePath.basename(path), fn, {
      ignore: undefined,
      recursive: false,
    });
  }

  $go$private$fswatch$unexported(): void {}

  private watchPath(
    root: string,
    selectedName: string | undefined,
    fn: WatchCallback,
    options: WatchOptions,
  ): [Watch | undefined, GoInterface | undefined] {
    const pending = new Map<string, EventKind>();
    const timer: { current: NodeTimer | undefined } = {
      current: undefined,
    };
    let delivery = Promise.resolve();

    const flush = (): void => {
      timer.current = undefined;
      if (pending.size === 0 || fn.$value === undefined) {
        return;
      }
      const events = [...pending.entries()].map(([path, kind]) =>
        Event.$storageOf(Event.$make(kind, path))
      );
      pending.clear();
      delivery = delivery.then(async () => {
        await fn.$value?.(RuntimeSlice.literal<Event$Storage>(events), undefined);
      });
    };

    let watcher: NodeFSWatcher;
    try {
      watcher = nodeFS.watch(
        root,
        { encoding: "utf8", recursive: options.recursive },
        (event, fileName) => {
          if (fileName === null || (selectedName !== undefined && fileName !== selectedName)) {
            return;
          }
          const path = nodePath.resolve(root, fileName);
          delivery = delivery.then(async () => {
            if (options.ignore !== undefined && await options.ignore(path)) {
              return;
            }
            const kind = event === "rename" && !nodeFS.existsSync(path)
              ? EventDelete$constant()
              : EventUpdate$constant();
            pending.set(path, kind);
            if (timer.current === undefined) {
              timer.current = nodeTimers.setTimeout(flush, 50);
            }
          });
        },
      );
    } catch {
      return [undefined, newError(`fswatch: cannot watch path: ${root}`)];
    }
    watcher.on("error", (failure) => {
      delivery = delivery.then(async () => {
        await fn.$value?.(
          RuntimeSlice.literal<Event$Storage>([]),
          newError(`fswatch: watch terminated: ${failure.message}`),
        );
      });
    });
    return [new WatchHandle(watcher, timer), undefined];
  }
}

const inotify = new NodeWatcher("inotify", true, true);
const unavailableFSEvents = new NodeWatcher("fsevents", false, true);
const unavailableFanotify = new NodeWatcher("fanotify", false, true);
const unavailableKqueue = new NodeWatcher("kqueue", false, false);
const unavailableWindows = new NodeWatcher("windows", false, true);

function Inotify(): Watcher | undefined {
  return inotify;
}

function FSEvents(): Watcher | undefined {
  return unavailableFSEvents;
}

function Fanotify(): Watcher | undefined {
  return unavailableFanotify;
}

function Kqueue(): Watcher | undefined {
  return unavailableKqueue;
}

function Windows(): Watcher | undefined {
  return unavailableWindows;
}

export function Default(): Watcher | undefined {
  return inotify;
}

export const $state: {
  ErrOverflow: GoInterface | undefined;
  ErrUnavailable: GoInterface | undefined;
  ErrWatchTerminated: GoInterface | undefined;
} = {
  ErrOverflow: undefined,
  ErrUnavailable: undefined,
  ErrWatchTerminated: undefined,
};

export function $initialize(): void {
  EventUpdate = EventUpdate$constant();
  EventDelete = EventDelete$constant();
  $state.ErrOverflow = newError("fswatch: event overflow; some changes were missed");
  $state.ErrUnavailable = newError("fswatch: watcher not available on this platform");
  $state.ErrWatchTerminated = newError("fswatch: watch terminated");
}
