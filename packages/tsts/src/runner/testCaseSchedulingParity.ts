/**
 * Test-case scheduling parity helpers.
 */

export interface ScheduledTestCase {
  readonly name: string;
  readonly fileName: string;
  readonly configuration?: string;
}

export function scheduleCompilerTestCases(fileName: string, configurations: readonly string[]): readonly ScheduledTestCase[] {
  if (configurations.length === 0) return [{ name: baseName(fileName), fileName }];
  return configurations.map(configuration => ({
    name: configuration.length === 0 ? baseName(fileName) : `${baseName(fileName)} ${configuration}`,
    fileName,
    configuration,
  }));
}

export function filterSkippedTestCases(cases: readonly ScheduledTestCase[], skipped: ReadonlySet<string>): readonly ScheduledTestCase[] {
  return cases.filter(testCase => !skipped.has(baseName(testCase.fileName)));
}

export function shardTestCases(cases: readonly ScheduledTestCase[], shardIndex: number, shardCount: number): readonly ScheduledTestCase[] {
  return cases.filter((_, index) => index % shardCount === shardIndex);
}

function baseName(path: string): string {
  return path.slice(Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")) + 1);
}
