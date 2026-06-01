/**
 * Harness skip parity helpers.
 */

export interface SkipRule {
  readonly pattern: RegExp;
  readonly reason: string;
}

export function shouldSkipHarnessTest(fileName: string, rules: readonly SkipRule[]): string | undefined {
  return rules.find(rule => rule.pattern.test(fileName))?.reason;
}

export function filterSkippedHarnessTests(files: readonly string[], rules: readonly SkipRule[]): readonly string[] {
  return files.filter(file => shouldSkipHarnessTest(file, rules) === undefined);
}
