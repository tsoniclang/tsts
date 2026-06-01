import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Kind, SymbolFlags, type Node as AstNode, type SourceFile, type Symbol as AstSymbol } from "../../ast/index.js";
import { SetCollection } from "../../collections/index.js";
import { parseSourceFile } from "../../parser/index.js";
import { parsePackageJSON } from "../../packagejson/index.js";
import type { Path } from "../../tspath/index.js";
import { errNotExist, type DirEntry, type Entries, type FileInfo, type FS, type WalkDirFunc } from "../../vfs/index.js";
import {
  ResolutionHost,
  addPackageJsonDependencies,
  addProjectReferenceOutputMappings,
  createCheckerPool,
  getDefaultLikeExportNameFromDeclaration,
  getModuleIDAndFileNameOfModuleSymbol,
  getModuleResolver,
  getPackageNamesInNodeModules,
  getPackageRealpathFuncs,
  getResolvedPackageNames,
  tryGetModuleIDAndFileNameOfModuleSymbol,
  wordIndices,
  type AutoImportResolvedPackageProgram,
  type AutoImportTypeChecker,
  type ProjectReferenceForAutoImport,
  type RegistryCloneHostForModuleResolver,
} from "./util.js";

function sourceFile(fileName: string): SourceFile {
  return parseSourceFile("", { fileName });
}

function symbol(name: string, flags: SymbolFlags, declarations: readonly AstNode[]): AstSymbol {
  return { name, flags, declarations: [...declarations] };
}

function stringLiteral(text: string): AstNode {
  return { kind: Kind.StringLiteral, text } as unknown as AstNode;
}

function identifier(text: string): AstNode {
  return { kind: Kind.Identifier, text } as unknown as AstNode;
}

function moduleDeclaration(name: string): AstNode {
  return { kind: Kind.ModuleDeclaration, name: stringLiteral(name) } as unknown as AstNode;
}

function exportAssignment(expression: AstNode): AstNode {
  return { kind: Kind.ExportAssignment, expression } as unknown as AstNode;
}

function exportSpecifier(propertyName: AstNode, symbolFlags: SymbolFlags): AstNode {
  return { kind: Kind.ExportSpecifier, propertyName, name: identifier("default"), symbol: symbol("alias", symbolFlags, []) } as unknown as AstNode;
}

class FakeFS implements FS {
  readonly entries = new Map<string, Entries>();
  readonly realpaths = new Map<string, string>();
  readonly realpathCalls: string[] = [];

  useCaseSensitiveFileNames(): boolean {
    return true;
  }

  fileExists(_path: string): boolean {
    return false;
  }

  readFile(_path: string): string | undefined {
    return undefined;
  }

  writeFile(_path: string, _data: string): void {
  }

  appendFile(_path: string, _data: string): void {
  }

  remove(_path: string): void {
  }

  chtimes(_path: string, _accessTime: Date, _modifyTime: Date): void {
  }

  directoryExists(path: string): boolean {
    return this.entries.has(path);
  }

  getAccessibleEntries(path: string): Entries {
    return this.entries.get(path) ?? { files: [], directories: [] };
  }

  stat(_path: string): FileInfo | undefined {
    return undefined;
  }

  walkDir(_root: string, _walkFn: WalkDirFunc): void {
  }

  realpath(path: string): string {
    this.realpathCalls.push(path);
    return this.realpaths.get(path) ?? path;
  }
}

class AmbientChecker implements AutoImportTypeChecker {
  readonly modules = new Map<string, AstSymbol>();

  tryFindAmbientModule(name: string): AstSymbol | undefined {
    return this.modules.get(name);
  }
}

class ProgramForPackages implements AutoImportResolvedPackageProgram {
  readonly checker = new AmbientChecker();
  doneCount = 0;
  readonly rawNames = new SetCollection<string>();
  readonly unresolvedNames = new SetCollection<string>();

  resolvedPackageNames(): SetCollection<string> {
    return this.rawNames;
  }

  unresolvedPackageNames(): SetCollection<string> {
    return this.unresolvedNames;
  }

  options(): { readonly types?: readonly string[] } {
    return { types: ["node", "@types/jest", "*"] };
  }

  getTypeChecker(_ctx: unknown): readonly [AutoImportTypeChecker, () => void] {
    return [this.checker, () => {
      this.doneCount += 1;
    }];
  }
}

class ProjectReference implements ProjectReferenceForAutoImport {
  parsed = false;

  parseInputOutputNames(): void {
    this.parsed = true;
  }

  outputDtsToProjectReference(): ReadonlyMap<Path, { readonly source: string }> {
    return new Map<Path, { readonly source: string }>([
      ["/repo/lib/out.d.ts" as Path, { source: "/repo/lib/src/index.ts" }],
    ]);
  }
}

class ResolverHostForTest implements RegistryCloneHostForModuleResolver {
  readonly fileSystem = new FakeFS();

  getCurrentDirectory(): string {
    return "/repo";
  }

  fs(): FS {
    return this.fileSystem;
  }
}

export class AutoImportUtilTests {
  resolves_module_symbol_id_from_source_file_or_string_module(): void {
    const file = sourceFile("/repo/src/index.ts");
    const fileSymbol = symbol("\"/repo/src/index.ts\"", SymbolFlags.Module, [file]);
    const ambientSymbol = symbol("\"ambient-pkg\"", SymbolFlags.Module, [moduleDeclaration("ambient-pkg")]);
    const nonModule = symbol("value", SymbolFlags.Value, []);

    const [fileModuleID, fileName, fileOK] = tryGetModuleIDAndFileNameOfModuleSymbol(fileSymbol);
    const [ambientModuleID, ambientFileName] = getModuleIDAndFileNameOfModuleSymbol(ambientSymbol);
    const [, , nonModuleOK] = tryGetModuleIDAndFileNameOfModuleSymbol(nonModule);

    Assert.True(fileOK);
    Assert.Equal(file.path, fileModuleID);
    Assert.Equal(file.fileName, fileName);
    Assert.Equal("ambient-pkg", ambientModuleID);
    Assert.Equal("", ambientFileName);
    Assert.False(nonModuleOK);
  }

  splits_identifier_words_like_ts_go_autoimport(): void {
    Assert.Equal("0,2", wordIndices("__proto__").join(","));
    Assert.Equal("0,5", wordIndices("ParseURL").join(","));
    Assert.Equal("0,6", wordIndices("snake_case").join(","));
    Assert.Equal("0,5", wordIndices("camelCase").join(","));
    Assert.Equal("0,3,7", wordIndices("XMLHttpRequest").join(","));
  }

  reads_package_names_from_node_modules_directories(): void {
    const fileSystem = new FakeFS();
    fileSystem.entries.set("/repo/node_modules", {
      files: [],
      directories: [".cache", "@scope", "@types", "typescript"],
    });
    fileSystem.entries.set("/repo/node_modules/@scope", {
      files: [],
      directories: ["pkg"],
    });
    fileSystem.entries.set("/repo/node_modules/@types", {
      files: [],
      directories: ["node", "scope__tool"],
    });

    const [packages, error] = getPackageNamesInNodeModules("/repo/node_modules", fileSystem);

    Assert.Equal(undefined, error);
    Assert.True(packages?.has("typescript") ?? false);
    Assert.True(packages?.has("@scope/pkg") ?? false);
    Assert.True(packages?.has("node") ?? false);
    Assert.True(packages?.has("@scope/tool") ?? false);
    Assert.False(packages?.has(".cache") ?? true);
  }

  reports_missing_node_modules_without_throwing(): void {
    const [packages, error] = getPackageNamesInNodeModules("/repo/node_modules", new FakeFS());

    Assert.Equal(undefined, packages);
    Assert.Equal(errNotExist, error);
  }

  finds_default_like_export_names_from_export_declarations(): void {
    const fromAssignment = symbol("default", SymbolFlags.Alias, [exportAssignment(identifier("actualDefault"))]);
    const fromSpecifier = symbol("default", SymbolFlags.Alias, [exportSpecifier(identifier("renamed"), SymbolFlags.Alias)]);
    const fromNamedDeclaration = symbol("local", SymbolFlags.Value, [{ kind: Kind.FunctionDeclaration, name: identifier("fn") } as unknown as AstNode]);
    const parent = symbol("Namespace", SymbolFlags.Namespace, []);
    const fromParent = symbol("member", SymbolFlags.Value, [{ kind: Kind.ClassStaticBlockDeclaration } as AstNode]);
    fromParent.parent = parent;

    Assert.Equal("actualDefault", getDefaultLikeExportNameFromDeclaration(fromAssignment));
    Assert.Equal("renamed", getDefaultLikeExportNameFromDeclaration(fromSpecifier));
    Assert.Equal("fn", getDefaultLikeExportNameFromDeclaration(fromNamedDeclaration));
    Assert.Equal("Namespace", getDefaultLikeExportNameFromDeclaration(fromParent));
  }

  resolves_package_names_from_program_import_state(): void {
    const program = new ProgramForPackages();
    program.rawNames.add("@types/react");
    program.unresolvedNames.add("ambient-lib");
    program.checker.modules.set("ambient-lib", symbol("\"ambient-lib\"", SymbolFlags.Module, [sourceFile("/repo/node_modules/@types/ambient-lib/index.d.ts")]));

    const result = getResolvedPackageNames({}, program);

    Assert.True(result.has("react"));
    Assert.True(result.has("node"));
    Assert.True(result.has("jest"));
    Assert.True(result.has("ambient-lib"));
    Assert.Equal(1, program.doneCount);
  }

  adds_project_reference_output_mappings_without_overwriting_existing_entries(): void {
    const reference = new ProjectReference();
    const existing = new Map<Path, string>([
      ["/repo/lib/out.d.ts" as Path, "/repo/owner/src/index.ts"],
    ]);
    const added = new Map<Path, string>();

    addProjectReferenceOutputMappings({ getResolvedProjectReferences: () => [reference] }, existing);
    addProjectReferenceOutputMappings({ getResolvedProjectReferences: () => [reference] }, added);

    Assert.True(reference.parsed);
    Assert.Equal("/repo/owner/src/index.ts", existing.get("/repo/lib/out.d.ts" as Path));
    Assert.Equal("/repo/lib/src/index.ts", added.get("/repo/lib/out.d.ts" as Path));
  }

  reuses_checkers_until_pool_limit_and_releases_once(): void {
    const [getChecker, closePool, createdCount] = createCheckerPool(undefined, 2);

    const [first, releaseFirst] = getChecker();
    const [second, releaseSecond] = getChecker();
    releaseFirst();
    releaseFirst();
    const [third, releaseThird] = getChecker();
    releaseSecond();
    releaseThird();
    closePool();

    Assert.Equal(2, createdCount());
    Assert.Equal(first, third);
    Assert.True(first !== second);
  }

  adds_only_dependencies_and_peer_dependencies_from_package_json(): void {
    const pkg = parsePackageJSON(`{
      "dependencies": { "@types/node": "^1", "left-pad": "^1" },
      "devDependencies": { "dev-only": "^1" },
      "peerDependencies": { "@scope/pkg": "^1" },
      "optionalDependencies": { "optional-only": "^1" }
    }`);
    const deps = new SetCollection<string>();

    addPackageJsonDependencies(pkg, deps);

    Assert.True(deps.has("node"));
    Assert.True(deps.has("left-pad"));
    Assert.True(deps.has("@scope/pkg"));
    Assert.False(deps.has("dev-only"));
    Assert.False(deps.has("optional-only"));
  }

  maps_package_files_between_symlink_and_realpath_prefixes(): void {
    const fileSystem = new FakeFS();
    fileSystem.realpaths.set("/repo/node_modules/pkg", "/store/pkg");
    fileSystem.realpaths.set("/repo/node_modules/dep", "/store/dep");
    const [toRealpath, toSymlink] = getPackageRealpathFuncs(fileSystem, "/repo/node_modules/pkg");

    Assert.Equal("/store/pkg/src/index.ts", toRealpath("/repo/node_modules/pkg/src/index.ts"));
    Assert.Equal("/store/dep/index.ts", toRealpath("/repo/node_modules/dep/index.ts"));
    Assert.Equal("/store/dep/other.ts", toRealpath("/repo/node_modules/dep/other.ts"));
    Assert.Equal("/repo/node_modules/pkg/src/index.ts", toSymlink("/store/pkg/src/index.ts"));
    Assert.Equal(2, fileSystem.realpathCalls.length);
  }

  builds_resolution_host_and_module_resolver_with_realpath_wrapper(): void {
    const host = new ResolverHostForTest();
    const resolver = getModuleResolver(host, (fileName) => "/real" + fileName);
    const resolutionHost = new ResolutionHost(host.fs(), host.getCurrentDirectory());

    Assert.Equal("/repo", resolver.host.getCurrentDirectory());
    Assert.Equal("/real/repo/file.ts", resolver.host.realpath?.("/repo/file.ts"));
    Assert.Equal("/repo", resolutionHost.getCurrentDirectory());
    Assert.True(resolutionHost.useCaseSensitiveFileNames());
  }
}

A<AutoImportUtilTests>().method((t) => t.resolves_module_symbol_id_from_source_file_or_string_module).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.splits_identifier_words_like_ts_go_autoimport).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.reads_package_names_from_node_modules_directories).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.reports_missing_node_modules_without_throwing).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.finds_default_like_export_names_from_export_declarations).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.resolves_package_names_from_program_import_state).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.adds_project_reference_output_mappings_without_overwriting_existing_entries).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.reuses_checkers_until_pool_limit_and_releases_once).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.adds_only_dependencies_and_peer_dependencies_from_package_json).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.maps_package_files_between_symlink_and_realpath_prefixes).add(FactAttribute);
A<AutoImportUtilTests>().method((t) => t.builds_resolution_host_and_module_resolver_with_realpath_wrapper).add(FactAttribute);
