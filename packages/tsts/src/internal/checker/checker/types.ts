import type { bool, byte, int } from "../../../go/scalars.js";
import type { Seq } from "../../../go/iter.js";
import type { GoMap, GoPtr, GoSlice } from "../../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend, GoSliceAppendSlice, GoStringValueOps } from "../../../go/compat.js";
import { GoAppend, GoAppendSlice, GoEqualStrict, GoMapIsNil, GoNilMap, GoNilSlice, GoSliceIsNil, GoValueRef, GoZeroPointer } from "../../../go/compat.js";
import { GoSlicePrefix } from "../../../go/slice-runtime.js";
import { GoBigIntKey, GoPointerKey, GoStringKey, GoStructField, GoStructKey, NewGoStructMap } from "../../../go/compat.js";
import { recordExtensionContextualTargetTypeFact } from "../../../extensions/checker-integration.js";
import * as core from "../../core/core.js";
import * as slices from "../../../go/slices.js";
import { MaxInt } from "../../../go/math.js";
import * as maps from "../../../go/maps.js";
import * as strconv from "../../../go/strconv.js";
import type { Node } from "../../ast/spine.js";
import { Node_End, Node_ForEachChild, Node_Name, Node_Pos, NodeList_Pos, Node_FunctionLikeData } from "../../ast/spine.js";
import { Node_Type, Node_Expression, Node_Initializer, Node_Symbol, Node_Elements, Node_QuestionToken, Node_Members, Node_Properties, Node_Text, Node_TypeArgumentList, Node_TypeArguments, Node_TypeParameters, Node_Parameters, Node_TagName, SourceFile_Text, SourceFile_Path, Node_Body, Node_PropertyNameOrName, AsSourceFile } from "../../ast/ast.js";
import type { EntityName, Expression, TypeNode } from "../../ast/generated/unions.js";
import { IsParenthesizedExpression, IsElementAccessExpression, IsParameterDeclaration, IsInterfaceDeclaration, IsClassDeclaration, IsTypeAliasDeclaration, IsJSTypeAliasDeclaration, IsTypeLiteralNode, IsTupleTypeNode, IsOptionalTypeNode, IsRestTypeNode, IsNamedTupleMember, IsTypeOperatorNode, IsComputedPropertyName, IsPropertySignatureDeclaration, IsPropertyAssignment, IsShorthandPropertyAssignment, IsSpreadAssignment, IsJsxAttribute, IsJSDocNonNullableType, IsJSDocNullableType, IsIdentifier, IsObjectBindingPattern, IsArrayBindingPattern, IsObjectLiteralExpression, IsArrayLiteralExpression, IsPropertyAccessExpression, IsJsxOpeningElement, IsJsxSelfClosingElement, IsJsxAttributes, IsTypeReferenceNode, IsBinaryExpression, IsAwaitExpression, IsCallExpression, IsNewExpression, IsQualifiedName, IsTypeQueryNode, IsExportSpecifier, IsMethodSignatureDeclaration, IsBlock, IsBindingElement, IsOmittedExpression, IsSourceFile, IsExpressionWithTypeArguments, IsJSDocAugmentsTag, IsMetaProperty, IsImportAttributes } from "../../ast/generated/predicates.js";
import { IsCallSignatureDeclaration, IsFunctionTypeNode, IsMethodDeclaration, IsSpreadElement } from "../../ast/generated/predicates.js";
import {
  KindGetAccessor, KindSetAccessor, KindParameter, KindPropertyDeclaration, KindPropertySignature, KindSourceFile, KindModuleDeclaration,
  KindParenthesizedType, KindTupleType, KindRestType, KindNamedTupleMember, KindArrayType,
  KindOptionalType, KindReadonlyKeyword, KindTypeAliasDeclaration, KindJSTypeAliasDeclaration,
  KindDotToken, KindTypeReference, KindKeyOfKeyword, KindUniqueKeyword, KindSymbolKeyword,
  KindArrowFunction, KindAwaitExpression, KindCallExpression, KindTaggedTemplateExpression, KindDecorator, KindElementAccessExpression,
  KindMetaProperty, KindNewExpression, KindPropertyAccessExpression, KindYieldExpression, KindReturnStatement,
  KindBinaryExpression, KindEnumDeclaration, KindBarBarToken, KindBarBarEqualsToken, KindAmpersandAmpersandToken,
  KindAmpersandAmpersandEqualsToken, KindCommaToken, KindEqualsToken, KindQuestionQuestionToken,
  KindQuestionQuestionEqualsToken, KindConditionalExpression, KindSuperKeyword, KindTypeAssertionExpression,
  KindAsExpression, KindPropertyAssignment, KindShorthandPropertyAssignment, KindSpreadAssignment,
  KindArrayLiteralExpression, KindTemplateSpan, KindParenthesizedExpression, KindNonNullExpression, KindFunctionDeclaration,
  KindSatisfiesExpression, KindExportAssignment, KindJsxExpression, KindJsxAttribute, KindJsxSpreadAttribute,
  KindJsxOpeningElement, KindJsxSelfClosingElement, KindImportAttribute, KindVariableDeclaration, KindBindingElement,
  KindMethodDeclaration, KindMethodSignature,
} from "../../ast/generated/kinds.js";
import { AsElementAccessExpression, AsArrayTypeNode, AsTaggedTemplateExpression, AsTypeOperatorNode, AsConditionalExpression, AsYieldExpression, AsRegularExpressionLiteral, AsNamedTupleMember, AsConditionalTypeNode, AsTemplateLiteralTypeNode, AsUnionTypeNode, AsIntersectionTypeNode, AsTemplateLiteralTypeSpan, AsMappedTypeNode, AsLiteralTypeNode, AsTypeReferenceNode, AsTypeParameterDeclaration, AsBinaryExpression, AsTemplateExpression, AsTemplateSpan, AsTypeQueryNode, AsJSDocVariadicType, AsTypePredicateNode, AsObjectLiteralExpression, AsIdentifier, AsMetaProperty } from "../../ast/generated/casts.js";
import type { Diagnostic, DiagnosticsCollection } from "../../ast/diagnostic.js";
import { DiagnosticsCollection_Add, Diagnostic_AddRelatedInfo } from "../../ast/diagnostic.js";
import type { Symbol, SymbolTable } from "../../ast/symbol.js";
import { InternalSymbolNameMissing } from "../../ast/symbol.js";
import type { SymbolFlags, NodeFlags } from "../../ast/generated/flags.js";
import { SymbolFlagsOptional, NodeFlagsOptionalChain, NodeFlagsAmbient, NodeFlagsConstant, NodeFlagsInWithStatement, NodeFlagsJSDoc, SymbolFlagsEnumMember, SymbolFlagsTypeLiteral, SymbolFlagsInterface, SymbolFlagsTypeAlias, SymbolFlagsFunction, SymbolFlagsMethod, SymbolFlagsObjectLiteral, SymbolFlagsAlias, NodeFlagsHasExplicitReturn, SymbolFlagsProperty, SymbolFlagsType, NodeFlagsReparsed, SymbolFlagsGetAccessor, SymbolFlagsSetAccessor } from "../../ast/generated/flags.js";
import type { ResolutionMode } from "../../core/compileroptions.js";
import { CompilerOptions_ShouldPreserveConstEnums, ScriptTargetES2015 } from "../../core/compileroptions.js";
import { TSUnknown, TSTrue } from "../../core/tristate.js";
import type { Message } from "../../diagnostics/diagnostics.js";
import * as diagnosticsMessages from "../../diagnostics/generated/messages.js";
import type { Number } from "../../jsnum/jsnum.js";
import { Number_IsNaN } from "../../jsnum/jsnum.js";
import { CombineSurrogatePairs } from "../../stringutil/util.js";
import type { PseudoBigInt } from "../../jsnum/pseudobigint.js";
import { ParseValidBigInt } from "../../jsnum/pseudobigint.js";
import { AnyToString } from "../../evaluator/evaluator.js";
import type { ResolvedModule } from "../../module/types.js";
import { IsExternalModuleNameRelative } from "../../tspath/path.js";
import type { TypeMapper } from "../mapper.js";
import { TypeMapper_Map, appendTypeMapping, Checker_combineTypeMappers, newSimpleTypeMapper, prependTypeMapping } from "../mapper.js";
import { Checker_createNormalizedTupleTypeEx, Checker_createTypeReferenceEx, Checker_addDiagnostic } from "../checker.js";
import type { AccessFlags, ConditionalRoot, ContextFlags, ElementFlags, IndexFlags, IndexInfo, NodeLinks, ObjectFlags, Signature, StructuredType, TupleElementInfo, Type, TypeAlias, TypeBase, TypeComparer, TypeData, TypeFlags, TypeId, TypeNodeLinks, ConstrainedType, ObjectType, TypeReference, InterfaceType, UnionOrIntersectionType, IntrinsicType, LiteralType, UniqueESSymbolType, UnionType, IntersectionType, TypeParameter, IndexType, IndexedAccessType, TemplateLiteralType, StringMappingType, SubstitutionType, MappedType, ReverseMappedType, EvolvingArrayType, InstantiationExpressionType, TupleType, ConditionalType, ExportTypeLinks, DeclaredTypeLinks } from "../types.js";
import { AccessFlagsAllowMissing, AccessFlagsExpressionPosition, AccessFlagsNone, ElementFlagsNone, ElementFlagsNonRequired, ElementFlagsFixed, ElementFlagsVariadic, ElementFlagsRest, ElementFlagsRequired, ElementFlagsOptional as ElementFlagsOptionalFlag, ElementFlagsVariable, ObjectFlagsReference, ObjectFlagsObjectLiteral, ObjectFlagsObjectLiteralPatternWithComputedProperties, Type_Target, Type_TargetTupleType, TypeFlagsAny, TypeFlagsVoid, TypeFlagsNull, TypeFlagsUndefined, TypeFlagsNever, TypeFlagsUnion, TypeFlagsIntersection, TypeFlagsObject, TypeFlagsTypeParameter, TypeFlagsStringLiteral, TypeFlagsTemplateLiteral, TypeFlagsInstantiableNonPrimitive, TypeFlagsStringLike, TypeFlagsNonPrimitive, TypeFlagsIndex, TypeFlagsBooleanLike, TypeFlagsEnumLike, TypeFlagsUnionOrIntersection, Type_Types, SignatureKindCall, Type_AsInterfaceType, InterfaceType_TypeParameters, InterfaceType_LocalTypeParameters, InterfaceType_OuterTypeParameters, Type_Mapper, Type_AsIndexType, TypeFlagsBigIntLike, TypeFlagsAnyOrUnknown, TypeFlagsNumberLike, NodeCheckFlagsTypeChecked, NodeCheckFlagsContextChecked, NodeCheckFlagsInitializerIsUndefined, NodeCheckFlagsInitializerIsUndefinedComputed, TypeFlagsTypeVariable, TypeFlagsInstantiable, TypeFlagsStructuredOrInstantiable, TypeFlagsESSymbolLike, TypeFlagsEnumLiteral, ObjectFlagsClass, ObjectFlagsInterface, ObjectFlagsClassOrInterface, ObjectFlagsTuple, ObjectFlagsMembersResolved, ObjectFlagsCouldContainTypeVariablesComputed, ObjectFlagsCouldContainTypeVariables, ObjectFlagsInstantiationExpressionType, ObjectFlagsAnonymous, ObjectFlagsInstantiated, ObjectFlagsReverseMapped, ObjectFlagsContainsIntersections, ObjectFlagsIsNeverIntersectionComputed, ObjectFlagsIsNeverIntersection, ObjectFlagsIsGenericObjectType, Type_AsUnionType, StructuredType_Properties, StructuredType_CallSignatures, StructuredType_ConstructSignatures, Type_AsUnionOrIntersectionType, ObjectFlagsMapped, TypeFlagsUnknown, Type_AsMappedType, Type_AsIntersectionType, Type_AsTypeReference, Type_AsTypeParameter, TypeFlagsSubstitution, TypeFlagsIndexedAccess, Type_AsSubstitutionType, Type_AsIndexedAccessType, IndexedAccessType_ObjectType, IndexedAccessType_IndexType, SubstitutionType_BaseType, TypeFlagsNullable, TypeFlagsConditional, TypeFlagsNumberLiteral, Type_AsConditionalType, TypeFlagsStringOrNumberLiteral, TypeFlagsStringOrNumberLiteralOrUnique, ObjectFlagsNone, ObjectFlagsFromTypeNode, ObjectFlagsPrimitiveUnion, Type_Distributed, ContextFlagsNone, ContextFlagsNoConstraints, ContextFlagsSignature, ObjectFlagsPropagatingFlags, TypeFlagsNone, TypeFlagsString, TypeFlagsNumber, TypeFlagsBigInt, TypeFlagsStringMapping, TypeFlagsLiteral, Type_AsTemplateLiteralType, TypeFlagsBooleanLiteral, TypeFlagsBigIntLiteral, TypeFlagsEnum, Type_AsLiteralType, TypeFlagsFreshable, ObjectFlagsEvolvingArray, ObjectFlagsContainsWideningType, Type_AsIntrinsicType, Type_AsStructuredType, Type_AsObjectType, TypeFormatFlagsWriteArrayAsGenericType, TypeFlagsPrimitive, ObjectFlagsArrayLiteral, ObjectFlagsContainsObjectOrArrayLiteral, Type_AsTupleType, SignatureKindConstruct, SignatureFlagsIsNonInferrable, TypeFormatFlagsNoTypeReduction, ObjectFlagsIsUnknownLikeUnionComputed, ObjectFlagsIsUnknownLikeUnion, TypeFlagsSimplifiable, ContextFlagsSkipBindingPatterns, TypeFlagsUniqueESSymbol, TypeFlagsESSymbol, TypeFlagsIncludesMask, TypeFlagsIncludesInstantiable, TypeFlagsIncludesConstrainedTypeVariable, TypeFlagsIncludesWildcard, TypeFlagsIncludesError, TypeFlagsIncludesNonWideningType, TypeFlagsIncludesEmptyObject, TypeFlagsIncludesMissingType, TypeFlagsUnit, ObjectFlagsIsConstrainedTypeVariable, ObjectFlagsObjectRestType, TypeFlagsBoolean, ObjectFlagsFreshLiteral, TypeFlagsNotPrimitiveUnion, TypeFlagsDisjointDomains, TypeFlagsVoidLike, TypeFlagsDefinitelyNonNullable, ObjectFlagsUnresolvedMembers, IndexFlagsNone, ObjectFlagsIsGenericTypeComputed, ObjectFlagsIsGenericType, ObjectFlagsIsGenericIndexType, ObjectFlagsJSLiteral, ObjectFlagsNonInferrableType, ObjectFlagsRequiresWidening, Type_AsInstantiationExpressionType, Type_AsReverseMappedType, Type_AsStringMappingType, TypeAlias_Symbol, ObjectFlagsContainsSpread } from "../types.js";
import { NodeCheckFlagsNone, SignatureFlagsNone } from "../types.js";
import type { orderedSet } from "../utilities.js";
import { CompareTypes, IsTypeAny, NewDiagnosticForNode, NewDiagnosticChainForNode, hasDotDotDotToken, isDeclarationReadonly, isOptionalDeclaration, orderedSet_contains, orderedSet_add, entityNameToString, isConstTypeReference, isObjectLiteralType, isTypeUsableAsPropertyName, getPropertyNameFromType, getDeclarationModifierFlagsFromSymbol } from "../utilities.js";
import type { Checker, CheckMode, ContextualInfo, EnumLiteralKey, InferenceContext, IntersectionFlags, IterationTypeKind, IterationTypes, IterationTypesKey, IterationTypesResolver, IterationUse, keyBuilder, ObjectLiteralDiscriminator, PredicateSemantics, TupleNormalizer, TypeFacts, TypeResolution, TypeSystemEntity, TypeSystemPropertyName, UnionOfUnionKey, UnionReduction, WideningContext, WideningKind, CachedTypeKey, CacheHashKey, PropertiesTypesKey } from "./state.js";
import { CheckModeTypeOnly, CheckModeNormal, CheckModeContextual, CheckModeInferential, CheckModeSkipContextSensitive, CheckModeSkipGenericFunctions, CheckModeRestBindingElement, CheckModeForceTuple, IterationTypeKindNext, IterationTypeKindReturn, IterationTypeKindYield, isTupleType, isUnitType, IterationUseAllowsAsyncIterablesFlag, IterationUseAllowsSyncIterablesFlag, IterationUseForOfFlag, IterationUseSpreadFlag, IterationUseDestructuringFlag, IterationUseYieldStarFlag, IterationUsePossiblyOutOfBounds, IterationUseAllowsStringInputFlag, IterationUseCacheFlags, IterationUseElement, TypeFactsNEUndefinedOrNull, UnionReductionSubtype, UnionReductionNone, UnionReductionLiteral, IterationUseSpread, IterationUseDestructuring, IterationUseYieldStar, IterationUseAsyncYieldStar, TypeFactsNEUndefined, TypeFactsIsUndefined, TypeFactsIsUndefinedOrNull, TypeSystemPropertyNameType, TypeSystemPropertyNameWriteType, TypeSystemPropertyNameInitializerIsUndefined, TypeSystemPropertyNameResolvedBaseTypes, TypeSystemPropertyNameResolvedBaseConstraint, someType, everyType, isSpreadIntoCallOrNew, getEffectiveSetAccessorTypeAnnotationNode, getEndElementCount, getTargetType, CachedTypeKindApparentType, CachedTypeKindLiteralUnionBaseType, CachedTypeKindWidened, CachedTypeKindPromisedTypeOfPromise, getEntityNameFromTypeNode, IntersectionFlagsNoSupertypeReduction, IntersectionFlagsNoConstraintReduction, IntersectionFlagsNone, hashWrite32, isTypeReferenceWithGenericArguments, getStringLiteralValue, getTypeListKey, getModifiedReadonlyState, getMappedTypeModifiers, MappedTypeModifiersIncludeOptional, MappedTypeModifiersExcludeOptional, PredicateSemanticsSometimes, PredicateSemanticsAlways, PredicateSemanticsNever, CachedTypeKindArrayLiteralType, CachedTypeKindDefaultOnlyType, getTotalFixedElementCount, getTupleKey, isConflictingPrivateProperty, isFreshLiteralType, TypeFactsNone, TypeFactsAll, TypeFactsOrFactsMask, TypeFactsAndFactsMask, containsType, getMappedTypeOptionality, TypeFactsEQUndefined, TypeFactsEQNull, TypeFactsIsNull, TypeFactsNENull, TypeFactsEQUndefinedOrNull, TypeFactsTruthy, WideningKindNormal, WideningKindGeneratorYield, getUnionKey, getAliasKey, insertType, isPrimitiveUnion, isUnionWithUndefined, isUnionWithNull, isNotUndefinedType, isNotNullType, isIntersectionType, getIntersectionKey, getConstituentCountOfTypes, CachedTypeKindRegularObjectLiteral, mayReturnNever, getTemplateTypeKey, getBaseTypeNodeOfClass, getConditionalTypeKey, InferenceFlagsNone, InferencePriorityAlwaysStrict, InferencePriorityNoConstraints } from "./state.js";
import { TypeFactsStringStrictFacts, TypeFactsStringFacts, TypeFactsEmptyStringStrictFacts, TypeFactsEmptyStringFacts, TypeFactsNonEmptyStringStrictFacts, TypeFactsNonEmptyStringFacts, TypeFactsNumberStrictFacts, TypeFactsNumberFacts, TypeFactsZeroNumberStrictFacts, TypeFactsZeroNumberFacts, TypeFactsNonZeroNumberStrictFacts, TypeFactsNonZeroNumberFacts, TypeFactsBigIntStrictFacts, TypeFactsBigIntFacts, TypeFactsZeroBigIntStrictFacts, TypeFactsZeroBigIntFacts, TypeFactsNonZeroBigIntStrictFacts, TypeFactsNonZeroBigIntFacts, TypeFactsBooleanStrictFacts, TypeFactsBooleanFacts, TypeFactsFalseStrictFacts, TypeFactsFalseFacts, TypeFactsTrueStrictFacts, TypeFactsTrueFacts, TypeFactsEmptyObjectStrictFacts, TypeFactsEmptyObjectFacts, TypeFactsFunctionStrictFacts, TypeFactsFunctionFacts, TypeFactsObjectStrictFacts, TypeFactsObjectFacts, TypeFactsVoidFacts, TypeFactsUndefinedFacts, TypeFactsNullFacts, TypeFactsSymbolStrictFacts, TypeFactsSymbolFacts, TypeFactsUnknownFacts, getNumberLiteralValue, isZeroBigInt } from "./state.js";
import { Checker_getTypeArguments, Checker_getTypeWithThisArgument, Checker_getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode, Checker_checkTypeForDuplicateIndexSignatures, Checker_newCallSignature, Checker_getOrCreateTypeFromSignature, Checker_newParameter, Checker_newTypeParameter, Checker_getTypeReferenceArity, Checker_getConstraintOfTypeParameter, Checker_getResolvedSignature, Checker_getDecoratorCallSignature, Checker_getContextualReturnType, Checker_getIterationTypeOfGeneratorFunctionReturnType, Checker_getIterationTypesOfGeneratorFunctionReturnType, Checker_getContextualTypeForArgument, Checker_getTypeParameterFromMappedType, Checker_forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType, Checker_instantiateTypeWithSingleGenericCallSignature, Checker_checkExpressionWithTypeArguments, Checker_checkNoTypeArguments, Checker_getReturnTypeOfSingleNonGenericSignature, Checker_getReturnTypeOfSingleNonGenericSignatureOfCallChain, Checker_isSymbolOrSymbolForCall, Checker_unwrapReturnType, Checker_isUnwrappedReturnTypeUndefinedVoidOrAny, Checker_getSignatureFromDeclaration, Checker_findApplicableIndexInfo, Checker_getOuterTypeParametersOfClassOrInterface, Checker_appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias, Checker_areAllOuterTypeParametersApplied, Checker_getInstantiatedConstructorsForTypeArguments, Checker_cloneTypeParameter, Checker_getTypeFromThisTypeNode, Checker_getTypeFromRestTypeNode, Checker_getMinTypeArgumentCount, Checker_fillMissingTypeArguments, Checker_getTypeArgumentsFromNode, Checker_getOuterTypeParameters, Checker_isTypeParameterPossiblyReferenced, Checker_getInferTypeParameters } from "./signatures.js";
import { Checker_assignContextualParameterTypes, Checker_assignNonContextualParameterTypes, Checker_checkSignatureDeclaration, Checker_getContextualCallSignature, Checker_getContextualSignature, Checker_getReturnTypeFromAnnotation, Checker_inferFromAnnotatedParametersAndReturn, Checker_instantiateSignature, Checker_newSignature } from "./signatures.js";
import { Checker_getSignaturesOfType, Checker_getReturnTypeOfSignature, Checker_getBuiltinIteratorReturnType, Checker_getRestTypeOfTupleType, Checker_getRestType, Checker_getReturnTypeFromBody, Checker_getTypeOfFirstParameterOfSignature, Checker_isUntypedFunctionCall, Checker_resolveUntypedCall, Checker_resolveCall } from "./signatures.js";
import { Checker_getBaseConstraintOfType, Checker_checkIndexConstraints, Checker_getTypeAliasInstantiation, Checker_isGenericTypeWithUndefinedConstraint, Checker_getConstraintTypeFromMappedType, Checker_isAwaitedTypeInstantiation, Checker_isTypeMatchedByTemplateLiteralOrStringMapping, Checker_getGlobalNonNullableTypeInstantiation, Checker_pushInferenceContext, Checker_popInferenceContext, Checker_getSubstitutionIntersection, Checker_getRestrictiveInstantiation, Checker_getPermissiveInstantiation, Checker_isMappedTypeWithKeyofConstraintDeclaration, Checker_getConstraintDeclarationForMappedType, Checker_getConstraintOfConditionalType, Checker_getConditionalTypeInstantiation, Checker_maybeTypeOfKindConsideringBaseConstraint, Checker_widenTypeInferredFromInitializer, Checker_getInferenceContext, Checker_getContextualTypeForSubstitutionExpression, Checker_getObjectTypeInstantiation, Checker_hasArrayOrTypeTypeConstraint, Checker_getStringMappingType, Checker_isNoInferType, Checker_getNoInferType, Checker_getSubstitutionType, Checker_getTypeFromInferTypeNode } from "./inference.js";
import { Checker_addIntraExpressionInferenceSite, Checker_inferTypeForHomomorphicMappedType, Checker_inferTypes, Checker_newInferenceContext, hasInferenceCandidatesOrDefault } from "../inference.js";
import { Checker_getTypeOfSymbol, Checker_getPropertyOfType, Checker_getTypeOfPropertyOfType, Checker_getIndexTypeOfType, Checker_checkDeclarationInitializer, Checker_findResolutionCycleStartIndex, Checker_instantiateTypeWithAlias, Checker_isNeverReducedProperty, Checker_resolveStructuredTypeMembers, Checker_getIndexInfosOfType, Checker_getIndexInfosOfStructuredType, Checker_getPropertyOfUnionOrIntersectionType, Checker_getIndexedAccessType, Checker_getIndexedAccessTypeEx, Checker_getIndexedAccessTypeOrUndefined, Checker_createTypeFromGenericGlobalType, Checker_getDeclaredTypeOfSymbol, Checker_checkObjectTypeForDuplicateDeclarations, Checker_markEntityNameOrEntityExpressionAsReference, Checker_getEntityNameForDecoratorMetadata, Checker_getSymbolOfNode, Checker_getSymbolOfDeclaration, Checker_checkCollisionsForDeclarationName, Checker_getAliasForTypeNode, Checker_getParentOfSymbol, Checker_setStructuredTypeMembers, Checker_getMembersOfSymbol, Checker_getTypeOfPropertyOfContextualType, Checker_getTypeOfPropertyOfContextualTypeEx, Checker_getWidenedProperty, Checker_getWidenedTypeForVariableLikeDeclaration, Checker_getWidenedUniqueESSymbolType, Checker_isContextSensitiveFunctionLikeDeclaration, Checker_getTypeForVariableLikeDeclaration, Checker_getSimplifiedIndexedAccessType, Checker_getAwaitedTypeNoAlias, Checker_getAwaitedTypeNoAliasEx, Checker_resolveExternalModuleName, Checker_checkComputedPropertyName, Checker_getObjectLiteralIndexInfo, Checker_isOnlyImportableAsDefault, Checker_createDefaultPropertyWrapperForModule, Checker_createSymbolWithType, Checker_getFullyQualifiedName, Checker_getContextualTypeForVariableLikeDeclaration, Checker_isGenericIndexType, Checker_getNameTypeFromMappedType, Checker_getUndefinedProperty, Checker_newSymbol, Checker_newSymbolEx, Checker_getMergedSymbol, Checker_getTypeFromTypeAliasReference, Checker_tryGetDeclaredTypeOfSymbol, Checker_getSymbolFromTypeReference, Checker_checkTypeReferenceOrImport, Checker_isValidIndexKeyType, Checker_getAliasSymbolForTypeNode, Checker_isResolvedByTypeAlias, Checker_mayResolveTypeAlias, Checker_transformTypeOfMembers, Checker_getIndexType, Checker_getESSymbolLikeTypeForNode, Checker_addNamedUnions, Checker_newIndexType, Checker_getLiteralTypeFromProperty, Checker_getPropertyNameFromBindingElement, Checker_getLiteralTypeFromPropertyName, Checker_newIndexInfo, Checker_declarationBelongsToPrivateAmbientMember, Checker_getContextualImportAttributeType, Checker_hasBindableName, Checker_discriminateContextualTypeByObjectMembers, Checker_getEnumMemberValue, Checker_instantiateTypeAlias, Checker_mapTypeWithAlias, Checker_getTypeFromIndexedAccessTypeNode, Checker_getTypeFromNamedTupleTypeNode, Checker_getTypeFromImportTypeNode, Checker_getUnionIndexInfos, Checker_getIndexInfoWithReadonly, Checker_getSpreadSymbol, Checker_isSpreadableProperty, Checker_checkMetaPropertyKeyword, Checker_getSymbolAtLocation } from "./symbols.js";
import { Checker_getIndexInfoOfType } from "./symbols.js";
import { Checker_getEffectiveRestType, Checker_getMinArgumentCount, Checker_reportDiagnostic, Checker_checkTypeAssignableToEx, Checker_checkTypeAssignableTo, Checker_getTypeAtPosition, Checker_isTypeAssignableTo, Checker_getKeyPropertyName, Checker_getConstituentTypeForKeyType, Checker_isTypeSubtypeOf, Checker_isTypeStrictSubtypeOf, Checker_getKnownKeysOfTupleType, Checker_sliceTupleType, Checker_getThisTypeOfSignature, Checker_isTypeRelatedTo } from "../relater.js";
import { Checker_reportTypeNotIterableError, Checker_addDeferredDiagnostic, Checker_getIterationDiagnosticDetails, Checker_checkNonNullTypeWithReporter, Checker_reportObjectPossiblyNullOrUndefinedError, Checker_reportCircularityError, Checker_checkDeprecatedSignature, Checker_isErrorType, Checker_addErrorOrSuggestion, Checker_resolveErrorCall, Checker_invocationError } from "./diagnostics.js";
import { Checker_getPropertyNameForKnownSymbolName, Checker_getTypeOfInitializer, Checker_includeUndefinedInIndexSignature, Checker_isConstantReference } from "../flow.js";
import { Checker_checkSourceElement, Checker_checkSourceElements, Checker_error, Checker_errorOrSuggestion, keyBuilder_writeByte, keyBuilder_writeInt, Checker_findMixins } from "./support.js";
import { Checker_TypeToString, Checker_TypeToStringEx, Checker_symbolToString } from "../printer.js";
import { Checker_checkGrammarForGenerator, Checker_checkGrammarFunctionLikeDeclaration, Checker_checkGrammarObjectLiteralExpression, Checker_checkGrammarTypeOperatorNode, Checker_checkGrammarRegularExpressionLiteral, Checker_grammarErrorOnNode, Checker_checkGrammarTaggedTemplateChain, Checker_checkGrammarTypeArguments, Checker_checkGrammarMethod, Checker_grammarErrorAtPos, Checker_checkGrammarMappedType } from "../grammarchecks.js";
import type { LinkStore } from "../../core/linkstore.js";
import { LinkStore_Get } from "../../core/linkstore.js";
import { goNodePointerKey, goSymbolPointerKey } from "../map-key-descriptors.js";
import { Checker_isYieldIteratorResult, Checker_isReturnIteratorResult, Checker_errorAndMaybeSuggestAwait, Checker_checkExpressionEx, Checker_checkExpression, Checker_checkExpressionForMutableLocation, Checker_checkExpressionCached, Checker_checkExpressionCachedEx, Checker_checkNodeDeferred, Checker_checkReturnExpression, Checker_getCombinedNodeFlagsCached, Checker_getContextNode, Checker_functionHasImplicitReturn, Checker_findContextualNode } from "./syntax-checking.js";
import { Checker_checkTruthinessExpression, Checker_checkTestingKnownTruthyCallableOrAwaitableOrEnumMemberType, Checker_removeDefinitelyFalsyTypes, Checker_getConditionalFlowTypeOfType, Checker_getFlowTypeOfDestructuring, Checker_isPossiblyDiscriminantValue, Checker_isDiscriminantWithNeverType } from "./flow-narrowing.js";
import { Checker_checkPropertyAssignment, Checker_checkShorthandPropertyAssignment, Checker_isTypeAssignableToKind, Checker_allTypesAssignableToKind, Checker_allTypesAssignableToKindEx, Checker_removeSubtypes, Checker_removeRedundantSupertypes, Checker_getSingleBaseForNonAugmentingSubtype, Checker_getContextualTypeForAssignmentExpression } from "./relations.js";
import { Checker_getBaseConstraintOrType } from "./inference.js";
import { instantiateList } from "./state.js";
import { SkipParentheses, SkipTypeParentheses, IsRightSideOfQualifiedNameOrPropertyAccess, FindAncestor, IsExpressionOfOptionalChainRoot, IsOptionalChain, IsOutermostOptionalChain, IsEntityName, IsStatic, IsInJSFile, IsInJsonFile, IsEntityNameExpression, GetFirstIdentifier, GetReparsedNodeForNode, IsFunctionExpressionOrArrowFunction, IsObjectLiteralMethod, SkipOuterExpressions, OEKAll, HasModifier, HasSyntacticModifier, GetClassLikeDeclarationOfSymbol, GetDeclarationOfKind, GetContainingFunction, FindAncestorOrQuit, FindAncestorTrue, FindAncestorFalse, FindAncestorQuit, IsAssertionExpression, GetSourceFileOfNode, WalkUpParenthesizedTypes, IsRequireCall, IsImportCall, IsLiteralExpression, IsBooleanLiteral, IsConstTypeReference, IsValidTypeOnlyAliasUseSite, NodeIsMissing, IsBindingPattern, IsPartOfParameterDeclaration, WalkUpBindingElementsAndPatterns, IsAutoAccessorPropertyDeclaration, IsComputedNonLiteralName, IsConstAssertion, IndexOfNode, HasDynamicName, GetNameOfDeclaration, IsPartOfTypeNode, ForEachReturnStatement, GetExtendsHeritageClauseElements, IsAssignmentTarget, HasContextSensitiveParameters, IsCheckJSEnabledForFile, IsTypeNodeKind, IsExternalOrCommonJSModule, TryGetClassImplementingOrExtendingExpressionWithTypeArguments, IsExpressionNode, IsTypeDeclaration, IsTypeDeclarationName, IsDeclaration, IsDeclarationNameOrImportPropertyName } from "../../ast/utilities.js";
import { ScanTokenAtPosition, SkipTrivia, TokenToString } from "../../scanner/scanner.js";
import { DeclarationNameToString, IdentifierToKeywordKind } from "../../scanner/utilities.js";
import { GetLeftmostExpression } from "../../ast/precedence.js";
import { GetFunctionFlags, FunctionFlagsAsync, FunctionFlagsGenerator } from "../../ast/functionflags.js";
import { KindNullKeyword, KindIdentifier, KindThisKeyword, KindAnyKeyword, KindJSDocAllType, KindJSDocNonNullableType, KindJSDocNullableType, KindJSDocVariadicType, KindJSDocOptionalType, KindUnknownKeyword, KindStringKeyword, KindNumberKeyword, KindBigIntKeyword, KindBooleanKeyword, KindVoidKeyword, KindUndefinedKeyword, KindNeverKeyword, KindObjectKeyword, KindIntrinsicKeyword, KindThisType, KindLiteralType, KindExpressionWithTypeArguments, KindTypePredicate, KindTypeQuery, KindUnionType, KindIntersectionType, KindFunctionType, KindConstructorType, KindTypeLiteral, KindTypeOperator, KindIndexedAccessType, KindTemplateLiteralType, KindMappedType, KindConditionalType, KindInferType, KindImportType } from "../../ast/generated/kinds.js";
import { KindFunctionExpression } from "../../ast/generated/kinds.js";
import { KindComputedPropertyName } from "../../ast/generated/kinds.js";
import { SymbolFlagsModule, SymbolFlagsModuleExports, SymbolFlagsValueModule, SymbolFlagsClass } from "../../ast/generated/flags.js";
import type { MappedSymbolLinks, SpreadLinks, ValueSymbolLinks } from "../types.js";
import { CheckFlagsLate, CheckFlagsReadonly } from "../../ast/checkflags.js";
import { isShorthandAmbientModuleSymbol, isCallChain, isSideEffectImport, forEachYieldExpression } from "../utilities.js";
import { Checker_getBaseConstructorTypeOfClass } from "./signatures.js";
import { Checker_resolveExternalModuleSymbol, Checker_getResolvedSymbol } from "./symbols.js";
import { Checker_addOptionalityEx, Checker_getPropertiesOfContext, Checker_getTailRecursionRoot, Checker_isConstContext, Checker_hasDefaultValue, Checker_isContextSensitive, Checker_addOptionality, Checker_getSpreadIndices } from "./support-queries.js";
import { Checker_getContextualTypeForJsxExpression, Checker_getContextualTypeForJsxAttribute, Checker_getContextualJsxElementAttributesType, Checker_discriminateContextualTypeByJSXAttributes } from "../jsx.js";
import { Tracer_RecordType, Tracer_Instant } from "../tracer.js";
import { PhaseCheckTypes } from "../../tracing/tracing.js";
import { ModifierFlagsConst, ModifierFlagsPrivate, ModifierFlagsProtected } from "../../ast/modifierflags.js";
import { Checker_checkSpreadPropOverrides, Checker_isNodeWithinClass, Checker_isThislessInterface } from "./classes.js";
import { isInRightSideOfImportOrExportAssignment } from "../utilities.js";
import { isPrivateWithinAmbient } from "../utilities.js";
import { Checker_getIsolatedModulesLikeFlagName } from "./symbols.js";
import { Checker_createModuleNotFoundChain } from "./modules.js";

import type { GoFunc, GoInterface, GoRef } from "../../../go/compat.js";
import { GoSliceBuild, GoSliceMake, GoSliceStore } from "../../../go/compat.js";
import { GoBooleanValueOps, GoSliceLoad } from "../../../go/compat.js";
import { GoEmptySlice } from "../../../go/compat.js";




function zeroNodeLinks(): NodeLinks {
  return {
    flags: NodeCheckFlagsNone,
    declarationRequiresScopeChange: TSUnknown,
    hasReportedStatementInAmbientContext: false,
  };
}

function zeroValueSymbolLinks(): ValueSymbolLinks {
  return {
    resolvedType: undefined,
    writeType: undefined,
    target: undefined,
    mapper: undefined,
    nameType: undefined,
    containingType: undefined,
    functionOrConstructorChecked: false,
  };
}

function zeroMappedSymbolLinks(): MappedSymbolLinks {
  return {
    keyType: undefined,
    syntheticOrigin: undefined,
  };
}

function zeroExportTypeLinks(): ExportTypeLinks {
  return {
    target: undefined,
    originatingImport: undefined,
  };
}

function zeroDeclaredTypeLinks(): DeclaredTypeLinks {
  return {
    declaredType: undefined,
    interfaceChecked: false,
    indexSignaturesChecked: false,
    typeParametersChecked: false,
    enumChecked: false,
  };
}

function zeroSpreadLinks(): SpreadLinks {
  return {
    leftSpread: undefined,
    rightSpread: undefined,
  };
}

function zeroTypeNodeLinks(): TypeNodeLinks {
  return {
    resolvedType: undefined,
    outerTypeParameters: GoNilSlice<GoPtr<Type>>(),
  };
}

class TypeValue implements Type {
  flags: TypeFlags = 0;
  objectFlags: ObjectFlags = 0;
  id: TypeId = 0;
  "symbol": GoPtr<Symbol> = undefined;
  alias: GoPtr<TypeAlias> = undefined;
  checker: GoPtr<Checker> = undefined;
  data: GoInterface<TypeData> = undefined;
}

export class TypeBaseData implements TypeBase, TypeData {
  __tsgoEmbedded0: Type = new TypeValue();

  __tsgoGoReceiver(): GoPtr<TypeBase> {
    return this;
  }

  AsType(): GoPtr<Type> {
    return this.__tsgoEmbedded0;
  }

  AsConstrainedType(): GoPtr<ConstrainedType> {
    return undefined;
  }

  AsStructuredType(): GoPtr<StructuredType> {
    return undefined;
  }

  AsObjectType(): GoPtr<ObjectType> {
    return undefined;
  }

  AsTypeReference(): GoPtr<TypeReference> {
    return undefined;
  }

  AsInterfaceType(): GoPtr<InterfaceType> {
    return undefined;
  }

  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return undefined;
  }
}

abstract class TypeBaseEmbeddedData<TReceiver> implements TypeData {
  abstract __tsgoEmbedded0: TypeBaseData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsType(): GoPtr<Type> {
    return this.__tsgoEmbedded0.AsType();
  }

  AsConstrainedType(): GoPtr<ConstrainedType> {
    return this.__tsgoEmbedded0.AsConstrainedType();
  }

  AsStructuredType(): GoPtr<StructuredType> {
    return this.__tsgoEmbedded0.AsStructuredType();
  }

  AsObjectType(): GoPtr<ObjectType> {
    return this.__tsgoEmbedded0.AsObjectType();
  }

  AsTypeReference(): GoPtr<TypeReference> {
    return this.__tsgoEmbedded0.AsTypeReference();
  }

  AsInterfaceType(): GoPtr<InterfaceType> {
    return this.__tsgoEmbedded0.AsInterfaceType();
  }

  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return this.__tsgoEmbedded0.AsUnionOrIntersectionType();
  }
}

export class IntrinsicTypeData extends TypeBaseEmbeddedData<IntrinsicType> implements IntrinsicType {
  __tsgoEmbedded0: TypeBaseData = new TypeBaseData();
  intrinsicName: string = "";

  __tsgoGoReceiver(): GoPtr<IntrinsicType> {
    return this;
  }
}

export class LiteralTypeData extends TypeBaseEmbeddedData<LiteralType> implements LiteralType {
  __tsgoEmbedded0: TypeBaseData = new TypeBaseData();
  value: GoInterface<unknown> = undefined;
  freshType: GoPtr<Type> = undefined;
  regularType: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<LiteralType> {
    return this;
  }
}

export class UniqueESSymbolTypeData extends TypeBaseEmbeddedData<UniqueESSymbolType> implements UniqueESSymbolType {
  __tsgoEmbedded0: TypeBaseData = new TypeBaseData();
  name: string = "";

  __tsgoGoReceiver(): GoPtr<UniqueESSymbolType> {
    return this;
  }
}

export class ConstrainedTypeData extends TypeBaseEmbeddedData<ConstrainedType> implements ConstrainedType {
  __tsgoEmbedded0: TypeBaseData = new TypeBaseData();
  resolvedBaseConstraint: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<ConstrainedType> {
    return this;
  }

  override AsConstrainedType(): GoPtr<ConstrainedType> {
    return this;
  }
}

abstract class ConstrainedTypeEmbeddedData<TReceiver> implements TypeData {
  abstract __tsgoEmbedded0: ConstrainedTypeData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsType(): GoPtr<Type> {
    return this.__tsgoEmbedded0.AsType();
  }

  AsConstrainedType(): GoPtr<ConstrainedType> {
    return this.__tsgoEmbedded0;
  }

  AsStructuredType(): GoPtr<StructuredType> {
    return this.__tsgoEmbedded0.AsStructuredType();
  }

  AsObjectType(): GoPtr<ObjectType> {
    return this.__tsgoEmbedded0.AsObjectType();
  }

  AsTypeReference(): GoPtr<TypeReference> {
    return this.__tsgoEmbedded0.AsTypeReference();
  }

  AsInterfaceType(): GoPtr<InterfaceType> {
    return this.__tsgoEmbedded0.AsInterfaceType();
  }

  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return this.__tsgoEmbedded0.AsUnionOrIntersectionType();
  }
}

export class StructuredTypeData extends ConstrainedTypeEmbeddedData<StructuredType> implements StructuredType {
  __tsgoEmbedded0: ConstrainedTypeData = new ConstrainedTypeData();
  members: SymbolTable = GoNilMap();
  properties: GoSlice<GoPtr<Symbol>> = GoNilSlice();
  signatures: GoSlice<GoPtr<Signature>> = GoNilSlice();
  callSignatureCount: int = 0;
  indexInfos: GoSlice<GoPtr<IndexInfo>> = GoNilSlice();
  objectTypeWithoutAbstractConstructSignatures: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<StructuredType> {
    return this;
  }

  override AsStructuredType(): GoPtr<StructuredType> {
    return this;
  }
}

abstract class StructuredTypeEmbeddedData<TReceiver> implements TypeData {
  abstract __tsgoEmbedded0: StructuredTypeData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsType(): GoPtr<Type> {
    return this.__tsgoEmbedded0.AsType();
  }

  AsConstrainedType(): GoPtr<ConstrainedType> {
    return this.__tsgoEmbedded0.AsConstrainedType();
  }

  AsStructuredType(): GoPtr<StructuredType> {
    return this.__tsgoEmbedded0;
  }

  AsObjectType(): GoPtr<ObjectType> {
    return this.__tsgoEmbedded0.AsObjectType();
  }

  AsTypeReference(): GoPtr<TypeReference> {
    return this.__tsgoEmbedded0.AsTypeReference();
  }

  AsInterfaceType(): GoPtr<InterfaceType> {
    return this.__tsgoEmbedded0.AsInterfaceType();
  }

  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return this.__tsgoEmbedded0.AsUnionOrIntersectionType();
  }
}

export class ObjectTypeData extends StructuredTypeEmbeddedData<ObjectType> implements ObjectType {
  __tsgoEmbedded0: StructuredTypeData = new StructuredTypeData();
  target: GoPtr<Type> = undefined;
  mapper: GoPtr<TypeMapper> = undefined;
  instantiations: GoMap<CacheHashKey, GoPtr<Type>> = GoNilMap();

  __tsgoGoReceiver(): GoPtr<ObjectType> {
    return this;
  }

  override AsObjectType(): GoPtr<ObjectType> {
    return this;
  }
}

abstract class ObjectTypeEmbeddedData<TReceiver> implements TypeData {
  abstract __tsgoEmbedded0: ObjectTypeData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsType(): GoPtr<Type> {
    return this.__tsgoEmbedded0.AsType();
  }

  AsConstrainedType(): GoPtr<ConstrainedType> {
    return this.__tsgoEmbedded0.AsConstrainedType();
  }

  AsStructuredType(): GoPtr<StructuredType> {
    return this.__tsgoEmbedded0.AsStructuredType();
  }

  AsObjectType(): GoPtr<ObjectType> {
    return this.__tsgoEmbedded0;
  }

  AsTypeReference(): GoPtr<TypeReference> {
    return this.__tsgoEmbedded0.AsTypeReference();
  }

  AsInterfaceType(): GoPtr<InterfaceType> {
    return this.__tsgoEmbedded0.AsInterfaceType();
  }

  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return this.__tsgoEmbedded0.AsUnionOrIntersectionType();
  }
}

export class TypeReferenceData extends ObjectTypeEmbeddedData<TypeReference> implements TypeReference {
  __tsgoEmbedded0: ObjectTypeData = new ObjectTypeData();
  node: GoPtr<Node> = undefined;
  resolvedTypeArguments: GoSlice<GoPtr<Type>> = GoNilSlice();

  __tsgoGoReceiver(): GoPtr<TypeReference> {
    return this;
  }

  override AsTypeReference(): GoPtr<TypeReference> {
    return this;
  }
}

abstract class TypeReferenceEmbeddedData<TReceiver> implements TypeData {
  abstract __tsgoEmbedded0: TypeReferenceData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsType(): GoPtr<Type> {
    return this.__tsgoEmbedded0.AsType();
  }

  AsConstrainedType(): GoPtr<ConstrainedType> {
    return this.__tsgoEmbedded0.AsConstrainedType();
  }

  AsStructuredType(): GoPtr<StructuredType> {
    return this.__tsgoEmbedded0.AsStructuredType();
  }

  AsObjectType(): GoPtr<ObjectType> {
    return this.__tsgoEmbedded0.AsObjectType();
  }

  AsTypeReference(): GoPtr<TypeReference> {
    return this.__tsgoEmbedded0;
  }

  AsInterfaceType(): GoPtr<InterfaceType> {
    return this.__tsgoEmbedded0.AsInterfaceType();
  }

  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return this.__tsgoEmbedded0.AsUnionOrIntersectionType();
  }
}

export class InterfaceTypeData extends TypeReferenceEmbeddedData<InterfaceType> implements InterfaceType {
  __tsgoEmbedded0: TypeReferenceData = new TypeReferenceData();
  allTypeParameters: GoSlice<GoPtr<Type>> = GoNilSlice();
  outerTypeParameterCount: int = 0;
  thisType: GoPtr<Type> = undefined;
  baseTypesResolved: bool = false;
  declaredMembersResolved: bool = false;
  resolvedBaseConstructorType: GoPtr<Type> = undefined;
  resolvedBaseTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
  declaredMembers: SymbolTable = GoNilMap();
  declaredCallSignatures: GoSlice<GoPtr<Signature>> = GoNilSlice();
  declaredConstructSignatures: GoSlice<GoPtr<Signature>> = GoNilSlice();
  declaredIndexInfos: GoSlice<GoPtr<IndexInfo>> = GoNilSlice();

  __tsgoGoReceiver(): GoPtr<InterfaceType> {
    return this;
  }

  override AsInterfaceType(): GoPtr<InterfaceType> {
    return this;
  }
}

abstract class InterfaceTypeEmbeddedData<TReceiver> implements TypeData {
  abstract __tsgoEmbedded0: InterfaceTypeData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsType(): GoPtr<Type> {
    return this.__tsgoEmbedded0.AsType();
  }

  AsConstrainedType(): GoPtr<ConstrainedType> {
    return this.__tsgoEmbedded0.AsConstrainedType();
  }

  AsStructuredType(): GoPtr<StructuredType> {
    return this.__tsgoEmbedded0.AsStructuredType();
  }

  AsObjectType(): GoPtr<ObjectType> {
    return this.__tsgoEmbedded0.AsObjectType();
  }

  AsTypeReference(): GoPtr<TypeReference> {
    return this.__tsgoEmbedded0.AsTypeReference();
  }

  AsInterfaceType(): GoPtr<InterfaceType> {
    return this.__tsgoEmbedded0;
  }

  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return this.__tsgoEmbedded0.AsUnionOrIntersectionType();
  }
}

export class TupleTypeData extends InterfaceTypeEmbeddedData<TupleType> implements TupleType {
  __tsgoEmbedded0: InterfaceTypeData = new InterfaceTypeData();
  elementInfos: GoSlice<TupleElementInfo> = GoNilSlice();
  minLength: int = 0;
  fixedLength: int = 0;
  combinedFlags: ElementFlags = 0;
  readonly: bool = false;

  __tsgoGoReceiver(): GoPtr<TupleType> {
    return this;
  }
}

export class InstantiationExpressionTypeData extends ObjectTypeEmbeddedData<InstantiationExpressionType> implements InstantiationExpressionType {
  __tsgoEmbedded0: ObjectTypeData = new ObjectTypeData();
  node: GoPtr<Node> = undefined;

  __tsgoGoReceiver(): GoPtr<InstantiationExpressionType> {
    return this;
  }
}

export class MappedTypeData extends ObjectTypeEmbeddedData<MappedType> implements MappedType {
  __tsgoEmbedded0: ObjectTypeData = new ObjectTypeData();
  declaration: MappedType["declaration"] = undefined;
  typeParameter: GoPtr<Type> = undefined;
  constraintType: GoPtr<Type> = undefined;
  nameType: GoPtr<Type> = undefined;
  templateType: GoPtr<Type> = undefined;
  modifiersType: GoPtr<Type> = undefined;
  resolvedApparentType: GoPtr<Type> = undefined;
  containsError: bool = false;

  __tsgoGoReceiver(): GoPtr<MappedType> {
    return this;
  }
}

export class ReverseMappedTypeData extends ObjectTypeEmbeddedData<ReverseMappedType> implements ReverseMappedType {
  __tsgoEmbedded0: ObjectTypeData = new ObjectTypeData();
  source: GoPtr<Type> = undefined;
  mappedType: GoPtr<Type> = undefined;
  constraintType: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<ReverseMappedType> {
    return this;
  }
}

export class EvolvingArrayTypeData extends ObjectTypeEmbeddedData<EvolvingArrayType> implements EvolvingArrayType {
  __tsgoEmbedded0: ObjectTypeData = new ObjectTypeData();
  elementType: GoPtr<Type> = undefined;
  finalArrayType: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<EvolvingArrayType> {
    return this;
  }
}

export class UnionOrIntersectionTypeData extends StructuredTypeEmbeddedData<UnionOrIntersectionType> implements UnionOrIntersectionType {
  __tsgoEmbedded0: StructuredTypeData = new StructuredTypeData();
  types: GoSlice<GoPtr<Type>> = GoNilSlice();
  propertyCache: SymbolTable = GoNilMap();
  propertyCacheWithoutFunctionPropertyAugment: SymbolTable = GoNilMap();
  resolvedProperties: GoSlice<GoPtr<Symbol>> = GoNilSlice();

  __tsgoGoReceiver(): GoPtr<UnionOrIntersectionType> {
    return this;
  }

  override AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return this;
  }
}

abstract class UnionOrIntersectionTypeEmbeddedData<TReceiver> implements TypeData {
  abstract __tsgoEmbedded0: UnionOrIntersectionTypeData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsType(): GoPtr<Type> {
    return this.__tsgoEmbedded0.AsType();
  }

  AsConstrainedType(): GoPtr<ConstrainedType> {
    return this.__tsgoEmbedded0.AsConstrainedType();
  }

  AsStructuredType(): GoPtr<StructuredType> {
    return this.__tsgoEmbedded0.AsStructuredType();
  }

  AsObjectType(): GoPtr<ObjectType> {
    return this.__tsgoEmbedded0.AsObjectType();
  }

  AsTypeReference(): GoPtr<TypeReference> {
    return this.__tsgoEmbedded0.AsTypeReference();
  }

  AsInterfaceType(): GoPtr<InterfaceType> {
    return this.__tsgoEmbedded0.AsInterfaceType();
  }

  AsUnionOrIntersectionType(): GoPtr<UnionOrIntersectionType> {
    return this.__tsgoEmbedded0;
  }
}

export class UnionTypeData extends UnionOrIntersectionTypeEmbeddedData<UnionType> implements UnionType {
  __tsgoEmbedded0: UnionOrIntersectionTypeData = new UnionOrIntersectionTypeData();
  resolvedReducedType: GoPtr<Type> = undefined;
  regularType: GoPtr<Type> = undefined;
  origin: GoPtr<Type> = undefined;
  keyPropertyName: string = "";
  constituentMap: GoMap<GoPtr<Type>, GoPtr<Type>> = GoNilMap();

  __tsgoGoReceiver(): GoPtr<UnionType> {
    return this;
  }
}

export class IntersectionTypeData extends UnionOrIntersectionTypeEmbeddedData<IntersectionType> implements IntersectionType {
  __tsgoEmbedded0: UnionOrIntersectionTypeData = new UnionOrIntersectionTypeData();
  resolvedApparentType: GoPtr<Type> = undefined;
  uniqueLiteralFilledInstantiation: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<IntersectionType> {
    return this;
  }
}

export class TypeParameterData extends ConstrainedTypeEmbeddedData<TypeParameter> implements TypeParameter {
  __tsgoEmbedded0: ConstrainedTypeData = new ConstrainedTypeData();
  constraint: GoPtr<Type> = undefined;
  target: GoPtr<Type> = undefined;
  mapper: GoPtr<TypeMapper> = undefined;
  isThisType: bool = false;
  resolvedDefaultType: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<TypeParameter> {
    return this;
  }
}

export class IndexTypeData extends ConstrainedTypeEmbeddedData<IndexType> implements IndexType {
  __tsgoEmbedded0: ConstrainedTypeData = new ConstrainedTypeData();
  target: GoPtr<Type> = undefined;
  indexFlags: IndexFlags = 0;

  __tsgoGoReceiver(): GoPtr<IndexType> {
    return this;
  }
}

export class IndexedAccessTypeData extends ConstrainedTypeEmbeddedData<IndexedAccessType> implements IndexedAccessType {
  __tsgoEmbedded0: ConstrainedTypeData = new ConstrainedTypeData();
  objectType: GoPtr<Type> = undefined;
  indexType: GoPtr<Type> = undefined;
  accessFlags: AccessFlags = 0;

  __tsgoGoReceiver(): GoPtr<IndexedAccessType> {
    return this;
  }
}

export class TemplateLiteralTypeData extends ConstrainedTypeEmbeddedData<TemplateLiteralType> implements TemplateLiteralType {
  __tsgoEmbedded0: ConstrainedTypeData = new ConstrainedTypeData();
  texts: GoSlice<string> = GoNilSlice();
  types: GoSlice<GoPtr<Type>> = GoNilSlice();

  __tsgoGoReceiver(): GoPtr<TemplateLiteralType> {
    return this;
  }
}

export class StringMappingTypeData extends ConstrainedTypeEmbeddedData<StringMappingType> implements StringMappingType {
  __tsgoEmbedded0: ConstrainedTypeData = new ConstrainedTypeData();
  target: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<StringMappingType> {
    return this;
  }
}

export class SubstitutionTypeData extends ConstrainedTypeEmbeddedData<SubstitutionType> implements SubstitutionType {
  __tsgoEmbedded0: ConstrainedTypeData = new ConstrainedTypeData();
  baseType: GoPtr<Type> = undefined;
  constraint: GoPtr<Type> = undefined;

  __tsgoGoReceiver(): GoPtr<SubstitutionType> {
    return this;
  }
}

export class ConditionalTypeData extends ConstrainedTypeEmbeddedData<ConditionalType> implements ConditionalType {
  __tsgoEmbedded0: ConstrainedTypeData = new ConstrainedTypeData();
  root: GoPtr<ConditionalRoot> = undefined;
  checkType: GoPtr<Type> = undefined;
  extendsType: GoPtr<Type> = undefined;
  resolvedTrueType: GoPtr<Type> = undefined;
  resolvedFalseType: GoPtr<Type> = undefined;
  resolvedInferredTrueType: GoPtr<Type> = undefined;
  resolvedDefaultConstraint: GoPtr<Type> = undefined;
  resolvedConstraintOfDistributive: GoPtr<Type> = undefined;
  mapper: GoPtr<TypeMapper> = undefined;
  combinedMapper: GoPtr<TypeMapper> = undefined;

  __tsgoGoReceiver(): GoPtr<ConditionalType> {
    return this;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.maybeMappedType","kind":"method","status":"implemented","sigHash":"377954a102197a6c49b7f324fdfede01850e33b53b9fcd340d7a67bd68565afb"}
 *
 * Go source:
 * func (c *Checker) maybeMappedType(node *ast.Node, symbol *ast.Symbol) bool {
 * 	for {
 * 		node = node.Parent
 * 		if !(ast.IsComputedPropertyName(node) || ast.IsPropertySignatureDeclaration(node)) {
 * 			break
 * 		}
 * 	}
 * 	if ast.IsTypeLiteralNode(node) && len(node.Members()) == 1 {
 * 		t := c.getDeclaredTypeOfSymbol(symbol)
 * 		return t.flags&TypeFlagsUnion != 0 && c.allTypesAssignableToKindEx(t, TypeFlagsStringOrNumberLiteral, true /*strict* /)
 * 	}
 * 	return false
 * }
 */
export function Checker_maybeMappedType(receiver: GoPtr<Checker>, node: GoPtr<Node>, symbol_: GoPtr<Symbol>): bool {
  for (;;) {
    node = node!.Parent;
    if (!(IsComputedPropertyName(node) || IsPropertySignatureDeclaration(node))) {
      break;
    }
  }
  if (IsTypeLiteralNode(node) && (Node_Members(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())).length === 1) {
    const t = Checker_getDeclaredTypeOfSymbol(receiver, symbol_);
    return ((t!.flags & TypeFlagsUnion) !== 0 && Checker_allTypesAssignableToKindEx(receiver, t, TypeFlagsStringOrNumberLiteral, true as bool)) as bool;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkJSDocType","kind":"method","status":"implemented","sigHash":"3b1ab262deb56c26cf8c5a30b9f738c70cfe979bcd65fe64958e2df4d1dd79bf"}
 *
 * Go source:
 * func (c *Checker) checkJSDocType(node *ast.Node) {
 * 	c.checkJSDocTypeIsInJsFile(node)
 * 	node.ForEachChild(c.checkSourceElement)
 * }
 */
export function Checker_checkJSDocType(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Checker_checkJSDocTypeIsInJsFile(receiver, node);
  Node_ForEachChild(node, (n: GoPtr<Node>): bool => Checker_checkSourceElement(receiver, n));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkJSDocTypeIsInJsFile","kind":"method","status":"implemented","sigHash":"6d9e95f1932b5296358d275bb876bd92d640855efebdb334cab166aa10113dab"}
 *
 * Go source:
 * func (c *Checker) checkJSDocTypeIsInJsFile(node *ast.Node) {
 * 	if !ast.IsInJSFile(node) {
 * 		if ast.IsJSDocNonNullableType(node) || ast.IsJSDocNullableType(node) {
 * 			token := core.IfElse(ast.IsJSDocNonNullableType(node), "!", "?")
 * 			postfix := node.Pos() == node.Type().Pos()
 * 			message := core.IfElse(postfix,
 * 				diagnostics.X_0_at_the_end_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1,
 * 				diagnostics.X_0_at_the_start_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1)
 * 			t := c.getTypeFromTypeNode(node.Type())
 * 			if ast.IsJSDocNullableType(node) && t != c.neverType && t != c.voidType {
 * 				t = c.getNullableType(t, core.IfElse(postfix, TypeFlagsUndefined, TypeFlagsNullable))
 * 			}
 * 			c.grammarErrorOnNode(node, message, token, c.TypeToString(t))
 * 		} else {
 * 			c.grammarErrorOnNode(node, diagnostics.JSDoc_types_can_only_be_used_inside_documentation_comments)
 * 		}
 * 	}
 * }
 */
export function Checker_checkJSDocTypeIsInJsFile(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  if (!IsInJSFile(node)) {
    if (IsJSDocNonNullableType(node) || IsJSDocNullableType(node)) {
      const token = IsJSDocNonNullableType(node) ? "!" : "?";
      const postfix = Node_Pos(node) === Node_Pos(Node_Type(node));
      const message = postfix ?
        diagnosticsMessages.X_0_at_the_end_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1 :
        diagnosticsMessages.X_0_at_the_start_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1;
      let t = Checker_getTypeFromTypeNode(receiver, Node_Type(node));
      if (IsJSDocNullableType(node) && t !== receiver!.neverType && t !== receiver!.voidType) {
        t = Checker_getNullableType(receiver, t, postfix ? TypeFlagsUndefined : TypeFlagsNullable);
      }
      Checker_grammarErrorOnNode(receiver, node, message, token, Checker_TypeToString(receiver, t));
    } else {
      Checker_grammarErrorOnNode(receiver, node, diagnosticsMessages.JSDoc_types_can_only_be_used_inside_documentation_comments);
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTypeReferenceNode","kind":"method","status":"implemented","sigHash":"9745d006536d48b93c7f889b9b9952ccd40c1a2bc3bc8910737940ceb09e277d"}
 *
 * Go source:
 * func (c *Checker) checkTypeReferenceNode(node *ast.Node) {
 * 	c.checkGrammarTypeArguments(node, node.TypeArgumentList())
 * 	if ast.IsTypeReferenceNode(node) && node.Flags&ast.NodeFlagsJSDoc == 0 {
 * 		data := node.AsTypeReferenceNode()
 * 		if data.TypeArguments != nil && data.TypeName.End() != data.TypeArguments.Pos() {
 * 			// If there was a token between the type name and the type arguments, check if it was a DotToken
 * 			sourceFile := ast.GetSourceFileOfNode(node)
 * 			if scanner.ScanTokenAtPosition(sourceFile, data.TypeName.End()) == ast.KindDotToken {
 * 				c.grammarErrorAtPos(node, scanner.SkipTrivia(sourceFile.Text(), data.TypeName.End()), 1, diagnostics.JSDoc_types_can_only_be_used_inside_documentation_comments)
 * 			}
 * 		}
 * 	}
 * 	c.checkSourceElements(node.TypeArguments())
 * 	c.checkTypeReferenceOrImport(node)
 * }
 */
export function Checker_checkTypeReferenceNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Checker_checkGrammarTypeArguments(receiver, node, Node_TypeArgumentList(node));
  if (IsTypeReferenceNode(node) && (node!.Flags & NodeFlagsJSDoc) === 0) {
    const data = AsTypeReferenceNode(node)!;
    const typeArguments = Node_TypeArgumentList(node);
    if (typeArguments !== undefined && Node_End(data.TypeName) !== NodeList_Pos(typeArguments)) {
      const sourceFile = GetSourceFileOfNode(node);
      if (ScanTokenAtPosition(sourceFile, Node_End(data.TypeName)) === KindDotToken) {
        Checker_grammarErrorAtPos(receiver, node, SkipTrivia(SourceFile_Text(sourceFile), Node_End(data.TypeName)), 1, diagnosticsMessages.JSDoc_types_can_only_be_used_inside_documentation_comments);
      }
    }
  }
  Checker_checkSourceElements(receiver, Node_TypeArguments(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()));
  Checker_checkTypeReferenceOrImport(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTypeQuery","kind":"method","status":"implemented","sigHash":"fc6f50eea4bec442e4551997235991c4be82dae7716154df5510d8c1101e70df"}
 *
 * Go source:
 * func (c *Checker) checkTypeQuery(node *ast.Node) {
 * 	c.getTypeFromTypeQueryNode(node)
 * }
 */
export function Checker_checkTypeQuery(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Checker_getTypeFromTypeQueryNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTypeLiteral","kind":"method","status":"implemented","sigHash":"4ccfee855a8de4063ba6cdf23ecc3508218fc41076f81a423d9739784f803e1f"}
 *
 * Go source:
 * func (c *Checker) checkTypeLiteral(node *ast.Node) {
 * 	c.checkSourceElements(node.Members())
 * 	t := c.getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node)
 * 	c.checkIndexConstraints(t, t.symbol, false /*isStaticIndex* /)
 * 	c.checkTypeForDuplicateIndexSignatures(node)
 * 	c.checkObjectTypeForDuplicateDeclarations(node, false /*checkPrivateNames* /)
 * }
 */
export function Checker_checkTypeLiteral(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Checker_checkSourceElements(receiver, Node_Members(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()));
  const t = Checker_getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(receiver, node);
  Checker_checkIndexConstraints(receiver, t, t!.symbol, false);
  Checker_checkTypeForDuplicateIndexSignatures(receiver, node);
  Checker_checkObjectTypeForDuplicateDeclarations(receiver, node, false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkArrayType","kind":"method","status":"implemented","sigHash":"0d8439e52aa6360998b56025dc871d69a2d7c30c141ca031304582bd0d4cc9b9"}
 *
 * Go source:
 * func (c *Checker) checkArrayType(node *ast.Node) {
 * 	c.checkSourceElement(node.AsArrayTypeNode().ElementType)
 * }
 */
export function Checker_checkArrayType(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Checker_checkSourceElement(receiver, AsArrayTypeNode(node)!.ElementType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTupleType","kind":"method","status":"implemented","sigHash":"d102df18f0968b636d73e17c9c9393b1fae6263c71bb65dbf40cd06628f8effc"}
 *
 * Go source:
 * func (c *Checker) checkTupleType(node *ast.Node) {
 * 	seenOptionalElement := false
 * 	seenRestElement := false
 * 	elements := node.Elements()
 * 	for _, e := range elements {
 * 		flags := c.getTupleElementFlags(e)
 * 		if flags&ElementFlagsVariadic != 0 {
 * 			t := c.getTypeFromTypeNode(e.Type())
 * 			if !c.isArrayLikeType(t) {
 * 				c.error(e, diagnostics.A_rest_element_type_must_be_an_array_type)
 * 				break
 * 			}
 * 			if c.isArrayType(t) || isTupleType(t) && t.TargetTupleType().combinedFlags&ElementFlagsRest != 0 {
 * 				flags |= ElementFlagsRest
 * 			}
 * 		}
 * 		if flags&ElementFlagsRest != 0 {
 * 			if seenRestElement {
 * 				c.grammarErrorOnNode(e, diagnostics.A_rest_element_cannot_follow_another_rest_element)
 * 				break
 * 			}
 * 			seenRestElement = true
 * 		} else if flags&ElementFlagsOptional != 0 {
 * 			if seenRestElement {
 * 				c.grammarErrorOnNode(e, diagnostics.An_optional_element_cannot_follow_a_rest_element)
 * 				break
 * 			}
 * 			seenOptionalElement = true
 * 		} else if flags&ElementFlagsRequired != 0 && seenOptionalElement {
 * 			c.grammarErrorOnNode(e, diagnostics.A_required_element_cannot_follow_an_optional_element)
 * 			break
 * 		}
 * 	}
 * 	c.checkSourceElements(elements)
 * 	c.getTypeFromTypeNode(node)
 * }
 */
export function Checker_checkTupleType(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  let seenOptionalElement = false;
  let seenRestElement = false;
  const elements = Node_Elements(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
  for (const e of elements) {
    let flags = Checker_getTupleElementFlags(receiver, e);
    if ((flags & ElementFlagsVariadic) !== 0) {
      const t = Checker_getTypeFromTypeNode(receiver, Node_Type(e));
      if (!Checker_isArrayLikeType(receiver, t)) {
        Checker_error(receiver, e, diagnosticsMessages.A_rest_element_type_must_be_an_array_type);
        break;
      }
      if (Checker_isArrayType(receiver, t) || (isTupleType(t) && (Type_TargetTupleType(t)!.combinedFlags & ElementFlagsRest) !== 0)) {
        flags |= ElementFlagsRest;
      }
    }
    if ((flags & ElementFlagsRest) !== 0) {
      if (seenRestElement) {
        Checker_grammarErrorOnNode(receiver, e, diagnosticsMessages.A_rest_element_cannot_follow_another_rest_element);
        break;
      }
      seenRestElement = true;
    } else if ((flags & ElementFlagsOptionalFlag) !== 0) {
      if (seenRestElement) {
        Checker_grammarErrorOnNode(receiver, e, diagnosticsMessages.An_optional_element_cannot_follow_a_rest_element);
        break;
      }
      seenOptionalElement = true;
    } else if ((flags & ElementFlagsRequired) !== 0 && seenOptionalElement) {
      Checker_grammarErrorOnNode(receiver, e, diagnosticsMessages.A_required_element_cannot_follow_an_optional_element);
      break;
    }
  }
  Checker_checkSourceElements(receiver, elements);
  Checker_getTypeFromTypeNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkUnionOrIntersectionType","kind":"method","status":"implemented","sigHash":"a514df82859f115db992314eda9c5baea8e7cbd0b913ddf9e082446956e2da7a"}
 *
 * Go source:
 * func (c *Checker) checkUnionOrIntersectionType(node *ast.Node) {
 * 	node.ForEachChild(c.checkSourceElement)
 * 	c.getTypeFromTypeNode(node)
 * }
 */
export function Checker_checkUnionOrIntersectionType(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Node_ForEachChild(node, (n: GoPtr<Node>): bool => Checker_checkSourceElement(receiver, n));
  Checker_getTypeFromTypeNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTypeOperator","kind":"method","status":"implemented","sigHash":"7362493f2eda1b538abc49ee80e627ce9f7afb0fe5569483932bb70fe3c764b8"}
 *
 * Go source:
 * func (c *Checker) checkTypeOperator(node *ast.Node) {
 * 	c.checkGrammarTypeOperatorNode(node.AsTypeOperatorNode())
 * 	c.checkSourceElement(node.Type())
 * }
 */
export function Checker_checkTypeOperator(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Checker_checkGrammarTypeOperatorNode(receiver, AsTypeOperatorNode(node));
  Checker_checkSourceElement(receiver, Node_Type(node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkConditionalType","kind":"method","status":"implemented","sigHash":"e2cf15a21760346f6d3401df8540f0e5c8f17befcf11ab073cf35cb05fc593e9"}
 *
 * Go source:
 * func (c *Checker) checkConditionalType(node *ast.Node) {
 * 	node.ForEachChild(c.checkSourceElement)
 * }
 */
export function Checker_checkConditionalType(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Node_ForEachChild(node, (n: GoPtr<Node>): bool => Checker_checkSourceElement(receiver, n));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTemplateLiteralType","kind":"method","status":"implemented","sigHash":"aacf21df97a73178989a860477bd67a5f187dda0494208485b06c998d36e5705"}
 *
 * Go source:
 * func (c *Checker) checkTemplateLiteralType(node *ast.Node) {
 * 	for _, span := range node.AsTemplateLiteralTypeNode().TemplateSpans.Nodes {
 * 		c.checkSourceElement(span.Type())
 * 		t := c.getTypeFromTypeNode(span.Type())
 * 		c.checkTypeAssignableTo(t, c.templateConstraintType, span.Type(), nil)
 * 	}
 * 	c.getTypeFromTypeNode(node)
 * }
 */
export function Checker_checkTemplateLiteralType(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  for (const span of AsTemplateLiteralTypeNode(node)!.TemplateSpans!.Nodes) {
    Checker_checkSourceElement(receiver, Node_Type(span));
    const t = Checker_getTypeFromTypeNode(receiver, Node_Type(span));
    Checker_checkTypeAssignableTo(receiver, t, receiver!.templateConstraintType, Node_Type(span), undefined);
  }
  Checker_getTypeFromTypeNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkMappedType","kind":"method","status":"implemented","sigHash":"a1376485e28a6b8422411f6db78231d5eb1994af7c2187a4ca570a470fcc9a7c"}
 *
 * Go source:
 * func (c *Checker) checkMappedType(node *ast.Node) {
 * 	mappedTypeNode := node.AsMappedTypeNode()
 * 	c.checkGrammarMappedType(mappedTypeNode)
 * 	c.checkSourceElement(mappedTypeNode.TypeParameter)
 * 	c.checkSourceElement(mappedTypeNode.NameType)
 * 	c.checkSourceElement(mappedTypeNode.Type)
 * 	if mappedTypeNode.Type == nil {
 * 		c.reportImplicitAny(node, c.anyType, WideningKindNormal)
 * 	}
 * 	t := c.getTypeFromMappedTypeNode(node)
 * 	nameType := c.getNameTypeFromMappedType(t)
 * 	if nameType != nil {
 * 		c.checkTypeAssignableTo(nameType, c.stringNumberSymbolType, mappedTypeNode.NameType, nil)
 * 	} else {
 * 		constraintType := c.getConstraintTypeFromMappedType(t)
 * 		c.checkTypeAssignableTo(constraintType, c.stringNumberSymbolType, mappedTypeNode.TypeParameter.AsTypeParameterDeclaration().Constraint, nil)
 * 	}
 * }
 */
export function Checker_checkMappedType(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  const mappedTypeNode = AsMappedTypeNode(node)!;
  Checker_checkGrammarMappedType(receiver, mappedTypeNode);
  Checker_checkSourceElement(receiver, mappedTypeNode.TypeParameter);
  Checker_checkSourceElement(receiver, mappedTypeNode.NameType);
  Checker_checkSourceElement(receiver, mappedTypeNode.Type);
  if (mappedTypeNode.Type === undefined) {
    Checker_reportImplicitAny(receiver, node, receiver!.anyType, WideningKindNormal);
  }
  const t = Checker_getTypeFromMappedTypeNode(receiver, node);
  const nameType = Checker_getNameTypeFromMappedType(receiver, t);
  if (nameType !== undefined) {
    Checker_checkTypeAssignableTo(receiver, nameType, receiver!.stringNumberSymbolType, mappedTypeNode.NameType, undefined);
  } else {
    const constraintType = Checker_getConstraintTypeFromMappedType(receiver, t);
    Checker_checkTypeAssignableTo(receiver, constraintType, receiver!.stringNumberSymbolType, AsTypeParameterDeclaration(mappedTypeNode.TypeParameter)!.Constraint, undefined);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkAllCodePathsInNonVoidFunctionReturnOrThrow","kind":"method","status":"implemented","sigHash":"af63fc1e03cbdb0c8bacd28ac73d31b7fe6af3bb170123f9b53e158dfa18ca4f"}
 *
 * Go source:
 * func (c *Checker) checkAllCodePathsInNonVoidFunctionReturnOrThrow(fn *ast.Node, returnType *Type) {
 * 	functionFlags := ast.GetFunctionFlags(fn)
 * 	var t *Type
 * 	if returnType != nil {
 * 		t = c.unwrapReturnType(returnType, functionFlags)
 * 	}
 * 	// Functions with an explicitly specified return type that includes `void` or is exactly `any` or `undefined` don't
 * 	// need any return statements.
 * 	if t != nil && (c.maybeTypeOfKind(t, TypeFlagsVoid) || t.flags&(TypeFlagsAny|TypeFlagsUndefined) != 0) {
 * 		return
 * 	}
 * 	// If all we have is a function signature, or an arrow function with an expression body, then there is nothing to check.
 * 	// also if HasImplicitReturn flag is not set this means that all codepaths in function body end with return or throw
 * 	if ast.IsMethodSignatureDeclaration(fn) || ast.NodeIsMissing(fn.Body()) || !ast.IsBlock(fn.Body()) || !c.functionHasImplicitReturn(fn) {
 * 		return
 * 	}
 * 	hasExplicitReturn := fn.Flags&ast.NodeFlagsHasExplicitReturn != 0
 * 	errorNode := fn.Type()
 * 	if errorNode == nil {
 * 		if data := fn.FunctionLikeData(); data != nil && data.FullSignature != nil {
 * 			errorNode = data.FullSignature
 * 		}
 * 	}
 * 	if errorNode == nil {
 * 		errorNode = fn
 * 	}
 * 	switch {
 * 	case t != nil && t.flags&TypeFlagsNever != 0:
 * 		c.error(errorNode, diagnostics.A_function_returning_never_cannot_have_a_reachable_end_point)
 * 	case t != nil && !hasExplicitReturn:
 * 		// minimal check: function has syntactic return type annotation and no explicit return statements in the body
 * 		// this function does not conform to the specification.
 * 		c.error(errorNode, diagnostics.A_function_whose_declared_type_is_neither_undefined_void_nor_any_must_return_a_value)
 * 	case t != nil && c.strictNullChecks && !c.isTypeAssignableTo(c.undefinedType, t):
 * 		c.error(errorNode, diagnostics.Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined)
 * 	case c.compilerOptions.NoImplicitReturns == core.TSTrue:
 * 		if t == nil {
 * 			// If return type annotation is omitted check if function has any explicit return statements.
 * 			// If it does not have any - its inferred return type is void - don't do any checks.
 * 			// Otherwise get inferred return type from function body and report error only if it is not void / anytype
 * 			if !hasExplicitReturn {
 * 				return
 * 			}
 * 			inferredReturnType := c.getReturnTypeOfSignature(c.getSignatureFromDeclaration(fn))
 * 			if c.isUnwrappedReturnTypeUndefinedVoidOrAny(fn, inferredReturnType) {
 * 				return
 * 			}
 * 		}
 * 		c.error(errorNode, diagnostics.Not_all_code_paths_return_a_value)
 * 	}
 * }
 */
export function Checker_checkAllCodePathsInNonVoidFunctionReturnOrThrow(receiver: GoPtr<Checker>, fn: GoPtr<Node>, returnType: GoPtr<Type>): void {
  const functionFlags = GetFunctionFlags(fn);
  let t: GoPtr<Type>;
  if (returnType !== undefined) {
    t = Checker_unwrapReturnType(receiver, returnType, functionFlags);
  }
  if (t !== undefined && (Checker_maybeTypeOfKind(receiver, t, TypeFlagsVoid) || (t!.flags & (TypeFlagsAny | TypeFlagsUndefined)) !== 0)) {
    return;
  }
  const body = Node_Body(fn);
  if (IsMethodSignatureDeclaration(fn) || NodeIsMissing(body) || !IsBlock(body) || !Checker_functionHasImplicitReturn(receiver, fn)) {
    return;
  }
  const hasExplicitReturn = ((fn!.Flags & NodeFlagsHasExplicitReturn) !== 0) as bool;
  let errorNode = Node_Type(fn);
  if (errorNode === undefined) {
    const data = Node_FunctionLikeData(fn);
    if (data !== undefined && data.FullSignature !== undefined) {
      errorNode = data.FullSignature as GoPtr<Node>;
    }
  }
  if (errorNode === undefined) {
    errorNode = fn;
  }
  if (t !== undefined && (t!.flags & TypeFlagsNever) !== 0) {
    Checker_error(receiver, errorNode, diagnosticsMessages.A_function_returning_never_cannot_have_a_reachable_end_point);
  } else if (t !== undefined && !hasExplicitReturn) {
    Checker_error(receiver, errorNode, diagnosticsMessages.A_function_whose_declared_type_is_neither_undefined_void_nor_any_must_return_a_value);
  } else if (t !== undefined && receiver!.strictNullChecks && !Checker_isTypeAssignableTo(receiver, receiver!.undefinedType, t)) {
    Checker_error(receiver, errorNode, diagnosticsMessages.Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined);
  } else if (receiver!.compilerOptions!.NoImplicitReturns === TSTrue) {
    if (t === undefined) {
      if (!hasExplicitReturn) {
        return;
      }
      const inferredReturnType = Checker_getReturnTypeOfSignature(receiver, Checker_getSignatureFromDeclaration(receiver, fn));
      if (Checker_isUnwrappedReturnTypeUndefinedVoidOrAny(receiver, fn, inferredReturnType)) {
        return;
      }
    }
    Checker_error(receiver, errorNode, diagnosticsMessages.Not_all_code_paths_return_a_value);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkBaseTypeAccessibility","kind":"method","status":"implemented","sigHash":"56c0c1212d7d83aaf82e135d984976a7039ba3679f10d86a909d8210510ce86e"}
 *
 * Go source:
 * func (c *Checker) checkBaseTypeAccessibility(t *Type, node *ast.Node) {
 * 	signatures := c.getSignaturesOfType(t, SignatureKindConstruct)
 * 	if len(signatures) != 0 {
 * 		declaration := signatures[0].declaration
 * 		if declaration != nil && ast.HasModifier(declaration, ast.ModifierFlagsPrivate) {
 * 			typeClassDeclaration := ast.GetClassLikeDeclarationOfSymbol(t.symbol)
 * 			if !c.isNodeWithinClass(node, typeClassDeclaration) {
 * 				c.error(node, diagnostics.Cannot_extend_a_class_0_Class_constructor_is_marked_as_private, c.getFullyQualifiedName(t.symbol, nil))
 * 			}
 * 		}
 * 	}
 * }
 */
export function Checker_checkBaseTypeAccessibility(receiver: GoPtr<Checker>, t: GoPtr<Type>, node: GoPtr<Node>): void {
  const signatures = Checker_getSignaturesOfType(receiver, t, SignatureKindConstruct);
  if (signatures.length !== 0) {
    const declaration = GoSliceLoad(signatures, 0, GoPointerValueOps<Signature>())!.declaration;
    if (declaration !== undefined && HasModifier(declaration, ModifierFlagsPrivate)) {
      const typeClassDeclaration = GetClassLikeDeclarationOfSymbol(t!["symbol"]);
      if (!Checker_isNodeWithinClass(receiver, node, typeClassDeclaration)) {
        Checker_error(receiver, node, diagnosticsMessages.Cannot_extend_a_class_0_Class_constructor_is_marked_as_private, Checker_getFullyQualifiedName(receiver, t!["symbol"], undefined));
      }
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkIteratedTypeOrElementType","kind":"method","status":"implemented","sigHash":"82347bfb356255809accbb0d142c51cfcc4f2cbb43dd1dbd9cb653237fed42f9"}
 *
 * Go source:
 * func (c *Checker) checkIteratedTypeOrElementType(use IterationUse, inputType *Type, sentType *Type, errorNode *ast.Node) *Type {
 * 	if IsTypeAny(inputType) {
 * 		return inputType
 * 	}
 * 	t := c.getIteratedTypeOrElementType(use, inputType, sentType, errorNode, true /*checkAssignability* /)
 * 	if t != nil {
 * 		return t
 * 	}
 * 	return c.anyType
 * }
 */
export function Checker_checkIteratedTypeOrElementType(receiver: GoPtr<Checker>, use: IterationUse, inputType: GoPtr<Type>, sentType: GoPtr<Type>, errorNode: GoPtr<Node>): GoPtr<Type> {
  if (IsTypeAny(inputType)) {
    return inputType;
  }
  const t = Checker_getIteratedTypeOrElementType(receiver, use, inputType, sentType, errorNode, true);
  if (t !== undefined) {
    return t;
  }
  return receiver!.anyType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIteratedTypeOrElementType","kind":"method","status":"implemented","sigHash":"0f0d4a167758d8fc19cee150bca9739b72c2d7ce0eb1f448d803a9ba7191902b"}
 *
 * Go source:
 * func (c *Checker) getIteratedTypeOrElementType(use IterationUse, inputType *Type, sentType *Type, errorNode *ast.Node, checkAssignability bool) *Type {
 * 	allowAsyncIterables := (use & IterationUseAllowsAsyncIterablesFlag) != 0
 * 	if inputType == c.neverType {
 * 		if errorNode != nil {
 * 			c.reportTypeNotIterableError(errorNode, inputType, allowAsyncIterables)
 * 		}
 * 		return nil
 * 	}
 * 	iterableExists := c.getGlobalIterableType() != c.emptyGenericType
 * 	possibleOutOfBounds := c.compilerOptions.NoUncheckedIndexedAccess == core.TSTrue && use&IterationUsePossiblyOutOfBounds != 0
 * 	if iterableExists || allowAsyncIterables {
 * 		iterationTypes := c.getIterationTypesOfIterable(inputType, use, core.IfElse(iterableExists, errorNode, nil))
 * 		if checkAssignability {
 * 			if iterationTypes.nextType != nil {
 * 				var diagnostic *diagnostics.Message
 * 				switch {
 * 				case use&IterationUseForOfFlag != 0:
 * 					diagnostic = diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_for_of_will_always_send_0
 * 				case use&IterationUseSpreadFlag != 0:
 * 					diagnostic = diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_spread_will_always_send_0
 * 				case use&IterationUseDestructuringFlag != 0:
 * 					diagnostic = diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_destructuring_will_always_send_0
 * 				case use&IterationUseYieldStarFlag != 0:
 * 					diagnostic = diagnostics.Cannot_delegate_iteration_to_value_because_the_next_method_of_its_iterator_expects_type_1_but_the_containing_generator_will_always_send_0
 * 				}
 * 				if diagnostic != nil {
 * 					c.checkTypeAssignableTo(sentType, iterationTypes.nextType, errorNode, diagnostic)
 * 				}
 * 			}
 * 		}
 * 		if iterationTypes.yieldType != nil || iterableExists {
 * 			if iterationTypes.yieldType == nil {
 * 				return nil
 * 			}
 * 			if possibleOutOfBounds {
 * 				return c.includeUndefinedInIndexSignature(iterationTypes.yieldType)
 * 			}
 * 			return iterationTypes.yieldType
 * 		}
 * 	}
 * 	arrayType := inputType
 * 	hasStringConstituent := false
 * 	// If strings are permitted, remove any string-like constituents from the array type.
 * 	// This allows us to find other non-string element types from an array unioned with
 * 	// a string.
 * 	if use&IterationUseAllowsStringInputFlag != 0 {
 * 		if arrayType.flags&TypeFlagsUnion != 0 {
 * 			// After we remove all types that are StringLike, we will know if there was a string constituent
 * 			// based on whether the result of filter is a new array.
 * 			arrayTypes := inputType.Types()
 * 			filteredTypes := core.Filter(arrayTypes, func(t *Type) bool {
 * 				return t.flags&TypeFlagsStringLike == 0
 * 			})
 * 			if !core.Same(filteredTypes, arrayTypes) {
 * 				arrayType = c.getUnionTypeEx(filteredTypes, UnionReductionSubtype, nil, nil)
 * 			}
 * 		} else if arrayType.flags&TypeFlagsStringLike != 0 {
 * 			arrayType = c.neverType
 * 		}
 * 		hasStringConstituent = arrayType != inputType
 * 		if hasStringConstituent {
 * 			// Now that we've removed all the StringLike types, if no constituents remain, then the entire
 * 			// arrayOrStringType was a string.
 * 			if arrayType.flags&TypeFlagsNever != 0 {
 * 				if possibleOutOfBounds {
 * 					return c.includeUndefinedInIndexSignature(c.stringType)
 * 				}
 * 				return c.stringType
 * 			}
 * 		}
 * 	}
 * 	if !c.isArrayLikeType(arrayType) {
 * 		if errorNode != nil {
 * 			// Which error we report depends on whether we allow strings or if there was a
 * 			// string constituent. For example, if the input type is number | string, we
 * 			// want to say that number is not an array type. But if the input was just
 * 			// number and string input is allowed, we want to say that number is not an
 * 			// array type or a string type.
 * 			allowsStrings := use&IterationUseAllowsStringInputFlag != 0 && !hasStringConstituent
 * 			defaultDiagnostic, maybeMissingAwait := c.getIterationDiagnosticDetails(use, inputType, allowsStrings)
 * 			c.errorAndMaybeSuggestAwait(errorNode, maybeMissingAwait && c.getAwaitedTypeOfPromise(arrayType) != nil, defaultDiagnostic, c.TypeToString(arrayType))
 * 		}
 * 		if hasStringConstituent {
 * 			if possibleOutOfBounds {
 * 				return c.includeUndefinedInIndexSignature(c.stringType)
 * 			}
 * 			return c.stringType
 * 		}
 * 		return nil
 * 	}
 * 	arrayElementType := c.getIndexTypeOfType(arrayType, c.numberType)
 * 	if hasStringConstituent && arrayElementType != nil {
 * 		// This is just an optimization for the case where arrayOrStringType is string | string[]
 * 		if arrayElementType.flags&TypeFlagsStringLike != 0 && c.compilerOptions.NoUncheckedIndexedAccess != core.TSTrue {
 * 			return c.stringType
 * 		}
 * 		if possibleOutOfBounds {
 * 			return c.getUnionTypeEx([]*Type{arrayElementType, c.stringType, c.undefinedType}, UnionReductionSubtype, nil, nil)
 * 		}
 * 		return c.getUnionTypeEx([]*Type{arrayElementType, c.stringType}, UnionReductionSubtype, nil, nil)
 * 	}
 * 	if use&IterationUsePossiblyOutOfBounds != 0 {
 * 		return c.includeUndefinedInIndexSignature(arrayElementType)
 * 	}
 * 	return arrayElementType
 * }
 */
export function Checker_getIteratedTypeOrElementType(receiver: GoPtr<Checker>, use: IterationUse, inputType: GoPtr<Type>, sentType: GoPtr<Type>, errorNode: GoPtr<Node>, checkAssignability: bool): GoPtr<Type> {
  const allowAsyncIterables = (use & IterationUseAllowsAsyncIterablesFlag) !== 0;
  if (inputType === receiver!.neverType) {
    if (errorNode !== undefined) {
      Checker_reportTypeNotIterableError(receiver, errorNode, inputType, allowAsyncIterables);
    }
    return undefined;
  }
  const iterableExists = receiver!.getGlobalIterableType!() !== receiver!.emptyGenericType;
  const possibleOutOfBounds = receiver!.compilerOptions!.NoUncheckedIndexedAccess === TSTrue && (use & IterationUsePossiblyOutOfBounds) !== 0;
  if (iterableExists || allowAsyncIterables) {
    const iterationTypes = Checker_getIterationTypesOfIterable(receiver, inputType, use, core.IfElse(iterableExists, errorNode, undefined));
    if (checkAssignability) {
      if (iterationTypes.nextType !== undefined) {
        let diagnostic: GoPtr<Message>;
        if ((use & IterationUseForOfFlag) !== 0) {
          diagnostic = diagnosticsMessages.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_for_of_will_always_send_0;
        } else if ((use & IterationUseSpreadFlag) !== 0) {
          diagnostic = diagnosticsMessages.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_spread_will_always_send_0;
        } else if ((use & IterationUseDestructuringFlag) !== 0) {
          diagnostic = diagnosticsMessages.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_destructuring_will_always_send_0;
        } else if ((use & IterationUseYieldStarFlag) !== 0) {
          diagnostic = diagnosticsMessages.Cannot_delegate_iteration_to_value_because_the_next_method_of_its_iterator_expects_type_1_but_the_containing_generator_will_always_send_0;
        }
        if (diagnostic !== undefined) {
          Checker_checkTypeAssignableTo(receiver, sentType, iterationTypes.nextType, errorNode, diagnostic);
        }
      }
    }
    if (iterationTypes.yieldType !== undefined || iterableExists) {
      if (iterationTypes.yieldType === undefined) {
        return undefined;
      }
      if (possibleOutOfBounds) {
        return Checker_includeUndefinedInIndexSignature(receiver, iterationTypes.yieldType);
      }
      return iterationTypes.yieldType;
    }
  }
  let arrayType = inputType;
  let hasStringConstituent = false;
  if ((use & IterationUseAllowsStringInputFlag) !== 0) {
    if ((arrayType!.flags & TypeFlagsUnion) !== 0) {
      const arrayTypes = Type_Types(inputType)!;
      const filteredTypes = core.Filter(arrayTypes, (ty: GoPtr<Type>): bool => (ty!.flags & TypeFlagsStringLike) === 0);
      if (!core.Same(filteredTypes, arrayTypes)) {
        arrayType = Checker_getUnionTypeEx(receiver, filteredTypes, UnionReductionSubtype, undefined, undefined);
      }
    } else if ((arrayType!.flags & TypeFlagsStringLike) !== 0) {
      arrayType = receiver!.neverType;
    }
    hasStringConstituent = arrayType !== inputType;
    if (hasStringConstituent) {
      if ((arrayType!.flags & TypeFlagsNever) !== 0) {
        if (possibleOutOfBounds) {
          return Checker_includeUndefinedInIndexSignature(receiver, receiver!.stringType);
        }
        return receiver!.stringType;
      }
    }
  }
  if (!Checker_isArrayLikeType(receiver, arrayType)) {
    if (errorNode !== undefined) {
      const allowsStrings = (use & IterationUseAllowsStringInputFlag) !== 0 && !hasStringConstituent;
      const [defaultDiagnostic, maybeMissingAwait] = Checker_getIterationDiagnosticDetails(receiver, use, inputType, allowsStrings);
      Checker_errorAndMaybeSuggestAwait(receiver, errorNode, maybeMissingAwait && Checker_getAwaitedTypeOfPromise(receiver, arrayType) !== undefined, defaultDiagnostic, Checker_TypeToString(receiver, arrayType));
    }
    if (hasStringConstituent) {
      if (possibleOutOfBounds) {
        return Checker_includeUndefinedInIndexSignature(receiver, receiver!.stringType);
      }
      return receiver!.stringType;
    }
    return undefined;
  }
  const arrayElementType = Checker_getIndexTypeOfType(receiver, arrayType, receiver!.numberType);
  if (hasStringConstituent && arrayElementType !== undefined) {
    if ((arrayElementType!.flags & TypeFlagsStringLike) !== 0 && receiver!.compilerOptions!.NoUncheckedIndexedAccess !== TSTrue) {
      return receiver!.stringType;
    }
    if (possibleOutOfBounds) {
      return Checker_getUnionTypeEx(receiver, GoSliceBuild(3, 3, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, arrayElementType, GoPointerValueOps<Type>());
        GoSliceStore(__goSliceLiteral, 1, receiver!.stringType, GoPointerValueOps<Type>());
        GoSliceStore(__goSliceLiteral, 2, receiver!.undefinedType, GoPointerValueOps<Type>());
      }), UnionReductionSubtype, undefined, undefined);
    }
    return Checker_getUnionTypeEx(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, arrayElementType, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, receiver!.stringType, GoPointerValueOps<Type>());
    }), UnionReductionSubtype, undefined, undefined);
  }
  if ((use & IterationUsePossiblyOutOfBounds) !== 0) {
    return Checker_includeUndefinedInIndexSignature(receiver, arrayElementType);
  }
  return arrayElementType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypeOfIterable","kind":"method","status":"implemented","sigHash":"a882547158ebdb8689fc388efa57a61778d8bcb94f48f40f07680e05d2bdbddc"}
 *
 * Go source:
 * func (c *Checker) getIterationTypeOfIterable(use IterationUse, typeKind IterationTypeKind, inputType *Type, errorNode *ast.Node) *Type {
 * 	if IsTypeAny(inputType) {
 * 		return nil
 * 	}
 * 	iterationTypes := c.getIterationTypesOfIterable(inputType, use, errorNode)
 * 	return iterationTypes.getType(typeKind)
 * }
 */
export function Checker_getIterationTypeOfIterable(receiver: GoPtr<Checker>, use: IterationUse, typeKind: IterationTypeKind, inputType: GoPtr<Type>, errorNode: GoPtr<Node>): GoPtr<Type> {
  if (IsTypeAny(inputType)) {
    return undefined;
  }
  const iterationTypes = Checker_getIterationTypesOfIterable(receiver, inputType, use, errorNode);
  return IterationTypes_getType(iterationTypes, typeKind);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIterable","kind":"method","status":"implemented","sigHash":"3ca82a75c7b11c7d949b4583227775841e50eb3f77e8142dc9c7a0513bc7e4d6"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIterable(t *Type, use IterationUse, errorNode *ast.Node) IterationTypes {
 * 	t = c.getReducedType(t)
 * 	if IsTypeAny(t) {
 * 		return IterationTypes{c.anyType, c.anyType, c.anyType}
 * 	}
 * 	key := IterationTypesKey{typeId: t.id, use: use & IterationUseCacheFlags}
 * 	// If we are reporting errors and encounter a cached `noIterationTypes`, we should ignore the cached value and continue as if nothing was cached.
 * 	// In addition, we should not cache any new results for this call.
 * 	noCache := false
 * 	if cached, ok := c.iterationTypesCache[key]; ok {
 * 		if errorNode == nil || cached.hasTypes() {
 * 			return cached
 * 		}
 * 		noCache = true
 * 	}
 * 	result := c.getIterationTypesOfIterableWorker(t, use, errorNode, noCache)
 * 	if !noCache {
 * 		c.iterationTypesCache[key] = result
 * 	}
 * 	return result
 * }
 */
export function Checker_getIterationTypesOfIterable(receiver: GoPtr<Checker>, t: GoPtr<Type>, use: IterationUse, errorNode: GoPtr<Node>): IterationTypes {
  t = Checker_getReducedType(receiver, t);
  if (IsTypeAny(t)) {
    return { yieldType: receiver!.anyType, returnType: receiver!.anyType, nextType: receiver!.anyType };
  }
  const key: IterationTypesKey = { typeId: t!.id, use: (use & IterationUseCacheFlags) as IterationUse };
  let noCache = false;
  const cached = receiver!.iterationTypesCache.get(key);
  if (cached !== undefined) {
    if (errorNode === undefined || IterationTypes_hasTypes(cached)) {
      return cached;
    }
    noCache = true;
  }
  const result = Checker_getIterationTypesOfIterableWorker(receiver, t, use, errorNode, noCache);
  if (!noCache) {
    receiver!.iterationTypesCache.set(key, result);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIterableWorker","kind":"method","status":"implemented","sigHash":"7e6888037f0fadc56c447ebf9c3dcf431eda566dc62a77972e7c82220ddf19bf"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIterableWorker(t *Type, use IterationUse, errorNode *ast.Node, noCache bool) IterationTypes {
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		allIterationTypes := make([]IterationTypes, 0, len(t.Types()))
 * 		for _, constituent := range t.Types() {
 * 			iterationTypes := c.getIterationTypesOfIterableWorker(constituent, use, nil, noCache)
 * 			if !iterationTypes.hasTypes() {
 * 				if errorNode != nil {
 * 					c.addDeferredDiagnostic(func() {
 * 						c.reportTypeNotIterableError(errorNode, t, use&IterationUseAllowsAsyncIterablesFlag != 0)
 * 					})
 * 				}
 * 				return IterationTypes{}
 * 			}
 * 			allIterationTypes = append(allIterationTypes, iterationTypes)
 * 		}
 * 		return c.combineIterationTypes(allIterationTypes)
 * 	}
 * 	var diags []*ast.Diagnostic
 * 	if use&IterationUseAllowsAsyncIterablesFlag != 0 {
 * 		iterationTypes := c.getIterationTypesOfIterableFast(t, c.asyncIterationTypesResolver)
 * 		if iterationTypes.hasTypes() {
 * 			if use&IterationUseForOfFlag != 0 {
 * 				return c.getAsyncFromSyncIterationTypes(iterationTypes, errorNode)
 * 			}
 * 			return iterationTypes
 * 		}
 * 		iterationTypes = c.getIterationTypesOfIterableSlow(t, c.asyncIterationTypesResolver, errorNode, &diags)
 * 		if iterationTypes.hasTypes() {
 * 			if len(diags) != 0 {
 * 				for _, d := range diags {
 * 					c.addDiagnostic(d)
 * 				}
 * 			}
 * 			return iterationTypes
 * 		}
 * 	}
 * 	if use&IterationUseAllowsSyncIterablesFlag != 0 {
 * 		iterationTypes := c.getIterationTypesOfIterableFast(t, c.syncIterationTypesResolver)
 * 		if iterationTypes.hasTypes() {
 * 			if use&IterationUseAllowsAsyncIterablesFlag != 0 {
 * 				return c.getAsyncFromSyncIterationTypes(iterationTypes, errorNode)
 * 			}
 * 			return iterationTypes
 * 		}
 * 		iterationTypes = c.getIterationTypesOfIterableSlow(t, c.syncIterationTypesResolver, errorNode, &diags)
 * 		if iterationTypes.hasTypes() {
 * 			if len(diags) != 0 {
 * 				for _, d := range diags {
 * 					c.addDiagnostic(d)
 * 				}
 * 			}
 * 			if use&IterationUseAllowsAsyncIterablesFlag != 0 {
 * 				return c.getAsyncFromSyncIterationTypes(iterationTypes, errorNode)
 * 			}
 * 			return iterationTypes
 * 		}
 * 	}
 * 	if errorNode != nil {
 * 		// We defer the diagnostic because TypeToString may attempt to resolve symbols that are already being
 * 		// resolved, possibly causing circularities.
 * 		c.addDeferredDiagnostic(func() {
 * 			diagnostic := c.reportTypeNotIterableError(errorNode, t, use&IterationUseAllowsAsyncIterablesFlag != 0)
 * 			for _, d := range diags {
 * 				diagnostic.AddRelatedInfo(d)
 * 			}
 * 		})
 * 	}
 * 	return IterationTypes{}
 * }
 */
export function Checker_getIterationTypesOfIterableWorker(receiver: GoPtr<Checker>, t: GoPtr<Type>, use: IterationUse, errorNode: GoPtr<Node>, noCache: bool): IterationTypes {
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    let allIterationTypes: GoSlice<IterationTypes> = GoEmptySlice<IterationTypes>();
    for (const constituent of Type_Types(t)!) {
      const iterationTypes = Checker_getIterationTypesOfIterableWorker(receiver, constituent, use, undefined, noCache);
      if (!IterationTypes_hasTypes(iterationTypes)) {
        if (errorNode !== undefined) {
          Checker_addDeferredDiagnostic(receiver, (): void => {
            Checker_reportTypeNotIterableError(receiver, errorNode, t, (use & IterationUseAllowsAsyncIterablesFlag) !== 0);
          });
        }
        return { yieldType: undefined, returnType: undefined, nextType: undefined };
      }
      allIterationTypes = GoAppend(allIterationTypes, iterationTypes);
    }
    return Checker_combineIterationTypes(receiver, allIterationTypes);
  }
  let diags: GoSlice<GoPtr<Diagnostic>> = GoNilSlice();
  if ((use & IterationUseAllowsAsyncIterablesFlag) !== 0) {
    let iterationTypes = Checker_getIterationTypesOfIterableFast(receiver, t, receiver!.asyncIterationTypesResolver);
    if (IterationTypes_hasTypes(iterationTypes)) {
      if ((use & IterationUseForOfFlag) !== 0) {
        return Checker_getAsyncFromSyncIterationTypes(receiver, iterationTypes, errorNode);
      }
      return iterationTypes;
    }
    iterationTypes = Checker_getIterationTypesOfIterableSlow(receiver, t, receiver!.asyncIterationTypesResolver, errorNode, GoValueRef(diags));
    if (IterationTypes_hasTypes(iterationTypes)) {
      for (const d of diags) {
        Checker_addDiagnostic(receiver, d);
      }
      return iterationTypes;
    }
  }
  if ((use & IterationUseAllowsSyncIterablesFlag) !== 0) {
    let iterationTypes = Checker_getIterationTypesOfIterableFast(receiver, t, receiver!.syncIterationTypesResolver);
    if (IterationTypes_hasTypes(iterationTypes)) {
      if ((use & IterationUseAllowsAsyncIterablesFlag) !== 0) {
        return Checker_getAsyncFromSyncIterationTypes(receiver, iterationTypes, errorNode);
      }
      return iterationTypes;
    }
    iterationTypes = Checker_getIterationTypesOfIterableSlow(receiver, t, receiver!.syncIterationTypesResolver, errorNode, GoValueRef(diags));
    if (IterationTypes_hasTypes(iterationTypes)) {
      for (const d of diags) {
        Checker_addDiagnostic(receiver, d);
      }
      if ((use & IterationUseAllowsAsyncIterablesFlag) !== 0) {
        return Checker_getAsyncFromSyncIterationTypes(receiver, iterationTypes, errorNode);
      }
      return iterationTypes;
    }
  }
  if (errorNode !== undefined) {
    Checker_addDeferredDiagnostic(receiver, (): void => {
      const diagnostic = Checker_reportTypeNotIterableError(receiver, errorNode, t, (use & IterationUseAllowsAsyncIterablesFlag) !== 0);
      for (const d of diags) {
        Diagnostic_AddRelatedInfo(diagnostic, d);
      }
    });
  }
  return { yieldType: undefined, returnType: undefined, nextType: undefined };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIterableFast","kind":"method","status":"implemented","sigHash":"ccbc8b0181c43f64f9fceaeea05b63de09efe319e9fa46a06a017e8842932dd9"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIterableFast(t *Type, r *IterationTypesResolver) IterationTypes {
 * 	// As an optimization, if the type is an instantiation of the following global type, then
 * 	// just grab its related type arguments:
 * 	// - `Iterable<T, TReturn, TNext>` or `AsyncIterable<T, TReturn, TNext>`
 * 	// - `IteratorObject<T, TReturn, TNext>` or `AsyncIteratorObject<T, TReturn, TNext>`
 * 	// - `IterableIterator<T, TReturn, TNext>` or `AsyncIterableIterator<T, TReturn, TNext>`
 * 	// - `Generator<T, TReturn, TNext>` or `AsyncGenerator<T, TReturn, TNext>`
 * 	if c.isReferenceToType(t, r.getGlobalIterableType()) ||
 * 		c.isReferenceToType(t, r.getGlobalIteratorObjectType()) ||
 * 		c.isReferenceToType(t, r.getGlobalIterableIteratorType()) ||
 * 		c.isReferenceToType(t, r.getGlobalGeneratorType()) {
 * 		typeArguments := c.getTypeArguments(t)
 * 		return r.getResolvedIterationTypes(typeArguments[0], typeArguments[1], typeArguments[2])
 * 	}
 * 	// As an optimization, if the type is an instantiation of one of the following global types, then
 * 	// just grab the related type argument:
 * 	// - `ArrayIterator<T>`
 * 	// - `MapIterator<T>`
 * 	// - `SetIterator<T>`
 * 	// - `StringIterator<T>`
 * 	// - `ReadableStreamAsyncIterator<T>`
 * 	if c.isReferenceToSomeType(t, r.getGlobalBuiltinIteratorTypes()) {
 * 		return r.getResolvedIterationTypes(c.getTypeArguments(t)[0], c.getBuiltinIteratorReturnType(), c.unknownType)
 * 	}
 * 	return IterationTypes{}
 * }
 */
export function Checker_getIterationTypesOfIterableFast(receiver: GoPtr<Checker>, t: GoPtr<Type>, r: GoPtr<IterationTypesResolver>): IterationTypes {
  if (Checker_isReferenceToType(receiver, t, r!.getGlobalIterableType!()) ||
    Checker_isReferenceToType(receiver, t, r!.getGlobalIteratorObjectType!()) ||
    Checker_isReferenceToType(receiver, t, r!.getGlobalIterableIteratorType!()) ||
    Checker_isReferenceToType(receiver, t, r!.getGlobalGeneratorType!())) {
    const typeArguments = Checker_getTypeArguments(receiver, t);
    return IterationTypesResolver_getResolvedIterationTypes(r, GoSliceLoad(typeArguments, 0, GoPointerValueOps<Type>()), GoSliceLoad(typeArguments, 1, GoPointerValueOps<Type>()), GoSliceLoad(typeArguments, 2, GoPointerValueOps<Type>()));
  }
  if (Checker_isReferenceToSomeType(receiver, t, r!.getGlobalBuiltinIteratorTypes!())) {
    return IterationTypesResolver_getResolvedIterationTypes(r, GoSliceLoad(Checker_getTypeArguments(receiver, t), 0, GoPointerValueOps<Type>()), Checker_getBuiltinIteratorReturnType(receiver), receiver!.unknownType);
  }
  return { yieldType: undefined, returnType: undefined, nextType: undefined };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::IterationTypesResolver.getResolvedIterationTypes","kind":"method","status":"implemented","sigHash":"9bb6856e2dea3a0c5d3cad1ec3a291d20f13c4d6530dbcbfb9de129c60f46093"}
 *
 * Go source:
 * func (r *IterationTypesResolver) getResolvedIterationTypes(yieldType *Type, returnType *Type, nextType *Type) IterationTypes {
 * 	return IterationTypes{
 * 		yieldType:  core.OrElse(r.resolveIterationType(yieldType, nil /*errorNode* /), yieldType),
 * 		returnType: core.OrElse(r.resolveIterationType(returnType, nil /*errorNode* /), returnType),
 * 		nextType:   nextType,
 * 	}
 * }
 */
export function IterationTypesResolver_getResolvedIterationTypes(receiver: GoPtr<IterationTypesResolver>, yieldType: GoPtr<Type>, returnType: GoPtr<Type>, nextType: GoPtr<Type>): IterationTypes {
  return {
    yieldType: core.OrElse(receiver!.resolveIterationType!(yieldType, undefined), yieldType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>),
    returnType: core.OrElse(receiver!.resolveIterationType!(returnType, undefined), returnType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>),
    nextType: nextType,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isReferenceToType","kind":"method","status":"implemented","sigHash":"9e62242a8e72f650b265bd2066c5ffe0ab19388a7a7e49b3b29a56003b257778"}
 *
 * Go source:
 * func (c *Checker) isReferenceToType(t *Type, target *Type) bool {
 * 	return t != nil && t.objectFlags&ObjectFlagsReference != 0 && t.Target() == target
 * }
 */
export function Checker_isReferenceToType(receiver: GoPtr<Checker>, t: GoPtr<Type>, target: GoPtr<Type>): bool {
  return t !== undefined && (t.objectFlags & ObjectFlagsReference) !== 0 && Type_Target(t) === target;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isReferenceToSomeType","kind":"method","status":"implemented","sigHash":"449cd87e9cdacd0ded456b604bbfe7804224b64ace2314b48a1c7390937ad3c8"}
 *
 * Go source:
 * func (c *Checker) isReferenceToSomeType(t *Type, targets []*Type) bool {
 * 	return t != nil && t.objectFlags&ObjectFlagsReference != 0 && slices.Contains(targets, t.Target())
 * }
 */
export function Checker_isReferenceToSomeType(receiver: GoPtr<Checker>, t: GoPtr<Type>, targets: GoSlice<GoPtr<Type>>): bool {
  return t !== undefined && (t.objectFlags & ObjectFlagsReference) !== 0 && slices.Contains(targets, Type_Target(t), GoEqualStrict<GoPtr<Type>>);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::IterationTypes.hasTypes","kind":"method","status":"implemented","sigHash":"2fb98b4ce677befef3f6608777c8af8f3f8ee7559a2cc5c8aa4aafe7092fb924"}
 *
 * Go source:
 * func (iterationTypes *IterationTypes) hasTypes() bool {
 * 	return iterationTypes.yieldType != nil || iterationTypes.returnType != nil || iterationTypes.nextType != nil
 * }
 */
export function IterationTypes_hasTypes(receiver: GoPtr<IterationTypes>): bool {
  return receiver!.yieldType !== undefined || receiver!.returnType !== undefined || receiver!.nextType !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::IterationTypes.getType","kind":"method","status":"implemented","sigHash":"bd09bacc83cf1fafb78cf8588497ba4b2f4000c7486fd043f4b7a745e8c57594"}
 *
 * Go source:
 * func (iterationTypes *IterationTypes) getType(typeKind IterationTypeKind) *Type {
 * 	switch typeKind {
 * 	case IterationTypeKindYield:
 * 		return iterationTypes.yieldType
 * 	case IterationTypeKindReturn:
 * 		return iterationTypes.returnType
 * 	case IterationTypeKindNext:
 * 		return iterationTypes.nextType
 * 	}
 * 	panic("Unhandled case in getType(IterationTypeKind)")
 * }
 */
export function IterationTypes_getType(receiver: GoPtr<IterationTypes>, typeKind: IterationTypeKind): GoPtr<Type> {
  switch (typeKind) {
    case IterationTypeKindYield:
      return receiver!.yieldType;
    case IterationTypeKindReturn:
      return receiver!.returnType;
    case IterationTypeKindNext:
      return receiver!.nextType;
  }
  throw new globalThis.Error("Unhandled case in getType(IterationTypeKind)");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.combineIterationTypes","kind":"method","status":"implemented","sigHash":"e8fcf2ead728dcd10293f10f89797717e39ca9f8da8952081009cf8f7a1e579d"}
 *
 * Go source:
 * func (c *Checker) combineIterationTypes(iterationTypes []IterationTypes) IterationTypes {
 * 	return IterationTypes{
 * 		c.getIterationTypeUnion(iterationTypes, func(t IterationTypes) *Type { return t.yieldType }),
 * 		c.getIterationTypeUnion(iterationTypes, func(t IterationTypes) *Type { return t.returnType }),
 * 		c.getIterationTypeUnion(iterationTypes, func(t IterationTypes) *Type { return t.nextType }),
 * 	}
 * }
 */
export function Checker_combineIterationTypes(receiver: GoPtr<Checker>, iterationTypes: GoSlice<IterationTypes>): IterationTypes {
  return {
    yieldType: Checker_getIterationTypeUnion(receiver, iterationTypes, (t: IterationTypes): GoPtr<Type> => t.yieldType),
    returnType: Checker_getIterationTypeUnion(receiver, iterationTypes, (t: IterationTypes): GoPtr<Type> => t.returnType),
    nextType: Checker_getIterationTypeUnion(receiver, iterationTypes, (t: IterationTypes): GoPtr<Type> => t.nextType),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypeUnion","kind":"method","status":"implemented","sigHash":"bed5a1afcc6b4fcb98b155e29cd11b9d3afd7f9a3a90784d2a80ada47b798b2b"}
 *
 * Go source:
 * func (c *Checker) getIterationTypeUnion(iterationTypes []IterationTypes, f func(IterationTypes) *Type) *Type {
 * 	types := core.MapNonNil(iterationTypes, f)
 * 	if len(types) == 0 {
 * 		return nil
 * 	}
 * 	return c.getUnionType(types)
 * }
 */
export function Checker_getIterationTypeUnion(receiver: GoPtr<Checker>, iterationTypes: GoSlice<IterationTypes>, f: GoFunc<(arg0: IterationTypes) => GoPtr<Type>>): GoPtr<Type> {
  const types = core.MapNonNil(iterationTypes, f, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
  if (types.length === 0) {
    return undefined;
  }
  return Checker_getUnionType(receiver, types);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getAsyncFromSyncIterationTypes","kind":"method","status":"implemented","sigHash":"b35a0a06a2bf322a53bca2cc77bb8670ff6bd6fc358ee65d10c30521f17e5a42"}
 *
 * Go source:
 * func (c *Checker) getAsyncFromSyncIterationTypes(iterationTypes IterationTypes, errorNode *ast.Node) IterationTypes {
 * 	if !iterationTypes.hasTypes() ||
 * 		iterationTypes.yieldType == c.anyType && iterationTypes.returnType == c.anyType && iterationTypes.nextType == c.anyType {
 * 		return iterationTypes
 * 	}
 * 	// if we're requesting diagnostics, report errors for a missing `Awaited<T>`.
 * 	if errorNode != nil {
 * 		c.getGlobalAwaitedSymbol()
 * 	}
 * 	return IterationTypes{
 * 		yieldType:  core.OrElse(c.getAwaitedTypeEx(iterationTypes.yieldType, errorNode, nil), c.anyType),
 * 		returnType: core.OrElse(c.getAwaitedTypeEx(iterationTypes.returnType, errorNode, nil), c.anyType),
 * 		nextType:   iterationTypes.nextType,
 * 	}
 * }
 */
export function Checker_getAsyncFromSyncIterationTypes(receiver: GoPtr<Checker>, iterationTypes: IterationTypes, errorNode: GoPtr<Node>): IterationTypes {
  if (!IterationTypes_hasTypes(iterationTypes) ||
    (iterationTypes.yieldType === receiver!.anyType && iterationTypes.returnType === receiver!.anyType && iterationTypes.nextType === receiver!.anyType)) {
    return iterationTypes;
  }
  if (errorNode !== undefined) {
    receiver!.getGlobalAwaitedSymbol!();
  }
  return {
    yieldType: core.OrElse(Checker_getAwaitedTypeEx(receiver, iterationTypes.yieldType, errorNode, undefined), receiver!.anyType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>),
    returnType: core.OrElse(Checker_getAwaitedTypeEx(receiver, iterationTypes.returnType, errorNode, undefined), receiver!.anyType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>),
    nextType: iterationTypes.nextType,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIterableSlow","kind":"method","status":"implemented","sigHash":"fcd59360ce71bf9a7c0278e6641e48cec1a4d31c62a63972754a20235e5a460e"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIterableSlow(t *Type, r *IterationTypesResolver, errorNode *ast.Node, diagnosticOutput *[]*ast.Diagnostic) IterationTypes {
 * 	if method := c.getPropertyOfType(t, c.getPropertyNameForKnownSymbolName(r.iteratorSymbolName)); method != nil && method.Flags&ast.SymbolFlagsOptional == 0 {
 * 		methodType := c.getTypeOfSymbol(method)
 * 		if IsTypeAny(methodType) {
 * 			return IterationTypes{c.anyType, c.anyType, c.anyType}
 * 		}
 * 		allSignatures := c.getSignaturesOfType(methodType, SignatureKindCall)
 * 		validSignatures := core.Filter(allSignatures, func(sig *Signature) bool {
 * 			return c.getMinArgumentCount(sig) == 0
 * 		})
 * 		if len(validSignatures) != 0 {
 * 			iteratorType := c.getIntersectionType(core.Map(validSignatures, c.getReturnTypeOfSignature))
 * 			return c.getIterationTypesOfIteratorWorker(iteratorType, r, errorNode, diagnosticOutput)
 * 		}
 * 		if errorNode != nil && len(allSignatures) != 0 {
 * 			c.checkTypeAssignableToEx(t, r.getGlobalIterableTypeChecked(), errorNode, nil, diagnosticOutput)
 * 		}
 * 	}
 * 	return IterationTypes{}
 * }
 */
export function Checker_getIterationTypesOfIterableSlow(receiver: GoPtr<Checker>, t: GoPtr<Type>, r: GoPtr<IterationTypesResolver>, errorNode: GoPtr<Node>, diagnosticOutput: GoRef<GoSlice<GoPtr<Diagnostic>>>): IterationTypes {
  const method = Checker_getPropertyOfType(receiver, t, Checker_getPropertyNameForKnownSymbolName(receiver, r!.iteratorSymbolName));
  if (method !== undefined && (method!.Flags & SymbolFlagsOptional) === 0) {
    const methodType = Checker_getTypeOfSymbol(receiver, method);
    if (IsTypeAny(methodType)) {
      return { yieldType: receiver!.anyType, returnType: receiver!.anyType, nextType: receiver!.anyType };
    }
    const allSignatures = Checker_getSignaturesOfType(receiver, methodType, SignatureKindCall);
    const validSignatures = core.Filter(allSignatures, (sig: GoPtr<Signature>): bool => Checker_getMinArgumentCount(receiver, sig) === 0);
    if (validSignatures.length !== 0) {
      const iteratorType = Checker_getIntersectionType(receiver, core.Map(validSignatures, (sig: GoPtr<Signature>): GoPtr<Type> => Checker_getReturnTypeOfSignature(receiver, sig)));
      return Checker_getIterationTypesOfIteratorWorker(receiver, iteratorType, r, errorNode, diagnosticOutput);
    }
    if (errorNode !== undefined && allSignatures.length !== 0) {
      Checker_checkTypeAssignableToEx(receiver, t, r!.getGlobalIterableTypeChecked!(), errorNode, undefined, diagnosticOutput);
    }
  }
  return { yieldType: undefined, returnType: undefined, nextType: undefined };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIterator","kind":"method","status":"implemented","sigHash":"b562602b1c7f92fb96efeffc366ed57fdbf1afb55d7d76645789cf96661dd800"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIterator(t *Type, r *IterationTypesResolver, errorNode *ast.Node, diagnosticOutput *[]*ast.Diagnostic) IterationTypes {
 * 	return c.getIterationTypesOfIteratorWorker(t, r, errorNode, diagnosticOutput)
 * }
 */
export function Checker_getIterationTypesOfIterator(receiver: GoPtr<Checker>, t: GoPtr<Type>, r: GoPtr<IterationTypesResolver>, errorNode: GoPtr<Node>, diagnosticOutput: GoRef<GoSlice<GoPtr<Diagnostic>>>): IterationTypes {
  return Checker_getIterationTypesOfIteratorWorker(receiver, t, r, errorNode, diagnosticOutput);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIteratorWorker","kind":"method","status":"implemented","sigHash":"7de194b3204a77a7ad5a480fe16f3131d292e0bb18ce61ce456ddfb1db984578"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIteratorWorker(t *Type, r *IterationTypesResolver, errorNode *ast.Node, diagnosticOutput *[]*ast.Diagnostic) IterationTypes {
 * 	if IsTypeAny(t) {
 * 		return IterationTypes{c.anyType, c.anyType, c.anyType}
 * 	}
 * 	iterationTypes := c.getIterationTypesOfIteratorFast(t, r)
 * 	if iterationTypes.hasTypes() {
 * 		return iterationTypes
 * 	}
 * 	return c.getIterationTypesOfIteratorSlow(t, r, errorNode, diagnosticOutput)
 * }
 */
export function Checker_getIterationTypesOfIteratorWorker(receiver: GoPtr<Checker>, t: GoPtr<Type>, r: GoPtr<IterationTypesResolver>, errorNode: GoPtr<Node>, diagnosticOutput: GoRef<GoSlice<GoPtr<Diagnostic>>>): IterationTypes {
  if (IsTypeAny(t)) {
    return { yieldType: receiver!.anyType, returnType: receiver!.anyType, nextType: receiver!.anyType };
  }
  const iterationTypes = Checker_getIterationTypesOfIteratorFast(receiver, t, r);
  if (IterationTypes_hasTypes(iterationTypes)) {
    return iterationTypes;
  }
  return Checker_getIterationTypesOfIteratorSlow(receiver, t, r, errorNode, diagnosticOutput);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIteratorFast","kind":"method","status":"implemented","sigHash":"9f273c9bf26dc9d165b54572a9107924446674e87c1cfab694e3e067f162da9b"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIteratorFast(t *Type, r *IterationTypesResolver) IterationTypes {
 * 	// As an optimization, if the type is an instantiation of the following global type, then
 * 	// just grab its related type arguments:
 * 	// - `Iterable<T, TReturn, TNext>` or `AsyncIterable<T, TReturn, TNext>`
 * 	// - `IteratorObject<T, TReturn, TNext>` or `AsyncIteratorObject<T, TReturn, TNext>`
 * 	// - `IterableIterator<T, TReturn, TNext>` or `AsyncIterableIterator<T, TReturn, TNext>`
 * 	// - `Generator<T, TReturn, TNext>` or `AsyncGenerator<T, TReturn, TNext>`
 * 	if c.isReferenceToType(t, r.getGlobalIteratorType()) ||
 * 		c.isReferenceToType(t, r.getGlobalIteratorObjectType()) ||
 * 		c.isReferenceToType(t, r.getGlobalIterableIteratorType()) ||
 * 		c.isReferenceToType(t, r.getGlobalGeneratorType()) {
 * 		typeArguments := c.getTypeArguments(t)
 * 		return r.getResolvedIterationTypes(typeArguments[0], typeArguments[1], typeArguments[2])
 * 	}
 * 	// As an optimization, if the type is an instantiation of one of the following global types, then
 * 	// just grab the related type argument:
 * 	// - `ArrayIterator<T>`
 * 	// - `MapIterator<T>`
 * 	// - `SetIterator<T>`
 * 	// - `StringIterator<T>`
 * 	// - `ReadableStreamAsyncIterator<T>`
 * 	if c.isReferenceToSomeType(t, r.getGlobalBuiltinIteratorTypes()) {
 * 		return r.getResolvedIterationTypes(c.getTypeArguments(t)[0], c.getBuiltinIteratorReturnType(), c.unknownType)
 * 	}
 * 	return IterationTypes{}
 * }
 */
export function Checker_getIterationTypesOfIteratorFast(receiver: GoPtr<Checker>, t: GoPtr<Type>, r: GoPtr<IterationTypesResolver>): IterationTypes {
  if (Checker_isReferenceToType(receiver, t, r!.getGlobalIteratorType!()) ||
    Checker_isReferenceToType(receiver, t, r!.getGlobalIteratorObjectType!()) ||
    Checker_isReferenceToType(receiver, t, r!.getGlobalIterableIteratorType!()) ||
    Checker_isReferenceToType(receiver, t, r!.getGlobalGeneratorType!())) {
    const typeArguments = Checker_getTypeArguments(receiver, t);
    return IterationTypesResolver_getResolvedIterationTypes(r, GoSliceLoad(typeArguments, 0, GoPointerValueOps<Type>()), GoSliceLoad(typeArguments, 1, GoPointerValueOps<Type>()), GoSliceLoad(typeArguments, 2, GoPointerValueOps<Type>()));
  }
  if (Checker_isReferenceToSomeType(receiver, t, r!.getGlobalBuiltinIteratorTypes!())) {
    return IterationTypesResolver_getResolvedIterationTypes(r, GoSliceLoad(Checker_getTypeArguments(receiver, t), 0, GoPointerValueOps<Type>()), Checker_getBuiltinIteratorReturnType(receiver), receiver!.unknownType);
  }
  return { yieldType: undefined, returnType: undefined, nextType: undefined };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIteratorSlow","kind":"method","status":"implemented","sigHash":"348afd96a6de6bb616ddbd6290c7ccb3918f89dbd1ebffb7163f8ec27e765f4f"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIteratorSlow(t *Type, r *IterationTypesResolver, errorNode *ast.Node, diagnosticOutput *[]*ast.Diagnostic) IterationTypes {
 * 	return c.combineIterationTypes([]IterationTypes{
 * 		c.getIterationTypesOfMethod(t, r, "next", errorNode, diagnosticOutput),
 * 		c.getIterationTypesOfMethod(t, r, "return", errorNode, diagnosticOutput),
 * 		c.getIterationTypesOfMethod(t, r, "throw", errorNode, diagnosticOutput),
 * 	})
 * }
 */
export function Checker_getIterationTypesOfIteratorSlow(receiver: GoPtr<Checker>, t: GoPtr<Type>, r: GoPtr<IterationTypesResolver>, errorNode: GoPtr<Node>, diagnosticOutput: GoRef<GoSlice<GoPtr<Diagnostic>>>): IterationTypes {
  return Checker_combineIterationTypes(receiver, [
    Checker_getIterationTypesOfMethod(receiver, t, r, "next", errorNode, diagnosticOutput),
    Checker_getIterationTypesOfMethod(receiver, t, r, "return", errorNode, diagnosticOutput),
    Checker_getIterationTypesOfMethod(receiver, t, r, "throw", errorNode, diagnosticOutput),
  ]);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfMethod","kind":"method","status":"implemented","sigHash":"395240605c6668136a121a3733bd8ff6091399d510a909e96d3c1f791a7f3afb"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfMethod(t *Type, resolver *IterationTypesResolver, methodName string, errorNode *ast.Node, diagnosticOutput *[]*ast.Diagnostic) IterationTypes {
 * 	method := c.getPropertyOfType(t, methodName)
 * 	// Ignore 'return' or 'throw' if they are missing.
 * 	if method == nil && methodName != "next" {
 * 		return IterationTypes{}
 * 	}
 * 	var methodType *Type
 * 	if method != nil && !(methodName == "next" && method.Flags&ast.SymbolFlagsOptional != 0) {
 * 		if methodName == "next" {
 * 			methodType = c.getTypeOfSymbol(method)
 * 		} else {
 * 			methodType = c.getTypeWithFacts(c.getTypeOfSymbol(method), TypeFactsNEUndefinedOrNull)
 * 		}
 * 	}
 * 	if IsTypeAny(methodType) {
 * 		return IterationTypes{c.anyType, c.anyType, c.anyType}
 * 	}
 * 	// Both async and non-async iterators *must* have a `next` method.
 * 	var methodSignatures []*Signature
 * 	if methodType != nil {
 * 		methodSignatures = c.getSignaturesOfType(methodType, SignatureKindCall)
 * 	}
 * 	if len(methodSignatures) == 0 {
 * 		if errorNode != nil {
 * 			diagnostic := core.IfElse(methodName == "next", resolver.mustHaveANextMethodDiagnostic, resolver.mustBeAMethodDiagnostic)
 * 			c.reportDiagnostic(NewDiagnosticForNode(errorNode, diagnostic, methodName), diagnosticOutput)
 * 		}
 * 		return IterationTypes{}
 * 	}
 * 	// If the method signature comes exclusively from the global iterator or generator type,
 * 	// create iteration types from its type arguments like `getIterationTypesOfIteratorFast`
 * 	// does (so as to remove `undefined` from the next and return types). We arrive here when
 * 	// a contextual type for a generator was not a direct reference to one of those global types,
 * 	// but looking up `methodType` referred to one of them (and nothing else). E.g., in
 * 	// `interface SpecialIterator extends Iterator<number> {}`, `SpecialIterator` is not a
 * 	// reference to `Iterator`, but its `next` member derives exclusively from `Iterator`.
 * 	if len(methodSignatures) == 1 && methodType.symbol != nil {
 * 		globalGeneratorType := resolver.getGlobalGeneratorType()
 * 		globalIteratorType := resolver.getGlobalIteratorType()
 * 		isGeneratorMethod := globalGeneratorType.symbol != nil && globalGeneratorType.symbol.Members[methodName] == methodType.symbol
 * 		isIteratorMethod := !isGeneratorMethod && globalIteratorType.symbol != nil && globalIteratorType.symbol.Members[methodName] == methodType.symbol
 * 		if isGeneratorMethod || isIteratorMethod {
 * 			typeParameters := core.IfElse(isGeneratorMethod, globalGeneratorType, globalIteratorType).AsInterfaceType().TypeParameters()
 * 			mapper := methodType.Mapper()
 * 			var nextType *Type
 * 			if methodName == "next" {
 * 				nextType = mapper.Map(typeParameters[2])
 * 			}
 * 			return IterationTypes{mapper.Map(typeParameters[0]), mapper.Map(typeParameters[1]), nextType}
 * 		}
 * 	}
 * 	// Extract the first parameter and return type of each signature.
 * 	var methodParameterTypes []*Type
 * 	var methodReturnTypes []*Type
 * 	for _, signature := range methodSignatures {
 * 		if methodName != "throw" && len(signature.parameters) != 0 {
 * 			methodParameterTypes = append(methodParameterTypes, c.getTypeAtPosition(signature, 0))
 * 		}
 * 		methodReturnTypes = append(methodReturnTypes, c.getReturnTypeOfSignature(signature))
 * 	}
 * 	// Resolve the *next* or *return* type from the first parameter of a `next()` or
 * 	// `return()` method, respectively.
 * 	var returnTypes []*Type
 * 	var nextType *Type
 * 	if methodName != "throw" {
 * 		var methodParameterType *Type
 * 		if methodParameterTypes != nil {
 * 			methodParameterType = c.getUnionType(methodParameterTypes)
 * 		} else {
 * 			methodParameterType = c.unknownType
 * 		}
 * 		if methodName == "next" {
 * 			// The value of `next(value)` is *not* awaited by async generators
 * 			nextType = methodParameterType
 * 		} else if methodName == "return" {
 * 			// The value of `return(value)` *is* awaited by async generators
 * 			resolvedMethodParameterType := core.OrElse(resolver.resolveIterationType(methodParameterType, errorNode), c.anyType)
 * 			returnTypes = append(returnTypes, resolvedMethodParameterType)
 * 		}
 * 	}
 * 	// Resolve the *yield* and *return* types from the return type of the method (i.e. `IteratorResult`)
 * 	var yieldType *Type
 * 	var methodReturnType *Type
 * 	if methodReturnTypes != nil {
 * 		methodReturnType = c.getIntersectionType(methodReturnTypes)
 * 	} else {
 * 		methodReturnType = c.neverType
 * 	}
 * 	resolvedMethodReturnType := core.OrElse(resolver.resolveIterationType(methodReturnType, errorNode), c.anyType)
 * 	iterationTypes := c.getIterationTypesOfIteratorResult(resolvedMethodReturnType)
 * 	if !iterationTypes.hasTypes() {
 * 		if errorNode != nil {
 * 			c.reportDiagnostic(NewDiagnosticForNode(errorNode, resolver.mustHaveAValueDiagnostic, methodName), diagnosticOutput)
 * 		}
 * 		yieldType = c.anyType
 * 		returnTypes = append(returnTypes, c.anyType)
 * 	} else {
 * 		yieldType = iterationTypes.yieldType
 * 		returnTypes = append(returnTypes, iterationTypes.returnType)
 * 	}
 * 	return IterationTypes{yieldType, c.getUnionType(returnTypes), nextType}
 * }
 */
export function Checker_getIterationTypesOfMethod(receiver: GoPtr<Checker>, t: GoPtr<Type>, resolver: GoPtr<IterationTypesResolver>, methodName: string, errorNode: GoPtr<Node>, diagnosticOutput: GoRef<GoSlice<GoPtr<Diagnostic>>>): IterationTypes {
  const method = Checker_getPropertyOfType(receiver, t, methodName);
  if (method === undefined && methodName !== "next") {
    return { yieldType: undefined, returnType: undefined, nextType: undefined };
  }
  let methodType: GoPtr<Type>;
  if (method !== undefined && !(methodName === "next" && (method!.Flags & SymbolFlagsOptional) !== 0)) {
    if (methodName === "next") {
      methodType = Checker_getTypeOfSymbol(receiver, method);
    } else {
      methodType = Checker_getTypeWithFacts(receiver, Checker_getTypeOfSymbol(receiver, method), TypeFactsNEUndefinedOrNull);
    }
  }
  if (IsTypeAny(methodType)) {
    return { yieldType: receiver!.anyType, returnType: receiver!.anyType, nextType: receiver!.anyType };
  }
  let methodSignatures: GoSlice<GoPtr<Signature>> = GoNilSlice();
  if (methodType !== undefined) {
    methodSignatures = Checker_getSignaturesOfType(receiver, methodType, SignatureKindCall);
  }
  if (methodSignatures.length === 0) {
    if (errorNode !== undefined) {
      const diagnostic = core.IfElse(methodName === "next", resolver!.mustHaveANextMethodDiagnostic, resolver!.mustBeAMethodDiagnostic);
      Checker_reportDiagnostic(receiver, NewDiagnosticForNode(errorNode, diagnostic, methodName), diagnosticOutput);
    }
    return { yieldType: undefined, returnType: undefined, nextType: undefined };
  }
  if (methodSignatures.length === 1 && methodType!.symbol !== undefined) {
    const globalGeneratorType = resolver!.getGlobalGeneratorType!();
    const globalIteratorType = resolver!.getGlobalIteratorType!();
    const isGeneratorMethod = globalGeneratorType!.symbol !== undefined && !GoMapIsNil(globalGeneratorType!.symbol!.Members) && globalGeneratorType!.symbol!.Members.get(methodName) === methodType!.symbol;
    const isIteratorMethod = !isGeneratorMethod && globalIteratorType!.symbol !== undefined && !GoMapIsNil(globalIteratorType!.symbol!.Members) && globalIteratorType!.symbol!.Members.get(methodName) === methodType!.symbol;
    if (isGeneratorMethod || isIteratorMethod) {
      const typeParameters = InterfaceType_TypeParameters(Type_AsInterfaceType(core.IfElse(isGeneratorMethod, globalGeneratorType, globalIteratorType)));
      const mapper = Type_Mapper(methodType);
      let nextType: GoPtr<Type>;
      if (methodName === "next") {
        nextType = TypeMapper_Map(mapper, GoSliceLoad(typeParameters!, 2, GoPointerValueOps<Type>()));
      }
      return { yieldType: TypeMapper_Map(mapper, GoSliceLoad(typeParameters!, 0, GoPointerValueOps<Type>())), returnType: TypeMapper_Map(mapper, GoSliceLoad(typeParameters!, 1, GoPointerValueOps<Type>())), nextType: nextType };
    }
  }
  let methodParameterTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
  let methodReturnTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
  for (const signature of methodSignatures) {
    if (methodName !== "throw" && signature!.parameters.length !== 0) {
      methodParameterTypes = GoSliceAppend(methodParameterTypes, Checker_getTypeAtPosition(receiver, signature, 0), GoPointerValueOps<Type>());
    }
    methodReturnTypes = GoSliceAppend(methodReturnTypes, Checker_getReturnTypeOfSignature(receiver, signature), GoPointerValueOps<Type>());
  }
  let returnTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
  let nextType: GoPtr<Type>;
  if (methodName !== "throw") {
    let methodParameterType: GoPtr<Type>;
    if (methodParameterTypes.length > 0) {
      methodParameterType = Checker_getUnionType(receiver, methodParameterTypes);
    } else {
      methodParameterType = receiver!.unknownType;
    }
    if (methodName === "next") {
      nextType = methodParameterType;
    } else if (methodName === "return") {
      const resolvedMethodParameterType = core.OrElse(resolver!.resolveIterationType!(methodParameterType, errorNode), receiver!.anyType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
      returnTypes = GoSliceAppend(returnTypes, resolvedMethodParameterType, GoPointerValueOps<Type>());
    }
  }
  let yieldType: GoPtr<Type>;
  let methodReturnType: GoPtr<Type>;
  if (methodReturnTypes.length > 0) {
    methodReturnType = Checker_getIntersectionType(receiver, methodReturnTypes);
  } else {
    methodReturnType = receiver!.neverType;
  }
  const resolvedMethodReturnType = core.OrElse(resolver!.resolveIterationType!(methodReturnType, errorNode), receiver!.anyType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
  const iterationTypes = Checker_getIterationTypesOfIteratorResult(receiver, resolvedMethodReturnType);
  if (!IterationTypes_hasTypes(iterationTypes)) {
    if (errorNode !== undefined) {
      Checker_reportDiagnostic(receiver, NewDiagnosticForNode(errorNode, resolver!.mustHaveAValueDiagnostic, methodName), diagnosticOutput);
    }
    yieldType = receiver!.anyType;
    returnTypes = GoSliceAppend(returnTypes, receiver!.anyType, GoPointerValueOps<Type>());
  } else {
    yieldType = iterationTypes.yieldType;
    returnTypes = GoSliceAppend(returnTypes, iterationTypes.returnType!, GoPointerValueOps<Type>());
  }
  return { yieldType: yieldType, returnType: Checker_getUnionType(receiver, returnTypes), nextType: nextType };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIterationTypesOfIteratorResult","kind":"method","status":"implemented","sigHash":"2ea377b873aaec4b1bda4dfab35f4b6726e35e28233da1fff6ef9d7011d00d5d"}
 *
 * Go source:
 * func (c *Checker) getIterationTypesOfIteratorResult(t *Type) IterationTypes {
 * 	if IsTypeAny(t) {
 * 		return IterationTypes{c.anyType, c.anyType, c.anyType}
 * 	}
 * 	// As an optimization, if the type is an instantiation of one of the global `IteratorYieldResult<T>`
 * 	// or `IteratorReturnResult<TReturn>` types, then just grab its type argument.
 * 	if c.isReferenceToType(t, c.getGlobalIteratorYieldResultType()) {
 * 		return IterationTypes{c.getTypeArguments(t)[0], nil, nil}
 * 	}
 * 	if c.isReferenceToType(t, c.getGlobalIteratorReturnResultType()) {
 * 		return IterationTypes{nil, c.getTypeArguments(t)[0], nil}
 * 	}
 * 	// Choose any constituents that can produce the requested iteration type.
 * 	yieldIteratorResult := c.filterType(t, c.isYieldIteratorResult)
 * 	var yieldType *Type
 * 	if yieldIteratorResult != c.neverType {
 * 		yieldType = c.getTypeOfPropertyOfType(yieldIteratorResult, "value" /* as __String * /)
 * 	}
 * 	returnIteratorResult := c.filterType(t, c.isReturnIteratorResult)
 * 	var returnType *Type
 * 	if returnIteratorResult != c.neverType {
 * 		returnType = c.getTypeOfPropertyOfType(returnIteratorResult, "value" /* as __String * /)
 * 	}
 * 	if yieldType == nil && returnType == nil {
 * 		return IterationTypes{}
 * 	}
 * 	// From https://tc39.github.io/ecma262/#sec-iteratorresult-interface
 * 	// > ... If the iterator does not have a return value, `value` is `undefined`. In that case, the
 * 	// > `value` property may be absent from the conforming object if it does not inherit an explicit
 * 	// > `value` property.
 * 	return IterationTypes{yieldType, core.OrElse(returnType, c.voidType), nil}
 * }
 */
export function Checker_getIterationTypesOfIteratorResult(receiver: GoPtr<Checker>, t: GoPtr<Type>): IterationTypes {
  if (IsTypeAny(t)) {
    return { yieldType: receiver!.anyType, returnType: receiver!.anyType, nextType: receiver!.anyType };
  }
  if (Checker_isReferenceToType(receiver, t, receiver!.getGlobalIteratorYieldResultType!())) {
    return { yieldType: GoSliceLoad(Checker_getTypeArguments(receiver, t), 0, GoPointerValueOps<Type>()), returnType: undefined, nextType: undefined };
  }
  if (Checker_isReferenceToType(receiver, t, receiver!.getGlobalIteratorReturnResultType!())) {
    return { yieldType: undefined, returnType: GoSliceLoad(Checker_getTypeArguments(receiver, t), 0, GoPointerValueOps<Type>()), nextType: undefined };
  }
  const yieldIteratorResult = Checker_filterType(receiver, t, (ty: GoPtr<Type>): bool => Checker_isYieldIteratorResult(receiver, ty));
  let yieldType: GoPtr<Type>;
  if (yieldIteratorResult !== receiver!.neverType) {
    yieldType = Checker_getTypeOfPropertyOfType(receiver, yieldIteratorResult, "value");
  }
  const returnIteratorResult = Checker_filterType(receiver, t, (ty: GoPtr<Type>): bool => Checker_isReturnIteratorResult(receiver, ty));
  let returnType: GoPtr<Type>;
  if (returnIteratorResult !== receiver!.neverType) {
    returnType = Checker_getTypeOfPropertyOfType(receiver, returnIteratorResult, "value");
  }
  if (yieldType === undefined && returnType === undefined) {
    return { yieldType: undefined, returnType: undefined, nextType: undefined };
  }
  return { yieldType: yieldType, returnType: core.OrElse(returnType, receiver!.voidType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>), nextType: undefined };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeOfExpression","kind":"method","status":"implemented","sigHash":"c33054ef3b04c18d0d873734e4939a08e367add092405263710c02960c160e91"}
 *
 * Go source:
 * func (c *Checker) getTypeOfExpression(node *ast.Node) *Type {
 * 	// Don't bother caching types that require no flow analysis and are quick to compute.
 * 	quickType := c.getQuickTypeOfExpression(node)
 * 	if quickType != nil {
 * 		return quickType
 * 	}
 * 	// If a type has been cached for the node, return it.
 * 	if cachedType := c.flowTypeCache[node]; cachedType != nil {
 * 		return cachedType
 * 	}
 * 	startInvocationCount := c.flowInvocationCount
 * 	t := c.checkExpressionEx(node, CheckModeTypeOnly)
 * 	// If control flow analysis was required to determine the type, it is worth caching.
 * 	if c.flowInvocationCount != startInvocationCount {
 * 		if c.flowTypeCache == nil {
 * 			c.flowTypeCache = make(map[*ast.Node]*Type)
 * 		}
 * 		c.flowTypeCache[node] = t
 * 	}
 * 	return t
 * }
 */
export function Checker_getTypeOfExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const quickType = Checker_getQuickTypeOfExpression(receiver, node);
  if (quickType !== undefined) {
    return quickType;
  }
  const cachedType = receiver!.flowTypeCache.get(node);
  if (cachedType !== undefined) {
    return cachedType;
  }
  const startInvocationCount = receiver!.flowInvocationCount;
  const t = Checker_checkExpressionEx(receiver, node, CheckModeTypeOnly);
  if (receiver!.flowInvocationCount !== startInvocationCount) {
    if (GoMapIsNil(receiver!.flowTypeCache)) {
      (receiver as GoPtr<Checker> & { flowTypeCache: GoMap<GoPtr<Node>, GoPtr<Type>> })!.flowTypeCache = new globalThis.Map<GoPtr<Node>, GoPtr<Type>>();
    }
    receiver!.flowTypeCache.set(node, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getQuickTypeOfExpression","kind":"method","status":"implemented","sigHash":"09a856cd4ee4c829e8715eb49402a826a16ff9941dadcdf93214c676b6aafe79"}
 *
 * Go source:
 * func (c *Checker) getQuickTypeOfExpression(node *ast.Node) *Type {
 * 	expr := ast.SkipParentheses(node)
 * 	switch {
 * 	case ast.IsAwaitExpression(expr):
 * 		t := c.getQuickTypeOfExpression(expr.Expression())
 * 		if t != nil {
 * 			return c.getAwaitedType(t)
 * 		}
 * 		return nil
 * 	// Optimize for the common case of a call to a function with a single non-generic call
 * 	// signature where we can just fetch the return type without checking the arguments.
 * 	case ast.IsCallExpression(expr) && expr.Expression().Kind != ast.KindSuperKeyword && !ast.IsRequireCall(expr, true /*requireStringLiteralLikeArgument* /) && !c.isSymbolOrSymbolForCall(expr) && !ast.IsImportCall(expr):
 * 		if isCallChain(expr) {
 * 			return c.getReturnTypeOfSingleNonGenericSignatureOfCallChain(expr)
 * 		}
 * 		return c.getReturnTypeOfSingleNonGenericSignature(c.checkNonNullExpression(expr.Expression()), SignatureKindCall)
 * 	case ast.IsNewExpression(expr):
 * 		return c.getReturnTypeOfSingleNonGenericSignature(c.checkNonNullExpression(expr.Expression()), SignatureKindConstruct)
 * 	case ast.IsAssertionExpression(expr) && !ast.IsConstTypeReference(expr.Type()):
 * 		return c.getTypeFromTypeNode(expr.Type())
 * 	case ast.IsLiteralExpression(node) || ast.IsBooleanLiteral(node):
 * 		return c.checkExpression(node)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getQuickTypeOfExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const expr = SkipParentheses(node);
  if (IsAwaitExpression(expr)) {
    const t = Checker_getQuickTypeOfExpression(receiver, Node_Expression(expr));
    if (t !== undefined) {
      return Checker_getAwaitedType(receiver, t);
    }
    return undefined;
  }
  if (
    IsCallExpression(expr) &&
    Node_Expression(expr)!.Kind !== KindSuperKeyword &&
    !IsRequireCall(expr, true) &&
    !Checker_isSymbolOrSymbolForCall(receiver, expr) &&
    !IsImportCall(expr)
  ) {
    if (isCallChain(expr)) {
      return Checker_getReturnTypeOfSingleNonGenericSignatureOfCallChain(receiver, expr);
    }
    return Checker_getReturnTypeOfSingleNonGenericSignature(receiver, Checker_checkNonNullExpression(receiver, Node_Expression(expr)), SignatureKindCall);
  }
  if (IsNewExpression(expr)) {
    return Checker_getReturnTypeOfSingleNonGenericSignature(receiver, Checker_checkNonNullExpression(receiver, Node_Expression(expr)), SignatureKindConstruct);
  }
  if (IsAssertionExpression(expr) && !IsConstTypeReference(Node_Type(expr))) {
    return Checker_getTypeFromTypeNode(receiver, Node_Type(expr));
  }
  if (IsLiteralExpression(node) || IsBooleanLiteral(node)) {
    return Checker_checkExpression(receiver, node);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkNonNullExpression","kind":"method","status":"implemented","sigHash":"adea2572a8298af4051c220bdd019e9c0838486b43c84226900ef926b49eaaef"}
 *
 * Go source:
 * func (c *Checker) checkNonNullExpression(node *ast.Node) *Type {
 * 	return c.checkNonNullType(c.checkExpression(node), node)
 * }
 */
export function Checker_checkNonNullExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  return Checker_checkNonNullType(receiver, Checker_checkExpression(receiver, node), node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkNonNullType","kind":"method","status":"implemented","sigHash":"b575ee3dd8712e597e5ab2c28d0cbfaab068f4265bcb03de76c1a9dbfc112dab"}
 *
 * Go source:
 * func (c *Checker) checkNonNullType(t *Type, node *ast.Node) *Type {
 * 	return c.checkNonNullTypeWithReporter(t, node, (*Checker).reportObjectPossiblyNullOrUndefinedError)
 * }
 */
export function Checker_checkNonNullType(receiver: GoPtr<Checker>, t: GoPtr<Type>, node: GoPtr<Node>): GoPtr<Type> {
  return Checker_checkNonNullTypeWithReporter(receiver, t, node, Checker_reportObjectPossiblyNullOrUndefinedError);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkNonNullNonVoidType","kind":"method","status":"implemented","sigHash":"3994a8da3eba5e6e4fd459c6d51976eab8af4f7e56fc17e178bfdb4408183eb3"}
 *
 * Go source:
 * func (c *Checker) checkNonNullNonVoidType(t *Type, node *ast.Node) *Type {
 * 	nonNullType := c.checkNonNullType(t, node)
 * 	if nonNullType.flags&TypeFlagsVoid != 0 {
 * 		if ast.IsEntityNameExpression(node) {
 * 			nodeText := entityNameToString(node)
 * 			if ast.IsIdentifier(node) && nodeText == "undefined" {
 * 				c.error(node, diagnostics.The_value_0_cannot_be_used_here, nodeText)
 * 				return nonNullType
 * 			}
 * 			if len(nodeText) < 100 {
 * 				c.error(node, diagnostics.X_0_is_possibly_undefined, nodeText)
 * 				return nonNullType
 * 			}
 * 		}
 * 		c.error(node, diagnostics.Object_is_possibly_undefined)
 * 	}
 * 	return nonNullType
 * }
 */
export function Checker_checkNonNullNonVoidType(receiver: GoPtr<Checker>, t: GoPtr<Type>, node: GoPtr<Node>): GoPtr<Type> {
  const nonNullType = Checker_checkNonNullType(receiver, t, node);
  if ((nonNullType!.flags & TypeFlagsVoid) !== 0) {
    if (IsEntityNameExpression(node)) {
      const nodeText = entityNameToString(node);
      if (IsIdentifier(node) && nodeText === "undefined") {
        Checker_error(receiver, node, diagnosticsMessages.The_value_0_cannot_be_used_here, nodeText);
        return nonNullType;
      }
      if (nodeText.length < 100) {
        Checker_error(receiver, node, diagnosticsMessages.X_0_is_possibly_undefined, nodeText);
        return nonNullType;
      }
    }
    Checker_error(receiver, node, diagnosticsMessages.Object_is_possibly_undefined);
  }
  return nonNullType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkExpressionWithContextualType","kind":"method","status":"implemented","sigHash":"9384715267a10d5fb7ae2b290550ebd2293a3236d3250264de0cc777662abd9d"}
 *
 * Go source:
 * func (c *Checker) checkExpressionWithContextualType(node *ast.Node, contextualType *Type, inferenceContext *InferenceContext, checkMode CheckMode) *Type {
 * 	contextNode := c.getContextNode(node)
 * 	c.pushContextualType(contextNode, contextualType, false /*isCache* /)
 * 	c.pushInferenceContext(contextNode, inferenceContext)
 * 	t := c.checkExpressionEx(node, checkMode|CheckModeContextual|core.IfElse(inferenceContext != nil, CheckModeInferential, 0))
 * 	// In CheckMode.Inferential we collect intra-expression inference sites to process before fixing any type
 * 	// parameters. This information is no longer needed after the call to checkExpression.
 * 	if inferenceContext != nil && inferenceContext.intraExpressionInferenceSites != nil {
 * 		inferenceContext.intraExpressionInferenceSites = nil
 * 	}
 * 	// We strip literal freshness when an appropriate contextual type is present such that contextually typed
 * 	// literals always preserve their literal types (otherwise they might widen during type inference). An alternative
 * 	// here would be to not mark contextually typed literals as fresh in the first place.
 * 	if c.maybeTypeOfKind(t, TypeFlagsLiteral) && c.isLiteralOfContextualType(t, c.instantiateContextualType(contextualType, node, ContextFlagsNone)) {
 * 		t = c.getRegularTypeOfLiteralType(t)
 * 	}
 * 	c.popInferenceContext()
 * 	c.popContextualType()
 * 	return t
 * }
 */
export function Checker_checkExpressionWithContextualType(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextualType: GoPtr<Type>, inferenceContext: GoPtr<InferenceContext>, checkMode: CheckMode): GoPtr<Type> {
  const contextNode = Checker_getContextNode(receiver, node);
  Checker_pushContextualType(receiver, contextNode, contextualType, false);
  Checker_pushInferenceContext(receiver, contextNode, inferenceContext);
  let t = Checker_checkExpressionEx(receiver, node, (checkMode | CheckModeContextual | (inferenceContext !== undefined ? CheckModeInferential : 0)) as CheckMode);
  if (inferenceContext !== undefined && !GoSliceIsNil(inferenceContext.intraExpressionInferenceSites)) {
    inferenceContext.intraExpressionInferenceSites = GoNilSlice();
  }
  if (Checker_maybeTypeOfKind(receiver, t, TypeFlagsLiteral) && Checker_isLiteralOfContextualType(receiver, t, Checker_instantiateContextualType(receiver, contextualType, node, ContextFlagsNone))) {
    t = Checker_getRegularTypeOfLiteralType(receiver, t);
  }
  Checker_popInferenceContext(receiver);
  Checker_popContextualType(receiver);
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextFreeTypeOfExpression","kind":"method","status":"implemented","sigHash":"12e9b582f40c313074dde65a9b3e5304fcf0fda2ba20f0204e7ecabcab54924f"}
 *
 * Go source:
 * func (c *Checker) getContextFreeTypeOfExpression(node *ast.Node) *Type {
 * 	if cached := c.contextFreeTypes[node]; cached != nil {
 * 		return cached
 * 	}
 * 	c.pushContextualType(node, c.anyType, false /*isCache* /)
 * 	t := c.checkExpressionEx(node, CheckModeSkipContextSensitive)
 * 	c.contextFreeTypes[node] = t
 * 	c.popContextualType()
 * 	return t
 * }
 */
export function Checker_getContextFreeTypeOfExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const cached = receiver!.contextFreeTypes.get(node);
  if (cached !== undefined) {
    return cached;
  }
  Checker_pushContextualType(receiver, node, receiver!.anyType, false);
  const t = Checker_checkExpressionEx(receiver, node, CheckModeSkipContextSensitive);
  receiver!.contextFreeTypes.set(node, t);
  Checker_popContextualType(receiver);
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkConstEnumAccess","kind":"method","status":"implemented","sigHash":"fc30dab030df3e97eb0c027fe76832b31632178a79c897464889490819bf4d3e"}
 *
 * Go source:
 * func (c *Checker) checkConstEnumAccess(node *ast.Node, t *Type) {
 * 	// enum object type for const enums are only permitted in:
 * 	// - 'left' in property access
 * 	// - 'object' in indexed access
 * 	// - target in rhs of import statement
 * 	ok := ast.IsPropertyAccessExpression(node.Parent) && node.Parent.Expression() == node ||
 * 		ast.IsElementAccessExpression(node.Parent) && node.Parent.Expression() == node ||
 * 		((ast.IsIdentifier(node) || ast.IsQualifiedName(node)) && isInRightSideOfImportOrExportAssignment(node) ||
 * 			ast.IsTypeQueryNode(node.Parent) && node.Parent.AsTypeQueryNode().ExprName == node) ||
 * 		ast.IsExportSpecifier(node.Parent) // We allow reexporting const enums
 * 	if !ok {
 * 		c.error(node, diagnostics.X_const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment_or_type_query)
 * 	}
 * 	// --verbatimModuleSyntax only gets checked here when the enum usage does not
 * 	// resolve to an import, because imports of ambient const enums get checked
 * 	// separately in `checkAliasSymbol`.
 * 	if c.compilerOptions.IsolatedModules.IsTrue() || c.compilerOptions.VerbatimModuleSyntax.IsTrue() && ok && c.resolveName(node, ast.GetFirstIdentifier(node).Text(), ast.SymbolFlagsAlias, nil, false, true) == nil {
 * 		debug.Assert(t.symbol.Flags&ast.SymbolFlagsConstEnum != 0)
 * 		constEnumDeclaration := t.symbol.ValueDeclaration
 * 		redirect := c.program.GetProjectReferenceFromOutputDts(ast.GetSourceFileOfNode(constEnumDeclaration).Path())
 * 		if constEnumDeclaration.Flags&ast.NodeFlagsAmbient != 0 && !ast.IsValidTypeOnlyAliasUseSite(node) && (redirect == nil || !redirect.Resolved.CompilerOptions().ShouldPreserveConstEnums()) {
 * 			c.error(node, diagnostics.Cannot_access_ambient_const_enums_when_0_is_enabled, c.getIsolatedModulesLikeFlagName())
 * 		}
 * 	}
 * }
 */
export function Checker_checkConstEnumAccess(receiver: GoPtr<Checker>, node: GoPtr<Node>, t: GoPtr<Type>): void {
  const parent = node!.Parent;
  const ok = (
    (IsPropertyAccessExpression(parent) && Node_Expression(parent) === node) ||
    (IsElementAccessExpression(parent) && Node_Expression(parent) === node) ||
    (((IsIdentifier(node) || IsQualifiedName(node)) && isInRightSideOfImportOrExportAssignment(node as GoPtr<EntityName>)) ||
      (IsTypeQueryNode(parent) && AsTypeQueryNode(parent)!.ExprName === node)) ||
    IsExportSpecifier(parent)
  ) as bool;
  if (!ok) {
    Checker_error(receiver, node, diagnosticsMessages.X_const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment_or_type_query);
  }
  if (
    receiver!.compilerOptions!.IsolatedModules === TSTrue ||
    (receiver!.compilerOptions!.VerbatimModuleSyntax === TSTrue && ok && receiver!.resolveName!(node, Node_Text(GetFirstIdentifier(node)), SymbolFlagsAlias, undefined, false, true) === undefined)
  ) {
    const constEnumDeclaration = t!.symbol!.ValueDeclaration;
    const redirect = receiver!.program!.GetProjectReferenceFromOutputDts(SourceFile_Path(GetSourceFileOfNode(constEnumDeclaration)));
    if (
      (constEnumDeclaration!.Flags & NodeFlagsAmbient) !== 0 &&
      !IsValidTypeOnlyAliasUseSite(node) &&
      (redirect === undefined || !CompilerOptions_ShouldPreserveConstEnums(redirect!.Resolved!.ParsedConfig!.CompilerOptions))
    ) {
      Checker_error(receiver, node, diagnosticsMessages.Cannot_access_ambient_const_enums_when_0_is_enabled, Checker_getIsolatedModulesLikeFlagName(receiver));
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTemplateExpression","kind":"method","status":"implemented","sigHash":"8acbaa4e7e4fb15c20f1c8060beb5d95033d997f06be74305f024e325b1927af"}
 *
 * Go source:
 * func (c *Checker) checkTemplateExpression(node *ast.Node) *Type {
 * 	expr := node.AsTemplateExpression()
 * 	length := len(expr.TemplateSpans.Nodes)
 * 	texts := make([]string, length+1)
 * 	types := make([]*Type, length)
 * 	texts[0] = expr.Head.Text()
 * 	for i, span := range expr.TemplateSpans.Nodes {
 * 		t := c.checkExpression(span.Expression())
 * 		if c.maybeTypeOfKindConsideringBaseConstraint(t, TypeFlagsESSymbolLike) {
 * 			c.error(span.Expression(), diagnostics.Implicit_conversion_of_a_symbol_to_a_string_will_fail_at_runtime_Consider_wrapping_this_expression_in_String)
 * 		}
 * 		texts[i+1] = span.AsTemplateSpan().Literal.Text()
 * 		types[i] = core.IfElse(c.isTypeAssignableTo(t, c.templateConstraintType), t, c.stringType)
 * 	}
 * 	var evaluated any
 * 	if !ast.IsTaggedTemplateExpression(node.Parent) {
 * 		evaluated = c.evaluate(node, node).Value
 * 	}
 * 	if evaluated != nil {
 * 		return c.getFreshTypeOfLiteralType(c.getStringLiteralType(evaluated.(string)))
 * 	}
 * 	if c.isConstContext(node) || c.isTemplateLiteralContext(node) || someType(core.OrElse(c.getContextualType(node, ContextFlagsNone), c.unknownType), c.isTemplateLiteralContextualType) {
 * 		return c.getTemplateLiteralType(texts, types)
 * 	}
 * 	return c.stringType
 * }
 */
export function Checker_checkTemplateExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const expression = AsTemplateExpression(node)!;
  const length = expression.TemplateSpans!.Nodes.length;
  const texts = new Array<string>(length + 1);
  const types = new Array<GoPtr<Type>>(length);
  texts[0] = Node_Text(expression.Head);
  for (let index = 0; index < expression.TemplateSpans!.Nodes.length; index++) {
    const span = GoSliceLoad(expression.TemplateSpans!.Nodes, index, GoPointerValueOps<Node>());
    const expressionType = Checker_checkExpression(receiver, Node_Expression(span));
    if (Checker_maybeTypeOfKindConsideringBaseConstraint(receiver, expressionType, TypeFlagsESSymbolLike)) {
      Checker_error(receiver, Node_Expression(span), diagnosticsMessages.Implicit_conversion_of_a_symbol_to_a_string_will_fail_at_runtime_Consider_wrapping_this_expression_in_String);
    }
    texts[index + 1] = Node_Text(AsTemplateSpan(span)!.Literal);
    types[index] = Checker_isTypeAssignableTo(receiver, expressionType, receiver!.templateConstraintType) ? expressionType : receiver!.stringType;
  }
  let evaluated: unknown = undefined;
  if (node!.Parent?.Kind !== KindTaggedTemplateExpression) {
    evaluated = receiver!.evaluate!(node, node).Value;
  }
  if (evaluated !== undefined) {
    return Checker_getFreshTypeOfLiteralType(receiver, Checker_getStringLiteralType(receiver, evaluated as string));
  }
  if (
    Checker_isConstContext(receiver, node) ||
    Checker_isTemplateLiteralContext(receiver, node) ||
    someType(core.OrElse(Checker_getContextualType(receiver, node, ContextFlagsNone), receiver!.unknownType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>), (candidate: GoPtr<Type>): bool => Checker_isTemplateLiteralContextualType(receiver, candidate))
  ) {
    return Checker_getTemplateLiteralType(receiver, texts, types);
  }
  return receiver!.stringType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isTemplateLiteralContext","kind":"method","status":"implemented","sigHash":"ab4a8ee215e83f7252932e3b2772f456edad03cc359949748d6b4f6bc3bd494b"}
 *
 * Go source:
 * func (c *Checker) isTemplateLiteralContext(node *ast.Node) bool {
 * 	parent := node.Parent
 * 	return ast.IsParenthesizedExpression(parent) && c.isTemplateLiteralContext(parent) || ast.IsElementAccessExpression(parent) && parent.AsElementAccessExpression().ArgumentExpression == node
 * }
 */
export function Checker_isTemplateLiteralContext(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  const parent = node!.Parent;
  return (IsParenthesizedExpression(parent) && Checker_isTemplateLiteralContext(receiver, parent)) || (IsElementAccessExpression(parent) && AsElementAccessExpression(parent)!.ArgumentExpression === node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isTemplateLiteralContextualType","kind":"method","status":"implemented","sigHash":"d3f12cf2644ac1f21d2276fda71d7102359192b723e2d69c77d6588f33a9822e"}
 *
 * Go source:
 * func (c *Checker) isTemplateLiteralContextualType(t *Type) bool {
 * 	return t.flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral) != 0 || t.flags&TypeFlagsInstantiableNonPrimitive != 0 && c.maybeTypeOfKind(core.OrElse(c.getBaseConstraintOfType(t), c.unknownType), TypeFlagsStringLike)
 * }
 */
export function Checker_isTemplateLiteralContextualType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (t!.flags & (TypeFlagsStringLiteral | TypeFlagsTemplateLiteral)) !== 0 || ((t!.flags & TypeFlagsInstantiableNonPrimitive) !== 0 && Checker_maybeTypeOfKind(receiver, core.OrElse(Checker_getBaseConstraintOfType(receiver, t), receiver!.unknownType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>), TypeFlagsStringLike));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkRegularExpressionLiteral","kind":"method","status":"implemented","sigHash":"e7ff3da0677169bbbdc57eca322f1e2afe52148c8035fbe3043ce23879591572"}
 *
 * Go source:
 * func (c *Checker) checkRegularExpressionLiteral(node *ast.Node) *Type {
 * 	nodeLinks := c.nodeLinks.Get(node)
 * 	if nodeLinks.flags&NodeCheckFlagsTypeChecked == 0 {
 * 		nodeLinks.flags |= NodeCheckFlagsTypeChecked
 * 		c.checkGrammarRegularExpressionLiteral(node.AsRegularExpressionLiteral())
 * 	}
 * 	return c.globalRegExpType
 * }
 */
export function Checker_checkRegularExpressionLiteral(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const nodeLinks = LinkStore_Get(receiver!.nodeLinks, node, zeroNodeLinks, goNodePointerKey)!.v;
  if ((nodeLinks!.flags & NodeCheckFlagsTypeChecked) === 0) {
    nodeLinks!.flags |= NodeCheckFlagsTypeChecked;
    Checker_checkGrammarRegularExpressionLiteral(receiver, AsRegularExpressionLiteral(node));
  }
  return receiver!.globalRegExpType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkArrayLiteral","kind":"method","status":"implemented","sigHash":"927633b27822d4274a96677bba66a59255644c4f6cea2455185f1ddadc5d2b03"}
 *
 * Go source:
 * func (c *Checker) checkArrayLiteral(node *ast.Node, checkMode CheckMode) *Type {
 * 	elements := node.Elements()
 * 	elementTypes := make([]*Type, len(elements))
 * 	elementInfos := make([]TupleElementInfo, len(elements))
 * 	c.pushCachedContextualType(node)
 * 	inDestructuringPattern := ast.IsAssignmentTarget(node)
 * 	inConstContext := c.isConstContext(node)
 * 	contextualType := c.getApparentTypeOfContextualType(node, ContextFlagsNone)
 * 	inTupleContext := isSpreadIntoCallOrNew(node) || contextualType != nil && someType(contextualType, func(t *Type) bool {
 * 		return c.isTupleLikeType(t) || c.isGenericMappedType(t) && t.AsMappedType().nameType == nil && c.getHomomorphicTypeVariable(core.OrElse(t.AsMappedType().target, t)) != nil
 * 	})
 * 	hasOmittedExpression := false
 * 	for i, e := range elements {
 * 		switch {
 * 		case ast.IsSpreadElement(e):
 * 			spreadType := c.checkExpressionEx(e.Expression(), checkMode)
 * 			switch {
 * 			case c.isArrayLikeType(spreadType):
 * 				elementTypes[i] = spreadType
 * 				elementInfos[i] = TupleElementInfo{flags: ElementFlagsVariadic}
 * 			case inDestructuringPattern:
 * 				// Given the following situation:
 * 				//    var c: {};
 * 				//    [...c] = ["", 0];
 * 				//
 * 				// c is represented in the tree as a spread element in an array literal.
 * 				// But c really functions as a rest element, and its purpose is to provide
 * 				// a contextual type for the right hand side of the assignment. Therefore,
 * 				// instead of calling checkExpression on "...c", which will give an error
 * 				// if c is not iterable/array-like, we need to act as if we are trying to
 * 				// get the contextual element type from it. So we do something similar to
 * 				// getContextualTypeForElementExpression, which will crucially not error
 * 				// if there is no index type / iterated type.
 * 				restElementType := c.getIndexTypeOfType(spreadType, c.numberType)
 * 				if restElementType == nil {
 * 					restElementType = c.getIteratedTypeOrElementType(IterationUseDestructuring, spreadType, c.undefinedType, nil /*errorNode* /, false /*checkAssignability* /)
 * 					if restElementType == nil {
 * 						restElementType = c.unknownType
 * 					}
 * 				}
 * 				elementTypes[i] = restElementType
 * 				elementInfos[i] = TupleElementInfo{flags: ElementFlagsRest}
 * 			default:
 * 				elementTypes[i] = c.checkIteratedTypeOrElementType(IterationUseSpread, spreadType, c.undefinedType, e.Expression())
 * 				elementInfos[i] = TupleElementInfo{flags: ElementFlagsRest}
 * 			}
 * 		case c.exactOptionalPropertyTypes && ast.IsOmittedExpression(e):
 * 			hasOmittedExpression = true
 * 			elementTypes[i] = c.undefinedOrMissingType
 * 			elementInfos[i] = TupleElementInfo{flags: ElementFlagsOptional}
 * 		default:
 * 			t := c.checkExpressionForMutableLocation(e, checkMode)
 * 			elementTypes[i] = c.addOptionalityEx(t, true /*isProperty* /, hasOmittedExpression)
 * 			elementInfos[i] = TupleElementInfo{flags: core.IfElse(hasOmittedExpression, ElementFlagsOptional, ElementFlagsRequired)}
 * 			if inTupleContext && checkMode&CheckModeInferential != 0 && checkMode&CheckModeSkipContextSensitive == 0 && c.isContextSensitive(e) {
 * 				inferenceContext := c.getInferenceContext(node)
 * 				// In CheckMode.Inferential we should always have an inference context
 * 				c.addIntraExpressionInferenceSite(inferenceContext, e, t)
 * 			}
 * 		}
 * 	}
 * 	c.popContextualType()
 * 	if inDestructuringPattern {
 * 		return c.createTupleTypeEx(elementTypes, elementInfos, false)
 * 	}
 * 	if checkMode&CheckModeForceTuple != 0 || inConstContext || inTupleContext {
 * 		return c.createArrayLiteralType(c.createTupleTypeEx(elementTypes, elementInfos, inConstContext && !(contextualType != nil && someType(contextualType, c.isMutableArrayLikeType)) /*readonly* /))
 * 	}
 * 	var elementType *Type
 * 	if len(elementTypes) != 0 {
 * 		for i, e := range elementTypes {
 * 			if elementInfos[i].flags&ElementFlagsVariadic != 0 {
 * 				elementTypes[i] = core.OrElse(c.getIndexedAccessTypeOrUndefined(e, c.numberType, AccessFlagsNone, nil, nil), c.anyType)
 * 			}
 * 		}
 * 		elementType = c.getUnionTypeEx(elementTypes, UnionReductionSubtype, nil, nil)
 * 	} else {
 * 		elementType = core.IfElse(c.strictNullChecks, c.implicitNeverType, c.undefinedWideningType)
 * 	}
 * 	return c.createArrayLiteralType(c.createArrayTypeEx(elementType, inConstContext))
 * }
 */
export function Checker_checkArrayLiteral(receiver: GoPtr<Checker>, node: GoPtr<Node>, checkMode: CheckMode): GoPtr<Type> {
  const elements = Node_Elements(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
  const elementTypes: GoPtr<Type>[] = new Array(elements.length);
  const elementInfos: TupleElementInfo[] = new Array(elements.length);
  Checker_pushCachedContextualType(receiver, node);
  try {
    const inDestructuringPattern = IsAssignmentTarget(node);
    const inConstContext = Checker_isConstContext(receiver, node);
    const contextualType = Checker_getApparentTypeOfContextualType(receiver, node, ContextFlagsNone);
    const inTupleContext = isSpreadIntoCallOrNew(node) ||
      (contextualType !== undefined && someType(contextualType, (t) =>
        Checker_isTupleLikeType(receiver, t) ||
        (Checker_isGenericMappedType(receiver, t) &&
          Type_AsMappedType(t)!.nameType === undefined &&
          Checker_getHomomorphicTypeVariable(receiver, core.OrElse(Type_AsMappedType(t)!.__tsgoEmbedded0!.target, t, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>)) !== undefined),
      ));
    let hasOmittedExpression = false;
    for (let i = 0; i < elements.length; i++) {
      const element = GoSliceLoad(elements, i, GoPointerValueOps<Node>());
      if (IsSpreadElement(element)) {
        const spreadType = Checker_checkExpressionEx(receiver, Node_Expression(element), checkMode);
        if (Checker_isArrayLikeType(receiver, spreadType)) {
          elementTypes[i] = spreadType;
          elementInfos[i] = { flags: ElementFlagsVariadic, labeledDeclaration: undefined };
        } else if (inDestructuringPattern) {
          let restElementType = Checker_getIndexTypeOfType(receiver, spreadType, receiver!.numberType);
          if (restElementType === undefined) {
            restElementType = Checker_getIteratedTypeOrElementType(receiver, IterationUseDestructuring as IterationUse, spreadType, receiver!.undefinedType, undefined, false);
            if (restElementType === undefined) {
              restElementType = receiver!.unknownType;
            }
          }
          elementTypes[i] = restElementType;
          elementInfos[i] = { flags: ElementFlagsRest, labeledDeclaration: undefined };
        } else {
          elementTypes[i] = Checker_checkIteratedTypeOrElementType(receiver, IterationUseSpread as IterationUse, spreadType, receiver!.undefinedType, Node_Expression(element));
          elementInfos[i] = { flags: ElementFlagsRest, labeledDeclaration: undefined };
        }
      } else if (receiver!.exactOptionalPropertyTypes && IsOmittedExpression(element)) {
        hasOmittedExpression = true;
        elementTypes[i] = receiver!.undefinedOrMissingType;
        elementInfos[i] = { flags: ElementFlagsOptionalFlag, labeledDeclaration: undefined };
      } else {
        const t = Checker_checkExpressionForMutableLocation(receiver, element, checkMode);
        elementTypes[i] = Checker_addOptionalityEx(receiver, t, true, hasOmittedExpression);
        elementInfos[i] = { flags: core.IfElse(hasOmittedExpression, ElementFlagsOptionalFlag, ElementFlagsRequired), labeledDeclaration: undefined };
        if (inTupleContext && (checkMode & CheckModeInferential) !== 0 && (checkMode & CheckModeSkipContextSensitive) === 0 && Checker_isContextSensitive(receiver, element)) {
          const inferenceContext = Checker_getInferenceContext(receiver, node);
          Checker_addIntraExpressionInferenceSite(receiver, inferenceContext, element, t);
        }
      }
    }
    if (inDestructuringPattern) {
      return Checker_createTupleTypeEx(receiver, elementTypes, elementInfos, false);
    }
    if ((checkMode & CheckModeForceTuple) !== 0 || inConstContext || inTupleContext) {
      return Checker_createArrayLiteralType(receiver, Checker_createTupleTypeEx(
        receiver,
        elementTypes,
        elementInfos,
        inConstContext && !(contextualType !== undefined && someType(contextualType, (t) => Checker_isMutableArrayLikeType(receiver, t))),
      ));
    }
    let elementType: GoPtr<Type>;
    if (elementTypes.length !== 0) {
      for (let i = 0; i < elementTypes.length; i++) {
        if ((elementInfos[i]!.flags & ElementFlagsVariadic) !== 0) {
          elementTypes[i] = core.OrElse(Checker_getIndexedAccessTypeOrUndefined(receiver, elementTypes[i], receiver!.numberType, AccessFlagsNone, undefined, undefined), receiver!.anyType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
        }
      }
      elementType = Checker_getUnionTypeEx(receiver, elementTypes, UnionReductionSubtype, undefined, undefined);
    } else {
      elementType = core.IfElse(receiver!.strictNullChecks, receiver!.implicitNeverType, receiver!.undefinedWideningType);
    }
    return Checker_createArrayLiteralType(receiver, Checker_createArrayTypeEx(receiver, elementType, inConstContext));
  } finally {
    Checker_popContextualType(receiver);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createArrayLiteralType","kind":"method","status":"implemented","sigHash":"586702f3d1cebaeb563adca6b84f0485a53fa89300b9514a4679cdf1f343884f"}
 *
 * Go source:
 * func (c *Checker) createArrayLiteralType(t *Type) *Type {
 * 	if t.objectFlags&ObjectFlagsReference == 0 {
 * 		return t
 * 	}
 * 	key := CachedTypeKey{kind: CachedTypeKindArrayLiteralType, typeId: t.id}
 * 	if cached, ok := c.cachedTypes[key]; ok {
 * 		return cached
 * 	}
 * 	literalType := c.cloneTypeReference(t)
 * 	literalType.objectFlags |= ObjectFlagsArrayLiteral | ObjectFlagsContainsObjectOrArrayLiteral
 * 	c.cachedTypes[key] = literalType
 * 	return literalType
 * }
 */
export function Checker_createArrayLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.objectFlags & ObjectFlagsReference) === 0) {
    return t;
  }
  const key: CachedTypeKey = { kind: CachedTypeKindArrayLiteralType, typeId: t!.id };
  const cached = receiver!.cachedTypes.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const literalType = Checker_cloneTypeReference(receiver, t);
  literalType!.objectFlags |= ObjectFlagsArrayLiteral | ObjectFlagsContainsObjectOrArrayLiteral;
  receiver!.cachedTypes.set(key, literalType);
  return literalType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.typeHasProtectedAccessibleBase","kind":"method","status":"implemented","sigHash":"9982ba1bcc31de55e2f0bc8a2ab9215bd48d459315d0a3ad46fdc468e0b3821a"}
 *
 * Go source:
 * func (c *Checker) typeHasProtectedAccessibleBase(target *ast.Symbol, t *Type) bool {
 * 	baseTypes := c.getBaseTypes(c.getTargetType(t))
 * 	if len(baseTypes) == 0 {
 * 		return false
 * 	}
 * 	firstBase := baseTypes[0]
 * 	if firstBase.flags&TypeFlagsIntersection != 0 {
 * 		types := firstBase.AsIntersectionType().types
 * 		mixinFlags, _ := c.findMixins(types)
 * 		for i, intersectionMember := range firstBase.Types() {
 * 			// We want to ignore mixin ctors
 * 			if !mixinFlags[i] {
 * 				if intersectionMember.objectFlags&(ObjectFlagsClass|ObjectFlagsInterface) != 0 {
 * 					if intersectionMember.symbol == target {
 * 						return true
 * 					}
 * 					if c.typeHasProtectedAccessibleBase(target, intersectionMember) {
 * 						return true
 * 					}
 * 				}
 * 			}
 * 		}
 * 		return false
 * 	}
 * 	if firstBase.symbol == target {
 * 		return true
 * 	}
 * 	return c.typeHasProtectedAccessibleBase(target, firstBase)
 * }
 */
export function Checker_typeHasProtectedAccessibleBase(receiver: GoPtr<Checker>, target: GoPtr<Symbol>, t: GoPtr<Type>): bool {
  const baseTypes = Checker_getBaseTypes(receiver, Checker_getTargetType(receiver, t));
  if (baseTypes.length === 0) {
    return false;
  }
  const firstBase = GoSliceLoad(baseTypes, 0, GoPointerValueOps<Type>());
  if ((firstBase!.flags & TypeFlagsIntersection) !== 0) {
    const types = Type_Types(firstBase)!;
    const [mixinFlags] = Checker_findMixins(receiver, types);
    for (let index = 0; index < types.length; index++) {
      const intersectionMember = GoSliceLoad(types, index, GoPointerValueOps<Type>());
      if (!mixinFlags[index]) {
        if ((intersectionMember!.objectFlags & ObjectFlagsClassOrInterface) !== 0) {
          if (intersectionMember!.symbol === target) {
            return true;
          }
          if (Checker_typeHasProtectedAccessibleBase(receiver, target, intersectionMember)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  if (firstBase!.symbol === target) {
    return true;
  }
  return Checker_typeHasProtectedAccessibleBase(receiver, target, firstBase);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.resolveTaggedTemplateExpression","kind":"method","status":"implemented","sigHash":"656d5e0b105bdb48335ccd9ed5bdbc1ca718b64964c2b11c939330e5b957c5b3"}
 *
 * Go source:
 * func (c *Checker) resolveTaggedTemplateExpression(node *ast.Node, candidatesOutArray *[]*Signature, checkMode CheckMode) *Signature {
 * 	tag := node.AsTaggedTemplateExpression().Tag
 * 	tagType := c.checkExpression(tag)
 * 	apparentType := c.getApparentType(tagType)
 * 	if c.isErrorType(apparentType) {
 * 		// Another error has already been reported
 * 		return c.resolveErrorCall(node)
 * 	}
 * 	callSignatures := c.getSignaturesOfType(apparentType, SignatureKindCall)
 * 	numConstructSignatures := len(c.getSignaturesOfType(apparentType, SignatureKindConstruct))
 * 	if c.isUntypedFunctionCall(tagType, apparentType, len(callSignatures), numConstructSignatures) {
 * 		return c.resolveUntypedCall(node)
 * 	}
 * 	if len(callSignatures) == 0 {
 * 		if ast.IsArrayLiteralExpression(node.Parent) {
 * 			c.error(tag, diagnostics.It_is_likely_that_you_are_missing_a_comma_to_separate_these_two_template_expressions_They_form_a_tagged_template_expression_which_cannot_be_invoked)
 * 			return c.resolveErrorCall(node)
 * 		}
 * 		c.invocationError(tag, apparentType, SignatureKindCall, nil)
 * 		return c.resolveErrorCall(node)
 * 	}
 * 	return c.resolveCall(node, callSignatures, candidatesOutArray, checkMode, SignatureFlagsNone, nil)
 * }
 */
export function Checker_resolveTaggedTemplateExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>, candidatesOutArray: GoRef<GoSlice<GoPtr<Signature>>>, checkMode: CheckMode): GoPtr<Signature> {
  const tag = AsTaggedTemplateExpression(node)!.Tag;
  const tagType = Checker_checkExpression(receiver, tag);
  const apparentType = Checker_getApparentType(receiver, tagType);
  if (Checker_isErrorType(receiver, apparentType)) {
    return Checker_resolveErrorCall(receiver, node);
  }
  const callSignatures = Checker_getSignaturesOfType(receiver, apparentType, SignatureKindCall);
  const numConstructSignatures = Checker_getSignaturesOfType(receiver, apparentType, SignatureKindConstruct).length;
  if (Checker_isUntypedFunctionCall(receiver, tagType, apparentType, callSignatures.length, numConstructSignatures)) {
    return Checker_resolveUntypedCall(receiver, node);
  }
  if (callSignatures.length === 0) {
    if (IsArrayLiteralExpression(node!.Parent)) {
      Checker_error(receiver, tag, diagnosticsMessages.It_is_likely_that_you_are_missing_a_comma_to_separate_these_two_template_expressions_They_form_a_tagged_template_expression_which_cannot_be_invoked);
      return Checker_resolveErrorCall(receiver, node);
    }
    Checker_invocationError(receiver, tag, apparentType, SignatureKindCall, undefined);
    return Checker_resolveErrorCall(receiver, node);
  }
  return Checker_resolveCall(receiver, node, callSignatures, candidatesOutArray, checkMode, SignatureFlagsNone, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTaggedTemplateExpression","kind":"method","status":"implemented","sigHash":"befea4ed192a030ccd7db5245a1d668d90554df1367652d0bf5f4e5aaa99669e"}
 *
 * Go source:
 * func (c *Checker) checkTaggedTemplateExpression(node *ast.Node) *Type {
 * 	if !c.checkGrammarTaggedTemplateChain(node.AsTaggedTemplateExpression()) {
 * 		c.checkGrammarTypeArguments(node, node.TypeArgumentList())
 * 	}
 * 	signature := c.getResolvedSignature(node, nil, CheckModeNormal)
 * 	c.checkDeprecatedSignature(signature, node)
 * 	return c.getReturnTypeOfSignature(signature)
 * }
 */
export function Checker_checkTaggedTemplateExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  if (!Checker_checkGrammarTaggedTemplateChain(receiver, AsTaggedTemplateExpression(node))) {
    Checker_checkGrammarTypeArguments(receiver, node, Node_TypeArgumentList(node));
  }
  const signature = Checker_getResolvedSignature(receiver, node, undefined, CheckModeNormal);
  Checker_checkDeprecatedSignature(receiver, signature, node);
  return Checker_getReturnTypeOfSignature(receiver, signature);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkFunctionExpressionOrObjectLiteralMethod","kind":"method","status":"implemented","sigHash":"859600ecccc881556871334ba1a92ab4d186a12817eb41cd0858593bbe9111cd"}
 *
 * Go source:
 * func (c *Checker) checkFunctionExpressionOrObjectLiteralMethod(node *ast.Node, checkMode CheckMode) *Type {
 * 	c.checkNodeDeferred(node)
 * 	if ast.IsFunctionExpression(node) {
 * 		c.checkCollisionsForDeclarationName(node, node.Name())
 * 	}
 * 	if checkMode&CheckModeSkipContextSensitive != 0 && c.isContextSensitive(node) {
 * 		// Skip parameters, return signature with return type that retains noncontextual parts so inferences can still be drawn in an early stage
 * 		if node.Type() == nil && !ast.HasContextSensitiveParameters(node) {
 * 			// Return plain anyFunctionType if there is no possibility we'll make inferences from the return type
 * 			contextualSignature := c.getContextualSignature(node)
 * 			if contextualSignature != nil && c.couldContainTypeVariables(c.getReturnTypeOfSignature(contextualSignature)) {
 * 				if cached, ok := c.contextFreeTypes[node]; ok {
 * 					return cached
 * 				}
 * 				returnType := c.getReturnTypeFromBody(node, checkMode)
 * 				returnOnlySignature := c.newSignature(SignatureFlagsIsNonInferrable, nil, nil /*typeParameters* /, nil /*thisParameter* /, nil, returnType, nil /*resolvedTypePredicate* /, 0)
 * 				returnOnlyType := c.newAnonymousType(node.Symbol(), nil, []*Signature{returnOnlySignature}, nil, nil)
 * 				returnOnlyType.objectFlags |= ObjectFlagsNonInferrableType
 * 				c.contextFreeTypes[node] = returnOnlyType
 * 				return returnOnlyType
 * 			}
 * 		}
 * 		return c.anyFunctionType
 * 	}
 * 	// Grammar checking
 * 	hasGrammarError := c.checkGrammarFunctionLikeDeclaration(node)
 * 	if !hasGrammarError && ast.IsFunctionExpression(node) {
 * 		c.checkGrammarForGenerator(node)
 * 	}
 * 	if node.FunctionLikeData().FullSignature != nil {
 * 		if c.getContextualCallSignature(c.getTypeFromTypeNode(node.FunctionLikeData().FullSignature), node) == nil {
 * 			c.error(node.FunctionLikeData().FullSignature, diagnostics.A_JSDoc_type_tag_on_a_function_must_have_a_signature_with_the_correct_number_of_arguments)
 * 		}
 * 	}
 * 	c.contextuallyCheckFunctionExpressionOrObjectLiteralMethod(node, checkMode)
 * 	return c.getTypeOfSymbol(c.getSymbolOfDeclaration(node))
 * }
 */
export function Checker_checkFunctionExpressionOrObjectLiteralMethod(receiver: GoPtr<Checker>, node: GoPtr<Node>, checkMode: CheckMode): GoPtr<Type> {
  Checker_checkNodeDeferred(receiver, node);
  if (IsFunctionExpressionOrArrowFunction(node) && node!.Kind === KindFunctionExpression) {
    Checker_checkCollisionsForDeclarationName(receiver, node, Node_Name(node));
  }
  if ((checkMode & CheckModeSkipContextSensitive) !== 0 && Checker_isContextSensitive(receiver, node)) {
    if (Node_Type(node) === undefined && !HasContextSensitiveParameters(node)) {
      const contextualSignature = Checker_getContextualSignature(receiver, node);
      if (contextualSignature !== undefined && receiver!.couldContainTypeVariables!(Checker_getReturnTypeOfSignature(receiver, contextualSignature))) {
        const cached = receiver!.contextFreeTypes.get(node);
        if (cached !== undefined) {
          return cached;
        }
        const returnType = Checker_getReturnTypeFromBody(receiver, node, checkMode);
        const returnOnlySignature = Checker_newSignature(receiver, SignatureFlagsIsNonInferrable, undefined, GoNilSlice(), undefined, GoNilSlice(), returnType, undefined, 0);
        const returnOnlyType = Checker_newAnonymousType(receiver, Node_Symbol(node), GoNilMap<string, GoPtr<Symbol>>(), GoSliceBuild(1, 1, GoPointerValueOps<Signature>(), (__goSliceLiteral) => {
          GoSliceStore(__goSliceLiteral, 0, returnOnlySignature, GoPointerValueOps<Signature>());
        }), GoNilSlice<GoPtr<Signature>>(), GoNilSlice<GoPtr<IndexInfo>>());
        returnOnlyType!.objectFlags |= ObjectFlagsNonInferrableType;
        receiver!.contextFreeTypes.set(node, returnOnlyType);
        return returnOnlyType;
      }
    }
    return receiver!.anyFunctionType;
  }
  const hasGrammarError = Checker_checkGrammarFunctionLikeDeclaration(receiver, node);
  if (!hasGrammarError && node!.Kind === KindFunctionExpression) {
    Checker_checkGrammarForGenerator(receiver, node);
  }
  const fullSignature = Node_FunctionLikeData(node)!.FullSignature;
  if (fullSignature !== undefined) {
    if (Checker_getContextualCallSignature(receiver, Checker_getTypeFromTypeNode(receiver, fullSignature), node) === undefined) {
      Checker_error(receiver, fullSignature, diagnosticsMessages.A_JSDoc_type_tag_on_a_function_must_have_a_signature_with_the_correct_number_of_arguments);
    }
  }
  Checker_contextuallyCheckFunctionExpressionOrObjectLiteralMethod(receiver, node, checkMode);
  return Checker_getTypeOfSymbol(receiver, Checker_getSymbolOfDeclaration(receiver, node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.contextuallyCheckFunctionExpressionOrObjectLiteralMethod","kind":"method","status":"implemented","sigHash":"f7e25eaa1c9ff5ff85180b2dceb0688c65c51458d88e55bd3281384533eb4d0a"}
 *
 * Go source:
 * func (c *Checker) contextuallyCheckFunctionExpressionOrObjectLiteralMethod(node *ast.Node, checkMode CheckMode) {
 * 	links := c.nodeLinks.Get(node)
 * 	// Check if function expression is contextually typed and assign parameter types if so.
 * 	if links.flags&NodeCheckFlagsContextChecked == 0 {
 * 		contextualSignature := c.getContextualSignature(node)
 * 		// If a type check is started at a function expression that is an argument of a function call, obtaining the
 * 		// contextual type may recursively get back to here during overload resolution of the call. If so, we will have
 * 		// already assigned contextual types.
 * 		if links.flags&NodeCheckFlagsContextChecked == 0 {
 * 			links.flags |= NodeCheckFlagsContextChecked
 * 			signature := core.FirstOrNil(c.getSignaturesOfType(c.getTypeOfSymbol(c.getSymbolOfDeclaration(node)), SignatureKindCall))
 * 			if signature == nil {
 * 				return
 * 			}
 * 			if c.isContextSensitive(node) {
 * 				if contextualSignature != nil {
 * 					inferenceContext := c.getInferenceContext(node)
 * 					var instantiatedContextualSignature *Signature
 * 					if checkMode&CheckModeInferential != 0 {
 * 						c.inferFromAnnotatedParametersAndReturn(signature, contextualSignature, inferenceContext)
 * 						restType := c.getEffectiveRestType(contextualSignature)
 * 						if restType != nil && restType.flags&TypeFlagsTypeParameter != 0 {
 * 							instantiatedContextualSignature = c.instantiateSignature(contextualSignature, inferenceContext.nonFixingMapper)
 * 						}
 * 					}
 * 					if instantiatedContextualSignature == nil {
 * 						if inferenceContext != nil {
 * 							instantiatedContextualSignature = c.instantiateSignature(contextualSignature, inferenceContext.mapper)
 * 						} else {
 * 							instantiatedContextualSignature = contextualSignature
 * 						}
 * 					}
 * 					c.assignContextualParameterTypes(signature, instantiatedContextualSignature)
 * 				} else {
 * 					// Force resolution of all parameter types such that the absence of a contextual type is consistently reflected.
 * 					c.assignNonContextualParameterTypes(signature)
 * 				}
 * 			} else if contextualSignature != nil && node.TypeParameters() == nil && len(contextualSignature.parameters) > len(node.Parameters()) {
 * 				inferenceContext := c.getInferenceContext(node)
 * 				if checkMode&CheckModeInferential != 0 {
 * 					c.inferFromAnnotatedParametersAndReturn(signature, contextualSignature, inferenceContext)
 * 				}
 * 			}
 * 			if contextualSignature != nil && c.getReturnTypeFromAnnotation(node) == nil && signature.resolvedReturnType == nil {
 * 				returnType := c.getReturnTypeFromBody(node, checkMode)
 * 				if signature.resolvedReturnType == nil {
 * 					signature.resolvedReturnType = returnType
 * 				}
 * 			}
 * 			c.checkSignatureDeclaration(node)
 * 		}
 * 	}
 * }
 */
export function Checker_contextuallyCheckFunctionExpressionOrObjectLiteralMethod(receiver: GoPtr<Checker>, node: GoPtr<Node>, checkMode: CheckMode): void {
  const links = LinkStore_Get(receiver!.nodeLinks, node, zeroNodeLinks, goNodePointerKey)!.v;
  if ((links!.flags & NodeCheckFlagsContextChecked) === 0) {
    const contextualSignature = Checker_getContextualSignature(receiver, node);
    if ((links!.flags & NodeCheckFlagsContextChecked) === 0) {
      links!.flags |= NodeCheckFlagsContextChecked;
      const signature = core.FirstOrNil(Checker_getSignaturesOfType(receiver, Checker_getTypeOfSymbol(receiver, Checker_getSymbolOfDeclaration(receiver, node)), SignatureKindCall), GoZeroPointer<Signature>);
      if (signature === undefined) {
        return;
      }
      if (Checker_isContextSensitive(receiver, node)) {
        if (contextualSignature !== undefined) {
          const inferenceContext = Checker_getInferenceContext(receiver, node);
          let instantiatedContextualSignature: GoPtr<Signature>;
          if ((checkMode & CheckModeInferential) !== 0) {
            Checker_inferFromAnnotatedParametersAndReturn(receiver, signature, contextualSignature, inferenceContext);
            const restType = Checker_getEffectiveRestType(receiver, contextualSignature);
            if (restType !== undefined && (restType!.flags & TypeFlagsTypeParameter) !== 0) {
              instantiatedContextualSignature = Checker_instantiateSignature(receiver, contextualSignature, inferenceContext!.nonFixingMapper);
            }
          }
          if (instantiatedContextualSignature === undefined) {
            if (inferenceContext !== undefined) {
              instantiatedContextualSignature = Checker_instantiateSignature(receiver, contextualSignature, inferenceContext!.mapper);
            } else {
              instantiatedContextualSignature = contextualSignature;
            }
          }
          Checker_assignContextualParameterTypes(receiver, signature, instantiatedContextualSignature);
        } else {
          Checker_assignNonContextualParameterTypes(receiver, signature);
        }
      } else if (contextualSignature !== undefined && GoSliceIsNil(Node_TypeParameters(node)) && contextualSignature!.parameters.length > (Node_Parameters(node)?.length ?? 0)) {
        const inferenceContext = Checker_getInferenceContext(receiver, node);
        if ((checkMode & CheckModeInferential) !== 0) {
          Checker_inferFromAnnotatedParametersAndReturn(receiver, signature, contextualSignature, inferenceContext);
        }
      }
      if (contextualSignature !== undefined && Checker_getReturnTypeFromAnnotation(receiver, node) === undefined && signature!.resolvedReturnType === undefined) {
        const returnType = Checker_getReturnTypeFromBody(receiver, node, checkMode);
        if (signature!.resolvedReturnType === undefined) {
          signature!.resolvedReturnType = returnType;
        }
      }
      Checker_checkSignatureDeclaration(receiver, node);
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkFunctionExpressionOrObjectLiteralMethodDeferred","kind":"method","status":"implemented","sigHash":"a4f51bff58a78949280cff8669212f63657b27ca9bbfa3976a6ade3a062a7958"}
 *
 * Go source:
 * func (c *Checker) checkFunctionExpressionOrObjectLiteralMethodDeferred(node *ast.Node) {
 * 	functionFlags := ast.GetFunctionFlags(node)
 * 	returnType := c.getReturnTypeFromAnnotation(node)
 * 	c.checkAllCodePathsInNonVoidFunctionReturnOrThrow(node, returnType)
 * 	body := node.Body()
 * 	if body != nil {
 * 		if node.Type() == nil {
 * 			// There are some checks that are only performed in getReturnTypeFromBody, that may produce errors
 * 			// we need. An example is the noImplicitAny errors resulting from widening the return expression
 * 			// of a function. Because checking of function expression bodies is deferred, there was never an
 * 			// appropriate time to do this during the main walk of the file (see the comment at the top of
 * 			// checkFunctionExpressionBodies). So it must be done now.
 * 			c.getReturnTypeOfSignature(c.getSignatureFromDeclaration(node))
 * 		}
 * 		if ast.IsBlock(body) {
 * 			c.checkSourceElement(body)
 * 		} else {
 * 			// From within an async function you can return either a non-promise value or a promise. Any
 * 			// Promise/A+ compatible implementation will always assimilate any foreign promise, so we
 * 			// should not be checking assignability of a promise to the return type. Instead, we need to
 * 			// check assignability of the awaited type of the expression body against the promised type of
 * 			// its return type annotation.
 * 			exprType := c.checkExpression(body)
 * 			if returnType != nil {
 * 				returnOrPromisedType := c.unwrapReturnType(returnType, functionFlags)
 * 				if returnOrPromisedType != nil {
 * 					c.checkReturnExpression(node, returnOrPromisedType, body, body, exprType, false)
 * 				}
 * 			}
 * 		}
 * 	}
 * }
 */
export function Checker_checkFunctionExpressionOrObjectLiteralMethodDeferred(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  const functionFlags = GetFunctionFlags(node);
  const returnType = Checker_getReturnTypeFromAnnotation(receiver, node);
  Checker_checkAllCodePathsInNonVoidFunctionReturnOrThrow(receiver, node, returnType);
  const body = Node_Body(node);
  if (body !== undefined) {
    if (Node_Type(node) === undefined) {
      Checker_getReturnTypeOfSignature(receiver, Checker_getSignatureFromDeclaration(receiver, node));
    }
    if (IsBlock(body)) {
      Checker_checkSourceElement(receiver, body);
    } else {
      const expressionType = Checker_checkExpression(receiver, body);
      if (returnType !== undefined) {
        const returnOrPromisedType = Checker_unwrapReturnType(receiver, returnType, functionFlags);
        if (returnOrPromisedType !== undefined) {
          Checker_checkReturnExpression(receiver, node, returnOrPromisedType, body, body, expressionType, false);
        }
      }
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.assignBindingElementTypes","kind":"method","status":"implemented","sigHash":"729dd837525227c0990f1257c34af8994e059be0737af9c20394de857c245a4d"}
 *
 * Go source:
 * func (c *Checker) assignBindingElementTypes(pattern *ast.Node, parentType *Type) {
 * 	for _, element := range pattern.Elements() {
 * 		name := element.Name()
 * 		if name != nil {
 * 			t := c.getBindingElementTypeFromParentType(element, parentType, false /*noTupleBoundsCheck* /)
 * 			if ast.IsIdentifier(name) {
 * 				c.valueSymbolLinks.Get(c.getSymbolOfDeclaration(element)).resolvedType = t
 * 			} else {
 * 				c.assignBindingElementTypes(name, t)
 * 			}
 * 		}
 * 	}
 * }
 */
export function Checker_assignBindingElementTypes(receiver: GoPtr<Checker>, pattern: GoPtr<Node>, parentType: GoPtr<Type>): void {
  for (const element of Node_Elements(pattern) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    const name = Node_Name(element);
    if (name !== undefined) {
      const t = Checker_getBindingElementTypeFromParentType(receiver, element, parentType, false);
      if (IsIdentifier(name)) {
        LinkStore_Get(receiver!.valueSymbolLinks, Checker_getSymbolOfDeclaration(receiver, element), zeroValueSymbolLinks, goSymbolPointerKey)!.v.resolvedType = t;
      } else {
        Checker_assignBindingElementTypes(receiver, name, t);
      }
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkTypeOfExpression","kind":"method","status":"implemented","sigHash":"6752dfd64419d8a6cf1d77efccc22638826b168db964743fb6e95814d8bc2f98"}
 *
 * Go source:
 * func (c *Checker) checkTypeOfExpression(node *ast.Node) *Type {
 * 	c.checkExpression(node.Expression())
 * 	return c.typeofType
 * }
 */
export function Checker_checkTypeOfExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  Checker_checkExpression(receiver, Node_Expression(node));
  return receiver!.typeofType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkNonNullAssertion","kind":"method","status":"implemented","sigHash":"66e41857edce56bb9c59daab36bc53533aeb37902226033794bf6f5612a63a3e"}
 *
 * Go source:
 * func (c *Checker) checkNonNullAssertion(node *ast.Node) *Type {
 * 	if node.Flags&ast.NodeFlagsOptionalChain != 0 {
 * 		return c.checkNonNullChain(node)
 * 	}
 * 	return c.GetNonNullableType(c.checkExpression(node.Expression()))
 * }
 */
export function Checker_checkNonNullAssertion(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  if ((node!.Flags & NodeFlagsOptionalChain) !== 0) {
    return Checker_checkNonNullChain(receiver, node);
  }
  return Checker_GetNonNullableType(receiver, Checker_checkExpression(receiver, Node_Expression(node)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkNonNullChain","kind":"method","status":"implemented","sigHash":"823ddb08e71e8ca6bdcd4015279e31dc7578a1b78648373b502558a7442838fd"}
 *
 * Go source:
 * func (c *Checker) checkNonNullChain(node *ast.Node) *Type {
 * 	leftType := c.checkExpression(node.Expression())
 * 	nonOptionalType := c.getOptionalExpressionType(leftType, node.Expression())
 * 	return c.propagateOptionalTypeMarker(c.GetNonNullableType(nonOptionalType), node, nonOptionalType != leftType)
 * }
 */
export function Checker_checkNonNullChain(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const leftType = Checker_checkExpression(receiver, Node_Expression(node));
  const nonOptionalType = Checker_getOptionalExpressionType(receiver, leftType, Node_Expression(node));
  return Checker_propagateOptionalTypeMarker(receiver, Checker_GetNonNullableType(receiver, nonOptionalType), node, nonOptionalType !== leftType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkVoidExpression","kind":"method","status":"implemented","sigHash":"5f0ff1768af7101436caa27a6e8803379045daa007805fc3c6748530fdf81c6d"}
 *
 * Go source:
 * func (c *Checker) checkVoidExpression(node *ast.Node) *Type {
 * 	c.checkNodeDeferred(node)
 * 	return c.undefinedWideningType
 * }
 */
export function Checker_checkVoidExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  Checker_checkNodeDeferred(receiver, node);
  return receiver!.undefinedWideningType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getUnaryResultType","kind":"method","status":"implemented","sigHash":"10563e298643618126ed24a202db2f7656c4443dfdac329319cfe0f89349f285"}
 *
 * Go source:
 * func (c *Checker) getUnaryResultType(operandType *Type) *Type {
 * 	if c.maybeTypeOfKind(operandType, TypeFlagsBigIntLike) {
 * 		if c.isTypeAssignableToKind(operandType, TypeFlagsAnyOrUnknown) || c.maybeTypeOfKind(operandType, TypeFlagsNumberLike) {
 * 			return c.numberOrBigIntType
 * 		}
 * 		return c.bigintType
 * 	}
 * 	// If it's not a bigint type, implicit coercion will result in a number
 * 	return c.numberType
 * }
 */
export function Checker_getUnaryResultType(receiver: GoPtr<Checker>, operandType: GoPtr<Type>): GoPtr<Type> {
  if (Checker_maybeTypeOfKind(receiver, operandType, TypeFlagsBigIntLike)) {
    if (Checker_isTypeAssignableToKind(receiver, operandType, TypeFlagsAnyOrUnknown) || Checker_maybeTypeOfKind(receiver, operandType, TypeFlagsNumberLike)) {
      return receiver!.numberOrBigIntType;
    }
    return receiver!.bigintType;
  }
  return receiver!.numberType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkConditionalExpression","kind":"method","status":"implemented","sigHash":"7237e65fe0e2c394196e42cdf65f50e4862909d38af12d1d225638b960f003ac"}
 *
 * Go source:
 * func (c *Checker) checkConditionalExpression(node *ast.Node, checkMode CheckMode) *Type {
 * 	cond := node.AsConditionalExpression()
 * 	t := c.checkTruthinessExpression(cond.Condition, checkMode)
 * 	c.checkTestingKnownTruthyCallableOrAwaitableOrEnumMemberType(cond.Condition, t, cond.WhenTrue)
 * 	type1 := c.checkExpressionEx(cond.WhenTrue, checkMode)
 * 	type2 := c.checkExpressionEx(cond.WhenFalse, checkMode)
 * 	return c.getUnionTypeEx([]*Type{type1, type2}, UnionReductionSubtype, nil, nil)
 * }
 */
export function Checker_checkConditionalExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>, checkMode: CheckMode): GoPtr<Type> {
  const cond = AsConditionalExpression(node);
  const t = Checker_checkTruthinessExpression(receiver, cond!.Condition, checkMode);
  Checker_checkTestingKnownTruthyCallableOrAwaitableOrEnumMemberType(receiver, cond!.Condition, t, cond!.WhenTrue);
  const type1 = Checker_checkExpressionEx(receiver, cond!.WhenTrue, checkMode);
  const type2 = Checker_checkExpressionEx(receiver, cond!.WhenFalse, checkMode);
  return Checker_getUnionTypeEx(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, type1, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, type2, GoPointerValueOps<Type>());
  }), UnionReductionSubtype, undefined, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getYieldedTypeOfYieldExpression","kind":"method","status":"implemented","sigHash":"5eb3f4658ff4261ebf0c246bddc2fb3c73d38f77f62dfe9aceda412934585f46"}
 *
 * Go source:
 * func (c *Checker) getYieldedTypeOfYieldExpression(node *ast.Node, expressionType *Type, sentType *Type, isAsync bool) *Type {
 * 	errorNode := core.OrElse(node.Expression(), node)
 * 	isYieldStar := node.AsYieldExpression().AsteriskToken != nil
 * 	// A `yield*` expression effectively yields everything that its operand yields
 * 	yieldedType := expressionType
 * 	if isYieldStar {
 * 		yieldedType = c.checkIteratedTypeOrElementType(core.IfElse(isAsync, IterationUseAsyncYieldStar, IterationUseYieldStar), expressionType, sentType, errorNode)
 * 	}
 * 	if !isAsync {
 * 		return yieldedType
 * 	}
 * 	return c.getAwaitedTypeEx(yieldedType, errorNode, core.IfElse(isYieldStar,
 * 		diagnostics.Type_of_iterated_elements_of_a_yield_Asterisk_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member,
 * 		diagnostics.Type_of_yield_operand_in_an_async_generator_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member))
 * }
 */
export function Checker_getYieldedTypeOfYieldExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>, expressionType: GoPtr<Type>, sentType: GoPtr<Type>, isAsync: bool): GoPtr<Type> {
  const errorNode = core.OrElse(Node_Expression(node), node, GoZeroPointer<Node>, GoEqualStrict<GoPtr<Node>>);
  const isYieldStar = AsYieldExpression(node)!.AsteriskToken !== undefined;
  let yieldedType = expressionType;
  if (isYieldStar) {
    yieldedType = Checker_checkIteratedTypeOrElementType(receiver, core.IfElse(isAsync, IterationUseAsyncYieldStar, IterationUseYieldStar), expressionType, sentType, errorNode);
  }
  if (!isAsync) {
    return yieldedType;
  }
  return Checker_getAwaitedTypeEx(receiver, yieldedType, errorNode, core.IfElse(isYieldStar,
    diagnosticsMessages.Type_of_iterated_elements_of_a_yield_Asterisk_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member,
    diagnosticsMessages.Type_of_yield_operand_in_an_async_generator_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeOptionalityFromDeclaredType","kind":"method","status":"implemented","sigHash":"6970b8eeb8c7bda389e71acc032296721d19e84dfd72e74e6eeb1ee62d82908b"}
 *
 * Go source:
 * func (c *Checker) removeOptionalityFromDeclaredType(declaredType *Type, declaration *ast.Node) *Type {
 * 	removeUndefined := c.strictNullChecks && ast.IsParameterDeclaration(declaration) && declaration.Initializer() != nil && c.hasTypeFacts(declaredType, TypeFactsIsUndefined) && !c.parameterInitializerContainsUndefined(declaration)
 * 	if removeUndefined {
 * 		return c.getTypeWithFacts(declaredType, TypeFactsNEUndefined)
 * 	}
 * 	return declaredType
 * }
 */
export function Checker_removeOptionalityFromDeclaredType(receiver: GoPtr<Checker>, declaredType: GoPtr<Type>, declaration: GoPtr<Node>): GoPtr<Type> {
  const removeUndefined = receiver!.strictNullChecks && IsParameterDeclaration(declaration) && Node_Initializer(declaration) !== undefined && Checker_hasTypeFacts(receiver, declaredType, TypeFactsIsUndefined) && !Checker_parameterInitializerContainsUndefined(receiver, declaration);
  if (removeUndefined) {
    return Checker_getTypeWithFacts(receiver, declaredType, TypeFactsNEUndefined);
  }
  return declaredType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.parameterInitializerContainsUndefined","kind":"method","status":"implemented","sigHash":"e8350a962fdf578016d27e101222d3c4e874a1bfd555850e07d1e68c66958b1d"}
 *
 * Go source:
 * func (c *Checker) parameterInitializerContainsUndefined(declaration *ast.Node) bool {
 * 	links := c.nodeLinks.Get(declaration)
 * 	if links.flags&NodeCheckFlagsInitializerIsUndefinedComputed == 0 {
 * 		if !c.pushTypeResolution(declaration, TypeSystemPropertyNameInitializerIsUndefined) {
 * 			c.reportCircularityError(declaration.Symbol())
 * 			return true
 * 		}
 * 		containsUndefined := c.hasTypeFacts(c.checkDeclarationInitializer(declaration, CheckModeNormal, nil), TypeFactsIsUndefined)
 * 		if !c.popTypeResolution() {
 * 			c.reportCircularityError(declaration.Symbol())
 * 			return true
 * 		}
 * 		if links.flags&NodeCheckFlagsInitializerIsUndefinedComputed == 0 {
 * 			links.flags |= NodeCheckFlagsInitializerIsUndefinedComputed | core.IfElse(containsUndefined, NodeCheckFlagsInitializerIsUndefined, 0)
 * 		}
 * 	}
 * 	return links.flags&NodeCheckFlagsInitializerIsUndefined != 0
 * }
 */
export function Checker_parameterInitializerContainsUndefined(receiver: GoPtr<Checker>, declaration: GoPtr<Node>): bool {
  const links = LinkStore_Get(receiver!.nodeLinks, declaration, zeroNodeLinks, goNodePointerKey)!.v;
  if ((links!.flags & NodeCheckFlagsInitializerIsUndefinedComputed) === 0) {
    if (!Checker_pushTypeResolution(receiver, declaration, TypeSystemPropertyNameInitializerIsUndefined)) {
      Checker_reportCircularityError(receiver, Node_Symbol(declaration));
      return true;
    }
    const containsUndefined = Checker_hasTypeFacts(receiver, Checker_checkDeclarationInitializer(receiver, declaration, CheckModeNormal, undefined), TypeFactsIsUndefined);
    if (!Checker_popTypeResolution(receiver)) {
      Checker_reportCircularityError(receiver, Node_Symbol(declaration));
      return true;
    }
    if ((links!.flags & NodeCheckFlagsInitializerIsUndefinedComputed) === 0) {
      links!.flags |= NodeCheckFlagsInitializerIsUndefinedComputed | core.IfElse(containsUndefined, NodeCheckFlagsInitializerIsUndefined, 0);
    }
  }
  return (links!.flags & NodeCheckFlagsInitializerIsUndefined) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isInAmbientOrTypeNode","kind":"method","status":"implemented","sigHash":"838abd867e0459457922423be8d6e83d8e4073a914003e3e4ec503f18b22725e"}
 *
 * Go source:
 * func (c *Checker) isInAmbientOrTypeNode(node *ast.Node) bool {
 * 	return node.Flags&ast.NodeFlagsAmbient != 0 || ast.FindAncestor(node, func(n *ast.Node) bool {
 * 		return ast.IsInterfaceDeclaration(n) || ast.IsTypeAliasDeclaration(n) || ast.IsJSTypeAliasDeclaration(n) || ast.IsTypeLiteralNode(n)
 * 	}) != nil
 * }
 */
export function Checker_isInAmbientOrTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  return (node!.Flags & NodeFlagsAmbient) !== 0 || FindAncestor(node, (n) => IsInterfaceDeclaration(n) || IsTypeAliasDeclaration(n) || IsJSTypeAliasDeclaration(n) || IsTypeLiteralNode(n)) !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBaseTypesIfUnrelated","kind":"method","status":"implemented","sigHash":"4c07d2af774a2ba3050c4a91d4234660320f25fd163888ecc910cfe3878712be"}
 *
 * Go source:
 * func (c *Checker) getBaseTypesIfUnrelated(leftType *Type, rightType *Type, isRelated func(left *Type, right *Type) bool) (*Type, *Type) {
 * 	effectiveLeft := leftType
 * 	effectiveRight := rightType
 * 	leftBase := c.getBaseTypeOfLiteralType(leftType)
 * 	rightBase := c.getBaseTypeOfLiteralType(rightType)
 * 	if !isRelated(leftBase, rightBase) {
 * 		effectiveLeft = leftBase
 * 		effectiveRight = rightBase
 * 	}
 * 	return effectiveLeft, effectiveRight
 * }
 */
export function Checker_getBaseTypesIfUnrelated(receiver: GoPtr<Checker>, leftType: GoPtr<Type>, rightType: GoPtr<Type>, isRelated: GoFunc<(left: GoPtr<Type>, right: GoPtr<Type>) => bool>): [GoPtr<Type>, GoPtr<Type>] {
  let effectiveLeft = leftType;
  let effectiveRight = rightType;
  const leftBase = Checker_getBaseTypeOfLiteralType(receiver, leftType);
  const rightBase = Checker_getBaseTypeOfLiteralType(receiver, rightType);
  if (!isRelated!(leftBase, rightBase)) {
    effectiveLeft = leftBase;
    effectiveRight = rightBase;
  }
  return [effectiveLeft, effectiveRight];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.bothAreBigIntLike","kind":"method","status":"implemented","sigHash":"4e56da55b0f148a65b6a6cfc876bbc431d11baa79d019bd858443d894944c92f"}
 *
 * Go source:
 * func (c *Checker) bothAreBigIntLike(left *Type, right *Type) bool {
 * 	return c.isTypeAssignableToKind(left, TypeFlagsBigIntLike) && c.isTypeAssignableToKind(right, TypeFlagsBigIntLike)
 * }
 */
export function Checker_bothAreBigIntLike(receiver: GoPtr<Checker>, left: GoPtr<Type>, right: GoPtr<Type>): bool {
  return Checker_isTypeAssignableToKind(receiver, left, TypeFlagsBigIntLike) && Checker_isTypeAssignableToKind(receiver, right, TypeFlagsBigIntLike);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkArithmeticOperandType","kind":"method","status":"implemented","sigHash":"909887df0c64176b75e9ecef7d6786dffb6c71e5d7e60862c61c2dc77b77e74e"}
 *
 * Go source:
 * func (c *Checker) checkArithmeticOperandType(operand *ast.Node, t *Type, diagnostic *diagnostics.Message, isAwaitValid bool) bool {
 * 	if !c.isTypeAssignableTo(t, c.numberOrBigIntType) {
 * 		var awaitedType *Type
 * 		if isAwaitValid {
 * 			awaitedType = c.getAwaitedTypeOfPromise(t)
 * 		}
 * 		c.errorAndMaybeSuggestAwait(operand, awaitedType != nil && c.isTypeAssignableTo(awaitedType, c.numberOrBigIntType), diagnostic)
 * 		return false
 * 	}
 * 	return true
 * }
 */
export function Checker_checkArithmeticOperandType(receiver: GoPtr<Checker>, operand: GoPtr<Node>, t: GoPtr<Type>, diagnostic: GoPtr<Message>, isAwaitValid: bool): bool {
  if (!Checker_isTypeAssignableTo(receiver, t, receiver!.numberOrBigIntType)) {
    let awaitedType: GoPtr<Type>;
    if (isAwaitValid) {
      awaitedType = Checker_getAwaitedTypeOfPromise(receiver, t);
    }
    Checker_errorAndMaybeSuggestAwait(receiver, operand, awaitedType !== undefined && Checker_isTypeAssignableTo(receiver, awaitedType, receiver!.numberOrBigIntType), diagnostic);
    return false as bool;
  }
  return true as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkNullishCoalesceOperands","kind":"method","status":"implemented","sigHash":"dada74171036a1cb0a398691ae976255190d2c50469a2de7e19f615c1ed390ff"}
 *
 * Go source:
 * func (c *Checker) checkNullishCoalesceOperands(left *ast.Node, right *ast.Node) {
 * 	if ast.IsBinaryExpression(left.Parent.Parent) {
 * 		grandparentLeft := left.Parent.Parent.AsBinaryExpression().Left
 * 		grandparentOperatorToken := left.Parent.Parent.AsBinaryExpression().OperatorToken
 * 		if ast.IsBinaryExpression(grandparentLeft) && grandparentOperatorToken.Kind == ast.KindBarBarToken {
 * 			c.grammarErrorOnNode(grandparentLeft, diagnostics.X_0_and_1_operations_cannot_be_mixed_without_parentheses, scanner.TokenToString(ast.KindQuestionQuestionToken), scanner.TokenToString(grandparentOperatorToken.Kind))
 * 		}
 * 	} else if ast.IsBinaryExpression(left) {
 * 		operatorToken := left.AsBinaryExpression().OperatorToken
 * 		if operatorToken.Kind == ast.KindBarBarToken || operatorToken.Kind == ast.KindAmpersandAmpersandToken {
 * 			c.grammarErrorOnNode(left, diagnostics.X_0_and_1_operations_cannot_be_mixed_without_parentheses, scanner.TokenToString(operatorToken.Kind), scanner.TokenToString(ast.KindQuestionQuestionToken))
 * 		}
 * 	} else if ast.IsBinaryExpression(right) {
 * 		operatorToken := right.AsBinaryExpression().OperatorToken
 * 		if operatorToken.Kind == ast.KindAmpersandAmpersandToken {
 * 			c.grammarErrorOnNode(right, diagnostics.X_0_and_1_operations_cannot_be_mixed_without_parentheses, scanner.TokenToString(ast.KindQuestionQuestionToken), scanner.TokenToString(operatorToken.Kind))
 * 		}
 * 	}
 * 	c.checkNullishCoalesceOperandLeft(left)
 * }
 */
export function Checker_checkNullishCoalesceOperands(receiver: GoPtr<Checker>, left: GoPtr<Node>, right: GoPtr<Node>): void {
  if (IsBinaryExpression(left!.Parent!.Parent)) {
    const grandparentLeft = AsBinaryExpression(left!.Parent!.Parent)!.Left;
    const grandparentOperatorToken = AsBinaryExpression(left!.Parent!.Parent)!.OperatorToken;
    if (IsBinaryExpression(grandparentLeft) && grandparentOperatorToken!.Kind === KindBarBarToken) {
      Checker_grammarErrorOnNode(receiver, grandparentLeft, diagnosticsMessages.X_0_and_1_operations_cannot_be_mixed_without_parentheses, TokenToString(KindQuestionQuestionToken), TokenToString(grandparentOperatorToken!.Kind));
    }
  } else if (IsBinaryExpression(left)) {
    const operatorToken = AsBinaryExpression(left)!.OperatorToken;
    if (operatorToken!.Kind === KindBarBarToken || operatorToken!.Kind === KindAmpersandAmpersandToken) {
      Checker_grammarErrorOnNode(receiver, left, diagnosticsMessages.X_0_and_1_operations_cannot_be_mixed_without_parentheses, TokenToString(operatorToken!.Kind), TokenToString(KindQuestionQuestionToken));
    }
  } else if (IsBinaryExpression(right)) {
    const operatorToken = AsBinaryExpression(right)!.OperatorToken;
    if (operatorToken!.Kind === KindAmpersandAmpersandToken) {
      Checker_grammarErrorOnNode(receiver, right, diagnosticsMessages.X_0_and_1_operations_cannot_be_mixed_without_parentheses, TokenToString(KindQuestionQuestionToken), TokenToString(operatorToken!.Kind));
    }
  }
  Checker_checkNullishCoalesceOperandLeft(receiver, left);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkNullishCoalesceOperandLeft","kind":"method","status":"implemented","sigHash":"81b3f7850c35ba65183b8ad844899bf27153144dd160ee56793243ae6ed958be"}
 *
 * Go source:
 * func (c *Checker) checkNullishCoalesceOperandLeft(left *ast.Node) {
 * 	leftTarget := ast.SkipOuterExpressions(left, ast.OEKAll)
 * 	nullishSemantics := c.getSyntacticNullishnessSemantics(leftTarget)
 * 	if nullishSemantics != PredicateSemanticsSometimes {
 * 		if nullishSemantics == PredicateSemanticsAlways {
 * 			c.error(leftTarget, diagnostics.This_expression_is_always_nullish)
 * 		} else {
 * 			c.error(leftTarget, diagnostics.Right_operand_of_is_unreachable_because_the_left_operand_is_never_nullish)
 * 		}
 * 	}
 * }
 */
export function Checker_checkNullishCoalesceOperandLeft(receiver: GoPtr<Checker>, left: GoPtr<Node>): void {
  const leftTarget = SkipOuterExpressions(left, OEKAll);
  const nullishSemantics = Checker_getSyntacticNullishnessSemantics(receiver, leftTarget);
  if (nullishSemantics !== PredicateSemanticsSometimes) {
    if (nullishSemantics === PredicateSemanticsAlways) {
      Checker_error(receiver, leftTarget, diagnosticsMessages.This_expression_is_always_nullish);
    } else {
      Checker_error(receiver, leftTarget, diagnosticsMessages.Right_operand_of_is_unreachable_because_the_left_operand_is_never_nullish);
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getSyntacticNullishnessSemantics","kind":"method","status":"implemented","sigHash":"e0cf58eabf6eb341cd27e08c3a008692614423d40e375819f9761ab4f74b31a0"}
 *
 * Go source:
 * func (c *Checker) getSyntacticNullishnessSemantics(node *ast.Node) PredicateSemantics {
 * 	node = ast.SkipOuterExpressions(node, ast.OEKAll)
 * 	switch node.Kind {
 * 	case ast.KindAwaitExpression,
 * 		ast.KindCallExpression,
 * 		ast.KindTaggedTemplateExpression,
 * 		ast.KindElementAccessExpression,
 * 		ast.KindMetaProperty,
 * 		ast.KindNewExpression,
 * 		ast.KindPropertyAccessExpression,
 * 		ast.KindYieldExpression,
 * 		ast.KindThisKeyword:
 * 		return PredicateSemanticsSometimes
 * 	case ast.KindBinaryExpression:
 * 		// List of operators that can produce null/undefined:
 * 		// || ||= && &&=
 * 		switch node.AsBinaryExpression().OperatorToken.Kind {
 * 		case ast.KindBarBarToken,
 * 			ast.KindBarBarEqualsToken,
 * 			ast.KindAmpersandAmpersandToken,
 * 			ast.KindAmpersandAmpersandEqualsToken:
 * 			return PredicateSemanticsSometimes
 * 		// For these operator kinds, the right operand is effectively controlling
 * 		case ast.KindCommaToken,
 * 			ast.KindEqualsToken,
 * 			ast.KindQuestionQuestionToken,
 * 			ast.KindQuestionQuestionEqualsToken:
 * 			return c.getSyntacticNullishnessSemantics(node.AsBinaryExpression().Right)
 * 		}
 * 		return PredicateSemanticsNever
 * 	case ast.KindConditionalExpression:
 * 		return c.getSyntacticNullishnessSemantics(node.AsConditionalExpression().WhenTrue) | c.getSyntacticNullishnessSemantics(node.AsConditionalExpression().WhenFalse)
 * 	case ast.KindNullKeyword:
 * 		return PredicateSemanticsAlways
 * 	case ast.KindIdentifier:
 * 		if c.getResolvedSymbol(node) == c.undefinedSymbol {
 * 			return PredicateSemanticsAlways
 * 		}
 * 		return PredicateSemanticsSometimes
 * 	}
 * 	return PredicateSemanticsNever
 * }
 */
export function Checker_getSyntacticNullishnessSemantics(receiver: GoPtr<Checker>, node: GoPtr<Node>): PredicateSemantics {
  node = SkipOuterExpressions(node, OEKAll);
  switch (node!.Kind) {
    case KindAwaitExpression:
    case KindCallExpression:
    case KindTaggedTemplateExpression:
    case KindElementAccessExpression:
    case KindMetaProperty:
    case KindNewExpression:
    case KindPropertyAccessExpression:
    case KindYieldExpression:
    case KindThisKeyword:
      return PredicateSemanticsSometimes;
    case KindBinaryExpression:
      switch (AsBinaryExpression(node)!.OperatorToken!.Kind) {
        case KindBarBarToken:
        case KindBarBarEqualsToken:
        case KindAmpersandAmpersandToken:
        case KindAmpersandAmpersandEqualsToken:
          return PredicateSemanticsSometimes;
        case KindCommaToken:
        case KindEqualsToken:
        case KindQuestionQuestionToken:
        case KindQuestionQuestionEqualsToken:
          return Checker_getSyntacticNullishnessSemantics(receiver, AsBinaryExpression(node)!.Right);
      }
      return PredicateSemanticsNever;
    case KindConditionalExpression:
      return Checker_getSyntacticNullishnessSemantics(receiver, AsConditionalExpression(node)!.WhenTrue) |
        Checker_getSyntacticNullishnessSemantics(receiver, AsConditionalExpression(node)!.WhenFalse);
    case KindNullKeyword:
      return PredicateSemanticsAlways;
    case KindIdentifier:
      if (Checker_getResolvedSymbol(receiver, node) === receiver!.undefinedSymbol) {
        return PredicateSemanticsAlways;
      }
      return PredicateSemanticsSometimes;
  }
  return PredicateSemanticsNever;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.hasEmptyObjectIntersection","kind":"method","status":"implemented","sigHash":"a7879f552f93281fb368f37fd345a3061d9554a37383f3ffdee27094526da2f5"}
 *
 * Go source:
 * func (c *Checker) hasEmptyObjectIntersection(t *Type) bool {
 * 	return someType(t, func(t *Type) bool {
 * 		return t == c.unknownEmptyObjectType || t.flags&TypeFlagsIntersection != 0 && c.IsEmptyAnonymousObjectType(c.getBaseConstraintOrType(t))
 * 	})
 * }
 */
export function Checker_hasEmptyObjectIntersection(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return someType(t, (tt) =>
    tt === receiver!.unknownEmptyObjectType ||
    ((tt!.flags & TypeFlagsIntersection) !== 0 && Checker_IsEmptyAnonymousObjectType(receiver, Checker_getBaseConstraintOrType(receiver, tt)))) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkObjectLiteral","kind":"method","status":"implemented","sigHash":"76f563d67df11b553d680ffb6444ff025f6b4ee91def1549b368ae23496e6879"}
 *
 * Go source:
 * func (c *Checker) checkObjectLiteral(node *ast.Node, checkMode CheckMode) *Type {
 * 	// Expando object literals have empty properties but filled exports
 * 	if len(node.Properties()) == 0 && node.Symbol() != nil && len(node.Symbol().Exports) != 0 {
 * 		result := c.newAnonymousType(node.Symbol(), node.Symbol().Exports, nil, nil, nil)
 * 		if ast.IsInJSFile(node) && !ast.IsInJsonFile(node) {
 * 			result.objectFlags |= ObjectFlagsJSLiteral
 * 		}
 * 		return result
 * 	}
 * 	inDestructuringPattern := ast.IsAssignmentTarget(node)
 * 	// Grammar checking
 * 	c.checkGrammarObjectLiteralExpression(node.AsObjectLiteralExpression(), inDestructuringPattern)
 * 	var allPropertiesTable ast.SymbolTable
 * 	if c.strictNullChecks {
 * 		allPropertiesTable = make(ast.SymbolTable)
 * 	}
 * 	propertiesTable := make(ast.SymbolTable)
 * 	var propertiesArray []*ast.Symbol
 * 	spread := c.emptyObjectType
 * 	c.pushCachedContextualType(node)
 * 	contextualType := c.getApparentTypeOfContextualType(node, ContextFlagsNone)
 * 	var contextualTypeHasPattern bool
 * 	if contextualType != nil {
 * 		if pattern := c.patternForType[contextualType]; pattern != nil && (ast.IsObjectBindingPattern(pattern) || ast.IsObjectLiteralExpression(pattern)) {
 * 			contextualTypeHasPattern = true
 * 		}
 * 	}
 * 	inConstContext := c.isConstContext(node)
 * 	var checkFlags ast.CheckFlags
 * 	if inConstContext {
 * 		checkFlags = ast.CheckFlagsReadonly
 * 	}
 * 	objectFlags := ObjectFlagsFreshLiteral
 * 	patternWithComputedProperties := false
 * 	hasComputedStringProperty := false
 * 	hasComputedNumberProperty := false
 * 	hasComputedSymbolProperty := false
 * 	// Spreads may cause an early bail; ensure computed names are always checked (this is cached)
 * 	// As otherwise they may not be checked until exports for the type at this position are retrieved,
 * 	// which may never occur.
 * 	for _, elem := range node.Properties() {
 * 		if elem.Name() != nil && ast.IsComputedPropertyName(elem.Name()) {
 * 			c.checkComputedPropertyName(elem.Name())
 * 		}
 * 	}
 * 	offset := 0
 * 	createObjectLiteralType := func() *Type {
 * 		var indexInfos []*IndexInfo
 * 		isReadonly := c.isConstContext(node)
 * 		if hasComputedStringProperty {
 * 			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(isReadonly, propertiesArray[offset:], c.stringType))
 * 		}
 * 		if hasComputedNumberProperty {
 * 			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(isReadonly, propertiesArray[offset:], c.numberType))
 * 		}
 * 		if hasComputedSymbolProperty {
 * 			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(isReadonly, propertiesArray[offset:], c.esSymbolType))
 * 		}
 * 		result := c.newAnonymousType(node.Symbol(), propertiesTable, nil, nil, indexInfos)
 * 		result.objectFlags |= objectFlags | ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral
 * 		if contextualType == nil && ast.IsInJSFile(node) && !ast.IsInJsonFile(node) {
 * 			result.objectFlags |= ObjectFlagsJSLiteral
 * 		}
 * 		if patternWithComputedProperties {
 * 			result.objectFlags |= ObjectFlagsObjectLiteralPatternWithComputedProperties
 * 		}
 * 		if inDestructuringPattern {
 * 			c.patternForType[result] = node
 * 		}
 * 		return result
 * 	}
 * 	for _, memberDecl := range node.Properties() {
 * 		member := c.getSymbolOfDeclaration(memberDecl)
 * 		var computedNameType *Type
 * 		if memberDecl.Name() != nil && memberDecl.Name().Kind == ast.KindComputedPropertyName {
 * 			computedNameType = c.checkComputedPropertyName(memberDecl.Name())
 * 		}
 * 		if ast.IsPropertyAssignment(memberDecl) || ast.IsShorthandPropertyAssignment(memberDecl) || ast.IsObjectLiteralMethod(memberDecl) {
 * 			var t *Type
 * 			switch memberDecl.Kind {
 * 			case ast.KindPropertyAssignment:
 * 				t = c.checkPropertyAssignment(memberDecl, checkMode)
 * 			case ast.KindShorthandPropertyAssignment:
 * 				t = c.checkShorthandPropertyAssignment(memberDecl, inDestructuringPattern, checkMode)
 * 			default:
 * 				t = c.checkObjectLiteralMethod(memberDecl, checkMode)
 * 			}
 * 			objectFlags |= t.objectFlags & ObjectFlagsPropagatingFlags
 * 			var nameType *Type
 * 			if computedNameType != nil && isTypeUsableAsPropertyName(computedNameType) {
 * 				nameType = computedNameType
 * 			}
 * 			var prop *ast.Symbol
 * 			if nameType != nil {
 * 				prop = c.newSymbolEx(ast.SymbolFlagsProperty|member.Flags, getPropertyNameFromType(nameType), checkFlags|ast.CheckFlagsLate)
 * 			} else {
 * 				prop = c.newSymbolEx(ast.SymbolFlagsProperty|member.Flags, member.Name, checkFlags)
 * 			}
 * 			links := c.valueSymbolLinks.Get(prop)
 * 			if nameType != nil {
 * 				links.nameType = nameType
 * 			}
 * 			if inDestructuringPattern && c.hasDefaultValue(memberDecl) {
 * 				// If object literal is an assignment pattern and if the assignment pattern specifies a default value
 * 				// for the property, make the property optional.
 * 				prop.Flags |= ast.SymbolFlagsOptional
 * 			} else if contextualTypeHasPattern && contextualType.objectFlags&ObjectFlagsObjectLiteralPatternWithComputedProperties == 0 {
 * 				// If object literal is contextually typed by the implied type of a binding pattern, and if the
 * 				// binding pattern specifies a default value for the property, make the property optional.
 * 				impliedProp := c.getPropertyOfType(contextualType, member.Name)
 * 				if impliedProp != nil {
 * 					prop.Flags |= impliedProp.Flags & ast.SymbolFlagsOptional
 * 				} else if c.getIndexInfoOfType(contextualType, c.stringType) == nil {
 * 					c.error(memberDecl.Name(), diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, c.symbolToString(member), c.TypeToString(contextualType))
 * 				}
 * 			}
 * 			prop.Declarations = member.Declarations
 * 			prop.Parent = member.Parent
 * 			prop.ValueDeclaration = member.ValueDeclaration
 * 			links.resolvedType = t
 * 			links.target = member
 * 			member = prop
 * 			if allPropertiesTable != nil {
 * 				allPropertiesTable[prop.Name] = prop
 * 			}
 * 			if contextualType != nil && checkMode&CheckModeInferential != 0 && checkMode&CheckModeSkipContextSensitive == 0 && (ast.IsPropertyAssignment(memberDecl) || ast.IsMethodDeclaration(memberDecl)) && c.isContextSensitive(memberDecl) {
 * 				inferenceContext := c.getInferenceContext(node)
 * 				// In CheckMode.Inferential we should always have an inference context
 * 				inferenceNode := memberDecl
 * 				if ast.IsPropertyAssignment(memberDecl) {
 * 					inferenceNode = memberDecl.Initializer()
 * 				}
 * 				c.addIntraExpressionInferenceSite(inferenceContext, inferenceNode, t)
 * 			}
 * 		} else if memberDecl.Kind == ast.KindSpreadAssignment {
 * 			if len(propertiesArray) > 0 {
 * 				spread = c.getSpreadType(spread, createObjectLiteralType(), node.Symbol(), objectFlags, inConstContext)
 * 				propertiesArray = nil
 * 				propertiesTable = make(ast.SymbolTable)
 * 				hasComputedStringProperty = false
 * 				hasComputedNumberProperty = false
 * 				hasComputedSymbolProperty = false
 * 			}
 * 			t := c.getReducedType(c.checkExpressionEx(memberDecl.Expression(), checkMode&CheckModeInferential))
 * 			if c.isValidSpreadType(t) {
 * 				mergedType := c.tryMergeUnionOfObjectTypeAndEmptyObject(t, inConstContext)
 * 				if allPropertiesTable != nil {
 * 					c.checkSpreadPropOverrides(mergedType, allPropertiesTable, memberDecl)
 * 				}
 * 				offset = len(propertiesArray)
 * 				if c.isErrorType(spread) {
 * 					continue
 * 				}
 * 				spread = c.getSpreadType(spread, mergedType, node.Symbol(), objectFlags, inConstContext)
 * 			} else {
 * 				c.error(memberDecl, diagnostics.Spread_types_may_only_be_created_from_object_types)
 * 				spread = c.errorType
 * 			}
 * 			continue
 * 		} else {
 * 			// TypeScript 1.0 spec (April 2014)
 * 			// A get accessor declaration is processed in the same manner as
 * 			// an ordinary function declaration(section 6.1) with no parameters.
 * 			// A set accessor declaration is processed in the same manner
 * 			// as an ordinary function declaration with a single parameter and a Void return type.
 * 			debug.Assert(memberDecl.Kind == ast.KindGetAccessor || memberDecl.Kind == ast.KindSetAccessor)
 * 			c.checkNodeDeferred(memberDecl)
 * 		}
 * 		if computedNameType != nil && computedNameType.flags&TypeFlagsStringOrNumberLiteralOrUnique == 0 {
 * 			if c.isTypeAssignableTo(computedNameType, c.stringNumberSymbolType) {
 * 				if c.isTypeAssignableTo(computedNameType, c.numberType) {
 * 					hasComputedNumberProperty = true
 * 				} else if c.isTypeAssignableTo(computedNameType, c.esSymbolType) {
 * 					hasComputedSymbolProperty = true
 * 				} else {
 * 					hasComputedStringProperty = true
 * 				}
 * 				if inDestructuringPattern {
 * 					patternWithComputedProperties = true
 * 				}
 * 			}
 * 		} else {
 * 			propertiesTable[member.Name] = member
 * 		}
 * 		propertiesArray = append(propertiesArray, member)
 * 	}
 * 	c.popContextualType()
 * 	if c.isErrorType(spread) {
 * 		return c.errorType
 * 	}
 * 	if spread != c.emptyObjectType {
 * 		if len(propertiesArray) > 0 {
 * 			spread = c.getSpreadType(spread, createObjectLiteralType(), node.Symbol(), objectFlags, inConstContext)
 * 			propertiesArray = nil
 * 			propertiesTable = make(ast.SymbolTable)
 * 			hasComputedStringProperty = false
 * 			hasComputedNumberProperty = false
 * 		}
 * 		// remap the raw emptyObjectType fed in at the top into a fresh empty object literal type, unique to this use site
 * 		return c.mapType(spread, func(t *Type) *Type {
 * 			if t == c.emptyObjectType {
 * 				return createObjectLiteralType()
 * 			}
 * 			return t
 * 		})
 * 	}
 * 	return createObjectLiteralType()
 * }
 */
export function Checker_checkObjectLiteral(receiver: GoPtr<Checker>, node: GoPtr<Node>, checkMode: CheckMode): GoPtr<Type> {
  const nodeSymbol = Node_Symbol(node);
  if ((Node_Properties(node)?.length ?? 0) === 0 && nodeSymbol !== undefined && nodeSymbol!.Exports.size !== 0) {
    const result = Checker_newAnonymousType(receiver, nodeSymbol, nodeSymbol!.Exports as SymbolTable, GoNilSlice<GoPtr<Signature>>(), GoNilSlice<GoPtr<Signature>>(), GoNilSlice<GoPtr<IndexInfo>>());
    if (IsInJSFile(node) && !IsInJsonFile(node)) {
      result!.objectFlags |= ObjectFlagsJSLiteral;
    }
    return result;
  }
  const inDestructuringPattern = IsAssignmentTarget(node);
  Checker_checkGrammarObjectLiteralExpression(receiver, AsObjectLiteralExpression(node), inDestructuringPattern);
  let allPropertiesTable = GoNilMap<string, GoPtr<Symbol>>();
  if (receiver!.strictNullChecks) {
    allPropertiesTable = new globalThis.Map<string, GoPtr<Symbol>>();
  }
  let propertiesTable: SymbolTable = new globalThis.Map<string, GoPtr<Symbol>>();
  let propertiesArray: GoSlice<GoPtr<Symbol>> = GoNilSlice();
  let spread = receiver!.emptyObjectType;
  Checker_pushCachedContextualType(receiver, node);
  const contextualType = Checker_getApparentTypeOfContextualType(receiver, node, ContextFlagsNone);
  let contextualTypeHasPattern = false as bool;
  if (contextualType !== undefined) {
    const pattern = receiver!.patternForType.get(contextualType);
    if (pattern !== undefined && (IsObjectBindingPattern(pattern) || IsObjectLiteralExpression(pattern))) {
      contextualTypeHasPattern = true;
    }
  }
  const inConstContext = Checker_isConstContext(receiver, node);
  const checkFlags = inConstContext ? CheckFlagsReadonly : 0;
  let objectFlags: ObjectFlags = ObjectFlagsFreshLiteral;
  let patternWithComputedProperties = false as bool;
  let hasComputedStringProperty = false as bool;
  let hasComputedNumberProperty = false as bool;
  let hasComputedSymbolProperty = false as bool;
  for (const elem of Node_Properties(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    const name = Node_Name(elem);
    if (name !== undefined && IsComputedPropertyName(name)) {
      Checker_checkComputedPropertyName(receiver, name);
    }
  }
  let offset = 0;
  const createObjectLiteralType = (): GoPtr<Type> => {
    let indexInfos: GoSlice<GoPtr<IndexInfo>> = GoNilSlice();
    const isReadonly = Checker_isConstContext(receiver, node);
    if (hasComputedStringProperty) {
      indexInfos = GoSliceAppend(indexInfos, Checker_getObjectLiteralIndexInfo(receiver, isReadonly, propertiesArray.slice(offset), receiver!.stringType), GoPointerValueOps<IndexInfo>());
    }
    if (hasComputedNumberProperty) {
      indexInfos = GoSliceAppend(indexInfos, Checker_getObjectLiteralIndexInfo(receiver, isReadonly, propertiesArray.slice(offset), receiver!.numberType), GoPointerValueOps<IndexInfo>());
    }
    if (hasComputedSymbolProperty) {
      indexInfos = GoSliceAppend(indexInfos, Checker_getObjectLiteralIndexInfo(receiver, isReadonly, propertiesArray.slice(offset), receiver!.esSymbolType), GoPointerValueOps<IndexInfo>());
    }
    const result = Checker_newAnonymousType(receiver, Node_Symbol(node), propertiesTable, GoNilSlice<GoPtr<Signature>>(), GoNilSlice<GoPtr<Signature>>(), indexInfos);
    result!.objectFlags |= (objectFlags | ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral) as ObjectFlags;
    if (contextualType === undefined && IsInJSFile(node) && !IsInJsonFile(node)) {
      result!.objectFlags |= ObjectFlagsJSLiteral;
    }
    if (patternWithComputedProperties) {
      result!.objectFlags |= ObjectFlagsObjectLiteralPatternWithComputedProperties;
    }
    if (inDestructuringPattern) {
      receiver!.patternForType.set(result, node);
    }
    return result;
  };
  for (const memberDecl of Node_Properties(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    let member = Checker_getSymbolOfDeclaration(receiver, memberDecl);
    let computedNameType: GoPtr<Type>;
    const memberName = Node_Name(memberDecl);
    if (memberName !== undefined && memberName.Kind === KindComputedPropertyName) {
      computedNameType = Checker_checkComputedPropertyName(receiver, memberName);
    }
    if (IsPropertyAssignment(memberDecl) || IsShorthandPropertyAssignment(memberDecl) || IsObjectLiteralMethod(memberDecl)) {
      let t: GoPtr<Type>;
      switch (memberDecl!.Kind) {
        case KindPropertyAssignment:
          t = Checker_checkPropertyAssignment(receiver, memberDecl, checkMode);
          break;
        case KindShorthandPropertyAssignment:
          t = Checker_checkShorthandPropertyAssignment(receiver, memberDecl, inDestructuringPattern, checkMode);
          break;
        default:
          t = Checker_checkObjectLiteralMethod(receiver, memberDecl, checkMode);
          break;
      }
      objectFlags |= (t!.objectFlags & ObjectFlagsPropagatingFlags) as ObjectFlags;
      let nameType: GoPtr<Type>;
      if (computedNameType !== undefined && isTypeUsableAsPropertyName(computedNameType)) {
        nameType = computedNameType;
      }
      let prop: GoPtr<Symbol>;
      if (nameType !== undefined) {
        prop = Checker_newSymbolEx(receiver, (SymbolFlagsProperty | member!.Flags) as SymbolFlags, getPropertyNameFromType(nameType), (checkFlags | CheckFlagsLate) as int);
      } else {
        prop = Checker_newSymbolEx(receiver, (SymbolFlagsProperty | member!.Flags) as SymbolFlags, member!.Name, checkFlags as int);
      }
      const links = LinkStore_Get(receiver!.valueSymbolLinks, prop, zeroValueSymbolLinks, goSymbolPointerKey);
      if (nameType !== undefined) {
        links!.v.nameType = nameType;
      }
      if (inDestructuringPattern && Checker_hasDefaultValue(receiver, memberDecl)) {
        prop!.Flags |= SymbolFlagsOptional;
      } else if (contextualTypeHasPattern && (contextualType!.objectFlags & ObjectFlagsObjectLiteralPatternWithComputedProperties) === 0) {
        const impliedProp = Checker_getPropertyOfType(receiver, contextualType, member!.Name);
        if (impliedProp !== undefined) {
          prop!.Flags |= impliedProp!.Flags & SymbolFlagsOptional;
        } else if (Checker_getIndexInfoOfType(receiver, contextualType, receiver!.stringType) === undefined) {
          Checker_error(receiver, Node_Name(memberDecl), diagnosticsMessages.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, Checker_symbolToString(receiver, member), Checker_TypeToString(receiver, contextualType));
        }
      }
      prop!.Declarations = member!.Declarations;
      prop!.Parent = member!.Parent;
      prop!.ValueDeclaration = member!.ValueDeclaration;
      links!.v.resolvedType = t;
      links!.v.target = member;
      member = prop;
      if (!GoMapIsNil(allPropertiesTable)) {
        allPropertiesTable.set(prop!.Name, prop);
      }
      if (contextualType !== undefined && (checkMode & CheckModeInferential) !== 0 && (checkMode & CheckModeSkipContextSensitive) === 0 && (IsPropertyAssignment(memberDecl) || IsMethodDeclaration(memberDecl)) && Checker_isContextSensitive(receiver, memberDecl)) {
        const inferenceContext = Checker_getInferenceContext(receiver, node);
        let inferenceNode = memberDecl;
        if (IsPropertyAssignment(memberDecl)) {
          inferenceNode = Node_Initializer(memberDecl);
        }
        Checker_addIntraExpressionInferenceSite(receiver, inferenceContext, inferenceNode, t);
      }
    } else if (memberDecl!.Kind === KindSpreadAssignment) {
      if (propertiesArray.length > 0) {
        spread = Checker_getSpreadType(receiver, spread, createObjectLiteralType(), Node_Symbol(node), objectFlags, inConstContext);
        propertiesArray = GoNilSlice();
        propertiesTable = new globalThis.Map<string, GoPtr<Symbol>>();
        hasComputedStringProperty = false;
        hasComputedNumberProperty = false;
        hasComputedSymbolProperty = false;
      }
      const t = Checker_getReducedType(receiver, Checker_checkExpressionEx(receiver, Node_Expression(memberDecl), (checkMode & CheckModeInferential) as CheckMode));
      if (Checker_isValidSpreadType(receiver, t)) {
        const mergedType = Checker_tryMergeUnionOfObjectTypeAndEmptyObject(receiver, t, inConstContext);
        if (!GoMapIsNil(allPropertiesTable)) {
          Checker_checkSpreadPropOverrides(receiver, mergedType, allPropertiesTable, memberDecl);
        }
        offset = propertiesArray.length;
        if (Checker_isErrorType(receiver, spread)) {
          continue;
        }
        spread = Checker_getSpreadType(receiver, spread, mergedType, Node_Symbol(node), objectFlags, inConstContext);
      } else {
        Checker_error(receiver, memberDecl, diagnosticsMessages.Spread_types_may_only_be_created_from_object_types);
        spread = receiver!.errorType;
      }
      continue;
    } else {
      Checker_checkNodeDeferred(receiver, memberDecl);
    }
    if (computedNameType !== undefined && (computedNameType!.flags & TypeFlagsStringOrNumberLiteralOrUnique) === 0) {
      if (Checker_isTypeAssignableTo(receiver, computedNameType, receiver!.stringNumberSymbolType)) {
        if (Checker_isTypeAssignableTo(receiver, computedNameType, receiver!.numberType)) {
          hasComputedNumberProperty = true;
        } else if (Checker_isTypeAssignableTo(receiver, computedNameType, receiver!.esSymbolType)) {
          hasComputedSymbolProperty = true;
        } else {
          hasComputedStringProperty = true;
        }
        if (inDestructuringPattern) {
          patternWithComputedProperties = true;
        }
      }
    } else {
      propertiesTable.set(member!.Name, member);
    }
    propertiesArray = GoSliceAppend(propertiesArray, member, GoPointerValueOps<Symbol>());
  }
  Checker_popContextualType(receiver);
  if (Checker_isErrorType(receiver, spread)) {
    return receiver!.errorType;
  }
  if (spread !== receiver!.emptyObjectType) {
    if (propertiesArray.length > 0) {
      spread = Checker_getSpreadType(receiver, spread, createObjectLiteralType(), Node_Symbol(node), objectFlags, inConstContext);
      propertiesArray = GoNilSlice();
      propertiesTable = new globalThis.Map<string, GoPtr<Symbol>>();
      hasComputedStringProperty = false;
      hasComputedNumberProperty = false;
    }
    return Checker_mapType(receiver, spread, (t: GoPtr<Type>): GoPtr<Type> => {
      if (t === receiver!.emptyObjectType) {
        return createObjectLiteralType();
      }
      return t;
    });
  }
  return createObjectLiteralType();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getSpreadType","kind":"method","status":"implemented","sigHash":"f8eb96aad944dccb37d6f78c2851003e32099784617e77f3785d7dc28ec5616d"}
 *
 * Go source:
 * func (c *Checker) getSpreadType(left *Type, right *Type, symbol *ast.Symbol, objectFlags ObjectFlags, readonly bool) *Type {
 * 	if left.flags&TypeFlagsAny != 0 || right.flags&TypeFlagsAny != 0 {
 * 		return c.anyType
 * 	}
 * 	if left.flags&TypeFlagsUnknown != 0 || right.flags&TypeFlagsUnknown != 0 {
 * 		return c.unknownType
 * 	}
 * 	if left.flags&TypeFlagsNever != 0 {
 * 		return right
 * 	}
 * 	if right.flags&TypeFlagsNever != 0 {
 * 		return left
 * 	}
 * 	left = c.tryMergeUnionOfObjectTypeAndEmptyObject(left, readonly)
 * 	if left.flags&TypeFlagsUnion != 0 {
 * 		if c.checkCrossProductUnion([]*Type{left, right}) {
 * 			return c.mapType(left, func(t *Type) *Type {
 * 				return c.getSpreadType(t, right, symbol, objectFlags, readonly)
 * 			})
 * 		}
 * 		return c.errorType
 * 	}
 * 	right = c.tryMergeUnionOfObjectTypeAndEmptyObject(right, readonly)
 * 	if right.flags&TypeFlagsUnion != 0 {
 * 		if c.checkCrossProductUnion([]*Type{left, right}) {
 * 			return c.mapType(right, func(t *Type) *Type {
 * 				return c.getSpreadType(left, t, symbol, objectFlags, readonly)
 * 			})
 * 		}
 * 		return c.errorType
 * 	}
 * 	if right.flags&(TypeFlagsBooleanLike|TypeFlagsNumberLike|TypeFlagsBigIntLike|TypeFlagsStringLike|TypeFlagsEnumLike|TypeFlagsNonPrimitive|TypeFlagsIndex) != 0 {
 * 		return left
 * 	}
 * 	if c.isGenericObjectType(left) || c.isGenericObjectType(right) {
 * 		if c.isEmptyObjectType(left) {
 * 			return right
 * 		}
 * 		// When the left type is an intersection, we may need to merge the last constituent of the
 * 		// intersection with the right type. For example when the left type is 'T & { a: string }'
 * 		// and the right type is '{ b: string }' we produce 'T & { a: string, b: string }'.
 * 		if left.flags&TypeFlagsIntersection != 0 {
 * 			types := left.Types()
 * 			lastLeft := types[len(types)-1]
 * 			if c.isNonGenericObjectType(lastLeft) && c.isNonGenericObjectType(right) {
 * 				newTypes := slices.Clone(types)
 * 				newTypes[len(newTypes)-1] = c.getSpreadType(lastLeft, right, symbol, objectFlags, readonly)
 * 				return c.getIntersectionType(newTypes)
 * 			}
 * 		}
 * 		return c.getIntersectionType([]*Type{left, right})
 * 	}
 * 	members := make(ast.SymbolTable)
 * 	var skippedPrivateMembers collections.Set[string]
 * 	var indexInfos []*IndexInfo
 * 	if left == c.emptyObjectType {
 * 		indexInfos = c.getIndexInfosOfType(right)
 * 	} else {
 * 		indexInfos = c.getUnionIndexInfos([]*Type{left, right})
 * 	}
 * 	for _, rightProp := range c.getPropertiesOfType(right) {
 * 		if getDeclarationModifierFlagsFromSymbol(rightProp)&(ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 {
 * 			skippedPrivateMembers.Add(rightProp.Name)
 * 		} else if c.isSpreadableProperty(rightProp) {
 * 			members[rightProp.Name] = c.getSpreadSymbol(rightProp, readonly)
 * 		}
 * 	}
 * 
 * 	for _, leftProp := range c.getPropertiesOfType(left) {
 * 		if skippedPrivateMembers.Has(leftProp.Name) || !c.isSpreadableProperty(leftProp) {
 * 			continue
 * 		}
 * 		if members[leftProp.Name] != nil {
 * 			rightProp := members[leftProp.Name]
 * 			rightType := c.getTypeOfSymbol(rightProp)
 * 			if rightProp.Flags&ast.SymbolFlagsOptional != 0 {
 * 				declarations := core.Concatenate(leftProp.Declarations, rightProp.Declarations)
 * 				flags := ast.SymbolFlagsProperty | (leftProp.Flags & ast.SymbolFlagsOptional)
 * 				result := c.newSymbol(flags, leftProp.Name)
 * 				links := c.valueSymbolLinks.Get(result)
 * 				// Optimization: avoid calculating the union type if spreading into the exact same type.
 * 				// This is common, e.g. spreading one options bag into another where the bags have the
 * 				// same type, or have properties which overlap. If the unions are large, it may turn out
 * 				// to be expensive to perform subtype reduction.
 * 				leftType := c.getTypeOfSymbol(leftProp)
 * 				leftTypeWithoutUndefined := c.removeMissingOrUndefinedType(leftType)
 * 				rightTypeWithoutUndefined := c.removeMissingOrUndefinedType(rightType)
 * 				if leftTypeWithoutUndefined == rightTypeWithoutUndefined {
 * 					links.resolvedType = leftType
 * 				} else {
 * 					links.resolvedType = c.getUnionTypeEx([]*Type{leftType, rightTypeWithoutUndefined}, UnionReductionSubtype, nil, nil)
 * 				}
 * 				c.spreadLinks.Get(result).leftSpread = leftProp
 * 				c.spreadLinks.Get(result).rightSpread = rightProp
 * 				result.Declarations = declarations
 * 				links.nameType = c.valueSymbolLinks.Get(leftProp).nameType
 * 				members[leftProp.Name] = result
 * 			}
 * 		} else {
 * 			members[leftProp.Name] = c.getSpreadSymbol(leftProp, readonly)
 * 		}
 * 	}
 * 	spreadIndexInfos := core.SameMap(indexInfos, func(info *IndexInfo) *IndexInfo {
 * 		return c.getIndexInfoWithReadonly(info, readonly)
 * 	})
 * 	spread := c.newAnonymousType(symbol, members, nil, nil, spreadIndexInfos)
 * 	spread.objectFlags |= ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral | ObjectFlagsContainsSpread | objectFlags
 * 	return spread
 * }
 */
export function Checker_getSpreadType(receiver: GoPtr<Checker>, left: GoPtr<Type>, right: GoPtr<Type>, symbol_: GoPtr<Symbol>, objectFlags: ObjectFlags, readonly: bool): GoPtr<Type> {
  if ((left!.flags & TypeFlagsAny) !== 0 || (right!.flags & TypeFlagsAny) !== 0) {
    return receiver!.anyType;
  }
  if ((left!.flags & TypeFlagsUnknown) !== 0 || (right!.flags & TypeFlagsUnknown) !== 0) {
    return receiver!.unknownType;
  }
  if ((left!.flags & TypeFlagsNever) !== 0) {
    return right;
  }
  if ((right!.flags & TypeFlagsNever) !== 0) {
    return left;
  }
  left = Checker_tryMergeUnionOfObjectTypeAndEmptyObject(receiver, left, readonly);
  if ((left!.flags & TypeFlagsUnion) !== 0) {
    if (Checker_checkCrossProductUnion(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, left, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, right, GoPointerValueOps<Type>());
    }))) {
      return Checker_mapType(receiver, left, (t: GoPtr<Type>): GoPtr<Type> => {
        return Checker_getSpreadType(receiver, t, right, symbol_, objectFlags, readonly);
      });
    }
    return receiver!.errorType;
  }
  right = Checker_tryMergeUnionOfObjectTypeAndEmptyObject(receiver, right, readonly);
  if ((right!.flags & TypeFlagsUnion) !== 0) {
    if (Checker_checkCrossProductUnion(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, left, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, right, GoPointerValueOps<Type>());
    }))) {
      return Checker_mapType(receiver, right, (t: GoPtr<Type>): GoPtr<Type> => {
        return Checker_getSpreadType(receiver, left, t, symbol_, objectFlags, readonly);
      });
    }
    return receiver!.errorType;
  }
  if ((right!.flags & (TypeFlagsBooleanLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsStringLike | TypeFlagsEnumLike | TypeFlagsNonPrimitive | TypeFlagsIndex)) !== 0) {
    return left;
  }
  if (Checker_isGenericObjectType(receiver, left) || Checker_isGenericObjectType(receiver, right)) {
    if (Checker_isEmptyObjectType(receiver, left)) {
      return right;
    }
    if ((left!.flags & TypeFlagsIntersection) !== 0) {
      const types = Type_Types(left)!;
      const lastLeft = GoSliceLoad(types, types.length - 1, GoPointerValueOps<Type>())!;
      if (Checker_isNonGenericObjectType(receiver, lastLeft) && Checker_isNonGenericObjectType(receiver, right)) {
        const newTypes = slices.Clone(types)!;
        GoSliceStore(newTypes, newTypes.length - 1, Checker_getSpreadType(receiver, lastLeft, right, symbol_, objectFlags, readonly), GoPointerValueOps<Type>());
        return Checker_getIntersectionType(receiver, newTypes);
      }
    }
    return Checker_getIntersectionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, left, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, right, GoPointerValueOps<Type>());
    }));
  }
  const members: SymbolTable = new globalThis.Map<string, GoPtr<Symbol>>();
  const skippedPrivateMembers = new globalThis.Set<string>();
  const indexInfos = left === receiver!.emptyObjectType
    ? Checker_getIndexInfosOfType(receiver, right)
    : Checker_getUnionIndexInfos(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, left, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, right, GoPointerValueOps<Type>());
    }));
  for (const rightProp of Checker_getPropertiesOfType(receiver, right)) {
    if ((getDeclarationModifierFlagsFromSymbol(rightProp) & (ModifierFlagsPrivate | ModifierFlagsProtected)) !== 0) {
      skippedPrivateMembers.add(rightProp!.Name);
    } else if (Checker_isSpreadableProperty(receiver, rightProp)) {
      members.set(rightProp!.Name, Checker_getSpreadSymbol(receiver, rightProp, readonly));
    }
  }
  for (const leftProp of Checker_getPropertiesOfType(receiver, left)) {
    if (skippedPrivateMembers.has(leftProp!.Name) || !Checker_isSpreadableProperty(receiver, leftProp)) {
      continue;
    }
    const rightProp = members.get(leftProp!.Name);
    if (rightProp !== undefined) {
      const rightType = Checker_getTypeOfSymbol(receiver, rightProp);
      if ((rightProp!.Flags & SymbolFlagsOptional) !== 0) {
        const declarations = core.Concatenate(leftProp!.Declarations, rightProp!.Declarations);
        const flags = (SymbolFlagsProperty | (leftProp!.Flags & SymbolFlagsOptional)) as SymbolFlags;
        const result = Checker_newSymbol(receiver, flags, leftProp!.Name);
        const links = LinkStore_Get(receiver!.valueSymbolLinks, result, zeroValueSymbolLinks, goSymbolPointerKey)!.v;
        const leftType = Checker_getTypeOfSymbol(receiver, leftProp);
        const leftTypeWithoutUndefined = Checker_removeMissingOrUndefinedType(receiver, leftType);
        const rightTypeWithoutUndefined = Checker_removeMissingOrUndefinedType(receiver, rightType);
        if (leftTypeWithoutUndefined === rightTypeWithoutUndefined) {
          links!.resolvedType = leftType;
        } else {
          links!.resolvedType = Checker_getUnionTypeEx(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, leftType, GoPointerValueOps<Type>());
            GoSliceStore(__goSliceLiteral, 1, rightTypeWithoutUndefined, GoPointerValueOps<Type>());
          }), UnionReductionSubtype, undefined, undefined);
        }
        LinkStore_Get(receiver!.spreadLinks, result, zeroSpreadLinks, goSymbolPointerKey)!.v.leftSpread = leftProp;
        LinkStore_Get(receiver!.spreadLinks, result, zeroSpreadLinks, goSymbolPointerKey)!.v.rightSpread = rightProp;
        result!.Declarations = declarations;
        links!.nameType = LinkStore_Get(receiver!.valueSymbolLinks, leftProp, zeroValueSymbolLinks, goSymbolPointerKey)!.v.nameType;
        members.set(leftProp!.Name, result);
      }
    } else {
      members.set(leftProp!.Name, Checker_getSpreadSymbol(receiver, leftProp, readonly));
    }
  }
  const spreadIndexInfos = core.SameMap(indexInfos, (info: GoPtr<IndexInfo>): GoPtr<IndexInfo> => {
    return Checker_getIndexInfoWithReadonly(receiver, info, readonly);
  }, GoEqualStrict<GoPtr<IndexInfo>>);
  const spread = Checker_newAnonymousType(receiver, symbol_, members, GoNilSlice(), GoNilSlice(), spreadIndexInfos);
  spread!.objectFlags |= (ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral | ObjectFlagsContainsSpread | objectFlags) as ObjectFlags;
  return spread;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isValidSpreadType","kind":"method","status":"implemented","sigHash":"9c21c78fbc8ec511aabfa4c12448bb9e5a0e4361045effbd66d7eda6405d21fd"}
 *
 * Go source:
 * func (c *Checker) isValidSpreadType(t *Type) bool {
 * 	s := c.removeDefinitelyFalsyTypes(c.mapType(t, c.getBaseConstraintOrType))
 * 	return s.flags&(TypeFlagsAny|TypeFlagsNonPrimitive|TypeFlagsObject|TypeFlagsInstantiableNonPrimitive) != 0 ||
 * 		s.flags&TypeFlagsUnionOrIntersection != 0 && core.Every(s.Types(), c.isValidSpreadType)
 * }
 */
export function Checker_isValidSpreadType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  const s = Checker_removeDefinitelyFalsyTypes(receiver, Checker_mapType(receiver, t, (ty: GoPtr<Type>): GoPtr<Type> => Checker_getBaseConstraintOrType(receiver, ty)));
  return (s!.flags & (TypeFlagsAny | TypeFlagsNonPrimitive | TypeFlagsObject | TypeFlagsInstantiableNonPrimitive)) !== 0 ||
    ((s!.flags & TypeFlagsUnionOrIntersection) !== 0 && core.Every(Type_Types(s)!, (ty: GoPtr<Type>): bool => Checker_isValidSpreadType(receiver, ty)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isNonGenericObjectType","kind":"method","status":"implemented","sigHash":"23a87e64653255673161d3d9254be6428a5396414602d9588a7654d22c0ab98b"}
 *
 * Go source:
 * func (c *Checker) isNonGenericObjectType(t *Type) bool {
 * 	return t.flags&TypeFlagsObject != 0 && !c.isGenericMappedType(t)
 * }
 */
export function Checker_isNonGenericObjectType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsObject) !== 0 && !Checker_isGenericMappedType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.tryMergeUnionOfObjectTypeAndEmptyObject","kind":"method","status":"implemented","sigHash":"58d9f17fa4424ee96779fcf9122d508e7ec87ac3f6da2c3f019946db62f3b2f1"}
 *
 * Go source:
 * func (c *Checker) tryMergeUnionOfObjectTypeAndEmptyObject(t *Type, readonly bool) *Type {
 * 	if t.flags&TypeFlagsUnion == 0 {
 * 		return t
 * 	}
 * 	if core.Every(t.Types(), c.isEmptyObjectTypeOrSpreadsIntoEmptyObject) {
 * 		empty := core.Find(t.Types(), c.isEmptyObjectType)
 * 		if empty != nil {
 * 			return empty
 * 		}
 * 		return c.emptyObjectType
 * 	}
 * 	firstType := core.Find(t.Types(), func(t *Type) bool {
 * 		return !c.isEmptyObjectTypeOrSpreadsIntoEmptyObject(t)
 * 	})
 * 	if firstType == nil {
 * 		return t
 * 	}
 * 	secondType := core.Find(t.Types(), func(t *Type) bool {
 * 		return t != firstType && !c.isEmptyObjectTypeOrSpreadsIntoEmptyObject(t)
 * 	})
 * 	if secondType != nil {
 * 		return t
 * 	}
 * 	// gets the type as if it had been spread, but where everything in the spread is made optional
 * 	members := make(ast.SymbolTable)
 * 	for _, prop := range c.getPropertiesOfType(firstType) {
 * 		if getDeclarationModifierFlagsFromSymbol(prop)&(ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 {
 * 			// do nothing, skip privates
 * 		} else if c.isSpreadableProperty(prop) {
 * 			isSetonlyAccessor := prop.Flags&ast.SymbolFlagsSetAccessor != 0 && prop.Flags&ast.SymbolFlagsGetAccessor == 0
 * 			flags := ast.SymbolFlagsProperty | ast.SymbolFlagsOptional
 * 			result := c.newSymbolEx(flags, prop.Name, prop.CheckFlags&ast.CheckFlagsLate|core.IfElse(readonly, ast.CheckFlagsReadonly, 0))
 * 			links := c.valueSymbolLinks.Get(result)
 * 			if isSetonlyAccessor {
 * 				links.resolvedType = c.undefinedType
 * 			} else {
 * 				links.resolvedType = c.addOptionalityEx(c.getTypeOfSymbol(prop), true /*isProperty* /, true /*isOptional* /)
 * 			}
 * 			result.Declarations = prop.Declarations
 * 			links.nameType = c.valueSymbolLinks.Get(prop).nameType
 * 			c.mappedSymbolLinks.Get(result).syntheticOrigin = prop
 * 			members[prop.Name] = result
 * 		}
 * 	}
 * 	spread := c.newAnonymousType(firstType.symbol, members, nil, nil, c.getIndexInfosOfType(firstType))
 * 	spread.objectFlags |= ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral
 * 	return spread
 * }
 */
export function Checker_tryMergeUnionOfObjectTypeAndEmptyObject(receiver: GoPtr<Checker>, t: GoPtr<Type>, readonly: bool): GoPtr<Type> {
  if ((t!.flags & TypeFlagsUnion) === 0) {
    return t;
  }
  const types = Type_Types(t)!;
  if (core.Every(types, (ty: GoPtr<Type>): bool => Checker_isEmptyObjectTypeOrSpreadsIntoEmptyObject(receiver, ty))) {
    const empty = core.Find(types, (ty: GoPtr<Type>): bool => Checker_isEmptyObjectType(receiver, ty), GoZeroPointer<Type>);
    if (empty !== undefined) {
      return empty;
    }
    return receiver!.emptyObjectType;
  }
  const firstType = core.Find(types, (ty: GoPtr<Type>): bool => {
    return !Checker_isEmptyObjectTypeOrSpreadsIntoEmptyObject(receiver, ty);
  }, GoZeroPointer<Type>);
  if (firstType === undefined) {
    return t;
  }
  const secondType = core.Find(types, (ty: GoPtr<Type>): bool => {
    return ty !== firstType && !Checker_isEmptyObjectTypeOrSpreadsIntoEmptyObject(receiver, ty);
  }, GoZeroPointer<Type>);
  if (secondType !== undefined) {
    return t;
  }
  const members: SymbolTable = new globalThis.Map<string, GoPtr<Symbol>>();
  for (const prop of Checker_getPropertiesOfType(receiver, firstType)) {
    if ((getDeclarationModifierFlagsFromSymbol(prop) & (ModifierFlagsPrivate | ModifierFlagsProtected)) !== 0) {
      continue;
    }
    if (Checker_isSpreadableProperty(receiver, prop)) {
      const isSetonlyAccessor = (prop!.Flags & SymbolFlagsSetAccessor) !== 0 && (prop!.Flags & SymbolFlagsGetAccessor) === 0;
      const flags = (SymbolFlagsProperty | SymbolFlagsOptional) as SymbolFlags;
      const result = Checker_newSymbolEx(receiver, flags, prop!.Name, (prop!.CheckFlags & CheckFlagsLate) | (readonly ? CheckFlagsReadonly : 0));
      const links = LinkStore_Get(receiver!.valueSymbolLinks, result, zeroValueSymbolLinks, goSymbolPointerKey)!.v;
      if (isSetonlyAccessor) {
        links!.resolvedType = receiver!.undefinedType;
      } else {
        links!.resolvedType = Checker_addOptionalityEx(receiver, Checker_getTypeOfSymbol(receiver, prop), true, true);
      }
      result!.Declarations = prop!.Declarations;
      links!.nameType = LinkStore_Get(receiver!.valueSymbolLinks, prop, zeroValueSymbolLinks, goSymbolPointerKey)!.v.nameType;
      LinkStore_Get(receiver!.mappedSymbolLinks, result, zeroMappedSymbolLinks, goSymbolPointerKey)!.v.syntheticOrigin = prop;
      members.set(prop!.Name, result);
    }
  }
  const spread = Checker_newAnonymousType(receiver, firstType!.symbol, members, GoNilSlice(), GoNilSlice(), Checker_getIndexInfosOfType(receiver, firstType));
  spread!.objectFlags |= (ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral) as ObjectFlags;
  return spread;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isEmptyObjectTypeOrSpreadsIntoEmptyObject","kind":"method","status":"implemented","sigHash":"73d28ca120d12e7aae200497c219d2c02dfcc2dbc2bb4daa7443d8d4194ff94d"}
 *
 * Go source:
 * func (c *Checker) isEmptyObjectTypeOrSpreadsIntoEmptyObject(t *Type) bool {
 * 	return c.isEmptyObjectType(t) || t.flags&(TypeFlagsNull|TypeFlagsUndefined|TypeFlagsBooleanLike|TypeFlagsNumberLike|TypeFlagsBigIntLike|TypeFlagsStringLike|TypeFlagsEnumLike|TypeFlagsNonPrimitive|TypeFlagsIndex) != 0
 * }
 */
export function Checker_isEmptyObjectTypeOrSpreadsIntoEmptyObject(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return Checker_isEmptyObjectType(receiver, t) || (t!.flags & (TypeFlagsNull | TypeFlagsUndefined | TypeFlagsBooleanLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsStringLike | TypeFlagsEnumLike | TypeFlagsNonPrimitive | TypeFlagsIndex)) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isConstTypeVariable","kind":"method","status":"implemented","sigHash":"bf5e143f1a0c1136ecb94c923424b36d56c1faf4c7bcb44b1399e3ddf1c8e44a"}
 *
 * Go source:
 * func (c *Checker) isConstTypeVariable(t *Type, depth int) bool {
 * 	if depth >= 5 || t == nil {
 * 		return false
 * 	}
 * 	switch {
 * 	case t.flags&TypeFlagsTypeParameter != 0:
 * 		return t.symbol != nil && core.Some(t.symbol.Declarations, func(d *ast.Node) bool { return ast.HasSyntacticModifier(d, ast.ModifierFlagsConst) })
 * 	case t.flags&TypeFlagsUnionOrIntersection != 0:
 * 		return core.Some(t.Types(), func(s *Type) bool { return c.isConstTypeVariable(s, depth) })
 * 	case t.flags&TypeFlagsIndexedAccess != 0:
 * 		return c.isConstTypeVariable(t.AsIndexedAccessType().objectType, depth+1)
 * 	case t.flags&TypeFlagsConditional != 0:
 * 		return c.isConstTypeVariable(c.getConstraintOfConditionalType(t), depth+1)
 * 	case t.flags&TypeFlagsSubstitution != 0:
 * 		return c.isConstTypeVariable(t.AsSubstitutionType().baseType, depth)
 * 	case t.objectFlags&ObjectFlagsMapped != 0:
 * 		typeVariable := c.getHomomorphicTypeVariable(t)
 * 		return typeVariable != nil && c.isConstTypeVariable(typeVariable, depth)
 * 	case c.isGenericTupleType(t):
 * 		for i, s := range c.getElementTypes(t) {
 * 			if t.TargetTupleType().elementInfos[i].flags&ElementFlagsVariadic != 0 && c.isConstTypeVariable(s, depth) {
 * 				return true
 * 			}
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Checker_isConstTypeVariable(receiver: GoPtr<Checker>, t: GoPtr<Type>, depth: int): bool {
  if (depth >= 5 || t === undefined) {
    return false;
  }
  if ((t!.flags & TypeFlagsTypeParameter) !== 0) {
    return (t!.symbol !== undefined && core.Some(t!.symbol!.Declarations, (d: GoPtr<Node>): bool => HasSyntacticModifier(d, ModifierFlagsConst))) as bool;
  }
  if ((t!.flags & TypeFlagsUnionOrIntersection) !== 0) {
    return core.Some(Type_Types(t), (s: GoPtr<Type>): bool => Checker_isConstTypeVariable(receiver, s, depth));
  }
  if ((t!.flags & TypeFlagsIndexedAccess) !== 0) {
    return Checker_isConstTypeVariable(receiver, IndexedAccessType_ObjectType(Type_AsIndexedAccessType(t)), depth + 1);
  }
  if ((t!.flags & TypeFlagsConditional) !== 0) {
    return Checker_isConstTypeVariable(receiver, Checker_getConstraintOfConditionalType(receiver, t), depth + 1);
  }
  if ((t!.flags & TypeFlagsSubstitution) !== 0) {
    return Checker_isConstTypeVariable(receiver, SubstitutionType_BaseType(Type_AsSubstitutionType(t)), depth);
  }
  if ((t!.objectFlags & ObjectFlagsMapped) !== 0) {
    const typeVariable = Checker_getHomomorphicTypeVariable(receiver, t);
    return typeVariable !== undefined && Checker_isConstTypeVariable(receiver, typeVariable, depth);
  }
  if (Checker_isGenericTupleType(receiver, t)) {
    const elementTypes = Checker_getElementTypes(receiver, t);
    for (let i = 0; i < elementTypes.length; i++) {
      if ((Type_TargetTupleType(t)!.elementInfos[i]!.flags & ElementFlagsVariadic) !== 0 && Checker_isConstTypeVariable(receiver, GoSliceLoad(elementTypes, i, GoPointerValueOps<Type>()), depth)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkObjectLiteralMethod","kind":"method","status":"implemented","sigHash":"5be5655f56bdcc851ee5fb0b8bc30545e4a0bda4199672b3bc170dc791b7eae3"}
 *
 * Go source:
 * func (c *Checker) checkObjectLiteralMethod(node *ast.Node, checkMode CheckMode) *Type {
 * 	// Grammar checking
 * 	c.checkGrammarMethod(node)
 * 	// Do not use hasDynamicName here, because that returns false for well known symbols.
 * 	// We want to perform checkComputedPropertyName for all computed properties, including
 * 	// well known symbols.
 * 	if ast.IsComputedPropertyName(node.Name()) {
 * 		c.checkComputedPropertyName(node.Name())
 * 	}
 * 	uninstantiatedType := c.checkFunctionExpressionOrObjectLiteralMethod(node, checkMode)
 * 	return c.instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, checkMode)
 * }
 */
export function Checker_checkObjectLiteralMethod(receiver: GoPtr<Checker>, node: GoPtr<Node>, checkMode: CheckMode): GoPtr<Type> {
  Checker_checkGrammarMethod(receiver, node);
  if (IsComputedPropertyName(Node_Name(node))) {
    Checker_checkComputedPropertyName(receiver, Node_Name(node));
  }
  const uninstantiatedType = Checker_checkFunctionExpressionOrObjectLiteralMethod(receiver, node, checkMode);
  return Checker_instantiateTypeWithSingleGenericCallSignature(receiver, node, uninstantiatedType, checkMode);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.resolveExternalModuleTypeByLiteral","kind":"method","status":"implemented","sigHash":"c8098e52c97a858d3292a3122cc4a8f1f2ec891f1aa9d417aeb3eb125f8f196b"}
 *
 * Go source:
 * func (c *Checker) resolveExternalModuleTypeByLiteral(name *ast.Node) *Type {
 * 	moduleSym := c.resolveExternalModuleName(name, name, false /*ignoreErrors* /)
 * 	if moduleSym != nil {
 * 		resolvedModuleSymbol := c.resolveExternalModuleSymbol(moduleSym, false /*dontResolveAlias* /)
 * 		if resolvedModuleSymbol != nil {
 * 			return c.getTypeOfSymbol(resolvedModuleSymbol)
 * 		}
 * 	}
 * 	return c.anyType
 * }
 */
export function Checker_resolveExternalModuleTypeByLiteral(receiver: GoPtr<Checker>, name: GoPtr<Node>): GoPtr<Type> {
  const moduleSym = Checker_resolveExternalModuleName(receiver, name, name, false);
  if (moduleSym !== undefined) {
    const resolvedModuleSymbol = Checker_resolveExternalModuleSymbol(receiver, moduleSym, false);
    if (resolvedModuleSymbol !== undefined) {
      return Checker_getTypeOfSymbol(receiver, resolvedModuleSymbol);
    }
  }
  return receiver!.anyType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.errorOnImplicitAnyModule","kind":"method","status":"implemented","sigHash":"25f4f2ad1fc8a64d2e3724ec143e55738e84c3603916e8c4c6fa0b9f23f3fb79"}
 *
 * Go source:
 * func (c *Checker) errorOnImplicitAnyModule(isError bool, errorNode *ast.Node, mode core.ResolutionMode, resolvedModule *module.ResolvedModule, moduleReference string) {
 * 	if isSideEffectImport(errorNode) {
 * 		return
 * 	}
 * 
 * 	var errorInfo *ast.Diagnostic
 * 	if !tspath.IsExternalModuleNameRelative(moduleReference) && resolvedModule.PackageId.Name != "" {
 * 		errorInfo = c.createModuleNotFoundChain(resolvedModule, errorNode, moduleReference, mode, resolvedModule.PackageId.Name)
 * 	}
 * 	c.addErrorOrSuggestion(
 * 		isError,
 * 		NewDiagnosticChainForNode(
 * 			errorInfo,
 * 			errorNode,
 * 			diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type,
 * 			moduleReference,
 * 			resolvedModule.ResolvedFileName,
 * 		),
 * 	)
 * }
 */
export function Checker_errorOnImplicitAnyModule(receiver: GoPtr<Checker>, isError: bool, errorNode: GoPtr<Node>, mode: ResolutionMode, resolvedModule: GoPtr<ResolvedModule>, moduleReference: string): void {
  if (isSideEffectImport(errorNode)) {
    return;
  }

  let errorInfo: GoPtr<Diagnostic>;
  if (!IsExternalModuleNameRelative(moduleReference) && resolvedModule!.PackageId.Name !== "") {
    errorInfo = Checker_createModuleNotFoundChain(receiver, resolvedModule, errorNode, moduleReference, mode, resolvedModule!.PackageId.Name);
  }
  Checker_addErrorOrSuggestion(
    receiver,
    isError,
    NewDiagnosticChainForNode(
      errorInfo,
      errorNode,
      diagnosticsMessages.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type,
      moduleReference,
      resolvedModule!.ResolvedFileName,
    ),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeWithSyntheticDefaultOnly","kind":"method","status":"implemented","sigHash":"f76929a1bf1d29d2d0a4435c0ca94bb4ba51afecd74c6b42dd0bbdd243bdf335"}
 *
 * Go source:
 * func (c *Checker) getTypeWithSyntheticDefaultOnly(t *Type, symbol *ast.Symbol, originalSymbol *ast.Symbol, moduleSpecifier *ast.Node) *Type {
 * 	hasDefaultOnly := c.isOnlyImportableAsDefault(moduleSpecifier, nil)
 * 	if hasDefaultOnly && t != nil && !c.isErrorType(t) {
 * 		key := CachedTypeKey{kind: CachedTypeKindDefaultOnlyType, typeId: t.id}
 * 		if cached := c.cachedTypes[key]; cached != nil {
 * 			return cached
 * 		}
 * 		result := c.createDefaultPropertyWrapperForModule(symbol, originalSymbol, nil)
 * 		c.cachedTypes[key] = result
 * 		return result
 * 	}
 * 	return nil
 * }
 */
export function Checker_getTypeWithSyntheticDefaultOnly(receiver: GoPtr<Checker>, t: GoPtr<Type>, symbol_: GoPtr<Symbol>, originalSymbol: GoPtr<Symbol>, moduleSpecifier: GoPtr<Node>): GoPtr<Type> {
  const hasDefaultOnly = Checker_isOnlyImportableAsDefault(receiver, moduleSpecifier, undefined);
  if (hasDefaultOnly && t !== undefined && !Checker_isErrorType(receiver, t)) {
    const key: CachedTypeKey = { kind: CachedTypeKindDefaultOnlyType, typeId: t!.id };
    const cached = receiver!.cachedTypes.get(key);
    if (cached !== undefined) {
      return cached;
    }
    const result = Checker_createDefaultPropertyWrapperForModule(receiver, symbol_, originalSymbol, undefined);
    receiver!.cachedTypes.set(key, result);
    return result;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.cloneTypeAsModuleType","kind":"method","status":"implemented","sigHash":"75e0d8625a0eb5a5d6e251bd0a16d1e025d23b58dce4323541debe7c7ba2ffa1"}
 *
 * Go source:
 * func (c *Checker) cloneTypeAsModuleType(symbol *ast.Symbol, moduleType *Type, referenceParent *ast.Node) *ast.Symbol {
 * 	result := c.newSymbol(symbol.Flags, symbol.Name)
 * 	result.Declarations = slices.Clone(symbol.Declarations)
 * 	result.ValueDeclaration = symbol.ValueDeclaration
 * 	result.Members = maps.Clone(symbol.Members)
 * 	result.Exports = maps.Clone(symbol.Exports)
 * 	result.Parent = symbol.Parent
 * 	links := c.exportTypeLinks.Get(result)
 * 	links.target = symbol
 * 	links.originatingImport = referenceParent
 * 	resolvedModuleType := c.resolveStructuredTypeMembers(moduleType)
 * 	c.valueSymbolLinks.Get(result).resolvedType = c.newAnonymousType(result, resolvedModuleType.members, nil, nil, resolvedModuleType.indexInfos)
 * 	return result
 * }
 */
export function Checker_cloneTypeAsModuleType(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>, moduleType: GoPtr<Type>, referenceParent: GoPtr<Node>): GoPtr<Symbol> {
  const result = Checker_newSymbol(receiver, symbol_!.Flags, symbol_!.Name);
  result!.Declarations = slices.Clone(symbol_!.Declarations) as GoSlice<GoPtr<Node>>;
  result!.ValueDeclaration = symbol_!.ValueDeclaration;
  result!.Members = maps.Clone(symbol_!.Members, GoStringKey);
  result!.Exports = maps.Clone(symbol_!.Exports, GoStringKey);
  result!.Parent = symbol_!.Parent;
  const links = LinkStore_Get<GoPtr<Symbol>, ExportTypeLinks>(receiver!.exportTypeLinks as GoPtr<LinkStore<GoPtr<Symbol>, ExportTypeLinks>>, result, zeroExportTypeLinks, goSymbolPointerKey);
  links!.v.target = symbol_;
  links!.v.originatingImport = referenceParent;
  const resolvedModuleType = Checker_resolveStructuredTypeMembers(receiver, moduleType);
  LinkStore_Get(receiver!.valueSymbolLinks, result, zeroValueSymbolLinks, goSymbolPointerKey)!.v.resolvedType = Checker_newAnonymousType(receiver, result, resolvedModuleType!.members, StructuredType_CallSignatures(resolvedModuleType), StructuredType_ConstructSignatures(resolvedModuleType), resolvedModuleType!.indexInfos);
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.padObjectLiteralType","kind":"method","status":"implemented","sigHash":"5b6fe06d4ae7fcbe1a3115724801577341c4612eaa5e3ea5a0e4fa6e30c0ca2a"}
 *
 * Go source:
 * func (c *Checker) padObjectLiteralType(t *Type, pattern *ast.Node) *Type {
 * 	var missingElements []*ast.Node
 * 	for _, e := range pattern.Elements() {
 * 		if e.Initializer() != nil {
 * 			name := c.getPropertyNameFromBindingElement(e)
 * 			if name != ast.InternalSymbolNameMissing && c.getPropertyOfType(t, name) == nil {
 * 				missingElements = append(missingElements, e)
 * 			}
 * 		}
 * 	}
 * 	if len(missingElements) == 0 {
 * 		return t
 * 	}
 * 	members := make(ast.SymbolTable)
 * 	for _, prop := range c.getPropertiesOfObjectType(t) {
 * 		members[prop.Name] = prop
 * 	}
 * 	for _, e := range missingElements {
 * 		symbol := c.newSymbol(ast.SymbolFlagsProperty|ast.SymbolFlagsOptional, c.getPropertyNameFromBindingElement(e))
 * 		c.valueSymbolLinks.Get(symbol).resolvedType = c.getTypeFromBindingElement(e, false /*includePatternInType* /, false /*reportErrors* /)
 * 		members[symbol.Name] = symbol
 * 	}
 * 	result := c.newAnonymousType(t.symbol, members, nil, nil, c.getIndexInfosOfType(t))
 * 	result.objectFlags = t.objectFlags
 * 	return result
 * }
 */
export function Checker_padObjectLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>, pattern: GoPtr<Node>): GoPtr<Type> {
  let missingElements: GoSlice<GoPtr<Node>> = GoNilSlice();
  for (const e of Node_Elements(pattern) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    if (Node_Initializer(e) !== undefined) {
      const name = Checker_getPropertyNameFromBindingElement(receiver, e);
      if (name !== InternalSymbolNameMissing && Checker_getPropertyOfType(receiver, t, name) === undefined) {
        missingElements = GoSliceAppend(missingElements, e, GoPointerValueOps<Node>());
      }
    }
  }
  if (missingElements.length === 0) {
    return t;
  }
  const members: SymbolTable = new globalThis.Map<string, GoPtr<Symbol>>();
  for (const prop of Checker_getPropertiesOfObjectType(receiver, t) ?? GoSliceMake(0, 0, GoPointerValueOps<Symbol>())) {
    members.set(prop!.Name, prop);
  }
  for (const e of missingElements) {
    const symbol = Checker_newSymbol(receiver, SymbolFlagsProperty | SymbolFlagsOptional, Checker_getPropertyNameFromBindingElement(receiver, e));
    LinkStore_Get(receiver!.valueSymbolLinks, symbol, zeroValueSymbolLinks, goSymbolPointerKey)!.v.resolvedType = Checker_getTypeFromBindingElement(receiver, e, false, false);
    members.set(symbol!.Name, symbol);
  }
  const result = Checker_newAnonymousType(receiver, t!.symbol, members, GoNilSlice(), GoNilSlice(), Checker_getIndexInfosOfType(receiver, t));
  result!.objectFlags = t!.objectFlags;
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.padTupleType","kind":"method","status":"implemented","sigHash":"bfd978a9a00cc192ba942ba3b7e9391940476f943e51b19cecc3bd5ca382e0e5"}
 *
 * Go source:
 * func (c *Checker) padTupleType(t *Type, pattern *ast.Node) *Type {
 * 	patternElements := pattern.Elements()
 * 	if t.TargetTupleType().combinedFlags&ElementFlagsVariable != 0 || c.getTypeReferenceArity(t) >= len(patternElements) {
 * 		return t
 * 	}
 * 	elementTypes := slices.Clone(c.getElementTypes(t))
 * 	elementInfos := slices.Clone(t.TargetTupleType().elementInfos)
 * 	for i := c.getTypeReferenceArity(t); i < len(patternElements); i++ {
 * 		e := patternElements[i]
 * 		if i < len(patternElements)-1 || !(ast.IsBindingElement(e) && hasDotDotDotToken(e)) {
 * 			elementType := c.anyType
 * 			if !ast.IsOmittedExpression(e) && c.hasDefaultValue(e) {
 * 				elementType = c.getTypeFromBindingElement(e, false /*includePatternInType* /, false /*reportErrors* /)
 * 			}
 * 			elementTypes = append(elementTypes, elementType)
 * 			elementInfos = append(elementInfos, TupleElementInfo{flags: ElementFlagsOptional})
 * 			if !ast.IsOmittedExpression(e) && !c.hasDefaultValue(e) {
 * 				c.reportImplicitAny(e, c.anyType, WideningKindNormal)
 * 			}
 * 		}
 * 	}
 * 	return c.createTupleTypeEx(elementTypes, elementInfos, t.TargetTupleType().readonly)
 * }
 */
export function Checker_padTupleType(receiver: GoPtr<Checker>, t: GoPtr<Type>, pattern: GoPtr<Node>): GoPtr<Type> {
  const patternElements = Node_Elements(pattern) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
  if ((Type_TargetTupleType(t)!.combinedFlags & ElementFlagsVariable) !== 0 || Checker_getTypeReferenceArity(receiver, t) >= patternElements.length) {
    return t;
  }
  let elementTypes = slices.Clone(Checker_getElementTypes(receiver, t));
  let elementInfos = slices.Clone(Type_TargetTupleType(t)!.elementInfos);
  for (let i = Checker_getTypeReferenceArity(receiver, t); i < patternElements.length; i++) {
    const e = GoSliceLoad(patternElements, i, GoPointerValueOps<Node>());
    if (i < patternElements.length - 1 || !(IsBindingElement(e) && hasDotDotDotToken(e))) {
      let elementType = receiver!.anyType;
      if (!IsOmittedExpression(e) && Checker_hasDefaultValue(receiver, e)) {
        elementType = Checker_getTypeFromBindingElement(receiver, e, false, false);
      }
      elementTypes = GoSliceAppend(elementTypes, elementType, GoPointerValueOps<Type>());
      elementInfos = GoAppend(elementInfos, { flags: ElementFlagsOptionalFlag, labeledDeclaration: undefined });
      if (!IsOmittedExpression(e) && !Checker_hasDefaultValue(receiver, e)) {
        Checker_reportImplicitAny(receiver, e, receiver!.anyType, WideningKindNormal);
      }
    }
  }
  return Checker_createTupleTypeEx(receiver, elementTypes, elementInfos, Type_TargetTupleType(t)!.readonly);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getWidenedLiteralTypeForInitializer","kind":"method","status":"implemented","sigHash":"ac5bcf37a273e990c663e854a2cb2e0e3759668016af738dcf16e3ec920d4a55"}
 *
 * Go source:
 * func (c *Checker) getWidenedLiteralTypeForInitializer(declaration *ast.Node, t *Type) *Type {
 * 	if c.getCombinedNodeFlagsCached(declaration)&ast.NodeFlagsConstant != 0 || isDeclarationReadonly(declaration) {
 * 		return t
 * 	}
 * 	return c.getWidenedLiteralType(t)
 * }
 */
export function Checker_getWidenedLiteralTypeForInitializer(receiver: GoPtr<Checker>, declaration: GoPtr<Node>, t: GoPtr<Type>): GoPtr<Type> {
  if ((Checker_getCombinedNodeFlagsCached(receiver, declaration) & NodeFlagsConstant) !== 0 || isDeclarationReadonly(declaration)) {
    return t;
  }
  return Checker_getWidenedLiteralType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeOfFuncClassEnumModule","kind":"method","status":"implemented","sigHash":"09421f392ff57c21ef6f918e870d1640ae792b5f596de85b467b9c1b4ee12b34"}
 *
 * Go source:
 * func (c *Checker) getTypeOfFuncClassEnumModule(symbol *ast.Symbol) *Type {
 * 	links := c.valueSymbolLinks.Get(symbol)
 * 	if links.resolvedType == nil {
 * 		links.resolvedType = c.getTypeOfFuncClassEnumModuleWorker(symbol)
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeOfFuncClassEnumModule(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.valueSymbolLinks, symbol_, zeroValueSymbolLinks, goSymbolPointerKey)!.v;
  if (links!.resolvedType === undefined) {
    links!.resolvedType = Checker_getTypeOfFuncClassEnumModuleWorker(receiver, symbol_);
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeOfFuncClassEnumModuleWorker","kind":"method","status":"implemented","sigHash":"80100f4095f9e0bec750c83637e5afa28c8c72578ac1e4bc4b8670ca7ad93023"}
 *
 * Go source:
 * func (c *Checker) getTypeOfFuncClassEnumModuleWorker(symbol *ast.Symbol) *Type {
 * 	if symbol.Flags&ast.SymbolFlagsModule != 0 && isShorthandAmbientModuleSymbol(symbol) {
 * 		return c.anyType
 * 	} else if symbol.Flags&ast.SymbolFlagsValueModule != 0 && symbol.ValueDeclaration != nil &&
 * 		ast.IsSourceFile(symbol.ValueDeclaration) && symbol.ValueDeclaration.AsSourceFile().CommonJSModuleIndicator != nil {
 * 		resolvedModule := c.resolveExternalModuleSymbol(symbol, false /*dontResolveAlias* /)
 * 		if resolvedModule != symbol {
 * 			return c.getTypeOfSymbol(resolvedModule)
 * 		}
 * 	}
 * 	t := c.newObjectType(ObjectFlagsAnonymous, symbol)
 * 	if symbol.Flags&ast.SymbolFlagsClass != 0 {
 * 		baseTypeVariable := c.getBaseTypeVariableOfClass(symbol)
 * 		if baseTypeVariable != nil {
 * 			return c.getIntersectionType([]*Type{t, baseTypeVariable})
 * 		}
 * 		return t
 * 	}
 * 	if c.strictNullChecks && symbol.Flags&ast.SymbolFlagsOptional != 0 {
 * 		return c.getOptionalType(t /*isProperty* /, true)
 * 	}
 * 	return t
 * }
 */
export function Checker_getTypeOfFuncClassEnumModuleWorker(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  if ((symbol_!.Flags & SymbolFlagsModule) !== 0 && isShorthandAmbientModuleSymbol(symbol_)) {
    return receiver!.anyType;
  } else if (
    (symbol_!.Flags & SymbolFlagsValueModule) !== 0 &&
    symbol_!.ValueDeclaration !== undefined &&
    IsSourceFile(symbol_!.ValueDeclaration) &&
    AsSourceFile(symbol_!.ValueDeclaration)!.CommonJSModuleIndicator !== undefined
  ) {
    const resolvedModule = Checker_resolveExternalModuleSymbol(receiver, symbol_, false);
    if (resolvedModule !== symbol_) {
      return Checker_getTypeOfSymbol(receiver, resolvedModule);
    }
  }
  const t = Checker_newObjectType(receiver, ObjectFlagsAnonymous, symbol_);
  if ((symbol_!.Flags & SymbolFlagsClass) !== 0) {
    const baseTypeVariable = Checker_getBaseTypeVariableOfClass(receiver, symbol_);
    if (baseTypeVariable !== undefined) {
      return Checker_getIntersectionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, t, GoPointerValueOps<Type>());
        GoSliceStore(__goSliceLiteral, 1, baseTypeVariable, GoPointerValueOps<Type>());
      }));
    }
    return t;
  }
  if (receiver!.strictNullChecks && (symbol_!.Flags & SymbolFlagsOptional) !== 0) {
    return Checker_getOptionalType(receiver, t, true);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBaseTypeVariableOfClass","kind":"method","status":"implemented","sigHash":"511cc6999f0491ed9b09c7d3f37d0ce68a39c2baeb4d60796df7f8fe940eee03"}
 *
 * Go source:
 * func (c *Checker) getBaseTypeVariableOfClass(symbol *ast.Symbol) *Type {
 * 	baseConstructorType := c.getBaseConstructorTypeOfClass(c.getDeclaredTypeOfClassOrInterface(symbol))
 * 	switch {
 * 	case baseConstructorType.flags&TypeFlagsTypeVariable != 0:
 * 		return baseConstructorType
 * 	case baseConstructorType.flags&TypeFlagsIntersection != 0:
 * 		return core.Find(baseConstructorType.Types(), func(t *Type) bool {
 * 			return t.flags&TypeFlagsTypeVariable != 0
 * 		})
 * 	}
 * 	return nil
 * }
 */
export function Checker_getBaseTypeVariableOfClass(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  const baseConstructorType = Checker_getBaseConstructorTypeOfClass(receiver, Checker_getDeclaredTypeOfClassOrInterface(receiver, symbol_));
  if ((baseConstructorType!.flags & TypeFlagsTypeVariable) !== 0) {
    return baseConstructorType;
  }
  if ((baseConstructorType!.flags & TypeFlagsIntersection) !== 0) {
    return core.Find(Type_Types(baseConstructorType), (t) => (t!.flags & TypeFlagsTypeVariable) !== 0, GoZeroPointer<Type>);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isFunctionType","kind":"method","status":"implemented","sigHash":"8f9ac8f54ad8bd089f68c08cdf77fd03e8ac013db22aefa448ab341a7f7abb35"}
 *
 * Go source:
 * func (c *Checker) isFunctionType(t *Type) bool {
 * 	return t.flags&TypeFlagsObject != 0 && len(c.getSignaturesOfType(t, SignatureKindCall)) > 0
 * }
 */
export function Checker_isFunctionType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsObject) !== 0 && Checker_getSignaturesOfType(receiver, t, SignatureKindCall).length > 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getDeclaredTypeOfClassOrInterface","kind":"method","status":"implemented","sigHash":"5cdbe239b62a4cbcf16b88b3859cb2223a68a0fe4c9bdde4fc857b3c15ca2eb2"}
 *
 * Go source:
 * func (c *Checker) getDeclaredTypeOfClassOrInterface(symbol *ast.Symbol) *Type {
 * 	links := c.declaredTypeLinks.Get(symbol)
 * 	if links.declaredType == nil {
 * 		kind := core.IfElse(symbol.Flags&ast.SymbolFlagsClass != 0, ObjectFlagsClass, ObjectFlagsInterface)
 * 		t := c.newObjectType(kind, symbol)
 * 		links.declaredType = t
 * 		outerTypeParameters := c.getOuterTypeParametersOfClassOrInterface(symbol)
 * 		typeParameters := c.appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias(outerTypeParameters, symbol)
 * 		// A class or interface is generic if it has type parameters or a "this" type. We always give classes a "this" type
 * 		// because it is not feasible to analyze all members to determine if the "this" type escapes the class (in particular,
 * 		// property types inferred from initializers and method return types inferred from return statements are very hard
 * 		// to exhaustively analyze). We give interfaces a "this" type if we can't definitely determine that they are free of
 * 		// "this" references.
 * 		if typeParameters != nil || kind == ObjectFlagsClass || !c.isThislessInterface(symbol) {
 * 			t.objectFlags |= ObjectFlagsReference
 * 			d := t.AsInterfaceType()
 * 			d.thisType = c.newTypeParameter(symbol)
 * 			d.thisType.AsTypeParameter().isThisType = true
 * 			d.thisType.AsTypeParameter().constraint = t
 * 			d.allTypeParameters = append(typeParameters, d.thisType)
 * 			d.outerTypeParameterCount = len(outerTypeParameters)
 * 			d.resolvedTypeArguments = d.TypeParameters()
 * 			d.instantiations = make(map[CacheHashKey]*Type)
 * 			d.instantiations[getTypeListKey(d.resolvedTypeArguments)] = t
 * 			d.target = t
 * 		}
 * 	}
 * 	return links.declaredType
 * }
 */
export function Checker_getDeclaredTypeOfClassOrInterface(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.declaredTypeLinks, symbol_, zeroDeclaredTypeLinks, goSymbolPointerKey)!.v;
  if (links!.declaredType === undefined) {
    const kind = (symbol_!.Flags & SymbolFlagsClass) !== 0 ? ObjectFlagsClass : ObjectFlagsInterface;
    const t = Checker_newObjectType(receiver, kind, symbol_);
    links!.declaredType = t;
    const outerTypeParameters = Checker_getOuterTypeParametersOfClassOrInterface(receiver, symbol_);
    const typeParameters = Checker_appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias(receiver, outerTypeParameters, symbol_);
    if (!GoSliceIsNil(typeParameters) || kind === ObjectFlagsClass || !Checker_isThislessInterface(receiver, symbol_)) {
      t!.objectFlags |= ObjectFlagsReference;
      const d = Type_AsInterfaceType(t)!;
      d.thisType = Checker_newTypeParameter(receiver, symbol_);
      Type_AsTypeParameter(d.thisType)!.isThisType = true;
      Type_AsTypeParameter(d.thisType)!.constraint = t;
      d.allTypeParameters = GoSliceAppend(typeParameters, d.thisType, GoPointerValueOps<Type>());
      d.outerTypeParameterCount = outerTypeParameters.length;
      const typeReference = Type_AsTypeReference(t)!;
      typeReference.resolvedTypeArguments = InterfaceType_TypeParameters(d);
      Type_AsObjectType(t)!.instantiations = NewGoStructMap(GoStructKey(
        [GoStructField((value: CacheHashKey) => value.Hi, GoBigIntKey), GoStructField((value: CacheHashKey) => value.Lo, GoBigIntKey)],
        ([Hi, Lo], source) => globalThis.Object.assign(globalThis.Object.create(globalThis.Object.getPrototypeOf(source)) as CacheHashKey, source, { Hi, Lo }),
      ));
      Type_AsObjectType(t)!.instantiations.set(getTypeListKey(typeReference.resolvedTypeArguments), t);
      Type_AsObjectType(t)!.target = t;
    }
  }
  return links!.declaredType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::keyBuilder.writeType","kind":"method","status":"implemented","sigHash":"a34936c687a7911f2ab5e50972cc1ab74c539caa4ce76ec85a082cf2789dc5d5"}
 *
 * Go source:
 * func (b *keyBuilder) writeType(t *Type) {
 * 	hashWrite32(&b.h, t.id)
 * }
 */
export function keyBuilder_writeType(receiver: GoPtr<keyBuilder>, t: GoPtr<Type>): void {
  hashWrite32(receiver!.h, t!.id);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::keyBuilder.writeTypes","kind":"method","status":"implemented","sigHash":"f11b800a97951058314f4ea307f01b924bf4c437c7c6e59ac20300789c1f0877"}
 *
 * Go source:
 * func (b *keyBuilder) writeTypes(types []*Type) {
 * 	b.writeInt(len(types))
 * 	for _, t := range types {
 * 		b.writeType(t)
 * 	}
 * }
 */
export function keyBuilder_writeTypes(receiver: GoPtr<keyBuilder>, types: GoSlice<GoPtr<Type>>): void {
  keyBuilder_writeInt(receiver, types.length as int);
  for (const t of types) {
    keyBuilder_writeType(receiver, t);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::keyBuilder.writeGenericTypeReferences","kind":"method","status":"implemented","sigHash":"0f213166d07119139f43e72cc3d8d3a25df92f333ec7687b2b24f1f3926862ab"}
 *
 * Go source:
 * func (b *keyBuilder) writeGenericTypeReferences(source *Type, target *Type, ignoreConstraints bool) bool {
 * 	var constrained bool
 * 	typeParameters := make([]*Type, 0, 8)
 * 	var writeTypeReference func(*Type, int)
 * 	writeTypeReference = func(ref *Type, depth int) {
 * 		b.writeType(ref.Target())
 * 		for _, t := range ref.AsTypeReference().resolvedTypeArguments {
 * 			if t.flags&TypeFlagsTypeParameter != 0 {
 * 				if ignoreConstraints || t.checker.getConstraintOfTypeParameter(t) == nil {
 * 					index := slices.Index(typeParameters, t)
 * 					if index < 0 {
 * 						index = len(typeParameters)
 * 						typeParameters = append(typeParameters, t)
 * 					}
 * 					b.writeByte('=')
 * 					b.writeInt(index)
 * 					continue
 * 				}
 * 				constrained = true
 * 			} else if depth < 4 && isTypeReferenceWithGenericArguments(t) {
 * 				b.writeByte('<')
 * 				writeTypeReference(t, depth+1)
 * 				b.writeByte('>')
 * 				continue
 * 			}
 * 			b.writeByte('-')
 * 			b.writeType(t)
 * 		}
 * 	}
 * 	writeTypeReference(source, 0)
 * 	b.writeByte(',')
 * 	writeTypeReference(target, 0)
 * 	return constrained
 * }
 */
export function keyBuilder_writeGenericTypeReferences(receiver: GoPtr<keyBuilder>, source: GoPtr<Type>, target: GoPtr<Type>, ignoreConstraints: bool): bool {
  let constrained = false as bool;
  let typeParameters: GoSlice<GoPtr<Type>> = GoSliceMake(0, 0, GoPointerValueOps<Type>());
  const writeTypeReference = (ref: GoPtr<Type>, depth: int): void => {
    keyBuilder_writeType(receiver, Type_Target(ref));
    for (const t of Type_AsTypeReference(ref)!.resolvedTypeArguments) {
      if ((t!.flags & TypeFlagsTypeParameter) !== 0) {
        if (ignoreConstraints || Checker_getConstraintOfTypeParameter(t!.checker, t) === undefined) {
          let index = slices.Index(typeParameters, t, GoEqualStrict<GoPtr<Type>>);
          if (index < 0) {
            index = typeParameters.length as int;
            typeParameters = GoSliceAppend(typeParameters, t, GoPointerValueOps<Type>());
          }
          keyBuilder_writeByte(receiver, "=".charCodeAt(0) as byte);
          keyBuilder_writeInt(receiver, index);
          continue;
        }
        constrained = true as bool;
      } else if (depth < 4 && isTypeReferenceWithGenericArguments(t)) {
        keyBuilder_writeByte(receiver, "<".charCodeAt(0) as byte);
        writeTypeReference(t, (depth + 1) as int);
        keyBuilder_writeByte(receiver, ">".charCodeAt(0) as byte);
        continue;
      }
      keyBuilder_writeByte(receiver, "-".charCodeAt(0) as byte);
      keyBuilder_writeType(receiver, t);
    }
  };
  writeTypeReference(source, 0 as int);
  keyBuilder_writeByte(receiver, ",".charCodeAt(0) as byte);
  writeTypeReference(target, 0 as int);
  return constrained;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isNullOrUndefined","kind":"method","status":"implemented","sigHash":"e22510bbc54107f977585c45f5b4cdf777c7c3fbc7ad2c9a92ebd6a8243db3a6"}
 *
 * Go source:
 * func (c *Checker) isNullOrUndefined(node *ast.Node) bool {
 * 	expr := ast.SkipParentheses(node)
 * 	switch expr.Kind {
 * 	case ast.KindNullKeyword:
 * 		return true
 * 	case ast.KindIdentifier:
 * 		return c.getResolvedSymbol(expr) == c.undefinedSymbol
 * 	}
 * 	return false
 * }
 */
export function Checker_isNullOrUndefined(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  const expr = SkipParentheses(node);
  switch (expr!.Kind) {
  case KindNullKeyword:
    return true;
  case KindIdentifier:
    return Checker_getResolvedSymbol(receiver, expr) === receiver!.undefinedSymbol;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeForBindingElement","kind":"method","status":"implemented","sigHash":"7d0f76436680b32d9724bf33ba043041daa072d326390f08076c83d33dff6b9a"}
 *
 * Go source:
 * func (c *Checker) getTypeForBindingElement(declaration *ast.Node) *Type {
 * 	checkMode := core.IfElse(hasDotDotDotToken(declaration), CheckModeRestBindingElement, CheckModeNormal)
 * 	parentType := c.getTypeForBindingElementParent(declaration.Parent.Parent, checkMode)
 * 	if parentType != nil {
 * 		return c.getBindingElementTypeFromParentType(declaration, parentType, false /*noTupleBoundsCheck* /)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getTypeForBindingElement(receiver: GoPtr<Checker>, declaration: GoPtr<Node>): GoPtr<Type> {
  const checkMode = core.IfElse(hasDotDotDotToken(declaration), CheckModeRestBindingElement, CheckModeNormal);
  const parentType = Checker_getTypeForBindingElementParent(receiver, declaration!.Parent!.Parent, checkMode);
  if (parentType !== undefined) {
    return Checker_getBindingElementTypeFromParentType(receiver, declaration, parentType, false);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeForBindingElementParent","kind":"method","status":"implemented","sigHash":"6311cda56a1179cb34c998939966ba9254535d22f86fb23ec1c651790750034a"}
 *
 * Go source:
 * func (c *Checker) getTypeForBindingElementParent(node *ast.Node, checkMode CheckMode) *Type {
 * 	if checkMode == CheckModeNormal {
 * 		// We can use a cached resolved type if no optionality was included in that type.
 * 		if symbol := c.getSymbolOfDeclaration(node); symbol != nil {
 * 			if resolvedType := c.valueSymbolLinks.Get(symbol).resolvedType; resolvedType != nil && !(c.strictNullChecks && isOptionalDeclaration(node)) {
 * 				return resolvedType
 * 			}
 * 		}
 * 	}
 * 	return c.getTypeForVariableLikeDeclaration(node, false /*includeOptionality* /, checkMode)
 * }
 */
export function Checker_getTypeForBindingElementParent(receiver: GoPtr<Checker>, node: GoPtr<Node>, checkMode: CheckMode): GoPtr<Type> {
  if (checkMode === CheckModeNormal) {
    const symbol_ = Checker_getSymbolOfDeclaration(receiver, node);
    if (symbol_ !== undefined) {
      const resolvedType = LinkStore_Get(receiver!.valueSymbolLinks, symbol_, zeroValueSymbolLinks, goSymbolPointerKey)!.v.resolvedType;
      if (resolvedType !== undefined && !(receiver!.strictNullChecks && isOptionalDeclaration(node))) {
        return resolvedType;
      }
    }
  }
  return Checker_getTypeForVariableLikeDeclaration(receiver, node, false, checkMode);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBindingElementTypeFromParentType","kind":"method","status":"implemented","sigHash":"6318bb7feda94f2ff7ecf6c44819f98311da001475856836efef96787e7bcb2c"}
 *
 * Go source:
 * func (c *Checker) getBindingElementTypeFromParentType(declaration *ast.Node, parentType *Type, noTupleBoundsCheck bool) *Type {
 * 	// If an any type was inferred for parent, infer that for the binding element
 * 	if IsTypeAny(parentType) {
 * 		return parentType
 * 	}
 * 	pattern := declaration.Parent
 * 	// Relax null check on ambient destructuring parameters, since the parameters have no implementation and are just documentation
 * 	if c.strictNullChecks && declaration.Flags&ast.NodeFlagsAmbient != 0 && ast.IsPartOfParameterDeclaration(declaration) {
 * 		parentType = c.GetNonNullableType(parentType)
 * 	} else if c.strictNullChecks && pattern.Parent.Initializer() != nil && !c.hasTypeFacts(c.getTypeOfInitializer(pattern.Parent.Initializer()), TypeFactsEQUndefined) {
 * 		parentType = c.getTypeWithFacts(parentType, TypeFactsNEUndefined)
 * 	}
 * 	accessFlags := AccessFlagsExpressionPosition | core.IfElse(noTupleBoundsCheck || c.hasDefaultValue(declaration), AccessFlagsAllowMissing, 0)
 * 	var t *Type
 * 	switch pattern.Kind {
 * 	case ast.KindObjectBindingPattern:
 * 		if hasDotDotDotToken(declaration) {
 * 			parentType = c.getReducedType(parentType)
 * 			if parentType.flags&TypeFlagsUnknown != 0 || !c.isValidSpreadType(parentType) {
 * 				c.error(declaration, diagnostics.Rest_types_may_only_be_created_from_object_types)
 * 				return c.errorType
 * 			}
 * 			elements := pattern.Elements()
 * 			literalMembers := make([]*ast.Node, 0, len(elements))
 * 			for _, element := range elements {
 * 				if !hasDotDotDotToken(element) {
 * 					name := element.PropertyNameOrName()
 * 					literalMembers = append(literalMembers, name)
 * 				}
 * 			}
 * 			t = c.getRestType(parentType, literalMembers, declaration.Symbol())
 * 		} else {
 * 			// Use explicitly specified property name ({ p: xxx } form), or otherwise the implied name ({ p } form)
 * 			name := declaration.PropertyNameOrName()
 * 			indexType := c.getLiteralTypeFromPropertyName(name)
 * 			declaredType := c.getIndexedAccessTypeEx(parentType, indexType, accessFlags, name, nil)
 * 			t = c.getFlowTypeOfDestructuring(declaration, declaredType)
 * 		}
 * 	case ast.KindArrayBindingPattern:
 * 		// This elementType will be used if the specific property corresponding to this index is not
 * 		// present (aka the tuple element property). This call also checks that the parentType is in
 * 		// fact an iterable or array (depending on target language).
 * 		elementType := c.checkIteratedTypeOrElementType(IterationUseDestructuring|core.IfElse(hasDotDotDotToken(declaration), 0, IterationUsePossiblyOutOfBounds), parentType, c.undefinedType, pattern)
 * 		index := slices.Index(pattern.Elements(), declaration)
 * 		if hasDotDotDotToken(declaration) {
 * 			// If the parent is a tuple type, the rest element has a tuple type of the
 * 			// remaining tuple element types. Otherwise, the rest element has an array type with same
 * 			// element type as the parent type.
 * 			baseConstraint := c.mapType(parentType, func(t *Type) *Type {
 * 				if t.flags&TypeFlagsInstantiableNonPrimitive != 0 {
 * 					return c.getBaseConstraintOrType(t)
 * 				}
 * 				return t
 * 			})
 * 			if everyType(baseConstraint, isTupleType) {
 * 				t = c.mapType(baseConstraint, func(t *Type) *Type {
 * 					return c.sliceTupleType(t, index, 0)
 * 				})
 * 			} else {
 * 				t = c.createArrayType(elementType)
 * 			}
 * 		} else if c.isArrayLikeType(parentType) {
 * 			indexType := c.getNumberLiteralType(jsnum.Number(index))
 * 			declaredType := core.OrElse(c.getIndexedAccessTypeOrUndefined(parentType, indexType, accessFlags, declaration.Name(), nil), c.errorType)
 * 			t = c.getFlowTypeOfDestructuring(declaration, declaredType)
 * 		} else {
 * 			t = elementType
 * 		}
 * 	default:
 * 		panic("Unhandled case in getBindingElementTypeFromParentType")
 * 	}
 * 	if declaration.Initializer() == nil {
 * 		return t
 * 	}
 * 	if ast.WalkUpBindingElementsAndPatterns(declaration).Type() != nil {
 * 		// In strict null checking mode, if a default value of a non-undefined type is specified, remove
 * 		// undefined from the final type.
 * 		if c.strictNullChecks && !c.hasTypeFacts(c.checkDeclarationInitializer(declaration, CheckModeNormal, nil), TypeFactsIsUndefined) {
 * 			return c.getNonUndefinedType(t)
 * 		}
 * 		return t
 * 	}
 * 	return c.widenTypeInferredFromInitializer(declaration, c.getUnionTypeEx([]*Type{c.getNonUndefinedType(t), c.checkDeclarationInitializer(declaration, CheckModeNormal, nil)}, UnionReductionSubtype, nil, nil))
 * }
 */
export function Checker_getBindingElementTypeFromParentType(receiver: GoPtr<Checker>, declaration: GoPtr<Node>, parentType: GoPtr<Type>, noTupleBoundsCheck: bool): GoPtr<Type> {
  if (IsTypeAny(parentType)) {
    return parentType;
  }
  const pattern = declaration!.Parent;
  if (receiver!.strictNullChecks && (declaration!.Flags & NodeFlagsAmbient) !== 0 && IsPartOfParameterDeclaration(declaration)) {
    parentType = Checker_GetNonNullableType(receiver, parentType);
  } else if (receiver!.strictNullChecks && Node_Initializer(pattern!.Parent) !== undefined && !Checker_hasTypeFacts(receiver, Checker_getTypeOfInitializer(receiver, Node_Initializer(pattern!.Parent)), TypeFactsEQUndefined)) {
    parentType = Checker_getTypeWithFacts(receiver, parentType, TypeFactsNEUndefined);
  }
  const accessFlags = (AccessFlagsExpressionPosition | (noTupleBoundsCheck || Checker_hasDefaultValue(receiver, declaration) ? AccessFlagsAllowMissing : 0)) as AccessFlags;
  let t: GoPtr<Type>;
  if (IsObjectBindingPattern(pattern)) {
    if (hasDotDotDotToken(declaration)) {
      parentType = Checker_getReducedType(receiver, parentType);
      if ((parentType!.flags & TypeFlagsUnknown) !== 0 || !Checker_isValidSpreadType(receiver, parentType)) {
        Checker_error(receiver, declaration, diagnosticsMessages.Rest_types_may_only_be_created_from_object_types, undefined);
        return receiver!.errorType;
      }
      const elements = Node_Elements(pattern) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
      let literalMembers: GoSlice<GoPtr<Node>> = GoSliceMake(0, 0, GoPointerValueOps<Node>());
      for (const element of elements) {
        if (!hasDotDotDotToken(element)) {
          literalMembers = GoSliceAppend(literalMembers, Node_PropertyNameOrName(element), GoPointerValueOps<Node>());
        }
      }
      t = Checker_getRestType(receiver, parentType, literalMembers, Node_Symbol(declaration));
    } else {
      const name = Node_PropertyNameOrName(declaration);
      const indexType = Checker_getLiteralTypeFromPropertyName(receiver, name);
      const declaredType = Checker_getIndexedAccessTypeEx(receiver, parentType, indexType, accessFlags, name, undefined);
      t = Checker_getFlowTypeOfDestructuring(receiver, declaration, declaredType);
    }
  } else if (IsArrayBindingPattern(pattern)) {
    const elementType = Checker_checkIteratedTypeOrElementType(
      receiver,
      (IterationUseDestructuring | (hasDotDotDotToken(declaration) ? 0 : IterationUsePossiblyOutOfBounds)) as IterationUse,
      parentType,
      receiver!.undefinedType,
      pattern,
    );
    const index = slices.Index(Node_Elements(pattern) ?? [], declaration, GoEqualStrict<GoPtr<Node>>);
    if (hasDotDotDotToken(declaration)) {
      const baseConstraint = Checker_mapType(receiver, parentType, (type_: GoPtr<Type>): GoPtr<Type> => {
        if ((type_!.flags & TypeFlagsInstantiableNonPrimitive) !== 0) {
          return Checker_getBaseConstraintOrType(receiver, type_);
        }
        return type_;
      });
      if (everyType(baseConstraint, isTupleType)) {
        t = Checker_mapType(receiver, baseConstraint, (type_: GoPtr<Type>): GoPtr<Type> => Checker_sliceTupleType(receiver, type_, index, 0));
      } else {
        t = Checker_createArrayType(receiver, elementType);
      }
    } else if (Checker_isArrayLikeType(receiver, parentType)) {
      const indexType = Checker_getNumberLiteralType(receiver, index as Number);
      const declaredType = core.OrElse(Checker_getIndexedAccessTypeOrUndefined(receiver, parentType, indexType, accessFlags, Node_Name(declaration), undefined), receiver!.errorType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
      t = Checker_getFlowTypeOfDestructuring(receiver, declaration, declaredType);
    } else {
      t = elementType;
    }
  } else {
    throw new globalThis.Error("Unhandled case in getBindingElementTypeFromParentType");
  }
  if (Node_Initializer(declaration) === undefined) {
    return t;
  }
  if (Node_Type(WalkUpBindingElementsAndPatterns(declaration)) !== undefined) {
    if (receiver!.strictNullChecks && !Checker_hasTypeFacts(receiver, Checker_checkDeclarationInitializer(receiver, declaration, CheckModeNormal, undefined), TypeFactsIsUndefined)) {
      return Checker_getNonUndefinedType(receiver, t);
    }
    return t;
  }
  return Checker_widenTypeInferredFromInitializer(
    receiver,
    declaration,
    Checker_getUnionTypeEx(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, Checker_getNonUndefinedType(receiver, t), GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, Checker_checkDeclarationInitializer(receiver, declaration, CheckModeNormal, undefined), GoPointerValueOps<Type>());
    }), UnionReductionSubtype, undefined, undefined),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromBindingPattern","kind":"method","status":"implemented","sigHash":"e6a5c0ea531c6764363d4275888908721459173e196de7693c6dad9f433554f6"}
 *
 * Go source:
 * func (c *Checker) getTypeFromBindingPattern(pattern *ast.Node, includePatternInType bool, reportErrors bool) *Type {
 * 	if includePatternInType {
 * 		c.contextualBindingPatterns = append(c.contextualBindingPatterns, pattern)
 * 	}
 * 	var result *Type
 * 	if ast.IsObjectBindingPattern(pattern) {
 * 		result = c.getTypeFromObjectBindingPattern(pattern, includePatternInType, reportErrors)
 * 	} else {
 * 		result = c.getTypeFromArrayBindingPattern(pattern, includePatternInType, reportErrors)
 * 	}
 * 	if includePatternInType {
 * 		c.contextualBindingPatterns = c.contextualBindingPatterns[:len(c.contextualBindingPatterns)-1]
 * 	}
 * 	return result
 * }
 */
export function Checker_getTypeFromBindingPattern(receiver: GoPtr<Checker>, pattern: GoPtr<Node>, includePatternInType: bool, reportErrors: bool): GoPtr<Type> {
  if (includePatternInType) {
    receiver!.contextualBindingPatterns = GoSliceAppend(receiver!.contextualBindingPatterns, pattern, GoPointerValueOps<Node>());
  }
  const result = IsObjectBindingPattern(pattern)
    ? Checker_getTypeFromObjectBindingPattern(receiver, pattern, includePatternInType, reportErrors)
    : Checker_getTypeFromArrayBindingPattern(receiver, pattern, includePatternInType, reportErrors);
  if (includePatternInType) {
    receiver!.contextualBindingPatterns = GoSlicePrefix(receiver!.contextualBindingPatterns, receiver!.contextualBindingPatterns.length - 1);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromObjectBindingPattern","kind":"method","status":"implemented","sigHash":"fba3d0ff286005270c2724e3d93c2de4d4e236126758ed58b24100b1cbaf67f9"}
 *
 * Go source:
 * func (c *Checker) getTypeFromObjectBindingPattern(pattern *ast.Node, includePatternInType bool, reportErrors bool) *Type {
 * 	members := make(ast.SymbolTable)
 * 	var stringIndexInfo *IndexInfo
 * 	objectFlags := ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral
 * 	for _, e := range pattern.Elements() {
 * 		name := e.PropertyNameOrName()
 * 		if hasDotDotDotToken(e) {
 * 			stringIndexInfo = c.newIndexInfo(c.stringType, c.anyType, false /*isReadonly* /, nil, nil)
 * 			continue
 * 		}
 * 		exprType := c.getLiteralTypeFromPropertyName(name)
 * 		if !isTypeUsableAsPropertyName(exprType) {
 * 			// do not include computed properties in the implied type
 * 			objectFlags |= ObjectFlagsObjectLiteralPatternWithComputedProperties
 * 			continue
 * 		}
 * 		text := getPropertyNameFromType(exprType)
 * 		flags := ast.SymbolFlagsProperty | core.IfElse(e.Initializer() != nil, ast.SymbolFlagsOptional, 0)
 * 		symbol := c.newSymbol(flags, text)
 * 		c.valueSymbolLinks.Get(symbol).resolvedType = c.getTypeFromBindingElement(e, includePatternInType, reportErrors)
 * 		members[symbol.Name] = symbol
 * 	}
 * 	var indexInfos []*IndexInfo
 * 	if stringIndexInfo != nil {
 * 		indexInfos = []*IndexInfo{stringIndexInfo}
 * 	}
 * 	result := c.newAnonymousType(nil, members, nil, nil, indexInfos)
 * 	result.objectFlags |= objectFlags
 * 	if includePatternInType {
 * 		c.patternForType[result] = pattern
 * 		result.objectFlags |= ObjectFlagsContainsObjectOrArrayLiteral
 * 	}
 * 	return result
 * }
 */
export function Checker_getTypeFromObjectBindingPattern(receiver: GoPtr<Checker>, pattern: GoPtr<Node>, includePatternInType: bool, reportErrors: bool): GoPtr<Type> {
  const members: SymbolTable = new globalThis.Map<string, GoPtr<Symbol>>();
  let stringIndexInfo: GoPtr<IndexInfo>;
  let objectFlags = (ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral) as ObjectFlags;
  for (const e of Node_Elements(pattern) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    const name = Node_PropertyNameOrName(e);
    if (hasDotDotDotToken(e)) {
      stringIndexInfo = Checker_newIndexInfo(receiver, receiver!.stringType, receiver!.anyType, false, undefined, GoNilSlice());
      continue;
    }
    const exprType = Checker_getLiteralTypeFromPropertyName(receiver, name);
    if (!isTypeUsableAsPropertyName(exprType)) {
      objectFlags = (objectFlags | ObjectFlagsObjectLiteralPatternWithComputedProperties) as ObjectFlags;
      continue;
    }
    const text = getPropertyNameFromType(exprType);
    const flags = (SymbolFlagsProperty | (Node_Initializer(e) !== undefined ? SymbolFlagsOptional : 0)) as SymbolFlags;
    const symbol = Checker_newSymbol(receiver, flags, text);
    LinkStore_Get(receiver!.valueSymbolLinks, symbol, zeroValueSymbolLinks, goSymbolPointerKey)!.v.resolvedType = Checker_getTypeFromBindingElement(receiver, e, includePatternInType, reportErrors);
    members.set(symbol!.Name, symbol);
  }
  const indexInfos = stringIndexInfo !== undefined ? [stringIndexInfo] : GoNilSlice<GoPtr<IndexInfo>>();
  const result = Checker_newAnonymousType(receiver, undefined, members, GoNilSlice(), GoNilSlice(), indexInfos);
  result!.objectFlags = (result!.objectFlags | objectFlags) as ObjectFlags;
  if (includePatternInType) {
    receiver!.patternForType.set(result, pattern);
    result!.objectFlags = (result!.objectFlags | ObjectFlagsContainsObjectOrArrayLiteral) as ObjectFlags;
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromArrayBindingPattern","kind":"method","status":"implemented","sigHash":"3cf31ea62cf547000eaeca4bce8b0490647eee9b038e165bbe151f752ebca3cf"}
 *
 * Go source:
 * func (c *Checker) getTypeFromArrayBindingPattern(pattern *ast.Node, includePatternInType bool, reportErrors bool) *Type {
 * 	elements := pattern.Elements()
 * 	lastElement := core.LastOrNil(elements)
 * 	var restElement *ast.Node
 * 	if lastElement != nil && ast.IsBindingElement(lastElement) && hasDotDotDotToken(lastElement) {
 * 		restElement = lastElement
 * 	}
 * 	if len(elements) == 0 || len(elements) == 1 && restElement != nil {
 * 		// TODO: remove ScriptTargetES2015
 * 		if c.languageVersion >= core.ScriptTargetES2015 {
 * 			return c.createIterableType(c.anyType)
 * 		}
 * 		return c.anyArrayType
 * 	}
 * 	minLength := core.FindLastIndex(elements, func(e *ast.Node) bool {
 * 		return !(e == restElement || e.Name() == nil || c.hasDefaultValue(e))
 * 	}) + 1
 * 	elementTypes := make([]*Type, len(elements))
 * 	elementInfos := make([]TupleElementInfo, len(elements))
 * 	for i, e := range elements {
 * 		var t *Type
 * 		if e.Name() == nil {
 * 			t = c.anyType
 * 		} else {
 * 			t = c.getTypeFromBindingElement(e, includePatternInType, reportErrors)
 * 		}
 * 		var flags ElementFlags
 * 		if e == restElement {
 * 			flags = ElementFlagsRest
 * 		} else if i >= minLength {
 * 			flags = ElementFlagsOptional
 * 		} else {
 * 			flags = ElementFlagsRequired
 * 		}
 * 		elementTypes[i] = t
 * 		elementInfos[i] = TupleElementInfo{flags: flags}
 * 	}
 * 	result := c.createTupleTypeEx(elementTypes, elementInfos, false)
 * 	if includePatternInType {
 * 		result = c.cloneTypeReference(result)
 * 		c.patternForType[result] = pattern
 * 		result.objectFlags |= ObjectFlagsContainsObjectOrArrayLiteral
 * 	}
 * 	return result
 * }
 */
export function Checker_getTypeFromArrayBindingPattern(receiver: GoPtr<Checker>, pattern: GoPtr<Node>, includePatternInType: bool, reportErrors: bool): GoPtr<Type> {
  const elements = Node_Elements(pattern) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
  const lastElement = core.LastOrNil(elements, GoZeroPointer<Node>) as GoPtr<Node>;
  let restElement: GoPtr<Node>;
  if (lastElement !== undefined && IsBindingElement(lastElement) && hasDotDotDotToken(lastElement)) {
    restElement = lastElement;
  }
  if (elements.length === 0 || (elements.length === 1 && restElement !== undefined)) {
    if (receiver!.languageVersion >= ScriptTargetES2015) {
      return Checker_createIterableType(receiver, receiver!.anyType);
    }
    return receiver!.anyArrayType;
  }
  const minLength = core.FindLastIndex(elements, (e: GoPtr<Node>): bool =>
    !(e === restElement || Node_Name(e) === undefined || Checker_hasDefaultValue(receiver, e))
  ) + 1;
  const elementTypes: GoSlice<GoPtr<Type>> = new globalThis.Array<GoPtr<Type>>(elements.length);
  const elementInfos: GoSlice<TupleElementInfo> = new globalThis.Array<TupleElementInfo>(elements.length);
  for (let i = 0; i < elements.length; i++) {
    const e = GoSliceLoad(elements, i, GoPointerValueOps<Node>());
    let t: GoPtr<Type>;
    if (Node_Name(e) === undefined) {
      t = receiver!.anyType;
    } else {
      t = Checker_getTypeFromBindingElement(receiver, e, includePatternInType, reportErrors);
    }
    let flags: ElementFlags;
    if (e === restElement) {
      flags = ElementFlagsRest;
    } else if (i >= minLength) {
      flags = ElementFlagsOptionalFlag;
    } else {
      flags = ElementFlagsRequired;
    }
    GoSliceStore(elementTypes, i, t, GoPointerValueOps<Type>());
    elementInfos[i] = { flags, labeledDeclaration: undefined };
  }
  let result = Checker_createTupleTypeEx(receiver, elementTypes, elementInfos, false);
  if (includePatternInType) {
    result = Checker_cloneTypeReference(receiver, result);
    receiver!.patternForType.set(result, pattern);
    result!.objectFlags = (result!.objectFlags | ObjectFlagsContainsObjectOrArrayLiteral) as ObjectFlags;
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromBindingElement","kind":"method","status":"implemented","sigHash":"11a0e13382c16fdb179e86474fdeb420502aa63c70286d11581b2dc3406f89b5"}
 *
 * Go source:
 * func (c *Checker) getTypeFromBindingElement(element *ast.Node, includePatternInType bool, reportErrors bool) *Type {
 * 	if element.Initializer() != nil {
 * 		// The type implied by a binding pattern is independent of context, so we check the initializer with no
 * 		// contextual type or, if the element itself is a binding pattern, with the type implied by that binding
 * 		// pattern.
 * 		contextualType := c.unknownType
 * 		if ast.IsBindingPattern(element.Name()) {
 * 			contextualType = c.getTypeFromBindingPattern(element.Name(), true /*includePatternInType* /, false /*reportErrors* /)
 * 		}
 * 		return c.addOptionality(c.getWidenedLiteralTypeForInitializer(element, c.checkDeclarationInitializer(element, CheckModeNormal, contextualType)))
 * 	}
 * 	if ast.IsBindingPattern(element.Name()) {
 * 		return c.getTypeFromBindingPattern(element.Name(), includePatternInType, reportErrors)
 * 	}
 * 	if reportErrors && !c.declarationBelongsToPrivateAmbientMember(element) {
 * 		c.reportImplicitAny(element, c.anyType, WideningKindNormal)
 * 	}
 * 	// When we're including the pattern in the type (an indication we're obtaining a contextual type), we
 * 	// use a non-inferrable any type. Inference will never directly infer this type, but it is possible
 * 	// to infer a type that contains it, e.g. for a binding pattern like [foo] or { foo }. In such cases,
 * 	// widening of the binding pattern type substitutes a regular any for the non-inferrable any.
 * 	if includePatternInType {
 * 		return c.nonInferrableAnyType
 * 	}
 * 	return c.anyType
 * }
 */
export function Checker_getTypeFromBindingElement(receiver: GoPtr<Checker>, element: GoPtr<Node>, includePatternInType: bool, reportErrors: bool): GoPtr<Type> {
  if (Node_Initializer(element) !== undefined) {
    let contextualType = receiver!.unknownType;
    if (IsBindingPattern(Node_Name(element))) {
      contextualType = Checker_getTypeFromBindingPattern(receiver, Node_Name(element), true, false);
    }
    return Checker_addOptionality(receiver, Checker_getWidenedLiteralTypeForInitializer(receiver, element, Checker_checkDeclarationInitializer(receiver, element, CheckModeNormal, contextualType)));
  }
  if (IsBindingPattern(Node_Name(element))) {
    return Checker_getTypeFromBindingPattern(receiver, Node_Name(element), includePatternInType, reportErrors);
  }
  if (reportErrors && !Checker_declarationBelongsToPrivateAmbientMember(receiver, element)) {
    Checker_reportImplicitAny(receiver, element, receiver!.anyType, WideningKindNormal);
  }
  if (includePatternInType) {
    return receiver!.nonInferrableAnyType;
  }
  return receiver!.anyType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.reportImplicitAny","kind":"method","status":"implemented","sigHash":"d5de7d655b5f014b1fa4d75db4fa04901bf7c41b6de0db070ba9306fef274c0e"}
 *
 * Go source:
 * func (c *Checker) reportImplicitAny(declaration *ast.Node, t *Type, wideningKind WideningKind) {
 * 	if ast.IsInJSFile(declaration) && !ast.IsCheckJSEnabledForFile(ast.GetSourceFileOfNode(declaration), c.compilerOptions) {
 * 		// Only report implicit any errors/suggestions in TS and ts-check JS files
 * 		return
 * 	}
 * 	typeAsString := c.TypeToString(c.getWidenedType(t))
 * 	var diagnostic *diagnostics.Message
 * 	switch declaration.Kind {
 * 	case ast.KindBinaryExpression, ast.KindPropertyDeclaration, ast.KindPropertySignature:
 * 		diagnostic = core.IfElse(c.noImplicitAny,
 * 			diagnostics.Member_0_implicitly_has_an_1_type,
 * 			diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage)
 * 	case ast.KindParameter:
 * 		param := declaration.AsParameterDeclaration()
 * 		if ast.IsIdentifier(param.Name()) {
 * 			name := param.Name().AsIdentifier()
 * 			originalKeywordKind := scanner.IdentifierToKeywordKind(name)
 * 			if (ast.IsCallSignatureDeclaration(declaration.Parent) || ast.IsMethodSignatureDeclaration(declaration.Parent) || ast.IsFunctionTypeNode(declaration.Parent)) &&
 * 				slices.Contains(declaration.Parent.Parameters(), declaration) &&
 * 				(ast.IsTypeNodeKind(originalKeywordKind) || c.resolveName(declaration, name.Text, ast.SymbolFlagsType, nil /*nameNotFoundMessage* /, true /*isUse* /, false /*excludeGlobals* /) != nil) {
 * 				newName := fmt.Sprintf("arg%v", slices.Index(declaration.Parent.Parameters(), declaration))
 * 				typeName := scanner.DeclarationNameToString(param.Name()) + core.IfElse(param.DotDotDotToken != nil, "[]", "")
 * 				c.errorOrSuggestion(c.noImplicitAny, declaration, diagnostics.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1, newName, typeName)
 * 				return
 * 			}
 * 		}
 * 		switch {
 * 		case param.DotDotDotToken != nil:
 * 			if c.noImplicitAny {
 * 				diagnostic = diagnostics.Rest_parameter_0_implicitly_has_an_any_type
 * 			} else {
 * 				diagnostic = diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage
 * 			}
 * 		case c.noImplicitAny:
 * 			diagnostic = diagnostics.Parameter_0_implicitly_has_an_1_type
 * 		default:
 * 			diagnostic = diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage
 * 		}
 * 	case ast.KindBindingElement:
 * 		diagnostic = diagnostics.Binding_element_0_implicitly_has_an_1_type
 * 		if !c.noImplicitAny {
 * 			// Don't issue a suggestion for binding elements since the codefix doesn't yet support them.
 * 			return
 * 		}
 * 	case ast.KindFunctionDeclaration, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindGetAccessor,
 * 		ast.KindSetAccessor, ast.KindFunctionExpression, ast.KindArrowFunction:
 * 		if c.noImplicitAny && declaration.Name() == nil {
 * 			if wideningKind == WideningKindGeneratorYield {
 * 				c.error(declaration, diagnostics.Generator_implicitly_has_yield_type_0_Consider_supplying_a_return_type_annotation, typeAsString)
 * 			} else {
 * 				c.error(declaration, diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString)
 * 			}
 * 			return
 * 		}
 * 		switch {
 * 		case !c.noImplicitAny:
 * 			diagnostic = diagnostics.X_0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage
 * 		case declaration.Flags&ast.NodeFlagsReparsed != 0:
 * 			c.error(declaration, diagnostics.This_overload_implicitly_returns_the_type_0_because_it_lacks_a_return_type_annotation, typeAsString)
 * 			return
 * 		case wideningKind == WideningKindGeneratorYield:
 * 			diagnostic = diagnostics.X_0_which_lacks_return_type_annotation_implicitly_has_an_1_yield_type
 * 		default:
 * 			diagnostic = diagnostics.X_0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type
 * 		}
 * 	case ast.KindMappedType:
 * 		if c.noImplicitAny {
 * 			c.error(declaration, diagnostics.Mapped_object_type_implicitly_has_an_any_template_type)
 * 		}
 * 		return
 * 	default:
 * 		if c.noImplicitAny {
 * 			diagnostic = diagnostics.Variable_0_implicitly_has_an_1_type
 * 		} else {
 * 			diagnostic = diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage
 * 		}
 * 	}
 * 	c.errorOrSuggestion(c.noImplicitAny, declaration, diagnostic, scanner.DeclarationNameToString(ast.GetNameOfDeclaration(declaration)), typeAsString)
 * }
 */
export function Checker_reportImplicitAny(receiver: GoPtr<Checker>, declaration: GoPtr<Node>, t: GoPtr<Type>, wideningKind: WideningKind): void {
  if (IsInJSFile(declaration) && !IsCheckJSEnabledForFile(GetSourceFileOfNode(declaration), receiver!.compilerOptions)) {
    return;
  }
  const typeAsString = Checker_TypeToString(receiver, Checker_getWidenedType(receiver, t));
  let diagnostic: GoPtr<Message>;
  switch (declaration!.Kind) {
    case KindBinaryExpression:
    case KindPropertyDeclaration:
    case KindPropertySignature:
      diagnostic = core.IfElse(
        receiver!.noImplicitAny,
        diagnosticsMessages.Member_0_implicitly_has_an_1_type,
        diagnosticsMessages.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage,
      );
      break;
    case KindParameter: {
      const name = Node_Name(declaration);
      if (IsIdentifier(name)) {
        const originalKeywordKind = IdentifierToKeywordKind(AsIdentifier(name));
        const parameters = Node_Parameters(declaration!.Parent) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
        if (
          (IsCallSignatureDeclaration(declaration!.Parent) || IsMethodSignatureDeclaration(declaration!.Parent) || IsFunctionTypeNode(declaration!.Parent)) &&
          slices.Contains(parameters, declaration, GoEqualStrict<GoPtr<Node>>) &&
          (IsTypeNodeKind(originalKeywordKind) || receiver!.resolveName!(declaration, Node_Text(name), SymbolFlagsType, undefined, true, false) !== undefined)
        ) {
          const newName = `arg${slices.Index(parameters, declaration, GoEqualStrict<GoPtr<Node>>)}`;
          const typeName = DeclarationNameToString(name) + core.IfElse(hasDotDotDotToken(declaration), "[]", "");
          Checker_errorOrSuggestion(receiver, receiver!.noImplicitAny, declaration, diagnosticsMessages.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1, newName, typeName);
          return;
        }
      }
      if (hasDotDotDotToken(declaration)) {
        if (receiver!.noImplicitAny) {
          diagnostic = diagnosticsMessages.Rest_parameter_0_implicitly_has_an_any_type;
        } else {
          diagnostic = diagnosticsMessages.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage;
        }
      } else if (receiver!.noImplicitAny) {
        diagnostic = diagnosticsMessages.Parameter_0_implicitly_has_an_1_type;
      } else {
        diagnostic = diagnosticsMessages.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
      }
      break;
    }
    case KindBindingElement:
      diagnostic = diagnosticsMessages.Binding_element_0_implicitly_has_an_1_type;
      if (!receiver!.noImplicitAny) {
        return;
      }
      break;
    case KindFunctionDeclaration:
    case KindMethodDeclaration:
    case KindMethodSignature:
    case KindGetAccessor:
    case KindSetAccessor:
    case KindFunctionExpression:
    case KindArrowFunction:
      if (receiver!.noImplicitAny && Node_Name(declaration) === undefined) {
        if (wideningKind === WideningKindGeneratorYield) {
          Checker_error(receiver, declaration, diagnosticsMessages.Generator_implicitly_has_yield_type_0_Consider_supplying_a_return_type_annotation, typeAsString);
        } else {
          Checker_error(receiver, declaration, diagnosticsMessages.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
        }
        return;
      }
      if (!receiver!.noImplicitAny) {
        diagnostic = diagnosticsMessages.X_0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage;
      } else if ((declaration!.Flags & NodeFlagsReparsed) !== 0) {
        Checker_error(receiver, declaration, diagnosticsMessages.This_overload_implicitly_returns_the_type_0_because_it_lacks_a_return_type_annotation, typeAsString);
        return;
      } else if (wideningKind === WideningKindGeneratorYield) {
        diagnostic = diagnosticsMessages.X_0_which_lacks_return_type_annotation_implicitly_has_an_1_yield_type;
      } else {
        diagnostic = diagnosticsMessages.X_0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
      }
      break;
    case KindMappedType:
      if (receiver!.noImplicitAny) {
        Checker_error(receiver, declaration, diagnosticsMessages.Mapped_object_type_implicitly_has_an_any_template_type);
      }
      return;
    default:
      if (receiver!.noImplicitAny) {
        diagnostic = diagnosticsMessages.Variable_0_implicitly_has_an_1_type;
      } else {
        diagnostic = diagnosticsMessages.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
      }
      break;
  }
  Checker_errorOrSuggestion(receiver, receiver!.noImplicitAny, declaration, diagnostic, DeclarationNameToString(GetNameOfDeclaration(declaration)), typeAsString);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getWidenedType","kind":"method","status":"implemented","sigHash":"925749633a4ddbbc85e1e366bb3405c31acd970008590a4c4ea835ea139c6234"}
 *
 * Go source:
 * func (c *Checker) getWidenedType(t *Type) *Type {
 * 	return c.getWidenedTypeWithContext(t, nil /*context* /)
 * }
 */
export function Checker_getWidenedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getWidenedTypeWithContext(receiver, t, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getWidenedTypeWithContext","kind":"method","status":"implemented","sigHash":"d9671a5db99e2d4c83ad222c39d4de9cada0de0ad89136c8a25112a87933414b"}
 *
 * Go source:
 * func (c *Checker) getWidenedTypeWithContext(t *Type, context *WideningContext) *Type {
 * 	if t.objectFlags&ObjectFlagsRequiresWidening != 0 {
 * 		if context == nil {
 * 			if cached := c.cachedTypes[CachedTypeKey{kind: CachedTypeKindWidened, typeId: t.id}]; cached != nil {
 * 				return cached
 * 			}
 * 		}
 * 		var result *Type
 * 		switch {
 * 		case t.flags&(TypeFlagsAny|TypeFlagsNullable) != 0:
 * 			result = c.anyType
 * 		case isObjectLiteralType(t):
 * 			result = c.getWidenedTypeOfObjectLiteral(t, context)
 * 		case t.flags&TypeFlagsUnion != 0:
 * 			unionContext := context
 * 			if unionContext == nil {
 * 				unionContext = &WideningContext{siblings: t.Types()}
 * 			}
 * 			widenedTypes := core.SameMap(t.Types(), func(t *Type) *Type {
 * 				if t.flags&TypeFlagsNullable != 0 {
 * 					return t
 * 				}
 * 				return c.getWidenedTypeWithContext(t, unionContext)
 * 			})
 * 			// Widening an empty object literal transitions from a highly restrictive type to
 * 			// a highly inclusive one. For that reason we perform subtype reduction here if the
 * 			// union includes empty object types (e.g. reducing {} | string to just {}).
 * 			result = c.getUnionTypeEx(widenedTypes, core.IfElse(core.Some(widenedTypes, c.isEmptyObjectType), UnionReductionSubtype, UnionReductionLiteral), nil, nil)
 * 		case t.flags&TypeFlagsIntersection != 0:
 * 			result = c.getIntersectionType(core.SameMap(t.Types(), c.getWidenedType))
 * 		case c.isArrayOrTupleType(t):
 * 			result = c.createTypeReference(t.Target(), core.SameMap(c.getTypeArguments(t), c.getWidenedType))
 * 		}
 * 		if result != nil && context == nil {
 * 			c.cachedTypes[CachedTypeKey{kind: CachedTypeKindWidened, typeId: t.id}] = result
 * 		}
 * 		return core.OrElse(result, t)
 * 	}
 * 	return t
 * }
 */
export function Checker_getWidenedTypeWithContext(receiver: GoPtr<Checker>, t: GoPtr<Type>, context: GoPtr<WideningContext>): GoPtr<Type> {
  if ((t!.objectFlags & ObjectFlagsRequiresWidening) !== 0) {
    if (context === undefined) {
      const cached = receiver!.cachedTypes.get({ kind: CachedTypeKindWidened, typeId: t!.id } as CachedTypeKey);
      if (cached !== undefined) {
        return cached;
      }
    }
    let result: GoPtr<Type>;
    if ((t!.flags & (TypeFlagsAny | TypeFlagsNullable)) !== 0) {
      result = receiver!.anyType;
    } else if (isObjectLiteralType(t)) {
      result = Checker_getWidenedTypeOfObjectLiteral(receiver, t, context);
    } else if ((t!.flags & TypeFlagsUnion) !== 0) {
      let unionContext = context;
      if (unionContext === undefined) {
        unionContext = {
          parent: undefined,
          propertyName: "",
          siblings: Type_Types(t),
          resolvedProperties: GoNilSlice(),
          childContexts: GoNilMap(),
          widenedTypes: GoNilMap(),
        };
      }
      const widenedTypes = core.SameMap(Type_Types(t) ?? GoSliceMake(0, 0, GoPointerValueOps<Type>()), (type_: GoPtr<Type>): GoPtr<Type> => {
        if ((type_!.flags & TypeFlagsNullable) !== 0) {
          return type_;
        }
        return Checker_getWidenedTypeWithContext(receiver, type_, unionContext);
      }, GoEqualStrict<GoPtr<Type>>);
      result = Checker_getUnionTypeEx(
        receiver,
        widenedTypes,
        core.Some(widenedTypes, (type_: GoPtr<Type>): bool => Checker_isEmptyObjectType(receiver, type_)) ? UnionReductionSubtype : UnionReductionLiteral,
        undefined,
        undefined,
      );
    } else if ((t!.flags & TypeFlagsIntersection) !== 0) {
      result = Checker_getIntersectionType(receiver, core.SameMap(Type_Types(t) ?? GoSliceMake(0, 0, GoPointerValueOps<Type>()), (type_: GoPtr<Type>): GoPtr<Type> => Checker_getWidenedType(receiver, type_), GoEqualStrict<GoPtr<Type>>));
    } else if (Checker_isArrayOrTupleType(receiver, t)) {
      result = Checker_createTypeReference(receiver, Type_Target(t), core.SameMap(Checker_getTypeArguments(receiver, t), (type_: GoPtr<Type>): GoPtr<Type> => Checker_getWidenedType(receiver, type_), GoEqualStrict<GoPtr<Type>>));
    }
    if (result !== undefined && context === undefined) {
      receiver!.cachedTypes.set({ kind: CachedTypeKindWidened, typeId: t!.id } as CachedTypeKey, result);
    }
    return core.OrElse(result, t, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getWidenedTypeOfObjectLiteral","kind":"method","status":"implemented","sigHash":"163fdd0db7ac9e847f751cdde45ad5320063756fa71f541b20d428778db60e5e"}
 *
 * Go source:
 * func (c *Checker) getWidenedTypeOfObjectLiteral(t *Type, context *WideningContext) *Type {
 * 	if context != nil {
 * 		if cached := context.widenedTypes[t]; cached != nil {
 * 			return cached
 * 		}
 * 	}
 * 	members := make(ast.SymbolTable)
 * 	for _, prop := range c.getPropertiesOfObjectType(t) {
 * 		members[prop.Name] = c.getWidenedProperty(prop, context)
 * 	}
 * 	if context != nil {
 * 		for _, prop := range c.getPropertiesOfContext(context) {
 * 			if _, ok := members[prop.Name]; !ok {
 * 				members[prop.Name] = c.getUndefinedProperty(prop)
 * 			}
 * 		}
 * 	}
 * 	result := c.newAnonymousType(t.symbol, members, nil, nil, core.SameMap(c.getIndexInfosOfType(t), func(info *IndexInfo) *IndexInfo {
 * 		return c.newIndexInfo(info.keyType, c.getWidenedType(info.valueType), info.isReadonly, info.declaration, info.components)
 * 	}))
 * 	// Retain js literal flag through widening
 * 	result.objectFlags |= t.objectFlags & (ObjectFlagsJSLiteral | ObjectFlagsNonInferrableType)
 * 	// Only cache in child contexts since the root context never widens a particular object literal type more than once
 * 	if context != nil && context.parent != nil {
 * 		if context.widenedTypes == nil {
 * 			context.widenedTypes = make(map[*Type]*Type)
 * 		}
 * 		context.widenedTypes[t] = result
 * 	}
 * 	return result
 * }
 */
export function Checker_getWidenedTypeOfObjectLiteral(receiver: GoPtr<Checker>, t: GoPtr<Type>, context: GoPtr<WideningContext>): GoPtr<Type> {
  if (context !== undefined) {
    const cached = context!.widenedTypes.get(t);
    if (cached !== undefined) {
      return cached;
    }
  }
  const members: SymbolTable = new globalThis.Map<string, GoPtr<Symbol>>();
  for (const prop of Checker_getPropertiesOfObjectType(receiver, t)) {
    members.set(prop!.Name, Checker_getWidenedProperty(receiver, prop, context));
  }
  if (context !== undefined) {
    for (const prop of Checker_getPropertiesOfContext(receiver, context)) {
      if (!members.has(prop!.Name)) {
        members.set(prop!.Name, Checker_getUndefinedProperty(receiver, prop));
      }
    }
  }
  const result = Checker_newAnonymousType(
    receiver,
    t!["symbol"],
    members,
    GoSliceMake(0, 0, GoPointerValueOps<Signature>()),
    GoSliceMake(0, 0, GoPointerValueOps<Signature>()),
    core.SameMap(Checker_getIndexInfosOfType(receiver, t), (info: GoPtr<IndexInfo>): GoPtr<IndexInfo> => Checker_newIndexInfo(receiver, info!.keyType, Checker_getWidenedType(receiver, info!.valueType), info!.isReadonly, info!.declaration, info!.components), GoEqualStrict<GoPtr<IndexInfo>>),
  );
  result!.objectFlags = (result!.objectFlags | (t!.objectFlags & (ObjectFlagsJSLiteral | ObjectFlagsNonInferrableType))) as ObjectFlags;
  if (context !== undefined && context!.parent !== undefined) {
    if (GoMapIsNil(context!.widenedTypes)) {
      context!.widenedTypes = new Map<GoPtr<Type>, GoPtr<Type>>();
    }
    context!.widenedTypes.set(t, result);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::WideningContext.getChildContext","kind":"method","status":"implemented","sigHash":"fd2e7196baeafbcc522923760e1a2a9a439700f5b2f3926a96e84abf8082082d"}
 *
 * Go source:
 * func (w *WideningContext) getChildContext(propertyName string) *WideningContext {
 * 	if cached := w.childContexts[propertyName]; cached != nil {
 * 		return cached
 * 	}
 * 	result := &WideningContext{parent: w, propertyName: propertyName}
 * 	if w.childContexts == nil {
 * 		w.childContexts = make(map[string]*WideningContext)
 * 	}
 * 	w.childContexts[propertyName] = result
 * 	return result
 * }
 */
export function WideningContext_getChildContext(receiver: GoPtr<WideningContext>, propertyName: string): GoPtr<WideningContext> {
  const cached = receiver!.childContexts.get(propertyName);
  if (cached !== undefined) {
    return cached;
  }
  const result: GoPtr<WideningContext> = {
    parent: receiver,
    propertyName,
    siblings: GoNilSlice(),
    resolvedProperties: GoNilSlice(),
    childContexts: GoNilMap(),
    widenedTypes: GoNilMap(),
  };
  if (GoMapIsNil(receiver!.childContexts)) {
    receiver!.childContexts = new Map<string, GoPtr<WideningContext>>();
  }
  receiver!.childContexts.set(propertyName, result);
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeOfAccessors","kind":"method","status":"implemented","sigHash":"01894976e9858c0ad8442578d176dddc85d5aadea9acef4b84d93f2ac59b9f5d"}
 *
 * Go source:
 * func (c *Checker) getTypeOfAccessors(symbol *ast.Symbol) *Type {
 * 	links := c.valueSymbolLinks.Get(symbol)
 * 	if links.resolvedType == nil {
 * 		if !c.pushTypeResolution(symbol, TypeSystemPropertyNameType) {
 * 			return c.errorType
 * 		}
 * 		getter := ast.GetDeclarationOfKind(symbol, ast.KindGetAccessor)
 * 		setter := ast.GetDeclarationOfKind(symbol, ast.KindSetAccessor)
 * 		accessor := core.Find(symbol.Declarations, ast.IsAutoAccessorPropertyDeclaration)
 * 		// We try to resolve a getter type annotation, a setter type annotation, or a getter function
 * 		// body return type inference, in that order.
 * 		t := c.getAnnotatedAccessorType(getter)
 * 		if t == nil {
 * 			t = c.getAnnotatedAccessorType(setter)
 * 		}
 * 		if t == nil {
 * 			t = c.getAnnotatedAccessorType(accessor)
 * 		}
 * 		if t == nil && getter != nil {
 * 			if body := getter.Body(); body != nil {
 * 				t = c.getReturnTypeFromBody(getter, CheckModeNormal)
 * 			}
 * 		}
 * 		if t == nil && accessor != nil {
 * 			t = c.getWidenedTypeForVariableLikeDeclaration(accessor, true /*reportErrors* /)
 * 		}
 * 		if t == nil {
 * 			if setter != nil && !isPrivateWithinAmbient(setter) {
 * 				c.errorOrSuggestion(c.noImplicitAny, setter, diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation, c.symbolToString(symbol))
 * 			} else if getter != nil && !isPrivateWithinAmbient(getter) {
 * 				c.errorOrSuggestion(c.noImplicitAny, getter, diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation, c.symbolToString(symbol))
 * 			} else if accessor != nil && !isPrivateWithinAmbient(accessor) {
 * 				c.errorOrSuggestion(c.noImplicitAny, accessor, diagnostics.Member_0_implicitly_has_an_1_type, c.symbolToString(symbol), "any")
 * 			}
 * 			t = c.anyType
 * 		}
 * 		if !c.popTypeResolution() {
 * 			if c.getAnnotatedAccessorTypeNode(getter) != nil {
 * 				c.error(getter, diagnostics.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, c.symbolToString(symbol))
 * 			} else if c.getAnnotatedAccessorTypeNode(setter) != nil {
 * 				c.error(setter, diagnostics.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, c.symbolToString(symbol))
 * 			} else if c.getAnnotatedAccessorTypeNode(accessor) != nil {
 * 				c.error(setter, diagnostics.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, c.symbolToString(symbol))
 * 			} else if getter != nil && c.noImplicitAny {
 * 				c.error(getter, diagnostics.X_0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, c.symbolToString(symbol))
 * 			}
 * 			t = c.anyType
 * 		}
 * 		if links.resolvedType == nil {
 * 			links.resolvedType = t
 * 		}
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeOfAccessors(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.valueSymbolLinks, symbol_, zeroValueSymbolLinks, goSymbolPointerKey)!.v;
  if (links!.resolvedType === undefined) {
    if (!Checker_pushTypeResolution(receiver, symbol_, TypeSystemPropertyNameType)) {
      return receiver!.errorType;
    }
    const getter = GetDeclarationOfKind(symbol_, KindGetAccessor);
    const setter = GetDeclarationOfKind(symbol_, KindSetAccessor);
    const accessor = core.Find(symbol_!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), IsAutoAccessorPropertyDeclaration, GoZeroPointer<Node>);
    let t = Checker_getAnnotatedAccessorType(receiver, getter);
    if (t === undefined) {
      t = Checker_getAnnotatedAccessorType(receiver, setter);
    }
    if (t === undefined) {
      t = Checker_getAnnotatedAccessorType(receiver, accessor);
    }
    if (t === undefined && getter !== undefined) {
      if (Node_Body(getter) !== undefined) {
        t = Checker_getReturnTypeFromBody(receiver, getter, CheckModeNormal);
      }
    }
    if (t === undefined && accessor !== undefined) {
      t = Checker_getWidenedTypeForVariableLikeDeclaration(receiver, accessor, true as bool);
    }
    if (t === undefined) {
      if (setter !== undefined && !isPrivateWithinAmbient(setter)) {
        Checker_errorOrSuggestion(receiver, receiver!.noImplicitAny, setter, diagnosticsMessages.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation, Checker_symbolToString(receiver, symbol_));
      } else if (getter !== undefined && !isPrivateWithinAmbient(getter)) {
        Checker_errorOrSuggestion(receiver, receiver!.noImplicitAny, getter, diagnosticsMessages.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation, Checker_symbolToString(receiver, symbol_));
      } else if (accessor !== undefined && !isPrivateWithinAmbient(accessor)) {
        Checker_errorOrSuggestion(receiver, receiver!.noImplicitAny, accessor, diagnosticsMessages.Member_0_implicitly_has_an_1_type, Checker_symbolToString(receiver, symbol_), "any");
      }
      t = receiver!.anyType;
    }
    if (!Checker_popTypeResolution(receiver)) {
      if (Checker_getAnnotatedAccessorTypeNode(receiver, getter) !== undefined) {
        Checker_error(receiver, getter, diagnosticsMessages.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, Checker_symbolToString(receiver, symbol_));
      } else if (Checker_getAnnotatedAccessorTypeNode(receiver, setter) !== undefined) {
        Checker_error(receiver, setter, diagnosticsMessages.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, Checker_symbolToString(receiver, symbol_));
      } else if (Checker_getAnnotatedAccessorTypeNode(receiver, accessor) !== undefined) {
        Checker_error(receiver, setter, diagnosticsMessages.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, Checker_symbolToString(receiver, symbol_));
      } else if (getter !== undefined && receiver!.noImplicitAny) {
        Checker_error(receiver, getter, diagnosticsMessages.X_0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, Checker_symbolToString(receiver, symbol_));
      }
      t = receiver!.anyType;
    }
    if (links!.resolvedType === undefined) {
      links!.resolvedType = t;
    }
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getWriteTypeOfAccessors","kind":"method","status":"implemented","sigHash":"1dbb0cd7afb2f2c0ac4235b8aeb7c2cf88530bb61f59aaa40fb1c1bb596629b6"}
 *
 * Go source:
 * func (c *Checker) getWriteTypeOfAccessors(symbol *ast.Symbol) *Type {
 * 	links := c.valueSymbolLinks.Get(symbol)
 * 	if links.writeType == nil {
 * 		if !c.pushTypeResolution(symbol, TypeSystemPropertyNameWriteType) {
 * 			return c.errorType
 * 		}
 * 		setter := ast.GetDeclarationOfKind(symbol, ast.KindSetAccessor)
 * 		if setter == nil {
 * 			propDeclaration := ast.GetDeclarationOfKind(symbol, ast.KindPropertyDeclaration)
 * 			if propDeclaration != nil && ast.IsAutoAccessorPropertyDeclaration(propDeclaration) {
 * 				setter = propDeclaration
 * 			}
 * 		}
 * 		writeType := c.getAnnotatedAccessorType(setter)
 * 		if !c.popTypeResolution() {
 * 			if c.getAnnotatedAccessorTypeNode(setter) != nil {
 * 				c.error(setter, diagnostics.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, c.symbolToString(symbol))
 * 			}
 * 			writeType = c.anyType
 * 		}
 * 		// Absent an explicit setter type annotation we use the read type of the accessor.
 * 		if links.writeType == nil {
 * 			if writeType != nil {
 * 				links.writeType = writeType
 * 			} else {
 * 				links.writeType = c.getTypeOfAccessors(symbol)
 * 			}
 * 		}
 * 	}
 * 	return links.writeType
 * }
 */
export function Checker_getWriteTypeOfAccessors(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.valueSymbolLinks, symbol_, zeroValueSymbolLinks, goSymbolPointerKey)!.v;
  if (links!.writeType === undefined) {
    if (!Checker_pushTypeResolution(receiver, symbol_, TypeSystemPropertyNameWriteType)) {
      return receiver!.errorType;
    }
    let setter = GetDeclarationOfKind(symbol_, KindSetAccessor);
    if (setter === undefined) {
      const propDeclaration = GetDeclarationOfKind(symbol_, KindPropertyDeclaration);
      if (propDeclaration !== undefined && IsAutoAccessorPropertyDeclaration(propDeclaration)) {
        setter = propDeclaration;
      }
    }
    let writeType = Checker_getAnnotatedAccessorType(receiver, setter);
    if (!Checker_popTypeResolution(receiver)) {
      if (Checker_getAnnotatedAccessorTypeNode(receiver, setter) !== undefined) {
        Checker_error(receiver, setter, diagnosticsMessages.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, Checker_symbolToString(receiver, symbol_));
      }
      writeType = receiver!.anyType;
    }
    if (links!.writeType === undefined) {
      if (writeType !== undefined) {
        links!.writeType = writeType;
      } else {
        links!.writeType = Checker_getTypeOfAccessors(receiver, symbol_);
      }
    }
  }
  return links!.writeType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getOptionalType","kind":"method","status":"implemented","sigHash":"3acdc606e46d0a45b0ee523360b20405646058c68d96ee5dc5942c6b5fac6623"}
 *
 * Go source:
 * func (c *Checker) getOptionalType(t *Type, isProperty bool) *Type {
 * 	debug.Assert(c.strictNullChecks)
 * 	missingOrUndefined := core.IfElse(isProperty, c.undefinedOrMissingType, c.undefinedType)
 * 	if t == missingOrUndefined || t.flags&TypeFlagsUnion != 0 && t.Types()[0] == missingOrUndefined {
 * 		return t
 * 	}
 * 	return c.getUnionType([]*Type{t, missingOrUndefined})
 * }
 */
export function Checker_getOptionalType(receiver: GoPtr<Checker>, t: GoPtr<Type>, isProperty: bool): GoPtr<Type> {
  const missingOrUndefined = core.IfElse(isProperty, receiver!.undefinedOrMissingType, receiver!.undefinedType);
  if (t === missingOrUndefined || ((t!.flags & TypeFlagsUnion) !== 0 && GoSliceLoad(Type_Types(t)!, 0, GoPointerValueOps<Type>()) === missingOrUndefined)) {
    return t;
  }
  return Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, t, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, missingOrUndefined, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getNullableType","kind":"method","status":"implemented","sigHash":"742e60237cbef158900ae78825f80af11bf32195744e825e39c1c5b76bcf311a"}
 *
 * Go source:
 * func (c *Checker) getNullableType(t *Type, flags TypeFlags) *Type {
 * 	missing := (flags & ^t.flags) & (TypeFlagsUndefined | TypeFlagsNull)
 * 	switch {
 * 	case missing == 0:
 * 		return t
 * 	case missing == TypeFlagsUndefined:
 * 		return c.getUnionType([]*Type{t, c.undefinedType})
 * 	case missing == TypeFlagsNull:
 * 		return c.getUnionType([]*Type{t, c.nullType})
 * 	}
 * 	return c.getUnionType([]*Type{t, c.undefinedType, c.nullType})
 * }
 */
export function Checker_getNullableType(receiver: GoPtr<Checker>, t: GoPtr<Type>, flags: TypeFlags): GoPtr<Type> {
  const missing = (flags & ~t!.flags) & (TypeFlagsUndefined | TypeFlagsNull);
  if (missing === 0) {
    return t;
  } else if (missing === TypeFlagsUndefined) {
    return Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, t, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, receiver!.undefinedType, GoPointerValueOps<Type>());
    }));
  } else if (missing === TypeFlagsNull) {
    return Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, t, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, receiver!.nullType, GoPointerValueOps<Type>());
    }));
  }
  return Checker_getUnionType(receiver, GoSliceBuild(3, 3, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, t, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, receiver!.undefinedType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 2, receiver!.nullType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.GetNonNullableType","kind":"method","status":"implemented","sigHash":"04d890282a23aa46fea9075830af6e473fcd2dca90aeea984ff5d4519e2019c5"}
 *
 * Go source:
 * func (c *Checker) GetNonNullableType(t *Type) *Type {
 * 	if c.strictNullChecks {
 * 		return c.getAdjustedTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
 * 	}
 * 	return t
 * }
 */
export function Checker_GetNonNullableType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (receiver!.strictNullChecks) {
    return Checker_getAdjustedTypeWithFacts(receiver, t, TypeFactsNEUndefinedOrNull);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.IsNullableType","kind":"method","status":"implemented","sigHash":"81ddab3f4308e3938de519079b80c28451043329de1ab9d03b5811222b50bdd2"}
 *
 * Go source:
 * func (c *Checker) IsNullableType(t *Type) bool {
 * 	return c.hasTypeFacts(t, TypeFactsIsUndefinedOrNull)
 * }
 */
export function Checker_IsNullableType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return Checker_hasTypeFacts(receiver, t, TypeFactsIsUndefinedOrNull);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getNonNullableTypeIfNeeded","kind":"method","status":"implemented","sigHash":"26d50749127c8315534011796d1337f8c51b2122ba8d899b07e061a55cbd77e4"}
 *
 * Go source:
 * func (c *Checker) getNonNullableTypeIfNeeded(t *Type) *Type {
 * 	if c.IsNullableType(t) {
 * 		return c.GetNonNullableType(t)
 * 	}
 * 	return t
 * }
 */
export function Checker_getNonNullableTypeIfNeeded(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (Checker_IsNullableType(receiver, t)) {
    return Checker_GetNonNullableType(receiver, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.pushTypeResolution","kind":"method","status":"implemented","sigHash":"2bb3b6c3080e8e113825117d1461b6ce8d93f16e4b48bdd32dcb6e183d21ba57"}
 *
 * Go source:
 * func (c *Checker) pushTypeResolution(target TypeSystemEntity, propertyName TypeSystemPropertyName) bool {
 * 	resolutionCycleStartIndex := c.findResolutionCycleStartIndex(target, propertyName)
 * 	if resolutionCycleStartIndex >= 0 {
 * 		// A cycle was found
 * 		for i := resolutionCycleStartIndex; i < len(c.typeResolutions); i++ {
 * 			c.typeResolutions[i].result = false
 * 		}
 * 		return false
 * 	}
 * 	c.typeResolutions = append(c.typeResolutions, TypeResolution{target: target, propertyName: propertyName, result: true})
 * 	return true
 * }
 */
export function Checker_pushTypeResolution(receiver: GoPtr<Checker>, target: TypeSystemEntity, propertyName: TypeSystemPropertyName): bool {
  const resolutionCycleStartIndex = Checker_findResolutionCycleStartIndex(receiver, target, propertyName);
  if (resolutionCycleStartIndex >= 0) {
    for (let i = resolutionCycleStartIndex; i < receiver!.typeResolutions.length; i++) {
      receiver!.typeResolutions[i]!.result = false;
    }
    return false;
  }
  receiver!.typeResolutions = GoAppend(receiver!.typeResolutions, { target: target, propertyName: propertyName, result: true });
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.popTypeResolution","kind":"method","status":"implemented","sigHash":"b338ad669ac14ab9d5b0e84df4328a29b270e68f2b7af288685c383805cc8e3b"}
 *
 * Go source:
 * func (c *Checker) popTypeResolution() bool {
 * 	lastIndex := len(c.typeResolutions) - 1
 * 	result := c.typeResolutions[lastIndex].result
 * 	c.typeResolutions[lastIndex] = TypeResolution{} // Clear the last entry to avoid memory leaks
 * 	c.typeResolutions = c.typeResolutions[:lastIndex]
 * 	return result
 * }
 */
export function Checker_popTypeResolution(receiver: GoPtr<Checker>): bool {
  const lastIndex = receiver!.typeResolutions.length - 1;
  const result = receiver!.typeResolutions[lastIndex]!.result;
  receiver!.typeResolutions[lastIndex] = {} as TypeResolution;
  receiver!.typeResolutions = GoSlicePrefix(receiver!.typeResolutions, lastIndex);
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getPropertiesOfType","kind":"method","status":"implemented","sigHash":"e801813cf0c98c74019a5480486eaaeeb82b8efe979e5402998473810a7a7fcc"}
 *
 * Go source:
 * func (c *Checker) getPropertiesOfType(t *Type) []*ast.Symbol {
 * 	t = c.getReducedApparentType(t)
 * 	if t.flags&TypeFlagsUnionOrIntersection != 0 {
 * 		return c.getPropertiesOfUnionOrIntersectionType(t)
 * 	}
 * 	return c.getPropertiesOfObjectType(t)
 * }
 */
export function Checker_getPropertiesOfType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<Symbol>> {
  t = Checker_getReducedApparentType(receiver, t);
  if ((t!.flags & TypeFlagsUnionOrIntersection) !== 0) {
    return Checker_getPropertiesOfUnionOrIntersectionType(receiver, t);
  }
  return Checker_getPropertiesOfObjectType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getPropertiesOfObjectType","kind":"method","status":"implemented","sigHash":"485474910400199bb9d88a2a369c9f053d3c140b33b4ae5b65f3b83a9366baf6"}
 *
 * Go source:
 * func (c *Checker) getPropertiesOfObjectType(t *Type) []*ast.Symbol {
 * 	if t.flags&TypeFlagsObject != 0 {
 * 		return c.resolveStructuredTypeMembers(t).properties
 * 	}
 * 	return nil
 * }
 */
export function Checker_getPropertiesOfObjectType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<Symbol>> {
  if ((t!.flags & TypeFlagsObject) !== 0) {
    return StructuredType_Properties(Checker_resolveStructuredTypeMembers(receiver, t));
  }
  return GoNilSlice<GoPtr<Symbol>>();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getPropertiesOfUnionOrIntersectionType","kind":"method","status":"implemented","sigHash":"29139284c4e5f20d365c127ba75a73622cfc4e7f0452cdf0406ba3c8e9f65332"}
 *
 * Go source:
 * func (c *Checker) getPropertiesOfUnionOrIntersectionType(t *Type) []*ast.Symbol {
 * 	d := t.AsUnionOrIntersectionType()
 * 	if d.resolvedProperties == nil {
 * 		var checked collections.Set[string]
 * 		props := []*ast.Symbol{}
 * 		for _, current := range d.types {
 * 			for _, prop := range c.getPropertiesOfType(current) {
 * 				if !checked.Has(prop.Name) {
 * 					checked.Add(prop.Name)
 * 					combinedProp := c.getPropertyOfUnionOrIntersectionType(t, prop.Name, t.flags&TypeFlagsIntersection != 0 /*skipObjectFunctionPropertyAugment* /)
 * 					if combinedProp != nil {
 * 						props = append(props, combinedProp)
 * 					}
 * 				}
 * 			}
 * 			// The properties of a union type are those that are present in all constituent types, so
 * 			// we only need to check the properties of the first type without index signature
 * 			if t.flags&TypeFlagsUnion != 0 && len(c.getIndexInfosOfType(current)) == 0 {
 * 				break
 * 			}
 * 		}
 * 		d.resolvedProperties = props
 * 	}
 * 	return d.resolvedProperties
 * }
 */
export function Checker_getPropertiesOfUnionOrIntersectionType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<Symbol>> {
  const d = Type_AsUnionOrIntersectionType(t);
  if (GoSliceIsNil(d!.resolvedProperties)) {
    const checked: orderedSet<string> = { valuesByKey: new globalThis.Map(), values: GoSliceMake(0, 0, GoStringValueOps) };
    let props: GoSlice<GoPtr<Symbol>> = GoNilSlice();
    for (const current of d!.types) {
      for (const prop of Checker_getPropertiesOfType(receiver, current)) {
        if (!orderedSet_contains(checked, prop!.Name, GoEqualStrict<string>)) {
          orderedSet_add(checked, prop!.Name, GoStringKey);
          const combinedProp = Checker_getPropertyOfUnionOrIntersectionType(receiver, t, prop!.Name, (t!.flags & TypeFlagsIntersection) !== 0);
          if (combinedProp !== undefined) {
            props = GoSliceAppend(props, combinedProp, GoPointerValueOps<Symbol>());
          }
        }
      }
      if ((t!.flags & TypeFlagsUnion) !== 0 && Checker_getIndexInfosOfType(receiver, current).length === 0) {
        break;
      }
    }
    d!.resolvedProperties = props;
  }
  return d!.resolvedProperties;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBaseTypes","kind":"method","status":"implemented","sigHash":"da46159c9b6629014ce54b325b877f2e4fbb41933cf5c0dfdd4fb432fc8fe034"}
 *
 * Go source:
 * func (c *Checker) getBaseTypes(t *Type) []*Type {
 * 	if t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) == 0 {
 * 		return nil
 * 	}
 * 	data := t.AsInterfaceType()
 * 	if !data.baseTypesResolved {
 * 		if !c.pushTypeResolution(t, TypeSystemPropertyNameResolvedBaseTypes) {
 * 			return data.resolvedBaseTypes
 * 		}
 * 		switch {
 * 		case t.objectFlags&ObjectFlagsTuple != 0:
 * 			data.resolvedBaseTypes = []*Type{c.getTupleBaseType(t)}
 * 		case t.symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0:
 * 			if t.symbol.Flags&ast.SymbolFlagsClass != 0 {
 * 				c.resolveBaseTypesOfClass(t)
 * 			}
 * 			if t.symbol.Flags&ast.SymbolFlagsInterface != 0 {
 * 				c.resolveBaseTypesOfInterface(t)
 * 			}
 * 		default:
 * 			panic("Unhandled case in getBaseTypes")
 * 		}
 * 		if !c.popTypeResolution() && t.symbol.Declarations != nil {
 * 			for _, declaration := range t.symbol.Declarations {
 * 				if ast.IsClassDeclaration(declaration) || ast.IsInterfaceDeclaration(declaration) {
 * 					c.reportCircularBaseType(declaration, t)
 * 				}
 * 			}
 * 		}
 * 		// In general, base type resolution always precedes member resolution. However, it is possible
 * 		// for resolution of type parameter defaults to cause circularity errors, possibly leaving
 * 		// members partially resolved. Here we ensure any such partial resolution is reset.
 * 		// See https://github.com/microsoft/TypeScript/issues/16861 for an example.
 * 		t.objectFlags &^= ObjectFlagsMembersResolved
 * 		data.baseTypesResolved = true
 * 	}
 * 	return data.resolvedBaseTypes
 * }
 */
export function Checker_getBaseTypes(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<Type>> {
  if ((t!.objectFlags & (ObjectFlagsClassOrInterface | ObjectFlagsReference)) === 0) {
    return GoNilSlice<GoPtr<Type>>();
  }
  const data = Type_AsInterfaceType(t)!;
  if (!data.baseTypesResolved) {
    if (!Checker_pushTypeResolution(receiver, t, TypeSystemPropertyNameResolvedBaseTypes)) {
      return data.resolvedBaseTypes;
    }
    if ((t!.objectFlags & ObjectFlagsTuple) !== 0) {
      data.resolvedBaseTypes = GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, Checker_getTupleBaseType(receiver, t), GoPointerValueOps<Type>());
      });
    } else if ((t!.symbol!.Flags & (SymbolFlagsClass | SymbolFlagsInterface)) !== 0) {
      if ((t!.symbol!.Flags & SymbolFlagsClass) !== 0) {
        Checker_resolveBaseTypesOfClass(receiver, t);
      }
      if ((t!.symbol!.Flags & SymbolFlagsInterface) !== 0) {
        Checker_resolveBaseTypesOfInterface(receiver, t);
      }
    } else {
      throw new globalThis.Error("Unhandled case in getBaseTypes");
    }
    if (!Checker_popTypeResolution(receiver) && !GoSliceIsNil(t!.symbol!.Declarations)) {
      for (const declaration of t!.symbol!.Declarations) {
        if (IsClassDeclaration(declaration) || IsInterfaceDeclaration(declaration)) {
          Checker_reportCircularBaseType(receiver, declaration, t);
        }
      }
    }
    t!.objectFlags &= ~ObjectFlagsMembersResolved;
    data.baseTypesResolved = true;
  }
  return data.resolvedBaseTypes;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTupleBaseType","kind":"method","status":"implemented","sigHash":"5b9862fac0975a9e9ac91230812570cdbd182881e1923a89b8decd809036e757"}
 *
 * Go source:
 * func (c *Checker) getTupleBaseType(t *Type) *Type {
 * 	typeParameters := t.AsTupleType().TypeParameters()
 * 	elementInfos := t.AsTupleType().elementInfos
 * 	elementTypes := make([]*Type, len(typeParameters))
 * 	for i, tp := range typeParameters {
 * 		if elementInfos[i].flags&ElementFlagsVariadic != 0 {
 * 			elementTypes[i] = c.getIndexedAccessType(tp, c.numberType)
 * 		} else {
 * 			elementTypes[i] = tp
 * 		}
 * 	}
 * 	return c.createArrayTypeEx(c.getUnionType(elementTypes), t.AsTupleType().readonly)
 * }
 */
export function Checker_getTupleBaseType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const tupleType = Type_AsTupleType(t);
  const typeParameters = InterfaceType_TypeParameters(Type_AsInterfaceType(t));
  const elementInfos = tupleType!.elementInfos;
  const elementTypes: GoSlice<GoPtr<Type>> = GoSliceMake(0, 0, GoPointerValueOps<Type>());
  for (let i = 0; i < typeParameters.length; i++) {
    const typeParameter = GoSliceLoad(typeParameters, i, GoPointerValueOps<Type>());
    elementTypes[i] = (elementInfos[i]!.flags & ElementFlagsVariadic) !== 0 ? Checker_getIndexedAccessType(receiver, typeParameter, receiver!.numberType) : typeParameter;
  }
  return Checker_createArrayTypeEx(receiver, Checker_getUnionType(receiver, elementTypes), tupleType!.readonly);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.resolveBaseTypesOfClass","kind":"method","status":"implemented","sigHash":"82710a2d93749bc9d7831b278a68d12ff663d36c4f9ad8604014fd741168a4ff"}
 *
 * Go source:
 * func (c *Checker) resolveBaseTypesOfClass(t *Type) {
 * 	baseConstructorType := c.getApparentType(c.getBaseConstructorTypeOfClass(t))
 * 	if baseConstructorType.flags&(TypeFlagsObject|TypeFlagsIntersection|TypeFlagsAny) == 0 {
 * 		return
 * 	}
 * 	baseTypeNode := getBaseTypeNodeOfClass(t)
 * 	var baseType *Type
 * 	var originalBaseType *Type
 * 	if baseConstructorType.symbol != nil {
 * 		originalBaseType = c.getDeclaredTypeOfSymbol(baseConstructorType.symbol)
 * 	}
 * 	if baseConstructorType.symbol != nil && baseConstructorType.symbol.Flags&ast.SymbolFlagsClass != 0 && c.areAllOuterTypeParametersApplied(originalBaseType) {
 * 		// When base constructor type is a class with no captured type arguments we know that the constructors all have the same type parameters as the
 * 		// class and all return the instance type of the class. There is no need for further checks and we can apply the
 * 		// type arguments in the same manner as a type reference to get the same error reporting experience.
 * 		baseType = c.getTypeFromClassOrInterfaceReference(baseTypeNode, baseConstructorType.symbol)
 * 	} else if baseConstructorType.flags&TypeFlagsAny != 0 {
 * 		baseType = baseConstructorType
 * 	} else {
 * 		// The class derives from a "class-like" constructor function, check that we have at least one construct signature
 * 		// with a matching number of type parameters and use the return type of the first instantiated signature. Elsewhere
 * 		// we check that all instantiated signatures return the same type.
 * 		constructors := c.getInstantiatedConstructorsForTypeArguments(baseConstructorType, baseTypeNode.TypeArguments(), baseTypeNode)
 * 		if len(constructors) == 0 {
 * 			c.error(baseTypeNode.Expression(), diagnostics.No_base_constructor_has_the_specified_number_of_type_arguments)
 * 			return
 * 		}
 * 		baseType = c.getReturnTypeOfSignature(constructors[0])
 * 	}
 * 	if c.isErrorType(baseType) {
 * 		return
 * 	}
 * 	reducedBaseType := c.getReducedType(baseType)
 * 	if !c.isValidBaseType(reducedBaseType) {
 * 		errorNode := baseTypeNode.Expression()
 * 		diagnostic := c.elaborateNeverIntersection(nil, errorNode, baseType)
 * 		diagnostic = NewDiagnosticChainForNode(diagnostic, errorNode, diagnostics.Base_constructor_return_type_0_is_not_an_object_type_or_intersection_of_object_types_with_statically_known_members, c.TypeToString(reducedBaseType))
 * 		c.addDiagnostic(diagnostic)
 * 		return
 * 	}
 * 	if t == reducedBaseType || c.hasBaseType(reducedBaseType, t) {
 * 		c.error(t.symbol.ValueDeclaration, diagnostics.Type_0_recursively_references_itself_as_a_base_type, c.TypeToString(t))
 * 		return
 * 	}
 * 	t.AsInterfaceType().resolvedBaseTypes = []*Type{reducedBaseType}
 * }
 */
export function Checker_resolveBaseTypesOfClass(receiver: GoPtr<Checker>, t: GoPtr<Type>): void {
  const baseConstructorType = Checker_getApparentType(receiver, Checker_getBaseConstructorTypeOfClass(receiver, t));
  if ((baseConstructorType!.flags & (TypeFlagsObject | TypeFlagsIntersection | TypeFlagsAny)) === 0) {
    return;
  }
  const baseTypeNode = getBaseTypeNodeOfClass(t);
  let baseType: GoPtr<Type>;
  let originalBaseType: GoPtr<Type>;
  if (baseConstructorType!.symbol !== undefined) {
    originalBaseType = Checker_getDeclaredTypeOfSymbol(receiver, baseConstructorType!.symbol);
  }
  if (
    baseConstructorType!.symbol !== undefined &&
    (baseConstructorType!.symbol!.Flags & SymbolFlagsClass) !== 0 &&
    Checker_areAllOuterTypeParametersApplied(receiver, originalBaseType)
  ) {
    baseType = Checker_getTypeFromClassOrInterfaceReference(receiver, baseTypeNode, baseConstructorType!.symbol);
  } else if ((baseConstructorType!.flags & TypeFlagsAny) !== 0) {
    baseType = baseConstructorType;
  } else {
    const constructors = Checker_getInstantiatedConstructorsForTypeArguments(receiver, baseConstructorType, Node_TypeArguments(baseTypeNode) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), baseTypeNode);
    if (constructors.length === 0) {
      Checker_error(receiver, Node_Expression(baseTypeNode), diagnosticsMessages.No_base_constructor_has_the_specified_number_of_type_arguments);
      return;
    }
    baseType = Checker_getReturnTypeOfSignature(receiver, GoSliceLoad(constructors, 0, GoPointerValueOps<Signature>()));
  }
  if (Checker_isErrorType(receiver, baseType)) {
    return;
  }
  const reducedBaseType = Checker_getReducedType(receiver, baseType);
  if (!Checker_isValidBaseType(receiver, reducedBaseType)) {
    const errorNode = Node_Expression(baseTypeNode);
    let diagnostic = Checker_elaborateNeverIntersection(receiver, undefined, errorNode, baseType);
    diagnostic = NewDiagnosticChainForNode(
      diagnostic,
      errorNode,
      diagnosticsMessages.Base_constructor_return_type_0_is_not_an_object_type_or_intersection_of_object_types_with_statically_known_members,
      Checker_TypeToString(receiver, reducedBaseType),
    );
    Checker_addDiagnostic(receiver, diagnostic);
    return;
  }
  if (t === reducedBaseType || Checker_hasBaseType(receiver, reducedBaseType, t)) {
    Checker_error(receiver, t!.symbol!.ValueDeclaration, diagnosticsMessages.Type_0_recursively_references_itself_as_a_base_type, Checker_TypeToString(receiver, t));
    return;
  }
  Type_AsInterfaceType(t)!.resolvedBaseTypes = GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, reducedBaseType, GoPointerValueOps<Type>());
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.resolveBaseTypesOfInterface","kind":"method","status":"implemented","sigHash":"4c5e6dfc7cc93c54fc90e1e635dd3e07116eca41b0b32b2511e44b528f684d52"}
 *
 * Go source:
 * func (c *Checker) resolveBaseTypesOfInterface(t *Type) {
 * 	data := t.AsInterfaceType()
 * 	for _, declaration := range t.symbol.Declarations {
 * 		if ast.IsInterfaceDeclaration(declaration) {
 * 			for _, node := range ast.GetExtendsHeritageClauseElements(declaration) {
 * 				baseType := c.getReducedType(c.getTypeFromTypeNode(node))
 * 				if !c.isErrorType(baseType) {
 * 					if c.isValidBaseType(baseType) {
 * 						if t != baseType && !c.hasBaseType(baseType, t) {
 * 							data.resolvedBaseTypes = append(data.resolvedBaseTypes, baseType)
 * 						} else {
 * 							c.reportCircularBaseType(declaration, t)
 * 						}
 * 					} else {
 * 						c.error(node, diagnostics.An_interface_can_only_extend_an_object_type_or_intersection_of_object_types_with_statically_known_members)
 * 					}
 * 				}
 * 			}
 * 		}
 * 	}
 * }
 */
export function Checker_resolveBaseTypesOfInterface(receiver: GoPtr<Checker>, t: GoPtr<Type>): void {
  const data = Type_AsInterfaceType(t)!;
  for (const declaration of t!.symbol!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    if (IsInterfaceDeclaration(declaration)) {
      for (const node of GetExtendsHeritageClauseElements(declaration)) {
        const baseType = Checker_getReducedType(receiver, Checker_getTypeFromTypeNode(receiver, node));
        if (!Checker_isErrorType(receiver, baseType)) {
          if (Checker_isValidBaseType(receiver, baseType)) {
            if (t !== baseType && !Checker_hasBaseType(receiver, baseType, t)) {
              data.resolvedBaseTypes = GoSliceAppend(data.resolvedBaseTypes, baseType, GoPointerValueOps<Type>());
            } else {
              Checker_reportCircularBaseType(receiver, declaration, t);
            }
          } else {
            Checker_error(receiver, node, diagnosticsMessages.An_interface_can_only_extend_an_object_type_or_intersection_of_object_types_with_statically_known_members);
          }
        }
      }
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.reportCircularBaseType","kind":"method","status":"implemented","sigHash":"8d4fc21e784d02ef9174e50f45fb3f23010904fc6aaaa4344aef356186f715d9"}
 *
 * Go source:
 * func (c *Checker) reportCircularBaseType(node *ast.Node, t *Type) {
 * 	c.error(node, diagnostics.Type_0_recursively_references_itself_as_a_base_type, c.typeToStringEx(t, nil, TypeFormatFlagsWriteArrayAsGenericType, nil))
 * }
 */
export function Checker_reportCircularBaseType(receiver: GoPtr<Checker>, node: GoPtr<Node>, t: GoPtr<Type>): void {
  Checker_error(receiver, node, diagnosticsMessages.Type_0_recursively_references_itself_as_a_base_type, Checker_TypeToStringEx(receiver, t, undefined, TypeFormatFlagsWriteArrayAsGenericType, undefined));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isValidBaseType","kind":"method","status":"implemented","sigHash":"9fa0ec90673c869fb855904e986d9e6bd468a78b60d2422900a2d542ba782fd1"}
 *
 * Go source:
 * func (c *Checker) isValidBaseType(t *Type) bool {
 * 	if t.flags&TypeFlagsTypeParameter != 0 {
 * 		constraint := c.getBaseConstraintOfType(t)
 * 		if constraint != nil {
 * 			return c.isValidBaseType(constraint)
 * 		}
 * 	}
 * 	// TODO: Given that we allow type parameters here now, is this `!isGenericMappedType(type)` check really needed?
 * 	// There's no reason a `T` should be allowed while a `Readonly<T>` should not.
 * 	return t.flags&(TypeFlagsObject|TypeFlagsNonPrimitive|TypeFlagsAny) != 0 && !c.isGenericMappedType(t) ||
 * 		t.flags&TypeFlagsIntersection != 0 && core.Every(t.Types(), c.isValidBaseType)
 * }
 */
export function Checker_isValidBaseType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if ((t!.flags & TypeFlagsTypeParameter) !== 0) {
    const constraint = Checker_getBaseConstraintOfType(receiver, t);
    if (constraint !== undefined) {
      return Checker_isValidBaseType(receiver, constraint);
    }
  }
  return ((t!.flags & (TypeFlagsObject | TypeFlagsNonPrimitive | TypeFlagsAny)) !== 0 && !Checker_isGenericMappedType(receiver, t)) ||
    ((t!.flags & TypeFlagsIntersection) !== 0 && core.Every(Type_Types(t), (elem) => Checker_isValidBaseType(receiver, elem)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.hasBaseType","kind":"method","status":"implemented","sigHash":"38b3ee334a5be0808adfbe1787025930f061d373ea07aa2348df90196f058b0e"}
 *
 * Go source:
 * func (c *Checker) hasBaseType(t *Type, checkBase *Type) bool {
 * 	var check func(*Type) bool
 * 	check = func(t *Type) bool {
 * 		if t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 {
 * 			target := getTargetType(t)
 * 			return target == checkBase || core.Some(c.getBaseTypes(target), check)
 * 		}
 * 		if t.flags&TypeFlagsIntersection != 0 {
 * 			return core.Some(t.Types(), check)
 * 		}
 * 		return false
 * 	}
 * 	return check(t)
 * }
 */
export function Checker_hasBaseType(receiver: GoPtr<Checker>, t: GoPtr<Type>, checkBase: GoPtr<Type>): bool {
  const check = (t: GoPtr<Type>): bool => {
    if ((t!.objectFlags & (ObjectFlagsClassOrInterface | ObjectFlagsReference)) !== 0) {
      const target = getTargetType(t);
      return target === checkBase || core.Some(Checker_getBaseTypes(receiver, target), check);
    }
    if ((t!.flags & TypeFlagsIntersection) !== 0) {
      return core.Some(Type_Types(t), check);
    }
    return false;
  };
  return check(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getAnnotatedAccessorType","kind":"method","status":"implemented","sigHash":"9cc7ebb51a3b815b1c434d37969dc357cf03297d0feb50cb8a21360fec0ac35b"}
 *
 * Go source:
 * func (c *Checker) getAnnotatedAccessorType(accessor *ast.Node) *Type {
 * 	node := c.getAnnotatedAccessorTypeNode(accessor)
 * 	if node != nil {
 * 		return c.getTypeFromTypeNode(node)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getAnnotatedAccessorType(receiver: GoPtr<Checker>, accessor: GoPtr<Node>): GoPtr<Type> {
  const node = Checker_getAnnotatedAccessorTypeNode(receiver, accessor);
  if (node !== undefined) {
    return Checker_getTypeFromTypeNode(receiver, node);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getAnnotatedAccessorTypeNode","kind":"method","status":"implemented","sigHash":"4ae2d63dbb40da3cd5599da7113ccfa9635b90f35c191d4cc62f0f2afd361ca1"}
 *
 * Go source:
 * func (c *Checker) getAnnotatedAccessorTypeNode(accessor *ast.Node) *ast.Node {
 * 	if accessor != nil {
 * 		switch accessor.Kind {
 * 		case ast.KindGetAccessor, ast.KindPropertyDeclaration:
 * 			return accessor.Type()
 * 		case ast.KindSetAccessor:
 * 			return getEffectiveSetAccessorTypeAnnotationNode(accessor)
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getAnnotatedAccessorTypeNode(receiver: GoPtr<Checker>, accessor: GoPtr<Node>): GoPtr<Node> {
  if (accessor !== undefined) {
    switch (accessor!.Kind) {
    case KindGetAccessor:
    case KindPropertyDeclaration:
      return Node_Type(accessor);
    case KindSetAccessor:
      return getEffectiveSetAccessorTypeAnnotationNode(accessor);
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkAndAggregateReturnExpressionTypes","kind":"method","status":"implemented","sigHash":"65d36ac5678eb94471969db5a9926a070f49eab6db3b0fa3e196eab3975cdf74"}
 *
 * Go source:
 * func (c *Checker) checkAndAggregateReturnExpressionTypes(fn *ast.Node, checkMode CheckMode) ([]*Type, bool) {
 * 	functionFlags := ast.GetFunctionFlags(fn)
 * 	var aggregatedTypes []*Type
 * 	hasReturnWithNoExpression := c.functionHasImplicitReturn(fn)
 * 	hasReturnOfTypeNever := false
 * 	ast.ForEachReturnStatement(fn.Body(), func(returnStatement *ast.Node) bool {
 * 		expr := returnStatement.Expression()
 * 		if expr == nil {
 * 			hasReturnWithNoExpression = true
 * 			return false
 * 		}
 * 		expr = ast.SkipParentheses(expr)
 * 		// Bare calls to this same function don't contribute to inference
 * 		// and `return await` is also safe to unwrap here
 * 		if functionFlags&ast.FunctionFlagsAsync != 0 && ast.IsAwaitExpression(expr) {
 * 			expr = ast.SkipParentheses(expr.Expression())
 * 		}
 * 		if ast.IsCallExpression(expr) && ast.IsIdentifier(expr.Expression()) && c.checkExpressionCached(expr.Expression()).symbol == c.getMergedSymbol(fn.Symbol()) &&
 * 			(!ast.IsFunctionExpressionOrArrowFunction(fn.Symbol().ValueDeclaration) || c.isConstantReference(expr.Expression())) {
 * 			hasReturnOfTypeNever = true
 * 			return false
 * 		}
 * 		t := c.checkExpressionCachedEx(expr, checkMode & ^CheckModeSkipGenericFunctions)
 * 		if functionFlags&ast.FunctionFlagsAsync != 0 {
 * 			// From within an async function you can return either a non-promise value or a promise. Any
 * 			// Promise/A+ compatible implementation will always assimilate any foreign promise, so the
 * 			// return type of the body should be unwrapped to its awaited type, which should be wrapped in
 * 			// the native Promise<T> type by the caller.
 * 			t = c.unwrapAwaitedType(c.checkAwaitedType(t, false /*withAlias* /, fn, diagnostics.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member))
 * 		}
 * 		if t.flags&TypeFlagsNever != 0 {
 * 			hasReturnOfTypeNever = true
 * 		}
 * 		if c.isConstContext(expr) {
 * 			t = c.getRegularTypeOfLiteralType(t)
 * 		}
 * 		aggregatedTypes = core.AppendIfUnique(aggregatedTypes, t)
 * 		return false
 * 	})
 * 	if len(aggregatedTypes) == 0 && !hasReturnWithNoExpression && (hasReturnOfTypeNever || mayReturnNever(fn)) {
 * 		return nil, true
 * 	}
 * 	if c.strictNullChecks && len(aggregatedTypes) != 0 && hasReturnWithNoExpression {
 * 		aggregatedTypes = core.AppendIfUnique(aggregatedTypes, c.undefinedType)
 * 	}
 * 	return aggregatedTypes, false
 * }
 */
export function Checker_checkAndAggregateReturnExpressionTypes(receiver: GoPtr<Checker>, fn: GoPtr<Node>, checkMode: CheckMode): [GoSlice<GoPtr<Type>>, bool] {
  const functionFlags = GetFunctionFlags(fn);
  let aggregatedTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
  let hasReturnWithNoExpression = Checker_functionHasImplicitReturn(receiver, fn);
  let hasReturnOfTypeNever = false;
  ForEachReturnStatement(Node_Body(fn), (returnStatement: GoPtr<Node>): bool => {
    let expr = Node_Expression(returnStatement);
    if (expr === undefined) {
      hasReturnWithNoExpression = true;
      return false;
    }
    expr = SkipParentheses(expr);
    if ((functionFlags & FunctionFlagsAsync) !== 0 && IsAwaitExpression(expr)) {
      expr = SkipParentheses(Node_Expression(expr));
    }
    if (IsCallExpression(expr) && IsIdentifier(Node_Expression(expr)) &&
      Checker_checkExpressionCached(receiver, Node_Expression(expr))!.symbol === Checker_getMergedSymbol(receiver, Node_Symbol(fn)) &&
      (!IsFunctionExpressionOrArrowFunction(Node_Symbol(fn)!.ValueDeclaration) || Checker_isConstantReference(receiver, Node_Expression(expr)))) {
      hasReturnOfTypeNever = true;
      return false;
    }
    let t = Checker_checkExpressionCachedEx(receiver, expr, (checkMode & ~CheckModeSkipGenericFunctions) as CheckMode);
    if ((functionFlags & FunctionFlagsAsync) !== 0) {
      t = Checker_unwrapAwaitedType(receiver, Checker_checkAwaitedType(receiver, t, false, fn, diagnosticsMessages.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member));
    }
    if ((t!.flags & TypeFlagsNever) !== 0) {
      hasReturnOfTypeNever = true;
    }
    if (Checker_isConstContext(receiver, expr)) {
      t = Checker_getRegularTypeOfLiteralType(receiver, t);
    }
    aggregatedTypes = core.AppendIfUnique(aggregatedTypes, t, GoEqualStrict<GoPtr<Type>>);
    return false;
  });
  if (aggregatedTypes.length === 0 && !hasReturnWithNoExpression && (hasReturnOfTypeNever || mayReturnNever(fn))) {
    return [GoNilSlice<GoPtr<Type>>(), true];
  }
  if (receiver!.strictNullChecks && aggregatedTypes.length !== 0 && hasReturnWithNoExpression) {
    aggregatedTypes = core.AppendIfUnique(aggregatedTypes, receiver!.undefinedType, GoEqualStrict<GoPtr<Type>>);
  }
  return [aggregatedTypes, false];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkAndAggregateYieldOperandTypes","kind":"method","status":"implemented","sigHash":"e6416c18f56b1c5f8dcb93cf960efdf987fd637f84052c1df38f5b1541b92356"}
 *
 * Go source:
 * func (c *Checker) checkAndAggregateYieldOperandTypes(fn *ast.Node, checkMode CheckMode) (yieldTypes []*Type, nextTypes []*Type) {
 * 	isAsync := (ast.GetFunctionFlags(fn) & ast.FunctionFlagsAsync) != 0
 * 	forEachYieldExpression(fn.Body(), func(yieldExpr *ast.Node) bool {
 * 		yieldExprType := c.undefinedWideningType
 * 		if yieldExpr.Expression() != nil {
 * 			yieldExprType = c.checkExpressionEx(yieldExpr.Expression(), checkMode & ^CheckModeSkipGenericFunctions)
 * 		}
 * 		if yieldExpr.Expression() != nil && c.isConstContext(yieldExpr.Expression()) {
 * 			yieldExprType = c.getRegularTypeOfLiteralType(yieldExprType)
 * 		}
 * 		yieldTypes = core.AppendIfUnique(yieldTypes, c.getYieldedTypeOfYieldExpression(yieldExpr, yieldExprType, c.anyType, isAsync))
 * 		var nextType *Type
 * 		if yieldExpr.AsYieldExpression().AsteriskToken != nil {
 * 			iterationTypes := c.getIterationTypesOfIterable(yieldExprType, core.IfElse(isAsync, IterationUseAsyncYieldStar, IterationUseYieldStar), yieldExpr.Expression())
 * 			nextType = iterationTypes.nextType
 * 		} else {
 * 			nextType = c.getContextualType(yieldExpr, ContextFlagsNone)
 * 		}
 * 		if nextType != nil {
 * 			nextTypes = core.AppendIfUnique(nextTypes, nextType)
 * 		}
 * 		return false
 * 	})
 * 	return yieldTypes, nextTypes
 * }
 */
export function Checker_checkAndAggregateYieldOperandTypes(receiver: GoPtr<Checker>, fn: GoPtr<Node>, checkMode: CheckMode): [yieldTypes: GoSlice<GoPtr<Type>>, nextTypes: GoSlice<GoPtr<Type>>] {
  const isAsync = (GetFunctionFlags(fn) & FunctionFlagsAsync) !== 0;
  let yieldTypes: GoSlice<GoPtr<Type>> = GoSliceMake(0, 0, GoPointerValueOps<Type>());
  let nextTypes: GoSlice<GoPtr<Type>> = GoSliceMake(0, 0, GoPointerValueOps<Type>());
  forEachYieldExpression(Node_Body(fn), (yieldExpr: GoPtr<Node>): bool => {
    let yieldExprType = receiver!.undefinedWideningType;
    const expression = Node_Expression(yieldExpr);
    if (expression !== undefined) {
      yieldExprType = Checker_checkExpressionEx(receiver, expression, (checkMode & ~CheckModeSkipGenericFunctions) as CheckMode);
    }
    if (expression !== undefined && Checker_isConstContext(receiver, expression)) {
      yieldExprType = Checker_getRegularTypeOfLiteralType(receiver, yieldExprType);
    }
    yieldTypes = core.AppendIfUnique(yieldTypes, Checker_getYieldedTypeOfYieldExpression(receiver, yieldExpr, yieldExprType, receiver!.anyType, isAsync), GoEqualStrict<GoPtr<Type>>);
    let nextType: GoPtr<Type>;
    if (AsYieldExpression(yieldExpr)!.AsteriskToken !== undefined) {
      const iterationTypes = Checker_getIterationTypesOfIterable(receiver, yieldExprType, core.IfElse(isAsync, IterationUseAsyncYieldStar, IterationUseYieldStar), expression);
      nextType = iterationTypes.nextType;
    } else {
      nextType = Checker_getContextualType(receiver, yieldExpr, ContextFlagsNone);
    }
    if (nextType !== undefined) {
      nextTypes = core.AppendIfUnique(nextTypes, nextType, GoEqualStrict<GoPtr<Type>>);
    }
    return false;
  });
  return [yieldTypes, nextTypes];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createPromiseType","kind":"method","status":"implemented","sigHash":"f18c34d9d8876ffefb0a018918334e41d5666ba44b413a14af8b1e53df3c9092"}
 *
 * Go source:
 * func (c *Checker) createPromiseType(promisedType *Type) *Type {
 * 	// creates a `Promise<T>` type where `T` is the promisedType argument
 * 	globalPromiseType := c.getGlobalPromiseTypeChecked()
 * 	if globalPromiseType != c.emptyGenericType {
 * 		// if the promised type is itself a promise, get the underlying type; otherwise, fallback to the promised type
 * 		// Unwrap an `Awaited<T>` to `T` to improve inference.
 * 		promisedType = core.OrElse(c.getAwaitedTypeNoAlias(c.unwrapAwaitedType(promisedType)), c.unknownType)
 * 		return c.createTypeReference(globalPromiseType, []*Type{promisedType})
 * 	}
 * 	return c.unknownType
 * }
 */
export function Checker_createPromiseType(receiver: GoPtr<Checker>, promisedType: GoPtr<Type>): GoPtr<Type> {
  const globalPromiseType = receiver!.getGlobalPromiseTypeChecked!();
  if (globalPromiseType !== receiver!.emptyGenericType) {
    promisedType = core.OrElse(Checker_getAwaitedTypeNoAlias(receiver, Checker_unwrapAwaitedType(receiver, promisedType)), receiver!.unknownType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
    return Checker_createTypeReference(receiver, globalPromiseType, GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, promisedType, GoPointerValueOps<Type>());
    }));
  }
  return receiver!.unknownType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createPromiseLikeType","kind":"method","status":"implemented","sigHash":"e367927f706cf7c2b438083b828f1da26d4ffe08b385d75cd70ac1d8b3c253fc"}
 *
 * Go source:
 * func (c *Checker) createPromiseLikeType(promisedType *Type) *Type {
 * 	// creates a `PromiseLike<T>` type where `T` is the promisedType argument
 * 	globalPromiseLikeType := c.getGlobalPromiseLikeType()
 * 	if globalPromiseLikeType != c.emptyGenericType {
 * 		// if the promised type is itself a promise, get the underlying type; otherwise, fallback to the promised type
 * 		// Unwrap an `Awaited<T>` to `T` to improve inference.
 * 		promisedType = core.OrElse(c.getAwaitedTypeNoAlias(c.unwrapAwaitedType(promisedType)), c.unknownType)
 * 		return c.createTypeReference(globalPromiseLikeType, []*Type{promisedType})
 * 	}
 * 	return c.unknownType
 * }
 */
export function Checker_createPromiseLikeType(receiver: GoPtr<Checker>, promisedType: GoPtr<Type>): GoPtr<Type> {
  const globalPromiseLikeType = receiver!.getGlobalPromiseLikeType!();
  if (globalPromiseLikeType !== receiver!.emptyGenericType) {
    promisedType = core.OrElse(Checker_getAwaitedTypeNoAlias(receiver, Checker_unwrapAwaitedType(receiver, promisedType)), receiver!.unknownType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
    return Checker_createTypeReference(receiver, globalPromiseLikeType, GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, promisedType, GoPointerValueOps<Type>());
    }));
  }
  return receiver!.unknownType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded","kind":"method","status":"implemented","sigHash":"4705d2f09ef5b8fcc5bc57d41b7d69dd3e5fe823b2af3eb48aa3b9bbb03399bb"}
 *
 * Go source:
 * func (c *Checker) getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(t *Type, contextualSignatureReturnType *Type, kind IterationTypeKind, isAsyncGenerator bool) *Type {
 * 	if t != nil && isUnitType(t) {
 * 		var contextualType *Type
 * 		if contextualSignatureReturnType != nil {
 * 			contextualType = c.getIterationTypeOfGeneratorFunctionReturnType(kind, contextualSignatureReturnType, isAsyncGenerator)
 * 		}
 * 		t = c.getWidenedLiteralLikeTypeForContextualType(t, contextualType)
 * 	}
 * 	return t
 * }
 */
export function Checker_getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(receiver: GoPtr<Checker>, t: GoPtr<Type>, contextualSignatureReturnType: GoPtr<Type>, kind: IterationTypeKind, isAsyncGenerator: bool): GoPtr<Type> {
  if (t !== undefined && isUnitType(t)) {
    let contextualType: GoPtr<Type>;
    if (contextualSignatureReturnType !== undefined) {
      contextualType = Checker_getIterationTypeOfGeneratorFunctionReturnType(receiver, kind, contextualSignatureReturnType, isAsyncGenerator);
    }
    t = Checker_getWidenedLiteralLikeTypeForContextualType(receiver, t, contextualType);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createGeneratorType","kind":"method","status":"implemented","sigHash":"2f669a0a20b7fde7d72cb4f5cc67adb4e59af267f0a3297b2613b7aee5313090"}
 *
 * Go source:
 * func (c *Checker) createGeneratorType(yieldType *Type, returnType *Type, nextType *Type, isAsyncGenerator bool) *Type {
 * 	resolver := core.IfElse(isAsyncGenerator, c.asyncIterationTypesResolver, c.syncIterationTypesResolver)
 * 	globalGeneratorType := resolver.getGlobalGeneratorType()
 * 	yieldType = core.OrElse(resolver.resolveIterationType(yieldType, nil /*errorNode* /), c.unknownType)
 * 	returnType = core.OrElse(resolver.resolveIterationType(returnType, nil /*errorNode* /), c.unknownType)
 * 	if globalGeneratorType == c.emptyGenericType {
 * 		// Fall back to the global IterableIterator type.
 * 		globalIterableIteratorType := resolver.getGlobalIterableIteratorType()
 * 		if globalIterableIteratorType != c.emptyGenericType {
 * 			return c.createTypeFromGenericGlobalType(globalIterableIteratorType, []*Type{yieldType, returnType, nextType})
 * 		}
 * 		// The global Generator type doesn't exist, so report an error
 * 		resolver.getGlobalIterableIteratorTypeChecked()
 * 		return c.emptyObjectType
 * 	}
 * 	return c.createTypeFromGenericGlobalType(globalGeneratorType, []*Type{yieldType, returnType, nextType})
 * }
 */
export function Checker_createGeneratorType(receiver: GoPtr<Checker>, yieldType: GoPtr<Type>, returnType: GoPtr<Type>, nextType: GoPtr<Type>, isAsyncGenerator: bool): GoPtr<Type> {
  const resolver = (isAsyncGenerator ? receiver!.asyncIterationTypesResolver : receiver!.syncIterationTypesResolver)!;
  const globalGeneratorType = resolver.getGlobalGeneratorType!();
  yieldType = core.OrElse(resolver.resolveIterationType!(yieldType, undefined), receiver!.unknownType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
  returnType = core.OrElse(resolver.resolveIterationType!(returnType, undefined), receiver!.unknownType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
  if (globalGeneratorType === receiver!.emptyGenericType) {
    const globalIterableIteratorType = resolver.getGlobalIterableIteratorType!();
    if (globalIterableIteratorType !== receiver!.emptyGenericType) {
      return Checker_createTypeFromGenericGlobalType(receiver, globalIterableIteratorType, GoSliceBuild(3, 3, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, yieldType, GoPointerValueOps<Type>());
        GoSliceStore(__goSliceLiteral, 1, returnType, GoPointerValueOps<Type>());
        GoSliceStore(__goSliceLiteral, 2, nextType, GoPointerValueOps<Type>());
      }));
    }
    resolver.getGlobalIterableIteratorTypeChecked!();
    return receiver!.emptyObjectType;
  }
  return Checker_createTypeFromGenericGlobalType(receiver, globalGeneratorType, GoSliceBuild(3, 3, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, yieldType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, returnType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 2, nextType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.addOptionalTypeMarker","kind":"method","status":"implemented","sigHash":"0419a56d45e47ffb409c471f1f5a830499c84ae86bf53ed199c2e4ff0ae87010"}
 *
 * Go source:
 * func (c *Checker) addOptionalTypeMarker(t *Type) *Type {
 * 	if c.strictNullChecks {
 * 		return c.getUnionType([]*Type{t, c.optionalType})
 * 	}
 * 	return t
 * }
 */
export function Checker_addOptionalTypeMarker(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (receiver!.strictNullChecks) {
    return Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, t, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, receiver!.optionalType, GoPointerValueOps<Type>());
    }));
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getLowerBoundOfKeyType","kind":"method","status":"implemented","sigHash":"03c50fcbfa531eeeff08b11beb9a16fdd54209d0e65007d2966f58cc0678a747"}
 *
 * Go source:
 * func (c *Checker) getLowerBoundOfKeyType(t *Type) *Type {
 * 	switch {
 * 	case t.flags&TypeFlagsIndex != 0:
 * 		t := c.getApparentType(t.AsIndexType().target)
 * 		if c.isGenericTupleType(t) {
 * 			return c.getKnownKeysOfTupleType(t)
 * 		}
 * 		return c.getIndexType(t)
 * 	case t.flags&TypeFlagsConditional != 0:
 * 		if t.AsConditionalType().root.isDistributive {
 * 			checkType := t.AsConditionalType().checkType
 * 			constraint := c.getLowerBoundOfKeyType(checkType)
 * 			if constraint != checkType {
 * 				return c.getConditionalTypeInstantiation(t, prependTypeMapping(t.AsConditionalType().root.checkType, constraint, t.AsConditionalType().mapper), false /*forConstraint* /, nil)
 * 			}
 * 		}
 * 		return t
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return c.mapTypeEx(t, c.getLowerBoundOfKeyType, true /*noReductions* /)
 * 	case t.flags&TypeFlagsIntersection != 0:
 * 		// Similarly to getTypeFromIntersectionTypeNode, we preserve the special string & {}, number & {},
 * 		// and bigint & {} intersections that are used to prevent subtype reduction in union types.
 * 		types := t.Types()
 * 		if len(types) == 2 && types[0].flags&(TypeFlagsString|TypeFlagsNumber|TypeFlagsBigInt) != 0 && types[1] == c.emptyTypeLiteralType {
 * 			return t
 * 		}
 * 		return c.getIntersectionType(core.SameMap(t.Types(), c.getLowerBoundOfKeyType))
 * 	}
 * 	return t
 * }
 */
export function Checker_getLowerBoundOfKeyType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsIndex) !== 0) {
    const apparentType = Checker_getApparentType(receiver, Type_AsIndexType(t)!.target);
    if (Checker_isGenericTupleType(receiver, apparentType)) {
      return Checker_getKnownKeysOfTupleType(receiver, apparentType);
    }
    return Checker_getIndexType(receiver, apparentType);
  }
  if ((t!.flags & TypeFlagsConditional) !== 0) {
    const conditional = Type_AsConditionalType(t);
    if (conditional!.root!.isDistributive) {
      const checkType = conditional!.checkType;
      const constraint = Checker_getLowerBoundOfKeyType(receiver, checkType);
      if (constraint !== checkType) {
        return Checker_getConditionalTypeInstantiation(receiver, t, prependTypeMapping(conditional!.root!.checkType, constraint, conditional!.mapper), false, undefined);
      }
    }
    return t;
  }
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    return Checker_mapTypeEx(receiver, t, (ty: GoPtr<Type>): GoPtr<Type> => Checker_getLowerBoundOfKeyType(receiver, ty), true);
  }
  if ((t!.flags & TypeFlagsIntersection) !== 0) {
    const types = Type_Types(t);
    if (types.length === 2 && (GoSliceLoad(types, 0, GoPointerValueOps<Type>())!.flags & (TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt)) !== 0 && GoSliceLoad(types, 1, GoPointerValueOps<Type>()) === receiver!.emptyTypeLiteralType) {
      return t;
    }
    return Checker_getIntersectionType(receiver, core.SameMap(types, (ty: GoPtr<Type>): GoPtr<Type> => Checker_getLowerBoundOfKeyType(receiver, ty), GoEqualStrict<GoPtr<Type>>));
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.combineUnionOrIntersectionThisParam","kind":"method","status":"implemented","sigHash":"763dd2a3a225c26097ca6576e7458d74fdfe05265a608996dea60aba8a52e01a"}
 *
 * Go source:
 * func (c *Checker) combineUnionOrIntersectionThisParam(left *ast.Symbol, right *ast.Symbol, mapper *TypeMapper, isUnion bool) *ast.Symbol {
 * 	if left == nil {
 * 		return right
 * 	}
 * 	if right == nil {
 * 		return left
 * 	}
 * 	// A signature `this` type might be a read or a write position... It's very possible that it should be invariant
 * 	// and we should refuse to merge signatures if there are `this` types and they do not match. However, so as to be
 * 	// permissive when calling, for now, we'll intersect the `this` types just like we do for param types in union signatures.
 * 	thisType := c.getUnionOrIntersectionType([]*Type{c.getTypeOfSymbol(left), c.instantiateType(c.getTypeOfSymbol(right), mapper)}, !isUnion, UnionReductionLiteral)
 * 	return c.createSymbolWithType(left, thisType)
 * }
 */
export function Checker_combineUnionOrIntersectionThisParam(receiver: GoPtr<Checker>, left: GoPtr<Symbol>, right: GoPtr<Symbol>, mapper: GoPtr<TypeMapper>, isUnion: bool): GoPtr<Symbol> {
  if (left === undefined) {
    return right;
  }
  if (right === undefined) {
    return left;
  }
  const thisType = Checker_getUnionOrIntersectionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, Checker_getTypeOfSymbol(receiver, left), GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, Checker_instantiateType(receiver, Checker_getTypeOfSymbol(receiver, right), mapper), GoPointerValueOps<Type>());
  }), !isUnion, UnionReductionLiteral);
  return Checker_createSymbolWithType(receiver, left, thisType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.includeMixinType","kind":"method","status":"implemented","sigHash":"e87b6d63a6a70974b4fa5b4be7a0efcf4a0444ce134242ba8a260dc6f83b78a3"}
 *
 * Go source:
 * func (c *Checker) includeMixinType(t *Type, types []*Type, mixinFlags []bool, index int) *Type {
 * 	var mixedTypes []*Type
 * 	for i := range types {
 * 		if i == index {
 * 			mixedTypes = append(mixedTypes, t)
 * 		} else if mixinFlags[i] {
 * 			mixedTypes = append(mixedTypes, c.getReturnTypeOfSignature(c.getSignaturesOfType(types[i], SignatureKindConstruct)[0]))
 * 		}
 * 	}
 * 	return c.getIntersectionType(mixedTypes)
 * }
 */
export function Checker_includeMixinType(receiver: GoPtr<Checker>, t: GoPtr<Type>, types: GoSlice<GoPtr<Type>>, mixinFlags: GoSlice<bool>, index: int): GoPtr<Type> {
  let mixedTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
  for (let i = 0; i < types.length; i++) {
    if (i === index) {
      mixedTypes = GoSliceAppend(mixedTypes, t, GoPointerValueOps<Type>());
    } else if (GoSliceLoad(mixinFlags, i, GoBooleanValueOps)) {
      mixedTypes = GoSliceAppend(mixedTypes, Checker_getReturnTypeOfSignature(receiver, GoSliceLoad(Checker_getSignaturesOfType(receiver, GoSliceLoad(types, i, GoPointerValueOps<Type>()), SignatureKindConstruct), 0, GoPointerValueOps<Signature>())), GoPointerValueOps<Type>());
    }
  }
  return Checker_getIntersectionType(receiver, mixedTypes);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getApparentType","kind":"method","status":"implemented","sigHash":"2d46985401e750f97f1004705ac59896a194038cf6daaa16d7a7d1bf3dcef0f6"}
 *
 * Go source:
 * func (c *Checker) getApparentType(t *Type) *Type {
 * 	originalType := t
 * 	if t.flags&TypeFlagsInstantiable != 0 {
 * 		t = c.getBaseConstraintOfType(t)
 * 		if t == nil {
 * 			t = c.unknownType
 * 		}
 * 	}
 * 	switch {
 * 	case t.objectFlags&ObjectFlagsMapped != 0:
 * 		return c.getApparentTypeOfMappedType(t)
 * 	case t.objectFlags&ObjectFlagsReference != 0 && t != originalType:
 * 		return c.getTypeWithThisArgument(t, originalType, false /*needsApparentType* /)
 * 	case t.flags&TypeFlagsIntersection != 0:
 * 		return c.getApparentTypeOfIntersectionType(t, originalType)
 * 	case t.flags&TypeFlagsStringLike != 0:
 * 		return c.globalStringType
 * 	case t.flags&TypeFlagsNumberLike != 0:
 * 		return c.globalNumberType
 * 	case t.flags&TypeFlagsBigIntLike != 0:
 * 		return c.getGlobalBigIntType()
 * 	case t.flags&TypeFlagsBooleanLike != 0:
 * 		return c.globalBooleanType
 * 	case t.flags&TypeFlagsESSymbolLike != 0:
 * 		return c.getGlobalESSymbolType()
 * 	case t.flags&TypeFlagsNonPrimitive != 0:
 * 		return c.emptyObjectType
 * 	case t.flags&TypeFlagsIndex != 0:
 * 		return c.stringNumberSymbolType
 * 	case t.flags&TypeFlagsUnknown != 0 && !c.strictNullChecks:
 * 		return c.emptyObjectType
 * 	}
 * 	return t
 * }
 */
export function Checker_getApparentType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const originalType = t;
  if ((t!.flags & TypeFlagsInstantiable) !== 0) {
    t = Checker_getBaseConstraintOfType(receiver, t);
    if (t === undefined) {
      t = receiver!.unknownType;
    }
  }
  if ((t!.objectFlags & ObjectFlagsMapped) !== 0) {
    return Checker_getApparentTypeOfMappedType(receiver, t);
  } else if ((t!.objectFlags & ObjectFlagsReference) !== 0 && t !== originalType) {
    return Checker_getTypeWithThisArgument(receiver, t, originalType, false);
  } else if ((t!.flags & TypeFlagsIntersection) !== 0) {
    return Checker_getApparentTypeOfIntersectionType(receiver, t, originalType);
  } else if ((t!.flags & TypeFlagsStringLike) !== 0) {
    return receiver!.globalStringType;
  } else if ((t!.flags & TypeFlagsNumberLike) !== 0) {
    return receiver!.globalNumberType;
  } else if ((t!.flags & TypeFlagsBigIntLike) !== 0) {
    return receiver!.getGlobalBigIntType!();
  } else if ((t!.flags & TypeFlagsBooleanLike) !== 0) {
    return receiver!.globalBooleanType;
  } else if ((t!.flags & TypeFlagsESSymbolLike) !== 0) {
    return receiver!.getGlobalESSymbolType!();
  } else if ((t!.flags & TypeFlagsNonPrimitive) !== 0) {
    return receiver!.emptyObjectType;
  } else if ((t!.flags & TypeFlagsIndex) !== 0) {
    return receiver!.stringNumberSymbolType;
  } else if ((t!.flags & TypeFlagsUnknown) !== 0 && !receiver!.strictNullChecks) {
    return receiver!.emptyObjectType;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getApparentTypeOfMappedType","kind":"method","status":"implemented","sigHash":"de0d9221c7c7e208d8dc2603bf8b0d25d4c5aa06ea3d61e7826d46d74029a976"}
 *
 * Go source:
 * func (c *Checker) getApparentTypeOfMappedType(t *Type) *Type {
 * 	m := t.AsMappedType()
 * 	if m.resolvedApparentType == nil {
 * 		m.resolvedApparentType = c.getResolvedApparentTypeOfMappedType(t)
 * 	}
 * 	return m.resolvedApparentType
 * }
 */
export function Checker_getApparentTypeOfMappedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const m = Type_AsMappedType(t);
  if (m!.resolvedApparentType === undefined) {
    m!.resolvedApparentType = Checker_getResolvedApparentTypeOfMappedType(receiver, t);
  }
  return m!.resolvedApparentType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getResolvedApparentTypeOfMappedType","kind":"method","status":"implemented","sigHash":"05e872a8ddda1f8ada7468a0d081b2089ae803cfacc38ae75dffbeac166645e7"}
 *
 * Go source:
 * func (c *Checker) getResolvedApparentTypeOfMappedType(t *Type) *Type {
 * 	target := core.OrElse(t.AsMappedType().target, t)
 * 	typeVariable := c.getHomomorphicTypeVariable(target)
 * 	if typeVariable != nil && target.AsMappedType().declaration.NameType == nil {
 * 		// We have a homomorphic mapped type or an instantiation of a homomorphic mapped type, i.e. a type
 * 		// of the form { [P in keyof T]: X }. Obtain the modifiers type (the T of the keyof T), and if it is
 * 		// another generic mapped type, recursively obtain its apparent type. Otherwise, obtain its base
 * 		// constraint. Then, if every constituent of the base constraint is an array or tuple type, apply
 * 		// this mapped type to the base constraint. It is safe to recurse when the modifiers type is a
 * 		// mapped type because we protect again circular constraints in getTypeFromMappedTypeNode.
 * 		modifiersType := c.getModifiersTypeFromMappedType(t)
 * 		var baseConstraint *Type
 * 		if c.isGenericMappedType(modifiersType) {
 * 			baseConstraint = c.getApparentTypeOfMappedType(modifiersType)
 * 		} else {
 * 			baseConstraint = c.getBaseConstraintOfType(modifiersType)
 * 		}
 * 		if baseConstraint != nil && everyType(baseConstraint, func(t *Type) bool { return c.isArrayOrTupleType(t) || c.isArrayOrTupleOrIntersection(t) }) {
 * 			return c.instantiateType(target, prependTypeMapping(typeVariable, baseConstraint, t.AsMappedType().mapper))
 * 		}
 * 	}
 * 	return t
 * }
 */
export function Checker_getResolvedApparentTypeOfMappedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const target = core.OrElse(Type_Target(t), t, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
  const typeVariable = Checker_getHomomorphicTypeVariable(receiver, target);
  if (typeVariable !== undefined && AsMappedTypeNode(Type_AsMappedType(target)!.declaration)!.NameType === undefined) {
    const modifiersType = Checker_getModifiersTypeFromMappedType(receiver, t);
    let baseConstraint: GoPtr<Type>;
    if (Checker_isGenericMappedType(receiver, modifiersType)) {
      baseConstraint = Checker_getApparentTypeOfMappedType(receiver, modifiersType);
    } else {
      baseConstraint = Checker_getBaseConstraintOfType(receiver, modifiersType);
    }
    if (baseConstraint !== undefined && everyType(baseConstraint, (ty: GoPtr<Type>): bool => Checker_isArrayOrTupleType(receiver, ty) || Checker_isArrayOrTupleOrIntersection(receiver, ty))) {
      return Checker_instantiateType(receiver, target, prependTypeMapping(typeVariable, baseConstraint, Type_Mapper(t)));
    }
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getApparentTypeOfIntersectionType","kind":"method","status":"implemented","sigHash":"4d1d353befad68c55da21ac46ba43cf9a97602d83ef7f5f1400e3bf945ae9cd8"}
 *
 * Go source:
 * func (c *Checker) getApparentTypeOfIntersectionType(t *Type, thisArgument *Type) *Type {
 * 	if t == thisArgument {
 * 		d := t.AsIntersectionType()
 * 		if d.resolvedApparentType == nil {
 * 			d.resolvedApparentType = c.getTypeWithThisArgument(t, thisArgument, true /*needApparentType* /)
 * 		}
 * 		return d.resolvedApparentType
 * 	}
 * 	key := CachedTypeKey{kind: CachedTypeKindApparentType, typeId: thisArgument.id}
 * 	result := c.cachedTypes[key]
 * 	if result == nil {
 * 		result = c.getTypeWithThisArgument(t, thisArgument, true /*needApparentType* /)
 * 		c.cachedTypes[key] = result
 * 	}
 * 	return result
 * }
 */
export function Checker_getApparentTypeOfIntersectionType(receiver: GoPtr<Checker>, t: GoPtr<Type>, thisArgument: GoPtr<Type>): GoPtr<Type> {
  if (t === thisArgument) {
    const d = Type_AsIntersectionType(t);
    if (d!.resolvedApparentType === undefined) {
      d!.resolvedApparentType = Checker_getTypeWithThisArgument(receiver, t, thisArgument, true);
    }
    return d!.resolvedApparentType;
  }
  const key: CachedTypeKey = { kind: CachedTypeKindApparentType, typeId: thisArgument!.id };
  const result = receiver!.cachedTypes.get(key);
  if (result === undefined) {
    const newResult = Checker_getTypeWithThisArgument(receiver, t, thisArgument, true);
    receiver!.cachedTypes.set(key, newResult);
    return newResult;
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getReducedType","kind":"method","status":"implemented","sigHash":"71d5d5e9e1c6adafd2aea92d0ec4d0d72f5cc585ade5cf38a28e3a67ebbb89b3"}
 *
 * Go source:
 * func (c *Checker) getReducedType(t *Type) *Type {
 * 	switch {
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		if t.objectFlags&ObjectFlagsContainsIntersections != 0 {
 * 			if reducedType := t.AsUnionType().resolvedReducedType; reducedType != nil {
 * 				return reducedType
 * 			}
 * 			reducedType := c.getReducedUnionType(t)
 * 			t.AsUnionType().resolvedReducedType = reducedType
 * 			return reducedType
 * 		}
 * 	case t.flags&TypeFlagsIntersection != 0:
 * 		if t.objectFlags&ObjectFlagsIsNeverIntersectionComputed == 0 {
 * 			t.objectFlags |= ObjectFlagsIsNeverIntersectionComputed
 * 			if core.Some(c.getPropertiesOfUnionOrIntersectionType(t), c.isNeverReducedProperty) {
 * 				t.objectFlags |= ObjectFlagsIsNeverIntersection
 * 			}
 * 		}
 * 		if t.objectFlags&ObjectFlagsIsNeverIntersection != 0 {
 * 			return c.neverType
 * 		}
 * 	}
 * 	return t
 * }
 */
export function Checker_getReducedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    if ((t!.objectFlags & ObjectFlagsContainsIntersections) !== 0) {
      const resolvedReducedType = Type_AsUnionType(t)!.resolvedReducedType;
      if (resolvedReducedType !== undefined) {
        return resolvedReducedType;
      }
      const reducedType = Checker_getReducedUnionType(receiver, t);
      Type_AsUnionType(t)!.resolvedReducedType = reducedType;
      return reducedType;
    }
  } else if ((t!.flags & TypeFlagsIntersection) !== 0) {
    if ((t!.objectFlags & ObjectFlagsIsNeverIntersectionComputed) === 0) {
      t!.objectFlags |= ObjectFlagsIsNeverIntersectionComputed;
      if (core.Some(Checker_getPropertiesOfUnionOrIntersectionType(receiver, t), (prop) => Checker_isNeverReducedProperty(receiver, prop))) {
        t!.objectFlags |= ObjectFlagsIsNeverIntersection;
      }
    }
    if ((t!.objectFlags & ObjectFlagsIsNeverIntersection) !== 0) {
      return receiver!.neverType;
    }
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getReducedUnionType","kind":"method","status":"implemented","sigHash":"ee773067b639efc40359c01bb474f455951ab40e9871bf941dcae4d28c1d2b71"}
 *
 * Go source:
 * func (c *Checker) getReducedUnionType(unionType *Type) *Type {
 * 	reducedTypes := core.SameMap(unionType.Types(), c.getReducedType)
 * 	if core.Same(reducedTypes, unionType.Types()) {
 * 		return unionType
 * 	}
 * 	reduced := c.getUnionType(reducedTypes)
 * 	if reduced.flags&TypeFlagsUnion != 0 {
 * 		reduced.AsUnionType().resolvedReducedType = reduced
 * 	}
 * 	return reduced
 * }
 */
export function Checker_getReducedUnionType(receiver: GoPtr<Checker>, unionType: GoPtr<Type>): GoPtr<Type> {
  const reducedTypes = core.SameMap(Type_Types(unionType), (t) => Checker_getReducedType(receiver, t), GoEqualStrict<GoPtr<Type>>);
  if (core.Same(reducedTypes, Type_Types(unionType))) {
    return unionType;
  }
  const reduced = Checker_getUnionType(receiver, reducedTypes);
  if ((reduced!.flags & TypeFlagsUnion) !== 0) {
    Type_AsUnionType(reduced)!.resolvedReducedType = reduced;
  }
  return reduced;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getReducedApparentType","kind":"method","status":"implemented","sigHash":"855a1a471ec3610ff09aaccbdcb9f16a628b647a7469b8f70fb725cc1a038643"}
 *
 * Go source:
 * func (c *Checker) getReducedApparentType(t *Type) *Type {
 * 	// Since getApparentType may return a non-reduced union or intersection type, we need to perform
 * 	// type reduction both before and after obtaining the apparent type. For example, given a type parameter
 * 	// 'T extends A | B', the type 'T & X' becomes 'A & X | B & X' after obtaining the apparent type, and
 * 	// that type may need further reduction to remove empty intersections.
 * 	return c.getReducedType(c.getApparentType(c.getReducedType(t)))
 * }
 */
export function Checker_getReducedApparentType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getReducedType(receiver, Checker_getApparentType(receiver, Checker_getReducedType(receiver, t)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.elaborateNeverIntersection","kind":"method","status":"implemented","sigHash":"047ef8d733de17d6ecf5e87e86bd54a5d1389f706960fbdb812558380e97c2ed"}
 *
 * Go source:
 * func (c *Checker) elaborateNeverIntersection(chain *ast.Diagnostic, node *ast.Node, t *Type) *ast.Diagnostic {
 * 	if t.flags&TypeFlagsIntersection != 0 && t.objectFlags&ObjectFlagsIsNeverIntersection != 0 {
 * 		neverProp := core.Find(c.getPropertiesOfUnionOrIntersectionType(t), c.isDiscriminantWithNeverType)
 * 		if neverProp != nil {
 * 			return NewDiagnosticChainForNode(chain, node, diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_has_conflicting_types_in_some_constituents, c.typeToStringEx(t, nil, TypeFormatFlagsNoTypeReduction, nil), c.symbolToString(neverProp))
 * 		}
 * 		privateProp := core.Find(c.getPropertiesOfUnionOrIntersectionType(t), isConflictingPrivateProperty)
 * 		if privateProp != nil {
 * 			return NewDiagnosticChainForNode(chain, node, diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_exists_in_multiple_constituents_and_is_private_in_some, c.typeToStringEx(t, nil, TypeFormatFlagsNoTypeReduction, nil), c.symbolToString(privateProp))
 * 		}
 * 	}
 * 	return chain
 * }
 */
export function Checker_elaborateNeverIntersection(receiver: GoPtr<Checker>, chain: GoPtr<Diagnostic>, node: GoPtr<Node>, t: GoPtr<Type>): GoPtr<Diagnostic> {
  if ((t!.flags & TypeFlagsIntersection) !== 0 && (t!.objectFlags & ObjectFlagsIsNeverIntersection) !== 0) {
    const neverProp = core.Find(Checker_getPropertiesOfUnionOrIntersectionType(receiver, t), (prop: GoPtr<Symbol>): bool => Checker_isDiscriminantWithNeverType(receiver, prop), GoZeroPointer<Symbol>);
    if (neverProp !== undefined) {
      return NewDiagnosticChainForNode(chain, node, diagnosticsMessages.The_intersection_0_was_reduced_to_never_because_property_1_has_conflicting_types_in_some_constituents, Checker_TypeToStringEx(receiver, t, undefined, TypeFormatFlagsNoTypeReduction, undefined), Checker_symbolToString(receiver, neverProp));
    }
    const privateProp = core.Find(Checker_getPropertiesOfUnionOrIntersectionType(receiver, t), isConflictingPrivateProperty, GoZeroPointer<Symbol>);
    if (privateProp !== undefined) {
      return NewDiagnosticChainForNode(chain, node, diagnosticsMessages.The_intersection_0_was_reduced_to_never_because_property_1_exists_in_multiple_constituents_and_is_private_in_some, Checker_TypeToStringEx(receiver, t, undefined, TypeFormatFlagsNoTypeReduction, undefined), Checker_symbolToString(receiver, privateProp));
    }
  }
  return chain;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateType","kind":"method","status":"implemented","sigHash":"f80277748037fce243542ff5c5bdf56c1d1652d92a09b4e1c9ae3a14949267d5"}
 *
 * Go source:
 * func (c *Checker) instantiateType(t *Type, m *TypeMapper) *Type {
 * 	return c.instantiateTypeWithAlias(t, m, nil /*alias* /)
 * }
 */
export function Checker_instantiateType(receiver: GoPtr<Checker>, t: GoPtr<Type>, m: GoPtr<TypeMapper>): GoPtr<Type> {
  return Checker_instantiateTypeWithAlias(receiver, t, m, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.couldContainTypeVariablesWorker","kind":"method","status":"implemented","sigHash":"8744ffc671052c6dccdb4ceae6d9108361b41c36f4899cd4917e19f12443e861"}
 *
 * Go source:
 * func (c *Checker) couldContainTypeVariablesWorker(t *Type) bool {
 * 	if t.flags&TypeFlagsStructuredOrInstantiable == 0 {
 * 		return false
 * 	}
 * 	objectFlags := t.objectFlags
 * 	if objectFlags&ObjectFlagsCouldContainTypeVariablesComputed != 0 {
 * 		return objectFlags&ObjectFlagsCouldContainTypeVariables != 0
 * 	}
 * 	result := t.flags&TypeFlagsInstantiable != 0 ||
 * 		t.flags&TypeFlagsObject != 0 && !c.isNonGenericTopLevelType(t) && (objectFlags&ObjectFlagsReference != 0 && (t.AsTypeReference().node != nil || core.Some(c.getTypeArguments(t), c.couldContainTypeVariables)) ||
 * 			objectFlags&ObjectFlagsAnonymous != 0 && t.symbol != nil && t.symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod|ast.SymbolFlagsClass|ast.SymbolFlagsTypeLiteral|ast.SymbolFlagsObjectLiteral) != 0 && t.symbol.Declarations != nil ||
 * 			objectFlags&(ObjectFlagsMapped|ObjectFlagsReverseMapped|ObjectFlagsObjectRestType|ObjectFlagsInstantiationExpressionType) != 0) ||
 * 		t.flags&TypeFlagsUnionOrIntersection != 0 && t.flags&TypeFlagsEnumLiteral == 0 && !c.isNonGenericTopLevelType(t) && core.Some(t.Types(), c.couldContainTypeVariables)
 * 	t.objectFlags |= ObjectFlagsCouldContainTypeVariablesComputed | core.IfElse(result, ObjectFlagsCouldContainTypeVariables, 0)
 * 	return result
 * }
 */
export function Checker_couldContainTypeVariablesWorker(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if ((t!.flags & TypeFlagsStructuredOrInstantiable) === 0) {
    return false;
  }
  const objectFlags = t!.objectFlags;
  if ((objectFlags & ObjectFlagsCouldContainTypeVariablesComputed) !== 0) {
    return ((objectFlags & ObjectFlagsCouldContainTypeVariables) !== 0) as bool;
  }
  const result = (((t!.flags & TypeFlagsInstantiable) !== 0) ||
    ((t!.flags & TypeFlagsObject) !== 0 && !Checker_isNonGenericTopLevelType(receiver, t) &&
      (((objectFlags & ObjectFlagsReference) !== 0 &&
        (Type_AsTypeReference(t)!.node !== undefined || core.Some(Checker_getTypeArguments(receiver, t), (typeArgument: GoPtr<Type>): bool => receiver!.couldContainTypeVariables!(typeArgument)))) ||
        ((objectFlags & ObjectFlagsAnonymous) !== 0 && t!.symbol !== undefined &&
          (t!.symbol.Flags & (SymbolFlagsFunction | SymbolFlagsMethod | SymbolFlagsClass | SymbolFlagsTypeLiteral | SymbolFlagsObjectLiteral)) !== 0 &&
          !GoSliceIsNil(t!.symbol.Declarations)) ||
        ((objectFlags & (ObjectFlagsMapped | ObjectFlagsReverseMapped | ObjectFlagsObjectRestType | ObjectFlagsInstantiationExpressionType)) !== 0))) ||
    ((t!.flags & TypeFlagsUnionOrIntersection) !== 0 && (t!.flags & TypeFlagsEnumLiteral) === 0 && !Checker_isNonGenericTopLevelType(receiver, t) &&
      core.Some(Type_Types(t), (type_: GoPtr<Type>): bool => receiver!.couldContainTypeVariables!(type_)))) as bool;
  t!.objectFlags |= (ObjectFlagsCouldContainTypeVariablesComputed | (result ? ObjectFlagsCouldContainTypeVariables : 0)) as ObjectFlags;
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isNonGenericTopLevelType","kind":"method","status":"implemented","sigHash":"5bbe77aae4023e008a4426fb210f36178bdcb2ff2002eeba9b919afc60c5660c"}
 *
 * Go source:
 * func (c *Checker) isNonGenericTopLevelType(t *Type) bool {
 * 	if t.alias != nil && len(t.alias.typeArguments) == 0 {
 * 		declaration := ast.GetDeclarationOfKind(t.alias.symbol, ast.KindTypeAliasDeclaration)
 * 		if declaration == nil {
 * 			declaration = ast.GetDeclarationOfKind(t.alias.symbol, ast.KindJSTypeAliasDeclaration)
 * 		}
 * 		return declaration != nil && ast.FindAncestorOrQuit(declaration.Parent, func(n *ast.Node) ast.FindAncestorResult {
 * 			switch n.Kind {
 * 			case ast.KindSourceFile:
 * 				return ast.FindAncestorTrue
 * 			case ast.KindModuleDeclaration:
 * 				return ast.FindAncestorFalse
 * 			}
 * 			return ast.FindAncestorQuit
 * 		}) != nil
 * 	}
 * 	return false
 * }
 */
export function Checker_isNonGenericTopLevelType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if (t!.alias !== undefined && t!.alias.typeArguments.length === 0) {
    let declaration = GetDeclarationOfKind(t!.alias.symbol, KindTypeAliasDeclaration);
    if (declaration === undefined) {
      declaration = GetDeclarationOfKind(t!.alias.symbol, KindJSTypeAliasDeclaration);
    }
    return (declaration !== undefined && FindAncestorOrQuit(declaration!.Parent, (n: GoPtr<Node>) => {
      switch (n!.Kind) {
        case KindSourceFile:
          return FindAncestorTrue;
        case KindModuleDeclaration:
          return FindAncestorFalse;
      }
      return FindAncestorQuit;
    }) !== undefined) as bool;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateTypeWorker","kind":"method","status":"implemented","sigHash":"9238fda8f9365271bc3432994231d51417b7fe8d9f6a35cbd2d3e5293de04828"}
 *
 * Go source:
 * func (c *Checker) instantiateTypeWorker(t *Type, m *TypeMapper, alias *TypeAlias) *Type {
 * 	flags := t.flags
 * 	switch {
 * 	case flags&TypeFlagsTypeParameter != 0:
 * 		return m.Map(t)
 * 	case flags&TypeFlagsObject != 0:
 * 		objectFlags := t.objectFlags
 * 		if objectFlags&(ObjectFlagsReference|ObjectFlagsAnonymous|ObjectFlagsMapped) != 0 {
 * 			if objectFlags&ObjectFlagsReference != 0 && t.AsTypeReference().node == nil {
 * 				resolvedTypeArguments := t.AsTypeReference().resolvedTypeArguments
 * 				newTypeArguments := c.instantiateTypes(resolvedTypeArguments, m)
 * 				if core.Same(newTypeArguments, resolvedTypeArguments) {
 * 					return t
 * 				}
 * 				return c.createNormalizedTypeReference(t.Target(), newTypeArguments)
 * 			}
 * 			if objectFlags&ObjectFlagsReverseMapped != 0 {
 * 				return c.instantiateReverseMappedType(t, m)
 * 			}
 * 			return c.getObjectTypeInstantiation(t, m, alias)
 * 		}
 * 		return t
 * 	case flags&TypeFlagsUnionOrIntersection != 0:
 * 		source := t
 * 		if t.flags&TypeFlagsUnion != 0 {
 * 			origin := t.AsUnionType().origin
 * 			if origin != nil && origin.flags&TypeFlagsUnionOrIntersection != 0 {
 * 				source = origin
 * 			}
 * 		}
 * 		types := source.Types()
 * 		newTypes := c.instantiateTypes(types, m)
 * 		if core.Same(newTypes, types) && alias.Symbol() == t.alias.Symbol() {
 * 			return t
 * 		}
 * 		if alias == nil {
 * 			alias = c.instantiateTypeAlias(t.alias, m)
 * 		}
 * 		if source.flags&TypeFlagsIntersection != 0 {
 * 			return c.getIntersectionTypeEx(newTypes, IntersectionFlagsNone, alias)
 * 		}
 * 		return c.getUnionTypeEx(newTypes, UnionReductionLiteral, alias, nil /*origin* /)
 * 	case flags&TypeFlagsIndex != 0:
 * 		return c.getIndexType(c.instantiateType(t.Target(), m))
 * 	case flags&TypeFlagsIndexedAccess != 0:
 * 		if alias == nil {
 * 			alias = c.instantiateTypeAlias(t.alias, m)
 * 		}
 * 		d := t.AsIndexedAccessType()
 * 		return c.getIndexedAccessTypeEx(c.instantiateType(d.objectType, m), c.instantiateType(d.indexType, m), d.accessFlags, nil /*accessNode* /, alias)
 * 	case flags&TypeFlagsTemplateLiteral != 0:
 * 		return c.getTemplateLiteralType(t.AsTemplateLiteralType().texts, c.instantiateTypes(t.AsTemplateLiteralType().types, m))
 * 	case flags&TypeFlagsStringMapping != 0:
 * 		return c.getStringMappingType(t.symbol, c.instantiateType(t.AsStringMappingType().target, m))
 * 	case flags&TypeFlagsConditional != 0:
 * 		return c.getConditionalTypeInstantiation(t, c.combineTypeMappers(t.AsConditionalType().mapper, m), false /*forConstraint* /, alias)
 * 	case flags&TypeFlagsSubstitution != 0:
 * 		newBaseType := c.instantiateType(t.AsSubstitutionType().baseType, m)
 * 		if c.isNoInferType(t) {
 * 			return c.getNoInferType(newBaseType)
 * 		}
 * 		newConstraint := c.instantiateType(t.AsSubstitutionType().constraint, m)
 * 		// A substitution type originates in the true branch of a conditional type and can be resolved
 * 		// to just the base type in the same cases as the conditional type resolves to its true branch
 * 		// (because the base type is then known to satisfy the constraint).
 * 		if newBaseType.flags&TypeFlagsTypeVariable != 0 && c.isGenericType(newConstraint) {
 * 			return c.getSubstitutionType(newBaseType, newConstraint)
 * 		}
 * 		if newConstraint.flags&TypeFlagsAnyOrUnknown != 0 || c.isTypeAssignableTo(c.getRestrictiveInstantiation(newBaseType), c.getRestrictiveInstantiation(newConstraint)) {
 * 			return newBaseType
 * 		}
 * 		if newBaseType.flags&TypeFlagsTypeVariable != 0 {
 * 			return c.getSubstitutionType(newBaseType, newConstraint)
 * 		}
 * 		return c.getIntersectionType([]*Type{newConstraint, newBaseType})
 * 	}
 * 	return t
 * }
 */
export function Checker_instantiateTypeWorker(receiver: GoPtr<Checker>, t: GoPtr<Type>, m: GoPtr<TypeMapper>, alias: GoPtr<TypeAlias>): GoPtr<Type> {
  const flags = t!.flags;
  if ((flags & TypeFlagsTypeParameter) !== 0) {
    return TypeMapper_Map(m, t);
  }
  if ((flags & TypeFlagsObject) !== 0) {
    const objectFlags = t!.objectFlags;
    if ((objectFlags & (ObjectFlagsReference | ObjectFlagsAnonymous | ObjectFlagsMapped)) !== 0) {
      if ((objectFlags & ObjectFlagsReference) !== 0 && Type_AsTypeReference(t)!.node === undefined) {
        const resolvedTypeArguments = Type_AsTypeReference(t)!.resolvedTypeArguments;
        const newTypeArguments = Checker_instantiateTypes(receiver, resolvedTypeArguments, m);
        if (core.Same(newTypeArguments, resolvedTypeArguments)) {
          return t;
        }
        return Checker_createNormalizedTypeReference(receiver, Type_Target(t), newTypeArguments);
      }
      if ((objectFlags & ObjectFlagsReverseMapped) !== 0) {
        return Checker_instantiateReverseMappedType(receiver, t, m);
      }
      return Checker_getObjectTypeInstantiation(receiver, t, m, alias);
    }
    return t;
  }
  if ((flags & TypeFlagsUnionOrIntersection) !== 0) {
    let source = t;
    if ((t!.flags & TypeFlagsUnion) !== 0) {
      const origin = Type_AsUnionType(t)!.origin;
      if (origin !== undefined && (origin!.flags & TypeFlagsUnionOrIntersection) !== 0) {
        source = origin;
      }
    }
    const types = Type_Types(source);
    const newTypes = Checker_instantiateTypes(receiver, types, m);
    if (core.Same(newTypes, types) && TypeAlias_Symbol(alias) === TypeAlias_Symbol(t!.alias)) {
      return t;
    }
    let newAlias = alias;
    if (newAlias === undefined) {
      newAlias = Checker_instantiateTypeAlias(receiver, t!.alias, m);
    }
    if ((source!.flags & TypeFlagsIntersection) !== 0) {
      return Checker_getIntersectionTypeEx(receiver, newTypes, IntersectionFlagsNone, newAlias);
    }
    return Checker_getUnionTypeEx(receiver, newTypes, UnionReductionLiteral, newAlias, undefined);
  }
  if ((flags & TypeFlagsIndex) !== 0) {
    return Checker_getIndexType(receiver, Checker_instantiateType(receiver, Type_Target(t), m));
  }
  if ((flags & TypeFlagsIndexedAccess) !== 0) {
    let newAlias = alias;
    if (newAlias === undefined) {
      newAlias = Checker_instantiateTypeAlias(receiver, t!.alias, m);
    }
    const d = Type_AsIndexedAccessType(t);
    return Checker_getIndexedAccessTypeEx(
      receiver,
      Checker_instantiateType(receiver, d!.objectType, m),
      Checker_instantiateType(receiver, d!.indexType, m),
      d!.accessFlags,
      undefined,
      newAlias,
    );
  }
  if ((flags & TypeFlagsTemplateLiteral) !== 0) {
    const templateLiteral = Type_AsTemplateLiteralType(t);
    return Checker_getTemplateLiteralType(receiver, templateLiteral!.texts, Checker_instantiateTypes(receiver, templateLiteral!.types, m));
  }
  if ((flags & TypeFlagsStringMapping) !== 0) {
    return Checker_getStringMappingType(receiver, t!.symbol, Checker_instantiateType(receiver, Type_AsStringMappingType(t)!.target, m));
  }
  if ((flags & TypeFlagsConditional) !== 0) {
    return Checker_getConditionalTypeInstantiation(receiver, t, Checker_combineTypeMappers(receiver, Type_AsConditionalType(t)!.mapper, m), false, alias);
  }
  if ((flags & TypeFlagsSubstitution) !== 0) {
    const newBaseType = Checker_instantiateType(receiver, Type_AsSubstitutionType(t)!.baseType, m);
    if (Checker_isNoInferType(receiver, t)) {
      return Checker_getNoInferType(receiver, newBaseType);
    }
    const newConstraint = Checker_instantiateType(receiver, Type_AsSubstitutionType(t)!.constraint, m);
    if ((newBaseType!.flags & TypeFlagsTypeVariable) !== 0 && Checker_isGenericType(receiver, newConstraint)) {
      return Checker_getSubstitutionType(receiver, newBaseType, newConstraint);
    }
    if ((newConstraint!.flags & TypeFlagsAnyOrUnknown) !== 0 || Checker_isTypeAssignableTo(receiver, Checker_getRestrictiveInstantiation(receiver, newBaseType), Checker_getRestrictiveInstantiation(receiver, newConstraint))) {
      return newBaseType;
    }
    if ((newBaseType!.flags & TypeFlagsTypeVariable) !== 0) {
      return Checker_getSubstitutionType(receiver, newBaseType, newConstraint);
    }
    return Checker_getIntersectionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, newConstraint, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, newBaseType, GoPointerValueOps<Type>());
    }));
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateAnonymousType","kind":"method","status":"implemented","sigHash":"0f96dd463b356e114b7466778e800c407288d6452db6b0d39ec104cc10484144"}
 *
 * Go source:
 * func (c *Checker) instantiateAnonymousType(t *Type, m *TypeMapper, alias *TypeAlias) *Type {
 * 	result := c.newObjectType(t.objectFlags&^(ObjectFlagsCouldContainTypeVariablesComputed|ObjectFlagsCouldContainTypeVariables)|ObjectFlagsInstantiated, t.symbol)
 * 	switch {
 * 	case t.objectFlags&ObjectFlagsMapped != 0:
 * 		result.AsMappedType().declaration = t.AsMappedType().declaration
 * 		// C.f. instantiateSignature
 * 		origTypeParameter := c.getTypeParameterFromMappedType(t)
 * 		freshTypeParameter := c.cloneTypeParameter(origTypeParameter)
 * 		result.AsMappedType().typeParameter = freshTypeParameter
 * 		m = c.combineTypeMappers(newSimpleTypeMapper(origTypeParameter, freshTypeParameter), m)
 * 		freshTypeParameter.AsTypeParameter().mapper = m
 * 	case t.objectFlags&ObjectFlagsInstantiationExpressionType != 0:
 * 		result.AsInstantiationExpressionType().node = t.AsInstantiationExpressionType().node
 * 	}
 * 	if alias == nil {
 * 		alias = c.instantiateTypeAlias(t.alias, m)
 * 	}
 * 	result.alias = alias
 * 	if alias != nil && len(alias.typeArguments) != 0 {
 * 		result.objectFlags |= c.getPropagatingFlagsOfTypes(result.alias.typeArguments, TypeFlagsNone)
 * 	}
 * 	d := result.AsObjectType()
 * 	d.target = t
 * 	d.mapper = m
 * 	return result
 * }
 */
export function Checker_instantiateAnonymousType(receiver: GoPtr<Checker>, t: GoPtr<Type>, m: GoPtr<TypeMapper>, alias: GoPtr<TypeAlias>): GoPtr<Type> {
  const objectFlags = ((t!.objectFlags & ~(ObjectFlagsCouldContainTypeVariablesComputed | ObjectFlagsCouldContainTypeVariables)) | ObjectFlagsInstantiated) >>> 0;
  const result = Checker_newObjectType(receiver, objectFlags, t!.symbol);
  if ((t!.objectFlags & ObjectFlagsMapped) !== 0) {
    Type_AsMappedType(result)!.declaration = Type_AsMappedType(t)!.declaration;
    const origTypeParameter = Checker_getTypeParameterFromMappedType(receiver, t);
    const freshTypeParameter = Checker_cloneTypeParameter(receiver, origTypeParameter);
    Type_AsMappedType(result)!.typeParameter = freshTypeParameter;
    m = Checker_combineTypeMappers(receiver, newSimpleTypeMapper(origTypeParameter, freshTypeParameter), m);
    Type_AsTypeParameter(freshTypeParameter)!.mapper = m;
  } else if ((t!.objectFlags & ObjectFlagsInstantiationExpressionType) !== 0) {
    Type_AsInstantiationExpressionType(result)!.node = Type_AsInstantiationExpressionType(t)!.node;
  }
  let newAlias = alias;
  if (newAlias === undefined) {
    newAlias = Checker_instantiateTypeAlias(receiver, t!.alias, m);
  }
  result!.alias = newAlias;
  if (newAlias !== undefined && newAlias.typeArguments.length !== 0) {
    result!.objectFlags |= Checker_getPropagatingFlagsOfTypes(receiver, newAlias.typeArguments, TypeFlagsNone);
  }
  const d = Type_AsObjectType(result);
  d!.target = t;
  d!.mapper = m;
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getHomomorphicTypeVariable","kind":"method","status":"implemented","sigHash":"cc2947bf48bf5501d3ce6cbfb73cefea449a69e68ef54b1fa70632576b5ecc17"}
 *
 * Go source:
 * func (c *Checker) getHomomorphicTypeVariable(t *Type) *Type {
 * 	constraintType := c.getConstraintTypeFromMappedType(t)
 * 	if constraintType.flags&TypeFlagsIndex != 0 {
 * 		typeVariable := c.getActualTypeVariable(constraintType.AsIndexType().target)
 * 		if typeVariable.flags&TypeFlagsTypeParameter != 0 {
 * 			return typeVariable
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getHomomorphicTypeVariable(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const constraintType = Checker_getConstraintTypeFromMappedType(receiver, t);
  if ((constraintType!.flags & TypeFlagsIndex) !== 0) {
    const typeVariable = Checker_getActualTypeVariable(receiver, Type_AsIndexType(constraintType)!.target);
    if ((typeVariable!.flags & TypeFlagsTypeParameter) !== 0) {
      return typeVariable;
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateMappedType","kind":"method","status":"implemented","sigHash":"4b42a9ef448979f28cd169d0d48a1348d29984c188d53a9b29c66e7ed6c1a444"}
 *
 * Go source:
 * func (c *Checker) instantiateMappedType(t *Type, m *TypeMapper, alias *TypeAlias) *Type {
 * 	// For a homomorphic mapped type { [P in keyof T]: X }, where T is some type variable, the mapping
 * 	// operation depends on T as follows:
 * 	// * If T is a primitive type no mapping is performed and the result is simply T.
 * 	// * If T is a union type we distribute the mapped type over the union.
 * 	// * If T is an array we map to an array where the element type has been transformed.
 * 	// * If T is a tuple we map to a tuple where the element types have been transformed.
 * 	// * If T is an intersection of array or tuple types we map to an intersection of transformed array or tuple types.
 * 	// * Otherwise we map to an object type where the type of each property has been transformed.
 * 	// For example, when T is instantiated to a union type A | B, we produce { [P in keyof A]: X } |
 * 	// { [P in keyof B]: X }, and when when T is instantiated to a union type A | undefined, we produce
 * 	// { [P in keyof A]: X } | undefined.
 * 	d := t.AsMappedType()
 * 	typeVariable := c.getHomomorphicTypeVariable(t)
 * 	var instantiateConstituent func(*Type) *Type
 * 	instantiateConstituent = func(s *Type) *Type {
 * 		if s.flags&(TypeFlagsAnyOrUnknown|TypeFlagsInstantiableNonPrimitive|TypeFlagsObject|TypeFlagsIntersection) == 0 || s == c.wildcardType || c.isErrorType(s) {
 * 			return s
 * 		}
 * 		if d.declaration.NameType == nil {
 * 			if c.isArrayType(s) || s.flags&TypeFlagsAny != 0 && c.findResolutionCycleStartIndex(typeVariable, TypeSystemPropertyNameResolvedBaseConstraint) < 0 && c.hasArrayOrTypeTypeConstraint(typeVariable) {
 * 				return c.instantiateMappedArrayType(s, t, prependTypeMapping(typeVariable, s, m))
 * 			}
 * 			if isTupleType(s) {
 * 				return c.instantiateMappedTupleType(s, t, typeVariable, m)
 * 			}
 * 			if c.isArrayOrTupleOrIntersection(s) {
 * 				return c.getIntersectionType(core.Map(s.Types(), instantiateConstituent))
 * 			}
 * 		}
 * 		return c.instantiateAnonymousType(t, prependTypeMapping(typeVariable, s, m), nil)
 * 	}
 * 	if typeVariable != nil {
 * 		mappedTypeVariable := c.instantiateType(typeVariable, m)
 * 		if typeVariable != mappedTypeVariable {
 * 			return c.mapTypeWithAlias(c.getReducedType(mappedTypeVariable), instantiateConstituent, alias)
 * 		}
 * 	}
 * 	// If the constraint type of the instantiation is the wildcard type, return the wildcard type.
 * 	if c.instantiateType(c.getConstraintTypeFromMappedType(t), m) == c.wildcardType {
 * 		return c.wildcardType
 * 	}
 * 	return c.instantiateAnonymousType(t, m, alias)
 * }
 */
export function Checker_instantiateMappedType(receiver: GoPtr<Checker>, t: GoPtr<Type>, m: GoPtr<TypeMapper>, alias: GoPtr<TypeAlias>): GoPtr<Type> {
  const d = Type_AsMappedType(t);
  const typeVariable = Checker_getHomomorphicTypeVariable(receiver, t);
  const instantiateConstituent = (s: GoPtr<Type>): GoPtr<Type> => {
    if ((s!.flags & (TypeFlagsAnyOrUnknown | TypeFlagsInstantiableNonPrimitive | TypeFlagsObject | TypeFlagsIntersection)) === 0 || s === receiver!.wildcardType || Checker_isErrorType(receiver, s)) {
      return s;
    }
    if (AsMappedTypeNode(d!.declaration)!.NameType === undefined) {
      if (
        Checker_isArrayType(receiver, s) ||
        ((s!.flags & TypeFlagsAny) !== 0 && Checker_findResolutionCycleStartIndex(receiver, typeVariable, TypeSystemPropertyNameResolvedBaseConstraint) < 0 && Checker_hasArrayOrTypeTypeConstraint(receiver, typeVariable))
      ) {
        return Checker_instantiateMappedArrayType(receiver, s, t, prependTypeMapping(typeVariable, s, m));
      }
      if (isTupleType(s)) {
        return Checker_instantiateMappedTupleType(receiver, s, t, typeVariable, m);
      }
      if (Checker_isArrayOrTupleOrIntersection(receiver, s)) {
        return Checker_getIntersectionType(receiver, core.Map(Type_Types(s), instantiateConstituent));
      }
    }
    return Checker_instantiateAnonymousType(receiver, t, prependTypeMapping(typeVariable, s, m), undefined);
  };
  if (typeVariable !== undefined) {
    const mappedTypeVariable = Checker_instantiateType(receiver, typeVariable, m);
    if (typeVariable !== mappedTypeVariable) {
      return Checker_mapTypeWithAlias(receiver, Checker_getReducedType(receiver, mappedTypeVariable), instantiateConstituent, alias);
    }
  }
  if (Checker_instantiateType(receiver, Checker_getConstraintTypeFromMappedType(receiver, t), m) === receiver!.wildcardType) {
    return receiver!.wildcardType;
  }
  return Checker_instantiateAnonymousType(receiver, t, m, alias);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateMappedArrayType","kind":"method","status":"implemented","sigHash":"e82bb78d07579da9e4393a426afc27bbac951ab05bfaac25268e475e85db82b9"}
 *
 * Go source:
 * func (c *Checker) instantiateMappedArrayType(arrayType *Type, mappedType *Type, m *TypeMapper) *Type {
 * 	elementType := c.instantiateMappedTypeTemplate(mappedType, c.numberType, true /*isOptional* /, m)
 * 	if c.isErrorType(elementType) {
 * 		return c.errorType
 * 	}
 * 	return c.createArrayTypeEx(elementType, getModifiedReadonlyState(c.isReadonlyArrayType(arrayType), getMappedTypeModifiers(mappedType)))
 * }
 */
export function Checker_instantiateMappedArrayType(receiver: GoPtr<Checker>, arrayType: GoPtr<Type>, mappedType: GoPtr<Type>, m: GoPtr<TypeMapper>): GoPtr<Type> {
  const elementType = Checker_instantiateMappedTypeTemplate(receiver, mappedType, receiver!.numberType, true, m);
  if (Checker_isErrorType(receiver, elementType)) {
    return receiver!.errorType;
  }
  return Checker_createArrayTypeEx(receiver, elementType, getModifiedReadonlyState(Checker_isReadonlyArrayType(receiver, arrayType), getMappedTypeModifiers(mappedType)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateMappedTupleType","kind":"method","status":"implemented","sigHash":"0b35283e66c1f32e92b0a4953ba4299ae4f3ebcb0dd1a960ba793352fdf2e14d"}
 *
 * Go source:
 * func (c *Checker) instantiateMappedTupleType(tupleType *Type, mappedType *Type, typeVariable *Type, m *TypeMapper) *Type {
 * 	// We apply the mapped type's template type to each of the fixed part elements. For variadic elements, we
 * 	// apply the mapped type itself to the variadic element type. For other elements in the variable part of the
 * 	// tuple, we surround the element type with an array type and apply the mapped type to that. This ensures
 * 	// that we get sequential property key types for the fixed part of the tuple, and property key type number
 * 	// for the remaining elements. For example
 * 	//
 * 	//   type Keys<T> = { [K in keyof T]: K };
 * 	//   type Foo<T extends any[]> = Keys<[string, string, ...T, string]>; // ["0", "1", ...Keys<T>, number]
 * 	//
 * 	elementInfos := tupleType.TargetTupleType().elementInfos
 * 	fixedLength := tupleType.TargetTupleType().fixedLength
 * 	fixedMapper := m
 * 	if fixedLength != 0 {
 * 		fixedMapper = prependTypeMapping(typeVariable, tupleType, m)
 * 	}
 * 	modifiers := getMappedTypeModifiers(mappedType)
 * 	elementTypes := c.getElementTypes(tupleType)
 * 	newElementTypes := make([]*Type, len(elementTypes))
 * 	newElementInfos := slices.Clone(elementInfos)
 * 	for i, e := range elementTypes {
 * 		flags := elementInfos[i].flags
 * 		var mapped *Type
 * 		switch {
 * 		case i < fixedLength:
 * 			mapped = c.instantiateMappedTypeTemplate(mappedType, c.getStringLiteralType(strconv.Itoa(i)), flags&ElementFlagsOptional != 0, fixedMapper)
 * 		case flags&ElementFlagsVariadic != 0:
 * 			mapped = c.instantiateType(mappedType, prependTypeMapping(typeVariable, e, m))
 * 		default:
 * 			mapped = c.getElementTypeOfArrayType(c.instantiateType(mappedType, prependTypeMapping(typeVariable, c.createArrayType(e), m)))
 * 			if mapped == nil {
 * 				mapped = c.unknownType
 * 			}
 * 		}
 * 		switch {
 * 		case modifiers&MappedTypeModifiersIncludeOptional != 0:
 * 			if flags&ElementFlagsRequired != 0 {
 * 				newElementInfos[i].flags = ElementFlagsOptional
 * 			}
 * 		case modifiers&MappedTypeModifiersExcludeOptional != 0:
 * 			if flags&ElementFlagsOptional != 0 {
 * 				newElementInfos[i].flags = ElementFlagsRequired
 * 			}
 * 		}
 * 		newElementTypes[i] = mapped
 * 	}
 * 	newReadonly := getModifiedReadonlyState(tupleType.TargetTupleType().readonly, getMappedTypeModifiers(mappedType))
 * 	if slices.Contains(newElementTypes, c.errorType) {
 * 		return c.errorType
 * 	}
 * 	return c.createTupleTypeEx(newElementTypes, newElementInfos, newReadonly)
 * }
 */
export function Checker_instantiateMappedTupleType(receiver: GoPtr<Checker>, tupleType: GoPtr<Type>, mappedType: GoPtr<Type>, typeVariable: GoPtr<Type>, m: GoPtr<TypeMapper>): GoPtr<Type> {
  const elementInfos = Type_TargetTupleType(tupleType)!.elementInfos;
  const fixedLength = Type_TargetTupleType(tupleType)!.fixedLength;
  let fixedMapper = m;
  if (fixedLength !== 0) {
    fixedMapper = prependTypeMapping(typeVariable, tupleType, m);
  }
  const modifiers = getMappedTypeModifiers(mappedType);
  const elementTypes = Checker_getElementTypes(receiver, tupleType);
  const newElementTypes: GoSlice<GoPtr<Type>> = new Array(elementTypes.length);
  // Go slices.Clone copies TupleElementInfo STRUCT VALUES; a shallow array
  // clone would share the info objects with the (interned) tuple target, and
  // the flags mutations below would corrupt every tuple of the same shape.
  const newElementInfos: TupleElementInfo[] = elementInfos.map((info) => ({ ...info }));
  for (let i = 0; i < elementTypes.length; i++) {
    const e = GoSliceLoad(elementTypes, i, GoPointerValueOps<Type>());
    const flags = elementInfos[i]!.flags;
    let mapped: GoPtr<Type>;
    if (i < fixedLength) {
      mapped = Checker_instantiateMappedTypeTemplate(receiver, mappedType, Checker_getStringLiteralType(receiver, strconv.Itoa(i)), (flags & ElementFlagsOptionalFlag) !== 0, fixedMapper);
    } else if ((flags & ElementFlagsVariadic) !== 0) {
      mapped = Checker_instantiateType(receiver, mappedType, prependTypeMapping(typeVariable, e, m));
    } else {
      mapped = Checker_getElementTypeOfArrayType(receiver, Checker_instantiateType(receiver, mappedType, prependTypeMapping(typeVariable, Checker_createArrayType(receiver, e), m)));
      if (mapped === undefined) {
        mapped = receiver!.unknownType;
      }
    }
    if ((modifiers & MappedTypeModifiersIncludeOptional) !== 0) {
      if ((flags & ElementFlagsRequired) !== 0) {
        newElementInfos[i]!.flags = ElementFlagsOptionalFlag;
      }
    } else if ((modifiers & MappedTypeModifiersExcludeOptional) !== 0) {
      if ((flags & ElementFlagsOptionalFlag) !== 0) {
        newElementInfos[i]!.flags = ElementFlagsRequired;
      }
    }
    GoSliceStore(newElementTypes, i, mapped, GoPointerValueOps<Type>());
  }
  const newReadonly = getModifiedReadonlyState(Type_TargetTupleType(tupleType)!.readonly, getMappedTypeModifiers(mappedType));
  if (slices.Contains(newElementTypes, receiver!.errorType, GoEqualStrict<GoPtr<Type>>)) {
    return receiver!.errorType;
  }
  return Checker_createTupleTypeEx(receiver, newElementTypes, newElementInfos, newReadonly);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateMappedTypeTemplate","kind":"method","status":"implemented","sigHash":"bdb8e546377b408341e294ccbeb8b45a69c1e3af0922c50cc8bd06b5c01d1cf3"}
 *
 * Go source:
 * func (c *Checker) instantiateMappedTypeTemplate(t *Type, key *Type, isOptional bool, m *TypeMapper) *Type {
 * 	templateMapper := appendTypeMapping(m, c.getTypeParameterFromMappedType(t), key)
 * 	propType := c.instantiateType(c.getTemplateTypeFromMappedType(core.OrElse(t.AsMappedType().target, t)), templateMapper)
 * 	modifiers := getMappedTypeModifiers(t)
 * 	switch {
 * 	case c.strictNullChecks && modifiers&MappedTypeModifiersIncludeOptional != 0 && !c.maybeTypeOfKind(propType, TypeFlagsUndefined|TypeFlagsVoid):
 * 		return c.getOptionalType(propType, true /*isProperty* /)
 * 	case c.strictNullChecks && modifiers&MappedTypeModifiersExcludeOptional != 0 && isOptional:
 * 		return c.getTypeWithFacts(propType, TypeFactsNEUndefined)
 * 	default:
 * 		return propType
 * 	}
 * }
 */
export function Checker_instantiateMappedTypeTemplate(receiver: GoPtr<Checker>, t: GoPtr<Type>, key: GoPtr<Type>, isOptional: bool, m: GoPtr<TypeMapper>): GoPtr<Type> {
  const templateMapper = appendTypeMapping(m, Checker_getTypeParameterFromMappedType(receiver, t), key);
  const mappedTarget = Type_AsMappedType(t)!.__tsgoEmbedded0!.target;
  const propType = Checker_instantiateType(receiver, Checker_getTemplateTypeFromMappedType(receiver, mappedTarget ?? t), templateMapper);
  const modifiers = getMappedTypeModifiers(t);
  if (receiver!.strictNullChecks && (modifiers & MappedTypeModifiersIncludeOptional) !== 0 && !Checker_maybeTypeOfKind(receiver, propType, TypeFlagsUndefined | TypeFlagsVoid)) {
    return Checker_getOptionalType(receiver, propType, true);
  }
  if (receiver!.strictNullChecks && (modifiers & MappedTypeModifiersExcludeOptional) !== 0 && isOptional) {
    return Checker_getTypeWithFacts(receiver, propType, TypeFactsNEUndefined);
  }
  return propType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTemplateTypeFromMappedType","kind":"method","status":"implemented","sigHash":"e877fe28d15211ab475aa15ae5343b802c0884da79ec9121718e9fb0730b618a"}
 *
 * Go source:
 * func (c *Checker) getTemplateTypeFromMappedType(t *Type) *Type {
 * 	m := t.AsMappedType()
 * 	if m.templateType == nil {
 * 		if m.declaration.Type != nil {
 * 			m.templateType = c.instantiateType(c.addOptionalityEx(c.getTypeFromTypeNode(m.declaration.Type) /*isProperty* /, true, getMappedTypeModifiers(t)&MappedTypeModifiersIncludeOptional != 0), m.mapper)
 * 		} else {
 * 			m.templateType = c.errorType
 * 		}
 * 	}
 * 	return m.templateType
 * }
 */
export function Checker_getTemplateTypeFromMappedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const m = Type_AsMappedType(t);
  if (m!.templateType === undefined) {
    if (Node_Type(m!.declaration) !== undefined) {
      m!.templateType = Checker_instantiateType(receiver, Checker_addOptionalityEx(receiver, Checker_getTypeFromTypeNode(receiver, Node_Type(m!.declaration)), true, (getMappedTypeModifiers(t) & MappedTypeModifiersIncludeOptional) !== 0), Type_Mapper(t));
    } else {
      m!.templateType = receiver!.errorType;
    }
  }
  return m!.templateType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getApparentMappedTypeKeys","kind":"method","status":"implemented","sigHash":"b6bc3863c238c94d22afccacaa20d99899d456debfc8afc670c9f19cf2a0a423"}
 *
 * Go source:
 * func (c *Checker) getApparentMappedTypeKeys(nameType *Type, targetType *Type) *Type {
 * 	modifiersType := c.getApparentType(c.getModifiersTypeFromMappedType(targetType))
 * 	var mappedKeys []*Type
 * 	c.forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(modifiersType, TypeFlagsStringOrNumberLiteralOrUnique, false, func(t *Type) {
 * 		mappedKeys = append(mappedKeys, c.instantiateType(nameType, appendTypeMapping(targetType.Mapper(), c.getTypeParameterFromMappedType(targetType), t)))
 * 	})
 * 	return c.getUnionType(mappedKeys)
 * }
 */
export function Checker_getApparentMappedTypeKeys(receiver: GoPtr<Checker>, nameType: GoPtr<Type>, targetType: GoPtr<Type>): GoPtr<Type> {
  const modifiersType = Checker_getApparentType(receiver, Checker_getModifiersTypeFromMappedType(receiver, targetType));
  let mappedKeys: GoSlice<GoPtr<Type>> = GoNilSlice();
  Checker_forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(receiver, modifiersType, TypeFlagsStringOrNumberLiteralOrUnique, false, (t: GoPtr<Type>): void => {
    mappedKeys = GoSliceAppend(mappedKeys, Checker_instantiateType(receiver, nameType, appendTypeMapping(Type_Mapper(targetType), Checker_getTypeParameterFromMappedType(receiver, targetType), t)), GoPointerValueOps<Type>());
  });
  return Checker_getUnionType(receiver, mappedKeys);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateReverseMappedType","kind":"method","status":"implemented","sigHash":"51a7e9de16d352110c0e0f53015b7a11194246a402cc4c01011fc33f638a407d"}
 *
 * Go source:
 * func (c *Checker) instantiateReverseMappedType(t *Type, m *TypeMapper) *Type {
 * 	r := t.AsReverseMappedType()
 * 	innerMappedType := c.instantiateType(r.mappedType, m)
 * 	if innerMappedType.objectFlags&ObjectFlagsMapped == 0 {
 * 		return t
 * 	}
 * 	innerIndexType := c.instantiateType(r.constraintType, m)
 * 	if innerIndexType.flags&TypeFlagsIndex == 0 {
 * 		return t
 * 	}
 * 	instantiated := c.inferTypeForHomomorphicMappedType(c.instantiateType(r.source, m), innerMappedType, innerIndexType)
 * 	if instantiated != nil {
 * 		return instantiated
 * 	}
 * 	return t
 * 	// Nested invocation of `inferTypeForHomomorphicMappedType` or the `source` instantiated into something unmappable
 * }
 */
export function Checker_instantiateReverseMappedType(receiver: GoPtr<Checker>, t: GoPtr<Type>, m: GoPtr<TypeMapper>): GoPtr<Type> {
  const r = Type_AsReverseMappedType(t);
  const innerMappedType = Checker_instantiateType(receiver, r!.mappedType, m);
  if ((innerMappedType!.objectFlags & ObjectFlagsMapped) === 0) {
    return t;
  }
  const innerIndexType = Checker_instantiateType(receiver, r!.constraintType, m);
  if ((innerIndexType!.flags & TypeFlagsIndex) === 0) {
    return t;
  }
  const instantiated = Checker_inferTypeForHomomorphicMappedType(receiver, Checker_instantiateType(receiver, r!.source, m), innerMappedType, innerIndexType);
  if (instantiated !== undefined) {
    return instantiated;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateTypes","kind":"method","status":"implemented","sigHash":"5cecb90bd7288826a13f1925764c4bfeeb0fdf0b87feb37b1301f01bf3b376f0"}
 *
 * Go source:
 * func (c *Checker) instantiateTypes(types []*Type, m *TypeMapper) []*Type {
 * 	return instantiateList(c, types, m, (*Checker).instantiateType)
 * }
 */
export function Checker_instantiateTypes(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, m: GoPtr<TypeMapper>): GoSlice<GoPtr<Type>> {
  return instantiateList(receiver, types, m, Checker_instantiateType, GoEqualStrict<GoPtr<Type>>);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.tryGetTypeFromTypeNode","kind":"method","status":"implemented","sigHash":"b5d143a72a6d57105e8935fa774894c3bcb0b92567c199a6d2340b96bcdbaee9"}
 *
 * Go source:
 * func (c *Checker) tryGetTypeFromTypeNode(node *ast.Node) *Type {
 * 	typeNode := node.Type()
 * 	if typeNode != nil {
 * 		return c.getTypeFromTypeNode(typeNode)
 * 	}
 * 	return nil
 * }
 */
export function Checker_tryGetTypeFromTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const typeNode = Node_Type(node);
  if (typeNode !== undefined) {
    return Checker_getTypeFromTypeNode(receiver, typeNode);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromTypeNode","kind":"method","status":"implemented","sigHash":"f8004377d01e726414e9209346eb4ddeb437e880df3d075e529b578e45281113"}
 *
 * Go source:
 * func (c *Checker) getTypeFromTypeNode(node *ast.Node) *Type {
 * 	return c.getConditionalFlowTypeOfType(c.getTypeFromTypeNodeWorker(node), node)
 * }
 */
export function Checker_getTypeFromTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  return Checker_getConditionalFlowTypeOfType(receiver, Checker_getTypeFromTypeNodeWorker(receiver, node), node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromTypeNodeWorker","kind":"method","status":"implemented","sigHash":"de6fe284fc14b3bce51cdcc9bf5e9ea9f29111e4232fbaa833e8942cfaa1c700"}
 *
 * Go source:
 * func (c *Checker) getTypeFromTypeNodeWorker(node *ast.Node) *Type {
 * 	switch node.Kind {
 * 	case ast.KindAnyKeyword, ast.KindJSDocAllType:
 * 		return c.anyType
 * 	case ast.KindJSDocNonNullableType:
 * 		return c.getTypeFromTypeNode(node.Type())
 * 	case ast.KindJSDocNullableType:
 * 		t := c.getTypeFromTypeNode(node.Type())
 * 		if c.strictNullChecks {
 * 			return c.getNullableType(t, TypeFlagsNull)
 * 		} else {
 * 			return t
 * 		}
 * 	case ast.KindJSDocVariadicType:
 * 		return c.createArrayType(c.getTypeFromTypeNode(node.AsJSDocVariadicType().Type))
 * 	case ast.KindJSDocOptionalType:
 * 		return c.addOptionality(c.getTypeFromTypeNode(node.Type()))
 * 	case ast.KindUnknownKeyword:
 * 		return c.unknownType
 * 	case ast.KindStringKeyword:
 * 		return c.stringType
 * 	case ast.KindNumberKeyword:
 * 		return c.numberType
 * 	case ast.KindBigIntKeyword:
 * 		return c.bigintType
 * 	case ast.KindBooleanKeyword:
 * 		return c.booleanType
 * 	case ast.KindSymbolKeyword:
 * 		return c.esSymbolType
 * 	case ast.KindVoidKeyword:
 * 		return c.voidType
 * 	case ast.KindUndefinedKeyword:
 * 		return c.undefinedType
 * 	case ast.KindNullKeyword:
 * 		return c.nullType
 * 	case ast.KindNeverKeyword:
 * 		return c.neverType
 * 	case ast.KindObjectKeyword:
 * 		return c.nonPrimitiveType
 * 	case ast.KindIntrinsicKeyword:
 * 		return c.intrinsicMarkerType
 * 	case ast.KindThisType, ast.KindThisKeyword:
 * 		return c.getTypeFromThisTypeNode(node)
 * 	case ast.KindLiteralType:
 * 		return c.getTypeFromLiteralTypeNode(node)
 * 	case ast.KindTypeReference, ast.KindExpressionWithTypeArguments:
 * 		return c.getTypeFromTypeReference(node)
 * 	case ast.KindTypePredicate:
 * 		if node.AsTypePredicateNode().AssertsModifier != nil {
 * 			return c.voidType
 * 		}
 * 		return c.booleanType
 * 	case ast.KindTypeQuery:
 * 		return c.getTypeFromTypeQueryNode(node)
 * 	case ast.KindArrayType, ast.KindTupleType:
 * 		return c.getTypeFromArrayOrTupleTypeNode(node)
 * 	case ast.KindOptionalType:
 * 		return c.getTypeFromOptionalTypeNode(node)
 * 	case ast.KindUnionType:
 * 		return c.getTypeFromUnionTypeNode(node)
 * 	case ast.KindIntersectionType:
 * 		return c.getTypeFromIntersectionTypeNode(node)
 * 	case ast.KindNamedTupleMember:
 * 		return c.getTypeFromNamedTupleTypeNode(node)
 * 	case ast.KindParenthesizedType:
 * 		return c.getTypeFromTypeNode(node.Type())
 * 	case ast.KindRestType:
 * 		return c.getTypeFromRestTypeNode(node)
 * 	case ast.KindFunctionType, ast.KindConstructorType, ast.KindTypeLiteral:
 * 		return c.getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node)
 * 	case ast.KindTypeOperator:
 * 		return c.getTypeFromTypeOperatorNode(node)
 * 	case ast.KindIndexedAccessType:
 * 		return c.getTypeFromIndexedAccessTypeNode(node)
 * 	case ast.KindTemplateLiteralType:
 * 		return c.getTypeFromTemplateTypeNode(node)
 * 	case ast.KindMappedType:
 * 		return c.getTypeFromMappedTypeNode(node)
 * 	case ast.KindConditionalType:
 * 		return c.getTypeFromConditionalTypeNode(node)
 * 	case ast.KindInferType:
 * 		return c.getTypeFromInferTypeNode(node)
 * 	case ast.KindImportType:
 * 		return c.getTypeFromImportTypeNode(node)
 * 	default:
 * 		return c.errorType
 * 	}
 * }
 */
export function Checker_getTypeFromTypeNodeWorker(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  switch (node!.Kind) {
    case KindAnyKeyword:
    case KindJSDocAllType:
      return receiver!.anyType;
    case KindJSDocNonNullableType:
      return Checker_getTypeFromTypeNode(receiver, Node_Type(node));
    case KindJSDocNullableType: {
      const t = Checker_getTypeFromTypeNode(receiver, Node_Type(node));
      if (receiver!.strictNullChecks) {
        return Checker_getNullableType(receiver, t, TypeFlagsNull);
      }
      return t;
    }
    case KindJSDocVariadicType:
      return Checker_createArrayType(receiver, Checker_getTypeFromTypeNode(receiver, AsJSDocVariadicType(node)!.Type));
    case KindJSDocOptionalType:
      return Checker_addOptionality(receiver, Checker_getTypeFromTypeNode(receiver, Node_Type(node)));
    case KindUnknownKeyword:
      return receiver!.unknownType;
    case KindStringKeyword:
      return receiver!.stringType;
    case KindNumberKeyword:
      return receiver!.numberType;
    case KindBigIntKeyword:
      return receiver!.bigintType;
    case KindBooleanKeyword:
      return receiver!.booleanType;
    case KindSymbolKeyword:
      return receiver!.esSymbolType;
    case KindVoidKeyword:
      return receiver!.voidType;
    case KindUndefinedKeyword:
      return receiver!.undefinedType;
    case KindNullKeyword:
      return receiver!.nullType;
    case KindNeverKeyword:
      return receiver!.neverType;
    case KindObjectKeyword:
      return receiver!.nonPrimitiveType;
    case KindIntrinsicKeyword:
      return receiver!.intrinsicMarkerType;
    case KindThisType:
    case KindThisKeyword:
      return Checker_getTypeFromThisTypeNode(receiver, node);
    case KindLiteralType:
      return Checker_getTypeFromLiteralTypeNode(receiver, node);
    case KindTypeReference:
    case KindExpressionWithTypeArguments:
      return Checker_getTypeFromTypeReference(receiver, node);
    case KindTypePredicate:
      if (AsTypePredicateNode(node)!.AssertsModifier !== undefined) {
        return receiver!.voidType;
      }
      return receiver!.booleanType;
    case KindTypeQuery:
      return Checker_getTypeFromTypeQueryNode(receiver, node);
    case KindArrayType:
    case KindTupleType:
      return Checker_getTypeFromArrayOrTupleTypeNode(receiver, node);
    case KindOptionalType:
      return Checker_getTypeFromOptionalTypeNode(receiver, node);
    case KindUnionType:
      return Checker_getTypeFromUnionTypeNode(receiver, node);
    case KindIntersectionType:
      return Checker_getTypeFromIntersectionTypeNode(receiver, node);
    case KindNamedTupleMember:
      return Checker_getTypeFromNamedTupleTypeNode(receiver, node);
    case KindParenthesizedType:
      return Checker_getTypeFromTypeNode(receiver, Node_Type(node));
    case KindRestType:
      return Checker_getTypeFromRestTypeNode(receiver, node);
    case KindFunctionType:
    case KindConstructorType:
    case KindTypeLiteral:
      return Checker_getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(receiver, node);
    case KindTypeOperator:
      return Checker_getTypeFromTypeOperatorNode(receiver, node);
    case KindIndexedAccessType:
      return Checker_getTypeFromIndexedAccessTypeNode(receiver, node);
    case KindTemplateLiteralType:
      return Checker_getTypeFromTemplateTypeNode(receiver, node);
    case KindMappedType:
      return Checker_getTypeFromMappedTypeNode(receiver, node);
    case KindConditionalType:
      return Checker_getTypeFromConditionalTypeNode(receiver, node);
    case KindInferType:
      return Checker_getTypeFromInferTypeNode(receiver, node);
    case KindImportType:
      return Checker_getTypeFromImportTypeNode(receiver, node);
    default:
      return receiver!.errorType;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromLiteralTypeNode","kind":"method","status":"implemented","sigHash":"dcccf73ffc65a210bc635da2f9b85b5b3598d499b01dad70d488642de8065926"}
 *
 * Go source:
 * func (c *Checker) getTypeFromLiteralTypeNode(node *ast.Node) *Type {
 * 	if node.AsLiteralTypeNode().Literal.Kind == ast.KindNullKeyword {
 * 		return c.nullType
 * 	}
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		links.resolvedType = c.getRegularTypeOfLiteralType(c.checkExpression(node.AsLiteralTypeNode().Literal))
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromLiteralTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const literal = AsLiteralTypeNode(node)!.Literal;
  if (literal!.Kind === KindNullKeyword) {
    return receiver!.nullType;
  }
  const links = LinkStore_Get(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey)!.v;
  if (links!.resolvedType === undefined) {
    links!.resolvedType = Checker_getRegularTypeOfLiteralType(receiver, Checker_checkExpression(receiver, literal));
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromTypeOperatorNode","kind":"method","status":"implemented","sigHash":"82e3b0607374264cc542cc9380b418c1357ac4dc14778e27cd8169aaab4b2a38"}
 *
 * Go source:
 * func (c *Checker) getTypeFromTypeOperatorNode(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		argType := node.Type()
 * 		switch node.AsTypeOperatorNode().Operator {
 * 		case ast.KindKeyOfKeyword:
 * 			links.resolvedType = c.getIndexType(c.getTypeFromTypeNode(argType))
 * 		case ast.KindUniqueKeyword:
 * 			if argType.Kind == ast.KindSymbolKeyword {
 * 				links.resolvedType = c.getESSymbolLikeTypeForNode(ast.WalkUpParenthesizedTypes(node.Parent))
 * 			} else {
 * 				links.resolvedType = c.errorType
 * 			}
 * 		case ast.KindReadonlyKeyword:
 * 			links.resolvedType = c.getTypeFromTypeNode(argType)
 * 		default:
 * 			panic("Unhandled case in getTypeFromTypeOperatorNode")
 * 		}
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromTypeOperatorNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get<GoPtr<Node>, TypeNodeLinks>(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey);
  if (links!.v.resolvedType === undefined) {
    const argType = Node_Type(node);
    switch (AsTypeOperatorNode(node)!.Operator) {
      case KindKeyOfKeyword:
        links!.v.resolvedType = Checker_getIndexType(receiver, Checker_getTypeFromTypeNode(receiver, argType));
        break;
      case KindUniqueKeyword:
        if (argType!.Kind === KindSymbolKeyword) {
          links!.v.resolvedType = Checker_getESSymbolLikeTypeForNode(receiver, WalkUpParenthesizedTypes(node!.Parent));
        } else {
          links!.v.resolvedType = receiver!.errorType;
        }
        break;
      case KindReadonlyKeyword:
        links!.v.resolvedType = Checker_getTypeFromTypeNode(receiver, argType);
        break;
      default:
        throw new globalThis.Error("Unhandled case in getTypeFromTypeOperatorNode");
    }
  }
  return links!.v.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromTypeReference","kind":"method","status":"implemented","sigHash":"ff37d90ef26604fb4fe4c9119f6e84066918af06db9d8bfbe1beb22d3ee59ade"}
 *
 * Go source:
 * func (c *Checker) getTypeFromTypeReference(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		// Cache both the resolved symbol and the resolved type. The resolved symbol is needed when we check the
 * 		// type reference in checkTypeReferenceNode.
 * 		// handle LS queries on the `const` in `x as const` by resolving to the type of `x`
 * 		if isConstTypeReference(node) && ast.IsAssertionExpression(node.Parent) {
 * 			links.resolvedType = c.checkExpressionCached(node.Parent.Expression())
 * 		} else if t := c.getIntendedTypeFromJSDocTypeReference(node); t != nil {
 * 			links.resolvedType = t
 * 		} else {
 * 			links.resolvedType = c.getTypeReferenceType(node, c.getSymbolFromTypeReference(node))
 * 		}
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromTypeReference(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get<GoPtr<Node>, TypeNodeLinks>(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey);
  if (links!.v.resolvedType === undefined) {
    if (isConstTypeReference(node) && IsAssertionExpression(node!.Parent)) {
      links!.v.resolvedType = Checker_checkExpressionCached(receiver, Node_Expression(node!.Parent)!);
    } else {
      const intendedType = Checker_getIntendedTypeFromJSDocTypeReference(receiver, node);
      links!.v.resolvedType = intendedType !== undefined ? intendedType : Checker_getTypeReferenceType(receiver, node, Checker_getSymbolFromTypeReference(receiver, node));
    }
  }
  return links!.v.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIntendedTypeFromJSDocTypeReference","kind":"method","status":"implemented","sigHash":"e689397fe879abc861e43eac11d8d1215a31ea2aefd7e877e796fb37092050b6"}
 *
 * Go source:
 * func (c *Checker) getIntendedTypeFromJSDocTypeReference(node *ast.Node) *Type {
 * 	if node.Flags&ast.NodeFlagsJSDoc != 0 && ast.IsTypeReferenceNode(node) {
 * 		typeName := node.AsTypeReferenceNode().TypeName
 * 		if ast.IsIdentifier(typeName) {
 * 			typeArgs := node.TypeArguments()
 * 			switch typeName.Text() {
 * 			case "String":
 * 				c.checkNoTypeArguments(node, nil)
 * 				return c.stringType
 * 			case "Number":
 * 				c.checkNoTypeArguments(node, nil)
 * 				return c.numberType
 * 			case "BigInt":
 * 				c.checkNoTypeArguments(node, nil)
 * 				return c.bigintType
 * 			case "Boolean":
 * 				c.checkNoTypeArguments(node, nil)
 * 				return c.booleanType
 * 			case "Void":
 * 				c.checkNoTypeArguments(node, nil)
 * 				return c.voidType
 * 			case "Undefined":
 * 				c.checkNoTypeArguments(node, nil)
 * 				return c.undefinedType
 * 			case "Null":
 * 				c.checkNoTypeArguments(node, nil)
 * 				return c.nullType
 * 			case "Function", "function":
 * 				c.checkNoTypeArguments(node, nil)
 * 				return c.globalFunctionType
 * 			case "array":
 * 				if len(typeArgs) == 0 && !c.noImplicitAny {
 * 					return c.anyArrayType
 * 				}
 * 			case "promise":
 * 				if len(typeArgs) == 0 && !c.noImplicitAny {
 * 					return c.createPromiseType(c.anyType)
 * 				}
 * 			case "Object":
 * 				if len(typeArgs) == 2 {
 * 					if recordSymbol := c.getGlobalRecordSymbol(); recordSymbol != nil {
 * 						if indexType := c.getTypeFromTypeNode(typeArgs[0]); c.isValidIndexKeyType(indexType) {
 * 							return c.getTypeAliasInstantiation(recordSymbol, []*Type{indexType, c.getTypeFromTypeNode(typeArgs[1])}, nil)
 * 						}
 * 					}
 * 					return c.anyType
 * 				}
 * 				if !c.noImplicitAny {
 * 					c.checkNoTypeArguments(node, nil)
 * 					return c.anyType
 * 				}
 * 			}
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getIntendedTypeFromJSDocTypeReference(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  if ((node!.Flags & NodeFlagsJSDoc) !== 0 && IsTypeReferenceNode(node)) {
    const typeName = AsTypeReferenceNode(node)!.TypeName;
    if (IsIdentifier(typeName)) {
      const typeArgs = Node_TypeArguments(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
      switch (Node_Text(typeName)) {
        case "String":
          Checker_checkNoTypeArguments(receiver, node, undefined);
          return receiver!.stringType;
        case "Number":
          Checker_checkNoTypeArguments(receiver, node, undefined);
          return receiver!.numberType;
        case "BigInt":
          Checker_checkNoTypeArguments(receiver, node, undefined);
          return receiver!.bigintType;
        case "Boolean":
          Checker_checkNoTypeArguments(receiver, node, undefined);
          return receiver!.booleanType;
        case "Void":
          Checker_checkNoTypeArguments(receiver, node, undefined);
          return receiver!.voidType;
        case "Undefined":
          Checker_checkNoTypeArguments(receiver, node, undefined);
          return receiver!.undefinedType;
        case "Null":
          Checker_checkNoTypeArguments(receiver, node, undefined);
          return receiver!.nullType;
        case "Function":
        case "function":
          Checker_checkNoTypeArguments(receiver, node, undefined);
          return receiver!.globalFunctionType;
        case "array":
          if (typeArgs.length === 0 && !receiver!.noImplicitAny) {
            return receiver!.anyArrayType;
          }
          break;
        case "promise":
          if (typeArgs.length === 0 && !receiver!.noImplicitAny) {
            return Checker_createPromiseType(receiver, receiver!.anyType);
          }
          break;
        case "Object":
          if (typeArgs.length === 2) {
            const recordSymbol = receiver!.getGlobalRecordSymbol!();
            if (recordSymbol !== undefined) {
              const indexType = Checker_getTypeFromTypeNode(receiver, GoSliceLoad(typeArgs, 0, GoPointerValueOps<Node>())!);
              if (Checker_isValidIndexKeyType(receiver, indexType)) {
                return Checker_getTypeAliasInstantiation(receiver, recordSymbol, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
                  GoSliceStore(__goSliceLiteral, 0, indexType, GoPointerValueOps<Type>());
                  GoSliceStore(__goSliceLiteral, 1, Checker_getTypeFromTypeNode(receiver, GoSliceLoad(typeArgs, 1, GoPointerValueOps<Node>())!), GoPointerValueOps<Type>());
                }), undefined);
              }
            }
            return receiver!.anyType;
          }
          if (!receiver!.noImplicitAny) {
            Checker_checkNoTypeArguments(receiver, node, undefined);
            return receiver!.anyType;
          }
          break;
      }
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeReferenceType","kind":"method","status":"implemented","sigHash":"fc0a0d80a93f053219ebcf7a13ad48d891bcd9eeee155619317663e99ff690e9"}
 *
 * Go source:
 * func (c *Checker) getTypeReferenceType(node *ast.Node, symbol *ast.Symbol) *Type {
 * 	if symbol == c.unknownSymbol {
 * 		return c.errorType
 * 	}
 * 	if symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 {
 * 		return c.getTypeFromClassOrInterfaceReference(node, symbol)
 * 	}
 * 	if symbol.Flags&ast.SymbolFlagsTypeAlias != 0 {
 * 		return c.getTypeFromTypeAliasReference(node, symbol)
 * 	}
 * 	// Get type from reference to named type that cannot be generic (enum or type parameter)
 * 	res := c.tryGetDeclaredTypeOfSymbol(symbol)
 * 	if res != nil && c.checkNoTypeArguments(node, symbol) {
 * 		return c.getRegularTypeOfLiteralType(res)
 * 	}
 * 
 * 	// !!! Resolving values as types for JS
 * 	return c.errorType
 * }
 */
export function Checker_getTypeReferenceType(receiver: GoPtr<Checker>, node: GoPtr<Node>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  if (symbol_ === receiver!.unknownSymbol) {
    return receiver!.errorType;
  }
  if ((symbol_!.Flags & (SymbolFlagsClass | SymbolFlagsInterface)) !== 0) {
    return Checker_getTypeFromClassOrInterfaceReference(receiver, node, symbol_);
  }
  if ((symbol_!.Flags & SymbolFlagsTypeAlias) !== 0) {
    return Checker_getTypeFromTypeAliasReference(receiver, node, symbol_);
  }
  const res = Checker_tryGetDeclaredTypeOfSymbol(receiver, symbol_);
  if (res !== undefined && Checker_checkNoTypeArguments(receiver, node, symbol_)) {
    return Checker_getRegularTypeOfLiteralType(receiver, res);
  }
  return receiver!.errorType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromClassOrInterfaceReference","kind":"method","status":"implemented","sigHash":"c20e934dee3131fe5ea2ca94b3333b28245e99153eb3cafa3432f3246b1bc453"}
 *
 * Go source:
 * func (c *Checker) getTypeFromClassOrInterfaceReference(node *ast.Node, symbol *ast.Symbol) *Type {
 * 	t := c.getDeclaredTypeOfClassOrInterface(c.getMergedSymbol(symbol))
 * 	d := t.AsInterfaceType()
 * 	typeParameters := d.LocalTypeParameters()
 * 	if len(typeParameters) != 0 {
 * 		numTypeArguments := len(node.TypeArguments())
 * 		minTypeArgumentCount := c.getMinTypeArgumentCount(typeParameters)
 * 		isJs := ast.IsInJSFile(node)
 * 		isJsImplicitAny := !c.noImplicitAny && isJs
 * 		if !isJsImplicitAny && (numTypeArguments < minTypeArgumentCount || numTypeArguments > len(typeParameters)) {
 * 			var message *diagnostics.Message
 * 
 * 			missingAugmentsTag := isJs && ast.IsExpressionWithTypeArguments(node) && !ast.IsJSDocAugmentsTag(node.Parent)
 * 			if missingAugmentsTag {
 * 				message = diagnostics.Expected_0_type_arguments_provide_these_with_an_extends_tag
 * 				if minTypeArgumentCount < len(typeParameters) {
 * 					message = diagnostics.Expected_0_1_type_arguments_provide_these_with_an_extends_tag
 * 				}
 * 			} else {
 * 				message = diagnostics.Generic_type_0_requires_1_type_argument_s
 * 				if minTypeArgumentCount < len(typeParameters) {
 * 					message = diagnostics.Generic_type_0_requires_between_1_and_2_type_arguments
 * 				}
 * 			}
 * 			typeStr := c.TypeToStringEx(t, nil /*enclosingDeclaration* /, TypeFormatFlagsWriteArrayAsGenericType, nil)
 * 			c.error(node, message, typeStr, minTypeArgumentCount, len(typeParameters))
 * 			if !isJs {
 * 				// TODO: Adopt same permissive behavior in TS as in JS to reduce follow-on editing experience failures (requires editing fillMissingTypeArguments)
 * 				return c.errorType
 * 			}
 * 		}
 * 		if node.Kind == ast.KindTypeReference && c.isDeferredTypeReferenceNode(node, numTypeArguments != len(typeParameters)) {
 * 			return c.createDeferredTypeReference(t, node, nil /*mapper* /, nil /*alias* /)
 * 		}
 * 		// In a type reference, the outer type parameters of the referenced class or interface are automatically
 * 		// supplied as type arguments and the type reference only specifies arguments for the local type parameters
 * 		// of the class or interface.
 * 		localTypeArguments := c.fillMissingTypeArguments(c.getTypeArgumentsFromNode(node), typeParameters, minTypeArgumentCount, isJs)
 * 		typeArguments := append(d.OuterTypeParameters(), localTypeArguments...)
 * 		return c.createTypeReferenceEx(t, typeArguments, ObjectFlagsFromTypeNode)
 * 	}
 * 	if c.checkNoTypeArguments(node, symbol) {
 * 		return t
 * 	}
 * 	return c.errorType
 * }
 */
export function Checker_getTypeFromClassOrInterfaceReference(receiver: GoPtr<Checker>, node: GoPtr<Node>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  const t = Checker_getDeclaredTypeOfClassOrInterface(receiver, Checker_getMergedSymbol(receiver, symbol_));
  const d = Type_AsInterfaceType(t);
  const typeParameters = InterfaceType_LocalTypeParameters(d);
  if (typeParameters.length !== 0) {
    const numTypeArguments = (Node_TypeArguments(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())).length;
    const minTypeArgumentCount = Checker_getMinTypeArgumentCount(receiver, typeParameters);
    const isJs = IsInJSFile(node);
    const isJsImplicitAny = !receiver!.noImplicitAny && isJs;
    if (!isJsImplicitAny && (numTypeArguments < minTypeArgumentCount || numTypeArguments > typeParameters.length)) {
      let message: GoPtr<Message>;
      const missingAugmentsTag = isJs && IsExpressionWithTypeArguments(node) && !(node!.Parent !== undefined && IsJSDocAugmentsTag(node!.Parent));
      if (missingAugmentsTag) {
        message = diagnosticsMessages.Expected_0_type_arguments_provide_these_with_an_extends_tag;
        if (minTypeArgumentCount < typeParameters.length) {
          message = diagnosticsMessages.Expected_0_1_type_arguments_provide_these_with_an_extends_tag;
        }
      } else {
        message = diagnosticsMessages.Generic_type_0_requires_1_type_argument_s;
        if (minTypeArgumentCount < typeParameters.length) {
          message = diagnosticsMessages.Generic_type_0_requires_between_1_and_2_type_arguments;
        }
      }
      const typeStr = Checker_TypeToStringEx(receiver, t, undefined, TypeFormatFlagsWriteArrayAsGenericType, undefined);
      Checker_error(receiver, node, message, typeStr, minTypeArgumentCount, typeParameters.length);
      if (!isJs) {
        return receiver!.errorType;
      }
    }
    if (node!.Kind === KindTypeReference && Checker_isDeferredTypeReferenceNode(receiver, node, numTypeArguments !== typeParameters.length)) {
      return Checker_createDeferredTypeReference(receiver, t, node, undefined, undefined);
    }
    const localTypeArguments = Checker_fillMissingTypeArguments(receiver, Checker_getTypeArgumentsFromNode(receiver, node), typeParameters, minTypeArgumentCount, isJs);
    const typeArguments = GoSliceAppendSlice(InterfaceType_OuterTypeParameters(d), localTypeArguments, GoPointerValueOps<Type>());
    return Checker_createTypeReferenceEx(receiver, t, typeArguments, ObjectFlagsFromTypeNode);
  }
  if (Checker_checkNoTypeArguments(receiver, node, symbol_)) {
    return t;
  }
  return receiver!.errorType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isDeferredTypeReferenceNode","kind":"method","status":"implemented","sigHash":"219f293864b5660e23d2bbad1cd01732a53b56271da22edf65932395c3c7e546"}
 *
 * Go source:
 * func (c *Checker) isDeferredTypeReferenceNode(node *ast.Node, hasDefaultTypeArguments bool) bool {
 * 	if c.getAliasSymbolForTypeNode(node) != nil {
 * 		return true
 * 	}
 * 	if c.isResolvedByTypeAlias(node) {
 * 		switch node.Kind {
 * 		case ast.KindArrayType:
 * 			return c.mayResolveTypeAlias(node.AsArrayTypeNode().ElementType)
 * 		case ast.KindTupleType:
 * 			return core.Some(node.Elements(), c.mayResolveTypeAlias)
 * 		case ast.KindTypeReference:
 * 			return hasDefaultTypeArguments || core.Some(node.TypeArguments(), c.mayResolveTypeAlias)
 * 		}
 * 		panic("Unhandled case in isDeferredTypeReferenceNode")
 * 	}
 * 	return false
 * }
 */
export function Checker_isDeferredTypeReferenceNode(receiver: GoPtr<Checker>, node: GoPtr<Node>, hasDefaultTypeArguments: bool): bool {
  if (Checker_getAliasSymbolForTypeNode(receiver, node) !== undefined) {
    return true;
  }
  if (Checker_isResolvedByTypeAlias(receiver, node)) {
    switch (node!.Kind) {
      case KindArrayType:
        return Checker_mayResolveTypeAlias(receiver, AsArrayTypeNode(node)!.ElementType);
      case KindTupleType:
        return core.Some(Node_Elements(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), (element: GoPtr<Node>): bool => Checker_mayResolveTypeAlias(receiver, element));
      case KindTypeReference:
        return (hasDefaultTypeArguments || core.Some(Node_TypeArguments(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), (typeArgument: GoPtr<Node>): bool => Checker_mayResolveTypeAlias(receiver, typeArgument))) as bool;
    }
    throw new globalThis.Error("Unhandled case in isDeferredTypeReferenceNode");
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createNormalizedTypeReference","kind":"method","status":"implemented","sigHash":"8242b6d7801d18dbaa6e11e1577735ec4fc8c0c8ea35dab0928405a7dc44168f"}
 *
 * Go source:
 * func (c *Checker) createNormalizedTypeReference(target *Type, typeArguments []*Type) *Type {
 * 	if target.objectFlags&ObjectFlagsTuple != 0 {
 * 		return c.createNormalizedTupleType(target, typeArguments)
 * 	}
 * 	return c.createTypeReference(target, typeArguments)
 * }
 */
export function Checker_createNormalizedTypeReference(receiver: GoPtr<Checker>, target: GoPtr<Type>, typeArguments: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  if ((target!.objectFlags & ObjectFlagsTuple) !== 0) {
    return Checker_createNormalizedTupleType(receiver, target, typeArguments);
  }
  return Checker_createTypeReference(receiver, target, typeArguments);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createNormalizedTupleType","kind":"method","status":"implemented","sigHash":"06f19b8242b3cd088fba725356709b5ff8557961146552ae16b3066e9ddd3fac"}
 *
 * Go source:
 * func (c *Checker) createNormalizedTupleType(target *Type, elementTypes []*Type) *Type {
 * 	return c.createNormalizedTupleTypeEx(target, elementTypes, ObjectFlagsNone)
 * }
 */
export function Checker_createNormalizedTupleType(receiver: GoPtr<Checker>, target: GoPtr<Type>, elementTypes: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  return Checker_createNormalizedTupleTypeEx(receiver, target, elementTypes, ObjectFlagsNone);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::TupleNormalizer.normalize","kind":"method","status":"implemented","sigHash":"a1e932ba293bd5a70135ca2bb6a861b49a7529d39c9c34c0380b2db074840c9c"}
 *
 * Go source:
 * func (n *TupleNormalizer) normalize(c *Checker, elementTypes []*Type, elementInfos []TupleElementInfo) bool {
 * 	n.c = c
 * 	n.lastRequiredIndex = -1
 * 	n.firstRestIndex = -1
 * 	n.lastOptionalOrRestIndex = -1
 * 	for i, t := range elementTypes {
 * 		info := elementInfos[i]
 * 		if info.flags&ElementFlagsVariadic != 0 {
 * 			if t.flags&TypeFlagsAny != 0 {
 * 				n.add(t, TupleElementInfo{flags: ElementFlagsRest, labeledDeclaration: info.labeledDeclaration})
 * 			} else if t.flags&TypeFlagsInstantiableNonPrimitive != 0 || c.isGenericMappedType(t) {
 * 				// Generic variadic elements stay as they are.
 * 				n.add(t, info)
 * 			} else if isTupleType(t) {
 * 				spreadTypes := c.getElementTypes(t)
 * 				if len(spreadTypes)+len(n.types) >= 10_000 {
 * 					message := core.IfElse(ast.IsPartOfTypeNode(c.currentNode),
 * 						diagnostics.Type_produces_a_tuple_type_that_is_too_large_to_represent,
 * 						diagnostics.Expression_produces_a_tuple_type_that_is_too_large_to_represent)
 * 					c.error(c.currentNode, message)
 * 					return false
 * 				}
 * 				// Spread variadic elements with tuple types into the resulting tuple.
 * 				spreadInfos := t.TargetTupleType().elementInfos
 * 				for j, s := range spreadTypes {
 * 					n.add(s, spreadInfos[j])
 * 				}
 * 			} else {
 * 				// Treat everything else as an array type and create a rest element.
 * 				var s *Type
 * 				if c.isArrayLikeType(t) {
 * 					s = c.getIndexTypeOfType(t, c.numberType)
 * 				}
 * 				if s == nil {
 * 					s = c.errorType
 * 				}
 * 				n.add(s, TupleElementInfo{flags: ElementFlagsRest, labeledDeclaration: info.labeledDeclaration})
 * 			}
 * 		} else {
 * 			// Copy other element kinds with no change.
 * 			n.add(t, info)
 * 		}
 * 	}
 * 	// Turn optional elements preceding the last required element into required elements
 * 	for i := range n.lastRequiredIndex {
 * 		if n.infos[i].flags&ElementFlagsOptional != 0 {
 * 			n.infos[i].flags = ElementFlagsRequired
 * 		}
 * 	}
 * 	if n.firstRestIndex >= 0 && n.firstRestIndex < n.lastOptionalOrRestIndex {
 * 		// Turn elements between first rest and last optional/rest into a single rest element
 * 		var types []*Type
 * 		for i := n.firstRestIndex; i <= n.lastOptionalOrRestIndex; i++ {
 * 			t := n.types[i]
 * 			if n.infos[i].flags&ElementFlagsVariadic != 0 {
 * 				t = c.getIndexedAccessType(t, c.numberType)
 * 			}
 * 			types = append(types, t)
 * 		}
 * 		n.types[n.firstRestIndex] = c.getUnionType(types)
 * 		n.types = slices.Delete(n.types, n.firstRestIndex+1, n.lastOptionalOrRestIndex+1)
 * 		n.infos = slices.Delete(n.infos, n.firstRestIndex+1, n.lastOptionalOrRestIndex+1)
 * 	}
 * 	return true
 * }
 */
export function TupleNormalizer_normalize(receiver: GoPtr<TupleNormalizer>, c: GoPtr<Checker>, elementTypes: GoSlice<GoPtr<Type>>, elementInfos: GoSlice<TupleElementInfo>): bool {
  receiver!.c = c;
  receiver!.lastRequiredIndex = -1;
  receiver!.firstRestIndex = -1;
  receiver!.lastOptionalOrRestIndex = -1;
  for (let index = 0; index < elementTypes.length; index++) {
    const type_ = GoSliceLoad(elementTypes, index, GoPointerValueOps<Type>());
    const info = elementInfos[index]!;
    if ((info.flags & ElementFlagsVariadic) !== 0) {
      if ((type_!.flags & TypeFlagsAny) !== 0) {
        TupleNormalizer_add(receiver, type_, { flags: ElementFlagsRest, labeledDeclaration: info.labeledDeclaration });
      } else if ((type_!.flags & TypeFlagsInstantiableNonPrimitive) !== 0 || Checker_isGenericMappedType(c, type_)) {
        TupleNormalizer_add(receiver, type_, info);
      } else if (isTupleType(type_)) {
        const spreadTypes = Checker_getElementTypes(c, type_);
        if (spreadTypes.length + receiver!.types.length >= 10_000) {
          const message = IsPartOfTypeNode(c!.currentNode)
            ? diagnosticsMessages.Type_produces_a_tuple_type_that_is_too_large_to_represent
            : diagnosticsMessages.Expression_produces_a_tuple_type_that_is_too_large_to_represent;
          Checker_error(c, c!.currentNode, message);
          return false;
        }
        const spreadInfos = Type_TargetTupleType(type_)!.elementInfos;
        for (let spreadIndex = 0; spreadIndex < spreadTypes.length; spreadIndex++) {
          TupleNormalizer_add(receiver, GoSliceLoad(spreadTypes, spreadIndex, GoPointerValueOps<Type>()), spreadInfos[spreadIndex]!);
        }
      } else {
        let elementType: GoPtr<Type>;
        if (Checker_isArrayLikeType(c, type_)) {
          elementType = Checker_getIndexTypeOfType(c, type_, c!.numberType);
        }
        if (elementType === undefined) {
          elementType = c!.errorType;
        }
        TupleNormalizer_add(receiver, elementType, { flags: ElementFlagsRest, labeledDeclaration: info.labeledDeclaration });
      }
    } else {
      TupleNormalizer_add(receiver, type_, info);
    }
  }
  for (let index = 0; index < receiver!.lastRequiredIndex; index++) {
    if ((receiver!.infos[index]!.flags & ElementFlagsOptionalFlag) !== 0) {
      receiver!.infos[index]!.flags = ElementFlagsRequired;
    }
  }
  if (receiver!.firstRestIndex >= 0 && receiver!.firstRestIndex < receiver!.lastOptionalOrRestIndex) {
    let types: GoSlice<GoPtr<Type>> = GoNilSlice();
    for (let index = receiver!.firstRestIndex; index <= receiver!.lastOptionalOrRestIndex; index++) {
      let type_ = GoSliceLoad(receiver!.types, index, GoPointerValueOps<Type>());
      if ((receiver!.infos[index]!.flags & ElementFlagsVariadic) !== 0) {
        type_ = Checker_getIndexedAccessType(c, type_, c!.numberType);
      }
      types = GoSliceAppend(types, type_, GoPointerValueOps<Type>());
    }
    GoSliceStore(receiver!.types, receiver!.firstRestIndex, Checker_getUnionType(c, types), GoPointerValueOps<Type>());
    receiver!.types = slices.Delete(receiver!.types, receiver!.firstRestIndex + 1, receiver!.lastOptionalOrRestIndex + 1);
    receiver!.infos = slices.Delete(receiver!.infos, receiver!.firstRestIndex + 1, receiver!.lastOptionalOrRestIndex + 1);
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::TupleNormalizer.add","kind":"method","status":"implemented","sigHash":"c7d2b388e328092e7bff811838000f5be4489a78e33bf27783669e552666435a"}
 *
 * Go source:
 * func (n *TupleNormalizer) add(t *Type, info TupleElementInfo) {
 * 	if info.flags&ElementFlagsRequired != 0 {
 * 		n.lastRequiredIndex = len(n.types)
 * 	}
 * 	if info.flags&ElementFlagsRest != 0 && n.firstRestIndex < 0 {
 * 		n.firstRestIndex = len(n.types)
 * 	}
 * 	if info.flags&(ElementFlagsOptional|ElementFlagsRest) != 0 {
 * 		n.lastOptionalOrRestIndex = len(n.types)
 * 	}
 * 	n.types = append(n.types, n.c.addOptionalityEx(t, true /*isProperty* /, info.flags&ElementFlagsOptional != 0))
 * 	n.infos = append(n.infos, info)
 * }
 */
export function TupleNormalizer_add(receiver: GoPtr<TupleNormalizer>, t: GoPtr<Type>, info: TupleElementInfo): void {
  if ((info.flags & ElementFlagsRequired) !== 0) {
    receiver!.lastRequiredIndex = receiver!.types.length;
  }
  if ((info.flags & ElementFlagsRest) !== 0 && receiver!.firstRestIndex < 0) {
    receiver!.firstRestIndex = receiver!.types.length;
  }
  if ((info.flags & (ElementFlagsOptionalFlag | ElementFlagsRest)) !== 0) {
    receiver!.lastOptionalOrRestIndex = receiver!.types.length;
  }
  receiver!.types = GoSliceAppend(receiver!.types, Checker_addOptionalityEx(receiver!.c, t, true, (info.flags & ElementFlagsOptionalFlag) !== 0), GoPointerValueOps<Type>());
  // Go appends the TupleElementInfo STRUCT BY VALUE; normalize() later mutates
  // n.infos[i].flags, which must not write through to the caller's (possibly
  // interned tuple target's) element infos.
  receiver!.infos = GoAppend(receiver!.infos, { ...info });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getElementTypes","kind":"method","status":"implemented","sigHash":"6dd92ff02637382678ebbe2b68a74268f4af00bc82107355b441841ef9b9e878"}
 *
 * Go source:
 * func (c *Checker) getElementTypes(t *Type) []*Type {
 * 	typeArguments := c.getTypeArguments(t)
 * 	arity := c.getTypeReferenceArity(t)
 * 	if len(typeArguments) == arity {
 * 		return typeArguments
 * 	}
 * 	return typeArguments[0:arity]
 * }
 */
export function Checker_getElementTypes(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<Type>> {
  const typeArguments = Checker_getTypeArguments(receiver, t);
  const arity = Checker_getTypeReferenceArity(receiver, t);
  if (typeArguments.length === arity) {
    return typeArguments;
  }
  return GoSlicePrefix(typeArguments, arity);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isArrayType","kind":"method","status":"implemented","sigHash":"c4cf7cd32a013baff5c16bdc69cc90779fdc1dae9dade3177c24c3ad5ee6e807"}
 *
 * Go source:
 * func (c *Checker) isArrayType(t *Type) bool {
 * 	return t.objectFlags&ObjectFlagsReference != 0 && (t.Target() == c.globalArrayType || t.Target() == c.globalReadonlyArrayType)
 * }
 */
export function Checker_isArrayType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (t!.objectFlags & ObjectFlagsReference) !== 0 && (Type_Target(t) === receiver!.globalArrayType || Type_Target(t) === receiver!.globalReadonlyArrayType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isReadonlyArrayType","kind":"method","status":"implemented","sigHash":"e171403729040b6148a40f38fe6a7f69aab4d218b295048eb395b70ecdc33dd1"}
 *
 * Go source:
 * func (c *Checker) isReadonlyArrayType(t *Type) bool {
 * 	return t.objectFlags&ObjectFlagsReference != 0 && t.Target() == c.globalReadonlyArrayType
 * }
 */
export function Checker_isReadonlyArrayType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (t!.objectFlags & ObjectFlagsReference) !== 0 && Type_Target(t) === receiver!.globalReadonlyArrayType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isArrayOrTupleType","kind":"method","status":"implemented","sigHash":"714bb0b5b1a25d2a72375daa26f394b69e931cb94c9708e37bd3e62ab3f82aa5"}
 *
 * Go source:
 * func (c *Checker) isArrayOrTupleType(t *Type) bool {
 * 	return c.isArrayType(t) || isTupleType(t)
 * }
 */
export function Checker_isArrayOrTupleType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return Checker_isArrayType(receiver, t) || isTupleType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isMutableArrayOrTuple","kind":"method","status":"implemented","sigHash":"f9b9f866b63cc6e87047dbddfd0af4e836baa2916ef9096cd6f558811b2d7140"}
 *
 * Go source:
 * func (c *Checker) isMutableArrayOrTuple(t *Type) bool {
 * 	return c.isArrayType(t) && !c.isReadonlyArrayType(t) || isTupleType(t) && !t.TargetTupleType().readonly
 * }
 */
export function Checker_isMutableArrayOrTuple(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (Checker_isArrayType(receiver, t) && !Checker_isReadonlyArrayType(receiver, t)) || (isTupleType(t) && !Type_TargetTupleType(t)!.readonly);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getElementTypeOfArrayType","kind":"method","status":"implemented","sigHash":"afc8538ab3d3e9d734dae40e3950f0b810534814a14776e205435a727cae5db1"}
 *
 * Go source:
 * func (c *Checker) getElementTypeOfArrayType(t *Type) *Type {
 * 	if c.isArrayType(t) {
 * 		return c.getTypeArguments(t)[0]
 * 	}
 * 	return nil
 * }
 */
export function Checker_getElementTypeOfArrayType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (Checker_isArrayType(receiver, t)) {
    return GoSliceLoad(Checker_getTypeArguments(receiver, t), 0, GoPointerValueOps<Type>());
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isArrayLikeType","kind":"method","status":"implemented","sigHash":"79e44b3ab25bccf5e73148243935ab65c65fe3dd0f01f04a92a82f3105f28a9c"}
 *
 * Go source:
 * func (c *Checker) isArrayLikeType(t *Type) bool {
 * 	// A type is array-like if it is a reference to the global Array or global ReadonlyArray type,
 * 	// or if it is not the undefined or null type and if it is assignable to ReadonlyArray<any>
 * 	return c.isArrayType(t) || t.flags&TypeFlagsNullable == 0 && c.isTypeAssignableTo(t, c.anyReadonlyArrayType)
 * }
 */
export function Checker_isArrayLikeType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return Checker_isArrayType(receiver, t) || ((t!.flags & TypeFlagsNullable) === 0 && Checker_isTypeAssignableTo(receiver, t, receiver!.anyReadonlyArrayType));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isMutableArrayLikeType","kind":"method","status":"implemented","sigHash":"ffd8d3dc2edf0c4284a2d588b4864d941efd7781c4408e4c0a81823598fcd9d9"}
 *
 * Go source:
 * func (c *Checker) isMutableArrayLikeType(t *Type) bool {
 * 	// A type is mutable-array-like if it is a reference to the global Array type, or if it is not the
 * 	// any, undefined or null type and if it is assignable to Array<any>
 * 	return c.isMutableArrayOrTuple(t) || t.flags&(TypeFlagsAny|TypeFlagsNullable) == 0 && c.isTypeAssignableTo(t, c.anyArrayType)
 * }
 */
export function Checker_isMutableArrayLikeType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return Checker_isMutableArrayOrTuple(receiver, t) || ((t!.flags & (TypeFlagsAny | TypeFlagsNullable)) === 0 && Checker_isTypeAssignableTo(receiver, t, receiver!.anyArrayType));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isEmptyArrayLiteralType","kind":"method","status":"implemented","sigHash":"99d95d691b1d610480d9b598a20a8ac6b2752d203ab20b97f6aa83df44f88b65"}
 *
 * Go source:
 * func (c *Checker) isEmptyArrayLiteralType(t *Type) bool {
 * 	elementType := c.getElementTypeOfArrayType(t)
 * 	return elementType != nil && c.isEmptyLiteralType(elementType)
 * }
 */
export function Checker_isEmptyArrayLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  const elementType = Checker_getElementTypeOfArrayType(receiver, t);
  return elementType !== undefined && Checker_isEmptyLiteralType(receiver, elementType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isEmptyLiteralType","kind":"method","status":"implemented","sigHash":"878449ec9389b2900f5fdc2f5530c8b4a842e6deca03e51a5c3d7d94072efe35"}
 *
 * Go source:
 * func (c *Checker) isEmptyLiteralType(t *Type) bool {
 * 	if c.strictNullChecks {
 * 		return t == c.implicitNeverType
 * 	}
 * 	return t == c.undefinedWideningType
 * }
 */
export function Checker_isEmptyLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if (receiver!.strictNullChecks) {
    return t === receiver!.implicitNeverType;
  }
  return t === receiver!.undefinedWideningType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isTupleLikeType","kind":"method","status":"implemented","sigHash":"216572c6a37ae12b301adf66fc963c29a6065547d23a29f608f4366fc7cb97d1"}
 *
 * Go source:
 * func (c *Checker) isTupleLikeType(t *Type) bool {
 * 	if isTupleType(t) || c.getPropertyOfType(t, "0") != nil {
 * 		return true
 * 	}
 * 	if c.isArrayLikeType(t) {
 * 		if lengthType := c.getTypeOfPropertyOfType(t, "length"); lengthType != nil {
 * 			return everyType(lengthType, func(t *Type) bool { return t.flags&TypeFlagsNumberLiteral != 0 })
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Checker_isTupleLikeType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if (isTupleType(t) || Checker_getPropertyOfType(receiver, t, "0") !== undefined) {
    return true;
  }
  if (Checker_isArrayLikeType(receiver, t)) {
    const lengthType = Checker_getTypeOfPropertyOfType(receiver, t, "length");
    if (lengthType !== undefined) {
      return everyType(lengthType, (t_) => (t_!.flags & TypeFlagsNumberLiteral) !== 0);
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isArrayOrTupleLikeType","kind":"method","status":"implemented","sigHash":"307b11d4a0001b09fd8997d1ee2620864a8478400717d0dcc32b93aa0065c7f5"}
 *
 * Go source:
 * func (c *Checker) isArrayOrTupleLikeType(t *Type) bool {
 * 	return c.isArrayLikeType(t) || c.isTupleLikeType(t)
 * }
 */
export function Checker_isArrayOrTupleLikeType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return Checker_isArrayLikeType(receiver, t) || Checker_isTupleLikeType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isArrayOrTupleOrIntersection","kind":"method","status":"implemented","sigHash":"ade27448818e876c91a4f3af01d0372721b8b1101a3f5c43f0ce9ca11d2d8e0d"}
 *
 * Go source:
 * func (c *Checker) isArrayOrTupleOrIntersection(t *Type) bool {
 * 	return t.flags&TypeFlagsIntersection != 0 && core.Every(t.Types(), c.isArrayOrTupleType)
 * }
 */
export function Checker_isArrayOrTupleOrIntersection(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (t!.flags & TypeFlagsIntersection) !== 0 && core.Every(Type_Types(t), (t_) => Checker_isArrayOrTupleType(receiver, t_));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTupleElementType","kind":"method","status":"implemented","sigHash":"1774ea50b8ecb676997c0875b6e3d913db4e522349f755df6424529850934ead"}
 *
 * Go source:
 * func (c *Checker) getTupleElementType(t *Type, index int) *Type {
 * 	propType := c.getTypeOfPropertyOfType(t, strconv.Itoa(index))
 * 	if propType != nil {
 * 		return propType
 * 	}
 * 	if everyType(t, isTupleType) {
 * 		return c.getTupleElementTypeOutOfStartCount(t, jsnum.Number(index), core.IfElse(c.compilerOptions.NoUncheckedIndexedAccess == core.TSTrue, c.undefinedType, nil))
 * 	}
 * 	return nil
 * }
 */
export function Checker_getTupleElementType(receiver: GoPtr<Checker>, t: GoPtr<Type>, index: int): GoPtr<Type> {
  const propType = Checker_getTypeOfPropertyOfType(receiver, t, globalThis.String(index));
  if (propType !== undefined) {
    return propType;
  }
  if (everyType(t, isTupleType)) {
    return Checker_getTupleElementTypeOutOfStartCount(receiver, t, index as Number, receiver!.compilerOptions!.NoUncheckedIndexedAccess === TSTrue ? receiver!.undefinedType : undefined);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getDeclaredTypeOfEnum","kind":"method","status":"implemented","sigHash":"14f01025114020cfbd371722680504dc65c47315b825fab05706aa2a90dcf59d"}
 *
 * Go source:
 * func (c *Checker) getDeclaredTypeOfEnum(symbol *ast.Symbol) *Type {
 * 	links := c.declaredTypeLinks.Get(symbol)
 * 	if !(links.declaredType != nil) {
 * 		var memberTypeList []*Type
 * 		for _, declaration := range symbol.Declarations {
 * 			if declaration.Kind == ast.KindEnumDeclaration {
 * 				for _, member := range declaration.Members() {
 * 					if c.hasBindableName(member) {
 * 						memberSymbol := c.getSymbolOfDeclaration(member)
 * 						value := c.getEnumMemberValue(member).Value
 * 						var memberType *Type
 * 						if value != nil {
 * 							memberType = c.getEnumLiteralType(value, symbol, memberSymbol)
 * 						} else {
 * 							memberType = c.createComputedEnumType(memberSymbol)
 * 						}
 * 						c.declaredTypeLinks.Get(memberSymbol).declaredType = c.getFreshTypeOfLiteralType(memberType)
 * 						memberTypeList = append(memberTypeList, memberType)
 * 					}
 * 				}
 * 			}
 * 		}
 * 		var enumType *Type
 * 		if len(memberTypeList) != 0 {
 * 			enumType = c.getUnionTypeEx(memberTypeList, UnionReductionLiteral, &TypeAlias{symbol: symbol}, nil /*origin* /)
 * 		} else {
 * 			enumType = c.createComputedEnumType(symbol)
 * 		}
 * 		if enumType.flags&TypeFlagsUnion != 0 {
 * 			enumType.flags |= TypeFlagsEnumLiteral
 * 			enumType.symbol = symbol
 * 		}
 * 		links.declaredType = enumType
 * 	}
 * 	return links.declaredType
 * }
 */
export function Checker_getDeclaredTypeOfEnum(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.declaredTypeLinks, symbol_, zeroDeclaredTypeLinks, goSymbolPointerKey)!.v;
  if (links!.declaredType === undefined) {
    let memberTypeList: GoSlice<GoPtr<Type>> = GoNilSlice();
    for (const declaration of symbol_!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
      if (declaration!.Kind === KindEnumDeclaration) {
        for (const member of Node_Members(declaration) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
          if (Checker_hasBindableName(receiver, member)) {
            const memberSymbol = Checker_getSymbolOfDeclaration(receiver, member);
            const value = Checker_getEnumMemberValue(receiver, member).Value;
            let memberType: GoPtr<Type>;
            if (value !== undefined) {
              memberType = Checker_getEnumLiteralType(receiver, value, symbol_, memberSymbol);
            } else {
              memberType = Checker_createComputedEnumType(receiver, memberSymbol);
            }
            LinkStore_Get(receiver!.declaredTypeLinks, memberSymbol, zeroDeclaredTypeLinks, goSymbolPointerKey)!.v.declaredType = Checker_getFreshTypeOfLiteralType(receiver, memberType);
            memberTypeList = GoSliceAppend(memberTypeList, memberType, GoPointerValueOps<Type>());
          }
        }
      }
    }
    let enumType: GoPtr<Type>;
    if (memberTypeList.length !== 0) {
      enumType = Checker_getUnionTypeEx(receiver, memberTypeList, UnionReductionLiteral, { "symbol": symbol_, typeArguments: GoSliceMake(0, 0, GoPointerValueOps<Type>()) } as TypeAlias, undefined);
    } else {
      enumType = Checker_createComputedEnumType(receiver, symbol_);
    }
    if ((enumType!.flags & TypeFlagsUnion) !== 0) {
      enumType!.flags |= TypeFlagsEnumLiteral;
      enumType!.symbol = symbol_;
    }
    links!.declaredType = enumType;
  }
  return links!.declaredType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createComputedEnumType","kind":"method","status":"implemented","sigHash":"f96a5a86e1611838ddd135dbb61755971e727310faee9c235666f35e0b69d90c"}
 *
 * Go source:
 * func (c *Checker) createComputedEnumType(symbol *ast.Symbol) *Type {
 * 	regularType := c.newLiteralType(TypeFlagsEnum, nil, nil)
 * 	regularType.symbol = symbol
 * 	freshType := c.newLiteralType(TypeFlagsEnum, nil, regularType)
 * 	freshType.symbol = symbol
 * 	regularType.AsLiteralType().freshType = freshType
 * 	freshType.AsLiteralType().freshType = freshType
 * 	return regularType
 * }
 */
export function Checker_createComputedEnumType(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  const regularType = Checker_newLiteralType(receiver, TypeFlagsEnum, undefined, undefined);
  regularType!["symbol"] = symbol_;
  const freshType = Checker_newLiteralType(receiver, TypeFlagsEnum, undefined, regularType);
  freshType!["symbol"] = symbol_;
  Type_AsLiteralType(regularType)!.freshType = freshType;
  Type_AsLiteralType(freshType)!.freshType = freshType;
  return regularType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromTypeQueryNode","kind":"method","status":"implemented","sigHash":"90135e853ed69780ec7664790c53cb02af04d20cc460065ec76e55b3426a099c"}
 *
 * Go source:
 * func (c *Checker) getTypeFromTypeQueryNode(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		// TypeScript 1.0 spec (April 2014): 3.6.3
 * 		// The expression is processed as an identifier expression (section 4.3)
 * 		// or property access expression(section 4.10),
 * 		// the widened type(section 3.9) of which becomes the result.
 * 		t := c.checkExpressionWithTypeArguments(node)
 * 		links.resolvedType = c.getRegularTypeOfLiteralType(c.getWidenedType(t))
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromTypeQueryNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey);
  if (links!.v.resolvedType === undefined) {
    const t = Checker_checkExpressionWithTypeArguments(receiver, node);
    links!.v.resolvedType = Checker_getRegularTypeOfLiteralType(receiver, Checker_getWidenedType(receiver, t));
  }
  return links!.v.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromArrayOrTupleTypeNode","kind":"method","status":"implemented","sigHash":"f5a5f9b1cb7b8d619ba01c852a9f2a4ab207d619de9021c51aed63e00a8b167d"}
 *
 * Go source:
 * func (c *Checker) getTypeFromArrayOrTupleTypeNode(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		target := c.getArrayOrTupleTargetType(node)
 * 		if target == c.emptyGenericType {
 * 			links.resolvedType = c.emptyObjectType
 * 		} else if !(node.Kind == ast.KindTupleType && core.Some(node.Elements(), c.isVariadicTupleElement)) && c.isDeferredTypeReferenceNode(node, false) {
 * 			if node.Kind == ast.KindTupleType && len(node.Elements()) == 0 {
 * 				links.resolvedType = target
 * 			} else {
 * 				links.resolvedType = c.createDeferredTypeReference(target, node, nil /*mapper* /, nil /*alias* /)
 * 			}
 * 		} else {
 * 			var elementTypes []*Type
 * 			if node.Kind == ast.KindArrayType {
 * 				elementTypes = []*Type{c.getTypeFromTypeNode(node.AsArrayTypeNode().ElementType)}
 * 			} else {
 * 				elementTypes = core.Map(node.Elements(), c.getTypeFromTypeNode)
 * 			}
 * 			if target.objectFlags&ObjectFlagsTuple != 0 {
 * 				links.resolvedType = c.createNormalizedTupleTypeEx(target, elementTypes, ObjectFlagsFromTypeNode)
 * 			} else {
 * 				links.resolvedType = c.createTypeReferenceEx(target, elementTypes, ObjectFlagsFromTypeNode)
 * 			}
 * 		}
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromArrayOrTupleTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey)!.v;
  if (links!.resolvedType === undefined) {
    const target = Checker_getArrayOrTupleTargetType(receiver, node);
    if (target === receiver!.emptyGenericType) {
      links!.resolvedType = receiver!.emptyObjectType;
    } else if (!(node!.Kind === KindTupleType && core.Some(Node_Elements(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), (e) => Checker_isVariadicTupleElement(receiver, e))) && Checker_isDeferredTypeReferenceNode(receiver, node, false)) {
      if (node!.Kind === KindTupleType && (Node_Elements(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())).length === 0) {
        links!.resolvedType = target;
      } else {
        links!.resolvedType = Checker_createDeferredTypeReference(receiver, target, node, undefined, undefined);
      }
    } else {
      const elementTypes = node!.Kind === KindArrayType ?
        [Checker_getTypeFromTypeNode(receiver, AsArrayTypeNode(node)!.ElementType)] :
        core.Map(Node_Elements(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), (element) => Checker_getTypeFromTypeNode(receiver, element));
      if ((target!.objectFlags & ObjectFlagsTuple) !== 0) {
        links!.resolvedType = Checker_createNormalizedTupleTypeEx(receiver, target, elementTypes, ObjectFlagsFromTypeNode);
      } else {
        links!.resolvedType = Checker_createTypeReferenceEx(receiver, target, elementTypes, ObjectFlagsFromTypeNode);
      }
    }
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isVariadicTupleElement","kind":"method","status":"implemented","sigHash":"07b0226c1ca9182e0cbf90b39080ca7b4d93fe0b5d3e12dc877501e497fdb6eb"}
 *
 * Go source:
 * func (c *Checker) isVariadicTupleElement(node *ast.Node) bool {
 * 	return c.getTupleElementFlags(node)&ElementFlagsVariadic != 0
 * }
 */
export function Checker_isVariadicTupleElement(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  return (Checker_getTupleElementFlags(receiver, node) & ElementFlagsVariadic) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getArrayOrTupleTargetType","kind":"method","status":"implemented","sigHash":"55b7297d7fbe443f89f44827d416e53c2312e24e4ab401bb00d194379446938a"}
 *
 * Go source:
 * func (c *Checker) getArrayOrTupleTargetType(node *ast.Node) *Type {
 * 	readonly := c.isReadonlyTypeOperator(node.Parent)
 * 	elementType := c.getArrayElementTypeNode(node)
 * 	if elementType != nil {
 * 		if readonly {
 * 			return c.globalReadonlyArrayType
 * 		}
 * 		return c.globalArrayType
 * 	}
 * 	return c.getTupleTargetType(core.Map(node.Elements(), c.getTupleElementInfo), readonly)
 * }
 */
export function Checker_getArrayOrTupleTargetType(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const readonly = Checker_isReadonlyTypeOperator(receiver, node!.Parent);
  const elementType = Checker_getArrayElementTypeNode(receiver, node);
  if (elementType !== undefined) {
    if (readonly) {
      return receiver!.globalReadonlyArrayType;
    }
    return receiver!.globalArrayType;
  }
  return Checker_getTupleTargetType(receiver, core.Map(Node_Elements(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), (element) => Checker_getTupleElementInfo(receiver, element)), readonly);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isReadonlyTypeOperator","kind":"method","status":"implemented","sigHash":"430f6fbdc352919782e08f903369f9d8d391ab6ad74621a939565a7e4ffabfbf"}
 *
 * Go source:
 * func (c *Checker) isReadonlyTypeOperator(node *ast.Node) bool {
 * 	return ast.IsTypeOperatorNode(node) && node.AsTypeOperatorNode().Operator == ast.KindReadonlyKeyword
 * }
 */
export function Checker_isReadonlyTypeOperator(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  return IsTypeOperatorNode(node) && AsTypeOperatorNode(node)!.Operator === KindReadonlyKeyword;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getArrayElementTypeNode","kind":"method","status":"implemented","sigHash":"bf93879afbfb1147c0fe3bc98c93ef6f467b9f504e6271fddceab4c1117ae183"}
 *
 * Go source:
 * func (c *Checker) getArrayElementTypeNode(node *ast.Node) *ast.Node {
 * 	switch node.Kind {
 * 	case ast.KindParenthesizedType:
 * 		return c.getArrayElementTypeNode(node.Type())
 * 	case ast.KindTupleType:
 * 		if len(node.Elements()) == 1 {
 * 			node = node.Elements()[0]
 * 			if node.Kind == ast.KindRestType {
 * 				return c.getArrayElementTypeNode(node.Type())
 * 			}
 * 			if node.Kind == ast.KindNamedTupleMember && node.AsNamedTupleMember().DotDotDotToken != nil {
 * 				return c.getArrayElementTypeNode(node.Type())
 * 			}
 * 		}
 * 	case ast.KindArrayType:
 * 		return node.AsArrayTypeNode().ElementType
 * 	}
 * 	return nil
 * }
 */
export function Checker_getArrayElementTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Node> {
  switch (node!.Kind) {
  case KindParenthesizedType:
    return Checker_getArrayElementTypeNode(receiver, Node_Type(node));
  case KindTupleType: {
    const elements = Node_Elements(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
    if (elements.length === 1) {
      const elem = GoSliceLoad(elements, 0, GoPointerValueOps<Node>());
      if (elem!.Kind === KindRestType) {
        return Checker_getArrayElementTypeNode(receiver, Node_Type(elem));
      }
      if (elem!.Kind === KindNamedTupleMember && AsNamedTupleMember(elem)!.DotDotDotToken !== undefined) {
        return Checker_getArrayElementTypeNode(receiver, Node_Type(elem));
      }
    }
    break;
  }
  case KindArrayType:
    return AsArrayTypeNode(node)!.ElementType;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromOptionalTypeNode","kind":"method","status":"implemented","sigHash":"790e6a9acf6c053d8053a88b7abfcada05b8498acbb4a4c2ff5b3c582ef62dbf"}
 *
 * Go source:
 * func (c *Checker) getTypeFromOptionalTypeNode(node *ast.Node) *Type {
 * 	return c.addOptionalityEx(c.getTypeFromTypeNode(node.Type()), true /*isProperty* /, true /*isOptional* /)
 * }
 */
export function Checker_getTypeFromOptionalTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  return Checker_addOptionalityEx(receiver, Checker_getTypeFromTypeNode(receiver, Node_Type(node)), true, true);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromUnionTypeNode","kind":"method","status":"implemented","sigHash":"63b5aba78724181c0224896247370df1edeca865f2d0d0525610de37ec7f62dc"}
 *
 * Go source:
 * func (c *Checker) getTypeFromUnionTypeNode(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		alias := c.getAliasForTypeNode(node)
 * 		links.resolvedType = c.getUnionTypeEx(core.Map(node.AsUnionTypeNode().Types.Nodes, c.getTypeFromTypeNode), UnionReductionLiteral, alias, nil /*origin* /)
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromUnionTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey)!.v;
  if (links!.resolvedType === undefined) {
    const alias = Checker_getAliasForTypeNode(receiver, node);
    links!.resolvedType = Checker_getUnionTypeEx(receiver, core.Map(AsUnionTypeNode(node)!.Types!.Nodes, (typeNode) => Checker_getTypeFromTypeNode(receiver, typeNode)), UnionReductionLiteral, alias, undefined);
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromIntersectionTypeNode","kind":"method","status":"implemented","sigHash":"639ae994f15ccbace8e9af6e0122a5fc5e1b00aacb977517d27e281120ea6b93"}
 *
 * Go source:
 * func (c *Checker) getTypeFromIntersectionTypeNode(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		alias := c.getAliasForTypeNode(node)
 * 		types := core.Map(node.AsIntersectionTypeNode().Types.Nodes, c.getTypeFromTypeNode)
 * 		// We perform no supertype reduction for X & {} or {} & X, where X is one of string, number, bigint,
 * 		// or a pattern literal template type. This enables union types like "a" | "b" | string & {} or
 * 		// "aa" | "ab" | `a${string}` which preserve the literal types for purposes of statement completion.
 * 		noSupertypeReduction := false
 * 		if len(types) == 2 {
 * 			emptyIndex := slices.Index(types, c.emptyTypeLiteralType)
 * 			if emptyIndex >= 0 {
 * 				t := types[1-emptyIndex]
 * 				noSupertypeReduction = t.flags&(TypeFlagsString|TypeFlagsNumber|TypeFlagsBigInt) != 0 || t.flags&TypeFlagsTemplateLiteral != 0 && c.isPatternLiteralType(t)
 * 			}
 * 		}
 * 		links.resolvedType = c.getIntersectionTypeEx(types, core.IfElse(noSupertypeReduction, IntersectionFlagsNoSupertypeReduction, 0), alias)
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromIntersectionTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey)!.v;
  if (links!.resolvedType === undefined) {
    const alias = Checker_getAliasForTypeNode(receiver, node);
    const types = core.Map(AsIntersectionTypeNode(node)!.Types!.Nodes, (typeNode) => Checker_getTypeFromTypeNode(receiver, typeNode));
    let noSupertypeReduction = false;
    if (types.length === 2) {
      const emptyIndex = slices.Index(types, receiver!.emptyTypeLiteralType, GoEqualStrict<GoPtr<Type>>);
      if (emptyIndex >= 0) {
        const t = GoSliceLoad(types, 1 - emptyIndex, GoPointerValueOps<Type>());
        noSupertypeReduction = (t!.flags & (TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt)) !== 0 ||
          ((t!.flags & TypeFlagsTemplateLiteral) !== 0 && Checker_isPatternLiteralType(receiver, t));
      }
    }
    links!.resolvedType = Checker_getIntersectionTypeEx(receiver, types, noSupertypeReduction ? IntersectionFlagsNoSupertypeReduction : 0, alias);
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromTemplateTypeNode","kind":"method","status":"implemented","sigHash":"f4af7a9c243185fd88fd745f795b6915a0b96b8364c0912929a47ad5da3bbf51"}
 *
 * Go source:
 * func (c *Checker) getTypeFromTemplateTypeNode(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		spans := node.AsTemplateLiteralTypeNode().TemplateSpans
 * 		texts := make([]string, len(spans.Nodes)+1)
 * 		types := make([]*Type, len(spans.Nodes))
 * 		texts[0] = node.AsTemplateLiteralTypeNode().Head.Text()
 * 		for i, span := range spans.Nodes {
 * 			texts[i+1] = span.AsTemplateLiteralTypeSpan().Literal.Text()
 * 			types[i] = c.getTypeFromTypeNode(span.Type())
 * 		}
 * 		links.resolvedType = c.getTemplateLiteralType(texts, types)
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromTemplateTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey)!.v;
  if (links!.resolvedType === undefined) {
    const data = AsTemplateLiteralTypeNode(node)!;
    const spans = data.TemplateSpans!.Nodes;
    const texts: GoSlice<string> = new Array(spans.length + 1);
    const types: GoSlice<GoPtr<Type>> = new Array(spans.length);
    GoSliceStore(texts, 0, Node_Text(data.Head), GoStringValueOps);
    for (let i = 0; i < spans.length; i++) {
      const span = AsTemplateLiteralTypeSpan(GoSliceLoad(spans, i, GoPointerValueOps<Node>()))!;
      GoSliceStore(texts, i + 1, Node_Text(span.Literal), GoStringValueOps);
      GoSliceStore(types, i, Checker_getTypeFromTypeNode(receiver, Node_Type(GoSliceLoad(spans, i, GoPointerValueOps<Node>()))), GoPointerValueOps<Type>());
    }
    links!.resolvedType = Checker_getTemplateLiteralType(receiver, texts, types);
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromMappedTypeNode","kind":"method","status":"implemented","sigHash":"6f9ea0b589ab542aa519e0a0529f9503da6d672461a3ae5858e5601f06601afd"}
 *
 * Go source:
 * func (c *Checker) getTypeFromMappedTypeNode(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		t := c.newObjectType(ObjectFlagsMapped, node.Symbol())
 * 		t.AsMappedType().declaration = node.AsMappedTypeNode()
 * 		t.alias = c.getAliasForTypeNode(node)
 * 		links.resolvedType = t
 * 		// Eagerly resolve the constraint type which forces an error if the constraint type circularly
 * 		// references itself through one or more type aliases.
 * 		c.getConstraintTypeFromMappedType(t)
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromMappedTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey)!.v;
  if (links!.resolvedType === undefined) {
    const t = Checker_newObjectType(receiver, ObjectFlagsMapped, Node_Symbol(node));
    Type_AsMappedType(t)!.declaration = AsMappedTypeNode(node);
    t!.alias = Checker_getAliasForTypeNode(receiver, node);
    links!.resolvedType = t;
    Checker_getConstraintTypeFromMappedType(receiver, t);
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFromConditionalTypeNode","kind":"method","status":"implemented","sigHash":"22cfa29c148858483a6f6a847a6c5bf779afd28d97f4e11ab9a971e637712146"}
 *
 * Go source:
 * func (c *Checker) getTypeFromConditionalTypeNode(node *ast.Node) *Type {
 * 	links := c.typeNodeLinks.Get(node)
 * 	if links.resolvedType == nil {
 * 		checkType := c.getTypeFromTypeNode(node.AsConditionalTypeNode().CheckType)
 * 		alias := c.getAliasForTypeNode(node)
 * 		allOuterTypeParameters := c.getOuterTypeParameters(node, true /*includeThisTypes* /)
 * 		var outerTypeParameters []*Type
 * 		if alias != nil && len(alias.typeArguments) != 0 {
 * 			outerTypeParameters = allOuterTypeParameters
 * 		} else {
 * 			outerTypeParameters = core.Filter(allOuterTypeParameters, func(tp *Type) bool { return c.isTypeParameterPossiblyReferenced(tp, node) })
 * 		}
 * 		root := &ConditionalRoot{
 * 			node:                node.AsConditionalTypeNode(),
 * 			checkType:           checkType,
 * 			extendsType:         c.getTypeFromTypeNode(node.AsConditionalTypeNode().ExtendsType),
 * 			isDistributive:      checkType.flags&TypeFlagsTypeParameter != 0,
 * 			inferTypeParameters: c.getInferTypeParameters(node),
 * 			outerTypeParameters: outerTypeParameters,
 * 			instantiations:      nil,
 * 			alias:               alias,
 * 		}
 * 		links.resolvedType = c.getConditionalType(root, nil /*mapper* /, false /*forConstraint* /, nil)
 * 		if outerTypeParameters != nil {
 * 			root.instantiations = make(map[CacheHashKey]*Type)
 * 			root.instantiations[getConditionalTypeKey(outerTypeParameters, nil /*alias* /, false /*forConstraint* /)] = links.resolvedType
 * 		}
 * 	}
 * 	return links.resolvedType
 * }
 */
export function Checker_getTypeFromConditionalTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const links = LinkStore_Get(receiver!.typeNodeLinks, node, zeroTypeNodeLinks, goNodePointerKey)!.v;
  if (links!.resolvedType === undefined) {
    const conditionalTypeNode = AsConditionalTypeNode(node)!;
    const checkType = Checker_getTypeFromTypeNode(receiver, conditionalTypeNode.CheckType);
    const alias = Checker_getAliasForTypeNode(receiver, node);
    const allOuterTypeParameters = Checker_getOuterTypeParameters(receiver, node, true);
    const outerTypeParameters =
      alias !== undefined && alias.typeArguments.length !== 0
        ? allOuterTypeParameters
        : core.Filter(allOuterTypeParameters, (typeParameter: GoPtr<Type>): bool =>
            Checker_isTypeParameterPossiblyReferenced(receiver, typeParameter, node),
          );
    const root: ConditionalRoot = {
      node: conditionalTypeNode,
      checkType,
      extendsType: Checker_getTypeFromTypeNode(receiver, conditionalTypeNode.ExtendsType),
      isDistributive: (checkType!.flags & TypeFlagsTypeParameter) !== 0,
      inferTypeParameters: Checker_getInferTypeParameters(receiver, node),
      outerTypeParameters,
      instantiations: GoNilMap<CacheHashKey, GoPtr<Type>>(),
      alias,
    };
    links!.resolvedType = Checker_getConditionalType(receiver, root, undefined, false, undefined);
    if (!GoSliceIsNil(outerTypeParameters)) {
      root.instantiations = NewGoStructMap(GoStructKey(
        [GoStructField((value: CacheHashKey) => value.Hi, GoBigIntKey), GoStructField((value: CacheHashKey) => value.Lo, GoBigIntKey)],
        ([Hi, Lo], source) => globalThis.Object.assign(globalThis.Object.create(globalThis.Object.getPrototypeOf(source)) as CacheHashKey, source, { Hi, Lo }),
      ));
      root.instantiations.set(getConditionalTypeKey(outerTypeParameters, undefined, false), links!.resolvedType);
    }
  }
  return links!.resolvedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getConditionalType","kind":"method","status":"implemented","sigHash":"d50653c4663f396a2282f172098515c6e4820dfb760b0e6fd67b8aa329f4d70a"}
 *
 * Go source:
 * func (c *Checker) getConditionalType(root *ConditionalRoot, mapper *TypeMapper, forConstraint bool, alias *TypeAlias) *Type {
 * 	var result *Type
 * 	var extraTypes []*Type
 * 	tailCount := 0
 * 	// We loop here for an immediately nested conditional type in the false position, effectively treating
 * 	// types of the form 'A extends B ? X : C extends D ? Y : E extends F ? Z : ...' as a single construct for
 * 	// purposes of resolution. We also loop here when resolution of a conditional type ends in resolution of
 * 	// another (or, through recursion, possibly the same) conditional type. In the potentially tail-recursive
 * 	// cases we increment the tail recursion counter and stop after 1000 iterations.
 * 	for {
 * 		if tailCount == 1000 {
 * 			c.error(c.currentNode, diagnostics.Type_instantiation_is_excessively_deep_and_possibly_infinite)
 * 			return c.errorType
 * 		}
 * 		checkType := c.instantiateType(c.getActualTypeVariable(root.checkType), mapper)
 * 		extendsType := c.instantiateType(root.extendsType, mapper)
 * 		if checkType == c.errorType || extendsType == c.errorType {
 * 			return c.errorType
 * 		}
 * 		if checkType == c.wildcardType || extendsType == c.wildcardType {
 * 			return c.wildcardType
 * 		}
 * 		checkTypeNode := ast.SkipTypeParentheses(root.node.CheckType)
 * 		extendsTypeNode := ast.SkipTypeParentheses(root.node.ExtendsType)
 * 		// When the check and extends types are simple tuple types of the same arity, we defer resolution of the
 * 		// conditional type when any tuple elements are generic. This is such that non-distributable conditional
 * 		// types can be written `[X] extends [Y] ? ...` and be deferred similarly to `X extends Y ? ...`.
 * 		checkTuples := c.isSimpleTupleType(checkTypeNode) && c.isSimpleTupleType(extendsTypeNode) && len(checkTypeNode.Elements()) == len(extendsTypeNode.Elements())
 * 		checkTypeDeferred := c.isDeferredType(checkType, checkTuples)
 * 		var combinedMapper *TypeMapper
 * 		if len(root.inferTypeParameters) != 0 {
 * 			// When we're looking at making an inference for an infer type, when we get its constraint, it'll automagically be
 * 			// instantiated with the context, so it doesn't need the mapper for the inference context - however the constraint
 * 			// may refer to another _root_, _uncloned_ `infer` type parameter [1], or to something mapped by `mapper` [2].
 * 			// [1] Eg, if we have `Foo<T, U extends T>` and `Foo<number, infer B>` - `B` is constrained to `T`, which, in turn, has been instantiated
 * 			// as `number`
 * 			// Conversely, if we have `Foo<infer A, infer B>`, `B` is still constrained to `T` and `T` is instantiated as `A`
 * 			// [2] Eg, if we have `Foo<T, U extends T>` and `Foo<Q, infer B>` where `Q` is mapped by `mapper` into `number` - `B` is constrained to `T`
 * 			// which is in turn instantiated as `Q`, which is in turn instantiated as `number`.
 * 			// So we need to:
 * 			//    * combine `context.nonFixingMapper` with `mapper` so their constraints can be instantiated in the context of `mapper` (otherwise they'd only get inference context information)
 * 			//    * incorporate all of the component mappers into the combined mapper for the true and false members
 * 			// This means we have two mappers that need applying:
 * 			//    * The original `mapper` used to create this conditional
 * 			//    * The mapper that maps the infer type parameter to its inference result (`context.mapper`)
 * 			context := c.newInferenceContext(root.inferTypeParameters, nil /*signature* /, InferenceFlagsNone, nil)
 * 			if mapper != nil {
 * 				context.nonFixingMapper = c.combineTypeMappers(context.nonFixingMapper, mapper)
 * 			}
 * 			if !checkTypeDeferred {
 * 				// We don't want inferences from constraints as they may cause us to eagerly resolve the
 * 				// conditional type instead of deferring resolution. Also, we always want strict function
 * 				// types rules (i.e. proper contravariance) for inferences.
 * 				c.inferTypes(context.inferences, checkType, extendsType, InferencePriorityNoConstraints|InferencePriorityAlwaysStrict, false)
 * 			}
 * 			// It's possible for 'infer T' type parameters to be given uninstantiated constraints when the
 * 			// those type parameters are used in type references (see getInferredTypeParameterConstraint). For
 * 			// that reason we need context.mapper to be first in the combined mapper. See #42636 for examples.
 * 			if mapper != nil {
 * 				combinedMapper = c.combineTypeMappers(context.mapper, mapper)
 * 			} else {
 * 				combinedMapper = context.mapper
 * 			}
 * 		}
 * 		// Instantiate the extends type including inferences for 'infer T' type parameters
 * 		var inferredExtendsType *Type
 * 		if combinedMapper != nil {
 * 			inferredExtendsType = c.instantiateType(root.extendsType, combinedMapper)
 * 		} else {
 * 			inferredExtendsType = extendsType
 * 		}
 * 		// We attempt to resolve the conditional type only when the check and extends types are non-generic
 * 		if !checkTypeDeferred && !c.isDeferredType(inferredExtendsType, checkTuples) {
 * 			// Return falseType for a definitely false extends check. We check an instantiations of the two
 * 			// types with type parameters mapped to the wildcard type, the most permissive instantiations
 * 			// possible (the wildcard type is assignable to and from all types). If those are not related,
 * 			// then no instantiations will be and we can just return the false branch type.
 * 			if inferredExtendsType.flags&TypeFlagsAnyOrUnknown == 0 && (checkType.flags&TypeFlagsAny != 0 || !c.isTypeAssignableTo(c.getPermissiveInstantiation(checkType), c.getPermissiveInstantiation(inferredExtendsType))) {
 * 				// Return union of trueType and falseType for 'any' since it matches anything. Furthermore, for a
 * 				// distributive conditional type applied to the constraint of a type variable, include trueType if
 * 				// there are possible values of the check type that are also possible values of the extends type.
 * 				// We use a reverse assignability check as it is less expensive than the comparable relationship
 * 				// and avoids false positives of a non-empty intersection check.
 * 				if checkType.flags&TypeFlagsAny != 0 || forConstraint && inferredExtendsType.flags&TypeFlagsNever == 0 && someType(c.getPermissiveInstantiation(inferredExtendsType), func(t *Type) bool {
 * 					return c.isTypeAssignableTo(t, c.getPermissiveInstantiation(checkType))
 * 				}) {
 * 					extraTypes = append(extraTypes, c.instantiateType(c.getTypeFromTypeNode(root.node.TrueType), core.OrElse(combinedMapper, mapper)))
 * 				}
 * 				// If falseType is an immediately nested conditional type that isn't distributive or has an
 * 				// identical checkType, switch to that type and loop.
 * 				falseType := c.getTypeFromTypeNode(root.node.FalseType)
 * 				if falseType.flags&TypeFlagsConditional != 0 {
 * 					newRoot := falseType.AsConditionalType().root
 * 					if newRoot.node.Parent == root.node.AsNode() && (!newRoot.isDistributive || newRoot.checkType == root.checkType) {
 * 						root = newRoot
 * 						continue
 * 					}
 * 					if newRoot, newRootMapper := c.getTailRecursionRoot(falseType, mapper); newRoot != nil {
 * 						root = newRoot
 * 						mapper = newRootMapper
 * 						alias = nil
 * 						if newRoot.alias != nil {
 * 							tailCount++
 * 						}
 * 						continue
 * 					}
 * 				}
 * 				result = c.instantiateType(falseType, mapper)
 * 				break
 * 			}
 * 			// Return trueType for a definitely true extends check. We check instantiations of the two
 * 			// types with type parameters mapped to their restrictive form, i.e. a form of the type parameter
 * 			// that has no constraint. This ensures that, for example, the type
 * 			//   type Foo<T extends { x: any }> = T extends { x: string } ? string : number
 * 			// doesn't immediately resolve to 'string' instead of being deferred.
 * 			if inferredExtendsType.flags&TypeFlagsAnyOrUnknown != 0 || c.isTypeAssignableTo(c.getRestrictiveInstantiation(checkType), c.getRestrictiveInstantiation(inferredExtendsType)) {
 * 				trueType := c.getTypeFromTypeNode(root.node.TrueType)
 * 				trueMapper := core.OrElse(combinedMapper, mapper)
 * 				if newRoot, newRootMapper := c.getTailRecursionRoot(trueType, trueMapper); newRoot != nil {
 * 					root = newRoot
 * 					mapper = newRootMapper
 * 					alias = nil
 * 					if newRoot.alias != nil {
 * 						tailCount++
 * 					}
 * 					continue
 * 				}
 * 				result = c.instantiateType(trueType, trueMapper)
 * 				break
 * 			}
 * 		}
 * 		// Return a deferred type for a check that is neither definitely true nor definitely false
 * 		result = c.newConditionalType(root, mapper, combinedMapper)
 * 		if alias != nil {
 * 			result.alias = alias
 * 		} else {
 * 			result.alias = c.instantiateTypeAlias(root.alias, mapper)
 * 		}
 * 		break
 * 	}
 * 	if extraTypes != nil {
 * 		return c.getUnionType(append(extraTypes, result))
 * 	}
 * 	return result
 * }
 */
export function Checker_getConditionalType(receiver: GoPtr<Checker>, root: GoPtr<ConditionalRoot>, mapper: GoPtr<TypeMapper>, forConstraint: bool, alias: GoPtr<TypeAlias>): GoPtr<Type> {
  let result: GoPtr<Type> = undefined;
  let extraTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
  let tailCount = 0;
  for (;;) {
    if (tailCount === 1000) {
      Checker_error(receiver, receiver!.currentNode, diagnosticsMessages.Type_instantiation_is_excessively_deep_and_possibly_infinite);
      return receiver!.errorType;
    }
    const checkType = Checker_instantiateType(receiver, Checker_getActualTypeVariable(receiver, root!.checkType), mapper);
    const extendsType = Checker_instantiateType(receiver, root!.extendsType, mapper);
    if (checkType === receiver!.errorType || extendsType === receiver!.errorType) {
      return receiver!.errorType;
    }
    if (checkType === receiver!.wildcardType || extendsType === receiver!.wildcardType) {
      return receiver!.wildcardType;
    }

    const rootNode = AsConditionalTypeNode(root!.node)!;
    const checkTypeNode = SkipTypeParentheses(rootNode.CheckType);
    const extendsTypeNode = SkipTypeParentheses(rootNode.ExtendsType);
    const checkTuples = Checker_isSimpleTupleType(receiver, checkTypeNode) &&
      Checker_isSimpleTupleType(receiver, extendsTypeNode) &&
      (Node_Elements(checkTypeNode) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())).length === (Node_Elements(extendsTypeNode) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())).length;
    const checkTypeDeferred = Checker_isDeferredType(receiver, checkType, checkTuples);
    let combinedMapper: GoPtr<TypeMapper> = undefined;
    if (root!.inferTypeParameters.length !== 0) {
      const context = Checker_newInferenceContext(receiver, root!.inferTypeParameters, undefined, InferenceFlagsNone, undefined as unknown as TypeComparer);
      if (mapper !== undefined) {
        context!.nonFixingMapper = Checker_combineTypeMappers(receiver, context!.nonFixingMapper, mapper);
      }
      if (!checkTypeDeferred) {
        Checker_inferTypes(receiver, context!.inferences, checkType, extendsType, InferencePriorityNoConstraints | InferencePriorityAlwaysStrict, false);
      }
      combinedMapper = mapper !== undefined ? Checker_combineTypeMappers(receiver, context!.mapper, mapper) : context!.mapper;
    }

    const inferredExtendsType = combinedMapper !== undefined ? Checker_instantiateType(receiver, root!.extendsType, combinedMapper) : extendsType;
    if (!checkTypeDeferred && !Checker_isDeferredType(receiver, inferredExtendsType, checkTuples)) {
      if (
        (inferredExtendsType!.flags & TypeFlagsAnyOrUnknown) === 0 &&
        ((checkType!.flags & TypeFlagsAny) !== 0 ||
          !Checker_isTypeAssignableTo(receiver, Checker_getPermissiveInstantiation(receiver, checkType), Checker_getPermissiveInstantiation(receiver, inferredExtendsType)))
      ) {
        if (
          (checkType!.flags & TypeFlagsAny) !== 0 ||
          (forConstraint &&
            (inferredExtendsType!.flags & TypeFlagsNever) === 0 &&
            someType(Checker_getPermissiveInstantiation(receiver, inferredExtendsType), (t: GoPtr<Type>): bool =>
              Checker_isTypeAssignableTo(receiver, t, Checker_getPermissiveInstantiation(receiver, checkType)),
            ))
        ) {
          extraTypes = GoSliceAppend(extraTypes, Checker_instantiateType(receiver, Checker_getTypeFromTypeNode(receiver, rootNode.TrueType), core.OrElse(combinedMapper, mapper, GoZeroPointer<TypeMapper>, GoEqualStrict<GoPtr<TypeMapper>>)), GoPointerValueOps<Type>());
        }
        const falseType = Checker_getTypeFromTypeNode(receiver, rootNode.FalseType);
        if ((falseType!.flags & TypeFlagsConditional) !== 0) {
          const newRoot = Type_AsConditionalType(falseType)!.root;
          if (newRoot!.node!.Parent === root!.node && (!newRoot!.isDistributive || newRoot!.checkType === root!.checkType)) {
            root = newRoot;
            continue;
          }
          const [tailRoot, tailMapper] = Checker_getTailRecursionRoot(receiver, falseType, mapper);
          if (tailRoot !== undefined) {
            root = tailRoot;
            mapper = tailMapper;
            alias = undefined;
            if (tailRoot!.alias !== undefined) {
              tailCount++;
            }
            continue;
          }
        }
        result = Checker_instantiateType(receiver, falseType, mapper);
        break;
      }
      if (
        (inferredExtendsType!.flags & TypeFlagsAnyOrUnknown) !== 0 ||
        Checker_isTypeAssignableTo(receiver, Checker_getRestrictiveInstantiation(receiver, checkType), Checker_getRestrictiveInstantiation(receiver, inferredExtendsType))
      ) {
        const trueType = Checker_getTypeFromTypeNode(receiver, rootNode.TrueType);
        const trueMapper = core.OrElse(combinedMapper, mapper, GoZeroPointer<TypeMapper>, GoEqualStrict<GoPtr<TypeMapper>>);
        const [tailRoot, tailMapper] = Checker_getTailRecursionRoot(receiver, trueType, trueMapper);
        if (tailRoot !== undefined) {
          root = tailRoot;
          mapper = tailMapper;
          alias = undefined;
          if (tailRoot!.alias !== undefined) {
            tailCount++;
          }
          continue;
        }
        result = Checker_instantiateType(receiver, trueType, trueMapper);
        break;
      }
    }
    result = Checker_newConditionalType(receiver, root, mapper, combinedMapper);
    if (alias !== undefined) {
      result!.alias = alias;
    } else {
      result!.alias = Checker_instantiateTypeAlias(receiver, root!.alias, mapper);
    }
    break;
  }
  if (!GoSliceIsNil(extraTypes)) {
    return Checker_getUnionType(receiver, GoSliceAppend(extraTypes, result, GoPointerValueOps<Type>()));
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isSimpleTupleType","kind":"method","status":"implemented","sigHash":"9cde4d41bce4e7dc7671b2ec95a591ac75e122f29f06718134a355b8100ede2a"}
 *
 * Go source:
 * func (c *Checker) isSimpleTupleType(node *ast.Node) bool {
 * 	return ast.IsTupleTypeNode(node) && len(node.Elements()) > 0 && !core.Some(node.Elements(), func(e *ast.Node) bool {
 * 		return ast.IsOptionalTypeNode(e) || ast.IsRestTypeNode(e) || ast.IsNamedTupleMember(e) && (e.QuestionToken() != nil || e.AsNamedTupleMember().DotDotDotToken != nil)
 * 	})
 * }
 */
export function Checker_isSimpleTupleType(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  if (!IsTupleTypeNode(node)) {
    return false;
  }
  const elements = Node_Elements(node)!;
  return elements.length > 0 && !core.Some(elements, (e) =>
    IsOptionalTypeNode(e) || IsRestTypeNode(e) || (IsNamedTupleMember(e) && (Node_QuestionToken(e) !== undefined || AsNamedTupleMember(e)!.DotDotDotToken !== undefined))
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isDeferredType","kind":"method","status":"implemented","sigHash":"54b4f7fb6d94946389481cbd9f137f111c498a84146056e8d77f6a7f4f9e7e5a"}
 *
 * Go source:
 * func (c *Checker) isDeferredType(t *Type, checkTuples bool) bool {
 * 	return c.isGenericType(t) || checkTuples && isTupleType(t) && core.Some(c.getElementTypes(t), c.isGenericType)
 * }
 */
export function Checker_isDeferredType(receiver: GoPtr<Checker>, t: GoPtr<Type>, checkTuples: bool): bool {
  return Checker_isGenericType(receiver, t) || (checkTuples && isTupleType(t) && core.Some(Checker_getElementTypes(receiver, t), (element) => Checker_isGenericType(receiver, element)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTrueTypeFromConditionalType","kind":"method","status":"implemented","sigHash":"3f9e1e35527cca714afc0035b07ad903dd9cc4a76eae0aa8920c48990a21b0c0"}
 *
 * Go source:
 * func (c *Checker) getTrueTypeFromConditionalType(t *Type) *Type {
 * 	d := t.AsConditionalType()
 * 	if d.resolvedTrueType == nil {
 * 		d.resolvedTrueType = c.instantiateType(c.getTypeFromTypeNode(d.root.node.TrueType), d.mapper)
 * 	}
 * 	return d.resolvedTrueType
 * }
 */
export function Checker_getTrueTypeFromConditionalType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const d = Type_AsConditionalType(t);
  if (d!.resolvedTrueType === undefined) {
    d!.resolvedTrueType = Checker_instantiateType(receiver, Checker_getTypeFromTypeNode(receiver, AsConditionalTypeNode(d!.root!.node)!.TrueType), d!.mapper);
  }
  return d!.resolvedTrueType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getFalseTypeFromConditionalType","kind":"method","status":"implemented","sigHash":"68e04354de43a15d174cf478a927d8e925ce4a7b74b7aa511878093ca8f64fd9"}
 *
 * Go source:
 * func (c *Checker) getFalseTypeFromConditionalType(t *Type) *Type {
 * 	d := t.AsConditionalType()
 * 	if d.resolvedFalseType == nil {
 * 		d.resolvedFalseType = c.instantiateType(c.getTypeFromTypeNode(d.root.node.FalseType), d.mapper)
 * 	}
 * 	return d.resolvedFalseType
 * }
 */
export function Checker_getFalseTypeFromConditionalType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const d = Type_AsConditionalType(t);
  if (d!.resolvedFalseType === undefined) {
    d!.resolvedFalseType = Checker_instantiateType(receiver, Checker_getTypeFromTypeNode(receiver, AsConditionalTypeNode(d!.root!.node)!.FalseType), d!.mapper);
  }
  return d!.resolvedFalseType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createIterableType","kind":"method","status":"implemented","sigHash":"bd2224982c77d7fe346ef13e7513a949a11bec9eb3cffde9e23f075792aabf70"}
 *
 * Go source:
 * func (c *Checker) createIterableType(iteratedType *Type) *Type {
 * 	return c.createTypeFromGenericGlobalType(c.getGlobalIterableTypeChecked(), []*Type{iteratedType, c.voidType, c.undefinedType})
 * }
 */
export function Checker_createIterableType(receiver: GoPtr<Checker>, iteratedType: GoPtr<Type>): GoPtr<Type> {
  return Checker_createTypeFromGenericGlobalType(receiver, receiver!.getGlobalIterableTypeChecked!(), GoSliceBuild(3, 3, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, iteratedType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, receiver!.voidType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 2, receiver!.undefinedType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createArrayType","kind":"method","status":"implemented","sigHash":"6e6acd3011d710ce2510ea329cfe3f869ce735ad27529de4083efc6536097dff"}
 *
 * Go source:
 * func (c *Checker) createArrayType(elementType *Type) *Type {
 * 	return c.createArrayTypeEx(elementType, false /*readonly* /)
 * }
 */
export function Checker_createArrayType(receiver: GoPtr<Checker>, elementType: GoPtr<Type>): GoPtr<Type> {
  return Checker_createArrayTypeEx(receiver, elementType, false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createArrayTypeEx","kind":"method","status":"implemented","sigHash":"9cf77a1cefd15881cf3bbf127ab721830d1d4f06f02df9cd4765153caf2fcb09"}
 *
 * Go source:
 * func (c *Checker) createArrayTypeEx(elementType *Type, readonly bool) *Type {
 * 	return c.createTypeFromGenericGlobalType(core.IfElse(readonly, c.globalReadonlyArrayType, c.globalArrayType), []*Type{elementType})
 * }
 */
export function Checker_createArrayTypeEx(receiver: GoPtr<Checker>, elementType: GoPtr<Type>, readonly: bool): GoPtr<Type> {
  return Checker_createTypeFromGenericGlobalType(receiver, readonly ? receiver!.globalReadonlyArrayType : receiver!.globalArrayType, GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, elementType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTupleElementFlags","kind":"method","status":"implemented","sigHash":"27439f398bb5fe4c8adb5d806d960febd7208528aa9fb37fbecadc70b180f146"}
 *
 * Go source:
 * func (c *Checker) getTupleElementFlags(node *ast.Node) ElementFlags {
 * 	switch node.Kind {
 * 	case ast.KindOptionalType:
 * 		return ElementFlagsOptional
 * 	case ast.KindRestType:
 * 		return core.IfElse(c.getArrayElementTypeNode(node.Type()) != nil, ElementFlagsRest, ElementFlagsVariadic)
 * 	case ast.KindNamedTupleMember:
 * 		named := node.AsNamedTupleMember()
 * 		switch {
 * 		case named.QuestionToken != nil:
 * 			return ElementFlagsOptional
 * 		case named.DotDotDotToken != nil:
 * 			return core.IfElse(c.getArrayElementTypeNode(named.Type) != nil, ElementFlagsRest, ElementFlagsVariadic)
 * 		}
 * 		return ElementFlagsRequired
 * 	}
 * 	return ElementFlagsRequired
 * }
 */
export function Checker_getTupleElementFlags(receiver: GoPtr<Checker>, node: GoPtr<Node>): ElementFlags {
  switch (node!.Kind) {
  case KindOptionalType:
    return ElementFlagsOptionalFlag;
  case KindRestType:
    return Checker_getArrayElementTypeNode(receiver, Node_Type(node)) !== undefined ? ElementFlagsRest : ElementFlagsVariadic;
  case KindNamedTupleMember: {
    const named = AsNamedTupleMember(node);
    if (named!.QuestionToken !== undefined) {
      return ElementFlagsOptionalFlag;
    }
    if (named!.DotDotDotToken !== undefined) {
      return Checker_getArrayElementTypeNode(receiver, named!.Type) !== undefined ? ElementFlagsRest : ElementFlagsVariadic;
    }
    return ElementFlagsRequired;
  }
  }
  return ElementFlagsRequired;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTupleElementInfo","kind":"method","status":"implemented","sigHash":"1e81ca9307024652e7de0349fcc487213fd966b9dea3b417401f5eb779333718"}
 *
 * Go source:
 * func (c *Checker) getTupleElementInfo(node *ast.Node) TupleElementInfo {
 * 	return TupleElementInfo{
 * 		flags:              c.getTupleElementFlags(node),
 * 		labeledDeclaration: core.IfElse(ast.IsNamedTupleMember(node) || ast.IsParameterDeclaration(node), node, nil),
 * 	}
 * }
 */
export function Checker_getTupleElementInfo(receiver: GoPtr<Checker>, node: GoPtr<Node>): TupleElementInfo {
  return {
    flags: Checker_getTupleElementFlags(receiver, node),
    labeledDeclaration: (IsNamedTupleMember(node) || IsParameterDeclaration(node)) ? node : undefined,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createTupleType","kind":"method","status":"implemented","sigHash":"e8749ab2479f91a6592f72253256f1da1e525052140400b254e05017aa5c2d88"}
 *
 * Go source:
 * func (c *Checker) createTupleType(elementTypes []*Type) *Type {
 * 	elementInfos := core.Map(elementTypes, func(_ *Type) TupleElementInfo { return TupleElementInfo{flags: ElementFlagsRequired} })
 * 	return c.createTupleTypeEx(elementTypes, elementInfos, false /*readonly* /)
 * }
 */
export function Checker_createTupleType(receiver: GoPtr<Checker>, elementTypes: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  const elementInfos = core.Map(elementTypes ?? GoSliceMake(0, 0, GoPointerValueOps<Type>()), (_: GoPtr<Type>): TupleElementInfo => ({ flags: ElementFlagsRequired, labeledDeclaration: undefined }));
  return Checker_createTupleTypeEx(receiver, elementTypes, elementInfos, false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createTupleTypeEx","kind":"method","status":"implemented","sigHash":"fccbc1380f3a3724af87b5588a0f66b03985b279ae637b392d983de33adc54a6"}
 *
 * Go source:
 * func (c *Checker) createTupleTypeEx(elementTypes []*Type, elementInfos []TupleElementInfo, readonly bool) *Type {
 * 	tupleTarget := c.getTupleTargetType(elementInfos, readonly)
 * 	switch {
 * 	case tupleTarget == c.emptyGenericType:
 * 		return c.emptyObjectType
 * 	case len(elementTypes) != 0:
 * 		return c.createNormalizedTypeReference(tupleTarget, elementTypes)
 * 	}
 * 	return tupleTarget
 * }
 */
export function Checker_createTupleTypeEx(receiver: GoPtr<Checker>, elementTypes: GoSlice<GoPtr<Type>>, elementInfos: GoSlice<TupleElementInfo>, readonly: bool): GoPtr<Type> {
  const tupleTarget = Checker_getTupleTargetType(receiver, elementInfos, readonly);
  if (tupleTarget === receiver!.emptyGenericType) {
    return receiver!.emptyObjectType;
  }
  if ((elementTypes ?? GoSliceMake(0, 0, GoPointerValueOps<Type>())).length !== 0) {
    return Checker_createNormalizedTypeReference(receiver, tupleTarget, elementTypes);
  }
  return tupleTarget;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTupleTargetType","kind":"method","status":"implemented","sigHash":"c9db1452602595be49cf525037d9064a599b0523c2f583c16770442be6b8389f"}
 *
 * Go source:
 * func (c *Checker) getTupleTargetType(elementInfos []TupleElementInfo, readonly bool) *Type {
 * 	if len(elementInfos) == 1 && elementInfos[0].flags&ElementFlagsRest != 0 {
 * 		// [...X[]] is equivalent to just X[]
 * 		if readonly {
 * 			return c.globalReadonlyArrayType
 * 		}
 * 		return c.globalArrayType
 * 	}
 * 	key := getTupleKey(elementInfos, readonly)
 * 	t := c.tupleTypes[key]
 * 	if t == nil {
 * 		t = c.createTupleTargetType(elementInfos, readonly)
 * 		c.tupleTypes[key] = t
 * 	}
 * 	return t
 * }
 */
export function Checker_getTupleTargetType(receiver: GoPtr<Checker>, elementInfos: GoSlice<TupleElementInfo>, readonly: bool): GoPtr<Type> {
  if (elementInfos.length === 1 && (elementInfos[0]!.flags & ElementFlagsRest) !== 0) {
    return readonly ? receiver!.globalReadonlyArrayType : receiver!.globalArrayType;
  }
  const key = getTupleKey(elementInfos, readonly);
  let t = receiver!.tupleTypes.get(key);
  if (t === undefined) {
    t = Checker_createTupleTargetType(receiver, elementInfos, readonly);
    receiver!.tupleTypes.set(key, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createTupleTargetType","kind":"method","status":"implemented","sigHash":"856929889d165a2ef9d5690b2331e7ceab660ddf90ee32d775bd69c1a5b75974"}
 *
 * Go source:
 * func (c *Checker) createTupleTargetType(elementInfos []TupleElementInfo, readonly bool) *Type {
 * 	arity := len(elementInfos)
 * 	minLength := core.CountWhere(elementInfos, func(e TupleElementInfo) bool {
 * 		return e.flags&(ElementFlagsRequired|ElementFlagsVariadic) != 0
 * 	})
 * 	var typeParameters []*Type
 * 	members := make(ast.SymbolTable)
 * 	combinedFlags := ElementFlagsNone
 * 	if arity != 0 {
 * 		typeParameters = make([]*Type, 0, arity)
 * 		for i := range arity {
 * 			typeParameter := c.newTypeParameter(nil)
 * 			typeParameters = append(typeParameters, typeParameter)
 * 			flags := elementInfos[i].flags
 * 			combinedFlags |= flags
 * 			if combinedFlags&ElementFlagsVariable == 0 {
 * 				property := c.newSymbolEx(ast.SymbolFlagsProperty|core.IfElse(flags&ElementFlagsOptional != 0, ast.SymbolFlagsOptional, 0), strconv.Itoa(i), core.IfElse(readonly, ast.CheckFlagsReadonly, 0))
 * 				c.valueSymbolLinks.Get(property).resolvedType = typeParameter
 * 				// c.valueSymbolLinks.get(property).tupleLabelDeclaration = elementInfos[i].labeledDeclaration
 * 				members[property.Name] = property
 * 			}
 * 		}
 * 	}
 * 	fixedLength := len(members)
 * 	lengthSymbol := c.newSymbolEx(ast.SymbolFlagsProperty, "length", core.IfElse(readonly, ast.CheckFlagsReadonly, 0))
 * 	if combinedFlags&ElementFlagsVariable != 0 {
 * 		c.valueSymbolLinks.Get(lengthSymbol).resolvedType = c.numberType
 * 	} else {
 * 		var literalTypes []*Type
 * 		for i := minLength; i <= arity; i++ {
 * 			literalTypes = append(literalTypes, c.getNumberLiteralType(jsnum.Number(i)))
 * 		}
 * 		c.valueSymbolLinks.Get(lengthSymbol).resolvedType = c.getUnionType(literalTypes)
 * 	}
 * 	members[lengthSymbol.Name] = lengthSymbol
 * 	t := c.newObjectType(ObjectFlagsTuple|ObjectFlagsReference, nil)
 * 	d := t.AsTupleType()
 * 	d.thisType = c.newTypeParameter(nil)
 * 	d.thisType.AsTypeParameter().isThisType = true
 * 	d.thisType.AsTypeParameter().constraint = t
 * 	d.allTypeParameters = append(typeParameters, d.thisType)
 * 	d.instantiations = make(map[CacheHashKey]*Type)
 * 	d.instantiations[getTypeListKey(d.TypeParameters())] = t
 * 	d.target = t
 * 	d.resolvedTypeArguments = d.TypeParameters()
 * 	d.declaredMembersResolved = true
 * 	d.declaredMembers = members
 * 	d.elementInfos = elementInfos
 * 	d.minLength = minLength
 * 	d.fixedLength = fixedLength
 * 	d.combinedFlags = combinedFlags
 * 	d.readonly = readonly
 * 	return t
 * }
 */
export function Checker_createTupleTargetType(receiver: GoPtr<Checker>, elementInfos: GoSlice<TupleElementInfo>, readonly: bool): GoPtr<Type> {
  const arity = elementInfos.length;
  const minLength = core.CountWhere(elementInfos, (elementInfo: TupleElementInfo): bool =>
    ((elementInfo.flags & (ElementFlagsRequired | ElementFlagsVariadic)) !== 0) as bool);
  let typeParameters: GoSlice<GoPtr<Type>> = GoNilSlice();
  const members: SymbolTable = new Map();
  let combinedFlags: ElementFlags = ElementFlagsNone;
  if (arity !== 0) {
    typeParameters = GoSliceMake(0, 0, GoPointerValueOps<Type>());
    for (let index = 0; index < arity; index++) {
      const typeParameter = Checker_newTypeParameter(receiver, undefined);
      typeParameters = GoSliceAppend(typeParameters, typeParameter, GoPointerValueOps<Type>());
      const flags = elementInfos[index]!.flags;
      combinedFlags = (combinedFlags | flags) as ElementFlags;
      if ((combinedFlags & ElementFlagsVariable) === 0) {
        const property = Checker_newSymbolEx(
          receiver,
          (SymbolFlagsProperty | ((flags & ElementFlagsOptionalFlag) !== 0 ? SymbolFlagsOptional : 0)) as SymbolFlags,
          strconv.Itoa(index),
          readonly ? CheckFlagsReadonly : 0,
        );
        LinkStore_Get(receiver!.valueSymbolLinks, property, zeroValueSymbolLinks, goSymbolPointerKey)!.v.resolvedType = typeParameter;
        members.set(property!.Name, property);
      }
    }
  }
  const fixedLength = members.size;
  const lengthSymbol = Checker_newSymbolEx(receiver, SymbolFlagsProperty, "length", readonly ? CheckFlagsReadonly : 0);
  if ((combinedFlags & ElementFlagsVariable) !== 0) {
    LinkStore_Get(receiver!.valueSymbolLinks, lengthSymbol, zeroValueSymbolLinks, goSymbolPointerKey)!.v.resolvedType = receiver!.numberType;
  } else {
    let literalTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
    for (let length = minLength; length <= arity; length++) {
      literalTypes = GoSliceAppend(literalTypes, Checker_getNumberLiteralType(receiver, length), GoPointerValueOps<Type>());
    }
    LinkStore_Get(receiver!.valueSymbolLinks, lengthSymbol, zeroValueSymbolLinks, goSymbolPointerKey)!.v.resolvedType = Checker_getUnionType(receiver, literalTypes);
  }
  members.set(lengthSymbol!.Name, lengthSymbol);
  const t = Checker_newObjectType(receiver, ObjectFlagsTuple | ObjectFlagsReference, undefined);
  const tupleType = Type_AsTupleType(t)!;
  const interfaceType = Type_AsInterfaceType(t)!;
  const objectType = Type_AsObjectType(t)!;
  const typeReference = Type_AsTypeReference(t)!;
  interfaceType.thisType = Checker_newTypeParameter(receiver, undefined);
  Type_AsTypeParameter(interfaceType.thisType)!.isThisType = true;
  Type_AsTypeParameter(interfaceType.thisType)!.constraint = t;
  interfaceType.allTypeParameters = GoSliceAppend(typeParameters, interfaceType.thisType, GoPointerValueOps<Type>());
  objectType.instantiations = NewGoStructMap(GoStructKey(
    [GoStructField((value: CacheHashKey) => value.Hi, GoBigIntKey), GoStructField((value: CacheHashKey) => value.Lo, GoBigIntKey)],
    ([Hi, Lo], source) => globalThis.Object.assign(globalThis.Object.create(globalThis.Object.getPrototypeOf(source)) as CacheHashKey, source, { Hi, Lo }),
  ));
  objectType.instantiations.set(getTypeListKey(InterfaceType_TypeParameters(interfaceType)), t);
  objectType.target = t;
  typeReference.resolvedTypeArguments = InterfaceType_TypeParameters(interfaceType);
  interfaceType.declaredMembersResolved = true;
  interfaceType.declaredMembers = members;
  tupleType.elementInfos = elementInfos;
  tupleType.minLength = minLength;
  tupleType.fixedLength = fixedLength as int;
  tupleType.combinedFlags = combinedFlags;
  tupleType.readonly = readonly;
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getElementTypeOfSliceOfTupleType","kind":"method","status":"implemented","sigHash":"8c3c805882da85a317aa7f54aff7e67f05566322e7c224f53e2d46250bdf85e3"}
 *
 * Go source:
 * func (c *Checker) getElementTypeOfSliceOfTupleType(t *Type, index int, endSkipCount int, writing bool, noReductions bool) *Type {
 * 	length := c.getTypeReferenceArity(t) - endSkipCount
 * 	elementInfos := t.TargetTupleType().elementInfos
 * 	if index < length {
 * 		typeArguments := c.getTypeArguments(t)
 * 		var elementTypes []*Type
 * 		for i := index; i < length; i++ {
 * 			e := typeArguments[i]
 * 			if elementInfos[i].flags&ElementFlagsVariadic != 0 {
 * 				e = c.getIndexedAccessType(e, c.numberType)
 * 			}
 * 			elementTypes = append(elementTypes, e)
 * 		}
 * 		if writing {
 * 			return c.getIntersectionType(elementTypes)
 * 		}
 * 		return c.getUnionTypeEx(elementTypes, core.IfElse(noReductions, UnionReductionNone, UnionReductionLiteral), nil, nil)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getElementTypeOfSliceOfTupleType(receiver: GoPtr<Checker>, t: GoPtr<Type>, index: int, endSkipCount: int, writing: bool, noReductions: bool): GoPtr<Type> {
  const length = Checker_getTypeReferenceArity(receiver, t) - endSkipCount;
  const elementInfos = Type_TargetTupleType(t)!.elementInfos;
  if (index < length) {
    const typeArguments = Checker_getTypeArguments(receiver, t);
    let elementTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
    for (let i = index; i < length; i++) {
      let elementType = GoSliceLoad(typeArguments, i, GoPointerValueOps<Type>());
      if ((elementInfos[i]!.flags & ElementFlagsVariadic) !== 0) {
        elementType = Checker_getIndexedAccessType(receiver, elementType, receiver!.numberType);
      }
      elementTypes = GoSliceAppend(elementTypes, elementType, GoPointerValueOps<Type>());
    }
    if (writing) {
      return Checker_getIntersectionType(receiver, elementTypes);
    }
    return Checker_getUnionTypeEx(receiver, elementTypes, noReductions ? UnionReductionNone : UnionReductionLiteral, undefined, undefined);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTupleElementTypeOutOfStartCount","kind":"method","status":"implemented","sigHash":"c33d749b6120a4e0b6e72c38e45606d9fac9a8f06289d0f673af97facda61b68"}
 *
 * Go source:
 * func (c *Checker) getTupleElementTypeOutOfStartCount(t *Type, index jsnum.Number, undefinedLikeType *Type) *Type {
 * 	return c.mapType(t, func(t *Type) *Type {
 * 		restType := c.getRestTypeOfTupleType(t)
 * 		if restType == nil {
 * 			return c.undefinedType
 * 		}
 * 		if undefinedLikeType != nil && index >= jsnum.Number(getTotalFixedElementCount(t.TargetTupleType())) {
 * 			return c.getUnionType([]*Type{restType, undefinedLikeType})
 * 		}
 * 		return restType
 * 	})
 * }
 */
export function Checker_getTupleElementTypeOutOfStartCount(receiver: GoPtr<Checker>, t: GoPtr<Type>, index: Number, undefinedLikeType: GoPtr<Type>): GoPtr<Type> {
  return Checker_mapType(receiver, t, (ty: GoPtr<Type>): GoPtr<Type> => {
    const restType = Checker_getRestTypeOfTupleType(receiver, ty);
    if (restType === undefined) {
      return receiver!.undefinedType;
    }
    if (undefinedLikeType !== undefined && index >= getTotalFixedElementCount(Type_TargetTupleType(ty))) {
      return Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, restType, GoPointerValueOps<Type>());
        GoSliceStore(__goSliceLiteral, 1, undefinedLikeType, GoPointerValueOps<Type>());
      }));
    }
    return restType;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isGenericType","kind":"method","status":"implemented","sigHash":"c5e6cbfd541c3fe913e1603dd95cc04ddc0f5cd56f4d562def6ac91e5b4076f6"}
 *
 * Go source:
 * func (c *Checker) isGenericType(t *Type) bool {
 * 	return c.getGenericObjectFlags(t) != 0
 * }
 */
export function Checker_isGenericType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (Checker_getGenericObjectFlags(receiver, t) !== 0) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isGenericObjectType","kind":"method","status":"implemented","sigHash":"f4516026eff201468ede1b68680794ca7365907beb3676121f5bf8550606e231"}
 *
 * Go source:
 * func (c *Checker) isGenericObjectType(t *Type) bool {
 * 	return c.getGenericObjectFlags(t)&ObjectFlagsIsGenericObjectType != 0
 * }
 */
export function Checker_isGenericObjectType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return ((Checker_getGenericObjectFlags(receiver, t) & ObjectFlagsIsGenericObjectType) !== 0) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getGenericObjectFlags","kind":"method","status":"implemented","sigHash":"3b7cb53e3c29af244e20fb283a873e0ba017e557c1e476881da677f6541f05c2"}
 *
 * Go source:
 * func (c *Checker) getGenericObjectFlags(t *Type) ObjectFlags {
 * 	var combinedFlags ObjectFlags
 * 	if t.flags&(TypeFlagsUnionOrIntersection|TypeFlagsSubstitution) != 0 {
 * 		if t.objectFlags&ObjectFlagsIsGenericTypeComputed == 0 {
 * 			if t.flags&TypeFlagsUnionOrIntersection != 0 {
 * 				for _, u := range t.Types() {
 * 					combinedFlags |= c.getGenericObjectFlags(u)
 * 				}
 * 			} else {
 * 				combinedFlags = c.getGenericObjectFlags(t.AsSubstitutionType().baseType) | c.getGenericObjectFlags(t.AsSubstitutionType().constraint)
 * 			}
 * 			t.objectFlags |= ObjectFlagsIsGenericTypeComputed | combinedFlags
 * 		}
 * 		return t.objectFlags & ObjectFlagsIsGenericType
 * 	}
 * 	if t.flags&TypeFlagsInstantiableNonPrimitive != 0 || c.isGenericMappedType(t) || c.isGenericTupleType(t) {
 * 		combinedFlags |= ObjectFlagsIsGenericObjectType
 * 	}
 * 	if t.flags&(TypeFlagsInstantiableNonPrimitive|TypeFlagsIndex) != 0 || c.isGenericStringLikeType(t) {
 * 		combinedFlags |= ObjectFlagsIsGenericIndexType
 * 	}
 * 	return combinedFlags
 * }
 */
export function Checker_getGenericObjectFlags(receiver: GoPtr<Checker>, t: GoPtr<Type>): ObjectFlags {
  let combinedFlags = ObjectFlagsNone;
  if ((t!.flags & (TypeFlagsUnionOrIntersection | TypeFlagsSubstitution)) !== 0) {
    if ((t!.objectFlags & ObjectFlagsIsGenericTypeComputed) === 0) {
      if ((t!.flags & TypeFlagsUnionOrIntersection) !== 0) {
        for (const u of Type_Types(t)) {
          combinedFlags |= Checker_getGenericObjectFlags(receiver, u);
        }
      } else {
        combinedFlags = (Checker_getGenericObjectFlags(receiver, SubstitutionType_BaseType(Type_AsSubstitutionType(t))) |
          Checker_getGenericObjectFlags(receiver, Type_AsSubstitutionType(t)!.constraint)) as ObjectFlags;
      }
      t!.objectFlags |= (ObjectFlagsIsGenericTypeComputed | combinedFlags) as ObjectFlags;
    }
    return (t!.objectFlags & ObjectFlagsIsGenericType) as ObjectFlags;
  }
  if ((t!.flags & TypeFlagsInstantiableNonPrimitive) !== 0 || Checker_isGenericMappedType(receiver, t) || Checker_isGenericTupleType(receiver, t)) {
    combinedFlags |= ObjectFlagsIsGenericObjectType;
  }
  if ((t!.flags & (TypeFlagsInstantiableNonPrimitive | TypeFlagsIndex)) !== 0 || Checker_isGenericStringLikeType(receiver, t)) {
    combinedFlags |= ObjectFlagsIsGenericIndexType;
  }
  return combinedFlags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isGenericTupleType","kind":"method","status":"implemented","sigHash":"eaba62724a6b2106c0cdcbf9d6a8a2fea116c747ec4b9dfa739f26791dd488d6"}
 *
 * Go source:
 * func (c *Checker) isGenericTupleType(t *Type) bool {
 * 	return isTupleType(t) && t.TargetTupleType().combinedFlags&ElementFlagsVariadic != 0
 * }
 */
export function Checker_isGenericTupleType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return isTupleType(t) && (Type_TargetTupleType(t)!.combinedFlags & ElementFlagsVariadic) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isGenericMappedType","kind":"method","status":"implemented","sigHash":"663c2b3b685da5b5ee686e60b544554db0be4ee69935c65e8eaac8df00c6810c"}
 *
 * Go source:
 * func (c *Checker) isGenericMappedType(t *Type) bool {
 * 	if t.objectFlags&ObjectFlagsMapped != 0 {
 * 		constraint := c.getConstraintTypeFromMappedType(t)
 * 		if c.isGenericIndexType(constraint) {
 * 			return true
 * 		}
 * 		// A mapped type is generic if the 'as' clause references generic types other than the iteration type.
 * 		// To determine this, we substitute the constraint type (that we now know isn't generic) for the iteration
 * 		// type and check whether the resulting type is generic.
 * 		nameType := c.getNameTypeFromMappedType(t)
 * 		if nameType != nil && c.isGenericIndexType(c.instantiateType(nameType, newSimpleTypeMapper(c.getTypeParameterFromMappedType(t), constraint))) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Checker_isGenericMappedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if ((t!.objectFlags & ObjectFlagsMapped) !== 0) {
    const constraint = Checker_getConstraintTypeFromMappedType(receiver, t);
    if (Checker_isGenericIndexType(receiver, constraint)) {
      return true;
    }
    const nameType = Checker_getNameTypeFromMappedType(receiver, t);
    if (nameType !== undefined && Checker_isGenericIndexType(receiver, Checker_instantiateType(receiver, nameType, newSimpleTypeMapper(Checker_getTypeParameterFromMappedType(receiver, t), constraint)))) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isGenericReducibleType","kind":"method","status":"implemented","sigHash":"fc7b362c49a4da79dbfbea50231a8f3c6774fb39d70cbcd7b7966500bc1b82ae"}
 *
 * Go source:
 * func (c *Checker) isGenericReducibleType(t *Type) bool {
 * 	return t.flags&TypeFlagsUnion != 0 && t.objectFlags&ObjectFlagsContainsIntersections != 0 && core.Some(t.Types(), c.isGenericReducibleType) ||
 * 		t.flags&TypeFlagsIntersection != 0 && c.isReducibleIntersection(t)
 * }
 */
export function Checker_isGenericReducibleType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return ((t!.flags & TypeFlagsUnion) !== 0 && (t!.objectFlags & ObjectFlagsContainsIntersections) !== 0 && core.Some(Type_Types(t), (u) => Checker_isGenericReducibleType(receiver, u))) ||
    ((t!.flags & TypeFlagsIntersection) !== 0 && Checker_isReducibleIntersection(receiver, t));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isReducibleIntersection","kind":"method","status":"implemented","sigHash":"0a4a0280adad57e9a1209074341a578a614f4c6723b95f86167cdfbc400d733e"}
 *
 * Go source:
 * func (c *Checker) isReducibleIntersection(t *Type) bool {
 * 	d := t.AsIntersectionType()
 * 	if d.uniqueLiteralFilledInstantiation == nil {
 * 		d.uniqueLiteralFilledInstantiation = c.instantiateType(t, c.uniqueLiteralMapper)
 * 	}
 * 	return c.getReducedType(d.uniqueLiteralFilledInstantiation) != d.uniqueLiteralFilledInstantiation
 * }
 */
export function Checker_isReducibleIntersection(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  const d = Type_AsIntersectionType(t);
  if (d!.uniqueLiteralFilledInstantiation === undefined) {
    d!.uniqueLiteralFilledInstantiation = Checker_instantiateType(receiver, t, receiver!.uniqueLiteralMapper);
  }
  return Checker_getReducedType(receiver, d!.uniqueLiteralFilledInstantiation) !== d!.uniqueLiteralFilledInstantiation;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newType","kind":"method","status":"implemented","sigHash":"da9a41c47408177c6f502da47b6211c362071f4398c7b3a074e66c811bca2f11"}
 *
 * Go source:
 * func (c *Checker) newType(flags TypeFlags, objectFlags ObjectFlags, data TypeData) *Type {
 * 	c.TypeCount++
 * 	t := data.AsType()
 * 	t.flags = flags
 * 	t.objectFlags = objectFlags &^ (ObjectFlagsCouldContainTypeVariablesComputed | ObjectFlagsCouldContainTypeVariables | ObjectFlagsMembersResolved)
 * 	t.id = TypeId(c.TypeCount)
 * 	t.checker = c
 * 	t.data = data
 * 	if c.tracer != nil {
 * 		c.tracer.RecordType(t)
 * 	}
 * 	return t
 * }
 */
export function Checker_newType(receiver: GoPtr<Checker>, flags: TypeFlags, objectFlags: ObjectFlags, data: GoInterface<TypeData>): GoPtr<Type> {
  receiver!.TypeCount++;
  const t = data!.AsType();
  t!.flags = flags;
  t!.objectFlags = objectFlags & ~(ObjectFlagsCouldContainTypeVariablesComputed | ObjectFlagsCouldContainTypeVariables | ObjectFlagsMembersResolved);
  t!.id = receiver!.TypeCount;
  t!.checker = receiver;
  t!.data = data;
  if (receiver!.tracer !== undefined) {
    Tracer_RecordType(receiver!.tracer, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newIntrinsicType","kind":"method","status":"implemented","sigHash":"82faf1124cfee300c2d50636ef82649c98af23fa1dd38fc5f5868f3dddb5d849"}
 *
 * Go source:
 * func (c *Checker) newIntrinsicType(flags TypeFlags, intrinsicName string) *Type {
 * 	return c.newIntrinsicTypeEx(flags, intrinsicName, ObjectFlagsNone)
 * }
 */
export function Checker_newIntrinsicType(receiver: GoPtr<Checker>, flags: TypeFlags, intrinsicName: string): GoPtr<Type> {
  return Checker_newIntrinsicTypeEx(receiver, flags, intrinsicName, ObjectFlagsNone);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newIntrinsicTypeEx","kind":"method","status":"implemented","sigHash":"1aa3c69d8612dde066b47555c5ba64426839a12d2d90e701b4507294a342b231"}
 *
 * Go source:
 * func (c *Checker) newIntrinsicTypeEx(flags TypeFlags, intrinsicName string, objectFlags ObjectFlags) *Type {
 * 	data := &IntrinsicType{}
 * 	data.intrinsicName = intrinsicName
 * 	return c.newType(flags, objectFlags, data)
 * }
 */
export function Checker_newIntrinsicTypeEx(receiver: GoPtr<Checker>, flags: TypeFlags, intrinsicName: string, objectFlags: ObjectFlags): GoPtr<Type> {
  const data = new IntrinsicTypeData();
  data.intrinsicName = intrinsicName;
  return Checker_newType(receiver, flags, objectFlags, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createWideningType","kind":"method","status":"implemented","sigHash":"1a0fa838522e870c6bbe303f6095d7f36df3428fb86ba25fea0505bf5209f859"}
 *
 * Go source:
 * func (c *Checker) createWideningType(nonWideningType *Type) *Type {
 * 	if c.strictNullChecks {
 * 		return nonWideningType
 * 	}
 * 	t := c.newIntrinsicType(nonWideningType.flags, nonWideningType.AsIntrinsicType().intrinsicName)
 * 	t.objectFlags |= ObjectFlagsContainsWideningType
 * 	return t
 * }
 */
export function Checker_createWideningType(receiver: GoPtr<Checker>, nonWideningType: GoPtr<Type>): GoPtr<Type> {
  if (receiver!.strictNullChecks) {
    return nonWideningType;
  }
  const t = Checker_newIntrinsicType(receiver, nonWideningType!.flags, Type_AsIntrinsicType(nonWideningType)!.intrinsicName);
  t!.objectFlags |= ObjectFlagsContainsWideningType;
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createUnknownUnionType","kind":"method","status":"implemented","sigHash":"a24dfffe82a6628c1c68628523964c88d83574c855109aeaf53068f4de61e381"}
 *
 * Go source:
 * func (c *Checker) createUnknownUnionType() *Type {
 * 	if c.strictNullChecks {
 * 		return c.getUnionType([]*Type{c.undefinedType, c.nullType, c.unknownEmptyObjectType})
 * 	}
 * 	return c.unknownType
 * }
 */
export function Checker_createUnknownUnionType(receiver: GoPtr<Checker>): GoPtr<Type> {
  if (receiver!.strictNullChecks) {
    return Checker_getUnionType(receiver, GoSliceBuild(3, 3, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, receiver!.undefinedType, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, receiver!.nullType, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 2, receiver!.unknownEmptyObjectType, GoPointerValueOps<Type>());
    }));
  }
  return receiver!.unknownType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newLiteralType","kind":"method","status":"implemented","sigHash":"f64d85edf6e5ab4d8ea1bd04a351a06082e0ad80f0cb2fd5371e46ef8f1e3adb"}
 *
 * Go source:
 * func (c *Checker) newLiteralType(flags TypeFlags, value any, regularType *Type) *Type {
 * 	data := &LiteralType{}
 * 	data.value = value
 * 	t := c.newType(flags, ObjectFlagsNone, data)
 * 	if regularType != nil {
 * 		data.regularType = regularType
 * 	} else {
 * 		data.regularType = t
 * 	}
 * 	return t
 * }
 */
export function Checker_newLiteralType(receiver: GoPtr<Checker>, flags: TypeFlags, value: GoInterface<unknown>, regularType: GoPtr<Type>): GoPtr<Type> {
  const data = new LiteralTypeData();
  data.value = value;
  const t = Checker_newType(receiver, flags, ObjectFlagsNone, data);
  data.regularType = regularType !== undefined ? regularType : t;
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newObjectType","kind":"method","status":"implemented","sigHash":"cf8afe2c46f3422101f4770bcdfb3a2842ed606b444c7b7f4e207a0131460d2b"}
 *
 * Go source:
 * func (c *Checker) newObjectType(objectFlags ObjectFlags, symbol *ast.Symbol) *Type {
 * 	var data TypeData
 * 	switch {
 * 	case objectFlags&ObjectFlagsClassOrInterface != 0:
 * 		data = &InterfaceType{}
 * 	case objectFlags&ObjectFlagsTuple != 0:
 * 		data = &TupleType{}
 * 	case objectFlags&ObjectFlagsReference != 0:
 * 		data = &TypeReference{}
 * 	case objectFlags&ObjectFlagsMapped != 0:
 * 		data = &MappedType{}
 * 	case objectFlags&ObjectFlagsReverseMapped != 0:
 * 		data = &ReverseMappedType{}
 * 	case objectFlags&ObjectFlagsEvolvingArray != 0:
 * 		data = &EvolvingArrayType{}
 * 	case objectFlags&ObjectFlagsInstantiationExpressionType != 0:
 * 		data = &InstantiationExpressionType{}
 * 	case objectFlags&ObjectFlagsAnonymous != 0:
 * 		data = &ObjectType{}
 * 	default:
 * 		panic("Unhandled case in newObjectType")
 * 	}
 * 	t := c.newType(TypeFlagsObject, objectFlags, data)
 * 	t.symbol = symbol
 * 	return t
 * }
 */
export function Checker_newObjectType(receiver: GoPtr<Checker>, objectFlags: ObjectFlags, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  let data: TypeData;
  if ((objectFlags & ObjectFlagsClassOrInterface) !== 0) {
    data = new InterfaceTypeData();
  } else if ((objectFlags & ObjectFlagsTuple) !== 0) {
    data = new TupleTypeData();
  } else if ((objectFlags & ObjectFlagsReference) !== 0) {
    data = new TypeReferenceData();
  } else if ((objectFlags & ObjectFlagsMapped) !== 0) {
    data = new MappedTypeData();
  } else if ((objectFlags & ObjectFlagsReverseMapped) !== 0) {
    data = new ReverseMappedTypeData();
  } else if ((objectFlags & ObjectFlagsEvolvingArray) !== 0) {
    data = new EvolvingArrayTypeData();
  } else if ((objectFlags & ObjectFlagsInstantiationExpressionType) !== 0) {
    data = new InstantiationExpressionTypeData();
  } else if ((objectFlags & ObjectFlagsAnonymous) !== 0) {
    data = new ObjectTypeData();
  } else {
    throw new globalThis.Error("Unhandled case in newObjectType");
  }
  const t = Checker_newType(receiver, TypeFlagsObject, objectFlags, data);
  t!["symbol"] = symbol_;
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newAnonymousType","kind":"method","status":"implemented","sigHash":"8b9b59ef251edbf38902fedf76f55cbde54f9a90f0c52ed55fa0f06ac42cb186"}
 *
 * Go source:
 * func (c *Checker) newAnonymousType(symbol *ast.Symbol, members ast.SymbolTable, callSignatures []*Signature, constructSignatures []*Signature, indexInfos []*IndexInfo) *Type {
 * 	t := c.newObjectType(ObjectFlagsAnonymous, symbol)
 * 	c.setStructuredTypeMembers(t, members, callSignatures, constructSignatures, indexInfos)
 * 	return t
 * }
 */
export function Checker_newAnonymousType(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>, members: SymbolTable, callSignatures: GoSlice<GoPtr<Signature>>, constructSignatures: GoSlice<GoPtr<Signature>>, indexInfos: GoSlice<GoPtr<IndexInfo>>): GoPtr<Type> {
  const t = Checker_newObjectType(receiver, ObjectFlagsAnonymous, symbol_);
  Checker_setStructuredTypeMembers(receiver, t, members, callSignatures, constructSignatures, indexInfos);
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.tryCreateTypeReference","kind":"method","status":"implemented","sigHash":"c50d69c564bdc11bd96e17786ee3cf05d26297aa3a6eb37e0c58c0554592aa50"}
 *
 * Go source:
 * func (c *Checker) tryCreateTypeReference(target *Type, typeArguments []*Type) *Type {
 * 	if len(typeArguments) != 0 && target == c.emptyGenericType {
 * 		return c.unknownType
 * 	}
 * 	return c.createTypeReference(target, typeArguments)
 * }
 */
export function Checker_tryCreateTypeReference(receiver: GoPtr<Checker>, target: GoPtr<Type>, typeArguments: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  if (typeArguments.length !== 0 && target === receiver!.emptyGenericType) {
    return receiver!.unknownType;
  }
  return Checker_createTypeReference(receiver, target, typeArguments);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createTypeReference","kind":"method","status":"implemented","sigHash":"7e44527cf8dc585d9ca3a5a2301762e2cae84543719c50d7e3173cf62661fee8"}
 *
 * Go source:
 * func (c *Checker) createTypeReference(target *Type, typeArguments []*Type) *Type {
 * 	return c.createTypeReferenceEx(target, typeArguments, ObjectFlagsNone)
 * }
 */
export function Checker_createTypeReference(receiver: GoPtr<Checker>, target: GoPtr<Type>, typeArguments: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  return Checker_createTypeReferenceEx(receiver, target, typeArguments, ObjectFlagsNone);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createDeferredTypeReference","kind":"method","status":"implemented","sigHash":"7748fbd0da7924b9fae4a8f714df7311258359619f6fc9e2755c77f820cc475c"}
 *
 * Go source:
 * func (c *Checker) createDeferredTypeReference(target *Type, node *ast.Node, mapper *TypeMapper, alias *TypeAlias) *Type {
 * 	if alias == nil {
 * 		alias = c.getAliasForTypeNode(node)
 * 		if alias != nil && mapper != nil {
 * 			alias.typeArguments = c.instantiateTypes(alias.typeArguments, mapper)
 * 		}
 * 	}
 * 	t := c.newObjectType(ObjectFlagsReference, target.symbol)
 * 	t.alias = alias
 * 	d := t.AsTypeReference()
 * 	d.target = target
 * 	d.mapper = mapper
 * 	d.node = node
 * 	return t
 * }
 */
export function Checker_createDeferredTypeReference(receiver: GoPtr<Checker>, target: GoPtr<Type>, node: GoPtr<Node>, mapper: GoPtr<TypeMapper>, alias: GoPtr<TypeAlias>): GoPtr<Type> {
  if (alias === undefined) {
    alias = Checker_getAliasForTypeNode(receiver, node);
    if (alias !== undefined && mapper !== undefined) {
      alias!.typeArguments = Checker_instantiateTypes(receiver, alias!.typeArguments, mapper);
    }
  }
  const t = Checker_newObjectType(receiver, ObjectFlagsReference, target!["symbol"]);
  t!.alias = alias;
  Type_AsObjectType(t)!.target = target;
  Type_AsObjectType(t)!.mapper = mapper;
  Type_AsTypeReference(t)!.node = node;
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.cloneTypeReference","kind":"method","status":"implemented","sigHash":"9bbeeef5c43f0ba31c3d903c0de740193c684469788391fd65f3562d74753b39"}
 *
 * Go source:
 * func (c *Checker) cloneTypeReference(source *Type) *Type {
 * 	t := c.newObjectType(ObjectFlagsReference, source.symbol)
 * 	t.objectFlags = source.objectFlags &^ ObjectFlagsMembersResolved
 * 	t.AsTypeReference().target = source.AsTypeReference().target
 * 	t.AsTypeReference().resolvedTypeArguments = source.AsTypeReference().resolvedTypeArguments
 * 	return t
 * }
 */
export function Checker_cloneTypeReference(receiver: GoPtr<Checker>, source: GoPtr<Type>): GoPtr<Type> {
  const t = Checker_newObjectType(receiver, ObjectFlagsReference, source!["symbol"]);
  t!.objectFlags = source!.objectFlags & ~ObjectFlagsMembersResolved;
  Type_AsObjectType(t)!.target = Type_AsObjectType(source)!.target;
  Type_AsTypeReference(t)!.resolvedTypeArguments = Type_AsTypeReference(source)!.resolvedTypeArguments;
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getPropagatingFlagsOfTypes","kind":"method","status":"implemented","sigHash":"8f72ed0f0a52e062071d5fa782fd41489bbe0ae511adb903ec09bbf108b0e612"}
 *
 * Go source:
 * func (c *Checker) getPropagatingFlagsOfTypes(types []*Type, excludeKinds TypeFlags) ObjectFlags {
 * 	result := ObjectFlagsNone
 * 	for _, t := range types {
 * 		if t.flags&excludeKinds == 0 {
 * 			result |= t.objectFlags
 * 		}
 * 	}
 * 	return result & ObjectFlagsPropagatingFlags
 * }
 */
export function Checker_getPropagatingFlagsOfTypes(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, excludeKinds: TypeFlags): ObjectFlags {
  let result = ObjectFlagsNone;
  for (const t of types) {
    if ((t!.flags & excludeKinds) === 0) {
      result |= t!.objectFlags;
    }
  }
  return result & ObjectFlagsPropagatingFlags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newUnionType","kind":"method","status":"implemented","sigHash":"700c4ee3aa647a99f36a03f5ac906cf04306df8d5e7b5a75c3e26d9ca5b59136"}
 *
 * Go source:
 * func (c *Checker) newUnionType(objectFlags ObjectFlags, types []*Type) *Type {
 * 	data := &UnionType{}
 * 	data.types = types
 * 	return c.newType(TypeFlagsUnion, objectFlags, data)
 * }
 */
export function Checker_newUnionType(receiver: GoPtr<Checker>, objectFlags: ObjectFlags, types: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  const data = new UnionTypeData();
  data.__tsgoEmbedded0.types = types;
  return Checker_newType(receiver, TypeFlagsUnion, objectFlags, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newIntersectionType","kind":"method","status":"implemented","sigHash":"3b42bac8c0d2fec45d32a117cbde86951d25a0173bfd88cbb88e94258d5b1f74"}
 *
 * Go source:
 * func (c *Checker) newIntersectionType(objectFlags ObjectFlags, types []*Type) *Type {
 * 	data := &IntersectionType{}
 * 	data.types = types
 * 	return c.newType(TypeFlagsIntersection, objectFlags, data)
 * }
 */
export function Checker_newIntersectionType(receiver: GoPtr<Checker>, objectFlags: ObjectFlags, types: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  const data = new IntersectionTypeData();
  data.__tsgoEmbedded0.types = types;
  return Checker_newType(receiver, TypeFlagsIntersection, objectFlags, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newTemplateLiteralType","kind":"method","status":"implemented","sigHash":"81c2f44f40915b244ecf5ddd6910183671e7478bbe6438bad4e4894abe4f5043"}
 *
 * Go source:
 * func (c *Checker) newTemplateLiteralType(texts []string, types []*Type) *Type {
 * 	data := &TemplateLiteralType{}
 * 	data.texts = texts
 * 	data.types = types
 * 	return c.newType(TypeFlagsTemplateLiteral, ObjectFlagsNone, data)
 * }
 */
export function Checker_newTemplateLiteralType(receiver: GoPtr<Checker>, texts: GoSlice<string>, types: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  const data = new TemplateLiteralTypeData();
  data.texts = texts;
  data.types = types;
  return Checker_newType(receiver, TypeFlagsTemplateLiteral, ObjectFlagsNone, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newConditionalType","kind":"method","status":"implemented","sigHash":"d1cad480b6044aab8f58a11baf4585fedb1c9ee1eec34e411c6f724ba969fbbc"}
 *
 * Go source:
 * func (c *Checker) newConditionalType(root *ConditionalRoot, mapper *TypeMapper, combinedMapper *TypeMapper) *Type {
 * 	data := &ConditionalType{}
 * 	data.root = root
 * 	data.checkType = c.instantiateType(root.checkType, mapper)
 * 	data.extendsType = c.instantiateType(root.extendsType, mapper)
 * 	data.mapper = mapper
 * 	data.combinedMapper = combinedMapper
 * 	return c.newType(TypeFlagsConditional, ObjectFlagsNone, data)
 * }
 */
export function Checker_newConditionalType(receiver: GoPtr<Checker>, root: GoPtr<ConditionalRoot>, mapper: GoPtr<TypeMapper>, combinedMapper: GoPtr<TypeMapper>): GoPtr<Type> {
  const data = new ConditionalTypeData();
  data.root = root;
  data.checkType = Checker_instantiateType(receiver, root!.checkType, mapper);
  data.extendsType = Checker_instantiateType(receiver, root!.extendsType, mapper);
  data.mapper = mapper;
  data.combinedMapper = combinedMapper;
  return Checker_newType(receiver, TypeFlagsConditional, ObjectFlagsNone, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getRegularTypeOfLiteralType","kind":"method","status":"implemented","sigHash":"e5df8326608adedfa75a3718758c03786334eca259809a77b46057ea0b47df3a"}
 *
 * Go source:
 * func (c *Checker) getRegularTypeOfLiteralType(t *Type) *Type {
 * 	if t.flags&TypeFlagsFreshable != 0 {
 * 		return t.AsLiteralType().regularType
 * 	}
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		u := t.AsUnionType()
 * 		if u.regularType == nil {
 * 			u.regularType = c.mapType(t, c.getRegularTypeOfLiteralType)
 * 		}
 * 		return u.regularType
 * 	}
 * 	return t
 * }
 */
export function Checker_getRegularTypeOfLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsFreshable) !== 0) {
    return Type_AsLiteralType(t)!.regularType;
  }
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    const u = Type_AsUnionType(t);
    if (u!.regularType === undefined) {
      u!.regularType = Checker_mapType(receiver, t, (mapped) => Checker_getRegularTypeOfLiteralType(receiver, mapped));
    }
    return u!.regularType;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getFreshTypeOfLiteralType","kind":"method","status":"implemented","sigHash":"4e7f4457575d57d26c0cd96bf9883291d4dde923c4ba547da0b4348117df5254"}
 *
 * Go source:
 * func (c *Checker) getFreshTypeOfLiteralType(t *Type) *Type {
 * 	if t.flags&TypeFlagsFreshable != 0 {
 * 		d := t.AsLiteralType()
 * 		if d.freshType == nil {
 * 			f := c.newLiteralType(t.flags, d.value, t)
 * 			f.symbol = t.symbol
 * 			f.AsLiteralType().freshType = f
 * 			d.freshType = f
 * 		}
 * 		return d.freshType
 * 	}
 * 	return t
 * }
 */
export function Checker_getFreshTypeOfLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsFreshable) !== 0) {
    const d = Type_AsLiteralType(t);
    if (d!.freshType === undefined) {
      const f = Checker_newLiteralType(receiver, t!.flags, d!.value, t);
      f!.symbol = t!.symbol;
      Type_AsLiteralType(f)!.freshType = f;
      d!.freshType = f;
    }
    return d!.freshType;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getStringLiteralType","kind":"method","status":"implemented","sigHash":"437d61cf51672a5a39d775811c516c2102d9515400588fe293e78fc8d1baaf49"}
 *
 * Go source:
 * func (c *Checker) getStringLiteralType(value string) *Type {
 * 	t := c.stringLiteralTypes[value]
 * 	if t == nil {
 * 		t = c.newLiteralType(TypeFlagsStringLiteral, value, nil)
 * 		c.stringLiteralTypes[value] = t
 * 	}
 * 	return t
 * }
 */
export function Checker_getStringLiteralType(receiver: GoPtr<Checker>, value: string): GoPtr<Type> {
  let t = receiver!.stringLiteralTypes.get(value);
  if (t === undefined) {
    t = Checker_newLiteralType(receiver, TypeFlagsStringLiteral, value, undefined);
    receiver!.stringLiteralTypes.set(value, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getNumberLiteralType","kind":"method","status":"implemented","sigHash":"18a4f20cf91bc38133a2524ad872a2e9e832f34e8ef7a524cead6c435b7f9f05"}
 *
 * Go source:
 * func (c *Checker) getNumberLiteralType(value jsnum.Number) *Type {
 * 	// NaN cannot be used as a Go map key because NaN != NaN in IEEE 754,
 * 	// so Go map lookups for NaN always miss. Cache NaN type separately.
 * 	if value.IsNaN() {
 * 		if c.nanType == nil {
 * 			c.nanType = c.newLiteralType(TypeFlagsNumberLiteral, value, nil)
 * 		}
 * 		return c.nanType
 * 	}
 * 	t := c.numberLiteralTypes[value]
 * 	if t == nil {
 * 		t = c.newLiteralType(TypeFlagsNumberLiteral, value, nil)
 * 		c.numberLiteralTypes[value] = t
 * 	}
 * 	return t
 * }
 */
export function Checker_getNumberLiteralType(receiver: GoPtr<Checker>, value: Number): GoPtr<Type> {
  // NaN cannot be used as a Go map key because NaN != NaN in IEEE 754,
  // so Go map lookups for NaN always miss. Cache NaN type separately.
  if (Number_IsNaN(value)) {
    if (receiver!.nanType === undefined) {
      receiver!.nanType = Checker_newLiteralType(receiver, TypeFlagsNumberLiteral, value, undefined);
    }
    return receiver!.nanType;
  }
  let t = receiver!.numberLiteralTypes.get(value);
  if (t === undefined) {
    t = Checker_newLiteralType(receiver, TypeFlagsNumberLiteral, value, undefined);
    receiver!.numberLiteralTypes.set(value, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBigIntLiteralType","kind":"method","status":"implemented","sigHash":"b5dd39c1f5ce87a8894dc435e0414488ae2610d0ddaea34ae50b82023bd405c1"}
 *
 * Go source:
 * func (c *Checker) getBigIntLiteralType(value jsnum.PseudoBigInt) *Type {
 * 	t := c.bigintLiteralTypes[value]
 * 	if t == nil {
 * 		t = c.newLiteralType(TypeFlagsBigIntLiteral, value, nil)
 * 		c.bigintLiteralTypes[value] = t
 * 	}
 * 	return t
 * }
 */
export function Checker_getBigIntLiteralType(receiver: GoPtr<Checker>, value: PseudoBigInt): GoPtr<Type> {
  let t = receiver!.bigintLiteralTypes.get(value);
  if (t === undefined) {
    t = Checker_newLiteralType(receiver, TypeFlagsBigIntLiteral, value, undefined);
    receiver!.bigintLiteralTypes.set(value, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.parseBigIntLiteralType","kind":"method","status":"implemented","sigHash":"fc1850ab4339b98440ed8a318fb80d7d7743c2a9a55e0bc6007a04f638235bdc"}
 *
 * Go source:
 * func (c *Checker) parseBigIntLiteralType(text string) *Type {
 * 	return c.getBigIntLiteralType(jsnum.ParseValidBigInt(text))
 * }
 */
export function Checker_parseBigIntLiteralType(receiver: GoPtr<Checker>, text: string): GoPtr<Type> {
  return Checker_getBigIntLiteralType(receiver, ParseValidBigInt(text));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getEnumLiteralType","kind":"method","status":"implemented","sigHash":"d5615b837c4f22dc6686c67019a2578b2e479dfdaa9ca1b58dd7c90584b3e1a9"}
 *
 * Go source:
 * func (c *Checker) getEnumLiteralType(value any, enumSymbol *ast.Symbol, symbol *ast.Symbol) *Type {
 * 	var flags TypeFlags
 * 	switch v := value.(type) {
 * 	case string:
 * 		flags = TypeFlagsEnumLiteral | TypeFlagsStringLiteral
 * 	case jsnum.Number:
 * 		flags = TypeFlagsEnumLiteral | TypeFlagsNumberLiteral
 * 		// NaN cannot be used as a Go map key because NaN != NaN in IEEE 754,
 * 		// so Go map lookups for NaN always miss. Cache NaN enum types separately by enum symbol.
 * 		if v.IsNaN() {
 * 			t := c.enumNaNLiteralTypes[enumSymbol]
 * 			if t == nil {
 * 				t = c.newLiteralType(flags, value, nil)
 * 				t.symbol = symbol
 * 				c.enumNaNLiteralTypes[enumSymbol] = t
 * 			}
 * 			return t
 * 		}
 * 	default:
 * 		panic("Unhandled case in getEnumLiteralType")
 * 	}
 * 	key := EnumLiteralKey{enumSymbol: enumSymbol, value: value}
 * 	t := c.enumLiteralTypes[key]
 * 	if t == nil {
 * 		t = c.newLiteralType(flags, value, nil)
 * 		t.symbol = symbol
 * 		c.enumLiteralTypes[key] = t
 * 	}
 * 	return t
 * }
 */
export function Checker_getEnumLiteralType(receiver: GoPtr<Checker>, value: GoInterface<unknown>, enumSymbol: GoPtr<Symbol>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  let flags: TypeFlags;
  if (typeof value === "string") {
    flags = (TypeFlagsEnumLiteral | TypeFlagsStringLiteral) as TypeFlags;
  } else if (typeof value === "number") {
    flags = (TypeFlagsEnumLiteral | TypeFlagsNumberLiteral) as TypeFlags;
    // NaN cannot be used as a Go map key because NaN != NaN in IEEE 754,
    // so Go map lookups for NaN always miss. Cache NaN enum types separately by enum symbol.
    if (Number_IsNaN(value as Number)) {
      let t = receiver!.enumNaNLiteralTypes.get(enumSymbol);
      if (t === undefined) {
        t = Checker_newLiteralType(receiver, flags, value, undefined);
        t!.symbol = symbol_;
        receiver!.enumNaNLiteralTypes.set(enumSymbol, t);
      }
      return t;
    }
  } else {
    throw new globalThis.Error("Unhandled case in getEnumLiteralType");
  }
  const key: EnumLiteralKey = { enumSymbol, value };
  let t = receiver!.enumLiteralTypes.get(key);
  if (t === undefined) {
    t = Checker_newLiteralType(receiver, flags, value, undefined);
    t!.symbol = symbol_;
    receiver!.enumLiteralTypes.set(key, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isUnitLikeType","kind":"method","status":"implemented","sigHash":"5ab78ed914f60a73087e8a158d91a0b9da0a130b2fef03a894c004d914f054a7"}
 *
 * Go source:
 * func (c *Checker) isUnitLikeType(t *Type) bool {
 * 	// Intersections that reduce to 'never' (e.g. 'T & null' where 'T extends {}') are not unit types.
 * 	t = c.getBaseConstraintOrType(t)
 * 	// Scan intersections such that tagged literal types are considered unit types.
 * 	if t.flags&TypeFlagsIntersection != 0 {
 * 		return core.Some(t.AsIntersectionType().types, isUnitType)
 * 	}
 * 	return isUnitType(t)
 * }
 */
export function Checker_isUnitLikeType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  const constrained = Checker_getBaseConstraintOrType(receiver, t);
  if ((constrained!.flags & TypeFlagsIntersection) !== 0) {
    return core.Some(Type_Types(constrained), isUnitType);
  }
  return isUnitType(constrained);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.extractUnitType","kind":"method","status":"implemented","sigHash":"480b578d26e287bd30d2a1ea7eae226d370d2535ed63e7a532098b21b40da87f"}
 *
 * Go source:
 * func (c *Checker) extractUnitType(t *Type) *Type {
 * 	if t.flags&TypeFlagsIntersection != 0 {
 * 		u := core.Find(t.AsIntersectionType().types, isUnitType)
 * 		if u != nil {
 * 			return u
 * 		}
 * 	}
 * 	return t
 * }
 */
export function Checker_extractUnitType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsIntersection) !== 0) {
    const u = core.Find(Type_Types(t), isUnitType, GoZeroPointer<Type>);
    if (u !== undefined) {
      return u;
    }
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBaseTypeOfLiteralType","kind":"method","status":"implemented","sigHash":"b793b16c4f78ffb3bf72c863250c12348faf56c3cd963f15a6f1fb96ed79603d"}
 *
 * Go source:
 * func (c *Checker) getBaseTypeOfLiteralType(t *Type) *Type {
 * 	switch {
 * 	case t.flags&TypeFlagsEnumLike != 0:
 * 		return c.getBaseTypeOfEnumLikeType(t)
 * 	case t.flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0:
 * 		return c.stringType
 * 	case t.flags&TypeFlagsNumberLiteral != 0:
 * 		return c.numberType
 * 	case t.flags&TypeFlagsBigIntLiteral != 0:
 * 		return c.bigintType
 * 	case t.flags&TypeFlagsBooleanLiteral != 0:
 * 		return c.booleanType
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return c.getBaseTypeOfLiteralTypeUnion(t)
 * 	}
 * 	return t
 * }
 */
export function Checker_getBaseTypeOfLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsEnumLike) !== 0) {
    return Checker_getBaseTypeOfEnumLikeType(receiver, t);
  }
  if ((t!.flags & (TypeFlagsStringLiteral | TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0) {
    return receiver!.stringType;
  }
  if ((t!.flags & TypeFlagsNumberLiteral) !== 0) {
    return receiver!.numberType;
  }
  if ((t!.flags & TypeFlagsBigIntLiteral) !== 0) {
    return receiver!.bigintType;
  }
  if ((t!.flags & TypeFlagsBooleanLiteral) !== 0) {
    return receiver!.booleanType;
  }
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    return Checker_getBaseTypeOfLiteralTypeUnion(receiver, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBaseTypeOfLiteralTypeForComparison","kind":"method","status":"implemented","sigHash":"ec6a8d5a0edea68d79fd0c226564d87bf919039417ac5b614031efebaf6eb4c4"}
 *
 * Go source:
 * func (c *Checker) getBaseTypeOfLiteralTypeForComparison(t *Type) *Type {
 * 	switch {
 * 	case t.flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0:
 * 		return c.stringType
 * 	case t.flags&(TypeFlagsNumberLiteral|TypeFlagsEnum) != 0:
 * 		return c.numberType
 * 	case t.flags&TypeFlagsBigIntLiteral != 0:
 * 		return c.bigintType
 * 	case t.flags&TypeFlagsBooleanLiteral != 0:
 * 		return c.booleanType
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return c.mapType(t, c.getBaseTypeOfLiteralTypeForComparison)
 * 	}
 * 	return t
 * }
 */
export function Checker_getBaseTypeOfLiteralTypeForComparison(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & (TypeFlagsStringLiteral | TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0) {
    return receiver!.stringType;
  }
  if ((t!.flags & (TypeFlagsNumberLiteral | TypeFlagsEnum)) !== 0) {
    return receiver!.numberType;
  }
  if ((t!.flags & TypeFlagsBigIntLiteral) !== 0) {
    return receiver!.bigintType;
  }
  if ((t!.flags & TypeFlagsBooleanLiteral) !== 0) {
    return receiver!.booleanType;
  }
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    return Checker_mapType(receiver, t, (mapped) => Checker_getBaseTypeOfLiteralTypeForComparison(receiver, mapped));
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBaseTypeOfEnumLikeType","kind":"method","status":"implemented","sigHash":"6411c5d517029319991ef36c8c85ce69ecfef0c9ca43c7164af2d98d1729ac30"}
 *
 * Go source:
 * func (c *Checker) getBaseTypeOfEnumLikeType(t *Type) *Type {
 * 	if t.flags&TypeFlagsEnumLike != 0 && t.symbol.Flags&ast.SymbolFlagsEnumMember != 0 {
 * 		return c.getDeclaredTypeOfSymbol(c.getParentOfSymbol(t.symbol))
 * 	}
 * 	return t
 * }
 */
export function Checker_getBaseTypeOfEnumLikeType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsEnumLike) !== 0 && (t!.symbol!.Flags & SymbolFlagsEnumMember) !== 0) {
    return Checker_getDeclaredTypeOfSymbol(receiver, Checker_getParentOfSymbol(receiver, t!.symbol));
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getBaseTypeOfLiteralTypeUnion","kind":"method","status":"implemented","sigHash":"411d78fad4ad2c678eb32dc6853b3c5fb394924ba06feae013c529def0fbd94d"}
 *
 * Go source:
 * func (c *Checker) getBaseTypeOfLiteralTypeUnion(t *Type) *Type {
 * 	key := CachedTypeKey{kind: CachedTypeKindLiteralUnionBaseType, typeId: t.id}
 * 	if cached, ok := c.cachedTypes[key]; ok {
 * 		return cached
 * 	}
 * 	result := c.mapType(t, c.getBaseTypeOfLiteralType)
 * 	c.cachedTypes[key] = result
 * 	return result
 * }
 */
export function Checker_getBaseTypeOfLiteralTypeUnion(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const key: CachedTypeKey = { kind: CachedTypeKindLiteralUnionBaseType, typeId: t!.id };
  const cached = receiver!.cachedTypes.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const result = Checker_mapType(receiver, t, (mapped) => Checker_getBaseTypeOfLiteralType(receiver, mapped));
  receiver!.cachedTypes.set(key, result);
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getWidenedLiteralType","kind":"method","status":"implemented","sigHash":"996752b2dfb42e48572bc67cda67219a644034e904cce2cfe2686b9f61afb365"}
 *
 * Go source:
 * func (c *Checker) getWidenedLiteralType(t *Type) *Type {
 * 	switch {
 * 	case t.flags&TypeFlagsEnumLike != 0 && isFreshLiteralType(t):
 * 		return c.getBaseTypeOfEnumLikeType(t)
 * 	case t.flags&TypeFlagsStringLiteral != 0 && isFreshLiteralType(t):
 * 		return c.stringType
 * 	case t.flags&TypeFlagsNumberLiteral != 0 && isFreshLiteralType(t):
 * 		return c.numberType
 * 	case t.flags&TypeFlagsBigIntLiteral != 0 && isFreshLiteralType(t):
 * 		return c.bigintType
 * 	case t.flags&TypeFlagsBooleanLiteral != 0 && isFreshLiteralType(t):
 * 		return c.booleanType
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return c.mapType(t, c.getWidenedLiteralType)
 * 	}
 * 	return t
 * }
 */
export function Checker_getWidenedLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsEnumLike) !== 0 && isFreshLiteralType(t)) {
    return Checker_getBaseTypeOfEnumLikeType(receiver, t);
  }
  if ((t!.flags & TypeFlagsStringLiteral) !== 0 && isFreshLiteralType(t)) {
    return receiver!.stringType;
  }
  if ((t!.flags & TypeFlagsNumberLiteral) !== 0 && isFreshLiteralType(t)) {
    return receiver!.numberType;
  }
  if ((t!.flags & TypeFlagsBigIntLiteral) !== 0 && isFreshLiteralType(t)) {
    return receiver!.bigintType;
  }
  if ((t!.flags & TypeFlagsBooleanLiteral) !== 0 && isFreshLiteralType(t)) {
    return receiver!.booleanType;
  }
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    return Checker_mapType(receiver, t, (ty: GoPtr<Type>): GoPtr<Type> => Checker_getWidenedLiteralType(receiver, ty));
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getWidenedLiteralLikeTypeForContextualType","kind":"method","status":"implemented","sigHash":"98553d9be35b23bb4aa9f8a9db4e9f1f16fce2a680a554f7939ae14ab562ee33"}
 *
 * Go source:
 * func (c *Checker) getWidenedLiteralLikeTypeForContextualType(t *Type, contextualType *Type) *Type {
 * 	if !c.isLiteralOfContextualType(t, contextualType) {
 * 		t = c.getWidenedUniqueESSymbolType(c.getWidenedLiteralType(t))
 * 	}
 * 	return c.getRegularTypeOfLiteralType(t)
 * }
 */
export function Checker_getWidenedLiteralLikeTypeForContextualType(receiver: GoPtr<Checker>, t: GoPtr<Type>, contextualType: GoPtr<Type>): GoPtr<Type> {
  if (!Checker_isLiteralOfContextualType(receiver, t, contextualType)) {
    t = Checker_getWidenedUniqueESSymbolType(receiver, Checker_getWidenedLiteralType(receiver, t));
  }
  return Checker_getRegularTypeOfLiteralType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isLiteralOfContextualType","kind":"method","status":"implemented","sigHash":"4341e5423a1b34f33855014ef6804cb9ea5ca181f9e50d5881fd99c35d55beb6"}
 *
 * Go source:
 * func (c *Checker) isLiteralOfContextualType(candidateType *Type, contextualType *Type) bool {
 * 	if contextualType != nil {
 * 		if contextualType.flags&TypeFlagsUnionOrIntersection != 0 {
 * 			return core.Some(contextualType.Types(), func(t *Type) bool {
 * 				return c.isLiteralOfContextualType(candidateType, t)
 * 			})
 * 		}
 * 		if contextualType.flags&TypeFlagsInstantiableNonPrimitive != 0 {
 * 			// If the contextual type is a type variable constrained to a primitive type, consider
 * 			// this a literal context for literals of that primitive type. For example, given a
 * 			// type parameter 'T extends string', infer string literal types for T.
 * 			constraint := c.getBaseConstraintOfType(contextualType)
 * 			if constraint == nil {
 * 				constraint = c.unknownType
 * 			}
 * 			return c.maybeTypeOfKind(constraint, TypeFlagsString) && c.maybeTypeOfKind(candidateType, TypeFlagsStringLiteral) ||
 * 				c.maybeTypeOfKind(constraint, TypeFlagsNumber) && c.maybeTypeOfKind(candidateType, TypeFlagsNumberLiteral) ||
 * 				c.maybeTypeOfKind(constraint, TypeFlagsBigInt) && c.maybeTypeOfKind(candidateType, TypeFlagsBigIntLiteral) ||
 * 				c.maybeTypeOfKind(constraint, TypeFlagsESSymbol) && c.maybeTypeOfKind(candidateType, TypeFlagsUniqueESSymbol) ||
 * 				c.isLiteralOfContextualType(candidateType, constraint)
 * 		}
 * 		// If the contextual type is a literal of a particular primitive type, we consider this a
 * 		// literal context for all literals of that primitive type.
 * 		return contextualType.flags&(TypeFlagsStringLiteral|TypeFlagsIndex|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsStringLiteral) ||
 * 			contextualType.flags&TypeFlagsNumberLiteral != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsNumberLiteral) ||
 * 			contextualType.flags&TypeFlagsBigIntLiteral != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsBigIntLiteral) ||
 * 			contextualType.flags&TypeFlagsBooleanLiteral != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsBooleanLiteral) ||
 * 			contextualType.flags&TypeFlagsUniqueESSymbol != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsUniqueESSymbol)
 * 	}
 * 	return false
 * }
 */
export function Checker_isLiteralOfContextualType(receiver: GoPtr<Checker>, candidateType: GoPtr<Type>, contextualType: GoPtr<Type>): bool {
  if (contextualType !== undefined) {
    if ((contextualType!.flags & TypeFlagsUnionOrIntersection) !== 0) {
      return core.Some(Type_Types(contextualType), (t: GoPtr<Type>): bool => Checker_isLiteralOfContextualType(receiver, candidateType, t));
    }
    if ((contextualType!.flags & TypeFlagsInstantiableNonPrimitive) !== 0) {
      const constraint = core.OrElse(Checker_getBaseConstraintOfType(receiver, contextualType), receiver!.unknownType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
      return (
        (Checker_maybeTypeOfKind(receiver, constraint, TypeFlagsString) && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsStringLiteral)) ||
        (Checker_maybeTypeOfKind(receiver, constraint, TypeFlagsNumber) && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsNumberLiteral)) ||
        (Checker_maybeTypeOfKind(receiver, constraint, TypeFlagsBigInt) && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsBigIntLiteral)) ||
        (Checker_maybeTypeOfKind(receiver, constraint, TypeFlagsESSymbol) && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsUniqueESSymbol)) ||
        Checker_isLiteralOfContextualType(receiver, candidateType, constraint)
      );
    }
    return (
      ((contextualType!.flags & (TypeFlagsStringLiteral | TypeFlagsIndex | TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0 && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsStringLiteral)) ||
      ((contextualType!.flags & TypeFlagsNumberLiteral) !== 0 && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsNumberLiteral)) ||
      ((contextualType!.flags & TypeFlagsBigIntLiteral) !== 0 && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsBigIntLiteral)) ||
      ((contextualType!.flags & TypeFlagsBooleanLiteral) !== 0 && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsBooleanLiteral)) ||
      ((contextualType!.flags & TypeFlagsUniqueESSymbol) !== 0 && Checker_maybeTypeOfKind(receiver, candidateType, TypeFlagsUniqueESSymbol))
    );
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.mapType","kind":"method","status":"implemented","sigHash":"8fe9b7908f7b4f6378f7754adbfd215ce2d46848f7a194ee7fa269acb9d0207e"}
 *
 * Go source:
 * func (c *Checker) mapType(t *Type, f func(*Type) *Type) *Type {
 * 	return c.mapTypeEx(t, f, false /*noReductions* /)
 * }
 */
export function Checker_mapType(receiver: GoPtr<Checker>, t: GoPtr<Type>, f: GoFunc<(arg0: GoPtr<Type>) => GoPtr<Type>>): GoPtr<Type> {
  return Checker_mapTypeEx(receiver, t, f, false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.mapTypeEx","kind":"method","status":"implemented","sigHash":"3b6de817f6d0fc552d59e42bc011345762348a8986072adc4666ac5d34c549d2"}
 *
 * Go source:
 * func (c *Checker) mapTypeEx(t *Type, f func(*Type) *Type, noReductions bool) *Type {
 * 	if t.flags&TypeFlagsNever != 0 {
 * 		return t
 * 	}
 * 	if t.flags&TypeFlagsUnion == 0 {
 * 		return f(t)
 * 	}
 * 	u := t.AsUnionType()
 * 	types := u.types
 * 	if u.origin != nil && u.origin.flags&TypeFlagsUnion != 0 {
 * 		types = u.origin.Types()
 * 	}
 * 	mappedTypes := make([]*Type, 0, 16)
 * 	var changed bool
 * 	for _, s := range types {
 * 		var mapped *Type
 * 		if s.flags&TypeFlagsUnion != 0 {
 * 			mapped = c.mapTypeEx(s, f, noReductions)
 * 		} else {
 * 			mapped = f(s)
 * 		}
 * 		if mapped != s {
 * 			changed = true
 * 		}
 * 		if mapped != nil {
 * 			mappedTypes = append(mappedTypes, mapped)
 * 		}
 * 	}
 * 	if changed {
 * 		if len(mappedTypes) == 0 {
 * 			return nil
 * 		}
 * 		return c.getUnionTypeEx(slices.Clone(mappedTypes), core.IfElse(noReductions, UnionReductionNone, UnionReductionLiteral), nil /*alias* /, nil /*origin* /)
 * 	}
 * 	return t
 * }
 */
export function Checker_mapTypeEx(receiver: GoPtr<Checker>, t: GoPtr<Type>, f: GoFunc<(arg0: GoPtr<Type>) => GoPtr<Type>>, noReductions: bool): GoPtr<Type> {
  if ((t!.flags & TypeFlagsNever) !== 0) {
    return t;
  }
  if ((t!.flags & TypeFlagsUnion) === 0) {
    return f!(t);
  }
  const u = Type_AsUnionType(t);
  let types = Type_AsUnionOrIntersectionType(t)!.types;
  if (u!.origin !== undefined && (u!.origin!.flags & TypeFlagsUnion) !== 0) {
    types = Type_Types(u!.origin);
  }
  let changed = false;
  let mappedTypes: GoSlice<GoPtr<Type>> = GoSliceMake(0, 0, GoPointerValueOps<Type>());
  for (const s of (types ?? GoSliceMake(0, 0, GoPointerValueOps<Type>()))) {
    let mapped: GoPtr<Type>;
    if ((s!.flags & TypeFlagsUnion) !== 0) {
      mapped = Checker_mapTypeEx(receiver, s, f, noReductions);
    } else {
      mapped = f!(s);
    }
    if (mapped !== s) {
      changed = true;
    }
    if (mapped !== undefined) {
      mappedTypes = GoSliceAppend(mappedTypes, mapped, GoPointerValueOps<Type>());
    }
  }
  if (changed) {
    if (mappedTypes.length === 0) {
      return undefined;
    }
    return Checker_getUnionTypeEx(receiver, slices.Clone(mappedTypes), noReductions ? UnionReductionNone : UnionReductionLiteral, undefined, undefined);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getUnionOrIntersectionType","kind":"method","status":"implemented","sigHash":"9e0660d87d433db25d1ba91d5cbc8a2e0a52ba0a8697a010747190034bb8d97d"}
 *
 * Go source:
 * func (c *Checker) getUnionOrIntersectionType(types []*Type, isUnion bool, unionReduction UnionReduction) *Type {
 * 	if isUnion {
 * 		return c.getUnionTypeEx(types, unionReduction, nil, nil)
 * 	}
 * 	return c.getIntersectionType(types)
 * }
 */
export function Checker_getUnionOrIntersectionType(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, isUnion: bool, unionReduction: UnionReduction): GoPtr<Type> {
  if (isUnion) {
    return Checker_getUnionTypeEx(receiver, types, unionReduction, undefined, undefined);
  }
  return Checker_getIntersectionType(receiver, types);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getUnionType","kind":"method","status":"implemented","sigHash":"09181ccc246251fa88acf0efe3ba540f4c7c65b72183fe8c261e97695f686bc7"}
 *
 * Go source:
 * func (c *Checker) getUnionType(types []*Type) *Type {
 * 	return c.getUnionTypeEx(types, UnionReductionLiteral, nil /*alias* /, nil /*origin* /)
 * }
 */
export function Checker_getUnionType(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  return Checker_getUnionTypeEx(receiver, types, UnionReductionLiteral, undefined, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getUnionTypeEx","kind":"method","status":"implemented","sigHash":"896e59ee3fdb46df284db6ce29dff699fab0b669766b6b56e4e56ed96f3ced3b"}
 *
 * Go source:
 * func (c *Checker) getUnionTypeEx(types []*Type, unionReduction UnionReduction, alias *TypeAlias, origin *Type) *Type {
 * 	if len(types) == 0 {
 * 		return c.neverType
 * 	}
 * 	if len(types) == 1 {
 * 		return types[0]
 * 	}
 * 	// We optimize for the common case of unioning a union type with some other type (such as `undefined`).
 * 	if len(types) == 2 && origin == nil && (types[0].flags&TypeFlagsUnion != 0 || types[1].flags&TypeFlagsUnion != 0) {
 * 		id1 := types[0].id
 * 		id2 := types[1].id
 * 		if id1 > id2 {
 * 			id1, id2 = id2, id1
 * 		}
 * 		key := UnionOfUnionKey{id1: id1, id2: id2, r: unionReduction, a: getAliasKey(alias)}
 * 		t := c.unionOfUnionTypes[key]
 * 		if t == nil {
 * 			t = c.getUnionTypeWorker(types, unionReduction, alias, nil /*origin* /)
 * 			c.unionOfUnionTypes[key] = t
 * 		}
 * 		return t
 * 	}
 * 	return c.getUnionTypeWorker(types, unionReduction, alias, origin)
 * }
 */
export function Checker_getUnionTypeEx(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, unionReduction: UnionReduction, alias: GoPtr<TypeAlias>, origin: GoPtr<Type>): GoPtr<Type> {
  if (types.length === 0) {
    return receiver!.neverType;
  }
  if (types.length === 1) {
    return GoSliceLoad(types, 0, GoPointerValueOps<Type>())!;
  }
  if (types.length === 2 && origin === undefined && ((GoSliceLoad(types, 0, GoPointerValueOps<Type>())!.flags & TypeFlagsUnion) !== 0 || (GoSliceLoad(types, 1, GoPointerValueOps<Type>())!.flags & TypeFlagsUnion) !== 0)) {
    let id1 = GoSliceLoad(types, 0, GoPointerValueOps<Type>())!.id;
    let id2 = GoSliceLoad(types, 1, GoPointerValueOps<Type>())!.id;
    if (id1 > id2) {
      [id1, id2] = [id2, id1];
    }
    const key: UnionOfUnionKey = { id1, id2, r: unionReduction, a: getAliasKey(alias) };
    let t = receiver!.unionOfUnionTypes.get(key);
    if (t === undefined) {
      t = Checker_getUnionTypeWorker(receiver, types, unionReduction, alias, undefined);
      receiver!.unionOfUnionTypes.set(key, t);
    }
    return t;
  }
  return Checker_getUnionTypeWorker(receiver, types, unionReduction, alias, origin);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getUnionTypeWorker","kind":"method","status":"implemented","sigHash":"2b57b7ac2f65e343ece57703d1b7c26a7823d547e9638883b19fe4ed83300fe3"}
 *
 * Go source:
 * func (c *Checker) getUnionTypeWorker(types []*Type, unionReduction UnionReduction, alias *TypeAlias, origin *Type) *Type {
 * 	typeSet, includes := c.addTypesToUnion(make([]*Type, 0, len(types)), 0, types)
 * 	if unionReduction != UnionReductionNone {
 * 		if includes&TypeFlagsAnyOrUnknown != 0 {
 * 			if includes&TypeFlagsAny != 0 {
 * 				switch {
 * 				case includes&TypeFlagsIncludesWildcard != 0:
 * 					return c.wildcardType
 * 				case includes&TypeFlagsIncludesError != 0:
 * 					return c.errorType
 * 				}
 * 				return c.anyType
 * 			}
 * 			return c.unknownType
 * 		}
 * 		if includes&TypeFlagsUndefined != 0 {
 * 			// If type set contains both undefinedType and missingType, remove missingType
 * 			if len(typeSet) >= 2 && typeSet[0] == c.undefinedType && typeSet[1] == c.missingType {
 * 				typeSet = slices.Delete(typeSet, 1, 2)
 * 			}
 * 		}
 * 		if includes&(TypeFlagsEnum|TypeFlagsLiteral|TypeFlagsUniqueESSymbol|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 ||
 * 			includes&TypeFlagsVoid != 0 && includes&TypeFlagsUndefined != 0 {
 * 			typeSet = c.removeRedundantLiteralTypes(typeSet, includes, unionReduction&UnionReductionSubtype != 0)
 * 		}
 * 		if includes&TypeFlagsStringLiteral != 0 && includes&(TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 {
 * 			typeSet = c.removeStringLiteralsMatchedByTemplateLiterals(typeSet)
 * 		}
 * 		if includes&TypeFlagsIncludesConstrainedTypeVariable != 0 {
 * 			typeSet = c.removeConstrainedTypeVariables(typeSet)
 * 		}
 * 		if unionReduction == UnionReductionSubtype {
 * 			typeSet = c.removeSubtypes(typeSet, includes&TypeFlagsObject != 0)
 * 			if typeSet == nil {
 * 				return c.errorType
 * 			}
 * 		}
 * 		if len(typeSet) == 0 {
 * 			switch {
 * 			case includes&TypeFlagsNull != 0:
 * 				if includes&TypeFlagsIncludesNonWideningType != 0 {
 * 					return c.nullType
 * 				}
 * 				return c.nullWideningType
 * 			case includes&TypeFlagsUndefined != 0:
 * 				if includes&TypeFlagsIncludesNonWideningType != 0 {
 * 					return c.undefinedType
 * 				}
 * 				return c.undefinedWideningType
 * 			}
 * 			return c.neverType
 * 		}
 * 	}
 * 	if origin == nil && includes&TypeFlagsUnion != 0 {
 * 		namedUnions := c.addNamedUnions(nil, types)
 * 		var reducedTypes []*Type
 * 		for _, t := range typeSet {
 * 			if !core.Some(namedUnions, func(u *Type) bool { return containsType(u.Types(), t) }) {
 * 				reducedTypes = append(reducedTypes, t)
 * 			}
 * 		}
 * 		if alias == nil && len(namedUnions) == 1 && len(reducedTypes) == 0 {
 * 			return namedUnions[0]
 * 		}
 * 		// We create a denormalized origin type only when the union was created from one or more named unions
 * 		// (unions with alias symbols or origins) and when there is no overlap between those named unions.
 * 		namedTypesCount := 0
 * 		for _, u := range namedUnions {
 * 			namedTypesCount += len(u.Types())
 * 		}
 * 		if namedTypesCount+len(reducedTypes) == len(typeSet) {
 * 			for _, t := range namedUnions {
 * 				reducedTypes, _ = insertType(reducedTypes, t)
 * 			}
 * 			origin = c.newUnionType(ObjectFlagsNone, reducedTypes)
 * 		}
 * 	}
 * 	objectFlags := core.IfElse(includes&TypeFlagsNotPrimitiveUnion != 0, ObjectFlagsNone, ObjectFlagsPrimitiveUnion) |
 * 		core.IfElse(includes&TypeFlagsIntersection != 0, ObjectFlagsContainsIntersections, ObjectFlagsNone)
 * 	return c.getUnionTypeFromSortedList(typeSet, objectFlags, alias, origin)
 * }
 */
export function Checker_getUnionTypeWorker(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, unionReduction: UnionReduction, alias: GoPtr<TypeAlias>, origin: GoPtr<Type>): GoPtr<Type> {
  let [typeSet, includes] = Checker_addTypesToUnion(receiver, GoSliceMake(0, 0, GoPointerValueOps<Type>()), TypeFlagsNone, types);
  if (unionReduction !== UnionReductionNone) {
    if ((includes & TypeFlagsAnyOrUnknown) !== 0) {
      if ((includes & TypeFlagsAny) !== 0) {
        if ((includes & TypeFlagsIncludesWildcard) !== 0) {
          return receiver!.wildcardType;
        }
        if ((includes & TypeFlagsIncludesError) !== 0) {
          return receiver!.errorType;
        }
        return receiver!.anyType;
      }
      return receiver!.unknownType;
    }
    if ((includes & TypeFlagsUndefined) !== 0) {
      if (typeSet.length >= 2 && GoSliceLoad(typeSet, 0, GoPointerValueOps<Type>()) === receiver!.undefinedType && GoSliceLoad(typeSet, 1, GoPointerValueOps<Type>()) === receiver!.missingType) {
        typeSet = slices.Delete(typeSet, 1, 2);
      }
    }
    if (
      (includes & (TypeFlagsEnum | TypeFlagsLiteral | TypeFlagsUniqueESSymbol | TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0 ||
      ((includes & TypeFlagsVoid) !== 0 && (includes & TypeFlagsUndefined) !== 0)
    ) {
      typeSet = Checker_removeRedundantLiteralTypes(receiver, typeSet, includes, (unionReduction & UnionReductionSubtype) !== 0);
    }
    if ((includes & TypeFlagsStringLiteral) !== 0 && (includes & (TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0) {
      typeSet = Checker_removeStringLiteralsMatchedByTemplateLiterals(receiver, typeSet);
    }
    if ((includes & TypeFlagsIncludesConstrainedTypeVariable) !== 0) {
      typeSet = Checker_removeConstrainedTypeVariables(receiver, typeSet);
    }
    if (unionReduction === UnionReductionSubtype) {
      const subtypeReducedTypes = Checker_removeSubtypes(receiver, typeSet, (includes & TypeFlagsObject) !== 0);
      if (GoSliceIsNil(subtypeReducedTypes)) {
        return receiver!.errorType;
      }
      typeSet = subtypeReducedTypes;
    }
    if (typeSet.length === 0) {
      if ((includes & TypeFlagsNull) !== 0) {
        if ((includes & TypeFlagsIncludesNonWideningType) !== 0) {
          return receiver!.nullType;
        }
        return receiver!.nullWideningType;
      }
      if ((includes & TypeFlagsUndefined) !== 0) {
        if ((includes & TypeFlagsIncludesNonWideningType) !== 0) {
          return receiver!.undefinedType;
        }
        return receiver!.undefinedWideningType;
      }
      return receiver!.neverType;
    }
  }
  if (origin === undefined && (includes & TypeFlagsUnion) !== 0) {
    const namedUnions = Checker_addNamedUnions(receiver, GoSliceMake(0, 0, GoPointerValueOps<Type>()), types);
    let reducedTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
    for (const t of typeSet) {
      if (!core.Some(namedUnions, (u: GoPtr<Type>): bool => containsType(Type_Types(u), t))) {
        reducedTypes = GoSliceAppend(reducedTypes, t, GoPointerValueOps<Type>());
      }
    }
    if (alias === undefined && namedUnions.length === 1 && reducedTypes.length === 0) {
      return GoSliceLoad(namedUnions, 0, GoPointerValueOps<Type>())!;
    }
    let namedTypesCount = 0;
    for (const u of namedUnions) {
      namedTypesCount += Type_Types(u).length;
    }
    if (namedTypesCount + reducedTypes.length === typeSet.length) {
      for (const t of namedUnions) {
        [reducedTypes] = insertType(reducedTypes, t);
      }
      origin = Checker_newUnionType(receiver, ObjectFlagsNone, reducedTypes);
    }
  }
  const objectFlags = (
    ((includes & TypeFlagsNotPrimitiveUnion) !== 0 ? ObjectFlagsNone : ObjectFlagsPrimitiveUnion) |
    ((includes & TypeFlagsIntersection) !== 0 ? ObjectFlagsContainsIntersections : ObjectFlagsNone)
  ) as ObjectFlags;
  return Checker_getUnionTypeFromSortedList(receiver, typeSet, objectFlags, alias, origin);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getUnionTypeFromSortedList","kind":"method","status":"implemented","sigHash":"22dcd7fbc88c75842e3ffb84d6e0a7b16f3941b2e4476dca4f9c81b539e67fc8"}
 *
 * Go source:
 * func (c *Checker) getUnionTypeFromSortedList(types []*Type, precomputedObjectFlags ObjectFlags, alias *TypeAlias, origin *Type) *Type {
 * 	if len(types) == 0 {
 * 		return c.neverType
 * 	}
 * 	if len(types) == 1 {
 * 		return types[0]
 * 	}
 * 	key := getUnionKey(types, origin, alias)
 * 	t := c.unionTypes[key]
 * 	if t == nil {
 * 		t = c.newUnionType(precomputedObjectFlags|c.getPropagatingFlagsOfTypes(types, TypeFlagsNullable), types)
 * 		t.AsUnionType().origin = origin
 * 		t.alias = alias
 * 		if len(types) == 2 && types[0].flags&TypeFlagsBooleanLiteral != 0 && types[1].flags&TypeFlagsBooleanLiteral != 0 {
 * 			t.flags |= TypeFlagsBoolean
 * 		}
 * 		c.unionTypes[key] = t
 * 	}
 * 	return t
 * }
 */
export function Checker_getUnionTypeFromSortedList(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, precomputedObjectFlags: ObjectFlags, alias: GoPtr<TypeAlias>, origin: GoPtr<Type>): GoPtr<Type> {
  if (types.length === 0) {
    return receiver!.neverType;
  }
  if (types.length === 1) {
    return GoSliceLoad(types, 0, GoPointerValueOps<Type>())!;
  }
  const key = getUnionKey(types, origin, alias);
  let t = receiver!.unionTypes.get(key);
  if (t === undefined) {
    t = Checker_newUnionType(receiver, (precomputedObjectFlags | Checker_getPropagatingFlagsOfTypes(receiver, types, TypeFlagsNullable)) as ObjectFlags, types);
    Type_AsUnionType(t)!.origin = origin;
    t!.alias = alias;
    if (types.length === 2 && (GoSliceLoad(types, 0, GoPointerValueOps<Type>())!.flags & TypeFlagsBooleanLiteral) !== 0 && (GoSliceLoad(types, 1, GoPointerValueOps<Type>())!.flags & TypeFlagsBooleanLiteral) !== 0) {
      t!.flags |= TypeFlagsBoolean;
    }
    receiver!.unionTypes.set(key, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.UnionTypes","kind":"method","status":"implemented","sigHash":"8905d281724d667ce20626c795f32ca0fd1414acf1d945abb258237f91b7daf6"}
 *
 * Go source:
 * func (c *Checker) UnionTypes() iter.Seq[*Type] {
 * 	return maps.Values(c.unionTypes)
 * }
 */
export function Checker_UnionTypes(receiver: GoPtr<Checker>): Seq<GoPtr<Type>> {
  return (yieldValue: GoFunc<(value: GoPtr<Type>) => bool>): void => {
    for (const value of receiver!.unionTypes.values()) {
      if (!yieldValue!(value)) {
        return;
      }
    }
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.addTypesToUnion","kind":"method","status":"implemented","sigHash":"ada0cebcc37c07daf88b89942325e09f310818a770ec4f1fabe64bccfc13883c"}
 *
 * Go source:
 * func (c *Checker) addTypesToUnion(typeSet []*Type, includes TypeFlags, types []*Type) ([]*Type, TypeFlags) {
 * 	var lastType *Type
 * 	for _, t := range types {
 * 		if t != lastType {
 * 			if t.flags&TypeFlagsUnion != 0 {
 * 				u := t.AsUnionType()
 * 				if t.alias != nil || u.origin != nil {
 * 					includes |= TypeFlagsUnion
 * 				}
 * 				typeSet, includes = c.addTypesToUnion(typeSet, includes, u.types)
 * 			} else {
 * 				typeSet, includes = c.addTypeToUnion(typeSet, includes, t)
 * 			}
 * 			lastType = t
 * 		}
 * 	}
 * 	return typeSet, includes
 * }
 */
export function Checker_addTypesToUnion(receiver: GoPtr<Checker>, typeSet: GoSlice<GoPtr<Type>>, includes: TypeFlags, types: GoSlice<GoPtr<Type>>): [GoSlice<GoPtr<Type>>, TypeFlags] {
  let lastType: GoPtr<Type>;
  for (const t of types) {
    if (t !== lastType) {
      if ((t!.flags & TypeFlagsUnion) !== 0) {
        const unionType = Type_AsUnionType(t)!;
        if (t!.alias !== undefined || unionType.origin !== undefined) {
          includes = (includes | TypeFlagsUnion) as TypeFlags;
        }
        [typeSet, includes] = Checker_addTypesToUnion(receiver, typeSet, includes, Type_Types(t));
      } else {
        [typeSet, includes] = Checker_addTypeToUnion(receiver, typeSet, includes, t);
      }
      lastType = t;
    }
  }
  return [typeSet, includes];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.addTypeToUnion","kind":"method","status":"implemented","sigHash":"5ed68e2e11c19c19bf7aacca2832791490ddcc72c063c0b287be29ac3e2de6f4"}
 *
 * Go source:
 * func (c *Checker) addTypeToUnion(typeSet []*Type, includes TypeFlags, t *Type) ([]*Type, TypeFlags) {
 * 	flags := t.flags
 * 	// We ignore 'never' types in unions
 * 	if flags&TypeFlagsNever == 0 {
 * 		includes |= flags & TypeFlagsIncludesMask
 * 		if flags&TypeFlagsInstantiable != 0 {
 * 			includes |= TypeFlagsIncludesInstantiable
 * 		}
 * 		if flags&TypeFlagsIntersection != 0 && t.objectFlags&ObjectFlagsIsConstrainedTypeVariable != 0 {
 * 			includes |= TypeFlagsIncludesConstrainedTypeVariable
 * 		}
 * 		if t == c.wildcardType {
 * 			includes |= TypeFlagsIncludesWildcard
 * 		}
 * 		if c.isErrorType(t) {
 * 			includes |= TypeFlagsIncludesError
 * 		}
 * 		if !c.strictNullChecks && flags&TypeFlagsNullable != 0 {
 * 			if t.objectFlags&ObjectFlagsContainsWideningType == 0 {
 * 				includes |= TypeFlagsIncludesNonWideningType
 * 			}
 * 		} else {
 * 			if index, ok := slices.BinarySearchFunc(typeSet, t, CompareTypes); !ok {
 * 				typeSet = slices.Insert(typeSet, index, t)
 * 			}
 * 		}
 * 	}
 * 	return typeSet, includes
 * }
 */
export function Checker_addTypeToUnion(receiver: GoPtr<Checker>, typeSet: GoSlice<GoPtr<Type>>, includes: TypeFlags, t: GoPtr<Type>): [GoSlice<GoPtr<Type>>, TypeFlags] {
  const flags = t!.flags;
  if ((flags & TypeFlagsNever) === 0) {
    includes = (includes | (flags & TypeFlagsIncludesMask)) as TypeFlags;
    if ((flags & TypeFlagsInstantiable) !== 0) {
      includes = (includes | TypeFlagsIncludesInstantiable) as TypeFlags;
    }
    if ((flags & TypeFlagsIntersection) !== 0 && (t!.objectFlags & ObjectFlagsIsConstrainedTypeVariable) !== 0) {
      includes = (includes | TypeFlagsIncludesConstrainedTypeVariable) as TypeFlags;
    }
    if (t === receiver!.wildcardType) {
      includes = (includes | TypeFlagsIncludesWildcard) as TypeFlags;
    }
    if (Checker_isErrorType(receiver, t)) {
      includes = (includes | TypeFlagsIncludesError) as TypeFlags;
    }
    if (!receiver!.strictNullChecks && (flags & TypeFlagsNullable) !== 0) {
      if ((t!.objectFlags & ObjectFlagsContainsWideningType) === 0) {
        includes = (includes | TypeFlagsIncludesNonWideningType) as TypeFlags;
      }
    } else {
      const [index, ok] = slices.BinarySearchFunc(typeSet, t, CompareTypes);
      if (!ok) {
        typeSet = slices.Insert(typeSet, index, t);
      }
    }
  }
  return [typeSet, includes];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeRedundantLiteralTypes","kind":"method","status":"implemented","sigHash":"faf4bd0161361a2d04f2eecd57482202437f7503d6bbe710a43be3e8156fb8fb"}
 *
 * Go source:
 * func (c *Checker) removeRedundantLiteralTypes(types []*Type, includes TypeFlags, reduceVoidUndefined bool) []*Type {
 * 	i := len(types)
 * 	for i > 0 {
 * 		i--
 * 		t := types[i]
 * 		flags := t.flags
 * 		remove := flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 && includes&TypeFlagsString != 0 ||
 * 			flags&TypeFlagsNumberLiteral != 0 && includes&TypeFlagsNumber != 0 ||
 * 			flags&TypeFlagsBigIntLiteral != 0 && includes&TypeFlagsBigInt != 0 ||
 * 			flags&TypeFlagsUniqueESSymbol != 0 && includes&TypeFlagsESSymbol != 0 ||
 * 			reduceVoidUndefined && flags&TypeFlagsUndefined != 0 && includes&TypeFlagsVoid != 0 ||
 * 			isFreshLiteralType(t) && containsType(types, t.AsLiteralType().regularType)
 * 		if remove {
 * 			types = slices.Delete(types, i, i+1)
 * 		}
 * 	}
 * 	return types
 * }
 */
export function Checker_removeRedundantLiteralTypes(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, includes: TypeFlags, reduceVoidUndefined: bool): GoSlice<GoPtr<Type>> {
  for (let i = types.length; i > 0;) {
    i--;
    const t = GoSliceLoad(types, i, GoPointerValueOps<Type>())!;
    const flags = t!.flags;
    const remove = (((flags & (TypeFlagsStringLiteral | TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0 && (includes & TypeFlagsString) !== 0) ||
      ((flags & TypeFlagsNumberLiteral) !== 0 && (includes & TypeFlagsNumber) !== 0) ||
      ((flags & TypeFlagsBigIntLiteral) !== 0 && (includes & TypeFlagsBigInt) !== 0) ||
      ((flags & TypeFlagsUniqueESSymbol) !== 0 && (includes & TypeFlagsESSymbol) !== 0) ||
      (reduceVoidUndefined && (flags & TypeFlagsUndefined) !== 0 && (includes & TypeFlagsVoid) !== 0) ||
      (isFreshLiteralType(t) && containsType(types, Type_AsLiteralType(t)!.regularType))) as bool;
    if (remove) {
      types = slices.Delete(types, i, i + 1);
    }
  }
  return types;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeStringLiteralsMatchedByTemplateLiterals","kind":"method","status":"implemented","sigHash":"ef67b540fe358e333d575cdf4d924c29ef426c2ece9d74e74e4c292c62afe4e2"}
 *
 * Go source:
 * func (c *Checker) removeStringLiteralsMatchedByTemplateLiterals(types []*Type) []*Type {
 * 	templates := core.Filter(types, c.isPatternLiteralType)
 * 	if len(templates) != 0 {
 * 		i := len(types)
 * 		for i > 0 {
 * 			i--
 * 			t := types[i]
 * 			if t.flags&TypeFlagsStringLiteral != 0 && core.Some(templates, func(template *Type) bool {
 * 				return c.isTypeMatchedByTemplateLiteralOrStringMapping(t, template)
 * 			}) {
 * 				types = slices.Delete(types, i, i+1)
 * 			}
 * 		}
 * 	}
 * 	return types
 * }
 */
export function Checker_removeStringLiteralsMatchedByTemplateLiterals(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): GoSlice<GoPtr<Type>> {
  const templates = core.Filter(types, (ty: GoPtr<Type>): bool => Checker_isPatternLiteralType(receiver, ty));
  if (templates.length !== 0) {
    for (let i = types.length; i > 0;) {
      i--;
      const t = GoSliceLoad(types, i, GoPointerValueOps<Type>());
      if ((t!.flags & TypeFlagsStringLiteral) !== 0 && core.Some(templates, (template: GoPtr<Type>): bool => Checker_isTypeMatchedByTemplateLiteralOrStringMapping(receiver, t, template))) {
        types = slices.Delete(types, i, i + 1);
      }
    }
  }
  return types;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeConstrainedTypeVariables","kind":"method","status":"implemented","sigHash":"26b3e6f004888207a3ec1cc63e3bd7eaba049c58be1e3b16e2537e6d8ca91e11"}
 *
 * Go source:
 * func (c *Checker) removeConstrainedTypeVariables(types []*Type) []*Type {
 * 	var typeVariables []*Type
 * 	// First collect a list of the type variables occurring in constraining intersections.
 * 	for _, t := range types {
 * 		if t.flags&TypeFlagsIntersection != 0 && t.objectFlags&ObjectFlagsIsConstrainedTypeVariable != 0 {
 * 			index := 0
 * 			if t.AsIntersectionType().types[0].flags&TypeFlagsTypeVariable == 0 {
 * 				index = 1
 * 			}
 * 			typeVariables = core.AppendIfUnique(typeVariables, t.AsIntersectionType().types[index])
 * 		}
 * 	}
 * 	// For each type variable, check if the constraining intersections for that type variable fully
 * 	// cover the constraint of the type variable; if so, remove the constraining intersections and
 * 	// substitute the type variable.
 * 	for _, typeVariable := range typeVariables {
 * 		var primitives []*Type
 * 		// First collect the primitive types from the constraining intersections.
 * 		for _, t := range types {
 * 			if t.flags&TypeFlagsIntersection != 0 && t.objectFlags&ObjectFlagsIsConstrainedTypeVariable != 0 {
 * 				index := 0
 * 				if t.AsIntersectionType().types[0].flags&TypeFlagsTypeVariable == 0 {
 * 					index = 1
 * 				}
 * 				if t.AsIntersectionType().types[index] == typeVariable {
 * 					primitives, _ = insertType(primitives, t.AsIntersectionType().types[1-index])
 * 				}
 * 			}
 * 		}
 * 		// If every constituent in the type variable's constraint is covered by an intersection of the type
 * 		// variable and that constituent, remove those intersections and substitute the type variable.
 * 		constraint := c.getBaseConstraintOfType(typeVariable)
 * 		if everyType(constraint, func(t *Type) bool { return containsType(primitives, t) }) {
 * 			i := len(types)
 * 			for i > 0 {
 * 				i--
 * 				t := types[i]
 * 				if t.flags&TypeFlagsIntersection != 0 && t.objectFlags&ObjectFlagsIsConstrainedTypeVariable != 0 {
 * 					index := 0
 * 					if t.AsIntersectionType().types[0].flags&TypeFlagsTypeVariable == 0 {
 * 						index = 1
 * 					}
 * 					if t.AsIntersectionType().types[index] == typeVariable && containsType(primitives, t.AsIntersectionType().types[1-index]) {
 * 						types = slices.Delete(types, i, i+1)
 * 					}
 * 				}
 * 			}
 * 			types, _ = insertType(types, typeVariable)
 * 		}
 * 	}
 * 	return types
 * }
 */
export function Checker_removeConstrainedTypeVariables(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): GoSlice<GoPtr<Type>> {
  let typeVariables: GoSlice<GoPtr<Type>> = GoNilSlice();
  for (const t of types) {
    if ((t!.flags & TypeFlagsIntersection) !== 0 && (t!.objectFlags & ObjectFlagsIsConstrainedTypeVariable) !== 0) {
      let index = 0;
      if ((GoSliceLoad(Type_Types(t), 0, GoPointerValueOps<Type>())!.flags & TypeFlagsTypeVariable) === 0) {
        index = 1;
      }
      typeVariables = core.AppendIfUnique(typeVariables, GoSliceLoad(Type_Types(t), index, GoPointerValueOps<Type>()), GoEqualStrict<GoPtr<Type>>);
    }
  }
  for (const typeVariable of typeVariables) {
    let primitives: GoSlice<GoPtr<Type>> = GoNilSlice();
    for (const t of types) {
      if ((t!.flags & TypeFlagsIntersection) !== 0 && (t!.objectFlags & ObjectFlagsIsConstrainedTypeVariable) !== 0) {
        let index = 0;
        if ((GoSliceLoad(Type_Types(t), 0, GoPointerValueOps<Type>())!.flags & TypeFlagsTypeVariable) === 0) {
          index = 1;
        }
        if (GoSliceLoad(Type_Types(t), index, GoPointerValueOps<Type>()) === typeVariable) {
          [primitives] = insertType(primitives, GoSliceLoad(Type_Types(t), 1 - index, GoPointerValueOps<Type>()));
        }
      }
    }
    const constraint = Checker_getBaseConstraintOfType(receiver, typeVariable);
    if (everyType(constraint, (t: GoPtr<Type>): bool => containsType(primitives, t))) {
      for (let i = types.length; i > 0;) {
        i--;
        const t = GoSliceLoad(types, i, GoPointerValueOps<Type>())!;
        if ((t!.flags & TypeFlagsIntersection) !== 0 && (t!.objectFlags & ObjectFlagsIsConstrainedTypeVariable) !== 0) {
          let index = 0;
          if ((GoSliceLoad(Type_Types(t), 0, GoPointerValueOps<Type>())!.flags & TypeFlagsTypeVariable) === 0) {
            index = 1;
          }
          if (GoSliceLoad(Type_Types(t), index, GoPointerValueOps<Type>()) === typeVariable && containsType(primitives, GoSliceLoad(Type_Types(t), 1 - index, GoPointerValueOps<Type>()))) {
            types = slices.Delete(types, i, i + 1);
          }
        }
      }
      [types] = insertType(types, typeVariable);
    }
  }
  return types;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.intersectTypes","kind":"method","status":"implemented","sigHash":"a5074db67a7a9ebc364681029e4aa25f7b45801a8f3ed335807456d2e3207f81"}
 *
 * Go source:
 * func (c *Checker) intersectTypes(type1 *Type, type2 *Type) *Type {
 * 	switch {
 * 	case type1 == nil:
 * 		return type2
 * 	case type2 == nil:
 * 		return type1
 * 	}
 * 	return c.getIntersectionType([]*Type{type1, type2})
 * }
 */
export function Checker_intersectTypes(receiver: GoPtr<Checker>, type1: GoPtr<Type>, type2: GoPtr<Type>): GoPtr<Type> {
  if (type1 === undefined) {
    return type2;
  }
  if (type2 === undefined) {
    return type1;
  }
  return Checker_getIntersectionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, type1, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, type2, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIntersectionType","kind":"method","status":"implemented","sigHash":"bfd6353ae0c851d6db814fe89a1e95e247899816326c49f2f56e4eb85e5e0a7d"}
 *
 * Go source:
 * func (c *Checker) getIntersectionType(types []*Type) *Type {
 * 	return c.getIntersectionTypeEx(types, IntersectionFlagsNone, nil /*alias* /)
 * }
 */
export function Checker_getIntersectionType(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  return Checker_getIntersectionTypeEx(receiver, types, IntersectionFlagsNone, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIntersectionTypeEx","kind":"method","status":"implemented","sigHash":"fe0c05d953f9d6724441ec6248f3d22c5c119bf634aff79bd33a04d41a76fa23"}
 *
 * Go source:
 * func (c *Checker) getIntersectionTypeEx(types []*Type, flags IntersectionFlags, alias *TypeAlias) *Type {
 * 	var orderedTypes orderedSet[*Type]
 * 	orderedTypes.values = make([]*Type, 0, len(types))
 * 	includes := c.addTypesToIntersection(&orderedTypes, 0, types)
 * 	typeSet := orderedTypes.values
 * 	objectFlags := ObjectFlagsNone
 * 	// An intersection type is considered empty if it contains
 * 	// the type never, or
 * 	// more than one unit type or,
 * 	// an object type and a nullable type (null or undefined), or
 * 	// a string-like type and a type known to be non-string-like, or
 * 	// a number-like type and a type known to be non-number-like, or
 * 	// a symbol-like type and a type known to be non-symbol-like, or
 * 	// a void-like type and a type known to be non-void-like, or
 * 	// a non-primitive type and a type known to be primitive.
 * 	if includes&TypeFlagsNever != 0 {
 * 		if slices.Contains(typeSet, c.silentNeverType) {
 * 			return c.silentNeverType
 * 		}
 * 		return c.neverType
 * 	}
 * 	if c.strictNullChecks && includes&TypeFlagsNullable != 0 && includes&(TypeFlagsObject|TypeFlagsNonPrimitive|TypeFlagsIncludesEmptyObject) != 0 ||
 * 		includes&TypeFlagsNonPrimitive != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsNonPrimitive) != 0 ||
 * 		includes&TypeFlagsStringLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsStringLike) != 0 ||
 * 		includes&TypeFlagsNumberLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsNumberLike) != 0 ||
 * 		includes&TypeFlagsBigIntLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsBigIntLike) != 0 ||
 * 		includes&TypeFlagsESSymbolLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsESSymbolLike) != 0 ||
 * 		includes&TypeFlagsVoidLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsVoidLike) != 0 {
 * 		return c.neverType
 * 	}
 * 	if includes&(TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 && includes&TypeFlagsStringLiteral != 0 {
 * 		var isEmptySet bool
 * 		typeSet, isEmptySet = c.extractRedundantTemplateLiterals(typeSet)
 * 		if isEmptySet {
 * 			return c.neverType
 * 		}
 * 	}
 * 	if includes&TypeFlagsAny != 0 {
 * 		switch {
 * 		case includes&TypeFlagsIncludesWildcard != 0:
 * 			return c.wildcardType
 * 		case includes&TypeFlagsIncludesError != 0:
 * 			return c.errorType
 * 		}
 * 		return c.anyType
 * 	}
 * 	if !c.strictNullChecks && includes&TypeFlagsNullable != 0 {
 * 		switch {
 * 		case includes&TypeFlagsIncludesEmptyObject != 0:
 * 			return c.neverType
 * 		case includes&TypeFlagsUndefined != 0:
 * 			return c.undefinedType
 * 		}
 * 		return c.nullType
 * 	}
 * 	if includes&TypeFlagsString != 0 && includes&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 ||
 * 		includes&TypeFlagsNumber != 0 && includes&TypeFlagsNumberLiteral != 0 ||
 * 		includes&TypeFlagsBigInt != 0 && includes&TypeFlagsBigIntLiteral != 0 ||
 * 		includes&TypeFlagsESSymbol != 0 && includes&TypeFlagsUniqueESSymbol != 0 ||
 * 		includes&TypeFlagsVoid != 0 && includes&TypeFlagsUndefined != 0 ||
 * 		includes&TypeFlagsIncludesEmptyObject != 0 && includes&TypeFlagsDefinitelyNonNullable != 0 {
 * 		if flags&IntersectionFlagsNoSupertypeReduction == 0 {
 * 			typeSet = c.removeRedundantSupertypes(typeSet, includes)
 * 		}
 * 	}
 * 	if includes&TypeFlagsIncludesMissingType != 0 {
 * 		typeSet[slices.Index(typeSet, c.undefinedType)] = c.missingType
 * 	}
 * 	if len(typeSet) == 0 {
 * 		return c.unknownType
 * 	}
 * 	if len(typeSet) == 1 {
 * 		return typeSet[0]
 * 	}
 * 	if len(typeSet) == 2 && flags&IntersectionFlagsNoConstraintReduction == 0 {
 * 		typeVarIndex := 0
 * 		if typeSet[0].flags&TypeFlagsTypeVariable == 0 {
 * 			typeVarIndex = 1
 * 		}
 * 		typeVariable := typeSet[typeVarIndex]
 * 		primitiveType := typeSet[1-typeVarIndex]
 * 		if typeVariable.flags&TypeFlagsTypeVariable != 0 && (primitiveType.flags&(TypeFlagsPrimitive|TypeFlagsNonPrimitive) != 0 && !c.isGenericStringLikeType(primitiveType) ||
 * 			includes&TypeFlagsIncludesEmptyObject != 0) {
 * 			// We have an intersection T & P or P & T, where T is a type variable and P is a primitive type, the object type, or {}.
 * 			constraint := c.getBaseConstraintOfType(typeVariable)
 * 			// Check that T's constraint is similarly composed of primitive types, the object type, or {}.
 * 			if constraint != nil && everyType(constraint, c.isPrimitiveOrObjectOrEmptyType) {
 * 				// If T's constraint is a subtype of P, simply return T. For example, given `T extends "a" | "b"`,
 * 				// the intersection `T & string` reduces to just T.
 * 				if c.isTypeStrictSubtypeOf(constraint, primitiveType) {
 * 					return typeVariable
 * 				}
 * 				if !(constraint.flags&TypeFlagsUnion != 0 && someType(constraint, func(n *Type) bool {
 * 					return c.isTypeStrictSubtypeOf(n, primitiveType)
 * 				})) {
 * 					// No constituent of T's constraint is a subtype of P. If P is also not a subtype of T's constraint,
 * 					// then the constraint and P are unrelated, and the intersection reduces to never. For example, given
 * 					// `T extends "a" | "b"`, the intersection `T & number` reduces to never.
 * 					if !c.isTypeStrictSubtypeOf(primitiveType, constraint) {
 * 						return c.neverType
 * 					}
 * 				}
 * 				// Some constituent of T's constraint is a subtype of P, or P is a subtype of T's constraint. Thus,
 * 				// the intersection further constrains the type variable. For example, given `T extends string | number`,
 * 				// the intersection `T & "a"` is marked as a constrained type variable. Likewise, given `T extends "a" | 1`,
 * 				// the intersection `T & number` is marked as a constrained type variable.
 * 				objectFlags = ObjectFlagsIsConstrainedTypeVariable
 * 			}
 * 		}
 * 	}
 * 	key := getIntersectionKey(typeSet, flags, alias)
 * 	result := c.intersectionTypes[key]
 * 	if result == nil {
 * 		if includes&TypeFlagsUnion != 0 {
 * 			var reduced bool
 * 			typeSet, reduced = c.intersectUnionsOfPrimitiveTypes(typeSet)
 * 			switch {
 * 			case reduced:
 * 				// When the intersection creates a reduced set (which might mean that *all* union types have
 * 				// disappeared), we restart the operation to get a new set of combined flags. Once we have
 * 				// reduced we'll never reduce again, so this occurs at most once.
 * 				result = c.getIntersectionTypeEx(typeSet, flags, alias)
 * 			case core.Every(typeSet, isUnionWithUndefined):
 * 				containedUndefinedType := c.undefinedType
 * 				if core.Some(typeSet, c.containsMissingType) {
 * 					containedUndefinedType = c.missingType
 * 				}
 * 				c.filterTypes(typeSet, isNotUndefinedType)
 * 				result = c.getUnionTypeEx([]*Type{c.getIntersectionTypeEx(typeSet, flags, nil /*alias* /), containedUndefinedType}, UnionReductionLiteral, alias, nil /*origin* /)
 * 			case core.Every(typeSet, isUnionWithNull):
 * 				c.filterTypes(typeSet, isNotNullType)
 * 				result = c.getUnionTypeEx([]*Type{c.getIntersectionTypeEx(typeSet, flags, nil /*alias* /), c.nullType}, UnionReductionLiteral, alias, nil /*origin* /)
 * 			case len(typeSet) >= 3 && len(types) > 2:
 * 				// When we have three or more constituents, more than two inputs (to head off infinite reexpansion), some of which are unions, we employ a "divide and conquer" strategy
 * 				// where A & B & C & D is processed as (A & B) & (C & D). Since intersections of unions often produce far smaller
 * 				// unions of intersections than the full cartesian product (due to some intersections becoming `never`), this can
 * 				// dramatically reduce the overall work.
 * 				middle := len(typeSet) / 2
 * 				result = c.getIntersectionTypeEx([]*Type{
 * 					c.getIntersectionTypeEx(typeSet[:middle], flags, nil /*alias* /),
 * 					c.getIntersectionTypeEx(typeSet[middle:], flags, nil /*alias* /),
 * 				},
 * 					flags, alias)
 * 			default:
 * 				// We are attempting to construct a type of the form X & (A | B) & (C | D). Transform this into a type of
 * 				// the form X & A & C | X & A & D | X & B & C | X & B & D. If the estimated size of the resulting union type
 * 				// exceeds 100000 constituents, report an error.
 * 				if !c.checkCrossProductUnion(typeSet) {
 * 					return c.errorType
 * 				}
 * 				constituents := c.getCrossProductIntersections(typeSet, flags)
 * 				// We attach a denormalized origin type when at least one constituent of the cross-product union is an
 * 				// intersection (i.e. when the intersection didn't just reduce one or more unions to smaller unions) and
 * 				// the denormalized origin has fewer constituents than the union itself.
 * 				var origin *Type
 * 				if core.Some(constituents, isIntersectionType) && getConstituentCountOfTypes(constituents) > getConstituentCountOfTypes(typeSet) {
 * 					origin = c.newIntersectionType(ObjectFlagsNone, typeSet)
 * 				}
 * 				result = c.getUnionTypeEx(constituents, UnionReductionLiteral, alias, origin)
 * 			}
 * 		} else {
 * 			result = c.newIntersectionType(objectFlags|c.getPropagatingFlagsOfTypes(types /*excludeKinds* /, TypeFlagsNullable), typeSet)
 * 			result.alias = alias
 * 		}
 * 		c.intersectionTypes[key] = result
 * 	}
 * 	return result
 * }
 */
export function Checker_getIntersectionTypeEx(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, flags: IntersectionFlags, alias: GoPtr<TypeAlias>): GoPtr<Type> {
  const orderedTypes: orderedSet<GoPtr<Type>> = {
    values: GoSliceMake(0, 0, GoPointerValueOps<Type>()),
    valuesByKey: GoNilMap<GoPtr<Type>, { readonly __tsgoEmpty?: never }>(),
  };
  const includes = Checker_addTypesToIntersection(receiver, orderedTypes, 0, types);
  let typeSet = orderedTypes.values;
  let objectFlags = ObjectFlagsNone;
  if ((includes & TypeFlagsNever) !== 0) {
    if (typeSet.includes(receiver!.silentNeverType)) {
      return receiver!.silentNeverType;
    }
    return receiver!.neverType;
  }
  if ((receiver!.strictNullChecks && (includes & TypeFlagsNullable) !== 0 && (includes & (TypeFlagsObject | TypeFlagsNonPrimitive | TypeFlagsIncludesEmptyObject)) !== 0) ||
    ((includes & TypeFlagsNonPrimitive) !== 0 && (includes & (TypeFlagsDisjointDomains & ~TypeFlagsNonPrimitive)) !== 0) ||
    ((includes & TypeFlagsStringLike) !== 0 && (includes & (TypeFlagsDisjointDomains & ~TypeFlagsStringLike)) !== 0) ||
    ((includes & TypeFlagsNumberLike) !== 0 && (includes & (TypeFlagsDisjointDomains & ~TypeFlagsNumberLike)) !== 0) ||
    ((includes & TypeFlagsBigIntLike) !== 0 && (includes & (TypeFlagsDisjointDomains & ~TypeFlagsBigIntLike)) !== 0) ||
    ((includes & TypeFlagsESSymbolLike) !== 0 && (includes & (TypeFlagsDisjointDomains & ~TypeFlagsESSymbolLike)) !== 0) ||
    ((includes & TypeFlagsVoidLike) !== 0 && (includes & (TypeFlagsDisjointDomains & ~TypeFlagsVoidLike)) !== 0)) {
    return receiver!.neverType;
  }
  if ((includes & (TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0 && (includes & TypeFlagsStringLiteral) !== 0) {
    const [extractedTypeSet, isEmptySet] = Checker_extractRedundantTemplateLiterals(receiver, typeSet);
    typeSet = extractedTypeSet;
    if (isEmptySet) {
      return receiver!.neverType;
    }
  }
  if ((includes & TypeFlagsAny) !== 0) {
    if ((includes & TypeFlagsIncludesWildcard) !== 0) {
      return receiver!.wildcardType;
    }
    if ((includes & TypeFlagsIncludesError) !== 0) {
      return receiver!.errorType;
    }
    return receiver!.anyType;
  }
  if (!receiver!.strictNullChecks && (includes & TypeFlagsNullable) !== 0) {
    if ((includes & TypeFlagsIncludesEmptyObject) !== 0) {
      return receiver!.neverType;
    }
    if ((includes & TypeFlagsUndefined) !== 0) {
      return receiver!.undefinedType;
    }
    return receiver!.nullType;
  }
  if (((includes & TypeFlagsString) !== 0 && (includes & (TypeFlagsStringLiteral | TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0) ||
    ((includes & TypeFlagsNumber) !== 0 && (includes & TypeFlagsNumberLiteral) !== 0) ||
    ((includes & TypeFlagsBigInt) !== 0 && (includes & TypeFlagsBigIntLiteral) !== 0) ||
    ((includes & TypeFlagsESSymbol) !== 0 && (includes & TypeFlagsUniqueESSymbol) !== 0) ||
    ((includes & TypeFlagsVoid) !== 0 && (includes & TypeFlagsUndefined) !== 0) ||
    ((includes & TypeFlagsIncludesEmptyObject) !== 0 && (includes & TypeFlagsDefinitelyNonNullable) !== 0)) {
    if ((flags & IntersectionFlagsNoSupertypeReduction) === 0) {
      typeSet = Checker_removeRedundantSupertypes(receiver, typeSet, includes);
    }
  }
  if ((includes & TypeFlagsIncludesMissingType) !== 0) {
    GoSliceStore(typeSet, slices.Index(typeSet, receiver!.undefinedType, GoEqualStrict<GoPtr<Type>>), receiver!.missingType, GoPointerValueOps<Type>());
  }
  if (typeSet.length === 0) {
    return receiver!.unknownType;
  }
  if (typeSet.length === 1) {
    return GoSliceLoad(typeSet, 0, GoPointerValueOps<Type>());
  }
  if (typeSet.length === 2 && (flags & IntersectionFlagsNoConstraintReduction) === 0) {
    let typeVarIndex = 0;
    if ((GoSliceLoad(typeSet, 0, GoPointerValueOps<Type>())!.flags & TypeFlagsTypeVariable) === 0) {
      typeVarIndex = 1;
    }
    const typeVariable = GoSliceLoad(typeSet, typeVarIndex, GoPointerValueOps<Type>());
    const primitiveType = GoSliceLoad(typeSet, 1 - typeVarIndex, GoPointerValueOps<Type>());
    if ((typeVariable!.flags & TypeFlagsTypeVariable) !== 0 && ((((primitiveType!.flags & (TypeFlagsPrimitive | TypeFlagsNonPrimitive)) !== 0) && !Checker_isGenericStringLikeType(receiver, primitiveType)) ||
      (includes & TypeFlagsIncludesEmptyObject) !== 0)) {
      const constraint = Checker_getBaseConstraintOfType(receiver, typeVariable);
      if (constraint !== undefined && everyType(constraint, receiver!.isPrimitiveOrObjectOrEmptyType)) {
        if (Checker_isTypeStrictSubtypeOf(receiver, constraint, primitiveType)) {
          return typeVariable;
        }
        if (!((constraint!.flags & TypeFlagsUnion) !== 0 && someType(constraint, (n: GoPtr<Type>): bool => Checker_isTypeStrictSubtypeOf(receiver, n, primitiveType)))) {
          if (!Checker_isTypeStrictSubtypeOf(receiver, primitiveType, constraint)) {
            return receiver!.neverType;
          }
        }
        objectFlags = ObjectFlagsIsConstrainedTypeVariable;
      }
    }
  }
  const key = getIntersectionKey(typeSet, flags, alias);
  let result = receiver!.intersectionTypes.get(key);
  if (result === undefined) {
    if ((includes & TypeFlagsUnion) !== 0) {
      const [intersectedTypeSet, reduced] = Checker_intersectUnionsOfPrimitiveTypes(receiver, typeSet);
      typeSet = intersectedTypeSet;
      if (reduced) {
        result = Checker_getIntersectionTypeEx(receiver, typeSet, flags, alias);
      } else if (core.Every(typeSet, isUnionWithUndefined)) {
        let containedUndefinedType = receiver!.undefinedType;
        if (core.Some(typeSet, receiver!.containsMissingType)) {
          containedUndefinedType = receiver!.missingType;
        }
        Checker_filterTypes(receiver, typeSet, isNotUndefinedType);
        result = Checker_getUnionTypeEx(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
          GoSliceStore(__goSliceLiteral, 0, Checker_getIntersectionTypeEx(receiver, typeSet, flags, undefined), GoPointerValueOps<Type>());
          GoSliceStore(__goSliceLiteral, 1, containedUndefinedType, GoPointerValueOps<Type>());
        }), UnionReductionLiteral, alias, undefined);
      } else if (core.Every(typeSet, isUnionWithNull)) {
        Checker_filterTypes(receiver, typeSet, isNotNullType);
        result = Checker_getUnionTypeEx(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
          GoSliceStore(__goSliceLiteral, 0, Checker_getIntersectionTypeEx(receiver, typeSet, flags, undefined), GoPointerValueOps<Type>());
          GoSliceStore(__goSliceLiteral, 1, receiver!.nullType, GoPointerValueOps<Type>());
        }), UnionReductionLiteral, alias, undefined);
      } else if (typeSet.length >= 3 && types.length > 2) {
        const middle = Math.trunc(typeSet.length / 2);
        result = Checker_getIntersectionTypeEx(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
          GoSliceStore(__goSliceLiteral, 0, Checker_getIntersectionTypeEx(receiver, typeSet.slice(0, middle), flags, undefined), GoPointerValueOps<Type>());
          GoSliceStore(__goSliceLiteral, 1, Checker_getIntersectionTypeEx(receiver, typeSet.slice(middle), flags, undefined), GoPointerValueOps<Type>());
        }), flags, alias);
      } else {
        if (!Checker_checkCrossProductUnion(receiver, typeSet)) {
          return receiver!.errorType;
        }
        const constituents = Checker_getCrossProductIntersections(receiver, typeSet, flags);
        let origin: GoPtr<Type>;
        if (core.Some(constituents, isIntersectionType) && getConstituentCountOfTypes(constituents) > getConstituentCountOfTypes(typeSet)) {
          origin = Checker_newIntersectionType(receiver, ObjectFlagsNone, typeSet);
        }
        result = Checker_getUnionTypeEx(receiver, constituents, UnionReductionLiteral, alias, origin);
      }
    } else {
      result = Checker_newIntersectionType(receiver, objectFlags | Checker_getPropagatingFlagsOfTypes(receiver, types, TypeFlagsNullable), typeSet);
      result!.alias = alias;
    }
    receiver!.intersectionTypes.set(key, result);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.addTypesToIntersection","kind":"method","status":"implemented","sigHash":"63645806d9a305525d59c6e0e82e63083bca54185e29c0bc45e2077f56944408"}
 *
 * Go source:
 * func (c *Checker) addTypesToIntersection(typeSet *orderedSet[*Type], includes TypeFlags, types []*Type) TypeFlags {
 * 	for _, t := range types {
 * 		includes = c.addTypeToIntersection(typeSet, includes, c.getRegularTypeOfLiteralType(t))
 * 	}
 * 	return includes
 * }
 */
export function Checker_addTypesToIntersection(receiver: GoPtr<Checker>, typeSet: GoPtr<orderedSet<GoPtr<Type>>>, includes: TypeFlags, types: GoSlice<GoPtr<Type>>): TypeFlags {
  for (const t of types) {
    includes = Checker_addTypeToIntersection(receiver, typeSet, includes, Checker_getRegularTypeOfLiteralType(receiver, t));
  }
  return includes;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.addTypeToIntersection","kind":"method","status":"implemented","sigHash":"ab975b1700d41e9723ff937a7a316bea968bd18ade190061f61c0ca4c2e164c7"}
 *
 * Go source:
 * func (c *Checker) addTypeToIntersection(typeSet *orderedSet[*Type], includes TypeFlags, t *Type) TypeFlags {
 * 	flags := t.flags
 * 	if flags&TypeFlagsIntersection != 0 {
 * 		return c.addTypesToIntersection(typeSet, includes, t.Types())
 * 	}
 * 	if c.IsEmptyAnonymousObjectType(t) {
 * 		if includes&TypeFlagsIncludesEmptyObject == 0 {
 * 			includes |= TypeFlagsIncludesEmptyObject
 * 			typeSet.add(t)
 * 		}
 * 	} else {
 * 		if flags&TypeFlagsAnyOrUnknown != 0 {
 * 			if t == c.wildcardType {
 * 				includes |= TypeFlagsIncludesWildcard
 * 			}
 * 			if c.isErrorType(t) {
 * 				includes |= TypeFlagsIncludesError
 * 			}
 * 		} else if c.strictNullChecks || flags&TypeFlagsNullable == 0 {
 * 			if t == c.missingType {
 * 				includes |= TypeFlagsIncludesMissingType
 * 				t = c.undefinedType
 * 			}
 * 			if !typeSet.contains(t) {
 * 				if t.flags&TypeFlagsUnit != 0 && includes&TypeFlagsUnit != 0 {
 * 					// We have seen two distinct unit types which means we should reduce to an
 * 					// empty intersection. Adding TypeFlags.NonPrimitive causes that to happen.
 * 					includes |= TypeFlagsNonPrimitive
 * 				}
 * 				typeSet.add(t)
 * 			}
 * 		}
 * 		includes |= flags & TypeFlagsIncludesMask
 * 	}
 * 	return includes
 * }
 */
export function Checker_addTypeToIntersection(receiver: GoPtr<Checker>, typeSet: GoPtr<orderedSet<GoPtr<Type>>>, includes: TypeFlags, t: GoPtr<Type>): TypeFlags {
  const flags = t!.flags;
  if ((flags & TypeFlagsIntersection) !== 0) {
    return Checker_addTypesToIntersection(receiver, typeSet, includes, Type_Types(t));
  }
  if (Checker_IsEmptyAnonymousObjectType(receiver, t)) {
    if ((includes & TypeFlagsIncludesEmptyObject) === 0) {
      includes = (includes | TypeFlagsIncludesEmptyObject) as TypeFlags;
      orderedSet_add(typeSet, t, GoPointerKey<Type>());
    }
  } else {
    if ((flags & TypeFlagsAnyOrUnknown) !== 0) {
      if (t === receiver!.wildcardType) {
        includes = (includes | TypeFlagsIncludesWildcard) as TypeFlags;
      }
      if (Checker_isErrorType(receiver, t)) {
        includes = (includes | TypeFlagsIncludesError) as TypeFlags;
      }
    } else if (receiver!.strictNullChecks || (flags & TypeFlagsNullable) === 0) {
      if (t === receiver!.missingType) {
        includes = (includes | TypeFlagsIncludesMissingType) as TypeFlags;
        t = receiver!.undefinedType;
      }
      if (!orderedSet_contains(typeSet, t, GoEqualStrict<GoPtr<Type>>)) {
        if ((t!.flags & TypeFlagsUnit) !== 0 && (includes & TypeFlagsUnit) !== 0) {
          includes = (includes | TypeFlagsNonPrimitive) as TypeFlags;
        }
        orderedSet_add(typeSet, t, GoPointerKey<Type>());
      }
    }
    includes = (includes | (flags & TypeFlagsIncludesMask)) as TypeFlags;
  }
  return includes;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.extractRedundantTemplateLiterals","kind":"method","status":"implemented","sigHash":"53b6f15e0c068c5e3bb5f93357c34ec7e8b10aa6b54d332f3cc8e5518b882daa"}
 *
 * Go source:
 * func (c *Checker) extractRedundantTemplateLiterals(types []*Type) ([]*Type, bool) {
 * 	literals := core.Filter(types, func(t *Type) bool { return t.flags&TypeFlagsStringLiteral != 0 })
 * 	i := len(types)
 * 	for i > 0 {
 * 		i--
 * 		t := types[i]
 * 		if t.flags&(TypeFlagsTemplateLiteral|TypeFlagsStringMapping) == 0 {
 * 			continue
 * 		}
 * 		for _, t2 := range literals {
 * 			if c.isTypeSubtypeOf(t2, t) {
 * 				// For example, `get${T}` & "getX" is just "getX", and Lowercase<string> & "foo" is just "foo"
 * 				types = slices.Delete(types, i, i+1)
 * 				break
 * 			}
 * 			if c.isPatternLiteralType(t) {
 * 				return types, true
 * 			}
 * 		}
 * 	}
 * 	return types, false
 * }
 */
export function Checker_extractRedundantTemplateLiterals(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): [GoSlice<GoPtr<Type>>, bool] {
  const literals = core.Filter(types, (t: GoPtr<Type>): bool => (t!.flags & TypeFlagsStringLiteral) !== 0);
  for (let i = types.length; i > 0;) {
    i--;
    const t = GoSliceLoad(types, i, GoPointerValueOps<Type>())!;
    if ((t!.flags & (TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) === 0) {
      continue;
    }
    for (const t2 of literals) {
      if (Checker_isTypeSubtypeOf(receiver, t2, t)) {
        types = slices.Delete(types, i, i + 1);
        break;
      }
      if (Checker_isPatternLiteralType(receiver, t)) {
        return [types, true];
      }
    }
  }
  return [types, false];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.intersectUnionsOfPrimitiveTypes","kind":"method","status":"implemented","sigHash":"0a60c6b1c5290fc57b0e05d82419d5388ca66670e6f818e28877569042c5345e"}
 *
 * Go source:
 * func (c *Checker) intersectUnionsOfPrimitiveTypes(types []*Type) ([]*Type, bool) {
 * 	index := slices.IndexFunc(types, isPrimitiveUnion)
 * 	if index < 0 {
 * 		return types, false
 * 	}
 * 	// Remove all but the first union of primitive types and collect them in
 * 	// the unionTypes array.
 * 	i := index + 1
 * 	unionTypes := types[index:i:i]
 * 	for i < len(types) {
 * 		t := types[i]
 * 		if t.objectFlags&ObjectFlagsPrimitiveUnion != 0 {
 * 			unionTypes = append(unionTypes, t)
 * 			types = slices.Delete(types, i, i+1)
 * 		} else {
 * 			i++
 * 		}
 * 	}
 * 	// Return false if there was only one union of primitive types
 * 	if len(unionTypes) == 1 {
 * 		return types, false
 * 	}
 * 	// We have more than one union of primitive types, now intersect them. For each
 * 	// type in each union we check if the type is matched in every union and if so
 * 	// we include it in the result.
 * 	var checked []*Type
 * 	var result []*Type
 * 	for _, u := range unionTypes {
 * 		for _, t := range u.Types() {
 * 			var inserted bool
 * 			if checked, inserted = insertType(checked, t); inserted {
 * 				if c.eachUnionContains(unionTypes, t) {
 * 					// undefinedType/missingType are always sorted first so we leverage that here
 * 					if t == c.undefinedType && len(result) != 0 && result[0] == c.missingType {
 * 						continue
 * 					}
 * 					if t == c.missingType && len(result) != 0 && result[0] == c.undefinedType {
 * 						result[0] = c.missingType
 * 						continue
 * 					}
 * 					result, _ = insertType(result, t)
 * 				}
 * 			}
 * 		}
 * 	}
 * 	// Finally replace the first union with the result
 * 	types[index] = c.getUnionTypeFromSortedList(result, ObjectFlagsPrimitiveUnion, nil /*alias* /, nil /*origin* /)
 * 	return types, true
 * }
 */
export function Checker_intersectUnionsOfPrimitiveTypes(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): [GoSlice<GoPtr<Type>>, bool] {
  const index = slices.IndexFunc(types, isPrimitiveUnion);
  if (index < 0) {
    return [types, false];
  }
  let i = index + 1;
  let unionTypes: GoSlice<GoPtr<Type>> = GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, GoSliceLoad(types, index, GoPointerValueOps<Type>())!, GoPointerValueOps<Type>());
  });
  while (i < types.length) {
    const t = GoSliceLoad(types, i, GoPointerValueOps<Type>())!;
    if ((t!.objectFlags & ObjectFlagsPrimitiveUnion) !== 0) {
      unionTypes = GoSliceAppend(unionTypes, t, GoPointerValueOps<Type>());
      types = slices.Delete(types, i, i + 1);
    } else {
      i++;
    }
  }
  if (unionTypes.length === 1) {
    return [types, false];
  }
  let checked: GoSlice<GoPtr<Type>> = GoNilSlice();
  let result: GoSlice<GoPtr<Type>> = GoNilSlice();
  for (const u of unionTypes) {
    for (const t of Type_Types(u)) {
      let inserted: bool;
      [checked, inserted] = insertType(checked, t);
      if (inserted && Checker_eachUnionContains(receiver, unionTypes, t)) {
        if (t === receiver!.undefinedType && result.length !== 0 && GoSliceLoad(result, 0, GoPointerValueOps<Type>()) === receiver!.missingType) {
          continue;
        }
        if (t === receiver!.missingType && result.length !== 0 && GoSliceLoad(result, 0, GoPointerValueOps<Type>()) === receiver!.undefinedType) {
          GoSliceStore(result, 0, receiver!.missingType, GoPointerValueOps<Type>());
          continue;
        }
        [result] = insertType(result, t);
      }
    }
  }
  GoSliceStore(types, index, Checker_getUnionTypeFromSortedList(receiver, result, ObjectFlagsPrimitiveUnion, undefined, undefined), GoPointerValueOps<Type>());
  return [types, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.eachUnionContains","kind":"method","status":"implemented","sigHash":"d9fa8203157b71a10933fe86b422cb9c822233a8dbd6410b2b52f3b9ecf68000"}
 *
 * Go source:
 * func (c *Checker) eachUnionContains(unionTypes []*Type, t *Type) bool {
 * 	for _, u := range unionTypes {
 * 		types := u.Types()
 * 		if !containsType(types, t) {
 * 			if t == c.missingType {
 * 				return containsType(types, c.undefinedType)
 * 			}
 * 			if t == c.undefinedType {
 * 				return containsType(types, c.missingType)
 * 			}
 * 			var primitive *Type
 * 			switch {
 * 			case t.flags&TypeFlagsStringLiteral != 0:
 * 				primitive = c.stringType
 * 			case t.flags&(TypeFlagsEnum|TypeFlagsNumberLiteral) != 0:
 * 				primitive = c.numberType
 * 			case t.flags&TypeFlagsBigIntLiteral != 0:
 * 				primitive = c.bigintType
 * 			case t.flags&TypeFlagsUniqueESSymbol != 0:
 * 				primitive = c.esSymbolType
 * 			}
 * 			if primitive == nil || !containsType(types, primitive) {
 * 				return false
 * 			}
 * 		}
 * 	}
 * 	return true
 * }
 */
export function Checker_eachUnionContains(receiver: GoPtr<Checker>, unionTypes: GoSlice<GoPtr<Type>>, t: GoPtr<Type>): bool {
  for (const u of unionTypes) {
    const types = Type_Types(u);
    if (!containsType(types, t)) {
      if (t === receiver!.missingType) {
        return containsType(types, receiver!.undefinedType);
      }
      if (t === receiver!.undefinedType) {
        return containsType(types, receiver!.missingType);
      }
      let primitive: GoPtr<Type>;
      if ((t!.flags & TypeFlagsStringLiteral) !== 0) {
        primitive = receiver!.stringType;
      } else if ((t!.flags & (TypeFlagsEnum | TypeFlagsNumberLiteral)) !== 0) {
        primitive = receiver!.numberType;
      } else if ((t!.flags & TypeFlagsBigIntLiteral) !== 0) {
        primitive = receiver!.bigintType;
      } else if ((t!.flags & TypeFlagsUniqueESSymbol) !== 0) {
        primitive = receiver!.esSymbolType;
      }
      if (primitive === undefined || !containsType(types, primitive)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getCrossProductIntersections","kind":"method","status":"implemented","sigHash":"f5da930199195e73a0ae627df02a5d82302207e016d4e39ec08049436e240dfc"}
 *
 * Go source:
 * func (c *Checker) getCrossProductIntersections(types []*Type, flags IntersectionFlags) []*Type {
 * 	count := c.getCrossProductUnionSize(types)
 * 	var intersections []*Type
 * 	for i := range count {
 * 		constituents := slices.Clone(types)
 * 		n := i
 * 		for j := len(types) - 1; j >= 0; j-- {
 * 			if types[j].flags&TypeFlagsUnion != 0 {
 * 				sourceTypes := types[j].Types()
 * 				length := len(sourceTypes)
 * 				constituents[j] = sourceTypes[n%length]
 * 				n = n / length
 * 			}
 * 		}
 * 		t := c.getIntersectionTypeEx(constituents, flags, nil /*alias* /)
 * 		if t.flags&TypeFlagsNever == 0 {
 * 			intersections = append(intersections, t)
 * 		}
 * 	}
 * 	return intersections
 * }
 */
export function Checker_getCrossProductIntersections(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, flags: IntersectionFlags): GoSlice<GoPtr<Type>> {
  const count = Checker_getCrossProductUnionSize(receiver, types);
  let intersections: GoSlice<GoPtr<Type>> = GoNilSlice();
  for (let i = 0; i < count; i++) {
    const constituents = slices.Clone(types);
    let n = i;
    for (let j = types.length - 1; j >= 0; j--) {
      if ((GoSliceLoad(types, j, GoPointerValueOps<Type>())!.flags & TypeFlagsUnion) !== 0) {
        const sourceTypes = Type_Types(GoSliceLoad(types, j, GoPointerValueOps<Type>()));
        const length = sourceTypes.length;
        GoSliceStore(constituents, j, GoSliceLoad(sourceTypes, n % length, GoPointerValueOps<Type>()), GoPointerValueOps<Type>());
        n = Math.trunc(n / length);
      }
    }
    const t = Checker_getIntersectionTypeEx(receiver, constituents, flags, undefined);
    if ((t!.flags & TypeFlagsNever) === 0) {
      intersections = GoSliceAppend(intersections, t, GoPointerValueOps<Type>());
    }
  }
  return intersections;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.filterTypes","kind":"method","status":"implemented","sigHash":"617acec8c41b869354fe57779b08e23bb28fe9d1fb47be22daade55beb80e941"}
 *
 * Go source:
 * func (c *Checker) filterTypes(types []*Type, predicate func(*Type) bool) {
 * 	for i, t := range types {
 * 		types[i] = c.filterType(t, predicate)
 * 	}
 * }
 */
export function Checker_filterTypes(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, predicate: GoFunc<(arg0: GoPtr<Type>) => bool>): void {
  for (let i = 0; i < types.length; i++) {
    GoSliceStore(types, i, Checker_filterType(receiver, GoSliceLoad(types, i, GoPointerValueOps<Type>()), predicate), GoPointerValueOps<Type>());
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.IsEmptyAnonymousObjectType","kind":"method","status":"implemented","sigHash":"d9ef1b856583ad58e0b834b2647a0838efc8d98ff30d2bce891f8b924dac31ab"}
 *
 * Go source:
 * func (c *Checker) IsEmptyAnonymousObjectType(t *Type) bool {
 * 	return t.objectFlags&ObjectFlagsAnonymous != 0 && (t.objectFlags&ObjectFlagsMembersResolved != 0 && c.isEmptyResolvedType(t.AsStructuredType()) ||
 * 		t.symbol != nil && t.symbol.Flags&ast.SymbolFlagsTypeLiteral != 0 && len(c.getMembersOfSymbol(t.symbol)) == 0)
 * }
 */
export function Checker_IsEmptyAnonymousObjectType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return ((t!.objectFlags & ObjectFlagsAnonymous) !== 0 &&
    (((t!.objectFlags & ObjectFlagsMembersResolved) !== 0 && Checker_isEmptyResolvedType(receiver, Type_AsStructuredType(t))) ||
      (t!["symbol"] !== undefined && (t!["symbol"]!.Flags & SymbolFlagsTypeLiteral) !== 0 && Checker_getMembersOfSymbol(receiver, t!["symbol"]).size === 0))) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isEmptyResolvedType","kind":"method","status":"implemented","sigHash":"30d2e10404b42d4f907fe6a2f7af03ee634477a4fd39353799180209a239c54f"}
 *
 * Go source:
 * func (c *Checker) isEmptyResolvedType(t *StructuredType) bool {
 * 	return t.AsType() != c.anyFunctionType && len(t.properties) == 0 && len(t.signatures) == 0 && len(t.indexInfos) == 0
 * }
 */
export function Checker_isEmptyResolvedType(receiver: GoPtr<Checker>, t: GoPtr<StructuredType>): bool {
  return (t !== Type_AsStructuredType(receiver!.anyFunctionType) &&
    t!.properties.length === 0 &&
    t!.signatures.length === 0 &&
    t!.indexInfos.length === 0) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isEmptyObjectType","kind":"method","status":"implemented","sigHash":"bf83ef478016505b36a94d63d10afe225bfa141dbfa70f2ea4226b4c49c79601"}
 *
 * Go source:
 * func (c *Checker) isEmptyObjectType(t *Type) bool {
 * 	switch {
 * 	case t.flags&TypeFlagsObject != 0:
 * 		return !c.isGenericMappedType(t) && c.isEmptyResolvedType(c.resolveStructuredTypeMembers(t))
 * 	case t.flags&TypeFlagsNonPrimitive != 0:
 * 		return true
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return core.Some(t.Types(), c.isEmptyObjectType)
 * 	case t.flags&TypeFlagsIntersection != 0:
 * 		return core.Every(t.Types(), c.isEmptyObjectType)
 * 	}
 * 	return false
 * }
 */
export function Checker_isEmptyObjectType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  switch (true) {
    case (t!.flags & TypeFlagsObject) !== 0:
      return !Checker_isGenericMappedType(receiver, t) && Checker_isEmptyResolvedType(receiver, Checker_resolveStructuredTypeMembers(receiver, t));
    case (t!.flags & TypeFlagsNonPrimitive) !== 0:
      return true;
    case (t!.flags & TypeFlagsUnion) !== 0:
      return core.Some(Type_Types(t), (tt) => Checker_isEmptyObjectType(receiver, tt));
    case (t!.flags & TypeFlagsIntersection) !== 0:
      return core.Every(Type_Types(t), (tt) => Checker_isEmptyObjectType(receiver, tt));
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isPatternLiteralPlaceholderType","kind":"method","status":"implemented","sigHash":"c58a360d6e9f15be010aab9fc746564eb4c9f227d035e0487a58df28d253839b"}
 *
 * Go source:
 * func (c *Checker) isPatternLiteralPlaceholderType(t *Type) bool {
 * 	if t.flags&TypeFlagsIntersection != 0 {
 * 		// Return true if the intersection consists of one or more placeholders and zero or
 * 		// more object type tags.
 * 		seenPlaceholder := false
 * 		for _, s := range t.Types() {
 * 			if s.flags&(TypeFlagsLiteral|TypeFlagsNullable) != 0 || c.isPatternLiteralPlaceholderType(s) {
 * 				seenPlaceholder = true
 * 			} else if s.flags&TypeFlagsObject == 0 {
 * 				return false
 * 			}
 * 		}
 * 		return seenPlaceholder
 * 	}
 * 	return t.flags&(TypeFlagsAny|TypeFlagsString|TypeFlagsNumber|TypeFlagsBigInt) != 0 || c.isPatternLiteralType(t)
 * }
 */
export function Checker_isPatternLiteralPlaceholderType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if ((t!.flags & TypeFlagsIntersection) !== 0) {
    let seenPlaceholder = false;
    for (const s of Type_Types(t) ?? GoSliceMake(0, 0, GoPointerValueOps<Type>())) {
      if ((s!.flags & (TypeFlagsLiteral | TypeFlagsNullable)) !== 0 || Checker_isPatternLiteralPlaceholderType(receiver, s)) {
        seenPlaceholder = true;
      } else if ((s!.flags & TypeFlagsObject) === 0) {
        return false;
      }
    }
    return seenPlaceholder;
  }
  return (t!.flags & (TypeFlagsAny | TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt)) !== 0 || Checker_isPatternLiteralType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isPatternLiteralType","kind":"method","status":"implemented","sigHash":"473c4a098ccad049017218189984cfac2d8814ae15874e60c585f1166af907f1"}
 *
 * Go source:
 * func (c *Checker) isPatternLiteralType(t *Type) bool {
 * 	// A pattern literal type is a template literal or a string mapping type that contains only
 * 	// non-generic pattern literal placeholders.
 * 	return t.flags&TypeFlagsTemplateLiteral != 0 && core.Every(t.AsTemplateLiteralType().types, c.isPatternLiteralPlaceholderType) ||
 * 		t.flags&TypeFlagsStringMapping != 0 && c.isPatternLiteralPlaceholderType(t.Target())
 * }
 */
export function Checker_isPatternLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return ((t!.flags & TypeFlagsTemplateLiteral) !== 0 && core.Every(Type_AsTemplateLiteralType(t)!.types, (ty) => Checker_isPatternLiteralPlaceholderType(receiver, ty))) ||
    ((t!.flags & TypeFlagsStringMapping) !== 0 && Checker_isPatternLiteralPlaceholderType(receiver, Type_Target(t)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isGenericStringLikeType","kind":"method","status":"implemented","sigHash":"ad818f56fcb61e932b643bbd2b2612aa95be74cd842601b81afd5f9de3dc7028"}
 *
 * Go source:
 * func (c *Checker) isGenericStringLikeType(t *Type) bool {
 * 	return t.flags&(TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 && !c.isPatternLiteralType(t)
 * }
 */
export function Checker_isGenericStringLikeType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return (t!.flags & (TypeFlagsTemplateLiteral | TypeFlagsStringMapping)) !== 0 && !Checker_isPatternLiteralType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.filterType","kind":"method","status":"implemented","sigHash":"aebb55389dad6c8ef4fcca0849473480a2a3a82f2165f1353e5a48556d09c966"}
 *
 * Go source:
 * func (c *Checker) filterType(t *Type, f func(*Type) bool) *Type {
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		types := t.Types()
 * 		filtered := core.Filter(types, f)
 * 		if core.Same(types, filtered) {
 * 			return t
 * 		}
 * 		origin := t.AsUnionType().origin
 * 		var newOrigin *Type
 * 		if origin != nil && origin.flags&TypeFlagsUnion != 0 {
 * 			// If the origin type is a (denormalized) union type, filter its non-union constituents. If that ends
 * 			// up removing a smaller number of types than in the normalized constituent set (meaning some of the
 * 			// filtered types are within nested unions in the origin), then we can't construct a new origin type.
 * 			// Otherwise, if we have exactly one type left in the origin set, return that as the filtered type.
 * 			// Otherwise, construct a new filtered origin type.
 * 			originTypes := origin.Types()
 * 			originFiltered := core.Filter(originTypes, func(u *Type) bool {
 * 				return u.flags&TypeFlagsUnion != 0 || f(u)
 * 			})
 * 			if len(originTypes)-len(originFiltered) == len(types)-len(filtered) {
 * 				if len(originFiltered) == 1 {
 * 					return originFiltered[0]
 * 				}
 * 				newOrigin = c.newUnionType(ObjectFlagsNone, originFiltered)
 * 			}
 * 		}
 * 		// filtering could remove intersections so `ContainsIntersections` might be forwarded "incorrectly"
 * 		// it is purely an optimization hint so there is no harm in accidentally forwarding it
 * 		return c.getUnionTypeFromSortedList(filtered, t.AsUnionType().objectFlags&(ObjectFlagsPrimitiveUnion|ObjectFlagsContainsIntersections), nil /*alias* /, newOrigin)
 * 	}
 * 	if t.flags&TypeFlagsNever != 0 || f(t) {
 * 		return t
 * 	}
 * 	return c.neverType
 * }
 */
export function Checker_filterType(receiver: GoPtr<Checker>, t: GoPtr<Type>, f: GoFunc<(arg0: GoPtr<Type>) => bool>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    const types = Type_Types(t)!;
    const filtered = core.Filter(types, f);
    if (core.Same(types, filtered)) {
      return t;
    }
    const origin = Type_AsUnionType(t)!.origin;
    let newOrigin: GoPtr<Type>;
    if (origin !== undefined && (origin!.flags & TypeFlagsUnion) !== 0) {
      const originTypes = Type_Types(origin)!;
      const originFiltered = core.Filter(originTypes, (u: GoPtr<Type>): bool => (u!.flags & TypeFlagsUnion) !== 0 || f!(u));
      if (originTypes.length - originFiltered.length === types.length - filtered.length) {
        if (originFiltered.length === 1) {
          return GoSliceLoad(originFiltered, 0, GoPointerValueOps<Type>());
        }
        newOrigin = Checker_newUnionType(receiver, ObjectFlagsNone, originFiltered);
      }
    }
    return Checker_getUnionTypeFromSortedList(
      receiver,
      filtered,
      t!.objectFlags & (ObjectFlagsPrimitiveUnion | ObjectFlagsContainsIntersections),
      undefined,
      newOrigin,
    );
  }
  if ((t!.flags & TypeFlagsNever) !== 0 || f!(t)) {
    return t;
  }
  return receiver!.neverType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeType","kind":"method","status":"implemented","sigHash":"79c3c9d13827a877e7aabe2c7bfb91f91600dab80fef9dc95fecd3fbae2f5a0b"}
 *
 * Go source:
 * func (c *Checker) removeType(t *Type, targetType *Type) *Type {
 * 	return c.filterType(t, func(t *Type) bool { return t != targetType })
 * }
 */
export function Checker_removeType(receiver: GoPtr<Checker>, t: GoPtr<Type>, targetType: GoPtr<Type>): GoPtr<Type> {
  return Checker_filterType(receiver, t, (ty: GoPtr<Type>): bool => ty !== targetType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkCrossProductUnion","kind":"method","status":"implemented","sigHash":"b46ef3d465d7e3e7c96fd0d6e6472f8687dcbc3cea395ecb700dc49476e08d88"}
 *
 * Go source:
 * func (c *Checker) checkCrossProductUnion(types []*Type) bool {
 * 	size := c.getCrossProductUnionSize(types)
 * 	if size >= 100_000 {
 * 		if tr := c.tracer; tr != nil {
 * 			tr.Instant(tracing.PhaseCheckTypes, "checkCrossProductUnion_DepthLimit", map[string]any{"size": size})
 * 		}
 * 		c.error(c.currentNode, diagnostics.Expression_produces_a_union_type_that_is_too_complex_to_represent)
 * 		return false
 * 	}
 * 	return true
 * }
 */
export function Checker_checkCrossProductUnion(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): bool {
  const size = Checker_getCrossProductUnionSize(receiver, types);
  if (size >= 100_000) {
    if (receiver!.tracer !== undefined) {
      Tracer_Instant(receiver!.tracer, PhaseCheckTypes, "checkCrossProductUnion_DepthLimit", new Map([["size", size]]));
    }
    Checker_error(receiver, receiver!.currentNode, diagnosticsMessages.Expression_produces_a_union_type_that_is_too_complex_to_represent);
    return false;
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getCrossProductUnionSize","kind":"method","status":"implemented","sigHash":"39091c817e70d90b2d836c37e205768c1690d8fcf49092a1a33840e6e5c22add"}
 *
 * Go source:
 * func (c *Checker) getCrossProductUnionSize(types []*Type) int {
 * 	size := 1
 * 	for _, t := range types {
 * 		switch {
 * 		case t.flags&TypeFlagsUnion != 0:
 * 			n := len(t.Types())
 * 			// Cap the result to avoid integer overflow when computing the cross product of many large unions.
 * 			// In TypeScript, number overflow produces Infinity which naturally exceeds the limit check;
 * 			// in Go, we must guard against int wrapping to zero or negative.
 * 			if n > 0 && size > math.MaxInt/n {
 * 				return math.MaxInt
 * 			}
 * 			size *= n
 * 		case t.flags&TypeFlagsNever != 0:
 * 			return 0
 * 		}
 * 	}
 * 	return size
 * }
 */
export function Checker_getCrossProductUnionSize(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): int {
  let size = 1;
  for (const t of types) {
    if ((t!.flags & TypeFlagsUnion) !== 0) {
      const n = Type_Types(t)!.length;
      // Cap the result to avoid integer overflow when computing the cross product of many large unions.
      // In TypeScript, number overflow produces Infinity which naturally exceeds the limit check;
      // in Go, we must guard against int wrapping to zero or negative.
      if (n > 0 && size > MaxInt / n) {
        return MaxInt;
      }
      size *= n;
    } else if ((t!.flags & TypeFlagsNever) !== 0) {
      return 0;
    }
  }
  return size;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getExtractStringType","kind":"method","status":"implemented","sigHash":"594eb915d1ce23283ef483772255dcd7647dc29687e975ddd7149cb165d91ead"}
 *
 * Go source:
 * func (c *Checker) getExtractStringType(t *Type) *Type {
 * 	extractTypeAlias := c.getGlobalExtractSymbol()
 * 	if extractTypeAlias != nil {
 * 		return c.getTypeAliasInstantiation(extractTypeAlias, []*Type{t, c.stringType}, nil)
 * 	}
 * 	return c.stringType
 * }
 */
export function Checker_getExtractStringType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const extractTypeAlias = receiver!.getGlobalExtractSymbol!();
  if (extractTypeAlias !== undefined) {
    return Checker_getTypeAliasInstantiation(receiver, extractTypeAlias, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, t, GoPointerValueOps<Type>());
      GoSliceStore(__goSliceLiteral, 1, receiver!.stringType, GoPointerValueOps<Type>());
    }), undefined);
  }
  return receiver!.stringType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getLiteralTypeFromProperties","kind":"method","status":"implemented","sigHash":"55b7cef774643d8df67963853d99eaad90e9b4a092e2ed626e6f282d5d7a6ea7"}
 *
 * Go source:
 * func (c *Checker) getLiteralTypeFromProperties(t *Type, include TypeFlags, includeOrigin bool) *Type {
 * 	key := PropertiesTypesKey{typeId: t.id, include: include, includeOrigin: includeOrigin, unresolvedMembers: t.objectFlags&ObjectFlagsUnresolvedMembers != 0}
 * 	if cached, ok := c.propertiesTypes[key]; ok {
 * 		return cached
 * 	}
 * 	var origin *Type
 * 	if includeOrigin && t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 || t.alias != nil {
 * 		origin = c.newIndexType(t, IndexFlagsNone)
 * 	}
 * 	props := c.getPropertiesOfType(t)
 * 	indexInfos := c.getIndexInfosOfType(t)
 * 	types := make([]*Type, 0, len(props)+len(indexInfos))
 * 	for _, prop := range props {
 * 		types = append(types, c.getLiteralTypeFromProperty(prop, include, false))
 * 	}
 * 	for _, info := range indexInfos {
 * 		if info != c.enumNumberIndexInfo && c.isKeyTypeIncluded(info.keyType, include) {
 * 			if info.keyType == c.stringType && include&TypeFlagsNumber != 0 {
 * 				types = append(types, c.stringOrNumberType)
 * 			} else {
 * 				types = append(types, info.keyType)
 * 			}
 * 		}
 * 	}
 * 	result := c.getUnionTypeEx(types, UnionReductionLiteral, nil, origin)
 * 	c.propertiesTypes[key] = result
 * 	return result
 * }
 */
export function Checker_getLiteralTypeFromProperties(receiver: GoPtr<Checker>, t: GoPtr<Type>, include: TypeFlags, includeOrigin: bool): GoPtr<Type> {
  const key: PropertiesTypesKey = {
    typeId: t!.id,
    include,
    includeOrigin,
    unresolvedMembers: (t!.objectFlags & ObjectFlagsUnresolvedMembers) !== 0,
  };
  const cached = receiver!.propertiesTypes.get(key);
  if (cached !== undefined) {
    return cached;
  }
  let origin: GoPtr<Type>;
  if ((includeOrigin && (t!.objectFlags & (ObjectFlagsClassOrInterface | ObjectFlagsReference)) !== 0) || t!.alias !== undefined) {
    origin = Checker_newIndexType(receiver, t, IndexFlagsNone);
  }
  const props = Checker_getPropertiesOfType(receiver, t) ?? GoSliceMake(0, 0, GoPointerValueOps<Symbol>());
  const indexInfos = Checker_getIndexInfosOfType(receiver, t) ?? GoSliceMake(0, 0, GoPointerValueOps<IndexInfo>());
  let types: GoSlice<GoPtr<Type>> = GoSliceMake(0, 0, GoPointerValueOps<Type>());
  for (const prop of props) {
    types = GoSliceAppend(types, Checker_getLiteralTypeFromProperty(receiver, prop, include, false), GoPointerValueOps<Type>());
  }
  for (const info of indexInfos) {
    if (info !== receiver!.enumNumberIndexInfo && Checker_isKeyTypeIncluded(receiver, info!.keyType, include)) {
      if (info!.keyType === receiver!.stringType && (include & TypeFlagsNumber) !== 0) {
        types = GoSliceAppend(types, receiver!.stringOrNumberType, GoPointerValueOps<Type>());
      } else {
        types = GoSliceAppend(types, info!.keyType, GoPointerValueOps<Type>());
      }
    }
  }
  const result = Checker_getUnionTypeEx(receiver, types, UnionReductionLiteral, undefined, origin);
  receiver!.propertiesTypes.set(key, result);
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isKeyTypeIncluded","kind":"method","status":"implemented","sigHash":"0fdcb397c5664931b9cd071b503a94a5994ec0f9539f63c261c5680e840fe0ea"}
 *
 * Go source:
 * func (c *Checker) isKeyTypeIncluded(keyType *Type, include TypeFlags) bool {
 * 	return keyType.flags&include != 0 ||
 * 		keyType.flags&TypeFlagsIntersection != 0 && core.Some(keyType.Types(), func(t *Type) bool {
 * 			return c.isKeyTypeIncluded(t, include)
 * 		})
 * }
 */
export function Checker_isKeyTypeIncluded(receiver: GoPtr<Checker>, keyType: GoPtr<Type>, include: TypeFlags): bool {
  return (keyType!.flags & include) !== 0 ||
    ((keyType!.flags & TypeFlagsIntersection) !== 0 && core.Some(Type_Types(keyType), (t) => Checker_isKeyTypeIncluded(receiver, t, include)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getSuggestedTypeForNonexistentStringLiteralType","kind":"method","status":"implemented","sigHash":"65a74a26bce94466c7a498f25a330678232f902bf23f4ff307ffb0229d0f8b75"}
 *
 * Go source:
 * func (c *Checker) getSuggestedTypeForNonexistentStringLiteralType(source *Type, target *Type) *Type {
 * 	candidates := core.FilterSeq(target.Types(), func(t *Type) bool { return t.flags&TypeFlagsStringLiteral != 0 })
 * 	return core.GetSpellingSuggestion(getStringLiteralValue(source), candidates, getStringLiteralValue, CompareTypes)
 * }
 */
export function Checker_getSuggestedTypeForNonexistentStringLiteralType(receiver: GoPtr<Checker>, source: GoPtr<Type>, target: GoPtr<Type>): GoPtr<Type> {
  const candidates = core.FilterSeq(Type_Types(target), (candidate) => (candidate!.flags & TypeFlagsStringLiteral) !== 0);
  return core.GetSpellingSuggestion(getStringLiteralValue(source), candidates, getStringLiteralValue, CompareTypes, GoZeroPointer<Type>);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isSelfTypeAccess","kind":"method","status":"implemented","sigHash":"f02ac3a87bee69a7ac6e0d4c35211e8797158bb96306363baf898ef5480254ff"}
 *
 * Go source:
 * func (c *Checker) isSelfTypeAccess(name *ast.Node, parent *ast.Symbol) bool {
 * 	return name.Kind == ast.KindThisKeyword || parent != nil && ast.IsEntityNameExpression(name) && parent == c.getResolvedSymbol(ast.GetFirstIdentifier(name))
 * }
 */
export function Checker_isSelfTypeAccess(receiver: GoPtr<Checker>, name: GoPtr<Node>, parent: GoPtr<Symbol>): bool {
  return name!.Kind === KindThisKeyword || (parent !== undefined && IsEntityNameExpression(name) && parent === Checker_getResolvedSymbol(receiver, GetFirstIdentifier(name)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.maybeTypeOfKind","kind":"method","status":"implemented","sigHash":"6c82d6b8b2f077a9c7a878343763bbb8c81fc0b1c11d81cde60adc402b5706be"}
 *
 * Go source:
 * func (c *Checker) maybeTypeOfKind(t *Type, kind TypeFlags) bool {
 * 	if t.flags&kind != 0 {
 * 		return true
 * 	}
 * 	if t.flags&TypeFlagsUnionOrIntersection != 0 {
 * 		for _, t := range t.Types() {
 * 			if c.maybeTypeOfKind(t, kind) {
 * 				return true
 * 			}
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Checker_maybeTypeOfKind(receiver: GoPtr<Checker>, t: GoPtr<Type>, kind: TypeFlags): bool {
  if ((t!.flags & kind) !== 0) {
    return true;
  }
  if ((t!.flags & TypeFlagsUnionOrIntersection) !== 0) {
    for (const ty of Type_Types(t) ?? GoSliceMake(0, 0, GoPointerValueOps<Type>())) {
      if (Checker_maybeTypeOfKind(receiver, ty, kind)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isUnknownLikeUnionType","kind":"method","status":"implemented","sigHash":"e91286888c2fee0b1af328e9cb4eb5b119da0a684c48211cb6cd538faace160f"}
 *
 * Go source:
 * func (c *Checker) isUnknownLikeUnionType(t *Type) bool {
 * 	if c.strictNullChecks && t.flags&TypeFlagsUnion != 0 {
 * 		if t.objectFlags&ObjectFlagsIsUnknownLikeUnionComputed == 0 {
 * 			t.objectFlags |= ObjectFlagsIsUnknownLikeUnionComputed
 * 			types := t.Types()
 * 			if len(types) >= 3 && types[0].flags&TypeFlagsUndefined != 0 && types[1].flags&TypeFlagsNull != 0 && core.Some(types, c.IsEmptyAnonymousObjectType) {
 * 				t.objectFlags |= ObjectFlagsIsUnknownLikeUnion
 * 			}
 * 		}
 * 		return t.objectFlags&ObjectFlagsIsUnknownLikeUnion != 0
 * 	}
 * 	return false
 * }
 */
export function Checker_isUnknownLikeUnionType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if (receiver!.strictNullChecks && (t!.flags & TypeFlagsUnion) !== 0) {
    if ((t!.objectFlags & ObjectFlagsIsUnknownLikeUnionComputed) === 0) {
      t!.objectFlags |= ObjectFlagsIsUnknownLikeUnionComputed;
      const types = Type_Types(t);
      if (types.length >= 3 && (GoSliceLoad(types, 0, GoPointerValueOps<Type>())!.flags & TypeFlagsUndefined) !== 0 && (GoSliceLoad(types, 1, GoPointerValueOps<Type>())!.flags & TypeFlagsNull) !== 0 && core.Some(types, (ty: GoPtr<Type>): bool => Checker_IsEmptyAnonymousObjectType(receiver, ty))) {
        t!.objectFlags |= ObjectFlagsIsUnknownLikeUnion;
      }
    }
    return ((t!.objectFlags & ObjectFlagsIsUnknownLikeUnion) !== 0) as bool;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.containsUndefinedType","kind":"method","status":"implemented","sigHash":"a04595cd4fc2aad7a041aa803cee0de17044fe6472527292302659aef3efcf17"}
 *
 * Go source:
 * func (c *Checker) containsUndefinedType(t *Type) bool {
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		t = t.Types()[0]
 * 	}
 * 	return t.flags&TypeFlagsUndefined != 0
 * }
 */
export function Checker_containsUndefinedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    t = GoSliceLoad(Type_Types(t)!, 0, GoPointerValueOps<Type>());
  }
  return (t!.flags & TypeFlagsUndefined) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getNormalizedType","kind":"method","status":"implemented","sigHash":"6942ca92c469baddef00830e6142ed6581a6cb0e0bec64d4d5afe40a06b63e99"}
 *
 * Go source:
 * func (c *Checker) getNormalizedType(t *Type, writing bool) *Type {
 * 	for {
 * 		var n *Type
 * 		switch {
 * 		case isFreshLiteralType(t):
 * 			n = t.AsLiteralType().regularType
 * 		case c.isGenericTupleType(t):
 * 			n = c.getNormalizedTupleType(t, writing)
 * 		case t.objectFlags&ObjectFlagsReference != 0:
 * 			if t.AsTypeReference().node != nil {
 * 				n = c.createTypeReference(t.Target(), c.getTypeArguments(t))
 * 			} else {
 * 				n = c.getSingleBaseForNonAugmentingSubtype(t)
 * 				if n == nil {
 * 					n = t
 * 				}
 * 			}
 * 		case t.flags&TypeFlagsUnionOrIntersection != 0:
 * 			n = c.getNormalizedUnionOrIntersectionType(t, writing)
 * 		case t.flags&TypeFlagsSubstitution != 0:
 * 			if writing {
 * 				n = t.AsSubstitutionType().baseType
 * 			} else {
 * 				n = c.getSubstitutionIntersection(t)
 * 			}
 * 		case t.flags&TypeFlagsSimplifiable != 0:
 * 			n = c.getSimplifiedType(t, writing)
 * 		default:
 * 			return t
 * 		}
 * 		if n == t {
 * 			return n
 * 		}
 * 		t = n
 * 	}
 * }
 */
export function Checker_getNormalizedType(receiver: GoPtr<Checker>, t: GoPtr<Type>, writing: bool): GoPtr<Type> {
  for (;;) {
    let n: GoPtr<Type>;
    if (isFreshLiteralType(t)) {
      n = Type_AsLiteralType(t)!.regularType;
    } else if (Checker_isGenericTupleType(receiver, t)) {
      n = Checker_getNormalizedTupleType(receiver, t, writing);
    } else if ((t!.objectFlags & ObjectFlagsReference) !== 0) {
      if (Type_AsTypeReference(t)!.node !== undefined) {
        n = Checker_createTypeReference(receiver, Type_Target(t), Checker_getTypeArguments(receiver, t));
      } else {
        n = Checker_getSingleBaseForNonAugmentingSubtype(receiver, t);
        if (n === undefined) {
          n = t;
        }
      }
    } else if ((t!.flags & TypeFlagsUnionOrIntersection) !== 0) {
      n = Checker_getNormalizedUnionOrIntersectionType(receiver, t, writing);
    } else if ((t!.flags & TypeFlagsSubstitution) !== 0) {
      if (writing) {
        n = Type_AsSubstitutionType(t)!.baseType;
      } else {
        n = Checker_getSubstitutionIntersection(receiver, t);
      }
    } else if ((t!.flags & TypeFlagsSimplifiable) !== 0) {
      n = Checker_getSimplifiedType(receiver, t, writing);
    } else {
      return t;
    }
    if (n === t) {
      return n;
    }
    t = n;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getSimplifiedType","kind":"method","status":"implemented","sigHash":"e6c49c3434aff57a9a1bdc68ff70bdeb22f8d8c8e93e2bcd04a98f1510f90219"}
 *
 * Go source:
 * func (c *Checker) getSimplifiedType(t *Type, writing bool) *Type {
 * 	switch {
 * 	case t.flags&TypeFlagsIndexedAccess != 0:
 * 		return c.getSimplifiedIndexedAccessType(t, writing)
 * 	case t.flags&TypeFlagsConditional != 0:
 * 		return c.getSimplifiedConditionalType(t, writing)
 * 	}
 * 	return t
 * }
 */
export function Checker_getSimplifiedType(receiver: GoPtr<Checker>, t: GoPtr<Type>, writing: bool): GoPtr<Type> {
  if ((t!.flags & TypeFlagsIndexedAccess) !== 0) {
    return Checker_getSimplifiedIndexedAccessType(receiver, t, writing);
  }
  if ((t!.flags & TypeFlagsConditional) !== 0) {
    return Checker_getSimplifiedConditionalType(receiver, t, writing);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getSimplifiedConditionalType","kind":"method","status":"implemented","sigHash":"b77bd379d1f699e8b9c3b7d8310f6c0424de398538e0b5e1a3063846098442ce"}
 *
 * Go source:
 * func (c *Checker) getSimplifiedConditionalType(t *Type, writing bool) *Type {
 * 	checkType := t.AsConditionalType().checkType
 * 	extendsType := t.AsConditionalType().extendsType
 * 	trueType := c.getTrueTypeFromConditionalType(t)
 * 	falseType := c.getFalseTypeFromConditionalType(t)
 * 	// Simplifications for types of the form `T extends U ? T : never` and `T extends U ? never : T`.
 * 	if falseType.flags&TypeFlagsNever != 0 && c.getActualTypeVariable(trueType) == c.getActualTypeVariable(checkType) {
 * 		if checkType.flags&TypeFlagsAny != 0 || c.isTypeAssignableTo(c.getRestrictiveInstantiation(checkType), c.getRestrictiveInstantiation(extendsType)) {
 * 			return c.getSimplifiedType(trueType, writing)
 * 		} else if c.isIntersectionEmpty(checkType, extendsType) {
 * 			return c.neverType
 * 		}
 * 	} else if trueType.flags&TypeFlagsNever != 0 && c.getActualTypeVariable(falseType) == c.getActualTypeVariable(checkType) {
 * 		if checkType.flags&TypeFlagsAny == 0 && c.isTypeAssignableTo(c.getRestrictiveInstantiation(checkType), c.getRestrictiveInstantiation(extendsType)) {
 * 			return c.neverType
 * 		} else if checkType.flags&TypeFlagsAny != 0 || c.isIntersectionEmpty(checkType, extendsType) {
 * 			return c.getSimplifiedType(falseType, writing)
 * 		}
 * 	}
 * 	return t
 * }
 */
export function Checker_getSimplifiedConditionalType(receiver: GoPtr<Checker>, t: GoPtr<Type>, writing: bool): GoPtr<Type> {
  const checkType = Type_AsConditionalType(t)!.checkType;
  const extendsType = Type_AsConditionalType(t)!.extendsType;
  const trueType = Checker_getTrueTypeFromConditionalType(receiver, t);
  const falseType = Checker_getFalseTypeFromConditionalType(receiver, t);
  if ((falseType!.flags & TypeFlagsNever) !== 0 && Checker_getActualTypeVariable(receiver, trueType) === Checker_getActualTypeVariable(receiver, checkType)) {
    if ((checkType!.flags & TypeFlagsAny) !== 0 || Checker_isTypeAssignableTo(receiver, Checker_getRestrictiveInstantiation(receiver, checkType), Checker_getRestrictiveInstantiation(receiver, extendsType))) {
      return Checker_getSimplifiedType(receiver, trueType, writing);
    }
    if (Checker_isIntersectionEmpty(receiver, checkType, extendsType)) {
      return receiver!.neverType;
    }
  } else if ((trueType!.flags & TypeFlagsNever) !== 0 && Checker_getActualTypeVariable(receiver, falseType) === Checker_getActualTypeVariable(receiver, checkType)) {
    if ((checkType!.flags & TypeFlagsAny) === 0 && Checker_isTypeAssignableTo(receiver, Checker_getRestrictiveInstantiation(receiver, checkType), Checker_getRestrictiveInstantiation(receiver, extendsType))) {
      return receiver!.neverType;
    }
    if ((checkType!.flags & TypeFlagsAny) !== 0 || Checker_isIntersectionEmpty(receiver, checkType, extendsType)) {
      return Checker_getSimplifiedType(receiver, falseType, writing);
    }
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isIntersectionEmpty","kind":"method","status":"implemented","sigHash":"9648ccbb5aefbc979da7b4dc7ca6f1ba0e811cd338fed93d47b023ade711c286"}
 *
 * Go source:
 * func (c *Checker) isIntersectionEmpty(type1 *Type, type2 *Type) bool {
 * 	return c.getUnionType([]*Type{c.intersectTypes(type1, type2), c.neverType}).flags&TypeFlagsNever != 0
 * }
 */
export function Checker_isIntersectionEmpty(receiver: GoPtr<Checker>, type1: GoPtr<Type>, type2: GoPtr<Type>): bool {
  return ((Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, Checker_intersectTypes(receiver, type1, type2), GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, receiver!.neverType, GoPointerValueOps<Type>());
  }))!.flags & TypeFlagsNever) !== 0) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getNormalizedUnionOrIntersectionType","kind":"method","status":"implemented","sigHash":"190f78554f5982f851e76426a1eba5f02d650cd018f82937eca84a178ffb6cdb"}
 *
 * Go source:
 * func (c *Checker) getNormalizedUnionOrIntersectionType(t *Type, writing bool) *Type {
 * 	if reduced := c.getReducedType(t); reduced != t {
 * 		return reduced
 * 	}
 * 	if t.flags&TypeFlagsIntersection != 0 && c.shouldNormalizeIntersection(t) {
 * 		// Normalization handles cases like
 * 		// Partial<T>[K] & ({} | null) ==>
 * 		// Partial<T>[K] & {} | Partial<T>[K} & null ==>
 * 		// (T[K] | undefined) & {} | (T[K] | undefined) & null ==>
 * 		// T[K] & {} | undefined & {} | T[K] & null | undefined & null ==>
 * 		// T[K] & {} | T[K] & null
 * 		types := t.Types()
 * 		normalizedTypes := core.SameMap(types, func(u *Type) *Type { return c.getNormalizedType(u, writing) })
 * 		if !core.Same(normalizedTypes, types) {
 * 			return c.getIntersectionType(normalizedTypes)
 * 		}
 * 	}
 * 	return t
 * }
 */
export function Checker_getNormalizedUnionOrIntersectionType(receiver: GoPtr<Checker>, t: GoPtr<Type>, writing: bool): GoPtr<Type> {
  const reduced = Checker_getReducedType(receiver, t);
  if (reduced !== t) {
    return reduced;
  }
  if ((t!.flags & TypeFlagsIntersection) !== 0 && Checker_shouldNormalizeIntersection(receiver, t)) {
    const types = Type_Types(t);
    const normalizedTypes = core.SameMap(types, (u: GoPtr<Type>): GoPtr<Type> => Checker_getNormalizedType(receiver, u, writing), GoEqualStrict<GoPtr<Type>>);
    if (!core.Same(normalizedTypes, types)) {
      return Checker_getIntersectionType(receiver, normalizedTypes);
    }
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.shouldNormalizeIntersection","kind":"method","status":"implemented","sigHash":"941a3e8f9c2a0cc8684a48a9476f275686e28e399ef833ea9180d4d2a34da3ac"}
 *
 * Go source:
 * func (c *Checker) shouldNormalizeIntersection(t *Type) bool {
 * 	hasInstantiable := false
 * 	hasNullableOrEmpty := false
 * 	for _, t := range t.Types() {
 * 		hasInstantiable = hasInstantiable || t.flags&TypeFlagsInstantiable != 0
 * 		hasNullableOrEmpty = hasNullableOrEmpty || t.flags&TypeFlagsNullable != 0 || c.IsEmptyAnonymousObjectType(t)
 * 		if hasInstantiable && hasNullableOrEmpty {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Checker_shouldNormalizeIntersection(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  let hasInstantiable = false;
  let hasNullableOrEmpty = false;
  for (const ty of Type_Types(t)) {
    hasInstantiable = hasInstantiable || (ty!.flags & TypeFlagsInstantiable) !== 0;
    hasNullableOrEmpty = hasNullableOrEmpty || (ty!.flags & TypeFlagsNullable) !== 0 || Checker_IsEmptyAnonymousObjectType(receiver, ty);
    if (hasInstantiable && hasNullableOrEmpty) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getNormalizedTupleType","kind":"method","status":"implemented","sigHash":"50aa05550b34bc8985d99a68f7a9c2bce1b66acd321e53bce370f44dbb5fcccd"}
 *
 * Go source:
 * func (c *Checker) getNormalizedTupleType(t *Type, writing bool) *Type {
 * 	elements := c.getElementTypes(t)
 * 	normalizedElements := core.SameMap(elements, func(t *Type) *Type {
 * 		if t.flags&TypeFlagsSimplifiable != 0 {
 * 			return c.getSimplifiedType(t, writing)
 * 		}
 * 		return t
 * 	})
 * 	if !core.Same(elements, normalizedElements) {
 * 		return c.createNormalizedTupleType(t.Target(), normalizedElements)
 * 	}
 * 	return t
 * }
 */
export function Checker_getNormalizedTupleType(receiver: GoPtr<Checker>, t: GoPtr<Type>, writing: bool): GoPtr<Type> {
  const elements = Checker_getElementTypes(receiver, t);
  const normalizedElements = core.SameMap(elements, (ty: GoPtr<Type>): GoPtr<Type> => {
    if ((ty!.flags & TypeFlagsSimplifiable) !== 0) {
      return Checker_getSimplifiedType(receiver, ty, writing);
    }
    return ty;
  }, GoEqualStrict<GoPtr<Type>>);
  if (!core.Same(elements, normalizedElements)) {
    return Checker_createNormalizedTupleType(receiver, Type_Target(t), normalizedElements);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getModifiersTypeFromMappedType","kind":"method","status":"implemented","sigHash":"072cb008df72cc9e4707f6d89a1b6bfd5738e4a85ba97940399ce850aa28f706"}
 *
 * Go source:
 * func (c *Checker) getModifiersTypeFromMappedType(t *Type) *Type {
 * 	m := t.AsMappedType()
 * 	if m.modifiersType == nil {
 * 		if c.isMappedTypeWithKeyofConstraintDeclaration(t) {
 * 			// If the constraint declaration is a 'keyof T' node, the modifiers type is T. We check
 * 			// AST nodes here because, when T is a non-generic type, the logic below eagerly resolves
 * 			// 'keyof T' to a literal union type and we can't recover T from that type.
 * 			m.modifiersType = c.instantiateType(c.getTypeFromTypeNode(c.getConstraintDeclarationForMappedType(t).Type()), m.mapper)
 * 		} else {
 * 			// Otherwise, get the declared constraint type, and if the constraint type is a type parameter,
 * 			// get the constraint of that type parameter. If the resulting type is an indexed type 'keyof T',
 * 			// the modifiers type is T. Otherwise, the modifiers type is unknown.
 * 			declaredType := c.getTypeFromMappedTypeNode(m.declaration.AsNode())
 * 			constraint := c.getConstraintTypeFromMappedType(declaredType)
 * 			extendedConstraint := constraint
 * 			if constraint != nil && constraint.flags&TypeFlagsTypeParameter != 0 {
 * 				extendedConstraint = c.getConstraintOfTypeParameter(constraint)
 * 			}
 * 			if extendedConstraint != nil && extendedConstraint.flags&TypeFlagsIndex != 0 {
 * 				m.modifiersType = c.instantiateType(extendedConstraint.AsIndexType().target, m.mapper)
 * 			} else {
 * 				m.modifiersType = c.unknownType
 * 			}
 * 		}
 * 	}
 * 	return m.modifiersType
 * }
 */
export function Checker_getModifiersTypeFromMappedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const m = Type_AsMappedType(t);
  if (m!.modifiersType === undefined) {
    if (Checker_isMappedTypeWithKeyofConstraintDeclaration(receiver, t)) {
      m!.modifiersType = Checker_instantiateType(receiver, Checker_getTypeFromTypeNode(receiver, Node_Type(Checker_getConstraintDeclarationForMappedType(receiver, t))), Type_Mapper(t));
    } else {
      const declaredType = Checker_getTypeFromMappedTypeNode(receiver, m!.declaration);
      const constraint = Checker_getConstraintTypeFromMappedType(receiver, declaredType);
      let extendedConstraint = constraint;
      if (constraint !== undefined && (constraint!.flags & TypeFlagsTypeParameter) !== 0) {
        extendedConstraint = Checker_getConstraintOfTypeParameter(receiver, constraint);
      }
      if (extendedConstraint !== undefined && (extendedConstraint!.flags & TypeFlagsIndex) !== 0) {
        m!.modifiersType = Checker_instantiateType(receiver, Type_AsIndexType(extendedConstraint)!.target, Type_Mapper(t));
      } else {
        m!.modifiersType = receiver!.unknownType;
      }
    }
  }
  return m!.modifiersType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.extractTypesOfKind","kind":"method","status":"implemented","sigHash":"8185cf64e51845850bf23b716e60d081b0fc95239c4ac6437f004f8b8ad186f3"}
 *
 * Go source:
 * func (c *Checker) extractTypesOfKind(t *Type, kind TypeFlags) *Type {
 * 	return c.filterType(t, func(t *Type) bool { return t.flags&kind != 0 })
 * }
 */
export function Checker_extractTypesOfKind(receiver: GoPtr<Checker>, t: GoPtr<Type>, kind: TypeFlags): GoPtr<Type> {
  return Checker_filterType(receiver, t, (ty: GoPtr<Type>): bool => (ty!.flags & kind) !== 0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getRegularTypeOfObjectLiteral","kind":"method","status":"implemented","sigHash":"10e0c21b3347afb7a4f90d581a2b5eb6ecc2bcb031e822d0e11ba57a001da004"}
 *
 * Go source:
 * func (c *Checker) getRegularTypeOfObjectLiteral(t *Type) *Type {
 * 	if !(isObjectLiteralType(t) && t.objectFlags&ObjectFlagsFreshLiteral != 0) {
 * 		return t
 * 	}
 * 	key := CachedTypeKey{kind: CachedTypeKindRegularObjectLiteral, typeId: t.id}
 * 	if cached := c.cachedTypes[key]; cached != nil {
 * 		return cached
 * 	}
 * 	resolved := c.resolveStructuredTypeMembers(t)
 * 	members := c.transformTypeOfMembers(t, c.getRegularTypeOfObjectLiteral)
 * 	regular := c.newAnonymousType(t.symbol, members, resolved.CallSignatures(), resolved.ConstructSignatures(), resolved.indexInfos)
 * 	regular.flags = resolved.flags
 * 	regular.objectFlags |= resolved.objectFlags & ^ObjectFlagsFreshLiteral
 * 	c.cachedTypes[key] = regular
 * 	return regular
 * }
 */
export function Checker_getRegularTypeOfObjectLiteral(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (!(isObjectLiteralType(t) && (t!.objectFlags & ObjectFlagsFreshLiteral) !== 0)) {
    return t;
  }
  const key: CachedTypeKey = { kind: CachedTypeKindRegularObjectLiteral, typeId: t!.id };
  const cached = receiver!.cachedTypes.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const resolved = Checker_resolveStructuredTypeMembers(receiver, t);
  const members = Checker_transformTypeOfMembers(receiver, t, (propertyType: GoPtr<Type>): GoPtr<Type> => Checker_getRegularTypeOfObjectLiteral(receiver, propertyType));
  const regular = Checker_newAnonymousType(receiver, t!.symbol, members, StructuredType_CallSignatures(resolved), StructuredType_ConstructSignatures(resolved), resolved!.indexInfos);
  const resolvedType = (resolved as unknown as TypeData).AsType();
  regular!.flags = resolvedType!.flags;
  regular!.objectFlags |= (resolvedType!.objectFlags & ~ObjectFlagsFreshLiteral) as ObjectFlags;
  receiver!.cachedTypes.set(key, regular);
  return regular;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.markDecoratorMedataDataTypeNodeAsReferenced","kind":"method","status":"implemented","sigHash":"b340a547f8a88d92b34cc9dbb229ec2ea7f3ca018628d5c5f9663b034c74fc65"}
 *
 * Go source:
 * func (c *Checker) markDecoratorMedataDataTypeNodeAsReferenced(node *ast.Node /*TypeNode* /) {
 * 	entityName := c.getEntityNameForDecoratorMetadata(node)
 * 	if entityName != nil && ast.IsEntityName(entityName) {
 * 		c.markEntityNameOrEntityExpressionAsReference(entityName, true)
 * 	}
 * }
 */
export function Checker_markDecoratorMedataDataTypeNodeAsReferenced(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  const entityName = Checker_getEntityNameForDecoratorMetadata(receiver, node);
  if (entityName !== undefined && IsEntityName(entityName)) {
    Checker_markEntityNameOrEntityExpressionAsReference(receiver, entityName, true);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.markTypeNodeAsReferenced","kind":"method","status":"implemented","sigHash":"00534cd4597e242af6cebb594e80722232211a52188e8fb0d59ad881a1908757"}
 *
 * Go source:
 * func (c *Checker) markTypeNodeAsReferenced(node *ast.TypeNode) {
 * 	if node != nil {
 * 		c.markEntityNameOrEntityExpressionAsReference(getEntityNameFromTypeNode(node), false /*forDecoratorMetadata* /)
 * 	}
 * }
 */
export function Checker_markTypeNodeAsReferenced(receiver: GoPtr<Checker>, node: GoPtr<TypeNode>): void {
  if (node !== undefined) {
    Checker_markEntityNameOrEntityExpressionAsReference(receiver, getEntityNameFromTypeNode(node), false);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.GetPromisedTypeOfPromise","kind":"method","status":"implemented","sigHash":"aa5e3853b34d43b46821bbd2dcf6c1d18f08522a23d4d58ea37a2609abda720e"}
 *
 * Go source:
 * func (c *Checker) GetPromisedTypeOfPromise(t *Type) *Type {
 * 	return c.getPromisedTypeOfPromiseEx(t, nil, nil)
 * }
 */
export function Checker_GetPromisedTypeOfPromise(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getPromisedTypeOfPromiseEx(receiver, t, undefined, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getPromisedTypeOfPromiseEx","kind":"method","status":"implemented","sigHash":"a52ddb5b047f7801ac05db7c0b0d25eb6a06347c367fd81b730c692547d200b4"}
 *
 * Go source:
 * func (c *Checker) getPromisedTypeOfPromiseEx(t *Type, errorNode *ast.Node, thisTypeForErrorOut **Type) *Type {
 * 	//  { // type
 * 	//      then( // thenFunction
 * 	//          onfulfilled: ( // onfulfilledParameterType
 * 	//              value: T // valueParameterType
 * 	//          ) => any
 * 	//      ): any;
 * 	//  }
 * 	if IsTypeAny(t) {
 * 		return nil
 * 	}
 * 	key := CachedTypeKey{kind: CachedTypeKindPromisedTypeOfPromise, typeId: t.id}
 * 	if cached := c.cachedTypes[key]; cached != nil {
 * 		return cached
 * 	}
 * 	if c.isReferenceToType(t, c.getGlobalPromiseType()) {
 * 		result := c.getTypeArguments(t)[0]
 * 		c.cachedTypes[key] = result
 * 		return result
 * 	}
 * 	// primitives with a `{ then() }` won't be unwrapped/adopted.
 * 	if c.allTypesAssignableToKind(c.getBaseConstraintOrType(t), TypeFlagsPrimitive|TypeFlagsNever) {
 * 		return nil
 * 	}
 * 	thenFunction := c.getTypeOfPropertyOfType(t, "then")
 * 	// TODO: GH#18217
 * 	if IsTypeAny(thenFunction) {
 * 		return nil
 * 	}
 * 	var thenSignatures []*Signature
 * 	if thenFunction != nil {
 * 		thenSignatures = c.getSignaturesOfType(thenFunction, SignatureKindCall)
 * 	}
 * 	if len(thenSignatures) == 0 {
 * 		if errorNode != nil {
 * 			c.error(errorNode, diagnostics.A_promise_must_have_a_then_method)
 * 		}
 * 		return nil
 * 	}
 * 	var thisTypeForError *Type
 * 	var candidates []*Signature
 * 	for _, thenSignature := range thenSignatures {
 * 		thisType := c.getThisTypeOfSignature(thenSignature)
 * 		if thisType != nil && thisType != c.voidType && !c.isTypeRelatedTo(t, thisType, c.subtypeRelation) {
 * 			thisTypeForError = thisType
 * 		} else {
 * 			candidates = append(candidates, thenSignature)
 * 		}
 * 	}
 * 	if len(candidates) == 0 {
 * 		debug.Assert(thisTypeForError != nil)
 * 		if thisTypeForErrorOut != nil {
 * 			*thisTypeForErrorOut = thisTypeForError
 * 		}
 * 		if errorNode != nil {
 * 			c.error(errorNode, diagnostics.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1, c.TypeToString(t), c.TypeToString(thisTypeForError))
 * 		}
 * 		return nil
 * 	}
 * 	onfulfilledParameterType := c.getTypeWithFacts(c.getUnionType(core.Map(candidates, c.getTypeOfFirstParameterOfSignature)), TypeFactsNEUndefinedOrNull)
 * 	if IsTypeAny(onfulfilledParameterType) {
 * 		return nil
 * 	}
 * 	onfulfilledParameterSignatures := c.getSignaturesOfType(onfulfilledParameterType, SignatureKindCall)
 * 	if len(onfulfilledParameterSignatures) == 0 {
 * 		if errorNode != nil {
 * 			c.error(errorNode, diagnostics.The_first_parameter_of_the_then_method_of_a_promise_must_be_a_callback)
 * 		}
 * 		return nil
 * 	}
 * 	result := c.getUnionTypeEx(core.Map(onfulfilledParameterSignatures, c.getTypeOfFirstParameterOfSignature), UnionReductionSubtype, nil, nil)
 * 	c.cachedTypes[key] = result
 * 	return result
 * }
 */
export function Checker_getPromisedTypeOfPromiseEx(receiver: GoPtr<Checker>, t: GoPtr<Type>, errorNode: GoPtr<Node>, thisTypeForErrorOut: GoRef<GoPtr<Type>>): GoPtr<Type> {
  if (IsTypeAny(t)) {
    return undefined;
  }
  const key: CachedTypeKey = { kind: CachedTypeKindPromisedTypeOfPromise, typeId: t!.id };
  const cached = receiver!.cachedTypes.get(key);
  if (cached !== undefined) {
    return cached;
  }
  if (Checker_isReferenceToType(receiver, t, receiver!.getGlobalPromiseType!())) {
    const result = GoSliceLoad(Checker_getTypeArguments(receiver, t), 0, GoPointerValueOps<Type>());
    receiver!.cachedTypes.set(key, result);
    return result;
  }
  if (Checker_allTypesAssignableToKind(receiver, Checker_getBaseConstraintOrType(receiver, t), (TypeFlagsPrimitive | TypeFlagsNever) as TypeFlags)) {
    return undefined;
  }
  const thenFunction = Checker_getTypeOfPropertyOfType(receiver, t, "then");
  if (IsTypeAny(thenFunction)) {
    return undefined;
  }
  let thenSignatures: GoSlice<GoPtr<Signature>> = GoNilSlice();
  if (thenFunction !== undefined) {
    thenSignatures = Checker_getSignaturesOfType(receiver, thenFunction, SignatureKindCall);
  }
  if (thenSignatures.length === 0) {
    if (errorNode !== undefined) {
      Checker_error(receiver, errorNode, diagnosticsMessages.A_promise_must_have_a_then_method);
    }
    return undefined;
  }
  let thisTypeForError: GoPtr<Type>;
  let candidates: GoSlice<GoPtr<Signature>> = GoNilSlice();
  for (const thenSignature of thenSignatures) {
    const thisType = Checker_getThisTypeOfSignature(receiver, thenSignature);
    if (thisType !== undefined && thisType !== receiver!.voidType && !Checker_isTypeRelatedTo(receiver, t, thisType, receiver!.subtypeRelation)) {
      thisTypeForError = thisType;
    } else {
      candidates = GoSliceAppend(candidates, thenSignature, GoPointerValueOps<Signature>());
    }
  }
  if (candidates.length === 0) {
    if (thisTypeForErrorOut !== undefined) {
      thisTypeForErrorOut.v = thisTypeForError;
    }
    if (errorNode !== undefined) {
      Checker_error(
        receiver,
        errorNode,
        diagnosticsMessages.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1,
        Checker_TypeToString(receiver, t),
        Checker_TypeToString(receiver, thisTypeForError),
      );
    }
    return undefined;
  }
  const onfulfilledParameterType = Checker_getTypeWithFacts(
    receiver,
    Checker_getUnionType(receiver, candidates.map((signature) => Checker_getTypeOfFirstParameterOfSignature(receiver, signature))),
    TypeFactsNEUndefinedOrNull,
  );
  if (IsTypeAny(onfulfilledParameterType)) {
    return undefined;
  }
  const onfulfilledParameterSignatures = Checker_getSignaturesOfType(receiver, onfulfilledParameterType, SignatureKindCall);
  if (onfulfilledParameterSignatures.length === 0) {
    if (errorNode !== undefined) {
      Checker_error(receiver, errorNode, diagnosticsMessages.The_first_parameter_of_the_then_method_of_a_promise_must_be_a_callback);
    }
    return undefined;
  }
  const result = Checker_getUnionTypeEx(
    receiver,
    onfulfilledParameterSignatures.map((signature) => Checker_getTypeOfFirstParameterOfSignature(receiver, signature)),
    UnionReductionSubtype,
    undefined,
    undefined,
  );
  receiver!.cachedTypes.set(key, result);
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getCombinedMappedTypeOptionality","kind":"method","status":"implemented","sigHash":"ceefeb23d41aea25822ad0d93592bbb4498760e27570b607b4421d21e91452c3"}
 *
 * Go source:
 * func (c *Checker) getCombinedMappedTypeOptionality(t *Type) int {
 * 	if t.objectFlags&ObjectFlagsMapped != 0 {
 * 		optionality := getMappedTypeOptionality(t)
 * 		if optionality != 0 {
 * 			return optionality
 * 		}
 * 		return c.getCombinedMappedTypeOptionality(c.getModifiersTypeFromMappedType(t))
 * 	}
 * 	if t.flags&TypeFlagsIntersection != 0 {
 * 		optionality := c.getCombinedMappedTypeOptionality(t.Types()[0])
 * 		for _, t := range t.Types()[1:] {
 * 			if c.getCombinedMappedTypeOptionality(t) != optionality {
 * 				return 0
 * 			}
 * 		}
 * 		return optionality
 * 	}
 * 	return 0
 * }
 */
export function Checker_getCombinedMappedTypeOptionality(receiver: GoPtr<Checker>, t: GoPtr<Type>): int {
  if ((t!.objectFlags & ObjectFlagsMapped) !== 0) {
    const optionality = getMappedTypeOptionality(t);
    if (optionality !== 0) {
      return optionality;
    }
    return Checker_getCombinedMappedTypeOptionality(receiver, Checker_getModifiersTypeFromMappedType(receiver, t));
  }
  if ((t!.flags & TypeFlagsIntersection) !== 0) {
    const types = Type_Types(t);
    const optionality = Checker_getCombinedMappedTypeOptionality(receiver, GoSliceLoad(types, 0, GoPointerValueOps<Type>())!);
    for (const intersectionType of types.slice(1)) {
      if (Checker_getCombinedMappedTypeOptionality(receiver, intersectionType) !== optionality) {
        return 0;
      }
    }
    return optionality;
  }
  return 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getOptionalExpressionType","kind":"method","status":"implemented","sigHash":"2d9b727d3a4e7b4ba4c98a291d6a28b4ddc9a8fb7b19f5f235db436f922b06e3"}
 *
 * Go source:
 * func (c *Checker) getOptionalExpressionType(exprType *Type, expression *ast.Node) *Type {
 * 	switch {
 * 	case ast.IsExpressionOfOptionalChainRoot(expression):
 * 		return c.GetNonNullableType(exprType)
 * 	case ast.IsOptionalChain(expression):
 * 		return c.removeOptionalTypeMarker(exprType)
 * 	default:
 * 		return exprType
 * 	}
 * }
 */
export function Checker_getOptionalExpressionType(receiver: GoPtr<Checker>, exprType: GoPtr<Type>, expression: GoPtr<Node>): GoPtr<Type> {
  if (IsExpressionOfOptionalChainRoot(expression)) {
    return Checker_GetNonNullableType(receiver, exprType);
  }
  if (IsOptionalChain(expression)) {
    return Checker_removeOptionalTypeMarker(receiver, exprType);
  }
  return exprType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeOptionalTypeMarker","kind":"method","status":"implemented","sigHash":"688b012e01b8aebcb85c75114496e470980b91ee69fdfda7ab06ca144c3e2c80"}
 *
 * Go source:
 * func (c *Checker) removeOptionalTypeMarker(t *Type) *Type {
 * 	if c.strictNullChecks {
 * 		return c.removeType(t, c.optionalType)
 * 	}
 * 	return t
 * }
 */
export function Checker_removeOptionalTypeMarker(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (receiver!.strictNullChecks) {
    return Checker_removeType(receiver, t, receiver!.optionalType);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.propagateOptionalTypeMarker","kind":"method","status":"implemented","sigHash":"fcfcfae685c8fe06d18d86feab878ef6fdb3266ebd92147a2752356140c0ac31"}
 *
 * Go source:
 * func (c *Checker) propagateOptionalTypeMarker(t *Type, node *ast.Node, wasOptional bool) *Type {
 * 	if wasOptional {
 * 		if ast.IsOutermostOptionalChain(node) {
 * 			return c.getOptionalType(t, false)
 * 		}
 * 		return c.addOptionalTypeMarker(t)
 * 	}
 * 	return t
 * }
 */
export function Checker_propagateOptionalTypeMarker(receiver: GoPtr<Checker>, t: GoPtr<Type>, node: GoPtr<Node>, wasOptional: bool): GoPtr<Type> {
  if (wasOptional) {
    if (IsOutermostOptionalChain(node)) {
      return Checker_getOptionalType(receiver, t, false);
    }
    return Checker_addOptionalTypeMarker(receiver, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeMissingType","kind":"method","status":"implemented","sigHash":"ae1b0e54e20fb38f9ba45d78ccda9ef8312c445a63f0099f1ab2aa533292f2a9"}
 *
 * Go source:
 * func (c *Checker) removeMissingType(t *Type, isOptional bool) *Type {
 * 	if c.exactOptionalPropertyTypes && isOptional {
 * 		return c.removeType(t, c.missingType)
 * 	}
 * 	return t
 * }
 */
export function Checker_removeMissingType(receiver: GoPtr<Checker>, t: GoPtr<Type>, isOptional: bool): GoPtr<Type> {
  if (receiver!.exactOptionalPropertyTypes && isOptional) {
    return Checker_removeType(receiver, t, receiver!.missingType);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeMissingOrUndefinedType","kind":"method","status":"implemented","sigHash":"820da145dbdf47b4572b6dc0eadd55081c4a758d2d69afe45856aba4204f3483"}
 *
 * Go source:
 * func (c *Checker) removeMissingOrUndefinedType(t *Type) *Type {
 * 	if c.exactOptionalPropertyTypes {
 * 		return c.removeType(t, c.missingType)
 * 	}
 * 	return c.getTypeWithFacts(t, TypeFactsNEUndefined)
 * }
 */
export function Checker_removeMissingOrUndefinedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (receiver!.exactOptionalPropertyTypes) {
    return Checker_removeType(receiver, t, receiver!.missingType);
  }
  return Checker_getTypeWithFacts(receiver, t, TypeFactsNEUndefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTemplateLiteralType","kind":"method","status":"implemented","sigHash":"d29bf2d226be5b2591a8fd213c431b3b9a4451a4590e6cc8c29edf58dc8975b9"}
 *
 * Go source:
 * func (c *Checker) getTemplateLiteralType(texts []string, types []*Type) *Type {
 * 	unionIndex := core.FindIndex(types, func(t *Type) bool {
 * 		return t.flags&(TypeFlagsNever|TypeFlagsUnion) != 0
 * 	})
 * 	if unionIndex >= 0 {
 * 		if !c.checkCrossProductUnion(types) {
 * 			return c.errorType
 * 		}
 * 		return c.mapType(types[unionIndex], func(t *Type) *Type {
 * 			return c.getTemplateLiteralType(texts, core.ReplaceElement(types, unionIndex, t))
 * 		})
 * 	}
 * 	if slices.Contains(types, c.wildcardType) {
 * 		return c.wildcardType
 * 	}
 * 	var newTypes []*Type
 * 	var newTexts []string
 * 	var sb strings.Builder
 * 	sb.WriteString(texts[0])
 * 	var addSpans func([]string, []*Type) bool
 * 	addSpans = func(texts []string, types []*Type) bool {
 * 		for i, t := range types {
 * 			switch {
 * 			case t.flags&(TypeFlagsLiteral|TypeFlagsNull|TypeFlagsUndefined) != 0:
 * 				sb.WriteString(c.getTemplateStringForType(t))
 * 				sb.WriteString(texts[i+1])
 * 			case t.flags&TypeFlagsTemplateLiteral != 0:
 * 				sb.WriteString(t.AsTemplateLiteralType().texts[0])
 * 				if !addSpans(t.AsTemplateLiteralType().texts, t.AsTemplateLiteralType().types) {
 * 					return false
 * 				}
 * 				sb.WriteString(texts[i+1])
 * 			case c.isGenericIndexType(t) || c.isPatternLiteralPlaceholderType(t):
 * 				newTypes = append(newTypes, t)
 * 				newTexts = append(newTexts, stringutil.CombineSurrogatePairs(sb.String()))
 * 				sb.Reset()
 * 				sb.WriteString(texts[i+1])
 * 			default:
 * 				return false
 * 			}
 * 		}
 * 		return true
 * 	}
 * 	if !addSpans(texts, types) {
 * 		return c.stringType
 * 	}
 * 	if len(newTypes) == 0 {
 * 		return c.getStringLiteralType(stringutil.CombineSurrogatePairs(sb.String()))
 * 	}
 * 	newTexts = append(newTexts, stringutil.CombineSurrogatePairs(sb.String()))
 * 	if core.Every(newTexts, func(t string) bool { return t == "" }) {
 * 		if core.Every(newTypes, func(t *Type) bool { return t.flags&TypeFlagsString != 0 }) {
 * 			return c.stringType
 * 		}
 * 		// Normalize `${Mapping<xxx>}` into Mapping<xxx>
 * 		if len(newTypes) == 1 && c.isPatternLiteralType(newTypes[0]) {
 * 			return newTypes[0]
 * 		}
 * 	}
 * 	key := getTemplateTypeKey(newTexts, newTypes)
 * 	t := c.templateLiteralTypes[key]
 * 	if t == nil {
 * 		t = c.newTemplateLiteralType(newTexts, newTypes)
 * 		c.templateLiteralTypes[key] = t
 * 	}
 * 	return t
 * }
 */
export function Checker_getTemplateLiteralType(receiver: GoPtr<Checker>, texts: GoSlice<string>, types: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  const unionIndex = core.FindIndex(types, (t: GoPtr<Type>): bool => (t!.flags & (TypeFlagsNever | TypeFlagsUnion)) !== 0);
  if (unionIndex >= 0) {
    if (!Checker_checkCrossProductUnion(receiver, types)) {
      return receiver!.errorType;
    }
    return Checker_mapType(receiver, GoSliceLoad(types, unionIndex, GoPointerValueOps<Type>()), (t: GoPtr<Type>): GoPtr<Type> =>
      Checker_getTemplateLiteralType(receiver, texts, core.ReplaceElement(types, unionIndex, t))
    );
  }
  if (slices.Contains(types, receiver!.wildcardType, GoEqualStrict<GoPtr<Type>>)) {
    return receiver!.wildcardType;
  }
  let newTypes: GoSlice<GoPtr<Type>> = GoNilSlice();
  let newTexts: GoSlice<string> = GoNilSlice();
  let sb: string = GoSliceLoad(texts, 0, GoStringValueOps)!;
  const addSpans = (spanTexts: GoSlice<string>, spanTypes: GoSlice<GoPtr<Type>>): bool => {
    for (let i = 0; i < spanTypes.length; i++) {
      const t = GoSliceLoad(spanTypes, i, GoPointerValueOps<Type>());
      if ((t!.flags & (TypeFlagsLiteral | TypeFlagsNull | TypeFlagsUndefined)) !== 0) {
        sb += Checker_getTemplateStringForType(receiver, t);
        sb += GoSliceLoad(spanTexts, i + 1, GoStringValueOps)!;
      } else if ((t!.flags & TypeFlagsTemplateLiteral) !== 0) {
        const templateLiteral = Type_AsTemplateLiteralType(t)!;
        sb += GoSliceLoad(templateLiteral.texts, 0, GoStringValueOps)!;
        if (!addSpans(templateLiteral.texts, templateLiteral.types)) {
          return false;
        }
        sb += GoSliceLoad(spanTexts, i + 1, GoStringValueOps)!;
      } else if (Checker_isGenericIndexType(receiver, t) || Checker_isPatternLiteralPlaceholderType(receiver, t)) {
        newTypes = GoSliceAppend(newTypes, t, GoPointerValueOps<Type>());
        newTexts = GoSliceAppend(newTexts, CombineSurrogatePairs(sb), GoStringValueOps);
        sb = "";
        sb += GoSliceLoad(spanTexts, i + 1, GoStringValueOps)!;
      } else {
        return false;
      }
    }
    return true;
  };
  if (!addSpans(texts, types)) {
    return receiver!.stringType;
  }
  if (newTypes.length === 0) {
    return Checker_getStringLiteralType(receiver, CombineSurrogatePairs(sb));
  }
  newTexts = GoSliceAppend(newTexts, CombineSurrogatePairs(sb), GoStringValueOps);
  if (core.Every(newTexts, (t: string): bool => t === "")) {
    if (core.Every(newTypes, (t: GoPtr<Type>): bool => (t!.flags & TypeFlagsString) !== 0)) {
      return receiver!.stringType;
    }
    if (newTypes.length === 1 && Checker_isPatternLiteralType(receiver, GoSliceLoad(newTypes, 0, GoPointerValueOps<Type>()))) {
      return GoSliceLoad(newTypes, 0, GoPointerValueOps<Type>());
    }
  }
  const key = getTemplateTypeKey(newTexts, newTypes);
  let t = receiver!.templateLiteralTypes.get(key);
  if (t === undefined) {
    t = Checker_newTemplateLiteralType(receiver, newTexts, newTypes);
    receiver!.templateLiteralTypes.set(key, t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTemplateStringForType","kind":"method","status":"implemented","sigHash":"3022ab5f79e1f57e8a6a3429f2d43f2b69ec4a08e46fd3fb373a190658a55e1d"}
 *
 * Go source:
 * func (c *Checker) getTemplateStringForType(t *Type) string {
 * 	switch {
 * 	case t.flags&(TypeFlagsStringLiteral|TypeFlagsNumberLiteral|TypeFlagsBooleanLiteral|TypeFlagsBigIntLiteral) != 0:
 * 		return evaluator.AnyToString(t.AsLiteralType().value)
 * 	case t.flags&TypeFlagsNullable != 0:
 * 		return t.AsIntrinsicType().intrinsicName
 * 	}
 * 	return ""
 * }
 */
export function Checker_getTemplateStringForType(receiver: GoPtr<Checker>, t: GoPtr<Type>): string {
  if ((t!.flags & (TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsBooleanLiteral | TypeFlagsBigIntLiteral)) !== 0) {
    return AnyToString(Type_AsLiteralType(t)!.value);
  }
  if ((t!.flags & TypeFlagsNullable) !== 0) {
    return Type_AsIntrinsicType(t)!.intrinsicName;
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualType","kind":"method","status":"implemented","sigHash":"643f669c50f39e66c3d735ccf81a1022e599ccd0fcf2a8100a0481cb2c26c467"}
 *
 * Go source:
 * func (c *Checker) getContextualType(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	if node.Flags&ast.NodeFlagsInWithStatement != 0 {
 * 		// We cannot answer semantic questions within a with block, do not proceed any further
 * 		return nil
 * 	}
 * 	// Cached contextual types are obtained with no ContextFlags, so we can only consult them for
 * 	// requests with no ContextFlags.
 * 	index := c.findContextualNode(node, contextFlags == ContextFlagsNone /*includeCaches* /)
 * 	if index >= 0 {
 * 		return c.contextualInfos[index].t
 * 	}
 * 	parent := node.Parent
 * 	switch parent.Kind {
 * 	case ast.KindVariableDeclaration, ast.KindParameter, ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindBindingElement:
 * 		return c.getContextualTypeForInitializerExpression(node, contextFlags)
 * 	case ast.KindArrowFunction, ast.KindReturnStatement:
 * 		return c.getContextualTypeForReturnExpression(node, contextFlags)
 * 	case ast.KindYieldExpression:
 * 		return c.getContextualTypeForYieldOperand(parent, contextFlags)
 * 	case ast.KindAwaitExpression:
 * 		return c.getContextualTypeForAwaitOperand(parent, contextFlags)
 * 	case ast.KindCallExpression, ast.KindNewExpression:
 * 		return c.getContextualTypeForArgument(parent, node)
 * 	case ast.KindDecorator:
 * 		return c.getContextualTypeForDecorator(parent)
 * 	case ast.KindTypeAssertionExpression, ast.KindAsExpression:
 * 		if ast.IsConstAssertion(parent) {
 * 			return c.getContextualType(parent, contextFlags)
 * 		}
 * 		return c.getTypeFromTypeNode(parent.Type())
 * 	case ast.KindBinaryExpression:
 * 		return c.getContextualTypeForBinaryOperand(node, contextFlags)
 * 	case ast.KindPropertyAssignment,
 * 		ast.KindShorthandPropertyAssignment:
 * 		return c.getContextualTypeForObjectLiteralElement(parent, contextFlags)
 * 	case ast.KindSpreadAssignment:
 * 		return c.getContextualType(parent.Parent, contextFlags)
 * 	case ast.KindArrayLiteralExpression:
 * 		t := c.getApparentTypeOfContextualType(parent, contextFlags)
 * 		elementIndex := ast.IndexOfNode(parent.Elements(), node)
 * 		if elementIndex < 0 {
 * 			return nil
 * 		}
 * 		firstSpreadIndex, lastSpreadIndex := c.getSpreadIndices(parent)
 * 		return c.getContextualTypeForElementExpression(t, elementIndex, len(parent.Elements()), firstSpreadIndex, lastSpreadIndex)
 * 	case ast.KindConditionalExpression:
 * 		return c.getContextualTypeForConditionalOperand(node, contextFlags)
 * 	case ast.KindTemplateSpan:
 * 		return c.getContextualTypeForSubstitutionExpression(parent.Parent, node)
 * 	case ast.KindParenthesizedExpression:
 * 		return c.getContextualType(parent, contextFlags)
 * 	case ast.KindNonNullExpression:
 * 		return c.getContextualType(parent, contextFlags)
 * 	case ast.KindSatisfiesExpression:
 * 		return c.getTypeFromTypeNode(parent.Type())
 * 	case ast.KindExportAssignment:
 * 		return c.tryGetTypeFromTypeNode(parent)
 * 	case ast.KindJsxExpression:
 * 		return c.getContextualTypeForJsxExpression(parent, contextFlags)
 * 	case ast.KindJsxAttribute, ast.KindJsxSpreadAttribute:
 * 		return c.getContextualTypeForJsxAttribute(parent, contextFlags)
 * 	case ast.KindJsxOpeningElement, ast.KindJsxSelfClosingElement:
 * 		return c.getContextualJsxElementAttributesType(parent, contextFlags)
 * 	case ast.KindImportAttribute:
 * 		return c.getContextualImportAttributeType(parent)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualType(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  if ((node!.Flags & NodeFlagsInWithStatement) !== 0) {
    return undefined;
  }
  const record = (contextualType: GoPtr<Type>): GoPtr<Type> => {
    recordExtensionContextualTargetTypeFact(receiver, node, contextualType);
    return contextualType;
  };
  const index = Checker_findContextualNode(receiver, node, contextFlags === ContextFlagsNone);
  if (index >= 0) {
    return record(receiver!.contextualInfos[index]!.t);
  }
  const parent = node!.Parent;
  switch (parent!.Kind) {
    case KindVariableDeclaration:
    case KindParameter:
    case KindPropertyDeclaration:
    case KindPropertySignature:
    case KindBindingElement:
      return record(Checker_getContextualTypeForInitializerExpression(receiver, node, contextFlags));
    case KindArrowFunction:
    case KindReturnStatement:
      return record(Checker_getContextualTypeForReturnExpression(receiver, node, contextFlags));
    case KindYieldExpression:
      return record(Checker_getContextualTypeForYieldOperand(receiver, parent, contextFlags));
    case KindAwaitExpression:
      return record(Checker_getContextualTypeForAwaitOperand(receiver, parent, contextFlags));
    case KindCallExpression:
    case KindNewExpression:
      return record(Checker_getContextualTypeForArgument(receiver, parent, node));
    case KindDecorator:
      return record(Checker_getContextualTypeForDecorator(receiver, parent));
    case KindTypeAssertionExpression:
    case KindAsExpression:
      if (IsConstAssertion(parent)) {
        return record(Checker_getContextualType(receiver, parent, contextFlags));
      }
      return record(Checker_getTypeFromTypeNode(receiver, Node_Type(parent)));
    case KindBinaryExpression:
      return record(Checker_getContextualTypeForBinaryOperand(receiver, node, contextFlags));
    case KindPropertyAssignment:
    case KindShorthandPropertyAssignment:
      return record(Checker_getContextualTypeForObjectLiteralElement(receiver, parent, contextFlags));
    case KindSpreadAssignment:
      return record(Checker_getContextualType(receiver, parent!.Parent, contextFlags));
    case KindArrayLiteralExpression: {
      const contextualType = Checker_getApparentTypeOfContextualType(receiver, parent, contextFlags);
      const elements = Node_Elements(parent) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
      const elementIndex = IndexOfNode(elements, node);
      if (elementIndex < 0) {
        return undefined;
      }
      const [firstSpreadIndex, lastSpreadIndex] = Checker_getSpreadIndices(receiver, parent);
      return record(Checker_getContextualTypeForElementExpression(receiver, contextualType, elementIndex, elements.length, firstSpreadIndex, lastSpreadIndex));
    }
    case KindConditionalExpression:
      return record(Checker_getContextualTypeForConditionalOperand(receiver, node, contextFlags));
    case KindTemplateSpan:
      return record(Checker_getContextualTypeForSubstitutionExpression(receiver, parent!.Parent, node));
    case KindParenthesizedExpression:
    case KindNonNullExpression:
      return record(Checker_getContextualType(receiver, parent, contextFlags));
    case KindSatisfiesExpression:
      return record(Checker_getTypeFromTypeNode(receiver, Node_Type(parent)));
    case KindExportAssignment:
      return record(Checker_tryGetTypeFromTypeNode(receiver, parent));
    case KindJsxExpression:
      return record(Checker_getContextualTypeForJsxExpression(receiver, parent, contextFlags));
    case KindJsxAttribute:
    case KindJsxSpreadAttribute:
      return record(Checker_getContextualTypeForJsxAttribute(receiver, parent, contextFlags));
    case KindJsxOpeningElement:
    case KindJsxSelfClosingElement:
      return record(Checker_getContextualJsxElementAttributesType(receiver, parent, contextFlags));
    case KindImportAttribute:
      return record(Checker_getContextualImportAttributeType(receiver, parent));
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForInitializerExpression","kind":"method","status":"implemented","sigHash":"1e84122bdeff1e72405b12b4513214315bd569291d68f4ef6dab8e7badfa0ad9"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForInitializerExpression(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	declaration := node.Parent
 * 	initializer := declaration.Initializer()
 * 	if node == initializer {
 * 		result := c.getContextualTypeForVariableLikeDeclaration(declaration, contextFlags)
 * 		if result != nil {
 * 			return result
 * 		}
 * 		if contextFlags&ContextFlagsSkipBindingPatterns == 0 && ast.IsBindingPattern(declaration.Name()) && len(declaration.Name().Elements()) > 0 {
 * 			return c.getTypeFromBindingPattern(declaration.Name(), true /*includePatternInType* /, false /*reportErrors* /)
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForInitializerExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const declaration = node!.Parent;
  const initializer = Node_Initializer(declaration);
  if (node === initializer) {
    const result = Checker_getContextualTypeForVariableLikeDeclaration(receiver, declaration, contextFlags);
    if (result !== undefined) {
      return result;
    }
    const name = Node_Name(declaration);
    if ((contextFlags & ContextFlagsSkipBindingPatterns) === 0 && IsBindingPattern(name) && (Node_Elements(name)?.length ?? 0) > 0) {
      return Checker_getTypeFromBindingPattern(receiver, name, true, false);
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isContextSensitiveFunctionOrObjectLiteralMethod","kind":"method","status":"implemented","sigHash":"1409551109a3af96a4de17d12c973323d37f25ec2acf1e58ed20c5c34da5af94"}
 *
 * Go source:
 * func (c *Checker) isContextSensitiveFunctionOrObjectLiteralMethod(fn *ast.Node) bool {
 * 	return (ast.IsFunctionExpressionOrArrowFunction(fn) || ast.IsObjectLiteralMethod(fn)) && c.isContextSensitiveFunctionLikeDeclaration(fn)
 * }
 */
export function Checker_isContextSensitiveFunctionOrObjectLiteralMethod(receiver: GoPtr<Checker>, fn: GoPtr<Node>): bool {
  return ((IsFunctionExpressionOrArrowFunction(fn) || IsObjectLiteralMethod(fn)) && Checker_isContextSensitiveFunctionLikeDeclaration(receiver, fn)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getMutableArrayOrTupleType","kind":"method","status":"implemented","sigHash":"0ac0cd86374c10cbfd5d5965398df43c95f54523443fc41a436ec4bfc2d5817d"}
 *
 * Go source:
 * func (c *Checker) getMutableArrayOrTupleType(t *Type) *Type {
 * 	switch {
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return c.mapType(t, c.getMutableArrayOrTupleType)
 * 	case t.flags&TypeFlagsAny != 0 || c.isMutableArrayOrTuple(c.getBaseConstraintOrType(t)):
 * 		return t
 * 	case isTupleType(t):
 * 		return c.createTupleTypeEx(c.getElementTypes(t), t.TargetTupleType().elementInfos, false /*readonly* /)
 * 	}
 * 	return c.createTupleTypeEx([]*Type{t}, []TupleElementInfo{{flags: ElementFlagsVariadic}}, false)
 * }
 */
export function Checker_getMutableArrayOrTupleType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    return Checker_mapType(receiver, t, (ty: GoPtr<Type>): GoPtr<Type> => Checker_getMutableArrayOrTupleType(receiver, ty));
  }
  if ((t!.flags & TypeFlagsAny) !== 0 || Checker_isMutableArrayOrTuple(receiver, Checker_getBaseConstraintOrType(receiver, t))) {
    return t;
  }
  if (isTupleType(t)) {
    return Checker_createTupleTypeEx(receiver, Checker_getElementTypes(receiver, t), Type_TargetTupleType(t)!.elementInfos, false);
  }
  return Checker_createTupleTypeEx(receiver, GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, t, GoPointerValueOps<Type>());
  }), [{ flags: ElementFlagsVariadic, labeledDeclaration: undefined }], false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForBindingElement","kind":"method","status":"implemented","sigHash":"e01a214648eb6c86e60f57ef185d3d4c399d06f4824d554b6532cd7c5a3bdea2"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForBindingElement(declaration *ast.Node, contextFlags ContextFlags) *Type {
 * 	name := declaration.PropertyNameOrName()
 * 	if ast.IsBindingPattern(name) || ast.IsComputedNonLiteralName(name) {
 * 		return nil
 * 	}
 * 	parent := declaration.Parent.Parent
 * 	parentType := c.getContextualTypeForVariableLikeDeclaration(parent, contextFlags)
 * 	if parentType == nil {
 * 		if !ast.IsBindingElement(parent) && parent.Initializer() != nil {
 * 			parentType = c.checkDeclarationInitializer(parent, core.IfElse(hasDotDotDotToken(declaration), CheckModeRestBindingElement, CheckModeNormal), nil)
 * 		}
 * 	}
 * 	if parentType == nil {
 * 		return nil
 * 	}
 * 	if ast.IsArrayBindingPattern(parent.Name()) {
 * 		index := slices.Index(declaration.Parent.Elements(), declaration)
 * 		if index < 0 {
 * 			return nil
 * 		}
 * 		return c.getContextualTypeForElementExpression(parentType, index, -1, -1, -1)
 * 	}
 * 	nameType := c.getLiteralTypeFromPropertyName(name)
 * 	if isTypeUsableAsPropertyName(nameType) {
 * 		return c.getTypeOfPropertyOfType(parentType, getPropertyNameFromType(nameType))
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForBindingElement(receiver: GoPtr<Checker>, declaration: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const name = Node_PropertyNameOrName(declaration);
  if (IsBindingPattern(name) || IsComputedNonLiteralName(name)) {
    return undefined;
  }
  const parent = declaration!.Parent!.Parent;
  let parentType = Checker_getContextualTypeForVariableLikeDeclaration(receiver, parent, contextFlags);
  if (parentType === undefined) {
    if (!IsBindingElement(parent) && Node_Initializer(parent) !== undefined) {
      parentType = Checker_checkDeclarationInitializer(receiver, parent, hasDotDotDotToken(declaration) ? CheckModeRestBindingElement : CheckModeNormal, undefined);
    }
  }
  if (parentType === undefined) {
    return undefined;
  }
  if (IsArrayBindingPattern(Node_Name(parent))) {
    const index = slices.Index(Node_Elements(declaration!.Parent) ?? [], declaration, GoEqualStrict<GoPtr<Node>>);
    if (index < 0) {
      return undefined;
    }
    return Checker_getContextualTypeForElementExpression(receiver, parentType, index, -1, -1, -1);
  }
  const nameType = Checker_getLiteralTypeFromPropertyName(receiver, name);
  if (isTypeUsableAsPropertyName(nameType)) {
    return Checker_getTypeOfPropertyOfType(receiver, parentType, getPropertyNameFromType(nameType));
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForReturnExpression","kind":"method","status":"implemented","sigHash":"eb13ac8eba4684b15ff153c085dc5d83241d38ed49605ccf23ea010da1628ea8"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForReturnExpression(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	fn := ast.GetContainingFunction(node)
 * 	if fn != nil {
 * 		contextualReturnType := c.getContextualReturnType(fn, contextFlags)
 * 		if contextualReturnType != nil {
 * 			functionFlags := ast.GetFunctionFlags(fn)
 * 			if functionFlags&ast.FunctionFlagsGenerator != 0 {
 * 				isAsyncGenerator := (functionFlags & ast.FunctionFlagsAsync) != 0
 * 				if contextualReturnType.flags&TypeFlagsUnion != 0 {
 * 					contextualReturnType = c.filterType(contextualReturnType, func(t *Type) bool {
 * 						return c.getIterationTypeOfGeneratorFunctionReturnType(IterationTypeKindReturn, t, isAsyncGenerator) != nil
 * 					})
 * 				}
 * 				iterationReturnType := c.getIterationTypeOfGeneratorFunctionReturnType(IterationTypeKindReturn, contextualReturnType, (functionFlags&ast.FunctionFlagsAsync) != 0)
 * 				if iterationReturnType == nil {
 * 					return nil
 * 				}
 * 				contextualReturnType = iterationReturnType
 * 				// falls through to unwrap Promise for AsyncGenerators
 * 			}
 * 			if functionFlags&ast.FunctionFlagsAsync != 0 {
 * 				// Get the awaited type without the `Awaited<T>` alias
 * 				contextualAwaitedType := c.mapType(contextualReturnType, c.getAwaitedTypeNoAlias)
 * 				if contextualAwaitedType == nil {
 * 					return nil
 * 				}
 * 				return c.getUnionType([]*Type{contextualAwaitedType, c.createPromiseLikeType(contextualAwaitedType)})
 * 			}
 * 			// Regular function or Generator function
 * 			return contextualReturnType
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForReturnExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const fn = GetContainingFunction(node);
  if (fn !== undefined) {
    let contextualReturnType = Checker_getContextualReturnType(receiver, fn, contextFlags);
    if (contextualReturnType !== undefined) {
      const functionFlags = GetFunctionFlags(fn);
      if ((functionFlags & FunctionFlagsGenerator) !== 0) {
        const isAsyncGenerator = ((functionFlags & FunctionFlagsAsync) !== 0) as bool;
        if ((contextualReturnType!.flags & TypeFlagsUnion) !== 0) {
          contextualReturnType = Checker_filterType(receiver, contextualReturnType, (type_: GoPtr<Type>): bool =>
            (Checker_getIterationTypeOfGeneratorFunctionReturnType(receiver, IterationTypeKindReturn, type_, isAsyncGenerator) !== undefined) as bool);
        }
        const iterationReturnType = Checker_getIterationTypeOfGeneratorFunctionReturnType(receiver, IterationTypeKindReturn, contextualReturnType, ((functionFlags & FunctionFlagsAsync) !== 0) as bool);
        if (iterationReturnType === undefined) {
          return undefined;
        }
        contextualReturnType = iterationReturnType;
      }
      if ((functionFlags & FunctionFlagsAsync) !== 0) {
        // Get the awaited type without the `Awaited<T>` alias
        const contextualAwaitedType = Checker_mapType(receiver, contextualReturnType, (type_: GoPtr<Type>): GoPtr<Type> => Checker_getAwaitedTypeNoAlias(receiver, type_));
        if (contextualAwaitedType === undefined) {
          return undefined;
        }
        return Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
          GoSliceStore(__goSliceLiteral, 0, contextualAwaitedType, GoPointerValueOps<Type>());
          GoSliceStore(__goSliceLiteral, 1, Checker_createPromiseLikeType(receiver, contextualAwaitedType), GoPointerValueOps<Type>());
        }));
      }
      return contextualReturnType;
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualIterationType","kind":"method","status":"implemented","sigHash":"9788fa55f957d844701f50b7a1dd7800e60ff22f8fdbcd37c38af586b0d7bf64"}
 *
 * Go source:
 * func (c *Checker) getContextualIterationType(kind IterationTypeKind, functionDecl *ast.Node) *Type {
 * 	isAsync := ast.GetFunctionFlags(functionDecl)&ast.FunctionFlagsAsync != 0
 * 	contextualReturnType := c.getContextualReturnType(functionDecl, ContextFlagsNone)
 * 	if contextualReturnType != nil {
 * 		return c.getIterationTypeOfGeneratorFunctionReturnType(kind, contextualReturnType, isAsync)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualIterationType(receiver: GoPtr<Checker>, kind: IterationTypeKind, functionDecl: GoPtr<Node>): GoPtr<Type> {
  const isAsync = (GetFunctionFlags(functionDecl) & FunctionFlagsAsync) !== 0;
  const contextualReturnType = Checker_getContextualReturnType(receiver, functionDecl, ContextFlagsNone);
  if (contextualReturnType !== undefined) {
    return Checker_getIterationTypeOfGeneratorFunctionReturnType(receiver, kind, contextualReturnType, isAsync);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForYieldOperand","kind":"method","status":"implemented","sigHash":"b7c55ca24a9a446e97487bc70384282bd638bd54e65457711dfd85be60165e74"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForYieldOperand(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	fn := ast.GetContainingFunction(node)
 * 	if fn != nil {
 * 		functionFlags := ast.GetFunctionFlags(fn)
 * 		contextualReturnType := c.getContextualReturnType(fn, contextFlags)
 * 		if contextualReturnType != nil {
 * 			isAsyncGenerator := functionFlags&ast.FunctionFlagsAsync != 0
 * 			isYieldStar := node.AsYieldExpression().AsteriskToken != nil
 * 			if !isYieldStar && contextualReturnType.flags&TypeFlagsUnion != 0 {
 * 				contextualReturnType = c.filterType(contextualReturnType, func(t *Type) bool {
 * 					return c.getIterationTypeOfGeneratorFunctionReturnType(IterationTypeKindReturn, t, isAsyncGenerator) != nil
 * 				})
 * 			}
 * 			if isYieldStar {
 * 				iterationTypes := c.getIterationTypesOfGeneratorFunctionReturnType(contextualReturnType, isAsyncGenerator)
 * 				yieldType := core.OrElse(iterationTypes.yieldType, c.silentNeverType)
 * 				returnType := core.OrElse(c.getContextualType(node, contextFlags), c.silentNeverType)
 * 				nextType := core.OrElse(iterationTypes.nextType, c.unknownType)
 * 				generatorType := c.createGeneratorType(yieldType, returnType, nextType, false /*isAsyncGenerator* /)
 * 				if isAsyncGenerator {
 * 					asyncGeneratorType := c.createGeneratorType(yieldType, returnType, nextType, true /*isAsyncGenerator* /)
 * 					return c.getUnionType([]*Type{generatorType, asyncGeneratorType})
 * 				}
 * 				return generatorType
 * 			}
 * 			return c.getIterationTypeOfGeneratorFunctionReturnType(IterationTypeKindYield, contextualReturnType, isAsyncGenerator)
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForYieldOperand(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const fn = GetContainingFunction(node);
  if (fn !== undefined) {
    const functionFlags = GetFunctionFlags(fn);
    let contextualReturnType = Checker_getContextualReturnType(receiver, fn, contextFlags);
    if (contextualReturnType !== undefined) {
      const isAsyncGenerator = ((functionFlags & FunctionFlagsAsync) !== 0) as bool;
      const isYieldStar = AsYieldExpression(node)!.AsteriskToken !== undefined;
      if (!isYieldStar && (contextualReturnType!.flags & TypeFlagsUnion) !== 0) {
        contextualReturnType = Checker_filterType(receiver, contextualReturnType, (type_: GoPtr<Type>): bool =>
          (Checker_getIterationTypeOfGeneratorFunctionReturnType(receiver, IterationTypeKindReturn, type_, isAsyncGenerator) !== undefined) as bool);
      }
      if (isYieldStar) {
        const iterationTypes = Checker_getIterationTypesOfGeneratorFunctionReturnType(receiver, contextualReturnType, isAsyncGenerator);
        const yieldType = core.OrElse(iterationTypes.yieldType, receiver!.silentNeverType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
        const returnType = core.OrElse(Checker_getContextualType(receiver, node, contextFlags), receiver!.silentNeverType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
        const nextType = core.OrElse(iterationTypes.nextType, receiver!.unknownType, GoZeroPointer<Type>, GoEqualStrict<GoPtr<Type>>);
        const generatorType = Checker_createGeneratorType(receiver, yieldType, returnType, nextType, false);
        if (isAsyncGenerator) {
          const asyncGeneratorType = Checker_createGeneratorType(receiver, yieldType, returnType, nextType, true);
          return Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, generatorType, GoPointerValueOps<Type>());
            GoSliceStore(__goSliceLiteral, 1, asyncGeneratorType, GoPointerValueOps<Type>());
          }));
        }
        return generatorType;
      }
      return Checker_getIterationTypeOfGeneratorFunctionReturnType(receiver, IterationTypeKindYield, contextualReturnType, isAsyncGenerator);
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForAwaitOperand","kind":"method","status":"implemented","sigHash":"5ef2621cfd506a8cc9dbe8bc173dce389f483364bc3b7f700d2ceafe059698d8"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForAwaitOperand(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	contextualType := c.getContextualType(node, contextFlags)
 * 	if contextualType != nil {
 * 		contextualAwaitedType := c.getAwaitedTypeNoAlias(contextualType)
 * 		if contextualAwaitedType != nil {
 * 			return c.getUnionType([]*Type{contextualAwaitedType, c.createPromiseLikeType(contextualAwaitedType)})
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForAwaitOperand(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const contextualType = Checker_getContextualType(receiver, node, contextFlags);
  if (contextualType !== undefined) {
    const contextualAwaitedType = Checker_getAwaitedTypeNoAlias(receiver, contextualType);
    if (contextualAwaitedType !== undefined) {
      return Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, contextualAwaitedType, GoPointerValueOps<Type>());
        GoSliceStore(__goSliceLiteral, 1, Checker_createPromiseLikeType(receiver, contextualAwaitedType), GoPointerValueOps<Type>());
      }));
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForDecorator","kind":"method","status":"implemented","sigHash":"d963a90b8f350efd720f7f9b37821373379e9a8a202f828e36eb714a8782939f"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForDecorator(decorator *ast.Node) *Type {
 * 	signature := c.getDecoratorCallSignature(decorator)
 * 	if signature != nil {
 * 		return c.getOrCreateTypeFromSignature(signature)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForDecorator(receiver: GoPtr<Checker>, decorator: GoPtr<Node>): GoPtr<Type> {
  const signature = Checker_getDecoratorCallSignature(receiver, decorator);
  if (signature !== undefined) {
    return Checker_getOrCreateTypeFromSignature(receiver, signature);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForBinaryOperand","kind":"method","status":"implemented","sigHash":"9fbcc8d169bb4582664cafab383eb0b4c246806ffe050b24c3c43972a1bfe773"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForBinaryOperand(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	binary := node.Parent.AsBinaryExpression()
 * 	if t := binary.Type; t != nil {
 * 		return c.getTypeFromTypeNode(t)
 * 	}
 * 	switch binary.OperatorToken.Kind {
 * 	case ast.KindEqualsToken, ast.KindAmpersandAmpersandEqualsToken, ast.KindBarBarEqualsToken, ast.KindQuestionQuestionEqualsToken:
 * 		// In an assignment expression, the right operand is contextually typed by the type of the left operand
 * 		// unless it's an assignment declaration.
 * 		if node == binary.Right {
 * 			target := ast.GetLeftmostExpression(binary.Left, false)
 * 			if !(ast.IsIdentifier(target) && c.getResolvedSymbol(target).Flags&ast.SymbolFlagsModuleExports != 0) {
 * 				return c.getContextualTypeForAssignmentExpression(binary)
 * 			}
 * 		}
 * 	case ast.KindBarBarToken, ast.KindQuestionQuestionToken:
 * 		// When an || expression has a contextual type, the operands are contextually typed by that type, except
 * 		// when that type originates in a binding pattern, the right operand is contextually typed by the type of
 * 		// the left operand. When an || expression has no contextual type, the right operand is contextually typed
 * 		// by the type of the left operand, except for the special case of Javascript declarations of the form
 * 		// `namespace.prop = namespace.prop || {}`.
 * 		t := c.getContextualType(binary.AsNode(), contextFlags)
 * 		if node == binary.Right && (t == nil || c.patternForType[t] != nil) {
 * 			return c.getTypeOfExpression(binary.Left)
 * 		}
 * 		return t
 * 	case ast.KindAmpersandAmpersandToken, ast.KindCommaToken:
 * 		if node == binary.Right {
 * 			return c.getContextualType(binary.AsNode(), contextFlags)
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForBinaryOperand(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const binary = AsBinaryExpression(node!.Parent)!;
  if (binary.Type !== undefined) {
    return Checker_getTypeFromTypeNode(receiver, binary.Type);
  }
  switch (binary.OperatorToken!.Kind) {
    case KindEqualsToken:
    case KindAmpersandAmpersandEqualsToken:
    case KindBarBarEqualsToken:
    case KindQuestionQuestionEqualsToken:
      if (node === binary.Right) {
        const target = GetLeftmostExpression(binary.Left as GoPtr<Expression>, false);
        if (!(IsIdentifier(target) && (Checker_getResolvedSymbol(receiver, target)!.Flags & SymbolFlagsModuleExports) !== 0)) {
          return Checker_getContextualTypeForAssignmentExpression(receiver, binary);
        }
      }
      break;
    case KindBarBarToken:
    case KindQuestionQuestionToken: {
      const contextualType = Checker_getContextualType(receiver, node!.Parent, contextFlags);
      if (node === binary.Right && (contextualType === undefined || receiver!.patternForType.get(contextualType) !== undefined)) {
        return Checker_getTypeOfExpression(receiver, binary.Left as GoPtr<Node>);
      }
      return contextualType;
    }
    case KindAmpersandAmpersandToken:
    case KindCommaToken:
      if (node === binary.Right) {
        return Checker_getContextualType(receiver, node!.Parent, contextFlags);
      }
      break;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForObjectLiteralElement","kind":"method","status":"implemented","sigHash":"4d7fcfe65d6393281d9deed9422c11b0b95e99a3ec210fe1ecfa235c67259bb4"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForObjectLiteralElement(element *ast.Node, contextFlags ContextFlags) *Type {
 * 	if t := element.Type(); t != nil && !ast.IsObjectLiteralMethod(element) {
 * 		return c.getTypeFromTypeNode(t)
 * 	}
 * 	objectLiteral := element.Parent
 * 	t := c.getApparentTypeOfContextualType(objectLiteral, contextFlags)
 * 	if t != nil {
 * 		if c.hasBindableName(element) {
 * 			// For a (non-symbol) computed property, there is no reason to look up the name
 * 			// in the type. It will just be "__computed", which does not appear in any
 * 			// SymbolTable.
 * 			symbol := c.getSymbolOfDeclaration(element)
 * 			return c.getTypeOfPropertyOfContextualTypeEx(t, symbol.Name, c.valueSymbolLinks.Get(symbol).nameType)
 * 		}
 * 		if ast.HasDynamicName(element) {
 * 			name := ast.GetNameOfDeclaration(element)
 * 			if name != nil && ast.IsComputedPropertyName(name) {
 * 				exprType := c.checkExpression(name.Expression())
 * 				if isTypeUsableAsPropertyName(exprType) {
 * 					propType := c.getTypeOfPropertyOfContextualType(t, getPropertyNameFromType(exprType))
 * 					if propType != nil {
 * 						return propType
 * 					}
 * 				}
 * 			}
 * 		}
 * 		if element.Name() != nil {
 * 			nameType := c.getLiteralTypeFromPropertyName(element.Name())
 * 			// We avoid calling getApplicableIndexInfo here because it performs potentially expensive intersection reduction.
 * 			return c.mapTypeEx(t, func(t *Type) *Type {
 * 				indexInfo := c.findApplicableIndexInfo(c.getIndexInfosOfStructuredType(t), nameType)
 * 				if indexInfo == nil {
 * 					return nil
 * 				}
 * 				return indexInfo.valueType
 * 			}, true /*noReductions* /)
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForObjectLiteralElement(receiver: GoPtr<Checker>, element: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const elementType = Node_Type(element);
  if (elementType !== undefined && !IsObjectLiteralMethod(element)) {
    return Checker_getTypeFromTypeNode(receiver, elementType);
  }
  const objectLiteral = element!.Parent;
  const contextualType = Checker_getApparentTypeOfContextualType(receiver, objectLiteral, contextFlags);
  if (contextualType !== undefined) {
    if (Checker_hasBindableName(receiver, element)) {
      const symbol_ = Checker_getSymbolOfDeclaration(receiver, element);
      return Checker_getTypeOfPropertyOfContextualTypeEx(receiver, contextualType, symbol_!.Name, LinkStore_Get(receiver!.valueSymbolLinks, symbol_, zeroValueSymbolLinks, goSymbolPointerKey)!.v.nameType);
    }
    if (HasDynamicName(element)) {
      const name = GetNameOfDeclaration(element);
      if (name !== undefined && IsComputedPropertyName(name)) {
        const exprType = Checker_checkExpression(receiver, Node_Expression(name));
        if (isTypeUsableAsPropertyName(exprType)) {
          const propType = Checker_getTypeOfPropertyOfContextualType(receiver, contextualType, getPropertyNameFromType(exprType));
          if (propType !== undefined) {
            return propType;
          }
        }
      }
    }
    const name = Node_Name(element);
    if (name !== undefined) {
      const nameType = Checker_getLiteralTypeFromPropertyName(receiver, name);
      return Checker_mapTypeEx(receiver, contextualType, (type_: GoPtr<Type>): GoPtr<Type> => {
        const indexInfo = Checker_findApplicableIndexInfo(receiver, Checker_getIndexInfosOfStructuredType(receiver, type_), nameType);
        if (indexInfo === undefined) {
          return undefined;
        }
        return indexInfo!.valueType;
      }, true);
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForObjectLiteralMethod","kind":"method","status":"implemented","sigHash":"0cfd0cd073a47cd62c7fb6b3c54ba2827662f7a999aa3b2ce14d95a5b3ed3781"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForObjectLiteralMethod(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	if node.Flags&ast.NodeFlagsInWithStatement != 0 {
 * 		// We cannot answer semantic questions within a with block, do not proceed any further
 * 		return nil
 * 	}
 * 	return c.getContextualTypeForObjectLiteralElement(node, contextFlags)
 * }
 */
export function Checker_getContextualTypeForObjectLiteralMethod(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  if ((node!.Flags & NodeFlagsInWithStatement) !== 0) {
    return undefined;
  }
  return Checker_getContextualTypeForObjectLiteralElement(receiver, node, contextFlags);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForElementExpression","kind":"method","status":"implemented","sigHash":"11981ccb7fd2e3e1eabf5a108439fb509ef858d9bacb9e560b426a8ffb28633a"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForElementExpression(t *Type, index int, length int, firstSpreadIndex int, lastSpreadIndex int) *Type {
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return c.mapTypeEx(t, func(t *Type) *Type {
 * 		if isTupleType(t) {
 * 			// If index is before any spread element and within the fixed part of the contextual tuple type, return
 * 			// the type of the contextual tuple element.
 * 			if (firstSpreadIndex < 0 || index < firstSpreadIndex) && index < t.TargetTupleType().fixedLength {
 * 				return c.removeMissingType(c.getTypeArguments(t)[index], t.TargetTupleType().elementInfos[index].flags&ElementFlagsOptional != 0)
 * 			}
 * 			// When the length is known and the index is after all spread elements we compute the offset from the element
 * 			// to the end and the number of ending fixed elements in the contextual tuple type.
 * 			offset := 0
 * 			if length >= 0 && (lastSpreadIndex < 0 || index > lastSpreadIndex) {
 * 				offset = length - index
 * 			}
 * 			fixedEndLength := 0
 * 			if offset > 0 && t.TargetTupleType().combinedFlags&ElementFlagsVariable != 0 {
 * 				fixedEndLength = getEndElementCount(t.TargetTupleType(), ElementFlagsFixed)
 * 			}
 * 			// If the offset is within the ending fixed part of the contextual tuple type, return the type of the contextual
 * 			// tuple element.
 * 			if offset > 0 && offset <= fixedEndLength {
 * 				return c.getTypeArguments(t)[c.getTypeReferenceArity(t)-offset]
 * 			}
 * 			// Return a union of the possible contextual element types with no subtype reduction.
 * 			tupleIndex := t.TargetTupleType().fixedLength
 * 			if firstSpreadIndex >= 0 {
 * 				tupleIndex = min(tupleIndex, firstSpreadIndex)
 * 			}
 * 			endSkipCount := fixedEndLength
 * 			if length >= 0 && lastSpreadIndex >= 0 {
 * 				endSkipCount = min(fixedEndLength, length-lastSpreadIndex)
 * 			}
 * 			return c.getElementTypeOfSliceOfTupleType(t, tupleIndex, endSkipCount, false /*writing* /, true /*noReductions* /)
 * 		}
 * 		// If element index is known and a contextual property with that name exists, return it. Otherwise return the
 * 		// iterated or element type of the contextual type.
 * 		if firstSpreadIndex < 0 || index < firstSpreadIndex {
 * 			propType := c.getTypeOfPropertyOfContextualType(t, strconv.Itoa(index))
 * 			if propType != nil {
 * 				return propType
 * 			}
 * 		}
 * 		return c.getIteratedTypeOrElementType(IterationUseElement, t, c.undefinedType, nil /*errorNode* /, false /*checkAssignability* /)
 * 	}, true /*noReductions* /)
 * }
 */
export function Checker_getContextualTypeForElementExpression(receiver: GoPtr<Checker>, t: GoPtr<Type>, index: int, length: int, firstSpreadIndex: int, lastSpreadIndex: int): GoPtr<Type> {
  if (t === undefined) {
    return undefined;
  }
  return Checker_mapTypeEx(receiver, t, (type_: GoPtr<Type>): GoPtr<Type> => {
    if (isTupleType(type_)) {
      const targetTupleType = Type_TargetTupleType(type_);
      if ((firstSpreadIndex < 0 || index < firstSpreadIndex) && index < targetTupleType!.fixedLength) {
        return Checker_removeMissingType(receiver, GoSliceLoad(Checker_getTypeArguments(receiver, type_), index, GoPointerValueOps<Type>()), (targetTupleType!.elementInfos[index]!.flags & ElementFlagsOptionalFlag) !== 0);
      }
      let offset = 0;
      if (length >= 0 && (lastSpreadIndex < 0 || index > lastSpreadIndex)) {
        offset = length - index;
      }
      let fixedEndLength = 0;
      if (offset > 0 && (targetTupleType!.combinedFlags & ElementFlagsVariable) !== 0) {
        fixedEndLength = getEndElementCount(targetTupleType, ElementFlagsFixed as ElementFlags);
      }
      if (offset > 0 && offset <= fixedEndLength) {
        return GoSliceLoad(Checker_getTypeArguments(receiver, type_), Checker_getTypeReferenceArity(receiver, type_) - offset, GoPointerValueOps<Type>());
      }
      let tupleIndex = targetTupleType!.fixedLength;
      if (firstSpreadIndex >= 0) {
        tupleIndex = Math.min(tupleIndex, firstSpreadIndex) as int;
      }
      let endSkipCount = fixedEndLength;
      if (length >= 0 && lastSpreadIndex >= 0) {
        endSkipCount = Math.min(fixedEndLength, length - lastSpreadIndex) as int;
      }
      return Checker_getElementTypeOfSliceOfTupleType(receiver, type_, tupleIndex, endSkipCount, false as bool, true as bool);
    }
    if (firstSpreadIndex < 0 || index < firstSpreadIndex) {
      const propType = Checker_getTypeOfPropertyOfContextualType(receiver, type_, String(index));
      if (propType !== undefined) {
        return propType;
      }
    }
    return Checker_getIteratedTypeOrElementType(receiver, IterationUseElement, type_, receiver!.undefinedType, undefined, false as bool);
  }, true as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getContextualTypeForConditionalOperand","kind":"method","status":"implemented","sigHash":"cfe0031f52d423c8e86ea8f2716ab7f87c939669f38e2a5a9a70aeb7128abf29"}
 *
 * Go source:
 * func (c *Checker) getContextualTypeForConditionalOperand(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	conditional := node.Parent.AsConditionalExpression()
 * 	if node == conditional.WhenTrue || node == conditional.WhenFalse {
 * 		return c.getContextualType(node.Parent, contextFlags)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getContextualTypeForConditionalOperand(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const conditional = AsConditionalExpression(node!.Parent);
  if (node === conditional!.WhenTrue || node === conditional!.WhenFalse) {
    return Checker_getContextualType(receiver, node!.Parent, contextFlags);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassDecoratorContextType","kind":"method","status":"implemented","sigHash":"e9e6ab0e6c6984d30c5232a9f6efed608ec8d22149198ce87287628aa6638261"}
 *
 * Go source:
 * func (c *Checker) newClassDecoratorContextType(classType *Type) *Type {
 * 	return c.tryCreateTypeReference(c.getGlobalClassDecoratorContextType(), []*Type{classType})
 * }
 */
export function Checker_newClassDecoratorContextType(receiver: GoPtr<Checker>, classType: GoPtr<Type>): GoPtr<Type> {
  return Checker_tryCreateTypeReference(receiver, receiver!.getGlobalClassDecoratorContextType!(), GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, classType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassMethodDecoratorContextType","kind":"method","status":"implemented","sigHash":"fd7b677fb903077372343e1d0159f51e709687ff475e6e98701c66ecac327415"}
 *
 * Go source:
 * func (c *Checker) newClassMethodDecoratorContextType(classType *Type, valueType *Type) *Type {
 * 	return c.tryCreateTypeReference(c.getGlobalClassMethodDecoratorContextType(), []*Type{classType, valueType})
 * }
 */
export function Checker_newClassMethodDecoratorContextType(receiver: GoPtr<Checker>, classType: GoPtr<Type>, valueType: GoPtr<Type>): GoPtr<Type> {
  return Checker_tryCreateTypeReference(receiver, receiver!.getGlobalClassMethodDecoratorContextType!(), GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, classType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, valueType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassGetterDecoratorContextType","kind":"method","status":"implemented","sigHash":"4234f76b1667dd6be635f37343fa3ba266cc635f347973f1c0e9de5ef8cbb676"}
 *
 * Go source:
 * func (c *Checker) newClassGetterDecoratorContextType(classType *Type, valueType *Type) *Type {
 * 	return c.tryCreateTypeReference(c.getGlobalClassGetterDecoratorContextType(), []*Type{classType, valueType})
 * }
 */
export function Checker_newClassGetterDecoratorContextType(receiver: GoPtr<Checker>, classType: GoPtr<Type>, valueType: GoPtr<Type>): GoPtr<Type> {
  return Checker_tryCreateTypeReference(receiver, receiver!.getGlobalClassGetterDecoratorContextType!(), GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, classType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, valueType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassSetterDecoratorContextType","kind":"method","status":"implemented","sigHash":"4e33d2454d526f0adb1283d92fcf6d8582618052b6c368762b86d3eafb755710"}
 *
 * Go source:
 * func (c *Checker) newClassSetterDecoratorContextType(classType *Type, valueType *Type) *Type {
 * 	return c.tryCreateTypeReference(c.getGlobalClassSetterDecoratorContextType(), []*Type{classType, valueType})
 * }
 */
export function Checker_newClassSetterDecoratorContextType(receiver: GoPtr<Checker>, classType: GoPtr<Type>, valueType: GoPtr<Type>): GoPtr<Type> {
  return Checker_tryCreateTypeReference(receiver, receiver!.getGlobalClassSetterDecoratorContextType!(), GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, classType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, valueType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassAccessorDecoratorContextType","kind":"method","status":"implemented","sigHash":"c66de1b84cccce465ae8e30986df40a64314a926b6048f57190358ac07a7ca99"}
 *
 * Go source:
 * func (c *Checker) newClassAccessorDecoratorContextType(thisType *Type, valueType *Type) *Type {
 * 	return c.tryCreateTypeReference(c.getGlobalClassAccessorDecoratorContextType(), []*Type{thisType, valueType})
 * }
 */
export function Checker_newClassAccessorDecoratorContextType(receiver: GoPtr<Checker>, thisType: GoPtr<Type>, valueType: GoPtr<Type>): GoPtr<Type> {
  return Checker_tryCreateTypeReference(receiver, receiver!.getGlobalClassAccessorDecoratorContextType!(), GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, thisType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, valueType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassFieldDecoratorContextType","kind":"method","status":"implemented","sigHash":"fcf90db8b7b6d62064b880a0dd07b410970add7b9521b21301b86295d71b50f9"}
 *
 * Go source:
 * func (c *Checker) newClassFieldDecoratorContextType(thisType *Type, valueType *Type) *Type {
 * 	return c.tryCreateTypeReference(c.getGlobalClassFieldDecoratorContextType(), []*Type{thisType, valueType})
 * }
 */
export function Checker_newClassFieldDecoratorContextType(receiver: GoPtr<Checker>, thisType: GoPtr<Type>, valueType: GoPtr<Type>): GoPtr<Type> {
  return Checker_tryCreateTypeReference(receiver, receiver!.getGlobalClassFieldDecoratorContextType!(), GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, thisType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, valueType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassAccessorDecoratorTargetType","kind":"method","status":"implemented","sigHash":"51bf0bc714248545f91d2c4afc25452680771415a6ac580855714b24a55cc9fe"}
 *
 * Go source:
 * func (c *Checker) newClassAccessorDecoratorTargetType(thisType *Type, valueType *Type) *Type {
 * 	return c.tryCreateTypeReference(c.getGlobalClassAccessorDecoratorTargetType(), []*Type{thisType, valueType})
 * }
 */
export function Checker_newClassAccessorDecoratorTargetType(receiver: GoPtr<Checker>, thisType: GoPtr<Type>, valueType: GoPtr<Type>): GoPtr<Type> {
  return Checker_tryCreateTypeReference(receiver, receiver!.getGlobalClassAccessorDecoratorTargetType!(), GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, thisType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, valueType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassAccessorDecoratorResultType","kind":"method","status":"implemented","sigHash":"23453c7c81bf221efade2b9d5ce92e78405d22c250cecdbe05d220563b53940a"}
 *
 * Go source:
 * func (c *Checker) newClassAccessorDecoratorResultType(thisType *Type, valueType *Type) *Type {
 * 	return c.tryCreateTypeReference(c.getGlobalClassAccessorDecoratorResultType(), []*Type{thisType, valueType})
 * }
 */
export function Checker_newClassAccessorDecoratorResultType(receiver: GoPtr<Checker>, thisType: GoPtr<Type>, valueType: GoPtr<Type>): GoPtr<Type> {
  return Checker_tryCreateTypeReference(receiver, receiver!.getGlobalClassAccessorDecoratorResultType!(), GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, thisType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, valueType, GoPointerValueOps<Type>());
  }));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newClassFieldDecoratorInitializerMutatorType","kind":"method","status":"implemented","sigHash":"71a967b58cecd22dcafefde8fa9d1ba1c5cc278a7ddd09b59a7b9c24fe3dd5d3"}
 *
 * Go source:
 * func (c *Checker) newClassFieldDecoratorInitializerMutatorType(thisType *Type, valueType *Type) *Type {
 * 	thisParam := c.newParameter("this", thisType)
 * 	valueParam := c.newParameter("value", valueType)
 * 	return c.newFunctionType(nil, thisParam, []*ast.Symbol{valueParam}, valueType)
 * }
 */
export function Checker_newClassFieldDecoratorInitializerMutatorType(receiver: GoPtr<Checker>, thisType: GoPtr<Type>, valueType: GoPtr<Type>): GoPtr<Type> {
  const thisParam = Checker_newParameter(receiver, "this", thisType);
  const valueParam = Checker_newParameter(receiver, "value", valueType);
  return Checker_newFunctionType(receiver, GoSliceMake(0, 0, GoPointerValueOps<Type>()), thisParam, GoSliceBuild(1, 1, GoPointerValueOps<Symbol>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, valueParam, GoPointerValueOps<Symbol>());
  }), valueType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newFunctionType","kind":"method","status":"implemented","sigHash":"efc44ca87eb79635767aa71982429fc11fb58aaead522212036e7333dc402e18"}
 *
 * Go source:
 * func (c *Checker) newFunctionType(typeParameters []*Type, thisParameter *ast.Symbol, parameters []*ast.Symbol, returnType *Type) *Type {
 * 	signature := c.newCallSignature(typeParameters, thisParameter, parameters, returnType)
 * 	return c.getOrCreateTypeFromSignature(signature)
 * }
 */
export function Checker_newFunctionType(receiver: GoPtr<Checker>, typeParameters: GoSlice<GoPtr<Type>>, thisParameter: GoPtr<Symbol>, parameters: GoSlice<GoPtr<Symbol>>, returnType: GoPtr<Type>): GoPtr<Type> {
  const signature = Checker_newCallSignature(receiver, typeParameters, thisParameter, parameters, returnType);
  return Checker_getOrCreateTypeFromSignature(receiver, signature);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newGetterFunctionType","kind":"method","status":"implemented","sigHash":"857316a30d2e953bb54952915b45ad13e9de8dfa2ddb52222c4e129225c52b76"}
 *
 * Go source:
 * func (c *Checker) newGetterFunctionType(t *Type) *Type {
 * 	return c.newFunctionType(nil, nil /*thisParameter* /, nil, t)
 * }
 */
export function Checker_newGetterFunctionType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_newFunctionType(receiver, GoSliceMake(0, 0, GoPointerValueOps<Type>()), undefined, GoSliceMake(0, 0, GoPointerValueOps<Symbol>()), t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.newSetterFunctionType","kind":"method","status":"implemented","sigHash":"c491ea31b5ca068cbf6f3c003368dd9eff53bdfe585d8a9cb8cf4bf11842eda7"}
 *
 * Go source:
 * func (c *Checker) newSetterFunctionType(t *Type) *Type {
 * 	valueParam := c.newParameter("value", t)
 * 	return c.newFunctionType(nil, nil /*thisParameter* /, []*ast.Symbol{valueParam}, c.voidType)
 * }
 */
export function Checker_newSetterFunctionType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const valueParam = Checker_newParameter(receiver, "value", t);
  return Checker_newFunctionType(receiver, GoSliceMake(0, 0, GoPointerValueOps<Type>()), undefined, GoSliceBuild(1, 1, GoPointerValueOps<Symbol>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, valueParam, GoPointerValueOps<Symbol>());
  }), receiver!.voidType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getParentTypeOfClassElement","kind":"method","status":"implemented","sigHash":"d44afad1dca79c29df9543e2a0cfaf47dfb4efa2241a9de5303f6125db0822c3"}
 *
 * Go source:
 * func (c *Checker) getParentTypeOfClassElement(node *ast.Node) *Type {
 * 	classSymbol := c.getSymbolOfNode(node.Parent)
 * 	if ast.IsStatic(node) {
 * 		return c.getTypeOfSymbol(classSymbol)
 * 	}
 * 	return c.getDeclaredTypeOfSymbol(classSymbol)
 * }
 */
export function Checker_getParentTypeOfClassElement(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  const classSymbol = Checker_getSymbolOfNode(receiver, node!.Parent);
  if (IsStatic(node)) {
    return Checker_getTypeOfSymbol(receiver, classSymbol);
  }
  return Checker_getDeclaredTypeOfSymbol(receiver, classSymbol);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getApparentTypeOfContextualType","kind":"method","status":"implemented","sigHash":"227e03c11bd6138a693dd329380b185733174698d8ecbbb794d6a1927afa5de6"}
 *
 * Go source:
 * func (c *Checker) getApparentTypeOfContextualType(node *ast.Node, contextFlags ContextFlags) *Type {
 * 	var contextualType *Type
 * 	if ast.IsObjectLiteralMethod(node) {
 * 		contextualType = c.getContextualTypeForObjectLiteralMethod(node, contextFlags)
 * 	} else {
 * 		contextualType = c.getContextualType(node, contextFlags)
 * 	}
 * 	instantiatedType := c.instantiateContextualType(contextualType, node, contextFlags)
 * 	if instantiatedType != nil && !(contextFlags&ContextFlagsNoConstraints != 0 && instantiatedType.flags&TypeFlagsTypeVariable != 0) {
 * 		apparentType := c.mapTypeEx(instantiatedType, func(t *Type) *Type {
 * 			if t.objectFlags&ObjectFlagsMapped != 0 {
 * 				return t
 * 			}
 * 			return c.getApparentType(t)
 * 		}, true)
 * 		switch {
 * 		case apparentType.flags&TypeFlagsUnion != 0 && ast.IsObjectLiteralExpression(node):
 * 			return c.discriminateContextualTypeByObjectMembers(node, apparentType)
 * 		case apparentType.flags&TypeFlagsUnion != 0 && ast.IsJsxAttributes(node):
 * 			return c.discriminateContextualTypeByJSXAttributes(node, apparentType)
 * 		default:
 * 			return apparentType
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getApparentTypeOfContextualType(receiver: GoPtr<Checker>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  const contextualType = IsObjectLiteralMethod(node)
    ? Checker_getContextualTypeForObjectLiteralMethod(receiver, node, contextFlags)
    : Checker_getContextualType(receiver, node, contextFlags);
  const instantiatedType = Checker_instantiateContextualType(receiver, contextualType, node, contextFlags);
  if (instantiatedType !== undefined && !((contextFlags & ContextFlagsNoConstraints) !== 0 && (instantiatedType!.flags & TypeFlagsTypeVariable) !== 0)) {
    const apparentType = Checker_mapTypeEx(receiver, instantiatedType, (type_: GoPtr<Type>): GoPtr<Type> => {
      if ((type_!.objectFlags & ObjectFlagsMapped) !== 0) {
        return type_;
      }
      return Checker_getApparentType(receiver, type_);
    }, true);
    if ((apparentType!.flags & TypeFlagsUnion) !== 0 && IsObjectLiteralExpression(node)) {
      return Checker_discriminateContextualTypeByObjectMembers(receiver, node, apparentType);
    }
    if ((apparentType!.flags & TypeFlagsUnion) !== 0 && IsJsxAttributes(node)) {
      return Checker_discriminateContextualTypeByJSXAttributes(receiver, node, apparentType);
    }
    return apparentType;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::ObjectLiteralDiscriminator.len","kind":"method","status":"implemented","sigHash":"38ade270e96cef24d6941228f47c9baee00b42d75016f2e1a5d0c6e4f060d09c"}
 *
 * Go source:
 * func (d *ObjectLiteralDiscriminator) len() int {
 * 	return len(d.props) + len(d.members)
 * }
 */
export function ObjectLiteralDiscriminator_len(receiver: GoPtr<ObjectLiteralDiscriminator>): int {
  return (receiver!.props.length + receiver!.members.length) as int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::ObjectLiteralDiscriminator.name","kind":"method","status":"implemented","sigHash":"c4c35026099311ce128480673914f6324ec96d10d2eb61f05a71cc4d53c3283c"}
 *
 * Go source:
 * func (d *ObjectLiteralDiscriminator) name(index int) string {
 * 	if index < len(d.props) {
 * 		return d.props[index].Symbol().Name
 * 	}
 * 	return d.members[index-len(d.props)].Name
 * }
 */
export function ObjectLiteralDiscriminator_name(receiver: GoPtr<ObjectLiteralDiscriminator>, index: int): string {
  if (index < receiver!.props.length) {
    return Node_Symbol(GoSliceLoad(receiver!.props, index, GoPointerValueOps<Node>()))!.Name;
  }
  return GoSliceLoad(receiver!.members, index - receiver!.props.length, GoPointerValueOps<Symbol>())!.Name;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::ObjectLiteralDiscriminator.matches","kind":"method","status":"implemented","sigHash":"9a1253817545d8410815bcf2be283f31d73d30e7e9e499c9a194ef069b80fb09"}
 *
 * Go source:
 * func (d *ObjectLiteralDiscriminator) matches(index int, t *Type) bool {
 * 	var propType *Type
 * 	if index < len(d.props) {
 * 		prop := d.props[index]
 * 		if ast.IsPropertyAssignment(prop) || ast.IsJsxAttribute(prop) {
 * 			initializer := prop.Initializer()
 * 			if initializer != nil {
 * 				propType = d.c.getContextFreeTypeOfExpression(prop.Initializer())
 * 			} else {
 * 				propType = d.c.trueType // JsxAttribute without initializer is always true
 * 			}
 * 		} else {
 * 			propType = d.c.getContextFreeTypeOfExpression(prop.Name())
 * 		}
 * 	} else {
 * 		propType = d.c.undefinedType
 * 	}
 * 	for _, s := range propType.Distributed() {
 * 		if d.c.isTypeAssignableTo(s, t) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function ObjectLiteralDiscriminator_matches(receiver: GoPtr<ObjectLiteralDiscriminator>, index: int, t: GoPtr<Type>): bool {
  let propType: GoPtr<Type>;
  if (index < receiver!.props.length) {
    const prop = GoSliceLoad(receiver!.props, index, GoPointerValueOps<Node>());
    if (IsPropertyAssignment(prop) || IsJsxAttribute(prop)) {
      const initializer = Node_Initializer(prop);
      if (initializer !== undefined) {
        propType = Checker_getContextFreeTypeOfExpression(receiver!.c, initializer);
      } else {
        propType = receiver!.c!.trueType;
      }
    } else {
      propType = Checker_getContextFreeTypeOfExpression(receiver!.c, Node_Name(prop));
    }
  } else {
    propType = receiver!.c!.undefinedType;
  }
  for (const s of Type_Distributed(propType)) {
    if (Checker_isTypeAssignableTo(receiver!.c, s, t)) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getMatchingUnionConstituentForObjectLiteral","kind":"method","status":"implemented","sigHash":"48d4b0d6eb730c31a8ff0e289d65be9aed4efc9fc7cb5fcf8269e9c3d00a1ad5"}
 *
 * Go source:
 * func (c *Checker) getMatchingUnionConstituentForObjectLiteral(unionType *Type, node *ast.Node) *Type {
 * 	keyPropertyName := c.getKeyPropertyName(unionType)
 * 	if keyPropertyName != "" {
 * 		propNode := core.Find(node.Properties(), func(p *ast.Node) bool {
 * 			return p.Symbol() != nil && ast.IsPropertyAssignment(p) && p.Symbol().Name == keyPropertyName && c.isPossiblyDiscriminantValue(p.Initializer())
 * 		})
 * 		if propNode != nil {
 * 			propType := c.getContextFreeTypeOfExpression(propNode.Initializer())
 * 			return c.getConstituentTypeForKeyType(unionType, propType)
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Checker_getMatchingUnionConstituentForObjectLiteral(receiver: GoPtr<Checker>, unionType: GoPtr<Type>, node: GoPtr<Node>): GoPtr<Type> {
  const keyPropertyName = Checker_getKeyPropertyName(receiver, unionType);
  if (keyPropertyName !== "") {
    const propNode = core.Find(
      Node_Properties(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()),
      (p: GoPtr<Node>): bool =>
        Node_Symbol(p) !== undefined &&
        IsPropertyAssignment(p) &&
        Node_Symbol(p)!.Name === keyPropertyName &&
        Checker_isPossiblyDiscriminantValue(receiver, Node_Initializer(p)),
      GoZeroPointer<Node>,
    );
    if (propNode !== undefined) {
      const propType = Checker_getContextFreeTypeOfExpression(receiver, Node_Initializer(propNode));
      return Checker_getConstituentTypeForKeyType(receiver, unionType, propType);
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateContextualType","kind":"method","status":"implemented","sigHash":"9752b2c92eb3dc0003972f4319c5d72b44e22f6e6ab7974db03d3eb97d950a94"}
 *
 * Go source:
 * func (c *Checker) instantiateContextualType(contextualType *Type, node *ast.Node, contextFlags ContextFlags) *Type {
 * 	if contextualType != nil && c.maybeTypeOfKind(contextualType, TypeFlagsInstantiable) {
 * 		inferenceContext := c.getInferenceContext(node)
 * 		// If no inferences have been made, and none of the type parameters for which we are inferring
 * 		// specify default types, nothing is gained from instantiating as type parameters would just be
 * 		// replaced with their constraints similar to the apparent type.
 * 		if inferenceContext != nil {
 * 			if contextFlags&ContextFlagsSignature != 0 && core.Some(inferenceContext.inferences, hasInferenceCandidatesOrDefault) {
 * 				// For contextual signatures we incorporate all inferences made so far, e.g. from return
 * 				// types as well as arguments to the left in a function call.
 * 				t := c.instantiateInstantiableTypes(contextualType, inferenceContext.nonFixingMapper)
 * 				if t.flags&TypeFlagsAnyOrUnknown == 0 {
 * 					return t
 * 				}
 * 			}
 * 			if inferenceContext.returnMapper != nil {
 * 				// For other purposes (e.g. determining whether to produce literal types) we only
 * 				// incorporate inferences made from the return type in a function call. We remove
 * 				// the 'boolean' type from the contextual type such that contextually typed boolean
 * 				// literals actually end up widening to 'boolean' (see #48363).
 * 				t := c.instantiateInstantiableTypes(contextualType, inferenceContext.returnMapper)
 * 				if t.flags&TypeFlagsAnyOrUnknown == 0 {
 * 					if t.flags&TypeFlagsUnion != 0 && containsType(t.Types(), c.regularFalseType) && containsType(t.Types(), c.regularTrueType) {
 * 						return c.filterType(t, func(t *Type) bool {
 * 							return t != c.regularFalseType && t != c.regularTrueType
 * 						})
 * 					}
 * 					return t
 * 				}
 * 			}
 * 		}
 * 	}
 * 	return contextualType
 * }
 */
export function Checker_instantiateContextualType(receiver: GoPtr<Checker>, contextualType: GoPtr<Type>, node: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  if (contextualType !== undefined && Checker_maybeTypeOfKind(receiver, contextualType, TypeFlagsInstantiable)) {
    const inferenceContext = Checker_getInferenceContext(receiver, node);
    if (inferenceContext !== undefined) {
      if ((contextFlags & ContextFlagsSignature) !== 0 && core.Some(inferenceContext!.inferences, hasInferenceCandidatesOrDefault)) {
        const instantiatedType = Checker_instantiateInstantiableTypes(receiver, contextualType, inferenceContext!.nonFixingMapper);
        if ((instantiatedType!.flags & TypeFlagsAnyOrUnknown) === 0) {
          return instantiatedType;
        }
      }
      if (inferenceContext!.returnMapper !== undefined) {
        const instantiatedType = Checker_instantiateInstantiableTypes(receiver, contextualType, inferenceContext!.returnMapper);
        if ((instantiatedType!.flags & TypeFlagsAnyOrUnknown) === 0) {
          if ((instantiatedType!.flags & TypeFlagsUnion) !== 0 &&
            containsType(Type_Types(instantiatedType), receiver!.regularFalseType) &&
            containsType(Type_Types(instantiatedType), receiver!.regularTrueType)) {
            return Checker_filterType(receiver, instantiatedType, (type_: GoPtr<Type>): bool =>
              (type_ !== receiver!.regularFalseType && type_ !== receiver!.regularTrueType) as bool);
          }
          return instantiatedType;
        }
      }
    }
  }
  return contextualType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.instantiateInstantiableTypes","kind":"method","status":"implemented","sigHash":"734030ae5f5d4eace9dbec54dae27a9362c76af4768b73e74b9ea141dde8fcb3"}
 *
 * Go source:
 * func (c *Checker) instantiateInstantiableTypes(t *Type, mapper *TypeMapper) *Type {
 * 	if t.flags&TypeFlagsInstantiable != 0 {
 * 		return c.instantiateType(t, mapper)
 * 	}
 * 	if t.flags&TypeFlagsUnion != 0 {
 * 		return c.getUnionTypeEx(core.Map(t.Types(), func(t *Type) *Type {
 * 			return c.instantiateInstantiableTypes(t, mapper)
 * 		}), UnionReductionNone, nil, nil)
 * 	}
 * 	if t.flags&TypeFlagsIntersection != 0 {
 * 		return c.getIntersectionType(core.Map(t.Types(), func(t *Type) *Type {
 * 			return c.instantiateInstantiableTypes(t, mapper)
 * 		}))
 * 	}
 * 	return t
 * }
 */
export function Checker_instantiateInstantiableTypes(receiver: GoPtr<Checker>, t: GoPtr<Type>, mapper: GoPtr<TypeMapper>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsInstantiable) !== 0) {
    return Checker_instantiateType(receiver, t, mapper);
  }
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    return Checker_getUnionTypeEx(receiver, core.Map(Type_Types(t), (ty: GoPtr<Type>): GoPtr<Type> => Checker_instantiateInstantiableTypes(receiver, ty, mapper)), UnionReductionNone, undefined, undefined);
  }
  if ((t!.flags & TypeFlagsIntersection) !== 0) {
    return Checker_getIntersectionType(receiver, core.Map(Type_Types(t), (ty: GoPtr<Type>): GoPtr<Type> => Checker_instantiateInstantiableTypes(receiver, ty, mapper)));
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.pushCachedContextualType","kind":"method","status":"implemented","sigHash":"ab52c92dee6e2354b45ffa943c51f06237bce08f0497ee5e1bf681fbd449846e"}
 *
 * Go source:
 * func (c *Checker) pushCachedContextualType(node *ast.Node) {
 * 	c.pushContextualType(node, c.getContextualType(node, ContextFlagsNone), true /*isCache* /)
 * }
 */
export function Checker_pushCachedContextualType(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Checker_pushContextualType(receiver, node, Checker_getContextualType(receiver, node, ContextFlagsNone), true);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.pushContextualType","kind":"method","status":"implemented","sigHash":"2a36dc8b28a09a9510d567839e83f8db7181b54d37972ae795ba10eeed2f5dd9"}
 *
 * Go source:
 * func (c *Checker) pushContextualType(node *ast.Node, t *Type, isCache bool) {
 * 	c.contextualInfos = append(c.contextualInfos, ContextualInfo{node, t, isCache})
 * }
 */
export function Checker_pushContextualType(receiver: GoPtr<Checker>, node: GoPtr<Node>, t: GoPtr<Type>, isCache: bool): void {
  receiver!.contextualInfos = GoAppend(receiver!.contextualInfos, { node, t, isCache });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.popContextualType","kind":"method","status":"implemented","sigHash":"830ab290a7ae37c520efea22b84d17c5abbf8fa0848788b0343fd4b002efcaf1"}
 *
 * Go source:
 * func (c *Checker) popContextualType() {
 * 	lastIndex := len(c.contextualInfos) - 1
 * 	c.contextualInfos[lastIndex] = ContextualInfo{}
 * 	c.contextualInfos = c.contextualInfos[:lastIndex]
 * }
 */
export function Checker_popContextualType(receiver: GoPtr<Checker>): void {
  const lastIndex = receiver!.contextualInfos!.length - 1;
  receiver!.contextualInfos![lastIndex] = {} as ContextualInfo;
  receiver!.contextualInfos = GoSlicePrefix(receiver!.contextualInfos, lastIndex);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFacts","kind":"method","status":"implemented","sigHash":"fea4018919e26a6b27479bb70b265c07b5d10976e38cc48b0634a61acc4c3e46"}
 *
 * Go source:
 * func (c *Checker) getTypeFacts(t *Type, mask TypeFacts) TypeFacts {
 * 	return c.getTypeFactsWorker(t, mask) & mask
 * }
 */
export function Checker_getTypeFacts(receiver: GoPtr<Checker>, t: GoPtr<Type>, mask: TypeFacts): TypeFacts {
  return Checker_getTypeFactsWorker(receiver, t, mask) & mask;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.hasTypeFacts","kind":"method","status":"implemented","sigHash":"53a843bc46e10d44b58379b053de10cde8de6103da3a18c9d6dbc3d0e8622cc8"}
 *
 * Go source:
 * func (c *Checker) hasTypeFacts(t *Type, mask TypeFacts) bool {
 * 	return c.getTypeFacts(t, mask) != 0
 * }
 */
export function Checker_hasTypeFacts(receiver: GoPtr<Checker>, t: GoPtr<Type>, mask: TypeFacts): bool {
  return Checker_getTypeFacts(receiver, t, mask) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeFactsWorker","kind":"method","status":"implemented","sigHash":"4472b7ed9be39c721cfe83d69b748e9bdf9cd8a0acfca6c10ba647bd71d9824f"}
 *
 * Go source:
 * func (c *Checker) getTypeFactsWorker(t *Type, callerOnlyNeeds TypeFacts) TypeFacts {
 * 	if t.flags&(TypeFlagsIntersection|TypeFlagsInstantiable) != 0 {
 * 		t = c.getBaseConstraintOfType(t)
 * 		if t == nil {
 * 			t = c.unknownType
 * 		}
 * 	}
 * 	flags := t.flags
 * 	switch {
 * 	case flags&(TypeFlagsString|TypeFlagsStringMapping) != 0:
 * 		if c.strictNullChecks {
 * 			return TypeFactsStringStrictFacts
 * 		}
 * 		return TypeFactsStringFacts
 * 	case flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral) != 0:
 * 		isEmpty := flags&TypeFlagsStringLiteral != 0 && getStringLiteralValue(t) == ""
 * 		if c.strictNullChecks {
 * 			if isEmpty {
 * 				return TypeFactsEmptyStringStrictFacts
 * 			}
 * 			return TypeFactsNonEmptyStringStrictFacts
 * 		}
 * 		if isEmpty {
 * 			return TypeFactsEmptyStringFacts
 * 		}
 * 		return TypeFactsNonEmptyStringFacts
 * 	case flags&(TypeFlagsNumber|TypeFlagsEnum) != 0:
 * 		if c.strictNullChecks {
 * 			return TypeFactsNumberStrictFacts
 * 		}
 * 		return TypeFactsNumberFacts
 * 	case flags&TypeFlagsNumberLiteral != 0:
 * 		isZero := getNumberLiteralValue(t) == 0
 * 		if c.strictNullChecks {
 * 			if isZero {
 * 				return TypeFactsZeroNumberStrictFacts
 * 			}
 * 			return TypeFactsNonZeroNumberStrictFacts
 * 		}
 * 		if isZero {
 * 			return TypeFactsZeroNumberFacts
 * 		}
 * 		return TypeFactsNonZeroNumberFacts
 * 	case flags&TypeFlagsBigInt != 0:
 * 		if c.strictNullChecks {
 * 			return TypeFactsBigIntStrictFacts
 * 		}
 * 		return TypeFactsBigIntFacts
 * 	case flags&TypeFlagsBigIntLiteral != 0:
 * 		isZero := isZeroBigInt(t)
 * 		if c.strictNullChecks {
 * 			if isZero {
 * 				return TypeFactsZeroBigIntStrictFacts
 * 			}
 * 			return TypeFactsNonZeroBigIntStrictFacts
 * 		}
 * 		if isZero {
 * 			return TypeFactsZeroBigIntFacts
 * 		}
 * 		return TypeFactsNonZeroBigIntFacts
 * 	case flags&TypeFlagsBoolean != 0:
 * 		if c.strictNullChecks {
 * 			return TypeFactsBooleanStrictFacts
 * 		}
 * 		return TypeFactsBooleanFacts
 * 	case flags&TypeFlagsBooleanLike != 0:
 * 		isFalse := t == c.falseType || t == c.regularFalseType
 * 		if c.strictNullChecks {
 * 			if isFalse {
 * 				return TypeFactsFalseStrictFacts
 * 			}
 * 			return TypeFactsTrueStrictFacts
 * 		}
 * 		if isFalse {
 * 			return TypeFactsFalseFacts
 * 		}
 * 		return TypeFactsTrueFacts
 * 	case flags&TypeFlagsObject != 0:
 * 		var possibleFacts TypeFacts
 * 		if c.strictNullChecks {
 * 			possibleFacts = TypeFactsEmptyObjectStrictFacts | TypeFactsFunctionStrictFacts | TypeFactsObjectStrictFacts
 * 		} else {
 * 			possibleFacts = TypeFactsEmptyObjectFacts | TypeFactsFunctionFacts | TypeFactsObjectFacts
 * 		}
 * 		if (callerOnlyNeeds & possibleFacts) == 0 {
 * 			// If the caller doesn't care about any of the facts that we could possibly produce,
 * 			// return zero so we can skip resolving members.
 * 			return TypeFactsNone
 * 		}
 * 		switch {
 * 		case t.objectFlags&ObjectFlagsAnonymous != 0 && c.isEmptyObjectType(t):
 * 			if c.strictNullChecks {
 * 				return TypeFactsEmptyObjectStrictFacts
 * 			}
 * 			return TypeFactsEmptyObjectFacts
 * 		case c.isFunctionObjectType(t):
 * 			if c.strictNullChecks {
 * 				return TypeFactsFunctionStrictFacts
 * 			}
 * 			return TypeFactsFunctionFacts
 * 		case c.strictNullChecks:
 * 			return TypeFactsObjectStrictFacts
 * 		}
 * 		return TypeFactsObjectFacts
 * 	case flags&TypeFlagsVoid != 0:
 * 		return TypeFactsVoidFacts
 * 	case flags&TypeFlagsUndefined != 0:
 * 		return TypeFactsUndefinedFacts
 * 	case flags&TypeFlagsNull != 0:
 * 		return TypeFactsNullFacts
 * 	case flags&TypeFlagsESSymbolLike != 0:
 * 		if c.strictNullChecks {
 * 			return TypeFactsSymbolStrictFacts
 * 		} else {
 * 			return TypeFactsSymbolFacts
 * 		}
 * 	case flags&TypeFlagsNonPrimitive != 0:
 * 		if c.strictNullChecks {
 * 			return TypeFactsObjectStrictFacts
 * 		} else {
 * 			return TypeFactsObjectFacts
 * 		}
 * 	case flags&TypeFlagsNever != 0:
 * 		return TypeFactsNone
 * 	case flags&TypeFlagsUnion != 0:
 * 		var facts TypeFacts
 * 		for _, t := range t.Types() {
 * 			facts |= c.getTypeFactsWorker(t, callerOnlyNeeds)
 * 		}
 * 		return facts
 * 	case flags&TypeFlagsIntersection != 0:
 * 		return c.getIntersectionTypeFacts(t, callerOnlyNeeds)
 * 	}
 * 	return TypeFactsUnknownFacts
 * }
 */
export function Checker_getTypeFactsWorker(receiver: GoPtr<Checker>, t: GoPtr<Type>, callerOnlyNeeds: TypeFacts): TypeFacts {
  if ((t!.flags & (TypeFlagsIntersection | TypeFlagsInstantiable)) !== 0) {
    t = Checker_getBaseConstraintOfType(receiver, t);
    if (t === undefined) {
      t = receiver!.unknownType;
    }
  }
  const flags = t!.flags;
  if ((flags & (TypeFlagsString | TypeFlagsStringMapping)) !== 0) {
    if (receiver!.strictNullChecks) {
      return TypeFactsStringStrictFacts;
    }
    return TypeFactsStringFacts;
  }
  if ((flags & (TypeFlagsStringLiteral | TypeFlagsTemplateLiteral)) !== 0) {
    const isEmpty = (flags & TypeFlagsStringLiteral) !== 0 && getStringLiteralValue(t) === "";
    if (receiver!.strictNullChecks) {
      if (isEmpty) {
        return TypeFactsEmptyStringStrictFacts;
      }
      return TypeFactsNonEmptyStringStrictFacts;
    }
    if (isEmpty) {
      return TypeFactsEmptyStringFacts;
    }
    return TypeFactsNonEmptyStringFacts;
  }
  if ((flags & (TypeFlagsNumber | TypeFlagsEnum)) !== 0) {
    if (receiver!.strictNullChecks) {
      return TypeFactsNumberStrictFacts;
    }
    return TypeFactsNumberFacts;
  }
  if ((flags & TypeFlagsNumberLiteral) !== 0) {
    const isZero = getNumberLiteralValue(t) === 0;
    if (receiver!.strictNullChecks) {
      if (isZero) {
        return TypeFactsZeroNumberStrictFacts;
      }
      return TypeFactsNonZeroNumberStrictFacts;
    }
    if (isZero) {
      return TypeFactsZeroNumberFacts;
    }
    return TypeFactsNonZeroNumberFacts;
  }
  if ((flags & TypeFlagsBigInt) !== 0) {
    if (receiver!.strictNullChecks) {
      return TypeFactsBigIntStrictFacts;
    }
    return TypeFactsBigIntFacts;
  }
  if ((flags & TypeFlagsBigIntLiteral) !== 0) {
    const isZero = isZeroBigInt(t);
    if (receiver!.strictNullChecks) {
      if (isZero) {
        return TypeFactsZeroBigIntStrictFacts;
      }
      return TypeFactsNonZeroBigIntStrictFacts;
    }
    if (isZero) {
      return TypeFactsZeroBigIntFacts;
    }
    return TypeFactsNonZeroBigIntFacts;
  }
  if ((flags & TypeFlagsBoolean) !== 0) {
    if (receiver!.strictNullChecks) {
      return TypeFactsBooleanStrictFacts;
    }
    return TypeFactsBooleanFacts;
  }
  if ((flags & TypeFlagsBooleanLike) !== 0) {
    const isFalse = t === receiver!.falseType || t === receiver!.regularFalseType;
    if (receiver!.strictNullChecks) {
      if (isFalse) {
        return TypeFactsFalseStrictFacts;
      }
      return TypeFactsTrueStrictFacts;
    }
    if (isFalse) {
      return TypeFactsFalseFacts;
    }
    return TypeFactsTrueFacts;
  }
  if ((flags & TypeFlagsObject) !== 0) {
    let possibleFacts: TypeFacts;
    if (receiver!.strictNullChecks) {
      possibleFacts = (TypeFactsEmptyObjectStrictFacts | TypeFactsFunctionStrictFacts | TypeFactsObjectStrictFacts) as TypeFacts;
    } else {
      possibleFacts = (TypeFactsEmptyObjectFacts | TypeFactsFunctionFacts | TypeFactsObjectFacts) as TypeFacts;
    }
    if ((callerOnlyNeeds & possibleFacts) === 0) {
      return TypeFactsNone;
    }
    if ((t!.objectFlags & ObjectFlagsAnonymous) !== 0 && Checker_isEmptyObjectType(receiver, t)) {
      if (receiver!.strictNullChecks) {
        return TypeFactsEmptyObjectStrictFacts;
      }
      return TypeFactsEmptyObjectFacts;
    }
    if (Checker_isFunctionObjectType(receiver, t)) {
      if (receiver!.strictNullChecks) {
        return TypeFactsFunctionStrictFacts;
      }
      return TypeFactsFunctionFacts;
    }
    if (receiver!.strictNullChecks) {
      return TypeFactsObjectStrictFacts;
    }
    return TypeFactsObjectFacts;
  }
  if ((flags & TypeFlagsVoid) !== 0) {
    return TypeFactsVoidFacts;
  }
  if ((flags & TypeFlagsUndefined) !== 0) {
    return TypeFactsUndefinedFacts;
  }
  if ((flags & TypeFlagsNull) !== 0) {
    return TypeFactsNullFacts;
  }
  if ((flags & TypeFlagsESSymbolLike) !== 0) {
    if (receiver!.strictNullChecks) {
      return TypeFactsSymbolStrictFacts;
    }
    return TypeFactsSymbolFacts;
  }
  if ((flags & TypeFlagsNonPrimitive) !== 0) {
    if (receiver!.strictNullChecks) {
      return TypeFactsObjectStrictFacts;
    }
    return TypeFactsObjectFacts;
  }
  if ((flags & TypeFlagsNever) !== 0) {
    return TypeFactsNone;
  }
  if ((flags & TypeFlagsUnion) !== 0) {
    let facts = TypeFactsNone;
    for (const ty of Type_Types(t)) {
      facts |= Checker_getTypeFactsWorker(receiver, ty, callerOnlyNeeds);
    }
    return facts;
  }
  if ((flags & TypeFlagsIntersection) !== 0) {
    return Checker_getIntersectionTypeFacts(receiver, t, callerOnlyNeeds);
  }
  return TypeFactsUnknownFacts;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getIntersectionTypeFacts","kind":"method","status":"implemented","sigHash":"063ccb202ea8487c296bc097f3231cefb515d3dd85ce38c3b957b97c9712480d"}
 *
 * Go source:
 * func (c *Checker) getIntersectionTypeFacts(t *Type, callerOnlyNeeds TypeFacts) TypeFacts {
 * 	// When an intersection contains a primitive type we ignore object type constituents as they are
 * 	// presumably type tags. For example, in string & { __kind__: "name" } we ignore the object type.
 * 	ignoreObjects := c.maybeTypeOfKind(t, TypeFlagsPrimitive)
 * 	// When computing the type facts of an intersection type, certain type facts are computed as `and`
 * 	// and others are computed as `or`.
 * 	oredFacts := TypeFactsNone
 * 	andedFacts := TypeFactsAll
 * 	for _, t := range t.Types() {
 * 		if !(ignoreObjects && t.flags&TypeFlagsObject != 0) {
 * 			f := c.getTypeFactsWorker(t, callerOnlyNeeds)
 * 			oredFacts |= f
 * 			andedFacts &= f
 * 		}
 * 	}
 * 	return oredFacts&TypeFactsOrFactsMask | andedFacts&TypeFactsAndFactsMask
 * }
 */
export function Checker_getIntersectionTypeFacts(receiver: GoPtr<Checker>, t: GoPtr<Type>, callerOnlyNeeds: TypeFacts): TypeFacts {
  const ignoreObjects = Checker_maybeTypeOfKind(receiver, t, TypeFlagsPrimitive);
  let oredFacts = TypeFactsNone;
  let andedFacts = TypeFactsAll;
  for (const ty of Type_Types(t)) {
    if (!(ignoreObjects && (ty!.flags & TypeFlagsObject) !== 0)) {
      const facts = Checker_getTypeFactsWorker(receiver, ty, callerOnlyNeeds);
      oredFacts |= facts;
      andedFacts &= facts;
    }
  }
  return (oredFacts & TypeFactsOrFactsMask) | (andedFacts & TypeFactsAndFactsMask);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isFunctionObjectType","kind":"method","status":"implemented","sigHash":"373a03e2fb80543914a42e47cade21564618200075b73ebb7ba4848ffc116d4b"}
 *
 * Go source:
 * func (c *Checker) isFunctionObjectType(t *Type) bool {
 * 	if t.objectFlags&ObjectFlagsEvolvingArray != 0 {
 * 		return false
 * 	}
 * 	// We do a quick check for a "bind" property before performing the more expensive subtype
 * 	// check. This gives us a quicker out in the common case where an object type is not a function.
 * 	resolved := c.resolveStructuredTypeMembers(t)
 * 	return len(resolved.signatures) != 0 || resolved.members["bind"] != nil && c.isTypeSubtypeOf(t, c.globalFunctionType)
 * }
 */
export function Checker_isFunctionObjectType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if ((t!.objectFlags & ObjectFlagsEvolvingArray) !== 0) {
    return false;
  }
  const resolved = Checker_resolveStructuredTypeMembers(receiver, t);
  return (resolved!.signatures.length !== 0 || (resolved!.members.get("bind") !== undefined && Checker_isTypeSubtypeOf(receiver, t, receiver!.globalFunctionType))) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeWithFacts","kind":"method","status":"implemented","sigHash":"f934389ef6bea370666c66484434cb0831536ad435825cf2b6f4486ea5e9b30c"}
 *
 * Go source:
 * func (c *Checker) getTypeWithFacts(t *Type, include TypeFacts) *Type {
 * 	return c.filterType(t, func(t *Type) bool {
 * 		return c.hasTypeFacts(t, include)
 * 	})
 * }
 */
export function Checker_getTypeWithFacts(receiver: GoPtr<Checker>, t: GoPtr<Type>, include: TypeFacts): GoPtr<Type> {
  return Checker_filterType(receiver, t, (ty: GoPtr<Type>): bool => Checker_hasTypeFacts(receiver, ty, include));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getAdjustedTypeWithFacts","kind":"method","status":"implemented","sigHash":"0ed1a576d7307334a49d9a19c439c502f4d91a20c26a46b880cecd873423f223"}
 *
 * Go source:
 * func (c *Checker) getAdjustedTypeWithFacts(t *Type, facts TypeFacts) *Type {
 * 	reduced := c.recombineUnknownType(c.getTypeWithFacts(core.IfElse(c.strictNullChecks && t.flags&TypeFlagsUnknown != 0, c.unknownUnionType, t), facts))
 * 	if c.strictNullChecks {
 * 		switch facts {
 * 		case TypeFactsNEUndefined:
 * 			return c.removeNullableByIntersection(reduced, TypeFactsEQUndefined, TypeFactsEQNull, TypeFactsIsNull, c.nullType)
 * 		case TypeFactsNENull:
 * 			return c.removeNullableByIntersection(reduced, TypeFactsEQNull, TypeFactsEQUndefined, TypeFactsIsUndefined, c.undefinedType)
 * 		case TypeFactsNEUndefinedOrNull, TypeFactsTruthy:
 * 			return c.mapType(reduced, func(t *Type) *Type {
 * 				if c.hasTypeFacts(t, TypeFactsEQUndefinedOrNull) {
 * 					return c.getGlobalNonNullableTypeInstantiation(t)
 * 				}
 * 				return t
 * 			})
 * 		}
 * 	}
 * 	return reduced
 * }
 */
export function Checker_getAdjustedTypeWithFacts(receiver: GoPtr<Checker>, t: GoPtr<Type>, facts: TypeFacts): GoPtr<Type> {
  const reduced = Checker_recombineUnknownType(receiver, Checker_getTypeWithFacts(receiver, receiver!.strictNullChecks && (t!.flags & TypeFlagsUnknown) !== 0 ? receiver!.unknownUnionType : t, facts));
  if (receiver!.strictNullChecks) {
    switch (facts) {
      case TypeFactsNEUndefined:
        return Checker_removeNullableByIntersection(receiver, reduced, TypeFactsEQUndefined, TypeFactsEQNull, TypeFactsIsNull, receiver!.nullType);
      case TypeFactsNENull:
        return Checker_removeNullableByIntersection(receiver, reduced, TypeFactsEQNull, TypeFactsEQUndefined, TypeFactsIsUndefined, receiver!.undefinedType);
      case TypeFactsNEUndefinedOrNull:
      case TypeFactsTruthy:
        return Checker_mapType(receiver, reduced, (mappedType: GoPtr<Type>): GoPtr<Type> => {
          if (Checker_hasTypeFacts(receiver, mappedType, TypeFactsEQUndefinedOrNull)) {
            return Checker_getGlobalNonNullableTypeInstantiation(receiver, mappedType);
          }
          return mappedType;
        });
    }
  }
  return reduced;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.removeNullableByIntersection","kind":"method","status":"implemented","sigHash":"4d1f3b12e7905ca15f77606b69139c8bf7d60e4362257e4a9565d9610161d9cd"}
 *
 * Go source:
 * func (c *Checker) removeNullableByIntersection(t *Type, targetFacts TypeFacts, otherFacts TypeFacts, otherIncludesFacts TypeFacts, otherType *Type) *Type {
 * 	facts := c.getTypeFacts(t, TypeFactsEQUndefined|TypeFactsEQNull|TypeFactsIsUndefined|TypeFactsIsNull)
 * 	// Simply return the type if it never compares equal to the target nullable.
 * 	if facts&targetFacts == 0 {
 * 		return t
 * 	}
 * 	// By default we intersect with a union of {} and the opposite nullable.
 * 	emptyAndOtherUnion := c.getUnionType([]*Type{c.emptyObjectType, otherType})
 * 	// For each constituent type that can compare equal to the target nullable, intersect with the above union
 * 	// if the type doesn't already include the opposite nullable and the constituent can compare equal to the
 * 	// opposite nullable; otherwise, just intersect with {}.
 * 	return c.mapType(t, func(t *Type) *Type {
 * 		if c.hasTypeFacts(t, targetFacts) {
 * 			if facts&otherIncludesFacts == 0 && c.hasTypeFacts(t, otherFacts) {
 * 				return c.getIntersectionType([]*Type{t, emptyAndOtherUnion})
 * 			}
 * 			return c.getIntersectionType([]*Type{t, c.emptyObjectType})
 * 		}
 * 		return t
 * 	})
 * }
 */
export function Checker_removeNullableByIntersection(receiver: GoPtr<Checker>, t: GoPtr<Type>, targetFacts: TypeFacts, otherFacts: TypeFacts, otherIncludesFacts: TypeFacts, otherType: GoPtr<Type>): GoPtr<Type> {
  const facts = Checker_getTypeFacts(receiver, t, (TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsIsUndefined | TypeFactsIsNull) as TypeFacts);
  if ((facts & targetFacts) === 0) {
    return t;
  }
  const emptyAndOtherUnion = Checker_getUnionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, receiver!.emptyObjectType, GoPointerValueOps<Type>());
    GoSliceStore(__goSliceLiteral, 1, otherType, GoPointerValueOps<Type>());
  }));
  return Checker_mapType(receiver, t, (mappedType: GoPtr<Type>): GoPtr<Type> => {
    if (Checker_hasTypeFacts(receiver, mappedType, targetFacts)) {
      if ((facts & otherIncludesFacts) === 0 && Checker_hasTypeFacts(receiver, mappedType, otherFacts)) {
        return Checker_getIntersectionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
          GoSliceStore(__goSliceLiteral, 0, mappedType, GoPointerValueOps<Type>());
          GoSliceStore(__goSliceLiteral, 1, emptyAndOtherUnion, GoPointerValueOps<Type>());
        }));
      }
      return Checker_getIntersectionType(receiver, GoSliceBuild(2, 2, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, mappedType, GoPointerValueOps<Type>());
        GoSliceStore(__goSliceLiteral, 1, receiver!.emptyObjectType, GoPointerValueOps<Type>());
      }));
    }
    return mappedType;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.recombineUnknownType","kind":"method","status":"implemented","sigHash":"1be14212a5e4895958b0a479aa15dd90b1fdacbdbf0e520587bde44e37d7f29f"}
 *
 * Go source:
 * func (c *Checker) recombineUnknownType(t *Type) *Type {
 * 	if t == c.unknownUnionType {
 * 		return c.unknownType
 * 	}
 * 	return t
 * }
 */
export function Checker_recombineUnknownType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (t === receiver!.unknownUnionType) {
    return receiver!.unknownType;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.convertAutoToAny","kind":"method","status":"implemented","sigHash":"71a90708aa3febc95d33831e1cbbd836385878db7e43731246cef9de27df7bbb"}
 *
 * Go source:
 * func (c *Checker) convertAutoToAny(t *Type) *Type {
 * 	switch {
 * 	case t == c.autoType:
 * 		return c.anyType
 * 	case t == c.autoArrayType:
 * 		return c.anyArrayType
 * 	}
 * 	return t
 * }
 */
export function Checker_convertAutoToAny(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (t === receiver!.autoType) {
    return receiver!.anyType;
  }
  if (t === receiver!.autoArrayType) {
    return receiver!.anyArrayType;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkAwaitedType","kind":"method","status":"implemented","sigHash":"1e800b79bf3270dee52dfe05d15b1d742a935a5097b66f27ece8462548e8b02f"}
 *
 * Go source:
 * func (c *Checker) checkAwaitedType(t *Type, withAlias bool, errorNode *ast.Node, diagnosticMessage *diagnostics.Message) *Type {
 * 	var awaitedType *Type
 * 	if withAlias {
 * 		awaitedType = c.getAwaitedTypeEx(t, errorNode, diagnosticMessage)
 * 	} else {
 * 		awaitedType = c.getAwaitedTypeNoAliasEx(t, errorNode, diagnosticMessage)
 * 	}
 * 	if awaitedType != nil {
 * 		return awaitedType
 * 	}
 * 	return c.errorType
 * }
 */
export function Checker_checkAwaitedType(receiver: GoPtr<Checker>, t: GoPtr<Type>, withAlias: bool, errorNode: GoPtr<Node>, diagnosticMessage: GoPtr<Message>): GoPtr<Type> {
  let awaitedType: GoPtr<Type>;
  if (withAlias) {
    awaitedType = Checker_getAwaitedTypeEx(receiver, t, errorNode, diagnosticMessage);
  } else {
    awaitedType = Checker_getAwaitedTypeNoAliasEx(receiver, t, errorNode, diagnosticMessage);
  }
  if (awaitedType !== undefined) {
    return awaitedType;
  }
  return receiver!.errorType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getAwaitedType","kind":"method","status":"implemented","sigHash":"51ea34900b8d6cf7b568dd6aaea3b04fab1084c35552a9af4131a609e8b93425"}
 *
 * Go source:
 * func (c *Checker) getAwaitedType(t *Type) *Type {
 * 	return c.getAwaitedTypeEx(t, nil, nil)
 * }
 */
export function Checker_getAwaitedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getAwaitedTypeEx(receiver, t, undefined, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getAwaitedTypeEx","kind":"method","status":"implemented","sigHash":"5dcb12777c48fcac89dda69222ed4841645deca11b4b1723bf9f068511e8d4f9"}
 *
 * Go source:
 * func (c *Checker) getAwaitedTypeEx(t *Type, errorNode *ast.Node, diagnosticMessage *diagnostics.Message, args ...any) *Type {
 * 	awaitedType := c.getAwaitedTypeNoAliasEx(t, errorNode, diagnosticMessage, args...)
 * 	if awaitedType != nil {
 * 		return c.createAwaitedTypeIfNeeded(awaitedType)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getAwaitedTypeEx(receiver: GoPtr<Checker>, t: GoPtr<Type>, errorNode: GoPtr<Node>, diagnosticMessage: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): GoPtr<Type> {
  const awaitedType = Checker_getAwaitedTypeNoAliasEx(receiver, t, errorNode, diagnosticMessage, ...args);
  if (awaitedType !== undefined) {
    return Checker_createAwaitedTypeIfNeeded(receiver, awaitedType);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isAwaitedTypeNeeded","kind":"method","status":"implemented","sigHash":"1c879a87a0d2d90adddcf4db28293b0f09f3676ce0d6f9d178e3bffc4db14b79"}
 *
 * Go source:
 * func (c *Checker) isAwaitedTypeNeeded(t *Type) bool {
 * 	// If this is already an `Awaited<T>`, we shouldn't wrap it. This helps to avoid `Awaited<Awaited<T>>` in higher-order.
 * 	if IsTypeAny(t) || c.isAwaitedTypeInstantiation(t) {
 * 		return false
 * 	}
 * 	// We only need `Awaited<T>` if `T` contains possibly non-primitive types.
 * 	if c.isGenericObjectType(t) {
 * 		baseConstraint := c.getBaseConstraintOfType(t)
 * 		// We only need `Awaited<T>` if `T` is a type variable that has no base constraint, or the base constraint of `T` is `any`, `unknown`, `{}`, `object`,
 * 		// or is promise-like.
 * 		if baseConstraint != nil {
 * 			return baseConstraint.flags&TypeFlagsAnyOrUnknown != 0 || c.isEmptyObjectType(baseConstraint) || someType(baseConstraint, c.isThenableType)
 * 		}
 * 		return c.maybeTypeOfKind(t, TypeFlagsTypeVariable)
 * 	}
 * 	return false
 * }
 */
export function Checker_isAwaitedTypeNeeded(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if (IsTypeAny(t) || Checker_isAwaitedTypeInstantiation(receiver, t)) {
    return false;
  }
  if (Checker_isGenericObjectType(receiver, t)) {
    const baseConstraint = Checker_getBaseConstraintOfType(receiver, t);
    if (baseConstraint !== undefined) {
      return ((baseConstraint!.flags & TypeFlagsAnyOrUnknown) !== 0 ||
        Checker_isEmptyObjectType(receiver, baseConstraint) ||
        someType(baseConstraint, (candidate: GoPtr<Type>): bool => Checker_isThenableType(receiver, candidate))) as bool;
    }
    return Checker_maybeTypeOfKind(receiver, t, TypeFlagsTypeVariable);
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.createAwaitedTypeIfNeeded","kind":"method","status":"implemented","sigHash":"323252971d79a54b60fe9fb69270a268b193f2fe55627f1f72fdbe01b1c1d2b2"}
 *
 * Go source:
 * func (c *Checker) createAwaitedTypeIfNeeded(t *Type) *Type {
 * 	// We wrap type `T` in `Awaited<T>` based on the following conditions:
 * 	// - `T` is not already an `Awaited<U>`, and
 * 	// - `T` is generic, and
 * 	// - One of the following applies:
 * 	//   - `T` has no base constraint, or
 * 	//   - The base constraint of `T` is `any`, `unknown`, `object`, or `{}`, or
 * 	//   - The base constraint of `T` is an object type with a callable `then` method.
 * 	if c.isAwaitedTypeNeeded(t) {
 * 		awaitedType := c.tryCreateAwaitedType(t)
 * 		if awaitedType != nil {
 * 			return awaitedType
 * 		}
 * 	}
 * 	return t
 * }
 */
export function Checker_createAwaitedTypeIfNeeded(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if (Checker_isAwaitedTypeNeeded(receiver, t)) {
    const awaitedType = Checker_tryCreateAwaitedType(receiver, t);
    if (awaitedType !== undefined) {
      return awaitedType;
    }
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.tryCreateAwaitedType","kind":"method","status":"implemented","sigHash":"53fe56ce1cfb0ca4be9b656c8ae96d8ae1695143770cb014aa541d06bda64fa8"}
 *
 * Go source:
 * func (c *Checker) tryCreateAwaitedType(t *Type) *Type {
 * 	// Nothing to do if `Awaited<T>` doesn't exist
 * 	awaitedSymbol := c.getGlobalAwaitedSymbol()
 * 	if awaitedSymbol != nil {
 * 		// Unwrap unions that may contain `Awaited<T>`, otherwise its possible to manufacture an `Awaited<Awaited<T> | U>` where
 * 		// an `Awaited<T | U>` would suffice.
 * 		return c.getTypeAliasInstantiation(awaitedSymbol, []*Type{c.unwrapAwaitedType(t)}, nil)
 * 	}
 * 	return nil
 * }
 */
export function Checker_tryCreateAwaitedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  const awaitedSymbol = receiver!.getGlobalAwaitedSymbol!();
  if (awaitedSymbol !== undefined) {
    return Checker_getTypeAliasInstantiation(receiver, awaitedSymbol, GoSliceBuild(1, 1, GoPointerValueOps<Type>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, Checker_unwrapAwaitedType(receiver, t), GoPointerValueOps<Type>());
    }), undefined);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.unwrapAwaitedType","kind":"method","status":"implemented","sigHash":"05a27bc739b02d213ffdb07ea171363ff77b5fe39938aacf7ada541d26f16df7"}
 *
 * Go source:
 * func (c *Checker) unwrapAwaitedType(t *Type) *Type {
 * 	switch {
 * 	case t.flags&TypeFlagsUnion != 0:
 * 		return c.mapType(t, c.unwrapAwaitedType)
 * 	case c.isAwaitedTypeInstantiation(t):
 * 		return t.alias.typeArguments[0]
 * 	}
 * 	return t
 * }
 */
export function Checker_unwrapAwaitedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsUnion) !== 0) {
    return Checker_mapType(receiver, t, (mapped: GoPtr<Type>) => Checker_unwrapAwaitedType(receiver, mapped));
  }
  if (Checker_isAwaitedTypeInstantiation(receiver, t)) {
    return GoSliceLoad(t!.alias!.typeArguments, 0, GoPointerValueOps<Type>());
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isThenableType","kind":"method","status":"implemented","sigHash":"4022ed50cefb36f682fb1db2f3c880f60c138620060a3d6b27e3c1504f048fbb"}
 *
 * Go source:
 * func (c *Checker) isThenableType(t *Type) bool {
 * 	if c.allTypesAssignableToKind(c.getBaseConstraintOrType(t), TypeFlagsPrimitive|TypeFlagsNever) {
 * 		// primitive types cannot be considered "thenable" since they are not objects.
 * 		return false
 * 	}
 * 	thenFunction := c.getTypeOfPropertyOfType(t, "then")
 * 	return thenFunction != nil && len(c.getSignaturesOfType(c.getTypeWithFacts(thenFunction, TypeFactsNEUndefinedOrNull), SignatureKindCall)) != 0
 * }
 */
export function Checker_isThenableType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  if (Checker_allTypesAssignableToKind(receiver, Checker_getBaseConstraintOrType(receiver, t), TypeFlagsPrimitive | TypeFlagsNever)) {
    return false;
  }
  const thenFunction = Checker_getTypeOfPropertyOfType(receiver, t, "then");
  return thenFunction !== undefined && Checker_getSignaturesOfType(receiver, Checker_getTypeWithFacts(receiver, thenFunction, TypeFactsNEUndefinedOrNull), SignatureKindCall).length !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getAwaitedTypeOfPromise","kind":"method","status":"implemented","sigHash":"aecf0530d75bc959842cc2455bbe857afbf34d9178db2481b1e3b0271ebfc2fd"}
 *
 * Go source:
 * func (c *Checker) getAwaitedTypeOfPromise(t *Type) *Type {
 * 	return c.getAwaitedTypeOfPromiseEx(t, nil, nil)
 * }
 */
export function Checker_getAwaitedTypeOfPromise(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getAwaitedTypeOfPromiseEx(receiver, t, undefined, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getAwaitedTypeOfPromiseEx","kind":"method","status":"implemented","sigHash":"7c1144352cb62f0f80f76e0c99636d2db7b1c544f0124da04576d2d54a53f016"}
 *
 * Go source:
 * func (c *Checker) getAwaitedTypeOfPromiseEx(t *Type, errorNode *ast.Node, diagnosticMessage *diagnostics.Message, args ...any) *Type {
 * 	promisedType := c.getPromisedTypeOfPromiseEx(t, errorNode, nil)
 * 	if promisedType != nil {
 * 		return c.getAwaitedTypeEx(promisedType, errorNode, diagnosticMessage, args...)
 * 	}
 * 	return nil
 * }
 */
export function Checker_getAwaitedTypeOfPromiseEx(receiver: GoPtr<Checker>, t: GoPtr<Type>, errorNode: GoPtr<Node>, diagnosticMessage: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): GoPtr<Type> {
  const promisedType = Checker_getPromisedTypeOfPromiseEx(receiver, t, errorNode, undefined);
  if (promisedType !== undefined) {
    return Checker_getAwaitedTypeEx(receiver, promisedType, errorNode, diagnosticMessage, ...args);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTargetType","kind":"method","status":"implemented","sigHash":"1ee1633ac9a2e51750d081e118d025248b4f51dd7a420067f50e76869dd8eb76"}
 *
 * Go source:
 * func (c *Checker) getTargetType(t *Type) *Type {
 * 	if t.objectFlags&ObjectFlagsReference != 0 {
 * 		return t.AsTypeReference().target
 * 	}
 * 	return t
 * }
 */
export function Checker_getTargetType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.objectFlags & ObjectFlagsReference) !== 0) {
    return Type_Target(t);
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.hasContextualTypeWithNoGenericTypes","kind":"method","status":"implemented","sigHash":"9b5b36f6a150570bff67461ad2b340ffedecb97caf4ad5af95f98bdb376cad1c"}
 *
 * Go source:
 * func (c *Checker) hasContextualTypeWithNoGenericTypes(node *ast.Node, checkMode CheckMode) bool {
 * 	// Computing the contextual type for a child of a JSX element involves resolving the type of the
 * 	// element's tag name, so we exclude that here to avoid circularities.
 * 	// If check mode has `CheckMode.RestBindingElement`, we skip binding pattern contextual types,
 * 	// as we want the type of a rest element to be generic when possible.
 * 	if (ast.IsIdentifier(node) || ast.IsPropertyAccessExpression(node) || ast.IsElementAccessExpression(node)) &&
 * 		!((ast.IsJsxOpeningElement(node.Parent) || ast.IsJsxSelfClosingElement(node.Parent)) && node.Parent.TagName() == node) {
 * 		contextualType := c.getContextualType(node, core.IfElse(checkMode&CheckModeRestBindingElement != 0, ContextFlagsSkipBindingPatterns, ContextFlagsNone))
 * 		if contextualType != nil {
 * 			return !c.isGenericType(contextualType)
 * 		}
 * 	}
 * 	return false
 * }
 */
export function Checker_hasContextualTypeWithNoGenericTypes(receiver: GoPtr<Checker>, node: GoPtr<Node>, checkMode: CheckMode): bool {
  if ((IsIdentifier(node) || IsPropertyAccessExpression(node) || IsElementAccessExpression(node)) &&
    !((IsJsxOpeningElement(node!.Parent) || IsJsxSelfClosingElement(node!.Parent)) && Node_TagName(node!.Parent) === node)) {
    const contextualType = Checker_getContextualType(receiver, node, (checkMode & CheckModeRestBindingElement) !== 0 ? ContextFlagsSkipBindingPatterns : ContextFlagsNone);
    if (contextualType !== undefined) {
      return !Checker_isGenericType(receiver, contextualType);
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getNonUndefinedType","kind":"method","status":"implemented","sigHash":"8d10c32e0a3d4bb754708ccea84fab2a0c8bc586528430d968f340f7166fda57"}
 *
 * Go source:
 * func (c *Checker) getNonUndefinedType(t *Type) *Type {
 * 	typeOrConstraint := t
 * 	if someType(t, c.isGenericTypeWithUndefinedConstraint) {
 * 		typeOrConstraint = c.mapType(t, func(t *Type) *Type {
 * 			if t.flags&TypeFlagsInstantiable != 0 {
 * 				return c.getBaseConstraintOrType(t)
 * 			}
 * 			return t
 * 		})
 * 	}
 * 	return c.getTypeWithFacts(typeOrConstraint, TypeFactsNEUndefined)
 * }
 */
export function Checker_getNonUndefinedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  let typeOrConstraint = t;
  if (someType(t, (ty) => Checker_isGenericTypeWithUndefinedConstraint(receiver, ty))) {
    typeOrConstraint = Checker_mapType(receiver, t, (ty) => {
      if ((ty!.flags & TypeFlagsInstantiable) !== 0) {
        return Checker_getBaseConstraintOrType(receiver, ty);
      }
      return ty;
    });
  }
  return Checker_getTypeWithFacts(receiver, typeOrConstraint, TypeFactsNEUndefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getActualTypeVariable","kind":"method","status":"implemented","sigHash":"84fc6f271e7610e8b6779f71f53e66f6083bb7728577237c151443a93ea1c543"}
 *
 * Go source:
 * func (c *Checker) getActualTypeVariable(t *Type) *Type {
 * 	if t.flags&TypeFlagsSubstitution != 0 {
 * 		return c.getActualTypeVariable(t.AsSubstitutionType().baseType)
 * 	}
 * 	if t.flags&TypeFlagsIndexedAccess != 0 && (t.AsIndexedAccessType().objectType.flags&TypeFlagsSubstitution != 0 || t.AsIndexedAccessType().indexType.flags&TypeFlagsSubstitution != 0) {
 * 		return c.getIndexedAccessType(c.getActualTypeVariable(t.AsIndexedAccessType().objectType), c.getActualTypeVariable(t.AsIndexedAccessType().indexType))
 * 	}
 * 	return t
 * }
 */
export function Checker_getActualTypeVariable(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  if ((t!.flags & TypeFlagsSubstitution) !== 0) {
    return Checker_getActualTypeVariable(receiver, SubstitutionType_BaseType(Type_AsSubstitutionType(t)));
  }
  if ((t!.flags & TypeFlagsIndexedAccess) !== 0 && ((IndexedAccessType_ObjectType(Type_AsIndexedAccessType(t))!.flags & TypeFlagsSubstitution) !== 0 || (IndexedAccessType_IndexType(Type_AsIndexedAccessType(t))!.flags & TypeFlagsSubstitution) !== 0)) {
    return Checker_getIndexedAccessType(receiver, Checker_getActualTypeVariable(receiver, IndexedAccessType_ObjectType(Type_AsIndexedAccessType(t))), Checker_getActualTypeVariable(receiver, IndexedAccessType_IndexType(Type_AsIndexedAccessType(t))));
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getTypeOfNode","kind":"method","status":"implemented","sigHash":"8e5d834a82cf2a52f1706e532d2d090adbd66a6d8ae93e46ab2e90c52d05d071"}
 *
 * Go source:
 * func (c *Checker) getTypeOfNode(node *ast.Node) *Type {
 * 	if ast.IsSourceFile(node) && !ast.IsExternalOrCommonJSModule(node.AsSourceFile()) {
 * 		return c.errorType
 * 	}
 * 
 * 	if node.Flags&ast.NodeFlagsInWithStatement != 0 {
 * 		// We cannot answer semantic questions within a with block, do not proceed any further
 * 		return c.errorType
 * 	}
 * 
 * 	classDecl, isImplements := ast.TryGetClassImplementingOrExtendingExpressionWithTypeArguments(node)
 * 	var classType *Type
 * 	if classDecl != nil {
 * 		classType = c.getDeclaredTypeOfClassOrInterface(c.getSymbolOfDeclaration(classDecl))
 * 	}
 * 
 * 	if ast.IsPartOfTypeNode(node) {
 * 		typeFromTypeNode := c.getTypeFromTypeNode(node)
 * 		if classType != nil {
 * 			return c.getTypeWithThisArgument(
 * 				typeFromTypeNode,
 * 				classType.AsInterfaceType().thisType,
 * 				false /*needApparentType* /)
 * 		}
 * 		return typeFromTypeNode
 * 	}
 * 
 * 	if ast.IsExpressionNode(node) {
 * 		return c.getRegularTypeOfExpression(node)
 * 	}
 * 
 * 	if classType != nil && !isImplements {
 * 		// A SyntaxKind.ExpressionWithTypeArguments is considered a type node, except when it occurs in the
 * 		// extends clause of a class. We handle that case here.
 * 		baseType := core.FirstOrNil(c.getBaseTypes(classType))
 * 		if baseType != nil {
 * 			return c.getTypeWithThisArgument(baseType, classType.AsInterfaceType().thisType, false /*needApparentType* /)
 * 		}
 * 		return c.errorType
 * 	}
 * 
 * 	if ast.IsTypeDeclaration(node) {
 * 		// In this case, we call getSymbolOfDeclaration instead of getSymbolAtLocation because it is a declaration
 * 		symbol := c.getSymbolOfDeclaration(node)
 * 		return c.getDeclaredTypeOfSymbol(symbol)
 * 	}
 * 
 * 	if ast.IsTypeDeclarationName(node) {
 * 		symbol := c.getSymbolAtLocation(node, false /*ignoreErrors* /)
 * 		if symbol != nil {
 * 			return c.getDeclaredTypeOfSymbol(symbol)
 * 		}
 * 		return c.errorType
 * 	}
 * 
 * 	if ast.IsBindingElement(node) {
 * 		t := c.getTypeForVariableLikeDeclaration(node, true /*includeOptionality* /, CheckModeNormal)
 * 		if t != nil {
 * 			return t
 * 		}
 * 		return c.errorType
 * 	}
 * 
 * 	if ast.IsDeclaration(node) {
 * 		// In this case, we call getSymbolOfDeclaration instead of getSymbolLAtocation because it is a declaration
 * 		symbol := c.getSymbolOfDeclaration(node)
 * 		if symbol != nil {
 * 			return c.getTypeOfSymbol(symbol)
 * 		}
 * 		return c.errorType
 * 	}
 * 
 * 	if ast.IsDeclarationNameOrImportPropertyName(node) {
 * 		symbol := c.getSymbolAtLocation(node, false /*ignoreErrors* /)
 * 		if symbol != nil {
 * 			return c.getTypeOfSymbol(symbol)
 * 		}
 * 		return c.errorType
 * 	}
 * 
 * 	if ast.IsBindingPattern(node) {
 * 		t := c.getTypeForVariableLikeDeclaration(node.Parent, true /*includeOptionality* /, CheckModeNormal)
 * 		if t != nil {
 * 			return t
 * 		}
 * 		return c.errorType
 * 	}
 * 
 * 	if isInRightSideOfImportOrExportAssignment(node) {
 * 		symbol := c.getSymbolAtLocation(node, false /*ignoreErrors* /)
 * 		if symbol != nil {
 * 			declaredType := c.getDeclaredTypeOfSymbol(symbol)
 * 			if !c.isErrorType(declaredType) {
 * 				return declaredType
 * 			}
 * 			return c.getTypeOfSymbol(symbol)
 * 		}
 * 	}
 * 
 * 	if ast.IsMetaProperty(node.Parent) && node.Parent.AsMetaProperty().KeywordToken == node.Kind {
 * 		return c.checkMetaPropertyKeyword(node.Parent)
 * 	}
 * 
 * 	if ast.IsImportAttributes(node) {
 * 		return c.getGlobalImportAttributesType()
 * 	}
 * 
 * 	return c.errorType
 * }
 */
export function Checker_getTypeOfNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  if (IsSourceFile(node) && !IsExternalOrCommonJSModule(AsSourceFile(node))) {
    return receiver!.errorType;
  }

  if ((node!.Flags & NodeFlagsInWithStatement) !== 0) {
    return receiver!.errorType;
  }

  const [classDecl, isImplements] = TryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
  let classType: GoPtr<Type>;
  if (classDecl !== undefined) {
    classType = Checker_getDeclaredTypeOfClassOrInterface(receiver, Checker_getSymbolOfDeclaration(receiver, classDecl));
  }

  if (IsPartOfTypeNode(node)) {
    const typeFromTypeNode = Checker_getTypeFromTypeNode(receiver, node);
    if (classType !== undefined) {
      return Checker_getTypeWithThisArgument(
        receiver,
        typeFromTypeNode,
        Type_AsInterfaceType(classType)!.thisType,
        false,
      );
    }
    return typeFromTypeNode;
  }

  if (IsExpressionNode(node)) {
    return Checker_getRegularTypeOfExpression(receiver, node);
  }

  if (classType !== undefined && !isImplements) {
    const baseType = core.FirstOrNil(Checker_getBaseTypes(receiver, classType), GoZeroPointer<Type>);
    if (baseType !== undefined) {
      return Checker_getTypeWithThisArgument(
        receiver,
        baseType,
        Type_AsInterfaceType(classType)!.thisType,
        false,
      );
    }
    return receiver!.errorType;
  }

  if (IsTypeDeclaration(node)) {
    const symbol_ = Checker_getSymbolOfDeclaration(receiver, node);
    return Checker_getDeclaredTypeOfSymbol(receiver, symbol_);
  }

  if (IsTypeDeclarationName(node)) {
    const symbol_ = Checker_getSymbolAtLocation(receiver, node, false);
    if (symbol_ !== undefined) {
      return Checker_getDeclaredTypeOfSymbol(receiver, symbol_);
    }
    return receiver!.errorType;
  }

  if (IsBindingElement(node)) {
    const t = Checker_getTypeForVariableLikeDeclaration(receiver, node, true, CheckModeNormal);
    if (t !== undefined) {
      return t;
    }
    return receiver!.errorType;
  }

  if (IsDeclaration(node)) {
    const symbol_ = Checker_getSymbolOfDeclaration(receiver, node);
    if (symbol_ !== undefined) {
      return Checker_getTypeOfSymbol(receiver, symbol_);
    }
    return receiver!.errorType;
  }

  if (IsDeclarationNameOrImportPropertyName(node)) {
    const symbol_ = Checker_getSymbolAtLocation(receiver, node, false);
    if (symbol_ !== undefined) {
      return Checker_getTypeOfSymbol(receiver, symbol_);
    }
    return receiver!.errorType;
  }

  if (IsBindingPattern(node)) {
    const t = Checker_getTypeForVariableLikeDeclaration(receiver, node!.Parent, true, CheckModeNormal);
    if (t !== undefined) {
      return t;
    }
    return receiver!.errorType;
  }

  if (isInRightSideOfImportOrExportAssignment(node)) {
    const symbol_ = Checker_getSymbolAtLocation(receiver, node, false);
    if (symbol_ !== undefined) {
      const declaredType = Checker_getDeclaredTypeOfSymbol(receiver, symbol_);
      if (!Checker_isErrorType(receiver, declaredType)) {
        return declaredType;
      }
      return Checker_getTypeOfSymbol(receiver, symbol_);
    }
  }

  if (IsMetaProperty(node!.Parent) && AsMetaProperty(node!.Parent)!.KeywordToken === node!.Kind) {
    return Checker_checkMetaPropertyKeyword(receiver, node!.Parent);
  }

  if (IsImportAttributes(node)) {
    return receiver!.getGlobalImportAttributesType!();
  }

  return receiver!.errorType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getRegularTypeOfExpression","kind":"method","status":"implemented","sigHash":"5b16250c938fb5ce84f477244c6b6ede5dacdfad25063cf84d09b7b0aca606b5"}
 *
 * Go source:
 * func (c *Checker) getRegularTypeOfExpression(expr *ast.Node) *Type {
 * 	if ast.IsRightSideOfQualifiedNameOrPropertyAccess(expr) {
 * 		expr = expr.Parent
 * 	}
 * 	return c.getRegularTypeOfLiteralType(c.getTypeOfExpression(expr))
 * }
 */
export function Checker_getRegularTypeOfExpression(receiver: GoPtr<Checker>, expr: GoPtr<Node>): GoPtr<Type> {
  if (IsRightSideOfQualifiedNameOrPropertyAccess(expr)) {
    expr = expr!.Parent;
  }
  return Checker_getRegularTypeOfLiteralType(receiver, Checker_getTypeOfExpression(receiver, expr));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.GetTypeAtLocation","kind":"method","status":"implemented","sigHash":"38fca0a1a67489e6c35a781abcdc99798032d5ca4c27545aca9e8314d0835adb"}
 *
 * Go source:
 * func (c *Checker) GetTypeAtLocation(node *ast.Node) *Type {
 * 	return c.getTypeOfNode(ast.GetReparsedNodeForNode(node))
 * }
 */
export function Checker_GetTypeAtLocation(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  return Checker_getTypeOfNode(receiver, GetReparsedNodeForNode(node));
}
