import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

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

export class ExecuteBuildStatusTests {
  error_and_pseudo_status_classification_matches_tsgo(): void {
    Assert.True(new UpToDateStatus(UpToDateStatusType.ConfigFileNotFound).isError());
    Assert.True(new UpToDateStatus(UpToDateStatusType.BuildErrors).isError());
    Assert.True(new UpToDateStatus(UpToDateStatusType.UpstreamErrors).isError());
    Assert.False(new UpToDateStatus(UpToDateStatusType.UpToDate).isError());

    Assert.True(new UpToDateStatus(UpToDateStatusType.UpToDateWithUpstreamTypes).isPseudoBuild());
    Assert.True(new UpToDateStatus(UpToDateStatusType.UpToDateWithInputFileText).isPseudoBuild());
    Assert.False(new UpToDateStatus(UpToDateStatusType.InputFileNewer).isPseudoBuild());
  }

  oldest_output_name_uses_the_same_payload_precedence_as_tsgo(): void {
    const byFileTime = new UpToDateStatus(
      UpToDateStatusType.UpToDateWithUpstreamTypes,
      new InputOutputFileAndTime(
        new FileAndTime("src/a.ts", new Date(10)),
        new FileAndTime("lib/a.d.ts", new Date(20)),
        "tsconfig.tsbuildinfo",
      ),
    );
    Assert.Equal("lib/a.d.ts", byFileTime.oldestOutputFileName());

    const byName = new UpToDateStatus(
      UpToDateStatusType.UpToDateWithInputFileText,
      new InputOutputName("src/b.ts", "lib/b.js"),
    );
    Assert.Equal("lib/b.js", byName.oldestOutputFileName());

    const byString = new UpToDateStatus(UpToDateStatusType.UpToDate, "lib/index.js");
    Assert.Equal("lib/index.js", byString.oldestOutputFileName());
  }

  upstream_error_payload_is_available_on_upstream_error_status(): void {
    const status = new UpToDateStatus(
      UpToDateStatusType.UpstreamErrors,
      new UpstreamErrors("../core/tsconfig.json", true),
    );
    const errors = status.upstreamErrors();
    Assert.Equal("../core/tsconfig.json", errors.ref);
    Assert.True(errors.refHasUpstreamErrors);
  }
}

export class ExecuteParseCacheTests {
  load_or_store_reuses_non_zero_entries(): void {
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

    Assert.Equal("A", first);
    Assert.Equal("A", second);
    Assert.Equal(1, parses);
  }

  load_or_store_reparses_zero_entries_unless_zero_is_allowed(): void {
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

    Assert.Equal("A", reparsed);
    Assert.Equal(2, parses);

    cache.store("b", undefined);
    const zero = cache.loadOrStore("b", () => "B", true);
    Assert.Null(zero);
  }

  delete_and_reset_match_tsgo_cache_lifecycle(): void {
    const cache = new ParseCache<string, number>((value) => value === 0);
    cache.store("a", 1);
    cache.store("b", 2);
    Assert.Equal(2, cache.size);
    cache.delete("a");
    Assert.Equal(1, cache.size);
    cache.reset();
    Assert.Equal(0, cache.size);
  }
}

export class ExecuteIncrementalTests {
  reference_map_derives_reverse_references_lazily(): void {
    const map = new ReferenceMap();
    map.storeReferences("/src/a.ts", new Set(["/src/b.ts", "/src/c.ts"]));
    map.storeReferences("/src/d.ts", new Set(["/src/b.ts"]));

    const refs = map.getReferences("/src/a.ts");
    Assert.True(refs.ok);
    Assert.Equal<readonly string[]>(["/src/b.ts", "/src/c.ts"], [...refs.refs!]);
    Assert.Equal<readonly string[]>(["/src/a.ts", "/src/d.ts"], [...map.getReferencedBy("/src/b.ts")]);
    Assert.Equal<readonly string[]>([], [...map.getReferencedBy("/src/missing.ts")]);
  }

  reference_map_invalidates_reverse_index_when_edges_change(): void {
    const map = new ReferenceMap();
    map.storeReferences("/src/a.ts", new Set(["/src/b.ts"]));
    Assert.Equal<readonly string[]>(["/src/a.ts"], [...map.getReferencedBy("/src/b.ts")]);

    map.storeReferences("/src/a.ts", new Set(["/src/c.ts"]));
    Assert.Equal<readonly string[]>([], [...map.getReferencedBy("/src/b.ts")]);
    Assert.Equal<readonly string[]>(["/src/a.ts"], [...map.getReferencedBy("/src/c.ts")]);
  }

  incremental_host_reads_and_writes_file_mtimes_through_vfs(): void {
    const fs = new MemoryFS();
    fs.writeFile("/src/a.ts", "export const a = 1;");
    const host = createHost({ fs: () => fs });
    const nextTime = new Date(123456);
    host.setMTime("/src/a.ts", nextTime);

    Assert.Equal(nextTime.getTime(), host.getMTime("/src/a.ts")!.getTime());
    Assert.Null(host.getMTime("/src/missing.ts"));
  }

  build_info_json_shapes_match_tsgo_compact_forms(): void {
    Assert.Equal(1, new BuildInfoRoot(1).toJSON());
    Assert.Equal<readonly number[]>([1, 3], new BuildInfoRoot(1, 3).toJSON() as readonly number[]);
    Assert.Equal("src/index.ts", new BuildInfoRoot(0, 0, "src/index.ts").toJSON());
    Assert.Equal(3, BuildInfoRoot.fromJSON([1, 3]).end);

    const sameSignature = BuildInfoFileInfo.fromFileInfo({ version: "abc", signature: "abc" });
    Assert.Equal("abc", sameSignature.toJSON());
    Assert.True(sameSignature.hasSignature());
    Assert.Equal("abc", sameSignature.getFileInfo().signature);

    const noSignature = BuildInfoFileInfo.fromFileInfo({ version: "abc", signature: "" });
    Assert.Equal("", noSignature.getFileInfo().signature);
    Assert.Equal("abc", noSignature.getFileInfo().version);

    Assert.Equal<readonly number[]>([2, 4], new BuildInfoReferenceMapEntry(2, 4).toJSON());
    Assert.Equal(4, BuildInfoReferenceMapEntry.fromJSON([2, 4]).fileIdListId);
    Assert.Equal<readonly unknown[]>([1, [{ code: 100 }]], new BuildInfoDiagnosticsOfFile(1, [{ code: 100 }]).toJSON());
    Assert.Equal(1, BuildInfoSemanticDiagnostic.fromJSON(1).fileId);
  }

  build_info_pending_emit_and_signature_encoding_match_tsgo(): void {
    Assert.Equal(1, new BuildInfoFilePendingEmit(1).toJSON());
    Assert.Equal<readonly number[]>([1], new BuildInfoFilePendingEmit(1, FileEmitKind.Dts).toJSON() as readonly number[]);
    Assert.Equal<readonly number[]>([1, FileEmitKind.Js], new BuildInfoFilePendingEmit(1, FileEmitKind.Js).toJSON() as readonly number[]);
    Assert.Equal(FileEmitKind.Dts, BuildInfoFilePendingEmit.fromJSON([1]).emitKind);

    Assert.Equal(1, new BuildInfoEmitSignature(1).toJSON());
    Assert.Equal<readonly unknown[]>([1, "sig"], new BuildInfoEmitSignature(1, "sig").toJSON() as readonly unknown[]);
    Assert.Equal<readonly unknown[]>([1, []], new BuildInfoEmitSignature(1, "", true, false).toJSON() as readonly unknown[]);
    Assert.Equal<readonly unknown[]>([1, ["sig"]], new BuildInfoEmitSignature(1, "sig", false, true).toJSON() as readonly unknown[]);
    Assert.True(new BuildInfoEmitSignature(1).noEmitSignature());
    Assert.Equal("sig", BuildInfoEmitSignature.fromJSON([1, ["sig"]]).signature);
    Assert.Equal<readonly number[]>([2, 1], new BuildInfoResolvedRoot(2, 1).toJSON());
  }

  build_info_root_reader_maps_roots_to_resolved_files(): void {
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

    Assert.False(buildInfo.isValidVersion());
    Assert.True(buildInfo.isIncremental());
    Assert.Equal("src/a.ts", buildInfo.fileName(1));
    Assert.Equal("/repo/src/a.ts", direct.resolved);
    Assert.Equal("/repo/real/b.ts", resolved.resolved);
    Assert.Equal<readonly string[]>(["/repo/src/a.ts", "/repo/src/b.ts", "/repo/generated.ts"], [...reader.roots()]);
  }
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

export class ExecuteBuildHostTests {
  build_host_caches_declaration_and_json_source_files_only(): void {
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

    Assert.Equal(3, sourceParses);
  }

  build_host_tracks_config_parse_time_and_build_info_lookup(): void {
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
          loadOrStoreBuildInfo: (_configPath, buildInfoFileName) => ({ name: buildInfoFileName }),
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

    Assert.Equal("/repo/tsconfig.json", resolved!.configFileName);
    Assert.Equal(5, host.getConfigTime("/repo/tsconfig.json"));
    Assert.Equal(".tsbuildinfo", buildInfo!.name);
  }
}

export class ExecuteTscSupportTests {
  extended_config_cache_parses_each_path_once(): void {
    let parses = 0;
    const cache = new ExtendedConfigCache((fileName, path) => {
      parses += 1;
      return { configFileName: fileName, path, value: "parsed" };
    });

    const first = cache.getExtendedConfig("a.json", "/a.json", [], {});
    const second = cache.getExtendedConfig("a.json", "/a.json", [], {});

    Assert.Same(first, second);
    Assert.Equal(1, parses);
    Assert.Equal(1, cache.size);
  }

  pretty_detection_matches_environment_precedence(): void {
    const sys = new TestSystem();
    sys.tty = true;
    Assert.True(defaultIsPretty(sys));
    sys.env.set("NO_COLOR", "1");
    Assert.False(defaultIsPretty(sys));
    sys.env.delete("NO_COLOR");
    sys.env.set("FORCE_COLOR", "1");
    sys.tty = false;
    Assert.True(defaultIsPretty(sys));
  }

  color_helpers_follow_tsgo_ansi_shapes(): void {
    const plain = new Colors(false, false, false, false, false);
    Assert.Equal("x", plain.bold("x"));

    const colors = new Colors(true, false, false, false, true);
    Assert.Equal("\x1b[1mx\x1b[22m", colors.bold("x"));
    Assert.Equal("\x1b[94mx\x1b[39m", colors.blue("x"));
    Assert.Equal("\x1B[48;5;68mx\x1B[39;49m", colors.blueBackground("x"));

    const windows = new Colors(true, true, false, false, false);
    Assert.Equal("\x1b[97mx\x1b[39m", windows.blue("x"));
  }

  diagnostic_reporters_respect_quiet_pretty_and_summary_options(): void {
    const sys = new TestSystem();
    const writer = new StringWriter();
    const report = createDiagnosticReporter(sys, writer, { pretty: false });
    report({ message: "boom" });
    Assert.Equal("boom\n", writer.text);

    const quietWriter = new StringWriter();
    createDiagnosticReporter(sys, quietWriter, { quiet: true })({ message: "hidden" });
    Assert.Equal("", quietWriter.text);

    const summaryWriter = new StringWriter();
    const summary = createReportErrorSummary(sys, summaryWriter, { pretty: true });
    summary([{ message: "a" }, { message: "b" }]);
    Assert.Equal("Found 2 errors.\n", summaryWriter.text);

    sys.env.set("FORCE_COLOR", "1");
    const envColors = createColors(sys);
    Assert.True(envColors.showColors);
    Assert.Equal(ExitStatus.Success, 0);
  }
}

export class ExecuteStatisticsTests {
  statistics_report_matches_tsgo_table_shape(): void {
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

    Assert.True(writer.text.includes("Files:"));
    Assert.True(writer.text.includes("3"));
    Assert.True(writer.text.includes("Memory used:"));
    Assert.True(writer.text.includes("2K"));
    Assert.True(writer.text.includes("Config time:"));
    Assert.True(writer.text.includes("0.100s"));
    Assert.True(writer.text.includes("Total time:"));
    Assert.True(writer.text.includes("0.600s"));
  }

  aggregate_accumulates_counts_and_compile_times(): void {
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

    Assert.True(aggregate.isAggregate);
    Assert.Equal(3, aggregate.files);
    Assert.Equal(30, aggregate.lines);
    Assert.Equal(400, aggregate.compileTimes.parseTime);
    Assert.Equal(600, aggregate.compileTimes.checkTime);
    Assert.Equal(1000, aggregate.compileTimes.totalTime);
    Assert.Equal("1.250s", formatDuration(1250));
  }
}

A<ExecuteBuildStatusTests>().method((t) => t.error_and_pseudo_status_classification_matches_tsgo).add(FactAttribute);
A<ExecuteBuildStatusTests>().method((t) => t.oldest_output_name_uses_the_same_payload_precedence_as_tsgo).add(FactAttribute);
A<ExecuteBuildStatusTests>().method((t) => t.upstream_error_payload_is_available_on_upstream_error_status).add(FactAttribute);
A<ExecuteParseCacheTests>().method((t) => t.load_or_store_reuses_non_zero_entries).add(FactAttribute);
A<ExecuteParseCacheTests>().method((t) => t.load_or_store_reparses_zero_entries_unless_zero_is_allowed).add(FactAttribute);
A<ExecuteParseCacheTests>().method((t) => t.delete_and_reset_match_tsgo_cache_lifecycle).add(FactAttribute);
A<ExecuteIncrementalTests>().method((t) => t.reference_map_derives_reverse_references_lazily).add(FactAttribute);
A<ExecuteIncrementalTests>().method((t) => t.reference_map_invalidates_reverse_index_when_edges_change).add(FactAttribute);
A<ExecuteIncrementalTests>().method((t) => t.incremental_host_reads_and_writes_file_mtimes_through_vfs).add(FactAttribute);
A<ExecuteIncrementalTests>().method((t) => t.build_info_json_shapes_match_tsgo_compact_forms).add(FactAttribute);
A<ExecuteIncrementalTests>().method((t) => t.build_info_pending_emit_and_signature_encoding_match_tsgo).add(FactAttribute);
A<ExecuteIncrementalTests>().method((t) => t.build_info_root_reader_maps_roots_to_resolved_files).add(FactAttribute);
A<ExecuteBuildHostTests>().method((t) => t.build_host_caches_declaration_and_json_source_files_only).add(FactAttribute);
A<ExecuteBuildHostTests>().method((t) => t.build_host_tracks_config_parse_time_and_build_info_lookup).add(FactAttribute);
A<ExecuteTscSupportTests>().method((t) => t.extended_config_cache_parses_each_path_once).add(FactAttribute);
A<ExecuteTscSupportTests>().method((t) => t.pretty_detection_matches_environment_precedence).add(FactAttribute);
A<ExecuteTscSupportTests>().method((t) => t.color_helpers_follow_tsgo_ansi_shapes).add(FactAttribute);
A<ExecuteTscSupportTests>().method((t) => t.diagnostic_reporters_respect_quiet_pretty_and_summary_options).add(FactAttribute);
A<ExecuteStatisticsTests>().method((t) => t.statistics_report_matches_tsgo_table_shape).add(FactAttribute);
A<ExecuteStatisticsTests>().method((t) => t.aggregate_accumulates_counts_and_compile_times).add(FactAttribute);
