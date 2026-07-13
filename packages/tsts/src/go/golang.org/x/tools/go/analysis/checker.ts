import type { GoError, GoInterface, GoSlice } from "../../../../../compat.js";

export interface Analyzer {
  Name?: string;
  Run?: (pass: unknown) => [unknown, GoError] | GoError;
}

export function Analyze(analyzers: GoSlice<Analyzer>, packages: GoSlice<GoInterface<unknown>>): GoError {
  for (const analyzer of analyzers) {
    if (typeof analyzer.Run !== "function") {
      continue;
    }
    for (const pkg of packages) {
      const result = analyzer.Run({ Pkg: pkg });
      const err = Array.isArray(result) ? result[1] : result;
      if (err !== undefined) {
        return err;
      }
    }
  }
  return undefined;
}
