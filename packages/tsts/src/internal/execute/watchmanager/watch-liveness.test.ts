import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { CanWatchDirectory } from "./watchbackend.js";

const delay = (milliseconds: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, milliseconds);
});

test("spawned CLI watch remains live, rebuilds, and exits after cancellation", { timeout: 25_000 }, async () => {
  const repoRoot = fileURLToPath(new URL("../../../../../../../", import.meta.url));
  const fixtureRoot = join(repoRoot, ".temp", "watch-liveness");
  mkdirSync(fixtureRoot, { recursive: true });
  const project = mkdtempSync(join(fixtureRoot, "project-"));
  assert.equal(CanWatchDirectory(project), true, `fixture is not watchable: ${project}`);
  const sourcePath = join(project, "index.ts");
  writeFileSync(sourcePath, "export const value = 1;\n");
  writeFileSync(join(project, "tsconfig.json"), `${JSON.stringify({
    compilerOptions: { noEmit: true, noLib: true },
    files: ["index.ts"],
    references: [],
  }, undefined, 2)}\n`);
  const cliPath = fileURLToPath(new URL("../../../cli/index.js", import.meta.url));
  const child = spawn(process.execPath, [cliPath, "--watch", "--pretty", "false", "--project", "tsconfig.json"], {
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
  const exitPromise = new Promise<{ code: number | null; signal: NodeJS.Signals | null }>((resolve) => {
    child.once("exit", (code, signal) => resolve({ code, signal }));
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

  const waitForExit = async (timeoutMilliseconds: number): Promise<{ code: number | null; signal: NodeJS.Signals | null } | undefined> => {
    if (child.exitCode !== null || child.signalCode !== null) {
      return { code: child.exitCode, signal: child.signalCode };
    }
    return await Promise.race([
      exitPromise,
      delay(timeoutMilliseconds).then(() => undefined),
    ]);
  };

  try {
    await waitForOutput("Watching for file changes.");
    await delay(200);
    assert.equal(child.exitCode, null, output);
    assert.equal(child.signalCode, null, output);

    writeFileSync(sourcePath, "export const value = 2;\n");
    await waitForOutput("File change detected. Starting incremental compilation...");

    assert.equal(child.kill("SIGTERM"), true);
    const exit = await waitForExit(5_000);
    assert.notEqual(exit, undefined, `watch process did not exit after cancellation\n${output}`);
    if (process.platform === "win32") {
      assert.equal(exit!.code !== null || exit!.signal !== null, true, output);
    } else {
      assert.deepEqual(exit, { code: 0, signal: null }, output);
    }
  } finally {
    if (child.pid !== undefined && child.exitCode === null && child.signalCode === null) {
      child.kill("SIGTERM");
      if (await waitForExit(1_000) === undefined && child.exitCode === null && child.signalCode === null) {
        child.kill("SIGKILL");
        const forcedExit = await waitForExit(3_000);
        assert.notEqual(forcedExit, undefined, `watch process did not exit after SIGKILL\n${output}`);
      }
    }
  }
});
