import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

import { assertEqualText, normalizeNewlines } from "../stringtestutil/stringTestUtil.js";

export interface BaselineOptions {
  readonly baselineRoot: string;
  readonly update?: boolean;
  readonly subfolder?: string;
  readonly isSubmodule?: boolean;
  readonly isSubmoduleAccepted?: boolean;
  readonly isSubmoduleTriaged?: boolean;
  readonly diffFixupOld?: (text: string) => string;
  readonly diffFixupNew?: (text: string) => string;
  readonly skipDiffWithOld?: boolean;
}

export const noContent = "<no content>";

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
    if (actual === "") {
      throw new Error(`The generated content was empty for '${relativePath}'. Use noContent when no baselining is required.`);
    }
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

export function runBaseline(fileName: string, actual: string, options: BaselineOptions): readonly BaselineResult[] {
  const subfolder = options.isSubmodule === true ? join("submodule", options.subfolder ?? "") : options.subfolder ?? "";
  const primary = compareToBaseline(join(subfolder, fileName), actual, options);
  if (options.isSubmodule !== true || options.skipDiffWithOld === true) return [primary];

  const expected = primary.expected ?? noContent;
  const diff = getBaselineDiff(actual, expected, fileName, options.diffFixupOld, options.diffFixupNew);
  const diffFileName = fileName + ".diff";
  const diffKey = join(options.subfolder ?? "", diffFileName).replace(/\\/g, "/");
  const accepted = options.isSubmoduleAccepted === true;
  const triaged = options.isSubmoduleTriaged === true;
  if (accepted && triaged) {
    throw new Error(`diff file ${diffKey} is in both submoduleAccepted and submoduleTriaged`);
  }

  const outRoot = accepted ? "submoduleAccepted" : triaged ? "submoduleTriaged" : "submodule";
  const roots = ["submodule", "submoduleAccepted", "submoduleTriaged"];
  const results: BaselineResult[] = [primary];
  for (const root of roots) {
    results.push(compareToBaseline(
      join(root, options.subfolder ?? "", diffFileName),
      root === outRoot ? diff : noContent,
      options,
    ));
  }
  return results;
}

export function runAgainstSubmodule(fileName: string, actual: string, options: BaselineOptions): BaselineResult {
  return compareToBaseline(join(options.subfolder ?? "", fileName), actual, options);
}

export function readFileOrNoContent(fileName: string): string {
  return existsSync(fileName) ? readFileSync(fileName, "utf8") : noContent;
}

export function diffText(oldName: string, newName: string, expected: string, actual: string): string {
  const oldLines = splitLines(expected);
  const newLines = splitLines(actual);
  const operations = diffLines(oldLines, newLines);
  const output: string[] = [`--- ${oldName}`, `+++ ${newName}`, "@@= skipped -0, +0 lines =@@"];
  for (const op of operations) {
    if (op.kind === "equal") output.push(" " + op.text);
    else if (op.kind === "delete") output.push("-" + op.text);
    else output.push("+" + op.text);
  }
  return output.join("\n") + "\n";
}

export function getBaselineDiff(
  actual: string,
  expected: string,
  fileName: string,
  fixupOld?: (text: string) => string,
  fixupNew?: (text: string) => string,
): string {
  const oldText = fixupOld?.(expected) ?? expected;
  const newText = fixupNew?.(actual) ?? actual;
  if (oldText === newText) return noContent;
  const diff = diffText("old." + fileName, "new." + fileName, oldText, newText);
  return diff.includes("@@") ? fixUnifiedDiffHeaders(diff) : noContent;
}

interface DiffOperation {
  readonly kind: "equal" | "insert" | "delete";
  readonly text: string;
}

function splitLines(text: string): readonly string[] {
  return normalizeNewlines(text).split("\n");
}

function diffLines(oldLines: readonly string[], newLines: readonly string[]): readonly DiffOperation[] {
  const rows = oldLines.length + 1;
  const cols = newLines.length + 1;
  const table: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(0));
  for (let i = oldLines.length - 1; i >= 0; i -= 1) {
    for (let j = newLines.length - 1; j >= 0; j -= 1) {
      table[i]![j] = oldLines[i] === newLines[j]
        ? table[i + 1]![j + 1]! + 1
        : Math.max(table[i + 1]![j]!, table[i]![j + 1]!);
    }
  }
  const operations: DiffOperation[] = [];
  let i = 0;
  let j = 0;
  while (i < oldLines.length && j < newLines.length) {
    if (oldLines[i] === newLines[j]) {
      operations.push({ kind: "equal", text: oldLines[i]! });
      i += 1;
      j += 1;
    } else if (table[i + 1]![j]! >= table[i]![j + 1]!) {
      operations.push({ kind: "delete", text: oldLines[i]! });
      i += 1;
    } else {
      operations.push({ kind: "insert", text: newLines[j]! });
      j += 1;
    }
  }
  while (i < oldLines.length) operations.push({ kind: "delete", text: oldLines[i++]! });
  while (j < newLines.length) operations.push({ kind: "insert", text: newLines[j++]! });
  return operations;
}

function fixUnifiedDiffHeaders(text: string): string {
  let oldLine = 1;
  let newLine = 1;
  return text.replace(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/g, (_match, oldStart: string, _oldCount: string, newStart: string) => {
    const oldDelta = Number(oldStart) - oldLine;
    const newDelta = Number(newStart) - newLine;
    oldLine = Number(oldStart);
    newLine = Number(newStart);
    return `@@= skipped -${oldDelta}, +${newDelta} lines =@@`;
  });
}
