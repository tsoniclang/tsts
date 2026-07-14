import type { ProviderVirtualModuleArtifact } from "./host.js";

export const providerVirtualInternalRoot = "tsts-provider://tsts-internal/";
export const providerVirtualPublicRoot = "tsts-provider://tsts-public/";
export const providerCanonicalExportOwnerMarker = ".tsts-export-owner-";
export const providerPublicVirtualSliceMarker = ".tsts-slice-";

export const providerVirtualCompilerArtifactLookup: unique symbol = Symbol("tsts.provider.virtualCompilerArtifactLookup");

export interface ProviderVirtualCompilerRegistryAccess {
  [providerVirtualCompilerArtifactLookup](fileName: string): ProviderVirtualModuleArtifact | undefined;
}

export function getProviderVirtualArtifactForCompiler(
  registry: ProviderVirtualCompilerRegistryAccess,
  fileName: string,
): ProviderVirtualModuleArtifact | undefined {
  return registry[providerVirtualCompilerArtifactLookup](fileName);
}

export function isHostOwnedProviderVirtualFileName(fileName: string): boolean {
  return fileName.startsWith(providerVirtualInternalRoot) || fileName.startsWith(providerVirtualPublicRoot);
}
