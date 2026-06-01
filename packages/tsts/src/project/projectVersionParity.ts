/**
 * Project version parity helpers.
 */

export interface ProjectVersion {
  readonly project: string;
  readonly version: number;
}

export function bumpProjectVersion(version: ProjectVersion): ProjectVersion {
  return { project: version.project, version: version.version + 1 };
}

export function maxProjectVersion(versions: readonly ProjectVersion[]): number {
  return versions.reduce((max, version) => Math.max(max, version.version), 0);
}

export function projectVersionKey(version: ProjectVersion): string {
  return `${version.project}@${version.version}`;
}
