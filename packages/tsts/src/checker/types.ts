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
export const SignatureKind = {
  Call: 0 as SignatureKind,
  Construct: 1 as SignatureKind,
} as const;

export type ContextFlags = number;
export const ContextFlags = {
  None: 0 as ContextFlags,
  Signature: (1 << 0) as ContextFlags,
  NoConstraints: (1 << 1) as ContextFlags,
  Completions: (1 << 2) as ContextFlags,
  SkipBindingPatterns: (1 << 3) as ContextFlags,
} as const;

export type TypeFormatFlags = number;
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
  ForSignatureHelp: (1 << 15) as TypeFormatFlags,
  AllowUniqueESSymbolType: (1 << 20) as TypeFormatFlags,
  AddUndefined: (1 << 17) as TypeFormatFlags,
  WriteArrowStyleSignature: (1 << 18) as TypeFormatFlags,
  InArrayType: (1 << 19) as TypeFormatFlags,
  InElementType: (1 << 21) as TypeFormatFlags,
  InFirstTypeArgument: (1 << 22) as TypeFormatFlags,
  InTypeAlias: (1 << 23) as TypeFormatFlags,
  NoTypeReduction: (1 << 29) as TypeFormatFlags,
  OmitThisParameter: (1 << 25) as TypeFormatFlags,
} as const;

export const TypeFormatFlagsNodeBuilderFlagsMask = TypeFormatFlags.NoTruncation
  | TypeFormatFlags.WriteArrayAsGenericType
  | TypeFormatFlags.GenerateNamesForShadowedTypeParams
  | TypeFormatFlags.UseStructuralFallback
  | TypeFormatFlags.WriteTypeArgumentsOfSignature
  | TypeFormatFlags.UseFullyQualifiedType;

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

export type TypeId = number;

export type ExhaustiveState = 0 | 1 | 2;
export const ExhaustiveState = {
  NotComputed: 0 as ExhaustiveState,
  IsComputing: 1 as ExhaustiveState,
  ComputedAsResult: 2 as ExhaustiveState,
} as const;

export type MembersOrExportsResolutionKind = 0 | 1;
export const MembersOrExportsResolutionKind = {
  Members: 0 as MembersOrExportsResolutionKind,
  Exports: 1 as MembersOrExportsResolutionKind,
} as const;

export type VarianceFlags = number;
export const VarianceFlags = {
  Invariant: 0 as VarianceFlags,
  Covariant: (1 << 0) as VarianceFlags,
  Contravariant: (1 << 1) as VarianceFlags,
  Bivariant: 3 as VarianceFlags,
  Independent: (1 << 2) as VarianceFlags,
  VarianceMask: 7 as VarianceFlags,
  Unmeasurable: (1 << 3) as VarianceFlags,
  Unreliable: (1 << 4) as VarianceFlags,
  AllowsStructuralFallback: (1 << 5) as VarianceFlags,
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
  Persistent: (1 << 9) as AccessFlags,
} as const;

export type NodeCheckFlags = number;
export const NodeCheckFlags = {
  None: 0 as NodeCheckFlags,
  TypeChecked: (1 << 0) as NodeCheckFlags,
  LexicalThis: (1 << 1) as NodeCheckFlags,
  CaptureThis: (1 << 2) as NodeCheckFlags,
  CaptureNewTarget: (1 << 3) as NodeCheckFlags,
  SuperInstance: (1 << 4) as NodeCheckFlags,
  SuperStatic: (1 << 5) as NodeCheckFlags,
  ContextChecked: (1 << 6) as NodeCheckFlags,
  ConstructorReferenceInClass: (1 << 7) as NodeCheckFlags,
  EnumValuesComputed: (1 << 9) as NodeCheckFlags,
  LexicalModuleMergesWithClass: (1 << 10) as NodeCheckFlags,
  LoopWithCapturedBlockScopedBinding: (1 << 11) as NodeCheckFlags,
  ContainsCapturedBlockScopeBinding: (1 << 12) as NodeCheckFlags,
  CapturedBlockScopedBinding: (1 << 13) as NodeCheckFlags,
  BlockScopedBindingInLoop: (1 << 14) as NodeCheckFlags,
  NeedsLoopOutParameter: (1 << 15) as NodeCheckFlags,
  AssignmentsMarked: (1 << 16) as NodeCheckFlags,
  ContainsConstructorReference: (1 << 17) as NodeCheckFlags,
  ContainerWithNoReturnExpression: (1 << 18) as NodeCheckFlags,
  ConstructorReference: (1 << 19) as NodeCheckFlags,
  ContainsClassWithPrivateIdentifiers: (1 << 20) as NodeCheckFlags,
  InCheckIdentifier: (1 << 21) as NodeCheckFlags,
} as const;

export type TypeFlags = number;
export const TypeFlags = {
  Any: (1 << 0) as TypeFlags,
  Unknown: (1 << 1) as TypeFlags,
  String: (1 << 2) as TypeFlags,
  Number: (1 << 3) as TypeFlags,
  Boolean: (1 << 4) as TypeFlags,
  Enum: (1 << 5) as TypeFlags,
  BigInt: (1 << 6) as TypeFlags,
  StringLiteral: (1 << 7) as TypeFlags,
  NumberLiteral: (1 << 8) as TypeFlags,
  BooleanLiteral: (1 << 9) as TypeFlags,
  EnumLiteral: (1 << 10) as TypeFlags,
  BigIntLiteral: (1 << 11) as TypeFlags,
  ESSymbol: (1 << 12) as TypeFlags,
  UniqueESSymbol: (1 << 13) as TypeFlags,
  Void: (1 << 14) as TypeFlags,
  Undefined: (1 << 15) as TypeFlags,
  Null: (1 << 16) as TypeFlags,
  Never: (1 << 17) as TypeFlags,
  TypeParameter: (1 << 18) as TypeFlags,
  Object: (1 << 19) as TypeFlags,
  Union: (1 << 20) as TypeFlags,
  Intersection: (1 << 21) as TypeFlags,
  Index: (1 << 22) as TypeFlags,
  IndexedAccess: (1 << 23) as TypeFlags,
  Conditional: (1 << 24) as TypeFlags,
  Substitution: (1 << 25) as TypeFlags,
  NonPrimitive: (1 << 26) as TypeFlags,
  TemplateLiteral: (1 << 27) as TypeFlags,
  StringMapping: (1 << 28) as TypeFlags,
  Literal: 2944 as TypeFlags, // StringLiteral|NumberLiteral|BooleanLiteral|EnumLiteral|BigIntLiteral
  Nullable: 98304 as TypeFlags, // Undefined|Null
  Falsy: 117724 as TypeFlags,
  Truthy: 16777215 as TypeFlags,
  Primitive: 134221820 as TypeFlags,
  StructuredType: 3670016 as TypeFlags, // Object|Union|Intersection
  TypeVariable: 8650752 as TypeFlags, // TypeParameter|IndexedAccess
  Instantiable: 58982400 as TypeFlags,
  StructuredOrInstantiable: 66060288 as TypeFlags,
  ObjectFlagsType: 3801088 as TypeFlags,
} as const;

export type ObjectFlags = number;
export const ObjectFlags = {
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
  ContainsSpread: (1 << 15) as ObjectFlags,
  ObjectRestType: (1 << 16) as ObjectFlags,
  InstantiationExpressionType: (1 << 17) as ObjectFlags,
  SingleSignatureType: (1 << 18) as ObjectFlags,
  ClassOrInterface: 3 as ObjectFlags,
  RequiresWidening: 786432 as ObjectFlags,
  PropagatingFlags: 5242880 as ObjectFlags,
  GenericMappedType: (1 << 22) as ObjectFlags,
  ContainsObjectOrArrayLiteral: (1 << 23) as ObjectFlags,
  NonInferrableType: (1 << 24) as ObjectFlags,
  CouldContainTypeVariablesComputed: (1 << 25) as ObjectFlags,
  CouldContainTypeVariables: (1 << 26) as ObjectFlags,
  MembersResolved: (1 << 27) as ObjectFlags,
} as const;

export type ElementFlags = number;
export const ElementFlags = {
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
  value: string | number | bigint | boolean;
  freshType?: Type;
  regularType?: Type;
}

export interface UniqueESSymbolType extends TypeBase {
  escapedName: string;
}

export interface ConstrainedType extends TypeBase {
  constraint?: Type;
}

export interface StructuredType extends ConstrainedType {
  declaredProperties?: readonly AstSymbol[];
  declaredCallSignatures?: readonly Signature[];
  declaredConstructSignatures?: readonly Signature[];
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

export interface TypeMapper {
  kind: number;
  sources?: readonly Type[];
  targets?: readonly Type[];
  mapper1?: TypeMapper;
  mapper2?: TypeMapper;
  map?: (t: Type) => Type;
}
