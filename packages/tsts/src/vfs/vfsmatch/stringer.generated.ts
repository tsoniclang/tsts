import { type Usage } from "./vfsMatch.js";

const usageNames: readonly string[] = ["Files", "Directories", "Exclude"];

export function usageToString(value: Usage): string {
  return usageNames[value] ?? `Usage(${value})`;
}
