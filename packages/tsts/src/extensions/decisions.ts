import type {
  ArgumentPassingMode,
  SelectedTargetSignatureFact,
  SurfaceOperationFact,
  TargetConstraint,
  TargetTypeRef,
} from "./facts.js";
import type { ExtensionDiagnostic, ExtensionEvidence, ExtensionFactSubject } from "./host.js";

export type ExtensionDecision<T> =
  | { readonly kind: "defer" }
  | { readonly kind: "accept"; readonly value: T; readonly evidence?: readonly ExtensionEvidence[] }
  | { readonly kind: "reject"; readonly diagnostic: ExtensionDiagnostic };

export type ExtensionDecisionResult<T> =
  | { readonly kind: "core"; readonly value: T }
  | { readonly kind: "accept"; readonly value: T; readonly extensionId: string; readonly evidence?: readonly ExtensionEvidence[] }
  | { readonly kind: "reject"; readonly diagnostic: ExtensionDiagnostic; readonly extensionId: string }
  | { readonly kind: "missing-owner"; readonly question: string }
  | { readonly kind: "owner-deferred"; readonly question: string; readonly extensionId: string }
  | { readonly kind: "conflict"; readonly question: string };

export interface ExtensionDecisionContext {
  readonly question: string;
  readonly extensionId: string;
}

export type ExtensionDecisionHook<TRequest, TResult> = (request: TRequest, context: ExtensionDecisionContext) => ExtensionDecision<TResult>;

export interface ExtensionDecisionRunOptions {
  readonly requireOwner?: boolean;
}

export const ExtensionDecisionQuestion = {
  satisfiesConstraint: "type.satisfiesConstraint",
  isAssignableTo: "type.isAssignableTo",
  resolveCall: "signature.resolveCall",
  inferTypeArguments: "signature.inferTypeArguments",
  resolvePropertyAccess: "member.resolvePropertyAccess",
  resolveElementAccess: "member.resolveElementAccess",
  resolveOperator: "member.resolveOperator",
  getContextualType: "type.getContextualType",
  validateFlowUse: "flow.validateUse",
} as const;

export interface SatisfiesConstraintRequest {
  readonly source: ExtensionFactSubject;
  readonly constraint: TargetConstraint;
  readonly target?: string;
}

export interface AssignabilityRequest {
  readonly source: ExtensionFactSubject;
  readonly target: ExtensionFactSubject;
  readonly relation?: "assignment" | "constraint" | "return" | "argument";
}

export interface ResolveCallRequest {
  readonly call: ExtensionFactSubject;
  readonly callee: ExtensionFactSubject;
  readonly arguments: readonly ExtensionFactSubject[];
  readonly target?: string;
}

export interface ResolveCallResult {
  readonly selectedSignature: SelectedTargetSignatureFact;
  readonly returnType?: ExtensionFactSubject;
}

export interface InferTypeArgumentsRequest {
  readonly declaration: ExtensionFactSubject;
  readonly arguments: readonly ExtensionFactSubject[];
  readonly contextualType?: ExtensionFactSubject;
}

export interface InferTypeArgumentsResult {
  readonly typeArguments: readonly ExtensionFactSubject[];
  readonly targetTypeArguments?: readonly TargetTypeRef[];
}

export interface ResolvePropertyAccessRequest {
  readonly expression: ExtensionFactSubject;
  readonly receiver: ExtensionFactSubject;
  readonly propertyName: string;
  readonly target?: string;
}

export interface ResolveElementAccessRequest {
  readonly expression: ExtensionFactSubject;
  readonly receiver: ExtensionFactSubject;
  readonly argument: ExtensionFactSubject;
  readonly target?: string;
}

export interface ResolveOperatorRequest {
  readonly expression: ExtensionFactSubject;
  readonly operator: string;
  readonly left: ExtensionFactSubject;
  readonly right?: ExtensionFactSubject;
  readonly target?: string;
}

export interface ResolveOperationResult {
  readonly operation: SurfaceOperationFact;
  readonly resultType?: ExtensionFactSubject;
}

export interface ContextualTypeRequest {
  readonly expression: ExtensionFactSubject;
  readonly context: ExtensionFactSubject;
  readonly target?: string;
}

export interface ContextualTypeResult {
  readonly type: ExtensionFactSubject;
  readonly targetType?: TargetTypeRef;
}

export interface ValidateFlowUseRequest {
  readonly useSite: ExtensionFactSubject;
  readonly symbol: ExtensionFactSubject;
  readonly mode?: ArgumentPassingMode | "read" | "write" | "call";
  readonly target?: string;
}

export interface ValidateFlowUseResult {
  readonly valid: boolean;
  readonly targetCompilerValidationRequired?: boolean;
  readonly targetCompiler?: string;
}

export const deferDecision: ExtensionDecision<never> = Object.freeze({ kind: "defer" });

export function acceptDecision<T>(value: T, evidence?: readonly ExtensionEvidence[]): ExtensionDecision<T> {
  return evidence === undefined ? { kind: "accept", value } : { kind: "accept", value, evidence };
}

export function rejectDecision<T>(diagnostic: ExtensionDiagnostic): ExtensionDecision<T> {
  return { kind: "reject", diagnostic };
}
