import assert from "node:assert/strict";
import { test } from "node:test";

import type { bool } from "../../go/scalars.js";
import type { SourceFileParseOptions } from "../ast/parseoptions.js";
import { ScriptKindTS } from "../core/scriptkind.js";
import { ParseSourceFile } from "../parser/parser/statements-declarations.js";
import { StartTracing, Tracing_StopTracing } from "../tracing/tracing.js";
import type { Tracing } from "../tracing/tracing.js";
import { FromMap } from "../vfs/vfstest/vfstest.js";
import type { EmitHost } from "./emitHost.js";
import {
  EmitAll,
  emitter_emit,
  emitter_runDeclarationTransformers,
  emitter_runScriptTransformers,
} from "./emitter.js";
import type { emitter } from "./emitter.js";

interface TraceEventJson {
  readonly ph: string;
  readonly name?: string;
}

function sourceFile() {
  return ParseSourceFile(
    { FileName: "/src/index.ts", Path: "/src/index.ts" } satisfies SourceFileParseOptions,
    "export const value = 1;",
    ScriptKindTS,
  );
}

function throwingEmitter(tracing: Tracing, failure: globalThis.Error, delayMilliseconds = 0): emitter {
  const fail = (): never => {
    if (delayMilliseconds > 0) {
      const start = globalThis.performance.now();
      while (globalThis.performance.now() - start < delayMilliseconds) {
        globalThis.performance.now();
      }
    }
    throw failure;
  };
  const host = {
    __tsgoEmbedded0: { Options: fail },
    __tsgoEmbedded1: {},
    Options: fail,
  } as unknown as EmitHost;
  return {
    host,
    emitOnly: EmitAll,
    emitterDiagnostics: undefined,
    writer: undefined,
    paths: {
      jsFilePath: "/src/index.js",
      sourceMapFilePath: "",
      declarationFilePath: "",
      declarationMapPath: "",
    },
    sourceFile: sourceFile(),
    emitResult: { EmitSkipped: false as bool, Diagnostics: undefined, EmittedFiles: undefined, SourceMaps: undefined },
    writeFile: undefined,
    tr: tracing,
  } as unknown as emitter;
}

function traceEvents(deterministic: bool, run: (tracing: Tracing) => void): TraceEventJson[] {
  const fs = FromMap(new Map<string, string>([["/trace/.keep", ""]]), true as bool);
  const [tracing, startError] = StartTracing(fs, "/trace", "", deterministic);
  assert.equal(startError, undefined);
  if (tracing === undefined) {
    assert.fail("StartTracing returned nil without an error");
  }
  run(tracing);
  assert.equal(Tracing_StopTracing(tracing), undefined);
  const [traceText, ok] = fs.ReadFile("/trace/trace.json");
  assert.equal(ok, true);
  return JSON.parse(traceText) as TraceEventJson[];
}

test("emitter.emit closes its duration trace when emitting throws", () => {
  const failure = new globalThis.Error("emit failure");
  const events = traceEvents(true as bool, (tracing) => {
    const candidate = throwingEmitter(tracing, failure);
    assert.throws(() => emitter_emit(candidate), failure);
  });

  assert.deepEqual(events.filter((event) => event.name === "emit").map((event) => event.ph), ["B", "E"]);
});

for (const [name, run] of [
  ["script", (candidate: emitter): void => {
    emitter_runScriptTransformers(candidate, undefined, candidate.sourceFile);
  }],
  ["declaration", (candidate: emitter): void => {
    emitter_runDeclarationTransformers(candidate, undefined, candidate.sourceFile, "/src/index.d.ts", "");
  }],
] as const) {
  test(`${name} transformer tracing closes its sampled span when setup throws`, () => {
    const failure = new globalThis.Error(`${name} transformer failure`);
    const events = traceEvents(false as bool, (tracing) => {
      const candidate = throwingEmitter(tracing, failure, 12);
      assert.throws(() => run(candidate), failure);
    });

    assert.equal(events.filter((event) => event.name === "transformNodes" && event.ph === "X").length, 1);
  });
}
