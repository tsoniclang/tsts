/**
 * Symbol display — qualified `symbolToString` (bounded port of
 * `internal/checker/printer.go` `symbolToStringEx` + the nodebuilder
 * `getSymbolChain` / `lookupSymbolChain` family).
 *
 * The `.symbols` baseline emits QUALIFIED symbol names where applicable
 * (`Symbol(Outer.method, ...)`, `Symbol(E.A, ...)`, `Symbol(Console.log, ...)`),
 * assembled by TS-Go's walker via `program.symbolToString(symbol, node)`.
 *
 * The full TS-Go path runs the symbol through the node builder
 * (`SymbolToNode` -> `getSymbolChain` -> entity name), which threads
 * accessibility chains, alternative containers, and module specifiers. For the
 * `.symbols` display surface the maintainer-required behavior reduces to a
 * walk of the binder-populated `symbol.parent` chain (ast/accessors.ts
 * `getSymbolParent`) with the same two exclusions TS-Go's `getSymbolChain`
 * applies:
 *
 *   1. Type parameters are never qualified (`lookupSymbolChainWorker`
 *      short-circuits on `SymbolFlagsTypeParameter` and yields just the symbol).
 *   2. The external-module / source-file symbol is never written
 *      ("We prefer just `x` vs `"foo/bar".x`" — `getSymbolChain` drops a parent
 *      whose declaration is a non-global external module). In TSTS the module
 *      symbol of a source file owns the file's top-level members, so it must be
 *      dropped from the chain exactly as TS-Go drops it.
 *
 * Everything else (class/interface/enum/namespace members) is qualified by its
 * owning container, recursively, matching the TS-Go `.symbols` output exactly.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags, getSymbolParent, isSourceFile } from "../ast/index.js";

function baseSymbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

// A parent that is the external-module / source-file symbol is never written
// into the chain (TS-Go `getSymbolChain`: a parent symbol that is an external
// module is dropped). The binder makes the file's module symbol the parent of
// its top-level members, so its declaration is the SourceFile node.
function isModuleOrSourceFileSymbol(symbol: AstSymbol): boolean {
  return (symbol.declarations ?? []).some((declaration) => isSourceFile(declaration));
}

/**
 * Qualified display name for a symbol, matching the TS-Go `.symbols` baseline.
 *
 * `enclosingDeclaration` and `meaning` are accepted for parity with the TS-Go
 * `symbolToStringEx` signature; the `.symbols` reduction is driven entirely by
 * the symbol's own kind and parent chain, so they are not consulted here.
 */
export function symbolToDisplayString(
  symbol: AstSymbol,
  enclosingDeclaration?: AstNode,
  meaning?: number,
): string {
  void enclosingDeclaration;
  void meaning;
  const name = baseSymbolName(symbol);
  // Type parameters are never qualified.
  if (((symbol.flags ?? 0) & SymbolFlags.TypeParameter) !== 0) return name;
  const parent = getSymbolParent(symbol);
  if (parent === undefined || isModuleOrSourceFileSymbol(parent)) return name;
  const parentName = symbolToDisplayString(parent);
  if (parentName === "") return name;
  return `${parentName}.${name}`;
}
