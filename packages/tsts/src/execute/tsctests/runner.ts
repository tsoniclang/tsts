export interface TscTestCase {
  readonly name: string;
  run(): void;
}

export function runTscTests(tests: readonly TscTestCase[]): void {
  for (const test of tests) test.run();
}
