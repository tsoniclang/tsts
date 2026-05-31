/**
 * Project lifecycle parity helpers.
 *
 * TS-Go's project package centralizes graph dirtiness, owner-cache invalidation,
 * config-file registry updates, parse-cache lifetime, and snapshot handoff. This
 * file ports those lifecycle decisions as composable operations over the TSTS
 * project model.
 */

export interface ProjectLifecycleState {
  readonly projects: Map<string, ProjectRecord>;
  readonly configFiles: Map<string, ConfigFileRecord>;
  readonly ownerCache: Map<string, string>;
  readonly parseCache: Map<string, ParsedFileRecord>;
  readonly dirtyFiles: Set<string>;
  readonly logs: ProjectLifecycleLog[];
}

export interface ProjectRecord {
  readonly name: string;
  readonly rootFiles: Set<string>;
  readonly referencedProjects: Set<string>;
  readonly openFiles: Set<string>;
  readonly version: number;
  readonly dirty: boolean;
}

export interface ConfigFileRecord {
  readonly path: string;
  readonly projectName: string;
  readonly version: number;
  readonly fileNames: readonly string[];
}

export interface ParsedFileRecord {
  readonly path: string;
  readonly version: number;
  readonly sourceFile: unknown;
}

export interface ProjectLifecycleLog {
  readonly event: string;
  readonly path?: string;
  readonly projectName?: string;
}

export function createProjectLifecycleState(): ProjectLifecycleState {
  return {
    projects: new Map(),
    configFiles: new Map(),
    ownerCache: new Map(),
    parseCache: new Map(),
    dirtyFiles: new Set(),
    logs: [],
  };
}

export function registerProject(state: ProjectLifecycleState, projectName: string, rootFiles: readonly string[], references: readonly string[] = []): ProjectRecord {
  const existing = state.projects.get(projectName);
  const next: ProjectRecord = {
    name: projectName,
    rootFiles: new Set(rootFiles),
    referencedProjects: new Set(references),
    openFiles: new Set(existing?.openFiles ?? []),
    version: (existing?.version ?? 0) + 1,
    dirty: true,
  };
  state.projects.set(projectName, next);
  for (const file of rootFiles) state.ownerCache.set(file, projectName);
  state.logs.push({ event: "register-project", projectName });
  return next;
}

export function updateConfigFile(state: ProjectLifecycleState, configPath: string, projectName: string, fileNames: readonly string[]): ConfigFileRecord {
  const existing = state.configFiles.get(configPath);
  const record: ConfigFileRecord = {
    path: configPath,
    projectName,
    version: (existing?.version ?? 0) + 1,
    fileNames,
  };
  state.configFiles.set(configPath, record);
  registerProject(state, projectName, fileNames, [...(state.projects.get(projectName)?.referencedProjects ?? [])]);
  state.logs.push({ event: "update-config", path: configPath, projectName });
  return record;
}

export function markFileDirty(state: ProjectLifecycleState, path: string): void {
  state.dirtyFiles.add(path);
  const owner = state.ownerCache.get(path);
  if (owner !== undefined) markProjectDirty(state, owner);
  state.parseCache.delete(path);
  state.logs.push({ event: "file-dirty", path, ...(owner === undefined ? {} : { projectName: owner }) });
}

export function markProjectDirty(state: ProjectLifecycleState, projectName: string): void {
  const project = state.projects.get(projectName);
  if (project === undefined || project.dirty) return;
  state.projects.set(projectName, { ...project, dirty: true, version: project.version + 1 });
  state.logs.push({ event: "project-dirty", projectName });
}

export function clearProjectDirty(state: ProjectLifecycleState, projectName: string): void {
  const project = state.projects.get(projectName);
  if (project === undefined) return;
  state.projects.set(projectName, { ...project, dirty: false });
  for (const file of project.rootFiles) state.dirtyFiles.delete(file);
  state.logs.push({ event: "project-clean", projectName });
}

export function openClientFile(state: ProjectLifecycleState, projectName: string, path: string): void {
  const project = state.projects.get(projectName) ?? registerProject(state, projectName, []);
  project.openFiles.add(path);
  state.ownerCache.set(path, projectName);
  state.logs.push({ event: "open-file", path, projectName });
}

export function closeClientFile(state: ProjectLifecycleState, path: string): void {
  const owner = state.ownerCache.get(path);
  if (owner === undefined) return;
  state.projects.get(owner)?.openFiles.delete(path);
  state.logs.push({ event: "close-file", path, projectName: owner });
}

export function cacheParsedFile(state: ProjectLifecycleState, path: string, version: number, sourceFile: unknown): ParsedFileRecord {
  const record: ParsedFileRecord = { path, version, sourceFile };
  state.parseCache.set(path, record);
  state.dirtyFiles.delete(path);
  state.logs.push({ event: "cache-parse", path });
  return record;
}

export function getParsedFileFromCache(state: ProjectLifecycleState, path: string, version: number): ParsedFileRecord | undefined {
  const cached = state.parseCache.get(path);
  return cached?.version === version ? cached : undefined;
}

export function invalidateOwnerCache(state: ProjectLifecycleState, path: string): void {
  const owner = state.ownerCache.get(path);
  state.ownerCache.delete(path);
  if (owner !== undefined) markProjectDirty(state, owner);
  state.logs.push({ event: "invalidate-owner", path, ...(owner === undefined ? {} : { projectName: owner }) });
}

export function collectAffectedProjects(state: ProjectLifecycleState, changedFiles: readonly string[]): readonly ProjectRecord[] {
  const names = new Set<string>();
  for (const file of changedFiles) {
    const owner = state.ownerCache.get(file);
    if (owner !== undefined) names.add(owner);
    for (const project of state.projects.values()) {
      if (project.rootFiles.has(file)) names.add(project.name);
    }
  }
  return [...names].map(name => state.projects.get(name)).filter((project): project is ProjectRecord => project !== undefined);
}

export function buildProjectSnapshot(state: ProjectLifecycleState): ProjectSnapshot {
  return {
    projects: [...state.projects.values()].map(project => ({
      name: project.name,
      rootFiles: [...project.rootFiles],
      references: [...project.referencedProjects],
      openFiles: [...project.openFiles],
      version: project.version,
      dirty: project.dirty,
    })),
    configFiles: [...state.configFiles.values()],
    dirtyFiles: [...state.dirtyFiles],
  };
}

export interface ProjectSnapshot {
  readonly projects: readonly ProjectSnapshotRecord[];
  readonly configFiles: readonly ConfigFileRecord[];
  readonly dirtyFiles: readonly string[];
}

export interface ProjectSnapshotRecord {
  readonly name: string;
  readonly rootFiles: readonly string[];
  readonly references: readonly string[];
  readonly openFiles: readonly string[];
  readonly version: number;
  readonly dirty: boolean;
}
