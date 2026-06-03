/**
 * Direct `Program.emit()` tests (node:test).
 *
 * These prove that the SINGLE product JS emit path — `Program.emit()`
 * delegating to the shared `emitProgramJs` helper (compiler/jsEmit.ts) —
 * produces REAL JavaScript with type annotations erased, NOT TypeScript source
 * text. They exercise `Program.emit()` directly (not via `compileProject`), per
 * the Option-A requirement that the fix be verified at the program surface.
 *
 * Coverage:
 *   - type-annotation erasure for the canonical `export function add` example,
 *     asserted through the program host's `writeFile`,
 *   - the `options.writeFile` override path,
 *   - `noEmit` (emit skipped, nothing written),
 *   - `noEmitOnError` with a type error (emit suppressed),
 *   - multiple root source files (each emitted once).
 *
 * The real Program transitively imports `const enum`-bearing compiler modules
 * that Node's native TS-stripping loader cannot run, so this file MUST be
 * compiled with tsc and run as emitted JS:
 *
 *   node ../tsonic/node_modules/typescript/bin/tsc -p packages/tsts/tsconfig.json \
 *     --outDir .temp/tsc-dist --pretty false \
 *   && node --test .temp/tsc-dist/src/compiler/programEmit.test.js
 */

import test from "node:test";
import assert from "node:assert/strict";

import { newProgram, type CompilerHost, type Program } from "./program.js";
import { ParsedCommandLine } from "../tsoptions/parsedCommandLine.js";
import type { CompilerOptions } from "../core/compilerOptions.js";
import type { CompilerOptionsHandle } from "../tsoptions/parsedCommandLine.js";
import { Tristate } from "../core/tristate.js";

const CURRENT_DIRECTORY = "/proj";

/** A bare context object — the compiler's `Context` is an opaque marker. */
const ctx = {} as Parameters<Program["emit"]>[0];

interface WrittenFile {
  readonly fileName: string;
  readonly data: string;
}

/** Normalize a directory query to a trailing-slash prefix for path matching. */
function asDirectoryPrefix(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

/** In-memory host whose `writeFile` records every write so emit output can be
 * asserted without touching disk. Mirrors the self-contained host in
 * `extensions/programWiring.test.ts` so the file loader's type-directive
 * discovery (which probes directories) is satisfied. */
function inMemoryHost(
  files: ReadonlyMap<string, string>,
  written: WrittenFile[],
): CompilerHost {
  const paths = [...files.keys()];
  return {
    fileExists: (path: string): boolean => files.has(path),
    readFile: (path: string): string | undefined => files.get(path),
    writeFile: (path: string, data: string): void => {
      written.push({ fileName: path, data });
    },
    getCurrentDirectory: (): string => CURRENT_DIRECTORY,
    useCaseSensitiveFileNames: (): boolean => true,
    directoryExists: (path: string): boolean => {
      const prefix = asDirectoryPrefix(path);
      return paths.some((filePath) => filePath.startsWith(prefix));
    },
    getAccessibleEntries: (path: string): { files: readonly string[]; directories: readonly string[] } => {
      const prefix = asDirectoryPrefix(path);
      const childFiles = new Set<string>();
      const childDirectories = new Set<string>();
      for (const filePath of paths) {
        if (!filePath.startsWith(prefix)) continue;
        const rest = filePath.slice(prefix.length);
        const slash = rest.indexOf("/");
        if (slash === -1) childFiles.add(rest);
        else childDirectories.add(rest.slice(0, slash));
      }
      return { files: [...childFiles], directories: [...childDirectories] };
    },
  };
}

function buildProgram(
  files: ReadonlyMap<string, string>,
  written: WrittenFile[],
  optionOverrides: Partial<Record<string, unknown>> = {},
): Program {
  const host = inMemoryHost(files, written);
  // noLib keeps the program self-contained; the inputs reference no globals.
  const options = { noLib: true, ...optionOverrides } as unknown as CompilerOptions;
  const config = new ParsedCommandLine(
    options as unknown as CompilerOptionsHandle,
    [...files.keys()],
    { currentDirectory: CURRENT_DIRECTORY, useCaseSensitiveFileNames: true },
  );
  return newProgram({ config, host });
}

test("Program.emit emits real JavaScript with type annotations erased", () => {
  const files = new Map<string, string>([
    ["/proj/add.ts", "export function add(left: number, right: number): number { return left + right; }"],
  ]);
  const written: WrittenFile[] = [];
  const program = buildProgram(files, written);

  const result = program.emit(ctx);

  assert.equal(result.emitSkipped, false);
  assert.equal(result.emittedFiles.length, 1);
  assert.match(result.emittedFiles[0]!, /add\.js$/);

  // Exactly one file written, and it is the erased JavaScript — not source text.
  assert.equal(written.length, 1);
  const emitted = written[0]!.data;
  assert.match(emitted, /export function add\(left, right\) \{/);
  assert.match(emitted, /return left \+ right;/);
  assert.doesNotMatch(emitted, /:\s*number/, "type annotations must be erased");
});

test("Program.emit routes writes through options.writeFile when provided", () => {
  const files = new Map<string, string>([
    ["/proj/add.ts", "export function add(left: number, right: number): number { return left + right; }"],
  ]);
  const hostWritten: WrittenFile[] = [];
  const program = buildProgram(files, hostWritten);

  const overrideWritten: WrittenFile[] = [];
  const result = program.emit(ctx, {
    writeFile: (fileName: string, text: string): void => {
      overrideWritten.push({ fileName, data: text });
    },
  });

  assert.equal(result.emitSkipped, false);
  assert.equal(result.emittedFiles.length, 1);
  // The override captured the write; the host writeFile was NOT used.
  assert.equal(overrideWritten.length, 1);
  assert.equal(hostWritten.length, 0);
  assert.match(overrideWritten[0]!.data, /export function add\(left, right\) \{/);
});

test("Program.emit honors noEmit: skipped, nothing written", () => {
  const files = new Map<string, string>([
    ["/proj/add.ts", "export function add(left: number, right: number): number { return left + right; }"],
  ]);
  const written: WrittenFile[] = [];
  const program = buildProgram(files, written, { noEmit: Tristate.True });

  const result = program.emit(ctx);

  assert.equal(result.emitSkipped, true);
  assert.deepEqual([...result.emittedFiles], []);
  assert.equal(written.length, 0);
});

test("Program.emit honors noEmitOnError: a type error suppresses emit", () => {
  const files = new Map<string, string>([
    // A string assigned to a number is a hard assignability error.
    ["/proj/bad.ts", "export const value: number = \"not a number\";"],
  ]);
  const written: WrittenFile[] = [];
  const program = buildProgram(files, written, { noEmitOnError: Tristate.True });

  const result = program.emit(ctx);

  assert.equal(result.emitSkipped, true);
  assert.deepEqual([...result.emittedFiles], []);
  assert.equal(written.length, 0);
  assert.ok(result.diagnostics.length >= 1, "blocking diagnostics are returned");
});

test("Program.emit emits each of multiple root source files once", () => {
  const files = new Map<string, string>([
    ["/proj/a.ts", "export const a: number = 1;"],
    ["/proj/b.ts", "export const b: number = 2;"],
  ]);
  const written: WrittenFile[] = [];
  const program = buildProgram(files, written);

  const result = program.emit(ctx);

  assert.equal(result.emitSkipped, false);
  assert.equal(result.emittedFiles.length, 2);
  assert.equal(written.length, 2);
  const names = written.map((w) => w.fileName).sort();
  assert.match(names[0]!, /a\.js$/);
  assert.match(names[1]!, /b\.js$/);
  // Output is JavaScript with the type annotation erased.
  for (const w of written) {
    assert.doesNotMatch(w.data, /:\s*number/, "type annotations must be erased");
  }
});
