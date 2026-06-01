/**
 * Compiler runner filter parity helpers.
 */

export interface CompilerRunnerFilter {
  readonly include?: RegExp;
  readonly exclude?: ReadonlySet<string>;
  readonly shard?: { readonly index: number; readonly count: number };
}

export function filterCompilerRunnerFiles(files: readonly string[], filter: CompilerRunnerFilter): readonly string[] {
  let result = files;
  if (filter.include !== undefined) result = result.filter(file => filter.include!.test(file));
  if (filter.exclude !== undefined) result = result.filter(file => !filter.exclude!.has(baseName(file)));
  if (filter.shard !== undefined) result = result.filter((_, index) => index % filter.shard!.count === filter.shard!.index);
  return result;
}

export function compilerRunnerSuiteName(regression: boolean): string {
  return regression ? "compiler" : "conformance";
}

function baseName(path: string): string {
  return path.slice(Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")) + 1);
}
