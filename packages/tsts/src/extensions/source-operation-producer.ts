import type {
  CheckedCallSourceOperation,
  CheckedSourceChainRole,
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
 * these exact supported forms. Raw syntax and source spelling are not part of
 * this selector evidence contract.
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
  readonly selectedProperty?: CheckedSourceInlineSelectedPropertyEvidence;
}

/**
 * Exact checker-selected property result from an inline source callback.
 * The selected symbol/declaration live in sourceResult. Source spelling is
 * deliberately absent so a producer cannot substitute name matching for
 * selected identity.
 */
export interface CheckedSourceInlineSelectedPropertyEvidence {
  readonly expression: ExtensionFactSubject;
  readonly receiver: ExtensionFactSubject;
  readonly sourceReceiver: SelectedSourceValueEvidence;
  readonly sourceResult: SelectedSourceValueEvidence;
  readonly chainRole: CheckedSourceChainRole<"property-access">;
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

/** Host-only subject boundary for one retained source operation. */
export function checkedSourceCallOperationSubjects(
  operation: CheckedSourceCallOperation,
): ReadonlySet<ExtensionFactSubject> {
  const subjects = new Set<ExtensionFactSubject>();
  const add = (subject: ExtensionFactSubject | undefined): void => {
    if (subject !== undefined) {
      subjects.add(subject);
    }
  };
  const addType = (evidence: import("./facts.js").SelectedSourceTypeEvidence): void => {
    add(evidence.type);
    add(evidence.symbol);
    add(evidence.declaration);
    add(evidence.selectedSymbol);
    add(evidence.selectedDeclaration);
    add(evidence.authoredTypeNode);
  };
  const addValue = (evidence: SelectedSourceValueEvidence): void => {
    add(evidence.expression);
    addType(evidence);
  };
  const addProperty = (property: CheckedSourceInlineSelectedPropertyEvidence): void => {
    add(property.expression);
    add(property.receiver);
    addValue(property.sourceReceiver);
    addValue(property.sourceResult);
  };

  add(operation.call);
  add(operation.callee);
  operation.arguments.forEach(add);
  if (operation.sourceSelection.kind === "applicable") {
    add(operation.sourceSelection.signature);
    add(operation.sourceSelection.declaration);
    for (const argument of operation.sourceSelection.methodTypeArguments) {
      add(argument.typeParameter);
      add(argument.selectedType);
      add(argument.explicitTypeNode);
    }
    for (const parameter of operation.sourceSelection.parameters) {
      add(parameter.parameterSymbol);
      add(parameter.parameterDeclaration);
      add(parameter.selectedType);
      add(parameter.authoredTypeNode);
    }
    for (const binding of operation.sourceSelection.argumentBindings) {
      add(binding.selectedArgumentType);
      add(binding.selectedParameterType);
    }
  }
  addValue(operation.sourceCallee);
  addValue(operation.sourceResult);
  if (operation.sourceReceiver !== undefined) {
    addValue(operation.sourceReceiver);
  }
  for (const argument of operation.sourceArguments) {
    addValue(argument);
    if (argument.composition?.kind !== "inline-function") {
      continue;
    }
    const inlineFunction = argument.composition.function;
    add(inlineFunction.expression);
    for (const parameter of inlineFunction.parameters) {
      add(parameter.declaration);
      add(parameter.symbol);
    }
    for (const returned of inlineFunction.returns) {
      add(returned.expression);
      if (returned.selectedProperty !== undefined) {
        addProperty(returned.selectedProperty);
      }
    }
  }
  return subjects;
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
