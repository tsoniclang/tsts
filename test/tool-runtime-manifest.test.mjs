import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

import {
  sealToolRuntime,
  verifyToolRuntime,
} from "../scripts/tool-runtime-manifest.mjs";

const scratchRoot = resolve(".temp", "tool-runtime-tests");
const manifestName = "tool-runtime-manifest.json";
const selections = [
  { path: "tools/gotots", packages: [] },
  {
    path: "tools/tsonic",
    packages: [
      ["packages/host", "@tsonic/host"],
      ["packages/source-core", "@tsonic/source-core"],
      ["packages/target-api", "@tsonic/target-api"],
    ],
  },
  { path: "tools/tsonic-typescript", packages: [[".", "@tsonic/target-typescript"]] },
  { path: "tools/tsts-legacy", packages: [["packages/tsts", "@tsonic/tsts"]] },
  { path: "tools/typescript-runtime", packages: [[".", "@tsonic/typescript-runtime"]] },
  { path: "vendor/typescript-go", packages: [] },
];

test("tool runtime seal is deterministic and verifies exact inputs", async () => {
  const repositoryRoot = await createRepository("deterministic-");
  const firstRuntime = join(repositoryRoot, "runtime-first");
  const secondRuntime = join(repositoryRoot, "runtime-second");

  await sealToolRuntime(repositoryRoot, firstRuntime);
  await sealToolRuntime(repositoryRoot, secondRuntime);
  await verifyToolRuntime(repositoryRoot, firstRuntime);
  await verifyToolRuntime(repositoryRoot, secondRuntime);

  assert.equal(
    await readFile(join(firstRuntime, manifestName), "utf8"),
    await readFile(join(secondRuntime, manifestName), "utf8"),
  );
});

test("tool runtime rejects a built package changed after sealing", async () => {
  const repositoryRoot = await createRepository("built-package-");
  const runtimeRoot = join(repositoryRoot, "runtime");
  await sealToolRuntime(repositoryRoot, runtimeRoot);

  const packageOutput = join(
    repositoryRoot,
    "tools",
    "tsonic-typescript",
    "dist",
    "index.js",
  );
  await writeFile(packageOutput, "export const identity = 'changed';\n", "utf8");
  assert.equal(runGit(join(repositoryRoot, "tools", "tsonic-typescript"), [
    "status",
    "--porcelain",
  ]), "");

  await assert.rejects(
    verifyToolRuntime(repositoryRoot, runtimeRoot),
    /source package '@tsonic\/target-typescript' differs from its sealed content/u,
  );
});

test("tool runtime rejects an assembled package changed after sealing", async () => {
  const repositoryRoot = await createRepository("assembled-package-");
  const runtimeRoot = join(repositoryRoot, "runtime");
  await sealToolRuntime(repositoryRoot, runtimeRoot);

  await writeFile(
    join(runtimeRoot, "node_modules", "@tsonic", "host", "dist", "index.js"),
    "export const identity = 'changed';\n",
    "utf8",
  );

  await assert.rejects(
    verifyToolRuntime(repositoryRoot, runtimeRoot),
    /assembled package '@tsonic\/host' differs from its sealed content/u,
  );
});

test("tool runtime rejects a stale selected gitlink", async () => {
  const repositoryRoot = await createRepository("gitlink-");
  const runtimeRoot = join(repositoryRoot, "runtime");
  await sealToolRuntime(repositoryRoot, runtimeRoot);

  const submoduleRoot = join(repositoryRoot, "tools", "tsonic-typescript");
  await writeFile(join(submoduleRoot, "selection.txt"), "next selection\n", "utf8");
  runGit(submoduleRoot, ["add", "selection.txt"]);
  commit(submoduleRoot, "next selection");
  const nextGitlink = runGit(submoduleRoot, ["rev-parse", "HEAD"]);
  selectGitlink(repositoryRoot, "tools/tsonic-typescript", nextGitlink);

  await assert.rejects(
    verifyToolRuntime(repositoryRoot, runtimeRoot),
    /submodule identities differ from the sealed tool runtime/u,
  );
});

test("every tool-runtime consumer rejects stale content before import", async () => {
  const repositoryRoot = await createRepository("consumers-");
  const runtimeRoot = join(repositoryRoot, ".temp", "tool-runtime");
  await sealToolRuntime(repositoryRoot, runtimeRoot);
  await writeFile(
    join(repositoryRoot, "tools", "tsonic-typescript", "dist", "index.js"),
    "export const identity = 'stale';\n",
    "utf8",
  );

  const consumers = [
    [
      resolve("scripts", "target.mjs"),
      join(repositoryRoot, "canonical"),
      join(repositoryRoot, "target"),
      join(repositoryRoot, "runner.ts"),
    ],
    [resolve("scripts", "verify-typescript-target.mjs")],
  ];
  for (const arguments_ of consumers) {
    const result = spawnSync(
      process.execPath,
      [arguments_[0], repositoryRoot, ...arguments_.slice(1)],
      {
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
      },
    );
    assert.notEqual(result.status, 0, arguments_[0]);
    assert.match(
      result.stderr,
      /source package '@tsonic\/target-typescript' differs from its sealed content/u,
      arguments_[0],
    );
  }
});

async function createRepository(prefix) {
  await mkdir(scratchRoot, { recursive: true });
  const repositoryRoot = await mkdtemp(join(scratchRoot, prefix));
  runGit(repositoryRoot, ["init", "--quiet"]);

  for (const selection of selections) {
    const submoduleRoot = join(repositoryRoot, selection.path);
    await mkdir(submoduleRoot, { recursive: true });
    runGit(submoduleRoot, ["init", "--quiet"]);
    await writeFile(join(submoduleRoot, ".gitignore"), "dist/\n", "utf8");
    for (const [packagePath, packageName] of selection.packages) {
      const packageRoot = join(submoduleRoot, packagePath);
      await mkdir(join(packageRoot, "dist"), { recursive: true });
      await writeFile(join(packageRoot, "package.json"), `${JSON.stringify({
        name: packageName,
        version: "1.0.0",
        type: "module",
        files: ["dist"],
      }, undefined, 2)}\n`, "utf8");
      await writeFile(
        join(packageRoot, "dist", "index.js"),
        `export const identity = ${JSON.stringify(packageName)};\n`,
        "utf8",
      );
    }
    runGit(submoduleRoot, ["add", "."]);
    commit(submoduleRoot, "fixture");
    selectGitlink(
      repositoryRoot,
      selection.path,
      runGit(submoduleRoot, ["rev-parse", "HEAD"]),
    );
  }

  return repositoryRoot;
}

function selectGitlink(repositoryRoot, path, gitlink) {
  runGit(repositoryRoot, [
    "update-index",
    "--add",
    "--cacheinfo",
    "160000",
    gitlink,
    path,
  ]);
}

function commit(repositoryRoot, message) {
  runGit(repositoryRoot, [
    "-c",
    "user.name=TSTS Tests",
    "-c",
    "user.email=tsts-tests@example.invalid",
    "commit",
    "--quiet",
    "-m",
    message,
  ]);
}

function runGit(repositoryRoot, arguments_) {
  const result = spawnSync("git", ["-C", repositoryRoot, ...arguments_], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.signal !== null || result.status !== 0) {
    throw new Error(
      `git ${arguments_.join(" ")} failed: status=${String(result.status)} ` +
        `signal=${String(result.signal)}\n${result.stdout}${result.stderr}`,
    );
  }
  return result.stdout.trim();
}
