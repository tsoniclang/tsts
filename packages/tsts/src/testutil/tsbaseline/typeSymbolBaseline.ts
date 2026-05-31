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
  const byFile = groupEntriesByFile(entries, isSymbolBaseline);
  const sections: string[] = [];
  for (const file of files) {
    const fileEntries = byFile.get(normalizeKey(file.name)) ?? [];
    const section = generateFileBaseline(file, fileEntries, isSymbolBaseline);
    if (section.length > 0) sections.push(section);
  }
  if (sections.length === 0) return noContent;
  return `//// [${header}] ////${harnessNewLine}${harnessNewLine}${sections.join("")}`;
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
  const marker = line.indexOf(":");
  if (marker === -1) return false;
  return /^[\s^\r]*$/.test(line.slice(marker + 1));
}

function isBracketOrBlank(line: string): boolean {
  return /^\s*(?:[{}|])?\s*$/.test(line);
}

function normalizeKey(fileName: string): string {
  return removeTestPathPrefixes(fileName, false).toLowerCase();
}
