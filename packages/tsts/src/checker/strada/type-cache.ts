/**
 * Type-resolution result cache.
 *
 * Ported from Strada `checker.go` — getTypeFromTypeNode caches
 * its results to avoid re-resolving the same type expression on
 * repeated visits.
 */

import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";

export interface TypeCache {
  readonly nodeToType: ReadonlyMap<AstNode, Type>;
}

export function emptyTypeCache(): TypeCache {
  return { nodeToType: new Map() };
}

/**
 * Returns the cached type for a node, or undefined.
 */
export function getCachedType(cache: TypeCache, node: AstNode): Type | undefined {
  return cache.nodeToType.get(node);
}

/**
 * Returns a new cache with the (node, type) entry stored.
 */
export function cacheType(
  cache: TypeCache,
  node: AstNode,
  type: Type,
): TypeCache {
  const next = new Map(cache.nodeToType);
  next.set(node, type);
  return { nodeToType: next };
}

/**
 * Returns the cache size (number of cached resolutions).
 */
export function typeCacheSize(cache: TypeCache): number {
  return cache.nodeToType.size;
}

/**
 * Returns true when the cache has an entry for `node`.
 */
export function hasCachedType(cache: TypeCache, node: AstNode): boolean {
  return cache.nodeToType.has(node);
}

/**
 * Returns a new cache with the given node entry removed.
 */
export function invalidateNode(cache: TypeCache, node: AstNode): TypeCache {
  if (!cache.nodeToType.has(node)) return cache;
  const next = new Map(cache.nodeToType);
  next.delete(node);
  return { nodeToType: next };
}
