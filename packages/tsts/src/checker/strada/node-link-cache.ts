/**
 * Per-node link cache (parallel to symbol-link-cache).
 *
 * Ported from Strada `checker.go` — getNodeLinks, NodeLinks.
 * Stores derived per-node info: resolved-type, resolved-symbol,
 * resolved-signature, flags.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";

export interface NodeLinks {
  readonly resolvedType?: Type | undefined;
  readonly resolvedSymbol?: AstSymbol | undefined;
  readonly resolvedSignature?: Signature | undefined;
  readonly resolvedTypeArguments?: readonly Type[] | undefined;
  readonly flags?: number | undefined;
}

export interface NodeLinkCache {
  readonly links: ReadonlyMap<AstNode, NodeLinks>;
}

/**
 * Returns an empty cache.
 */
export function emptyNodeLinkCache(): NodeLinkCache {
  return { links: new Map() };
}

/**
 * Returns the links record for a node, or undefined.
 */
export function getNodeLinks(
  cache: NodeLinkCache,
  node: AstNode,
): NodeLinks | undefined {
  return cache.links.get(node);
}

/**
 * Updates the links record for a node — returns a new cache.
 */
export function setNodeLinks(
  cache: NodeLinkCache,
  node: AstNode,
  links: NodeLinks,
): NodeLinkCache {
  const next = new Map(cache.links);
  next.set(node, links);
  return { links: next };
}

/**
 * Returns the resolved type of a node from the cache.
 */
export function getResolvedTypeFromCache(
  cache: NodeLinkCache,
  node: AstNode,
): Type | undefined {
  return cache.links.get(node)?.resolvedType;
}

/**
 * Returns the resolved symbol of a node from the cache.
 */
export function getResolvedSymbolFromCache(
  cache: NodeLinkCache,
  node: AstNode,
): AstSymbol | undefined {
  return cache.links.get(node)?.resolvedSymbol;
}

/**
 * Returns the resolved signature of a node from the cache.
 */
export function getResolvedSignatureFromCache(
  cache: NodeLinkCache,
  node: AstNode,
): Signature | undefined {
  return cache.links.get(node)?.resolvedSignature;
}

/**
 * Returns the cache size.
 */
export function nodeLinkCacheSize(cache: NodeLinkCache): number {
  return cache.links.size;
}
