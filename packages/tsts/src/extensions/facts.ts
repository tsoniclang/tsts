import { defineExtensionFactKey } from "./host.js";
import type { ExtensionEvidence, ExtensionFactSubject } from "./host.js";

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

export type ArgumentPassingMode =
  | "by-value"
  | "byref-readonly"
  | "byref-readwrite"
  | "byref-writeonly-must-init"
  | "borrow-shared"
  | "borrow-mut"
  | "move";

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

export type TargetTypeRef =
  | { readonly kind: "source-primitive"; readonly name: SourcePrimitiveKind }
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

export interface SelectedTargetSignatureFact {
  readonly member: TargetMember;
  readonly typeArguments?: readonly ExtensionFactSubject[];
  readonly argumentConversions?: readonly TargetTypeRef[];
}

export interface SurfaceOperationFact {
  readonly operationId: string;
  readonly sourceOperation: "property" | "method" | "indexer" | "operator" | "constructor";
  readonly targetOperation: string;
  readonly resultType?: ExtensionFactSubject;
  readonly evidence?: readonly ExtensionEvidence[];
}

export interface FlowStateFact {
  readonly state: "moved" | "borrowed-shared" | "borrowed-mut" | "initialized" | "uninitialized" | "target-validation-required";
  readonly targetCompiler?: string;
  readonly evidence?: readonly ExtensionEvidence[];
}

export interface RuntimeCarrierFact {
  readonly carrier: TargetTypeRef;
  readonly requiresAllocation?: boolean;
}

export interface ProviderVirtualDeclarationFact {
  readonly providerId: string;
  readonly providerVersion: string;
  readonly providerModuleId: string;
  readonly moduleSpecifier: string;
  readonly virtualFileName: string;
  readonly exportName?: string;
  readonly memberName?: string;
  readonly signatureId?: string;
  readonly targetIdentity?: TargetTypeRef;
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
  extensionId: "tsts.source-core",
  name: "sourcePrimitive",
  equals: (left, right) => left.kind === right.kind && left.width === right.width && left.signed === right.signed && left.runtimeBase === right.runtimeBase,
});

export const argumentPassingFactKey = defineExtensionFactKey<ArgumentPassingFact>({
  extensionId: "tsts.source-core",
  name: "argumentPassing",
  equals: (left, right) => left.mode === right.mode && left.targetExpression === right.targetExpression,
});

export const targetBindingFactKey = defineExtensionFactKey<TargetBindingFact>({
  extensionId: "tsts.target-bindings",
  name: "targetBinding",
  equals: (left, right) => left.id === right.id && left.target === right.target,
});

export const instantiatedTargetTypeFactKey = defineExtensionFactKey<InstantiatedTargetTypeFact>({
  extensionId: "tsts.target-bindings",
  name: "instantiatedTargetType",
  equals: (left, right) => left.targetType.id === right.targetType.id && left.typeArguments.length === right.typeArguments.length && left.typeArguments.every((argument, index) => argument === right.typeArguments[index]),
});

export const selectedTargetSignatureFactKey = defineExtensionFactKey<SelectedTargetSignatureFact>({
  extensionId: "tsts.target-bindings",
  name: "selectedTargetSignature",
  equals: (left, right) => left.member.id === right.member.id,
});

export const surfaceOperationFactKey = defineExtensionFactKey<SurfaceOperationFact>({
  extensionId: "tsts.surface",
  name: "surfaceOperation",
  equals: (left, right) => left.operationId === right.operationId && left.targetOperation === right.targetOperation,
});

export const flowStateFactKey = defineExtensionFactKey<FlowStateFact>({
  extensionId: "tsts.flow",
  name: "flowState",
  equals: (left, right) => left.state === right.state && left.targetCompiler === right.targetCompiler,
});

export const runtimeCarrierFactKey = defineExtensionFactKey<RuntimeCarrierFact>({
  extensionId: "tsts.target-bindings",
  name: "runtimeCarrier",
  equals: (left, right) => targetTypeRefEquals(left.carrier, right.carrier) && left.requiresAllocation === right.requiresAllocation,
});

export const providerVirtualDeclarationFactKey = defineExtensionFactKey<ProviderVirtualDeclarationFact>({
  extensionId: "tsts.provider",
  name: "virtualDeclaration",
  equals: (left, right) =>
    left.providerId === right.providerId
    && left.providerVersion === right.providerVersion
    && left.providerModuleId === right.providerModuleId
    && left.moduleSpecifier === right.moduleSpecifier
    && left.virtualFileName === right.virtualFileName
    && left.exportName === right.exportName
    && left.memberName === right.memberName
    && left.signatureId === right.signatureId
    && optionalTargetTypeRefEquals(left.targetIdentity, right.targetIdentity),
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

function targetTypeRefEquals(left: TargetTypeRef, right: TargetTypeRef): boolean {
  if (left.kind !== right.kind) {
    return false;
  }
  switch (left.kind) {
    case "source-primitive":
      return right.kind === "source-primitive" && left.name === right.name;
    case "target-named":
      return right.kind === "target-named"
        && left.id === right.id
        && targetTypeRefListEquals(left.typeArguments ?? [], right.typeArguments ?? []);
    case "type-parameter":
      return right.kind === "type-parameter" && left.name === right.name;
    case "array":
      return right.kind === "array" && left.rank === right.rank && targetTypeRefEquals(left.element, right.element);
    case "tuple":
      return right.kind === "tuple" && targetTypeRefListEquals(left.elements, right.elements);
    case "pointer":
      return right.kind === "pointer" && left.mutability === right.mutability && targetTypeRefEquals(left.pointee, right.pointee);
    case "function-pointer":
      return right.kind === "function-pointer"
        && targetTypeRefListEquals(left.args, right.args)
        && targetTypeRefEquals(left.result, right.result)
        && stringListEquals(left.abi ?? [], right.abi ?? []);
    case "opaque":
      return right.kind === "opaque" && left.id === right.id;
    case "associated-type":
      return right.kind === "associated-type" && left.name === right.name && targetTypeRefEquals(left.owner, right.owner);
    case "lifetime":
      return right.kind === "lifetime" && left.name === right.name;
    case "target-specific":
      return right.kind === "target-specific" && left.target === right.target && left.name === right.name && Object.is(left.value, right.value);
  }
}

function targetTypeRefListEquals(left: readonly TargetTypeRef[], right: readonly TargetTypeRef[]): boolean {
  return left.length === right.length && left.every((item, index) => targetTypeRefEquals(item, right[index]!));
}

function stringListEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}
