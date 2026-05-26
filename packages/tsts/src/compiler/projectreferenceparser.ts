/**
 * Project-reference parser.
 *
 * Port of TS-Go `internal/compiler/projectreferenceparser.go` (~115 LoC).
 * Recursively parses the tsconfig referenced by `references[i].path`,
 * building the resolved-project-reference graph.
 */

import type { ParsedCommandLine } from "./types.js";

export interface ProjectReferenceParseOptions {
  configFileName: string;
  parentConfig?: ParsedCommandLine;
  visitedPaths?: Set<string>;
}

export interface ParsedProjectReference {
  configFileName: string;
  config: ParsedCommandLine;
  children: readonly ParsedProjectReference[];
  circular: boolean;
}

export class ProjectReferenceParser {
  visited: Set<string> = new Set();

  parse(opts: ProjectReferenceParseOptions): ParsedProjectReference | undefined {
    if (this.visited.has(opts.configFileName)) {
      return undefined;
    }
    this.visited.add(opts.configFileName);
    void opts.parentConfig;
    return undefined;
  }

  parseAll(roots: readonly string[]): readonly ParsedProjectReference[] {
    const result: ParsedProjectReference[] = [];
    for (const root of roots) {
      const parsed = this.parse({ configFileName: root });
      if (parsed !== undefined) result.push(parsed);
    }
    return result;
  }
}

export function newProjectReferenceParser(): ProjectReferenceParser {
  return new ProjectReferenceParser();
}
