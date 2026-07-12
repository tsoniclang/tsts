import type { bool } from "../../go/scalars.js";
import type { GoPtr } from "../../go/compat.js";
import type { Node } from "../ast/spine.js";
import type { SourceFile } from "../ast/ast.js";
import type { Symbol } from "../ast/symbol.js";
import type { SymbolFlags } from "../ast/generated/flags.js";
import { SymbolFlagsTypeParameter } from "../ast/generated/flags.js";
import type { SymbolTracker } from "../nodebuilder/types.js";
import type { NodeBuilderContext, TrackedSymbolArgs } from "./nodebuilderimpl.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::type::SymbolTrackerImpl","kind":"type","status":"implemented","sigHash":"79cac9a60c2d8c8e7c95ac5947d1ee4b007d23cb1f90efc004e66780e6519534"}
 *
 * Go source:
 * SymbolTrackerImpl struct {
 * 	context            *NodeBuilderContext
 * 	inner              nodebuilder.SymbolTracker
 * 	DisableTrackSymbol bool
 * }
 */
export interface SymbolTrackerImpl {
  context: GoPtr<NodeBuilderContext>;
  inner: GoPtr<SymbolTracker>;
  DisableTrackSymbol: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::func::NewSymbolTrackerImpl","kind":"func","status":"implemented","sigHash":"aa81ec4495e050dfe9722a9c6f214546af9853725abde4bda16689746419bf26"}
 *
 * Go source:
 * func NewSymbolTrackerImpl(context *NodeBuilderContext, tracker nodebuilder.SymbolTracker) *SymbolTrackerImpl {
 * 	if tracker != nil {
 * 		for {
 * 			t, ok := tracker.(*SymbolTrackerImpl)
 * 			if !ok {
 * 				break
 * 			}
 * 			tracker = t.inner
 * 		}
 * 	}
 *
 * 	return &SymbolTrackerImpl{context, tracker, false}
 * }
 */
export function NewSymbolTrackerImpl(context: GoPtr<NodeBuilderContext>, tracker: GoPtr<SymbolTracker>): GoPtr<SymbolTrackerImpl> {
  if (tracker !== undefined) {
    for (;;) {
      const t = tracker as unknown as GoPtr<SymbolTrackerImpl>;
      if (t === undefined || !("inner" in (t as object) && "context" in (t as object) && "DisableTrackSymbol" in (t as object))) {
        break;
      }
      tracker = t!.inner;
    }
  }
  return { context, inner: tracker, DisableTrackSymbol: false };
}

export function SymbolTrackerImpl_as_SymbolTracker(receiver: GoPtr<SymbolTrackerImpl>): GoPtr<SymbolTracker> {
  if (receiver === undefined) {
    return undefined;
  }
  return {
    TrackSymbol: (symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, meaning: SymbolFlags): bool =>
      SymbolTrackerImpl_TrackSymbol(receiver, symbol_, enclosingDeclaration, meaning),
    ReportInaccessibleThisError: (): void => SymbolTrackerImpl_ReportInaccessibleThisError(receiver),
    ReportPrivateInBaseOfClassExpression: (propertyName: string): void =>
      SymbolTrackerImpl_ReportPrivateInBaseOfClassExpression(receiver, propertyName),
    ReportInaccessibleUniqueSymbolError: (): void => SymbolTrackerImpl_ReportInaccessibleUniqueSymbolError(receiver),
    ReportCyclicStructureError: (): void => SymbolTrackerImpl_ReportCyclicStructureError(receiver),
    ReportLikelyUnsafeImportRequiredError: (specifier: string, symbolName: string): void =>
      SymbolTrackerImpl_ReportLikelyUnsafeImportRequiredError(receiver, specifier, symbolName),
    ReportTruncationError: (): void => SymbolTrackerImpl_ReportTruncationError(receiver),
    ReportNonlocalAugmentation: (containingFile: GoPtr<SourceFile>, parentSymbol: GoPtr<Symbol>, augmentingSymbol: GoPtr<Symbol>): void =>
      SymbolTrackerImpl_ReportNonlocalAugmentation(receiver, containingFile, parentSymbol, augmentingSymbol),
    ReportNonSerializableProperty: (propertyName: string): void =>
      SymbolTrackerImpl_ReportNonSerializableProperty(receiver, propertyName),
    ReportInferenceFallback: (node: GoPtr<Node>): void => SymbolTrackerImpl_ReportInferenceFallback(receiver, node),
    PushErrorFallbackNode: (node: GoPtr<Node>): void => SymbolTrackerImpl_PushErrorFallbackNode(receiver, node),
    PopErrorFallbackNode: (): void => SymbolTrackerImpl_PopErrorFallbackNode(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.TrackSymbol","kind":"method","status":"implemented","sigHash":"ff8227f8ec41ce48287f007f9f4b7ae28081554125ec42da7061b7337d30765f"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) TrackSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) bool {
 * 	if !this.DisableTrackSymbol {
 * 		if this.inner != nil && this.inner.TrackSymbol(symbol, enclosingDeclaration, meaning) {
 * 			this.onDiagnosticReported()
 * 			return true
 * 		}
 * 		// Skip recording type parameters as they dont contribute to late painted statements
 * 		if symbol.Flags&ast.SymbolFlagsTypeParameter == 0 {
 * 			this.context.trackedSymbols = append(this.context.trackedSymbols, &TrackedSymbolArgs{symbol, enclosingDeclaration, meaning})
 * 		}
 * 	}
 * 	return false
 * }
 */
export function SymbolTrackerImpl_TrackSymbol(receiver: GoPtr<SymbolTrackerImpl>, symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, meaning: SymbolFlags): bool {
  if (!receiver!.DisableTrackSymbol) {
    if (receiver!.inner !== undefined && receiver!.inner.TrackSymbol(symbol_, enclosingDeclaration, meaning)) {
      SymbolTrackerImpl_onDiagnosticReported(receiver);
      return true as bool;
    }
    // Skip recording type parameters as they dont contribute to late painted statements
    if ((symbol_!.Flags & SymbolFlagsTypeParameter) === 0) {
      const arg: TrackedSymbolArgs = { "symbol": symbol_, enclosingDeclaration: enclosingDeclaration, meaning: meaning };
      receiver!.context!.trackedSymbols = [...receiver!.context!.trackedSymbols, arg];
    }
  }
  return false as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportInaccessibleThisError","kind":"method","status":"implemented","sigHash":"e965d5f3034b0b84df2fdd0e8a47f9d08c7f393b0ba6d3645a8bb8b1f79cba55"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportInaccessibleThisError() {
 * 	this.onDiagnosticReported()
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportInaccessibleThisError()
 * }
 */
export function SymbolTrackerImpl_ReportInaccessibleThisError(receiver: GoPtr<SymbolTrackerImpl>): void {
  SymbolTrackerImpl_onDiagnosticReported(receiver);
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportInaccessibleThisError();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportPrivateInBaseOfClassExpression","kind":"method","status":"implemented","sigHash":"bbffddfff61a4f7f7d67d2ed06822115d0ef34425a3eb3053b7a9705b7c9fbf1"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportPrivateInBaseOfClassExpression(propertyName string) {
 * 	this.onDiagnosticReported()
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportPrivateInBaseOfClassExpression(propertyName)
 * }
 */
export function SymbolTrackerImpl_ReportPrivateInBaseOfClassExpression(receiver: GoPtr<SymbolTrackerImpl>, propertyName: string): void {
  SymbolTrackerImpl_onDiagnosticReported(receiver);
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportPrivateInBaseOfClassExpression(propertyName);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportInaccessibleUniqueSymbolError","kind":"method","status":"implemented","sigHash":"aa7534305ff2d0121552733f43bcf0fa090195342d46fc4c1090c4b94f01a912"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportInaccessibleUniqueSymbolError() {
 * 	this.onDiagnosticReported()
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportInaccessibleUniqueSymbolError()
 * }
 */
export function SymbolTrackerImpl_ReportInaccessibleUniqueSymbolError(receiver: GoPtr<SymbolTrackerImpl>): void {
  SymbolTrackerImpl_onDiagnosticReported(receiver);
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportInaccessibleUniqueSymbolError();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportCyclicStructureError","kind":"method","status":"implemented","sigHash":"6717336de444c995290150831891eb433479e60c8595401ed9cae80959ae5f98"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportCyclicStructureError() {
 * 	this.onDiagnosticReported()
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportCyclicStructureError()
 * }
 */
export function SymbolTrackerImpl_ReportCyclicStructureError(receiver: GoPtr<SymbolTrackerImpl>): void {
  SymbolTrackerImpl_onDiagnosticReported(receiver);
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportCyclicStructureError();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportLikelyUnsafeImportRequiredError","kind":"method","status":"implemented","sigHash":"5f558c6604ca55d543762f496cf3839ace68764fbe8e96338ed82f3b7bb554d9"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportLikelyUnsafeImportRequiredError(specifier string, symbolName string) {
 * 	this.onDiagnosticReported()
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportLikelyUnsafeImportRequiredError(specifier, symbolName)
 * }
 */
export function SymbolTrackerImpl_ReportLikelyUnsafeImportRequiredError(receiver: GoPtr<SymbolTrackerImpl>, specifier: string, symbolName: string): void {
  SymbolTrackerImpl_onDiagnosticReported(receiver);
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportLikelyUnsafeImportRequiredError(specifier, symbolName);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportTruncationError","kind":"method","status":"implemented","sigHash":"69b9209ef021da33c3421e12824a76f6b20ab8b28b918429b64b71ecf0ea54ec"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportTruncationError() {
 * 	this.onDiagnosticReported()
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportTruncationError()
 * }
 */
export function SymbolTrackerImpl_ReportTruncationError(receiver: GoPtr<SymbolTrackerImpl>): void {
  SymbolTrackerImpl_onDiagnosticReported(receiver);
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportTruncationError();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportNonlocalAugmentation","kind":"method","status":"implemented","sigHash":"9de78799a9637a4d223324b88f8d4693ed532045e708f87f8534d824504ee02f"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportNonlocalAugmentation(containingFile *ast.SourceFile, parentSymbol *ast.Symbol, augmentingSymbol *ast.Symbol) {
 * 	this.onDiagnosticReported()
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportNonlocalAugmentation(containingFile, parentSymbol, augmentingSymbol)
 * }
 */
export function SymbolTrackerImpl_ReportNonlocalAugmentation(receiver: GoPtr<SymbolTrackerImpl>, containingFile: GoPtr<SourceFile>, parentSymbol: GoPtr<Symbol>, augmentingSymbol: GoPtr<Symbol>): void {
  SymbolTrackerImpl_onDiagnosticReported(receiver);
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportNonlocalAugmentation(containingFile, parentSymbol, augmentingSymbol);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportNonSerializableProperty","kind":"method","status":"implemented","sigHash":"fcf3c53eb788992c359fd7841a8a3c23b171d19fb37bd891598f1a300f991061"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportNonSerializableProperty(propertyName string) {
 * 	this.onDiagnosticReported()
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportNonSerializableProperty(propertyName)
 * }
 */
export function SymbolTrackerImpl_ReportNonSerializableProperty(receiver: GoPtr<SymbolTrackerImpl>, propertyName: string): void {
  SymbolTrackerImpl_onDiagnosticReported(receiver);
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportNonSerializableProperty(propertyName);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.onDiagnosticReported","kind":"method","status":"implemented","sigHash":"364337cf4c4bd93b2aba150f26ae76cbadf150c3b409c12f2d3f53710b383972"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) onDiagnosticReported() {
 * 	this.context.reportedDiagnostic = true
 * }
 */
export function SymbolTrackerImpl_onDiagnosticReported(receiver: GoPtr<SymbolTrackerImpl>): void {
  receiver!.context!.reportedDiagnostic = true as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.ReportInferenceFallback","kind":"method","status":"implemented","sigHash":"48379893bf111bcab646d2f2ef21e1eda81589ae7961c20dbff418aedb31de41"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) ReportInferenceFallback(node *ast.Node) {
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.ReportInferenceFallback(node)
 * }
 */
export function SymbolTrackerImpl_ReportInferenceFallback(receiver: GoPtr<SymbolTrackerImpl>, node: GoPtr<Node>): void {
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.ReportInferenceFallback(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.PushErrorFallbackNode","kind":"method","status":"implemented","sigHash":"ba4fe003bcee4460e2f4216d9e9279b2b52a57ddca098fb64b3c699c4d94e007"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) PushErrorFallbackNode(node *ast.Node) {
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.PushErrorFallbackNode(node)
 * }
 */
export function SymbolTrackerImpl_PushErrorFallbackNode(receiver: GoPtr<SymbolTrackerImpl>, node: GoPtr<Node>): void {
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.PushErrorFallbackNode(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/symboltracker.go::method::SymbolTrackerImpl.PopErrorFallbackNode","kind":"method","status":"implemented","sigHash":"f3ecda3ecdf05fbfae1a3dc25093494c108ac8167117902efb2dbcfc3918e2aa"}
 *
 * Go source:
 * func (this *SymbolTrackerImpl) PopErrorFallbackNode() {
 * 	if this.inner == nil {
 * 		return
 * 	}
 * 	this.inner.PopErrorFallbackNode()
 * }
 */
export function SymbolTrackerImpl_PopErrorFallbackNode(receiver: GoPtr<SymbolTrackerImpl>): void {
  if (receiver!.inner === undefined) {
    return;
  }
  receiver!.inner.PopErrorFallbackNode();
}
