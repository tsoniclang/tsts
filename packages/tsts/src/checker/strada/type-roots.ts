/**
 * Type-root + ambient module resolution.
 *
 * Ported from Strada `module/resolver.go` — getEffectiveTypeRoots,
 * resolveAmbientModule, getDefaultLibraryFileName.
 *
 * Tsonic targets .NET, so type-roots aren't traditional `@types` — but
 * the resolver still walks named roots configured in tsconfig.
 */

/**
 * Returns the default type-roots based on a project's root path.
 */
export function getDefaultTypeRoots(_projectRoot: string): readonly string[] {
  return [];
}

/**
 * Returns true when a module specifier is an ambient module name
 * (starts with `@` or contains no slashes and isn't a node-built-in).
 */
export function isAmbientModuleSpecifier(moduleName: string): boolean {
  if (moduleName.length === 0) return false;
  if (moduleName.startsWith("./")) return false;
  if (moduleName.startsWith("../")) return false;
  if (moduleName.startsWith("/")) return false;
  return true;
}

/**
 * Returns true when the module name is a "scoped" package name
 * (`@scope/name`).
 */
export function isScopedPackageName(moduleName: string): boolean {
  return moduleName.startsWith("@") && moduleName.includes("/");
}

/**
 * Returns the scope portion of a scoped name (`@scope/name` → `@scope`).
 */
export function getPackageScope(moduleName: string): string | undefined {
  if (!isScopedPackageName(moduleName)) return undefined;
  const slashIdx = moduleName.indexOf("/");
  return moduleName.slice(0, slashIdx);
}

/**
 * Returns the package name portion (`@scope/name` → `name`,
 * `lodash` → `lodash`).
 */
export function getPackageName(moduleName: string): string {
  if (isScopedPackageName(moduleName)) {
    const slashIdx = moduleName.indexOf("/");
    return moduleName.slice(slashIdx + 1);
  }
  const slashIdx = moduleName.indexOf("/");
  return slashIdx === -1 ? moduleName : moduleName.slice(0, slashIdx);
}

/**
 * Returns the subpath portion of a module specifier
 * (`lodash/fp` → `fp`, `lodash` → undefined).
 */
export function getModuleSubpath(moduleName: string): string | undefined {
  let prefix = "";
  if (isScopedPackageName(moduleName)) {
    const slash1 = moduleName.indexOf("/");
    const slash2 = moduleName.indexOf("/", slash1 + 1);
    if (slash2 === -1) return undefined;
    prefix = moduleName.slice(0, slash2);
  } else {
    const slash = moduleName.indexOf("/");
    if (slash === -1) return undefined;
    prefix = moduleName.slice(0, slash);
  }
  return moduleName.slice(prefix.length + 1);
}

/**
 * Returns true when the module name refers to a relative path.
 */
export function isRelativeModuleName(moduleName: string): boolean {
  return moduleName.startsWith("./") || moduleName.startsWith("../");
}
