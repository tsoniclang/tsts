import type { ExtensionHost } from "./host.js";

export const extensionHostAllowsSemanticQueryPreflight: unique symbol = Symbol("tsts.extensionHost.allowsSemanticQueryPreflight");
export const extensionHostAllowsCompilerQuery: unique symbol = Symbol("tsts.extensionHost.allowsCompilerQuery");

const attachedExtensionHosts = new WeakMap<object, ExtensionHost>();

export function registerAttachedExtensionHost(owner: object, host: ExtensionHost): void {
  attachedExtensionHosts.set(owner, host);
}

export function lookupAttachedExtensionHost(owner: object): ExtensionHost | undefined {
  return attachedExtensionHosts.get(owner);
}

export function hasAttachedExtensionHost(owner: object): boolean {
  return attachedExtensionHosts.has(owner);
}
