import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ResultKind, type UserPreferences } from "../../modulespecifiers/index.js";
import { SymbolFlags } from "../../ast/index.js";
import { type ExportEntry, ExportSyntaxNamed } from "./export.js";
import {
  type AutoImportProgram,
  type AutoImportView,
  type ConditionSet,
  type SpecifierCache,
  getModuleSpecifier,
} from "./specifiers.js";

class Conditions implements ConditionSet {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  isSubsetOf(other: ConditionSet): boolean {
    return other instanceof Conditions && (this.name === "" || this.name === other.name);
  }

  intersects(other: ConditionSet): boolean {
    return other instanceof Conditions && this.name !== "" && this.name === other.name;
  }
}

class Cache implements SpecifierCache {
  private readonly values = new Map<string, string>();

  load(path: string): string | undefined {
    return this.values.get(path);
  }

  store(path: string, specifier: string): void {
    this.values.set(path, specifier);
  }
}

function preferences(excludes: readonly string[] = []): UserPreferences {
  return {
    importModuleSpecifierPreference: "",
    importModuleSpecifierEnding: "",
    autoImportSpecifierExcludeRegexes: excludes,
  };
}

function neverProgram(): AutoImportProgram {
  const fail = (): never => {
    throw new Error("program should not be reached by this test");
  };
  return {
    options: fail,
    getSymlinkCache: fail,
    commonSourceDirectory: fail,
    getGlobalTypingsCacheLocation: fail,
    useCaseSensitiveFileNames: fail,
    getCurrentDirectory: fail,
    getProjectReferenceFromSource: fail,
    getRedirectTargets: fail,
    getSourceOfProjectReferenceIfOutputIncluded: fail,
    fileExists: fail,
    getNearestAncestorDirectoryWithPackageJson: fail,
    getPackageJsonInfo: fail,
    getDefaultResolutionModeForFile: fail,
    getResolvedModuleFromModuleSpecifier: fail,
    getModeForUsageLocation: fail,
  };
}

function exportEntry(moduleID: string, packageName = ""): ExportEntry {
  return {
    moduleID,
    exportName: "value",
    moduleFileName: "/repo/pkg/value.ts",
    syntax: ExportSyntaxNamed,
    flags: SymbolFlags.None,
    target: { moduleID, exportName: "value" },
    isTypeOnly: false,
    path: "/repo/pkg/value.ts",
    packageName,
  };
}

function view(cache: Cache): AutoImportView {
  return {
    registry: {
      entrypoints: new Map(),
      specifierCache: new Map([["/repo/src/current.ts", cache]]),
    },
    conditions: new Conditions("import"),
    program: neverProgram(),
    importingFile: {
      path: () => "/repo/src/current.ts",
      fileName: () => "/repo/src/current.ts",
      imports: () => [],
      isJS: () => false,
    },
    importingFilePath: "/repo/src/current.ts",
    getAllowedEndings: () => [],
    tspath: {
      isDeclarationFileName: () => false,
      pathIsRelative: (path) => path.startsWith("./") || path.startsWith("../"),
      pathIsAbsolute: (path) => path.startsWith("/"),
      hasTSFileExtension: (path) => path.endsWith(".ts"),
      hasJSFileExtension: (path) => path.endsWith(".js"),
      fileExtensionIsOneOf: (path, extensions) => extensions.some((extension) => path.endsWith(extension)),
      extensionsNotSupportingExtensionlessResolution: [".mts", ".cts"],
      isExternalModuleNameRelative: (path) => path.startsWith("./") || path.startsWith("../") || path.startsWith("/"),
    },
  };
}

export class AutoImportSpecifierTests {
  returns_bare_module_ids_as_ambient_specifiers(): void {
    const [specifier, kind] = getModuleSpecifier(view(new Cache()), exportEntry("react"), preferences());

    Assert.Equal("react", specifier);
    Assert.Equal(ResultKind.Ambient, kind);
  }

  rejects_bare_specifiers_excluded_by_user_regex(): void {
    const [specifier, kind] = getModuleSpecifier(view(new Cache()), exportEntry("react"), preferences(["^react$"]));

    Assert.Equal("", specifier);
    Assert.Equal(ResultKind.None, kind);
  }

  returns_cached_relative_specifier_without_recomputing(): void {
    const cache = new Cache();
    cache.store("/repo/pkg/value.ts", "../pkg/value.js");

    const [specifier, kind] = getModuleSpecifier(view(cache), exportEntry("/repo/pkg/value.ts"), preferences());

    Assert.Equal("../pkg/value.js", specifier);
    Assert.Equal(ResultKind.Relative, kind);
  }

  treats_empty_cached_specifier_as_no_result(): void {
    const cache = new Cache();
    cache.store("/repo/pkg/value.ts", "");

    const [specifier, kind] = getModuleSpecifier(view(cache), exportEntry("/repo/pkg/value.ts"), preferences());

    Assert.Equal("", specifier);
    Assert.Equal(ResultKind.None, kind);
  }
}

A<AutoImportSpecifierTests>().method((t) => t.returns_bare_module_ids_as_ambient_specifiers).add(FactAttribute);
A<AutoImportSpecifierTests>().method((t) => t.rejects_bare_specifiers_excluded_by_user_regex).add(FactAttribute);
A<AutoImportSpecifierTests>().method((t) => t.returns_cached_relative_specifier_without_recomputing).add(FactAttribute);
A<AutoImportSpecifierTests>().method((t) => t.treats_empty_cached_specifier_as_no_result).add(FactAttribute);
