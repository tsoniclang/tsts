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

function newCompilerDiagnostic(message: DiagnosticMessage, args: readonly unknown[]): Diagnostic {
  return { file: undefined, start: 0, length: 0, messageText: stringify(message), category: 1, code: 0, args } as unknown as Diagnostic;
}
function newDiagnosticForNodeInSourceFile(sourceFile: unknown, node: unknown, message: DiagnosticMessage, args: readonly unknown[]): Diagnostic {
  const range = node as { pos?: number; end?: number } | undefined;
  return { file: sourceFile, start: range?.pos ?? 0, length: (range?.end ?? 0) - (range?.pos ?? 0), messageText: stringify(message), category: 1, code: 0, args } as unknown as Diagnostic;
}
function newDiagnosticForLineAndCharacter(sourceFile: unknown, start: { line: number; character: number }, length: number, message: DiagnosticMessage, args: readonly unknown[]): Diagnostic {
  return { file: sourceFile, start, length, messageText: stringify(message), category: 1, code: 0, args } as unknown as Diagnostic;
}
function stringify(message: DiagnosticMessage): string {
  return (message as unknown as { message?: string }).message ?? "diagnostic";
}
