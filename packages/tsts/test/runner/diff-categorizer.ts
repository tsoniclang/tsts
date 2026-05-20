/**
 * Categorizes baseline diffs against TS-Go's accepted/triaged lists.
 *
 * When TSTS runs against the TS-Go test suite, any output difference from
 * the expected baseline is categorized:
 *
 *   - "accepted" — listed in submoduleAccepted.txt; intentional deviation
 *   - "triaged"  — listed in submoduleTriaged.txt; known bug, tracked
 *   - "new"      — uncategorized; a regression
 *
 * Mirrors TS-Go's `internal/testutil/baseline/` categorization logic.
 *
 * The accepted and triaged files are vendored alongside TS-Go test data
 * (see `_testdata/tsgo/` once the data is in place).
 */

import { existsSync, readFileSync } from "node:fs";

import type { DiffCategory } from "./types.js";

export interface CategorizerOptions {
  /** Path to submoduleAccepted.txt (vendored from TS-Go testdata). */
  readonly acceptedListPath: string;
  /** Path to submoduleTriaged.txt (vendored from TS-Go testdata). */
  readonly triagedListPath: string;
}

export class DiffCategorizer {
  private readonly accepted: ReadonlySet<string>;
  private readonly triaged: ReadonlySet<string>;

  constructor(options: CategorizerOptions) {
    this.accepted = loadDiffList(options.acceptedListPath);
    this.triaged = loadDiffList(options.triagedListPath);
  }

  /**
   * Categorize a baseline diff by its relative-to-baselines path.
   *
   * The TS-Go diff lists store paths like:
   *   `conformance/foo.types.diff`
   *   `compiler/bar.errors.txt.diff`
   *
   * Callers pass the same shape (with `.diff` suffix).
   */
  categorize(diffPath: string): DiffCategory {
    const normalized = normalizePath(diffPath);
    if (this.accepted.has(normalized)) return "accepted";
    if (this.triaged.has(normalized)) return "triaged";
    return "new";
  }

  /** Count of accepted entries (for reporting). */
  acceptedCount(): number {
    return this.accepted.size;
  }

  /** Count of triaged entries (for reporting). */
  triagedCount(): number {
    return this.triaged.size;
  }
}

function loadDiffList(path: string): ReadonlySet<string> {
  if (!existsSync(path)) {
    // Acceptable when running before data is vendored; treat as empty list
    return new Set();
  }
  const text = readFileSync(path, "utf8");
  const out = new Set<string>();
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.length === 0) continue;
    if (line.startsWith("#")) continue;        // comment line
    if (line.startsWith("##")) continue;       // section header
    out.add(normalizePath(line));
  }
  return out;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}
