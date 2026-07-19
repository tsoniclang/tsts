import type {
  CheckedCallSourceOperation,
  CheckedPropertyAccessSourceOperation,
  SelectedSourceValueEvidence,
} from "./facts.js";
import type {
  ExtensionDiagnostic,
  ExtensionFactEntry,
  ExtensionFactKey,
  ExtensionFactSubject,
  ExtensionFactWriteResult,
} from "./host.js";
import type {
  CheckedCallMappingRequest,
  CheckedOperationObservationPointName,
  ExtensionObservationPhase,
  ExtensionObservationRequest,
} from "./observations.js";
import { ExtensionObservationPoint } from "./observations.js";

/**
 * Positive checker-owned source evidence for one authored call argument.
 * An absent argument composition means that the argument does not have one of
 * these exact supported forms; no raw syntax fallback is exposed to source extensions.
 */
export type CheckedSourceAuthoredLiteralEvidence =
  | { readonly kind: "string"; readonly value: string }
  | { readonly kind: "number"; readonly value: string }
  | { readonly kind: "bigint"; readonly value: string }
  | { readonly kind: "boolean"; readonly value: boolean }
  | { readonly kind: "null" };

export interface CheckedSourceInlineFunctionParameterEvidence {
  readonly declaration: ExtensionFactSubject;
  readonly symbol: ExtensionFactSubject;
}

export interface CheckedSourceInlineFunctionReturnEvidence {
  readonly expression: ExtensionFactSubject;
  readonly selectedPropertyAccess?: CheckedPropertyAccessSourceOperation;
}

export interface CheckedSourceInlineFunctionEvidence {
  readonly expression: ExtensionFactSubject;
  readonly parameters: readonly CheckedSourceInlineFunctionParameterEvidence[];
  readonly returns: readonly CheckedSourceInlineFunctionReturnEvidence[];
}

export type CheckedSourceCallArgumentCompositionEvidence =
  | {
      readonly kind: "authored-literal";
      readonly literal: CheckedSourceAuthoredLiteralEvidence;
    }
  | {
      readonly kind: "inline-function";
      readonly function: CheckedSourceInlineFunctionEvidence;
    };

/** Source-composition-only evidence retained atomically with a checked call. */
export interface CheckedSourceCallCompositionEvidence {
  readonly argumentEvidence: readonly (CheckedSourceCallArgumentCompositionEvidence | undefined)[];
}

/** Internal checked-call retention envelope. Source composition is never exposed to target mappers. */
export type RetainedCheckedSourceCallMappingRequest = CheckedCallMappingRequest & {
  readonly sourceComposition?: CheckedSourceCallCompositionEvidence;
};

/** Internal inventory request type. Only checked calls carry source-composition evidence. */
export type RetainedCheckedOperationRequest<TObservation extends CheckedOperationObservationPointName> =
  TObservation extends typeof ExtensionObservationPoint.mapCheckedCall
    ? RetainedCheckedSourceCallMappingRequest
    : ExtensionObservationRequest<TObservation>;

export interface CheckedSourceCallArgumentEvidence extends SelectedSourceValueEvidence {
  readonly composition?: CheckedSourceCallArgumentCompositionEvidence;
}

/** Immutable target-neutral operation delivered only to a matched source producer. */
export interface CheckedSourceCallOperation extends Omit<CheckedCallSourceOperation, "sourceArguments"> {
  /** Exact source-side provider callable selected by the checker and matched by the host. */
  readonly sourceProviderSelection: CheckedSourceCallProviderSelector;
  readonly sourceArguments: readonly CheckedSourceCallArgumentEvidence[];
}

/** Exact checker-selected provider declaration identity used only to select a source producer. */
interface CheckedSourceProviderSelectorBase {
  readonly providerId: string;
  readonly providerVersion: string;
  readonly providerModuleId: string;
  readonly exportId: string;
  readonly signatureId: string;
}

export type CheckedSourceCallProviderSelector =
  | CheckedSourceProviderSelectorBase & {
      readonly kind: "export-signature";
      readonly memberId?: never;
      readonly memberStatic?: never;
    }
  | CheckedSourceProviderSelectorBase & {
      readonly kind: "member-signature";
      readonly memberId: string;
      readonly memberStatic: boolean;
    };

/** Callback-scoped source fact capability. It exposes no global fact enumeration. */
export interface CheckedSourceCallFactCapability {
  readonly set: <T>(
    subject: ExtensionFactSubject,
    key: ExtensionFactKey<T>,
    value: T,
    evidence?: readonly import("./host.js").ExtensionEvidence[],
  ) => ExtensionFactWriteResult;
  readonly get: <T>(subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>) => T | undefined;
  readonly getEntry: <T>(
    subject: ExtensionFactSubject | undefined,
    key: ExtensionFactKey<T>,
  ) => ExtensionFactEntry<T> | undefined;
  readonly has: <T>(subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>) => boolean;
}

/** Callback-scoped source resolver capability. Target-owned resolvers are inaccessible. */
export interface CheckedSourceCallFactResolverCapability {
  readonly resolve: <T>(subject: ExtensionFactSubject, key: ExtensionFactKey<T>) => T | undefined;
}

/** Callback-scoped diagnostic writer. Existing diagnostics cannot be enumerated. */
export interface CheckedSourceCallDiagnosticCapability {
  readonly append: (diagnostic: ExtensionDiagnostic) => boolean;
}

export interface CheckedSourceCallProducerContext {
  /** Finalization phase for the retained checked call. */
  readonly phase: ExtensionObservationPhase;
  /** Source-composition extension that owns every capability in this context. */
  readonly extensionId: string;
  /** Owner-scoped fact capability. It cannot write another extension's keys. */
  readonly facts: CheckedSourceCallFactCapability;
  /** Owner-scoped resolver capability. */
  readonly factResolver: CheckedSourceCallFactResolverCapability;
  /** Owner-scoped diagnostic capability. */
  readonly diagnostics: CheckedSourceCallDiagnosticCapability;
}

export type CheckedSourceCallProduction =
  | { readonly kind: "complete" }
  | { readonly kind: "defer" }
  | { readonly kind: "reject"; readonly diagnostic: ExtensionDiagnostic };

export interface CheckedSourceCallProducer {
  /**
   * Matches the exact selected provider signature. Source spelling, import form,
   * aliases, and target identity are deliberately absent.
   */
  readonly selector: CheckedSourceCallProviderSelector;
  /**
   * Produces source-owned facts before the independent target mapper runs.
   * All effects participate in the retained operation's atomic rollback/replay.
   */
  readonly produce: (
    operation: CheckedSourceCallOperation,
    context: CheckedSourceCallProducerContext,
  ) => CheckedSourceCallProduction;
}

export const completeCheckedSourceCallProduction: CheckedSourceCallProduction = Object.freeze({ kind: "complete" });
export const deferCheckedSourceCallProduction: CheckedSourceCallProduction = Object.freeze({ kind: "defer" });

export function rejectCheckedSourceCallProduction(diagnostic: ExtensionDiagnostic): CheckedSourceCallProduction {
  return Object.freeze({ kind: "reject", diagnostic });
}
