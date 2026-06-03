/**
 * Checker type-system data types.
 *
 * Substantive port of TS-Go `internal/checker/types.go` (~1388 LoC).
 * Defines the in-memory representations of all types (intrinsic,
 * literal, union, intersection, generic, conditional, mapped, indexed
 * access, tuple, etc.), the flags that classify them, and the
 * symbol/node link structures the checker uses for per-node state.
 *
 * Port scope: full set of constant-unions replacing Go iota enums,
 * all type struct definitions, all *Links structures. Linkage
 * methods are stubbed.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { ScriptTarget } from "../core/index.js";
import type { PseudoBigInt } from "../jsnum/index.js";

// ---------------------------------------------------------------------------
// Constant-union flag tables (no Go iota)
// ---------------------------------------------------------------------------

export type ParseFlags = number;
export const ParseFlags = {
  None: 0 as ParseFlags,
  Yield: (1 << 0) as ParseFlags,
  Await: (1 << 1) as ParseFlags,
  Type: (1 << 2) as ParseFlags,
  IgnoreMissingOpenBrace: (1 << 4) as ParseFlags,
  JSDoc: (1 << 5) as ParseFlags,
} as const;

export type SignatureKind = 0 | 1;
export interface SignatureKindTable {
  readonly Call: SignatureKind;
  readonly Construct: SignatureKind;
}
export const SignatureKind: SignatureKindTable = {
  Call: 0 as SignatureKind,
  Construct: 1 as SignatureKind,
};

export type ContextFlags = number;
export const ContextFlags = {
  None: 0 as ContextFlags,
  Signature: (1 << 0) as ContextFlags,
  NoConstraints: (1 << 1) as ContextFlags,
  Completions: (1 << 2) as ContextFlags,
  SkipBindingPatterns: (1 << 3) as ContextFlags,
} as const;

export type TypeFormatFlags = number;
// 1:1 with TS-Go internal/checker/types.go TypeFormatFlags (the "holes" in
// the bit sequence mirror upstream's alignment with NodeBuilderFlags).
export const TypeFormatFlags = {
  None: 0 as TypeFormatFlags,
  NoTruncation: (1 << 0) as TypeFormatFlags,
  WriteArrayAsGenericType: (1 << 1) as TypeFormatFlags,
  GenerateNamesForShadowedTypeParams: (1 << 2) as TypeFormatFlags,
  UseStructuralFallback: (1 << 3) as TypeFormatFlags,
  WriteTypeArgumentsOfSignature: (1 << 5) as TypeFormatFlags,
  UseFullyQualifiedType: (1 << 6) as TypeFormatFlags,
  SuppressAnyReturnType: (1 << 8) as TypeFormatFlags,
  MultilineObjectLiterals: (1 << 10) as TypeFormatFlags,
  WriteClassExpressionAsTypeLiteral: (1 << 11) as TypeFormatFlags,
  UseTypeOfFunction: (1 << 12) as TypeFormatFlags,
  OmitParameterModifiers: (1 << 13) as TypeFormatFlags,
  UseAliasDefinedOutsideCurrentScope: (1 << 14) as TypeFormatFlags,
  UseSingleQuotesForStringLiteralType: (1 << 28) as TypeFormatFlags,
  NoTypeReduction: (1 << 29) as TypeFormatFlags,
  UseInstantiationExpressions: (1 << 30) as TypeFormatFlags,
  OmitThisParameter: (1 << 25) as TypeFormatFlags,
  WriteCallStyleSignature: (1 << 27) as TypeFormatFlags,
  AllowUniqueESSymbolType: (1 << 20) as TypeFormatFlags,
  AddUndefined: (1 << 17) as TypeFormatFlags,
  WriteArrowStyleSignature: (1 << 18) as TypeFormatFlags,
  InArrayType: (1 << 19) as TypeFormatFlags,
  InElementType: (1 << 21) as TypeFormatFlags,
  InFirstTypeArgument: (1 << 22) as TypeFormatFlags,
  InTypeAlias: (1 << 23) as TypeFormatFlags,
} as const;

export const TypeFormatFlagsNodeBuilderFlagsMask = TypeFormatFlags.NoTruncation
  | TypeFormatFlags.WriteArrayAsGenericType
  | TypeFormatFlags.GenerateNamesForShadowedTypeParams
  | TypeFormatFlags.UseStructuralFallback
  | TypeFormatFlags.WriteTypeArgumentsOfSignature
  | TypeFormatFlags.UseFullyQualifiedType
  | TypeFormatFlags.SuppressAnyReturnType
  | TypeFormatFlags.MultilineObjectLiterals
  | TypeFormatFlags.WriteClassExpressionAsTypeLiteral
  | TypeFormatFlags.UseTypeOfFunction
  | TypeFormatFlags.OmitParameterModifiers
  | TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
  | TypeFormatFlags.AllowUniqueESSymbolType
  | TypeFormatFlags.InTypeAlias
  | TypeFormatFlags.UseInstantiationExpressions
  | TypeFormatFlags.UseSingleQuotesForStringLiteralType
  | TypeFormatFlags.NoTypeReduction
  | TypeFormatFlags.OmitThisParameter;

export type SymbolFormatFlags = number;
export const SymbolFormatFlags = {
  None: 0 as SymbolFormatFlags,
  WriteTypeParametersOrArguments: (1 << 0) as SymbolFormatFlags,
  UseOnlyExternalAliasing: (1 << 1) as SymbolFormatFlags,
  AllowAnyNodeKind: (1 << 2) as SymbolFormatFlags,
  UseAliasDefinedOutsideCurrentScope: (1 << 3) as SymbolFormatFlags,
  WriteComputedProps: (1 << 4) as SymbolFormatFlags,
  DoNotIncludeSymbolChain: (1 << 5) as SymbolFormatFlags,
} as const;

export type ExternalEmitHelpers = number;
export const ExternalEmitHelpers = {
  Rest: (1 << 0) as ExternalEmitHelpers,
  Decorate: (1 << 1) as ExternalEmitHelpers,
  Metadata: (1 << 2) as ExternalEmitHelpers,
  Param: (1 << 3) as ExternalEmitHelpers,
  Awaiter: (1 << 4) as ExternalEmitHelpers,
  Await: (1 << 5) as ExternalEmitHelpers,
  AsyncGenerator: (1 << 6) as ExternalEmitHelpers,
  AsyncDelegator: (1 << 7) as ExternalEmitHelpers,
  AsyncValues: (1 << 8) as ExternalEmitHelpers,
  ExportStar: (1 << 9) as ExternalEmitHelpers,
  ImportStar: (1 << 10) as ExternalEmitHelpers,
  ImportDefault: (1 << 11) as ExternalEmitHelpers,
  MakeTemplateObject: (1 << 12) as ExternalEmitHelpers,
  ClassPrivateFieldGet: (1 << 13) as ExternalEmitHelpers,
  ClassPrivateFieldSet: (1 << 14) as ExternalEmitHelpers,
  ClassPrivateFieldIn: (1 << 15) as ExternalEmitHelpers,
  SetFunctionName: (1 << 16) as ExternalEmitHelpers,
  PropKey: (1 << 17) as ExternalEmitHelpers,
  AddDisposableResourceAndDisposeResources: (1 << 18) as ExternalEmitHelpers,
  RewriteRelativeImportExtension: (1 << 19) as ExternalEmitHelpers,
  ESDecorateAndRunInitializers: (1 << 1) as ExternalEmitHelpers,
  FirstEmitHelper: (1 << 0) as ExternalEmitHelpers,
  LastEmitHelper: (1 << 19) as ExternalEmitHelpers,
  ForAwaitOfIncludes: (1 << 8) as ExternalEmitHelpers,
  AsyncGeneratorIncludes: ((1 << 5) | (1 << 6)) as ExternalEmitHelpers,
  AsyncDelegatorIncludes: ((1 << 5) | (1 << 7) | (1 << 8)) as ExternalEmitHelpers,
} as const;

export const externalHelpersModuleNameText = "tslib";

export type TypeId = number;

export type ExhaustiveState = 0 | 1 | 2 | 3;
// 1:1 with TS-Go: Unknown, Computing, False, True (iota).
export const ExhaustiveState = {
  Unknown: 0 as ExhaustiveState,
  Computing: 1 as ExhaustiveState,
  False: 2 as ExhaustiveState,
  True: 3 as ExhaustiveState,
} as const;

export type MembersOrExportsResolutionKind = 0 | 1;
// 1:1 with TS-Go: ResolvedExports=0, ResolvedMembers=1 (indexes
// MembersAndExportsLinks; the previous Members=0/Exports=1 was reversed).
export const MembersOrExportsResolutionKind = {
  ResolvedExports: 0 as MembersOrExportsResolutionKind,
  ResolvedMembers: 1 as MembersOrExportsResolutionKind,
} as const;

export type VarianceFlags = number;
export interface VarianceFlagsTable {
  readonly Invariant: VarianceFlags;
  readonly Covariant: VarianceFlags;
  readonly Contravariant: VarianceFlags;
  readonly Bivariant: VarianceFlags;
  readonly Independent: VarianceFlags;
  readonly VarianceMask: VarianceFlags;
  readonly Unmeasurable: VarianceFlags;
  readonly Unreliable: VarianceFlags;
  readonly AllowsStructuralFallback: VarianceFlags;
}
export const VarianceFlags: VarianceFlagsTable = {
  Invariant: 0 as VarianceFlags,
  Covariant: (1 << 0) as VarianceFlags,
  Contravariant: (1 << 1) as VarianceFlags,
  Bivariant: 3 as VarianceFlags,
  Independent: (1 << 2) as VarianceFlags,
  VarianceMask: 7 as VarianceFlags,
  Unmeasurable: (1 << 3) as VarianceFlags,
  Unreliable: (1 << 4) as VarianceFlags,
  AllowsStructuralFallback: 24 as VarianceFlags, // Unmeasurable|Unreliable
} as const;

export type AccessFlags = number;
export const AccessFlags = {
  None: 0 as AccessFlags,
  IncludeUndefined: (1 << 0) as AccessFlags,
  NoIndexSignatures: (1 << 1) as AccessFlags,
  Writing: (1 << 2) as AccessFlags,
  CacheSymbol: (1 << 3) as AccessFlags,
  AllowMissing: (1 << 4) as AccessFlags,
  ExpressionPosition: (1 << 5) as AccessFlags,
  ReportDeprecated: (1 << 6) as AccessFlags,
  SuppressNoImplicitAnyError: (1 << 7) as AccessFlags,
  Contextual: (1 << 8) as AccessFlags,
  Persistent: 1 as AccessFlags, // = IncludeUndefined
} as const;

export type NodeCheckFlags = number;
// 1:1 with TS-Go `internal/checker/types.go` NodeCheckFlags (sparse — the
// broader Strada flag set was not carried into the Go rewrite).
export const NodeCheckFlags = {
  None: 0 as NodeCheckFlags,
  TypeChecked: (1 << 0) as NodeCheckFlags,
  ContextChecked: (1 << 6) as NodeCheckFlags,
  EnumValuesComputed: (1 << 10) as NodeCheckFlags,
  AssignmentsMarked: (1 << 17) as NodeCheckFlags,
  ContainsClassWithPrivateIdentifiers: (1 << 20) as NodeCheckFlags,
  ContainsSuperPropertyInStaticInitializer: (1 << 21) as NodeCheckFlags,
  InCheckIdentifier: (1 << 22) as NodeCheckFlags,
  InitializerIsUndefined: (1 << 24) as NodeCheckFlags,
  InitializerIsUndefinedComputed: (1 << 25) as NodeCheckFlags,
} as const;

export type TypeFlags = number;
export interface TypeFlagsTable {
  readonly None: TypeFlags;
  readonly Any: TypeFlags;
  readonly Unknown: TypeFlags;
  readonly Undefined: TypeFlags;
  readonly Null: TypeFlags;
  readonly Void: TypeFlags;
  readonly String: TypeFlags;
  readonly Number: TypeFlags;
  readonly BigInt: TypeFlags;
  readonly Boolean: TypeFlags;
  readonly ESSymbol: TypeFlags;
  readonly StringLiteral: TypeFlags;
  readonly NumberLiteral: TypeFlags;
  readonly BigIntLiteral: TypeFlags;
  readonly BooleanLiteral: TypeFlags;
  readonly UniqueESSymbol: TypeFlags;
  readonly EnumLiteral: TypeFlags;
  readonly Enum: TypeFlags;
  readonly NonPrimitive: TypeFlags;
  readonly Never: TypeFlags;
  readonly TypeParameter: TypeFlags;
  readonly Object: TypeFlags;
  readonly Index: TypeFlags;
  readonly TemplateLiteral: TypeFlags;
  readonly StringMapping: TypeFlags;
  readonly Substitution: TypeFlags;
  readonly IndexedAccess: TypeFlags;
  readonly Conditional: TypeFlags;
  readonly Union: TypeFlags;
  readonly Intersection: TypeFlags;
  readonly Reserved1: TypeFlags;
  readonly Reserved2: TypeFlags;
  readonly Reserved3: TypeFlags;
  readonly AnyOrUnknown: TypeFlags;
  readonly Nullable: TypeFlags;
  readonly Literal: TypeFlags;
  readonly Unit: TypeFlags;
  readonly Freshable: TypeFlags;
  readonly StringOrNumberLiteral: TypeFlags;
  readonly StringOrNumberLiteralOrUnique: TypeFlags;
  readonly DefinitelyFalsy: TypeFlags;
  readonly PossiblyFalsy: TypeFlags;
  readonly Intrinsic: TypeFlags;
  readonly StringLike: TypeFlags;
  readonly NumberLike: TypeFlags;
  readonly BigIntLike: TypeFlags;
  readonly BooleanLike: TypeFlags;
  readonly EnumLike: TypeFlags;
  readonly ESSymbolLike: TypeFlags;
  readonly VoidLike: TypeFlags;
  readonly Primitive: TypeFlags;
  readonly DefinitelyNonNullable: TypeFlags;
  readonly DisjointDomains: TypeFlags;
  readonly UnionOrIntersection: TypeFlags;
  readonly StructuredType: TypeFlags;
  readonly TypeVariable: TypeFlags;
  readonly InstantiableNonPrimitive: TypeFlags;
  readonly InstantiablePrimitive: TypeFlags;
  readonly Instantiable: TypeFlags;
  readonly StructuredOrInstantiable: TypeFlags;
  readonly ObjectFlagsType: TypeFlags;
  readonly Simplifiable: TypeFlags;
  readonly Singleton: TypeFlags;
  readonly Narrowable: TypeFlags;
}
// 1:1 with TS-Go `internal/checker/types.go` TypeFlags (NOT the Strada/JS
// layout). Bit positions and composite masks match upstream exactly;
// composite values are the precomputed bit-unions of the formulas in the
// trailing comments.
export const TypeFlags: TypeFlagsTable = {
  None: 0 as TypeFlags,
  Any: (1 << 0) as TypeFlags,
  Unknown: (1 << 1) as TypeFlags,
  Undefined: (1 << 2) as TypeFlags,
  Null: (1 << 3) as TypeFlags,
  Void: (1 << 4) as TypeFlags,
  String: (1 << 5) as TypeFlags,
  Number: (1 << 6) as TypeFlags,
  BigInt: (1 << 7) as TypeFlags,
  Boolean: (1 << 8) as TypeFlags,
  ESSymbol: (1 << 9) as TypeFlags,
  StringLiteral: (1 << 10) as TypeFlags,
  NumberLiteral: (1 << 11) as TypeFlags,
  BigIntLiteral: (1 << 12) as TypeFlags,
  BooleanLiteral: (1 << 13) as TypeFlags,
  UniqueESSymbol: (1 << 14) as TypeFlags,
  EnumLiteral: (1 << 15) as TypeFlags,
  Enum: (1 << 16) as TypeFlags,
  NonPrimitive: (1 << 17) as TypeFlags,
  Never: (1 << 18) as TypeFlags,
  TypeParameter: (1 << 19) as TypeFlags,
  Object: (1 << 20) as TypeFlags,
  Index: (1 << 21) as TypeFlags,
  TemplateLiteral: (1 << 22) as TypeFlags,
  StringMapping: (1 << 23) as TypeFlags,
  Substitution: (1 << 24) as TypeFlags,
  IndexedAccess: (1 << 25) as TypeFlags,
  Conditional: (1 << 26) as TypeFlags,
  Union: (1 << 27) as TypeFlags,
  Intersection: (1 << 28) as TypeFlags,
  Reserved1: (1 << 29) as TypeFlags,
  Reserved2: (1 << 30) as TypeFlags,
  Reserved3: (1 << 31) as TypeFlags,
  AnyOrUnknown: 3 as TypeFlags, // Any|Unknown
  Nullable: 12 as TypeFlags, // Undefined|Null
  Literal: 15360 as TypeFlags, // StringLiteral|NumberLiteral|BigIntLiteral|BooleanLiteral
  Unit: 97292 as TypeFlags, // Enum|Literal|UniqueESSymbol|Nullable
  Freshable: 80896 as TypeFlags, // Enum|Literal
  StringOrNumberLiteral: 3072 as TypeFlags, // StringLiteral|NumberLiteral
  StringOrNumberLiteralOrUnique: 19456 as TypeFlags, // StringLiteral|NumberLiteral|UniqueESSymbol
  DefinitelyFalsy: 15388 as TypeFlags,
  PossiblyFalsy: 15868 as TypeFlags,
  Intrinsic: 393983 as TypeFlags,
  StringLike: 12583968 as TypeFlags, // String|StringLiteral|TemplateLiteral|StringMapping
  NumberLike: 67648 as TypeFlags, // Number|NumberLiteral|Enum
  BigIntLike: 4224 as TypeFlags, // BigInt|BigIntLiteral
  BooleanLike: 8448 as TypeFlags, // Boolean|BooleanLiteral
  EnumLike: 98304 as TypeFlags, // Enum|EnumLiteral
  ESSymbolLike: 16896 as TypeFlags, // ESSymbol|UniqueESSymbol
  VoidLike: 20 as TypeFlags, // Void|Undefined
  Primitive: 12713980 as TypeFlags,
  DefinitelyNonNullable: 13893600 as TypeFlags,
  DisjointDomains: 12812284 as TypeFlags,
  UnionOrIntersection: 402653184 as TypeFlags, // Union|Intersection
  StructuredType: 403701760 as TypeFlags, // Object|Union|Intersection
  TypeVariable: 34078720 as TypeFlags, // TypeParameter|IndexedAccess
  InstantiableNonPrimitive: 117964800 as TypeFlags, // TypeVariable|Conditional|Substitution
  InstantiablePrimitive: 14680064 as TypeFlags, // Index|TemplateLiteral|StringMapping
  Instantiable: 132644864 as TypeFlags, // InstantiableNonPrimitive|InstantiablePrimitive
  StructuredOrInstantiable: 536346624 as TypeFlags, // StructuredType|Instantiable
  ObjectFlagsType: 403963917 as TypeFlags, // Any|Nullable|Never|Object|Union|Intersection
  Simplifiable: 102760448 as TypeFlags, // IndexedAccess|Conditional|Index
  Singleton: 394239 as TypeFlags,
  Narrowable: 536575971 as TypeFlags,
};

export type ObjectFlags = number;
export interface ObjectFlagsTable {
  readonly None: ObjectFlags;
  readonly Class: ObjectFlags;
  readonly Interface: ObjectFlags;
  readonly Reference: ObjectFlags;
  readonly Tuple: ObjectFlags;
  readonly Anonymous: ObjectFlags;
  readonly Mapped: ObjectFlags;
  readonly Instantiated: ObjectFlags;
  readonly ObjectLiteral: ObjectFlags;
  readonly EvolvingArray: ObjectFlags;
  readonly ObjectLiteralPatternWithComputedProperties: ObjectFlags;
  readonly ReverseMapped: ObjectFlags;
  readonly JsxAttributes: ObjectFlags;
  readonly JSLiteral: ObjectFlags;
  readonly FreshLiteral: ObjectFlags;
  readonly ArrayLiteral: ObjectFlags;
  readonly PrimitiveUnion: ObjectFlags;
  readonly ContainsWideningType: ObjectFlags;
  readonly ContainsObjectOrArrayLiteral: ObjectFlags;
  readonly NonInferrableType: ObjectFlags;
  readonly CouldContainTypeVariablesComputed: ObjectFlags;
  readonly CouldContainTypeVariables: ObjectFlags;
  readonly MembersResolved: ObjectFlags;
  readonly ClassOrInterface: ObjectFlags;
  readonly RequiresWidening: ObjectFlags;
  readonly PropagatingFlags: ObjectFlags;
  readonly InstantiatedMapped: ObjectFlags;
  readonly ObjectTypeKindMask: ObjectFlags;
  readonly ContainsSpread: ObjectFlags;
  readonly ObjectRestType: ObjectFlags;
  readonly InstantiationExpressionType: ObjectFlags;
  readonly SingleSignatureType: ObjectFlags;
  readonly IsClassInstanceClone: ObjectFlags;
  readonly IdenticalBaseTypeCalculated: ObjectFlags;
  readonly IdenticalBaseTypeExists: ObjectFlags;
  readonly UnresolvedMembers: ObjectFlags;
  readonly IsGenericTypeComputed: ObjectFlags;
  readonly IsGenericObjectType: ObjectFlags;
  readonly IsGenericIndexType: ObjectFlags;
  readonly IsGenericType: ObjectFlags;
  readonly ContainsIntersections: ObjectFlags;
  readonly IsUnknownLikeUnionComputed: ObjectFlags;
  readonly IsUnknownLikeUnion: ObjectFlags;
  readonly IsNeverIntersectionComputed: ObjectFlags;
  readonly IsNeverIntersection: ObjectFlags;
  readonly IsConstrainedTypeVariable: ObjectFlags;
}
// 1:1 with TS-Go `internal/checker/types.go` ObjectFlags. Bits 22+ are
// context-overloaded upstream (their meaning depends on the type's
// TypeFlags), reproduced here with the same names + values.
export const ObjectFlags: ObjectFlagsTable = {
  None: 0 as ObjectFlags,
  Class: (1 << 0) as ObjectFlags,
  Interface: (1 << 1) as ObjectFlags,
  Reference: (1 << 2) as ObjectFlags,
  Tuple: (1 << 3) as ObjectFlags,
  Anonymous: (1 << 4) as ObjectFlags,
  Mapped: (1 << 5) as ObjectFlags,
  Instantiated: (1 << 6) as ObjectFlags,
  ObjectLiteral: (1 << 7) as ObjectFlags,
  EvolvingArray: (1 << 8) as ObjectFlags,
  ObjectLiteralPatternWithComputedProperties: (1 << 9) as ObjectFlags,
  ReverseMapped: (1 << 10) as ObjectFlags,
  JsxAttributes: (1 << 11) as ObjectFlags,
  JSLiteral: (1 << 12) as ObjectFlags,
  FreshLiteral: (1 << 13) as ObjectFlags,
  ArrayLiteral: (1 << 14) as ObjectFlags,
  PrimitiveUnion: (1 << 15) as ObjectFlags,
  ContainsWideningType: (1 << 16) as ObjectFlags,
  ContainsObjectOrArrayLiteral: (1 << 17) as ObjectFlags,
  NonInferrableType: (1 << 18) as ObjectFlags,
  CouldContainTypeVariablesComputed: (1 << 19) as ObjectFlags,
  CouldContainTypeVariables: (1 << 20) as ObjectFlags,
  MembersResolved: (1 << 21) as ObjectFlags,
  ClassOrInterface: 3 as ObjectFlags, // Class|Interface
  RequiresWidening: 196608 as ObjectFlags, // ContainsWideningType|ContainsObjectOrArrayLiteral
  PropagatingFlags: 458752 as ObjectFlags, // RequiresWidening|NonInferrableType
  InstantiatedMapped: 96 as ObjectFlags, // Mapped|Instantiated
  ObjectTypeKindMask: 50332991 as ObjectFlags,
  // Flags that require TypeFlags.Object
  ContainsSpread: (1 << 22) as ObjectFlags,
  ObjectRestType: (1 << 23) as ObjectFlags,
  InstantiationExpressionType: (1 << 24) as ObjectFlags,
  SingleSignatureType: (1 << 25) as ObjectFlags,
  IsClassInstanceClone: (1 << 26) as ObjectFlags,
  // Flags that require TypeFlags.Object and ObjectFlags.Reference
  IdenticalBaseTypeCalculated: (1 << 27) as ObjectFlags,
  IdenticalBaseTypeExists: (1 << 28) as ObjectFlags,
  UnresolvedMembers: (1 << 29) as ObjectFlags,
  // Flags that require TypeFlags.UnionOrIntersection or TypeFlags.Substitution
  IsGenericTypeComputed: (1 << 22) as ObjectFlags,
  IsGenericObjectType: (1 << 23) as ObjectFlags,
  IsGenericIndexType: (1 << 24) as ObjectFlags,
  IsGenericType: 25165824 as ObjectFlags, // IsGenericObjectType|IsGenericIndexType
  // Flags that require TypeFlags.Union
  ContainsIntersections: (1 << 25) as ObjectFlags,
  IsUnknownLikeUnionComputed: (1 << 26) as ObjectFlags,
  IsUnknownLikeUnion: (1 << 27) as ObjectFlags,
  // Flags that require TypeFlags.Intersection
  IsNeverIntersectionComputed: (1 << 25) as ObjectFlags,
  IsNeverIntersection: (1 << 26) as ObjectFlags,
  IsConstrainedTypeVariable: (1 << 27) as ObjectFlags,
};

export type ElementFlags = number;
export interface ElementFlagsTable {
  readonly Required: ElementFlags;
  readonly Optional: ElementFlags;
  readonly Rest: ElementFlags;
  readonly Variadic: ElementFlags;
  readonly Fixed: ElementFlags;
  readonly Variable: ElementFlags;
  readonly NonRequired: ElementFlags;
  readonly NonRest: ElementFlags;
}
export const ElementFlags: ElementFlagsTable = {
  Required: (1 << 0) as ElementFlags,
  Optional: (1 << 1) as ElementFlags,
  Rest: (1 << 2) as ElementFlags,
  Variadic: (1 << 3) as ElementFlags,
  Fixed: 3 as ElementFlags,
  Variable: 12 as ElementFlags,
  NonRequired: 14 as ElementFlags,
  NonRest: 11 as ElementFlags,
} as const;

export type IndexFlags = number;
export const IndexFlags = {
  None: 0 as IndexFlags,
  StringsOnly: (1 << 0) as IndexFlags,
  NoIndexSignatures: (1 << 1) as IndexFlags,
  NoReducibleCheck: (1 << 2) as IndexFlags,
} as const;

// ---------------------------------------------------------------------------
// Symbol link structures
// ---------------------------------------------------------------------------

export interface SymbolReferenceLinks {
  source?: AstSymbol;
  isReferenced?: boolean;
}

export interface ValueSymbolLinks {
  type?: Type;
  writeType?: Type;
  nameType?: Type;
  uniqueESSymbolType?: Type;
}

export interface MappedSymbolLinks {
  mappedType?: Type;
  keyType?: Type;
}

export interface DeferredSymbolLinks {
  deferralParent?: AstSymbol;
  deferralConstituents?: readonly Type[];
}

export interface AliasSymbolLinks {
  immediateTarget?: AstSymbol;
  aliasTarget?: AstSymbol;
  typeOnlyDeclaration?: AstNode;
  typeOnlyExportStarMap?: Map<string, AstNode>;
  typeOnlyExportStarName?: string;
}

export interface ModuleSymbolLinks {
  resolvedExports?: SymbolTable;
  cjsExportMerged?: AstSymbol;
}

export interface ReverseMappedSymbolLinks {
  mappedType?: Type;
  constraintType?: Type;
  propertyType?: Type;
}

export interface LateBoundLinks {
  lateSymbol?: AstSymbol;
}

export interface ExportTypeLinks {
  target?: AstSymbol;
}

export interface TypeAliasLinks {
  declaredType?: Type;
  typeParameters?: readonly TypeParameter[];
  instantiations?: Map<string, Type>;
}

export interface DeclaredTypeLinks {
  declaredType?: Type;
}

export interface SwitchStatementLinks {
  exhaustiveState: ExhaustiveState;
}

export interface ArrayLiteralLinks {
  arrayLiteralType?: Type;
}

export type MembersAndExportsLinks = readonly [SymbolTable | undefined, SymbolTable | undefined];

export interface SpreadLinks {
  spreadType?: Type;
}

export interface VarianceLinks {
  variance?: readonly VarianceFlags[];
}

export interface MarkedAssignmentSymbolLinks {
  assigned?: boolean;
}

export interface AccessibleChainCacheKey {
  symbol: AstSymbol;
  enclosing: AstNode | undefined;
  meaning: number;
}

export interface ContainingSymbolLinks {
  containingSymbol?: AstSymbol;
}

export interface NodeLinks {
  flags: NodeCheckFlags;
  resolvedType?: Type;
  resolvedSymbol?: AstSymbol;
  resolvedSignature?: Signature;
  effectsSignature?: Signature;
  enumMemberValue?: string | number;
}

export interface SymbolNodeLinks {
  symbol?: AstSymbol;
}

export interface TypeNodeLinks {
  resolvedType?: Type;
}

export interface EnumMemberLinks {
  value?: string | number;
}

export interface AssertionLinks {
  assertedType?: Type;
}

export interface SourceFileLinks {
  resolvedModule?: AstSymbol;
}

export interface SignatureLinks {
  thisParameter?: AstSymbol;
  returnType?: Type;
  resolvedReturnType?: Type;
  resolvedTypePredicate?: unknown;
}

// ---------------------------------------------------------------------------
// Type alias + base type structure
// ---------------------------------------------------------------------------

export interface TypeAlias {
  symbol: AstSymbol;
  typeArguments?: readonly Type[];
}

export interface Type {
  flags: TypeFlags;
  id: TypeId;
  symbol?: AstSymbol;
  aliasSymbol?: AstSymbol;
  aliasTypeArguments?: readonly Type[];
  pattern?: AstNode;
  data?: TypeData;
  // The value-side ("typeof X") of a named class/enum/namespace/function symbol.
  // When set on an anonymous object type, the display renders `typeof <name>`
  // (mirroring TS-Go's anonymous-object-with-value-symbol → QueryKeyword path in
  // nodebuilderimpl.go). The enum DECLARED type instead carries `aliasSymbol` and
  // renders the bare enum name.
  typeofSymbol?: AstSymbol;
}

export type TypeData =
  | TypeBase
  | IntrinsicType
  | LiteralType
  | UniqueESSymbolType
  | StructuredType
  | ObjectType
  | TypeReference
  | InterfaceType
  | TupleType
  | InstantiationExpressionType
  | MappedType
  | ReverseMappedType
  | EvolvingArrayType
  | UnionOrIntersectionType
  | UnionType
  | IntersectionType
  | TypeParameter
  | IndexType
  | IndexedAccessType;

export interface TypeBase { /* discriminant base */ }

export interface IntrinsicType extends TypeBase {
  intrinsicName: string;
  objectFlags: ObjectFlags;
  debugIntrinsicName?: string;
}

export interface LiteralType extends TypeBase {
  // BigInt literal values use PseudoBigInt (matching TS-Go); no native bigint.
  value: string | number | boolean | PseudoBigInt;
  freshType?: Type;
  regularType?: Type;
}

export interface UniqueESSymbolType extends TypeBase {
  escapedName: string;
}

export interface ConstrainedType extends TypeBase {
  constraint?: Type;
}

export interface IndexInfo {
  keyType: Type;
  valueType: Type;
  isReadonly?: boolean;
  declaration?: AstNode;
}

export interface StructuredType extends ConstrainedType {
  declaredProperties?: readonly AstSymbol[];
  declaredCallSignatures?: readonly Signature[];
  declaredConstructSignatures?: readonly Signature[];
  indexInfos?: readonly IndexInfo[];
}

export interface ObjectType extends StructuredType {
  objectFlags: ObjectFlags;
  target?: ObjectType;
  resolvedTypeArguments?: readonly Type[];
}

export interface TypeReference extends ObjectType {
  resolvedTypeArguments_?: readonly Type[];
  literalType?: Type;
  cachedEquivalentBaseType?: Type;
}

export interface InterfaceType extends ObjectType {
  typeParameters?: readonly TypeParameter[];
  outerTypeParameters?: readonly TypeParameter[];
  localTypeParameters?: readonly TypeParameter[];
  thisType?: TypeParameter;
  resolvedBaseTypes?: readonly Type[];
  baseTypesResolved?: boolean;
}

export interface TupleElementInfo {
  flags: ElementFlags;
  labeledDeclaration?: AstNode;
}

export interface TupleType extends InterfaceType {
  minLength: number;
  fixedLength: number;
  hasRestElement: boolean;
  combinedFlags: ElementFlags;
  readonly: boolean;
  elementInfo: readonly TupleElementInfo[];
}

export interface InstantiationExpressionType extends ObjectType {
  node: AstNode;
}

export interface MappedType extends ObjectType {
  declaration: AstNode;
  typeParameter?: TypeParameter;
  constraintType?: Type;
  nameType?: Type;
  templateType?: Type;
  modifiersType?: Type;
  resolvedApparentType?: Type;
}

export interface ReverseMappedType extends ObjectType {
  source: Type;
  mappedType: MappedType;
  constraintType: Type;
}

export interface EvolvingArrayType extends ObjectType {
  elementType: Type;
  finalArrayType?: Type;
}

export interface UnionOrIntersectionType extends StructuredType {
  types: readonly Type[];
  objectFlags: ObjectFlags;
  propertyCache?: Map<string, AstSymbol>;
  propertyCacheWithoutFunctionPropertyAugmentation?: Map<string, AstSymbol>;
  resolvedProperties?: readonly AstSymbol[];
  resolvedIndexType?: Type;
}

export interface UnionType extends UnionOrIntersectionType {
  resolvedReducedType?: Type;
  regularType?: Type;
  origin?: Type;
  keyPropertyName?: string;
  constituentMap?: Map<TypeId, Type>;
  arrayFallbackSignatures?: readonly Signature[];
}

export interface IntersectionType extends UnionOrIntersectionType {
  resolvedApparentType?: Type;
  uniqueLiteralFilledInstantiation?: Type;
}

export interface TypeParameter extends ConstrainedType {
  isThisType?: boolean;
  target?: TypeParameter;
  mapper?: TypeMapper;
  isLocked?: boolean;
}

export interface IndexType extends TypeBase {
  type: Type;
  indexFlags: IndexFlags;
}

export interface IndexedAccessType extends TypeBase {
  objectType: Type;
  indexType: Type;
  accessFlags: AccessFlags;
  constraint?: Type;
  simplifiedForReading?: Type;
  simplifiedForWriting?: Type;
}

// ---------------------------------------------------------------------------
// Signature
// ---------------------------------------------------------------------------

export interface Signature {
  flags: number;
  declaration?: AstNode;
  typeParameters?: readonly TypeParameter[];
  parameters: readonly AstSymbol[];
  thisParameter?: AstSymbol;
  resolvedReturnType?: Type;
  resolvedTypePredicate?: unknown;
  minArgumentCount: number;
  resolvedMinArgumentCount?: number;
  target?: Signature;
  mapper?: TypeMapper;
  compositeKind?: SignatureKind;
  compositeSignatures?: readonly Signature[];
}

export type SignatureFlags = number;
export const SignatureFlags = {
  None: 0 as SignatureFlags,
  HasRestParameter: (1 << 0) as SignatureFlags,
  HasLiteralTypes: (1 << 1) as SignatureFlags,
  Construct: (1 << 2) as SignatureFlags,
  Abstract: (1 << 3) as SignatureFlags,
  IsInnerCallChain: (1 << 4) as SignatureFlags,
  IsOuterCallChain: (1 << 5) as SignatureFlags,
  IsUntypedSignatureInJSFile: (1 << 6) as SignatureFlags,
  IsNonInferrable: (1 << 7) as SignatureFlags,
  IsSignatureCandidateForOverloadFailure: (1 << 8) as SignatureFlags,
  PropagatingFlags: ((1 << 0) | (1 << 1) | (1 << 2) | (1 << 3) | (1 << 6) | (1 << 8)) as SignatureFlags,
  CallChainFlags: ((1 << 4) | (1 << 5)) as SignatureFlags,
} as const;

export interface CompositeSignature {
  isUnion: boolean;
  signatures: readonly Signature[];
}

export interface TypePredicate {
  kind: number;
  parameterIndex: number;
  parameterName: string;
  type?: Type;
}

export interface TypeMapper {
  kind: number;
  sources?: readonly Type[];
  targets?: readonly Type[];
  mapper1?: TypeMapper;
  mapper2?: TypeMapper;
  map?: (t: Type) => Type;
}

// ---------------------------------------------------------------------------
// Symbol-type access layer. Two PROVENANCES flow through getTypeOfSymbol:
//
//   1. CHECKER-CREATED synthetic property / parameter symbols (built by
//      makeObjectType / makeCallSignature) carry their type directly on a typed
//      `syntheticType` field marked by `synthetic: true`. The structural relater
//      only ever inspects these synthetic property symbols, so its
//      getTypeOfSymbol read resolves straight to the carried type. This is the
//      relater's backing field — it stays, but PROVENANCE-SPECIFIC (gated on the
//      synthetic marker, NOT a general "if a type field exists" fallback).
//
//   2. BINDER-CREATED symbols (variables, parameters, properties, functions,
//      classes, enums, modules, import/export aliases) have NO synthetic marker;
//      their type is computed by tsgo's getTypeOfSymbol flag-dispatch
//      (checker.go:16099). That dispatch needs typeFromTypeNode + initializer
//      inference, which live above types.ts in the import graph, so it is
//      injected as a resolver hook (set once at checker module init). This keeps
//      types.ts at the base of the import graph (no cycle) while making
//      getTypeOfSymbol the single symbol-type entry for both provenances.
// ---------------------------------------------------------------------------

// A checker-created symbol carrying its type directly (the synthetic backing
// field). `synthetic: true` is the provenance discriminant — a binder symbol
// never sets it, so it never masks a binder symbol's flag-dispatch.
export interface SyntheticTypeSymbol {
  synthetic: true;
  syntheticType: Type;
}

function asSyntheticTypeSymbol(symbol: AstSymbol): SyntheticTypeSymbol | undefined {
  const candidate = symbol as Partial<SyntheticTypeSymbol>;
  return candidate.synthetic === true && candidate.syntheticType !== undefined
    ? { synthetic: true, syntheticType: candidate.syntheticType }
    : undefined;
}

// The flag-dispatch for BINDER symbols, injected by the checker (avoids a
// types.ts → checkedtype.ts import cycle).
let binderSymbolTypeResolver: ((symbol: AstSymbol) => Type | undefined) | undefined;

export function setBinderSymbolTypeResolver(resolver: (symbol: AstSymbol) => Type | undefined): void {
  binderSymbolTypeResolver = resolver;
}

export function getTypeOfSymbol(symbol: AstSymbol | undefined): Type | undefined {
  if (symbol === undefined) return undefined;
  // Provenance 1: a checker-created synthetic symbol returns its carried type.
  const synthetic = asSyntheticTypeSymbol(symbol);
  if (synthetic !== undefined) return synthetic.syntheticType;
  // Provenance 2: a binder symbol goes through the flag-dispatch.
  return binderSymbolTypeResolver?.(symbol);
}

export function getPropertySymbolOfType(type: Type, name: string): AstSymbol | undefined {
  const direct = (type.symbol as unknown as { readonly members?: Map<string, AstSymbol> } | undefined)?.members?.get(name);
  if (direct !== undefined) return direct;
  if ((type.flags & TypeFlags.Intersection) !== 0) {
    for (const constituent of (type.data as UnionOrIntersectionType | undefined)?.types ?? []) {
      const symbol = getPropertySymbolOfType(constituent, name);
      if (symbol !== undefined) return symbol;
    }
  }
  return undefined;
}

export function getPropertyTypeOfType(type: Type, name: string): Type | undefined {
  return getTypeOfSymbol(getPropertySymbolOfType(type, name));
}

const typeFlagNames: readonly { flag: TypeFlags; name: string }[] = [
  { flag: TypeFlags.Any, name: "Any" },
  { flag: TypeFlags.Unknown, name: "Unknown" },
  { flag: TypeFlags.Undefined, name: "Undefined" },
  { flag: TypeFlags.Null, name: "Null" },
  { flag: TypeFlags.Void, name: "Void" },
  { flag: TypeFlags.String, name: "String" },
  { flag: TypeFlags.Number, name: "Number" },
  { flag: TypeFlags.BigInt, name: "BigInt" },
  { flag: TypeFlags.Boolean, name: "Boolean" },
  { flag: TypeFlags.ESSymbol, name: "ESSymbol" },
  { flag: TypeFlags.StringLiteral, name: "StringLiteral" },
  { flag: TypeFlags.NumberLiteral, name: "NumberLiteral" },
  { flag: TypeFlags.BigIntLiteral, name: "BigIntLiteral" },
  { flag: TypeFlags.BooleanLiteral, name: "BooleanLiteral" },
  { flag: TypeFlags.UniqueESSymbol, name: "UniqueESSymbol" },
  { flag: TypeFlags.EnumLiteral, name: "EnumLiteral" },
  { flag: TypeFlags.Enum, name: "Enum" },
  { flag: TypeFlags.NonPrimitive, name: "NonPrimitive" },
  { flag: TypeFlags.Never, name: "Never" },
  { flag: TypeFlags.TypeParameter, name: "TypeParameter" },
  { flag: TypeFlags.Object, name: "Object" },
  { flag: TypeFlags.Index, name: "Index" },
  { flag: TypeFlags.TemplateLiteral, name: "TemplateLiteral" },
  { flag: TypeFlags.StringMapping, name: "StringMapping" },
  { flag: TypeFlags.Substitution, name: "Substitution" },
  { flag: TypeFlags.IndexedAccess, name: "IndexedAccess" },
  { flag: TypeFlags.Conditional, name: "Conditional" },
  { flag: TypeFlags.Union, name: "Union" },
  { flag: TypeFlags.Intersection, name: "Intersection" },
];

export function formatTypeFlags(flags: TypeFlags): string {
  if (flags === TypeFlags.None) return "None";
  const names = typeFlagNames.filter(entry => (flags & entry.flag) !== 0).map(entry => entry.name);
  return names.length === 0 ? String(flags) : names.join("|");
}

export function typeSymbol(type: Type): AstSymbol | undefined { return type.symbol; }
export function typeAliasSymbol(type: Type): AstSymbol | undefined { return type.aliasSymbol; }
export function typeArguments(type: Type): readonly Type[] | undefined { return type.aliasTypeArguments; }
export function typeId(type: Type): TypeId { return type.id; }
export function typeFlags(type: Type): TypeFlags { return type.flags; }
export function asIntrinsicType(type: Type): IntrinsicType | undefined { return (type.flags & TypeFlags.Intrinsic) !== 0 ? type.data as IntrinsicType | undefined : undefined; }
export function asLiteralType(type: Type): LiteralType | undefined { return (type.flags & TypeFlags.Literal) !== 0 ? type.data as LiteralType | undefined : undefined; }
export function asUniqueESSymbolType(type: Type): UniqueESSymbolType | undefined { return (type.flags & TypeFlags.UniqueESSymbol) !== 0 ? type.data as UniqueESSymbolType | undefined : undefined; }
export function asConstrainedType(type: Type): ConstrainedType | undefined { return type.data as ConstrainedType | undefined; }
export function asStructuredType(type: Type): StructuredType | undefined { return (type.flags & TypeFlags.StructuredType) !== 0 ? type.data as StructuredType | undefined : undefined; }
export function asObjectType(type: Type): ObjectType | undefined { return (type.flags & TypeFlags.Object) !== 0 ? type.data as ObjectType | undefined : undefined; }
export function asTypeReference(type: Type): TypeReference | undefined { return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Reference ? type.data as TypeReference : undefined; }
export function asInterfaceType(type: Type): InterfaceType | undefined { return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Interface ? type.data as InterfaceType : undefined; }
export function asTupleType(type: Type): TupleType | undefined { return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Tuple ? type.data as TupleType : undefined; }
export function asUnionOrIntersectionType(type: Type): UnionOrIntersectionType | undefined { return (type.flags & TypeFlags.UnionOrIntersection) !== 0 ? type.data as UnionOrIntersectionType | undefined : undefined; }
export function asUnionType(type: Type): UnionType | undefined { return (type.flags & TypeFlags.Union) !== 0 ? type.data as UnionType | undefined : undefined; }
export function asIntersectionType(type: Type): IntersectionType | undefined { return (type.flags & TypeFlags.Intersection) !== 0 ? type.data as IntersectionType | undefined : undefined; }
export function asIndexType(type: Type): IndexType | undefined { return (type.flags & TypeFlags.Index) !== 0 ? type.data as IndexType | undefined : undefined; }
export function asIndexedAccessType(type: Type): IndexedAccessType | undefined { return (type.flags & TypeFlags.IndexedAccess) !== 0 ? type.data as IndexedAccessType | undefined : undefined; }
export function asTemplateLiteralType(type: Type): TypeBase | undefined { return (type.flags & TypeFlags.TemplateLiteral) !== 0 ? type.data as TypeBase | undefined : undefined; }
export function asStringMappingType(type: Type): TypeBase | undefined { return (type.flags & TypeFlags.StringMapping) !== 0 ? type.data as TypeBase | undefined : undefined; }
export function asSubstitutionType(type: Type): TypeBase | undefined { return (type.flags & TypeFlags.Substitution) !== 0 ? type.data as TypeBase | undefined : undefined; }
export function asConditionalType(type: Type): TypeBase | undefined { return (type.flags & TypeFlags.Conditional) !== 0 ? type.data as TypeBase | undefined : undefined; }
export function asEvolvingArrayType(type: Type): EvolvingArrayType | undefined { return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.EvolvingArray ? type.data as EvolvingArrayType : undefined; }
export function asMappedType(type: Type): MappedType | undefined { return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Mapped ? type.data as MappedType : undefined; }
export function asReverseMappedType(type: Type): ReverseMappedType | undefined { return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.ReverseMapped ? type.data as ReverseMappedType : undefined; }
export function asTypeParameter(type: Type): TypeParameter | undefined { return (type.flags & TypeFlags.TypeParameter) !== 0 ? type.data as TypeParameter | undefined : undefined; }
export function isUnion(type: Type): boolean { return (type.flags & TypeFlags.Union) !== 0; }
export function isIntersection(type: Type): boolean { return (type.flags & TypeFlags.Intersection) !== 0; }
export function isString(type: Type): boolean { return (type.flags & TypeFlags.String) !== 0; }
export function isStringLiteral(type: Type): boolean { return (type.flags & TypeFlags.StringLiteral) !== 0; }
export function isNumberLiteral(type: Type): boolean { return (type.flags & TypeFlags.NumberLiteral) !== 0; }
export function isBigIntLiteral(type: Type): boolean { return (type.flags & TypeFlags.BigIntLiteral) !== 0; }
export function isEnumLiteral(type: Type): boolean { return (type.flags & TypeFlags.EnumLiteral) !== 0; }
export function isBooleanLike(type: Type): boolean { return (type.flags & TypeFlags.BooleanLike) !== 0; }
export function isStringLike(type: Type): boolean { return (type.flags & TypeFlags.StringLike) !== 0; }
export function isClass(type: Type): boolean { return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Class ? true : false; }
export function isTypeParameter(type: Type): boolean { return (type.flags & TypeFlags.TypeParameter) !== 0; }
export function isIndex(type: Type): boolean { return (type.flags & TypeFlags.Index) !== 0; }
export function isTupleObjectType(type: Type): boolean { return asTupleType(type) !== undefined; }
export function intrinsicName(type: Type): string | undefined { return asIntrinsicType(type)?.intrinsicName; }
export function literalValue(type: Type): LiteralType["value"] | undefined { return asLiteralType(type)?.value; }
export function structuredCallSignatures(type: Type): readonly Signature[] { return asStructuredType(type)?.declaredCallSignatures ?? []; }
export function structuredConstructSignatures(type: Type): readonly Signature[] { return asStructuredType(type)?.declaredConstructSignatures ?? []; }
export function structuredProperties(type: Type): readonly AstSymbol[] { return asStructuredType(type)?.declaredProperties ?? []; }
export function typeReferenceTarget(type: Type): ObjectType | undefined { return asTypeReference(type)?.target; }
export function typeReferenceArguments(type: Type): readonly Type[] { return asTypeReference(type)?.resolvedTypeArguments ?? asTypeReference(type)?.resolvedTypeArguments_ ?? []; }
export function interfaceOuterTypeParameters(type: Type): readonly TypeParameter[] { return asInterfaceType(type)?.outerTypeParameters ?? []; }
export function interfaceLocalTypeParameters(type: Type): readonly TypeParameter[] { return asInterfaceType(type)?.localTypeParameters ?? []; }
export function interfaceTypeParameters(type: Type): readonly TypeParameter[] { return asInterfaceType(type)?.typeParameters ?? []; }
export function tupleElementFlags(type: Type): readonly ElementFlags[] { return asTupleType(type)?.elementInfo.map(info => info.flags) ?? []; }
export function tupleLabeledDeclarations(type: Type): readonly (AstNode | undefined)[] { return asTupleType(type)?.elementInfo.map(info => info.labeledDeclaration) ?? []; }
export function tupleFixedLength(type: Type): number { return asTupleType(type)?.fixedLength ?? 0; }
export function tupleIsReadonly(type: Type): boolean { return asTupleType(type)?.readonly === true; }
export function unionOrIntersectionTypes(type: Type): readonly Type[] { return asUnionOrIntersectionType(type)?.types ?? []; }
export function typeParameterTarget(type: Type): TypeParameter | undefined { return asTypeParameter(type)?.target; }
export function typeParameterMapper(type: Type): TypeMapper | undefined { return asTypeParameter(type)?.mapper; }
export function indexObjectType(type: Type): Type | undefined { return asIndexedAccessType(type)?.objectType; }
export function indexIndexType(type: Type): Type | undefined { return asIndexedAccessType(type)?.indexType; }
export function signatureFlags(signature: Signature): SignatureFlags { return signature.flags; }
export function signatureTypeParameters(signature: Signature): readonly TypeParameter[] | undefined { return signature.typeParameters; }
export function signatureDeclaration(signature: Signature): AstNode | undefined { return signature.declaration; }
export function signatureTarget(signature: Signature): Signature | undefined { return signature.target; }
export function signatureThisParameter(signature: Signature): AstSymbol | undefined { return signature.thisParameter; }
export function signatureParameters(signature: Signature): readonly AstSymbol[] { return signature.parameters; }
export function signatureHasRestParameter(signature: Signature): boolean { return (signature.flags & SignatureFlags.HasRestParameter) !== 0; }
export function signatureMinArgumentCount(signature: Signature): number { return signature.minArgumentCount; }
export function typePredicateType(predicate: TypePredicate): Type | undefined { return predicate.type; }
export function typePredicateKind(predicate: TypePredicate): number { return predicate.kind; }
export function typePredicateParameterIndex(predicate: TypePredicate): number { return predicate.parameterIndex; }
export function typePredicateParameterName(predicate: TypePredicate): string { return predicate.parameterName; }
export function indexInfoKeyType(info: IndexInfo): Type { return info.keyType; }
export function indexInfoValueType(info: IndexInfo): Type { return info.valueType; }
export function indexInfoIsReadonly(info: IndexInfo): boolean { return info.isReadonly === true; }

export interface LanguageFeatureMinimumTargetMap {
  readonly Exponentiation: ScriptTarget;
  readonly AsyncFunctions: ScriptTarget;
  readonly ForAwaitOf: ScriptTarget;
  readonly AsyncGenerators: ScriptTarget;
  readonly AsyncIteration: ScriptTarget;
  readonly ObjectSpreadRest: ScriptTarget;
  readonly RegularExpressionFlagsDotAll: ScriptTarget;
  readonly BindinglessCatch: ScriptTarget;
  readonly BigInt: ScriptTarget;
  readonly NullishCoalesce: ScriptTarget;
  readonly OptionalChaining: ScriptTarget;
  readonly LogicalAssignment: ScriptTarget;
  readonly TopLevelAwait: ScriptTarget;
  readonly ClassFields: ScriptTarget;
  readonly PrivateNamesAndClassStaticBlocks: ScriptTarget;
  readonly RegularExpressionFlagsHasIndices: ScriptTarget;
  readonly ShebangComments: ScriptTarget;
  readonly UsingAndAwaitUsing: ScriptTarget;
  readonly ClassAndClassElementDecorators: ScriptTarget;
  readonly RegularExpressionFlagsUnicodeSets: ScriptTarget;
}

export const LanguageFeatureMinimumTarget: LanguageFeatureMinimumTargetMap = {
  Exponentiation: ScriptTarget.ES2016,
  AsyncFunctions: ScriptTarget.ES2017,
  ForAwaitOf: ScriptTarget.ES2018,
  AsyncGenerators: ScriptTarget.ES2018,
  AsyncIteration: ScriptTarget.ES2018,
  ObjectSpreadRest: ScriptTarget.ES2018,
  RegularExpressionFlagsDotAll: ScriptTarget.ES2018,
  BindinglessCatch: ScriptTarget.ES2019,
  BigInt: ScriptTarget.ES2020,
  NullishCoalesce: ScriptTarget.ES2020,
  OptionalChaining: ScriptTarget.ES2020,
  LogicalAssignment: ScriptTarget.ES2021,
  TopLevelAwait: ScriptTarget.ES2022,
  ClassFields: ScriptTarget.ES2022,
  PrivateNamesAndClassStaticBlocks: ScriptTarget.ES2022,
  RegularExpressionFlagsHasIndices: ScriptTarget.ES2022,
  ShebangComments: ScriptTarget.ESNext,
  UsingAndAwaitUsing: ScriptTarget.ESNext,
  ClassAndClassElementDecorators: ScriptTarget.ESNext,
  RegularExpressionFlagsUnicodeSets: ScriptTarget.ESNext,
};
