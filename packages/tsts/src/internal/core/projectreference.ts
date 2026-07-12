import type { bool } from "../../go/scalars.js";
import type { GoPtr } from "../../go/compat.js";
import { CombinePaths, FileExtensionIs } from "../tspath/path.js";
import { ExtensionJson } from "../tspath/extension.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/projectreference.go::type::ProjectReference","kind":"type","status":"implemented","sigHash":"a64ee7e7a37a15056bba4b6486d88bfaeab0a36db99a717aee8f8ce7df77f325"}
 *
 * Go source:
 * ProjectReference struct {
 * 	Path         string
 * 	OriginalPath string
 * 	Circular     bool
 * }
 */
export interface ProjectReference {
  Path: string;
  OriginalPath: string;
  Circular: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/projectreference.go::func::ResolveProjectReferencePath","kind":"func","status":"implemented","sigHash":"c383cf92b1484acd16331e92d5f29bb9efa43eb8d9113091eb7090a4299ce75e"}
 *
 * Go source:
 * func ResolveProjectReferencePath(ref *ProjectReference) string {
 * 	return ResolveConfigFileNameOfProjectReference(ref.Path)
 * }
 */
export function ResolveProjectReferencePath(ref: GoPtr<ProjectReference>): string {
  return ResolveConfigFileNameOfProjectReference(ref!.Path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/projectreference.go::func::ResolveConfigFileNameOfProjectReference","kind":"func","status":"implemented","sigHash":"a02e1f6ac5e4bf85ec1def08a2f934122abf3a7d848db4ccc935248e91549829"}
 *
 * Go source:
 * func ResolveConfigFileNameOfProjectReference(path string) string {
 * 	if tspath.FileExtensionIs(path, tspath.ExtensionJson) {
 * 		return path
 * 	}
 * 	return tspath.CombinePaths(path, "tsconfig.json")
 * }
 */
export function ResolveConfigFileNameOfProjectReference(path: string): string {
  if (FileExtensionIs(path, ExtensionJson)) {
    return path;
  }
  return CombinePaths(path, "tsconfig.json");
}
