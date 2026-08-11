import { compareCodeUnits } from "./canonical-order.mjs";

const definitions = [
  packageComponent("gostdlib", "tools/gotots/gostdlib", "@gotots/gostdlib", "node_modules/@gotots/gostdlib", ["goRuntime"]),
  packageComponent("externals", "tools/gotots/externals", "@gotots/externals", "node_modules/@gotots/externals", ["gostdlib"]),
  packageComponent("host", "tools/tsonic/packages/host", "@tsonic/host", "node_modules/@tsonic/host", ["sourceCore", "targetApi", "tsts"], "dist/index.js"),
  packageComponent("sourceCore", "tools/tsonic/packages/source-core", "@tsonic/source-core", "node_modules/@tsonic/source-core", ["tsts"], "dist/index.js"),
  packageComponent("targetApi", "tools/tsonic/packages/target-api", "@tsonic/target-api", "node_modules/@tsonic/target-api", ["tsts"], "dist/index.js"),
  packageComponent("targetTypeScript", "tools/tsonic-typescript", "@tsonic/target-typescript", "node_modules/@tsonic/target-typescript", ["targetApi", "tsts", "typeScriptRuntime"], "dist/index.js"),
  packageComponent("tsts", "tools/tsts-legacy/packages/tsts", "@tsonic/tsts", "node_modules/@tsonic/tsts", [], "dist/src/index.js"),
  packageComponent("typeScriptRuntime", "tools/typescript-runtime", "@tsonic/typescript-runtime", "node_modules/@tsonic/typescript-runtime", [], "dist/index.js"),
  component("binary", "gotots", "bin/gotots"),
  component("binary", "tsgoAstPrinter", "bin/tsgo-ast-printer"),
  component("binary", "tsgo", "bin/tsgo"),
  component("snapshot", "goRoot", "go-root"),
  component("snapshot", "goModuleCache", "go-module-cache"),
  component("snapshot", "nodeRuntime", "node-runtime"),
  component("snapshot", "compilerDistribution", "compiler-distribution"),
  component("snapshot", "typescriptGoSource", "typescript-go-source"),
  distributionPackage("certificationRuntime", "tools/gotots/gostdlib/test/runtime-package", "@gotots/runtime", "compiler-distribution/gostdlib/node_modules/@gotots/runtime", []),
  distributionPackage("nodeTypes", "tools/gotots/gostdlib/node_modules/@types/node", "@types/node", "compiler-distribution/gostdlib/node_modules/@types/node", ["undiciTypes"]),
  distributionPackage("undiciTypes", "tools/gotots/gostdlib/node_modules/undici-types", "undici-types", "compiler-distribution/gostdlib/node_modules/undici-types", []),
  component("metadata", "rootPackage", "package.json"),
  component("manifest", "manifest", "toolchain-manifest.json"),
  Object.freeze({
    kind: "generated-package",
    key: "goRuntime",
    name: "@gotots/runtime",
    version: "0.0.0",
    target: "node_modules/@gotots/runtime",
    dependencies: Object.freeze([]),
  }),
];

export const componentRegistry = Object.freeze(
  [...definitions].sort((left, right) => compareCodeUnits(left.target, right.target)),
);
export const componentByKey = new Map(componentRegistry.map((entry) => [entry.key, entry]));
export const packageComponents = Object.freeze(
  componentRegistry.filter((entry) => entry.kind === "package"),
);
export const binaryComponents = Object.freeze(
  componentRegistry.filter((entry) => entry.kind === "binary"),
);
export const distributionPackageComponents = Object.freeze(
  componentRegistry.filter((entry) => entry.kind === "distribution-package"),
);
export const generatedGoRuntime = componentByKey.get("goRuntime");

validateRegistry();

function packageComponent(key, source, name, target, dependencies, entry) {
  return Object.freeze({
    kind: "package",
    key,
    source,
    name,
    target,
    dependencies: Object.freeze([...dependencies].sort(compareCodeUnits)),
    entry,
  });
}

function component(kind, key, target) {
  return Object.freeze({ kind, key, target });
}

function distributionPackage(key, source, name, target, dependencies) {
  return Object.freeze({
    kind: "distribution-package",
    key,
    source,
    name,
    target,
    dependencies: Object.freeze([...dependencies].sort(compareCodeUnits)),
  });
}

function validateRegistry() {
  if (
    componentByKey.size !== componentRegistry.length ||
    new Set(componentRegistry.map((entry) => entry.target)).size !== componentRegistry.length
  ) {
    throw new Error("Toolchain component keys and destinations must be unique");
  }
  for (const selected of componentRegistry.filter((entry) =>
    ["package", "distribution-package"].includes(entry.kind)
  )) {
    for (const dependency of selected.dependencies) {
      const owner = componentByKey.get(dependency);
      if (
        owner === undefined ||
        !["package", "generated-package", "distribution-package"].includes(owner.kind)
      ) {
        throw new Error(`Toolchain package '${selected.name}' dependency '${dependency}' is unowned`);
      }
    }
  }
  for (const left of componentRegistry) {
    for (const right of componentRegistry) {
      if (left === right) {
        continue;
      }
      const parent = left.target.startsWith(`${right.target}/`) ? right :
        right.target.startsWith(`${left.target}/`) ? left : undefined;
      const child = parent === left ? right : left;
      const allowedDistributionChild = parent?.key === "compilerDistribution" &&
        child?.kind === "distribution-package";
      if (parent !== undefined && !allowedDistributionChild) {
        throw new Error(
          `Toolchain component destinations '${left.target}' and '${right.target}' overlap`,
        );
      }
    }
  }
}
