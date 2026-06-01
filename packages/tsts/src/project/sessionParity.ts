/**
 * Project session parity helpers.
 */

export interface ProjectSessionState {
  readonly openProjects: Set<string>;
  readonly pendingReloads: Set<string>;
  readonly closedProjects: Set<string>;
}

export function createProjectSessionState(): ProjectSessionState {
  return { openProjects: new Set(), pendingReloads: new Set(), closedProjects: new Set() };
}

export function openProjectSession(state: ProjectSessionState, projectName: string): void {
  state.openProjects.add(projectName);
  state.closedProjects.delete(projectName);
}

export function closeProjectSession(state: ProjectSessionState, projectName: string): void {
  state.openProjects.delete(projectName);
  state.pendingReloads.delete(projectName);
  state.closedProjects.add(projectName);
}

export function requestProjectReload(state: ProjectSessionState, projectName: string): void {
  if (state.openProjects.has(projectName)) state.pendingReloads.add(projectName);
}

export function consumeProjectReloads(state: ProjectSessionState): readonly string[] {
  const reloads = [...state.pendingReloads].sort();
  state.pendingReloads.clear();
  return reloads;
}
