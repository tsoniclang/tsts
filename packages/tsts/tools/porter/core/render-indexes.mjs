import { safeIdentifier } from "./names.mjs";
import { buildEffectivePolicyResolver } from "./effective-policies.mjs";
import { expectedTsPath, isActivePortPolicy } from "./policies.mjs";
import { requireGeneratedDeclarationOwnerCatalog } from "./generated-declaration-owner-catalog.mjs";
import { exactSemanticTypeObjectId } from "./semantic-variants.mjs";
import path from "node:path";

export function buildSymbolIndex(config, snapshot, largeFileSplits, generatedDeclarationOwners) {
  const generated = requireGeneratedDeclarationOwnerCatalog(generatedDeclarationOwners, config, snapshot);
  const index = new Map();
  const effectivePolicies = buildEffectivePolicyResolver(config, snapshot);
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type" || !Array.isArray(unit.semantic) || unit.semantic.length === 0) continue;
      const objectId = exactSemanticTypeObjectId(unit);
      const policy = effectivePolicies.unit(unit, file);
      const owner = generated.get(objectId);
      const entry = {
        exportName: owner?.tsName ?? safeIdentifier(unit.name),
        targetPath: owner?.moduleId ?? expectedTsPath(config, unit, largeFileSplits),
        active: isActivePortPolicy(policy),
        goName: `${file.importPath}.${unit.name}`,
        ownership: owner === undefined ? "scaffold" : "generated",
      };
      if (index.has(objectId)) throw new Error(`internal semantic Go type '${objectId}' has more than one symbol owner`);
      index.set(objectId, Object.freeze(entry));
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
