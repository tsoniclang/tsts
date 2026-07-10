import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const delay = (milliseconds: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, milliseconds);
});

test("spawned CLI watch remains live, rebuilds, and exits after cancellation", { timeout: 25_000 }, async () => {
  const project = mkdtempSync(join(tmpdir(), "tsts-watch-liveness-"));
  const sourcePath = join(project, "index.ts");
  writeFileSync(sourcePath, "export const value = 1;\n");
  const cliPath = fileURLToPath(new URL("../../../cli/index.js", import.meta.url));
  const child = spawn(process.execPath, [cliPath, "--watch", "--pretty", "false", "--noEmit", "--noLib", "index.ts"], {
    cwd: project,
    stdio: "pipe",
  });
  let output = "";
  let spawnFailure: globalThis.Error | undefined;
  child.once("error", (error) => {
    spawnFailure = error;
  });
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk: string) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk: string) => {
    output += chunk;
  });

  const waitForOutput = async (expected: string): Promise<void> => {
    const deadline = Date.now() + 7_500;
    while (!output.includes(expected)) {
      if (spawnFailure !== undefined) {
        throw spawnFailure;
      }
      if (child.exitCode !== null || child.signalCode !== null) {
        assert.fail(`watch process exited before ${JSON.stringify(expected)}\n${output}`);
      }
      if (Date.now() >= deadline) {
        assert.fail(`watch process did not report ${JSON.stringify(expected)}\n${output}`);
      }
      await delay(20);
    }
  };

  const waitForExit = async (): Promise<{ code: number | null; signal: NodeJS.Signals | null }> => {
    if (child.exitCode !== null || child.signalCode !== null) {
      return { code: child.exitCode, signal: child.signalCode };
    }
    return await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new globalThis.Error(`watch process did not exit after cancellation\n${output}`)), 5_000);
      child.once("exit", (code, signal) => {
        clearTimeout(timeout);
        resolve({ code, signal });
      });
    });
  };

  try {
    await waitForOutput("Watching for file changes.");
    await delay(200);
    assert.equal(child.exitCode, null, output);
    assert.equal(child.signalCode, null, output);

    writeFileSync(sourcePath, "export const value = 2;\n");
    await waitForOutput("File change detected. Starting incremental compilation...");

    assert.equal(child.kill("SIGTERM"), true);
    const exit = await waitForExit();
    if (process.platform === "win32") {
      assert.equal(exit.code !== null || exit.signal !== null, true, output);
    } else {
      assert.deepEqual(exit, { code: 0, signal: null }, output);
    }
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGKILL");
      await waitForExit().catch(() => undefined);
    }
  }
});
