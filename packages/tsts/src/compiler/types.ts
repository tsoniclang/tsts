/**
 * Shared types for the compiler module.
 *
 * Re-exports + minimal forward declarations to break circular imports
 * between program.ts / fileloader.ts / emitter.ts / etc.
 */

export interface ParsedCommandLine {
  configFileName?: string;
  compilerOptions(): unknown;
  fileNames(): readonly string[];
  rootNames(): readonly string[];
  references(): readonly ParsedCommandLine[];
}
