/**
 * Stable standalone-compiler API over the CANONICAL compiler pipeline.
 *
 * `compileProject` is the embeddable entry point for compiling a real
 * TypeScript project end-to-end: parse config / root names, build a
 * `Program` (compiler/program.ts), collect diagnostics, and emit real
 * JavaScript via the `Emitter` (compiler/emitter.ts). It mirrors the
 * proven sequence in `testutil/harnessutil/harnessutil.ts`
 * (`compileFilesEx`), swapping the in-memory harness host for the
 * real-disk node host (`nodeCompilerHost.ts`) and adding the config-file
 * path.
 *
 * EMIT NOTE: emission does NOT go through `Program.emit()`.
 * `Program.emit()` (compiler/program.ts ~964) is currently broken — it
 * writes the SOURCE text rather than compiled JS. Centrally fixing it
 * would shift the conformance/regression baselines, so that fix is
 * deferred to the later Option-A gap work and is intentionally not touched
 * here.
 *
 * Real JavaScript is produced by composing three existing, tested pieces
 * (no shared printer/emitter surgery, which would move baselines):
 *
 *   1. `getSourceFilesToEmit` (compiler/emitter.ts) selects the emittable
 *      source files (honoring the same exclusions as the canonical
 *      `Emitter`: declaration files, external-library files, JSON, etc.).
 *   2. `getOutputJSFileNameWorker` (outputpaths) computes each output JS
 *      path from the (override-merged) compiler options, honoring `outDir`
 *      and the common source directory exactly like the canonical Emitter.
 *   3. `printSourceFile` (emit-js/printer.ts) renders the parser's
 *      array-shaped AST to real JavaScript with type annotations erased.
 *      This is the project's working JS printer and is covered by
 *      `emit-js/printer.test.ts`.
 *
 * Writes are routed through `newProgramEmitHost(program).writeFile`, which
 * forwards to `program.host().writeFile`, i.e. the node host's real-disk
 * write — the same write surface the canonical Emitter uses. `noEmit` /
 * `noEmitOnError` are enforced by the caller (`compileProject`) before this
 * loop runs.
 *
 * Why not the canonical `Emitter` (compiler/emitter.ts)? Its orchestration
 * (file selection, path computation, host write) is correct and reused
 * above, but its *text* comes from `printer/printer.ts` `printFile`, which
 * reads `sourceFile.statements.nodes` (a `NodeList` wrapper). The canonical
 * parser produces `statements` as a plain array whose `.nodes` is
 * `undefined`, so `printFile` would print an empty body. That printer is
 * the TS-Go-faithful declaration/baseline printer and is shared with the
 * conformance harness; reconciling its `NodeList` expectation with the
 * parser's array shape is deferred to the same Option-A bucket as the
 * broken `Program.emit`. Using the `emit-js` printer here yields real JS
 * today without touching that shared, baseline-bearing code.
 */

import type { Diagnostic } from "../ast/index.js";
import type { CompilerOptions } from "../core/index.js";
import { Tristate } from "../core/tristate.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { ParsedCommandLine } from "../tsoptions/parsedCommandLine.js";
import { getParsedCommandLineOfConfigFile } from "../tsoptions/tsconfigParsing.js";
import { getNormalizedAbsolutePath, normalizePath } from "../tspath/index.js";
import { printSourceFile } from "../emit-js/index.js";
import { getOutputJSFileNameWorker } from "../outputpaths/index.js";
import { getSourceFilesToEmit } from "./emitter.js";
import { newProgramEmitHost } from "./emitHost.js";
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

  // 5. Emit real JS unless noEmit is set, or noEmitOnError is active with
  //    blocking errors. NOT Program.emit (broken — see file header).
  const noEmit = programOptions.noEmit === Tristate.True;
  const noEmitOnError = programOptions.noEmitOnError === Tristate.True;
  const emitSuppressedByErrors = noEmitOnError && hasErrors;
  const willEmit = !noEmit && !emitSuppressedByErrors;
  const emittedFiles: string[] = willEmit ? [...emitReal(program)] : [];

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

/**
 * Emit real JavaScript for every emittable source file and return the JS
 * paths actually written. Composes the canonical file-selection +
 * output-path machinery with the working `emit-js` printer (see the file
 * header for why this does NOT use `Program.emit` or the canonical
 * `Emitter`'s text path). The caller has already enforced `noEmit` /
 * `noEmitOnError`, so this unconditionally emits the selected files.
 */
function emitReal(program: Program): readonly string[] {
  const emitHost = newProgramEmitHost(program);
  const options = program.options();
  const files = getSourceFilesToEmit(emitHost, undefined, false);
  return files.flatMap((file) => {
    const jsFilePath = getOutputJSFileNameWorker(file.fileName, options, emitHost);
    // An empty path means there is no JS output for this file (e.g.
    // declaration-only emit). Skip it without recording a write.
    if (jsFilePath === "") return [];
    const text = printSourceFile(file);
    // The printer omits the trailing newline; tsc-style output ends each
    // emitted file with one, matching the canonical Emitter's behavior.
    emitHost.writeFile(jsFilePath, text === "" ? "\n" : `${text}\n`, false);
    return [jsFilePath];
  });
}
