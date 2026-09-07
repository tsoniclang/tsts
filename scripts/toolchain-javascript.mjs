import { lstat, mkdir, rename, symlink } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { componentByKey, packageComponents } from "./toolchain-registry.mjs";

const installRoots = [
  ".", "tools/gotots/gostdlib", "tools/gotots/abi", "tools/typescript-runtime",
  "tools/tsts-legacy", "tools/tsonic", "tools/tsonic-typescript",
];

export async function buildJavaScriptPackages(repositoryRoot, tsgo, node, environment, runRoot, run) {
  for (const path of installRoots) {
    run(node.npmExecutable, ["--prefix", join(repositoryRoot, path), "ci"],
      repositoryRoot, environment, `install ${path}`);
  }
  await bindPackageBuildDependencies(repositoryRoot, runRoot);
  const bootstrap = join(repositoryRoot, componentByKey.get("tsts").source);
  run(tsgo, ["-p", join(bootstrap, "tsconfig.json"), "--pretty", "false"],
    repositoryRoot, environment, "build pinned bootstrap checker");
  run(node.executable, [join(bootstrap, "tools/package/copy-bundled-libraries.mjs")],
    repositoryRoot, environment, "copy pinned bootstrap bundled libraries");
  for (const config of [
    "tools/gotots/gostdlib/test/runtime-package/tsconfig.json",
    "tools/gotots/gostdlib/tsconfig.json",
    "tools/gotots/externals/tsconfig.json",
    "tools/tsonic/packages/target-api/tsconfig.json",
    "tools/tsonic/packages/source-core/tsconfig.json",
    "tools/tsonic/packages/host/tsconfig.json",
    "tools/gotots/abi/tsconfig.json",
  ]) {
    run(tsgo, ["-p", join(repositoryRoot, config), "--pretty", "false"],
      repositoryRoot, environment, `build ${config}`);
  }
  for (const path of ["tools/typescript-runtime", "tools/tsonic-typescript"]) {
    run(node.npmExecutable, ["--prefix", join(repositoryRoot, path), "run", "build"],
      repositoryRoot, environment, `build ${path}`);
  }
}

export async function bindPackageBuildDependencies(repositoryRoot, runRoot) {
  for (const selected of packageComponents) {
    for (const key of selected.dependencies) {
      const dependency = componentByKey.get(key);
      if (dependency.kind !== "package") continue;
      const destination = join(repositoryRoot, selected.source, "node_modules", dependency.name);
      const target = join(repositoryRoot, dependency.source);
      try {
        await lstat(destination);
        const preserved = join(runRoot, "prior-dependencies", selected.key, dependency.name);
        await mkdir(dirname(preserved), { recursive: true });
        await rename(destination, preserved);
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
      await mkdir(dirname(destination), { recursive: true });
      await symlink(relative(dirname(destination), target), destination, "dir");
    }
  }
}
