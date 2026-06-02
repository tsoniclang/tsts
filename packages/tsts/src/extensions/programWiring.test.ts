/**
 * Program wiring tests (node:test).
 *
 * These build a REAL compiler Program (compiler/program.ts) over an in-memory
 * host and assert the extension host is dispatched at the mapped seams:
 *
 *   - afterParseSourceFile runs once per parsed file (end of constructor).
 *   - afterCheckSourceFile receives a working ExtensionTypeChecker facade.
 *   - a diagnostic appended in a hook surfaces through getSemanticDiagnostics.
 *   - a zero-extension Program yields diagnostics identical to baseline
 *     (the HARD INVARIANT: byte-identical behavior with no extensions).
 *
 * The real Program transitively imports `const enum`-bearing compiler modules
 * (binder/checker/parser) that Node's native TS-stripping loader cannot run, so
 * this file MUST be compiled with tsc and run as emitted JS:
 *
 *   node ../tsonic/node_modules/typescript/bin/tsc -p packages/tsts/tsconfig.json \
 *     --outDir .temp/tsc-dist --pretty false \
 *   && node --test .temp/tsc-dist/src/extensions/
 */

import test from "node:test";
import assert from "node:assert/strict";

import { newProgram, type CompilerHost, type Program } from "../compiler/program.js";
import { ParsedCommandLine } from "../tsoptions/parsedCommandLine.js";
import type { CompilerOptions } from "../core/compilerOptions.js";
import type { CompilerOptionsHandle } from "../tsoptions/parsedCommandLine.js";
import type { Diagnostic } from "../diagnostics/types.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import type { SourceFile } from "../ast/index.js";
import type { CompilerExtension } from "./host.js";
import type { ExtensionTypeChecker } from "./checkerFacade.js";

const CURRENT_DIRECTORY = "/proj";

/** Normalize a directory query to a trailing-slash prefix for path matching. */
function asDirectoryPrefix(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

function inMemoryHost(files: ReadonlyMap<string, string>): CompilerHost {
  const paths = [...files.keys()];
  return {
    fileExists: (path: string): boolean => files.has(path),
    readFile: (path: string): string | undefined => files.get(path),
    getCurrentDirectory: (): string => CURRENT_DIRECTORY,
    useCaseSensitiveFileNames: (): boolean => true,
    // A directory exists when at least one in-memory file lives under it; type-
    // directive discovery only probes typeRoots that never exist in these
    // self-contained inputs.
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
  extensions: readonly CompilerExtension[],
): Program {
  const host = inMemoryHost(files);
  // noLib keeps the program self-contained (no lib.d.ts loading); the inputs
  // below reference no global types, so this is sufficient for the checker.
  const options = { noLib: true } as unknown as CompilerOptions;
  const config = new ParsedCommandLine(
    options as unknown as CompilerOptionsHandle,
    [...files.keys()],
    { currentDirectory: CURRENT_DIRECTORY, useCaseSensitiveFileNames: true },
  );
  return newProgram({ config, host, extensions });
}

// A bare context object — the compiler's Context is an opaque marker.
const ctx = {} as Parameters<Program["getSemanticDiagnostics"]>[0];

function extension(
  id: string,
  overrides: Partial<CompilerExtension> = {},
): CompilerExtension {
  return { id, displayName: id, version: "1.0.0", ...overrides };
}

function syntheticDiagnostic(text: string): Diagnostic {
  return {
    message: { key: "ExtHook", code: 9100001, category: DiagnosticCategory.Error, message: text },
    category: DiagnosticCategory.Error,
    code: 9100001,
    text,
  };
}

test("afterParseSourceFile runs exactly once per parsed file", () => {
  const files = new Map<string, string>([
    ["/proj/a.ts", "export const a: number = 1;"],
    ["/proj/b.ts", "export const b: number = 2;"],
  ]);
  const parsed: string[] = [];
  const recorder = extension("recorder", {
    afterParseSourceFile: (_context, sourceFile: SourceFile): void => {
      parsed.push(sourceFile.fileName);
    },
  });

  const program = buildProgram(files, [recorder]);
  // Both files parsed exactly once; constructor already dispatched afterParse.
  assert.equal(parsed.length, 2);
  assert.equal(parsed.includes("/proj/a.ts"), true);
  assert.equal(parsed.includes("/proj/b.ts"), true);

  // Re-driving the program (binding) must not re-run afterParse (idempotency).
  program.bindSourceFiles();
  assert.equal(parsed.length, 2);
});

test("afterCheckSourceFile receives a working extension type checker", () => {
  const files = new Map<string, string>([
    ["/proj/c.ts", "export const value: number = 42;"],
  ]);
  const seen: { checker?: ExtensionTypeChecker; fileName?: string } = {};
  const probe = extension("probe", {
    afterCheckSourceFile: (context, sourceFile: SourceFile): void => {
      seen.checker = context.checker;
      seen.fileName = sourceFile.fileName;
      // The facade must answer queries about a real node without throwing.
      const firstStatement = sourceFile.statements[0]!;
      context.checker.getSymbolAtLocation(firstStatement);
      context.checker.getTypeAtLocation(firstStatement);
    },
  });

  const program = buildProgram(files, [probe]);
  program.getSemanticDiagnostics(ctx, undefined);

  assert.equal(seen.fileName, "/proj/c.ts");
  assert.notEqual(seen.checker, undefined);
  assert.equal(typeof seen.checker!.getTypeAtLocation, "function");
  assert.equal(typeof seen.checker!.getSymbolAtLocation, "function");
  assert.equal(typeof seen.checker!.getDeclaredTypeOfSymbol, "function");
  assert.equal(typeof seen.checker!.getContextualType, "function");
  assert.equal(typeof seen.checker!.getTypeOfSymbolAtLocation, "function");
});

test("a diagnostic appended in afterCheckSourceFile surfaces via getSemanticDiagnostics", () => {
  const files = new Map<string, string>([
    ["/proj/d.ts", "export const ok: number = 1;"],
  ]);
  const appender = extension("appender", {
    afterCheckSourceFile: (context): void => {
      context.diagnostics.append(syntheticDiagnostic("per-file extension finding"));
    },
  });

  const program = buildProgram(files, [appender]);
  const diagnostics = program.getSemanticDiagnostics(ctx, undefined);

  assert.equal(
    diagnostics.some((d) => d.code === 9100001 && d.text === "per-file extension finding"),
    true,
  );
});

test("validateProgram diagnostics surface via whole-program getSemanticDiagnostics", () => {
  const files = new Map<string, string>([
    ["/proj/e.ts", "export const ok: number = 1;"],
  ]);
  const validator = extension("validator", {
    validateProgram: (): readonly Diagnostic[] => [syntheticDiagnostic("whole-program extension finding")],
  });

  const program = buildProgram(files, [validator]);
  const diagnostics = program.getSemanticDiagnostics(ctx, undefined);

  assert.equal(
    diagnostics.some((d) => d.code === 9100001 && d.text === "whole-program extension finding"),
    true,
  );
});

test("a zero-extension program yields diagnostics identical to baseline", () => {
  // A genuine type error so the baseline produces a real semantic diagnostic.
  const source = 'export function f(): number { return "x"; }';

  const baselineFiles = new Map<string, string>([["/proj/base.ts", source]]);
  const wiredFiles = new Map<string, string>([["/proj/base.ts", source]]);

  // Baseline: build WITHOUT passing the extensions option at all.
  const baselineHost = inMemoryHost(baselineFiles);
  const baselineConfig = new ParsedCommandLine(
    { noLib: true } as unknown as CompilerOptionsHandle,
    [...baselineFiles.keys()],
    { currentDirectory: CURRENT_DIRECTORY, useCaseSensitiveFileNames: true },
  );
  const baseline = newProgram({ config: baselineConfig, host: baselineHost });

  // Wired: build WITH an explicit empty extensions array.
  const wired = buildProgram(wiredFiles, []);

  const baselineDiagnostics = baseline.getSemanticDiagnostics(ctx, undefined);
  const wiredDiagnostics = wired.getSemanticDiagnostics(ctx, undefined);

  assert.equal(wiredDiagnostics.length, baselineDiagnostics.length);
  for (let i = 0; i < baselineDiagnostics.length; i = i + 1) {
    assert.equal(wiredDiagnostics[i]!.code, baselineDiagnostics[i]!.code);
    assert.equal(wiredDiagnostics[i]!.text, baselineDiagnostics[i]!.text);
  }
  // And the wired (zero-extension) program contributed no extension diagnostics.
  assert.equal(wired.extensionFacts.diagnostics().length, 0);
});
