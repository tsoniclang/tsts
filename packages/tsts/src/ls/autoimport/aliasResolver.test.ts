import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { type SourceFile } from "../../ast/index.js";
import { ModuleKind, ResolutionMode, Tristate } from "../../core/index.js";
import type { ResolvedModule, ResolvedModuleWithFailedLookupLocations } from "../../module/resolver.js";
import { parseSourceFile } from "../../parser/index.js";
import type { Path } from "../../tspath/index.js";
import {
  newAliasResolver,
  type AliasModuleResolver,
  type AliasResolverFileSystem,
  type RegistryCloneHost,
} from "./aliasResolver.js";

class HostFileSystem implements AliasResolverFileSystem {
  private readonly caseSensitive: boolean;

  constructor(caseSensitive: boolean) {
    this.caseSensitive = caseSensitive;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.caseSensitive;
  }
}

class Host implements RegistryCloneHost {
  readonly requestedPaths: string[] = [];
  private readonly files = new Map<string, SourceFile>();
  private readonly fileSystem: HostFileSystem;

  constructor(caseSensitive: boolean) {
    this.fileSystem = new HostFileSystem(caseSensitive);
  }

  getCurrentDirectory(): string {
    return "/repo";
  }

  fs(): AliasResolverFileSystem {
    return this.fileSystem;
  }

  add(file: SourceFile): void {
    this.files.set(file.path, file);
  }

  getSourceFile(_fileName: string, path: Path): SourceFile | undefined {
    this.requestedPaths.push(path);
    return this.files.get(path);
  }
}

class ModuleResolver implements AliasModuleResolver {
  calls = 0;
  nextResult: ResolvedModule | undefined;

  resolveModuleName(
    moduleReference: string,
    containingFile: string,
    mode: ResolutionMode,
    _redirectedReference: unknown | undefined,
  ): ResolvedModuleWithFailedLookupLocations {
    this.calls += 1;
    return {
      resolvedModule: this.nextResult,
      failedLookupLocations: [containingFile + "::" + moduleReference + "::" + String(mode)],
      affectingLocations: [],
      resolutionDiagnostics: [],
      alternateResult: undefined,
    };
  }
}

function path(fileName: string): Path {
  return fileName as Path;
}

function sourceFile(fileName: string, text: string): SourceFile {
  return parseSourceFile(text, { fileName });
}

function resolvedModule(fileName: string): ResolvedModule {
  return {
    resolvedFileName: fileName,
    extension: ".ts",
    packageId: undefined,
    originalPath: undefined,
    resolvedUsingTsExtension: false,
  };
}

export class AliasResolverTests {
  exposes_root_files_options_and_host_settings(): void {
    const file = sourceFile("/repo/src/index.ts", "export const value = 1;");
    const resolver = newAliasResolver(
      [file],
      new Map(),
      new Host(true),
      new ModuleResolver(),
      path,
      () => undefined,
    );

    Assert.Equal(1, resolver.sourceFiles().length);
    Assert.Equal(file, resolver.sourceFiles()[0]);
    Assert.Equal(Tristate.True, resolver.options().noCheck);
    Assert.Equal("/repo", resolver.getCurrentDirectory());
    Assert.True(resolver.useCaseSensitiveFileNames());
    Assert.Equal(ResolutionMode.ESM, resolver.getDefaultResolutionModeForFile(file));
    Assert.Equal(ModuleKind.ESNext, resolver.getEmitModuleFormatOfFile(file));
    Assert.Equal(ModuleKind.ESNext, resolver.getImpliedNodeFormatForEmit(file));
  }

  source_file_lookup_uses_to_path_and_returns_host_file(): void {
    const host = new Host(false);
    const file = sourceFile("/repo/src/index.ts", "export const value = 1;");
    host.add(file);
    const resolver = newAliasResolver(
      [file],
      new Map(),
      host,
      new ModuleResolver(),
      (fileName: string): Path => path(fileName.replace(".ts", ".generated.ts")),
      () => undefined,
    );
    const generatedFile = sourceFile("/repo/src/index.generated.ts", "export const generated = 1;");
    host.add(generatedFile);

    const result = resolver.getSourceFile("/repo/src/index.ts");

    Assert.Equal(generatedFile, result);
    Assert.Equal("/repo/src/index.generated.ts", host.requestedPaths[0]);
    Assert.False(resolver.useCaseSensitiveFileNames());
  }

  resolved_modules_are_cached_by_file_module_and_mode(): void {
    const host = new Host(true);
    const file = sourceFile("/repo/src/index.ts", "export const value = 1;");
    const moduleResolver = new ModuleResolver();
    moduleResolver.nextResult = resolvedModule("/repo/src/dep.ts");
    const resolver = newAliasResolver([file], new Map(), host, moduleResolver, path, () => undefined);

    const first = resolver.getResolvedModule(file, "./dep", ResolutionMode.ESM);
    const second = resolver.getResolvedModule(file, "./dep", ResolutionMode.ESM);

    Assert.Equal(first, second);
    Assert.Equal(1, moduleResolver.calls);
    Assert.Equal("/repo/src/dep.ts", first?.resolvedFileName);
    Assert.Equal(1, resolver.getResolvedModules().get(file.path)?.size);
  }

  failed_ambient_module_lookup_reports_once_after_cache_miss(): void {
    const file = sourceFile("/repo/src/index.ts", "export const value = 1;");
    const moduleResolver = new ModuleResolver();
    const failed: string[] = [];
    const resolver = newAliasResolver(
      [file],
      new Map(),
      new Host(true),
      moduleResolver,
      path,
      (_source: SourceFile, moduleName: string): void => {
        failed.push(moduleName);
      },
    );

    Assert.Equal(undefined, resolver.getResolvedModule(file, "missing-package", ResolutionMode.ESM));
    Assert.Equal(undefined, resolver.getResolvedModule(file, "missing-package", ResolutionMode.ESM));
    Assert.Equal(1, failed.length);
    Assert.Equal("missing-package", failed[0]);
    Assert.Equal(1, moduleResolver.calls);
  }

  relative_failed_module_lookup_does_not_report_ambient_failure(): void {
    const file = sourceFile("/repo/src/index.ts", "export const value = 1;");
    const failed: string[] = [];
    const resolver = newAliasResolver(
      [file],
      new Map(),
      new Host(true),
      new ModuleResolver(),
      path,
      (_source: SourceFile, moduleName: string): void => {
        failed.push(moduleName);
      },
    );

    Assert.Equal(undefined, resolver.getResolvedModule(file, "./missing", ResolutionMode.ESM));
    Assert.Equal(0, failed.length);
  }

}

A<AliasResolverTests>().method((t) => t.exposes_root_files_options_and_host_settings).add(FactAttribute);
A<AliasResolverTests>().method((t) => t.source_file_lookup_uses_to_path_and_returns_host_file).add(FactAttribute);
A<AliasResolverTests>().method((t) => t.resolved_modules_are_cached_by_file_module_and_mode).add(FactAttribute);
A<AliasResolverTests>().method((t) => t.failed_ambient_module_lookup_reports_once_after_cache_miss).add(FactAttribute);
A<AliasResolverTests>().method((t) => t.relative_failed_module_lookup_does_not_report_ambient_failure).add(FactAttribute);
