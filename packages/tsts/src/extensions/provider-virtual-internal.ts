import type { ProviderVirtualModuleArtifact } from "./host.js";
import type { ProviderRenderedFunctionSignature } from "./provider-callable-signatures.js";

export const providerVirtualInternalRoot = "tsts-provider://tsts-internal/";
export const providerVirtualPublicRoot = "tsts-provider://tsts-public/";
export const providerCanonicalExportOwnerMarker = ".tsts-export-owner-";
export const providerCanonicalModuleDependencyContextMarker = ".tsts-module-context";
export const providerPublicVirtualSliceMarker = ".tsts-slice-";

export const providerVirtualCompilerArtifactLookup: unique symbol = Symbol("tsts.provider.virtualCompilerArtifactLookup");
export const providerVirtualCompilerMetadataLookup: unique symbol = Symbol("tsts.provider.virtualCompilerMetadataLookup");

export interface ProviderVirtualCompilerMetadata {
  readonly directDeclarationIds: readonly string[];
  readonly renderedFunctionSignatures: readonly ProviderRenderedFunctionSignature[];
}

export type ProviderVirtualCompilerArtifact = ProviderVirtualModuleArtifact;

export interface ProviderVirtualCompilerRegistryAccess {
  [providerVirtualCompilerArtifactLookup](fileName: string): ProviderVirtualCompilerArtifact | undefined;
  [providerVirtualCompilerMetadataLookup](fileName: string): ProviderVirtualCompilerMetadata | undefined;
}

export function getProviderVirtualCompilerMetadata(
  registry: ProviderVirtualCompilerRegistryAccess,
  fileName: string,
): ProviderVirtualCompilerMetadata | undefined {
  return registry[providerVirtualCompilerMetadataLookup](fileName);
}

export function getProviderVirtualArtifactForCompiler(
  registry: ProviderVirtualCompilerRegistryAccess,
  fileName: string,
): ProviderVirtualCompilerArtifact | undefined {
  return registry[providerVirtualCompilerArtifactLookup](fileName);
}

export function isHostOwnedProviderVirtualFileName(fileName: string): boolean {
  return fileName.startsWith(providerVirtualInternalRoot) || fileName.startsWith(providerVirtualPublicRoot);
}
