/**
 * ExtensionTypeChecker — the narrow, stable checker surface extensions see.
 *
 * Extensions must NOT read arbitrary checker private state (spec "Extension
 * Contexts"). They ask for facts through a small explicit set of methods. This
 * facade exposes exactly five queries, all of which already exist on the
 * core `Checker` class (checker/checker.ts): getTypeAtLocation,
 * getSymbolAtLocation, getDeclaredTypeOfSymbol, getContextualType,
 * getTypeOfSymbolAtLocation.
 *
 * `getResolvedSignature` is intentionally excluded from v1 (not present on the
 * core Checker).
 */

import type { Node, Symbol as AstSymbol } from "../ast/index.js";
import type { Type } from "../checker/types.js";

/**
 * The structural slice of the core checker the facade delegates to. Declared
 * locally (not imported as the concrete `Checker` class) so the host stays
 * decoupled from checker internals and the facade can wrap any object that
 * answers these five queries.
 */
export interface CheckerLike {
  getTypeAtLocation(node: Node): Type | undefined;
  getSymbolAtLocation(node: Node): AstSymbol | undefined;
  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type | undefined;
  getContextualType(node: Node): Type | undefined;
  getTypeOfSymbolAtLocation(symbol: AstSymbol, location: Node): Type | undefined;
}

/** The checker view handed to check/program-phase extension hooks. */
export interface ExtensionTypeChecker {
  getTypeAtLocation(node: Node): Type | undefined;
  getSymbolAtLocation(node: Node): AstSymbol | undefined;
  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type | undefined;
  getContextualType(node: Node): Type | undefined;
  getTypeOfSymbolAtLocation(symbol: AstSymbol, location: Node): Type | undefined;
}

/**
 * Wrap a core checker in the read-only extension facade. Pure delegation; no
 * state is captured beyond the checker reference.
 */
export function createExtensionTypeChecker(checker: CheckerLike): ExtensionTypeChecker {
  return {
    getTypeAtLocation(node: Node): Type | undefined {
      return checker.getTypeAtLocation(node);
    },
    getSymbolAtLocation(node: Node): AstSymbol | undefined {
      return checker.getSymbolAtLocation(node);
    },
    getDeclaredTypeOfSymbol(symbol: AstSymbol): Type | undefined {
      return checker.getDeclaredTypeOfSymbol(symbol);
    },
    getContextualType(node: Node): Type | undefined {
      return checker.getContextualType(node);
    },
    getTypeOfSymbolAtLocation(symbol: AstSymbol, location: Node): Type | undefined {
      return checker.getTypeOfSymbolAtLocation(symbol, location);
    },
  };
}
