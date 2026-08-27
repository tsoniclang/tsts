import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { IntrinsicTypeKind, TypeFacts } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { FeatureMapEntry$Storage as FeatureMapEntry__from_checker$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/utilities.js";
import type { $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage, $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_$Storage } from "../../../../../../support/anonymous-structs.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int32, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { CacheHashKey, CachedTypeKindApparentType$constant, CachedTypeKindArrayLiteralType$constant, CachedTypeKindAwaitedType$constant, CachedTypeKindDecoratorContext$constant, CachedTypeKindDecoratorContextPrivate$constant, CachedTypeKindDecoratorContextPrivateStatic$constant, CachedTypeKindDecoratorContextStatic$constant, CachedTypeKindDefaultOnlyType$constant, CachedTypeKindEquivalentBaseType$constant, CachedTypeKindEvolvingArrayType$constant, CachedTypeKindIndexType$constant, CachedTypeKindIndexedAccessForReading$constant, CachedTypeKindIndexedAccessForWriting$constant, CachedTypeKindLiteralUnionBaseType$constant, CachedTypeKindPermissiveInstantiation$constant, CachedTypeKindPromisedTypeOfPromise$constant, CachedTypeKindRegularObjectLiteral$constant, CachedTypeKindRestrictiveInstantiation$constant, CachedTypeKindRestrictiveTypeParameter$constant, CachedTypeKindStringIndexType$constant, CachedTypeKindSyntheticType$constant, CachedTypeKindWidened$constant, CheckModeContextual$constant, CheckModeForceTuple$constant, CheckModeInferential$constant, CheckModeIsForSignatureHelp$constant, CheckModeNormal$constant, CheckModeRestBindingElement$constant, CheckModeSkipContextSensitive$constant, CheckModeSkipGenericFunctions$constant, CheckModeTypeOnly$constant, DeclarationMeaningGetAccessor$constant, DeclarationMeaningGetOrSetAccessor$constant, DeclarationMeaningMethod$constant, DeclarationMeaningPropertyAssignment$constant, DeclarationMeaningSetAccessor$constant, DeclarationSpacesExportNamespace$constant, DeclarationSpacesExportType$constant, DeclarationSpacesExportValue$constant, DeclarationSpacesNone$constant, InferenceFlagsAnyDefault$constant, InferenceFlagsNoDefault$constant, InferenceFlagsNone$constant, InferenceFlagsSkippedGenericFunction$constant, InferencePriorityAlwaysStrict$constant, InferencePriorityCircularity$constant, InferencePriorityContravariantConditional$constant, InferencePriorityHomomorphicMappedType$constant, InferencePriorityLiteralKeyof$constant, InferencePriorityMappedTypeConstraint$constant, InferencePriorityMaxValue$constant, InferencePriorityNakedTypeVariable$constant, InferencePriorityNoConstraints$constant, InferencePriorityNone$constant, InferencePriorityPartialHomomorphicMappedType$constant, InferencePriorityPriorityImpliesCombination$constant, InferencePriorityReturnType$constant, InferencePrioritySpeculativeTuple$constant, InferencePrioritySubstituteSource$constant, IntersectionFlagsNoConstraintReduction$constant, IntersectionFlagsNoSupertypeReduction$constant, IntersectionFlagsNone$constant, IntrinsicTypeKindCapitalize$constant, IntrinsicTypeKindLowercase$constant, IntrinsicTypeKindNoInfer$constant, IntrinsicTypeKindUncapitalize$constant, IntrinsicTypeKindUnknown$constant, IntrinsicTypeKindUppercase$constant, IterationTypeKindNext$constant, IterationTypeKindReturn$constant, IterationTypeKindYield$constant, IterationUseAllowsAsyncIterablesFlag$constant, IterationUseAllowsStringInputFlag$constant, IterationUseAllowsSyncIterablesFlag$constant, IterationUseAsyncGeneratorReturnType$constant, IterationUseAsyncYieldStar$constant, IterationUseCacheFlags$constant, IterationUseDestructuring$constant, IterationUseDestructuringFlag$constant, IterationUseElement$constant, IterationUseForAwaitOf$constant, IterationUseForOf$constant, IterationUseForOfFlag$constant, IterationUseGeneratorReturnType$constant, IterationUsePossiblyOutOfBounds$constant, IterationUseSpread$constant, IterationUseSpreadFlag$constant, IterationUseYieldStar$constant, IterationUseYieldStarFlag$constant, MappedTypeModifiersExcludeOptional$constant, MappedTypeModifiersExcludeReadonly$constant, MappedTypeModifiersIncludeOptional$constant, MappedTypeModifiersIncludeReadonly$constant, MappedTypeNameTypeKindFiltering$constant, MappedTypeNameTypeKindNone$constant, MappedTypeNameTypeKindRemapping$constant, PredicateSemanticsAlways$constant, PredicateSemanticsNever$constant, PredicateSemanticsSometimes$constant, ReferenceHintDecorator$constant, ReferenceHintExportAssignment$constant, ReferenceHintExportImportEquals$constant, ReferenceHintExportSpecifier$constant, ReferenceHintIdentifier$constant, ReferenceHintJsx$constant, ReferenceHintProperty$constant, ReferenceHintUnspecified$constant, TypeFactsAll$constant, TypeFactsAllTypeofNE$constant, TypeFactsAndFactsMask$constant, TypeFactsBigIntFacts$constant, TypeFactsBigIntStrictFacts$constant, TypeFactsBooleanFacts$constant, TypeFactsBooleanStrictFacts$constant, TypeFactsEQNull$constant, TypeFactsEQUndefined$constant, TypeFactsEQUndefinedOrNull$constant, TypeFactsEmptyObjectFacts$constant, TypeFactsEmptyObjectStrictFacts$constant, TypeFactsEmptyStringFacts$constant, TypeFactsEmptyStringStrictFacts$constant, TypeFactsFalseFacts$constant, TypeFactsFalseStrictFacts$constant, TypeFactsFalsy$constant, TypeFactsFunctionFacts$constant, TypeFactsFunctionStrictFacts$constant, TypeFactsIsNull$constant, TypeFactsIsUndefined$constant, TypeFactsIsUndefinedOrNull$constant, TypeFactsNENull$constant, TypeFactsNEUndefined$constant, TypeFactsNEUndefinedOrNull$constant, TypeFactsNonEmptyStringFacts$constant, TypeFactsNonEmptyStringStrictFacts$constant, TypeFactsNonZeroBigIntFacts$constant, TypeFactsNonZeroBigIntStrictFacts$constant, TypeFactsNonZeroNumberFacts$constant, TypeFactsNonZeroNumberStrictFacts$constant, TypeFactsNone$constant, TypeFactsNullFacts$constant, TypeFactsNumberFacts$constant, TypeFactsNumberStrictFacts$constant, TypeFactsObjectFacts$constant, TypeFactsObjectStrictFacts$constant, TypeFactsOrFactsMask$constant, TypeFactsStringFacts$constant, TypeFactsStringStrictFacts$constant, TypeFactsSymbolFacts$constant, TypeFactsSymbolStrictFacts$constant, TypeFactsTrueFacts$constant, TypeFactsTrueStrictFacts$constant, TypeFactsTruthy$constant, TypeFactsTypeofEQBigInt$constant, TypeFactsTypeofEQBoolean$constant, TypeFactsTypeofEQFunction$constant, TypeFactsTypeofEQHostObject$constant, TypeFactsTypeofEQNumber$constant, TypeFactsTypeofEQObject$constant, TypeFactsTypeofEQString$constant, TypeFactsTypeofEQSymbol$constant, TypeFactsTypeofNEBigInt$constant, TypeFactsTypeofNEBoolean$constant, TypeFactsTypeofNEFunction$constant, TypeFactsTypeofNEHostObject$constant, TypeFactsTypeofNENumber$constant, TypeFactsTypeofNEObject$constant, TypeFactsTypeofNEString$constant, TypeFactsTypeofNESymbol$constant, TypeFactsUndefinedFacts$constant, TypeFactsUnknownFacts$constant, TypeFactsVoidFacts$constant, TypeFactsZeroBigIntFacts$constant, TypeFactsZeroBigIntStrictFacts$constant, TypeFactsZeroNumberFacts$constant, TypeFactsZeroNumberStrictFacts$constant, TypeSystemPropertyNameAliasTarget$constant, TypeSystemPropertyNameDeclaredType$constant, TypeSystemPropertyNameInitializerIsUndefined$constant, TypeSystemPropertyNameResolvedBaseConstraint$constant, TypeSystemPropertyNameResolvedBaseConstructorType$constant, TypeSystemPropertyNameResolvedBaseTypes$constant, TypeSystemPropertyNameResolvedReturnType$constant, TypeSystemPropertyNameResolvedTypeArguments$constant, TypeSystemPropertyNameType$constant, TypeSystemPropertyNameWriteType$constant, UnionReductionLiteral$constant, UnionReductionNone$constant, UnionReductionSubtype$constant, UnusedKindLocal$constant, UnusedKindParameter$constant, WideningKindFunctionReturn$constant, WideningKindGeneratorNext$constant, WideningKindGeneratorYield$constant, WideningKindNormal$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import { JsxFlagsIntrinsicIndexedElement$constant, JsxFlagsIntrinsicNamedElement$constant, JsxReferenceKindComponent$constant, JsxReferenceKindFunction$constant, JsxReferenceKindMixed$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/jsx.js";
import { TypeMapperKindArray$constant, TypeMapperKindMerged$constant, TypeMapperKindSimple$constant, TypeMapperKindUnknown$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/mapper.js";
import { ExpandingFlagsBoth$constant, ExpandingFlagsSource$constant, ExpandingFlagsTarget$constant, IntersectionStateNone$constant, IntersectionStateSource$constant, IntersectionStateTarget$constant, MinArgumentCountFlagsNone$constant, MinArgumentCountFlagsStrongArityForUntypedJS$constant, MinArgumentCountFlagsVoidIsNonOptional$constant, RecursionFlagsBoth$constant, RecursionFlagsSource$constant, RecursionFlagsTarget$constant, RelationComparisonResultComplexityOverflow$constant, RelationComparisonResultFailed$constant, RelationComparisonResultNone$constant, RelationComparisonResultOverflow$constant, RelationComparisonResultReportsUnmeasurable$constant, RelationComparisonResultReportsUnreliable$constant, RelationComparisonResultStackDepthOverflow$constant, RelationComparisonResultSucceeded$constant, SignatureCheckModeBivariantCallback$constant, SignatureCheckModeCallback$constant, SignatureCheckModeIgnoreReturnTypes$constant, SignatureCheckModeNone$constant, SignatureCheckModeStrictArity$constant, SignatureCheckModeStrictCallback$constant, SignatureCheckModeStrictTopSignature$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/relater.js";
import { AccessFlagsAllowMissing$constant, AccessFlagsCacheSymbol$constant, AccessFlagsContextual$constant, AccessFlagsExpressionPosition$constant, AccessFlagsIncludeUndefined$constant, AccessFlagsNoIndexSignatures$constant, AccessFlagsNone$constant, AccessFlagsPersistent$constant, AccessFlagsReportDeprecated$constant, AccessFlagsSuppressNoImplicitAnyError$constant, AccessFlagsWriting$constant, ContextFlagsIgnoreNodeInferences$constant, ContextFlagsNoConstraints$constant, ContextFlagsNone$constant, ContextFlagsSignature$constant, ContextFlagsSkipBindingPatterns$constant, ElementFlagsFixed$constant, ElementFlagsNonRequired$constant, ElementFlagsNonRest$constant, ElementFlagsNone$constant, ElementFlagsOptional$constant, ElementFlagsRequired$constant, ElementFlagsRest$constant, ElementFlagsVariable$constant, ElementFlagsVariadic$constant, ExhaustiveStateComputing$constant, ExhaustiveStateFalse$constant, ExhaustiveStateTrue$constant, ExhaustiveStateUnknown$constant, ExternalEmitHelpersAddDisposableResourceAndDisposeResources$constant, ExternalEmitHelpersAsyncDelegator$constant, ExternalEmitHelpersAsyncDelegatorIncludes$constant, ExternalEmitHelpersAsyncGenerator$constant, ExternalEmitHelpersAsyncGeneratorIncludes$constant, ExternalEmitHelpersAsyncValues$constant, ExternalEmitHelpersAwait$constant, ExternalEmitHelpersAwaiter$constant, ExternalEmitHelpersClassPrivateFieldGet$constant, ExternalEmitHelpersClassPrivateFieldIn$constant, ExternalEmitHelpersClassPrivateFieldSet$constant, ExternalEmitHelpersDecorate$constant, ExternalEmitHelpersESDecorateAndRunInitializers$constant, ExternalEmitHelpersExportStar$constant, ExternalEmitHelpersFirstEmitHelper$constant, ExternalEmitHelpersForAwaitOfIncludes$constant, ExternalEmitHelpersImportDefault$constant, ExternalEmitHelpersImportStar$constant, ExternalEmitHelpersLastEmitHelper$constant, ExternalEmitHelpersMakeTemplateObject$constant, ExternalEmitHelpersMetadata$constant, ExternalEmitHelpersParam$constant, ExternalEmitHelpersPropKey$constant, ExternalEmitHelpersRest$constant, ExternalEmitHelpersRewriteRelativeImportExtension$constant, ExternalEmitHelpersSetFunctionName$constant, IndexFlagsNoIndexSignatures$constant, IndexFlagsNoReducibleCheck$constant, IndexFlagsNone$constant, IndexFlagsStringsOnly$constant, LanguageFeatureMinimumTargetMap, MembersOrExportsResolutionKindResolvedExports$constant, MembersOrExportsResolutionKindResolvedMembers$constant, NodeCheckFlagsAssignmentsMarked$constant, NodeCheckFlagsContainsClassWithPrivateIdentifiers$constant, NodeCheckFlagsContainsSuperPropertyInStaticInitializer$constant, NodeCheckFlagsContextChecked$constant, NodeCheckFlagsEnumValuesComputed$constant, NodeCheckFlagsInCheckIdentifier$constant, NodeCheckFlagsInitializerIsUndefined$constant, NodeCheckFlagsInitializerIsUndefinedComputed$constant, NodeCheckFlagsTypeChecked$constant, ObjectFlagsAnonymous$constant, ObjectFlagsClass$constant, ObjectFlagsClassOrInterface$constant, ObjectFlagsContainsObjectOrArrayLiteral$constant, ObjectFlagsContainsWideningType$constant, ObjectFlagsCouldContainTypeVariables$constant, ObjectFlagsCouldContainTypeVariablesComputed$constant, ObjectFlagsEvolvingArray$constant, ObjectFlagsFreshLiteral$constant, ObjectFlagsInstantiated$constant, ObjectFlagsInstantiatedMapped$constant, ObjectFlagsInterface$constant, ObjectFlagsJSLiteral$constant, ObjectFlagsJsxAttributes$constant, ObjectFlagsMapped$constant, ObjectFlagsMembersResolved$constant, ObjectFlagsNonInferrableType$constant, ObjectFlagsNone$constant, ObjectFlagsObjectLiteral$constant, ObjectFlagsObjectLiteralPatternWithComputedProperties$constant, ObjectFlagsObjectTypeKindMask$constant, ObjectFlagsPrimitiveUnion$constant, ObjectFlagsPropagatingFlags$constant, ObjectFlagsReference$constant, ObjectFlagsRequiresWidening$constant, ObjectFlagsReverseMapped$constant, ObjectFlagsTuple$constant, SignatureFlagsAbstract$constant, SignatureFlagsCallChainFlags$constant, SignatureFlagsConstruct$constant, SignatureFlagsHasLiteralTypes$constant, SignatureFlagsHasRestParameter$constant, SignatureFlagsIsInnerCallChain$constant, SignatureFlagsIsNonInferrable$constant, SignatureFlagsIsOuterCallChain$constant, SignatureFlagsIsSignatureCandidateForOverloadFailure$constant, SignatureFlagsIsUntypedSignatureInJSFile$constant, SignatureFlagsNone$constant, SignatureFlagsPropagatingFlags$constant, SignatureKindCall$constant, SignatureKindConstruct$constant, SymbolFormatFlagsAllowAnyNodeKind$constant, SymbolFormatFlagsDoNotIncludeSymbolChain$constant, SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope$constant, SymbolFormatFlagsUseOnlyExternalAliasing$constant, SymbolFormatFlagsWriteComputedProps$constant, SymbolFormatFlagsWriteTypeParametersOrArguments$constant, TernaryFalse$constant, TernaryMaybe$constant, TernaryTrue$constant, TernaryUnknown$constant, TypeFlagsAny$constant, TypeFlagsAnyOrUnknown$constant, TypeFlagsBigInt$constant, TypeFlagsBigIntLike$constant, TypeFlagsBigIntLiteral$constant, TypeFlagsBoolean$constant, TypeFlagsBooleanLike$constant, TypeFlagsBooleanLiteral$constant, TypeFlagsConditional$constant, TypeFlagsDefinitelyNonNullable$constant, TypeFlagsDisjointDomains$constant, TypeFlagsESSymbol$constant, TypeFlagsESSymbolLike$constant, TypeFlagsEnum$constant, TypeFlagsEnumLike$constant, TypeFlagsEnumLiteral$constant, TypeFlagsFreshable$constant, TypeFlagsIncludesConstrainedTypeVariable$constant, TypeFlagsIncludesEmptyObject$constant, TypeFlagsIncludesError$constant, TypeFlagsIncludesInstantiable$constant, TypeFlagsIncludesMask$constant, TypeFlagsIncludesMissingType$constant, TypeFlagsIncludesNonWideningType$constant, TypeFlagsIncludesWildcard$constant, TypeFlagsIndex$constant, TypeFlagsIndexedAccess$constant, TypeFlagsInstantiable$constant, TypeFlagsInstantiableNonPrimitive$constant, TypeFlagsIntersection$constant, TypeFlagsIntrinsic$constant, TypeFlagsLiteral$constant, TypeFlagsNever$constant, TypeFlagsNonPrimitive$constant, TypeFlagsNone$constant, TypeFlagsNotPrimitiveUnion$constant, TypeFlagsNull$constant, TypeFlagsNullable$constant, TypeFlagsNumber$constant, TypeFlagsNumberLike$constant, TypeFlagsNumberLiteral$constant, TypeFlagsObject$constant, TypeFlagsObjectFlagsType$constant, TypeFlagsPrimitive$constant, TypeFlagsSimplifiable$constant, TypeFlagsSingleton$constant, TypeFlagsString$constant, TypeFlagsStringLike$constant, TypeFlagsStringLiteral$constant, TypeFlagsStringMapping$constant, TypeFlagsStringOrNumberLiteral$constant, TypeFlagsStringOrNumberLiteralOrUnique$constant, TypeFlagsStructuredOrInstantiable$constant, TypeFlagsStructuredType$constant, TypeFlagsSubstitution$constant, TypeFlagsTemplateLiteral$constant, TypeFlagsTypeParameter$constant, TypeFlagsTypeVariable$constant, TypeFlagsUndefined$constant, TypeFlagsUnion$constant, TypeFlagsUnionOrIntersection$constant, TypeFlagsUniqueESSymbol$constant, TypeFlagsUnit$constant, TypeFlagsUnknown$constant, TypeFlagsVoid$constant, TypeFlagsVoidLike$constant, TypeFormatFlagsMultilineObjectLiterals$constant, TypeFormatFlagsNoTruncation$constant, TypeFormatFlagsNoTypeReduction$constant, TypeFormatFlagsNodeBuilderFlagsMask$constant, TypeFormatFlagsNone$constant, TypeFormatFlagsUseAliasDefinedOutsideCurrentScope$constant, TypeFormatFlagsUseFullyQualifiedType$constant, TypeFormatFlagsWriteArrayAsGenericType$constant, TypeFormatFlagsWriteArrowStyleSignature$constant, TypeFormatFlagsWriteCallStyleSignature$constant, TypePredicateKindAssertsIdentifier$constant, TypePredicateKindAssertsThis$constant, TypePredicateKindIdentifier$constant, TypePredicateKindThis$constant, VarianceFlagsAllowsStructuralFallback$constant, VarianceFlagsBivariant$constant, VarianceFlagsContravariant$constant, VarianceFlagsCovariant$constant, VarianceFlagsIndependent$constant, VarianceFlagsInvariant$constant, VarianceFlagsUnmeasurable$constant, VarianceFlagsUnreliable$constant, VarianceFlagsVarianceMask$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import { AssignmentKindCompound$constant, AssignmentKindDefinite$constant, AssignmentKindNone$constant, FeatureMapEntry } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/utilities.js";
import { $goStruct$Struct_Field_Fragment_string_Tag__empty_, $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_, $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_ } from "../../../../../../support/anonymous-structs.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_string_To_SliceOf_Named_checker$FeatureMapEntry, $goMap$MapOf_string_To_Struct_void } from "../../../../../../support/maps.js";
import { HashString128 as HashString128__from_xxh3, Uint128 as Uint128__from_xxh3 } from "../../../../zeebo/xxh3@v1.1.0/_root/package.js";
import { Symbol as Symbol__from_ast } from "../ast/package.js";
import { ScriptTargetES2016$constant as ScriptTargetES2016$constant__from_core, ScriptTargetES2017$constant as ScriptTargetES2017$constant__from_core, ScriptTargetES2018$constant as ScriptTargetES2018$constant__from_core, ScriptTargetES2019$constant as ScriptTargetES2019$constant__from_core, ScriptTargetES2020$constant as ScriptTargetES2020$constant__from_core, ScriptTargetES2021$constant as ScriptTargetES2021$constant__from_core, ScriptTargetES2022$constant as ScriptTargetES2022$constant__from_core, ScriptTargetESNext$constant as ScriptTargetESNext$constant__from_core } from "../core/package.js";
import { $state } from "./state.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoArray, goArrayAllocate } from "@gotots/runtime/array.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function $initialize(): void {
    AccessFlagsAllowMissing = AccessFlagsAllowMissing$constant();
    AccessFlagsCacheSymbol = AccessFlagsCacheSymbol$constant();
    AccessFlagsContextual = AccessFlagsContextual$constant();
    AccessFlagsExpressionPosition = AccessFlagsExpressionPosition$constant();
    AccessFlagsIncludeUndefined = AccessFlagsIncludeUndefined$constant();
    AccessFlagsNoIndexSignatures = AccessFlagsNoIndexSignatures$constant();
    AccessFlagsNone = AccessFlagsNone$constant();
    AccessFlagsPersistent = AccessFlagsPersistent$constant();
    AccessFlagsReportDeprecated = AccessFlagsReportDeprecated$constant();
    AccessFlagsSuppressNoImplicitAnyError = AccessFlagsSuppressNoImplicitAnyError$constant();
    AccessFlagsWriting = AccessFlagsWriting$constant();
    AssignmentKindCompound = AssignmentKindCompound$constant();
    AssignmentKindDefinite = AssignmentKindDefinite$constant();
    AssignmentKindNone = AssignmentKindNone$constant();
    CachedTypeKindApparentType = CachedTypeKindApparentType$constant();
    CachedTypeKindArrayLiteralType = CachedTypeKindArrayLiteralType$constant();
    CachedTypeKindAwaitedType = CachedTypeKindAwaitedType$constant();
    CachedTypeKindDecoratorContext = CachedTypeKindDecoratorContext$constant();
    CachedTypeKindDecoratorContextPrivate = CachedTypeKindDecoratorContextPrivate$constant();
    CachedTypeKindDecoratorContextPrivateStatic = CachedTypeKindDecoratorContextPrivateStatic$constant();
    CachedTypeKindDecoratorContextStatic = CachedTypeKindDecoratorContextStatic$constant();
    CachedTypeKindDefaultOnlyType = CachedTypeKindDefaultOnlyType$constant();
    CachedTypeKindEquivalentBaseType = CachedTypeKindEquivalentBaseType$constant();
    CachedTypeKindEvolvingArrayType = CachedTypeKindEvolvingArrayType$constant();
    CachedTypeKindIndexType = CachedTypeKindIndexType$constant();
    CachedTypeKindIndexedAccessForReading = CachedTypeKindIndexedAccessForReading$constant();
    CachedTypeKindIndexedAccessForWriting = CachedTypeKindIndexedAccessForWriting$constant();
    CachedTypeKindLiteralUnionBaseType = CachedTypeKindLiteralUnionBaseType$constant();
    CachedTypeKindPermissiveInstantiation = CachedTypeKindPermissiveInstantiation$constant();
    CachedTypeKindPromisedTypeOfPromise = CachedTypeKindPromisedTypeOfPromise$constant();
    CachedTypeKindRegularObjectLiteral = CachedTypeKindRegularObjectLiteral$constant();
    CachedTypeKindRestrictiveInstantiation = CachedTypeKindRestrictiveInstantiation$constant();
    CachedTypeKindRestrictiveTypeParameter = CachedTypeKindRestrictiveTypeParameter$constant();
    CachedTypeKindStringIndexType = CachedTypeKindStringIndexType$constant();
    CachedTypeKindSyntheticType = CachedTypeKindSyntheticType$constant();
    CachedTypeKindWidened = CachedTypeKindWidened$constant();
    CheckModeContextual = CheckModeContextual$constant();
    CheckModeForceTuple = CheckModeForceTuple$constant();
    CheckModeInferential = CheckModeInferential$constant();
    CheckModeIsForSignatureHelp = CheckModeIsForSignatureHelp$constant();
    CheckModeNormal = CheckModeNormal$constant();
    CheckModeRestBindingElement = CheckModeRestBindingElement$constant();
    CheckModeSkipContextSensitive = CheckModeSkipContextSensitive$constant();
    CheckModeSkipGenericFunctions = CheckModeSkipGenericFunctions$constant();
    CheckModeTypeOnly = CheckModeTypeOnly$constant();
    ContextFlagsIgnoreNodeInferences = ContextFlagsIgnoreNodeInferences$constant();
    ContextFlagsNoConstraints = ContextFlagsNoConstraints$constant();
    ContextFlagsNone = ContextFlagsNone$constant();
    ContextFlagsSignature = ContextFlagsSignature$constant();
    ContextFlagsSkipBindingPatterns = ContextFlagsSkipBindingPatterns$constant();
    DeclarationMeaningGetAccessor = DeclarationMeaningGetAccessor$constant();
    DeclarationMeaningGetOrSetAccessor = DeclarationMeaningGetOrSetAccessor$constant();
    DeclarationMeaningMethod = DeclarationMeaningMethod$constant();
    DeclarationMeaningPropertyAssignment = DeclarationMeaningPropertyAssignment$constant();
    DeclarationMeaningSetAccessor = DeclarationMeaningSetAccessor$constant();
    DeclarationSpacesExportNamespace = DeclarationSpacesExportNamespace$constant();
    DeclarationSpacesExportType = DeclarationSpacesExportType$constant();
    DeclarationSpacesExportValue = DeclarationSpacesExportValue$constant();
    DeclarationSpacesNone = DeclarationSpacesNone$constant();
    ElementFlagsFixed = ElementFlagsFixed$constant();
    ElementFlagsNonRequired = ElementFlagsNonRequired$constant();
    ElementFlagsNonRest = ElementFlagsNonRest$constant();
    ElementFlagsNone = ElementFlagsNone$constant();
    ElementFlagsOptional = ElementFlagsOptional$constant();
    ElementFlagsRequired = ElementFlagsRequired$constant();
    ElementFlagsRest = ElementFlagsRest$constant();
    ElementFlagsVariable = ElementFlagsVariable$constant();
    ElementFlagsVariadic = ElementFlagsVariadic$constant();
    ExhaustiveStateComputing = ExhaustiveStateComputing$constant();
    ExhaustiveStateFalse = ExhaustiveStateFalse$constant();
    ExhaustiveStateTrue = ExhaustiveStateTrue$constant();
    ExhaustiveStateUnknown = ExhaustiveStateUnknown$constant();
    ExpandingFlagsBoth = ExpandingFlagsBoth$constant();
    ExpandingFlagsSource = ExpandingFlagsSource$constant();
    ExpandingFlagsTarget = ExpandingFlagsTarget$constant();
    ExternalEmitHelpersAddDisposableResourceAndDisposeResources = ExternalEmitHelpersAddDisposableResourceAndDisposeResources$constant();
    ExternalEmitHelpersAsyncDelegator = ExternalEmitHelpersAsyncDelegator$constant();
    ExternalEmitHelpersAsyncDelegatorIncludes = ExternalEmitHelpersAsyncDelegatorIncludes$constant();
    ExternalEmitHelpersAsyncGenerator = ExternalEmitHelpersAsyncGenerator$constant();
    ExternalEmitHelpersAsyncGeneratorIncludes = ExternalEmitHelpersAsyncGeneratorIncludes$constant();
    ExternalEmitHelpersAsyncValues = ExternalEmitHelpersAsyncValues$constant();
    ExternalEmitHelpersAwait = ExternalEmitHelpersAwait$constant();
    ExternalEmitHelpersAwaiter = ExternalEmitHelpersAwaiter$constant();
    ExternalEmitHelpersClassPrivateFieldGet = ExternalEmitHelpersClassPrivateFieldGet$constant();
    ExternalEmitHelpersClassPrivateFieldIn = ExternalEmitHelpersClassPrivateFieldIn$constant();
    ExternalEmitHelpersClassPrivateFieldSet = ExternalEmitHelpersClassPrivateFieldSet$constant();
    ExternalEmitHelpersDecorate = ExternalEmitHelpersDecorate$constant();
    ExternalEmitHelpersESDecorateAndRunInitializers = ExternalEmitHelpersESDecorateAndRunInitializers$constant();
    ExternalEmitHelpersExportStar = ExternalEmitHelpersExportStar$constant();
    ExternalEmitHelpersFirstEmitHelper = ExternalEmitHelpersFirstEmitHelper$constant();
    ExternalEmitHelpersForAwaitOfIncludes = ExternalEmitHelpersForAwaitOfIncludes$constant();
    ExternalEmitHelpersImportDefault = ExternalEmitHelpersImportDefault$constant();
    ExternalEmitHelpersImportStar = ExternalEmitHelpersImportStar$constant();
    ExternalEmitHelpersLastEmitHelper = ExternalEmitHelpersLastEmitHelper$constant();
    ExternalEmitHelpersMakeTemplateObject = ExternalEmitHelpersMakeTemplateObject$constant();
    ExternalEmitHelpersMetadata = ExternalEmitHelpersMetadata$constant();
    ExternalEmitHelpersParam = ExternalEmitHelpersParam$constant();
    ExternalEmitHelpersPropKey = ExternalEmitHelpersPropKey$constant();
    ExternalEmitHelpersRest = ExternalEmitHelpersRest$constant();
    ExternalEmitHelpersRewriteRelativeImportExtension = ExternalEmitHelpersRewriteRelativeImportExtension$constant();
    ExternalEmitHelpersSetFunctionName = ExternalEmitHelpersSetFunctionName$constant();
    IndexFlagsNoIndexSignatures = IndexFlagsNoIndexSignatures$constant();
    IndexFlagsNoReducibleCheck = IndexFlagsNoReducibleCheck$constant();
    IndexFlagsNone = IndexFlagsNone$constant();
    IndexFlagsStringsOnly = IndexFlagsStringsOnly$constant();
    InferenceFlagsAnyDefault = InferenceFlagsAnyDefault$constant();
    InferenceFlagsNoDefault = InferenceFlagsNoDefault$constant();
    InferenceFlagsNone = InferenceFlagsNone$constant();
    InferenceFlagsSkippedGenericFunction = InferenceFlagsSkippedGenericFunction$constant();
    InferencePriorityAlwaysStrict = InferencePriorityAlwaysStrict$constant();
    InferencePriorityCircularity = InferencePriorityCircularity$constant();
    InferencePriorityContravariantConditional = InferencePriorityContravariantConditional$constant();
    InferencePriorityHomomorphicMappedType = InferencePriorityHomomorphicMappedType$constant();
    InferencePriorityLiteralKeyof = InferencePriorityLiteralKeyof$constant();
    InferencePriorityMappedTypeConstraint = InferencePriorityMappedTypeConstraint$constant();
    InferencePriorityMaxValue = InferencePriorityMaxValue$constant();
    InferencePriorityNakedTypeVariable = InferencePriorityNakedTypeVariable$constant();
    InferencePriorityNoConstraints = InferencePriorityNoConstraints$constant();
    InferencePriorityNone = InferencePriorityNone$constant();
    InferencePriorityPartialHomomorphicMappedType = InferencePriorityPartialHomomorphicMappedType$constant();
    InferencePriorityPriorityImpliesCombination = InferencePriorityPriorityImpliesCombination$constant();
    InferencePriorityReturnType = InferencePriorityReturnType$constant();
    InferencePrioritySpeculativeTuple = InferencePrioritySpeculativeTuple$constant();
    InferencePrioritySubstituteSource = InferencePrioritySubstituteSource$constant();
    IntersectionFlagsNoConstraintReduction = IntersectionFlagsNoConstraintReduction$constant();
    IntersectionFlagsNoSupertypeReduction = IntersectionFlagsNoSupertypeReduction$constant();
    IntersectionFlagsNone = IntersectionFlagsNone$constant();
    IntersectionStateNone = IntersectionStateNone$constant();
    IntersectionStateSource = IntersectionStateSource$constant();
    IntersectionStateTarget = IntersectionStateTarget$constant();
    IntrinsicTypeKindCapitalize = IntrinsicTypeKindCapitalize$constant();
    IntrinsicTypeKindLowercase = IntrinsicTypeKindLowercase$constant();
    IntrinsicTypeKindNoInfer = IntrinsicTypeKindNoInfer$constant();
    IntrinsicTypeKindUncapitalize = IntrinsicTypeKindUncapitalize$constant();
    IntrinsicTypeKindUnknown = IntrinsicTypeKindUnknown$constant();
    IntrinsicTypeKindUppercase = IntrinsicTypeKindUppercase$constant();
    IterationTypeKindNext = IterationTypeKindNext$constant();
    IterationTypeKindReturn = IterationTypeKindReturn$constant();
    IterationTypeKindYield = IterationTypeKindYield$constant();
    IterationUseAllowsAsyncIterablesFlag = IterationUseAllowsAsyncIterablesFlag$constant();
    IterationUseAllowsStringInputFlag = IterationUseAllowsStringInputFlag$constant();
    IterationUseAllowsSyncIterablesFlag = IterationUseAllowsSyncIterablesFlag$constant();
    IterationUseAsyncGeneratorReturnType = IterationUseAsyncGeneratorReturnType$constant();
    IterationUseAsyncYieldStar = IterationUseAsyncYieldStar$constant();
    IterationUseCacheFlags = IterationUseCacheFlags$constant();
    IterationUseDestructuring = IterationUseDestructuring$constant();
    IterationUseDestructuringFlag = IterationUseDestructuringFlag$constant();
    IterationUseElement = IterationUseElement$constant();
    IterationUseForAwaitOf = IterationUseForAwaitOf$constant();
    IterationUseForOf = IterationUseForOf$constant();
    IterationUseForOfFlag = IterationUseForOfFlag$constant();
    IterationUseGeneratorReturnType = IterationUseGeneratorReturnType$constant();
    IterationUsePossiblyOutOfBounds = IterationUsePossiblyOutOfBounds$constant();
    IterationUseSpread = IterationUseSpread$constant();
    IterationUseSpreadFlag = IterationUseSpreadFlag$constant();
    IterationUseYieldStar = IterationUseYieldStar$constant();
    IterationUseYieldStarFlag = IterationUseYieldStarFlag$constant();
    JsxFlagsIntrinsicIndexedElement = JsxFlagsIntrinsicIndexedElement$constant();
    JsxFlagsIntrinsicNamedElement = JsxFlagsIntrinsicNamedElement$constant();
    JsxReferenceKindComponent = JsxReferenceKindComponent$constant();
    JsxReferenceKindFunction = JsxReferenceKindFunction$constant();
    JsxReferenceKindMixed = JsxReferenceKindMixed$constant();
    MappedTypeModifiersExcludeOptional = MappedTypeModifiersExcludeOptional$constant();
    MappedTypeModifiersExcludeReadonly = MappedTypeModifiersExcludeReadonly$constant();
    MappedTypeModifiersIncludeOptional = MappedTypeModifiersIncludeOptional$constant();
    MappedTypeModifiersIncludeReadonly = MappedTypeModifiersIncludeReadonly$constant();
    MappedTypeNameTypeKindFiltering = MappedTypeNameTypeKindFiltering$constant();
    MappedTypeNameTypeKindNone = MappedTypeNameTypeKindNone$constant();
    MappedTypeNameTypeKindRemapping = MappedTypeNameTypeKindRemapping$constant();
    MembersOrExportsResolutionKindResolvedExports = MembersOrExportsResolutionKindResolvedExports$constant();
    MembersOrExportsResolutionKindResolvedMembers = MembersOrExportsResolutionKindResolvedMembers$constant();
    MinArgumentCountFlagsNone = MinArgumentCountFlagsNone$constant();
    MinArgumentCountFlagsStrongArityForUntypedJS = MinArgumentCountFlagsStrongArityForUntypedJS$constant();
    MinArgumentCountFlagsVoidIsNonOptional = MinArgumentCountFlagsVoidIsNonOptional$constant();
    NodeCheckFlagsAssignmentsMarked = NodeCheckFlagsAssignmentsMarked$constant();
    NodeCheckFlagsContainsClassWithPrivateIdentifiers = NodeCheckFlagsContainsClassWithPrivateIdentifiers$constant();
    NodeCheckFlagsContainsSuperPropertyInStaticInitializer = NodeCheckFlagsContainsSuperPropertyInStaticInitializer$constant();
    NodeCheckFlagsContextChecked = NodeCheckFlagsContextChecked$constant();
    NodeCheckFlagsEnumValuesComputed = NodeCheckFlagsEnumValuesComputed$constant();
    NodeCheckFlagsInCheckIdentifier = NodeCheckFlagsInCheckIdentifier$constant();
    NodeCheckFlagsInitializerIsUndefined = NodeCheckFlagsInitializerIsUndefined$constant();
    NodeCheckFlagsInitializerIsUndefinedComputed = NodeCheckFlagsInitializerIsUndefinedComputed$constant();
    NodeCheckFlagsTypeChecked = NodeCheckFlagsTypeChecked$constant();
    ObjectFlagsAnonymous = ObjectFlagsAnonymous$constant();
    ObjectFlagsClass = ObjectFlagsClass$constant();
    ObjectFlagsClassOrInterface = ObjectFlagsClassOrInterface$constant();
    ObjectFlagsContainsObjectOrArrayLiteral = ObjectFlagsContainsObjectOrArrayLiteral$constant();
    ObjectFlagsContainsWideningType = ObjectFlagsContainsWideningType$constant();
    ObjectFlagsCouldContainTypeVariables = ObjectFlagsCouldContainTypeVariables$constant();
    ObjectFlagsCouldContainTypeVariablesComputed = ObjectFlagsCouldContainTypeVariablesComputed$constant();
    ObjectFlagsEvolvingArray = ObjectFlagsEvolvingArray$constant();
    ObjectFlagsFreshLiteral = ObjectFlagsFreshLiteral$constant();
    ObjectFlagsInstantiated = ObjectFlagsInstantiated$constant();
    ObjectFlagsInstantiatedMapped = ObjectFlagsInstantiatedMapped$constant();
    ObjectFlagsInterface = ObjectFlagsInterface$constant();
    ObjectFlagsJSLiteral = ObjectFlagsJSLiteral$constant();
    ObjectFlagsJsxAttributes = ObjectFlagsJsxAttributes$constant();
    ObjectFlagsMapped = ObjectFlagsMapped$constant();
    ObjectFlagsMembersResolved = ObjectFlagsMembersResolved$constant();
    ObjectFlagsNonInferrableType = ObjectFlagsNonInferrableType$constant();
    ObjectFlagsNone = ObjectFlagsNone$constant();
    ObjectFlagsObjectLiteral = ObjectFlagsObjectLiteral$constant();
    ObjectFlagsObjectLiteralPatternWithComputedProperties = ObjectFlagsObjectLiteralPatternWithComputedProperties$constant();
    ObjectFlagsObjectTypeKindMask = ObjectFlagsObjectTypeKindMask$constant();
    ObjectFlagsPrimitiveUnion = ObjectFlagsPrimitiveUnion$constant();
    ObjectFlagsPropagatingFlags = ObjectFlagsPropagatingFlags$constant();
    ObjectFlagsReference = ObjectFlagsReference$constant();
    ObjectFlagsRequiresWidening = ObjectFlagsRequiresWidening$constant();
    ObjectFlagsReverseMapped = ObjectFlagsReverseMapped$constant();
    ObjectFlagsTuple = ObjectFlagsTuple$constant();
    PredicateSemanticsAlways = PredicateSemanticsAlways$constant();
    PredicateSemanticsNever = PredicateSemanticsNever$constant();
    PredicateSemanticsSometimes = PredicateSemanticsSometimes$constant();
    RecursionFlagsBoth = RecursionFlagsBoth$constant();
    RecursionFlagsSource = RecursionFlagsSource$constant();
    RecursionFlagsTarget = RecursionFlagsTarget$constant();
    ReferenceHintDecorator = ReferenceHintDecorator$constant();
    ReferenceHintExportAssignment = ReferenceHintExportAssignment$constant();
    ReferenceHintExportImportEquals = ReferenceHintExportImportEquals$constant();
    ReferenceHintExportSpecifier = ReferenceHintExportSpecifier$constant();
    ReferenceHintIdentifier = ReferenceHintIdentifier$constant();
    ReferenceHintJsx = ReferenceHintJsx$constant();
    ReferenceHintProperty = ReferenceHintProperty$constant();
    ReferenceHintUnspecified = ReferenceHintUnspecified$constant();
    RelationComparisonResultComplexityOverflow = RelationComparisonResultComplexityOverflow$constant();
    RelationComparisonResultFailed = RelationComparisonResultFailed$constant();
    RelationComparisonResultNone = RelationComparisonResultNone$constant();
    RelationComparisonResultOverflow = RelationComparisonResultOverflow$constant();
    RelationComparisonResultReportsUnmeasurable = RelationComparisonResultReportsUnmeasurable$constant();
    RelationComparisonResultReportsUnreliable = RelationComparisonResultReportsUnreliable$constant();
    RelationComparisonResultStackDepthOverflow = RelationComparisonResultStackDepthOverflow$constant();
    RelationComparisonResultSucceeded = RelationComparisonResultSucceeded$constant();
    SignatureCheckModeBivariantCallback = SignatureCheckModeBivariantCallback$constant();
    SignatureCheckModeCallback = SignatureCheckModeCallback$constant();
    SignatureCheckModeIgnoreReturnTypes = SignatureCheckModeIgnoreReturnTypes$constant();
    SignatureCheckModeNone = SignatureCheckModeNone$constant();
    SignatureCheckModeStrictArity = SignatureCheckModeStrictArity$constant();
    SignatureCheckModeStrictCallback = SignatureCheckModeStrictCallback$constant();
    SignatureCheckModeStrictTopSignature = SignatureCheckModeStrictTopSignature$constant();
    SignatureFlagsAbstract = SignatureFlagsAbstract$constant();
    SignatureFlagsCallChainFlags = SignatureFlagsCallChainFlags$constant();
    SignatureFlagsConstruct = SignatureFlagsConstruct$constant();
    SignatureFlagsHasLiteralTypes = SignatureFlagsHasLiteralTypes$constant();
    SignatureFlagsHasRestParameter = SignatureFlagsHasRestParameter$constant();
    SignatureFlagsIsInnerCallChain = SignatureFlagsIsInnerCallChain$constant();
    SignatureFlagsIsNonInferrable = SignatureFlagsIsNonInferrable$constant();
    SignatureFlagsIsOuterCallChain = SignatureFlagsIsOuterCallChain$constant();
    SignatureFlagsIsSignatureCandidateForOverloadFailure = SignatureFlagsIsSignatureCandidateForOverloadFailure$constant();
    SignatureFlagsIsUntypedSignatureInJSFile = SignatureFlagsIsUntypedSignatureInJSFile$constant();
    SignatureFlagsNone = SignatureFlagsNone$constant();
    SignatureFlagsPropagatingFlags = SignatureFlagsPropagatingFlags$constant();
    SignatureKindCall = SignatureKindCall$constant();
    SignatureKindConstruct = SignatureKindConstruct$constant();
    SymbolFormatFlagsAllowAnyNodeKind = SymbolFormatFlagsAllowAnyNodeKind$constant();
    SymbolFormatFlagsDoNotIncludeSymbolChain = SymbolFormatFlagsDoNotIncludeSymbolChain$constant();
    SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope = SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope$constant();
    SymbolFormatFlagsUseOnlyExternalAliasing = SymbolFormatFlagsUseOnlyExternalAliasing$constant();
    SymbolFormatFlagsWriteComputedProps = SymbolFormatFlagsWriteComputedProps$constant();
    SymbolFormatFlagsWriteTypeParametersOrArguments = SymbolFormatFlagsWriteTypeParametersOrArguments$constant();
    TernaryFalse = TernaryFalse$constant();
    TernaryMaybe = TernaryMaybe$constant();
    TernaryTrue = TernaryTrue$constant();
    TernaryUnknown = TernaryUnknown$constant();
    TypeFactsAll = TypeFactsAll$constant();
    TypeFactsAllTypeofNE = TypeFactsAllTypeofNE$constant();
    TypeFactsAndFactsMask = TypeFactsAndFactsMask$constant();
    TypeFactsBigIntFacts = TypeFactsBigIntFacts$constant();
    TypeFactsBigIntStrictFacts = TypeFactsBigIntStrictFacts$constant();
    TypeFactsBooleanFacts = TypeFactsBooleanFacts$constant();
    TypeFactsBooleanStrictFacts = TypeFactsBooleanStrictFacts$constant();
    TypeFactsEQNull = TypeFactsEQNull$constant();
    TypeFactsEQUndefined = TypeFactsEQUndefined$constant();
    TypeFactsEQUndefinedOrNull = TypeFactsEQUndefinedOrNull$constant();
    TypeFactsEmptyObjectFacts = TypeFactsEmptyObjectFacts$constant();
    TypeFactsEmptyObjectStrictFacts = TypeFactsEmptyObjectStrictFacts$constant();
    TypeFactsEmptyStringFacts = TypeFactsEmptyStringFacts$constant();
    TypeFactsEmptyStringStrictFacts = TypeFactsEmptyStringStrictFacts$constant();
    TypeFactsFalseFacts = TypeFactsFalseFacts$constant();
    TypeFactsFalseStrictFacts = TypeFactsFalseStrictFacts$constant();
    TypeFactsFalsy = TypeFactsFalsy$constant();
    TypeFactsFunctionFacts = TypeFactsFunctionFacts$constant();
    TypeFactsFunctionStrictFacts = TypeFactsFunctionStrictFacts$constant();
    TypeFactsIsNull = TypeFactsIsNull$constant();
    TypeFactsIsUndefined = TypeFactsIsUndefined$constant();
    TypeFactsIsUndefinedOrNull = TypeFactsIsUndefinedOrNull$constant();
    TypeFactsNENull = TypeFactsNENull$constant();
    TypeFactsNEUndefined = TypeFactsNEUndefined$constant();
    TypeFactsNEUndefinedOrNull = TypeFactsNEUndefinedOrNull$constant();
    TypeFactsNonEmptyStringFacts = TypeFactsNonEmptyStringFacts$constant();
    TypeFactsNonEmptyStringStrictFacts = TypeFactsNonEmptyStringStrictFacts$constant();
    TypeFactsNonZeroBigIntFacts = TypeFactsNonZeroBigIntFacts$constant();
    TypeFactsNonZeroBigIntStrictFacts = TypeFactsNonZeroBigIntStrictFacts$constant();
    TypeFactsNonZeroNumberFacts = TypeFactsNonZeroNumberFacts$constant();
    TypeFactsNonZeroNumberStrictFacts = TypeFactsNonZeroNumberStrictFacts$constant();
    TypeFactsNone = TypeFactsNone$constant();
    TypeFactsNullFacts = TypeFactsNullFacts$constant();
    TypeFactsNumberFacts = TypeFactsNumberFacts$constant();
    TypeFactsNumberStrictFacts = TypeFactsNumberStrictFacts$constant();
    TypeFactsObjectFacts = TypeFactsObjectFacts$constant();
    TypeFactsObjectStrictFacts = TypeFactsObjectStrictFacts$constant();
    TypeFactsOrFactsMask = TypeFactsOrFactsMask$constant();
    TypeFactsStringFacts = TypeFactsStringFacts$constant();
    TypeFactsStringStrictFacts = TypeFactsStringStrictFacts$constant();
    TypeFactsSymbolFacts = TypeFactsSymbolFacts$constant();
    TypeFactsSymbolStrictFacts = TypeFactsSymbolStrictFacts$constant();
    TypeFactsTrueFacts = TypeFactsTrueFacts$constant();
    TypeFactsTrueStrictFacts = TypeFactsTrueStrictFacts$constant();
    TypeFactsTruthy = TypeFactsTruthy$constant();
    TypeFactsTypeofEQBigInt = TypeFactsTypeofEQBigInt$constant();
    TypeFactsTypeofEQBoolean = TypeFactsTypeofEQBoolean$constant();
    TypeFactsTypeofEQFunction = TypeFactsTypeofEQFunction$constant();
    TypeFactsTypeofEQHostObject = TypeFactsTypeofEQHostObject$constant();
    TypeFactsTypeofEQNumber = TypeFactsTypeofEQNumber$constant();
    TypeFactsTypeofEQObject = TypeFactsTypeofEQObject$constant();
    TypeFactsTypeofEQString = TypeFactsTypeofEQString$constant();
    TypeFactsTypeofEQSymbol = TypeFactsTypeofEQSymbol$constant();
    TypeFactsTypeofNEBigInt = TypeFactsTypeofNEBigInt$constant();
    TypeFactsTypeofNEBoolean = TypeFactsTypeofNEBoolean$constant();
    TypeFactsTypeofNEFunction = TypeFactsTypeofNEFunction$constant();
    TypeFactsTypeofNEHostObject = TypeFactsTypeofNEHostObject$constant();
    TypeFactsTypeofNENumber = TypeFactsTypeofNENumber$constant();
    TypeFactsTypeofNEObject = TypeFactsTypeofNEObject$constant();
    TypeFactsTypeofNEString = TypeFactsTypeofNEString$constant();
    TypeFactsTypeofNESymbol = TypeFactsTypeofNESymbol$constant();
    TypeFactsUndefinedFacts = TypeFactsUndefinedFacts$constant();
    TypeFactsUnknownFacts = TypeFactsUnknownFacts$constant();
    TypeFactsVoidFacts = TypeFactsVoidFacts$constant();
    TypeFactsZeroBigIntFacts = TypeFactsZeroBigIntFacts$constant();
    TypeFactsZeroBigIntStrictFacts = TypeFactsZeroBigIntStrictFacts$constant();
    TypeFactsZeroNumberFacts = TypeFactsZeroNumberFacts$constant();
    TypeFactsZeroNumberStrictFacts = TypeFactsZeroNumberStrictFacts$constant();
    TypeFlagsAny = TypeFlagsAny$constant();
    TypeFlagsAnyOrUnknown = TypeFlagsAnyOrUnknown$constant();
    TypeFlagsBigInt = TypeFlagsBigInt$constant();
    TypeFlagsBigIntLike = TypeFlagsBigIntLike$constant();
    TypeFlagsBigIntLiteral = TypeFlagsBigIntLiteral$constant();
    TypeFlagsBoolean = TypeFlagsBoolean$constant();
    TypeFlagsBooleanLike = TypeFlagsBooleanLike$constant();
    TypeFlagsBooleanLiteral = TypeFlagsBooleanLiteral$constant();
    TypeFlagsConditional = TypeFlagsConditional$constant();
    TypeFlagsDefinitelyNonNullable = TypeFlagsDefinitelyNonNullable$constant();
    TypeFlagsDisjointDomains = TypeFlagsDisjointDomains$constant();
    TypeFlagsESSymbol = TypeFlagsESSymbol$constant();
    TypeFlagsESSymbolLike = TypeFlagsESSymbolLike$constant();
    TypeFlagsEnum = TypeFlagsEnum$constant();
    TypeFlagsEnumLike = TypeFlagsEnumLike$constant();
    TypeFlagsEnumLiteral = TypeFlagsEnumLiteral$constant();
    TypeFlagsFreshable = TypeFlagsFreshable$constant();
    TypeFlagsIncludesConstrainedTypeVariable = TypeFlagsIncludesConstrainedTypeVariable$constant();
    TypeFlagsIncludesEmptyObject = TypeFlagsIncludesEmptyObject$constant();
    TypeFlagsIncludesError = TypeFlagsIncludesError$constant();
    TypeFlagsIncludesInstantiable = TypeFlagsIncludesInstantiable$constant();
    TypeFlagsIncludesMask = TypeFlagsIncludesMask$constant();
    TypeFlagsIncludesMissingType = TypeFlagsIncludesMissingType$constant();
    TypeFlagsIncludesNonWideningType = TypeFlagsIncludesNonWideningType$constant();
    TypeFlagsIncludesWildcard = TypeFlagsIncludesWildcard$constant();
    TypeFlagsIndex = TypeFlagsIndex$constant();
    TypeFlagsIndexedAccess = TypeFlagsIndexedAccess$constant();
    TypeFlagsInstantiable = TypeFlagsInstantiable$constant();
    TypeFlagsInstantiableNonPrimitive = TypeFlagsInstantiableNonPrimitive$constant();
    TypeFlagsIntersection = TypeFlagsIntersection$constant();
    TypeFlagsIntrinsic = TypeFlagsIntrinsic$constant();
    TypeFlagsLiteral = TypeFlagsLiteral$constant();
    TypeFlagsNever = TypeFlagsNever$constant();
    TypeFlagsNonPrimitive = TypeFlagsNonPrimitive$constant();
    TypeFlagsNone = TypeFlagsNone$constant();
    TypeFlagsNotPrimitiveUnion = TypeFlagsNotPrimitiveUnion$constant();
    TypeFlagsNull = TypeFlagsNull$constant();
    TypeFlagsNullable = TypeFlagsNullable$constant();
    TypeFlagsNumber = TypeFlagsNumber$constant();
    TypeFlagsNumberLike = TypeFlagsNumberLike$constant();
    TypeFlagsNumberLiteral = TypeFlagsNumberLiteral$constant();
    TypeFlagsObject = TypeFlagsObject$constant();
    TypeFlagsObjectFlagsType = TypeFlagsObjectFlagsType$constant();
    TypeFlagsPrimitive = TypeFlagsPrimitive$constant();
    TypeFlagsSimplifiable = TypeFlagsSimplifiable$constant();
    TypeFlagsSingleton = TypeFlagsSingleton$constant();
    TypeFlagsString = TypeFlagsString$constant();
    TypeFlagsStringLike = TypeFlagsStringLike$constant();
    TypeFlagsStringLiteral = TypeFlagsStringLiteral$constant();
    TypeFlagsStringMapping = TypeFlagsStringMapping$constant();
    TypeFlagsStringOrNumberLiteral = TypeFlagsStringOrNumberLiteral$constant();
    TypeFlagsStringOrNumberLiteralOrUnique = TypeFlagsStringOrNumberLiteralOrUnique$constant();
    TypeFlagsStructuredOrInstantiable = TypeFlagsStructuredOrInstantiable$constant();
    TypeFlagsStructuredType = TypeFlagsStructuredType$constant();
    TypeFlagsSubstitution = TypeFlagsSubstitution$constant();
    TypeFlagsTemplateLiteral = TypeFlagsTemplateLiteral$constant();
    TypeFlagsTypeParameter = TypeFlagsTypeParameter$constant();
    TypeFlagsTypeVariable = TypeFlagsTypeVariable$constant();
    TypeFlagsUndefined = TypeFlagsUndefined$constant();
    TypeFlagsUnion = TypeFlagsUnion$constant();
    TypeFlagsUnionOrIntersection = TypeFlagsUnionOrIntersection$constant();
    TypeFlagsUniqueESSymbol = TypeFlagsUniqueESSymbol$constant();
    TypeFlagsUnit = TypeFlagsUnit$constant();
    TypeFlagsUnknown = TypeFlagsUnknown$constant();
    TypeFlagsVoid = TypeFlagsVoid$constant();
    TypeFlagsVoidLike = TypeFlagsVoidLike$constant();
    TypeFormatFlagsMultilineObjectLiterals = TypeFormatFlagsMultilineObjectLiterals$constant();
    TypeFormatFlagsNoTruncation = TypeFormatFlagsNoTruncation$constant();
    TypeFormatFlagsNoTypeReduction = TypeFormatFlagsNoTypeReduction$constant();
    TypeFormatFlagsNodeBuilderFlagsMask = TypeFormatFlagsNodeBuilderFlagsMask$constant();
    TypeFormatFlagsNone = TypeFormatFlagsNone$constant();
    TypeFormatFlagsUseAliasDefinedOutsideCurrentScope = TypeFormatFlagsUseAliasDefinedOutsideCurrentScope$constant();
    TypeFormatFlagsUseFullyQualifiedType = TypeFormatFlagsUseFullyQualifiedType$constant();
    TypeFormatFlagsWriteArrayAsGenericType = TypeFormatFlagsWriteArrayAsGenericType$constant();
    TypeFormatFlagsWriteArrowStyleSignature = TypeFormatFlagsWriteArrowStyleSignature$constant();
    TypeFormatFlagsWriteCallStyleSignature = TypeFormatFlagsWriteCallStyleSignature$constant();
    TypeMapperKindArray = TypeMapperKindArray$constant();
    TypeMapperKindMerged = TypeMapperKindMerged$constant();
    TypeMapperKindSimple = TypeMapperKindSimple$constant();
    TypeMapperKindUnknown = TypeMapperKindUnknown$constant();
    TypePredicateKindAssertsIdentifier = TypePredicateKindAssertsIdentifier$constant();
    TypePredicateKindAssertsThis = TypePredicateKindAssertsThis$constant();
    TypePredicateKindIdentifier = TypePredicateKindIdentifier$constant();
    TypePredicateKindThis = TypePredicateKindThis$constant();
    TypeSystemPropertyNameAliasTarget = TypeSystemPropertyNameAliasTarget$constant();
    TypeSystemPropertyNameDeclaredType = TypeSystemPropertyNameDeclaredType$constant();
    TypeSystemPropertyNameInitializerIsUndefined = TypeSystemPropertyNameInitializerIsUndefined$constant();
    TypeSystemPropertyNameResolvedBaseConstraint = TypeSystemPropertyNameResolvedBaseConstraint$constant();
    TypeSystemPropertyNameResolvedBaseConstructorType = TypeSystemPropertyNameResolvedBaseConstructorType$constant();
    TypeSystemPropertyNameResolvedBaseTypes = TypeSystemPropertyNameResolvedBaseTypes$constant();
    TypeSystemPropertyNameResolvedReturnType = TypeSystemPropertyNameResolvedReturnType$constant();
    TypeSystemPropertyNameResolvedTypeArguments = TypeSystemPropertyNameResolvedTypeArguments$constant();
    TypeSystemPropertyNameType = TypeSystemPropertyNameType$constant();
    TypeSystemPropertyNameWriteType = TypeSystemPropertyNameWriteType$constant();
    UnionReductionLiteral = UnionReductionLiteral$constant();
    UnionReductionNone = UnionReductionNone$constant();
    UnionReductionSubtype = UnionReductionSubtype$constant();
    UnusedKindLocal = UnusedKindLocal$constant();
    UnusedKindParameter = UnusedKindParameter$constant();
    VarianceFlagsAllowsStructuralFallback = VarianceFlagsAllowsStructuralFallback$constant();
    VarianceFlagsBivariant = VarianceFlagsBivariant$constant();
    VarianceFlagsContravariant = VarianceFlagsContravariant$constant();
    VarianceFlagsCovariant = VarianceFlagsCovariant$constant();
    VarianceFlagsIndependent = VarianceFlagsIndependent$constant();
    VarianceFlagsInvariant = VarianceFlagsInvariant$constant();
    VarianceFlagsUnmeasurable = VarianceFlagsUnmeasurable$constant();
    VarianceFlagsUnreliable = VarianceFlagsUnreliable$constant();
    VarianceFlagsVarianceMask = VarianceFlagsVarianceMask$constant();
    WideningKindFunctionReturn = WideningKindFunctionReturn$constant();
    WideningKindGeneratorNext = WideningKindGeneratorNext$constant();
    WideningKindGeneratorYield = WideningKindGeneratorYield$constant();
    WideningKindNormal = WideningKindNormal$constant();
    $state.JsxNames = $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_.$storageOf($goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_.$zero());
    $state.LanguageFeatureMinimumTarget = LanguageFeatureMinimumTargetMap.$storageOf(LanguageFeatureMinimumTargetMap.$zero());
    $state.ReactNames = $goStruct$Struct_Field_Fragment_string_Tag__empty_.$storageOf($goStruct$Struct_Field_Fragment_string_Tag__empty_.$zero());
    $state.SignatureKeyBase = CacheHashKey.$storageOf(CacheHashKey.$zero());
    $state.SignatureKeyCanonical = CacheHashKey.$storageOf(CacheHashKey.$zero());
    $state.SignatureKeyErased = CacheHashKey.$storageOf(CacheHashKey.$zero());
    $state.SignatureKeyInner = CacheHashKey.$storageOf(CacheHashKey.$zero());
    $state.SignatureKeyOuter = CacheHashKey.$storageOf(CacheHashKey.$zero());
    $state._SignatureKind_index = GoArray.zero<uint8, 3>(3, 0);
    $state.getFeatureMap = void 0;
    $state.intrinsicTypeKinds = GoMap.nil<gostring, IntrinsicTypeKind>(0);
    $state.knownGenericTypeNames = $goMap$MapOf_string_To_Struct_void.nil();
    $state.nextCheckerID = named_sync_atomic.SyncAtomicUint32Operations.$zero();
    $state.nonDottedNameCacheKey = CacheHashKey.$storageOf(CacheHashKey.$zero());
    $state.primitiveTypeAliasSuggestions = void 0;
    const __gotots_array_build_2 = goArrayAllocate<$goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage, 29>(29);
    for (let __gotots_array_build_3 = 0; __gotots_array_build_3 < 29; __gotots_array_build_3++) {
        __gotots_array_build_2.set(__gotots_array_build_3, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$zero()));
    }
    $state.typeFlagNames = __gotots_array_build_2;
    $state.typeofNEFacts = GoMap.nil<gostring, TypeFacts>(0);
    {
        $state.SignatureKeyErased = CacheHashKey.$storageOf(CacheHashKey.$fromStorage(Uint128__from_xxh3.$storageOf(HashString128__from_xxh3("-"))));
    }
    {
        $state.SignatureKeyCanonical = CacheHashKey.$storageOf(CacheHashKey.$fromStorage(Uint128__from_xxh3.$storageOf(HashString128__from_xxh3("*"))));
    }
    {
        $state.SignatureKeyBase = CacheHashKey.$storageOf(CacheHashKey.$fromStorage(Uint128__from_xxh3.$storageOf(HashString128__from_xxh3("#"))));
    }
    {
        $state.SignatureKeyInner = CacheHashKey.$storageOf(CacheHashKey.$fromStorage(Uint128__from_xxh3.$storageOf(HashString128__from_xxh3("<"))));
    }
    {
        $state.SignatureKeyOuter = CacheHashKey.$storageOf(CacheHashKey.$fromStorage(Uint128__from_xxh3.$storageOf(HashString128__from_xxh3(">"))));
    }
    {
        $state.intrinsicTypeKinds = GoMap.make<gostring, IntrinsicTypeKind>(0, 5, [["Uppercase", IntrinsicTypeKindUppercase$constant()], ["Lowercase", IntrinsicTypeKindLowercase$constant()], ["Capitalize", IntrinsicTypeKindCapitalize$constant()], ["Uncapitalize", IntrinsicTypeKindUncapitalize$constant()], ["NoInfer", IntrinsicTypeKindNoInfer$constant()]]);
    }
    {
        $state.primitiveTypeAliasSuggestions = sync__from_gostdlib.OnceValue<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>((): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
            let result: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(6, []);
            const __gotots_range_0 = RuntimeSlice.literal<$goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_$Storage>([$goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$fromStorage({
                    primitive: "string",
                    builtin: "String"
                })), $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$fromStorage({
                    primitive: "number",
                    builtin: "Number"
                })), $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$fromStorage({
                    primitive: "boolean",
                    builtin: "Boolean"
                })), $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$fromStorage({
                    primitive: "object",
                    builtin: "Object"
                })), $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$fromStorage({
                    primitive: "bigint",
                    builtin: "BigInt"
                })), $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$fromStorage({
                    primitive: "symbol",
                    builtin: "Symbol"
                }))]);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$copy($goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
                let e = __gotots_range_value_0;
                const __gotots_struct_0 = Symbol__from_ast.$zero();
                let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = tsonicTypeScriptRuntime.location<Symbol__from_ast>(__gotots_struct_0);
                Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags = 34078720;
                Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name = e.primitive;
                result.store(e.builtin, sym);
            }
            return result;
        });
    }
    {
        void 0;
    }
    {
        $state.typeofNEFacts = GoMap.make<gostring, TypeFacts>(0, 8, [["string", TypeFactsTypeofNEString$constant()], ["number", TypeFactsTypeofNENumber$constant()], ["bigint", TypeFactsTypeofNEBigInt$constant()], ["boolean", TypeFactsTypeofNEBoolean$constant()], ["symbol", TypeFactsTypeofNESymbol$constant()], ["undefined", TypeFactsNEUndefined$constant()], ["object", TypeFactsTypeofNEObject$constant()], ["function", TypeFactsTypeofNEFunction$constant()]]);
    }
    {
        $state.nonDottedNameCacheKey = CacheHashKey.$storageOf(CacheHashKey.$fromStorage(Uint128__from_xxh3.$storageOf(HashString128__from_xxh3("?"))));
    }
    {
        $state.JsxNames = $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_.$storageOf($goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_.$fromStorage({
            JSX: "JSX",
            IntrinsicElements: "IntrinsicElements",
            ElementClass: "ElementClass",
            ElementAttributesPropertyNameContainer: "ElementAttributesProperty",
            ElementChildrenAttributeNameContainer: "ElementChildrenAttribute",
            Element: "Element",
            ElementType: "ElementType",
            IntrinsicAttributes: "IntrinsicAttributes",
            IntrinsicClassAttributes: "IntrinsicClassAttributes",
            LibraryManagedAttributes: "LibraryManagedAttributes"
        }));
    }
    {
        $state.ReactNames = $goStruct$Struct_Field_Fragment_string_Tag__empty_.$storageOf($goStruct$Struct_Field_Fragment_string_Tag__empty_.$fromStorage({
            Fragment: "Fragment"
        }));
    }
    {
        $state.knownGenericTypeNames = $goMap$MapOf_string_To_Struct_void.make(20, [["Array", new GoEmptyStruct], ["ArrayLike", new GoEmptyStruct], ["ReadonlyArray", new GoEmptyStruct], ["Promise", new GoEmptyStruct], ["PromiseLike", new GoEmptyStruct], ["Iterable", new GoEmptyStruct], ["IterableIterator", new GoEmptyStruct], ["AsyncIterable", new GoEmptyStruct], ["Set", new GoEmptyStruct], ["WeakSet", new GoEmptyStruct], ["ReadonlySet", new GoEmptyStruct], ["Map", new GoEmptyStruct], ["WeakMap", new GoEmptyStruct], ["ReadonlyMap", new GoEmptyStruct], ["Partial", new GoEmptyStruct], ["Required", new GoEmptyStruct], ["Readonly", new GoEmptyStruct], ["Pick", new GoEmptyStruct], ["Omit", new GoEmptyStruct], ["NonNullable", new GoEmptyStruct]]);
    }
    {
        $state._SignatureKind_index = GoArray.literal<uint8, 3>(3, 0, [0, 1, 2], [0, 17, 39]);
    }
    {
        void 0;
    }
    {
        const __gotots_array_build_4 = goArrayAllocate<$goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage, 29>(29);
        for (let __gotots_array_build_5 = 0; __gotots_array_build_5 < 29; __gotots_array_build_5++) {
            __gotots_array_build_4.set(__gotots_array_build_5, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$zero()));
        }
        __gotots_array_build_4.set(0, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsAny$constant(),
            name: "Any"
        })));
        __gotots_array_build_4.set(1, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsUnknown$constant(),
            name: "Unknown"
        })));
        __gotots_array_build_4.set(2, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsUndefined$constant(),
            name: "Undefined"
        })));
        __gotots_array_build_4.set(3, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsNull$constant(),
            name: "Null"
        })));
        __gotots_array_build_4.set(4, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsVoid$constant(),
            name: "Void"
        })));
        __gotots_array_build_4.set(5, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsString$constant(),
            name: "String"
        })));
        __gotots_array_build_4.set(6, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsNumber$constant(),
            name: "Number"
        })));
        __gotots_array_build_4.set(7, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsBigInt$constant(),
            name: "BigInt"
        })));
        __gotots_array_build_4.set(8, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsBoolean$constant(),
            name: "Boolean"
        })));
        __gotots_array_build_4.set(9, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsESSymbol$constant(),
            name: "ESSymbol"
        })));
        __gotots_array_build_4.set(10, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsStringLiteral$constant(),
            name: "StringLiteral"
        })));
        __gotots_array_build_4.set(11, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsNumberLiteral$constant(),
            name: "NumberLiteral"
        })));
        __gotots_array_build_4.set(12, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsBigIntLiteral$constant(),
            name: "BigIntLiteral"
        })));
        __gotots_array_build_4.set(13, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsBooleanLiteral$constant(),
            name: "BooleanLiteral"
        })));
        __gotots_array_build_4.set(14, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsUniqueESSymbol$constant(),
            name: "UniqueESSymbol"
        })));
        __gotots_array_build_4.set(15, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsEnumLiteral$constant(),
            name: "EnumLiteral"
        })));
        __gotots_array_build_4.set(16, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsEnum$constant(),
            name: "Enum"
        })));
        __gotots_array_build_4.set(17, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsNonPrimitive$constant(),
            name: "NonPrimitive"
        })));
        __gotots_array_build_4.set(18, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsNever$constant(),
            name: "Never"
        })));
        __gotots_array_build_4.set(19, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsTypeParameter$constant(),
            name: "TypeParameter"
        })));
        __gotots_array_build_4.set(20, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsObject$constant(),
            name: "Object"
        })));
        __gotots_array_build_4.set(21, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsIndex$constant(),
            name: "Index"
        })));
        __gotots_array_build_4.set(22, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsTemplateLiteral$constant(),
            name: "TemplateLiteral"
        })));
        __gotots_array_build_4.set(23, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsStringMapping$constant(),
            name: "StringMapping"
        })));
        __gotots_array_build_4.set(24, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsSubstitution$constant(),
            name: "Substitution"
        })));
        __gotots_array_build_4.set(25, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsIndexedAccess$constant(),
            name: "IndexedAccess"
        })));
        __gotots_array_build_4.set(26, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsConditional$constant(),
            name: "Conditional"
        })));
        __gotots_array_build_4.set(27, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsUnion$constant(),
            name: "Union"
        })));
        __gotots_array_build_4.set(28, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage({
            flag: TypeFlagsIntersection$constant(),
            name: "Intersection"
        })));
        $state.typeFlagNames = __gotots_array_build_4;
    }
    {
        $state.LanguageFeatureMinimumTarget = LanguageFeatureMinimumTargetMap.$storageOf(LanguageFeatureMinimumTargetMap.$fromStorage({
            Exponentiation: ScriptTargetES2016$constant__from_core(),
            AsyncFunctions: ScriptTargetES2017$constant__from_core(),
            ForAwaitOf: ScriptTargetES2018$constant__from_core(),
            AsyncGenerators: ScriptTargetES2018$constant__from_core(),
            AsyncIteration: ScriptTargetES2018$constant__from_core(),
            ObjectSpreadRest: ScriptTargetES2018$constant__from_core(),
            RegularExpressionFlagsDotAll: ScriptTargetES2018$constant__from_core(),
            BindinglessCatch: ScriptTargetES2019$constant__from_core(),
            BigInt: ScriptTargetES2020$constant__from_core(),
            NullishCoalesce: ScriptTargetES2020$constant__from_core(),
            OptionalChaining: ScriptTargetES2020$constant__from_core(),
            LogicalAssignment: ScriptTargetES2021$constant__from_core(),
            TopLevelAwait: ScriptTargetES2022$constant__from_core(),
            ClassFields: ScriptTargetES2022$constant__from_core(),
            PrivateNamesAndClassStaticBlocks: ScriptTargetES2022$constant__from_core(),
            RegularExpressionFlagsHasIndices: ScriptTargetES2022$constant__from_core(),
            ShebangComments: ScriptTargetESNext$constant__from_core(),
            UsingAndAwaitUsing: ScriptTargetESNext$constant__from_core(),
            ClassAndClassElementDecorators: ScriptTargetESNext$constant__from_core(),
            RegularExpressionFlagsUnicodeSets: ScriptTargetESNext$constant__from_core()
        }));
    }
    {
        $state.getFeatureMap = sync__from_gostdlib.OnceValue<GoMapValue<gostring, RuntimeSlice<FeatureMapEntry__from_checker$Storage>>>((): GoMapValue<gostring, RuntimeSlice<FeatureMapEntry__from_checker$Storage>> => {
            return $goMap$MapOf_string_To_SliceOf_Named_checker$FeatureMapEntry.make(54, [["Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["find", "findIndex", "fill", "copyWithin", "entries", "keys", "values"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2016",
                            props: RuntimeSlice.literal<gostring>(["includes"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2019",
                            props: RuntimeSlice.literal<gostring>(["flat", "flatMap"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Iterator", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["AsyncIterator", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["ArrayBuffer", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2024",
                            props: RuntimeSlice.literal<gostring>(["maxByteLength", "resizable", "resize", "detached", "transfer", "transferToFixedLength"])
                        }))])], ["Atomics", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2017",
                            props: RuntimeSlice.literal<gostring>(["add", "and", "compareExchange", "exchange", "isLockFree", "load", "or", "store", "sub", "wait", "notify", "xor"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2024",
                            props: RuntimeSlice.literal<gostring>(["waitAsync"])
                        }))])], ["SharedArrayBuffer", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2017",
                            props: RuntimeSlice.literal<gostring>(["byteLength", "slice"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2024",
                            props: RuntimeSlice.literal<gostring>(["growable", "maxByteLength", "grow"])
                        }))])], ["AsyncIterable", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["AsyncIterableIterator", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["AsyncGenerator", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["AsyncGeneratorFunction", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["RegExp", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["flags", "sticky", "unicode"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>(["dotAll"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2024",
                            props: RuntimeSlice.literal<gostring>(["unicodeSets"])
                        }))])], ["RegExpConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2025",
                            props: RuntimeSlice.literal<gostring>(["escape"])
                        }))])], ["Reflect", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["apply", "construct", "defineProperty", "deleteProperty", "get", "getOwnPropertyDescriptor", "getPrototypeOf", "has", "isExtensible", "ownKeys", "preventExtensions", "set", "setPrototypeOf"])
                        }))])], ["ArrayConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["from", "of"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>(["fromAsync"])
                        }))])], ["ObjectConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["assign", "getOwnPropertySymbols", "keys", "is", "setPrototypeOf"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2017",
                            props: RuntimeSlice.literal<gostring>(["values", "entries", "getOwnPropertyDescriptors"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2019",
                            props: RuntimeSlice.literal<gostring>(["fromEntries"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["hasOwn"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2024",
                            props: RuntimeSlice.literal<gostring>(["groupBy"])
                        }))])], ["NumberConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["isFinite", "isInteger", "isNaN", "isSafeInteger", "parseFloat", "parseInt"])
                        }))])], ["Math", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["clz32", "imul", "sign", "log10", "log2", "log1p", "expm1", "cosh", "sinh", "tanh", "acosh", "asinh", "atanh", "hypot", "trunc", "fround", "cbrt"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2025",
                            props: RuntimeSlice.literal<gostring>(["f16round"])
                        }))])], ["Map", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["entries", "keys", "values"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>(["getOrInsert", "getOrInsertComputed"])
                        }))])], ["MapConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2024",
                            props: RuntimeSlice.literal<gostring>(["groupBy"])
                        }))])], ["Set", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["entries", "keys", "values"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2025",
                            props: RuntimeSlice.literal<gostring>(["union", "intersection", "difference", "symmetricDifference", "isSubsetOf", "isSupersetOf", "isDisjointFrom"])
                        }))])], ["PromiseConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["all", "race", "reject", "resolve"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>(["allSettled"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2021",
                            props: RuntimeSlice.literal<gostring>(["any"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2024",
                            props: RuntimeSlice.literal<gostring>(["withResolvers"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2025",
                            props: RuntimeSlice.literal<gostring>(["try"])
                        }))])], ["Symbol", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["for", "keyFor"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2019",
                            props: RuntimeSlice.literal<gostring>(["description"])
                        }))])], ["WeakMap", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>([])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>(["getOrInsert", "getOrInsertComputed"])
                        }))])], ["WeakSet", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["String", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["codePointAt", "includes", "endsWith", "normalize", "repeat", "startsWith", "anchor", "big", "blink", "bold", "fixed", "fontcolor", "fontsize", "italics", "link", "small", "strike", "sub", "sup"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2017",
                            props: RuntimeSlice.literal<gostring>(["padStart", "padEnd"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2019",
                            props: RuntimeSlice.literal<gostring>(["trimStart", "trimEnd", "trimLeft", "trimRight"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>(["matchAll"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2021",
                            props: RuntimeSlice.literal<gostring>(["replaceAll"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2024",
                            props: RuntimeSlice.literal<gostring>(["isWellFormed", "toWellFormed"])
                        }))])], ["StringConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>(["fromCodePoint", "raw"])
                        }))])], ["DateTimeFormat", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2017",
                            props: RuntimeSlice.literal<gostring>(["formatToParts"])
                        }))])], ["Promise", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2015",
                            props: RuntimeSlice.literal<gostring>([])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>(["finally"])
                        }))])], ["RegExpMatchArray", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>(["groups"])
                        }))])], ["RegExpExecArray", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>(["groups"])
                        }))])], ["Intl", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>(["PluralRules"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>(["RelativeTimeFormat", "Locale", "DisplayNames"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2021",
                            props: RuntimeSlice.literal<gostring>(["ListFormat", "DateTimeFormat"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["Segmenter"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2025",
                            props: RuntimeSlice.literal<gostring>(["DurationFormat"])
                        }))])], ["NumberFormat", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2018",
                            props: RuntimeSlice.literal<gostring>(["formatToParts"])
                        }))])], ["SymbolConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>(["matchAll"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>(["metadata", "dispose", "asyncDispose"])
                        }))])], ["DataView", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>(["setBigInt64", "setBigUint64", "getBigInt64", "getBigUint64"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2025",
                            props: RuntimeSlice.literal<gostring>(["setFloat16", "getFloat16"])
                        }))])], ["BigInt", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["RelativeTimeFormat", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>(["format", "formatToParts", "resolvedOptions"])
                        }))])], ["Int8Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Uint8Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Uint8ClampedArray", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Int16Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Uint16Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Int32Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Uint32Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Float16Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2025",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["Float32Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Float64Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["BigInt64Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>([])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["BigUint64Array", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2020",
                            props: RuntimeSlice.literal<gostring>([])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["at"])
                        })), FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2023",
                            props: RuntimeSlice.literal<gostring>(["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"])
                        }))])], ["Error", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "es2022",
                            props: RuntimeSlice.literal<gostring>(["cause"])
                        }))])], ["ErrorConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>(["isError"])
                        }))])], ["Uint8ArrayConstructor", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>(["fromBase64", "fromHex"])
                        }))])], ["DisposableStack", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["AsyncDisposableStack", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>([])
                        }))])], ["Date", RuntimeSlice.literal<FeatureMapEntry__from_checker$Storage>([FeatureMapEntry.$storageOf(FeatureMapEntry.$fromStorage({
                            lib: "esnext",
                            props: RuntimeSlice.literal<gostring>(["toTemporalInstant"])
                        }))])]]);
        });
    }
}
export { AssignmentReducedKey, CacheHashKey, CacheHashKey$Storage, CachedSignatureKey, CachedTypeKey, CachedTypeKind, CachedTypeKindApparentType$constant, CachedTypeKindArrayLiteralType$constant, CachedTypeKindAwaitedType$constant, CachedTypeKindDecoratorContext$constant, CachedTypeKindDecoratorContextPrivate$constant, CachedTypeKindDecoratorContextPrivateStatic$constant, CachedTypeKindDecoratorContextStatic$constant, CachedTypeKindDefaultOnlyType$constant, CachedTypeKindEquivalentBaseType$constant, CachedTypeKindEvolvingArrayType$constant, CachedTypeKindIndexType$constant, CachedTypeKindIndexedAccessForReading$constant, CachedTypeKindIndexedAccessForWriting$constant, CachedTypeKindLiteralUnionBaseType$constant, CachedTypeKindPermissiveInstantiation$constant, CachedTypeKindPromisedTypeOfPromise$constant, CachedTypeKindRegularObjectLiteral$constant, CachedTypeKindRestrictiveInstantiation$constant, CachedTypeKindRestrictiveTypeParameter$constant, CachedTypeKindStringIndexType$constant, CachedTypeKindSyntheticType$constant, CachedTypeKindWidened$constant, CallState, CheckMode, CheckModeContextual$constant, CheckModeForceTuple$constant, CheckModeInferential$constant, CheckModeIsForSignatureHelp$constant, CheckModeNormal$constant, CheckModeRestBindingElement$constant, CheckModeSkipContextSensitive$constant, CheckModeSkipGenericFunctions$constant, CheckModeTypeOnly$constant, Checker, ContextualInfo, ContextualInfo$Storage, DeclarationMeaning, DeclarationMeaningGetAccessor$constant, DeclarationMeaningGetOrSetAccessor$constant, DeclarationMeaningMethod$constant, DeclarationMeaningPropertyAssignment$constant, DeclarationMeaningSetAccessor$constant, DeclarationSpaces, DeclarationSpacesExportNamespace$constant, DeclarationSpacesExportType$constant, DeclarationSpacesExportValue$constant, DeclarationSpacesNone$constant, DiscriminatedContextualTypeKey, EnumLiteralKey, EnumRelationKey, ExportCollision, FlowLoopInfo, FlowLoopInfo$Storage, FlowLoopKey, FlowLoopKey$Storage, Host, Host$contract, Host$is, InferenceContext, InferenceContextInfo, InferenceContextInfo$Storage, InferenceFlags, InferenceFlagsAnyDefault$constant, InferenceFlagsNoDefault$constant, InferenceFlagsNone$constant, InferenceFlagsSkippedGenericFunction$constant, InferenceInfo, InferencePriority, InferencePriorityAlwaysStrict$constant, InferencePriorityCircularity$constant, InferencePriorityContravariantConditional$constant, InferencePriorityHomomorphicMappedType$constant, InferencePriorityLiteralKeyof$constant, InferencePriorityMappedTypeConstraint$constant, InferencePriorityMaxValue$constant, InferencePriorityNakedTypeVariable$constant, InferencePriorityNoConstraints$constant, InferencePriorityNone$constant, InferencePriorityPartialHomomorphicMappedType$constant, InferencePriorityPriorityImpliesCombination$constant, InferencePriorityReturnType$constant, InferencePrioritySpeculativeTuple$constant, InferencePrioritySubstituteSource$constant, InheritanceInfo, InstantiationExpressionKey, IntersectionFlags, IntersectionFlagsNoConstraintReduction$constant, IntersectionFlagsNoSupertypeReduction$constant, IntersectionFlagsNone$constant, IntraExpressionInferenceSite, IntraExpressionInferenceSite$Storage, IntrinsicTypeKind, IntrinsicTypeKindCapitalize$constant, IntrinsicTypeKindLowercase$constant, IntrinsicTypeKindNoInfer$constant, IntrinsicTypeKindUncapitalize$constant, IntrinsicTypeKindUnknown$constant, IntrinsicTypeKindUppercase$constant, IterationTypeKind, IterationTypeKindNext$constant, IterationTypeKindReturn$constant, IterationTypeKindYield$constant, IterationTypes, IterationTypes$Storage, IterationTypesKey, IterationTypesResolver, IterationUse, IterationUseAllowsAsyncIterablesFlag$constant, IterationUseAllowsStringInputFlag$constant, IterationUseAllowsSyncIterablesFlag$constant, IterationUseAsyncGeneratorReturnType$constant, IterationUseAsyncYieldStar$constant, IterationUseCacheFlags$constant, IterationUseDestructuring$constant, IterationUseDestructuringFlag$constant, IterationUseElement$constant, IterationUseForAwaitOf$constant, IterationUseForOf$constant, IterationUseForOfFlag$constant, IterationUseGeneratorReturnType$constant, IterationUsePossiblyOutOfBounds$constant, IterationUseSpread$constant, IterationUseSpreadFlag$constant, IterationUseYieldStar$constant, IterationUseYieldStarFlag$constant, MappedTypeModifiers, MappedTypeModifiersExcludeOptional$constant, MappedTypeModifiersExcludeReadonly$constant, MappedTypeModifiersIncludeOptional$constant, MappedTypeModifiersIncludeReadonly$constant, MappedTypeNameTypeKind, MappedTypeNameTypeKindFiltering$constant, MappedTypeNameTypeKindNone$constant, MappedTypeNameTypeKindRemapping$constant, NarrowedTypeKey, NewChecker, NonExistentPropertyKey, ObjectLiteralDiscriminator, PredicateSemantics, PredicateSemanticsAlways$constant, PredicateSemanticsNever$constant, PredicateSemanticsSometimes$constant, Program, Program$contract, Program$is, PropertiesTypesKey, ReferenceHint, ReferenceHintDecorator$constant, ReferenceHintExportAssignment$constant, ReferenceHintExportImportEquals$constant, ReferenceHintExportSpecifier$constant, ReferenceHintIdentifier$constant, ReferenceHintJsx$constant, ReferenceHintProperty$constant, ReferenceHintUnspecified$constant, ReverseMappedTypeKey, StringMappingKey, SubstitutionTypeKey, TupleNormalizer, TypeFacts, TypeFactsAll$constant, TypeFactsAllTypeofNE$constant, TypeFactsAndFactsMask$constant, TypeFactsBigIntFacts$constant, TypeFactsBigIntStrictFacts$constant, TypeFactsBooleanFacts$constant, TypeFactsBooleanStrictFacts$constant, TypeFactsEQNull$constant, TypeFactsEQUndefined$constant, TypeFactsEQUndefinedOrNull$constant, TypeFactsEmptyObjectFacts$constant, TypeFactsEmptyObjectStrictFacts$constant, TypeFactsEmptyStringFacts$constant, TypeFactsEmptyStringStrictFacts$constant, TypeFactsFalseFacts$constant, TypeFactsFalseStrictFacts$constant, TypeFactsFalsy$constant, TypeFactsFunctionFacts$constant, TypeFactsFunctionStrictFacts$constant, TypeFactsIsNull$constant, TypeFactsIsUndefined$constant, TypeFactsIsUndefinedOrNull$constant, TypeFactsNENull$constant, TypeFactsNEUndefined$constant, TypeFactsNEUndefinedOrNull$constant, TypeFactsNonEmptyStringFacts$constant, TypeFactsNonEmptyStringStrictFacts$constant, TypeFactsNonZeroBigIntFacts$constant, TypeFactsNonZeroBigIntStrictFacts$constant, TypeFactsNonZeroNumberFacts$constant, TypeFactsNonZeroNumberStrictFacts$constant, TypeFactsNone$constant, TypeFactsNullFacts$constant, TypeFactsNumberFacts$constant, TypeFactsNumberStrictFacts$constant, TypeFactsObjectFacts$constant, TypeFactsObjectStrictFacts$constant, TypeFactsOrFactsMask$constant, TypeFactsStringFacts$constant, TypeFactsStringStrictFacts$constant, TypeFactsSymbolFacts$constant, TypeFactsSymbolStrictFacts$constant, TypeFactsTrueFacts$constant, TypeFactsTrueStrictFacts$constant, TypeFactsTruthy$constant, TypeFactsTypeofEQBigInt$constant, TypeFactsTypeofEQBoolean$constant, TypeFactsTypeofEQFunction$constant, TypeFactsTypeofEQHostObject$constant, TypeFactsTypeofEQNumber$constant, TypeFactsTypeofEQObject$constant, TypeFactsTypeofEQString$constant, TypeFactsTypeofEQSymbol$constant, TypeFactsTypeofNEBigInt$constant, TypeFactsTypeofNEBoolean$constant, TypeFactsTypeofNEFunction$constant, TypeFactsTypeofNEHostObject$constant, TypeFactsTypeofNENumber$constant, TypeFactsTypeofNEObject$constant, TypeFactsTypeofNEString$constant, TypeFactsTypeofNESymbol$constant, TypeFactsUndefinedFacts$constant, TypeFactsUnknownFacts$constant, TypeFactsVoidFacts$constant, TypeFactsZeroBigIntFacts$constant, TypeFactsZeroBigIntStrictFacts$constant, TypeFactsZeroNumberFacts$constant, TypeFactsZeroNumberStrictFacts$constant, TypeResolution, TypeResolution$Storage, TypeSystemEntity, TypeSystemEntity$contract, TypeSystemEntity$is, TypeSystemPropertyName, TypeSystemPropertyNameAliasTarget$constant, TypeSystemPropertyNameDeclaredType$constant, TypeSystemPropertyNameInitializerIsUndefined$constant, TypeSystemPropertyNameResolvedBaseConstraint$constant, TypeSystemPropertyNameResolvedBaseConstructorType$constant, TypeSystemPropertyNameResolvedBaseTypes$constant, TypeSystemPropertyNameResolvedReturnType$constant, TypeSystemPropertyNameResolvedTypeArguments$constant, TypeSystemPropertyNameType$constant, TypeSystemPropertyNameWriteType$constant, UnionOfUnionKey, UnionReduction, UnionReductionLiteral$constant, UnionReductionNone$constant, UnionReductionSubtype$constant, UnusedKind, UnusedKindLocal$constant, UnusedKindParameter$constant, WideningContext, WideningKind, WideningKindFunctionReturn$constant, WideningKindGeneratorNext$constant, WideningKindGeneratorYield$constant, WideningKindNormal$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
export { DeclarationFileLinks, DeclarationFileLinks$Storage, DeclarationLinks, DeclarationLinks$Storage, EmitResolver, JSXLinks, JSXLinks$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/emitresolver.js";
export { GetDeclarationModifierFlagsFromSymbol, GetPropertyNameFromType, IsTupleType, IsTypeUsableAsPropertyName } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/exports.js";
export { FlowState, FlowType, FlowType$Storage, SharedFlow, SharedFlow$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/flow.js";
export { InferenceKey, InferenceState } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/inference.js";
export { JsxElaborationElement, JsxElementLinks, JsxElementLinks$Storage, JsxFlags, JsxFlagsIntrinsicIndexedElement$constant, JsxFlagsIntrinsicNamedElement$constant, JsxReferenceKind, JsxReferenceKindComponent$constant, JsxReferenceKindFunction$constant, JsxReferenceKindMixed$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/jsx.js";
export { ArrayToSingleTypeMapper, ArrayTypeMapper, CompositeTypeMapper, DeferredTypeMapper, FunctionTypeMapper, InferenceTypeMapper, MergedTypeMapper, SimpleTypeMapper, TypeMapper, TypeMapperBase, TypeMapperData, TypeMapperData$contract, TypeMapperData$is, TypeMapperKind, TypeMapperKindArray$constant, TypeMapperKindMerged$constant, TypeMapperKindSimple$constant, TypeMapperKindUnknown$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/mapper.js";
export { NewNodeBuilder, NewNodeBuilderEx, NodeBuilder, VerbosityContext } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilder.js";
export { CompositeSymbolIdentity, CompositeTypeCacheIdentity, MAX_REVERSE_MAPPED_NESTING_INSPECTION_DEPTH$int, NodeBuilderContext, NodeBuilderImpl, NodeBuilderLinks, NodeBuilderLinks$Storage, NodeBuilderSymbolLinks, NodeBuilderSymbolLinks$Storage, SerializedTypeEntry, SignatureToSignatureDeclarationOptions, TrackedSymbolArgs, TryGetModuleSpecifierFromDeclaration } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilderimpl.js";
export { Discriminator, Discriminator$contract, Discriminator$is, ErrorChain, ErrorReporter, ExpandingFlags, ExpandingFlagsBoth$constant, ExpandingFlagsSource$constant, ExpandingFlagsTarget$constant, IntersectionState, IntersectionStateNone$constant, IntersectionStateSource$constant, IntersectionStateTarget$constant, MinArgumentCountFlags, MinArgumentCountFlagsNone$constant, MinArgumentCountFlagsStrongArityForUntypedJS$constant, MinArgumentCountFlagsVoidIsNonOptional$constant, RecursionFlags, RecursionFlagsBoth$constant, RecursionFlagsSource$constant, RecursionFlagsTarget$constant, RecursionId, RecursionId$Storage, Relater, Relation, RelationComparisonResult, RelationComparisonResultComplexityOverflow$constant, RelationComparisonResultFailed$constant, RelationComparisonResultNone$constant, RelationComparisonResultOverflow$constant, RelationComparisonResultReportsUnmeasurable$constant, RelationComparisonResultReportsUnreliable$constant, RelationComparisonResultStackDepthOverflow$constant, RelationComparisonResultSucceeded$constant, SignatureCheckMode, SignatureCheckModeBivariantCallback$constant, SignatureCheckModeCallback$constant, SignatureCheckModeIgnoreReturnTypes$constant, SignatureCheckModeNone$constant, SignatureCheckModeStrictArity$constant, SignatureCheckModeStrictCallback$constant, SignatureCheckModeStrictTopSignature$constant, TypeDiscriminator } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/relater.js";
export { GetResolvedSignatureForSignatureHelp } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/services.js";
export { NewSymbolTrackerImpl, SymbolTrackerImpl } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/symboltracker.js";
export { NewTracer, Tracer } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/tracer.js";
export { AccessFlags, AccessFlagsAllowMissing$constant, AccessFlagsCacheSymbol$constant, AccessFlagsContextual$constant, AccessFlagsExpressionPosition$constant, AccessFlagsIncludeUndefined$constant, AccessFlagsNoIndexSignatures$constant, AccessFlagsNone$constant, AccessFlagsPersistent$constant, AccessFlagsReportDeprecated$constant, AccessFlagsSuppressNoImplicitAnyError$constant, AccessFlagsWriting$constant, AliasSymbolLinks, AliasSymbolLinks$Storage, ArrayLiteralLinks, ArrayLiteralLinks$Storage, AssertionLinks, AssertionLinks$Storage, CompositeSignature, ConditionalRoot, ConditionalType, ConstrainedType, ContainingSymbolLinks, ContainingSymbolLinks$Storage, ContextFlags, ContextFlagsIgnoreNodeInferences$constant, ContextFlagsNoConstraints$constant, ContextFlagsNone$constant, ContextFlagsSignature$constant, ContextFlagsSkipBindingPatterns$constant, DeclaredTypeLinks, DeclaredTypeLinks$Storage, DeferredSymbolLinks, DeferredSymbolLinks$Storage, ElementFlags, ElementFlagsFixed$constant, ElementFlagsNonRequired$constant, ElementFlagsNonRest$constant, ElementFlagsNone$constant, ElementFlagsOptional$constant, ElementFlagsRequired$constant, ElementFlagsRest$constant, ElementFlagsVariable$constant, ElementFlagsVariadic$constant, EnumMemberLinks, EnumMemberLinks$Storage, EvolvingArrayType, ExhaustiveState, ExhaustiveStateComputing$constant, ExhaustiveStateFalse$constant, ExhaustiveStateTrue$constant, ExhaustiveStateUnknown$constant, ExportTypeLinks, ExportTypeLinks$Storage, ExternalEmitHelpers, ExternalEmitHelpersAddDisposableResourceAndDisposeResources$constant, ExternalEmitHelpersAsyncDelegator$constant, ExternalEmitHelpersAsyncDelegatorIncludes$constant, ExternalEmitHelpersAsyncGenerator$constant, ExternalEmitHelpersAsyncGeneratorIncludes$constant, ExternalEmitHelpersAsyncValues$constant, ExternalEmitHelpersAwait$constant, ExternalEmitHelpersAwaiter$constant, ExternalEmitHelpersClassPrivateFieldGet$constant, ExternalEmitHelpersClassPrivateFieldIn$constant, ExternalEmitHelpersClassPrivateFieldSet$constant, ExternalEmitHelpersDecorate$constant, ExternalEmitHelpersESDecorateAndRunInitializers$constant, ExternalEmitHelpersExportStar$constant, ExternalEmitHelpersFirstEmitHelper$constant, ExternalEmitHelpersForAwaitOfIncludes$constant, ExternalEmitHelpersImportDefault$constant, ExternalEmitHelpersImportStar$constant, ExternalEmitHelpersLastEmitHelper$constant, ExternalEmitHelpersMakeTemplateObject$constant, ExternalEmitHelpersMetadata$constant, ExternalEmitHelpersParam$constant, ExternalEmitHelpersPropKey$constant, ExternalEmitHelpersRest$constant, ExternalEmitHelpersRewriteRelativeImportExtension$constant, ExternalEmitHelpersSetFunctionName$constant, FormatTypeFlags, IndexFlags, IndexFlagsNoIndexSignatures$constant, IndexFlagsNoReducibleCheck$constant, IndexFlagsNone$constant, IndexFlagsStringsOnly$constant, IndexInfo, IndexInfo$Storage, IndexType, IndexedAccessType, InstantiationExpressionType, InterfaceType, IntersectionType, IntrinsicType, LanguageFeatureMinimumTargetMap, LanguageFeatureMinimumTargetMap$Storage, LateBoundLinks, LateBoundLinks$Storage, LiteralType, MappedSymbolLinks, MappedSymbolLinks$Storage, MappedType, MarkedAssignmentSymbolLinks, MarkedAssignmentSymbolLinks$Storage, MembersAndExportsLinks, MembersOrExportsResolutionKind, MembersOrExportsResolutionKindResolvedExports$constant, MembersOrExportsResolutionKindResolvedMembers$constant, ModuleSymbolLinks, ModuleSymbolLinks$Storage, NodeCheckFlags, NodeCheckFlagsAssignmentsMarked$constant, NodeCheckFlagsContainsClassWithPrivateIdentifiers$constant, NodeCheckFlagsContainsSuperPropertyInStaticInitializer$constant, NodeCheckFlagsContextChecked$constant, NodeCheckFlagsEnumValuesComputed$constant, NodeCheckFlagsInCheckIdentifier$constant, NodeCheckFlagsInitializerIsUndefined$constant, NodeCheckFlagsInitializerIsUndefinedComputed$constant, NodeCheckFlagsTypeChecked$constant, NodeLinks, NodeLinks$Storage, ObjectFlags, ObjectFlagsAnonymous$constant, ObjectFlagsClass$constant, ObjectFlagsClassOrInterface$constant, ObjectFlagsContainsIntersections$uint32, ObjectFlagsContainsObjectOrArrayLiteral$constant, ObjectFlagsContainsSpread$uint32, ObjectFlagsContainsWideningType$constant, ObjectFlagsCouldContainTypeVariables$constant, ObjectFlagsCouldContainTypeVariablesComputed$constant, ObjectFlagsEvolvingArray$constant, ObjectFlagsFreshLiteral$constant, ObjectFlagsFromTypeNode$uint32, ObjectFlagsIdenticalBaseTypeCalculated$uint32, ObjectFlagsInstantiated$constant, ObjectFlagsInstantiatedMapped$constant, ObjectFlagsInstantiationExpressionType$uint32, ObjectFlagsInterface$constant, ObjectFlagsIsClassInstanceClone$uint32, ObjectFlagsIsConstrainedTypeVariable$uint32, ObjectFlagsIsGenericIndexType$uint32, ObjectFlagsIsGenericObjectType$uint32, ObjectFlagsIsGenericType$uint32, ObjectFlagsIsGenericTypeComputed$uint32, ObjectFlagsIsNeverIntersection$uint32, ObjectFlagsIsNeverIntersectionComputed$uint32, ObjectFlagsIsUnknownLikeUnion$uint32, ObjectFlagsIsUnknownLikeUnionComputed$uint32, ObjectFlagsJSLiteral$constant, ObjectFlagsJsxAttributes$constant, ObjectFlagsMapped$constant, ObjectFlagsMembersResolved$constant, ObjectFlagsNonInferrableType$constant, ObjectFlagsNone$constant, ObjectFlagsObjectLiteral$constant, ObjectFlagsObjectLiteralPatternWithComputedProperties$constant, ObjectFlagsObjectRestType$uint32, ObjectFlagsObjectTypeKindMask$constant, ObjectFlagsPrimitiveUnion$constant, ObjectFlagsPropagatingFlags$constant, ObjectFlagsReference$constant, ObjectFlagsRequiresWidening$constant, ObjectFlagsReverseMapped$constant, ObjectFlagsSingleSignatureType$uint32, ObjectFlagsTuple$constant, ObjectFlagsUnresolvedMembers$uint32, ObjectType, ReverseMappedSymbolLinks, ReverseMappedSymbolLinks$Storage, ReverseMappedType, Signature, Signature$Storage, SignatureFlags, SignatureFlagsAbstract$constant, SignatureFlagsCallChainFlags$constant, SignatureFlagsConstruct$constant, SignatureFlagsHasLiteralTypes$constant, SignatureFlagsHasRestParameter$constant, SignatureFlagsIsInnerCallChain$constant, SignatureFlagsIsNonInferrable$constant, SignatureFlagsIsOuterCallChain$constant, SignatureFlagsIsSignatureCandidateForOverloadFailure$constant, SignatureFlagsIsUntypedSignatureInJSFile$constant, SignatureFlagsNone$constant, SignatureFlagsPropagatingFlags$constant, SignatureKind, SignatureKindCall$constant, SignatureKindConstruct$constant, SignatureLinks, SignatureLinks$Storage, SourceFileLinks, SourceFileLinks$Storage, SpreadLinks, SpreadLinks$Storage, StringMappingType, StructuredType, SubstitutionType, SwitchStatementLinks, SwitchStatementLinks$Storage, SymbolFormatFlags, SymbolFormatFlagsAllowAnyNodeKind$constant, SymbolFormatFlagsDoNotIncludeSymbolChain$constant, SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope$constant, SymbolFormatFlagsUseOnlyExternalAliasing$constant, SymbolFormatFlagsWriteComputedProps$constant, SymbolFormatFlagsWriteTypeParametersOrArguments$constant, SymbolNodeLinks, SymbolNodeLinks$Storage, SymbolReferenceLinks, SymbolReferenceLinks$Storage, TemplateLiteralType, Ternary, TernaryFalse$constant, TernaryMaybe$constant, TernaryTrue$constant, TernaryUnknown$constant, TupleElementInfo, TupleElementInfo$Storage, TupleType, Type, TypeAlias, TypeAliasLinks, TypeAliasLinks$Storage, TypeBase, TypeComparer, TypeData, TypeData$contract, TypeData$is, TypeFlags, TypeFlagsAny$constant, TypeFlagsAnyOrUnknown$constant, TypeFlagsBigInt$constant, TypeFlagsBigIntLike$constant, TypeFlagsBigIntLiteral$constant, TypeFlagsBoolean$constant, TypeFlagsBooleanLike$constant, TypeFlagsBooleanLiteral$constant, TypeFlagsConditional$constant, TypeFlagsDefinitelyNonNullable$constant, TypeFlagsDisjointDomains$constant, TypeFlagsESSymbol$constant, TypeFlagsESSymbolLike$constant, TypeFlagsEnum$constant, TypeFlagsEnumLike$constant, TypeFlagsEnumLiteral$constant, TypeFlagsFreshable$constant, TypeFlagsIncludesConstrainedTypeVariable$constant, TypeFlagsIncludesEmptyObject$constant, TypeFlagsIncludesError$constant, TypeFlagsIncludesInstantiable$constant, TypeFlagsIncludesMask$constant, TypeFlagsIncludesMissingType$constant, TypeFlagsIncludesNonWideningType$constant, TypeFlagsIncludesWildcard$constant, TypeFlagsIndex$constant, TypeFlagsIndexedAccess$constant, TypeFlagsInstantiable$constant, TypeFlagsInstantiableNonPrimitive$constant, TypeFlagsIntersection$constant, TypeFlagsIntrinsic$constant, TypeFlagsLiteral$constant, TypeFlagsNever$constant, TypeFlagsNonPrimitive$constant, TypeFlagsNone$constant, TypeFlagsNotPrimitiveUnion$constant, TypeFlagsNull$constant, TypeFlagsNullable$constant, TypeFlagsNumber$constant, TypeFlagsNumberLike$constant, TypeFlagsNumberLiteral$constant, TypeFlagsObject$constant, TypeFlagsObjectFlagsType$constant, TypeFlagsPrimitive$constant, TypeFlagsSimplifiable$constant, TypeFlagsSingleton$constant, TypeFlagsString$constant, TypeFlagsStringLike$constant, TypeFlagsStringLiteral$constant, TypeFlagsStringMapping$constant, TypeFlagsStringOrNumberLiteral$constant, TypeFlagsStringOrNumberLiteralOrUnique$constant, TypeFlagsStructuredOrInstantiable$constant, TypeFlagsStructuredType$constant, TypeFlagsSubstitution$constant, TypeFlagsTemplateLiteral$constant, TypeFlagsTypeParameter$constant, TypeFlagsTypeVariable$constant, TypeFlagsUndefined$constant, TypeFlagsUnion$constant, TypeFlagsUnionOrIntersection$constant, TypeFlagsUniqueESSymbol$constant, TypeFlagsUnit$constant, TypeFlagsUnknown$constant, TypeFlagsVoid$constant, TypeFlagsVoidLike$constant, TypeFlags_String, TypeFormatFlags, TypeFormatFlagsMultilineObjectLiterals$constant, TypeFormatFlagsNoTruncation$constant, TypeFormatFlagsNoTypeReduction$constant, TypeFormatFlagsNodeBuilderFlagsMask$constant, TypeFormatFlagsNone$constant, TypeFormatFlagsUseAliasDefinedOutsideCurrentScope$constant, TypeFormatFlagsUseFullyQualifiedType$constant, TypeFormatFlagsWriteArrayAsGenericType$constant, TypeFormatFlagsWriteArrowStyleSignature$constant, TypeFormatFlagsWriteCallStyleSignature$constant, TypeId, TypeNodeLinks, TypeNodeLinks$Storage, TypeParameter, TypePredicate, TypePredicateKind, TypePredicateKindAssertsIdentifier$constant, TypePredicateKindAssertsThis$constant, TypePredicateKindIdentifier$constant, TypePredicateKindThis$constant, TypeReference, UnionOrIntersectionType, UnionType, UniqueESSymbolType, ValueSymbolLinks, ValueSymbolLinks$Storage, VarianceFlags, VarianceFlagsAllowsStructuralFallback$constant, VarianceFlagsBivariant$constant, VarianceFlagsContravariant$constant, VarianceFlagsCovariant$constant, VarianceFlagsIndependent$constant, VarianceFlagsInvariant$constant, VarianceFlagsUnmeasurable$constant, VarianceFlagsUnreliable$constant, VarianceFlagsVarianceMask$constant, VarianceFlags_String, VarianceLinks, VarianceLinks$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
export { AssignmentKind, AssignmentKindCompound$constant, AssignmentKindDefinite$constant, AssignmentKindNone$constant, CompareTypes, CreateModeMismatchDetails, CreateModuleNotFoundChain, DiagnosticDetails, FeatureMapEntry, FeatureMapEntry$Storage, GetSetAccessorValueParameter, IsExternalModuleSymbol, IsInTypeQuery, IsKnownSymbol, IsPrivateIdentifierSymbol, IsTypeAny, NewDiagnosticChainForNode, NewDiagnosticForNode, SkipAlias, ValueToString } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/utilities.js";
export let AccessFlagsAllowMissing: ReturnType<typeof AccessFlagsAllowMissing$constant>;
export let AccessFlagsCacheSymbol: ReturnType<typeof AccessFlagsCacheSymbol$constant>;
export let AccessFlagsContextual: ReturnType<typeof AccessFlagsContextual$constant>;
export let AccessFlagsExpressionPosition: ReturnType<typeof AccessFlagsExpressionPosition$constant>;
export let AccessFlagsIncludeUndefined: ReturnType<typeof AccessFlagsIncludeUndefined$constant>;
export let AccessFlagsNoIndexSignatures: ReturnType<typeof AccessFlagsNoIndexSignatures$constant>;
export let AccessFlagsNone: ReturnType<typeof AccessFlagsNone$constant>;
export let AccessFlagsPersistent: ReturnType<typeof AccessFlagsPersistent$constant>;
export let AccessFlagsReportDeprecated: ReturnType<typeof AccessFlagsReportDeprecated$constant>;
export let AccessFlagsSuppressNoImplicitAnyError: ReturnType<typeof AccessFlagsSuppressNoImplicitAnyError$constant>;
export let AccessFlagsWriting: ReturnType<typeof AccessFlagsWriting$constant>;
export let AssignmentKindCompound: ReturnType<typeof AssignmentKindCompound$constant>;
export let AssignmentKindDefinite: ReturnType<typeof AssignmentKindDefinite$constant>;
export let AssignmentKindNone: ReturnType<typeof AssignmentKindNone$constant>;
export let CachedTypeKindApparentType: ReturnType<typeof CachedTypeKindApparentType$constant>;
export let CachedTypeKindArrayLiteralType: ReturnType<typeof CachedTypeKindArrayLiteralType$constant>;
export let CachedTypeKindAwaitedType: ReturnType<typeof CachedTypeKindAwaitedType$constant>;
export let CachedTypeKindDecoratorContext: ReturnType<typeof CachedTypeKindDecoratorContext$constant>;
export let CachedTypeKindDecoratorContextPrivate: ReturnType<typeof CachedTypeKindDecoratorContextPrivate$constant>;
export let CachedTypeKindDecoratorContextPrivateStatic: ReturnType<typeof CachedTypeKindDecoratorContextPrivateStatic$constant>;
export let CachedTypeKindDecoratorContextStatic: ReturnType<typeof CachedTypeKindDecoratorContextStatic$constant>;
export let CachedTypeKindDefaultOnlyType: ReturnType<typeof CachedTypeKindDefaultOnlyType$constant>;
export let CachedTypeKindEquivalentBaseType: ReturnType<typeof CachedTypeKindEquivalentBaseType$constant>;
export let CachedTypeKindEvolvingArrayType: ReturnType<typeof CachedTypeKindEvolvingArrayType$constant>;
export let CachedTypeKindIndexType: ReturnType<typeof CachedTypeKindIndexType$constant>;
export let CachedTypeKindIndexedAccessForReading: ReturnType<typeof CachedTypeKindIndexedAccessForReading$constant>;
export let CachedTypeKindIndexedAccessForWriting: ReturnType<typeof CachedTypeKindIndexedAccessForWriting$constant>;
export let CachedTypeKindLiteralUnionBaseType: ReturnType<typeof CachedTypeKindLiteralUnionBaseType$constant>;
export let CachedTypeKindPermissiveInstantiation: ReturnType<typeof CachedTypeKindPermissiveInstantiation$constant>;
export let CachedTypeKindPromisedTypeOfPromise: ReturnType<typeof CachedTypeKindPromisedTypeOfPromise$constant>;
export let CachedTypeKindRegularObjectLiteral: ReturnType<typeof CachedTypeKindRegularObjectLiteral$constant>;
export let CachedTypeKindRestrictiveInstantiation: ReturnType<typeof CachedTypeKindRestrictiveInstantiation$constant>;
export let CachedTypeKindRestrictiveTypeParameter: ReturnType<typeof CachedTypeKindRestrictiveTypeParameter$constant>;
export let CachedTypeKindStringIndexType: ReturnType<typeof CachedTypeKindStringIndexType$constant>;
export let CachedTypeKindSyntheticType: ReturnType<typeof CachedTypeKindSyntheticType$constant>;
export let CachedTypeKindWidened: ReturnType<typeof CachedTypeKindWidened$constant>;
export let CheckModeContextual: ReturnType<typeof CheckModeContextual$constant>;
export let CheckModeForceTuple: ReturnType<typeof CheckModeForceTuple$constant>;
export let CheckModeInferential: ReturnType<typeof CheckModeInferential$constant>;
export let CheckModeIsForSignatureHelp: ReturnType<typeof CheckModeIsForSignatureHelp$constant>;
export let CheckModeNormal: ReturnType<typeof CheckModeNormal$constant>;
export let CheckModeRestBindingElement: ReturnType<typeof CheckModeRestBindingElement$constant>;
export let CheckModeSkipContextSensitive: ReturnType<typeof CheckModeSkipContextSensitive$constant>;
export let CheckModeSkipGenericFunctions: ReturnType<typeof CheckModeSkipGenericFunctions$constant>;
export let CheckModeTypeOnly: ReturnType<typeof CheckModeTypeOnly$constant>;
export let ContextFlagsIgnoreNodeInferences: ReturnType<typeof ContextFlagsIgnoreNodeInferences$constant>;
export let ContextFlagsNoConstraints: ReturnType<typeof ContextFlagsNoConstraints$constant>;
export let ContextFlagsNone: ReturnType<typeof ContextFlagsNone$constant>;
export let ContextFlagsSignature: ReturnType<typeof ContextFlagsSignature$constant>;
export let ContextFlagsSkipBindingPatterns: ReturnType<typeof ContextFlagsSkipBindingPatterns$constant>;
export let DeclarationMeaningGetAccessor: ReturnType<typeof DeclarationMeaningGetAccessor$constant>;
export let DeclarationMeaningGetOrSetAccessor: ReturnType<typeof DeclarationMeaningGetOrSetAccessor$constant>;
export let DeclarationMeaningMethod: ReturnType<typeof DeclarationMeaningMethod$constant>;
export let DeclarationMeaningPropertyAssignment: ReturnType<typeof DeclarationMeaningPropertyAssignment$constant>;
export let DeclarationMeaningSetAccessor: ReturnType<typeof DeclarationMeaningSetAccessor$constant>;
export let DeclarationSpacesExportNamespace: ReturnType<typeof DeclarationSpacesExportNamespace$constant>;
export let DeclarationSpacesExportType: ReturnType<typeof DeclarationSpacesExportType$constant>;
export let DeclarationSpacesExportValue: ReturnType<typeof DeclarationSpacesExportValue$constant>;
export let DeclarationSpacesNone: ReturnType<typeof DeclarationSpacesNone$constant>;
export let ElementFlagsFixed: ReturnType<typeof ElementFlagsFixed$constant>;
export let ElementFlagsNonRequired: ReturnType<typeof ElementFlagsNonRequired$constant>;
export let ElementFlagsNonRest: ReturnType<typeof ElementFlagsNonRest$constant>;
export let ElementFlagsNone: ReturnType<typeof ElementFlagsNone$constant>;
export let ElementFlagsOptional: ReturnType<typeof ElementFlagsOptional$constant>;
export let ElementFlagsRequired: ReturnType<typeof ElementFlagsRequired$constant>;
export let ElementFlagsRest: ReturnType<typeof ElementFlagsRest$constant>;
export let ElementFlagsVariable: ReturnType<typeof ElementFlagsVariable$constant>;
export let ElementFlagsVariadic: ReturnType<typeof ElementFlagsVariadic$constant>;
export let ExhaustiveStateComputing: ReturnType<typeof ExhaustiveStateComputing$constant>;
export let ExhaustiveStateFalse: ReturnType<typeof ExhaustiveStateFalse$constant>;
export let ExhaustiveStateTrue: ReturnType<typeof ExhaustiveStateTrue$constant>;
export let ExhaustiveStateUnknown: ReturnType<typeof ExhaustiveStateUnknown$constant>;
export let ExpandingFlagsBoth: ReturnType<typeof ExpandingFlagsBoth$constant>;
export let ExpandingFlagsSource: ReturnType<typeof ExpandingFlagsSource$constant>;
export let ExpandingFlagsTarget: ReturnType<typeof ExpandingFlagsTarget$constant>;
export let ExternalEmitHelpersAddDisposableResourceAndDisposeResources: ReturnType<typeof ExternalEmitHelpersAddDisposableResourceAndDisposeResources$constant>;
export let ExternalEmitHelpersAsyncDelegator: ReturnType<typeof ExternalEmitHelpersAsyncDelegator$constant>;
export let ExternalEmitHelpersAsyncDelegatorIncludes: ReturnType<typeof ExternalEmitHelpersAsyncDelegatorIncludes$constant>;
export let ExternalEmitHelpersAsyncGenerator: ReturnType<typeof ExternalEmitHelpersAsyncGenerator$constant>;
export let ExternalEmitHelpersAsyncGeneratorIncludes: ReturnType<typeof ExternalEmitHelpersAsyncGeneratorIncludes$constant>;
export let ExternalEmitHelpersAsyncValues: ReturnType<typeof ExternalEmitHelpersAsyncValues$constant>;
export let ExternalEmitHelpersAwait: ReturnType<typeof ExternalEmitHelpersAwait$constant>;
export let ExternalEmitHelpersAwaiter: ReturnType<typeof ExternalEmitHelpersAwaiter$constant>;
export let ExternalEmitHelpersClassPrivateFieldGet: ReturnType<typeof ExternalEmitHelpersClassPrivateFieldGet$constant>;
export let ExternalEmitHelpersClassPrivateFieldIn: ReturnType<typeof ExternalEmitHelpersClassPrivateFieldIn$constant>;
export let ExternalEmitHelpersClassPrivateFieldSet: ReturnType<typeof ExternalEmitHelpersClassPrivateFieldSet$constant>;
export let ExternalEmitHelpersDecorate: ReturnType<typeof ExternalEmitHelpersDecorate$constant>;
export let ExternalEmitHelpersESDecorateAndRunInitializers: ReturnType<typeof ExternalEmitHelpersESDecorateAndRunInitializers$constant>;
export let ExternalEmitHelpersExportStar: ReturnType<typeof ExternalEmitHelpersExportStar$constant>;
export let ExternalEmitHelpersFirstEmitHelper: ReturnType<typeof ExternalEmitHelpersFirstEmitHelper$constant>;
export let ExternalEmitHelpersForAwaitOfIncludes: ReturnType<typeof ExternalEmitHelpersForAwaitOfIncludes$constant>;
export let ExternalEmitHelpersImportDefault: ReturnType<typeof ExternalEmitHelpersImportDefault$constant>;
export let ExternalEmitHelpersImportStar: ReturnType<typeof ExternalEmitHelpersImportStar$constant>;
export let ExternalEmitHelpersLastEmitHelper: ReturnType<typeof ExternalEmitHelpersLastEmitHelper$constant>;
export let ExternalEmitHelpersMakeTemplateObject: ReturnType<typeof ExternalEmitHelpersMakeTemplateObject$constant>;
export let ExternalEmitHelpersMetadata: ReturnType<typeof ExternalEmitHelpersMetadata$constant>;
export let ExternalEmitHelpersParam: ReturnType<typeof ExternalEmitHelpersParam$constant>;
export let ExternalEmitHelpersPropKey: ReturnType<typeof ExternalEmitHelpersPropKey$constant>;
export let ExternalEmitHelpersRest: ReturnType<typeof ExternalEmitHelpersRest$constant>;
export let ExternalEmitHelpersRewriteRelativeImportExtension: ReturnType<typeof ExternalEmitHelpersRewriteRelativeImportExtension$constant>;
export let ExternalEmitHelpersSetFunctionName: ReturnType<typeof ExternalEmitHelpersSetFunctionName$constant>;
export let IndexFlagsNoIndexSignatures: ReturnType<typeof IndexFlagsNoIndexSignatures$constant>;
export let IndexFlagsNoReducibleCheck: ReturnType<typeof IndexFlagsNoReducibleCheck$constant>;
export let IndexFlagsNone: ReturnType<typeof IndexFlagsNone$constant>;
export let IndexFlagsStringsOnly: ReturnType<typeof IndexFlagsStringsOnly$constant>;
export let InferenceFlagsAnyDefault: ReturnType<typeof InferenceFlagsAnyDefault$constant>;
export let InferenceFlagsNoDefault: ReturnType<typeof InferenceFlagsNoDefault$constant>;
export let InferenceFlagsNone: ReturnType<typeof InferenceFlagsNone$constant>;
export let InferenceFlagsSkippedGenericFunction: ReturnType<typeof InferenceFlagsSkippedGenericFunction$constant>;
export let InferencePriorityAlwaysStrict: ReturnType<typeof InferencePriorityAlwaysStrict$constant>;
export let InferencePriorityCircularity: ReturnType<typeof InferencePriorityCircularity$constant>;
export let InferencePriorityContravariantConditional: ReturnType<typeof InferencePriorityContravariantConditional$constant>;
export let InferencePriorityHomomorphicMappedType: ReturnType<typeof InferencePriorityHomomorphicMappedType$constant>;
export let InferencePriorityLiteralKeyof: ReturnType<typeof InferencePriorityLiteralKeyof$constant>;
export let InferencePriorityMappedTypeConstraint: ReturnType<typeof InferencePriorityMappedTypeConstraint$constant>;
export let InferencePriorityMaxValue: ReturnType<typeof InferencePriorityMaxValue$constant>;
export let InferencePriorityNakedTypeVariable: ReturnType<typeof InferencePriorityNakedTypeVariable$constant>;
export let InferencePriorityNoConstraints: ReturnType<typeof InferencePriorityNoConstraints$constant>;
export let InferencePriorityNone: ReturnType<typeof InferencePriorityNone$constant>;
export let InferencePriorityPartialHomomorphicMappedType: ReturnType<typeof InferencePriorityPartialHomomorphicMappedType$constant>;
export let InferencePriorityPriorityImpliesCombination: ReturnType<typeof InferencePriorityPriorityImpliesCombination$constant>;
export let InferencePriorityReturnType: ReturnType<typeof InferencePriorityReturnType$constant>;
export let InferencePrioritySpeculativeTuple: ReturnType<typeof InferencePrioritySpeculativeTuple$constant>;
export let InferencePrioritySubstituteSource: ReturnType<typeof InferencePrioritySubstituteSource$constant>;
export let IntersectionFlagsNoConstraintReduction: ReturnType<typeof IntersectionFlagsNoConstraintReduction$constant>;
export let IntersectionFlagsNoSupertypeReduction: ReturnType<typeof IntersectionFlagsNoSupertypeReduction$constant>;
export let IntersectionFlagsNone: ReturnType<typeof IntersectionFlagsNone$constant>;
export let IntersectionStateNone: ReturnType<typeof IntersectionStateNone$constant>;
export let IntersectionStateSource: ReturnType<typeof IntersectionStateSource$constant>;
export let IntersectionStateTarget: ReturnType<typeof IntersectionStateTarget$constant>;
export let IntrinsicTypeKindCapitalize: ReturnType<typeof IntrinsicTypeKindCapitalize$constant>;
export let IntrinsicTypeKindLowercase: ReturnType<typeof IntrinsicTypeKindLowercase$constant>;
export let IntrinsicTypeKindNoInfer: ReturnType<typeof IntrinsicTypeKindNoInfer$constant>;
export let IntrinsicTypeKindUncapitalize: ReturnType<typeof IntrinsicTypeKindUncapitalize$constant>;
export let IntrinsicTypeKindUnknown: ReturnType<typeof IntrinsicTypeKindUnknown$constant>;
export let IntrinsicTypeKindUppercase: ReturnType<typeof IntrinsicTypeKindUppercase$constant>;
export let IterationTypeKindNext: ReturnType<typeof IterationTypeKindNext$constant>;
export let IterationTypeKindReturn: ReturnType<typeof IterationTypeKindReturn$constant>;
export let IterationTypeKindYield: ReturnType<typeof IterationTypeKindYield$constant>;
export let IterationUseAllowsAsyncIterablesFlag: ReturnType<typeof IterationUseAllowsAsyncIterablesFlag$constant>;
export let IterationUseAllowsStringInputFlag: ReturnType<typeof IterationUseAllowsStringInputFlag$constant>;
export let IterationUseAllowsSyncIterablesFlag: ReturnType<typeof IterationUseAllowsSyncIterablesFlag$constant>;
export let IterationUseAsyncGeneratorReturnType: ReturnType<typeof IterationUseAsyncGeneratorReturnType$constant>;
export let IterationUseAsyncYieldStar: ReturnType<typeof IterationUseAsyncYieldStar$constant>;
export let IterationUseCacheFlags: ReturnType<typeof IterationUseCacheFlags$constant>;
export let IterationUseDestructuring: ReturnType<typeof IterationUseDestructuring$constant>;
export let IterationUseDestructuringFlag: ReturnType<typeof IterationUseDestructuringFlag$constant>;
export let IterationUseElement: ReturnType<typeof IterationUseElement$constant>;
export let IterationUseForAwaitOf: ReturnType<typeof IterationUseForAwaitOf$constant>;
export let IterationUseForOf: ReturnType<typeof IterationUseForOf$constant>;
export let IterationUseForOfFlag: ReturnType<typeof IterationUseForOfFlag$constant>;
export let IterationUseGeneratorReturnType: ReturnType<typeof IterationUseGeneratorReturnType$constant>;
export let IterationUsePossiblyOutOfBounds: ReturnType<typeof IterationUsePossiblyOutOfBounds$constant>;
export let IterationUseSpread: ReturnType<typeof IterationUseSpread$constant>;
export let IterationUseSpreadFlag: ReturnType<typeof IterationUseSpreadFlag$constant>;
export let IterationUseYieldStar: ReturnType<typeof IterationUseYieldStar$constant>;
export let IterationUseYieldStarFlag: ReturnType<typeof IterationUseYieldStarFlag$constant>;
export let JsxFlagsIntrinsicIndexedElement: ReturnType<typeof JsxFlagsIntrinsicIndexedElement$constant>;
export let JsxFlagsIntrinsicNamedElement: ReturnType<typeof JsxFlagsIntrinsicNamedElement$constant>;
export let JsxReferenceKindComponent: ReturnType<typeof JsxReferenceKindComponent$constant>;
export let JsxReferenceKindFunction: ReturnType<typeof JsxReferenceKindFunction$constant>;
export let JsxReferenceKindMixed: ReturnType<typeof JsxReferenceKindMixed$constant>;
export let MappedTypeModifiersExcludeOptional: ReturnType<typeof MappedTypeModifiersExcludeOptional$constant>;
export let MappedTypeModifiersExcludeReadonly: ReturnType<typeof MappedTypeModifiersExcludeReadonly$constant>;
export let MappedTypeModifiersIncludeOptional: ReturnType<typeof MappedTypeModifiersIncludeOptional$constant>;
export let MappedTypeModifiersIncludeReadonly: ReturnType<typeof MappedTypeModifiersIncludeReadonly$constant>;
export let MappedTypeNameTypeKindFiltering: ReturnType<typeof MappedTypeNameTypeKindFiltering$constant>;
export let MappedTypeNameTypeKindNone: ReturnType<typeof MappedTypeNameTypeKindNone$constant>;
export let MappedTypeNameTypeKindRemapping: ReturnType<typeof MappedTypeNameTypeKindRemapping$constant>;
export let MembersOrExportsResolutionKindResolvedExports: ReturnType<typeof MembersOrExportsResolutionKindResolvedExports$constant>;
export let MembersOrExportsResolutionKindResolvedMembers: ReturnType<typeof MembersOrExportsResolutionKindResolvedMembers$constant>;
export let MinArgumentCountFlagsNone: ReturnType<typeof MinArgumentCountFlagsNone$constant>;
export let MinArgumentCountFlagsStrongArityForUntypedJS: ReturnType<typeof MinArgumentCountFlagsStrongArityForUntypedJS$constant>;
export let MinArgumentCountFlagsVoidIsNonOptional: ReturnType<typeof MinArgumentCountFlagsVoidIsNonOptional$constant>;
export let NodeCheckFlagsAssignmentsMarked: ReturnType<typeof NodeCheckFlagsAssignmentsMarked$constant>;
export let NodeCheckFlagsContainsClassWithPrivateIdentifiers: ReturnType<typeof NodeCheckFlagsContainsClassWithPrivateIdentifiers$constant>;
export let NodeCheckFlagsContainsSuperPropertyInStaticInitializer: ReturnType<typeof NodeCheckFlagsContainsSuperPropertyInStaticInitializer$constant>;
export let NodeCheckFlagsContextChecked: ReturnType<typeof NodeCheckFlagsContextChecked$constant>;
export let NodeCheckFlagsEnumValuesComputed: ReturnType<typeof NodeCheckFlagsEnumValuesComputed$constant>;
export let NodeCheckFlagsInCheckIdentifier: ReturnType<typeof NodeCheckFlagsInCheckIdentifier$constant>;
export let NodeCheckFlagsInitializerIsUndefined: ReturnType<typeof NodeCheckFlagsInitializerIsUndefined$constant>;
export let NodeCheckFlagsInitializerIsUndefinedComputed: ReturnType<typeof NodeCheckFlagsInitializerIsUndefinedComputed$constant>;
export let NodeCheckFlagsTypeChecked: ReturnType<typeof NodeCheckFlagsTypeChecked$constant>;
export let ObjectFlagsAnonymous: ReturnType<typeof ObjectFlagsAnonymous$constant>;
export let ObjectFlagsClass: ReturnType<typeof ObjectFlagsClass$constant>;
export let ObjectFlagsClassOrInterface: ReturnType<typeof ObjectFlagsClassOrInterface$constant>;
export let ObjectFlagsContainsObjectOrArrayLiteral: ReturnType<typeof ObjectFlagsContainsObjectOrArrayLiteral$constant>;
export let ObjectFlagsContainsWideningType: ReturnType<typeof ObjectFlagsContainsWideningType$constant>;
export let ObjectFlagsCouldContainTypeVariables: ReturnType<typeof ObjectFlagsCouldContainTypeVariables$constant>;
export let ObjectFlagsCouldContainTypeVariablesComputed: ReturnType<typeof ObjectFlagsCouldContainTypeVariablesComputed$constant>;
export let ObjectFlagsEvolvingArray: ReturnType<typeof ObjectFlagsEvolvingArray$constant>;
export let ObjectFlagsFreshLiteral: ReturnType<typeof ObjectFlagsFreshLiteral$constant>;
export let ObjectFlagsInstantiated: ReturnType<typeof ObjectFlagsInstantiated$constant>;
export let ObjectFlagsInstantiatedMapped: ReturnType<typeof ObjectFlagsInstantiatedMapped$constant>;
export let ObjectFlagsInterface: ReturnType<typeof ObjectFlagsInterface$constant>;
export let ObjectFlagsJSLiteral: ReturnType<typeof ObjectFlagsJSLiteral$constant>;
export let ObjectFlagsJsxAttributes: ReturnType<typeof ObjectFlagsJsxAttributes$constant>;
export let ObjectFlagsMapped: ReturnType<typeof ObjectFlagsMapped$constant>;
export let ObjectFlagsMembersResolved: ReturnType<typeof ObjectFlagsMembersResolved$constant>;
export let ObjectFlagsNonInferrableType: ReturnType<typeof ObjectFlagsNonInferrableType$constant>;
export let ObjectFlagsNone: ReturnType<typeof ObjectFlagsNone$constant>;
export let ObjectFlagsObjectLiteral: ReturnType<typeof ObjectFlagsObjectLiteral$constant>;
export let ObjectFlagsObjectLiteralPatternWithComputedProperties: ReturnType<typeof ObjectFlagsObjectLiteralPatternWithComputedProperties$constant>;
export let ObjectFlagsObjectTypeKindMask: ReturnType<typeof ObjectFlagsObjectTypeKindMask$constant>;
export let ObjectFlagsPrimitiveUnion: ReturnType<typeof ObjectFlagsPrimitiveUnion$constant>;
export let ObjectFlagsPropagatingFlags: ReturnType<typeof ObjectFlagsPropagatingFlags$constant>;
export let ObjectFlagsReference: ReturnType<typeof ObjectFlagsReference$constant>;
export let ObjectFlagsRequiresWidening: ReturnType<typeof ObjectFlagsRequiresWidening$constant>;
export let ObjectFlagsReverseMapped: ReturnType<typeof ObjectFlagsReverseMapped$constant>;
export let ObjectFlagsTuple: ReturnType<typeof ObjectFlagsTuple$constant>;
export let PredicateSemanticsAlways: ReturnType<typeof PredicateSemanticsAlways$constant>;
export let PredicateSemanticsNever: ReturnType<typeof PredicateSemanticsNever$constant>;
export let PredicateSemanticsSometimes: ReturnType<typeof PredicateSemanticsSometimes$constant>;
export let RecursionFlagsBoth: ReturnType<typeof RecursionFlagsBoth$constant>;
export let RecursionFlagsSource: ReturnType<typeof RecursionFlagsSource$constant>;
export let RecursionFlagsTarget: ReturnType<typeof RecursionFlagsTarget$constant>;
export let ReferenceHintDecorator: ReturnType<typeof ReferenceHintDecorator$constant>;
export let ReferenceHintExportAssignment: ReturnType<typeof ReferenceHintExportAssignment$constant>;
export let ReferenceHintExportImportEquals: ReturnType<typeof ReferenceHintExportImportEquals$constant>;
export let ReferenceHintExportSpecifier: ReturnType<typeof ReferenceHintExportSpecifier$constant>;
export let ReferenceHintIdentifier: ReturnType<typeof ReferenceHintIdentifier$constant>;
export let ReferenceHintJsx: ReturnType<typeof ReferenceHintJsx$constant>;
export let ReferenceHintProperty: ReturnType<typeof ReferenceHintProperty$constant>;
export let ReferenceHintUnspecified: ReturnType<typeof ReferenceHintUnspecified$constant>;
export let RelationComparisonResultComplexityOverflow: ReturnType<typeof RelationComparisonResultComplexityOverflow$constant>;
export let RelationComparisonResultFailed: ReturnType<typeof RelationComparisonResultFailed$constant>;
export let RelationComparisonResultNone: ReturnType<typeof RelationComparisonResultNone$constant>;
export let RelationComparisonResultOverflow: ReturnType<typeof RelationComparisonResultOverflow$constant>;
export let RelationComparisonResultReportsUnmeasurable: ReturnType<typeof RelationComparisonResultReportsUnmeasurable$constant>;
export let RelationComparisonResultReportsUnreliable: ReturnType<typeof RelationComparisonResultReportsUnreliable$constant>;
export let RelationComparisonResultStackDepthOverflow: ReturnType<typeof RelationComparisonResultStackDepthOverflow$constant>;
export let RelationComparisonResultSucceeded: ReturnType<typeof RelationComparisonResultSucceeded$constant>;
export let SignatureCheckModeBivariantCallback: ReturnType<typeof SignatureCheckModeBivariantCallback$constant>;
export let SignatureCheckModeCallback: ReturnType<typeof SignatureCheckModeCallback$constant>;
export let SignatureCheckModeIgnoreReturnTypes: ReturnType<typeof SignatureCheckModeIgnoreReturnTypes$constant>;
export let SignatureCheckModeNone: ReturnType<typeof SignatureCheckModeNone$constant>;
export let SignatureCheckModeStrictArity: ReturnType<typeof SignatureCheckModeStrictArity$constant>;
export let SignatureCheckModeStrictCallback: ReturnType<typeof SignatureCheckModeStrictCallback$constant>;
export let SignatureCheckModeStrictTopSignature: ReturnType<typeof SignatureCheckModeStrictTopSignature$constant>;
export let SignatureFlagsAbstract: ReturnType<typeof SignatureFlagsAbstract$constant>;
export let SignatureFlagsCallChainFlags: ReturnType<typeof SignatureFlagsCallChainFlags$constant>;
export let SignatureFlagsConstruct: ReturnType<typeof SignatureFlagsConstruct$constant>;
export let SignatureFlagsHasLiteralTypes: ReturnType<typeof SignatureFlagsHasLiteralTypes$constant>;
export let SignatureFlagsHasRestParameter: ReturnType<typeof SignatureFlagsHasRestParameter$constant>;
export let SignatureFlagsIsInnerCallChain: ReturnType<typeof SignatureFlagsIsInnerCallChain$constant>;
export let SignatureFlagsIsNonInferrable: ReturnType<typeof SignatureFlagsIsNonInferrable$constant>;
export let SignatureFlagsIsOuterCallChain: ReturnType<typeof SignatureFlagsIsOuterCallChain$constant>;
export let SignatureFlagsIsSignatureCandidateForOverloadFailure: ReturnType<typeof SignatureFlagsIsSignatureCandidateForOverloadFailure$constant>;
export let SignatureFlagsIsUntypedSignatureInJSFile: ReturnType<typeof SignatureFlagsIsUntypedSignatureInJSFile$constant>;
export let SignatureFlagsNone: ReturnType<typeof SignatureFlagsNone$constant>;
export let SignatureFlagsPropagatingFlags: ReturnType<typeof SignatureFlagsPropagatingFlags$constant>;
export let SignatureKindCall: ReturnType<typeof SignatureKindCall$constant>;
export let SignatureKindConstruct: ReturnType<typeof SignatureKindConstruct$constant>;
export let SymbolFormatFlagsAllowAnyNodeKind: ReturnType<typeof SymbolFormatFlagsAllowAnyNodeKind$constant>;
export let SymbolFormatFlagsDoNotIncludeSymbolChain: ReturnType<typeof SymbolFormatFlagsDoNotIncludeSymbolChain$constant>;
export let SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope: ReturnType<typeof SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope$constant>;
export let SymbolFormatFlagsUseOnlyExternalAliasing: ReturnType<typeof SymbolFormatFlagsUseOnlyExternalAliasing$constant>;
export let SymbolFormatFlagsWriteComputedProps: ReturnType<typeof SymbolFormatFlagsWriteComputedProps$constant>;
export let SymbolFormatFlagsWriteTypeParametersOrArguments: ReturnType<typeof SymbolFormatFlagsWriteTypeParametersOrArguments$constant>;
export let TernaryFalse: ReturnType<typeof TernaryFalse$constant>;
export let TernaryMaybe: ReturnType<typeof TernaryMaybe$constant>;
export let TernaryTrue: ReturnType<typeof TernaryTrue$constant>;
export let TernaryUnknown: ReturnType<typeof TernaryUnknown$constant>;
export let TypeFactsAll: ReturnType<typeof TypeFactsAll$constant>;
export let TypeFactsAllTypeofNE: ReturnType<typeof TypeFactsAllTypeofNE$constant>;
export let TypeFactsAndFactsMask: ReturnType<typeof TypeFactsAndFactsMask$constant>;
export let TypeFactsBigIntFacts: ReturnType<typeof TypeFactsBigIntFacts$constant>;
export let TypeFactsBigIntStrictFacts: ReturnType<typeof TypeFactsBigIntStrictFacts$constant>;
export let TypeFactsBooleanFacts: ReturnType<typeof TypeFactsBooleanFacts$constant>;
export let TypeFactsBooleanStrictFacts: ReturnType<typeof TypeFactsBooleanStrictFacts$constant>;
export let TypeFactsEQNull: ReturnType<typeof TypeFactsEQNull$constant>;
export let TypeFactsEQUndefined: ReturnType<typeof TypeFactsEQUndefined$constant>;
export let TypeFactsEQUndefinedOrNull: ReturnType<typeof TypeFactsEQUndefinedOrNull$constant>;
export let TypeFactsEmptyObjectFacts: ReturnType<typeof TypeFactsEmptyObjectFacts$constant>;
export let TypeFactsEmptyObjectStrictFacts: ReturnType<typeof TypeFactsEmptyObjectStrictFacts$constant>;
export let TypeFactsEmptyStringFacts: ReturnType<typeof TypeFactsEmptyStringFacts$constant>;
export let TypeFactsEmptyStringStrictFacts: ReturnType<typeof TypeFactsEmptyStringStrictFacts$constant>;
export let TypeFactsFalseFacts: ReturnType<typeof TypeFactsFalseFacts$constant>;
export let TypeFactsFalseStrictFacts: ReturnType<typeof TypeFactsFalseStrictFacts$constant>;
export let TypeFactsFalsy: ReturnType<typeof TypeFactsFalsy$constant>;
export let TypeFactsFunctionFacts: ReturnType<typeof TypeFactsFunctionFacts$constant>;
export let TypeFactsFunctionStrictFacts: ReturnType<typeof TypeFactsFunctionStrictFacts$constant>;
export let TypeFactsIsNull: ReturnType<typeof TypeFactsIsNull$constant>;
export let TypeFactsIsUndefined: ReturnType<typeof TypeFactsIsUndefined$constant>;
export let TypeFactsIsUndefinedOrNull: ReturnType<typeof TypeFactsIsUndefinedOrNull$constant>;
export let TypeFactsNENull: ReturnType<typeof TypeFactsNENull$constant>;
export let TypeFactsNEUndefined: ReturnType<typeof TypeFactsNEUndefined$constant>;
export let TypeFactsNEUndefinedOrNull: ReturnType<typeof TypeFactsNEUndefinedOrNull$constant>;
export let TypeFactsNonEmptyStringFacts: ReturnType<typeof TypeFactsNonEmptyStringFacts$constant>;
export let TypeFactsNonEmptyStringStrictFacts: ReturnType<typeof TypeFactsNonEmptyStringStrictFacts$constant>;
export let TypeFactsNonZeroBigIntFacts: ReturnType<typeof TypeFactsNonZeroBigIntFacts$constant>;
export let TypeFactsNonZeroBigIntStrictFacts: ReturnType<typeof TypeFactsNonZeroBigIntStrictFacts$constant>;
export let TypeFactsNonZeroNumberFacts: ReturnType<typeof TypeFactsNonZeroNumberFacts$constant>;
export let TypeFactsNonZeroNumberStrictFacts: ReturnType<typeof TypeFactsNonZeroNumberStrictFacts$constant>;
export let TypeFactsNone: ReturnType<typeof TypeFactsNone$constant>;
export let TypeFactsNullFacts: ReturnType<typeof TypeFactsNullFacts$constant>;
export let TypeFactsNumberFacts: ReturnType<typeof TypeFactsNumberFacts$constant>;
export let TypeFactsNumberStrictFacts: ReturnType<typeof TypeFactsNumberStrictFacts$constant>;
export let TypeFactsObjectFacts: ReturnType<typeof TypeFactsObjectFacts$constant>;
export let TypeFactsObjectStrictFacts: ReturnType<typeof TypeFactsObjectStrictFacts$constant>;
export let TypeFactsOrFactsMask: ReturnType<typeof TypeFactsOrFactsMask$constant>;
export let TypeFactsStringFacts: ReturnType<typeof TypeFactsStringFacts$constant>;
export let TypeFactsStringStrictFacts: ReturnType<typeof TypeFactsStringStrictFacts$constant>;
export let TypeFactsSymbolFacts: ReturnType<typeof TypeFactsSymbolFacts$constant>;
export let TypeFactsSymbolStrictFacts: ReturnType<typeof TypeFactsSymbolStrictFacts$constant>;
export let TypeFactsTrueFacts: ReturnType<typeof TypeFactsTrueFacts$constant>;
export let TypeFactsTrueStrictFacts: ReturnType<typeof TypeFactsTrueStrictFacts$constant>;
export let TypeFactsTruthy: ReturnType<typeof TypeFactsTruthy$constant>;
export let TypeFactsTypeofEQBigInt: ReturnType<typeof TypeFactsTypeofEQBigInt$constant>;
export let TypeFactsTypeofEQBoolean: ReturnType<typeof TypeFactsTypeofEQBoolean$constant>;
export let TypeFactsTypeofEQFunction: ReturnType<typeof TypeFactsTypeofEQFunction$constant>;
export let TypeFactsTypeofEQHostObject: ReturnType<typeof TypeFactsTypeofEQHostObject$constant>;
export let TypeFactsTypeofEQNumber: ReturnType<typeof TypeFactsTypeofEQNumber$constant>;
export let TypeFactsTypeofEQObject: ReturnType<typeof TypeFactsTypeofEQObject$constant>;
export let TypeFactsTypeofEQString: ReturnType<typeof TypeFactsTypeofEQString$constant>;
export let TypeFactsTypeofEQSymbol: ReturnType<typeof TypeFactsTypeofEQSymbol$constant>;
export let TypeFactsTypeofNEBigInt: ReturnType<typeof TypeFactsTypeofNEBigInt$constant>;
export let TypeFactsTypeofNEBoolean: ReturnType<typeof TypeFactsTypeofNEBoolean$constant>;
export let TypeFactsTypeofNEFunction: ReturnType<typeof TypeFactsTypeofNEFunction$constant>;
export let TypeFactsTypeofNEHostObject: ReturnType<typeof TypeFactsTypeofNEHostObject$constant>;
export let TypeFactsTypeofNENumber: ReturnType<typeof TypeFactsTypeofNENumber$constant>;
export let TypeFactsTypeofNEObject: ReturnType<typeof TypeFactsTypeofNEObject$constant>;
export let TypeFactsTypeofNEString: ReturnType<typeof TypeFactsTypeofNEString$constant>;
export let TypeFactsTypeofNESymbol: ReturnType<typeof TypeFactsTypeofNESymbol$constant>;
export let TypeFactsUndefinedFacts: ReturnType<typeof TypeFactsUndefinedFacts$constant>;
export let TypeFactsUnknownFacts: ReturnType<typeof TypeFactsUnknownFacts$constant>;
export let TypeFactsVoidFacts: ReturnType<typeof TypeFactsVoidFacts$constant>;
export let TypeFactsZeroBigIntFacts: ReturnType<typeof TypeFactsZeroBigIntFacts$constant>;
export let TypeFactsZeroBigIntStrictFacts: ReturnType<typeof TypeFactsZeroBigIntStrictFacts$constant>;
export let TypeFactsZeroNumberFacts: ReturnType<typeof TypeFactsZeroNumberFacts$constant>;
export let TypeFactsZeroNumberStrictFacts: ReturnType<typeof TypeFactsZeroNumberStrictFacts$constant>;
export let TypeFlagsAny: ReturnType<typeof TypeFlagsAny$constant>;
export let TypeFlagsAnyOrUnknown: ReturnType<typeof TypeFlagsAnyOrUnknown$constant>;
export let TypeFlagsBigInt: ReturnType<typeof TypeFlagsBigInt$constant>;
export let TypeFlagsBigIntLike: ReturnType<typeof TypeFlagsBigIntLike$constant>;
export let TypeFlagsBigIntLiteral: ReturnType<typeof TypeFlagsBigIntLiteral$constant>;
export let TypeFlagsBoolean: ReturnType<typeof TypeFlagsBoolean$constant>;
export let TypeFlagsBooleanLike: ReturnType<typeof TypeFlagsBooleanLike$constant>;
export let TypeFlagsBooleanLiteral: ReturnType<typeof TypeFlagsBooleanLiteral$constant>;
export let TypeFlagsConditional: ReturnType<typeof TypeFlagsConditional$constant>;
export let TypeFlagsDefinitelyNonNullable: ReturnType<typeof TypeFlagsDefinitelyNonNullable$constant>;
export let TypeFlagsDisjointDomains: ReturnType<typeof TypeFlagsDisjointDomains$constant>;
export let TypeFlagsESSymbol: ReturnType<typeof TypeFlagsESSymbol$constant>;
export let TypeFlagsESSymbolLike: ReturnType<typeof TypeFlagsESSymbolLike$constant>;
export let TypeFlagsEnum: ReturnType<typeof TypeFlagsEnum$constant>;
export let TypeFlagsEnumLike: ReturnType<typeof TypeFlagsEnumLike$constant>;
export let TypeFlagsEnumLiteral: ReturnType<typeof TypeFlagsEnumLiteral$constant>;
export let TypeFlagsFreshable: ReturnType<typeof TypeFlagsFreshable$constant>;
export let TypeFlagsIncludesConstrainedTypeVariable: ReturnType<typeof TypeFlagsIncludesConstrainedTypeVariable$constant>;
export let TypeFlagsIncludesEmptyObject: ReturnType<typeof TypeFlagsIncludesEmptyObject$constant>;
export let TypeFlagsIncludesError: ReturnType<typeof TypeFlagsIncludesError$constant>;
export let TypeFlagsIncludesInstantiable: ReturnType<typeof TypeFlagsIncludesInstantiable$constant>;
export let TypeFlagsIncludesMask: ReturnType<typeof TypeFlagsIncludesMask$constant>;
export let TypeFlagsIncludesMissingType: ReturnType<typeof TypeFlagsIncludesMissingType$constant>;
export let TypeFlagsIncludesNonWideningType: ReturnType<typeof TypeFlagsIncludesNonWideningType$constant>;
export let TypeFlagsIncludesWildcard: ReturnType<typeof TypeFlagsIncludesWildcard$constant>;
export let TypeFlagsIndex: ReturnType<typeof TypeFlagsIndex$constant>;
export let TypeFlagsIndexedAccess: ReturnType<typeof TypeFlagsIndexedAccess$constant>;
export let TypeFlagsInstantiable: ReturnType<typeof TypeFlagsInstantiable$constant>;
export let TypeFlagsInstantiableNonPrimitive: ReturnType<typeof TypeFlagsInstantiableNonPrimitive$constant>;
export let TypeFlagsIntersection: ReturnType<typeof TypeFlagsIntersection$constant>;
export let TypeFlagsIntrinsic: ReturnType<typeof TypeFlagsIntrinsic$constant>;
export let TypeFlagsLiteral: ReturnType<typeof TypeFlagsLiteral$constant>;
export let TypeFlagsNever: ReturnType<typeof TypeFlagsNever$constant>;
export let TypeFlagsNonPrimitive: ReturnType<typeof TypeFlagsNonPrimitive$constant>;
export let TypeFlagsNone: ReturnType<typeof TypeFlagsNone$constant>;
export let TypeFlagsNotPrimitiveUnion: ReturnType<typeof TypeFlagsNotPrimitiveUnion$constant>;
export let TypeFlagsNull: ReturnType<typeof TypeFlagsNull$constant>;
export let TypeFlagsNullable: ReturnType<typeof TypeFlagsNullable$constant>;
export let TypeFlagsNumber: ReturnType<typeof TypeFlagsNumber$constant>;
export let TypeFlagsNumberLike: ReturnType<typeof TypeFlagsNumberLike$constant>;
export let TypeFlagsNumberLiteral: ReturnType<typeof TypeFlagsNumberLiteral$constant>;
export let TypeFlagsObject: ReturnType<typeof TypeFlagsObject$constant>;
export let TypeFlagsObjectFlagsType: ReturnType<typeof TypeFlagsObjectFlagsType$constant>;
export let TypeFlagsPrimitive: ReturnType<typeof TypeFlagsPrimitive$constant>;
export let TypeFlagsSimplifiable: ReturnType<typeof TypeFlagsSimplifiable$constant>;
export let TypeFlagsSingleton: ReturnType<typeof TypeFlagsSingleton$constant>;
export let TypeFlagsString: ReturnType<typeof TypeFlagsString$constant>;
export let TypeFlagsStringLike: ReturnType<typeof TypeFlagsStringLike$constant>;
export let TypeFlagsStringLiteral: ReturnType<typeof TypeFlagsStringLiteral$constant>;
export let TypeFlagsStringMapping: ReturnType<typeof TypeFlagsStringMapping$constant>;
export let TypeFlagsStringOrNumberLiteral: ReturnType<typeof TypeFlagsStringOrNumberLiteral$constant>;
export let TypeFlagsStringOrNumberLiteralOrUnique: ReturnType<typeof TypeFlagsStringOrNumberLiteralOrUnique$constant>;
export let TypeFlagsStructuredOrInstantiable: ReturnType<typeof TypeFlagsStructuredOrInstantiable$constant>;
export let TypeFlagsStructuredType: ReturnType<typeof TypeFlagsStructuredType$constant>;
export let TypeFlagsSubstitution: ReturnType<typeof TypeFlagsSubstitution$constant>;
export let TypeFlagsTemplateLiteral: ReturnType<typeof TypeFlagsTemplateLiteral$constant>;
export let TypeFlagsTypeParameter: ReturnType<typeof TypeFlagsTypeParameter$constant>;
export let TypeFlagsTypeVariable: ReturnType<typeof TypeFlagsTypeVariable$constant>;
export let TypeFlagsUndefined: ReturnType<typeof TypeFlagsUndefined$constant>;
export let TypeFlagsUnion: ReturnType<typeof TypeFlagsUnion$constant>;
export let TypeFlagsUnionOrIntersection: ReturnType<typeof TypeFlagsUnionOrIntersection$constant>;
export let TypeFlagsUniqueESSymbol: ReturnType<typeof TypeFlagsUniqueESSymbol$constant>;
export let TypeFlagsUnit: ReturnType<typeof TypeFlagsUnit$constant>;
export let TypeFlagsUnknown: ReturnType<typeof TypeFlagsUnknown$constant>;
export let TypeFlagsVoid: ReturnType<typeof TypeFlagsVoid$constant>;
export let TypeFlagsVoidLike: ReturnType<typeof TypeFlagsVoidLike$constant>;
export let TypeFormatFlagsMultilineObjectLiterals: ReturnType<typeof TypeFormatFlagsMultilineObjectLiterals$constant>;
export let TypeFormatFlagsNoTruncation: ReturnType<typeof TypeFormatFlagsNoTruncation$constant>;
export let TypeFormatFlagsNoTypeReduction: ReturnType<typeof TypeFormatFlagsNoTypeReduction$constant>;
export let TypeFormatFlagsNodeBuilderFlagsMask: ReturnType<typeof TypeFormatFlagsNodeBuilderFlagsMask$constant>;
export let TypeFormatFlagsNone: ReturnType<typeof TypeFormatFlagsNone$constant>;
export let TypeFormatFlagsUseAliasDefinedOutsideCurrentScope: ReturnType<typeof TypeFormatFlagsUseAliasDefinedOutsideCurrentScope$constant>;
export let TypeFormatFlagsUseFullyQualifiedType: ReturnType<typeof TypeFormatFlagsUseFullyQualifiedType$constant>;
export let TypeFormatFlagsWriteArrayAsGenericType: ReturnType<typeof TypeFormatFlagsWriteArrayAsGenericType$constant>;
export let TypeFormatFlagsWriteArrowStyleSignature: ReturnType<typeof TypeFormatFlagsWriteArrowStyleSignature$constant>;
export let TypeFormatFlagsWriteCallStyleSignature: ReturnType<typeof TypeFormatFlagsWriteCallStyleSignature$constant>;
export let TypeMapperKindArray: ReturnType<typeof TypeMapperKindArray$constant>;
export let TypeMapperKindMerged: ReturnType<typeof TypeMapperKindMerged$constant>;
export let TypeMapperKindSimple: ReturnType<typeof TypeMapperKindSimple$constant>;
export let TypeMapperKindUnknown: ReturnType<typeof TypeMapperKindUnknown$constant>;
export let TypePredicateKindAssertsIdentifier: ReturnType<typeof TypePredicateKindAssertsIdentifier$constant>;
export let TypePredicateKindAssertsThis: ReturnType<typeof TypePredicateKindAssertsThis$constant>;
export let TypePredicateKindIdentifier: ReturnType<typeof TypePredicateKindIdentifier$constant>;
export let TypePredicateKindThis: ReturnType<typeof TypePredicateKindThis$constant>;
export let TypeSystemPropertyNameAliasTarget: ReturnType<typeof TypeSystemPropertyNameAliasTarget$constant>;
export let TypeSystemPropertyNameDeclaredType: ReturnType<typeof TypeSystemPropertyNameDeclaredType$constant>;
export let TypeSystemPropertyNameInitializerIsUndefined: ReturnType<typeof TypeSystemPropertyNameInitializerIsUndefined$constant>;
export let TypeSystemPropertyNameResolvedBaseConstraint: ReturnType<typeof TypeSystemPropertyNameResolvedBaseConstraint$constant>;
export let TypeSystemPropertyNameResolvedBaseConstructorType: ReturnType<typeof TypeSystemPropertyNameResolvedBaseConstructorType$constant>;
export let TypeSystemPropertyNameResolvedBaseTypes: ReturnType<typeof TypeSystemPropertyNameResolvedBaseTypes$constant>;
export let TypeSystemPropertyNameResolvedReturnType: ReturnType<typeof TypeSystemPropertyNameResolvedReturnType$constant>;
export let TypeSystemPropertyNameResolvedTypeArguments: ReturnType<typeof TypeSystemPropertyNameResolvedTypeArguments$constant>;
export let TypeSystemPropertyNameType: ReturnType<typeof TypeSystemPropertyNameType$constant>;
export let TypeSystemPropertyNameWriteType: ReturnType<typeof TypeSystemPropertyNameWriteType$constant>;
export let UnionReductionLiteral: ReturnType<typeof UnionReductionLiteral$constant>;
export let UnionReductionNone: ReturnType<typeof UnionReductionNone$constant>;
export let UnionReductionSubtype: ReturnType<typeof UnionReductionSubtype$constant>;
export let UnusedKindLocal: ReturnType<typeof UnusedKindLocal$constant>;
export let UnusedKindParameter: ReturnType<typeof UnusedKindParameter$constant>;
export let VarianceFlagsAllowsStructuralFallback: ReturnType<typeof VarianceFlagsAllowsStructuralFallback$constant>;
export let VarianceFlagsBivariant: ReturnType<typeof VarianceFlagsBivariant$constant>;
export let VarianceFlagsContravariant: ReturnType<typeof VarianceFlagsContravariant$constant>;
export let VarianceFlagsCovariant: ReturnType<typeof VarianceFlagsCovariant$constant>;
export let VarianceFlagsIndependent: ReturnType<typeof VarianceFlagsIndependent$constant>;
export let VarianceFlagsInvariant: ReturnType<typeof VarianceFlagsInvariant$constant>;
export let VarianceFlagsUnmeasurable: ReturnType<typeof VarianceFlagsUnmeasurable$constant>;
export let VarianceFlagsUnreliable: ReturnType<typeof VarianceFlagsUnreliable$constant>;
export let VarianceFlagsVarianceMask: ReturnType<typeof VarianceFlagsVarianceMask$constant>;
export let WideningKindFunctionReturn: ReturnType<typeof WideningKindFunctionReturn$constant>;
export let WideningKindGeneratorNext: ReturnType<typeof WideningKindGeneratorNext$constant>;
export let WideningKindGeneratorYield: ReturnType<typeof WideningKindGeneratorYield$constant>;
export let WideningKindNormal: ReturnType<typeof WideningKindNormal$constant>;
export { $state };
