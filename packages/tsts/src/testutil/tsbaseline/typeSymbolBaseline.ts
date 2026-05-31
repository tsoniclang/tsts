import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline } from "../baseline/baseline.js";
import type { NamedSource } from "../harnessutil/harnessutil.js";
import { changeTsExtension, harnessNewLine, noContent, removeTestPathPrefixes, splitLines } from "./util.js";

export interface TypeSymbolEntry {
  readonly fileName: string;
  readonly line: number;
  readonly sourceText: string;
  readonly type?: string;
  readonly symbol?: string;
  readonly underline?: string;
}

export interface TypeAndSymbolBaselineInput {
  readonly baselinePath: string;
  readonly header: string;
  readonly files: readonly NamedSource[];
  readonly entries: readonly TypeSymbolEntry[];
  readonly options: BaselineOptions;
  readonly skipTypeBaselines?: boolean;
  readonly skipSymbolBaselines?: boolean;
  readonly hasErrorBaseline?: boolean;
}

export function doTypeAndSymbolBaseline(input: TypeAndSymbolBaselineInput): readonly BaselineResult[] {
  const results: BaselineResult[] = [];
  if (input.skipTypeBaselines !== true) {
    results.push(compareToBaseline(
      changeTsExtension(input.baselinePath, ".types"),
      generateBaseline(input.files, input.entries, input.header, false),
      input.options,
    ));
  }
  if (input.skipSymbolBaselines !== true) {
    results.push(compareToBaseline(
      changeTsExtension(input.baselinePath, ".symbols"),
      generateBaseline(input.files, input.entries, input.header, true),
      input.options,
    ));
  }
  return results;
}

export function generateBaseline(
  files: readonly NamedSource[],
  entries: readonly TypeSymbolEntry[],
  header: string,
  isSymbolBaseline: boolean,
): string {
  const sections = iterateBaseline(files, groupEntriesByFile(entries, isSymbolBaseline), isSymbolBaseline);
  if (sections.length === 0) return noContent;
  return `//// [${header}] ////${harnessNewLine}${harnessNewLine}${sections.join("")}`;
}

export function iterateBaseline(
  files: readonly NamedSource[],
  entriesByFile: ReadonlyMap<string, readonly TypeSymbolEntry[]>,
  isSymbolBaseline: boolean,
): readonly string[] {
  const baselines: string[] = [];
  for (const file of files) {
    const fileEntries = entriesByFile.get(normalizeKey(file.name)) ?? [];
    const section = generateFileBaseline(file, fileEntries, isSymbolBaseline);
    if (section.length > 0) baselines.push(section);
  }
  return baselines;
}

function generateFileBaseline(file: NamedSource, entries: readonly TypeSymbolEntry[], isSymbolBaseline: boolean): string {
  const lines = splitLines(file.content);
  const out: string[] = [];
  out.push(`=== ${removeTestPathPrefixes(file.name, false)} ===`);
  let lastLine = -1;
  for (const entry of entries) {
    if (entry.line < 0 || entry.line >= lines.length) continue;
    if (lastLine === -1) {
      out.push(...lines.slice(0, entry.line + 1));
    } else if (lastLine !== entry.line) {
      if (!isBracketOrBlank(lines[lastLine + 1] ?? "")) out.push("");
      out.push(...lines.slice(lastLine + 1, entry.line + 1));
    }
    lastLine = entry.line;
    const text = entry.sourceText.replace(/[\r\n]/g, "");
    const value = isSymbolBaseline ? entry.symbol : entry.type;
    if (value === undefined || value.length === 0) continue;
    out.push(`>${text} : ${value}`);
    if (entry.underline !== undefined && entry.underline.length > 0) {
      out.push(`>${" ".repeat(text.length)} : ${entry.underline}`);
    }
  }
  if (lastLine + 1 < lines.length) {
    if (!isBracketOrBlank(lines[lastLine + 1] ?? "")) out.push("");
    out.push(...lines.slice(lastLine + 1));
  }
  out.push("");
  return `${out.join(harnessNewLine)}${harnessNewLine}`;
}

function groupEntriesByFile(entries: readonly TypeSymbolEntry[], isSymbolBaseline: boolean): ReadonlyMap<string, readonly TypeSymbolEntry[]> {
  const grouped = new Map<string, TypeSymbolEntry[]>();
  for (const entry of entries) {
    if (isSymbolBaseline && (entry.symbol ?? "") === "") continue;
    if (!isSymbolBaseline && (entry.type ?? "") === "") continue;
    const key = normalizeKey(entry.fileName);
    const list = grouped.get(key) ?? [];
    list.push(entry);
    grouped.set(key, list);
  }
  for (const list of grouped.values()) {
    list.sort((left, right) => left.line - right.line || left.sourceText.localeCompare(right.sourceText));
  }
  return grouped;
}

export function isTypeBaselineNodeReuseLine(line: string): boolean {
  if (!line.startsWith(">")) return false;
  const afterPrefix = line.slice(1);
  if (afterPrefix.length === 0) return false;
  const afterSourceText = afterPrefix.slice(1).replace(/^[ ]+/, "");
  if (!afterSourceText.startsWith(":")) return false;
  for (const char of afterSourceText.slice(1)) {
    if (char !== " " && char !== "^" && char !== "\r") return false;
  }
  return true;
}

export function diffFixupOldTypeBaseline(text: string): string {
  const output: string[] = [];
  let perfStats = false;
  for (let line of text.split("\n")) {
    if (isTypeBaselineNodeReuseLine(line)) continue;
    if (!perfStats && line.startsWith("=== Performance Stats ===")) {
      perfStats = true;
      continue;
    }
    if (perfStats) {
      if (line.startsWith("=== ")) perfStats = false;
      else continue;
    }

    const relativePrefixNew = "=== ";
    const relativePrefixOld = `${relativePrefixNew}./`;
    if (line.startsWith(relativePrefixOld)) {
      line = `${relativePrefixNew}${line.slice(relativePrefixOld.length)}`;
    }
    output.push(line);
  }
  return output.join("\n");
}

export interface TypeWriterResult {
  readonly line: number;
  readonly sourceText: string;
  readonly symbol: string;
  readonly type: string;
  readonly underline: string;
}

export function typeWriterResultToEntry(fileName: string, result: TypeWriterResult): TypeSymbolEntry {
  return {
    fileName,
    line: result.line,
    sourceText: result.sourceText,
    symbol: result.symbol,
    type: result.type,
    underline: result.underline,
  };
}

function isBracketOrBlank(line: string): boolean {
  return /^\s*(?:[{}|])?\s*$/.test(line);
}

function normalizeKey(fileName: string): string {
  return removeTestPathPrefixes(fileName, false).toLowerCase();
}
