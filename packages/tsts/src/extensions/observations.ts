import type {
  ArgumentPassingMode,
  RuntimeCarrierProvenance,
  SelectedTargetSignatureFact,
  SourceSelectedMethodTypeArgument,
  SourceSelectedSignatureKind,
  SourceSelectedSignatureParameter,
  TargetSignatureSelection,
  TargetConstraint,
  TargetOperationProvenance,
  TargetOperationFact,
  TargetParameter,
  TargetCallArgumentConversionSlot,
  TargetTypeRef,
} from "./facts.js";
import type { GoPtr } from "../go/compat.js";
import type { SourceFile } from "../internal/ast/ast.js";
import type { AstReader } from "../services/ast-reader.js";
import type { TypeCheckerQueries } from "../services/type-checker.js";
import type { TypeShapeQueries } from "../services/type-shape.js";
import type { ExtensionDiagnostic, ExtensionDiagnosticStore, ExtensionEvidence, ExtensionFactResolver, ExtensionFactStore, ExtensionFactSubject, ExtensionHost } from "./host.js";

export type ExtensionObservation<T> =
  | { readonly kind: "defer" }
  | { readonly kind: "accept"; readonly value: T; readonly evidence?: readonly ExtensionEvidence[] }
  | { readonly kind: "reject"; readonly diagnostic: ExtensionDiagnostic };

export type ExtensionObservationResult<T> =
  | { readonly kind: "core"; readonly value: T }
  | { readonly kind: "accept"; readonly value: T; readonly extensionId: string; readonly evidence?: readonly ExtensionEvidence[] }
  | { readonly kind: "reject"; readonly diagnostic: ExtensionDiagnostic; readonly extensionId: string }
  | { readonly kind: "missing-owner"; readonly observation: ExtensionObservationPointName }
  | { readonly kind: "owner-deferred"; readonly observation: ExtensionObservationPointName; readonly extensionId: string }
  | { readonly kind: "conflict"; readonly observation: ExtensionObservationPointName };

export interface ExtensionObservationContext<TObservation extends ExtensionObservationPointName = ExtensionObservationPointName> {
  readonly observation: TObservation;
  readonly phase: ExtensionObservationPhase;
  readonly extensionId: string;
  readonly compiler: ExtensionCompilerQueryContext;
  readonly host: ExtensionHost;
  readonly facts: ExtensionFactStore;
  readonly factResolver: ExtensionFactResolver;
  readonly diagnostics: ExtensionDiagnosticStore;
}

export interface ExtensionCompilerQueryContext {
  readonly program: object;
  readonly ast: AstReader;
  readonly checker: TypeCheckerQueries;
  readonly typeShape: TypeShapeQueries;
  readonly getSourceFiles: () => readonly GoPtr<SourceFile>[];
  readonly getSourceFile: (fileName: string) => GoPtr<SourceFile>;
}

export const ExtensionObservationPoint = {
  validateTargetConstraint: "target.validateConstraint",
  observePostCheckAssignability: "target.observePostCheckAssignability",
  mapCheckedCall: "operation.mapCheckedCall",
  mapCheckedPropertyAccess: "operation.mapCheckedPropertyAccess",
  mapCheckedElementAccess: "operation.mapCheckedElementAccess",
  mapCheckedOperator: "operation.mapCheckedOperator",
  mapCheckedIteration: "operation.mapCheckedIteration",
  recordContextualTargetType: "type.recordContextualTargetType",
  mapCheckedConversion: "operation.mapCheckedConversion",
  resolveRuntimeCarrier: "type.resolveRuntimeCarrier",
  validateExtensionFlowUse: "flow.validateExtensionUse",
} as const;

export type ExtensionObservationPointName = typeof ExtensionObservationPoint[keyof typeof ExtensionObservationPoint];

export type ExtensionObservationPhase = "checking" | "finalization";

export type CheckedOperationObservationPointName =
  | typeof ExtensionObservationPoint.mapCheckedCall
  | typeof ExtensionObservationPoint.mapCheckedPropertyAccess
  | typeof ExtensionObservationPoint.mapCheckedElementAccess
  | typeof ExtensionObservationPoint.mapCheckedOperator
  | typeof ExtensionObservationPoint.mapCheckedIteration
  | typeof ExtensionObservationPoint.mapCheckedConversion;

export type ImmediateExtensionObservationPointName = Exclude<ExtensionObservationPointName, CheckedOperationObservationPointName>;

export type CheckedOperationReference<TObservation extends CheckedOperationObservationPointName = CheckedOperationObservationPointName> =
  TObservation extends typeof ExtensionObservationPoint.mapCheckedConversion
    ? {
        readonly observation: TObservation;
        readonly subject: ExtensionFactSubject;
        readonly conversionKind: "assertion";
        readonly call?: never;
        readonly slot?: never;
        readonly sourceArgumentIndex?: never;
        readonly targetParameterIndex?: never;
      } | {
        readonly observation: TObservation;
        readonly subject: ExtensionFactSubject;
        readonly conversionKind: "call-argument";
        readonly call: ExtensionFactSubject;
        readonly slot: TargetCallArgumentConversionSlot;
        readonly sourceArgumentIndex: number;
        readonly targetParameterIndex: number;
      }
    : {
        readonly observation: TObservation;
        readonly subject: ExtensionFactSubject;
        readonly conversionKind?: never;
        readonly call?: never;
        readonly slot?: never;
        readonly sourceArgumentIndex?: never;
        readonly targetParameterIndex?: never;
      };

export interface ExtensionObservationRunOptions {
  readonly requireOwner?: boolean;
}

export interface TargetConstraintValidationRequest {
  readonly source: ExtensionFactSubject;
  readonly constraint: TargetConstraint;
  readonly target?: string;
}

export interface PostCheckAssignabilityObservationRequest {
  readonly source: ExtensionFactSubject;
  readonly target: ExtensionFactSubject;
  readonly relation?: "assignment" | "constraint" | "return" | "argument";
  readonly errorNode?: ExtensionFactSubject;
  readonly expression?: ExtensionFactSubject;
  readonly targetPlatform?: string;
}

export interface SelectedSourceReceiverEvidence {
  readonly sourceReceiver?: ExtensionFactSubject;
  readonly sourceReceiverType?: ExtensionFactSubject;
}

export interface CheckedCallMappingRequest extends SelectedSourceReceiverEvidence {
  readonly call: ExtensionFactSubject;
  readonly callee: ExtensionFactSubject;
  readonly arguments: readonly ExtensionFactSubject[];
  readonly sourceSelectedSignature?: ExtensionFactSubject;
  readonly sourceSelectedDeclaration?: ExtensionFactSubject;
  readonly sourceSelectedMethodTypeArguments?: readonly SourceSelectedMethodTypeArgument[];
  readonly sourceSelectedSignatureParameters?: readonly SourceSelectedSignatureParameter[];
  readonly sourceSelectedSignatureKind?: SourceSelectedSignatureKind;
  readonly sourceCalleeSymbol?: ExtensionFactSubject;
  readonly sourceCalleeDeclaration?: ExtensionFactSubject;
  readonly sourceSelectedCalleeSymbol?: ExtensionFactSubject;
  readonly sourceSelectedCalleeDeclaration?: ExtensionFactSubject;
  readonly sourceReturnType?: ExtensionFactSubject;
  readonly optionalChain?: boolean;
  readonly target?: string;
}

export type CheckedCallMappingResult =
  | { readonly kind: "source" }
  | {
      readonly kind: "target";
      readonly selectedSignature: TargetSignatureSelection;
      readonly argumentConversions: readonly TargetCallArgumentConversionSlot[];
    };

export interface CheckedPropertyAccessMappingRequest extends SelectedSourceReceiverEvidence {
  readonly expression: ExtensionFactSubject;
  readonly receiver: ExtensionFactSubject;
  readonly propertyName: string;
  readonly sourceSelectedSymbol?: ExtensionFactSubject;
  readonly sourceSelectedDeclaration?: ExtensionFactSubject;
  readonly sourceResultType?: ExtensionFactSubject;
  readonly optionalChain?: boolean;
  readonly target?: string;
}

export interface CheckedElementAccessMappingRequest extends SelectedSourceReceiverEvidence {
  readonly expression: ExtensionFactSubject;
  readonly receiver: ExtensionFactSubject;
  readonly argument: ExtensionFactSubject;
  readonly sourceSelectedSymbol?: ExtensionFactSubject;
  readonly sourceSelectedDeclaration?: ExtensionFactSubject;
  readonly sourceSelectedElementIndex?: number;
  readonly sourceResultType?: ExtensionFactSubject;
  readonly optionalChain?: boolean;
  readonly target?: string;
}

export interface CheckedOperatorMappingRequest {
  readonly expression: ExtensionFactSubject;
  readonly operator: string;
  readonly left: ExtensionFactSubject;
  readonly right?: ExtensionFactSubject;
  readonly sourceResultType?: ExtensionFactSubject;
  readonly target?: string;
}

export type CheckedIterationKind = "for-in" | "for-of" | "for-await-of";

export interface CheckedIterationMappingRequest {
  readonly statement: ExtensionFactSubject;
  readonly expression: ExtensionFactSubject;
  readonly initializer?: ExtensionFactSubject;
  readonly kind: CheckedIterationKind;
  readonly sourceElementType?: ExtensionFactSubject;
  readonly target?: string;
}

export interface CheckedOperationMappingResult {
  readonly operation: TargetOperationFact;
  readonly resultType?: TargetTypeRef;
  readonly provenance?: TargetOperationProvenance;
}

interface CheckedConversionMappingRequestBase {
  readonly expression: ExtensionFactSubject;
  readonly source: ExtensionFactSubject;
  readonly targetPlatform?: string;
}

export type CheckedConversionMappingRequest = CheckedConversionMappingRequestBase & ({
  readonly conversionKind: "call-argument";
  readonly target: TargetTypeRef;
  readonly call: ExtensionFactSubject;
  readonly slot: TargetCallArgumentConversionSlot;
  readonly sourceArgumentIndex: number;
  readonly targetParameterIndex: number;
  readonly sourceForm: "value" | "spread-element" | "spread-sequence";
  readonly spreadElementIndex?: number;
  readonly targetForm: "parameter" | "params-element" | "params-sequence";
  readonly targetParameter: TargetParameter;
  readonly sourceSelectedSignature?: ExtensionFactSubject;
  readonly selectedSignature: SelectedTargetSignatureFact;
  readonly assertionKind?: never;
  readonly sourceExpression?: never;
  readonly sourceSelectedSymbol?: never;
  readonly sourceSelectedDeclaration?: never;
  readonly sourceSelectedDeclarationTypeNode?: never;
  readonly explicitTargetTypeNode?: never;
} | {
  readonly conversionKind: "assertion";
  readonly target: ExtensionFactSubject;
  readonly assertionKind: "as" | "angle-bracket" | "jsdoc";
  readonly sourceExpression: ExtensionFactSubject;
  readonly sourceSelectedSymbol?: ExtensionFactSubject;
  readonly sourceSelectedDeclaration?: ExtensionFactSubject;
  readonly sourceSelectedDeclarationTypeNode?: ExtensionFactSubject;
  readonly explicitTargetTypeNode: ExtensionFactSubject;
  readonly call?: never;
  readonly slot?: never;
  readonly sourceArgumentIndex?: never;
  readonly targetParameterIndex?: never;
  readonly sourceForm?: never;
  readonly spreadElementIndex?: never;
  readonly targetForm?: never;
  readonly targetParameter?: never;
  readonly sourceSelectedSignature?: never;
  readonly selectedSignature?: never;
});

export interface CheckedConversionMappingResult {
  readonly convertedType?: TargetTypeRef;
  readonly operation?: TargetOperationFact;
}

export interface RuntimeCarrierFactRequest {
  readonly type: ExtensionFactSubject;
  readonly sourceTypeReference?: ExtensionFactSubject;
  readonly sourceSymbol?: ExtensionFactSubject;
  readonly target?: string;
}

export interface RuntimeCarrierFactResult {
  readonly carrier: TargetTypeRef;
  readonly requiresAllocation?: boolean;
  readonly provenance?: RuntimeCarrierProvenance;
}

export interface ContextualTargetTypeRequest {
  readonly expression: ExtensionFactSubject;
  readonly context: ExtensionFactSubject;
  readonly target?: string;
}

export interface ContextualTargetTypeResult {
  readonly type: ExtensionFactSubject;
  readonly targetType?: TargetTypeRef;
}

export interface ExtensionFlowUseValidationRequest {
  readonly useSite: ExtensionFactSubject;
  readonly symbol: ExtensionFactSubject;
  readonly mode?: ArgumentPassingMode | "read" | "write" | "call";
  readonly target?: string;
}

export interface ExtensionFlowUseValidationResult {
  readonly valid: boolean;
  readonly targetCompilerValidationRequired?: boolean;
  readonly targetCompiler?: string;
}

export interface ExtensionObservationMap {
  readonly [ExtensionObservationPoint.validateTargetConstraint]: {
    readonly request: TargetConstraintValidationRequest;
    readonly result: boolean;
  };
  readonly [ExtensionObservationPoint.observePostCheckAssignability]: {
    readonly request: PostCheckAssignabilityObservationRequest;
    readonly result: void;
  };
  readonly [ExtensionObservationPoint.mapCheckedCall]: {
    readonly request: CheckedCallMappingRequest;
    readonly result: CheckedCallMappingResult;
  };
  readonly [ExtensionObservationPoint.mapCheckedPropertyAccess]: {
    readonly request: CheckedPropertyAccessMappingRequest;
    readonly result: CheckedOperationMappingResult;
  };
  readonly [ExtensionObservationPoint.mapCheckedElementAccess]: {
    readonly request: CheckedElementAccessMappingRequest;
    readonly result: CheckedOperationMappingResult;
  };
  readonly [ExtensionObservationPoint.mapCheckedOperator]: {
    readonly request: CheckedOperatorMappingRequest;
    readonly result: CheckedOperationMappingResult;
  };
  readonly [ExtensionObservationPoint.mapCheckedIteration]: {
    readonly request: CheckedIterationMappingRequest;
    readonly result: CheckedOperationMappingResult;
  };
  readonly [ExtensionObservationPoint.recordContextualTargetType]: {
    readonly request: ContextualTargetTypeRequest;
    readonly result: ContextualTargetTypeResult;
  };
  readonly [ExtensionObservationPoint.mapCheckedConversion]: {
    readonly request: CheckedConversionMappingRequest;
    readonly result: CheckedConversionMappingResult;
  };
  readonly [ExtensionObservationPoint.resolveRuntimeCarrier]: {
    readonly request: RuntimeCarrierFactRequest;
    readonly result: RuntimeCarrierFactResult;
  };
  readonly [ExtensionObservationPoint.validateExtensionFlowUse]: {
    readonly request: ExtensionFlowUseValidationRequest;
    readonly result: ExtensionFlowUseValidationResult;
  };
}

export type ExtensionObservationRequest<TObservation extends ExtensionObservationPointName> = ExtensionObservationMap[TObservation]["request"];
export type ExtensionObservationResponse<TObservation extends ExtensionObservationPointName> = ExtensionObservationMap[TObservation]["result"];
export type ExtensionObservationHook<TObservation extends ExtensionObservationPointName> = (
  request: ExtensionObservationRequest<TObservation>,
  context: ExtensionObservationContext<TObservation>,
) => ExtensionObservation<ExtensionObservationResponse<TObservation>>;

export const deferObservation: ExtensionObservation<never> = Object.freeze({ kind: "defer" });

export function acceptObservation<T>(value: T, evidence?: readonly ExtensionEvidence[]): ExtensionObservation<T> {
  return evidence === undefined ? { kind: "accept", value } : { kind: "accept", value, evidence };
}

export function rejectObservation<T>(diagnostic: ExtensionDiagnostic): ExtensionObservation<T> {
  return { kind: "reject", diagnostic };
}
