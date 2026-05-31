import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

import { assertEqualText, normalizeNewlines } from "../stringtestutil/stringTestUtil.js";

export interface BaselineOptions {
  readonly baselineRoot: string;
  readonly update?: boolean;
}

export interface BaselineResult {
  readonly path: string;
  readonly actual: string;
  readonly expected: string | undefined;
  readonly changed: boolean;
}

export class BaselineStore {
  private readonly baselineRoot: string;
  private readonly update: boolean;

  constructor(options: BaselineOptions) {
    this.baselineRoot = options.baselineRoot;
    this.update = options.update === true;
  }

  resolve(relativePath: string): string {
    return normalize(join(this.baselineRoot, relativePath));
  }

  read(relativePath: string): string | undefined {
    const path = this.resolve(relativePath);
    if (!existsSync(path)) return undefined;
    return normalizeNewlines(readFileSync(path, "utf8"));
  }

  write(relativePath: string, text: string): void {
    const path = this.resolve(relativePath);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, normalizeNewlines(text));
  }

  assert(relativePath: string, actual: string): BaselineResult {
    const expected = this.read(relativePath);
    if (expected === undefined || this.update) {
      this.write(relativePath, actual);
      return { path: this.resolve(relativePath), actual, expected, changed: true };
    }
    assertEqualText(actual, expected);
    return { path: this.resolve(relativePath), actual, expected, changed: false };
  }
}

export function compareToBaseline(relativePath: string, actual: string, options: BaselineOptions): BaselineResult {
  return new BaselineStore(options).assert(relativePath, actual);
}
