import path from "node:path";

import {
  expectedTsPath,
  isActivePortPolicy,
  policyForUnit,
  safeIdentifier,
} from "./policy.mjs";

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

export function buildValueTypeIndex(config, snapshot, largeFileSplits = undefined) {
  const symbolIndex = buildSymbolIndex(config, snapshot, largeFileSplits);
  const index = new Map();
  const pending = [];
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "constGroup" && unit.kind !== "varGroup") continue;
      for (const spec of unit.valueSpecs ?? []) {
        const names = spec.names ?? [];
        for (const [position, name] of names.entries()) {
          if (!name || name === "_") continue;
          const key = `${file.importPath}::${name}`;
          const directType = spec.type ?? spec.inferredValueTypes?.[position] ?? spec.inferredValueTypes?.[0];
          if (directType) {
            index.set(key, directType);
            continue;
          }
          pending.push({
            key,
            importPath: file.importPath,
            value: spec.values?.[position] ?? spec.values?.[0] ?? "",
          });
        }
      }
    }
  }

  let changed = true;
  for (let pass = 0; changed && pass < 8; pass++) {
    changed = false;
    for (const item of pending) {
      if (index.has(item.key)) continue;
      const resolved = resolveValueTypeFromText(item.value, item.importPath, index, symbolIndex);
      if (!resolved) continue;
      index.set(item.key, resolved);
      changed = true;
    }
  }
  return index;
}

function resolveValueTypeFromText(value, importPath, valueTypeIndex, symbolIndex) {
  const text = String(value ?? "").trim();
  const identifierMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)$/.exec(text);
  if (identifierMatch) {
    return valueTypeIndex.get(`${importPath}::${identifierMatch[1]}`);
  }
  const conversionMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/.exec(text);
  if (conversionMatch && symbolIndex.has(`${importPath}::${conversionMatch[1]}`)) {
    return { kind: "ident", name: conversionMatch[1], text: conversionMatch[1] };
  }
  return undefined;
}

export function importAliasMap(imports) {
  const aliases = new Map();
  for (const item of imports) {
    if (item.name === "_" || item.name === ".") continue;
    const alias = item.name || path.basename(item.path);
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
