import { test } from "node:test";
import assert from "node:assert/strict";
import { Background } from "../../../go/context.js";
import { Map as SyncMapImpl } from "../../../go/sync.js";
import { Bool } from "../../../go/sync/atomic.js";
import { Mutex } from "../../../go/sync.js";
import { Time, UnixMilli } from "../../../go/time.js";
import type { SyncMap } from "../../collections/syncmap.js";
import { SyncMap_Store } from "../../collections/syncmap.js";
import { HandleNoEmitOnError } from "../../compiler/program.js";
import type { ProgramLike } from "../../compiler/program.js";
import type { CompilerOptions } from "../../core/compileroptions.js";
import { TSFalse, TSTrue, TSUnknown } from "../../core/tristate.js";
import { Version } from "../../core/version.js";
import { NewParsedCommandLine } from "../../tsoptions/parsedcommandline.js";
import type { ParsedBuildCommandLine } from "../../tsoptions/parsedbuildcommandline.js";
import { ToPath } from "../../tspath/path.js";
import type { Path } from "../../tspath/path.js";
import { NewBuildInfo } from "../incremental/buildInfo.js";
import type { BuildInfoFileInfo } from "../incremental/buildInfo.js";
import { BuildTask_getUpToDateStatus } from "./buildtask.js";
import type { BuildTask } from "./buildtask.js";
import type { host } from "./host.js";
import type { Orchestrator } from "./orchestrator.js";
import { upToDateStatusTypeInputFileMissing } from "./uptodatestatus.js";

function newSyncMap<Key, Value>(): SyncMap<Key, Value> {
  return { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncMapImpl() };
}

function compactFileInfo(signature: string): BuildInfoFileInfo {
  return { signature, noSignature: undefined, fileInfo: undefined };
}

function noEmitOnErrorProgram(value: number): ProgramLike {
  return {
    Options: () => ({ NoEmitOnError: value } as CompilerOptions),
    GetSourceFile: () => undefined,
    GetSourceFiles: () => [],
    GetConfigFileParsingDiagnostics: () => [],
    GetSyntacticDiagnostics: () => [],
    GetBindDiagnostics: () => [],
    GetProgramDiagnostics: () => [],
    GetGlobalDiagnostics: () => [],
    GetSemanticDiagnostics: () => [],
    GetDeclarationDiagnostics: () => [],
    GetSuggestionDiagnostics: () => [],
    Emit: () => undefined,
    CommonSourceDirectory: () => "",
    IsSourceFileDefaultLibrary: () => false,
    Program: () => undefined,
  };
}

test("NoEmitOnError only blocks the true tristate", () => {
  assert.equal(HandleNoEmitOnError(Background(), noEmitOnErrorProgram(TSUnknown), undefined), undefined);
  assert.equal(HandleNoEmitOnError(Background(), noEmitOnErrorProgram(TSFalse), undefined), undefined);

  let queriedDiagnostics = false;
  const trueProgram = noEmitOnErrorProgram(TSTrue);
  trueProgram.GetConfigFileParsingDiagnostics = () => {
    queriedDiagnostics = true;
    return [];
  };
  HandleNoEmitOnError(Background(), trueProgram, undefined);
  assert.equal(queriedDiagnostics, true);
});

test("up-to-date checking scans non-root build-info FileInfos", () => {
  const currentDirectory = "/work";
  const buildInfoFileName = "/work/project.tsbuildinfo";
  const rootFileName = "/work/root.ts";
  const dependencyFileName = "/work/dependency.ts";
  const comparePathsOptions = { CurrentDirectory: currentDirectory, UseCaseSensitiveFileNames: true };
  const compilerOptions = {
    Build: TSTrue,
    Incremental: TSFalse,
    NoCheck: TSFalse,
    NoEmit: TSFalse,
    TsBuildInfoFile: buildInfoFileName,
  } as CompilerOptions;
  const resolved = NewParsedCommandLine(compilerOptions, [rootFileName], comparePathsOptions);

  const buildInfo = NewBuildInfo();
  buildInfo.Version = Version();
  buildInfo.Root = [{ Start: 1, End: 0, NonIncremental: "" }];
  buildInfo.FileNames = ["./root.ts", "./dependency.ts"];
  buildInfo.FileInfos = [compactFileInfo("root-hash"), compactFileInfo("dependency-hash")];

  const orchestrator = {
    opts: {
      Command: {
        BuildOptions: { StopBuildOnErrors: TSFalse, Force: TSFalse },
      } as ParsedBuildCommandLine,
      Testing: undefined,
    },
    comparePathsOptions,
  } as Orchestrator;
  const buildHost = {
    orchestrator,
    mTimes: newSyncMap<Path, Time>(),
  } as host;
  orchestrator.host = buildHost;

  SyncMap_Store(buildHost.mTimes, ToPath(rootFileName, currentDirectory, true), UnixMilli(5));
  SyncMap_Store(buildHost.mTimes, ToPath(dependencyFileName, currentDirectory, true), new Time());

  const task = {
    config: "/work/tsconfig.json",
    resolved,
    upStream: [],
    downStream: [],
    status: undefined,
    done: undefined,
    result: undefined,
    prevReporter: undefined,
    reportDone: undefined,
    buildInfoEntry: {
      buildInfo,
      path: ToPath(buildInfoFileName, currentDirectory, true),
      mTime: UnixMilli(10),
      dtsTime: undefined,
    },
    buildInfoEntryMu: new Mutex(),
    packageJsons: [],
    errors: [],
    pending: new Bool(),
    isInitialCycle: true,
    downStreamUpdateMu: new Mutex(),
    dirty: false,
  } as BuildTask;

  const status = BuildTask_getUpToDateStatus(task, orchestrator, ToPath(task.config, currentDirectory, true));
  assert.equal(status!.kind, upToDateStatusTypeInputFileMissing);
  assert.equal(status!.data, dependencyFileName);
});
