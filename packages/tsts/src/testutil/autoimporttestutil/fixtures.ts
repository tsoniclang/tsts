import { newSession, type Session } from "../../project/session.js";
import { SnapshotFS } from "../../project/snapshotFs.js";
import { newProjectTestHost, type ProjectTestHost } from "../projecttestutil/projectTestUtil.js";

export interface AutoImportFixture {
  readonly packageName: string;
  readonly files: ReadonlyMap<string, string>;
}

export function createAutoImportFixture(packageName: string, files: Iterable<readonly [string, string]>): AutoImportFixture {
  return { packageName, files: new Map(files) };
}

export class FileHandle {
  constructor(
    private readonly fileNameValue: string,
    private readonly contentValue: string,
  ) {}

  fileName(): string { return this.fileNameValue; }
  content(): string { return this.contentValue; }
  uri(): string { return fileNameToUri(this.fileNameValue); }
}

export class ProjectFileHandle extends FileHandle {
  constructor(fileName: string, content: string, private readonly exportIdentifierValue: string) {
    super(fileName, content);
  }

  exportIdentifier(): string { return this.exportIdentifierValue; }
}

export class NodeModulesPackageHandle {
  constructor(
    readonly name: string,
    readonly directory: string,
    private readonly packageJsonValue: FileHandle,
    private readonly declarationValue: FileHandle,
  ) {}

  packageJSONFile(): FileHandle { return this.packageJsonValue; }
  declarationFile(): FileHandle { return this.declarationValue; }
}

export class ProjectHandle {
  constructor(
    private readonly rootValue: string,
    private readonly filesValue: readonly ProjectFileHandle[],
    private readonly tsconfigValue: FileHandle,
    private readonly packageJsonValue: FileHandle,
    private readonly nodeModulesValue: readonly NodeModulesPackageHandle[],
    private readonly dependenciesValue: readonly string[],
  ) {}

  root(): string { return this.rootValue; }
  files(): readonly ProjectFileHandle[] { return [...this.filesValue]; }
  file(index: number): ProjectFileHandle {
    if (index < 0 || index >= this.filesValue.length) throw new Error(`file index ${index} out of range`);
    return this.filesValue[index]!;
  }
  tsConfig(): FileHandle { return this.tsconfigValue; }
  packageJSONFile(): FileHandle { return this.packageJsonValue; }
  nodeModules(): readonly NodeModulesPackageHandle[] { return [...this.nodeModulesValue]; }
  dependencies(): readonly string[] { return [...this.dependenciesValue]; }
  nodeModuleByName(name: string): NodeModulesPackageHandle | undefined {
    return this.nodeModulesValue.find(pkg => pkg.name === name);
  }
}

export class MonorepoHandle {
  constructor(
    private readonly rootValue: string,
    private readonly rootNodeModulesValue: readonly NodeModulesPackageHandle[],
    private readonly rootDependenciesValue: readonly string[],
    private readonly packagesValue: readonly ProjectHandle[],
    private readonly rootTSConfigValue: FileHandle,
    private readonly rootPackageJSONValue: FileHandle,
  ) {}

  root(): string { return this.rootValue; }
  rootNodeModules(): readonly NodeModulesPackageHandle[] { return [...this.rootNodeModulesValue]; }
  rootDependencies(): readonly string[] { return [...this.rootDependenciesValue]; }
  packages(): readonly ProjectHandle[] { return [...this.packagesValue]; }
  package(index: number): ProjectHandle {
    if (index < 0 || index >= this.packagesValue.length) throw new Error(`package index ${index} out of range`);
    return this.packagesValue[index]!;
  }
  rootTSConfig(): FileHandle { return this.rootTSConfigValue; }
  rootPackageJSONFile(): FileHandle { return this.rootPackageJSONValue; }
}

export class Fixture {
  constructor(
    private readonly sessionValue: Session,
    private readonly utilsValue: ProjectTestHost,
    private readonly projectsValue: readonly ProjectHandle[],
  ) {}

  session(): Session { return this.sessionValue; }
  utils(): ProjectTestHost { return this.utilsValue; }
  projects(): readonly ProjectHandle[] { return [...this.projectsValue]; }
  project(index: number): ProjectHandle {
    if (index < 0 || index >= this.projectsValue.length) throw new Error(`project index ${index} out of range`);
    return this.projectsValue[index]!;
  }
  singleProject(): ProjectHandle { return this.project(0); }
}

export class MonorepoFixture {
  constructor(
    private readonly sessionValue: Session,
    private readonly utilsValue: ProjectTestHost,
    private readonly monorepoValue: MonorepoHandle,
    private readonly extraValue: readonly FileHandle[],
  ) {}

  session(): Session { return this.sessionValue; }
  utils(): ProjectTestHost { return this.utilsValue; }
  monorepo(): MonorepoHandle { return this.monorepoValue; }
  extraFiles(): readonly FileHandle[] { return [...this.extraValue]; }
  extraFile(path: string): FileHandle {
    const normalized = normalizeAbsolutePath(path);
    const found = this.extraValue.find(file => file.fileName() === normalized);
    if (found === undefined) throw new Error(`extra file not found: ${path}`);
    return found;
  }
}

export interface MonorepoPackageTemplate {
  readonly name?: string;
  readonly nodeModuleNames?: readonly string[];
  readonly dependencyNames?: readonly string[];
}

export interface MonorepoSetupConfig extends MonorepoPackageTemplate {
  readonly root: string;
  readonly packages?: readonly MonorepoPackageConfig[];
  readonly extraFiles?: readonly TextFileSpec[];
  readonly symlinks?: readonly SymlinkSpec[];
}

export interface MonorepoPackageConfig extends MonorepoPackageTemplate {
  readonly fileCount: number;
}

export interface TextFileSpec {
  readonly path: string;
  readonly content: string;
}

export interface SymlinkSpec {
  readonly link: string;
  readonly target: string;
}

export interface SymlinkHandle {
  readonly kind: "symlink";
  readonly target: string;
}

interface ProjectFileRecord {
  readonly fileName: string;
  readonly exportIdentifier: string;
  readonly content: string;
}

interface ProjectRecord {
  readonly root: string;
  readonly sourceFiles: ProjectFileRecord[];
  tsconfig: FileHandle | undefined;
  packageJSON: FileHandle | undefined;
  readonly nodeModules: NodeModulesPackageHandle[];
  dependencies: readonly string[];
}

export function setupLifecycleSession(projectRoot: string, fileCount: number): Fixture {
  const builder = new FileMapBuilder();
  builder.addLocalProject(projectRoot, fileCount);
  const nodeModulesDir = combinePaths(projectRoot, "node_modules");
  const dependencies = builder.addNodeModulesPackages(nodeModulesDir, 1);
  builder.addPackageJSONWithDependencies(projectRoot, dependencies);
  const runtime = setupProjectRuntime(builder.files(), normalizeAbsolutePath(projectRoot));
  return new Fixture(runtime.session, runtime.utils, builder.projectHandles());
}

export function setupMonorepoLifecycleSession(config: MonorepoSetupConfig): MonorepoFixture {
  const builder = new FileMapBuilder();
  const monorepoRoot = normalizeAbsolutePath(config.root);
  const monorepoName = config.name ?? "monorepo";
  const rootTSConfigPath = combinePaths(monorepoRoot, "tsconfig.json");
  const rootTSConfigContent = "{\n  \"compilerOptions\": {\n    \"module\": \"esnext\",\n    \"target\": \"esnext\",\n    \"strict\": true,\n    \"baseUrl\": \".\",\n    \"allowJs\": true,\n    \"checkJs\": true\n  }\n}\n";
  builder.addTextFile(rootTSConfigPath, rootTSConfigContent);
  const rootTSConfig = new FileHandle(rootTSConfigPath, rootTSConfigContent);
  const rootNodeModulesDir = combinePaths(monorepoRoot, "node_modules");
  const rootNodeModules = builder.addNodeModulesPackagesWithNames(rootNodeModulesDir, config.nodeModuleNames ?? []);
  const rootDependencies = selectPackagesByName(rootNodeModules, config.dependencyNames ?? []);
  const rootPackageJSON = builder.addRootPackageJSON(monorepoRoot, monorepoName, rootDependencies);
  const packageHandles: ProjectHandle[] = [];
  const packagesDir = combinePaths(monorepoRoot, "packages");
  for (const pkg of config.packages ?? []) {
    const pkgDir = combinePaths(packagesDir, pkg.name ?? `package-${packageHandles.length + 1}`);
    builder.addLocalProject(pkgDir, pkg.fileCount);
    const packageNodeModules = pkg.nodeModuleNames === undefined || pkg.nodeModuleNames.length === 0
      ? []
      : builder.addNodeModulesPackagesWithNames(combinePaths(pkgDir, "node_modules"), pkg.nodeModuleNames);
    const selectedDeps = selectPackagesByName([...rootNodeModules, ...packageNodeModules], pkg.dependencyNames ?? []);
    if (selectedDeps.length > 0) builder.addPackageJSONWithDependenciesNamed(pkgDir, pkg.name ?? "", selectedDeps);
  }
  const extraHandles: FileHandle[] = [];
  for (const extra of config.extraFiles ?? []) {
    builder.addTextFile(extra.path, extra.content);
    extraHandles.push(new FileHandle(normalizeAbsolutePath(extra.path), extra.content));
  }
  for (const symlink of config.symlinks ?? []) builder.addSymlink(symlink.link, symlink.target);
  for (const pkg of config.packages ?? []) {
    const pkgDir = combinePaths(packagesDir, pkg.name ?? `package-${packageHandles.length + 1}`);
    const record = builder.projectRecord(pkgDir);
    if (record !== undefined) packageHandles.push(projectRecordToHandle(record));
  }
  const rootRecord = builder.projectRecord(monorepoRoot);
  const monorepo = new MonorepoHandle(
    monorepoRoot,
    rootRecord?.nodeModules ?? [],
    packageNames(rootDependencies),
    packageHandles,
    rootTSConfig,
    rootPackageJSON,
  );
  const runtime = setupProjectRuntime(builder.files(), monorepoRoot);
  return new MonorepoFixture(runtime.session, runtime.utils, monorepo, extraHandles);
}

class FileMapBuilder {
  private readonly filesValue = new Map<string, string | SymlinkHandle>();
  private nextPackageId = 0;
  private nextProjectId = 0;
  private readonly projects = new Map<string, ProjectRecord>();

  constructor(initial?: ReadonlyMap<string, string | SymlinkHandle>) {
    for (const [path, content] of initial ?? []) this.filesValue.set(normalizeAbsolutePath(path), content);
  }

  files(): ReadonlyMap<string, string | SymlinkHandle> { return new Map(this.filesValue); }
  projectRecord(root: string): ProjectRecord | undefined { return this.projects.get(normalizeAbsolutePath(root)); }

  projectHandles(): readonly ProjectHandle[] {
    return [...this.projects.keys()].sort().map(key => projectRecordToHandle(this.projects.get(key)!));
  }

  addTextFile(path: string, contents: string): void {
    this.filesValue.set(normalizeAbsolutePath(path), contents);
  }

  addSymlink(linkPath: string, targetPath: string): void {
    this.filesValue.set(normalizeAbsolutePath(linkPath), { kind: "symlink", target: normalizeAbsolutePath(targetPath) });
  }

  addNodeModulesPackages(nodeModulesDir: string, count: number): readonly NodeModulesPackageHandle[] {
    const packages: NodeModulesPackageHandle[] = [];
    for (let index = 0; index < count; index++) packages.push(this.addNodeModulesPackage(nodeModulesDir));
    return packages;
  }

  addNodeModulesPackagesWithNames(nodeModulesDir: string, names: readonly string[]): readonly NodeModulesPackageHandle[] {
    return names.map(name => this.addNamedNodeModulesPackage(nodeModulesDir, name));
  }

  addNodeModulesPackage(nodeModulesDir: string): NodeModulesPackageHandle {
    return this.addNamedNodeModulesPackage(nodeModulesDir, "");
  }

  addNamedNodeModulesPackage(nodeModulesDir: string, name: string): NodeModulesPackageHandle {
    const normalizedDir = normalizeAbsolutePath(nodeModulesDir);
    if (baseFileName(normalizedDir) !== "node_modules") throw new Error(`nodeModulesDir must point to a node_modules directory: ${nodeModulesDir}`);
    this.nextPackageId++;
    const resolvedName = name === "" ? `pkg${this.nextPackageId}` : name;
    const exportName = `${sanitizeIdentifier(resolvedName)}_value`;
    const pkgDir = combinePaths(normalizedDir, resolvedName);
    const packageJSONPath = combinePaths(pkgDir, "package.json");
    const packageJSONContent = `{"name":"${resolvedName}","types":"index.d.ts"}`;
    const declarationPath = combinePaths(pkgDir, "index.d.ts");
    const declarationContent = `export declare const ${exportName}: number;\n`;
    this.filesValue.set(packageJSONPath, packageJSONContent);
    this.filesValue.set(declarationPath, declarationContent);
    const handle = new NodeModulesPackageHandle(
      resolvedName,
      pkgDir,
      new FileHandle(packageJSONPath, packageJSONContent),
      new FileHandle(declarationPath, declarationContent),
    );
    this.ensureProjectRecord(directoryPath(normalizedDir)).nodeModules.push(handle);
    return handle;
  }

  addLocalProject(projectDir: string, fileCount: number): void {
    if (fileCount < 0) throw new Error("fileCount must be non-negative");
    const dir = normalizeAbsolutePath(projectDir);
    const record = this.ensureProjectRecord(dir);
    this.nextProjectId++;
    const tsConfigPath = combinePaths(dir, "tsconfig.json");
    const tsConfigContent = "{\n  \"compilerOptions\": {\n    \"module\": \"esnext\",\n    \"target\": \"esnext\",\n    \"strict\": true,\n    \"allowJs\": true,\n    \"checkJs\": true\n  }\n}\n";
    this.filesValue.set(tsConfigPath, tsConfigContent);
    record.tsconfig = new FileHandle(tsConfigPath, tsConfigContent);
    for (let index = 1; index <= fileCount; index++) {
      const path = combinePaths(dir, `file${index}.ts`);
      const exportName = `localExport${this.nextProjectId}_${index}`;
      const content = `export const ${exportName} = ${index};\n`;
      this.filesValue.set(path, content);
      record.sourceFiles.push({ fileName: path, exportIdentifier: exportName, content });
    }
  }

  addPackageJSONWithDependencies(projectDir: string, dependencies: readonly NodeModulesPackageHandle[]): FileHandle {
    this.nextProjectId++;
    return this.addPackageJSONWithDependenciesNamed(projectDir, `local-project-${this.nextProjectId}`, dependencies);
  }

  addPackageJSONWithDependenciesNamed(projectDir: string, packageName: string, dependencies: readonly NodeModulesPackageHandle[]): FileHandle {
    const dir = normalizeAbsolutePath(projectDir);
    const path = combinePaths(dir, "package.json");
    const name = packageName === "" ? `local-project-${++this.nextProjectId}` : packageName;
    const content = packageJsonText(name, false, dependencies);
    this.filesValue.set(path, content);
    const handle = new FileHandle(path, content);
    const record = this.ensureProjectRecord(dir);
    record.packageJSON = handle;
    record.dependencies = packageNames(dependencies);
    return handle;
  }

  addRootPackageJSON(rootDir: string, packageName: string, dependencies: readonly NodeModulesPackageHandle[]): FileHandle {
    const dir = normalizeAbsolutePath(rootDir);
    const path = combinePaths(dir, "package.json");
    const content = packageJsonText(packageName === "" ? "monorepo-root" : packageName, true, dependencies);
    this.filesValue.set(path, content);
    return new FileHandle(path, content);
  }

  private ensureProjectRecord(root: string): ProjectRecord {
    const normalized = normalizeAbsolutePath(root);
    let record = this.projects.get(normalized);
    if (record === undefined) {
      record = { root: normalized, sourceFiles: [], tsconfig: undefined, packageJSON: undefined, nodeModules: [], dependencies: [] };
      this.projects.set(normalized, record);
    }
    return record;
  }
}

function projectRecordToHandle(record: ProjectRecord): ProjectHandle {
  const files = record.sourceFiles.map(file => new ProjectFileHandle(file.fileName, file.content, file.exportIdentifier));
  return new ProjectHandle(record.root, files, record.tsconfig ?? new FileHandle("", ""), record.packageJSON ?? new FileHandle("", ""), record.nodeModules, record.dependencies);
}

function setupProjectRuntime(files: ReadonlyMap<string, string | SymlinkHandle>, currentDirectory: string): { readonly session: Session; readonly utils: ProjectTestHost } {
  const textFiles = new Map<string, string>();
  for (const [fileName, content] of files) {
    if (typeof content === "string") textFiles.set(fileName, content);
  }
  const utils = newProjectTestHost(textFiles);
  const fs = new SnapshotFS(textFiles);
  const session = newSession({ options: { currentDirectory }, fs, client: utils.client });
  return { session, utils };
}

function packageJsonText(name: string, isPrivate: boolean, dependencies: readonly NodeModulesPackageHandle[]): string {
  const lines = dependencies.map(dep => `"${dep.name}": "*"`);
  let text = `{\n  "name": "${name}"`;
  if (isPrivate) text += ",\n  \"private\": true";
  if (lines.length > 0) text += `,\n  "dependencies": {\n    ${lines.join(",\n    ")}\n  }\n`;
  else text += "\n";
  return `${text}}\n`;
}

function selectPackagesByName(available: readonly NodeModulesPackageHandle[], names: readonly string[]): readonly NodeModulesPackageHandle[] {
  if (names.length === 0) return [...available];
  return names.map(name => {
    const found = available.find(candidate => candidate.name === name);
    if (found === undefined) throw new Error(`dependency not found: ${name}`);
    return found;
  });
}

function packageNames(dependencies: readonly NodeModulesPackageHandle[]): readonly string[] {
  return dependencies.map(dep => dep.name);
}

function sanitizeIdentifier(name: string): string {
  const sanitized = [...name].filter(ch => /[A-Za-z0-9_-]/.test(ch)).join("").replaceAll("-", "_");
  return sanitized === "" ? "pkg" : sanitized;
}

function normalizeAbsolutePath(path: string): string {
  const normalized = normalizePath(path);
  if (!normalized.startsWith("/")) throw new Error(`paths used in lifecycle tests must be absolute: ${path}`);
  return normalized;
}

function normalizePath(path: string): string {
  const parts: string[] = [];
  for (const part of path.replaceAll("\\", "/").split("/")) {
    if (part.length === 0 || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return path.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
}

function combinePaths(...parts: readonly string[]): string {
  return normalizePath(parts.join("/"));
}

function baseFileName(path: string): string {
  const normalized = normalizePath(path);
  const index = normalized.lastIndexOf("/");
  return index < 0 ? normalized : normalized.slice(index + 1);
}

function directoryPath(path: string): string {
  const normalized = normalizePath(path);
  const index = normalized.lastIndexOf("/");
  return index <= 0 ? "/" : normalized.slice(0, index);
}

function fileNameToUri(fileName: string): string {
  return `file://${encodeURI(fileName)}`;
}
