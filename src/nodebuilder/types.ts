/**
 * Node builder types: interfaces and flags used by the type → AST node
 * conversion during emit and declaration generation.
 *
 * Port of TS-Go internal/nodebuilder/types.go.
 *
 * The concrete implementations live on the checker (since they need
 * type-system access); this module is consumed by the emit resolver.
 *
 * AST `Symbol` and `Node` types are referenced via `unknown` here pending
 * AST adoption; they'll be narrowed when the active AST is wired.
 */

/**
 * Callbacks that the node builder invokes to track symbol references and
 * report errors. Implementations are usually backed by the checker.
 */
export interface SymbolTracker {
  trackSymbol(symbol: unknown, enclosingDeclaration: unknown, meaning: number): boolean;
  reportInaccessibleThisError(): void;
  reportPrivateInBaseOfClassExpression(propertyName: string): void;
  reportInaccessibleUniqueSymbolError(): void;
  reportCyclicStructureError(): void;
  reportLikelyUnsafeImportRequiredError(specifier: string, symbolName: string): void;
  reportTruncationError(): void;
  reportNonlocalAugmentation(containingFile: unknown, parentSymbol: unknown, augmentingSymbol: unknown): void;
  reportNonSerializableProperty(propertyName: string): void;
  reportInferenceFallback(node: unknown): void;
  pushErrorFallbackNode(node: unknown): void;
  popErrorFallbackNode(): void;
}

/**
 * Flags controlling how the node builder formats types.
 * NOTE: must be kept in sync with TypeFormatFlags.
 */
export enum NodeBuilderFlags {
  None = 0,
  // Options
  NoTruncation = 1 << 0,
  WriteArrayAsGenericType = 1 << 1,
  GenerateNamesForShadowedTypeParams = 1 << 2,
  UseStructuralFallback = 1 << 3,
  ForbidIndexedAccessSymbolReferences = 1 << 4,
  WriteTypeArgumentsOfSignature = 1 << 5,
  UseFullyQualifiedType = 1 << 6,
  UseOnlyExternalAliasing = 1 << 7,
  SuppressAnyReturnType = 1 << 8,
  WriteTypeParametersInQualifiedName = 1 << 9,
  MultilineObjectLiterals = 1 << 10,
  WriteClassExpressionAsTypeLiteral = 1 << 11,
  UseTypeOfFunction = 1 << 12,
  OmitParameterModifiers = 1 << 13,
  UseAliasDefinedOutsideCurrentScope = 1 << 14,
  UseSingleQuotesForStringLiteralType = 1 << 28,
  NoTypeReduction = 1 << 29,
  UseInstantiationExpressions = 1 << 30,
  OmitThisParameter = 1 << 25,
  WriteCallStyleSignature = 1 << 27,
  // Error handling
  AllowThisInObjectLiteral = 1 << 15,
  AllowQualifiedNameInPlaceOfIdentifier = 1 << 16,
  AllowAnonymousIdentifier = 1 << 17,
  AllowEmptyUnionOrIntersection = 1 << 18,
  AllowEmptyTuple = 1 << 19,
  AllowUniqueESSymbolType = 1 << 20,
  AllowEmptyIndexInfoType = 1 << 21,
  // Errors (cont.)
  AllowNodeModulesRelativePaths = 1 << 26,
  IgnoreErrors = AllowThisInObjectLiteral
    | AllowQualifiedNameInPlaceOfIdentifier
    | AllowAnonymousIdentifier
    | AllowEmptyUnionOrIntersection
    | AllowEmptyTuple
    | AllowEmptyIndexInfoType
    | AllowNodeModulesRelativePaths,
  // State
  InObjectTypeLiteral = 1 << 22,
  InTypeAlias = 1 << 23,
  InInitialEntityName = 1 << 24,
}

/** Internal flags not exposed in the public NodeBuilderFlags. */
export enum InternalNodeBuilderFlags {
  None = 0,
  WriteComputedProps = 1 << 0,
  NoSyntacticPrinter = 1 << 1,
  DoNotIncludeSymbolChain = 1 << 2,
  AllowUnresolvedNames = 1 << 3,
}
