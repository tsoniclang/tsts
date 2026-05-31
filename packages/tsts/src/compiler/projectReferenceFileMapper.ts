/**
 * Project-reference file mapper.
 *
 * Port of TS-Go `internal/compiler/projectreferencefilemapper.go` (~187 LoC).
 * Maps file paths between the source-of-project-reference (`*.ts`)
 * and the output (`*.d.ts`) used by downstream programs that consume
 * the upstream as a project reference.
 */

import type { ParsedCommandLine } from "./types.js";

export interface FileMappingEntry {
  source: string;
  output: string;
  config: ParsedCommandLine;
}

export class ProjectReferenceFileMapper {
  sourceToOutput: Map<string, FileMappingEntry> = new Map();
  outputToSource: Map<string, FileMappingEntry> = new Map();

  addMapping(source: string, output: string, config: ParsedCommandLine): void {
    const entry: FileMappingEntry = { source, output, config };
    this.sourceToOutput.set(source, entry);
    this.outputToSource.set(output, entry);
  }

  getOutputForSource(source: string): string | undefined {
    return this.sourceToOutput.get(source)?.output;
  }

  getSourceForOutput(output: string): string | undefined {
    return this.outputToSource.get(output)?.source;
  }

  getConfigForSource(source: string): ParsedCommandLine | undefined {
    return this.sourceToOutput.get(source)?.config;
  }

  getConfigForOutput(output: string): ParsedCommandLine | undefined {
    return this.outputToSource.get(output)?.config;
  }
}

export function newProjectReferenceFileMapper(): ProjectReferenceFileMapper {
  return new ProjectReferenceFileMapper();
}
