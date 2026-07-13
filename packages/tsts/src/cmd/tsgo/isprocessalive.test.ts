import assert from "node:assert/strict";
import test from "node:test";
import type { int } from "../../go/scalars.js";
import { isProcessAlive as isProcessAliveUnix } from "./isprocessalive_unix.js";
import { isProcessAlive as isProcessAliveWindows } from "./isprocessalive_windows.js";

test("host-native process probes recognize the current process", () => {
  assert.equal(isProcessAliveUnix(process.pid as int), true);
  assert.equal(isProcessAliveWindows(process.pid as int), true);
});
