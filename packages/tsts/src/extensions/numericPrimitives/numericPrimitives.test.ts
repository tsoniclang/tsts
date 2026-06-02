/**
 * numeric-primitives extension tests (node:test).
 *
 * These build a REAL compiler Program over an in-memory host, force a
 * whole-program semantic check via getSemanticDiagnostics(ctx, undefined),
 * then read the NumericTypeFact off each recognized TypeReferenceNode.
 *
 * The real Program transitively imports `const enum`-bearing compiler modules
 * (binder/checker/parser) that Node's native TS-stripping loader cannot run, so
 * this file MUST be compiled with tsc and run as emitted JS:
 *
 *   node ../tsonic/node_modules/typescript/bin/tsc -p packages/tsts/tsconfig.json \
 *     --outDir .temp/tsc-dist --pretty false \
 *   && node --test .temp/tsc-dist/src/extensions/
 *
 * Each case writes source that imports primitives from "@tsonic/core/types.js".
 */

import test from "node:test";
import assert from "node:assert/strict";

import { newProgram, type CompilerHost, type Program } from "../../compiler/program.js";
import { ParsedCommandLine } from "../../tsoptions/parsedCommandLine.js";
import type { CompilerOptions } from "../../core/compilerOptions.js";
import type { CompilerOptionsHandle } from "../../tsoptions/parsedCommandLine.js";
import {
  Kind,
  forEachChild,
  isIdentifier,
  isQualifiedName,
  isTypeReferenceNode,
  type Node,
  type SourceFile,
  type TypeReferenceNode,
} from "../../ast/index.js";
import { numericPrimitivesExtension } from "./extension.js";
import { NumericTypeFactKey, type NumericTypeFact } from "./facts.js";

const CURRENT_DIRECTORY = "/proj";

// A stub declaration module so the primitive import resolves cleanly. The
// extension keys off the import SPELLING + symbol identity, not these bodies.
const PRIMITIVE_TYPES_MODULE = [
  "export type sbyte = number;",
  "export type byte = number;",
  "export type short = number;",
  "export type ushort = number;",
  "export type int = number;",
  "export type uint = number;",
  "export type long = number;",
  "export type ulong = number;",
  "export type nint = number;",
  "export type nuint = number;",
  "export type int128 = number;",
  "export type uint128 = number;",
  "export type half = number;",
  "export type float = number;",
  "export type double = number;",
  "export type decimal = number;",
  "export type bool = boolean;",
  "export type char = string;",
  "export const int: number = 0;",
].join("\n");

const PRIMITIVE_TYPES_PATH = "/proj/node_modules/@tsonic/core/types.js.ts";

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
    // A directory exists when at least one in-memory file lives under it. This
    // is sufficient for whole-program type-directive discovery, which only
    // probes typeRoots that never exist in these self-contained inputs.
    directoryExists: (path: string): boolean => {
      const prefix = asDirectoryPrefix(path);
      return paths.some((filePath) => filePath.startsWith(prefix));
    },
    // The immediate children (files + directories) of an in-memory directory.
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

function buildProgram(source: string): Program {
  const files = new Map<string, string>([
    ["/proj/main.ts", source],
    [PRIMITIVE_TYPES_PATH, PRIMITIVE_TYPES_MODULE],
  ]);
  const host = inMemoryHost(files);
  const options = { noLib: true } as unknown as CompilerOptions;
  const config = new ParsedCommandLine(
    options as unknown as CompilerOptionsHandle,
    [...files.keys()],
    { currentDirectory: CURRENT_DIRECTORY, useCaseSensitiveFileNames: true },
  );
  return newProgram({ config, host, extensions: [numericPrimitivesExtension] });
}

const ctx = {} as Parameters<Program["getSemanticDiagnostics"]>[0];

/** The spelled type-name of a reference: `int` for `int`, `int` for `T.int`. */
function typeReferenceName(reference: TypeReferenceNode): string | undefined {
  const typeName = reference.typeName;
  if (isIdentifier(typeName)) return typeName.text;
  if (isQualifiedName(typeName) && isIdentifier(typeName.right)) return typeName.right.text;
  return undefined;
}

/** Collect every TypeReferenceNode under `root` (depth-first). */
function typeReferences(root: Node): TypeReferenceNode[] {
  const collected: TypeReferenceNode[] = isTypeReferenceNode(root) ? [root] : [];
  forEachChild(root, (child) => {
    for (const reference of typeReferences(child)) collected.push(reference);
    return undefined;
  });
  return collected;
}

/** All TypeReferenceNodes whose spelled name matches `name`. */
function referencesNamed(sourceFile: SourceFile, name: string): TypeReferenceNode[] {
  return typeReferences(sourceFile).filter((reference) => typeReferenceName(reference) === name);
}

/** Build, force a whole-program check, return the main SourceFile + its facts. */
function checkedMain(source: string): { program: Program; main: SourceFile } {
  const program = buildProgram(source);
  program.getSemanticDiagnostics(ctx, undefined);
  const main = program.getSourceFile("/proj/main.ts")!;
  return { program, main };
}

test("acceptance: named type-only import attaches the int32 fact", () => {
  const source = [
    'import type { int } from "@tsonic/core/types.js";',
    "let value: int = 1;",
  ].join("\n");
  const { program, main } = checkedMain(source);

  const intReferences = referencesNamed(main, "int");
  assert.equal(intReferences.length, 1);

  const fact = program.extensionFacts.getNodeFact<NumericTypeFact>(
    intReferences[0]!,
    NumericTypeFactKey,
  );
  assert.notEqual(fact, undefined);
  assert.equal(fact!.sourceName, "int");
  assert.equal(fact!.kind, "int32");
  assert.equal(fact!.runtimeBase, "number");
  assert.equal(fact!.signed, true);
  assert.equal(fact!.width, 32);
});

test("alias import records the imported identity, not the local alias", () => {
  const source = [
    'import type { int as int32 } from "@tsonic/core/types.js";',
    "let value: int32 = 1;",
  ].join("\n");
  const { program, main } = checkedMain(source);

  // The reference is spelled `int32` (the local alias).
  const aliasReferences = referencesNamed(main, "int32");
  assert.equal(aliasReferences.length, 1);

  const fact = program.extensionFacts.getNodeFact<NumericTypeFact>(
    aliasReferences[0]!,
    NumericTypeFactKey,
  );
  assert.notEqual(fact, undefined);
  // sourceName is the IMPORTED identity (`int`), not the local alias.
  assert.equal(fact!.sourceName, "int");
  assert.equal(fact!.kind, "int32");
  assert.equal(fact!.signed, true);
  assert.equal(fact!.width, 32);
});

test("multiple primitives each get their own fact", () => {
  const source = [
    'import type { int, ushort, double, bool, char } from "@tsonic/core/types.js";',
    "let a: int = 1;",
    "let b: ushort = 2;",
    "let c: double = 3;",
    "let d: bool = true;",
    'let e: char = "x";',
  ].join("\n");
  const { program, main } = checkedMain(source);

  const factOf = (name: string): NumericTypeFact | undefined =>
    program.extensionFacts.getNodeFact<NumericTypeFact>(
      referencesNamed(main, name)[0]!,
      NumericTypeFactKey,
    );

  const intFact = factOf("int");
  assert.notEqual(intFact, undefined);
  assert.equal(intFact!.kind, "int32");
  assert.equal(intFact!.signed, true);

  const ushortFact = factOf("ushort");
  assert.notEqual(ushortFact, undefined);
  assert.equal(ushortFact!.kind, "uint16");
  assert.equal(ushortFact!.signed, false);
  assert.equal(ushortFact!.width, 16);

  const doubleFact = factOf("double");
  assert.notEqual(doubleFact, undefined);
  assert.equal(doubleFact!.kind, "float64");
  // signed is omitted for floating primitives.
  assert.equal(doubleFact!.signed, undefined);

  const boolFact = factOf("bool");
  assert.notEqual(boolFact, undefined);
  assert.equal(boolFact!.kind, "bool");
  assert.equal(boolFact!.runtimeBase, "boolean");
  assert.equal(boolFact!.width, 1);

  const charFact = factOf("char");
  assert.notEqual(charFact, undefined);
  assert.equal(charFact!.kind, "char");
  assert.equal(charFact!.runtimeBase, "string");
  assert.equal(charFact!.width, 16);
});

test("shadowing local type alias gets no fact", () => {
  // `int` is imported, but an inner local type alias `int` shadows it inside
  // the function body. The inner reference must resolve to the local symbol,
  // so NO fact is attached to it.
  const source = [
    'import type { int } from "@tsonic/core/types.js";',
    "function f(): void {",
    "  type int = string;",
    '  let inner: int = "x";',
    "}",
  ].join("\n");
  const { program, main } = checkedMain(source);

  // The body reference resolves to the local alias -> no fact.
  const intReferences = referencesNamed(main, "int");
  // exactly one `int` type reference exists (the `let inner: int`).
  assert.equal(intReferences.length, 1);
  const fact = program.extensionFacts.getNodeFact<NumericTypeFact>(
    intReferences[0]!,
    NumericTypeFactKey,
  );
  assert.equal(fact, undefined);
});

test("default import of a primitive attaches no fact", () => {
  // A default import is invalid for the named-export primitives; the local
  // name resolves to a default-import binding, never matching a primitive.
  const source = [
    'import int from "@tsonic/core/types.js";',
    "let value: int = 1;",
  ].join("\n");
  const { program, main } = checkedMain(source);

  const intReferences = referencesNamed(main, "int");
  assert.equal(intReferences.length, 1);
  const fact = program.extensionFacts.getNodeFact<NumericTypeFact>(
    intReferences[0]!,
    NumericTypeFactKey,
  );
  assert.equal(fact, undefined);
});

test("value/runtime import of a primitive emits diagnostic 9100001", () => {
  // A non-type-only (value/runtime) import of a primitive used as a numeric
  // type emits diagnostic 9100001 and attaches NO fact.
  const source = [
    'import { int } from "@tsonic/core/types.js";',
    "let value: int = 1;",
  ].join("\n");
  const { program, main } = checkedMain(source);

  const diagnostics = program.extensionFacts.diagnostics();
  assert.equal(diagnostics.some((d) => d.code === 9100001), true);

  const intReferences = referencesNamed(main, "int");
  assert.equal(intReferences.length, 1);
  const fact = program.extensionFacts.getNodeFact<NumericTypeFact>(
    intReferences[0]!,
    NumericTypeFactKey,
  );
  assert.equal(fact, undefined);
});

test("namespace import member access attaches the fact", () => {
  const source = [
    'import type * as T from "@tsonic/core/types.js";',
    "let value: T.int = 1;",
  ].join("\n");
  const { program, main } = checkedMain(source);

  const intReferences = referencesNamed(main, "int");
  assert.equal(intReferences.length, 1);
  // Confirm the reference is the qualified `T.int` form.
  assert.equal(isQualifiedName(intReferences[0]!.typeName), true);
  assert.equal(intReferences[0]!.kind, Kind.TypeReference);

  const fact = program.extensionFacts.getNodeFact<NumericTypeFact>(
    intReferences[0]!,
    NumericTypeFactKey,
  );
  assert.notEqual(fact, undefined);
  assert.equal(fact!.sourceName, "int");
  assert.equal(fact!.kind, "int32");
  assert.equal(fact!.width, 32);
});
