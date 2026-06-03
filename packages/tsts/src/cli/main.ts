/**
 * `tsc`-like CLI entry for the standalone TSTS compiler.
 *
 * This is a thin, deterministic shell over the canonical standalone API
 * `compileProject` (compiler/compileProject.ts). It deliberately does NOT
 * reuse the heavier `execute/tsc.ts` harness (which is wired for the
 * conformance/system-host machinery); per the standalone-PR scope a small
 * focused parser keeps the product CLI honest and dependency-light.
 *
 * Supported flags (a minimal, faithful subset of `tsc`):
 *
 *   --project / -p <tsconfig>   compile the project described by a tsconfig
 *   --outDir <dir>              override compilerOptions.outDir
 *   --declaration               override compilerOptions.declaration
 *   --sourceMap                 override compilerOptions.sourceMap
 *   --noEmit                    typecheck only; write nothing
 *   --help / -h                 print usage
 *
 * Bare positional file arguments (no `--project`) are treated as explicit
 * root files (the `rootNames` path of `compileProject`).
 *
 * Behavior contract (matches the standalone-compiler spec):
 *   - exit 0 when the compile succeeds (no error-level diagnostics);
 *   - exit 1 when any error-level diagnostic is present;
 *   - diagnostics are printed DETERMINISTICALLY — sorted and deduplicated
 *     via the canonical `sortAndDeduplicateDiagnostics`;
 *   - output files are written under `outDir`;
 *   - `--noEmit` suppresses all writes.
 *
 * No Tsonic-specific behavior lives here: this is a plain TypeScript
 * compiler CLI.
 */

import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import type { Diagnostic } from "../diagnostics/types.js";
import { compileProject, type CompileOptions, type CompileResult } from "../compiler/compileProject.js";
import { sortAndDeduplicateDiagnostics } from "../compiler/program.js";

const CATEGORY_NAMES: Record<number, string> = {
  [DiagnosticCategory.Warning]: "warning",
  [DiagnosticCategory.Error]: "error",
  [DiagnosticCategory.Suggestion]: "suggestion",
  [DiagnosticCategory.Message]: "message",
};

const USAGE = [
  "Usage: tsts [options] [files...]",
  "",
  "Options:",
  "  -p, --project <tsconfig>  Compile the project described by a tsconfig.json.",
  "      --outDir <dir>        Redirect emitted output to the given directory.",
  "      --declaration         Emit .d.ts declaration files where supported.",
  "      --sourceMap           Emit source maps where supported.",
  "      --noEmit              Type-check only; do not write any output files.",
  "  -h, --help                Print this help message.",
].join("\n");

/** Result of {@link parseCliArguments}: either parsed options, a request to
 * print usage, or a hard parse error message. Modeled as a discriminated
 * union so {@link main} can branch without throwing. */
type ParsedArguments =
  | { readonly kind: "options"; readonly options: CompileOptions }
  | { readonly kind: "help" }
  | { readonly kind: "error"; readonly message: string };

/** Parse a `tsc`-style argument vector into {@link CompileOptions}. Unknown
 * flags are a hard error (no silent passthrough), keeping CLI behavior
 * predictable. Pure: no I/O, no process access. */
export function parseCliArguments(argv: readonly string[]): ParsedArguments {
  const seed: {
    project: string | undefined;
    outDir: string | undefined;
    declaration: boolean | undefined;
    sourceMap: boolean | undefined;
    noEmit: boolean | undefined;
    files: readonly string[];
    help: boolean;
    error: string | undefined;
  } = {
    project: undefined,
    outDir: undefined,
    declaration: undefined,
    sourceMap: undefined,
    noEmit: undefined,
    files: [],
    help: false,
    error: undefined,
  };

  const final = reduceArgs(argv, 0, seed);
  if (final.error !== undefined) return { kind: "error", message: final.error };
  if (final.help) return { kind: "help" };
  if (final.project !== undefined && final.files.length > 0) {
    return { kind: "error", message: "Option 'project' cannot be mixed with source files on a command line." };
  }
  if (final.project === undefined && final.files.length === 0) {
    return { kind: "error", message: "No inputs. Pass --project <tsconfig> or one or more source files." };
  }

  const options: CompileOptions = {
    ...(final.project !== undefined ? { project: final.project } : {}),
    ...(final.files.length > 0 ? { rootNames: final.files } : {}),
    ...(final.outDir !== undefined ? { outDir: final.outDir } : {}),
    ...(final.declaration !== undefined ? { declaration: final.declaration } : {}),
    ...(final.sourceMap !== undefined ? { sourceMap: final.sourceMap } : {}),
    ...(final.noEmit !== undefined ? { noEmit: final.noEmit } : {}),
  };
  return { kind: "options", options };
}

interface ArgState {
  readonly project: string | undefined;
  readonly outDir: string | undefined;
  readonly declaration: boolean | undefined;
  readonly sourceMap: boolean | undefined;
  readonly noEmit: boolean | undefined;
  readonly files: readonly string[];
  readonly help: boolean;
  readonly error: string | undefined;
}

/** Fold the argument vector into an {@link ArgState} immutably (no mutable
 * loop variables, no in-place updates). Each value-taking flag consumes the
 * following token; missing values are a hard error. */
function reduceArgs(argv: readonly string[], index: number, state: ArgState): ArgState {
  if (state.error !== undefined || index >= argv.length) return state;
  const arg = argv[index]!;

  if (arg === "--help" || arg === "-h" || arg === "-?") {
    return reduceArgs(argv, index + 1, { ...state, help: true });
  }
  if (arg === "--noEmit") {
    return reduceArgs(argv, index + 1, { ...state, noEmit: true });
  }
  if (arg === "--declaration") {
    return reduceArgs(argv, index + 1, { ...state, declaration: true });
  }
  if (arg === "--sourceMap") {
    return reduceArgs(argv, index + 1, { ...state, sourceMap: true });
  }
  if (arg === "--project" || arg === "-p") {
    const value = argv[index + 1];
    if (value === undefined) return { ...state, error: `Missing value for ${arg}.` };
    return reduceArgs(argv, index + 2, { ...state, project: value });
  }
  if (arg === "--outDir") {
    const value = argv[index + 1];
    if (value === undefined) return { ...state, error: `Missing value for ${arg}.` };
    return reduceArgs(argv, index + 2, { ...state, outDir: value });
  }
  if (arg.startsWith("-")) {
    return { ...state, error: `Unknown option '${arg}'.` };
  }
  return reduceArgs(argv, index + 1, { ...state, files: [...state.files, arg] });
}

function categoryName(category: number): string {
  return CATEGORY_NAMES[category] ?? "message";
}

/** Convert a 0-based character offset into 1-based (line, column) using the
 * file's own text. Mirrors the canonical line-start scan; kept local so the
 * CLI depends only on the plain `Diagnostic` shape returned by
 * `compileProject` (a `{ fileName, text }` slim file, not a full AST). */
function lineAndColumn(text: string, position: number): { readonly line: number; readonly column: number } {
  const clamped = Math.max(0, Math.min(position, text.length));
  const before = text.slice(0, clamped);
  const lastNewline = before.lastIndexOf("\n");
  const line = before.length === 0 ? 0 : countNewlines(before);
  const column = clamped - (lastNewline + 1);
  return { line: line + 1, column: column + 1 };
}

function countNewlines(text: string): number {
  return text.split("\n").length - 1;
}

/** Format a single diagnostic in canonical `tsc` one-line form:
 *
 *   file.ts(line,col): error TSxxxx: message
 *
 * or, when there is no file/position, just `error TSxxxx: message`. */
export function formatDiagnostic(diagnostic: Diagnostic): string {
  const code = `TS${diagnostic.code}`;
  const category = categoryName(diagnostic.category);
  const file = diagnostic.file;
  if (file === undefined || diagnostic.start === undefined) {
    return `${category} ${code}: ${diagnostic.text}`;
  }
  const { line, column } = lineAndColumn(file.text, diagnostic.start);
  return `${file.fileName}(${line},${column}): ${category} ${code}: ${diagnostic.text}`;
}

/** The output surface the CLI writes to. Abstracted so `runCli` is testable
 * without touching the global `process` object. */
export interface CliIo {
  readonly out: (text: string) => void;
  readonly err: (text: string) => void;
}

/** Drive a single compile run end-to-end against an injected I/O surface and
 * return the process exit code. Pure with respect to `process` — all output
 * goes through `io`. Diagnostics are sorted+deduplicated deterministically
 * before printing. */
export function runCli(argv: readonly string[], io: CliIo): 0 | 1 {
  const parsed = parseCliArguments(argv);
  if (parsed.kind === "help") {
    io.out(`${USAGE}\n`);
    return 0;
  }
  if (parsed.kind === "error") {
    io.err(`error: ${parsed.message}\n`);
    io.err(`${USAGE}\n`);
    return 1;
  }

  const result: CompileResult = compileProject(parsed.options);
  const ordered = sortAndDeduplicateDiagnostics(result.diagnostics);
  for (const diagnostic of ordered) {
    const line = `${formatDiagnostic(diagnostic)}\n`;
    if (diagnostic.category === DiagnosticCategory.Error) io.err(line);
    else io.out(line);
  }
  return result.exitCode;
}

/** Process entry point. Wires {@link runCli} to the real `process` streams
 * and exit code. Kept separate from `runCli` so tests never set a global
 * exit code. */
export function main(argv: readonly string[]): void {
  const io: CliIo = {
    out: (text) => { process.stdout.write(text); },
    err: (text) => { process.stderr.write(text); },
  };
  process.exitCode = runCli(argv, io);
}
