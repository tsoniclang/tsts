import test from "node:test";
import assert from "node:assert/strict";

import {
  createHost,
  BuildHost,
  BuildInfo,
  BuildInfoDiagnosticsOfFile,
  BuildInfoEmitSignature,
  BuildInfoFileInfo,
  BuildInfoFilePendingEmit,
  BuildInfoReferenceMapEntry,
  BuildInfoResolvedRoot,
  BuildInfoRoot,
  BuildInfoSemanticDiagnostic,
  Colors,
  createColors,
  createDiagnosticReporter,
  createReportErrorSummary,
  defaultIsPretty,
  ExitStatus,
  ExtendedConfigCache,
  FileAndTime,
  FileEmitKind,
  formatDuration,
  InputOutputFileAndTime,
  InputOutputName,
  ParseCache,
  ReferenceMap,
  Statistics,
  UpstreamErrors,
  UpToDateStatus,
  UpToDateStatusType,
  type CompilerOptionsLike,
  type ExtendedConfigHost,
  type TextWriter,
} from "./index.js";
import { MemoryFS } from "../vfs/index.js";

interface TestSourceFile {
  readonly fileName: string;
}

interface TestParsedCommandLine {
  readonly configFileName: string;
}

interface TestBuildInfo {
  readonly name: string;
}

class StringWriter implements TextWriter {
  text = "";

  write(text: string): void {
    this.text += text;
  }
}

class TestSystem {
  readonly fsValue = new MemoryFS();
  readonly env = new Map<string, string>();
  readonly writerValue = new StringWriter();
  readonly started = new Date(1000);
  tty = false;

  writer(): TextWriter {
    return this.writerValue;
  }

  fs(): MemoryFS {
    return this.fsValue;
  }

  defaultLibraryPath(): string {
    return "/lib";
  }

  getCurrentDirectory(): string {
    return "/repo";
  }

  writeOutputIsTTY(): boolean {
    return this.tty;
  }

  getWidthOfTerminal(): number {
    return 120;
  }

  getEnvironmentVariable(name: string): string {
    return this.env.get(name) ?? "";
  }

  now(): Date {
    return new Date(2000);
  }

  sinceStart(): number {
    return this.now().getTime() - this.started.getTime();
  }
}

test("error and pseudo status classification matches tsgo", () => {
  assert.ok(new UpToDateStatus(UpToDateStatusType.ConfigFileNotFound).isError());
  assert.ok(new UpToDateStatus(UpToDateStatusType.BuildErrors).isError());
  assert.ok(new UpToDateStatus(UpToDateStatusType.UpstreamErrors).isError());
  assert.ok(!new UpToDateStatus(UpToDateStatusType.UpToDate).isError());

  assert.ok(new UpToDateStatus(UpToDateStatusType.UpToDateWithUpstreamTypes).isPseudoBuild());
  assert.ok(new UpToDateStatus(UpToDateStatusType.UpToDateWithInputFileText).isPseudoBuild());
  assert.ok(!new UpToDateStatus(UpToDateStatusType.InputFileNewer).isPseudoBuild());
});

test("oldest output name uses the same payload precedence as tsgo", () => {
  const byFileTime = new UpToDateStatus(
    UpToDateStatusType.UpToDateWithUpstreamTypes,
    new InputOutputFileAndTime(
      new FileAndTime("src/a.ts", new Date(10)),
      new FileAndTime("lib/a.d.ts", new Date(20)),
      "tsconfig.tsbuildinfo",
    ),
  );
  assert.strictEqual(byFileTime.oldestOutputFileName(), "lib/a.d.ts");

  const byName = new UpToDateStatus(
    UpToDateStatusType.UpToDateWithInputFileText,
    new InputOutputName("src/b.ts", "lib/b.js"),
  );
  assert.strictEqual(byName.oldestOutputFileName(), "lib/b.js");

  const byString = new UpToDateStatus(UpToDateStatusType.UpToDate, "lib/index.js");
  assert.strictEqual(byString.oldestOutputFileName(), "lib/index.js");
});

test("upstream error payload is available on upstream error status", () => {
  const status = new UpToDateStatus(
    UpToDateStatusType.UpstreamErrors,
    new UpstreamErrors("../core/tsconfig.json", true),
  );
  const errors = status.upstreamErrors();
  assert.strictEqual(errors.ref, "../core/tsconfig.json");
  assert.ok(errors.refHasUpstreamErrors);
});

test("load or store reuses non zero entries", () => {
  let parses = 0;
  const cache = new ParseCache<string, string | undefined>();
  const first = cache.loadOrStore("a", () => {
    parses += 1;
    return "A";
  }, false);
  const second = cache.loadOrStore("a", () => {
    parses += 1;
    return "B";
  }, false);

  assert.strictEqual(first, "A");
  assert.strictEqual(second, "A");
  assert.strictEqual(parses, 1);
});

test("load or store reparses zero entries unless zero is allowed", () => {
  let parses = 0;
  const cache = new ParseCache<string, string | undefined>();
  cache.loadOrStore("a", () => {
    parses += 1;
    return undefined;
  }, false);
  const reparsed = cache.loadOrStore("a", () => {
    parses += 1;
    return "A";
  }, false);

  assert.strictEqual(reparsed, "A");
  assert.strictEqual(parses, 2);

  cache.store("b", undefined);
  const zero = cache.loadOrStore("b", () => "B", true);
  assert.strictEqual(zero, undefined);
});

test("delete and reset match tsgo cache lifecycle", () => {
  const cache = new ParseCache<string, number>((value) => value === 0);
  cache.store("a", 1);
  cache.store("b", 2);
  assert.strictEqual(cache.size, 2);
  cache.delete("a");
  assert.strictEqual(cache.size, 1);
  cache.reset();
  assert.strictEqual(cache.size, 0);
});

test("reference map derives reverse references lazily", () => {
  const map = new ReferenceMap();
  map.storeReferences("/src/a.ts", new Set(["/src/b.ts", "/src/c.ts"]));
  map.storeReferences("/src/d.ts", new Set(["/src/b.ts"]));

  const refs = map.getReferences("/src/a.ts");
  assert.ok(refs.ok);
  assert.deepStrictEqual([...refs.refs!], ["/src/b.ts", "/src/c.ts"]);
  assert.deepStrictEqual([...map.getReferencedBy("/src/b.ts")], ["/src/a.ts", "/src/d.ts"]);
  assert.deepStrictEqual([...map.getReferencedBy("/src/missing.ts")], []);
});

test("reference map invalidates reverse index when edges change", () => {
  const map = new ReferenceMap();
  map.storeReferences("/src/a.ts", new Set(["/src/b.ts"]));
  assert.deepStrictEqual([...map.getReferencedBy("/src/b.ts")], ["/src/a.ts"]);

  map.storeReferences("/src/a.ts", new Set(["/src/c.ts"]));
  assert.deepStrictEqual([...map.getReferencedBy("/src/b.ts")], []);
  assert.deepStrictEqual([...map.getReferencedBy("/src/c.ts")], ["/src/a.ts"]);
});

test("incremental host reads and writes file mtimes through vfs", () => {
  const fs = new MemoryFS();
  fs.writeFile("/src/a.ts", "export const a = 1;");
  const host = createHost({ fs: () => fs });
  const nextTime = new Date(123456);
  host.setMTime("/src/a.ts", nextTime);

  assert.strictEqual(host.getMTime("/src/a.ts")!.getTime(), nextTime.getTime());
  assert.strictEqual(host.getMTime("/src/missing.ts"), undefined);
});

test("build info json shapes match tsgo compact forms", () => {
  assert.strictEqual(new BuildInfoRoot(1).toJSON(), 1);
  assert.deepStrictEqual(new BuildInfoRoot(1, 3).toJSON() as readonly number[], [1, 3]);
  assert.strictEqual(new BuildInfoRoot(0, 0, "src/index.ts").toJSON(), "src/index.ts");
  assert.strictEqual(BuildInfoRoot.fromJSON([1, 3]).end, 3);

  const sameSignature = BuildInfoFileInfo.fromFileInfo({ version: "abc", signature: "abc" });
  assert.strictEqual(sameSignature.toJSON(), "abc");
  assert.ok(sameSignature.hasSignature());
  assert.strictEqual(sameSignature.getFileInfo().signature, "abc");

  const noSignature = BuildInfoFileInfo.fromFileInfo({ version: "abc", signature: "" });
  assert.strictEqual(noSignature.getFileInfo().signature, "");
  assert.strictEqual(noSignature.getFileInfo().version, "abc");

  assert.deepStrictEqual(new BuildInfoReferenceMapEntry(2, 4).toJSON(), [2, 4]);
  assert.strictEqual(BuildInfoReferenceMapEntry.fromJSON([2, 4]).fileIdListId, 4);
  assert.deepStrictEqual(new BuildInfoDiagnosticsOfFile(1, [{ code: 100 }]).toJSON(), [1, [{ code: 100 }]]);
  assert.strictEqual(BuildInfoSemanticDiagnostic.fromJSON(1).fileId, 1);
});

test("build info pending emit and signature encoding match tsgo", () => {
  assert.strictEqual(new BuildInfoFilePendingEmit(1).toJSON(), 1);
  assert.deepStrictEqual(new BuildInfoFilePendingEmit(1, FileEmitKind.Dts).toJSON() as readonly number[], [1]);
  assert.deepStrictEqual(new BuildInfoFilePendingEmit(1, FileEmitKind.Js).toJSON() as readonly number[], [1, FileEmitKind.Js]);
  assert.strictEqual(BuildInfoFilePendingEmit.fromJSON([1]).emitKind, FileEmitKind.Dts);

  assert.strictEqual(new BuildInfoEmitSignature(1).toJSON(), 1);
  assert.deepStrictEqual(new BuildInfoEmitSignature(1, "sig").toJSON() as readonly unknown[], [1, "sig"]);
  assert.deepStrictEqual(new BuildInfoEmitSignature(1, "", true, false).toJSON() as readonly unknown[], [1, []]);
  assert.deepStrictEqual(new BuildInfoEmitSignature(1, "sig", false, true).toJSON() as readonly unknown[], [1, ["sig"]]);
  assert.ok(new BuildInfoEmitSignature(1).noEmitSignature());
  assert.strictEqual(BuildInfoEmitSignature.fromJSON([1, ["sig"]]).signature, "sig");
  assert.deepStrictEqual(new BuildInfoResolvedRoot(2, 1).toJSON(), [2, 1]);
});

test("build info root reader maps roots to resolved files", () => {
  const fileInfo = BuildInfoFileInfo.fromFileInfo({ version: "v", signature: "v" });
  const buildInfo = new BuildInfo({
    version: "not-current",
    root: [new BuildInfoRoot(1), new BuildInfoRoot(3), new BuildInfoRoot(0, 0, "generated.ts")],
    fileNames: ["src/a.ts", "src/b.ts", "real/b.ts"],
    fileInfos: [fileInfo, fileInfo, fileInfo],
    resolvedRoot: [new BuildInfoResolvedRoot(3, 2)],
  });

  const reader = buildInfo.getBuildInfoRootInfoReader("/repo", true);
  const direct = reader.getBuildInfoFileInfo("/repo/src/a.ts");
  const resolved = reader.getBuildInfoFileInfo("/repo/src/b.ts");

  assert.ok(!buildInfo.isValidVersion());
  assert.ok(buildInfo.isIncremental());
  assert.strictEqual(buildInfo.fileName(1), "src/a.ts");
  assert.strictEqual(direct.resolved, "/repo/src/a.ts");
  assert.strictEqual(resolved.resolved, "/repo/real/b.ts");
  assert.deepStrictEqual([...reader.roots()], ["/repo/src/a.ts", "/repo/src/b.ts", "/repo/generated.ts"]);
});

test("build host caches declaration and json source files only", () => {
  const fs = new MemoryFS();
  let sourceParses = 0;
  const host = new BuildHost<TestSourceFile, TestParsedCommandLine, TestBuildInfo>(
    {
      now: () => new Date(0),
      toPath: (fileName) => fileName,
      getTask: () => undefined,
    },
    {
      fs: () => fs,
      defaultLibraryPath: () => "/lib",
      getCurrentDirectory: () => "/repo",
      getSourceFile: (opts) => {
        sourceParses += 1;
        return { fileName: opts.fileName };
      },
      getResolvedProjectReference: () => undefined,
    },
  );

  host.getSourceFile({ fileName: "/types/a.d.ts", path: "/types/a.d.ts" });
  host.getSourceFile({ fileName: "/types/a.d.ts", path: "/types/a.d.ts" });
  host.getSourceFile({ fileName: "/src/a.ts", path: "/src/a.ts" });
  host.getSourceFile({ fileName: "/src/a.ts", path: "/src/a.ts" });

  assert.strictEqual(sourceParses, 3);
});

test("build host tracks config parse time and build info lookup", () => {
  const fs = new MemoryFS();
  let now = 10;
  const host = new BuildHost<TestSourceFile, TestParsedCommandLine, TestBuildInfo>(
    {
      now: () => {
        now += 5;
        return new Date(now);
      },
      toPath: (fileName) => fileName.toLowerCase(),
      getTask: () => ({
        loadOrStoreBuildInfo: (_configPath: string, buildInfoFileName: string): TestBuildInfo => ({ name: buildInfoFileName }),
      }),
    },
    {
      fs: () => fs,
      defaultLibraryPath: () => "/lib",
      getCurrentDirectory: () => "/repo",
      getSourceFile: () => undefined,
      getResolvedProjectReference: (_fileName, path) => ({ configFileName: path }),
    },
  );

  const resolved = host.getResolvedProjectReference("/Repo/Tsconfig.json", "/repo/tsconfig.json");
  const buildInfo = host.readBuildInfo({ configFileName: "/Repo/Tsconfig.json" }, ".tsbuildinfo");

  assert.strictEqual(resolved!.configFileName, "/repo/tsconfig.json");
  assert.strictEqual(host.getConfigTime("/repo/tsconfig.json"), 5);
  assert.strictEqual(buildInfo!.name, ".tsbuildinfo");
});

test("extended config cache parses each path once", () => {
  let parses = 0;
  const cache = new ExtendedConfigCache((fileName, path) => {
    parses += 1;
    return { configFileName: fileName, path, value: "parsed" };
  });

  const host: ExtendedConfigHost = {};
  const first = cache.getExtendedConfig("a.json", "/a.json", [], host);
  const second = cache.getExtendedConfig("a.json", "/a.json", [], host);

  assert.strictEqual(first, second);
  assert.strictEqual(parses, 1);
  assert.strictEqual(cache.size, 1);
});

test("pretty detection matches environment precedence", () => {
  const sys = new TestSystem();
  sys.tty = true;
  assert.ok(defaultIsPretty(sys));
  sys.env.set("NO_COLOR", "1");
  assert.ok(!defaultIsPretty(sys));
  sys.env.delete("NO_COLOR");
  sys.env.set("FORCE_COLOR", "1");
  sys.tty = false;
  assert.ok(defaultIsPretty(sys));
});

test("color helpers follow tsgo ansi shapes", () => {
  const plain = new Colors(false, false, false, false, false);
  assert.strictEqual(plain.bold("x"), "x");

  const colors = new Colors(true, false, false, false, true);
  assert.strictEqual(colors.bold("x"), "\x1b[1mx\x1b[22m");
  assert.strictEqual(colors.blue("x"), "\x1b[94mx\x1b[39m");
  assert.strictEqual(colors.blueBackground("x"), "\x1B[48;5;68mx\x1B[39;49m");

  const windows = new Colors(true, true, false, false, false);
  assert.strictEqual(windows.blue("x"), "\x1b[97mx\x1b[39m");
});

test("diagnostic reporters respect quiet pretty and summary options", () => {
  const sys = new TestSystem();
  const writer = new StringWriter();
  const reportOptions: CompilerOptionsLike = { pretty: false };
  const report = createDiagnosticReporter(sys, writer, reportOptions);
  report({ message: "boom" });
  assert.strictEqual(writer.text, "boom\n");

  const quietWriter = new StringWriter();
  const quietOptions: CompilerOptionsLike = { quiet: true };
  createDiagnosticReporter(sys, quietWriter, quietOptions)({ message: "hidden" });
  assert.strictEqual(quietWriter.text, "");

  const summaryWriter = new StringWriter();
  const summaryOptions: CompilerOptionsLike = { pretty: true };
  const summary = createReportErrorSummary(sys, summaryWriter, summaryOptions);
  summary([{ message: "a" }, { message: "b" }]);
  assert.strictEqual(summaryWriter.text, "Found 2 errors.\n");

  sys.env.set("FORCE_COLOR", "1");
  const envColors = createColors(sys);
  assert.ok(envColors.showColors);
  assert.strictEqual(ExitStatus.Success, 0);
});

test("statistics report matches tsgo table shape", () => {
  const stats = new Statistics();
  stats.files = 3;
  stats.lines = 40;
  stats.identifiers = 20;
  stats.symbols = 10;
  stats.types = 8;
  stats.instantiations = 2;
  stats.memoryUsed = 2048;
  stats.memoryAllocs = 17;
  stats.compileTimes = {
    configTime: 100,
    parseTime: 200,
    bindTime: 300,
    totalTime: 600,
  };

  const writer = new StringWriter();
  stats.report(writer);

  assert.ok(writer.text.includes("Files:"));
  assert.ok(writer.text.includes("3"));
  assert.ok(writer.text.includes("Memory used:"));
  assert.ok(writer.text.includes("2K"));
  assert.ok(writer.text.includes("Config time:"));
  assert.ok(writer.text.includes("0.100s"));
  assert.ok(writer.text.includes("Total time:"));
  assert.ok(writer.text.includes("0.600s"));
});

test("aggregate accumulates counts and compile times", () => {
  const first = new Statistics();
  first.files = 1;
  first.lines = 10;
  first.compileTimes = { parseTime: 100, checkTime: 200, totalTime: 300 };

  const second = new Statistics();
  second.files = 2;
  second.lines = 20;
  second.compileTimes = { parseTime: 300, checkTime: 400, totalTime: 700 };

  const aggregate = new Statistics();
  aggregate.aggregate(first);
  aggregate.aggregate(second);
  aggregate.setTotalTime(1000);

  assert.ok(aggregate.isAggregate);
  assert.strictEqual(aggregate.files, 3);
  assert.strictEqual(aggregate.lines, 30);
  assert.strictEqual(aggregate.compileTimes.parseTime, 400);
  assert.strictEqual(aggregate.compileTimes.checkTime, 600);
  assert.strictEqual(aggregate.compileTimes.totalTime, 1000);
  assert.strictEqual(formatDuration(1250), "1.250s");
});
