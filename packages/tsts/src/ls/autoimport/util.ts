import {
  Kind,
  SymbolFlags,
  isExportAssignment,
  isExportSpecifier,
  isIdentifier,
  isSourceFile,
  nodeText,
  type Node as AstNode,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../../ast/index.js";
import { type Checker, newChecker } from "../../checker/index.js";
import { emptyCompilerOptions, identity, type CompilerOptions } from "../../core/index.js";
import { SetCollection, newSetWithSizeHint } from "../../collections/index.js";
import { Resolver, type ResolverHost } from "../../module/resolver.js";
import {
  getPackageNameFromTypesPackageName,
  parseNodeModuleFromPath,
} from "../../module/index.js";
import { getPackageNameFromDirectory } from "../../modulespecifiers/index.js";
import { forEachDependency, type PackageJSON } from "../../packagejson/index.js";
import type { Program } from "../../program/index.js";
import {
  combinePaths,
  getBaseFileName,
  type Path,
} from "../../tspath/index.js";
import { errNotExist, type Entries, type FS } from "../../vfs/index.js";
import { wrap } from "../../vfs/wrapvfs/index.js";
import type { ModuleID } from "./export.js";

export type ModuleSymbolLookupResult = readonly [ModuleID, string, boolean];
export type ModuleSymbolResult = readonly [ModuleID, string];
export type PackageNamesInNodeModulesResult = readonly [SetCollection<string> | undefined, Error | undefined];
export type CheckerLease = readonly [Checker, () => void];
export type GetChecker = () => CheckerLease;
export type CloseCheckerPool = () => void;
export type GetCreatedCheckerCount = () => number;
export type CheckerPoolResult = readonly [GetChecker, CloseCheckerPool, GetCreatedCheckerCount];
export type RealpathTransform = (fileName: string) => string;
export type PackageRealpathFuncs = readonly [RealpathTransform, RealpathTransform];

export interface AutoImportTypeChecker {
  tryFindAmbientModule(name: string): AstSymbol | undefined;
}

export interface AutoImportResolvedPackageProgram {
  resolvedPackageNames(): Iterable<string> | SetCollection<string>;
  unresolvedPackageNames(): Iterable<string> | SetCollection<string>;
  options(): { readonly types?: readonly string[] };
  getTypeChecker(ctx: unknown): readonly [AutoImportTypeChecker, () => void];
}

export interface ProjectReferenceMapping {
  readonly source: string;
}

export interface ProjectReferenceForAutoImport {
  parseInputOutputNames(): void;
  outputDtsToProjectReference(): ReadonlyMap<Path, ProjectReferenceMapping>;
}

export interface ProjectReferenceProgram {
  getResolvedProjectReferences(): readonly (ProjectReferenceForAutoImport | undefined)[];
}

export interface RegistryCloneHostForModuleResolver {
  getCurrentDirectory(): string;
  fs(): FS;
}

export function tryGetModuleIDAndFileNameOfModuleSymbol(symbol: AstSymbol): ModuleSymbolLookupResult {
  if (!isExternalModuleSymbol(symbol)) {
    return ["", "", false];
  }

  const declaration = getNonAugmentationDeclaration(symbol);
  if (declaration === undefined) {
    return ["", "", false];
  }

  if (isSourceFile(declaration)) {
    return [declaration.path, declaration.fileName, true];
  }

  if (isModuleWithStringLiteralName(declaration)) {
    return [nodeText(declaration.name), "", true];
  }

  return ["", "", false];
}

export function getModuleIDAndFileNameOfModuleSymbol(symbol: AstSymbol): ModuleSymbolResult {
  if (!isExternalModuleSymbol(symbol)) {
    throw new Error("symbol is not an external module");
  }

  const declaration = getNonAugmentationDeclaration(symbol);
  if (declaration === undefined) {
    throw new Error("module symbol has no non-augmentation declaration");
  }

  if (isSourceFile(declaration)) {
    return [declaration.path, declaration.fileName];
  }

  if (isModuleWithStringLiteralName(declaration)) {
    return [nodeText(declaration.name), ""];
  }

  throw new Error("could not determine module ID of module symbol");
}

export function wordIndices(value: string): readonly number[] {
  const indices: number[] = [];
  for (let index = 0; index < value.length;) {
    const runeValue = value.codePointAt(index);
    if (runeValue === undefined) break;
    const runeLength = runeValue > 0xffff ? 2 : 1;
    if (index === 0) {
      indices.push(index);
      index += runeLength;
      continue;
    }
    if (runeValue === 95) {
      if (index + 1 < value.length && value.charCodeAt(index + 1) !== 95) {
        indices.push(index + 1);
      }
      index += runeLength;
      continue;
    }
    if (isUpperRune(runeValue) && (isLowerRune(previousRune(value, index)) || isLowerRune(nextRune(value, index + runeLength)))) {
      indices.push(index);
    }
    index += runeLength;
  }
  return indices;
}

export function getPackageNamesInNodeModules(nodeModulesDir: string, fileSystem: FS): PackageNamesInNodeModulesResult {
  const packageNames = new SetCollection<string>();
  if (getBaseFileName(nodeModulesDir) !== "node_modules") {
    throw new Error("nodeModulesDir is not a node_modules directory");
  }
  if (!fileSystem.directoryExists(nodeModulesDir)) {
    return [undefined, errNotExist];
  }
  const entries = fileSystem.getAccessibleEntries(nodeModulesDir);
  for (const baseName of entries.directories) {
    if (baseName[0] === ".") {
      continue;
    }
    if (baseName[0] === "@") {
      const scopedDirPath = combinePaths(nodeModulesDir, baseName);
      for (const scopedPackageDirName of fileSystem.getAccessibleEntries(scopedDirPath).directories) {
        const scopedBaseName = getBaseFileName(scopedPackageDirName);
        if (baseName === "@types") {
          packageNames.add(getPackageNameFromTypesPackageName(combinePaths("@types", scopedBaseName)));
        } else {
          packageNames.add(combinePaths(baseName, scopedBaseName));
        }
      }
      continue;
    }
    packageNames.add(baseName);
  }
  return [packageNames, undefined];
}

export function getDefaultLikeExportNameFromDeclaration(symbol: AstSymbol): string {
  for (const declaration of symbol.declarations) {
    if (isExportAssignment(declaration)) {
      const innerExpression = skipOuterExpressions(declaration.expression);
      if (isIdentifier(innerExpression)) {
        return innerExpression.text;
      }
      continue;
    }

    if (
      isExportSpecifier(declaration)
      && (declaration.symbol?.flags ?? 0) === SymbolFlags.Alias
      && declaration.propertyName !== undefined
    ) {
      if (declaration.propertyName.kind === Kind.Identifier) {
        return nodeText(declaration.propertyName);
      }
      continue;
    }

    const name = getNameOfDeclaration(declaration);
    if (name !== undefined && name.kind === Kind.Identifier) {
      return nodeText(name);
    }

    if (symbol.parent !== undefined && !isExternalModuleSymbol(symbol.parent)) {
      return symbolName(symbol.parent);
    }
  }
  return "";
}

export function getResolvedPackageNames(ctx: unknown, program: AutoImportResolvedPackageProgram): SetCollection<string> {
  const rawNames = program.resolvedPackageNames();
  const unresolvedPackageNames = program.unresolvedPackageNames();
  const resolvedPackageNames = newSetWithSizeHint<string>(collectionLength(rawNames));

  for (const name of collectionKeys(rawNames)) {
    resolvedPackageNames.add(getPackageNameFromTypesPackageName(name));
  }

  for (const name of program.options().types ?? []) {
    if (name !== "*") {
      resolvedPackageNames.add(getPackageNameFromTypesPackageName(name));
    }
  }

  if (collectionLength(unresolvedPackageNames) > 0) {
    const [checker, done] = program.getTypeChecker(ctx);
    try {
      for (const name of collectionKeys(unresolvedPackageNames)) {
        const symbol = checker.tryFindAmbientModule(name);
        if (symbol === undefined) {
          continue;
        }
        const declaringFile = getSourceFileOfModule(symbol);
        if (declaringFile === undefined) {
          continue;
        }
        const packageName = getPackageNameFromDirectory(declaringFile.fileName);
        if (packageName !== "") {
          resolvedPackageNames.add(getPackageNameFromTypesPackageName(packageName));
        }
      }
    } finally {
      done();
    }
  }
  return resolvedPackageNames;
}

export function addProjectReferenceOutputMappings(program: ProjectReferenceProgram, result: Map<Path, string>): void {
  for (const reference of program.getResolvedProjectReferences()) {
    if (reference === undefined) {
      continue;
    }
    reference.parseInputOutputNames();
    for (const [outputDtsPath, mapping] of reference.outputDtsToProjectReference()) {
      if (!result.has(outputDtsPath)) {
        result.set(outputDtsPath, mapping.source);
      }
    }
  }
}

export function createCheckerPool(program: Program | undefined, maxSize = 1): CheckerPoolResult {
  const limit = Math.max(1, Math.trunc(maxSize));
  const pool: Checker[] = [];
  let created = 0;
  let closed = false;

  const releaseChecker = (checker: Checker): void => {
    if (closed) return;
    pool.push(checker);
  };

  const getChecker = (): CheckerLease => {
    if (closed) {
      throw new Error("checker pool is closed");
    }
    const existing = pool.pop();
    if (existing !== undefined) {
      return [existing, once(() => releaseChecker(existing))];
    }
    if (created >= limit) {
      throw new Error("checker pool exhausted; release a checker before acquiring another");
    }
    const checker = newChecker(program);
    created += 1;
    return [checker, once(() => releaseChecker(checker))];
  };

  return [
    getChecker,
    () => {
      closed = true;
      pool.length = 0;
    },
    () => created,
  ];
}

export function addPackageJsonDependencies(contents: PackageJSON, deps: SetCollection<string>): void {
  forEachDependency(contents, (name, _version, field) => {
    if (name === "" || name === "@types/" || name[0] === ".") {
      return true;
    }
    if (field === "dependencies" || field === "peerDependencies") {
      deps.add(getPackageNameFromTypesPackageName(name));
    }
    return true;
  });
}

export function getPackageRealpathFuncs(fileSystem: FS, packageDir: string): PackageRealpathFuncs {
  const realPackageDir = fileSystem.realpath(packageDir);
  const isSymlinked = realPackageDir !== packageDir;
  const dirCache = new Map<string, string>();

  const toRealpath = (fileName: string): string => {
    if (isSymlinked && fileName.startsWith(packageDir)) {
      return realPackageDir + fileName.slice(packageDir.length);
    }

    const pkgDir = parseNodeModuleFromPath(fileName, false);
    if (pkgDir === "") {
      return fileName;
    }

    const cachedRealDir = dirCache.get(pkgDir);
    if (cachedRealDir !== undefined) {
      if (cachedRealDir === pkgDir) {
        return fileName;
      }
      return cachedRealDir + fileName.slice(pkgDir.length);
    }

    const realDir = fileSystem.realpath(pkgDir);
    dirCache.set(pkgDir, realDir);
    if (realDir === pkgDir) {
      return fileName;
    }
    return realDir + fileName.slice(pkgDir.length);
  };

  if (!isSymlinked) {
    return [toRealpath, identity];
  }

  const toSymlink = (fileName: string): string => {
    if (fileName.startsWith(realPackageDir)) {
      return packageDir + fileName.slice(realPackageDir.length);
    }
    return fileName;
  };
  return [toRealpath, toSymlink];
}

export class ResolutionHost implements ResolverHost {
  private readonly fileSystem: FS;
  private readonly currentDirectoryValue: string;

  constructor(fileSystem: FS, currentDirectory: string) {
    this.fileSystem = fileSystem;
    this.currentDirectoryValue = currentDirectory;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.fileSystem.useCaseSensitiveFileNames();
  }

  getCurrentDirectory(): string {
    return this.currentDirectoryValue;
  }

  fileExists(path: string): boolean {
    return this.fileSystem.fileExists(path);
  }

  directoryExists(path: string): boolean {
    return this.fileSystem.directoryExists(path);
  }

  readFile(path: string): string | undefined {
    return this.fileSystem.readFile(path);
  }

  realpath(path: string): string {
    return this.fileSystem.realpath(path);
  }

  getAccessibleEntries(path: string): Entries {
    return this.fileSystem.getAccessibleEntries(path);
  }
}

export function getModuleResolver(
  host: RegistryCloneHostForModuleResolver,
  realpath: (fileName: string) => string,
  opts: Partial<CompilerOptions> = {},
): Resolver {
  const resolutionHost = new ResolutionHost(
    wrap(host.fs(), { realpath }),
    host.getCurrentDirectory(),
  );
  return new Resolver(
    resolutionHost,
    { ...emptyCompilerOptions, ...opts },
    undefined,
    "",
    "",
  );
}

function getNonAugmentationDeclaration(symbol: AstSymbol): AstNode | undefined {
  for (const declaration of symbol.declarations) {
    if (!isGlobalScopeAugmentation(declaration)) {
      return declaration;
    }
  }
  return undefined;
}

function isGlobalScopeAugmentation(node: AstNode): boolean {
  return node.kind === Kind.ModuleDeclaration && nodeText((node as { readonly name?: AstNode }).name) === "global";
}

function isModuleWithStringLiteralName(node: AstNode): node is AstNode & { readonly name: AstNode } {
  return node.kind === Kind.ModuleDeclaration && (node as { readonly name?: AstNode }).name?.kind === Kind.StringLiteral;
}

function skipOuterExpressions(node: AstNode): AstNode {
  let current = node;
  for (;;) {
    if (
      current.kind !== Kind.ParenthesizedExpression
      && current.kind !== Kind.TypeAssertionExpression
      && current.kind !== Kind.AsExpression
      && current.kind !== Kind.SatisfiesExpression
      && current.kind !== Kind.ExpressionWithTypeArguments
      && current.kind !== Kind.NonNullExpression
      && current.kind !== Kind.PartiallyEmittedExpression
    ) {
      return current;
    }
    const expression = (current as { readonly expression?: AstNode }).expression;
    if (expression === undefined) {
      return current;
    }
    current = expression;
  }
}

function getNameOfDeclaration(node: AstNode): AstNode | undefined {
  return (node as { readonly name?: AstNode }).name;
}

function getSourceFileOfModule(symbol: AstSymbol): SourceFile | undefined {
  const declaration = getNonAugmentationDeclaration(symbol);
  if (declaration === undefined) {
    return undefined;
  }
  if (isSourceFile(declaration)) {
    return declaration;
  }

  let current: AstNode | undefined = declaration;
  while (current !== undefined && !isSourceFile(current)) {
    current = current.parent;
  }
  return current;
}

function isExternalModuleSymbol(symbol: AstSymbol): boolean {
  const symbolObject = symbol as AstSymbol & {
    readonly isExternalModule?: () => boolean;
    readonly IsExternalModule?: () => boolean;
  };
  const lowerResult = symbolObject.isExternalModule?.();
  if (lowerResult !== undefined) {
    return lowerResult;
  }
  const upperResult = symbolObject.IsExternalModule?.();
  if (upperResult !== undefined) {
    return upperResult;
  }
  return ((symbol.flags ?? 0) & SymbolFlags.Module) !== 0 && symbolName(symbol).startsWith("\"");
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function collectionLength<T>(collection: Iterable<T> | SetCollection<T>): number {
  if (collection instanceof SetCollection) {
    return collection.len();
  }
  if (collection instanceof Set) {
    return collection.size;
  }
  if (collection instanceof Map) {
    return collection.size;
  }
  let count = 0;
  for (const _value of collection) {
    count += 1;
  }
  return count;
}

function collectionKeys<T>(collection: Iterable<T> | SetCollection<T>): Iterable<T> {
  if (collection instanceof SetCollection) {
    return collection.keys();
  }
  return collection;
}

function previousRune(value: string, index: number): number | undefined {
  if (index <= 0) {
    return undefined;
  }
  const previous = value.codePointAt(index - 1);
  const first = previous === undefined || !isLowSurrogate(previous) || index < 2
    ? index - 1
    : index - 2;
  return value.codePointAt(first);
}

function nextRune(value: string, index: number): number | undefined {
  if (index >= value.length) {
    return undefined;
  }
  return value.codePointAt(index);
}

function isLowSurrogate(value: number): boolean {
  return value >= 0xdc00 && value <= 0xdfff;
}

function isUpperRune(value: number | undefined): boolean {
  if (value === undefined) {
    return false;
  }
  const text = String.fromCodePoint(value);
  return text.toLocaleUpperCase() === text && text.toLocaleLowerCase() !== text;
}

function isLowerRune(value: number | undefined): boolean {
  if (value === undefined) {
    return false;
  }
  const text = String.fromCodePoint(value);
  return text.toLocaleLowerCase() === text && text.toLocaleUpperCase() !== text;
}

function once(action: () => void): () => void {
  let done = false;
  return () => {
    if (done) return;
    done = true;
    action();
  };
}
