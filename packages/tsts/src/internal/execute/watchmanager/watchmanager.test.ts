import assert from "node:assert/strict";
import { test } from "node:test";
import type { Context } from "../../../go/context.js";
import { Background, WithCancel } from "../../../go/context.js";
import { Discard } from "../../../go/io.js";
import {
  NewWatchManager,
  WatchManager_RunLoop,
  WatchManager_signalDoCycle,
} from "./watchmanager.js";

function cancellableContext(): { ctx: Context; cancel: () => void } {
  const [ctx, cancel] = WithCancel(Background());
  return { ctx, cancel };
}

async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
}

test("WatchManager coalesces buffered signals and preserves a second signal after a waiting receive", async () => {
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
  assert.equal(cycles, 3);
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
    recursive: false,
  });

  WatchManager_RunLoop(wm, ctx, () => {
    cycles++;
  });
  cancel();
  WatchManager_signalDoCycle(wm);

  await flushMicrotasks();
  assert.equal(cycles, 0);
  assert.equal(closes, 1);
  assert.equal(wm.watchedDirs.size, 0);

  WatchManager_signalDoCycle(wm);
  await flushMicrotasks();
  assert.equal(cycles, 0);
});

test("WatchManager run loop waits until the cycle channel is signaled", async () => {
  const wm = NewWatchManager(Discard, () => true)!;
  const { ctx } = cancellableContext();
  let cycles = 0;
  WatchManager_RunLoop(wm, ctx, () => {
    cycles++;
  });

  await flushMicrotasks();
  assert.equal(cycles, 0);
});
