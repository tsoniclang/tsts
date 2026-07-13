import assert from "node:assert/strict";
import * as nodeFs from "node:fs";
import test from "node:test";
import type { GoError } from "../../../go/compat.js";
import { ignoringEINTR } from "./eintr_unix.js";
import { realpath as realpathDarwin } from "./realpath_darwin.js";
import { realpath as realpathLinux } from "./realpath_linux.js";
import { realpath as realpathWindows } from "./realpath_windows.js";
import { isReparsePoint } from "./reparsepoint_windows.js";

test("host-native realpath adapters return the Node host canonical path", () => {
  const expected = nodeFs.realpathSync.native(process.cwd());
  for (const realpath of [realpathDarwin, realpathLinux, realpathWindows]) {
    assert.deepEqual(realpath(process.cwd()), [expected, undefined]);
  }
});

test("host-native realpath adapters return errors without fallback paths", () => {
  const missing = `${process.cwd()}/.tsts-missing-realpath-proof`;
  for (const realpath of [realpathDarwin, realpathLinux, realpathWindows]) {
    const [resolved, error] = realpath(missing);
    assert.equal(resolved, "");
    assert.ok(error instanceof Error);
  }
  assert.equal(isReparsePoint(missing), false);
});

test("ignoringEINTR retries only the exact host EINTR condition", () => {
  let attempts = 0;
  const result = ignoringEINTR<number>(() => {
    attempts++;
    if (attempts === 1) {
      const error = new Error("interrupted") as NodeJS.ErrnoException;
      error.code = "EINTR";
      return [0, error as GoError];
    }
    return [42, undefined];
  });
  assert.deepEqual(result, [42, undefined]);
  assert.equal(attempts, 2);
});
