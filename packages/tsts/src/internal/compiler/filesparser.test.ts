import assert from "node:assert/strict";
import { test } from "node:test";

import type { bool } from "../../go/scalars.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import { TSTrue } from "../core/tristate.js";
import { NewParsedCommandLine } from "../tsoptions/parsedcommandline.js";
import { PhaseProgram, StartTracing, Tracing_StopTracing } from "../tracing/tracing.js";
import { FromMap } from "../vfs/vfstest/vfstest.js";
import { NewCompilerHost } from "./host.js";
import { NewProgram } from "./program.js";

interface TraceEventJSON {
  readonly ph: string;
  readonly cat: string;
  readonly name?: string;
  readonly args?: Readonly<Record<string, unknown>>;
}

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
    value: (): number => {
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
