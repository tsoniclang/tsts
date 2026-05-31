/**
 * Project-reference parsing helpers.
 *
 * TS-Go parses `references` at the tsconfig root into `core.ProjectReference`
 * values before module/program construction. This file keeps that conversion
 * explicit and deterministic so parser, project, and show-config callers do
 * not duplicate the same object-shape checks.
 */

import type { ProjectReference } from "../core/projectReference.js";
import { combinePaths, getNormalizedAbsolutePath, normalizePath, pathIsAbsolute } from "../tspath/index.js";

export interface ProjectReferenceParseDiagnostic {
  readonly index: number;
  readonly property: string;
  readonly message: string;
}

export interface ProjectReferenceParseResult {
  readonly references: readonly ProjectReference[];
  readonly diagnostics: readonly ProjectReferenceParseDiagnostic[];
}

export interface NormalizedProjectReference extends ProjectReference {
  readonly resolvedPath: string;
  readonly commandLinePath: string;
}

export function parseProjectReferences(
  json: unknown,
  basePath: string,
): ProjectReferenceParseResult {
  const diagnostics: ProjectReferenceParseDiagnostic[] = [];
  const references: ProjectReference[] = [];
  if (json === undefined) return { references, diagnostics };
  if (!Array.isArray(json)) {
    return {
      references,
      diagnostics: [{ index: -1, property: "references", message: "The 'references' property must be an array." }],
    };
  }
  for (let index = 0; index < json.length; index += 1) {
    const raw = json[index];
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
      diagnostics.push({ index, property: "references", message: "Each project reference must be an object." });
      continue;
    }
    const object = raw as Record<string, unknown>;
    const path = object.path;
    if (typeof path !== "string" || path === "") {
      diagnostics.push({ index, property: "path", message: "Project reference 'path' must be a non-empty string." });
      continue;
    }
    const circular = object.circular === true;
    const originalPath = typeof object.originalPath === "string" ? object.originalPath : path;
    const normalizedPath = normalizeReferencePath(path, basePath);
    references.push({
      path: normalizedPath,
      circular,
      originalPath,
    });
  }
  return { references, diagnostics };
}

export function normalizeReferencePath(path: string, basePath: string): string {
  return normalizePath(pathIsAbsolute(path) ? path : combinePaths(basePath, path));
}

export function normalizeProjectReferences(
  references: readonly ProjectReference[],
  basePath: string,
): readonly NormalizedProjectReference[] {
  return references.map((reference) => {
    const originalPath = reference.originalPath ?? reference.path;
    return {
      ...reference,
      originalPath,
      resolvedPath: getNormalizedAbsolutePath(reference.path, basePath),
      commandLinePath: originalPath,
    };
  });
}

export function projectReferenceKey(reference: ProjectReference, basePath: string): string {
  return normalizeReferencePath(reference.path, basePath).toLowerCase();
}

export function deduplicateProjectReferences(
  references: readonly ProjectReference[],
  basePath: string,
): readonly ProjectReference[] {
  const seen = new Set<string>();
  const result: ProjectReference[] = [];
  for (const reference of references) {
    const key = projectReferenceKey(reference, basePath);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(reference);
  }
  return result;
}

export function referencedProjectConfigFileName(reference: ProjectReference, basePath: string): string {
  const path = normalizeReferencePath(reference.path, basePath);
  if (path.endsWith(".json")) return path;
  return combinePaths(path, "tsconfig.json");
}

export function referencesContainCircularity(
  references: readonly ProjectReference[],
): boolean {
  return references.some((reference) => reference.circular === true);
}

export function serializeProjectReference(reference: ProjectReference): Record<string, unknown> {
  const out: Record<string, unknown> = { path: reference.originalPath ?? reference.path };
  if (reference.circular === true) out.circular = true;
  return out;
}
