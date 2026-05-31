import { computeTypingsInfo, type TypingsInfo } from "./ata.js";
import { safeFileNameToTypeName } from "./typesMap.js";
import { NameValidationResult, validatePackageName } from "./validatePackageName.js";
import type { FS } from "../../vfs/index.js";
import { readDirectory } from "../../vfs/vfsmatch/index.js";
import {
  combinePaths,
  extensionJson,
  getBaseFileName,
  getDirectoryPath,
  getNormalizedAbsolutePath,
  hasJSFileExtension,
  removeFileExtension,
  toFileNameLowerCase,
} from "../../tspath/index.js";

export interface TypingsDiscoveryInput {
  readonly projectRootPath: string;
  readonly imports: readonly string[];
  readonly fileNames?: readonly string[];
  readonly include?: readonly string[];
  readonly exclude?: readonly string[];
  readonly dependencies?: ReadonlyMap<string, string>;
  readonly devDependencies?: ReadonlyMap<string, string>;
  readonly compilerOptions?: object;
  readonly fs?: FS;
  readonly logger?: { readonly log: (message: string) => void };
  readonly typeAcquisition?: {
    readonly disableFilenameBasedTypeAcquisition?: boolean;
    readonly include?: readonly string[];
    readonly exclude?: readonly string[];
    readonly types?: readonly string[];
  };
}

export function discoverTypings(input: TypingsDiscoveryInput): TypingsInfo {
  const inferredTypings = new Map<string, string>();
  const include = input.typeAcquisition?.include ?? input.include ?? [];
  const exclude = input.typeAcquisition?.exclude ?? input.exclude ?? [];
  addInferredTypings(inferredTypings, include, input.logger, "Explicitly included types");
  const fileNames = (input.fileNames ?? []).filter(hasJSFileExtension);
  if (input.fs !== undefined && input.typeAcquisition?.types === undefined) {
    const searchDirectories = new Set<string>(fileNames.map(getDirectoryPath));
    searchDirectories.add(input.projectRootPath);
    for (const searchDirectory of [...searchDirectories].sort()) {
      addTypingNamesFromManifestAndModules(input.fs, input.logger, inferredTypings, searchDirectory, "bower.json", "bower_components");
      addTypingNamesFromManifestAndModules(input.fs, input.logger, inferredTypings, searchDirectory, "package.json", "node_modules");
    }
  }
  if (input.typeAcquisition?.disableFilenameBasedTypeAcquisition !== true) {
    getTypingNamesFromSourceFileNames(inferredTypings, fileNames, input.logger);
  }

  for (const moduleName of input.imports) {
    if (moduleName.startsWith(".") || moduleName.startsWith("/")) continue;
    const packageName = packageNameFromModule(moduleName);
    if (validatePackageName(packageName).result !== NameValidationResult.NameOk) continue;
    if (input.dependencies?.has(packageName) === true || input.devDependencies?.has(packageName) === true) continue;
    addInferredTyping(inferredTypings, packageName);
  }

  for (const excludedTypingName of exclude) {
    inferredTypings.delete(excludedTypingName);
    input.logger?.log(`ATA:: Typing for ${excludedTypingName} is in exclude list, will be ignored.`);
  }
  return computeTypingsInfo(input.projectRootPath, [...inferredTypings.keys()], input.compilerOptions);
}

export function packageNameFromModule(moduleName: string): string {
  if (!moduleName.startsWith("@")) return moduleName.split("/")[0] ?? moduleName;
  const parts = moduleName.split("/");
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : moduleName;
}

export function addInferredTyping(inferredTypings: Map<string, string>, typingName: string): void {
  if (!inferredTypings.has(typingName)) inferredTypings.set(typingName, "");
}

export function addInferredTypings(
  inferredTypings: Map<string, string>,
  typingNames: readonly string[],
  logger?: { readonly log: (message: string) => void },
  message?: string,
): void {
  if (message !== undefined) logger?.log(`ATA:: ${message}: ${typingNames.join(",")}`);
  for (const typingName of typingNames) addInferredTyping(inferredTypings, typingName);
}

export function getTypingNamesFromSourceFileNames(
  inferredTypings: Map<string, string>,
  fileNames: readonly string[],
  logger?: { readonly log: (message: string) => void },
): void {
  let hasJsxFile = false;
  const fromFileNames: string[] = [];
  for (const fileName of fileNames) {
    if (!hasJSFileExtension(fileName)) continue;
    hasJsxFile = hasJsxFile || fileName.toLowerCase().endsWith(".jsx");
    const inferredTypingName = removeFileExtension(toFileNameLowerCase(getBaseFileName(fileName)));
    const cleanedTypingName = removeMinAndVersionNumbers(inferredTypingName);
    const typeName = safeFileNameToTypeName.get(cleanedTypingName);
    if (typeName !== undefined) fromFileNames.push(typeName);
  }
  addInferredTypings(inferredTypings, fromFileNames, logger, "Inferred typings from file names");
  if (hasJsxFile) {
    logger?.log("ATA:: Inferred 'react' typings due to presence of '.jsx' extension");
    addInferredTyping(inferredTypings, "react");
  }
}

function addTypingNamesFromManifestAndModules(
  fs: FS,
  logger: { readonly log: (message: string) => void } | undefined,
  inferredTypings: Map<string, string>,
  projectRootPath: string,
  manifestName: string,
  modulesDirName: string,
): void {
  const manifestPath = combinePaths(projectRootPath, manifestName);
  const manifestTypingNames = packageDependencyNames(fs.readFile(manifestPath));
  if (manifestTypingNames.length > 0) {
    addInferredTypings(inferredTypings, manifestTypingNames, logger, `Typing names in '${manifestPath}' dependencies`);
  }

  const packagesFolderPath = combinePaths(projectRootPath, modulesDirName);
  if (!fs.directoryExists(packagesFolderPath)) return;
  const dependencyManifestNames = manifestTypingNames.length > 0
    ? manifestTypingNames.map(typingName => combinePaths(packagesFolderPath, typingName, manifestName))
    : readTopLevelDependencyManifests(fs, projectRootPath, packagesFolderPath, modulesDirName, manifestName);
  logger?.log(`ATA:: Searching for typing names in ${packagesFolderPath}; all files: ${dependencyManifestNames.join(",")}`);

  const packageNames: string[] = [];
  for (const dependencyManifestName of dependencyManifestNames) {
    const manifest = packageJsonObject(fs.readFile(dependencyManifestName));
    if (manifest === undefined) continue;
    const packageName = stringProperty(manifest, "name");
    if (packageName === undefined || packageName.length === 0) continue;
    const ownTypes = stringProperty(manifest, "types") ?? stringProperty(manifest, "typings");
    if (ownTypes !== undefined && ownTypes.length > 0) {
      const absolutePath = getNormalizedAbsolutePath(ownTypes, getDirectoryPath(dependencyManifestName));
      if (fs.fileExists(absolutePath)) {
        logger?.log(`ATA::     Package '${packageName}' provides its own types.`);
        continue;
      }
      logger?.log(`ATA::     Package '${packageName}' provides its own types but they are missing.`);
    }
    packageNames.push(packageName);
  }
  addInferredTypings(inferredTypings, packageNames, logger, "    Found package names");
}

function readTopLevelDependencyManifests(fs: FS, projectRootPath: string, packagesFolderPath: string, modulesDirName: string, manifestName: string): readonly string[] {
  const manifests: string[] = [];
  for (const manifestPath of readDirectory(fs, projectRootPath, packagesFolderPath, [extensionJson], [], [], 3)) {
    if (getBaseFileName(manifestPath) !== manifestName) continue;
    const pathComponents = manifestPath.split("/").filter(part => part.length > 0);
    const length = pathComponents.length;
    const isScoped = pathComponents[length - 3]?.startsWith("@") === true;
    const modulesSegment = isScoped ? pathComponents[length - 4] : pathComponents[length - 3];
    if (toFileNameLowerCase(modulesSegment ?? "") === modulesDirName) manifests.push(manifestPath);
  }
  return manifests.sort();
}

function packageDependencyNames(text: string | undefined): readonly string[] {
  const object = packageJsonObject(text);
  if (object === undefined) return [];
  const names = new Set<string>();
  collectDependencyNames(names, objectProperty(object, "dependencies"));
  collectDependencyNames(names, objectProperty(object, "devDependencies"));
  collectDependencyNames(names, objectProperty(object, "optionalDependencies"));
  collectDependencyNames(names, objectProperty(object, "peerDependencies"));
  return [...names].sort();
}

function collectDependencyNames(names: Set<string>, dependencies: Record<string, unknown> | undefined): void {
  if (dependencies === undefined) return;
  for (const packageName of Object.keys(dependencies)) names.add(packageName);
}

function packageJsonObject(text: string | undefined): Record<string, unknown> | undefined {
  if (text === undefined) return undefined;
  try {
    const value = JSON.parse(text) as unknown;
    return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
  } catch {
    return undefined;
  }
}

function objectProperty(object: Record<string, unknown>, name: string): Record<string, unknown> | undefined {
  const value = object[name];
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function stringProperty(object: Record<string, unknown>, name: string): string | undefined {
  const value = object[name];
  return typeof value === "string" ? value : undefined;
}

export function removeMinAndVersionNumbers(fileName: string): string {
  let end = fileName.length;
  for (let position = end; position > 0;) {
    let char = fileName[position - 1]!;
    if (isAsciiDigit(char)) {
      do {
        position -= 1;
        char = position > 0 ? fileName[position - 1]! : "";
      } while (position > 0 && isAsciiDigit(char));
    } else if (position > 3 && (char === "n" || char === "N")) {
      position -= 1;
      char = fileName[position - 1]!;
      if (char !== "i" && char !== "I") break;
      position -= 1;
      char = fileName[position - 1]!;
      if (char !== "m" && char !== "M") break;
      position -= 1;
      char = position > 0 ? fileName[position - 1]! : "";
    } else {
      break;
    }

    if (char !== "-" && char !== ".") break;
    position -= 1;
    end = position;
  }
  return fileName.slice(0, end);
}

function isAsciiDigit(char: string): boolean {
  return char >= "0" && char <= "9";
}
