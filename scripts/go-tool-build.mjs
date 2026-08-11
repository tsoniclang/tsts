import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { compareCodeUnits } from "./canonical-order.mjs";

export async function createGoToolBuildModule({
  root,
  goVersion,
  modulePath,
  moduleVersion,
  moduleSum,
  modules,
}) {
  const selected = modules.filter((module) => module.path === modulePath);
  if (
    selected.length !== 1 || selected[0].version !== moduleVersion ||
    selected[0].sum !== moduleSum
  ) {
    throw new Error(`Go tool module '${modulePath}@${moduleVersion}' differs from the sealed closure`);
  }
  const release = parseGoRelease(goVersion);
  const sums = modules.flatMap((module) => [
    `${module.path} ${module.version} ${module.sum}`,
    `${module.path} ${module.version}/go.mod ${module.goModSum}`,
  ]).sort(compareCodeUnits);
  if (sums.length !== new Set(sums).size) {
    throw new Error("Sealed Go module sums are not unique");
  }
  await mkdir(root, { recursive: true });
  await writeFile(
    join(root, "go.mod"),
    `module tsts.invalid/tool-builder\n\ngo ${release}\n\nrequire ${modulePath} ${moduleVersion}\n`,
    "utf8",
  );
  await writeFile(join(root, "go.sum"), `${sums.join("\n")}\n`, "utf8");
  return root;
}

function parseGoRelease(version) {
  const match = /^go([1-9][0-9]*\.[0-9]+(?:\.[0-9]+)?)$/u.exec(version);
  if (match === null) {
    throw new Error(`Go builder version '${String(version)}' is not a release version`);
  }
  return match[1];
}
