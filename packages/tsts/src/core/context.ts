/**
 * Cancellation context — minimal port of Go's `context.Context`.
 *
 * Port of TS-Go `internal/core/context.go` (22 LoC) plus the implicit
 * Go `context` package surface that the compiler relies on. JS has
 * AbortController natively; we wrap it so call sites translate
 * mechanically from `ctx.Value(key)` / `ctx.Done()` to TS.
 */

export interface CancellationToken {
  isCancelled(): boolean;
  throwIfCancelled(): void;
}

export class AbortControllerToken implements CancellationToken {
  readonly signal: AbortSignal;
  constructor(signal: AbortSignal) {
    this.signal = signal;
  }
  isCancelled(): boolean {
    return this.signal.aborted;
  }
  throwIfCancelled(): void {
    if (this.signal.aborted) {
      throw new DOMException("Cancelled", "AbortError");
    }
  }
}

export const noCancellationToken: CancellationToken = {
  isCancelled: () => false,
  throwIfCancelled: () => {},
};

// ---------------------------------------------------------------------------
// Request-ID context
// ---------------------------------------------------------------------------

const REQUEST_ID_KEY = Symbol("requestID");

export type RequestContext = ReadonlyMap<symbol, unknown>;

export function withRequestID(ctx: RequestContext, id: string): RequestContext {
  const m = new Map(ctx);
  m.set(REQUEST_ID_KEY, id);
  return m;
}

export function getRequestID(ctx: RequestContext): string {
  const v = ctx.get(REQUEST_ID_KEY);
  return typeof v === "string" ? v : "";
}

export const emptyRequestContext: RequestContext = new Map();
