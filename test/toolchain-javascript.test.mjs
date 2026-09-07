import assert from "node:assert/strict";
import { mkdir, readlink, realpath, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { bindPackageBuildDependencies } from "../scripts/toolchain-javascript.mjs";
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
