import assert from "node:assert/strict";
import { test } from "node:test";

import type { bool } from "../../go/scalars.js";
import { Mutex } from "../../go/sync.js";
import { Int32 } from "../../go/sync/atomic.js";
import { NewNodeFactory } from "../ast/spine.js";
import { ResolutionModeNone } from "../core/compileroptions.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import { TSTrue } from "../core/tristate.js";
import { NewParsedCommandLine } from "../tsoptions/parsedcommandline.js";
import type { ParsedCommandLine } from "../tsoptions/parsedcommandline.js";
import { PhaseProgram, StartTracing, Tracing_StopTracing } from "../tracing/tracing.js";
import type { Tracing } from "../tracing/tracing.js";
import { FromMap } from "../vfs/vfstest/vfstest.js";
import { parseTask_loadAutomaticTypeDirectives } from "./filesparser.js";
import type { parseTask } from "./filesparser.js";
import type { fileLoader } from "./fileloader.js";
import { NewCompilerHost } from "./host.js";
import type { CompilerHost } from "./host.js";
import { NewProgram } from "./program.js";

interface TraceEventJSON {
  readonly ph: string;
  readonly cat: string;
  readonly name?: string;
  readonly args?: Readonly<Record<string, unknown>>;
}

function newConfig(types: string[]): ParsedCommandLine {
  const compilerOptions = {} as CompilerOptions;
  compilerOptions.Types = types;
  const config = NewParsedCommandLine(
    compilerOptions,
    [],
    { UseCaseSensitiveFileNames: true, CurrentDirectory: "/src" },
  );
  assert.ok(config !== undefined);
  return config;
}

function newAutomaticTypeDirectiveTask(): parseTask {
  return {
    normalizedFilePath: "/src/index.ts",
    path: "",
    file: undefined,
    libFile: undefined,
    redirectedParseTask: undefined,
    subTasks: [],
    loaded: false,
    startedSubTasks: false,
    isForAutomaticTypeDirective: true,
    includeReason: undefined,
    packageId: { Name: "", SubModuleName: "", Version: "", PeerDependencies: "" },
    metadata: { ImpliedNodeFormat: ResolutionModeNone, PackageJsonType: "", PackageJsonDirectory: "" },
    resolutionsInFile: undefined,
    resolutionsTrace: [],
    typeResolutionsInFile: undefined,
    typeResolutionsTrace: [],
    resolutionDiagnostics: [],
    processingDiagnostics: [],
    importHelpersImportSpecifier: undefined,
    jsxRuntimeImportSpecifier: undefined,
    increaseDepth: false,
    elideOnDepth: false,
    loadedTask: undefined,
    allIncludeReasons: [],
  };
}

function newLoader(config: ParsedCommandLine, host: CompilerHost, tracing: Tracing): fileLoader {
  const factory = NewNodeFactory({});
  assert.ok(factory !== undefined);
  return {
    opts: { Config: config, Host: host, Tracing: tracing },
    resolver: undefined,
    defaultLibraryPath: "",
    comparePathsOptions: { UseCaseSensitiveFileNames: true, CurrentDirectory: "/src" },
    supportedExtensions: [],
    supportedExtensionsWithJsonIfResolveJsonModule: [],
    filesParser: undefined,
    rootTasks: [],
    totalFileCount: new Int32(),
    libFileCount: new Int32(),
    factoryMu: new Mutex(),
    factory,
    projectReferenceFileMapper: undefined,
    dtsDirectories: { M: undefined },
    pathForLibFileCache: {},
    pathForLibFileResolutions: {},
  };
}

test("automatic type-directive tracing closes events on success and panic", () => {
  const fileSystem = FromMap(new globalThis.Map<string, string>([
    ["/trace/.keep", ""],
  ]), true);
  const [tracing, startError] = StartTracing(fileSystem, "/trace", "", false);
  assert.equal(startError, undefined);
  assert.ok(tracing !== undefined);

  const host = NewCompilerHost("/src", fileSystem, "/lib", undefined, undefined);
  const originalNow = globalThis.Object.getOwnPropertyDescriptor(globalThis.performance, "now");
  let now = 0;
  globalThis.Object.defineProperty(globalThis.performance, "now", {
    configurable: true,
    value: (): number => {
      now += 20;
      return now;
    },
  });
  let stopError: ReturnType<typeof Tracing_StopTracing>;
  try {
    const successTask = newAutomaticTypeDirectiveTask();
    parseTask_loadAutomaticTypeDirectives(successTask, newLoader(newConfig([]), host, tracing));
    assert.equal(successTask.typeResolutionsInFile, undefined);
    assert.deepEqual(successTask.typeResolutionsTrace, []);
    assert.deepEqual(successTask.processingDiagnostics, []);
    assert.deepEqual(successTask.subTasks, []);

    const panic = { name: "automatic type directive panic" };
    const failingHost: CompilerHost = {
      ...host,
      GetCurrentDirectory: (): string => {
        throw panic;
      },
    };
    assert.throws(
      () => parseTask_loadAutomaticTypeDirectives(
        newAutomaticTypeDirectiveTask(),
        newLoader(newConfig(["*"]), failingHost, tracing),
      ),
      (error) => error === panic,
    );
  } finally {
    if (originalNow === undefined) {
      globalThis.Reflect.deleteProperty(globalThis.performance, "now");
    } else {
      globalThis.Object.defineProperty(globalThis.performance, "now", originalNow);
    }
    stopError = Tracing_StopTracing(tracing);
  }

  assert.equal(stopError, undefined);
  const [traceText, traceExists] = fileSystem.ReadFile("/trace/trace.json");
  assert.equal(traceExists, true);
  const events = globalThis.JSON.parse(traceText) as TraceEventJSON[];
  const typeReferenceEvents = events.filter((event) =>
    event.ph === "X" && event.cat === PhaseProgram && event.name === "processTypeReferences"
  );
  assert.equal(typeReferenceEvents.length, 2);
  for (const event of typeReferenceEvents) {
    assert.equal("args" in event, false);
  }
});

test("files parser traces ordinary and automatic type-directive tasks", () => {
  const fileSystem = FromMap(new globalThis.Map<string, string>([
    ["/src/index.ts", "export const value = 1;"],
    ["/trace/.keep", ""],
  ]), true as bool);
  const [tracing, startError] = StartTracing(fileSystem, "/trace", "", false as bool);
  assert.equal(startError, undefined);
  assert.notEqual(tracing, undefined);

  const originalNow = globalThis.Object.getOwnPropertyDescriptor(globalThis.performance, "now");
  let now = 0;
  globalThis.Object.defineProperty(globalThis.performance, "now", {
    configurable: true,
    value(): number {
      now += 20;
      return now;
    },
  });
  try {
    const compilerOptions = {} as CompilerOptions;
    compilerOptions.NoLib = TSTrue;
    compilerOptions.Types = [];
    const config = NewParsedCommandLine(
      compilerOptions,
      ["/src/index.ts"],
      { UseCaseSensitiveFileNames: true as bool, CurrentDirectory: "/src" },
    );
    NewProgram({
      Config: config,
      Host: NewCompilerHost("/src", fileSystem, "/lib", undefined, undefined),
      Tracing: tracing,
    });
  } finally {
    if (originalNow === undefined) {
      globalThis.Reflect.deleteProperty(globalThis.performance, "now");
    } else {
      globalThis.Object.defineProperty(globalThis.performance, "now", originalNow);
    }
  }

  assert.equal(Tracing_StopTracing(tracing), undefined);
  const [traceText, traceExists] = fileSystem.ReadFile("/trace/trace.json");
  assert.equal(traceExists, true);
  const events = globalThis.JSON.parse(traceText) as TraceEventJSON[];

  const typeReferenceEvents = events.filter((event) =>
    event.ph === "X" && event.cat === PhaseProgram && event.name === "processTypeReferences"
  );
  assert.equal(typeReferenceEvents.length, 1);
  assert.equal("args" in typeReferenceEvents[0]!, false);

  const sourceFileEvents = events.filter((event) =>
    event.ph === "X" && event.cat === PhaseProgram && event.name === "findSourceFile"
  );
  assert.equal(sourceFileEvents.length, 1);
  assert.deepEqual(sourceFileEvents[0]!.args, { fileName: "/src/index.ts" });
});
