import assert from "node:assert/strict";
import { test } from "node:test";
import type { Context } from "../../../go/context.js";
import { Background, WithCancel } from "../../../go/context.js";
import { Discard } from "../../../go/io.js";
import type { WatchBackend } from "./watchbackend.js";
import { GetCommandLineTestingWatchBackend } from "./watchbackend.js";
import {
  NewWatchManager,
  WatchManager_createDirWatch,
  WatchManager_createDirWatches,
  WatchManager_RunLoop,
  WatchManager_SetBackend,
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

test("command-line testing without WatchBackend uses the default backend", () => {
  assert.equal(GetCommandLineTestingWatchBackend({}), undefined);
});

test("command-line testing returns its valid watch backend", () => {
  const closer = { Close: () => undefined };
  const backend: WatchBackend = {
    WatchDirectory: () => [closer, undefined],
    WatchDirectories: () => [[closer], undefined],
  };

  assert.equal(GetCommandLineTestingWatchBackend({ WatchBackend: () => backend }), backend);
});

test("watch manager rejects a successful backend result without a closer", () => {
  const manager = NewWatchManager(Discard, () => true)!;
  WatchManager_SetBackend(manager, {
    WatchDirectory: () => [undefined, undefined],
    WatchDirectories: () => [[], undefined],
  });

  assert.throws(
    () => WatchManager_createDirWatch(manager, "/work/project", false),
    new globalThis.TypeError("WatchBackend.WatchDirectory() returned an invalid Closer without an error"),
  );
});

test("command-line testing rejects an invalid watch backend result", () => {
  assert.throws(
    () => GetCommandLineTestingWatchBackend({ WatchBackend: () => ({}) }),
    new globalThis.TypeError("CommandLineTesting.WatchBackend() returned an invalid WatchBackend"),
  );
});

test("watch manager rejects a successful batch with the wrong closer count", () => {
  const manager = NewWatchManager(Discard, () => true)!;
  WatchManager_SetBackend(manager, {
    WatchDirectory: () => [undefined, undefined],
    WatchDirectories: () => [[], undefined],
  });

  assert.throws(
    () => WatchManager_createDirWatches(manager, [{ dir: "/work/project", recursive: false }]),
    new globalThis.TypeError("WatchBackend.WatchDirectories() returned an invalid closer count without an error"),
  );
});

test("watch manager validates every batch closer before mutating watch state", () => {
  const manager = NewWatchManager(Discard, () => true)!;
  const backend = GetCommandLineTestingWatchBackend({
    WatchBackend: () => ({
      WatchDirectory: () => [undefined, undefined],
      WatchDirectories: () => [[{ Close: () => undefined }, {}], undefined],
    }),
  })!;
  WatchManager_SetBackend(manager, backend);

  assert.throws(
    () => WatchManager_createDirWatches(manager, [
      { dir: "/work/one", recursive: false },
      { dir: "/work/two", recursive: false },
    ]),
    new globalThis.TypeError("WatchBackend.WatchDirectories()[1] returned an invalid Closer without an error"),
  );
  assert.equal(manager.watchedDirs.size, 0);
});

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
