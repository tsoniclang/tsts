/**
 * Checker core state definitions.
 *
 * Port of the opening structural definitions in TS-Go
 * `internal/checker/checker.go`: check modes, cache keys, inference state,
 * declaration-space flags, intrinsic string-mapping kinds, type facts, and
 * iteration resolver records. The main checker file is intentionally split by
 * concern; these definitions are the shared vocabulary used by the later
 * checker algorithm waves.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Type, Signature, TypeMapper } from "./types.js";

export type TypeComparer = (source: Type, target: Type) => boolean;

export type CheckMode = number;
export const CheckMode = {
  Normal: 0 as CheckMode,
  Contextual: 1 << 0,
  Inferential: 1 << 1,
  SkipContextSensitive: 1 << 2,
  SkipGenericFunctions: 1 << 3,
  IsForSignatureHelp: 1 << 4,
  RestBindingElement: 1 << 5,
  TypeOnly: 1 << 6,
  ForceTuple: 1 << 7,
} as const;

export type TypeSystemEntity = Type | Signature | AstSymbol | AstNode | undefined;

export type TypeSystemPropertyName = number;
export const TypeSystemPropertyName = {
  Type: 0 as TypeSystemPropertyName,
  ResolvedBaseConstructorType: 1 as TypeSystemPropertyName,
  DeclaredType: 2 as TypeSystemPropertyName,
  ResolvedReturnType: 3 as TypeSystemPropertyName,
  ResolvedBaseConstraint: 4 as TypeSystemPropertyName,
  ResolvedTypeArguments: 5 as TypeSystemPropertyName,
  ResolvedBaseTypes: 6 as TypeSystemPropertyName,
  WriteType: 7 as TypeSystemPropertyName,
  InitializerIsUndefined: 8 as TypeSystemPropertyName,
  AliasTarget: 9 as TypeSystemPropertyName,
} as const;

export interface TypeResolution {
  readonly target: TypeSystemEntity;
  readonly propertyName: TypeSystemPropertyName;
  result: boolean;
}

export interface ContextualInfo {
  readonly node: AstNode;
  readonly type: Type;
  readonly isCache: boolean;
}

export interface InferenceContextInfo {
  readonly node: AstNode;
  readonly context: InferenceContext;
}

export type WideningKind = number;
export const WideningKind = {
  Normal: 0 as WideningKind,
  FunctionReturn: 1 as WideningKind,
  GeneratorNext: 2 as WideningKind,
  GeneratorYield: 3 as WideningKind,
} as const;

export interface EnumLiteralKey {
  readonly enumSymbol: AstSymbol;
  readonly value: unknown;
}

export interface EnumRelationKey {
  readonly sourceId: number;
  readonly targetId: number;
}

export type CachedTypeKind = number;
export const CachedTypeKind = {
  LiteralUnionBaseType: 0 as CachedTypeKind,
  IndexType: 1 as CachedTypeKind,
  StringIndexType: 2 as CachedTypeKind,
  EquivalentBaseType: 3 as CachedTypeKind,
  ApparentType: 4 as CachedTypeKind,
  AwaitedType: 5 as CachedTypeKind,
  EvolvingArrayType: 6 as CachedTypeKind,
  ArrayLiteralType: 7 as CachedTypeKind,
  PermissiveInstantiation: 8 as CachedTypeKind,
  RestrictiveInstantiation: 9 as CachedTypeKind,
  RestrictiveTypeParameter: 10 as CachedTypeKind,
  IndexedAccessForReading: 11 as CachedTypeKind,
  IndexedAccessForWriting: 12 as CachedTypeKind,
  Widened: 13 as CachedTypeKind,
  RegularObjectLiteral: 14 as CachedTypeKind,
  PromisedTypeOfPromise: 15 as CachedTypeKind,
  DefaultOnlyType: 16 as CachedTypeKind,
  SyntheticType: 17 as CachedTypeKind,
  DecoratorContext: 18 as CachedTypeKind,
  DecoratorContextStatic: 19 as CachedTypeKind,
  DecoratorContextPrivate: 20 as CachedTypeKind,
  DecoratorContextPrivateStatic: 21 as CachedTypeKind,
} as const;

export interface CachedTypeKey {
  readonly kind: CachedTypeKind;
  readonly typeId: number;
}

export interface NarrowedTypeKey {
  readonly type: Type;
  readonly candidate: Type;
  readonly assumeTrue: boolean;
  readonly checkDerived: boolean;
}

export type UnionReduction = number;
export type CacheHashKey = string;

export interface UnionOfUnionKey {
  readonly id1: number;
  readonly id2: number;
  readonly reduction: UnionReduction;
  readonly cacheKey: CacheHashKey;
}

export interface CachedSignatureKey {
  readonly signature: Signature;
  readonly key: CacheHashKey;
}

export const SignatureKeyErased: CacheHashKey = "-";
export const SignatureKeyCanonical: CacheHashKey = "*";
export const SignatureKeyBase: CacheHashKey = "#";
export const SignatureKeyInner: CacheHashKey = "<";
export const SignatureKeyOuter: CacheHashKey = ">";

export interface StringMappingKey {
  readonly symbol: AstSymbol;
  readonly type: Type;
}

export interface AssignmentReducedKey {
  readonly sourceId: number;
  readonly targetId: number;
}

export interface DiscriminatedContextualTypeKey {
  readonly nodeId: number;
  readonly typeId: number;
}

export interface InstantiationExpressionKey {
  readonly nodeId: number;
  readonly typeId: number;
}

export interface SubstitutionTypeKey {
  readonly baseId: number;
  readonly constraintId: number;
}

export interface ReverseMappedTypeKey {
  readonly sourceId: number;
  readonly targetId: number;
  readonly constraintId: number;
}

export interface IterationTypesKey {
  readonly typeId: number;
  readonly use: IterationUse;
}

export interface PropertiesTypesKey {
  readonly typeId: number;
  readonly include: number;
  readonly includeOrigin: boolean;
  readonly unresolvedMembers: boolean;
}

export interface NonExistentPropertyKey {
  readonly propNode: AstNode;
  readonly containingType: Type;
  readonly isUncheckedJs: boolean;
}

export interface FlowLoopKey {
  readonly flowNode: unknown;
  readonly refKey: CacheHashKey;
}

export interface FlowLoopInfo {
  readonly key: FlowLoopKey;
  readonly types: readonly Type[];
}

export type InferenceFlags = number;
export const InferenceFlags = {
  None: 0 as InferenceFlags,
  NoDefault: 1 << 0,
  AnyDefault: 1 << 1,
  SkippedGenericFunction: 1 << 2,
} as const;

export interface InferenceContext {
  readonly inferences: readonly InferenceInfo[];
  readonly signature: Signature | undefined;
  readonly flags: InferenceFlags;
  readonly compareTypes: TypeComparer | undefined;
  readonly mapper: TypeMapper | undefined;
  readonly nonFixingMapper: TypeMapper | undefined;
  readonly returnMapper: TypeMapper | undefined;
  readonly outerReturnMapper: TypeMapper | undefined;
  readonly inferredTypeParameters: readonly Type[];
  readonly intraExpressionInferenceSites: readonly IntraExpressionInferenceSite[];
}

export interface InferenceInfo {
  readonly typeParameter: Type;
  readonly candidates: readonly Type[];
  readonly contraCandidates: readonly Type[];
  inferredType: Type | undefined;
  priority: InferencePriority;
  topLevel: boolean;
  isFixed: boolean;
  impliedArity: number;
}

export type InferencePriority = number;
export const InferencePriority = {
  None: 0 as InferencePriority,
  NakedTypeVariable: 1 << 0,
  SpeculativeTuple: 1 << 1,
  SubstituteSource: 1 << 2,
  HomomorphicMappedType: 1 << 3,
  PartialHomomorphicMappedType: 1 << 4,
  MappedTypeConstraint: 1 << 5,
  ContravariantConditional: 1 << 6,
  ReturnType: 1 << 7,
  LiteralKeyof: 1 << 8,
  NoConstraints: 1 << 9,
  AlwaysStrict: 1 << 10,
  MaxValue: 1 << 11,
  Circularity: -1,
  PriorityImpliesCombination: (1 << 7) | (1 << 5) | (1 << 8),
} as const;

export interface IntraExpressionInferenceSite {
  readonly node: AstNode;
  readonly type: Type;
}

export type DeclarationMeaning = number;
export const DeclarationMeaning = {
  GetAccessor: 1 << 0,
  SetAccessor: 1 << 1,
  PropertyAssignment: 1 << 2,
  Method: 1 << 3,
  PrivateStatic: 1 << 4,
  GetOrSetAccessor: (1 << 0) | (1 << 1),
  PropertyAssignmentOrMethod: (1 << 2) | (1 << 3),
} as const;

export type DeclarationSpaces = number;
export const DeclarationSpaces = {
  None: 0 as DeclarationSpaces,
  ExportValue: 1 << 0,
  ExportType: 1 << 1,
  ExportNamespace: 1 << 2,
} as const;

export type IntrinsicTypeKind = number;
export const IntrinsicTypeKind = {
  Unknown: 0 as IntrinsicTypeKind,
  Uppercase: 1 as IntrinsicTypeKind,
  Lowercase: 2 as IntrinsicTypeKind,
  Capitalize: 3 as IntrinsicTypeKind,
  Uncapitalize: 4 as IntrinsicTypeKind,
  NoInfer: 5 as IntrinsicTypeKind,
} as const;

export const intrinsicTypeKinds: ReadonlyMap<string, IntrinsicTypeKind> = new Map([
  ["Uppercase", IntrinsicTypeKind.Uppercase],
  ["Lowercase", IntrinsicTypeKind.Lowercase],
  ["Capitalize", IntrinsicTypeKind.Capitalize],
  ["Uncapitalize", IntrinsicTypeKind.Uncapitalize],
  ["NoInfer", IntrinsicTypeKind.NoInfer],
]);

export type MappedTypeModifiers = number;
export const MappedTypeModifiers = {
  IncludeReadonly: 1 << 0,
  ExcludeReadonly: 1 << 1,
  IncludeOptional: 1 << 2,
  ExcludeOptional: 1 << 3,
} as const;

export type MappedTypeNameTypeKind = number;
export const MappedTypeNameTypeKind = {
  None: 0 as MappedTypeNameTypeKind,
  Filtering: 1 as MappedTypeNameTypeKind,
  Remapping: 2 as MappedTypeNameTypeKind,
} as const;

export type ReferenceHint = number;
export const ReferenceHint = {
  Unspecified: 0 as ReferenceHint,
  Identifier: 1 as ReferenceHint,
  Property: 2 as ReferenceHint,
  ExportAssignment: 3 as ReferenceHint,
  Jsx: 4 as ReferenceHint,
  ExportImportEquals: 5 as ReferenceHint,
  ExportSpecifier: 6 as ReferenceHint,
  Decorator: 7 as ReferenceHint,
} as const;

export type TypeFacts = number;
export const TypeFacts = {
  None: 0 as TypeFacts,
  TypeofEQString: 1 << 0,
  TypeofEQNumber: 1 << 1,
  TypeofEQBigInt: 1 << 2,
  TypeofEQBoolean: 1 << 3,
  TypeofEQSymbol: 1 << 4,
  TypeofEQObject: 1 << 5,
  TypeofEQFunction: 1 << 6,
  TypeofEQHostObject: 1 << 7,
  TypeofNEString: 1 << 8,
  TypeofNENumber: 1 << 9,
  TypeofNEBigInt: 1 << 10,
  TypeofNEBoolean: 1 << 11,
  TypeofNESymbol: 1 << 12,
  TypeofNEObject: 1 << 13,
  TypeofNEFunction: 1 << 14,
  TypeofNEHostObject: 1 << 15,
  EQUndefined: 1 << 16,
  EQNull: 1 << 17,
  EQUndefinedOrNull: 1 << 18,
  NEUndefined: 1 << 19,
  NENull: 1 << 20,
  NEUndefinedOrNull: 1 << 21,
  Truthy: 1 << 22,
  Falsy: 1 << 23,
  IsUndefined: 1 << 24,
  IsNull: 1 << 25,
  IsUndefinedOrNull: (1 << 24) | (1 << 25),
  All: (1 << 27) - 1,
} as const;

export const TypeFactsDerived = {
  BaseStringStrictFacts: TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull,
  BaseStringFacts: TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy,
  StringStrictFacts: TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy | TypeFacts.Falsy,
  StringFacts: TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy | TypeFacts.Truthy,
  EmptyStringStrictFacts: TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Falsy,
  EmptyStringFacts: TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy,
  NonEmptyStringStrictFacts: TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy,
  NonEmptyStringFacts: TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy | TypeFacts.Truthy,
  BaseNumberStrictFacts: TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull,
  BaseNumberFacts: TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy,
  NumberStrictFacts: TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy | TypeFacts.Falsy,
  NumberFacts: TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy | TypeFacts.Truthy,
  ZeroNumberStrictFacts: TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Falsy,
  ZeroNumberFacts: TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy,
  NonZeroNumberStrictFacts: TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy,
  NonZeroNumberFacts: TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy | TypeFacts.Truthy,
  BaseBigIntStrictFacts: TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull,
  BaseBigIntFacts: TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy,
  BigIntStrictFacts: TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy | TypeFacts.Falsy,
  BigIntFacts: TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy | TypeFacts.Truthy,
  ZeroBigIntStrictFacts: TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Falsy,
  ZeroBigIntFacts: TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy,
  NonZeroBigIntStrictFacts: TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy,
  NonZeroBigIntFacts: TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy | TypeFacts.Truthy,
  BaseBooleanStrictFacts: TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull,
  BaseBooleanFacts: TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy,
  BooleanStrictFacts: TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy | TypeFacts.Falsy,
  BooleanFacts: TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy | TypeFacts.Truthy,
  FalseStrictFacts: TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Falsy,
  FalseFacts: TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy,
  TrueStrictFacts: TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy,
  TrueFacts: TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy | TypeFacts.Truthy,
  SymbolStrictFacts: TypeFacts.TypeofEQSymbol | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy,
  ObjectStrictFacts: TypeFacts.TypeofEQObject | TypeFacts.TypeofEQHostObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEFunction | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy,
  FunctionStrictFacts: TypeFacts.TypeofEQFunction | TypeFacts.TypeofEQHostObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy,
  VoidFacts: TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.EQUndefined | TypeFacts.EQUndefinedOrNull | TypeFacts.NENull | TypeFacts.Falsy,
  UndefinedFacts: TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.EQUndefined | TypeFacts.EQUndefinedOrNull | TypeFacts.NENull | TypeFacts.Falsy | TypeFacts.IsUndefined,
  NullFacts: TypeFacts.TypeofEQObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEFunction | TypeFacts.TypeofNEHostObject | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.NEUndefined | TypeFacts.Falsy | TypeFacts.IsNull,
  EmptyObjectStrictFacts: TypeFacts.All & ~(TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.IsUndefinedOrNull),
  EmptyObjectFacts: TypeFacts.All & ~TypeFacts.IsUndefinedOrNull,
  UnknownFacts: TypeFacts.All & ~TypeFacts.IsUndefinedOrNull,
  AllTypeofNE: TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.NEUndefined,
  OrFactsMask: TypeFacts.TypeofEQFunction | TypeFacts.TypeofNEObject,
  AndFactsMask: TypeFacts.All & ~(TypeFacts.TypeofEQFunction | TypeFacts.TypeofNEObject),
} as const;

export type IterationUse = number;
export const IterationUse = {
  AllowsSyncIterablesFlag: 1 << 0,
  AllowsAsyncIterablesFlag: 1 << 1,
  AllowsStringInputFlag: 1 << 2,
  ForOfFlag: 1 << 3,
  YieldStarFlag: 1 << 4,
  SpreadFlag: 1 << 5,
  DestructuringFlag: 1 << 6,
  PossiblyOutOfBounds: 1 << 7,
  Element: 1 << 0,
  Spread: (1 << 0) | (1 << 5),
  Destructuring: (1 << 0) | (1 << 6),
  ForOf: (1 << 0) | (1 << 2) | (1 << 3),
  ForAwaitOf: (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3),
  YieldStar: (1 << 0) | (1 << 4),
  AsyncYieldStar: (1 << 0) | (1 << 1) | (1 << 4),
  GeneratorReturnType: 1 << 0,
  AsyncGeneratorReturnType: 1 << 1,
  CacheFlags: (1 << 0) | (1 << 1) | (1 << 3),
} as const;

export interface IterationTypes {
  readonly yieldType: Type;
  readonly returnType: Type;
  readonly nextType: Type;
}

export type IterationTypeKind = number;
export const IterationTypeKind = {
  Yield: 0 as IterationTypeKind,
  Return: 1 as IterationTypeKind,
  Next: 2 as IterationTypeKind,
} as const;

export interface IterationTypesResolver {
  readonly iteratorSymbolName: string;
  readonly getGlobalIteratorType: () => Type;
  readonly getGlobalIterableType: () => Type;
  readonly getGlobalIterableTypeChecked: () => Type;
  readonly getGlobalIterableIteratorType: () => Type;
  readonly getGlobalIterableIteratorTypeChecked: () => Type;
  readonly getGlobalIteratorObjectType: () => Type;
  readonly getGlobalGeneratorType: () => Type;
  readonly getGlobalBuiltinIteratorTypes: () => readonly Type[];
  readonly resolveIterationType: (type: Type, errorNode: AstNode | undefined) => Type;
}

export interface WideningContext {
  readonly parent: WideningContext | undefined;
  readonly propertyName: string;
  readonly siblings: readonly Type[];
  readonly resolvedProperties: readonly AstSymbol[];
  readonly childContexts: Map<string, WideningContext>;
  readonly widenedTypes: Map<Type, Type>;
}

export interface CheckerHost {
  readonly getCurrentDirectory?: () => string;
  readonly useCaseSensitiveFileNames?: () => boolean;
}

export interface CheckerProgram extends CheckerHost {
  readonly options: () => unknown;
  readonly sourceFiles: () => readonly AstNode[];
  readonly bindSourceFiles: () => void;
  readonly fileExists: (fileName: string) => boolean;
  readonly getSourceFile: (fileName: string) => AstNode | undefined;
  readonly getSourceFileForResolvedModule: (fileName: string) => AstNode | undefined;
  readonly getEmitModuleFormatOfFile: (sourceFile: AstNode) => number;
  readonly getEmitSyntaxForUsageLocation: (sourceFile: AstNode, usageLocation: AstNode) => number;
  readonly getImpliedNodeFormatForEmit: (sourceFile: AstNode) => number;
  readonly getResolvedModule: (currentSourceFile: AstNode, moduleReference: string, mode: number) => unknown;
  readonly getResolvedModules: () => ReadonlyMap<string, unknown>;
  readonly getPackagesMap: () => ReadonlyMap<string, boolean>;
  readonly getSourceFileMetaData: (path: string) => unknown;
  readonly getJSXRuntimeImportSpecifier: (path: string) => readonly [string, AstNode | undefined];
  readonly getImportHelpersImportSpecifier: (path: string) => AstNode | undefined;
  readonly sourceFileMayBeEmitted: (sourceFile: AstNode, forceDtsEmit: boolean) => boolean;
  readonly isSourceFileDefaultLibrary: (path: string) => boolean;
  readonly getProjectReferenceFromOutputDts: (path: string) => unknown;
  readonly getRedirectForResolution: (file: AstNode) => unknown;
  readonly commonSourceDirectory: () => string;
}

export interface CheckerCoreState {
  readonly id: number;
  readonly program: CheckerProgram | undefined;
  readonly compilerOptions: unknown;
  readonly files: readonly AstNode[];
  readonly fileIndexMap: ReadonlyMap<AstNode, number>;
  readonly compareSymbols: (left: AstSymbol, right: AstSymbol) => number;
  readonly compareSymbolChains: (left: readonly AstSymbol[], right: readonly AstSymbol[]) => number;
  typeCount: number;
  symbolCount: number;
  totalInstantiationCount: number;
  instantiationCount: number;
  instantiationDepth: number;
  inlineLevel: number;
  currentNode: AstNode | undefined;
  varianceTypeParameter: Type | undefined;
  languageVersion: number;
  moduleKind: number;
  moduleResolutionKind: number;
  isInferencePartiallyBlocked: boolean;
  legacyDecorators: boolean;
  emitStandardClassFields: boolean;
  strictNullChecks: boolean;
  strictFunctionTypes: boolean;
  strictBindCallApply: boolean;
  strictPropertyInitialization: boolean;
  strictBuiltinIteratorReturn: boolean;
  noImplicitAny: boolean;
  noImplicitThis: boolean;
  useUnknownInCatchVariables: boolean;
  exactOptionalPropertyTypes: boolean;
  canCollectSymbolAliasAccessibilityData: boolean;
  wasCanceled: boolean;
  saveDeferredDiagnostics: boolean;
  arrayVariances: readonly number[];
  globals: Map<string, AstSymbol>;
  stringLiteralTypes: Map<string, Type>;
  numberLiteralTypes: Map<number, Type>;
  nanType: Type | undefined;
  bigintLiteralTypes: Map<string, Type>;
  enumLiteralTypes: Map<string, Type>;
  enumNaNLiteralTypes: Map<AstSymbol, Type>;
  indexedAccessTypes: Map<CacheHashKey, Type>;
  templateLiteralTypes: Map<CacheHashKey, Type>;
  stringMappingTypes: Map<string, Type>;
  uniqueESSymbolTypes: Map<AstSymbol, Type>;
  thisExpandoKinds: Map<AstSymbol, number>;
  thisExpandoLocations: Map<AstSymbol, AstNode>;
  subtypeReductionCache: Map<CacheHashKey, readonly Type[]>;
  cachedTypes: Map<string, Type>;
  cachedSignatures: Map<string, Signature>;
  undefinedProperties: Map<string, AstSymbol>;
  narrowedTypes: Map<string, Type>;
  assignmentReducedTypes: Map<string, Type>;
  discriminatedContextualTypes: Map<string, Type>;
  instantiationExpressionTypes: Map<string, Type>;
  substitutionTypes: Map<string, Type>;
  reverseMappedCache: Map<string, Type>;
  reverseHomomorphicMappedCache: Map<string, Type>;
  iterationTypesCache: Map<string, IterationTypes>;
  markerTypes: Set<Type>;
  undefinedSymbol: AstSymbol | undefined;
  argumentsSymbol: AstSymbol | undefined;
  requireSymbol: AstSymbol | undefined;
  unknownSymbol: AstSymbol | undefined;
  unresolvedSymbols: Map<string, AstSymbol>;
  errorTypes: Map<CacheHashKey, Type>;
  moduleSymbols: Map<AstNode, AstSymbol>;
  globalThisSymbol: AstSymbol | undefined;
  symbolTableAliasCache: Map<number, readonly AstSymbol[]>;
  tupleTypes: Map<CacheHashKey, Type>;
  unionTypes: Map<CacheHashKey, Type>;
  unionOfUnionTypes: Map<string, Type>;
  intersectionTypes: Map<CacheHashKey, Type>;
  propertiesTypes: Map<string, Type>;
  diagnostics: readonly unknown[];
  suggestionDiagnostics: readonly unknown[];
  mergedSymbols: Map<AstSymbol, AstSymbol>;
  nodeLinks: Map<AstNode, unknown>;
  signatureLinks: Map<AstNode, unknown>;
  symbolNodeLinks: Map<AstNode, unknown>;
  typeNodeLinks: Map<AstNode, unknown>;
  enumMemberLinks: Map<AstNode, unknown>;
  assertionLinks: Map<AstNode, unknown>;
  arrayLiteralLinks: Map<AstNode, unknown>;
  switchStatementLinks: Map<AstNode, unknown>;
  jsxElementLinks: Map<AstNode, unknown>;
  symbolReferenceLinks: Map<AstSymbol, unknown>;
  valueSymbolLinks: Map<AstSymbol, unknown>;
  mappedSymbolLinks: Map<AstSymbol, unknown>;
  deferredSymbolLinks: Map<AstSymbol, unknown>;
  aliasSymbolLinks: Map<AstSymbol, unknown>;
  moduleSymbolLinks: Map<AstSymbol, unknown>;
  lateBoundLinks: Map<AstSymbol, unknown>;
  exportTypeLinks: Map<AstSymbol, unknown>;
  membersAndExportsLinks: Map<AstSymbol, unknown>;
  typeAliasLinks: Map<AstSymbol, unknown>;
  declaredTypeLinks: Map<AstSymbol, unknown>;
  spreadLinks: Map<AstSymbol, unknown>;
  varianceLinks: Map<AstSymbol, unknown>;
  reverseMappedSymbolLinks: Map<AstSymbol, unknown>;
  markedAssignmentSymbolLinks: Map<AstSymbol, unknown>;
  symbolContainerLinks: Map<AstSymbol, unknown>;
  sourceFileLinks: Map<AstNode, unknown>;
  patternForType: Map<Type, AstNode>;
  contextFreeTypes: Map<AstNode, Type>;
  anyType: Type;
  autoType: Type;
  wildcardType: Type;
  blockedStringType: Type;
  errorType: Type;
  unresolvedType: Type;
  nonInferrableAnyType: Type;
  intrinsicMarkerType: Type;
  unknownType: Type;
  undefinedType: Type;
  undefinedWideningType: Type;
  missingType: Type;
  undefinedOrMissingType: Type;
  optionalType: Type;
  nullType: Type;
  nullWideningType: Type;
  stringType: Type;
  numberType: Type;
  bigintType: Type;
  regularFalseType: Type;
  falseType: Type;
  regularTrueType: Type;
  trueType: Type;
  booleanType: Type;
  esSymbolType: Type;
  voidType: Type;
  neverType: Type;
  silentNeverType: Type;
  implicitNeverType: Type;
}
