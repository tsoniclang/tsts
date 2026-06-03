/**
 * tsoptions error helpers.
 *
 * Port of TS-Go `internal/tsoptions/errors.go`. Small wrappers around
 * `Diagnostic` constructors for option parsing.
 */

import type { Diagnostic } from "../ast/index.js";
import type { DiagnosticMessage as Message, SourceFileSlim } from "../diagnostics/types.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import { filter } from "../core/core.js";
import type { CommandLineOption } from "./commandLineOption.js";

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

/**
 * Port of TS-Go `errors.go#CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic`.
 * Anchors the diagnostic to a node in its source file when both are present;
 * otherwise falls back to a free-standing compiler diagnostic.
 */
export function createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(
  sourceFile: SourceFileSlim | undefined,
  node: { readonly pos?: number; readonly end?: number } | undefined,
  message: Message,
  ...args: unknown[]
): Diagnostic {
  if (sourceFile !== undefined && node !== undefined) {
    const pos = node.pos ?? 0;
    const end = node.end ?? pos;
    const text = formatMessage(message.message, args);
    return {
      message,
      file: sourceFile,
      start: pos,
      length: Math.max(0, end - pos),
      category: message.category,
      code: message.code,
      text,
    };
  }
  return newCompilerDiagnosticMessage(message, args);
}

function newCompilerDiagnosticMessage(message: Message, args: readonly unknown[]): Diagnostic {
  const text = formatMessage(message.message, args);
  return {
    message,
    start: 0,
    length: 0,
    category: message.category,
    code: message.code,
    text,
  };
}

function formatMessage(template: string, args: readonly unknown[]): string {
  return template.replace(/\{(\d+)\}/g, (_match, idx) => {
    const i = Number(idx) | 0;
    return i < args.length ? String(args[i]) : `{${idx}}`;
  });
}

/**
 * Port of TS-Go `errors.go#formatEnumTypeKeys`. Joins the enum option's
 * keys (excluding deprecated keys, when present) into a quoted list.
 */
export function formatEnumTypeKeys(opt: CommandLineOption, keys: readonly string[]): string {
  const deprecated = opt.deprecatedKeys?.();
  const effectiveKeys = deprecated !== undefined
    ? filter(keys, (key) => !deprecated.has(key))
    : keys;
  return "'" + effectiveKeys.join("', '") + "'";
}

/**
 * Port of TS-Go `errors.go#getCompilerOptionValueTypeString`. Renders a
 * human-readable type name for a compiler-option declaration.
 */
export function getCompilerOptionValueTypeString(option: CommandLineOption): string {
  const kind = option.type;
  if (kind === "listOrElement") {
    const element = option.element ?? option.elements?.();
    return `${element === undefined ? "" : getCompilerOptionValueTypeString(element)} or Array`;
  }
  if (kind === "list") {
    return "Array";
  }
  if (typeof kind !== "string") {
    // Enum-kind options carry their value table as a Map; upstream stores the
    // discriminator as the string "enum".
    return "enum";
  }
  return kind;
}

/**
 * Port of TS-Go `errors.go#extraKeyDiagnostics`. Maps a tsconfig section
 * name to the "Unknown ... option '{0}'" diagnostic message.
 */
export function extraKeyDiagnostics(s: string): Message | undefined {
  switch (s) {
    case "compilerOptions":
      return Diagnostics.Unknown_compiler_option_0;
    case "watchOptions":
      return Diagnostics.Unknown_watch_option_0;
    case "typeAcquisition":
      return Diagnostics.Unknown_type_acquisition_option_0;
    case "buildOptions":
      return Diagnostics.Unknown_build_option_0;
    default:
      return undefined;
  }
}

/**
 * Port of TS-Go `errors.go#extraKeyDidYouMeanDiagnostics`. Maps a tsconfig
 * section name to the "Unknown ... option '{0}'. Did you mean '{1}'?"
 * diagnostic message.
 */
export function extraKeyDidYouMeanDiagnostics(s: string): Message | undefined {
  switch (s) {
    case "compilerOptions":
      return Diagnostics.Unknown_compiler_option_0_Did_you_mean_1;
    case "watchOptions":
      return Diagnostics.Unknown_watch_option_0_Did_you_mean_1;
    case "typeAcquisition":
      return Diagnostics.Unknown_type_acquisition_option_0_Did_you_mean_1;
    case "buildOptions":
      return Diagnostics.Unknown_build_option_0_Did_you_mean_1;
    default:
      return undefined;
  }
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
