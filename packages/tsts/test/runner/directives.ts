/**
 * Test file directive parser.
 *
 * Tests use leading `// @directive: value` comments to configure the
 * compiler and to split into multi-file projects. Example:
 *
 *   // @target: ES5
 *   // @strict: true
 *   // @noEmit: true
 *   // @Filename: globals.ts
 *   declare global { const __FOO__: any; }
 *   // @Filename: app.ts
 *   export {};
 *
 * This module extracts directives + splits the test into named files.
 *
 * Mirrors the directive-parsing logic in TS-Go's `internal/testrunner/test_case_parser.go`.
 */

import type { TestCase, TestDirectives, TestFile } from "./types.js";

const DIRECTIVE_LINE = /^\s*\/\/\s*@(\w+)\s*:\s*(.*?)\s*$/;
const DEFAULT_FILENAME_BASE = "default";

/**
 * Parse a test file's text into a TestCase: extract directives, split into
 * file slices on `@Filename:` directives.
 *
 * @param testPath  Absolute path to the .ts test file
 * @param testName  Canonical test name (relative to test root, no extension)
 * @param content   The full file content
 */
export function parseTestCase(
  testPath: string,
  testName: string,
  content: string
): TestCase {
  const lines = content.split(/\r?\n/);
  const directiveMap = new Map<string, string>();
  const unknown = new Map<string, string>();
  const files: TestFile[] = [];

  // Track current file slice: starts as the default (un-named) file. When
  // an `@Filename:` directive is seen, flush the current slice and start
  // a new named one.
  let currentFileName: string | undefined;
  let currentLines: string[] = [];

  // Default filename inferred from test name when no @Filename appears.
  const defaultFileName = `${baseNameFromTestName(testName)}.ts`;

  for (const rawLine of lines) {
    const match = DIRECTIVE_LINE.exec(rawLine);
    if (match) {
      const key = match[1]!;
      const value = match[2]!;

      if (key === "Filename" || key === "filename") {
        // Filename directive: flush current slice and start a new one
        if (currentLines.length > 0 || currentFileName !== undefined) {
          files.push({
            fileName: currentFileName ?? defaultFileName,
            content: currentLines.join("\n"),
          });
        }
        currentFileName = value;
        currentLines = [];
        continue;
      }

      // Compiler-affecting directive: record at top level
      // (TS-Go honors only the first occurrence per key; we match that).
      if (!directiveMap.has(key)) {
        directiveMap.set(key, value);
      }
      continue;
    }
    currentLines.push(rawLine);
  }

  // Flush last slice
  if (currentLines.length > 0 || currentFileName !== undefined) {
    files.push({
      fileName: currentFileName ?? defaultFileName,
      content: currentLines.join("\n"),
    });
  }

  // Trim trailing empty lines from each file
  for (let i = 0; i < files.length; i += 1) {
    files[i] = {
      fileName: files[i]!.fileName,
      content: files[i]!.content.replace(/\n+$/, ""),
    };
  }

  const directives = normalizeDirectives(directiveMap, unknown);

  return {
    testPath,
    testName,
    directives,
    files,
  };
}

function baseNameFromTestName(testName: string): string {
  const parts = testName.split("/");
  return parts[parts.length - 1] ?? DEFAULT_FILENAME_BASE;
}

function normalizeDirectives(
  raw: ReadonlyMap<string, string>,
  unknown: Map<string, string>
): TestDirectives {
  const out: { -readonly [K in keyof TestDirectives]: TestDirectives[K] } = {};

  for (const [key, value] of raw) {
    const lower = key.toLowerCase();
    switch (lower) {
      case "target":
        out.target = value;
        break;
      case "module":
        out.module = value;
        break;
      case "strict":
        out.strict = parseBool(value);
        break;
      case "strictnullchecks":
        out.strictNullChecks = parseBool(value);
        break;
      case "strictfunctiontypes":
        out.strictFunctionTypes = parseBool(value);
        break;
      case "strictbindcallapply":
        out.strictBindCallApply = parseBool(value);
        break;
      case "strictpropertyinitialization":
        out.strictPropertyInitialization = parseBool(value);
        break;
      case "noimplicitany":
        out.noImplicitAny = parseBool(value);
        break;
      case "noimplicitthis":
        out.noImplicitThis = parseBool(value);
        break;
      case "alwaysstrict":
        out.alwaysStrict = parseBool(value);
        break;
      case "useunknownincatchvariables":
        out.useUnknownInCatchVariables = parseBool(value);
        break;
      case "noemit":
        out.noEmit = parseBool(value);
        break;
      case "notypesandsymbols":
        out.noTypesAndSymbols = parseBool(value);
        break;
      case "declaration":
        out.declaration = parseBool(value);
        break;
      case "sourcemap":
        out.sourceMap = parseBool(value);
        break;
      case "declarationmap":
        out.declarationMap = parseBool(value);
        break;
      case "emitdeclarationonly":
        out.emitDeclarationOnly = parseBool(value);
        break;
      case "experimentaldecorators":
        out.experimentalDecorators = parseBool(value);
        break;
      case "emitdecoratormetadata":
        out.emitDecoratorMetadata = parseBool(value);
        break;
      case "esmoduleinterop":
        out.esModuleInterop = parseBool(value);
        break;
      case "allowsyntheticdefaultimports":
        out.allowSyntheticDefaultImports = parseBool(value);
        break;
      case "isolatedmodules":
        out.isolatedModules = parseBool(value);
        break;
      case "jsx":
        out.jsx = value;
        break;
      case "lib":
        out.lib = value.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
        break;
      case "noemitonerror":
        out.noEmitOnError = parseBool(value);
        break;
      case "moduleresolution":
        out.moduleResolution = value;
        break;
      case "verbatimmodulesyntax":
        out.verbatimModuleSyntax = parseBool(value);
        break;
      case "skipdefaultlibcheck":
        out.skipDefaultLibCheck = parseBool(value);
        break;
      case "skiplibcheck":
        out.skipLibCheck = parseBool(value);
        break;
      default:
        unknown.set(key, value);
        break;
    }
  }

  if (unknown.size > 0) {
    out.unknown = unknown;
  }

  return out as TestDirectives;
}

function parseBool(value: string): boolean {
  const lower = value.toLowerCase();
  return lower === "true" || lower === "1" || lower === "yes";
}
