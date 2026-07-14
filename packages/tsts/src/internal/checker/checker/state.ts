import type { bool, byte, int, uint } from "../../../go/scalars.js";
import type { Seq } from "../../../go/iter.js";
import type { GoComparable, GoConstraint, GoDefined, GoEquality, GoMap, GoMapKeyDescriptor, GoPtr, GoSlice } from "../../../go/compat.js";
import { GoBigIntKey, GoBooleanKey, GoDynamicValue, GoInterfaceKey, GoMapIsNil, GoNilMap, GoNilSlice, GoNumberKey, GoPointerKey, GoSliceIsNil, GoStringKey, GoStructField, GoStructKey, GoZeroBoolean, GoZeroNumber, GoZeroPointer, GoZeroString, NewGoStructMap } from "../../../go/compat.js";
import type { Context } from "../../../go/context.js";
import type { Hasher } from "../../../go/github.com/zeebo/xxh3.js";
import * as xxh3 from "../../../go/github.com/zeebo/xxh3.js";
import { Uint32, Uint64 } from "../../../go/sync/atomic.js";
import * as strconv from "../../../go/strconv.js";
import * as gostrings from "../../../go/strings.js";
import * as maps from "../../../go/maps.js";
import * as slices from "../../../go/slices.js";
import { ToLowerJS, ToUpperJS } from "../../stringutil/js_case.js";
import * as utf8 from "../../../go/unicode/utf8.js";
import { NewNodeFactory, Node_End, Node_ForEachChild, Node_Name } from "../../ast/spine.js";
import type { Node } from "../../ast/spine.js";
import { IsAnyExportAssignment, Node_Body, Node_Elements, Node_Expression, Node_Initializer, Node_IsTypeOnly, Node_Locals, Node_ModuleSpecifier, Node_Parameters, Node_PropertyName, Node_Text, Node_Type, Node_TypeArguments, Node_TypeParameters, SourceFile_FileName } from "../../ast/ast.js";
import type { HasFileName, PatternAmbientModule, SourceFile, SourceFileMetaData, StringLiteralLike } from "../../ast/ast.js";
import { AsArrayTypeNode, AsElementAccessExpression, AsExportSpecifier, AsExpressionWithTypeArguments, AsImportAttribute, AsImportAttributes, AsImportDeclaration, AsImportEqualsDeclaration, AsMappedTypeNode, AsParameterDeclaration, AsSyntheticExpression, AsTypeParameterDeclaration, AsTypeReferenceNode, AsIndexedAccessTypeNode } from "../../ast/generated/casts.js";
import type { NodeFactory } from "../../ast/generated/factory.js";
import { CheckFlagsContainsPrivate, CheckFlagsReadonly, CheckFlagsSyntheticMethod } from "../../ast/checkflags.js";
import { GetFunctionFlags, FunctionFlagsAsyncGenerator } from "../../ast/functionflags.js";
import { KindArrowFunction, KindArrayType, KindBigIntKeyword, KindBlock, KindBooleanKeyword, KindClassDeclaration, KindComputedPropertyName, KindConstructor, KindElementAccessExpression, KindEnumDeclaration, KindExportDeclaration, KindExpressionWithTypeArguments, KindExternalModuleReference, KindForInStatement, KindForOfStatement, KindForStatement, KindFunctionDeclaration, KindFunctionExpression, KindGetAccessor, KindIdentifier, KindImportClause, KindImportDeclaration, KindImportEqualsDeclaration, KindIndexedAccessType, KindInterfaceDeclaration, KindJSImportDeclaration, KindLiteralType, KindMethodDeclaration, KindMethodSignature, KindMinusToken, KindNamespaceImport, KindNeverKeyword, KindNumberKeyword, KindObjectKeyword, KindPropertyDeclaration, KindPropertySignature, KindQualifiedName, KindSetAccessor, KindStringKeyword, KindSuperKeyword, KindSymbolKeyword, KindThisKeyword, KindTypeAliasDeclaration, KindTypeReference, KindUndefinedKeyword, KindUnknownKeyword, KindVariableStatement, KindVoidKeyword, KindAnyKeyword } from "../../ast/generated/kinds.js";
import { IsCallExpression, IsClassDeclaration, IsComputedPropertyName, IsConstructorDeclaration, IsElementAccessExpression, IsExportDeclaration, IsExportSpecifier, IsExpressionStatement, IsFunctionDeclaration, IsIdentifier, IsImportClause, IsImportDeclaration, IsImportEqualsDeclaration, IsInferTypeNode, IsJSImportDeclaration, IsMappedTypeNode, IsMethodDeclaration, IsNamespaceImport, IsObjectLiteralExpression, IsPropertyAccessExpression, IsPropertyDeclaration, IsSpreadElement, IsSyntheticExpression, IsTupleTypeNode, IsTypeAliasDeclaration, IsTypeParameterDeclaration } from "../../ast/generated/predicates.js";
import type { Declaration, IdentifierNode, TypeNode } from "../../ast/generated/unions.js";
import { NodeFlagsAmbient } from "../../ast/generated/flags.js";
import type { NodeFlags } from "../../ast/generated/flags.js";
import type { SymbolFlags } from "../../ast/symbolflags.js";
import type { ModifierFlags } from "../../ast/modifierflags.js";
import { SymbolFlagsAlias, SymbolFlagsAliasExcludes, SymbolFlagsBlockScopedVariable, SymbolFlagsBlockScopedVariableExcludes, SymbolFlagsClass, SymbolFlagsClassExcludes, SymbolFlagsConstEnum, SymbolFlagsConstEnumExcludes, SymbolFlagsEnumMember, SymbolFlagsEnumMemberExcludes, SymbolFlagsFunction, SymbolFlagsFunctionExcludes, SymbolFlagsFunctionScopedVariable, SymbolFlagsFunctionScopedVariableExcludes, SymbolFlagsGetAccessor, SymbolFlagsGetAccessorExcludes, SymbolFlagsInterface, SymbolFlagsInterfaceExcludes, SymbolFlagsMethod, SymbolFlagsMethodExcludes, SymbolFlagsModule, SymbolFlagsProperty, SymbolFlagsPropertyExcludes, SymbolFlagsRegularEnum, SymbolFlagsRegularEnumExcludes, SymbolFlagsSetAccessor, SymbolFlagsSetAccessorExcludes, SymbolFlagsTransient, SymbolFlagsTypeAlias, SymbolFlagsTypeAliasExcludes, SymbolFlagsTypeLiteral, SymbolFlagsTypeParameter, SymbolFlagsTypeParameterExcludes, SymbolFlagsValueModule, SymbolFlagsValueModuleExcludes } from "../../ast/symbolflags.js";
import type { Diagnostic, DiagnosticsCollection } from "../../ast/diagnostic.js";
import type { FlowNode } from "../../ast/flow.js";
import type { NodeId, SymbolId } from "../../ast/ids.js";
import type { Symbol, SymbolTable } from "../../ast/symbol.js";
import { InternalSymbolNameType } from "../../ast/symbol.js";
import { NameResolver_Resolve } from "../../binder/nameresolver.js";
import type { Set } from "../../collections/set.js";
import { NewSetWithSizeHint } from "../../collections/set.js";
import { NewOrderedSetWithSizeHint } from "../../collections/ordered_set.js";
import type { Arena } from "../../core/arena.js";
import { CompilerOptions_GetEmitModuleKind, CompilerOptions_GetEmitScriptTarget, CompilerOptions_GetEmitStandardClassFields, CompilerOptions_GetModuleResolutionKind, CompilerOptions_GetStrictOptionValue, ModuleKindCommonJS, ModuleKindESNext } from "../../core/compileroptions.js";
import type { CompilerOptions, ModuleKind, ModuleResolutionKind, ResolutionMode, ScriptTarget } from "../../core/compileroptions.js";
import { Every, Find, IfElse, LastOrNil, Map, Some } from "../../core/core.js";
import type { LinkStore } from "../../core/linkstore.js";
import { LinkStore_Get } from "../../core/linkstore.js";
import { goNodePointerKey, goSourceFilePointerKey, goTypePointerKey, nonExistentPropertyKeyDescriptor } from "../map-key-descriptors.js";
import { Tristate_IsFalseOrUnknown, TSTrue } from "../../core/tristate.js";
import { ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax, ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax_Adjust_the_type_field_in_the_nearest_package_json_to_make_this_file_an_ECMAScript_module_or_adjust_your_verbatimModuleSyntax_module_and_moduleResolution_settings_in_TypeScript } from "../../diagnostics/generated/messages.js";
import type { Message } from "../../diagnostics/diagnostics.js";
import type { Evaluator, Result } from "../../evaluator/evaluator.js";
import { NewEvaluator } from "../../evaluator/evaluator.js";
import { FromString } from "../../jsnum/string.js";
import type { Number } from "../../jsnum/jsnum.js";
import type { PseudoBigInt } from "../../jsnum/pseudobigint.js";
import type { ModeAwareCache } from "../../module/cache.js";
import type { ResolvedModule } from "../../module/types.js";
import type { ModuleSpecifierGenerationHost } from "../../modulespecifiers/types.js";
import type { InfoCacheEntry } from "../../packagejson/cache.js";
import { DeclarationNameToString } from "../../scanner/utilities.js";
import type { Scanner } from "../../scanner/scanner.js";
import type { KnownSymlinks } from "../../symlinks/knownsymlinks.js";
import type { ParsedCommandLine, SourceOutputAndProjectReference } from "../../tsoptions/parsedcommandline.js";
import type { Path } from "../../tspath/path.js";
import { ExtensionCjs, ExtensionCts, ExtensionIsTs, ExtensionJson, FileExtensionIsOneOf } from "../../tspath/extension.js";
import { FindAncestor, GetClassLikeDeclarationOfSymbol, GetContainingFunction, GetExtendsHeritageClauseElement, GetImmediatelyInvokedFunctionExpression, GetModuleInstanceState, GetNameOfDeclaration, GetSourceFileOfNode, GetThisContainer, GetThisParameter, IsCallOrNewExpression, IsEntityNameExpression, IsExternalOrCommonJSModule, IsForInOrOfStatement, IsFunctionLike, IsParameterPropertyDeclaration, IsPrivateIdentifierClassElementDeclaration, IsStatic, IsStringLiteralLike, ModuleInstanceStateConstEnumOnly, ModuleInstanceStateInstantiated, NodeIsPresent, OEKParentheses, WalkUpParenthesizedExpressions } from "../../ast/utilities.js";
import type { EmitResolver } from "../emitresolver.js";
import type { FlowState, SharedFlow } from "../flow.js";
import type { InferenceState } from "../inference.js";
import type { JsxElementLinks } from "../jsx.js";
import type { TypeMapper } from "../mapper.js";
import type { ExpandingFlags, IntersectionState, Relater, Relation, RelationComparisonResult } from "../relater.js";
import type { Tracer } from "../tracer.js";
import type { NodeBuilder } from "../nodebuilder.js";
import { Checker_compareSymbolsWorker, CompareTypes, getPropertyNameFromType, GetSetAccessorValueParameter, isNumericLiteralName, isTypeAlias, NewDiagnosticForNode } from "../utilities.js";
import { ElementFlagsFixed, ElementFlagsRequired, ElementFlagsOptional, ElementFlagsRest, ElementFlagsVariadic, ObjectFlagsAnonymous, ObjectFlagsContainsWideningType, ObjectFlagsMapped, ObjectFlagsNonInferrableType, ObjectFlagsPrimitiveUnion, ObjectFlagsReference, ObjectFlagsTuple, SignatureFlagsHasLiteralTypes, SignatureFlagsHasRestParameter, SignatureFlagsNone, TernaryFalse, TernaryTrue, Type_AsLiteralType, Type_AsMappedType, Type_AsObjectType, Type_AsTypeParameter, Type_AsTypeReference, Type_AsUnionType, Type_Target, Type_TargetTupleType, Type_Types, TypeFlagsAny, TypeFlagsBigInt, TypeFlagsBoolean, TypeFlagsBooleanLiteral, TypeFlagsEnumLiteral, TypeFlagsESSymbol, TypeFlagsIndex, TypeFlagsIntersection, TypeFlagsNever, TypeFlagsNonPrimitive, TypeFlagsNull, TypeFlagsNumber, TypeFlagsString, TypeFlagsTypeParameter, TypeFlagsUndefined, TypeFlagsUnion, TypeFlagsUnionOrIntersection, TypeFlagsUnit, TypeFlagsUnknown, TypeFlagsVoid, TypeFlagsFreshable, TypeFlagsStringOrNumberLiteral, TypePredicateKindIdentifier, VarianceFlagsCovariant } from "../types.js";
import type { AccessFlags, AliasSymbolLinks, ArrayLiteralLinks, AssertionLinks, ContainingSymbolLinks, DeclaredTypeLinks, DeferredSymbolLinks, ElementFlags, EnumMemberLinks, ExportTypeLinks, IndexInfo, LateBoundLinks, MappedSymbolLinks, MarkedAssignmentSymbolLinks, MembersAndExportsLinks, ModuleSymbolLinks, NodeLinks, ReverseMappedSymbolLinks, Signature, SignatureLinks, SourceFileLinks, SpreadLinks, SwitchStatementLinks, SymbolNodeLinks, SymbolReferenceLinks, Ternary, TupleElementInfo, TupleType, Type, TypeAlias, TypeAliasLinks, TypeComparer, TypeFlags, TypeId, TypeNodeLinks, TypePredicate, ValueSymbolLinks, VarianceFlags, VarianceLinks } from "../types.js";
import { BinarySearchFunc, Insert } from "../../../go/slices.js";
import { keyBuilder_writeByte, keyBuilder_writeInt, keyBuilder_writeString } from "./support.js";
import { keyBuilder_hash } from "./support-queries.js";
import { keyBuilder_writeType, keyBuilder_writeTypes, keyBuilder_writeGenericTypeReferences } from "./types.js";
import { keyBuilder_writeNode, keyBuilder_writeNodeId } from "./syntax-checking.js";
import { keyBuilder_writeAlias, keyBuilder_writeSymbol } from "./symbols.js";
import { Checker_compareSymbolChainsWorker } from "../symbolaccessibility.js";
import type { symbolTableID } from "../symbolaccessibility.js";
import { newFunctionTypeMapper } from "../mapper.js";
import { Checker_getTypeArguments, Checker_getUniqueLiteralTypeForTypeParameter, Checker_newSignature, Checker_newTypeParameter } from "./signatures.js";
import { Checker_evaluateEntity, Checker_initializeChecker, Checker_initializeClosures, Checker_initializeIterationResolvers, Checker_reportUnmeasurableWorker, Checker_reportUnreliableWorker } from "./support.js";
import { Checker_createNameResolver, Checker_createNameResolverForSuggestion, Checker_createTypeFromGenericGlobalType, Checker_getGlobalStrictFunctionType, Checker_getGlobalTypeAliasResolver, Checker_getGlobalTypeResolver, Checker_getGlobalTypeSymbolResolver, Checker_getGlobalValueSymbolResolver, Checker_newSymbol, Checker_newSymbolEx } from "./symbols.js";
import { Checker_createArrayType, Checker_createUnknownUnionType, Checker_createWideningType, Checker_getBigIntLiteralType, Checker_getNumberLiteralType, Checker_getStringLiteralType, Checker_getTemplateLiteralType, Checker_getUnionType, Checker_newAnonymousType, Checker_newIntrinsicType, Checker_newIntrinsicTypeEx, Checker_newLiteralType } from "./types.js";
import { Checker_newObjectType } from "./types.js";
import { Checker_permissiveMapperWorker, Checker_restrictiveMapperWorker } from "./inference.js";
import { typeofNEFacts } from "../flow.js";
import { Mutex, Once } from "../../../go/sync.js";

import type { GoFunc, GoInterface, GoRef } from "../../../go/compat.js";
import { GoNumberValueOps, GoPointerValueOps, GoSliceBuild, GoSliceMake, GoSliceStore, GoStringValueOps } from "../../../go/compat.js";
import { GoSliceLoad } from "../../../go/compat.js";
import { GoEmptySlice } from "../../../go/compat.js";



/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::CheckMode","kind":"type","status":"implemented","sigHash":"fd000c0f73136e37569f36cab9cec7e26a980eacd1124f26b93cc8ecf94fc319"}
 *
 * Go source:
 * CheckMode uint32
 */
export type CheckMode = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::CheckModeNormal+CheckModeContextual+CheckModeInferential+CheckModeSkipContextSensitive+CheckModeSkipGenericFunctions+CheckModeIsForSignatureHelp+CheckModeRestBindingElement+CheckModeTypeOnly+CheckModeForceTuple","kind":"constGroup","status":"implemented","sigHash":"703bb39c8c46c7a8e1ece1e68e87bf844b12cbd73e2163e5c4d0b815f9266b78"}
 *
 * Go source:
 * const (
 * 	CheckModeNormal               CheckMode = 0      // Normal type checking
 * 	CheckModeContextual           CheckMode = 1 << 0 // Explicitly assigned contextual type, therefore not cacheable
 * 	CheckModeInferential          CheckMode = 1 << 1 // Inferential typing
 * 	CheckModeSkipContextSensitive CheckMode = 1 << 2 // Skip context sensitive function expressions
 * 	CheckModeSkipGenericFunctions CheckMode = 1 << 3 // Skip single signature generic functions
 * 	CheckModeIsForSignatureHelp   CheckMode = 1 << 4 // Call resolution for purposes of signature help
 * 	CheckModeRestBindingElement   CheckMode = 1 << 5 // Checking a type that is going to be used to determine the type of a rest binding element
 * 	//   e.g. in `const { a, ...rest } = foo`, when checking the type of `foo` to determine the type of `rest`,
 * 	//   we need to preserve generic types instead of substituting them for constraints
 * 	CheckModeTypeOnly   CheckMode = 1 << 6 // Called from getTypeOfExpression, diagnostics may be omitted
 * 	CheckModeForceTuple CheckMode = 1 << 7
 * )
 */
export const CheckModeNormal: CheckMode = 0; // Normal type checking
export const CheckModeContextual: CheckMode = 1 << 0; // Explicitly assigned contextual type, therefore not cacheable
export const CheckModeInferential: CheckMode = 1 << 1; // Inferential typing
export const CheckModeSkipContextSensitive: CheckMode = 1 << 2; // Skip context sensitive function expressions
export const CheckModeSkipGenericFunctions: CheckMode = 1 << 3; // Skip single signature generic functions
export const CheckModeIsForSignatureHelp: CheckMode = 1 << 4; // Call resolution for purposes of signature help
export const CheckModeRestBindingElement: CheckMode = 1 << 5; // Checking a type that is going to be used to determine the type of a rest binding element
export const CheckModeTypeOnly: CheckMode = 1 << 6; // Called from getTypeOfExpression, diagnostics may be omitted
export const CheckModeForceTuple: CheckMode = 1 << 7;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::TypeSystemEntity","kind":"type","status":"implemented","sigHash":"8598c851f4beb70e599604a65aa2f4641370cb8c852169d9a2430e5e28d123c4"}
 *
 * Go source:
 * TypeSystemEntity any
 */
export type TypeSystemEntity = unknown;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::TypeSystemPropertyName","kind":"type","status":"implemented","sigHash":"f3e85104c9031d8a31da6dff49320b1f254ae82b84a8b687cc943aecff3105e7"}
 *
 * Go source:
 * TypeSystemPropertyName int32
 */
export type TypeSystemPropertyName = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::TypeSystemPropertyNameType+TypeSystemPropertyNameResolvedBaseConstructorType+TypeSystemPropertyNameDeclaredType+TypeSystemPropertyNameResolvedReturnType+TypeSystemPropertyNameResolvedBaseConstraint+TypeSystemPropertyNameResolvedTypeArguments+TypeSystemPropertyNameResolvedBaseTypes+TypeSystemPropertyNameWriteType+TypeSystemPropertyNameInitializerIsUndefined+TypeSystemPropertyNameAliasTarget","kind":"constGroup","status":"implemented","sigHash":"ac6f4ced7923a1a52ae6d18cf184ba86d02efca6dc1066df3c19a483bf987a70"}
 *
 * Go source:
 * const (
 * 	TypeSystemPropertyNameType TypeSystemPropertyName = iota
 * 	TypeSystemPropertyNameResolvedBaseConstructorType
 * 	TypeSystemPropertyNameDeclaredType
 * 	TypeSystemPropertyNameResolvedReturnType
 * 	TypeSystemPropertyNameResolvedBaseConstraint
 * 	TypeSystemPropertyNameResolvedTypeArguments
 * 	TypeSystemPropertyNameResolvedBaseTypes
 * 	TypeSystemPropertyNameWriteType
 * 	TypeSystemPropertyNameInitializerIsUndefined
 * 	TypeSystemPropertyNameAliasTarget
 * )
 */
export const TypeSystemPropertyNameType: TypeSystemPropertyName = 0;
export const TypeSystemPropertyNameResolvedBaseConstructorType: TypeSystemPropertyName = 1;
export const TypeSystemPropertyNameDeclaredType: TypeSystemPropertyName = 2;
export const TypeSystemPropertyNameResolvedReturnType: TypeSystemPropertyName = 3;
export const TypeSystemPropertyNameResolvedBaseConstraint: TypeSystemPropertyName = 4;
export const TypeSystemPropertyNameResolvedTypeArguments: TypeSystemPropertyName = 5;
export const TypeSystemPropertyNameResolvedBaseTypes: TypeSystemPropertyName = 6;
export const TypeSystemPropertyNameWriteType: TypeSystemPropertyName = 7;
export const TypeSystemPropertyNameInitializerIsUndefined: TypeSystemPropertyName = 8;
export const TypeSystemPropertyNameAliasTarget: TypeSystemPropertyName = 9;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::TypeResolution","kind":"type","status":"implemented","sigHash":"f499756030f8c994cc6a92d7eb233b99ff67c4513dea1c7bd2f28d20b51fb78c"}
 *
 * Go source:
 * TypeResolution struct {
 * 	target       TypeSystemEntity
 * 	propertyName TypeSystemPropertyName
 * 	result       bool
 * }
 */
export interface TypeResolution {
  target: TypeSystemEntity;
  propertyName: TypeSystemPropertyName;
  result: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::ContextualInfo","kind":"type","status":"implemented","sigHash":"b355813ec75484c8d07fe9a4fbe23d8f9a6fa6a212619a0acaa5045143ef6371"}
 *
 * Go source:
 * ContextualInfo struct {
 * 	node    *ast.Node
 * 	t       *Type
 * 	isCache bool
 * }
 */
export interface ContextualInfo {
  node: GoPtr<Node>;
  t: GoPtr<Type>;
  isCache: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::InferenceContextInfo","kind":"type","status":"implemented","sigHash":"ae488fa44a2fb3dafbb90ceed4f4f75ae93c8f26ad763fca22338ef55fbb8567"}
 *
 * Go source:
 * InferenceContextInfo struct {
 * 	node    *ast.Node
 * 	context *InferenceContext
 * }
 */
export interface InferenceContextInfo {
  node: GoPtr<Node>;
  context: GoPtr<InferenceContext>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::WideningKind","kind":"type","status":"implemented","sigHash":"094df99b1f56ce29cadd7e9137918dd892ab0f294a9300bcb479b4fbfacb753c"}
 *
 * Go source:
 * WideningKind int32
 */
export type WideningKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::WideningKindNormal+WideningKindFunctionReturn+WideningKindGeneratorNext+WideningKindGeneratorYield","kind":"constGroup","status":"implemented","sigHash":"a3403827ff590131cf1bbc8a15b68d537b7164626f2e82561601300c38316920"}
 *
 * Go source:
 * const (
 * 	WideningKindNormal WideningKind = iota
 * 	WideningKindFunctionReturn
 * 	WideningKindGeneratorNext
 * 	WideningKindGeneratorYield
 * )
 */
export const WideningKindNormal: WideningKind = 0;
export const WideningKindFunctionReturn: WideningKind = 1;
export const WideningKindGeneratorNext: WideningKind = 2;
export const WideningKindGeneratorYield: WideningKind = 3;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::EnumLiteralKey","kind":"type","status":"implemented","sigHash":"cfc14641c4bb3e3dd80c8624bc7dd690b46159758372c0082f1f60468cb0816a"}
 *
 * Go source:
 * EnumLiteralKey struct {
 * 	enumSymbol *ast.Symbol
 * 	value      any
 * }
 */
export interface EnumLiteralKey {
  enumSymbol: GoPtr<Symbol>;
  value: GoInterface<unknown>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::EnumRelationKey","kind":"type","status":"implemented","sigHash":"b41be6e56c44cb449fd3b485e61b5fb3a47206caa6fcce19e022d5b4d2355dcd"}
 *
 * Go source:
 * EnumRelationKey struct {
 * 	sourceId ast.SymbolId
 * 	targetId ast.SymbolId
 * }
 */
export interface EnumRelationKey {
  sourceId: SymbolId;
  targetId: SymbolId;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::CachedTypeKind","kind":"type","status":"implemented","sigHash":"18b3fe6c4985073e67b4c61fd4c8b8ec9fdbb59e1761a56a667b615c327d48e4"}
 *
 * Go source:
 * CachedTypeKind int32
 */
export type CachedTypeKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::CachedTypeKindLiteralUnionBaseType+CachedTypeKindIndexType+CachedTypeKindStringIndexType+CachedTypeKindEquivalentBaseType+CachedTypeKindApparentType+CachedTypeKindAwaitedType+CachedTypeKindEvolvingArrayType+CachedTypeKindArrayLiteralType+CachedTypeKindPermissiveInstantiation+CachedTypeKindRestrictiveInstantiation+CachedTypeKindRestrictiveTypeParameter+CachedTypeKindIndexedAccessForReading+CachedTypeKindIndexedAccessForWriting+CachedTypeKindWidened+CachedTypeKindRegularObjectLiteral+CachedTypeKindPromisedTypeOfPromise+CachedTypeKindDefaultOnlyType+CachedTypeKindSyntheticType+CachedTypeKindDecoratorContext+CachedTypeKindDecoratorContextStatic+CachedTypeKindDecoratorContextPrivate+CachedTypeKindDecoratorContextPrivateStatic","kind":"constGroup","status":"implemented","sigHash":"23b648cbeb5dc5e58bbd0ce3f66378c1f9c170cbc83ed6181ccd8f4266c49b75"}
 *
 * Go source:
 * const (
 * 	CachedTypeKindLiteralUnionBaseType CachedTypeKind = iota
 * 	CachedTypeKindIndexType
 * 	CachedTypeKindStringIndexType
 * 	CachedTypeKindEquivalentBaseType
 * 	CachedTypeKindApparentType
 * 	CachedTypeKindAwaitedType
 * 	CachedTypeKindEvolvingArrayType
 * 	CachedTypeKindArrayLiteralType
 * 	CachedTypeKindPermissiveInstantiation
 * 	CachedTypeKindRestrictiveInstantiation
 * 	CachedTypeKindRestrictiveTypeParameter
 * 	CachedTypeKindIndexedAccessForReading
 * 	CachedTypeKindIndexedAccessForWriting
 * 	CachedTypeKindWidened
 * 	CachedTypeKindRegularObjectLiteral
 * 	CachedTypeKindPromisedTypeOfPromise
 * 	CachedTypeKindDefaultOnlyType
 * 	CachedTypeKindSyntheticType
 * 	CachedTypeKindDecoratorContext
 * 	CachedTypeKindDecoratorContextStatic
 * 	CachedTypeKindDecoratorContextPrivate
 * 	CachedTypeKindDecoratorContextPrivateStatic
 * )
 */
export const CachedTypeKindLiteralUnionBaseType: CachedTypeKind = 0;
export const CachedTypeKindIndexType: CachedTypeKind = 1;
export const CachedTypeKindStringIndexType: CachedTypeKind = 2;
export const CachedTypeKindEquivalentBaseType: CachedTypeKind = 3;
export const CachedTypeKindApparentType: CachedTypeKind = 4;
export const CachedTypeKindAwaitedType: CachedTypeKind = 5;
export const CachedTypeKindEvolvingArrayType: CachedTypeKind = 6;
export const CachedTypeKindArrayLiteralType: CachedTypeKind = 7;
export const CachedTypeKindPermissiveInstantiation: CachedTypeKind = 8;
export const CachedTypeKindRestrictiveInstantiation: CachedTypeKind = 9;
export const CachedTypeKindRestrictiveTypeParameter: CachedTypeKind = 10;
export const CachedTypeKindIndexedAccessForReading: CachedTypeKind = 11;
export const CachedTypeKindIndexedAccessForWriting: CachedTypeKind = 12;
export const CachedTypeKindWidened: CachedTypeKind = 13;
export const CachedTypeKindRegularObjectLiteral: CachedTypeKind = 14;
export const CachedTypeKindPromisedTypeOfPromise: CachedTypeKind = 15;
export const CachedTypeKindDefaultOnlyType: CachedTypeKind = 16;
export const CachedTypeKindSyntheticType: CachedTypeKind = 17;
export const CachedTypeKindDecoratorContext: CachedTypeKind = 18;
export const CachedTypeKindDecoratorContextStatic: CachedTypeKind = 19;
export const CachedTypeKindDecoratorContextPrivate: CachedTypeKind = 20;
export const CachedTypeKindDecoratorContextPrivateStatic: CachedTypeKind = 21;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::CachedTypeKey","kind":"type","status":"implemented","sigHash":"2bd5128b8cc3d13c7c0273e4b856abf1458bac80aec153d11f50ebee57451288"}
 *
 * Go source:
 * CachedTypeKey struct {
 * 	kind   CachedTypeKind
 * 	typeId TypeId
 * }
 */
export interface CachedTypeKey {
  kind: CachedTypeKind;
  typeId: TypeId;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::NarrowedTypeKey","kind":"type","status":"implemented","sigHash":"50a0d03dbc7b633abec1e0f055f87248dbd719d91b0b84fc2d0cfc0504cb14ed"}
 *
 * Go source:
 * NarrowedTypeKey struct {
 * 	t            *Type
 * 	candidate    *Type
 * 	assumeTrue   bool
 * 	checkDerived bool
 * }
 */
export interface NarrowedTypeKey {
  t: GoPtr<Type>;
  candidate: GoPtr<Type>;
  assumeTrue: bool;
  checkDerived: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::UnionOfUnionKey","kind":"type","status":"implemented","sigHash":"6fcf0c7bfdb99cbebde2cd7def897933da59679754f0348e6475382d372b856b"}
 *
 * Go source:
 * UnionOfUnionKey struct {
 * 	id1 TypeId
 * 	id2 TypeId
 * 	r   UnionReduction
 * 	a   CacheHashKey
 * }
 */
export interface UnionOfUnionKey {
  id1: TypeId;
  id2: TypeId;
  r: UnionReduction;
  a: CacheHashKey;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::CachedSignatureKey","kind":"type","status":"implemented","sigHash":"f5b61212a0b9db997ccaba24c6c634bb9a45fdc216c69098ec3201af06e066a9"}
 *
 * Go source:
 * CachedSignatureKey struct {
 * 	sig *Signature
 * 	key CacheHashKey // Type list key or one of the special keys below
 * }
 */
export interface CachedSignatureKey {
  sig: GoPtr<Signature>;
  key: CacheHashKey;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::varGroup::SignatureKeyErased+SignatureKeyCanonical+SignatureKeyBase+SignatureKeyInner+SignatureKeyOuter","kind":"varGroup","status":"implemented","sigHash":"f215f645218f046925c395ed34e5c73c7ef7a703f371e0d7b4eaf5ceeb0c4242"}
 *
 * Go source:
 * var (
 * 	SignatureKeyErased    = CacheHashKey(xxh3.HashString128("-"))
 * 	SignatureKeyCanonical = CacheHashKey(xxh3.HashString128("*"))
 * 	SignatureKeyBase      = CacheHashKey(xxh3.HashString128("#"))
 * 	SignatureKeyInner     = CacheHashKey(xxh3.HashString128("<"))
 * 	SignatureKeyOuter     = CacheHashKey(xxh3.HashString128(">"))
 * )
 */
export let SignatureKeyErased: CacheHashKey = xxh3.HashString128("-");
export let SignatureKeyCanonical: CacheHashKey = xxh3.HashString128("*");
export let SignatureKeyBase: CacheHashKey = xxh3.HashString128("#");
export let SignatureKeyInner: CacheHashKey = xxh3.HashString128("<");
export let SignatureKeyOuter: CacheHashKey = xxh3.HashString128(">");

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::StringMappingKey","kind":"type","status":"implemented","sigHash":"10cfb3db96c6b66442f6a60f0d29262d0fa27f53d2dffa9870799bfe93a5e443"}
 *
 * Go source:
 * StringMappingKey struct {
 * 	s *ast.Symbol
 * 	t *Type
 * }
 */
export interface StringMappingKey {
  s: GoPtr<Symbol>;
  t: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::AssignmentReducedKey","kind":"type","status":"implemented","sigHash":"661196f332c5c4620babd078e132cad8e593ec04f8bf4f18fabf21a46f69408b"}
 *
 * Go source:
 * AssignmentReducedKey struct {
 * 	id1 TypeId
 * 	id2 TypeId
 * }
 */
export interface AssignmentReducedKey {
  id1: TypeId;
  id2: TypeId;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::DiscriminatedContextualTypeKey","kind":"type","status":"implemented","sigHash":"b20c302e94c52541776955da2357c1b57f1e87e62594e28fe44c0082435174fe"}
 *
 * Go source:
 * DiscriminatedContextualTypeKey struct {
 * 	nodeId ast.NodeId
 * 	typeId TypeId
 * }
 */
export interface DiscriminatedContextualTypeKey {
  nodeId: NodeId;
  typeId: TypeId;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::InstantiationExpressionKey","kind":"type","status":"implemented","sigHash":"d0cc6ae79bd7e4ff148badfafd881cbe0cafe8ae709fc1c04d6804ada2d92413"}
 *
 * Go source:
 * InstantiationExpressionKey struct {
 * 	nodeId ast.NodeId
 * 	typeId TypeId
 * }
 */
export interface InstantiationExpressionKey {
  nodeId: NodeId;
  typeId: TypeId;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::SubstitutionTypeKey","kind":"type","status":"implemented","sigHash":"6b53560e0c863b1476a7140422b7e80f7c551a20a7d190b1702399692c937b1e"}
 *
 * Go source:
 * SubstitutionTypeKey struct {
 * 	baseId       TypeId
 * 	constraintId TypeId
 * }
 */
export interface SubstitutionTypeKey {
  baseId: TypeId;
  constraintId: TypeId;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::ReverseMappedTypeKey","kind":"type","status":"implemented","sigHash":"b974e39a5db863e405c6599bc75c6a9cee110e4e74dd4320898c897bbe11d9bd"}
 *
 * Go source:
 * ReverseMappedTypeKey struct {
 * 	sourceId     TypeId
 * 	targetId     TypeId
 * 	constraintId TypeId
 * }
 */
export interface ReverseMappedTypeKey {
  sourceId: TypeId;
  targetId: TypeId;
  constraintId: TypeId;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::IterationTypesKey","kind":"type","status":"implemented","sigHash":"23b04e03464ec8ba1adaa0684bb25b2a6f2746ce2999c1b97f747255b740a772"}
 *
 * Go source:
 * IterationTypesKey struct {
 * 	typeId TypeId
 * 	use    IterationUse
 * }
 */
export interface IterationTypesKey {
  typeId: TypeId;
  use: IterationUse;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::PropertiesTypesKey","kind":"type","status":"implemented","sigHash":"4cf3c2cc4cba7d68e2c47098059dcf324ee1ca9c6f97e15161416569e15bee94"}
 *
 * Go source:
 * PropertiesTypesKey struct {
 * 	typeId            TypeId
 * 	include           TypeFlags
 * 	includeOrigin     bool
 * 	unresolvedMembers bool
 * }
 */
export interface PropertiesTypesKey {
  typeId: TypeId;
  include: TypeFlags;
  includeOrigin: bool;
  unresolvedMembers: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::NonExistentPropertyKey","kind":"type","status":"implemented","sigHash":"5e4565b9da4ca0fb4f55fd51e414f3d8e0ea35c47d9ac2ab25e1e8af9c015e95"}
 *
 * Go source:
 * NonExistentPropertyKey struct {
 * 	propNode       *ast.Node
 * 	containingType *Type
 * 	isUncheckedJS  bool
 * }
 */
export interface NonExistentPropertyKey {
  propNode: GoPtr<Node>;
  containingType: GoPtr<Type>;
  isUncheckedJS: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::FlowLoopKey","kind":"type","status":"implemented","sigHash":"2ad7d99e684b25b89e8eb92539897434e0c9cde7485ce13a33cfdcdcc6bd1972"}
 *
 * Go source:
 * FlowLoopKey struct {
 * 	flowNode *ast.FlowNode
 * 	refKey   CacheHashKey
 * }
 */
export interface FlowLoopKey {
  flowNode: GoPtr<FlowNode>;
  refKey: CacheHashKey;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::FlowLoopInfo","kind":"type","status":"implemented","sigHash":"ebd0032c759ac10d1ca3454456f00408cfd9fec02f4841dac05b91e304844b8b"}
 *
 * Go source:
 * FlowLoopInfo struct {
 * 	key   FlowLoopKey
 * 	types []*Type
 * }
 */
export interface FlowLoopInfo {
  key: FlowLoopKey;
  types: GoSlice<GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::InferenceFlags","kind":"type","status":"implemented","sigHash":"de898638a064f08830967a64b4615242841b20254375bae32d2f2c1f8577a656"}
 *
 * Go source:
 * InferenceFlags uint32
 */
export type InferenceFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::InferenceFlagsNone+InferenceFlagsNoDefault+InferenceFlagsAnyDefault+InferenceFlagsSkippedGenericFunction","kind":"constGroup","status":"implemented","sigHash":"a6dddf0e483767bcbed1476b05cbdf5cc3f8d1a6cfaef668ce85064e2e24d062"}
 *
 * Go source:
 * const (
 * 	InferenceFlagsNone                   InferenceFlags = 0      // No special inference behaviors
 * 	InferenceFlagsNoDefault              InferenceFlags = 1 << 0 // Infer silentNeverType for no inferences (otherwise anyType or unknownType)
 * 	InferenceFlagsAnyDefault             InferenceFlags = 1 << 1 // Infer anyType (in JS files) for no inferences (otherwise unknownType)
 * 	InferenceFlagsSkippedGenericFunction InferenceFlags = 1 << 2 // A generic function was skipped during inference
 * )
 */
export const InferenceFlagsNone: InferenceFlags = 0; // No special inference behaviors
export const InferenceFlagsNoDefault: InferenceFlags = 1 << 0; // Infer silentNeverType for no inferences (otherwise anyType or unknownType)
export const InferenceFlagsAnyDefault: InferenceFlags = 1 << 1; // Infer anyType (in JS files) for no inferences (otherwise unknownType)
export const InferenceFlagsSkippedGenericFunction: InferenceFlags = 1 << 2; // A generic function was skipped during inference

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::InferenceContext","kind":"type","status":"implemented","sigHash":"faefa891be33054fd454f0e160de2882c8cd82e34e814f1082eb46d1919e170e"}
 *
 * Go source:
 * InferenceContext struct {
 * 	inferences                    []*InferenceInfo // Inferences made for each type parameter
 * 	signature                     *Signature       // Generic signature for which inferences are made (if any)
 * 	flags                         InferenceFlags   // Inference flags
 * 	compareTypes                  TypeComparer     // Type comparer function
 * 	mapper                        *TypeMapper      // Mapper that fixes inferences
 * 	nonFixingMapper               *TypeMapper      // Mapper that doesn't fix inferences
 * 	returnMapper                  *TypeMapper      // Type mapper for inferences from return types (if any)
 * 	outerReturnMapper             *TypeMapper      // Type mapper for inferences from return types of outer function (if any)
 * 	inferredTypeParameters        []*Type          // Inferred type parameters for function result
 * 	intraExpressionInferenceSites []IntraExpressionInferenceSite
 * }
 */
export interface InferenceContext {
  inferences: GoSlice<GoPtr<InferenceInfo>>;
  signature: GoPtr<Signature>;
  flags: InferenceFlags;
  compareTypes: TypeComparer;
  mapper: GoPtr<TypeMapper>;
  nonFixingMapper: GoPtr<TypeMapper>;
  returnMapper: GoPtr<TypeMapper>;
  outerReturnMapper: GoPtr<TypeMapper>;
  inferredTypeParameters: GoSlice<GoPtr<Type>>;
  intraExpressionInferenceSites: GoSlice<IntraExpressionInferenceSite>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::InferenceInfo","kind":"type","status":"implemented","sigHash":"8adb01f3fd368e0bc7d3d46ce715769bd35dc4e6eea54c5b72ea6b6ef0111e80"}
 *
 * Go source:
 * InferenceInfo struct {
 * 	typeParameter    *Type             // Type parameter for which inferences are being made
 * 	candidates       []*Type           // Candidates in covariant positions
 * 	contraCandidates []*Type           // Candidates in contravariant positions
 * 	inferredType     *Type             // Cache for resolved inferred type
 * 	priority         InferencePriority // Priority of current inference set
 * 	topLevel         bool              // True if all inferences are to top level occurrences
 * 	isFixed          bool              // True if inferences are fixed
 * 	impliedArity     int               // Implied arity (or -1)
 * }
 */
export interface InferenceInfo {
  typeParameter: GoPtr<Type>;
  candidates: GoSlice<GoPtr<Type>>;
  contraCandidates: GoSlice<GoPtr<Type>>;
  inferredType: GoPtr<Type>;
  priority: InferencePriority;
  topLevel: bool;
  isFixed: bool;
  impliedArity: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::InferencePriority","kind":"type","status":"implemented","sigHash":"8b346ca769b48f1db20957e650f715e30e200abf6b7ffb1f02b3399d654e75ce"}
 *
 * Go source:
 * InferencePriority int32
 */
export type InferencePriority = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::InferencePriorityNone+InferencePriorityNakedTypeVariable+InferencePrioritySpeculativeTuple+InferencePrioritySubstituteSource+InferencePriorityHomomorphicMappedType+InferencePriorityPartialHomomorphicMappedType+InferencePriorityMappedTypeConstraint+InferencePriorityContravariantConditional+InferencePriorityReturnType+InferencePriorityLiteralKeyof+InferencePriorityNoConstraints+InferencePriorityAlwaysStrict+InferencePriorityMaxValue+InferencePriorityCircularity+InferencePriorityPriorityImpliesCombination","kind":"constGroup","status":"implemented","sigHash":"035289e8b5ebe2fd3dd25e793a03eb9aad83d0229abe469e95b31338e486cc4e"}
 *
 * Go source:
 * const (
 * 	InferencePriorityNone                         InferencePriority = 0
 * 	InferencePriorityNakedTypeVariable            InferencePriority = 1 << 0  // Naked type variable in union or intersection type
 * 	InferencePrioritySpeculativeTuple             InferencePriority = 1 << 1  // Speculative tuple inference
 * 	InferencePrioritySubstituteSource             InferencePriority = 1 << 2  // Source of inference originated within a substitution type's substitute
 * 	InferencePriorityHomomorphicMappedType        InferencePriority = 1 << 3  // Reverse inference for homomorphic mapped type
 * 	InferencePriorityPartialHomomorphicMappedType InferencePriority = 1 << 4  // Partial reverse inference for homomorphic mapped type
 * 	InferencePriorityMappedTypeConstraint         InferencePriority = 1 << 5  // Reverse inference for mapped type
 * 	InferencePriorityContravariantConditional     InferencePriority = 1 << 6  // Conditional type in contravariant position
 * 	InferencePriorityReturnType                   InferencePriority = 1 << 7  // Inference made from return type of generic function
 * 	InferencePriorityLiteralKeyof                 InferencePriority = 1 << 8  // Inference made from a string literal to a keyof T
 * 	InferencePriorityNoConstraints                InferencePriority = 1 << 9  // Don't infer from constraints of instantiable types
 * 	InferencePriorityAlwaysStrict                 InferencePriority = 1 << 10 // Always use strict rules for contravariant inferences
 * 	InferencePriorityMaxValue                     InferencePriority = 1 << 11 // Seed for inference priority tracking
 * 	InferencePriorityCircularity                  InferencePriority = -1      // Inference circularity (value less than all other priorities)
 * 
 * 	InferencePriorityPriorityImpliesCombination = InferencePriorityReturnType | InferencePriorityMappedTypeConstraint | InferencePriorityLiteralKeyof // These priorities imply that the resulting type should be a combination of all candidates
 * )
 */
export const InferencePriorityNone: InferencePriority = 0;
export const InferencePriorityNakedTypeVariable: InferencePriority = 1 << 0; // Naked type variable in union or intersection type
export const InferencePrioritySpeculativeTuple: InferencePriority = 1 << 1; // Speculative tuple inference
export const InferencePrioritySubstituteSource: InferencePriority = 1 << 2; // Source of inference originated within a substitution type's substitute
export const InferencePriorityHomomorphicMappedType: InferencePriority = 1 << 3; // Reverse inference for homomorphic mapped type
export const InferencePriorityPartialHomomorphicMappedType: InferencePriority = 1 << 4; // Partial reverse inference for homomorphic mapped type
export const InferencePriorityMappedTypeConstraint: InferencePriority = 1 << 5; // Reverse inference for mapped type
export const InferencePriorityContravariantConditional: InferencePriority = 1 << 6; // Conditional type in contravariant position
export const InferencePriorityReturnType: InferencePriority = 1 << 7; // Inference made from return type of generic function
export const InferencePriorityLiteralKeyof: InferencePriority = 1 << 8; // Inference made from a string literal to a keyof T
export const InferencePriorityNoConstraints: InferencePriority = 1 << 9; // Don't infer from constraints of instantiable types
export const InferencePriorityAlwaysStrict: InferencePriority = 1 << 10; // Always use strict rules for contravariant inferences
export const InferencePriorityMaxValue: InferencePriority = 1 << 11; // Seed for inference priority tracking
export const InferencePriorityCircularity: InferencePriority = -1; // Inference circularity (value less than all other priorities)

// These priorities imply that the resulting type should be a combination of all candidates
export const InferencePriorityPriorityImpliesCombination: InferencePriority =
  InferencePriorityReturnType | InferencePriorityMappedTypeConstraint | InferencePriorityLiteralKeyof;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::IntraExpressionInferenceSite","kind":"type","status":"implemented","sigHash":"6c83b9d2c16e7f75e96b8c929ac5e1a18c020e47d1f5afeb093d79112768d989"}
 *
 * Go source:
 * IntraExpressionInferenceSite struct {
 * 	node *ast.Node
 * 	t    *Type
 * }
 */
export interface IntraExpressionInferenceSite {
  node: GoPtr<Node>;
  t: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::DeclarationMeaning","kind":"type","status":"implemented","sigHash":"eec636ed59e233183f78c8e69853e0c11542f3d258a56824b48d5edf64f26eac"}
 *
 * Go source:
 * DeclarationMeaning uint32
 */
export type DeclarationMeaning = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::DeclarationMeaningGetAccessor+DeclarationMeaningSetAccessor+DeclarationMeaningPropertyAssignment+DeclarationMeaningMethod+DeclarationMeaningPrivateStatic+DeclarationMeaningGetOrSetAccessor+DeclarationMeaningPropertyAssignmentOrMethod","kind":"constGroup","status":"implemented","sigHash":"54549898ea1e5c8589af4eddc3c5220c05228371dd08e05ae5509e4c21194b5a"}
 *
 * Go source:
 * const (
 * 	DeclarationMeaningGetAccessor DeclarationMeaning = 1 << iota
 * 	DeclarationMeaningSetAccessor
 * 	DeclarationMeaningPropertyAssignment
 * 	DeclarationMeaningMethod
 * 	DeclarationMeaningPrivateStatic
 * 	DeclarationMeaningGetOrSetAccessor           = DeclarationMeaningGetAccessor | DeclarationMeaningSetAccessor
 * 	DeclarationMeaningPropertyAssignmentOrMethod = DeclarationMeaningPropertyAssignment | DeclarationMeaningMethod
 * )
 */
export const DeclarationMeaningGetAccessor: DeclarationMeaning = 1 << 0;
export const DeclarationMeaningSetAccessor: DeclarationMeaning = 1 << 1;
export const DeclarationMeaningPropertyAssignment: DeclarationMeaning = 1 << 2;
export const DeclarationMeaningMethod: DeclarationMeaning = 1 << 3;
export const DeclarationMeaningPrivateStatic: DeclarationMeaning = 1 << 4;
export const DeclarationMeaningGetOrSetAccessor: DeclarationMeaning = DeclarationMeaningGetAccessor | DeclarationMeaningSetAccessor;
export const DeclarationMeaningPropertyAssignmentOrMethod: DeclarationMeaning = DeclarationMeaningPropertyAssignment | DeclarationMeaningMethod;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::DeclarationSpaces","kind":"type","status":"implemented","sigHash":"77a7d4d4fb3c22253b83140b95864e61563c2b4f4e60d2564de50cf99b7dac38"}
 *
 * Go source:
 * DeclarationSpaces int32
 */
export type DeclarationSpaces = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::DeclarationSpacesNone+DeclarationSpacesExportValue+DeclarationSpacesExportType+DeclarationSpacesExportNamespace","kind":"constGroup","status":"implemented","sigHash":"6c7e92ff232dfaee0616ec0c2f965b401c75a348abbc6960779b0c668e87e9c7"}
 *
 * Go source:
 * const (
 * 	DeclarationSpacesNone            DeclarationSpaces = 0
 * 	DeclarationSpacesExportValue     DeclarationSpaces = 1 << 0
 * 	DeclarationSpacesExportType      DeclarationSpaces = 1 << 1
 * 	DeclarationSpacesExportNamespace DeclarationSpaces = 1 << 2
 * )
 */
export const DeclarationSpacesNone: DeclarationSpaces = 0;
export const DeclarationSpacesExportValue: DeclarationSpaces = 1 << 0;
export const DeclarationSpacesExportType: DeclarationSpaces = 1 << 1;
export const DeclarationSpacesExportNamespace: DeclarationSpaces = 1 << 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::IntrinsicTypeKind","kind":"type","status":"implemented","sigHash":"0fd487595abb890f94497efa0a314a86fc9e3a8482178254531d5d07cc45a546"}
 *
 * Go source:
 * IntrinsicTypeKind int32
 */
export type IntrinsicTypeKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::IntrinsicTypeKindUnknown+IntrinsicTypeKindUppercase+IntrinsicTypeKindLowercase+IntrinsicTypeKindCapitalize+IntrinsicTypeKindUncapitalize+IntrinsicTypeKindNoInfer","kind":"constGroup","status":"implemented","sigHash":"c652701cc39cfe7e6cb02b85df54a1b204623995bb9da3fe4779e2882bba6ff9"}
 *
 * Go source:
 * const (
 * 	IntrinsicTypeKindUnknown IntrinsicTypeKind = iota
 * 	IntrinsicTypeKindUppercase
 * 	IntrinsicTypeKindLowercase
 * 	IntrinsicTypeKindCapitalize
 * 	IntrinsicTypeKindUncapitalize
 * 	IntrinsicTypeKindNoInfer
 * )
 */
export const IntrinsicTypeKindUnknown: IntrinsicTypeKind = 0;
export const IntrinsicTypeKindUppercase: IntrinsicTypeKind = 1;
export const IntrinsicTypeKindLowercase: IntrinsicTypeKind = 2;
export const IntrinsicTypeKindCapitalize: IntrinsicTypeKind = 3;
export const IntrinsicTypeKindUncapitalize: IntrinsicTypeKind = 4;
export const IntrinsicTypeKindNoInfer: IntrinsicTypeKind = 5;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::varGroup::intrinsicTypeKinds","kind":"varGroup","status":"implemented","sigHash":"09cdc6a3017336b05be655388545b02e230f6be43d266d6c3ee6426d1fafcedc"}
 *
 * Go source:
 * var intrinsicTypeKinds = map[string]IntrinsicTypeKind{
 * 	"Uppercase":    IntrinsicTypeKindUppercase,
 * 	"Lowercase":    IntrinsicTypeKindLowercase,
 * 	"Capitalize":   IntrinsicTypeKindCapitalize,
 * 	"Uncapitalize": IntrinsicTypeKindUncapitalize,
 * 	"NoInfer":      IntrinsicTypeKindNoInfer,
 * }
 */
export let intrinsicTypeKinds: GoMap<string, IntrinsicTypeKind> = new globalThis.Map<string, IntrinsicTypeKind>([
  ["Uppercase", IntrinsicTypeKindUppercase],
  ["Lowercase", IntrinsicTypeKindLowercase],
  ["Capitalize", IntrinsicTypeKindCapitalize],
  ["Uncapitalize", IntrinsicTypeKindUncapitalize],
  ["NoInfer", IntrinsicTypeKindNoInfer],
]);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::MappedTypeModifiers","kind":"type","status":"implemented","sigHash":"fea5af96251cf88e56fafacbc4434dcbd56d91dfff3e31f83d7378cee1db7630"}
 *
 * Go source:
 * MappedTypeModifiers uint32
 */
export type MappedTypeModifiers = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::MappedTypeModifiersIncludeReadonly+MappedTypeModifiersExcludeReadonly+MappedTypeModifiersIncludeOptional+MappedTypeModifiersExcludeOptional","kind":"constGroup","status":"implemented","sigHash":"6cef98d1e5a2e2810dfe4fdea2cb51c5f42f9000e334f5fc8a2ea96b3100a550"}
 *
 * Go source:
 * const (
 * 	MappedTypeModifiersIncludeReadonly MappedTypeModifiers = 1 << 0
 * 	MappedTypeModifiersExcludeReadonly MappedTypeModifiers = 1 << 1
 * 	MappedTypeModifiersIncludeOptional MappedTypeModifiers = 1 << 2
 * 	MappedTypeModifiersExcludeOptional MappedTypeModifiers = 1 << 3
 * )
 */
export const MappedTypeModifiersIncludeReadonly: MappedTypeModifiers = 1 << 0;
export const MappedTypeModifiersExcludeReadonly: MappedTypeModifiers = 1 << 1;
export const MappedTypeModifiersIncludeOptional: MappedTypeModifiers = 1 << 2;
export const MappedTypeModifiersExcludeOptional: MappedTypeModifiers = 1 << 3;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::MappedTypeNameTypeKind","kind":"type","status":"implemented","sigHash":"96601e6eb1252bd9f3bd8671a0c3860bf23441719d81e811f316f2b49e811088"}
 *
 * Go source:
 * MappedTypeNameTypeKind int32
 */
export type MappedTypeNameTypeKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::MappedTypeNameTypeKindNone+MappedTypeNameTypeKindFiltering+MappedTypeNameTypeKindRemapping","kind":"constGroup","status":"implemented","sigHash":"0fdb4cb3c2b764ea32a97986caf4496ef88ed54bbaefa610f727bc8fe6c38a87"}
 *
 * Go source:
 * const (
 * 	MappedTypeNameTypeKindNone MappedTypeNameTypeKind = iota
 * 	MappedTypeNameTypeKindFiltering
 * 	MappedTypeNameTypeKindRemapping
 * )
 */
export const MappedTypeNameTypeKindNone: MappedTypeNameTypeKind = 0;
export const MappedTypeNameTypeKindFiltering: MappedTypeNameTypeKind = 1;
export const MappedTypeNameTypeKindRemapping: MappedTypeNameTypeKind = 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::ReferenceHint","kind":"type","status":"implemented","sigHash":"250632d531bbf9d946059bfbc3fb83d43a00bdc19337bfed297db8d8f33abc11"}
 *
 * Go source:
 * ReferenceHint int32
 */
export type ReferenceHint = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::ReferenceHintUnspecified+ReferenceHintIdentifier+ReferenceHintProperty+ReferenceHintExportAssignment+ReferenceHintJsx+ReferenceHintExportImportEquals+ReferenceHintExportSpecifier+ReferenceHintDecorator","kind":"constGroup","status":"implemented","sigHash":"5b2b9466e3160fd2388483eba163fc11d6a2e141d24bb87ed5ca93f0a44f468b"}
 *
 * Go source:
 * const (
 * 	ReferenceHintUnspecified ReferenceHint = iota
 * 	ReferenceHintIdentifier
 * 	ReferenceHintProperty
 * 	ReferenceHintExportAssignment
 * 	ReferenceHintJsx
 * 	ReferenceHintExportImportEquals
 * 	ReferenceHintExportSpecifier
 * 	ReferenceHintDecorator
 * )
 */
export const ReferenceHintUnspecified: ReferenceHint = 0;
export const ReferenceHintIdentifier: ReferenceHint = 1;
export const ReferenceHintProperty: ReferenceHint = 2;
export const ReferenceHintExportAssignment: ReferenceHint = 3;
export const ReferenceHintJsx: ReferenceHint = 4;
export const ReferenceHintExportImportEquals: ReferenceHint = 5;
export const ReferenceHintExportSpecifier: ReferenceHint = 6;
export const ReferenceHintDecorator: ReferenceHint = 7;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::TypeFacts","kind":"type","status":"implemented","sigHash":"8ae68cc83a364905b0303c4c09f2cd166e69bcead60baa7b1ac97ed808b83b82"}
 *
 * Go source:
 * TypeFacts uint32
 */
export type TypeFacts = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::TypeFactsNone+TypeFactsTypeofEQString+TypeFactsTypeofEQNumber+TypeFactsTypeofEQBigInt+TypeFactsTypeofEQBoolean+TypeFactsTypeofEQSymbol+TypeFactsTypeofEQObject+TypeFactsTypeofEQFunction+TypeFactsTypeofEQHostObject+TypeFactsTypeofNEString+TypeFactsTypeofNENumber+TypeFactsTypeofNEBigInt+TypeFactsTypeofNEBoolean+TypeFactsTypeofNESymbol+TypeFactsTypeofNEObject+TypeFactsTypeofNEFunction+TypeFactsTypeofNEHostObject+TypeFactsEQUndefined+TypeFactsEQNull+TypeFactsEQUndefinedOrNull+TypeFactsNEUndefined+TypeFactsNENull+TypeFactsNEUndefinedOrNull+TypeFactsTruthy+TypeFactsFalsy+TypeFactsIsUndefined+TypeFactsIsNull+TypeFactsIsUndefinedOrNull+TypeFactsAll+TypeFactsBaseStringStrictFacts+TypeFactsBaseStringFacts+TypeFactsStringStrictFacts+TypeFactsStringFacts+TypeFactsEmptyStringStrictFacts+TypeFactsEmptyStringFacts+TypeFactsNonEmptyStringStrictFacts+TypeFactsNonEmptyStringFacts+TypeFactsBaseNumberStrictFacts+TypeFactsBaseNumberFacts+TypeFactsNumberStrictFacts+TypeFactsNumberFacts+TypeFactsZeroNumberStrictFacts+TypeFactsZeroNumberFacts+TypeFactsNonZeroNumberStrictFacts+TypeFactsNonZeroNumberFacts+TypeFactsBaseBigIntStrictFacts+TypeFactsBaseBigIntFacts+TypeFactsBigIntStrictFacts+TypeFactsBigIntFacts+TypeFactsZeroBigIntStrictFacts+TypeFactsZeroBigIntFacts+TypeFactsNonZeroBigIntStrictFacts+TypeFactsNonZeroBigIntFacts+TypeFactsBaseBooleanStrictFacts+TypeFactsBaseBooleanFacts+TypeFactsBooleanStrictFacts+TypeFactsBooleanFacts+TypeFactsFalseStrictFacts+TypeFactsFalseFacts+TypeFactsTrueStrictFacts+TypeFactsTrueFacts+TypeFactsSymbolStrictFacts+TypeFactsSymbolFacts+TypeFactsObjectStrictFacts+TypeFactsObjectFacts+TypeFactsFunctionStrictFacts+TypeFactsFunctionFacts+TypeFactsVoidFacts+TypeFactsUndefinedFacts+TypeFactsNullFacts+TypeFactsEmptyObjectStrictFacts+TypeFactsEmptyObjectFacts+TypeFactsUnknownFacts+TypeFactsAllTypeofNE+TypeFactsOrFactsMask+TypeFactsAndFactsMask","kind":"constGroup","status":"implemented","sigHash":"8c1b6714c32a4967af26829f9aa14d87a68c94ec8df3c60e59fed18e1834dcab"}
 *
 * Go source:
 * const (
 * 	TypeFactsNone               TypeFacts = 0
 * 	TypeFactsTypeofEQString     TypeFacts = 1 << 0
 * 	TypeFactsTypeofEQNumber     TypeFacts = 1 << 1
 * 	TypeFactsTypeofEQBigInt     TypeFacts = 1 << 2
 * 	TypeFactsTypeofEQBoolean    TypeFacts = 1 << 3
 * 	TypeFactsTypeofEQSymbol     TypeFacts = 1 << 4
 * 	TypeFactsTypeofEQObject     TypeFacts = 1 << 5
 * 	TypeFactsTypeofEQFunction   TypeFacts = 1 << 6
 * 	TypeFactsTypeofEQHostObject TypeFacts = 1 << 7
 * 	TypeFactsTypeofNEString     TypeFacts = 1 << 8
 * 	TypeFactsTypeofNENumber     TypeFacts = 1 << 9
 * 	TypeFactsTypeofNEBigInt     TypeFacts = 1 << 10
 * 	TypeFactsTypeofNEBoolean    TypeFacts = 1 << 11
 * 	TypeFactsTypeofNESymbol     TypeFacts = 1 << 12
 * 	TypeFactsTypeofNEObject     TypeFacts = 1 << 13
 * 	TypeFactsTypeofNEFunction   TypeFacts = 1 << 14
 * 	TypeFactsTypeofNEHostObject TypeFacts = 1 << 15
 * 	TypeFactsEQUndefined        TypeFacts = 1 << 16
 * 	TypeFactsEQNull             TypeFacts = 1 << 17
 * 	TypeFactsEQUndefinedOrNull  TypeFacts = 1 << 18
 * 	TypeFactsNEUndefined        TypeFacts = 1 << 19
 * 	TypeFactsNENull             TypeFacts = 1 << 20
 * 	TypeFactsNEUndefinedOrNull  TypeFacts = 1 << 21
 * 	TypeFactsTruthy             TypeFacts = 1 << 22
 * 	TypeFactsFalsy              TypeFacts = 1 << 23
 * 	TypeFactsIsUndefined        TypeFacts = 1 << 24
 * 	TypeFactsIsNull             TypeFacts = 1 << 25
 * 	TypeFactsIsUndefinedOrNull  TypeFacts = TypeFactsIsUndefined | TypeFactsIsNull
 * 	TypeFactsAll                TypeFacts = (1 << 27) - 1
 * 	// The following members encode facts about particular kinds of types for use in the getTypeFacts function.
 * 	// The presence of a particular fact means that the given test is true for some (and possibly all) values
 * 	// of that kind of type.
 * 	TypeFactsBaseStringStrictFacts     TypeFacts = TypeFactsTypeofEQString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull
 * 	TypeFactsBaseStringFacts           TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
 * 	TypeFactsStringStrictFacts         TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsTruthy | TypeFactsFalsy
 * 	TypeFactsStringFacts               TypeFacts = TypeFactsBaseStringFacts | TypeFactsTruthy
 * 	TypeFactsEmptyStringStrictFacts    TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsFalsy
 * 	TypeFactsEmptyStringFacts          TypeFacts = TypeFactsBaseStringFacts
 * 	TypeFactsNonEmptyStringStrictFacts TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsTruthy
 * 	TypeFactsNonEmptyStringFacts       TypeFacts = TypeFactsBaseStringFacts | TypeFactsTruthy
 * 	TypeFactsBaseNumberStrictFacts     TypeFacts = TypeFactsTypeofEQNumber | TypeFactsTypeofNEString | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull
 * 	TypeFactsBaseNumberFacts           TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
 * 	TypeFactsNumberStrictFacts         TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsTruthy | TypeFactsFalsy
 * 	TypeFactsNumberFacts               TypeFacts = TypeFactsBaseNumberFacts | TypeFactsTruthy
 * 	TypeFactsZeroNumberStrictFacts     TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsFalsy
 * 	TypeFactsZeroNumberFacts           TypeFacts = TypeFactsBaseNumberFacts
 * 	TypeFactsNonZeroNumberStrictFacts  TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsTruthy
 * 	TypeFactsNonZeroNumberFacts        TypeFacts = TypeFactsBaseNumberFacts | TypeFactsTruthy
 * 	TypeFactsBaseBigIntStrictFacts     TypeFacts = TypeFactsTypeofEQBigInt | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull
 * 	TypeFactsBaseBigIntFacts           TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
 * 	TypeFactsBigIntStrictFacts         TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsTruthy | TypeFactsFalsy
 * 	TypeFactsBigIntFacts               TypeFacts = TypeFactsBaseBigIntFacts | TypeFactsTruthy
 * 	TypeFactsZeroBigIntStrictFacts     TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsFalsy
 * 	TypeFactsZeroBigIntFacts           TypeFacts = TypeFactsBaseBigIntFacts
 * 	TypeFactsNonZeroBigIntStrictFacts  TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsTruthy
 * 	TypeFactsNonZeroBigIntFacts        TypeFacts = TypeFactsBaseBigIntFacts | TypeFactsTruthy
 * 	TypeFactsBaseBooleanStrictFacts    TypeFacts = TypeFactsTypeofEQBoolean | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull
 * 	TypeFactsBaseBooleanFacts          TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
 * 	TypeFactsBooleanStrictFacts        TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsTruthy | TypeFactsFalsy
 * 	TypeFactsBooleanFacts              TypeFacts = TypeFactsBaseBooleanFacts | TypeFactsTruthy
 * 	TypeFactsFalseStrictFacts          TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsFalsy
 * 	TypeFactsFalseFacts                TypeFacts = TypeFactsBaseBooleanFacts
 * 	TypeFactsTrueStrictFacts           TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsTruthy
 * 	TypeFactsTrueFacts                 TypeFacts = TypeFactsBaseBooleanFacts | TypeFactsTruthy
 * 	TypeFactsSymbolStrictFacts         TypeFacts = TypeFactsTypeofEQSymbol | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy
 * 	TypeFactsSymbolFacts               TypeFacts = TypeFactsSymbolStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
 * 	TypeFactsObjectStrictFacts         TypeFacts = TypeFactsTypeofEQObject | TypeFactsTypeofEQHostObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEFunction | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy
 * 	TypeFactsObjectFacts               TypeFacts = TypeFactsObjectStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
 * 	TypeFactsFunctionStrictFacts       TypeFacts = TypeFactsTypeofEQFunction | TypeFactsTypeofEQHostObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy
 * 	TypeFactsFunctionFacts             TypeFacts = TypeFactsFunctionStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
 * 	TypeFactsVoidFacts                 TypeFacts = TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQUndefined | TypeFactsEQUndefinedOrNull | TypeFactsNENull | TypeFactsFalsy
 * 	TypeFactsUndefinedFacts            TypeFacts = TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQUndefined | TypeFactsEQUndefinedOrNull | TypeFactsNENull | TypeFactsFalsy | TypeFactsIsUndefined
 * 	TypeFactsNullFacts                 TypeFacts = TypeFactsTypeofEQObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsNEUndefined | TypeFactsFalsy | TypeFactsIsNull
 * 	TypeFactsEmptyObjectStrictFacts    TypeFacts = TypeFactsAll & ^(TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsIsUndefinedOrNull)
 * 	TypeFactsEmptyObjectFacts          TypeFacts = TypeFactsAll & ^TypeFactsIsUndefinedOrNull
 * 	TypeFactsUnknownFacts              TypeFacts = TypeFactsAll & ^TypeFactsIsUndefinedOrNull
 * 	TypeFactsAllTypeofNE               TypeFacts = TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsNEUndefined
 * 	// Masks
 * 	TypeFactsOrFactsMask  TypeFacts = TypeFactsTypeofEQFunction | TypeFactsTypeofNEObject
 * 	TypeFactsAndFactsMask TypeFacts = TypeFactsAll & ^TypeFactsOrFactsMask
 * )
 */
export const TypeFactsNone: TypeFacts = 0;
export const TypeFactsTypeofEQString: TypeFacts = 1 << 0;
export const TypeFactsTypeofEQNumber: TypeFacts = 1 << 1;
export const TypeFactsTypeofEQBigInt: TypeFacts = 1 << 2;
export const TypeFactsTypeofEQBoolean: TypeFacts = 1 << 3;
export const TypeFactsTypeofEQSymbol: TypeFacts = 1 << 4;
export const TypeFactsTypeofEQObject: TypeFacts = 1 << 5;
export const TypeFactsTypeofEQFunction: TypeFacts = 1 << 6;
export const TypeFactsTypeofEQHostObject: TypeFacts = 1 << 7;
export const TypeFactsTypeofNEString: TypeFacts = 1 << 8;
export const TypeFactsTypeofNENumber: TypeFacts = 1 << 9;
export const TypeFactsTypeofNEBigInt: TypeFacts = 1 << 10;
export const TypeFactsTypeofNEBoolean: TypeFacts = 1 << 11;
export const TypeFactsTypeofNESymbol: TypeFacts = 1 << 12;
export const TypeFactsTypeofNEObject: TypeFacts = 1 << 13;
export const TypeFactsTypeofNEFunction: TypeFacts = 1 << 14;
export const TypeFactsTypeofNEHostObject: TypeFacts = 1 << 15;
export const TypeFactsEQUndefined: TypeFacts = 1 << 16;
export const TypeFactsEQNull: TypeFacts = 1 << 17;
export const TypeFactsEQUndefinedOrNull: TypeFacts = 1 << 18;
export const TypeFactsNEUndefined: TypeFacts = 1 << 19;
export const TypeFactsNENull: TypeFacts = 1 << 20;
export const TypeFactsNEUndefinedOrNull: TypeFacts = 1 << 21;
export const TypeFactsTruthy: TypeFacts = 1 << 22;
export const TypeFactsFalsy: TypeFacts = 1 << 23;
export const TypeFactsIsUndefined: TypeFacts = 1 << 24;
export const TypeFactsIsNull: TypeFacts = 1 << 25;
export const TypeFactsIsUndefinedOrNull: TypeFacts = TypeFactsIsUndefined | TypeFactsIsNull;
export const TypeFactsAll: TypeFacts = (1 << 27) - 1;
// The following members encode facts about particular kinds of types for use in the getTypeFacts function.
// The presence of a particular fact means that the given test is true for some (and possibly all) values
// of that kind of type.
export const TypeFactsBaseStringStrictFacts: TypeFacts =
  TypeFactsTypeofEQString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull;
export const TypeFactsBaseStringFacts: TypeFacts =
  TypeFactsBaseStringStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy;
export const TypeFactsStringStrictFacts: TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsTruthy | TypeFactsFalsy;
export const TypeFactsStringFacts: TypeFacts = TypeFactsBaseStringFacts | TypeFactsTruthy;
export const TypeFactsEmptyStringStrictFacts: TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsFalsy;
export const TypeFactsEmptyStringFacts: TypeFacts = TypeFactsBaseStringFacts;
export const TypeFactsNonEmptyStringStrictFacts: TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsTruthy;
export const TypeFactsNonEmptyStringFacts: TypeFacts = TypeFactsBaseStringFacts | TypeFactsTruthy;
export const TypeFactsBaseNumberStrictFacts: TypeFacts =
  TypeFactsTypeofEQNumber | TypeFactsTypeofNEString | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull;
export const TypeFactsBaseNumberFacts: TypeFacts =
  TypeFactsBaseNumberStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy;
export const TypeFactsNumberStrictFacts: TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsTruthy | TypeFactsFalsy;
export const TypeFactsNumberFacts: TypeFacts = TypeFactsBaseNumberFacts | TypeFactsTruthy;
export const TypeFactsZeroNumberStrictFacts: TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsFalsy;
export const TypeFactsZeroNumberFacts: TypeFacts = TypeFactsBaseNumberFacts;
export const TypeFactsNonZeroNumberStrictFacts: TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsTruthy;
export const TypeFactsNonZeroNumberFacts: TypeFacts = TypeFactsBaseNumberFacts | TypeFactsTruthy;
export const TypeFactsBaseBigIntStrictFacts: TypeFacts =
  TypeFactsTypeofEQBigInt | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull;
export const TypeFactsBaseBigIntFacts: TypeFacts =
  TypeFactsBaseBigIntStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy;
export const TypeFactsBigIntStrictFacts: TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsTruthy | TypeFactsFalsy;
export const TypeFactsBigIntFacts: TypeFacts = TypeFactsBaseBigIntFacts | TypeFactsTruthy;
export const TypeFactsZeroBigIntStrictFacts: TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsFalsy;
export const TypeFactsZeroBigIntFacts: TypeFacts = TypeFactsBaseBigIntFacts;
export const TypeFactsNonZeroBigIntStrictFacts: TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsTruthy;
export const TypeFactsNonZeroBigIntFacts: TypeFacts = TypeFactsBaseBigIntFacts | TypeFactsTruthy;
export const TypeFactsBaseBooleanStrictFacts: TypeFacts =
  TypeFactsTypeofEQBoolean | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull;
export const TypeFactsBaseBooleanFacts: TypeFacts =
  TypeFactsBaseBooleanStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy;
export const TypeFactsBooleanStrictFacts: TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsTruthy | TypeFactsFalsy;
export const TypeFactsBooleanFacts: TypeFacts = TypeFactsBaseBooleanFacts | TypeFactsTruthy;
export const TypeFactsFalseStrictFacts: TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsFalsy;
export const TypeFactsFalseFacts: TypeFacts = TypeFactsBaseBooleanFacts;
export const TypeFactsTrueStrictFacts: TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsTruthy;
export const TypeFactsTrueFacts: TypeFacts = TypeFactsBaseBooleanFacts | TypeFactsTruthy;
export const TypeFactsSymbolStrictFacts: TypeFacts =
  TypeFactsTypeofEQSymbol | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy;
export const TypeFactsSymbolFacts: TypeFacts =
  TypeFactsSymbolStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy;
export const TypeFactsObjectStrictFacts: TypeFacts =
  TypeFactsTypeofEQObject | TypeFactsTypeofEQHostObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEFunction | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy;
export const TypeFactsObjectFacts: TypeFacts =
  TypeFactsObjectStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy;
export const TypeFactsFunctionStrictFacts: TypeFacts =
  TypeFactsTypeofEQFunction | TypeFactsTypeofEQHostObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy;
export const TypeFactsFunctionFacts: TypeFacts =
  TypeFactsFunctionStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy;
export const TypeFactsVoidFacts: TypeFacts =
  TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQUndefined | TypeFactsEQUndefinedOrNull | TypeFactsNENull | TypeFactsFalsy;
export const TypeFactsUndefinedFacts: TypeFacts =
  TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQUndefined | TypeFactsEQUndefinedOrNull | TypeFactsNENull | TypeFactsFalsy | TypeFactsIsUndefined;
export const TypeFactsNullFacts: TypeFacts =
  TypeFactsTypeofEQObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsNEUndefined | TypeFactsFalsy | TypeFactsIsNull;
export const TypeFactsEmptyObjectStrictFacts: TypeFacts =
  TypeFactsAll & ~(TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsIsUndefinedOrNull);
export const TypeFactsEmptyObjectFacts: TypeFacts = TypeFactsAll & ~TypeFactsIsUndefinedOrNull;
export const TypeFactsUnknownFacts: TypeFacts = TypeFactsAll & ~TypeFactsIsUndefinedOrNull;
export const TypeFactsAllTypeofNE: TypeFacts =
  TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsNEUndefined;
// Masks
export const TypeFactsOrFactsMask: TypeFacts = TypeFactsTypeofEQFunction | TypeFactsTypeofNEObject;
export const TypeFactsAndFactsMask: TypeFacts = TypeFactsAll & ~TypeFactsOrFactsMask;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::IterationUse","kind":"type","status":"implemented","sigHash":"89a56be9b443f1808bc17acb217bc2f81bbf6118fe6363c933d86d907bd10d2d"}
 *
 * Go source:
 * IterationUse uint32
 */
export type IterationUse = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::IterationUseAllowsSyncIterablesFlag+IterationUseAllowsAsyncIterablesFlag+IterationUseAllowsStringInputFlag+IterationUseForOfFlag+IterationUseYieldStarFlag+IterationUseSpreadFlag+IterationUseDestructuringFlag+IterationUsePossiblyOutOfBounds+IterationUseElement+IterationUseSpread+IterationUseDestructuring+IterationUseForOf+IterationUseForAwaitOf+IterationUseYieldStar+IterationUseAsyncYieldStar+IterationUseGeneratorReturnType+IterationUseAsyncGeneratorReturnType+IterationUseCacheFlags","kind":"constGroup","status":"implemented","sigHash":"50b52e1e9ed431e0af548ede6eb81c2d02ca5ada0db2ade422e07079631e9c9d"}
 *
 * Go source:
 * const (
 * 	IterationUseAllowsSyncIterablesFlag  IterationUse = 1 << 0
 * 	IterationUseAllowsAsyncIterablesFlag IterationUse = 1 << 1
 * 	IterationUseAllowsStringInputFlag    IterationUse = 1 << 2
 * 	IterationUseForOfFlag                IterationUse = 1 << 3
 * 	IterationUseYieldStarFlag            IterationUse = 1 << 4
 * 	IterationUseSpreadFlag               IterationUse = 1 << 5
 * 	IterationUseDestructuringFlag        IterationUse = 1 << 6
 * 	IterationUsePossiblyOutOfBounds      IterationUse = 1 << 7
 * 	// Spread, Destructuring, Array element assignment
 * 	IterationUseElement                  = IterationUseAllowsSyncIterablesFlag
 * 	IterationUseSpread                   = IterationUseAllowsSyncIterablesFlag | IterationUseSpreadFlag
 * 	IterationUseDestructuring            = IterationUseAllowsSyncIterablesFlag | IterationUseDestructuringFlag
 * 	IterationUseForOf                    = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsStringInputFlag | IterationUseForOfFlag
 * 	IterationUseForAwaitOf               = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsAsyncIterablesFlag | IterationUseAllowsStringInputFlag | IterationUseForOfFlag
 * 	IterationUseYieldStar                = IterationUseAllowsSyncIterablesFlag | IterationUseYieldStarFlag
 * 	IterationUseAsyncYieldStar           = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsAsyncIterablesFlag | IterationUseYieldStarFlag
 * 	IterationUseGeneratorReturnType      = IterationUseAllowsSyncIterablesFlag
 * 	IterationUseAsyncGeneratorReturnType = IterationUseAllowsAsyncIterablesFlag
 * 	IterationUseCacheFlags               = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsAsyncIterablesFlag | IterationUseForOfFlag
 * )
 */
export const IterationUseAllowsSyncIterablesFlag: IterationUse = 1 << 0;
export const IterationUseAllowsAsyncIterablesFlag: IterationUse = 1 << 1;
export const IterationUseAllowsStringInputFlag: IterationUse = 1 << 2;
export const IterationUseForOfFlag: IterationUse = 1 << 3;
export const IterationUseYieldStarFlag: IterationUse = 1 << 4;
export const IterationUseSpreadFlag: IterationUse = 1 << 5;
export const IterationUseDestructuringFlag: IterationUse = 1 << 6;
export const IterationUsePossiblyOutOfBounds: IterationUse = 1 << 7;
// Spread, Destructuring, Array element assignment
export const IterationUseElement: IterationUse = IterationUseAllowsSyncIterablesFlag;
export const IterationUseSpread: IterationUse = IterationUseAllowsSyncIterablesFlag | IterationUseSpreadFlag;
export const IterationUseDestructuring: IterationUse = IterationUseAllowsSyncIterablesFlag | IterationUseDestructuringFlag;
export const IterationUseForOf: IterationUse = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsStringInputFlag | IterationUseForOfFlag;
export const IterationUseForAwaitOf: IterationUse = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsAsyncIterablesFlag | IterationUseAllowsStringInputFlag | IterationUseForOfFlag;
export const IterationUseYieldStar: IterationUse = IterationUseAllowsSyncIterablesFlag | IterationUseYieldStarFlag;
export const IterationUseAsyncYieldStar: IterationUse = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsAsyncIterablesFlag | IterationUseYieldStarFlag;
export const IterationUseGeneratorReturnType: IterationUse = IterationUseAllowsSyncIterablesFlag;
export const IterationUseAsyncGeneratorReturnType: IterationUse = IterationUseAllowsAsyncIterablesFlag;
export const IterationUseCacheFlags: IterationUse = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsAsyncIterablesFlag | IterationUseForOfFlag;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::IterationTypes","kind":"type","status":"implemented","sigHash":"0df72a9873639112f79d9a514da280ab2aa858fc94dc43700d3a1e8491fc02f8"}
 *
 * Go source:
 * IterationTypes struct {
 * 	yieldType  *Type
 * 	returnType *Type
 * 	nextType   *Type
 * }
 */
export interface IterationTypes {
  yieldType: GoPtr<Type>;
  returnType: GoPtr<Type>;
  nextType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::IterationTypeKind","kind":"type","status":"implemented","sigHash":"cac3b7f8691718499b9b874e6400e664819dcd5ad0a9a88fa8681b1af60890db"}
 *
 * Go source:
 * IterationTypeKind int32
 */
export type IterationTypeKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::IterationTypeKindYield+IterationTypeKindReturn+IterationTypeKindNext","kind":"constGroup","status":"implemented","sigHash":"9dec68e7ec0bdd654476cb973e85ffdd5b3097eab5f4dafc9f4e8d1295afcf63"}
 *
 * Go source:
 * const (
 * 	IterationTypeKindYield IterationTypeKind = iota
 * 	IterationTypeKindReturn
 * 	IterationTypeKindNext
 * )
 */
export const IterationTypeKindYield: IterationTypeKind = 0;
export const IterationTypeKindReturn: IterationTypeKind = 1;
export const IterationTypeKindNext: IterationTypeKind = 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::IterationTypesResolver","kind":"type","status":"implemented","sigHash":"e9970cc13238d28ec33f2c300e1367bae7a69e5791ff6eadcb124d897e2b5af6"}
 *
 * Go source:
 * IterationTypesResolver struct {
 * 	iteratorSymbolName                   string
 * 	getGlobalIteratorType                func() *Type
 * 	getGlobalIterableType                func() *Type
 * 	getGlobalIterableTypeChecked         func() *Type
 * 	getGlobalIterableIteratorType        func() *Type
 * 	getGlobalIterableIteratorTypeChecked func() *Type
 * 	getGlobalIteratorObjectType          func() *Type
 * 	getGlobalGeneratorType               func() *Type
 * 	getGlobalBuiltinIteratorTypes        func() []*Type
 * 	resolveIterationType                 func(t *Type, errorNode *ast.Node) *Type
 * 	mustHaveANextMethodDiagnostic        *diagnostics.Message
 * 	mustBeAMethodDiagnostic              *diagnostics.Message
 * 	mustHaveAValueDiagnostic             *diagnostics.Message
 * }
 */
export interface IterationTypesResolver {
  iteratorSymbolName: string;
  getGlobalIteratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalIterableType: GoFunc<() => GoPtr<Type>>;
  getGlobalIterableTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalIterableIteratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalIterableIteratorTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalIteratorObjectType: GoFunc<() => GoPtr<Type>>;
  getGlobalGeneratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalBuiltinIteratorTypes: GoFunc<() => GoSlice<GoPtr<Type>>>;
  resolveIterationType: GoFunc<(t: GoPtr<Type>, errorNode: GoPtr<Node>) => GoPtr<Type>>;
  mustHaveANextMethodDiagnostic: GoPtr<Message>;
  mustBeAMethodDiagnostic: GoPtr<Message>;
  mustHaveAValueDiagnostic: GoPtr<Message>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::WideningContext","kind":"type","status":"implemented","sigHash":"f99ee40db41e09ed2c8823a81b9d65121842433751990174ad95d60a83a61fb6"}
 *
 * Go source:
 * WideningContext struct {
 * 	parent             *WideningContext // Parent context
 * 	propertyName       string           // Name of property in parent
 * 	siblings           []*Type          // Types of siblings
 * 	resolvedProperties []*ast.Symbol    // Properties occurring in sibling object literals
 * 	childContexts      map[string]*WideningContext
 * 	widenedTypes       map[*Type]*Type
 * }
 */
export interface WideningContext {
  parent: GoPtr<WideningContext>;
  propertyName: string;
  siblings: GoSlice<GoPtr<Type>>;
  resolvedProperties: GoSlice<GoPtr<Symbol>>;
  childContexts: GoMap<string, GoPtr<WideningContext>>;
  widenedTypes: GoMap<GoPtr<Type>, GoPtr<Type>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::Program","kind":"type","status":"implemented","sigHash":"8f81292fec899b4036193e2a5117cfdad72d003a2ed11118db047735cf9e7800"}
 *
 * Go source:
 * Program interface {
 * 	Host
 * 	Options() *core.CompilerOptions
 * 	SourceFiles() []*ast.SourceFile
 * 	BindSourceFiles()
 * 	FileExists(fileName string) bool
 * 	GetSourceFile(fileName string) *ast.SourceFile
 * 	GetSourceFileForResolvedModule(fileName string) *ast.SourceFile
 * 	GetEmitModuleFormatOfFile(sourceFile ast.HasFileName) core.ModuleKind
 * 	GetEmitSyntaxForUsageLocation(sourceFile ast.HasFileName, usageLocation *ast.StringLiteralLike) core.ResolutionMode
 * 	GetImpliedNodeFormatForEmit(sourceFile ast.HasFileName) core.ModuleKind
 * 	GetResolvedModule(currentSourceFile ast.HasFileName, moduleReference string, mode core.ResolutionMode) *module.ResolvedModule
 * 	GetResolvedModules() map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule]
 * 	GetPackagesMap() map[string]bool
 * 	GetSourceFileMetaData(path tspath.Path) ast.SourceFileMetaData
 * 	GetJSXRuntimeImportSpecifier(path tspath.Path) (moduleReference string, specifier *ast.Node)
 * 	GetImportHelpersImportSpecifier(path tspath.Path) *ast.Node
 * 	SourceFileMayBeEmitted(sourceFile *ast.SourceFile, forceDtsEmit bool) bool
 * 	IsSourceFileDefaultLibrary(path tspath.Path) bool
 * 	GetProjectReferenceFromOutputDts(path tspath.Path) *tsoptions.SourceOutputAndProjectReference
 * 	GetRedirectForResolution(file ast.HasFileName) *tsoptions.ParsedCommandLine
 * 	CommonSourceDirectory() string
 * }
 */
export interface Program extends Host {
  Options(): GoPtr<CompilerOptions>;
  SourceFiles(): GoSlice<GoPtr<SourceFile>>;
  BindSourceFiles(): void;
  FileExists(fileName: string): bool;
  GetSourceFile(fileName: string): GoPtr<SourceFile>;
  GetSourceFileForResolvedModule(fileName: string): GoPtr<SourceFile>;
  GetEmitModuleFormatOfFile(sourceFile: GoInterface<HasFileName>): ModuleKind;
  GetEmitSyntaxForUsageLocation(sourceFile: GoInterface<HasFileName>, usageLocation: GoPtr<StringLiteralLike>): ResolutionMode;
  GetImpliedNodeFormatForEmit(sourceFile: GoInterface<HasFileName>): ModuleKind;
  GetResolvedModule(currentSourceFile: GoInterface<HasFileName>, moduleReference: string, mode: ResolutionMode): GoPtr<ResolvedModule>;
  GetResolvedModules(): GoMap<Path, ModeAwareCache<GoPtr<ResolvedModule>>>;
  GetPackagesMap(): GoMap<string, bool>;
  GetSourceFileMetaData(path: Path): SourceFileMetaData;
  GetJSXRuntimeImportSpecifier(path: Path): [moduleReference: string, specifier: GoPtr<Node>];
  GetImportHelpersImportSpecifier(path: Path): GoPtr<Node>;
  SourceFileMayBeEmitted(sourceFile: GoPtr<SourceFile>, forceDtsEmit: bool): bool;
  IsSourceFileDefaultLibrary(path: Path): bool;
  GetProjectReferenceFromOutputDts(path: Path): GoPtr<SourceOutputAndProjectReference>;
  GetRedirectForResolution(file: GoInterface<HasFileName>): GoPtr<ParsedCommandLine>;
  CommonSourceDirectory(): string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::Host","kind":"type","status":"implemented","sigHash":"c3b838d6ad576da7413105ccdad7fe9649bd98907c40e5678084349cd7acd596"}
 *
 * Go source:
 * Host interface {
 * 	modulespecifiers.ModuleSpecifierGenerationHost
 * }
 */
export interface Host extends ModuleSpecifierGenerationHost {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::varGroup::nextCheckerID","kind":"varGroup","status":"implemented","sigHash":"691c9b3b86cfec456bb8ca016c01f0d098694586e0f4d0db67dc01e307680fb9"}
 *
 * Go source:
 * var nextCheckerID atomic.Uint32
 */
export let nextCheckerID: Uint32 = new Uint32();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::Checker","kind":"type","status":"implemented","sigHash":"10e4f8e561c5b9e494fe04f5c37462a269458f852809c67c7fa077971d42c3a4"}
 *
 * Go source:
 * Checker struct {
 * 	id                                          uint32
 * 	program                                     Program
 * 	compilerOptions                             *core.CompilerOptions
 * 	files                                       []*ast.SourceFile
 * 	fileIndexMap                                map[*ast.SourceFile]int
 * 	compareSymbols                              func(*ast.Symbol, *ast.Symbol) int
 * 	compareSymbolChains                         func([]*ast.Symbol, []*ast.Symbol) int
 * 	TypeCount                                   uint32
 * 	SymbolCount                                 uint32
 * 	TotalInstantiationCount                     uint32
 * 	instantiationCount                          uint32
 * 	instantiationDepth                          uint32
 * 	inlineLevel                                 int
 * 	serializationLevel                          int
 * 	currentNode                                 *ast.Node
 * 	varianceTypeParameter                       *Type
 * 	languageVersion                             core.ScriptTarget
 * 	moduleKind                                  core.ModuleKind
 * 	moduleResolutionKind                        core.ModuleResolutionKind
 * 	isInferencePartiallyBlocked                 bool
 * 	legacyDecorators                            bool
 * 	emitStandardClassFields                     bool
 * 	strictNullChecks                            bool
 * 	strictFunctionTypes                         bool
 * 	strictBindCallApply                         bool
 * 	strictPropertyInitialization                bool
 * 	strictBuiltinIteratorReturn                 bool
 * 	noImplicitAny                               bool
 * 	noImplicitThis                              bool
 * 	useUnknownInCatchVariables                  bool
 * 	exactOptionalPropertyTypes                  bool
 * 	canCollectSymbolAliasAccessibilityData      bool
 * 	wasCanceled                                 bool
 * 	saveDeferredDiagnostics                     bool
 * 	arrayVariances                              []VarianceFlags
 * 	globals                                     ast.SymbolTable
 * 	evaluate                                    evaluator.Evaluator
 * 	stringLiteralTypes                          map[string]*Type
 * 	numberLiteralTypes                          map[jsnum.Number]*Type
 * 	nanType                                     *Type
 * 	bigintLiteralTypes                          map[jsnum.PseudoBigInt]*Type
 * 	enumLiteralTypes                            map[EnumLiteralKey]*Type
 * 	enumNaNLiteralTypes                         map[*ast.Symbol]*Type
 * 	indexedAccessTypes                          map[CacheHashKey]*Type
 * 	templateLiteralTypes                        map[CacheHashKey]*Type
 * 	stringMappingTypes                          map[StringMappingKey]*Type
 * 	uniqueESSymbolTypes                         map[*ast.Symbol]*Type
 * 	thisExpandoKinds                            map[*ast.Symbol]thisAssignmentDeclarationKind
 * 	thisExpandoLocations                        map[*ast.Symbol]*ast.Node
 * 	subtypeReductionCache                       map[CacheHashKey][]*Type
 * 	cachedTypes                                 map[CachedTypeKey]*Type
 * 	cachedSignatures                            map[CachedSignatureKey]*Signature
 * 	undefinedProperties                         map[string]*ast.Symbol
 * 	narrowedTypes                               map[NarrowedTypeKey]*Type
 * 	assignmentReducedTypes                      map[AssignmentReducedKey]*Type
 * 	discriminatedContextualTypes                map[DiscriminatedContextualTypeKey]*Type
 * 	instantiationExpressionTypes                map[InstantiationExpressionKey]*Type
 * 	substitutionTypes                           map[SubstitutionTypeKey]*Type
 * 	reverseMappedCache                          map[ReverseMappedTypeKey]*Type
 * 	reverseHomomorphicMappedCache               map[ReverseMappedTypeKey]*Type
 * 	iterationTypesCache                         map[IterationTypesKey]IterationTypes
 * 	markerTypes                                 collections.Set[*Type]
 * 	undefinedSymbol                             *ast.Symbol
 * 	argumentsSymbol                             *ast.Symbol
 * 	requireSymbol                               *ast.Symbol
 * 	unknownSymbol                               *ast.Symbol
 * 	unresolvedSymbols                           map[string]*ast.Symbol
 * 	errorTypes                                  map[CacheHashKey]*Type
 * 	moduleSymbols                               map[*ast.Node]*ast.Symbol
 * 	globalThisSymbol                            *ast.Symbol
 * 	symbolTableAliasCache                       map[symbolTableID][]*ast.Symbol
 * 	resolveName                                 func(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *ast.Symbol
 * 	resolveNameForSymbolSuggestion              func(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *ast.Symbol
 * 	tupleTypes                                  map[CacheHashKey]*Type
 * 	unionTypes                                  map[CacheHashKey]*Type
 * 	unionOfUnionTypes                           map[UnionOfUnionKey]*Type
 * 	intersectionTypes                           map[CacheHashKey]*Type
 * 	propertiesTypes                             map[PropertiesTypesKey]*Type
 * 	diagnostics                                 ast.DiagnosticsCollection
 * 	suggestionDiagnostics                       ast.DiagnosticsCollection
 * 	symbolArena                                 core.Arena[ast.Symbol]
 * 	signatureArena                              core.Arena[Signature]
 * 	indexInfoArena                              core.Arena[IndexInfo]
 * 	mergedSymbols                               map[*ast.Symbol]*ast.Symbol
 * 	factory                                     ast.NodeFactory
 * 	nodeLinks                                   core.LinkStore[*ast.Node, NodeLinks]
 * 	signatureLinks                              core.LinkStore[*ast.Node, SignatureLinks]
 * 	symbolNodeLinks                             core.LinkStore[*ast.Node, SymbolNodeLinks]
 * 	typeNodeLinks                               core.LinkStore[*ast.Node, TypeNodeLinks]
 * 	enumMemberLinks                             core.LinkStore[*ast.Node, EnumMemberLinks]
 * 	assertionLinks                              core.LinkStore[*ast.Node, AssertionLinks]
 * 	arrayLiteralLinks                           core.LinkStore[*ast.Node, ArrayLiteralLinks]
 * 	switchStatementLinks                        core.LinkStore[*ast.Node, SwitchStatementLinks]
 * 	jsxElementLinks                             core.LinkStore[*ast.Node, JsxElementLinks]
 * 	symbolReferenceLinks                        core.LinkStore[*ast.Symbol, SymbolReferenceLinks]
 * 	valueSymbolLinks                            core.LinkStore[*ast.Symbol, ValueSymbolLinks]
 * 	mappedSymbolLinks                           core.LinkStore[*ast.Symbol, MappedSymbolLinks]
 * 	deferredSymbolLinks                         core.LinkStore[*ast.Symbol, DeferredSymbolLinks]
 * 	aliasSymbolLinks                            core.LinkStore[*ast.Symbol, AliasSymbolLinks]
 * 	moduleSymbolLinks                           core.LinkStore[*ast.Symbol, ModuleSymbolLinks]
 * 	lateBoundLinks                              core.LinkStore[*ast.Symbol, LateBoundLinks]
 * 	exportTypeLinks                             core.LinkStore[*ast.Symbol, ExportTypeLinks]
 * 	membersAndExportsLinks                      core.LinkStore[*ast.Symbol, MembersAndExportsLinks]
 * 	typeAliasLinks                              core.LinkStore[*ast.Symbol, TypeAliasLinks]
 * 	declaredTypeLinks                           core.LinkStore[*ast.Symbol, DeclaredTypeLinks]
 * 	spreadLinks                                 core.LinkStore[*ast.Symbol, SpreadLinks]
 * 	varianceLinks                               core.LinkStore[*ast.Symbol, VarianceLinks]
 * 	ReverseMappedSymbolLinks                    core.LinkStore[*ast.Symbol, ReverseMappedSymbolLinks]
 * 	markedAssignmentSymbolLinks                 core.LinkStore[*ast.Symbol, MarkedAssignmentSymbolLinks]
 * 	symbolContainerLinks                        core.LinkStore[*ast.Symbol, ContainingSymbolLinks]
 * 	sourceFileLinks                             core.LinkStore[*ast.SourceFile, SourceFileLinks]
 * 	regExpScanner                               *scanner.Scanner
 * 	patternForType                              map[*Type]*ast.Node
 * 	contextFreeTypes                            map[*ast.Node]*Type
 * 	anyType                                     *Type
 * 	autoType                                    *Type
 * 	wildcardType                                *Type
 * 	blockedStringType                           *Type
 * 	errorType                                   *Type
 * 	unresolvedType                              *Type
 * 	nonInferrableAnyType                        *Type
 * 	intrinsicMarkerType                         *Type
 * 	unknownType                                 *Type
 * 	undefinedType                               *Type
 * 	undefinedWideningType                       *Type
 * 	missingType                                 *Type
 * 	undefinedOrMissingType                      *Type
 * 	optionalType                                *Type
 * 	nullType                                    *Type
 * 	nullWideningType                            *Type
 * 	stringType                                  *Type
 * 	numberType                                  *Type
 * 	bigintType                                  *Type
 * 	regularFalseType                            *Type
 * 	falseType                                   *Type
 * 	regularTrueType                             *Type
 * 	trueType                                    *Type
 * 	booleanType                                 *Type
 * 	esSymbolType                                *Type
 * 	voidType                                    *Type
 * 	neverType                                   *Type
 * 	silentNeverType                             *Type
 * 	implicitNeverType                           *Type
 * 	unreachableNeverType                        *Type
 * 	nonPrimitiveType                            *Type
 * 	stringOrNumberType                          *Type
 * 	stringNumberSymbolType                      *Type
 * 	numberOrBigIntType                          *Type
 * 	templateConstraintType                      *Type
 * 	numericStringType                           *Type
 * 	uniqueLiteralType                           *Type
 * 	uniqueLiteralMapper                         *TypeMapper
 * 	reliabilityFlags                            RelationComparisonResult
 * 	reportUnreliableMapper                      *TypeMapper
 * 	reportUnmeasurableMapper                    *TypeMapper
 * 	restrictiveMapper                           *TypeMapper
 * 	permissiveMapper                            *TypeMapper
 * 	emptyObjectType                             *Type
 * 	emptyJsxObjectType                          *Type
 * 	emptyFreshJsxObjectType                     *Type
 * 	emptyTypeLiteralType                        *Type
 * 	unknownEmptyObjectType                      *Type
 * 	unknownUnionType                            *Type
 * 	emptyGenericType                            *Type
 * 	anyFunctionType                             *Type
 * 	noConstraintType                            *Type
 * 	circularConstraintType                      *Type
 * 	resolvingDefaultType                        *Type
 * 	markerSuperType                             *Type
 * 	markerSubType                               *Type
 * 	markerOtherType                             *Type
 * 	markerSuperTypeForCheck                     *Type
 * 	markerSubTypeForCheck                       *Type
 * 	noTypePredicate                             *TypePredicate
 * 	anySignature                                *Signature
 * 	unknownSignature                            *Signature
 * 	resolvingSignature                          *Signature
 * 	silentNeverSignature                        *Signature
 * 	cachedArgumentsReferenced                   map[*ast.Node]bool
 * 	enumNumberIndexInfo                         *IndexInfo
 * 	anyBaseTypeIndexInfo                        *IndexInfo
 * 	patternAmbientModules                       []*ast.PatternAmbientModule
 * 	patternAmbientModuleAugmentations           ast.SymbolTable
 * 	globalObjectType                            *Type
 * 	globalFunctionType                          *Type
 * 	globalCallableFunctionType                  *Type
 * 	globalNewableFunctionType                   *Type
 * 	globalArrayType                             *Type
 * 	globalReadonlyArrayType                     *Type
 * 	globalStringType                            *Type
 * 	globalNumberType                            *Type
 * 	globalBooleanType                           *Type
 * 	globalRegExpType                            *Type
 * 	globalThisType                              *Type
 * 	anyArrayType                                *Type
 * 	autoArrayType                               *Type
 * 	anyReadonlyArrayType                        *Type
 * 	deferredGlobalImportMetaExpressionType      *Type
 * 	contextualBindingPatterns                   []*ast.Node
 * 	emptyStringType                             *Type
 * 	zeroType                                    *Type
 * 	zeroBigIntType                              *Type
 * 	typeofType                                  *Type
 * 	typeResolutions                             []TypeResolution
 * 	resolutionStart                             int
 * 	inVarianceComputation                       bool
 * 	apparentArgumentCount                       *int
 * 	lastGetCombinedNodeFlagsNode                *ast.Node
 * 	lastGetCombinedNodeFlagsResult              ast.NodeFlags
 * 	lastGetCombinedModifierFlagsNode            *ast.Node
 * 	lastGetCombinedModifierFlagsResult          ast.ModifierFlags
 * 	freeinferenceState                          *InferenceState
 * 	freeFlowState                               *FlowState
 * 	flowLoopCache                               map[FlowLoopKey]*Type
 * 	flowLoopStack                               []FlowLoopInfo
 * 	sharedFlows                                 []SharedFlow
 * 	antecedentTypes                             []*Type
 * 	flowAnalysisDisabled                        bool
 * 	flowInvocationCount                         int
 * 	flowTypeCache                               map[*ast.Node]*Type
 * 	lastFlowNode                                *ast.FlowNode
 * 	lastFlowNodeReachable                       bool
 * 	flowNodeReachable                           map[*ast.FlowNode]bool
 * 	flowNodePostSuper                           map[*ast.FlowNode]bool
 * 	renamedBindingElementsInTypes               []*ast.Node
 * 	contextualInfos                             []ContextualInfo
 * 	inferenceContextInfos                       []InferenceContextInfo
 * 	awaitedTypeStack                            []*Type
 * 	reverseMappedSourceStack                    []*Type
 * 	reverseMappedTargetStack                    []*Type
 * 	reverseExpandingFlags                       ExpandingFlags
 * 	freeRelater                                 *Relater
 * 	subtypeRelation                             *Relation
 * 	strictSubtypeRelation                       *Relation
 * 	assignableRelation                          *Relation
 * 	comparableRelation                          *Relation
 * 	identityRelation                            *Relation
 * 	enumRelation                                map[EnumRelationKey]RelationComparisonResult
 * 	getGlobalESSymbolType                       func() *Type
 * 	getGlobalBigIntType                         func() *Type
 * 	getGlobalImportMetaType                     func() *Type
 * 	getGlobalImportAttributesType               func() *Type
 * 	getGlobalImportAttributesTypeChecked        func() *Type
 * 	getGlobalNonNullableTypeAliasOrNil          func() *ast.Symbol
 * 	getGlobalExtractSymbol                      func() *ast.Symbol
 * 	getGlobalDisposableType                     func() *Type
 * 	getGlobalAsyncDisposableType                func() *Type
 * 	getGlobalAwaitedSymbol                      func() *ast.Symbol
 * 	getGlobalAwaitedSymbolOrNil                 func() *ast.Symbol
 * 	getGlobalNaNSymbolOrNil                     func() *ast.Symbol
 * 	getGlobalRecordSymbol                       func() *ast.Symbol
 * 	getGlobalTemplateStringsArrayType           func() *Type
 * 	getGlobalESSymbolConstructorSymbolOrNil     func() *ast.Symbol
 * 	getGlobalESSymbolConstructorTypeSymbolOrNil func() *ast.Symbol
 * 	getGlobalImportCallOptionsType              func() *Type
 * 	getGlobalImportCallOptionsTypeChecked       func() *Type
 * 	getGlobalPromiseType                        func() *Type
 * 	getGlobalPromiseTypeChecked                 func() *Type
 * 	getGlobalPromiseLikeType                    func() *Type
 * 	getGlobalPromiseConstructorSymbol           func() *ast.Symbol
 * 	getGlobalPromiseConstructorSymbolOrNil      func() *ast.Symbol
 * 	getGlobalOmitSymbol                         func() *ast.Symbol
 * 	getGlobalNoInferSymbolOrNil                 func() *ast.Symbol
 * 	getGlobalIteratorType                       func() *Type
 * 	getGlobalIterableType                       func() *Type
 * 	getGlobalIterableTypeChecked                func() *Type
 * 	getGlobalIterableIteratorType               func() *Type
 * 	getGlobalIterableIteratorTypeChecked        func() *Type
 * 	getGlobalIteratorObjectType                 func() *Type
 * 	getGlobalGeneratorType                      func() *Type
 * 	getGlobalAsyncIteratorType                  func() *Type
 * 	getGlobalAsyncIterableType                  func() *Type
 * 	getGlobalAsyncIterableTypeChecked           func() *Type
 * 	getGlobalAsyncIterableIteratorType          func() *Type
 * 	getGlobalAsyncIterableIteratorTypeChecked   func() *Type
 * 	getGlobalAsyncIteratorObjectType            func() *Type
 * 	getGlobalAsyncGeneratorType                 func() *Type
 * 	getGlobalIteratorYieldResultType            func() *Type
 * 	getGlobalIteratorReturnResultType           func() *Type
 * 	getGlobalTypedPropertyDescriptorType        func() *Type
 * 	getGlobalClassDecoratorContextType          func() *Type
 * 	getGlobalClassMethodDecoratorContextType    func() *Type
 * 	getGlobalClassGetterDecoratorContextType    func() *Type
 * 	getGlobalClassSetterDecoratorContextType    func() *Type
 * 	getGlobalClassAccessorDecoratorContxtType   func() *Type
 * 	getGlobalClassAccessorDecoratorContextType  func() *Type
 * 	getGlobalClassAccessorDecoratorTargetType   func() *Type
 * 	getGlobalClassAccessorDecoratorResultType   func() *Type
 * 	getGlobalClassFieldDecoratorContextType     func() *Type
 * 	syncIterationTypesResolver                  *IterationTypesResolver
 * 	asyncIterationTypesResolver                 *IterationTypesResolver
 * 	isPrimitiveOrObjectOrEmptyType              func(*Type) bool
 * 	containsMissingType                         func(*Type) bool
 * 	couldContainTypeVariables                   func(*Type) bool
 * 	isStringIndexSignatureOnlyType              func(*Type) bool
 * 	markNodeAssignments                         func(*ast.Node) bool
 * 	compareTypesAssignable                      TypeComparer
 * 	emitResolver                                *EmitResolver
 * 	emitResolverOnce                            sync.Once
 * 	_jsxNamespace                               string
 * 	_jsxFactoryEntity                           *ast.Node
 * 	skipDirectInferenceNodes                    collections.Set[*ast.Node]
 * 	ctx                                         context.Context
 * 	packagesMap                                 map[string]bool
 * 	activeMappers                               []*TypeMapper
 * 	activeTypeMappersCaches                     []map[CacheHashKey]*Type
 * 	ambientModulesOnce                          sync.Once
 * 	ambientModules                              []*ast.Symbol
 * 	withinUnreachableCode                       bool
 * 	reportedUnreachableNodes                    collections.Set[*ast.Node]
 * 	nonExistentProperties                       collections.Set[NonExistentPropertyKey]
 * 	deferredDiagnosticCallbacks                 []func()
 * 	typeToStringNodebuilder                     *NodeBuilder
 *
 * 	mu     sync.Mutex
 * 	tracer *Tracer // Optional tracer for trace events and type recording (for --generateTrace)
 * }
 */
export interface Checker {
  id: uint;
  program: GoInterface<Program>;
  compilerOptions: GoPtr<CompilerOptions>;
  files: GoSlice<GoPtr<SourceFile>>;
  fileIndexMap: GoMap<GoPtr<SourceFile>, int>;
  compareSymbols: GoFunc<(arg0: GoPtr<Symbol>, arg1: GoPtr<Symbol>) => int>;
  compareSymbolChains: GoFunc<(arg0: GoSlice<GoPtr<Symbol>>, arg1: GoSlice<GoPtr<Symbol>>) => int>;
  TypeCount: uint;
  SymbolCount: uint;
  TotalInstantiationCount: uint;
  instantiationCount: uint;
  instantiationDepth: uint;
  inlineLevel: int;
  serializationLevel: int;
  currentNode: GoPtr<Node>;
  varianceTypeParameter: GoPtr<Type>;
  languageVersion: ScriptTarget;
  moduleKind: ModuleKind;
  moduleResolutionKind: ModuleResolutionKind;
  isInferencePartiallyBlocked: bool;
  legacyDecorators: bool;
  emitStandardClassFields: bool;
  strictNullChecks: bool;
  strictFunctionTypes: bool;
  strictBindCallApply: bool;
  strictPropertyInitialization: bool;
  strictBuiltinIteratorReturn: bool;
  noImplicitAny: bool;
  noImplicitThis: bool;
  useUnknownInCatchVariables: bool;
  exactOptionalPropertyTypes: bool;
  canCollectSymbolAliasAccessibilityData: bool;
  wasCanceled: bool;
  saveDeferredDiagnostics: bool;
  arrayVariances: GoSlice<VarianceFlags>;
  globals: SymbolTable;
  evaluate: Evaluator;
  stringLiteralTypes: GoMap<string, GoPtr<Type>>;
  numberLiteralTypes: GoMap<Number, GoPtr<Type>>;
  nanType: GoPtr<Type>;
  bigintLiteralTypes: GoMap<PseudoBigInt, GoPtr<Type>>;
  enumLiteralTypes: GoMap<EnumLiteralKey, GoPtr<Type>>;
  enumNaNLiteralTypes: GoMap<GoPtr<Symbol>, GoPtr<Type>>;
  indexedAccessTypes: GoMap<CacheHashKey, GoPtr<Type>>;
  templateLiteralTypes: GoMap<CacheHashKey, GoPtr<Type>>;
  stringMappingTypes: GoMap<StringMappingKey, GoPtr<Type>>;
  uniqueESSymbolTypes: GoMap<GoPtr<Symbol>, GoPtr<Type>>;
  thisExpandoKinds: GoMap<GoPtr<Symbol>, thisAssignmentDeclarationKind>;
  thisExpandoLocations: GoMap<GoPtr<Symbol>, GoPtr<Node>>;
  subtypeReductionCache: GoMap<CacheHashKey, GoSlice<GoPtr<Type>>>;
  cachedTypes: GoMap<CachedTypeKey, GoPtr<Type>>;
  cachedSignatures: GoMap<CachedSignatureKey, GoPtr<Signature>>;
  undefinedProperties: GoMap<string, GoPtr<Symbol>>;
  narrowedTypes: GoMap<NarrowedTypeKey, GoPtr<Type>>;
  assignmentReducedTypes: GoMap<AssignmentReducedKey, GoPtr<Type>>;
  discriminatedContextualTypes: GoMap<DiscriminatedContextualTypeKey, GoPtr<Type>>;
  instantiationExpressionTypes: GoMap<InstantiationExpressionKey, GoPtr<Type>>;
  substitutionTypes: GoMap<SubstitutionTypeKey, GoPtr<Type>>;
  reverseMappedCache: GoMap<ReverseMappedTypeKey, GoPtr<Type>>;
  reverseHomomorphicMappedCache: GoMap<ReverseMappedTypeKey, GoPtr<Type>>;
  iterationTypesCache: GoMap<IterationTypesKey, IterationTypes>;
  markerTypes: Set<GoPtr<Type>>;
  undefinedSymbol: GoPtr<Symbol>;
  argumentsSymbol: GoPtr<Symbol>;
  requireSymbol: GoPtr<Symbol>;
  unknownSymbol: GoPtr<Symbol>;
  unresolvedSymbols: GoMap<string, GoPtr<Symbol>>;
  errorTypes: GoMap<CacheHashKey, GoPtr<Type>>;
  moduleSymbols: GoMap<GoPtr<Node>, GoPtr<Symbol>>;
  globalThisSymbol: GoPtr<Symbol>;
  symbolTableAliasCache: GoMap<symbolTableID, GoSlice<GoPtr<Symbol>>>;
  resolveName: GoFunc<(location: GoPtr<Node>, name: string, meaning: SymbolFlags, nameNotFoundMessage: GoPtr<Message>, isUse: bool, excludeGlobals: bool) => GoPtr<Symbol>>;
  resolveNameForSymbolSuggestion: GoFunc<(location: GoPtr<Node>, name: string, meaning: SymbolFlags, nameNotFoundMessage: GoPtr<Message>, isUse: bool, excludeGlobals: bool) => GoPtr<Symbol>>;
  tupleTypes: GoMap<CacheHashKey, GoPtr<Type>>;
  unionTypes: GoMap<CacheHashKey, GoPtr<Type>>;
  unionOfUnionTypes: GoMap<UnionOfUnionKey, GoPtr<Type>>;
  intersectionTypes: GoMap<CacheHashKey, GoPtr<Type>>;
  propertiesTypes: GoMap<PropertiesTypesKey, GoPtr<Type>>;
  diagnostics: DiagnosticsCollection;
  suggestionDiagnostics: DiagnosticsCollection;
  symbolArena: Arena<Symbol>;
  signatureArena: Arena<Signature>;
  indexInfoArena: Arena<IndexInfo>;
  mergedSymbols: GoMap<GoPtr<Symbol>, GoPtr<Symbol>>;
  factory: NodeFactory;
  nodeLinks: LinkStore<GoPtr<Node>, NodeLinks>;
  signatureLinks: LinkStore<GoPtr<Node>, SignatureLinks>;
  symbolNodeLinks: LinkStore<GoPtr<Node>, SymbolNodeLinks>;
  typeNodeLinks: LinkStore<GoPtr<Node>, TypeNodeLinks>;
  enumMemberLinks: LinkStore<GoPtr<Node>, EnumMemberLinks>;
  assertionLinks: LinkStore<GoPtr<Node>, AssertionLinks>;
  arrayLiteralLinks: LinkStore<GoPtr<Node>, ArrayLiteralLinks>;
  switchStatementLinks: LinkStore<GoPtr<Node>, SwitchStatementLinks>;
  jsxElementLinks: LinkStore<GoPtr<Node>, JsxElementLinks>;
  symbolReferenceLinks: LinkStore<GoPtr<Symbol>, SymbolReferenceLinks>;
  valueSymbolLinks: LinkStore<GoPtr<Symbol>, ValueSymbolLinks>;
  mappedSymbolLinks: LinkStore<GoPtr<Symbol>, MappedSymbolLinks>;
  deferredSymbolLinks: LinkStore<GoPtr<Symbol>, DeferredSymbolLinks>;
  aliasSymbolLinks: LinkStore<GoPtr<Symbol>, AliasSymbolLinks>;
  moduleSymbolLinks: LinkStore<GoPtr<Symbol>, ModuleSymbolLinks>;
  lateBoundLinks: LinkStore<GoPtr<Symbol>, LateBoundLinks>;
  exportTypeLinks: LinkStore<GoPtr<Symbol>, ExportTypeLinks>;
  membersAndExportsLinks: LinkStore<GoPtr<Symbol>, MembersAndExportsLinks>;
  typeAliasLinks: LinkStore<GoPtr<Symbol>, TypeAliasLinks>;
  declaredTypeLinks: LinkStore<GoPtr<Symbol>, DeclaredTypeLinks>;
  spreadLinks: LinkStore<GoPtr<Symbol>, SpreadLinks>;
  varianceLinks: LinkStore<GoPtr<Symbol>, VarianceLinks>;
  ReverseMappedSymbolLinks: LinkStore<GoPtr<Symbol>, ReverseMappedSymbolLinks>;
  markedAssignmentSymbolLinks: LinkStore<GoPtr<Symbol>, MarkedAssignmentSymbolLinks>;
  symbolContainerLinks: LinkStore<GoPtr<Symbol>, ContainingSymbolLinks>;
  sourceFileLinks: LinkStore<GoPtr<SourceFile>, SourceFileLinks>;
  regExpScanner: GoPtr<Scanner>;
  patternForType: GoMap<GoPtr<Type>, GoPtr<Node>>;
  contextFreeTypes: GoMap<GoPtr<Node>, GoPtr<Type>>;
  anyType: GoPtr<Type>;
  autoType: GoPtr<Type>;
  wildcardType: GoPtr<Type>;
  blockedStringType: GoPtr<Type>;
  errorType: GoPtr<Type>;
  unresolvedType: GoPtr<Type>;
  nonInferrableAnyType: GoPtr<Type>;
  intrinsicMarkerType: GoPtr<Type>;
  unknownType: GoPtr<Type>;
  undefinedType: GoPtr<Type>;
  undefinedWideningType: GoPtr<Type>;
  missingType: GoPtr<Type>;
  undefinedOrMissingType: GoPtr<Type>;
  optionalType: GoPtr<Type>;
  nullType: GoPtr<Type>;
  nullWideningType: GoPtr<Type>;
  stringType: GoPtr<Type>;
  numberType: GoPtr<Type>;
  bigintType: GoPtr<Type>;
  regularFalseType: GoPtr<Type>;
  falseType: GoPtr<Type>;
  regularTrueType: GoPtr<Type>;
  trueType: GoPtr<Type>;
  booleanType: GoPtr<Type>;
  esSymbolType: GoPtr<Type>;
  voidType: GoPtr<Type>;
  neverType: GoPtr<Type>;
  silentNeverType: GoPtr<Type>;
  implicitNeverType: GoPtr<Type>;
  unreachableNeverType: GoPtr<Type>;
  nonPrimitiveType: GoPtr<Type>;
  stringOrNumberType: GoPtr<Type>;
  stringNumberSymbolType: GoPtr<Type>;
  numberOrBigIntType: GoPtr<Type>;
  templateConstraintType: GoPtr<Type>;
  numericStringType: GoPtr<Type>;
  uniqueLiteralType: GoPtr<Type>;
  uniqueLiteralMapper: GoPtr<TypeMapper>;
  reliabilityFlags: RelationComparisonResult;
  reportUnreliableMapper: GoPtr<TypeMapper>;
  reportUnmeasurableMapper: GoPtr<TypeMapper>;
  restrictiveMapper: GoPtr<TypeMapper>;
  permissiveMapper: GoPtr<TypeMapper>;
  emptyObjectType: GoPtr<Type>;
  emptyJsxObjectType: GoPtr<Type>;
  emptyFreshJsxObjectType: GoPtr<Type>;
  emptyTypeLiteralType: GoPtr<Type>;
  unknownEmptyObjectType: GoPtr<Type>;
  unknownUnionType: GoPtr<Type>;
  emptyGenericType: GoPtr<Type>;
  anyFunctionType: GoPtr<Type>;
  noConstraintType: GoPtr<Type>;
  circularConstraintType: GoPtr<Type>;
  resolvingDefaultType: GoPtr<Type>;
  markerSuperType: GoPtr<Type>;
  markerSubType: GoPtr<Type>;
  markerOtherType: GoPtr<Type>;
  markerSuperTypeForCheck: GoPtr<Type>;
  markerSubTypeForCheck: GoPtr<Type>;
  noTypePredicate: GoPtr<TypePredicate>;
  anySignature: GoPtr<Signature>;
  unknownSignature: GoPtr<Signature>;
  resolvingSignature: GoPtr<Signature>;
  silentNeverSignature: GoPtr<Signature>;
  cachedArgumentsReferenced: GoMap<GoPtr<Node>, bool>;
  enumNumberIndexInfo: GoPtr<IndexInfo>;
  anyBaseTypeIndexInfo: GoPtr<IndexInfo>;
  patternAmbientModules: GoSlice<GoPtr<PatternAmbientModule>>;
  patternAmbientModuleAugmentations: SymbolTable;
  globalObjectType: GoPtr<Type>;
  globalFunctionType: GoPtr<Type>;
  globalCallableFunctionType: GoPtr<Type>;
  globalNewableFunctionType: GoPtr<Type>;
  globalArrayType: GoPtr<Type>;
  globalReadonlyArrayType: GoPtr<Type>;
  globalStringType: GoPtr<Type>;
  globalNumberType: GoPtr<Type>;
  globalBooleanType: GoPtr<Type>;
  globalRegExpType: GoPtr<Type>;
  globalThisType: GoPtr<Type>;
  anyArrayType: GoPtr<Type>;
  autoArrayType: GoPtr<Type>;
  anyReadonlyArrayType: GoPtr<Type>;
  deferredGlobalImportMetaExpressionType: GoPtr<Type>;
  contextualBindingPatterns: GoSlice<GoPtr<Node>>;
  emptyStringType: GoPtr<Type>;
  zeroType: GoPtr<Type>;
  zeroBigIntType: GoPtr<Type>;
  typeofType: GoPtr<Type>;
  typeResolutions: GoSlice<TypeResolution>;
  resolutionStart: int;
  inVarianceComputation: bool;
  apparentArgumentCount: GoRef<int>;
  lastGetCombinedNodeFlagsNode: GoPtr<Node>;
  lastGetCombinedNodeFlagsResult: NodeFlags;
  lastGetCombinedModifierFlagsNode: GoPtr<Node>;
  lastGetCombinedModifierFlagsResult: ModifierFlags;
  freeinferenceState: GoPtr<InferenceState>;
  freeFlowState: GoPtr<FlowState>;
  flowLoopCache: GoMap<FlowLoopKey, GoPtr<Type>>;
  flowLoopStack: GoSlice<FlowLoopInfo>;
  sharedFlows: GoSlice<SharedFlow>;
  antecedentTypes: GoSlice<GoPtr<Type>>;
  flowAnalysisDisabled: bool;
  flowInvocationCount: int;
  flowTypeCache: GoMap<GoPtr<Node>, GoPtr<Type>>;
  lastFlowNode: GoPtr<FlowNode>;
  lastFlowNodeReachable: bool;
  flowNodeReachable: GoMap<GoPtr<FlowNode>, bool>;
  flowNodePostSuper: GoMap<GoPtr<FlowNode>, bool>;
  renamedBindingElementsInTypes: GoSlice<GoPtr<Node>>;
  contextualInfos: GoSlice<ContextualInfo>;
  inferenceContextInfos: GoSlice<InferenceContextInfo>;
  awaitedTypeStack: GoSlice<GoPtr<Type>>;
  reverseMappedSourceStack: GoSlice<GoPtr<Type>>;
  reverseMappedTargetStack: GoSlice<GoPtr<Type>>;
  reverseExpandingFlags: ExpandingFlags;
  freeRelater: GoPtr<Relater>;
  subtypeRelation: GoPtr<Relation>;
  strictSubtypeRelation: GoPtr<Relation>;
  assignableRelation: GoPtr<Relation>;
  comparableRelation: GoPtr<Relation>;
  identityRelation: GoPtr<Relation>;
  enumRelation: GoMap<EnumRelationKey, RelationComparisonResult>;
  getGlobalESSymbolType: GoFunc<() => GoPtr<Type>>;
  getGlobalBigIntType: GoFunc<() => GoPtr<Type>>;
  getGlobalImportMetaType: GoFunc<() => GoPtr<Type>>;
  getGlobalImportAttributesType: GoFunc<() => GoPtr<Type>>;
  getGlobalImportAttributesTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalNonNullableTypeAliasOrNil: GoFunc<() => GoPtr<Symbol>>;
  getGlobalExtractSymbol: GoFunc<() => GoPtr<Symbol>>;
  getGlobalDisposableType: GoFunc<() => GoPtr<Type>>;
  getGlobalAsyncDisposableType: GoFunc<() => GoPtr<Type>>;
  getGlobalAwaitedSymbol: GoFunc<() => GoPtr<Symbol>>;
  getGlobalAwaitedSymbolOrNil: GoFunc<() => GoPtr<Symbol>>;
  getGlobalNaNSymbolOrNil: GoFunc<() => GoPtr<Symbol>>;
  getGlobalRecordSymbol: GoFunc<() => GoPtr<Symbol>>;
  getGlobalTemplateStringsArrayType: GoFunc<() => GoPtr<Type>>;
  getGlobalESSymbolConstructorSymbolOrNil: GoFunc<() => GoPtr<Symbol>>;
  getGlobalESSymbolConstructorTypeSymbolOrNil: GoFunc<() => GoPtr<Symbol>>;
  getGlobalImportCallOptionsType: GoFunc<() => GoPtr<Type>>;
  getGlobalImportCallOptionsTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalPromiseType: GoFunc<() => GoPtr<Type>>;
  getGlobalPromiseTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalPromiseLikeType: GoFunc<() => GoPtr<Type>>;
  getGlobalPromiseConstructorSymbol: GoFunc<() => GoPtr<Symbol>>;
  getGlobalPromiseConstructorSymbolOrNil: GoFunc<() => GoPtr<Symbol>>;
  getGlobalOmitSymbol: GoFunc<() => GoPtr<Symbol>>;
  getGlobalNoInferSymbolOrNil: GoFunc<() => GoPtr<Symbol>>;
  getGlobalIteratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalIterableType: GoFunc<() => GoPtr<Type>>;
  getGlobalIterableTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalIterableIteratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalIterableIteratorTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalIteratorObjectType: GoFunc<() => GoPtr<Type>>;
  getGlobalGeneratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalAsyncIteratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalAsyncIterableType: GoFunc<() => GoPtr<Type>>;
  getGlobalAsyncIterableTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalAsyncIterableIteratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalAsyncIterableIteratorTypeChecked: GoFunc<() => GoPtr<Type>>;
  getGlobalAsyncIteratorObjectType: GoFunc<() => GoPtr<Type>>;
  getGlobalAsyncGeneratorType: GoFunc<() => GoPtr<Type>>;
  getGlobalIteratorYieldResultType: GoFunc<() => GoPtr<Type>>;
  getGlobalIteratorReturnResultType: GoFunc<() => GoPtr<Type>>;
  getGlobalTypedPropertyDescriptorType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassDecoratorContextType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassMethodDecoratorContextType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassGetterDecoratorContextType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassSetterDecoratorContextType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassAccessorDecoratorContxtType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassAccessorDecoratorContextType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassAccessorDecoratorTargetType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassAccessorDecoratorResultType: GoFunc<() => GoPtr<Type>>;
  getGlobalClassFieldDecoratorContextType: GoFunc<() => GoPtr<Type>>;
  syncIterationTypesResolver: GoPtr<IterationTypesResolver>;
  asyncIterationTypesResolver: GoPtr<IterationTypesResolver>;
  isPrimitiveOrObjectOrEmptyType: GoFunc<(arg0: GoPtr<Type>) => bool>;
  containsMissingType: GoFunc<(arg0: GoPtr<Type>) => bool>;
  couldContainTypeVariables: GoFunc<(arg0: GoPtr<Type>) => bool>;
  isStringIndexSignatureOnlyType: GoFunc<(arg0: GoPtr<Type>) => bool>;
  markNodeAssignments: GoFunc<(arg0: GoPtr<Node>) => bool>;
  compareTypesAssignable: TypeComparer;
  emitResolver: GoPtr<EmitResolver>;
  emitResolverOnce: Once;
  _jsxNamespace: string;
  _jsxFactoryEntity: GoPtr<Node>;
  skipDirectInferenceNodes: Set<GoPtr<Node>>;
  ctx: GoInterface<Context>;
  packagesMap: GoMap<string, bool>;
  activeMappers: GoSlice<GoPtr<TypeMapper>>;
  activeTypeMappersCaches: GoSlice<GoMap<CacheHashKey, GoPtr<Type>>>;
  ambientModulesOnce: Once;
  ambientModules: GoSlice<GoPtr<Symbol>>;
  withinUnreachableCode: bool;
  reportedUnreachableNodes: Set<GoPtr<Node>>;
  nonExistentProperties: Set<NonExistentPropertyKey>;
  deferredDiagnosticCallbacks: GoSlice<GoFunc<() => void>>;
  typeToStringNodebuilder: GoPtr<NodeBuilder>;
  mu: Mutex;
  tracer: GoPtr<Tracer>;
}

function newArena<T>(): Arena<T> {
  return { data: GoEmptySlice<T>() };
}

function newLinkStore<K extends GoComparable, V>(): LinkStore<K, V> {
  return {
    entries: new globalThis.Map<K, GoRef<V>>(),
    arena: newArena<V>(),
  };
}

function newCheckerSet<T extends GoComparable>(keyDescriptor: GoMapKeyDescriptor<T>): Set<T> {
  return NewSetWithSizeHint<T>(0 as int, keyDescriptor)!;
}

function zeroSourceFileLinks(): SourceFileLinks {
  return {
    typeChecked: GoZeroBoolean(),
    unusedChecked: GoZeroBoolean(),
    externalHelpersModule: GoZeroPointer<Symbol>(),
    requestedExternalEmitHelpers: GoZeroNumber(),
    deferredNodes: {
      m: {
        __tsgoBlank0: {},
        keys: GoNilSlice<GoPtr<Node>>(),
        mp: GoNilMap<GoPtr<Node>, { readonly __tsgoEmpty?: never }>(),
      },
    },
    identifierCheckNodes: GoNilSlice<GoPtr<Node>>(),
    localJsxNamespace: GoZeroString(),
    localJsxFragmentNamespace: GoZeroString(),
    localJsxFactory: GoZeroPointer<Node>(),
    localJsxFragmentFactory: GoZeroPointer<Node>(),
    jsxFragmentType: GoZeroPointer<Type>(),
  };
}

export function Checker_getSourceFileLinks(receiver: GoPtr<Checker>, sourceFile: GoPtr<SourceFile>): GoPtr<SourceFileLinks> {
  const links = LinkStore_Get(receiver!.sourceFileLinks, sourceFile, zeroSourceFileLinks, goSourceFilePointerKey);
  if (GoMapIsNil(links!.v.deferredNodes.m.mp)) {
    links!.v.deferredNodes = NewOrderedSetWithSizeHint<GoPtr<Node>>(0 as int, goNodePointerKey)!;
  }
  return links!.v;
}

function newDiagnosticsCollection(): DiagnosticsCollection {
  return {
    mu: new Mutex(),
    count: 0 as int,
    fileDiagnostics: GoNilMap(),
    fileDiagnosticsSorted: newCheckerSet<string>(GoStringKey),
    nonFileDiagnostics: GoNilSlice(),
    nonFileDiagnosticsSorted: false,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::NewChecker","kind":"func","status":"implemented","sigHash":"5a36339d895d820adc80ee044527546d77331ffbaa8c8d2e9c838edadf636da3"}
 *
 * Go source:
 * func NewChecker(program Program, tracer *Tracer) (*Checker, *sync.Mutex) {
 * 	program.BindSourceFiles()
 * 
 * 	c := &Checker{}
 * 	c.id = nextCheckerID.Add(1)
 * 	c.tracer = tracer
 * 	c.program = program
 * 	c.compilerOptions = program.Options()
 * 	c.files = program.SourceFiles()
 * 	c.fileIndexMap = createFileIndexMap(c.files)
 * 	c.compareSymbols = c.compareSymbolsWorker           // Closure optimization
 * 	c.compareSymbolChains = c.compareSymbolChainsWorker // Closure optimization
 * 	c.languageVersion = c.compilerOptions.GetEmitScriptTarget()
 * 	c.moduleKind = c.compilerOptions.GetEmitModuleKind()
 * 	c.moduleResolutionKind = c.compilerOptions.GetModuleResolutionKind()
 * 	c.legacyDecorators = c.compilerOptions.ExperimentalDecorators == core.TSTrue
 * 	c.emitStandardClassFields = c.compilerOptions.GetEmitStandardClassFields()
 * 	c.strictNullChecks = c.compilerOptions.GetStrictOptionValue(c.compilerOptions.StrictNullChecks)
 * 	c.strictFunctionTypes = c.compilerOptions.GetStrictOptionValue(c.compilerOptions.StrictFunctionTypes)
 * 	c.strictBindCallApply = c.compilerOptions.GetStrictOptionValue(c.compilerOptions.StrictBindCallApply)
 * 	c.strictPropertyInitialization = c.compilerOptions.GetStrictOptionValue(c.compilerOptions.StrictPropertyInitialization)
 * 	c.strictBuiltinIteratorReturn = c.compilerOptions.GetStrictOptionValue(c.compilerOptions.StrictBuiltinIteratorReturn)
 * 	c.noImplicitAny = c.compilerOptions.GetStrictOptionValue(c.compilerOptions.NoImplicitAny)
 * 	c.noImplicitThis = c.compilerOptions.GetStrictOptionValue(c.compilerOptions.NoImplicitThis)
 * 	c.useUnknownInCatchVariables = c.compilerOptions.GetStrictOptionValue(c.compilerOptions.UseUnknownInCatchVariables)
 * 	c.exactOptionalPropertyTypes = c.compilerOptions.ExactOptionalPropertyTypes == core.TSTrue
 * 	c.canCollectSymbolAliasAccessibilityData = c.compilerOptions.VerbatimModuleSyntax.IsFalseOrUnknown()
 * 	c.arrayVariances = []VarianceFlags{VarianceFlagsCovariant}
 * 	c.globals = make(ast.SymbolTable, countGlobalSymbols(c.files))
 * 	c.evaluate = evaluator.NewEvaluator(c.evaluateEntity, ast.OEKParentheses)
 * 	c.stringLiteralTypes = make(map[string]*Type)
 * 	c.numberLiteralTypes = make(map[jsnum.Number]*Type)
 * 	c.bigintLiteralTypes = make(map[jsnum.PseudoBigInt]*Type)
 * 	c.enumLiteralTypes = make(map[EnumLiteralKey]*Type)
 * 	c.enumNaNLiteralTypes = make(map[*ast.Symbol]*Type)
 * 	c.indexedAccessTypes = make(map[CacheHashKey]*Type)
 * 	c.templateLiteralTypes = make(map[CacheHashKey]*Type)
 * 	c.stringMappingTypes = make(map[StringMappingKey]*Type)
 * 	c.uniqueESSymbolTypes = make(map[*ast.Symbol]*Type)
 * 	c.thisExpandoKinds = make(map[*ast.Symbol]thisAssignmentDeclarationKind)
 * 	c.thisExpandoLocations = make(map[*ast.Symbol]*ast.Node)
 * 	c.subtypeReductionCache = make(map[CacheHashKey][]*Type)
 * 	c.cachedTypes = make(map[CachedTypeKey]*Type)
 * 	c.cachedSignatures = make(map[CachedSignatureKey]*Signature)
 * 	c.undefinedProperties = make(map[string]*ast.Symbol)
 * 	c.narrowedTypes = make(map[NarrowedTypeKey]*Type)
 * 	c.assignmentReducedTypes = make(map[AssignmentReducedKey]*Type)
 * 	c.discriminatedContextualTypes = make(map[DiscriminatedContextualTypeKey]*Type)
 * 	c.instantiationExpressionTypes = make(map[InstantiationExpressionKey]*Type)
 * 	c.substitutionTypes = make(map[SubstitutionTypeKey]*Type)
 * 	c.reverseMappedCache = make(map[ReverseMappedTypeKey]*Type)
 * 	c.reverseHomomorphicMappedCache = make(map[ReverseMappedTypeKey]*Type)
 * 	c.iterationTypesCache = make(map[IterationTypesKey]IterationTypes)
 * 	c.undefinedSymbol = c.newSymbol(ast.SymbolFlagsProperty, "undefined")
 * 	c.argumentsSymbol = c.newSymbol(ast.SymbolFlagsProperty, "arguments")
 * 	c.requireSymbol = c.newSymbol(ast.SymbolFlagsProperty, "require")
 * 	c.unknownSymbol = c.newSymbol(ast.SymbolFlagsProperty, "unknown")
 * 	c.unresolvedSymbols = make(map[string]*ast.Symbol)
 * 	c.errorTypes = make(map[CacheHashKey]*Type)
 * 	c.moduleSymbols = make(map[*ast.Node]*ast.Symbol)
 * 	c.globalThisSymbol = c.newSymbolEx(ast.SymbolFlagsModule, "globalThis", ast.CheckFlagsReadonly)
 * 	c.globalThisSymbol.Exports = c.globals
 * 	c.globals[c.globalThisSymbol.Name] = c.globalThisSymbol
 * 	c.resolveName = c.createNameResolver().Resolve
 * 	c.resolveNameForSymbolSuggestion = c.createNameResolverForSuggestion().Resolve
 * 	c.tupleTypes = make(map[CacheHashKey]*Type)
 * 	c.unionTypes = make(map[CacheHashKey]*Type)
 * 	c.unionOfUnionTypes = make(map[UnionOfUnionKey]*Type)
 * 	c.intersectionTypes = make(map[CacheHashKey]*Type)
 * 	c.propertiesTypes = make(map[PropertiesTypesKey]*Type)
 * 	c.mergedSymbols = make(map[*ast.Symbol]*ast.Symbol)
 * 	c.patternForType = make(map[*Type]*ast.Node)
 * 	c.contextFreeTypes = make(map[*ast.Node]*Type)
 * 	c.anyType = c.newIntrinsicType(TypeFlagsAny, "any")
 * 	c.autoType = c.newIntrinsicTypeEx(TypeFlagsAny, "any", ObjectFlagsNonInferrableType)
 * 	c.wildcardType = c.newIntrinsicType(TypeFlagsAny, "any")
 * 	c.blockedStringType = c.newIntrinsicType(TypeFlagsAny, "any")
 * 	c.errorType = c.newIntrinsicType(TypeFlagsAny, "error")
 * 	c.unresolvedType = c.newIntrinsicType(TypeFlagsAny, "unresolved")
 * 	c.nonInferrableAnyType = c.newIntrinsicTypeEx(TypeFlagsAny, "any", ObjectFlagsContainsWideningType)
 * 	c.intrinsicMarkerType = c.newIntrinsicType(TypeFlagsAny, "intrinsic")
 * 	c.unknownType = c.newIntrinsicType(TypeFlagsUnknown, "unknown")
 * 	c.undefinedType = c.newIntrinsicType(TypeFlagsUndefined, "undefined")
 * 	c.undefinedWideningType = c.createWideningType(c.undefinedType)
 * 	c.missingType = c.newIntrinsicType(TypeFlagsUndefined, "undefined")
 * 	c.undefinedOrMissingType = core.IfElse(c.exactOptionalPropertyTypes, c.missingType, c.undefinedType)
 * 	c.optionalType = c.newIntrinsicType(TypeFlagsUndefined, "undefined")
 * 	c.nullType = c.newIntrinsicType(TypeFlagsNull, "null")
 * 	c.nullWideningType = c.createWideningType(c.nullType)
 * 	c.stringType = c.newIntrinsicType(TypeFlagsString, "string")
 * 	c.numberType = c.newIntrinsicType(TypeFlagsNumber, "number")
 * 	c.bigintType = c.newIntrinsicType(TypeFlagsBigInt, "bigint")
 * 	c.regularFalseType = c.newLiteralType(TypeFlagsBooleanLiteral, false, nil)
 * 	c.falseType = c.newLiteralType(TypeFlagsBooleanLiteral, false, c.regularFalseType)
 * 	c.regularFalseType.AsLiteralType().freshType = c.falseType
 * 	c.falseType.AsLiteralType().freshType = c.falseType
 * 	c.regularTrueType = c.newLiteralType(TypeFlagsBooleanLiteral, true, nil)
 * 	c.trueType = c.newLiteralType(TypeFlagsBooleanLiteral, true, c.regularTrueType)
 * 	c.regularTrueType.AsLiteralType().freshType = c.trueType
 * 	c.trueType.AsLiteralType().freshType = c.trueType
 * 	c.booleanType = c.getUnionType([]*Type{c.regularFalseType, c.regularTrueType})
 * 	c.esSymbolType = c.newIntrinsicType(TypeFlagsESSymbol, "symbol")
 * 	c.voidType = c.newIntrinsicType(TypeFlagsVoid, "void")
 * 	c.neverType = c.newIntrinsicType(TypeFlagsNever, "never")
 * 	c.silentNeverType = c.newIntrinsicTypeEx(TypeFlagsNever, "never", ObjectFlagsNonInferrableType)
 * 	c.implicitNeverType = c.newIntrinsicType(TypeFlagsNever, "never")
 * 	c.unreachableNeverType = c.newIntrinsicType(TypeFlagsNever, "never")
 * 	c.nonPrimitiveType = c.newIntrinsicType(TypeFlagsNonPrimitive, "object")
 * 	c.stringOrNumberType = c.getUnionType([]*Type{c.stringType, c.numberType})
 * 	c.stringNumberSymbolType = c.getUnionType([]*Type{c.stringType, c.numberType, c.esSymbolType})
 * 	c.numberOrBigIntType = c.getUnionType([]*Type{c.numberType, c.bigintType})
 * 	c.numericStringType = c.getTemplateLiteralType([]string{"", ""}, []*Type{c.numberType}) // The `${number}` type
 * 	c.templateConstraintType = c.getUnionType([]*Type{c.stringType, c.numberType, c.booleanType, c.bigintType, c.nullType, c.undefinedType})
 * 	c.uniqueLiteralType = c.newIntrinsicType(TypeFlagsNever, "never") // Special `never` flagged by union reduction to behave as a literal
 * 	c.uniqueLiteralMapper = newFunctionTypeMapper(c.getUniqueLiteralTypeForTypeParameter)
 * 	c.reportUnreliableMapper = newFunctionTypeMapper(c.reportUnreliableWorker)
 * 	c.reportUnmeasurableMapper = newFunctionTypeMapper(c.reportUnmeasurableWorker)
 * 	c.restrictiveMapper = newFunctionTypeMapper(c.restrictiveMapperWorker)
 * 	c.permissiveMapper = newFunctionTypeMapper(c.permissiveMapperWorker)
 * 	c.emptyObjectType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.emptyJsxObjectType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.emptyFreshJsxObjectType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.emptyTypeLiteralType = c.newAnonymousType(c.newSymbol(ast.SymbolFlagsTypeLiteral, ast.InternalSymbolNameType), nil, nil, nil, nil)
 * 	c.unknownEmptyObjectType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.unknownUnionType = c.createUnknownUnionType()
 * 	c.emptyGenericType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.emptyGenericType.AsObjectType().instantiations = make(map[CacheHashKey]*Type)
 * 	c.anyFunctionType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.anyFunctionType.objectFlags |= ObjectFlagsNonInferrableType
 * 	c.noConstraintType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.circularConstraintType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.resolvingDefaultType = c.newAnonymousType(nil /*symbol* /, nil, nil, nil, nil)
 * 	c.markerSuperType = c.newTypeParameter(nil)
 * 	c.markerSubType = c.newTypeParameter(nil)
 * 	c.markerSubType.AsTypeParameter().constraint = c.markerSuperType
 * 	c.markerOtherType = c.newTypeParameter(nil)
 * 	c.markerSuperTypeForCheck = c.newTypeParameter(nil)
 * 	c.markerSubTypeForCheck = c.newTypeParameter(nil)
 * 	c.markerSubTypeForCheck.AsTypeParameter().constraint = c.markerSuperTypeForCheck
 * 	c.noTypePredicate = &TypePredicate{kind: TypePredicateKindIdentifier, parameterIndex: 0, parameterName: "<<unresolved>>", t: c.anyType}
 * 	c.anySignature = c.newSignature(SignatureFlagsNone, nil, nil, nil, nil, c.anyType, nil, 0)
 * 	c.unknownSignature = c.newSignature(SignatureFlagsNone, nil, nil, nil, nil, c.errorType, nil, 0)
 * 	c.resolvingSignature = c.newSignature(SignatureFlagsNone, nil, nil, nil, nil, c.anyType, nil, 0)
 * 	c.silentNeverSignature = c.newSignature(SignatureFlagsNone, nil, nil, nil, nil, c.silentNeverType, nil, 0)
 * 	c.cachedArgumentsReferenced = make(map[*ast.Node]bool)
 * 	c.enumNumberIndexInfo = &IndexInfo{keyType: c.numberType, valueType: c.stringType, isReadonly: true}
 * 	c.anyBaseTypeIndexInfo = &IndexInfo{keyType: c.stringType, valueType: c.anyType, isReadonly: false}
 * 	c.emptyStringType = c.getStringLiteralType("")
 * 	c.zeroType = c.getNumberLiteralType(0)
 * 	c.zeroBigIntType = c.getBigIntLiteralType(jsnum.PseudoBigInt{})
 * 	c.typeofType = c.getUnionType(core.Map(slices.Sorted(maps.Keys(typeofNEFacts)), c.getStringLiteralType))
 * 	c.flowLoopCache = make(map[FlowLoopKey]*Type)
 * 	c.flowNodeReachable = make(map[*ast.FlowNode]bool)
 * 	c.flowNodePostSuper = make(map[*ast.FlowNode]bool)
 * 	c.subtypeRelation = &Relation{}
 * 	c.strictSubtypeRelation = &Relation{}
 * 	c.assignableRelation = &Relation{}
 * 	c.comparableRelation = &Relation{}
 * 	c.identityRelation = &Relation{}
 * 	c.enumRelation = make(map[EnumRelationKey]RelationComparisonResult)
 * 	c.getGlobalESSymbolType = c.getGlobalTypeResolver("Symbol", 0 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalBigIntType = c.getGlobalTypeResolver("BigInt", 0 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalImportMetaType = c.getGlobalTypeResolver("ImportMeta", 0 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalImportAttributesType = c.getGlobalTypeResolver("ImportAttributes", 0 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalImportAttributesTypeChecked = c.getGlobalTypeResolver("ImportAttributes", 0 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalNonNullableTypeAliasOrNil = c.getGlobalTypeAliasResolver("NonNullable", 1 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalExtractSymbol = c.getGlobalTypeAliasResolver("Extract", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalDisposableType = c.getGlobalTypeResolver("Disposable", 0 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalAsyncDisposableType = c.getGlobalTypeResolver("AsyncDisposable", 0 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalAwaitedSymbol = c.getGlobalTypeAliasResolver("Awaited", 1 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalAwaitedSymbolOrNil = c.getGlobalTypeAliasResolver("Awaited", 1 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalNaNSymbolOrNil = c.getGlobalValueSymbolResolver("NaN", false /*reportErrors* /)
 * 	c.getGlobalRecordSymbol = c.getGlobalTypeAliasResolver("Record", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalTemplateStringsArrayType = c.getGlobalTypeResolver("TemplateStringsArray", 0 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalESSymbolConstructorSymbolOrNil = c.getGlobalValueSymbolResolver("Symbol", false /*reportErrors* /)
 * 	c.getGlobalESSymbolConstructorTypeSymbolOrNil = c.getGlobalTypeSymbolResolver("SymbolConstructor", false /*reportErrors* /)
 * 	c.getGlobalImportCallOptionsType = c.getGlobalTypeResolver("ImportCallOptions", 0 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalImportCallOptionsTypeChecked = c.getGlobalTypeResolver("ImportCallOptions", 0 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalPromiseType = c.getGlobalTypeResolver("Promise", 1 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalPromiseTypeChecked = c.getGlobalTypeResolver("Promise", 1 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalPromiseLikeType = c.getGlobalTypeResolver("PromiseLike", 1 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalPromiseConstructorSymbol = c.getGlobalValueSymbolResolver("Promise", true /*reportErrors* /)
 * 	c.getGlobalPromiseConstructorSymbolOrNil = c.getGlobalValueSymbolResolver("Promise", false /*reportErrors* /)
 * 	c.getGlobalOmitSymbol = c.getGlobalTypeAliasResolver("Omit", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalNoInferSymbolOrNil = c.getGlobalTypeAliasResolver("NoInfer", 1 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalIteratorType = c.getGlobalTypeResolver("Iterator", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalIterableType = c.getGlobalTypeResolver("Iterable", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalIterableTypeChecked = c.getGlobalTypeResolver("Iterable", 3 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalIterableIteratorType = c.getGlobalTypeResolver("IterableIterator", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalIterableIteratorTypeChecked = c.getGlobalTypeResolver("IterableIterator", 3 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalIteratorObjectType = c.getGlobalTypeResolver("IteratorObject", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalGeneratorType = c.getGlobalTypeResolver("Generator", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalAsyncIteratorType = c.getGlobalTypeResolver("AsyncIterator", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalAsyncIterableType = c.getGlobalTypeResolver("AsyncIterable", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalAsyncIterableTypeChecked = c.getGlobalTypeResolver("AsyncIterable", 3 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalAsyncIterableIteratorType = c.getGlobalTypeResolver("AsyncIterableIterator", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalAsyncIterableIteratorTypeChecked = c.getGlobalTypeResolver("AsyncIterableIterator", 3 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalAsyncIteratorObjectType = c.getGlobalTypeResolver("AsyncIteratorObject", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalAsyncGeneratorType = c.getGlobalTypeResolver("AsyncGenerator", 3 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalIteratorYieldResultType = c.getGlobalTypeResolver("IteratorYieldResult", 1 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalIteratorReturnResultType = c.getGlobalTypeResolver("IteratorReturnResult", 1 /*arity* /, false /*reportErrors* /)
 * 	c.getGlobalTypedPropertyDescriptorType = c.getGlobalTypeResolver("TypedPropertyDescriptor", 1 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalClassDecoratorContextType = c.getGlobalTypeResolver("ClassDecoratorContext", 1 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalClassMethodDecoratorContextType = c.getGlobalTypeResolver("ClassMethodDecoratorContext", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalClassGetterDecoratorContextType = c.getGlobalTypeResolver("ClassGetterDecoratorContext", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalClassSetterDecoratorContextType = c.getGlobalTypeResolver("ClassSetterDecoratorContext", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalClassAccessorDecoratorContextType = c.getGlobalTypeResolver("ClassAccessorDecoratorContext", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalClassAccessorDecoratorTargetType = c.getGlobalTypeResolver("ClassAccessorDecoratorTarget", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalClassAccessorDecoratorResultType = c.getGlobalTypeResolver("ClassAccessorDecoratorResult", 2 /*arity* /, true /*reportErrors* /)
 * 	c.getGlobalClassFieldDecoratorContextType = c.getGlobalTypeResolver("ClassFieldDecoratorContext", 2 /*arity* /, true /*reportErrors* /)
 * 	c.initializeClosures()
 * 	c.initializeIterationResolvers()
 * 	c.initializeChecker()
 * 	return c, &c.mu
 * }
 */
export function NewChecker(program: GoInterface<Program>, tracer: GoPtr<Tracer>): [GoPtr<Checker>, GoPtr<Mutex>] {
  program!.BindSourceFiles();

  const checker = {} as Checker;
  checker.id = nextCheckerID.Add(1);
  checker.TypeCount = 0;
  checker.SymbolCount = 0;
  checker.TotalInstantiationCount = 0;
  checker.instantiationCount = 0;
  checker.instantiationDepth = 0;
  checker.inlineLevel = 0;
  // Go zero-value for the serializationLevel counter. Without this it is undefined, and
  // `undefined < maxSerializationLevel` is false, so addDiagnostic silently drops every checker
  // diagnostic (the `{} as Checker` cast hides the missing field from tsc).
  checker.serializationLevel = 0;
  checker.resolutionStart = 0;
  checker.flowInvocationCount = 0;
  // Go struct zero-values for counter/flag fields that the incremental `{} as Checker` init
  // otherwise leaves `undefined` (the cast hides them from tsc). In JS, `undefined` is only
  // wrong in comparison / increment / loop-init / strict-bool contexts (`undefined < n` is
  // false; `undefined++` is NaN; `undefined === false` is false). Bitwise math coerces it
  // through 0 (`undefined | n === n`, `undefined & n === 0`) and `if (x)` treats it as false,
  // so flag and `if`-guarded fields tolerate it -- but we still set every one to its Go
  // zero-value to match the struct exactly and remove the whole class. The proven bug this
  // fixes is `serializationLevel` (`<`-compared above) silently dropping every diagnostic.
  checker.reliabilityFlags = 0;
  checker.reverseExpandingFlags = 0;
  checker.lastGetCombinedNodeFlagsResult = 0;
  checker.lastGetCombinedModifierFlagsResult = 0;
  checker.wasCanceled = false as bool;
  checker.flowAnalysisDisabled = false as bool;
  checker.inVarianceComputation = false as bool;
  checker.isInferencePartiallyBlocked = false as bool;
  checker.saveDeferredDiagnostics = false as bool;
  checker.lastFlowNodeReachable = false as bool;
  checker.tracer = tracer;
  checker.program = program;
  checker.compilerOptions = program!.Options();
  checker.files = program!.SourceFiles();
  checker.fileIndexMap = createFileIndexMap(checker.files);
  checker.compareSymbols = (left, right): int => Checker_compareSymbolsWorker(checker, left, right);
  checker.compareSymbolChains = (left, right): int => Checker_compareSymbolChainsWorker(checker, left, right);
  checker.languageVersion = CompilerOptions_GetEmitScriptTarget(checker.compilerOptions);
  checker.moduleKind = CompilerOptions_GetEmitModuleKind(checker.compilerOptions);
  checker.moduleResolutionKind = CompilerOptions_GetModuleResolutionKind(checker.compilerOptions);
  checker.legacyDecorators = checker.compilerOptions!.ExperimentalDecorators === TSTrue;
  checker.emitStandardClassFields = CompilerOptions_GetEmitStandardClassFields(checker.compilerOptions);
  checker.strictNullChecks = CompilerOptions_GetStrictOptionValue(checker.compilerOptions, checker.compilerOptions!.StrictNullChecks);
  checker.strictFunctionTypes = CompilerOptions_GetStrictOptionValue(checker.compilerOptions, checker.compilerOptions!.StrictFunctionTypes);
  checker.strictBindCallApply = CompilerOptions_GetStrictOptionValue(checker.compilerOptions, checker.compilerOptions!.StrictBindCallApply);
  checker.strictPropertyInitialization = CompilerOptions_GetStrictOptionValue(checker.compilerOptions, checker.compilerOptions!.StrictPropertyInitialization);
  checker.strictBuiltinIteratorReturn = CompilerOptions_GetStrictOptionValue(checker.compilerOptions, checker.compilerOptions!.StrictBuiltinIteratorReturn);
  checker.noImplicitAny = CompilerOptions_GetStrictOptionValue(checker.compilerOptions, checker.compilerOptions!.NoImplicitAny);
  checker.noImplicitThis = CompilerOptions_GetStrictOptionValue(checker.compilerOptions, checker.compilerOptions!.NoImplicitThis);
  checker.useUnknownInCatchVariables = CompilerOptions_GetStrictOptionValue(checker.compilerOptions, checker.compilerOptions!.UseUnknownInCatchVariables);
  checker.exactOptionalPropertyTypes = checker.compilerOptions!.ExactOptionalPropertyTypes === TSTrue;
  checker.canCollectSymbolAliasAccessibilityData = Tristate_IsFalseOrUnknown(checker.compilerOptions!.VerbatimModuleSyntax);
  checker._jsxNamespace = "";
  checker.arrayVariances = GoSliceBuild(1, 1, GoNumberValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, VarianceFlagsCovariant, GoNumberValueOps);
  });
  checker.globals = new globalThis.Map<string, GoPtr<Symbol>>();
  checker.evaluate = NewEvaluator((expr, location): Result => Checker_evaluateEntity(checker, expr, location), OEKParentheses);
  const pseudoBigIntKey = GoStructKey<PseudoBigInt, readonly [bool, string]>(
    [
      GoStructField((value) => value.Negative, GoBooleanKey),
      GoStructField((value) => value.Base10Value, GoStringKey),
    ],
    ([Negative, Base10Value]) => ({ Negative, Base10Value }),
  );
  const cacheHashKey = GoStructKey<CacheHashKey, readonly [bigint, bigint]>(
    [
      GoStructField((value) => value.Hi, GoBigIntKey),
      GoStructField((value) => value.Lo, GoBigIntKey),
    ],
    ([Hi, Lo], source) => globalThis.Object.assign(
      globalThis.Object.create(globalThis.Object.getPrototypeOf(source)) as CacheHashKey,
      source,
      { Hi, Lo },
    ),
  );
  const enumValueKey = GoInterfaceKey<unknown>(
    (value) => {
      if (typeof value === "string") return GoDynamicValue(GoStringKey, value);
      if (typeof value === "number") return GoDynamicValue(GoNumberKey, value);
      throw new TypeError("enum literal map key must be a string or number");
    },
    (dynamic) => dynamic?.value,
  );
  const enumLiteralKey = GoStructKey<EnumLiteralKey, readonly [GoPtr<Symbol>, unknown]>(
    [
      GoStructField((value) => value.enumSymbol, GoPointerKey<Symbol>()),
      GoStructField((value) => value.value, enumValueKey),
    ],
    ([enumSymbol, value]) => ({ enumSymbol, value }),
  );
  const cachedTypeKey = GoStructKey<CachedTypeKey, readonly [CachedTypeKind, TypeId]>(
    [
      GoStructField((value) => value.kind, GoNumberKey),
      GoStructField((value) => value.typeId, GoNumberKey),
    ],
    ([kind, typeId]) => ({ kind, typeId }),
  );
  const cachedSignatureKey = GoStructKey<CachedSignatureKey, readonly [GoPtr<Signature>, CacheHashKey]>(
    [
      GoStructField((value) => value.sig, GoPointerKey<Signature>()),
      GoStructField((value) => value.key, cacheHashKey),
    ],
    ([sig, key]) => ({ sig, key }),
  );
  const narrowedTypeKey = GoStructKey<NarrowedTypeKey, readonly [GoPtr<Type>, GoPtr<Type>, bool, bool]>(
    [
      GoStructField((value) => value.t, GoPointerKey<Type>()),
      GoStructField((value) => value.candidate, GoPointerKey<Type>()),
      GoStructField((value) => value.assumeTrue, GoBooleanKey),
      GoStructField((value) => value.checkDerived, GoBooleanKey),
    ],
    ([t, candidate, assumeTrue, checkDerived]) => ({ t, candidate, assumeTrue, checkDerived }),
  );
  const stringMappingKey = GoStructKey<StringMappingKey, readonly [GoPtr<Symbol>, GoPtr<Type>]>(
    [
      GoStructField((value) => value.s, GoPointerKey<Symbol>()),
      GoStructField((value) => value.t, GoPointerKey<Type>()),
    ],
    ([s, t]) => ({ s, t }),
  );
  const twoTypeIds = <K extends { id1: TypeId; id2: TypeId }>() => GoStructKey<K, readonly [TypeId, TypeId]>(
    [
      GoStructField((value) => value.id1, GoNumberKey),
      GoStructField((value) => value.id2, GoNumberKey),
    ],
    ([id1, id2]) => ({ id1, id2 }) as K,
  );
  const nodeAndTypeId = <K extends { nodeId: NodeId; typeId: TypeId }>() => GoStructKey<K, readonly [NodeId, TypeId]>(
    [
      GoStructField((value) => value.nodeId, GoNumberKey),
      GoStructField((value) => value.typeId, GoNumberKey),
    ],
    ([nodeId, typeId]) => ({ nodeId, typeId }) as K,
  );
  const substitutionTypeKey = GoStructKey<SubstitutionTypeKey, readonly [TypeId, TypeId]>(
    [
      GoStructField((value) => value.baseId, GoNumberKey),
      GoStructField((value) => value.constraintId, GoNumberKey),
    ],
    ([baseId, constraintId]) => ({ baseId, constraintId }),
  );
  const reverseMappedTypeKey = GoStructKey<ReverseMappedTypeKey, readonly [TypeId, TypeId, TypeId]>(
    [
      GoStructField((value) => value.sourceId, GoNumberKey),
      GoStructField((value) => value.targetId, GoNumberKey),
      GoStructField((value) => value.constraintId, GoNumberKey),
    ],
    ([sourceId, targetId, constraintId]) => ({ sourceId, targetId, constraintId }),
  );
  const iterationTypesKey = GoStructKey<IterationTypesKey, readonly [TypeId, IterationUse]>(
    [
      GoStructField((value) => value.typeId, GoNumberKey),
      GoStructField((value) => value.use, GoNumberKey),
    ],
    ([typeId, use]) => ({ typeId, use }),
  );
  const unionOfUnionKey = GoStructKey<UnionOfUnionKey, readonly [TypeId, TypeId, UnionReduction, CacheHashKey]>(
    [
      GoStructField((value) => value.id1, GoNumberKey),
      GoStructField((value) => value.id2, GoNumberKey),
      GoStructField((value) => value.r, GoNumberKey),
      GoStructField((value) => value.a, cacheHashKey),
    ],
    ([id1, id2, r, a]) => ({ id1, id2, r, a }),
  );
  const propertiesTypesKey = GoStructKey<PropertiesTypesKey, readonly [TypeId, TypeFlags, bool, bool]>(
    [
      GoStructField((value) => value.typeId, GoNumberKey),
      GoStructField((value) => value.include, GoNumberKey),
      GoStructField((value) => value.includeOrigin, GoBooleanKey),
      GoStructField((value) => value.unresolvedMembers, GoBooleanKey),
    ],
    ([typeId, include, includeOrigin, unresolvedMembers]) => ({ typeId, include, includeOrigin, unresolvedMembers }),
  );
  checker.stringLiteralTypes = new globalThis.Map();
  checker.numberLiteralTypes = new globalThis.Map();
  checker.bigintLiteralTypes = NewGoStructMap(pseudoBigIntKey);
  checker.enumLiteralTypes = NewGoStructMap(enumLiteralKey);
  checker.enumNaNLiteralTypes = new globalThis.Map();
  checker.indexedAccessTypes = NewGoStructMap(cacheHashKey);
  checker.templateLiteralTypes = NewGoStructMap(cacheHashKey);
  checker.stringMappingTypes = NewGoStructMap(stringMappingKey);
  checker.uniqueESSymbolTypes = new globalThis.Map();
  checker.thisExpandoKinds = new globalThis.Map();
  checker.thisExpandoLocations = new globalThis.Map();
  checker.subtypeReductionCache = NewGoStructMap(cacheHashKey);
  checker.cachedTypes = NewGoStructMap(cachedTypeKey);
  checker.cachedSignatures = NewGoStructMap(cachedSignatureKey);
  checker.undefinedProperties = new globalThis.Map();
  checker.narrowedTypes = NewGoStructMap(narrowedTypeKey);
  checker.assignmentReducedTypes = NewGoStructMap(twoTypeIds<AssignmentReducedKey>());
  checker.discriminatedContextualTypes = NewGoStructMap(nodeAndTypeId<DiscriminatedContextualTypeKey>());
  checker.instantiationExpressionTypes = NewGoStructMap(nodeAndTypeId<InstantiationExpressionKey>());
  checker.substitutionTypes = NewGoStructMap(substitutionTypeKey);
  checker.reverseMappedCache = NewGoStructMap(reverseMappedTypeKey);
  checker.reverseHomomorphicMappedCache = NewGoStructMap(reverseMappedTypeKey);
  checker.iterationTypesCache = NewGoStructMap(iterationTypesKey);
  checker.markerTypes = newCheckerSet<GoPtr<Type>>(goTypePointerKey);
  checker.symbolArena = newArena<Symbol>();
  checker.signatureArena = newArena<Signature>();
  checker.indexInfoArena = newArena<IndexInfo>();
  checker.undefinedSymbol = Checker_newSymbol(checker, SymbolFlagsProperty, "undefined");
  checker.argumentsSymbol = Checker_newSymbol(checker, SymbolFlagsProperty, "arguments");
  checker.requireSymbol = Checker_newSymbol(checker, SymbolFlagsProperty, "require");
  checker.unknownSymbol = Checker_newSymbol(checker, SymbolFlagsProperty, "unknown");
  checker.unresolvedSymbols = new globalThis.Map();
  checker.errorTypes = NewGoStructMap(cacheHashKey);
  checker.moduleSymbols = new globalThis.Map();
  checker.globalThisSymbol = Checker_newSymbolEx(checker, SymbolFlagsModule as SymbolFlags, "globalThis", CheckFlagsReadonly);
  checker.symbolTableAliasCache = GoNilMap<symbolTableID, GoSlice<GoPtr<Symbol>>>();
  checker.globalThisSymbol!.Exports = checker.globals;
  checker.globals.set(checker.globalThisSymbol!.Name, checker.globalThisSymbol);
  const nameResolver = Checker_createNameResolver(checker);
  const suggestionNameResolver = Checker_createNameResolverForSuggestion(checker);
  checker.resolveName = (location, name, meaning, nameNotFoundMessage, isUse, excludeGlobals): GoPtr<Symbol> =>
    NameResolver_Resolve(nameResolver, location, name, meaning, nameNotFoundMessage, isUse, excludeGlobals);
  checker.resolveNameForSymbolSuggestion = (location, name, meaning, nameNotFoundMessage, isUse, excludeGlobals): GoPtr<Symbol> =>
    NameResolver_Resolve(suggestionNameResolver, location, name, meaning, nameNotFoundMessage, isUse, excludeGlobals);
  checker.tupleTypes = NewGoStructMap(cacheHashKey);
  checker.unionTypes = NewGoStructMap(cacheHashKey);
  checker.unionOfUnionTypes = NewGoStructMap(unionOfUnionKey);
  checker.intersectionTypes = NewGoStructMap(cacheHashKey);
  checker.propertiesTypes = NewGoStructMap(propertiesTypesKey);
  checker.diagnostics = newDiagnosticsCollection();
  checker.suggestionDiagnostics = newDiagnosticsCollection();
  checker.mergedSymbols = new globalThis.Map();
  checker.factory = NewNodeFactory({ OnCreate: undefined, OnUpdate: undefined, OnClone: undefined })!;
  checker.nodeLinks = newLinkStore<Node, NodeLinks>();
  checker.signatureLinks = newLinkStore<Node, SignatureLinks>();
  checker.symbolNodeLinks = newLinkStore<Node, SymbolNodeLinks>();
  checker.typeNodeLinks = newLinkStore<Node, TypeNodeLinks>();
  checker.enumMemberLinks = newLinkStore<Node, EnumMemberLinks>();
  checker.assertionLinks = newLinkStore<Node, AssertionLinks>();
  checker.arrayLiteralLinks = newLinkStore<Node, ArrayLiteralLinks>();
  checker.switchStatementLinks = newLinkStore<Node, SwitchStatementLinks>();
  checker.jsxElementLinks = newLinkStore<Node, JsxElementLinks>();
  checker.symbolReferenceLinks = newLinkStore<Symbol, SymbolReferenceLinks>();
  checker.valueSymbolLinks = newLinkStore<Symbol, ValueSymbolLinks>();
  checker.mappedSymbolLinks = newLinkStore<Symbol, MappedSymbolLinks>();
  checker.deferredSymbolLinks = newLinkStore<Symbol, DeferredSymbolLinks>();
  checker.aliasSymbolLinks = newLinkStore<Symbol, AliasSymbolLinks>();
  checker.moduleSymbolLinks = newLinkStore<Symbol, ModuleSymbolLinks>();
  checker.lateBoundLinks = newLinkStore<Symbol, LateBoundLinks>();
  checker.exportTypeLinks = newLinkStore<Symbol, ExportTypeLinks>();
  checker.membersAndExportsLinks = newLinkStore<Symbol, MembersAndExportsLinks>();
  checker.typeAliasLinks = newLinkStore<Symbol, TypeAliasLinks>();
  checker.declaredTypeLinks = newLinkStore<Symbol, DeclaredTypeLinks>();
  checker.spreadLinks = newLinkStore<Symbol, SpreadLinks>();
  checker.varianceLinks = newLinkStore<Symbol, VarianceLinks>();
  checker.ReverseMappedSymbolLinks = newLinkStore<Symbol, ReverseMappedSymbolLinks>();
  checker.markedAssignmentSymbolLinks = newLinkStore<Symbol, MarkedAssignmentSymbolLinks>();
  checker.symbolContainerLinks = newLinkStore<Symbol, ContainingSymbolLinks>();
  checker.sourceFileLinks = newLinkStore<SourceFile, SourceFileLinks>();
  checker.patternForType = new globalThis.Map();
  checker.contextFreeTypes = new globalThis.Map();
  checker.anyType = Checker_newIntrinsicType(checker, TypeFlagsAny, "any");
  checker.autoType = Checker_newIntrinsicTypeEx(checker, TypeFlagsAny, "any", ObjectFlagsNonInferrableType);
  checker.wildcardType = Checker_newIntrinsicType(checker, TypeFlagsAny, "any");
  checker.blockedStringType = Checker_newIntrinsicType(checker, TypeFlagsAny, "any");
  checker.errorType = Checker_newIntrinsicType(checker, TypeFlagsAny, "error");
  checker.unresolvedType = Checker_newIntrinsicType(checker, TypeFlagsAny, "unresolved");
  checker.nonInferrableAnyType = Checker_newIntrinsicTypeEx(checker, TypeFlagsAny, "any", ObjectFlagsContainsWideningType);
  checker.intrinsicMarkerType = Checker_newIntrinsicType(checker, TypeFlagsAny, "intrinsic");
  checker.unknownType = Checker_newIntrinsicType(checker, TypeFlagsUnknown, "unknown");
  checker.undefinedType = Checker_newIntrinsicType(checker, TypeFlagsUndefined, "undefined");
  checker.undefinedWideningType = Checker_createWideningType(checker, checker.undefinedType);
  checker.missingType = Checker_newIntrinsicType(checker, TypeFlagsUndefined, "undefined");
  checker.undefinedOrMissingType = IfElse(checker.exactOptionalPropertyTypes, checker.missingType, checker.undefinedType);
  checker.optionalType = Checker_newIntrinsicType(checker, TypeFlagsUndefined, "undefined");
  checker.nullType = Checker_newIntrinsicType(checker, TypeFlagsNull, "null");
  checker.nullWideningType = Checker_createWideningType(checker, checker.nullType);
  checker.stringType = Checker_newIntrinsicType(checker, TypeFlagsString, "string");
  checker.numberType = Checker_newIntrinsicType(checker, TypeFlagsNumber, "number");
  checker.bigintType = Checker_newIntrinsicType(checker, TypeFlagsBigInt, "bigint");
  checker.regularFalseType = Checker_newLiteralType(checker, TypeFlagsBooleanLiteral, false, undefined);
  checker.falseType = Checker_newLiteralType(checker, TypeFlagsBooleanLiteral, false, checker.regularFalseType);
  Type_AsLiteralType(checker.regularFalseType)!.freshType = checker.falseType;
  Type_AsLiteralType(checker.falseType)!.freshType = checker.falseType;
  checker.regularTrueType = Checker_newLiteralType(checker, TypeFlagsBooleanLiteral, true, undefined);
  checker.trueType = Checker_newLiteralType(checker, TypeFlagsBooleanLiteral, true, checker.regularTrueType);
  Type_AsLiteralType(checker.regularTrueType)!.freshType = checker.trueType;
  Type_AsLiteralType(checker.trueType)!.freshType = checker.trueType;
  checker.booleanType = Checker_getUnionType(checker, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, checker.regularFalseType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, checker.regularTrueType, GoPointerValueOps<Type>());
  }));
  checker.esSymbolType = Checker_newIntrinsicType(checker, TypeFlagsESSymbol, "symbol");
  checker.voidType = Checker_newIntrinsicType(checker, TypeFlagsVoid, "void");
  checker.neverType = Checker_newIntrinsicType(checker, TypeFlagsNever, "never");
  checker.silentNeverType = Checker_newIntrinsicTypeEx(checker, TypeFlagsNever, "never", ObjectFlagsNonInferrableType);
  checker.implicitNeverType = Checker_newIntrinsicType(checker, TypeFlagsNever, "never");
  checker.unreachableNeverType = Checker_newIntrinsicType(checker, TypeFlagsNever, "never");
  checker.nonPrimitiveType = Checker_newIntrinsicType(checker, TypeFlagsNonPrimitive, "object");
  checker.stringOrNumberType = Checker_getUnionType(checker, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, checker.stringType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, checker.numberType, GoPointerValueOps<Type>());
  }));
  checker.stringNumberSymbolType = Checker_getUnionType(checker, GoSliceBuild(3, 3, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, checker.stringType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, checker.numberType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 2, checker.esSymbolType, GoPointerValueOps<Type>());
  }));
  checker.numberOrBigIntType = Checker_getUnionType(checker, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, checker.numberType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, checker.bigintType, GoPointerValueOps<Type>());
  }));
  checker.numericStringType = Checker_getTemplateLiteralType(checker, GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, "", GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, "", GoStringValueOps);
  }), GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, checker.numberType, GoPointerValueOps<Type>());
  }));
  checker.templateConstraintType = Checker_getUnionType(checker, GoSliceBuild(6, 6, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, checker.stringType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, checker.numberType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 2, checker.booleanType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 3, checker.bigintType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 4, checker.nullType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 5, checker.undefinedType, GoPointerValueOps<Type>());
  }));
  checker.uniqueLiteralType = Checker_newIntrinsicType(checker, TypeFlagsNever, "never");
  checker.uniqueLiteralMapper = newFunctionTypeMapper((typeParameter): GoPtr<Type> => Checker_getUniqueLiteralTypeForTypeParameter(checker, typeParameter));
  checker.reportUnreliableMapper = newFunctionTypeMapper((type): GoPtr<Type> => Checker_reportUnreliableWorker(checker, type));
  checker.reportUnmeasurableMapper = newFunctionTypeMapper((type): GoPtr<Type> => Checker_reportUnmeasurableWorker(checker, type));
  checker.restrictiveMapper = newFunctionTypeMapper((type): GoPtr<Type> => Checker_restrictiveMapperWorker(checker, type));
  checker.permissiveMapper = newFunctionTypeMapper((type): GoPtr<Type> => Checker_permissiveMapperWorker(checker, type));
  const nilSymbolTable = GoNilMap<string, GoPtr<Symbol>>();
  checker.emptyObjectType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.emptyJsxObjectType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.emptyFreshJsxObjectType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.emptyTypeLiteralType = Checker_newAnonymousType(checker, Checker_newSymbol(checker, SymbolFlagsTypeLiteral, InternalSymbolNameType), nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.unknownEmptyObjectType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.unknownUnionType = Checker_createUnknownUnionType(checker);
  checker.emptyGenericType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  Type_AsObjectType(checker.emptyGenericType)!.instantiations = NewGoStructMap(cacheHashKey);
  checker.anyFunctionType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.anyFunctionType!.objectFlags |= ObjectFlagsNonInferrableType;
  checker.noConstraintType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.circularConstraintType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.resolvingDefaultType = Checker_newAnonymousType(checker, undefined, nilSymbolTable, GoNilSlice(), GoNilSlice(), GoNilSlice());
  checker.markerSuperType = Checker_newTypeParameter(checker, undefined);
  checker.markerSubType = Checker_newTypeParameter(checker, undefined);
  Type_AsTypeParameter(checker.markerSubType)!.constraint = checker.markerSuperType;
  checker.markerOtherType = Checker_newTypeParameter(checker, undefined);
  checker.markerSuperTypeForCheck = Checker_newTypeParameter(checker, undefined);
  checker.markerSubTypeForCheck = Checker_newTypeParameter(checker, undefined);
  Type_AsTypeParameter(checker.markerSubTypeForCheck)!.constraint = checker.markerSuperTypeForCheck;
  checker.noTypePredicate = { kind: TypePredicateKindIdentifier, parameterIndex: 0 as int, parameterName: "<<unresolved>>", t: checker.anyType };
  checker.anySignature = Checker_newSignature(checker, SignatureFlagsNone, undefined, GoNilSlice(), undefined, GoNilSlice(), checker.anyType, undefined, 0);
  checker.unknownSignature = Checker_newSignature(checker, SignatureFlagsNone, undefined, GoNilSlice(), undefined, GoNilSlice(), checker.errorType, undefined, 0);
  checker.resolvingSignature = Checker_newSignature(checker, SignatureFlagsNone, undefined, GoNilSlice(), undefined, GoNilSlice(), checker.anyType, undefined, 0);
  checker.silentNeverSignature = Checker_newSignature(checker, SignatureFlagsNone, undefined, GoNilSlice(), undefined, GoNilSlice(), checker.silentNeverType, undefined, 0);
  checker.cachedArgumentsReferenced = new globalThis.Map();
  checker.enumNumberIndexInfo = { keyType: checker.numberType, valueType: checker.stringType, isReadonly: true, declaration: undefined, indexSymbol: undefined, components: GoNilSlice() };
  checker.anyBaseTypeIndexInfo = { keyType: checker.stringType, valueType: checker.anyType, isReadonly: false, declaration: undefined, indexSymbol: undefined, components: GoNilSlice() };
  checker.patternAmbientModules = GoNilSlice();
  checker.patternAmbientModuleAugmentations = GoNilMap();
  checker.emptyStringType = Checker_getStringLiteralType(checker, "");
  checker.zeroType = Checker_getNumberLiteralType(checker, FromString("0"));
  checker.zeroBigIntType = Checker_getBigIntLiteralType(checker, { Negative: false, Base10Value: "" });
  checker.typeofType = Checker_getUnionType(checker, Map(slices.Sorted(maps.Keys(typeofNEFacts)), (factName) => Checker_getStringLiteralType(checker, factName)));
  checker.contextualBindingPatterns = GoNilSlice();
  checker.typeResolutions = GoNilSlice();
  checker.flowLoopCache = new globalThis.Map();
  checker.flowLoopStack = GoNilSlice();
  checker.flowTypeCache = GoNilMap<GoPtr<Node>, GoPtr<Type>>();
  checker.sharedFlows = GoNilSlice();
  checker.antecedentTypes = GoNilSlice();
  checker.flowNodeReachable = new globalThis.Map();
  checker.flowNodePostSuper = new globalThis.Map();
  checker.renamedBindingElementsInTypes = GoNilSlice();
  checker.contextualInfos = GoNilSlice();
  checker.inferenceContextInfos = GoNilSlice();
  checker.awaitedTypeStack = GoNilSlice();
  checker.reverseMappedSourceStack = GoNilSlice();
  checker.reverseMappedTargetStack = GoNilSlice();
  checker.subtypeRelation = { results: GoNilMap<CacheHashKey, RelationComparisonResult>() };
  checker.strictSubtypeRelation = { results: GoNilMap<CacheHashKey, RelationComparisonResult>() };
  checker.assignableRelation = { results: GoNilMap<CacheHashKey, RelationComparisonResult>() };
  checker.comparableRelation = { results: GoNilMap<CacheHashKey, RelationComparisonResult>() };
  checker.identityRelation = { results: GoNilMap<CacheHashKey, RelationComparisonResult>() };
  checker.enumRelation = new globalThis.Map();
  checker.getGlobalESSymbolType = Checker_getGlobalTypeResolver(checker, "Symbol", 0, false);
  checker.getGlobalBigIntType = Checker_getGlobalTypeResolver(checker, "BigInt", 0, false);
  checker.getGlobalImportMetaType = Checker_getGlobalTypeResolver(checker, "ImportMeta", 0, true);
  checker.getGlobalImportAttributesType = Checker_getGlobalTypeResolver(checker, "ImportAttributes", 0, false);
  checker.getGlobalImportAttributesTypeChecked = Checker_getGlobalTypeResolver(checker, "ImportAttributes", 0, true);
  checker.getGlobalNonNullableTypeAliasOrNil = Checker_getGlobalTypeAliasResolver(checker, "NonNullable", 1, false);
  checker.getGlobalExtractSymbol = Checker_getGlobalTypeAliasResolver(checker, "Extract", 2, true);
  checker.getGlobalDisposableType = Checker_getGlobalTypeResolver(checker, "Disposable", 0, true);
  checker.getGlobalAsyncDisposableType = Checker_getGlobalTypeResolver(checker, "AsyncDisposable", 0, true);
  checker.getGlobalAwaitedSymbol = Checker_getGlobalTypeAliasResolver(checker, "Awaited", 1, true);
  checker.getGlobalAwaitedSymbolOrNil = Checker_getGlobalTypeAliasResolver(checker, "Awaited", 1, false);
  checker.getGlobalNaNSymbolOrNil = Checker_getGlobalValueSymbolResolver(checker, "NaN", false);
  checker.getGlobalRecordSymbol = Checker_getGlobalTypeAliasResolver(checker, "Record", 2, true);
  checker.getGlobalTemplateStringsArrayType = Checker_getGlobalTypeResolver(checker, "TemplateStringsArray", 0, true);
  checker.getGlobalESSymbolConstructorSymbolOrNil = Checker_getGlobalValueSymbolResolver(checker, "Symbol", false);
  checker.getGlobalESSymbolConstructorTypeSymbolOrNil = Checker_getGlobalTypeSymbolResolver(checker, "SymbolConstructor", false);
  checker.getGlobalImportCallOptionsType = Checker_getGlobalTypeResolver(checker, "ImportCallOptions", 0, false);
  checker.getGlobalImportCallOptionsTypeChecked = Checker_getGlobalTypeResolver(checker, "ImportCallOptions", 0, true);
  checker.getGlobalPromiseType = Checker_getGlobalTypeResolver(checker, "Promise", 1, false);
  checker.getGlobalPromiseTypeChecked = Checker_getGlobalTypeResolver(checker, "Promise", 1, true);
  checker.getGlobalPromiseLikeType = Checker_getGlobalTypeResolver(checker, "PromiseLike", 1, true);
  checker.getGlobalPromiseConstructorSymbol = Checker_getGlobalValueSymbolResolver(checker, "Promise", true);
  checker.getGlobalPromiseConstructorSymbolOrNil = Checker_getGlobalValueSymbolResolver(checker, "Promise", false);
  checker.getGlobalOmitSymbol = Checker_getGlobalTypeAliasResolver(checker, "Omit", 2, true);
  checker.getGlobalNoInferSymbolOrNil = Checker_getGlobalTypeAliasResolver(checker, "NoInfer", 1, false);
  checker.getGlobalIteratorType = Checker_getGlobalTypeResolver(checker, "Iterator", 3, false);
  checker.getGlobalIterableType = Checker_getGlobalTypeResolver(checker, "Iterable", 3, false);
  checker.getGlobalIterableTypeChecked = Checker_getGlobalTypeResolver(checker, "Iterable", 3, true);
  checker.getGlobalIterableIteratorType = Checker_getGlobalTypeResolver(checker, "IterableIterator", 3, false);
  checker.getGlobalIterableIteratorTypeChecked = Checker_getGlobalTypeResolver(checker, "IterableIterator", 3, true);
  checker.getGlobalIteratorObjectType = Checker_getGlobalTypeResolver(checker, "IteratorObject", 3, false);
  checker.getGlobalGeneratorType = Checker_getGlobalTypeResolver(checker, "Generator", 3, false);
  checker.getGlobalAsyncIteratorType = Checker_getGlobalTypeResolver(checker, "AsyncIterator", 3, false);
  checker.getGlobalAsyncIterableType = Checker_getGlobalTypeResolver(checker, "AsyncIterable", 3, false);
  checker.getGlobalAsyncIterableTypeChecked = Checker_getGlobalTypeResolver(checker, "AsyncIterable", 3, true);
  checker.getGlobalAsyncIterableIteratorType = Checker_getGlobalTypeResolver(checker, "AsyncIterableIterator", 3, false);
  checker.getGlobalAsyncIterableIteratorTypeChecked = Checker_getGlobalTypeResolver(checker, "AsyncIterableIterator", 3, true);
  checker.getGlobalAsyncIteratorObjectType = Checker_getGlobalTypeResolver(checker, "AsyncIteratorObject", 3, false);
  checker.getGlobalAsyncGeneratorType = Checker_getGlobalTypeResolver(checker, "AsyncGenerator", 3, false);
  checker.getGlobalIteratorYieldResultType = Checker_getGlobalTypeResolver(checker, "IteratorYieldResult", 1, false);
  checker.getGlobalIteratorReturnResultType = Checker_getGlobalTypeResolver(checker, "IteratorReturnResult", 1, false);
  checker.getGlobalTypedPropertyDescriptorType = Checker_getGlobalTypeResolver(checker, "TypedPropertyDescriptor", 1, true);
  checker.getGlobalClassDecoratorContextType = Checker_getGlobalTypeResolver(checker, "ClassDecoratorContext", 1, true);
  checker.getGlobalClassMethodDecoratorContextType = Checker_getGlobalTypeResolver(checker, "ClassMethodDecoratorContext", 2, true);
  checker.getGlobalClassGetterDecoratorContextType = Checker_getGlobalTypeResolver(checker, "ClassGetterDecoratorContext", 2, true);
  checker.getGlobalClassSetterDecoratorContextType = Checker_getGlobalTypeResolver(checker, "ClassSetterDecoratorContext", 2, true);
  checker.getGlobalClassAccessorDecoratorContextType = Checker_getGlobalTypeResolver(checker, "ClassAccessorDecoratorContext", 2, true);
  checker.getGlobalClassAccessorDecoratorTargetType = Checker_getGlobalTypeResolver(checker, "ClassAccessorDecoratorTarget", 2, true);
  checker.getGlobalClassAccessorDecoratorResultType = Checker_getGlobalTypeResolver(checker, "ClassAccessorDecoratorResult", 2, true);
  checker.getGlobalClassFieldDecoratorContextType = Checker_getGlobalTypeResolver(checker, "ClassFieldDecoratorContext", 2, true);
  checker.skipDirectInferenceNodes = newCheckerSet<GoPtr<Node>>(goNodePointerKey);
  checker.packagesMap = program!.GetPackagesMap();
  checker.activeMappers = GoNilSlice();
  checker.activeTypeMappersCaches = GoNilSlice();
  checker.emitResolverOnce = new Once();
  checker.ambientModulesOnce = new Once();
  checker.ambientModules = GoNilSlice();
  checker.reportedUnreachableNodes = newCheckerSet<GoPtr<Node>>(goNodePointerKey);
  checker.nonExistentProperties = newCheckerSet<NonExistentPropertyKey>(nonExistentPropertyKeyDescriptor);
  checker.deferredDiagnosticCallbacks = GoNilSlice();
  checker.mu = new Mutex();
  Checker_initializeClosures(checker);
  Checker_initializeIterationResolvers(checker);
  Checker_initializeChecker(checker);
  return [checker, checker.mu];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::createFileIndexMap","kind":"func","status":"implemented","sigHash":"95ff2e42b6a1e5a028d5365e8869f1f3ff0e890b8e58e6cf2f5c669e1f2f7a34"}
 *
 * Go source:
 * func createFileIndexMap(files []*ast.SourceFile) map[*ast.SourceFile]int {
 * 	result := make(map[*ast.SourceFile]int, len(files))
 * 	for i, file := range files {
 * 		result[file] = i
 * 	}
 * 	return result
 * }
 */
export function createFileIndexMap(files: GoSlice<GoPtr<SourceFile>>): GoMap<GoPtr<SourceFile>, int> {
  const result: GoMap<GoPtr<SourceFile>, int> = new globalThis.Map();
  for (let i = 0; i < files.length; i++) {
    result.set(GoSliceLoad(files, i, GoPointerValueOps<SourceFile>()), i);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::countGlobalSymbols","kind":"func","status":"implemented","sigHash":"418d7ba4e7fadfc63ab1977a04223e1b54c1966fbd229e5ab708cd4896b12eba"}
 *
 * Go source:
 * func countGlobalSymbols(files []*ast.SourceFile) int {
 * 	count := 0
 * 	for _, file := range files {
 * 		if !ast.IsExternalOrCommonJSModule(file) {
 * 			count += len(file.Locals)
 * 		}
 * 	}
 * 	return count
 * }
 */
export function countGlobalSymbols(files: GoSlice<GoPtr<SourceFile>>): int {
  let count = 0;
  for (const file of files) {
    if (!IsExternalOrCommonJSModule(file)) {
      count += Node_Locals(file as unknown as GoPtr<Node>).size;
    }
  }
  return count;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getGlobalTypeDeclaration","kind":"func","status":"implemented","sigHash":"bd8684c9f5fc16ae5da2685a0589fbd71b3e2cbd3ba1284df14f986386d18312"}
 *
 * Go source:
 * func getGlobalTypeDeclaration(symbol *ast.Symbol) *ast.Declaration {
 * 	for _, declaration := range symbol.Declarations {
 * 		switch declaration.Kind {
 * 		case ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration, ast.KindTypeAliasDeclaration:
 * 			return declaration
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function getGlobalTypeDeclaration(symbol_: GoPtr<Symbol>): GoPtr<Declaration> {
  for (const declaration of symbol_!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    switch (declaration!.Kind) {
      case KindClassDeclaration:
      case KindInterfaceDeclaration:
      case KindEnumDeclaration:
      case KindTypeAliasDeclaration:
        return declaration as unknown as GoPtr<Declaration>;
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isPrimitiveTypeName","kind":"func","status":"implemented","sigHash":"9adf426aecd9874f9dd7c45fe12c27e197ec9cf634f2bdc5caef6363c295515a"}
 *
 * Go source:
 * func isPrimitiveTypeName(s string) bool {
 * 	return s == "any" || s == "string" || s == "number" || s == "boolean" || s == "never" || s == "unknown"
 * }
 */
export function isPrimitiveTypeName(s: string): bool {
  return s === "any" || s === "string" || s === "number" || s === "boolean" || s === "never" || s === "unknown";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isES2015OrLaterConstructorName","kind":"func","status":"implemented","sigHash":"60d8d0f8050ec51eae88698ab4fa600d74854924641b19193b9f5847359d9607"}
 *
 * Go source:
 * func isES2015OrLaterConstructorName(s string) bool {
 * 	return s == "Promise" || s == "Symbol" || s == "Map" || s == "WeakMap" || s == "Set" || s == "WeakSet"
 * }
 */
export function isES2015OrLaterConstructorName(s: string): bool {
  return s === "Promise" || s === "Symbol" || s === "Map" || s === "WeakMap" || s === "Set" || s === "WeakSet";
}

let _primitiveTypeAliasSuggestionsCache: GoMap<string, GoPtr<Symbol>> | undefined;

/**
 * Port note: upstream implementation source follows.
 *
 * Go source:
 * var primitiveTypeAliasSuggestions = sync.OnceValue(func() map[string]*ast.Symbol {
 * 	result := make(map[string]*ast.Symbol, 6)
 * 	for _, e := range []struct{ primitive, builtin string }{
 * 		{"string", "String"},
 * 		{"number", "Number"},
 * 		{"boolean", "Boolean"},
 * 		{"object", "Object"},
 * 		{"bigint", "BigInt"},
 * 		{"symbol", "Symbol"},
 * 	} {
 * 		sym := &ast.Symbol{}
 * 		sym.Flags = ast.SymbolFlagsTypeAlias | ast.SymbolFlagsTransient
 * 		sym.Name = e.primitive
 * 		result[e.builtin] = sym
 * 	}
 * 	return result
 * })
 */
function _getPrimitiveTypeAliasSuggestionsMap(): GoMap<string, GoPtr<Symbol>> {
  if (_primitiveTypeAliasSuggestionsCache === undefined) {
    const result: GoMap<string, GoPtr<Symbol>> = new globalThis.Map();
    const pairs: Array<{ primitive: string; builtin: string }> = [
      { primitive: "string", builtin: "String" },
      { primitive: "number", builtin: "Number" },
      { primitive: "boolean", builtin: "Boolean" },
      { primitive: "object", builtin: "Object" },
      { primitive: "bigint", builtin: "BigInt" },
      { primitive: "symbol", builtin: "Symbol" },
    ];
    for (const e of pairs) {
      const sym: Symbol = { Flags: (SymbolFlagsTypeAlias | SymbolFlagsTransient) as unknown as SymbolFlags, CheckFlags: 0, Name: e.primitive, Declarations: GoNilSlice(), ValueDeclaration: undefined, Members: GoNilMap<string, GoPtr<Symbol>>(), Exports: GoNilMap<string, GoPtr<Symbol>>(), id: new Uint64(), Parent: undefined, ExportSymbol: undefined };
      result.set(e.builtin, sym);
    }
    _primitiveTypeAliasSuggestionsCache = result;
  }
  return _primitiveTypeAliasSuggestionsCache;
}
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::varGroup::primitiveTypeAliasSuggestions","kind":"varGroup","status":"implemented","sigHash":"2a9c97c6fecf643a20a00d549bd201438f39518580f63376b177ac9e9ad66dd1"}
 */
export let primitiveTypeAliasSuggestions: GoFunc<() => GoMap<string, GoPtr<Symbol>>> = _getPrimitiveTypeAliasSuggestionsMap;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getPrimitiveTypeAliasSuggestions","kind":"func","status":"implemented","sigHash":"31752245a24445d07b9fc08e958179dada3115b651b3f6d7e65ddad88786ec2e"}
 *
 * Go source:
 * func getPrimitiveTypeAliasSuggestions(symbols ast.SymbolTable) iter.Seq[*ast.Symbol] {
 * 	return func(yield func(*ast.Symbol) bool) {
 * 		for builtinName, suggestion := range primitiveTypeAliasSuggestions() {
 * 			if _, ok := symbols[builtinName]; ok {
 * 				if !yield(suggestion) {
 * 					return
 * 				}
 * 			}
 * 		}
 * 	}
 * }
 */
export function getPrimitiveTypeAliasSuggestions(symbols: SymbolTable): Seq<GoPtr<Symbol>> {
  return (yield_: GoFunc<(s: GoPtr<Symbol>) => bool>): void => {
    for (const [builtinName, suggestion] of primitiveTypeAliasSuggestions!()) {
      if (symbols.has(builtinName)) {
        if (!yield_!(suggestion)) {
          return;
        }
      }
    }
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isImmediatelyUsedInInitializerOfBlockScopedVariable","kind":"func","status":"implemented","sigHash":"4250f1994b5a7942aa2e256365b8bbff86ff7b5643e7a1542d0121ef0006135f"}
 *
 * Go source:
 * func isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration *ast.Node, usage *ast.Node, declContainer *ast.Node) bool {
 * 	switch declaration.Parent.Parent.Kind {
 * 	case ast.KindVariableStatement, ast.KindForStatement, ast.KindForOfStatement:
 * 		// variable statement/for/for-of statement case,
 * 		// use site should not be inside variable declaration (initializer of declaration or binding element)
 * 		if isSameScopeDescendentOf(usage, declaration, declContainer) {
 * 			return true
 * 		}
 * 	}
 * 	// ForIn/ForOf case - use site should not be used in expression part
 * 	grandparent := declaration.Parent.Parent
 * 	return ast.IsForInOrOfStatement(grandparent) && isSameScopeDescendentOf(usage, grandparent.Expression(), declContainer)
 * }
 */
export function isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration: GoPtr<Node>, usage: GoPtr<Node>, declContainer: GoPtr<Node>): bool {
  switch (declaration!.Parent!.Parent!.Kind) {
    case KindVariableStatement:
    case KindForStatement:
    case KindForOfStatement:
      if (isSameScopeDescendentOf(usage, declaration, declContainer)) {
        return true;
      }
  }
  const grandparent = declaration!.Parent!.Parent;
  return IsForInOrOfStatement(grandparent) && isSameScopeDescendentOf(usage, Node_Expression(grandparent), declContainer);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isSameScopeDescendentOf","kind":"func","status":"implemented","sigHash":"08db3a512f8e9ad0795c60afd353a7d088ec5c212dd7bcf8d6a63b888f2dc8f2"}
 *
 * Go source:
 * func isSameScopeDescendentOf(initial *ast.Node, parent *ast.Node, stopAt *ast.Node) bool {
 * 	if parent == nil {
 * 		return false
 * 	}
 * 	for n := initial; n != nil; n = n.Parent {
 * 		if n == parent {
 * 			return true
 * 		}
 * 		if n == stopAt || ast.IsFunctionLike(n) && (ast.GetImmediatelyInvokedFunctionExpression(n) == nil || (ast.GetFunctionFlags(n)&ast.FunctionFlagsAsyncGenerator != 0)) {
 * 			return false
 * 		}
 * 	}
 * 	return false
 * }
 */
export function isSameScopeDescendentOf(initial: GoPtr<Node>, parent: GoPtr<Node>, stopAt: GoPtr<Node>): bool {
  if (parent === undefined) {
    return false;
  }
  for (let n: GoPtr<Node> = initial; n !== undefined; n = n!.Parent) {
    if (n === parent) {
      return true;
    }
    if (n === stopAt || (IsFunctionLike(n) && (GetImmediatelyInvokedFunctionExpression(n) === undefined || (GetFunctionFlags(n) & FunctionFlagsAsyncGenerator) !== 0))) {
      return false;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isPropertyImmediatelyReferencedWithinDeclaration","kind":"func","status":"implemented","sigHash":"b2256f3a910c16c61a5a3cfa9b5bef82fe082bc285aec5995596fa53960a61d0"}
 *
 * Go source:
 * func isPropertyImmediatelyReferencedWithinDeclaration(declaration *ast.Node, usage *ast.Node, stopAtAnyPropertyDeclaration bool) bool {
 * 	// always legal if usage is after declaration
 * 	if usage.End() > declaration.End() {
 * 		return false
 * 	}
 * 	// still might be legal if usage is deferred (e.g. x: any = () => this.x)
 * 	// otherwise illegal if immediately referenced within the declaration (e.g. x: any = this.x)
 * 	for node := usage; node != nil && node != declaration; node = node.Parent {
 * 		switch node.Kind {
 * 		case ast.KindArrowFunction:
 * 			return false
 * 		case ast.KindPropertyDeclaration:
 * 			// even when stopping at any property declaration, they need to come from the same class
 * 			return stopAtAnyPropertyDeclaration &&
 * 				((ast.IsPropertyDeclaration(declaration) && node.Parent == declaration.Parent) ||
 * 					(ast.IsParameterPropertyDeclaration(declaration, declaration.Parent) && node.Parent == declaration.Parent.Parent))
 * 		case ast.KindBlock:
 * 			switch node.Parent.Kind {
 * 			case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
 * 				return false
 * 			}
 * 		}
 * 	}
 * 	return true
 * }
 */
export function isPropertyImmediatelyReferencedWithinDeclaration(declaration: GoPtr<Node>, usage: GoPtr<Node>, stopAtAnyPropertyDeclaration: bool): bool {
  if (Node_End(usage) > Node_End(declaration)) {
    return false;
  }
  for (let node: GoPtr<Node> = usage; node !== undefined && node !== declaration; node = node!.Parent) {
    switch (node!.Kind) {
      case KindArrowFunction:
        return false;
      case KindPropertyDeclaration:
        return stopAtAnyPropertyDeclaration &&
          ((IsPropertyDeclaration(declaration) && node!.Parent === declaration!.Parent) ||
            (IsParameterPropertyDeclaration(declaration, declaration!.Parent) && node!.Parent === declaration!.Parent!.Parent));
      case KindBlock:
        switch (node!.Parent!.Kind) {
          case KindMethodDeclaration:
          case KindGetAccessor:
          case KindSetAccessor:
            return false;
        }
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isInstancePropertyWithInitializerOrPrivateIdentifierProperty","kind":"func","status":"implemented","sigHash":"c7c2582b79839900e7d8d155eeacbeb7b880183842bb9be35ddbc83af318676b"}
 *
 * Go source:
 * func isInstancePropertyWithInitializerOrPrivateIdentifierProperty(n *ast.Node) bool {
 * 	return ast.IsPrivateIdentifierClassElementDeclaration(n) || ast.IsPropertyDeclaration(n) && !ast.IsStatic(n) && n.Initializer() != nil
 * }
 */
export function isInstancePropertyWithInitializerOrPrivateIdentifierProperty(n: GoPtr<Node>): bool {
  return IsPrivateIdentifierClassElementDeclaration(n) || (IsPropertyDeclaration(n) && !IsStatic(n) && Node_Initializer(n) !== undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::superCallIsRootLevelInConstructor","kind":"func","status":"implemented","sigHash":"25001c45d2dea77d585202bf74b41aa1d9427f5e77d2792261307c95b6631390"}
 *
 * Go source:
 * func superCallIsRootLevelInConstructor(superCall *ast.Node, body *ast.Node) bool {
 * 	superCallParent := ast.WalkUpParenthesizedExpressions(superCall.Parent)
 * 	return ast.IsExpressionStatement(superCallParent) && superCallParent.Parent == body
 * }
 */
export function superCallIsRootLevelInConstructor(superCall: GoPtr<Node>, body: GoPtr<Node>): bool {
  const superCallParent = WalkUpParenthesizedExpressions(superCall!.Parent as unknown as GoPtr<import("../../ast/generated/unions.js").Expression>);
  return IsExpressionStatement(superCallParent) && superCallParent!.Parent === body;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::nodeImmediatelyReferencesSuperOrThis","kind":"func","status":"implemented","sigHash":"06c3e6f83b0b6ddea30b639aa158b68004055fe9b88e2430a354184dfeed96ee"}
 *
 * Go source:
 * func nodeImmediatelyReferencesSuperOrThis(node *ast.Node) bool {
 * 	switch node.Kind {
 * 	case ast.KindSuperKeyword, ast.KindThisKeyword:
 * 		return true
 * 	case ast.KindArrowFunction, ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindPropertyDeclaration:
 * 		return false
 * 	case ast.KindBlock:
 * 		switch node.Parent.Kind {
 * 		case ast.KindConstructor, ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
 * 			return false
 * 		}
 * 	}
 * 	return node.ForEachChild(nodeImmediatelyReferencesSuperOrThis)
 * }
 */
export function nodeImmediatelyReferencesSuperOrThis(node: GoPtr<Node>): bool {
  switch (node!.Kind) {
    case KindSuperKeyword:
    case KindThisKeyword:
      return true;
    case KindArrowFunction:
    case KindFunctionDeclaration:
    case KindFunctionExpression:
    case KindPropertyDeclaration:
      return false;
    case KindBlock:
      switch (node!.Parent!.Kind) {
        case KindConstructor:
        case KindMethodDeclaration:
        case KindGetAccessor:
        case KindSetAccessor:
          return false;
      }
  }
  return Node_ForEachChild(node, nodeImmediatelyReferencesSuperOrThis);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::InheritanceInfo","kind":"type","status":"implemented","sigHash":"c711606f91f54b7c718719c78d0a84732db94f9c87351e642008072e907f4039"}
 *
 * Go source:
 * InheritanceInfo struct {
 * 	prop           *ast.Symbol
 * 	containingType *Type
 * }
 */
export interface InheritanceInfo {
  prop: GoPtr<Symbol>;
  containingType: GoPtr<Type>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isInstantiatedModule","kind":"func","status":"implemented","sigHash":"0161a8962287a32a1e4db76b90545867677e533def767ad10ef17fd67d2e762c"}
 *
 * Go source:
 * func isInstantiatedModule(node *ast.Node, preserveConstEnums bool) bool {
 * 	moduleState := ast.GetModuleInstanceState(node)
 * 	return moduleState == ast.ModuleInstanceStateInstantiated || preserveConstEnums && moduleState == ast.ModuleInstanceStateConstEnumOnly
 * }
 */
export function isInstantiatedModule(node: GoPtr<Node>, preserveConstEnums: bool): bool {
  const moduleState = GetModuleInstanceState(node);
  return moduleState === ModuleInstanceStateInstantiated || (preserveConstEnums && moduleState === ModuleInstanceStateConstEnumOnly);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getFirstNonAmbientClassOrFunctionDeclaration","kind":"func","status":"implemented","sigHash":"f4f836bdf0cedb210a4fbdc5c4d522890b1a61ad7319ea4c5995cc83985b6931"}
 *
 * Go source:
 * func getFirstNonAmbientClassOrFunctionDeclaration(symbol *ast.Symbol) *ast.Node {
 * 	for _, declaration := range symbol.Declarations {
 * 		if (ast.IsClassDeclaration(declaration) || ast.IsFunctionDeclaration(declaration) && ast.NodeIsPresent(declaration.Body())) && declaration.Flags&ast.NodeFlagsAmbient == 0 {
 * 			return declaration
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function getFirstNonAmbientClassOrFunctionDeclaration(symbol_: GoPtr<Symbol>): GoPtr<Node> {
  for (const declaration of symbol_!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    if ((IsClassDeclaration(declaration) || (IsFunctionDeclaration(declaration) && NodeIsPresent(Node_Body(declaration)))) && (declaration!.Flags & NodeFlagsAmbient) === 0) {
      return declaration;
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::hasTypeJsonImportAttribute","kind":"func","status":"implemented","sigHash":"0fbc0542daf70539b2ae1492b38fb4812f971f88886d1a471f14e85a905e57c1"}
 *
 * Go source:
 * func hasTypeJsonImportAttribute(node *ast.Node) bool {
 * 	attributes := node.AsImportDeclaration().Attributes
 * 	return attributes != nil && core.Some(attributes.AsImportAttributes().Attributes.Nodes, func(attr *ast.Node) bool {
 * 		return attr.Name().Text() == "type" && ast.IsStringLiteralLike(attr.AsImportAttribute().Value) && attr.AsImportAttribute().Value.Text() == "json"
 * 	})
 * }
 */
export function hasTypeJsonImportAttribute(node: GoPtr<Node>): bool {
  const attributes = AsImportDeclaration(node)!.Attributes;
  return attributes !== undefined && Some(AsImportAttributes(attributes as unknown as GoPtr<Node>)!.Attributes!.Nodes, (attr: GoPtr<Node>): bool => {
    const ia = AsImportAttribute(attr);
    return Node_Text(Node_Name(attr) as unknown as GoPtr<Node>) === "type" && IsStringLiteralLike(ia!.Value as unknown as GoPtr<Node>) && Node_Text(ia!.Value as unknown as GoPtr<Node>) === "json";
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getVerbatimModuleSyntaxErrorMessage","kind":"func","status":"implemented","sigHash":"18c489850928347a609d8fff5b656adbedc1f954dc45f9b7a2d364005340d8bb"}
 *
 * Go source:
 * func getVerbatimModuleSyntaxErrorMessage(node *ast.Node) *diagnostics.Message {
 * 	sourceFile := ast.GetSourceFileOfNode(node)
 * 	fileName := sourceFile.FileName()
 * 
 * 	// Check if the file is .cts or .cjs (CommonJS-specific extensions)
 * 	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionCts, tspath.ExtensionCjs}) {
 * 		return diagnostics.ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax
 * 	}
 * 	// For .ts, .tsx, .js, etc.
 * 	return diagnostics.ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax_Adjust_the_type_field_in_the_nearest_package_json_to_make_this_file_an_ECMAScript_module_or_adjust_your_verbatimModuleSyntax_module_and_moduleResolution_settings_in_TypeScript
 * }
 */
export function getVerbatimModuleSyntaxErrorMessage(node: GoPtr<Node>): GoPtr<Message> {
  const sourceFile = GetSourceFileOfNode(node);
  const fileName = SourceFile_FileName(sourceFile);
  if (FileExtensionIsOneOf(fileName, GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionCts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionCjs, GoStringValueOps);
  }))) {
    return ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax;
  }
  return ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax_Adjust_the_type_field_in_the_nearest_package_json_to_make_this_file_an_ECMAScript_module_or_adjust_your_verbatimModuleSyntax_module_and_moduleResolution_settings_in_TypeScript;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isNotOverload","kind":"func","status":"implemented","sigHash":"df73efee1afe84bd17535e1ceb6bf40a8305be00e3c862d71771bf9fa9741323"}
 *
 * Go source:
 * func isNotOverload(node *ast.Node) bool {
 * 	return !ast.IsFunctionDeclaration(node) && !ast.IsMethodDeclaration(node) || node.Body() != nil
 * }
 */
export function isNotOverload(node: GoPtr<Node>): bool {
  return (!IsFunctionDeclaration(node) && !IsMethodDeclaration(node)) || Node_Body(node) !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isES2015OrLaterIterable","kind":"func","status":"implemented","sigHash":"2951b2e7d6965811cba6b8fda16898da8e26a2569772f5c666568e224ddfc255"}
 *
 * Go source:
 * func isES2015OrLaterIterable(n string) bool {
 * 	switch n {
 * 	case "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "NodeList", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray":
 * 		return true
 * 	}
 * 	return false
 * }
 */
export function isES2015OrLaterIterable(n: string): bool {
  switch (n) {
    case "Float32Array":
    case "Float64Array":
    case "Int16Array":
    case "Int32Array":
    case "Int8Array":
    case "NodeList":
    case "Uint16Array":
    case "Uint32Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
      return true;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::UnusedKind","kind":"type","status":"implemented","sigHash":"f6ce6678812afbba17f5ac2cf43344eba79608a33e9a4bf262aac4a6652f687e"}
 *
 * Go source:
 * UnusedKind int32
 */
export type UnusedKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::UnusedKindLocal+UnusedKindParameter","kind":"constGroup","status":"implemented","sigHash":"3ddca2357b292eaa265473e83b66b2fad08bf7dbd7c116262b4a70d43fda135a"}
 *
 * Go source:
 * const (
 * 	UnusedKindLocal UnusedKind = iota
 * 	UnusedKindParameter
 * )
 */
export const UnusedKindLocal: UnusedKind = 0;
export const UnusedKindParameter: UnusedKind = 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isIdentifierThatStartsWithUnderscore","kind":"func","status":"implemented","sigHash":"bb619c1a63666b5622bb86126bacb37cae19ba1fddfb254a5e1cef95c427ab2d"}
 *
 * Go source:
 * func isIdentifierThatStartsWithUnderscore(node *ast.Node) bool {
 * 	return ast.IsIdentifier(node) && node.Text() != "" && node.Text()[0] == '_'
 * }
 */
export function isIdentifierThatStartsWithUnderscore(node: GoPtr<Node>): bool {
  const text = Node_Text(node);
  return IsIdentifier(node) && text !== "" && text[0] === "_";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::importClauseFromImported","kind":"func","status":"implemented","sigHash":"2ff621e49521219486943460848fe4725f2604313884687755cc4b09e3171000"}
 *
 * Go source:
 * func importClauseFromImported(node *ast.Node) *ast.Node {
 * 	switch node.Kind {
 * 	case ast.KindImportClause:
 * 		return node
 * 	case ast.KindNamespaceImport:
 * 		return node.Parent
 * 	default:
 * 		return node.Parent.Parent
 * 	}
 * }
 */
export function importClauseFromImported(node: GoPtr<Node>): GoPtr<Node> {
  switch (node!.Kind) {
    case KindImportClause:
      return node;
    case KindNamespaceImport:
      return node!.Parent;
    default:
      return node!.Parent!.Parent;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::hasTypeParameterByName","kind":"func","status":"implemented","sigHash":"52812411c2b2fdf266ef74198c1552214f8dc9abb42631f07789de68ec25ce2f"}
 *
 * Go source:
 * func hasTypeParameterByName(typeParameters []*Type, name string) bool {
 * 	return core.Some(typeParameters, func(tp *Type) bool {
 * 		return tp.symbol.Name == name
 * 	})
 * }
 */
export function hasTypeParameterByName(typeParameters: GoSlice<GoPtr<Type>>, name: string): bool {
  return Some(typeParameters, (tp: GoPtr<Type>): bool => {
    return tp!["symbol"] !== undefined && tp!["symbol"]!.Name === name;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getUniqueTypeParameterName","kind":"func","status":"implemented","sigHash":"05fe41a6c309e3818b71b89ccad6bf38a6ecc43f9eac4cc9e5c7fd6cf2b18c81"}
 *
 * Go source:
 * func getUniqueTypeParameterName(typeParameters []*Type, baseName string) string {
 * 	for len(baseName) > 1 && baseName[len(baseName)-1] >= '0' && baseName[len(baseName)-1] <= '9' {
 * 		baseName = baseName[:len(baseName)-1]
 * 	}
 * 	index := 1
 * 	for {
 * 		augmentedName := baseName + strconv.Itoa(index)
 * 		if !hasTypeParameterByName(typeParameters, augmentedName) {
 * 			return augmentedName
 * 		}
 * 		index++
 * 	}
 * }
 */
export function getUniqueTypeParameterName(typeParameters: GoSlice<GoPtr<Type>>, baseName: string): string {
  while (baseName.length > 1 && baseName[baseName.length - 1]! >= "0" && baseName[baseName.length - 1]! <= "9") {
    baseName = baseName.slice(0, baseName.length - 1);
  }
  let index = 1;
  for (;;) {
    const augmentedName = baseName + strconv.Itoa(index);
    if (!hasTypeParameterByName(typeParameters, augmentedName)) {
      return augmentedName;
    }
    index++;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isSpreadIntoCallOrNew","kind":"func","status":"implemented","sigHash":"007b37e74e35fc3ab77937095bf46e43d64f1ef5fd0d5e85741d3f4a4916b5e3"}
 *
 * Go source:
 * func isSpreadIntoCallOrNew(node *ast.Node) bool {
 * 	parent := ast.WalkUpParenthesizedExpressions(node.Parent)
 * 	return ast.IsSpreadElement(parent) && ast.IsCallOrNewExpression(parent.Parent)
 * }
 */
export function isSpreadIntoCallOrNew(node: GoPtr<Node>): bool {
  const parent = WalkUpParenthesizedExpressions(node!.Parent as unknown as GoPtr<import("../../ast/generated/unions.js").Expression>);
  return IsSpreadElement(parent) && IsCallOrNewExpression(parent!.Parent);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::someSignature","kind":"func","status":"implemented","sigHash":"d1e35f1ab95c2a74b3fb72ffbd11a784b74473ec24b248840876e16d69af1256"}
 *
 * Go source:
 * func someSignature(signatures []*Signature, f func(s *Signature) bool) bool {
 * 	for _, sig := range signatures {
 * 		if sig.composite != nil && sig.composite.isUnion && core.Some(sig.composite.signatures, f) || sig.composite == nil && f(sig) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function someSignature(signatures: GoSlice<GoPtr<Signature>>, f: GoFunc<(s: GoPtr<Signature>) => bool>): bool {
  for (const sig of signatures) {
    if ((sig!.composite !== undefined && sig!.composite!.isUnion && Some(sig!.composite!.signatures, f)) || (sig!.composite === undefined && f!(sig))) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::CallState","kind":"type","status":"implemented","sigHash":"778a5c189b58d065cc696858d54fc6f492062f75a17df4471d859705c963f7ce"}
 *
 * Go source:
 * CallState struct {
 * 	node                           *ast.Node
 * 	typeArguments                  []*ast.Node
 * 	args                           []*ast.Node
 * 	candidates                     []*Signature
 * 	argCheckMode                   CheckMode
 * 	isSingleNonGenericCandidate    bool
 * 	signatureHelpTrailingComma     bool
 * 	candidatesForArgumentError     []*Signature
 * 	candidateForArgumentArityError *Signature
 * 	candidateForTypeArgumentError  *Signature
 * }
 */
export interface CallState {
  node: GoPtr<Node>;
  typeArguments: GoSlice<GoPtr<Node>>;
  args: GoSlice<GoPtr<Node>>;
  candidates: GoSlice<GoPtr<Signature>>;
  argCheckMode: CheckMode;
  isSingleNonGenericCandidate: bool;
  signatureHelpTrailingComma: bool;
  candidatesForArgumentError: GoSlice<GoPtr<Signature>>;
  candidateForArgumentArityError: GoPtr<Signature>;
  candidateForTypeArgumentError: GoPtr<Signature>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::signatureHasLiteralTypes","kind":"func","status":"implemented","sigHash":"6464f908c0fcec8147eb70e5d6598c7d76d3fdff01211c430ebdc90ed9a637ba"}
 *
 * Go source:
 * func signatureHasLiteralTypes(s *Signature) bool {
 * 	return s.flags&SignatureFlagsHasLiteralTypes != 0
 * }
 */
export function signatureHasLiteralTypes(s: GoPtr<Signature>): bool {
  return (s!.flags & SignatureFlagsHasLiteralTypes) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::acceptsVoid","kind":"func","status":"implemented","sigHash":"e811caa39ec18ecc293eda4437a2f0df0507ff694e214424a012c5520a297e36"}
 *
 * Go source:
 * func acceptsVoid(t *Type) bool {
 * 	return t.flags&TypeFlagsVoid != 0
 * }
 */
export function acceptsVoid(t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsVoid) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getErrorNodeForCallNode","kind":"func","status":"implemented","sigHash":"f50c4633809815b2fb6a62c6afd4cab9ddaeec2182996790e474d1b6aec33fcc"}
 *
 * Go source:
 * func getErrorNodeForCallNode(node *ast.Node) *ast.Node {
 * 	if ast.IsCallExpression(node) {
 * 		node = node.Expression()
 * 		if ast.IsPropertyAccessExpression(node) {
 * 			node = node.Name()
 * 		}
 * 	}
 * 	return node
 * }
 */
export function getErrorNodeForCallNode(node: GoPtr<Node>): GoPtr<Node> {
  if (IsCallExpression(node)) {
    node = Node_Expression(node);
    if (IsPropertyAccessExpression(node)) {
      node = Node_Name(node) as unknown as GoPtr<Node>;
    }
  }
  return node;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::hasCommonDomTypeName","kind":"func","status":"implemented","sigHash":"5308acf01f1acbae10878775a715ebec3aa499958298d67db34c6ac86e4ee993"}
 *
 * Go source:
 * func hasCommonDomTypeName(t *Type) bool {
 * 	if t.symbol == nil {
 * 		return false
 * 	}
 * 	name := t.symbol.Name
 * 	return name == "EventTarget" || name == "Node" || name == "Element" || strings.HasPrefix(name, "HTML") && strings.HasSuffix(name, "Element")
 * }
 */
export function hasCommonDomTypeName(t: GoPtr<Type>): bool {
  if (t!["symbol"] === undefined) {
    return false;
  }
  const name = t!["symbol"]!.Name;
  return name === "EventTarget" || name === "Node" || name === "Element" || (gostrings.HasPrefix(name, "HTML") && gostrings.HasSuffix(name, "Element"));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getThisParameterFromNodeContext","kind":"func","status":"implemented","sigHash":"dda173a16f795a931d4db0661824bac84a30773410a12198aec1593e4dc293f6"}
 *
 * Go source:
 * func getThisParameterFromNodeContext(node *ast.Node) *ast.Node {
 * 	thisContainer := ast.GetThisContainer(node, false /*includeArrowFunctions* /, false /*includeClassComputedPropertyName* /)
 * 	if thisContainer != nil && ast.IsFunctionLike(thisContainer) {
 * 		return ast.GetThisParameter(thisContainer)
 * 	}
 * 	return nil
 * }
 */
export function getThisParameterFromNodeContext(node: GoPtr<Node>): GoPtr<Node> {
  const thisContainer = GetThisContainer(node, false, false);
  if (thisContainer !== undefined && IsFunctionLike(thisContainer)) {
    return GetThisParameter(thisContainer);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::PredicateSemantics","kind":"type","status":"implemented","sigHash":"b7d06a607b1a4aba55ffd6057b4a0ed4e74897bf3868f82f846d60df7d41f7eb"}
 *
 * Go source:
 * PredicateSemantics uint32
 */
export type PredicateSemantics = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::PredicateSemanticsNone+PredicateSemanticsAlways+PredicateSemanticsNever+PredicateSemanticsSometimes","kind":"constGroup","status":"implemented","sigHash":"3e665e4937b2a3baeaa453817787df44bbf8616e5f6554fbd3ed231b30394853"}
 *
 * Go source:
 * const (
 * 	PredicateSemanticsNone      PredicateSemantics = 0
 * 	PredicateSemanticsAlways    PredicateSemantics = 1 << 0
 * 	PredicateSemanticsNever     PredicateSemantics = 1 << 1
 * 	PredicateSemanticsSometimes                    = PredicateSemanticsAlways | PredicateSemanticsNever
 * )
 */
export const PredicateSemanticsNone: PredicateSemantics = 0;
export const PredicateSemanticsAlways: PredicateSemantics = 1 << 0;
export const PredicateSemanticsNever: PredicateSemantics = 1 << 1;
export const PredicateSemanticsSometimes: PredicateSemantics = PredicateSemanticsAlways | PredicateSemanticsNever;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::createDiagnosticForNode","kind":"func","status":"implemented","sigHash":"6cf225f51d25f062d9fd1b3c0bb27fe6744e9d928f43e08b3167e655a83fe1b6"}
 *
 * Go source:
 * func createDiagnosticForNode(node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 	return NewDiagnosticForNode(node, message, args...)
 * }
 */
export function createDiagnosticForNode(node: GoPtr<Node>, message: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): GoPtr<Diagnostic> {
  return NewDiagnosticForNode(node, message, ...args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getAdjustedNodeForError","kind":"func","status":"implemented","sigHash":"d4c7754916ec61eeee6a752fa0f39a9df94d0e8b003efce6b832229be746311a"}
 *
 * Go source:
 * func getAdjustedNodeForError(node *ast.Node) *ast.Node {
 * 	name := ast.GetNameOfDeclaration(node)
 * 	if name != nil {
 * 		return name
 * 	}
 * 	return node
 * }
 */
export function getAdjustedNodeForError(node: GoPtr<Node>): GoPtr<Node> {
  const name = GetNameOfDeclaration(node);
  if (name !== undefined) {
    return name;
  }
  return node;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getFirstDeclaration","kind":"func","status":"implemented","sigHash":"f79a7ef05f0a4606a5d7ffb66cbea15be2828a8c75e393c1d2ec5b5836bb53f3"}
 *
 * Go source:
 * func getFirstDeclaration(symbol *ast.Symbol) *ast.Node {
 * 	if len(symbol.Declarations) > 0 {
 * 		return symbol.Declarations[0]
 * 	}
 * 	return nil
 * }
 */
export function getFirstDeclaration(symbol_: GoPtr<Symbol>): GoPtr<Node> {
  if (symbol_!.Declarations.length > 0) {
    return GoSliceLoad(symbol_!.Declarations, 0, GoPointerValueOps<Node>());
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getExcludedSymbolFlags","kind":"func","status":"implemented","sigHash":"9ef6cffd25ef95f7a5bd952966c4b8086349c4f0761cefb8a4ec1d6f08cfa73e"}
 *
 * Go source:
 * func getExcludedSymbolFlags(flags ast.SymbolFlags) ast.SymbolFlags {
 * 	var result ast.SymbolFlags
 * 	if flags&ast.SymbolFlagsBlockScopedVariable != 0 {
 * 		result |= ast.SymbolFlagsBlockScopedVariableExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsFunctionScopedVariable != 0 {
 * 		result |= ast.SymbolFlagsFunctionScopedVariableExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsProperty != 0 {
 * 		result |= ast.SymbolFlagsPropertyExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsEnumMember != 0 {
 * 		result |= ast.SymbolFlagsEnumMemberExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsFunction != 0 {
 * 		result |= ast.SymbolFlagsFunctionExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsClass != 0 {
 * 		result |= ast.SymbolFlagsClassExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsInterface != 0 {
 * 		result |= ast.SymbolFlagsInterfaceExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsRegularEnum != 0 {
 * 		result |= ast.SymbolFlagsRegularEnumExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsConstEnum != 0 {
 * 		result |= ast.SymbolFlagsConstEnumExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsValueModule != 0 {
 * 		result |= ast.SymbolFlagsValueModuleExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsMethod != 0 {
 * 		result |= ast.SymbolFlagsMethodExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsGetAccessor != 0 {
 * 		result |= ast.SymbolFlagsGetAccessorExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsSetAccessor != 0 {
 * 		result |= ast.SymbolFlagsSetAccessorExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsTypeParameter != 0 {
 * 		result |= ast.SymbolFlagsTypeParameterExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsTypeAlias != 0 {
 * 		result |= ast.SymbolFlagsTypeAliasExcludes
 * 	}
 * 	if flags&ast.SymbolFlagsAlias != 0 {
 * 		result |= ast.SymbolFlagsAliasExcludes
 * 	}
 * 	return result
 * }
 */
export function getExcludedSymbolFlags(flags: SymbolFlags): SymbolFlags {
  let result: SymbolFlags = 0;
  if (flags & SymbolFlagsBlockScopedVariable) result |= SymbolFlagsBlockScopedVariableExcludes;
  if (flags & SymbolFlagsFunctionScopedVariable) result |= SymbolFlagsFunctionScopedVariableExcludes;
  if (flags & SymbolFlagsProperty) result |= SymbolFlagsPropertyExcludes;
  if (flags & SymbolFlagsEnumMember) result |= SymbolFlagsEnumMemberExcludes;
  if (flags & SymbolFlagsFunction) result |= SymbolFlagsFunctionExcludes;
  if (flags & SymbolFlagsClass) result |= SymbolFlagsClassExcludes;
  if (flags & SymbolFlagsInterface) result |= SymbolFlagsInterfaceExcludes;
  if (flags & SymbolFlagsRegularEnum) result |= SymbolFlagsRegularEnumExcludes;
  if (flags & SymbolFlagsConstEnum) result |= SymbolFlagsConstEnumExcludes;
  if (flags & SymbolFlagsValueModule) result |= SymbolFlagsValueModuleExcludes;
  if (flags & SymbolFlagsMethod) result |= SymbolFlagsMethodExcludes;
  if (flags & SymbolFlagsGetAccessor) result |= SymbolFlagsGetAccessorExcludes;
  if (flags & SymbolFlagsSetAccessor) result |= SymbolFlagsSetAccessorExcludes;
  if (flags & SymbolFlagsTypeParameter) result |= SymbolFlagsTypeParameterExcludes;
  if (flags & SymbolFlagsTypeAlias) result |= SymbolFlagsTypeAliasExcludes;
  if (flags & SymbolFlagsAlias) result |= SymbolFlagsAliasExcludes;
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getModuleSpecifierFromNode","kind":"func","status":"implemented","sigHash":"85501584eb738fb89ab9705e104f878ed6eabe6f1769ca18d8861575ee6c5de5"}
 *
 * Go source:
 * func getModuleSpecifierFromNode(node *ast.Node) *ast.Node {
 * 	switch node.Kind {
 * 	case ast.KindImportDeclaration, ast.KindJSImportDeclaration:
 * 		return node.ModuleSpecifier()
 * 	case ast.KindExportDeclaration:
 * 		return node.ModuleSpecifier()
 * 	}
 * 	panic("Unhandled case in getModuleSpecifierFromNode")
 * }
 */
export function getModuleSpecifierFromNode(node: GoPtr<Node>): GoPtr<Node> {
  switch (node!.Kind) {
    case KindImportDeclaration:
    case KindJSImportDeclaration:
    case KindExportDeclaration:
      return Node_ModuleSpecifier(node) as unknown as GoPtr<Node>;
  }
  throw new globalThis.Error("Unhandled case in getModuleSpecifierFromNode");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::resolutionExtensionIsTSOrJson","kind":"func","status":"implemented","sigHash":"75c943611d4ab5ad21a037b95b597011420528d617ce8de3e00e5d226a59e67f"}
 *
 * Go source:
 * func resolutionExtensionIsTSOrJson(ext string) bool {
 * 	return tspath.ExtensionIsTs(ext) || ext == tspath.ExtensionJson
 * }
 */
export function resolutionExtensionIsTSOrJson(ext: string): bool {
  return ExtensionIsTs(ext) || ext === ExtensionJson;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isESMFormatImportImportingCommonjsFormatFile","kind":"func","status":"implemented","sigHash":"61476f69e23e2a2dc70b6348ebf1442ca7b04467b5d829b0532f4db13ce6f905"}
 *
 * Go source:
 * func isESMFormatImportImportingCommonjsFormatFile(usageMode core.ResolutionMode, targetMode core.ResolutionMode) bool {
 * 	return usageMode == core.ModuleKindESNext && targetMode == core.ModuleKindCommonJS
 * }
 */
export function isESMFormatImportImportingCommonjsFormatFile(usageMode: ResolutionMode, targetMode: ResolutionMode): bool {
  return usageMode === ModuleKindESNext && targetMode === ModuleKindCommonJS;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::ExportCollision","kind":"type","status":"implemented","sigHash":"f459d1f4c9cee8eb65baffbf28d15732b5a4a94e95a436acc4c97b63165fc29e"}
 *
 * Go source:
 * ExportCollision struct {
 * 	specifierText        string
 * 	exportsWithDuplicate []*ast.Node
 * }
 */
export interface ExportCollision {
  specifierText: string;
  exportsWithDuplicate: GoSlice<GoPtr<Node>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::ExportCollisionTable","kind":"type","status":"implemented","sigHash":"0632ffd588d900a9d1cad2cffe48cf3d633362a9092a5524c0fde602e43bb748"}
 *
 * Go source:
 * ExportCollisionTable = map[string]*ExportCollision
 */
export type ExportCollisionTable = GoMap<string, GoPtr<ExportCollision>>;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::signatureHasRestParameter","kind":"func","status":"implemented","sigHash":"19e994eec21f1d91a8c3391fa2e5c9ca912a9ab7b44fa81d766cfa290a582afb"}
 *
 * Go source:
 * func signatureHasRestParameter(sig *Signature) bool {
 * 	return sig.flags&SignatureFlagsHasRestParameter != 0
 * }
 */
export function signatureHasRestParameter(sig: GoPtr<Signature>): bool {
  return (sig!.flags & SignatureFlagsHasRestParameter) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::hashWrite32","kind":"func","status":"implemented","sigHash":"809c760fc9e2fc52d3f5c00ff613ee0b4d93a31b8b32c42cf1cf1b46f2969a67"}
 *
 * Go source:
 * func hashWrite32[T ~int32 | ~uint32](h *xxh3.Hasher, value T) {
 * 	v := uint32(value)
 * 	_, _ = h.Write([]byte{
 * 		byte(v),
 * 		byte(v >> 8),
 * 		byte(v >> 16),
 * 		byte(v >> 24),
 * 	})
 * }
 */
export function hashWrite32<T extends GoConstraint<"~int32 | ~uint32"> & number>(h: GoPtr<Hasher>, value: T): void {
  const v = value as unknown as number;
  (h as unknown as { Write(b: GoSlice<byte>): void }).Write(GoSliceBuild(4, 4, GoNumberValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, v & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 1, (v >> 8) & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 2, (v >> 16) & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 3, (v >> 24) & 0xff, GoNumberValueOps);
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::hashWrite64","kind":"func","status":"implemented","sigHash":"78cb29d77c889f27a3848cd4c754d34c071620ef4bdce5f178940f29700d7bef"}
 *
 * Go source:
 * func hashWrite64[T ~int | ~uint | ~int64 | ~uint64](h *xxh3.Hasher, value T) {
 * 	v := uint64(value)
 * 	_, _ = h.Write([]byte{
 * 		byte(v),
 * 		byte(v >> 8),
 * 		byte(v >> 16),
 * 		byte(v >> 24),
 * 		byte(v >> 32),
 * 		byte(v >> 40),
 * 		byte(v >> 48),
 * 		byte(v >> 56),
 * 	})
 * }
 */
export function hashWrite64<T extends GoConstraint<"~int | ~uint | ~int64 | ~uint64"> & number>(h: GoPtr<Hasher>, value: T): void {
  const v = value as unknown as number;
  (h as unknown as { Write(b: GoSlice<byte>): void }).Write(GoSliceBuild(8, 8, GoNumberValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, v & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 1, (v >> 8) & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 2, (v >> 16) & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 3, (v >> 24) & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 4, (v >> 32) & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 5, (v >> 40) & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 6, (v >> 48) & 0xff, GoNumberValueOps);
    GoSliceStore(__goSliceLiteral, 7, (v >> 56) & 0xff, GoNumberValueOps);
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::CacheHashKey","kind":"type","status":"implemented","sigHash":"e385b083d516170363a7a305acfafa6b0acc099756463acbd96dfeadf4ffee3d"}
 * @tsgo-override {"category":"runtime-numeric-representation","allow":["signature"],"reason":"The distinct hash-key type stores both unsigned 64-bit limbs as lossless bigint fields while preserving its Go defined-type identity.","goSignatureHash":"6869bf25cacfe9485e5e689c7ed3022567988144b515be41e1a0b52a26d15fd2","tsSignatureHash":"a25dcaaa2ebd4c58de85e9ba3cc37bd2387b7af53d90afbaab894f03e875903b"}
 *
 * Go source:
 * CacheHashKey xxh3.Uint128
 *
 * CacheHashKey is a distinct Go defined type whose underlying fields match
 * Uint128. It does not inherit Uint128's methods. Cache maps that use this key
 * must use GoStructMap/NewGoStructMap so keys compare by value rather than JS
 * object identity.
 */
export type CacheHashKey = GoDefined<{
  Hi: bigint;
  Lo: bigint;
}, "github.com/microsoft/typescript-go/internal/checker::type::CacheHashKey">;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::keyBuilder","kind":"type","status":"implemented","sigHash":"5f8f2fd3c63315426ec051fcedddce54e8f6ef8616a62580ceb6ea75e1736712"}
 *
 * Go source:
 * keyBuilder struct {
 * 	h xxh3.Hasher
 * }
 */
export interface keyBuilder {
  h: Hasher;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getTypeListKey","kind":"func","status":"implemented","sigHash":"ace82340c364953c9d4dc94406edea5c86498799d48cf1d7b61ed6bbc1bf6655"}
 *
 * Go source:
 * func getTypeListKey(types []*Type) CacheHashKey {
 * 	var b keyBuilder
 * 	b.writeTypes(types)
 * 	return b.hash()
 * }
 */
export function getTypeListKey(types: GoSlice<GoPtr<Type>>): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  keyBuilder_writeTypes(b, types);
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getAliasKey","kind":"func","status":"implemented","sigHash":"cd96c7cf3a45508c0eb1567727875cabcbd0047906ae0fff1b1627f3902c5b64"}
 *
 * Go source:
 * func getAliasKey(alias *TypeAlias) CacheHashKey {
 * 	var b keyBuilder
 * 	b.writeAlias(alias)
 * 	return b.hash()
 * }
 */
export function getAliasKey(alias: GoPtr<TypeAlias>): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  keyBuilder_writeAlias(b, alias);
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getUnionKey","kind":"func","status":"implemented","sigHash":"2536306e42506a7e8ba5bbe59ef5998bdcd2cf520ed85ee56fe62c3c8adced4f"}
 *
 * Go source:
 * func getUnionKey(types []*Type, origin *Type, alias *TypeAlias) CacheHashKey {
 * 	var b keyBuilder
 * 	switch {
 * 	case origin == nil:
 * 		b.writeTypes(types)
 * 	case origin.flags&TypeFlagsUnion != 0:
 * 		b.writeByte('|')
 * 		b.writeTypes(origin.Types())
 * 	case origin.flags&TypeFlagsIntersection != 0:
 * 		b.writeByte('&')
 * 		b.writeTypes(origin.Types())
 * 	case origin.flags&TypeFlagsIndex != 0:
 * 		// origin type id alone is insufficient, as `keyof x` may resolve to multiple WIP values while `x` is still resolving
 * 		b.writeByte('#')
 * 		b.writeType(origin)
 * 		b.writeByte('|')
 * 		b.writeTypes(types)
 * 	default:
 * 		panic("Unhandled case in getUnionKey")
 * 	}
 * 	b.writeAlias(alias)
 * 	return b.hash()
 * }
 */
export function getUnionKey(types: GoSlice<GoPtr<Type>>, origin: GoPtr<Type>, alias: GoPtr<TypeAlias>): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  if (origin === undefined) {
    keyBuilder_writeTypes(b, types);
  } else if (origin!.flags & TypeFlagsUnion) {
    keyBuilder_writeByte(b, "|".charCodeAt(0));
    keyBuilder_writeTypes(b, Type_Types(origin));
  } else if (origin!.flags & TypeFlagsIntersection) {
    keyBuilder_writeByte(b, "&".charCodeAt(0));
    keyBuilder_writeTypes(b, Type_Types(origin));
  } else if (origin!.flags & TypeFlagsIndex) {
    keyBuilder_writeByte(b, "#".charCodeAt(0));
    keyBuilder_writeType(b, origin);
    keyBuilder_writeByte(b, "|".charCodeAt(0));
    keyBuilder_writeTypes(b, types);
  } else {
    throw new globalThis.Error("Unhandled case in getUnionKey");
  }
  keyBuilder_writeAlias(b, alias);
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getIntersectionKey","kind":"func","status":"implemented","sigHash":"e27eaa451cc61080b1693a9dd2e3ea4b1855762d9152211f4f4ff4815e6ab4ea"}
 *
 * Go source:
 * func getIntersectionKey(types []*Type, flags IntersectionFlags, alias *TypeAlias) CacheHashKey {
 * 	var b keyBuilder
 * 	b.writeTypes(types)
 * 	if flags&IntersectionFlagsNoConstraintReduction == 0 {
 * 		b.writeAlias(alias)
 * 	} else {
 * 		b.writeByte('*')
 * 	}
 * 	return b.hash()
 * }
 */
export function getIntersectionKey(types: GoSlice<GoPtr<Type>>, flags: IntersectionFlags, alias: GoPtr<TypeAlias>): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  keyBuilder_writeTypes(b, types);
  if ((flags & IntersectionFlagsNoConstraintReduction) === 0) {
    keyBuilder_writeAlias(b, alias);
  } else {
    keyBuilder_writeByte(b, "*".charCodeAt(0));
  }
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getTupleKey","kind":"func","status":"implemented","sigHash":"62144678236a2313bcbddb065685655bd7f19582be5fd188d5e0e617cdd6188d"}
 *
 * Go source:
 * func getTupleKey(elementInfos []TupleElementInfo, readonly bool) CacheHashKey {
 * 	var b keyBuilder
 * 	for _, e := range elementInfos {
 * 		switch {
 * 		case e.flags&ElementFlagsRequired != 0:
 * 			b.writeByte('#')
 * 		case e.flags&ElementFlagsOptional != 0:
 * 			b.writeByte('?')
 * 		case e.flags&ElementFlagsRest != 0:
 * 			b.writeByte('.')
 * 		default:
 * 			b.writeByte('*')
 * 		}
 * 		if e.labeledDeclaration != nil {
 * 			b.writeNode(e.labeledDeclaration)
 * 		}
 * 	}
 * 	if readonly {
 * 		b.writeByte('!')
 * 	}
 * 	return b.hash()
 * }
 */
export function getTupleKey(elementInfos: GoSlice<TupleElementInfo>, readonly: bool): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  for (const e of elementInfos) {
    if (e.flags & ElementFlagsRequired) {
      keyBuilder_writeByte(b, "#".charCodeAt(0));
    } else if (e.flags & ElementFlagsOptional) {
      keyBuilder_writeByte(b, "?".charCodeAt(0));
    } else if (e.flags & ElementFlagsRest) {
      keyBuilder_writeByte(b, ".".charCodeAt(0));
    } else {
      keyBuilder_writeByte(b, "*".charCodeAt(0));
    }
    if (e.labeledDeclaration !== undefined) {
      keyBuilder_writeNode(b, e.labeledDeclaration);
    }
  }
  if (readonly) {
    keyBuilder_writeByte(b, "!".charCodeAt(0));
  }
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getTypeAliasInstantiationKey","kind":"func","status":"implemented","sigHash":"d67319951187617489974390bbd467730dde4c0fc14b281f6f62c179c22a0d47"}
 *
 * Go source:
 * func getTypeAliasInstantiationKey(typeArguments []*Type, alias *TypeAlias) CacheHashKey {
 * 	return getTypeInstantiationKey(typeArguments, alias, false)
 * }
 */
export function getTypeAliasInstantiationKey(typeArguments: GoSlice<GoPtr<Type>>, alias: GoPtr<TypeAlias>): CacheHashKey {
  return getTypeInstantiationKey(typeArguments, alias, false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getTypeInstantiationKey","kind":"func","status":"implemented","sigHash":"987afdbaff0b76dd82d3701a1326dd1b83c2a9db5f759cea06efbcbc5c34536e"}
 *
 * Go source:
 * func getTypeInstantiationKey(typeArguments []*Type, alias *TypeAlias, singleSignature bool) CacheHashKey {
 * 	var b keyBuilder
 * 	b.writeTypes(typeArguments)
 * 	b.writeAlias(alias)
 * 	if singleSignature {
 * 		b.writeByte('!')
 * 	}
 * 	return b.hash()
 * }
 */
export function getTypeInstantiationKey(typeArguments: GoSlice<GoPtr<Type>>, alias: GoPtr<TypeAlias>, singleSignature: bool): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  keyBuilder_writeTypes(b, typeArguments);
  keyBuilder_writeAlias(b, alias);
  if (singleSignature) {
    keyBuilder_writeByte(b, "!".charCodeAt(0));
  }
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getIndexedAccessKey","kind":"func","status":"implemented","sigHash":"d62d2e63ca8fa72f151b694c022b03ecb224d1d65693896461f7f48e0e38a2d9"}
 *
 * Go source:
 * func getIndexedAccessKey(objectType *Type, indexType *Type, accessFlags AccessFlags, alias *TypeAlias) CacheHashKey {
 * 	var b keyBuilder
 * 	b.writeType(objectType)
 * 	b.writeType(indexType)
 * 	hashWrite32(&b.h, accessFlags)
 * 	b.writeAlias(alias)
 * 	return b.hash()
 * }
 */
export function getIndexedAccessKey(objectType: GoPtr<Type>, indexType: GoPtr<Type>, accessFlags: AccessFlags, alias: GoPtr<TypeAlias>): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  keyBuilder_writeType(b, objectType);
  keyBuilder_writeType(b, indexType);
  hashWrite32(b.h, accessFlags);
  keyBuilder_writeAlias(b, alias);
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getTemplateTypeKey","kind":"func","status":"implemented","sigHash":"d3c7e6765e9a294118c2efe19a92eb2db1ac472ac4ad42ce70456bbd067c583d"}
 *
 * Go source:
 * func getTemplateTypeKey(texts []string, types []*Type) CacheHashKey {
 * 	var b keyBuilder
 * 	b.writeTypes(types)
 * 	b.writeByte('|')
 * 	for _, s := range texts {
 * 		b.writeInt(len(s))
 * 	}
 * 	b.writeByte('|')
 * 	for _, s := range texts {
 * 		b.writeString(s)
 * 	}
 * 	return b.hash()
 * }
 */
export function getTemplateTypeKey(texts: GoSlice<string>, types: GoSlice<GoPtr<Type>>): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  keyBuilder_writeTypes(b, types);
  keyBuilder_writeByte(b, "|".charCodeAt(0));
  for (const s of texts) {
    keyBuilder_writeInt(b, s.length);
  }
  keyBuilder_writeByte(b, "|".charCodeAt(0));
  for (const s of texts) {
    keyBuilder_writeString(b, s);
  }
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getConditionalTypeKey","kind":"func","status":"implemented","sigHash":"9b3e2d5b37ddb9e6dbeb9a1213512254dd56df13cbc3d1e3c256c9fc7a1932f8"}
 *
 * Go source:
 * func getConditionalTypeKey(typeArguments []*Type, alias *TypeAlias, forConstraint bool) CacheHashKey {
 * 	var b keyBuilder
 * 	b.writeTypes(typeArguments)
 * 	b.writeAlias(alias)
 * 	if forConstraint {
 * 		b.writeByte('!')
 * 	}
 * 	return b.hash()
 * }
 */
export function getConditionalTypeKey(typeArguments: GoSlice<GoPtr<Type>>, alias: GoPtr<TypeAlias>, forConstraint: bool): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  keyBuilder_writeTypes(b, typeArguments);
  keyBuilder_writeAlias(b, alias);
  if (forConstraint) {
    keyBuilder_writeByte(b, "!".charCodeAt(0));
  }
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getRelationKey","kind":"func","status":"implemented","sigHash":"36c2f12e97b87e880c681bd40302aab0aa5170d953f1deb36ccb848286eb4223"}
 *
 * Go source:
 * func getRelationKey(source *Type, target *Type, intersectionState IntersectionState, isIdentity bool, ignoreConstraints bool) (CacheHashKey, bool) {
 * 	if isIdentity && source.id > target.id {
 * 		source, target = target, source
 * 	}
 * 	var b keyBuilder
 * 	var constrained bool
 * 	if isTypeReferenceWithGenericArguments(source) && isTypeReferenceWithGenericArguments(target) {
 * 		b.writeByte('g')
 * 		constrained = b.writeGenericTypeReferences(source, target, ignoreConstraints)
 * 	} else {
 * 		b.writeByte('s')
 * 		b.writeType(source)
 * 		b.writeType(target)
 * 	}
 * 	hashWrite32(&b.h, intersectionState)
 * 	return b.hash(), constrained
 * }
 */
export function getRelationKey(source: GoPtr<Type>, target: GoPtr<Type>, intersectionState: IntersectionState, isIdentity: bool, ignoreConstraints: bool): [CacheHashKey, bool] {
  if (isIdentity && source!.id > target!.id) {
    const tmp = source;
    source = target;
    target = tmp;
  }
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  let constrained = false;
  if (isTypeReferenceWithGenericArguments(source) && isTypeReferenceWithGenericArguments(target)) {
    keyBuilder_writeByte(b, "g".charCodeAt(0));
    constrained = keyBuilder_writeGenericTypeReferences(b, source, target, ignoreConstraints);
  } else {
    keyBuilder_writeByte(b, "s".charCodeAt(0));
    keyBuilder_writeType(b, source);
    keyBuilder_writeType(b, target);
  }
  hashWrite32(b.h, intersectionState);
  return [keyBuilder_hash(b), constrained];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getNodeListKey","kind":"func","status":"implemented","sigHash":"f389892147d69e22a0294bdc8ca7a3f1f4fd09c9464a877d69dfcf328cf10a55"}
 *
 * Go source:
 * func getNodeListKey(nodes []*ast.Node) CacheHashKey {
 * 	var b keyBuilder
 * 	b.writeInt(len(nodes))
 * 	for _, n := range nodes {
 * 		b.writeNode(n)
 * 	}
 * 	return b.hash()
 * }
 */
export function getNodeListKey(nodes: GoSlice<GoPtr<Node>>): CacheHashKey {
  const b: keyBuilder = { h: xxh3.New() as unknown as Hasher };
  keyBuilder_writeInt(b, nodes !== undefined ? nodes.length : 0);
  for (const n of nodes) {
    keyBuilder_writeNode(b, n);
  }
  return keyBuilder_hash(b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isTypeReferenceWithGenericArguments","kind":"func","status":"implemented","sigHash":"ea7d11e71ebcad08e9390904706dd90907f5025b3ebe88ddc51584514a9e2056"}
 *
 * Go source:
 * func isTypeReferenceWithGenericArguments(t *Type) bool {
 * 	return isNonDeferredTypeReference(t) && core.Some(t.checker.getTypeArguments(t), func(t *Type) bool {
 * 		return t.flags&TypeFlagsTypeParameter != 0 || isTypeReferenceWithGenericArguments(t)
 * 	})
 * }
 */
export function isTypeReferenceWithGenericArguments(t: GoPtr<Type>): bool {
  return isNonDeferredTypeReference(t) && Some(Checker_getTypeArguments(t!.checker, t), (arg: GoPtr<Type>): bool => {
    return (arg!.flags & TypeFlagsTypeParameter) !== 0 || isTypeReferenceWithGenericArguments(arg);
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isNonDeferredTypeReference","kind":"func","status":"implemented","sigHash":"442bc19a096cc4c2ac82f20df86cc1fb0a917eddb889c6839f7f032c589760c4"}
 *
 * Go source:
 * func isNonDeferredTypeReference(t *Type) bool {
 * 	return t.objectFlags&ObjectFlagsReference != 0 && t.AsTypeReference().node == nil
 * }
 */
export function isNonDeferredTypeReference(t: GoPtr<Type>): bool {
  return (t!.objectFlags & ObjectFlagsReference) !== 0 && Type_AsTypeReference(t)!.node === undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isUnconstrainedTypeParameter","kind":"func","status":"implemented","sigHash":"506c7103379438450b8bc821fe47530f60e7d50060743401dc1ebf77de54b701"}
 *
 * Go source:
 * func isUnconstrainedTypeParameter(tp *Type) bool {
 * 	target := tp.Target()
 * 	if target == nil {
 * 		target = tp
 * 	}
 * 	if target.symbol == nil {
 * 		return false
 * 	}
 * 	for _, d := range target.symbol.Declarations {
 * 		if ast.IsTypeParameterDeclaration(d) && (d.AsTypeParameterDeclaration().Constraint != nil || ast.IsMappedTypeNode(d.Parent) || ast.IsInferTypeNode(d.Parent)) {
 * 			return false
 * 		}
 * 	}
 * 	return true
 * }
 */
export function isUnconstrainedTypeParameter(tp: GoPtr<Type>): bool {
  let target = Type_Target(tp);
  if (target === undefined) {
    target = tp;
  }
  if (target!["symbol"] === undefined) {
    return false;
  }
  for (const d of (target!["symbol"]!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()))) {
    if (IsTypeParameterDeclaration(d) && (AsTypeParameterDeclaration(d)!.Constraint !== undefined || IsMappedTypeNode(d!.Parent) || IsInferTypeNode(d!.Parent))) {
      return false;
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::thisAssignmentDeclarationKind","kind":"type","status":"implemented","sigHash":"c1869b6faae26267e6af7cfb5a06247f7a8212bf46601e665798a5573bec294d"}
 *
 * Go source:
 * thisAssignmentDeclarationKind int32
 */
export type thisAssignmentDeclarationKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::thisAssignmentDeclarationNone+thisAssignmentDeclarationTyped+thisAssignmentDeclarationConstructor+thisAssignmentDeclarationMethod","kind":"constGroup","status":"implemented","sigHash":"a777b909a062ee80d91562b29a32b4447a8dc4105a3a977f6c970e2d6aec033b"}
 *
 * Go source:
 * const (
 * 	thisAssignmentDeclarationNone        thisAssignmentDeclarationKind = iota // not (all) this.property assignments
 * 	thisAssignmentDeclarationTyped                                            // typed; use the type annotation
 * 	thisAssignmentDeclarationConstructor                                      // at least one in the constructor; use control flow
 * 	thisAssignmentDeclarationMethod                                           // methods only; look in base first, and if not found, union all declaration types plus undefined
 * )
 */
export const thisAssignmentDeclarationNone: thisAssignmentDeclarationKind = 0; // not (all) this.property assignments
export const thisAssignmentDeclarationTyped: thisAssignmentDeclarationKind = 1; // typed; use the type annotation
export const thisAssignmentDeclarationConstructor: thisAssignmentDeclarationKind = 2; // at least one in the constructor; use control flow
export const thisAssignmentDeclarationMethod: thisAssignmentDeclarationKind = 3; // methods only; look in base first, and if not found, union all declaration types plus undefined

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::findIndexInfo","kind":"func","status":"implemented","sigHash":"c3e78c4e61d79929ed7834364eea7ab2eab39d364216c57eebd6a0780010efd5"}
 *
 * Go source:
 * func findIndexInfo(indexInfos []*IndexInfo, keyType *Type) *IndexInfo {
 * 	for _, info := range indexInfos {
 * 		if info.keyType == keyType {
 * 			return info
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function findIndexInfo(indexInfos: GoSlice<GoPtr<IndexInfo>>, keyType: GoPtr<Type>): GoPtr<IndexInfo> {
  for (const info of indexInfos) {
    if (info!.keyType === keyType) {
      return info;
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getBaseTypeNodeOfClass","kind":"func","status":"implemented","sigHash":"b722ed3f103d9e485606ab2d5f79b66e6d57965b114fa02972fc97c9435a5b6a"}
 *
 * Go source:
 * func getBaseTypeNodeOfClass(t *Type) *ast.Node {
 * 	decl := ast.GetClassLikeDeclarationOfSymbol(t.symbol)
 * 	if decl != nil {
 * 		return ast.GetExtendsHeritageClauseElement(decl)
 * 	}
 * 	return nil
 * }
 */
export function getBaseTypeNodeOfClass(t: GoPtr<Type>): GoPtr<Node> {
  const decl = GetClassLikeDeclarationOfSymbol(t!["symbol"]);
  if (decl !== undefined) {
    return GetExtendsHeritageClauseElement(decl);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getTargetType","kind":"func","status":"implemented","sigHash":"121983b3090a85aa8b0a0e9ad2c9625c8f051a47a10abc176135b0f315bb323e"}
 *
 * Go source:
 * func getTargetType(t *Type) *Type {
 * 	if t.objectFlags&ObjectFlagsReference != 0 {
 * 		return t.Target()
 * 	}
 * 	return t
 * }
 */
export function getTargetType(t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.objectFlags & ObjectFlagsReference) !== 0) {
    return Type_Target(t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isLateBindableAST","kind":"func","status":"implemented","sigHash":"01334c286a29e1bb5dda941dabcfdd02e8d3795869026eb19b5fb491b2c53bd3"}
 *
 * Go source:
 * func isLateBindableAST(node *ast.Node) bool {
 * 	var expr *ast.Node
 * 	switch {
 * 	case ast.IsComputedPropertyName(node):
 * 		expr = node.Expression()
 * 	case ast.IsElementAccessExpression(node):
 * 		expr = node.AsElementAccessExpression().ArgumentExpression
 * 	}
 * 	return expr != nil && ast.IsEntityNameExpression(expr)
 * }
 */
export function isLateBindableAST(node: GoPtr<Node>): bool {
  let expr: GoPtr<Node> = undefined;
  if (IsComputedPropertyName(node)) {
    expr = Node_Expression(node);
  } else if (IsElementAccessExpression(node)) {
    expr = AsElementAccessExpression(node)!.ArgumentExpression as unknown as GoPtr<Node>;
  }
  return expr !== undefined && IsEntityNameExpression(expr);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getEffectiveSetAccessorTypeAnnotationNode","kind":"func","status":"implemented","sigHash":"b765a7ef198195d76b68d99af12d0c278f5de0c083714b20644bb4db3aaed405"}
 *
 * Go source:
 * func getEffectiveSetAccessorTypeAnnotationNode(node *ast.Node) *ast.Node {
 * 	param := GetSetAccessorValueParameter(node)
 * 	if param != nil {
 * 		return param.Type()
 * 	}
 * 	return nil
 * }
 */
export function getEffectiveSetAccessorTypeAnnotationNode(node: GoPtr<Node>): GoPtr<Node> {
  const param = GetSetAccessorValueParameter(node);
  if (param !== undefined) {
    return Node_Type(param);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::mayReturnNever","kind":"func","status":"implemented","sigHash":"d3063087746ed980441d490d56defdc8bfe06795d25b56a6acb585f6d098e016"}
 *
 * Go source:
 * func mayReturnNever(fn *ast.Node) bool {
 * 	switch fn.Kind {
 * 	case ast.KindFunctionExpression, ast.KindArrowFunction:
 * 		return true
 * 	case ast.KindMethodDeclaration:
 * 		return ast.IsObjectLiteralExpression(fn.Parent)
 * 	}
 * 	return false
 * }
 */
export function mayReturnNever(fn: GoPtr<Node>): bool {
  switch (fn!.Kind) {
    case KindFunctionExpression:
    case KindArrowFunction:
      return true;
    case KindMethodDeclaration:
      return IsObjectLiteralExpression(fn!.Parent);
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isThisless","kind":"func","status":"implemented","sigHash":"6cf55c0257ebac1814df2916d25f92c51b7475619323b92922aa787fc49fe987"}
 *
 * Go source:
 * func isThisless(symbol *ast.Symbol) bool {
 * 	if len(symbol.Declarations) == 1 {
 * 		declaration := symbol.Declarations[0]
 * 		if declaration != nil {
 * 			switch declaration.Kind {
 * 			case ast.KindPropertyDeclaration, ast.KindPropertySignature:
 * 				return isThislessVariableLikeDeclaration(declaration)
 * 			case ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor:
 * 				return isThislessFunctionLikeDeclaration(declaration)
 * 			}
 * 		}
 * 	}
 * 	return false
 * }
 */
export function isThisless(symbol_: GoPtr<Symbol>): bool {
  if (symbol_!.Declarations.length === 1) {
    const declaration = GoSliceLoad(symbol_!.Declarations, 0, GoPointerValueOps<Node>());
    if (declaration !== undefined) {
      switch (declaration!.Kind) {
        case KindPropertyDeclaration:
        case KindPropertySignature:
          return isThislessVariableLikeDeclaration(declaration);
        case KindMethodDeclaration:
        case KindMethodSignature:
        case KindConstructor:
        case KindGetAccessor:
        case KindSetAccessor:
          return isThislessFunctionLikeDeclaration(declaration);
      }
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isThislessVariableLikeDeclaration","kind":"func","status":"implemented","sigHash":"e5d8736348ef9db2b3d4d4cea4102c1df9eadc118841b5d75523390405b996ab"}
 *
 * Go source:
 * func isThislessVariableLikeDeclaration(node *ast.Node) bool {
 * 	typeNode := node.Type()
 * 	if typeNode != nil {
 * 		return isThislessType(typeNode)
 * 	}
 * 	return node.Initializer() == nil
 * }
 */
export function isThislessVariableLikeDeclaration(node: GoPtr<Node>): bool {
  const typeNode = Node_Type(node);
  if (typeNode !== undefined) {
    return isThislessType(typeNode);
  }
  return Node_Initializer(node) === undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isThislessType","kind":"func","status":"implemented","sigHash":"9744a285a9ab9e8aed6c19f9199331058386e930c2581d939536842c669af4f0"}
 *
 * Go source:
 * func isThislessType(node *ast.Node) bool {
 * 	switch node.Kind {
 * 	case ast.KindAnyKeyword, ast.KindUnknownKeyword, ast.KindStringKeyword, ast.KindNumberKeyword, ast.KindBigIntKeyword, ast.KindBooleanKeyword,
 * 		ast.KindSymbolKeyword, ast.KindObjectKeyword, ast.KindVoidKeyword, ast.KindUndefinedKeyword, ast.KindNeverKeyword, ast.KindLiteralType:
 * 		return true
 * 	case ast.KindArrayType:
 * 		return isThislessType(node.AsArrayTypeNode().ElementType)
 * 	case ast.KindTypeReference:
 * 		return core.Every(node.TypeArguments(), isThislessType)
 * 	}
 * 	return false
 * }
 */
export function isThislessType(node: GoPtr<Node>): bool {
  switch (node!.Kind) {
    case KindAnyKeyword:
    case KindUnknownKeyword:
    case KindStringKeyword:
    case KindNumberKeyword:
    case KindBigIntKeyword:
    case KindBooleanKeyword:
    case KindSymbolKeyword:
    case KindObjectKeyword:
    case KindVoidKeyword:
    case KindUndefinedKeyword:
    case KindNeverKeyword:
    case KindLiteralType:
      return true;
    case KindArrayType:
      return isThislessType(AsArrayTypeNode(node)!.ElementType as unknown as GoPtr<Node>);
    case KindTypeReference:
      return Every(Node_TypeArguments(node) as unknown as GoSlice<GoPtr<Node>>, isThislessType);
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isThislessFunctionLikeDeclaration","kind":"func","status":"implemented","sigHash":"5665f57553554fcc0bedec42b01d32e8ee49e6e1f235ec1459dbb1b691729e4a"}
 *
 * Go source:
 * func isThislessFunctionLikeDeclaration(node *ast.Node) bool {
 * 	returnType := node.Type()
 * 	return (ast.IsConstructorDeclaration(node) || returnType != nil && isThislessType(returnType)) &&
 * 		core.Every(node.Parameters(), isThislessVariableLikeDeclaration) &&
 * 		core.Every(node.TypeParameters(), isThislessTypeParameter)
 * }
 */
export function isThislessFunctionLikeDeclaration(node: GoPtr<Node>): bool {
  const returnType = Node_Type(node);
  return (IsConstructorDeclaration(node) || (returnType !== undefined && isThislessType(returnType))) &&
    Every(Node_Parameters(node) as unknown as GoSlice<GoPtr<Node>>, isThislessVariableLikeDeclaration) &&
    Every(Node_TypeParameters(node) as unknown as GoSlice<GoPtr<Node>>, isThislessTypeParameter);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isThislessTypeParameter","kind":"func","status":"implemented","sigHash":"9be3d98be541f1c8dd758c64f5b644d02301dd2bd32ca0f11d80f5bbe71c471b"}
 *
 * Go source:
 * func isThislessTypeParameter(node *ast.Node) bool {
 * 	constraint := node.AsTypeParameterDeclaration().Constraint
 * 	return constraint == nil || isThislessType(constraint)
 * }
 */
export function isThislessTypeParameter(node: GoPtr<Node>): bool {
  const constraint = AsTypeParameterDeclaration(node)!.Constraint;
  return constraint === undefined || isThislessType(constraint as unknown as GoPtr<Node>);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isPrototypeProperty","kind":"func","status":"implemented","sigHash":"812137c5ee378e4072456f4b39c0d994bd4f9ed3717d32f5be95fe0c279d546d"}
 *
 * Go source:
 * func isPrototypeProperty(symbol *ast.Symbol) bool {
 * 	return symbol.Flags&ast.SymbolFlagsMethod != 0 || symbol.CheckFlags&ast.CheckFlagsSyntheticMethod != 0
 * }
 */
export function isPrototypeProperty(symbol_: GoPtr<Symbol>): bool {
  return (symbol_!.Flags & SymbolFlagsMethod) !== 0 || (symbol_!.CheckFlags & CheckFlagsSyntheticMethod) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isConflictingPrivateProperty","kind":"func","status":"implemented","sigHash":"d923c6023024e4804a47df3212611a06e7f3c2856109df9a14d8a646c7c854f4"}
 *
 * Go source:
 * func isConflictingPrivateProperty(prop *ast.Symbol) bool {
 * 	// Return true for a synthetic property with multiple declarations, at least one of which is private.
 * 	return prop.ValueDeclaration == nil && prop.CheckFlags&ast.CheckFlagsContainsPrivate != 0
 * }
 */
export function isConflictingPrivateProperty(prop: GoPtr<Symbol>): bool {
  return prop!.ValueDeclaration === undefined && (prop!.CheckFlags & CheckFlagsContainsPrivate) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getModifiedReadonlyState","kind":"func","status":"implemented","sigHash":"a7e07894c9be1f29a05a4f34d09a89cde1b615db87683f9ceb76c85b2ebab0a3"}
 *
 * Go source:
 * func getModifiedReadonlyState(state bool, modifiers MappedTypeModifiers) bool {
 * 	switch {
 * 	case modifiers&MappedTypeModifiersIncludeReadonly != 0:
 * 		return true
 * 	case modifiers&MappedTypeModifiersExcludeReadonly != 0:
 * 		return false
 * 	}
 * 	return state
 * }
 */
export function getModifiedReadonlyState(state: bool, modifiers: MappedTypeModifiers): bool {
  if (modifiers & MappedTypeModifiersIncludeReadonly) {
    return true;
  }
  if (modifiers & MappedTypeModifiersExcludeReadonly) {
    return false;
  }
  return state;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::instantiateList","kind":"func","status":"implemented","sigHash":"798e854f616764de539ed579444d2f17223799cceca6e9a93fc3240c96f9352f"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Go comparable equality over an erased instantiated-list element type is supplied as one exact static operation.","runtimeDictionaries":[{"kind":"equality","parameter":"equal","typeParameter":"T"}]}
 *
 * Go source:
 * func instantiateList[T comparable](c *Checker, values []T, m *TypeMapper, instantiator func(c *Checker, value T, m *TypeMapper) T) []T {
 * 	for i, value := range values {
 * 		mapped := instantiator(c, value, m)
 * 		if mapped != value {
 * 			result := make([]T, len(values))
 * 			copy(result, values[:i])
 * 			result[i] = mapped
 * 			for j := i + 1; j < len(values); j++ {
 * 				result[j] = instantiator(c, values[j], m)
 * 			}
 * 			return result
 * 		}
 * 	}
 * 	return values
 * }
 */
export function instantiateList<T extends GoComparable>(c: GoPtr<Checker>, values: GoSlice<T>, m: GoPtr<TypeMapper>, instantiator: GoFunc<(c: GoPtr<Checker>, value: T, m: GoPtr<TypeMapper>) => T>, equal: GoEquality<T>): GoSlice<T> {
  for (let i = 0; i < (values !== undefined ? values.length : 0); i++) {
    const value = values![i]!;
    const mapped = instantiator!(c, value, m);
    if (!equal(mapped, value)) {
      const result: T[] = new Array(values!.length) as T[];
      for (let k = 0; k < i; k++) result[k] = values![k]!;
      result[i] = mapped;
      for (let j = i + 1; j < values!.length; j++) {
        result[j] = instantiator!(c, values![j]!, m);
      }
      return result;
    }
  }
  return values;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getSymbolPath","kind":"func","status":"implemented","sigHash":"26ca0a5ad8eb7cdd9b4bf69394ce248af9f77098b454b1073c54af56cef1ff36"}
 *
 * Go source:
 * func getSymbolPath(symbol *ast.Symbol) string {
 * 	if symbol.Parent != nil {
 * 		return getSymbolPath(symbol.Parent) + "." + symbol.Name
 * 	}
 * 	return symbol.Name
 * }
 */
export function getSymbolPath(symbol_: GoPtr<Symbol>): string {
  if (symbol_!.Parent !== undefined) {
    return getSymbolPath(symbol_!.Parent) + "." + symbol_!.Name;
  }
  return symbol_!.Name;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::TupleNormalizer","kind":"type","status":"implemented","sigHash":"ea6bf7c1aaa7b07bd137d069ebb0c181b1468e2210d0ecbc1129745f51f7073a"}
 *
 * Go source:
 * TupleNormalizer struct {
 * 	c                       *Checker
 * 	types                   []*Type
 * 	infos                   []TupleElementInfo
 * 	lastRequiredIndex       int
 * 	firstRestIndex          int
 * 	lastOptionalOrRestIndex int
 * }
 */
export interface TupleNormalizer {
  c: GoPtr<Checker>;
  types: GoSlice<GoPtr<Type>>;
  infos: GoSlice<TupleElementInfo>;
  lastRequiredIndex: int;
  firstRestIndex: int;
  lastOptionalOrRestIndex: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getStartElementCount","kind":"func","status":"implemented","sigHash":"3616041afdd8e77af59dac2b566602d30b4973a59249588d7774abc017a43c46"}
 *
 * Go source:
 * func getStartElementCount(t *TupleType, flags ElementFlags) int {
 * 	for i, info := range t.elementInfos {
 * 		if info.flags&flags == 0 {
 * 			return i
 * 		}
 * 	}
 * 	return len(t.elementInfos)
 * }
 */
export function getStartElementCount(t: GoPtr<TupleType>, flags: ElementFlags): int {
  const infos = t!.elementInfos;
  for (let i = 0; i < (infos !== undefined ? infos.length : 0); i++) {
    if ((infos![i]!.flags & flags) === 0) {
      return i;
    }
  }
  return infos !== undefined ? infos.length : 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getEndElementCount","kind":"func","status":"implemented","sigHash":"29471bcaf38a3cdec7447369d18025f5f0273d1a20b43c6c8b1e9d09b73ace83"}
 *
 * Go source:
 * func getEndElementCount(t *TupleType, flags ElementFlags) int {
 * 	for i := len(t.elementInfos); i > 0; i-- {
 * 		if t.elementInfos[i-1].flags&flags == 0 {
 * 			return len(t.elementInfos) - i
 * 		}
 * 	}
 * 	return len(t.elementInfos)
 * }
 */
export function getEndElementCount(t: GoPtr<TupleType>, flags: ElementFlags): int {
  const infos = t!.elementInfos;
  const len = infos !== undefined ? infos.length : 0;
  for (let i = len; i > 0; i--) {
    if ((infos![i - 1]!.flags & flags) === 0) {
      return len - i;
    }
  }
  return len;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getTotalFixedElementCount","kind":"func","status":"implemented","sigHash":"ee19bec1fc42ebbe4f329ef351f8359f32149926ebbfa980360c5d5a203075a4"}
 *
 * Go source:
 * func getTotalFixedElementCount(t *TupleType) int {
 * 	return t.fixedLength + getEndElementCount(t, ElementFlagsFixed)
 * }
 */
export function getTotalFixedElementCount(t: GoPtr<TupleType>): int {
  return t!.fixedLength + getEndElementCount(t, ElementFlagsFixed);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isTupleType","kind":"func","status":"implemented","sigHash":"6405fa1756b06cb132958e96c2c043bd79f3cc002d3b195ebdaad6d2155c6867"}
 *
 * Go source:
 * func isTupleType(t *Type) bool {
 * 	return t.objectFlags&ObjectFlagsReference != 0 && t.Target().objectFlags&ObjectFlagsTuple != 0
 * }
 */
export function isTupleType(t: GoPtr<Type>): bool {
  return (t!.objectFlags & ObjectFlagsReference) !== 0 && (Type_Target(t)!.objectFlags & ObjectFlagsTuple) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isMutableTupleType","kind":"func","status":"implemented","sigHash":"ddccb9cfebc136ab472b9e9bd11a03ae953111321f75a8c9033043c5c85274af"}
 *
 * Go source:
 * func isMutableTupleType(t *Type) bool {
 * 	return isTupleType(t) && !t.TargetTupleType().readonly
 * }
 */
export function isMutableTupleType(t: GoPtr<Type>): bool {
  return isTupleType(t) && !Type_TargetTupleType(t)!.readonly;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isGenericTupleType","kind":"func","status":"implemented","sigHash":"a6ced7c017b12df1a672526cdd3af947d507c6a12f7da3ef2d0e82f9afb0c730"}
 *
 * Go source:
 * func isGenericTupleType(t *Type) bool {
 * 	return isTupleType(t) && t.TargetTupleType().combinedFlags&ElementFlagsVariadic != 0
 * }
 */
export function isGenericTupleType(t: GoPtr<Type>): bool {
  return isTupleType(t) && (Type_TargetTupleType(t)!.combinedFlags & ElementFlagsVariadic) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isSingleElementGenericTupleType","kind":"func","status":"implemented","sigHash":"b0d2e630ac656d8450e1b69950ebfa2e7b263972129993d43c49ef6fedd0c72e"}
 *
 * Go source:
 * func isSingleElementGenericTupleType(t *Type) bool {
 * 	return isGenericTupleType(t) && len(t.TargetTupleType().elementInfos) == 1
 * }
 */
export function isSingleElementGenericTupleType(t: GoPtr<Type>): bool {
  if (!isGenericTupleType(t)) {
    return false;
  }
  return Type_TargetTupleType(t)!.elementInfos.length === 1;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isLocalTypeAlias","kind":"func","status":"implemented","sigHash":"720c62262de5b0c642164e3306e8326d2c49bf0069bd2f0e1c79ec780cc10eea"}
 *
 * Go source:
 * func isLocalTypeAlias(symbol *ast.Symbol) bool {
 * 	declaration := core.Find(symbol.Declarations, isTypeAlias)
 * 	return declaration != nil && ast.GetContainingFunction(declaration) != nil
 * }
 */
export function isLocalTypeAlias(symbol_: GoPtr<Symbol>): bool {
  const declaration = Find(symbol_!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), isTypeAlias, GoZeroPointer<Node>);
  return declaration !== undefined && GetContainingFunction(declaration) !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getTypeReferenceName","kind":"func","status":"implemented","sigHash":"7e8a6ebe81dd03568b5cae60e7d1b081baa5e738a5b2a4886fd158d998058e9f"}
 *
 * Go source:
 * func getTypeReferenceName(node *ast.Node) *ast.Node {
 * 	switch node.Kind {
 * 	case ast.KindTypeReference:
 * 		return node.AsTypeReferenceNode().TypeName
 * 	case ast.KindExpressionWithTypeArguments:
 * 		// We only support expressions that are simple qualified names. For other
 * 		// expressions this produces nil
 * 		expr := node.Expression()
 * 		if ast.IsEntityNameExpression(expr) {
 * 			return expr
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function getTypeReferenceName(node: GoPtr<Node>): GoPtr<Node> {
  switch (node!.Kind) {
    case KindTypeReference:
      return AsTypeReferenceNode(node)!.TypeName as unknown as GoPtr<Node>;
    case KindExpressionWithTypeArguments: {
      const expr = Node_Expression(node);
      if (IsEntityNameExpression(expr)) {
        return expr;
      }
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isUnaryTupleTypeNode","kind":"func","status":"implemented","sigHash":"699c52277e37594f7ca855249dcb0ff6419b66893973eeffd1f57a3b1671b515"}
 *
 * Go source:
 * func isUnaryTupleTypeNode(node *ast.Node) bool {
 * 	return ast.IsTupleTypeNode(node) && len(node.Elements()) == 1
 * }
 */
export function isUnaryTupleTypeNode(node: GoPtr<Node>): bool {
  if (!IsTupleTypeNode(node)) {
    return false;
  }
  return Node_Elements(node)!.length === 1;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isFreshLiteralType","kind":"func","status":"implemented","sigHash":"0bdbb1b0fbd389a50ffa85ee702566ede5136350ab5143efa479ee2ed08703b2"}
 *
 * Go source:
 * func isFreshLiteralType(t *Type) bool {
 * 	return t.flags&TypeFlagsFreshable != 0 && t.AsLiteralType().freshType == t
 * }
 */
export function isFreshLiteralType(t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsFreshable) !== 0 && Type_AsLiteralType(t)!.freshType === t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getStringLiteralValue","kind":"func","status":"implemented","sigHash":"79cac8ba573e51d135514fe585fc0746d3c777a8e4ef7f550f5b4c94aeaf7aac"}
 *
 * Go source:
 * func getStringLiteralValue(t *Type) string {
 * 	return t.AsLiteralType().value.(string)
 * }
 */
export function getStringLiteralValue(t: GoPtr<Type>): string {
  return Type_AsLiteralType(t)!.value as unknown as string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getNumberLiteralValue","kind":"func","status":"implemented","sigHash":"0182028087c8e398b6fdefcd503b844ef9f71be3284f9e6ed2b640903da55b32"}
 *
 * Go source:
 * func getNumberLiteralValue(t *Type) jsnum.Number {
 * 	return t.AsLiteralType().value.(jsnum.Number)
 * }
 */
export function getNumberLiteralValue(t: GoPtr<Type>): Number {
  return Type_AsLiteralType(t)!.value as unknown as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getBigIntLiteralValue","kind":"func","status":"implemented","sigHash":"0f90c7fa451e60b37c871e0ff5838e48d8aadf5e3e8c5f66248d208884ee9b07"}
 *
 * Go source:
 * func getBigIntLiteralValue(t *Type) jsnum.PseudoBigInt {
 * 	return t.AsLiteralType().value.(jsnum.PseudoBigInt)
 * }
 */
export function getBigIntLiteralValue(t: GoPtr<Type>): PseudoBigInt {
  return Type_AsLiteralType(t)!.value as unknown as PseudoBigInt;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getBooleanLiteralValue","kind":"func","status":"implemented","sigHash":"8f151c5d364cb2358f96e9446bf5e70947058ef5b8da29ab53aa40242f7f07c5"}
 *
 * Go source:
 * func getBooleanLiteralValue(t *Type) bool {
 * 	return t.AsLiteralType().value.(bool)
 * }
 */
export function getBooleanLiteralValue(t: GoPtr<Type>): bool {
  return Type_AsLiteralType(t)!.value as unknown as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isLiteralType","kind":"func","status":"implemented","sigHash":"b40f1a2ef210d7b5701828bfde100cc4ce9d6846b79c6814130efc136ee00db0"}
 *
 * Go source:
 * func isLiteralType(t *Type) bool {
 * 	if t.flags&TypeFlagsBoolean != 0 {
 * 		return true
 * 	}
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		if t.flags&TypeFlagsEnumLiteral != 0 {
 * 			return true
 * 		}
 * 		return core.Every(t.Types(), isUnitType)
 * 	}
 * 	return isUnitType(t)
 * }
 */
export function isLiteralType(t: GoPtr<Type>): bool {
  if (t!.flags & TypeFlagsBoolean) {
    return true;
  }
  if (t!.flags & TypeFlagsUnion) {
    if (t!.flags & TypeFlagsEnumLiteral) {
      return true;
    }
    return Every(Type_Types(t), isUnitType);
  }
  return isUnitType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isNeitherUnitTypeNorNever","kind":"func","status":"implemented","sigHash":"39cfa85715d0b8e93ecb66e6d9919a01892001e0d6e97465804f61c298eb76ac"}
 *
 * Go source:
 * func isNeitherUnitTypeNorNever(t *Type) bool {
 * 	return t.flags&(TypeFlagsUnit|TypeFlagsNever) == 0
 * }
 */
export function isNeitherUnitTypeNorNever(t: GoPtr<Type>): bool {
  return (t!.flags & (TypeFlagsUnit | TypeFlagsNever)) === 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isUnitType","kind":"func","status":"implemented","sigHash":"ae9b50e7715e108037e8a69c65dcf149c0c519b694696ba0e6b77e29e0a51b7f"}
 *
 * Go source:
 * func isUnitType(t *Type) bool {
 * 	return t.flags&TypeFlagsUnit != 0
 * }
 */
export function isUnitType(t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsUnit) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::UnionReduction","kind":"type","status":"implemented","sigHash":"48b93c7203d1dca8c76a3bfb7692b01fa1f39f2a200ec136502a4504b5a8b9b8"}
 *
 * Go source:
 * UnionReduction int32
 */
export type UnionReduction = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::UnionReductionNone+UnionReductionLiteral+UnionReductionSubtype","kind":"constGroup","status":"implemented","sigHash":"12c9aedb269c57ca9fc4f339b1546c78a764f8ea2cc7c1e0796cd9fd677b1aca"}
 *
 * Go source:
 * const (
 * 	UnionReductionNone UnionReduction = iota
 * 	UnionReductionLiteral
 * 	UnionReductionSubtype
 * )
 */
export const UnionReductionNone: UnionReduction = 0;
export const UnionReductionLiteral: UnionReduction = 1;
export const UnionReductionSubtype: UnionReduction = 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::IntersectionFlags","kind":"type","status":"implemented","sigHash":"3fdf050b6e050d2125e57ee9d6f429986a188676c4a92ac52a99f5338b0620d2"}
 *
 * Go source:
 * IntersectionFlags uint32
 */
export type IntersectionFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::constGroup::IntersectionFlagsNone+IntersectionFlagsNoSupertypeReduction+IntersectionFlagsNoConstraintReduction","kind":"constGroup","status":"implemented","sigHash":"3c671b847fdceed667ca675bbcf7ead2dbd250b8f75f71cd85eaba403c4540b9"}
 *
 * Go source:
 * const (
 * 	IntersectionFlagsNone                  IntersectionFlags = 0
 * 	IntersectionFlagsNoSupertypeReduction  IntersectionFlags = 1 << 0
 * 	IntersectionFlagsNoConstraintReduction IntersectionFlags = 1 << 1
 * )
 */
export const IntersectionFlagsNone: IntersectionFlags = 0;
export const IntersectionFlagsNoSupertypeReduction: IntersectionFlags = 1 << 0;
export const IntersectionFlagsNoConstraintReduction: IntersectionFlags = 1 << 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isUnionWithUndefined","kind":"func","status":"implemented","sigHash":"56bcaa2debdf531e2eb9e5ce5d9b1d3f9163126e65144575c485b4119fefd6e2"}
 *
 * Go source:
 * func isUnionWithUndefined(t *Type) bool {
 * 	return t.flags&TypeFlagsUnion != 0 && t.Types()[0].flags&TypeFlagsUndefined != 0
 * }
 */
export function isUnionWithUndefined(t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsUnion) !== 0 && (GoSliceLoad(Type_Types(t)!, 0, GoPointerValueOps<Type>())!.flags & TypeFlagsUndefined) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isUnionWithNull","kind":"func","status":"implemented","sigHash":"dc2fd618d4c41733634d278c97b4b49e44ae2d3ea4c083c554299a7fe1fd8d6d"}
 *
 * Go source:
 * func isUnionWithNull(t *Type) bool {
 * 	return t.flags&TypeFlagsUnion != 0 && (t.Types()[0].flags&TypeFlagsNull != 0 || t.Types()[1].flags&TypeFlagsNull != 0)
 * }
 */
export function isUnionWithNull(t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsUnion) !== 0 && ((GoSliceLoad(Type_Types(t)!, 0, GoPointerValueOps<Type>())!.flags & TypeFlagsNull) !== 0 || (GoSliceLoad(Type_Types(t)!, 1, GoPointerValueOps<Type>())!.flags & TypeFlagsNull) !== 0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isIntersectionType","kind":"func","status":"implemented","sigHash":"92cab30e3c08ab63775c3b5d015b5e08e3ca973b95b4a05e0e2e55cc0a1c9f69"}
 *
 * Go source:
 * func isIntersectionType(t *Type) bool {
 * 	return t.flags&TypeFlagsIntersection != 0
 * }
 */
export function isIntersectionType(t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsIntersection) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isPrimitiveUnion","kind":"func","status":"implemented","sigHash":"50a9b217095648ac65cbb17466cd13fcc572baf81be35dff54d802a6c9cbaca6"}
 *
 * Go source:
 * func isPrimitiveUnion(t *Type) bool {
 * 	return t.objectFlags&ObjectFlagsPrimitiveUnion != 0
 * }
 */
export function isPrimitiveUnion(t: GoPtr<Type>): bool {
  return (t!.objectFlags & ObjectFlagsPrimitiveUnion) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isNotUndefinedType","kind":"func","status":"implemented","sigHash":"b815defd37f8dd7db0d1c3b06de38a4f6422076332955add8ed6eea9589aaec3"}
 *
 * Go source:
 * func isNotUndefinedType(t *Type) bool {
 * 	return t.flags&TypeFlagsUndefined == 0
 * }
 */
export function isNotUndefinedType(t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsUndefined) === 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isNotNullType","kind":"func","status":"implemented","sigHash":"936c254a5dd84908a7f56e2e2a2d74e143da01996cdd4076e014c9b9f25bd3bc"}
 *
 * Go source:
 * func isNotNullType(t *Type) bool {
 * 	return t.flags&TypeFlagsNull == 0
 * }
 */
export function isNotNullType(t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsNull) === 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getConstituentCount","kind":"func","status":"implemented","sigHash":"f12fbb7004d4afbf0cef39294d3cc90fc6529d7e48efd043525e8a4829339085"}
 *
 * Go source:
 * func getConstituentCount(t *Type) int {
 * 	switch {
 * 	case t.flags&TypeFlagsUnionOrIntersection == 0 || t.alias != nil:
 * 		return 1
 * 	case t.flags&TypeFlagsUnion != 0 && t.AsUnionType().origin != nil:
 * 		return getConstituentCount(t.AsUnionType().origin)
 * 	}
 * 	return getConstituentCountOfTypes(t.Types())
 * }
 */
export function getConstituentCount(t: GoPtr<Type>): int {
  if ((t!.flags & TypeFlagsUnionOrIntersection) === 0 || t!.alias !== undefined) {
    return 1;
  }
  if ((t!.flags & TypeFlagsUnion) !== 0 && Type_AsUnionType(t)!.origin !== undefined) {
    return getConstituentCount(Type_AsUnionType(t)!.origin!);
  }
  return getConstituentCountOfTypes(Type_Types(t));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getConstituentCountOfTypes","kind":"func","status":"implemented","sigHash":"7b878aa0a8e94f0bb558d0472a4cbf0b62cc4e1618aa6a4fc3b2dc743b814f39"}
 *
 * Go source:
 * func getConstituentCountOfTypes(types []*Type) int {
 * 	n := 0
 * 	for _, t := range types {
 * 		n += getConstituentCount(t)
 * 	}
 * 	return n
 * }
 */
export function getConstituentCountOfTypes(types: GoSlice<GoPtr<Type>>): int {
  let n = 0;
  for (const t of types) {
    n += getConstituentCount(t);
  }
  return n;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::forEachType","kind":"func","status":"implemented","sigHash":"da8ee53965d035316d96375c5eb1d7fac838e4b6f805a8d18da6baa99f49b1f1"}
 *
 * Go source:
 * func forEachType(t *Type, f func(t *Type)) {
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		for _, u := range t.Types() {
 * 			f(u)
 * 		}
 * 	} else {
 * 		f(t)
 * 	}
 * }
 */
export function forEachType(t: GoPtr<Type>, f: GoFunc<(t: GoPtr<Type>) => void>): void {
  if (t!.flags & TypeFlagsUnion) {
    for (const u of Type_Types(t)) {
      f!(u);
    }
  } else {
    f!(t);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::someType","kind":"func","status":"implemented","sigHash":"96d7463db1b77bc3299546142022f82907cfface3cb7ffb926acaf24a1d7ce4f"}
 *
 * Go source:
 * func someType(t *Type, f func(*Type) bool) bool {
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		return core.Some(t.Types(), f)
 * 	}
 * 	return f(t)
 * }
 */
export function someType(t: GoPtr<Type>, f: GoFunc<(arg0: GoPtr<Type>) => bool>): bool {
  if (t!.flags & TypeFlagsUnion) {
    return Some(Type_Types(t), f);
  }
  return f!(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::everyType","kind":"func","status":"implemented","sigHash":"89d46ddfa189608cdcaf9cbd0f68ebaadc6d2e05c220878125484171e1c18019"}
 *
 * Go source:
 * func everyType(t *Type, f func(*Type) bool) bool {
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		return core.Every(t.Types(), f)
 * 	}
 * 	return f(t)
 * }
 */
export function everyType(t: GoPtr<Type>, f: GoFunc<(arg0: GoPtr<Type>) => bool>): bool {
  if (t!.flags & TypeFlagsUnion) {
    return Every(Type_Types(t), f);
  }
  return f!(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::everyContainedType","kind":"func","status":"implemented","sigHash":"c463fd23ffb7b92f9d2e13d6dd1c5efd632ec87635ae79b4c0c07ade5bf4d145"}
 *
 * Go source:
 * func everyContainedType(t *Type, f func(*Type) bool) bool {
 * 	if t.flags&TypeFlagsUnionOrIntersection != 0 {
 * 		return core.Every(t.Types(), f)
 * 	}
 * 	return f(t)
 * }
 */
export function everyContainedType(t: GoPtr<Type>, f: GoFunc<(arg0: GoPtr<Type>) => bool>): bool {
  if (t!.flags & TypeFlagsUnionOrIntersection) {
    return Every(Type_Types(t), f);
  }
  return f!(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::containsType","kind":"func","status":"implemented","sigHash":"f8bed3346186f7d4ca51051eec9e95314c80312a73573020ea2058e15ab7aa02"}
 *
 * Go source:
 * func containsType(types []*Type, t *Type) bool {
 * 	_, ok := slices.BinarySearchFunc(types, t, CompareTypes)
 * 	return ok
 * }
 */
export function containsType(types: GoSlice<GoPtr<Type>>, t: GoPtr<Type>): bool {
  const [, ok] = BinarySearchFunc(types, t, CompareTypes);
  return ok;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::insertType","kind":"func","status":"implemented","sigHash":"76863e39bd06d9e9c809fd40600f0d8a7842b684ab49568b65802f6a03c40d2c"}
 *
 * Go source:
 * func insertType(types []*Type, t *Type) ([]*Type, bool) {
 * 	if i, ok := slices.BinarySearchFunc(types, t, CompareTypes); !ok {
 * 		return slices.Insert(types, i, t), true
 * 	}
 * 	return types, false
 * }
 */
export function insertType(types: GoSlice<GoPtr<Type>>, t: GoPtr<Type>): [GoSlice<GoPtr<Type>>, bool] {
  const [i, ok] = BinarySearchFunc(types, t, CompareTypes);
  if (!ok) {
    return [Insert(types, i, t), true];
  }
  return [types, false];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::countTypes","kind":"func","status":"implemented","sigHash":"471c280013d0619daa8c45258205cf5ca16c39ed1fbfb760343caa1955939b8b"}
 *
 * Go source:
 * func countTypes(t *Type) int {
 * 	switch {
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return len(t.Types())
 * 	case t.flags&TypeFlagsNever != 0:
 * 		return 0
 * 	}
 * 	return 1
 * }
 */
export function countTypes(t: GoPtr<Type>): int {
  if (t!.flags & TypeFlagsUnion) {
    return (Type_Types(t) !== undefined ? Type_Types(t)!.length : 0);
  }
  if (t!.flags & TypeFlagsNever) {
    return 0;
  }
  return 1;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::compareTypeIds","kind":"func","status":"implemented","sigHash":"27c8aa0972ba043a7e64421df0b07616a4466089645a09108379960158c882e1"}
 *
 * Go source:
 * func compareTypeIds(t1, t2 *Type) int {
 * 	return int(t1.id) - int(t2.id)
 * }
 */
export function compareTypeIds(t1: GoPtr<Type>, t2: GoPtr<Type>): int {
  return t1!.id - t2!.id;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getIndexNodeForAccessExpression","kind":"func","status":"implemented","sigHash":"0c14ad91962a3d0ba021b818035d588958f6744e2f1f8d134764c7b38c796c61"}
 *
 * Go source:
 * func getIndexNodeForAccessExpression(accessNode *ast.Node) *ast.Node {
 * 	switch accessNode.Kind {
 * 	case ast.KindElementAccessExpression:
 * 		return accessNode.AsElementAccessExpression().ArgumentExpression
 * 	case ast.KindIndexedAccessType:
 * 		return accessNode.AsIndexedAccessTypeNode().IndexType
 * 	case ast.KindComputedPropertyName:
 * 		return accessNode.Expression()
 * 	}
 * 	return accessNode
 * }
 */
export function getIndexNodeForAccessExpression(accessNode: GoPtr<Node>): GoPtr<Node> {
  switch (accessNode!.Kind) {
    case KindElementAccessExpression:
      return AsElementAccessExpression(accessNode)!.ArgumentExpression as unknown as GoPtr<Node>;
    case KindIndexedAccessType:
      return AsIndexedAccessTypeNode(accessNode)!.IndexType as unknown as GoPtr<Node>;
    case KindComputedPropertyName:
      return Node_Expression(accessNode);
  }
  return accessNode;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::indexTypeLessThan","kind":"func","status":"implemented","sigHash":"95269e6c174abb0cb7765311e3b0c18a15df6623a5171c53aeb58525fc348d75"}
 *
 * Go source:
 * func indexTypeLessThan(indexType *Type, limit int) bool {
 * 	return everyType(indexType, func(t *Type) bool {
 * 		if t.flags&TypeFlagsStringOrNumberLiteral != 0 {
 * 			propName := getPropertyNameFromType(t)
 * 			if isNumericLiteralName(propName) {
 * 				index := jsnum.FromString(propName)
 * 				return index >= 0 && index < jsnum.Number(limit)
 * 			}
 * 		}
 * 		return false
 * 	})
 * }
 */
export function indexTypeLessThan(indexType: GoPtr<Type>, limit: int): bool {
  return everyType(indexType, (t: GoPtr<Type>): bool => {
    if (t!.flags & TypeFlagsStringOrNumberLiteral) {
      const propName = getPropertyNameFromType(t);
      if (isNumericLiteralName(propName)) {
        const index = FromString(propName);
        return index >= 0 && index < (limit as unknown as Number);
      }
    }
    return false;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isConstEnumObjectType","kind":"func","status":"implemented","sigHash":"9a9d416900c3be9733158249943ea4cedd45e0d59d34d13fb55476560c9e3cbb"}
 *
 * Go source:
 * func isConstEnumObjectType(t *Type) bool {
 * 	return t.objectFlags&ObjectFlagsAnonymous != 0 && t.symbol != nil && isConstEnumSymbol(t.symbol)
 * }
 */
export function isConstEnumObjectType(t: GoPtr<Type>): bool {
  return (t!.objectFlags & ObjectFlagsAnonymous) !== 0 && t!["symbol"] !== undefined && isConstEnumSymbol(t!["symbol"]);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isConstEnumSymbol","kind":"func","status":"implemented","sigHash":"7e0cff38861bdd4846a44db947bf3bfab8ad51b4b26c13ebf226a5de8c71eb06"}
 *
 * Go source:
 * func isConstEnumSymbol(symbol *ast.Symbol) bool {
 * 	return symbol.Flags&ast.SymbolFlagsConstEnum != 0
 * }
 */
export function isConstEnumSymbol(symbol_: GoPtr<Symbol>): bool {
  return (symbol_!.Flags & SymbolFlagsConstEnum) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::compareTypesEqual","kind":"func","status":"implemented","sigHash":"f7f9d234a22d92015a5f2b6ec17c6bb6b4286b38f8be03d9343d64b96bad6103"}
 *
 * Go source:
 * func compareTypesEqual(s *Type, t *Type) Ternary {
 * 	if s == t {
 * 		return TernaryTrue
 * 	}
 * 	return TernaryFalse
 * }
 */
export function compareTypesEqual(s: GoPtr<Type>, t: GoPtr<Type>): Ternary {
  if (s === t) {
    return TernaryTrue;
  }
  return TernaryFalse;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::hasRestParameter","kind":"func","status":"implemented","sigHash":"c6a304f5b9989e65db68ecbd64a8d881305b33b5b0de439ca4c63f00b92c68a4"}
 *
 * Go source:
 * func hasRestParameter(signature *ast.Node) bool {
 * 	last := core.LastOrNil(signature.Parameters())
 * 	return last != nil && isRestParameter(last)
 * }
 */
export function hasRestParameter(signature: GoPtr<Node>): bool {
  const last = LastOrNil(Node_Parameters(signature) as unknown as GoSlice<GoPtr<Node>>, GoZeroPointer<Node>);
  return last !== undefined && isRestParameter(last);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isRestParameter","kind":"func","status":"implemented","sigHash":"43168f31815fd30ad9ee88e4e503a31bc12a2e9ca03d6eaf92914112aac08216"}
 *
 * Go source:
 * func isRestParameter(param *ast.Node) bool {
 * 	return param.AsParameterDeclaration().DotDotDotToken != nil
 * }
 */
export function isRestParameter(param: GoPtr<Node>): bool {
  return AsParameterDeclaration(param)!.DotDotDotToken !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getNameFromIndexInfo","kind":"func","status":"implemented","sigHash":"542ed94aec2becf3a48c3fb484bf653aea47b7b9009eddf9cc0813c2b74f66ad"}
 *
 * Go source:
 * func getNameFromIndexInfo(info *IndexInfo) string {
 * 	if info.declaration != nil {
 * 		return scanner.DeclarationNameToString(info.declaration.Parameters()[0].Name())
 * 	}
 * 	return "x"
 * }
 */
export function getNameFromIndexInfo(info: GoPtr<IndexInfo>): string {
  if (info!.declaration !== undefined) {
    const params = Node_Parameters(info!.declaration) as unknown as GoSlice<GoPtr<Node>>;
    const param0 = params !== undefined ? GoSliceLoad(params, 0, GoPointerValueOps<Node>()) : undefined;
    return DeclarationNameToString(Node_Name(param0) as unknown as GoPtr<Node>);
  }
  return "x";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isExportOrExportExpression","kind":"func","status":"implemented","sigHash":"740e04d27c8c90923ee5af1f4b247c2af997835dd76ffc9eb0cbda8ff369ef4c"}
 *
 * Go source:
 * func isExportOrExportExpression(location *ast.Node) bool {
 * 	return ast.FindAncestor(location, func(n *ast.Node) bool {
 * 		parent := n.Parent
 * 		if parent != nil {
 * 			if ast.IsAnyExportAssignment(parent) {
 * 				return parent.Expression() == n && ast.IsEntityNameExpression(n)
 * 			}
 * 			if ast.IsExportSpecifier(parent) {
 * 				return parent.AsExportSpecifier().Name() == n || parent.PropertyName() == n
 * 			}
 * 		}
 * 		return false
 * 	}) != nil
 * }
 */
export function isExportOrExportExpression(location: GoPtr<Node>): bool {
  return FindAncestor(location, (n: GoPtr<Node>): bool => {
    const parent = n!.Parent;
    if (parent !== undefined) {
      if (IsAnyExportAssignment(parent)) {
        return Node_Expression(parent) === n && IsEntityNameExpression(n);
      }
      if (IsExportSpecifier(parent)) {
        return AsExportSpecifier(parent)!.name as unknown === n || Node_PropertyName(parent) === n;
      }
    }
    return false;
  }) !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::shouldMarkIdentifierAliasReferenced","kind":"func","status":"implemented","sigHash":"0074f2545f89c1d2357fc1f9dccdd83c9cb656114f65be6d2f4a25ab25f8ff7a"}
 *
 * Go source:
 * func shouldMarkIdentifierAliasReferenced(node *ast.IdentifierNode) bool {
 * 	parent := node.Parent
 * 	if parent != nil {
 * 		// A property access expression LHS? checkPropertyAccessExpression will handle that.
 * 		if ast.IsPropertyAccessExpression(parent) && parent.Expression() == node {
 * 			return false
 * 		}
 * 		// Next two check for an identifier inside a type only export.
 * 		if ast.IsExportSpecifier(parent) && parent.IsTypeOnly() {
 * 			return false
 * 		}
 * 		if parent.Parent != nil {
 * 			greatGrandparent := parent.Parent.Parent
 * 			if greatGrandparent != nil && ast.IsExportDeclaration(greatGrandparent) && greatGrandparent.IsTypeOnly() {
 * 				return false
 * 			}
 * 		}
 * 	}
 * 	return true
 * }
 */
export function shouldMarkIdentifierAliasReferenced(node: GoPtr<IdentifierNode>): bool {
  const parent = (node as unknown as GoPtr<Node>)!.Parent;
  if (parent !== undefined) {
    if (IsPropertyAccessExpression(parent) && Node_Expression(parent) === (node as unknown as GoPtr<Node>)) {
      return false;
    }
    if (IsExportSpecifier(parent) && Node_IsTypeOnly(parent)) {
      return false;
    }
    if (parent!.Parent !== undefined) {
      const greatGrandparent = parent!.Parent!.Parent;
      if (greatGrandparent !== undefined && IsExportDeclaration(greatGrandparent) && Node_IsTypeOnly(greatGrandparent)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isInternalModuleImportEqualsDeclaration","kind":"func","status":"implemented","sigHash":"27f7527bfc58f1a35d3f67d2772ccd39f1e417e489330661104f56e2fd1749ba"}
 *
 * Go source:
 * func isInternalModuleImportEqualsDeclaration(node *ast.Node) bool {
 * 	return node.Kind == ast.KindImportEqualsDeclaration &&
 * 		node.AsImportEqualsDeclaration().ModuleReference.Kind != ast.KindExternalModuleReference
 * }
 */
export function isInternalModuleImportEqualsDeclaration(node: GoPtr<Node>): bool {
  return node!.Kind === KindImportEqualsDeclaration &&
    AsImportEqualsDeclaration(node)!.ModuleReference!.Kind !== KindExternalModuleReference;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getEntityNameFromTypeNode","kind":"func","status":"implemented","sigHash":"6093e91067d2404515ce3af120dac63ec9292009fcd21dccf9e4fd5feca091d3"}
 *
 * Go source:
 * func getEntityNameFromTypeNode(node *ast.TypeNode) *ast.Node {
 * 	switch node.Kind {
 * 	case ast.KindTypeReference:
 * 		return node.AsTypeReferenceNode().TypeName
 *
 * 	case ast.KindExpressionWithTypeArguments:
 * 		if ast.IsEntityNameExpression(node.Expression()) {
 * 			return node.Expression()
 * 		}
 * 		return nil
 *
 * 	// These aren't valid TypeNodes, but we treat them as such because of `isPartOfTypeNode`, which returns `true` for things that aren't `TypeNode`s.
 * 	case ast.KindIdentifier, ast.KindQualifiedName:
 * 		return node
 * 	}
 *
 * 	return nil
 * }
 */
export function getEntityNameFromTypeNode(node: GoPtr<TypeNode>): GoPtr<Node> {
  const n = node as unknown as GoPtr<Node>;
  switch (n!.Kind) {
    case KindTypeReference:
      return AsTypeReferenceNode(n)!.TypeName as unknown as GoPtr<Node>;
    case KindExpressionWithTypeArguments: {
      const expr = AsExpressionWithTypeArguments(n)!.Expression as unknown as GoPtr<Node>;
      if (IsEntityNameExpression(expr)) {
        return expr;
      }
      return undefined;
    }
    case KindIdentifier:
    case KindQualifiedName:
      return n;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getMappedTypeModifiers","kind":"func","status":"implemented","sigHash":"9a6895699355d1508030e30c88a84cd3aeeb75ed315164db39a0c3eaf38645e6"}
 *
 * Go source:
 * func getMappedTypeModifiers(t *Type) MappedTypeModifiers {
 * 	declaration := t.AsMappedType().declaration
 * 	var modifiers MappedTypeModifiers
 * 	if declaration.ReadonlyToken != nil {
 * 		modifiers |= core.IfElse(declaration.ReadonlyToken.Kind == ast.KindMinusToken, MappedTypeModifiersExcludeReadonly, MappedTypeModifiersIncludeReadonly)
 * 	}
 * 	if declaration.QuestionToken != nil {
 * 		modifiers |= core.IfElse(declaration.QuestionToken.Kind == ast.KindMinusToken, MappedTypeModifiersExcludeOptional, MappedTypeModifiersIncludeOptional)
 * 	}
 * 	return modifiers
 * }
 */
export function getMappedTypeModifiers(t: GoPtr<Type>): MappedTypeModifiers {
  const declaration = AsMappedTypeNode(Type_AsMappedType(t)!.declaration);
  let modifiers: MappedTypeModifiers = 0;
  if (declaration!.ReadonlyToken !== undefined) {
    modifiers |= IfElse(declaration!.ReadonlyToken!.Kind === KindMinusToken, MappedTypeModifiersExcludeReadonly, MappedTypeModifiersIncludeReadonly);
  }
  if (declaration!.QuestionToken !== undefined) {
    modifiers |= IfElse(declaration!.QuestionToken!.Kind === KindMinusToken, MappedTypeModifiersExcludeOptional, MappedTypeModifiersIncludeOptional);
  }
  return modifiers;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::getMappedTypeOptionality","kind":"func","status":"implemented","sigHash":"95fa69860e25763254b6f17829402a8f478936956f19e211bb939597fb9aa2a0"}
 *
 * Go source:
 * func getMappedTypeOptionality(t *Type) int {
 * 	modifiers := getMappedTypeModifiers(t)
 * 	switch {
 * 	case modifiers&MappedTypeModifiersExcludeOptional != 0:
 * 		return -1
 * 	case modifiers&MappedTypeModifiersIncludeOptional != 0:
 * 		return 1
 * 	}
 * 	return 0
 * }
 */
export function getMappedTypeOptionality(t: GoPtr<Type>): int {
  const modifiers = getMappedTypeModifiers(t);
  if (modifiers & MappedTypeModifiersExcludeOptional) {
    return -1;
  }
  if (modifiers & MappedTypeModifiersIncludeOptional) {
    return 1;
  }
  return 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isPartialMappedType","kind":"func","status":"implemented","sigHash":"fa305a4c96a14f4f7f04f78394bdffff565a42ee22af25a3fb718f6bd5aa0647"}
 *
 * Go source:
 * func isPartialMappedType(t *Type) bool {
 * 	return t.objectFlags&ObjectFlagsMapped != 0 && getMappedTypeModifiers(t)&MappedTypeModifiersIncludeOptional != 0
 * }
 */
export function isPartialMappedType(t: GoPtr<Type>): bool {
  return (t!.objectFlags & ObjectFlagsMapped) !== 0 && (getMappedTypeModifiers(t) & MappedTypeModifiersIncludeOptional) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::applyStringMapping","kind":"func","status":"implemented","sigHash":"3cdb7ab8a9de13cc034160409eab9cde78b322e72207156b01d5cca7c5e604ca"}
 *
 * Go source:
 * func applyStringMapping(symbol *ast.Symbol, str string) string {
 * 	switch intrinsicTypeKinds[symbol.Name] {
 * 	case IntrinsicTypeKindUppercase:
 * 		return stringutil.ToUpperJS(str)
 * 	case IntrinsicTypeKindLowercase:
 * 		return stringutil.ToLowerJS(str)
 * 	case IntrinsicTypeKindCapitalize:
 * 		_, size := stringutil.DecodeJSStringRune(str)
 * 		return stringutil.ToUpperJS(str[:size]) + str[size:]
 * 	case IntrinsicTypeKindUncapitalize:
 * 		_, size := stringutil.DecodeJSStringRune(str)
 * 		return stringutil.ToLowerJS(str[:size]) + str[size:]
 * 	}
 * 	return str
 * }
 */
export function applyStringMapping(symbol_: GoPtr<Symbol>, str: string): string {
  switch (intrinsicTypeKinds.get(symbol_!.Name)) {
    case IntrinsicTypeKindUppercase:
      return ToUpperJS(str);
    case IntrinsicTypeKindLowercase:
      return ToLowerJS(str);
    case IntrinsicTypeKindCapitalize: {
      // Go: _, size := stringutil.DecodeJSStringRune(str); str[:size] is the first
      // rune's bytes. In UTF-16 the first code point is the spread iterator's first
      // element (a lone surrogate or astral pair), and firstChar.length is its
      // code-unit width, so str.slice(firstChar.length) is the byte-faithful rest.
      const firstChar = [...str][0] ?? "";
      const rest = str.slice(firstChar.length);
      return ToUpperJS(firstChar) + rest;
    }
    case IntrinsicTypeKindUncapitalize: {
      const firstChar = [...str][0] ?? "";
      const rest = str.slice(firstChar.length);
      return ToLowerJS(firstChar) + rest;
    }
  }
  return str;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isSpreadArgument","kind":"func","status":"implemented","sigHash":"bb707aeaa6894057069dd1ef17a45b959ab2e257f5452e0ee84552896da0dec8"}
 *
 * Go source:
 * func isSpreadArgument(arg *ast.Node) bool {
 * 	return ast.IsSpreadElement(arg) || ast.IsSyntheticExpression(arg) && arg.AsSyntheticExpression().IsSpread
 * }
 */
export function isSpreadArgument(arg: GoPtr<Node>): bool {
  return IsSpreadElement(arg) || (IsSyntheticExpression(arg) && AsSyntheticExpression(arg)!.IsSpread);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::type::ObjectLiteralDiscriminator","kind":"type","status":"implemented","sigHash":"5c0d939bbcf0bcb0057f6d4f17c889903951edbc68500e0b034c9998ecd283e4"}
 *
 * Go source:
 * ObjectLiteralDiscriminator struct {
 * 	c       *Checker
 * 	props   []*ast.Node
 * 	members []*ast.Symbol
 * }
 */
export interface ObjectLiteralDiscriminator {
  c: GoPtr<Checker>;
  props: GoSlice<GoPtr<Node>>;
  members: GoSlice<GoPtr<Symbol>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::func::isZeroBigInt","kind":"func","status":"implemented","sigHash":"7c8bd42e734fbd60021fb5264b9cb874ae501d0e2f0b3a7a7cc3145583920575"}
 *
 * Go source:
 * func isZeroBigInt(t *Type) bool {
 * 	return getBigIntLiteralValue(t) == jsnum.PseudoBigInt{}
 * }
 */
export function isZeroBigInt(t: GoPtr<Type>): bool {
  const v = getBigIntLiteralValue(t);
  return !v.Negative && v.Base10Value === "";
}
