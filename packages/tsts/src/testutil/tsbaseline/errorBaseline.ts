import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline } from "../baseline/baseline.js";
import type { NamedSource } from "../harnessutil/harnessutil.js";
import {
  changeTsExtension,
  harnessNewLine,
  isBuiltFile,
  isDefaultLibraryFile,
  isTsConfigFile,
  lineStarts,
  noContent,
  removeTestPathPrefixes,
  sanitizeTestFilePath,
  splitLines,
} from "./util.js";

export interface BaselineDiagnostic {
  readonly fileName?: string;
  readonly message: string;
  readonly code: number;
  readonly category?: string;
  readonly start?: number;
  readonly length?: number;
  readonly line?: number;
  readonly character?: number;
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
  return iterateErrorBaseline(inputFiles, diagnostics, pretty).join("");
}

export function iterateErrorBaseline(
  inputFiles: readonly NamedSource[],
  diagnostics: readonly BaselineDiagnostic[],
  pretty = false,
): readonly string[] {
  const sorted = [...diagnostics].sort(compareDiagnostics);
  const sections: string[] = [
    `${minimalDiagnosticsToString(sorted, pretty).replace(/^(lib.*\.d\.ts)\(\d+,\d+\)/gim, "$1(--,--)")}${harnessNewLine}${harnessNewLine}`,
  ];
  const globalDiagnostics = sorted.filter(diagnostic => diagnostic.fileName === undefined);
  if (globalDiagnostics.length > 0) {
    sections.push(globalDiagnostics.map(formatErrorLine).join(harnessNewLine));
  }

  let totalErrorsReportedInNonLibraryNonTsconfigFiles = globalDiagnostics.length;
  const duplicateCases = new Set<string>();
  for (const file of inputFiles) {
    const fileDiagnostics = sorted.filter(diagnostic =>
      diagnostic.fileName !== undefined
      && compareBaselinePaths(diagnostic.fileName, file.name) === 0);
    const section = formatFileErrorSection(file, fileDiagnostics);
    sections.push(section.text);
    if (duplicateCases.has(sanitizeTestFilePath(file.name))) {
      totalErrorsReportedInNonLibraryNonTsconfigFiles -= section.errorsReported;
    } else {
      duplicateCases.add(sanitizeTestFilePath(file.name));
    }
    totalErrorsReportedInNonLibraryNonTsconfigFiles += fileDiagnostics.filter(diagnostic =>
      !isDefaultLibraryFile(diagnostic.fileName) && !isTsConfigFile(diagnostic.fileName)).length;
  }

  const numLibraryDiagnostics = sorted.filter(diagnostic =>
    diagnostic.fileName !== undefined && (isDefaultLibraryFile(diagnostic.fileName) || isBuiltFile(diagnostic.fileName))).length;
  const numTsconfigDiagnostics = sorted.filter(diagnostic =>
    diagnostic.fileName !== undefined && isTsConfigFile(diagnostic.fileName)).length;
  if (totalErrorsReportedInNonLibraryNonTsconfigFiles + numLibraryDiagnostics + numTsconfigDiagnostics < sorted.length) {
    throw new Error("Error baseline did not account for every diagnostic.");
  }

  return sections.filter(section => section.length > 0);
}

export function minimalDiagnosticsToString(diagnostics: readonly BaselineDiagnostic[], pretty = false): string {
  const lines = diagnostics.map(diagnostic => {
    const category = diagnostic.category ?? "error";
    const code = `TS${diagnostic.code}`;
    if (diagnostic.fileName === undefined || diagnostic.start === undefined) {
      return `${category} ${code}: ${diagnostic.message}`;
    }
    const [line, character] = diagnostic.line !== undefined && diagnostic.character !== undefined
      ? [diagnostic.line, diagnostic.character]
      : [diagnostic.start, diagnostic.start];
    const location = pretty ? `(${line + 1},${character + 1})` : `(${line + 1},${character + 1})`;
    return `${removeTestPathPrefixes(diagnostic.fileName, false)}${location}: ${category} ${code}: ${diagnostic.message}`;
  });
  return lines.join(harnessNewLine);
}

function formatFileErrorSection(file: NamedSource, diagnostics: readonly BaselineDiagnostic[]): { readonly text: string; readonly errorsReported: number } {
  const lines = splitLines(file.content);
  const starts = lineStarts(file.content);
  const out: string[] = [];
  out.push(`==== ${removeTestPathPrefixes(file.name, false)} (${diagnostics.length} errors) ====`);
  let markedErrorCount = 0;
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex]!;
    const thisLineStart = starts[lineIndex] ?? 0;
    const nextLineStart = lineIndex === lines.length - 1 ? file.content.length : starts[lineIndex + 1]!;
    out.push(`    ${line}`);
    for (const diagnostic of diagnostics) {
      const diagnosticStart = diagnostic.start ?? 0;
      const diagnosticEnd = diagnosticStart + Math.max(1, diagnostic.length ?? 1);
      if (diagnosticEnd < thisLineStart || (diagnosticStart >= nextLineStart && lineIndex !== lines.length - 1)) continue;

      const relativeOffset = diagnosticStart - thisLineStart;
      const lengthOnLine = diagnosticEnd - diagnosticStart - Math.max(0, thisLineStart - diagnosticStart);
      const squiggleStart = Math.max(0, relativeOffset);
      const squiggleEnd = Math.max(squiggleStart + 1, Math.min(squiggleStart + lengthOnLine, line.length));
      out.push(`    ${line.slice(0, squiggleStart).replace(/\S/g, " ")}${"~".repeat(Math.max(1, squiggleEnd - squiggleStart))}`);
      if (lineIndex === lines.length - 1 || nextLineStart > diagnosticEnd) {
        out.push(formatErrorLine(diagnostic));
        markedErrorCount += 1;
      }
    }
  }
  if (markedErrorCount !== diagnostics.length) {
    throw new Error(`Error baseline missed diagnostics in ${file.name}: marked ${markedErrorCount}, expected ${diagnostics.length}`);
  }
  return { text: out.join(harnessNewLine), errorsReported: markedErrorCount };
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
  const line = diagnostic.line ?? diagnostic.start ?? 0;
  const character = diagnostic.character ?? diagnostic.start ?? 0;
  return ` ${removeTestPathPrefixes(diagnostic.fileName, false)}:${line}:${character}`;
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

function compareBaselinePaths(left: string, right: string): number {
  return removeTestPathPrefixes(left, false).toLowerCase().localeCompare(removeTestPathPrefixes(right, false).toLowerCase());
}
