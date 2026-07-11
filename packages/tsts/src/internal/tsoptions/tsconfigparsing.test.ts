// Mirror of internal/tsoptions/tsconfigparsing_test.go
// TestExtendedConfigErrorsAppearOnCacheHit (with the test-local memoCache
// reproduced). The remaining tests in that file are baseline-driven
// (testutil/baseline + tsoptionstest + TypeScript-submodule fixtures) and
// belong to the suite-side baseline gating; BenchmarkParseSrcCompiler is a Go
// benchmark with no mirror.
import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import { Int, NewRuntimeType, StringType, TypeOf } from "../../go/reflect.js";
import { Diagnostic_Code, Diagnostic_File } from "../ast/diagnostic.js";
import type { SourceFileParseOptions } from "../ast/parseoptions.js";
import { ScriptKindJSON } from "../core/scriptkind.js";
import { ParseSourceFile } from "../parser/parser/statements-declarations.js";
import type { FS } from "../vfs/vfs.js";
import { FromMap } from "../vfs/vfstest/vfstest.js";
import type { Path } from "../tspath/path.js";
import { ToPath } from "../tspath/path.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import type { ExtendedConfigCache, ExtendedConfigCacheEntry, ParseConfigHost, TsConfigSourceFile } from "./tsconfigparsing.js";
import {
  GetParsedCommandLineOfConfigFile,
  NewTsconfigSourceFileFromFilePath,
  ParseConfigFileTextToJson,
  ParseExtendedConfig,
  ParseJsonConfigFileContent,
  ParseJsonSourceFileConfigFileContent,
  orderedMapType,
} from "./tsconfigparsing.js";
import { NewParsedCommandLine, ParsedCommandLine_ExtendedSourceFiles, ParsedCommandLine_FileNames, ParsedCommandLine_Locale, ParsedCommandLine_ProjectReferences } from "./parsedcommandline.js";
import { NewOrderedMapWithSizeHintWithRuntimeType, OrderedMap_Get, OrderedMap_RuntimeType, OrderedMap_Set, OrderedMap_StringAnyRuntimeType } from "../collections/ordered_map.js";

// tsoptionstest.NewVFSParseConfigHost
function vfsParseConfigHost(files: ReadonlyMap<string, string>, currentDirectory: string, useCaseSensitiveFileNames: bool): ParseConfigHost {
  const fs = FromMap(new Map(files), useCaseSensitiveFileNames);
  return {
    FS: (): FS => fs,
    GetCurrentDirectory: (): string => currentDirectory,
  };
}

// memoCache is a minimal memoizing ExtendedConfigCache used by tests to simulate
// cache hits across multiple parses of configs that extend a common base.
class memoCache implements ExtendedConfigCache {
  private m: Map<Path, GoPtr<ExtendedConfigCacheEntry>> | undefined;

  GetExtendedConfig(fileName: string, path: Path, resolutionStack: GoPtr<GoSlice<string>>, host: ParseConfigHost): GoPtr<ExtendedConfigCacheEntry> {
    if (this.m === undefined) {
      this.m = new Map();
    }
    const existing = this.m.get(path);
    if (existing !== undefined) {
      return existing;
    }
    const e = ParseExtendedConfig(fileName, path, resolutionStack, host, this);
    this.m.set(path, e);
    return e;
  }
}

function makeParseConfig(host: ParseConfigHost): (configFileName: string, cache: ExtendedConfigCache) => GoPtr<import("./parsedcommandline.js").ParsedCommandLine> {
  return (configFileName, cache) => {
    const cfgPath = ToPath(configFileName, host.GetCurrentDirectory(), host.FS().UseCaseSensitiveFileNames());
    const [jsonText, ok] = host.FS().ReadFile(configFileName);
    assert.ok(ok, `missing ${configFileName} in test fs`);
    const tsConfigSourceFile: TsConfigSourceFile = {
      ExtendedSourceFiles: undefined,
      configFileSpecs: undefined,
      SourceFile: ParseSourceFile({ FileName: configFileName, Path: cfgPath } as SourceFileParseOptions, jsonText, ScriptKindJSON),
    };
    return ParseJsonSourceFileConfigFileContent(
      tsConfigSourceFile,
      host,
      host.GetCurrentDirectory(),
      undefined,
      undefined,
      configFileName,
      undefined,
      undefined,
      cache,
    );
  };
}

// TestExtendedConfigErrorsAppearOnCacheHit verifies that diagnostics produced while parsing an
// extended config are still reported when the extended config comes from the cache.
test("ExtendedConfigErrorsAppearOnCacheHit / single config parsed twice", () => {
  const files = new Map<string, string>([
    ["/tsconfig.json", `{
  "extends": "./base.json"
}`],
    // 'excludes' instead of 'exclude' triggers diagnostic
    ["/base.json", `{
  "excludes": ["**/*.ts"]
}`],
    ["/app.ts", "export {}"],
  ]);

  const host = vfsParseConfigHost(files, "/", true as bool /*useCaseSensitiveFileNames*/);
  const parseConfig = makeParseConfig(host);

  const cache = new memoCache();
  const first = parseConfig("/tsconfig.json", cache);
  assert.ok((first!.Errors ?? []).length > 0, "expected diagnostics on first parse, got 0");
  const second = parseConfig("/tsconfig.json", cache);
  assert.ok((second!.Errors ?? []).length > 0, "expected diagnostics on second parse (cache hit), got 0");
});

test("ExtendedConfigErrorsAppearOnCacheHit / two configs share same base", () => {
  const files = new Map<string, string>([
    ["/base.json", `{
  "excludes": ["**/*.ts"]
}`],
    ["/projA/tsconfig.json", `{
  "extends": "../base.json"
}`],
    ["/projB/tsconfig.json", `{
  "extends": "../base.json"
}`],
    ["/projA/app.ts", "export {}"],
    ["/projB/app.ts", "export {}"],
  ]);

  const host = vfsParseConfigHost(files, "/", true as bool /*useCaseSensitiveFileNames*/);
  const parseConfig = makeParseConfig(host);

  const cache = new memoCache();
  const first = parseConfig("/projA/tsconfig.json", cache);
  assert.ok((first!.Errors ?? []).length > 0, "expected diagnostics for projA parse, got 0");
  const second = parseConfig("/projB/tsconfig.json", cache);
  assert.ok((second!.Errors ?? []).length > 0, "expected diagnostics for projB parse (cache hit on base), got 0");
});

test("extended config preserves an explicitly empty include list", () => {
  const files = new Map<string, string>([
    ["/base.json", `{ "include": [] }`],
    ["/tsconfig.json", `{ "extends": "./base.json" }`],
    ["/app.ts", "export {}"],
  ]);
  const host = vfsParseConfigHost(files, "/", true as bool);
  const parsed = makeParseConfig(host)("/tsconfig.json", new memoCache());

  assert.deepEqual(ParsedCommandLine_FileNames(parsed), []);
});

test("extended config propagates the resolution stack for circularity detection", () => {
  const files = new Map<string, string>([
    ["/a.json", `{ "extends": "./b.json" }`],
    ["/b.json", `{ "extends": "./a.json" }`],
  ]);
  const host = vfsParseConfigHost(files, "/", true as bool);
  const parsed = makeParseConfig(host)("/a.json", new memoCache());

  assert.ok((parsed!.Errors ?? []).length > 0, "expected a circularity diagnostic");
});

function parseProjectReferenceConfig(
  jsonText: string,
  withSource: boolean,
): GoPtr<import("./parsedcommandline.js").ParsedCommandLine> {
  const files = new Map<string, string>([
    ["/tsconfig.json", jsonText],
    ["/app.ts", "export {}"],
  ]);
  const host = vfsParseConfigHost(files, "/", true as bool);
  if (withSource) {
    return makeParseConfig(host)("/tsconfig.json", new memoCache());
  }
  const [json, parseDiagnostics] = ParseConfigFileTextToJson("/tsconfig.json", "/tsconfig.json" as Path, jsonText);
  assert.deepEqual(parseDiagnostics ?? [], []);
  return ParseJsonConfigFileContent(json, host, "/", undefined, "/tsconfig.json", undefined, undefined, undefined);
}

function projectReferenceDiagnostics(
  jsonText: string,
  withSource: boolean,
): { parsed: GoPtr<import("./parsedcommandline.js").ParsedCommandLine>; codes: number[] } {
  const parsed = parseProjectReferenceConfig(jsonText, withSource);
  assert.ok(parsed !== undefined);
  const diagnostics = parsed.Errors ?? [];
  for (const diagnostic of diagnostics) {
    assert.equal(Diagnostic_File(diagnostic) !== undefined, withSource);
  }
  return { parsed, codes: diagnostics.map((diagnostic) => Diagnostic_Code(diagnostic)) };
}

test("JSON conversion assigns exact OrderedMap[string, any] reflection identity", () => {
  const [json, diagnostics] = ParseConfigFileTextToJson(
    "/tsconfig.json",
    "/tsconfig.json" as Path,
    `{ "references": [{ "path": "./project" }] }`,
  );
  assert.deepEqual(diagnostics ?? [], []);
  assert.equal(TypeOf(json), orderedMapType);

  const [references, referencesPresent] = OrderedMap_Get(json as GoPtr<import("../collections/ordered_map.js").OrderedMap<string, unknown>>, "references", () => undefined);
  assert.equal(referencesPresent, true);
  assert.ok(Array.isArray(references));
  assert.equal(TypeOf(references![0]), orderedMapType);
});

test("project references reject other OrderedMap instantiations and structural lookalikes", () => {
  const host = vfsParseConfigHost(new Map([["/app.ts", "export {}"]]), "/", true as bool);
  const numberType = NewRuntimeType({ kind: Int, name: "int" });
  const numberStringType = OrderedMap_RuntimeType<number, string>(numberType, StringType);
  const wrongInstantiation = NewOrderedMapWithSizeHintWithRuntimeType<number, string>(numberStringType, 1)!;
  OrderedMap_Set(wrongInstantiation, 1, "./project");
  const lookalike = { __tsgoBlank0: {}, keys: ["path"], mp: new Map([["path", "./project"]]) };

  for (const reference of [wrongInstantiation, lookalike]) {
    const root = NewOrderedMapWithSizeHintWithRuntimeType<string, unknown>(OrderedMap_StringAnyRuntimeType, 1)!;
    OrderedMap_Set(root, "references", [reference]);
    const parsed = ParseJsonConfigFileContent(root, host, "/", undefined, "/tsconfig.json", undefined, undefined, undefined);
    assert.deepEqual((parsed!.Errors ?? []).map((diagnostic) => Diagnostic_Code(diagnostic)), [5024, 5024]);
    assert.deepEqual(ParsedCommandLine_ProjectReferences(parsed), []);
  }
});

test("project references distinguish absent and explicit empty lists", () => {
  const absent = projectReferenceDiagnostics(`{ "files": ["app.ts"] }`, true).parsed;
  assert.equal(ParsedCommandLine_ProjectReferences(absent), undefined);

  const explicitEmpty = projectReferenceDiagnostics(`{ "files": ["app.ts"], "references": [] }`, true).parsed;
  assert.deepEqual(ParsedCommandLine_ProjectReferences(explicitEmpty), []);
});

for (const withSource of [true, false]) {
  test(`project reference diagnostic matrix ${withSource ? "with" : "without"} source attribution`, () => {
    const missing = projectReferenceDiagnostics(`{ "files": ["app.ts"], "references": [{}] }`, withSource);
    assert.deepEqual(missing.codes, [5024]);
    assert.deepEqual(ParsedCommandLine_ProjectReferences(missing.parsed), []);

    const wrongPathType = projectReferenceDiagnostics(`{ "files": ["app.ts"], "references": [{ "path": 1 }] }`, withSource);
    assert.deepEqual(wrongPathType.codes, [5024]);
    assert.deepEqual(ParsedCommandLine_ProjectReferences(wrongPathType.parsed), []);

    const emptyPath = projectReferenceDiagnostics(`{ "files": ["app.ts"], "references": [{ "path": "" }] }`, withSource);
    assert.deepEqual(emptyPath.codes, [18051]);
    assert.deepEqual(ParsedCommandLine_ProjectReferences(emptyPath.parsed), []);

    const wrongCircularType = projectReferenceDiagnostics(`{ "files": ["app.ts"], "references": [{ "path": "./a", "circular": "yes" }] }`, withSource);
    assert.deepEqual(wrongCircularType.codes, [5024]);
    assert.deepEqual(ParsedCommandLine_ProjectReferences(wrongCircularType.parsed), [{ Path: "/a", OriginalPath: "./a", Circular: false }]);

    const valid = projectReferenceDiagnostics(`{
      "files": ["app.ts"],
      "references": [
        { "path": "./a" },
        { "path": "./b", "circular": false },
        { "path": "./c", "circular": true }
      ]
    }`, withSource);
    assert.deepEqual(valid.codes, []);
    assert.deepEqual(ParsedCommandLine_ProjectReferences(valid.parsed), [
      { Path: "/a", OriginalPath: "./a", Circular: false },
      { Path: "/b", OriginalPath: "./b", Circular: false },
      { Path: "/c", OriginalPath: "./c", Circular: true },
    ]);
  });
}

test("config-file parsing preserves read-error and success result nil states", () => {
  const host = vfsParseConfigHost(new Map([["/tsconfig.json", `{ "files": ["app.ts"] }`], ["/app.ts", "export {}"]]), "/", true as bool);
  const [missing, readErrors] = GetParsedCommandLineOfConfigFile("/missing.json", undefined, undefined, host, undefined);
  assert.equal(missing, undefined);
  assert.ok((readErrors?.length ?? 0) > 0);
  assert.ok(readErrors!.every((diagnostic) => Diagnostic_File(diagnostic) === undefined));

  const [parsed, successDiagnostics] = GetParsedCommandLineOfConfigFile("/tsconfig.json", undefined, undefined, host, undefined);
  assert.ok(parsed !== undefined);
  assert.equal(successDiagnostics, undefined);
});

test("new tsconfig source files preserve the Go zero-value extended-file list", () => {
  const sourceFile = NewTsconfigSourceFileFromFilePath("/tsconfig.json", "/tsconfig.json" as Path, `{}`);
  assert.equal(sourceFile!.ExtendedSourceFiles, undefined);
});

test("ParsedCommandLine preserves extended-source files", () => {
  const files = new Map<string, string>([
    ["/base.json", `{ "files": ["base.ts"] }`],
    ["/tsconfig.json", `{ "extends": "./base.json" }`],
    ["/base.ts", "export {}"],
  ]);
  const host = vfsParseConfigHost(files, "/", true as bool);
  const parsed = makeParseConfig(host)("/tsconfig.json", new memoCache());

  assert.deepEqual(ParsedCommandLine_ExtendedSourceFiles(parsed), ["/base.json"]);
});

test("ParsedCommandLine memoizes the command-line locale", () => {
  const parsed = NewParsedCommandLine(
    { Locale: "ja-jp" } as CompilerOptions,
    [],
    { CurrentDirectory: "/", UseCaseSensitiveFileNames: true as bool },
  );

  assert.equal(ParsedCommandLine_Locale(parsed), "ja-JP");
  assert.equal(ParsedCommandLine_Locale(parsed), "ja-JP");
});
