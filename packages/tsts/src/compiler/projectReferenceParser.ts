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
  resolveConfig?: (configFileName: string, parentConfig: ParsedCommandLine | undefined) => ParsedCommandLine | undefined;
}

export interface ParsedProjectReference {
  configFileName: string;
  config: ParsedCommandLine | undefined;
  children: readonly ParsedProjectReference[];
  circular: boolean;
}

export class ProjectReferenceParseTask {
  readonly configName: string;
  resolved: ParsedCommandLine | undefined;
  subTasks: ProjectReferenceParseTask[] = [];

  constructor(configName: string) {
    this.configName = configName;
  }

  parse(parser: ProjectReferenceParser, parentConfig: ParsedCommandLine | undefined): void {
    this.resolved = parser.resolveConfig(this.configName, parentConfig);
    if (this.resolved === undefined) return;
    const references = this.resolved.references?.() ?? [];
    this.subTasks = createProjectReferenceParseTasks(references.map((ref) => ref.configFileName ?? ""));
  }
}

export class ProjectReferenceParser {
  visited: Set<string> = new Set();
  private readonly tasksByFileName = new Map<string, ProjectReferenceParseTask>();
  private readonly resolver: ((configFileName: string, parentConfig: ParsedCommandLine | undefined) => ParsedCommandLine | undefined) | undefined;

  constructor(resolveConfig?: (configFileName: string, parentConfig: ParsedCommandLine | undefined) => ParsedCommandLine | undefined) {
    this.resolver = resolveConfig;
  }

  parse(opts: ProjectReferenceParseOptions): ParsedProjectReference | undefined {
    const visited = opts.visitedPaths ?? this.visited;
    if (visited.has(opts.configFileName)) return {
      configFileName: opts.configFileName,
      config: undefined,
      children: [],
      circular: true,
    };
    visited.add(opts.configFileName);

    const priorResolver = this.resolver;
    const resolver = opts.resolveConfig ?? priorResolver;
    if (resolver === undefined) return undefined;
    const task = this.getOrCreateTask(opts.configFileName);
    task.resolved ??= resolver(opts.configFileName, opts.parentConfig);
    if (task.resolved === undefined) return undefined;

    const children = this.parseChildReferences(task.resolved, visited, resolver);
    return {
      configFileName: opts.configFileName,
      config: task.resolved,
      children,
      circular: false,
    };
  }

  parseAll(roots: readonly string[]): readonly ParsedProjectReference[] {
    const result: ParsedProjectReference[] = [];
    for (const root of roots) {
      const parsed = this.parse({ configFileName: root });
      if (parsed !== undefined) result.push(parsed);
    }
    return result;
  }

  start(tasks: ProjectReferenceParseTask[], parentConfig: ParsedCommandLine | undefined = undefined): void {
    for (let index = 0; index < tasks.length; index += 1) {
      const task = tasks[index]!;
      const existing = this.tasksByFileName.get(task.configName);
      if (existing !== undefined) {
        tasks[index] = existing;
        continue;
      }
      this.tasksByFileName.set(task.configName, task);
      task.parse(this, parentConfig);
      this.start(task.subTasks, task.resolved);
    }
  }

  resolveConfig(configFileName: string, parentConfig: ParsedCommandLine | undefined): ParsedCommandLine | undefined {
    return this.resolver?.(configFileName, parentConfig);
  }

  initMapper(tasks: readonly ProjectReferenceParseTask[]): Map<string, ParsedCommandLine | undefined> {
    const result = new Map<string, ParsedCommandLine | undefined>();
    const visit = (task: ProjectReferenceParseTask): void => {
      if (result.has(task.configName)) return;
      result.set(task.configName, task.resolved);
      for (const child of task.subTasks) visit(child);
    };
    for (const task of tasks) visit(task);
    return result;
  }

  private getOrCreateTask(configName: string): ProjectReferenceParseTask {
    const existing = this.tasksByFileName.get(configName);
    if (existing !== undefined) return existing;
    const task = new ProjectReferenceParseTask(configName);
    this.tasksByFileName.set(configName, task);
    return task;
  }

  private parseChildReferences(
    config: ParsedCommandLine,
    visited: Set<string>,
    resolver: (configFileName: string, parentConfig: ParsedCommandLine | undefined) => ParsedCommandLine | undefined,
  ): readonly ParsedProjectReference[] {
    const children: ParsedProjectReference[] = [];
    for (const reference of config.references?.() ?? []) {
      const configFileName = reference.configFileName ?? "";
      if (configFileName === "") continue;
      const parsed = this.parse({ configFileName, parentConfig: config, visitedPaths: new Set(visited), resolveConfig: resolver });
      if (parsed !== undefined) children.push(parsed);
    }
    return children;
  }
}

export function createProjectReferenceParseTasks(projectReferences: readonly string[]): ProjectReferenceParseTask[] {
  return projectReferences.filter((configName) => configName !== "").map((configName) => new ProjectReferenceParseTask(configName));
}

export function newProjectReferenceParser(
  resolveConfig?: (configFileName: string, parentConfig: ParsedCommandLine | undefined) => ParsedCommandLine | undefined,
): ProjectReferenceParser {
  return new ProjectReferenceParser(resolveConfig);
}
