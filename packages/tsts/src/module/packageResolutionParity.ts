/**
 * Module/package resolution parity helpers.
 *
 * TS-Go's resolver tracks failed lookup locations, package id identity, package
 * exports/imports conditions, and extension preference as first-class data.
 */

export interface PackageResolutionState {
  readonly failedLookupLocations: string[];
  readonly affectingLocations: string[];
  readonly packageIds: Map<string, PackageId>;
}

export interface PackageId {
  readonly name: string;
  readonly subModuleName: string;
  readonly version: string;
  readonly peerDependencies: string;
}

export interface PackageResolutionCandidate {
  readonly packageName: string;
  readonly subpath: string;
  readonly conditions: readonly string[];
  readonly extensions: readonly string[];
}

export function createPackageResolutionState(): PackageResolutionState {
  return {
    failedLookupLocations: [],
    affectingLocations: [],
    packageIds: new Map(),
  };
}

export function recordFailedLookup(state: PackageResolutionState, location: string): void {
  if (!state.failedLookupLocations.includes(location)) state.failedLookupLocations.push(location);
}

export function recordAffectingLocation(state: PackageResolutionState, location: string): void {
  if (!state.affectingLocations.includes(location)) state.affectingLocations.push(location);
}

export function getOrCreatePackageId(state: PackageResolutionState, name: string, subModuleName: string, version: string, peerDependencies = ""): PackageId {
  const key = packageIdKey(name, subModuleName, version, peerDependencies);
  const existing = state.packageIds.get(key);
  if (existing !== undefined) return existing;
  const packageId: PackageId = { name, subModuleName, version, peerDependencies };
  state.packageIds.set(key, packageId);
  return packageId;
}

export function packageIdToString(packageId: PackageId): string {
  const peer = packageId.peerDependencies.length === 0 ? "" : `+${packageId.peerDependencies}`;
  const sub = packageId.subModuleName.length === 0 ? "" : `/${packageId.subModuleName}`;
  return `${packageId.name}${sub}@${packageId.version}${peer}`;
}

export function choosePackageExportCondition(candidate: PackageResolutionCandidate, activeConditions: ReadonlySet<string>): string | undefined {
  for (const condition of candidate.conditions) {
    if (activeConditions.has(condition)) return condition;
  }
  return undefined;
}

export function enumeratePackageFileCandidates(packageRoot: string, candidate: PackageResolutionCandidate): readonly string[] {
  const base = joinPackagePath(packageRoot, candidate.packageName, candidate.subpath);
  return candidate.extensions.map(extension => `${base}${extension}`);
}

export function isPackageResolutionCacheable(candidate: PackageResolutionCandidate): boolean {
  return candidate.conditions.length > 0 && candidate.extensions.length > 0 && !candidate.subpath.includes("*");
}

function packageIdKey(name: string, subModuleName: string, version: string, peerDependencies: string): string {
  return `${name}\0${subModuleName}\0${version}\0${peerDependencies}`;
}

function joinPackagePath(root: string, packageName: string, subpath: string): string {
  const normalizedRoot = root.endsWith("/") ? root.slice(0, -1) : root;
  const normalizedSubpath = subpath.startsWith("/") ? subpath.slice(1) : subpath;
  return `${normalizedRoot}/node_modules/${packageName}${normalizedSubpath.length === 0 ? "" : `/${normalizedSubpath}`}`;
}
