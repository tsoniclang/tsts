/**
 * CLI option enum maps.
 *
 * Port of TS-Go `internal/tsoptions/enummaps.go`. Provides string-keyed
 * lookups for compiler-option enum values (module, target, jsx, etc.).
 * Used by command-line parsing to convert `--module commonjs` → numeric
 * ModuleKind.CommonJS.
 *
 * Each map below preserves the exact Strada string → number bindings.
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
