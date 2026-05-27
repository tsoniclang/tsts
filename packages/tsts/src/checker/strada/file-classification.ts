/**
 * Source-file classification helpers.
 *
 * Ported from Strada `utilities.go` — isDeclarationFile, isExternalModule,
 * isJSFile, isJsonFile, getScriptKindFromFileName.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

export const ScriptKind = {
  Unknown: 0,
  TS: 1,
  TSX: 2,
  JS: 3,
  JSX: 4,
  Json: 5,
  Deferred: 6,
} as const;

export type ScriptKind =
  | typeof ScriptKind.Unknown
  | typeof ScriptKind.TS
  | typeof ScriptKind.TSX
  | typeof ScriptKind.JS
  | typeof ScriptKind.JSX
  | typeof ScriptKind.Json
  | typeof ScriptKind.Deferred;

/**
 * Returns the ScriptKind from a file name based on its extension.
 */
export function getScriptKindFromFileName(fileName: string): ScriptKind {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".d.ts")) return ScriptKind.TS;
  if (lower.endsWith(".ts")) return ScriptKind.TS;
  if (lower.endsWith(".tsx")) return ScriptKind.TSX;
  if (lower.endsWith(".js")) return ScriptKind.JS;
  if (lower.endsWith(".jsx")) return ScriptKind.JSX;
  if (lower.endsWith(".json")) return ScriptKind.Json;
  return ScriptKind.Unknown;
}

/**
 * Returns true when the file name has a `.d.ts` extension.
 */
export function isDeclarationFileName(fileName: string): boolean {
  return fileName.toLowerCase().endsWith(".d.ts");
}

/**
 * Returns true when the SourceFile is a declaration file.
 */
export function isDeclarationFile(node: AstNode): boolean {
  if (node.kind !== Kind.SourceFile) return false;
  return (node as unknown as { isDeclarationFile?: boolean }).isDeclarationFile === true;
}

/**
 * Returns true when the SourceFile is an external (ESM) module.
 */
export function isExternalModuleFile(node: AstNode): boolean {
  if (node.kind !== Kind.SourceFile) return false;
  return (node as unknown as { isExternalModule?: boolean }).isExternalModule === true;
}

/**
 * Returns true when the SourceFile is a JavaScript file.
 */
export function isJSFile(node: AstNode): boolean {
  const fileName = (node as unknown as { fileName?: string }).fileName ?? "";
  const kind = getScriptKindFromFileName(fileName);
  return kind === ScriptKind.JS || kind === ScriptKind.JSX;
}

/**
 * Returns true when the SourceFile is a TypeScript file.
 */
export function isTSFile(node: AstNode): boolean {
  const fileName = (node as unknown as { fileName?: string }).fileName ?? "";
  const kind = getScriptKindFromFileName(fileName);
  return kind === ScriptKind.TS || kind === ScriptKind.TSX;
}

/**
 * Returns true when the SourceFile is a JSON file.
 */
export function isJsonFile(node: AstNode): boolean {
  const fileName = (node as unknown as { fileName?: string }).fileName ?? "";
  return getScriptKindFromFileName(fileName) === ScriptKind.Json;
}

/**
 * Returns true when the SourceFile contains JSX.
 */
export function hasJSX(fileName: string): boolean {
  const kind = getScriptKindFromFileName(fileName);
  return kind === ScriptKind.TSX || kind === ScriptKind.JSX;
}

/**
 * Returns the canonical name for a ScriptKind (debug helper).
 */
export function scriptKindName(kind: ScriptKind): string {
  switch (kind) {
    case ScriptKind.TS: return "TS";
    case ScriptKind.TSX: return "TSX";
    case ScriptKind.JS: return "JS";
    case ScriptKind.JSX: return "JSX";
    case ScriptKind.Json: return "Json";
    case ScriptKind.Deferred: return "Deferred";
    case ScriptKind.Unknown: return "Unknown";
    default: return "Unknown";
  }
}
