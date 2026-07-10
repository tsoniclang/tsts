import assert from "node:assert/strict";
import test from "node:test";

import { Background, Canceled } from "../context.js";
import { SIGINT, SIGTERM } from "../syscall.js";
import { NotifyContext } from "./signal.js";

test("NotifyContext subscribes to real Node signals and stop removes only its listeners", () => {
  const beforeInterrupt = new Set(process.listeners(SIGINT));
  const beforeTerminate = new Set(process.listeners(SIGTERM));
  let stop: (() => void) | undefined;

  try {
    const [context, stopContext] = NotifyContext(Background(), SIGINT, SIGTERM, SIGINT);
    stop = stopContext;

    const interruptListeners = process.listeners(SIGINT).filter((listener) => !beforeInterrupt.has(listener));
    const terminateListeners = process.listeners(SIGTERM).filter((listener) => !beforeTerminate.has(listener));
    assert.equal(interruptListeners.length, 1);
    assert.equal(terminateListeners.length, 1);
    assert.equal(context.Err(), undefined);

    interruptListeners[0]!(SIGINT);
    assert.equal(context.Err(), Canceled);
    assert.equal(process.listeners(SIGINT).includes(interruptListeners[0]!), true);

    stop();
    stop();
    assert.equal(process.listeners(SIGINT).includes(interruptListeners[0]!), false);
    assert.equal(process.listeners(SIGTERM).includes(terminateListeners[0]!), false);
    for (const listener of beforeInterrupt) {
      assert.equal(process.listeners(SIGINT).includes(listener), true);
    }
    for (const listener of beforeTerminate) {
      assert.equal(process.listeners(SIGTERM).includes(listener), true);
    }
  } finally {
    stop?.();
  }
});

test("NotifyContext stop cancels before any signal and releases its listener", () => {
  const beforeInterrupt = new Set(process.listeners(SIGINT));
  const [context, stop] = NotifyContext(Background(), SIGINT);
  const listener = process.listeners(SIGINT).find((candidate) => !beforeInterrupt.has(candidate));

  try {
    assert.notEqual(listener, undefined);
    assert.equal(context.Err(), undefined);

    stop();

    assert.equal(context.Err(), Canceled);
    assert.equal(process.listeners(SIGINT).includes(listener!), false);
  } finally {
    stop();
  }
});
