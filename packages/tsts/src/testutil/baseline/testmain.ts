export interface TestMainOptions {
  readonly updateBaselines?: boolean;
  readonly filter?: RegExp;
}

export interface TestCase {
  readonly name: string;
  run(): void | Promise<void>;
}

export async function runTestMain(tests: readonly TestCase[], options: TestMainOptions = {}): Promise<void> {
  const failures: string[] = [];
  for (const test of tests) {
    if (options.filter !== undefined && !options.filter.test(test.name)) continue;
    try {
      await test.run();
    } catch (error) {
      failures.push(`${test.name}: ${error instanceof Error ? error.stack ?? error.message : String(error)}`);
    }
  }
  if (failures.length > 0) throw new Error(failures.join("\n\n"));
}
