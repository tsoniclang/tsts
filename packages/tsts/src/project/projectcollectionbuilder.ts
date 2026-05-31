import { createProgram, type CompilerHost, type CompilerOptions } from "../program/index.js";
import { newLogTree, type LogTree } from "./logging/logtree.js";
import { Kind, Project } from "./project.js";
import { ProjectCollection } from "./projectcollection.js";
import type { Snapshot } from "./snapshot.js";

export interface ProjectConfig {
  readonly configFileName: string;
  readonly rootFileNames: readonly string[];
  readonly compilerOptions?: CompilerOptions;
}

export interface ProjectCollectionBuilderOptions {
  readonly currentDirectory: string;
  readonly host: CompilerHost;
  readonly logger?: LogTree;
}

export class ProjectCollectionBuilder {
  readonly currentDirectory: string;
  readonly host: CompilerHost;
  readonly logger: LogTree;
  private readonly collection: ProjectCollection;
  private readonly configs: ProjectConfig[] = [];

  constructor(options: ProjectCollectionBuilderOptions) {
    this.currentDirectory = options.currentDirectory;
    this.host = options.host;
    this.logger = options.logger ?? newLogTree("project-builder");
    this.collection = new ProjectCollection(fileName => this.toPath(fileName));
  }

  addConfig(config: ProjectConfig): Project {
    this.configs.push(config);
    const project = new Project({
      configFileName: config.configFileName,
      kind: Kind.Configured,
      currentDirectory: this.currentDirectory,
      rootFileNames: config.rootFileNames,
      compilerOptions: config.compilerOptions,
      logger: this.logger,
    });
    this.collection.addProject(project);
    return project;
  }

  addInferredProject(rootFileNames: readonly string[], compilerOptions?: CompilerOptions): Project {
    const project = new Project({
      configFileName: "/dev/null/inferred",
      kind: Kind.Inferred,
      currentDirectory: this.currentDirectory,
      rootFileNames,
      compilerOptions,
      logger: this.logger,
    });
    this.collection.addProject(project);
    return project;
  }

  updatePrograms(snapshot?: Snapshot): ProjectCollection {
    for (const project of this.collection.projects()) {
      if (!project.dirty && project.program !== undefined) continue;
      const program = createProgram(project.rootFileNames, project.compilerOptions ?? {}, this.host);
      project.setProgram(program, snapshot?.id() ?? 0, project.program === undefined ? 3 : 1);
    }
    return this.collection;
  }

  build(): ProjectCollection {
    return this.collection.clone();
  }

  private toPath(fileName: string): string {
    const normalized = fileName.replaceAll("\\", "/");
    if (normalized.startsWith("/")) return normalize(normalized);
    return normalize(`${this.currentDirectory}/${normalized}`);
  }
}

function normalize(path: string): string {
  const parts: string[] = [];
  for (const part of path.split("/")) {
    if (part.length === 0 || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return path.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
}
