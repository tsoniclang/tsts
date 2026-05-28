/**
 * Checker-state initialization helpers.
 *
 * Ported from Strada `checker.go` — newChecker, initCheckerState,
 * resetCheckerState.
 *
 * Surfaces the various sub-caches (types, signatures, node-links,
 * symbol-links, instantiations) and bundles them into a single state
 * record.
 */

import { emptyTypeStore, type TypeStore } from "./type-store.js";
import { emptySignatureStore, type SignatureStore } from "./signature-store.js";
import { emptyNodeLinkCache, type NodeLinkCache } from "./node-link-cache.js";
import { emptySymbolLinkCache, type SymbolLinkCache } from "./symbol-link-cache.js";
import { emptyInstantiationCache, type InstantiationCache } from "./instantiation-cache.js";
import { newInternTable, type InternTable } from "./intern-table.js";
import { emptyBag, type DiagnosticBag } from "./diagnostic-bag.js";
import { newSymbolIdCounter, type SymbolIdCounter } from "./symbol-id.js";
import { emptyTypeCache, type TypeCache } from "./type-cache.js";

export interface CheckerStateBundle {
  readonly types: TypeStore;
  readonly signatures: SignatureStore;
  readonly nodeLinks: NodeLinkCache;
  readonly symbolLinks: SymbolLinkCache;
  readonly instantiations: InstantiationCache;
  readonly stringIntern: InternTable<string>;
  readonly typeCache: TypeCache;
  readonly diagnostics: DiagnosticBag;
  readonly symbolIdCounter: SymbolIdCounter;
}

/**
 * Returns a fresh checker-state bundle with every sub-cache empty.
 */
export function newCheckerStateBundle(): CheckerStateBundle {
  return {
    types: emptyTypeStore(),
    signatures: emptySignatureStore(),
    nodeLinks: emptyNodeLinkCache(),
    symbolLinks: emptySymbolLinkCache(),
    instantiations: emptyInstantiationCache(),
    stringIntern: newInternTable<string>(),
    typeCache: emptyTypeCache(),
    diagnostics: emptyBag(),
    symbolIdCounter: newSymbolIdCounter(),
  };
}

/**
 * Returns the diagnostic-bag size — total diagnostic count.
 */
export function getTotalDiagnosticCount(state: CheckerStateBundle): number {
  return state.diagnostics.entries.length;
}

/**
 * Returns the total type count.
 */
export function getTotalTypeCount(state: CheckerStateBundle): number {
  return state.types.byId.size;
}

/**
 * Returns the total signature count.
 */
export function getTotalSignatureCount(state: CheckerStateBundle): number {
  return state.signatures.byId.size;
}
