import type { bool, byte, int, sbyte, uint } from "../../go/scalars.js";
import type { GoArray, GoInterfaceValue, GoMap, GoPtr, GoSlice } from "../../go/compat.js";
import { GoNilSlice, GoSliceIsNil } from "../../go/compat.js";
import { Clip } from "../../go/slices.js";
import type { Node } from "../ast/spine.js";
import type { EntityName } from "../ast/generated/unions.js";
import type { ConditionalTypeNode, MappedTypeNode } from "../ast/generated/data.js";
import type { SymbolFlags } from "../ast/generated/flags.js";
import type { NodeId } from "../ast/ids.js";
import type { Symbol as Symbol_62f2f8bf, SymbolTable } from "../ast/symbol.js";
import type { OrderedSet } from "../collections/ordered_set.js";
import type { ScriptTarget } from "../core/compileroptions.js";
import {
  ScriptTargetES2016,
  ScriptTargetES2017,
  ScriptTargetES2018,
  ScriptTargetES2019,
  ScriptTargetES2020,
  ScriptTargetES2021,
  ScriptTargetES2022,
  ScriptTargetESNext,
} from "../core/compileroptions.js";
import type { Tristate } from "../core/tristate.js";
import type { Result } from "../evaluator/evaluator.js";
import type { CacheHashKey, Checker } from "./checker/state.js";
import { isTupleType } from "./checker/state.js";
import type { TypeMapper } from "./mapper.js";
import { ValueToString } from "./utilities.js";

import type { GoFunc, GoInterface, GoRef } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ParseFlags","kind":"type","status":"implemented","sigHash":"ec2c138c6126fd16db739ef0b467090e9d970a145b42a30cb3dfebf6b442776b"}
 *
 * Go source:
 * ParseFlags uint32
 */
export type ParseFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::ParseFlagsNone+ParseFlagsYield+ParseFlagsAwait+ParseFlagsType+ParseFlagsIgnoreMissingOpenBrace+ParseFlagsJSDoc","kind":"constGroup","status":"implemented","sigHash":"45771fba15d6b3d1189c5ed5b2cbf2b5e091c72f7397839c4b7819ac00c3a755"}
 *
 * Go source:
 * const (
 * 	ParseFlagsNone                   ParseFlags = 0
 * 	ParseFlagsYield                  ParseFlags = 1 << 0
 * 	ParseFlagsAwait                  ParseFlags = 1 << 1
 * 	ParseFlagsType                   ParseFlags = 1 << 2
 * 	ParseFlagsIgnoreMissingOpenBrace ParseFlags = 1 << 4
 * 	ParseFlagsJSDoc                  ParseFlags = 1 << 5
 * )
 */
export const ParseFlagsNone: ParseFlags = 0;
export const ParseFlagsYield: ParseFlags = 1 << 0;
export const ParseFlagsAwait: ParseFlags = 1 << 1;
export const ParseFlagsType: ParseFlags = 1 << 2;
export const ParseFlagsIgnoreMissingOpenBrace: ParseFlags = 1 << 4;
export const ParseFlagsJSDoc: ParseFlags = 1 << 5;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SignatureKind","kind":"type","status":"implemented","sigHash":"58ced086295abddef1ae9fb80a027ba24372badaa9b7c3f85b833b22683ffc5c"}
 *
 * Go source:
 * SignatureKind int32
 */
export type SignatureKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::SignatureKindCall+SignatureKindConstruct","kind":"constGroup","status":"implemented","sigHash":"05f9d66ebc7ffc8cdd8e2772bfed93fade3ef5dfec17505ef1ddf2deb7e211a0"}
 *
 * Go source:
 * const (
 * 	SignatureKindCall SignatureKind = iota
 * 	SignatureKindConstruct
 * )
 */
export const SignatureKindCall: SignatureKind = 0;
export const SignatureKindConstruct: SignatureKind = 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ContextFlags","kind":"type","status":"implemented","sigHash":"da9d50fa9efba7f8a4aaad30fecbcacd03477b39a9761ea659ea4d3a6b458a69"}
 *
 * Go source:
 * ContextFlags uint32
 */
export type ContextFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::ContextFlagsNone+ContextFlagsSignature+ContextFlagsNoConstraints+ContextFlagsIgnoreNodeInferences+ContextFlagsSkipBindingPatterns","kind":"constGroup","status":"implemented","sigHash":"fa0993d79475d307b59486f24191ecf2e24d169bc48bcbd6fbc3b82676ac1072"}
 *
 * Go source:
 * const (
 * 	ContextFlagsNone                 ContextFlags = 0
 * 	ContextFlagsSignature            ContextFlags = 1 << 0 // Obtaining contextual signature
 * 	ContextFlagsNoConstraints        ContextFlags = 1 << 1 // Don't obtain type variable constraints
 * 	ContextFlagsIgnoreNodeInferences ContextFlags = 1 << 2 // Ignore inference to current node and parent nodes out to the containing call for, for example, completions
 * 	ContextFlagsSkipBindingPatterns  ContextFlags = 1 << 3 // Ignore contextual types applied by binding patterns
 * )
 */
export const ContextFlagsNone: ContextFlags = 0;
export const ContextFlagsSignature: ContextFlags = 1 << 0;
export const ContextFlagsNoConstraints: ContextFlags = 1 << 1;
export const ContextFlagsIgnoreNodeInferences: ContextFlags = 1 << 2;
export const ContextFlagsSkipBindingPatterns: ContextFlags = 1 << 3;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeFormatFlags","kind":"type","status":"implemented","sigHash":"499d6addc486b23ceebf24a36101f8e4959ec553d00a9fc6094bef75c3cebb52"}
 *
 * Go source:
 * TypeFormatFlags uint32
 */
export type TypeFormatFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::TypeFormatFlagsNone+TypeFormatFlagsNoTruncation+TypeFormatFlagsWriteArrayAsGenericType+TypeFormatFlagsGenerateNamesForShadowedTypeParams+TypeFormatFlagsUseStructuralFallback+TypeFormatFlagsWriteTypeArgumentsOfSignature+TypeFormatFlagsUseFullyQualifiedType+TypeFormatFlagsSuppressAnyReturnType+TypeFormatFlagsMultilineObjectLiterals+TypeFormatFlagsWriteClassExpressionAsTypeLiteral+TypeFormatFlagsUseTypeOfFunction+TypeFormatFlagsOmitParameterModifiers+TypeFormatFlagsUseAliasDefinedOutsideCurrentScope+TypeFormatFlagsUseSingleQuotesForStringLiteralType+TypeFormatFlagsNoTypeReduction+TypeFormatFlagsUseInstantiationExpressions+TypeFormatFlagsOmitThisParameter+TypeFormatFlagsWriteCallStyleSignature+TypeFormatFlagsAllowUniqueESSymbolType+TypeFormatFlagsAddUndefined+TypeFormatFlagsWriteArrowStyleSignature+TypeFormatFlagsInArrayType+TypeFormatFlagsInElementType+TypeFormatFlagsInFirstTypeArgument+TypeFormatFlagsInTypeAlias","kind":"constGroup","status":"implemented","sigHash":"25e3f249d077c3170ad1368bb906f8513c318eb19d7e68aebd3e013f1f73cfa9"}
 *
 * Go source:
 * const (
 * 	TypeFormatFlagsNone                               TypeFormatFlags = 0
 * 	TypeFormatFlagsNoTruncation                       TypeFormatFlags = 1 << 0 // Don't truncate typeToString result
 * 	TypeFormatFlagsWriteArrayAsGenericType            TypeFormatFlags = 1 << 1 // Write Array<T> instead T[]
 * 	TypeFormatFlagsGenerateNamesForShadowedTypeParams TypeFormatFlags = 1 << 2 // When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
 * 	TypeFormatFlagsUseStructuralFallback              TypeFormatFlags = 1 << 3 // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
 * 	// hole because there's a hole in node builder flags
 * 	TypeFormatFlagsWriteTypeArgumentsOfSignature TypeFormatFlags = 1 << 5 // Write the type arguments instead of type parameters of the signature
 * 	TypeFormatFlagsUseFullyQualifiedType         TypeFormatFlags = 1 << 6 // Write out the fully qualified type name (eg. Module.Type, instead of Type)
 * 	// hole because `UseOnlyExternalAliasing` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` instead
 * 	TypeFormatFlagsSuppressAnyReturnType TypeFormatFlags = 1 << 8 // If the return type is any-like, don't offer a return type.
 * 	// hole because `WriteTypeParametersInQualifiedName` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` for this instead
 * 	TypeFormatFlagsMultilineObjectLiterals             TypeFormatFlags = 1 << 10 // Always print object literals across multiple lines (only used to map into node builder flags)
 * 	TypeFormatFlagsWriteClassExpressionAsTypeLiteral   TypeFormatFlags = 1 << 11 // Write a type literal instead of (Anonymous class)
 * 	TypeFormatFlagsUseTypeOfFunction                   TypeFormatFlags = 1 << 12 // Write typeof instead of function type literal
 * 	TypeFormatFlagsOmitParameterModifiers              TypeFormatFlags = 1 << 13 // Omit modifiers on parameters
 * 	TypeFormatFlagsUseAliasDefinedOutsideCurrentScope  TypeFormatFlags = 1 << 14 // For a `type T = ... ` defined in a different file, write `T` instead of its value, even though `T` can't be accessed in the current scope.
 * 	TypeFormatFlagsUseSingleQuotesForStringLiteralType TypeFormatFlags = 1 << 28 // Use single quotes for string literal type
 * 	TypeFormatFlagsNoTypeReduction                     TypeFormatFlags = 1 << 29 // Don't call getReducedType
 * 	TypeFormatFlagsUseInstantiationExpressions         TypeFormatFlags = 1 << 30 // Use instantiation expressions for qualified instantiated names like Foo<string>.Bar
 * 	TypeFormatFlagsOmitThisParameter                   TypeFormatFlags = 1 << 25
 * 	TypeFormatFlagsWriteCallStyleSignature             TypeFormatFlags = 1 << 27 // Write construct signatures as call style signatures
 * 	// Error Handling
 * 	TypeFormatFlagsAllowUniqueESSymbolType TypeFormatFlags = 1 << 20 // This is bit 20 to align with the same bit in `NodeBuilderFlags`
 * 	// TypeFormatFlags exclusive
 * 	TypeFormatFlagsAddUndefined             TypeFormatFlags = 1 << 17 // Add undefined to types of initialized, non-optional parameters
 * 	TypeFormatFlagsWriteArrowStyleSignature TypeFormatFlags = 1 << 18 // Write arrow style signature
 * 	// State
 * 	TypeFormatFlagsInArrayType         TypeFormatFlags = 1 << 19 // Writing an array element type
 * 	TypeFormatFlagsInElementType       TypeFormatFlags = 1 << 21 // Writing an array or union element type
 * 	TypeFormatFlagsInFirstTypeArgument TypeFormatFlags = 1 << 22 // Writing first type argument of the instantiated type
 * 	TypeFormatFlagsInTypeAlias         TypeFormatFlags = 1 << 23 // Writing type in type alias declaration
 * )
 */
export const TypeFormatFlagsNone: TypeFormatFlags = 0;
export const TypeFormatFlagsNoTruncation: TypeFormatFlags = 1 << 0;
export const TypeFormatFlagsWriteArrayAsGenericType: TypeFormatFlags = 1 << 1;
export const TypeFormatFlagsGenerateNamesForShadowedTypeParams: TypeFormatFlags = 1 << 2;
export const TypeFormatFlagsUseStructuralFallback: TypeFormatFlags = 1 << 3;
export const TypeFormatFlagsWriteTypeArgumentsOfSignature: TypeFormatFlags = 1 << 5;
export const TypeFormatFlagsUseFullyQualifiedType: TypeFormatFlags = 1 << 6;
export const TypeFormatFlagsSuppressAnyReturnType: TypeFormatFlags = 1 << 8;
export const TypeFormatFlagsMultilineObjectLiterals: TypeFormatFlags = 1 << 10;
export const TypeFormatFlagsWriteClassExpressionAsTypeLiteral: TypeFormatFlags = 1 << 11;
export const TypeFormatFlagsUseTypeOfFunction: TypeFormatFlags = 1 << 12;
export const TypeFormatFlagsOmitParameterModifiers: TypeFormatFlags = 1 << 13;
export const TypeFormatFlagsUseAliasDefinedOutsideCurrentScope: TypeFormatFlags = 1 << 14;
export const TypeFormatFlagsUseSingleQuotesForStringLiteralType: TypeFormatFlags = 1 << 28;
export const TypeFormatFlagsNoTypeReduction: TypeFormatFlags = 1 << 29;
export const TypeFormatFlagsUseInstantiationExpressions: TypeFormatFlags = 1 << 30;
export const TypeFormatFlagsOmitThisParameter: TypeFormatFlags = 1 << 25;
export const TypeFormatFlagsWriteCallStyleSignature: TypeFormatFlags = 1 << 27;
export const TypeFormatFlagsAllowUniqueESSymbolType: TypeFormatFlags = 1 << 20;
export const TypeFormatFlagsAddUndefined: TypeFormatFlags = 1 << 17;
export const TypeFormatFlagsWriteArrowStyleSignature: TypeFormatFlags = 1 << 18;
export const TypeFormatFlagsInArrayType: TypeFormatFlags = 1 << 19;
export const TypeFormatFlagsInElementType: TypeFormatFlags = 1 << 21;
export const TypeFormatFlagsInFirstTypeArgument: TypeFormatFlags = 1 << 22;
export const TypeFormatFlagsInTypeAlias: TypeFormatFlags = 1 << 23;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::TypeFormatFlagsNodeBuilderFlagsMask","kind":"constGroup","status":"implemented","sigHash":"a7b1bafbae79b3a795c6e88cb4144e1ce9bf93c21bdf294f921e1c63f1634250"}
 *
 * Go source:
 * const TypeFormatFlagsNodeBuilderFlagsMask = TypeFormatFlagsNoTruncation | TypeFormatFlagsWriteArrayAsGenericType | TypeFormatFlagsGenerateNamesForShadowedTypeParams | TypeFormatFlagsUseStructuralFallback | TypeFormatFlagsWriteTypeArgumentsOfSignature |
 * 	TypeFormatFlagsUseFullyQualifiedType | TypeFormatFlagsSuppressAnyReturnType | TypeFormatFlagsMultilineObjectLiterals | TypeFormatFlagsWriteClassExpressionAsTypeLiteral |
 * 	TypeFormatFlagsUseTypeOfFunction | TypeFormatFlagsOmitParameterModifiers | TypeFormatFlagsUseAliasDefinedOutsideCurrentScope | TypeFormatFlagsAllowUniqueESSymbolType | TypeFormatFlagsInTypeAlias |
 * 	TypeFormatFlagsUseInstantiationExpressions |
 * 	TypeFormatFlagsUseSingleQuotesForStringLiteralType | TypeFormatFlagsNoTypeReduction | TypeFormatFlagsOmitThisParameter
 */
export const TypeFormatFlagsNodeBuilderFlagsMask: TypeFormatFlags =
  TypeFormatFlagsNoTruncation |
  TypeFormatFlagsWriteArrayAsGenericType |
  TypeFormatFlagsGenerateNamesForShadowedTypeParams |
  TypeFormatFlagsUseStructuralFallback |
  TypeFormatFlagsWriteTypeArgumentsOfSignature |
  TypeFormatFlagsUseFullyQualifiedType |
  TypeFormatFlagsSuppressAnyReturnType |
  TypeFormatFlagsMultilineObjectLiterals |
  TypeFormatFlagsWriteClassExpressionAsTypeLiteral |
  TypeFormatFlagsUseTypeOfFunction |
  TypeFormatFlagsOmitParameterModifiers |
  TypeFormatFlagsUseAliasDefinedOutsideCurrentScope |
  TypeFormatFlagsAllowUniqueESSymbolType |
  TypeFormatFlagsInTypeAlias |
  TypeFormatFlagsUseInstantiationExpressions |
  TypeFormatFlagsUseSingleQuotesForStringLiteralType |
  TypeFormatFlagsNoTypeReduction |
  TypeFormatFlagsOmitThisParameter;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SymbolFormatFlags","kind":"type","status":"implemented","sigHash":"635b36267f3172fac7baf6bbdf7c5e978554bc88cfd0a83960efb6f043e601e0"}
 *
 * Go source:
 * SymbolFormatFlags uint32
 */
export type SymbolFormatFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::SymbolFormatFlagsNone+SymbolFormatFlagsWriteTypeParametersOrArguments+SymbolFormatFlagsUseOnlyExternalAliasing+SymbolFormatFlagsAllowAnyNodeKind+SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope+SymbolFormatFlagsWriteComputedProps+SymbolFormatFlagsDoNotIncludeSymbolChain","kind":"constGroup","status":"implemented","sigHash":"fc079c714d8adfaca9d8a41b809dc540739ab2bfd4a15f7a2b80b11faf26d984"}
 *
 * Go source:
 * const (
 * 	SymbolFormatFlagsNone SymbolFormatFlags = 0
 * 	// Write symbols's type argument if it is instantiated symbol
 * 	// eg. class C<T> { p: T }   <-- Show p as C<T>.p here
 * 	//     var a: C<number>;
 * 	//     var p = a.p; <--- Here p is property of C<number> so show it as C<number>.p instead of just C.p
 * 	SymbolFormatFlagsWriteTypeParametersOrArguments SymbolFormatFlags = 1 << 0
 * 	// Use only external alias information to get the symbol name in the given context
 * 	// eg.  module m { export class c { } } import x = m.c;
 * 	// When this flag is specified m.c will be used to refer to the class instead of alias symbol x
 * 	SymbolFormatFlagsUseOnlyExternalAliasing SymbolFormatFlags = 1 << 1
 * 	// Build symbol name using any nodes needed, instead of just components of an entity name
 * 	SymbolFormatFlagsAllowAnyNodeKind SymbolFormatFlags = 1 << 2
 * 	// Prefer aliases which are not directly visible
 * 	SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope SymbolFormatFlags = 1 << 3
 * 	// { [E.A]: 1 }
 * 	/** @internal * /
 * 	SymbolFormatFlagsWriteComputedProps SymbolFormatFlags = 1 << 4
 * 	// Skip building an accessible symbol chain
 * 	/** @internal * /
 * 	SymbolFormatFlagsDoNotIncludeSymbolChain SymbolFormatFlags = 1 << 5
 * )
 */
export const SymbolFormatFlagsNone: SymbolFormatFlags = 0;
export const SymbolFormatFlagsWriteTypeParametersOrArguments: SymbolFormatFlags = 1 << 0;
export const SymbolFormatFlagsUseOnlyExternalAliasing: SymbolFormatFlags = 1 << 1;
export const SymbolFormatFlagsAllowAnyNodeKind: SymbolFormatFlags = 1 << 2;
export const SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope: SymbolFormatFlags = 1 << 3;
export const SymbolFormatFlagsWriteComputedProps: SymbolFormatFlags = 1 << 4;
export const SymbolFormatFlagsDoNotIncludeSymbolChain: SymbolFormatFlags = 1 << 5;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ExternalEmitHelpers","kind":"type","status":"implemented","sigHash":"3352877ba50e78da3d29f2e1a274d5d401397e7b3546c07438be80820285cccd"}
 *
 * Go source:
 * ExternalEmitHelpers uint32
 */
export type ExternalEmitHelpers = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::ExternalEmitHelpersRest+ExternalEmitHelpersDecorate+ExternalEmitHelpersMetadata+ExternalEmitHelpersParam+ExternalEmitHelpersAwaiter+ExternalEmitHelpersAwait+ExternalEmitHelpersAsyncGenerator+ExternalEmitHelpersAsyncDelegator+ExternalEmitHelpersAsyncValues+ExternalEmitHelpersExportStar+ExternalEmitHelpersImportStar+ExternalEmitHelpersImportDefault+ExternalEmitHelpersMakeTemplateObject+ExternalEmitHelpersClassPrivateFieldGet+ExternalEmitHelpersClassPrivateFieldSet+ExternalEmitHelpersClassPrivateFieldIn+ExternalEmitHelpersSetFunctionName+ExternalEmitHelpersPropKey+ExternalEmitHelpersAddDisposableResourceAndDisposeResources+ExternalEmitHelpersRewriteRelativeImportExtension+ExternalEmitHelpersESDecorateAndRunInitializers+ExternalEmitHelpersFirstEmitHelper+ExternalEmitHelpersLastEmitHelper+ExternalEmitHelpersForAwaitOfIncludes+ExternalEmitHelpersAsyncGeneratorIncludes+ExternalEmitHelpersAsyncDelegatorIncludes","kind":"constGroup","status":"implemented","sigHash":"14d891271cc1e1248b6bf08be5c7b2e05232884040f15bdf071456f3f3f21b31"}
 *
 * Go source:
 * const (
 * 	ExternalEmitHelpersRest                                     ExternalEmitHelpers           = 1 << iota // __rest (used by ESNext object rest transformation)
 * 	ExternalEmitHelpersDecorate                                                                           // __decorate (used by TypeScript decorators transformation)
 * 	ExternalEmitHelpersMetadata                                                                           // __metadata (used by TypeScript decorators transformation)
 * 	ExternalEmitHelpersParam                                                                              // __param (used by TypeScript decorators transformation)
 * 	ExternalEmitHelpersAwaiter                                                                            // __awaiter (used by ES2017 async functions transformation)
 * 	ExternalEmitHelpersAwait                                                                              // __await (used by ES2017 async generator transformation)
 * 	ExternalEmitHelpersAsyncGenerator                                                                     // __asyncGenerator (used by ES2017 async generator transformation)
 * 	ExternalEmitHelpersAsyncDelegator                                                                     // __asyncDelegator (used by ES2017 async generator yield* transformation)
 * 	ExternalEmitHelpersAsyncValues                                                                        // __asyncValues (used by ES2017 for..await..of transformation)
 * 	ExternalEmitHelpersExportStar                                                                         // __exportStar (used by CommonJS/AMD/UMD module transformation)
 * 	ExternalEmitHelpersImportStar                                                                         // __importStar (used by CommonJS/AMD/UMD module transformation)
 * 	ExternalEmitHelpersImportDefault                                                                      // __importDefault (used by CommonJS/AMD/UMD module transformation)
 * 	ExternalEmitHelpersMakeTemplateObject                                                                 // __makeTemplateObject (used for constructing template string array objects)
 * 	ExternalEmitHelpersClassPrivateFieldGet                                                               // __classPrivateFieldGet (used by the class private field transformation)
 * 	ExternalEmitHelpersClassPrivateFieldSet                                                               // __classPrivateFieldSet (used by the class private field transformation)
 * 	ExternalEmitHelpersClassPrivateFieldIn                                                                // __classPrivateFieldIn (used by the class private field transformation)
 * 	ExternalEmitHelpersSetFunctionName                                                                    // __setFunctionName (used by class fields and ECMAScript decorators)
 * 	ExternalEmitHelpersPropKey                                                                            // __propKey (used by class fields and ECMAScript decorators)
 * 	ExternalEmitHelpersAddDisposableResourceAndDisposeResources                                           // __addDisposableResource and __disposeResources (used by ESNext transformations)
 * 	ExternalEmitHelpersRewriteRelativeImportExtension                                                     // __rewriteRelativeImportExtension (used by --rewriteRelativeImportExtensions)
 * 	ExternalEmitHelpersESDecorateAndRunInitializers             = ExternalEmitHelpersDecorate             // __esDecorate and __runInitializers (used by ECMAScript decorators transformation)
 *
 * 	ExternalEmitHelpersFirstEmitHelper = ExternalEmitHelpersRest
 * 	ExternalEmitHelpersLastEmitHelper  = ExternalEmitHelpersRewriteRelativeImportExtension
 *
 * 	// Helpers included by ES2017 for..await..of
 * 	ExternalEmitHelpersForAwaitOfIncludes = ExternalEmitHelpersAsyncValues
 *
 * 	// Helpers included by ES2017 async generators
 * 	ExternalEmitHelpersAsyncGeneratorIncludes = ExternalEmitHelpersAwait | ExternalEmitHelpersAsyncGenerator
 *
 * 	// Helpers included by yield* in ES2017 async generators
 * 	ExternalEmitHelpersAsyncDelegatorIncludes = ExternalEmitHelpersAwait | ExternalEmitHelpersAsyncDelegator | ExternalEmitHelpersAsyncValues
 * )
 */
export const ExternalEmitHelpersRest: ExternalEmitHelpers = 1 << 0; // __rest (used by ESNext object rest transformation)
export const ExternalEmitHelpersDecorate: ExternalEmitHelpers = 1 << 1; // __decorate (used by TypeScript decorators transformation)
export const ExternalEmitHelpersMetadata: ExternalEmitHelpers = 1 << 2; // __metadata (used by TypeScript decorators transformation)
export const ExternalEmitHelpersParam: ExternalEmitHelpers = 1 << 3; // __param (used by TypeScript decorators transformation)
export const ExternalEmitHelpersAwaiter: ExternalEmitHelpers = 1 << 4; // __awaiter (used by ES2017 async functions transformation)
export const ExternalEmitHelpersAwait: ExternalEmitHelpers = 1 << 5; // __await (used by ES2017 async generator transformation)
export const ExternalEmitHelpersAsyncGenerator: ExternalEmitHelpers = 1 << 6; // __asyncGenerator (used by ES2017 async generator transformation)
export const ExternalEmitHelpersAsyncDelegator: ExternalEmitHelpers = 1 << 7; // __asyncDelegator (used by ES2017 async generator yield* transformation)
export const ExternalEmitHelpersAsyncValues: ExternalEmitHelpers = 1 << 8; // __asyncValues (used by ES2017 for..await..of transformation)
export const ExternalEmitHelpersExportStar: ExternalEmitHelpers = 1 << 9; // __exportStar (used by CommonJS/AMD/UMD module transformation)
export const ExternalEmitHelpersImportStar: ExternalEmitHelpers = 1 << 10; // __importStar (used by CommonJS/AMD/UMD module transformation)
export const ExternalEmitHelpersImportDefault: ExternalEmitHelpers = 1 << 11; // __importDefault (used by CommonJS/AMD/UMD module transformation)
export const ExternalEmitHelpersMakeTemplateObject: ExternalEmitHelpers = 1 << 12; // __makeTemplateObject (used for constructing template string array objects)
export const ExternalEmitHelpersClassPrivateFieldGet: ExternalEmitHelpers = 1 << 13; // __classPrivateFieldGet (used by the class private field transformation)
export const ExternalEmitHelpersClassPrivateFieldSet: ExternalEmitHelpers = 1 << 14; // __classPrivateFieldSet (used by the class private field transformation)
export const ExternalEmitHelpersClassPrivateFieldIn: ExternalEmitHelpers = 1 << 15; // __classPrivateFieldIn (used by the class private field transformation)
export const ExternalEmitHelpersSetFunctionName: ExternalEmitHelpers = 1 << 16; // __setFunctionName (used by class fields and ECMAScript decorators)
export const ExternalEmitHelpersPropKey: ExternalEmitHelpers = 1 << 17; // __propKey (used by class fields and ECMAScript decorators)
export const ExternalEmitHelpersAddDisposableResourceAndDisposeResources: ExternalEmitHelpers = 1 << 18; // __addDisposableResource and __disposeResources (used by ESNext transformations)
export const ExternalEmitHelpersRewriteRelativeImportExtension: ExternalEmitHelpers = 1 << 19; // __rewriteRelativeImportExtension (used by --rewriteRelativeImportExtensions)
export const ExternalEmitHelpersESDecorateAndRunInitializers: ExternalEmitHelpers = ExternalEmitHelpersDecorate; // __esDecorate and __runInitializers (used by ECMAScript decorators transformation)
export const ExternalEmitHelpersFirstEmitHelper: ExternalEmitHelpers = ExternalEmitHelpersRest;
export const ExternalEmitHelpersLastEmitHelper: ExternalEmitHelpers = ExternalEmitHelpersRewriteRelativeImportExtension;
// Helpers included by ES2017 for..await..of
export const ExternalEmitHelpersForAwaitOfIncludes: ExternalEmitHelpers = ExternalEmitHelpersAsyncValues;
// Helpers included by ES2017 async generators
export const ExternalEmitHelpersAsyncGeneratorIncludes: ExternalEmitHelpers = (ExternalEmitHelpersAwait | ExternalEmitHelpersAsyncGenerator) >>> 0;
// Helpers included by yield* in ES2017 async generators
export const ExternalEmitHelpersAsyncDelegatorIncludes: ExternalEmitHelpers =
  (ExternalEmitHelpersAwait | ExternalEmitHelpersAsyncDelegator | ExternalEmitHelpersAsyncValues) >>> 0;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::externalHelpersModuleNameText","kind":"constGroup","status":"implemented","sigHash":"952360427c8066aa37cd9c63a924f7eba58391d84879c41208b7afb5805fafbc"}
 *
 * Go source:
 * const externalHelpersModuleNameText = "tslib"
 */
export const externalHelpersModuleNameText: string = "tslib";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeId","kind":"type","status":"implemented","sigHash":"c917c67ee6facc506c65f8fca44f5f54a27d38c4388b43560967f8add59893e5"}
 *
 * Go source:
 * TypeId uint32
 */
export type TypeId = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SymbolReferenceLinks","kind":"type","status":"implemented","sigHash":"a156dfe36bcd481696448cce7ed4c06e5060977b462d5a31065b97ba9132360b"}
 *
 * Go source:
 * SymbolReferenceLinks struct {
 * 	referenceKinds ast.SymbolFlags // Flags for the meanings of the symbol that were referenced
 * }
 */
export interface SymbolReferenceLinks {
  referenceKinds: SymbolFlags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ValueSymbolLinks","kind":"type","status":"implemented","sigHash":"c1e008f073633224e8803434695fbe95426f80934a2995ce508c0e08fa80ae6c"}
 *
 * Go source:
 * ValueSymbolLinks struct {
 * 	resolvedType                 *Type // Type of value symbol
 * 	writeType                    *Type
 * 	target                       *ast.Symbol
 * 	mapper                       *TypeMapper
 * 	nameType                     *Type
 * 	containingType               *Type // Mapped type for mapped type property, containing union or intersection type for synthetic property
 * 	functionOrConstructorChecked bool
 * }
 */
export interface ValueSymbolLinks {
  resolvedType: GoPtr<Type>;
  writeType: GoPtr<Type>;
  target: GoPtr<Symbol_62f2f8bf>;
  mapper: GoPtr<TypeMapper>;
  nameType: GoPtr<Type>;
  containingType: GoPtr<Type>;
  functionOrConstructorChecked: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::MappedSymbolLinks","kind":"type","status":"implemented","sigHash":"2bcf23d3cee20b22772e16832ca575ae43f28bdf22ba8caa24ed04aea4d3b4e5"}
 *
 * Go source:
 * MappedSymbolLinks struct {
 * 	keyType         *Type       // Key type for mapped type member
 * 	syntheticOrigin *ast.Symbol // For a property on a mapped or spread type, points back to the original property
 * }
 */
export interface MappedSymbolLinks {
  keyType: GoPtr<Type>;
  syntheticOrigin: GoPtr<Symbol_62f2f8bf>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::DeferredSymbolLinks","kind":"type","status":"implemented","sigHash":"ee6aea7ec756ba9c29b65cbdc24f650cd67e7c6b0527b60753310ab4b6dc625c"}
 *
 * Go source:
 * DeferredSymbolLinks struct {
 * 	parent            *Type   // Source union/intersection of a deferred type
 * 	constituents      []*Type // Calculated list of constituents for a deferred type
 * 	writeConstituents []*Type // Constituents of a deferred `writeType`
 * }
 */
export interface DeferredSymbolLinks {
  parent: GoPtr<Type>;
  constituents: GoSlice<GoPtr<Type>>;
  writeConstituents: GoSlice<GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::AliasSymbolLinks","kind":"type","status":"implemented","sigHash":"ecf060f81daa5fe021054ef580bc5d331a54cf981bcb4019251feb63a694ffe7"}
 *
 * Go source:
 * AliasSymbolLinks struct {
 * 	immediateTarget     *ast.Symbol // Immediate target of an alias. May be another alias. Do not access directly, use `checker.getImmediateAliasedSymbol` instead.
 * 	aliasTarget         *ast.Symbol // Resolved (non-alias) target of an alias
 * 	referenced          bool        // True if alias symbol has been referenced as a value that can be emitted
 * 	typeOnlyDeclaration *ast.Node   // First resolved alias declaration that makes the symbol only usable in type constructs
 * }
 */
export interface AliasSymbolLinks {
  immediateTarget: GoPtr<Symbol_62f2f8bf>;
  aliasTarget: GoPtr<Symbol_62f2f8bf>;
  referenced: bool;
  typeOnlyDeclaration: GoPtr<Node>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ModuleSymbolLinks","kind":"type","status":"implemented","sigHash":"24ef49f64325b90a24df286759fe10610c43df4ef306c32a38cd195ac5346975"}
 *
 * Go source:
 * ModuleSymbolLinks struct {
 * 	resolvedExports       ast.SymbolTable      // Resolved exports of module or combined early- and late-bound static members of a class.
 * 	typeOnlyExportStarMap map[string]*ast.Node // Set on a module symbol when some of its exports were resolved through a 'export type * from "mod"' declaration
 * 	exportsChecked        bool
 * }
 */
export interface ModuleSymbolLinks {
  resolvedExports: SymbolTable;
  typeOnlyExportStarMap: GoMap<string, GoPtr<Node>>;
  exportsChecked: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ReverseMappedSymbolLinks","kind":"type","status":"implemented","sigHash":"ab568e350633b2290810518774114133aa37d500dcf945431f548f52ed02e229"}
 *
 * Go source:
 * ReverseMappedSymbolLinks struct {
 * 	propertyType   *Type
 * 	mappedType     *Type // References a mapped type
 * 	constraintType *Type // References an index type
 * }
 */
export interface ReverseMappedSymbolLinks {
  propertyType: GoPtr<Type>;
  mappedType: GoPtr<Type>;
  constraintType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::LateBoundLinks","kind":"type","status":"implemented","sigHash":"f8154a54a78a340e92e023e660fc7c6b41352e3ed3525a2df642ba749171cc33"}
 *
 * Go source:
 * LateBoundLinks struct {
 * 	lateSymbol *ast.Symbol
 * }
 */
export interface LateBoundLinks {
  lateSymbol: GoPtr<Symbol_62f2f8bf>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ExportTypeLinks","kind":"type","status":"implemented","sigHash":"598a7b0a395c72ea0a332c0d2abb95fb823ecda0a5fa8bdd5e1b0be9003d09e2"}
 *
 * Go source:
 * ExportTypeLinks struct {
 * 	target            *ast.Symbol // Target symbol
 * 	originatingImport *ast.Node   // Import declaration which produced the symbol, present if the symbol is marked as uncallable but had call signatures in `resolveESModuleSymbol`
 * }
 */
export interface ExportTypeLinks {
  target: GoPtr<Symbol_62f2f8bf>;
  originatingImport: GoPtr<Node>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeAliasLinks","kind":"type","status":"implemented","sigHash":"148bf920dfa7132273acf52ea1ce4ba05b784b8a15642ac3e9e9dcba346722d7"}
 *
 * Go source:
 * TypeAliasLinks struct {
 * 	declaredType                  *Type
 * 	typeParameters                []*Type                // Type parameters of type alias (undefined if non-generic)
 * 	instantiations                map[CacheHashKey]*Type // Instantiations of generic type alias (undefined if non-generic)
 * 	isConstructorDeclaredProperty bool
 * }
 */
export interface TypeAliasLinks {
  declaredType: GoPtr<Type>;
  typeParameters: GoSlice<GoPtr<Type>>;
  instantiations: GoMap<CacheHashKey, GoPtr<Type>>;
  isConstructorDeclaredProperty: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::DeclaredTypeLinks","kind":"type","status":"implemented","sigHash":"cb71d636ce4b9cf3a9669c3153a72a5703766f08d4f3cd4845427143982f5a97"}
 *
 * Go source:
 * DeclaredTypeLinks struct {
 * 	declaredType           *Type
 * 	interfaceChecked       bool
 * 	indexSignaturesChecked bool
 * 	typeParametersChecked  bool
 * 	enumChecked            bool
 * }
 */
export interface DeclaredTypeLinks {
  declaredType: GoPtr<Type>;
  interfaceChecked: bool;
  indexSignaturesChecked: bool;
  typeParametersChecked: bool;
  enumChecked: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ExhaustiveState","kind":"type","status":"implemented","sigHash":"2ed24226352508f5ed6f209cf360a90e818f712e08815dca1bde618dec385aba"}
 *
 * Go source:
 * ExhaustiveState byte
 */
export type ExhaustiveState = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::ExhaustiveStateUnknown+ExhaustiveStateComputing+ExhaustiveStateFalse+ExhaustiveStateTrue","kind":"constGroup","status":"implemented","sigHash":"46bfcc149be50c42543698d45b956627c0330d8654095bcd2aafc9079f3b4387"}
 *
 * Go source:
 * const (
 * 	ExhaustiveStateUnknown   ExhaustiveState = iota // Exhaustive state not computed
 * 	ExhaustiveStateComputing                        // Exhaustive state computation in progress
 * 	ExhaustiveStateFalse                            // Switch statement is not exhaustive
 * 	ExhaustiveStateTrue                             // Switch statement is exhaustive
 * )
 */
export const ExhaustiveStateUnknown: ExhaustiveState = 0;
export const ExhaustiveStateComputing: ExhaustiveState = 1;
export const ExhaustiveStateFalse: ExhaustiveState = 2;
export const ExhaustiveStateTrue: ExhaustiveState = 3;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SwitchStatementLinks","kind":"type","status":"implemented","sigHash":"1ddb1f4f2baab1210d28ba540bbf605ebac6b5b066968f28181a9cce74b86657"}
 *
 * Go source:
 * SwitchStatementLinks struct {
 * 	exhaustiveState     ExhaustiveState // Switch statement exhaustiveness
 * 	switchTypesComputed bool
 * 	witnessesComputed   bool
 * 	switchTypes         []*Type
 * 	witnesses           []string
 * }
 */
export interface SwitchStatementLinks {
  exhaustiveState: ExhaustiveState;
  switchTypesComputed: bool;
  witnessesComputed: bool;
  switchTypes: GoSlice<GoPtr<Type>>;
  witnesses: GoSlice<string>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ArrayLiteralLinks","kind":"type","status":"implemented","sigHash":"b0cf1fcbfaf6477acae6d09b3348e42c7ec277892afd88de8c9aeb2bf2ff9b3d"}
 *
 * Go source:
 * ArrayLiteralLinks struct {
 * 	indicesComputed  bool
 * 	firstSpreadIndex int // Index of first spread expression (or -1 if none)
 * 	lastSpreadIndex  int // Index of last spread expression (or -1 if none)
 * }
 */
export interface ArrayLiteralLinks {
  indicesComputed: bool;
  firstSpreadIndex: int;
  lastSpreadIndex: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::MembersOrExportsResolutionKind","kind":"type","status":"implemented","sigHash":"c502aeb871c63e882ebaa3ab7e04ebbd9e63df01059d0451ac6457e36b970a91"}
 *
 * Go source:
 * MembersOrExportsResolutionKind int
 */
export type MembersOrExportsResolutionKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::MembersOrExportsResolutionKindResolvedExports+MembersOrExportsResolutionKindResolvedMembers","kind":"constGroup","status":"implemented","sigHash":"abe979fc2266d1d02bba83f921000ac848e4d26f9274a48e6e3cc488f4dea3e9"}
 *
 * Go source:
 * const (
 * 	MembersOrExportsResolutionKindResolvedExports MembersOrExportsResolutionKind = 0
 * 	MembersOrExportsResolutionKindResolvedMembers MembersOrExportsResolutionKind = 1
 * )
 */
export const MembersOrExportsResolutionKindResolvedExports: MembersOrExportsResolutionKind = 0;
export const MembersOrExportsResolutionKindResolvedMembers: MembersOrExportsResolutionKind = 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::MembersAndExportsLinks","kind":"type","status":"implemented","sigHash":"36e64e07059bfde3701ffae7c391c50104fcbb23e67928e0956c8ca1d56adeb2"}
 *
 * Go source:
 * MembersAndExportsLinks [2]ast.SymbolTable
 */
export type MembersAndExportsLinks = GoArray<SymbolTable, "2">;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SpreadLinks","kind":"type","status":"implemented","sigHash":"df876aabfe69bddd7a390567a44f88407720d8f02d818b3ccdb640aec9084a94"}
 *
 * Go source:
 * SpreadLinks struct {
 * 	leftSpread  *ast.Symbol // Left source for synthetic spread property
 * 	rightSpread *ast.Symbol // Right source for synthetic spread property
 * }
 */
export interface SpreadLinks {
  leftSpread: GoPtr<Symbol_62f2f8bf>;
  rightSpread: GoPtr<Symbol_62f2f8bf>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::VarianceLinks","kind":"type","status":"implemented","sigHash":"6415f441457fef12a9da408b26f1d349dddb072385f6f06c9515ae94daebcb5e"}
 *
 * Go source:
 * VarianceLinks struct {
 * 	variances []VarianceFlags
 * }
 */
export interface VarianceLinks {
  variances: GoSlice<VarianceFlags>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::VarianceFlags","kind":"type","status":"implemented","sigHash":"dafbe2eb10b346350e8407ff15809ad3191c41a1f9dbe9f707ef779243824564"}
 *
 * Go source:
 * VarianceFlags uint32
 */
export type VarianceFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::VarianceFlagsInvariant+VarianceFlagsCovariant+VarianceFlagsContravariant+VarianceFlagsBivariant+VarianceFlagsIndependent+VarianceFlagsVarianceMask+VarianceFlagsUnmeasurable+VarianceFlagsUnreliable+VarianceFlagsAllowsStructuralFallback","kind":"constGroup","status":"implemented","sigHash":"ec4f07aa3643e944c6e683bb3c46105dc6874f9c5a293779ef4672c5a418cece"}
 *
 * Go source:
 * const (
 * 	VarianceFlagsInvariant                VarianceFlags = 0                                                                                                       // Neither covariant nor contravariant
 * 	VarianceFlagsCovariant                VarianceFlags = 1 << 0                                                                                                  // Covariant
 * 	VarianceFlagsContravariant            VarianceFlags = 1 << 1                                                                                                  // Contravariant
 * 	VarianceFlagsBivariant                VarianceFlags = VarianceFlagsCovariant | VarianceFlagsContravariant                                                     // Both covariant and contravariant
 * 	VarianceFlagsIndependent              VarianceFlags = 1 << 2                                                                                                  // Unwitnessed type parameter
 * 	VarianceFlagsVarianceMask             VarianceFlags = VarianceFlagsInvariant | VarianceFlagsCovariant | VarianceFlagsContravariant | VarianceFlagsIndependent // Mask containing all measured variances without the unmeasurable flag
 * 	VarianceFlagsUnmeasurable             VarianceFlags = 1 << 3                                                                                                  // Variance result is unusable - relationship relies on structural comparisons which are not reflected in generic relationships
 * 	VarianceFlagsUnreliable               VarianceFlags = 1 << 4                                                                                                  // Variance result is unreliable - checking may produce false negatives, but not false positives
 * 	VarianceFlagsAllowsStructuralFallback               = VarianceFlagsUnmeasurable | VarianceFlagsUnreliable
 * )
 */
export const VarianceFlagsInvariant: VarianceFlags = 0;
export const VarianceFlagsCovariant: VarianceFlags = 1 << 0;
export const VarianceFlagsContravariant: VarianceFlags = 1 << 1;
export const VarianceFlagsBivariant: VarianceFlags = VarianceFlagsCovariant | VarianceFlagsContravariant;
export const VarianceFlagsIndependent: VarianceFlags = 1 << 2;
export const VarianceFlagsVarianceMask: VarianceFlags =
  VarianceFlagsInvariant | VarianceFlagsCovariant | VarianceFlagsContravariant | VarianceFlagsIndependent;
export const VarianceFlagsUnmeasurable: VarianceFlags = 1 << 3;
export const VarianceFlagsUnreliable: VarianceFlags = 1 << 4;
export const VarianceFlagsAllowsStructuralFallback: VarianceFlags = VarianceFlagsUnmeasurable | VarianceFlagsUnreliable;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::MarkedAssignmentSymbolLinks","kind":"type","status":"implemented","sigHash":"e899c4c0ef17bf177285dec0977953e6b10fff0a0146ff57ded00eda9c3a0340"}
 *
 * Go source:
 * MarkedAssignmentSymbolLinks struct {
 * 	lastAssignmentPos     int32
 * 	hasDefiniteAssignment bool // Symbol is definitely assigned somewhere
 * }
 */
export interface MarkedAssignmentSymbolLinks {
  lastAssignmentPos: int;
  hasDefiniteAssignment: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::accessibleChainCacheKey","kind":"type","status":"implemented","sigHash":"609fa96a76a3cedd29b3e24ff9f6a5cd38e0207abfb5762c192d377c55028711"}
 *
 * Go source:
 * accessibleChainCacheKey struct {
 * 	useOnlyExternalAliasing bool
 * 	location                *ast.Node
 * 	meaning                 ast.SymbolFlags
 * }
 */
export interface accessibleChainCacheKey {
  useOnlyExternalAliasing: bool;
  location: GoPtr<Node>;
  meaning: SymbolFlags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ContainingSymbolLinks","kind":"type","status":"implemented","sigHash":"3bbec2b082eb7b5b50f071917b90f4df5cccb64d07c8d3c481f02a9853289314"}
 *
 * Go source:
 * ContainingSymbolLinks struct {
 * 	extendedContainersByFile map[ast.NodeId][]*ast.Symbol // Symbols of nodes which which logically contain this one, cached by file the request is made within
 * 	extendedContainers       *[]*ast.Symbol               // Containers (other than the parent) which this symbol is aliased in
 * 	accessibleChainCache     map[accessibleChainCacheKey][]*ast.Symbol
 * }
 */
export interface ContainingSymbolLinks {
  extendedContainersByFile: GoMap<NodeId, GoSlice<GoPtr<Symbol_62f2f8bf>>>;
  extendedContainers: GoRef<GoSlice<GoPtr<Symbol_62f2f8bf>>>;
  accessibleChainCache: GoMap<accessibleChainCacheKey, GoSlice<GoPtr<Symbol_62f2f8bf>>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::AccessFlags","kind":"type","status":"implemented","sigHash":"110552a5ba20ef8f5d285aa8bd9d0e1dbc0991525fa9f00183a63fc6eefb385d"}
 *
 * Go source:
 * AccessFlags uint32
 */
export type AccessFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::AccessFlagsNone+AccessFlagsIncludeUndefined+AccessFlagsNoIndexSignatures+AccessFlagsWriting+AccessFlagsCacheSymbol+AccessFlagsAllowMissing+AccessFlagsExpressionPosition+AccessFlagsReportDeprecated+AccessFlagsSuppressNoImplicitAnyError+AccessFlagsContextual+AccessFlagsPersistent","kind":"constGroup","status":"implemented","sigHash":"56346d3c308f0917d6a3e01443385f26334b0414d43eb2fad93085c4e2736407"}
 *
 * Go source:
 * const (
 * 	AccessFlagsNone                       AccessFlags = 0
 * 	AccessFlagsIncludeUndefined           AccessFlags = 1 << 0
 * 	AccessFlagsNoIndexSignatures          AccessFlags = 1 << 1
 * 	AccessFlagsWriting                    AccessFlags = 1 << 2
 * 	AccessFlagsCacheSymbol                AccessFlags = 1 << 3
 * 	AccessFlagsAllowMissing               AccessFlags = 1 << 4
 * 	AccessFlagsExpressionPosition         AccessFlags = 1 << 5
 * 	AccessFlagsReportDeprecated           AccessFlags = 1 << 6
 * 	AccessFlagsSuppressNoImplicitAnyError AccessFlags = 1 << 7
 * 	AccessFlagsContextual                 AccessFlags = 1 << 8
 * 	AccessFlagsPersistent                             = AccessFlagsIncludeUndefined
 * )
 */
export const AccessFlagsNone: AccessFlags = 0;
export const AccessFlagsIncludeUndefined: AccessFlags = 1 << 0;
export const AccessFlagsNoIndexSignatures: AccessFlags = 1 << 1;
export const AccessFlagsWriting: AccessFlags = 1 << 2;
export const AccessFlagsCacheSymbol: AccessFlags = 1 << 3;
export const AccessFlagsAllowMissing: AccessFlags = 1 << 4;
export const AccessFlagsExpressionPosition: AccessFlags = 1 << 5;
export const AccessFlagsReportDeprecated: AccessFlags = 1 << 6;
export const AccessFlagsSuppressNoImplicitAnyError: AccessFlags = 1 << 7;
export const AccessFlagsContextual: AccessFlags = 1 << 8;
export const AccessFlagsPersistent: AccessFlags = AccessFlagsIncludeUndefined;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::NodeCheckFlags","kind":"type","status":"implemented","sigHash":"cb5b03d852c9e5660e4ac8d12ce427684d0d6258caef622a0510ca144f2c2970"}
 *
 * Go source:
 * NodeCheckFlags uint32
 */
export type NodeCheckFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::NodeCheckFlagsNone+NodeCheckFlagsTypeChecked+NodeCheckFlagsContextChecked+NodeCheckFlagsEnumValuesComputed+NodeCheckFlagsAssignmentsMarked+NodeCheckFlagsContainsClassWithPrivateIdentifiers+NodeCheckFlagsContainsSuperPropertyInStaticInitializer+NodeCheckFlagsInCheckIdentifier+NodeCheckFlagsInitializerIsUndefined+NodeCheckFlagsInitializerIsUndefinedComputed","kind":"constGroup","status":"implemented","sigHash":"dd4b225ded9bbac7a23e1fa4ab17162e548486df091a352332176c153a812d50"}
 *
 * Go source:
 * const (
 * 	NodeCheckFlagsNone                                     NodeCheckFlags = 0
 * 	NodeCheckFlagsTypeChecked                              NodeCheckFlags = 1 << 0  // Node has been type checked
 * 	NodeCheckFlagsContextChecked                           NodeCheckFlags = 1 << 6  // Contextual types have been assigned
 * 	NodeCheckFlagsEnumValuesComputed                       NodeCheckFlags = 1 << 10 // Values for enum members have been computed, and any errors have been reported for them.
 * 	NodeCheckFlagsAssignmentsMarked                        NodeCheckFlags = 1 << 17 // Parameter assignments have been marked
 * 	NodeCheckFlagsContainsClassWithPrivateIdentifiers      NodeCheckFlags = 1 << 20 // Marked on all block-scoped containers containing a class with private identifiers.
 * 	NodeCheckFlagsContainsSuperPropertyInStaticInitializer NodeCheckFlags = 1 << 21 // Marked on all block-scoped containers containing a static initializer with 'super.x' or 'super[x]'.
 * 	NodeCheckFlagsInCheckIdentifier                        NodeCheckFlags = 1 << 22
 * 	NodeCheckFlagsInitializerIsUndefined                   NodeCheckFlags = 1 << 24
 * 	NodeCheckFlagsInitializerIsUndefinedComputed           NodeCheckFlags = 1 << 25
 * )
 */
export const NodeCheckFlagsNone: NodeCheckFlags = 0;
export const NodeCheckFlagsTypeChecked: NodeCheckFlags = 1 << 0;
export const NodeCheckFlagsContextChecked: NodeCheckFlags = 1 << 6;
export const NodeCheckFlagsEnumValuesComputed: NodeCheckFlags = 1 << 10;
export const NodeCheckFlagsAssignmentsMarked: NodeCheckFlags = 1 << 17;
export const NodeCheckFlagsContainsClassWithPrivateIdentifiers: NodeCheckFlags = 1 << 20;
export const NodeCheckFlagsContainsSuperPropertyInStaticInitializer: NodeCheckFlags = 1 << 21;
export const NodeCheckFlagsInCheckIdentifier: NodeCheckFlags = 1 << 22;
export const NodeCheckFlagsInitializerIsUndefined: NodeCheckFlags = 1 << 24;
export const NodeCheckFlagsInitializerIsUndefinedComputed: NodeCheckFlags = 1 << 25;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::NodeLinks","kind":"type","status":"implemented","sigHash":"08788a14ee25e45c247ee1775e6b02a386156142623054cb32dfd204130a0d52"}
 *
 * Go source:
 * NodeLinks struct {
 * 	flags                                NodeCheckFlags // Set of flags specific to Node
 * 	declarationRequiresScopeChange       core.Tristate  // Set by `useOuterVariableScopeInParameter` in checker when downlevel emit would change the name resolution scope inside of a parameter.
 * 	hasReportedStatementInAmbientContext bool           // Cache boolean if we report statements in ambient context
 * }
 */
export interface NodeLinks {
  flags: NodeCheckFlags;
  declarationRequiresScopeChange: Tristate;
  hasReportedStatementInAmbientContext: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SymbolNodeLinks","kind":"type","status":"implemented","sigHash":"82833a9785bb4ea2d1422dcc835f63d02a100cd939967a4a325ac5c20d3e3285"}
 *
 * Go source:
 * SymbolNodeLinks struct {
 * 	resolvedSymbol *ast.Symbol // Resolved symbol associated with node
 * }
 */
export interface SymbolNodeLinks {
  resolvedSymbol: GoPtr<Symbol_62f2f8bf>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeNodeLinks","kind":"type","status":"implemented","sigHash":"44492684400c9b1c8cf956fda62f37c844479a2c02c457107c16c9351c8c13a1"}
 *
 * Go source:
 * TypeNodeLinks struct {
 * 	resolvedType        *Type   // Resolved type associated with node
 * 	outerTypeParameters []*Type // Outer type parameters of anonymous object type
 * }
 */
export interface TypeNodeLinks {
  resolvedType: GoPtr<Type>;
  outerTypeParameters: GoSlice<GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::EnumMemberLinks","kind":"type","status":"implemented","sigHash":"6edbdfe546932ef3ff188cb30f9dc076ce4fd1e078a4806760b063071b35bd5b"}
 *
 * Go source:
 * EnumMemberLinks struct {
 * 	value evaluator.Result // Constant value of enum member
 * }
 */
export interface EnumMemberLinks {
  value: Result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::AssertionLinks","kind":"type","status":"implemented","sigHash":"484f9eef7cb0c45f3714864c21b15c0d9ea03ab45ded846a30e0d6da47c8c6b7"}
 *
 * Go source:
 * AssertionLinks struct {
 * 	exprType *Type // Assertion expression type
 * }
 */
export interface AssertionLinks {
  exprType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SourceFileLinks","kind":"type","status":"implemented","sigHash":"dc37f73e751e633cde67993d45c883b3a6d979cebd26fb23c22290e30969388e"}
 *
 * Go source:
 * SourceFileLinks struct {
 * 	typeChecked                  bool
 * 	unusedChecked                bool
 * 	externalHelpersModule        *ast.Symbol
 * 	requestedExternalEmitHelpers ExternalEmitHelpers
 * 	deferredNodes                collections.OrderedSet[*ast.Node]
 * 	identifierCheckNodes         []*ast.Node
 * 	localJsxNamespace            string
 * 	localJsxFragmentNamespace    string
 * 	localJsxFactory              *ast.EntityName
 * 	localJsxFragmentFactory      *ast.EntityName
 * 	jsxFragmentType              *Type
 * }
 */
export interface SourceFileLinks {
  typeChecked: bool;
  unusedChecked: bool;
  externalHelpersModule: GoPtr<Symbol_62f2f8bf>;
  requestedExternalEmitHelpers: ExternalEmitHelpers;
  deferredNodes: OrderedSet<GoPtr<Node>>;
  identifierCheckNodes: GoSlice<GoPtr<Node>>;
  localJsxNamespace: string;
  localJsxFragmentNamespace: string;
  localJsxFactory: GoPtr<EntityName>;
  localJsxFragmentFactory: GoPtr<EntityName>;
  jsxFragmentType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SignatureLinks","kind":"type","status":"implemented","sigHash":"c3f8d52f94cc024f0b7f7d4ee9993b45092d89246cac83a41582698c6aa75013"}
 *
 * Go source:
 * SignatureLinks struct {
 * 	resolvedSignature  *Signature // Cached signature of signature node or call expression
 * 	effectsSignature   *Signature // Signature with possible control flow effects
 * 	decoratorSignature *Signature // Signature for decorator as if invoked by the runtime
 * }
 */
export interface SignatureLinks {
  resolvedSignature: GoPtr<Signature>;
  effectsSignature: GoPtr<Signature>;
  decoratorSignature: GoPtr<Signature>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeFlags","kind":"type","status":"implemented","sigHash":"06d2339bb07513679d9db9d3361917653e5f784b5a3d9fda1db10a4184c759c9"}
 *
 * Go source:
 * TypeFlags uint32
 */
export type TypeFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::TypeFlagsNone+TypeFlagsAny+TypeFlagsUnknown+TypeFlagsUndefined+TypeFlagsNull+TypeFlagsVoid+TypeFlagsString+TypeFlagsNumber+TypeFlagsBigInt+TypeFlagsBoolean+TypeFlagsESSymbol+TypeFlagsStringLiteral+TypeFlagsNumberLiteral+TypeFlagsBigIntLiteral+TypeFlagsBooleanLiteral+TypeFlagsUniqueESSymbol+TypeFlagsEnumLiteral+TypeFlagsEnum+TypeFlagsNonPrimitive+TypeFlagsNever+TypeFlagsTypeParameter+TypeFlagsObject+TypeFlagsIndex+TypeFlagsTemplateLiteral+TypeFlagsStringMapping+TypeFlagsSubstitution+TypeFlagsIndexedAccess+TypeFlagsConditional+TypeFlagsUnion+TypeFlagsIntersection+TypeFlagsReserved1+TypeFlagsReserved2+TypeFlagsReserved3+TypeFlagsAnyOrUnknown+TypeFlagsNullable+TypeFlagsLiteral+TypeFlagsUnit+TypeFlagsFreshable+TypeFlagsStringOrNumberLiteral+TypeFlagsStringOrNumberLiteralOrUnique+TypeFlagsDefinitelyFalsy+TypeFlagsPossiblyFalsy+TypeFlagsIntrinsic+TypeFlagsStringLike+TypeFlagsNumberLike+TypeFlagsBigIntLike+TypeFlagsBooleanLike+TypeFlagsEnumLike+TypeFlagsESSymbolLike+TypeFlagsVoidLike+TypeFlagsPrimitive+TypeFlagsDefinitelyNonNullable+TypeFlagsDisjointDomains+TypeFlagsUnionOrIntersection+TypeFlagsStructuredType+TypeFlagsTypeVariable+TypeFlagsInstantiableNonPrimitive+TypeFlagsInstantiablePrimitive+TypeFlagsInstantiable+TypeFlagsStructuredOrInstantiable+TypeFlagsObjectFlagsType+TypeFlagsSimplifiable+TypeFlagsSingleton+TypeFlagsNarrowable+TypeFlagsIncludesMask+TypeFlagsIncludesMissingType+TypeFlagsIncludesNonWideningType+TypeFlagsIncludesWildcard+TypeFlagsIncludesEmptyObject+TypeFlagsIncludesInstantiable+TypeFlagsIncludesConstrainedTypeVariable+TypeFlagsIncludesError+TypeFlagsNotPrimitiveUnion","kind":"constGroup","status":"implemented","sigHash":"aea5b7479304fc10b8a8fa323d0feb54872010f94df85867b3685332faa87f56"}
 *
 * Go source:
 * const (
 * 	TypeFlagsNone            TypeFlags = 0
 * 	TypeFlagsAny             TypeFlags = 1 << 0
 * 	TypeFlagsUnknown         TypeFlags = 1 << 1
 * 	TypeFlagsUndefined       TypeFlags = 1 << 2
 * 	TypeFlagsNull            TypeFlags = 1 << 3
 * 	TypeFlagsVoid            TypeFlags = 1 << 4
 * 	TypeFlagsString          TypeFlags = 1 << 5
 * 	TypeFlagsNumber          TypeFlags = 1 << 6
 * 	TypeFlagsBigInt          TypeFlags = 1 << 7
 * 	TypeFlagsBoolean         TypeFlags = 1 << 8
 * 	TypeFlagsESSymbol        TypeFlags = 1 << 9 // Type of symbol primitive introduced in ES6
 * 	TypeFlagsStringLiteral   TypeFlags = 1 << 10
 * 	TypeFlagsNumberLiteral   TypeFlags = 1 << 11
 * 	TypeFlagsBigIntLiteral   TypeFlags = 1 << 12
 * 	TypeFlagsBooleanLiteral  TypeFlags = 1 << 13
 * 	TypeFlagsUniqueESSymbol  TypeFlags = 1 << 14 // unique symbol
 * 	TypeFlagsEnumLiteral     TypeFlags = 1 << 15 // Always combined with StringLiteral, NumberLiteral, or Union
 * 	TypeFlagsEnum            TypeFlags = 1 << 16 // Numeric computed enum member value (must be right after EnumLiteral, see getSortOrderFlags)
 * 	TypeFlagsNonPrimitive    TypeFlags = 1 << 17 // intrinsic object type
 * 	TypeFlagsNever           TypeFlags = 1 << 18 // Never type
 * 	TypeFlagsTypeParameter   TypeFlags = 1 << 19 // Type parameter
 * 	TypeFlagsObject          TypeFlags = 1 << 20 // Object type
 * 	TypeFlagsIndex           TypeFlags = 1 << 21 // keyof T
 * 	TypeFlagsTemplateLiteral TypeFlags = 1 << 22 // Template literal type
 * 	TypeFlagsStringMapping   TypeFlags = 1 << 23 // Uppercase/Lowercase type
 * 	TypeFlagsSubstitution    TypeFlags = 1 << 24 // Type parameter substitution
 * 	TypeFlagsIndexedAccess   TypeFlags = 1 << 25 // T[K]
 * 	TypeFlagsConditional     TypeFlags = 1 << 26 // T extends U ? X : Y
 * 	TypeFlagsUnion           TypeFlags = 1 << 27 // Union (T | U)
 * 	TypeFlagsIntersection    TypeFlags = 1 << 28 // Intersection (T & U)
 * 	TypeFlagsReserved1       TypeFlags = 1 << 29 // Used by union/intersection type construction
 * 	TypeFlagsReserved2       TypeFlags = 1 << 30 // Used by union/intersection type construction
 * 	TypeFlagsReserved3       TypeFlags = 1 << 31
 * 
 * 	TypeFlagsAnyOrUnknown                  = TypeFlagsAny | TypeFlagsUnknown
 * 	TypeFlagsNullable                      = TypeFlagsUndefined | TypeFlagsNull
 * 	TypeFlagsLiteral                       = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsBigIntLiteral | TypeFlagsBooleanLiteral
 * 	TypeFlagsUnit                          = TypeFlagsEnum | TypeFlagsLiteral | TypeFlagsUniqueESSymbol | TypeFlagsNullable
 * 	TypeFlagsFreshable                     = TypeFlagsEnum | TypeFlagsLiteral
 * 	TypeFlagsStringOrNumberLiteral         = TypeFlagsStringLiteral | TypeFlagsNumberLiteral
 * 	TypeFlagsStringOrNumberLiteralOrUnique = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsUniqueESSymbol
 * 	TypeFlagsDefinitelyFalsy               = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsBigIntLiteral | TypeFlagsBooleanLiteral | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull
 * 	TypeFlagsPossiblyFalsy                 = TypeFlagsDefinitelyFalsy | TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt | TypeFlagsBoolean
 * 	TypeFlagsIntrinsic                     = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt | TypeFlagsESSymbol | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull | TypeFlagsNever | TypeFlagsNonPrimitive
 * 	TypeFlagsStringLike                    = TypeFlagsString | TypeFlagsStringLiteral | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
 * 	TypeFlagsNumberLike                    = TypeFlagsNumber | TypeFlagsNumberLiteral | TypeFlagsEnum
 * 	TypeFlagsBigIntLike                    = TypeFlagsBigInt | TypeFlagsBigIntLiteral
 * 	TypeFlagsBooleanLike                   = TypeFlagsBoolean | TypeFlagsBooleanLiteral
 * 	TypeFlagsEnumLike                      = TypeFlagsEnum | TypeFlagsEnumLiteral
 * 	TypeFlagsESSymbolLike                  = TypeFlagsESSymbol | TypeFlagsUniqueESSymbol
 * 	TypeFlagsVoidLike                      = TypeFlagsVoid | TypeFlagsUndefined
 * 	TypeFlagsPrimitive                     = TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsEnumLike | TypeFlagsESSymbolLike | TypeFlagsVoidLike | TypeFlagsNull
 * 	TypeFlagsDefinitelyNonNullable         = TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsEnumLike | TypeFlagsESSymbolLike | TypeFlagsObject | TypeFlagsNonPrimitive
 * 	TypeFlagsDisjointDomains               = TypeFlagsNonPrimitive | TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsESSymbolLike | TypeFlagsVoidLike | TypeFlagsNull
 * 	TypeFlagsUnionOrIntersection           = TypeFlagsUnion | TypeFlagsIntersection
 * 	TypeFlagsStructuredType                = TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection
 * 	TypeFlagsTypeVariable                  = TypeFlagsTypeParameter | TypeFlagsIndexedAccess
 * 	TypeFlagsInstantiableNonPrimitive      = TypeFlagsTypeVariable | TypeFlagsConditional | TypeFlagsSubstitution
 * 	TypeFlagsInstantiablePrimitive         = TypeFlagsIndex | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
 * 	TypeFlagsInstantiable                  = TypeFlagsInstantiableNonPrimitive | TypeFlagsInstantiablePrimitive
 * 	TypeFlagsStructuredOrInstantiable      = TypeFlagsStructuredType | TypeFlagsInstantiable
 * 	TypeFlagsObjectFlagsType               = TypeFlagsAny | TypeFlagsNullable | TypeFlagsNever | TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection
 * 	TypeFlagsSimplifiable                  = TypeFlagsIndexedAccess | TypeFlagsConditional | TypeFlagsIndex
 * 	TypeFlagsSingleton                     = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsString | TypeFlagsNumber | TypeFlagsBoolean | TypeFlagsBigInt | TypeFlagsESSymbol | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull | TypeFlagsNever | TypeFlagsNonPrimitive
 * 	// 'TypeFlagsNarrowable' types are types where narrowing actually narrows.
 * 	// This *should* be every type other than null, undefined, void, and never
 * 	TypeFlagsNarrowable = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsStructuredOrInstantiable | TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsESSymbol | TypeFlagsUniqueESSymbol | TypeFlagsNonPrimitive
 * 	// The following flags are aggregated during union and intersection type construction
 * 	TypeFlagsIncludesMask = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsPrimitive | TypeFlagsNever | TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection | TypeFlagsNonPrimitive | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
 * 	// The following flags are used for different purposes during union and intersection type construction
 * 	TypeFlagsIncludesMissingType             = TypeFlagsTypeParameter
 * 	TypeFlagsIncludesNonWideningType         = TypeFlagsIndex
 * 	TypeFlagsIncludesWildcard                = TypeFlagsIndexedAccess
 * 	TypeFlagsIncludesEmptyObject             = TypeFlagsConditional
 * 	TypeFlagsIncludesInstantiable            = TypeFlagsSubstitution
 * 	TypeFlagsIncludesConstrainedTypeVariable = TypeFlagsReserved1
 * 	TypeFlagsIncludesError                   = TypeFlagsReserved2
 * 	TypeFlagsNotPrimitiveUnion               = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsVoid | TypeFlagsNever | TypeFlagsObject | TypeFlagsIntersection | TypeFlagsIncludesInstantiable
 * )
 */
export const TypeFlagsNone: TypeFlags = 0;
export const TypeFlagsAny: TypeFlags = 1 << 0;
export const TypeFlagsUnknown: TypeFlags = 1 << 1;
export const TypeFlagsUndefined: TypeFlags = 1 << 2;
export const TypeFlagsNull: TypeFlags = 1 << 3;
export const TypeFlagsVoid: TypeFlags = 1 << 4;
export const TypeFlagsString: TypeFlags = 1 << 5;
export const TypeFlagsNumber: TypeFlags = 1 << 6;
export const TypeFlagsBigInt: TypeFlags = 1 << 7;
export const TypeFlagsBoolean: TypeFlags = 1 << 8;
export const TypeFlagsESSymbol: TypeFlags = 1 << 9;
export const TypeFlagsStringLiteral: TypeFlags = 1 << 10;
export const TypeFlagsNumberLiteral: TypeFlags = 1 << 11;
export const TypeFlagsBigIntLiteral: TypeFlags = 1 << 12;
export const TypeFlagsBooleanLiteral: TypeFlags = 1 << 13;
export const TypeFlagsUniqueESSymbol: TypeFlags = 1 << 14;
export const TypeFlagsEnumLiteral: TypeFlags = 1 << 15;
export const TypeFlagsEnum: TypeFlags = 1 << 16;
export const TypeFlagsNonPrimitive: TypeFlags = 1 << 17;
export const TypeFlagsNever: TypeFlags = 1 << 18;
export const TypeFlagsTypeParameter: TypeFlags = 1 << 19;
export const TypeFlagsObject: TypeFlags = 1 << 20;
export const TypeFlagsIndex: TypeFlags = 1 << 21;
export const TypeFlagsTemplateLiteral: TypeFlags = 1 << 22;
export const TypeFlagsStringMapping: TypeFlags = 1 << 23;
export const TypeFlagsSubstitution: TypeFlags = 1 << 24;
export const TypeFlagsIndexedAccess: TypeFlags = 1 << 25;
export const TypeFlagsConditional: TypeFlags = 1 << 26;
export const TypeFlagsUnion: TypeFlags = 1 << 27;
export const TypeFlagsIntersection: TypeFlags = 1 << 28;
export const TypeFlagsReserved1: TypeFlags = 1 << 29;
export const TypeFlagsReserved2: TypeFlags = 1 << 30;
export const TypeFlagsReserved3: TypeFlags = 2147483648;
export const TypeFlagsAnyOrUnknown: TypeFlags = (TypeFlagsAny | TypeFlagsUnknown) >>> 0;
export const TypeFlagsNullable: TypeFlags = (TypeFlagsUndefined | TypeFlagsNull) >>> 0;
export const TypeFlagsLiteral: TypeFlags =
  (TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsBigIntLiteral | TypeFlagsBooleanLiteral) >>> 0;
export const TypeFlagsUnit: TypeFlags =
  (TypeFlagsEnum | TypeFlagsLiteral | TypeFlagsUniqueESSymbol | TypeFlagsNullable) >>> 0;
export const TypeFlagsFreshable: TypeFlags = (TypeFlagsEnum | TypeFlagsLiteral) >>> 0;
export const TypeFlagsStringOrNumberLiteral: TypeFlags = (TypeFlagsStringLiteral | TypeFlagsNumberLiteral) >>> 0;
export const TypeFlagsStringOrNumberLiteralOrUnique: TypeFlags =
  (TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsUniqueESSymbol) >>> 0;
export const TypeFlagsDefinitelyFalsy: TypeFlags =
  (TypeFlagsStringLiteral |
    TypeFlagsNumberLiteral |
    TypeFlagsBigIntLiteral |
    TypeFlagsBooleanLiteral |
    TypeFlagsVoid |
    TypeFlagsUndefined |
    TypeFlagsNull) >>>
  0;
export const TypeFlagsPossiblyFalsy: TypeFlags =
  (TypeFlagsDefinitelyFalsy |
    TypeFlagsString |
    TypeFlagsNumber |
    TypeFlagsBigInt |
    TypeFlagsBoolean) >>>
  0;
export const TypeFlagsIntrinsic: TypeFlags =
  (TypeFlagsAny |
    TypeFlagsUnknown |
    TypeFlagsString |
    TypeFlagsNumber |
    TypeFlagsBigInt |
    TypeFlagsESSymbol |
    TypeFlagsVoid |
    TypeFlagsUndefined |
    TypeFlagsNull |
    TypeFlagsNever |
    TypeFlagsNonPrimitive) >>>
  0;
export const TypeFlagsStringLike: TypeFlags =
  (TypeFlagsString | TypeFlagsStringLiteral | TypeFlagsTemplateLiteral | TypeFlagsStringMapping) >>> 0;
export const TypeFlagsNumberLike: TypeFlags = (TypeFlagsNumber | TypeFlagsNumberLiteral | TypeFlagsEnum) >>> 0;
export const TypeFlagsBigIntLike: TypeFlags = (TypeFlagsBigInt | TypeFlagsBigIntLiteral) >>> 0;
export const TypeFlagsBooleanLike: TypeFlags = (TypeFlagsBoolean | TypeFlagsBooleanLiteral) >>> 0;
export const TypeFlagsEnumLike: TypeFlags = (TypeFlagsEnum | TypeFlagsEnumLiteral) >>> 0;
export const TypeFlagsESSymbolLike: TypeFlags = (TypeFlagsESSymbol | TypeFlagsUniqueESSymbol) >>> 0;
export const TypeFlagsVoidLike: TypeFlags = (TypeFlagsVoid | TypeFlagsUndefined) >>> 0;
export const TypeFlagsPrimitive: TypeFlags =
  (TypeFlagsStringLike |
    TypeFlagsNumberLike |
    TypeFlagsBigIntLike |
    TypeFlagsBooleanLike |
    TypeFlagsEnumLike |
    TypeFlagsESSymbolLike |
    TypeFlagsVoidLike |
    TypeFlagsNull) >>>
  0;
export const TypeFlagsDefinitelyNonNullable: TypeFlags =
  (TypeFlagsStringLike |
    TypeFlagsNumberLike |
    TypeFlagsBigIntLike |
    TypeFlagsBooleanLike |
    TypeFlagsEnumLike |
    TypeFlagsESSymbolLike |
    TypeFlagsObject |
    TypeFlagsNonPrimitive) >>>
  0;
export const TypeFlagsDisjointDomains: TypeFlags =
  (TypeFlagsNonPrimitive |
    TypeFlagsStringLike |
    TypeFlagsNumberLike |
    TypeFlagsBigIntLike |
    TypeFlagsBooleanLike |
    TypeFlagsESSymbolLike |
    TypeFlagsVoidLike |
    TypeFlagsNull) >>>
  0;
export const TypeFlagsUnionOrIntersection: TypeFlags = (TypeFlagsUnion | TypeFlagsIntersection) >>> 0;
export const TypeFlagsStructuredType: TypeFlags = (TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection) >>> 0;
export const TypeFlagsTypeVariable: TypeFlags = (TypeFlagsTypeParameter | TypeFlagsIndexedAccess) >>> 0;
export const TypeFlagsInstantiableNonPrimitive: TypeFlags =
  (TypeFlagsTypeVariable | TypeFlagsConditional | TypeFlagsSubstitution) >>> 0;
export const TypeFlagsInstantiablePrimitive: TypeFlags =
  (TypeFlagsIndex | TypeFlagsTemplateLiteral | TypeFlagsStringMapping) >>> 0;
export const TypeFlagsInstantiable: TypeFlags =
  (TypeFlagsInstantiableNonPrimitive | TypeFlagsInstantiablePrimitive) >>> 0;
export const TypeFlagsStructuredOrInstantiable: TypeFlags =
  (TypeFlagsStructuredType | TypeFlagsInstantiable) >>> 0;
export const TypeFlagsObjectFlagsType: TypeFlags =
  (TypeFlagsAny |
    TypeFlagsNullable |
    TypeFlagsNever |
    TypeFlagsObject |
    TypeFlagsUnion |
    TypeFlagsIntersection) >>>
  0;
export const TypeFlagsSimplifiable: TypeFlags =
  (TypeFlagsIndexedAccess | TypeFlagsConditional | TypeFlagsIndex) >>> 0;
export const TypeFlagsSingleton: TypeFlags =
  (TypeFlagsAny |
    TypeFlagsUnknown |
    TypeFlagsString |
    TypeFlagsNumber |
    TypeFlagsBoolean |
    TypeFlagsBigInt |
    TypeFlagsESSymbol |
    TypeFlagsVoid |
    TypeFlagsUndefined |
    TypeFlagsNull |
    TypeFlagsNever |
    TypeFlagsNonPrimitive) >>>
  0;
export const TypeFlagsNarrowable: TypeFlags =
  (TypeFlagsAny |
    TypeFlagsUnknown |
    TypeFlagsStructuredOrInstantiable |
    TypeFlagsStringLike |
    TypeFlagsNumberLike |
    TypeFlagsBigIntLike |
    TypeFlagsBooleanLike |
    TypeFlagsESSymbol |
    TypeFlagsUniqueESSymbol |
    TypeFlagsNonPrimitive) >>>
  0;
export const TypeFlagsIncludesMask: TypeFlags =
  (TypeFlagsAny |
    TypeFlagsUnknown |
    TypeFlagsPrimitive |
    TypeFlagsNever |
    TypeFlagsObject |
    TypeFlagsUnion |
    TypeFlagsIntersection |
    TypeFlagsNonPrimitive |
    TypeFlagsTemplateLiteral |
    TypeFlagsStringMapping) >>>
  0;
export const TypeFlagsIncludesMissingType: TypeFlags = TypeFlagsTypeParameter;
export const TypeFlagsIncludesNonWideningType: TypeFlags = TypeFlagsIndex;
export const TypeFlagsIncludesWildcard: TypeFlags = TypeFlagsIndexedAccess;
export const TypeFlagsIncludesEmptyObject: TypeFlags = TypeFlagsConditional;
export const TypeFlagsIncludesInstantiable: TypeFlags = TypeFlagsSubstitution;
export const TypeFlagsIncludesConstrainedTypeVariable: TypeFlags = TypeFlagsReserved1;
export const TypeFlagsIncludesError: TypeFlags = TypeFlagsReserved2;
export const TypeFlagsNotPrimitiveUnion: TypeFlags =
  (TypeFlagsAny |
    TypeFlagsUnknown |
    TypeFlagsVoid |
    TypeFlagsNever |
    TypeFlagsObject |
    TypeFlagsIntersection |
    TypeFlagsIncludesInstantiable) >>>
  0;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::varGroup::typeFlagNames","kind":"varGroup","status":"implemented","sigHash":"fdd7b1c4a1b8e42cf02488423d0c3be19ce9449c94813aa3b51ff12b2d120b09"}
 *
 * Go source:
 * var typeFlagNames = [...]struct {
 * 	flag TypeFlags
 * 	name string
 * }{
 * 	{TypeFlagsAny, "Any"},
 * 	{TypeFlagsUnknown, "Unknown"},
 * 	{TypeFlagsUndefined, "Undefined"},
 * 	{TypeFlagsNull, "Null"},
 * 	{TypeFlagsVoid, "Void"},
 * 	{TypeFlagsString, "String"},
 * 	{TypeFlagsNumber, "Number"},
 * 	{TypeFlagsBigInt, "BigInt"},
 * 	{TypeFlagsBoolean, "Boolean"},
 * 	{TypeFlagsESSymbol, "ESSymbol"},
 * 	{TypeFlagsStringLiteral, "StringLiteral"},
 * 	{TypeFlagsNumberLiteral, "NumberLiteral"},
 * 	{TypeFlagsBigIntLiteral, "BigIntLiteral"},
 * 	{TypeFlagsBooleanLiteral, "BooleanLiteral"},
 * 	{TypeFlagsUniqueESSymbol, "UniqueESSymbol"},
 * 	{TypeFlagsEnumLiteral, "EnumLiteral"},
 * 	{TypeFlagsEnum, "Enum"},
 * 	{TypeFlagsNonPrimitive, "NonPrimitive"},
 * 	{TypeFlagsNever, "Never"},
 * 	{TypeFlagsTypeParameter, "TypeParameter"},
 * 	{TypeFlagsObject, "Object"},
 * 	{TypeFlagsIndex, "Index"},
 * 	{TypeFlagsTemplateLiteral, "TemplateLiteral"},
 * 	{TypeFlagsStringMapping, "StringMapping"},
 * 	{TypeFlagsSubstitution, "Substitution"},
 * 	{TypeFlagsIndexedAccess, "IndexedAccess"},
 * 	{TypeFlagsConditional, "Conditional"},
 * 	{TypeFlagsUnion, "Union"},
 * 	{TypeFlagsIntersection, "Intersection"},
 * }
 */
export let typeFlagNames: GoArray<{ flag: TypeFlags; name: string }, "29"> = [
  { flag: TypeFlagsAny, name: "Any" },
  { flag: TypeFlagsUnknown, name: "Unknown" },
  { flag: TypeFlagsUndefined, name: "Undefined" },
  { flag: TypeFlagsNull, name: "Null" },
  { flag: TypeFlagsVoid, name: "Void" },
  { flag: TypeFlagsString, name: "String" },
  { flag: TypeFlagsNumber, name: "Number" },
  { flag: TypeFlagsBigInt, name: "BigInt" },
  { flag: TypeFlagsBoolean, name: "Boolean" },
  { flag: TypeFlagsESSymbol, name: "ESSymbol" },
  { flag: TypeFlagsStringLiteral, name: "StringLiteral" },
  { flag: TypeFlagsNumberLiteral, name: "NumberLiteral" },
  { flag: TypeFlagsBigIntLiteral, name: "BigIntLiteral" },
  { flag: TypeFlagsBooleanLiteral, name: "BooleanLiteral" },
  { flag: TypeFlagsUniqueESSymbol, name: "UniqueESSymbol" },
  { flag: TypeFlagsEnumLiteral, name: "EnumLiteral" },
  { flag: TypeFlagsEnum, name: "Enum" },
  { flag: TypeFlagsNonPrimitive, name: "NonPrimitive" },
  { flag: TypeFlagsNever, name: "Never" },
  { flag: TypeFlagsTypeParameter, name: "TypeParameter" },
  { flag: TypeFlagsObject, name: "Object" },
  { flag: TypeFlagsIndex, name: "Index" },
  { flag: TypeFlagsTemplateLiteral, name: "TemplateLiteral" },
  { flag: TypeFlagsStringMapping, name: "StringMapping" },
  { flag: TypeFlagsSubstitution, name: "Substitution" },
  { flag: TypeFlagsIndexedAccess, name: "IndexedAccess" },
  { flag: TypeFlagsConditional, name: "Conditional" },
  { flag: TypeFlagsUnion, name: "Union" },
  { flag: TypeFlagsIntersection, name: "Intersection" },
] as GoArray<{ flag: TypeFlags; name: string }, "29">;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::func::FormatTypeFlags","kind":"func","status":"implemented","sigHash":"d0e04635c8cf50ca99dba439417ca1205268291386426614f2955a2a4cb684de"}
 *
 * Go source:
 * func FormatTypeFlags(flags TypeFlags) []string {
 * 	result := make([]string, 0, bits.OnesCount32(uint32(flags)))
 * 	for _, fn := range typeFlagNames {
 * 		if flags&fn.flag != 0 {
 * 			result = append(result, fn.name)
 * 		}
 * 	}
 * 	if len(result) == 0 {
 * 		result = append(result, "None")
 * 	}
 * 	return result
 * }
 */
export function FormatTypeFlags(flags: TypeFlags): GoSlice<string> {
  const result: GoSlice<string> = typeFlagNames
    .filter((fn) => (flags & fn.flag) !== 0)
    .map((fn) => fn.name);
  if (result.length === 0) {
    return ["None"];
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeFlags.String","kind":"method","status":"implemented","sigHash":"31c2f9e26290c2647835a1089c9b4d35ef4a700ab3c9761c1de282647b5b68d0"}
 *
 * Go source:
 * func (f TypeFlags) String() string {
 * 	return strings.Join(FormatTypeFlags(f), "|")
 * }
 */
export function TypeFlags_String(receiver: TypeFlags): string {
  return FormatTypeFlags(receiver).join("|");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::VarianceFlags.String","kind":"method","status":"implemented","sigHash":"e53e39f56ea8e176a06f7994240619336fad8cffd42180c7b5aa28d05dd9c6b5"}
 *
 * Go source:
 * func (v VarianceFlags) String() string {
 * 	variance := v & VarianceFlagsVarianceMask
 * 	var result string
 * 	switch variance {
 * 	case VarianceFlagsInvariant:
 * 		result = "in out"
 * 	case VarianceFlagsBivariant:
 * 		result = "[bivariant]"
 * 	case VarianceFlagsContravariant:
 * 		result = "in"
 * 	case VarianceFlagsCovariant:
 * 		result = "out"
 * 	case VarianceFlagsIndependent:
 * 		result = "[independent]"
 * 	default:
 * 		result = ""
 * 	}
 * 	if v&VarianceFlagsUnmeasurable != 0 {
 * 		result += " (unmeasurable)"
 * 	} else if v&VarianceFlagsUnreliable != 0 {
 * 		result += " (unreliable)"
 * 	}
 * 	return result
 * }
 */
export function VarianceFlags_String(receiver: VarianceFlags): string {
  const variance: VarianceFlags = receiver & VarianceFlagsVarianceMask;
  const base: string =
    variance === VarianceFlagsInvariant
      ? "in out"
      : variance === VarianceFlagsBivariant
        ? "[bivariant]"
        : variance === VarianceFlagsContravariant
          ? "in"
          : variance === VarianceFlagsCovariant
            ? "out"
            : variance === VarianceFlagsIndependent
              ? "[independent]"
              : "";
  if ((receiver & VarianceFlagsUnmeasurable) !== 0) {
    return base + " (unmeasurable)";
  } else if ((receiver & VarianceFlagsUnreliable) !== 0) {
    return base + " (unreliable)";
  }
  return base;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ObjectFlags","kind":"type","status":"implemented","sigHash":"985cc5687be0c748355864d9a03ebdf3a9faa8df90aff2b840df33c501cf09c4"}
 *
 * Go source:
 * ObjectFlags uint32
 */
export type ObjectFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::ObjectFlagsNone+ObjectFlagsClass+ObjectFlagsInterface+ObjectFlagsReference+ObjectFlagsTuple+ObjectFlagsAnonymous+ObjectFlagsMapped+ObjectFlagsInstantiated+ObjectFlagsObjectLiteral+ObjectFlagsEvolvingArray+ObjectFlagsObjectLiteralPatternWithComputedProperties+ObjectFlagsReverseMapped+ObjectFlagsJsxAttributes+ObjectFlagsJSLiteral+ObjectFlagsFreshLiteral+ObjectFlagsArrayLiteral+ObjectFlagsPrimitiveUnion+ObjectFlagsContainsWideningType+ObjectFlagsContainsObjectOrArrayLiteral+ObjectFlagsNonInferrableType+ObjectFlagsCouldContainTypeVariablesComputed+ObjectFlagsCouldContainTypeVariables+ObjectFlagsMembersResolved+ObjectFlagsClassOrInterface+ObjectFlagsRequiresWidening+ObjectFlagsPropagatingFlags+ObjectFlagsInstantiatedMapped+ObjectFlagsObjectTypeKindMask+ObjectFlagsContainsSpread+ObjectFlagsObjectRestType+ObjectFlagsInstantiationExpressionType+ObjectFlagsSingleSignatureType+ObjectFlagsIsClassInstanceClone+ObjectFlagsIdenticalBaseTypeCalculated+ObjectFlagsIdenticalBaseTypeExists+ObjectFlagsUnresolvedMembers+ObjectFlagsFromTypeNode+ObjectFlagsIsGenericTypeComputed+ObjectFlagsIsGenericObjectType+ObjectFlagsIsGenericIndexType+ObjectFlagsIsGenericType+ObjectFlagsContainsIntersections+ObjectFlagsIsUnknownLikeUnionComputed+ObjectFlagsIsUnknownLikeUnion+ObjectFlagsIsNeverIntersectionComputed+ObjectFlagsIsNeverIntersection+ObjectFlagsIsConstrainedTypeVariable","kind":"constGroup","status":"implemented","sigHash":"435d7a7f26df8826593b2b0dfd3c731db0b463e0b5c7aef6eb6057bc9721549c"}
 *
 * Go source:
 * const (
 * 	ObjectFlagsNone                                       ObjectFlags = 0
 * 	ObjectFlagsClass                                      ObjectFlags = 1 << 0  // Class
 * 	ObjectFlagsInterface                                  ObjectFlags = 1 << 1  // Interface
 * 	ObjectFlagsReference                                  ObjectFlags = 1 << 2  // Generic type reference
 * 	ObjectFlagsTuple                                      ObjectFlags = 1 << 3  // Synthesized generic tuple type
 * 	ObjectFlagsAnonymous                                  ObjectFlags = 1 << 4  // Anonymous
 * 	ObjectFlagsMapped                                     ObjectFlags = 1 << 5  // Mapped
 * 	ObjectFlagsInstantiated                               ObjectFlags = 1 << 6  // Instantiated anonymous or mapped type
 * 	ObjectFlagsObjectLiteral                              ObjectFlags = 1 << 7  // Originates in an object literal
 * 	ObjectFlagsEvolvingArray                              ObjectFlags = 1 << 8  // Evolving array type
 * 	ObjectFlagsObjectLiteralPatternWithComputedProperties ObjectFlags = 1 << 9  // Object literal pattern with computed properties
 * 	ObjectFlagsReverseMapped                              ObjectFlags = 1 << 10 // Object contains a property from a reverse-mapped type
 * 	ObjectFlagsJsxAttributes                              ObjectFlags = 1 << 11 // Jsx attributes type
 * 	ObjectFlagsJSLiteral                                  ObjectFlags = 1 << 12 // Object type declared in JS - disables errors on read/write of nonexisting members
 * 	ObjectFlagsFreshLiteral                               ObjectFlags = 1 << 13 // Fresh object literal
 * 	ObjectFlagsArrayLiteral                               ObjectFlags = 1 << 14 // Originates in an array literal
 * 	ObjectFlagsPrimitiveUnion                             ObjectFlags = 1 << 15 // Union of only primitive types
 * 	ObjectFlagsContainsWideningType                       ObjectFlags = 1 << 16 // Type is or contains undefined or null widening type
 * 	ObjectFlagsContainsObjectOrArrayLiteral               ObjectFlags = 1 << 17 // Type is or contains object literal type
 * 	ObjectFlagsNonInferrableType                          ObjectFlags = 1 << 18 // Type is or contains anyFunctionType or silentNeverType
 * 	ObjectFlagsCouldContainTypeVariablesComputed          ObjectFlags = 1 << 19 // CouldContainTypeVariables flag has been computed
 * 	ObjectFlagsCouldContainTypeVariables                  ObjectFlags = 1 << 20 // Type could contain a type variable
 * 	ObjectFlagsMembersResolved                            ObjectFlags = 1 << 21 // Members have been resolved
 * 
 * 	ObjectFlagsClassOrInterface   = ObjectFlagsClass | ObjectFlagsInterface
 * 	ObjectFlagsRequiresWidening   = ObjectFlagsContainsWideningType | ObjectFlagsContainsObjectOrArrayLiteral
 * 	ObjectFlagsPropagatingFlags   = ObjectFlagsContainsWideningType | ObjectFlagsContainsObjectOrArrayLiteral | ObjectFlagsNonInferrableType
 * 	ObjectFlagsInstantiatedMapped = ObjectFlagsMapped | ObjectFlagsInstantiated
 * 	// Object flags that uniquely identify the kind of ObjectType
 * 	ObjectFlagsObjectTypeKindMask = ObjectFlagsClassOrInterface | ObjectFlagsReference | ObjectFlagsTuple | ObjectFlagsAnonymous | ObjectFlagsMapped | ObjectFlagsReverseMapped | ObjectFlagsEvolvingArray | ObjectFlagsInstantiationExpressionType | ObjectFlagsSingleSignatureType
 * 	// Flags that require TypeFlags.Object
 * 	ObjectFlagsContainsSpread              = 1 << 22 // Object literal contains spread operation
 * 	ObjectFlagsObjectRestType              = 1 << 23 // Originates in object rest declaration
 * 	ObjectFlagsInstantiationExpressionType = 1 << 24 // Originates in instantiation expression
 * 	ObjectFlagsSingleSignatureType         = 1 << 25 // A single signature type extracted from a potentially broader type
 * 	ObjectFlagsIsClassInstanceClone        = 1 << 26 // Type is a clone of a class instance type
 * 	// Flags that require TypeFlags.Object and ObjectFlags.Reference
 * 	ObjectFlagsIdenticalBaseTypeCalculated = 1 << 27 // has had `getSingleBaseForNonAugmentingSubtype` invoked on it already
 * 	ObjectFlagsIdenticalBaseTypeExists     = 1 << 28 // has a defined cachedEquivalentBaseType member
 * 	ObjectFlagsUnresolvedMembers           = 1 << 29 // Member resolution in process
 * 	ObjectFlagsFromTypeNode                = 1 << 30 // Originates in resolution of AST type node
 * 	// Flags that require TypeFlags.UnionOrIntersection or TypeFlags.Substitution
 * 	ObjectFlagsIsGenericTypeComputed = 1 << 22 // IsGenericObjectType flag has been computed
 * 	ObjectFlagsIsGenericObjectType   = 1 << 23 // Union or intersection contains generic object type
 * 	ObjectFlagsIsGenericIndexType    = 1 << 24 // Union or intersection contains generic index type
 * 	ObjectFlagsIsGenericType         = ObjectFlagsIsGenericObjectType | ObjectFlagsIsGenericIndexType
 * 	// Flags that require TypeFlags.Union
 * 	ObjectFlagsContainsIntersections      = 1 << 25 // Union contains intersections
 * 	ObjectFlagsIsUnknownLikeUnionComputed = 1 << 26 // IsUnknownLikeUnion flag has been computed
 * 	ObjectFlagsIsUnknownLikeUnion         = 1 << 27 // Union of null, undefined, and empty object type
 * 	// Flags that require TypeFlags.Intersection
 * 	ObjectFlagsIsNeverIntersectionComputed = 1 << 25 // IsNeverLike flag has been computed
 * 	ObjectFlagsIsNeverIntersection         = 1 << 26 // Intersection reduces to never
 * 	ObjectFlagsIsConstrainedTypeVariable   = 1 << 27 // T & C, where T's constraint and C are primitives, object, or {}
 * )
 */
export const ObjectFlagsNone: ObjectFlags = 0;
export const ObjectFlagsClass: ObjectFlags = 1 << 0;
export const ObjectFlagsInterface: ObjectFlags = 1 << 1;
export const ObjectFlagsReference: ObjectFlags = 1 << 2;
export const ObjectFlagsTuple: ObjectFlags = 1 << 3;
export const ObjectFlagsAnonymous: ObjectFlags = 1 << 4;
export const ObjectFlagsMapped: ObjectFlags = 1 << 5;
export const ObjectFlagsInstantiated: ObjectFlags = 1 << 6;
export const ObjectFlagsObjectLiteral: ObjectFlags = 1 << 7;
export const ObjectFlagsEvolvingArray: ObjectFlags = 1 << 8;
export const ObjectFlagsObjectLiteralPatternWithComputedProperties: ObjectFlags = 1 << 9;
export const ObjectFlagsReverseMapped: ObjectFlags = 1 << 10;
export const ObjectFlagsJsxAttributes: ObjectFlags = 1 << 11;
export const ObjectFlagsJSLiteral: ObjectFlags = 1 << 12;
export const ObjectFlagsFreshLiteral: ObjectFlags = 1 << 13;
export const ObjectFlagsArrayLiteral: ObjectFlags = 1 << 14;
export const ObjectFlagsPrimitiveUnion: ObjectFlags = 1 << 15;
export const ObjectFlagsContainsWideningType: ObjectFlags = 1 << 16;
export const ObjectFlagsContainsObjectOrArrayLiteral: ObjectFlags = 1 << 17;
export const ObjectFlagsNonInferrableType: ObjectFlags = 1 << 18;
export const ObjectFlagsCouldContainTypeVariablesComputed: ObjectFlags = 1 << 19;
export const ObjectFlagsCouldContainTypeVariables: ObjectFlags = 1 << 20;
export const ObjectFlagsMembersResolved: ObjectFlags = 1 << 21;
export const ObjectFlagsClassOrInterface: ObjectFlags = (ObjectFlagsClass | ObjectFlagsInterface) >>> 0;
export const ObjectFlagsRequiresWidening: ObjectFlags =
  (ObjectFlagsContainsWideningType | ObjectFlagsContainsObjectOrArrayLiteral) >>> 0;
export const ObjectFlagsPropagatingFlags: ObjectFlags =
  (ObjectFlagsContainsWideningType | ObjectFlagsContainsObjectOrArrayLiteral | ObjectFlagsNonInferrableType) >>> 0;
export const ObjectFlagsInstantiatedMapped: ObjectFlags = (ObjectFlagsMapped | ObjectFlagsInstantiated) >>> 0;
export const ObjectFlagsObjectTypeKindMask: ObjectFlags =
  (ObjectFlagsClassOrInterface |
    ObjectFlagsReference |
    ObjectFlagsTuple |
    ObjectFlagsAnonymous |
    ObjectFlagsMapped |
    ObjectFlagsReverseMapped |
    ObjectFlagsEvolvingArray |
    (1 << 24) |
    (1 << 25)) >>>
  0;
export const ObjectFlagsContainsSpread: int = 1 << 22;
export const ObjectFlagsObjectRestType: int = 1 << 23;
export const ObjectFlagsInstantiationExpressionType: int = 1 << 24;
export const ObjectFlagsSingleSignatureType: int = 1 << 25;
export const ObjectFlagsIsClassInstanceClone: int = 1 << 26;
export const ObjectFlagsIdenticalBaseTypeCalculated: int = 1 << 27;
export const ObjectFlagsIdenticalBaseTypeExists: int = 1 << 28;
export const ObjectFlagsUnresolvedMembers: int = 1 << 29;
export const ObjectFlagsFromTypeNode: int = 1 << 30;
export const ObjectFlagsIsGenericTypeComputed: int = 1 << 22;
export const ObjectFlagsIsGenericObjectType: int = 1 << 23;
export const ObjectFlagsIsGenericIndexType: int = 1 << 24;
export const ObjectFlagsIsGenericType: int = (ObjectFlagsIsGenericObjectType | ObjectFlagsIsGenericIndexType) >>> 0;
export const ObjectFlagsContainsIntersections: int = 1 << 25;
export const ObjectFlagsIsUnknownLikeUnionComputed: int = 1 << 26;
export const ObjectFlagsIsUnknownLikeUnion: int = 1 << 27;
export const ObjectFlagsIsNeverIntersectionComputed: int = 1 << 25;
export const ObjectFlagsIsNeverIntersection: int = 1 << 26;
export const ObjectFlagsIsConstrainedTypeVariable: int = 1 << 27;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeAlias","kind":"type","status":"implemented","sigHash":"6b302ee2ca3d3aa440faae4a150d6dd86dd562e71461887666ecb08303a0d335"}
 *
 * Go source:
 * TypeAlias struct {
 * 	symbol        *ast.Symbol
 * 	typeArguments []*Type
 * }
 */
export interface TypeAlias {
  "symbol": GoPtr<Symbol_62f2f8bf>;
  typeArguments: GoSlice<GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeAlias.Symbol","kind":"method","status":"implemented","sigHash":"03f2c0317d6c373b2319092b7b3526584d13575c973317de60d5bb22acac6ff1"}
 *
 * Go source:
 * func (a *TypeAlias) Symbol() *ast.Symbol {
 * 	if a == nil {
 * 		return nil
 * 	}
 * 	return a.symbol
 * }
 */
export function TypeAlias_Symbol(receiver: GoPtr<TypeAlias>): GoPtr<Symbol_62f2f8bf> {
  if (receiver === undefined) {
    return undefined;
  }
  return receiver.symbol;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeAlias.TypeArguments","kind":"method","status":"implemented","sigHash":"d9ec20c58e98fbec383d651b650d376b181246db0cfb567dd34d2a72b1e0566b"}
 *
 * Go source:
 * func (a *TypeAlias) TypeArguments() []*Type {
 * 	if a == nil {
 * 		return nil
 * 	}
 * 	return a.typeArguments
 * }
 */
export function TypeAlias_TypeArguments(receiver: GoPtr<TypeAlias>): GoSlice<GoPtr<Type>> {
  if (receiver === undefined) {
    return GoNilSlice<GoPtr<Type>>();
  }
  return receiver.typeArguments;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::Type","kind":"type","status":"implemented","sigHash":"dd759ee9f467265fa23f157c699db0efdd1629e4718d49d55d40b5d493db9c13"}
 *
 * Go source:
 * Type struct {
 * 	flags       TypeFlags
 * 	objectFlags ObjectFlags
 * 	id          TypeId
 * 	symbol      *ast.Symbol
 * 	alias       *TypeAlias
 * 	checker     *Checker
 * 	data        TypeData // Type specific data
 * }
 */
export interface Type {
  flags: TypeFlags;
  objectFlags: ObjectFlags;
  id: TypeId;
  "symbol": GoPtr<Symbol_62f2f8bf>;
  alias: GoPtr<TypeAlias>;
  checker: GoPtr<Checker>;
  data: GoInterface<TypeData>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.Id","kind":"method","status":"implemented","sigHash":"518f3d45f8647a78a1e3535877ae7aa529b9ccfc1877c75c14c3a7ce82f199d8"}
 *
 * Go source:
 * func (t *Type) Id() TypeId {
 * 	return t.id
 * }
 */
export function Type_Id(receiver: GoPtr<Type>): TypeId {
  return receiver!.id;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.Flags","kind":"method","status":"implemented","sigHash":"be75c891bf532e9ba5a61543f9d32db38e5754fa447e16fbe4b8b08c2d64abe0"}
 *
 * Go source:
 * func (t *Type) Flags() TypeFlags {
 * 	return t.flags
 * }
 */
export function Type_Flags(receiver: GoPtr<Type>): TypeFlags {
  return receiver!.flags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.ObjectFlags","kind":"method","status":"implemented","sigHash":"60f63cfd3c80a9ca4f09ec14bda620045275abcd1379844393850dd0576eaced"}
 *
 * Go source:
 * func (t *Type) ObjectFlags() ObjectFlags {
 * 	return t.objectFlags
 * }
 */
export function Type_ObjectFlags(receiver: GoPtr<Type>): ObjectFlags {
  return receiver!.objectFlags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsIntrinsicType","kind":"method","status":"implemented","sigHash":"bafa2bf5db9ed4509b66f16166bf7ebde5d99a0377e360adb4fd928dc616d295"}
 *
 * Go source:
 * func (t *Type) AsIntrinsicType() *IntrinsicType           { return t.data.(*IntrinsicType) }
 */
export function Type_AsIntrinsicType(receiver: GoPtr<Type>): GoPtr<IntrinsicType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<IntrinsicType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsLiteralType","kind":"method","status":"implemented","sigHash":"d081823d72424d92910f6a6af433f67e554b98c8e56b5b68b51d71dfaf31d06c"}
 *
 * Go source:
 * func (t *Type) AsLiteralType() *LiteralType               { return t.data.(*LiteralType) }
 */
export function Type_AsLiteralType(receiver: GoPtr<Type>): GoPtr<LiteralType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<LiteralType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsUniqueESSymbolType","kind":"method","status":"implemented","sigHash":"d0cb68b1a774ed5a474976d50336b8f211791532e2ccdc386505f7be97d3b7fc"}
 *
 * Go source:
 * func (t *Type) AsUniqueESSymbolType() *UniqueESSymbolType { return t.data.(*UniqueESSymbolType) }
 */
export function Type_AsUniqueESSymbolType(receiver: GoPtr<Type>): GoPtr<UniqueESSymbolType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<UniqueESSymbolType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsTupleType","kind":"method","status":"implemented","sigHash":"87a6244ee7a1556ef6f22cd73b56c58d9a2d7813fce71fd8c0c9ea2f9c337f4e"}
 *
 * Go source:
 * func (t *Type) AsTupleType() *TupleType                   { return t.data.(*TupleType) }
 */
export function Type_AsTupleType(receiver: GoPtr<Type>): GoPtr<TupleType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<TupleType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsInstantiationExpressionType","kind":"method","status":"implemented","sigHash":"388e7aba0d3d7083193298dbce1a0a160a24ebd5849ac250b10c109d8d6d236b"}
 *
 * Go source:
 * func (t *Type) AsInstantiationExpressionType() *InstantiationExpressionType {
 * 	return t.data.(*InstantiationExpressionType)
 * }
 */
export function Type_AsInstantiationExpressionType(receiver: GoPtr<Type>): GoPtr<InstantiationExpressionType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<InstantiationExpressionType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsMappedType","kind":"method","status":"implemented","sigHash":"426cf1c601b4e4293f4286ecd4d75b177c928ac8a2295a12a14add33ab7e7113"}
 *
 * Go source:
 * func (t *Type) AsMappedType() *MappedType                   { return t.data.(*MappedType) }
 */
export function Type_AsMappedType(receiver: GoPtr<Type>): GoPtr<MappedType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<MappedType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsReverseMappedType","kind":"method","status":"implemented","sigHash":"7ebfa87e3c5eae1ed51cafadf832529d59920f56fa97fba8289c851175fbcee0"}
 *
 * Go source:
 * func (t *Type) AsReverseMappedType() *ReverseMappedType     { return t.data.(*ReverseMappedType) }
 */
export function Type_AsReverseMappedType(receiver: GoPtr<Type>): GoPtr<ReverseMappedType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<ReverseMappedType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsEvolvingArrayType","kind":"method","status":"implemented","sigHash":"06e45dd2705910c80e62ef39581c8bfabcc8b37decf2ddbbcfbf053274365fed"}
 *
 * Go source:
 * func (t *Type) AsEvolvingArrayType() *EvolvingArrayType     { return t.data.(*EvolvingArrayType) }
 */
export function Type_AsEvolvingArrayType(receiver: GoPtr<Type>): GoPtr<EvolvingArrayType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<EvolvingArrayType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsTypeParameter","kind":"method","status":"implemented","sigHash":"6f39183439fb1457462463d7fcbc5ab57e065eaf6a038782df50ad414d7fb8ce"}
 *
 * Go source:
 * func (t *Type) AsTypeParameter() *TypeParameter             { return t.data.(*TypeParameter) }
 */
export function Type_AsTypeParameter(receiver: GoPtr<Type>): GoPtr<TypeParameter> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<TypeParameter>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsUnionType","kind":"method","status":"implemented","sigHash":"136091f1163310e107053fee430ab40ba210c1ab91a08b15416cc2ee9b284c2c"}
 *
 * Go source:
 * func (t *Type) AsUnionType() *UnionType                     { return t.data.(*UnionType) }
 */
export function Type_AsUnionType(receiver: GoPtr<Type>): GoPtr<UnionType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<UnionType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsIntersectionType","kind":"method","status":"implemented","sigHash":"d583537b5bf8e5811adb00f0a8b15d3c805c0571991c7172c01de64f7ada0fa4"}
 *
 * Go source:
 * func (t *Type) AsIntersectionType() *IntersectionType       { return t.data.(*IntersectionType) }
 */
export function Type_AsIntersectionType(receiver: GoPtr<Type>): GoPtr<IntersectionType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<IntersectionType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsIndexType","kind":"method","status":"implemented","sigHash":"43098053b544c1e90e7f382c6aa9839726a57da1f17a7f98f46797919859cdd5"}
 *
 * Go source:
 * func (t *Type) AsIndexType() *IndexType                     { return t.data.(*IndexType) }
 */
export function Type_AsIndexType(receiver: GoPtr<Type>): GoPtr<IndexType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<IndexType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsIndexedAccessType","kind":"method","status":"implemented","sigHash":"e17cbd5aa71ba9571419598c20a4a4a3c1881646fd369185e34052a41237ba38"}
 *
 * Go source:
 * func (t *Type) AsIndexedAccessType() *IndexedAccessType     { return t.data.(*IndexedAccessType) }
 */
export function Type_AsIndexedAccessType(receiver: GoPtr<Type>): GoPtr<IndexedAccessType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<IndexedAccessType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsTemplateLiteralType","kind":"method","status":"implemented","sigHash":"97be9b2d9fad4c21e5f0c29f9037c59f430ea1f08c643de4ccafd368c84c31e4"}
 *
 * Go source:
 * func (t *Type) AsTemplateLiteralType() *TemplateLiteralType { return t.data.(*TemplateLiteralType) }
 */
export function Type_AsTemplateLiteralType(receiver: GoPtr<Type>): GoPtr<TemplateLiteralType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<TemplateLiteralType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsStringMappingType","kind":"method","status":"implemented","sigHash":"9ff7467fbc4a0c985c3bb653a83185ee638863d80a02b7fc70c1d0d3dfe1f79a"}
 *
 * Go source:
 * func (t *Type) AsStringMappingType() *StringMappingType     { return t.data.(*StringMappingType) }
 */
export function Type_AsStringMappingType(receiver: GoPtr<Type>): GoPtr<StringMappingType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<StringMappingType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsSubstitutionType","kind":"method","status":"implemented","sigHash":"c6b48a24a585afe46371390a644f6a079082a878b51195c6a97d0377c15c01ad"}
 *
 * Go source:
 * func (t *Type) AsSubstitutionType() *SubstitutionType       { return t.data.(*SubstitutionType) }
 */
export function Type_AsSubstitutionType(receiver: GoPtr<Type>): GoPtr<SubstitutionType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<SubstitutionType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsConditionalType","kind":"method","status":"implemented","sigHash":"158a4febf73f669bb544732c49e04d23706f97c74197c495e2c7a34f1d9bad6c"}
 *
 * Go source:
 * func (t *Type) AsConditionalType() *ConditionalType         { return t.data.(*ConditionalType) }
 */
export function Type_AsConditionalType(receiver: GoPtr<Type>): GoPtr<ConditionalType> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<ConditionalType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsConstrainedType","kind":"method","status":"implemented","sigHash":"0a1aa0583fe9a45708c0610ad0ed6b1e0b3302c4f605cca478598e81095760d4"}
 *
 * Go source:
 * func (t *Type) AsConstrainedType() *ConstrainedType { return t.data.AsConstrainedType() }
 */
export function Type_AsConstrainedType(receiver: GoPtr<Type>): GoPtr<ConstrainedType> {
  return receiver!.data!.AsConstrainedType();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsStructuredType","kind":"method","status":"implemented","sigHash":"a25f906f2c7508f52455bda1fc74fd5941bd15d8d5a78fc622493471d48db5ea"}
 *
 * Go source:
 * func (t *Type) AsStructuredType() *StructuredType   { return t.data.AsStructuredType() }
 */
export function Type_AsStructuredType(receiver: GoPtr<Type>): GoPtr<StructuredType> {
  return receiver!.data!.AsStructuredType();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsObjectType","kind":"method","status":"implemented","sigHash":"994b136944e27fdaf9ac19ddae957a2e83a40c764290a7cbf7182ed735e1d4bf"}
 *
 * Go source:
 * func (t *Type) AsObjectType() *ObjectType           { return t.data.AsObjectType() }
 */
export function Type_AsObjectType(receiver: GoPtr<Type>): GoPtr<ObjectType> {
  return receiver!.data!.AsObjectType();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsTypeReference","kind":"method","status":"implemented","sigHash":"af35e46575166a6d2b958b70c866654d358ee253439cde1c9cf3fff7b0c73ab4"}
 *
 * Go source:
 * func (t *Type) AsTypeReference() *TypeReference     { return t.data.AsTypeReference() }
 */
export function Type_AsTypeReference(receiver: GoPtr<Type>): GoPtr<TypeReference> {
  return receiver!.data!.AsTypeReference();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsInterfaceType","kind":"method","status":"implemented","sigHash":"9f9bf1e073a8bbd88eb30b2649400eb9e6e8494e5e7137fd521f918b6d7b174a"}
 *
 * Go source:
 * func (t *Type) AsInterfaceType() *InterfaceType     { return t.data.AsInterfaceType() }
 */
export function Type_AsInterfaceType(receiver: GoPtr<Type>): GoPtr<InterfaceType> {
  return receiver!.data!.AsInterfaceType();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.AsUnionOrIntersectionType","kind":"method","status":"implemented","sigHash":"007cb64fcc9a687151fe86cc95d364eade94d072d8fcd725026a00e5b0b14916"}
 *
 * Go source:
 * func (t *Type) AsUnionOrIntersectionType() *UnionOrIntersectionType {
 * 	return t.data.AsUnionOrIntersectionType()
 * }
 */
export function Type_AsUnionOrIntersectionType(receiver: GoPtr<Type>): GoPtr<UnionOrIntersectionType> {
  return receiver!.data!.AsUnionOrIntersectionType();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.Distributed","kind":"method","status":"implemented","sigHash":"0afe44ed5106ce9b540080812ada8a576d717fe3203cfa9dd8ef8391c354c4bc"}
 *
 * Go source:
 * func (t *Type) Distributed() []*Type {
 * 	switch {
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return t.AsUnionType().types
 * 	case t.flags&TypeFlagsNever != 0:
 * 		return nil
 * 	}
 * 	return []*Type{t}
 * }
 */
export function Type_Distributed(receiver: GoPtr<Type>): GoSlice<GoPtr<Type>> {
  if ((receiver!.flags & TypeFlagsUnion) !== 0) {
    return Type_Types(receiver);
  }
  if ((receiver!.flags & TypeFlagsNever) !== 0) {
    return [] as GoSlice<GoPtr<Type>>;
  }
  return [receiver];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.Target","kind":"method","status":"implemented","sigHash":"639e2f08a40f08aa283add5f5714a8b78b447267f9fa6b48bccb98e17d0dbbf1"}
 *
 * Go source:
 * func (t *Type) Target() *Type {
 * 	switch {
 * 	case t.flags&TypeFlagsObject != 0:
 * 		return t.AsObjectType().target
 * 	case t.flags&TypeFlagsTypeParameter != 0:
 * 		return t.AsTypeParameter().target
 * 	case t.flags&TypeFlagsIndex != 0:
 * 		return t.AsIndexType().target
 * 	case t.flags&TypeFlagsStringMapping != 0:
 * 		return t.AsStringMappingType().target
 * 	case t.flags&TypeFlagsObject != 0 && t.objectFlags&ObjectFlagsMapped != 0:
 * 		return t.AsMappedType().target
 * 	}
 * 	panic("Unhandled case in Type.Target")
 * }
 */
export function Type_Target(receiver: GoPtr<Type>): GoPtr<Type> {
  if ((receiver!.flags & TypeFlagsObject) !== 0) {
    return Type_AsObjectType(receiver)!.target;
  }
  if ((receiver!.flags & TypeFlagsTypeParameter) !== 0) {
    return Type_AsTypeParameter(receiver)!.target;
  }
  if ((receiver!.flags & TypeFlagsIndex) !== 0) {
    return Type_AsIndexType(receiver)!.target;
  }
  if ((receiver!.flags & TypeFlagsStringMapping) !== 0) {
    return Type_AsStringMappingType(receiver)!.target;
  }
  if ((receiver!.flags & TypeFlagsObject) !== 0 && (receiver!.objectFlags & ObjectFlagsMapped) !== 0) {
    return Type_AsMappedType(receiver)!.__tsgoEmbedded0!.target;
  }
  throw new globalThis.Error("Unhandled case in Type.Target");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.Mapper","kind":"method","status":"implemented","sigHash":"87756a05b39fe728017dabeba662b4de2a5a466abadf9d5fc453cb0ba48c72ef"}
 *
 * Go source:
 * func (t *Type) Mapper() *TypeMapper {
 * 	switch {
 * 	case t.flags&TypeFlagsObject != 0:
 * 		return t.AsObjectType().mapper
 * 	case t.flags&TypeFlagsTypeParameter != 0:
 * 		return t.AsTypeParameter().mapper
 * 	case t.flags&TypeFlagsConditional != 0:
 * 		return t.AsConditionalType().mapper
 * 	}
 * 	panic("Unhandled case in Type.Mapper")
 * }
 */
export function Type_Mapper(receiver: GoPtr<Type>): GoPtr<TypeMapper> {
  if ((receiver!.flags & TypeFlagsObject) !== 0) {
    return Type_AsObjectType(receiver)!.mapper;
  }
  if ((receiver!.flags & TypeFlagsTypeParameter) !== 0) {
    return Type_AsTypeParameter(receiver)!.mapper;
  }
  if ((receiver!.flags & TypeFlagsConditional) !== 0) {
    return Type_AsConditionalType(receiver)!.mapper;
  }
  throw new globalThis.Error("Unhandled case in Type.Mapper");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.Types","kind":"method","status":"implemented","sigHash":"77acb477a1bc9608a1aacc5a0bc1f5a8896878c4cb9c01b1418fdd59ece9d62f"}
 *
 * Go source:
 * func (t *Type) Types() []*Type {
 * 	switch {
 * 	case t.flags&TypeFlagsUnionOrIntersection != 0:
 * 		return t.AsUnionOrIntersectionType().types
 * 	case t.flags&TypeFlagsTemplateLiteral != 0:
 * 		return t.AsTemplateLiteralType().types
 * 	}
 * 	panic("Unhandled case in Type.Types")
 * }
 */
export function Type_Types(receiver: GoPtr<Type>): GoSlice<GoPtr<Type>> {
  if ((receiver!.flags & TypeFlagsUnionOrIntersection) !== 0) {
    return Type_AsUnionOrIntersectionType(receiver)!.types;
  }
  if ((receiver!.flags & TypeFlagsTemplateLiteral) !== 0) {
    return Type_AsTemplateLiteralType(receiver)!.types;
  }
  throw new globalThis.Error("Unhandled case in Type.Types");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.TargetInterfaceType","kind":"method","status":"implemented","sigHash":"70291551ad346997a2cdc44373dd81a04f3aa4e22645727b5279200b1980933f"}
 *
 * Go source:
 * func (t *Type) TargetInterfaceType() *InterfaceType {
 * 	return t.AsTypeReference().target.AsInterfaceType()
 * }
 */
export function Type_TargetInterfaceType(receiver: GoPtr<Type>): GoPtr<InterfaceType> {
  return Type_AsInterfaceType(Type_Target(receiver));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.TargetTupleType","kind":"method","status":"implemented","sigHash":"1fea9c5b0efe228163ee00d7c3a8c02487a87592a298a5abeea386548738e51c"}
 *
 * Go source:
 * func (t *Type) TargetTupleType() *TupleType {
 * 	return t.AsTypeReference().target.AsTupleType()
 * }
 */
export function Type_TargetTupleType(receiver: GoPtr<Type>): GoPtr<TupleType> {
  return Type_AsTupleType(Type_Target(receiver));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.Symbol","kind":"method","status":"implemented","sigHash":"1320d383095dcf79a15f6abc6b9cc17237406a3e73d1d39ae28e4f3a22f6c39f"}
 *
 * Go source:
 * func (t *Type) Symbol() *ast.Symbol {
 * 	return t.symbol
 * }
 */
export function Type_Symbol(receiver: GoPtr<Type>): GoPtr<Symbol_62f2f8bf> {
  return receiver!.symbol;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.Alias","kind":"method","status":"implemented","sigHash":"36884e753a632b0bf858499b32915c0021c7109e26f63e627795171f2d404b51"}
 *
 * Go source:
 * func (t *Type) Alias() *TypeAlias {
 * 	return t.alias
 * }
 */
export function Type_Alias(receiver: GoPtr<Type>): GoPtr<TypeAlias> {
  return receiver!.alias;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsUnion","kind":"method","status":"implemented","sigHash":"e2db35f5282304268763587807ec788b48853145056a0159fb73766c0020702e"}
 *
 * Go source:
 * func (t *Type) IsUnion() bool {
 * 	return t.flags&TypeFlagsUnion != 0
 * }
 */
export function Type_IsUnion(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsUnion) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsString","kind":"method","status":"implemented","sigHash":"b67e49df65686a11fab01148042c8230e3c7cb29d8c679a0c7a6671ee0dd6d40"}
 *
 * Go source:
 * func (t *Type) IsString() bool {
 * 	return t.flags&TypeFlagsString != 0
 * }
 */
export function Type_IsString(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsString) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsIntersection","kind":"method","status":"implemented","sigHash":"3a17a65fe9a2a8f69ce4937389fca08f6b9e32c26a13ed10c94ee0aba9b9fa9f"}
 *
 * Go source:
 * func (t *Type) IsIntersection() bool {
 * 	return t.flags&TypeFlagsIntersection != 0
 * }
 */
export function Type_IsIntersection(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsIntersection) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsStringLiteral","kind":"method","status":"implemented","sigHash":"1fd4a4149fa59c55eef94bc551165b9a4e7e315138e147e6d913f7b9f8e539c4"}
 *
 * Go source:
 * func (t *Type) IsStringLiteral() bool {
 * 	return t.flags&TypeFlagsStringLiteral != 0
 * }
 */
export function Type_IsStringLiteral(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsStringLiteral) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsNumberLiteral","kind":"method","status":"implemented","sigHash":"e186ec9ed6bcafdf61d78fca1c6fdbbfb97cc4dc5c0417f0637379c1c706b080"}
 *
 * Go source:
 * func (t *Type) IsNumberLiteral() bool {
 * 	return t.flags&TypeFlagsNumberLiteral != 0
 * }
 */
export function Type_IsNumberLiteral(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsNumberLiteral) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsBigIntLiteral","kind":"method","status":"implemented","sigHash":"7e83d64a3a2631d6270f61c753acd1033c453e69ab51f0554378bf9e1e276ecc"}
 *
 * Go source:
 * func (t *Type) IsBigIntLiteral() bool {
 * 	return t.flags&TypeFlagsBigIntLiteral != 0
 * }
 */
export function Type_IsBigIntLiteral(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsBigIntLiteral) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsEnumLiteral","kind":"method","status":"implemented","sigHash":"4e509bd2c30802ebc9d5a7273994cf93c319a363fd9aaa7914922fcb69bb66ac"}
 *
 * Go source:
 * func (t *Type) IsEnumLiteral() bool {
 * 	return t.flags&TypeFlagsEnumLiteral != 0
 * }
 */
export function Type_IsEnumLiteral(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsEnumLiteral) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsBooleanLike","kind":"method","status":"implemented","sigHash":"511dbdb6881a55ad470d472fd09104e0f23884421c100390d244654c4cac8149"}
 *
 * Go source:
 * func (t *Type) IsBooleanLike() bool {
 * 	return t.flags&TypeFlagsBooleanLike != 0
 * }
 */
export function Type_IsBooleanLike(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsBooleanLike) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsStringLike","kind":"method","status":"implemented","sigHash":"233292245556b527c8610babd2b5dd58387e85d0e35112b34d5285ba26a91844"}
 *
 * Go source:
 * func (t *Type) IsStringLike() bool {
 * 	return t.flags&TypeFlagsStringLike != 0
 * }
 */
export function Type_IsStringLike(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsStringLike) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsClass","kind":"method","status":"implemented","sigHash":"ba5578976a5776b516727a8ba62d533a4b29af3f0502e0529db723d401855a01"}
 *
 * Go source:
 * func (t *Type) IsClass() bool {
 * 	return t.objectFlags&ObjectFlagsClass != 0
 * }
 */
export function Type_IsClass(receiver: GoPtr<Type>): bool {
  return (receiver!.objectFlags & ObjectFlagsClass) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsTypeParameter","kind":"method","status":"implemented","sigHash":"c4fb9230835fe3cea5461cb6802c42ca4f1e3fd6aa8cd8ed0542b353a27a28f5"}
 *
 * Go source:
 * func (t *Type) IsTypeParameter() bool {
 * 	return t.flags&TypeFlagsTypeParameter != 0
 * }
 */
export function Type_IsTypeParameter(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsTypeParameter) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsIndex","kind":"method","status":"implemented","sigHash":"71f0f14f3b2ace6c9eaa782eaa6c7e799c69d0cfaacd7556f170d6a0517569f4"}
 *
 * Go source:
 * func (t *Type) IsIndex() bool {
 * 	return t.flags&TypeFlagsIndex != 0
 * }
 */
export function Type_IsIndex(receiver: GoPtr<Type>): bool {
  return (receiver!.flags & TypeFlagsIndex) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Type.IsTupleType","kind":"method","status":"implemented","sigHash":"312167a2123a0d7b3480d35154a7bad0d1c75d9c12c2a3f830061d183652a8b4"}
 *
 * Go source:
 * func (t *Type) IsTupleType() bool {
 * 	return isTupleType(t)
 * }
 */
export function Type_IsTupleType(receiver: GoPtr<Type>): bool {
  return isTupleType(receiver);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeData","kind":"type","status":"implemented","sigHash":"0ec5506009102c9c902d214d0208a83965f94cc90c3b565daedd757c8c90926f"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The interface receiver carrier adds the static Go receiver operation required to preserve dynamic type dispatch without a side table or wrapper object.","goSignatureHash":"16843bbd579fbf691b26db94d7b60899c384a1173af409771b7976d9a9340cc9","tsSignatureHash":"fad9b10b6b6ef54ed3d2ea303897392bb535919b50ea5cb921ef2b89916ce2f5"}
 *
 * Go source:
 * TypeData interface {
 * 	AsType() *Type
 * 	AsConstrainedType() *ConstrainedType
 * 	AsStructuredType() *StructuredType
 * 	AsObjectType() *ObjectType
 * 	AsTypeReference() *TypeReference
 * 	AsInterfaceType() *InterfaceType
 * 	AsUnionOrIntersectionType() *UnionOrIntersectionType
 * }
 */
export interface TypeData extends GoInterfaceValue<unknown> {
  AsType(): GoPtr<Type>;
  AsConstrainedType(): GoPtr<ConstrainedType>;
  AsStructuredType(): GoPtr<StructuredType>;
  AsObjectType(): GoPtr<ObjectType>;
  AsTypeReference(): GoPtr<TypeReference>;
  AsInterfaceType(): GoPtr<InterfaceType>;
  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeBase","kind":"type","status":"implemented","sigHash":"12e53ba07002f6261f6f37b6462a637b55f055c33d5d917e1e699a0973a8e289"}
 *
 * Go source:
 * TypeBase struct {
 * 	Type
 * }
 */
export interface TypeBase {
  __tsgoEmbedded0: Type;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeBase.AsType","kind":"method","status":"implemented","sigHash":"f55eba3fb643aef5b1ca790bfb78ff0a5d9f26304d6d1f033ca88077b212f4f7"}
 *
 * Go source:
 * func (t *TypeBase) AsType() *Type                                       { return &t.Type }
 */
export function TypeBase_AsType(receiver: GoPtr<TypeBase>): GoPtr<Type> {
  return receiver!.__tsgoEmbedded0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeBase.AsConstrainedType","kind":"method","status":"implemented","sigHash":"a7900fef2295fb0d2bf1cf25443a892737fbc843a2727d4bb8e63b20453a32f1"}
 *
 * Go source:
 * func (t *TypeBase) AsConstrainedType() *ConstrainedType                 { return nil }
 */
export function TypeBase_AsConstrainedType(receiver: GoPtr<TypeBase>): GoPtr<ConstrainedType> {
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeBase.AsStructuredType","kind":"method","status":"implemented","sigHash":"176316684357fce4ca029288a7ed31182404c73760dd4324bdeb54dd837c1d81"}
 *
 * Go source:
 * func (t *TypeBase) AsStructuredType() *StructuredType                   { return nil }
 */
export function TypeBase_AsStructuredType(receiver: GoPtr<TypeBase>): GoPtr<StructuredType> {
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeBase.AsObjectType","kind":"method","status":"implemented","sigHash":"5f699180ec63e8da21100cbf62b6a6812dfabbe23c341f6030b10a0484f0cc0d"}
 *
 * Go source:
 * func (t *TypeBase) AsObjectType() *ObjectType                           { return nil }
 */
export function TypeBase_AsObjectType(receiver: GoPtr<TypeBase>): GoPtr<ObjectType> {
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeBase.AsTypeReference","kind":"method","status":"implemented","sigHash":"e38fd0ac3d7a74464dbc601d1d54b84a0480918ba786e930c37b59e7c5a38a5a"}
 *
 * Go source:
 * func (t *TypeBase) AsTypeReference() *TypeReference                     { return nil }
 */
export function TypeBase_AsTypeReference(receiver: GoPtr<TypeBase>): GoPtr<TypeReference> {
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeBase.AsInterfaceType","kind":"method","status":"implemented","sigHash":"5eb7e0a3d477b9a374b18516fa4807807f75e4bfd46171258a8bb0c1e6ee1dfd"}
 *
 * Go source:
 * func (t *TypeBase) AsInterfaceType() *InterfaceType                     { return nil }
 */
export function TypeBase_AsInterfaceType(receiver: GoPtr<TypeBase>): GoPtr<InterfaceType> {
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeBase.AsUnionOrIntersectionType","kind":"method","status":"implemented","sigHash":"9e97670b5afcc3a967e5f722e2cf3b9af9f4f0695656a4716d8d8e5357b9d250"}
 *
 * Go source:
 * func (t *TypeBase) AsUnionOrIntersectionType() *UnionOrIntersectionType { return nil }
 */
export function TypeBase_AsUnionOrIntersectionType(receiver: GoPtr<TypeBase>): GoPtr<UnionOrIntersectionType> {
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::IntrinsicType","kind":"type","status":"implemented","sigHash":"d1d1d09acd96bd166bb1096b05665542a0079a673ebf0aa0971385a8f42f9163"}
 *
 * Go source:
 * IntrinsicType struct {
 * 	TypeBase
 * 	intrinsicName string
 * }
 */
export interface IntrinsicType {
  __tsgoEmbedded0: TypeBase;
  intrinsicName: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::IntrinsicType.IntrinsicName","kind":"method","status":"implemented","sigHash":"236e47edf74e1dc797fc5e9f641fab9b6852b84d1257a05adde3cd6e16f559cd"}
 *
 * Go source:
 * func (t *IntrinsicType) IntrinsicName() string { return t.intrinsicName }
 */
export function IntrinsicType_IntrinsicName(receiver: GoPtr<IntrinsicType>): string {
  return receiver!.intrinsicName;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::LiteralType","kind":"type","status":"implemented","sigHash":"e8701dffa8b37c969d5ce68094fe1ecc90bd2362389447183709d1ca9d969be4"}
 *
 * Go source:
 * LiteralType struct {
 * 	TypeBase
 * 	value       any   // string | jsnum.Number | bool | PseudoBigInt | nil (computed enum)
 * 	freshType   *Type // Fresh version of type
 * 	regularType *Type // Regular version of type
 * }
 */
export interface LiteralType {
  __tsgoEmbedded0: TypeBase;
  value: GoInterface<unknown>;
  freshType: GoPtr<Type>;
  regularType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::LiteralType.Value","kind":"method","status":"implemented","sigHash":"35fa47edebde1c30983475f238ceb22a545437b46afc8b0fea3ee19e0b50015f"}
 *
 * Go source:
 * func (t *LiteralType) Value() any {
 * 	return t.value
 * }
 */
export function LiteralType_Value(receiver: GoPtr<LiteralType>): GoInterface<unknown> {
  return receiver!.value;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::LiteralType.FreshType","kind":"method","status":"implemented","sigHash":"a6f3f73ea5f030f96e4cc3b2512ea3bfd2ff3699bbec1e3cd560f16e16808fe9"}
 *
 * Go source:
 * func (t *LiteralType) FreshType() *Type {
 * 	return t.freshType
 * }
 */
export function LiteralType_FreshType(receiver: GoPtr<LiteralType>): GoPtr<Type> {
  return receiver!.freshType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::LiteralType.RegularType","kind":"method","status":"implemented","sigHash":"712fe3c873001e9e7b72ed2e006149d05e3f78a4bcfeb641182309ee79c9c29b"}
 *
 * Go source:
 * func (t *LiteralType) RegularType() *Type {
 * 	return t.regularType
 * }
 */
export function LiteralType_RegularType(receiver: GoPtr<LiteralType>): GoPtr<Type> {
  return receiver!.regularType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::LiteralType.String","kind":"method","status":"implemented","sigHash":"d4e06d0004c75c13ce4be9e7159fdea5ff817ea6adcfcc9d413a79c1023969fe"}
 *
 * Go source:
 * func (t *LiteralType) String() string {
 * 	return ValueToString(t.value)
 * }
 */
export function LiteralType_String(receiver: GoPtr<LiteralType>): string {
  return ValueToString(receiver!.value);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::UniqueESSymbolType","kind":"type","status":"implemented","sigHash":"6052753be10e596d8059b4fe678041d070ff4b414e037279363871d19cf1ed2a"}
 *
 * Go source:
 * UniqueESSymbolType struct {
 * 	TypeBase
 * 	name string
 * }
 */
export interface UniqueESSymbolType {
  __tsgoEmbedded0: TypeBase;
  name: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ConstrainedType","kind":"type","status":"implemented","sigHash":"0e56d3d2cbee140c3de25d0b6769cd814bad19795908a916adcbd0b1893eab3e"}
 *
 * Go source:
 * ConstrainedType struct {
 * 	TypeBase
 * 	resolvedBaseConstraint *Type
 * }
 */
export interface ConstrainedType {
  __tsgoEmbedded0: TypeBase;
  resolvedBaseConstraint: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::ConstrainedType.AsConstrainedType","kind":"method","status":"implemented","sigHash":"c880ecaae9699882dcd6669d38654a50ababcea5d3be40f99b1952ccdaa8c371"}
 *
 * Go source:
 * func (t *ConstrainedType) AsConstrainedType() *ConstrainedType { return t }
 */
export function ConstrainedType_AsConstrainedType(receiver: GoPtr<ConstrainedType>): GoPtr<ConstrainedType> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::StructuredType","kind":"type","status":"implemented","sigHash":"291dea22693e23a0dc4319edb02d8ffb9856fd084b9029dbd97c8d64d4dd2ff3"}
 *
 * Go source:
 * StructuredType struct {
 * 	ConstrainedType
 * 	members            ast.SymbolTable
 * 	properties         []*ast.Symbol
 * 	signatures         []*Signature // Signatures (call + construct)
 * 	callSignatureCount int          // Count of call signatures
 * 	indexInfos         []*IndexInfo
 * 
 * 	objectTypeWithoutAbstractConstructSignatures *Type
 * }
 */
export interface StructuredType {
  __tsgoEmbedded0: ConstrainedType;
  members: SymbolTable;
  properties: GoSlice<GoPtr<Symbol_62f2f8bf>>;
  signatures: GoSlice<GoPtr<Signature>>;
  callSignatureCount: int;
  indexInfos: GoSlice<GoPtr<IndexInfo>>;
  objectTypeWithoutAbstractConstructSignatures: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::StructuredType.AsStructuredType","kind":"method","status":"implemented","sigHash":"e97ed18efc8fdb481da5d6cd26383cdeeaee9d8cc3a2bb7c84cd1339559c478f"}
 *
 * Go source:
 * func (t *StructuredType) AsStructuredType() *StructuredType { return t }
 */
export function StructuredType_AsStructuredType(receiver: GoPtr<StructuredType>): GoPtr<StructuredType> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::StructuredType.CallSignatures","kind":"method","status":"implemented","sigHash":"9ee91e522a9cdc1dd4e12e51caf3dcaa20617b8ad869dc68d329a645e504e510"}
 *
 * Go source:
 * func (t *StructuredType) CallSignatures() []*Signature {
 * 	return slices.Clip(t.signatures[:t.callSignatureCount])
 * }
 */
export function StructuredType_CallSignatures(receiver: GoPtr<StructuredType>): GoSlice<GoPtr<Signature>> {
  if (GoSliceIsNil(receiver!.signatures)) {
    return GoNilSlice<GoPtr<Signature>>();
  }
  return Clip(receiver!.signatures.slice(0, receiver!.callSignatureCount));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::StructuredType.ConstructSignatures","kind":"method","status":"implemented","sigHash":"e3bd4814ac0551e38894fd3534b20e4cef3786360c4409d1ec414df65a702a1d"}
 *
 * Go source:
 * func (t *StructuredType) ConstructSignatures() []*Signature {
 * 	return slices.Clip(t.signatures[t.callSignatureCount:])
 * }
 */
export function StructuredType_ConstructSignatures(receiver: GoPtr<StructuredType>): GoSlice<GoPtr<Signature>> {
  if (GoSliceIsNil(receiver!.signatures)) {
    return GoNilSlice<GoPtr<Signature>>();
  }
  return Clip(receiver!.signatures.slice(receiver!.callSignatureCount));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::StructuredType.Properties","kind":"method","status":"implemented","sigHash":"9f309724b998ab56beaec07f3ba1bcb7de3db8821e3f18616524be80398db100"}
 *
 * Go source:
 * func (t *StructuredType) Properties() []*ast.Symbol {
 * 	return t.properties
 * }
 */
export function StructuredType_Properties(receiver: GoPtr<StructuredType>): GoSlice<GoPtr<Symbol_62f2f8bf>> {
  return receiver!.properties;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ObjectType","kind":"type","status":"implemented","sigHash":"c05fb66afcd915c1a6f96e14a40e483cc9be476bd99fdc01b3089275c08ee44a"}
 *
 * Go source:
 * ObjectType struct {
 * 	StructuredType
 * 	target         *Type                  // Target of instantiated type
 * 	mapper         *TypeMapper            // Type mapper for instantiated type
 * 	instantiations map[CacheHashKey]*Type // Map of type instantiations
 * }
 */
export interface ObjectType {
  __tsgoEmbedded0: StructuredType;
  target: GoPtr<Type>;
  mapper: GoPtr<TypeMapper>;
  instantiations: GoMap<CacheHashKey, GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::ObjectType.AsObjectType","kind":"method","status":"implemented","sigHash":"ce03b37145521609901c50507789fe7b1d7580fc7835781cb57108a8363f5f5f"}
 *
 * Go source:
 * func (t *ObjectType) AsObjectType() *ObjectType { return t }
 */
export function ObjectType_AsObjectType(receiver: GoPtr<ObjectType>): GoPtr<ObjectType> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeReference","kind":"type","status":"implemented","sigHash":"d5ad0dde2430c89d919b5289823b2cdfbfc2eaf79209f57bd478bb8c1a641f06"}
 *
 * Go source:
 * TypeReference struct {
 * 	ObjectType
 * 	node                  *ast.Node // TypeReferenceNode | ArrayTypeNode | TupleTypeNode when deferred, else nil
 * 	resolvedTypeArguments []*Type
 * }
 */
export interface TypeReference {
  __tsgoEmbedded0: ObjectType;
  node: GoPtr<Node>;
  resolvedTypeArguments: GoSlice<GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeReference.AsTypeReference","kind":"method","status":"implemented","sigHash":"c353fde55c4299c3d55529f4a20f9c83d527b2672d9eff43cf444f55e3b0a326"}
 *
 * Go source:
 * func (t *TypeReference) AsTypeReference() *TypeReference { return t }
 */
export function TypeReference_AsTypeReference(receiver: GoPtr<TypeReference>): GoPtr<TypeReference> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::InterfaceType","kind":"type","status":"implemented","sigHash":"6dd028cf65fe7b1a5f8ac408df734d1998a581bc118c4583024c4f140212e03e"}
 *
 * Go source:
 * InterfaceType struct {
 * 	TypeReference
 * 	allTypeParameters           []*Type // Type parameters (outer + local + thisType)
 * 	outerTypeParameterCount     int     // Count of outer type parameters
 * 	thisType                    *Type   // The "this" type (nil if none)
 * 	baseTypesResolved           bool
 * 	declaredMembersResolved     bool
 * 	resolvedBaseConstructorType *Type
 * 	resolvedBaseTypes           []*Type
 * 	declaredMembers             ast.SymbolTable // Declared members
 * 	declaredCallSignatures      []*Signature    // Declared call signatures
 * 	declaredConstructSignatures []*Signature    // Declared construct signatures
 * 	declaredIndexInfos          []*IndexInfo    // Declared index signatures
 * }
 */
export interface InterfaceType {
  __tsgoEmbedded0: TypeReference;
  allTypeParameters: GoSlice<GoPtr<Type>>;
  outerTypeParameterCount: int;
  thisType: GoPtr<Type>;
  baseTypesResolved: bool;
  declaredMembersResolved: bool;
  resolvedBaseConstructorType: GoPtr<Type>;
  resolvedBaseTypes: GoSlice<GoPtr<Type>>;
  declaredMembers: SymbolTable;
  declaredCallSignatures: GoSlice<GoPtr<Signature>>;
  declaredConstructSignatures: GoSlice<GoPtr<Signature>>;
  declaredIndexInfos: GoSlice<GoPtr<IndexInfo>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::InterfaceType.AsInterfaceType","kind":"method","status":"implemented","sigHash":"57cf879b8eeb9b318674bae6a5d86135b14cd272b619557100294ae987619811"}
 *
 * Go source:
 * func (t *InterfaceType) AsInterfaceType() *InterfaceType { return t }
 */
export function InterfaceType_AsInterfaceType(receiver: GoPtr<InterfaceType>): GoPtr<InterfaceType> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::InterfaceType.OuterTypeParameters","kind":"method","status":"implemented","sigHash":"cbb4a1786e726d57c2e34410a1e95e8bb63945125d7162e8d7eaa9208d9240ed"}
 *
 * Go source:
 * func (t *InterfaceType) OuterTypeParameters() []*Type {
 * 	if len(t.allTypeParameters) == 0 {
 * 		return nil
 * 	}
 * 	return slices.Clip(t.allTypeParameters[:t.outerTypeParameterCount])
 * }
 */
export function InterfaceType_OuterTypeParameters(receiver: GoPtr<InterfaceType>): GoSlice<GoPtr<Type>> {
  if (receiver!.allTypeParameters.length === 0) {
    return GoNilSlice<GoPtr<Type>>();
  }
  return Clip(receiver!.allTypeParameters.slice(0, receiver!.outerTypeParameterCount));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::InterfaceType.LocalTypeParameters","kind":"method","status":"implemented","sigHash":"156f045ad185e87091082c4afeb8e81f83124b39a49a8b9eadb9650cd0448ac0"}
 *
 * Go source:
 * func (t *InterfaceType) LocalTypeParameters() []*Type {
 * 	if len(t.allTypeParameters) == 0 {
 * 		return nil
 * 	}
 * 	return slices.Clip(t.allTypeParameters[t.outerTypeParameterCount : len(t.allTypeParameters)-1])
 * }
 */
export function InterfaceType_LocalTypeParameters(receiver: GoPtr<InterfaceType>): GoSlice<GoPtr<Type>> {
  if (receiver!.allTypeParameters.length === 0) {
    return GoNilSlice<GoPtr<Type>>();
  }
  return Clip(receiver!.allTypeParameters.slice(receiver!.outerTypeParameterCount, receiver!.allTypeParameters.length - 1));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::InterfaceType.TypeParameters","kind":"method","status":"implemented","sigHash":"59aab3955045e9e6f84eb4162f605651d04496626dad902d536164878f5fe7a8"}
 *
 * Go source:
 * func (t *InterfaceType) TypeParameters() []*Type {
 * 	if len(t.allTypeParameters) == 0 {
 * 		return nil
 * 	}
 * 	return slices.Clip(t.allTypeParameters[:len(t.allTypeParameters)-1])
 * }
 */
export function InterfaceType_TypeParameters(receiver: GoPtr<InterfaceType>): GoSlice<GoPtr<Type>> {
  if (receiver!.allTypeParameters.length === 0) {
    return GoNilSlice<GoPtr<Type>>();
  }
  return Clip(receiver!.allTypeParameters.slice(0, receiver!.allTypeParameters.length - 1));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ElementFlags","kind":"type","status":"implemented","sigHash":"ac082d2e1b5aec09d512610abc268b2aa3a44e61696fc5e985e0664d01e04ec2"}
 *
 * Go source:
 * ElementFlags uint32
 */
export type ElementFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::ElementFlagsNone+ElementFlagsRequired+ElementFlagsOptional+ElementFlagsRest+ElementFlagsVariadic+ElementFlagsFixed+ElementFlagsVariable+ElementFlagsNonRequired+ElementFlagsNonRest","kind":"constGroup","status":"implemented","sigHash":"3d0c4d2ebdcaf2f5bbd72f82e3f38b3178f133fea8b561162b6e68e5b479d53d"}
 *
 * Go source:
 * const (
 * 	ElementFlagsNone        ElementFlags = 0
 * 	ElementFlagsRequired    ElementFlags = 1 << 0 // T
 * 	ElementFlagsOptional    ElementFlags = 1 << 1 // T?
 * 	ElementFlagsRest        ElementFlags = 1 << 2 // ...T[]
 * 	ElementFlagsVariadic    ElementFlags = 1 << 3 // ...T
 * 	ElementFlagsFixed                    = ElementFlagsRequired | ElementFlagsOptional
 * 	ElementFlagsVariable                 = ElementFlagsRest | ElementFlagsVariadic
 * 	ElementFlagsNonRequired              = ElementFlagsOptional | ElementFlagsRest | ElementFlagsVariadic
 * 	ElementFlagsNonRest                  = ElementFlagsRequired | ElementFlagsOptional | ElementFlagsVariadic
 * )
 */
export const ElementFlagsNone: ElementFlags = 0;
export const ElementFlagsRequired: ElementFlags = 1 << 0;
export const ElementFlagsOptional: ElementFlags = 1 << 1;
export const ElementFlagsRest: ElementFlags = 1 << 2;
export const ElementFlagsVariadic: ElementFlags = 1 << 3;
export const ElementFlagsFixed: ElementFlags = (ElementFlagsRequired | ElementFlagsOptional) >>> 0;
export const ElementFlagsVariable: ElementFlags = (ElementFlagsRest | ElementFlagsVariadic) >>> 0;
export const ElementFlagsNonRequired: ElementFlags = (ElementFlagsOptional | ElementFlagsRest | ElementFlagsVariadic) >>> 0;
export const ElementFlagsNonRest: ElementFlags = (ElementFlagsRequired | ElementFlagsOptional | ElementFlagsVariadic) >>> 0;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TupleElementInfo","kind":"type","status":"implemented","sigHash":"8ed4a5028e3cdc0e45747b734e6498978906fed423918663179a1f770767f925"}
 *
 * Go source:
 * TupleElementInfo struct {
 * 	flags              ElementFlags
 * 	labeledDeclaration *ast.Node // NamedTupleMember | ParameterDeclaration | nil
 * }
 */
export interface TupleElementInfo {
  flags: ElementFlags;
  labeledDeclaration: GoPtr<Node>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TupleElementInfo.TupleElementFlags","kind":"method","status":"implemented","sigHash":"355ad4488ed1b95c13b99386b6cacf18b08a428879611b1be24b7db39bb3ffab"}
 *
 * Go source:
 * func (t *TupleElementInfo) TupleElementFlags() ElementFlags { return t.flags }
 */
export function TupleElementInfo_TupleElementFlags(receiver: GoPtr<TupleElementInfo>): ElementFlags {
  return receiver!.flags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TupleElementInfo.LabeledDeclaration","kind":"method","status":"implemented","sigHash":"8b520c8ee4de8405dad3464a7200e4b61e590053568094a5c60dfb8822a3dfad"}
 *
 * Go source:
 * func (t *TupleElementInfo) LabeledDeclaration() *ast.Node   { return t.labeledDeclaration }
 */
export function TupleElementInfo_LabeledDeclaration(receiver: GoPtr<TupleElementInfo>): GoPtr<Node> {
  return receiver!.labeledDeclaration;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TupleType","kind":"type","status":"implemented","sigHash":"0cc23e94d40cf8d3b62c7b6d4bf838eb759e07ff43b6c041c33921ed9299ce70"}
 *
 * Go source:
 * TupleType struct {
 * 	InterfaceType
 * 	elementInfos  []TupleElementInfo
 * 	minLength     int // Number of required or variadic elements
 * 	fixedLength   int // Number of initial required or optional elements
 * 	combinedFlags ElementFlags
 * 	readonly      bool
 * }
 */
export interface TupleType {
  __tsgoEmbedded0: InterfaceType;
  elementInfos: GoSlice<TupleElementInfo>;
  minLength: int;
  fixedLength: int;
  combinedFlags: ElementFlags;
  readonly: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TupleType.FixedLength","kind":"method","status":"implemented","sigHash":"1c1313f89a7632f9a1b53be6130b0723f4a977adce3a7830cd00f1fa45fac869"}
 *
 * Go source:
 * func (t *TupleType) FixedLength() int { return t.fixedLength }
 */
export function TupleType_FixedLength(receiver: GoPtr<TupleType>): int {
  return receiver!.fixedLength;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TupleType.IsReadonly","kind":"method","status":"implemented","sigHash":"466790d78eb0ce996d251e855729e1e7013b01b1cb76b47d9d10efe9fb173499"}
 *
 * Go source:
 * func (t *TupleType) IsReadonly() bool { return t.readonly }
 */
export function TupleType_IsReadonly(receiver: GoPtr<TupleType>): bool {
  return receiver!.readonly;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TupleType.ElementFlags","kind":"method","status":"implemented","sigHash":"c7173d24b254b34116e09387864937ea26237272735e8cc9e4de2c723a13d7b1"}
 *
 * Go source:
 * func (t *TupleType) ElementFlags() []ElementFlags {
 * 	elementFlags := make([]ElementFlags, len(t.elementInfos))
 * 	for i, info := range t.elementInfos {
 * 		elementFlags[i] = info.flags
 * 	}
 * 	return elementFlags
 * }
 */
export function TupleType_ElementFlags(receiver: GoPtr<TupleType>): GoSlice<ElementFlags> {
  return receiver!.elementInfos.map((info) => info.flags);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TupleType.ElementInfos","kind":"method","status":"implemented","sigHash":"5783e5665a3a66e09dea7662982b1f11c5d2200cc01a75470953d47e41765dd5"}
 *
 * Go source:
 * func (t *TupleType) ElementInfos() []TupleElementInfo { return t.elementInfos }
 */
export function TupleType_ElementInfos(receiver: GoPtr<TupleType>): GoSlice<TupleElementInfo> {
  return receiver!.elementInfos;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::InstantiationExpressionType","kind":"type","status":"implemented","sigHash":"957aa6779a36b14bdb5965364423ad84f054e4237ce2438a3d0c7b97c7e6fa64"}
 *
 * Go source:
 * InstantiationExpressionType struct {
 * 	ObjectType
 * 	node *ast.Node
 * }
 */
export interface InstantiationExpressionType {
  __tsgoEmbedded0: ObjectType;
  node: GoPtr<Node>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::MappedType","kind":"type","status":"implemented","sigHash":"e95dd42afdb903964244c5a6d609500c63d2c8b3f4c39c73ac6a26669e0c91df"}
 *
 * Go source:
 * MappedType struct {
 * 	ObjectType
 * 	declaration          *ast.MappedTypeNode
 * 	typeParameter        *Type
 * 	constraintType       *Type
 * 	nameType             *Type
 * 	templateType         *Type
 * 	modifiersType        *Type
 * 	resolvedApparentType *Type
 * 	containsError        bool
 * }
 */
export interface MappedType {
  __tsgoEmbedded0: ObjectType;
  declaration: GoPtr<MappedTypeNode>;
  typeParameter: GoPtr<Type>;
  constraintType: GoPtr<Type>;
  nameType: GoPtr<Type>;
  templateType: GoPtr<Type>;
  modifiersType: GoPtr<Type>;
  resolvedApparentType: GoPtr<Type>;
  containsError: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ReverseMappedType","kind":"type","status":"implemented","sigHash":"78f05e2e21951f0783d7303f670e0fad2b5032afaedf8a2a258affa3ebdc34cd"}
 *
 * Go source:
 * ReverseMappedType struct {
 * 	ObjectType
 * 	source         *Type
 * 	mappedType     *Type
 * 	constraintType *Type
 * }
 */
export interface ReverseMappedType {
  __tsgoEmbedded0: ObjectType;
  source: GoPtr<Type>;
  mappedType: GoPtr<Type>;
  constraintType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::EvolvingArrayType","kind":"type","status":"implemented","sigHash":"54826118169c995f10b3c51b9c18d6ec5e1a956ca9c157ea702364b922fe60ef"}
 *
 * Go source:
 * EvolvingArrayType struct {
 * 	ObjectType
 * 	elementType    *Type
 * 	finalArrayType *Type
 * }
 */
export interface EvolvingArrayType {
  __tsgoEmbedded0: ObjectType;
  elementType: GoPtr<Type>;
  finalArrayType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::UnionOrIntersectionType","kind":"type","status":"implemented","sigHash":"3630b6a7a9959024244f24dc47637d781efc754ed09697edadfa42d8d195fc80"}
 *
 * Go source:
 * UnionOrIntersectionType struct {
 * 	StructuredType
 * 	types                                       []*Type
 * 	propertyCache                               ast.SymbolTable
 * 	propertyCacheWithoutFunctionPropertyAugment ast.SymbolTable
 * 	resolvedProperties                          []*ast.Symbol
 * }
 */
export interface UnionOrIntersectionType {
  __tsgoEmbedded0: StructuredType;
  types: GoSlice<GoPtr<Type>>;
  propertyCache: SymbolTable;
  propertyCacheWithoutFunctionPropertyAugment: SymbolTable;
  resolvedProperties: GoSlice<GoPtr<Symbol_62f2f8bf>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::UnionOrIntersectionType.AsUnionOrIntersectionType","kind":"method","status":"implemented","sigHash":"a463b976a7b49efcf96dba1ada20581738ec8afdb843ad312d335b2a18c87cfa"}
 *
 * Go source:
 * func (t *UnionOrIntersectionType) AsUnionOrIntersectionType() *UnionOrIntersectionType { return t }
 */
export function UnionOrIntersectionType_AsUnionOrIntersectionType(receiver: GoPtr<UnionOrIntersectionType>): GoPtr<UnionOrIntersectionType> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::UnionOrIntersectionType.Types","kind":"method","status":"implemented","sigHash":"65393c27769c1456436f678a289d5055fa63c5e286e80e18209329c621008896"}
 *
 * Go source:
 * func (t *UnionOrIntersectionType) Types() []*Type {
 * 	return t.types
 * }
 */
export function UnionOrIntersectionType_Types(receiver: GoPtr<UnionOrIntersectionType>): GoSlice<GoPtr<Type>> {
  return receiver!.types;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::UnionType","kind":"type","status":"implemented","sigHash":"b66281ea8659118d8aaf76905d9776b25fdf7acdf8b772d58eda38bde944cbd6"}
 *
 * Go source:
 * UnionType struct {
 * 	UnionOrIntersectionType
 * 	resolvedReducedType *Type
 * 	regularType         *Type
 * 	origin              *Type           // Denormalized union, intersection, or index type in which union originates
 * 	keyPropertyName     string          // Property with unique unit type that exists in every object/intersection in union type
 * 	constituentMap      map[*Type]*Type // Constituents keyed by unit type discriminants
 * }
 */
export interface UnionType {
  __tsgoEmbedded0: UnionOrIntersectionType;
  resolvedReducedType: GoPtr<Type>;
  regularType: GoPtr<Type>;
  origin: GoPtr<Type>;
  keyPropertyName: string;
  constituentMap: GoMap<GoPtr<Type>, GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::IntersectionType","kind":"type","status":"implemented","sigHash":"627c85007cf8fc1389f4c8a0ae633746b29684599e23b5dbcbf56164d21cd52f"}
 *
 * Go source:
 * IntersectionType struct {
 * 	UnionOrIntersectionType
 * 	resolvedApparentType             *Type
 * 	uniqueLiteralFilledInstantiation *Type // Instantiation with type parameters mapped to never type
 * }
 */
export interface IntersectionType {
  __tsgoEmbedded0: UnionOrIntersectionType;
  resolvedApparentType: GoPtr<Type>;
  uniqueLiteralFilledInstantiation: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeParameter","kind":"type","status":"implemented","sigHash":"6ef5ab739a7f045965f98d932e8587c7c4f820a677c556529ba28a1a8b2eb1bc"}
 *
 * Go source:
 * TypeParameter struct {
 * 	ConstrainedType
 * 	constraint          *Type
 * 	target              *Type
 * 	mapper              *TypeMapper
 * 	isThisType          bool
 * 	resolvedDefaultType *Type
 * }
 */
export interface TypeParameter {
  __tsgoEmbedded0: ConstrainedType;
  constraint: GoPtr<Type>;
  target: GoPtr<Type>;
  mapper: GoPtr<TypeMapper>;
  isThisType: bool;
  resolvedDefaultType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypeParameter.IsThisType","kind":"method","status":"implemented","sigHash":"00696bd2c3f26af607bd49395a5a451cb3c0a9e52abafbcce9a27d0073d8ec38"}
 *
 * Go source:
 * func (t *TypeParameter) IsThisType() bool { return t.isThisType }
 */
export function TypeParameter_IsThisType(receiver: GoPtr<TypeParameter>): bool {
  return receiver!.isThisType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::IndexFlags","kind":"type","status":"implemented","sigHash":"b9b0cc34acee35b2c3df8e1bb230b2933ba319269c3bf7963a0f9b3b53e679e8"}
 *
 * Go source:
 * IndexFlags uint32
 */
export type IndexFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::IndexFlagsNone+IndexFlagsStringsOnly+IndexFlagsNoIndexSignatures+IndexFlagsNoReducibleCheck","kind":"constGroup","status":"implemented","sigHash":"3463d5ba384a0294be300e0f0bca42f2e591680697d5e274617b55eb335a1a9c"}
 *
 * Go source:
 * const (
 * 	IndexFlagsNone              IndexFlags = 0
 * 	IndexFlagsStringsOnly       IndexFlags = 1 << 0
 * 	IndexFlagsNoIndexSignatures IndexFlags = 1 << 1
 * 	IndexFlagsNoReducibleCheck  IndexFlags = 1 << 2
 * )
 */
export const IndexFlagsNone: IndexFlags = 0;
export const IndexFlagsStringsOnly: IndexFlags = 1 << 0;
export const IndexFlagsNoIndexSignatures: IndexFlags = 1 << 1;
export const IndexFlagsNoReducibleCheck: IndexFlags = 1 << 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::IndexType","kind":"type","status":"implemented","sigHash":"4824d34ed908b74d4a1ce2df88d4170e00c0463a161420b4d1f8268e992ee2dc"}
 *
 * Go source:
 * IndexType struct {
 * 	ConstrainedType
 * 	target     *Type
 * 	indexFlags IndexFlags
 * }
 */
export interface IndexType {
  __tsgoEmbedded0: ConstrainedType;
  target: GoPtr<Type>;
  indexFlags: IndexFlags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::IndexType.Target","kind":"method","status":"implemented","sigHash":"a75ca0dadaddd6a747f48644d50224ea9ab02b125743d9a03e3b9271ed892988"}
 *
 * Go source:
 * func (t *IndexType) Target() *Type { return t.target }
 */
export function IndexType_Target(receiver: GoPtr<IndexType>): GoPtr<Type> {
  return receiver!.target;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::IndexedAccessType","kind":"type","status":"implemented","sigHash":"ba1eeab19c16f6b355de5dbbedfd26b381dbf36d140a9059f0f8574057c93183"}
 *
 * Go source:
 * IndexedAccessType struct {
 * 	ConstrainedType
 * 	objectType  *Type
 * 	indexType   *Type
 * 	accessFlags AccessFlags // Only includes AccessFlags.Persistent
 * }
 */
export interface IndexedAccessType {
  __tsgoEmbedded0: ConstrainedType;
  objectType: GoPtr<Type>;
  indexType: GoPtr<Type>;
  accessFlags: AccessFlags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::IndexedAccessType.ObjectType","kind":"method","status":"implemented","sigHash":"1bdaed5612d3752bd50286d11ce692fb5a41aa51f1d58c5d1aaeeddb46c41676"}
 *
 * Go source:
 * func (t *IndexedAccessType) ObjectType() *Type { return t.objectType }
 */
export function IndexedAccessType_ObjectType(receiver: GoPtr<IndexedAccessType>): GoPtr<Type> {
  return receiver!.objectType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::IndexedAccessType.IndexType","kind":"method","status":"implemented","sigHash":"85b57c26fdc41372fd2fdf634275cf0a8ffbfd3ae583c22bc1f7b908e1ddd1d9"}
 *
 * Go source:
 * func (t *IndexedAccessType) IndexType() *Type  { return t.indexType }
 */
export function IndexedAccessType_IndexType(receiver: GoPtr<IndexedAccessType>): GoPtr<Type> {
  return receiver!.indexType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TemplateLiteralType","kind":"type","status":"implemented","sigHash":"fd61db194b81291daf8a49d81fd35c6cdbe61eabadb285154062f8261a61a9c1"}
 *
 * Go source:
 * TemplateLiteralType struct {
 * 	ConstrainedType
 * 	texts []string // Always one element longer than types
 * 	types []*Type  // Always at least one element
 * }
 */
export interface TemplateLiteralType {
  __tsgoEmbedded0: ConstrainedType;
  texts: GoSlice<string>;
  types: GoSlice<GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TemplateLiteralType.Texts","kind":"method","status":"implemented","sigHash":"3c3d535d1b0b673e77c07b2bf18d3cccb15605f0d6b4082a9867316270025f6d"}
 *
 * Go source:
 * func (t *TemplateLiteralType) Texts() []string { return t.texts }
 */
export function TemplateLiteralType_Texts(receiver: GoPtr<TemplateLiteralType>): GoSlice<string> {
  return receiver!.texts;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TemplateLiteralType.Types","kind":"method","status":"implemented","sigHash":"1ef235d267d5be4c214e3d0d2d2c70ea94eabb57ab844b3e68e50c31e93db792"}
 *
 * Go source:
 * func (t *TemplateLiteralType) Types() []*Type  { return t.types }
 */
export function TemplateLiteralType_Types(receiver: GoPtr<TemplateLiteralType>): GoSlice<GoPtr<Type>> {
  return receiver!.types;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::StringMappingType","kind":"type","status":"implemented","sigHash":"9816d4ee3843e5d51ad13889fe800ed985eec792956d32dbc698fd4baae2fa77"}
 *
 * Go source:
 * StringMappingType struct {
 * 	ConstrainedType
 * 	target *Type
 * }
 */
export interface StringMappingType {
  __tsgoEmbedded0: ConstrainedType;
  target: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::StringMappingType.Target","kind":"method","status":"implemented","sigHash":"1e4e315b6a72393451dc16c165e08d6fc6488c292fb520d9b54a3e1c37450ecf"}
 *
 * Go source:
 * func (t *StringMappingType) Target() *Type { return t.target }
 */
export function StringMappingType_Target(receiver: GoPtr<StringMappingType>): GoPtr<Type> {
  return receiver!.target;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SubstitutionType","kind":"type","status":"implemented","sigHash":"5315e5519ba2ce6114a360f79d4eba17e1c9f225ac21b4f4c55949a58386991e"}
 *
 * Go source:
 * SubstitutionType struct {
 * 	ConstrainedType
 * 	baseType   *Type // Target type
 * 	constraint *Type // Constraint that target type is known to satisfy
 * }
 */
export interface SubstitutionType {
  __tsgoEmbedded0: ConstrainedType;
  baseType: GoPtr<Type>;
  constraint: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::SubstitutionType.BaseType","kind":"method","status":"implemented","sigHash":"d2ca47575a89587599e65fdeacc4f18d761fc009f209e197518717c467d50404"}
 *
 * Go source:
 * func (t *SubstitutionType) BaseType() *Type        { return t.baseType }
 */
export function SubstitutionType_BaseType(receiver: GoPtr<SubstitutionType>): GoPtr<Type> {
  return receiver!.baseType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::SubstitutionType.SubstConstraint","kind":"method","status":"implemented","sigHash":"ad3d534806d0d386fafb415e4ef6e41568afd74640b94ac927e304c45a66b5f6"}
 *
 * Go source:
 * func (t *SubstitutionType) SubstConstraint() *Type { return t.constraint }
 */
export function SubstitutionType_SubstConstraint(receiver: GoPtr<SubstitutionType>): GoPtr<Type> {
  return receiver!.constraint;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ConditionalRoot","kind":"type","status":"implemented","sigHash":"10a7b0b739fe0b0606eed4560065892eef29df703c569817e6577f0baaec7de3"}
 *
 * Go source:
 * ConditionalRoot struct {
 * 	node                *ast.ConditionalTypeNode
 * 	checkType           *Type
 * 	extendsType         *Type
 * 	isDistributive      bool
 * 	inferTypeParameters []*Type
 * 	outerTypeParameters []*Type
 * 	instantiations      map[CacheHashKey]*Type
 * 	alias               *TypeAlias
 * }
 */
export interface ConditionalRoot {
  node: GoPtr<ConditionalTypeNode>;
  checkType: GoPtr<Type>;
  extendsType: GoPtr<Type>;
  isDistributive: bool;
  inferTypeParameters: GoSlice<GoPtr<Type>>;
  outerTypeParameters: GoSlice<GoPtr<Type>>;
  instantiations: GoMap<CacheHashKey, GoPtr<Type>>;
  alias: GoPtr<TypeAlias>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::ConditionalType","kind":"type","status":"implemented","sigHash":"72baaa576ba9c0a2305ed19f3b79642a12e6786398d75443e2eb3d5719ca2580"}
 *
 * Go source:
 * ConditionalType struct {
 * 	ConstrainedType
 * 	root                             *ConditionalRoot
 * 	checkType                        *Type
 * 	extendsType                      *Type
 * 	resolvedTrueType                 *Type
 * 	resolvedFalseType                *Type
 * 	resolvedInferredTrueType         *Type // The `trueType` instantiated with the `combinedMapper`, if present
 * 	resolvedDefaultConstraint        *Type
 * 	resolvedConstraintOfDistributive *Type
 * 	mapper                           *TypeMapper
 * 	combinedMapper                   *TypeMapper
 * }
 */
export interface ConditionalType {
  __tsgoEmbedded0: ConstrainedType;
  root: GoPtr<ConditionalRoot>;
  checkType: GoPtr<Type>;
  extendsType: GoPtr<Type>;
  resolvedTrueType: GoPtr<Type>;
  resolvedFalseType: GoPtr<Type>;
  resolvedInferredTrueType: GoPtr<Type>;
  resolvedDefaultConstraint: GoPtr<Type>;
  resolvedConstraintOfDistributive: GoPtr<Type>;
  mapper: GoPtr<TypeMapper>;
  combinedMapper: GoPtr<TypeMapper>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::ConditionalType.CheckType","kind":"method","status":"implemented","sigHash":"f0748bda237c5a2383234d632d7108747c2ee67eae4b79c0349c76dd1d3adbca"}
 *
 * Go source:
 * func (t *ConditionalType) CheckType() *Type   { return t.checkType }
 */
export function ConditionalType_CheckType(receiver: GoPtr<ConditionalType>): GoPtr<Type> {
  return receiver!.checkType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::ConditionalType.ExtendsType","kind":"method","status":"implemented","sigHash":"65bf8712cd27803e1e6072aed95b2442f81659ff4d369adbb90024be3353a3f0"}
 *
 * Go source:
 * func (t *ConditionalType) ExtendsType() *Type { return t.extendsType }
 */
export function ConditionalType_ExtendsType(receiver: GoPtr<ConditionalType>): GoPtr<Type> {
  return receiver!.extendsType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::SignatureFlags","kind":"type","status":"implemented","sigHash":"df0cc8e817bb23d3d045ce768dfeb18f94209c5ef8e378bab641683555d96402"}
 *
 * Go source:
 * SignatureFlags uint32
 */
export type SignatureFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::SignatureFlagsNone+SignatureFlagsHasRestParameter+SignatureFlagsHasLiteralTypes+SignatureFlagsConstruct+SignatureFlagsAbstract+SignatureFlagsIsInnerCallChain+SignatureFlagsIsOuterCallChain+SignatureFlagsIsUntypedSignatureInJSFile+SignatureFlagsIsNonInferrable+SignatureFlagsIsSignatureCandidateForOverloadFailure+SignatureFlagsPropagatingFlags+SignatureFlagsCallChainFlags","kind":"constGroup","status":"implemented","sigHash":"eb262c586aa738cadd9907148d7e6dbc3a6eea212fd9930699fdb67a9b57bd1b"}
 *
 * Go source:
 * const (
 * 	SignatureFlagsNone SignatureFlags = 0
 * 	// Propagating flags
 * 	SignatureFlagsHasRestParameter SignatureFlags = 1 << 0 // Indicates last parameter is rest parameter
 * 	SignatureFlagsHasLiteralTypes  SignatureFlags = 1 << 1 // Indicates signature is specialized
 * 	SignatureFlagsConstruct        SignatureFlags = 1 << 2 // Indicates signature is a construct signature
 * 	SignatureFlagsAbstract         SignatureFlags = 1 << 3 // Indicates signature comes from an abstract class, abstract construct signature, or abstract constructor type
 * 	// Non-propagating flags
 * 	SignatureFlagsIsInnerCallChain                       SignatureFlags = 1 << 4 // Indicates signature comes from a CallChain nested in an outer OptionalChain
 * 	SignatureFlagsIsOuterCallChain                       SignatureFlags = 1 << 5 // Indicates signature comes from a CallChain that is the outermost chain of an optional expression
 * 	SignatureFlagsIsUntypedSignatureInJSFile             SignatureFlags = 1 << 6 // Indicates signature is from a js file and has no types
 * 	SignatureFlagsIsNonInferrable                        SignatureFlags = 1 << 7 // Indicates signature comes from a non-inferrable type
 * 	SignatureFlagsIsSignatureCandidateForOverloadFailure SignatureFlags = 1 << 8
 * 	// We do not propagate `IsInnerCallChain` or `IsOuterCallChain` to instantiated signatures, as that would result in us
 * 	// attempting to add `| undefined` on each recursive call to `getReturnTypeOfSignature` when
 * 	// instantiating the return type.
 * 	SignatureFlagsPropagatingFlags = SignatureFlagsHasRestParameter | SignatureFlagsHasLiteralTypes | SignatureFlagsConstruct | SignatureFlagsAbstract | SignatureFlagsIsUntypedSignatureInJSFile | SignatureFlagsIsSignatureCandidateForOverloadFailure
 * 	SignatureFlagsCallChainFlags   = SignatureFlagsIsInnerCallChain | SignatureFlagsIsOuterCallChain
 * )
 */
export const SignatureFlagsNone: SignatureFlags = 0;
export const SignatureFlagsHasRestParameter: SignatureFlags = 1 << 0;
export const SignatureFlagsHasLiteralTypes: SignatureFlags = 1 << 1;
export const SignatureFlagsConstruct: SignatureFlags = 1 << 2;
export const SignatureFlagsAbstract: SignatureFlags = 1 << 3;
export const SignatureFlagsIsInnerCallChain: SignatureFlags = 1 << 4;
export const SignatureFlagsIsOuterCallChain: SignatureFlags = 1 << 5;
export const SignatureFlagsIsUntypedSignatureInJSFile: SignatureFlags = 1 << 6;
export const SignatureFlagsIsNonInferrable: SignatureFlags = 1 << 7;
export const SignatureFlagsIsSignatureCandidateForOverloadFailure: SignatureFlags = 1 << 8;
export const SignatureFlagsPropagatingFlags: SignatureFlags =
  (SignatureFlagsHasRestParameter |
    SignatureFlagsHasLiteralTypes |
    SignatureFlagsConstruct |
    SignatureFlagsAbstract |
    SignatureFlagsIsUntypedSignatureInJSFile |
    SignatureFlagsIsSignatureCandidateForOverloadFailure) >>>
  0;
export const SignatureFlagsCallChainFlags: SignatureFlags =
  (SignatureFlagsIsInnerCallChain | SignatureFlagsIsOuterCallChain) >>> 0;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::Signature","kind":"type","status":"implemented","sigHash":"2aa635e4411e9fe6132f76a0e64405f097e606ec5723eb3a6914d5e1f8a7c779"}
 *
 * Go source:
 * Signature struct {
 * 	flags                    SignatureFlags
 * 	minArgumentCount         int32
 * 	resolvedMinArgumentCount int32
 * 	declaration              *ast.Node
 * 	typeParameters           []*Type
 * 	parameters               []*ast.Symbol
 * 	thisParameter            *ast.Symbol
 * 	resolvedReturnType       *Type
 * 	resolvedTypePredicate    *TypePredicate
 * 	target                   *Signature
 * 	mapper                   *TypeMapper
 * 	isolatedSignatureType    *Type
 * 	composite                *CompositeSignature
 * }
 */
export interface Signature {
  flags: SignatureFlags;
  minArgumentCount: int;
  resolvedMinArgumentCount: int;
  declaration: GoPtr<Node>;
  typeParameters: GoSlice<GoPtr<Type>>;
  parameters: GoSlice<GoPtr<Symbol_62f2f8bf>>;
  thisParameter: GoPtr<Symbol_62f2f8bf>;
  resolvedReturnType: GoPtr<Type>;
  resolvedTypePredicate: GoPtr<TypePredicate>;
  target: GoPtr<Signature>;
  mapper: GoPtr<TypeMapper>;
  isolatedSignatureType: GoPtr<Type>;
  composite: GoPtr<CompositeSignature>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Signature.Flags","kind":"method","status":"implemented","sigHash":"6f3ff5daa3a542647d0c2ded0db89c216b6a2d48bc2d631e498fdd1b70e2d4fd"}
 *
 * Go source:
 * func (s *Signature) Flags() SignatureFlags {
 * 	return s.flags
 * }
 */
export function Signature_Flags(receiver: GoPtr<Signature>): SignatureFlags {
  return receiver!.flags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Signature.TypeParameters","kind":"method","status":"implemented","sigHash":"cb28b2a07ded8b054d77d8909b0d924049bf8a9e405030d9a095d389d8d5ff0a"}
 *
 * Go source:
 * func (s *Signature) TypeParameters() []*Type {
 * 	return s.typeParameters
 * }
 */
export function Signature_TypeParameters(receiver: GoPtr<Signature>): GoSlice<GoPtr<Type>> {
  return receiver!.typeParameters;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Signature.Declaration","kind":"method","status":"implemented","sigHash":"c5146de59f2e792a4981b08eb7e65e3851dfdf24f9cd25cb7264c7635e223195"}
 *
 * Go source:
 * func (s *Signature) Declaration() *ast.Node {
 * 	return s.declaration
 * }
 */
export function Signature_Declaration(receiver: GoPtr<Signature>): GoPtr<Node> {
  return receiver!.declaration;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Signature.Target","kind":"method","status":"implemented","sigHash":"b370dc5ac0441bf818a7160561b39ac2ba42d797ec2b6355ad475824111fabe6"}
 *
 * Go source:
 * func (s *Signature) Target() *Signature {
 * 	return s.target
 * }
 */
export function Signature_Target(receiver: GoPtr<Signature>): GoPtr<Signature> {
  return receiver!.target;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Signature.ThisParameter","kind":"method","status":"implemented","sigHash":"afad830f98f1efc13163ec150d3594e4af384dfb2efbdb42257404ce8955733e"}
 *
 * Go source:
 * func (s *Signature) ThisParameter() *ast.Symbol {
 * 	return s.thisParameter
 * }
 */
export function Signature_ThisParameter(receiver: GoPtr<Signature>): GoPtr<Symbol_62f2f8bf> {
  return receiver!.thisParameter;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Signature.Parameters","kind":"method","status":"implemented","sigHash":"7f1ce56756365cc8cfafec0eebe56a2c9532da54d5b05632ac809ba3b2ea88b6"}
 *
 * Go source:
 * func (s *Signature) Parameters() []*ast.Symbol {
 * 	return s.parameters
 * }
 */
export function Signature_Parameters(receiver: GoPtr<Signature>): GoSlice<GoPtr<Symbol_62f2f8bf>> {
  return receiver!.parameters;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Signature.HasRestParameter","kind":"method","status":"implemented","sigHash":"0fe9edd757a45abbd20f9f78f63c275d1e84f311370c66f7beaa97574f7ab490"}
 *
 * Go source:
 * func (s *Signature) HasRestParameter() bool {
 * 	return s.flags&SignatureFlagsHasRestParameter != 0
 * }
 */
export function Signature_HasRestParameter(receiver: GoPtr<Signature>): bool {
  return (receiver!.flags & SignatureFlagsHasRestParameter) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::Signature.MinArgumentCount","kind":"method","status":"implemented","sigHash":"dffe370ab537f2b777e3d81c05a65da9b432a8008374e6214d0d073692c54fed"}
 *
 * Go source:
 * func (s *Signature) MinArgumentCount() int {
 * 	return int(s.minArgumentCount)
 * }
 */
export function Signature_MinArgumentCount(receiver: GoPtr<Signature>): int {
  return receiver!.minArgumentCount;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::CompositeSignature","kind":"type","status":"implemented","sigHash":"4c8c24105cb438a1c249794b97891a52b56770ae012705d4f24ef8d6c7cd32d2"}
 *
 * Go source:
 * CompositeSignature struct {
 * 	isUnion    bool         // True for union, false for intersection
 * 	signatures []*Signature // Individual signatures
 * }
 */
export interface CompositeSignature {
  isUnion: bool;
  signatures: GoSlice<GoPtr<Signature>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypePredicateKind","kind":"type","status":"implemented","sigHash":"219523222137bb5db02f6438c0e4bf50e2f57d34ac8f8d87b00a09583b1302b7"}
 *
 * Go source:
 * TypePredicateKind int32
 */
export type TypePredicateKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::TypePredicateKindThis+TypePredicateKindIdentifier+TypePredicateKindAssertsThis+TypePredicateKindAssertsIdentifier","kind":"constGroup","status":"implemented","sigHash":"c3f23f52bcc9ce27738ed3a98895f4fda44342b1c63b590b0cfbd406fb14de8a"}
 *
 * Go source:
 * const (
 * 	TypePredicateKindThis TypePredicateKind = iota
 * 	TypePredicateKindIdentifier
 * 	TypePredicateKindAssertsThis
 * 	TypePredicateKindAssertsIdentifier
 * )
 */
export const TypePredicateKindThis: TypePredicateKind = 0;
export const TypePredicateKindIdentifier: TypePredicateKind = 1;
export const TypePredicateKindAssertsThis: TypePredicateKind = 2;
export const TypePredicateKindAssertsIdentifier: TypePredicateKind = 3;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypePredicate","kind":"type","status":"implemented","sigHash":"a7c781d616b964b7e61d877ccbb33408e487c129862f8cce1ea7c8969058a566"}
 *
 * Go source:
 * TypePredicate struct {
 * 	kind           TypePredicateKind
 * 	parameterIndex int32
 * 	parameterName  string
 * 	t              *Type
 * }
 */
export interface TypePredicate {
  kind: TypePredicateKind;
  parameterIndex: int;
  parameterName: string;
  t: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypePredicate.Type","kind":"method","status":"implemented","sigHash":"aa6e3544a89469d96f16a0685594c278b3178a7e399bfd7bfb47c6fa706a3d6b"}
 *
 * Go source:
 * func (typePredicate *TypePredicate) Type() *Type {
 * 	return typePredicate.t
 * }
 */
export function TypePredicate_Type(receiver: GoPtr<TypePredicate>): GoPtr<Type> {
  return receiver!.t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypePredicate.Kind","kind":"method","status":"implemented","sigHash":"60a6572a6849a8345a741c8c59b8e2eabaf79782170cbd6a4b39f3c008d6019b"}
 *
 * Go source:
 * func (typePredicate *TypePredicate) Kind() TypePredicateKind {
 * 	return typePredicate.kind
 * }
 */
export function TypePredicate_Kind(receiver: GoPtr<TypePredicate>): TypePredicateKind {
  return receiver!.kind;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypePredicate.ParameterIndex","kind":"method","status":"implemented","sigHash":"bf7c9cf4270059f67323ae25a3a176c3bf4986e59e5d1ea9d046d3fbe2532a6d"}
 *
 * Go source:
 * func (typePredicate *TypePredicate) ParameterIndex() int32 {
 * 	return typePredicate.parameterIndex
 * }
 */
export function TypePredicate_ParameterIndex(receiver: GoPtr<TypePredicate>): int {
  return receiver!.parameterIndex;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::TypePredicate.ParameterName","kind":"method","status":"implemented","sigHash":"a8828236687dfe6c24ac2b087288285f7cb17c77c55d2511fd19da808b9ffef8"}
 *
 * Go source:
 * func (typePredicate *TypePredicate) ParameterName() string {
 * 	return typePredicate.parameterName
 * }
 */
export function TypePredicate_ParameterName(receiver: GoPtr<TypePredicate>): string {
  return receiver!.parameterName;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::IndexInfo","kind":"type","status":"implemented","sigHash":"f9ace2dd15609ba770696e3e130931a6b2064df9359e718e11fdaacbb27aeda1"}
 *
 * Go source:
 * IndexInfo struct {
 * 	keyType     *Type
 * 	valueType   *Type
 * 	isReadonly  bool
 * 	declaration *ast.Node   // IndexSignatureDeclaration
 * 	indexSymbol *ast.Symbol // Synthetic property symbol for this index signature
 * 	components  []*ast.Node // ElementWithComputedPropertyName
 * }
 */
export interface IndexInfo {
  keyType: GoPtr<Type>;
  valueType: GoPtr<Type>;
  isReadonly: bool;
  declaration: GoPtr<Node>;
  indexSymbol: GoPtr<Symbol_62f2f8bf>;
  components: GoSlice<GoPtr<Node>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::IndexInfo.KeyType","kind":"method","status":"implemented","sigHash":"0caaccea0ed6ee3955aec6eb623f7cafe1a277165c5708fbc1cdaeff91c033e2"}
 *
 * Go source:
 * func (info *IndexInfo) KeyType() *Type {
 * 	return info.keyType
 * }
 */
export function IndexInfo_KeyType(receiver: GoPtr<IndexInfo>): GoPtr<Type> {
  return receiver!.keyType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::IndexInfo.ValueType","kind":"method","status":"implemented","sigHash":"a29528c3cb956531d90088f47d6dfdd22edac860015e0fb2d2a934052f14fa95"}
 *
 * Go source:
 * func (info *IndexInfo) ValueType() *Type {
 * 	return info.valueType
 * }
 */
export function IndexInfo_ValueType(receiver: GoPtr<IndexInfo>): GoPtr<Type> {
  return receiver!.valueType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::IndexInfo.IsReadonly","kind":"method","status":"implemented","sigHash":"950f96e1d03c2560eb088fc9f887ec106be221682203b7ba9b1ab13f948275aa"}
 *
 * Go source:
 * func (info *IndexInfo) IsReadonly() bool {
 * 	return info.isReadonly
 * }
 */
export function IndexInfo_IsReadonly(receiver: GoPtr<IndexInfo>): bool {
  return receiver!.isReadonly;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::method::IndexInfo.Declaration","kind":"method","status":"implemented","sigHash":"d0414a85ecaaac1f8ef44c887c47b7e4d268c9ed249c53543c0dc1def7e966b1"}
 *
 * Go source:
 * func (info *IndexInfo) Declaration() *ast.Node {
 * 	return info.declaration
 * }
 */
export function IndexInfo_Declaration(receiver: GoPtr<IndexInfo>): GoPtr<Node> {
  return receiver!.declaration;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::Ternary","kind":"type","status":"implemented","sigHash":"b37df4e6d3f066d222549b60141a3e22c039f7d5ddba53b7339216ec60661f91"}
 *
 * Go source:
 * Ternary int8
 */
export type Ternary = sbyte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::TernaryFalse+TernaryUnknown+TernaryMaybe+TernaryTrue","kind":"constGroup","status":"implemented","sigHash":"0989e1581c97be756f4453a73501a8990dc3015ac188b9ebe7ff90191a2b576a"}
 *
 * Go source:
 * const (
 * 	TernaryFalse   Ternary = 0
 * 	TernaryUnknown Ternary = 1
 * 	TernaryMaybe   Ternary = 3
 * 	TernaryTrue    Ternary = -1
 * )
 */
export const TernaryFalse: Ternary = 0;
export const TernaryUnknown: Ternary = 1;
export const TernaryMaybe: Ternary = 3;
export const TernaryTrue: Ternary = -1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::TypeComparer","kind":"type","status":"implemented","sigHash":"00c981ae5aa0dc7241fd2863141d7fc89fe52f2460240808960e493e5d9b9ec2"}
 *
 * Go source:
 * TypeComparer func(s *Type, t *Type, reportErrors bool) Ternary
 */
export type TypeComparer = GoFunc<(s: GoPtr<Type>, t: GoPtr<Type>, reportErrors: bool) => Ternary>;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::LanguageFeatureMinimumTargetMap","kind":"type","status":"implemented","sigHash":"a4e8fbf7840067676694ece6a4929081ad3c2dcade3ca8928b034f281c87313f"}
 *
 * Go source:
 * LanguageFeatureMinimumTargetMap struct {
 * 	Exponentiation                    core.ScriptTarget
 * 	AsyncFunctions                    core.ScriptTarget
 * 	ForAwaitOf                        core.ScriptTarget
 * 	AsyncGenerators                   core.ScriptTarget
 * 	AsyncIteration                    core.ScriptTarget
 * 	ObjectSpreadRest                  core.ScriptTarget
 * 	RegularExpressionFlagsDotAll      core.ScriptTarget
 * 	BindinglessCatch                  core.ScriptTarget
 * 	BigInt                            core.ScriptTarget
 * 	NullishCoalesce                   core.ScriptTarget
 * 	OptionalChaining                  core.ScriptTarget
 * 	LogicalAssignment                 core.ScriptTarget
 * 	TopLevelAwait                     core.ScriptTarget
 * 	ClassFields                       core.ScriptTarget
 * 	PrivateNamesAndClassStaticBlocks  core.ScriptTarget
 * 	RegularExpressionFlagsHasIndices  core.ScriptTarget
 * 	ShebangComments                   core.ScriptTarget
 * 	UsingAndAwaitUsing                core.ScriptTarget
 * 	ClassAndClassElementDecorators    core.ScriptTarget
 * 	RegularExpressionFlagsUnicodeSets core.ScriptTarget
 * }
 */
export interface LanguageFeatureMinimumTargetMap {
  Exponentiation: ScriptTarget;
  AsyncFunctions: ScriptTarget;
  ForAwaitOf: ScriptTarget;
  AsyncGenerators: ScriptTarget;
  AsyncIteration: ScriptTarget;
  ObjectSpreadRest: ScriptTarget;
  RegularExpressionFlagsDotAll: ScriptTarget;
  BindinglessCatch: ScriptTarget;
  BigInt: ScriptTarget;
  NullishCoalesce: ScriptTarget;
  OptionalChaining: ScriptTarget;
  LogicalAssignment: ScriptTarget;
  TopLevelAwait: ScriptTarget;
  ClassFields: ScriptTarget;
  PrivateNamesAndClassStaticBlocks: ScriptTarget;
  RegularExpressionFlagsHasIndices: ScriptTarget;
  ShebangComments: ScriptTarget;
  UsingAndAwaitUsing: ScriptTarget;
  ClassAndClassElementDecorators: ScriptTarget;
  RegularExpressionFlagsUnicodeSets: ScriptTarget;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::varGroup::LanguageFeatureMinimumTarget","kind":"varGroup","status":"implemented","sigHash":"0f5f7f7056825f77a5c593ae12f810e4091d8ea53208e733375529819f3f7834"}
 *
 * Go source:
 * var LanguageFeatureMinimumTarget = LanguageFeatureMinimumTargetMap{
 * 	Exponentiation:                    core.ScriptTargetES2016,
 * 	AsyncFunctions:                    core.ScriptTargetES2017,
 * 	ForAwaitOf:                        core.ScriptTargetES2018,
 * 	AsyncGenerators:                   core.ScriptTargetES2018,
 * 	AsyncIteration:                    core.ScriptTargetES2018,
 * 	ObjectSpreadRest:                  core.ScriptTargetES2018,
 * 	RegularExpressionFlagsDotAll:      core.ScriptTargetES2018,
 * 	BindinglessCatch:                  core.ScriptTargetES2019,
 * 	BigInt:                            core.ScriptTargetES2020,
 * 	NullishCoalesce:                   core.ScriptTargetES2020,
 * 	OptionalChaining:                  core.ScriptTargetES2020,
 * 	LogicalAssignment:                 core.ScriptTargetES2021,
 * 	TopLevelAwait:                     core.ScriptTargetES2022,
 * 	ClassFields:                       core.ScriptTargetES2022,
 * 	PrivateNamesAndClassStaticBlocks:  core.ScriptTargetES2022,
 * 	RegularExpressionFlagsHasIndices:  core.ScriptTargetES2022,
 * 	ShebangComments:                   core.ScriptTargetESNext,
 * 	UsingAndAwaitUsing:                core.ScriptTargetESNext,
 * 	ClassAndClassElementDecorators:    core.ScriptTargetESNext,
 * 	RegularExpressionFlagsUnicodeSets: core.ScriptTargetESNext,
 * }
 */
export let LanguageFeatureMinimumTarget: LanguageFeatureMinimumTargetMap = {
  Exponentiation: ScriptTargetES2016,
  AsyncFunctions: ScriptTargetES2017,
  ForAwaitOf: ScriptTargetES2018,
  AsyncGenerators: ScriptTargetES2018,
  AsyncIteration: ScriptTargetES2018,
  ObjectSpreadRest: ScriptTargetES2018,
  RegularExpressionFlagsDotAll: ScriptTargetES2018,
  BindinglessCatch: ScriptTargetES2019,
  BigInt: ScriptTargetES2020,
  NullishCoalesce: ScriptTargetES2020,
  OptionalChaining: ScriptTargetES2020,
  LogicalAssignment: ScriptTargetES2021,
  TopLevelAwait: ScriptTargetES2022,
  ClassFields: ScriptTargetES2022,
  PrivateNamesAndClassStaticBlocks: ScriptTargetES2022,
  RegularExpressionFlagsHasIndices: ScriptTargetES2022,
  ShebangComments: ScriptTargetESNext,
  UsingAndAwaitUsing: ScriptTargetESNext,
  ClassAndClassElementDecorators: ScriptTargetESNext,
  RegularExpressionFlagsUnicodeSets: ScriptTargetESNext,
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/types.go::type::StringLiteralType","kind":"type","status":"implemented","sigHash":"a394c237938cf6cfaaca603244cfc23d0912642301ec74a9734fba649ab83c08"}
 *
 * Go source:
 * StringLiteralType = Type
 */
export type StringLiteralType = Type;
