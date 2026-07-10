// Mirror of internal/compiler/program_test.go (TestProgram: BasicFileOrdering,
// FileOrderingImports, FileOrderingCycles). BenchmarkNewProgram and the
// emit_test.go benchmarks have no mirrors. The Go test builds a
// tsoptions.ParsedCommandLine struct literal (zero values, NO compiler-option
// normalization); parsedCommandLine() reproduces that literal here.
import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool, int } from "../../go/scalars.js";
import { Once } from "../../go/sync.js";
import type { GoPtr } from "../../go/compat.js";
import { Background, WithCancel } from "../../go/context.js";
import { SourceFile_FileName } from "../ast/ast.js";
import type { SourceFile } from "../ast/ast.js";
import { LibPath, WrapFS } from "../bundled/bundled.js";
import type { CompilerOptions, ScriptTarget } from "../core/compileroptions.js";
import { NewLineKindLF, ScriptTargetESNext } from "../core/compileroptions.js";
import { TSFalse, TSTrue } from "../core/tristate.js";
import { Parse as locale_Parse } from "../locale/locale.js";
import type { ParsedCommandLine } from "../tsoptions/parsedcommandline.js";
import { FromMap } from "../vfs/vfstest/vfstest.js";
import type { FS } from "../vfs/vfs.js";
import { StartTracing, Tracing_StopTracing } from "../tracing/tracing.js";
import type { Checker } from "../checker/checker/state.js";
import type { CheckerPool } from "./checkerpool.js";
import { NewCompilerHost } from "./host.js";
import { EmitAll } from "./emitter.js";
import {
  NewProgram,
  Program_Emit,
  Program_GetCheckerPool,
  Program_GetSourceFiles,
  Program_GetTypeCheckerForFile,
  Program_collectCheckerDiagnostics,
  Program_collectCheckerDiagnosticsFromFiles,
  Program_getDeclarationDiagnosticsForFile,
  SortAndDeduplicateDiagnostics,
} from "./program.js";
import type { Program } from "./program.js";

interface testFile {
  fileName: string;
  contents: string;
}

interface programTest {
  testName: string;
  files: testFile[];
  expectedFiles: string[];
  target: ScriptTarget;
}

const esnextLibs: string[] = [
  "lib.es5.d.ts",
  "lib.es2015.d.ts",
  "lib.es2016.d.ts",
  "lib.es2017.d.ts",
  "lib.es2018.d.ts",
  "lib.es2019.d.ts",
  "lib.es2020.d.ts",
  "lib.es2021.d.ts",
  "lib.es2022.d.ts",
  "lib.es2023.d.ts",
  "lib.es2024.d.ts",
  "lib.es2025.d.ts",
  "lib.esnext.d.ts",
  "lib.dom.d.ts",
  "lib.dom.iterable.d.ts",
  "lib.dom.asynciterable.d.ts",
  "lib.webworker.importscripts.d.ts",
  "lib.scripthost.d.ts",
  "lib.es2015.core.d.ts",
  "lib.es2015.collection.d.ts",
  "lib.es2015.generator.d.ts",
  "lib.es2015.iterable.d.ts",
  "lib.es2015.promise.d.ts",
  "lib.es2015.proxy.d.ts",
  "lib.es2015.reflect.d.ts",
  "lib.es2015.symbol.d.ts",
  "lib.es2015.symbol.wellknown.d.ts",
  "lib.es2016.array.include.d.ts",
  "lib.es2016.intl.d.ts",
  "lib.es2017.arraybuffer.d.ts",
  "lib.es2017.date.d.ts",
  "lib.es2017.object.d.ts",
  "lib.es2017.sharedmemory.d.ts",
  "lib.es2017.string.d.ts",
  "lib.es2017.intl.d.ts",
  "lib.es2017.typedarrays.d.ts",
  "lib.es2018.asyncgenerator.d.ts",
  "lib.es2018.asynciterable.d.ts",
  "lib.es2018.intl.d.ts",
  "lib.es2018.promise.d.ts",
  "lib.es2018.regexp.d.ts",
  "lib.es2019.array.d.ts",
  "lib.es2019.object.d.ts",
  "lib.es2019.string.d.ts",
  "lib.es2019.symbol.d.ts",
  "lib.es2019.intl.d.ts",
  "lib.es2020.bigint.d.ts",
  "lib.es2020.date.d.ts",
  "lib.es2020.promise.d.ts",
  "lib.es2020.sharedmemory.d.ts",
  "lib.es2020.string.d.ts",
  "lib.es2020.symbol.wellknown.d.ts",
  "lib.es2020.intl.d.ts",
  "lib.es2020.number.d.ts",
  "lib.es2021.promise.d.ts",
  "lib.es2021.string.d.ts",
  "lib.es2021.weakref.d.ts",
  "lib.es2021.intl.d.ts",
  "lib.es2022.array.d.ts",
  "lib.es2022.error.d.ts",
  "lib.es2022.intl.d.ts",
  "lib.es2022.object.d.ts",
  "lib.es2022.string.d.ts",
  "lib.es2022.regexp.d.ts",
  "lib.es2023.array.d.ts",
  "lib.es2023.collection.d.ts",
  "lib.es2023.intl.d.ts",
  "lib.es2024.arraybuffer.d.ts",
  "lib.es2024.collection.d.ts",
  "lib.es2024.object.d.ts",
  "lib.es2024.promise.d.ts",
  "lib.es2024.regexp.d.ts",
  "lib.es2024.sharedmemory.d.ts",
  "lib.es2024.string.d.ts",
  "lib.es2025.collection.d.ts",
  "lib.es2025.float16.d.ts",
  "lib.es2025.intl.d.ts",
  "lib.es2025.iterator.d.ts",
  "lib.es2025.promise.d.ts",
  "lib.es2025.regexp.d.ts",
  "lib.esnext.array.d.ts",
  "lib.esnext.collection.d.ts",
  "lib.esnext.date.d.ts",
  "lib.esnext.decorators.d.ts",
  "lib.esnext.disposable.d.ts",
  "lib.esnext.error.d.ts",
  "lib.esnext.intl.d.ts",
  "lib.esnext.sharedmemory.d.ts",
  "lib.esnext.temporal.d.ts",
  "lib.esnext.typedarrays.d.ts",
  "lib.decorators.d.ts",
  "lib.decorators.legacy.d.ts",
  "lib.esnext.full.d.ts",
];

// Go: &tsoptions.ParsedCommandLine{ParsedConfig: &core.ParsedOptions{...}} —
// every other field is its zero value, and the compiler options are NOT
// normalized (unlike NewParsedCommandLine).
function parsedCommandLine(fileNames: string[], compilerOptions: GoPtr<CompilerOptions>): GoPtr<ParsedCommandLine> {
  return {
    ParsedConfig: {
      CompilerOptions: compilerOptions,
      WatchOptions: undefined,
      TypeAcquisition: undefined,
      FileNames: fileNames,
      ProjectReferences: [],
    },
    ConfigFile: undefined,
    Errors: [],
    Raw: undefined,
    CompileOnSave: undefined,
    comparePathsOptions: { UseCaseSensitiveFileNames: false as bool, CurrentDirectory: "" },
    wildcardDirectoriesOnce: new Once(),
    wildcardDirectories: new globalThis.Map(),
    includeGlobsOnce: new Once(),
    includeGlobs: [],
    extraFileExtensions: [],
    sourceAndOutputMapsOnce: new Once(),
    sourceToProjectReference: new globalThis.Map(),
    outputDtsToProjectReference: new globalThis.Map(),
    commonSourceDirectory: "",
    commonSourceDirectoryOnce: new Once(),
    resolvedProjectReferencePaths: [],
    resolvedProjectReferencePathsOnce: new Once(),
    literalFileNamesLen: 0 as int,
    fileNamesByPath: new globalThis.Map(),
    fileNamesByPathOnce: new Once(),
    locale: locale_Parse("")[0],
    localeOnce: new Once(),
  } as ParsedCommandLine;
}

function focusedProgram(tracing: Program["opts"]["Tracing"] = undefined): { fs: FS; program: GoPtr<Program>; sourceFile: GoPtr<SourceFile> } {
  const fs = FromMap(new Map<string, string>([
    ["/src/index.ts", "export const value = 1;"],
    ["/trace/.keep", ""],
  ]), true as bool);
  const options = {
    NoEmitOnError: TSFalse,
    NoLib: TSTrue,
    NewLine: NewLineKindLF,
    Target: ScriptTargetESNext,
  } as CompilerOptions;
  const program = NewProgram({
    Config: parsedCommandLine(["/src/index.ts"], options),
    Host: NewCompilerHost("/src", WrapFS(fs), LibPath(), undefined, undefined),
    Tracing: tracing,
  });
  const sourceFile = Program_GetSourceFiles(program).find((file) => SourceFile_FileName(file) === "/src/index.ts");
  assert.notEqual(sourceFile, undefined);
  return { fs, program, sourceFile };
}

function installLeaseTrackingPool(program: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): { releaseCount: () => number } {
  const [checker, releaseOriginal] = Program_GetTypeCheckerForFile(program, Background(), sourceFile);
  releaseOriginal();
  let releases = 0;
  program!.compilerCheckerPool = undefined;
  program!.checkerPool = {
    GetChecker: (): [GoPtr<Checker>, () => void] => [checker, () => {
      releases++;
    }],
  };
  return { releaseCount: () => releases };
}

const programTestCases: programTest[] = [
  {
    testName: "BasicFileOrdering",
    files: [
      { fileName: "c:/dev/src/index.ts", contents: "/// <reference path='c:/dev/src2/a/5.ts' />\n/// <reference path='c:/dev/src2/a/10.ts' />" },
      { fileName: "c:/dev/src2/a/5.ts", contents: "/// <reference path='4.ts' />" },
      { fileName: "c:/dev/src2/a/4.ts", contents: "/// <reference path='b/3.ts' />" },
      { fileName: "c:/dev/src2/a/b/3.ts", contents: "/// <reference path='2.ts' />" },
      { fileName: "c:/dev/src2/a/b/2.ts", contents: "/// <reference path='c/1.ts' />" },
      { fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');" },
      { fileName: "c:/dev/src2/a/10.ts", contents: "/// <reference path='b/c/d/9.ts' />" },
      { fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "/// <reference path='e/8.ts' />" },
      { fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "/// <reference path='7.ts' />" },
      { fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "/// <reference path='f/6.ts' />" },
      { fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');" },
    ],
    expectedFiles: [...esnextLibs,
      "c:/dev/src2/a/b/c/1.ts",
      "c:/dev/src2/a/b/2.ts",
      "c:/dev/src2/a/b/3.ts",
      "c:/dev/src2/a/4.ts",
      "c:/dev/src2/a/5.ts",
      "c:/dev/src2/a/b/c/d/e/f/6.ts",
      "c:/dev/src2/a/b/c/d/e/7.ts",
      "c:/dev/src2/a/b/c/d/e/8.ts",
      "c:/dev/src2/a/b/c/d/9.ts",
      "c:/dev/src2/a/10.ts",
      "c:/dev/src/index.ts",
    ],
    target: ScriptTargetESNext,
  },
  {
    testName: "FileOrderingImports",
    files: [
      { fileName: "c:/dev/src/index.ts", contents: "import * as five from '../src2/a/5.ts';\nimport * as ten from '../src2/a/10.ts';" },
      { fileName: "c:/dev/src2/a/5.ts", contents: "import * as four from './4.ts';" },
      { fileName: "c:/dev/src2/a/4.ts", contents: "import * as three from './b/3.ts';" },
      { fileName: "c:/dev/src2/a/b/3.ts", contents: "import * as two from './2.ts';" },
      { fileName: "c:/dev/src2/a/b/2.ts", contents: "import * as one from './c/1.ts';" },
      { fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');" },
      { fileName: "c:/dev/src2/a/10.ts", contents: "import * as nine from './b/c/d/9.ts';" },
      { fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "import * as eight from './e/8.ts';" },
      { fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "import * as seven from './7.ts';" },
      { fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "import * as six from './f/6.ts';" },
      { fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');" },
    ],
    expectedFiles: [...esnextLibs,
      "c:/dev/src2/a/b/c/1.ts",
      "c:/dev/src2/a/b/2.ts",
      "c:/dev/src2/a/b/3.ts",
      "c:/dev/src2/a/4.ts",
      "c:/dev/src2/a/5.ts",
      "c:/dev/src2/a/b/c/d/e/f/6.ts",
      "c:/dev/src2/a/b/c/d/e/7.ts",
      "c:/dev/src2/a/b/c/d/e/8.ts",
      "c:/dev/src2/a/b/c/d/9.ts",
      "c:/dev/src2/a/10.ts",
      "c:/dev/src/index.ts",
    ],
    target: ScriptTargetESNext,
  },
  {
    testName: "FileOrderingCycles",
    files: [
      { fileName: "c:/dev/src/index.ts", contents: "import * as five from '../src2/a/5.ts';\nimport * as ten from '../src2/a/10.ts';" },
      { fileName: "c:/dev/src2/a/5.ts", contents: "import * as four from './4.ts';" },
      { fileName: "c:/dev/src2/a/4.ts", contents: "import * as three from './b/3.ts';" },
      { fileName: "c:/dev/src2/a/b/3.ts", contents: "import * as two from './2.ts';\nimport * as cycle from 'c:/dev/src/index.ts'; " },
      { fileName: "c:/dev/src2/a/b/2.ts", contents: "import * as one from './c/1.ts';" },
      { fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');" },
      { fileName: "c:/dev/src2/a/10.ts", contents: "import * as nine from './b/c/d/9.ts';" },
      { fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "import * as eight from './e/8.ts';\nimport * as cycle from 'c:/dev/src/index.ts';" },
      { fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "import * as seven from './7.ts';" },
      { fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "import * as six from './f/6.ts';" },
      { fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');" },
    ],
    expectedFiles: [...esnextLibs,
      "c:/dev/src2/a/b/c/1.ts",
      "c:/dev/src2/a/b/2.ts",
      "c:/dev/src2/a/b/3.ts",
      "c:/dev/src2/a/4.ts",
      "c:/dev/src2/a/5.ts",
      "c:/dev/src2/a/b/c/d/e/f/6.ts",
      "c:/dev/src2/a/b/c/d/e/7.ts",
      "c:/dev/src2/a/b/c/d/e/8.ts",
      "c:/dev/src2/a/b/c/d/9.ts",
      "c:/dev/src2/a/10.ts",
      "c:/dev/src/index.ts",
    ],
    target: ScriptTargetESNext,
  },
];

for (const testCase of programTestCases) {
  test(`Program ${testCase.testName}`, () => {
    const libPrefix = LibPath() + "/";
    let fs = FromMap(new Map<string, string>(), false as bool /*useCaseSensitiveFileNames*/);
    fs = WrapFS(fs);

    for (const file of testCase.files) {
      fs.WriteFile(file.fileName, file.contents);
    }

    const opts = { Target: testCase.target } as CompilerOptions;

    const program = NewProgram({
      Config: parsedCommandLine(["c:/dev/src/index.ts"], opts),
      Host: NewCompilerHost("c:/dev/src", fs, LibPath(), undefined, undefined),
    });

    const actualFiles: string[] = [];
    for (const file of Program_GetSourceFiles(program)) {
      const fileName = SourceFile_FileName(file);
      actualFiles.push(fileName.startsWith(libPrefix) ? fileName.slice(libPrefix.length) : fileName);
    }

    assert.deepEqual(actualFiles, testCase.expectedFiles);
  });
}

test("Program checker pool is initialized before construction returns", () => {
  const fs = WrapFS(FromMap(new Map<string, string>(), false as bool));
  const checkerPool: CheckerPool = {
    GetChecker: () => {
      throw new Error("checker acquisition is outside this construction test");
    },
  };
  let observedProgram: GoPtr<Program>;

  const program = NewProgram({
    Config: parsedCommandLine([], {} as CompilerOptions),
    Host: NewCompilerHost("/", fs, LibPath(), undefined, undefined),
    CreateCheckerPool: (candidate) => {
      observedProgram = candidate;
      assert.equal(candidate!.checkerPool, undefined);
      return checkerPool;
    },
  });

  assert.equal(observedProgram, program);
  assert.equal(program!.checkerPool, checkerPool);
  assert.equal(Program_GetCheckerPool(program), checkerPool);
});

test("SortAndDeduplicateDiagnostics preserves the Go nil-slice distinction", () => {
  assert.equal(SortAndDeduplicateDiagnostics(undefined), undefined);

  const allocatedEmpty: [] = [];
  const result = SortAndDeduplicateDiagnostics(allocatedEmpty);
  assert.deepEqual(result, []);
  assert.notEqual(result, allocatedEmpty);
});

test("Program.Emit stops after no-emit-on-error handling when its context is canceled", () => {
  const { fs, program, sourceFile } = focusedProgram();
  const [ctx, cancel] = WithCancel(Background());
  let writes = 0;
  cancel();

  const result = Program_Emit(program, ctx, {
    TargetSourceFile: sourceFile,
    EmitOnly: EmitAll,
    WriteFile: () => {
      writes++;
      return undefined;
    },
  });

  assert.equal(result, undefined);
  assert.equal(writes, 0);
  assert.equal(fs.FileExists("/src/index.js"), false);
});

test("Program.Emit closes its trace scope when cancellation returns nil", () => {
  const fs = FromMap(new Map<string, string>([
    ["/src/index.ts", "export const value = 1;"],
    ["/trace/.keep", ""],
  ]), true as bool);
  const [tracing, startError] = StartTracing(fs, "/trace", "", true as bool);
  assert.equal(startError, undefined);
  assert.notEqual(tracing, undefined);
  const options = {
    NoEmitOnError: TSFalse,
    NoLib: TSTrue,
    NewLine: NewLineKindLF,
    Target: ScriptTargetESNext,
  } as CompilerOptions;
  const program = NewProgram({
    Config: parsedCommandLine(["/src/index.ts"], options),
    Host: NewCompilerHost("/src", WrapFS(fs), LibPath(), undefined, undefined),
    Tracing: tracing,
  });
  const sourceFile = Program_GetSourceFiles(program).find((file) => SourceFile_FileName(file) === "/src/index.ts");
  const [ctx, cancel] = WithCancel(Background());
  cancel();

  assert.equal(Program_Emit(program, ctx, { TargetSourceFile: sourceFile, EmitOnly: EmitAll, WriteFile: undefined }), undefined);
  assert.equal(Tracing_StopTracing(tracing), undefined);
  const [traceText, ok] = fs.ReadFile("/trace/trace.json");
  assert.equal(ok, true);
  const events = JSON.parse(traceText) as Array<{ readonly ph: string; readonly name?: string }>;
  assert.deepEqual(events.filter((event) => event.name === "emit").map((event) => event.ph), ["B", "E"]);
});

test("focused checker diagnostics release their checker lease when collection throws", () => {
  const { program, sourceFile } = focusedProgram();
  let releases = 0;
  program!.compilerCheckerPool = undefined;
  program!.checkerPool = {
    GetChecker: (): [GoPtr<Checker>, () => void] => [{} as Checker, () => {
      releases++;
    }],
  };
  const failure = new globalThis.Error("focused diagnostic failure");

  assert.throws(
    () => Program_collectCheckerDiagnostics(program, Background(), sourceFile, () => {
      throw failure;
    }),
    failure,
  );
  assert.equal(releases, 1);
});

test("all-file checker diagnostics release their checker lease when collection throws", () => {
  const { program, sourceFile } = focusedProgram();
  let releases = 0;
  program!.compilerCheckerPool = undefined;
  program!.checkerPool = {
    GetChecker: (): [GoPtr<Checker>, () => void] => [{} as Checker, () => {
      releases++;
    }],
  };
  const failure = new globalThis.Error("all-file diagnostic failure");

  assert.throws(
    () => Program_collectCheckerDiagnosticsFromFiles(program, Background(), [sourceFile], () => {
      throw failure;
    }),
    failure,
  );
  assert.equal(releases, 1);
});

test("declaration diagnostics release their checker lease when transformation setup throws", () => {
  const { program, sourceFile } = focusedProgram();
  const lease = installLeaseTrackingPool(program, sourceFile);
  const failure = new globalThis.Error("declaration setup failure");
  const compilerOptions = program!.opts.Config!.ParsedConfig!.CompilerOptions!;
  program!.opts.Config!.ParsedConfig!.CompilerOptions = new Proxy(compilerOptions, {
    get(target, property, receiver) {
      if (property === "NoEmitForJsFiles") {
        throw failure;
      }
      return Reflect.get(target, property, receiver) as unknown;
    },
  });

  assert.throws(() => Program_getDeclarationDiagnosticsForFile(program, Background(), sourceFile), failure);
  assert.equal(lease.releaseCount(), 1);
});

test("Program.Emit releases its checker lease when a writer panics", () => {
  const traceFS = FromMap(new Map<string, string>([["/trace/.keep", ""]]), true as bool);
  const [tracing, startError] = StartTracing(traceFS, "/trace", "", true as bool);
  assert.equal(startError, undefined);
  if (tracing === undefined) {
    assert.fail("StartTracing returned nil without an error");
  }
  const { program, sourceFile } = focusedProgram(tracing);
  const lease = installLeaseTrackingPool(program, sourceFile);
  const failure = new globalThis.Error("write failure");

  assert.throws(
    () => Program_Emit(program, Background(), {
      TargetSourceFile: sourceFile,
      EmitOnly: EmitAll,
      WriteFile: () => {
        throw failure;
      },
    }),
    failure,
  );
  assert.equal(lease.releaseCount(), 1);
  assert.equal(Tracing_StopTracing(tracing), undefined);
  const [traceText, ok] = traceFS.ReadFile("/trace/trace.json");
  assert.equal(ok, true);
  const emitEvents = (JSON.parse(traceText) as Array<{ readonly ph: string; readonly name?: string }>).filter((event) => event.name === "emit");
  assert.equal(emitEvents.filter((event) => event.ph === "B").length, 2);
  assert.equal(emitEvents.filter((event) => event.ph === "E").length, 2);
});
