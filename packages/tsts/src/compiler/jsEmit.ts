/**
 * Shared product JavaScript-emit path.
 *
 * This module owns the ONE proven JS emit loop for the compiler. Both
 * `Program.emit()` (compiler/program.ts) and `compileProject`
 * (compiler/compileProject.ts) route through {@link emitProgramJs}; there is
 * no second, duplicated emit loop.
 *
 * Real JavaScript is produced by composing three existing, tested pieces:
 *
 *   1. `getSourceFilesToEmit` (compiler/emitter.ts) selects the emittable
 *      source files (honoring the canonical exclusions: declaration files,
 *      external-library files, JSON, etc.).
 *   2. `getOutputJSFileNameWorker` (outputpaths) computes each output JS path
 *      from the compiler options, honoring `outDir` and the common source
 *      directory exactly like the canonical Emitter.
 *   3. `printSourceFile` (emit-js/printer.ts) renders the parser's
 *      array-shaped AST to real JavaScript with type annotations erased. This
 *      is the project's working JS printer, covered by
 *      `emit-js/printer.test.ts`.
 *
 * Writes are routed through `newProgramEmitHost(program).writeFile`, i.e. the
 * program host's real write surface (the same one the canonical Emitter uses),
 * unless the caller supplies `options.writeFile`.
 *
 * SCOPE (honest): only `.js` is real here. Declaration (`.d.ts`) and source-map
 * (`.js.map`) emit are NOT produced by this path; they are deferred. Do not
 * claim `.d.ts`/`.js.map` support based on this helper.
 *
 * Why not the canonical `Emitter` (compiler/emitter.ts) text path? Its
 * orchestration is reused above, but its *text* comes from
 * `printer/printer.ts` `printFile`, which reads `sourceFile.statements.nodes`
 * (a `NodeList` wrapper). The parser produces `statements` as a plain array
 * whose `.nodes` is `undefined`, so `printFile` would print empty bodies.
 * Reconciling that shape is deferred; the `emit-js` printer yields real JS
 * today without touching that shared, baseline-bearing code.
 */

import type { Diagnostic, SourceFile } from "../ast/index.js";
import { printSourceFile } from "../emit-js/index.js";
import { getOutputJSFileNameWorker } from "../outputpaths/index.js";
import { getSourceFilesToEmit } from "./emitter.js";
import { newProgramEmitHost } from "./emitHost.js";
import {
  handleNoEmitOnError,
  type EmitOptions,
  type EmitResult,
  type Program,
} from "./program.js";

/** The inert `Context` marker the compiler pipeline threads through emit.
 * Reuse the exact type `handleNoEmitOnError` expects without re-exporting the
 * private `Context` interface from program.ts. */
type EmitContext = Parameters<typeof handleNoEmitOnError>[0];

/**
 * Emit real JavaScript for a Program and return the JS paths written plus any
 * emit diagnostics. This is the single product JS emit path.
 *
 * Honors, in order:
 *   - `noEmitOnError`: if active with blocking errors, emit is skipped and the
 *     blocking diagnostics are returned (`emitSkipped: true`).
 *   - source-file selection via `getSourceFilesToEmit` (target file or whole
 *     program; declaration-only / forced-dts is not produced by this path).
 *   - `isEmitBlocked`: per-file output blocking (e.g. would overwrite input).
 *
 * Only `.js` is emitted. `.d.ts` / `.js.map` are deferred and intentionally
 * not produced here.
 */
export function emitProgramJs(
  program: Program,
  ctx: EmitContext,
  options: EmitOptions = {},
): EmitResult {
  const noEmitOnError = handleNoEmitOnError(ctx, program, options.targetSourceFile);
  if (noEmitOnError !== undefined) return noEmitOnError;

  const emitHost = newProgramEmitHost(program);
  const compilerOptions = program.options();
  const files: readonly SourceFile[] = getSourceFilesToEmit(emitHost, options.targetSourceFile, false);

  const emittedFiles: string[] = [];
  const diagnostics: Diagnostic[] = [];

  for (const file of files) {
    const jsFilePath = getOutputJSFileNameWorker(file.fileName, compilerOptions, emitHost);
    // An empty path means there is no JS output for this file. Skip silently.
    if (jsFilePath === "") continue;
    // A blocked output path (e.g. it would overwrite an input file) is recorded
    // by the program during option verification; never write over it.
    if (program.isEmitBlocked(jsFilePath)) continue;
    const printed = printSourceFile(file);
    // The printer omits the trailing newline; tsc-style output ends each
    // emitted file with one, matching the canonical Emitter's behavior.
    const text = printed === "" ? "\n" : `${printed}\n`;
    if (options.writeFile !== undefined) {
      options.writeFile(jsFilePath, text, { diagnostics: [] });
    } else {
      emitHost.writeFile(jsFilePath, text, false);
    }
    emittedFiles.push(jsFilePath);
  }

  return { emitSkipped: false, diagnostics, emittedFiles, sourceMaps: [] };
}
