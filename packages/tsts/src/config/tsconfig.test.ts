import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { loadTsConfig, parseTsConfigText } from "./index.js";
import type { CompilerHost } from "../program/index.js";

export class TsConfigGroundworkTests {
  parses_jsonc_files_and_outdir(): void {
    const result = parseTsConfigText(
      "project/tsconfig.json",
      "{\n" +
        "  // deterministic JSONC support\n" +
        "  \"compilerOptions\": {\n" +
        "    \"outDir\": \"dist\",\n" +
        "  },\n" +
        "  \"files\": [\n" +
        "    \"src/add.ts\",\n" +
        "    \"src/value.ts\",\n" +
        "  ],\n" +
        "}",
    );

    Assert.Equal(0, result.diagnostics.length);
    Assert.NotNull(result.config);
    Assert.Equal<readonly string[]>(["project/src/add.ts", "project/src/value.ts"], result.config!.rootNames);
    Assert.Equal("dist", result.config!.options.outDir);
  }

  loads_configs_through_host(): void {
    const host: Pick<CompilerHost, "readFile"> = {
      readFile: (fileName) => (fileName === "tsconfig.json" ? "{\"files\":[\"src/index.ts\"]}" : undefined),
    };

    const result = loadTsConfig("tsconfig.json", host);

    Assert.Equal(0, result.diagnostics.length);
    Assert.NotNull(result.config);
    Assert.Equal<readonly string[]>(["src/index.ts"], result.config!.rootNames);
  }

  expands_include_through_host(): void {
    interface ReadDirCall {
      readonly rootDir: string;
      readonly extensions: readonly string[];
      readonly excludes: readonly string[];
      readonly includes: readonly string[];
    }
    const calls: ReadDirCall[] = [];
    const host: Pick<CompilerHost, "readDirectory"> = {
      readDirectory: (rootDir, extensions, excludes, includes) => {
        calls.push({ rootDir, extensions, excludes, includes });
        return ["project/src/index.ts", "project/src/util.ts"];
      },
    };

    const result = parseTsConfigText(
      "project/tsconfig.json",
      "{\"compilerOptions\":{\"outDir\":\"dist\"},\"include\":[\"src/**/*.ts\"],\"exclude\":[\"src/**/*.test.ts\"]}",
      host,
    );

    Assert.Equal(0, result.diagnostics.length);
    Assert.NotNull(result.config);
    Assert.Equal<readonly string[]>(["project/src/index.ts", "project/src/util.ts"], result.config!.rootNames);
    Assert.Equal(1, calls.length);
    Assert.Equal("project", calls[0]!.rootDir);
    Assert.Equal<readonly string[]>([".ts", ".tsx", ".d.ts"], calls[0]!.extensions);
    Assert.Equal<readonly string[]>(["node_modules", "bower_components", "jspm_packages", "dist", "src/**/*.test.ts"], calls[0]!.excludes);
    Assert.Equal<readonly string[]>(["src/**/*.ts"], calls[0]!.includes);
  }

  requires_directory_support(): void {
    const result = parseTsConfigText("tsconfig.json", "{\"include\":[\"src/**/*.ts\"]}");

    Assert.Equal(1, result.diagnostics.length);
    Assert.Equal("include/exclude expansion requires CompilerHost.readDirectory", result.diagnostics[0]!.message);
  }

  uses_default_include_exclude_when_files_omitted(): void {
    const host: Pick<CompilerHost, "readDirectory"> = {
      readDirectory: (_rootDir, _extensions, _excludes, _includes) => ["src/index.ts"],
    };

    const result = parseTsConfigText("tsconfig.json", "{}", host);

    Assert.Equal(0, result.diagnostics.length);
    Assert.NotNull(result.config);
    Assert.Equal<readonly string[]>(["src/index.ts"], result.config!.rootNames);
  }

  rejects_invalid_option_shapes(): void {
    const result = parseTsConfigText(
      "tsconfig.json",
      "{\"compilerOptions\":{\"outDir\":false},\"files\":\"src/index.ts\",\"include\":\"src\"}",
    );

    Assert.Equal(2, result.diagnostics.length);
    Assert.Equal("compilerOptions.outDir must be a string", result.diagnostics[0]!.message);
    Assert.Equal("files must be an array of strings", result.diagnostics[1]!.message);
  }
}

A<TsConfigGroundworkTests>().method((t) => t.parses_jsonc_files_and_outdir).add(FactAttribute);
A<TsConfigGroundworkTests>().method((t) => t.loads_configs_through_host).add(FactAttribute);
A<TsConfigGroundworkTests>().method((t) => t.expands_include_through_host).add(FactAttribute);
A<TsConfigGroundworkTests>().method((t) => t.requires_directory_support).add(FactAttribute);
A<TsConfigGroundworkTests>().method((t) => t.uses_default_include_exclude_when_files_omitted).add(FactAttribute);
A<TsConfigGroundworkTests>().method((t) => t.rejects_invalid_option_shapes).add(FactAttribute);
