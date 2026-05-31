export interface TypingsInfo {
  readonly inferredTypings: readonly string[];
  readonly unresolvedImports: readonly string[];
  readonly projectRootPath: string;
  readonly compilerOptions?: object | undefined;
}

export interface TypingsInstaller {
  readonly installPackage: (packageName: string) => Promise<void> | void;
}

export interface ATAStateChange {
  readonly projectName: string;
  readonly typingsFiles: readonly string[];
  readonly unresolvedImports: readonly string[];
}

export interface NpmExecutor {
  readonly exec: (args: readonly string[], cwd: string) => Promise<string> | string;
}

export function computeTypingsInfo(projectRootPath: string, unresolvedImports: Iterable<string>, compilerOptions?: object): TypingsInfo {
  const imports = [...unresolvedImports].sort();
  return {
    projectRootPath,
    unresolvedImports: imports,
    inferredTypings: imports.map(toTypingPackageName).filter((value, index, array) => array.indexOf(value) === index),
    compilerOptions,
  };
}

export function toTypingPackageName(packageName: string): string {
  if (packageName.startsWith("@types/")) return packageName;
  if (packageName.startsWith("@")) {
    const [scope, name] = packageName.split("/");
    return `@types/${scope!.slice(1)}__${name ?? ""}`;
  }
  return `@types/${packageName}`;
}
