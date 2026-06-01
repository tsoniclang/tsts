/**
 * Project identity parity helpers.
 */

export interface ProjectIdentity {
  readonly name: string;
  readonly configPath: string;
  readonly currentDirectory: string;
}

export function projectIdentityKey(identity: ProjectIdentity): string {
  return `${normalize(identity.currentDirectory)}\0${normalize(identity.configPath)}\0${identity.name}`;
}

export function sameProjectIdentity(left: ProjectIdentity, right: ProjectIdentity): boolean {
  return projectIdentityKey(left) === projectIdentityKey(right);
}

function normalize(path: string): string {
  return path.replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
}
