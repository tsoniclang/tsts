import assert from "node:assert/strict";
import { test } from "node:test";

import type { bool } from "../../go/scalars.js";
import { FromMap } from "../vfs/vfstest/vfstest.js";
import type { FS } from "../vfs/vfs.js";
import {
  PhaseCheck,
  PhaseCheckTypes,
  PhaseEmit,
  PhaseParse,
  StartTracing,
  Tracing_NewTypeTracer,
  Tracing_Push,
  Tracing_StopTracing,
  traceThreadKeyFromArgs,
} from "./tracing.js";

interface TraceEventJson {
  readonly pid: number;
  readonly tid: number;
  readonly ph: string;
  readonly cat: string;
  readonly ts: number;
  readonly name?: string;
  readonly args?: Readonly<Record<string, unknown>>;
}

function createTraceFS(): FS {
  return FromMap(new Map<string, string>([["/trace/.keep", ""]]), true as bool);
}

function readJson<T>(fs: FS, path: string): T {
  const [text, ok] = fs.ReadFile(path);
  assert.equal(ok, true, `expected ${path} to exist`);
  return JSON.parse(text) as T;
}

function startTrace(fs: FS) {
  const [tracing, error] = StartTracing(fs, "/trace", "", true as bool);
  assert.equal(error, undefined);
  assert.notEqual(tracing, undefined);
  return tracing;
}

function findEvent(events: readonly TraceEventJson[], phase: string, name: string, argumentName: string, argumentValue: unknown): TraceEventJson {
  const event = events.find((candidate) => candidate.ph === phase && candidate.name === name && candidate.args?.[argumentName] === argumentValue);
  if (event === undefined) {
    assert.fail(`expected ${phase} event ${name} with ${argumentName}=${String(argumentValue)}`);
  }
  return event;
}

test("concurrent duration events use stable separate thread IDs", () => {
  const fs = createTraceFS();
  const tracing = startTrace(fs);

  const endA = Tracing_Push(tracing, PhaseParse, "createSourceFile", new Map([["path", "/a.ts"]]), true as bool);
  const endB = Tracing_Push(tracing, PhaseParse, "createSourceFile", new Map([["path", "/b.ts"]]), true as bool);
  endA();
  endB();

  const endCheck = Tracing_Push(tracing, PhaseCheck, "checkSourceFile", new Map<string, unknown>([["checkerId", 0], ["path", "/a.ts"]]), true as bool);
  const endVariance = Tracing_Push(tracing, PhaseCheckTypes, "getVariancesWorker", new Map<string, unknown>([["checkerId", 0], ["id", 1]]), true as bool);
  endVariance();
  endCheck();

  assert.equal(Tracing_StopTracing(tracing), undefined);
  const events = readJson<TraceEventJson[]>(fs, "/trace/trace.json");
  const aBegin = findEvent(events, "B", "createSourceFile", "path", "/a.ts");
  const aEnd = findEvent(events, "E", "createSourceFile", "path", "/a.ts");
  const bBegin = findEvent(events, "B", "createSourceFile", "path", "/b.ts");
  const bEnd = findEvent(events, "E", "createSourceFile", "path", "/b.ts");
  assert.equal(aBegin.tid, aEnd.tid);
  assert.equal(bBegin.tid, bEnd.tid);
  assert.notEqual(aBegin.tid, bBegin.tid);

  const checkBegin = findEvent(events, "B", "checkSourceFile", "path", "/a.ts");
  const varianceBegin = findEvent(events, "B", "getVariancesWorker", "id", 1);
  assert.equal(checkBegin.tid, varianceBegin.tid);
  assert.equal(events.some((event) => event.ph === "M" && event.name === "thread_name" && event.tid === checkBegin.tid && event.args?.name === "checker:0"), true);
});

test("thread IDs are stable across first-seen order", () => {
  const traceThreadIDsForPaths = (paths: readonly string[]): Readonly<Record<string, number>> => {
    const fs = createTraceFS();
    const tracing = startTrace(fs);
    for (const path of paths) {
      Tracing_Push(tracing, PhaseParse, "createSourceFile", new Map([["path", path]]), true as bool)();
    }
    assert.equal(Tracing_StopTracing(tracing), undefined);
    const events = readJson<TraceEventJson[]>(fs, "/trace/trace.json");
    return Object.fromEntries(paths.map((path) => [path, findEvent(events, "B", "createSourceFile", "path", path).tid]));
  };

  assert.deepEqual(traceThreadIDsForPaths(["/a.ts", "/b.ts"]), traceThreadIDsForPaths(["/b.ts", "/a.ts"]));
});

test("nil trace argument maps remain nil and JSON tags are exact", () => {
  const fs = createTraceFS();
  const tracing = startTrace(fs);
  const [emptyKey, hasKey] = traceThreadKeyFromArgs(undefined);
  assert.deepEqual(emptyKey, { kind: "", text: "", index: 0, hasIndex: false });
  assert.equal(hasKey, false);

  Tracing_Push(tracing, PhaseEmit, "nilArgs", undefined, true as bool)();
  Tracing_NewTypeTracer(tracing, 3);
  assert.equal(Tracing_StopTracing(tracing), undefined);

  const events = readJson<Array<Record<string, unknown>>>(fs, "/trace/trace.json");
  const nilEvents = events.filter((event) => event.name === "nilArgs");
  assert.equal(nilEvents.length, 2);
  for (const event of nilEvents) {
    assert.equal("args" in event, false);
    assert.equal("Args" in event, false);
    assert.equal("PID" in event, false);
    assert.deepEqual(Object.keys(event), ["pid", "tid", "ph", "cat", "ts", "name"]);
  }

  assert.deepEqual(readJson(fs, "/trace/legend.json"), [{
    tracePath: "/trace/trace.json",
    typesPath: "/trace/types_3.json",
    checkerId: 3,
  }]);
});
