/**
 * Output path resolution for the emit pipeline.
 *
 * Port of TS-Go internal/outputpaths/outputpaths.go.
 *
 * Computes where emitted .js, .d.ts, .map, and .tsbuildinfo files go
 * based on rootDir, outDir, declarationDir, and the file's input
 * extension.
 *
 * NOTE: depends on a minimal CompilerOptions shape and a host
 * (OutputPathsHost). The full CompilerOptions type is forthcoming;
 * this port uses an interface compatible subset.
 */

import {
  changeExtension,
  combinePaths,
  containsPath,
  ensureTrailingDirectorySeparator,
  extensionCjs,
  extensionDts,
  extensionJs,
  extensionJsx,
  extensionJson,
  extensionMjs,
  extensionTsBuildInfo,
  fileExtensionIs,
  fileExtensionIsOneOf,
  getBaseFileName,
  getCanonicalFileName,
  getDeclarationEmitExtensionForPath,
  getNormalizedAbsolutePath,
  getRelativePathFromDirectory,
  removeFileExtension,
  resolvePath,
  extensionCts,
  extensionMts,
  extensionTs,
  extensionTsx,
} from "../tspath/index.js";
import { Tristate, tristateIsTrue } from "../core/tristate.js";

/**
 * JSX emit modes mirror TS-Go core.JsxEmit. The actual enum lives in
 * core/ once CompilerOptions is ported.
 */
export enum JsxEmit {
  None = 0,
  Preserve = 1,
  React = 2,
  ReactNative = 3,
  ReactJSX = 4,
  ReactJSXDev = 5,
}

/**
 * Minimal CompilerOptions shape needed by outputpaths.
 *
 * Will be replaced by the full core.CompilerOptions type when ported.
 */
export interface CompilerOptionsSubset {
  readonly jsx?: JsxEmit;
  readonly outDir?: string;
  readonly rootDir?: string;
  readonly declarationDir?: string;
  readonly sourceMap?: Tristate;
  readonly inlineSourceMap?: Tristate;
  readonly emitDeclarationOnly?: Tristate;
  readonly tsBuildInfoFile?: string;
  readonly configFilePath?: string;
  readonly build?: Tristate;
  readonly emitDeclaration?: Tristate;
  readonly declaration?: Tristate;
  readonly declarationMap?: Tristate;
  isIncremental?: () => boolean;
  getEmitDeclarations?: () => boolean;
  getAreDeclarationMapsEnabled?: () => boolean;
}

export interface OutputPathsHost {
  commonSourceDirectory(): string;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
}

export interface OutputPaths {
  jsFilePath?: string;
  sourceMapFilePath?: string;
  declarationFilePath?: string;
  declarationMapPath?: string;
}

/**
 * Determine output extension based on input file extension and JSX mode.
 *
 * - .json stays .json
 * - .jsx/.tsx → .jsx when JSX preserve mode, else .js
 * - .mts/.mjs → .mjs
 * - .cts/.cjs → .cjs
 * - everything else → .js
 */
export function getOutputExtension(fileName: string, jsx: JsxEmit | undefined): string {
  if (fileExtensionIs(fileName, extensionJson)) return extensionJson;
  if (jsx === JsxEmit.Preserve && fileExtensionIsOneOf(fileName, [extensionJsx, extensionTsx])) {
    return extensionJsx;
  }
  if (fileExtensionIsOneOf(fileName, [extensionMts, extensionMjs])) return extensionMjs;
  if (fileExtensionIsOneOf(fileName, [extensionCts, extensionCjs])) return extensionCjs;
  void extensionTs;
  return extensionJs;
}

/**
 * Where a source file gets placed when output goes into newDirPath, given
 * the project's common source directory.
 */
export function getSourceFilePathInNewDir(
  fileName: string,
  newDirPath: string,
  currentDirectory: string,
  commonSourceDirectory: string,
  useCaseSensitiveFileNames: boolean
): string {
  let sourceFilePath = getNormalizedAbsolutePath(fileName, currentDirectory);
  const commonDir = ensureTrailingDirectorySeparator(commonSourceDirectory);
  const inCommon = containsPath(commonDir, sourceFilePath, {
    useCaseSensitiveFileNames,
    currentDirectory,
  });
  if (inCommon) {
    sourceFilePath = sourceFilePath.slice(commonDir.length);
  }
  return combinePaths(newDirPath, sourceFilePath);
}

/**
 * A more loose variant of getSourceFilePathInNewDir that uses a
 * case-canonical prefix check.
 */
export function getSourceFilePathInNewDirWorker(
  fileName: string,
  newDirPath: string,
  currentDirectory: string,
  commonSourceDirectory: string,
  useCaseSensitiveFileNames: boolean
): string {
  let sourceFilePath = getNormalizedAbsolutePath(fileName, currentDirectory);
  const commonDir = getCanonicalFileName(commonSourceDirectory, useCaseSensitiveFileNames);
  const canonFile = getCanonicalFileName(sourceFilePath, useCaseSensitiveFileNames);
  if (canonFile.startsWith(commonDir)) {
    sourceFilePath = sourceFilePath.slice(commonSourceDirectory.length);
  }
  return combinePaths(newDirPath, sourceFilePath);
}

function getOutputPathWithoutChangingExtension(
  inputFileName: string,
  outputDirectory: string | undefined,
  host: OutputPathsHost
): string {
  if (outputDirectory !== undefined && outputDirectory.length > 0) {
    return resolvePath(
      outputDirectory,
      getRelativePathFromDirectory(host.commonSourceDirectory(), inputFileName, {
        useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
        currentDirectory: host.getCurrentDirectory(),
      })
    );
  }
  return inputFileName;
}

function getOwnEmitOutputFilePath(
  fileName: string,
  options: CompilerOptionsSubset,
  host: OutputPathsHost,
  extension: string
): string {
  let withoutExt: string;
  if (options.outDir !== undefined && options.outDir.length > 0) {
    withoutExt = removeFileExtension(
      getSourceFilePathInNewDir(
        fileName,
        options.outDir,
        host.getCurrentDirectory(),
        host.commonSourceDirectory(),
        host.useCaseSensitiveFileNames()
      )
    );
  } else {
    withoutExt = removeFileExtension(fileName);
  }
  return withoutExt + extension;
}

export function getOutputJSFileNameWorker(
  inputFileName: string,
  options: CompilerOptionsSubset,
  host: OutputPathsHost
): string {
  return changeExtension(
    getOutputPathWithoutChangingExtension(inputFileName, options.outDir, host),
    getOutputExtension(inputFileName, options.jsx)
  );
}

export function getDeclarationEmitOutputFilePath(
  file: string,
  options: CompilerOptionsSubset,
  host: OutputPathsHost
): string {
  let outputDir: string | undefined;
  if (options.declarationDir !== undefined && options.declarationDir.length > 0) {
    outputDir = options.declarationDir;
  } else if (options.outDir !== undefined && options.outDir.length > 0) {
    outputDir = options.outDir;
  }

  let path: string;
  if (outputDir !== undefined) {
    path = getSourceFilePathInNewDirWorker(
      file,
      outputDir,
      host.getCurrentDirectory(),
      host.commonSourceDirectory(),
      host.useCaseSensitiveFileNames()
    );
  } else {
    path = file;
  }
  return removeFileExtension(path) + getDeclarationEmitExtensionForPath(path);
}

export function getSourceMapFilePath(jsFilePath: string, options: CompilerOptionsSubset): string {
  if (
    tristateIsTrue(options.sourceMap ?? Tristate.Unknown) &&
    !tristateIsTrue(options.inlineSourceMap ?? Tristate.Unknown)
  ) {
    return jsFilePath + ".map";
  }
  return "";
}

export function getBuildInfoFileName(
  options: CompilerOptionsSubset,
  opts: { currentDirectory: string; useCaseSensitiveFileNames: boolean }
): string {
  const isInc = options.isIncremental?.() ?? false;
  if (!isInc && !tristateIsTrue(options.build ?? Tristate.Unknown)) return "";
  if (options.tsBuildInfoFile !== undefined && options.tsBuildInfoFile.length > 0) {
    return options.tsBuildInfoFile;
  }
  if (options.configFilePath === undefined || options.configFilePath.length === 0) return "";

  const configFileExtensionLess = removeFileExtension(options.configFilePath);
  let buildInfoExtensionLess: string;
  if (options.outDir !== undefined && options.outDir.length > 0) {
    if (options.rootDir !== undefined && options.rootDir.length > 0) {
      buildInfoExtensionLess = resolvePath(
        options.outDir,
        getRelativePathFromDirectory(options.rootDir, configFileExtensionLess, opts)
      );
    } else {
      buildInfoExtensionLess = combinePaths(options.outDir, getBaseFileName(configFileExtensionLess));
    }
  } else {
    buildInfoExtensionLess = configFileExtensionLess;
  }
  return buildInfoExtensionLess + extensionTsBuildInfo;
}

// `extensionDts` referenced from extension imports but not always used; suppress
// unused warning while keeping the import available for downstream callers.
void extensionDts;
