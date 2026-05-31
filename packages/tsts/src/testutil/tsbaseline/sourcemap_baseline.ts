import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline } from "../baseline/baseline.js";
import { changeTsExtension, harnessNewLine, noContent } from "./util.js";
import type { SourceMapRecord } from "./sourcemap_record_baseline.js";

export function doSourceMapBaseline(
  baselinePath: string,
  records: readonly SourceMapRecord[],
  options: BaselineOptions,
): BaselineResult {
  const actual = records.length === 0
    ? noContent
    : records.map(record => `//// [${record.generated}.map]${harnessNewLine}${record.sourceMap}`).join(`${harnessNewLine}${harnessNewLine}`);
  return compareToBaseline(changeTsExtension(baselinePath, ".sourcemap.txt"), actual, options);
}

export function normalizeSourceMapText(text: string): string {
  return text.replace(/"sources":\s*\[[^\]]*\]/g, '"sources":[]')
    .replace(/"file":\s*"[^"]*"/g, '"file":""');
}
