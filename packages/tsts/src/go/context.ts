// Faithful TypeScript port of Go's `context` standard library package (the subset
// used by typescript-go): root contexts, cancellation, and immutable values.
//
// The empty root contexts never cancel:
//   - `Done()` returns a nil channel (Go: `emptyCtx.Done()` returns nil), i.e. a
//     channel that is never ready, represented as `undefined`.
//   - `Err()` returns nil (no error), i.e. `undefined`.
//   - `Deadline()` returns the zero `time.Time` and `false` (no deadline set).
//   - `Value(key)` walks the value chain (Go's `valueCtx.Value` / `value`).
//
// `WithValue(parent, key, val)` returns a new `valueCtx` that answers `Value(key)`
// with `val` and delegates everything else to `parent`. JavaScript erases Go's
// defined primitive types, so named Go context-key types must be represented with
// `NewContextKeyType`; this preserves both their distinct type identity and their
// payload's Go value equality. Multiple Go return values map to tuples, so
// `Deadline()` returns `[Time, bool]`.

import type { bool } from "./scalars.js";
import type { GoChan, GoError } from "./compat.js";
import { GoChanAsReceive, GoChanClose, GoChanReceive, MakeGoChan } from "./compat.js";
import { New } from "./errors.js";
import { Time } from "./time.js";

// Go: var Canceled = errors.New("context canceled")
export const Canceled: GoError = New("context canceled");

// Go: type CancelFunc func()
export type CancelFunc = () => void;

// Go: type CancelCauseFunc func(cause error)
export type CancelCauseFunc = (cause: GoError) => void;

// Go: type Context interface { Deadline; Done; Err; Value }
//
// Done() returns `<-chan struct{}` which may be nil; the nil channel is modeled as
// `undefined`. Deadline()'s `(time.Time, bool)` becomes a `[Time, bool]` tuple.
export interface Context {
  Deadline(): [Time, bool];
  Done(): GoChan<EmptyStruct, "receive"> | undefined;
  Err(): GoError;
  Value(key: unknown): unknown;
}

// Go's `struct{}` element type for the Done channel, matching the empty-struct
// shape used elsewhere in the port (see core/semaphore.ts, core/workgroup.ts).
type EmptyStruct = { readonly __tsgoEmpty?: never };
const cancelContextKey = Symbol("context.cancelCtx");
const namedContextKey = Symbol("context.namedKey");

export type ContextKeyPayload = string | number | bigint | boolean | symbol | undefined;

export interface ContextKey<Value extends ContextKeyPayload> {
  readonly [namedContextKey]: {
    readonly typeIdentity: symbol;
    readonly value: Value;
  };
}

export type ContextKeyType<Value extends ContextKeyPayload> = (value: Value) => ContextKey<Value>;

export function NewContextKeyType<Value extends ContextKeyPayload>(): ContextKeyType<Value> {
  const typeIdentity = Symbol("context.keyType");
  return (value: Value): ContextKey<Value> => Object.freeze({
    [namedContextKey]: Object.freeze({ typeIdentity, value }),
  });
}

// Go: type emptyCtx struct{}
//
// An emptyCtx is never canceled, has no values, and has no deadline. It is the
// common base of backgroundCtx and todoCtx.
class emptyCtx implements Context {
  // Go: func (emptyCtx) Deadline() (deadline time.Time, ok bool) { return }
  Deadline(): [Time, bool] {
    return [new Time(), false as bool];
  }

  // Go: func (emptyCtx) Done() <-chan struct{} { return nil }
  Done(): GoChan<EmptyStruct, "receive"> | undefined {
    return undefined;
  }

  // Go: func (emptyCtx) Err() error { return nil }
  Err(): GoError {
    return undefined;
  }

  // Go: func (emptyCtx) Value(key any) any { return nil }
  Value(_key: unknown): unknown {
    return undefined;
  }
}

// Go: type backgroundCtx struct{ emptyCtx }
class backgroundCtx extends emptyCtx {}

// Go: type todoCtx struct{ emptyCtx }
class todoCtx extends emptyCtx {}

class cancelCtx implements Context {
  private readonly done = MakeGoChan<EmptyStruct>(0, (): EmptyStruct => ({}));
  private readonly children = new Set<cancelCtx>();
  private canceled = false;
  private stopParent: (() => void) | undefined;

  constructor(private readonly parent: Context) {
    const parentDone = parent.Done();
    if (parentDone === undefined) {
      return;
    }
    if (parent.Err() !== undefined) {
      this.cancel();
      return;
    }

    const cancelParent = parent.Value(cancelContextKey);
    if (cancelParent instanceof cancelCtx && cancelParent.Done() === parentDone) {
      cancelParent.children.add(this);
      this.stopParent = () => cancelParent.children.delete(this);
    } else {
      this.stopParent = GoChanReceive(parentDone, () => this.cancel());
    }
  }

  cancel(): void {
    if (this.canceled) {
      return;
    }
    this.canceled = true;
    this.stopParent?.();
    this.stopParent = undefined;
    GoChanClose(this.done);
    for (const child of this.children) {
      child.cancel();
    }
    this.children.clear();
  }

  Deadline(): [Time, bool] {
    return this.parent.Deadline();
  }

  Done(): GoChan<EmptyStruct, "receive"> {
    return GoChanAsReceive(this.done);
  }

  Err(): GoError {
    return this.canceled ? Canceled : undefined;
  }

  Value(key: unknown): unknown {
    if (key === cancelContextKey) {
      return this;
    }
    return this.parent.Value(key);
  }
}

// Go: func Background() Context { return backgroundCtx{} }
//
// Returns a non-nil, empty Context. It is never canceled, has no values, and has
// no deadline.
export function Background(): Context {
  return new backgroundCtx();
}

// Go: func TODO() Context { return todoCtx{} }
export function TODO(): Context {
  return new todoCtx();
}

export function WithCancel(parent: Context): [Context, CancelFunc] {
  if (parent === undefined) {
    throw new globalThis.Error("cannot create context from nil parent");
  }
  const context = new cancelCtx(parent);
  return [context, () => context.cancel()];
}

// Go: type valueCtx struct { Context; key, val any }
//
// A valueCtx carries a key-value pair. It implements Value for that key and
// delegates all other calls to the embedded Context (`parent`).
class valueCtx implements Context {
  readonly parent: Context;
  readonly key: unknown;
  readonly val: unknown;

  constructor(parent: Context, key: unknown, val: unknown) {
    this.parent = parent;
    this.key = key;
    this.val = val;
  }

  // Go: func (c *valueCtx) Value(key any) any { if c.key == key { return c.val }; return value(c.Context, key) }
  Value(key: unknown): unknown {
    if (contextKeysEqual(this.key, key)) {
      return this.val;
    }
    return this.parent.Value(key);
  }

  Deadline(): [Time, bool] {
    return this.parent.Deadline();
  }

  Done(): GoChan<EmptyStruct, "receive"> | undefined {
    return this.parent.Done();
  }

  Err(): GoError {
    return this.parent.Err();
  }
}

// Go: func WithValue(parent Context, key, val any) Context
//
// Returns a derived context that carries `val` for `key` and delegates all other
// operations to `parent`. Direct primitive keys use Go primitive value equality;
// direct objects are pointer-like and use identity. Defined primitive key types
// use `NewContextKeyType`, which adds the erased Go type identity. JavaScript
// collection/function values have no supported comparable Go representation and
// are rejected rather than silently receiving JavaScript identity semantics.
export function WithValue(parent: Context, key: unknown, val: unknown): Context {
  if (parent === undefined) {
    throw new globalThis.Error("cannot create context from nil parent");
  }
  if (key === undefined) {
    throw new globalThis.Error("nil key");
  }
  validateContextKey(key);
  return new valueCtx(parent, key, val);
}

function contextKeysEqual(left: unknown, right: unknown): boolean {
  const leftNamed = getNamedContextKey(left);
  const rightNamed = getNamedContextKey(right);
  if (leftNamed !== undefined || rightNamed !== undefined) {
    return leftNamed !== undefined &&
      rightNamed !== undefined &&
      leftNamed.typeIdentity === rightNamed.typeIdentity &&
      leftNamed.value === rightNamed.value;
  }
  return left === right;
}

function getNamedContextKey(value: unknown): ContextKey<ContextKeyPayload>[typeof namedContextKey] | undefined {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  return (value as Partial<ContextKey<ContextKeyPayload>>)[namedContextKey];
}

function validateContextKey(key: unknown): void {
  const named = getNamedContextKey(key);
  if (named !== undefined) {
    if (!isContextKeyPayload(named.value)) {
      throw new globalThis.Error("key is not comparable");
    }
    return;
  }

  if (
    key === null ||
    typeof key === "function" ||
    Array.isArray(key) ||
    ArrayBuffer.isView(key) ||
    key instanceof ArrayBuffer ||
    key instanceof Map ||
    key instanceof Set ||
    key instanceof WeakMap ||
    key instanceof WeakSet
  ) {
    throw new globalThis.Error("key is not comparable");
  }
}

function isContextKeyPayload(value: unknown): value is ContextKeyPayload {
  return value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "boolean" ||
    typeof value === "symbol";
}
