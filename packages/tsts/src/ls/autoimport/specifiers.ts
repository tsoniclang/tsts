import {
  getModuleSpecifiersForFileWithInfo,
  isExcludedByRegex,
  pathIsBareSpecifier,
  processEntrypointEnding,
  ResultKind,
  type CompilerOptions,
  type ModuleSpecifierGenerationHost,
  type ModuleSpecifierOptions,
  type ModuleSpecifierEnding,
  type ResultKind as ResultKindValue,
  type SourceFileForSpecifierGeneration,
  type TspathHelpers,
  type UserPreferences,
} from "../../modulespecifiers/index.js";
import { pathIsAbsolute, pathIsRelative, type Path } from "../../tspath/index.js";
import type { ExportEntry } from "./export.js";

export interface ConditionSet {
  isSubsetOf(other: ConditionSet): boolean;
  intersects(other: ConditionSet): boolean;
}

export interface AutoImportEntrypoint {
  readonly includeConditions: ConditionSet;
  readonly excludeConditions: ConditionSet;
  readonly moduleSpecifier: string;
  readonly ending: "fixed" | "changeable" | "extension-changeable";
}

export interface SpecifierCache {
  load(path: Path): string | undefined;
  store(path: Path, specifier: string): void;
}

export interface AutoImportRegistry {
  readonly entrypoints: ReadonlyMap<Path, readonly AutoImportEntrypoint[]>;
  readonly specifierCache: ReadonlyMap<Path, SpecifierCache>;
}

export interface AutoImportProgram extends ModuleSpecifierGenerationHost {
  options(): CompilerOptions;
}

export interface AutoImportView {
  readonly registry: AutoImportRegistry;
  readonly conditions: ConditionSet;
  readonly program: AutoImportProgram;
  readonly importingFile: SourceFileForSpecifierGeneration;
  readonly importingFilePath: Path;
  getAllowedEndings(): readonly ModuleSpecifierEnding[];
  tspath: TspathHelpers;
}

export function getModuleSpecifier(
  view: AutoImportView,
  exportEntry: ExportEntry,
  userPreferences: UserPreferences,
): readonly [string, ResultKindValue] {
  if (pathIsBareSpecifier(exportEntry.moduleID, pathIsAbsolute, pathIsRelative)) {
    const specifier = exportEntry.moduleID;
    if (isExcludedByRegex(specifier, userPreferences.autoImportSpecifierExcludeRegexes)) {
      return ["", ResultKind.None];
    }
    return [exportEntry.moduleID, ResultKind.Ambient];
  }

  if (exportEntry.packageName !== "") {
    const entrypoints = view.registry.entrypoints.get(exportEntry.path);
    if (entrypoints !== undefined) {
      for (const entrypoint of entrypoints) {
        if (entrypoint.includeConditions.isSubsetOf(view.conditions) && !view.conditions.intersects(entrypoint.excludeConditions)) {
          const specifier = processEntrypointEnding(
            entrypoint,
            userPreferences,
            view.program,
            view.program.options(),
            view.importingFile,
            view.getAllowedEndings(),
            view.tspath,
          );

          if (!isExcludedByRegex(specifier, userPreferences.autoImportSpecifierExcludeRegexes)) {
            return [specifier, ResultKind.NodeModules];
          }
        }
      }
      return ["", ResultKind.None];
    }
  }

  const cache = view.registry.specifierCache.get(view.importingFilePath);
  if (exportEntry.packageName === "" && cache !== undefined) {
    const specifier = cache.load(exportEntry.path);
    if (specifier !== undefined) {
      if (specifier === "") {
        return ["", ResultKind.None];
      }
      return [specifier, ResultKind.Relative];
    }
  }

  const [specifiers, kind] = getModuleSpecifiersForFileWithInfo(
    view.importingFile,
    exportEntry.moduleFileName,
    view.program.options(),
    view.program,
    userPreferences,
    defaultModuleSpecifierOptions(),
    true,
    view.tspath,
  );

  for (const specifier of specifiers) {
    if (specifier.includes("/node_modules/")) {
      continue;
    }
    cache?.store(exportEntry.path, specifier);
    return [specifier, kind];
  }
  cache?.store(exportEntry.path, "");
  return ["", ResultKind.None];
}

function defaultModuleSpecifierOptions(): ModuleSpecifierOptions {
  return { overrideImportMode: 0 };
}
