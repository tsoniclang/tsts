/**
 * tsoptions error helpers.
 *
 * Port of TS-Go `internal/tsoptions/errors.go`. Small wrappers around
 * `Diagnostic` constructors for option parsing.
 */

import type { Diagnostic } from "../ast/index.js";

export interface DiagnosticMessage { readonly _msg: unknown }

export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: unknown[]): Diagnostic {
  return newCompilerDiagnostic(message, args);
}

export function createDiagnosticForNodeInSourceFile(
  sourceFile: unknown,
  node: unknown,
  message: DiagnosticMessage,
  ...args: unknown[]
): Diagnostic {
  return newDiagnosticForNodeInSourceFile(sourceFile, node, message, args);
}

export function createDiagnosticForLineAndCharacter(
  sourceFile: unknown,
  start: { line: number; character: number },
  length: number,
  message: DiagnosticMessage,
  ...args: unknown[]
): Diagnostic {
  return newDiagnosticForLineAndCharacter(sourceFile, start, length, message, args);
}

declare function newCompilerDiagnostic(message: DiagnosticMessage, args: readonly unknown[]): Diagnostic;
declare function newDiagnosticForNodeInSourceFile(sourceFile: unknown, node: unknown, message: DiagnosticMessage, args: readonly unknown[]): Diagnostic;
declare function newDiagnosticForLineAndCharacter(sourceFile: unknown, start: { line: number; character: number }, length: number, message: DiagnosticMessage, args: readonly unknown[]): Diagnostic;
