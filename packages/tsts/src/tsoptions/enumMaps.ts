/**
 * CLI option enum maps.
 *
 * Port of TS-Go `internal/tsoptions/enummaps.go`. Provides string-keyed
 * lookups for compiler-option enum values (module, target, jsx, etc.).
 * Used by command-line parsing to convert `--module commonjs` → numeric
 * ModuleKind.CommonJS.
 *
 * Each map below preserves the exact TS-Go string → number bindings.
 */

export const moduleKindMap: ReadonlyMap<string, number> = new Map([
  ["none", 0],
  ["commonjs", 1],
  ["amd", 2],
  ["umd", 3],
  ["system", 4],
  ["es6", 5],
  ["es2015", 5],
  ["es2020", 6],
  ["es2022", 7],
  ["esnext", 99],
  ["node16", 100],
  ["node18", 101],
  ["nodenext", 199],
  ["preserve", 200],
]);

export const moduleResolutionKindMap: ReadonlyMap<string, number> = new Map([
  ["node", 2], ["classic", 1], ["node10", 2], ["node16", 3],
  ["nodenext", 99], ["bundler", 100],
]);

export const newLineKindMap: ReadonlyMap<string, number> = new Map([
  ["crlf", 0], ["lf", 1],
]);

export const scriptTargetMap: ReadonlyMap<string, number> = new Map([
  ["es3", 0], ["es5", 1], ["es6", 2], ["es2015", 2],
  ["es2016", 3], ["es2017", 4], ["es2018", 5], ["es2019", 6],
  ["es2020", 7], ["es2021", 8], ["es2022", 9], ["es2023", 10],
  ["es2024", 11], ["esnext", 99], ["json", 100], ["latest", 99],
]);

export const jsxEmitMap: ReadonlyMap<string, number> = new Map([
  ["none", 0], ["preserve", 1], ["react", 2],
  ["react-native", 3], ["react-jsx", 4], ["react-jsxdev", 5],
]);

export const importsNotUsedAsValuesMap: ReadonlyMap<string, number> = new Map([
  ["remove", 0], ["preserve", 1], ["error", 2],
]);

export const moduleDetectionKindMap: ReadonlyMap<string, number> = new Map([
  ["legacy", 1], ["auto", 2], ["force", 3],
]);

// ---------------------------------------------------------------------------
// Lib name → file name table
// ---------------------------------------------------------------------------

export const libMap: ReadonlyMap<string, string> = new Map([
  // JavaScript only
  ["es5", "lib.es5.d.ts"],
  ["es6", "lib.es2015.d.ts"],
  ["es2015", "lib.es2015.d.ts"],
  ["es7", "lib.es2016.d.ts"],
  ["es2016", "lib.es2016.d.ts"],
  ["es2017", "lib.es2017.d.ts"],
  ["es2018", "lib.es2018.d.ts"],
  ["es2019", "lib.es2019.d.ts"],
  ["es2020", "lib.es2020.d.ts"],
  ["es2021", "lib.es2021.d.ts"],
  ["es2022", "lib.es2022.d.ts"],
  ["es2023", "lib.es2023.d.ts"],
  ["es2024", "lib.es2024.d.ts"],
  ["es2025", "lib.es2025.d.ts"],
  ["esnext", "lib.esnext.d.ts"],
  // Host only
  ["dom", "lib.dom.d.ts"],
  ["dom.iterable", "lib.dom.iterable.d.ts"],
  ["dom.asynciterable", "lib.dom.asynciterable.d.ts"],
  ["webworker", "lib.webworker.d.ts"],
  ["webworker.importscripts", "lib.webworker.importscripts.d.ts"],
  ["webworker.iterable", "lib.webworker.iterable.d.ts"],
  ["webworker.asynciterable", "lib.webworker.asynciterable.d.ts"],
  ["scripthost", "lib.scripthost.d.ts"],
  // ES2015 by-feature
  ["es2015.core", "lib.es2015.core.d.ts"],
  ["es2015.collection", "lib.es2015.collection.d.ts"],
  ["es2015.generator", "lib.es2015.generator.d.ts"],
  ["es2015.iterable", "lib.es2015.iterable.d.ts"],
  ["es2015.promise", "lib.es2015.promise.d.ts"],
  ["es2015.proxy", "lib.es2015.proxy.d.ts"],
  ["es2015.reflect", "lib.es2015.reflect.d.ts"],
  ["es2015.symbol", "lib.es2015.symbol.d.ts"],
  ["es2015.symbol.wellknown", "lib.es2015.symbol.wellknown.d.ts"],
  // ES2016
  ["es2016.array.include", "lib.es2016.array.include.d.ts"],
  ["es2016.intl", "lib.es2016.intl.d.ts"],
  // ES2017
  ["es2017.arraybuffer", "lib.es2017.arraybuffer.d.ts"],
  ["es2017.date", "lib.es2017.date.d.ts"],
  ["es2017.object", "lib.es2017.object.d.ts"],
  ["es2017.sharedmemory", "lib.es2017.sharedmemory.d.ts"],
  ["es2017.string", "lib.es2017.string.d.ts"],
  ["es2017.intl", "lib.es2017.intl.d.ts"],
  ["es2017.typedarrays", "lib.es2017.typedarrays.d.ts"],
  // ES2018
  ["es2018.asyncgenerator", "lib.es2018.asyncgenerator.d.ts"],
  ["es2018.asynciterable", "lib.es2018.asynciterable.d.ts"],
  ["es2018.intl", "lib.es2018.intl.d.ts"],
  ["es2018.promise", "lib.es2018.promise.d.ts"],
  ["es2018.regexp", "lib.es2018.regexp.d.ts"],
  // ES2019
  ["es2019.array", "lib.es2019.array.d.ts"],
  ["es2019.object", "lib.es2019.object.d.ts"],
  ["es2019.string", "lib.es2019.string.d.ts"],
  ["es2019.symbol", "lib.es2019.symbol.d.ts"],
  ["es2019.intl", "lib.es2019.intl.d.ts"],
  // ES2020
  ["es2020.bigint", "lib.es2020.bigint.d.ts"],
  ["es2020.date", "lib.es2020.date.d.ts"],
  ["es2020.promise", "lib.es2020.promise.d.ts"],
  ["es2020.sharedmemory", "lib.es2020.sharedmemory.d.ts"],
  ["es2020.string", "lib.es2020.string.d.ts"],
  ["es2020.symbol.wellknown", "lib.es2020.symbol.wellknown.d.ts"],
  ["es2020.intl", "lib.es2020.intl.d.ts"],
  ["es2020.number", "lib.es2020.number.d.ts"],
  // ES2021
  ["es2021.promise", "lib.es2021.promise.d.ts"],
  ["es2021.string", "lib.es2021.string.d.ts"],
  ["es2021.weakref", "lib.es2021.weakref.d.ts"],
  ["es2021.intl", "lib.es2021.intl.d.ts"],
  // ES2022
  ["es2022.array", "lib.es2022.array.d.ts"],
  ["es2022.error", "lib.es2022.error.d.ts"],
  ["es2022.intl", "lib.es2022.intl.d.ts"],
  ["es2022.object", "lib.es2022.object.d.ts"],
  ["es2022.string", "lib.es2022.string.d.ts"],
  ["es2022.regexp", "lib.es2022.regexp.d.ts"],
  // ES2023+
  ["es2023.array", "lib.es2023.array.d.ts"],
  ["es2023.collection", "lib.es2023.collection.d.ts"],
  ["es2023.intl", "lib.es2023.intl.d.ts"],
  ["es2024.arraybuffer", "lib.es2024.arraybuffer.d.ts"],
  ["es2024.collection", "lib.es2024.collection.d.ts"],
  ["es2024.object", "lib.es2024.object.d.ts"],
  ["es2024.promise", "lib.es2024.promise.d.ts"],
  ["es2024.regexp", "lib.es2024.regexp.d.ts"],
  ["es2024.sharedmemory", "lib.es2024.sharedmemory.d.ts"],
  ["es2024.string", "lib.es2024.string.d.ts"],
  ["es2025.collection", "lib.es2025.collection.d.ts"],
  ["es2025.float16", "lib.es2025.float16.d.ts"],
  ["es2025.intl", "lib.es2025.intl.d.ts"],
  ["es2025.iterator", "lib.es2025.iterator.d.ts"],
  ["es2025.promise", "lib.es2025.promise.d.ts"],
  ["es2025.regexp", "lib.es2025.regexp.d.ts"],
  // Decorators
  ["decorators", "lib.decorators.d.ts"],
  ["decorators.legacy", "lib.decorators.legacy.d.ts"],
]);

export const libs: readonly string[] = Array.from(libMap.keys());

export const libFilesSet: ReadonlySet<string> = new Set(libMap.values());

export function getLibFileName(libName: string): string | undefined {
  const lower = libName.toLowerCase();
  if (libFilesSet.has(lower)) return lower;
  return libMap.get(lower);
}

// ---------------------------------------------------------------------------
// Target → default-lib file name
// ---------------------------------------------------------------------------

export const targetToLibMap: ReadonlyMap<number, string> = new Map([
  [99, "lib.esnext.full.d.ts"],
  [12, "lib.es2025.full.d.ts"],
  [11, "lib.es2024.full.d.ts"],
  [10, "lib.es2023.full.d.ts"],
  [9, "lib.es2022.full.d.ts"],
  [8, "lib.es2021.full.d.ts"],
  [7, "lib.es2020.full.d.ts"],
  [6, "lib.es2019.full.d.ts"],
  [5, "lib.es2018.full.d.ts"],
  [4, "lib.es2017.full.d.ts"],
  [3, "lib.es2016.full.d.ts"],
  [2, "lib.es6.d.ts"],
]);

export function getDefaultLibFileName(target: number): string {
  return targetToLibMap.get(target) ?? "lib.d.ts";
}

// ---------------------------------------------------------------------------
// Watch option enum tables
// ---------------------------------------------------------------------------

export const watchFileEnumMap: ReadonlyMap<string, number> = new Map([
  ["fixedpollinginterval", 1],
  ["prioritypollinginterval", 2],
  ["dynamicprioritypolling", 3],
  ["fixedchunksizepolling", 4],
  ["usefsevents", 5],
  ["usefseventsonparentdirectory", 6],
]);

export const watchDirectoryEnumMap: ReadonlyMap<string, number> = new Map([
  ["usefsevents", 1],
  ["fixedpollinginterval", 2],
  ["dynamicprioritypolling", 3],
  ["fixedchunksizepolling", 4],
]);

export const fallbackEnumMap: ReadonlyMap<string, number> = new Map([
  ["fixedinterval", 1],
  ["priorityinterval", 2],
  ["dynamicpriority", 3],
  ["fixedchunksize", 4],
]);
