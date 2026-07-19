import type {
  CheckedAccessSourceEvidence,
  CheckedAssertionConversionSourceOperation,
  CheckedCallSourceOperation,
  CheckedElementAccessSourceOperation,
  CheckedIterationSourceOperation,
  CheckedOperatorSourceOperation,
  SelectedSourceIterationProtocolEvidence,
  SelectedSourceTypeEvidence,
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
}

/**
 * Exact checker-selected property operation from an inline source function.
 * Property spelling is deliberately absent: source extensions must validate
 * selected symbol/declaration identity, not reconstruct semantics from names.
 */
interface CheckedSourceInlinePropertyOperationBase {
  readonly sourceOperationKind: "property-access";
  readonly expression: ExtensionFactSubject;
  readonly receiver: ExtensionFactSubject;
  readonly sourceReceiver: SelectedSourceValueEvidence;
}

export type CheckedSourceInlinePropertyOperation = CheckedSourceInlinePropertyOperationBase
  & CheckedAccessSourceEvidence<"property-access">;

/**
 * Flat immutable inventory of checked operations lexically owned by one
 * inline function. The source extension validates its own protocol by exact
 * subject and selected declaration identity; TSTS does not encode a fluent
 * protocol grammar or target semantics here.
 */
export type CheckedSourceInlineOperation =
  | CheckedCallSourceOperation
  | CheckedSourceInlinePropertyOperation
  | CheckedElementAccessSourceOperation
  | CheckedOperatorSourceOperation
  | CheckedIterationSourceOperation
  | CheckedAssertionConversionSourceOperation;

export interface CheckedSourceInlineFunctionEvidence {
  readonly expression: ExtensionFactSubject;
  readonly parameters: readonly CheckedSourceInlineFunctionParameterEvidence[];
  readonly returns: readonly CheckedSourceInlineFunctionReturnEvidence[];
  readonly operations: readonly CheckedSourceInlineOperation[];
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
export function checkedSourceCallReadableSubjects(
  operation: CheckedSourceCallOperation,
): ReadonlySet<ExtensionFactSubject> {
  const subjects = new Set<ExtensionFactSubject>();
  const add = (subject: ExtensionFactSubject | undefined): void => {
    if (subject !== undefined) {
      subjects.add(subject);
    }
  };
  const addType = (evidence: SelectedSourceTypeEvidence): void => {
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
  const addSelection = (sourceOperation: CheckedCallSourceOperation): void => {
    if (sourceOperation.sourceSelection.kind !== "applicable") {
      return;
    }
    add(sourceOperation.sourceSelection.signature);
    add(sourceOperation.sourceSelection.declaration);
    for (const argument of sourceOperation.sourceSelection.methodTypeArguments) {
      add(argument.typeParameter);
      add(argument.selectedType);
      add(argument.explicitTypeNode);
    }
    for (const parameter of sourceOperation.sourceSelection.parameters) {
      add(parameter.parameterSymbol);
      add(parameter.parameterDeclaration);
      add(parameter.selectedType);
      add(parameter.authoredTypeNode);
    }
    for (const binding of sourceOperation.sourceSelection.argumentBindings) {
      add(binding.selectedArgumentType);
      add(binding.selectedParameterType);
    }
  };
  const addCall = (sourceOperation: CheckedCallSourceOperation): void => {
    add(sourceOperation.call);
    add(sourceOperation.callee);
    sourceOperation.arguments.forEach(add);
    addSelection(sourceOperation);
    addValue(sourceOperation.sourceCallee);
    sourceOperation.sourceArguments.forEach(addValue);
    addValue(sourceOperation.sourceResult);
    if (sourceOperation.sourceReceiver !== undefined) {
      addValue(sourceOperation.sourceReceiver);
    }
  };
  const addAccess = (
    sourceOperation: CheckedSourceInlinePropertyOperation | CheckedElementAccessSourceOperation,
  ): void => {
    add(sourceOperation.expression);
    add(sourceOperation.receiver);
    addValue(sourceOperation.sourceReceiver);
    if (sourceOperation.accessMode !== "write") {
      addValue(sourceOperation.sourceReadResult);
    }
    if (sourceOperation.accessMode === "write" || sourceOperation.accessMode === "read-write") {
      addType(sourceOperation.sourceWriteType);
    }
    if (sourceOperation.sourceOperationKind === "element-access") {
      add(sourceOperation.argument);
      addValue(sourceOperation.sourceArgument);
    }
  };
  const addIterationProtocol = (protocol: SelectedSourceIterationProtocolEvidence): void => {
    addTypeIfPresent(protocol.iterationTypes.yieldType);
    addTypeIfPresent(protocol.iterationTypes.returnType);
    addTypeIfPresent(protocol.iterationTypes.nextType);
    if (protocol.resolutionKind === "known-iterable-instantiation") {
      addType(protocol.iterableTarget);
      protocol.iterableDeclarations.forEach(add);
      return;
    }
    add(protocol.iteratorMethod.symbol);
    add(protocol.iteratorMethod.valueDeclaration);
    protocol.iteratorMethod.declarations.forEach(add);
    add(protocol.iteratorMethod.type);
    addType(protocol.iteratorType);
  };
  const addTypeIfPresent = (evidence: SelectedSourceTypeEvidence | undefined): void => {
    if (evidence !== undefined) {
      addType(evidence);
    }
  };
  const addIterationMechanism = (
    mechanism: Exclude<CheckedIterationSourceOperation, { readonly iterationKind: "for-in" }>["mechanism"],
  ): void => {
    if (mechanism.kind === "union") {
      mechanism.alternatives.forEach(addIterationMechanism);
      return;
    }
    addType(mechanism.sourceAlternative);
    switch (mechanism.kind) {
      case "synchronous-iterator-protocol":
      case "asynchronous-iterator-protocol":
      case "synchronous-iterator-adapted-to-async":
        addIterationProtocol(mechanism.protocol);
        return;
      case "array-like-index":
      case "array-like-index-adapted-to-async":
        addType(mechanism.selectedIndex);
        return;
      case "string-code-unit-index":
      case "string-code-unit-index-adapted-to-async":
      case "untyped-dynamic-iteration":
        return;
    }
  };
  const addInlineOperation = (sourceOperation: CheckedSourceInlineOperation): void => {
    switch (sourceOperation.sourceOperationKind) {
      case "call":
        addCall(sourceOperation);
        return;
      case "property-access":
      case "element-access":
        addAccess(sourceOperation);
        return;
      case "operator":
        add(sourceOperation.expression);
        addValue(sourceOperation.sourceResult);
        if (sourceOperation.operatorKind === "binary") {
          add(sourceOperation.left);
          add(sourceOperation.right);
          addValue(sourceOperation.sourceLeft);
          addValue(sourceOperation.sourceRight);
        } else {
          add(sourceOperation.operand);
          addValue(sourceOperation.sourceOperand);
        }
        return;
      case "iteration":
        add(sourceOperation.statement);
        add(sourceOperation.expression);
        add(sourceOperation.initializer);
        addValue(sourceOperation.sourceIterable);
        addType(sourceOperation.sourceElement);
        if (sourceOperation.iterationKind !== "for-in") {
          addIterationMechanism(sourceOperation.mechanism);
        }
        return;
      case "conversion":
        add(sourceOperation.expression);
        addValue(sourceOperation.source);
        addType(sourceOperation.target);
        add(sourceOperation.explicitTargetTypeNode);
        return;
    }
  };

  addCall(operation);
  for (const argument of operation.sourceArguments) {
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
    }
    inlineFunction.operations.forEach(addInlineOperation);
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
