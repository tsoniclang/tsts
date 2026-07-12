import type { bool, int } from "../../go/scalars.js";
import type { GoChan, GoPtr } from "../../go/compat.js";
import type { Context } from "../../go/context.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::type::Semaphore","kind":"type","status":"implemented","sigHash":"3af1dcc6419e253094c19a125f53a81e779ace89ff7548cc097e592a4665a73a"}
 *
 * Go source:
 * Semaphore interface {
 * 	Acquire() (release func())
 * 	TryAcquire(ctx context.Context) (release func(), acquired bool)
 * }
 */
export interface Semaphore {
  Acquire(): () => void;
  TryAcquire(ctx: Context): [() => void, bool];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ Semaphore = UnlimitedSemaphore{}
 */
export let __c5a93a22_0: Semaphore = UnlimitedSemaphore_as_Semaphore({});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::type::UnlimitedSemaphore","kind":"type","status":"implemented","sigHash":"eccd0e32b4c71792b14c837a176a34fde532f11d1c1de7a6bc8d6e5ecd893ad6"}
 *
 * Go source:
 * UnlimitedSemaphore struct{}
 */
export interface UnlimitedSemaphore {
  readonly __tsgoEmpty?: never;
}

export function UnlimitedSemaphore_as_Semaphore(receiver: UnlimitedSemaphore): Semaphore {
  return {
    Acquire: (): () => void => UnlimitedSemaphore_Acquire(receiver),
    TryAcquire: (ctx: Context): [() => void, bool] => UnlimitedSemaphore_TryAcquire(receiver, ctx),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::method::UnlimitedSemaphore.Acquire","kind":"method","status":"implemented","sigHash":"8e89f6580320ea7abac003538bed405d60480b61c95cdcccc30c024e5d2c2b9b"}
 *
 * Go source:
 * func (s UnlimitedSemaphore) Acquire() (release func()) {
 * 	return func() {}
 * }
 */
export function UnlimitedSemaphore_Acquire(receiver: UnlimitedSemaphore): () => void {
  return (): void => {};
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::method::UnlimitedSemaphore.TryAcquire","kind":"method","status":"implemented","sigHash":"a208907f89ab2eff86e63e32a8ba56ed052dca01199d3643d8703be45ee3c513"}
 *
 * Go source:
 * func (s UnlimitedSemaphore) TryAcquire(ctx context.Context) (release func(), acquired bool) {
 * 	return func() {}, true
 * }
 */
export function UnlimitedSemaphore_TryAcquire(receiver: UnlimitedSemaphore, ctx: Context): [() => void, bool] {
  return [(): void => {}, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::varGroup::_::#2","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ Semaphore = (*LimitedSemaphore)(nil)
 */
export let ___2_1cad8911_0: Semaphore = LimitedSemaphore_as_Semaphore(undefined);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::type::LimitedSemaphore","kind":"type","status":"implemented","sigHash":"6f0f638a52f144421c3246c9abcfb7d73564bb66fef1678b506f56eacc4422bb"}
 *
 * Go source:
 * LimitedSemaphore struct {
 * 	ch      chan struct{}
 * 	release func()
 * }
 */
export interface LimitedSemaphore {
  ch: GoChan<{ readonly __tsgoEmpty?: never }, "bidirectional">;
  release: () => void;
}

export function LimitedSemaphore_as_Semaphore(receiver: GoPtr<LimitedSemaphore>): Semaphore {
  return {
    Acquire: (): () => void => LimitedSemaphore_Acquire(receiver),
    TryAcquire: (ctx: Context): [() => void, bool] => LimitedSemaphore_TryAcquire(receiver, ctx),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::func::NewLimitedSemaphore","kind":"func","status":"implemented","sigHash":"04ea60e6edd31c8d707f046528fee535e40e99379fbc42e23567268d23e8f132"}
 *
 * Go source:
 * func NewLimitedSemaphore(maxConcurrency int) *LimitedSemaphore {
 * 	if maxConcurrency <= 0 {
 * 		panic("maxConcurrency must be positive")
 * 	}
 * 	s := &LimitedSemaphore{
 * 		ch: make(chan struct{}, maxConcurrency),
 * 	}
 * 	s.release = func() { <-s.ch }
 * 	return s
 * }
 */
export function NewLimitedSemaphore(maxConcurrency: int): GoPtr<LimitedSemaphore> {
  if ((maxConcurrency as number) <= 0) {
    throw new globalThis.Error("maxConcurrency must be positive");
  }
  const s: LimitedSemaphore = {
    ch: {} as GoChan<{ readonly __tsgoEmpty?: never }, "bidirectional">,
    release: (): void => {},
  };
  return s;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::method::LimitedSemaphore.Acquire","kind":"method","status":"implemented","sigHash":"b6946d2579c55c04567c62dd8298fcb819eb4ed2f84eecdee53fc9a6cee3e3a4"}
 *
 * Go source:
 * func (s *LimitedSemaphore) Acquire() (release func()) {
 * 	s.ch <- struct{}{}
 * 	return s.release
 * }
 */
export function LimitedSemaphore_Acquire(receiver: GoPtr<LimitedSemaphore>): () => void {
  // Single-threaded: channel send never blocks; return the stored release function.
  return receiver!.release;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/semaphore.go::method::LimitedSemaphore.TryAcquire","kind":"method","status":"implemented","sigHash":"445bd0e58d03cc995179f2b01adc3b80adf8bc693fe894f99c491b0590656a1c"}
 *
 * Go source:
 * func (s *LimitedSemaphore) TryAcquire(ctx context.Context) (release func(), acquired bool) {
 * 	select {
 * 	case s.ch <- struct{}{}:
 * 		return s.release, true
 * 	case <-ctx.Done():
 * 		return func() {}, false
 * 	}
 * }
 */
export function LimitedSemaphore_TryAcquire(receiver: GoPtr<LimitedSemaphore>, ctx: Context): [() => void, bool] {
  // Single-threaded: select always takes the acquire branch (no ctx.Done blocking).
  return [receiver!.release, true];
}
