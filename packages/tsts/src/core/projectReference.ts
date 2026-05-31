/**
 * Project reference type used by tsconfig.json `references`.
 *
 * Port of TS-Go `internal/core/projectreference.go` (20 LoC).
 */

export interface ProjectReference {
  readonly path: string;
  readonly originalPath?: string;
  readonly circular?: boolean;
}

export function resolveProjectReferencePath(ref: ProjectReference): string {
  return resolveConfigFileNameOfProjectReference(ref.path);
}

export function resolveConfigFileNameOfProjectReference(path: string): string {
  if (path.endsWith(".json")) return path;
  return path.endsWith("/") ? path + "tsconfig.json" : path + "/tsconfig.json";
}
