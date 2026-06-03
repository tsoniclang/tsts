/**
 * Stable standalone-compiler API over the CANONICAL compiler pipeline.
 *
 * `compileProject` is the embeddable entry point for compiling a real
 * TypeScript project end-to-end: parse config / root names, build a
 * `Program` (compiler/program.ts), collect diagnostics, and emit real
 * JavaScript through `Program.emit()`. It mirrors the proven sequence in
 * `testutil/harnessutil/harnessutil.ts` (`compileFilesEx`), swapping the
 * in-memory harness host for the real-disk node host
 * (`nodeCompilerHost.ts`) and adding the config-file path.
 *
 * EMIT NOTE: emission goes through `Program.emit()` — the single product JS
 * emit path. `Program.emit()` delegates to the shared `emitProgramJs`
 * helper (compiler/jsEmit.ts), which composes the canonical source-file
 * selection + output pathing with the working `emit-js` printer and writes
 * through the program emit host. `noEmit` and `noEmitOnError` are enforced
 * inside that path, so `compileProject` no longer maintains its own emit
 * loop.
 *
 * HONEST SCOPE: only `.js` is real. Declaration (`.d.ts`) and source-map
 * (`.js.map`) emit are NOT produced by this path; when the caller requests
 * them, `compileProject` surfaces an honest unsupported-feature warning
 * rather than silently claiming success.
 */

import type { Diagnostic } from "../ast/index.js";
import type { CompilerOptions } from "../core/index.js";
import { Tristate } from "../core/tristate.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { ParsedCommandLine } from "../tsoptions/parsedCommandLine.js";
import { getParsedCommandLineOfConfigFile } from "../tsoptions/tsconfigParsing.js";
import { getNormalizedAbsolutePath, normalizePath } from "../tspath/index.js";
import { newProgram, type Program } from "./program.js";
import { newNodeCompilerHost, newNodeParseConfigHost } from "./nodeCompilerHost.js";

/**
 * Options for {@link compileProject}. Exactly one of `project` or
 * `rootNames` selects the file set: `project` parses a `tsconfig.json`;
 * `rootNames` compiles an explicit list of root files. The remaining
 * fields override the corresponding compiler options.
 */
export interface CompileOptions {
  readonly project?: string;
  readonly rootNames?: readonly string[];
  readonly outDir?: string;
  readonly declaration?: boolean;
  readonly sourceMap?: boolean;
  readonly noEmit?: boolean;
}

/**
 * Result of {@link compileProject}. `exitCode` is `1` iff any error-level
 * diagnostic is present, else `0`. `diagnostics` is deterministically
 * sorted. `emittedFiles` lists the files actually written by the emitter
 * (empty when `noEmit`, when `noEmitOnError` suppressed emission, or when
 * blocking errors were present).
 */
export interface CompileResult {
  readonly exitCode: 0 | 1;
  readonly diagnostics: readonly Diagnostic[];
  readonly emittedFiles: readonly string[];
}

/** A no-op context value; the canonical pipeline's `Context` is an inert
 * marker interface (compiler/program.ts ~1420). Obtain it exactly the way
 * `harnessutil` does, without importing the un-exported type. */
type EmitContext = Parameters<Program["emit"]>[0];

function boolOverride(value: boolean | undefined): Tristate | undefined {
  return value === undefined ? undefined : (value ? Tristate.True : Tristate.False);
}

/** Apply the CompileOptions overrides onto a base compiler-options object,
 * producing a NEW object (no mutation). Only provided overrides are
 * applied; everything else is inherited verbatim. */
function applyOverrides(base: CompilerOptions, options: CompileOptions): CompilerOptions {
  const outDir = options.outDir !== undefined ? { outDir: options.outDir } : {};
  const declaration = boolOverride(options.declaration);
  const sourceMap = boolOverride(options.sourceMap);
  const noEmit = boolOverride(options.noEmit);
  return {
    ...base,
    ...outDir,
    ...(declaration !== undefined ? { declaration } : {}),
    ...(sourceMap !== undefined ? { sourceMap } : {}),
    ...(noEmit !== undefined ? { noEmit } : {}),
  };
}

function isError(diagnostic: Diagnostic): boolean {
  return diagnostic.category === DiagnosticCategory.Error;
}

/** Deterministic diagnostic ordering, mirroring the canonical
 * `compareDiagnostics` in compiler/program.ts so CLI output is stable. */
function compareDiagnostics(left: Diagnostic, right: Diagnostic): number {
  return (left.file?.fileName ?? "").localeCompare(right.file?.fileName ?? "")
    || (left.start ?? -1) - (right.start ?? -1)
    || left.code - right.code
    || left.text.localeCompare(right.text);
}

function emitDeclarations(options: CompilerOptions): boolean {
  return options.declaration === Tristate.True || options.composite === Tristate.True;
}

function wantsSourceMap(options: CompilerOptions): boolean {
  return options.sourceMap === Tristate.True || options.inlineSourceMap === Tristate.True;
}

/**
 * Build a `Warning`-level diagnostic announcing that an emit feature the
 * caller asked for is not produced by the standalone JS-emit path. These are
 * file-less warnings (no source position), surfaced honestly instead of
 * silently dropping the request.
 *
 * The JS-emit path (`emit-js/printer.ts`) renders JavaScript only; `.d.ts`
 * declaration and `.js.map` source-map emission are not implemented in this
 * path and are deferred to the same Option-A bucket as the broken
 * `Program.emit()` / the `NodeList`-expecting `printer/printer.ts`.
 */
function unsupportedEmitWarning(code: number, feature: string): Diagnostic {
  const message = `${feature} emit is not yet supported by the standalone compiler; only JavaScript output is produced.`;
  return {
    message: { key: "TSTS_Unsupported_emit_feature", code, category: DiagnosticCategory.Warning, message },
    category: DiagnosticCategory.Warning,
    code,
    text: message,
  };
}

/** Honest unsupported-feature warnings for emit options the JS-only path
 * cannot honor. Only relevant when emit actually runs (the caller passes
 * `false` for `noEmit`/suppressed runs so we stay silent then). */
function unsupportedEmitWarnings(options: CompilerOptions): readonly Diagnostic[] {
  const declaration = emitDeclarations(options) ? [unsupportedEmitWarning(5101, "Declaration (.d.ts)")] : [];
  const sourceMap = wantsSourceMap(options) ? [unsupportedEmitWarning(5102, "Source map")] : [];
  return [...declaration, ...sourceMap];
}

/**
 * Compile a TypeScript project end-to-end and return diagnostics plus the
 * set of emitted files. Does not throw for ordinary compile failures: a
 * project with errors yields `exitCode: 1` and the diagnostics describing
 * them.
 */
export function compileProject(options: CompileOptions): CompileResult {
  const host = newNodeCompilerHost();

  // 1. Resolve the ParsedCommandLine (config-file path OR explicit rootNames).
  const parsedBase = resolveParsedCommandLine(options, host.getCurrentDirectory());

  // 2. Apply outDir/declaration/sourceMap/noEmit overrides onto a fresh
  //    compiler-options object and rebuild the ParsedCommandLine immutably.
  const mergedOptions = applyOverrides(
    parsedBase.parsedConfig.compilerOptions as unknown as CompilerOptions,
    options,
  );
  const config = new ParsedCommandLine(
    mergedOptions as unknown as ParsedCommandLine["parsedConfig"]["compilerOptions"],
    parsedBase.parsedConfig.fileNames,
    {
      currentDirectory: host.getCurrentDirectory(),
      useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
    },
  );
  config.errors = parsedBase.errors;

  // 3. Build the Program over the canonical pipeline.
  const program = newProgram({ config, host });
  const programOptions = program.options();

  // 4. Collect diagnostics in the harnessutil order (config + syntactic +
  //    semantic + global + declaration). `ctx` is the inert marker value.
  const ctx = {} as EmitContext;
  const collected: Diagnostic[] = [
    ...program.getConfigFileParsingDiagnostics(),
    ...program.getSyntacticDiagnostics(ctx, undefined),
    ...program.getSemanticDiagnostics(ctx, undefined),
    ...program.getGlobalDiagnostics(ctx),
  ];
  if (emitDeclarations(programOptions)) {
    collected.push(...program.getDeclarationDiagnostics(ctx, undefined));
  }

  const hasErrors = collected.some(isError);

  // 5. Emit real JS through the single product emit path, `Program.emit()`.
  //    The program enforces `noEmit` and `noEmitOnError` (the latter via the
  //    shared `handleNoEmitOnError`); we therefore do not re-check them here.
  const emitResult = program.emit(ctx);
  const emittedFiles: readonly string[] = emitResult.emittedFiles;
  const willEmit = emittedFiles.length > 0;

  // When emit actually runs, honestly warn about requested-but-unsupported
  // emit features (.d.ts / .js.map) rather than silently dropping them.
  const emitWarnings = willEmit ? unsupportedEmitWarnings(programOptions) : [];

  const diagnostics = [...collected, ...emitWarnings].sort(compareDiagnostics);
  return {
    exitCode: hasErrors ? 1 : 0,
    diagnostics,
    emittedFiles,
  };
}

/** Resolve the file set + base compiler options into a ParsedCommandLine.
 * `project` parses the tsconfig via the canonical parser; otherwise build
 * one directly from the explicit `rootNames`. */
function resolveParsedCommandLine(options: CompileOptions, currentDirectory: string): ParsedCommandLine {
  if (options.project !== undefined) {
    // The canonical config parser resolves `include`/`exclude` globs
    // relative to the config file's own directory, which only works when
    // the config path it is handed is already absolute. A relative
    // `--project fixtures/x/tsconfig.json` would otherwise yield an empty
    // file set, so resolve it against the current directory first.
    const configFileName = getNormalizedAbsolutePath(options.project, currentDirectory);
    const parseConfigHost = newNodeParseConfigHost();
    const parsed = getParsedCommandLineOfConfigFile(
      configFileName,
      undefined,
      parseConfigHost,
      undefined,
    );
    if (parsed !== undefined) return parsed;
    // The config file could not be read; surface that as a hard config
    // error on an otherwise-empty command line so the caller still gets a
    // well-formed (failing) result rather than a thrown exception.
    const empty = new ParsedCommandLine(
      {} as ParsedCommandLine["parsedConfig"]["compilerOptions"],
      [],
      { currentDirectory, useCaseSensitiveFileNames: true },
    );
    empty.errors = [configFileReadError(configFileName)];
    return empty;
  }

  // Explicit root files are likewise resolved to absolute paths so the
  // program loads them regardless of the caller's working directory.
  const rootNames = (options.rootNames ?? []).map(
    (name) => getNormalizedAbsolutePath(normalizePath(name), currentDirectory),
  );
  return new ParsedCommandLine(
    {} as ParsedCommandLine["parsedConfig"]["compilerOptions"],
    rootNames,
    { currentDirectory, useCaseSensitiveFileNames: true },
  );
}

function configFileReadError(configFileName: string): Diagnostic {
  const text = `Cannot read file '${configFileName}'.`;
  return {
    message: { key: "Cannot_read_file_0", code: 5083, category: DiagnosticCategory.Error, message: text },
    category: DiagnosticCategory.Error,
    code: 5083,
    text,
  };
}
