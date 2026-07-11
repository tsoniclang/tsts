import { safeIdentifier } from "./names.mjs";
import { expectedTsPath, isActivePortPolicy, policyForUnit } from "./policies.mjs";
import path from "node:path";

export function buildSymbolIndex(config, snapshot, largeFileSplits = undefined) {
  const index = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type") continue;
      const policy = policyForUnit(config, unit, file);
      index.set(`${file.importPath}::${unit.name}`, {
        exportName: safeIdentifier(unit.name),
        targetPath: expectedTsPath(config, unit, largeFileSplits),
        active: isActivePortPolicy(policy),
        goName: `${file.importPath}.${unit.name}`,
      });
    }
  }
  return index;
}

export function importAliasMap(imports) {
  const aliases = new Map();
  for (const item of imports) {
    if (item.name === "_" || item.name === ".") continue;
    const alias = item.name ?? item.packageName;
    if (alias === undefined) continue;
    aliases.set(alias, item.path);
  }
  return aliases;
}

export function relativeImportPath(fromTsPath, toTsPath) {
  let relative = path.posix.relative(path.posix.dirname(fromTsPath), toTsPath.replace(/\.ts$/, ".js"));
  if (!relative.startsWith(".")) relative = `./${relative}`;
  return relative;
}

export function fileFromUnit(unit) {
  const goPath = unit?.metadata?.goPath ?? "unknown/unknown.go";
  return {
    path: goPath,
    importPath: `github.com/microsoft/typescript-go/${path.posix.dirname(goPath)}`,
    packageName: "",
    imports: [],
    units: unit ? [unit] : [],
  };
}

export function unitsByIDMap(snapshot) {
  const map = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) map.set(unit.id, unit);
  }
  return map;
}

export function skeletonTsConfig() {
  return {
    compilerOptions: {
      target: "ES2024",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      strict: true,
      noUncheckedIndexedAccess: true,
      exactOptionalPropertyTypes: true,
      verbatimModuleSyntax: true,
      skipLibCheck: true,
      preserveSymlinks: true,
      types: ["node"],
    },
    include: ["src/**/*.ts"],
  };
}
