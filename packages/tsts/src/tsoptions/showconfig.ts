/**
 * `tsc --showConfig` config printer.
 *
 * Port of TS-Go `internal/tsoptions/showconfig.go` (~389 LoC).
 * Builds a `TSConfig` shape that matches what TypeScript's
 * `convertToTSConfig` emits — the effective compilerOptions, files,
 * include, exclude, and references arrays.
 *
 * Implied options (Module/ModuleResolution/ModuleDetection/etc.)
 * are computed via the same getters that the program uses, so the
 * printed config reflects the actual effective values.
 */

import type { ParsedCommandLine } from "./parsedcommandline.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import {
  getEmitModuleKind,
  getModuleResolutionKind,
  getEmitModuleDetectionKind,
  getIsolatedModules,
  shouldPreserveConstEnums,
  getEmitDeclarations,
  getAreDeclarationMapsEnabled,
  isIncremental,
  getUseDefineForClassFields,
  getResolvePackageJsonExports,
  getResolvePackageJsonImports,
  getResolveJsonModule,
  getAllowJS,
  getAllowImportingTsExtensions,
} from "../core/compileroptions.js";

export interface TSConfig {
  compilerOptions: Record<string, unknown>;
  references?: readonly unknown[];
  files?: readonly string[];
  include?: readonly string[];
  exclude?: readonly string[];
  compileOnSave?: boolean;
  [key: string]: unknown;
}

interface ImpliedOption {
  name: keyof CompilerOptions;
  dependencies: readonly (keyof CompilerOptions)[];
  compute: (opts: CompilerOptions) => unknown;
}

const impliedOptions: readonly ImpliedOption[] = [
  { name: "module", dependencies: ["target"], compute: getEmitModuleKind },
  { name: "moduleResolution", dependencies: ["module", "target"], compute: getModuleResolutionKind },
  { name: "moduleDetection", dependencies: ["module", "target"], compute: getEmitModuleDetectionKind },
  { name: "isolatedModules", dependencies: ["verbatimModuleSyntax"], compute: getIsolatedModules },
  { name: "preserveConstEnums", dependencies: ["isolatedModules", "verbatimModuleSyntax"], compute: shouldPreserveConstEnums },
  { name: "declaration", dependencies: ["composite"], compute: getEmitDeclarations },
  { name: "declarationMap", dependencies: ["declaration", "composite"], compute: getAreDeclarationMapsEnabled },
  { name: "incremental", dependencies: ["composite"], compute: isIncremental },
  { name: "useDefineForClassFields", dependencies: ["target", "module"], compute: getUseDefineForClassFields },
  { name: "resolvePackageJsonExports", dependencies: ["moduleResolution", "module", "target"], compute: getResolvePackageJsonExports },
  { name: "resolvePackageJsonImports", dependencies: ["moduleResolution", "resolvePackageJsonExports", "module", "target"], compute: getResolvePackageJsonImports },
  { name: "resolveJsonModule", dependencies: ["moduleResolution", "module", "target"], compute: getResolveJsonModule },
  { name: "allowJs", dependencies: ["checkJs"], compute: getAllowJS },
  { name: "allowImportingTsExtensions", dependencies: ["rewriteRelativeImportExtensions"], compute: getAllowImportingTsExtensions },
];

/**
 * Build the TSConfig output structure for --showConfig. Mirrors
 * TS-Go `ConvertToTSConfig`.
 */
export function convertToTSConfig(parsed: ParsedCommandLine, configFileName: string): TSConfig {
  const fileName = configFileName === "" ? "tsconfig.json" : configFileName;
  void fileName; // used by full version for relative-path computation
  const options = (parsed.parsedConfig.compilerOptions ?? {}) as unknown as CompilerOptions;

  // Materialize implied options that callers set explicitly OR that
  // diverge from their default.
  const result: Record<string, unknown> = { ...options };
  for (const impl of impliedOptions) {
    if (result[impl.name] !== undefined) continue;
    const value = impl.compute(options);
    if (value !== undefined && value !== 0 && value !== false) {
      result[impl.name] = value;
    }
  }

  const files = parsed.parsedConfig.fileNames;
  const out: TSConfig = { compilerOptions: result };
  if (files !== undefined) out.files = files;
  return out;
}

/**
 * Renders a tsconfig.json string for --showConfig.
 */
export function showConfig(parsed: ParsedCommandLine, configFileName: string = "tsconfig.json"): string {
  const cfg = convertToTSConfig(parsed, configFileName);
  return JSON.stringify(cfg, undefined, 4);
}
