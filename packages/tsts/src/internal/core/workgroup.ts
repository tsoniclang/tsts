import type { bool } from "../../go/scalars.js";
import type { GoChan, GoError, GoPtr, GoSlice } from "../../go/compat.js";
import type { Context } from "../../go/context.js";
import { type Group, WithContext } from "../../go/golang.org/x/sync/errgroup.js";
import { Mutex, WaitGroup } from "../../go/sync.js";
import { Bool } from "../../go/sync/atomic.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::type::WorkGroup","kind":"type","status":"implemented","sigHash":"2f0cb3af982999597d8142aa9e1f01d02a1a46f439da5d457604af2177a6e56d"}
 *
 * Go source:
 * WorkGroup interface {
 * 	// Queue queues a function to run. It may be invoked immediately, or deferred until RunAndWait.
 * 	// It is not safe to call Queue after RunAndWait has returned.
 * 	Queue(fn func())
 * 
 * 	// RunAndWait runs all queued functions, blocking until they have all completed.
 * 	RunAndWait()
 * }
 */
export interface WorkGroup {
  Queue(fn: GoFunc<() => void>): void;
  RunAndWait(): void;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::func::NewWorkGroup","kind":"func","status":"implemented","sigHash":"1ea31ba49674c94947d50bfaf04e58059059eb8b0fc25dea263b3b3338b451d8"}
 *
 * Go source:
 * func NewWorkGroup(singleThreaded bool) WorkGroup {
 * 	if singleThreaded {
 * 		return &singleThreadedWorkGroup{}
 * 	}
 * 	return &parallelWorkGroup{}
 * }
 */
export function NewWorkGroup(singleThreaded: bool): GoInterface<WorkGroup> {
  if (singleThreaded) {
    const state: singleThreadedWorkGroup = { done: new Bool(), fnsMu: new Mutex(), fns: [] };
    return singleThreadedWorkGroup_as_WorkGroup(state);
  }
  const state: parallelWorkGroup = { done: new Bool(), wg: new WaitGroup() };
  return parallelWorkGroup_as_WorkGroup(state);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::type::parallelWorkGroup","kind":"type","status":"implemented","sigHash":"943d3288e34770aa62a99a3c142e00dc3235ad10931bad3d4a5d1b70b67197a0"}
 *
 * Go source:
 * parallelWorkGroup struct {
 * 	done atomic.Bool
 * 	wg   sync.WaitGroup
 * }
 */
export interface parallelWorkGroup {
  done: Bool;
  wg: WaitGroup;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"9ac02571299d08ea398b34f1880c1d4b3c634ff423ed6c5f930c96390926ffcc"}
 *
 * Go source:
 * var _ WorkGroup = (*parallelWorkGroup)(nil)
 */
export let __7c9694b3_0: GoInterface<WorkGroup> = parallelWorkGroup_as_WorkGroup(undefined);

export function parallelWorkGroup_as_WorkGroup(receiver: GoPtr<parallelWorkGroup>): WorkGroup {
  return {
    Queue: (fn: () => void): void => parallelWorkGroup_Queue(receiver, fn),
    RunAndWait: (): void => parallelWorkGroup_RunAndWait(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::method::parallelWorkGroup.Queue","kind":"method","status":"implemented","sigHash":"3a613e599ba2aa8046b19e5cea538987a132e970ec82b28e8d9dd4448e04b823"}
 *
 * Go source:
 * func (w *parallelWorkGroup) Queue(fn func()) {
 * 	if w.done.Load() {
 * 		panic("Queue called after RunAndWait returned")
 * 	}
 * 
 * 	w.wg.Go(func() {
 * 		fn()
 * 	})
 * }
 */
export function parallelWorkGroup_Queue(receiver: GoPtr<parallelWorkGroup>, fn: GoFunc<() => void>): void {
  if (receiver!.done.Load()) {
    throw new globalThis.Error("Queue called after RunAndWait returned");
  }
  receiver!.wg.Go(fn!);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::method::parallelWorkGroup.RunAndWait","kind":"method","status":"implemented","sigHash":"704756b7f57ff3271356ab6aed02912229fae08d2e404ad177d526f9a7ec5472"}
 *
 * Go source:
 * func (w *parallelWorkGroup) RunAndWait() {
 * 	defer w.done.Store(true)
 * 	w.wg.Wait()
 * }
 */
export function parallelWorkGroup_RunAndWait(receiver: GoPtr<parallelWorkGroup>): void {
  receiver!.wg.Wait(); // no-op single-threaded; all queued fns ran synchronously in Queue
  receiver!.done.Store(true as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::type::singleThreadedWorkGroup","kind":"type","status":"implemented","sigHash":"91bb38ea4911724fa3ad60adffff314f220601c4b722effa1cbea5ff753a2a07"}
 *
 * Go source:
 * singleThreadedWorkGroup struct {
 * 	done  atomic.Bool
 * 	fnsMu sync.Mutex
 * 	fns   []func()
 * }
 */
export interface singleThreadedWorkGroup {
  done: Bool;
  fnsMu: Mutex;
  fns: GoSlice<GoFunc<() => void>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::varGroup::_::#2","kind":"varGroup","status":"implemented","sigHash":"9ac02571299d08ea398b34f1880c1d4b3c634ff423ed6c5f930c96390926ffcc"}
 *
 * Go source:
 * var _ WorkGroup = (*singleThreadedWorkGroup)(nil)
 */
export let ___2_056fa025_0: GoInterface<WorkGroup> = singleThreadedWorkGroup_as_WorkGroup(undefined);

export function singleThreadedWorkGroup_as_WorkGroup(receiver: GoPtr<singleThreadedWorkGroup>): WorkGroup {
  return {
    Queue: (fn: () => void): void => singleThreadedWorkGroup_Queue(receiver, fn),
    RunAndWait: (): void => singleThreadedWorkGroup_RunAndWait(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::method::singleThreadedWorkGroup.Queue","kind":"method","status":"implemented","sigHash":"01ad6bcfb7e5a22d16bf001ed92e5e227494b699f7b81f785d7a7de0efc800e9"}
 *
 * Go source:
 * func (w *singleThreadedWorkGroup) Queue(fn func()) {
 * 	if w.done.Load() {
 * 		panic("Queue called after RunAndWait returned")
 * 	}
 * 
 * 	w.fnsMu.Lock()
 * 	defer w.fnsMu.Unlock()
 * 	w.fns = append(w.fns, fn)
 * }
 */
export function singleThreadedWorkGroup_Queue(receiver: GoPtr<singleThreadedWorkGroup>, fn: GoFunc<() => void>): void {
  if (receiver!.done.Load()) {
    throw new globalThis.Error("Queue called after RunAndWait returned");
  }
  receiver!.fnsMu.Lock();
  receiver!.fns.push(fn!);
  receiver!.fnsMu.Unlock();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::method::singleThreadedWorkGroup.RunAndWait","kind":"method","status":"implemented","sigHash":"469232e5330a9ac7d4f6eebd65beb509d7ab96b7583cc9c25812f5d585c85e28"}
 *
 * Go source:
 * func (w *singleThreadedWorkGroup) RunAndWait() {
 * 	defer w.done.Store(true)
 * 	for {
 * 		fn := w.pop()
 * 		if fn == nil {
 * 			return
 * 		}
 * 		fn()
 * 	}
 * }
 */
export function singleThreadedWorkGroup_RunAndWait(receiver: GoPtr<singleThreadedWorkGroup>): void {
  const drain = (): void => {
    const fn = singleThreadedWorkGroup_pop(receiver);
    if (fn !== undefined) {
      fn();
      drain();
    }
  };
  drain();
  receiver!.done.Store(true as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::method::singleThreadedWorkGroup.pop","kind":"method","status":"implemented","sigHash":"b4591f455dfbfc9dda4bf6bd450de895d37dc08301e65bf2298c34ac129d51ab"}
 *
 * Go source:
 * func (w *singleThreadedWorkGroup) pop() func() {
 * 	w.fnsMu.Lock()
 * 	defer w.fnsMu.Unlock()
 * 	if len(w.fns) == 0 {
 * 		return nil
 * 	}
 * 	end := len(w.fns) - 1
 * 	fn := w.fns[end]
 * 	w.fns[end] = nil // Allow GC
 * 	w.fns = w.fns[:end]
 * 	return fn
 * }
 */
export function singleThreadedWorkGroup_pop(receiver: GoPtr<singleThreadedWorkGroup>): GoFunc<() => void> {
  receiver!.fnsMu.Lock();
  if (receiver!.fns.length === 0) {
    receiver!.fnsMu.Unlock();
    return undefined;
  }
  const fn = receiver!.fns.pop()!;
  receiver!.fnsMu.Unlock();
  return fn;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::type::ThrottleGroup","kind":"type","status":"implemented","sigHash":"d967d5238a014ad3f88864f018da20d67b101b09021f2af0dbac0b0c53e2eb1f"}
 *
 * Go source:
 * ThrottleGroup struct {
 * 	semaphore chan struct{}
 * 	group     *errgroup.Group
 * }
 */
export interface ThrottleGroup {
  semaphore: GoChan<{ readonly __tsgoEmpty?: never }, "bidirectional">;
  group: GoPtr<Group>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::func::NewThrottleGroup","kind":"func","status":"implemented","sigHash":"e96cadc81c9cc6f99dcd985bb3e97454a15009c1e7e3268f5dffd41865623a28"}
 *
 * Go source:
 * func NewThrottleGroup(ctx context.Context, semaphore chan struct{}) *ThrottleGroup {
 * 	g, _ := errgroup.WithContext(ctx)
 * 	return &ThrottleGroup{
 * 		semaphore: semaphore,
 * 		group:     g,
 * 	}
 * }
 */
export function NewThrottleGroup(ctx: GoInterface<Context>, semaphore: GoChan<{ readonly __tsgoEmpty?: never }, "bidirectional">): GoPtr<ThrottleGroup> {
  const [group] = WithContext(ctx!);
  return {
    semaphore,
    group,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::method::ThrottleGroup.Go","kind":"method","status":"implemented","sigHash":"169f5df82fcbaa2adc619306fac7413a0bd7442564532a385fb3f564ff6b8e00"}
 *
 * Go source:
 * func (tg *ThrottleGroup) Go(fn func() error) {
 * 	tg.group.Go(func() error {
 * 		// Acquire semaphore slot - this will block until a slot is available
 * 		tg.semaphore <- struct{}{}
 * 		defer func() {
 * 			// Release semaphore slot when done
 * 			<-tg.semaphore
 * 		}()
 * 		return fn()
 * 	})
 * }
 */
export function ThrottleGroup_Go(receiver: GoPtr<ThrottleGroup>, fn: GoFunc<() => GoError>): void {
  // Single-threaded: semaphore and errgroup are no-ops; call fn synchronously.
  const err = fn!();
  if (err !== undefined) {
    throw err;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/workgroup.go::method::ThrottleGroup.Wait","kind":"method","status":"implemented","sigHash":"01da5c1e90144c54e664d0bf51495d5fce3c01b1fb5fd027ea54c30cfdc85224"}
 *
 * Go source:
 * func (tg *ThrottleGroup) Wait() error {
 * 	return tg.group.Wait()
 * }
 */
export function ThrottleGroup_Wait(receiver: GoPtr<ThrottleGroup>): GoError {
  return undefined;
}
