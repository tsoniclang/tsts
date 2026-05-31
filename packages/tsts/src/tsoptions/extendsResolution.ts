/**
 * tsconfig `extends` resolution.
 *
 * TS-Go resolves `extends` as a list-or-element option and keeps a resolution
 * stack to detect cycles. This module ports that contract without coupling the
 * parser to a concrete filesystem implementation: callers provide host hooks,
 * and the resolver returns deterministic steps that tsconfig parsing can merge.
 */

import { combinePaths, getDirectoryPath, getNormalizedAbsolutePath, normalizePath, pathIsAbsolute } from "../tspath/index.js";

export interface ExtendsResolutionHost {
  readonly currentDirectory: string;
  fileExists(path: string): boolean;
  readFile(path: string): string | undefined;
  directoryExists?(path: string): boolean;
  trace?(message: string): void;
}

export interface ExtendsResolutionRequest {
  readonly containingConfigFileName: string;
  readonly extendsValue: string;
  readonly resolutionStack: readonly string[];
}

export interface ExtendsResolutionSuccess {
  readonly status: "resolved";
  readonly requested: string;
  readonly resolvedPath: string;
  readonly text: string;
}

export interface ExtendsResolutionFailure {
  readonly status: "notFound" | "circularity" | "invalid";
  readonly requested: string;
  readonly message: string;
  readonly failedLookupLocations: readonly string[];
}

export type ExtendsResolutionResult = ExtendsResolutionSuccess | ExtendsResolutionFailure;

export interface ParsedExtendsList {
  readonly values: readonly string[];
  readonly diagnostics: readonly string[];
}

export function parseExtendsList(value: unknown): ParsedExtendsList {
  if (typeof value === "string") return { values: [value], diagnostics: [] };
  if (!Array.isArray(value)) {
    return { values: [], diagnostics: ["The 'extends' property must be a string or string array."] };
  }
  const values: string[] = [];
  const diagnostics: string[] = [];
  for (const item of value as readonly unknown[]) {
    if (typeof item === "string") {
      values.push(item);
    } else {
      diagnostics.push("Each 'extends' entry must be a string.");
    }
  }
  return { values, diagnostics };
}

export function resolveExtends(
  request: ExtendsResolutionRequest,
  host: ExtendsResolutionHost,
): ExtendsResolutionResult {
  const requested = request.extendsValue.trim();
  if (requested === "") {
    return {
      status: "invalid",
      requested,
      message: "The 'extends' entry cannot be empty.",
      failedLookupLocations: [],
    };
  }
  const containingDirectory = getDirectoryPath(getNormalizedAbsolutePath(
    request.containingConfigFileName,
    host.currentDirectory,
  ));
  const candidateLocations = getExtendsCandidateLocations(requested, containingDirectory, host.currentDirectory);
  for (const candidate of candidateLocations) {
    const normalized = normalizePath(candidate);
    if (request.resolutionStack.includes(normalized)) {
      return {
        status: "circularity",
        requested,
        message: `Circularity detected while resolving '${requested}'.`,
        failedLookupLocations: candidateLocations,
      };
    }
    if (host.fileExists(normalized)) {
      const text = host.readFile(normalized);
      if (text === undefined) {
        return {
          status: "notFound",
          requested,
          message: `Cannot read extended config '${normalized}'.`,
          failedLookupLocations: candidateLocations,
        };
      }
      host.trace?.(`Resolved extended config '${requested}' to '${normalized}'.`);
      return {
        status: "resolved",
        requested,
        resolvedPath: normalized,
        text,
      };
    }
  }
  return {
    status: "notFound",
    requested,
    message: `Cannot find extended config '${requested}'.`,
    failedLookupLocations: candidateLocations,
  };
}

export function getExtendsCandidateLocations(
  requested: string,
  containingDirectory: string,
  currentDirectory: string,
): readonly string[] {
  if (pathIsAbsolute(requested)) return withJsonConfigExtension(requested);
  if (isRelativeConfigName(requested)) {
    return withJsonConfigExtension(combinePaths(containingDirectory, requested));
  }
  return nodeModuleConfigCandidates(requested, containingDirectory, currentDirectory);
}

function isRelativeConfigName(requested: string): boolean {
  return requested.startsWith("./") || requested.startsWith("../");
}

function withJsonConfigExtension(path: string): readonly string[] {
  if (path.endsWith(".json")) return [path];
  return [path, `${path}.json`];
}

function nodeModuleConfigCandidates(
  requested: string,
  containingDirectory: string,
  currentDirectory: string,
): readonly string[] {
  const roots = ancestorDirectories(containingDirectory === "" ? currentDirectory : containingDirectory);
  const result: string[] = [];
  for (const root of roots) {
    result.push(...withJsonConfigExtension(combinePaths(root, "node_modules", requested)));
    result.push(...withJsonConfigExtension(combinePaths(root, "node_modules", requested, "tsconfig")));
  }
  return result;
}

function ancestorDirectories(start: string): readonly string[] {
  const result: string[] = [];
  let current = normalizePath(start);
  while (current !== "") {
    result.push(current);
    const parent = getDirectoryPath(current);
    if (parent === current || parent === "") break;
    current = parent;
  }
  return result;
}

export function mergeExtendedConfigObjects(
  base: Record<string, unknown>,
  extension: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...extension };
  for (const [key, value] of Object.entries(base)) {
    if (key === "compilerOptions") {
      merged[key] = mergeNestedObject(
        asPlainObject(extension.compilerOptions),
        asPlainObject(value),
      );
    } else if (key === "watchOptions") {
      merged[key] = mergeNestedObject(
        asPlainObject(extension.watchOptions),
        asPlainObject(value),
      );
    } else if (key === "typeAcquisition") {
      merged[key] = mergeNestedObject(
        asPlainObject(extension.typeAcquisition),
        asPlainObject(value),
      );
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

function asPlainObject(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function mergeNestedObject(
  inherited: Record<string, unknown>,
  own: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...inherited };
  for (const [key, value] of Object.entries(own)) {
    if (value === null) {
      delete result[key];
    } else {
      result[key] = value;
    }
  }
  return result;
}
