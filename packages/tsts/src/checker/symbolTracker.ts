/**
 * Symbol tracker.
 *
 * Port of TS-Go `internal/checker/symboltracker.go`. The tracker is the
 * checker-owned implementation of the node-builder SymbolTracker contract:
 * it records symbols that matter for late-painted declaration statements and
 * forwards diagnostics/fallback hooks to an optional outer tracker.
 */

import { SymbolFlags, type Node as AstNode, type SourceFile, type Symbol as AstSymbol } from "../ast/index.js";
import type { NodeBuilderImplContext, TrackedSymbolArgs } from "./nodeBuilderImpl.js";

export interface SymbolTracker {
  trackSymbol(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number): boolean;
  reportInaccessibleThisError(): void;
  reportPrivateInBaseOfClassExpression(propertyName: string): void;
  reportInaccessibleUniqueSymbolError(): void;
  reportCyclicStructureError(): void;
  reportLikelyUnsafeImportRequiredError(specifier: string, symbolName: string): void;
  reportTruncationError(): void;
  reportNonlocalAugmentation(containingFile: SourceFile | AstNode | undefined, parentSymbol: AstSymbol, augmentingSymbol: AstSymbol): void;
  reportNonSerializableProperty(propertyName: string): void;
  reportInferenceFallback(node: AstNode): void;
  pushErrorFallbackNode(node: AstNode): void;
  popErrorFallbackNode(): void;
}

export class SymbolTrackerImpl implements SymbolTracker {
  readonly context: NodeBuilderImplContext;
  readonly inner: SymbolTracker | undefined;
  disableTrackSymbol = false;

  constructor(context: NodeBuilderImplContext, tracker?: SymbolTracker) {
    this.context = context;
    this.inner = unwrapSymbolTracker(tracker);
  }

  trackSymbol(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number): boolean {
    if (!this.disableTrackSymbol) {
      if (this.inner?.trackSymbol(symbol, enclosingDeclaration, meaning) === true) {
        this.onDiagnosticReported();
        return true;
      }
      if (((symbol.flags ?? 0) & SymbolFlags.TypeParameter) === 0) {
        this.context.trackedSymbols.push({ symbol, enclosingDeclaration, meaning } satisfies TrackedSymbolArgs);
      }
    }
    return false;
  }

  reportInaccessibleThisError(): void {
    this.onDiagnosticReported();
    this.inner?.reportInaccessibleThisError();
  }

  reportPrivateInBaseOfClassExpression(propertyName: string): void {
    this.onDiagnosticReported();
    this.inner?.reportPrivateInBaseOfClassExpression(propertyName);
  }

  reportInaccessibleUniqueSymbolError(): void {
    this.onDiagnosticReported();
    this.inner?.reportInaccessibleUniqueSymbolError();
  }

  reportCyclicStructureError(): void {
    this.onDiagnosticReported();
    this.inner?.reportCyclicStructureError();
  }

  reportLikelyUnsafeImportRequiredError(specifier: string, symbolName: string): void {
    this.onDiagnosticReported();
    this.inner?.reportLikelyUnsafeImportRequiredError(specifier, symbolName);
  }

  reportTruncationError(): void {
    this.onDiagnosticReported();
    this.inner?.reportTruncationError();
  }

  reportNonlocalAugmentation(containingFile: SourceFile | AstNode | undefined, parentSymbol: AstSymbol, augmentingSymbol: AstSymbol): void {
    this.onDiagnosticReported();
    this.inner?.reportNonlocalAugmentation(containingFile, parentSymbol, augmentingSymbol);
  }

  reportNonSerializableProperty(propertyName: string): void {
    this.onDiagnosticReported();
    this.inner?.reportNonSerializableProperty(propertyName);
  }

  reportInferenceFallback(node: AstNode): void {
    this.inner?.reportInferenceFallback(node);
  }

  pushErrorFallbackNode(node: AstNode): void {
    this.inner?.pushErrorFallbackNode(node);
  }

  popErrorFallbackNode(): void {
    this.inner?.popErrorFallbackNode();
  }

  private onDiagnosticReported(): void {
    this.context.reportedDiagnostic = true;
  }
}

export function newSymbolTrackerImpl(context: NodeBuilderImplContext, tracker?: SymbolTracker): SymbolTrackerImpl {
  return new SymbolTrackerImpl(context, tracker);
}

function unwrapSymbolTracker(tracker: SymbolTracker | undefined): SymbolTracker | undefined {
  let current = tracker;
  while (current instanceof SymbolTrackerImpl) {
    current = current.inner;
  }
  return current;
}
