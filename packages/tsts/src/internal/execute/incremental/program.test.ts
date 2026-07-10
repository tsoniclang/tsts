import { test } from "node:test";
import assert from "node:assert/strict";
import type { GoPtr } from "../../../go/compat.js";
import { Background } from "../../../go/context.js";
import { Map as SyncMapImpl, Once } from "../../../go/sync.js";
import { Bool } from "../../../go/sync/atomic.js";
import type { SourceFile } from "../../ast/ast.js";
import { Diagnostic_Code, Diagnostic_MessageArgs } from "../../ast/diagnostic.js";
import { SyncMap_Store } from "../../collections/syncmap.js";
import type { CompilerHost } from "../../compiler/host.js";
import type { EmitOptions, Program as CompilerProgram } from "../../compiler/program.js";
import type { CompilerOptions } from "../../core/compileroptions.js";
import { TSFalse, TSTrue } from "../../core/tristate.js";
import * as diagnostics from "../../diagnostics/generated/messages.js";
import { Message_Code } from "../../diagnostics/diagnostics.js";
import { NewInfoCache } from "../../packagejson/cache.js";
import type { InfoCacheEntry, PackageJson } from "../../packagejson/cache.js";
import {
  NewParsedCommandLine,
  ParsedCommandLine_CompilerOptions,
} from "../../tsoptions/parsedcommandline.js";
import type { ParsedCommandLine } from "../../tsoptions/parsedcommandline.js";
import type { Path } from "../../tspath/path.js";
import type { FS } from "../../vfs/vfs.js";
import type { SyncMap } from "../../collections/syncmap.js";
import { Program_emitBuildInfo, Program_ensurePackageJsonsForState } from "./program.js";
import type { Program } from "./program.js";
import type { snapshot } from "./snapshot.js";

function newSyncMap<Key, Value>(): SyncMap<Key, Value> {
  return { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncMapImpl() };
}

interface PackageJsonEntrySpec {
  key: Path;
  directory: string;
  exists: boolean;
}

function packageJsonProgram(
  entries: readonly PackageJsonEntrySpec[],
  packageJsons: Array<string> | undefined,
  missingPackageJsons: Array<string> | undefined,
  packageJsonsFromOldState: Array<string> | undefined = undefined,
  missingPackageJsonsFromOldState: Array<string> | undefined = undefined,
): { program: Program; state: snapshot } {
  const infoCache = NewInfoCache("/work", true)!;
  for (const entry of entries) {
    const value: InfoCacheEntry = {
      PackageDirectory: entry.directory,
      DirectoryExists: false,
      Contents: entry.exists ? {} as PackageJson : undefined,
    };
    SyncMap_Store<Path, GoPtr<InfoCacheEntry>>(infoCache.cache, entry.key, value);
  }
  const fileSystem = {
    UseCaseSensitiveFileNames: () => true,
    Realpath: (path: string) => path,
  } as FS;
  const compilerHost: CompilerHost = {
    FS: () => fileSystem,
    DefaultLibraryPath: () => "/lib",
    GetCurrentDirectory: () => "/work",
    Trace: () => {},
    GetSourceFile: () => undefined,
    GetResolvedProjectReference: () => undefined,
  };
  const commandLine = {
    ConfigFile: { SourceFile: { parseOptions: { FileName: "/work/tsconfig.json" } } as SourceFile },
  } as ParsedCommandLine;
  const compilerProgram = {
    opts: { Host: compilerHost, Config: commandLine },
    __tsgoEmbedded0: {
      resolver: { __tsgoEmbedded0: { packageJsonInfoCache: infoCache } },
    },
  } as CompilerProgram;
  const state = {
    packageJsons,
    missingPackageJsons,
    packageJsonsFromOldState,
    missingPackageJsonsFromOldState,
  } as snapshot;
  return {
    program: {
      snapshot: state,
      program: compilerProgram,
      host: undefined!,
      testingData: undefined,
    } as Program,
    state,
  };
}

test("package-json state accumulation keeps its owned arrays", () => {
  const packageJsons: Array<string> = [];
  const missingPackageJsons: Array<string> = [];
  const entries: Array<PackageJsonEntrySpec> = [];
  for (let index = 0; index < 512; index++) {
    const kind = index % 2 === 0 ? "present" : "missing";
    const directory = `/work/node_modules/${kind}-${index.toString().padStart(4, "0")}`;
    entries.push({ key: `${directory}/package.json` as Path, directory, exists: kind === "present" });
  }
  const { program, state } = packageJsonProgram(entries, packageJsons, missingPackageJsons);

  Program_ensurePackageJsonsForState(program);

  assert.equal(state.packageJsons, packageJsons);
  assert.equal(state.missingPackageJsons, missingPackageJsons);
  assert.equal(packageJsons.length, 256);
  assert.equal(missingPackageJsons.length, 256);
});

test("package-json state accumulation does not mutate old-state aliases", () => {
  const packageJsonsFromOldState = ["/old/node_modules/present/package.json"];
  const missingPackageJsonsFromOldState = ["/old/node_modules/missing/package.json"];
  const entries: Array<PackageJsonEntrySpec> = [
    { key: "/cache/present-a" as Path, directory: "/work/node_modules/present", exists: true },
    { key: "/cache/present-b" as Path, directory: "/work/node_modules/present", exists: true },
    { key: "/cache/missing-a" as Path, directory: "/work/node_modules/missing", exists: false },
    { key: "/cache/missing-b" as Path, directory: "/work/node_modules/missing", exists: false },
  ];
  const { program, state } = packageJsonProgram(
    entries,
    undefined,
    undefined,
    packageJsonsFromOldState,
    missingPackageJsonsFromOldState,
  );

  Program_ensurePackageJsonsForState(program);

  assert.deepEqual(packageJsonsFromOldState, ["/old/node_modules/present/package.json"]);
  assert.deepEqual(missingPackageJsonsFromOldState, ["/old/node_modules/missing/package.json"]);
  assert.notEqual(state.packageJsons, packageJsonsFromOldState);
  assert.notEqual(state.missingPackageJsons, missingPackageJsonsFromOldState);
  assert.deepEqual(state.packageJsons, ["/work/node_modules/present/package.json"]);
  assert.deepEqual(state.missingPackageJsons, ["/work/node_modules/missing/package.json"]);
});

test("build-info write failures return the Go compiler diagnostic", () => {
  const buildInfoFileName = "/work/project.tsbuildinfo";
  const fileSystem = {
    UseCaseSensitiveFileNames: () => true,
  } as FS;
  const compilerHost: CompilerHost = {
    FS: () => fileSystem,
    DefaultLibraryPath: () => "/lib",
    GetCurrentDirectory: () => "/work",
    Trace: () => {},
    GetSourceFile: () => undefined,
    GetResolvedProjectReference: () => undefined,
  };
  const requestedOptions = {
    Build: TSTrue,
    Incremental: TSFalse,
    TsBuildInfoFile: buildInfoFileName,
  } as CompilerOptions;
  const commandLine = NewParsedCommandLine(
    requestedOptions,
    [],
    { CurrentDirectory: "/work", UseCaseSensitiveFileNames: true },
  );
  const options = ParsedCommandLine_CompilerOptions(commandLine)!;
  const compilerProgram = {
    opts: { Host: compilerHost, Config: commandLine },
    hasEmitBlockingDiagnostics: { M: new Map() },
  } as CompilerProgram;
  const buildInfoEmitPending = new Bool();
  buildInfoEmitPending.Store(true);
  const state = {
    fileInfos: newSyncMap(),
    options,
    referencedMap: {
      references: newSyncMap(),
      referencedBy: new Map(),
      referenceBy: new Once(),
    },
    semanticDiagnosticsPerFile: newSyncMap(),
    emitDiagnosticsPerFile: newSyncMap(),
    changedFilesSet: { m: newSyncMap() },
    affectedFilesPendingEmit: newSyncMap(),
    emitSignatures: newSyncMap(),
    hasErrors: TSFalse,
    hasSemanticErrors: false,
    checkPending: false,
    packageJsons: [],
    missingPackageJsons: [],
    buildInfoEmitPending,
    latestChangedDtsFile: "",
    hasErrorsFromOldState: TSFalse,
    hasSemanticErrorsFromOldState: false,
    allFilesExcludingDefaultLibraryFileOnce: new Once(),
    packageJsonsFromOldState: [],
    missingPackageJsonsFromOldState: [],
    allFilesExcludingDefaultLibraryFile: [],
    hasChangedDtsFile: false,
    hasEmitDiagnostics: false,
    hashWithText: false,
  } as snapshot;
  const program = {
    snapshot: state,
    program: compilerProgram,
    host: undefined!,
    testingData: undefined,
  } as Program;
  const emitOptions = {
    TargetSourceFile: undefined,
    EmitOnly: 0,
    WriteFile: () => new Error("disk full"),
  } as EmitOptions;

  const result = Program_emitBuildInfo(program, Background(), emitOptions);

  assert.equal(result!.EmitSkipped, true);
  assert.equal(result!.Diagnostics.length, 1);
  assert.equal(Diagnostic_Code(result!.Diagnostics[0]), Message_Code(diagnostics.Could_not_write_file_0_Colon_1));
  assert.deepEqual(Diagnostic_MessageArgs(result!.Diagnostics[0]), [buildInfoFileName, "disk full"]);
  assert.equal(buildInfoEmitPending.Load(), true);
});
