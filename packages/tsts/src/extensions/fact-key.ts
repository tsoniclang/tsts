import { encodeIdentityTuple } from "./identity-tuple.js";

export interface ExtensionFactKey<T> {
  readonly extensionId: string;
  readonly name: string;
  readonly id: string;
  readonly equals: (left: T, right: T) => boolean;
  readonly snapshot: (value: T) => T;
}

export interface ExtensionFactKeyOptions<T> {
  readonly extensionId: string;
  readonly name: string;
  readonly snapshot: (value: T) => T;
  readonly equals?: (left: T, right: T) => boolean;
}

const extensionFactKeyIdentities = new WeakMap<object, object>();
const extensionFactKeysByOwner = new Map<string, Map<string, ExtensionFactKey<unknown>>>();

export function defineExtensionFactKey<T>(options: ExtensionFactKeyOptions<T>): ExtensionFactKey<T> {
  if (typeof options.extensionId !== "string" || options.extensionId.length === 0) {
    throw new Error("Extension fact key requires a non-empty extension id.");
  }
  if (typeof options.name !== "string" || options.name.length === 0) {
    throw new Error("Extension fact key requires a non-empty name.");
  }
  if (typeof options.snapshot !== "function") {
    throw new Error("Extension fact key requires an exact immutable snapshot function.");
  }
  if (options.equals !== undefined && typeof options.equals !== "function") {
    throw new Error("Extension fact key equality must be a function when present.");
  }
  const keysByName = extensionFactKeysByOwner.get(options.extensionId);
  if (keysByName?.has(options.name) === true) {
    throw new Error(`Extension fact key '${options.extensionId}:${options.name}' is already defined.`);
  }
  const key = Object.freeze({
    extensionId: options.extensionId,
    name: options.name,
    id: encodeIdentityTuple([options.extensionId, options.name]),
    equals: options.equals ?? Object.is,
    snapshot: options.snapshot,
  });
  extensionFactKeyIdentities.set(key, Object.freeze({}));
  if (keysByName === undefined) {
    extensionFactKeysByOwner.set(options.extensionId, new Map([[options.name, key as ExtensionFactKey<unknown>]]));
  } else {
    keysByName.set(options.name, key as ExtensionFactKey<unknown>);
  }
  return key;
}

export function formatExtensionFactKeyForDisplay<T>(key: ExtensionFactKey<T>): string {
  getExtensionFactKeyIdentity(key);
  return `${key.extensionId}:${key.name}`;
}

export function getExtensionFactKeyIdentity<T>(key: ExtensionFactKey<T>): object {
  if ((typeof key !== "object" && typeof key !== "function") || key === null) {
    throw new Error("Extension fact keys must be created by defineExtensionFactKey.");
  }
  const identity = extensionFactKeyIdentities.get(key);
  if (identity === undefined) {
    throw new Error("Extension fact keys must be created by defineExtensionFactKey.");
  }
  return identity;
}
