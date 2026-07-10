import { test } from "node:test";
import assert from "node:assert/strict";
import type { byte, int } from "../../../go/scalars.js";
import type { GoError, GoSlice } from "../../../go/compat.js";
import type { Writer } from "../../../go/io.js";
import { Time } from "../../../go/time.js";
import { Program_as_compiler_ProgramLike } from "../../compiler/program.js";
import { createCompilerSessionFromFiles } from "../../../services/compiler-session.js";
import type { CompileTimes, System } from "./compile.js";
import { EmitAndReportStatistics } from "./emit.js";
import type { EmitInput } from "./emit.js";

class TextWriter implements Writer {
  readonly bytes: byte[] = [];

  Write(data: GoSlice<byte>): [int, GoError] {
    this.bytes.push(...data);
    return [data.length, undefined];
  }

  String(): string {
    return new globalThis.TextDecoder().decode(globalThis.Uint8Array.from(this.bytes));
  }
}

test("EmitAndReportStatistics shares totalTime with statisticsFromProgram", () => {
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    files: { "/src/index.ts": "const value = 1;" },
    rootFiles: ["/src/index.ts"],
    compilerOptions: {
      diagnostics: true,
      listFilesOnly: true,
      noLib: true,
    },
  });
  const writer = new TextWriter();
  const compileTimes: CompileTimes = {
    ConfigTime: 0,
    ParseTime: 0,
    bindTime: 0,
    checkTime: 0,
    totalTime: 0,
    emitTime: 0,
    BuildInfoReadTime: 0,
    ChangesComputeTime: 0,
  };
  let nowMilliseconds = 0;
  const system: System = {
    Writer: () => writer,
    FS: () => session.host.FS(),
    DefaultLibraryPath: () => session.host.DefaultLibraryPath(),
    GetCurrentDirectory: () => session.host.GetCurrentDirectory(),
    WriteOutputIsTTY: () => false,
    GetWidthOfTerminal: () => 80,
    GetEnvironmentVariable: () => "",
    Now: () => new Time(nowMilliseconds++),
    SinceStart: () => 2_000_000_000,
  };
  const input: EmitInput = {
    Sys: system,
    ProgramLike: Program_as_compiler_ProgramLike(session.program),
    Program: session.program,
    Config: session.config,
    ReportDiagnostic: () => {},
    ReportErrorSummary: () => {},
    Writer: writer,
    WriteFile: undefined,
    CompileTimes: compileTimes,
    Testing: undefined,
    TestingMTimesCache: undefined,
    Tracing: undefined,
  };

  let gcCalls = 0;
  const previousGCDescriptor = globalThis.Object.getOwnPropertyDescriptor(globalThis, "gc");
  globalThis.Reflect.defineProperty(globalThis, "gc", {
    configurable: true,
    value: () => {
      gcCalls++;
    },
  });
  const [result, statistics] = (() => {
    try {
      return EmitAndReportStatistics(input);
    } finally {
      if (previousGCDescriptor === undefined) {
        globalThis.Reflect.deleteProperty(globalThis, "gc");
      } else {
        globalThis.Reflect.defineProperty(globalThis, "gc", previousGCDescriptor);
      }
    }
  })();

  assert.equal(result.times, compileTimes);
  assert.equal(compileTimes.totalTime, 2_000_000_000);
  assert.equal(gcCalls, 2);
  assert.ok(statistics !== undefined);
  assert.equal(statistics.compileTimes, compileTimes);
  const report = writer.String();
  assert.match(report, /Memory used:\s+\d+K/);
  assert.match(report, /Memory allocs:\s+0/);
  assert.match(report, /Total time:\s+2\.000s/);
});
