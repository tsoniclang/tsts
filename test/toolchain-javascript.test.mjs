import assert from "node:assert/strict";
import { mkdir, readlink, realpath, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { bindPackageBuildDependencies, buildJavaScriptPackages } from "../scripts/toolchain-javascript.mjs";
import { componentByKey, packageComponents } from "../scripts/toolchain-registry.mjs";
import { createToolchainFixture, removeToolchainFixtures } from "./support/toolchain-fixture.mjs";

test("build consumers bind the same selected package graph that is sealed", async () => {
  const fixture = await createToolchainFixture("build-links-");
  const runRoot = join(fixture.repositoryRoot, ".temp", "dependency-build");
  const stale = join(fixture.repositoryRoot, "tools/gotots/abi/node_modules/@tsonic/tsts");
  await mkdir(stale, { recursive: true });
  await writeFile(join(stale, "older.txt"), "stale bootstrap");
  await bindPackageBuildDependencies(fixture.repositoryRoot, runRoot);
  for (const selected of packageComponents) {
    for (const key of selected.dependencies) {
      const dependency = componentByKey.get(key);
      if (dependency.kind !== "package") continue;
      const link = join(fixture.repositoryRoot, selected.source, "node_modules", dependency.name);
      assert.equal(await realpath(link), join(fixture.repositoryRoot, dependency.source));
      assert.equal((await readlink(link)).startsWith("/"), false);
    }
  }
  const preserved = join(runRoot, "prior-dependencies/goAbi/@tsonic/tsts/older.txt");
  assert.equal(await realpath(dirname(preserved)), dirname(preserved));
  await removeToolchainFixtures(fixture);
});

test("provider marker declarations precede compilation and resolution failure stops the build", async () => {
  const fixture = await createToolchainFixture("provider-markers-");
  const root = fixture.repositoryRoot;
  const runRoot = join(root, ".temp", "provider-build");
  const tsgo = join(root, "bin", "tsgo");
  const node = { npmExecutable: join(root, "bin", "npm") };
  const environment = Object.freeze({ PATH: "/selected/bin" });
  const commands = [];
  const record = (command, args, cwd, selectedEnvironment, subject) => {
    assert.equal(cwd, root);
    assert.equal(selectedEnvironment, environment);
    commands.push({ command, args, subject });
  };
  await buildJavaScriptPackages(root, tsgo, node, environment, runRoot, record);
  const resolution = commands.findIndex(entry => entry.subject === "resolve canonical provider marker declarations");
  const compilation = commands.findIndex(entry => entry.command === tsgo);
  assert.ok(resolution >= 0 && compilation > resolution);
  assert.deepEqual(commands[resolution], {
    command: node.npmExecutable,
    args: ["--prefix", join(root, "tools/gotots/gostdlib"), "run", "core:resolve"],
    subject: "resolve canonical provider marker declarations",
  });
  assert.equal(commands.filter(entry => entry.subject === commands[resolution].subject).length, 1);
  commands.length = 0;
  const failure = new Error("marker resolution failed");
  await assert.rejects(buildJavaScriptPackages(root, tsgo, node, environment, runRoot,
    (command, args, cwd, selectedEnvironment, subject) => {
      record(command, args, cwd, selectedEnvironment, subject);
      if (subject === "resolve canonical provider marker declarations") throw failure;
    }), error => error === failure);
  assert.equal(commands.some(entry => entry.command === tsgo), false);
  await removeToolchainFixtures(fixture);
});
