import assert from "node:assert/strict";
import { test } from "node:test";
import type { bool } from "../../go/scalars.js";
import type { GoPtr } from "../../go/compat.js";
import type { Node } from "../ast/spine.js";
import type { SourceFile } from "../ast/ast.js";
import type { Symbol } from "../ast/symbol.js";
import type { SymbolFlags } from "../ast/generated/flags.js";
import type { SymbolTracker } from "../nodebuilder/types.js";
import { NewSymbolTrackerImpl, SymbolTrackerImpl_as_SymbolTracker } from "./symboltracker.js";

function externalTracker(): SymbolTracker {
  return {
    TrackSymbol: (_symbol: GoPtr<Symbol>, _enclosingDeclaration: GoPtr<Node>, _meaning: SymbolFlags): bool => false as bool,
    ReportInaccessibleThisError: (): void => {},
    ReportPrivateInBaseOfClassExpression: (_propertyName: string): void => {},
    ReportInaccessibleUniqueSymbolError: (): void => {},
    ReportCyclicStructureError: (): void => {},
    ReportLikelyUnsafeImportRequiredError: (_specifier: string, _symbolName: string): void => {},
    ReportTruncationError: (): void => {},
    ReportNonlocalAugmentation: (_containingFile: GoPtr<SourceFile>, _parentSymbol: GoPtr<Symbol>, _augmentingSymbol: GoPtr<Symbol>): void => {},
    ReportNonSerializableProperty: (_propertyName: string): void => {},
    ReportInferenceFallback: (_node: GoPtr<Node>): void => {},
    PushErrorFallbackNode: (_node: GoPtr<Node>): void => {},
    PopErrorFallbackNode: (): void => {},
  };
}

test("NewSymbolTrackerImpl unwraps nested SymbolTrackerImpl adapters", () => {
  const external = externalTracker();
  const first = NewSymbolTrackerImpl(undefined, external);
  const nested = NewSymbolTrackerImpl(undefined, SymbolTrackerImpl_as_SymbolTracker(first));

  assert.equal(nested?.inner, external);
});

test("NewSymbolTrackerImpl preserves a nested nil outer tracker", () => {
  const first = NewSymbolTrackerImpl(undefined, undefined);
  const nested = NewSymbolTrackerImpl(undefined, SymbolTrackerImpl_as_SymbolTracker(first));

  assert.equal(nested?.inner, undefined);
});
