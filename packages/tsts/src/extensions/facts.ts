import { defineExtensionFactKey } from "./host.js";
import type { ExtensionEvidence, ExtensionFactSubject, ProviderWellKnownSymbolName } from "./host.js";
export type { ArgumentPassingMode } from "./argument-passing.js";
import type { ArgumentPassingMode } from "./argument-passing.js";

export type ExtensionCanonicalIdentityKind =
  | "module"
  | "package"
  | "export"
  | "local-alias"
  | "symbol"
  | "type"
  | "signature"
  | "instantiated-type";

export type ExtensionImportKind = "type" | "value" | "namespace" | "unknown";

export type SourcePrimitiveKind =
  | "bool"
  | "char"
  | "int8"
  | "uint8"
  | "int16"
  | "uint16"
  | "int32"
  | "uint32"
  | "int64"
  | "uint64"
  | "native-int"
  | "native-uint"
  | "float16"
  | "float32"
  | "float64"
  | "decimal"
  | "int128"
  | "uint128";

export interface ExtensionCanonicalIdentity {
  readonly kind: ExtensionCanonicalIdentityKind;
  readonly id: string;
  readonly packageName?: string;
  readonly packageVersion?: string;
  readonly subpath?: string;
  readonly exportName?: string;
  readonly importKind?: ExtensionImportKind;
  readonly canonicalSymbolId?: string;
}

export type SourcePointerMutability = "readonly" | "readwrite" | "target-defined";

export interface SourcePrimitiveFact {
  readonly kind: SourcePrimitiveKind;
  readonly signed?: boolean;
  readonly width?: number;
  readonly runtimeBase: "boolean" | "number" | "bigint" | "string" | "object";
}

export interface ArgumentPassingFact {
  readonly mode: ArgumentPassingMode;
  readonly targetExpression?: ExtensionFactSubject;
}

export interface FunctionPointerFact {
  readonly parameters: readonly ExtensionFactSubject[];
  readonly result: ExtensionFactSubject;
  readonly abi: readonly string[];
}

export interface PointerFact {
  readonly pointee: ExtensionFactSubject;
  readonly mutability: SourcePointerMutability;
  readonly unsafeRequired: boolean;
}

export interface StructFact {
  readonly valueType: boolean;
  readonly fields?: readonly FieldFact[];
}

export interface FieldFact {
  readonly name: string;
  readonly type: ExtensionFactSubject;
  readonly readonly?: boolean;
}

export interface AttributeFact {
  readonly target: ExtensionFactSubject;
  readonly attributeName: string;
  readonly arguments?: readonly ExtensionFactSubject[];
}

export interface DefaultValueFact {
  readonly type: ExtensionFactSubject;
}

export interface ProviderDeclarationIdentity {
  readonly providerId: string;
  readonly providerVersion?: string;
  readonly providerModuleId: string;
  readonly moduleSpecifier: string;
  readonly artifactFileName?: string;
  readonly exportName?: string;
  readonly exportId?: string;
  readonly memberName?: string;
  readonly memberKey?: ProviderMemberKey;
  readonly memberId?: string;
  readonly memberStatic?: boolean;
  readonly signatureId?: string;
  readonly targetIdentity?: TargetTypeRef;
}

export type ProviderMemberKey =
  | { readonly kind: "property-key"; readonly name: string }
  | { readonly kind: "well-known-symbol"; readonly name: ProviderWellKnownSymbolName };

export type TargetTypeRef =
  | { readonly kind: "source-primitive"; readonly name: SourcePrimitiveKind }
  | { readonly kind: "source-global"; readonly name: string; readonly typeArguments?: readonly TargetTypeRef[] }
  | { readonly kind: "target-named"; readonly id: string; readonly typeArguments?: readonly TargetTypeRef[] }
  | { readonly kind: "type-parameter"; readonly name: string }
  | { readonly kind: "array"; readonly element: TargetTypeRef; readonly rank?: number }
  | { readonly kind: "tuple"; readonly elements: readonly TargetTypeRef[] }
  | { readonly kind: "pointer"; readonly pointee: TargetTypeRef; readonly mutability?: "const" | "mut" | "target-defined" }
  | { readonly kind: "function-pointer"; readonly args: readonly TargetTypeRef[]; readonly result: TargetTypeRef; readonly abi?: readonly string[] }
  | { readonly kind: "opaque"; readonly id: string }
  | { readonly kind: "associated-type"; readonly owner: TargetTypeRef; readonly name: string }
  | { readonly kind: "lifetime"; readonly name: string }
  | { readonly kind: "target-specific"; readonly target: string; readonly name: string; readonly value?: unknown };

export type TargetConstraint =
  | { readonly kind: "implements"; readonly contract: string; readonly typeArguments?: readonly TargetTypeRef[] }
  | { readonly kind: "value-type" }
  | { readonly kind: "reference-type" }
  | { readonly kind: "constructible" }
  | { readonly kind: "unmanaged" }
  | { readonly kind: "copy" }
  | { readonly kind: "clone" }
  | { readonly kind: "default" }
  | { readonly kind: "sized" }
  | { readonly kind: "lifetime"; readonly name: string }
  | { readonly kind: "target-specific"; readonly target: string; readonly name: string; readonly value?: unknown };

export interface TargetTypeParameter {
  readonly name: string;
  readonly constraints?: readonly TargetConstraint[];
  readonly variance?: "in" | "out" | "invariant" | "target-defined";
}

export interface TargetParameter {
  readonly name: string;
  readonly type: TargetTypeRef;
  readonly passingMode: ArgumentPassingMode;
  readonly optional?: boolean;
  readonly paramsArray?: boolean;
}

export interface TargetMember {
  readonly id: string;
  readonly sourceName: string;
  readonly targetName: string;
  readonly kind: "method" | "constructor" | "property" | "field" | "indexer" | "event" | "operator";
  readonly static?: boolean;
  readonly parameters: readonly TargetParameter[];
  readonly returnType?: TargetTypeRef;
  readonly typeParameters?: readonly TargetTypeParameter[];
  readonly overloadGroup?: string;
  readonly providerDeclaration?: ProviderDeclarationIdentity;
}

export interface TargetBindingFact {
  readonly id: string;
  readonly sourceName: string;
  readonly targetName: string;
  readonly target: string;
  readonly kind: "class" | "struct" | "interface" | "trait" | "enum" | "delegate" | "function" | "opaque";
  readonly typeParameters?: readonly TargetTypeParameter[];
  readonly members?: readonly TargetMember[];
  readonly implementedContracts?: readonly TargetConstraint[];
}

export interface InstantiatedTargetTypeFact {
  readonly targetType: TargetBindingFact;
  readonly typeArguments: readonly ExtensionFactSubject[];
  readonly resolvedTypeArguments?: readonly TargetTypeRef[];
}

export interface SourceSelectedMethodTypeArgument {
  readonly typeParameterName: string;
  readonly typeParameter?: ExtensionFactSubject;
  readonly selectedType: ExtensionFactSubject;
  readonly explicitTypeNode?: ExtensionFactSubject;
}

export type SourceSelectedSignatureKind = "resolved" | "untyped" | "error" | "silent-never";

export interface SourceSelectedSignatureParameter {
  readonly parameterIndex: number;
  readonly parameterName: string;
  readonly parameterSymbol: ExtensionFactSubject;
  readonly parameterDeclaration?: ExtensionFactSubject;
  readonly selectedType: ExtensionFactSubject;
  readonly authoredTypeNode?: ExtensionFactSubject;
  readonly acceptsOmission: boolean;
  readonly rest: boolean;
}

export interface SourceSelectedCallArgumentBinding {
  readonly sourceArgumentIndex: number;
  readonly effectiveArgumentIndex: number;
  readonly sourceForm: "value" | "spread-element" | "spread-sequence";
  readonly spreadElementIndex?: number;
  readonly sourceParameterIndex: number;
  readonly sourceParameterForm: "parameter" | "rest-element" | "rest-sequence";
  readonly selectedArgumentType: ExtensionFactSubject;
  readonly selectedParameterType: ExtensionFactSubject;
}

export interface SelectedSourceTypeEvidence {
  readonly type: ExtensionFactSubject;
  readonly symbol?: ExtensionFactSubject;
  readonly declaration?: ExtensionFactSubject;
  readonly selectedSymbol?: ExtensionFactSubject;
  readonly selectedDeclaration?: ExtensionFactSubject;
  readonly authoredTypeNode?: ExtensionFactSubject;
}

export interface SelectedSourceValueEvidence extends SelectedSourceTypeEvidence {
  readonly expression: ExtensionFactSubject;
}

export interface TargetSignatureSelection {
  readonly member: TargetMember;
  readonly targetTypeArguments?: readonly TargetTypeRef[];
  readonly providerDeclaration?: ProviderDeclarationIdentity;
}

export interface TargetCallArgumentConversionSlot {
  readonly sourceArgumentIndex: number;
  readonly sourceForm: "value" | "spread-element" | "spread-sequence";
  readonly spreadElementIndex?: number;
  readonly targetParameterIndex: number;
  readonly targetForm: "parameter" | "params-element" | "params-sequence";
}

export interface SelectedTargetSignatureFact extends TargetSignatureSelection {
  readonly argumentConversions: readonly TargetCallArgumentConversionSlot[];
  readonly sourceArgumentBindings: readonly SourceSelectedCallArgumentBinding[];
  readonly sourceSelectedMethodTypeArguments?: readonly SourceSelectedMethodTypeArgument[];
  readonly sourceSelectedSignatureParameters?: readonly SourceSelectedSignatureParameter[];
  readonly sourceSelectedSignatureKind?: SourceSelectedSignatureKind;
  readonly sourceSignature?: ExtensionFactSubject;
  readonly sourceDeclaration?: ExtensionFactSubject;
  readonly sourceCallee: SelectedSourceValueEvidence;
  readonly sourceArguments: readonly SelectedSourceValueEvidence[];
  readonly sourceResult: SelectedSourceValueEvidence;
  readonly sourceOptionalChain?: boolean;
  readonly sourceReceiver?: SelectedSourceValueEvidence;
}

export interface ContextualTargetTypeFact {
  readonly type: ExtensionFactSubject;
  readonly targetType?: TargetTypeRef;
}

export interface TargetOperationFact {
  readonly operationId: string;
  readonly operationKind: "property" | "method" | "indexer" | "operator" | "constructor" | "iteration";
  readonly targetOperation: string;
  readonly resultType?: TargetTypeRef;
  readonly evidence?: readonly ExtensionEvidence[];
  readonly provenance?: TargetOperationProvenance;
}

export interface TargetOperationProvenance {
  readonly providerDeclaration?: ProviderDeclarationIdentity;
  readonly sourceExpression?: ExtensionFactSubject;
  readonly sourceReceiver?: ExtensionFactSubject;
  readonly sourceCallee?: ExtensionFactSubject;
  readonly sourceSelectedSymbol?: ExtensionFactSubject;
  readonly sourceSelectedDeclaration?: ExtensionFactSubject;
  readonly sourceSelectedSignature?: ExtensionFactSubject;
  readonly sourceResultType?: ExtensionFactSubject;
  readonly sourceReceiverType?: ExtensionFactSubject;
  readonly sourceOptionalChain?: boolean;
}

export interface FlowStateFact {
  readonly state: "moved" | "borrowed-shared" | "borrowed-mut" | "initialized" | "uninitialized" | "target-validation-required";
  readonly targetCompiler?: string;
  readonly evidence?: readonly ExtensionEvidence[];
}

export interface RuntimeCarrierFact {
  readonly carrier: TargetTypeRef;
  readonly requiresAllocation?: boolean;
  readonly provenance?: RuntimeCarrierProvenance;
}

export interface RuntimeCarrierProvenance {
  readonly sourceType?: ExtensionFactSubject;
  readonly sourceTypeReference?: ExtensionFactSubject;
  readonly sourceSymbol?: ExtensionFactSubject;
  readonly providerDeclaration?: ProviderDeclarationIdentity;
}

export interface TargetConversionFact {
  readonly convertedType?: TargetTypeRef;
  readonly operation?: TargetOperationFact;
}

export interface TargetCallArgumentConversionFact extends TargetConversionFact {
  readonly slot: TargetCallArgumentConversionSlot;
  readonly call: ExtensionFactSubject;
  readonly sourceArgumentIndex: number;
  readonly targetParameterIndex: number;
  readonly sourceForm: "value" | "spread-element" | "spread-sequence";
  readonly spreadElementIndex?: number;
  readonly targetForm: "parameter" | "params-element" | "params-sequence";
  readonly sourceBinding: SourceSelectedCallArgumentBinding;
}

export interface TargetCallArgumentPassingFact extends ArgumentPassingFact {
  readonly slot: TargetCallArgumentConversionSlot;
  readonly call: ExtensionFactSubject;
  readonly sourceArgumentIndex: number;
  readonly targetParameterIndex: number;
  readonly sourceForm: "value" | "spread-element" | "spread-sequence";
  readonly spreadElementIndex?: number;
  readonly targetForm: "parameter" | "params-element" | "params-sequence";
  readonly sourceBinding: SourceSelectedCallArgumentBinding;
  readonly targetParameter: TargetParameter;
  readonly selectedSignature?: ProviderDeclarationIdentity;
}

export interface ProviderVirtualDeclarationFact {
  readonly providerId: string;
  readonly providerVersion: string;
  readonly providerModuleId: string;
  readonly moduleSpecifier: string;
  readonly artifactFileName: string;
  readonly exportName?: string;
  readonly exportId?: string;
  readonly memberName?: string;
  readonly memberKey?: ProviderMemberKey;
  readonly memberId?: string;
  readonly memberStatic?: boolean;
  readonly signatureId?: string;
  readonly targetIdentity?: TargetTypeRef;
}

export interface ProviderTypeFamilyVariantFact {
  readonly sourceTypeArgumentCount: number;
  readonly declaration: ProviderVirtualDeclarationFact;
  readonly targetBinding?: TargetBindingFact;
}

export interface ProviderTypeFamilyFact {
  readonly exportName: string;
  readonly variants: readonly ProviderTypeFamilyVariantFact[];
}

export interface AssociatedTypeFact {
  readonly owner: ExtensionFactSubject;
  readonly name: string;
  readonly value: ExtensionFactSubject;
}

export interface ConstGenericFact {
  readonly name: string;
  readonly value: string | number | bigint | boolean;
}

export const canonicalIdentityFactKey = defineExtensionFactKey<ExtensionCanonicalIdentity>({
  extensionId: "tsts.identity",
  name: "canonicalIdentity",
  equals: (left, right) =>
    left.kind === right.kind
    && left.id === right.id
    && left.packageName === right.packageName
    && left.packageVersion === right.packageVersion
    && left.subpath === right.subpath
    && left.exportName === right.exportName
    && left.importKind === right.importKind
    && left.canonicalSymbolId === right.canonicalSymbolId,
});

export const sourcePrimitiveFactKey = defineExtensionFactKey<SourcePrimitiveFact>({
  extensionId: "tsts.source-semantics",
  name: "sourcePrimitive",
  equals: (left, right) => left.kind === right.kind && left.width === right.width && left.signed === right.signed && left.runtimeBase === right.runtimeBase,
});

export const argumentPassingFactKey = defineExtensionFactKey<ArgumentPassingFact>({
  extensionId: "tsts.source-semantics",
  name: "argumentPassing",
  equals: (left, right) =>
    left.mode === right.mode
    && left.targetExpression === right.targetExpression,
});

export const functionPointerFactKey = defineExtensionFactKey<FunctionPointerFact>({
  extensionId: "tsts.source-semantics",
  name: "functionPointer",
  equals: (left, right) =>
    left.result === right.result
    && left.parameters.length === right.parameters.length
    && left.parameters.every((parameter, index) => parameter === right.parameters[index])
    && left.abi.length === right.abi.length
    && left.abi.every((abi, index) => abi === right.abi[index]),
});

export const pointerFactKey = defineExtensionFactKey<PointerFact>({
  extensionId: "tsts.source-semantics",
  name: "pointer",
  equals: (left, right) => left.pointee === right.pointee && left.mutability === right.mutability && left.unsafeRequired === right.unsafeRequired,
});

export const structFactKey = defineExtensionFactKey<StructFact>({
  extensionId: "tsts.source-semantics",
  name: "struct",
  equals: (left, right) =>
    left.valueType === right.valueType
    && fieldFactArrayEquals(left.fields, right.fields),
});

export const fieldFactKey = defineExtensionFactKey<FieldFact>({
  extensionId: "tsts.source-semantics",
  name: "field",
  equals: (left, right) => left.name === right.name && left.type === right.type && left.readonly === right.readonly,
});

export const attributeFactKey = defineExtensionFactKey<AttributeFact>({
  extensionId: "tsts.source-semantics",
  name: "attribute",
  equals: (left, right) =>
    left.target === right.target
    && left.attributeName === right.attributeName
    && factSubjectArrayEquals(left.arguments, right.arguments),
});

export const defaultValueFactKey = defineExtensionFactKey<DefaultValueFact>({
  extensionId: "tsts.source-semantics",
  name: "defaultValue",
  equals: (left, right) => left.type === right.type,
});

export const targetBindingFactKey = defineExtensionFactKey<TargetBindingFact>({
  extensionId: "tsts.target-bindings",
  name: "targetBinding",
  equals: targetBindingFactEquals,
});

export const instantiatedTargetTypeFactKey = defineExtensionFactKey<InstantiatedTargetTypeFact>({
  extensionId: "tsts.target-bindings",
  name: "instantiatedTargetType",
  equals: (left, right) =>
    targetBindingFactEquals(left.targetType, right.targetType)
    && factSubjectArrayEquals(left.typeArguments, right.typeArguments)
    && targetTypeRefArrayEquals(left.resolvedTypeArguments, right.resolvedTypeArguments),
});

export const selectedTargetSignatureFactKey = defineExtensionFactKey<SelectedTargetSignatureFact>({
  extensionId: "tsts.target-bindings",
  name: "selectedTargetSignature",
  equals: selectedTargetSignatureEquals,
});

export function selectedTargetSignatureEquals(left: SelectedTargetSignatureFact, right: SelectedTargetSignatureFact): boolean {
  return targetMemberEquals(left.member, right.member)
    && targetCallArgumentConversionSlotArrayEquals(left.argumentConversions, right.argumentConversions)
    && sourceSelectedCallArgumentBindingArrayEquals(left.sourceArgumentBindings, right.sourceArgumentBindings)
    && sourceSelectedMethodTypeArgumentArrayEquals(left.sourceSelectedMethodTypeArguments, right.sourceSelectedMethodTypeArguments)
    && sourceSelectedSignatureParameterArrayEquals(left.sourceSelectedSignatureParameters, right.sourceSelectedSignatureParameters)
    && left.sourceSelectedSignatureKind === right.sourceSelectedSignatureKind
    && targetTypeRefArrayEquals(left.targetTypeArguments, right.targetTypeArguments)
    && left.sourceSignature === right.sourceSignature
    && left.sourceDeclaration === right.sourceDeclaration
    && selectedSourceValueEvidenceEquals(left.sourceCallee, right.sourceCallee)
    && selectedSourceValueEvidenceArrayEquals(left.sourceArguments, right.sourceArguments)
    && selectedSourceValueEvidenceEquals(left.sourceResult, right.sourceResult)
    && left.sourceOptionalChain === right.sourceOptionalChain
    && optionalSelectedSourceValueEvidenceEquals(left.sourceReceiver, right.sourceReceiver)
    && optionalProviderDeclarationIdentityEquals(left.providerDeclaration, right.providerDeclaration);
}

function sourceSelectedCallArgumentBindingArrayEquals(
  left: readonly SourceSelectedCallArgumentBinding[],
  right: readonly SourceSelectedCallArgumentBinding[],
): boolean {
  return left.length === right.length
    && left.every((binding, index) => {
      const other = right[index];
      return other !== undefined
        && binding.sourceArgumentIndex === other.sourceArgumentIndex
        && binding.effectiveArgumentIndex === other.effectiveArgumentIndex
        && binding.sourceForm === other.sourceForm
        && binding.spreadElementIndex === other.spreadElementIndex
        && binding.sourceParameterIndex === other.sourceParameterIndex
        && binding.sourceParameterForm === other.sourceParameterForm
        && binding.selectedArgumentType === other.selectedArgumentType
        && binding.selectedParameterType === other.selectedParameterType;
    });
}

function selectedSourceTypeEvidenceEquals(left: SelectedSourceTypeEvidence, right: SelectedSourceTypeEvidence): boolean {
  return left.type === right.type
    && left.symbol === right.symbol
    && left.declaration === right.declaration
    && left.selectedSymbol === right.selectedSymbol
    && left.selectedDeclaration === right.selectedDeclaration
    && left.authoredTypeNode === right.authoredTypeNode;
}

function selectedSourceValueEvidenceEquals(left: SelectedSourceValueEvidence, right: SelectedSourceValueEvidence): boolean {
  return left.expression === right.expression && selectedSourceTypeEvidenceEquals(left, right);
}

function optionalSelectedSourceValueEvidenceEquals(
  left: SelectedSourceValueEvidence | undefined,
  right: SelectedSourceValueEvidence | undefined,
): boolean {
  return left === undefined || right === undefined
    ? left === right
    : selectedSourceValueEvidenceEquals(left, right);
}

function selectedSourceValueEvidenceArrayEquals(
  left: readonly SelectedSourceValueEvidence[],
  right: readonly SelectedSourceValueEvidence[],
): boolean {
  return left.length === right.length
    && left.every((evidence, index) => selectedSourceValueEvidenceEquals(evidence, right[index]!));
}

function targetCallArgumentConversionSlotArrayEquals(
  left: readonly TargetCallArgumentConversionSlot[],
  right: readonly TargetCallArgumentConversionSlot[],
): boolean {
  return left.length === right.length
    && left.every((slot, index) => {
      const other = right[index];
      return other !== undefined
        && slot.sourceArgumentIndex === other.sourceArgumentIndex
        && slot.sourceForm === other.sourceForm
        && slot.spreadElementIndex === other.spreadElementIndex
        && slot.targetParameterIndex === other.targetParameterIndex
        && slot.targetForm === other.targetForm;
    });
}

export const contextualTargetTypeFactKey = defineExtensionFactKey<ContextualTargetTypeFact>({
  extensionId: "tsts.target-bindings",
  name: "contextualTargetType",
  equals: (left, right) => left.type === right.type && optionalTargetTypeRefEquals(left.targetType, right.targetType),
});

export const targetOperationFactKey = defineExtensionFactKey<TargetOperationFact>({
  extensionId: "tsts.target-bindings",
  name: "targetOperation",
  equals: targetOperationFactEquals,
});

export const flowStateFactKey = defineExtensionFactKey<FlowStateFact>({
  extensionId: "tsts.flow",
  name: "flowState",
  equals: (left, right) => left.state === right.state && left.targetCompiler === right.targetCompiler,
});

export const runtimeCarrierFactKey = defineExtensionFactKey<RuntimeCarrierFact>({
  extensionId: "tsts.target-bindings",
  name: "runtimeCarrier",
  equals: (left, right) =>
    targetTypeRefEquals(left.carrier, right.carrier)
    && left.requiresAllocation === right.requiresAllocation
    && optionalRuntimeCarrierProvenanceEquals(left.provenance, right.provenance),
});

export const targetConversionFactKey = defineExtensionFactKey<TargetConversionFact>({
  extensionId: "tsts.target-bindings",
  name: "targetConversion",
  equals: (left, right) => optionalTargetTypeRefEquals(left.convertedType, right.convertedType) && optionalTargetOperationFactEquals(left.operation, right.operation),
});

export const targetCallArgumentConversionFactKey = defineExtensionFactKey<TargetCallArgumentConversionFact>({
  extensionId: "tsts.target-bindings",
  name: "targetCallArgumentConversion",
  equals: (left, right) => left.slot === right.slot
    && left.call === right.call
    && left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.targetParameterIndex === right.targetParameterIndex
    && left.sourceForm === right.sourceForm
    && left.spreadElementIndex === right.spreadElementIndex
    && left.targetForm === right.targetForm
    && optionalTargetTypeRefEquals(left.convertedType, right.convertedType)
    && optionalTargetOperationFactEquals(left.operation, right.operation),
});

export const targetCallArgumentPassingFactKey = defineExtensionFactKey<TargetCallArgumentPassingFact>({
  extensionId: "tsts.target-bindings",
  name: "targetCallArgumentPassing",
  equals: (left, right) => left.slot === right.slot
    && left.mode === right.mode
    && left.targetExpression === right.targetExpression
    && left.call === right.call
    && left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.targetParameterIndex === right.targetParameterIndex
    && left.sourceForm === right.sourceForm
    && left.spreadElementIndex === right.spreadElementIndex
    && left.targetForm === right.targetForm
    && targetParameterEquals(left.targetParameter, right.targetParameter)
    && optionalProviderDeclarationIdentityEquals(left.selectedSignature, right.selectedSignature),
});

export const providerVirtualDeclarationFactKey = defineExtensionFactKey<ProviderVirtualDeclarationFact>({
  extensionId: "tsts.provider",
  name: "virtualDeclaration",
  equals: (left, right) =>
    left.providerId === right.providerId
    && left.providerVersion === right.providerVersion
    && left.providerModuleId === right.providerModuleId
    && left.moduleSpecifier === right.moduleSpecifier
    && left.artifactFileName === right.artifactFileName
    && left.exportName === right.exportName
    && left.exportId === right.exportId
    && left.memberName === right.memberName
    && optionalProviderMemberKeyEquals(left.memberKey, right.memberKey)
    && left.memberId === right.memberId
    && left.memberStatic === right.memberStatic
    && left.signatureId === right.signatureId
    && optionalTargetTypeRefEquals(left.targetIdentity, right.targetIdentity),
});

export const providerTypeFamilyFactKey = defineExtensionFactKey<ProviderTypeFamilyFact>({
  extensionId: "tsts.provider",
  name: "typeFamily",
  equals: (left, right) =>
    left.exportName === right.exportName
    && providerTypeFamilyVariantArrayEquals(left.variants, right.variants),
});

export const associatedTypeFactKey = defineExtensionFactKey<AssociatedTypeFact>({
  extensionId: "tsts.target-bindings",
  name: "associatedType",
  equals: (left, right) => left.owner === right.owner && left.name === right.name && left.value === right.value,
});

export const constGenericFactKey = defineExtensionFactKey<ConstGenericFact>({
  extensionId: "tsts.target-bindings",
  name: "constGeneric",
  equals: (left, right) => left.name === right.name && left.value === right.value,
});

function optionalTargetTypeRefEquals(left: TargetTypeRef | undefined, right: TargetTypeRef | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return targetTypeRefEquals(left, right);
}

function optionalProviderDeclarationIdentityEquals(left: ProviderDeclarationIdentity | undefined, right: ProviderDeclarationIdentity | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return providerDeclarationIdentityEquals(left, right);
}

function providerTypeFamilyVariantArrayEquals(left: readonly ProviderTypeFamilyVariantFact[], right: readonly ProviderTypeFamilyVariantFact[]): boolean {
  return left.length === right.length && left.every((variant, index) => providerTypeFamilyVariantEquals(variant, right[index]!));
}

function providerTypeFamilyVariantEquals(left: ProviderTypeFamilyVariantFact, right: ProviderTypeFamilyVariantFact): boolean {
  return left.sourceTypeArgumentCount === right.sourceTypeArgumentCount
    && providerDeclarationIdentityEquals(left.declaration, right.declaration)
    && optionalTargetBindingFactEquals(left.targetBinding, right.targetBinding);
}

function optionalTargetBindingFactEquals(left: TargetBindingFact | undefined, right: TargetBindingFact | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return targetBindingFactEquals(left, right);
}

function optionalProviderMemberKeyEquals(left: ProviderMemberKey | undefined, right: ProviderMemberKey | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.kind === right.kind && left.name === right.name;
}

function providerDeclarationIdentityEquals(left: ProviderDeclarationIdentity, right: ProviderDeclarationIdentity): boolean {
  return left.providerId === right.providerId
    && left.providerVersion === right.providerVersion
    && left.providerModuleId === right.providerModuleId
    && left.moduleSpecifier === right.moduleSpecifier
    && left.artifactFileName === right.artifactFileName
    && left.exportName === right.exportName
    && left.exportId === right.exportId
    && left.memberName === right.memberName
    && optionalProviderMemberKeyEquals(left.memberKey, right.memberKey)
    && left.memberId === right.memberId
    && left.memberStatic === right.memberStatic
    && left.signatureId === right.signatureId
    && optionalTargetTypeRefEquals(left.targetIdentity, right.targetIdentity);
}

function factSubjectArrayEquals(left: readonly ExtensionFactSubject[] | undefined, right: readonly ExtensionFactSubject[] | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function fieldFactArrayEquals(left: readonly FieldFact[] | undefined, right: readonly FieldFact[] | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.length === right.length && left.every((value, index) => fieldFactEquals(value, right[index]!));
}

function fieldFactEquals(left: FieldFact, right: FieldFact): boolean {
  return left.name === right.name && left.type === right.type && left.readonly === right.readonly;
}

function targetTypeRefArrayEquals(left: readonly TargetTypeRef[] | undefined, right: readonly TargetTypeRef[] | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.length === right.length && left.every((value, index) => targetTypeRefEquals(value, right[index]!));
}

function targetBindingFactEquals(left: TargetBindingFact, right: TargetBindingFact): boolean {
  return left.id === right.id
    && left.sourceName === right.sourceName
    && left.targetName === right.targetName
    && left.target === right.target
    && left.kind === right.kind
    && targetTypeParameterArrayEquals(left.typeParameters, right.typeParameters)
    && targetMemberArrayEquals(left.members, right.members)
    && targetConstraintArrayEquals(left.implementedContracts, right.implementedContracts);
}

function targetMemberArrayEquals(left: readonly TargetMember[] | undefined, right: readonly TargetMember[] | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.length === right.length && left.every((value, index) => targetMemberEquals(value, right[index]!));
}

function targetMemberEquals(left: TargetMember, right: TargetMember): boolean {
  return left.id === right.id
    && left.sourceName === right.sourceName
    && left.targetName === right.targetName
    && left.kind === right.kind
    && left.static === right.static
    && targetParameterArrayEquals(left.parameters, right.parameters)
    && optionalTargetTypeRefEquals(left.returnType, right.returnType)
    && targetTypeParameterArrayEquals(left.typeParameters, right.typeParameters)
    && left.overloadGroup === right.overloadGroup
    && optionalProviderDeclarationIdentityEquals(left.providerDeclaration, right.providerDeclaration);
}

function targetParameterArrayEquals(left: readonly TargetParameter[], right: readonly TargetParameter[]): boolean {
  return left.length === right.length && left.every((value, index) => targetParameterEquals(value, right[index]!));
}

export function targetParameterEquals(left: TargetParameter, right: TargetParameter): boolean {
  return left.name === right.name
    && targetTypeRefEquals(left.type, right.type)
    && left.passingMode === right.passingMode
    && left.optional === right.optional
    && left.paramsArray === right.paramsArray;
}

function targetTypeParameterArrayEquals(left: readonly TargetTypeParameter[] | undefined, right: readonly TargetTypeParameter[] | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.length === right.length && left.every((value, index) => targetTypeParameterEquals(value, right[index]!));
}

function targetTypeParameterEquals(left: TargetTypeParameter, right: TargetTypeParameter): boolean {
  return left.name === right.name
    && left.variance === right.variance
    && targetConstraintArrayEquals(left.constraints, right.constraints);
}

function targetConstraintArrayEquals(left: readonly TargetConstraint[] | undefined, right: readonly TargetConstraint[] | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.length === right.length && left.every((value, index) => targetConstraintEquals(value, right[index]!));
}

function targetConstraintEquals(left: TargetConstraint, right: TargetConstraint): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  switch (left.kind) {
    case "implements":
      return right.kind === "implements"
        && left.contract === right.contract
        && targetTypeRefArrayEquals(left.typeArguments, right.typeArguments);
    case "lifetime":
      return right.kind === "lifetime" && left.name === right.name;
    case "target-specific":
      return right.kind === "target-specific" && left.target === right.target && left.name === right.name && Object.is(left.value, right.value);
    case "value-type":
    case "reference-type":
    case "constructible":
    case "unmanaged":
    case "copy":
    case "clone":
    case "default":
    case "sized":
      return true;
  }
}

function optionalTargetOperationFactEquals(left: TargetOperationFact | undefined, right: TargetOperationFact | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return targetOperationFactEquals(left, right);
}

function targetOperationFactEquals(left: TargetOperationFact, right: TargetOperationFact): boolean {
  return left.operationId === right.operationId
    && left.operationKind === right.operationKind
    && left.targetOperation === right.targetOperation
    && optionalTargetTypeRefEquals(left.resultType, right.resultType)
    && optionalTargetOperationProvenanceEquals(left.provenance, right.provenance);
}

function optionalTargetOperationProvenanceEquals(left: TargetOperationProvenance | undefined, right: TargetOperationProvenance | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return optionalProviderDeclarationIdentityEquals(left.providerDeclaration, right.providerDeclaration)
    && left.sourceExpression === right.sourceExpression
    && left.sourceReceiver === right.sourceReceiver
    && left.sourceCallee === right.sourceCallee
    && left.sourceSelectedSymbol === right.sourceSelectedSymbol
    && left.sourceSelectedDeclaration === right.sourceSelectedDeclaration
    && left.sourceSelectedSignature === right.sourceSelectedSignature
    && left.sourceResultType === right.sourceResultType
    && left.sourceReceiverType === right.sourceReceiverType
    && left.sourceOptionalChain === right.sourceOptionalChain;
}

function sourceSelectedMethodTypeArgumentArrayEquals(left: readonly SourceSelectedMethodTypeArgument[] | undefined, right: readonly SourceSelectedMethodTypeArgument[] | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  if (left.length !== right.length) {
    return false;
  }
  return left.every((argument, index) => sourceSelectedMethodTypeArgumentEquals(argument, right[index]!));
}

function sourceSelectedMethodTypeArgumentEquals(left: SourceSelectedMethodTypeArgument, right: SourceSelectedMethodTypeArgument): boolean {
  return left.typeParameterName === right.typeParameterName
    && left.typeParameter === right.typeParameter
    && left.selectedType === right.selectedType
    && left.explicitTypeNode === right.explicitTypeNode;
}

function sourceSelectedSignatureParameterArrayEquals(left: readonly SourceSelectedSignatureParameter[] | undefined, right: readonly SourceSelectedSignatureParameter[] | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  if (left.length !== right.length) {
    return false;
  }
  return left.every((parameter, index) => sourceSelectedSignatureParameterEquals(parameter, right[index]!));
}

function sourceSelectedSignatureParameterEquals(left: SourceSelectedSignatureParameter, right: SourceSelectedSignatureParameter): boolean {
  return left.parameterIndex === right.parameterIndex
    && left.parameterName === right.parameterName
    && left.parameterSymbol === right.parameterSymbol
    && left.parameterDeclaration === right.parameterDeclaration
    && left.selectedType === right.selectedType
    && left.authoredTypeNode === right.authoredTypeNode
    && left.acceptsOmission === right.acceptsOmission
    && left.rest === right.rest;
}

function optionalRuntimeCarrierProvenanceEquals(left: RuntimeCarrierProvenance | undefined, right: RuntimeCarrierProvenance | undefined): boolean {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  return left.sourceType === right.sourceType
    && left.sourceTypeReference === right.sourceTypeReference
    && left.sourceSymbol === right.sourceSymbol
    && optionalProviderDeclarationIdentityEquals(left.providerDeclaration, right.providerDeclaration);
}

export function targetTypeRefEquals(left: TargetTypeRef, right: TargetTypeRef): boolean {
  const pending: Array<readonly [TargetTypeRef, TargetTypeRef]> = [[left, right]];
  const compared = new WeakMap<object, WeakSet<object>>();
  const queueLists = (leftItems: readonly TargetTypeRef[], rightItems: readonly TargetTypeRef[]): boolean => {
    if (leftItems.length !== rightItems.length) {
      return false;
    }
    for (let index = 0; index < leftItems.length; index++) {
      pending.push([leftItems[index]!, rightItems[index]!]);
    }
    return true;
  };

  while (pending.length !== 0) {
    const [currentLeft, currentRight] = pending.pop()!;
    if (currentLeft === currentRight) {
      continue;
    }
    let rightComparisons = compared.get(currentLeft);
    if (rightComparisons?.has(currentRight) === true) {
      continue;
    }
    if (rightComparisons === undefined) {
      rightComparisons = new WeakSet<object>();
      compared.set(currentLeft, rightComparisons);
    }
    rightComparisons.add(currentRight);
    if (currentLeft.kind !== currentRight.kind) {
      return false;
    }
    switch (currentLeft.kind) {
      case "source-primitive":
        if (currentRight.kind !== "source-primitive" || currentLeft.name !== currentRight.name) return false;
        break;
      case "source-global":
        if (currentRight.kind !== "source-global"
          || currentLeft.name !== currentRight.name
          || !queueLists(currentLeft.typeArguments ?? [], currentRight.typeArguments ?? [])) return false;
        break;
      case "target-named":
        if (currentRight.kind !== "target-named"
          || currentLeft.id !== currentRight.id
          || !queueLists(currentLeft.typeArguments ?? [], currentRight.typeArguments ?? [])) return false;
        break;
      case "type-parameter":
        if (currentRight.kind !== "type-parameter" || currentLeft.name !== currentRight.name) return false;
        break;
      case "array":
        if (currentRight.kind !== "array" || currentLeft.rank !== currentRight.rank) return false;
        pending.push([currentLeft.element, currentRight.element]);
        break;
      case "tuple":
        if (currentRight.kind !== "tuple" || !queueLists(currentLeft.elements, currentRight.elements)) return false;
        break;
      case "pointer":
        if (currentRight.kind !== "pointer" || currentLeft.mutability !== currentRight.mutability) return false;
        pending.push([currentLeft.pointee, currentRight.pointee]);
        break;
      case "function-pointer":
        if (currentRight.kind !== "function-pointer"
          || !stringListEquals(currentLeft.abi ?? [], currentRight.abi ?? [])
          || !queueLists(currentLeft.args, currentRight.args)) return false;
        pending.push([currentLeft.result, currentRight.result]);
        break;
      case "opaque":
        if (currentRight.kind !== "opaque" || currentLeft.id !== currentRight.id) return false;
        break;
      case "associated-type":
        if (currentRight.kind !== "associated-type" || currentLeft.name !== currentRight.name) return false;
        pending.push([currentLeft.owner, currentRight.owner]);
        break;
      case "lifetime":
        if (currentRight.kind !== "lifetime" || currentLeft.name !== currentRight.name) return false;
        break;
      case "target-specific":
        if (currentRight.kind !== "target-specific"
          || currentLeft.target !== currentRight.target
          || currentLeft.name !== currentRight.name
          || !Object.is(currentLeft.value, currentRight.value)) return false;
        break;
    }
  }
  return true;
}

function stringListEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}
