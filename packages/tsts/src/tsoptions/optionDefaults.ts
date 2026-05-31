/**
 * Effective default descriptions for compiler options.
 *
 * TS-Go stores two related concepts: the user-provided option value and the
 * effective value produced by getters such as `GetEmitModuleKind`. This module
 * centralizes the option-default decision points used by help output,
 * show-config, and project diagnostics.
 */

import type { CompilerOptions } from "../core/compilerOptions.js";
import {
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
  getAllowImportingTsExtensions,
  getAllowJS,
  getAreDeclarationMapsEnabled,
  getEmitDeclarations,
  getEmitModuleDetectionKind,
  getEmitModuleKind,
  getEmitScriptTarget,
  getIsolatedModules,
  getModuleResolutionKind,
  getResolveJsonModule,
  getResolvePackageJsonExports,
  getResolvePackageJsonImports,
  getUseDefineForClassFields,
  isIncremental,
  shouldPreserveConstEnums,
} from "../core/compilerOptions.js";
import { Tristate } from "../core/tristate.js";

export interface EffectiveOptionValue {
  readonly name: string;
  readonly value: unknown;
  readonly reason: string;
}

export function getEffectiveCompilerOptionValue(
  options: CompilerOptions,
  name: string,
): EffectiveOptionValue | undefined {
  switch (name) {
    case "target":
      return { name, value: getEmitScriptTarget(options), reason: "defaults to the latest standard target" };
    case "module":
      return { name, value: getEmitModuleKind(options), reason: "derived from target when module is omitted" };
    case "moduleResolution":
      return { name, value: getModuleResolutionKind(options), reason: "derived from module kind" };
    case "moduleDetection":
      return { name, value: getEmitModuleDetectionKind(options), reason: "derived from module kind" };
    case "isolatedModules":
      return { name, value: getIsolatedModules(options), reason: "enabled by verbatimModuleSyntax" };
    case "preserveConstEnums":
      return { name, value: shouldPreserveConstEnums(options), reason: "enabled by isolated module emit" };
    case "declaration":
      return { name, value: getEmitDeclarations(options), reason: "enabled by composite projects" };
    case "declarationMap":
      return { name, value: getAreDeclarationMapsEnabled(options), reason: "requires declaration emit" };
    case "incremental":
      return { name, value: isIncremental(options), reason: "enabled by composite projects" };
    case "useDefineForClassFields":
      return { name, value: getUseDefineForClassFields(options), reason: "defaults by emit script target" };
    case "resolvePackageJsonExports":
      return { name, value: getResolvePackageJsonExports(options), reason: "enabled by modern module resolution" };
    case "resolvePackageJsonImports":
      return { name, value: getResolvePackageJsonImports(options), reason: "enabled by modern module resolution" };
    case "resolveJsonModule":
      return { name, value: getResolveJsonModule(options), reason: "enabled by bundler and modern node modes" };
    case "allowJs":
      return { name, value: getAllowJS(options), reason: "enabled by checkJs" };
    case "allowImportingTsExtensions":
      return { name, value: getAllowImportingTsExtensions(options), reason: "enabled by rewriteRelativeImportExtensions" };
    default:
      return undefined;
  }
}

export function getEffectiveCompilerOptions(options: CompilerOptions): readonly EffectiveOptionValue[] {
  const names = [
    "target",
    "module",
    "moduleResolution",
    "moduleDetection",
    "isolatedModules",
    "preserveConstEnums",
    "declaration",
    "declarationMap",
    "incremental",
    "useDefineForClassFields",
    "resolvePackageJsonExports",
    "resolvePackageJsonImports",
    "resolveJsonModule",
    "allowJs",
    "allowImportingTsExtensions",
  ];
  const result: EffectiveOptionValue[] = [];
  for (const name of names) {
    const value = getEffectiveCompilerOptionValue(options, name);
    if (value !== undefined) result.push(value);
  }
  return result;
}

export function getDefaultCompilerOptionsForConfigFile(configFileName: string): CompilerOptions {
  if (configFileName.endsWith("jsconfig.json")) {
    return {
      allowJs: Tristate.True,
      skipLibCheck: Tristate.True,
      noEmit: Tristate.True,
      maxNodeModuleJsDepth: 2,
    };
  }
  return {};
}

export function defaultOptionValueForHelp(name: string): unknown {
  switch (name) {
    case "target":
      return ScriptTarget.LatestStandard;
    case "module":
      return ModuleKind.CommonJS;
    case "moduleResolution":
      return ModuleResolutionKind.Bundler;
    case "declaration":
    case "incremental":
      return "false unless composite is set";
    case "allowJs":
      return "false unless checkJs is set";
    case "strict":
    case "pretty":
    case "deduplicatePackages":
    case "stableTypeOrdering":
    case "forceConsistentCasingInFileNames":
      return true;
    case "noCheck":
    case "noEmit":
    case "sourceMap":
    case "inlineSourceMap":
    case "removeComments":
    case "emitBOM":
    case "skipLibCheck":
    case "skipDefaultLibCheck":
      return false;
    case "newLine":
      return "lf";
    case "jsxFactory":
      return "React.createElement";
    case "jsxFragmentFactory":
      return "React.Fragment";
    case "jsxImportSource":
      return "react";
    case "tsBuildInfoFile":
      return ".tsbuildinfo";
    case "generateCpuProfile":
      return "profile.cpuprofile";
    default:
      return undefined;
  }
}

export function optionValueIsDefault(name: string, value: unknown): boolean {
  const defaultValue = defaultOptionValueForHelp(name);
  if (defaultValue === undefined) return value === undefined;
  return Object.is(defaultValue, value);
}

export function omitDefaultOptions(options: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(options)) {
    if (!optionValueIsDefault(name, value)) result[name] = value;
  }
  return result;
}
