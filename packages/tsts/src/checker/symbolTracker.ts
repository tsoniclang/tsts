/**
 * Symbol tracker.
 *
 * Port of TS-Go `internal/checker/symboltracker.go` (~129 LoC). Tracks
 * symbols visited during type/symbol formatting so the printer can
 * detect unresolved aliases, late-bound members, and infinite cycles.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";

export interface SymbolTracker {
  trackSymbol?(symbol: AstSymbol, enclosing: AstNode | undefined, meaning: number): boolean;
  reportInaccessibleThisError?(): void;
  reportInaccessibleUniqueSymbolError?(): void;
  reportPrivateInBaseOfClassExpression?(propertyName: string): void;
  reportCyclicStructureError?(): void;
  reportLikelyUnsafeImportRequiredError?(specifier: string): void;
  reportTruncationError?(): void;
  reportNonSerializableProperty?(propertyName: string): void;
  reportNonlocalAugmentation?(containingFile: unknown, parentSymbol: AstSymbol, augmentingSymbol: AstSymbol): void;
}

export class DefaultSymbolTracker implements SymbolTracker {
  visited: Set<AstSymbol> = new Set();
  errors: string[] = [];

  trackSymbol(symbol: AstSymbol, enclosing: AstNode | undefined, meaning: number): boolean {
    void enclosing; void meaning;
    if (this.visited.has(symbol)) return false;
    this.visited.add(symbol);
    return true;
  }

  reportInaccessibleThisError(): void {
    this.errors.push("inaccessible 'this' reference");
  }

  reportInaccessibleUniqueSymbolError(): void {
    this.errors.push("inaccessible unique-symbol type");
  }

  reportPrivateInBaseOfClassExpression(propertyName: string): void {
    this.errors.push(`private '${propertyName}' in class-expression base`);
  }

  reportCyclicStructureError(): void {
    this.errors.push("cyclic structure detected");
  }

  reportLikelyUnsafeImportRequiredError(specifier: string): void {
    this.errors.push(`likely unsafe import: ${specifier}`);
  }

  reportTruncationError(): void {
    this.errors.push("type-display truncated");
  }

  reportNonSerializableProperty(propertyName: string): void {
    this.errors.push(`non-serializable property '${propertyName}'`);
  }

  reportNonlocalAugmentation(
    containingFile: unknown, parentSymbol: AstSymbol, augmentingSymbol: AstSymbol,
  ): void {
    void containingFile; void parentSymbol; void augmentingSymbol;
    this.errors.push("nonlocal augmentation");
  }
}

export function newSymbolTracker(): DefaultSymbolTracker {
  return new DefaultSymbolTracker();
}
