import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline } from "../baseline/baseline.js";
import { changeTsExtension, harnessNewLine, noContent } from "./util.js";

export interface ModuleResolutionTrace {
  readonly containingFile: string;
  readonly moduleName: string;
  readonly resolvedFileName?: string;
  readonly failedLookupLocations?: readonly string[];
}

export function doModuleResolutionBaseline(
  baselinePath: string,
  traces: readonly ModuleResolutionTrace[],
  options: BaselineOptions,
): BaselineResult {
  const text = traces.length === 0 ? noContent : traces.map(formatModuleResolutionTrace).join(`${harnessNewLine}${harnessNewLine}`);
  return compareToBaseline(changeTsExtension(baselinePath, ".resolution.txt"), text, options);
}

export function formatModuleResolutionTrace(trace: ModuleResolutionTrace): string {
  const lines = [
    `======== Resolving module '${trace.moduleName}' from '${trace.containingFile}'. ========`,
    trace.resolvedFileName === undefined
      ? "Module name was not resolved."
      : `Module name resolved to '${trace.resolvedFileName}'.`,
  ];
  for (const failed of trace.failedLookupLocations ?? []) lines.push(`File '${failed}' does not exist.`);
  return lines.join(harnessNewLine);
}
