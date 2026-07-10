import assert from "node:assert/strict";
import test from "node:test";

import type { int } from "../../go/scalars.js";
import { MakeGoChan } from "../../go/compat.js";
import { Background, WithCancel } from "../../go/context.js";
import {
  LimitedSemaphore_Acquire,
  LimitedSemaphore_TryAcquire,
  NewLimitedSemaphore,
  UnlimitedSemaphore_TryAcquire,
} from "./semaphore.js";
import { NewThrottleGroup, NewWorkGroup, ThrottleGroup_Go, ThrottleGroup_Wait } from "./workgroup.js";

test("parallel WorkGroup permits immediate execution and closes after RunAndWait", () => {
  const events: string[] = [];
  const group = NewWorkGroup(false);

  group.Queue(() => events.push("first"));
  group.Queue(() => events.push("second"));
  assert.deepEqual(events, ["first", "second"]);

  group.RunAndWait();
  assert.throws(() => group.Queue(() => {}), /Queue called after RunAndWait returned/);
});

test("single-threaded WorkGroup drains the Go LIFO queue without recursive stack growth", () => {
  const events: string[] = [];
  const group = NewWorkGroup(true);

  group.Queue(() => events.push("first"));
  group.Queue(() => {
    events.push("second");
    group.Queue(() => events.push("nested"));
  });
  assert.deepEqual(events, []);

  group.RunAndWait();
  assert.deepEqual(events, ["second", "nested", "first"]);
  assert.throws(() => group.Queue(() => {}), /Queue called after RunAndWait returned/);
});

test("ThrottleGroup executes every submitted callback and returns the first error from Wait", () => {
  const calls: string[] = [];
  const firstError = new Error("first");
  const secondError = new Error("second");
  const semaphore = MakeGoChan<{ readonly __tsgoEmpty?: never }>(2, () => ({}));
  const group = NewThrottleGroup(Background(), semaphore)!;

  assert.doesNotThrow(() => ThrottleGroup_Go(group, () => {
    calls.push("first");
    return firstError;
  }));
  assert.doesNotThrow(() => ThrottleGroup_Go(group, () => {
    calls.push("second");
    return secondError;
  }));

  assert.deepEqual(calls, ["first", "second"]);
  assert.equal(ThrottleGroup_Wait(group), firstError);
});

test("LimitedSemaphore enforces capacity, release ownership, and cancellation", () => {
  const semaphore = NewLimitedSemaphore(1 as int)!;
  const release = LimitedSemaphore_Acquire(semaphore);

  assert.throws(
    () => LimitedSemaphore_Acquire(semaphore),
    /would block in the single-threaded runtime/,
  );
  assert.throws(
    () => LimitedSemaphore_TryAcquire(semaphore, Background()),
    /would block before context cancellation/,
  );

  const [canceledContext, cancel] = WithCancel(Background());
  cancel();
  const [canceledRelease, canceledAcquired] = LimitedSemaphore_TryAcquire(semaphore, canceledContext);
  assert.equal(canceledAcquired, false);
  assert.doesNotThrow(canceledRelease);

  release();
  const [nextRelease, acquired] = LimitedSemaphore_TryAcquire(semaphore, Background());
  assert.equal(acquired, true);
  nextRelease();
  assert.throws(nextRelease, /release would block/);
});

test("UnlimitedSemaphore remains available after context cancellation", () => {
  const [context, cancel] = WithCancel(Background());
  cancel();
  const [release, acquired] = UnlimitedSemaphore_TryAcquire({}, context);
  assert.equal(acquired, true);
  assert.doesNotThrow(release);
});
