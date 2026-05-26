// Runner module — port pending. The test file in this directory is
// disabled in tests-index.ts; this stub exists so tsconfig include
// patterns don't trip on the missing index.

export interface TestCaseDirectives {
  target?: string;
  strict?: boolean;
  noEmit?: boolean;
  lib?: readonly string[];
  unknown?: Map<string, string>;
}

export interface TestCaseFile {
  readonly fileName: string;
  readonly content: string;
}

export interface TestCase {
  readonly directives: TestCaseDirectives;
  readonly files: readonly TestCaseFile[];
}

export function parseTestCase(path: string, name: string, contents: string): TestCase {
  void path; void name; void contents;
  return { directives: {}, files: [] };
}

export interface DiffCategorizerOptions {
  readonly acceptedListPath: string;
  readonly triagedListPath: string;
}

export class DiffCategorizer {
  constructor(_opts: DiffCategorizerOptions) {}
  acceptedCount(): number { return 0; }
  triagedCount(): number { return 0; }
  categorize(_diffName: string, _kind?: string): string { return "new"; }
}
