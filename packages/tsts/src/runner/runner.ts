export interface Runner {
  enumerateTestFiles(): readonly string[];
  runTests(): void;
}

export function runTests(runners: readonly Runner[]): void {
  for (const runner of runners) {
    runner.runTests();
  }
}

