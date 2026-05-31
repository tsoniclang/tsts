import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline } from "../baseline/baseline.js";
import type { NamedSource } from "../harnessutil/harnessutil.js";
import {
  changeTsExtension,
  harnessNewLine,
  isDefaultLibraryFile,
  isTsConfigFile,
  lineAndCharacterOfPosition,
  lineStarts,
  noContent,
  removeTestPathPrefixes,
  splitLines,
} from "./util.js";

export interface BaselineDiagnostic {
  readonly fileName?: string;
  readonly message: string;
  readonly code: number;
  readonly category?: string;
  readonly start?: number;
  readonly length?: number;
  readonly relatedInformation?: readonly BaselineDiagnostic[];
}

export interface ErrorBaselineInput {
  readonly baselinePath: string;
  readonly inputFiles: readonly NamedSource[];
  readonly diagnostics: readonly BaselineDiagnostic[];
  readonly pretty?: boolean;
  readonly options: BaselineOptions;
}

export function doErrorBaseline(input: ErrorBaselineInput): BaselineResult {
  const baselinePath = changeTsExtension(input.baselinePath, ".errors.txt");
  const text = input.diagnostics.length === 0
    ? noContent
    : getErrorBaseline(input.inputFiles, input.diagnostics, input.pretty === true);
  return compareToBaseline(baselinePath, text, input.options);
}

export function getErrorBaseline(
  inputFiles: readonly NamedSource[],
  diagnostics: readonly BaselineDiagnostic[],
  pretty = false,
): string {
  const sorted = [...diagnostics].sort(compareDiagnostics);
  const sections: string[] = [];
  sections.push(minimalDiagnosticsToString(sorted, pretty));
  const globalDiagnostics = sorted.filter(diagnostic => diagnostic.fileName === undefined);
  if (globalDiagnostics.length > 0) {
    sections.push(globalDiagnostics.map(formatErrorLine).join(harnessNewLine));
  }
  for (const file of inputFiles) {
    const fileDiagnostics = sorted.filter(diagnostic =>
      diagnostic.fileName !== undefined
      && removeTestPathPrefixes(diagnostic.fileName, false) === removeTestPathPrefixes(file.name, false));
    sections.push(formatFileErrorSection(file, fileDiagnostics));
  }
  return sections.filter(section => section.length > 0).join(`${harnessNewLine}${harnessNewLine}`);
}

export function minimalDiagnosticsToString(diagnostics: readonly BaselineDiagnostic[], pretty = false): string {
  const lines = diagnostics.map(diagnostic => {
    const category = diagnostic.category ?? "error";
    const code = `TS${diagnostic.code}`;
    if (diagnostic.fileName === undefined || diagnostic.start === undefined) {
      return `${category} ${code}: ${diagnostic.message}`;
    }
    const [line, character] = [diagnostic.start, diagnostic.start];
    const location = pretty ? `(${line + 1},${character + 1})` : `(${line + 1},${character + 1})`;
    return `${removeTestPathPrefixes(diagnostic.fileName, false)}${location}: ${category} ${code}: ${diagnostic.message}`;
  });
  return lines.join(harnessNewLine);
}

function formatFileErrorSection(file: NamedSource, diagnostics: readonly BaselineDiagnostic[]): string {
  const lines = splitLines(file.content);
  const starts = lineStarts(file.content);
  const out: string[] = [];
  out.push(`==== ${removeTestPathPrefixes(file.name, false)} (${diagnostics.length} errors) ====`);
  const diagnosticsByLine = new Map<number, BaselineDiagnostic[]>();
  for (const diagnostic of diagnostics) {
    const start = diagnostic.start ?? 0;
    const [line] = lineAndCharacterOfPosition(file.content, start);
    const list = diagnosticsByLine.get(line) ?? [];
    list.push(diagnostic);
    diagnosticsByLine.set(line, list);
  }
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex]!;
    out.push(`    ${line}`);
    const lineDiagnostics = diagnosticsByLine.get(lineIndex) ?? [];
    for (const diagnostic of lineDiagnostics) {
      const start = diagnostic.start ?? starts[lineIndex] ?? 0;
      const length = Math.max(1, diagnostic.length ?? 1);
      const offset = Math.max(0, start - (starts[lineIndex] ?? 0));
      const squiggleLength = Math.max(1, Math.min(length, Math.max(1, line.length - offset)));
      out.push(`    ${" ".repeat(offset)}${"~".repeat(squiggleLength)}`);
      out.push(formatErrorLine(diagnostic));
    }
  }
  return out.join(harnessNewLine);
}

function formatErrorLine(diagnostic: BaselineDiagnostic): string {
  const category = diagnostic.category ?? "error";
  const related = diagnostic.relatedInformation ?? [];
  const head = `!!! ${category} TS${diagnostic.code}: ${diagnostic.message}`;
  if (related.length === 0) return head;
  return [head, ...related.map(info => `!!! related TS${info.code}${formatDiagnosticLocation(info)}: ${info.message}`)].join(harnessNewLine);
}

function formatDiagnosticLocation(diagnostic: BaselineDiagnostic): string {
  if (diagnostic.fileName === undefined) return "";
  if (isDefaultLibraryFile(diagnostic.fileName)) return ` ${removeTestPathPrefixes(diagnostic.fileName, false)}:--:--`;
  return ` ${removeTestPathPrefixes(diagnostic.fileName, false)}:${diagnostic.start ?? 0}`;
}

function compareDiagnostics(left: BaselineDiagnostic, right: BaselineDiagnostic): number {
  const leftFile = left.fileName ?? "";
  const rightFile = right.fileName ?? "";
  if (leftFile !== rightFile) return leftFile.localeCompare(rightFile);
  if ((left.start ?? 0) !== (right.start ?? 0)) return (left.start ?? 0) - (right.start ?? 0);
  if (left.code !== right.code) return left.code - right.code;
  return left.message.localeCompare(right.message);
}

export function countNonLibraryDiagnostics(diagnostics: readonly BaselineDiagnostic[]): number {
  return diagnostics.filter(diagnostic => !isDefaultLibraryFile(diagnostic.fileName) && !isTsConfigFile(diagnostic.fileName)).length;
}
