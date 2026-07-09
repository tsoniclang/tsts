import assert from "node:assert/strict";
import { test } from "node:test";
import type { bool } from "../../../go/scalars.js";
import type { Context } from "../../../go/context.js";
import { Canceled } from "../../../go/context.js";
import { Discard } from "../../../go/io.js";
import { Time } from "../../../go/time.js";
import {
  NewWatchManager,
  WatchManager_RunLoop,
  WatchManager_signalDoCycle,
} from "./watchmanager.js";

function cancellableContext(): { ctx: Context; cancel: () => void } {
  let canceled = false;
  return {
    ctx: {
      Deadline: () => [new Time(), false as bool],
      Done: () => undefined,
      Err: () => canceled ? Canceled : undefined,
      Value: () => undefined,
    },
    cancel: () => {
      canceled = true;
    },
  };
}

async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
}

test("WatchManager coalesces pending cycle signals", async () => {
  const wm = NewWatchManager(Discard, () => true)!;
  const { ctx } = cancellableContext();
  let cycles = 0;

  WatchManager_signalDoCycle(wm);
  WatchManager_signalDoCycle(wm);
  WatchManager_RunLoop(wm, ctx, () => {
    cycles++;
  });

  assert.equal(cycles, 0);
  await flushMicrotasks();
  assert.equal(cycles, 1);

  WatchManager_signalDoCycle(wm);
  WatchManager_signalDoCycle(wm);
  await flushMicrotasks();
  assert.equal(cycles, 2);
});

test("WatchManager preserves a signal raised during a cycle", async () => {
  const wm = NewWatchManager(Discard, () => true)!;
  const { ctx } = cancellableContext();
  let cycles = 0;

  WatchManager_RunLoop(wm, ctx, () => {
    cycles++;
    if (cycles === 1) {
      WatchManager_signalDoCycle(wm);
      WatchManager_signalDoCycle(wm);
    }
  });
  WatchManager_signalDoCycle(wm);

  await flushMicrotasks();
  assert.equal(cycles, 2);
});

test("WatchManager cancellation closes watches and suppresses queued work", async () => {
  const wm = NewWatchManager(Discard, () => true)!;
  const { ctx, cancel } = cancellableContext();
  let cycles = 0;
  let closes = 0;
  wm.watchedDirs.set("/work/project", {
    closer: {
      Close: () => {
        closes++;
        return undefined;
      },
    },
    recursive: false as bool,
  });

  WatchManager_RunLoop(wm, ctx, () => {
    cycles++;
  });
  WatchManager_signalDoCycle(wm);
  cancel();

  await flushMicrotasks();
  assert.equal(cycles, 0);
  assert.equal(closes, 1);
  assert.equal(wm.watchedDirs.size, 0);

  WatchManager_signalDoCycle(wm);
  await flushMicrotasks();
  assert.equal(cycles, 0);
});

test("WatchManager rejects a second active run loop", () => {
  const wm = NewWatchManager(Discard, () => true)!;
  const { ctx } = cancellableContext();
  WatchManager_RunLoop(wm, ctx, () => {});

  assert.throws(
    () => WatchManager_RunLoop(wm, ctx, () => {}),
    /run loop already started/,
  );
});
