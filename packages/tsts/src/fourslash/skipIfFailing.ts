/**
 * Fourslash known-failure controls.
 *
 * Faithful TypeScript port of TS-Go `internal/fourslash/skip_if_failing.go`.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface FourslashSkippableTest {
  helper(): void;
  name(): string;
  skip(message: string): void;
}

let failingTestsCache: ReadonlySet<string> | undefined;

export function failingTests(): ReadonlySet<string> {
  failingTestsCache ??= readFailingTests();
  return failingTestsCache;
}

export function skipIfFailing(test: FourslashSkippableTest): void {
  test.helper();
  if ((process.env["TSGO_FOURSLASH_IGNORE_FAILING"] ?? "") !== "") {
    return;
  }
  if (failingTests().has(test.name())) {
    test.skip("Test is in failingTests.txt");
  }
}

export function shouldSkipIfFailing(testName: string): boolean {
  if ((process.env["TSGO_FOURSLASH_IGNORE_FAILING"] ?? "") !== "") {
    return false;
  }
  return failingTests().has(testName);
}

function readFailingTests(): ReadonlySet<string> {
  const failingTestsPath = join(dirname(fileURLToPath(import.meta.url)), "_scripts", "failingTests.txt");
  let text: string;
  try {
    text = readFileSync(failingTestsPath, "utf8");
  } catch {
    return new Set<string>();
  }

  const result = new Set<string>();
  for (const line of text.split(/\r?\n/u)) {
    const testName = line.trim();
    if (testName !== "") {
      result.add(testName);
    }
  }
  return result;
}
