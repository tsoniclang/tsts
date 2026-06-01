/**
 * Public language-service API.
 *
 * Porting anchor for TS-Go `internal/ls/api.go`.
 */

import { getTokenAtPositionPublic } from "../astnav/index.js";
import type { Node, SourceFile, Symbol as AstSymbol } from "../ast/index.js";
import type { Checker } from "../checker/index.js";
import type { Type } from "../checker/types.js";
import type { DocumentUri, Position } from "../lsp/lsproto/index.js";
import type { Host } from "./host.js";
import { LanguageService, type LanguageServiceProgram } from "./languageservice.js";

export const errNoSourceFile = new Error("source file not found");
export const errNoTokenAtPosition = new Error("no token found at position");

export interface LanguageServiceOptions {
  readonly host: Host;
}

export function newLanguageService(options: LanguageServiceOptions): LanguageService {
  return new LanguageService(options.host);
}

export interface FilePositionRequest {
  readonly uri: DocumentUri;
  readonly position: Position;
}

export interface FileRangeRequest extends FilePositionRequest {
  readonly end: Position;
}

export interface LanguageServiceApiProgram extends LanguageServiceProgram {
  getTypeCheckerForFile?(context: unknown, file: SourceFile): CheckerLease;
  getTypeChecker?(context: unknown): CheckerLease;
}

export type CheckerLease =
  | readonly [Checker, () => void]
  | { readonly checker: Checker; readonly release: () => void };

export function getSymbolAtPosition(
  languageService: LanguageService,
  fileName: string,
  position: number,
  context: unknown = undefined,
): AstSymbol | undefined {
  const [program, file] = languageService.tryGetProgramAndFile(fileName);
  if (program === undefined || file === undefined) {
    throw new Error(`${errNoSourceFile.message}: ${fileName}`);
  }

  const node = getTokenAtPositionPublic(file, position);
  if (node === undefined) {
    throw new Error(`${errNoTokenAtPosition.message}: ${fileName}:${String(position)}`);
  }

  const lease = getTypeCheckerForFile(program, context, file);
  try {
    return lease.checker.getSymbolAtLocation(node);
  } finally {
    lease.release();
  }
}

export function getSymbolAtLocation(
  languageService: LanguageService,
  node: Node,
  context: unknown = undefined,
): AstSymbol | undefined {
  const program = languageService.getProgram();
  if (program === undefined) {
    throw new Error(errNoSourceFile.message);
  }
  const lease = getTypeCheckerForFile(program, context, node.getSourceFile());
  try {
    return lease.checker.getSymbolAtLocation(node);
  } finally {
    lease.release();
  }
}

export function getTypeOfSymbol(
  languageService: LanguageService,
  symbol: AstSymbol,
  context: unknown = undefined,
): Type | undefined {
  const program = languageService.getProgram();
  if (program === undefined) {
    throw new Error(errNoSourceFile.message);
  }
  const lease = getTypeChecker(program, context);
  try {
    return lease.checker.getTypeOfSymbol(symbol);
  } finally {
    lease.release();
  }
}

function getTypeCheckerForFile(
  program: LanguageServiceProgram,
  context: unknown,
  file: SourceFile,
): { readonly checker: Checker; readonly release: () => void } {
  const apiProgram = program as LanguageServiceApiProgram;
  const lease = apiProgram.getTypeCheckerForFile?.(context, file);
  if (lease !== undefined) return normalizeCheckerLease(lease);
  return getTypeChecker(program, context);
}

function getTypeChecker(
  program: LanguageServiceProgram,
  context: unknown,
): { readonly checker: Checker; readonly release: () => void } {
  const apiProgram = program as LanguageServiceApiProgram;
  const lease = apiProgram.getTypeChecker?.(context);
  if (lease === undefined) {
    throw new Error("language service program does not provide a type checker");
  }
  return normalizeCheckerLease(lease);
}

function normalizeCheckerLease(lease: CheckerLease): { readonly checker: Checker; readonly release: () => void } {
  if (Array.isArray(lease)) return { checker: lease[0], release: lease[1] };
  return lease as { readonly checker: Checker; readonly release: () => void };
}
