/**
 * VFS watch-registry parity helpers.
 */

export type WatchKind = "file" | "directory" | "recursive-directory";

export interface WatchRegistration {
  readonly path: string;
  readonly kind: WatchKind;
  readonly callback: (path: string) => void;
}

export interface WatchRegistry {
  readonly registrations: WatchRegistration[];
}

export function createWatchRegistry(): WatchRegistry {
  return { registrations: [] };
}

export function addWatch(registry: WatchRegistry, registration: WatchRegistration): void {
  registry.registrations.push(registration);
}

export function removeWatch(registry: WatchRegistry, path: string, kind: WatchKind): void {
  for (let index = registry.registrations.length - 1; index >= 0; index -= 1) {
    const registration = registry.registrations[index]!;
    if (registration.path === path && registration.kind === kind) registry.registrations.splice(index, 1);
  }
}

export function notifyWatchers(registry: WatchRegistry, changedPath: string): void {
  for (const registration of registry.registrations) {
    if (watchMatches(registration, changedPath)) registration.callback(changedPath);
  }
}

export function watchMatches(registration: WatchRegistration, changedPath: string): boolean {
  if (registration.kind === "file") return registration.path === changedPath;
  if (registration.kind === "directory") return parentPath(changedPath) === registration.path;
  return changedPath === registration.path || changedPath.startsWith(`${registration.path}/`);
}

function parentPath(path: string): string {
  const index = path.lastIndexOf("/");
  return index < 0 ? "" : path.slice(0, index);
}
