/**
 * Owner-cache parity helpers.
 */

export interface OwnerCache {
  readonly fileToProject: Map<string, string>;
  readonly projectToFiles: Map<string, Set<string>>;
}

export function createOwnerCache(): OwnerCache {
  return { fileToProject: new Map(), projectToFiles: new Map() };
}

export function setFileOwner(cache: OwnerCache, file: string, project: string): void {
  const previous = cache.fileToProject.get(file);
  if (previous !== undefined) cache.projectToFiles.get(previous)?.delete(file);
  cache.fileToProject.set(file, project);
  let files = cache.projectToFiles.get(project);
  if (files === undefined) {
    files = new Set();
    cache.projectToFiles.set(project, files);
  }
  files.add(file);
}

export function removeFileOwner(cache: OwnerCache, file: string): void {
  const previous = cache.fileToProject.get(file);
  if (previous === undefined) return;
  cache.fileToProject.delete(file);
  cache.projectToFiles.get(previous)?.delete(file);
}

export function filesOwnedByProject(cache: OwnerCache, project: string): readonly string[] {
  return [...(cache.projectToFiles.get(project) ?? [])].sort();
}

export function projectOwningFile(cache: OwnerCache, file: string): string | undefined {
  return cache.fileToProject.get(file);
}

export function invalidateProjectOwners(cache: OwnerCache, project: string): readonly string[] {
  const files = filesOwnedByProject(cache, project);
  for (const file of files) cache.fileToProject.delete(file);
  cache.projectToFiles.delete(project);
  return files;
}
